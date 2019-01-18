import createBasicStateInfo from "../_utilities/create-basic-state-info";
import links from "./links";

const id = "sample-navigation-state";
const basicStateInfo = createBasicStateInfo(id);
const navigationStateInfo = {
    type: "navigation",
    links : links()

}

export default Object.assign({}, basicStateInfo, navigationStateInfo);