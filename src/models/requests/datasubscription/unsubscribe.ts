import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";
import type { DataStream } from "../../../enums/data-stream.enum";

export class Unsubscribe extends CortexRequest {

    constructor(authToken: string, sessionId: string, streams: DataStream[]) {
        super();

        this.id = Requests.SUB_REQUEST;
        this.method = "unsubscribe";

        this.params = {
            "cortexToken": authToken,
            "session": sessionId,
            "streams": streams
        }
    }
}