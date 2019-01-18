const settings = [
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            event: "ga-entering-video-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "spGoogleTagManager",
            event: "gtm-entering-video-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            event: "entering-video-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            eventLabel: "entering-video-scene-with-extra-options",
            eventAction: "video-event",
            eventCategory: "video"
        }
    }
];

export default settings;