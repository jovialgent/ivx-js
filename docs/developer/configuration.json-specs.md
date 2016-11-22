---
layout: single
source : http://127.0.0.1:4000/ivx-js/
jsarr:
     - js/jsond-table.js
---

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

# iVXjs JSON Specifications

{% include toc %}

## Overview

The core of all iVXjs experiences is the configuration JSON you feed into its init function. Without a
proper configuration, the experience won't load and you will not be able to use any of the features in
iVXjs. This configuration document will help guide you in making the a correct JSON spec and be a reference
to what is needed to implement the features you want.  {{page.source}}

## About this documentation

This documentation offers three different ways to check your data:

### Sample Data

The easiest and quickest way to get an iVXjs experience going is to copy and paste the sample JSON into 
your iVXjs experience and edit the values to match your needs. Most snippets are for fully functioning experiences 
so just copy and paste what you need from each snippet. For example, let's say you want to add a text input to your 
Input State. Here is what the *input-test-data-sample.json* looks like:

```
{
    "defaultState": [{
        "stateId": "text-input-sample"
    }],
    "states": [{
        "id": "text-input-sample",
        "name": "text Input Sample",
        "url": "/text-input-sample",
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
            "id": "text-input",
            "name": "textInput",
            "type": "text",
            "label": "This is a text input",
            "settings": {
                "container": {},
                "input": {}
            },
            "attributes": {
                "minlength" : "10",
                "maxlength" : "25",
                "placeholder" : "This is a placeholder"
            },
            "errors" : {}
        }]
    }]
}
```

Since you already have most of the data for this, all you really need is copy the object in the input collection:

```
{
            "id": "text-input",
            "name": "textInput",
            "type": "text",
            "label": "This is a text input",
            "settings": {
                "container": {},
                "input": {}
            },
            "attributes": {
                "minlength" : "10",
                "maxlength" : "25",
                "placeholder" : "This is a placeholder"
            },
            "errors" : {}
        }]
    }
```

### Schema Validation 

