import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";
import type { Application } from "../../application";

export class Authorize extends CortexRequest {

    constructor(application: Application) {
        super();

        this.id = Requests.AUTHORIZE;
        this.method = "authorize";
        this.params = {
            "clientId": application.clientId,
            "clientSecret": application.clientSecret,
            "license": application.license,
            "debit": application.debit
        };
    }
}