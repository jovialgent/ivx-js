import { iVXioActions } from './actions.js'
import { iVXioRules } from './rules.js'
import { Actions as iVXjsActions } from '../ivx-js/actions.js'
import { TypeValidator, ObjectParsers } from '../../../utilities/type-parsers.js';
import { assert } from '../../../utilities/asserts.js';
import InputValidator from "./input-validators/index.js";
import iVXioErrorNames from '../../../constants/iVXio.errors.js';
import factoryFunctionCreator from "./components/factory-function-creator";
import iVXioComponents from "./components/index";

let typeValidator = new TypeValidator()
let objectParser = new ObjectParsers()

/**
 * Generates an iVXio data module that iVXjs can use for 
 * navigation, data setting and progress.
 */
export class iVXio {

  /**
   * Pulls in any module settings and the global settings
   * for this iVXjs experience to set up this iVXio 
   * enhance data object.
   * 
   * @param {object} moduleSettings - settings to be passed in to the 
   * iVXio Expereince host.
   * @param {object} iVXjsSettings - global settings for this iVXjs experience.
   */
  constructor(experienceHostSettings, iVXjsSettings = {}, Bus, iVXjsLog) {

    /**
     * Module settings for iVXio which will be all the settings
     * used with the iVXio's experience host such as story keys and
     * funnels.
     * 
     * @type {object}
     */
    this.experienceHostSettings = experienceHostSettings

    /**
     * Global settings for this iVXjs experience 
     * 
     * @type {object}
     */
    this.iVXjsSettings = iVXjsSettings;
    this.Bus = Bus;
    this.iVXjsLog = iVXjsLog;
  }

  /**
   * Takes the current settings and then enhances the story data 
   * pulled from the iVXio experience host and enhances them to 
   * work with iVXjs.
   * 
   * @return {Promise} - a promise that evaluates whether this experience 
   * was successfully enhanced.
   */
  enhance() {
    let { experienceHostSettings = {}, iVXjsSettings = {} } = this;
    let iVXioErrors = new iVXioErrorNames();
    let self = this
    let enhancementPromise = new Promise((resolve, reject) => {
      if (typeof iVX === 'undefined') {
        window.setTimeout(() => {
          self.Bus.emit(iVXioErrors.PLATFORM_UNAVAILABLE, {});
        }, 100)
        reject();
        return;
      }

      self.Bus.once(iVXioErrors.EXPERIENCE, (error) => {
        reject(error);
      })

      iVX(experienceHostSettings)
        .then(
        (iVX) => {
          if (!iVX || !iVX.experience || !iVX.experience.story || !iVX.experience.story.data) {
            window.setTimeout(() => {
              self.Bus.emit(iVXioErrors.PLATFORM_UNAVAILABLE, {});
            }, 100);
            return;
          }

          let { experience: experienceSettings = {}, rules: customRules } = iVXjsSettings;
          let defaultActions = objectParser.merge(new iVXjsActions(), experienceSettings);
          let experience = objectParser.merge(defaultActions, iVX.experience);
          let modifiedActions = new iVXioActions(experience, this.iVXjsLog);
          let { ui: storyUI, validation: storyValidation } = iVX.experience.story.data;

          iVX.experience.story.data.metadata = iVX.experience.story.data.metadata ? iVX.experience.story.data.metadata : {};

          let rules = new iVXioRules(experience, customRules).rules;
          let states = new InputValidator(iVX.experience.story.data.states, iVX.experience.story.inputs, self, reject, experienceHostSettings.debug).states;

          experience.debugHost = experienceHostSettings.debug;

          experience.whiteList = [
            'self',
            'http://ivx-xapi.*.inf-env.com/**',
            'https://ivx-xapi.*.inf-env.com/**',
            'https://xapi.ivx.io/**'
          ];

          iVX.experience.story.data.states = states;
          iVX.experience.story.data.metadata.title = iVX.experience.story.data.metadata.title ? iVX.experience.story.data.metadata.title : "iVX Story Player";

          let enhancediVXjsSettings = {
            ui: iVXjsSettings.ui,
            validation: iVXjsSettings.validation,
            config: iVX.experience.story.data,
            experience: experience,
            rules: rules,
            actions: modifiedActions
          };

          resolve(enhancediVXjsSettings);
        },
        (error) => {
          self.Bus.emit(iVXioErrors.EXPERIENCE, error);
          reject(error);
        })
    })

    return enhancementPromise
  }
}

module.export = initializeiVXIO;

if (angular) {
  let app = angular.module('ivx-input-validator', []);

  app.constant('validator', InputValidator);

  try {
    let app = angular.module('ivx-js');

    app.constant('iVXjs.data.iVXio', initializeiVXIO);
    app.constant('validator', InputValidator);


    new iVXioComponents(app, { factoryFunctionCreator });
  } catch (e) {
    console.warn('The iVXio Data Module is not attached to the iVXjs module. If this is correct, ignore this warning.')
    console.warn(e);
  }
}

function initializeiVXIO(settings = {}) {
  settings.module = iVXio;

  return settings;
};