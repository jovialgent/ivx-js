import config from "./config";
import embeddedStates from "./embedded";

export default () => {
    return [
        config,
        ...embeddedStates()
    ];
}