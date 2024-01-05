/**
 * This enumeration holds the Emotiv training commands.
 * These are used for performing different actions on training using the Cortex API, i.e. start a new training, cancel the current training, etc.
 */
export enum TrainingCommands {
    START = "start",
    ACCEPT = "accept",
    REJECT = "reject",
    RESET = "reset",
    ERASE = "erase"
}