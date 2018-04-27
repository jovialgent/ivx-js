export class Directive {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getSetMilestoneEventObj);

            function _getSetMilestoneEventObj() {
                const { ivxSetMilestone: milestone } = iAttrs;

                return {
                    eventName: "setMilestone",
                    args: {
                        milestone
                    }
                }
            };
        }
    }
}

Directive.$inject = ["iVXjs", "iVXjsActionTemplateService"];

export default class {
    constructor(app, opts) {
        let { factoryFunctionCreator } = opts;

        app
            .directive('ivxSetMilestone', factoryFunctionCreator(Directive));
    }
}