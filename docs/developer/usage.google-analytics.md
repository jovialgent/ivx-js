---
layout: single
source : https://influencetech.github.io/ivx-js/
---



<!-- source : http://127.0.0.1:4000/ivx-js/ -->

<style>
         /* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width:200px;
    padding: 5px 5px;
    border-radius: 6px;
    border:solid 2px rgba(0,0,0,0.7);
    background-color:white;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -100px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.5s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -9px;
    border-width: 9px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip-header{
    
    border-bottom:solid 1px;
    text-align:center;
}

.addional-info-label{
    display:block;
    width:100%;
    font-weight:bold;

    
}
.tooltip-content{
    display:block;
    width:100%;
    padding:3px 10px;
}
/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>

# Google Analytics

{% include toc %}

## Overview

Tracking how your user behaves and interacts with your iVXjs experience is very important. This is why
an optional module called the iVXjs Google Analytics module was created. This module 
will hook up your experience to Google Analytics with only you supplying a Google Tracking Id. 
This will also allow you to send events anywhere in an iVXjs experience! This configuration 
is both showing you how to set it up for your experience and some common uses for getting the
most out of this module.

## Set Up

To use the Google Analytics module you will need to do the following.

* Add the iVXjs Google Analytics file and a copy of the Google's analytics to your html:

```html
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.8.8/iVXjs.analytics.google.js"></script>
<script>
    (function (b, o, i, l, e, r) {
        b.GoogleAnalyticsObject = l; b[l] || (b[l] =
            function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;
        e = o.createElement(i); r = o.getElementsByTagName(i)[0];
        e.src = 'https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e, r)
    }(window, document, 'script', 'ga'));
</script>
```

* Put your Google Tracking Id in your experience's JSON's metadata:

```json
{
    "metadata" : {
         "trackingId": "UA-XXXXXXXX-X"
    },
    "states" : [{

    }],
    "defaultState" : [{

    }]
}
```

*  Where you set up your iVXjs you can inject the iVXjsGoogleAnalytics service in your config and put it in the init function.

```javascript
angular
    .module('app', ['ivx-js'])
    .config(config);

config.$inject = ["iVXjs", "iVXjs.analytics.google"];

function config(iVXjs, iVXjsGoogleAnalytics) {
    iVXjs.init({
        analytics: iVXjsGoogleAnalytics({}, iVXjs),
        config: 'data/project.json'
    });
}
```

That is it! The Analytics Module will set up.

## Built-In Features

### Default

Out of the box, the Google Analytics Module will do the following:

* Create a tracker named "ivxjsTracker"
    * If you would like to change the name of the tracker you can do so in the iVXjsGoogleAnalytics: 

```javascript
...
analytics: iVXjsGoogleAnalytics({
    name : "myTracker"
}, iVXjs)
...
```

* Sends a pageview event to Google Analytics
* On every state change, it will send a pageview for that particular state which includes that state's URL

## Actions

The following actions are available when using the Google Analytics Module:

### sendEvent

_Description_

Sends out an event to Google Analytics. The arguments of this will be what is sent using the 'send' action:

```javascript
var args = {
    hitType: 'event',
    eventCategory: 'Video',
    eventAction: 'play',
    eventLabel: 'test.mp4' 
};

ga('send', args);
```

The optional tracker in the args lets you select which tracker. So for example, here is how the args are treated
with the tracker by the ga service:

```javascript
var args = {
    tracker : 'myTracker'
    hitType: 'event',
    eventCategory: 'Video',
    eventAction: 'play',
    eventLabel: 'test.mp4' 
};
var trackerName = args.tracker ? args.tracker + "." : "";

delete args.tracker;

ga(trackerName+'send', args);
```

You can find more information about send here [Send Documentation](https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#send)

_Sample Data_

[event-analytics-sendEvent.json]({{page.source}}developer/sample-JSON/event-analytics-sendEvent.json)

_Schema_

[event-analytics-SendEvent.jsond]({{page.source}}developer/schemas/event-analytics-sendEvent.jsond)


<div id="event-analytics-sendEvent-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-analytics-sendEvent.jsond"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.2/lodash.min.js"></script>
<script src="{{page.source}}assets/js/jsond-table-creator.js"></script>

## Basic Service Examples

Using the Analytics module in your code with the iVXjs Bus can allow you to track a lot of user
interaction. Below are some snippets to help you get started using the iVXjs Google Analytics module in your 
application.

### Tracking Video Events

Let's say you have a video state with a native video (HTML5 Video) and want to track basic video interactions. In this case,
if the user clicked play, watched half way. You can do so by adding the following to your config function on your app:

```javascript
var videosPlayed = [];
var watchedHalfway = [];

/**
 * This will send event data to Google Analytics when the current video plays. It will fire only once
 * per video
 */
iVXjs.Bus.on(iVXjs.constants.VIDEO.EVENTS.PLAYING, function (args) {
    var video = args[0];
    var checkedVideoPlayed = videosPlayed.find(function (src) { return video.currentSrc === src });

    if (!checkedVideoPlayed) {
        iVXjs.experience.actions.resolveActions([{
            eventName: "sendEvent",
            args: {
                "hitType": "event",
                "eventCategory": "Video",
                "eventAction": "played",
                "eventLabel": '{"src" : "' + video.currentSrc + '"}'
            }
        }], function () {
            console.log("Fired video played event");
        });

        videosPlayed = videosPlayed.concat([video.currentSrc]);
    }
});



/**
 * This will send event data when any video reaches halfway and will only send the
 * data once per video.
 */
iVXjs.Bus.on(iVXjs.constants.VIDEO.EVENTS.TIME_UPDATE, function (args) {
    var video = args[0];
    var duration = video.duration;
    var currentTime = video.currentTime;
    var progress = currentTime / duration;
    var checkedHalfway = watchedHalfway.find(function (src) { return video.currentSrc === src });

    if (progress >= 0.5 && !checkedHalfway) {
        iVXjs.experience.actions.resolveActions([{
            eventName: "sendEvent",
            args: {
                "hitType": "event",
                "eventCategory": "Video",
                "eventAction": "watchedHalfway",
                "eventLabel": '{"src" :"' + video.currentSrc + '"}'
            }
        }], function () {
            console.log("Fired watched halfway");
        });

        watchedHalfway = watchedHalfway.concat([video.currentSrc]);
    }
});
```