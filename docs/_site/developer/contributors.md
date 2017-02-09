#iVXjs#

A library with core functionality to run iVX.io like experiences.

##Development Setup##
1. Run `npm install`
2. After installation, run `npm start`
3. The 'core' demo will open: [link](http://localhost:8888/core)

##Application Frameworks##
 
###angular.ivx.js###

File source: `dist/angular.ivx.js`

**Dependencies**

* [angular](https://angularjs.org/)
* [ui-router](https://github.com/angular-ui/ui-router)
* [ngSanitize](https://docs.angularjs.org/api/ngSanitize)

Minified versions of each of these can be found in the `/deps` folder.

##iVXjs's Class Overview##

The iVXjs class has three main properties:

* **config** 
    * These are settings for the experience and what needs to be rendered and how interactions are done. 
      This object will have a structure that iVXjs's libraries can recognize and create the states and elements
* **experience**
    * Contains data and functions that record that data for this experience. By default, an experience contains an
      object called `data` which is all the current data and `setData` which sets the data of this object.
* **rules**
    * A function that processes an array of rules and results used for navigating based on the data.
    
###Getting Started: Creating an Input State using angular.ivx.js###

1. Add the following HTML into your body tag:
``` 
<!-- Initializes your app -->
<div ng-app="app"></div>
<!-- Angular library and depencies -->
<script src="[PATH-TO-JS]/angular.min.js"></script>
<script src="[PATH-TO-JS]/angular-ui-router.min.js"></script>
<script src="[PATH-TO-JS]/angular-sanitize.min.js"></script>
<script src="[PATH-TO-JS]/angular.ivx.js"></script> 
<script>
    angular
    .module('app', ['ivx-js'])
    .run(function(){
        iVXjs.init({
            config :[CONFIG-DATA]
        })
    })    
</script>
```
2. Replace *[PATH-TO-JS]* with the path to your dependencies
3. Replace *[CONFIG-DATA]* in the sample code above with the following snippet:
```
{
    "defaultState": [{
        "stateId": "hello-world"
    }],
    "states": [{
        "id": "hello-world",
        "name": "Hello World",
        "url": "/hello-world",
        "type": "input",
        "display": "form",
        "header": {
            "html" : "<h1>Welcome to iVXjs!</h1><h2>Write in your name below so we can get to know you.</h2>"
        },
        "footer": {
            "html" : ""
        },
        "onEnter":[],
        "onExit": [],
        "next": [{
            "stateId" : "welcome-screen"
        }],
        "onSubmit": [],
        "inputs": [{
            "id": "name",
            "type": "text",
            "name" : "name",
            "label" : "Your Name:"           
        }]
    },{
        "id" : "welcome-screen",
        "name" : "Welcome Screen",
        "url" : "/welcome-screen",
        "type" : "html",
        "html" : "<div class='welcome'><h1>Congratulations {{experience.name}}!</h1><h2>You made your first iVXjs Experience!</h2></div>"

    }]
}
```
4. Refresh the page and you will see some HTML got injected. The page should look something like
   this following:
>![Hello World](http://c21a7b8386ed9a02468f-07e63bba35c8c27197d9291d1fa4660f.r67.cf2.rackcdn.com/iVXjs-Images/Finished%20Screen%20For%20iVXjs%20Hello%20World.png)
5. Write your name in the text field provided.
6. Click submit
7. You will see on the next page your name next to "Congratulations".


##Advanced States##

###Video States###

A Video State is a state that allows you to embedembed HTML5, YouTube, or Vimeo videos, but with the added bonus of making them interactive and have personalized messages from information you are gathering using iVXjs. 

To show you how this is done, let's take the above example in _Getting Started_ and instead of an HTML state with a static congratulations, let's add a YouTube video and your name.

* Get your current config data object.
```
{
    "defaultState": [{
        "stateId": "hello-world"
    }],
    "states": [{
        "id": "hello-world",
        "name": "Hello World",
        "url": "/hello-world",
        "type": "input",
        "display": "form",
        "header": {
            "html" : "<h1>Welcome to iVXjs!</h1><h2>Write in your name below so we can get to know you.</h2>"
        },
        "footer": {
            "html" : ""
        },
        "onEnter":[],
        "onExit": [],
        "next": [{
            "stateId" : "welcome-screen"
        }],
        "onSubmit": [],
        "inputs": [{
            "id": "name",
            "type": "text",
            "name" : "name",
            "label" : "Your Name:"           
        }]
    },{
        "id" : "welcome-screen",
        "name" : "Welcome Screen",
        "url" : "/welcome-screen",
        "type" : "html",
        "html" : "<div class='welcome'><h1>Congratulations {{experience.name}}!</h1><h2>You made your first iVXjs Experience!</h2></div>"

    }]
}
```
* Replace the last object in the `state` array in your config with this spec (it is scary looking, but all will be explained)
```
{
    "id": "welcome-screen",
    "name": "Welcome Screen",
    "url": "/welcome-screen",
    "type": "video",
    "header": {
        "html" : "<h1>You made a video state you rock start!</h1>"
    },
    "footer" : {
        "html" : "<h2>Wait 10 seconds for a surprise!</h2>" 
    },
    "onEnter": [],
    "onExit": [],
    "next": [{
        "stateId": "vimeo-video-state-test"
    }],
    "onVideoEnd": [],
    "playerSettings": {
        "youtubeId": "wC9S_fFMnaU",
        "controls": false,
        "autoplay": true
    },
    "personalizations": [{
        "id": "congratulations",
        "html": "<h2>Surprise {{experience.name}}!</h2><h3>I am a personalization.</h3>"
    }],
    "cuePoints": [{
        "eventName": "animateElement",
        "timeAt": 10,
        "args": {
            "element": "#congratulations",
            "animationClass": "show"
        }
    }]
}
```
Resulting in this super scary config object:
```
{
    "defaultState": [{
        "stateId": "hello-world"
    }],
    "states": [{
        "id": "hello-world",
        "name": "Hello World",
        "url": "/",
        "type": "input",
        "display": "form",
        "header": {
            "html": "<h1>Welcome to iVXjs!</h1><h2>Write in your name below so we can get to know you.</h2>"
        },
        "footer": {
            "html": ""
        },
        "onEnter": [],
        "onExit": [],
        "next": [{
            "stateId": "welcome-screen"
        }],
        "onSubmit": [],
        "inputs": [{
            "id": "name",
            "type": "text",
            "name": "name",
            "label": "Your Name:"
        }]
    }, {
        "id": "welcome-screen",
        "name": "Welcome Screen",
        "url": "/welcome-screen",
        "type": "video",
        "header": {
            "html" : "<h1>You made a video state you rock start!</h1>"
        },
        "footer" : {
            "html" : "<h2>Wait 10 seconds for a surprise!</h2>" 
        },
        "onEnter": [],
        "onExit": [],
        "next": [{
            "stateId": "vimeo-video-state-test"
        }],
        "onVideoEnd": [],
        "playerSettings": {
            "youtubeId": "wC9S_fFMnaU",
            "controls": false,
            "autoplay": true
        },
        "personalizations": [{
            "id": "congratulations",
            "html": "<h2>Surprise {{experience.name}}!</h2><h3>I am a personalization.</h3>"
        }],
        "cuePoints": [{
            "eventName": "animateElement",
            "timeAt": 10,
            "args": {
                "element": "#congratulations",
                "animationClass": "show"
            }
        }]
    }]
}
```
* Remove the path from your URL and start from the first state and go through the input stage filling in your name and submit.
* Now watch the video and wait for a surprise!

###Video State Specs###
Here's a more indepth explanation of the Video JSON Spec:
```
{
    "id" : "video-state-id",  // Video State's Unique Id
    "name" : "Video State",   // Video State's Name
    "url" : "/video-state",   // Video State's URL path
    "type" : "video"          // Indicates you are making a video state
    "next" : [{               // An array of possible states you can do. Review rules for more info
        stateId : "state-2",
        "rule" : {
            "key" : "finished-video",
            "value" : true
        }

    },{
        stateId : "state-1"
    }],
    "header" : {    // Information on the header portion of the video (good place to put a title or description)
        "html" : "<h1>Video Header</h1>",   // HTML to fill in the header portion. If blank, it defaults to: <h1>[NAME-VALUE]</h1>
        "classes" : "huge"  // Classes to add to the header just in case you need to inject CSS styling through frameworks
    },
    "footer" : {    // Information for the footer
        "html" : "<h2>Video Footer</h2>",   // Allows you to add HTML to the footer for messages.
        "classes" : "footer"    // Classes to customize the footer of this video
    },
    "onEnter" : [{  // Anytime a user enters this state, this array of events will run
        "eventName" : "setData",    // Name of the event to run
        "args" : {  //Args to pass into the event
            "key" : "finished-video",
            "value" : false
         }
    }],
    "onExit" : [{   // Anytime a user leaves this state, this array of events will run
        "eventName" : "setData",            
        "args" : {                          
            "key" : "entered-video-state",
            "value" : true
         }
    },{
        "eventName" : "setData",            
        "args" : {                          
            "key" : "uniquePersonalization",
            "value" : "I am unique!"
         }

    }],
    "onVideoEnd": [{    // Runs only if the user has seen the full video
        "eventName" : "setData",
        "args" :{
            "key"  : "finished-video",
            "value" : true
        }
    }],
    /*
     * Depending on which video type (HTML5, YouTube, Vimeo) you wish to play you have the following options for video player settings. (Add whichever you need)
     */

     // HTML5 Video Player Settings Begin
     "playerSettings" : {
        "controls" : false, // What kind of controls you wish to appear on your player (false = none, "standard" = preset controls, otherwise standard HTML5 controls)
        "sources" : [{ // Array of video sources
            "src" : "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
            "type" : "video/mp4"
        }],
        "tracks" : [], // List of close captioning tracks
        "autoplay" : true // Plays when video is ready (iOS not supported) 
     },
     // HTML5 Video Player Settings End

     // YouTube Video Player Settings Begin
     "playerSettings" : {
        "youtubeId" : "wC9S_fFMnaU", // YouTube Video Id: You can pull that from here: https://www.youtube.com/watch?v=[youtubeId]
        "controls" : false, // Controls same as HTML5
        "autoplay" : true  // Same as HTML5
     },
     // YouTube Video Player Settings End

     // Vimeo Video Player Settings Begin
     "playerSettings" : {
        "vimeoId" : "wC9S_fFMnaU", // Vimeo Id: You can pull that from here: https://vimeo.com/[vimeoId]
        "controls" : false, // Controls same as HTML5
        "autoplay" : true  // Same as HTML5
     },
     // Vimeo Video Player Settings End

    "personalizations" : [{ // A personalization is a segment of HTML that is personalized to this experience. By default, it adds a class called 'hide' which you will need to add otherwise it will not be hidden by default
           "id" : "personalization", // ID to target this personalization using CSS / animateElement event
           "html" : "<h3>Personalization {{experience.uniquePersonalization}}</h3>"  // HTML to be put in the container. To inject personalizations, use {{experience.[key]}}
    }],

    "cuePoints" : [{ // Indicates to the video player to raise different events as video goes along depending on the t9ke
        "eventName" : "animateElement", // Event to raise
        "timeAt" : 5, // At which time to raise it
        "args" : { // Arguments for the event raised
            "element" : "#personalization",
            "animationClass" : "show"
        }
    }]

}


```