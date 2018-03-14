---
layout: single

---

# Embedded Views

{% include toc %}

## Overview

An Embedded Views are state flows within an existing state. This allows for developers to make more robust 
and complex states by putting a state within a state and have both states talk to each other and interact
with one another. The purpose of this tutorial page is to go over the basics on how to embedded a view 
into a state and some advice on how to set up the various interations. 

## Tutorial Note:

This tutorial assumes you know basics of the JSON and iVXjs. If some of these concepts are hard to 
follow, feel free to look at the introductory tutorials for more info.

## Sample Embedded View: Playlist

A simple use case for Embedded Views is a playlist where the state has a collection of links that 
they click that takes them to various videos, forms and links. 

### Part 1: Set up the Parent Navigation State

For the playlist, we will need to use the Navigation state that will list all of our embedded states. 
The state that you are embeddeding in called a "Parent State." 

> Parent State - A parent state is the state that has embedded states. The parent state will have 
> special properties that allows it overwrite some aspect of its embedded states. 
>> Note: a parent state can _not_ be embedded in another state. 

### Step 1: Set up the JSON for the experience:

So to get started, we will set up the JSON and the Navigation State and have the default state be the 
Playlist:

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
        "id": "parent-navigation-state",
        "name": "Parent Menu Scene",
        "url": "/parent-navigation-state",
        "type": "navigation",
        "section": {
            "classes": "parent-navigation-state"
        },
        "onLinksReady": [
            {
                "eventName": "animateElement",
                "args": {
                    "element": ".navigation-state-container",
                    "animationClasses": "show"
                }
            }
        ],
        "links": [
            
        ]
    }
    {},
    {}
    ]
}
```

### Step 2: Add the Embedded Views Collection

Now, we will actually embed our views into the Parent States. To embedded the 
views, we add the property to embedded views. This is a collection of view
objects with properties to set up each view. Let's see an example of the 
playlist with one embedded view and one state:

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
        "id": "parent-navigation-state",
        "name": "Parent Menu Scene",
        "url": "/parent-navigation-state",
        "type": "navigation",
        "section": {
            "classes": "parent-navigation-state"
        },
         "embeddedViews": [
            {
                "id": "playlist-content",
                "name": "Playlist Content",
                "type": "custom",
                "classes": "basic",
                "appendTo": "footer",
                "states": [
                    {
                        "stateId": "child-video-state-1"
                    }
                ]
            }
        ],
        "onLinksReady": [
            {
                "eventName": "animateElement",
                "args": {
                    "element": ".navigation-state-container",
                    "animationClasses": "show"
                }
            }
        ],
        "links": [
            
        ]
    }
    {},
    {}
    ]
}
```

Let's break the properties a bit:
* *id* - Id of the view. This id gets added to the container where the states will be place if there needs to be special targeting for this view.
* *name* - A human readable name for the view. It is only used for JSON readability.
* *type* - The type of view. Currently, iVXjs just supports the "custom" type which just puts the state on the page without any other functions.
* *classes* - CSS classes to add to the view. 
* *appendTo* - The dom element to put the view.
    * Note: The dom must exist in the expereince container and can't be added to any state content (Such as inputs, videos, etc.). If you need a special 
      embedded flow structure, you will have to use an HTML scene with the elements in them. 
* *states* - The states to add to this view
    * *stateId* - The id of the state to add. The state must have an embedded property (See Part 2)

## Part 2: Embedded State Definition

Since we have indicated the state we want to embed let's define it. In the case of the 
playlist example, the state we are embedding is a video state. Here is an example video state:

```json
...
{
    "playerSettings": {
        "youtubeId": "pU9Q6oiQNd0",
        "controls": {
            "type": "standard"
        }
    },
    "section": {
        "classes": "child-video-state-1"
    },
    "onVideoReady": [
        {
            "eventName": "animateElement",
            "args": {
                "element": ".video-state-container",
                "animationClasses": "show"
            }
        }
    ],
    "name": "Child Video Scene 1",
    "url": "/child-video-state-1",
    "type": "video",
    "id": "child-video-state-1"
}
...
```

