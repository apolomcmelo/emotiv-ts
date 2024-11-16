/**
 * This enumeration holds the Emotiv requests IDs.
 * These ids are used to validate whether the websocket message came from the same query/request.
 */
export enum Requests {
    REQUEST_ACCESS = 1,
    QUERY_HEADSET = 2,
    CONTROL_DEVICE = 3,
    AUTHORIZE = 4,
    CREATE_SESSION = 5,
    ACTIVATE_SESSION,
    CLOSE_SESSION,
    SUB_REQUEST = 8,
    SETUP_PROFILE = 9,
    TRAINING = 10,
    QUERY_PROFILE = 11,
    MENTAL_COMMAND_ACTIVE_ACTION = 12,
    CREATE_RECORD_REQUEST = 13,
    STOP_RECORD_REQUEST = 14,
    EXPORT_RECORD_REQUEST = 15,
    INJECT_MARKER_REQUEST = 16,
    LICENSE_INFO
}