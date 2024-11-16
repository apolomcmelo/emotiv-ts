import {CortexRequest} from "../../internal/cortex-request";
import {Requests} from "../../../enums/internal/emotiv.requests";
import {Format, RecordFormat} from "../../../enums/record-format.enum";
import {DataStream, DataStreamType} from "../../../enums/data-stream.enum";

export class ExportRecord extends CortexRequest {

    constructor(authToken: string, destinationFolder: string, format: Format, recordIds: string[], streams: DataStreamType[]) {
        super();

        this.id = Requests.EXPORT_RECORD_REQUEST;
        this.method = "exportRecord";
        this.params = {
            "cortexToken": authToken,
            "folder": destinationFolder,
            "format": format.name,
            "recordIds": [
                "ec0ac33f-ad4e-48b1-bbc3-8502f5c49b62"
            ],
            "streamTypes": streams,
        }

        if(format.version != null) {
            this.params.version = format.version
        }
    }
}