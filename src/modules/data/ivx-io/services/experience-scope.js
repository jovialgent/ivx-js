export class Service {
    constructor(iVXjs) {


    }

    setScopeExperience(experience) {
        
    }
}

Service.$inject = ['iVXjs'];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .directive('ivxExperienceScope', factoryFunctionCreator(Service));
    }
} 
