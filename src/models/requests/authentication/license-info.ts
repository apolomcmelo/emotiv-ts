import {CortexRequest} from "../../internal/cortex-request";
import {Requests} from "../../../enums/internal/emotiv.requests";

export class LicenseInfo extends CortexRequest {

    constructor(authToken: string) {
        super();

        this.id = Requests.LICENSE_INFO;
        this.method = "getLicenseInfo";
        this.params = {
            "cortexToken": authToken
        };
    }
}