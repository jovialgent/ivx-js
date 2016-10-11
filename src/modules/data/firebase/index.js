import { ObjectParsers } from '../../../utilities/type-parsers.js';
import ConfigEventNames from '../../../constants/iVXjs.config.events.js';
import StateEventNames from '../../../constants/state.events.js';
import FirebaseAuthentication from '../../../constants/firebase.authentication.js';
import { Actions as iVXjsActions } from '../ivx-js/actions.js';
import { Rules as FirebaseRules } from './rules.js';
import FirebaseUtilities from "./utilities.js";
import Actions from "./actions.js";

let defaultActions = new iVXjsActions();
let myObjectParser = new ObjectParsers();
let utilities = new FirebaseUtilities();

export class FirebaseData {
    constructor(moduleSettings = {}, iVXjsSettings = {}, Bus, iVXjsLog) {
        let {data, experience: defaultExperience} = iVXjsSettings;
        let {data: defaultExperienceData = {}} = defaultExperience;
        let {apiKey, authDomain, databaseURL, storageBucket, auth = false, createExperienceOnLoad = true, experiencePath = "experiences", localTemplates = false, templateRef} = data;

        this.iVXjsSettings = iVXjsSettings;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;

        // Initialize Firebase
        let config = {
            apiKey: apiKey,
            authDomain: authDomain,
            databaseURL: databaseURL,
            storageBucket: storageBucket
        };

        firebase.initializeApp(config);

        this.auth = auth;
        this.databaseURL = databaseURL;
        this.firebaseConstants = new FirebaseAuthentication();
        this.createExperienceOnLoad = createExperienceOnLoad;
        this.experiencePath = experiencePath;
        this.localTemplates = localTemplates;
        this.defaultExperience = defaultExperience;
        this.templateRef = templateRef;
    }

