import AppBootstrap from "./app.bootstrap";

export default ($timeout, iVXjs, iVXjsBus, iVXjsStateRegister) => {
    "ngInject";

    const { constants = {} } = iVXjs;
    const { CONFIG } = constants;
    const { EVENTS = {} } = CONFIG;
    const { VALIDATED } = EVENTS;

    iVXjsBus.on(VALIDATED, (currentiVXjs) => {
        const { config = {} } = currentiVXjs;
        const { states = [], defaultState = [] } = config;

        iVXjsStateRegister.register(states, defaultState);
    });
}