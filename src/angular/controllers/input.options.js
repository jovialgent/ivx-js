import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class OptionsInputController extends InputControllerHelper {
    constructor($scope, $timeout, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let {defaultValue, options, name, attributes = {}} = $scope.inputData;
        let experienceValue = iVXjs.experience.data[name];

        this.selected = {
            value: experienceValue ? experienceValue : ''
        };
       
        $timeout(() =>{
             if(attributes.required){
                $scope.$parent.formInput[name].$setValidity('required', experienceValue && experienceValue.length > 0);
                $scope.$parent.formInput[name].$error.required = true;
             }
        }, 1);
    }
}

OptionsInputController.$inject = ['$scope', '$timeout', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(OptionsInputController)