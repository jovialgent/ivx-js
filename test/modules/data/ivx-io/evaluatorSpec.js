import Evaluator from '../../../../src/modules/data/ivx-io/evaluator.js';

describe('iVXioEvaluator', () => {
    let evaluator;

    beforeEach(() => {
        evaluator = new Evaluator(getExperience());
    });

    describe('#storyEvents', () => {
        it(`should call storyEvents if either the keyword or type is storyEvents`, () => {
            spyOn(evaluator, 'storyEvents');
            evaluator.evaluate({
                conditionOperator: "and",
                conditions: [{
                    key: "storyEvents123123",
                    is: "equals",
                    value: "test",
                    type: "storyEvents"
                }]
            });

            expect(evaluator.storyEvents).toHaveBeenCalledWith(
                "storyEvents123123",
                "equals",
                "test"
            );
        });
        it(`should evaluate true if event has been fired`, () => { 
           var evaluatedRule =  evaluator.evaluate({
                conditionOperator: "and",
                conditions: [{
                    key: "storyEvents123123",
                    is: "fired",
                    value: "test",
                    type: "storyEvents"
                }]
            });

            expect(evaluatedRule).toEqual(true);
        });
    });

    describe('#fired', ()=>{
        it(`should return true if the event is fired in the events argument`, ()=>{
            expect(evaluator.fired("test", ["test"])).toBe(true);
        });
    });

    describe('#notFired', ()=>{
        it(`should return true if the event is not fired in the events argument`, ()=>{
            expect(evaluator.notFired("test", ["test1"])).toBe(true);
        });
    });

    describe('#progress', ()=>{
        it(`should evaluate the rule based on the current progress`, ()=>{
             var evaluatedRule =  evaluator.progress("progress", "gte", "Started");

             expect(evaluatedRule).toEqual(true);
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
        milestone: "Test Milestone",
        events: ["test"],
        data: {
            "test": 123
        },
        story: {
            progressMap: {
                "started": 0,
                "test Milestone" : 3,
                "complete": 998,
                "converted": 999
            }
        }
    };
}