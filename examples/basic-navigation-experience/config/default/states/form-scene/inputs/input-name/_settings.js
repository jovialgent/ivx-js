import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

const settings = {
    id: "input-name",
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
    container: {}
    ,
    attributes: {
        required: true
    },
    settings: {
        width: "1"
    },
    errors: {}
}

export default settings;