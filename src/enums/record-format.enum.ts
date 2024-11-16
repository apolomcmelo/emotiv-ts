
export interface Format { name: string; version: string | null }

export const RecordFormat = {
    EDF: <Format>{ name: "EDF", version: null } ,
    CSV: <Format>{ name: "CSV", version: "V1" },
    CSV_2: <Format>{ name: "CSV", version: "V2" },
}