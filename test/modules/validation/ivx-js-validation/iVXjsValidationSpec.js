import {iVXjsValidation} from '../../../../library/modules/validation/ivx-js-validation/index.js';

describe('iVXjsValidation', () => {

    describe('#ruleValidationObj', () => {

        it('should return valid if there are rules', () => {
            let data = {
                modules: {},
                rules: () => { },
                experience: {
                    animateElement: () => { },
                    setData: () => { }
                },
                config: {
                    states: [],
                    defaultState: []
                }
            }
            let iVXjsValid = new iVXjsValidation(data);

            let testErrorObj = {
                valid: true,
                error: {
                    name: 'Missing Rules:',
                    message: `The function rules needs to be defined in the experience.`
                },
                data: data.rules
            }

            expect(iVXjsValid.ruleValidationObj).toEqual(testErrorObj);

        })

        it('should return invalid if there are  no rules', () => {
            let data = {
                modules: {},

                experience: {
                    animateElement: () => { },
                    setData: () => { }
                },
                config: {
                    states: [],
                    defaultState: []
                }
            }
            let iVXjsValid = new iVXjsValidation(data);

            let testErrorObj = {
                valid: false,
                error: {
                    name: 'Missing Rules:',
                    message: `The function rules needs to be defined in the experience.`
                },
                data: data.rules
            }

            expect(iVXjsValid.ruleValidationObj).toEqual(testErrorObj);

        })

    });

})