import {Validation} from './validation.js';



export class ExperienceValidation extends Validation{
    constructor(experience = {}){
        super();
        this.experience = experience;
    }
    
    get validationArray(){
        return [
            this.validAnimateElementObj,
            this.validSetDataObj
        ];
    }
    
    get validAnimateElementObj(){
        let {animateElement} = this.experience;
        return {
            valid : typeof animateElement !== 'undefined',
            error : {
                path : 'experience.animateElement',
                type : "missing"
            },
            data : animateElement            
        }
    }
    
    get validSetDataObj(){
        let {setData} = this.experience;
        return {
            valid : typeof setData !== 'undefined',
            error : {
                path : 'experience.setData',
                type: "missing"
            },
            data : setData            
        }
    }

};