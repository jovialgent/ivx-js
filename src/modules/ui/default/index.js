// Form/Input HTML
import { Form } from './form.js';
import { Anchor } from './anchor.js';
import { Buttons } from './buttons.js';
import { Checkbox } from './checkbox.js';
import { Date } from './date.js';
import { DatetimeLocal } from './datetime-local.js';
import { Email } from './email.js';
import { Number } from './number.js';
import { Options } from "./options.js";
import { Radio } from "./radio.js";
import { Text } from './text.js';
import { Textarea } from './textarea.js';
import { Url } from './url.js';

//States
import { InputState } from './state.input.js';
import { VideoState } from './state.video.js';
import { NavigationState } from './state.navigation.js';

//Controls 
import VideoControls from './video.controls.js';

/**
 * Registers all the various default UI classes to 
 * this class to be used by various renders.
 */
export class DefaultUI {

    /**
     * By default, this UI framework should support the following inputs:
     * 
     * * form
     * * button 
     * * checkbox
     * * date
     * * datetime-local 
     * * email 
     * * number 
     * * select/options 
     * * radio buttons 
     * * text 
     * * textarea 
     * * url 
     * * video.controls
     * 
     * Provide the html for the following state types:
     * 
     * * input 
     * * video
     * 
     * 
     */
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
        this.text = Text;
        this.textarea = Textarea;
        this.url = Url;
        this.videoControls = VideoControls;
        this.states = {
            input : InputState,
            video : VideoState,
            navigation: NavigationState
        }
    }
}