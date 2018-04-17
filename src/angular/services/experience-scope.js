import factoryFunctionCreator from "../utilities/create-factory-function";

export class Service {
    constructor(iVXjs) {


    }

    setScopeExperience(experience) {
        let { data } = experience;

        return {
            data
        }
    }
}

Service.$inject = ['iVXjs'];

export default angular.module('ivx-js.services.scope-experience', [])
    .service('ivxExperienceScope', factoryFunctionCreator(Service))
    .name;