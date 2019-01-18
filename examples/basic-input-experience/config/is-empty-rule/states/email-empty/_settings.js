import events from "./events";
import html from "./index.html";


const stateSettings = {
    id: "email-empty",
    url: "/email-empty",
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