Above, the state can't be embedded, due the fact that there is no 
way the iVXjs knows that the video state can be embedded. To change this,
you will need to add a property called `embedded` to the state. 

* *embedded* - indicates this state can be embedded. If this property is found on a state, the state
  can't have any embedded views.

So, we will need to update the above state definition with the property:

```json
...
{
    "playerSettings": {
        "youtubeId": "pU9Q6oiQNd0",
        "controls": {
            "type": "standard"
        }
    },
    "section": {
        "classes": "child-video-state-1"
    },
    "onVideoReady": [
        {
            "eventName": "animateElement",
            "args": {
                "element": ".video-state-container",
                "animationClasses": "show"
            }
        }
    ],
    "name": "Child Video Scene 1",
    "url": "/child-video-state-1",
    "type": "video",
    "id": "child-video-state-1",
    "embedded" : true
}
...
```

## Part 3: Setting up navigation in our playlist

We now have a child video state and a parent state that we embedded the video in. 
We will now discuss how to navigate to it.

### Step 1: Adding the link to the playlist

In the partent navigation state, we will need to add a link that points to is child video state.
To do this we will add a link definition to the links collection:

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
        "id": "parent-navigation-state",
        "name": "Parent Menu Scene",
        "url": "/parent-navigation-state",
        "type": "navigation",
        "section": {
            "classes": "parent-navigation-state"
        },
         "embeddedViews": [
            {
                "id": "playlist-content",
                "name": "Playlist Content",
                "type": "custom",
                "classes": "basic",
                "appendTo": "footer",
                "states": [
                    {
                        "stateId": "child-video-state-1"
                    }
                ]
            }
        ],
        "onLinksReady": [
            {
                "eventName": "animateElement",
                "args": {
                    "element": ".navigation-state-container",
                    "animationClasses": "show"
                }
            }
        ],
        "links": [{
            "id" : "link-1",
            "label" : "Video 1",
            "route" : "parent-navigation-state.child-video-state"
        }]
    }
    {},
    {}
    ]
}
```

As you see, the link uses the new `route` property to point to its child. So when 
the link is clicked the link will go its child video state. 

## Step 2: Add navigation to the child state

When the child video ends, let's say it returns to the parent so the video hides. (We will add more videos later).
Normally, you would add a "next" to the state to do navigation:


```json
...
{
    "playerSettings": {
        "youtubeId": "pU9Q6oiQNd0",
        "controls": {
            "type": "standard"
        }
    },
    "section": {
        "classes": "child-video-state-1"
    },
    "onVideoReady": [
        {
            "eventName": "animateElement",
            "args": {
                "element": ".video-state-container",
                "animationClasses": "show"
            }
        }
    ],
    "next" : [{
        "route" : "parent-navigation-state"
    }],
    "name": "Child Video Scene 1",
    "url": "/child-video-state-1",
    "type": "video",
    "id": "child-video-state-1",
    "embedded" : true
}
...
```

But, with embedded views, the Parent state actually indicates flow and navigation. The child's next
collection is ignored. So, we will now add the next to the state in the embedded view:

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
         ...
         "embeddedViews": [
            {
                "id": "playlist-content",
                "name": "Playlist Content",
                "type": "custom",
                "classes": "basic",
                "appendTo": "footer",
                "states": [
                    {
                        "stateId": "child-video-state-1",
                         "next": [
                            {
                                "route": "parent-navigation-state"
                            }
                        ]
                    }
                ]
            }
        ],
        ...
    }
    {},
    {}
    ]
}
```