    setUpExperience(dataFromServer, src, resolve) {
        let {auth, createExperienceOnLoad, defaultExperience} = this;
        let {experiencePath, localTemplates, templateRef} = this;
        let {firebaseConstants, iVXjsLog} = this;
        let self = this;
        let database = firebase.database();
        let {experience: modifiedExperience = {}, rules: customRules, ui = 'default', validation = 'iVXjsValidation'} = this.iVXjsSettings;
        let experience = myObjectParser.merge(new iVXjsActions(), modifiedExperience);
        let firebaseExperience = myObjectParser.merge(experience, new Actions(this.iVXjsLog).experienceActions);
        experience.experiencePath = experiencePath;

        if (!localTemplates) {
            utilities.addRemoteTemplates(dataFromServer, templateRef)
            .then((configData) =>{
            });
        } else{
             initializeExperience(dataFromServer);

        }
       
        function initializeExperience(configData) {
            firebase.auth().getRedirectResult().then((data) => {
                let {user: redirectUser} = data;

                if (!createExperienceOnLoad) {
                    sendConfigData(configData);
                    return;
                }

                if (!redirectUser || !localStorage) {
                    createExperience(configData);
                } else {
                    let {redirectOrigin} = localStorage;
                    let exisitingExperienceData = JSON.parse(redirectOrigin);
                    let {user, crediential} = data;

                    setUpExistingExperience(user, exisitingExperienceData, configData);
                }
            })
                .catch((error) => {
                    self.Bus.emit(firebaseConstants.ACCOUNT_EXISTS, error);
                    console.dir(error);
                    let errorMessage = {
                        message: `Firebase couldn't authenticate with email, ${error.email}, due to error code ${error.code}. 
            You can handle this error by listening for event: ${firebaseConstants.ACCOUNT_EXISTS}.`,
                        type: "FIREBASE:AUTHENTICATION"
                    }
                    iVXjsLog.error(errorMessage, "Firebase")
                });

        }

        function sendConfigData(configData) {
            let user = firebase.auth().currentUser;

            experience.src = src;
            experience.user = user;
            experience.iVXjsLog = self.iVXjsLog;

            let enhanced = {
                config: configData,
                experience: firebaseExperience,
                rules: new FirebaseRules(experience, customRules).rules,
            }

            resolve(enhanced)

        }

        function setUpExistingExperience(user, exisitingExperienceData, configData) {
            let {key, next} = exisitingExperienceData;
            experience.key = key;
            experience.user = user;
            experience.iVXjsLog = self.iVXjsLog;

            self.Bus.once(new ConfigEventNames().VALIDATED, (iVXjs) => {
                iVXjs.experience.goToNextState({ next });
            });

            let enhanced = {
                config: configData,
                experience: firebaseExperience,
                rules: new FirebaseRules(experience, customRules).rules,
            }

            database.ref(`users/${user.uid}`).once('value').then((data) => {

                if (data.val() === null) {
                    let newUsers = {};

                    newUsers[user.uid] = {
                        email: user.email
                    };

                    database.ref(`users`).set(newUsers).then((userData) => {
                        addExperienceToUser(user, key, resolve, enhanced);
                    });
                } else {
                    let currentUserData = data.val();

                    currentUserData.uid = user.uid;

                    addExperienceToUser(currentUserData, key, resolve, enhanced);
                }
            });

        }

        function createExperience(configData) {
            let user = firebase.auth().currentUser;
            let newExperienceData = {
                src
            };
            let detokenedExperiencePath = utilities.detokenize(experiencePath, user, defaultExperience);
            let newExperienceKey;

            if (user) {
                newExperienceData.user = {};
                newExperienceData.user[user.uid] = true;
                experience.user = user;
            }

            if (detokenedExperiencePath) {
                newExperienceKey = firebase.database().ref(detokenedExperiencePath).push(newExperienceData).key;
            }

            experience.key = newExperienceKey;
            experience.auth = auth;
            experience.src = src;
            experience.iVXjsLog = self.iVXjsLog;

            let enhanced = {
                config: configData,
                experience: firebaseExperience,
                rules: new FirebaseRules(experience, customRules).rules,
            }

            if (user && detokenedExperiencePath) {
                experience.user = user;

                database.ref(`users/${user.uid}`).once('value').then((data) => {
                    if (data.val() === null) {
                        let newUsers = {};
                        let newUserData = {
                            email: user.email,
                            name: user.displayName,
                            photoURL: user.photoURL,
                            uid: user.uid
                        }
                        newUsers[user.uid] = newUserData;

                        database.ref(`users`).set(newUsers).then((userData) => {
                            addExperienceToUser(newUserData, newExperienceKey, resolve, enhanced);
                        });
                    } else {
                        let currentUserDataFromServer = data.val();
                        let {uid = user.uid, email = user.email, name = user.displayName, avatar = user.photoURL, experiences = {}} = currentUserDataFromServer;
                        let currentUserData = {
                            uid,
                            email,
                            name,
                            avatar,
                            experiences
                        };

                        addExperienceToUser(currentUserData, newExperienceKey, resolve, enhanced);
                    }
                });

                return;
            }

            resolve(enhanced);
        }

        function addExperienceToUser(userData, experienceKey, resolve, enhanced) {
            let {experiences = {}, uid} = userData;

            delete userData.uid;

            experiences[experienceKey] = true;
            userData.experiences = experiences;
            database.ref(`users/${uid}`).update(userData);

            resolve(enhanced);
        }
    }

    enhance() {
        let self = this;
        let {auth, iVXjsSettings, databaseURL} = self;
        let {config} = iVXjsSettings;
        let database = firebase.database();
        let enhancePromise = new Promise((resolve, reject) => {
            database.ref(config).once('value').then((data) => {
                self.setUpExperience(data.val(), config, resolve);
            })
        });

        return enhancePromise;
    }
}

module.export = initializeFirebase;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.data.firebase', initializeFirebase)
        .provider('iVXjsFirebaseUtilities', function iVXjsFirebaseUtilitiesProvider() {
            this.utilities = new FirebaseUtilities();
            this.$get = () => { };
        });
}

function initializeFirebase(settings) {
    settings.module = FirebaseData;

    return settings;
};