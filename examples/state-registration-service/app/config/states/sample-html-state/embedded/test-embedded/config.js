
import html from "./index.html";

const config = {
    id: 'test-embedded',
    name: 'Test Embedded State',
    url: '/test-embedded-state',
    type: 'html',
    html,
    onEnter : [{
        eventName: "removeClasses",
        args: {
            element: "body",
            classes: "blue"
        }
    }],
    onExit : [],
    onTimeout: []
}

export default config;