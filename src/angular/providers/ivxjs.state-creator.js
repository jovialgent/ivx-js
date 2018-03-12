import createFactoryFunction from '../utilities/create-factory-function.js';

class stateGenerator {
    constructor() {

    }

    $get() {
        const self = this;
        return {
            addViews: (embeddedViews, parentTemplate) => {
                embeddedViews.forEach((embeddedView, index) => {
                    const { appendTo, id, type } = embeddedView;
                    const domNode = document.querySelector(appendTo);

                    if (!domNode) {
                        self.iVXjs.log.warn(`Can't find element with selector, "${appendTo}" to embedded this view. Check to make sure you have this element defined in either your header, footer or is an element in the existing state.`);
                        return;
                    }

                    const uiContainer = angular.element(domNode);
                    const view = angular.element(`<ivxjs-embedded-view-${type} id="${id}" view-data="stateData.embeddedViews[${index}]"></ivxjs-embedded-view-${type}>`);

                    uiContainer.append(view);
                });
            }
        }
    }

    create($stateProvider, iVXjs) {
        const { states = [] } = iVXjs.config;

        Object.assign(this, {
            iVXjs,
            $stateProvider,
            states
        })

        this._createParentStates();
    }

    buildDefaultUrl(iVXjs, defaultStateId) {
        const defaultStateIdParts = defaultStateId.split('.');
        const defaultUrl = defaultStateIdParts.reduce((url, stateIdPart, index) => {
            const state = iVXjs.config.states.find(state => state.id === stateIdPart);

            if (!state) return url;
            if (index === 0) return state.url;

            return `${url}${state.url}`;
        }, ``);

        return defaultUrl;
    }


    setDefaultUrl($urlRouterProvider, defaultState, iVXjs) {
        let defaultStateID = iVXjs.rules(defaultState);
        let { url } = iVXjs.config.states.find((state) => { return state.id === defaultStateID });

        $urlRouterProvider
            .otherwise(url);
    }

    _generateStateData(state) {
        const self = this;
        const { embeddedViews = [] } = state;
        const embeddedStateData = embeddedViews.reduce((embeddedData, currentEmbeddedData, index) => {
            const stateSpec = self._createiVXjsStateSpec(currentEmbeddedData);

            embeddedData[stateSpec.id] = stateSpec;

            return embeddedData;

        }, {});

        return {
            stateData: state,
            embeddedStateData
        }

    }

    _generateStateData(state) {
        const self = this;
        const { embeddedViews = [] } = state;
        const embeddedStateData = embeddedViews.reduce((embeddedData, currentEmbeddedData, index) => {
            const stateSpec = self._createiVXjsStateSpec(currentEmbeddedData);

            embeddedData[stateSpec.id] = stateSpec;

            return embeddedData;

        }, {});

        return {
            stateData: state,
            embeddedStateData
        }

    }

    _createEmbeddedState(embeddedView, parentData) {
        const self = this;
        const { states = [] } = this.iVXjs.config;
        const { states: embeddedViews = [] } = embeddedView;

        embeddedViews.forEach(embeddedState => {
            const embeddedStateData = states.find(state => state.id === embeddedState.stateId);

            this._createRouterSpec(embeddedView, parentData, embeddedStateData, embeddedState);
        })
    }

    _createParentStates() {
        const self = this;
        const { iVXjs, $stateProvider, states } = this;
        const { EVENTS: videoEventNames } = iVXjs.constants.VIDEO;


        states.forEach((state, index) => {
            let { type, id, url, onEnter = [], onExit = [], embeddedViews = [] } = state;

            embeddedViews.forEach(embeddedView => {
                self._createEmbeddedState(embeddedView, state);
            })

            $stateProvider.state(id, {
                url: url,
                data: state,
                template: `<ivxjs-${type}-state state-data="stateData" class="hide"></ivxjs-${type}-state>`,
                controller: ['$scope', ($scope) => {
                    $scope.stateData = state;
                }],
                onEnter: ['$rootScope', '$state', 'iVXjs', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.audio.experience', 'ivxjs.modules.audio',
                    ($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudioExperience, iVXjsAudio) => {
                        if (!iVXjsAudioExperience.eventsAdded) {
                            iVXjsAudioExperience.addEventListeners(iVXjsBus);
                            iVXjsAudio.addEventListeners(iVXjsBus);
                            iVXjs.experience.Bus = iVXjsBus;
                            iVXjsAudioExperience.eventsAdded = true;
                            iVXjsAudio.eventsAdded = true;
                            iVXjs.experience.audio = iVXjsAudioExperience;
                            iVXjs.experience.actions = iVXjsActions;
                        }

                        iVXjs.log.debug('On Enter Actions Start', {}, { source: 'onEnter', status: 'started', actions: onEnter, timestamp: Date.now() });


                        $rootScope.stateID = id;

                        iVXjsActions.resolveActions(onEnter, () => {
                            iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp: Date.now() });
                        });
                    }],
                onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) => {
                    iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                    iVXjsActions.resolveActions(onExit, () => {
                        iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
                    });
                }]
            });
        });
    }

    _createRouterSpec(embeddedView, parentData, embeddedStateData, embeddedStateOverrides) {
        const { $stateProvider } = this;
        const { id: parentId } = parentData;
        const { EVENTS: videoEventNames = {} } = this.iVXjs.constants.VIDEO;
        const { id: viewName, type: viewType } = embeddedView;
        const { id: embeddedStateId, onEnter = [], onExit = [], type: embeddedStateType, url: embeddedStateUrl } = embeddedStateData;
        const { next = [] } = embeddedStateOverrides;

        let views = {};

        views[`${viewName}@${parentId}`] = {
            template: `<ivxjs-${embeddedStateType}-state state-data="embeddedStateData" class="hide"></ivxjs-${embeddedStateType}-state>`,
            controller: ['$scope', ($scope) => {
                const modifiedState = Object.assign(embeddedStateData, {
                    next
                });

                $scope.embeddedStateData = modifiedState;
            }]
        }

        $stateProvider.state(`${parentId}.${embeddedStateId}`, {
            url: embeddedStateUrl,
            data: embeddedStateData,
            views,
            onEnter: ['$rootScope', '$state', 'iVXjs', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.audio.experience', 'ivxjs.modules.audio',
                ($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudioExperience, iVXjsAudio) => {
                    iVXjsActions.resolveActions(onEnter, () => {
                        iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp: Date.now() });
                    });
                }],
            onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) => {
                iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                iVXjsActions.resolveActions(onExit, () => {
                    iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
                });
            }]
        })
    }
}

stateGenerator.$inject = [];

export default angular.module('ivx-js.providers.set-up', [])
    .provider('iVXjsStateCreator', createFactoryFunction(stateGenerator))
    .name;