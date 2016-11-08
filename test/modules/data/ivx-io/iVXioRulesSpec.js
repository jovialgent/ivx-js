import {iVXioRules} from '../../../../src/modules/data/ivx-io/rules.js';
import {MockiVXioExperience} from './mock-experience.js';

describe('iVXioRules', () => {

    describe('#getProgressValue', () => {
        let experience, rules;

        beforeEach(() => {
            experience = {

                story: {
                    progressMap: {
                        "started": 0,
                        "complete": 2,
                        "converted": 623
                    }
                }
            };

            rules = new iVXioRules(experience);
        });

        it('should return with the correct value based on the progress', () => {
            expect(rules.getProgressValue('Converted')).toEqual(623);
        });

    });

    describe('#evaluateRule', () => {
        let experience, rules;

        beforeEach(() => {
            experience = {
                progress: "Complete",
                data: {
                    "test": 123
                },
                story: {
                    progressMap: {
                        "started": 0,
                        "complete": 2,
                        "converted": 623
                    }
                }
            };

            rules = new iVXioRules(experience);
        });

        it('should return true if there are no rules in the navObj', () => {
            let navObj = {
                stateId: "testState"
            }

            expect(rules.evaluateRule(navObj)).toEqual(true);
        });

        it('should return true if the rule is empty in the navObj', () => {
            let navObj = {
                stateId: "testState",
                rule: {}
            }

            expect(rules.evaluateRule(navObj)).toEqual(true);
        });

        it('should still evaluate if rule is expression.', () => {
            let navObj = {
                stateId: "testState",
                expression: {}
            }

            expect(rules.evaluateRule(navObj)).toEqual(true);
        });

        it('should use the progressMap if the when statement is equal to "when".', () => {
            let navObj = {
                stateId: "testState",
                rule: {
                    "key": "progress",
                    "is": "lte",
                    "value": "Complete"
                }
            }

            expect(rules.evaluateRule(navObj)).toEqual(true);

        });

        it('should use the experience data if the when is an input key.', () => {
            let navObj = {
                stateId: "testState",
                rule: {
                    "key": "test",
                    "is": "lte",
                    "value": 123
                }
            }

            expect(rules.evaluateRule(navObj)).toEqual(true);

        });
    });

    describe('#processRules', () => {
        let experience, rules;

        beforeEach(() => {
            experience = {
                progress: "Complete",
                data: {
                    "test": 123
                },
                story: {
                    progressMap: {
                        "started": 0,
                        "complete": 2,
                        "converted": 623
                    }
                }
            };


            rules = new iVXioRules(experience).rules;
        });

        it('should return the last stateId if none before it doesn\'t evaluate to true', () => {
            let navArray = [
                {
                    state: "test-state-1",
                    rule: {
                        "key": "progress",
                        "is": "gte",
                        "value": "Converted"
                    }
                }, {
                    stateId: "test-state-2",
                    rule: {
                        "key": "test",
                        "is": "gte",
                        "value": "1234"
                    }
                },{
                    stateId : "test-state-3"
                }];
            
            expect(rules(navArray)).toEqual(navArray[2].stateId);
        });
        
        it('should return the  stateId if an input key is defined in the rule.', () => {
            let navArray = [
                {
                    state: "test-state-1",
                    rule: {
                        "key": "progress",
                        "is": "gte",
                        "value": "Converted"
                    }
                }, {
                    stateId: "test-state-2",
                    rule: {
                        "key": "test",
                        "is": "gte",
                        "value": "123"
                    }
                },{
                    stateId : "test-state-3"
                }];
            
            expect(rules(navArray)).toEqual(navArray[1].stateId);
        });
        
        it('should return the  stateId if the progress evaluates correctly.', () => {
            let navArray = [
                {
                    state: "test-state-1",
                    rule: {
                        "key": "progress",
                        "is": "gte",
                        "value": "Complete"
                    }
                }, {
                    stateId: "test-state-2",
                    rule: {
                        "key": "test",
                        "is": "gte",
                        "value": "123"
                    }
                },{
                    stateId : "test-state-3"
                }];
            
            expect(rules(navArray)).toEqual(navArray[0].state);
        });
    })

})