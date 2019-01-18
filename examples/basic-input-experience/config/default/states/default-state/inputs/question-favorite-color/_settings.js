
import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

import button0LabelHTML from "./templates/button.button-0.label.html";
import button1LabelHTML from "./templates/button.button-1.label.html";
import button2LabelHTML from "./templates/button.button-2.label.html";

const settings = {
    id: "question-favorite-color",
    type: "buttons",
    name: "favoriteColor",
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
    attributes: {},
    settings: {
        input: {
            classes: "question-favorite-color"
        }
    },
    errors: {},
    buttons: [
        {
            id: "button-0",
            value: "blue",
            labelHTML: button0LabelHTML,
            classes: "",
            onClick: []
        },
        {
            id: "button-1",
            value: "red",
            labelHTML: button1LabelHTML,
            classes: "",
            onClick: []
        },
        {
            id: "button-2",
            value: "green",
            labelHTML: button2LabelHTML,
            classes: "",
            onClick: []
        }
    ]
}

export default settings;