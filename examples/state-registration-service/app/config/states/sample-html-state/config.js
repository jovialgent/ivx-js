import html from "./index.html";
import embeddedViews from "./config.embedded-views";

const config = {
    id: 'sample-html-state',
    name: 'Sample Html State',
    url: '/sample-html-state',
    type: 'html',
    html,
    onEnter : [{
        eventName: "addClasses",
        args: {
            element: "body",
            classes: "blue"
        }
    }],
    onExit : [],
    onTimeout: [],
    embeddedViews
}

export default config;