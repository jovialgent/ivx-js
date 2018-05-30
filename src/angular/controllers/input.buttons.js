import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class ButtonsInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let { inputData: input } = $scope;
        let { $parent } = $scope;
        let { inputs, formInput, vm: parentController } = $parent;

        this.buttons = input.buttons;

        this.onClick = ($event, button) => {
            $event.preventDefault()

            let { onClick = [] } = button;

            const {currentTarget : element} = $event;

            let actionArray = onClick.concat(...onClick, [
                {
                    eventName: "setData",
                    args: {
                        key: input.name,
                        value: button.value
                    }
                }
            ]);

            iVXjs.log.debug(`Button ${input.name} On Click Start`, {}, { input, source: 'onClick', status: 'started', actions: onClick, timestamp: Date.now() });

            iVXjsActions.resolveActions(actionArray, () => {
                if ($parent.hideSubmit) {
                    parentController.onSubmit($event);
                    iVXjs.log.debug(`Button ${input.name} On Click Actions Resolved`, {}, { input, source: 'onClick', status: 'completed', actions: actionArray, timestamp: Date.now() });
                }
            }, {
                    type: "click",
                    element,
                    event: $event,
                    origin: "onClick"
                });

            $parent.hideSubmit = inputs.length <= 1;

            return false;
        }
    }
}

ButtonsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(ButtonsInputController);