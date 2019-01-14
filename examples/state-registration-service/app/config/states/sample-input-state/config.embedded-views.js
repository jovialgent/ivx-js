const embeddedViews = [{
    id: "button-input-view",
    name: "Testing Buttons",
    appendTo: "header",
    type: "custom",
    states: [{
        stateId: "sample-button-state",
        next: [{
            route: "^"
        }]
    }]
}];

export default embeddedViews;