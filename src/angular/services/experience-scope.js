import factoryFunctionCreator from "../utilities/create-factory-function";

export class Service {
    constructor(iVXjs) {
        Object.assign(this, {
            iVXjs
        });
    }

    setScopeExperience($scope) {
        if (!this.iVXjs) return;

        const { data = {} } = this.iVXjs.experience;

        return Object.assign($scope, {
            experience: {
                data
            }
        })
    }
}

Service.$inject = ['iVXjs'];

export default angular.module('ivx-js.services.scope-experience', [])
    .service('ivxExperienceScope', factoryFunctionCreator(Service))
    .name;