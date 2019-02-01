export default class CustomInputController {
    constructor(iVXjs, iVXjsActions, iVXjsCustomInputInputService) {
        "ngInject";

        Object.assign(this, {
            iVXjsCustomInputInputService,
            iVXjs,
            iVXjsActions
        });

        this._init();
    }

    _init() {
       
    }

    onChange(value, $event) {
        const { inputData = {}, iVXjsActions } = this;
        const { onChange = [], name: key } = inputData;
        const preChangeActions = [{
            eventName: "setData",
            args: {
                key,
                value
            }
        }]

        iVXjsActions.resolveActions(preChangeActions, () => {
            iVXjsActions.resolveActions(onChange, () => {

            }, iVXjsActions.createInputSource($event, value));
        });
    }
}