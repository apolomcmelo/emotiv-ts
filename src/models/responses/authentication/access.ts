import {CortexResponse} from "../../internal/cortex-response";

export class Access extends CortexResponse {
    constructor(public isGranted: boolean, public message: string) {
        super();
    }
}