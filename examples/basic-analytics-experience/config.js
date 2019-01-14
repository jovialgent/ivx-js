
import config from "./multiple-tracker.json";
// import config from "./one-tracker.json";

export default (iVXjs, iVXjsAnalyticsGoogle, iVXjsValidationSchema) => {
    "ngInject";
    let playerIdCues = {};

    iVXjs.init({
        config,
        debug: true,
        analytics: iVXjsAnalyticsGoogle({}, iVXjs),
        // validation: iVXjsValidationSchema(),
        experience: {
        
        }
    });
}