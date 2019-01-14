import createBasicStateInfo from "../_utilities/create-basic-state-info";
import inputs from "./inputs";
import embeddedViews from "./config.embedded-views";

const id = "sample-input-state";
const basicStateInfo = createBasicStateInfo(id);
const inputStateInfo = {
    type: "input",
    embeddedViews,
    inputs: inputs()

}

export default Object.assign({}, basicStateInfo, inputStateInfo);