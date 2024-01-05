import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";

export class InjectMarker extends CortexRequest {

    constructor(authToken: string,
                sessionId: string,
                startTimestamp: number,
                value: string | number,
                label: string,
                port?: string,
                extras?: object) {
        super();

        this.id = Requests.INJECT_MARKER_REQUEST;
        this.method = "injectMarker";
        this.params = {
            "cortexToken": authToken,
            "session": sessionId,
            "label": label,
            "value": value,
            "port": port,
            "time": startTimestamp,
            "extras": extras
        }
    }
}