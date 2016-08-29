import {DefaultUI} from './default/index.js';
import {SemanticUI} from './semantic-ui/index.js';
import {BootstrapUI} from './bootstrap/index.js';

export class RegisteredUIModules{
    constructor(){
        this.default = DefaultUI;
        this.semanticUI = SemanticUI;
        this.bootstrap = BootstrapUI;
    }
};