import type {w3cwebsocket} from 'websocket';
import {AuthenticationService} from "./authentication.service";
import {Requests} from "../enums/requests.enum";
import {Subscribe} from "../models/requests/datasubscription/subscribe";
import type {DataStream} from "../enums/data-stream.enum";
import {SessionService} from "./session.service";

export class DataStreamService {
    socket: w3cwebsocket;

    constructor(socket: w3cwebsocket) {
        this.socket = socket
    }

    subscribe(streams: DataStream[], action: (data: any) => void) {
        let authToken = AuthenticationService.getAuthToken();
        let sessionId = SessionService.getSessionId();

        let subRequest = new Subscribe(authToken, sessionId, streams);

        this.socket.send(JSON.stringify(subRequest))
        this.socket.onmessage = (message) => {
            try {
                let data = JSON.parse(message.data as unknown as string);

                console.debug("SubRequest response:", data)

                action(data)
            } catch (error) {
                console.error(error);
            }
        }
    }
}