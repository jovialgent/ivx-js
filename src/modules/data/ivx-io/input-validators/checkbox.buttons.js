export default class {
    constructor(jsonInputData, storyInputData = {}) {
        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    get input() {
        let {jsonInputData, storyInputData} = this;
        let {buttons = []} = jsonInputData;
        let hasFalse = false;
        let hasTrue = false;
        let newButtons = buttons.reduce((buttonArray, buttonData, index) => {
            let {value} = buttonData;
            let isFalse = typeof value === "boolean" && !value;
            let isTrue = typeof value === "boolean" && value;

            if (isTrue && !hasTrue) {
                buttonArray[0] = buttonData;
                hasTrue = true;
            }

            if (isFalse && !hasFalse) {
                buttonArray[1] = buttonData;
                hasFalse = true;
            }

            return buttonArray;
        }, []);

        if (!hasTrue) {
            newButtons[0] = {
                value: true,
                label: "True"
            };
        }

        if (!hasFalse) {
            newButtons[1] = {
                value: false,
                label: "False"
            };
        }

        jsonInputData.buttons = newButtons;

        return jsonInputData;
    }
}
