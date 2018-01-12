import { ObjectParsers, TypeValidator } from "../../../utilities/type-parsers.js";

let objectParser = new ObjectParsers();
let typeValidator = new TypeValidator();

export default class {
    constructor() {

    }

    get templateLocations() {
        return {
            input: [
                "header.templateUrl",
                "footer.templateUrl",
                "form.labelTemplateUrl",
                "form.submit.labelTemplateUrl",
                {
                    path: "inputs",
                    templateKey: "labelTemplateUrl",
                    keys: [{
                        path: "buttons",
                        templateKey: "labelTemplateUrl"
                    }, {
                        path: "radioButtons",
                        templateKey: "labelTemplateUrl"
                    }]
                }
            ],
            navigation: [
                "header.templateUrl",
                "footer.templateUrl",
                {
                    path: "links",
                    templateKey: "labelTemplateUrl"
                }
            ],
            html: [
                "templateUrl"
            ],
            video: [
                "header.templateUrl",
                "footer.templateUrl",
                {
                    path: "personalizations",
                    templateKey: "templateUrl"
                }
            ]
        }
    }

    addRemoteTemplates(configData, templateRef) {
        let {templateLocations} = this;
        let newConfigData = JSON.parse(JSON.stringify(configData));
        let {states} = newConfigData;
        let storage = firebase.storage();
        let storageRef = storage.ref('/');

        let templateUrlPromise = new Promise((resolve, reject) => {
            let urlGetPromises = [];
            let urlPaths = [];

            states.forEach((state, stateIndex) => {
                let {type} = state;
                let templateLocation = templateLocations[type];

                templateLocation.forEach((path, index) => {
                    if (typeValidator.isString(path)) {
                        let templateFile = objectParser.getValueFromPath(path, state);

                        if (templateFile) {
                            urlGetPromises.push(storageRef.child(templateFile).getDownloadURL());
                            urlPaths.push(`states.${stateIndex}.${path}`);
                        }

                    } else {

                        let {path: templatePath, keys = []} = path;
                        let keyData = state[templatePath];

                        pullFromTemplatesFromArrays(path, state, urlGetPromises, urlPaths, `states.${stateIndex}`);

                        keys.forEach((key, keyIndex) => {
                            if (Array.isArray(keyData)) {
                                keyData.forEach((thisKeyData, index) => {
                                    pullFromTemplatesFromArrays(key, thisKeyData, urlGetPromises, urlPaths, `states.${stateIndex}.${templatePath}.${keyIndex}`);
                                })
                            }

                        })
                    }

                });
            });

            Promise.all(urlGetPromises).then((result) => {
                newConfigData.templates = result;

                $.support.cors = true;
                $.get(result[0])
                    .then((html) => {
                    })

                resolve(newConfigData);
            }, (error) => {
                console.dir(error);
                reject(error);
            });


        });

        function pullFromTemplatesFromArrays(path, data, urlGetPromises, urlPaths, pathHeader) {
            let {path: templatePath, templateKey, keys = []} = path;
            let templateDataArray = objectParser.getValueFromPath(templatePath, data);

            if (!typeValidator.isEmpty(templateDataArray)) {
                let updatedArray = templateDataArray.map((templateData, index) => {
                    let templateFile = objectParser.getValueFromPath(templateKey, templateData);

                    if (templateFile) {
                        urlGetPromises.push(storageRef.child(templateFile).getDownloadURL());
                        urlPaths.push(`${pathHeader}.${templatePath}.${index}.${templateKey}`);
                    }
                });
            }
        }



        return templateUrlPromise;
    }

    detokenize(ref, user = {}, experience = {}, iVXjsLog = console) {
        let {data, key: experienceKey} = experience;
        let {uid} = user == null ? {} : user;
        let newRef = ref
            .replace(/\$uid/g, (uidValue) => {
                return uid ? uid : uidValue;
            })
            .replace(/\$x.key/g, ($xKey) => {
                return experienceKey ? experienceKey : $xKey;
            })
            .replace(/\$x.data.[a-z,A-Z,0-9]*/g, (searchValue) => {
                let dataValue = objectParser.getValueFromPath(searchValue, experience);
                let validValue = typeValidator.isString(dataValue) || typeValidator.isBoolean(dataValue) || typeValidator.isNumber(dataValue);
                if (validValue) {
                    return dataValue;
                } else {
                    iVXjsLog.warn(`${searchValue} is invalid. Make sure this value is a String, Boolean, or Number.`);
                    return searchValue;
                }

            });

        let hasUID = newRef.indexOf("$uid") >= 0;
        let hasExperienceKey = newRef.indexOf("$x.key") >= 0;
        let hasData = newRef.indexOf("$x.data") >= 0;
        let notValidDetokened = hasUID || hasExperienceKey || hasData;

        if (hasUID) {
            iVXjsLog.warn(`This link can't be detokenized because this path because there is no Authorized User.`);
        }

        if (hasExperienceKey) {
            iVXjsLog.warn(`This link can't be detokenized because this path because there is no active experience.`);
        }

        return notValidDetokened ? !notValidDetokened : newRef;
    }
}