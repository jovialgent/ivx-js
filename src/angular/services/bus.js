import { TypeValidator } from '../../utilities/type-parsers.js';
import createFactoryFunction from '../utilities/create-factory-function.js';

let typeValidator = new TypeValidator();

export class Bus  {
	constructor($rootScope, iVXjs) {
		this.$rootScope = $rootScope;
        this.iVXjs = iVXjs;
	}

    eventNames(){
        return this.iVXjs.Bus;
    }
    
    once(eventName, callback){
        let self = this;
        
        this.iVXjs.Bus.once(eventName, (args) =>{
            callback.apply(this, args);
            
            if(!self.$rootScope.$$phase){
                self.$rootScope.$apply();
            }
        });
            
    }
    
    on(eventName, callback){
        let self = this;
        let {name : fnName = Math.random().toString(36).substring(7)} = callback;    
        let enhancedCallbackString = `
            return function ${fnName}(args){
                callback.apply(this, args);
                
                if(!$rootScope.$$phase){
                    $rootScope.$apply();
                }
            }
        `;
        let enhancedCallback = new Function('callback', '$rootScope', enhancedCallbackString)(callback, this.$rootScope);
   
        this.iVXjs.Bus.on(eventName, enhancedCallback);
        
        return enhancedCallback;     
    }
    
    emit(eventName, ...rest){
        this.iVXjs.Bus.emit(eventName, rest);
    }
    
    removeListener(eventName, callback){
        this.iVXjs.Bus.removeListener(eventName, callback);
    }
}

Bus.$inject = ['$rootScope', 'iVXjs'];

let BusService = createFactoryFunction(Bus);

export {BusService}