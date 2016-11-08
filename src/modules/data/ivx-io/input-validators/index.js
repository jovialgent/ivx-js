import TextShort from "./text-short.js";
import TextMedium from "./text-medium.js";
import TextLarge from "./text-large.js";
import TextArea from "./textarea.js";
import Number from "./number.js";
import Email from "./email.js";
import Url from "./url.js";
import Checkbox from "./checkbox.js";
import Options from "./options.js";



export default class {
    constructor(states, storyInputs) {
        this.rawStates = JSON.parse(JSON.stringify(states));
        this.storyInputs = storyInputs;
        this.states = this.validateInputStates(this.rawStates);
    }

    validateInputStates(states) {
        let self = this;
        return states.map((state, index) => {
            if (state.type === "input") {
                let {inputs} = state;
                state.inputs = self.validateInputs(inputs);
            }

            return state;
        });
    }

    validateInputs(inputs) {
        let {inputValidators, storyInputs} = this;
        return inputs.map((input, index) => {
            let {name} = input;
            let storyInput = storyInputs[name];
            let {display} = storyInput;
            let validator = inputValidators[display];
           
            if(validator){
                return new validator(input, storyInput).input;
            }

            return input;
        })
    }

    get inputValidators() {
        return {
            TextShort,
            TextMedium,
            TextLarge,
            TextArea,
            Number,
            Email,
            Url,
            Checkbox,
            Options
        }
    }
}