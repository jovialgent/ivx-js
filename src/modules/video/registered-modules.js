// Types
import { Html5 } from './types/html5.js';
import { YouTube } from './types/youTube.js';
import { Vimeo } from './types/vimeo.js';

export class RegisteredVideoModules  {
    constructor(){
        this.youtube = YouTube;
        this.html5 = Html5;
        this.vimeo = Vimeo
    }  
};