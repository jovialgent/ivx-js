
import config from "./embedded-flow.json";
// import config from "./project.json";
import "./index.html";
import "semantic-ui-css/semantic.min";
import "semantic-ui-css/semantic.min.css";
import "../../src/modules/ui/semantic-ui";
import "./core.css";
import "./style.less";
import "./templates/html-state-embedded-test.html";

appConfig.$inject = ["iVXjs", "iVXjs.validation.schema", "iVXjs.ui.semantic-ui"];

function appConfig(iVXjs, validation, ui) {
    iVXjs.init({
        validation: validation(),
        ui: ui(),
        config,
        experience: {
            data: window.localStorage
        }
    });

    // iVXjs.Bus.on(iVXjs.constants.GLOBAL.EVENTS.ELEMENT_EVENT, (actions, source)=>{
    //     console.log(actions, source);
    // })
}

export default appConfig;