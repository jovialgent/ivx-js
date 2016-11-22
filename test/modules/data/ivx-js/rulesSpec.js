import {Rules} from '../../../../src/modules/data/ivx-js/rules.js';

describe('Rules', () => {

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