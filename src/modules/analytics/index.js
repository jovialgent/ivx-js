import iVXjsConfigEventNames from '../../constants/iVXjs.config.events.js';

let iVXjsConfigEvents = new iVXjsConfigEventNames();

export default class {
    constructor(settings, iVXjs) {
        this.settings = settings;
        this.iVXjs = iVXjs;

        let self = this;

        iVXjs.Bus.once(iVXjsConfigEvents.ANALYTICS_SET, (experienceData) => {
            self.init(experienceData);
            
            let analyticExperience = self.experience;

            analyticExperience.analytics = self;

            iVXjs.Bus.emit(iVXjsConfigEvents.ANALYTICS_FINISHED, analyticExperience);
        });
    }
}