import { CortexRequest } from "../../../internal/cortex-request";
import { Requests } from "../../../../enums/internal/emotiv.requests";

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