import AngularEvents from './angular.events.js';
import AudioEvents from './audio.events.js';
import Errors from './errors.js';
import HttpEvents from './http.events.js';
import iVXioErrors from './iVXio.errors.js';
import iVXjsConfigEvents from './iVXjs.config.events.js';
import LoggingEventNames from './logging.js';
import StateEvents from './state.events.js';
import VideoEvents from "./video.events.js";

export default class {
    constructor() {
        // Angular
        this.ANGULAR = {
            EVENTS: new AngularEvents()
        }

        // Audio
        this.AUDIO = {
            EVENTS: new AudioEvents
        }

        // Errors 
        this.ERRORS = {
            EVENTS: new Errors()
        };

        // Http
        this.HTTP = {
            EVENTS: new HttpEvents()
        }

        // iVXjs
        this.CONFIG = {
            EVENTS: new iVXjsConfigEvents()
        };

        // iVXio
        this.iVXio = {
            ERRORS: new iVXioErrors()
        };

        // Logging
        this.LOGGING = {
            EVENTS: new LoggingEventNames()
        };

        // State
        this.STATE = {
            EVENTS: new StateEvents()
        };

        // Video 
        this.VIDEO = {
            EVENTS: new VideoEvents()
        }
    }
}