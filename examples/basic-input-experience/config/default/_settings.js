import states from "./states";
import metadata from "./metadata";

const defaultState = [
    {
        stateId: "default-state"
    }
]
export default {
    states: states(),
    metadata: metadata(),
    defaultState
}