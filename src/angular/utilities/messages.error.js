import {ObjectParsers} from '../../utilities/type-parsers.js';

let thisObjectParser = new ObjectParsers();

export class ErrorMessages {
    constructor(input, errors, attributes = {}) {
        let {name: inputName, type: inputType} = input;
        this.inputName = inputName;
        this.inputType = inputType;
        this.errors = errors;
        this.attributes = attributes;
    }

    get tags() {
        let {attributes} = this;
        let angularErrorMap = this.angularErrorMap;
        let nonAngular = this.nonAngular;
        let nonValidate = this.nonValidate;

        return thisObjectParser.reduce(attributes, (tags, attributeValue, attributeKey) => {
            if (nonValidate.indexOf(attributeKey) >= 0) return tags;
            let tag = nonAngular.indexOf(attributeKey) >= 0 ?
                `${attributeKey}="${attributeValue}"` :
                `ng-${angularErrorMap[attributeKey]} = "${attributeValue}" `;
            return `${tags} ${tag}`;
        }, '');
    }

    get messages() {
        let {inputName, inputType, errors, attributes} = this;
        let angularErrorMap = this.angularErrorMap;
        let defaultMessages = this.defaultErrorMessages;
        let errorMessages = Object.keys(attributes).map((attributeKey, index) => {
            let message = errors && errors[attributeKey] ? errors[attributeKey] : defaultMessages[attributeKey];
            let attrHTML = `ng-show="($parent.formInput['${inputName}'].$dirty || $parent.formInput.$submitted) && $parent.formInput['${inputName}'].$error.${angularErrorMap[attributeKey]}"`;

            return {
                message: message,
                attrHTML: attrHTML
            }
        })

        
        if (inputType && inputType !== 'text' && inputType != "options") {
            errorMessages.push(this.inputTypeError);
        }

        return errorMessages;
    }

    get inputTypeError() {
        let {inputName, inputType, errors} = this;
        let errorMessage = errors[inputType];

        return {
            message: errorMessage ? errorMessage : "Invalid " + inputType,
            attrHTML: `ng-show="($parent.formInput['${inputName}'].$dirty || $parent.formInput.$submitted) && $parent.formInput['${inputName}'].$error.${inputType}"`
        }
    }

    get nonAngular() {
        return ['min', 'max', 'readonly', 'placeholder', 'step', 'readonly', 'style']
    }

    get nonValidate() {
        return ['step', 'placeholder', 'readonly'];
    }

    get angularErrorMap() {
        return {
            minlength: 'minlength',
            min: "min",
            max: "max",
            required: 'required',
            maxlength: 'maxlength'
        };
    }

    get defaultErrorMessages() {
        return {
            minlength: 'Too Short',
            min: "Too Low",
            max: "Too High",
            required: 'Required',
            maxlength: 'Too Long'
        };
    }
}