import {Rules as DefaultRules} from "../ivx-js/rules.js";

export class Rules extends DefaultRules{
    constructor(experience = { data: {} }, customRules = () => { }) {
        super(experience, customRules);
       
        this.experience = experience;
        this.customRules = customRules;
    }

    get rules() {
        let self = this;

        return (navArray = []) => {

            let customRuleStateId = self.customRules(navArray);

            if (customRuleStateId) {
                return customRuleStateId;
            }

            let nextStateId = self.processRules(navArray).stateId;
            let nextState =  self.experience.config.states.find((state, index)=>{
               return nextStateId === state.id;
            });

            return nextStateId;
        }
    }

    processRules(navArray = []) {
        let self = this;
        let stateSelect = navArray.find((navObj) => {
            let isAuthRule = navObj.rule && navObj.rule.key && navObj.rule.key === 'auth';

            if(isAuthRule){
                return firebase.auth().currentUser;
            }

            return self.evaluateRules(navObj);
        });
        
        return stateSelect ? stateSelect : '';
    }

}