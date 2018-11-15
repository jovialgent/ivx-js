// State Services
import StateRegisterService from "./register";
import StateNavigationService from "./navigation";

//State Time Line Actions
import OnEnterService from "./on-enter";
import OnExitService from "./on-exit";

export default angular.module('ivx-js.services.states', [
    StateRegisterService,
    StateNavigationService,
    OnEnterService,
    OnExitService
]).name;