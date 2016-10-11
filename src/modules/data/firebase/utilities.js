import {ObjectParsers, TypeValidator} from "../../../utilities/type-parsers.js";

let objectParser = new ObjectParsers();
let typeValidator = new TypeValidator();

export default class{
    constructor(){

    }

    get templateLocations(){
        return {
            input : [
                "header.templateUrl", 
                "footer.templateUrl", 
                "form.labelTemplateUrl",
                "form.submit.labelTemplateUrl",
                {
                    path: "inputs",
                    templateKey : "labelTemplateUrl"
                },
                {
                    path: "inputs.buttons",
                    templateKey : "labelTemplateUrl"
                },
                {
                    path: "inputs.radioButtons",
                    templateKey : "labelTemplateUrl"
                }
            ],
            navigation : [
                "header.templateUrl", 
                "footer.templateUrl", 
                "links.labelTemplateUrl"
            ],
            html : [
                "templateUrl"
            ],
            video : [
                "header.templateUrl", 
                "footer.templateUrl", 
                "personalizations.templateUrl"
            ]
        }
    }

    addRemoteTemplates(configData, templateRef){
        let {templateLocations} = this;
        let {states} = JSON.parse(JSON.stringify(configData));
        let storage = firebase.storage();
        let storageRef = storage.ref(templateRef);
        let templateUrlPromise = new Promise((resolve, reject)=>{
            let urlGetPromises = [];

            states.forEach((state, index)=>{
                let {type} = state;
                let templateLocation = templateLocations[type];

                templateLocation.forEach((path, index) =>{
                    if(typeValidator.isString(path)){
                        console.log(path, objectParser.getValueFromPath(path, state));
                    } else {
                        let {path : templatePath, templateKey} = path;
                        let templateDataArray = objectParser.getValueFromPath(path, state);
                        

                    }
                   
                });
            });
        });

       

        return templateUrlPromise;
    }

    detokenize(ref, user = {}, experience = {}, iVXjsLog = console) {
            let {data, key: experienceKey} = experience;
            let {uid} = user == null ? {} : user;
            let newRef = ref
                .replace(/\$uid/g,  (uidValue) => {
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

            if(hasUID){
                iVXjsLog.warn(`This link can't be detokenized because this path because there is no Authorized User.`);
            }

            if(hasExperienceKey){
                  iVXjsLog.warn(`This link can't be detokenized because this path because there is no active experience.`);
            }

            return notValidDetokened ? !notValidDetokened : newRef;
        }
}