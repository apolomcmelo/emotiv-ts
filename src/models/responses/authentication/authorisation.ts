import {CortexResponse} from "../../cortex-response";

export class Authorisation extends CortexResponse{
    constructor(public token: string, public warning?: string) {
        super();
    }
}