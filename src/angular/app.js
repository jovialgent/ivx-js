import AppBootstrap from "./app.bootstrap";
import AppConfig from './app.config.js';
import AppRun from './app.run.js';

import iVXjsConfigEventNames from '../constants/iVXjs.config.events.js';
import { iVXjs } from '../core/app.js';

import createFactoryFunction from "./utilities/create-factory-function";

import Constants from "./constants";
import Directives from "./directives";
import Providers from "./providers";
import Services from "./services";
import Filters from "./filters";

const iVXjsConfigEvents = new iVXjsConfigEventNames();
const myIVXjs = new iVXjs();
const { iVXjsGlobalConfigs = {} } = window;
const { modules = [] } = iVXjsGlobalConfigs;
const deps = [].concat([
    'ui.router',
    'ngSanitize',
    Providers,
    Directives,
    Constants,
    Services,
    Filters
], modules);

// Bootstrap App
myIVXjs.Bus.on(iVXjsConfigEvents.VALIDATED, (iVXjs) => {
    AppBootstrap(iVXjs);
});


export default angular
    .module('ivx-js', deps)
    .constant('iVXjs', myIVXjs)
    .config(AppConfig)
    .run(AppRun)
    .name;