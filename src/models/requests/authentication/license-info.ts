import {CortexRequest} from "../../cortex-request";
import {Requests} from "../../../enums/requests.enum";

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