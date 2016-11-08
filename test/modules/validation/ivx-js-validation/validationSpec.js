import {Validation} from '../../../../src/modules/validation/ivx-js-validation/validation.js';


describe('Validation', () => {
    let validation;
    beforeEach(() => {
        //validation = new Validation();
    });
    
    describe('#valid', () => {

        it('it should return true if all arrays are true.', () => {
            class MyValidation extends Validation {
                constructor() {
                    super();
                }

                get validationArray() {
                    return [{
                        valid: true
                    }]
                }
            }
            let myValid = new MyValidation();

            expect(myValid.valid).toEqual(true);
        });
        
        it('it should return false if at least one  valid  is false.', () => {
            class MyValidation extends Validation {
                constructor() {
                    super();
                }

                get validationArray() {
                    return [{
                        valid: true
                    },{
                        valid : false
                    }, undefined]
                }
            }
            let myValid = new MyValidation();

            expect(myValid.valid).toEqual(false);
        })
    });

})