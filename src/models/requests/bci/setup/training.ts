import { CortexRequest } from "../../../cortex-request";
import { Requests } from "../../../../enums/requests.enum";
import type { TrainingCommands } from "../../../../enums/training-command.enum";

export class Training extends CortexRequest {

    constructor(authToken: string, sessionId: string, detection: string, trainingCommand: TrainingCommands, action: string) {
        super();

        this.id = Requests.TRAINING;
        this.method = "training";
        this.params = {
            "cortexToken": authToken,
            "session": sessionId,
            "detection": detection,
            "status": trainingCommand,
            "action": action,
        };
    }
}