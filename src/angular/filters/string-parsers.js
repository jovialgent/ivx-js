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

const stringParser = new StringParsers();

export default angular.module('ivx-js.filters.string-parsers', [])
    .filter('stringParsers', ['$rootScope',
        ($rootScope) => {
            return (name, text) => {
                return stringParser[name](text);
            }
        }])
    .name;