import createBasicInputInfo from "../../../_utilities/create-basic-input-info";
import startCase from "lodash/startCase";

const type = "radio";
const radioButtons = ["value-1", "value-2", "value-3"].map(value=>{
    return {
        id: value,
        value,
        labelHTML: startCase(value)
    }
})
const basicInputInfo = createBasicInputInfo(type);
const typeInputInfo = {
    radioButtons
}

export default Object.assign({}, basicInputInfo, typeInputInfo);