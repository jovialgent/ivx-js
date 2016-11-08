import Evaluator from './evaluator.js';
import { TypeValidator, ObjectParsers } from '../../../utilities/type-parsers.js';


let typeValidator = new TypeValidator();

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

        /**
         * Current iVXjs Expereince 
         * 
         * @type {object}
         */
        this.experience = experience;
        this.evaluator = new Evaluator(experience, customEvaluator);
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

        return (navArray = []) => {
            return self.processRules(navArray);
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
    processRules(navArray = []) {
        let self = this;
        let stateSelect = navArray.find((navObj) => {
            let {rule} = navObj;

            if(typeValidator.isEmpty(rule)) return true;

            let {conditions, conditionOperator = "and"} = rule;

            if (!conditions) {
                rule.conditionOperator = conditionOperator;
                rule.conditions = [rule];
            }

            return self.evaluator.evaluate(rule);
        });

        return stateSelect ? stateSelect.stateId : '';
    }
}