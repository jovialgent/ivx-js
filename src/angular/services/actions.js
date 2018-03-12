import { TypeValidator } from '../../utilities/type-parsers.js';
import { ActionProcessor } from '../../core/processor.js';
import createFactoryFunction from '../utilities/create-factory-function.js';

let typeValidator = new TypeValidator();

export class Actions extends ActionProcessor {
    constructor($rootScope, $state, $window, iVXjs, iVXjsBus) {
        "ngInject";

        super(iVXjs);

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$window = $window;
        this.iVXjsBus = iVXjsBus;
        this.iVXjs = iVXjs;
    }

    navigateToNextState(nextArray) {
        if (typeValidator.isEmpty(nextArray)) return;

        const route = this.iVXjs.rules(nextArray);

        if(!typeValidator.isEmpty(route)){
            this.$state.go(route);
        }
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

export default angular.module('ivx-js.services.action', [])
    .service('ivxjs.actions', Actions)
    .service('iVXjsActions', Actions)
    .name;