/**
 * Holds the default module settings to run a basic iVXjs
 * experience. 
 */
export class Modules {

    /**
     * Creates a valid modules object in settings to 
     * run a basic iVXjs experience
     * @params {object} settings - user defined settings
     * that will either overwrite or add functionality to
     * this iVXjs experience.
     */
    constructor(settings = {}) {

        /**
         * Settings for this iVXjs experience.
         * 
         * @type {object}
         */
        this.settings = settings;
    }

    /**
     * Default UI settings will create a module containing
     * basic HTML for creating Inputs and States.
     * 
     * @return {object} Settings with type default and dependencies with 
     * a path to the ivxjs.css.
     */
    get defaultUI() {
        return {
            type: "default",
            "dependencies": []
        }
    }

    

    /**
     * Default data settings that will create 
     * a data enhancement that will include the very
     * essentials to run an iVXjs experience
     * 
     * @return {object} Sets data type to iVXjs.
     */
    get defaultData() {
        return {
            type: "iVXjs"
        }
    }

    /**
     * Default validation settings that will create
     * a validation process that validates basic configuration
     * settings.
     * 
     * @return {object} Sets type of validation to iVXjsValidation
     */
    get defaultValidation() {
        return "iVXjsValidation";
    }

    /**
     * Process the settings given to the constructor and creates 
     * a valid module data object that will be used by the Setup class
     * to create an iVXjs modules.
     * 
     * @return {object} - a complete module data object to set up
     * a valid iVXjs experience.
     */
    get modules() {
        let {modules = {}} = this.settings;
        let {defaultVideoTypes} = this;

        let {
            data = this.defaultData,
            ui = 'default',
            validation = 'iVXjsValidation'
        } = this.settings;

        return {
            data: data,
            ui: ui,
            validation: validation
        }


    }
};