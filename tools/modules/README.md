# iVXjs Modules

To further implement customization in your application, you can add different modules 
to your website in the init function to expand the native capabilities of iVXjs. 

## About Modules
A module in iVXjs has various types: 

- UI - The ui components in the iVXjs experience such as buttons, inputs and video player controls
- Data - Components that link and save user inputs and data to third party sources 
- Validation - Validates the JSON and makes sure that the JSON can run effectively
- Analytics - Analytic modules that capture data usually using a service like Google Analytics 

## UI Modules 

As stated above UI modules change the look and feel of UI components based off an existing framework.
Currently, iVXjs supports the following UI Frameworks: 

- Bootstrap
- Semantic UI 
- Materialize CSS 

To set up using the Angular distribution of iVXjs, do the following:

* Bring in the script for the UI module you want to use. Here are the paths to the CDN:

```
<!-- Bootstrap UI Module -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/[VERSION-NUMBER]/iVXjs.ui.bootstrap.min.js"></script>

<!-- Materialize UI Module -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/[VERSION-NUMBER]/iVXjs.ui.materialize.min.js"></script>

<!-- Semantic UI UI Module -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/[VERSION-NUMBER]/iVXjs.ui.semantic-ui.min.js"></script>

```

* You call the function inside the config's object argument called ui. 

```
angular 
    .module('app', ['ivx-js])
    .config(['iVXjs','iVXjs.ui.UI_NAME', function(iVXjs, UI){
        iVXjs.init({
            config : "path/to/json",
            ui : UI()
        })
    }]);
```

