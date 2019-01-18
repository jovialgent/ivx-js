import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import submtAfterHTML from "./templates/submit.after.html";
import submtBeforeHTML from "./templates/submit.before.html";
import submitButtonLabelHtml from "./templates/submit.label.html";

import inputs from "./inputs";

const stateSettings = {
    id: "new-form-scene-3",
    url: "/before-after-form",
    name: "New Form Scene: 3",
    type: "input",
    next: [
        {
            stateId: "default-state"
        }
    ],
    embedded: false,
    ...events(),
    section: {
        classes: "new-form-scene-3"
    },
    header: {
        html: headerHtml,
        classes: ""
    },
    footer: {
        html: footerHtml,
        classes: ""
    },
    form: {
        submit: {
            beforeHtml: {
                html: submtBeforeHTML,
                classes: "custom-before-html"
            },
            afterHtml: {
                html: submtAfterHTML,
                classes: "custom-after-html"
            },
            labelHTML: submitButtonLabelHtml,
            input: {},
            container: {}
        }
    },
    inputs: [...inputs()]
};

export default [
    stateSettings
]