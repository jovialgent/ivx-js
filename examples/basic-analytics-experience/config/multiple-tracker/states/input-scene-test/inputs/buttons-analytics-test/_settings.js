import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

import button1LabelHTML from "./templates/button.button-1.label.html";
import button2LabelHTML from "./templates/button.button-2.label.html";
import button3LabelHTML from "./templates/button.button-2.label.html";

const settings = {
    id: "buttons-analytics-test",
    type: "buttons",
    name: "analyticstest",
    beforeHtml: {
        html: inputBeforeHTML,
        classes: ""
    },
    afterHtml: {
        html: inputAfterHTML,
        classes: ""
    },
    labelHTML: inputLabel,
    input: {},
    container: {}
    ,
    attributes: {
        required: true
    },
    settings: {
        input: {
            classes: "question-input-dark-jungle-green-input"
        }
    },
    errors: {},
    buttons: [
        {
            id: "button-1",
            value: "fires-event-1",
            labelHTML: button1LabelHTML,
            classes: "ivx-input-buttons-primary",
            onClick: [
                {
                    eventName: "pushToGTMDataLayer",
                    args: {
                        event: "Firing GTM",
                        eventType: "Firing event on the fires-event-1 button"
                    }
                },
                {
                    eventName: "sendAnalyticsEvent",
                    args: {
                        event: "clicked-fires-event-1"
                    }
                }
            ]
        },

        {
            id: "button-2",
            value: "fires-event-2",
            labelHTML: button2LabelHTML,
            classes: "ivx-input-buttons-primary",
            onClick: [
                {
                    eventName: "pushToGTMDataLayer",
                    args: {
                        event: "Firing GTM",
                        eventType: "Firing event on the fires-event-2 button"
                    }
                },
                {
                    eventName: "sendAnalyticsEvent",
                    args: {
                        event: "clicked-fires-event-2"
                    }
                }
            ]
        },

        {
            id: "button-3",
            value: "fires-event-3",
            labelHTML: button3LabelHTML,
            classes: "ivx-input-buttons-primary",
            onClick: [
                {
                    eventName: "pushToGTMDataLayer",
                    args: {
                        event: "Firing GTM",
                        eventType: "Firing event on the fires-event-3 button"
                    }
                },
                {
                    eventName: "sendAnalyticsEvent",
                    args: {
                        event: "clicked-fires-event-2"
                    }
                }
            ]
        },

    ]


}

export default settings;