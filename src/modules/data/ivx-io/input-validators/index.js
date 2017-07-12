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
    constructor(states, storyInputs, experience, reject, debug = false, debugCallBack = ()=>{}) {
        this.rawStates = [].concat(states);
        this.storyInputs = Object.assign({}, storyInputs);
        this.experience = experience;
        this.reject = reject;
        this.debug = debug;
        this.debugCallBack = debugCallBack;
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
                let { inputs = [] } = state;

                state.inputs = self.validateInputs(inputs, state, index);
            }

            return state;
        });
    }

    createRecommendedSettings(input) {
        let recommendedObject = this.createRecommendObject(input);
        let { types, options, attributes } = input;
        let message = `To support this input, it is recommend to create an input on the platform using these settings: 
${this.createRecommendedReadout(recommendedObject)}
        `;

        return {
            message,
            settings: recommendedObject
        }
    }

    createRecommendedReadout(recommendedObject) {
        let { key, options, types, attributes } = recommendedObject;
        let self = this;
        let readout = `Input Key: ${key}`;
        let typesReadout = `\nRecommended Input Type${types.length > 1 ? "s" : ""}: ${types.join(', ')}`;
        let optionReadout = options.reduce((currentOptionReadout, option) => {
            return `${currentOptionReadout}\n${self.createObjectReadOut(option, [], '\n')}`
        }, '');
        let attributeReadout = this.createObjectReadOut(attributes, ["width", "placeholder"], '\n');

        return `${readout}${typesReadout}${options.length > 0 ? "\nOptions:" + optionReadout : ""}${attributeReadout.length > 0 ? "\nAttributes:\n" + attributeReadout : ""}`;
    }

    createObjectReadOut(obj = {}, ignore = [], seperator = "") {
        let keys = Object.keys(obj);

        return keys.reduce((readout, key, index) => {
            if (ignore.indexOf(key) >= 0) return readout;

            return `${readout}${key} : ${obj[key]}${index < keys.length - 1 ? seperator : ""}`
        }, '')
    }

    createRecommendObject(input) {
        let { attributes } = input;
        let types = this.getRecommendedInputTypes(input.type);
        let options = this.getOptions(input);

        return {
            key: input.name,
            types,
            options,
            attributes
        }
    }


    getOptions(input) {
        let { type } = input;

        switch (type) {
            case "options": {
                return input.options;
            }
            case "buttons": {
                return input.buttons.map(button => {
                    return {
                        value: button.value,
                        display: "No Display Recommended"
                    }
                });
            }
            case "radio": {
                return input.radioButtons.map(radioButton => {
                    return {
                        value: radioButton.value,
                        display: "No Display Recommended"
                    }
                })
            }
        }

        return [];
    }

    getRecommendedInputTypes(type) {
        return {
            text: ["TextShort", "TextMedium", "TextLarge"],
            textarea: ["TextArea"],
            email: ["Email"],
            checkbox: ["Checkbox"],
            buttons: ["Options"],
            options: ["Options"],
            radio: ["Options"],
            number: ["Number"],
            url: ["Url"],
            date: ["TextShort", "TextMedium", "TextLarge", "Date"]
        }[type];
    }

    validateInputs(inputs = [], state = {}, stateIndex) {
        let { inputValidators, storyInputs = {}, experience, debug, debugCallBack } = this;
        let self = this;

        return inputs.map((input, index) => {
            let { name } = input;
            let storyInput = storyInputs[name];

            if (!storyInput) {
                let { name: stateName, id } = state;
                let errorMessage = `
iVX.io Story input with key ${name} can not be found:
State Id : ${state.id}
State Name : ${stateName}
State Index : ${stateIndex}
Input Name: ${name}
Input Index: ${index}
                `;

                let recommend = this.createRecommendedSettings(input);

                if (experience.Bus && !debug) {
                    experience.Bus.emit(errorNames.EXPERIENCE, { message: errorMessage });
                }

                if (experience.iVXjsLog && !debug) {
                    experience.iVXjsLog.error({
                        message: errorMessage
                    }, "EXPERIENCE");
                }

                if (experience.iVXjsLog && debug) {
                    experience.iVXjsLog.warn(errorMessage);
                }


                if (!debug) {
                    this.reject({
                        message: errorMessage,
                        info: {
                            inputName: name,
                            stateId: id,
                            stateName: stateName,
                            stateIndex: stateIndex,
                            inputIndex: index
                        },
                        state
                    });
                }

                if(debug && debugCallBack){
                    debugCallBack({
                        message: errorMessage,
                        info: {
                            inputName: name,
                            stateId: id,
                            stateName: stateName,
                            stateIndex: stateIndex,
                            inputIndex: index
                        },
                        state,
                        recommend
                    });
                }



            } else {
                let { display } = storyInput;
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
        let { attributes: storyAttributes = {} } = storyInputData;
        let { required: storyRequired = "false" } = storyAttributes;
        let newInput = Object.assign({}, jsonInputData);
        let { attributes: inputAttributes = {} } = newInput;
        let { required: inputRequired = false } = inputAttributes;

        newInput.attributes = Object.assign({}, inputAttributes, {
            required: storyRequired === "true" ? true : inputRequired
        });

        return newInput;
    }
}

