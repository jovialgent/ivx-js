import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class DateTimeLocalController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);
    }
}

DateTimeLocalController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(DateTimeLocalController);