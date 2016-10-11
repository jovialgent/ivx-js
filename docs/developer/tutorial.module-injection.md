---
layout: single

---

# Module Injection
{% include toc %}

By default, the core iVXjs library has everything a developer needs to 
run an interactive experience. However, a developer might want to expand 
the functionality like using an external UI library, a data module that sends user inputs 
to a backend service or more robust validation. To do this, a developer can 
include various module functions in iVXjs's init function. These functions 
will take an object of settings and then update the experience to use these 
changes. 

# Overview 

This tutorial will show how to update the experience to use [Bootstap 3](http://getbootstrap.com/css/) 
UI components to illustrate how module injection works. This module replaces some UI components to
use the Bootstrap UI library style and feel. 

# Injecting a module

Here is how an iVXjs Video State looks like by default using the iVXjs Core CSS:

![Core CSS Used](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Video-State-Header-HTML-From-JSON.png)

Now, let's try to replace the core css with Bootstrap's CSS and JS. Here is how it looks:

![Bootstrap no UI Module Used](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Video%20Player%20no%20style.png)

The look has some Bootstrap style, but it isn't quite right. This is where the iVXjs Bootstrap UI Module comes in.
The iVXjs Bootstrap UI Module, like all modules, allows the user to inject additional functionality 
into iVXjs without having to change the JSON. To inject this iVXjs Bootstrap UI Module, follow the following steps:

* Put the _iVXjs.ui.bootstrap.js_ file into your project. (tools > modules > ui > bootstrap).
* Make a reference to it in your HTML after the _angular.ivx.js_ reference:

```
...
<!-- Angular iVXjs Library -->
<script src="js/lib/angular.ivx.js"></script>

<!-- iVXjs Bootstrap UI Module -->
<script src="js/lib/iVXjs.ui.bootstrap.js"></script>
...
```

* Go to the config function of the angular application and put in the init function with the config
  data path:

```
angular
.module('app', ['ivx-js'])
.config(['iVXjs', function (iVXjs) {
    iVXjs.init({
        config: "data/module-injection.json"
    });
}]);
```

* Inject the iVXjs Bootstrap Module function: 

```
angular
.module('app', ['ivx-js'])
.config(['iVXjs', 'iVXjs.ui.bootstrap', function (iVXjs, iVXjsUIBootstrap) {
    iVXjs.init({
        config: "data/module-injection.json"
    });
}]);
```

* Call the iVXjsUIBootstrap function in the init object with the key "ui":

```
angular
.module('app', ['ivx-js'])
.config(['iVXjs', 'iVXjs.ui.bootstrap', function (iVXjs, iVXjsUIBootstrap) {
    iVXjs.init({
        config: "data/module-injection.json",
        ui : iVXjsUIBootstrap()
    });
}]);
```

Once those steps are followed, the video state should look something like this: 

![Video Player with Bootstrap Module](http://e8ddcf8725663d605209-8d8cc7c733bcfce1ecd11bbb8349e503.r95.cf2.rackcdn.com/tutorial/Video%20Player%20with%20style.png)

