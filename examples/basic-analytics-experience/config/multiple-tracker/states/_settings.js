import inputSceneTest from "./input-scene-test";
import videoSceneTest from "./video-scene-test";

const settings = [
    ...inputSceneTest(),
    ...videoSceneTest()
];

export default settings;