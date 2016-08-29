import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class TextInputController extends InputControllerHelper  {
	constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);     
	}
}

TextInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(TextInputController)