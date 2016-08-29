export class StringParsers {
    constructor(id) {

    }

    camelCase(id) {
        let inputParts = id.split('-');
        let self = this;
        let inputName = inputParts && inputParts.length > 0 ? inputParts.reduce((inputName, inputPart) => {
            return `${inputName}${self.capitalize(inputPart)}`;
        }) : `${inputParts[0]}`;

        return inputName;
    }

    startCase(id) {
        let inputParts = id.split('-');
        let self = this;
        let inputName = inputParts && inputParts.length > 0 ? inputParts.reduce((inputName, inputPart) => {
            return `${inputName}${self.capitalize(inputPart)} `;
        }, '') : `${inputParts[0]}`;

        return inputName;
    }

    capitalize(tempString) {
        return tempString[0].toUpperCase() + tempString.substring(1);
    }
}