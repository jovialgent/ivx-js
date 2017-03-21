import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class CascadingOptionsInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsBus, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let vm = this;
        let { inputData } = $scope;
        let { tree = inputData.dataTree } = vm;
        let { name } = inputData;
        let { data } = iVXjs.experience;


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

        vm.modelUpdated = (selectedItem) => {
            let { tree = {} } = vm;
            let { options = [], keys = [] } = tree;
            let { key: currentKey, items: nextItems } = selectedItem;
            let depth = currentKey.split('~').length - 1;

            vm.finalValue = currentKey;

            if (nextItems && nextItems.length)
                vm.finalValue = nextItems[0].key

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

            vm.onChange(vm.finalValue);
        }

        if (data[name] && data[name].split) {
            let selections = data[name].split('~');
            let firstSelection = selections[0];
            let restOfSelections = selections.slice(1);
            let fullPath = firstSelection;
            let nextItems = [];

            fullPath = '';

            vm.currentSelection = selections.map((selection, index) => {
                fullPath = `${index > 0 ? fullPath + "~" : ''}${selection}`;
                return {
                    key: fullPath
                }
            });


            let currentOptions = vm.currentSelection.reduce((options, currentSelection, depth)=>{
                let depthOptions = options[depth];
                let nextOptions = depthOptions.find(depthOption =>{
                    return depthOption.key === currentSelection.key;
                });

                if(nextOptions && nextOptions.items && nextOptions.items.length && nextOptions.items.length >= 1){
                    options = [].concat(options, [nextOptions.items]);
                }

                return options;

            }, vm.tree.options);

            vm.tree.options = currentOptions;

        }



        iVXjsBus.emit('update-view', tree);



    }
}

CascadingOptionsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions'];

export default createFactoryFunction(CascadingOptionsInputController)