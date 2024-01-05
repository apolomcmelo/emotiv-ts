import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";

export class StopRecord extends CortexRequest {

    constructor(authToken: string, sessionId: string) {
        super();

        this.id = Requests.STOP_RECORD_REQUEST;
        this.method = "stopRecord";
        this.params = {
            "cortexToken": authToken,
            "session": sessionId
        }
    }
}