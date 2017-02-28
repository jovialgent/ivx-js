import createFactoryFunction from '../../../utilities/factory-function-creator.js';
import ControllerFunction from './controller';

export class NAME {
    constructor() {
        this.templateUrl = "[TEMPLATE_PATH]";
        this.transclude = true;
        //this.restrict = 'E';
        
        this.replace = true;
        this.scope = {
            
        }
        this.controller = ControllerFunction;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
          
        }

        
    }
}

NAME.$inject = [];

export default createFactoryFunction(NAME);