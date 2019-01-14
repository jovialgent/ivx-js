/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(12);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = exports.Validation = function () {
    function Validation() {
        _classCallCheck(this, Validation);

        this.errors = [];
    }

    _createClass(Validation, [{
        key: 'addErrors',
        value: function addErrors(newErrors) {
            var self = this;
            newErrors.forEach(function (errorObj) {
                self.errors.push(errorObj);
            });
        }
    }, {
        key: 'validationArray',
        get: function get() {
            return [];
        }
    }, {
        key: 'valid',
        get: function get() {
            var self = this;

            return this.validationArray.reduce(function (isValid, isPartValid) {
                if (!isPartValid) return isValid;

                if (typeof isPartValid.valid === 'boolean' && !isPartValid.valid) {
                    self.errors.push(isPartValid);
                }

                return isValid && isPartValid.valid;
            }, true);
        }
    }]);

    return Validation;
}();

;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(29),
    getValue = __webpack_require__(35);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11),
    getRawTag = __webpack_require__(31),
    objectToString = __webpack_require__(32);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeValidator = exports.TypeValidator = function () {
    function TypeValidator() {
        _classCallCheck(this, TypeValidator);
    }

    _createClass(TypeValidator, [{
        key: 'isObject',
        value: function isObject(value) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            return value != null && (type == 'object' || type == 'function');
        }
    }, {
        key: 'isUndefined',
        value: function isUndefined(obj) {
            var undefined = void 0;

            return obj === undefined || obj === null;
        }
    }, {
        key: 'isString',
        value: function isString(obj) {
            return this.toString.call(obj) === '[object String]';
        }
    }, {
        key: 'isFunction',
        value: function isFunction(obj) {
            return obj && this.toString.call(obj) === '[object Function]';
        }
    }, {
        key: 'isNumber',
        value: function isNumber(obj) {
            return !isNaN(obj);
        }
    }, {
        key: 'isBoolean',
        value: function isBoolean(obj) {
            return typeof obj === 'boolean' || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.valueOf() === 'boolean';
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(obj) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var isArray = Array.isArray(obj);
            var isString = typeof obj === 'string';
            var checkLength = isArray || isString;

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
    }, {
        key: 'toString',
        get: function get() {
            return Object.prototype.toString;
        }
    }]);

    return TypeValidator;
}();

var typeValidator = new TypeValidator();

