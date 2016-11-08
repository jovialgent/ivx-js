export default class{
    constructor(inputData, storyInputData = {}){
        let {attributes = {}} = storyInputData;
        let {minlength = 0, maxlength = 1024} = attributes; 

        this.inputData = inputData;
        this.MAX_LENGTH = parseInt(maxlength);
        this.MIN_LENGTH = parseInt(minlength);
        this.TYPE = "textarea";
    }

    get input(){
        let {inputData, MAX_LENGTH, MIN_LENGTH, TYPE} = this;
        let rawInputData = JSON.parse(JSON.stringify(inputData));
        
        rawInputData.attributes.maxlength = MAX_LENGTH;
        rawInputData.attributes.minlength = MIN_LENGTH;
        rawInputData.type = TYPE;
        
        return rawInputData;
    }
}