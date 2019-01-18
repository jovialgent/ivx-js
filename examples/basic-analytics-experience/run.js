import oneTrackerConfig from "./config/one-tracker";
import multipleTrackerConfig from "./config/multiple-tracker";

export default ($rootScope, iVXjs, iVXjsValidationSchema, iVXjsAnalyticsGoogle) => {
    "ngInject";

    iVXjs.init({
        config: oneTrackerConfig(),
        debug: true,
        analytics: iVXjsAnalyticsGoogle({}, iVXjs),
        // validation: iVXjsValidationSchema(),
        experience: {

        }
    });
}