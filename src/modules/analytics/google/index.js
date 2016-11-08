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
        let {iVXjs, settings} = this;
        this.experienceData = experienceData;
        this.assertModule = new Assert(iVXjs.log);
        this.log = iVXjs.log;

        let {config = {}} = experienceData;
        let {metadata = {}} = config;
        let {trackingId} = metadata;
        let {plugins = []} = settings;

        settings.trackingId = trackingId ? trackingId : settings.trackingId;

        this.assertModule.assert(settings.trackingId, "Tracking Id", "make sure to add a tracking id");

        ga('create', settings);
        plugins.forEach((plugin, index) => {
            ga('require', plugin);
        });
        ga('send', 'pageview');

        iVXjs.Bus.on(stateEventNames.CHANGE, (state) => {
            let {url} = state;

            ga('send', {
                hitType: 'pageview',
                page: url
            });
        });

    }

    get experience() {
        let {experienceData} = this;

        experienceData.experience.sendEvent = this.sendEvent;

        return experienceData;
    }

    sendEvent(args) {
        let {settings = {}, log} = this;
        let {tracker} = settings;
        let sendEventPromise = new Promise((resolve, reject) => {
            args.hitCallback = () => {
                resolve();
            }

            tracker = tracker ? `${tracker}.` : "";
            ga(`${tracker}send`, args);
        });

        return sendEventPromise;
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