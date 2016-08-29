import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class TextAreaInputController extends InputControllerHelper  {
	constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);
	}
}

TextAreaInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(TextAreaInputController)