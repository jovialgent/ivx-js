import {TypeValidator} from '../utilities/type-parsers.js';

let typeValidator = new TypeValidator();

export class ActionProcessor {
    constructor(iVXjs) {

        this.iVXjs = iVXjs;
    
    }

    resolveActions(actionArray, callback) {
        let self = this;

        if (typeValidator.isEmpty(actionArray)) {

            callback();
            return;

        }

        let promises = actionArray.map((actionObj) => {

            self.iVXjs.Bus.emit(actionObj.eventName, actionObj.args);

            if (self.iVXjs.actions && self.iVXjs.actions[actionObj.eventName]) {

                return self.iVXjs.actions[actionObj.eventName](actionObj.args);

            }

            if (self.iVXjs.experience[actionObj.eventName]) {

                return self.iVXjs.experience[actionObj.eventName](actionObj.args);

            }

        });

        Promise.all(promises)
            .then((experience) => {
                callback();
            })
            .catch(function (err) {
                console.error('iVXjs: NOT ALL ACTIONS RESOLVED');
                self.iVXjs.Bus.emit('iVXjs:iVXio:error:event-not-fired', eventArgs, e);
            });
    }

}