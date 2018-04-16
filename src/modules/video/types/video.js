import { TypeValidator } from "../../../utilities/type-parsers.js";

let typeValidator = new TypeValidator();

export default class {
    constructor() {

    }

    showControls(controls) {
        const isControlObject = typeValidator.isObject(controls);

        let showControls = !typeValidator.isString(controls) && controls;

        if (isControlObject) {
            const { type } = controls;

            showControls = !typeValidator.isString(type) && type;
        }

        return showControls;
    }
}