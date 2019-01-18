import defaultConfig from "./config/default";
// import isEmptyRule from "./config/isEmptyRule";

export default ($rootScope, iVXjs, iVXjsValidationSchema, iVXjsAnalyticsGoogle) => {
    "ngInject";

    iVXjs.init({
        config : defaultConfig(),
        debug: true,
        // ui: iVXjsUiSemanticUi(),
        // validation: iVXjsValidationSchema(),
        analytics: iVXjsAnalyticsGoogle({}, iVXjs),
        experience: {
            
        }
    });
}