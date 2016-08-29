import {ExperienceValidation} from '../../../../library/modules/validation/ivx-js-validation/experience.js';

describe('Experience', () => {
    describe('#validAnimateElementObj', () => {

        it('should return valid if it has an animateElement', () => {
            let experience = {
                 animateElement: () => { }
            }
            let experienceValid = new ExperienceValidation(experience);
            let testExperience = {
                valid: true,
                error: {
                    path: 'experience.animateElement',
                    type: "missing"
                },
                data: experience.animateElement
            };
            expect(experienceValid.validAnimateElementObj).toEqual(testExperience);
            
        })
        
         it('should return invalid if it does not have an animateElement', () => {
            let experience = {
                
            }
            let experienceValid = new ExperienceValidation(experience);
            let testExperience = {
                valid: false,
                error: {
                    path: 'experience.animateElement',
                    type: "missing"
                },
                data: experience.animateElement
            };
            expect(experienceValid.validAnimateElementObj).toEqual(testExperience);
            
        })

    });
    
    describe('#validSetDataObj', () => {

        it('should return valid if it has a setData', () => {
            let experience = {
                 setData: () => { }
            }
            let experienceValid = new ExperienceValidation(experience);
            let testExperience = {
                valid: true,
                error: {
                    path: 'experience.setData',
                    type: "missing"
                },
                data: experience.setData
            };
            expect(experienceValid.validSetDataObj).toEqual(testExperience);
            
        })
        
         it('should return invalid if it does not have a setData', () => {
            let experience = {
                
            }
            let experienceValid = new ExperienceValidation(experience);
            let testExperience = {
                valid: false,
                error: {
                    path: 'experience.setData',
                    type: "missing"
                },
                data: experience.animateElement
            };
            expect(experienceValid.validSetDataObj).toEqual(testExperience);
            
        })

    })
})