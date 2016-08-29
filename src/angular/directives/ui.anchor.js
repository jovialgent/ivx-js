import createFactoryFunction from '../utilities/create-factory-function.js';
import AnchorController from '../controllers/ui.anchor.js';

export class Anchor {
	constructor($compile, iVXjs, iVXjsUIModule) {
		this.template = this.templateHTML;
		this.restrict = 'E';
		this.scope = {
			anchorInfo: "=anchorInfo"
		}
		this.controller = AnchorController;
		this.controllerAs = 'vm';
		this.replace = true;
		this.link = function($scope, iElm, iAttrs, controller) {
			let {anchorInfo} = $scope;
			let {attributes = {}} = anchorInfo;

			attributes['ng-click'] = `vm.onLinkClick($event)`;
			anchorInfo.attributes = attributes;
			controller.anchorInfo = anchorInfo;

			let thisAnchor = new iVXjsUIModule.anchor(anchorInfo);
			
			$scope.experience = iVXjs.experience.data;

			iElm.html(thisAnchor.html);
			$compile(iElm.contents())($scope);
		}
	}

	get templateHTML() {
		return "<div></div>";
	}
}

Anchor.$inject = ['$compile', 'iVXjs', 'ivxjs.modules.ui'];

export default createFactoryFunction(Anchor);