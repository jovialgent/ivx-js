import StateRegisterDecorator from "./state-register.decorator";

export default () => {
    angular
        .module('app')
        .config(($provide) => {
            "ngInject";

            $provide.decorator("iVXjsStateRegister", StateRegisterDecorator);
        });
}

