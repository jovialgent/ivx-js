export class Directive {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getRecordEventEventObj);

            function _getRecordEventEventObj() {
                let { ivxRecordEvent: customEvent } = iAttrs;

                return {
                    eventName: "recordEvent",
                    args: {
                        customEvent
                    }
                }
            }
        }
    }
}

Directive.$inject = ["iVXjs", "iVXjsActionTemplateService"];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .directive('ivxRecordEvent', factoryFunctionCreator(Directive));
    }
}