# Add Class Actions

This example demostrates how classes can be added and removed dynamically during an experience. These classes can then be targeted by css to change the UX as the user progresses through the story, opening up creative opportunites and ways to animate.

# How to run it

    1) Open the terminal
    2) Run the CLI command - "npm run example:add-class-action"
        -> Your default browser will automatically open the example in a new tab with the URL: localhost:8080/# 

# How to edit/use it

**High Level**

To begin, open up Chrome Developer Tools. This way, you will be able to see the classes changing in the <body> element as you progress.

The interface is simple – 

    * Begin with the first input. Type in an appropriate value, then once you click outside of the input field (or blur) you will notice the background color of the page changes to red.

    * Proceed to the next input, fill it out, then blur, and the page's background will smoothly transition to orange. 

    * Fill out the final input, blur, and background color transitions to yellow.

    * Finally clicking submit transitions the background to green.

**Low Level**

To edit the classes being changed during this example, follow the filepath:
    * *examples/add-class-action/config/default/states/action-add-class-testing/inputs*

    * From there, select an individual input. For instance "email"

    * Within that input folder, select "_settings.on-change.js"

    * For each event inside the "settings" array, the args can be edited to change which element is targeted, as well as which classes are being added or removed.

For instance, inside *examples/add-class-action/config/default/states/action-add-class-testing/inputs/firstname/_settings.on-change.js*

If you edit this chunk of code:

{
    eventName: "addClasses",
    args: {
        element: "body",
        classes: "red primary"
    }
}

Multiple classes can be called, which are deliminated by a [space]. In this case, we are adding the two classes "red" and "primary".

You could simply change a class from "red" to "blue", then the onChange of the "firstname" input field would change the background to blue.  Try it for yourself!

The next step would be to make sure you edit the "removeClass" events in the other inputs.  Currently, onChange of the remaining inputs would remove "red" and "primary". For this example, you will need to change "red" to "blue", like before. Otherwise, it will try to remove the nonexistent "red" class, and you will not see a transition out of blue.

Most importantly, notice that within the style.less of this example that the colors have been defined as classes. None of this would be possible without defining the classes.

One final note would be to experiment with editing other elements on the page. You've probably noticed that we are only editing the <body> in this example. However, this action is powerful enough to target any other native element like <h1> or <footer>, as well as custom classes and ids.

The way to target custom classes and ids is within the args is easy. Say you have the class "big" and the id "carrot".  Simply change the value of the element argument to ".big" or "#carrot".  You will need to prefix classes with a period (.) and ids with a hashtag (#).
