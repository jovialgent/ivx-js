import htmlVideoState from "./html-video-state";
import vimeoVideoState from "./vimeo-video-state";
import youtubeVideoState from "./youtube-video-state";

const settings = [
    ...htmlVideoState(),
    ...vimeoVideoState(),
    ...youtubeVideoState()
];

export default settings;