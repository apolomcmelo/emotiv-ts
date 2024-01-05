import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";

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