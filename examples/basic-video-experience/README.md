# Basic Video Experience

 This example demonstrates the three different types of video types available through iVX. Story creators can play YouTube, Vimeo, and HTML videos. You can control video playback with iVX native controls on all three video types.  An isolated volume bar, as well as video controls (pause, play) allow for flexibility in placement and style.

# How To Run It

    * Open the terminal
    * Run the CLI command - "npm run example:basic-video-experience"
    * * Your default browser will automatically open the example in a new tab.

# How to edit/use it

You can navigate individually between video sources by replacing the URL with:
    * *localhost:8080/#/html*
    * *localhost:8080/#/youtube*
    * *localhost:8080/#/vimeo*

Or simply by finishing each video, the browser will automatically navigate to the next video scene.

To replace the source of say, the youtube video, go to *basic-video-experience/config/default/states/youtube-video-state/_settings.js*, line 18.  
The youtubeId is the parameter of the video's url. In this case, the full url is *https://www.youtube.com/watch?v=mgG7TngN8M4*.  Immediately following the "watch?v=" is a string of numbers and letters. This acts as the youtubeId, "mgG7TngN8M4".  The same can be done for a Vimeo video source, replacing the vimeoId with the string of numbers at the end of the URL.
