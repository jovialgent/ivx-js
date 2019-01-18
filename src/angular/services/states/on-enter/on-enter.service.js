export default class {
    constructor($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudio, iVXjsAudioExperience) {
        "ngInject";

        Object.assign(this, {
            $rootScope,
            $state,
            iVXjs,
            iVXjsActions,
            iVXjsBus,
            iVXjsAudio,
            iVXjsAudioExperience
        })
    }

    run(state) {
        const { onEnter = [], id } = state;
        const { $rootScope, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudio, iVXjsAudioExperience } = this;

        iVXjs.log.debug('On Enter Actions Start', {}, { source: 'onEnter', status: 'started', actions: onEnter, timestamp: Date.now() });

        $rootScope.stateID = id;

        iVXjsActions.resolveActions(onEnter, () => {
            iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp: Date.now() });
        });
    }

    runOnParent(state) {
        const { onEnter = [], id } = state;
        const { $rootScope, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudio, iVXjsAudioExperience } = this;

        if (iVXjsAudioExperience && !iVXjsAudioExperience.eventsAdded) {
            iVXjsAudioExperience.addEventListeners(iVXjsBus);
            iVXjsAudio.addEventListeners(iVXjsBus);
            iVXjs.experience.Bus = iVXjsBus;
            iVXjsAudioExperience.eventsAdded = true;
            iVXjsAudio.eventsAdded = true;
            iVXjs.experience.audio = iVXjsAudioExperience;
            iVXjs.experience.actions = iVXjsActions;
        }

        this.run(state);
    }

    runOnEmbedded(embeddedState, parentState, embeddedViewStateData, viewData) {
        this.run(embeddedState);
    }
}