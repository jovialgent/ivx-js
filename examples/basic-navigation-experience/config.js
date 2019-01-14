
import config from "./project.json";

export default (iVXjs, iVXjsValidationSchema) => {
    "ngInject";
    let playerIdCues = {};

    iVXjs.init({
        config,
        debug: true,
        validation: iVXjsValidationSchema(),
        experience: {
            
        }
    });
}