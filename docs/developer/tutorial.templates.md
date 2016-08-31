---
layout: single
---

# iVXjs Templates Tutorial

{% include toc %}

## Overview

As a developer, you may want to utilize templates for adding HTML to elements such as 
state headers/footers and labels. To do this, you can add data that is a path to the 
_.html_ file where you template is. 

## HTML State Templates

### Overview 

As a developer, you will probably be using templates mostly in HTML states. These states
can have a very long and cumbersome HTML strings since this state acts more or less like 
a static web page. This will show you how to add templatesUrls into HTML states.

### Sample Data

For this section of the tutorial, we will be using [html-state-sample.json]({% include base_path %}/developer/sample-json/html-state-sample.json) file.

### From JSON: HTML State's HTML

Let's first review how the HTML state renders HTML without a template:


* HTML State's Data From JSON file:

```
{
    "id": "html-state-sample",
    "name": "HTML State Sample",
    "url": "/html-state-sample",
    "type": "html",
    "html" : "<h1>Sample HTML State</h1><h2>Will time out in 5 seconds</h2>",
    "onEnter": [],
    "onExit": [],
    "onTimeout" : [],
    "timeoutInMs": 5000,
    "next": [{
        "stateId" : "html-state-sample-2"
    }]
}
```

* Add change the HTML to `"<h1 class=\"test-class\">HTML State</h1><h2>This came from the JSON</h2>"` to the `html`:

```
{
	...
	html : "<h1 class=\"test-class\">HTML State</h1><h2>This came from the JSON</h2>"
	...
}
```

* After adding the HTML it should look like this:

![HTML State HTML From JSON](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/HTML-State-From-JSON.png)

### From Template: HTML State's HTML

Even though adding HTML from the JSON does work, it could bloat the JSON spec if we had to add any other 
elements to the HTML and on top of that. It could cause JSON lint errors if we aren't careful about escaping 
characters when writing it. 

So, let's move the value of `html` in the spec to its own template.

* Move the value of `html` to a file called _html-state.html_ : 

_html-state.html_

```
<h1 class="test-class">HTML State</h1>
<h2>This came from the JSON.</h2>
```

* Change the `<h2>` element to read "This came from a template.":

_html-state.html_

```
<h1 class="test-class">HTML State</h1>
<h2>This came from a template.</h2>
```

* Remove the `html` data from the HTML State Data:

```
{
	"id": "html-state-test",
	"name": "HTML State Test",
	"url": "/html-state-test",
	"type": "html",
	"onEnter": [],
	"onExit": [],
	"next": [
	   
	]
}
```

* Add a new key `templateUrl` whose value is "html-state.html":

```
{
	"id": "html-state-test",
	"name": "HTML State Test",
	"url": "/html-state-test",
	"type": "html",
	"templateUrl" : "html-state.html",
	"onEnter": [],
	"onExit": [],
	"next": [
	   
	]
}
```

* Refresh the page, and you should see a screen similar to this one:

![HTML From Template](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/HTML-From-Template.png)

## Header/Footer Templates

### Overview

Any state that has a header/footer data object can use templates for their HTML. This will help a developer
be able to add intricate headers and footers without bloating the JSON spec.

### Sample Data

For this tutorial we will be using the [video-state-sample.json]({% include base_path %}/developer/sample-json/video-state-sample.json) file.

### From JSON: Adding HTML to Headers/Footers

To add custom HTML to the Headers/Footers from JSON do the following:

* Here is the sample Video State Data:

```
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
}
```

* Add the key `"html"` with value `"<h1 class=\"class-test\">I AM FROM THE JSON</h1>"`to either the header or footer object:

```
{
	...
	"header" : {
		"html" : "<h1 class=\"class-one\">I AM FROM THE JSON</h1>"
	},
	...
}
```

* The resulting data will look like this:

```
{
    "id": "html5-video-state-test",
    "name": "HTML5 Video Test",
    "url": "/html5-video-test",
    "type": "video",
    "header": {
       	"html" : "<h1 class=\"class-one\">I AM FROM THE JSON</h1>",
        "classes": ""
    },
    "footer": {
        "html": ""
    },
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
}
```

