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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(10);

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

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.LIBRARY = "iVXjs";
        this.DELIMETER = ":";
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            return this.LIBRARY;
        }
    }, {
        key: "addNames",
        value: function addNames(nameCollection) {
            var self = this;
            var names = Object.keys(nameCollection);

            names.forEach(function (name, index) {
                self[name] = self.convention(nameCollection[name]);
            });
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(30),
    getValue = __webpack_require__(33);

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

var Symbol = __webpack_require__(9),
    getRawTag = __webpack_require__(23),
    objectToString = __webpack_require__(24);

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

var baseGetTag = __webpack_require__(3),
    isObject = __webpack_require__(11);

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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _state = __webpack_require__(17);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsStateConstants) {
    _inherits(_class, _iVXjsStateConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            CHANGE: "change",
            SUCCESS: "success",
            ERROR: "error",
            GO: "go",
            NOT_FOUND: "not-found",
            GET_STATE: "get-state",
            REQUEST_STATE: "request-state"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var DELIMETER = this.DELIMETER;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
        }
    }]);

    return _class;
}(_state2.default);

exports.default = _class;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(5);

var _isFunction = __webpack_require__(6);

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

var hasOwnProperty = Object.prototype.hasOwnProperty;

var _class = function () {
    function _class(experience, customEvaluator) {
        _classCallCheck(this, _class);

        this.experience = experience;
        this.customEvaluator = customEvaluator;
    }

    _createClass(_class, [{
        key: "setCustomEvaluator",
        value: function setCustomEvaluator(evaluatorFn) {
            Object.assign(this, {
                customEvaluator: customEvaluator
            });
        }
    }, {
        key: "evaluate",
        value: function evaluate(rule) {
            var tempEvaluator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
                return false;
            };

            var self = this;
            var _rule$conditionOperat = rule.conditionOperator,
                conditionOperator = _rule$conditionOperat === undefined ? "and" : _rule$conditionOperat,
                conditions = rule.conditions;

            var evaluateConditions = conditions.map(function (condition, index) {
                var lhs = condition.key,
                    is = condition.is,
                    rhs = condition.value,
                    _condition$type = condition.type,
                    type = _condition$type === undefined ? "input" : _condition$type;

                var matchingCondition = tempEvaluator(condition);

                if (!matchingCondition && self.customEvaluator && (0, _isFunction2.default)(self.customEvaluator)) {
                    matchingCondition = self.customEvaluator(condition);
                }

                // Since older versions of the iVXjs JSON used 
                // the key for "keyword" this will make it backwards
                // compatable
                if (!matchingCondition && self[lhs]) {
                    matchingCondition = self[lhs](lhs, is, rhs);
                }

                if (!matchingCondition && self[type]) {
                    matchingCondition = self[type](lhs, is, rhs);
                }

                return matchingCondition;
            });

            return this[conditionOperator](evaluateConditions);
        }
    }, {
        key: "input",
        value: function input(lhs, is, rhs) {
            var experience = this.experience;

            var lhsValue = experience.data[lhs];

            if (this[is]) {
                return this[is](lhsValue, rhs);
            }

            return false;
        }
    }, {
        key: "and",
        value: function and() {
            var predicates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return predicates.reduce(function (evaluate, predicate, index) {
                return evaluate && predicate;
            }, true);
        }
    }, {
        key: "or",
        value: function or() {
            var predicates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return predicates.reduce(function (evaluate, predicate, index) {
                return evaluate || predicate;
            }, false);
        }
    }, {
        key: "not",
        value: function not() {
            var predicates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return predicates.reduce(function (evaluate, predicate, index) {
                return evaluate && !predicate;
            }, true);
        }
    }, {
        key: "lte",
        value: function lte(lhs, rhs) {
            if (isNaN(lhs) || isNaN(rhs)) return false;
            return new Number(lhs) <= new Number(rhs);
        }
    }, {
        key: "lt",
        value: function lt(lhs, rhs) {
            if (isNaN(lhs) || isNaN(rhs)) return false;
            return new Number(lhs) < new Number(rhs);
        }
    }, {
        key: "gte",
        value: function gte(lhs, rhs) {
            if (isNaN(lhs) || isNaN(rhs)) return false;
            return new Number(lhs) >= new Number(rhs);
        }
    }, {
        key: "gt",
        value: function gt(lhs, rhs) {
            if (isNaN(lhs) || isNaN(rhs)) return false;
            return new Number(lhs) > new Number(rhs);
        }
    }, {
        key: "equals",
        value: function equals(lhs, rhs) {
            return lhs === rhs;
        }
    }, {
        key: "notEquals",
        value: function notEquals(lhs, rhs) {
            return lhs !== rhs;
        }
    }, {
        key: "in",
        value: function _in(lhs, rhs) {
            return lhs && lhs.indexOf && lhs.indexOf(rhs) >= 0;
        }

        // Based on the isEmpty from lodash (https://github.com/lodash/lodash/blob/master/isEmpty.js)

    }, {
        key: "empty",
        value: function empty(lhs, rhs) {
            if (lhs === null) {
                return true;
            }

            if (Array.isArray(lhs) || typeof value === 'string') {
                return !lhs.length;
            }

            for (var key in lhs) {
                if (hasOwnProperty.call(lhs, key)) {
                    return false;
                }
            }

            return true;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(25),
    getTag = __webpack_require__(28),
    isArguments = __webpack_require__(38),
    isArray = __webpack_require__(40),
    isArrayLike = __webpack_require__(41),
    isBuffer = __webpack_require__(42),
    isPrototype = __webpack_require__(12),
    isTypedArray = __webpack_require__(44);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConstants) {
    _inherits(_class, _iVXjsConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.STATE = "state";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                STATE = this.STATE;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + STATE;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Actions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioEvents = __webpack_require__(19);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

var _stateEvents = __webpack_require__(8);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates and runs all actions for this experience. An action
 * is any process that needs to return a promise indicating that 
 * it finished.
 */
var Actions = exports.Actions = function () {

    /**
     * Creates a default data object to be used by various
     * 
     */
    function Actions() {
        _classCallCheck(this, Actions);

        /**
         * An empty data object that will be used to set and 
         * record data using this setData function.
         * @type {Object}
         */
        this.data = {};
        this.audioEventNames = new _audioEvents2.default();
        this.stateEventNames = new _stateEvents2.default();
    }

    /**
     * Sets classes on an element that will cause the element to animate.
     * @param {HTMLNode} element - element for the class to be set
     * @param {Object} eventObj - animation event data.
     * @return {HTMLNode} the element with the classes replaced.  
     */


    _createClass(Actions, [{
        key: "setElementClasses",
        value: function setElementClasses(element, eventObj) {
            var _eventObj$animationCl = eventObj.animationClasses,
                animationClasses = _eventObj$animationCl === undefined ? "" : _eventObj$animationCl;
            var _element$animationCla = element.animationClasses,
                oldAnimationClasses = _element$animationCla === undefined ? "" : _element$animationCla;

            var classesToAdd = animationClasses.split(" ");
            var classesToRemove = oldAnimationClasses.split(" ");

            if (element.className.indexOf('hide') >= 0) {
                element.className = element.className.replace('hide', animationClasses);
                return;
            }

            classesToRemove.forEach(function (classToRemove) {
                if (classToRemove.length > 0) {
                    element.classList.remove(classToRemove);
                }
            });

            classesToAdd.forEach(function (classToAdd) {
                if (classToAdd.length > 0) {
                    element.classList.add(classToAdd);
                }
            });

            element.animationClasses = animationClasses;

            return element;
        }
    }, {
        key: "addClasses",
        value: function addClasses(eventObj) {
            var selector = eventObj.element,
                _eventObj$classes = eventObj.classes,
                classes = _eventObj$classes === undefined ? "" : _eventObj$classes;

            var elements = this._getArrayFromAllSelector(selector);
            var classNames = this._getClassNames(classes);

            elements.forEach(function (element) {

                classNames.forEach(function (className) {
                    element.classList.add(className);
                });
            });
        }
    }, {
        key: "removeClasses",
        value: function removeClasses(eventObj) {
            var selector = eventObj.element,
                _eventObj$classes2 = eventObj.classes,
                classes = _eventObj$classes2 === undefined ? "" : _eventObj$classes2;

            var elements = this._getArrayFromAllSelector(selector);
            var classNames = this._getClassNames(classes);

            elements.forEach(function (element) {
                classNames.forEach(function (className) {
                    element.classList.remove(className);
                });
            });
        }
    }, {
        key: "_getClassNames",
        value: function _getClassNames() {
            var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            if (!classes || !classes.split) return [];

            return classes.split(' ');
        }
    }, {
        key: "_getArrayFromAllSelector",
        value: function _getArrayFromAllSelector(selector) {
            var elements = document.querySelectorAll(selector);

            if (!elements || elements.length <= 0) return [];

            return Array.from(elements);
        }
    }, {
        key: "goToNextState",
        value: function goToNextState(eventObj) {
            var _this = this;

            var navArray = eventObj.next;

            var self = this;
            var nextState = this.rules(navArray);
            var deferred = new Promise(function (resolve, reject) {
                if (nextState) {
                    _this.Bus.emit(self.stateEventNames.GO, { stateId: nextState });
                    resolve();
                }
            });

            return deferred;
        }

        /**
         * 
         */

    }, {
        key: "animateElement",
        value: function animateElement(eventObj) {
            var _this2 = this;

            var element = eventObj.element;

            var animationElements = document.querySelectorAll(element);

            if (!animationElements || animationElements.length <= 0) return;

            animationElements = Array.from(animationElements);

            animationElements.forEach(function (animationElement, index) {
                animationElement = _this2.setElementClasses(animationElement, eventObj);
            });

            var animateElementPromise = new Promise(function (resolve, reject) {
                var animationEnds = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'osanimationend', 'animationend'];

                animationEnds.forEach(function (animationEndName) {
                    animationElements.forEach(function (animationElement, index) {
                        animationElement.addEventListener(animationEndName, endAnimation);
                    });
                });

                function endAnimation(event) {
                    animationElements.forEach(function (animationElement, index) {
                        animationEnds.forEach(function (animationEndName) {
                            animationElement.animationClasses = eventObj.animationClasses;
                            animationElement.removeEventListener(animationEndName, endAnimation);
                        });
                    });

                    resolve();
                }
            });

            return animateElementPromise;
        }
    }, {
        key: "goToState",
        value: function goToState(eventObj, iVXjsBus) {
            var state = eventObj.state;


            if (iVXjsBus) {
                iVXjsBus.emit(this.stateEventNames.GO, eventObj);
            }
        }
    }, {
        key: "playAudioClip",
        value: function playAudioClip(eventObj) {
            var audioEventNames = this.audioEventNames;

            var self = this;

            if (eventObj) {
                this.Bus.emit(audioEventNames.SET_UP, eventObj);
                this.Bus.emit(audioEventNames.PLAY);
            }

            this.Bus.on(audioEventNames.TIME_UPDATE, function (currentAudio) {
                if (currentAudio.id === eventObj.id) {
                    currentAudio.runCuePoints(self.processor);
                }
            });

            var audioClipPromise = new Promise(function (resolve, reject) {
                self.Bus.once(audioEventNames.ENDED, function (currentAudio) {
                    if (currentAudio.id === eventObj.id) {
                        self.processor.resolveActions(eventObj.onEnd, function () {
                            resolve();
                        });
                    }
                });
            });

            return audioClipPromise;
        }
    }, {
        key: "setData",
        value: function setData(eventObj) {
            var key = eventObj.key,
                value = eventObj.value;

            var self = this;
            var setDataPromise = new Promise(function (resolve, reject) {
                self.data[key] = value;

                self.Log.debug("Current Experience Data", {
                    group: true,
                    messages: Object.keys(self.data).map(function (dataKey, index) {
                        return {
                            message: dataKey + ":" + self.data[dataKey],
                            data: self.data[dataKey]
                        };
                    })
                }, self.data);
                resolve(self);
            });

            return setDataPromise;
        }
    }]);

    return Actions;
}();

;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _audio = __webpack_require__(20);

var _audio2 = _interopRequireDefault(_audio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_AudioConstants) {
    _inherits(_class, _AudioConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            ADD_PLAYING_CLASS: 'add-playing-class',
            BUFFERING: "buffering",
            CAN_PLAY: "can-play",
            DISPOSE: "dispose",
            ENDED: "ended",
            GET_DURATION: "get-duration",
            MUTE: "mute",
            PAUSE: "pause",
            PAUSED: "paused",
            PLAY: "play",
            PLAYING: "playing",
            SEEK: "seek",
            SET_UP: "set-up",
            SET_DURATION: "set-duration",
            SET_VOLUME: "set-volume",
            VOLUME: "set-volume",
            TIME_UPDATE: "time-update",
            UNMUTE: "unmute"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var DELIMETER = this.DELIMETER;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
        }
    }]);

    return _class;
}(_audio2.default);

exports.default = _class;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConstants) {
    _inherits(_class, _iVXjsConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.AUDIO = "audio";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                AUDIO = this.AUDIO;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + AUDIO;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evaluator = __webpack_require__(15);

var _evaluator2 = _interopRequireDefault(_evaluator);

var _isEmpty = __webpack_require__(16);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A default rule system in which iVXjs chooses which state 
 * to go to based of the current iVXjs Experience data.
 */
var Rules = exports.Rules = function () {

    /**
     * Adds the experience in which this data 
     * will be evaluated to.
     * 
     * @param {object} experience - iVXjsExperience 
     * object in which data will be used to evaluate various rules.
     */
    function Rules() {
        var experience = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: {} };
        var customEvaluator = arguments[1];

        _classCallCheck(this, Rules);

        Object.assign(this, {
            experience: experience,
            evaluator: new _evaluator2.default(experience, customEvaluator)
        });
    }

    /**
     * The default rules function that will process an 
     * array of navigation objects and evaluate them using 
     * the processRules function.
     * 
     * @type {Function}
     */


    _createClass(Rules, [{
        key: "processRules",


        /**
         * Processes through and returns the first nav object whose 
         * rule is evaluated to true or rules are empty.
         * 
         * @param {array} navArray - An array of navigation objects 
         * with rules and states to be evaluated.
         * @return {string} - the stateId of the rule that was evaluated 
         * true first. If no state is return, returns an empty string.
         */
        value: function processRules() {
            var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var legacy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var customEvaluator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
                return false;
            };

            if (legacy) return this.processStateRules(rules);

            return this.findMatchngRule(rules, customEvaluator);
        }
    }, {
        key: "processStateRules",
        value: function processStateRules(next) {
            if (!Array.isArray(next)) {
                next = [];
            }

            var stateSelect = this.findMatchngRule(next);
            var _stateSelect$stateId = stateSelect.stateId,
                stateId = _stateSelect$stateId === undefined ? '' : _stateSelect$stateId,
                route = stateSelect.route;


            return route ? route : stateId;
        }
    }, {
        key: "findMatchngRule",
        value: function findMatchngRule(rules) {
            var customEvaluator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
                return false;
            };

            var self = this;

            return rules.find(function (ruleObj) {
                var ruleDefinition = ruleObj.rule;


                return self.getMatchingRule(ruleDefinition, customEvaluator);
            }) || {};
        }
    }, {
        key: "getMatchingRule",
        value: function getMatchingRule(rule) {
            var customEvaluator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
                return false;
            };
            var evaluator = this.evaluator;


            if ((0, _isEmpty2.default)(rule)) return true;

            var conditions = rule.conditions,
                _rule$conditionOperat = rule.conditionOperator,
                conditionOperator = _rule$conditionOperat === undefined ? "and" : _rule$conditionOperat;


            if (!conditions) {
                rule.conditionOperator = conditionOperator;
                rule.conditions = [rule];
            }

            return evaluator.evaluate(rule, customEvaluator);
        }
    }, {
        key: "addEvaluator",
        value: function addEvaluator(evaluatorName, evaluatorFn) {
            this.evaluator[evaluatorName] = evaluatorFn;
        }
    }, {
        key: "rules",
        get: function get() {
            var self = this;

            return function () {
                var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                var legacy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                var customEvaluator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
                    return false;
                };

                return self.processRules(navArray, legacy, customEvaluator);
            };
        }
    }]);

    return Rules;
}();

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(9);

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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(12),
    nativeKeys = __webpack_require__(26);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(27);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(29),
    Map = __webpack_require__(34),
    Promise = __webpack_require__(35),
    Set = __webpack_require__(36),
    WeakMap = __webpack_require__(37),
    baseGetTag = __webpack_require__(3),
    toSource = __webpack_require__(13);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(6),
    isMasked = __webpack_require__(31),
    isObject = __webpack_require__(11),
    toSource = __webpack_require__(13);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(32);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(2),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(39),
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(6),
    isLength = __webpack_require__(14);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(0),
    stubFalse = __webpack_require__(43);

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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(45),
    baseUnary = __webpack_require__(46),
    nodeUtil = __webpack_require__(47);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isLength = __webpack_require__(14),
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
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(10);

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
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _firebase = __webpack_require__(52);

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Firebase) {
    _inherits(_class, _Firebase);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.AUTHENTICATION = "auth";

        var eventNames = {
            REQUEST_PASSWORD: "request-password",
            GET_PASSWORD: "get-password",
            ACCOUNT_EXISTS: "account-exists-with-different-credential"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var DELIMETER = this.DELIMETER,
                AUTHENTICATION = this.AUTHENTICATION;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + AUTHENTICATION + DELIMETER + eventName;
        }
    }]);

    return _class;
}(_firebase2.default);

