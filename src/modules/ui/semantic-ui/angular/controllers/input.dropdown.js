import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import { InputControllerHelper } from '../../../../../angular/utilities/input-controller.js';

class DropdownInputController extends InputControllerHelper {
    constructor($scope, $element, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);
        
        let {defaultValue, options, name, settings = {}} = $scope.inputData;
        let {dropdown = {}} = settings;
        let {multiple = false} = dropdown;
        let self = this;

        this.selected = !multiple ? {
            value : iVXjs.experience.data[name] ? iVXjs.experience.data[name] : ''
        } : [{
            value: iVXjs.experience.data[name] ? iVXjs.experience.data[name] : ''
        }];
        this.onChange = (value) => { 
            let {name, onChange = []} = $scope.inputData;

            if (Array.isArray(value)) {
                value = selected.reduce((selectedVals, currentVal)=>{
                    if(selectedVals.length <= 0) return `${currentVal.value}`;
                    return `${selectedVals}, ${currentVal.value}`
                }, '');
            } 
            
            onChange.unshift({ eventName: 'setData', args: { key: name, value: value.value } });
            iVXjsActions.resolveActions(onChange, () => {});
        }
    }
}

DropdownInputController.$inject = ['$scope', '$element', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(DropdownInputController);