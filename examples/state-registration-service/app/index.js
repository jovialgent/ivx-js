import "../index.html";
import "../index.less";
import config from "./config";
import run from "./run";

import registerStateRegisterDecorator from "./decorators/state-register";

export default (dependencies) => {
    angular
        .module('app', dependencies)
        .config(config)
        .run(run);
        
    // registerStateRegisterDecorator()
}