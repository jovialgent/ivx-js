import createFactoryFunction from '../utilities/create-factory-function.js';

class iVXjsSetup {
    constructor() {

    }

    $get() {

    }

    setDefaultUrl($urlRouterProvider, defaultState, iVXjs) {
        let defaultStateID = iVXjs.rules(defaultState);
        let { url } = iVXjs.config.states.find((state) => { return state.id === defaultStateID });

        $urlRouterProvider
            .otherwise(url);
    }

    createStates($stateProvider, states) {
        states.forEach((state, index) => {
            let { type, id, url, onEnter = [], onExit = [] } = state;

            $stateProvider.state(id, {
                url: url,
                data: state,
                template: `<ivxjs-${type}-state></ivxjs-${type}-state>`,
                onEnter: ['$rootScope', 'ivxjs.actions', 'ivxjs.bus', ($rootScope, iVXjsActions, iVXjsBus) => {
                    iVXjsActions.resolveActions(onEnter, () => { });
                }],
                onExit: ['$rootScope', 'ivxjs.actions', 'ivxjs.bus', ($rootScope, iVXjsActions, iVXjsBus) => {
                    iVXjsBus.emit('iVX:video:dispose');
                    iVXjsActions.resolveActions(onExit, () => { });
                }]
            });
        });
    }
}

iVXjsSetup.$inject = [];

export default angular.module('ivx-js.providers.set-up', [])
    .provider('iVXjsSetup', createFactoryFunction(iVXjsSetup))
    .name;