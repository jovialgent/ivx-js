import {ConfigValidation} from '../../../../src/modules/validation/ivx-js-validation/config.js';


describe('ConfigValidation', () => {

    describe('#hasStatesObj', () => {
        it('should return valid if there are states', () => {
            let settings = {
                defaultState: [{
                    stateId: 'test'
                }],
                states: [{
                    id: 'test',
                    url: '/test',
                    type: 'html'
                }]
            };
            let thisConfig = new ConfigValidation(settings);
            let testObj = {
                valid: true,
                error: {
                    "type": "missing",
                    "path": "config.states"
                },
                data: settings.states
            }
            
            expect(thisConfig.hasStatesObj).toEqual(testObj);


        });
        
         it('should return invalid if there are states defined', () => {
            let settings = {
                defaultState: [{
                    stateId: 'test'
                }]
               
            };
            let thisConfig = new ConfigValidation(settings);
            let testObj = {
                valid: false,
                error: {
                    "type": "missing",
                    "path": "config.states"
                },
                data: settings.states
            }
            
            expect(thisConfig.hasStatesObj).toEqual(testObj);


        });
        
        it('should return invalid if there are no states', () => {
            let settings = {
                states: [],
                defaultState: [{
                    stateId: 'test'
                }]
               
            };
            let thisConfig = new ConfigValidation(settings);
            let testObj = {
                valid: false,
                error: {
                    "type": "missing",
                    "path": "config.states"
                },
                data: settings.states
            }
            
            expect(thisConfig.hasStatesObj).toEqual(testObj);


        });
    })

    describe('#hasDefaultStateObj', () => {
        it('should return valid if there is a default state array', () => {
            let settings = {
                defaultState: [{
                    stateId: 'test'
                }]
            };
            let thisConfig = new ConfigValidation(settings);
            let testObj = {
                valid: true,
                error: {
                    "type": "missing",
                    "path": "config.defaultState"
                },
                data: settings.defaultState
            }

            expect(testObj).toEqual(thisConfig.hasDefaultStateObj);

        });
    })


    describe('#validDefaultStateObj', () => {

        it('should return valid if there is a default state.', () => {
            let thisConfig = new ConfigValidation({
                defaultState: [{
                    stateId: 'test'
                }]
            })
            let testObj = {
                valid: true,
                error: {
                    "type": "missing",
                    "path": `config.defaultState[0].stateId`
                }
            }

            expect(testObj).toEqual(thisConfig.validDefaultStateObj);


        });

        it('should return invalid if there is no default state.', () => {
            let thisConfig = new ConfigValidation({
                defaultState: [{}]
            });
            let testObj = {
                valid: undefined,
                error: {
                    "type": "missing",
                    "path": `config.defaultState[0].stateId`
                }
            }

            expect(testObj).toEqual(thisConfig.validDefaultStateObj);

        });

        it('should return undefined if there is nothing in default state.', () => {
            let thisConfig = new ConfigValidation({
                defaultState: []
            });
            let testObj = {
                valid: undefined,
                error: {
                    "type": "missing",
                    "path": `config.defaultState[0].stateId`
                }
            }

            expect(thisConfig.validDefaultStateObj).toBeUndefined();

        });

    });



});