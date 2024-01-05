import type {IMessageEvent, w3cwebsocket} from 'websocket';
import type {Application} from "../models/application";
import {RequestAccess} from "../models/requests/authentication/request-access";
import {Authorize} from "../models/requests/authentication/authorize";
import {LicenseInfo} from "../models/requests/authentication/license-info";
import {Access} from "../models/responses/authentication/access";
import {Authorisation} from "../models/responses/authentication/authorisation";
import {License} from "../models/responses/authentication/license";
import type {CortexRequest} from "../models/internal/cortex-request";
import type {CortexResponse} from "../models/internal/cortex-response";

export class AuthenticationService {
    socket: w3cwebsocket

    private static authorisation: Authorisation;

    constructor(socket: w3cwebsocket) {
        this.socket = socket;
    }

    requestAccess(application: Application): Promise<Access> {
        return this.requestCortexAPI(
            this,
            new RequestAccess(application),
            data => new Access(data.result.accessGranted, data.result.message)
        )
    }

    authorize(application: Application): Promise<Authorisation> {
        return this.requestCortexAPI(
            this,
            new Authorize(application),
            data => {
                AuthenticationService.authorisation = new Authorisation(data.result.cortexToken, data.result.warning)
                return AuthenticationService.authorisation
            }
        )
    }

    getLicenseInfo() : Promise<License> {
        return this.requestCortexAPI(
            this,
            new LicenseInfo(AuthenticationService.authorisation.token),
            data =>
                new License(data.result.isOnline, data.result.license)
        )
    }

    static getAuthToken() {
        return this.authorisation.token
    }

    requestCortexAPI<R extends CortexResponse>(context: any, request: CortexRequest, onSuccess: (data: any) => R, onError?: (error: any) => any): Promise<R> {
        return new Promise((resolve, reject) => {

            context.socket.send(JSON.stringify(request))
            context.socket.onmessage = (message: IMessageEvent) => {
                try {
                    let data = JSON.parse(message.data as string);

                    if(data['id'] == request.id){
                        console.debug(`Cortex Response for the request ${request.method}:`, data)
                        resolve(onSuccess(data));
                    }
                } catch (error) {
                    console.error(error);

                    if(onError) {
                        onError(error)
                    }

                    reject(error)
                }
            }
        })
    }
}