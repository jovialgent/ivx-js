import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class DateController extends InputControllerHelper {
	constructor($scope, iVXjs, iVXjsActions) {
		super($scope, iVXjs, iVXjsActions);
	}
}

DateController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(DateController);