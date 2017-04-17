import { TypeValidator } from '../../utilities/type-parsers.js';
let myTypeValidator = new TypeValidator;

export class InputControllerHelper {
    constructor($scope, iVXjs, iVXjsActions) {
        let { inputData: input } = $scope;
        let currentExperienceValue = iVXjs.experience.data[input.name];

        if (input.type === 'checkbox') {
            $scope.inputValue = currentExperienceValue;
        } else if (currentExperienceValue) {
            $scope.inputValue = currentExperienceValue;
        }

        $scope.$on('changed', function (input, value) {
            $scope.$apply();
        });

        this.onChange = (value) => {
            if (input.type === 'checkbox') {
                value = value ? 'true' : 'false';
            }

            if (!myTypeValidator.isEmpty(value) || value instanceof Date) {

                if (value === 'true' || value === 'false') {
                    value = value === 'true';
                }

                let { name, onChange = [] } = input;

                onChange.unshift({
                    eventName: 'setData',
                    args: {
                        key: name,
                        value: value
                    }
                });

                iVXjs.log.debug(`Input ${input.name} On Change Started`, {}, { input, source: 'onChange', status: 'started', actions: onChange, timestamp: Date.now() });

                iVXjsActions.resolveActions(onChange, () => {
                    iVXjs.log.debug(`Input ${input.name} On Change Ended`, {}, { input, source: 'onChange', status: 'completed', actions: onChange, timestamp: Date.now() });
                });
            }
        }
    }
}