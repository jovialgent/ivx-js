export default class{
   constructor(jsonInputData, storyInputData = {}){
        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    get input(){
        let {jsonInputData, storyInputData} = this;
        
        jsonInputData.type = "email";

        return jsonInputData;
    }
}