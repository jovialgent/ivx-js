export default class{
    constructor(jsonInputData, storyInputData = {}){
        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    get input(){
        let {storyInputData = {}, jsonInputData ={}} = this;
        let rawInputData = Object.assign({}, jsonInputData);
        let newStoryInputData = Object.assign({}, storyInputData);
        
        rawInputData.type = "cascading-options";
        rawInputData.dataTree = newStoryInputData.dataTree;
        
        return rawInputData;
    }
}