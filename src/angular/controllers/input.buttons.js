import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class ButtonsInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let {inputData: input} = $scope;
        let {$parent} = $scope;
        let {inputs, formInput, vm: parentController} = $parent;

        this.onClick = ($event, button) => {
            $event.preventDefault()

            let { onClick = []} = button;

            onClick.unshift({ eventName: "setData", args: { key: input.name, value: button.value } });

            iVXjsActions.resolveActions(onClick, () => {
                if ($parent.hideSubmit) {
                    parentController.onSubmit();
                }
            });

            $parent.hideSubmit = inputs.length <= 1;

            return false;
        }
    }
}

ButtonsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(ButtonsInputController);