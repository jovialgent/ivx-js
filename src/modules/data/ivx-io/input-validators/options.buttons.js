export default class {
    constructor(jsonInputData = {}, storyInputData = {}) {
        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    get input() {
        let {jsonInputData = {}, storyInputData = {}} = this;
        let {buttons = []} = jsonInputData;
        let {options = []} = storyInputData;
        let newButtons = options.map(option => {
            let button = hasButton(option, buttons);

            if (button) {
                return button
            } else {
                let {display, value} = option;

                return {
                    value,
                    label: display
                }
            }
        });

        let newInputData = Object.assign({}, 
            jsonInputData, {
            buttons: newButtons,
            type : "buttons"
        });

        return newInputData;

        function hasButton(option, buttons = []) {
            return buttons.find(button => {
                return button.value === option.value;
            })
        }

    }
}