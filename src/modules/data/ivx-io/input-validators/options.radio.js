export default class {
    constructor(jsonInputData = {}, storyInputData = {}) {
        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    get input() {
        let {jsonInputData = {}, storyInputData = {}} = this;
        let {radioButtons = []} = jsonInputData;
        let {options = []} = storyInputData;
        let newRadioButtons = options.map(option => {
            let {display, value} = option;
            let radio = hasRadio(option, radioButtons);

            if (radio) {
                let newRadio = Object.assign({}, radio);

                return newRadio;
            } else {

                return {
                    value,
                    label: display
                }
            }
        });

        let newInputData = Object.assign({},
            jsonInputData, {
                radioButtons: newRadioButtons,
                type: "radio"
            })

        return newInputData;

        function hasRadio(option, radioButtons = []) {
            return radioButtons.find(radioButton => {
                return radioButton.value === option.value;
            })
        }
    }
}