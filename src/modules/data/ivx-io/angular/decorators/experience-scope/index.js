import ExperienceScope from "./experience-scope";


try {
    angular
        .module('ivx-js')
        .config(($provide) => {
            "ngInject";

            $provide.decorator("ivxExperienceScope", ExperienceScope);
        });
} catch (e) {
    console.warn('The iVXio Data Module is not attached to the iVXjs module. If this is correct, ignore this warning.')
    console.warn(e);
}

