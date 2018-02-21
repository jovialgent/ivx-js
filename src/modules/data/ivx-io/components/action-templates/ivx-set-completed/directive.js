export class Directive {
    constructor(iVXjs) {
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                event.preventDefault();

                iVXjs.experience.actions.resolveActions([{
                    eventName: "setComplete"
                }], ()=>{
                    
                });
                
            }, false);
        }
    }
}

Directive.$inject = ["iVXjs"];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .directive('ivxSetCompleted', factoryFunctionCreator(Directive));
    }
}