import createBasicStateInfo from "../../../_utilities/create-basic-state-info"
import inputs from "./inputs";

const id = "sample-button-state";
const basicStateInfo = createBasicStateInfo(id);
const inputStateInfo = {
    type: "input",
    inputs: inputs()

}

export default Object.assign({}, basicStateInfo, inputStateInfo);