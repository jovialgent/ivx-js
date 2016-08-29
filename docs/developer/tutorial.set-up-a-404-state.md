# Page Not Found State 

__Overview__

By default, an iVXjs experience will navigate to the default state if an url doesn't match any 
of the states url. This might be good for most cases, but sometimes as a developer, you would 
want to navigate to a state indicating the user has led to an invalid state and recover 
more elegantly. This tutorial will show you how to set up that state and navigate to it. 

## Setting up the Page Not Found State 

### Sample Data 

The finished data for this tutorial can be found here: [404-page-sample.json](sample-json/404-page-sample.json)

### Adding a Page Not Found to an existing experience 

Let's take a simple experience and add a Page Not Found (404) state. 

Here is our sample experience JSON: 
```
{

    "defaultState": [{
        "stateId": "valid-state"
    }],
    "states": [{
        "id": "valid-state",
        "name": "Valid State",
        "url": "/a-valid-state",
        "type": "html",
        "html" : "<h1>I am the default state!</h1><h2>I am also a valid part of the experience</h2>"
    }]
}
``` 
If we loaded the experience in a browser it will look something like this: 

![Valid State](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Valid-State.png)

Now, let's write give it an invalid url:

![Invalid State Url](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/invalid-url.png)

If we navigated to the url, we will always be redirectied to the "Valid State". To change this behavior we will need to do a few things: 

* Add a new array of rules to the root of the JSON called "pageNotFoundStates"
```
{

    "defaultState": [{
        "stateId": "valid-state"
    }],
    "pageNotFoundState" : [],
    "states": [{
         "id": "valid-state",
        "name": "Valid State",
        "url": "/a-valid-state",
        "type": "html",
        "html" : "<h1>I am the default state!</h1><h2>I am also a valid part of the experience</h2>"
    }]
}
```

* Add a rule object the `pageNotFoundStates` array with the `stateId` you wish it to redirect to
```
{

    "defaultState": [{
        "stateId": "valid-state"
    }],
    "pageNotFoundState" : [{
        "stateId" : "404-state"
    }],
    "states": [{
        "id": "valid-state",
        "name": "Valid State",
        "url": "/a-valid-state",
        "type": "html",
        "html" : "<h1>I am the default state!</h1><h2>I am also a valid part of the experience</h2>"
    }]
}
```

* Add the settings for the "404-state" to the states array
```
{

    "defaultState": [{
        "stateId": "valid-state"
    }],
    "pageNotFoundState" : [{
        "stateId" : "404-state"
    }],
    "states": [{
        "id": "valid-state",
        "name": "Valid State",
        "url": "/a-valid-state",
        "type": "html",
        "html" : "<h1>I am the default state!</h1><h2>I am also a valid part of the experience</h2>"
    },{
        "id": "404-state",
        "name": "404 Page",
        "url": "/404",
        "type": "html",
        "html" : "<h1> I am a page not found state.</h1>"
    }]
}
```

After adding all the settings to your JSON then reload the page. You will see that when you type an invalid url, you will be redirected 
to the "404-state":

![Invalid State Url](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/invalid-url.png)

![Page Not Found State](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/page-not-found-state-2.png)

## Notes about Page Not Found States 

Since the page not found feature uses rules, you can have multiple page not found states depending on the data in the 
experience. 


Also, if you don't have any page not found states set up, then it will default to the defaultState rules. 


If you navigate to the experience the first time, it will always go to the default state first. It is only when 
an invalid url is given that it will redirect to the the page not found state.