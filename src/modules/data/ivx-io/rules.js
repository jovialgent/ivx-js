import Evaluator from './evaluator.js';
import {Rules} from "../ivx-js/rules.js";

/**
 * Generates an iVXio Rules function that allows navigation and 
 * rule evaluation based on both experience data and progress.
 */
export class iVXioRules extends Rules {
     
    /**
     * Attaches the current experience to this class to help
     * process both data and progress informaiton.
     * 
     * @param {iVXioExperiece} experience - iVXio Experience object
     * containing all the information for these rules to evaluate on.
     */
    constructor(experience, customEvaluator) {
        super(experience, customEvaluator);
        this.evaluator = new Evaluator(experience, customEvaluator);
    }
}