export default class {
    constructor(iVXjs, iVXjsActions) {
        "ngInject";

        Object.assign(this, {
            iVXjs,
            iVXjsActions
        })
    }

    run(state) {
        const { iVXjs, iVXjsActions } = this;
        const { onExit = [] } = state;

        iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onExit });
        iVXjsActions.resolveActions(onExit, () => {
            iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
        });
    }

    runOnParent(state) {
        this.run(state);
    }

    runOnEmbedded(embeddedState, parentState, embeddedViewStateData, viewData) {
        this.run(embeddedState);
    }
}