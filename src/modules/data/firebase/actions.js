import FirebaseAuthentication from "../../../constants/firebase.authentication.js";
import FirebaseEvents from "../../../constants/firebase.events.js";
import {ObjectParsers, TypeValidator} from "../../../utilities/type-parsers.js";
import StateEventNames from "../../../constants/state.events.js";
import FirebaseUtilities from "./utilities.js";

let objectParser = new ObjectParsers();
let typeValidator = new TypeValidator();
let utitlities = new FirebaseUtilities();

export default class {
    constructor(iVXjsLog) {
        this.iVXjsLog = iVXjsLog;
        this.authConstants = new FirebaseAuthentication();
        this.stateEventNames = new StateEventNames();
        this.eventConstants = new FirebaseEvents();
       
    }

    get experienceActions() {
        return {
            authorizeUser: this.authorizeUser,
            eventListeners: this.eventListeners,
            signInUser: this.signInUser,
            signOutUser: this.signOutUser,
            signInWithGoogle: this.signInWithGoogle,
            signInWithFacebook: this.signInWithFacebook,
            signInWithTwitter: this.signInWithTwitter,
            signInWithEmail: this.signInWithEmail,
            signInWithGithub: this.signInWithGithub,
            signInAnonymously: this.signInAnonymously,
            handleRedirect: this.handleRedirect,
            setUpUsers: this.setUpUsers,
            setData: this.setData,
            authConstants: this.authConstants,
            stateEventNames: this.stateEventNames,
            uploadFile: this.uploadFile,
            isRestricted: this.isRestricted,
            addEventListeners: this.addEventListners,
            createExperience: this.createExperience,
            getExternalTemplates: this.getExternalTemplates
        }
    }

    getExternalTemplates(templatePath) {
        if (this.localTemplates || !templatePath) return;

        var storage = firebase.storage();
        var pathReference = storage.ref(templatePath);

        return pathReference.getDownloadURL();
    }

    uploadFile(file) {
        let currentUser = firebase.auth().currentUser;
        let {name: fileName} = file;

        if (currentUser) {
            let {uid} = currentUser;
            var storageRef = firebase.storage().ref(`/${uid}/${fileName}`);
            let promise = storageRef.put(file);
            return promise;
        }

    }

    createExperience(eventObj) {
        let {data:defaultData = {}} = eventObj;
        let {experiencePath, data, src} = this;
        let database = firebase.database();
        let self = this;
        let createExperiencePromise = new Promise((resolve, reject) => {

            self.Bus.once(self.stateEventNames.GET_STATE, (currentState) => {
                defaultData.src = src;
                defaultData.stateSrc = currentState.data.id;  
               
                let stateData = currentState.data;
                let detokenedPath = utitlities.detokenize(experiencePath, self.user, self, self.iVXjsLog);
                let {currentUser} = firebase.auth();
                if(currentUser){ 
                    defaultData.user = {
                    };
                    defaultData.user[currentUser.uid] = true;
                }
                let newExperienceKey = database.ref(utitlities.detokenize(experiencePath, self.user, self, self.iVXjsLog)).push(defaultData).key;
                let eventConstants = new FirebaseEvents();

                self.key = newExperienceKey;
                self.data = defaultData;


                if (currentUser) {
                    let {uid} = currentUser;

                    database.ref(`users/${uid}`).once('value').then((data) => {
                        let {experiences} = data.val();
                        if (!experiences) {
                            let newExperience = {};

                            newExperience[newExperienceKey] = true;
                            database.ref(`users/${uid}`).update({
                                experiences: newExperience
                            });
                        } else {
                            experiences[newExperienceKey] = true;
                            database.ref(`users/${uid}`).update({
                                experiences: experiences
                            });
                            self.Bus.emit(eventConstants.CREATE_EXPERIENCE, data, newExperienceKey, currentUser);
                            resolve(newExperienceKey, currentUser);
                        }
                    });
                } else {
                    self.Bus.emit(eventConstants.CREATE_EXPERIENCE, data, newExperienceKey);
                    resolve(newExperienceKey);
                }

            });

            self.Bus.emit(self.stateEventNames.REQUEST_STATE);


        });

        return createExperiencePromise;

    }

