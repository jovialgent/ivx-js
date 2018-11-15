import AppBootstrap from "./app.bootstrap";
import AppConfig from './app.config.js';
import AppRun from './app.run.js';
import AppRunStateRegister from './app.run.state-register.js';

import iVXjsConfigEventNames from '../constants/iVXjs.config.events.js';
import { iVXjs } from '../core/app.js';

import createFactoryFunction from "./utilities/create-factory-function";
import { Html5 as Audio } from "../modules/audio/types/html5";
import { RegisteredVideoModules as Video } from "../modules/video/registered-modules";


import Constants from "./constants";
import Directives from "./directives";
import Providers from "./providers";
import Services from "./services";
import Filters from "./filters";

let stateAudio = new Audio('body', 'state-audio');
let experienceAudio = new Audio('body', 'experience-audio');

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
    .constant('ivxjs.modules.audio', stateAudio)
    .constant('iVXjsAudio', stateAudio)
    .constant('ivxjs.modules.audio.experience', experienceAudio)
    .constant('iVXjsAudioExperience', experienceAudio)
    .constant('ivxjs.log', myIVXjs.log)
    .constant('iVXjsLog', myIVXjs.log)
    .constant('ivxjs.modules.video', new Video())
    .constant('iVXjsModulesVideo', new Video())
    .config(AppConfig)
    .run(AppRun)
    .run(AppRunStateRegister)
    .name;