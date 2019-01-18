import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import inputs from "./inputs";

const stateSettings = {
    id: "input-scene-test",
    url: "/input-scene-test",
    name: "Basic  Analytics Question",
    type: "input",
    next: [
        {
            route: "video-scene-test"
        }
    ],
    embedded: false,
    ...events(),
    section: {
        classes: "input-scene-test"
    },
    header: {
        html: headerHtml,
        classes: ""
    },
    footer: {
        html: footerHtml,
        classes: ""
    },
    inputs: [...inputs()]
};

export default [
    stateSettings
]