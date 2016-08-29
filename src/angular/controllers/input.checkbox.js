import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class CheckboxInputController extends InputControllerHelper  {
	constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);  
	}
}

CheckboxInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(CheckboxInputController)