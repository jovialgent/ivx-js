# iVXjs Events

## Event - Overview

If a developer wants to interact with an iVXjs experience, the easiest and quickest way
is to listen and emit events on the Bus. The Bus uses nodejs's [EventEmitter](https://nodejs.org/api/events.html)
and you can use it by pulling in iVXjs through the appropriate renderer. 

## Note about events documentation

The "payload" is all the information that is sent from the triggering event emitter. Be careful though, sometimes
an event is fired without the information provided so be careful in using the listeners. Also, the payload is 
documented in a [JSON Schema Org](http://json-schema.org/) fashion, but since events can send Functions the validator will not work with JSON validators.

## iVXjs Bus Implementations 

__Overview__ 

Each implementation would have its own implementation of the bus. The following are the various implementations.

### iVXjs Bus Angular Implementation

__Snippet__ 

```
angular 
    .module('[APPNAME]')
    .service(["ivxjs.bus", function(iVXjsBus){
        iVXjsBus.on('EVENTNAME', function(PAYLOAD){

        });
    }]);
```

## Audio Events

__Overview__

All events the audio module listens and fires. The payload 

### iVXjs:audio:can-play

__Description__

Indicates that the current audio file can play.

__Payload__

None

### iVXjs:audio:ended

__Description__

Indicates that the current audio file has ended.

__Payload__ 

None 

### iVXjs:audio:mute

__Description__

Mutes the audio 

__Payload__ 

None 

### iVXjs:audio:pause 

__Description__ 

Pauses the audio 

__Payload__ 

None 

### iVXjs:audio:play

__Description__

Plays the audio 

__Payload__ 

None 

### iVXjs:audio:time-update

__Description__ 

Fires whenever the audio's object on timeupdate event is fired.

__Payload__ 

The current instance of this Audio class.

### iVXjs:audio:unmute

__Description__

Unmutes and sets the audio back to the original volume 

__Payload__ 

None 

## Config Events

__Overview__ 

The time between when the `iVXjs.init()` function gets called and the user sees the experience rendered is considered
the configuration set. During this time, the following events can fire.

### iVXjs:config:not-valid

__Description__

Fires any instance where the config isn't valid utilizing the 
current Validation module. 

__Payload__
```
{
    "valid" : {
        "type": "boolean",
        "description" : "Indicates that this validation is not valid"
    },
    "error" : {
        "type" : "object",
        "description" : "Contains all the invalid parts of this configuration and a message detailing the error",
        "properties" : {
            "message" : {
                "type" : "string",
                "description" : "An auto-generated human-readable message that indicates the errors. This will always be logged to the console if the configuration is invalid"
            },
            "errors" : {
                "type" : "items",
                "description" : "Depending on the validation module, this will have a collection of data for each invalid piece of data in the config."
            }
        }
    }
    "required" : ["valid", "error"]
}
```

### iVXjs:config:validated

__Description__

Fires when config settings are validated. This event triggers 
all the rendering of the experience. 

__Payload__

A valid instance of iVXjs.

## Http Events 

__Overview__

Whenever there is a HTTP request, several events will be raised. 

### iVXjs:http:request:error

__Description__ 

Fires when a request has an error 

__Payload__ 

request - Request object sent to the server 

### iVXjs:http:request:success 

__Description__ 

Fires when a request is successful 

__Payload__ 

request - Request object sent to the server 

### iVXjs:http:response:error 

__Description__ 

Fires when there is an error in the response of the server 

__Payload__ 

response - Response from the server 

### iVXjs:http:response:success 

__Description__

Indicates that a response was successful 

__Payload__ 

response - Response from the server

## Logging Events

__Overview__ 

iVXjs has its own logging module that will log any information throughout the application. 
This logging service will fire events depending on what gets logged through the module.

### iVXjs:log 

__Description__ 

Indicates that iVXjs's Logging system has logged a message. 

__Payload__
```
{
    "type" : "object",
    "properties" : {
        "message": {
            "type" : "string",
            "description" : "The message logged"
        },
        "timestamp": {
            "type": "date",
            "description" : "The time this message was logged."
        }
    }
}
```

### iVXjs:log:error 

__Description__

Indicates that an error is logged to the console. 

__Payload__ 
```
{
    "type": "object",
    "properties" : {
        "message" : {
            "type" : "string",
            "description" : "Error message logged to the console"
        },
        "type" : {
            "type" : "string",
            "description" : "Type of error that was fired. Typically it is in this format: iVXjs:errorr:[TYPE]
        },
        "timestamp: {
            "type" : "date",
            "description" : "The time this error was logged to the console"
        }
    }
}
```


### iVXjs:log:trace

__Description__ 

Indicates that iVXjs's Logging system logged a stack-trace. 

__Payload__
```
{
    "type" : "object",
    "properties" : {
        "stack": {
            "type" : "string",
            "description" : "The stack."
        },
        "timestamp": {
            "type": "date",
            "description" : "The time this stack was logged."
        }
    }
}
```

### iVXjs:log:warn

__Description__ 

Indicates that iVXjs's Logging system has logged a warning. 

__Payload__
```
{
    "type" : "object",
    "properties" : {
        "message": {
            "type" : "string",
            "description" : "The warning message."
        },
        "timestamp": {
            "type": "date",
            "description" : "The time this warning was logged."
        }
    }
}
```

## State Events 

__Overview__ 

These events all handle interactions with states

### iVXjs:state:change

__Description__

Fires whenever a state has successfully changed

__Payload__

All the current information on this state.  

For Angular: The data sent will follow [ui-router's state's](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state) current data object.

### iVXjs:state:go

__Description__

Tells the navigation service to go to the the state 

__Payload__
```
{
    "type" : "object",
    "properties" : {
        "stateId" : {
            "type" : "string",
            "description" : "The state id to navigate to.
        }
    }
}
```

### iVXjs:state:not-found

__Description__

Indicates that a url can't be found 

__Payload__ 
```
{
    "type" : "string",
    "name": "url",
    "description" : "The invalid url that was sent to the navigation service.
}
```

## Video Events 

__Overview__

These events are triggered by 

### iVXjs:video:can-play

__Description__

Indicates that this video is ready to play 

__Payload__ 

player - current instant of this video player.

stateData - state data where this player exists.

### iVXjs:video:dispose

__Description__ 

Removes all events from the Bus partaining to this particular video event and 
performs other tasks to remove this video player from the page 

__Payload__ 

None 

### iVXjs:video:ended

__Description__ 

Indicates that the current video playing has ended 

__Payload__ 

videoClass - The current instance of this video module class 

### iVXjs:video:get-duration

__Description__ 

Sends a request to get the current video's duration. _Note: You must listen for iVXjs:video:set-duration event to get the duration_

__Payload__ 

None 

### iVXjs:video:mute

__Description__ 

Mutes the current video. 

__Payload__

None 

### iVXjs:video:pause

__Description__ 

Pauses the current video. 

__Payload__ 

None 

### iVXjs:video:play 

__Description__ 

Plays the current video. 

__Payload__ 

None 

### iVXjs:video:seek

__Description__ 

Sets the current video to the time in seconds 

__Payload__ 

```
{
    "type": "number", 
    "description" : "The time to seek in seconds"
}
```

### iVXjs:video:set-duration 

__Description__ 

Used mostly to set a counter to the current video's duration. 

__Payload__ 
```
{
    "type" : "number",
    "description" : "The duration of this video in seconds."
}
```

### iVXjs:video:set-volume 

__Description__ 

Sets the current video's volume. Range: 0 to 1;

__Payload__
```
{
    "type" : "number",
    "min" : 0,
    "max" : 1,
    "description" : "The volume to set between 0-1
}
```

### iVXjs:video:time-update 

__Description__

Fires when the video triggers a timeupdate call. Used for actions 
during videos.

__Payload__ 

player - current instant of this video player.

player.currentTime - current time of this video player;

stateData - state data where this player exists.

### iVXjs:video:unmute 

__Description__ 

Unmutes the current video and sets the volume to the last volume 
set. 

__Payload__ 

None 

## Angular Specific Events 

__Overview__ 

These events only fire when using the Angular implementation of iVXjs.

### iVXjs:angular:bootstrapped

__Description__ 

Indicates that the iVXjs Angular module was successfully bootstrapped to its 
elements.

__Payload__ 

None 

### iVXjs:angular:template-not-found

__Description__ 

When using the `ng-include` directive in Angular, sometimes a template is not found and this 
will fire when this happens. 

__Payload__ 

event - Error event that was fired. 

## iVXio Specific Events 

__Overview__

These events fire when using the iVXio Data Module.

### iVXjs:iVXio:error:event-not-fired

__Description__ 

When an iVXio event was not fired due to some error, this event gets fired 

__Payload__ 

eventArgs - Event arguments fed into the event.

error - Error passed from the unresolved error. Should contain a message.

### iVXjs:iVXio:error:experience

__Description__

Fires whenever there is an error retrieving an experience from the platform.

__Payload__ 

error - Error information collected when trying to recieve the data.

### iVXjs:iVXio:error:platform-unavailable

__Description__ 

Fires if iVXjs can't detect the global iVX object 

__Payload__ 

None