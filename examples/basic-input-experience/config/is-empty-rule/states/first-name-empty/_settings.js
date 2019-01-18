import events from "./events";
import html from "./index.html";


const stateSettings = {
    id: "first-name-empty",
    url: "/first-name-empty",
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