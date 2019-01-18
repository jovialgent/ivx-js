import defaultConfig from "./config/default";

export default ($rootScope, iVXjs, iVXjsValidationSchema) => {
    "ngInject";

    iVXjs.init({
        validation: iVXjsValidationSchema(),
        config: defaultConfig()
    });
}