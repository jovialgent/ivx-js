import {ConfigStatesValidation} from '../../../../library/modules/validation/ivx-js-validation/config.states.js';

describe('ConfigStatesValidation', () => {

    describe('#uniqueValidStateData', () => {
        it("should return true if states are valid", () => {

            let states = [{
                'id': 'my-test-state',
                'url': '/test',
                'type': 'html'
            }, {
                    'id': 'my-test-state-a',
                    'url': '/test-a',
                    'type': 'html'
                }];

            let configStates = new ConfigStatesValidation(states);

            let testConfigStates = {
                valid: true,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s ids and urls are unique',
                    type: 'invalid'
                },
                data: states
            };

            expect(configStates.uniqueValidStateData).toEqual(testConfigStates);
        });

        it("should add errors to the error object with accurate indices and false.", () => {
            let states = [
                {
                    'id': 'test',
                    'url': '/test',
                    'type': 'html'
                }, {
                    'id': 'test',
                    'url': '/test-a',
                    'type': 'html'
                }, {
                    'id': 'test-a',
                    'url': '/test-a',
                    'type': 'html'
                }];

            let configStates = new ConfigStatesValidation(states);

            let testConfigStates = {
                valid: false,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s ids and urls are unique',
                    type: 'invalid'
                },
                data: states
            };

            let testErrorArrays = [
                {
                    valid: false,
                    error: {
                        type: 'duplicate',
                        path: 'config.states[1].id',
                        message: `Duplicate value: test`
                    }
                }, {
                    valid: false,
                    error: {
                         type: 'duplicate',
                        path: 'config.states[2].url',
                        message: `Duplicate value: /test-a`
                    }
                }];

            expect(configStates.uniqueValidStateData).toEqual(testConfigStates);
            expect(configStates.errors).toEqual(testErrorArrays);

        })
    })

    describe('#filledValidStateData', () => {



        it("should return true if states are valid", () => {

            let states = [{
                'id': 'my-test-state',
                'url': '/test',
                'type': 'html'
            }];

            let configStates = new ConfigStatesValidation(states);

            let testConfigStates = {
                valid: true,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s have an id, url, and/or type',
                    type: 'invalid'

                },
                data: states
            };

            expect(configStates.filledValidStateData).toEqual(testConfigStates);
        });

        it("should add errors to the error object with accurate indices and false.", () => {
            let states = [
                {
                    'id': '',
                    'url': '/test',
                    'type': 'html'
                }, {
                    'id': 'test',
                    'url': '',
                    'type': 'html'
                }, {
                    'id': 'test-a',
                    'url': '/test-a',
                    'type': ''
                }];

            let configStates = new ConfigStatesValidation(states);

            let testConfigStates = {
                valid: false,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s have an id, url, and/or type',
                    type: 'invalid'

                },
                data: states
            };

            let testErrorArrays = [
                {
                    valid: false,
                    error: {
                        type: 'missing',
                        path: 'config.states[0].id'
                    }
                }, {
                    valid: false,
                    error: {
                        type: 'missing',
                        path: 'config.states[1].url'
                    }
                }, {
                    valid: false,
                    error: {
                        type: 'missing',
                        path: 'config.states[2].type'
                    }
                }];

            expect(configStates.filledValidStateData).toEqual(testConfigStates);
            expect(configStates.errors).toEqual(testErrorArrays);

        })


    })

    describe('#convertToConfigErrorObjs', () => {
        let statesValid;

        beforeEach(() => {
            statesValid = new ConfigStatesValidation();
        });

        it("should create a missing error object array from the errors", () => {
            let errorArrays = statesValid.convertToConfigErrorObjs([{
                key: "test",
                value: 123,
                index: 0
            }], 'missing');

            let testErrorArrays = [{
                valid: false,
                error: {
                    type: 'missing',
                    path: 'config.states[0].test'
                }
            }];

            expect(errorArrays).toEqual(testErrorArrays);
        });

        it("should create a duplicate message error object array from the errors", () => {
            let errorArrays = statesValid.convertToConfigErrorObjs([{
                key: "test",
                value: 123,
                index: 0
            }], 'duplicate');

            let testErrorArrays = [{
                valid: false,
                error: {
                    type: 'duplicate',
                    path: 'config.states[0].test',
                    message: `Duplicate value: 123`
                }
            }];

            expect(errorArrays).toEqual(testErrorArrays);
        });

    });

})