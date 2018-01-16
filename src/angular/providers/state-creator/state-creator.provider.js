
class StateCreator {
    constructor() {
        Object.assign(this, {

        })
    }

    $get() {

    }

    create($stateProvider, iVXjs) {
        const self = this;
        const { states = [] } = iVXjs.config;

        Object.assign(this, {
            iVXjs,
            $stateProvider,
            states
        })

        self._createParentStates();
    }

    _generateStateData(state) {
        const self = this;
        const { embeddedStates = [] } = state;
        const embeddedStateData = embeddedStates.reduce((embeddedData, currentEmbeddedData, index) => {
            const stateSpec = self._createiVXjsStateSpec(currentEmbeddedData);

            embeddedData[stateSpec.id] = stateSpec;

            return embeddedData;

        }, {});

        return {
            stateData: state,
            embeddedStateData
        }

    }

    _createParentStates() {
        const self = this;
        const { iVXjs, $stateProvider, states } = this;
        const { EVENTS: videoEventNames } = iVXjs.constants.VIDEO;

        states.forEach((state, index) => {
            let { type, id, url, onEnter = [], onExit = [], embeddedStates = [] } = state;

            embeddedStates.forEach(embeddedState => {
                self._createEmbeddedState(embeddedState, state);
            })

            $stateProvider.state(id, {
                url: url,
                data: state,
                controller: ['$scope', ($scope) => {
                    const { stateData, embeddedStateData } = self._generateStateData(state);

                    $scope.stateData = stateData;
                    $scope.embeddedStateData = embeddedStateData;
                }],

                template: `<ivxjs-${type}-state state-data="stateData" class="hide"></ivxjs-${type}-state>`,
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
                    if ($state.current.data.player) {
                        //  iVXjsBus.emit(videoEventNames.DISPOSE, $state.current.data.player);
                    }
                    iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                    iVXjsActions.resolveActions(onExit, () => {
                        iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
                    });
                }]
            });
        });
    }

    _createEmbeddedState(state, parentData) {
        const stateSpec = this._createiVXjsStateSpec(state);

        this._createRouterSpec(stateSpec, parentData, state.viewName);
    }

    addViews(embeddedStates) {
        if (!embeddedStates) return;

        const self = this;

        embeddedStates.forEach(embeddedState => {
            self._addUIViewToView(embeddedState);
        });
    }

    _addUIViewToView(embeddedState) {
        const { element: selector = "" } = embeddedState;
        const uiViewComponent = document.querySelector(selector);

        if (uiViewComponent) {
            uiViewComponent.setAttribute('ui-view', embeddedState.stateId);
        }
    }


    _createiVXjsStateSpec(state) {
        const { config } = this.iVXjs;

        return config.states.find(configState => {
            return configState.id === state.stateId;
        })
    }

    _createRouterSpec(state, parentData, viewName) {
        const { $stateProvider } = this;
        const { id: parentId } = parentData;
        const { EVENTS: videoEventNames = {} } = this.iVXjs.constants.VIDEO;
        const { type, id, url, onEnter = [], onExit = [] } = state;

        let views = {};

        views[`${viewName}@${parentId}`] = {
            template: `<ivxjs-${type}-state state-data="embeddedStateData" class="hide"></ivxjs-${type}-state>`,
            controller : ['$scope', ($scope)=>{
                $scope.embeddedStateData = state;
            }]
        }

        // console.dir(views);

        $stateProvider.state(`${parentId}.${id}`, {
            url: url,
            data: state,
            views,
            onEnter: ['$rootScope', '$state', 'iVXjs', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.audio.experience', 'ivxjs.modules.audio',
                ($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudioExperience, iVXjsAudio) => {
                    iVXjsActions.resolveActions(onEnter, () => {
                        iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp: Date.now() });
                    });
                }],
            controller: ["$scope", ($scope) => {
                $scope.test = "TEST"
            }],
            onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) => {
                if ($state.current.data.player) {
                    // iVXjsBus.emit(videoEventNames.DISPOSE, $state.current.data.player);
                }

                iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                iVXjsActions.resolveActions(onExit, () => {
                    iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
                });
            }]
        })
    }
}

export default function () {
    const stateCreator = new StateCreator();

    this.$get = [() => {
        return {
            addViews: (embeddedState, parentTemplate) => {
                stateCreator.addViews(embeddedState, parentTemplate);
            }
        }
    }];

    this.create = ($stateProvider, iVXjs) => {
        stateCreator.create($stateProvider, iVXjs);
    }
}
