---
layout: single
---

# iVXjs Events

{% include toc %}

# Overview

If a developer wants to interact with an iVXjs experience, the easiest and quickest way
is to listen and emit events on the Bus. The Bus uses nodejs's [EventEmitter](https://nodejs.org/api/events.html)
and you can use it by pulling in iVXjs through the appropriate renderer. 

# Note about events documentation

The "payload" is all the information that is sent from the triggering event emitter. Be careful though, sometimes
an event is fired without the information provided so be careful in using the listeners. Also, the payload is 
documented in a [JSON Schema Org](http://json-schema.org/) fashion, but since events can send Functions the validator will not work with JSON validators.

# iVXjs Bus Implementations 

_Overview_ 

Each implementation would have its own implementation of the bus. The following are the various implementations.

## iVXjs Bus Angular Implementation

_Snippet_ 

```
angular 
    .module('[APPNAME]')
    .service(["ivxjs.bus", function(iVXjsBus){
        iVXjsBus.on('EVENTNAME', function(PAYLOAD){

        });
    }]);
```

# Audio Events

_Overview_

All events the audio module listens and fires. The payload 

## iVXjs:audio:can-play

_Description_

Indicates that the current audio file can play.

_Payload_

None

## iVXjs:audio:ended

_Description_

Indicates that the current audio file has ended.

_Payload_ 

None 

## iVXjs:audio:mute

_Description_

Mutes the audio 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:audio:mute"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:audio:mute"></ANY>
```

## iVXjs:audio:pause 

_Description_ 

Pauses the audio 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:audio:pause"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:audio:pause"></ANY>
```

## iVXjs:audio:play

_Description_

Plays the audio 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:audio:play"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:audio:play"></ANY>
```

## iVXjs:audio:time-update

_Description_ 

Fires whenever the audio's object on timeupdate event is fired.

_Payload_ 

The current instance of this Audio class.

## iVXjs:audio:unmute

_Description_

Unmutes and sets the audio back to the original volume 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:audio:unmute"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:audio:unmute"></ANY>
```

# Config Events

_Overview_ 

The time between when the `iVXjs.init()` function gets called and the user sees the experience rendered is considered
the configuration set. During this time, the following events can fire.

## iVXjs:config:not-valid

_Description_

Fires any instance where the config isn't valid utilizing the 
current Validation module. 

_Payload_

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

## iVXjs:config:validated

_Description_

Fires when config settings are validated. This event triggers 
all the rendering of the experience. 

_Payload_

A valid instance of iVXjs.

# Http Events 

_Overview_

Whenever there is a HTTP request, several events will be raised. 

## iVXjs:http:request:error

_Description_ 

Fires when a request has an error 

_Payload_ 

request - Request object sent to the server 

## iVXjs:http:request:success 

_Description_ 

Fires when a request is successful 

_Payload_ 

request - Request object sent to the server 

## iVXjs:http:response:error 

_Description_ 

Fires when there is an error in the response of the server 

_Payload_ 

response - Response from the server 

## iVXjs:http:response:success 

_Description_

Indicates that a response was successful 

_Payload_ 

response - Response from the server

# Logging Events

_Overview_ 

iVXjs has its own logging module that will log any information throughout the application. 
This logging service will fire events depending on what gets logged through the module.

## iVXjs:log 

_Description_ 

Indicates that iVXjs's Logging system has logged a message. 

_Payload_

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



## iVXjs:log:error 

_Description_

Indicates that an error is logged to the console. 

_Payload_ 

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

## iVXjs:log:trace

_Description_ 

Indicates that iVXjs's Logging system logged a stack-trace. 

_Payload_

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

## iVXjs:log:warn

_Description_ 

Indicates that iVXjs's Logging system has logged a warning. 

_Payload_

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

# State Events 

_Overview_ 

These events all handle interactions with states

## iVXjs:state:change

_Description_

Fires whenever a state has successfully changed

_Payload_

All the current information on this state.  

For Angular: The data sent will follow [ui-router's state's](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state) current data object.

## iVXjs:state:go

_Description_

Tells the navigation service to go to the state 

_Payload_

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

## iVXjs:state:not-found

_Description_

Indicates that a url can't be found 

_Payload_ 

```
{
    "type" : "string",
    "name": "url",
    "description" : "The invalid url that was sent to the navigation service.
}
```

# Video Events 

_Overview_

These events are triggered while a video state is loaded or while a video is playing. 

## iVXjs:video:can-play

_Description_

Indicates that this video is ready to play 

_Payload_ 

player - current instant of this video player.

stateData - state data where this player exists.


## iVXjs:video:dispose

_Description_ 

Removes all events from the Bus partaining to this particular video event and 
performs other tasks to remove this video player from the page 

_Payload_ 

None 

## iVXjs:video:ended

_Description_ 

Indicates that the current video playing has ended 

_Payload_ 

videoClass - The current instance of this video module class 

## iVXjs:video:get-duration

_Description_ 

Sends a request to get the current video's duration. _Note: You must listen for iVXjs:video:set-duration event to get the duration_

_Payload_ 

None 

## iVXjs:video:mute

_Description_ 

Mutes the current video. 

_Payload_

None 

_JSON_

```
{
    "eventName" : "iVXjs:video:mute"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:video:mute"></ANY>
```

## iVXjs:video:pause

_Description_ 

Pauses the current video. 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:video:pause"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:video:pause"></ANY>
```

## iVXjs:video:play 

_Description_ 

Plays the current video. 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:video:play"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:video:play"></ANY>
```

## iVXjs:video:seek

_Description_ 

Sets the current video to the time in seconds 

_Payload_ 

```
{
    "type": "object", 
    "properties: {
       "currentTime" : {
           "type" : "number",
            "description" : "The time to seek in seconds"
       }
    }
   
}
```

_JSON_

```
{
    "eventName" : "iVXjs:video:seek",
    "args" : {
        "currentTime" : TIME_IN_SECONDS
    }
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:video:seek" ivx-event-args="{currentTime : SECONDS}"></ANY>
```

## iVXjs:video:set-duration 

_Description_ 

Used mostly to set a counter to the current video's duration. 

_Payload_ 

```
{
    "type" : "number",
    "description" : "The duration of this video in seconds."
}
```

## iVXjs:video:set-volume 

_Description_ 

Sets the current video's volume. Range: 0 to 1;

_Payload_

```
{
    "type": "object", 
    "properties: {
       "volume" : {
           "type" : "number",
            "description" : "The volume to set",
            "min" : 0,
            "max" : 1
       }
    }
   
}
```

_JSON_

```
{
    "eventName" : "iVXjs:video:set-volume",
    "args" : {
        "volume" : VOLUME_AMOUNT
    }
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:video:volume" ivx-event-args="{volume : VOLUME_AMOUNT}"></ANY>
```

## iVXjs:video:time-update 

_Description_

Fires when the video triggers a timeupdate call. Used for actions 
during videos.

_Payload_ 

player - current instant of this video player.

player.currentTime - current time of this video player;

stateData - state data where this player exists.

## iVXjs:video:unmute 

_Description_ 

Unmutes the current video and sets the volume to the last volume 
set. 

_Payload_ 

None 

_JSON_

```
{
    "eventName" : "iVXjs:video:unmute"
}
```

_Action Template_

```
<ANY ivx-event="iVXjs:video:unmute"></ANY>
```

# Track Cues Events

_Overview_

These events fire when you add track cues to the player settings. These cues 
are for subtitles and close caption, but also chapters and metadata. 

## iVXjs:tracks:on-track-change

_Description_

This fires whenever a language track is changed on the video. This is helpful if you 
need the content in an experience to change to another language.

_Payload_

```
{
    "name" : "Current Tracks",
    "type" : "object",
    "properties" : {
        oldTrack: {
            type : "object",
            description: "The previous track that was changed from"
        },

        currentTrack: {
            type : "object",
            description: "The current track that was changed to."
        }
    }
}
```

## iVXjs:tracks:cues:on-enter

_Description_

Fires whenever a cue is started. Note, for tracks with kind caption, or subtitles, the cue 
that is sent is the track that is showing. All other kinds always gets passed down.

_Payload_

The cue that was started. The payload properties depends on the kind (See JSON Spec Documentation for details)

## iVXjs:tracks:cues:on-exit

_Description_

Fires whenever a cue finishes. Note, this doesn't fire for caption kind of track.

_Payload_

Sends the track that is currently finishing

## iVXjs:tracks:cues:on-chapter-start

_Description_

Fires whenever a new chapter begins.

_Payload_

Cue containing all the chapter information

## iVXjs:tracks:cues:on-chapter-end

_Description_

Fires whenever a chapter ends

_Payload_

Cue containing all the chapter info that ended

# Angular Specific Events 

_Overview_ 

These events only fire when using the Angular implementation of iVXjs.

## iVXjs:angular:bootstrapped

_Description_ 

Indicates that the iVXjs Angular module was successfully bootstrapped to its 
elements.

_Payload_ 

None 

## iVXjs:angular:template-not-found

_Description_ 

When using the `ng-include` directive in Angular, sometimes a template is not found and this 
will fire when this happens. 

_Payload_ 

event - Error event that was fired. 

## iVXio Specific Events 

_Overview_

These events fire when using the iVXio Data Module.

## iVXjs:iVXio:error:event-not-fired

_Description_ 

When an iVXio event was not fired due to some error, this event gets fired 

_Payload_ 

eventArgs - Event arguments fed into the event.

error - Error passed from the unresolved error. Should contain a message.

## iVXjs:iVXio:error:experience

_Description_

Fires whenever there is an error retrieving an experience from the platform.

_Payload_ 

error - Error information collected when trying to recieve the data.

## iVXjs:iVXio:error:platform-unavailable

_Description_ 

Fires if iVXjs can't detect the global iVX object 

_Payload_ 

None