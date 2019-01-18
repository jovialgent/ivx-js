import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

const stateSettings = {
    id: "youtube-video-state",
    url: "/youtube",
    name: "YouTube Video Test",
    type: "video",
    next: [
        {
            stateId: "vimeo-video-state"
        }
    ],
    embedded: false,
    playerSettings: {
        id: "my-video-player",
        youtubeId: "mgG7TngN8M4",
        controls: "standard"
    },
    ...events(),
    section: {},
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