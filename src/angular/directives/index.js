// Directives

// States
import InputState from './state.input';
import VideoState from './state.video';
import HTMLState from './state.html';
import NavigationState from './state.navigation';

// Inputs
import FormInput from './input.form';
import TextInput from './input.text';
import Anchors from './ui.anchor';
import CascadingOptions from './ui.cascading-options';

import ButtonsInput from './input.buttons';
import EmailInput from './input.email';
import UrlInput from './input.url';
import DateInput from './input.date';
import DateTimeLocalInput from './input.datetime-local';
import OptionsInput from './input.options';
import RadioInput from './input.radio';
import CheckboxInput from './input.checkbox';
import NumberInput from './input.number';
import TextareaInput from './input.textarea';

// Video Players
import YoutubePlayer from './video.youtube';
import HTML5Player from './video.html5';
import VimeoPlayer from './video.vimeo';

// Video Controls

import StandardVideoControls from './video.controls.standard';

//Template Directives 
import SetData from './template.set-data';
import AnimateElement from './template.animate-element';
import GoToState from './template.go-to-state';
import RaiseiVXjsEvent from './template.raise-ivxjs-event';

export default angular.module('ivx-js.directives',[
    InputState,
    ButtonsInput,
    CheckboxInput,
    DateInput,
    DateTimeLocalInput,
    EmailInput,
    FormInput,
    NumberInput,
    OptionsInput,
    RadioInput,
    TextInput,
    TextareaInput,
    UrlInput,
    HTMLState,
    InputState,
    NavigationState,
    VideoState,
    AnimateElement,
    GoToState,
    RaiseiVXjsEvent,
    SetData,
    Anchors,
    CascadingOptions,
    StandardVideoControls,
    HTML5Player,
    VimeoPlayer,
    YoutubePlayer
]).name;