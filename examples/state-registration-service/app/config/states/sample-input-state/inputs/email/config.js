import createBasicInputInfo from "../../../_utilities/create-basic-input-info";

const type = "email";
const basicInputInfo = createBasicInputInfo(type);
const typeInputInfo = {}

export default Object.assign({}, basicInputInfo, typeInputInfo);