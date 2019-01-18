import states from "./states";
import metadata from "./metadata";

const defaultState = [
    {
        stateId: "action-add-class-testing"
    }
]
export default {
    states: states(),
    metadata: metadata(),
    defaultState
}