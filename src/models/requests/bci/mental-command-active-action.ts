import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";

export class MentalCommandActiveAction extends CortexRequest {

    constructor(authToken: string,
                status: 'get' | 'set',
                profileName: string = "",
                sessionId?: string,
                actions?: string[]) {
        super();

        this.id = Requests.MENTAL_COMMAND_ACTIVE_ACTION;
        this.method = "mentalCommandActiveAction";
        this.params = {
            "cortexToken": authToken,
            "status": status,
            "session": sessionId,
            "profile": profileName,
            "actions": actions
        };
    }
}