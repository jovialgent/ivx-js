import sortBy from "lodash/sortBy";
import config from "./config";

export default () => {
    return sortBy(config, 'name');
}