import { CortexRequest } from "../../../internal/cortex-request";
import { Requests } from "../../../../enums/internal/emotiv.requests";
import { ProfileActions } from "../../../../enums/profile-action.enum";

export class SetupProfile extends CortexRequest {

    constructor(authToken: string,
                action: ProfileActions,
                profileName: string,
                headsetId?: string,
                newProfileName?: string) {
        super();

        this.id = Requests.SETUP_PROFILE;
        this.method = "setupProfile";
        this.params = {
            "cortexToken": authToken,
            "status": action,
            "profile": profileName,
            "headset": headsetId
        };

        if(action == ProfileActions.RENAME) {
            this.params.newProfileName = newProfileName || "";
        }
    }
}