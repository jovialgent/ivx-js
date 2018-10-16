import factoryFunctionCreator from "../components/factory-function-creator";
import iVXioComponents from "../components/index";
import iVXioServices from "../services/index";
import InputValidator from "../input-validators/index.js";
import { iVXio } from "../index";

import "./decorators";

export default () => {
    let app = angular.module('ivx-input-validator', []);

    app.constant('validator', InputValidator);


    try {
        let app = angular.module('ivx-js');

        app.constant('iVXjs.data.iVXio', initializeiVXIO);
        app.constant('iVXjsDataiVXio', initializeiVXIO);
        app.constant('validator', InputValidator);
        app.constant('iVXjsDataiVXio', InputValidator);


        new iVXioComponents(app, { factoryFunctionCreator });
        new iVXioServices(app, { factoryFunctionCreator });
    } catch (e) {
        console.warn('The iVXio Data Module is not attached to the iVXjs module. If this is correct, ignore this warning.')
        console.warn(e);
    }

    function initializeiVXIO(settings = {}) {
        settings.module = iVXio;

        return settings;
    };
}