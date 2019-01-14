
import config from "./project.json";
import "semantic-ui-css/semantic.min";
import "semantic-ui-css/semantic.min.css";
import "../../src/modules/ui/semantic-ui";

export default (iVXjs, iVXjsValidationSchema, iVXjsDataiVXio, iVXjsUiSemanticUi) => {
    "ngInject";
    const debug = true;
    const storyKey = "oc-test";

    iVXjs.init({
        config,
        debug: true,
        data: iVXjsDataiVXio({
            // storyKey,
            // funnel:true
        }),
        ui: iVXjsUiSemanticUi(),
        experience: {
            data: {
                configData: "CONFIG DATA!",
                name: "NAME"
            }
        }
        // validation: iVXjsValidationSchema(),
    });
}