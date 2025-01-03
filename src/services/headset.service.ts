import type {w3cwebsocket} from 'websocket';
import {Requests} from "../enums/internal/emotiv.requests";
import {QueryHeadsets} from "../models/requests/headsets/query-headsets";
import {ControlDevice} from "../models/requests/headsets/control-device";

export class HeadsetService {
    socket: w3cwebsocket;
    private headsetId: string = "";

    constructor(socket: w3cwebsocket) {
        this.socket = socket
    }

    // TODO: Change the function to query all headsets instead of just the first
    // This change should be made before making it as a public library
    getHeadsets(): Promise<string> {
        let context = this;

        let queryHeadsetRequest =  new QueryHeadsets();

        return new Promise((resolve, reject) => {
            context.socket.send(JSON.stringify(queryHeadsetRequest));

            context.socket.onmessage = (message) => {
                try {
                    let data = JSON.parse(message.data as unknown as string);

                    if(data['id']==Requests.QUERY_HEADSET){
                        console.debug("QueryHeadsets response:", data)

                        if(data['error']){
                            throw new Error(data['error']['message'])
                        }

                        if(data['result'].length > 0){
                            context.headsetId = data['result'][0]['id'];
                            resolve(context.headsetId);
                        }
                        else{
                            console.log('No headset was found. Please, connect the headset with your pc.')
                        }
                    }

                } catch (error) {
                    console.error(error);
                    reject(error)
                }
            }
        })
    }

    controlDevice(headsetId: string) {
        let context = this;

        let controlDeviceRequest = new ControlDevice(headsetId);

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(controlDeviceRequest));
            context.socket.onmessage = (message) => {
                try {
                    let data = JSON.parse(message.data as string);

                    if(data['id']==Requests.CONTROL_DEVICE){
                        if(data['error']){
                            throw new Error(data['error']['message'])
                        }
                        resolve(message.data);
                    }
                } catch (error) {
                    console.error(error);
                    reject(error)
                }
            }
        })
    }

    public getHeadsetId(): string {
        return this.headsetId;
    }
}