---
layout: single
---

# iVXjs CDN Paths 

{% include toc %}

## Overview 
To make it easier for developers to include iVXjs, CDNs have been set up for each module. 
The list below will give you code snippets to add to your project. 

## Special Note
The CDN's are versioned to help stabilize and push out bugs. The CDN can update at any time. To set your 
version replace the x's below with the right version

```
https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/x.x.x/ivx-js/fileName
```

# Core Library

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/angular.ivx.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/angular.ivx.min.js"></script>
```

# UI Modules 

## Bootstrap 

__Angular JS Module Name__

```
"iVXjs.ui.bootstrap"
```

__CSS Dependency__

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

__JS Dependency__

```
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.ui.bootstrap.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.ui.bootstrap.min.js"></script>
```

## Materialize 

__Angular JS Module Name__

```
"iVXjs.ui.materialize"
```

__CSS Dependency__

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
```

__JS Dependency__

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.ui.materialize.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.ui.materialize.min.js"></script>
```

## Semantic UI 

__Angular JS Module Name__

```
"iVXjs.ui.semantic-ui"
```

__CSS Dependency__

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css">
```

__JS Dependency__

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.js"></script>
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.ui.semantic-ui.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.ui.semantic-ui.min.js"></script>
```

# Data Modules 

## iVXio

__Angular JS Module Name__

```
"iVXjs.data.iVXio"
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.data.ivx-io.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.data.ivx-io.min.js"></script>
```

## Firebase

__Angular JS Module Name__

```
"iVXjs.data.firebase"
```

__JS Dependency__

```
<script src="https://www.gstatic.com/firebasejs/3.2.0/firebase.js"></script>
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.data.firebase.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.data.firebase.min.js"></script>
```

# Analytics 

## Google 

__Angular Module Name__

```
"iVXjs.analytics.google"
```

__JS Dependency__

```
<script>
    (function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l; b[l] || (b[l] =
      function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;
      e = o.createElement(i); r = o.getElementsByTagName(i)[0];
      e.src = 'https://www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e, r)
    } (window, document, 'script', 'ga'));
  </script>
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.analytics.google.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.analytics.google.min.js"></script>
```

# Validation 

## Schema 

__Angular JS Module Name__

```
"iVXjs.validation.schema"
```


__JS Dependency__

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/tv4/1.2.7/tv4.min.js"></script>
```

__iVXjs Module Scripts__

```
<!-- Non Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.validation.schema.js"></script>

<!-- Minified -->
<script src="https://060adad2995367c8e229-2340761377b5351a53198a462113b619.ssl.cf2.rackcdn.com/ivx-js/0.7.0/iVXjs.validation.schema.min.js"></script>
```