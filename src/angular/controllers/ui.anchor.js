import createFactoryFunction from '../utilities/create-factory-function.js';

class AnchorController {
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

        const { currentTarget = {} } = $event;
        const { href: compiledHref } = currentTarget;

        if (attributes.target !== '_blank') {
            $event.preventDefault();
        }

        let modifiedTarget = angular.copy(currentTarget)

        if (route.length && route.length > 0) {
            iVXjs.log.debug(`Link with route ${route} onLinkClick Started`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });

            modifiedTarget = Object.assign(modifiedTarget, {
                href: $state.href(route)
            });
        } else {
            iVXjs.log.debug(`Link with href ${compiledHref ? compiledHref : href} onLinkClick Start`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'started', actions: onClickEvents, timestamp: Date.now() });
        }

        this.iVXjsActions.resolveActions(onClickEvents, () => {
            if (hasGoToNextState) return;

            if (route.length && route.length > 0) {
                iVXjs.log.debug(`Link with route ${route} onLinkClick Ended`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });

                $state.go(route);

                return;
            }

            iVXjs.log.debug(`Link with href ${compiledHref ? compiledHref : href} onLinkClick Ended`, {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });


            if (attributes.target !== '_blank') {
                self.$window.location = compiledHref ? compiledHref : href;
            }
        }, this.iVXjsActions.createAnchorClickSource(event));

        this.iVXjsAudio.audioElement.play();
        this.iVXjsAudio.audioElement.pause();
    }
}

AnchorController.$inject = ['$scope', '$window', '$state', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

export default createFactoryFunction(AnchorController)