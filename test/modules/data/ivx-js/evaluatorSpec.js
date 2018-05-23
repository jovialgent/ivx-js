import Evaluator from '../../../../src/modules/data/ivx-js/evaluator.js';

describe('Evaluator', () => {
    let evaluator;

    beforeEach(() => {
        evaluator = new Evaluator(getExperience());

    });

    describe('#evaluate', () => {
        it('should make the condition operator "and" if no condition operator is present.', () => {
            spyOn(evaluator, 'and');

            evaluator.evaluate({
                conditions: [{
                    "key": "test",
                    "is": "gte",
                    value: 123
                }]
            });

            expect(evaluator.and).toHaveBeenCalled();
        });

        it('should evaluate true of all conditions are true with condition operator "and"', ()=>{
            let evaluatedRule = evaluator.evaluate({
                conditionOperator : "and",
                conditions: [{
                    key : "test",
                    is: "gte",
                    value: 123
                },{
                    key : "test2",
                    is: "gte",
                    value: 123
                },{
                    key : "test3",
                    is: "gte",
                    value: 123
                }]
            });


            expect(evaluatedRule).toEqual(true);
        });

        it('should evaluate true of at least one condition are true with condition operator "or"', ()=>{
            let evaluatedRule = evaluator.evaluate({
                conditionOperator : "or",
                conditions: [{
                    key : "test",
                    is: "gte",
                    value: 123
                },{
                    key : "test2",
                    is: "gte",
                    value: 1234
                },{
                    key : "test3",
                    is: "gte",
                    value: 1234
                }]
            });


            expect(evaluatedRule).toEqual(true);
        });

        it('should evaluate true if none of the condition are true with condition operator "not"', ()=>{
            let evaluatedRule = evaluator.evaluate({
                conditionOperator : "not",
                conditions: [{
                    key : "test",
                    is: "gte",
                    value: 1234
                },{
                    key : "test2",
                    is: "gte",
                    value: 1234
                },{
                    key : "test3",
                    is: "gte",
                    value: 1234
                }]
            });


            expect(evaluatedRule).toEqual(true);
        });

        it('should call the custom evaluator with the rule if it exists', () => {
            let customEvaluatorFn = {
                custom: (rule) => {
                    return true;
                }
            };
            spyOn(customEvaluatorFn, 'custom');
            let customEvaluator = new Evaluator(getExperience(), customEvaluatorFn.custom);

            customEvaluator.evaluate({
                conditions: [{
                    "key": "test",
                    "is": "gte",
                    value: 123
                }]
            });

            expect(customEvaluatorFn.custom).toHaveBeenCalledWith({
                    "key": "test",
                    "is": "gte",
                    value: 123
            });


        });

        it('should call the evaluator function defined in the class is if key is a valid evaluator function', ()=>{
            evaluator.test = ()=>{

            };
            spyOn(evaluator, 'test');

            evaluator.evaluate({
                conditions: [{
                    "key": "test",
                    "is": "gte",
                    value: 123
                }]
            });

            expect(evaluator.test).toHaveBeenCalled();
        });

        it('should call the evaluator function defined in the class is if type is a function.', ()=>{
            evaluator.test = ()=>{

            };
            spyOn(evaluator, 'test');

            evaluator.evaluate({
                conditions: [{
                    "key": "test123",
                    "is": "gte",
                    value: 123,
                    type : "test"
                }]
            });

            expect(evaluator.test).toHaveBeenCalled();
        });

        it('should return a true value if rule is true.', ()=>{
           var evaluatedValue = evaluator.evaluate({
                conditions: [{
                    "key": "test",
                    "is": "gte",
                    value: 123
                }]
            });

            expect(evaluatedValue).toEqual(true);
        });

        
    });

    describe('#input', ()=>{
         it('should evaluate the correctly from data from the experience', ()=>{
             expect(evaluator.input('test', 'gte', 123)).toEqual(true);
         })
    });

    describe('#and', ()=>{
         it('should return true if all values are true', ()=>{
             expect(evaluator.and([true,true,true])).toEqual(true);
         });
         it('should return false if at least one value is false', ()=>{
             expect(evaluator.and([true,true,false])).toEqual(false);
         })
    });

    describe('#or', ()=>{
         it('should return true if at least one value is true', ()=>{
             expect(evaluator.or([false,true,false])).toEqual(true);
         });
         it('should return false if at none are true', ()=>{
             expect(evaluator.or([false,false,false])).toEqual(false);
         })
    });

    describe('#not', ()=>{
         it('should return true if at least no value is true', ()=>{
             expect(evaluator.not([false,false,false])).toEqual(true);
         });
         it('should return false if at least one are true', ()=>{
             expect(evaluator.not([true,false,false])).toEqual(false);
         })
    });

    describe('#lte', ()=>{
        it('should evaluate true if the first argument is less than or equal to second argument',()=>{
            expect(evaluator.lte(10,10)).toEqual(true);
        });
    });

    describe('#lt', ()=>{
        it('should evaluate true if the first argument is less than to second argument',()=>{
            expect(evaluator.lt(10,12)).toEqual(true);
            expect(evaluator.lt(10,10)).toEqual(false);
        });
    });

    describe('#gte', ()=>{
        it('should evaluate true if the first argument is greater than or equal to second argument',()=>{
            expect(evaluator.gte(10,10)).toEqual(true);
        });
    });
    
    describe('#gt', ()=>{
        it('should evaluate true if the first argument is great than to second argument',()=>{
            expect(evaluator.gt(12,10)).toEqual(true);
            expect(evaluator.gt(10,10)).toEqual(false);
        });
    });

    describe('#equals', ()=>{
        it('should evaluate true both are the same',()=>{
            expect(evaluator.equals(true,true)).toEqual(true);
            expect(evaluator.equals(true,false)).toEqual(false);
            expect(evaluator.equals("test","test")).toEqual(true);
            expect(evaluator.equals("test","test1")).toEqual(false); 
            expect(evaluator.equals(1,1)).toEqual(true);
            expect(evaluator.equals(1,2)).toEqual(false); 
        });
    });
    describe('#notEquals', ()=>{
        it('should evaluate true both are the different',()=>{
            expect(evaluator.notEquals(true,true)).toEqual(false);
            expect(evaluator.notEquals(true,false)).toEqual(true);
            expect(evaluator.notEquals("test","test")).toEqual(false);
            expect(evaluator.notEquals("test","test1")).toEqual(true); 
            expect(evaluator.notEquals(1,1)).toEqual(false);
            expect(evaluator.notEquals(1,2)).toEqual(true); 
        });
    });
    describe('#in', ()=>{
        it('should evaluate true if an element is in an array.', ()=>{
             expect(evaluator.in([1,2,3], 3)).toEqual(true);
             expect(evaluator.in([1,2,3], 4)).toEqual(false);
        })
       
    })
});

function getRule(conditionOperator = "and") {
    return {
        conditionOperator: conditionOperator,
        conditions: []
    }
}

function getExperience() {
    return {
        data: {
            test : 123,
            test2 : 123,
            test3 : 123
        }
    }
}