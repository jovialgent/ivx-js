import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

const settings = {
    id: "input-satisfaction",
    type: "number",
    name: "satisfaction",
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
        min: 0,
        max: 10,
        step: 1
    },
    settings: {
        width: "1/3"
    },
    errors: {}
}

export default settings;