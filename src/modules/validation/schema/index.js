import {iVXjsValidation} from '../ivx-js-validation/index.js';
import {BaseStructure} from './schemas/base-structure.js';
import {StatesTypes} from './schemas/states.types.js';

export class SchemaValidation {
    constructor(data) {
        this.error = {};
        this.data = data;

        if(!this.hasValidationLibrary.valid){
            this.error = {
                message: this.hasValidationLibrary.error.message,
                data: this.data,
                errors : [this.hasValidationLibrary]
            }
        } else if (!this.valid) {
             this.error = {
                message: this.collectErrorMessages(),
                data: this.data,
                errors : this.errors
             }
        }


    }

    get valid() {
        return this.errors.length <= 0;
    }

    get errors() {
        let {baseValidate, stateTypesValidation, data} = this;
        let {config} = this;
        let self = this;
        let errorArray = [];
        

        baseValidate.errors.forEach((errorObj, index) => {
            errorArray.push(errorObj);
        });

        stateTypesValidation.forEach((errorObj, index) => {
            errorArray.push(errorObj);
        })

        let modifiedErrorArray = errorArray.map((error, index)=>{
            
            return {
                message : self.createErrorMessage(error),
                path : self.createPath(`${error.dataPath}`),
                type: self.getErrorCode(error.code)

            };
        });

        // this.collectErrorMessages(baseValidate.errors);

        return modifiedErrorArray;

    }

    createErrorMessage(error){
        let {code} = error;
        switch(code){
            case 11:
            return createOneOfErrorMessage(error);
            default:
            return error.message;
        }


        function createOneOfErrorMessage(error){
            let {subErrors} = error;
            return subErrors.reduce((errorMessage, subError, index)=>{
                return `${errorMessage}
                ${subError.message}<br>`
            }, `<strong>The data violates ONE of the following requirements:</strong><br>`) ;
        }
    }

    createPath(dataPath){
        let {config} = this.data;
        let pathParts = dataPath.split('/');
        let location = config;
        let path = pathParts.reduce((fullPath, currentPathPart, index) =>{

            if(currentPathPart.length <= 0){
                return fullPath;
            } 

            if(fullPath.length <= 0){
                 location = location[currentPathPart];
                return `${currentPathPart}`;
            }
            
            if(!isNaN(currentPathPart)){
                let locationIndex = parseInt(currentPathPart);
                location = location[locationIndex];
                return `${fullPath}[${currentPathPart}]`;
            } 
            
            location = location[currentPathPart];

            return `${fullPath}.${currentPathPart}`;

        }, '')


        return {
            "pathString" : path,
            "data" : location
        };

    }

    collectErrorMessages() {
        let self = this;

            return this.errors.reduce((errorMessages, error) => {
               
              return `${errorMessages}
        TYPE: ${self.getErrorCode(error.code)}  PATH: ${error.path.pathString} MESSAGE : ${error.message}`
            }, '')
    }

    getErrorCode(errorCode){
        let errorCodes = Object.values(tv4.errorCodes);
        let errorKeys = Object.keys(tv4.errorCodes);
        let errorCodeKey = "";
      
        errorCodes.forEach((thisErrorCode, index) =>{
            if(thisErrorCode === errorCode){
                errorCodeKey = errorKeys[index];
            }
        })

        return errorCodeKey
    }


    get baseValidate() {
        let {config} = this.data;
        return new BaseStructure(config).validate();
    }

    get stateTypesValidation(){
        let {states} = this.data.config;

        return new StatesTypes(states).validate();
    }

    get hasValidationLibrary() {
        return {
            "valid": typeof tv4 !== 'undefined',
            error: {
                "path": "init()",
                "message": "Schema validation required the 'tv4' library (https://github.com/geraintluff/tv4)",
                "type": "missing"
            }
        }
    }

};

module.export = initializeSchemaValidation;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.validation.schema', initializeSchemaValidation)
        .constant('iVXjsValidationSchema', initializeSchemaValidation);
}

function initializeSchemaValidation(settings) {
    return SchemaValidation;
};