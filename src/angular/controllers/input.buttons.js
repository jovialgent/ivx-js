import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class ButtonsInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let { inputData: input } = $scope;
        let { $parent } = $scope;
        let { inputs, formInput, vm: parentController } = $parent;

        this.onClick = ($event, button) => {
            $event.preventDefault()

            let { onClick = [] } = button;

            onClick.unshift({ eventName: "setData", args: { key: input.name, value: button.value } });

            iVXjs.log.debug(`Button ${input.name} On Click Start`, {}, { input, source: 'onClick', status: 'started', actions: onClick, timestamp: Date.now() });

            iVXjsActions.resolveActions(onClick, () => {
                if ($parent.hideSubmit) {
                    parentController.onSubmit();
                    iVXjs.log.debug(`Button ${input.name} On Click Actions Resolved`, {}, { input, source: 'onClick', status: 'completed', actions: onClick, timestamp: Date.now() });
                }
            });

            $parent.hideSubmit = inputs.length <= 1;

            return false;
        }
    }
}

ButtonsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(ButtonsInputController);