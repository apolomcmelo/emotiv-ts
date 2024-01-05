import {HeadsetService} from "./headset.service";
import {AuthenticationService} from "./authentication.service";
import {SessionService} from "./session.service";
import {EmotivError} from "../enums/internal/emotiv.error";
import type {Application} from "../models/application";

import WebSocket, {w3cwebsocket} from 'websocket';
import {DataStreamService} from "./data-stream.service";
import type {DataStream} from "../enums/data-stream.enum";
import {ProfileService} from "./profile.service";
import type {ProfileActions} from "../enums/profile-action.enum";

export class EmotivService {
    application: Application;
    socket: w3cwebsocket;
    authToken: any;
    sessionId: string | undefined;
    headsetId: any;
    headsetService: HeadsetService;
    authenticationService: AuthenticationService;
    sessionService: SessionService;
    dataStreamService: DataStreamService;

    constructor(socketUrl: string, application: Application) {
        // Create WebSocket
        this.socket = new WebSocket.w3cwebsocket(socketUrl);

        this.application = application;

        // Initialize services
        this.authenticationService = new AuthenticationService(this.socket);
        this.sessionService = new SessionService(this.socket);
        this.headsetService = new HeadsetService(this.socket);
        this.dataStreamService = new DataStreamService(this.socket);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.socket.onopen = async () => {

                await this.authenticationService.requestAccess(this.application)
                    .then(async emotivAccess => {
                        console.log(emotivAccess.message);

                        if (emotivAccess.isGranted) {
                            await this.authenticationService.authorize(this.application).then(authorisation => this.authToken = authorisation.token);
                            await this.headsetService.getHeadsets().then(headsetId => this.headsetId = headsetId);

                            await this.sessionService.createSession(this.authToken, this.headsetId).then(sessionId => this.sessionId = sessionId);

                            await this.authenticationService.getLicenseInfo();
                            resolve(() => {
                                console.log("Connected successfully.")

                                let sessionInfo = this.getSessionInfo()

                                // Shows the information about the session
                                console.debug("Session Info:", sessionInfo)

                                return sessionInfo
                            })
                        } else {
                            console.log(EmotivError.ACCESS_NOT_ACCEPTED)
                            throw new Error(EmotivError.ACCESS_NOT_ACCEPTED)
                        }
                    })
                    .catch(error => {
                        // Thrown an error if user is not logged in CortexUI
                        console.error(EmotivError.ACCESS_NOT_GRANTED, error);
                        throw new Error(EmotivError.ACCESS_NOT_GRANTED);
                    })
            }
        })
    }

    readData(streams: Array<DataStream>, action: (data: any) => void) {
        this.dataStreamService.subscribe(streams, action)
    }

    setupProfile(name: string, action: ProfileActions) {
        let profileService = new ProfileService(this.socket);

        profileService.setupProfile(name, action).then(data => {
            console.debug("SetupProfile data:", data)

            return data
        })
    }

    private async getSessionInfo() {
        let deviceConnectionStatus;

        await this.headsetService.controlDevice(this.headsetId).then(status => deviceConnectionStatus = status)

        return {
            "authToken": this.authToken,
            "sessionId": this.sessionId,
            "headsetId": this.headsetId,
            "connectionStatus": JSON.parse(deviceConnectionStatus as unknown as string)['result']
        }
    }
}