export default class {
    constructor(jsonInputData, storyInputData = {}) {
        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);

    }

    get input() {
        let {jsonInputData, storyInputData} = this;
        let {attributes: storyInputAttributes = {}} = storyInputData;
        let {attributes: jsonInputAttributes = {}} = jsonInputData;
        let {max: storyMaxAttribute = Number.MAX_SAFE_INTEGER, min: storyMinAttribute = Number.MIN_SAFE_INTEGER, step: storyStepAttribute = 1} = storyInputAttributes;
        let {max: jsonMaxAttribute = Number.MIN_SAFE_INTEGER, min: jsonMinAttribute = Number.MAX_SAFE_INTEGER, step: jsonStepAttribute = 1} = jsonInputAttributes;
        let useStoryMin = jsonMinAttribute > storyMinAttribute;
        let useStoryMax = jsonMaxAttribute < storyMaxAttribute;
        let useStoryStep = typeof storyStepAttribute !== 'undefined';

        jsonInputData.type = "number";
        jsonInputData.attributes = Object.assign({},
        jsonInputData.attributes, {
           min : new Number(useStoryMin? storyMinAttribute : jsonMinAttribute).valueOf(), 
           max : new Number(useStoryMax ? storyMaxAttribute : jsonMaxAttribute).valueOf(), 
           step : new Number(useStoryStep ? storyStepAttribute : jsonStepAttribute).valueOf(), 
        });

        return jsonInputData;
    }
}