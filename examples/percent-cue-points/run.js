import config from "./project.json";

export default (iVXjs) => {
    "ngInject";


    iVXjs.init({
        config,

        // ui: iVXjsUiBootstrap(),
        // validation: iVXjsValidationSchema(),
        experience: {
            timecCuePointFired(args) {
                console.log("FIRING TIME CUE POINT");
            },

            percentCuePointFired(args) {
                console.log("FIRING PERCENT CUE POINT");
            }

        }
    });
}