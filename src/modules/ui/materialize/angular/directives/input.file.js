import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import FileInputController from '../controllers/input.file.js';

class FileInput {
    constructor($compile, $filter, $http, iVXjs, iVXjsUIModule, iVXjsActions, pullInTemplate) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = FileInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let {inputData: input} = $scope;
            let {id, name, errors = {}, labelHTML, label = $filter('stringParsers')('startCase', id), attributes = {}, type, settings = {}} = input;
            let tagHTML = `onchange="angular.element(this).scope().fileNameChanged(this)" ng-model="inputValue"`

            input.label = labelHTML ? labelHTML : label;
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);

            let uiFileObj = {
                input: input,
                settings: settings,
                tags: tagHTML
            };
            let file = new iVXjsUIModule.file(uiFileObj);

            iElm.html(file.html);

            $compile(iElm.contents())($scope);

            $scope.fileNameChanged = (el) => {
                if (iVXjs.experience.uploadFile) {
                    let files = el.files;
                    let numOfFiles = files.length;

                    for (let i = 0; i < numOfFiles; i++) {
                        let file = files[i];
                        let filePromise = iVXjs.experience.uploadFile(file);

                        Promise.all([filePromise])
                            .then(() => {
                                let {onChange = [], name:inputName} = input;

                                onChange.unshift({
                                    "eventName": "setData",
                                    "args": {
                                        "key": inputName,
                                        "value": file.name
                                    }
                                });

                                iVXjsActions.resolveActions(onChange, () => {

                                });
                            }, () => {

                            })
                    }

                }
            }
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

FileInput.$inject = ['$compile', '$filter', '$http', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.actions', 'pullInTemplate'];

export default createFactoryFunction(FileInput);