import { Comparator } from '../../../utilities/comparator.js';
import { TypeValidator, ObjectParsers } from '../../../utilities/type-parsers.js';

let comparator = new Comparator();
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
    constructor(experience = { data: {} }, customRules = () => { }) {

        /**
         * Current iVXjs Expereince 
         * 
         * @type {object}
         */
        this.experience = experience;
        this.customRules = customRules;
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

            let customRuleStateId = self.customRules(navArray);

            if (customRuleStateId) {
                return customRuleStateId;
            }

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
            return self.evaluateRules(navObj);
        });

        return stateSelect ? stateSelect.stateId : '';
    }

    /**
     * Evaluates a navObj's rule object to see if it the stateId
     * provided should be used in navigation. If there are no rules or rules is empty,
     * then will return true.
     * 
     * @param {object} navObj - an object with a stateId and rule object to be evaluated.
     * @param {object} navObj.rule - rule to be evaluated by a comparator.
     * @param {string} navObj.rule.key - data key to be evaluated.
     * @param {string} navObj.rule.is - the compare type to run in this comparator.
     * @param {string} navObj.rule.value - value to be evaluatad.
     * @return {Boolean} - whether or not the rule evaluates to true or has a rule.
     */
    evaluateRules(navObj) {
        let {rule} = navObj;

        if (!rule || typeValidator.isEmpty(rule)) return true;

        return comparator.compare(this.experience.data[rule.key], rule.is, rule.value);
    }
}