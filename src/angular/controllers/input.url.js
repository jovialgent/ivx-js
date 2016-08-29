import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class URLInputController extends InputControllerHelper  {
	constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);  
	}
}

URLInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(URLInputController)