var ObjectParsers = exports.ObjectParsers = function () {
    function ObjectParsers() {
        _classCallCheck(this, ObjectParsers);
    }

    /**
     * Allows you to map an object by the keys of a given object 
     * @param {object} object - object to map;
     * @param {function} callback - function to run by each value and key  
     */


    _createClass(ObjectParsers, [{
        key: 'mapKeys',
        value: function mapKeys(object, callback) {
            if (!object || object === {}) return [];

            var keys = Object.keys(object);
            var entries = keys.reduce(function (currentArray, key) {
                var entry = [key, object[key]];

                currentArray.push(entry);

                return currentArray;
            }, []);
            var reduceMap = new Map(entries);
            var mappedArray = [];

            if (!reduceMap) return [];

            reduceMap.forEach(function (val, key) {
                mappedArray.push(callback(val, key));
            });

            return mappedArray;
        }
    }, {
        key: 'merge',
        value: function merge(base, merged, ignore) {
            var mergedKeys = Object.keys(merged);
            var unionedObject = new Object(base);

            mergedKeys.forEach(function (mergedKey, index) {
                if (ignore && ignore.indexOf(mergedKey) >= 0) return;
                unionedObject[mergedKey] = merged[mergedKey];
            });

            return unionedObject;
        }
    }, {
        key: 'reduce',
        value: function reduce(object, callback, defaultValue) {
            if (!object || object === {}) return;

            var keys = Object.keys(object);
            var entries = keys.reduce(function (currentArray, key) {
                var entry = [key, object[key]];
                currentArray.push(entry);
                return currentArray;
            }, []);
            var reduceMap = new Map(entries);

            reduceMap.forEach(function (val, key) {
                defaultValue = callback(defaultValue, val, key);
            });

            return defaultValue;
        }

        /**
         * Iterates through a collection to find if any of the values 
         * with the keys is empty.
         */

    }, {
        key: 'anyEmpty',
        value: function anyEmpty(collection, keys) {
            var hasElements = {
                isEmpty: false,
                errors: []
            };

            collection.forEach(function (element, index) {
                keys.forEach(function (key) {
                    if (typeValidator.isEmpty(element[key])) {
                        hasElements.isEmpty = true;
                        hasElements.errors.push({
                            key: key,
                            index: index,
                            value: element[key]
                        });
                    }
                });
            });

            return hasElements;
        }
    }, {
        key: 'has',
        value: function has(collection, element) {

            if (Array.isArray(element)) {
                return this.hasSameArray(collection, element);
            }

            if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
                return this.hasSameObject(collection, element);
            }

            return collection.indexOf(element) >= 0;
        }
    }, {
        key: 'hasSameObject',
        value: function hasSameObject(collection, element) {
            var itHas = false;

            collection.forEach(function (checkElement, index) {
                if ((typeof checkElement === 'undefined' ? 'undefined' : _typeof(checkElement)) === 'object') {
                    var checkElementKeys = Object.keys(checkElement);
                    checkElementKeys.forEach(function (key, index) {
                        itHas = checkElement[key] === element[key];
                    });
                }
            });

            return itHas;
        }
    }, {
        key: 'hasSameArray',
        value: function hasSameArray(collection, arrayElement) {
            var itHas = false;

            collection.forEach(function (checkElement, index) {

                if (Array.isArray(checkElement)) {

                    checkElement.forEach(function (testElement, index) {

                        itHas = testElement === arrayElement[index];
                    });
                }
            });

            return itHas;
        }
    }, {
        key: 'setValue',
        value: function setValue(object, path, value) {
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
    }, {
        key: 'getValueFromPath',
        value: function getValueFromPath(path, object) {
            var pathParts = path.split(".");
            var oldData = object;
            var currentData = {};
            var returnValue = void 0;

            pathParts.forEach(function (pathPart, index) {
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

    }, {
        key: 'isUnique',
        value: function isUnique() {
            var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var hasUnique = {
                isUnique: true,
                errors: []
            };
            var allUniqueValues = {};
            var self = this;

            keys.forEach(function (key) {
                allUniqueValues[key] = [];
                collection.forEach(function (element, index) {
                    var notUnique = self.has(allUniqueValues[key], element[key]);

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
                });
            });

            return hasUnique;
        }
    }]);

    return ObjectParsers;
}();

;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isEmpty = __webpack_require__(23);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rules = exports.Rules = function () {
    function Rules(config) {
        _classCallCheck(this, Rules);

        this.config = config;
    }

    _createClass(Rules, [{
        key: "stateIdEnums",
        get: function get() {
            var _config$states = this.config.states,
                states = _config$states === undefined ? [] : _config$states;


            var stateIds = states.reduce(function (stateIds, state, index) {
                var currentStateId = state.id,
                    _state$embeddedViews = state.embeddedViews,
                    embeddedViews = _state$embeddedViews === undefined ? [] : _state$embeddedViews;


                stateIds = [].concat(stateIds, [currentStateId]);

                if (!(0, _isEmpty2.default)(embeddedViews)) {
                    embeddedViews.forEach(function (embeddedView) {
                        var embeddedViews = embeddedView.states;

                        var allParentChildStateIds = embeddedViews.map(function (embeddedState) {
                            return currentStateId + "." + embeddedState.stateId;
                        });
                        var allRelativeChildStateIds = embeddedViews.map(function (embeddedState) {
                            return "^." + embeddedState.stateId;
                        });

                        stateIds = [].concat(stateIds, allParentChildStateIds, allRelativeChildStateIds, ['^']);
                    });
                }

                return stateIds;
            }, []);

            return stateIds;
        }
    }, {
        key: "rulesRequired",
        get: function get() {
            // return ["key", "is", "value"];
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "name": "Rule Schema",
                "properties": {
                    "stateId": {
                        "type": "string"
                    },
                    "rules": {
                        "type": "array"
                    },
                    "rule": {
                        "type": "object",
                        "properties": {
                            "key": {
                                "type": "string",
                                "minLength": 1
                            },
                            "is": {
                                "type": "string",
                                "enum": ["lt", "lte", "gt", "gte", "equals", "notEquals"]
                            },
                            "value": {
                                "type": ["string", "number", "boolean", "object", "array"]
                            }
                        },
                        "required": this.rulesRequired
                    }
                }
            };
        }
    }]);

    return Rules;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTMLObject = exports.HTMLObject = function () {
    function HTMLObject() {
        _classCallCheck(this, HTMLObject);
    }

    _createClass(HTMLObject, [{
        key: "generalHTMLSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "html": {
                        "type": "string"
                    },
                    "classes": {
                        "type": "string"
                    },
                    "templateUrl": {
                        "type": "string"
                    }
                }
            };
        }
    }, {
        key: "labelHTMLSchema",
        get: function get() {}
    }]);

    return HTMLObject;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isObject = __webpack_require__(13);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SchemaValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(17);

var _baseStructure = __webpack_require__(22);

