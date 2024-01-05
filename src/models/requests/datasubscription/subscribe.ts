import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";
import type { DataStream } from "../../../enums/data-stream.enum";

export class Subscribe extends CortexRequest {

    constructor(authToken: string, sessionId: string, streams: DataStream[]) {
        super();

        this.id = Requests.SUB_REQUEST;
        this.method = "subscribe";

        this.params = {
            "cortexToken": authToken,
            "session": sessionId,
            "streams": streams
        }
    }
}