import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";
import links from "./links";

const stateSettings = {
    id: "basic-menu-scene",
    url: "/",
    name: "Test Menu Scene",
    type: "navigation",
    next: [],
    embedded: false,
    ...events(),
    section: {
        classes: "basic-menu-scene"
    },
    header: {
        html: headerHtml,
        classes: ""
    },
    footer: {
        html: footerHtml,
        classes: ""
    },
    links: [...links()]
};

export default [
    stateSettings
];