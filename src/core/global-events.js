export default class GlobalEvents {
    constructor(iVXjs) {
        Object.assign(this, {
            iVXjs
        })
    }

    runGlobalEvents(actionArray, callback, source) {
        const { globalEvents } = this;
        const globalElementNames = Object.keys(globalEvents);

        globalElementNames.forEach(globalEventName => {
            globalEvents[globalEventName](actionArray, callback, source);
        });
    }

    get globalEvents() {
        const self = this;
        const { iVXjs = {} } = this;

        return {
            elementEvent: (actionArray, callback, source) => {
                self._runGlobalElementEvent(actionArray, callback, source)
            }
        };
    }

    _runGlobalElementEvent(actionArray = [], callback = () => { }, source = {}) {
        const { iVXjs = {} } = this;
        const { constants = {}, log } = iVXjs;
        const { GLOBAL: GlobalConstants = {} } = constants;
        const { type: actionSourceType, actions = [] } = source;

        if (source.element) {
            this.iVXjs.Bus.emit(GlobalConstants.EVENTS.ELEMENT_EVENT, actions.length > 0 ? actions : actionArray, source);

            log.debug(`${GlobalConstants.EVENTS.ELEMENT_EVENT} was fired with the following data`, {
                group: true,
                messages: [{
                    title: "Action Origin",
                    message: source.origin
                }, {
                    title: "Action Type",
                    message: source.type
                }, {
                    title: "Actions Fired",
                    message: actionArray
                }, {
                    title: "Element",
                    message: source.element
                }, {
                    title: "Event Data",
                    message: source.event
                },{
                    title: "Value",
                    message: source.value
                }]

            }, {});
        }
    }
}