var _statesTypes = __webpack_require__(52);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaValidation = exports.SchemaValidation = function () {
    function SchemaValidation(data) {
        _classCallCheck(this, SchemaValidation);

        this.error = {};
        this.data = data;

        if (!this.hasValidationLibrary.valid) {
            this.error = {
                message: this.hasValidationLibrary.error.message,
                data: this.data,
                errors: [this.hasValidationLibrary]
            };
        } else if (!this.valid) {
            this.error = {
                message: this.collectErrorMessages(),
                data: this.data,
                errors: this.errors
            };
        }
    }

    _createClass(SchemaValidation, [{
        key: 'createErrorMessage',
        value: function createErrorMessage(error) {
            var code = error.code;

            switch (code) {
                case 11:
                    return createOneOfErrorMessage(error);
                default:
                    return error.message;
            }

            function createOneOfErrorMessage(error) {
                var subErrors = error.subErrors;

                return subErrors.reduce(function (errorMessage, subError, index) {
                    return errorMessage + '\n                ' + subError.message + '<br>';
                }, '<strong>The data violates ONE of the following requirements:</strong><br>');
            }
        }
    }, {
        key: 'createPath',
        value: function createPath(dataPath) {
            var config = this.data.config;

            var pathParts = dataPath.split('/');
            var location = config;
            var path = pathParts.reduce(function (fullPath, currentPathPart, index) {

                if (currentPathPart.length <= 0) {
                    return fullPath;
                }

                if (fullPath.length <= 0) {
                    location = location[currentPathPart];
                    return '' + currentPathPart;
                }

                if (!isNaN(currentPathPart)) {
                    var locationIndex = parseInt(currentPathPart);
                    location = location[locationIndex];
                    return fullPath + '[' + currentPathPart + ']';
                }

                location = location[currentPathPart];

                return fullPath + '.' + currentPathPart;
            }, '');

            return {
                "pathString": path,
                "data": location
            };
        }
    }, {
        key: 'collectErrorMessages',
        value: function collectErrorMessages() {
            var self = this;

            return this.errors.reduce(function (errorMessages, error) {

                return errorMessages + '\n        TYPE: ' + self.getErrorCode(error.code) + '  PATH: ' + error.path.pathString + ' MESSAGE : ' + error.message;
            }, '');
        }
    }, {
        key: 'getErrorCode',
        value: function getErrorCode(errorCode) {
            var errorCodes = Object.values(tv4.errorCodes);
            var errorKeys = Object.keys(tv4.errorCodes);
            var errorCodeKey = "";

            errorCodes.forEach(function (thisErrorCode, index) {
                if (thisErrorCode === errorCode) {
                    errorCodeKey = errorKeys[index];
                }
            });

            return errorCodeKey;
        }
    }, {
        key: 'valid',
        get: function get() {
            return this.errors.length <= 0;
        }
    }, {
        key: 'errors',
        get: function get() {
            var baseValidate = this.baseValidate,
                stateTypesValidation = this.stateTypesValidation,
                data = this.data;
            var config = this.config;

            var self = this;
            var errorArray = [];

            baseValidate.errors.forEach(function (errorObj, index) {
                errorArray.push(errorObj);
            });

            stateTypesValidation.forEach(function (errorObj, index) {
                errorArray.push(errorObj);
            });

            var modifiedErrorArray = errorArray.map(function (error, index) {

                return {
                    message: self.createErrorMessage(error),
                    path: self.createPath('' + error.dataPath),
                    type: self.getErrorCode(error.code)

                };
            });

            // this.collectErrorMessages(baseValidate.errors);

            return modifiedErrorArray;
        }
    }, {
        key: 'baseValidate',
        get: function get() {
            var config = this.data.config;

            return new _baseStructure.BaseStructure(config).validate();
        }
    }, {
        key: 'stateTypesValidation',
        get: function get() {
            var states = this.data.config.states;


            return new _statesTypes.StatesTypes(states).validate();
        }
    }, {
        key: 'hasValidationLibrary',
        get: function get() {
            return {
                "valid": typeof tv4 !== 'undefined',
                error: {
                    "path": "init()",
                    "message": "Schema validation required the 'tv4' library (https://github.com/geraintluff/tv4)",
                    "type": "missing"
                }
            };
        }
    }]);

    return SchemaValidation;
}();

;

module.export = initializeSchemaValidation;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.validation.schema', initializeSchemaValidation).constant('iVXjsValidationSchema', initializeSchemaValidation);
}

function initializeSchemaValidation(settings) {
    return SchemaValidation;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iVXjsValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(5);

var _validation = __webpack_require__(1);

var _experience = __webpack_require__(18);

var _modules = __webpack_require__(19);

var _config = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objectParsers = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();

var iVXjsValidation = exports.iVXjsValidation = function (_Validation) {
  _inherits(iVXjsValidation, _Validation);

  function iVXjsValidation(data) {
    _classCallCheck(this, iVXjsValidation);

    var _this = _possibleConstructorReturn(this, (iVXjsValidation.__proto__ || Object.getPrototypeOf(iVXjsValidation)).call(this));

    _this.data = data;

    if (!_this.valid) {
      _this.error = {
        message: _this.collectErrorMessages(),
        data: _this.data,
        errors: _this.errors
      };
    }
    return _this;
  }

  _createClass(iVXjsValidation, [{
    key: 'collectErrorMessages',
    value: function collectErrorMessages() {
      return this.errors.reverse().reduce(function (errorMessages, errorObj) {
        var error = errorObj.error;

        return errorMessages + '\nTYPE: ' + (error.type ? error.type : 'ERROR') + '  PATH: ' + error.path + ' ' + (error.message && error.message.length > 0 ? 'MESSAGE: ' + error.message + '' : '');
      }, '');
    }
  }, {
    key: 'validationArray',
    get: function get() {
      var currentValidationArray = [this.ruleValidationObj, this.experienceValidationObj, this.configValidationObj];
      return currentValidationArray;
    }
  }, {
    key: 'configValidationObj',
    get: function get() {
      var config = this.data.config;

      var _ref = new _config.ConfigValidation(config),
          valid = _ref.valid,
          errors = _ref.errors;

      if (!valid) {
        this.addErrors(errors);
      }

      return {
        valid: valid,
        error: {
          "path": "config",
          "message": "An experience must have a valid config",
          "type": "invalid"
        }
      };
    }
  }, {
    key: 'experienceValidationObj',
    get: function get() {
      var experience = this.data.experience;

      var _ref2 = new _experience.ExperienceValidation(experience),
          valid = _ref2.valid,
          errors = _ref2.errors;

      var self = this;

      if (!valid) {
        this.addErrors(errors);
      }

      return {
        valid: valid,
        error: {
          path: 'experience',
          message: 'An experience must not have any errors',
          type: 'invalid'

        },
        data: experience

      };
    }
  }, {
    key: 'ruleValidationObj',
    get: function get() {
      var rules = this.data.rules;


      return {
        valid: typeof rules !== 'undefined',
        error: {
          name: 'Missing Rules:',
          message: 'The function rules needs to be defined in the experience.'
        },
        data: rules
      };
    }
  }]);

  return iVXjsValidation;
}(_validation.Validation);

;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExperienceValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExperienceValidation = exports.ExperienceValidation = function (_Validation) {
    _inherits(ExperienceValidation, _Validation);

    function ExperienceValidation() {
        var experience = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ExperienceValidation);

        var _this = _possibleConstructorReturn(this, (ExperienceValidation.__proto__ || Object.getPrototypeOf(ExperienceValidation)).call(this));

        _this.experience = experience;
        return _this;
    }

    _createClass(ExperienceValidation, [{
        key: 'validationArray',
        get: function get() {
            return [this.validAnimateElementObj, this.validSetDataObj];
        }
    }, {
        key: 'validAnimateElementObj',
        get: function get() {
            var animateElement = this.experience.animateElement;

            return {
                valid: typeof animateElement !== 'undefined',
                error: {
                    path: 'experience.animateElement',
                    type: "missing"
                },
                data: animateElement
            };
        }
    }, {
        key: 'validSetDataObj',
        get: function get() {
            var setData = this.experience.setData;

            return {
                valid: typeof setData !== 'undefined',
                error: {
                    path: 'experience.setData',
                    type: "missing"
                },
                data: setData
            };
        }
    }]);

    return ExperienceValidation;
}(_validation.Validation);

