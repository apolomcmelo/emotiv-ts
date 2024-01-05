import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";

export class QueryHeadsets extends CortexRequest {

    constructor(headsetId?: string) {
        super();

        this.id = Requests.QUERY_HEADSET;
        this.method = "queryHeadsets";

        if(headsetId) {
            this.params = {
                "id": headsetId
            }
        }
    }
}