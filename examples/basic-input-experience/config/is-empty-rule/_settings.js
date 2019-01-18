import states from "./states";
import metadata from "./metadata";


const defaultState = [
    {
        stateId: "basic-form"
    }
]
export default {
    states : states(),
    metadata: metadata(),
    
    defaultState
}