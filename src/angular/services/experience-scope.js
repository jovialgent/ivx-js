export class Service {
    constructor(iVXjs) {


    }

    setScopeExperience(experience) {
        let {data} = experience;
        
        return {
            data
        }
    }
}

Service.$inject = ['iVXjs'];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .service('ivxExperienceScope', factoryFunctionCreator(Service));
    }
}