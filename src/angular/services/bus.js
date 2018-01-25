import { TypeValidator } from '../../utilities/type-parsers.js';
import createFactoryFunction from '../utilities/create-factory-function.js';

let typeValidator = new TypeValidator();

export class Bus {
    constructor($rootScope, iVXjs) {
        this.$rootScope = $rootScope;
        this.iVXjs = iVXjs;
    }

    eventNames() {
        return this.iVXjs.Bus;
    }

    once(eventName, callback) {
        let self = this;

        this.iVXjs.Bus.once(eventName, (args) => {
            if (Array.isArray(args)) {
                callback.apply(this, args);
            } else {
                var customArgs = Array.prototype.slice.call(arguments);
                callback.apply(this, customArgs);
            }

            if (!self.$rootScope.$$phase) {
                self.$rootScope.$apply();
            }
        });

    }

    on(eventName, callback) {
        let self = this;
        const fnName = Math.random().toString(26).substring(2, 15).replace(/[0-9]/g, '');
        let enhancedCallbackString = `
            return function ${fnName}(args){

                if(Array.isArray(args)){
                    callback.apply(this, args);
                } else {
                    var customArgs = Array.prototype.slice.call(arguments);
                    callback.apply(this, customArgs);
                }
               
                if(!$rootScope.$$phase){
                    $rootScope.$apply();
                }
            }
        `;
        let enhancedCallback = new Function('callback', '$rootScope', enhancedCallbackString)(callback, this.$rootScope);

        this.iVXjs.Bus.on(eventName, enhancedCallback);

        return enhancedCallback;
    }

    emit(eventName, ...rest) {
        this.iVXjs.Bus.emit(eventName, rest);
    }

    removeListener(eventName, callback) {
        this.iVXjs.Bus.removeListener(eventName, callback);
    }
}

Bus.$inject = ['$rootScope', 'iVXjs'];

export default angular.module('ivx-js.services.bus', [])
    .service('ivxjs.bus', createFactoryFunction(Bus))
    .name;