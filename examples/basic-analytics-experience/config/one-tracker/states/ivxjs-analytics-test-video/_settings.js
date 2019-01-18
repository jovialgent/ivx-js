import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

const stateSettings = {
    id: "ivxjs-analytics-test-video",
    url: "/ivxjs-analytics-test-video",
    name: "New Video Scene: 3",
    type: "video",
    next: [
        {
            stateId: "ivxjs-analytics-test-input"
        }
    ],
    embedded: false,
    playerSettings: {
        src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
    },
    ...events(),
    section: {
        classes: "ivxjs-analytics-test-video"
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