* This will render something like this:
![Video State Header HTML From JSON](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Video-State-Header-HTML-From-JSON.png)

### From Template: Adding HTML to Headers/Footers

To add custom HTML to the headers/footers from a template, we will modify the above data as follows:

* Here is the video state data from above:

```
{
    "id": "html5-video-state-test",
    "name": "HTML5 Video Test",
    "url": "/html5-video-test",
    "type": "video",
    "header": {
        "html": "",
        "classes": ""
    },
    "footer": {
        "html": ""
    },
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
}
```

* Take the HTML from the header's `"html"` value and add it to a file called 'video-header.html' and replace the text to read "I AM FROM A TEMPLATE!":

_video-header.html_

```
<h1 class="test-class">I AM FROM A TEMPLATE!</h1>
``` 

* Replace the header's `"html"` with the key `"templateUrl"` whose value is `"video-header.html"`:

```
{
	...
	"header" : {
		"templateUrl" : "video-header.html"
	},
	...
}
```

* The resulting video state data will look like this:

```
{
    "id": "html5-video-state-test",
    "name": "HTML5 Video Test",
    "url": "/html5-video-test",
    "type": "video",
    "header": {
        "templateUrl" : "video-header.html",
        "classes": ""
    },
    "footer": {
        "html": ""
    },
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
}
```

* Refresh the page, and it should look something like this:
![Video State Header HTML From Template](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Video-State-Header-HTML-From-Template.png)

## Video Personalizations Templates

### Overview

As a developer, some video personalizations--segments of HTML to appear/disappear as a user watches a video-- will
require a template to be able to render and behave correctly. 

### Sample Data

For this tutorial we will be using the [video-state-sample.json]({% include base_path %}/developer/sample-json/video-state-sample.json) file.

### Special note about personalizations:

Personalizations, which typically show and hide and a cuepoint, requires some CSS to allow this behavior. In this tutorial, the state will add the class "hide" and on the cuepoint will add the class "show". If you don't have any CSS to support these behaviors, this will not work. To support these, you can add this HTML:

```
<style>
	.show {
        -webkit-animation: showState 0.1s;
        -moz-animation: showState 0.1s;
        -o-animation: showState 0.1s;
        animation: showState 0.1s;
        opacity: 1;
    }
    
    .hide {
        -webkit-animation: hideState 0.1s;
        -moz-animation: hideState 0.1s;
        -o-animation: hideState 0.1s;
        animation: hideState 0.1s;
        opacity: 0;
    }

    @-webkit-keyframes hideState {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            display: none;
            visibility: hidden;
        }
    }
    
    @-moz-keyframes hideState {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            display: none;
            visibility: hidden;
        }
    }
    
    @-o-keyframes hideState {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            display: none;
            visibility: hidden;
        }
    }
    
    @keyframes hideState {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            display: none;
            visibility: hidden;
        }
        ;
    }
   
    @-webkit-keyframes showState {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    @-moz-keyframes showState {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    @-o-keyframes showState {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    @keyframes showState {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
        ;
    }
</style>
```

### From JSON: Adding HTML To Personalizations

To add custom HTML to a personalization, do the following:

* Here is the base state data from the sample:

```
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
}
```

* Add a personalization by adding an object to the personalizations array with keys `"id"` which is the id of 
personalization and `"html"` which is the HTML for the personalization:

```
{
    ...
    "personalizations": [{
    	"id" : "personalization",
    	"html" : "<h1>I am from the JSON.</h1>"
    }],
    ...
}
```

* Add a cuePoint data object the event "animateElement" at 2 seconds which will show your personalization:

```
{
    ...
    "cuePoints": [{
    	"eventName" : "animateElement",
    	"timeAt" : 2,
    	"args" : {
    		"element" : "#personalization",
    		"animationClasses" : "show" 
    	}
    }]
    ...
}
```

* The resulting state data will look like this:

