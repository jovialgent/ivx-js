import createFactoryFunction from '../utilities/create-factory-function.js';
import controller from '../controllers/embedded-view.custom.js';

class EmbeddedViewCustom {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate) {
        Object.assign(this, {
            template: this.templateHTML,
            restrict: 'E',
            replace: true,
            scope: {
                viewData: '='
            },
            controller,
            controllerAs: 'vm'
        });

        this.link = ($scope, iElm, iAttrs, controller) => {
        }
    }

    get templateHTML() {
        return `
            <div class="ivx-embedded-view ivx-embedded-view-custom {{viewData.classes}}" ui-view="{{viewData.id}}"></div>
       `
    }
}

EmbeddedViewCustom.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate'];

export default angular
    .module('ivx-js.directives.embedded.custom', [])
    .directive('ivxjsEmbeddedViewCustom', createFactoryFunction(EmbeddedViewCustom))
    .name;