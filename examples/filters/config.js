
import config from "./project.json";
// import config from "./is-empty-rule.json";

import "./templates/options-after.html";
import "./templates/text-after.html";

export default (iVXjs, iVXjsUiSemanticUi, iVXjsValidationSchema) => {
    "ngInject";
  
    iVXjs.init({
        config,
        debug: true,
        // ui: iVXjsUiSemanticUi(),
        // validation: iVXjsValidationSchema(),
        experience: {

        }
    });
}