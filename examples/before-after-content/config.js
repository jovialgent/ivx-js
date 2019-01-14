
import htmlConfig from "./html.json";
import templateUrlConfig from "./template-url.json";

const framework = "bootstrap";


appConfig.$inject = [ "iVXjs", "iVXjs.validation.schema", "iVXjs.ui."+framework];

function appConfig( iVXjs, validation, ui) {
    iVXjs.init({
        validation: validation(),
        // ui: ui(),
        config : htmlConfig,
        experience:{
            testStatic :"YO!"
        }
        // config : templateUrlConfig
    });
}

export default appConfig;