;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModuleValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = __webpack_require__(1);

var _typeParsers = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = true;

var ModuleValidation = exports.ModuleValidation = function (_Validation) {
    _inherits(ModuleValidation, _Validation);

    function ModuleValidation(experience) {
        _classCallCheck(this, ModuleValidation);

        var _this = _possibleConstructorReturn(this, (ModuleValidation.__proto__ || Object.getPrototypeOf(ModuleValidation)).call(this));

        _this.experience = experience;
        _this.typeValidator = new _typeParsers.TypeValidator();

        return _this;
    }

    _createClass(ModuleValidation, [{
        key: 'validationArray',
        get: function get() {
            var moduleValidationArray = [this.validUIModuleObj];

            return moduleValidationArray;
        }
    }, {
        key: 'validUIModuleObj',
        get: function get() {
            var ui = this.experience.ui;


            return {
                valid: typeof ui !== 'undefined' && this.typeValidator.isString(ui) && ui.length > 0,
                error: {
                    "path": "ui",
                    "type": "missing"
                },
                data: ui
            };
        }
    }]);

    return ModuleValidation;
}(_validation.Validation);

;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = __webpack_require__(1);

var _configStates = __webpack_require__(21);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigValidation = exports.ConfigValidation = function (_Validation) {
    _inherits(ConfigValidation, _Validation);

    function ConfigValidation() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ConfigValidation);

        var _this = _possibleConstructorReturn(this, (ConfigValidation.__proto__ || Object.getPrototypeOf(ConfigValidation)).call(this));

        _this.config = config;
        return _this;
    }

    _createClass(ConfigValidation, [{
        key: 'validationArray',
        get: function get() {
            return [this.hasStatesObj, this.hasDefaultStateObj, this.validDefaultStateObj, this.validStateConfig];
        }
    }, {
        key: 'validStateConfig',
        get: function get() {
            var _ref = new _configStates.ConfigStatesValidation(this.config.states),
                valid = _ref.valid,
                errors = _ref.errors;

            if (!valid) {
                this.addErrors(errors);
            }

            return {
                valid: valid,
                error: {
                    type: 'invalid',
                    path: 'config.states',
                    message: "Experience requires that all states are valid"
                }
            };
        }
    }, {
        key: 'validDefaultStateObj',
        get: function get() {
            var valid = this.hasDefaultStateObj.valid;


            if (!valid) return;

            var defaultState = this.config.defaultState;

            var finalIndex = defaultState.length - 1;
            var lastState = defaultState[finalIndex];

            return {
                valid: lastState.stateId && lastState.stateId.length >= 0 || lastState.route && lastState.route.length >= 0,
                error: {
                    "type": "missing",
                    "path": 'config.defaultState[' + finalIndex + '].stateId'
                }
            };
        }
    }, {
        key: 'hasDefaultStateObj',
        get: function get() {
            var _config$defaultState = this.config.defaultState,
                defaultState = _config$defaultState === undefined ? [] : _config$defaultState;

            var defaultStateExists = typeof defaultState !== 'undefined' && defaultState.length >= 1;

            return {
                valid: defaultStateExists,
                error: {
                    "type": "missing",
                    "path": "config.defaultState"
                },
                data: defaultState
            };
        }
    }, {
        key: 'hasStatesObj',
        get: function get() {
            var states = this.config.states;


            return {
                valid: typeof states !== 'undefined' && states.length >= 1,
                error: {
                    "type": "missing",
                    "path": "config.states"
                },
                data: states
            };
        }
    }]);

    return ConfigValidation;
}(_validation.Validation);

