import {BasicUI} from './default/index.js';
import {SemanticUI} from './semantic-ui/index.js';
import {BootstrapUI} from './bootstrap/index.js';

export class RegisteredUIModules{
    constructor(){
        this.default = BasicUI;
        this.semanticUI = SemanticUI;
        this.bootstrap = BootstrapUI;
    }
};