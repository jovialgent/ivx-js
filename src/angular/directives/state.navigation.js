import createFactoryFunction from '../utilities/create-factory-function.js';
import AudioEventNames from "../../constants/audio.events.js";


class NavigationState {
	constructor($state, $rootScope, $compile, $timeout, iVXjs, iVXjsModules, iVXjsBus, iVXjsAudio, iVXjsActions, pullInTemplate) {
		this.template = this.templateHTML;
		this.restrict = 'E';
		this.replace = true;
		this.scope = {};
		this.controller = ['$scope', ($scope) => { }];
		this.controllerAs = 'vm';
		this.link = function ($scope, iElm, iAttrs, controller) {
			let { data } = $state.current;
			let { links = [], header = {}, footer = {}, audio, onLinksReady = [] } = data;
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


			}, 1000)

			iElm.html(thisNavigationState.html);
			$compile(iElm.contents())($scope, (compiled) => {
				iElm.html(compiled);

				let transitionAnimation = onLinksReady.find((event, index) => {
					return event.eventName === "animateElement" && event.args.element === ".navigation-state-container";
				});

				if (!transitionAnimation) {
					onLinksReady.push({
						eventName: "animateElement",
						args: {
							element: ".navigation-state-container",
							animationClasses: "show"
						}
					});
				}

				iVXjs.log.debug(`onLinksReady Started`, {}, { state: data, source: 'onLinksReady', status: 'started', actions: onLinksReady, timestamp: Date.now() });

				iVXjsActions.resolveActions(onLinksReady, () => {
					if (audio && audio.src) {
						iVXjsBus.emit(audioEventNames.PLAY);
					}

					iVXjs.log.debug(`onLinksReady Completed`, {}, { state: data, source: 'onLinksReady', status: 'completed', actions: onLinksReady, timestamp: Date.now() });
				})
			});
		}
	}

	get templateHTML() {
		return `<div  class="navigation-state-container"></div>`;
	};
}

NavigationState.$inject = ['$state', '$rootScope', '$compile', '$timeout', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus', 'ivxjs.modules.audio', 'ivxjs.actions', 'pullInTemplate'];

export default createFactoryFunction(NavigationState);