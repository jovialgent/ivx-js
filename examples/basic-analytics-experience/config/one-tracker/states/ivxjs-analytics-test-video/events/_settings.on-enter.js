const settings = [
    {
        eventName: "sendEvent",
        args: {
            tracker: "ivxjsTracker",
            hitType: "event",
            eventCategory: "Test",
            eventAction: "fire",
            eventLabel: "ivxjsTracker"
        }
    },
    {
        eventName: "sendEvent",
        args: {
            tracker: "globalTracker",
            hitType: "event",
            eventCategory: "Test",
            eventAction: "fire",
            eventLabel: "globalTracker"
        }
    },
    {
        eventName: "sendEvent",
        args: {
            hitType: "event",
            eventCategory: "Test",
            eventAction: "fire",
            eventLabel: "all"
        }
    }
];

export default settings;