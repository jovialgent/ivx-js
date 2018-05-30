import createFactoryFunction from '../utilities/create-factory-function.js';

class FormInputController {
    constructor($scope, $filter) {
        let self = this;

        this.formController = {};
        this.onSubmit = ($event) => {
            let { formInput } = $scope;

            $scope.onSubmit(formInput, $event);
        }
    }
}

FormInputController.$inject = ['$scope', '$filter'];

export default createFactoryFunction(FormInputController);