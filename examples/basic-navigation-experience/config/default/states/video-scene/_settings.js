import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

const stateSettings = {
    id: "video-scene",
    url: "/video-scene",
    name: "Video Scene",
    type: "video",
    next: [],
    embedded: false,
    playerSettings: {
        src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
    },
    ...events(),
    section: {
        classes: "video-scene"
    },
    header: {
        html: headerHtml,
        classes: ""
    },
    footer: {
        html: footerHtml,
        classes: ""
    }
};

export default [
    stateSettings
]