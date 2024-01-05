import { CortexRequest } from "../../cortex-request";
import { Emotiv } from "../../../enums/emotiv.consts";
import { Requests } from "../../../enums/requests.enum";

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