import events from "./events";
import html from "./index.html";

const stateSettings = {
    id: "html-scene",
    url: "/html-scene",
    name: "HTML Scene",
    type: "html",
    next: [],
    embedded: false,
    ...events(),
    section: {
        classes: "html-scene"
    },
    html
};

export default [
    stateSettings
]