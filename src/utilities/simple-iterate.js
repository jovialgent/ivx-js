export class SimpleIterate {
    constructor(array) {
        this.clonedArray = this.cloneArray(array);
        this.currentIndex = 0;
        this.done = typeof array === 'undefined' || array.length <= 0;
    }

    cloneArray(array) {
        let self = this;

        if (Array.isArray(array)) {
            let clone = array.slice(0);
            
            clone.forEach((element, index) => {
                element = self.cloneArray(element);
            });
            
            return clone;
        } else {
            return array;
        }
    }

    next() {
        if (!this.done) {
            let nextVal = this.clonedArray.shift();
            this.done = this.clonedArray.length <= 0;
            return nextVal;
        } else {
            this.done = true;
            return;
        }
    }
}