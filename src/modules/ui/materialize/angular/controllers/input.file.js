import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import FirebaseAuthentication from "../../../../../constants/firebase.authentication.js";
import { InputControllerHelper } from '../../../../../angular/utilities/input-controller.js';

let FirebaseAuthenticationConstants = new FirebaseAuthentication();

class FileInputController {
    constructor($scope, iVXjs, iVXjsActions) {
       
        let self = this;

    }

   
}

FileInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(FileInputController)