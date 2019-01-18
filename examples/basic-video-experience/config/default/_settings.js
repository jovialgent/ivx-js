import states from "./states";
import metadata from "./metadata";

const defaultState = [
    {
        stateId: "html-video-state"
    }
]
export default {
    states: states(),
    metadata: metadata(),
    defaultState
}