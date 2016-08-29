import createFactoryFunction from '../utilities/create-factory-function.js';

class HtmlStateController{    
    constructor($state, $scope, $rootScope, iVXjsActions, iVXjsBus) {
        let {id, timeoutInMs, onTimeout = [], next = []} = $state.current.data;
        
        this.id = id;
        this.iVXjsActions = iVXjsActions;
        this.iVXjsBus = iVXjsBus;
        
        if (typeof timeoutInMs != "undefined" && timeoutInMs > 0) {
            setTimeout(function() {
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

HtmlStateController.$inject = ['$state', '$scope', '$rootScope', 'ivxjs.actions', 'ivxjs.bus'];

export default createFactoryFunction(HtmlStateController);