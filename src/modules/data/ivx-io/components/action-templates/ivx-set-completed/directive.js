export class Directive {
    constructor(iVXjs,iVXjsActionTemplateService) {
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getSetCompletedEventObj);

            function _getSetCompletedEventObj() {
                return {
                    eventName: "setComplete"
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
            .directive('ivxSetCompleted', factoryFunctionCreator(Directive));
    }
}