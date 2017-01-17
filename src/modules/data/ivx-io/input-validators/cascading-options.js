export default class{
    constructor(inputData, storyInputData = {}){
        this.inputData = inputData;
        this.TYPE = "cascading-options";
        this.DATATREE = storyInputData.dataTree;
    }

    get input(){
        let {inputData, TYPE, DATATREE} = this;
        let rawInputData = JSON.parse(JSON.stringify(inputData));
        
        rawInputData.type = TYPE;
        rawInputData.dataTree = DATATREE;
        
        return rawInputData;
    }
}