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

const ngInjectableService = angular.module('ivx-js.services.actions.injectable', [])
    .service('iVXjsActions', Actions)
    .name;

export default angular.module('ivx-js.services.action', [ngInjectableService])
    .service('ivxjs.actions', Actions)
    .name;