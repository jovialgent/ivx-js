import createFactoryFunction from '../utilities/create-factory-function.js';
import { InputControllerHelper } from '../utilities/input-controller.js';

class CascadingOptionsInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsBus, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);

        let vm = this;
        let { inputData } = $scope;
        let currentTree = Object.assign({}, inputData.dataTree);
        let { name, attributes = {} } = inputData;
        let { required: cascadeRequired = false } = attributes;
        let { data } = iVXjs.experience;
        let { labels, items, isStatic } = currentTree;

        vm.viewSettings = {
            labels: currentTree.labels,
            options: [currentTree.items],
            isStatic
        };

        vm.currentSelection = [];
        vm.currentTree = currentTree;

        
        vm.modelUpdate = (selectedItem) => {
            let { isStatic, options } = vm.viewSettings;
            let mustBeAnswered = cascadeRequired || isStatic;

            if (selectedItem) {
                let hasItems = selectedItem && selectedItem.items && selectedItem.items.length && selectedItem.items.length > 0;

                if (mustBeAnswered && !hasItems) {
                    let finalKeyParts = selectedItem.key.split('~');
                    let editSelections = options.map((option, index) => {
                        let hasSelection = typeof vm.currentSelection[index] !== 'undefined';

                        if (hasSelection) {
                            let hasKey = vm.currentSelection[index].key ? vm.currentSelection[index].key : false;
                            let tooFar = hasKey && hasKey.split("~").length > finalKeyParts.length ? true : false;

                            return tooFar ? {} : vm.currentSelection[index];
                        } else {
                            return {}
                        }
                    });

                    let newOptions = options.map((option, index) => {
                        let hasSelection = typeof vm.currentSelection[index] !== 'undefined';

                        if (hasSelection) {
                            let hasKey = vm.currentSelection[index].key ? vm.currentSelection[index].key : false;
                            let tooFar = hasKey && hasKey.split("~").length > finalKeyParts.length ? true : false;

                            return tooFar ? [] : option;
                        } else {
                            return []
                        }
                    });

                    vm.viewSettings = Object.assign({}, vm.viewSettings, {
                        options: newOptions
                    })
                    vm.currentSelection = editSelections;
                    vm.onChange(selectedItem.key);

                    updateModel();
                    return;
                } else if (!mustBeAnswered) {
                    vm.onChange(selectedItem.key);

                }
            }
            let makeNull = false;

            let editSelections = options.map((option, index) => {
                let hasSelection = typeof vm.currentSelection[index] !== 'undefined' && vm.currentSelection[index].items;

                if (hasSelection && !makeNull) {
                    return vm.currentSelection[index];
                } else {
                    makeNull = true;
                    return;
                }
            });

            vm.currentSelection = editSelections;
            updateModel();
        }

        vm.viewSettings = initializeViewSettings(vm.viewSettings, vm.currentTree, data[name]);

        updateModel();

        function initializeViewSettings(oldViewSettings, currentTree, key) {
            let newViewSettings = Object.assign({}, oldViewSettings);
            let { options, labels } = newViewSettings;
            let newOptions = createStaticOptions(labels, options[0]);

            newViewSettings = Object.assign({}, newViewSettings, {
                options: newOptions
            });

            if (key && key.split) {
                let oldOptions = [].concat(options);
                let sections = key.split('~');
                let fullPath = '';
                let currentItems = [].concat(items);
                let selections = sections.reduce((theseSections, section, index) => {
                    if (index === 0) {
                        fullPath = section;
                    } else {
                        fullPath = `${fullPath}~${section}`
                    }

                    let currentItem = currentItems.find(item => {
                        return item.key === fullPath;
                    });

                    currentItems = [].concat(currentItem.items);

                    return [].concat(theseSections, currentItem);
                }, []);

                vm.currentSelection = selections;

                let editSelections = newViewSettings.options.map((option, index) => {
                    let hasSelection = typeof vm.currentSelection[index] !== 'undefined';

                    if (hasSelection) {
                        return vm.currentSelection[index];
                    } else {
                        return {

                        }
                    }
                });

                vm.currentSelection = editSelections;

                vm.isValid = true;
            }

            return newViewSettings;

            function createStaticOptions(labels, defaultOptions) {
                return labels.map((label, index) => {
                    if (index === 0) {
                        return defaultOptions;
                    }
                    return []
                });
            }
        }

        function updateModel() {
            let oldViewSettings = Object.assign({}, vm.viewSettings);
            let { options, labels, isStatic } = oldViewSettings;
            let selections = [].concat(vm.currentSelection);
            let keepAdding = true;
            let newOptions = selections.reduce((currentOptions, selection, depth) => {
                let editOptions = [].concat(currentOptions);

                keepAdding = selection;

                if (keepAdding) {
                    if (selection && selection.items && selection.items.length > 0) {
                        editOptions = currentOptions
                            .slice(0, 1)
                            .concat(currentOptions.slice(1, depth + 1))
                            .concat([selection.items])
                            .concat(currentOptions.slice(depth + 2));
                    }
                } else {
                    if (depth < labels.length - 1) {
                        editOptions = currentOptions
                            .slice(0, 1)
                            .concat(currentOptions.slice(1, depth + 1))
                            .concat([[]])
                            .concat(currentOptions.slice(depth + 2));
                    }
                }

                return editOptions;
            }, options);

            let newViewSettings = Object.assign({}, vm.viewSettings, {
                options: newOptions
            })

            vm.viewSettings = newViewSettings;
            iVXjsBus.emit('update-view', newViewSettings);
        }

    }
}

CascadingOptionsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions'];

export default createFactoryFunction(CascadingOptionsInputController)