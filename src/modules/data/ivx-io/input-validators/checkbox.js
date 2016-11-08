export default class{
    constructor(inputData){
        this.inputData = inputData;
        this.TYPE = "checkbox";
    }

    get input(){
        let {inputData, TYPE} = this;
        let rawInputData = JSON.parse(JSON.stringify(inputData));
        let {type} = rawInputData;

         if(type === "buttons"){
            return this.setButtonInput(inputData);
        } 
        
        rawInputData.type = TYPE;

        return rawInputData;
    }

    setButtonInput(inputData){
        let {buttons = []} = inputData;
        let hasFalse = false;
        let hasTrue = false;
        let newButtons = buttons.reduce((buttonArray, buttonData, index)=>{
            let {value} = buttonData;
            let isFalse = typeof value === "boolean" && !value;
            let isTrue = typeof value === "boolean" && value;
            
            if(isTrue && !hasTrue){
                buttonArray[0] = buttonData;
                hasTrue = true;
            }
            
            if(isFalse && !hasFalse){
                buttonArray[1] = buttonData;
                hasFalse = true;
            }

            return buttonArray;
        },[]);

        if(!hasTrue){
             newButtons[0] = {
                value : true,
                label:  "True"
            };
        }
        
        if(!hasFalse){
            newButtons[1] ={
                value : false,
                label:  "False"
            };
        }

        inputData.buttons = newButtons;

        return inputData;
    }
}