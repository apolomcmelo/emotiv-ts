import { CortexRequest } from "../../../cortex-request";
import { Requests } from "../../../../enums/requests.enum";

export class QueryProfile extends CortexRequest {

    constructor(authToken: string) {
        super();

        this.id = Requests.QUERY_PROFILE;
        this.method = "queryProfile";
        this.params = {
            "cortexToken": authToken
        };
    }
}