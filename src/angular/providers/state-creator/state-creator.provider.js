import uniqBy from "lodash/uniqBy";


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

        self.iVXjs = iVXjs;

        Object.assign(this, {
            iVXjs,
            $stateProvider,
            states
        })

        self._createParentStates();
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

    addViews(embeddedStates, parentTemplate) {
        const { iVXjs } = this;
        const self = this;
        const { valid = true, invalidViews = {} } = this._getInvalidEmbeddSettings(embeddedStates)

        if (!embeddedStates) return;

        if (!valid) {
            this.iVXjs.log.error({
                message: `Embedded States are invalid`,
            }, "SET_UP");

            return;
        }

        embeddedStates.forEach((embeddedStateDef, index) => {
            self._addUIViewToParent(parentTemplate, embeddedStateDef);
        });
    }

    _getInvalidEmbeddSettings(embeddedStates) {
        return {
            valid: true
        };
    }

    _addUIViewToParent(parentView, embeddedState) {
        const { appendTo, viewName, classes = "" } = embeddedState;

        if (document.querySelector(`#${viewName}`)) return;

        const uiContainer = angular.element(document.querySelector(appendTo));
        const view = angular.element(`<div class="${classes}" id="${viewName}" ui-view="${viewName}"></div>`);

        uiContainer.append(view);
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
            controller: ['$scope', ($scope) => {
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
            onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) => {
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

    this.buildDefaultUrl = (iVXjs, defaultStateId) => {
        return stateCreator.buildDefaultUrl(iVXjs, defaultStateId);
    }

    this.create = ($stateProvider, iVXjs) => {
        stateCreator.create($stateProvider, iVXjs);
    }
}
