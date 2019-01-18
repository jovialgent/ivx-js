const settings = [
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            event: "this-should-be-overwritten",
            eventLabel: "exiting-video-scene-with-extra-options",
            eventAction: "video-event",
            eventCategory: "video"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            event: "ga-exiting-video-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "spGoogleTagManager",
            event: "gtm-exiting-video-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            event: "exiting-video-scene"
        }
    }
];

export default settings;