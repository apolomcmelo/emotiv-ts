import { CortexRequest } from "../../cortex-request";
import { Emotiv } from "../../../enums/emotiv.consts";
import { Requests } from "../../../enums/requests.enum";

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