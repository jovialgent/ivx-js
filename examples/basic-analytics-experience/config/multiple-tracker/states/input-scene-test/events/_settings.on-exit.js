const settings = [
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            eventLabel: "exiting-input-scene-with-extra-options",
            eventAction: "input-event",
            eventCategory: "form"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "ivxjsTracker",
            event: "ga-exiting-input-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            tracker: "spGoogleTagManager",
            event: "gtm-exiting-input-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            event: "exiting-input-scene"
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            rules: [
                {
                    tracker: "ivxjsTracker",
                    eventLabel: "firing-event-1-on-ivxjstracker",
                    eventAction: "tracker-event",
                    eventCategory: "select-tracker",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-1"
                            }
                        ]
                    }
                },
                {
                    tracker: "globalTracker",
                    eventLabel: "firing-event-2-on-globalTracker",
                    eventAction: "tracker-event",
                    eventCategory: "select-tracker",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-2"
                            }
                        ]
                    }
                },
                {
                    tracker: "ivxjsTracker",
                    eventLabel: "no-event-on-ivxjstracker",
                    eventAction: "tracker-event",
                    eventCategory: "select-tracker"
                }
            ]
        }
    },
    {
        eventName: "sendAnalyticsEvent",
        args: {
            rules: [
                {
                    event: "fires-event-1",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-1"
                            }
                        ]
                    }
                },
                {
                    event: "fires-event-2",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-2"
                            }
                        ]
                    }
                },
                {
                    event: "fires-event-3",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-3"
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        eventName: "pushToGTMDataLayer",
        args: {
            rules: [
                {
                    event: "Firing GTM",
                    eventType: "Leaving the scene with analyticstest set to fires-event-1",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-1"
                            }
                        ]
                    }
                },
                {
                    event: "Firing GTM",
                    eventType: "Leaving the scene with analyticstest set to fires-event-2",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-2"
                            }
                        ]
                    }
                },
                {
                    event: "Firing GTM",
                    eventType: "Leaving the scene with analyticstest set to fires-event-3",
                    rule: {
                        conditionOperator: "and",
                        conditions: [
                            {
                                key: "analyticstest",
                                is: "equals",
                                value: "fires-event-3"
                            }
                        ]
                    }
                }
            ]
        }
    }
];

export default settings;