---
layout: single
---

# Inline Video for iPhone

{% include toc %}

## Overview

Video on iOS on an iPhone takes up the whole screen and if the developer wants to 
be able to create a seemless experience between mobile devices, this can cause some hassles.
But, iVXjs has a built in system that can play inline iPhone video by using a iphone-inline-video.js 
library and iVXjs's robust system for videos and personalizations.

## Demo 

[Inline iPhone Demo](https://github.com/influencetech/ivx-js/tree/master/demos/iphone-inline)

## Getting Started with iPhone Inline 

### Dependencies 

This feature has the following code dependencies: 

* [iphone-inline-video](https://github.com/bfred-it/iphone-inline-video)

### Setting up the HTML 

Follow the instructions for setting up an [[angular.ivx.js](https://influencetech.github.io/ivx-js/developer/tutorial.hello-world) project but you will 
include the following script tag to your script dependencies:

```
<script src='[PATH-TO-JS]/iphone-inline-video.browser.js'></script>
```

## Using the JSON to indicate inline iPhone 

### Overview 

To tell iVXjs to use inline video for iPhone, you must set up the player settings 
in a video state with the correct data. This section will show you what data points 
to add. 

_Note: mp4 format is the only formatted supported for inline video._

### Sample Data 

To start out, we will be using this data: [video-state-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/video-state-sample.json) file.

### Process to add inline iPhone video 

First let's take a sample video state: 

```
{
    ...
    {
        "id": "html5-video-state-test",
        "name": "HTML5 Video Test",
        "url": "/html5-video-test",
        "type": "video",
        "header": {},
        "footer": {},
        "onEnter": [],
        "onExit": [],
        "next": [],
        "onVideoEnd": [],
        "playerSettings": {
            "controls": "standard",
            "sources": [{
                "src": "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
                "type": "video/mp4"
            }]
        },
        "personalizations": [],
        "cuePoints": []
    ...
}
```

If we ran this and loaded it on an iPhone it would look something like this:
![iPhone Initial](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/iphone-without-inline.png)

When we press play, the player will take over the whole screen: 
![iPhone Full Screen](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/iphone-full-screen-player.png)

To prevent this behavior you will need to update the video state data in the JSON:

* Find a the player settings in your video state 

```
{
    ...
    {
        "id": "html5-video-state-test",
        "name": "HTML5 Video Test",
        "url": "/html5-video-test",
        "type": "video",
        "header": {},
        "footer": {},
        "onEnter": [],
        "onExit": [],
        "next": [],
        "onVideoEnd": [],
        "playerSettings": {
            "controls": "standard",
            "sources": [{
                "src": "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
                "type": "video/mp4"
            }]
        },
        "personalizations": [],
        "cuePoints": []
    ...
}
```

```
{
...
"playerSettings": {
    "controls": "standard",
    "sources": [{
        "src": "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
        "type": "video/mp4"
    }]
}
...
}
```

* Add the following data points to your player settings: 
    * iphoneInline - A boolean indicate to use inline video 
    * inlineSrc - The source for the inline video 

```
{
    ...
    "playerSettings": {
        "controls": "standard",
        "sources": [{
            "src": "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
            "type": "video/mp4"
        }],
        "inlineSrc": "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
        " : true
    },
    ...
}
```
* Refresh your page and press play and the video should play wihtout taking over the screen:
![iphone inline player](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/iphone-inline-playing%20copy.png)

## Special Notes

As you can see from the example, the play button for the player is still visible. The documentation for the iphone-inline-video library will tell you how to use CSS to hide it. 