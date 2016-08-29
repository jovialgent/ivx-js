import { iVXio } from './ivx-io/index.js';
import { iVXjsData } from './ivx-js/index.js';

/**
 * Holds instances of all available data modules that 
 * will be used to enhance various user defined settings.
 */
export class RegisteredDataModules  {

    /**
     * Attaches all available data module classes that 
     * can be used by various components.
     */
    constructor(){
        
        /**
         * Enhancements usings the iVX.io platform.
         * 
         * @type {iVXio}
         */
        this.iVXio = iVXio; 
        
        /**
         * Basic enhancements to run an iVXjs experience
         * 
         * @type {iVXjsData}
         */   
        this.iVXjs = iVXjsData;
    }   
};