# emotiv-ts
The **emotiv-ts** is a typescript library to communicate with Emotiv headsets.

# Installation
The most recent release can be installed using `npm`:
```shell
npm install emotiv-ts
```
# Getting started
To be able to use the functionalities of an Emotiv headset, you first need to connect to its API using the credentials provided for your app. You can check how to get the credentials in the [Emotiv website](https://www.emotiv.com/developer/).

The simplest way to connect to the Emotiv API using the *emotiv-ts* is via the `EmotivService` class:
```typescript
const socketUrl = "wss://localhost:6868"
const appCredentials = {
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET"
}

let emotivService = new EmotivService(socketUrl, appCredentials);
emotivService.connect();
```

The line `emotivService.connect()` returns a **Promise**, which means all your logic that requires the Emotiv communication needs to be handled after the Promise is resolved.

A common usage of Emotiv Headsets is the **Mental Command**. For that, you will need basically 2 things: load a profile with trained commands, and subscribe to the `Mental_Command` stream.
```typescript
emotivService.connect().then(() => {
    let profileName = 'test'
    emotivService.setupProfile(profileName, ProfileActions.LOAD)

    emotivService.readData([DataStream.MENTAL_COMMAND], (dataStream) => yourMentalCommandHandler(dataStream))
})  
```

After subscribing to the `Mental_Command` stream, you can then verify what command was executed like so:
```typescript
private yourMentalCommandHandler(dataStream: any) {
    let commandReceived = dataStream['com']
   
    if (commandReceived) {
        switch (commandReceived[0]) {
            case MentalCommand.PUSH:
                console.log("Command PUSH executed")
                // your logic for PUSH command here...
                break;
            case MentalCommand.PULL:
                console.log("Command PULL executed")
                // your logic for PULL command here...
                break;
        }
    }
}
```