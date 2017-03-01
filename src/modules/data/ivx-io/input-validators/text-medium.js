export default class {
    constructor(jsonInputData, storyInputData = {}) {
        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);

    }

    get input() {
        let {jsonInputData, storyInputData} = this;
        let maxCharacters = 128;
        let {attributes: storyInputAttributes = {}} = storyInputData;
        let {attributes: jsonInputAttributes = {}} = jsonInputData;  
        let {maxlength: storyMaxLengthAttribute = maxCharacters, minlength: storyMinLengthAttribute} = storyInputAttributes;
        let {maxlength: jsonMaxLengthAttribute = maxCharacters, minlength: jsonMinLengthAttribute = 0} = jsonInputAttributes;
      
        jsonInputData.type = "text";
        jsonInputData.attributes = Object.assign({},
            jsonInputData.attributes, {
                maxlength: new Number(storyMaxLengthAttribute < maxCharacters ? storyMaxLengthAttribute :  jsonMaxLengthAttribute).valueOf(),
                minlength: new Number(typeof storyMinLengthAttribute !== 'undefined' ? storyMinLengthAttribute : jsonMinLengthAttribute).valueOf()
            });

        return jsonInputData;
    }
}