require("babel-polyfill");
let EventEmitter = require('events');

import {Setup} from '../modules/setup.js';
import Logging from "../utilities/logging.js";
import iVXjsConfigEventNames from "../constants/iVXjs.config.events.js";
import {ActionProcessor} from './processor.js';

let iVXjsConfigEvents = new iVXjsConfigEventNames();

/**
 * Allows various data and functions for libraries to create
 * and build stateful interactive experiences.
 */
export class iVXjs {

    /**
     * Sets Up iVXjs and adds a Bus since it will be used
     * for setting up this class asyncronously
     */
    constructor() {

        /**
         * An instance of nodejs's EventEmitter class that 
         * allows iVXjs to emit and listen to various events.
         * @type {EventEmitter}
         */
        this.Bus = new EventEmitter();

    }

    /**
     * Sets up and attaches components to this iVXjs object after the 
     * set up is ran and all module dependencies have been loaded. This
     * needs to run with a validated experience and after all dependencies
     * are loaded, otherwise it will break an experience.
     * 
     * @param {object} processedData - a data object with references
     * to modules and functions 
     * @emits {validated} emits a verified instance of iVXjs for other components
     * to use.
     */
    setUpiVXjs(processedData) {

        /*
         * Depending on the iVXjs experience, some native functions
         * may need to be updated to work with the Action/Bus system.
         */
        if (processedData.actions) {

            /**
             * An object of functions that are modified to work with the
             * iVXjs Action system.
             * @type {object}
             */
            this.actions = processedData.actions;
        }

        /** 
         * Holds all state configurations to set up this 
         * iVXjs experience
         * @type {object} 
         */
        this.config = processedData.config;

        if(this.selector){
            this.config.selector = this.selector;
        }

        /**
         * Contains all data and functions for an experience to run
         * @type {object} 
         */

        this.experience = processedData.experience;
        this.experience.rules = processedData.rules;
        this.experience.Bus = this.Bus;
        this.experience.processor = new ActionProcessor(this);
        this.experience.config = this.config;

        /**
         * Evaluates an array of expressions to allow stat navigation branching
         * 
         * @type {function}
         * @param {array} navArray - an array of expressions and stateIds that navigate
         * the states
         */
        this.rules = processedData.rules;

        /**
         * Holds instances of classes for modules that will be used by renderers
         * to make various data objects.
         * 
         * @type {object}
         */
        this.ui = processedData.ui;
        this.video = processedData.video;
        this.audio = processedData.audio;

        /** 
         * Once all various components are added, emits on the
         * bus that it is validated and sends an instance of this class
         * to set up.
         */
        this.Bus.emit(iVXjsConfigEvents.VALIDATED, this);
    }

    /**
     * Initializes iVXjs by taking in an object of settings so
     * it can run the various enhancement, validation and module
     * loading.
     * 
     * @param {object} settings - all user settings that will create
     * this iVXjs experience.
     * @return {Promise} - Promise that will resovle when set up succeeds/fails
     */
    init(settings) {
        let self = this;
        let {debug = true} = settings;
     
        if(settings.selector){     
            this.selector = settings.selector;
        }

        if(settings.routeFunction){
            this.routeFunction = settings.routeFunction;
        }

        this.log = new Logging(debug, this.Bus);

        let thisSetup = new Setup(settings, this.Bus, this.log);
        let initPromise = new Promise((resolve, reject) => {
            thisSetup
                .runSetup()
                .then((experience) => {
                    self.setUpiVXjs(experience)
                    resolve(self);
                });
        });
        
        return initPromise;
    }

};