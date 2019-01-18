import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import inputs from "./inputs";

const stateSettings = {
    id: "action-add-class-testing",
    url: "/",
    name: "Set/Remove Action Form",
    type: "input",
    next: [],
    embedded: false,
    ...events(),
    section: {
        classes: "action-add-class-testing"
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