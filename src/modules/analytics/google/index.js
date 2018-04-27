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

        if (!this.experienceData.experience.analytics) {
            this.experienceData.experience.analytics = {
                trackers: googleTrackers,
                _getTrackersToProcess: this._getTrackersToProcess
            }
        }


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

<<<<<<< HEAD
        return trackers.filter(tracker => {
            return tracker.type === self.TYPE_NAME
        })
=======
        console.log(key, value);

        ga(setActionName, key, value);

>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9
    }
}

module.export = initializeGoogle;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.analytics.google', initializeGoogle);
}

function initializeGoogle(settings = {}, iVXjs) {
    if (!ga) {
        console.error("No google analytics");
        return;
    }

    new Google(settings, iVXjs);

    return settings;
}