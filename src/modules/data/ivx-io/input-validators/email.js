export default class{
    constructor(inputData){
        this.inputData = inputData;
        this.TYPE = "email";
    }

    get input(){
        let {inputData, TYPE} = this;
        let rawInputData = JSON.parse(JSON.stringify(inputData));
        
        rawInputData.type = TYPE;

        return rawInputData;
    }
}