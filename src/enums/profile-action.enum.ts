/**
 * This enumeration holds the Emotiv profile actions.
 * These are used for performing different actions on profiles using the Cortex API, i.e. create a profile or load a profile
 */
export enum ProfileActions {
    CREATE = "create",
    LOAD = "load",
    UNLOAD = "unload",
    SAVE = "save",
    RENAME = "rename",
    DELETE = "delete"
}