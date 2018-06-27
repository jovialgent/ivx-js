import AudioEventNames from "../../../constants/audio.events.js";
import StateEventNames from "../../../constants/state.events.js";


/**
 * Creates and runs all actions for this experience. An action
 * is any process that needs to return a promise indicating that 
 * it finished.
 */
export class Actions {

    /**
     * Creates a default data object to be used by various
     * 
     */
    constructor() {

        /**
         * An empty data object that will be used to set and 
         * record data using this setData function.
         * @type {Object}
         */
        this.data = {};
        this.audioEventNames = new AudioEventNames();
        this.stateEventNames = new StateEventNames();
    }

    /**
     * Sets classes on an element that will cause the element to animate.
     * @param {HTMLNode} element - element for the class to be set
     * @param {Object} eventObj - animation event data.
     * @return {HTMLNode} the element with the classes replaced.  
     */
    setElementClasses(element, eventObj) {
        const { animationClasses = "" } = eventObj;
        const { animationClasses: oldAnimationClasses = "" } = element;
        const classesToAdd = animationClasses.split(" ");
        const classesToRemove = oldAnimationClasses.split(" ");

        if (element.className.indexOf('hide') >= 0) {
            element.className = element.className.replace('hide', animationClasses);
            return;
        }

        classesToRemove.forEach(classToRemove => {
            if (classToRemove.length > 0) {
                element.classList.remove(classToRemove);
            }
        });

        classesToAdd.forEach(classToAdd => {
            if (classToAdd.length > 0) {
                element.classList.add(classToAdd);
            }
        });

        element.animationClasses = animationClasses;

        return element;
    }

    addClasses(eventObj) {
        const { element: selector, classes = "" } = eventObj;
        const elements = this._getArrayFromAllSelector(selector);
        const classNames = this._getClassNames(classes);

        elements.forEach(element => {

            classNames.forEach(className => {
                element.classList.add(className);
            });
        });
    }

    removeClasses(eventObj) {
        const { element: selector, classes = "" } = eventObj;
        const elements = this._getArrayFromAllSelector(selector);
        const classNames = this._getClassNames(classes);

        elements.forEach(element => {
            classNames.forEach(className => {
                element.classList.remove(className);
            });
        });
    }

    _getClassNames(classes = "") {
        if (!classes || !classes.split) return [];

        return classes.split(' ');
    }
  

    _getArrayFromAllSelector(selector) {
        const elements = document.querySelectorAll(selector);

        if (!elements || elements.length <= 0) return [];

        return Array.from(elements);
    }

    goToNextState(eventObj) {
        let { next: navArray } = eventObj;
        let self = this;
        let nextState = this.rules(navArray);
        let deferred = new Promise((resolve, reject) => {
            if (nextState) {
                this.Bus.emit(self.stateEventNames.GO, { stateId: nextState });
                resolve();
            }
        });

        return deferred;
    }



    /**
     * 
     */
    animateElement(eventObj) {
        let { element } = eventObj;
        let animationElements = document.querySelectorAll(element);

        if (!animationElements || animationElements.length <= 0) return;

        animationElements = Array.from(animationElements);

        animationElements.forEach((animationElement, index) => {
            animationElement = this.setElementClasses(animationElement, eventObj);
        })

        let animateElementPromise = new Promise((resolve, reject) => {
            let animationEnds = [
                'webkitAnimationEnd',
                'mozAnimationEnd',
                'MSAnimationEnd',
                'osanimationend',
                'animationend'
            ];

            animationEnds.forEach((animationEndName) => {
                animationElements.forEach((animationElement, index) => {
                    animationElement.addEventListener(animationEndName, endAnimation);
                })

            });

            function endAnimation(event) {
                animationElements.forEach((animationElement, index) => {
                    animationEnds.forEach((animationEndName) => {
                        animationElement.animationClasses = eventObj.animationClasses;
                        animationElement.removeEventListener(animationEndName, endAnimation);
                    });
                })

                resolve();
            }
        });

        return animateElementPromise;
    }

    goToState(eventObj, iVXjsBus) {
        let { state } = eventObj;

        if (iVXjsBus) {
            iVXjsBus.emit(this.stateEventNames.GO, eventObj);
        }
    }

    playAudioClip(eventObj) {
        let { audioEventNames } = this;
        let self = this;

        if (eventObj) {
            this.Bus.emit(audioEventNames.SET_UP, eventObj);
            this.Bus.emit(audioEventNames.PLAY);
        }

        this.Bus.on(audioEventNames.TIME_UPDATE, (currentAudio) => {
            if (currentAudio.id === eventObj.id) {
                currentAudio.runCuePoints(self.processor);
            }
        });

        let audioClipPromise = new Promise((resolve, reject) => {
            self.Bus.once(audioEventNames.ENDED, (currentAudio) => {
                if (currentAudio.id === eventObj.id) {
                    self.processor.resolveActions(eventObj.onEnd, () => {
                        resolve();
                    })

                }
            });
        });

        return audioClipPromise;
    }

    setData(eventObj) {
        let { key, value } = eventObj;
        let self = this;
        let setDataPromise = new Promise((resolve, reject) => {
            self.data[key] = value;


            self.Log.debug(`Current Experience Data`, {
                group: true,
                messages: Object.keys(self.data).map((dataKey, index) => {
                    return {
                        message: `${dataKey}:${self.data[dataKey]}`,
                        data: self.data[dataKey]
                    }
                })
            }, self.data);
            resolve(self);
        })

        return setDataPromise;
    }
};