import createFactoryFunction from '../../utilities/create-factory-function.js';
import Provider from "./state-creator.provider";


export default angular.module('ivx-js.providers.state-creator', [])
    .provider('ivxjsStateCreator', Provider)
    .name;