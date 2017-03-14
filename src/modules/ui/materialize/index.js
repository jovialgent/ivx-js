// Form/Input HTML
import { Anchor } from './anchor.js';
import { Form } from './form.js';
import { Text } from './text.js';
import { Buttons } from './buttons.js';
import { Checkbox } from './checkbox.js';
import { Options } from "./options.js";
import { Textarea } from './textarea.js';
import { Password } from './password.js';
import { File } from "./file.js";
import { Range } from "./range.js";
import { Radio } from './radio.js';
import { Style } from "./style.js";
import { Number } from './number.js';
import { Email } from './email.js';
import { Date } from './date.js';
import { Url } from './url.js';
import { DatetimeLocal } from './datetime-local.js';

import ivxjsPasswordInput from "./angular/directives/input.password.js";
import ivxjsFileInput from "./angular/directives/input.file.js";


//States
import { InputState } from './state.input.js';
import { VideoState } from './state.video.js';
import { NavigationState } from './state.navigation.js';

//Controls 
import VideoControls from './video.controls.js';

export class MaterializeUI {
    constructor() {
        this.anchor = Anchor;
        this.form = Form;
        this.text = Text;
        this.buttons = Buttons;
        this.date = Date;
        this.password = Password;
        this.file = File
        this.datetimeLocal = DatetimeLocal;
        this.checkbox = Checkbox;
        this.videoControls = VideoControls;
        this.options = Options;
        this.email = Email;
        this.url = Url;
        this.textarea = Textarea;
        this.range = Range;
        this.radio = Radio;
        this.style = new Style();
        this.number = Number;
        this.states = {
            input: InputState,
            video: VideoState,
            navigation: NavigationState
        }

        this.angular = {
            ivxjsPasswordInput: ivxjsPasswordInput,
            ivxjsFileInput: ivxjsFileInput
        }
    }

    initializeInput() {
        $('select').material_select();
         $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
     
        Materialize.updateTextFields();
    }
}

module.exports = initializeMaterializeUI;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.ui.materialize', initializeMaterializeUI);
}

function initializeMaterializeUI(settings) {
    return MaterializeUI;
};