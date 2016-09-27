import { InputState as DefaultInputState } from '../default/state.input.js';

export class InputState extends DefaultInputState { 
    constructor(header, formSection, footer, data){
        super(header, formSection, footer, data);
    }
}