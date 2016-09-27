import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import FirebaseAuthentication from "../../../../../constants/firebase.authentication.js";
import { InputControllerHelper } from '../../../../../angular/utilities/input-controller.js';

let FirebaseAuthenticationConstants = new FirebaseAuthentication();
class PasswordInputController extends InputControllerHelper {
    constructor($scope, iVXjs, iVXjsActions) {
        super($scope, iVXjs, iVXjsActions);
        let self = this;

        this.setPassword = (inputValue) =>{
            this.password = inputValue;
        }
        
        iVXjs.Bus.once(FirebaseAuthenticationConstants.REQUEST_PASSWORD, () =>{
            iVXjs.Bus.emit(FirebaseAuthenticationConstants.GET_PASSWORD, self.password);
        });
    }
}

PasswordInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

export default createFactoryFunction(PasswordInputController)