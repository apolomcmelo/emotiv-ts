import type {w3cwebsocket} from 'websocket';
import {EmotivService} from "./emotiv.service";
import type {Application} from "../models/application";
import {RecordService} from "./record.service";
import {AuthenticationService} from "./authentication.service";
import {SessionService} from "./session.service";
import {Requests} from "../enums/internal/emotiv.requests";
import {InjectMarker} from "../models/requests/markers/inject-marker";

export class MarkerService {
    socket: w3cwebsocket;
    emotivService: EmotivService;
    recordService: RecordService;

    constructor(socket: w3cwebsocket, application: Application) {
        this.socket = socket;
        this.emotivService = new EmotivService(this.socket.url, application);
        this.recordService = new RecordService(this.socket);
    }

    addMarker() {
        let context = this;
        this.socket.onopen = async () => {
            await this.emotivService.connect();

            let recordName = 'test_marker'
            await this.recordService.startRecord(recordName)

            let numberOfMarker = 10
            for (let numMarker=0; numMarker<numberOfMarker; numMarker++){
                setTimeout(async function() {

                    let markerLabel = `marker_number_${numMarker}`
                    let markerTime = Date.now()
                    let marker = {
                        label:markerLabel,
                        value:"test",
                        port:"Software",
                        time:markerTime
                    }

                    await context.injectMarker(
                        marker.label,
                        marker.value,
                        marker.port,
                        marker.time)
                }, 3000)
            }

            //await thisStopRecord.stopRecord(thisStopRecord.authToken, thisStopRecord.sessionId, recordName)
        }
    }

    private injectMarker(label: string, value: string | number, port: string, time: number) {
        let context = this;

        let authToken = AuthenticationService.getAuthToken();
        let sessionId = SessionService.getSessionId();

        let injectMarkerRequest = new InjectMarker(authToken, sessionId, time, value, label, port);

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(injectMarkerRequest));
            context.socket.onmessage = (message) => {
                try {
                    if(JSON.parse(message.data as string)['id']==Requests.INJECT_MARKER_REQUEST){
                        console.log('INJECT MARKER RESULT --------------------------------')
                        console.log(message.data)
                        resolve(message.data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }
}