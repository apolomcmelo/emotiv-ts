import { CortexRequest } from "../../internal/cortex-request";
import { Requests } from "../../../enums/internal/emotiv.requests";

export class ControlDevice extends CortexRequest {

    constructor(headsetId: string) {
        super();

        this.id = Requests.CONTROL_DEVICE;
        this.method = "controlDevice";

        this.params = {
            "command": "connect",
            "headset": headsetId
        }
    }
}