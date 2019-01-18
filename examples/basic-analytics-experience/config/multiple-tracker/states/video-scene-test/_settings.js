import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

const stateSettings = {
    id: "video-scene-test",
    url: "/video-scene-test",
    name: "Basic Video Analytics",
    type: "video",
    next: [
        {
            stateId: "input-scene-test"
        }
    ],
    embedded: false,
    playerSettings: {
        src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
        id: "player-video-scene-test",
        controls: {
            type: "standard"
        }
    },
    ...events(),
    section: {
        classes: "video-scene-test"
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