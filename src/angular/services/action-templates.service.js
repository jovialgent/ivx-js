import { TypeValidator } from "../../utilities/type-parsers";

const typeValidator = new TypeValidator();

class ActionTemplateService {
    constructor($window, iVXjs, iVXjsBus, iVXjsActions) {
        "ngInject";

        Object.assign(this, {
            iVXjs,
            iVXjsBus,
            iVXjsActions,
            $window
        })
    }

    setup($scope, element, attributes, runFunction) {
        const self = this;

        if (runFunction) {
            if (!element.actions) element.actions = [runFunction];
            else element.actions = [...element.actions, runFunction];
        }

        if (element.attr('ivx-action-template-set')) return;

        element.attr('ivx-action-template-set', true);
        element[0].addEventListener('click', (event) => {
            event.preventDefault();

            self._runActionTemplates($scope, element, attributes);
        }, false);
    }

    _runActionTemplates($scope, element, attributes) {
        const { iVXjsActions, iVXjs, $window } = this;
        const attributeKeys = Object.keys(attributes);
        const self = this;
        const eventArray = element.actions.map(action => action());
        const nonNavigationEvents = eventArray.filter(event => event.eventName !== iVXjs.constants.STATE.EVENTS.GO);
        const navigationEvents = eventArray.filter(event => event.eventName === iVXjs.constants.STATE.EVENTS.GO);

        iVXjsActions.resolveActions(nonNavigationEvents, () => {
            const { href, target } = attributes;

            if (navigationEvents.length > 0) {
                iVXjsActions.resolveActions(navigationEvents, () => {

                });

                return;
            }

            if (href && target !== '_blank') {
                $window.location = href;
            }
        });
    }
}


export default angular.module('ivx-js.services.action-template', [])
    .service('iVXjsActionTemplateService', ActionTemplateService)
    .service('ivxjs.action-template.service', ActionTemplateService)
    .name;