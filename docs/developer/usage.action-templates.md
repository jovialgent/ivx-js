# Action Templates

__Overview__

To help make it easier for developers to create custom components that interact with 
iVXjs experiences, iVXjs has some attributes that when set will fire different actions 
within the application when the element is clicked

## Animate Element

__Description__

Adds an animation class to an element. 

__Usage__

```
<ANY ivx-animate="{[ELEMENT], [ANIMATION CLASS]}"></ANY>
```

## Go To State

__Description__

Navigates to the state specified by the id

__Usage__ 

```
<ANY ivx-go-to-state="[STATE ID]"></ANY>
```

## Set Data 

__Description__ 

Sets the value with the matching key to the current experience's data object

__Usage__ 
```
<ANY ivx-set-data="{[KEY], [VALUE]}"></ANY>
```

## iVXjs Raise Event 

__Description__

Raises an event on the iVXjs's Bus.

__Usage__

```
<ANY ivx-event="[iVXjsEVENT-NAME]"></ANY>
```

