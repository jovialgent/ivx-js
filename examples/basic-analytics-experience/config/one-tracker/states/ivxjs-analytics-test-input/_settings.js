import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import inputs from "./inputs";

const stateSettings = {
    id: "ivxjs-analytics-test-input",
    url: "/ivxjs-analytics-test-input",
    name: "New Question Scene: 5",
    type: "input",
    next: [],
    embedded: false,
    ...events(),
    section: {
        classes: "ivxjs-analytics-test-input"
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