import { TypeValidator } from '../utilities/type-parsers.js';

let typeValidator = new TypeValidator();

export class ActionProcessor {
    constructor(iVXjs) {

        this.iVXjs = iVXjs;

    }

    resolveActions(actionArray, callback) {
        let self = this;
        let { log } = this.iVXjs;

        if (typeValidator.isEmpty(actionArray)) {

            callback();
            return;

        }

        console.log(actionArray);

        let promises = actionArray.map((actionObj) => {
            self.iVXjs.Bus.emit(actionObj.eventName, actionObj.args);

            if (!typeValidator.isEmpty(actionObj.args)) {
                log.debug(`Event ${actionObj.eventName} was fired.`, {
                    group: true,
                    messages: Object.keys(actionObj.args).map((key, index) => {
                        return {
                            message: `${key}:${actionObj.args[key]}`,
                            data: actionObj.args[key]
                        }
                    })
                });
            } else {
                log.debug(`Event ${actionObj.eventName}`);
            }

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
                console.dir(err);
                self.iVXjs.Bus.emit('iVXjs:iVXio:error:event-not-fired', err);
            });
    }

}