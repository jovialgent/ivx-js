export default class{
    constructor(inputData, storyInputData){
        let {attributes = {}} = storyInputData;
        let {max=Number.MAX_SAFE_INTEGER,min=Number.MIN_SAFE_INTEGER, step = 1} = attributes;

        this.inputData = inputData;
        this.MIN = parseInt(min);
        this.STEP = parseInt(step);
        this.MAX = parseInt(max);
        this.TYPE = "number";
    }

    get input(){
        let {inputData, TYPE, MIN, MAX, STEP} = this;
        let rawInputData = JSON.parse(JSON.stringify(inputData));
        let {attributes = {}} = rawInputData;
        let {min,max,step} = attributes;

        rawInputData.type = TYPE;
        rawInputData.attributes.min = min >= MIN ? min : MIN;
        rawInputData.attributes.max = max <= MAX ? max : MAX;
        rawInputData.attributes.step = step ? step : STEP;
        
        return rawInputData;
    }
}