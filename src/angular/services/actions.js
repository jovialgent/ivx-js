import { TypeValidator } from '../../utilities/type-parsers.js';
import { ActionProcessor } from '../../core/processor.js';
import createFactoryFunction from '../utilities/create-factory-function.js';

let typeValidator = new TypeValidator();

export class Actions extends ActionProcessor {
    constructor(iVXjs, iVXjsStateNavigation) {
        "ngInject";

        super(iVXjs);

        Object.assign(this, {
            iVXjsStateNavigation
        })
    }

    resolveThenNavigate(actionArray, nextArray, source = {}) {
        const { iVXjsStateNavigation } = this;
        
        this.resolveActions(actionArray, () => {
            iVXjsStateNavigation.go(nextArray);
        }, source);
    }
}

export default angular.module('ivx-js.services.action', [])
    .service('ivxjs.actions', Actions)
    .service('iVXjsActions', Actions)
    .name;