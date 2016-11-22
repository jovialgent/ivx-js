export class TypeValidator {
    constructor() {

    }

    get toString() {
        return Object.prototype.toString;
    }

    isUndefined(obj) {
        return obj === undefined || obj === null;
    }

    isString(obj) {
        return this.toString.call(obj) === '[object String]';
    }

    isFunction(obj){
        return obj && this.toString.call(obj) === '[object Function]';
    }

    isNumber(obj) {
        return !isNaN(obj);
    }

    isBoolean(obj) {
        return typeof obj === 'boolean' || (typeof obj === 'object' && typeof obj.valueOf() === 'boolean');
    }

    isEmpty(obj) {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let isArray = Array.isArray(obj);
        let isString = typeof obj === 'string';
        let checkLength = isArray || isString;

        if (checkLength && obj.length === 0) return true;
        if (checkLength && obj.length > 0) return false;
        if (!isNaN(obj)) return false;
        if (obj === undefined) return true;
        if (obj === null) return true;

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
}

let typeValidator = new TypeValidator();

export class ObjectParsers {
    constructor() {

    }

    /**
     * Allows you to map an object by the keys of a given object 
     * @param {object} object - object to map;
     * @param {function} callback - function to run by each value and key  
     */
    mapKeys(object, callback) {
        if (!object || object === {}) return [];

        let keys = Object.keys(object);
        let entries = keys.reduce((currentArray, key) => {
            let entry = [key, object[key]];

            currentArray.push(entry);

            return currentArray;
        }, []);
        let reduceMap = new Map(entries);
        let mappedArray = [];

        if (!reduceMap) return [];

        reduceMap.forEach(function (val, key) {
            mappedArray.push(callback(val, key));
        });

        return mappedArray;
    }

    merge(base, merged, ignore) {
        let mergedKeys = Object.keys(merged);
        let unionedObject = new Object(base);

        mergedKeys.forEach((mergedKey, index) => {
            if (ignore && ignore.indexOf(mergedKey) >= 0) return;
            unionedObject[mergedKey] = merged[mergedKey];
        });

        return unionedObject;
    }

    reduce(object, callback, defaultValue) {
        if (!object || object === {}) return;

        let keys = Object.keys(object);
        let entries = keys.reduce((currentArray, key) => {
            let entry = [key, object[key]];
            currentArray.push(entry);
            return currentArray;
        }, []);
        let reduceMap = new Map(entries);

        reduceMap.forEach(function (val, key) {
            defaultValue = callback(defaultValue, val, key);
        });

        return defaultValue;
    }

    /**
     * Iterates through a collection to find if any of the values 
     * with the keys is empty.
     */
    anyEmpty(collection, keys) {
        let hasElements = {
            isEmpty: false,
            errors: []
        };

        collection.forEach((element, index) => {
            keys.forEach((key) => {
                if (typeValidator.isEmpty(element[key])) {
                    hasElements.isEmpty = true;
                    hasElements.errors.push({
                        key: key,
                        index: index,
                        value: element[key]
                    })
                }
            })
        });

        return hasElements;
    }

    has(collection, element) {

        if (Array.isArray(element)) {
            return this.hasSameArray(collection, element);
        }

        if (typeof element === 'object') {
            return this.hasSameObject(collection, element)
        }

        return collection.indexOf(element) >= 0;
    }

    hasSameObject(collection, element) {
        let itHas = false;

        collection.forEach((checkElement, index) => {
            if (typeof checkElement === 'object') {
                let checkElementKeys = Object.keys(checkElement);
                checkElementKeys.forEach((key, index) => {
                    itHas = checkElement[key] === element[key];
                });
            }
        })

        return itHas;
    }

    hasSameArray(collection, arrayElement) {
        let itHas = false;

        collection.forEach((checkElement, index) => {


            if (Array.isArray(checkElement)) {

                checkElement.forEach((testElement, index) => {

                    itHas = testElement === arrayElement[index];
                })
            }

        });

        return itHas;
    }

    setValue(object, path, value) {
        var a = path.split('.');
        var o = object;
        for (var i = 0; i < a.length - 1; i++) {
            var n = a[i];
            if (n in o) {
                o = o[n];
            } else {
                o[n] = {};
                o = o[n];
            }
        }
        o[a[a.length - 1]] = value;
    }

    getValueFromPath(path, object) {
        let pathParts = path.split(".");
        let oldData = object;
        let currentData = {};
        let returnValue;

        pathParts.forEach((pathPart, index) => {
            if (typeValidator.isEmpty(pathPart)) return;
            currentData = oldData[pathPart];

            if (typeValidator.isEmpty(currentData)) {
                returnValue = currentData;
                return;
            }

            returnValue = currentData;
            oldData = currentData;
        });

        return returnValue;
    }



    /**
     * Checks in an array of objects to see if the values 
     * at the keys is unique and returns an object indicating 
     * if they are unique and any errors that don't match for 
     * correction.
     */
    isUnique(collection = [], keys = []) {
        let hasUnique = {
            isUnique: true,
            errors: []
        };
        let allUniqueValues = {};
        let self = this;

        keys.forEach((key) => {
            allUniqueValues[key] = [];
            collection.forEach((element, index) => {
                let notUnique = self.has(allUniqueValues[key], element[key]);

                if (notUnique) {
                    hasUnique.errors.push({
                        key: key,
                        index: index,
                        value: element[key]
                    });
                    hasUnique.isUnique = false;
                } else {
                    allUniqueValues[key].push(element[key]);
                }
            })
        });

        return hasUnique;
    }
};