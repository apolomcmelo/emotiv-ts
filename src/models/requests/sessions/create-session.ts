import { CortexRequest } from "../../internal/cortex-request";
import { Emotiv } from "../../../enums/internal/emotiv.consts";
import { Requests } from "../../../enums/internal/emotiv.requests";

export class CreateSession extends CortexRequest {

    constructor(authToken: string, headsetId: string) {
        super();

        this.id = Requests.CREATE_SESSION;
        this.method = "createSession";
        this.params = {
            "cortexToken": authToken,
            "headset": headsetId,
            "status": Emotiv.SESSION_ACTIVE
        }
    }
}