import config from "./project.json";

appConfig.$inject = ["iVXjs", 'iVXjs.validation.schema'];

function appConfig(iVXjs, validation) {
    iVXjs.init({
        validation: validation(),
        config
    });
}

export default appConfig;