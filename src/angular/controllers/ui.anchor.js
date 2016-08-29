import createFactoryFunction from '../utilities/create-factory-function.js';

class AnchorController {
	constructor($scope, $window, iVXjsActions, iVXjsAudio) {
		this.iVXjsActions = iVXjsActions;
		this.$window = $window;
		this.iVXjsAudio = iVXjsAudio
	}

	onLinkClick($event) {
		let {onClick: onClickEvents = [], href, attributes = {}} = this.anchorInfo;
		let self = this;
		let hasGoToNextState = onClickEvents.find((clickEvent, index) => {
			return clickEvent.eventName === 'goToNextState';
		});

		if (attributes.target !== '_blank') {
			$event.preventDefault();
		}

		this.iVXjsActions.resolveActions(onClickEvents, () => {
			if (hasGoToNextState) return;

			if (attributes.target !== '_blank') {
				self.$window.location = href;
			}
		});

		this.iVXjsAudio.audioElement.play();
	}
}

AnchorController.$inject = ['$scope', '$window', 'ivxjs.actions', 'ivxjs.modules.audio'];

export default createFactoryFunction(AnchorController)