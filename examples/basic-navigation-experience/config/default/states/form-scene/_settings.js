import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import inputs from "./inputs";

const stateSettings = {
    id: "form-scene",
    url: "/form-scene",
    name: "Form Scene",
    type: "input",
    next: [],
    embedded: false,
    ...events(),
    section: {
        classes: "form-scene"
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