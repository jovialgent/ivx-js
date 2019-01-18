import states from "./states";
import metadata from "./metadata";

const defaultState = [
    {
        stateId: "video-scene-test"
    }
]

export default {
    states: states(),
    metadata: metadata(),
    defaultState
}