```
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
    "personalizations": [{
        "id": "personalization",
        "html": "<h1>I am from the JSON.</h1>"
    }],
    "cuePoints": [{
        "eventName": "animateElement",
        "timeAt": 2,
        "args": {
            "element": "#personalization",
            "animationClasses": "show"
        }
    }]
}
```

* Once you add this data, play the video and after 2 seconds, you should see something like this:
![Personalization From JSON](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Personalization-From-JSON.png)

### From Template: Using Templates For Personalizations

Let's now use templates for personalizations. 

* Here is the current state data from the above tutorial:

```
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
    "personalizations": [{
        "id": "personalization",
        "html": "<h1>I am from the JSON.</h1>"
    }],
    "cuePoints": [{
        "eventName": "animateElement",
        "timeAt": 2,
        "args": {
            "element": "#personalization",
            "animationClasses": "show"
        }
    }]
}
```

* To begin, move the value of the "html" from the personalization with id "personalization" and add it
to a file called "video-personalization.html" and change the text to read "I am a personalization from a template.":

_video-personalization.html_

```
<h1>I am a personalization from a template.</h1>
```

* Replace the `"html"` in the personalization with the key `"templateUrl"` with value `"video-personalization.html"`:

```
{
	...
	"personalizations" : [{
		"id" : "personalization",
		"templateUrl" : "video-personalization.html"
	}]
	...
}
```

* The resulting state data will be:

```
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
    "personalizations": [{
        "id": "personalization",
        "templateUrl" : "video-personalization.html"
    }],
    "cuePoints": [{
        "eventName": "animateElement",
        "timeAt": 2,
        "args": {
            "element": "#personalization",
            "animationClasses": "show"
        }
    }]
}
```

* Now play the video, and after 2 seconds, the player should look something like this:
![Personalization From Template](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Personalization-From-Template.png)

## Label Templates

Anywhere in the JSON spec where there is either a `"label"` or `"labelHTML"`, you can add a template.

### Sample Data for Label Template Tutorial

For this tutorial we will be using the [input-state-sample.json]({% include base_path %}/developer/sample-json/input-state-sample.json) file.

### From JSON: Adding Label HTML

* Here is the original input state data from the sample file:

```
{
    "id": "input-state-test",
    "name": "Input State Test",
    "url": "/input-state-test",
    "type": "input",
    "header": {},
    "footer": {},
    "onEnter": [],
    "onExit": [],
    "onSubmit": [],
    "form": {
        "classes": "",
        "submit": {}
    },
    "next": [],
    "inputs": [{
        "id": "text-input-test",
        "name": "textInputTest",
        "type": "text",
        "label": "I am a label",
        "settings": {
            "container": {},
            "input": {}
        },
        "attributes": {}
    }]
}
```

* Find the input object with `"id"` value of `"text-input-test"` in the inputs array:

```
{
	...
	 "inputs": [{
        "id": "text-input-test",
        "name": "textInputTest",
        "type": "text",
        "label": "I am a label",
        "settings": {
            "container": {},
            "input": {}
        },
        "attributes": {}
    }]
	...
}
```

```
...
{
    "id": "text-input-test",
    "name": "textInputTest",
    "type": "text",
    "label": "I am a label",
    "settings": {
        "container": {},
        "input": {}
    },
    "attributes": {}
}
...
```

* To add the custom html, replace `"label"` with `"labelHTML"` and its value to `"<h2>I am from the JSON</h2>"` in this input:

```
[
	...
	{
	    "id": "text-input-test",
	    "name": "textInputTest",
	    "type": "text",
	    "labelHTML": "<h2>I am from the JSON</h2>",
	    "settings": {
	        "container": {},
	        "input": {}
	    },
	    "attributes": {}
	}
	...
]
```

* The resulting input state data should look like this:

