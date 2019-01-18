import {InputState as BasicInputState} from '../basic/state.input.js';

export class InputState extends BasicInputState { 
    constructor(header, formSection, footer, data){
        super(header, formSection, footer, data);
    }
    
    get defaultSectionClasses(){
        return 'ui container';
    }
    
    get defaultHeaderClasses(){
        return 'ui header';
    }  
};