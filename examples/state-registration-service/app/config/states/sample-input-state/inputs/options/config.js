import createBasicInputInfo from "../../../_utilities/create-basic-input-info";
import startCase from "lodash/startCase";

const type = "options";
const options = ["value-1", "value-2", "value-3"].map(value=>{
    return {
        value,
        display: startCase(value)
    }
})
const basicInputInfo = createBasicInputInfo(type);
const typeInputInfo = {
    options
}

export default Object.assign({}, basicInputInfo, typeInputInfo);