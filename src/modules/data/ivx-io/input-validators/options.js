import Buttons from "./options.buttons.js";
import Radio from "./options.radio.js";

export default class {
    constructor(jsonInputData = {}, storyInputData = {}) {
        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    get input() {
        let { jsonInputData, storyInputData } = this;
        let { type } = jsonInputData;

        if (type === "buttons") {
            return new Buttons(jsonInputData, storyInputData).input;
        }

        if (type === "radio") {
            return new Radio(jsonInputData, storyInputData).input;
        }

    
        const { options: platformOptions = [] } = storyInputData;
        const { options: iVXjsOptions = [] } = jsonInputData;
        const updatedOptions = platformOptions.map((platformOption) => {
            const { value: platformOptionValue } = platformOption;
            const matchingOption = iVXjsOptions.find(iVXjsOption => iVXjsOption.value === platformOptionValue);
            
            let updatedOption = Object.assign({}, platformOption);

            if (matchingOption && matchingOption.display) updatedOption.display = matchingOption.display;

            return updatedOption;
        });

        let newInputData = Object.assign({},
            jsonInputData,
            {
                options: updatedOptions,
                type: "options"
            }
        );

        return newInputData;
    }
}