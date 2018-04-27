
import { ObjectParsers } from '../utilities/type-parsers.js';
import iVXPageSetUp from './utilities/container-setup.js';
import AngularEventNames from '../constants/angular.events.js';

const objectParsers = new ObjectParsers();
const angularEventNames = new AngularEventNames();

export default function (iVXjs) {
    let stateAudio = new iVXjs.audio('body', 'state-audio');
    let experienceAudio = new iVXjs.audio('body', 'experience-audio');

    angular
        .module('ivx-js')
        .constant('ivxjs.modules.video', iVXjs.video)
        .constant('ivxjs.modules.ui', iVXjs.ui)
        .constant('ivxjs.log', iVXjs.log)
        .constant('ivxjs.modules.audio', stateAudio)
        .constant('ivxjs.modules.audio.experience', experienceAudio)

    objectParsers.mapKeys(iVXjs.ui.angular, (value, key) => {
        angular.module('ivx-js').directive(key, value);
    });

    if (iVXjs.experience.addEventListeners) {
        iVXjs.experience.addEventListeners(iVXjs.Bus, iVXjs.experience);
    }


    var pageSetup = new iVXPageSetUp(iVXjs.config.selector, iVXjs.config.template);

    angular.bootstrap(iVXjs.config.bootstrapSelector ? document.querySelector(iVXjs.config.bootstrapSelector) : document, ['ivx-js']);
    iVXjs.Bus.emit(angularEventNames.BOOTSTRAPPED);
}