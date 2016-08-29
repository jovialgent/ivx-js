import { Comparator } from '../../../utilities/comparator.js';
import { TypeValidator, ObjectParsers } from '../../../utilities/type-parsers.js';

let comparator = new Comparator();
let typeValidator = new TypeValidator();

/**
 * Generates an iVXio Rules function that allows navigation and 
 * rule evaluation based on both experience data and progress.
 */
export class iVXioRules {
    
    /**
     * Attaches the current experience to this class to help
     * process both data and progress informaiton.
     * 
     * @param {iVXioExperiece} experience - iVXio Experience object
     * containing all the information for these rules to evaluate on.
     */
    constructor(experience, customRules) {
        
        /**
         * Puts the current exprience object into this class 
         * for rule evaluation.
         * 
         * @type {iVXioExperience}
         */
        this.experience = experience;
        this.customRules = customRules;
    }
    
    /**
     * A function that returns a stateId when an object in its
     * navArray evaluates to true.
     * 
     * @type {Function}
     */
    get rules(){
        let self = this;

        return (navArray) =>{
            if(typeof self.navArray !== 'undefined'){

                if(self.customRules){
                    let customRuleStateId = self.customRules(navArray);

                    if(customRuleStateId){
                        return customRuleStateId;
                    }
                }
            
            }
            return self.processRules(navArray);
        }
    }
    
    /**
     * iVXio's expressions use the symbols for evaluation, so this 
     * maps to the keywords for comparing.
     * 
     * @type {object}
     */
    get expressionMap() {
        return {
            "<=": "lte",
            ">=": "gte",
            "<": "lt",
            ">": "gt",
            "==": "equals",
            "!=": "notEquals"
        };
    }
    
    /**
     * Converts the progress name to a numeric value using this 
     * expererience's progressMap so the processRules function 
     * can evaluate this navigation based on its value.
     * 
     * @param {string} progress - Key to a progress value in this experiences
     * progress map.
     * @return {number} - the value of the progress in the progress map.
     */
    getProgressValue(progress) {
        let {story} = this.experience;
        let {progressMap} = story;
        let firstLetter = progress[0].toLowerCase();

        progress = `${firstLetter}${progress.substring(1)}`;

        return progressMap[progress];      
    }
    
    /**
     * Iterates through an array of rules and stateIds and returns
     * the first stateId to navigate to next based on this evaluateRule
     * function. 
     * 
     * 
     * @param {array} - navArray - An array of expressions and states 
     * that will evaluate the correct navigation to go to next.
     * @return {string} - state id to navigate next to.
     * 
     */
    processRules(navArray) {
        let self = this;
        let stateSelect = navArray.find((navObj) => {
            return self.evaluateRule(navObj);
        });
        let {state, stateId} = stateSelect;

        stateId = state ? state : stateId;
        
        return stateId;
    }
    
    /**
     * Evaluates a rule to be true or false depending on 
     * the experience's current data and progress. Used to choose 
     * which state to navigate to next.
     * 
     * @param {Object} navObj - an object containing at least a state ID
     * and an optional rule to be evaluated.
     * @return {Boolean} - a true/false value determining if the rule evaluates to
     * true or false. If a rule doesn't exist, this will return true implying that the 
     * state is a default.
     */
    evaluateRule(navObj) {
        let when;
        let {rule} = navObj;

        if (!rule || typeValidator.isEmpty(rule)) return true;
		
        let {key, is, value} = rule;

        if (key === 'progress') {
            let {progress, milestone} = this.experience;
            
            if(progress === 'Started' && milestone){
                progress = milestone;
            }
            
            when = this.getProgressValue(progress);
            value = this.getProgressValue(value);
        } else {
            when = this.experience.data[key];
        }
        
        return comparator.compare(when, is, value);
    }
}