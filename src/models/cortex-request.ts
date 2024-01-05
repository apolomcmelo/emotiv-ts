import {Emotiv} from "../enums/emotiv.consts";
import type {CortexParams} from "./cortex-params";

export abstract class CortexRequest {
    jsonrpc: string = Emotiv.JSON_RPC_VERSION;
    id: number = 0;
    method: string = "";
    params: CortexParams = {};
}