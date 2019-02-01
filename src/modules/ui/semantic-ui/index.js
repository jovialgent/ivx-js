// Form/Input HTML
import { Form } from './form.js';
import { Anchor } from './anchor.js';
import { Buttons } from './buttons.js';
import { Checkbox } from './checkbox.js';
import { Date } from './date.js';
import { DatetimeLocal } from './datetime-local.js';
import { Dropdown } from './dropdown.js';
import { Email } from './email.js';
import { Number } from './number.js';
import { Options } from "./options.js";
import { Radio } from "./radio.js";
import { Style } from "./style.js";
import { Text } from './text.js';
import { Textarea } from './textarea.js';
import { Url } from './url.js';

//Angular
import ivxjsSemanticUiDropdownInput from './angular/directives/input.dropdown.js';
import ivxjsSemanticUiCard from './angular/directives/element.card.js';

//States
import { InputState } from './state.input.js';
import { VideoState } from './state.video.js';
import { NavigationState } from './state.navigation.js';

//Controls 
import VideoControls from './video.controls.js';

export class SemanticUI {
    constructor() {
        this.form = Form;
        this.anchor = Anchor;
        this.buttons = Buttons;
        this.checkbox = Checkbox;
        this.date = Date;
        this.datetimeLocal = DatetimeLocal;
        this.email = Email;
        this.number = Number;
        this.options = Options;
        this.radio = Radio;    
        this.style = new Style();
        this.text = Text;
        this.textarea = Textarea;
        this.url = Url;
        this.dropdown = Dropdown;
        this.videoControls = VideoControls;
        this.states = {
            input : InputState,
            video : VideoState,
            navigation : NavigationState
        }
        this.angular = {
            ivxjsSemanticUiDropdownInput : ivxjsSemanticUiDropdownInput,
            ivxjsSemanticUiCard : ivxjsSemanticUiCard
           
        }
    }
};


module.export = initializeSemanticUI;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('ivxjs.modules.ui', new SemanticUI())
        .constant('iVXjsUIModule', new SemanticUI());
}


function initializeSemanticUI(){
    return SemanticUI
}