import states from "./states";
import metadata from "./metadata";

import defaultState from "./config.default-state";

const config = {
    states: states(),
    metadata: metadata(),
    defaultState
};

export default config;