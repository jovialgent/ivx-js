import Buttons from "./options.buttons.js";
import Radio from "./options.radio.js";

export default class {
    constructor(jsonInputData = {}, storyInputData = {}) {
        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    get input() {
        let {jsonInputData, storyInputData} = this;
        let {type} = jsonInputData;

        if (type === "buttons") {
            return new Buttons(jsonInputData, storyInputData).input;
        }

        if (type === "radio") {
            return new Radio(jsonInputData, storyInputData).input;
        }

        let {options} = storyInputData;

        let newInputData = Object.assign({},
            jsonInputData,
            {
                options,
                type: "options"
            }
        );

        return newInputData;
    }
}