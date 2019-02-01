
import config from "./project.json";
import "semantic-ui-css/semantic.min";
import "semantic-ui-css/semantic.min.css";
import "../../src/modules/ui/semantic-ui";
import "../../src/modules/analytics/google";

export default (iVXjs, iVXjsValidationSchema, iVXjsAnalyticsGoogle, iVXjsDataiVXio) => {
    "ngInject";
    const debug = true;
    const storyKey = "sp-nitro-pocs";

    iVXjs.init({
        config,
        analytics: iVXjsAnalyticsGoogle({}, iVXjs),
        debug: true,
        data: iVXjsDataiVXio({
            storyKey,
            funnel:true
        }),
        experience: {
            data: {
                configData: "CONFIG DATA!",
                name: "NAME"
            }
        }
        // validation: iVXjsValidationSchema(),
    });
}