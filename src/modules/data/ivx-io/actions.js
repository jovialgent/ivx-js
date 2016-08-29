import iVXioErrorNames from "../../../constants/iVXio.errors.js";
import Logging from "../../../utilities/logging.js";

let iVXioErrors = new iVXioErrorNames();

/**
 * Adds a layer of transformation to iVXio's host functionality
 * to work with the Action system in iVXjs.
 */
export class iVXioActions {

    /**
     * Pulls the iVXio's experience host that this class 
     * will use to set various experience data.
     * 
     * @param {ExperienceHost} experience - current instance of iVXio's
     * experience host.
     */
    constructor(experience, iVXjsLog = new Logging(false, experience.Bus)) {

        /**
         * The experience host that will perform the 
         * actions to the platform
         * 
         * @type {ExperienceHost}
         */
        this.experience = experience;
        this.iVXjsLog = iVXjsLog;
    }

    /**
     * Translates the "animatePageElement" from the platform to
     * iVXjs's action "animateElement."
     * 
     * @param {object} eventArgs - animate page element's event object 
     * with a target id.
     * 
     * @return {Promise} - indicates the animation to an element is finished.
     */
    animatePageElement(eventArgs) {
        let element = '';

        if (eventArgs.targetID) {
            element = '#' + eventArgs.targetID
        } else {
            element = eventArgs.element;
        }

        return this.experience.animateElement({
            element: element,
            animationClass: eventArgs.animation
        });
    }

    /**
     * The platform utilizes .NET's time format and requires the date 
     * value to be in a specific format for Date/Datetime inputs. 
     * 
     * @param {string} key - experience key to pull the input display.
     * @param {Date} date - the date to transform into .NET safe string.
     * @return {string} - correctly formatted date string for .NET.
     * 
     */
    formatDateForPlatform(key, date) {
        let {inputs} = this.experience.story;
        let input = inputs[key];
        let {display} = input;

        switch (display) {
            case "Date":
                let dateString = `${date.getFullYear()}-${getMonth(date.getMonth())}-${getDate(date.getDate())}`;

                return dateString;
        }

        function getMonth(monthNum) {
            let correctedMonthNum = (monthNum + 1) % 13;

            return correctedMonthNum >= 10 ? correctedMonthNum : `0${correctedMonthNum}`
        }

        function getDate(dateNum) {
            return dateNum >= 10 ? dateNum : `0${dateNum}`;
        }
    }

    /**
     * Sends the custom event in the event args for the 
     * platform to record.
     * 
     * @param {object} eventArgs - all event arguments
     * @param {string} eventArgs.customEvent - event name to be recorded
     * by the platform.
     * @return {Promise} - will indicate if this event was successfully recorded by the platform.
     */
    recordEvent(eventArgs) {
        if (typeof eventArgs === 'object') {
            let {customEvent} = eventArgs;

            try {
                return this.experience.recordEvent(customEvent);
            } catch (e) {
                this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                this.iVXjsLog.error(e, "IVX_IO");
            }
        }
    }

    /**
     * Sends the setConverted event with a label if one is provided.
     * 
     * @param {object} eventArgs - all event arguments
     * @param {string} eventArgs.label - converted label that will be recorded
     * by the platform.
     * @return {Promise} - will indicate if this setConverted was successful by the platform.
     */
    setConverted(eventArgs) {
        if (typeof eventArgs === 'object') {
            let {label} = eventArgs;

            try {
                return this.experience.setConverted(label);
            } catch (e) {
                this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                this.iVXjsLog.error(e, "IVX_IO");
            }
        }
    }

    /**
     * Sends the setCompleted event.
     * 
     * @param {object} eventArgs - all event arguments
     * @return {Promise} - will indicate if this setComplete was successful by the platform.
     */
    setComplete(eventArgs = {}) {
        if (typeof eventArgs === 'object') {
            try {
                return this.experience.setComplete();
            } catch (e) {
                this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                this.iVXjsLog.error(e, "IVX_IO");
            }
        }
    }

    /**
     * Sends the setData event to the platform with the key and  
     * value in the eventArgs.
     * 
     * @param {object} eventArgs - all event arguments
     * @param {string} eventArgs.key - experience data key to be set.
     * @param {string} eventArgs.value - experience data value to be set to.  
     * @return {Promise} - will indicate if this data was successfully updated to the platform.
     */
    setData(eventArgs) {
        if (typeof eventArgs === 'object') {
            let {key, value} = eventArgs;

            if(typeof this.experience.data[key] === 'undefined' || this.experience.data[key] === null){
                this.experience.Bus.emit('iVXjs:iVXio:error:event-not-fired', eventArgs, {message:"iVXjs Error Message: Input not found"});
                this.iVXjsLog.error({ message : 'iVXjs Error Message: Input not found'}, "IVX_IO");
                return;
            }

            if (value instanceof Date) {
                value = this.formatDateForPlatform(key, value);

                return this.experience.setData(key, value);
            }

            try {
                return this.experience.setData(key, value);
            } catch (e) {
                this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                this.iVXjsLog.error(e);
            }
        }
    }

    /**
     * Sends the setMilestone with the milestone defined in the 
     * eventArgs object.
     * 
     * @param {object} eventArgs - holds the milestone to be send to the platform.
     * @param {string} eventArgs.milestone - milestone to be set.
     * @return {Promise} - indicates if this milestone was set on the platform.
     */
    setMilestone(eventArgs) {
        if (typeof eventArgs === 'object') {
            let {milestone} = eventArgs;

            try {
                return this.experience.setMilestone(milestone);
            } catch (e) {
                this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                this.iVXjsLog.error(e, "IVX_IO");
            }
        }
    }
}