;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigStatesValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(5);

var _validation = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objectParsers = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();

var ConfigStatesValidation = exports.ConfigStatesValidation = function (_Validation) {
    _inherits(ConfigStatesValidation, _Validation);

    function ConfigStatesValidation() {
        var states = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ConfigStatesValidation);

        var _this = _possibleConstructorReturn(this, (ConfigStatesValidation.__proto__ || Object.getPrototypeOf(ConfigStatesValidation)).call(this));

        _this.states = states;
        return _this;
    }

    _createClass(ConfigStatesValidation, [{
        key: 'convertToConfigErrorObjs',
        value: function convertToConfigErrorObjs(errors, errorType) {
            return errors.map(function (error) {
                var key = error.key,
                    value = error.value,
                    index = error.index;

                var errorObject = {
                    type: errorType,
                    path: 'config.states[' + index + '].' + key
                };

                if (errorType === 'duplicate') errorObject.message = 'Duplicate value: ' + value;

                return {
                    valid: false,
                    error: errorObject
                };
            });
        }
    }, {
        key: 'validationArray',
        get: function get() {
            return [this.uniqueValidStateData, this.filledValidStateData];
        }
    }, {
        key: 'filledValidStateData',
        get: function get() {
            var _objectParsers$anyEmp = objectParsers.anyEmpty(this.states, ['id', 'url', 'type']),
                _objectParsers$anyEmp2 = _objectParsers$anyEmp.errors,
                errors = _objectParsers$anyEmp2 === undefined ? [] : _objectParsers$anyEmp2,
                isEmpty = _objectParsers$anyEmp.isEmpty;

            if (isEmpty) {

                this.addErrors(this.convertToConfigErrorObjs(errors, 'missing'));
            }

            return {
                valid: !isEmpty,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s have an id, url, and/or type',
                    type: 'invalid'

                },
                data: this.states

            };
        }
    }, {
        key: 'uniqueValidStateData',
        get: function get() {
            var _objectParsers$isUniq = objectParsers.isUnique(this.states, ['id', 'url']),
                _objectParsers$isUniq2 = _objectParsers$isUniq.errors,
                errors = _objectParsers$isUniq2 === undefined ? [] : _objectParsers$isUniq2,
                valid = _objectParsers$isUniq.isUnique;

            if (!valid) {

                this.addErrors(this.convertToConfigErrorObjs(errors, 'duplicate'));
            }

            return {
                valid: valid,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s ids and urls are unique',
                    type: 'invalid'

                },
                data: this.states

            };
        }
    }]);

    return ConfigStatesValidation;
}(_validation.Validation);

;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseStructure = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = __webpack_require__(6);

