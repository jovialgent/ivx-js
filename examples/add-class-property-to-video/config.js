
import config from "./project.json";

appConfig.$inject = ["iVXjs", "iVXjs.validation.schema"];

function appConfig(iVXjs, validation, ui) {
    iVXjs.init({
        validation: validation(),
        config
    });
}

export default appConfig;