# Basic Input Experience

This example demostrates how inputs are created, how their labels, as well as "before" and "after" labels are defined. Also, by use of "static-data" we can inject content in multiple places by using *{{curly brackets}}* within our html files.

# How to run it

    1) Open the terminal
    2) Run the CLI command - "npm run example:basic-input-experience"
        -> Your default browser will automatically open the example in a new tab with the URL: localhost:8080/# 

# How to edit/use it

Begin on the first page labeled "default-state" (URL will display: "#/before-after-buttons). There you will find a question simply asking, "What is your favorite color" with 5 buttons to answer. The capitalized text before and after those buttons are present to represent the content available to edit.

    * These button labels can be changed by going into each template for that specific question:

        *examples/basic-input-experience/config/default/states/default-state/inputs/question-favorite-color/templates*

        -> Here you will see where each button label is defined.  You can either change them directly here, or use the method of editing the static data, and calling as:
        {{experience.data.button-1}}, for example.

        --> You can edit the question, itself, by navigating to the root of the question scene and selecting the "header.html" template.