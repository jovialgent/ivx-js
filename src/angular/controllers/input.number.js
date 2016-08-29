import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class NumberInputController extends InputControllerHelper  {
	constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);
	}
}

NumberInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(NumberInputController);