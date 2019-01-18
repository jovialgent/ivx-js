import events from "./events";
import html from "./index.html";


const stateSettings = {
    id: "all-empty",
    url: "/all-empty",
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