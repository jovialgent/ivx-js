import basicMenuScene from "./basic-menu-scene";
import formScene from "./form-scene";
import htmlScene from "./html-scene";
import questionScene from "./question-scene";
import videoScene from "./video-scene";

const settings = [
    ...basicMenuScene(),
    ...formScene(),
    ...htmlScene(),
    ...questionScene(),
    ...videoScene()
];

export default settings;