
import config from "./project.json";
import "./templates/action-template.html";

export default (iVXjs, iVXjsValidationSchema) => {
    "ngInject";
    let playerIdCues = {};

    iVXjs.init({
        config,
        debug: true,
        validation: iVXjsValidationSchema(),
        experience: {
            data: window.localStorage
        }
    });

    iVXjs.Bus.on('my-event', (args) => {
        console.log("MY EVENT FIRED");
        console.log("ARGS SENT", args);
    })
}