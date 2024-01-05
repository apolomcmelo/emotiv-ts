import { CortexRequest } from "../../cortex-request";
import { Requests } from "../../../enums/requests.enum";

export class CreateRecord extends CortexRequest {

    constructor(authToken: string,
                sessionId: string,
                title: string,
                description?: string,
                subjectName?: string,
                tags?: string[],
                experimentId?: number) {
        super();

        this.id = Requests.CREATE_RECORD_REQUEST;
        this.method = "createRecord";
        this.params = {
            "cortexToken": authToken,
            "session": sessionId,
            "title": title,
            "description": description,
            "subjectName": subjectName,
            "tags": tags,
            "experimentId": experimentId
        }
    }
}