exports.default = _class;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConstants) {
    _inherits(_class, _iVXjsConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.FIREBASE = "firebase";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                FIREBASE = this.FIREBASE;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + FIREBASE;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var objectParser = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "addRemoteTemplates",
        value: function addRemoteTemplates(configData, templateRef) {
            var templateLocations = this.templateLocations;

            var newConfigData = JSON.parse(JSON.stringify(configData));
            var states = newConfigData.states;

            var storage = firebase.storage();
            var storageRef = storage.ref('/');

            var templateUrlPromise = new Promise(function (resolve, reject) {
                var urlGetPromises = [];
                var urlPaths = [];

                states.forEach(function (state, stateIndex) {
                    var type = state.type;

                    var templateLocation = templateLocations[type];

                    templateLocation.forEach(function (path, index) {
                        if (typeValidator.isString(path)) {
                            var templateFile = objectParser.getValueFromPath(path, state);

                            if (templateFile) {
                                urlGetPromises.push(storageRef.child(templateFile).getDownloadURL());
                                urlPaths.push("states." + stateIndex + "." + path);
                            }
                        } else {
                            var templatePath = path.path,
                                _path$keys = path.keys,
                                keys = _path$keys === undefined ? [] : _path$keys;

                            var keyData = state[templatePath];

                            pullFromTemplatesFromArrays(path, state, urlGetPromises, urlPaths, "states." + stateIndex);

                            keys.forEach(function (key, keyIndex) {
                                if (Array.isArray(keyData)) {
                                    keyData.forEach(function (thisKeyData, index) {
                                        pullFromTemplatesFromArrays(key, thisKeyData, urlGetPromises, urlPaths, "states." + stateIndex + "." + templatePath + "." + keyIndex);
                                    });
                                }
                            });
                        }
                    });
                });

                Promise.all(urlGetPromises).then(function (result) {
                    newConfigData.templates = result;

                    $.support.cors = true;
                    $.get(result[0]).then(function (html) {});

                    resolve(newConfigData);
                }, function (error) {
                    console.dir(error);
                    reject(error);
                });
            });

            function pullFromTemplatesFromArrays(path, data, urlGetPromises, urlPaths, pathHeader) {
                var templatePath = path.path,
                    templateKey = path.templateKey,
                    _path$keys2 = path.keys,
                    keys = _path$keys2 === undefined ? [] : _path$keys2;

                var templateDataArray = objectParser.getValueFromPath(templatePath, data);

                if (!typeValidator.isEmpty(templateDataArray)) {
                    var updatedArray = templateDataArray.map(function (templateData, index) {
                        var templateFile = objectParser.getValueFromPath(templateKey, templateData);

                        if (templateFile) {
                            urlGetPromises.push(storageRef.child(templateFile).getDownloadURL());
                            urlPaths.push(pathHeader + "." + templatePath + "." + index + "." + templateKey);
                        }
                    });
                }
            }

            return templateUrlPromise;
        }
    }, {
        key: "detokenize",
        value: function detokenize(ref) {
            var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var experience = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var iVXjsLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console;
            var data = experience.data,
                experienceKey = experience.key;

            var _ref = user == null ? {} : user,
                uid = _ref.uid;

            var newRef = ref.replace(/\$uid/g, function (uidValue) {
                return uid ? uid : uidValue;
            }).replace(/\$x.key/g, function ($xKey) {
                return experienceKey ? experienceKey : $xKey;
            }).replace(/\$x.data.[a-z,A-Z,0-9]*/g, function (searchValue) {
                var dataValue = objectParser.getValueFromPath(searchValue, experience);
                var validValue = typeValidator.isString(dataValue) || typeValidator.isBoolean(dataValue) || typeValidator.isNumber(dataValue);
                if (validValue) {
                    return dataValue;
                } else {
                    iVXjsLog.warn(searchValue + " is invalid. Make sure this value is a String, Boolean, or Number.");
                    return searchValue;
                }
            });

            var hasUID = newRef.indexOf("$uid") >= 0;
            var hasExperienceKey = newRef.indexOf("$x.key") >= 0;
            var hasData = newRef.indexOf("$x.data") >= 0;
            var notValidDetokened = hasUID || hasExperienceKey || hasData;

            if (hasUID) {
                iVXjsLog.warn("This link can't be detokenized because this path because there is no Authorized User.");
            }

            if (hasExperienceKey) {
                iVXjsLog.warn("This link can't be detokenized because this path because there is no active experience.");
            }

            return notValidDetokened ? !notValidDetokened : newRef;
        }
    }, {
        key: "templateLocations",
        get: function get() {
            return {
                input: ["header.templateUrl", "footer.templateUrl", "form.labelTemplateUrl", "form.submit.labelTemplateUrl", {
                    path: "inputs",
                    templateKey: "labelTemplateUrl",
                    keys: [{
                        path: "buttons",
                        templateKey: "labelTemplateUrl"
                    }, {
                        path: "radioButtons",
                        templateKey: "labelTemplateUrl"
                    }]
                }],
                navigation: ["header.templateUrl", "footer.templateUrl", {
                    path: "links",
                    templateKey: "labelTemplateUrl"
                }],
                html: ["templateUrl"],
                video: ["header.templateUrl", "footer.templateUrl", {
                    path: "personalizations",
                    templateKey: "templateUrl"
                }]
            };
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FirebaseData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(5);

var _iVXjsConfigEvents = __webpack_require__(57);

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _stateEvents = __webpack_require__(8);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _firebaseAuthentication = __webpack_require__(51);

var _firebaseAuthentication2 = _interopRequireDefault(_firebaseAuthentication);

var _actions = __webpack_require__(18);

var _rules = __webpack_require__(59);

var _utilities = __webpack_require__(53);

var _utilities2 = _interopRequireDefault(_utilities);

var _actions2 = __webpack_require__(60);

var _actions3 = _interopRequireDefault(_actions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultActions = new _actions.Actions();
var myObjectParser = new _typeParsers.ObjectParsers();
var utilities = new _utilities2.default();

var FirebaseData = exports.FirebaseData = function () {
    function FirebaseData() {
        var moduleSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var iVXjsSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var Bus = arguments[2];
        var iVXjsLog = arguments[3];

        _classCallCheck(this, FirebaseData);

        var data = iVXjsSettings.data,
            defaultExperience = iVXjsSettings.experience;
        var _defaultExperience$da = defaultExperience.data,
            defaultExperienceData = _defaultExperience$da === undefined ? {} : _defaultExperience$da;
        var apiKey = data.apiKey,
            authDomain = data.authDomain,
            databaseURL = data.databaseURL,
            storageBucket = data.storageBucket,
            _data$auth = data.auth,
            auth = _data$auth === undefined ? false : _data$auth,
            _data$createExperienc = data.createExperienceOnLoad,
            createExperienceOnLoad = _data$createExperienc === undefined ? true : _data$createExperienc,
            _data$experiencePath = data.experiencePath,
            experiencePath = _data$experiencePath === undefined ? "experiences" : _data$experiencePath,
            _data$localTemplates = data.localTemplates,
            localTemplates = _data$localTemplates === undefined ? false : _data$localTemplates,
            templateRef = data.templateRef;


        this.iVXjsSettings = iVXjsSettings;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;

        // Initialize Firebase
        var config = {
            apiKey: apiKey,
            authDomain: authDomain,
            databaseURL: databaseURL,
            storageBucket: storageBucket
        };

        firebase.initializeApp(config);

        this.auth = auth;
        this.databaseURL = databaseURL;
        this.firebaseConstants = new _firebaseAuthentication2.default();
        this.createExperienceOnLoad = createExperienceOnLoad;
        this.experiencePath = experiencePath;
        this.localTemplates = localTemplates;
        this.defaultExperience = defaultExperience;
        this.templateRef = templateRef;
    }

    _createClass(FirebaseData, [{
        key: 'setUpExperience',
        value: function setUpExperience(dataFromServer, src, resolve) {
            var auth = this.auth,
                createExperienceOnLoad = this.createExperienceOnLoad,
                defaultExperience = this.defaultExperience;
            var experiencePath = this.experiencePath,
                localTemplates = this.localTemplates,
                templateRef = this.templateRef;
            var firebaseConstants = this.firebaseConstants,
                iVXjsLog = this.iVXjsLog;

            var self = this;
            var database = firebase.database();
            var _iVXjsSettings = this.iVXjsSettings,
                _iVXjsSettings$experi = _iVXjsSettings.experience,
                modifiedExperience = _iVXjsSettings$experi === undefined ? {} : _iVXjsSettings$experi,
                customRules = _iVXjsSettings.rules,
                _iVXjsSettings$ui = _iVXjsSettings.ui,
                ui = _iVXjsSettings$ui === undefined ? 'default' : _iVXjsSettings$ui,
                _iVXjsSettings$valida = _iVXjsSettings.validation,
                validation = _iVXjsSettings$valida === undefined ? 'iVXjsValidation' : _iVXjsSettings$valida;

            var experience = myObjectParser.merge(new _actions.Actions(), modifiedExperience);
            var firebaseExperience = myObjectParser.merge(experience, new _actions3.default(this.iVXjsLog).experienceActions);
            experience.experiencePath = experiencePath;

            if (!localTemplates) {
                utilities.addRemoteTemplates(dataFromServer, templateRef).then(function (configData) {
                    initializeExperience(configData);
                });
            } else {
                initializeExperience(dataFromServer);
            }

            function initializeExperience(configData) {
                firebase.auth().getRedirectResult().then(function (data) {
                    var redirectUser = data.user;


                    if (!createExperienceOnLoad) {
                        sendConfigData(configData);
                        return;
                    }

                    if (!redirectUser || !localStorage) {
                        createExperience(configData);
                    } else {
                        var _localStorage = localStorage,
                            redirectOrigin = _localStorage.redirectOrigin;

                        var exisitingExperienceData = JSON.parse(redirectOrigin);
                        var user = data.user,
                            crediential = data.crediential;


                        setUpExistingExperience(user, exisitingExperienceData, configData);
                    }
                }).catch(function (error) {
                    self.Bus.emit(firebaseConstants.ACCOUNT_EXISTS, error);
                    console.dir(error);
                    var errorMessage = {
                        message: 'Firebase couldn\'t authenticate with email, ' + error.email + ', due to error code ' + error.code + '. \n            You can handle this error by listening for event: ' + firebaseConstants.ACCOUNT_EXISTS + '.',
                        type: "FIREBASE:AUTHENTICATION"
                    };
                    iVXjsLog.error(errorMessage, "Firebase");
                });
            }

            function sendConfigData(configData) {
                var user = firebase.auth().currentUser;

                experience.src = src;
                experience.user = user;
                experience.iVXjsLog = self.iVXjsLog;

                var enhanced = {
                    config: configData,
                    experience: firebaseExperience,
                    rules: new _rules.Rules(experience, customRules).rules
                };

                resolve(enhanced);
            }

            function setUpExistingExperience(user, exisitingExperienceData, configData) {
                var key = exisitingExperienceData.key,
                    next = exisitingExperienceData.next;

                experience.key = key;
                experience.user = user;
                experience.iVXjsLog = self.iVXjsLog;

                self.Bus.once(new _iVXjsConfigEvents2.default().VALIDATED, function (iVXjs) {
                    iVXjs.experience.goToNextState({ next: next });
                });

                var enhanced = {
                    config: configData,
                    experience: firebaseExperience,
                    rules: new _rules.Rules(experience, customRules).rules
                };

                database.ref('users/' + user.uid).once('value').then(function (data) {

                    if (data.val() === null) {
                        var newUsers = {};

                        newUsers[user.uid] = {
                            email: user.email
                        };

                        database.ref('users').set(newUsers).then(function (userData) {
                            addExperienceToUser(user, key, resolve, enhanced);
                        });
                    } else {
                        var currentUserData = data.val();

                        currentUserData.uid = user.uid;

                        addExperienceToUser(currentUserData, key, resolve, enhanced);
                    }
                });
            }

            function createExperience(configData) {
                var user = firebase.auth().currentUser;
                var newExperienceData = {
                    src: src
                };
                var detokenedExperiencePath = utilities.detokenize(experiencePath, user, defaultExperience);
                var newExperienceKey = void 0;

                if (user) {
                    newExperienceData.user = {};
                    newExperienceData.user[user.uid] = true;
                    experience.user = user;
                }

                if (detokenedExperiencePath) {
                    newExperienceKey = firebase.database().ref(detokenedExperiencePath).push(newExperienceData).key;
                }

                experience.key = newExperienceKey;
                experience.auth = auth;
                experience.src = src;
                experience.iVXjsLog = self.iVXjsLog;

                var enhanced = {
                    config: configData,
                    experience: firebaseExperience,
                    rules: new _rules.Rules(experience, customRules).rules
                };

                if (user && detokenedExperiencePath) {
                    experience.user = user;

                    database.ref('users/' + user.uid).once('value').then(function (data) {
                        if (data.val() === null) {
                            var newUsers = {};
                            var newUserData = {
                                email: user.email,
                                name: user.displayName,
                                photoURL: user.photoURL,
                                uid: user.uid
                            };
                            newUsers[user.uid] = newUserData;

                            database.ref('users').set(newUsers).then(function (userData) {
                                addExperienceToUser(newUserData, newExperienceKey, resolve, enhanced);
                            });
                        } else {
                            var currentUserDataFromServer = data.val();
                            var _currentUserDataFromS = currentUserDataFromServer.uid,
                                uid = _currentUserDataFromS === undefined ? user.uid : _currentUserDataFromS,
                                _currentUserDataFromS2 = currentUserDataFromServer.email,
                                email = _currentUserDataFromS2 === undefined ? user.email : _currentUserDataFromS2,
                                _currentUserDataFromS3 = currentUserDataFromServer.name,
                                name = _currentUserDataFromS3 === undefined ? user.displayName : _currentUserDataFromS3,
                                _currentUserDataFromS4 = currentUserDataFromServer.avatar,
                                avatar = _currentUserDataFromS4 === undefined ? user.photoURL : _currentUserDataFromS4,
                                _currentUserDataFromS5 = currentUserDataFromServer.experiences,
                                experiences = _currentUserDataFromS5 === undefined ? {} : _currentUserDataFromS5;

                            var currentUserData = {
                                uid: uid,
                                email: email,
                                name: name,
                                avatar: avatar,
                                experiences: experiences
                            };

                            addExperienceToUser(currentUserData, newExperienceKey, resolve, enhanced);
                        }
                    });

                    return;
                }

                resolve(enhanced);
            }

            function addExperienceToUser(userData, experienceKey, resolve, enhanced) {
                var _userData$experiences = userData.experiences,
                    experiences = _userData$experiences === undefined ? {} : _userData$experiences,
                    uid = userData.uid;


                delete userData.uid;

                experiences[experienceKey] = true;
                userData.experiences = experiences;
                database.ref('users/' + uid).update(userData);

                resolve(enhanced);
            }
        }
    }, {
        key: 'enhance',
        value: function enhance() {
            var self = this;
            var auth = self.auth,
                iVXjsSettings = self.iVXjsSettings,
                databaseURL = self.databaseURL;
            var config = iVXjsSettings.config;

            var database = firebase.database();
            var enhancePromise = new Promise(function (resolve, reject) {
                database.ref(config).once('value').then(function (data) {
                    self.setUpExperience(data.val(), config, resolve);
                });
            });

            return enhancePromise;
        }
    }]);

    return FirebaseData;
}();

module.export = initializeFirebase;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.data.firebase', initializeFirebase).constant('iVXjsDataFirebase', initializeFirebase).provider('iVXjsFirebaseUtilities', function iVXjsFirebaseUtilitiesProvider() {
        this.utilities = new _utilities2.default();
        this.$get = function () {};
    });
}

function initializeFirebase(settings) {
    settings.module = FirebaseData;

    return settings;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXjsConfig = __webpack_require__(58);

var _iVXjsConfig2 = _interopRequireDefault(_iVXjsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConfigConstants) {
    _inherits(_class, _iVXjsConfigConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            VALIDATED: "validated",
            NOT_VALID: "not-valid",
            ANALYTICS_SET: "analytics-set",
            ANALYTICS_FINISHED: "analytics-finished"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var DELIMETER = this.DELIMETER;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
        }
    }]);

    return _class;
}(_iVXjsConfig2.default);