iVXjs's JSON is very detailed with many parts. To help you out with debugging, there are JSOND Schema files 
that can be used with [JSON Schema Validators](http://www.jsonschemavalidator.net/). Remember though, iVXjs's JSON is 
dynamic and contextual, so you may need to use different Schema files to check all of your JSON. 


# Base Structure

_Description_

This is the base structure for the configuration file. 

_Sample Data_

[base-structure-sample.json]({{page.source}}developer/sample-JSON/base-structure-sample.json)

_Schema_

[base-structure-sample.jsond]({{page.source}}developer/schemas/base-structure.jsond)

_Base Properties_

<div id="basic-json-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/base-structure.jsond"></div> 

# States

_Description_

State data is the most complex and varied amongst the JSON schemas. There are multiple state types and each with their own specs.

## Shared State Schema

_Description_

All states have the following data below. Assume the specific states types have this data schema with the data schema defined in their respective schema.

_Sample Data_

[shared-state-data-sample.json]({{page.source}}developer/sample-JSON/shared-state-data-sample.json)

_Schema_

[shared-state-data.jsond]({{page.source}}developer/schemas/shared-state.jsond)

_Shared State Properties_

<div id="shared-state-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/shared-state.jsond"></div> 

## HTML State Schema

_Description_

The HTML State's data is simple and is designed to help make it easy to inject any HTML into a state.

_Sample Data_

[html-state-sample.json]({{page.source}}developer/sample-JSON/html-state-sample.json)

_Schema_

[html-state.jsond]({{page.source}}developer/schemas/html-state.jsond)

_HTML State Properties_

<div id="html-state-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/html-state.jsond"></div> 

## Input State Schema

_Description_

The input state's data allows the developer to create a state with a form and collect data from inputs.

_Sample Data_

[input-state-sample.json]({{page.source}}developer/sample-JSON/input-state-sample.json)


_Schema_

[input-state.jsond]({{page.source}}developer/schemas/input-state.jsond)

_Input State Properties_

<div id="input-state-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-state.jsond"></div> 


## Navigation State Schema

_Description_

Settings for the navigation state with the data to set up the links for this state.

_Sample Data_

[navigation-state-sample.json]({{page.source}}developer/sample-JSON/navigation-state-sample.json)

_Schema_

[navigation-state.jsond]({{page.source}}developer/schemas/navigation-state.jsond)

_Navigation State Settings_

<div id="navigation-state-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/navigation-state.jsond"></div> 

## Video State Schema

_Description_ 

The Video State's data has various sections that tell iVXjs what personalization html to render, cuepoints to activate and the settings for the player.

_Sample Data_

[video-state-sample.json]({{page.source}}developer/sample-JSON/video-state-sample.json)

_Schema_

[video-state.jsond]({{page.source}}developer/schemas/video-state.jsond)

_Video State Properties_

<div id="video-state-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/video-state.jsond"></div> 


# Inputs

_Description_

Inputs are standard form inputs used for gathering user information using the input state. The settings for them are varied based on the input type.

## Shared Input Data

_Description_

Most inputs share attributes to record data and here are the settings that most inputs share. 

_Sample Data_

[input-data-shared-sample.json]({{page.source}}developer/sample-JSON/input-data-shared-sample.json)

_Schema_

[input-data-shared.jsond]({{page.source}}developer/schemas/input-data-shared.jsond)

_Input Shared Data Settings_

<div id="input-stared-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-data-shared.jsond"></div>

## Buttons

_Description_

Buttons data allows the user to create a group of buttons that set values on click.

_Sample Data_

[input-button-data-sample.json]({{page.source}}developer/sample-JSON/input-button-data-sample.json)

_Schema_

[input-buttons.jsond]({{page.source}}developer/schemas/input-buttons.jsond)

_Button Input Settings_

<div id="input-buttons-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-buttons.jsond"></div>


## Checkbox

_Description_

Settings for the input to render a checkbox.

_Sample Data_

[input-checkbox-data-sample.json]({{page.source}}developer/sample-JSON/input-checkbox-data-sample.json)

_Schema_

[input-checkbox.jsond]({{page.source}}developer/schemas/input-checkbox.jsond)

_Checkbox Input Settings_

<div id="input-checkbox-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-checkbox.jsond"></div>

## Date

_Description_

Settings for the date input type

_Sample Data_

[input-date-data-sample.json]({% include base_path %}/developer/sample-json/input-date-data-sample.json)

_Schema_

[input-date.jsond]({{page.source}}developer/schemas/input-date.jsond)

_Date Input Settings_

<div id="input-date-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-date.jsond"></div>


## Datetime-Local

_Description_

Settings for the datetime-local input type

_Sample Data_

[input-datetime-local-data-sample.json]({{page.source}}developer/sample-JSON/input-datetime-local-data-sample.json)

_Schema_

[input-datetime-local.jsond]({{page.source}}developer/schemas/input-datetime-local.jsond)

_Datetime Local Input Settings_

<div id="input-datetime-local-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-datetime-local.jsond"></div>


## Email

_Description_

Settings for this email input type

_Sample Data_

[input-email-data-sample.json]({{page.source}}developer/sample-JSON/sample-json/input-email-data-sample.json)

_Schema_

[input-email.jsond]({{page.source}}developer/schemas/input-email.jsond)

_Email Input Settings_

<div id="input-email-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-email.jsond"></div>

## Number

_Description_

Settings for the number input type

_Sample Data_

[input-number-data-sample.json]({{page.source}}developer/sample-JSON/input-number-data-sample.json)

_Schema_

[input-number.jsond]({{page.source}}developer/schemas/input-number.jsond)

_Number Input Settings_

<div id="input-number-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-number.jsond"></div>

## Options

_Description_

Settings for this select/options input

_Sample Data_

[input-options-data-sample.json]({{page.source}}developer/sample-JSON/input-options-data-sample.json)

_Schema_

[input-options.jsond]({{page.source}}developer/schemas/input-options.jsond)

_Options Input Settings_

<div id="input-options-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-options.jsond"></div>

## Radio Buttons

_Description_

Settings to render radio buttons 

_Sample Data_

[input-radio-data-sample.json]({{page.source}}developer/sample-JSON/input-radio-data-sample.json)

_Schema_

[input-radio.jsond]({{page.source}}developer/schemas/input-radio.jsond)

_Radio Input Settings_

<div id="input-radio-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-radio.jsond"></div>


## Text

_Description_

Settings for the text type input

_Sample Data_

[input-text-data-sample.json]({{page.source}}developer/sample-JSON/input-text-data-sample.json)

_Schema_

[input-text.jsond]({{page.source}}developer/schemas/input-text.jsond)

_Text Input Settings_

<div id="input-text-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-text.jsond"></div>


## Text Area

_Description_

Settings for the textarea type input

_Sample Data_

[input-textarea-data-sample.json]({{page.source}}developer/sample-JSON/input-textarea-data-sample.json)

_Schema_

[input-textarea.jsond]({{page.source}}developer/schemas/input-textarea.jsond)

_Text Area Input Settings_

<div id="input-textarea-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-textarea.jsond"></div>


## Url

_Description_

Settings for this Url input type

_Sample Data_

[input-url-data-sample.json]({{page.source}}developer/sample-JSON/input-url-data-sample.json)

_Schema_

[input-url.jsond]({{page.source}}developer/schemas/input-url.jsond)

_Url Input Settings_

<div id="input-url-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/input-url.jsond"></div>



# Events / Actions

_Description_

To tell iVXjs to run events in the various places in the states and inputs, the user must set up the event data in a certain way.

## Basic Event Structure

_Description_

Simple structure for indicating to run an event in the various event arrays.

_Sample Data_

[event-base-structure.json]({{page.source}}developer/sample-JSON/event-base-structure.json)

_Schema_

[event-base-structure.jsond]({{page.source}}developer/schemas/event-base-structure.jsond)

_Basic Event Properties_

<div id="event-base-structure-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-base-structure.jsond"></div>

## animateElement

_Description_

Indicates to iVXjs to run the native animateElement action.

_Sample Data_

[event-ivxjs-animateElement.json]({{page.source}}developer/sample-JSON/event-ivxjs-animateElement.json)

_Schema_

[event-ivxjs-animateElement.jsond]({{page.source}}developer/schemas/event-ivxjs-animateElement.jsond)

_animateElement Event Properties_

<div id="event-ivxjs-animateElement-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxjs-animateElement.jsond"></div>

## goToNextState

_Description_

The settings that takes a set of rules and navigates to a state based on them.

_Sample Data_

[event-ivxjs-goToNextState.json]({{page.source}}developer/sample-JSON/event-ivxjs-goToNextState.json)

_Schema_

[event-ivxjs-goToNextState.jsond]({{page.source}}developer/schemas/event-ivxjs-goToNextState.jsond)

_goToNextState Event Properties_

<div id="event-ivxjs-goToNextState-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxjs-goToNextState.jsond"></div>

## goToState

_Description_

Settings to fire the goToState event. 

_Sample Data_

[event-ivxjs-goToState.json]({{page.source}}developer/sample-JSON/event-ivxjs-goToState.json)

_Schema_

[event-ivxjs-goToState.jsond]({{page.source}}developer/schemas/event-ivxjs-goToState.jsond)

_goToState Event Properties_

<div id="event-ivxjs-goToState-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxjs-goToState.jsond"></div>

## playAudioClip

_Description_

Loads and plays a piece of audio. 

_Sample Data_

[event-ivxjs-playAudioClip.json]({{page.source}}developer/sample-JSON/event-ivxjs-playAudioClip.json)

_Schema_

[event-ivxjs-playAudioClip.jsond]({{page.source}}developer/schemas/event-ivxjs-playAudioClip.jsond)

_playAudioClip Event Properties_

<div id="event-ivxjs-playAudioClip-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxjs-playAudioClip.jsond"></div>

## setData

_Description_

The settings to raise the setData event

_Sample Data_

[event-ivxjs-setData.json]({{page.source}}developer/sample-JSON/event-ivxjs-setData.json)

_Schema_

[event-ivxjs-setData.jsond]({{page.source}}developer/schemas/event-ivxjs-setData.jsond)

_setData Event Properties_

<div id="event-ivxjs-setData-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxjs-setData.jsond"></div>

# iVXio Events/Actions

_Description_

These are the settings specifically if the iVXjs experience is using the iVXio data module.

## recordEvent

_Description_

Raises an iVXio event defined by the platform

_Sample Data_

[event-ivxio-recordEvent.json]({{page.source}}developer/sample-JSON/event-ivxio-recordEvent.json)

_Schema_

[event-ivxio-recordEvent.jsond]({{page.source}}developer/schemas/event-ivxio-recordEvent.jsond)

_recordEvent Event Properties_

<div id="event-ivxio-recordEvent-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxio-recordEvent.jsond"></div>

## setComplete

_Description_

Sets this iVXio experience's progress to complete

_Sample Data_

[event-ivxio-setComplete.json]({{page.source}}developer/sample-JSON/event-ivxio-setComplete.json)

_Schema_

[event-ivxio-setComplete.jsond]({{page.source}}developer/schemas/event-ivxio-setComplete.jsond)

_setComplete Event Properties_

<div id="event-ivxio-setComplete-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxio-setComplete.jsond"></div>


## setConverted

_Description_

Sets this iVXio's experience progress to converted

_Sample Data_

[event-ivxio-setConverted.json]({{page.source}}developer/sample-JSON/event-ivxio-setConverted.json)

_Schema_

[event-ivxio-setConverted.jsond]({{page.source}}developer/schemas/event-ivxio-setConverted.jsond)

_setConverted Event Properties_

<div id="event-ivxio-setConverted-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxio-setConverted.jsond"></div>

## setMilestone

_Description_

Sets this iVXio's experience to a specific milestone

_Sample Data_

[event-ivxio-setMilestone.json]({{page.source}}developer/sample-JSON/event-ivxio-setMilestone.json)

_Schema_

[event-ivxio-setMilestone.jsond]({{page.source}}developer/schemas/event-ivxio-setMilestone.jsond)

_setMilestone Event Properties_

<div id="event-ivxio-setMilestone-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/event-ivxio-setMilestone.jsond"></div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.2/lodash.min.js"></script>
<script src="{{page.source}}assets/js/jsond-table-creator.js"></script>
