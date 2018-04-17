/**
 * Indicates errors for each input based on the 
 * attributes created from the various rendering libraries
 * iVXjs uses. 
 */
export class ErrorMessages {

    /**
     * Brings in all the possible error messages 
     * this input can produce.
     * 
     * @param {Array} errorMessages - list of all possible 
     * error messages with attributes indicating the message 
     * and the conditions in which to show them.
     */
    constructor(errorMessages = []) {

        /**
         * List of all possible error messages.
         * @type {Array}
         */
        this.errorMessages = errorMessages;

    }

    /**
     * Sets the classes for the error message div.
     * @type {String} 
     */
    get messageClasses() {
        return 'error-message';
    }

    /**
     * Set the classes for the container of all error messages.
     * @type {String}
     */
    get containerClasses() {
        return 'error-messages';
    }

    /**
     * Renders the HTML for all error messages and the container with 
     * them. Results:
     * @example
     * <div class="error-messages">
     *    <span class="error-message">MESSAGE</span>
     * </div>
     * @type {String}
     */
    get html() {
        let {errorMessages, messageClasses, containerClasses} = this;
        let errorMessageHTML = errorMessages.reduce((errorMessageHTML, errorMessage, index) => {
            return `${errorMessageHTML}<span class="${messageClasses}" ${errorMessage.attrHTML}>
                    ${errorMessage.message}
                </span>`
        }, '');

        if (errorMessageHTML.length > 0) {
            return `<div class='${containerClasses}'>
                ${errorMessageHTML}
            </div>`
        }

        return '';
    }
}