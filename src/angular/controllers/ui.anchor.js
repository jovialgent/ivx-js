import createFactoryFunction from '../utilities/create-factory-function.js';

class AnchorController {
    constructor($scope, $window, iVXjsActions, iVXjsAudio, iVXjs) {
        this.iVXjsActions = iVXjsActions;
        this.$window = $window;
        this.iVXjsAudio = iVXjsAudio
        this.iVXjs = iVXjs;
    }

    onLinkClick($event = {}) {
        const { currentTarget = {} } = $event;
        const { href: targetHref } = currentTarget;
        let { iVXjs } = this;
        let { onClick: onClickEvents = [], attributes = {}, href: anchorHref } = this.anchorInfo;
        let self = this;
        let hasGoToNextState = onClickEvents.find((clickEvent, index) => {
            return clickEvent.eventName === 'goToNextState';
        });
        let href = anchorHref;

        if (attributes['ui-sref'] && targetHref) href = targetHref;
        else iVXjs.log.warn(`The state defined in the ui-sref, "${attributes['ui-sref']}", is not valid. Defaulting to the href in the anchor definition.`)


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