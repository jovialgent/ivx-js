# Basic Analytics Experience

This example demonstrates how iVX stores analytics through custom events. These events can be fired throughout the experience, whether its by the click of a button, by completing a video, or by filling out a form. Exeprience data can be stored on our platform as KPIs and also sent through Google for real-time analytics.

# How to run it

    1) Open the terminal
    2) Run the CLI command - "npm run example:basic-analytics-experience"
        -> Your default browser will automatically open the example in a new tab with the URL: localhost:8080/# 

# How to edit/use it

After completing the video you will be sent to the url #/ivxjs-analytics-test-input scene with one form appearing on the page.

Open the console in Chrome Develeper tools and fill out the form. On hitting submit, you will see a log:
    *iVXjs:global:element-event was fired with the following data*
If you open up that dropdown, you will see how iVX has stored all of the data for that input. The data is stored on the iVX platform