So, this indicates that the user wants the child video state to navigate to the 
parent navigation state (the playlist). Though this works, a more flexible solution 
is to change the route to use the `^` symbol which indicates that you want to go back to 
the parent:

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
         ...
         "embeddedViews": [
            {
                "id": "playlist-content",
                "name": "Playlist Content",
                "type": "custom",
                "classes": "basic",
                "appendTo": "footer",
                "states": [
                    {
                        "stateId": "child-video-state-1",
                         "next": [
                            {
                                "route": "^"
                            }
                        ]
                    }
                ]
            }
        ],
        ...
    }
    {},
    {}
    ]
}
```

## Part 3: Adding more states:

This playlist is kind of boring since there is only one state. Let's add more videos to the embedded view.

Let's assume we have these three video states defined somewhere, lets add them to the embedded views. 

We will repeat the steps in Part 2 and add them to the parent-navigation-state:

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
        "id": "parent-navigation-state",
        "name": "Parent Menu Scene",
        "url": "/parent-navigation-state",
        "type": "navigation",
        "section": {
            "classes": "parent-navigation-state"
        },
         "embeddedViews": [
            {
                "id": "playlist-content",
                "name": "Playlist Content",
                "type": "custom",
                "classes": "basic",
                "appendTo": "footer",
                "states": [
                    {
                        "stateId": "child-video-state-1",
                        "next" : [{
                            "route" : "^"
                        }]
                    },
                    {
                        "stateId": "child-video-state-2",
                        "next" : [{
                            "route" : "^"
                        }]
                    },
                    {
                        "stateId": "child-video-state-3",
                        "next" : [{
                            "route" : "^"
                        }]
                    }

                ]
            }
        ],
        "onLinksReady": [
            {
                "eventName": "animateElement",
                "args": {
                    "element": ".navigation-state-container",
                    "animationClasses": "show"
                }
            }
        ],
        "links": [{
            "id" : "link-1",
            "label" : "Video 1",
            "route" : "parent-navigation-state.child-video-state"
        },
        {
            "id" : "link-2",
            "label" : "Video 2",
            "route" : "parent-navigation-state.child-video-state"
        },
        {
            "id" : "link-3",
            "label" : "Video 3",
            "route" : "parent-navigation-state.child-video-state"
        }]
    }
    ]
}
```

This might be annoying for the user to always have to click on the video once it plays 
to pick the video. So, let's make each video go to the next video in the list after it plays.
To do this we will update the navigation for each state in the view to point to. To do this, we 
will still use the `^` indicator but now it will add a second state that points to its child: `^.child-state-id`.

So we will change the above example to this: 

```json
{
    "defaultState": [
        {
            "stateId": "parent-navigation-state"
        }
    ],
    "states" : [{
        "id": "parent-navigation-state",
        "name": "Parent Menu Scene",
        "url": "/parent-navigation-state",
        "type": "navigation",
        "section": {
            "classes": "parent-navigation-state"
        },
         "embeddedViews": [
            {
                "id": "playlist-content",
                "name": "Playlist Content",
                "type": "custom",
                "classes": "basic",
                "appendTo": "footer",
                "states": [
                    {
                        "stateId": "child-video-state-1",
                        "next" : [{
                            "route" : "^.child-video-state-2"
                        }]
                    },
                    {
                        "stateId": "child-video-state-2",
                        "next" : [{
                            "route" : "^.child-video-state-3"
                        }]
                    },
                    {
                        "stateId": "child-video-state-3",
                        "next" : [{
                            "route" : "^"
                        }]
                    }

                ]
            }
        ],
        "onLinksReady": [
            {
                "eventName": "animateElement",
                "args": {
                    "element": ".navigation-state-container",
                    "animationClasses": "show"
                }
            }
        ],
        "links": [{
            "id" : "link-1",
            "label" : "Video 1",
            "route" : "parent-navigation-state.child-video-state"
        },
        {
            "id" : "link-2",
            "label" : "Video 2",
            "route" : "parent-navigation-state.child-video-state"
        },
        {
            "id" : "link-3",
            "label" : "Video 3",
            "route" : "parent-navigation-state.child-video-state"
        }]
    }
    ]
}
```

## Conclusion

Above is a very simple example to get you started. But, there are many more ways the embedded view can be used.
Check out the embedded view example to see more examples of each state using embedded flows including the above tutorial
with other states. 