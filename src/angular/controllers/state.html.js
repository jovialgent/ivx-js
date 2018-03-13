import createFactoryFunction from '../utilities/create-factory-function.js';

class HtmlStateController {
    constructor($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus, iVXjs) {
        let { id, timeoutInMs, onTimeout = [], next = [] } = $scope.stateData;

        this.id = id;
        this.iVXjsActions = iVXjsActions;
        this.iVXjsBus = iVXjsBus;

        if (typeof timeoutInMs != "undefined" && timeoutInMs > 0) {

            this.timeOutId = $timeout(() => {
                iVXjs.log.debug(`onTimeout Actions`, {}, { state: $scope.stateData, source: 'onTimeout', status: 'completed', actions: onTimeout, timestamp: Date.now() });

                iVXjsActions.resolveThenNavigate(onTimeout, next);
            }, timeoutInMs);
        }
    }

    performEvents(events) {
        let self = this;

        self.iVXjsActions.resolveActions(events, () => {
            events.forEach((event, index) => {
                self.iVXjsBus.emit(event.eventName, event.args)
            })
        })
    }
}

HtmlStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs'];

export default createFactoryFunction(HtmlStateController);