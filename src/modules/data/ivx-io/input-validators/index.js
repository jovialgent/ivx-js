import iVXioErrorNames from '../../../../constants/iVXio.errors.js';

//Validators 
import CascadingOptions from "./cascading-options.js"
import Checkbox from "./checkbox.js";
import Email from "./email.js";
import Number from "./number.js";
import Options from "./options.js";
import TextArea from "./textarea.js";
import TextLarge from "./text-large.js";
import TextMedium from "./text-medium.js";
import TextShort from "./text-short.js";
import Url from "./url.js";

const errorNames = new iVXioErrorNames();


export default class {
    constructor(states, storyInputs, experience, reject) {
        this.rawStates = [].concat(states);
        this.storyInputs = Object.assign({}, storyInputs);
        this.experience = experience;
        this.reject = reject;
    }

    get states() {
        return this.validateInputStates(this.rawStates);
    }

    get inputValidators() {
        return {
            CascadingOptions,
            Checkbox,
            Email,
            Number,
            Options,
            TextArea,
            TextLarge,
            TextMedium,
            TextShort,
            Url
        }
    }

    validateInputStates(states) {
        let self = this;
        return states.map((state, index) => {
            if (state.type === "input") {
                let {inputs = []} = state;

                state.inputs = self.validateInputs(inputs, state, index);
            }

            return state;
        });
    }

    validateInputs(inputs = [], state = {}, stateIndex) {
        let {inputValidators, storyInputs = {}, experience} = this;
        let self = this;

        return inputs.map((input, index) => {
            let {name} = input;
            let storyInput = storyInputs[name];

            if (!storyInput) {
                let {name: stateName, id} = state;
                let errorMessage = `
iVX.io Story input with key ${name} can not be found:
State Id : ${state.id}
State Name : ${stateName}
State Index : ${stateIndex}
Input Name: ${name}
Input Index: ${index}
                `;
                experience.Bus.emit(errorNames.EXPERIENCE, { message: errorMessage });
                experience.iVXjsLog.error({
                    message: errorMessage
                }, "EXPERIENCE");

            } else {
                let {display} = storyInput;
                let validator = inputValidators[display];
                let newInput = self.globalAttributesSet(storyInput, input);

                if (validator) {
                    return new validator(newInput, storyInput).input;
                }
            }

            return input;
        })
    }

    globalAttributesSet(storyInputData, jsonInputData) {
        let {attributes : storyAttributes = {}} = storyInputData;
        let {required: storyRequired = "false"} = storyAttributes;
        let newInput = Object.assign({}, jsonInputData);
        let {attributes: inputAttributes = {}} = newInput;
        let {required: inputRequired = false} = inputAttributes;

        newInput.attributes = Object.assign({}, inputAttributes, {
            required: storyRequired === "true" ? true : inputRequired
        });

        return newInput;
    }
}