import iVXjsConstants from "../../constants/registered-constants.js";
import factoryFunctionCreator from "../utilities/create-factory-function";


export default angular.module('ivx-js.constants', [])
    .constant('ivxjs.constants', new iVXjsConstants())
    .constant('factoryFunctionCreator', factoryFunctionCreator)
    .name