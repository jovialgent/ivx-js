import parentTemplate from "./templates/parent-state.html";
import embeddedTemplate from "./templates/embedded-state.html";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

export default class StateRegisterService {
    constructor($state, $window, iVXjs, iVXjsStateNavigation) {
        "ngInject";

        Object.assign(this, {
            iVXjs,
            $state,
            $window,
            isEmpty,
            parentTemplate,
            embeddedTemplate,
            iVXjsStateNavigation,
            templateRegex: /\{\{([A-Z,a-z,0-9,\.,\-]+)}}/gm
        })
    }

    register(states, defaultState = []) {
        const updateStates = this._createParentStates(states);

        this._goToDefaultState(updateStates, defaultState);
    }

    //#region Parent State Methods
    createParentState(state) {
        const name = this.getParentStateName(state);
        const url = this.getParentStateUrl(state);
        const template = this.createParentStateTemplate(state);
        const data = this.createParentStateData(state);
        const basic = {
            name,
            url,
            data,
            template,
            controller: ($scope, iVXjsParentControllerService) => {
                "ngInject";

                iVXjsParentControllerService.setUp($scope, state);
            },
            onEnter: (iVXjsStateOnEnter) => {
                "ngInject";

                iVXjsStateOnEnter.runOnParent(state);

            },
            onExit: (iVXjsStateOnExit) => {
                "ngInject";

                iVXjsStateOnExit.runOnParent(state);
            }
        };

        return this.overrideParentStateSettings(basic, state);
    }

    getParentStateName(state) {
        const { id: name } = state;

        return name;
    }

    getParentStateUrl(state) {
        const { url } = state;

        return url;
    }

    createParentStateData(state) {
        return state;
    }

    createParentStateTemplate(state) {
        const { templateRegex } = this;
        const parentTemplate = this.getParentStateTemplate();

        return parentTemplate.replace(templateRegex, (value) => {
            const path = value
                .replace('{{', ''
                ).replace('}}', '');

            return get(state, path);
        })
    }

    getParentStateTemplate() {
        return this.parentTemplate;
    }

    overrideParentStateSettings(basic, state) {
        return basic;
    }
    //#endregion Parent State Methods

    //#region Embedded State Methods
    createEmbeddedState(embeddedState, parentState, embeddedViewStateData, viewData) {
        const url = this.createEmbeddedStateUrl(embeddedState, parentState, embeddedViewStateData, viewData);
        const name = this.createEmbeddedStateName(embeddedState, parentState, embeddedViewStateData, viewData);
        const views = this.createEmbeddedViews(embeddedState, parentState, embeddedViewStateData, viewData);
        const data = this.createEmbeddedStateData(embeddedState, parentState, embeddedViewStateData, viewData);
        const basic = {
            name,
            url,
            data,
            views,
            onEnter: (iVXjsStateOnEnter) => {
                "ngInject";

                iVXjsStateOnEnter.runOnEmbedded(embeddedState, parentState, embeddedViewStateData, viewData);

            },
            onExit: (iVXjsStateOnExit) => {
                "ngInject";

                iVXjsStateOnExit.runOnEmbedded(embeddedState, parentState, embeddedViewStateData, viewData);
            }
        };

        return this.overrideEmbeddedStateSettings(basic, embeddedState, parentState, embeddedViewStateData, viewData)
    }

    createEmbeddedStateName(embeddedState, parentState, embeddedViewStateData, viewData) {
        const { id: parentId } = parentState;
        const { id: embeddedId } = embeddedState;

        return `${parentId}.${embeddedId}`;
    }

    createEmbeddedStateUrl(embeddedState, parentState, embeddedViewStateData, viewData) {
        const { url } = embeddedState;

        return url;
    }

    createEmbeddedStateData(embeddedState, parentState, embeddedViewStateData, viewData) {
        return embeddedState;
    }


