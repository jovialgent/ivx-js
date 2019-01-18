import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

const stateSettings = {
    id: "vimeo-video-state",
    url: "/vimeo",
    name: "Vimeo Test",
    type: "video",
    next: [
        {
            stateId: "html-video-state"
        }
    ],
    embedded: false,
    playerSettings: {
        id: "my-video-player",
        vimeoId: "248899410",
        controls: {
            type: "standard"
        }
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