```
{
    "id": "input-state-test",
    "name": "Input State Test",
    "url": "/input-state-test",
    "type": "input",
    "header": {},
    "footer": {},
    "onEnter": [],
    "onExit": [],
    "onSubmit": [],
    "form": {
        "classes": "",
        "submit": {}
    },
    "next": [],
    "inputs": [{
        "id": "text-input-test",
        "name": "textInputTest",
        "type": "text",
        "labelHTML": "<h2>I am from the JSON</h2>",
        "settings": {
            "container": {},
            "input": {}
        },
        "attributes": {}
    }]
}
```

* This should render like this:
![Label HTML From JSON](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Label-HTML-From-JSON.png)

### From Template: Adding HTML to Labels from Templates

Let's now add html from a template html file for a label.

* Here is the resulting data from above:

```
{
    "id": "input-state-test",
    "name": "Input State Test",
    "url": "/input-state-test",
    "type": "input",
    "header": {},
    "footer": {},
    "onEnter": [],
    "onExit": [],
    "onSubmit": [],
    "form": {
        "classes": "",
        "submit": {}
    },
    "next": [],
    "inputs": [{
        "id": "text-input-test",
        "name": "textInputTest",
        "type": "text",
        "labelHTML": "<h2>I am from the JSON</h2>",
        "settings": {
            "container": {},
            "input": {}
        },
        "attributes": {}
    }]
}
```

* Again find the input data object in the `"inputs"` array with `"id"` equal to `"text-input-test"`:

```
{
	...
	"inputs": [{
	    "id": "text-input-test",
	    "name": "textInputTest",
	    "type": "text",
	    "labelHTML": "<h2>I am from the JSON</h2>",
	    "settings": {
	        "container": {},
	        "input": {}
	    },
	    "attributes": {}
	}]
	...
}
```

```
[
	...
	{
		"id": "text-input-test",
	    "name": "textInputTest",
	    "type": "text",
	    "labelHTML": "<h2>I am from the JSON</h2>",
	    "settings": {
	        "container": {},
	        "input": {}
	    },
	    "attributes": {}
	}
	...
]
```

* Take the value of `"labelHTML"` and add it to a file called "input-label.html" and replace the value "I am from the JSON" with the value "I am from the template":

_input-label.html_

```
<h2>I am from the template</h2>
```

* Now reaplce `"labelHTML"` with the key `"labelTemplateUrl"` whose value is `
"input-label.html"`:

```
[
	...
	{
		"id": "text-input-test",
	    "name": "textInputTest",
	    "type": "text",
	    "labelTemplateUrl": "input-label.html",
	    "settings": {
	        "container": {},
	        "input": {}
	    },
	    "attributes": {}
	}
	...
]
```

* The resulting data should look like this:

```
{
    "id": "input-state-test",
    "name": "Input State Test",
    "url": "/input-state-test",
    "type": "input",
    "header": {},
    "footer": {},
    "onEnter": [],
    "onExit": [],
    "onSubmit": [],
    "form": {
        "classes": "",
        "submit": {}
    },
    "next": [],
    "inputs": [{
        "id": "text-input-test",
        "name": "textInputTest",
        "type": "text",
        "labelTemplateUrl": "input-label.html",
        "settings": {
            "container": {},
            "input": {}
        },
        "attributes": {}
    }]
}
```

* This should render into something like this:
![Label From Template](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Label-HTML-From-Template.png)

## Things to Look Out For

### Template Limitations

Due to what rendering library you are using in conjunction with iVX.js, your templates 
may not be universal. For example, for the Angular Distribution, the library uses the 
[ngInclude]('https://docs.angularjs.org/api/ng/directive/ngInclude') directive and you can
replace elements in your file using handles bars --`{{experience.data}}`. However, this may
not work with other frameworks.

### Template URL Override

If, as a developer, you add the data key to add a template, this will always have a higher
level of presedence over other data that adds HTML. For example, if as a developer you wrote
your Header data object like this:

```
{
   ...
   "header" : {
   		"html" : "<h1>I WILL NOT BE SEEN</h1>",
   		"templateUrl" : "templates/test.html"
   }
   ...
}
``` 

The `<h1>I WILL NOT BE SEEN</h1>` will not be seen. 