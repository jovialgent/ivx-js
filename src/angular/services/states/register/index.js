import StateRegisterService from "./state-register.service";
import ParentControllerService from "./parent-controller";
import EmbeddedontrollerService from "./embedded-controller";

export default angular.module('ivx-js.services.states.register', [
    ParentControllerService,
    EmbeddedontrollerService
])
    .service('iVXjsStateRegister', StateRegisterService)
    .name;