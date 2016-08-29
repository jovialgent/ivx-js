import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class RadioInputController extends InputControllerHelper  {
    constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);  
	}
}

RadioInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(RadioInputController)