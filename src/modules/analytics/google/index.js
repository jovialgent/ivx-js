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
    }

    init(experienceData) {
        let { iVXjs, settings } = this;
        this.experienceData = experienceData;
        this.assertModule = new Assert(iVXjs.log);
        this.log = iVXjs.log;

        let { config = {} } = experienceData;
        let { metadata = {} } = config;
        let { trackingId } = metadata;
        let { plugins = [], name = 'ivxjsTracker' } = settings;

        settings.trackingId = trackingId ? trackingId : settings.trackingId;

        this.assertModule.assert(settings.trackingId, "Tracking Id", "make sure to add a tracking id");

        this.experienceData.experience.analytics = {
            name
        }

        settings.name = name;

        ga('create', settings);

        plugins.forEach((plugin, index) => {
            ga('require', plugin);
        });
        ga(`${name}.send`, 'pageview');

        iVXjs.Bus.on(stateEventNames.CHANGE, (state) => {
            let { url } = state;

            ga(`${name}.send`, {
                hitType: 'pageview',
                page: url
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
        let { settings = {}, log, analytics = {} } = this;
        let { tracker } = args

        let sendEventPromise = new Promise((resolve, reject) => {

            args.hitCallback = () => {
                resolve();
            }

            tracker = tracker ? `${tracker}.` : `${analytics.name}.`;

            delete args.tracker;

            ga(`${tracker}send`, args);
        });

        return sendEventPromise;
    }

    setAnalyticsData(args) {
        let { settings = {}, log, analytics = {} } = this;
        let { tracker, key, value } = args
        let setActionName = tracker ? `${tracker}.set` : `${analytics.name}.set`;

        console.log(key, value);

        ga(setActionName, key, value);

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