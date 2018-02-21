export class Directive {
    constructor(iVXjs) {
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                event.preventDefault();
                let { ivxRecordEvent: customEvent } = iAttrs;

                iVXjs.experience.actions.resolveActions([{
                    eventName: "recordEvent",
                    args: {
                        customEvent
                    }
                }], () => {

                })

            }, false);
        }
    }
}

Directive.$inject = ["iVXjs"];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .directive('ivxRecordEvent', factoryFunctionCreator(Directive));
    }
}