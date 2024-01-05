import { CortexRequest } from "../../internal/cortex-request";
import { Emotiv } from "../../../enums/internal/emotiv.consts";
import { Requests } from "../../../enums/internal/emotiv.requests";

export class ActivateSession extends CortexRequest {

    constructor(authToken: string, sessionId: string) {
        super();

        this.id = Requests.ACTIVATE_SESSION;
        this.method = "updateSession";
        this.params = {
            "cortexToken": authToken,
            "session": sessionId,
            "status": Emotiv.SESSION_ACTIVE
        };
    }
}