const settings = [
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            eventLabel: "entering-input-scene-with-extra-options",
            eventAction: "input-event",
            eventCategory: "form"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            event: "ga-entering-input-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "spGoogleTagManager",
            event: "gtm-entering-input-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            event: "entering-input-scene"
        }
    }
];

export default settings;