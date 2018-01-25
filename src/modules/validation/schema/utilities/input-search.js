export default class{
    constructor(config = {}){
        this.config = config;
    }


    getInputsFromRules(rules){
        return rules.reduce((inputs, ruleObj) =>{
            if(ruleObj.rule){
                let {rule} = ruleObj;
                inputs.push({
                    "name" : rule.key,
                    "type" : typeof rule.value
                })
                
            }

            return inputs;
            

        }, []);

    }

    getInputsFromStates(states){
        
    }

    get inputs(){
        let {config} = this;
        let inputsFromRules = this.getInputsFromRules(config.defaultState);
        let inputsFromStates = this.getInputsFromStates(config.states);
    }
}