import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

const settings = {
    id: "question-input-dark-jungle-green-input",
    type: "text",
    name: "name",
    beforeHtml: {
        html: inputBeforeHTML,
        classes: ""
    },
    afterHtml: {
        html: inputAfterHTML,
        classes: ""
    },
    labelHTML: inputLabel,
    input: {},
    container: {},
    attributes: {
        required: true,
        maxlength: 128,
        minlength: 0
    },
    settings: {
        input: {
            classes: "question-input-dark-jungle-green-input"
        }
    },
    errors: {}
}

export default settings;