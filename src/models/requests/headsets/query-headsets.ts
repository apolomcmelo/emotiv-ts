import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";

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