import defaultConfig from "./config/default";

export default ($rootScope, iVXjs, iVXjsValidationSchema) => {
    "ngInject";

    iVXjs.init({
        config : defaultConfig(),
        debug: true,
        validation: iVXjsValidationSchema(),
        experience: {
            
        }
    });
}