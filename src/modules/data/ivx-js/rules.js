import Evaluator from './evaluator.js';
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isEmpty";

/**
 * A default rule system in which iVXjs chooses which state 
 * to go to based of the current iVXjs Experience data.
 */
export class Rules {

    /**
     * Adds the experience in which this data 
     * will be evaluated to.
     * 
     * @param {object} experience - iVXjsExperience 
     * object in which data will be used to evaluate various rules.
     */
    constructor(experience = { data: {} }, customEvaluator) {
        Object.assign(this, {
            experience,
            evaluator: new Evaluator(experience, customEvaluator)
        });
    }

    /**
     * The default rules function that will process an 
     * array of navigation objects and evaluate them using 
     * the processRules function.
     * 
     * @type {Function}
     */
    get rules() {
        let self = this;

        return (navArray = [], legacy = true, customEvaluator = () => { return false }) => {
            return self.processRules(navArray, legacy, customEvaluator);
        }
    }

    /**
     * Processes through and returns the first nav object whose 
     * rule is evaluated to true or rules are empty.
     * 
     * @param {array} navArray - An array of navigation objects 
     * with rules and states to be evaluated.
     * @return {string} - the stateId of the rule that was evaluated 
     * true first. If no state is return, returns an empty string.
     */
    processRules(rules = [], legacy = true, customEvaluator = () => { return false }) {
        if (legacy) return this.processStateRules(rules);

        return this.findMatchngRule(rules, customEvaluator);
    }

    processStateRules(next) {
        if (!Array.isArray(next)) {
            next = [];
        }

        const stateSelect = this.findMatchngRule(next);
        const { stateId = '', route } = stateSelect;

        return route ? route : stateId;
    }

    findMatchngRule(rules, customEvaluator = () => { return false }) {
        const self = this;

        return rules.find(ruleObj => {
            let { rule: ruleDefinition } = ruleObj;

            return self.getMatchingRule(ruleDefinition, customEvaluator);
        }) || {};
    }

    getMatchingRule(rule, customEvaluator = () => { return false }) {
        const { evaluator } = this;

        if (isEmpty(rule)) return true;

        const { conditions, conditionOperator = "and" } = rule;

        if (!conditions) {
            rule.conditionOperator = conditionOperator;
            rule.conditions = [rule];
        }

        return evaluator.evaluate(rule, customEvaluator);
    }

    addEvaluator(evaluatorName, evaluatorFn) {
        this.evaluator[evaluatorName] = evaluatorFn;
    }
}