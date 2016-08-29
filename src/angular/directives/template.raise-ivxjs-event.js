import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class RaiseiVXjsEvent {
    constructor(iVXjs, iVXjsBus) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs)=>{
            
        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) =>{
                event.preventDefault();
                
                let {ivxEvent : eventName} = iAttrs;
                
                iVXjsBus.emit(eventName);
            }, false);
        }        
    }

}

RaiseiVXjsEvent.$inject = ['iVXjs', 'ivxjs.bus'];

export default createFactoryFunction(RaiseiVXjsEvent);
