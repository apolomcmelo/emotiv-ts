import type {w3cwebsocket} from 'websocket';
import {AuthenticationService} from "./authentication.service";
import {SessionService} from "./session.service";
import {Requests} from "../enums/internal/emotiv.requests";
import {MentalCommandActiveAction} from "../models/requests/bci/mental-command-active-action";

export class BCIService {
    socket: w3cwebsocket;

    constructor(socket: w3cwebsocket) {
        this.socket = socket;
    }

    activateActions(profile: string, actions: string[]) {
        this.mentalCommandActiveActionRequest(profile, 'set', actions);
    }

    getActiveActions(profile: string) {
        this.mentalCommandActiveActionRequest(profile, 'get');
    }

    private mentalCommandActiveActionRequest(profile: string, status: 'get' | 'set', actions?: string[]){
        let context = this;

        let authToken = AuthenticationService.getAuthToken();
        let sessionId = SessionService.getSessionId();

        let mentalCommandActiveActionRequest = new MentalCommandActiveAction(authToken, status, profile, sessionId, actions);

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(mentalCommandActiveActionRequest))
            context.socket.onmessage = (message) => {
                try {
                    if(JSON.parse(message.data as string)['id']==Requests.MENTAL_COMMAND_ACTIVE_ACTION){
                        console.log('MENTAL COMMAND ACTIVE ACTION RESULT --------------------')
                        console.log(message.data)
                        console.log('\r\n')
                        resolve(message.data)
                    }
                } catch (error) {
                    console.error(error);
                    reject(error)
                }
            }
        })
    }
}