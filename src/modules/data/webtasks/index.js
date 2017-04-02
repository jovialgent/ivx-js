import WebTasksServices from './services.js';
import WebTaskActions from "./actions.js";
import { ObjectParsers } from '../../../utilities/type-parsers.js';
import { Rules } from '../ivx-js/rules.js';

let defaultActions = new WebTaskActions();
let services = new WebTasksServices();
let myObjectParser = new ObjectParsers();

export class Webtasks {
    constructor(moduleData, iVXjsSettings = {}, Bus, iVXjsLog) {
        let { config: configPath = "" } = iVXjsSettings;
        let { baseUrl } = iVXjsSettings.data;

        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;
        this.iVXjsSettings = iVXjsSettings;

        this.baseUrl = baseUrl;
        this.configPath = configPath
    }

    setUpExperience(configData, enhanceResolve) {
        let { config, data = {}, experience: modifiedExperience, rules: customRules, ui = 'default', validation = 'iVXjsValidation' } = this.iVXjsSettings;
        let experience = defaultActions;
        let { modules: configModules = {} } = configData;
        let { ui: configUI = ui, validation: configValidation = validation } = configModules;

        if (modifiedExperience) {
            experience = myObjectParser.merge(experience, modifiedExperience);
        }

        let enhanced = {
            experience: experience,
            rules: new Rules(experience, customRules).rules,
            config: configData
        };

        enhanceResolve(enhanced);
    }

    enhance() {
        let self = this;
        let { baseUrl, configPath } = this;

        let configUrl = baseUrl.replace('[PATH]', configPath);
        let webtaskPromise = new Promise((resolve, reject) => {
            services.getConfigJSON(configUrl)
                .then((configData) => {
                    // console.dir(configData);
                    defaultActions = defaultActions.setBaseUrl(baseUrl);

                    self.setUpExperience(configData, resolve)
                })
        });

        return webtaskPromise;
    }
}

module.export = initializeWebTasks;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.data.webtasks', initializeWebTasks);
}

function initializeWebTasks(settings) {
    settings.module = Webtasks;

    return settings;
};