export default class {
    constructor(iVXjs) {
        "ngInject";

        Object.assign(this, {
            iVXjs
        });
    }

    process(rules, legacy, evaluator = ()=>{return false}) {
        const { iVXjs } = this;

        return iVXjs.rules(rules, legacy, evaluator);
    }
}