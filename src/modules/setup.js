import {DataProcessor} from "./data/processor.js";
import {RegisteredVideoModules} from "./video/registered-modules.js";
import {RegisteredAudioModules} from "./audio/registered-modules.js";
import {RegisteredValidationModules} from "./validation/registered-modules.js";
import {RegisteredUIModules} from './ui/registered-modules.js';
import {Modules} from './index.js';
import {assert} from '../utilities/asserts.js';
import ErrorEventNames from '../constants/errors.js';
import ConfigEventNames from '../constants/iVXjs.config.events.js';

let errorEvents = new ErrorEventNames();
let configEventNames = new ConfigEventNames();

/**
 * Runs all proceedures to set up a valid iVXjs experience. 
 */
export class Setup {

    /**
     * Adds all information to settings for the modules and 
     * adds the various processors that will create valid 
     * components for a valid iVXjs experience.
     * 
     * @param {object} settings - this experience's settings.
     */
    constructor(settings = {}, Bus, iVXjsLog) {

        /**
         * User defined settings for this experience.
         * 
         * @type {object}
         */
        this.settings = settings;

        /**
         * Module settings as defined in the Modules
         * class
         * 
         * @type {object}
         */
        this.modules = new Modules(settings).modules;

        /**
         * Enhances existing data for setup.
         * 
         * @type {DataProcessor}
         */
        this.DataProcessor = DataProcessor;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;
    }

    /**
     * Runs a quick set up that will produce an iVXjs experience. 
     * It performs all set up tasks available in this order:
     * 1. Get data from a data processor.
     * 2. Validate the data.
     * 3. Add any other plugins for this experience.
     * 
     * @return {Promise} - resolves when the set up is done.
     */
    runSetup() {
        let self = this;
        let setUpPromise = new Promise((resolve, reject) => {
            self.resolveSetupProcesses(resolve, reject);
        });

        return setUpPromise;
    }

    resolveSetupProcesses(resolve, reject) {
        let self = this;
        let {iVXjsLog} = this;

        this.setupData() 
            .then(
            function validateExperience(experienceData) {
                let validation = self.runValidation(experienceData);

                if(!validation.valid){
                    let {error} = validation;

                    self.Bus.emit(configEventNames.NOT_VALID, validation);
                    iVXjsLog.error(error, "VALIDATION");
                } else {
                    let updatedExperienceData = self.setupModules(experienceData);
                    iVXjsLog.log("MODULE SUCCESS");
                    resolve(updatedExperienceData);     
                }             
            });
    }

    /**
     * Makes sure the data provided is valid to create an iVXjs Experience
     * 
     * @param {object} experienceData - data to run an experience
     * @return {Promise} - resolves once all validation of this data is finished.
     */
    runValidation(experienceData) {
        let {validation : validationType = 'iVXjsValidation'} = experienceData;
        let validationModules = new RegisteredValidationModules();

        return new validationModules[validationType](experienceData);
    }

    /**
     * Enhances user configurations and provide data.
     * 
     * @return {Promise} - indicates data enhancement finishes and was successful
     */
    setupData() {
        let moduleData = this.modules.data;
        let settings = this.settings;

        return new this.DataProcessor(moduleData, settings, this.Bus, this.iVXjsLog).getData();
    }

    /**
     * Runs all processes that require validated data if using
     * the runSetup function.
     * 
     * @param {object} experienceData - enhanced and validated data.
     * @param {Promise} - indicates all plugins/optional modules have loaded
     * their dependencies correctly.
     */
    setupModules(experienceData) {
        let theseUIModules = new RegisteredUIModules();
        let {ui = 'default'} = experienceData;

        delete experienceData.data;
        delete experienceData.validator;

        experienceData.video = new RegisteredVideoModules();
        experienceData.ui = new theseUIModules[ui]();
        experienceData.audio = new RegisteredAudioModules().html5;

        return experienceData;
    }

};