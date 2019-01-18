import createBasicInputInfo from "../../../_utilities/create-basic-input-info";

const type = "checkbox";
const basicInputInfo = createBasicInputInfo(type);
const typeInputInfo = {}

export default Object.assign({}, basicInputInfo, typeInputInfo);