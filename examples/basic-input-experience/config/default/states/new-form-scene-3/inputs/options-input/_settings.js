import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

const settings = {
    id: "options-input",
    type: "options",
    name: "preferredContact",
    beforeHtml: {
        html: inputBeforeHTML,
        classes: "custom-before-html"
    },
    afterHtml: {
        html: inputAfterHTML,
        classes: "custom-after-html"
    },
    labelHTML: inputLabel,
    input: {},
    container: {},
    attributes: {
        required: true
    },
    settings: {},
    errors: {},
    options: [
        {
            value: "email",
            display: "Email"
        },
        {
            value: "phone",
            display: "Phone"
        }
    ]
}

export default settings;