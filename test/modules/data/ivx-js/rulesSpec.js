import {Rules} from '../../../../src/modules/data/ivx-js/rules.js';

describe('Rules', () => {
    describe('#evaluateRules', () => {
        let experience, rules;

        beforeEach(() => {
            experience = {
                data: {
                    test: 1
                }
            };
            rules = new Rules(experience);
        });

        it('should evaluate true if the rule is true', () => {
            let navObj = {
                rule: {
                    key: "test",
                    is: "lte",
                    value: 1
                },
                stateId: 'test2'
            };

            expect(rules.evaluateRules(navObj)).toEqual(true);
        });

        it('should evaluate true if no rule exists', () => {
            let navObj = {

                stateId: 'test2'
            };

            expect(rules.evaluateRules(navObj)).toEqual(true);
        });
        
        it('should evaluate true if rule is empty', () => {
            let navObj = {
                rules : {
                    
                },
                stateId: 'test2'
            };

            expect(rules.evaluateRules(navObj)).toEqual(true);
        });


        it('should evaluate false if the rule is false', () => {
            let navObj = {
                rule: {
                    key: "test",
                    is: "lt",
                    value: 1
                },
                stateId: 'test2'
            };

            expect(rules.evaluateRules(navObj)).toEqual(false);
        })
    });

    describe('#processRules', () => {
        let experience, rules;
        beforeEach(() => {
            experience = {
                data: {
                    test: 1,
                    testA: 2
                }
            };
            rules = new Rules(experience).rules;
        });

        it('should evaluate the last navObj in the array if none are true above it', () => {
            let navArray = [
                {
                    stateId: 'test-state-1',
                    rule: {
                        key: 'test',
                        is: "lte",
                        value: 0
                    }
                }, {
                    stateId: 'test-state-2',
                    rule: {
                        key: 'testA',
                        is: "lte",
                        value: 0
                    }
                }, {
                    stateId: 'test-state-3'
                }];
                
                expect(rules(navArray)).toEqual(navArray[2].stateId);
        });
        
        it('should evaluate the correct navObj in the array if the rule is true', () => {
            let navArray = [
                {
                    stateId: 'test-state-1',
                    rule: {
                        key: 'test',
                        is: "lte",
                        value: 0
                    }
                }, {
                    stateId: 'test-state-2',
                    rule: {
                        key: 'testA',
                        is: "lte",
                        value: 123
                    }
                }, {
                    stateId: 'test-state-3'
                }];
                
                expect(rules(navArray)).toEqual(navArray[1].stateId);
        });
        
        it('should return an empty string if none of them are correct', () =>{
             let navArray = [
                {
                    stateId: 'test-state-1',
                    rule: {
                        key: 'test',
                        is: "lte",
                        value: 0
                    }
                }, {
                    stateId: 'test-state-2',
                    rule: {
                        key: 'testA',
                        is: "lte",
                        value: 0
                    }
                }];
                
                expect(rules(navArray).length).toEqual(0);
        })
    })
})