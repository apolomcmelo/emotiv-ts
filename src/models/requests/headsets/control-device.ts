import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";

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