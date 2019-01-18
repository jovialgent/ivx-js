const settings = [
    {
        timeAt: 0,
        endAt: 60,
        eventName: "sendAnalyticsEvent",
        args: {
            event: "started-video"
        }
    },
    {
        timeAt: 30,
        endAt: 60,
        eventName: "sendAnalyticsEvent",
        args: {
            event: "half-way-through-video"
        }
    }
];

export default settings;