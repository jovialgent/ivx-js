
import config from "./project.json";
// import config from "./is-empty-rule.json";

export default (iVXjs, iVXjsAnalyticsGoogle, iVXjsValidationSchema) => {
    "ngInject";

    iVXjs.init({
        config,
        debug: true,
        // ui: iVXjsUiSemanticUi(),
        // validation: iVXjsValidationSchema(),
        analytics: iVXjsAnalyticsGoogle({}, iVXjs),
        experience: {

        }
    });
}