exports.default = _class;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConstants) {
    _inherits(_class, _iVXjsConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.CONFIG = "config";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                CONFIG = this.CONFIG;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + CONFIG;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = __webpack_require__(21);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rules = exports.Rules = function (_DefaultRules) {
    _inherits(Rules, _DefaultRules);

    function Rules() {
        var experience = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: {} };
        var customRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        _classCallCheck(this, Rules);

        var _this = _possibleConstructorReturn(this, (Rules.__proto__ || Object.getPrototypeOf(Rules)).call(this, experience, customRules));

        _this.experience = experience;
        _this.customRules = customRules;
        return _this;
    }

    _createClass(Rules, [{
        key: 'processRules',
        value: function processRules() {
            var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var self = this;
            var stateSelect = navArray.find(function (navObj) {
                var isAuthRule = navObj.rule && navObj.rule.key && navObj.rule.key === 'auth';

                if (isAuthRule) {
                    return firebase.auth().currentUser;
                }

                return self.evaluateRules(navObj);
            });

            return stateSelect ? stateSelect : '';
        }
    }, {
        key: 'rules',
        get: function get() {
            var self = this;

            return function () {
                var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


                var customRuleStateId = self.customRules(navArray);

                if (customRuleStateId) {
                    return customRuleStateId;
                }

                var nextStateId = self.processRules(navArray).stateId;
                var nextState = self.experience.config.states.find(function (state, index) {
                    return nextStateId === state.id;
                });

                return nextStateId;
            };
        }
    }]);

    return Rules;
}(_rules.Rules);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseAuthentication = __webpack_require__(51);

var _firebaseAuthentication2 = _interopRequireDefault(_firebaseAuthentication);

var _firebaseEvents = __webpack_require__(61);

var _firebaseEvents2 = _interopRequireDefault(_firebaseEvents);

var _typeParsers = __webpack_require__(5);

var _stateEvents = __webpack_require__(8);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _utilities = __webpack_require__(53);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var objectParser = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();
var utilities = new _utilities2.default();

var _class = function () {
    function _class(iVXjsLog) {
        _classCallCheck(this, _class);

        this.iVXjsLog = iVXjsLog;
        this.authConstants = new _firebaseAuthentication2.default();
        this.stateEventNames = new _stateEvents2.default();
        this.eventConstants = new _firebaseEvents2.default();
    }

    _createClass(_class, [{
        key: "getExternalTemplates",
        value: function getExternalTemplates(templatePath) {
            if (this.localTemplates || !templatePath) return;

            var storage = firebase.storage();
            var pathReference = storage.ref(templatePath);

            return pathReference.getDownloadURL();
        }
    }, {
        key: "uploadFile",
        value: function uploadFile(file) {
            var currentUser = firebase.auth().currentUser;
            var fileName = file.name;


            if (currentUser) {
                var uid = currentUser.uid;

                var storageRef = firebase.storage().ref("/" + uid + "/" + fileName);
                var promise = storageRef.put(file);
                return promise;
            }
        }
    }, {
        key: "createExperience",
        value: function createExperience(eventObj) {
            var _eventObj$data = eventObj.data,
                defaultData = _eventObj$data === undefined ? {} : _eventObj$data;
            var experiencePath = this.experiencePath,
                data = this.data,
                src = this.src;

            var database = firebase.database();
            var self = this;
            var createExperiencePromise = new Promise(function (resolve, reject) {

                self.Bus.once(self.stateEventNames.GET_STATE, function (currentState) {
                    defaultData.src = src;
                    defaultData.stateSrc = currentState.data.id;

                    var stateData = currentState.data;
                    var detokenedPath = utilities.detokenize(experiencePath, self.user, self, self.iVXjsLog);

                    var _firebase$auth = firebase.auth(),
                        currentUser = _firebase$auth.currentUser;

                    if (currentUser) {
                        defaultData.user = {};
                        defaultData.user[currentUser.uid] = true;
                    }

                    var newExperienceKey = database.ref(utilities.detokenize(experiencePath, self.user, self, self.iVXjsLog)).push(defaultData).key;
                    var eventConstants = new _firebaseEvents2.default();

                    self.key = newExperienceKey;
                    self.data = defaultData;

                    if (currentUser) {
                        var uid = currentUser.uid;


                        database.ref("users/" + uid).once('value').then(function (data) {
                            var _data$val = data.val(),
                                experiences = _data$val.experiences;

                            if (!experiences) {
                                var newExperience = {};

                                newExperience[newExperienceKey] = true;
                                database.ref("users/" + uid).update({
                                    experiences: newExperience
                                });
                            } else {
                                experiences[newExperienceKey] = true;
                                database.ref("users/" + uid).update({
                                    experiences: experiences
                                });
                                self.Bus.emit(eventConstants.CREATE_EXPERIENCE, data, newExperienceKey, currentUser);
                                resolve(newExperienceKey, currentUser);
                            }
                        });
                    } else {
                        self.Bus.emit(eventConstants.CREATE_EXPERIENCE, data, newExperienceKey);
                        resolve(newExperienceKey);
                    }
                });

                self.Bus.emit(self.stateEventNames.REQUEST_STATE);
            });

            return createExperiencePromise;
        }
    }, {
        key: "isRestricted",
        value: function isRestricted() {
            return new Promise(function (resolve, reject) {
                firebase.auth().onAuthStateChanged(function (user) {

                    resolve(!user);
                });
            });
        }
    }, {
        key: "signOutUser",
        value: function signOutUser() {
            var firebaseAuth = firebase.auth();
            return firebaseAuth.signOut();
        }
    }, {
        key: "signInWithGithub",
        value: function signInWithGithub(args, resolve) {
            var self = this;
            var provider = new firebase.auth.GithubAuthProvider();
            var experienceKey = this.key;

            var firebaseAuth = firebase.auth();

            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "signInAnonymously",
        value: function signInAnonymously(args, resolve) {
            var experienceKey = this.key;

            var firebaseAuth = firebase.auth();

            firebaseAuth.signInAnonymously().catch(function (error) {});
        }
    }, {
        key: "handleRedirect",
        value: function handleRedirect(stateData, provider, args) {
            var _args$scope = args.scope,
                scope = _args$scope === undefined ? [] : _args$scope;


            scope.forEach(function (thisScope, index) {
                if (provider.addScope) {
                    provider.addScope(thisScope);
                }
            });
            stateData.key = this.key;

            if (localStorage) {
                localStorage.redirectOrigin = JSON.stringify(stateData);
            }

            firebase.auth().signInWithRedirect(provider);
        }
    }, {
        key: "signInWithGoogle",
        value: function signInWithGoogle(args, resolve) {
            var self = this;
            var experienceKey = this.key;

            var provider = new firebase.auth.GoogleAuthProvider();
            var newExperience = {};
            newExperience[experienceKey] = true;

            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider, args);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "signInWithTwitter",
        value: function signInWithTwitter(args, resolve) {
            var self = this;
            var provider = new firebase.auth.TwitterAuthProvider();
            var experienceKey = this.key;


            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "signInWithFacebook",
        value: function signInWithFacebook(args, resolve) {
            var self = this;
            var provider = new firebase.auth.FacebookAuthProvider();
            var experienceKey = this.key;


            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "setUpUsers",
        value: function setUpUsers(user, experienceKey, resolve) {
            firebase.database().ref('users/' + user.uid).update({
                email: user.email
            });
            firebase.database().ref('users/' + user.uid + '/experiences/' + experienceKey).set(true);

            resolve(user);
        }
    }, {
        key: "signInWithEmail",
        value: function signInWithEmail(args, resolve) {
            var self = this;
            var experienceKey = this.key;


            this.Bus.once(this.authConstants.GET_PASSWORD, getPassword);

            function getPassword(password) {
                var emailKey = args.emailKey;
                var data = self.data;

                var email = data[emailKey];

                firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                    self.setUpUsers(result, experienceKey, resolve);
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...

                    // console.log(error.code);
                });
            }

            this.Bus.emit(this.authConstants.REQUEST_PASSWORD);
        }
    }, {
        key: "signInUser",
        value: function signInUser(signInType, args, resolve) {
            switch (signInType) {
                case "google":
                    this.signInWithGoogle(args, resolve);
                    return;
                case "email":
                    this.signInWithEmail(args, resolve);
                    return;
                case "facebook":
                    this.signInWithFacebook(args, resolve);
                    return;
                case "twitter":
                    this.signInWithTwitter(args, resolve);
                    return;
                case "github":
                    this.signInWithGithub(args, resolve);
                    return;
                case "anonymous":
                    this.signInAnonymously(args, resolve);
            }

            resolve();
        }
    }, {
        key: "authorizeUser",
        value: function authorizeUser(eventObj) {
            var authType = eventObj.authType;

            var self = this;
            var experienceKey = self.key;

            var authPromise = new Promise(function (resolve, reject) {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        var uid = user.uid,
                            _user$email = user.email,
                            email = _user$email === undefined ? "" : _user$email,
                            displayName = user.displayName;


                        firebase.database().ref('users/' + user.uid).update({
                            email: user.email
                        });

                        if (experienceKey) {
                            firebase.database().ref("users/" + user.uid + "/experiences/" + experienceKey).set(true);
                        }

                        self.data.user = { uid: uid, email: email, displayName: displayName };

                        resolve(user);
                    } else {
                        self.signInUser(authType, eventObj, resolve);
                    }
                });
            });

            return authPromise;
        }
    }, {
        key: "setData",
        value: function setData(eventObj) {
            var self = this;
            var database = firebase.database();
            var _self$data = self.data,
                data = _self$data === undefined ? {} : _self$data,
                experienceKey = self.key,
                auth = self.auth,
                iVXjsLog = self.iVXjsLog,
                experiencePath = self.experiencePath;
            var key = eventObj.key,
                value = eventObj.value,
                ref = eventObj.ref,
                _eventObj$user = eventObj.user,
                user = _eventObj$user === undefined ? false : _eventObj$user;

            var updateData = {};
            var currentUser = firebase.auth().currentUser;
            var refPath = utilities.detokenize(experiencePath + "/$x.key", self.user, self, iVXjsLog);

            if (!ref && !experienceKey && !user) {
                return;
            }

            if (!currentUser && user) {
                iVXjsLog.warn("Authorization Required. Key: " + key + " Value: " + value + " was not saved to the Firebase Database.");
                return;
            }

            updateData[key] = value;

            if (currentUser && user) {
                var uid = currentUser.uid;


                return database.ref("users/" + uid).update(updateData).then(function () {
                    self.user[key] = value;
                });
            }

            if (ref) {
                var detokenedRef = utilities.detokenize(ref, self.user, self, iVXjsLog);

                if (detokenedRef) {
                    return database.ref(detokenedRef).update(updateData).then(function () {});
                }
            }

            if (refPath) {
                return database.ref(refPath).update(updateData).then(function () {
                    self.data[key] = value;
                });
            }

            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    }, {
        key: "experienceActions",
        get: function get() {
            return {
                authorizeUser: this.authorizeUser,
                eventListeners: this.eventListeners,
                signInUser: this.signInUser,
                signOutUser: this.signOutUser,
                signInWithGoogle: this.signInWithGoogle,
                signInWithFacebook: this.signInWithFacebook,
                signInWithTwitter: this.signInWithTwitter,
                signInWithEmail: this.signInWithEmail,
                signInWithGithub: this.signInWithGithub,
                signInAnonymously: this.signInAnonymously,
                handleRedirect: this.handleRedirect,
                setUpUsers: this.setUpUsers,
                setData: this.setData,
                authConstants: this.authConstants,
                stateEventNames: this.stateEventNames,
                uploadFile: this.uploadFile,
                isRestricted: this.isRestricted,
                addEventListeners: this.addEventListners,
                createExperience: this.createExperience,
                getExternalTemplates: this.getExternalTemplates
            };
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _firebase = __webpack_require__(52);

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Firebase) {
    _inherits(_class, _Firebase);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            CREATE_EXPERIENCE: "create-experience"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var DELIMETER = this.DELIMETER;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
        }
    }]);

    return _class;
}(_firebase2.default);

exports.default = _class;

/***/ })
/******/ ]);