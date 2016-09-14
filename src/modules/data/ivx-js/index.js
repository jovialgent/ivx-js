import { ObjectParsers } from '../../../utilities/type-parsers.js';
import { Actions } from './actions.js';
import { Rules } from './rules.js';

let defaultActions = new Actions();
let myObjectParser = new ObjectParsers();

export class iVXjsData {
    constructor(moduleSettings = {}, iVXjsSettings = {}, Bus, iVXjsLog) {
        this.moduleSettings = moduleSettings;
        this.iVXjsSettings = iVXjsSettings;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;
    }

    setUpExperience(configData, enhanceResolve) {
        let {config, data = {}, experience: modifiedExperience, rules: customRules, ui = 'default', validation = 'iVXjsValidation'} = this.iVXjsSettings;
        let experience = defaultActions;
        let {modules: configModules = {}} = configData;
        let {ui: configUI = ui, validation: configValidation = validation} = configModules;

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
        let {config} = this.iVXjsSettings;
        let enhancePromise = new Promise((resolve, reject) => {
            if (typeof config === 'string') {
                this.getConfigJSON(config)
                    .then(
                    (configData) => {
                        self.setUpExperience(configData, resolve)
                    },
                    (error) => {
                        reject(error);
                    });
            } else {
                self.setUpExperience(config, resolve);
            }
        });

        return enhancePromise;
    }

    getConfigJSON(url) {
        let xhr = new XMLHttpRequest();
        let self = this;
        let deferred = new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => { 
                self.isValidJSONRequest(resolve, reject, xhr); 
            };
            xhr.open('GET', url);
            xhr.send();
        });

        return deferred;
    }

    isValidJSONRequest(resolve, reject, xhr) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    let responseJSON = JSON.parse(xhr.responseText);
                    resolve(responseJSON)
                } catch (e) {
                    this.Bus.emit('iVX:error:json', e);
                    console.error(e);
                }
            } else {
                reject({ error: 'Config JSON Not Obtained' });
            }
        }
    }
}