var _states = __webpack_require__(50);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStructure = exports.BaseStructure = function () {
    function BaseStructure(config) {
        _classCallCheck(this, BaseStructure);

        this.config = config;
        this.rulesSchema = new _rules.Rules(config).schema;
        this.stateSchema = new _states.States(config).schema;
    }

    _createClass(BaseStructure, [{
        key: 'validate',
        value: function validate() {

            return tv4.validateMultiple(this.config, this.schema);
        }
    }, {
        key: 'schema',
        get: function get() {
            return this.baseStructure;
        }
    }, {
        key: 'baseStructure',
        get: function get() {
            return {
                type: "object",
                properties: this.properties,
                required: this.requiredKeys
            };
        }
    }, {
        key: 'properties',
        get: function get() {
            return {
                "defaultState": {
                    "type": "array",
                    "items": this.rulesSchema
                },
                "states": {
                    "type": "array",
                    "items": this.stateSchema,
                    "minItems": "1"
                }
            };
        }
    }, {
        key: 'requiredKeys',
        get: function get() {
            return ["defaultState", "states"];
        }
    }]);

    return BaseStructure;
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(24),
    getTag = __webpack_require__(27),
    isArguments = __webpack_require__(40),
    isArray = __webpack_require__(42),
    isArrayLike = __webpack_require__(43),
    isBuffer = __webpack_require__(44),
    isPrototype = __webpack_require__(9),
    isTypedArray = __webpack_require__(46);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(9),
    nativeKeys = __webpack_require__(25);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(26);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(28),
    Map = __webpack_require__(36),
    Promise = __webpack_require__(37),
    Set = __webpack_require__(38),
    WeakMap = __webpack_require__(39),
    baseGetTag = __webpack_require__(3),
    toSource = __webpack_require__(14);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(10),
    isMasked = __webpack_require__(33),
    isObject = __webpack_require__(13),
    toSource = __webpack_require__(14);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(34);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(41),
    isObjectLike = __webpack_require__(7);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(10),
    isLength = __webpack_require__(15);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(0),
    stubFalse = __webpack_require__(45);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(47),
    baseUnary = __webpack_require__(48),
    nodeUtil = __webpack_require__(49);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isLength = __webpack_require__(15),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(12);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.States = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = __webpack_require__(6);

var _htmlObject = __webpack_require__(8);

var _states = __webpack_require__(51);

var _states2 = _interopRequireDefault(_states);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var States = exports.States = function () {
    function States(config) {
        _classCallCheck(this, States);

        this.rulesSchema = new _rules.Rules(config).schema;
        this.generalHTMLSchema = new _htmlObject.HTMLObject().generalHTMLSchema;
        this.embeddedViewsSchema = new _states2.default(config).schema;
    }

    _createClass(States, [{
        key: 'stateRequired',
        get: function get() {
            return ['id', 'name', 'url', 'type'];
        }
    }, {
        key: 'typeEnum',
        get: function get() {
            return ["navigation", "video", "input", "html"];
        }
    }, {
        key: 'stateProperties',
        get: function get() {
            return {
                "id": {
                    "type": "string",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "url": {
                    "type": "string",
                    "pattern": "\/^(\/[A-Za-z0-9-]*)$\/",
                    "minLength": 1
                },
                "audio": {
                    "type": "object",
                    "properties": {
                        "src": {
                            "type": "string",
                            "minLength": 1
                        },
                        "loop": {
                            "type": "boolean"
                        },
                        "cuePoints": {
                            "type": "array"
                        }
                    },
                    "required": ["src"]
                },
                "type": {
                    "type": "string",
                    "enum": this.typeEnum
                },
                "next": {
                    "type": "array",
                    "items": this.rulesSchema
                },
                "onEnter": {
                    "type": "array"
                },
                "onExit": {
                    "type": "array"
                },
                "embedded": {
                    type: "boolean"
                },
                "header": this.generalHTMLSchema,
                "footer": this.generalHTMLSchema,
                "embeddedViews": {
                    "type": "array",
                    "items": this.embeddedViewsSchema
                },
                "oneOf": [{
                    "required": ["embedded"]
                }, {
                    "required": ["embeddedViews"]
                }]
            };
        }
    }, {
        key: 'schema',
        get: function get() {
            return {
                "type": "object",
                "name": "state",
                "properties": this.stateProperties,
                "required": this.stateRequired
            };
        }
    }]);

    return States;
}();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = __webpack_require__(6);

var _htmlObject = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var States = function () {
    function States(config) {
        _classCallCheck(this, States);

        Object.assign(this, {
            generalHTMLSchema: new _htmlObject.HTMLObject().generalHTMLSchema,
            rulesSchema: new _rules.Rules(config).schema,
            config: config
        });
    }

    _createClass(States, [{
        key: 'stateRequired',
        get: function get() {
            return ['id', 'name', 'appendTo', 'type'];
        }
    }, {
        key: 'types',
        get: function get() {
            return ['custom'];
        }
    }, {
        key: 'stateIdEnum',
        get: function get() {
            return this.config.states.reduce(function (stateIds, state) {
                if (state.embedded) {
                    stateIds = [].concat(stateIds, [state.id]);
                }

                return stateIds;
            }, ['^']);
        }
    }, {
        key: 'stateProperties',
        get: function get() {
            return {
                "id": {
                    "type": "string",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "type": {
                    "type": "string",
                    "enum": this.types
                },
                "appendTo": {
                    "type": "string"
                },
                "states": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "stateId": {
                                "type": "string",
                                "enum": this.stateIdEnum
                            },
                            "next": {
                                "type": "array",
                                "items": this.rulesSchema
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: 'schema',
        get: function get() {
            return {
                "type": "object",
                "name": "state",
                "properties": this.stateProperties,
                "required": this.stateRequired
            };
        }
    }]);

    return States;
}();

exports.default = States;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatesTypes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _statesTypesHtml = __webpack_require__(53);

var _statesTypesVideo = __webpack_require__(54);

var _statesTypesInput = __webpack_require__(55);

var _statesTypesNavigation = __webpack_require__(57);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatesTypes = exports.StatesTypes = function () {
    function StatesTypes(states) {
        _classCallCheck(this, StatesTypes);

        this.states = states;
    }

    _createClass(StatesTypes, [{
        key: "validate",
        value: function validate() {
            var states = this.states,
                typesSchemas = this.typesSchemas;


            var errorCollection = states.reduce(function (errors, state, index) {
                var type = state.type;


                if (type && typesSchemas[type]) {
                    var _validate = new typesSchemas[type](state, index).validate(),
                        typeErrors = _validate.errors;

                    typeErrors.forEach(function (typeError, errorIndex) {
                        var modTypeError = typeError;

                        modTypeError.dataPath = "states/" + index + (modTypeError.dataPath.length > 0 ? modTypeError.dataPath : '');

                        errors.push(typeError);
                    });
                }

                return errors;
            }, []);

            return errorCollection;
        }
    }, {
        key: "typesSchemas",
        get: function get() {
            return {
                "html": _statesTypesHtml.HTMLStateSchema,
                "video": _statesTypesVideo.VideoStateSchema,
                "input": _statesTypesInput.InputStateSchema,
                "navigation": _statesTypesNavigation.NavigationStateSchema
            };
        }
    }]);

    return StatesTypes;
}();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTMLStateSchema = exports.HTMLStateSchema = function () {
    function HTMLStateSchema(state) {
        _classCallCheck(this, HTMLStateSchema);

        this.state = state;
    }

    _createClass(HTMLStateSchema, [{
        key: "validate",
        value: function validate() {
            return tv4.validateMultiple(this.state, this.schema);
        }
    }, {
        key: "requiredProperties",
        get: function get() {
            return ["html"];
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "html": {
                        "type": "string"
                    },
                    "templateUrl": {
                        "type": "string"
                    },
                    "timeoutInMs": {
                        "type": "number"
                    }
                },
                "oneOf": [{
                    "required": ["html"]
                }, {
                    "required": ["templateUrl"]
                }]
            };
        }
    }]);

    return HTMLStateSchema;
}();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoStateSchema = exports.VideoStateSchema = function () {
    function VideoStateSchema(state) {
        _classCallCheck(this, VideoStateSchema);

        this.state = state;
    }

    _createClass(VideoStateSchema, [{
        key: "validate",
        value: function validate() {
            return tv4.validateMultiple(this.state, this.schema);
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "playerSettings": {
                        "type": "object",
                        "properties": {
                            "autoplay": {
                                "type": "boolean"
                            },
                            "controls": {
                                "type": ["boolean", "string", "object"],
                                "properties": {
                                    "type": {
                                        "type": ["boolean", "string"]
                                    },
                                    "classes": {
                                        "type": "string"
                                    },
                                    "required": ["type"]
                                }
                            },
                            "attributes": {
                                "type": "object"
                            },
                            "src": {
                                "type": "string"
                            },
                            "sources": {
                                "type": "array",
                                "items": [{
                                    "type": "object",
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["video/mp4", "video/webm", "video/ogg"]
                                        },
                                        "src": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["src", "type"]
                                }],
                                "minItems": "1"
                            },
                            "tracks": {
                                "type": "array",
                                "items": [{
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string"
                                        },
                                        "src": {
                                            "type": "string"
                                        },
                                        "kind": {
                                            "type": "string"
                                        },
                                        "default": {
                                            "type": "boolean"
                                        },
                                        "cues": {
                                            "type": "array",
                                            "items": [{
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "string"
                                                    },
                                                    "start": {
                                                        "type": "number"
                                                    },
                                                    "end": {
                                                        "type": "number"
                                                    },
                                                    "payload": {
                                                        "type": "string"
                                                    },
                                                    "align": {
                                                        "type": "string"
                                                    },
                                                    "position": {
                                                        "type": "string"
                                                    },
                                                    "size": {
                                                        "type": "string"
                                                    },
                                                    "vertical": {
                                                        "type": "string"
                                                    }
                                                },
                                                "required": ["id", "start", "end", "payload"]
                                            }]
                                        },
                                        "required": ["id", "kind"]

                                    }
                                }]
                            }
                        },
                        "oneOf": [{
                            "required": ["src"]
                        }, {
                            "required": ["sources"]
                        }, {
                            "required": ["vimeoId"]
                        }, {
                            "required": ["youtubeId"]
                        }]
                    },
                    "personalizations": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "html": {
                                    "type": "string"
                                },
                                "templateUrl": {
                                    "type": "string"
                                }
                            },
                            "required": ["id"],
                            "oneOf": [{
                                "required": ["html"]
                            }, {
                                "required": ["templateUrl"]
                            }]
                        }
                    },
                    "cuePoints": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "timeAt": {
                                    "type": "number",
                                    "minimum": 0
                                },
                                "endAt": {
                                    "type": "number",
                                    "minimum": 0
                                },
                                "eventName": {
                                    "type": "string"
                                },
                                "args": {
                                    "type": "object"
                                }
                            },
                            "required": ["eventName"]
                        }
                    }
                },
                "required": ["playerSettings"]
            };
        }
    }]);

    return VideoStateSchema;
}();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputStateSchema = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputs = __webpack_require__(56);

