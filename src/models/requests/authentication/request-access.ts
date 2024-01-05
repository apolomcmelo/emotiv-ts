import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";
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