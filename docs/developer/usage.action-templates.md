---
layout: single
---

# Action Templates

{% include toc %}

## Overview

To help make it easier for developers to create custom components that interact with 
iVXjs experiences, iVXjs has some attributes that when set will fire different actions 
within the application when the element is clicked

## Animate Element

_Description_

Adds an animation class to an element. 

_Usage_

```
<ANY ivx-animate="{[ELEMENT], [ANIMATION CLASS]}"></ANY>
```

## Go To State

_Description_

Navigates to the state specified by the id

_Usage_

```
<ANY ivx-go-to-state="[STATE ID]"></ANY>
```

## Set Data 

_Description_ 

Sets the value with the matching key to the current experience's data object

_Usage_

```
<ANY ivx-set-data="{[KEY], [VALUE]}"></ANY>
```

## iVXjs Raise Event 

_Description_

Raises an event on the iVXjs's Bus.

_Usage_

```
<ANY ivx-event="[iVXjsEVENT-NAME]"></ANY>
```
