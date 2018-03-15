export class Directive {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getSetConvertedEventObj);
            
            function _getSetConvertedEventObj() {
                let { ivxSetConverted: label } = iAttrs;

                return {
                    eventName: "setConverted",
                    args: {
                        label
                    }
                };
            }
        }
    }
}

Directive.$inject = ["iVXjs", "iVXjsActionTemplateService"];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .directive('ivxSetConverted', factoryFunctionCreator(Directive));
    }
}