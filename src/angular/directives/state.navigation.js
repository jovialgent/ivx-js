import createFactoryFunction from '../utilities/create-factory-function.js';
import AudioEventNames from "../../constants/audio.events.js";


class NavigationState {
	constructor($state, $rootScope, $compile, $timeout, iVXjs, iVXjsModules, iVXjsBus, iVXjsAudio, iVXjsActions, pullInTemplate) {
		this.template = this.templateHTML;
		this.restrict = 'E';
		this.scope = {}
		this.controller = ['$scope', ($scope) => { }];
		this.controllerAs = 'vm';
		this.link = function ($scope, iElm, iAttrs, controller) {
			let { data } = $state.current;
			let { links = [], header = {}, footer = {}, audio, onLinksReady } = data;
			let linkSection = links.reduce((html, link, index) => {
				let linkString = angular.toJson(link);
				return `${html}
                    <ivxjs-anchor anchor-info='${linkString}'></ivxjs-anchor>`;
			}, '');
			let audioEventNames = new AudioEventNames();

			data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

			let thisNavigationState = new iVXjsModules.states.navigation(data, linkSection);

			$scope.experience = iVXjs.experience.data;
			$timeout(() => {
				iVXjsActions.resolveActions(onLinksReady, () => {
					if (audio && audio.src) {
						iVXjsBus.emit(audioEventNames.PLAY);
					}

				})
			}, 1)

			iElm.html(thisNavigationState.html);
			$compile(iElm.contents())($scope);			
		}
	}

	get templateHTML() {
		return ``;
	};
}

NavigationState.$inject = ['$state', '$rootScope', '$compile', '$timeout', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus', 'ivxjs.modules.audio', 'ivxjs.actions', 'pullInTemplate'];

export default createFactoryFunction(NavigationState);