//Utilities
import iVXPageSetUp from './utilities/container-setup.js';
import { StringParsers } from './filters/string-parsers.js';
import { ObjectParsers } from '../utilities/type-parsers.js';
import AngularEventNames from '../constants/angular.events.js';
import iVXjsConfigEventNames from '../constants/iVXjs.config.events.js';
import iVXjsConstants from "../constants/registered-constants.js";
import { iVXjs } from '../core/app.js';
import factoryFunctionCreator from "./utilities/create-factory-function";
import Services from "./services/index";

let stringParser = new StringParsers();
let objectParsers = new ObjectParsers();
let angularEventNames = new AngularEventNames();
let iVXjsConfigEvents = new iVXjsConfigEventNames();
let myIVXjs = new iVXjs();

//Providers
import iVXjsSetup from './providers/ivxjs.setup.js';

// Directives

// States
import InputState from './directives/state.input.js';
import VideoState from './directives/state.video.js';
import HTMLState from './directives/state.html.js';
import NavigationState from './directives/state.navigation.js';

// Inputs
import FormInput from './directives/input.form.js';
import TextInput from './directives/input.text.js';
import Anchors from './directives/ui.anchor.js';
import CascadingOptions from './directives/ui.cascading-options.js';

import ButtonsInput from './directives/input.buttons.js';
import EmailInput from './directives/input.email.js';
import UrlInput from './directives/input.url.js';
import DateInput from './directives/input.date.js';
import DateTimeLocalInput from './directives/input.datetime-local.js';
import OptionsInput from './directives/input.options.js';
import RadioInput from './directives/input.radio.js';
import CheckboxInput from './directives/input.checkbox.js';
import NumberInput from './directives/input.number.js';
import TextareaInput from './directives/input.textarea.js';

// Video Players
import YoutubePlayer from './directives/video.youtube.js';
import HTML5Player from './directives/video.html5.js';
import VimeoPlayer from './directives/video.vimeo.js';

// Video Controls

import StandardVideoControls from './directives/video.controls.standard.js';

//Services
import Actions from './services/actions.js';
import { BusService as Bus } from './services/bus.js';
import CreateInlineVideo from './services/ios-inline-video.js';
import PullInTemplate from './services/template-renderer.js';

//Template Directives 
import SetData from './directives/template.set-data.js';
import AnimateElement from './directives/template.animate-element.js';
import GoToState from './directives/template.go-to-state.js';
import RaiseiVXjsEvent from './directives/template.raise-ivxjs-event.js';


// Config
import AppConfig from './app.config.js';

// Run
import AppRun from './app.run.js';

let { iVXjsGlobalConfigs = {} } = window;
let { modules = [] } = iVXjsGlobalConfigs;
let deps = [].concat([
    'ui.router',
    'ngSanitize',
], modules);



var app = angular
    .module('ivx-js', deps);

    app

    //Providers
    .provider('iVXjsSetup', iVXjsSetup)

    // Constants
    .constant('iVXjs', myIVXjs)
    .constant('ivxjs.constants', new iVXjsConstants())
    .constant('factoryFunctionCreator', factoryFunctionCreator)
    //.constant('YT', YT)

    // Inputs
    .directive('ivxjsFormInput', FormInput)
    .directive('ivxjsTextInput', TextInput)
    .directive('ivxjsRadioInput', RadioInput)
    .directive('ivxjsButtonsInput', ButtonsInput)
    .directive('ivxjsAnchor', Anchors)
    .directive('ivxjsCascadingOptionsInput', CascadingOptions)

    .directive('ivxjsOptionsInput', OptionsInput)
    .directive('ivxjsEmailInput', EmailInput)
    .directive('ivxjsUrlInput', UrlInput)
    .directive('ivxjsDateInput', DateInput)
    .directive('ivxjsDatetimeLocalInput', DateTimeLocalInput)
    .directive('ivxjsCheckboxInput', CheckboxInput)
    .directive('ivxjsNumberInput', NumberInput)
    .directive('ivxjsTextareaInput', TextareaInput)

    // Input State
    .directive('ivxjsInputState', InputState)

    // HTML State
    .directive('ivxjsHtmlState', HTMLState)

    // Navigation State
    .directive('ivxjsNavigationState', NavigationState)

    // Video Players    
    .directive('ivxjsYoutubeVideoPlayer', YoutubePlayer)
    .directive('ivxjsHtml5VideoPlayer', HTML5Player)
    .directive('ivxjsVimeoVideoPlayer', VimeoPlayer)
    .directive('ivxjsStandardVideoControls', StandardVideoControls)

    // Video State
    .directive('ivxjsVideoState', VideoState)

    //Temaplate
    .directive('ivxSetData', SetData)
    .directive('ivxAnimate', AnimateElement)
    .directive('ivxGoToState', GoToState)
    .directive('ivxEvent', RaiseiVXjsEvent)

    //Services
    .service('ivxjs.actions', Actions)
    .service('createInlineVideo', CreateInlineVideo)
    .service('ivxjs.bus', Bus)
    .service('pullInTemplate', PullInTemplate)

    //Controllers

    //Filters 
    .filter('stringParsers', ['$rootScope',
        ($rootScope) => {
            return (name, text) => {
                return stringParser[name](text);
            }
        }])

    //Config
    .config(AppConfig)

    //Run
    .run(AppRun);

new Services(app, { factoryFunctionCreator });


// Bootstrap App
myIVXjs.Bus.on(iVXjsConfigEvents.VALIDATED, (iVXjs) => {
    let stateAudio = new iVXjs.audio('body', 'state-audio');
    let experienceAudio = new iVXjs.audio('body', 'experience-audio');

    angular
        .module('ivx-js')
        .constant('ivxjs.modules.video', iVXjs.video)
        .constant('ivxjs.modules.ui', iVXjs.ui)
        .constant('ivxjs.log', iVXjs.log)
        .constant('ivxjs.modules.audio', stateAudio)
        .constant('ivxjs.modules.audio.experience', experienceAudio)

    objectParsers.mapKeys(iVXjs.ui.angular, (value, key) => {
        angular.module('ivx-js').directive(key, value);
    });

    if (iVXjs.experience.addEventListeners) {
        iVXjs.experience.addEventListeners(iVXjs.Bus, iVXjs.experience);
    }


    var pageSetup = new iVXPageSetUp(iVXjs.config.selector, iVXjs.config.template);

    angular.bootstrap(iVXjs.config.bootstrapSelector ? document.querySelector(iVXjs.config.bootstrapSelector) : document, ['ivx-js']);
    iVXjs.Bus.emit(angularEventNames.BOOTSTRAPPED);
});