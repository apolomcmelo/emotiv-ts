import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";
import type { Application } from "../../application";

export class RequestAccess extends CortexRequest {

    constructor(application: Application) {
        super();

        this.id = Requests.REQUEST_ACCESS;
        this.method = "requestAccess";
        this.params = {
            "clientId": application.clientId,
            "clientSecret": application.clientSecret
        };
    }
}