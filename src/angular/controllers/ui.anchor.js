import createFactoryFunction from '../utilities/create-factory-function.js';

class AnchorController {
	constructor($scope, $window, iVXjsActions, iVXjsAudio, iVXjs) {
		this.iVXjsActions = iVXjsActions;
		this.$window = $window;
		this.iVXjsAudio = iVXjsAudio
		this.iVXjs = iVXjs;
	}

	onLinkClick($event) {
		let {iVXjs} = this;
		let { onClick: onClickEvents = [], href, attributes = {} } = this.anchorInfo;
		let self = this;
		let hasGoToNextState = onClickEvents.find((clickEvent, index) => {
			return clickEvent.eventName === 'goToNextState';
		});

		if (attributes.target !== '_blank') {
			$event.preventDefault();
        }
        
		iVXjs.log.debug(`Link with href ${href} onLinkClick Start`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'started', actions: onClickEvents, timestamp: Date.now() });


		this.iVXjsActions.resolveActions(onClickEvents, () => {
			if (hasGoToNextState) return;

			iVXjs.log.debug(`Link with href ${href} onLinkClick Ended`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });


			if (attributes.target !== '_blank') {
				self.$window.location = href;
			}
		});



		this.iVXjsAudio.audioElement.play();
		this.iVXjsAudio.audioElement.pause();

	}
}

AnchorController.$inject = ['$scope', '$window', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

export default createFactoryFunction(AnchorController)