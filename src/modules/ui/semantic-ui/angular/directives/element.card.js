import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import CardElementController from '../controllers/element.card.js';
import {CardTemplates} from '../../card.js';

class Card {
    constructor($compile, $timeout) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.scope = {
            settings: '=settings'
        }
        this.controller = CardElementController;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { settings = {} } = $scope; 
            let {cardType,classes = ""} = settings;
            let html = new CardTemplates($scope.settings)[cardType + "CardHTML"];
            
            $scope.classes = classes;

            iElm.html(html);
            $compile(iElm.contents())($scope);
            $timeout(() => {
                $('.special.cards .image').dimmer({
                    on: 'hover'
                });
            }, 0)
        }
    }

    get templateHTML() {
        return `<div class="{{classes}}"></div>`;
    };
}

Card.$inject = ['$compile', '$timeout'];

export default createFactoryFunction(Card);