import events from "./events";
import html from "./index.html";


const stateSettings = {
    id: "last-name-empty",
    url: "/last-name-empty",
    name: "undefined",
    type: "html",
    next: [],
    embedded:false,
    ...events(),
    section: {},
    
    html
};

export default [
    
    stateSettings
]