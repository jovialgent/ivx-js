import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class EmailInputController extends InputControllerHelper {
	constructor($scope, iVXjs, iVXjsActions) {
		super($scope, iVXjs, iVXjsActions);
	}
}

EmailInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(EmailInputController);