var _htmlObject = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputStateSchema = exports.InputStateSchema = function () {
    function InputStateSchema(state, index) {
        _classCallCheck(this, InputStateSchema);

        this.state = state;
        this.index = index;
        this.generalHTMLSchema = new _htmlObject.HTMLObject().generalHTMLSchema;
    }

    _createClass(InputStateSchema, [{
        key: 'validate',
        value: function validate() {
            var allErrors = [tv4.validateMultiple(this.state, this.schema), this.inputErrors].reduce(function (currentErrors, errorObj, index) {
                var errors = errorObj.errors;

                errors.forEach(function (error, index) {
                    currentErrors.push(error);
                });
                return currentErrors;
            }, []);

            return {
                errors: allErrors
            };
        }
    }, {
        key: 'inputErrors',
        get: function get() {
            var index = this.index;
            var _state$inputs = this.state.inputs,
                inputs = _state$inputs === undefined ? [] : _state$inputs;

            var currentInputErrors = new _inputs.InputErrors(inputs, index).validate();

            return {
                errors: currentInputErrors
            };
        }
    }, {
        key: 'schema',
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "form": {
                        "type": "object",
                        "properties": {
                            "classes": {
                                "type": "string"
                            },
                            "label": {
                                "type": "string"
                            },
                            "labelHTML": {
                                "type": "string"
                            },
                            "labelTemplateUrl": {
                                "type": "string"
                            },
                            "submit": {
                                "type": "object",
                                "properties": {
                                    "classes": {
                                        "type": "string"
                                    },
                                    "label": {
                                        "type": "string"
                                    },
                                    "labelHTML": {
                                        "type": "string"
                                    },
                                    "labelTemplateUrl": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    },
                    "onSubmit": {
                        "type": "array",
                        "items": {
                            "type": "object"
                        }
                    },
                    "inputs": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "name": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "type": {
                                    "type": "string"
                                },
                                "errors": {
                                    "type": "object"
                                },
                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                },
                                "beforeHtml": this.generalHTMLSchema,
                                "afterHtml": this.generalHTMLSchema,
                                "settings": {
                                    "type": "object",
                                    "properties": {
                                        "input": {
                                            "type": "object",
                                            "properties": {
                                                "classes": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "container": {
                                            "type": "object",
                                            "properties": {
                                                "classes": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "width": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "attributes": {
                                    "type": "object",
                                    "properties": {
                                        "required": {
                                            "type": "boolean"
                                        },
                                        "placeholder": {
                                            "type": "string"
                                        },
                                        "minlength": {
                                            "type": "number"
                                        },
                                        "maxlength": {
                                            "type": "number"
                                        }
                                    }
                                },
                                "onChange": {
                                    "type": "array",
                                    "items": {
                                        "type": "object"
                                    }
                                }
                            },
                            "required": ["id", "name", "type"]
                        }
                    }
                },
                "required": ["inputs"]
            };
        }
    }]);

    return InputStateSchema;
}();

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputErrors = exports.InputErrors = function () {
    function InputErrors(inputs, currentState) {
        _classCallCheck(this, InputErrors);

        this.inputs = inputs;
        this.currentState = currentState;
    }

    _createClass(InputErrors, [{
        key: "validate",
        value: function validate() {
            var inputs = this.inputs,
                inputSchemas = this.inputSchemas;

            var allInputErrors = inputs.reduce(function (inputErrors, input, index) {
                var type = input.type;


                if (type && inputSchemas[type]) {
                    var errors = tv4.validateMultiple(input, inputSchemas[type]).errors;
                    errors.forEach(function (thisInputError, errorIndex) {
                        thisInputError.dataPath = "/inputs/" + index + (thisInputError.dataPath.length > 0 ? thisInputError.dataPath : '');
                        inputErrors.push(thisInputError);
                    });
                }

                return inputErrors;
            }, []);

            return allInputErrors;
        }
    }, {
        key: "inputSchemas",
        get: function get() {
            return {
                buttons: this.buttonsSchema,
                checkbox: this.checkboxSchema,
                date: this.dateSchema,
                "datetime-local": this.datetimeLocalSchema,
                email: this.textSchema,
                number: this.numberSchema,
                options: this.optionsSchema,
                radio: this.radioSchema,
                text: this.textSchema,
                textarea: this.textSchema,
                url: this.textSchema

            };
        }
    }, {
        key: "buttonsSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["buttons"]
                    },
                    "settings": {
                        "type": "object",
                        "properties": {
                            "showLabel": {
                                "type": "boolean"
                            }
                        }
                    },
                    "buttons": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {

                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                },
                                "classes": {
                                    "type": "string"
                                },
                                "onClick": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "eventName": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            },
                            "required": ["value"]
                        },
                        "minItems": 1
                    }
                }
            };
        }
    }, {
        key: "checkboxSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["checkbox"]
                    }
                }
            };
        }
    }, {
        key: "dateSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["date"]
                    },
                    "attributes": {
                        "type": "object",
                        "properties": {
                            "min": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            },
                            "max": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: "datetimeLocalSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["datetime-local"]
                    },
                    "attributes": {
                        "type": "object",
                        "properties": {
                            "min": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            },
                            "max": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: "numberSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["number"]
                    },
                    "attributes": {
                        "type": "object",
                        "properties": {
                            "placeholder": {
                                "type": "string"
                            },
                            "min": {
                                "type": "number"
                            },
                            "max": {
                                "type": "number"
                            },
                            "step": {
                                "type": "number",
                                "minimum": 0,
                                "exclusiveMinimum": true
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: "optionsSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["options"]
                    },
                    "defaultDisplay": {
                        "type": "string"
                    },
                    "options": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                            "type": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "display": {
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "required": ["value", "display"]
                        }
                    }
                }
            };
        }
    }, {
        key: "radioSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["radio"]
                    },
                    "radioButtons": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "label": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "labelHTML": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "labelTemplateUrl": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "classes": {
                                    "type": "string"
                                }
                            },
                            "required": ["value"],
                            "oneOf": [{
                                "required": ["label"]
                            }, {
                                "required": ["labelHTML"]
                            }, {
                                "required": ["labelTemplateUrl"]
                            }]
                        },
                        "minItems": 2
                    }
                }
            };
        }
    }, {
        key: "textSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["text", "email", "url", "textarea"]
                    }
                }

            };
        }
    }]);

    return InputErrors;
}();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationStateSchema = exports.NavigationStateSchema = function () {
    function NavigationStateSchema(state, index) {
        _classCallCheck(this, NavigationStateSchema);

        this.state = state;
        this.index = index;
    }

    _createClass(NavigationStateSchema, [{
        key: "validate",
        value: function validate() {
            return tv4.validateMultiple(this.state, this.schema);
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "links": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "properties": {
                                "href": {
                                    "type": "string"
                                },
                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                },
                                "attributes": {
                                    "type": "object",
                                    "properties": {
                                        "target": {
                                            "type": "string",
                                            "enum": ["_blank"]
                                        }
                                    }
                                },
                                "onClick": {
                                    "type": "array"
                                }
                            },
                            "oneOf": [{
                                "required": ["href"]
                            }, {
                                "required": ["route"]
                            }]

                        }
                    }
                },
                "required": ["links"]
            };
        }
    }]);

    return NavigationStateSchema;
}();

/***/ })
/******/ ]);