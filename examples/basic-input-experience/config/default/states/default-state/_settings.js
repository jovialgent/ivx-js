import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import inputs from "./inputs";

const stateSettings = {
    id: "default-state",
    url: "/before-after-buttons",
    name: "Testing Buttons BEFORE/AFTER",
    type: "input",
    next: [
        {
            stateId: "new-form-scene-3"
        }
    ],
    embedded: false,
    ...events(),
    section: {
        classes: "default-state"
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