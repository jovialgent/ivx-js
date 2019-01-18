import events from "./events";
import html from "./index.html";


const stateSettings = {
    id: "none-are-empty",
    url: "/none-are-empty",
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