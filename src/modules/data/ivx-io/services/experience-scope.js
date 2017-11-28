export class Service {
    constructor(iVXjs) {


    }

    setScopeExperience(experience) {
        console.log("GOT TO IVXIO SERVICE")
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
