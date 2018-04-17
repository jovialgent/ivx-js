import { TypeValidator } from "../../utilities/type-parsers.js";

let thisTypeValidator = new TypeValidator();

export default class {
    constructor(selector, template, audioClass) {
        let thisSelector = !thisTypeValidator.isEmpty(selector) ? selector : '#ivx';
        let element = document.querySelector(thisSelector);

        if (element) {
            element.setAttribute('ui-view', '');
            return;
        }

        throw new Error('iVX.js requires an element to add to. Please add a selector to the init funtion or "<div id=\"ivx\"></div>" to your body')
    }
}