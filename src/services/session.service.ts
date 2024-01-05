import type {w3cwebsocket} from 'websocket';
import {CreateSession} from "../models/requests/sessions/create-session";
import type {CortexRequest} from "../models/cortex-request";
import {ActivateSession} from "../models/requests/sessions/activate-session";
import {CloseSession} from "../models/requests/sessions/close-session";
import {Requests} from "../enums/requests.enum";

export class SessionService {
    socket: w3cwebsocket;
    private static sessionId: string = "";

    constructor(socket: w3cwebsocket) {
        this.socket = socket
    }

    createSession(authToken: string, headsetId: string): Promise<string>{
        let context = this;

        let createSessionRequest = new CreateSession(authToken, headsetId)

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(createSessionRequest));
            context.socket.onmessage = (message) => {

                try {
                    let data = JSON.parse(message.data as unknown as string);

                    if(data['id']==Requests.CREATE_SESSION){
                        console.debug("CreateSession response:", data)

                        SessionService.sessionId = data['result']['id'];
                        resolve(SessionService.sessionId);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

    static getSessionId() {
        return this.sessionId;
    }

    activateSession(authToken: string, sessionId: string) {
        this.updateSession(new ActivateSession(authToken, sessionId));
    }

    closeSession(authToken: string, sessionId: string) {
        this.updateSession(new CloseSession(authToken, sessionId));
    }

    private updateSession(sessionRequest: CortexRequest) {
        let context = this;

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(sessionRequest));
            context.socket.onmessage = (message) => {
                try {
                    if(JSON.parse(message.data as string)['id']==sessionRequest.id){
                        console.log(message.data)
                        resolve(message.data)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

}