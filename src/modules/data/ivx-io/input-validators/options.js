export default class{
    constructor(inputData, storyInputData = {}){
        this.inputData = inputData;
        this.TYPE = "options";
        this.OPTIONS = storyInputData.options;
    }

    get input(){
        let {inputData, TYPE, OPTIONS} = this;
        let {type} = inputData;

        if(type === "buttons"){
            return this.setButtonInput(inputData);
        } 

        if(type === "radio"){
            return this.setRadioButtonInput(inputData);
        }
        
        inputData.type = TYPE;
        inputData.options = OPTIONS;

        return inputData;
    }

    setRadioButtonInput(inputData){
        let {radioButtons} = inputData;
        let {OPTIONS} = this;
        let newRadioButtons = radioButtons.reduce((radioButtonArray, radioButtonData, index)=>{
            let {value} = radioButtonData;
            let hasOption = OPTIONS.find((option,index)=>{
                return option.value === value;
            });

            if(hasOption){
                radioButtonArray.push(radioButtonData);
            }

            return radioButtonArray;
        },[]);

        inputData.radioButtons = newRadioButtons;

        return inputData;
    }

    setButtonInput(inputData){
        let {buttons=[]} = inputData;
        let {OPTIONS} = this;
        let newButtons = buttons.reduce((buttonArray, buttonData, index)=>{
            let {value} = buttonData;
            let hasOption = OPTIONS.find((option,index)=>{
                return option.value === value;
            });
            if(hasOption){
                buttonArray.push(buttonData);
            }

            return buttonArray;
        },[]);

        inputData.buttons = newButtons;

        return inputData;
        
    }
}