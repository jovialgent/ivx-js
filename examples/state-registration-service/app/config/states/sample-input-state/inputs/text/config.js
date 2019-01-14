import createBasicInputInfo from "../../../_utilities/create-basic-input-info";

const type = "text";
const basicInputInfo = createBasicInputInfo(type);
const typeInputInfo = {
    onChange: [{
        eventName: "checkTimeResolveActions",
        args: {
            source: 'text change'
        }
    }]
}

export default Object.assign({}, basicInputInfo, typeInputInfo);