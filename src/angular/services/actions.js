import { TypeValidator } from '../../utilities/type-parsers.js';
import { ActionProcessor } from '../../core/processor.js';
import createFactoryFunction from '../utilities/create-factory-function.js';

let typeValidator = new TypeValidator();

export class Actions extends ActionProcessor {
    constructor($rootScope, $state, $window, iVXjs, iVXjsBus) {
        super(iVXjs);

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$window = $window;
        this.iVXjsBus = iVXjsBus;
        this.iVXjs = iVXjs;
    }

    navigateToNextState(nextArray) {
        if (typeValidator.isEmpty(nextArray)) return;

        this.$state.go(this.iVXjs.rules(nextArray));
    }

    resolveThenNavigate(actionArray, nextArray) {
        let self = this;

        if (typeValidator.isEmpty(actionArray)) {
            this.navigateToNextState(nextArray);
            return;
        }

        this.resolveActions(actionArray, () => {
            self.navigateToNextState(nextArray);
        });
    }
}

Actions.$inject = ['$rootScope', '$state', '$window', 'iVXjs', 'ivxjs.bus'];

export default angular.module('ivx-js.services.action', [])
    .service('ivxjs.actions', createFactoryFunction(Actions))
    .name;