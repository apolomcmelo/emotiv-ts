import type {w3cwebsocket} from 'websocket';
import {AuthenticationService} from "./authentication.service";
import {SessionService} from "./session.service";
import {Requests} from "../enums/requests.enum";
import {CreateRecord} from "../models/requests/records/create-record";
import {StopRecord} from "../models/requests/records/stop-record";

export class RecordService {
    socket: w3cwebsocket;

    constructor(socket: w3cwebsocket) {
        this.socket = socket;
    }

    startRecord(recordName: string) {
        let context = this;

        let authToken = AuthenticationService.getAuthToken();
        let sessionId = SessionService.getSessionId();

        let createRecordRequest = new CreateRecord(authToken, sessionId, recordName);

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(createRecordRequest));
            context.socket.onmessage = (message) => {
                try {
                    if(JSON.parse(message.data as string)['id']==Requests.CREATE_RECORD_REQUEST){
                        console.log('CREATE RECORD RESULT --------------------------------')
                        console.log(message.data)
                        resolve(message.data)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

    stopRecord(authToken: string, sessionId: string){
        let context = this;

        let stopRecordRequest = new StopRecord(authToken, sessionId)

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(stopRecordRequest));
            context.socket.onmessage = (message) => {
                try {
                    if(JSON.parse(message.data as string)['id']==Requests.STOP_RECORD_REQUEST){
                        console.log('STOP RECORD RESULT --------------------------------')
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