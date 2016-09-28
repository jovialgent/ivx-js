---
layout: single

---

# Hello World using angular.ivx.js 

{% include toc %}

## Overview

The [Angular](https://angularjs.org/) distribution of iVXjs utilizes Angular's dependency 
injection and other features to render the individual states and elements. It is very simple
to set up 

## Demo 

[Live Demo](https://influencetech.github.io/ivx-js/sample-experience/)

[Source](https://github.com/influencetech/ivx-js/tree/master/demos/hello-world)

## Getting Started

### Downloading the library

* Clone this repository or download zip
* Via npm `npm install ivx-js-angular --save`

### iVXjs Angular's Dependencies

The Angular iVXjs instance--iVXjs for this documentation--has the following script dependencies:

* [Angular 1.5](https://angularjs.org/)
* [Angular UI-Router](https://github.com/angular-ui/ui-router)
* [ngSanitize](https://docs.angularjs.org/api/ngSanitize)

### Let's create a simple iVXjs Experience 

To get started, follow the steps below:

* Add the following HTML to the working project file:

```
<!-- Angular application for this page -->
<div ng-app="app"></div>

<!-- Container for an iVXjs Experience -->
<div id='ivx'></div>

<!-- iVXjs Angular Library Dependencies  -->
<script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.0-alpha.5/angular-ui-router.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.5.6/angular-sanitize.min.js'></script>
<script src='[PATH-TO-JS]/angular.ivx.js'></script>

<!-- Youtube iFrame API -->
<script src='https://www.youtube.com/iframe_api'></script> 

<script>
angular
  .module('app', ['ivx-js'])
    .config(['iVXjs', function(iVXjs){
      iVXjs.init({
        config:"data/sample-experience.json"
      });
    }]);    
</script>

<!-- Angular Templates -->

<!-- Form Header Template -->
<script type="text/ng-template" id="form-header.html">
	<h1>Welcome to an iVXjs Sample Experience</h1>
</script>

<!-- Name Personalization Template -->
<script type="text/ng-template" id="name-personalization.html">
	<h1>Hey, {{experience.fullName}}, finding this cool?</h1>
</script>

<!-- Helpful Links Header Template -->
<script type="text/ng-template" id="helpful-links-header.html">
	<h1>Now that you have seen it {{experience.fullName}}, create an experience of your own!</h1>
</script>
```

* Create a folder called *data*
* Create a file called *sample-experience.json*
* Copy the following contents into the *sample-experience.json* file:

```
{
    "defaultState": [
        {
            "stateId": "welcome-form"
        }
    ],
    "states": [
        {
            "id": "welcome-form",
            "name": "Welcome Form",
            "url": "/",
            "type": "input",
            "header": {
                "templateUrl": "form-header.html"
            },
            "form": {
                "classes": "",
                "submit": {
                    "label": "Get started!"
                }
            },
            "next": [
                {
                    "stateId": "video-sample"
                }
            ],
            "inputs": [
                {
                    "id": "full-name",
                    "name": "fullName",
                    "type": "text",
                    "label": "Your name:",
                    "settings": {
                        "container": {},
                        "input": {}
                    },
                    "attributes": {
                        "placeholder": "Enter your name here...",
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "video-sample",
            "name": "Video Sample",
            "url": "/video-sample",
            "type": "video",
            "next": [
                {
                    "stateId": "helpful-links"
                }
            ],
            "playerSettings": {
                "youtubeId": "oErhFh4AyZ0"
            },
            "personalizations": [
                {
                    "id": "name-personalization",
                    "templateUrl": "name-personalization.html"
                }
            ],
            "cuePoints": [
                {
                    "timeAt": 0,
                    "eventName": "animateElement",
                    "args": {
                        "element": "#name-personalization",
                        "animationClasses": "show"
                    }
                },
                {
                    "timeAt": 5,
                    "eventName": "animateElement",
                    "args": {
                        "element": "#name-personalization",
                        "animationClasses": "hide"
                    }
                }
            ]
        },
        {
            "id": "helpful-links",
            "name": "Helpful Links",
            "url": "/helpful-links",
            "type": "navigation",
            "header": {
                "templateUrl": "helpful-links-header.html"
            },
            "links": [
                {
                    "href": "https://influencetech.github.io/ivx-js/developer/tutorial.hello-world/",
                    "attributes": {
                        "target": "_blank"
                    },
                    "label": "Getting Started with iVXjs",
                    "classes": "btn",
                    "onClick": []
                },
                {
                    "href": "https://influencetech.github.io/ivx-js/developer/tutorials/",
                    "attributes": {
                        "target": "_blank"
                    },
                    "label": "Tutorials",
                    "classes": "btn",
                    "onClick": []
                },
                {
                    "href": "https://influencetech.github.io/ivx-js/developer/configuration/",
                    "attributes": {
                        "target": "_blank"
                    },
                    "label": "JSON Specs and Configurations",
                    "classes": "btn",
                    "onClick": []
                }
            ]
        }
    ]
}
```

* The result should look like this:
![Sample Experience Form](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/github/sample-experience-form-no-style.png)

To make it look a little better, let's add some styling. There are some default styles provided in these css files:

* __core.css__ (tools/utilities/css/core.css) - Core styling with iVXjs styling components such as a input grid system, YouTube video sizing, etc.
* __basic-style.css__ (tools/utilities/css/core.css) - A basic style for iVXjs

After adding these css files, the experience should look something like this:
![Sample Experience Form With Styling](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/github/sample-experience-form-styling.png)