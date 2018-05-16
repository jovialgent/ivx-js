---
layout: single
title: Filter
---

{% include toc %}

## Overview

These filters are custom filters to help render experience data in various ways. 

> This only avaliable to versions 0.11.6 and up

The typical set up is as follows

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.myData|filterName&#125;&#125;
    </div>
</div>

## String Filters

The following filters manipulate string type experience data.

### Capitalize

_Description_

Capitalizes the first character of a string and lowercases any of the characters afterwards

_Filter Sample_

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|capitalize&#125;&#125;
    </div>
</div>


### Truncate

_Description_

Truncates a string to a number of characters and appends a string at the end. By default, it truncates to 15 characters and appends an ellipse (...).

_Filter Samples_

Default Settings:

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|truncate&#125;&#125;
    </div>
</div>

Custom Length:

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|truncate:CUSTOM_LENGTH&#125;&#125;
    </div>
</div>

Custom Length and Suffix:

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|truncate:CUSTOM_LENGTH:"CUSTOM_SUFFIX"&#125;&#125;
    </div>
</div>

### URL Encode

_Description_

Encodes a string to make it URL encoded. Helpful for making custom links using experience data.

_Filter Sample_

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|url_encode&#125;&#125;
    </div>
</div>

### URL Decode

_Description_

Decodes a string that has any encoded characters.

_Filter Sample_

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|url_decode&#125;&#125;
    </div>
</div>

### Escape

_Description_

Escapes common characters in an HTML string. Currently escapes: &, <, >, ", '.

_Filter Sample_

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|escape&#125;&#125;
    </div>
</div>

### Unescape

_Description_

Unescapes common html entities to their ascii characters. 

_Filter Sample_

<div class="language-html highlighter-rouge">
    <div class="highlight">
        &#123;&#123;experience.data.KEY|unescape&#125;&#125;
    </div>
</div>