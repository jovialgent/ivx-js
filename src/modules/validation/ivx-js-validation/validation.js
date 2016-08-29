export class Validation {
    constructor() {
        this.errors = [];
    }

    get validationArray() {
        return [];
    }

    get valid() {
        let self = this;
        return this.validationArray.reduce((isValid, isPartValid) => {
            if(!isPartValid) return isValid;
            if (typeof isPartValid.valid === 'boolean' && !isPartValid.valid) {
                self.errors.push(isPartValid);
            }
            return isValid && isPartValid.valid;
        }, true);
    }

    addErrors(newErrors) {
        let self = this;
        newErrors.forEach((errorObj) => {
            self.errors.push(errorObj)
        })
    }

};