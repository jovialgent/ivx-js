import iVXjsSetUp from "./ivxjs.setup";
import StateCreator from "./state-creator"; 

export default angular.module('ivx-js.providers', [
    iVXjsSetUp,
    StateCreator
]).name