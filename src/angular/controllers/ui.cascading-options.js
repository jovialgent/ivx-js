import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class CascadingOptionsInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsBus, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let vm = this;
        let {inputData} = $scope;
        let {tree = inputData.dataTree} = vm;
        
        tree.options = [];

        if (tree.isStatic)
            tree.labels.forEach((v, i) => {
                tree.options[i] = [];
            })

        tree.options[0] = tree.items;

        vm.currentSelection = [{
            key: ""
        }]
        vm.tree = tree;

        iVXjsBus.emit('update-view', tree);

        vm.modelUpdated = (selectedItem) => {
            let {tree = {}} = vm;
            let {options = [], keys = []} = tree;
            let {key: currentKey, items: nextItems} = selectedItem;
            let depth = currentKey.split('~').length - 1;

            vm.finalValue = currentKey;
            vm.currentSelection[depth] = selectedItem;

            if (depth < tree.labels.length - 1 && nextItems) {

                vm.currentSelection[depth + 1] = {
                    key: nextItems[0].key
                }
                // sets next options
                tree.options[depth + 1] = nextItems;
            }

            //attaches tree to view-model
            vm.tree = tree;

            if (depth < tree.labels.length - 1) {
                iVXjsBus.emit('update-view', tree);
            }
            else{
                vm.onChange(vm.finalValue);
            }
                
        }
    }
}

CascadingOptionsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions'];

export default createFactoryFunction(CascadingOptionsInputController)