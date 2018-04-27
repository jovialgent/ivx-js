import createFactoryFunction from '../utilities/create-factory-function.js';

class AnchorController {
<<<<<<< HEAD
    constructor($scope, $window, $state, iVXjsActions, iVXjsAudio, iVXjs) {
        this.iVXjsActions = iVXjsActions;
        this.$window = $window;
        this.iVXjsAudio = iVXjsAudio
        this.iVXjs = iVXjs;
        this.$state = $state;
    }

    onLinkClick($event = {}) {
        let { iVXjs, $state } = this;
        let { onClick: onClickEvents = [], href, attributes = {}, route = "" } = this.anchorInfo;
        let self = this;
        let hasGoToNextState = onClickEvents.find((clickEvent, index) => {
            return clickEvent.eventName === 'goToNextState';
        });



        if (attributes.target !== '_blank') {
            $event.preventDefault();
=======
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
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9
        }
        
		iVXjs.log.debug(`Link with href ${href} onLinkClick Start`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'started', actions: onClickEvents, timestamp: Date.now() });

<<<<<<< HEAD
        const { currentTarget = {} } = $event;
        const { href : compiledHref } = currentTarget;

        if (route.length && route.length > 0) {
            iVXjs.log.debug(`Link with route ${route} onLinkClick Started`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });
        } else {
            iVXjs.log.debug(`Link with href ${compiledHref ? compiledHref : href} onLinkClick Start`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'started', actions: onClickEvents, timestamp: Date.now() });
        }


        this.iVXjsActions.resolveActions(onClickEvents, () => {
            if (hasGoToNextState) return;

            if (route.length && route.length > 0) {
                iVXjs.log.debug(`Link with route ${route} onLinkClick Ended`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });
=======
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9

		this.iVXjsActions.resolveActions(onClickEvents, () => {
			if (hasGoToNextState) return;

			iVXjs.log.debug(`Link with href ${href} onLinkClick Ended`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });


<<<<<<< HEAD
            iVXjs.log.debug(`Link with href ${ compiledHref ? compiledHref : href} onLinkClick Ended`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });


            if (attributes.target !== '_blank') {
                self.$window.location = compiledHref ? compiledHref : href;
            }
        });
=======
			if (attributes.target !== '_blank') {
				self.$window.location = href;
			}
		});


>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9

		this.iVXjsAudio.audioElement.play();
		this.iVXjsAudio.audioElement.pause();

	}
}

AnchorController.$inject = ['$scope', '$window', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

export default createFactoryFunction(AnchorController)