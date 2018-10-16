import ExperienceScope from "./experience-scope";

angular
    .module('ivx-js')
    .config(($provide) => {
        "ngInject";
        
        $provide.decorator("ivxExperienceScope", ExperienceScope);
    });