    createEmbeddedViews(embeddedState, parentState, embeddedViewStateData, viewData) {
        const views = {};
        const viewKey = this.createEmbeddedViewKey(embeddedState, parentState, embeddedViewStateData, viewData);

        views[viewKey] = this.createEmbeddedViewData(embeddedState, parentState, embeddedViewStateData, viewData);

        return views;
    }

    createEmbeddedViewKey(embeddedState, parentState, embeddedViewStateData, viewData) {
        const { id: parentStateId } = parentState;
        const { id: viewName } = viewData;

        return `${viewName}@${parentStateId}`;
    }

    createEmbeddedViewData(embeddedState, parentState, embeddedViewStateData, viewData) {
        const template = this.createEmbeddedtStateTemplate(embeddedState);
        const basic = {
            template,
            controller: ($scope, iVXjsEmbeddedControllerService) => {
                "ngInject";

                iVXjsEmbeddedControllerService.setUp($scope, embeddedState, parentState, embeddedViewStateData, viewData);
            }
        };

        return this.overrideViewData(basic, embeddedState, parentState, embeddedViewStateData, viewData)
    }

    overrideViewData(basic, embeddedState, parentState, embeddedViewStateData, viewData) {
        return basic;
    }

    createEmbeddedtStateTemplate(state) {
        const { templateRegex } = this;
        const embeddedTemplate = this.getEmbeddedStateTemplate();

        return embeddedTemplate.replace(templateRegex, (value) => {
            const path = value
                .replace('{{', ''
                ).replace('}}', '');

            return get(state, path);
        })
    }

    getEmbeddedStateTemplate() {
        return this.embeddedTemplate;
    }

    overrideEmbeddedStateSettings(basic, embeddedState, parentState, embeddedViewStateData, viewData) {
        return basic;
    }
    //#endregion Embedded State Methods

    //#region Private Methods
    _createParentStates(states) {
        const self = this;
        const { $state } = this;
        const updateStates = states.map((state, index) => {
            let { embeddedViews = [] } = state;
            const stateData = self.createParentState(state);

            $state.stateRegistry.register(stateData);

            const modifiedEmbeddedViews = embeddedViews.reduce((views, embeddedView) => {
                return [
                    ...views,
                    ...self._createEmbeddedStates(embeddedView, state, states)
                ];
            }, []);

            return Object.assign({}, stateData, {
                embeddedViews: modifiedEmbeddedViews
            });
        });

        return updateStates;
    }

    _createEmbeddedStates(embeddedView, parentState, states) {
        const self = this;
        const { $state } = this;
        const { states: embeddedViewStates = [] } = embeddedView;
        const updatedEmbeddedViews = embeddedViewStates.map(embeddedViewState => {
            const { stateId: embeddedViewStateId } = embeddedViewState;
            const embeddedState = states.find(state => state.id === embeddedViewStateId);
            const embeddedStateData = self.createEmbeddedState(embeddedState, parentState, embeddedViewState, embeddedView);

            $state.stateRegistry.register(embeddedStateData);

            return embeddedStateData
        });

        return updatedEmbeddedViews;
    }

    _goToDefaultState(states, defaultState) {
        const { iVXjsStateNavigation, $window, isEmpty, $state } = this;
        const { location = {} } = $window;
        const { hash = '' } = location;

        if (!isEmpty(hash)) {
            const currentUrl = hash.replace('#', '');

            const matchingState = states.reduce((currentMatchingState, state) => {
                const { url: parentUrl, embeddedViews = [] } = state;
                const matchesParent = parentUrl === currentUrl
                const matchesEmbeddedView = embeddedViews.find(embeddedView => {
                    const { url: embeddedUrl } = embeddedView;
                    const fullRoute = `${parentUrl}${embeddedUrl}`;

                    return currentUrl === fullRoute;
                });

                if (matchesEmbeddedView) return matchesEmbeddedView;
                if (matchesParent) return state;
                return currentMatchingState;

            }, {});
    
            if (matchingState && matchingState.name) $state.go(matchingState.name);

            return;
        }

        iVXjsStateNavigation.go(defaultState);
    }

    //#endregion Private Methods

}