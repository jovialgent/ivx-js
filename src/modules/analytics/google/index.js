import iVXjsConfigEventNames from '../../../constants/iVXjs.config.events.js';
import StateEventNames from '../../../constants/state.events.js';
import GoogleAnalyticsEvents from "./constants.js";
import Assert from "../../../utilities/asserts.js";
import DefaultAnalytics from "../index.js";

let iVXjsConfigEvents = new iVXjsConfigEventNames();
let stateEventNames = new StateEventNames();
let googleAnalyticsEvents = new GoogleAnalyticsEvents();

export class Google extends DefaultAnalytics {
    constructor(settings, iVXjs) {
        super(settings, iVXjs);

        this.TYPE_NAME = "google-analytics";
    }

    init(experienceData) {
        const self = this;
        let { iVXjs, settings } = this;
        this.experienceData = experienceData;
        this.assertModule = new Assert(iVXjs.log);
        this.log = iVXjs.log;

        let { config = {} } = experienceData;
        let { metadata = {} } = config;
        let { trackingId, trackers = [] } = metadata;
        let { plugins = [], name = 'ivxjsTracker', trackers: settingTrackers } = settings;
        let googleTrackers = this._getAllGoogleTrackers(trackers);

        settings.trackingId = trackingId ? trackingId : settings.trackingId;
        settings.name = name;

        if (settings.trackingId) {
            googleTrackers = [{
                type: this.TYPE_NAME,
                trackingId: settings.trackingId,
                id: name
            }]
        }

        if (settingTrackers) {
            googleTrackers = settingTrackers;
        }

        this.assertModule.assert(googleTrackers.length >= 1, "Tracking Id", "make sure to add a tracking id");

        const analytics = {
            trackers: googleTrackers,
            _getTrackersToProcess: this._getTrackersToProcess
        }

        if (!this.experienceData.experience.analytics) {
            this.experienceData.experience.analytics = analytics;
        } else {
            this.experienceData.experience.analytics = Object.assign(
                this.experienceData.experience.analytics,
                analytics
            );
        }

        this.analytics = analytics;

        googleTrackers.forEach(googleTracker => {
            const { id: trackerName, trackingId } = googleTracker;

            ga('create', {
                trackingId,
                name: trackerName
            });
            ga(`${trackerName}.send`, 'pageview');
        });
        plugins.forEach((plugin, index) => {
            ga('require', plugin);
        });
        iVXjs.Bus.on(stateEventNames.CHANGE, (state) => {
            let { url } = state;

            googleTrackers.forEach(googleTracker => {
                const { id: trackerName } = googleTracker;

                ga(`${trackerName}.send`, {
                    hitType: 'pageview',
                    page: url
                });
            });
        });

        iVXjs.Bus.on('sendAnalyticsEvent', (args) => {
            self.sendAnalyticsEvent(args);
        })
    }

    get experience() {
        let { experienceData } = this;

        experienceData.experience.sendEvent = this.sendEvent;
        experienceData.experience.setAnalyticsData = this.setAnalyticsData;

        return experienceData;
    }

    sendEvent(args) {
        const self = this;
        let { settings = {}, log, analytics = {} } = this;
        let { tracker } = args
        let promises = [];
        let { trackers: allTrackers = [] } = analytics;
        let trackersToProcess = analytics._getTrackersToProcess(allTrackers, tracker);

        delete args.tracker;

        const trackerPromises = trackersToProcess.map(trackerToProcess => {
            return new Promise((resolve, reject) => {
                const currentArgs = Object.assign({}, args);
                const { id: trackerName } = trackerToProcess;

                currentArgs.hitCallback = () => {
                    resolve();
                }

                ga(`${trackerName}.send`, currentArgs);
            });
        });

        return Promise.all(trackerPromises);
    }

    sendAnalyticsEvent(args) {
        const { iVXjs = {} } = this;
        const { experience = {} } = iVXjs;
        const { processor = {} } = experience;
        const { tracker, rules = [] } = args;

        let analyticEventSettings = args;

        if (Array.isArray(rules) && rules.length > 0 && processor.processRules) {
            analyticEventSettings = processor.processRules(rules);
        }

        this._processAnalyticEvents(analyticEventSettings);
    }

    _processAnalyticEvents(analyticEventSettings) {
        if (!analyticEventSettings) return;

        const { analytics, iVXjs } = this;
        const { trackers: allTrackers = [] } = analytics;
        const { event, eventLabel = event, eventCategory = 'ivx', eventAction = 'triggered-events', tracker: trackerId } = analyticEventSettings;
        const trackers = analytics._getTrackersToProcess(allTrackers, trackerId);

        if (trackers.length <= 0) return;

        trackers.forEach(tracker => {
            const { id: trackerName, name, trackingId } = tracker;

            if (!eventLabel) {
                iVXjs.log.warn(`Google Analytics Send Event Failed: Event failed to send to the Google Analytics Tracker, ${name} (id: ${trackerName}, trackingId ${trackingId}), because no event or event label was found. Make sure your "sendAnalyticsEvent" args collection has either an "eventLabel" or "event" property.`);
                return;
            }

            ga(`${trackerName}.send`, {
                hitType: "event",
                eventLabel,
                eventCategory,
                eventAction
            })
        })

    }

    setAnalyticsData(args) {
        let { settings = {}, log, analytics = {} } = this;
        let { trackers: allTrackers = [] } = analytics;
        let { tracker, key, value } = args;
        let trackersToProcess = analytics._getTrackersToProcess(allTrackers, tracker);

        trackersToProcess.forEach(tracker => {
            const { id: name } = tracker;

            ga(`${name}.set`, key, value);
        });
    }

    _getTrackersToProcess(allTrackers, tracker) {
        let trackersToProcess = [];

        if (tracker) {
            trackersToProcess = allTrackers.filter(thisTracker => {
                return thisTracker.id === tracker;
            });
        } else {
            trackersToProcess = allTrackers;
        }

        return trackersToProcess;
    }

    _getAllGoogleTrackers(trackers = []) {
        const self = this;

        return trackers.filter(tracker => {
            return tracker.type === self.TYPE_NAME
        })
    }
}

module.export = initializeGoogle;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.analytics.google', initializeGoogle)
        .constant('iVXjsAnalyticsGoogle', initializeGoogle)
}

function initializeGoogle(settings = {}, iVXjs) {
    if (!ga) {
        console.error("No google analytics");
        return;
    }

    new Google(settings, iVXjs);

    return settings;
}