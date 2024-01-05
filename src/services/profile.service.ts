import type {w3cwebsocket} from 'websocket';
import {HeadsetService} from "./headset.service";
import {AuthenticationService} from "./authentication.service";
import {Requests} from "../enums/requests.enum";
import {SetupProfile} from "../models/requests/bci/setup/setup-profile";
import {ProfileActions} from "../enums/profile-action.enum";
import {QueryProfile} from "../models/requests/bci/setup/query-profile";

export class ProfileService {
    socket: w3cwebsocket;
    headsetService: HeadsetService;

    constructor(socket: w3cwebsocket) {
        this.socket = socket;
        this.headsetService = new HeadsetService(this.socket);
    }

    setupProfile(name: string, action: ProfileActions){
        let context = this;

        let authToken = AuthenticationService.getAuthToken();
        let headsetId = this.headsetService.getHeadsetId();

        let setupProfileRequest = new SetupProfile(authToken, action, name, headsetId);

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(setupProfileRequest));
            context.socket.onmessage = (message) => {
                if(action==ProfileActions.CREATE){
                    resolve(message.data)
                }

                try {
                    let data = JSON.parse(message.data as string);

                    if(data['id']==Requests.SETUP_PROFILE){
                        if(data['result']['action']==action){
                            console.log('SETUP PROFILE -------------------------------------')
                            console.log(message.data)
                            console.log('\r\n')
                            resolve(message.data)
                        }
                    }

                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

    getProfiles() {
        let context = this;

        let authToken = AuthenticationService.getAuthToken();

        let queryProfileRequest = new QueryProfile(authToken)

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(queryProfileRequest))
            context.socket.onmessage = (message) => {
                try {
                    if(JSON.parse(message.data as string)['id']==Requests.QUERY_PROFILE){
                        resolve(message.data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }
}