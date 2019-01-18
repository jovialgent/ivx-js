import states from "./states";
import metadata from "./metadata";

const defaultState = [
    {
        stateId: "basic-menu-scene"
    }
]

export default {
    states: states(),
    metadata: metadata(),
    defaultState
}