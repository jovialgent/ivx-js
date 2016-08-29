import {ModuleValidation} from '../../../../library/modules/validation/ivx-js-validation/modules.js';

describe('ModuleValidation', () => {

    describe('#validUIModuleObj', () => {
        let errorObj;

        beforeEach(() => {
            errorObj = {
                valid: false,
                error: {
                    "path": "modules.ui",
                    "type": "missing"
                },
                data: {}
            }
        });
        xit("should return true if ui is defined and type is filled", () => {
            let uiData = {
                ui: {
                    type: 'test'
                }
            }
            let moduleValid = new ModuleValidation(uiData);

            expect(moduleValid.validUIModuleObj.valid).toBeTruthy();
        });

        xit("should return false if ui is not defined.", () => {

            let uiData = {

            };

            let moduleValid = new ModuleValidation(uiData);

            expect(moduleValid.validUIModuleObj).toEqual(errorObj);
        });

        xit("should return false if ui type is empty.", () => {

            let uiData = {
                ui: {
                    type: ''
                }
            };

            let moduleValid = new ModuleValidation(uiData);

            errorObj.data = {
                type: ''
            };

            expect(moduleValid.validUIModuleObj).toEqual(errorObj);
        });
    })


})