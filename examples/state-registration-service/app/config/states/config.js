import sampleHtmlState from "./sample-html-state";
import sampleVideotate from "./sample-video-state";
import sampleNavigationState from "./sample-navigation-state";
import sampleInputState from "./sample-input-state";

const states = [
    ...sampleHtmlState(),
    ...sampleVideotate(),
    ...sampleNavigationState(),
    ...sampleInputState()
];

export default states;