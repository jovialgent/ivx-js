---
layout: single
# source : https://influencetech.github.io/ivx-js/
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

# Rules Configuration

{% include toc %}

## Overview

Rules are pieces in a JSON that determines whether an action is fired or a state is navigated to by a user.
In the basic library, you will natively be able to navigate the user based on the questions and forms they answered. 

If you are using the iVX.io Data Module, you can use the Platform's tracking of a user's progress and their relationship to organizations and 
entities to run rules. 

## Note about this documentation

This page assumes you know how Rules and Conditions work within the config. If you would like to learn more about how Rules work and where 
you can use them, you can go to main JSON configuration. 


## Condition Operators 




<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.2/lodash.min.js"></script>
<script src="{{page.source}}assets/js/jsond-table-creator.js"></script>
