---
layout: single
source : https://influencetech.github.io/ivx-js/
# source : http://127.0.0.1:4000/ivx-js/
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

# Rules Configuration

{% include toc %}

## Overview

Rules are objects in a JSON that determine whether an action is fired or a state is navigated to by a user.
In the basic library, you will natively be able to navigate the user based on the questions and forms they answered.

If you are using the iVX.io Data Module, you can use the Platform's tracking of a user's progress and their relationship to organizations and
entities to run rules.

## Note about this documentation

This page assumes you know how Rules and Conditions work within the config. If you would like to learn more about how Rules work and where
you can use them, you can go to the main JSON configuration.

## Rule

_Sample Data_

[rules.json]({{page.source}}developer/sample-JSON/rules.json)

_Schema_

[rules.jsond]({{page.source}}developer/schemas/rules.jsond)

_Base Properties_

<div id="rule-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/rules.jsond"></div>

## Condition Operator

Description: the condition operator determines which conditions within the rule must be true in order for the corresponding state associated with the rule to occur.

Operator Types:

 1. "and" (synonymous with && - ALL conditions must be true)

 2. "or"  (synonymous with \|\| - One of the conditions must be true)

 3. "not" (!cond1 && !cond2 - ALL conditions must NOT be true)

## Base Conditions

### Input

Description: Inputs gather information about the user so they can be directed towards a specific state, and customize the experience based on the information gathered.

_Sample Data_

[rules.conditions.inputs.json]({{page.source}}developer/sample-JSON/rules.conditions.input.json)

_Schema_

[rules.condition.inputs.jsond]({{page.source}}developer/schemas/rules.conditions.input.jsond)

_Base Properties_

<div id="input-condition-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/rules.conditions.input.jsond"></div>

## iVXio Conditions

### Organization

Description: The organization condition is evaluated based on specific organization data set by the associated child entity this experience belongs to.

_Sample Data_

[rules.conditions.organization.json]({{page.source}}developer/sample-JSON/rules.conditions.organization.json)

_Schema_

[rules.conditions.organization.jsond]({{page.source}}developer/schemas/rules.conditions.organization.jsond)

_Base Properties_

<div id="organization-condition-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/rules.conditions.organization.jsond"></div>

### Entity

Description: The entity refers to any sub-organizations or partners affiliated with the parent organization.

_Sample Data_

[rules.conditions.entity.json]({{page.source}}developer/sample-JSON/rules.conditions.entity.json)

_Schema_

[rules.conditions.entity.jsond]({{page.source}}developer/schemas/rules.conditions.entity.jsond)

_Base Properties_

<div id="entity-condition-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/rules.conditions.entity.jsond"></div>

### Story Events

Description: A story event occurs based on if the condition evaluates to fired or not fired, and is meant to guide the user to a specific state or place. The resulting action can be either within (story event) or outside (external event) of the experience.



_Sample Data_

[rules.conditions.storyEvents.json]({{page.source}}developer/sample-JSON/rules.conditions.storyEvents.json)

_Schema_

[rules.conditions.storyEvents.jsond]({{page.source}}developer/schemas/rules.conditions.storyEvents.jsond)

_Base Properties_

<div id="storyEvents-condition-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/rules.conditions.storyEvents.jsond"></div>

### Progress

Description: Progress refers to the user's place in the experience and if something should be initiated once they have reached a point within the experience.

_Sample Data_

[rules.conditions.progress.json]({{page.source}}developer/sample-JSON/rules.conditions.progress.json)

_Schema_

[rules.conditions.progress.jsond]({{page.source}}developer/schemas/rules.conditions.progress.jsond)

_Base Properties_

<div id="progress-condition-schema" class="json-schema-table-container" data-json-src="{{page.source}}developer/schemas/rules.conditions.progress.jsond"></div>



<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.2/lodash.min.js"></script>
<script src="{{page.source}}assets/js/jsond-table-creator.js"></script>


