// Form/Input HTML
import { Anchor } from './anchor.js';
import { Form } from './form.js';
import { Text } from './text.js';
import { Buttons } from './buttons.js';
import { Checkbox } from './checkbox.js';
import { Options } from "./options.js";
import { Textarea } from './textarea.js';
import { Radio } from './radio.js';
import { Number } from './number.js';
import { Email } from './email.js';
import { Date } from './date.js';
import { Url } from './url.js';
import { DatetimeLocal } from './datetime-local.js';

//States
import { InputState } from './state.input.js';
import { VideoState } from './state.video.js';
import { NavigationState } from "./state.navigation.js";

//Controls 
import VideoControls from './video.controls.js';

export class BootstrapUI {
    constructor() {
        this.anchor = Anchor;
        this.form = Form;
        this.text = Text;
        this.buttons = Buttons;
        this.date = Date;
        this.datetimeLocal = DatetimeLocal;
        this.checkbox = Checkbox;
        this.videoControls = VideoControls;
        this.options = Options;
        this.email = Email;
        this.url = Url;
        this.textarea = Textarea;
        this.radio = Radio;
        this.number = Number;
        this.states = {
            input: InputState,
            video: VideoState,
            navigation : NavigationState
        }
    }
}

module.export = initializeBootstrapUI;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.ui.bootstrap', initializeBootstrapUI);
}

function initializeBootstrapUI(){
    return BootstrapUI;
}