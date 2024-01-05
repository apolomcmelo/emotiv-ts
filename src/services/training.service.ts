import type {w3cwebsocket} from 'websocket';
import {EmotivService} from "./emotiv.service";
import type {Application} from "../models/application";
import {ProfileService} from "./profile.service";
import {DataStreamService} from "./data-stream.service";
import {AuthenticationService} from "./authentication.service";
import {SessionService} from "./session.service";
import {Requests} from "../enums/internal/emotiv.requests";
import {Training} from "../models/requests/bci/setup/training";
import {TrainingCommands} from "../enums/training-command.enum";
import {ProfileActions} from "../enums/profile-action.enum";
import {DataStream} from "../enums/data-stream.enum";

export class TrainingService {
    socket: w3cwebsocket;
    emotivService: EmotivService;
    profileService: ProfileService;
    dataStreamService: DataStreamService;

    constructor(socket: w3cwebsocket, application: Application) {
        this.socket = socket;
        this.emotivService = new EmotivService(this.socket.url, application);
        this.profileService = new ProfileService(this.socket);
        this.dataStreamService = new DataStreamService(this.socket);
    }

    /**
     *  - handle send training request
     *  - handle resolve for two difference status : start and accept
     */
    trainRequest(action: string, status: TrainingCommands){
        let context = this;

        let authToken = AuthenticationService.getAuthToken();
        let sessionId = SessionService.getSessionId();

        let trainingRequest = new Training(authToken, sessionId, "mentalCommand", status, action);

        // console.log(trainingRequest)
        // each train take 8 seconds for complete
        console.log('YOU HAVE 8 SECONDS FOR THIS TRAIN')
        console.log('\r\n')

        return new Promise(function(resolve, reject){
            context.socket.send(JSON.stringify(trainingRequest))
            context.socket.onmessage = (message) => {

                try {
                    if (JSON.parse(message.data as string)['id']==Requests.TRAINING){
                        console.log(message.data);
                    }
                } catch (error) {
                    console.error(error);
                }

                // In case status is start training, only resolve until see "MC_Succeeded"
                if (status == TrainingCommands.START){
                    try {
                        if(JSON.parse(message.data as string)['sys'][1]=='MC_Succeeded'){
                            console.log('START TRAINING RESULT --------------------------------------')
                            console.log(message.data)
                            console.log('\r\n')
                            resolve(message.data)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }

                // In case status is accept training, only resolve until see "MC_Completed"
                if (status == TrainingCommands.ACCEPT){
                    try {
                        if(JSON.parse(message.data as string)['sys'][1]=='MC_Completed'){
                            console.log('ACCEPT TRAINING RESULT --------------------------------------')
                            console.log(message.data)
                            console.log('\r\n')
                            resolve(message.data)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        })
    }

    /**
     * - check login and grant access
     * - create profile if not yet exist
     * - load profile
     * - sub stream 'sys' for training
     * - train for actions, each action in number of time
     *
     */
    train(profileName: string, trainingActions: string[], numberOfTrain: number){
        let context = this;

        this.socket.onopen = async () => {

            console.log("start training flow")

            // check login and grant access
            await this.emotivService.connect()

            // to training need subcribe 'sys' stream
            this.dataStreamService.subscribe([DataStream.SYSTEM_EVENT], (data) => console.log("Subscribed to Sys: ", data));

            // create profile
            let createProfileResult: any = "";
            await this.profileService.setupProfile(profileName, ProfileActions.CREATE).then(result => createProfileResult = result)

            // load profile
            let loadProfileResult: any = "";
            await this.profileService.setupProfile(profileName, ProfileActions.LOAD).then((result)=>{loadProfileResult=result})

            // training all actions
            for (let trainingAction of trainingActions){
                for (let numTrain=0; numTrain<numberOfTrain; numTrain++){
                    // start training for 'neutral' action
                    console.log(`START TRAINING "${trainingAction}" TIME ${numTrain+1} ---------------`)
                    console.log('\r\n')
                    await context.trainRequest(trainingAction, TrainingCommands.START)

                    //
                    // FROM HERE USER HAVE 8 SECONDS TO TRAIN SPECIFIC ACTION
                    //

                    // accept 'neutral' result
                    console.log(`ACCEPT "${trainingAction}" TIME ${numTrain+1} --------------------`)
                    console.log('\r\n')
                    await context.trainRequest(trainingAction, TrainingCommands.ACCEPT)
                }

                let saveProfileResult:any = ""

                // save profile after train
                await context.profileService.setupProfile(profileName, ProfileActions.SAVE)
                    .then(result => {
                        saveProfileResult = result;
                        console.log(`COMPLETED SAVE ${trainingAction} FOR ${profileName}`);
                    })
            }
        }
    }

    /**
     *
     * - load profile which trained before
     * - sub 'com' stream (mental command)
     * - user think specific thing which used while training, for example 'push' action
     * - 'push' command should show up on mental command stream
     */
    live(profileName: string) {
        this.socket.onopen = async () => {

            await this.emotivService.connect()

            // load profile
            let loadProfileResult:any=""
            await this.profileService.setupProfile(profileName, ProfileActions.LOAD).then(result => loadProfileResult = result)

            console.log(loadProfileResult)

            // // sub 'com' stream and view live mode
            this.dataStreamService.subscribe([DataStream.MENTAL_COMMAND], (data) => console.log("Subscribed to Com: ", data))

            this.socket.onmessage = (message) => console.log(message.data)
        }
    }
}