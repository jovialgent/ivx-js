import createFactoryFunction from '../utilities/create-factory-function.js';
import AnchorController from '../controllers/ui.anchor.js';

export class Anchor {
    constructor($compile, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            anchorInfo: "=anchorInfo"
        }
        this.controller = AnchorController;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = function ($scope, iElm, iAttrs, controller) {
            let { anchorInfo } = $scope;
            let { attributes = {} } = anchorInfo;

            attributes['ng-click'] = `vm.onLinkClick($event)`;
            anchorInfo.attributes = attributes;
            controller.anchorInfo = anchorInfo;

            anchorInfo = pullInTemplate.convertLabel(anchorInfo.href, anchorInfo, $scope)

            let thisAnchor = new iVXjsUIModule.anchor(anchorInfo);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);


            iElm.html(thisAnchor.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return "<div class='ivx-link-container'></div>";
    }
}

Anchor.$inject = ['$compile', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', "ivxExperienceScope"];

export default angular
    .module('ivx-js.directives.ui.anchor', [])
    .directive('ivxjsAnchor', createFactoryFunction(Anchor))
    .name;