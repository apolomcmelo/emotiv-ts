import type {w3cwebsocket} from 'websocket';
import {AuthenticationService} from "./authentication.service";
import {SessionService} from "./session.service";
import {Requests} from "../enums/internal/emotiv.requests";
import {CreateRecord} from "../models/requests/records/create-record";
import {StopRecord} from "../models/requests/records/stop-record";
import {ExportRecord} from "../models/requests/records/export-record";
import {Format} from "../enums/record-format.enum";
import {DataStreamType} from "../enums/data-stream.enum";

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

        return new Promise((resolve, reject) => {
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

        return new Promise((resolve, reject) => {
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

    exportRecord(authToken: string, destinationFolder: string, format: Format, recordIds: string[], streams: DataStreamType[]){
        let context = this;

        let exportRecordRequest = new ExportRecord(authToken, destinationFolder, format, recordIds, streams)

        return new Promise((resolve, reject) => {
            context.socket.send(JSON.stringify(exportRecordRequest));
            context.socket.onmessage = (message) => {
                try {
                    let result = JSON.parse(message.data as string);
                    if(result['id']==Requests.EXPORT_RECORD_REQUEST){
                        console.log('EXPORT RECORD RESULT --------------------------------')
                        console.log(result['result'])
                        resolve(message.data)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }
}