    isRestricted() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function (user) {
                resolve(!user);
            });
        })
    }

    signOutUser() {
        let firebaseAuth = firebase.auth();
        return firebaseAuth.signOut();
    }

    signInWithGithub(args, resolve) {
        let self = this;
        let provider = new firebase.auth.GithubAuthProvider();
        let {key: experienceKey} = this;
        let firebaseAuth = firebase.auth();

        this.Bus.once(this.stateEventNames.GET_STATE, (currentState) => {
            let stateData = currentState.data;
            self.handleRedirect(stateData, provider);
        });

        this.Bus.emit(this.stateEventNames.REQUEST_STATE);
    }

    signInAnonymously(args, resolve) {
        let {key: experienceKey} = this;
        let firebaseAuth = firebase.auth();

        firebaseAuth.signInAnonymously().catch((error) => {

        })

    }

    handleRedirect(stateData, provider, args) {
        let {scope = []} = args;

        scope.forEach((thisScope, index) => {
            if (provider.addScope) {
                provider.addScope(thisScope);
            }
        })
        stateData.key = this.key;

        if (localStorage) {
            localStorage.redirectOrigin = JSON.stringify(stateData);
        }

        firebase.auth().signInWithRedirect(provider);
    }

    signInWithGoogle(args, resolve) {
        let self = this;
        let {key: experienceKey} = this;
        let provider = new firebase.auth.GoogleAuthProvider();
        let newExperience = {};
        newExperience[experienceKey] = true;

        this.Bus.once(this.stateEventNames.GET_STATE, (currentState) => {
            let stateData = currentState.data;
            self.handleRedirect(stateData, provider, args);
        });

        this.Bus.emit(this.stateEventNames.REQUEST_STATE);
    }

    signInWithTwitter(args, resolve) {
        let self = this;
        let provider = new firebase.auth.TwitterAuthProvider();
        let {key: experienceKey} = this;

        this.Bus.once(this.stateEventNames.GET_STATE, (currentState) => {
            let stateData = currentState.data;
            self.handleRedirect(stateData, provider);
        });

        this.Bus.emit(this.stateEventNames.REQUEST_STATE);


    }

    signInWithFacebook(args, resolve) {
        let self = this;
        let provider = new firebase.auth.FacebookAuthProvider();
        let {key: experienceKey} = this;

        this.Bus.once(this.stateEventNames.GET_STATE, (currentState) => {
            let stateData = currentState.data;
            self.handleRedirect(stateData, provider);
        });

        this.Bus.emit(this.stateEventNames.REQUEST_STATE);
    }

    setUpUsers(user, experienceKey, resolve) {
        firebase.database().ref('users/' + user.uid).update({
            email: user.email
        });
        firebase.database().ref('users/' + user.uid + '/experiences/' + experienceKey).set(true);

        resolve(user);
    }

    signInWithEmail(args, resolve) {
        let self = this;
        let {key: experienceKey} = this;

        this.Bus.once(this.authConstants.GET_PASSWORD, getPassword);

        function getPassword(password) {
            let {emailKey} = args;
            let {data} = self;
            let email = data[emailKey];

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function (result) {
                    self.setUpUsers(result, experienceKey, resolve);

                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...

                    console.log(error.code);
                });
        }

        this.Bus.emit(this.authConstants.REQUEST_PASSWORD);
    }

    signInUser(signInType, args, resolve) {
        switch (signInType) {
            case "google":
                this.signInWithGoogle(args, resolve);
                return;
            case "email":
                this.signInWithEmail(args, resolve);
                return;
            case "facebook":
                this.signInWithFacebook(args, resolve);
                return;
            case "twitter":
                this.signInWithTwitter(args, resolve);
                return;
            case "github":
                this.signInWithGithub(args, resolve);
                return;
            case "anonymous":
                this.signInAnonymously(args, resolve);
        }

        resolve();

    }


    authorizeUser(eventObj) {
        let {authType} = eventObj;
        let self = this;
        let {key: experienceKey} = self;
        let authPromise = new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    let {uid, email = "", displayName} = user;

                    firebase.database().ref('users/' + user.uid).update({
                        email: user.email
                    });

                    if (experienceKey) {
                        firebase.database().ref(`users/${user.uid}/experiences/${experienceKey}`).set(true);
                    }

                    self.data.user = { uid, email, displayName };

                    resolve(user);
                } else {
                    self.signInUser(authType, eventObj, resolve);
                }
            });
        });

        return authPromise;

    }

    setData(eventObj) {
        let self = this;
        let database = firebase.database();
        let {data = {}, key: experienceKey, auth, iVXjsLog, experiencePath} = self;
        let {key, value, ref, user = false} = eventObj;
        let updateData = {};
        let currentUser = firebase.auth().currentUser;
        let refPath = utitlities.detokenize(`${experiencePath}/$x.key`, self.user, self, iVXjsLog);


        if (!ref && !experienceKey && !user) {
            return;
        }

        if (!currentUser && user) {
            iVXjsLog.warn(`Authorization Required. Key: ${key} Value: ${value} was not saved to the Firebase Database.`);
            return;
        }

        updateData[key] = value;

        if (currentUser && user) {
            let {uid} = currentUser;

            return database.ref(`users/${uid}`)
                .update(updateData)
                .then(() => {
                    self.user[key] = value;
                });
        }

        if (ref) {
            let detokenedRef = utitlities.detokenize(ref, self.user, self, iVXjsLog);

            if (detokenedRef) {
                return database.ref(detokenedRef)
                    .update(updateData)
                    .then(() => {

                    });
            }

        }

        if (refPath) {
            return database.ref(refPath).update(updateData)
                .then(() => {
                    self.data[key] = value;
                });
        }

        return new Promise((resolve, reject) => { resolve() });
    }
}