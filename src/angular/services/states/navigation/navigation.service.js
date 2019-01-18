import isEmpty from "lodash/isEmpty";

export default class {
    constructor($state, iVXjs, iVXjsRules) {
        "ngInject";

        Object.assign(this, {
            $state,
            iVXjs,
            iVXjsRules
        })
    }

    go(next = [], customEvaluator = ()=>{}) {
        const { $state } = this;

        if (isEmpty(next)) return;

        const route = this.processNavigationRules(next, customEvaluator);

        if (!isEmpty(route)) {
            $state.go(route);
        }
    }

    processNavigationRules(next, customEvaluator) {
        const { iVXjsRules } = this;
        const { stateId = '', route } = iVXjsRules.process(next, false, customEvaluator);

        return route ? route : stateId;
    }
}