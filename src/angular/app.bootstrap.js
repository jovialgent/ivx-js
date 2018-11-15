
import { ObjectParsers } from '../utilities/type-parsers.js';
import iVXPageSetUp from './utilities/container-setup.js';
import AngularEventNames from '../constants/angular.events.js';

const objectParsers = new ObjectParsers();
const angularEventNames = new AngularEventNames();

export default function (iVXjs) {
    const { config = {} } = iVXjs;
    const { metadata = {} } = config;
    const { bootstrap = true } = metadata;

    angular
        .module('ivx-js')
        
    objectParsers.mapKeys(iVXjs.ui.angular, (value, key) => {
        angular.module('ivx-js').directive(key, value);
    });

    if (iVXjs.experience.addEventListeners) {
        iVXjs.experience.addEventListeners(iVXjs.Bus, iVXjs.experience);
    }
    
    if (bootstrap) {
        var pageSetup = new iVXPageSetUp(iVXjs.config.selector, iVXjs.config.template);
        angular.bootstrap(iVXjs.config.bootstrapSelector ? document.querySelector(iVXjs.config.bootstrapSelector) : document, ['ivx-js']);
        iVXjs.Bus.emit(angularEventNames.BOOTSTRAPPED);
    }
}