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
/******/ 	return __webpack_require__(__webpack_require__.s = 155);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(30);
var hide = __webpack_require__(16);
var redefine = __webpack_require__(17);
var ctx = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createFactoryFunction;
function createFactoryFunction(constructor) {
	var constructorFn = constructor;
	var args = constructorFn.$inject;
	var factoryFunction = function factoryFunction() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))();
	};

	args.push(factoryFunction);

	return args;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(67)('wks');
var uid = __webpack_require__(42);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(120);
var toPrimitive = __webpack_require__(31);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(32);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = __webpack_require__(113);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_VideoConstants) {
    _inherits(_class, _VideoConstants);

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
            READY_PLAYER: "ready-player",
            SEEK: "seek",
            SET_DURATION: "set-duration",
            SET_VOLUME: "set-volume",
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
}(_video2.default);

exports.default = _class;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts an object with attributes and keys into HTML
 * that inputs can be used.
 */
var AttributeTags = exports.AttributeTags = function () {

  /**
   * Pulls all the attribute settings and the attributes 
   * to be rendered.
   * @param {Object} attributeData - settings for all the attributes.
   * @param {Array} attributeKeys - attribute names to be set.
   */
  function AttributeTags() {
    var attributeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attributeKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, AttributeTags);

    /**
     * All attributes to be made.
     * @type {Object}
     */
    this.attributeData = attributeData;

    /**
     * Attribute names to be set.
     * @type {Array}
     */
    this.attributeKeys = attributeKeys;
  }

  /**
   * Renders attributes based on the keys and attribute data.
   * @example
   * attributeData = { required = "true"};
   * attributeKeys = ["required"];
   * 
   * // Becomes: 
   * html = 'required = "true"'
   * 
   * @type {String}
   */


  _createClass(AttributeTags, [{
    key: 'html',
    get: function get() {
      var attributeKeys = this.attributeKeys,
          attributeData = this.attributeData;

      var attributeHTML = attributeKeys.reduce(function (currentAttributeHTML, currentKey) {

        if (attributeData[currentKey]) {
          var attributeTagHTML = attributeData[currentKey] === 'tag-only' ? currentKey : currentKey + '="' + attributeData[currentKey] + '"';

          return currentAttributeHTML + ' ' + attributeTagHTML + ' ';
        }
        return currentAttributeHTML;
      }, '');
      return attributeHTML;
    }
  }]);

  return AttributeTags;
}();

;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(41);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(16);
var has = __webpack_require__(15);
var SRC = __webpack_require__(42)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(30).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(4);
var defined = __webpack_require__(32);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(60);
var defined = __webpack_require__(32);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(61);
var createDesc = __webpack_require__(41);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(31);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(120);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(15);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(87)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputControllerHelper = undefined;

var _typeParsers = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myTypeValidator = new _typeParsers.TypeValidator();

var InputControllerHelper = exports.InputControllerHelper = function InputControllerHelper($scope, iVXjs, iVXjsActions) {
    _classCallCheck(this, InputControllerHelper);

    var input = $scope.inputData;

    var currentExperienceValue = iVXjs.experience.data[input.name];

    if (input.type === 'checkbox') {
        $scope.inputValue = currentExperienceValue;
    }if (currentExperienceValue) {
        $scope.inputValue = currentExperienceValue;
    }

    $scope.$on('changed', function (input, value) {
        $scope.$apply();
    });

    this.onChange = function (value) {
        var $event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (input.type === 'checkbox') {
            value = value ? 'true' : 'false';
        }

        if (!myTypeValidator.isEmpty(value) || value instanceof Date) {

            if (value === 'true' || value === 'false') {
                value = value === 'true';
            }

            var element = $event.currentTarget;

            var source = {};

            var name = input.name,
                _input$onChange = input.onChange,
                onChange = _input$onChange === undefined ? [] : _input$onChange;


            onChange.unshift({
                eventName: 'setData',
                args: {
                    key: name,
                    value: value
                }
            });

            iVXjs.log.debug('Input ' + input.name + ' On Change Started', {}, { input: input, source: 'onChange', status: 'started', actions: onChange, timestamp: Date.now() });

            iVXjsActions.resolveActions(onChange, function () {
                iVXjs.log.debug('Input ' + input.name + ' On Change Ended', {}, { input: input, source: 'onChange', status: 'completed', actions: onChange, timestamp: Date.now() });
            }, iVXjsActions.createInputSource($event, value));
        }
    };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorMessages = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var thisObjectParser = new _typeParsers.ObjectParsers();

var ErrorMessages = exports.ErrorMessages = function () {
    function ErrorMessages(input, errors) {
        var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, ErrorMessages);

        var inputName = input.name,
            inputType = input.type;

        this.inputName = inputName;
        this.inputType = inputType;
        this.errors = errors;
        this.attributes = attributes;
    }

    _createClass(ErrorMessages, [{
        key: 'tags',
        get: function get() {
            var attributes = this.attributes;

            var angularErrorMap = this.angularErrorMap;
            var nonAngular = this.nonAngular;
            var nonValidate = this.nonValidate;

            return thisObjectParser.reduce(attributes, function (tags, attributeValue, attributeKey) {
                if (nonValidate.indexOf(attributeKey) >= 0) return tags;
                var tag = nonAngular.indexOf(attributeKey) >= 0 ? attributeKey + '="' + attributeValue + '"' : 'ng-' + angularErrorMap[attributeKey] + ' = "' + attributeValue + '" ';

                return tags + ' ' + tag;
            }, '');
        }
    }, {
        key: 'messages',
        get: function get() {
            var inputName = this.inputName,
                inputType = this.inputType,
                errors = this.errors,
                attributes = this.attributes;

            var angularErrorMap = this.angularErrorMap;
            var defaultMessages = this.defaultErrorMessages;
            var errorMessages = Object.keys(attributes).map(function (attributeKey, index) {
                var message = errors && errors[attributeKey] ? errors[attributeKey] : defaultMessages[attributeKey];
                var attrHTML = 'ng-show="($parent.formInput[\'' + inputName + '\'].$dirty || $parent.formInput.$submitted) && $parent.formInput[\'' + inputName + '\'].$error.' + angularErrorMap[attributeKey] + '"';

                if (inputType === 'radio') {
                    attrHTML = 'ng-show="($parent.formInput.$submitted) && !radioSelected"';
                }

                return {
                    message: message,
                    attrHTML: attrHTML
                };
            });

            if (inputType && inputType !== 'text' && inputType != "options") {
                errorMessages.push(this.inputTypeError);
            }

            return errorMessages;
        }
    }, {
        key: 'inputTypeError',
        get: function get() {
            var inputName = this.inputName,
                inputType = this.inputType,
                errors = this.errors;

            var errorMessage = errors[inputType];

            return {
                message: errorMessage ? errorMessage : "Invalid " + inputType,
                attrHTML: 'ng-show="($parent.formInput[\'' + inputName + '\'].$dirty || $parent.formInput.$submitted) && $parent.formInput[\'' + inputName + '\'].$error.' + inputType + '"'
            };
        }
    }, {
        key: 'nonAngular',
        get: function get() {
            return ['min', 'max', 'readonly', 'placeholder', 'step', 'readonly', 'style'];
        }
    }, {
        key: 'nonValidate',
        get: function get() {
            return ['step', 'placeholder', 'readonly'];
        }
    }, {
        key: 'angularErrorMap',
        get: function get() {
            return {
                minlength: 'minlength',
                min: "min",
                max: "max",
                required: 'required',
                maxlength: 'maxlength'
            };
        }
    }, {
        key: 'defaultErrorMessages',
        get: function get() {
            return {
                minlength: 'Too Short',
                min: "Too Low",
                max: "Too High",
                required: 'Required',
                maxlength: 'Too Long'
            };
        }
    }]);

    return ErrorMessages;
}();

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = exports.Style = function () {
    function Style() {
        _classCallCheck(this, Style);
    }

    _createClass(Style, [{
        key: 'getWidth',
        value: function getWidth(width) {
            if (width === '1') return 'ivx-grid-1-1 ivxjs-grid-1-1';

            var gridString = width.replace('/', '-');

            return 'ivx-grid-' + gridString + ' ivxjs-grid-' + gridString;
        }
    }, {
        key: 'addWidthClasses',
        value: function addWidthClasses(inputsHTML) {
            var self = this;
            var _containerClasses = this.containerClasses,
                containerClasses = _containerClasses === undefined ? '' : _containerClasses;

            var contents = inputsHTML.reduce(function (currentHTML, inputHTML) {
                var html = inputHTML.html,
                    _inputHTML$settings = inputHTML.settings,
                    settings = _inputHTML$settings === undefined ? {} : _inputHTML$settings,
                    _inputHTML$input = inputHTML.input,
                    input = _inputHTML$input === undefined ? {} : _inputHTML$input;
                var _input$type = input.type,
                    type = _input$type === undefined ? "" : _input$type;
                var _settings$width = settings.width,
                    width = _settings$width === undefined ? '1' : _settings$width,
                    _settings$container = settings.container,
                    container = _settings$container === undefined ? {} : _settings$container;
                var _container$classes = container.classes,
                    classes = _container$classes === undefined ? '' : _container$classes;


                classes = classes + ' ' + containerClasses + ' ivx-input-container-' + type;

                var thisWidth = self.getWidth(width);

                html = html.replace("ivxjs-grid-1-1", thisWidth + ' ' + classes);

                return currentHTML + ' ' + html;
            }, '');

            return contents;
        }
    }, {
        key: 'containerClasses',
        get: function get() {
            return 'input-container ivx-input-container';
        }
    }]);

    return Style;
}();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Indicates errors for each input based on the 
 * attributes created from the various rendering libraries
 * iVXjs uses. 
 */
var ErrorMessages = exports.ErrorMessages = function () {

    /**
     * Brings in all the possible error messages 
     * this input can produce.
     * 
     * @param {Array} errorMessages - list of all possible 
     * error messages with attributes indicating the message 
     * and the conditions in which to show them.
     */
    function ErrorMessages() {
        var errorMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ErrorMessages);

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


    _createClass(ErrorMessages, [{
        key: 'messageClasses',
        get: function get() {
            return 'error-message';
        }

        /**
         * Set the classes for the container of all error messages.
         * @type {String}
         */

    }, {
        key: 'containerClasses',
        get: function get() {
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

    }, {
        key: 'html',
        get: function get() {
            var errorMessages = this.errorMessages,
                messageClasses = this.messageClasses,
                containerClasses = this.containerClasses;

            var errorMessageHTML = errorMessages.reduce(function (errorMessageHTML, errorMessage, index) {
                return errorMessageHTML + '<span class="' + messageClasses + ' ivx-input-error-message" ' + errorMessage.attrHTML + '>\n                    ' + errorMessage.message + '\n                </span>';
            }, '');

            if (errorMessageHTML.length > 0) {
                return '<div class=\'' + containerClasses + ' ivx-input-error-container\'>\n                ' + errorMessageHTML + '\n            </div>';
            }

            return '';
        }
    }]);

    return ErrorMessages;
}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(4);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(30);
var fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(27);
var IObject = __webpack_require__(60);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var asc = __webpack_require__(104);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(8)) {
  var LIBRARY = __webpack_require__(43);
  var global = __webpack_require__(3);
  var fails = __webpack_require__(4);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(77);
  var $buffer = __webpack_require__(110);
  var ctx = __webpack_require__(27);
  var anInstance = __webpack_require__(49);
  var propertyDesc = __webpack_require__(41);
  var hide = __webpack_require__(16);
  var redefineAll = __webpack_require__(51);
  var toInteger = __webpack_require__(33);
  var toLength = __webpack_require__(10);
  var toIndex = __webpack_require__(146);
  var toAbsoluteIndex = __webpack_require__(45);
  var toPrimitive = __webpack_require__(31);
  var has = __webpack_require__(15);
  var classof = __webpack_require__(62);
  var isObject = __webpack_require__(5);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(101);
  var create = __webpack_require__(46);
  var getPrototypeOf = __webpack_require__(21);
  var gOPN = __webpack_require__(47).f;
  var getIterFn = __webpack_require__(103);
  var uid = __webpack_require__(42);
  var wks = __webpack_require__(6);
  var createArrayMethod = __webpack_require__(35);
  var createArrayIncludes = __webpack_require__(68);
  var speciesConstructor = __webpack_require__(75);
  var ArrayIterators = __webpack_require__(106);
  var Iterators = __webpack_require__(55);
  var $iterDetect = __webpack_require__(72);
  var setSpecies = __webpack_require__(48);
  var arrayFill = __webpack_require__(105);
  var arrayCopyWithin = __webpack_require__(136);
  var $DP = __webpack_require__(9);
  var $GOPD = __webpack_require__(20);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(141);
var $export = __webpack_require__(0);
var shared = __webpack_require__(67)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(144))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _audio = __webpack_require__(163);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(42)('meta');
var isObject = __webpack_require__(5);
var has = __webpack_require__(15);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(4)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(16)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(122);
var enumBugKeys = __webpack_require__(88);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(2);
var dPs = __webpack_require__(123);
var enumBugKeys = __webpack_require__(88);
var IE_PROTO = __webpack_require__(87)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(85)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(89).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(122);
var hiddenKeys = __webpack_require__(88).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(27);
var call = __webpack_require__(134);
var isArrayIter = __webpack_require__(101);
var anObject = __webpack_require__(2);
var toLength = __webpack_require__(10);
var getIterFn = __webpack_require__(103);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(17);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class() {
    _classCallCheck(this, _class);

    Object.assign(this, {
        PLAYING: "ivx-video-playing",
        MUTED: "ivx-video-muted",
        UNMUTED: "ivx-video-unmuted",
        PAUSED: "ivx-video-paused",
        SEEKING: "ivx-video-seeking"
    });
};

exports.default = _class;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(15);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(32);
var fails = __webpack_require__(4);
var spaces = __webpack_require__(91);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementService = function () {
    function ElementService(element) {
        _classCallCheck(this, ElementService);

        Object.assign(this, {
            element: element
        });
    }

    _createClass(ElementService, [{
        key: 'addClass',
        value: function addClass(cssClass) {
            this._runFunctionOnCssClass(cssClass, 'add');
        }
    }, {
        key: 'removeClass',
        value: function removeClass(cssClass) {
            this._runFunctionOnCssClass(cssClass, 'remove');
        }
    }, {
        key: 'html',
        value: function html(newHtml) {
            if (!newHtml) {
                return this.element.outerHTML;
            } else {
                this.element.innerHTML = newHtml;
            }
        }
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            return this.element.getElementsByTagName(tagName);
        }
    }, {
        key: '_runFunctionOnCssClass',
        value: function _runFunctionOnCssClass(cssClass, fn) {
            var element = this.element;

            var individualCssClasses = cssClass.split(" ");

            individualCssClasses.forEach(function (currentCssClass) {
                if (currentCssClass && currentCssClass.length && currentCssClass.length > 0) {
                    element.classList[fn](currentCssClass);
                }
            });
        }
    }]);

    return ElementService;
}();

exports.default = ElementService;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

var _index2 = _interopRequireDefault(_index);

var _video = __webpack_require__(113);

var _video2 = _interopRequireDefault(_video);

var _http = __webpack_require__(112);

var _http2 = _interopRequireDefault(_http);

var _iVXio = __webpack_require__(84);

var _iVXio2 = _interopRequireDefault(_iVXio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConstants) {
    _inherits(_class, _iVXjsConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.ERROR = "error";

        var eventNames = {
            VIDEO: new _video2.default().VIDEO,
            HTTP: new _http2.default().HTTP,
            VALIDATION: "validation",
            SET_UP: "set-up",
            IVX_IO: new _iVXio2.default().IVX_IO,
            ACTION_PROCESSOR: "actions-processor",
            DEFAULT: "default",
            ASSERT: "assert",
            EXPERIENCE: "experience"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var ERROR = this.ERROR,
                DELIMETER = this.DELIMETER;

            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + ERROR + DELIMETER + eventName;
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(28);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _state = __webpack_require__(161);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXjsConfig = __webpack_require__(164);

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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracks = __webpack_require__(114);

var _tracks2 = _interopRequireDefault(_tracks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_TrackConstants) {
    _inherits(_class, _TrackConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            ON_TRACK_CHANGE: "on-track-change",
            CHANGE_CURRENT_TRACK: "change-current-track"
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
}(_tracks2.default);

exports.default = _class;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracksCues = __webpack_require__(171);

var _tracksCues2 = _interopRequireDefault(_tracksCues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_TrackCuesConstants) {
    _inherits(_class, _TrackCuesConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            ON_ENTER: "on-enter",
            ON_EXIT: "on-exit",
            ON_CHAPTER_START: "on-chapter-start",
            ON_CHAPTER_END: "on-chpater-end",
            CHANGE_CHAPTER: "change-chapter"
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
}(_tracksCues2.default);

exports.default = _class;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(10);
var toAbsoluteIndex = __webpack_require__(45);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(5);
var cof = __webpack_require__(28);
var MATCH = __webpack_require__(6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(2);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(16);
var redefine = __webpack_require__(17);
var fails = __webpack_require__(4);
var defined = __webpack_require__(32);
var wks = __webpack_require__(6);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(2);
var aFunction = __webpack_require__(13);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(17);
var redefineAll = __webpack_require__(51);
var meta = __webpack_require__(39);
var forOf = __webpack_require__(50);
var anInstance = __webpack_require__(49);
var isObject = __webpack_require__(5);
var fails = __webpack_require__(4);
var $iterDetect = __webpack_require__(72);
var setToStringTag = __webpack_require__(53);
var inheritIfRequired = __webpack_require__(92);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(16);
var uid = __webpack_require__(42);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(43) || !__webpack_require__(4)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(3)[K];
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var ctx = __webpack_require__(27);
var forOf = __webpack_require__(50);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _angular = __webpack_require__(158);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_AngularConstants) {
    _inherits(_class, _AngularConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            TEMPLATE_NOT_FOUND: "template-not-found",
            BOOTSTRAPPED: "bootstrapped"
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
}(_angular2.default);

exports.default = _class;

/***/ }),
/* 82 */
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
    }

    _createClass(_class, [{
        key: "PlayerControlEvents",
        get: function get() {
            return {
                "play": 'iVX:video:play',
                "pause": 'iVX:video:pause',
                "seek": 'iVX:video:seeked',
                "playing": "iVX:video:playing",
                "ended": "iVX:video:ended",
                "paused": "iVX:video:paused",
                "setVolume": 'iVX:video:setVolume',
                "duration": "iVX:video:requestDuration",
                "getDuration": "iVX:video:getDuration",
                "canPlay": "iVX:video:canplay",
                "timeUpdate": "iVX:video:timeupdate",
                "dispose": "iVX:video:dispose",
                "volume": 'iVX:video:setVolume'
            };
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class(log) {
		_classCallCheck(this, _class);

		this.log = log;
	}

	_createClass(_class, [{
		key: "assert",
		value: function assert(test, name, message) {
			var log = this.log;
			var debug = log.show;


			if (!test) {
				var errorObj = {
					message: name + " is invalid: " + message + "."
				};

				if (debug) {
					this.log.error(errorObj, "ASSERT");
					throw new Error(errorObj.message);
				}
			}

			return test;
		}
	}]);

	return _class;
}();

exports.default = _class;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.IVX_IO = "iVXio";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                IVX_IO = this.IVX_IO;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + IVX_IO;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(30);
var LIBRARY = __webpack_require__(43);
var wksExt = __webpack_require__(121);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(67)('keys');
var uid = __webpack_require__(42);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(2);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(27)(Function.call, __webpack_require__(20).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var setPrototypeOf = __webpack_require__(90).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(33);
var defined = __webpack_require__(32);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var defined = __webpack_require__(32);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(43);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(17);
var hide = __webpack_require__(16);
var has = __webpack_require__(15);
var Iterators = __webpack_require__(55);
var $iterCreate = __webpack_require__(98);
var setToStringTag = __webpack_require__(53);
var getPrototypeOf = __webpack_require__(21);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(46);
var descriptor = __webpack_require__(41);
var setToStringTag = __webpack_require__(53);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(71);
var defined = __webpack_require__(32);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(55);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9);
var createDesc = __webpack_require__(41);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(62);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(55);
module.exports = __webpack_require__(30).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(304);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(10);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(40);
var step = __webpack_require__(137);
var Iterators = __webpack_require__(55);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(97)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(27);
var invoke = __webpack_require__(127);
var html = __webpack_require__(89);
var cel = __webpack_require__(85);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(28)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(107).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(28)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(13);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(8);
var LIBRARY = __webpack_require__(43);
var $typed = __webpack_require__(77);
var hide = __webpack_require__(16);
var redefineAll = __webpack_require__(51);
var fails = __webpack_require__(4);
var anInstance = __webpack_require__(49);
var toInteger = __webpack_require__(33);
var toLength = __webpack_require__(10);
var toIndex = __webpack_require__(146);
var gOPN = __webpack_require__(47).f;
var dP = __webpack_require__(9).f;
var arrayFill = __webpack_require__(105);
var setToStringTag = __webpack_require__(53);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _http = __webpack_require__(112);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_HTTPConstants) {
    _inherits(_class, _HTTPConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var errorTypes = {
            REQUEST_ERROR: "request" + _this.DELIMETER + "error",
            REQUEST_SUCCESS: "request" + _this.DELIMETER + "success",
            RESPONSE_ERROR: "response" + _this.DELIMETER + "error",
            RESPONSE_SUCCESS: "response" + _this.DELIMETER + "success"
        };

        _this.addNames(errorTypes);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(errorName) {
            var DELIMETER = this.DELIMETER;

            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + errorName;
        }
    }]);

    return _class;
}(_http2.default);

exports.default = _class;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.HTTP = "http";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                HTTP = this.HTTP;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + HTTP;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.VIDEO = "video";

        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                VIDEO = this.VIDEO;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + VIDEO;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.TRACKS = "tracks";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                TRACKS = this.TRACKS;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + TRACKS;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "showControls",
        value: function showControls(controls) {
            var isControlObject = typeValidator.isObject(controls);

            var showControls = !typeValidator.isString(controls) && controls;

            if (isControlObject) {
                var type = controls.type;


                showControls = !typeValidator.isString(type) && type;
            }

            return showControls;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.LOGGING = "log";

        var logTypes = {
            ERROR: "error",
            WARN: "warn",
            TRACE: "trace",
            LOG: "",
            DEBUG: "debug"
        };

        _this.addNames(logTypes);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(level) {
            var DELIMETER = this.DELIMETER,
                LOGGING = this.LOGGING;

            if (level.length <= 0) {
                return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + LOGGING;
            }

            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + LOGGING + DELIMETER + level;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _globalEvents = __webpack_require__(207);

var _globalEvents2 = _interopRequireDefault(_globalEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

var ActionProcessor = exports.ActionProcessor = function () {
    function ActionProcessor(iVXjs) {
        _classCallCheck(this, ActionProcessor);

        this.iVXjs = iVXjs;

        Object.assign(this, {
            globalEvents: new _globalEvents2.default(iVXjs)
        });
    }

    /**
     * Using the iVXjs.rules function, this will return an object of data if the 
     * property of rule is evaluated to true or is missing.
     * 
     * @param {Array} rules - collection of rule objects. A rule object is an object
     * with a collection of conditions and a condition operator that if missing or evaluated to true,
     * will return the state Id property 
     */


    _createClass(ActionProcessor, [{
        key: "processRules",
        value: function processRules(rules) {
            var iVXjs = this.iVXjs;

            var self = this;
            var mappedRules = rules.map(function (ruleObj) {

                // Rules require a unique identifier to evaluate 
                // which rule should be returned. Currently, the 
                // property that is used is the stateId. If one doesn't
                // exist in the arguments, an autogenerated guid is used
                // instead.
                var _ruleObj$stateId = ruleObj.stateId,
                    stateId = _ruleObj$stateId === undefined ? self._getRandomStateId() : _ruleObj$stateId;


                return Object.assign({}, ruleObj, {
                    stateId: stateId
                });
            });
            var stateId = iVXjs.rules(mappedRules);

            // Finds the arguments that match the stateId
            var currentArgs = mappedRules.find(function (mappedRule) {
                return stateId === mappedRule.stateId;
            });

            // Makes a cleaned copy of the arguments
            var argsToProcess = this._getArgsToProcess(currentArgs);

            return argsToProcess;
        }
    }, {
        key: "_getRandomStateId",
        value: function _getRandomStateId() {
            return Math.random().toString(36).substr(2, 10);
        }
    }, {
        key: "_getArgsToProcess",
        value: function _getArgsToProcess(args) {
            var argsToProcess = void 0;

            if (args) {
                argsToProcess = Object.assign({}, args);
            }

            return argsToProcess;
        }

        /**
         * Using the event and a value if available, it will automatically 
         * create the source info for the event which includes the element,
         * type, event and value if it exists.
         * @param {EventObject} event 
         * @param {*} value 
         */

    }, {
        key: "createSourceFromEvent",
        value: function createSourceFromEvent() {
            var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var value = arguments[1];
            var actions = arguments[2];

            if (this.isButtonClickSource(event, value)) {
                return this.createButtonClickSource(event, value);
            }

            if (this.isSubmitSource(event, value)) {
                return this.createFormSubmitSource(event);
            }

            if (this.isInputSource(event, value)) {
                return this.createInputSource(event, value);
            }

            if (this.isElementClickSource(event, value)) {
                return this.createElementClickSource(event, value, actions);
            }
        }
    }, {
        key: "isInputSource",
        value: function isInputSource(event, value) {
            var _event$target = event.target,
                target = _event$target === undefined ? {} : _event$target,
                type = event.type;
            var _target$tagName = target.tagName,
                tag = _target$tagName === undefined ? "" : _target$tagName;

            var isInputType = (tag.toLowerCase() === 'input' || tag.toLowerCase() === 'textarea') && (type === 'blur' || type === 'click');
            var isOptionsType = tag.toLowerCase() === 'select' && type === 'click';

            return isInputType || isOptionsType;;
        }
    }, {
        key: "isSubmitSource",
        value: function isSubmitSource(event, value) {
            var _event$target2 = event.target,
                target = _event$target2 === undefined ? {} : _event$target2,
                type = event.type;
            var _target$tagName2 = target.tagName,
                tag = _target$tagName2 === undefined ? "" : _target$tagName2;


            return type === "submit";
        }
    }, {
        key: "isButtonClickSource",
        value: function isButtonClickSource(event, value) {
            var _event$target3 = event.target,
                target = _event$target3 === undefined ? {} : _event$target3,
                type = event.type;
            var _target$tagName3 = target.tagName,
                tag = _target$tagName3 === undefined ? "" : _target$tagName3;


            return tag.toLowerCase() === 'button' && type === 'click' && !typeValidator.isUndefined(value);
        }
    }, {
        key: "isElementClickSource",
        value: function isElementClickSource(event, value) {
            var _event$target4 = event.target,
                target = _event$target4 === undefined ? {} : _event$target4,
                type = event.type;
            var _target$tagName4 = target.tagName,
                tag = _target$tagName4 === undefined ? "" : _target$tagName4;


            return type === "click";
        }
    }, {
        key: "createButtonClickSource",
        value: function createButtonClickSource(event, value) {
            var _event$target5 = event.target,
                element = _event$target5 === undefined ? {} : _event$target5;


            return {
                type: "onclick",
                element: element,
                event: event,
                origin: "onClick",
                value: value
            };
        }
    }, {
        key: "createFormSubmitSource",
        value: function createFormSubmitSource(event) {
            var _event$target6 = event.target,
                element = _event$target6 === undefined ? {} : _event$target6;


            return {
                type: "onsubmit",
                element: element,
                event: event,
                origin: "onSubmit"
            };
        }
    }, {
        key: "createInputSource",
        value: function createInputSource(event, value) {
            var _event$target7 = event.target,
                element = _event$target7 === undefined ? {} : _event$target7;


            return {
                type: "onchange",
                event: event,
                element: element,
                origin: "onChange",
                value: value
            };
        }
    }, {
        key: "createElementClickSource",
        value: function createElementClickSource(event, value, actions) {
            var _event$target8 = event.target,
                element = _event$target8 === undefined ? {} : _event$target8;


            return {
                type: "onclick",
                event: event,
                element: element,
                actions: actions,
                origin: "element"
            };
        }
    }, {
        key: "createAnchorClickSource",
        value: function createAnchorClickSource(event) {
            var _event$target9 = event.target,
                element = _event$target9 === undefined ? {} : _event$target9;


            return {
                type: "onclick",
                event: event,
                element: element,
                origin: "link"
            };
        }
    }, {
        key: "resolveActions",
        value: function resolveActions(actionArray, callback) {
            var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var self = this;
            var globalEvents = this.globalEvents,
                iVXjs = this.iVXjs;
            var log = iVXjs.log,
                _iVXjs$constants = iVXjs.constants,
                constants = _iVXjs$constants === undefined ? {} : _iVXjs$constants;


            globalEvents.runGlobalEvents(actionArray, callback, source);

            if (typeValidator.isEmpty(actionArray)) {
                callback();
                return;
            }

            var promises = actionArray.map(function (actionObj) {
                self.iVXjs.Bus.emit(actionObj.eventName, actionObj.args, source);

                if (!typeValidator.isEmpty(actionObj.args)) {
                    log.debug("Event " + actionObj.eventName + " was fired.", {
                        group: true,
                        messages: Object.keys(actionObj.args).map(function (key, index) {
                            return {
                                title: key + ":" + actionObj.args[key],
                                message: actionObj.args[key]
                            };
                        })
                    }, actionObj);
                } else {
                    log.debug("Event " + actionObj.eventName, {}, actionObj);
                }

                if (self.iVXjs.actions && self.iVXjs.actions[actionObj.eventName]) {

                    return self.iVXjs.actions[actionObj.eventName](actionObj.args, source);
                }

                if (self.iVXjs.experience[actionObj.eventName]) {

                    return self.iVXjs.experience[actionObj.eventName](actionObj.args, source);
                }
            });

            Promise.all(promises).then(function (experience) {
                callback();
            }).catch(function (err) {

                actionArray.forEach(function (action) {
                    log.debug("The Event Could " + action.eventName + " Wasn't Fired:", {
                        group: true,
                        messages: Object.keys(action.args).map(function (key, index) {
                            return {
                                message: key + ":" + action.args[key],
                                data: action.args[key]
                            };
                        })
                    }, action);
                });

                log.error(err, "ACTION_PROCESSOR");

                self.iVXjs.Bus.emit('iVXjs:iVXio:error:event-not-fired', { message: err });
            });
        }
    }]);

    return ActionProcessor;
}();

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angularEvents = __webpack_require__(81);

var _angularEvents2 = _interopRequireDefault(_angularEvents);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

var _errors = __webpack_require__(58);

var _errors2 = _interopRequireDefault(_errors);

var _httpEvents = __webpack_require__(111);

var _httpEvents2 = _interopRequireDefault(_httpEvents);

var _iVXioErrors = __webpack_require__(208);

var _iVXioErrors2 = _interopRequireDefault(_iVXioErrors);

var _iVXjsConfigEvents = __webpack_require__(64);

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _iVXio = __webpack_require__(209);

var _iVXio2 = _interopRequireDefault(_iVXio);

var _logging = __webpack_require__(116);

var _logging2 = _interopRequireDefault(_logging);

var _stateEvents = __webpack_require__(63);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _tracksEvents = __webpack_require__(65);

var _tracksEvents2 = _interopRequireDefault(_tracksEvents);

var _tracksCuesEvents = __webpack_require__(66);

var _tracksCuesEvents2 = _interopRequireDefault(_tracksCuesEvents);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _videoClasses = __webpack_require__(52);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

var _global = __webpack_require__(210);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class() {
    _classCallCheck(this, _class);

    // Angular
    this.ANGULAR = {
        EVENTS: new _angularEvents2.default()

        //Global
    };this.GLOBAL = {
        EVENTS: new _global2.default()

        // Audio
    };this.AUDIO = {
        EVENTS: new _audioEvents2.default()

        // Errors 
    };this.ERRORS = {
        EVENTS: new _errors2.default()
    };

    // Http
    this.HTTP = {
        EVENTS: new _httpEvents2.default()

        // iVXjs
    };this.CONFIG = {
        EVENTS: new _iVXjsConfigEvents2.default()
    };

    // iVXio
    this.iVXio = {
        ERRORS: new _iVXioErrors2.default(),
        EVENTS: new _iVXio2.default()
    };

    // Logging
    this.LOGGING = {
        EVENTS: new _logging2.default()
    };

    this.TRACKS = {
        EVENTS: new _tracksEvents2.default(),
        CUES: new _tracksCuesEvents2.default()

        // State
    };this.STATE = {
        EVENTS: new _stateEvents2.default()
    };

    // Video 
    this.VIDEO = {
        EVENTS: new _videoEvents2.default(),
        CLASSES: new _videoClasses2.default()
    };
};

exports.default = _class;

/***/ }),
/* 119 */
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
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(85)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(15);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(68)(false);
var IE_PROTO = __webpack_require__(87)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(2);
var getKeys = __webpack_require__(44);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(47).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(44);
var gOPS = __webpack_require__(69);
var pIE = __webpack_require__(61);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(60);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(13);
var isObject = __webpack_require__(5);
var invoke = __webpack_require__(127);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 127 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(3).parseInt;
var $trim = __webpack_require__(54).trim;
var ws = __webpack_require__(91);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(3).parseFloat;
var $trim = __webpack_require__(54).trim;

module.exports = 1 / $parseFloat(__webpack_require__(91) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(28);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(5);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(94);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(2);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(60);
var toLength = __webpack_require__(10);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(10);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(8) && /./g.flags != 'g') __webpack_require__(9).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(73)
});


/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(109);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(142);
var validate = __webpack_require__(56);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(76)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(9).f;
var create = __webpack_require__(46);
var redefineAll = __webpack_require__(51);
var ctx = __webpack_require__(27);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(50);
var $iterDefine = __webpack_require__(97);
var step = __webpack_require__(137);
var setSpecies = __webpack_require__(48);
var DESCRIPTORS = __webpack_require__(8);
var fastKey = __webpack_require__(39).fastKey;
var validate = __webpack_require__(56);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(142);
var validate = __webpack_require__(56);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(76)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(35)(0);
var redefine = __webpack_require__(17);
var meta = __webpack_require__(39);
var assign = __webpack_require__(125);
var weak = __webpack_require__(145);
var isObject = __webpack_require__(5);
var fails = __webpack_require__(4);
var validate = __webpack_require__(56);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(76)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(51);
var getWeak = __webpack_require__(39).getWeak;
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(50);
var createArrayMethod = __webpack_require__(35);
var $has = __webpack_require__(15);
var validate = __webpack_require__(56);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(33);
var toLength = __webpack_require__(10);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(47);
var gOPS = __webpack_require__(69);
var anObject = __webpack_require__(2);
var Reflect = __webpack_require__(3).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(70);
var isObject = __webpack_require__(5);
var toLength = __webpack_require__(10);
var ctx = __webpack_require__(27);
var IS_CONCAT_SPREADABLE = __webpack_require__(6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(10);
var repeat = __webpack_require__(93);
var defined = __webpack_require__(32);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(44);
var toIObject = __webpack_require__(19);
var isEnum = __webpack_require__(61).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(62);
var from = __webpack_require__(152);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(50);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 153 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateParser = exports.DateParser = function () {
    function DateParser(date) {
        _classCallCheck(this, DateParser);

        if (!(date instanceof Date)) {
            this.rawDate = new Date(date);
        } else {
            this.rawDate = date;
        }
    }

    _createClass(DateParser, [{
        key: "formatForDateTimeLocalInput",
        value: function formatForDateTimeLocalInput() {
            var date = this.formatForDateInput();
            var time = this.getTime();

            return date + "T" + time;
        }
    }, {
        key: "getTime",
        value: function getTime() {
            return this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
        }
    }, {
        key: "getHours",
        value: function getHours() {
            var rawHours = this.rawDate.getHours();

            return "" + (rawHours < 10 ? "0" + rawHours : rawHours);
        }
    }, {
        key: "getMinutes",
        value: function getMinutes() {
            var rawMinutes = this.rawDate.getMinutes();

            return "" + (rawMinutes < 10 ? "0" + rawMinutes : rawMinutes);
        }
    }, {
        key: "getSeconds",
        value: function getSeconds() {
            var rawSeconds = this.rawDate.getSeconds();

            return "" + (rawSeconds < 10 ? "0" + rawSeconds : rawSeconds);
        }
    }, {
        key: "formatForDateInput",
        value: function formatForDateInput() {
            var month = this.formatMonth();
            var year = this.rawDate.getFullYear();
            var day = this.formatDay();

            return year + "-" + month + "-" + day;
        }
    }, {
        key: "formatDay",
        value: function formatDay() {
            var dayNum = this.rawDate.getDate();

            return "" + (dayNum < 10 ? '0' + dayNum : dayNum);
        }
    }, {
        key: "formatMonth",
        value: function formatMonth() {
            var monthNum = this.rawDate.getMonth() + 1;

            return "" + (monthNum < 10 ? '0' + monthNum : monthNum);
        }
    }]);

    return DateParser;
}();

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = __webpack_require__(156);

var _app2 = _interopRequireDefault(_app);

var _appConfig = __webpack_require__(159);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _appRun = __webpack_require__(162);

var _appRun2 = _interopRequireDefault(_appRun);

var _iVXjsConfigEvents = __webpack_require__(64);

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _app3 = __webpack_require__(165);

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _constants = __webpack_require__(415);

var _constants2 = _interopRequireDefault(_constants);

var _directives = __webpack_require__(416);

var _directives2 = _interopRequireDefault(_directives);

var _providers = __webpack_require__(469);

var _providers2 = _interopRequireDefault(_providers);

var _services = __webpack_require__(471);

var _services2 = _interopRequireDefault(_services);

var _filters = __webpack_require__(479);

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iVXjsConfigEvents = new _iVXjsConfigEvents2.default();
var myIVXjs = new _app3.iVXjs();
var _window = window,
    _window$iVXjsGlobalCo = _window.iVXjsGlobalConfigs,
    iVXjsGlobalConfigs = _window$iVXjsGlobalCo === undefined ? {} : _window$iVXjsGlobalCo;
var _iVXjsGlobalConfigs$m = iVXjsGlobalConfigs.modules,
    modules = _iVXjsGlobalConfigs$m === undefined ? [] : _iVXjsGlobalConfigs$m;

var deps = [].concat(['ui.router', 'ngSanitize', _providers2.default, _directives2.default, _constants2.default, _services2.default, _filters2.default], modules);

// Bootstrap App
myIVXjs.Bus.on(iVXjsConfigEvents.VALIDATED, function (iVXjs) {
    (0, _app2.default)(iVXjs);
});

exports.default = angular.module('ivx-js', deps).constant('iVXjs', myIVXjs).config(_appConfig2.default).run(_appRun2.default).name;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (iVXjs) {
    var stateAudio = new iVXjs.audio('body', 'state-audio');
    var experienceAudio = new iVXjs.audio('body', 'experience-audio');

    angular.module('ivx-js').constant('ivxjs.modules.ui', iVXjs.ui).constant('ivxjs.log', iVXjs.log).constant('iVXjsLog', iVXjs.log).constant('ivxjs.modules.video', iVXjs.video).constant('iVXjsModulesVideo', iVXjs.video).constant('ivxjs.modules.audio', stateAudio).constant('ivxjs.modules.audio.experience', experienceAudio);

    objectParsers.mapKeys(iVXjs.ui.angular, function (value, key) {
        angular.module('ivx-js').directive(key, value);
    });

    if (iVXjs.experience.addEventListeners) {
        iVXjs.experience.addEventListeners(iVXjs.Bus, iVXjs.experience);
    }

    var pageSetup = new _containerSetup2.default(iVXjs.config.selector, iVXjs.config.template);

    angular.bootstrap(iVXjs.config.bootstrapSelector ? document.querySelector(iVXjs.config.bootstrapSelector) : document, ['ivx-js']);
    iVXjs.Bus.emit(angularEventNames.BOOTSTRAPPED);
};

var _typeParsers = __webpack_require__(7);

var _containerSetup = __webpack_require__(157);

var _containerSetup2 = _interopRequireDefault(_containerSetup);

var _angularEvents = __webpack_require__(81);

var _angularEvents2 = _interopRequireDefault(_angularEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectParsers = new _typeParsers.ObjectParsers();
var angularEventNames = new _angularEvents2.default();

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeParsers = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var thisTypeValidator = new _typeParsers.TypeValidator();

var _class = function _class(selector, template, audioClass) {
    _classCallCheck(this, _class);

    var thisSelector = !thisTypeValidator.isEmpty(selector) ? selector : '#ivx';
    var element = document.querySelector(thisSelector);

    if (element) {
        element.setAttribute('ui-view', '');
        element.classList.add('ivx-experience-container');
        return;
    }

    throw new Error('iVX.js requires an element to add to. Please add a selector to the init funtion or "<div id=\"ivx\"></div>" to your body');
};

exports.default = _class;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.ANGULAR = "angular";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                ANGULAR = this.ANGULAR;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + ANGULAR;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _httpInterceptors = __webpack_require__(160);

var _httpInterceptors2 = _interopRequireDefault(_httpInterceptors);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _stateEvents = __webpack_require__(63);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stateEvents = new _stateEvents2.default();

var AppConfig = function () {
    function AppConfig($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider, $sceDelegateProvider, $provide, iVXjs, iVXjsStateCreatorProvider) {
        _classCallCheck(this, AppConfig);

        if (!iVXjs.config) return;

        iVXjsStateCreatorProvider.create($stateProvider, iVXjs);

        var experience = iVXjs.experience;

        var defaultStateID = iVXjs.rules(iVXjs.config.defaultState);
        var url = iVXjsStateCreatorProvider.buildDefaultUrl(iVXjs, defaultStateID);

        if (experience.whiteList) {
            $sceDelegateProvider.resourceUrlWhitelist(experience.whiteList);
        }

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var currentUrl = $location.url();

            if (!currentUrl || currentUrl.length <= 0) {
                return url;
            }

            iVXjs.Bus.emit(stateEvents.NOT_FOUND, currentUrl);

            var pageNotFoundStateId = iVXjs.rules(iVXjs.config.pageNotFoundState);
            var pageNotFoundUrl = void 0;

            var pageNotFoundState = iVXjs.config.states.find(function (state) {
                return state.id === pageNotFoundStateId;
            });

            if (pageNotFoundState) {
                pageNotFoundUrl = pageNotFoundState.url;
            }

            return pageNotFoundUrl ? pageNotFoundUrl : url;
        });
        this.create$httpInjectors($httpProvider, $provide);
    }

    _createClass(AppConfig, [{
        key: 'create$httpInjectors',
        value: function create$httpInjectors($httpProvider, $provide) {
            $provide.factory("iVXjsHttpInterceptors", _httpInterceptors2.default);

            $httpProvider.interceptors.push("iVXjsHttpInterceptors");
        }
    }]);

    return AppConfig;
}();

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$httpProvider', '$sceDelegateProvider', '$provide', 'iVXjs', 'iVXjsStateCreatorProvider'];

exports.default = (0, _createFactoryFunction2.default)(AppConfig);

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpInterceptors = undefined;

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _httpEvents = __webpack_require__(111);

var _httpEvents2 = _interopRequireDefault(_httpEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var httpEventNames = new _httpEvents2.default();

var HttpInterceptors = exports.HttpInterceptors = function HttpInterceptors($q, iVXjs, iVXjsLog) {
    _classCallCheck(this, HttpInterceptors);

    this.request = function (config) {
        iVXjsLog.log('Requested Template: ' + config.url);
        iVXjs.Bus.emit(httpEventNames.REQUEST_SUCCESS, config);
        return config;
    };
    this.requestError = function (rejection) {
        iVXjs.Bus.emit(httpEventNames.REQUEST_ERROR, rejection);
        iVXjsLog.error({ message: rejection.data }, "HTTP");

        return $q.reject(rejection);
    };
    this.response = function (response) {
        iVXjsLog.log('Loaded Template: ' + response.config.url);
        iVXjs.Bus.emit(httpEventNames.RESPONSE_SUCCESS, response);
        return response;
    };
    this.responseError = function (rejection) {
        iVXjsLog.error({ message: rejection.data, info: rejection }, "HTTP");
        iVXjs.Bus.emit(httpEventNames.RESPONSE_ERROR, rejection);

        return $q.reject(rejection);
    };
};

HttpInterceptors.$inject = ["$q", "iVXjs", "ivxjs.log"];

exports.default = (0, _createFactoryFunction2.default)(HttpInterceptors);

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

var _stateEvents = __webpack_require__(63);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _angularEvents = __webpack_require__(81);

var _angularEvents2 = _interopRequireDefault(_angularEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppRun = function AppRun($rootScope, $state, $window, $transitions, $http, iVXjs, iVXjsBus, iVXjsActions, iVXjsConstants) {
    _classCallCheck(this, AppRun);

    if (!iVXjs || !iVXjs.config) return;

    var _iVXjs$config = iVXjs.config,
        _iVXjs$config$metadat = _iVXjs$config.metadata,
        metadata = _iVXjs$config$metadat === undefined ? {} : _iVXjs$config$metadat,
        templates = _iVXjs$config.templates;
    var _metadata$title = metadata.title,
        title = _metadata$title === undefined ? 'iVX Story Player' : _metadata$title,
        description = metadata.description,
        image = metadata.image;

    var audioEventNames = new _audioEvents2.default();
    var stateEventNames = new _stateEvents2.default();
    var angularEventNames = new _angularEvents2.default();

    $rootScope.pageTitle = title;
    $rootScope.ogImage = image;
    $rootScope.ogDescription = description;

    iVXjs.Bus.on(stateEventNames.GO, function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var evalState = state || {};

        if (Array.isArray(state)) {
            evalState = state[0];
        }

        var _evalState = evalState,
            route = _evalState.route,
            _evalState$stateId = _evalState.stateId,
            stateId = _evalState$stateId === undefined ? "" : _evalState$stateId;

        var goToStateId = route ? route : stateId;

        if (goToStateId.length > 0) {
            $state.go(goToStateId);
        }
    });

    $rootScope.$on("$includeContentError", function (event, args) {
        iVXjs.Bus.emit(angularEventNames.TEMPLATE_NOT_FOUND, event);
    });

    $transitions.onSuccess({ to: '*.*' }, ['$state', 'ivxjs.modules.audio', function ($state, iVXjsAudio) {
        var data = $state.current.data;


        iVXjs.Bus.emit(stateEventNames.CHANGE, $state.current);

        if (data.audio) {
            data.audio.id = 'state-audio';

            iVXjsBus.emit(audioEventNames.SET_UP, data.audio);
        } else {
            iVXjsAudio.pause();
        }

        if ($state.current.data.restricted) {

            var navigateBackState = iVXjs.experience.config.pageNotFoundState ? iVXjs.experience.config.pageNotFoundState : iVXjs.experience.config.defaultState;
            var restrictRedirect = iVXjs.experience.rules(navigateBackState);

            if (iVXjs.experience.isRestricted) {
                iVXjs.experience.isRestricted().then(function (restricted) {
                    if (restricted) {
                        $state.go(restrictRedirect);
                    }
                });
            }
        }
    }]);

    iVXjsBus.on(audioEventNames.ENDED, function (currentAudio) {
        if (currentAudio.id === 'state-audio') {
            iVXjsActions.resolveActions(currentAudio.onEnd, function () {});
        }
    });

    iVXjsBus.on(stateEventNames.REQUEST_STATE, function () {
        var currentState = $state.current;

        if (!currentState.data) {
            var defaultStateRules = iVXjs.experience.config.defaultState;
            var defaultStateId = iVXjs.experience.rules(defaultStateRules);

            currentState.data = iVXjs.config.states.find(function (state) {
                return state.id === defaultStateId;
            });
        }

        iVXjsBus.emit(stateEventNames.GET_STATE, currentState);
    });

    iVXjsBus.on(audioEventNames.TIME_UPDATE, function (currentAudio) {
        if (currentAudio.id === 'state-audio') {
            currentAudio.runCuePoints(iVXjs.experience.processor);
        }
    });
};

AppRun.$inject = ['$rootScope', '$state', '$window', '$transitions', '$http', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions', 'ivxjs.constants'];

exports.default = (0, _createFactoryFunction2.default)(AppRun);

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.iVXjs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _setup = __webpack_require__(166);

var _logging = __webpack_require__(206);

var _logging2 = _interopRequireDefault(_logging);

var _iVXjsConfigEvents = __webpack_require__(64);

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _processor = __webpack_require__(117);

var _registeredConstants = __webpack_require__(118);

var _registeredConstants2 = _interopRequireDefault(_registeredConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(212);
var EventEmitter = __webpack_require__(414);

var iVXjsConfigEvents = new _iVXjsConfigEvents2.default();

/**
 * Allows various data and functions for libraries to create
 * and build stateful interactive experiences.
 */

var iVXjs = exports.iVXjs = function () {

        /**
         * Sets Up iVXjs and adds a Bus since it will be used
         * for setting up this class asyncronously
         */
        function iVXjs() {
                _classCallCheck(this, iVXjs);

                /**
                 * An instance of nodejs's EventEmitter class that 
                 * allows iVXjs to emit and listen to various events.
                 * @type {EventEmitter}
                 */
                this.Bus = new EventEmitter();
                this.constants = new _registeredConstants2.default();
                this.settings = {};
        }

        /**
         * Sets up and attaches components to this iVXjs object after the 
         * set up is ran and all module dependencies have been loaded. This
         * needs to run with a validated experience and after all dependencies
         * are loaded, otherwise it will break an experience.
         * 
         * @param {object} processedData - a data object with references
         * to modules and functions 
         * @emits {validated} emits a verified instance of iVXjs for other components
         * to use.
         */


        _createClass(iVXjs, [{
                key: 'setUpiVXjs',
                value: function setUpiVXjs(processedData) {

                        /*
                         * Depending on the iVXjs experience, some native functions
                         * may need to be updated to work with the Action/Bus system.
                         */
                        if (processedData.actions) {

                                /**
                                 * An object of functions that are modified to work with the
                                 * iVXjs Action system.
                                 * @type {object}
                                 */
                                this.actions = processedData.actions;
                        }

                        /** 
                         * Holds all state configurations to set up this 
                         * iVXjs experience
                         * @type {object} 
                         */
                        this.config = processedData.config;

                        if (this.selector) {
                                this.config.selector = this.selector;
                        }

                        /**
                         * Contains all data and functions for an experience to run
                         * @type {object} 
                         */

                        this.experience = processedData.experience;
                        this.experience.rules = processedData.rules;
                        this.experience.Bus = this.Bus;
                        this.experience.Log = this.log;
                        this.experience.processor = new _processor.ActionProcessor(this);
                        this.experience.config = this.config;
                        this.experience.data = Object.assign(this.experience.data || {}, this._createExperienceDataObject());

                        /**
                         * Evaluates an array of expressions to allow stat navigation branching
                         * 
                         * @type {function}
                         * @param {array} navArray - an array of expressions and stateIds that navigate
                         * the states
                         */
                        this.rules = processedData.rules;

                        /**
                         * Holds instances of classes for modules that will be used by renderers
                         * to make various data objects.
                         * 
                         * @type {object}
                         */
                        this.ui = processedData.ui;
                        this.video = processedData.video;
                        this.audio = processedData.audio;

                        /** 
                         * Once all various components are added, emits on the
                         * bus that it is validated and sends an instance of this class
                         * to set up.
                         */
                        this.Bus.emit(iVXjsConfigEvents.VALIDATED, this);
                }
        }, {
                key: '_createExperienceDataObject',
                value: function _createExperienceDataObject() {
                        var _experience = this.experience,
                            experience = _experience === undefined ? {} : _experience,
                            _config = this.config,
                            config = _config === undefined ? {} : _config,
                            _settings = this.settings,
                            settings = _settings === undefined ? {} : _settings;
                        var _settings$experience = settings.experience,
                            customExperience = _settings$experience === undefined ? {} : _settings$experience;
                        var _config$metadata = config.metadata,
                            metadata = _config$metadata === undefined ? {} : _config$metadata;
                        var _metadata$data = metadata.data,
                            staticData = _metadata$data === undefined ? {} : _metadata$data;
                        var _customExperience$dat = customExperience.data,
                            settingsData = _customExperience$dat === undefined ? {} : _customExperience$dat;
                        var _experience$data = experience.data,
                            experienceData = _experience$data === undefined ? {} : _experience$data;


                        return Object.assign(staticData, settingsData, experienceData);
                }

                /**
                 * Initializes iVXjs by taking in an object of settings so
                 * it can run the various enhancement, validation and module
                 * loading.
                 * 
                 * @param {object} settings - all user settings that will create
                 * this iVXjs experience.
                 * @return {Promise} - Promise that will resovle when set up succeeds/fails
                 */

        }, {
                key: 'init',
                value: function init() {
                        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        var self = this;
                        var _settings$debug = settings.debug,
                            debug = _settings$debug === undefined ? true : _settings$debug;


                        if (settings.selector) {
                                this.selector = settings.selector;
                        }

                        if (settings.routeFunction) {
                                this.routeFunction = settings.routeFunction;
                        }

                        this.log = new _logging2.default(debug, this.Bus);

                        var thisSetup = new _setup.Setup(settings, this.Bus, this.log);
                        var initPromise = new Promise(function (resolve, reject) {
                                thisSetup.runSetup().then(function (experience) {
                                        self.setUpiVXjs(experience);
                                        resolve(self);
                                });
                        });

                        Object.assign(this, { settings: settings });

                        return initPromise;
                }
        }]);

        return iVXjs;
}();

;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Setup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _processor = __webpack_require__(167);

var _registeredModules = __webpack_require__(168);

var _registeredModules2 = __webpack_require__(174);

var _asserts = __webpack_require__(83);

var _errors = __webpack_require__(58);

var _errors2 = _interopRequireDefault(_errors);

var _iVXjsConfigEvents = __webpack_require__(64);

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _index = __webpack_require__(176);

var _index2 = __webpack_require__(180);

var _index3 = __webpack_require__(201);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorEvents = new _errors2.default();
var configEventNames = new _iVXjsConfigEvents2.default();

/**
 * Runs all proceedures to set up a valid iVXjs experience. 
 */

var Setup = exports.Setup = function () {

    /**
     * Adds all information to settings for the modules and 
     * adds the various processors that will create valid 
     * components for a valid iVXjs experience.
     * 
     * @param {object} settings - this experience's settings.
     */
    function Setup() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var Bus = arguments[1];
        var iVXjsLog = arguments[2];

        _classCallCheck(this, Setup);

        /**
         * User defined settings for this experience.
         * 
         * @type {object}
         */
        this.settings = settings;

        /**
         * Enhances existing data for setup.
         * 
         * @type {DataProcessor}
         */
        this.DataProcessor = _processor.DataProcessor;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;
    }

    /**
     * Runs a quick set up that will produce an iVXjs experience. 
     * It performs all set up tasks available in this order:
     * 1. Get data from a data processor.
     * 2. Validate the data.
     * 3. Add any other plugins for this experience.
     * 
     * @return {Promise} - resolves when the set up is done.
     */


    _createClass(Setup, [{
        key: "runSetup",
        value: function runSetup() {
            var self = this;
            var setUpPromise = new Promise(function (resolve, reject) {
                self.resolveSetupProcesses(resolve, reject);
            });

            return setUpPromise;
        }
    }, {
        key: "resolveSetupProcesses",
        value: function resolveSetupProcesses(resolve, reject) {
            var self = this;
            var iVXjsLog = this.iVXjsLog,
                settings = this.settings;
            var _settings$data = settings.data,
                data = _settings$data === undefined ? {} : _settings$data,
                analytics = settings.analytics;
            var _data$module = data.module,
                dataModule = _data$module === undefined ? _index.iVXjsData : _data$module;


            this.setupData(dataModule).then(function validateExperience(experienceData) {
                var validation = self.runValidation(experienceData);

                if (!validation.valid) {
                    var error = validation.error;


                    self.Bus.emit(configEventNames.NOT_VALID, validation);
                    iVXjsLog.error(error, "VALIDATION");
                } else {
                    var updatedExperienceData = self.setupModules(experienceData);
                    iVXjsLog.log("MODULE SUCCESS");

                    if (analytics) {

                        self.Bus.once(configEventNames.ANALYTICS_FINISHED, function (analyticExperience) {
                            resolve(analyticExperience);
                        });
                        self.Bus.emit(configEventNames.ANALYTICS_SET, experienceData);
                    } else {
                        resolve(updatedExperienceData);
                    }
                }
            });
        }

        /**
         * Makes sure the data provided is valid to create an iVXjs Experience
         * 
         * @param {object} experienceData - data to run an experience
         * @return {Promise} - resolves once all validation of this data is finished.
         */

    }, {
        key: "runValidation",
        value: function runValidation(experienceData) {
            var settings = this.settings;
            var _experienceData$valid = experienceData.validation,
                ValidationModule = _experienceData$valid === undefined ? _index3.iVXjsValidation : _experienceData$valid;


            return new ValidationModule(experienceData);
        }

        /**
         * Enhances user configurations and provide data.
         * 
         * @return {Promise} - indicates data enhancement finishes and was successful
         */

    }, {
        key: "setupData",
        value: function setupData(dataModule) {

            var settings = this.settings;

            return new this.DataProcessor(dataModule, settings, this.Bus, this.iVXjsLog).getData();
        }

        /**
         * Runs all processes that require validated data if using
         * the runSetup function.
         * 
         * @param {object} experienceData - enhanced and validated data.
         * @param {Promise} - indicates all plugins/optional modules have loaded
         * their dependencies correctly.
         */

    }, {
        key: "setupModules",
        value: function setupModules(experienceData) {
            var settings = this.settings;
            var _settings$ui = settings.ui,
                UI = _settings$ui === undefined ? _index2.DefaultUI : _settings$ui;


            experienceData.video = new _registeredModules.RegisteredVideoModules();
            experienceData.ui = new UI();
            experienceData.audio = new _registeredModules2.RegisteredAudioModules().html5;

            return experienceData;
        }
    }]);

    return Setup;
}();

;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Enhances the data to run an experience as defined in the data module's 
 * settings.
 */
var DataProcessor = exports.DataProcessor = function () {

  /**
   * Registers all the data that will be used to enhance the
   * data.
   * 
   * @param {object} dataModuleObj - user defined settings for this data module
   * @param {object} settings - all user settings that will be enhanced.
   */
  function DataProcessor(dataModule, settings, Bus, iVXjsLog) {
    _classCallCheck(this, DataProcessor);

    /**
     * User defined data module data that will be used to
     * process and enhance the experience data.
     * 
     * @type {object}
     */
    this.dataModule = dataModule;

    /**
     * All user settings including default data that will 
     * be added to this data module. 
     * 
     * @type {object}
     */
    this.settings = settings;

    /**
     * All available data modules that can be set for this
     * experience.
     * 
     * @type {object}
     */
    this.Bus = Bus;
    this.iVXjsLog = iVXjsLog;
  }

  /**
   * Loads dependencies needed to run the enhancements on the data 
   * and resolves by sending out all enhanced data.
   * 
   * @return {Promise} - indicates that the data is enhanced.
   */


  _createClass(DataProcessor, [{
    key: "getData",
    value: function getData() {
      var self = this;
      var dataModule = this.dataModule,
          settings = this.settings;
      var dataSettings = settings.data;

      var dataPromise = new Promise(function (resolve, reject) {
        self.runEnhancements(resolve, reject, dataModule, dataSettings, self.settings);
      });

      return dataPromise;
    }

    /**
     * Utilizing the appropriate module defined in the data module settings
     * this will enhance the current data and actions defined in that 
     * class's enhance method.
     */

  }, {
    key: "runEnhancements",
    value: function runEnhancements(resolve, reject, DataModuleClass, dataModuleSettings, iVXjsSettings) {
      var dataModule = new DataModuleClass(dataModuleSettings, iVXjsSettings, this.Bus, this.iVXjsLog);

      dataModule.enhance().then(function (data) {
        resolve(data);
      }, function (error) {
        reject(error);
      });
    }
  }]);

  return DataProcessor;
}();

;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RegisteredVideoModules = undefined;

var _html = __webpack_require__(169);

var _youTube = __webpack_require__(172);

var _vimeo = __webpack_require__(173);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Types


var RegisteredVideoModules = exports.RegisteredVideoModules = function RegisteredVideoModules() {
    _classCallCheck(this, RegisteredVideoModules);

    this.youtube = _youTube.YouTube;
    this.html5 = _html.Html5;
    this.vimeo = _vimeo.Vimeo;
};

;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Html5 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _settings2 = __webpack_require__(82);

var _settings3 = _interopRequireDefault(_settings2);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _videoClasses = __webpack_require__(52);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

var _html = __webpack_require__(170);

var _html2 = _interopRequireDefault(_html);

var _tracksEvents = __webpack_require__(65);

var _tracksEvents2 = _interopRequireDefault(_tracksEvents);

var _tracksCuesEvents = __webpack_require__(66);

var _tracksCuesEvents2 = _interopRequireDefault(_tracksCuesEvents);

var _element = __webpack_require__(57);

var _element2 = _interopRequireDefault(_element);

var _video = __webpack_require__(115);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var thisObjectParsers = new _typeParsers.ObjectParsers();
var playerSettings = new _settings3.default();
var typeValidator = new _typeParsers.TypeValidator();

var Html5 = exports.Html5 = function () {
    function Html5(container, settings) {
        var _Object$assign;

        var stateData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var iVXjsLog = arguments[3];

        _classCallCheck(this, Html5);

        var containerElement = new _element2.default(container);

        Object.assign(this, (_Object$assign = {
            settings: settings,
            stateData: stateData,
            container: containerElement,
            videoEventNames: new _videoEvents2.default(),
            videoClassNames: new _videoClasses2.default(),
            TrackCuesService: _html2.default,
            trackEventNames: new _tracksEvents2.default(),
            trackCuesEventNames: new _tracksCuesEvents2.default()
        }, _defineProperty(_Object$assign, "stateData", stateData), _defineProperty(_Object$assign, "iVXjsLog", iVXjsLog), _defineProperty(_Object$assign, "currentVolume", 0.5), _defineProperty(_Object$assign, "videoService", new _video2.default()), _Object$assign));

        containerElement.html(this.html);

        this.player = containerElement.getElementsByTagName("VIDEO")[0];
    }

    _createClass(Html5, [{
        key: "play",
        value: function play(args) {
            var playerId = args.playerId;
            var id = this.settings.id;


            if (!playerId || playerId === id) {
                if (this.player.paused) {
                    this.player.play();
                }

                return;
            }
        }
    }, {
        key: "pause",
        value: function pause() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var playerId = args.playerId;
            var id = this.settings.id;


            if (!playerId || playerId === id) {
                if (!this.player.paused) {
                    this.player.pause();
                }

                return;
            }
        }
    }, {
        key: "getDuration",
        value: function getDuration() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var playerId = args.playerId;
            var id = this.settings.id;


            if (id && playerId === id) {
                this.iVXjsBus.emit(this.videoEventNames.SET_DURATION, {
                    playerId: playerId,
                    duration: this.player.duration
                });
            }
        }
    }, {
        key: "setVolume",
        value: function setVolume() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var playerId = args.playerId,
                volume = args.volume;
            var id = this.settings.id;


            if (this.player.muted) return;

            if (!typeValidator.isNumber(volume)) return;

            if (!playerId || playerId === id) {
                this.player.volume = volume;
                this.currentVolume = volume;
                return;
            }
        }
    }, {
        key: "mute",
        value: function mute() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var playerId = args.playerId,
                volume = args.volume;
            var id = this.settings.id;


            if (!playerId || playerId === id) {
                this.player.muted = true;
                return;
            }
        }
    }, {
        key: "unmute",
        value: function unmute() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var playerId = args.playerId,
                volume = args.volume;
            var id = this.settings.id;


            if (!playerId || playerId === id) {
                this.player.muted = false;
                return;
            }
        }
    }, {
        key: "seek",
        value: function seek() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var currentTime = args.currentTime,
                playerId = args.playerId;
            var id = this.settings.id;


            if (!playerId || playerId === id) {
                this.player.currentTime = currentTime;
                this.player.volume = this.currentVolume;
                return;
            }
        }
    }, {
        key: "setOnReady",
        value: function setOnReady() {
            var videoClassNames = this.videoClassNames;

            var self = this;

            this.player.addEventListener('pause', function () {
                self.container.removeClass(videoClassNames.PLAYING);
                self.container.addClass(videoClassNames.PAUSED);
                self.iVXjsBus.emit(self.videoEventNames.PAUSED, self.player);
            });
            this.player.addEventListener('canplay', function () {
                self.container.addClass(videoClassNames.PAUSED);
                self.container.addClass(videoClassNames.UNMUTED);
                self.iVXjsBus.emit(self.videoEventNames.CAN_PLAY, self.player, self.stateData);
            });
            this.player.addEventListener('playing', function () {
                self.container.removeClass(videoClassNames.PAUSED);
                self.container.addClass(videoClassNames.PLAYING);
                self.iVXjsBus.emit(self.videoEventNames.PLAYING, self.player, self.stateData);
            });
            this.player.addEventListener('seeking', function () {
                self.container.addClass(videoClassNames.SEEKING);
            });
            this.player.addEventListener('seeked', function () {
                self.container.removeClass(videoClassNames.SEEKING);
            });
            this.player.addEventListener('volumechange', function () {
                var _self$player$muted = self.player.muted,
                    muted = _self$player$muted === undefined ? false : _self$player$muted;


                if (muted) {
                    self.container.removeClass(videoClassNames.UNMUTED);
                    self.container.addClass(videoClassNames.MUTED);
                } else {
                    self.container.removeClass(videoClassNames.MUTED);
                    self.container.addClass(videoClassNames.UNMUTED);
                }
            });
        }
    }, {
        key: "setTimeUpdate",
        value: function setTimeUpdate() {
            var self = this;

            this.player.addEventListener('timeupdate', function () {
                self.iVXjsBus.emit(self.videoEventNames.TIME_UPDATE, self.player, self.stateData);
            });
        }
    }, {
        key: "setOnEnd",
        value: function setOnEnd() {
            var self = this;

            this.player.addEventListener('ended', function () {
                self.iVXjsBus.emit(self.videoEventNames.ENDED, self.player, self.stateData);
            });
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners(iVXjsBus) {
            var _this = this;

            var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var videoEventNames = this.videoEventNames,
                trackEventNames = this.trackEventNames,
                trackCuesEventNames = this.trackCuesEventNames,
                iVXjsLog = this.iVXjsLog;
            var tracks = settings.tracks;

            var self = this;

            this.iVXjsBus = iVXjsBus;
            this.currentVolume = this.player.volume;

            if (tracks) {
                this.currentTrack = this.TrackCuesService.addTracks({
                    tracks: tracks,
                    video: this.player,
                    iVXjsBus: iVXjsBus
                });
                this.oldTrack = this.currentTrack;
                this.player.textTracks.onchange = function (evt) {
                    var playerId = _this.settings.id;
                    var oldTrack = self.currentTrack;
                    var _evt$currentTarget = evt.currentTarget,
                        currentTracks = _evt$currentTarget === undefined ? [] : _evt$currentTarget;

                    var currentTrack = Array.from(currentTracks).find(function (currentTrack) {
                        return (currentTrack.kind === 'subtitles' || currentTrack.kind === 'captions') && currentTrack.mode === 'showing';
                    });

                    Object.assign(self, {
                        oldTrack: oldTrack,
                        currentTrack: currentTrack
                    });

                    self.iVXjsBus.emit(trackEventNames.ON_TRACK_CHANGE, { playerId: playerId, oldTrack: oldTrack, currentTrack: currentTrack });
                };
            }

            // Get custom iVXjsBus Function
            this.playOnEvent = iVXjsBus.on(videoEventNames.PLAY, playOnEvent);
            this.pauseOnEvent = iVXjsBus.on(videoEventNames.PAUSE, pauseOnEvent);
            this.volumeOnEvent = iVXjsBus.on(videoEventNames.SET_VOLUME, volumeOnEvent);
            this.muteOnEvent = iVXjsBus.on(videoEventNames.MUTE, muteOnEvent);
            this.unmuteOnEvent = iVXjsBus.on(videoEventNames.UNMUTE, unmuteOnEvent);
            this.durationOnEvent = iVXjsBus.on(videoEventNames.GET_DURATION, durationOnEvent);
            this.seekOnEvent = iVXjsBus.on(videoEventNames.SEEK, seekOnEvent);

            //Track Events
            this.changeCurrentTrackOnEvent = iVXjsBus.on(trackEventNames.CHANGE_CURRENT_TRACK, changeCurrentTrack);
            this.changeChapterOnEvent = iVXjsBus.on(trackCuesEventNames.CHANGE_CHAPTER, changeChapter);

            // If it doesn't have a custom function, add the default one so the Bus can dispose of it.
            this.playOnEvent = this.playOnEvent ? this.playOnEvent : playOnEvent;
            this.pauseOnEvent = this.pauseOnEvent ? this.pauseOnEvent : pauseOnEvent;
            this.seekOnEvent = this.seekOnEvent ? this.seekOnEvent : seekOnEvent;
            this.durationOnEvent = this.durationOnEvent ? this.durationOnEvent : durationOnEvent;
            this.volumeOnEvent = this.volumeOnEvent ? this.volumeOnEvent : volumeOnEvent;
            this.changeCurrentTrackOnEvent = this.changeCurrentTrackOnEvent ? this.changeCurrentTrackOnEvent : changeCurrentTrack;
            this.changeChapterOnEvent = this.changeChapterOnEvent ? this.changeChapterOnEvent : changeChapter;

            this.setOnReady();
            this.setTimeUpdate();
            this.setOnEnd();

            this.player.addEventListener('error', function (event) {
                var settings = self.settings;
                var src = settings.src,
                    _settings$sources = settings.sources,
                    sources = _settings$sources === undefined ? [] : _settings$sources;

                var sourceString = "";

                if (src) {
                    sourceString = "Failed to load video with filepath: " + src;
                }

                if (sources) {
                    sourceString = sources.reduce(function (sourceList, sourcePath, index) {
                        if (index === 0) {
                            return "" + sourceList + sourcePath.src;
                        }

                        return sourceList + "," + sourcePath.src;
                    }, "Failed to load one of the videos with filepaths: ");
                }

                var errorObj = {
                    message: "" + sourceString
                };

                iVXjsLog.error(errorObj, "VIDEO");
            }, true);

            function playOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                self.play(args);
            }

            function pauseOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                self.pause(args);
            }

            function seekOnEvent(currentTime) {
                self.seek(currentTime);
            }

            function durationOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                self.getDuration(args);
            }

            function volumeOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                self.setVolume(args);
            }

            function muteOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                self.mute(args);
            }

            function unmuteOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                self.unmute(args);
            }

            function changeChapter(opts) {
                var _opts$chapterId = opts.chapterId,
                    chapterId = _opts$chapterId === undefined ? "" : _opts$chapterId,
                    playerId = opts.playerId;
                var _self$player = self.player,
                    player = _self$player === undefined ? {} : _self$player;


                if (!playerId || playerId === player.id) {
                    var trackArray = Array.from(player.textTracks);
                    var chapterTrack = trackArray.find(function (track) {
                        var _track$kind = track.kind,
                            kind = _track$kind === undefined ? "" : _track$kind;


                        return kind === 'chapters';
                    });

                    if (chapterTrack) {
                        var _chapterTrack$cues = chapterTrack.cues,
                            cues = _chapterTrack$cues === undefined ? [] : _chapterTrack$cues;

                        var newChapterCue = Array.from(cues).find(function (cue) {
                            var currentChapterId = cue.chapterId;


                            return currentChapterId === chapterId;
                        });

                        if (newChapterCue) {
                            var startTime = newChapterCue.startTime;


                            self.seek({
                                currentTime: startTime,
                                playerId: playerId
                            });
                        }
                    }
                }
            }

            function changeCurrentTrack(opts) {
                var _opts$trackId = opts.trackId,
                    trackId = _opts$trackId === undefined ? "" : _opts$trackId,
                    playerId = opts.playerId;
                var textTracks = self.player.textTracks;

                var trackArray = Array.from(textTracks);

                if (!playerId || playerId === self.player.id) runTrackChange();

                function runTrackChange() {

                    if (trackId.length <= 0) {
                        trackArray.forEach(function (track) {
                            Object.assign(track, {
                                mode: "hidden"
                            });
                        });

                        return;
                    }

                    var newTrack = trackArray.find(function (textTrack) {
                        var kind = textTrack.kind,
                            currentTrackId = textTrack.trackId;

                        var isCaptions = kind === 'captions' || kind === 'subtitles';

                        return isCaptions && currentTrackId === trackId;
                    });

                    if (newTrack) {
                        trackArray.forEach(function (textTrack) {
                            var kind = textTrack.kind,
                                currentTrackId = textTrack.trackId;

                            var isCaptions = kind === 'captions' || kind === 'subtitles';

                            if (isCaptions) {
                                Object.assign(textTrack, {
                                    mode: currentTrackId === trackId ? "showing" : "hidden"
                                });
                            }
                        });
                    }
                }
            }
        }
    }, {
        key: "dispose",
        value: function dispose(iVXjsBus) {
            var videoEventNames = this.videoEventNames,
                trackEventNames = this.trackEventNames,
                trackCuesEventNames = this.trackCuesEventNames;

            var self = this;
            var eventNameMap = {
                play: videoEventNames.PLAY,
                pause: videoEventNames.PAUSE,
                seek: videoEventNames.SEEK,
                duration: videoEventNames.GET_DURATION,
                volume: videoEventNames.SET_VOLUME,
                mute: videoEventNames.MUTE,
                unmute: videoEventNames.UNMUTE,
                changeCurrentTrack: trackEventNames.CHANGE_CURRENT_TRACK,
                changeChapter: trackCuesEventNames.CHANGE_CHAPTER
            };
            var eventsToDispose = Object.keys(eventNameMap);

            eventsToDispose.forEach(function (eventNameToDispose, index) {
                if (!self[eventNameToDispose + "OnEvent"]) return;

                iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[eventNameToDispose + "OnEvent"]);
            });
        }
    }, {
        key: "html",
        get: function get() {
            var _settings = this.settings,
                _settings$tracks = _settings.tracks,
                tracks = _settings$tracks === undefined ? [] : _settings$tracks,
                _settings$sources2 = _settings.sources,
                sources = _settings$sources2 === undefined ? [] : _settings$sources2,
                _settings$controls = _settings.controls,
                controls = _settings$controls === undefined ? true : _settings$controls,
                _settings$isiOS = _settings.isiOS,
                isiOS = _settings$isiOS === undefined ? false : _settings$isiOS;

            var tags = ['tracks', 'sources', 'isiOS', 'autoplay'];
            var justAttrs = ['controls'];
            var showControls = this.videoService.showControls(controls);

            if (showControls) {
                this.settings.controls = true;
            } else {
                delete this.settings.controls;
            }

            var attrHTML = thisObjectParsers.reduce(this.settings, function (thisAttrHTML, value, key) {
                if (tags.indexOf(key) >= 0) return thisAttrHTML;
                if (justAttrs.indexOf(key) >= 0) return thisAttrHTML + " " + key;
                if (key === 'classes') return thisAttrHTML + " class=\"" + value + "\"";

                return thisAttrHTML + " " + key + "=\"" + value + "\"";
            }, "");
            var trackTags = tracks.reduce(function (trackHTML, trackSettings, index) {
                var _trackSettings$conten = trackSettings.content,
                    content = _trackSettings$conten === undefined ? "" : _trackSettings$conten,
                    _trackSettings$cues = trackSettings.cues,
                    cues = _trackSettings$cues === undefined ? [] : _trackSettings$cues;


                if (content.length > 0 || cues.length > 0) {
                    return trackHTML;
                }

                var trackAttrHTML = thisObjectParsers.reduce(trackSettings, function (attrHTML, value, key) {
                    return attrHTML + " " + key + "=\"" + value + "\"";
                }, "");

                return trackHTML + " \n            <track " + trackAttrHTML + ">";
            }, "");
            var sourceTags = sources.reduce(function (sourceHTML, sourceSettings, index) {
                var sourceAttrHTML = thisObjectParsers.reduce(sourceSettings, function (attrHTML, value, key) {
                    return attrHTML + " " + key + "=\"" + value + "\"";
                }, "");

                return sourceHTML + " \n            <source " + sourceAttrHTML + ">";
            }, "");

            return "\n            <video  width=\"100%\" " + attrHTML + " onclick=\"this.paused ? this.play() : this.pause();\">\n                " + sourceTags + "\n                " + trackTags + "\n            </video>";
        }
    }]);

    return Html5;
}();

;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tracksEvents = __webpack_require__(65);

var _tracksEvents2 = _interopRequireDefault(_tracksEvents);

var _tracksCuesEvents = __webpack_require__(66);

var _tracksCuesEvents2 = _interopRequireDefault(_tracksCuesEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trackEventNames = new _tracksEvents2.default();
var trackCueEventNames = new _tracksCuesEvents2.default();

exports.default = {
    addTracks: function addTracks(opts) {
        var video = opts.video,
            _opts$tracks = opts.tracks,
            tracks = _opts$tracks === undefined ? [] : _opts$tracks,
            iVXjsBus = opts.iVXjsBus;

        var self = this;

        tracks.forEach(function (track) {
            var _track$content = track.content,
                content = _track$content === undefined ? "" : _track$content,
                _track$cues = track.cues,
                cueData = _track$cues === undefined ? [] : _track$cues,
                label = track.label,
                srclang = track.srclang,
                _track$kind = track.kind,
                kind = _track$kind === undefined ? "subtitles" : _track$kind,
                _track$default = track.default,
                isDefault = _track$default === undefined ? false : _track$default,
                id = track.id;

            var trackEl = video.addTextTrack(kind, label, srclang);
            var cues = [];

            trackEl.trackId = id;

            if (cueData.length > 0) {
                cues = self.getCuesFromCueData(track);
            }

            cues.forEach(function (cue) {
                if (isDefault || kind === 'chapter') {
                    trackEl.mode = "showing";
                }

                cue = self.addEventListenersToCue({ cue: cue, video: video, iVXjsBus: iVXjsBus });

                trackEl.addCue(cue);
            });
        });

        return Array.from(video.textTracks).find(function (track) {
            return (track.kind === 'captions' || track.kind === 'subtitles') && track.mode === 'showing';
        });
    },
    addEventListenersToCue: function addEventListenersToCue(opts) {
        var cue = opts.cue,
            video = opts.video,
            iVXjsBus = opts.iVXjsBus;
        var playerId = video.id;


        cue.onenter = function (evt) {
            var currentCue = evt.currentTarget;
            var _cue$track = cue.track,
                track = _cue$track === undefined ? {} : _cue$track;
            var kind = track.kind,
                mode = track.mode;


            switch (kind) {
                case "subtitles":
                    {
                        if (mode === 'showing') {
                            iVXjsBus.emit(trackCueEventNames.ON_ENTER, {
                                cue: currentCue,
                                playerId: playerId
                            });
                        }
                        break;
                    }
                case "captions":
                    {
                        if (mode === 'showing') {
                            iVXjsBus.emit(trackCueEventNames.ON_ENTER, {
                                cue: currentCue,
                                playerId: playerId
                            });
                        }
                        break;
                    }
                case "chapters":
                    {
                        iVXjsBus.emit(trackCueEventNames.ON_CHAPTER_START, {
                            cue: currentCue,
                            playerId: playerId
                        });
                        break;
                    }

                default:
                    {
                        iVXjsBus.emit(trackCueEventNames.ON_ENTER, {
                            cue: currentCue,
                            playerId: playerId
                        });
                        break;
                    }
            }
        };

        cue.onexit = function (evt) {
            var currentCue = evt.currentTarget;
            var _currentCue$track = currentCue.track,
                track = _currentCue$track === undefined ? {} : _currentCue$track;
            var kind = track.kind,
                mode = track.mode;


            switch (kind) {
                case "subtitles":
                    {
                        if (mode === 'showing') {
                            iVXjsBus.emit(trackCueEventNames.ON_EXIT, {
                                cue: currentCue,
                                playerId: playerId
                            });
                        }
                        break;
                    }
                case "captions":
                    {
                        if (mode === 'showing') {
                            iVXjsBus.emit(trackCueEventNames.ON_EXIT, {
                                cue: currentCue,
                                playerId: playerId
                            });
                        }
                        break;
                    }
                case "chapters":
                    {
                        iVXjsBus.emit(trackCueEventNames.ON_CHAPTER_END, {
                            cue: currentCue,
                            playerId: playerId
                        });
                        break;
                    }
                default:
                    {
                        iVXjsBus.emit(trackCueEventNames.ON_EXIT, {
                            cue: currentCue,
                            playerId: playerId
                        });
                        break;
                    }
            }
        };

        return cue;
    },
    getCuesFromCueData: function getCuesFromCueData(track) {
        var _track$cues2 = track.cues,
            cueData = _track$cues2 === undefined ? [] : _track$cues2,
            kind = track.kind;

        var cues = [];
        var self = this;

        switch (kind) {
            case "subtitles":
                {
                    cues = cueData.map(function (cuePoint) {
                        return self.createCue(cuePoint);
                    });

                    break;
                }

            case "captions":
                {
                    cues = cueData.map(function (cuePoint) {
                        return self.createCue(cuePoint);
                    });

                    break;
                }
            case "metadata":
                {
                    cues = cueData.map(function (cuePoint) {
                        return self.createMetadataCue(cuePoint);
                    });

                    break;
                }
            case "chapters":
                {
                    cues = cueData.map(function (cuePoint) {
                        return self.createChapterCue(cuePoint);
                    });

                    break;
                }
        }

        return cues;
    },
    createMetadataCue: function createMetadataCue(metadataCueObject) {
        var id = metadataCueObject.id,
            start = metadataCueObject.start,
            end = metadataCueObject.end,
            payload = metadataCueObject.payload;

        var cue = {};

        if (window.VTTCue) {
            cue = new VTTCue(start, end, payload);
            cue = Object.assign(cue, {
                id: id
            });

            return cue;
        }

        if (window.TextTrackCue) {
            cue = new TextTrackCue(start, end, payload);
            cue = Object.assign(cue, {
                id: id
            });

            return cue;
        }
    },
    createChapterCue: function createChapterCue(chapterObject) {
        var id = chapterObject.id,
            chapterId = chapterObject.chapterId,
            start = chapterObject.start,
            end = chapterObject.end,
            payload = chapterObject.payload;

        var cue = {};

        if (window.VTTCue) {
            cue = new VTTCue(start, end, payload);
            cue = Object.assign(cue, {
                id: id,
                chapterId: chapterId ? chapterId : id
            });

            return cue;
        }

        if (window.TextTrackCue) {
            cue = new TextTrackCue(start, end, payload);
            cue = Object.assign(cue, {
                id: id
            });

            return cue;
        }

        return cue;
    },
    convertPercentToValue: function convertPercentToValue(percents) {
        var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

        var propertyKeys = Object.keys(percents);
        var self = this;
        var cleanedProperties = propertyKeys.reduce(function (cleaned, key, index) {
            var percentString = percents[key];
            var decimalValue = self._convertPercentToInteger(percentString);
            var newProperty = {};

            if (isNaN(decimalValue)) {
                newProperty[key] = percentString;
            } else {
                newProperty[key] = decimalValue;
            }

            Object.assign(cleaned, newProperty);

            return cleaned;
        }, {});

        return cleanedProperties;
    },
    _convertPercentToInteger: function _convertPercentToInteger(percentString) {
        var percentValue = percentString.replace("%", "");

        return parseFloat(percentValue);
    },
    addVTTCueStyles: function addVTTCueStyles(opts) {
        var oldCue = opts.vttCue,
            cueObject = opts.cueObject;
        var id = cueObject.id,
            position = cueObject.position,
            line = cueObject.line,
            size = cueObject.size,
            align = cueObject.align,
            vertical = cueObject.vertical;

        var newCue = Object.assign(oldCue, {
            id: id
        });

        if (align) {
            newCue.align = align;
        }

        if (position) {
            newCue.position = this._convertPercentToInteger(position);
        }

        if (size) {
            newCue.size = this._convertPercentToInteger(size);
        }

        if (line) {
            newCue.line = line.indexOf && line.indexOf('%') >= 0 ? this._convertPercentToInteger(line) : line;
        }

        if (vertical) {
            newCue.vertical = vertical;
        }

        return newCue;
    },
    createCue: function createCue(cueObject) {
        var start = cueObject.start,
            end = cueObject.end,
            payload = cueObject.payload;


        if (window.VTTCue) {
            var vttCue = new VTTCue(start, end, payload);

            vttCue = this.addVTTCueStyles({ vttCue: vttCue, cueObject: cueObject });

            return vttCue;
        }

        if (window.TextTrackCue) {
            return new TextTrackCue(start, end, payload);
        }

        return cue;
    }
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracks = __webpack_require__(114);

var _tracks2 = _interopRequireDefault(_tracks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_TracksConstants) {
    _inherits(_class, _TracksConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.CUES = "cues";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                CUES = this.CUES;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + CUES;
        }
    }]);

    return _class;
}(_tracks2.default);

exports.default = _class;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YouTube = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _videoClasses = __webpack_require__(52);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

var _typeParsers = __webpack_require__(7);

var _element = __webpack_require__(57);

var _element2 = _interopRequireDefault(_element);

var _video = __webpack_require__(115);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

var YouTube = exports.YouTube = function () {
    function YouTube(container, settings, stateData, iVXjsLog) {
        _classCallCheck(this, YouTube);

        var containerElement = new _element2.default(container);

        this._settings = settings;
        this._stateData = stateData;
        this.intervals = [];
        this.videoEventNames = new _videoEvents2.default();
        this.iVXjsLog = iVXjsLog;
        this.playerId = settings.playerId;
        this.currentVolume = 0.6;
        this.videoService = new _video2.default();

        Object.assign(this, {
            videoClassNames: new _videoClasses2.default(),
            container: containerElement
        });

        containerElement.html(this.html);
    }

    _createClass(YouTube, [{
        key: "createPlayer",
        value: function createPlayer() {
            var _settings = this._settings,
                _settings$height = _settings.height,
                height = _settings$height === undefined ? 'inherit' : _settings$height,
                _settings$width = _settings.width,
                width = _settings$width === undefined ? 'inherit' : _settings$width,
                id = _settings.id,
                controls = _settings.controls,
                playerId = _settings.playerId;

            var hasControls = this.videoService.showControls(controls) ? 1 : 0;

            this.player = new YT.Player(this.playerId, {
                height: height,
                width: width,
                videoId: id,
                playerVars: {
                    controls: hasControls,
                    showinfo: 0,
                    autohide: 1
                }
            });

            this.player.id = playerId;
        }
    }, {
        key: "dispose",
        value: function dispose(iVXjsBus) {
            var videoEventNames = this.videoEventNames;

            var self = this;
            var eventNameMap = {
                play: videoEventNames.PLAY,
                pause: videoEventNames.PAUSE,
                seek: videoEventNames.SEEK,
                duration: videoEventNames.GET_DURATION,
                volume: videoEventNames.SET_VOLUME,
                playing: videoEventNames.PLAYING,
                paused: videoEventNames.PAUSED,
                ended: videoEventNames.ENDED,
                mute: videoEventNames.MUTE,
                unmute: videoEventNames.UNMUTE
            };
            var eventsToDispose = Object.keys(eventNameMap);

            clearInterval(this.timeUpdateId);
            clearInterval(this.mutedIntervalId);

            eventsToDispose.forEach(function (eventNameToDispose, index) {
                if (!self[eventNameToDispose + "OnEvent"]) return;

                iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[eventNameToDispose + "OnEvent"]);
            });
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners(iVXjsBus) {
            var stateData = this._stateData,
                player = this.player,
                videoEventNames = this.videoEventNames,
                playerId = this.playerId,
                videoClassNames = this.videoClassNames;

            var self = this;
            var timeUpdateId = void 0;
            var numberofTimeupdates = 0;

            player.addEventListener('onError', function (event) {
                var messages = {
                    2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                    5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                    100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                    101: "The owner of the requested video does not allow it to be played in embedded players.",
                    150: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private."
                };
                var errorObj = {
                    message: messages[event.data]
                };

                self.iVXjsLog.error(errorObj, "VIDEO");
            });

            player.addEventListener('onStateChange', function onStateChange() {
                switch (player.getPlayerState()) {
                    case 0:
                        iVXjsBus.emit(videoEventNames.ENDED, player, stateData);
                        break;
                    case 1:
                        player.paused = false;
                        iVXjsBus.emit(videoEventNames.PLAYING, player, stateData);
                        self.container.removeClass(videoClassNames.PAUSED);
                        self.container.removeClass(videoClassNames.SEEKING);
                        self.container.addClass(videoClassNames.PLAYING);
                        break;
                    case 2:
                        player.paused = true;
                        self.container.removeClass(videoClassNames.PLAYING);
                        self.container.addClass(videoClassNames.PAUSED);
                        iVXjsBus.emit(videoEventNames.PAUSED, player, stateData);
                        break;
                    case 3:
                        iVXjsBus.emit(videoEventNames.BUFFERING, player, stateData);
                        self.container.addClass(videoClassNames.SEEKING);
                        break;
                }
            });

            player.addEventListener('onReady', function onYouTubeOnReady() {
                self.playOnEvent = iVXjsBus.on(videoEventNames.PLAY, playOnEvent);
                self.pauseOnEvent = iVXjsBus.on(videoEventNames.PAUSE, pauseOnEvent);
                self.muteOnEvent = iVXjsBus.on(videoEventNames.MUTE, muteOnEvent);
                self.unmuteOnEvent = iVXjsBus.on(videoEventNames.UNMUTE, unmuteOnEvent);
                self.volumeOnEvent = iVXjsBus.on(videoEventNames.SET_VOLUME, volumeOnEvent);
                self.durationOnEvent = iVXjsBus.on(videoEventNames.GET_DURATION, durationOnEvent);
                self.seekOnEvent = iVXjsBus.on(videoEventNames.SEEK, seekOnEvent);
                self.pausedOnEvent = iVXjsBus.on(videoEventNames.PAUSED, pausedOnEvent);
                self.endedOnEvent = iVXjsBus.on(videoEventNames.ENDED, endedOnEvent);
                self.playingOnEvent = iVXjsBus.on(videoEventNames.PLAYING, playingOnEvent);
                self.playOnEvent = typeof self.playOnEvent === 'function' ? self.playOnEvent : playOnEvent;
                self.pauseOnEvent = typeof self.pauseOnEvent === 'function' ? self.pauseOnEvent : pauseOnEvent;
                self.seekOnEvent = typeof self.seekOnEvent === 'function' ? self.seekOnEvent : seekOnEvent;
                self.durationOnEvent = typeof self.durationOnEvent === 'function' ? self.durationOnEvent : durationOnEvent;
                self.volumeOnEvent = typeof self.volumeOnEvent === 'function' ? self.volumeOnEvent : volumeOnEvent;
                self.pausedOnEvent = typeof self.pausedOnEvent === 'function' ? self.pausedOnEvent : pausedOnEvent;
                self.endedOnEvent = typeof self.endedOnEvent === 'function' ? self.endedOnEvent : endedOnEvent;
                self.playingOnEvent = typeof self.playingOnEvent === 'function' ? self.playingOnEvent : playingOnEvent;
                iVXjsBus.emit(videoEventNames.CAN_PLAY, player, self.stateData);
                self.container.addClass(videoClassNames.PAUSED);
                self._setMuted();
            });

            function playOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.playerId) playVideo();

                function playVideo() {
                    player.playVideo();
                    clearInterval(self.timeUpdateId);
                }
            }

            function pauseOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.playerId) pauseVideo();

                function pauseVideo() {
                    player.pauseVideo();
                    clearInterval(self.timeUpdateId);
                }
            }

            function durationOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (playerId === self.playerId) setDuration();

                function setDuration() {
                    iVXjsBus.emit(videoEventNames.SET_DURATION, {
                        playerId: playerId,
                        duration: player.getDuration()
                    });
                }
            }

            function volumeOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId,
                    volume = args.volume;


                if (!playerId || playerId === self.playerId) setVolume();

                function setVolume() {
                    self.currentVolume = volume;
                    player.setVolume(volume * 100);
                }
            }

            function muteOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.playerId) setVolume();

                function setVolume() {
                    player.mute();
                }
            }

            function unmuteOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.playerId) setVolume();

                function setVolume() {
                    player.unMute();
                }
            }

            function playingOnEvent(player) {
                if (player.id === self.playerId) {
                    player.currentTime = player.getCurrentTime();

                    iVXjsBus.emit(videoEventNames.TIME_UPDATE, player);

                    var currentNumber = numberofTimeupdates;

                    self.timeUpdateId = setInterval(function () {
                        player.currentTime = player.getCurrentTime();

                        iVXjsBus.emit(videoEventNames.TIME_UPDATE, player, stateData);
                    }, 50);
                }
            }

            function seekOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                clearInterval(self.timeUpdateId);

                var playerId = args.playerId,
                    currentTime = args.currentTime;


                if (!playerId || playerId === self.playerId) seek();

                function seek() {
                    player.seekTo(currentTime);
                    clearInterval(self.timeUpdateId);
                }
            }

            function pausedOnEvent() {
                clearInterval(self.timeUpdateId);
            }

            function endedOnEvent() {
                clearInterval(self.timeUpdateId);
            }
        }
    }, {
        key: "_setMuted",
        value: function _setMuted() {
            var player = this.player,
                container = this.container,
                videoClassNames = this.videoClassNames;


            this.mutedIntervalId = setInterval(function () {
                if (player.isMuted()) {
                    container.removeClass(videoClassNames.UNMUTED);
                    container.addClass(videoClassNames.MUTED);
                } else {
                    container.removeClass(videoClassNames.MUTED);
                    container.addClass(videoClassNames.UNMUTED);
                }
            }, 50);
        }
    }, {
        key: "html",
        get: function get() {
            var _settings$classes = this._settings.classes,
                classes = _settings$classes === undefined ? "" : _settings$classes;


            return "<div id=\"" + this.playerId + "\" class='youtube-player " + classes + "'></div>";
        }
    }]);

    return YouTube;
}();

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vimeo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings2 = __webpack_require__(82);

var _settings3 = _interopRequireDefault(_settings2);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _typeParsers = __webpack_require__(7);

var _videoClasses = __webpack_require__(52);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

var _element = __webpack_require__(57);

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var playerSettings = new _settings3.default();
var typeValidator = new _typeParsers.TypeValidator();

var Vimeo = exports.Vimeo = function () {
    function Vimeo(container, settings, stateData, iVXjsLog) {
        var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        _classCallCheck(this, Vimeo);

        var vimeoPlayerContainer = opts.vimeoPlayerContainer;

        var videoContainerElement = new _element2.default(container);
        var containerElement = new _element2.default(vimeoPlayerContainer);
        this._settings = settings;
        this._stateData = stateData;

        this.playerId = settings.playerId;

        var id = settings.id,
            width = settings.width,
            loop = settings.loop;

        var options = { id: id, width: width, loop: loop };

        videoContainerElement.html(this.html);

        this.player = new window.Vimeo.Player(settings.playerId, options);
        this.player.id = settings.playerId;
        this.videoEventNames = new _videoEvents2.default();
        this.iVXjsLog = iVXjsLog;
        this.currentVolume = 0.5;

        Object.assign(this, {
            videoClassNames: new _videoClasses2.default(),
            container: containerElement
        });
    }

    _createClass(Vimeo, [{
        key: "createPlayer",
        value: function createPlayer() {
            var hasControls = 1;

            if (typeof controls === 'string') {
                hasControls = 0;
            }
        }
    }, {
        key: "dispose",
        value: function dispose(iVXjsBus) {
            var videoEventNames = this.videoEventNames;

            var self = this;
            var eventNameMap = {
                play: videoEventNames.PLAY,
                pause: videoEventNames.PAUSE,
                seek: videoEventNames.SEEK,
                duration: videoEventNames.GET_DURATION,
                volume: videoEventNames.SET_VOLUME,
                playing: videoEventNames.PLAYING,
                ended: videoEventNames.ENDED,
                mute: videoEventNames.MUTE,
                unmute: videoEventNames.UNMUTE
            };
            var eventsToDispose = Object.keys(eventNameMap);

            eventsToDispose.forEach(function (eventNameToDispose, index) {
                if (!self[eventNameToDispose + "OnEvent"]) return;

                iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[eventNameToDispose + "OnEvent"]);
            });
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners(iVXjsBus) {
            var stateData = this._stateData,
                videoEventNames = this.videoEventNames,
                _settings = this._settings,
                container = this.container,
                videoClassNames = this.videoClassNames;
            var id = _settings.id;

            var self = this;
            var timeUpdateId = void 0;
            var url = "https://player.vimeo.com/video/" + _settings.id;
            var oEmbedUrl = "https://vimeo.com/api/oembed.json?url=" + url;
            var canGetVideo = function canGetVideo(xhr) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {} else {
                        var errorObj = {
                            message: "Vimeo failed to load with id: " + id + "."
                        };
                        self.iVXjsLog.error(errorObj, "VIDEO");
                    }
                }
            };
            var xhr = new XMLHttpRequest();
            var deferred = new Promise(function (resolve, reject) {
                xhr.onreadystatechange = function () {
                    canGetVideo(xhr);
                };
                xhr.open('GET', oEmbedUrl);
                xhr.send();
            });

            self.durationOnEvent = iVXjsBus.on(videoEventNames.GET_DURATION, durationOnEvent);
            self.pauseOnEvent = iVXjsBus.on(videoEventNames.PAUSE, pauseOnEvent);
            self.playOnEvent = iVXjsBus.on(videoEventNames.PLAY, playOnEvent);
            self.seekOnEvent = iVXjsBus.on(videoEventNames.SEEK, seekOnEvent);
            self.volumeOnEvent = iVXjsBus.on(videoEventNames.SET_VOLUME, volumeOnEvent);
            self.muteOnEvent = iVXjsBus.on(videoEventNames.MUTE, muteOnEvent);
            self.unmuteOnEvent = iVXjsBus.on(videoEventNames.UNMUTE, unmuteOnEvent);

            self.durationOnEvent = typeof self.durationOnEvent === 'function' ? self.durationOnEvent : durationOnEvent;
            self.pauseOnEvent = typeof self.pauseOnEvent === 'function' ? self.pauseOnEvent : pauseOnEvent;
            self.playOnEvent = typeof self.playOnEvent === 'function' ? self.playOnEvent : playOnEvent;
            self.seekOnEvent = typeof self.seekOnEvent === 'function' ? self.seekOnEvent : seekOnEvent;
            self.volumeOnEvent = typeof self.volumeOnEvent === 'function' ? self.volumeOnEvent : volumeOnEvent;

            self.player.on('timeupdate', function (vimeoPlayInfo) {
                self.player.getPaused().then(function (paused) {
                    vimeoPlayInfo.currentTime = vimeoPlayInfo.seconds;
                    vimeoPlayInfo.id = self.playerId;
                    vimeoPlayInfo.paused = paused;

                    iVXjsBus.emit(videoEventNames.TIME_UPDATE, vimeoPlayInfo, self.stateData);
                });
            });

            self.player.on('pause', function () {
                self.container.addClass(videoClassNames.PAUSED);
                self.container.removeClass(videoClassNames.PLAYING);
                iVXjsBus.emit(videoEventNames.PAUSED, self.player);
            });

            self.player.on('play', function () {
                self.container.removeClass(videoClassNames.PAUSED);
                self.container.addClass(videoClassNames.PLAYING);
                iVXjsBus.emit(videoEventNames.PLAYING, self.player);
            });

            self.player.on('ended', function () {
                iVXjsBus.emit(videoEventNames.ENDED, self.player);
            });

            self.player.on('volumechange', function (args) {
                var volume = args.volume;


                if (volume <= 0) {
                    container.removeClass(videoClassNames.UNMUTED);
                    container.addClass(videoClassNames.MUTED);
                } else {
                    container.removeClass(videoClassNames.MUTED);
                    container.addClass(videoClassNames.UNMUTED);
                }
            });

            self.player.on('loaded', function () {
                var _self$_settings$class = self._settings.classes,
                    classes = _self$_settings$class === undefined ? "" : _self$_settings$class;

                var iFrame = document.querySelector('#' + self.playerId + ' iframe');

                self.container.addClass(videoClassNames.PAUSED);
                self.container.addClass(videoClassNames.UNMUTED);

                if (iFrame) {
                    iFrame.className = iFrame.className + " " + classes;
                }

                iVXjsBus.emit(videoEventNames.CAN_PLAY, self.player, self.stateData);
            });

            function playOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.player.id) {
                    self.player.play();
                }
            }

            function pauseOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.player.id) {
                    self.player.pause();
                }
            }

            function volumeOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var volume = args.volume,
                    playerId = args.playerId;


                if (!playerId || playerId === self.player.id) {
                    self.player.setVolume(volume);
                    self.currentVolume = volume;
                }
            }

            function muteOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.player.id) {
                    self.player.setVolume(0);
                }
            }

            function unmuteOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.player.id) {
                    self.player.setVolume(self.currentVolume);
                }
            }

            function seekOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var currentTime = args.currentTime,
                    playerId = args.playerId;


                if (!playerId) self.player.setCurrentTime(currentTime);
                if (playerId === self.player.id) self.player.setCurrentTime(currentTime);
            }

            function durationOnEvent() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (playerId === self.player.id) {
                    self.player.getDuration().then(function (duration) {
                        iVXjsBus.emit(videoEventNames.SET_DURATION, {
                            playerId: playerId,
                            duration: duration
                        });
                    });
                }
            }
        }
    }, {
        key: "html",
        get: function get() {
            return "<div id=\"" + this.playerId + "\" class=\"player1 vimeo-player\" data-vimeo-autoplay=\"false\" data-vimeo-loop=\"false\"></div>";
        }
    }]);

    return Vimeo;
}();

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RegisteredAudioModules = undefined;

var _html = __webpack_require__(175);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Types


var RegisteredAudioModules = exports.RegisteredAudioModules = function RegisteredAudioModules() {
    _classCallCheck(this, RegisteredAudioModules);

    this.html5 = _html.Html5;
};

;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Html5 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Html5 = exports.Html5 = function () {
    function Html5(selector) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'voiceover';

        _classCallCheck(this, Html5);

        var audioElement = document.createElement('AUDIO');

        this.currentVolume = 0.5;
        this.id = id;
        this.audioElement = audioElement;
        this.audioElement.setAttribute('id', id);
        this.validator = new _typeParsers.TypeValidator();

        document.querySelector(selector).appendChild(audioElement);
    }

    _createClass(Html5, [{
        key: "play",
        value: function play() {
            var _this = this;

            var self = this;
            var audioEventNames = new _audioEvents2.default();

            this.audioElement.addEventListener('canplaythrough', function () {
                self.iVXjsBus.emit(audioEventNames.CAN_PLAY);
                _this.audioElement.play();
            });
        }
    }, {
        key: "pause",
        value: function pause() {
            this.audioElement.pause();
        }
    }, {
        key: "mute",
        value: function mute() {
            this.audioElement.volume = 0;
        }
    }, {
        key: "unmute",
        value: function unmute() {
            this.audioElement.volume = this.currentVolume;
        }
    }, {
        key: "setVolume",
        value: function setVolume(volume) {
            if (!volume || !this.validator.isNumber(volume)) return;
            this.audioElement.volume = volume;
            this.currentVolume = volume;
        }
    }, {
        key: "seek",
        value: function seek(time) {
            this.audioElement.currentTime = time;
        }
    }, {
        key: "getDuration",
        value: function getDuration() {
            return this.audioElement.currentTime;
        }
    }, {
        key: "setSrc",
        value: function setSrc(src) {
            this.audioElement.setAttribute('src', src);
        }
    }, {
        key: "setTimeUpdate",
        value: function setTimeUpdate() {
            var self = this;
            var audioEventNames = new _audioEvents2.default();

            this.audioElement.addEventListener('timeupdate', function () {
                self.iVXjsBus.emit(audioEventNames.TIME_UPDATE, self);
            });
        }
    }, {
        key: "setOnEnd",
        value: function setOnEnd() {
            var self = this;
            var audioEventNames = new _audioEvents2.default();

            this.audioElement.addEventListener("ended", function () {
                self.iVXjsBus.emit(audioEventNames.ENDED, self);
            }, false);
        }
    }, {
        key: "runCuePoints",
        value: function runCuePoints(processor) {
            var _audioElement = this.audioElement,
                audioElement = _audioElement === undefined ? {} : _audioElement,
                _cuePoints = this.cuePoints,
                cuePoints = _cuePoints === undefined ? [] : _cuePoints;
            var currentTime = audioElement.currentTime;


            if (cuePoints.length <= 0) return;

            cuePoints.forEach(function (cuePoint, index) {
                var timeAt = cuePoint.timeAt,
                    _cuePoint$fired = cuePoint.fired,
                    fired = _cuePoint$fired === undefined ? false : _cuePoint$fired,
                    _cuePoint$once = cuePoint.once,
                    once = _cuePoint$once === undefined ? false : _cuePoint$once;

                var timeUntil = Math.abs(cuePoint.timeAt - currentTime);

                if (timeAt <= currentTime && !fired) {
                    processor.resolveActions([cuePoint], function () {
                        if (once) {
                            cuePoint.fired = true;
                        }
                    });
                }
            });
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners(iVXjsBus) {
            var audioEventNames = new _audioEvents2.default();
            var self = this;

            this.iVXjsBus = iVXjsBus;

            // Looks for a custom iVXjsBus Function for specific implementations of the iVXjsBus
            this.playOnEvent = iVXjsBus.on(audioEventNames.PLAY, playOnEvent);
            this.pauseOnEvent = iVXjsBus.on(audioEventNames.PAUSE, pauseOnEvent);
            this.muteOnEvent = iVXjsBus.on(audioEventNames.MUTE, muteOnEvent);
            this.unmuteOnEvent = iVXjsBus.on(audioEventNames.UNMUTE, unmuteOnEvent);
            this.volumeOnEvent = iVXjsBus.on(audioEventNames.VOLUME, volumeOnEvent);
            this.durationOnEvent = iVXjsBus.on(audioEventNames.GET_DURATION, durationOnEvent);
            this.seekOnEvent = iVXjsBus.on(audioEventNames.SEEK, seekOnEvent);
            this.setUp = iVXjsBus.on(audioEventNames.SET_UP, setUp);

            // Sets it to the custom iVXjsBus Function (if it has one) or just sets the default one
            this.playOnEvent = this.playOnEvent ? this.playOnEvent : playOnEvent;
            this.pauseOnEvent = this.pauseOnEvent ? this.pauseOnEvent : pauseOnEvent;
            this.seekOnEvent = this.seekOnEvent ? this.seekOnEvent : seekOnEvent;
            this.durationOnEvent = this.durationOnEvent ? this.durationOnEvent : durationOnEvent;
            this.volumeOnEvent = this.volumeOnEvent ? this.volumeOnEvent : volumeOnEvent;
            this.setUp = this.setUp ? this.setUp : setUp;

            // Sets up custom functions on the audio object
            this.setTimeUpdate();
            this.setOnEnd();

            function setUp(audioInfo) {
                var _audioInfo$cuePoints = audioInfo.cuePoints,
                    cuePoints = _audioInfo$cuePoints === undefined ? [] : _audioInfo$cuePoints,
                    _audioInfo$onEnd = audioInfo.onEnd,
                    onEnd = _audioInfo$onEnd === undefined ? [] : _audioInfo$onEnd;


                if (audioInfo.id === self.id) {
                    self.audioElement.setAttribute('src', audioInfo.src);
                    self.cuePoints = cuePoints;
                    self.onEnd = onEnd;

                    if (audioInfo.loop) {
                        self.audioElement.setAttribute('loop', '');
                    } else {
                        self.audioElement.removeAttribute('loop');
                    }
                }
            }

            function playOnEvent() {
                self.play();
            }

            function pauseOnEvent() {
                self.pause();
            }

            function muteOnEvent() {
                self.mute();
            }

            function unmuteOnEvent() {
                self.unmute();
            }

            function seekOnEvent(currentTime) {
                self.seek(currentTime);
            }

            function durationOnEvent() {
                self.getDuration();
            }

            function volumeOnEvent(volume) {
                self.setVolume(volume);
            }
        }
    }]);

    return Html5;
}();

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iVXjsData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _actions = __webpack_require__(177);

var _rules = __webpack_require__(178);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultActions = new _actions.Actions();
var myObjectParser = new _typeParsers.ObjectParsers();

var iVXjsData = exports.iVXjsData = function () {
    function iVXjsData() {
        var moduleSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var iVXjsSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var Bus = arguments[2];
        var iVXjsLog = arguments[3];

        _classCallCheck(this, iVXjsData);

        this.moduleSettings = moduleSettings;
        this.iVXjsSettings = iVXjsSettings;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;
    }

    _createClass(iVXjsData, [{
        key: 'setUpExperience',
        value: function setUpExperience(configData, enhanceResolve) {
            var _iVXjsSettings = this.iVXjsSettings,
                config = _iVXjsSettings.config,
                _iVXjsSettings$data = _iVXjsSettings.data,
                data = _iVXjsSettings$data === undefined ? {} : _iVXjsSettings$data,
                modifiedExperience = _iVXjsSettings.experience,
                customRules = _iVXjsSettings.rules,
                _iVXjsSettings$ui = _iVXjsSettings.ui,
                ui = _iVXjsSettings$ui === undefined ? 'default' : _iVXjsSettings$ui,
                validation = _iVXjsSettings.validation;

            var experience = defaultActions;
            var _configData$modules = configData.modules,
                configModules = _configData$modules === undefined ? {} : _configData$modules;
            var _configModules$ui = configModules.ui,
                configUI = _configModules$ui === undefined ? ui : _configModules$ui,
                _configModules$valida = configModules.validation,
                configValidation = _configModules$valida === undefined ? validation : _configModules$valida;


            if (modifiedExperience) {
                experience = myObjectParser.merge(experience, modifiedExperience);
            }

            var enhanced = {
                experience: experience,
                validation: validation,
                rules: new _rules.Rules(experience, customRules).rules,
                config: configData
            };

            enhanceResolve(enhanced);
        }
    }, {
        key: 'enhance',
        value: function enhance() {
            var _this = this;

            var self = this;
            var config = this.iVXjsSettings.config;

            var enhancePromise = new Promise(function (resolve, reject) {
                if (typeof config === 'string') {
                    _this.getConfigJSON(config).then(function (configData) {
                        self.setUpExperience(configData, resolve);
                    }, function (error) {
                        reject(error);
                    });
                } else {
                    self.setUpExperience(config, resolve);
                }
            });

            return enhancePromise;
        }
    }, {
        key: 'getConfigJSON',
        value: function getConfigJSON(url) {
            var xhr = new XMLHttpRequest();
            var self = this;
            var deferred = new Promise(function (resolve, reject) {
                xhr.onreadystatechange = function () {
                    self.isValidJSONRequest(resolve, reject, xhr);
                };
                xhr.open('GET', url);
                xhr.send();
            });

            return deferred;
        }
    }, {
        key: 'isValidJSONRequest',
        value: function isValidJSONRequest(resolve, reject, xhr) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var responseJSON = JSON.parse(xhr.responseText);
                        resolve(responseJSON);
                    } catch (e) {
                        this.Bus.emit('iVX:error:json', e);
                        console.error(e);
                    }
                } else {
                    reject({ error: 'Config JSON Not Obtained' });
                }
            }
        }
    }]);

    return iVXjsData;
}();

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Actions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

var _stateEvents = __webpack_require__(63);

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
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evaluator = __webpack_require__(179);

var _evaluator2 = _interopRequireDefault(_evaluator);

var _typeParsers = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

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

        /**
         * Current iVXjs Expereince 
         * 
         * @type {object}
         */
        this.experience = experience;
        this.evaluator = new _evaluator2.default(experience, customEvaluator);
    }

    /**
     * The default rules function that will process an 
     * array of navigation objects and evaluate them using 
     * the processRules function.
     * 
     * @type {Function}
     */


    _createClass(Rules, [{
        key: 'processRules',


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
            var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


            if (!Array.isArray(navArray)) {
                navArray = [];
            }

            var self = this;
            var stateSelect = navArray.find(function (navObj) {
                var rule = navObj.rule;


                if (typeValidator.isEmpty(rule)) return true;

                var conditions = rule.conditions,
                    _rule$conditionOperat = rule.conditionOperator,
                    conditionOperator = _rule$conditionOperat === undefined ? "and" : _rule$conditionOperat;


                if (!conditions) {
                    rule.conditionOperator = conditionOperator;
                    rule.conditions = [rule];
                }

                return self.evaluator.evaluate(rule);
            }) || {};

            var _stateSelect$stateId = stateSelect.stateId,
                stateId = _stateSelect$stateId === undefined ? '' : _stateSelect$stateId,
                route = stateSelect.route;


            return route ? route : stateId;
        }
    }, {
        key: 'rules',
        get: function get() {
            var self = this;

            return function () {
                var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                return self.processRules(navArray);
            };
        }
    }]);

    return Rules;
}();

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

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
        key: "evaluate",
        value: function evaluate(rule) {
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


                if (self.customEvaluator && typeValidator.isFunction(self.customEvaluator) && self.customEvaluator(condition)) {
                    return self.customEvaluator(condition);
                }

                // Since older versions of the iVXjs JSON used 
                // the key for "keyword" this will make it backwards
                // compatable
                if (self[lhs]) {
                    return self[lhs](lhs, is, rhs);
                }

                if (self[type]) {
                    return self[type](lhs, is, rhs);
                }

                return false;
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
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultUI = undefined;

var _form = __webpack_require__(181);

var _anchor = __webpack_require__(182);

var _buttons = __webpack_require__(183);

var _checkbox = __webpack_require__(184);

var _date = __webpack_require__(185);

var _datetimeLocal = __webpack_require__(186);

var _email = __webpack_require__(187);

var _number = __webpack_require__(188);

var _options = __webpack_require__(189);

var _radio = __webpack_require__(190);

var _style = __webpack_require__(25);

var _text = __webpack_require__(191);

var _textarea = __webpack_require__(192);

var _url = __webpack_require__(193);

var _stateInput = __webpack_require__(194);

var _stateVideo = __webpack_require__(195);

var _stateNavigation = __webpack_require__(196);

var _videoControls = __webpack_require__(197);

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Form/Input HTML


//States


//Controls 


/**
 * Registers all the various default UI classes to 
 * this class to be used by various renders.
 */
var DefaultUI =

/**
 * By default, this UI framework should support the following inputs:
 * 
 * * form
 * * button 
 * * checkbox
 * * date
 * * datetime-local 
 * * email 
 * * number 
 * * select/options 
 * * radio buttons 
 * * text 
 * * textarea 
 * * url 
 * * video.controls
 * 
 * Provide the html for the following state types:
 * 
 * * input 
 * * video
 * 
 * 
 */
exports.DefaultUI = function DefaultUI() {
    _classCallCheck(this, DefaultUI);

    this.form = _form.Form;
    this.anchor = _anchor.Anchor;
    this.buttons = _buttons.Buttons;
    this.checkbox = _checkbox.Checkbox;
    this.date = _date.Date;
    this.datetimeLocal = _datetimeLocal.DatetimeLocal;
    this.email = _email.Email;
    this.number = _number.Number;
    this.options = _options.Options;
    this.radio = _radio.Radio;
    this.style = new _style.Style();
    this.text = _text.Text;
    this.textarea = _textarea.Textarea;
    this.url = _url.Url;
    this.videoControls = _videoControls2.default;
    this.states = {
        input: _stateInput.InputState,
        video: _stateVideo.VideoState,
        navigation: _stateNavigation.NavigationState
    };
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a form wrapper around these inputs and a 
 * submit button to submit the form.
 */
var Form = exports.Form = function () {

    /**
     * Sets up the various data to render this form.
     * @param {array} inputHTML - All input data to be added to this form 
     * @param {string} name - name of this form 
     * @param {string} additionalAttrHTML - Attributes that need to be 
     * added to the form primarily used for validation and submit functions.
     * @param {object} settings - Global settings for this form.
     */
    function Form(inputHTML, name, additionalAttrHTML, settings) {
        var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _style.Style;

        _classCallCheck(this, Form);

        /**
         * All input html information for this 
         * form
         * @type {String}
         */
        this.inputHTML = inputHTML;

        /**
         * Name for this form 
         * @type {String}
         */
        this.name = name;

        /**
         * Additional tags to add to this form 
         * @type {String}
         */
        this.additionalAttrHTML = additionalAttrHTML;

        /**
         * Settings for this entire form 
         * @type {Object}
         */
        this.settings = settings;

        /**
         * Settings for this submit button 
         * @type {Object}
         */
        this.submit = settings.submit;
        this.style = new style();
    }

    /**
     * Any default UI classes to add to this form 
     * @type {String}
     */


    _createClass(Form, [{
        key: 'formClasses',
        get: function get() {
            return 'row ivx-grid-row';
        }
    }, {
        key: 'beforeClasses',
        get: function get() {
            return 'ivx-input-before ivx-input-before-submit-button';
        }
    }, {
        key: 'afterClasses',
        get: function get() {
            return 'ivx-input-after ivx-input-after-submit-button';
        }

        /**
         * Renders the HTML to render the 
         * @example
         * Form.settings = {
         *     submit : {
         *         label : "My new submit label",
         *         input : {
         *            classes : "my-submit-input"
         *         },
         *         container : {
         *             classes : "my-submit-container"
         *         }
         *     }
         * };
         * 
         * //Will Render 
         * 
         * <div class="ivxjs-grid-1-1 my-submit-container">
         *     <button class="my-submit-input" type="submit">
         *          My new submit label 
         *     </button>
         * </div>
         * 
         * @type {string}
         */

    }, {
        key: 'submitButtonHTML',
        get: function get() {
            var _submit = this.submit,
                submit = _submit === undefined ? {} : _submit,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _submit$label = submit.label,
                submitLabel = _submit$label === undefined ? "Submit" : _submit$label,
                submitLabelHTML = submit.labelHTML,
                _submit$input = submit.input,
                submitInput = _submit$input === undefined ? {} : _submit$input,
                _submit$container = submit.container,
                submitContainer = _submit$container === undefined ? {} : _submit$container,
                _submit$attributes = submit.attributes,
                attributes = _submit$attributes === undefined ? '' : _submit$attributes,
                _submit$beforeHtml = submit.beforeHtml,
                beforeSettings = _submit$beforeHtml === undefined ? {} : _submit$beforeHtml,
                _submit$afterHtml = submit.afterHtml,
                afterSettings = _submit$afterHtml === undefined ? {} : _submit$afterHtml;
            var _submitInput$classes = submitInput.classes,
                submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes,
                submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

            var submitHTML = submitLabel.length >= 0 ? '\n            <div class="ivxjs-grid-1-1 ' + submitContainerClasses + '">\n                <div class="' + beforeClasses + ' ' + defaultBeforeClasses + '">' + beforeHtml + '</div>\n                <button class="' + submitInputClasses + ' ivx-input ivx-input-submit-button" type=\'submit\' ' + attributes + '>\n                    ' + submitLabel + '\n                </button>\n                <div class="' + afterClasses + ' ' + defaultAfterClasses + '">' + afterHtml + '</div>\n            </div>\n                ' : '';

            return submitHTML;
        }

        /**
         * Wraps each input's html into a container so they can be formatted correctly
         * utilizing the ivxjs.css's grid system.
         * @type{String} 
         */

    }, {
        key: 'html',
        get: function get() {
            var inputHTML = this.inputHTML,
                name = this.name,
                additionalAttrHTML = this.additionalAttrHTML,
                settings = this.settings,
                formClasses = this.formClasses;
            var _settings$submit = settings.submit,
                submit = _settings$submit === undefined ? {} : _settings$submit,
                _settings$classes = settings.classes,
                configFormClasses = _settings$classes === undefined ? '' : _settings$classes,
                formId = settings.id,
                _settings$label = settings.label,
                label = _settings$label === undefined ? '' : _settings$label,
                labelHTML = settings.labelHTML;


            if (labelHTML) label = labelHTML;

            if (!settings.hideSubmit) {
                inputHTML.push({
                    settings: submit,
                    input: {
                        type: "submit-button"
                    },
                    html: this.submitButtonHTML
                });
            }

            var contents = this.style.addWidthClasses(inputHTML);

            return '\n            ' + label + '\n            <form id="' + formId + '-form" class="' + formClasses + ' ' + configFormClasses + ' ivx-form" novalidate name="' + name + '" ' + additionalAttrHTML + '>                \n                ' + contents + '\n            </form>\n        ';
        }
    }]);

    return Form;
}();

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Anchor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = __webpack_require__(14);

var _typeParsers = __webpack_require__(7);

var _asserts = __webpack_require__(83);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeCheck = new _typeParsers.TypeValidator();

var Anchor = exports.Anchor = function () {
    function Anchor(anchorInfo) {
        _classCallCheck(this, Anchor);

        this.anchorInfo = anchorInfo;
    }

    _createClass(Anchor, [{
        key: 'anchorClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var anchorClasses = this.anchorClasses;
            var _anchorInfo = this.anchorInfo,
                _anchorInfo$href = _anchorInfo.href,
                href = _anchorInfo$href === undefined ? '' : _anchorInfo$href,
                _anchorInfo$classes = _anchorInfo.classes,
                classes = _anchorInfo$classes === undefined ? '' : _anchorInfo$classes,
                _anchorInfo$attribute = _anchorInfo.attributes,
                attributes = _anchorInfo$attribute === undefined ? {} : _anchorInfo$attribute,
                _anchorInfo$label = _anchorInfo.label,
                label = _anchorInfo$label === undefined ? labelHTML : _anchorInfo$label,
                labelHTML = _anchorInfo.labelHTML,
                _anchorInfo$id = _anchorInfo.id,
                id = _anchorInfo$id === undefined ? '' : _anchorInfo$id;

            var attributeHTML = new _attributes.AttributeTags(attributes, Object.keys(attributes)).html;

            if (!labelHTML && !label) {
                label = href;
            }

            return '\n             <a id=\'' + id + '\' class="' + classes + ' ' + anchorClasses + ' ivx-link"  href="' + href + '" ' + attributeHTML + ' >' + (labelHTML ? labelHTML : label) + '</a>           \n        ';
        }
    }]);

    return Anchor;
}();

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Buttons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

var _typeParsers = __webpack_require__(7);

var _asserts = __webpack_require__(83);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();
var typeCheck = new _typeParsers.TypeValidator();

/**
 * Renders a collection of buttons for one click recording of 
 * an input that has multiple options for data recording.
 */

var Buttons = exports.Buttons = function () {

    /**
     * Takes the settings for the buttons, a class that renders the 
     * error messages and a class that renders attributes. 
     * 
     * @param {Object} buttonsInfo - Information to create this button input 
     * @param {Array} buttonsInfo.buttons - each individual button data and settings.
     * @param {Object} buttonsInfo.settings - settings for all buttons 
     * @param {Class} buttonsInfo.errors - an error class that was created by the 
     * rendering library so the errors open and display alongside the library. 
     */
    function Buttons() {
        var buttons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var input = arguments[1];
        var errorMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _messages.ErrorMessages;

        _classCallCheck(this, Buttons);

        /**
         * Buttons to be rendered
         * @type {Array}
         */
        this.buttons = buttons;

        /**
         * Settings for all buttons in this group 
         * @type {Object}
         */
        this.input = input;

        /**
         * Error message class that will take the errors from 
         * the rendering library and adds them to this input 
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Creates attribute tags html to be added to this button 
         * inputs.
         * @type {Class}
         */
        this.attributeTags = _attributes.AttributeTags;
    }

    /**
     * Lets users add the same classes to all buttons just in 
     * case buttons share a specific class.
     * 
     * @type {String}
     */


    _createClass(Buttons, [{
        key: "buttonClasses",
        get: function get() {
            return 'ivx-input ivx-input-buttons';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-buttons';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-buttons';
        }

        /**
         * Creates the HTML for every buttons defined in the buttons array and 
         * attaches the error messages attached to this input. 
         * 
         * @example
         * buttonClasses = 'button-class';
         * buttons = [{
         *    label : "Button 1",
         *    attrHTML : "disabled",
         *    classes : "class-1"
         * },{
         *    label : "<h1>Button 2</h1>",
         *    classes " class-2"
         * }];
         * 
         * // Will render:
         * 
         * <button class="button-class class-1" disabled>Button 1</button>
         * <button class="button class class-2"><h1>Button 2</h1></button>
         * 
         * @type {String}
         */

    }, {
        key: "html",
        get: function get() {
            var _errors = this.errors,
                errorClass = _errors === undefined ? {} : _errors,
                _buttons = this.buttons,
                buttons = _buttons === undefined ? [] : _buttons,
                _input = this.input,
                input = _input === undefined ? {} : _input,
                buttonClasses = this.buttonClasses,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _errorClass$attribute = errorClass.attributes,
                attributes = _errorClass$attribute === undefined ? {} : _errorClass$attribute,
                _errorClass$errors = errorClass.errors,
                errors = _errorClass$errors === undefined ? {} : _errorClass$errors,
                _errorClass$messages = errorClass.messages,
                messages = _errorClass$messages === undefined ? {} : _errorClass$messages;

            var buttonErrorMessages = Object.keys(attributes).map(function (key, index) {
                return {
                    message: "" + errors[key],
                    attrHTML: ''
                };
            });
            var errorMessages = new this.errorMessages(buttonErrorMessages).html;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                _input$labelHTML = input.labelHTML,
                labelHTML = _input$labelHTML === undefined ? '' : _input$labelHTML,
                _input$showLabel = input.showLabel,
                showLabel = _input$showLabel === undefined ? false : _input$showLabel,
                id = input.id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;

            var buttonsHTML = buttons.reduce(function (html, button, index) {
                var label = button.label,
                    _button$attrHTML = button.attrHTML,
                    attrHTML = _button$attrHTML === undefined ? '' : _button$attrHTML,
                    _button$classes = button.classes,
                    classes = _button$classes === undefined ? "" : _button$classes,
                    buttonId = button.id,
                    value = button.value;


                var generatedId = buttonId ? buttonId : id + "-" + value;

                return html + " \n                   <button id=\"" + generatedId + "\" " + attrHTML + " class=\"" + classes + " " + buttonClasses + "\">\n                       " + label + "\n                   </button>";
            }, '');

            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            if ((labelHTML.length > 0 || label.length > 0) && showLabel) {
                labelHTML = labelHTML ? labelHTML : label;
                labelHTML = "<label class=\"ivx-input-label ivx-input-label-buttons\" for=\"" + id + "\">" + labelHTML + "</label>";
            }

            return "\n            <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n             " + labelHTML + "\n             " + buttonsHTML + "\n             " + errorMessages + " \n             <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>            \n        ";
        }
    }]);

    return Buttons;
}();

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Produces html to build a checkbox input for the  
 * various rendering libraries. 
 */

var Checkbox = exports.Checkbox = function () {

    /**
     * Sets up the checkbox's settings from a standard input data 
     * object and sets the type of error messages this class 
     * will render if the checkbox isn't valid.
     * 
     * @param {Object} inputObj - contains all the configurations 
     * to render this input.
     * @param {class} errorMessages - a class that will render the 
     * specific type of error messages based on this UI's settings.
     */
    function Checkbox() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Checkbox);

        var input = inputObj.input,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? '' : _inputObj$tags,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

        /**
         * This checkbox's input configuration 
         * @type {Object}
         */

        this.input = input;

        /**
         * Any custom tags passed down from the rendering library. 
         * @type {String}
         */
        this.tags = tags;

        /**
         * Settings for this whole input including the container
         * @type {Object}
         */
        this.settings = settings;

        /**
         * A class of errors created by the rendering library to 
         * hide and show various errors.
         * @type {class}
         */
        this.errors = errors;

        /**
         * This UI's rendering of this error messages.
         * @type {class}
         */
        this.errorMessages = errorMessages;
    }

    /**
     * Adds a default class to this checkbox input 
     * @type {String}
     */


    _createClass(Checkbox, [{
        key: "renderCheckboxContainer",


        /**
         * Renders the HTML for this checkbox from the given attributes 
         * and classes.
         * @example
         * uiClasses = "class-1";
         * input.classes = "class-2";
         * requiredAttributes = "id='id-1' name='checkbox-name' type='checkbox'"
         * // Renders To:
         * <label class="class-1 class-2">
         *     <input id='id-1' name='checkbox-name' type='checkbox'>
         * </label>
         * @return {String} - html of the fully created checkbox
         */
        value: function renderCheckboxContainer(classes, attributes) {
            var input = this.input,
                settings = this.settings;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;


            if (labelHTML) label = labelHTML;

            return "\n            <label for=\"" + id + "\" class=\"" + classes + " ivx-input-label ivx-input-label-checkbox\">\n               <input class=\"ivx-input ivx-input-checkbox\" " + attributes + ">\n               " + label + "\n            </label>\n        ";
        }
    }, {
        key: "uiClasses",
        get: function get() {
            return '';
        }

        /**
         * Any UI specific attributes
         * @type {String}
         */

    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }

        /**
         * Attributes that required for this checkbox input 
         * to be used and rendered properly.
         * @return {String} - A string of all attributes to load 
         * this input including its id, name and type.
         */

    }, {
        key: "requiredAttributes",
        get: function get() {
            var input = this.input;
            var id = input.id,
                name = input.name;


            return "id=\"" + id + "\" name=\"" + name + "\" type=\"checkbox\"";
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-checkbox';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-checkbox';
        }

        /**
         * Sets up and renders all the HTML for this checkbox based on the settings.
         * 
         * @type {String}
         */

    }, {
        key: "html",
        get: function get() {
            var tags = this.tags,
                _settings = this.settings,
                settings = _settings === undefined ? {} : _settings,
                errors = this.errors,
                input = this.input,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                requiredAttributes = this.requiredAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var id = input.id,
                name = input.name,
                _input$label2 = input.label,
                label = _input$label2 === undefined ? '' : _input$label2,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _errors = this.errors,
                _errors$messages = _errors.messages,
                messages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = _errors.attributes,
                attributes = _errors$attributes === undefined ? {} : _errors$attributes,
                _errors$tags = _errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorAttributes = attributes;
            var errorHTML = new this.errorMessages(messages).html;
            var allClasses = classes + " " + uiClasses;
            var allAttributes = requiredAttributes + " " + uiAttributes + " " + tags + " " + errorTags;
            var checkboxHTML = this.renderCheckboxContainer(allClasses, allAttributes);
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;

            var inputHTML = " \n            <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            " + checkboxHTML + "\n            " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Checkbox;
}();

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Date = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Creates a date input that will record date specific data 
 * for iVXjs.
 */

var Date = exports.Date = function () {

    /**
     * Accepts an input object with various input settings and UI specific error 
     * messages
     * @param {object} inputObj - various input settings to render this date input box
     * @param {object} inputObj.input - input specific settings for this date input 
     * @param {object} inputObj.settings - global settings for this date input 
     * @param {string} inputObj.tags - input specific attribute tags 
     * @param {class} inputObj.errors - errors from a rendering for validation and 
     * error messaging appearance.
     * @param {object} errorMessages - UI specific Error messages 
     */
    function Date() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Date);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

        /**
         * Input specific settings for this date input
         * @type {object}  
         */

        this.input = input;

        /**
         * Global input settings for this date input 
         * @type {object}
         */
        this.settings = settings;

        /**
         * Tags to be added to this date input
         * @type {String}
         */
        this.tags = tags;

        /**
         * Holds all validation error correcting.
         * @type {Class}
         */
        this.errors = errors;

        /**
         * Renders UI specific error messages by utilizing the 
         * error class passed down to keep it consistent with the 
         * current UI framework.
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Converts attribute data into attribute HTML for 
         * attributes not covered by the errors class.
         * @type {Class}
         */
        this.attributeTags = _attributes.AttributeTags;
    }

    /**
     * Default ui classes to add to all date inputs 
     * @type {String}
     */


    _createClass(Date, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }

        /**
         * Default ui attributes to add to this date input 
         * that aren't covered by the tags or errors above.
         * @type {String}
         */

    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-date';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-date';
        }

        /**
         * The HTML to render a date input based on the settings from the 
         * constructor. 
         * 
         * @example 
         * //Data 
         * input.label = "<h1>Label</h1>";
         * settings.classes = "class-1";
         * errors.tags = "required='true'";
         * Date.uiClasses = 'ui-classes-1';
         * // Renders 
         * <label>
         *      <h1>Label</h1>
         * </label>
         * <input class="class-1 ui-classes-1" type="date" required="true">
         * @type {String}
         */

    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var label = input.label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new _attributes.AttributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            <label class=\"ivx-input-label ivx-input-label-date\" for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + " ivx-input ivx-input-date\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"date\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Date;
}();

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatetimeLocal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Creates a datetime local input that will record date with timestamp specific data 
 * for iVXjs.
 */

var DatetimeLocal = exports.DatetimeLocal = function () {

    /**
    * Accepts an input object with various input settings and UI specific error 
    * messages
    * @param {object} inputObj - various input settings to render a datetime-local input box
    * @param {object} inputObj.input - input specific settings for this datetime-local input 
    * @param {object} inputObj.settings - global settings for this datetime-local input 
    * @param {string} inputObj.tags - input specific attribute tags 
    * @param {class} inputObj.errors - errors from a rendering for validation and 
    * error messaging appearance.
    * @param {object} errorMessages - UI specific Error messages
    */
    function DatetimeLocal() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, DatetimeLocal);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

        /**
         * Input specific settings for this datetime-local input
         * @type {object}  
         */

        this.input = input;

        /**
         * Global input settings for this datetime-local input 
         * @type {object}
         */
        this.settings = settings;

        /**
         * Tags to be added to this datetime-local input
         * @type {String}
         */
        this.tags = tags;

        /**
        * Holds all validation error correcting.
        * @type {Class}
        */
        this.errors = errors;

        /**
         * Renders UI specific error messages by utilizing the 
         * error class passed down to keep it consistent with the 
         * current UI framework.
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Converts attribute data into attribute HTML for 
         * attributes not covered by the errors class.
         * @type {Class}
         */
        this.attributeTags = _attributes.AttributeTags;
    }

    /**
    * Default ui classes to add to all datetime-local inputs 
    * @type {String}
    */


    _createClass(DatetimeLocal, [{
        key: "uiClasses",
        get: function get() {
            return "";
        }

        /**
         * Default ui attributes to add to this datetime-local input 
         * that aren't covered by the tags or errors above.
         * @type {String}
         */

    }, {
        key: "uiAttributes",
        get: function get() {
            return "";
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-datetime-local';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-datetime-local';
        }

        /**
        * The HTML to render a datetime-local input based on the settings from the 
        * constructor. 
        * 
        * @example 
        * //Data 
        * input.label = "<h1>Label</h1>";
        * settings.classes = "class-1";
        * errors.tags = "required='true'";
        * DatetimeLocal.uiClasses = 'ui-classes-1';
        * // Renders 
        * <label>
        *      <h1>Label</h1>
        * </label>
        * <input class="class-1 ui-classes-1" type="datetime-local" required="true">
        * @type {String}
        */

    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var label = input.label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            <label class=\"ivx-input-label ivx-input-label-datetime-local\" for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + " ivx-input ivx-input-datetime-local\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"datetime-local\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return DatetimeLocal;
}();

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Creates an email input that will record emails  
 * for iVXjs.
 */

var Email = exports.Email = function () {

    /**
     * Accepts an input object with various input settings and UI specific error 
     * messages
     * @param {object} inputObj - various input settings to render this email input box
     * @param {object} inputObj.input - input specific settings for this email input 
     * @param {object} inputObj.settings - global settings for this email input 
     * @param {string} inputObj.tags - input specific attribute tags 
     * @param {class} inputObj.errors - errors from a rendering for validation and 
     * error messaging appearance.
     * @param {object} errorMessages - UI specific Error messages 
     */
    function Email() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Email);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

        /**
         * Input specific settings for this email input
         * @type {object}  
         */

        this.input = input;

        /**
        * Input specific settings for this email input
        * @type {object}  
        */
        this.settings = settings;

        /**
         * Tags to be added to this email input
         * @type {String}
         */
        this.tags = tags;

        /**
         * Holds all validation error correcting.
         * @type {Class}
         */
        this.errors = errors;

        /**
         * Renders UI specific error messages by utilizing the 
         * error class passed down to keep it consistent with the 
         * current UI framework.
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Converts attribute data into attribute HTML for 
         * attributes not covered by the errors class.
         * @type {Class}
         */
        this.attributeTags = _attributes.AttributeTags;
    }

    /**
    * Default ui classes to add to all email inputs 
    * @type {String}
    */


    _createClass(Email, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }

        /**
        * Default ui attributes to add to this email input 
        * that aren't covered by the tags or errors above.
        * @type {String}
        */

    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-email';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-email';
        }

        /**
         * The HTML to render an email input based on the settings from the 
         * constructor. 
         * 
         * @example 
         * //Data 
         * input.label = "<h1>Label</h1>";
         * settings.classes = "class-1";
         * errors.tags = "required='true'";
         * Email.uiClasses = 'ui-classes-1';
         * // Renders 
         * <label>
         *      <h1>Label</h1>
         * </label>
         * <input class="class-1 ui-classes-1" type="email" required="true">
         * @type {String}
         */

    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            <label class=\"ivx-input-label ivx-input-label-email\" for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + " ivx-input ivx-input-email\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"email\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Email;
}();

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Number = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a number input that will record numbers  
 * for iVXjs.
 */
var Number = exports.Number = function () {

    /**
     * Accepts an input object with various input settings and UI specific error 
     * messages
     * @param {object} inputObj - various input settings to render this number input box
     * @param {object} inputObj.input - input specific settings for this number input 
     * @param {object} inputObj.settings - global settings for this number input 
     * @param {string} inputObj.tags - input specific attribute tags 
     * @param {class} inputObj.errors - errors from a rendering for validation and 
     * error messaging appearance.
     * @param {object} errorMessages - UI specific Error messages 
     */
    function Number() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Number);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

        /**
         * Input specific settings for this number input
         * @type {object}  
         */

        this.input = input;

        /**
        * Input specific settings for this number input
        * @type {object}  
        */
        this.settings = settings;

        /**
        * Tags to be added to this number input
        * @type {String}
        */
        this.tags = tags;

        /**
        * Holds all validation error correcting.
        * @type {Class}
        */
        this.errors = errors;

        /**
        * Renders UI specific error messages by utilizing the 
        * error class passed down to keep it consistent with the 
        * current UI framework.
        * @type {Class}
        */
        this.errorMessages = errorMessages;

        /**
        * Converts attribute data into attribute HTML for 
        * attributes not covered by the errors class.
        * @type {Class}
        */
        this.attributeTags = _attributes.AttributeTags;
    }

    /**
     * Default ui classes to add to all number inputs 
     * @type {String}
     */


    _createClass(Number, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }

        /**
        * Default ui attributes to add to this email input 
        * that aren't covered by the tags or errors above.
        * @type {String}
        */

    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-number';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-number';
        }

        /**
         * The HTML to render a number input based on the settings from the 
         * constructor. 
         * 
         * @example 
         * //Data 
         * input.label = "<h1>Label</h1>";
         * settings.classes = "class-1";
         * errors.tags = "required='true'";
         * Number.uiClasses = 'ui-classes-1';
         * input.attributes = {
         *     "step" : "0.1"
         * }
         * // Renders 
         * <label>
         *      <h1>Label</h1>
         * </label>
         * <input step="0.1" class="class-1 ui-classes-1" type="number" required="true">
         * @type {String}
         */

    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                labelHTML = input.labelHTML,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + " " + uiClasses;

            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;
            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n        <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            <label class=\"ivx-input-label ivx-input-label-number\" for=\"" + id + "\"> " + label + " </label>\n            <input id=\"" + id + "\" class=\"" + classes + " ivx-input ivx-input-number\"  name=\"" + name + "\"  type=\"number\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Number;
}();

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Options = exports.Options = function () {
    function Options(inputObj) {
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Options);

        var input = inputObj.input,
            _inputObj$defaultDisp = inputObj.defaultDisplay,
            defaultDisplay = _inputObj$defaultDisp === undefined ? '' : _inputObj$defaultDisp,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? '' : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.tags = tags;
        this.input = input;
        this.defaultDisplay = defaultDisplay;
        this.errors = errors;
        this.settings = settings;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Options, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-options';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-options';
        }
    }, {
        key: "html",
        get: function get() {
            var tags = this.tags,
                input = this.input,
                defaultDisplay = this.defaultDisplay,
                errors = this.errors,
                settings = this.settings,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var id = input.id,
                name = input.name,
                options = input.options,
                _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var defaultOptionTag = "<option value=\"\">Select an option...</option>";
            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (errorAttributes.required || defaultDisplay && defaultDisplay.length >= 0) {
                defaultOptionTag = defaultDisplay ? "<option value=\"\">" + defaultDisplay + "</option>" : defaultOptionTag;
            }

            if (labelHTML) label = labelHTML;

            var optionsHTML = options.reduce(function (optionHTML, option) {
                return optionHTML + "\n            <option value=\"" + option.value + "\">" + option.display + "</option>";
            }, '');

            var inputHTML = " \n             <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n             <label class=\"ivx-input-label ivx-input-label-options\" for=\"" + id + "\">" + label + "</label>             \n               <select class=\"" + classes + " ivx-input ivx-input-options\"  id=\"" + id + "\" name=\"" + name + "\"" + nonValidateAttributesHTML + " " + errorTags + " " + tags + ">\n                  " + defaultOptionTag + "\n                  " + optionsHTML + "\n               </select>\n               " + errorHTML + "\n               <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n        ";

            return "" + inputHTML;
        }
    }]);

    return Options;
}();

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Radio = exports.Radio = function () {
    function Radio(radioInputObj) {
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Radio);

        var _radioInputObj$input = radioInputObj.input,
            input = _radioInputObj$input === undefined ? {} : _radioInputObj$input,
            _radioInputObj$radios = radioInputObj.radios,
            radios = _radioInputObj$radios === undefined ? [] : _radioInputObj$radios,
            _radioInputObj$errors = radioInputObj.errors,
            errors = _radioInputObj$errors === undefined ? {} : _radioInputObj$errors,
            _radioInputObj$settin = radioInputObj.settings,
            settings = _radioInputObj$settin === undefined ? {} : _radioInputObj$settin;


        this.radios = radios;
        this.errors = errors;
        this.settings = settings;
        this.input = input;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Radio, [{
        key: "uiRadioGroup",
        value: function uiRadioGroup(radiosHTML) {
            return radiosHTML;
        }
    }, {
        key: "uiRadioButtonContainer",
        value: function uiRadioButtonContainer(radioHTML, uiClasses) {
            var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var id = this.input.id;

            var currentId = "" + id + (value.length > 0 ? '-' + value : '');

            return " \n        <label for=\"" + currentId + "\" class=\"" + uiClasses + " ivx-input-label ivx-input-label-radio\">\n        " + radioHTML + "\n        </label>";
        }
    }, {
        key: "renderRadioHTML",
        value: function renderRadioHTML(attrHTML, label, value) {
            var id = this.input.id;

            var currentId = "" + id + (value.length > 0 ? '-' + value : '');

            return " \n            <input class=\"ivx-input ivx-input-radio\" type=\"radio\" id=\"" + currentId + "\" " + attrHTML + ">\n            " + label;
        }
    }, {
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-radio';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-radio';
        }
    }, {
        key: "html",
        get: function get() {
            var errors = this.errors,
                radios = this.radios,
                settings = this.settings,
                input = this.input,
                uiClasses = this.uiClasses,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var errorMessages = errors.messages,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? "" : _errors$tags;

            var self = this;
            var inputLabel = input.label,
                inputLableHTML = input.labelHTML,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            if (inputLableHTML) inputLabel = inputLableHTML;

            var radiosHTML = radios.reduce(function (html, radio, index) {
                var label = radio.label,
                    _radio$attrHTML = radio.attrHTML,
                    attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML,
                    _radio$classes = radio.classes,
                    classes = _radio$classes === undefined ? '' : _radio$classes,
                    value = radio.value;


                attrHTML = attrHTML + " " + errorTags;

                var radioHTML = self.renderRadioHTML(attrHTML, label, input.radioButtons[index].value);

                return html + "\n            " + self.uiRadioButtonContainer(radioHTML, uiClasses + " " + classes, input.radioButtons[index].value);
            }, inputLabel);
            var errorHTML = new this.errorMessages(errorMessages).html;
            var allRadioButtonsHTML = "\n        <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n             " + radiosHTML + "\n             " + errorHTML + "\n        <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n             ";

            return this.uiRadioGroup(allRadioButtonsHTML);
        }
    }]);

    return Radio;
}();

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Text = exports.Text = function () {
    function Text() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Text);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Text, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-text';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-text';
        }
    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n                <label class=\"ivx-input-label ivx-input-label-text\" for=\"" + id + "\"> " + label + " </label>\n                <input class=\"" + classes + " ivx-input-text ivx-input\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"text\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n                " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Text;
}();

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Textarea = exports.Textarea = function () {
    function Textarea() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Textarea);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Textarea, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-textarea';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-textarea';
        }
    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            if (labelHTML) label = labelHTML;

            label = showLabel ? label : '';

            var inputHTML = " \n        <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            <label class=\"ivx-input-label ivx-input-label-textarea\" for=\"" + id + "\"> " + label + " </label>\n            <textarea class=\"" + classes + " " + uiClasses + " ivx-input ivx-input-textarea\"  id=\"" + id + "\" name=\"" + name + "\" " + uiAttributes + "   " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            </textarea>\n            " + errorHTML + "\n            <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Textarea;
}();

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(25);

var _messages = __webpack_require__(26);

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Url = exports.Url = function () {
    function Url() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Url);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Url, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "beforeClasses",
        get: function get() {
            return 'ivx-input-before ivx-input-before-url';
        }
    }, {
        key: "afterClasses",
        get: function get() {
            return 'ivx-input-after ivx-input-after-url';
        }
    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                defaultBeforeClasses = this.beforeClasses,
                defaultAfterClasses = this.afterClasses;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id,
                _input$beforeHtml = input.beforeHtml,
                beforeSettings = _input$beforeHtml === undefined ? {} : _input$beforeHtml,
                _input$afterHtml = input.afterHtml,
                afterSettings = _input$afterHtml === undefined ? {} : _input$afterHtml;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            var _beforeSettings$html = beforeSettings.html,
                beforeHtml = _beforeSettings$html === undefined ? "" : _beforeSettings$html,
                _beforeSettings$class = beforeSettings.classes,
                beforeClasses = _beforeSettings$class === undefined ? "" : _beforeSettings$class;
            var _afterSettings$html = afterSettings.html,
                afterHtml = _afterSettings$html === undefined ? "" : _afterSettings$html,
                _afterSettings$classe = afterSettings.classes,
                afterClasses = _afterSettings$classe === undefined ? "" : _afterSettings$classe;


            if (labelHTML) label = labelHTML;

            var inputHTML = " \n        <div class=\"" + beforeClasses + " " + defaultBeforeClasses + "\">" + beforeHtml + "</div>\n            <label class=\"ivx-input-label ivx-input-label-url\" for=\"" + id + "\"> " + label + " </label>\n            <input class=\"ivx-input ivx-input-url\" class=\"" + classes + " " + uiClasses + "\" " + uiAttributes + "  id=\"" + id + "\" name=\"" + name + "\"  type=\"url\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n        <div class=\"" + afterClasses + " " + defaultAfterClasses + "\">" + afterHtml + "</div>\n       ";

            return "" + inputHTML;
        }
    }]);

    return Url;
}();

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputState = exports.InputState = function () {
    function InputState(formSection, data) {
        _classCallCheck(this, InputState);

        this.formSection = formSection;
        this.data = data;
    }

    _createClass(InputState, [{
        key: 'defaultHeaderClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultFooterClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultSectionClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var formSection = this.formSection,
                data = this.data,
                defaultFooterClasses = this.defaultFooterClasses,
                defaultHeaderClasses = this.defaultHeaderClasses,
                defaultSectionClasses = this.defaultSectionClasses;
            var _data$header = data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                _data$section = data.section,
                section = _data$section === undefined ? {} : _data$section;
            var _header$classes = header.classes,
                headerClasses = _header$classes === undefined ? '' : _header$classes,
                _header$html = header.html,
                headerHTML = _header$html === undefined ? '' : _header$html;
            var _section$classes = section.classes,
                sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes,
                footerClasses = _footer$classes === undefined ? '' : _footer$classes,
                _footer$html = footer.html,
                footerHTML = _footer$html === undefined ? '' : _footer$html;


            return '\n            <section class="' + sectionClasses + ' ' + defaultSectionClasses + ' ivx-state-section ivx-state-input-section" id="' + data.id + '">\n                 <header class="' + headerClasses + ' ' + defaultHeaderClasses + ' ivx-header ivx-state-header ivx-state-input-header">' + headerHTML + '</header>\n                ' + formSection + '\n                <footer class="' + footerClasses + ' ' + defaultFooterClasses + ' ivx-footer ivx-state-footer ivx-state-input-footer">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return InputState;
}();

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoState = exports.VideoState = function () {
    function VideoState(playerSection, data) {
        _classCallCheck(this, VideoState);

        this.playerSection = playerSection;
        this.data = data;
    }

    _createClass(VideoState, [{
        key: 'iPhoneInlineClasses',
        get: function get() {
            var _data$isIphone = this.data.isIphone,
                isIphone = _data$isIphone === undefined ? false : _data$isIphone;


            return isIphone ? 'iphone-inline' : '';
        }
    }, {
        key: 'html',
        get: function get() {
            var _playerSection = this.playerSection,
                playerSection = _playerSection === undefined ? '' : _playerSection,
                _data = this.data,
                data = _data === undefined ? { name: '' } : _data;
            var _data$header = data.header,
                headerSettings = _data$header === undefined ? {} : _data$header,
                _data$footer = data.footer,
                footerSettings = _data$footer === undefined ? {} : _data$footer,
                _data$section = data.section,
                sectionSettings = _data$section === undefined ? {} : _data$section;
            var _headerSettings$class = headerSettings.classes,
                headerClasses = _headerSettings$class === undefined ? '' : _headerSettings$class,
                _headerSettings$html = headerSettings.html,
                headerHTML = _headerSettings$html === undefined ? '' : _headerSettings$html;
            var _sectionSettings$clas = sectionSettings.classes,
                sectionClasses = _sectionSettings$clas === undefined ? '' : _sectionSettings$clas;
            var _footerSettings$class = footerSettings.classes,
                footerClasses = _footerSettings$class === undefined ? '' : _footerSettings$class,
                _footerSettings$html = footerSettings.html,
                footerHTML = _footerSettings$html === undefined ? '' : _footerSettings$html;


            return '\n            <section class="' + sectionClasses + ' ivx-state-section ivx-state-video-section" id="' + data.id + '">\n                <header class="' + headerClasses + ' ivx-state-header ivx-state-video-header">' + headerHTML + '</header>\n                ' + playerSection + '\n                <footer class="' + footerClasses + ' ivx-state-footer ivx-state-video-footer">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return VideoState;
}();

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationState = exports.NavigationState = function () {
    function NavigationState(data, linkSection) {
        _classCallCheck(this, NavigationState);

        this.data = data;
        this.linkSection = linkSection;
    }

    _createClass(NavigationState, [{
        key: 'defaultHeaderClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultFooterClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultSectionClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultLinkContainerClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var data = this.data,
                linkSection = this.linkSection,
                defaultFooterClasses = this.defaultFooterClasses,
                defaultHeaderClasses = this.defaultHeaderClasses,
                defaultSectionClasses = this.defaultSectionClasses,
                defaultLinkContainerClasses = this.defaultLinkContainerClasses;
            var _data$header = data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                _data$section = data.section,
                section = _data$section === undefined ? {} : _data$section,
                _data$linkContainer = data.linkContainer,
                linkContainer = _data$linkContainer === undefined ? {} : _data$linkContainer;
            var _header$classes = header.classes,
                headerClasses = _header$classes === undefined ? '' : _header$classes,
                _header$html = header.html,
                headerHTML = _header$html === undefined ? '' : _header$html;
            var _section$classes = section.classes,
                sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes,
                footerClasses = _footer$classes === undefined ? '' : _footer$classes,
                _footer$html = footer.html,
                footerHTML = _footer$html === undefined ? '' : _footer$html;
            var _linkContainer$classe = linkContainer.classes,
                linkContainerClasses = _linkContainer$classe === undefined ? '' : _linkContainer$classe,
                _linkContainer$attrib = linkContainer.attributes,
                linkContainerAttributes = _linkContainer$attrib === undefined ? {} : _linkContainer$attrib;

            var linkContainerAttributeHTML = new _attributes.AttributeTags(linkContainerAttributes, Object.keys(linkContainerAttributes)).html;

            return '\n            <section class="' + sectionClasses + ' ' + defaultSectionClasses + ' ivx-state-section ivx-state-navigation-section" id="' + data.id + '">\n                 <header class="' + headerClasses + ' ' + defaultHeaderClasses + ' ivx-state-header ivx-state-navigation-header">' + headerHTML + '</header>\n                 <div class=\'' + defaultLinkContainerClasses + ' ' + linkContainerClasses + ' ivx-navigation-state-links-container\' ' + linkContainerAttributeHTML + '>\n                    ' + linkSection + '\n                </div>\n                <footer class="' + footerClasses + ' ' + defaultFooterClasses + ' ivx-state-footer ivx-state-navigation-footer">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return NavigationState;
}();

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(198);

var _element = __webpack_require__(200);

var _element2 = _interopRequireDefault(_element);

var _element3 = __webpack_require__(57);

var _element4 = _interopRequireDefault(_element3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Controls) {
    _inherits(_class, _Controls);

    function _class(container, playerId) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, playerId));

        if (container.html instanceof Function) {
            container.html(_this.html);
        } else {
            var div = document.createElement('div');

            div.innerHTML = _this.html;
            div.className = "ivx-video-controls-container-standard";

            container.appendChild(div);
        }

        var modifiedContainer = new _element4.default(container);

        var playPauseControlsClasses = _this.playPauseControlsClasses,
            totalTimeInfoClasses = _this.totalTimeInfoClasses,
            currentTimeInfoClasses = _this.currentTimeInfoClasses,
            scrubBarClasses = _this.scrubBarClasses,
            muteControlsClasses = _this.muteControlsClasses,
            volumeBarClasses = _this.volumeBarClasses;


        _this.container = modifiedContainer.element;
        _this.containerEl = modifiedContainer;
        _this.playPauseControls = document.getElementById(playerId + "-video-controls-play-pause");
        _this.totalTimeInfo = document.getElementById(playerId + "-video-controls-total-time");
        _this.currentTimeInfo = document.getElementById(playerId + "-video-controls-current-time");
        _this.scrubBar = document.getElementById(playerId + "-video-controls-scrub-bar");
        _this.muteControls = document.getElementById(playerId + "-video-controls-mute-controls");
        _this.volumeBar = document.getElementById(playerId + "-video-controls-volume-bar");
        return _this;
    }

    _createClass(_class, [{
        key: "createPlayerSpecificControls",
        value: function createPlayerSpecificControls(opts) {
            var player = opts.player;
            var _player$textTracks = player.textTracks,
                textTracks = _player$textTracks === undefined ? [] : _player$textTracks;

            var html = "";
            var container = this.container,
                chapterButtonClasses = this.chapterButtonClasses,
                chapterListClasses = this.chapterListClasses;


            if (textTracks.length > 0) {
                var chapterElement = this.createChapterContainer(textTracks);
                var trackSelectElement = this.createTrackSelect(textTracks);

                if (chapterElement) {
                    _element2.default.append(container, chapterElement);
                }

                if (trackSelectElement) {
                    _element2.default.append(container, trackSelectElement);
                }
            }
        }
    }, {
        key: "getTrackArray",
        value: function getTrackArray() {
            var player = this.player;
            var textTracks = player.textTracks;

            var trackArray = Array.from(textTracks);

            return trackArray;
        }
    }, {
        key: "isLanguageTrack",
        value: function isLanguageTrack(track, trackId) {
            var testTrackId = track.trackId,
                kind = track.kind;


            return testTrackId === trackId && (kind === 'captions' || kind === 'subtitles');
        }
    }, {
        key: "getTrack",
        value: function getTrack(trackId, predicate) {
            var self = this;
            var trackArray = this.getTrackArray();

            return trackArray.find(function (currentTrack) {
                var currentTrackId = currentTrack.trackId;


                return predicate ? predicate(currentTrack, trackId) : self.isLanguageTrack(currentTrack, trackId);
            });
        }
    }, {
        key: "updateTrackSelector",
        value: function updateTrackSelector(trackId) {
            var trackListSelectContainerClasses = this.trackListSelectContainerClasses,
                trackListSelectClasses = this.trackListSelectClasses,
                trackListSelectActiveClasses = this.trackListSelectActiveClasses,
                trackListSelectInactiveClasses = this.trackListSelectInactiveClasses,
                closeCaptionButtonIconContent = this.closeCaptionButtonIconContent,
                player = this.player,
                closeCaptionButtonClasses = this.closeCaptionButtonClasses,
                closeCaptionButtonActiveClasses = this.closeCaptionButtonActiveClasses,
                closeCaptionButtonInactiveClasses = this.closeCaptionButtonInactiveClasses,
                closeCaptionButtonIconClasses = this.closeCaptionButtonIconClasses;
            var _trackListSelect = this.trackListSelect,
                trackListSelect = _trackListSelect === undefined ? {} : _trackListSelect,
                _ccToggle = this.ccToggle,
                ccToggle = _ccToggle === undefined ? {} : _ccToggle;

            var selectedLanguageTrack = this.getTrack(trackId);
            var _trackListSelect$chil = trackListSelect.childNodes,
                options = _trackListSelect$chil === undefined ? [] : _trackListSelect$chil;


            if (options.length > 1) {
                var hasOption = Array.from(options).find(function (option) {
                    var currentTrackId = option.value;


                    return trackId === currentTrackId;
                });

                if (hasOption) {
                    Object.assign(trackListSelect, {
                        value: trackId
                    });

                    _element2.default.removeClassesFromElement(trackListSelect, trackListSelectInactiveClasses);
                    _element2.default.addClassesToElement(trackListSelect, trackListSelectActiveClasses);
                } else {
                    _element2.default.removeClassesFromElement(trackListSelect, trackListSelectActiveClasses);
                    _element2.default.addClassesToElement(trackListSelect, trackListSelectInactiveClasses);
                }
            }

            if (selectedLanguageTrack) {
                _element2.default.removeClassesFromElement(ccToggle, closeCaptionButtonInactiveClasses);
                _element2.default.addClassesToElement(ccToggle, closeCaptionButtonActiveClasses);
            } else {
                _element2.default.removeClassesFromElement(ccToggle, closeCaptionButtonActiveClasses);
                _element2.default.addClassesToElement(ccToggle, closeCaptionButtonInactiveClasses);
            }
        }
    }, {
        key: "createTrackSelect",
        value: function createTrackSelect(textTracks) {
            var self = this;
            var trackListSelectContainerClasses = self.trackListSelectContainerClasses,
                trackListSelectClasses = self.trackListSelectClasses,
                trackListSelectActiveClasses = self.trackListSelectActiveClasses,
                trackListSelectInactiveClasses = self.trackListSelectInactiveClasses,
                closeCaptionButtonIconContent = self.closeCaptionButtonIconContent,
                closeCaptionButtonClasses = self.closeCaptionButtonClasses,
                closeCaptionButtonActiveClasses = self.closeCaptionButtonActiveClasses,
                closeCaptionButtonInactiveClasses = self.closeCaptionButtonInactiveClasses,
                closeCaptionButtonIconClasses = self.closeCaptionButtonIconClasses;

            var languageTracks = Array.from(textTracks).reduce(function (currentLanguageTracks, textTrack) {
                if (textTrack.kind === 'captions' || textTrack.kind === 'subtitles') {
                    currentLanguageTracks = currentLanguageTracks.concat([textTrack]);
                }

                return currentLanguageTracks;
            }, []);

            if (languageTracks.length > 0) {
                var trackListContainer = document.createElement('div');
                var trackListSelect = document.createElement('select');
                var languageSelected = false;
                var ccToggle = document.createElement('button');
                var ccToggleIcon = document.createElement('i');

                trackListContainer.setAttribute('id', self.playerId + "-track-list");
                ccToggle.setAttribute('id', self.playerId + "-cc-toggle");

                _element2.default.addClassesToElement(ccToggle, closeCaptionButtonClasses);
                _element2.default.addClassesToElement(ccToggleIcon, closeCaptionButtonIconClasses);

                ccToggleIcon.innerHTML = closeCaptionButtonIconContent;

                _element2.default.append(ccToggle, ccToggleIcon);

                languageTracks.forEach(function (languageTrack) {
                    var srclang = languageTrack.srclang,
                        label = languageTrack.label,
                        trackId = languageTrack.trackId,
                        mode = languageTrack.mode;

                    var languageTrackOption = document.createElement('option');

                    Object.assign(languageTrackOption, {
                        value: trackId,
                        innerHTML: label && label.length > 0 ? label : srclang
                    });

                    trackListSelect.appendChild(languageTrackOption);

                    if (mode === 'showing') {
                        Object.assign(trackListSelect, {
                            value: trackId
                        });
                        languageSelected = true;
                    }
                });

                trackListSelect.addEventListener('change', function (evt) {
                    var _evt$target = evt.target,
                        target = _evt$target === undefined ? {} : _evt$target;
                    var _target$value = target.value,
                        trackId = _target$value === undefined ? "" : _target$value;


                    self.changeCurrentTrack(trackId);
                });

                ccToggle.addEventListener('click', function (evt) {
                    self.toggleCC();
                });

                this.ccToggle = ccToggle;

                _element2.default.addClassesToElement(trackListSelect, trackListSelectClasses);
                _element2.default.addClassesToElement(trackListSelect, languageSelected ? trackListSelectActiveClasses : trackListSelectInactiveClasses);
                _element2.default.addClassesToElement(trackListContainer, trackListSelectContainerClasses);
                _element2.default.addClassesToElement(ccToggle, languageSelected ? closeCaptionButtonActiveClasses : closeCaptionButtonInactiveClasses);
                _element2.default.append(trackListContainer, ccToggle);

                if (languageTracks.length > 1) {
                    _element2.default.append(trackListContainer, trackListSelect);

                    this.trackListSelect = trackListSelect;
                } else {
                    this.languageSelected = languageTracks[0].trackId;
                }

                return trackListContainer;
            }

            return false;
        }
    }, {
        key: "toggleCC",
        value: function toggleCC() {
            var trackListSelectContainerClasses = this.trackListSelectContainerClasses,
                trackListSelectClasses = this.trackListSelectClasses,
                trackListSelectActiveClasses = this.trackListSelectActiveClasses,
                trackListSelectInactiveClasses = this.trackListSelectInactiveClasses,
                closeCaptionButtonIconContent = this.closeCaptionButtonIconContent,
                closeCaptionButtonClasses = this.closeCaptionButtonClasses,
                closeCaptionButtonActiveClasses = this.closeCaptionButtonActiveClasses,
                closeCaptionButtonInactiveClasses = this.closeCaptionButtonInactiveClasses,
                closeCaptionButtonIconClasses = this.closeCaptionButtonIconClasses;
            var trackListSelect = this.trackListSelect,
                _ccToggle2 = this.ccToggle,
                ccToggle = _ccToggle2 === undefined ? {} : _ccToggle2,
                languageSelected = this.languageSelected;


            var isInactive = _element2.default.hasClass(ccToggle, closeCaptionButtonInactiveClasses);

            if (isInactive) {
                _element2.default.removeClassesFromElement(ccToggle, closeCaptionButtonInactiveClasses);
                _element2.default.addClassesToElement(ccToggle, closeCaptionButtonActiveClasses);

                if (trackListSelect) {
                    var trackId = trackListSelect.value;


                    _element2.default.addClassesToElement(trackListSelect, trackListSelectActiveClasses);
                    _element2.default.removeClassesFromElement(trackListSelect, trackListSelectInactiveClasses);
                    this.changeCurrentTrack(trackId);
                } else {
                    this.changeCurrentTrack(languageSelected);
                }
            } else {
                _element2.default.removeClassesFromElement(ccToggle, closeCaptionButtonActiveClasses);
                _element2.default.addClassesToElement(ccToggle, closeCaptionButtonInactiveClasses);

                if (trackListSelect) {
                    _element2.default.removeClassesFromElement(trackListSelect, trackListSelectActiveClasses);
                    _element2.default.addClassesToElement(trackListSelect, trackListSelectInactiveClasses);
                }

                this.changeCurrentTrack("");
            }
        }
    }, {
        key: "createChapterContainer",
        value: function createChapterContainer(textTracks) {
            var chapterButtonClasses = this.chapterButtonClasses,
                chapterListClasses = this.chapterListClasses,
                chapterActiveClasses = this.chapterActiveClasses,
                chapterInActiveClasses = this.chapterInActiveClasses,
                chapterListItemClasses = this.chapterListItemClasses,
                playerId = this.playerId;

            var chapterTrack = Array.from(textTracks).find(function (textTrack) {
                return textTrack.kind === 'chapters';
            });
            var self = this;

            if (chapterTrack) {
                var chapterListEl = document.createElement('ol');

                chapterListEl.setAttribute('id', this.playerId + "-chapter-list");

                var _chapterTrack$cues = chapterTrack.cues,
                    cues = _chapterTrack$cues === undefined ? [] : _chapterTrack$cues;


                Array.from(cues).forEach(function (cue, index) {
                    var id = cue.id,
                        text = cue.text,
                        startTime = cue.startTime;

                    var chapterContainerEl = document.createElement('li');
                    var chapterButtonEl = document.createElement('button');

                    chapterButtonEl.id = id + "-select";
                    chapterButtonEl.className = chapterButtonClasses;
                    chapterButtonEl.innerHTML = text;

                    _element2.default.append(chapterContainerEl, chapterButtonEl);

                    chapterContainerEl.id = id + "-chapter-seclect-container";
                    chapterContainerEl.className = chapterListItemClasses + " " + (index === 0 ? chapterActiveClasses : chapterInActiveClasses);

                    _element2.default.append(chapterListEl, chapterContainerEl);

                    chapterButtonEl.addEventListener('click', function () {
                        self.seek(startTime);
                        self.play();
                    });
                });

                chapterListEl.className = chapterListClasses;

                return chapterListEl;
            }

            return false;
        }
    }, {
        key: "playPauseControlsClasses",
        get: function get() {
            return 'play-pause ivx-video-controls-play-pause';
        }
    }, {
        key: "totalTimeInfoClasses",
        get: function get() {
            return 'duration ivx-video-controls-timestamp-duration';
        }
    }, {
        key: "currentTimeInfoClasses",
        get: function get() {
            return 'current-time ivx-video-controls-timestamp-current-time';
        }
    }, {
        key: "scrubBarClasses",
        get: function get() {
            return 'scrub-bar ivx-video-controls-scrub-bar';
        }
    }, {
        key: "muteControlsClasses",
        get: function get() {
            return 'mute ivx-video-controls-mute';
        }
    }, {
        key: "volumeBarClasses",
        get: function get() {
            return 'volume-bar ivx-video-controls-volume-bar';
        }
    }, {
        key: "playClasses",
        get: function get() {
            return 'fa fa-play ivx-video-controls-play-icon ivx-icon';
        }
    }, {
        key: "pauseClasses",
        get: function get() {
            return 'fa fa-pause ivx-video-controls-pause-icon ivx-icon';
        }
    }, {
        key: "unmuteClasses",
        get: function get() {
            return 'fa fa-volume-up ivx-video-controls-unmute-icon ivx-icon';
        }
    }, {
        key: "muteClasses",
        get: function get() {
            return 'fa fa-volume-off ivx-video-controls-mute-icon ivx-icon';
        }
    }, {
        key: "scrubBarTimeLapseClasses",
        get: function get() {
            return "time-lapsed ivx-video-controls-scrub-bar-timelapse";
        }
    }, {
        key: "volumeBarCurrentVolumeClasses",
        get: function get() {
            return 'current-volume ivx-video-controls-volume-bar-volume';
        }
    }, {
        key: "chapterButtonClasses",
        get: function get() {
            return 'chapter-button ivx-video-controls-chapters-item-control';
        }
    }, {
        key: "chapterListClasses",
        get: function get() {
            return "chapter-list ivx-video-controls-chapters";
        }
    }, {
        key: "chapterListItemClasses",
        get: function get() {
            return "chapter-list-item ivx-video-controls-chapters-item";
        }
    }, {
        key: "chapterActiveClasses",
        get: function get() {
            return "active ivx-video-controls-chapter-active";
        }
    }, {
        key: "chapterInActiveClasses",
        get: function get() {
            return "inactive ivx-video-controls-chapter-inactive";
        }
    }, {
        key: "playPauseButtonHTML",
        get: function get() {
            var play = this.playClasses,
                playerId = this.playerId;
            var playPauseControls = this.playPauseControlsClasses;

            return "\n        <button id=\"" + playerId + "-video-controls-play-pause\" class=\"" + playPauseControls + "\">\n            <i class='" + play + "'></i>\n        </button>";
        }
    }, {
        key: "scrubBarHTML",
        get: function get() {
            var playerId = this.playerId;

            return "\n             <div id=\"" + playerId + "-video-controls-scrub-bar\" class=\"" + this.scrubBarClasses + "\">\n                <div class=\"" + this.scrubBarTimeLapseClasses + "\"></div>\n            </div>\n        ";
        }
    }, {
        key: "timestampHTML",
        get: function get() {
            var playerId = this.playerId;

            return "\n        <span id=\"" + playerId + "-video-controls-current-time\" class=\"" + this.currentTimeInfoClasses + "\"></span>\n        <span id=\"" + playerId + "-video-controls-total-time\" class=\"" + this.totalTimeInfoClasses + "\"></span>\n        ";
        }
    }, {
        key: "muteButtonHTML",
        get: function get() {
            var unmute = this.unmuteClasses,
                muteControlsClasses = this.muteControlsClasses,
                playerId = this.playerId;

            return "\n            <button id=\"" + playerId + "-video-controls-mute-controls\" class=\"" + muteControlsClasses + "\">\n                <i class=\"" + unmute + "\"></i>\n            </button>\n        ";
        }
    }, {
        key: "volumeBarHTML",
        get: function get() {
            var playerId = this.playerId;

            return "\n            <div  id=\"" + playerId + "-video-controls-volume-bar\" class=\"" + this.volumeBarClasses + "\">\n                <div class=\"" + this.volumeBarCurrentVolumeClasses + "\"></div>\n            </div> \n        ";
        }
    }, {
        key: "trackListSelectContainerClasses",
        get: function get() {
            return 'track-list-select-container ivx-video-controls-tracks';
        }
    }, {
        key: "trackListSelectClasses",
        get: function get() {
            return 'track-list-select ivx-video-controls-tracks-select';
        }
    }, {
        key: "trackListSelectActiveClasses",
        get: function get() {
            return 'active ivx-video-controls-tracks-select-on';
        }
    }, {
        key: "trackListSelectInactiveClasses",
        get: function get() {
            return 'inactive ivx-video-controls-tracks-select-off';
        }
    }, {
        key: "closeCaptionButtonClasses",
        get: function get() {
            return 'close-caption-button ivx-video-controls-tracks-toggle';
        }
    }, {
        key: "closeCaptionButtonActiveClasses",
        get: function get() {
            return 'active ivx-video-controls-tracks-on';
        }
    }, {
        key: "closeCaptionButtonInactiveClasses",
        get: function get() {
            return 'inactive ivx-video-controls-tracks-off';
        }
    }, {
        key: "closeCaptionButtonIconClasses",
        get: function get() {
            return 'close-caption-button-icon fa fa-cc ivx-video-controls-tracks-toggle-icon ivx-icon';
        }
    }, {
        key: "closeCaptionButtonIconContent",
        get: function get() {
            return "";
        }
    }, {
        key: "html",
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML,
                scrubBarHTML = this.scrubBarHTML,
                timestampHTML = this.timestampHTML,
                muteButtonHTML = this.muteButtonHTML,
                volumeBarHTML = this.volumeBarHTML;

            return "\n           " + playPauseButtonHTML + "\n           " + scrubBarHTML + "\n           " + timestampHTML + "\n           " + muteButtonHTML + "\n           " + volumeBarHTML + "                        \n        ";
        }
    }]);

    return _class;
}(_index.Controls);

exports.default = _class;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(199);

var _events2 = _interopRequireDefault(_events);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _videoClasses = __webpack_require__(52);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

var _tracksEvents = __webpack_require__(65);

var _tracksEvents2 = _interopRequireDefault(_tracksEvents);

var _tracksCuesEvents = __webpack_require__(66);

var _tracksCuesEvents2 = _interopRequireDefault(_tracksCuesEvents);

var _element = __webpack_require__(57);

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = exports.Controls = function (_ControlEvents) {
    _inherits(Controls, _ControlEvents);

    function Controls(playerId) {
        _classCallCheck(this, Controls);

        var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, playerId));

        Object.assign(_this, {
            playerId: playerId,
            currentVolume: 0.5,
            controlEventNames: new _videoEvents2.default(),
            trackEventNames: new _tracksEvents2.default(),
            trackCuesEventName: new _tracksCuesEvents2.default(),
            videoClassNames: new _videoClasses2.default()
        });
        return _this;
    }

    _createClass(Controls, [{
        key: "dispose",
        value: function dispose(iVXjsBus) {
            iVXjsBus.removeListener(this.controlEventNames.TIME_UPDATE, this.updateTime);
            iVXjsBus.removeListener(this.controlEventNames.PLAYING, this.whilePlaying);
            iVXjsBus.removeListener(this.controlEventNames.PAUSED, this.whilePaused);
            iVXjsBus.removeListener(this.controlEventNames.CAN_PLAY, this.canPlayCallback);
            iVXjsBus.removeListener(this.controlEventNames.MUTE, this.whileMuted);
            iVXjsBus.removeListener(this.controlEventNames.UNMUTE, this.whileUnmuted);
            iVXjsBus.removeListener(this.controlEventNames.SET_VOLUME, this.whileSetVolume);
            iVXjsBus.removeListener(this.controlEventNames.BUFFERING, this.seekingCallback);
            iVXjsBus.removeListener(this.trackCuesEventName.ON_CHAPTER_START, this.chapterChange);
            iVXjsBus.removeListener(this.trackEventNames.CHANGE_CURRENT_TRACK, this.trackChange);
        }
    }, {
        key: "getAbsolutePosition",
        value: function getAbsolutePosition(element) {
            var relativePosition = { x: element.offsetLeft, y: element.offsetTop };

            if (element.offsetParent) {
                var tempPosition = this.getAbsolutePosition(element.offsetParent);

                relativePosition.x += tempPosition.x;
                relativePosition.y += tempPosition.y;
            }

            return relativePosition;
        }
    }, {
        key: "adjustVolume",
        value: function adjustVolume(event) {
            var volumeBar = this.volumeBar,
                muteControls = this.muteControls,
                currentVolume = this.currentVolume,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses,
                unmuteClasses = this.unmuteClasses,
                muteClasses = this.muteClasses;
            var width = volumeBar.offsetWidth;

            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);
            var absolutePosition = this.getAbsolutePosition(volumeBar);
            var absoluteX = absolutePosition.x;
            var x = event.pageX;

            var trueX = x - absoluteX;
            var volumeLevel = trueX / width;
            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);

            muteIcon.className = unmuteClasses;
            currentVolumeSpan.style.width = volumeLevel * 100 + "%";

            this.currentVolume = volumeLevel;
            this.sendUnmute();
            this.setVolume(volumeLevel);
        }
    }, {
        key: "scrub",
        value: function scrub(event) {
            var currentTimeInfo = this.currentTimeInfo,
                scrubBar = this.scrubBar,
                scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses,
                videoClassNames = this.videoClassNames;
            var width = scrubBar.offsetWidth;

            var absolutePosition = this.getAbsolutePosition(scrubBar);
            var absoluteX = absolutePosition.x;
            var x = event.pageX;

            var trueX = x - absoluteX;
            var scrubToTime = this.duration * (trueX / width);
            var currentTimeObject = this.convertSecondsToParts(scrubToTime);
            var currentTimeStamp = this.createTimeStamp(currentTimeObject);
            var searchClasses = [scrubBarTimeLapseClasses];
            var timelapsed = this.getElementByClasses(scrubBar.children, searchClasses);

            currentTimeInfo.innerHTML = "" + currentTimeStamp;
            timelapsed.style.width = trueX / width * 100 + "%";

            this.seek(scrubToTime);
        }
    }, {
        key: "togglePlayPause",
        value: function togglePlayPause(event) {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            switch (playPauseIcon.className) {
                case playClasses:
                    this.setPlay();
                    break;
                case pauseClasses:
                    this.setPause();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "setPlay",
        value: function setPlay() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses,
                videoClassNames = this.videoClassNames;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = pauseClasses;
            this.containerEl.removeClass(videoClassNames.SEEKING);
            this.containerEl.addClass(videoClassNames.PLAYING);
            this.containerEl.removeClass(videoClassNames.PAUSED);
            this.play();
        }
    }, {
        key: "setPause",
        value: function setPause() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses,
                videoClassNames = this.videoClassNames;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = playClasses;

            this.containerEl.removeClass(videoClassNames.SEEKING);
            this.containerEl.removeClass(videoClassNames.PLAYING);
            this.containerEl.addClass(videoClassNames.PAUSED);
            this.pause();
        }
    }, {
        key: "toggleMute",
        value: function toggleMute(event) {
            var muteControls = this.muteControls,
                muteClasses = this.muteClasses,
                unmuteClasses = this.unmuteClasses,
                volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            switch (muteIcon.className) {
                case unmuteClasses:
                    this.sendMute();
                    break;
                case muteClasses:
                    this.sendUnmute();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "mute",
        value: function mute() {
            var muteControls = this.muteControls,
                muteClasses = this.muteClasses,
                unmuteClasses = this.unmuteClasses,
                volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses,
                videoClassNames = this.videoClassNames;

            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            this.containerEl.removeClass(videoClassNames.UNMUTED);
            this.containerEl.addClass(videoClassNames.MUTED);

            muteIcon.className = muteClasses;
            currentVolumeSpan.style.width = "0%";
            this.muted = true;
        }
    }, {
        key: "unmute",
        value: function unmute() {
            var muteControls = this.muteControls,
                muteClasses = this.muteClasses,
                unmuteClasses = this.unmuteClasses,
                volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses,
                videoClassNames = this.videoClassNames;

            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            muteIcon.className = unmuteClasses;
            currentVolumeSpan.style.width = this.currentVolume * 100 + "%";

            this.containerEl.removeClass(videoClassNames.MUTED);
            this.containerEl.addClass(videoClassNames.UNMUTED);

            this.muted = false;
        }
    }, {
        key: "setVolumeBar",
        value: function setVolumeBar(volume) {
            if (this.muted) return;

            var muteControls = this.muteControls,
                muteClasses = this.muteClasses,
                unmuteClasses = this.unmuteClasses,
                volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            if (volume) this.currentVolume = volume;

            currentVolumeSpan.style.width = volume * 100 + "%";
        }
    }, {
        key: "onReadyToPlay",
        value: function onReadyToPlay(player) {
            var volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var self = this;
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            if (currentVolumeSpan && !this.muted) {
                currentVolumeSpan.style.width = self.currentVolume * 100 + "%";
            }

            this.setVolume(self.currentVolume);
            this.getDuration(function (duration) {
                var totalTimeInfo = self.totalTimeInfo,
                    currentTimeInfo = self.currentTimeInfo,
                    scrubBar = self.scrubBar;

                var durationTimeObject = self.convertSecondsToParts(duration);
                var durationTimeStamp = self.createTimeStamp(durationTimeObject);

                self.duration = duration;

                if (totalTimeInfo) totalTimeInfo.innerHTML = "/" + durationTimeStamp;
                if (currentTimeInfo) currentTimeInfo.innerHTML = "00:00";
                if (scrubBar) scrubBar.children[0].style.width = "0%";
            });
        }
    }, {
        key: "onTimeUpdate",
        value: function onTimeUpdate(player) {
            var currentTimeInfo = this.currentTimeInfo,
                scrubBar = this.scrubBar,
                scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
            var seconds = player.currentTime;


            seconds = seconds > this.duration ? 0 : seconds;

            var currentTimeObject = this.convertSecondsToParts(seconds);
            var currentTimeStamp = this.createTimeStamp(currentTimeObject);
            var timeLapsed = seconds / this.duration;

            if (currentTimeInfo) currentTimeInfo.innerHTML = "" + currentTimeStamp;

            var searchClasses = [scrubBarTimeLapseClasses];

            if (scrubBar) {
                var timelapsedElement = this.getElementByClasses(scrubBar.children, searchClasses);

                timelapsedElement.style.width = timeLapsed * 100 + "%";
            }
        }
    }, {
        key: "onPlaying",
        value: function onPlaying() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses,
                videoClassNames = this.videoClassNames;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            this.containerEl.removeClass(videoClassNames.SEEKING);
            this.containerEl.removeClass(videoClassNames.PAUSED);
            this.containerEl.addClass(videoClassNames.PLAYING);

            playPauseIcon.className = pauseClasses;
        }
    }, {
        key: "onPaused",
        value: function onPaused() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses,
                videoClassNames = this.videoClassNames;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            this.containerEl.removeClass(videoClassNames.SEEKING);
            this.containerEl.removeClass(videoClassNames.PLAYING);
            this.containerEl.addClass(videoClassNames.PAUSED);

            playPauseIcon.className = playClasses;
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners(iVXjsBus) {
            var _this2 = this;

            var self = this;
            var scrubBar = this.scrubBar,
                volumeBar = this.volumeBar,
                playPauseControls = this.playPauseControls,
                muteControls = this.muteControls,
                trackCuesEventName = this.trackCuesEventName,
                videoClassNames = this.videoClassNames;


            this.iVXjsBus = iVXjsBus;
            this.updateTime = iVXjsBus.on(this.controlEventNames.TIME_UPDATE, function (player) {
                updateTime(player);
            });
            this.whilePaused = iVXjsBus.on(this.controlEventNames.PAUSED, whilePaused);
            this.whilePlaying = iVXjsBus.on(this.controlEventNames.PLAYING, whilePlaying);
            this.canPlayCallback = iVXjsBus.on(this.controlEventNames.CAN_PLAY, canPlayCallBack);
            this.seekingCallback = iVXjsBus.on(this.controlEventNames.BUFFERING, seekingCallback);
            this.whileMuted = iVXjsBus.on(this.controlEventNames.MUTE, mute);
            this.whileUnmuted = iVXjsBus.on(this.controlEventNames.UNMUTE, unmute);
            this.whileSetVolume = iVXjsBus.on(this.controlEventNames.SET_VOLUME, setVolume);
            this.chapterChange = iVXjsBus.on(this.trackCuesEventName.ON_CHAPTER_START, chapterChange);
            this.trackChange = iVXjsBus.on(this.trackEventNames.CHANGE_CURRENT_TRACK, trackChange);
            this.updateTime = this.updateTime ? this.updateTime : updateTime;

            volumeBar.addEventListener('mousedown', function (event) {
                self.adjustVolume(event);
            });
            scrubBar.addEventListener('click', function (event) {
                self.scrub(event);
            });
            playPauseControls.addEventListener('mouseup', function (event) {
                self.togglePlayPause(event);
            });
            muteControls.addEventListener('click', function (event) {
                self.toggleMute(event);
            });

            self.containerEl.addClass(videoClassNames.SEEKING);

            var canPlayListener = this.iVXjsBus.on(this.controlEventNames.CAN_PLAY, function (player) {
                if (player.id === self.playerId) {
                    self.createPlayerSpecificControls({ player: player });
                    self.player = player;
                    self.iVXjsBus.removeListener(_this2.controlEventNames.CAN_PLAY, canPlayListener);

                    self.containerEl.removeClass(videoClassNames.SEEKING);
                    self.containerEl.addClass(videoClassNames.PAUSED);
                    self.containerEl.addClass(videoClassNames.UNMUTED);
                }
            });

            function seekingCallback() {

                self.containerEl.addClass(videoClassNames.SEEKING);
            }

            function chapterChange() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var cue = args.cue,
                    playerId = args.playerId;


                if (!playerId || playerId === self.playerId) changeChapter();
                if (playerId === self.playerId) changeChapter();

                function changeChapter() {
                    var chapterActiveClasses = self.chapterActiveClasses,
                        chapterListItemClasses = self.chapterListItemClasses,
                        chapterInActiveClasses = self.chapterInActiveClasses;

                    var chapterListContainer = document.getElementById(self.playerId + "-chapter-list");
                    var currentChapterId = cue.chapterId;


                    if (!chapterListContainer) return;

                    var chapterList = Array.from(chapterListContainer.children);

                    chapterList.forEach(function (chapterListItem) {
                        var chapterId = chapterListItem.id;

                        var chapterListItemEl = new _element2.default(chapterListItem);

                        if (chapterId.indexOf(currentChapterId) >= 0) {
                            chapterListItemEl.removeClass(chapterInActiveClasses);
                            chapterListItemEl.addClass(chapterActiveClasses);
                            return;
                        }

                        chapterListItemEl.removeClass(chapterActiveClasses);
                        chapterListItemEl.addClass(chapterInActiveClasses);
                    });
                }
            };

            function trackChange(opts) {
                var _opts$trackId = opts.trackId,
                    trackId = _opts$trackId === undefined ? "" : _opts$trackId,
                    playerId = opts.playerId;


                if (playerId === self.playerId) {
                    self.updateTrackSelector(trackId);
                }
            }

            function canPlayCallBack(player) {
                if (player.id === self.playerId) {
                    self.onReadyToPlay(player);
                }
            }

            function updateTime(player) {
                if (player.id === self.playerId) {
                    self.onTimeUpdate(player);
                }
            }

            function whilePaused(player) {
                if (player.id === self.playerId) {
                    self.onPaused(player);
                }
            }

            function whilePlaying(player) {
                if (player.id === self.playerId) {
                    self.onPlaying();
                }
            }

            function mute() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var playerId = args.playerId;


                if (!playerId || playerId === self.playerId) self.mute();
            }

            function unmute(args) {
                var playerId = args.playerId;


                if (!playerId || playerId === self.playerId) self.unmute();
            }

            function setVolume(args) {
                var playerId = args.playerId,
                    volume = args.volume;


                if (!playerId || playerId === self.playerId) self.setVolumeBar(volume);
            }
        }
    }, {
        key: "getElementByClasses",
        value: function getElementByClasses(elements, classes) {
            var elementArray = elements instanceof Array ? elements : Array.from(elements);
            var thisElement = void 0;

            classes.forEach(function (className, index) {
                if (!className) return;
                if (thisElement) return;

                thisElement = elementArray.find(function (element, index) {
                    return element.className.indexOf(className) >= 0;
                });
            });

            return thisElement;
        }
    }, {
        key: "createTimeStamp",
        value: function createTimeStamp(timeObject) {
            var hours = timeObject.hours,
                minutes = timeObject.remainingMinutes,
                seconds = timeObject.remainingSeconds;

            var hourString = '';
            var minuteString = minutes < 10 ? "0" + minutes + ":" : minutes + ":";
            var secondString = seconds < 10 ? "0" + seconds : "" + seconds;

            if (hours > 0) {
                hourString = hours < 10 ? "0" + hours + ":" : hours + ":";
            };

            return "" + hourString + minuteString + secondString;
        }
    }, {
        key: "convertSecondsToParts",
        value: function convertSecondsToParts(seconds) {
            var minutes = Math.floor(seconds / 60);
            var timeInformation = {
                minutes: minutes,
                hours: Math.floor(minutes / 60),
                remainingSeconds: Math.floor(seconds % 60),
                remainingMinutes: Math.floor(minutes % 60),
                seconds: seconds
            };

            return timeInformation;
        }
    }]);

    return Controls;
}(_events2.default);

;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(82);

var _settings2 = _interopRequireDefault(_settings);

var _videoClasses = __webpack_require__(52);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "contructor",
        value: function contructor(playerId) {
            Object.assign(this, {
                volume: 0,
                currenttime: 0,
                playerId: playerId
            });
        }
    }, {
        key: "play",
        value: function play() {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.controlEventNames.PLAY, {
                playerId: playerId
            });
        }
    }, {
        key: "pause",
        value: function pause() {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.controlEventNames.PAUSE, {
                playerId: playerId
            });
        }
    }, {
        key: "sendMute",
        value: function sendMute() {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.controlEventNames.MUTE, {
                playerId: playerId
            });
        }
    }, {
        key: "sendUnmute",
        value: function sendUnmute() {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.controlEventNames.UNMUTE, {
                playerId: playerId
            });
        }
    }, {
        key: "getDuration",
        value: function getDuration(cb) {
            var playerId = this.playerId;


            this.iVXjsBus.once(this.controlEventNames.SET_DURATION, function (eventObj) {
                var eventPlayerId = eventObj.playerId,
                    duration = eventObj.duration;


                if (eventPlayerId === playerId) {
                    cb(duration);
                }
            });

            this.iVXjsBus.emit(this.controlEventNames.GET_DURATION, {
                playerId: playerId
            });
        }
    }, {
        key: "setVolume",
        value: function setVolume(volume) {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.controlEventNames.SET_VOLUME, {
                volume: volume,
                playerId: playerId
            });
        }
    }, {
        key: "seek",
        value: function seek(seconds) {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.controlEventNames.SEEK, {
                currentTime: seconds,
                playerId: playerId
            });
        }
    }, {
        key: "changeCurrentTrack",
        value: function changeCurrentTrack(trackId) {
            var playerId = this.playerId;


            this.iVXjsBus.emit(this.trackEventNames.CHANGE_CURRENT_TRACK, { trackId: trackId, playerId: playerId });
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    addClassesToElement: function addClassesToElement() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var classes = arguments[1];

        var classList = classes.split(' ');

        if (!element.classList) return;

        classList.forEach(function (currentClass) {
            element.classList.add(currentClass);
        });
    },
    removeClassesFromElement: function removeClassesFromElement() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var classes = arguments[1];

        var classList = classes.split(' ');

        if (!element.classList) return;

        classList.forEach(function (currentClass) {
            element.classList.remove(currentClass);
        });
    },
    hasClass: function hasClass() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var classes = arguments[1];

        return element.className && element.className.indexOf(classes) >= 0;
    },
    append: function append(appendTo, element) {
        if (appendTo.append) {
            appendTo.append(element);
            return;
        }

        if (appendTo.appendChild) {
            appendTo.appendChild(element);
            return;
        }
    }
};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iVXjsValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _validation = __webpack_require__(59);

var _experience = __webpack_require__(202);

var _modules = __webpack_require__(203);

var _config = __webpack_require__(204);

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
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExperienceValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = __webpack_require__(59);

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
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModuleValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = __webpack_require__(59);

var _typeParsers = __webpack_require__(7);

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
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = __webpack_require__(59);

var _configStates = __webpack_require__(205);

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
                valid: lastState.stateId && lastState.stateId.length >= 0,
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
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigStatesValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _validation = __webpack_require__(59);

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
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logging = __webpack_require__(116);

var _logging2 = _interopRequireDefault(_logging);

var _errors = __webpack_require__(58);

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(show, Bus) {
        _classCallCheck(this, _class);

        this.show = show;
        this.LoggingMessages = new _logging2.default();
        this.ErrorMessages = new _errors2.default();
        this.Bus = Bus;
    }

    _createClass(_class, [{
        key: 'warn',
        value: function warn(message) {
            var show = this.show,
                LoggingMessages = this.LoggingMessages,
                Bus = this.Bus;

            var warnMessage = LoggingMessages.WARN;
            var warnPayload = {
                message: message,
                timestamp: new Date()
            };

            if (show) {
                console.warn(warnMessage + ': ' + message);
            }

            Bus.emit(warnMessage, warnPayload);
        }
    }, {
        key: 'error',
        value: function error(_error) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "DEFAULT";
            var show = this.show,
                ErrorMessages = this.ErrorMessages,
                Bus = this.Bus;

            var errorTypeMessage = ErrorMessages[type];
            var message = _error.message,
                messages = _error.messages;

            var errorPayload = {
                message: message,
                type: errorTypeMessage,
                error: _error,
                timestamp: new Date()
            };

            console.error(errorTypeMessage + ': ' + message);

            if (messages) {
                this.debug("Errors caused by the following data", {
                    group: true,
                    messages: messages
                });
            }

            Bus.emit(errorTypeMessage, _error);
            Bus.emit(_logging2.default.ERROR, errorPayload);

            // throw Error(message);
        }
    }, {
        key: 'debug',
        value: function debug(message) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var show = this.show,
                LoggingMessages = this.LoggingMessages,
                Bus = this.Bus;

            var logMessage = LoggingMessages.DEBUG;
            var self = this;
            var _options$group = options.group,
                group = _options$group === undefined ? false : _options$group;


            if (group && show) {
                var messages = options.messages;


                console.groupCollapsed(logMessage + ': ' + message);

                messages.forEach(function (message) {
                    var title = message.title,
                        logMesage = message.message;


                    if (title) {
                        console.log(title);
                        self.createMessage(logMesage);
                    } else {
                        self.createMessage(logMesage);
                    }
                });
                console.groupEnd();

                Bus.emit(logMessage, message, options, data);

                return;
            }

            if (show) {
                console.log(logMessage + ':' + message);
                Bus.emit(logMessage, message, {}, data);
            }
        }
    }, {
        key: 'log',
        value: function log(message) {
            var show = this.show,
                LoggingMessages = this.LoggingMessages,
                Bus = this.Bus;

            var logMessage = LoggingMessages.LOG;
            var logPayload = {
                message: message,
                timestamp: new Date()
            };

            console.log(logMessage + ': ' + message);
            Bus.emit(logMessage, logPayload);
        }
    }, {
        key: 'createMessage',
        value: function createMessage(message) {
            if (message !== null && (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object' || Array.isArray(message)) {
                console.dir(message);
            } else {
                console.log(message);
            }
        }
    }, {
        key: 'trace',
        value: function trace(stack) {
            var show = this.show,
                LoggingMessages = this.LoggingMessages,
                Bus = this.Bus;

            var stackPayLoad = {
                stack: stack,
                timestamp: new Date()
            };

            if (show) {
                console.trace(stack);
            }

            Bus.emit(LoggingMessages.TRACE, stackPayLoad);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalEvents = function () {
    function GlobalEvents(iVXjs) {
        _classCallCheck(this, GlobalEvents);

        Object.assign(this, {
            iVXjs: iVXjs
        });
    }

    _createClass(GlobalEvents, [{
        key: "runGlobalEvents",
        value: function runGlobalEvents(actionArray, callback, source) {
            var globalEvents = this.globalEvents;

            var globalElementNames = Object.keys(globalEvents);

            globalElementNames.forEach(function (globalEventName) {
                globalEvents[globalEventName](actionArray, callback, source);
            });
        }
    }, {
        key: "_runGlobalElementEvent",
        value: function _runGlobalElementEvent() {
            var actionArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
            var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var _iVXjs = this.iVXjs,
                iVXjs = _iVXjs === undefined ? {} : _iVXjs;
            var _iVXjs$constants = iVXjs.constants,
                constants = _iVXjs$constants === undefined ? {} : _iVXjs$constants,
                log = iVXjs.log;
            var _constants$GLOBAL = constants.GLOBAL,
                GlobalConstants = _constants$GLOBAL === undefined ? {} : _constants$GLOBAL;
            var actionSourceType = source.type,
                _source$actions = source.actions,
                actions = _source$actions === undefined ? [] : _source$actions;


            if (source.element) {
                this.iVXjs.Bus.emit(GlobalConstants.EVENTS.ELEMENT_EVENT, actions.length > 0 ? actions : actionArray, source);

                log.debug(GlobalConstants.EVENTS.ELEMENT_EVENT + " was fired with the following data", {
                    group: true,
                    messages: [{
                        title: "Action Origin",
                        message: source.origin
                    }, {
                        title: "Action Type",
                        message: source.type
                    }, {
                        title: "Actions Fired",
                        message: actionArray
                    }, {
                        title: "Element",
                        message: source.element
                    }, {
                        title: "Event Data",
                        message: source.event
                    }, {
                        title: "Value",
                        message: source.value
                    }]

                }, {});
            }
        }
    }, {
        key: "globalEvents",
        get: function get() {
            var self = this;
            var _iVXjs2 = this.iVXjs,
                iVXjs = _iVXjs2 === undefined ? {} : _iVXjs2;


            return {
                elementEvent: function elementEvent(actionArray, callback, source) {
                    self._runGlobalElementEvent(actionArray, callback, source);
                }
            };
        }
    }]);

    return GlobalEvents;
}();

exports.default = GlobalEvents;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXio = __webpack_require__(84);

var _iVXio2 = _interopRequireDefault(_iVXio);

var _errors = __webpack_require__(58);

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXioConstants) {
    _inherits(_class, _iVXioConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.ERROR = new _errors2.default().ERROR;

        var errorTypes = {
            EXPERIENCE: "experience",
            PLATFORM_UNAVAILABLE: "platform-unavailable",
            EVENT_NOT_FIRED: "event-not-fired"
        };

        _this.addNames(errorTypes);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(errorName) {
            var ERROR = this.ERROR,
                DELIMETER = this.DELIMETER;

            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + ERROR + DELIMETER + errorName;
        }
    }]);

    return _class;
}(_iVXio2.default);

exports.default = _class;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXio = __webpack_require__(84);

var _iVXio2 = _interopRequireDefault(_iVXio);

var _errors = __webpack_require__(58);

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXioConstants) {
    _inherits(_class, _iVXioConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            RECORD_EVENT: "record-event",
            SET_COMPLETE: "set-complete",
            SET_CONVERTED: "set-converted",
            SET_MILESTONE: "set-milestone",
            SET_DATA: "set-data"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(errorName) {
            var ERROR = this.ERROR,
                DELIMETER = this.DELIMETER;

            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + errorName;
        }
    }]);

    return _class;
}(_iVXio2.default);

exports.default = _class;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _global = __webpack_require__(211);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_GlobalConstants) {
    _inherits(_class, _GlobalConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var events = {
            ELEMENT_EVENT: "element-event"
        };

        _this.addNames(events);
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
}(_global2.default);

exports.default = _class;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(24);

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

        _this.GLOBAL = "global";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                GLOBAL = this.GLOBAL;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + GLOBAL;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(213);

__webpack_require__(410);

__webpack_require__(411);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(214);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(106);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(138);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(141);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(365);
__webpack_require__(366);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(371);
__webpack_require__(372);
__webpack_require__(373);
__webpack_require__(374);
__webpack_require__(375);
__webpack_require__(376);
__webpack_require__(377);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(382);
__webpack_require__(383);
__webpack_require__(384);
__webpack_require__(385);
__webpack_require__(386);
__webpack_require__(387);
__webpack_require__(388);
__webpack_require__(389);
__webpack_require__(390);
__webpack_require__(391);
__webpack_require__(392);
__webpack_require__(393);
__webpack_require__(394);
__webpack_require__(395);
__webpack_require__(396);
__webpack_require__(397);
__webpack_require__(398);
__webpack_require__(399);
__webpack_require__(400);
__webpack_require__(401);
__webpack_require__(402);
__webpack_require__(403);
__webpack_require__(404);
__webpack_require__(405);
__webpack_require__(406);
__webpack_require__(407);
__webpack_require__(408);
__webpack_require__(409);
module.exports = __webpack_require__(30);


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(17);
var META = __webpack_require__(39).KEY;
var $fails = __webpack_require__(4);
var shared = __webpack_require__(67);
var setToStringTag = __webpack_require__(53);
var uid = __webpack_require__(42);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(121);
var wksDefine = __webpack_require__(86);
var enumKeys = __webpack_require__(215);
var isArray = __webpack_require__(70);
var anObject = __webpack_require__(2);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(31);
var createDesc = __webpack_require__(41);
var _create = __webpack_require__(46);
var gOPNExt = __webpack_require__(124);
var $GOPD = __webpack_require__(20);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(44);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(47).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(61).f = $propertyIsEnumerable;
  __webpack_require__(69).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(43)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(44);
var gOPS = __webpack_require__(69);
var pIE = __webpack_require__(61);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(46) });


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperties: __webpack_require__(123) });


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(20).f;

__webpack_require__(34)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(21);

__webpack_require__(34)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(44);

__webpack_require__(34)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(34)('getOwnPropertyNames', function () {
  return __webpack_require__(124).f;
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(39).onFreeze;

__webpack_require__(34)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(39).onFreeze;

__webpack_require__(34)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(39).onFreeze;

__webpack_require__(34)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(5);

__webpack_require__(34)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(5);

__webpack_require__(34)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(5);

__webpack_require__(34)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(125) });


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(231) });


/***/ }),
/* 231 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(90).set });


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(62);
var test = {};
test[__webpack_require__(6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(17)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(126) });


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(8) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(5);
var getPrototypeOf = __webpack_require__(21);
var HAS_INSTANCE = __webpack_require__(6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(9).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(128);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(129);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var has = __webpack_require__(15);
var cof = __webpack_require__(28);
var inheritIfRequired = __webpack_require__(92);
var toPrimitive = __webpack_require__(31);
var fails = __webpack_require__(4);
var gOPN = __webpack_require__(47).f;
var gOPD = __webpack_require__(20).f;
var dP = __webpack_require__(9).f;
var $trim = __webpack_require__(54).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(46)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(8) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(17)(global, NUMBER, $Number);
}


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(33);
var aNumberValue = __webpack_require__(130);
var repeat = __webpack_require__(93);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(4)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(4);
var aNumberValue = __webpack_require__(130);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(3).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(131) });


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(131);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(129);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(128);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(132);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(94);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(95);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(133) });


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(4)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(132) });


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(94) });


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(95);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(4)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(95);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(45);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(10);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(54)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(96)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(97)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(96)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(10);
var context = __webpack_require__(99);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(100)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(99);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(100)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(93)
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(10);
var context = __webpack_require__(99);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(100)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(18)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(18)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(18)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(18)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(18)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(18)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(18)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(18)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(18)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(18)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(18)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(18)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(18)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(31);

$export($export.P + $export.F * __webpack_require__(4)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(293);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(4);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(17)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(16)(proto, TO_PRIMITIVE, __webpack_require__(296));


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(31);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(70) });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(27);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(134);
var isArrayIter = __webpack_require__(101);
var toLength = __webpack_require__(10);
var createProperty = __webpack_require__(102);
var getIterFn = __webpack_require__(103);

$export($export.S + $export.F * !__webpack_require__(72)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(102);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(4)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(60) != Object || !__webpack_require__(29)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(89);
var cof = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(10);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(4)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(4);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(29)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(35)(0);
var STRICT = __webpack_require__(29)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var isArray = __webpack_require__(70);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(35)(1);

$export($export.P + $export.F * !__webpack_require__(29)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(35)(2);

$export($export.P + $export.F * !__webpack_require__(29)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(35)(3);

$export($export.P + $export.F * !__webpack_require__(29)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(35)(4);

$export($export.P + $export.F * !__webpack_require__(29)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(135);

$export($export.P + $export.F * !__webpack_require__(29)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(135);

$export($export.P + $export.F * !__webpack_require__(29)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(68)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(29)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var toInteger = __webpack_require__(33);
var toLength = __webpack_require__(10);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(29)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(136) });

__webpack_require__(40)('copyWithin');


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(105) });

__webpack_require__(40)('fill');


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(35)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(40)(KEY);


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(35)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(40)(KEY);


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('Array');


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var inheritIfRequired = __webpack_require__(92);
var dP = __webpack_require__(9).f;
var gOPN = __webpack_require__(47).f;
var isRegExp = __webpack_require__(71);
var $flags = __webpack_require__(73);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(8) && (!CORRECT_NEW || __webpack_require__(4)(function () {
  re2[__webpack_require__(6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(17)(global, 'RegExp', $RegExp);
}

__webpack_require__(48)('RegExp');


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(138);
var anObject = __webpack_require__(2);
var $flags = __webpack_require__(73);
var DESCRIPTORS = __webpack_require__(8);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(17)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(4)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(74)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(74)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(74)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(74)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(71);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(43);
var global = __webpack_require__(3);
var ctx = __webpack_require__(27);
var classof = __webpack_require__(62);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(5);
var aFunction = __webpack_require__(13);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(50);
var speciesConstructor = __webpack_require__(75);
var task = __webpack_require__(107).set;
var microtask = __webpack_require__(108)();
var newPromiseCapabilityModule = __webpack_require__(109);
var perform = __webpack_require__(139);
var promiseResolve = __webpack_require__(140);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(51)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(53)($Promise, PROMISE);
__webpack_require__(48)(PROMISE);
Wrapper = __webpack_require__(30)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(72)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(145);
var validate = __webpack_require__(56);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(76)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(77);
var buffer = __webpack_require__(110);
var anObject = __webpack_require__(2);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(10);
var isObject = __webpack_require__(5);
var ArrayBuffer = __webpack_require__(3).ArrayBuffer;
var speciesConstructor = __webpack_require__(75);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(4)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(48)(ARRAY_BUFFER);


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(77).ABV, {
  DataView: __webpack_require__(110).DataView
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(2);
var rApply = (__webpack_require__(3).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(4)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(46);
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var fails = __webpack_require__(4);
var bind = __webpack_require__(126);
var rConstruct = (__webpack_require__(3).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(9);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(31);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(4)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(20).f;
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(98)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(21);
var has = __webpack_require__(15);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(2);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(20);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(21);
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(147) });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(9);
var gOPD = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(21);
var has = __webpack_require__(15);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(41);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(90);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(68)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(40)('includes');


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(148);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var aFunction = __webpack_require__(13);
var arraySpeciesCreate = __webpack_require__(104);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(40)('flatMap');


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(148);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var toInteger = __webpack_require__(33);
var arraySpeciesCreate = __webpack_require__(104);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(40)('flatten');


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(96)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(149);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(149);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(54)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(54)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(32);
var toLength = __webpack_require__(10);
var isRegExp = __webpack_require__(71);
var getFlags = __webpack_require__(73);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(98)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86)('asyncIterator');


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86)('observable');


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(147);
var toIObject = __webpack_require__(19);
var gOPD = __webpack_require__(20);
var createProperty = __webpack_require__(102);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(150)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(150)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(13);
var $defineProperty = __webpack_require__(9);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(8) && $export($export.P + __webpack_require__(78), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(13);
var $defineProperty = __webpack_require__(9);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(8) && $export($export.P + __webpack_require__(78), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(21);
var getOwnPropertyDescriptor = __webpack_require__(20).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(78), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(21);
var getOwnPropertyDescriptor = __webpack_require__(20).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(78), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(151)('Map') });


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(151)('Set') });


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(79)('Map');


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(79)('Set');


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(79)('WeakMap');


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(79)('WeakSet');


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(80)('Map');


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(80)('Set');


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(80)('WeakMap');


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(80)('WeakSet');


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(3) });


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(3) });


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(28);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(153);
var fround = __webpack_require__(133);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(153) });


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(30);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(75);
var promiseResolve = __webpack_require__(140);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(109);
var perform = __webpack_require__(139);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(21);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(143);
var from = __webpack_require__(152);
var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(21);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(21);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(37);
var anObject = __webpack_require__(2);
var aFunction = __webpack_require__(13);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(108)();
var process = __webpack_require__(3).process;
var isNode = __webpack_require__(28)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(3);
var core = __webpack_require__(30);
var microtask = __webpack_require__(108)();
var OBSERVABLE = __webpack_require__(6)('observable');
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(2);
var anInstance = __webpack_require__(49);
var redefineAll = __webpack_require__(51);
var hide = __webpack_require__(16);
var forOf = __webpack_require__(50);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(48)('Observable');


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(3);
var $export = __webpack_require__(0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(107);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(106);
var getKeys = __webpack_require__(44);
var redefine = __webpack_require__(17);
var global = __webpack_require__(3);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(55);
var wks = __webpack_require__(6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(412);
module.exports = __webpack_require__(30).RegExp.escape;


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(413)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 413 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 414 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _registeredConstants = __webpack_require__(118);

var _registeredConstants2 = _interopRequireDefault(_registeredConstants);

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.constants', []).constant('ivxjs.constants', new _registeredConstants2.default()).constant('factoryFunctionCreator', _createFactoryFunction2.default).name;

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _state = __webpack_require__(417);

var _state2 = _interopRequireDefault(_state);

var _state3 = __webpack_require__(420);

var _state4 = _interopRequireDefault(_state3);

var _state5 = __webpack_require__(422);

var _state6 = _interopRequireDefault(_state5);

var _state7 = __webpack_require__(424);

var _state8 = _interopRequireDefault(_state7);

var _input = __webpack_require__(425);

var _input2 = _interopRequireDefault(_input);

var _input3 = __webpack_require__(427);

var _input4 = _interopRequireDefault(_input3);

var _ui = __webpack_require__(429);

var _ui2 = _interopRequireDefault(_ui);

var _ui3 = __webpack_require__(431);

var _ui4 = _interopRequireDefault(_ui3);

var _input5 = __webpack_require__(433);

var _input6 = _interopRequireDefault(_input5);

var _input7 = __webpack_require__(435);

var _input8 = _interopRequireDefault(_input7);

var _input9 = __webpack_require__(437);

var _input10 = _interopRequireDefault(_input9);

var _input11 = __webpack_require__(439);

var _input12 = _interopRequireDefault(_input11);

var _input13 = __webpack_require__(441);

var _input14 = _interopRequireDefault(_input13);

var _input15 = __webpack_require__(443);

var _input16 = _interopRequireDefault(_input15);

var _input17 = __webpack_require__(445);

var _input18 = _interopRequireDefault(_input17);

var _input19 = __webpack_require__(447);

var _input20 = _interopRequireDefault(_input19);

var _input21 = __webpack_require__(449);

var _input22 = _interopRequireDefault(_input21);

var _input23 = __webpack_require__(451);

var _input24 = _interopRequireDefault(_input23);

var _video = __webpack_require__(453);

var _video2 = _interopRequireDefault(_video);

var _video3 = __webpack_require__(455);

var _video4 = _interopRequireDefault(_video3);

var _video5 = __webpack_require__(457);

var _video6 = _interopRequireDefault(_video5);

var _embededView = __webpack_require__(459);

var _embededView2 = _interopRequireDefault(_embededView);

var _videoControls = __webpack_require__(461);

var _videoControls2 = _interopRequireDefault(_videoControls);

var _template = __webpack_require__(463);

var _template2 = _interopRequireDefault(_template);

var _template3 = __webpack_require__(464);

var _template4 = _interopRequireDefault(_template3);

var _template5 = __webpack_require__(465);

var _template6 = _interopRequireDefault(_template5);

var _template7 = __webpack_require__(466);

var _template8 = _interopRequireDefault(_template7);

var _template9 = __webpack_require__(467);

var _template10 = _interopRequireDefault(_template9);

var _template11 = __webpack_require__(468);

var _template12 = _interopRequireDefault(_template11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Template Directives 


//Embedded Views
exports.default = angular.module('ivx-js.directives', [_state2.default, _input6.default, _input20.default, _input12.default, _input14.default, _input8.default, _input2.default, _input22.default, _input16.default, _input18.default, _input4.default, _input24.default, _embededView2.default, _input10.default, _state6.default, _state2.default, _state8.default, _state4.default, _template4.default, _template6.default, _template8.default, _template10.default, _template12.default, _template2.default, _ui2.default, _ui4.default, _videoControls2.default, _video4.default, _video6.default, _video2.default]).name;

// Video Controls

// Video Players


// Inputs
// Directives

// States

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _stateInput = __webpack_require__(418);

var _stateInput2 = _interopRequireDefault(_stateInput);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputState = function () {
    function InputState($state, $compile, $sce, $timeout, iVXjs, iVXjsActions, iVXjsUIModule, pullInTemplate, iVXjsBus, ivxExperienceScope, iVXjsStateCreator) {
        _classCallCheck(this, InputState);

        this.template = this.templateHTML;
        this.replace = true;
        this.restrict = 'E';
        this.scope = {
            stateData: "="
        };
        this.controller = _stateInput2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var data = angular.copy($scope.stateData);
            var _data = data,
                headerHTML = _data.headerHTML,
                _data$footerHTML = _data.footerHTML,
                footerHTML = _data$footerHTML === undefined ? '' : _data$footerHTML,
                _data$onInputReady = _data.onInputReady,
                onInputReady = _data$onInputReady === undefined ? [] : _data$onInputReady,
                _data$form = _data.form,
                formSettings = _data$form === undefined ? {} : _data$form,
                _data$header = _data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = _data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                audio = _data.audio,
                _data$embedded = _data.embedded,
                embedded = _data$embedded === undefined ? false : _data$embedded,
                _data$embeddedViews = _data.embeddedViews,
                embeddedViews = _data$embeddedViews === undefined ? [] : _data$embeddedViews;

            var audioEventNames = new _audioEvents2.default();
            var formSection = '<ivxjs-form-input class="ivx-state-input-form-container" inputs=\'vm.inputs\' form-id=\'vm.id\' on-submit=\'vm.onSubmit\' form-settings="vm.formSettings"></ivxjs-form-input>';

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            var inputStateFramework = new iVXjsUIModule.states.input(formSection, data);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            controller.formSettings = formSettings;

            iElm.html(inputStateFramework.html);

            if (!embedded && embeddedViews.length > 0) {
                iVXjsStateCreator.addViews(embeddedViews, iElm);
            }

            $compile(iElm.contents())($scope, function (compiled) {
                if (window.$) {
                    iElm.html(compiled);
                    showState();
                    return;
                }

                compiled.ready(function () {
                    var _compiled = _slicedToArray(compiled, 2),
                        text = _compiled[0],
                        compiledNode = _compiled[1];

                    iElm.html(compiledNode.innerHTML);
                    showState();
                });
            });

            function showState() {
                if (iVXjsUIModule.initializeInput) {
                    iVXjsUIModule.initializeInput();
                };

                var hasTransition = onInputReady.find(function (event, index) {
                    return event.eventName === "animateElement" && event.args.element === ".input-state-container";
                });

                // iElm.html(compiled);

                if (!hasTransition) {
                    onInputReady.push({
                        eventName: "animateElement",
                        args: {
                            element: ".input-state-container",
                            animationClasses: "show"
                        }
                    });
                }

                controller.embedded = embedded;

                iVXjs.log.debug('onInputReady Started', {}, { state: data, source: 'onInputReady', status: 'started', actions: onInputReady, timestamp: Date.now() });

                iVXjsActions.resolveActions(onInputReady, function () {
                    iVXjs.log.debug('onInputReady Completed', {}, { state: data, source: 'onInputReady', status: 'completed', actions: onInputReady, timestamp: Date.now() });

                    if (audio && audio.src) {
                        iVXjsBus.emit(audioEventNames.PLAY);
                    }
                });
            }
        };
    }

    _createClass(InputState, [{
        key: 'templateHTML',
        get: function get() {
            return '<div ng-class="{\'ivx-embedded-state\': vm.embedded}" class="ivx-state-container ivx-state-input-container input-state-container"></div>';
        }
    }]);

    return InputState;
}();

InputState.$inject = ['$state', '$compile', '$sce', '$timeout', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxjs.bus', "ivxExperienceScope", "iVXjsStateCreator"];

exports.default = angular.module('ivx-js.directives.state.input', []).directive('ivxjsInputState', (0, _createFactoryFunction2.default)(InputState)).name;

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _stateData = __webpack_require__(419);

var _stateData2 = _interopRequireDefault(_stateData);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputStateController = function InputStateController($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus, iVXjsUIModule, iVXjs) {
    _classCallCheck(this, InputStateController);

    var _$scope$stateData = $scope.stateData,
        inputs = _$scope$stateData.inputs,
        id = _$scope$stateData.id,
        headerHTML = _$scope$stateData.headerHTML,
        footerHTML = _$scope$stateData.footerHTML,
        name = _$scope$stateData.name,
        _$scope$stateData$nex = _$scope$stateData.next,
        next = _$scope$stateData$nex === undefined ? [] : _$scope$stateData$nex,
        _$scope$stateData$onS = _$scope$stateData.onSubmit,
        onSubmit = _$scope$stateData$onS === undefined ? [] : _$scope$stateData$onS,
        _$scope$stateData$onI = _$scope$stateData.onInputReady,
        onInputReady = _$scope$stateData$onI === undefined ? [] : _$scope$stateData$onI,
        audio = _$scope$stateData.audio;

    var audioEventNames = new _audioEvents2.default();

    this.inputs = inputs;
    this.id = id;
    this.stateID = id;
    this.onSubmit = function (formInput, $event) {
        var element = $event.currentTarget;


        if (formInput && formInput.$valid) {
            iVXjs.log.debug('onSubmit Actions', {}, { state: $scope.stateData, source: 'onSubmit', status: 'completed', actions: onSubmit, timestamp: Date.now() });
            iVXjsActions.resolveThenNavigate(onSubmit, next, iVXjsActions.createFormSubmitSource($event));
        }
    };

    $timeout(function () {}, 1);
};

InputStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.ui', 'iVXjs'];

exports.default = (0, _createFactoryFunction2.default)(InputStateController);

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class($state) {
    _classCallCheck(this, _class);

    var stateData = $state.current.data;
    this.stateData = stateData;
};

exports.default = _class;

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _stateVideo = __webpack_require__(421);

var _stateVideo2 = _interopRequireDefault(_stateVideo);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoState = function () {
    function VideoState($compile, $state, $sce, $timeout, iVXjs, iVXjsBus, iVXjsUIModule, createInlineVideo, pullInTemplate, ivxExperienceScope, iVXjsStateCreator, iVXjsVideoService) {
        _classCallCheck(this, VideoState);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData: "="
        };
        this.controller = _stateVideo2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var data = angular.copy($scope.stateData);

            controller.stateData = data;

            var _data = data,
                id = _data.id,
                _data$playerType = _data.playerType,
                playerType = _data$playerType === undefined ? "html5" : _data$playerType,
                _data$playerSettings = _data.playerSettings,
                playerSettings = _data$playerSettings === undefined ? {} : _data$playerSettings,
                _data$embeddedViews = _data.embeddedViews,
                embeddedViews = _data$embeddedViews === undefined ? [] : _data$embeddedViews,
                embedded = _data.embedded,
                _data$cuePoints = _data.cuePoints,
                cuePoints = _data$cuePoints === undefined ? [] : _data$cuePoints,
                _data$personalization = _data.personalizations,
                personalizations = _data$personalization === undefined ? [] : _data$personalization,
                _data$header = _data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = _data.footer,
                footer = _data$footer === undefined ? {} : _data$footer;

            var _angular$copy = angular.copy(playerSettings),
                vimeoId = _angular$copy.vimeoId,
                youtubeId = _angular$copy.youtubeId,
                inlineSrc = _angular$copy.inlineSrc,
                _angular$copy$iphoneI = _angular$copy.iphoneInline,
                iphoneInline = _angular$copy$iphoneI === undefined ? false : _angular$copy$iphoneI,
                controls = _angular$copy.controls;

            var playerId = playerSettings.id ? playerSettings.id : id + '-video-player';
            var controlsHTML = iVXjsVideoService.getControlHTML(playerId, controls);

            if (vimeoId) playerType = 'vimeo';
            if (youtubeId) playerType = 'youtube';
            if (createInlineVideo.isiOS() && iphoneInline && inlineSrc) {
                playerType = 'html5';
                playerSettings.src = inlineSrc;
                data.isIphone = true;
            }

            controller.controls = controls;

            var personalizationsHTML = personalizations.reduce(function (personalizationHTML, thisPersonalization, index) {
                thisPersonalization = pullInTemplate.convertTemplateUrlToHtml(thisPersonalization, $scope);

                var _thisPersonalization = thisPersonalization,
                    _thisPersonalization$ = _thisPersonalization.defaultAnimationClass,
                    defaultAnimationClass = _thisPersonalization$ === undefined ? 'hide' : _thisPersonalization$,
                    html = _thisPersonalization.html,
                    id = _thisPersonalization.id;


                return personalizationHTML + ' <div id="' + id + '" class="' + defaultAnimationClass + '">' + html + '</div> ';
            }, "");

            controller.playerId = playerId;

            var videoPlayerHTML = '\n               <ivxjs-' + playerType + '-video-player class="ivx-state-video-player" player-id=\'' + playerId + '\' settings="vm.stateData.playerSettings" state-data="vm.stateData"></ivxjs-' + playerType + '-video-player>\n               ' + controlsHTML + '\n               ' + personalizationsHTML;

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            var videoFramework = new iVXjsUIModule.states.video(videoPlayerHTML, data);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            iElm.html(videoFramework.html);

            if (!embedded && embeddedViews.length > 0) {
                iVXjsStateCreator.addViews(embeddedViews, iElm);
            }

            controller.embedded = embedded;

            $compile(iElm.contents())($scope, function (compiled) {
                iElm.html(compiled);

                if (createInlineVideo.isMobile() || createInlineVideo.isiOS()) {
                    var videoEventNames = new _videoEvents2.default();
                    $timeout(function () {
                        var player = {};

                        if (playerType === 'html5') {
                            player = iElm.find('video')[0];
                        }

                        iVXjsBus.emit(videoEventNames.CAN_PLAY, player);
                    }, 500);
                }
            });

            $scope.$on('$destroy', function () {
                var videoEventNames = new _videoEvents2.default();

                iVXjsBus.removeListener(videoEventNames.ENDED, controller.videoEnded);
            });
        };
    }

    _createClass(VideoState, [{
        key: 'templateHTML',
        get: function get() {
            return '<div ng-class="{\'ivx-embedded-state\': vm.embedded}" class="ivx-state-container ivx-state-video-container video-state-container"></div>';
        }
    }]);

    return VideoState;
}();

VideoState.$inject = ['$compile', '$state', '$sce', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui', 'createInlineVideo', 'pullInTemplate', 'ivxExperienceScope', 'iVXjsStateCreator', 'iVXjsVideoService'];

exports.default = angular.module('ivx-js.directives.state.video', []).directive('ivxjsVideoState', (0, _createFactoryFunction2.default)(VideoState)).name;

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _typeParsers = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

function setUpCuePoints(cuePoints) {
    var cuePointsTemp = sortCuePoints(cuePoints);

    cuePointsTemp = cuePointsTemp.map(function (cuePoint, index) {
        cuePoint.fired = false;

        return cuePoint;
    });

    return cuePointsTemp;
}

function sortCuePoints(cuePoints) {
    return cuePoints.sort(function (cuePointA, cuePointB) {
        if (cuePointA.timeAt > cuePointB.timeAt) {
            return 1;
        }

        if (cuePointA.timeAt < cuePointB.timeAt) {
            return -1;
        }

        return 0;
    });
}

var VideoStateController = function VideoStateController($rootScope, $state, iVXjsActions, iVXjsBus, iVXjs, iVXjsVideoService) {
    _classCallCheck(this, VideoStateController);

    var self = this;
    var videoEventNames = new _videoEvents2.default();

    var playerCanPlay = iVXjsBus.on(videoEventNames.CAN_PLAY, function stateVideoCanPlay(player) {
        var stateData = self.stateData;
        var playerSettings = stateData.playerSettings,
            _stateData$onVideoEnd = stateData.onVideoEnd,
            onVideoEnd = _stateData$onVideoEnd === undefined ? [] : _stateData$onVideoEnd,
            _stateData$onVideoRea = stateData.onVideoReady,
            onVideoReady = _stateData$onVideoRea === undefined ? [] : _stateData$onVideoRea,
            next = stateData.next,
            _stateData$cuePoints = stateData.cuePoints,
            cuePoints = _stateData$cuePoints === undefined ? [] : _stateData$cuePoints;
        var _playerSettings$autop = playerSettings.autoplay,
            autoplay = _playerSettings$autop === undefined ? false : _playerSettings$autop;
        var playerId = self.playerId;


        if (player.id === playerId) {
            var transitionAnimation = onVideoReady.find(function (event, index) {
                return event.eventName === "animateElement" && event.args.element === ".video-state-container";
            });

            cuePoints = setUpCuePoints(cuePoints);

            if (!transitionAnimation) {
                onVideoReady.push({
                    eventName: "animateElement",
                    args: {
                        element: ".video-state-container",
                        animationClasses: "show"
                    }
                });
            }

            stateData.player = player;

            iVXjs.log.debug("onVideoReady Started", {}, { state: self.stateData, source: 'onVideoReady', status: 'started', actions: onVideoReady, timestamp: Date.now() });

            iVXjsActions.resolveActions(onVideoReady, function () {
                if (autoplay) {
                    iVXjsBus.emit(videoEventNames.PLAY, {
                        playerId: playerId
                    });
                    iVXjsBus.emit(videoEventNames.ADD_PLAYING_CLASS, {
                        playerId: playerId
                    });
                }

                iVXjs.log.debug("onVideoReady Completed", {}, { state: self.stateData, source: 'onVideoReady', status: 'completed', actions: onVideoReady, timestamp: Date.now() });
                iVXjsBus.removeListener(videoEventNames.CAN_PLAY, playerCanPlay);
            });
        }
    });

    this.videoEnded = iVXjsBus.on(videoEventNames.ENDED, function stateVideoEnded(player) {
        var _self$stateData = self.stateData,
            _self$stateData$onVid = _self$stateData.onVideoEnd,
            onVideoEnd = _self$stateData$onVid === undefined ? [] : _self$stateData$onVid,
            _self$stateData$next = _self$stateData.next,
            next = _self$stateData$next === undefined ? [] : _self$stateData$next;


        if (player.id === self.playerId) {
            iVXjs.log.debug("onVideoEnd Actions", {}, { state: self.stateData, source: 'onVideoEnd', status: 'completed', actions: onVideoEnd, timestamp: Date.now() });
            iVXjsActions.resolveThenNavigate(onVideoEnd, next);
        }
    });
};

VideoStateController.$inject = ['$rootScope', '$state', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs', 'iVXjsVideoService'];

exports.default = (0, _createFactoryFunction2.default)(VideoStateController);

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _stateHtml = __webpack_require__(423);

var _stateHtml2 = _interopRequireDefault(_stateHtml);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlState = function () {
    function HtmlState($state, $http, $compile, $sce, $timeout, iVXjs, iVXjsActions, iVXjsAudio, iVXjsBus, ivxExperienceScope, iVXjsStateCreator) {
        _classCallCheck(this, HtmlState);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData: "="
        };
        this.controller = _stateHtml2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var data = angular.copy($scope.stateData);
            var id = data.id,
                html = data.html,
                templateUrl = data.templateUrl,
                _data$onCompile = data.onCompile,
                onCompile = _data$onCompile === undefined ? [] : _data$onCompile,
                audio = data.audio,
                _data$embedded = data.embedded,
                embedded = _data$embedded === undefined ? false : _data$embedded,
                _data$embeddedViews = data.embeddedViews,
                embeddedViews = _data$embeddedViews === undefined ? [] : _data$embeddedViews,
                _data$section = data.section,
                section = _data$section === undefined ? {} : _data$section;
            var sectionClasses = section.classes;

            var audioEventNames = new _audioEvents2.default();

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            if (templateUrl) {
                var safeTemplateUrl = $sce.getTrustedResourceUrl(templateUrl);

                controller.safeTemplateUrl = safeTemplateUrl;

                addViews('<div class="html-state-container" ng-include="vm.safeTemplateUrl"></div>', true);
            } else {
                addViews(html, true);
            }

            $scope.$on('$destroy', function () {
                if (controller.timeOutId) {
                    $timeout.cancel(controller.timeOutId);
                }
            });

            function addViews(html, shouldShowState) {
                iElm.addClass(sectionClasses);
                iElm.html(html);

                if (!embedded && embeddedViews.length > 0) {
                    iVXjsStateCreator.addViews(embeddedViews, iElm);
                }

                $compile(iElm.contents())($scope, function (compiled) {
                    iElm.html(compiled);
                    if (shouldShowState) showState();
                });
            }

            controller.embedded = embedded;

            function showState() {
                var hasTransition = onCompile.find(function (event, index) {
                    return event.eventName === "animateElement" && event.args.element === ".html-state-container";
                });

                if (!hasTransition) {
                    onCompile.push({
                        eventName: "animateElement",
                        args: {
                            element: ".html-state-container",
                            animationClasses: "show"
                        }
                    });
                }

                iVXjs.log.debug('onCompile Started', {}, { state: $scope.stateData, source: 'onCompile', status: 'started', actions: onCompile, timestamp: Date.now() });

                iVXjsActions.resolveActions(onCompile, function () {
                    iVXjs.log.debug('onCompile Completed', {}, { state: $scope.stateData, source: 'onCompile', status: 'completed', actions: onCompile, timestamp: Date.now() });
                    if (audio && audio.src) {
                        iVXjsBus.emit(audioEventNames.PLAY);
                    }
                });
            }
        };
    }

    _createClass(HtmlState, [{
        key: 'templateHTML',
        get: function get() {
            return '<div ng-class="{\'ivx-embedded-state\': vm.embedded}" class="ivx-state-container ivx-state-html-container html-state-container" id="{{vm.id}}"></div>';
        }
    }]);

    return HtmlState;
}();

HtmlState.$inject = ['$state', '$http', '$compile', '$sce', '$timeout', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.audio', 'ivxjs.bus', "ivxExperienceScope", "iVXjsStateCreator"];

exports.default = angular.module('ivx-js.directives.state.html', []).directive('ivxjsHtmlState', (0, _createFactoryFunction2.default)(HtmlState)).name;

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlStateController = function () {
    function HtmlStateController($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus, iVXjs) {
        _classCallCheck(this, HtmlStateController);

        var _$scope$stateData = $scope.stateData,
            id = _$scope$stateData.id,
            timeoutInMs = _$scope$stateData.timeoutInMs,
            _$scope$stateData$onT = _$scope$stateData.onTimeout,
            onTimeout = _$scope$stateData$onT === undefined ? [] : _$scope$stateData$onT,
            _$scope$stateData$nex = _$scope$stateData.next,
            next = _$scope$stateData$nex === undefined ? [] : _$scope$stateData$nex;


        if (typeof timeoutInMs != "undefined" && timeoutInMs > 0) {

            this.timeOutId = $timeout(function () {
                iVXjs.log.debug('onTimeout Actions', {}, { state: $scope.stateData, source: 'onTimeout', status: 'completed', actions: onTimeout, timestamp: Date.now() });

                iVXjsActions.resolveThenNavigate(onTimeout, next);
            }, timeoutInMs);
        }

        Object.assign(this, {
            id: id,
            iVXjsActions: iVXjsActions,
            iVXjsBus: iVXjsBus
        });
    }

    _createClass(HtmlStateController, [{
        key: 'performEvents',
        value: function performEvents(events) {
            var self = this;

            self.iVXjsActions.resolveActions(events, function () {
                events.forEach(function (event, index) {
                    self.iVXjsBus.emit(event.eventName, event.args);
                });
            });
        }
    }]);

    return HtmlStateController;
}();

HtmlStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs'];

exports.default = (0, _createFactoryFunction2.default)(HtmlStateController);

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _audioEvents = __webpack_require__(38);

var _audioEvents2 = _interopRequireDefault(_audioEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationState = function () {
    function NavigationState($state, $rootScope, $compile, $timeout, iVXjs, iVXjsModules, iVXjsBus, iVXjsAudio, iVXjsActions, pullInTemplate, ivxExperienceScope, iVXjsStateCreator) {
        _classCallCheck(this, NavigationState);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData: "="
        };
        this.controller = ['$scope', function ($scope) {}];
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var data = angular.copy($scope.stateData);
            var _data = data,
                _data$links = _data.links,
                links = _data$links === undefined ? [] : _data$links,
                _data$header = _data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = _data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                audio = _data.audio,
                _data$onLinksReady = _data.onLinksReady,
                onLinksReady = _data$onLinksReady === undefined ? [] : _data$onLinksReady,
                _data$embedded = _data.embedded,
                embedded = _data$embedded === undefined ? false : _data$embedded,
                _data$embeddedViews = _data.embeddedViews,
                embeddedViews = _data$embeddedViews === undefined ? [] : _data$embeddedViews;


            $scope.links = links;

            var linkSection = links.reduce(function (html, link, index) {
                return html + '\n                    <ivxjs-anchor anchor-info=\'links[' + index + ']\'></ivxjs-anchor>';
            }, '');
            var audioEventNames = new _audioEvents2.default();

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            var thisNavigationState = new iVXjsModules.states.navigation(data, linkSection);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            iElm.html(thisNavigationState.html);

            if (!embedded && embeddedViews.length > 0) {
                iVXjsStateCreator.addViews(embeddedViews, iElm);
            }

            controller.embedded = embedded;

            $compile(iElm.contents())($scope, function (compiled) {
                iElm.html(compiled);
                showState();
            });

            function showState() {
                var transitionAnimation = onLinksReady.find(function (event, index) {
                    return event.eventName === "animateElement" && event.args.element === ".navigation-state-container";
                });

                if (!transitionAnimation) {
                    onLinksReady.push({
                        eventName: "animateElement",
                        args: {
                            element: ".navigation-state-container",
                            animationClasses: "show"
                        }
                    });
                }

                iVXjs.log.debug('onLinksReady Started', {}, { state: data, source: 'onLinksReady', status: 'started', actions: onLinksReady, timestamp: Date.now() });

                iVXjsActions.resolveActions(onLinksReady, function () {
                    if (audio && audio.src) {
                        iVXjsBus.emit(audioEventNames.PLAY);
                    }

                    iVXjs.log.debug('onLinksReady Completed', {}, { state: data, source: 'onLinksReady', status: 'completed', actions: onLinksReady, timestamp: Date.now() });
                });
            }
        };
    }

    _createClass(NavigationState, [{
        key: 'templateHTML',
        get: function get() {
            return '<div ng-class="{\'ivx-embedded-state\': vm.embedded}"  class="ivx-state-container ivx-state-navigation-container navigation-state-container"></div>';
        }
    }]);

    return NavigationState;
}();

NavigationState.$inject = ['$state', '$rootScope', '$compile', '$timeout', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus', 'ivxjs.modules.audio', 'ivxjs.actions', 'pullInTemplate', "ivxExperienceScope", 'iVXjsStateCreator'];

exports.default = angular.module('ivx-js.directives.state.navigation', []).directive('ivxjsNavigationState', (0, _createFactoryFunction2.default)(NavigationState)).name;

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputForm = __webpack_require__(426);

var _inputForm2 = _interopRequireDefault(_inputForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormInput = function () {
    function FormInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, FormInput);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            inputs: '=inputs',
            formId: '=formId',
            onSubmit: '=onSubmit',
            formSettings: '=formSettings'
        };
        this.controller = _inputForm2.default;
        this.controllerAs = 'vm';
        this.$compile = $compile;
        this.link = function ($scope, iElm, iAttrs, controller) {
            var shouldHideSubmit = function shouldHideSubmit(inputs, type, attributes) {
                var hideSubmitOnType = {
                    buttons: true
                };

                return hideSubmitOnType[type];
            };
            var hideSubmit = false;
            var inputs = $scope.inputs,
                _$scope$formSettings = $scope.formSettings,
                formSettings = _$scope$formSettings === undefined ? {} : _$scope$formSettings,
                formId = $scope.formId;

            var formInputs = inputs.map(function (input, index) {
                var type = input.type,
                    attributes = input.attributes,
                    _input$settings = input.settings,
                    settings = _input$settings === undefined ? {} : _input$settings,
                    id = input.id;


                hideSubmit = shouldHideSubmit(inputs, type, attributes);

                return {
                    html: '<ivxjs-' + type + '-input class="ivxjs-grid-1-1" id="' + id + '" input-data=\'inputs[' + index + ']\'></ivxjs-' + type + '-input>\n',
                    settings: settings,
                    input: input
                };
            });

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            formSettings = pullInTemplate.convertLabel('', formSettings, $scope);
            formSettings.submit = pullInTemplate.convertLabel('Submit', formSettings.submit, $scope);
            formSettings.submit.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(formSettings.submit.beforeHtml, $scope);
            formSettings.submit.afterHtml = pullInTemplate.convertTemplateUrlToHtml(formSettings.submit.afterHtml, $scope);
            formSettings.hideSubmit = hideSubmit;
            formSettings.id = formId;

            var additionalTagHTML = 'ng-submit="vm.onSubmit($event)"';
            var thisFormInputs = new iVXjsUIModule.form(formInputs, 'formInput', additionalTagHTML, formSettings);

            iElm.html(thisFormInputs.html);

            $compile(iElm.contents())($scope);
        };
    }

    _createClass(FormInput, [{
        key: 'templateHTML',
        get: function get() {
            return '';
        }
    }]);

    return FormInput;
}();

FormInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.form', []).directive('ivxjsFormInput', (0, _createFactoryFunction2.default)(FormInput)).name;

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormInputController = function FormInputController($scope, $filter) {
    _classCallCheck(this, FormInputController);

    var self = this;

    this.formController = {};
    this.onSubmit = function ($event) {
        var formInput = $scope.formInput;


        $scope.onSubmit(formInput, $event);
    };
};

FormInputController.$inject = ['$scope', '$filter'];

exports.default = (0, _createFactoryFunction2.default)(FormInputController);

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputText = __webpack_require__(428);

var _inputText2 = _interopRequireDefault(_inputText);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextInput = function () {
    function TextInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, TextInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputText2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                _input$label = _input.label,
                label = _input$label === undefined ? $filter('stringParsers')('startCase', id) : _input$label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                type = _input.type,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            input.label = labelHTML ? labelHTML : label;
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var uiTextObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var text = new iVXjsUIModule.text(uiTextObj);

            iElm.html(text.html);

            $compile(iElm.contents())($scope);
        };
    }

    _createClass(TextInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return TextInput;
}();

TextInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.text', []).directive('ivxjsTextInput', (0, _createFactoryFunction2.default)(TextInput)).name;

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInputController = function (_InputControllerHelpe) {
	_inherits(TextInputController, _InputControllerHelpe);

	function TextInputController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, TextInputController);

		return _possibleConstructorReturn(this, (TextInputController.__proto__ || Object.getPrototypeOf(TextInputController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return TextInputController;
}(_inputController.InputControllerHelper);

TextInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(TextInputController);

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Anchor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _uiAnchor = __webpack_require__(430);

var _uiAnchor2 = _interopRequireDefault(_uiAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Anchor = exports.Anchor = function () {
    function Anchor($compile, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, Anchor);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            anchorInfo: "=anchorInfo"
        };
        this.controller = _uiAnchor2.default;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = function ($scope, iElm, iAttrs, controller) {
            var anchorInfo = $scope.anchorInfo;
            var _anchorInfo = anchorInfo,
                _anchorInfo$attribute = _anchorInfo.attributes,
                attributes = _anchorInfo$attribute === undefined ? {} : _anchorInfo$attribute;


            attributes['ng-click'] = 'vm.onLinkClick($event)';
            anchorInfo.attributes = attributes;
            controller.anchorInfo = anchorInfo;

            anchorInfo = pullInTemplate.convertLabel(anchorInfo.href, anchorInfo, $scope);

            var thisAnchor = new iVXjsUIModule.anchor(anchorInfo);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            iElm.html(thisAnchor.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(Anchor, [{
        key: 'templateHTML',
        get: function get() {
            return "<div class='ivx-link-container'></div>";
        }
    }]);

    return Anchor;
}();

Anchor.$inject = ['$compile', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', "ivxExperienceScope"];

exports.default = angular.module('ivx-js.directives.ui.anchor', []).directive('ivxjsAnchor', (0, _createFactoryFunction2.default)(Anchor)).name;

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnchorController = function () {
    function AnchorController($scope, $window, $state, iVXjsActions, iVXjsAudio, iVXjs) {
        _classCallCheck(this, AnchorController);

        this.iVXjsActions = iVXjsActions;
        this.$window = $window;
        this.iVXjsAudio = iVXjsAudio;
        this.iVXjs = iVXjs;
        this.$state = $state;
    }

    _createClass(AnchorController, [{
        key: 'onLinkClick',
        value: function onLinkClick() {
            var _this = this;

            var $event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var iVXjs = this.iVXjs,
                $state = this.$state;
            var _anchorInfo = this.anchorInfo,
                _anchorInfo$onClick = _anchorInfo.onClick,
                onClickEvents = _anchorInfo$onClick === undefined ? [] : _anchorInfo$onClick,
                href = _anchorInfo.href,
                _anchorInfo$attribute = _anchorInfo.attributes,
                attributes = _anchorInfo$attribute === undefined ? {} : _anchorInfo$attribute,
                _anchorInfo$route = _anchorInfo.route,
                route = _anchorInfo$route === undefined ? "" : _anchorInfo$route;

            var self = this;
            var hasGoToNextState = onClickEvents.find(function (clickEvent, index) {
                return clickEvent.eventName === 'goToNextState';
            });

            var _$event$currentTarget = $event.currentTarget,
                currentTarget = _$event$currentTarget === undefined ? {} : _$event$currentTarget;
            var compiledHref = currentTarget.href;


            if (attributes.target !== '_blank') {
                $event.preventDefault();
            }

            var modifiedTarget = angular.copy(currentTarget);

            if (route.length && route.length > 0) {
                iVXjs.log.debug('Link with route ' + route + ' onLinkClick Started', {}, { anchor: this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });

                modifiedTarget = Object.assign(modifiedTarget, {
                    href: $state.href(route)
                });
            } else {
                iVXjs.log.debug('Link with href ' + (compiledHref ? compiledHref : href) + ' onLinkClick Start', {}, { anchor: this.anchorInfo, source: 'onClick', status: 'started', actions: onClickEvents, timestamp: Date.now() });
            }

            this.iVXjsActions.resolveActions(onClickEvents, function () {
                if (hasGoToNextState) return;

                if (route.length && route.length > 0) {
                    iVXjs.log.debug('Link with route ' + route + ' onLinkClick Ended', {}, { anchor: _this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });

                    $state.go(route);

                    return;
                }

                iVXjs.log.debug('Link with href ' + (compiledHref ? compiledHref : href) + ' onLinkClick Ended', {}, { anchor: _this.anchorInfo, source: 'onClick', status: 'completed', actions: onClickEvents, timestamp: Date.now() });

                if (attributes.target !== '_blank') {
                    self.$window.location = compiledHref ? compiledHref : href;
                }
            }, this.iVXjsActions.createAnchorClickSource($event));

            this.iVXjsAudio.audioElement.play();
            this.iVXjsAudio.audioElement.pause();
        }
    }]);

    return AnchorController;
}();

AnchorController.$inject = ['$scope', '$window', '$state', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

exports.default = (0, _createFactoryFunction2.default)(AnchorController);

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CascadingOptions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _uiCascadingOptions = __webpack_require__(432);

var _uiCascadingOptions2 = _interopRequireDefault(_uiCascadingOptions);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CascadingOptions = exports.CascadingOptions = function () {
    function CascadingOptions($compile, $timeout, iVXjs, iVXjsBus, iVXjsUIModule) {
        _classCallCheck(this, CascadingOptions);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            inputData: "=inputData"
        };
        this.controller = _uiCascadingOptions2.default;
        this.controllerAs = 'vm';
        this.replace = true;

        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;

            var defaultOptionTag = 'Select an option...';
            var _input$errors = input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                _input$attributes = input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                _input$settings = input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;
            var cascadeRequired = attributes.required;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$displa = inputSettings.displayMap,
                displayMap = _inputSettings$displa === undefined ? {} : _inputSettings$displa;

            var tries = 0;

            updateView(controller.viewSettings);

            iVXjsBus.on('update-view', updateTree);

            $scope.$on("$destroy", function () {
                iVXjsBus.removeListener('update-view', updateTree);
            });

            function updateTree(tree) {
                updateView(tree);
            }

            function updateView(tree) {

                if (!tree) {
                    return;
                }

                var options = tree.options,
                    labels = tree.labels,
                    isStatic = tree.isStatic;

                var html = '';

                var viewSettings = options.map(function (selectableOptions, depth, options) {
                    var label = labels[depth];
                    var defaultDisplay = displayMap[label] ? displayMap[label] : "Select an option....";
                    var thisInput = {
                        id: input.id + '-' + depth,
                        options: tree.options[depth],
                        width: input.width,
                        name: input.id + '-' + depth,
                        label: label
                    };
                    var validClass = selectableOptions.length >= 1 ? 'cascade-dropdown-valid' : 'cascade-dropdown-invalid';
                    var OptionErrorMessages = new _messagesError.ErrorMessages(thisInput, errors, attributes);
                    var tagHTML = '\n                           ng-change=\'vm.modelUpdate(vm.currentSelection[' + depth + '], vm.event)\'\n                           ng-click="vm.event = $event"\n                           ng-options="option.name for option in vm.viewSettings.options[' + depth + '] track by option.key" \n                           ng-model=\'vm.currentSelection[' + depth + ']\'';

                    var uiOptionsObj = {
                        input: thisInput,
                        defaultDisplay: defaultDisplay,
                        settings: {},
                        tags: tagHTML,
                        errors: OptionErrorMessages
                    };

                    var selectorHTML = new iVXjsUIModule.options(uiOptionsObj).html;
                    var _input$settings2 = input.settings,
                        settings = _input$settings2 === undefined ? {} : _input$settings2;
                    var _settings$input2 = settings.input,
                        inputSettings = _settings$input2 === undefined ? {} : _settings$input2;


                    return {
                        html: '<div class=\'' + validClass + ' ivxjs-grid-1-1\'>' + selectorHTML + '</div>',
                        settings: inputSettings,
                        inputName: input.id + '-' + depth
                    };
                });

                html = '' + iVXjsUIModule.style.addWidthClasses(viewSettings);
                iElm.html(html);
                $compile(iElm.contents())($scope);

                $timeout(function () {

                    if (iVXjsUIModule.initializeInput) {
                        iVXjsUIModule.initializeInput();
                    };

                    tries += 1;
                    var isValid = !cascadeRequired;

                    if (cascadeRequired) {

                        viewSettings.forEach(function (viewSetting, index) {
                            var inputName = viewSetting.inputName;

                            var thisSelection = [].concat(controller.currentSelection)[index];
                            var hasSelection = typeof thisSelection !== 'undefined';
                            var hasFormInput = $scope.$parent && $scope.$parent.formInput && $scope.$parent.formInput[inputName];

                            if (hasSelection && thisSelection.items && hasFormInput) {
                                $scope.$parent.formInput[inputName].$setValidity('required', hasSelection);
                            }
                        });
                    }
                }, 1);
            }
        };
    }

    _createClass(CascadingOptions, [{
        key: 'templateHTML',
        get: function get() {
            return "<div></div>";
        }
    }]);

    return CascadingOptions;
}();

CascadingOptions.$inject = ['$compile', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui'];

exports.default = angular.module('ivx-js.directives.ui.cascading-options', []).directive('ivxjsCascadingOptionsInput', (0, _createFactoryFunction2.default)(CascadingOptions)).name;

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CascadingOptionsInputController = function (_InputControllerHelpe) {
    _inherits(CascadingOptionsInputController, _InputControllerHelpe);

    function CascadingOptionsInputController($scope, iVXjs, iVXjsBus, iVXjsActions) {
        _classCallCheck(this, CascadingOptionsInputController);

        var _this = _possibleConstructorReturn(this, (CascadingOptionsInputController.__proto__ || Object.getPrototypeOf(CascadingOptionsInputController)).call(this, $scope, iVXjs, iVXjsActions));

        var vm = _this;
        var inputData = $scope.inputData;

        var currentTree = Object.assign({}, inputData.dataTree);
        var name = inputData.name,
            _inputData$attributes = inputData.attributes,
            attributes = _inputData$attributes === undefined ? {} : _inputData$attributes;
        var _attributes$required = attributes.required,
            cascadeRequired = _attributes$required === undefined ? false : _attributes$required;
        var data = iVXjs.experience.data;
        var labels = currentTree.labels,
            items = currentTree.items,
            isStatic = currentTree.isStatic;


        vm.viewSettings = {
            labels: currentTree.labels,
            options: [currentTree.items],
            isStatic: isStatic
        };

        vm.currentSelection = [];
        vm.events = [].concat(_toConsumableArray(new Array(labels.length)));
        vm.currentTree = currentTree;

        vm.modelUpdate = function (selectedItem, event) {
            var _vm$viewSettings = vm.viewSettings,
                isStatic = _vm$viewSettings.isStatic,
                options = _vm$viewSettings.options;

            var mustBeAnswered = cascadeRequired || isStatic;

            if (selectedItem) {
                var hasItems = selectedItem && selectedItem.items && selectedItem.items.length && selectedItem.items.length > 0;

                var additionalEvent = hasItems ? {} : event;

                if (mustBeAnswered && !hasItems) {
                    var finalKeyParts = selectedItem.key.split('~');
                    var _editSelections = options.map(function (option, index) {
                        var hasSelection = typeof vm.currentSelection[index] !== 'undefined';

                        if (hasSelection) {
                            var hasKey = vm.currentSelection[index].key ? vm.currentSelection[index].key : false;
                            var tooFar = hasKey && hasKey.split("~").length > finalKeyParts.length ? true : false;

                            return tooFar ? {} : vm.currentSelection[index];
                        } else {
                            return {};
                        }
                    });

                    var newOptions = options.map(function (option, index) {
                        var hasSelection = typeof vm.currentSelection[index] !== 'undefined';

                        if (hasSelection) {
                            var hasKey = vm.currentSelection[index].key ? vm.currentSelection[index].key : false;
                            var tooFar = hasKey && hasKey.split("~").length > finalKeyParts.length ? true : false;

                            return tooFar ? [] : option;
                        } else {
                            return [];
                        }
                    });

                    vm.viewSettings = Object.assign({}, vm.viewSettings, {
                        options: newOptions
                    });
                    vm.currentSelection = _editSelections;

                    vm.onChange(selectedItem.key, additionalEvent);
                    updateModel();
                    return;
                } else if (!mustBeAnswered) {
                    vm.onChange(selectedItem.key, additionalEvent);
                }
            }
            var makeNull = false;

            var editSelections = options.map(function (option, index) {
                var hasSelection = typeof vm.currentSelection[index] !== 'undefined' && vm.currentSelection[index].items;

                if (hasSelection && !makeNull) {
                    return vm.currentSelection[index];
                } else {
                    makeNull = true;
                    return;
                }
            });

            vm.currentSelection = editSelections;
            updateModel();
        };

        vm.viewSettings = initializeViewSettings(vm.viewSettings, vm.currentTree, data[name]);

        updateModel();

        function initializeViewSettings(oldViewSettings, currentTree, key) {
            var newViewSettings = Object.assign({}, oldViewSettings);
            var _newViewSettings = newViewSettings,
                options = _newViewSettings.options,
                labels = _newViewSettings.labels;

            var newOptions = createStaticOptions(labels, options[0]);

            newViewSettings = Object.assign({}, newViewSettings, {
                options: newOptions
            });

            if (key && key.split) {
                var oldOptions = [].concat(options);
                var sections = key.split('~');
                var fullPath = '';
                var currentItems = [].concat(items);
                var selections = sections.reduce(function (theseSections, section, index) {
                    if (index === 0) {
                        fullPath = section;
                    } else {
                        fullPath = fullPath + '~' + section;
                    }

                    var currentItem = currentItems.find(function (item) {
                        return item.key === fullPath;
                    });

                    currentItems = [].concat(currentItem.items);

                    return [].concat(theseSections, currentItem);
                }, []);

                vm.currentSelection = selections;

                var editSelections = newViewSettings.options.map(function (option, index) {
                    var hasSelection = typeof vm.currentSelection[index] !== 'undefined';

                    if (hasSelection) {
                        return vm.currentSelection[index];
                    } else {
                        return {};
                    }
                });

                vm.currentSelection = editSelections;

                vm.isValid = true;
            }

            return newViewSettings;

            function createStaticOptions(labels, defaultOptions) {
                return labels.map(function (label, index) {
                    if (index === 0) {
                        return defaultOptions;
                    }
                    return [];
                });
            }
        }

        function updateModel() {
            var oldViewSettings = Object.assign({}, vm.viewSettings);
            var options = oldViewSettings.options,
                labels = oldViewSettings.labels,
                isStatic = oldViewSettings.isStatic;

            var selections = [].concat(vm.currentSelection);
            var keepAdding = true;
            var newOptions = selections.reduce(function (currentOptions, selection, depth) {
                var editOptions = [].concat(currentOptions);

                keepAdding = selection;

                if (keepAdding) {
                    if (selection && selection.items && selection.items.length > 0) {
                        editOptions = currentOptions.slice(0, 1).concat(currentOptions.slice(1, depth + 1)).concat([selection.items]).concat(currentOptions.slice(depth + 2));
                    }
                } else {
                    if (depth < labels.length - 1) {
                        editOptions = currentOptions.slice(0, 1).concat(currentOptions.slice(1, depth + 1)).concat([[]]).concat(currentOptions.slice(depth + 2));
                    }
                }

                return editOptions;
            }, options);

            var newViewSettings = Object.assign({}, vm.viewSettings, {
                options: newOptions
            });

            vm.viewSettings = newViewSettings;
            iVXjsBus.emit('update-view', newViewSettings);
        }

        return _this;
    }

    return CascadingOptionsInputController;
}(_inputController.InputControllerHelper);

CascadingOptionsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(CascadingOptionsInputController);

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputButtons = __webpack_require__(434);

var _inputButtons2 = _interopRequireDefault(_inputButtons);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ButtonsInput = function () {
    function ButtonsInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, ButtonsInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputButtons2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                labelHTML = _input.labelHTML,
                _input$label = _input.label,
                label = _input$label === undefined ? '' : _input$label,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? { required: 'Must click to continue.' } : _input$errors,
                _input$skip = _input.skip,
                skip = _input$skip === undefined ? { label: "Skip" } : _input$skip,
                buttons = _input.buttons,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var inputButtonData = buttons.map(function (button, index) {
                button = pullInTemplate.convertLabel(button.value, button, $scope);

                var _button = button,
                    label = _button.label,
                    labelHTML = _button.labelHTML,
                    value = _button.value,
                    _button$classes = _button.classes,
                    classes = _button$classes === undefined ? '' : _button$classes,
                    buttonId = _button.id;


                label = labelHTML ? labelHTML : label;

                return {
                    id: buttonId,
                    label: label,
                    attrHTML: 'ng-click=\'vm.onClick($event, vm.buttons[' + index + '])\'',
                    classes: classes,
                    value: value

                };
            });

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            if (!attributes.required) {
                skip = pullInTemplate.convertLabel('Skip', skip, $scope);

                var _skip = skip,
                    _label = _skip.label,
                    _labelHTML = _skip.labelHTML,
                    value = _skip.value,
                    _skip$classes = _skip.classes,
                    classes = _skip$classes === undefined ? '' : _skip$classes;


                _label = _labelHTML ? _labelHTML : _label;

                inputButtonData.push({
                    label: _label,
                    classes: classes
                });
            };

            var dataUIObj = {
                buttons: inputButtonData,
                input: input,
                errors: new _messagesError.ErrorMessages(name, errors, attributes)
            };
            var thisButtonsInput = new iVXjsUIModule.buttons(inputButtonData, input);
            var inputContainer = iElm.find('div');

            controller.iVXjs = iVXjs;

            iElm.html(thisButtonsInput.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(ButtonsInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return ButtonsInput;
}();

ButtonsInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.button', []).directive('ivxjsButtonsInput', (0, _createFactoryFunction2.default)(ButtonsInput)).name;

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonsInputController = function (_InputControllerHelpe) {
    _inherits(ButtonsInputController, _InputControllerHelpe);

    function ButtonsInputController($scope, iVXjs, iVXjsActions) {
        _classCallCheck(this, ButtonsInputController);

        var _this = _possibleConstructorReturn(this, (ButtonsInputController.__proto__ || Object.getPrototypeOf(ButtonsInputController)).call(this, $scope, iVXjs, iVXjsActions));

        var input = $scope.inputData;
        var $parent = $scope.$parent;
        var inputs = $parent.inputs,
            formInput = $parent.formInput,
            parentController = $parent.vm;


        _this.buttons = input.buttons;

        _this.onClick = function ($event, button) {
            $event.preventDefault();

            var _button$onClick = button.onClick,
                onClick = _button$onClick === undefined ? [] : _button$onClick;
            var element = $event.currentTarget;


            var actionArray = onClick.concat.apply(onClick, _toConsumableArray(onClick).concat([[{
                eventName: "setData",
                args: {
                    key: input.name,
                    value: button.value
                }
            }]]));

            iVXjs.log.debug('Button ' + input.name + ' On Click Start', {}, { input: input, source: 'onClick', status: 'started', actions: onClick, timestamp: Date.now() });

            iVXjsActions.resolveActions(actionArray, function () {
                if ($parent.hideSubmit) {
                    parentController.onSubmit($event);
                    iVXjs.log.debug('Button ' + input.name + ' On Click Actions Resolved', {}, { input: input, source: 'onClick', status: 'completed', actions: actionArray, timestamp: Date.now() });
                }
            }, iVXjsActions.createButtonClickSource($event, button.value));

            $parent.hideSubmit = inputs.length <= 1;

            return false;
        };
        return _this;
    }

    return ButtonsInputController;
}(_inputController.InputControllerHelper);

ButtonsInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(ButtonsInputController);

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputEmail = __webpack_require__(436);

var _inputEmail2 = _interopRequireDefault(_inputEmail);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmailInput = function () {
    function EmailInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, EmailInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputEmail2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                type = _input.type,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var uiEmailObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var email = new iVXjsUIModule.email(uiEmailObj);

            iElm.html(email.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(EmailInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return EmailInput;
}();

EmailInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.email', []).directive('ivxjsEmailInput', (0, _createFactoryFunction2.default)(EmailInput)).name;

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailInputController = function (_InputControllerHelpe) {
	_inherits(EmailInputController, _InputControllerHelpe);

	function EmailInputController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, EmailInputController);

		return _possibleConstructorReturn(this, (EmailInputController.__proto__ || Object.getPrototypeOf(EmailInputController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return EmailInputController;
}(_inputController.InputControllerHelper);

EmailInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(EmailInputController);

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputUrl = __webpack_require__(438);

var _inputUrl2 = _interopRequireDefault(_inputUrl);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlInput = function () {
    function UrlInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, UrlInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputUrl2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                type = _input.type,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var uiUrlObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var url = new iVXjsUIModule.url(uiUrlObj);

            iElm.html(url.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(UrlInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return UrlInput;
}();

UrlInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.url', []).directive('ivxjsUrlInput', (0, _createFactoryFunction2.default)(UrlInput)).name;

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URLInputController = function (_InputControllerHelpe) {
	_inherits(URLInputController, _InputControllerHelpe);

	function URLInputController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, URLInputController);

		return _possibleConstructorReturn(this, (URLInputController.__proto__ || Object.getPrototypeOf(URLInputController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return URLInputController;
}(_inputController.InputControllerHelper);

URLInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(URLInputController);

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputDate = __webpack_require__(440);

var _inputDate2 = _interopRequireDefault(_inputDate);

var _messagesError = __webpack_require__(23);

var _dateParser = __webpack_require__(154);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateInput = function () {
    function DateInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, DateInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputDate2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;


            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            if (attributes.min) {
                var dateMin = new _dateParser.DateParser(attributes.min).formatForDateInput();

                attributes.min = '' + dateMin;
            }

            if (attributes.max) {
                var dateMax = new _dateParser.DateParser(attributes.max).formatForDateInput();

                attributes.max = '' + dateMax;
            }

            input.label = label ? label : $filter('stringParsers')('startCase', id);

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);

            $scope.inputValue = iVXjs.experience.data[name] ? iVXjs.experience.data[name] : '';

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';
            var uiDateObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var date = new iVXjsUIModule.date(uiDateObj);

            iElm.html(date.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(DateInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return DateInput;
}();

DateInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.date', []).directive('ivxjsDateInput', (0, _createFactoryFunction2.default)(DateInput)).name;

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateController = function (_InputControllerHelpe) {
	_inherits(DateController, _InputControllerHelpe);

	function DateController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, DateController);

		return _possibleConstructorReturn(this, (DateController.__proto__ || Object.getPrototypeOf(DateController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return DateController;
}(_inputController.InputControllerHelper);

DateController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(DateController);

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputDateTimeLocal = __webpack_require__(442);

var _inputDateTimeLocal2 = _interopRequireDefault(_inputDateTimeLocal);

var _messagesError = __webpack_require__(23);

var _dateParser = __webpack_require__(154);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateTimeLocalInput = function () {
    function DateTimeLocalInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, DateTimeLocalInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputDateTimeLocal2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;


            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);

            if (attributes.min) {
                var dateMin = new _dateParser.DateParser(attributes.min).formatForDateTimeLocalInput();
                attributes.min = '' + dateMin;
            }

            if (attributes.max) {
                var dateMax = new _dateParser.DateParser(attributes.max).formatForDateTimeLocalInput();
                attributes.max = '' + dateMax;
            }

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var uiDatetimeLocalObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };

            var datetimeLocal = new iVXjsUIModule.datetimeLocal(uiDatetimeLocalObj);

            iElm.html(datetimeLocal.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(DateTimeLocalInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return DateTimeLocalInput;
}();

DateTimeLocalInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.datetime-local', []).directive('ivxjsDatetimeLocalInput', (0, _createFactoryFunction2.default)(DateTimeLocalInput)).name;

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeLocalController = function (_InputControllerHelpe) {
    _inherits(DateTimeLocalController, _InputControllerHelpe);

    function DateTimeLocalController($scope, iVXjs, iVXjsActions) {
        _classCallCheck(this, DateTimeLocalController);

        return _possibleConstructorReturn(this, (DateTimeLocalController.__proto__ || Object.getPrototypeOf(DateTimeLocalController)).call(this, $scope, iVXjs, iVXjsActions));
    }

    return DateTimeLocalController;
}(_inputController.InputControllerHelper);

DateTimeLocalController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(DateTimeLocalController);

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputOptions = __webpack_require__(444);

var _inputOptions2 = _interopRequireDefault(_inputOptions);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionsInput = function () {
    function OptionsInput($compile, $filter, iVXjs, iVXjsUIModule, iVXjsBus, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, OptionsInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.scope = {
            inputData: '=inputData'
        };

        this.controller = _inputOptions2.default;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                name = _input.name,
                labelHTML = _input.labelHTML,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                options = _input.options,
                defaultDisplay = _input.defaultDisplay,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;
            var _settings$directives = settings.directives,
                directives = _settings$directives === undefined ? '' : _settings$directives;

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var defaultOptionTag = '<option value="">Select an option...</option>';
            var tagHTML = directives + '\n                           ng-change=\'vm.onChange(vm.selected.value, event)\'\n                           ng-click="event = $event"\n                           ng-options="option.display for option in inputData.options track by option.value" \n                           ng-model=\'vm.selected\'';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = input.label ? input.label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            if (attributes.required || defaultDisplay) {
                defaultOptionTag = defaultDisplay ? '<option value="">' + defaultDisplay + '</option>' : defaultOptionTag;
            }

            var uiOptionsObj = {
                input: input,
                defaultDisplay: defaultDisplay,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages

            };
            var optionsClass = new iVXjsUIModule.options(uiOptionsObj);

            iElm.html(optionsClass.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(OptionsInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return OptionsInput;
}();

OptionsInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.options', []).directive('ivxjsOptionsInput', (0, _createFactoryFunction2.default)(OptionsInput)).name;

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

var _typeParsers = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validator = new _typeParsers.TypeValidator();

var OptionsInputController = function (_InputControllerHelpe) {
    _inherits(OptionsInputController, _InputControllerHelpe);

    function OptionsInputController($scope, $timeout, iVXjs, iVXjsActions) {
        _classCallCheck(this, OptionsInputController);

        var _this = _possibleConstructorReturn(this, (OptionsInputController.__proto__ || Object.getPrototypeOf(OptionsInputController)).call(this, $scope, iVXjs, iVXjsActions));

        var _$scope$inputData = $scope.inputData,
            defaultValue = _$scope$inputData.defaultValue,
            options = _$scope$inputData.options,
            name = _$scope$inputData.name,
            _$scope$inputData$att = _$scope$inputData.attributes,
            attributes = _$scope$inputData$att === undefined ? {} : _$scope$inputData$att;

        var experienceValue = iVXjs.experience.data[name];

        _this.selected = {
            value: experienceValue ? experienceValue : ''
        };

        $timeout(function () {
            if (attributes.required) {
                $scope.$parent.formInput[name].$setValidity('required', !validator.isEmpty(experienceValue));
                $scope.$parent.formInput[name].$error.required = true;
            }
        }, 1);
        return _this;
    }

    return OptionsInputController;
}(_inputController.InputControllerHelper);

OptionsInputController.$inject = ['$scope', '$timeout', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(OptionsInputController);

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputRadio = __webpack_require__(446);

var _inputRadio2 = _interopRequireDefault(_inputRadio);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RadioInput = function () {
    function RadioInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, RadioInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputRadio2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                name = _input.name,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                _input$radioButtons = _input.radioButtons,
                radioButtons = _input$radioButtons === undefined ? [] : _input$radioButtons,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var radioErrorRequired = '';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            if (attributes.required) {
                radioErrorRequired = 'required="!radioSelected"';
            }

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var inputRadioButtonData = radioButtons.map(function (radioButton, index) {
                radioButton = pullInTemplate.convertLabel('', radioButton, $scope);

                var _radioButton = radioButton,
                    label = _radioButton.label,
                    labelHTML = _radioButton.labelHTML,
                    value = _radioButton.value,
                    _radioButton$classes = _radioButton.classes,
                    classes = _radioButton$classes === undefined ? '' : _radioButton$classes;


                if (labelHTML) label = labelHTML;

                return {
                    label: label,
                    attrHTML: 'ng-click=\'vm.onChange(radioSelected, $event)\' ng-model=\'radioSelected\' value=\'' + value + '\' ' + radioErrorRequired,
                    classes: classes

                };
            });

            var uiRadioObj = {
                input: input,
                radios: inputRadioButtonData,
                errors: errorMessages,
                settings: settings
            };
            var thisRadiosInput = new iVXjsUIModule.radio(uiRadioObj);

            iElm.html(thisRadiosInput.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(RadioInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return RadioInput;
}();

RadioInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.radio', []).directive('ivxjsRadioInput', (0, _createFactoryFunction2.default)(RadioInput)).name;

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioInputController = function (_InputControllerHelpe) {
    _inherits(RadioInputController, _InputControllerHelpe);

    function RadioInputController($scope, iVXjs, iVXjsActions) {
        _classCallCheck(this, RadioInputController);

        var _this = _possibleConstructorReturn(this, (RadioInputController.__proto__ || Object.getPrototypeOf(RadioInputController)).call(this, $scope, iVXjs, iVXjsActions));

        var name = $scope.inputData.name;


        $scope.radioSelected = iVXjs.experience.data[name];
        return _this;
    }

    return RadioInputController;
}(_inputController.InputControllerHelper);

RadioInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(RadioInputController);

/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputCheckbox = __webpack_require__(448);

var _inputCheckbox2 = _interopRequireDefault(_inputCheckbox);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckboxInput = function () {
    function CheckboxInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, CheckboxInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputCheckbox2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var tagHTML = 'ng-click="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var checkboxUIObj = {
                input: input,
                tags: tagHTML,
                settings: settings,
                errors: new _messagesError.ErrorMessages(input, errors, attributes)
            };
            var checkBox = new iVXjsUIModule.checkbox(checkboxUIObj);

            iElm.html(checkBox.html);

            $compile(iElm.contents())($scope);
        };
    }

    _createClass(CheckboxInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return CheckboxInput;
}();

CheckboxInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.checkbox', []).directive('ivxjsCheckboxInput', (0, _createFactoryFunction2.default)(CheckboxInput)).name;

/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxInputController = function (_InputControllerHelpe) {
	_inherits(CheckboxInputController, _InputControllerHelpe);

	function CheckboxInputController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, CheckboxInputController);

		return _possibleConstructorReturn(this, (CheckboxInputController.__proto__ || Object.getPrototypeOf(CheckboxInputController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return CheckboxInputController;
}(_inputController.InputControllerHelper);

CheckboxInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(CheckboxInputController);

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputNumber = __webpack_require__(450);

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberInput = function () {
    function NumberInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, NumberInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputNumber2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                type = _input.type,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var uiNumberObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var number = new iVXjsUIModule.number(uiNumberObj);

            iElm.html(number.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(NumberInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return NumberInput;
}();

NumberInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.number', []).directive('ivxjsNumberInput', (0, _createFactoryFunction2.default)(NumberInput)).name;

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberInputController = function (_InputControllerHelpe) {
	_inherits(NumberInputController, _InputControllerHelpe);

	function NumberInputController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, NumberInputController);

		return _possibleConstructorReturn(this, (NumberInputController.__proto__ || Object.getPrototypeOf(NumberInputController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return NumberInputController;
}(_inputController.InputControllerHelper);

NumberInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(NumberInputController);

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputTextarea = __webpack_require__(452);

var _inputTextarea2 = _interopRequireDefault(_inputTextarea);

var _messagesError = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextAreaInput = function () {
    function TextAreaInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        _classCallCheck(this, TextAreaInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputTextarea2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var _input = input,
                id = _input.id,
                name = _input.name,
                _input$errors = _input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                labelHTML = _input.labelHTML,
                label = _input.label,
                _input$attributes = _input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                type = _input.type,
                _input$settings = _input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;

            var errorMessages = new _messagesError.ErrorMessages(input, errors, attributes);
            var tagHTML = 'ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"';

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            var uiTextareaObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var textarea = new iVXjsUIModule.textarea(uiTextareaObj);

            iElm.html(textarea.html);
            $compile(iElm.contents())($scope);
        };
    }

    _createClass(TextAreaInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return TextAreaInput;
}();

TextAreaInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

exports.default = angular.module('ivx-js.directives.input.textarea', []).directive('ivxjsTextareaInput', (0, _createFactoryFunction2.default)(TextAreaInput)).name;

/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextAreaInputController = function (_InputControllerHelpe) {
	_inherits(TextAreaInputController, _InputControllerHelpe);

	function TextAreaInputController($scope, iVXjs, iVXjsActions) {
		_classCallCheck(this, TextAreaInputController);

		return _possibleConstructorReturn(this, (TextAreaInputController.__proto__ || Object.getPrototypeOf(TextAreaInputController)).call(this, $scope, iVXjs, iVXjsActions));
	}

	return TextAreaInputController;
}(_inputController.InputControllerHelper);

TextAreaInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(TextAreaInputController);

/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoYoutube = __webpack_require__(454);

var _videoYoutube2 = _interopRequireDefault(_videoYoutube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeVideoPlayer = function () {
    function YoutubeVideoPlayer($rootScope, $compile, $window, iVXjsBus, iVXjsLog, iVXjsVideoModule, iVXjsVideoService, iVXjs) {
        _classCallCheck(this, YoutubeVideoPlayer);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            playerId: "@playerId",
            settings: "=settings",
            stateData: "=stateData"
        };
        this.controller = _videoYoutube2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            if (!iVXjsVideoModule.youtube) return;

            var _$scope$settings = $scope.settings,
                settings = _$scope$settings === undefined ? {} : _$scope$settings,
                _$scope$stateData = $scope.stateData,
                passedStateData = _$scope$stateData === undefined ? {} : _$scope$stateData,
                playerId = $scope.playerId;
            var youtubeId = settings.youtubeId;

            var cuepointFunction = void 0;
            var stateData = Object.assign({}, passedStateData);

            var playerSettings = Object.assign({}, settings, {
                playerId: playerId,
                id: youtubeId
            });

            if (stateData.cuePoints) {
                playerSettings.cuePoints = stateData.cuePoints;
            }

            var YouTubePlayer = new iVXjsVideoModule.youtube(iElm.find('div')[0], playerSettings, stateData, iVXjsLog);

            controller.player = YouTubePlayer;
            controller.playerId = playerId;

            $compile(iElm.contents())($scope);

            if (typeof YT === 'undefined') {
                $window.onYouTubeIframeAPIReady = init;
            } else {
                YT.ready(init);
            }

            function init() {
                YouTubePlayer.createPlayer();
                YouTubePlayer.addEventListeners(iVXjsBus);
                cuepointFunction = iVXjsVideoService.createCuePointListener(playerId, playerSettings.cuePoints);
            }

            $scope.$on("$destroy", function () {
                YouTubePlayer.dispose(iVXjsBus);
                iVXjsVideoService.removeCuePointListener(cuepointFunction);
            });
        };
    }

    _createClass(YoutubeVideoPlayer, [{
        key: 'templateHTML',
        get: function get() {
            return '\n           <div class="youtube-player-container">\n               <div id="{{playerId}}"></div>\n           </div>';
        }
    }]);

    return YoutubeVideoPlayer;
}();

YoutubeVideoPlayer.$inject = ['$rootScope', '$compile', '$window', 'ivxjs.bus', 'ivxjs.log', 'ivxjs.modules.video', "iVXjsVideoService", "iVXjs"];

exports.default = angular.module('ivx-js.directives.video.youtube', []).directive('ivxjsYoutubeVideoPlayer', (0, _createFactoryFunction2.default)(YoutubeVideoPlayer)).name;

/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeVideoPlayerController = function YoutubeVideoPlayerController($rootScope, $scope, $window, iVXjsBus, iVXjs) {
   _classCallCheck(this, YoutubeVideoPlayerController);
};

YoutubeVideoPlayerController.$inject = ['$rootScope', '$scope', '$window', 'ivxjs.bus', 'iVXjs'];

exports.default = (0, _createFactoryFunction2.default)(YoutubeVideoPlayerController);

/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoHtml = __webpack_require__(456);

var _videoHtml2 = _interopRequireDefault(_videoHtml);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTML5VideoPlayer = function () {
    function HTML5VideoPlayer($compile, $timeout, iVXjsVideoModule, iVXjsBus, iVXjsLog, createInlineVideo, iVXjsVideoService, iVXjs) {
        _classCallCheck(this, HTML5VideoPlayer);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            settings: "=settings",
            playerId: "@playerId",
            stateData: "=stateData"
        };
        this.controller = _videoHtml2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var playerSettings = $scope.settings,
                _$scope$stateData = $scope.stateData,
                stateData = _$scope$stateData === undefined ? {} : _$scope$stateData,
                playerId = $scope.playerId;
            var statePlayerSettings = stateData.playerSettings;

            var videoEventNames = new _videoEvents2.default();
            var settings = {};

            if (statePlayerSettings) {
                settings = statePlayerSettings;
                settings.cuePoints = statePlayerSettings.cuePoints ? statePlayerSettings.cuePoints : stateData.cuePoints;
            } else {
                settings = playerSettings;
            }

            settings = Object.assign(settings, {
                isiOS: createInlineVideo.isiOS(),
                id: playerId
            });

            controller.playerId = playerId;

            var thisVideoPlayer = new iVXjsVideoModule.html5(iElm.find('div')[0], settings, stateData, iVXjsLog);

            thisVideoPlayer.addEventListeners(iVXjsBus, settings);

            $timeout(function () {
                var _settings = settings,
                    _settings$iphoneInlin = _settings.iphoneInline,
                    iphoneInline = _settings$iphoneInlin === undefined ? false : _settings$iphoneInlin;


                if (createInlineVideo.isiOS() && iphoneInline) {
                    createInlineVideo.makeInlineVideo(iElm.find('video')[0], iElm.find('div')[0], $scope);
                    createInlineVideo.emitCanPlay(iElm.find('video')[0]);
                }
            }, 1);

            controller.player = thisVideoPlayer;

            $compile(iElm.contents())($scope);

            var cuepointFunction = iVXjsVideoService.createCuePointListener(thisVideoPlayer.player.id, settings.cuePoints);

            $scope.$on('$destroy', function () {
                thisVideoPlayer.dispose(iVXjsBus);
                iVXjsVideoService.removeCuePointListener(cuepointFunction);
            });
        };
    }

    _createClass(HTML5VideoPlayer, [{
        key: 'templateHTML',
        get: function get() {
            return '<div class="video-player-container"></div>';
        }
    }]);

    return HTML5VideoPlayer;
}();

HTML5VideoPlayer.$inject = ['$compile', '$timeout', 'ivxjs.modules.video', 'ivxjs.bus', 'ivxjs.log', 'createInlineVideo', 'iVXjsVideoService', 'iVXjs'];

exports.default = angular.module('ivx-js.directives.video.html5', []).directive('ivxjsHtml5VideoPlayer', (0, _createFactoryFunction2.default)(HTML5VideoPlayer)).name;

/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTML5VideoPlayerController = function HTML5VideoPlayerController($scope, iVXjsBus, iVXjsVideoService) {
    "ngInject";

    _classCallCheck(this, HTML5VideoPlayerController);
};

HTML5VideoPlayerController.$inject = ['$scope', 'ivxjs.bus', 'iVXjsVideoService'];

exports.default = (0, _createFactoryFunction2.default)(HTML5VideoPlayerController);

/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoVimeo = __webpack_require__(458);

var _videoVimeo2 = _interopRequireDefault(_videoVimeo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VimeoVideoPlayer = function () {
    function VimeoVideoPlayer($rootScope, $compile, $window, $timeout, iVXjsBus, iVXjsLog, iVXjsVideoModule, createInlineVideo, iVXjsVideoService) {
        _classCallCheck(this, VimeoVideoPlayer);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            playerId: "@playerId",
            settings: "=settings",
            stateData: "=stateData"
        };
        this.controller = _videoVimeo2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            if (!iVXjsVideoModule.vimeo) return;

            var _$scope$settings = $scope.settings,
                settings = _$scope$settings === undefined ? {} : _$scope$settings,
                _$scope$stateData = $scope.stateData,
                passedStateData = _$scope$stateData === undefined ? {} : _$scope$stateData,
                playerId = $scope.playerId;


            var stateData = Object.assign({}, passedStateData);

            var playerSettings = Object.assign({}, settings, {
                playerId: playerId,
                id: settings.vimeoId
            });

            if (stateData.cuePoints) {
                playerSettings.cuePoints = stateData.cuePoints;
            }

            console.dir();

            var VimeoPlayer = new iVXjsVideoModule.vimeo(iElm.find('div')[0], playerSettings, stateData, iVXjsLog, {
                vimeoPlayerContainer: iElm[0]
            });

            VimeoPlayer.addEventListeners(iVXjsBus);

            controller.player = VimeoPlayer;

            $compile(iElm.contents())($scope);

            iVXjsVideoService.createCuePointListener(playerId, playerSettings.cuePoints);

            $scope.$on('$destroy', function () {
                VimeoPlayer.dispose(iVXjsBus);
                iVXjsVideoService.createCuePointListener;
            });
        };
    }

    _createClass(VimeoVideoPlayer, [{
        key: 'templateHTML',
        get: function get() {
            return '\n            <div class="vimeo-player-container">\n                <div></div>\n            </div>';
        }
    }]);

    return VimeoVideoPlayer;
}();

VimeoVideoPlayer.$inject = ['$rootScope', '$compile', '$window', '$timeout', 'ivxjs.bus', 'ivxjs.log', 'ivxjs.modules.video', 'createInlineVideo', 'iVXjsVideoService'];

exports.default = angular.module('ivx-js.directives.video.vimeo', []).directive('ivxjsVimeoVideoPlayer', (0, _createFactoryFunction2.default)(VimeoVideoPlayer)).name;

/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VimeoVideoPlayerController = function VimeoVideoPlayerController($scope, iVXjsBus) {
    _classCallCheck(this, VimeoVideoPlayerController);
};

VimeoVideoPlayerController.$inject = ['$scope', 'ivxjs.bus'];

exports.default = (0, _createFactoryFunction2.default)(VimeoVideoPlayerController);

/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _embeddedViewCustom = __webpack_require__(460);

var _embeddedViewCustom2 = _interopRequireDefault(_embeddedViewCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmbeddedViewCustom = function () {
    function EmbeddedViewCustom($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate) {
        _classCallCheck(this, EmbeddedViewCustom);

        Object.assign(this, {
            template: this.templateHTML,
            restrict: 'E',
            replace: true,
            scope: {
                viewData: '='
            },
            controller: _embeddedViewCustom2.default,
            controllerAs: 'vm'
        });

        this.link = function ($scope, iElm, iAttrs, controller) {};
    }

    _createClass(EmbeddedViewCustom, [{
        key: 'templateHTML',
        get: function get() {
            return '\n            <div class="ivx-embedded-view ivx-embedded-view-custom {{viewData.classes}}" ui-view="{{viewData.id}}"></div>\n       ';
        }
    }]);

    return EmbeddedViewCustom;
}();

EmbeddedViewCustom.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate'];

exports.default = angular.module('ivx-js.directives.embedded.custom', []).directive('ivxjsEmbeddedViewCustom', (0, _createFactoryFunction2.default)(EmbeddedViewCustom)).name;

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmbeddedViewCustomController = function EmbeddedViewCustomController($scope, $window, iVXjsActions, iVXjsAudio, iVXjs) {
	_classCallCheck(this, EmbeddedViewCustomController);
};

EmbeddedViewCustomController.$inject = ['$scope', '$window', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

exports.default = (0, _createFactoryFunction2.default)(EmbeddedViewCustomController);

/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoControlsStandard = __webpack_require__(462);

var _videoControlsStandard2 = _interopRequireDefault(_videoControlsStandard);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var videoEventNames = new _videoEvents2.default();

var StandardControls = function () {
    function StandardControls(iVXjsUI, iVXjsBus, iVXjs) {
        _classCallCheck(this, StandardControls);

        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            playerId: "@playerId",
            controlSettings: "=controlSettings"
        };
        this.controller = _videoControlsStandard2.default;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            var playerId = $scope.playerId,
                controlSettings = $scope.controlSettings;
            var _controlSettings$clas = controlSettings.classes,
                classes = _controlSettings$clas === undefined ? '' : _controlSettings$clas;


            var videoControlContainer = iElm.find('div')[0];

            videoControlContainer.className = videoControlContainer.className + ' ' + classes;

            var standardControls = new iVXjsUI.videoControls(videoControlContainer, playerId);

            controller.controls = standardControls;
            controller.playerId = playerId;

            standardControls.addEventListeners(iVXjsBus);

            $scope.$on('$destroy', function () {
                standardControls.dispose(iVXjsBus);
            });
        };
    }

    _createClass(StandardControls, [{
        key: 'templateHTML',
        get: function get() {
            return '<div class="video-control-container ivx-video-controls-container"></div>';
        }
    }]);

    return StandardControls;
}();

StandardControls.$inject = ['ivxjs.modules.ui', 'ivxjs.bus', 'iVXjs'];

exports.default = angular.module('ivx-js.directives.video.standard-controls', []).directive('ivxjsStandardVideoControls', (0, _createFactoryFunction2.default)(StandardControls)).name;

/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StandardControls = function StandardControls(iVXjsBus) {
    _classCallCheck(this, StandardControls);
};

StandardControls.$inject = ['ivxjs.bus'];

exports.default = (0, _createFactoryFunction2.default)(StandardControls);

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


var SetData = function SetData(iVXjs, iVXjsActionTemplateService) {
    _classCallCheck(this, SetData);

    this.restrict = 'A';
    this.controller = ["iVXjs", function (iVXjs) {}];
    this.link = function ($scope, iElm, iAttrs, controller) {
        iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getSetDataEventObj);

        function _getSetDataEventObj() {
            var args = _extractKeyValue(iAttrs.ivxSetData);

            return {
                eventName: "setData",
                args: args
            };
        }

        function _extractKeyValue() {
            var valueString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            var updatedValue = valueString.trim();
            var parts = updatedValue.split(',');

            parts = parts.map(function (part, index) {
                var newPart = part.trim();

                newPart = newPart.replace(/[{}]/g, "");

                if (index === 0) {
                    newPart = newPart.replace(/[\'\"]/g, "");
                }

                return newPart;
            });

            var key = parts[0];
            var value = parts[1] === "true" || parts[1] === "false" ? parts[1] === "true" : parts[1];

            return { key: key, value: value };
        }
    };
};

SetData.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

exports.default = angular.module('ivx-js.directives.template.set-data', []).directive('ivxSetData', (0, _createFactoryFunction2.default)(SetData)).name;

/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


var AnimateElement = function AnimateElement(iVXjs, iVXjsActionTemplateService) {
    _classCallCheck(this, AnimateElement);

    this.restrict = 'A';
    this.controller = ["iVXjs", function (iVXjs) {}];
    this.link = function ($scope, iElm, iAttrs, controller) {
        iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getAnimateElementEventObj);

        function _getAnimateElementEventObj() {
            var value = iAttrs.ivxAnimate;

            var args = extractAnimateArgs(value);

            return {
                eventName: "animateElement",
                args: args
            };
        }

        function extractAnimateArgs() {
            var valueString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var updatedValue = valueString.trim();
            var parts = updatedValue.split(',');

            parts = parts.map(function (part, index) {
                var newPart = part.trim();

                newPart = newPart.replace(/[{}\'\"]/g, "");

                return newPart;
            });

            var element = parts[0];
            var animationClasses = parts[1] === "true" || parts[1] === "false" ? parts[1] === "true" : parts[1];

            return { element: element, animationClasses: animationClasses };
        }
    };
};

AnimateElement.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

exports.default = angular.module('ivx-js.directives.template.animate-element', []).directive('ivxAnimate', (0, _createFactoryFunction2.default)(AnimateElement)).name;

/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


var GoToState = function GoToState(iVXjs, iVXjsBus, iVXjsActionTemplateService) {
    _classCallCheck(this, GoToState);

    this.restrict = 'A';
    this.controller = ["iVXjs", function (iVXjs) {}];
    this.link = function ($scope, iElm, iAttrs, controller) {
        iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getiVXGoToStateEventObj);

        function _getiVXGoToStateEventObj() {
            var stateId = iAttrs.ivxGoToState;
            var eventName = iVXjs.constants.STATE.EVENTS.GO;


            return {
                eventName: eventName,
                args: { stateId: stateId }
            };
        }
    };
};

GoToState.$inject = ['iVXjs', 'ivxjs.bus', 'iVXjsActionTemplateService'];

exports.default = angular.module('ivx-js.directives.template.go-to-state', []).directive('ivxGoToState', (0, _createFactoryFunction2.default)(GoToState)).name;

/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

var RaiseiVXjsEvent = function RaiseiVXjsEvent(iVXjs, iVXjsActionTemplateService) {
    _classCallCheck(this, RaiseiVXjsEvent);

    this.restrict = 'A';
    this.controller = ["iVXjs", function (iVXjs) {}];
    this.link = function ($scope, iElm, iAttrs, controller) {
        iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getRaiseEventEventObj);

        function _getRaiseEventEventObj() {
            var _iAttrs$ivxEventArgs = iAttrs.ivxEventArgs,
                value = _iAttrs$ivxEventArgs === undefined ? {} : _iAttrs$ivxEventArgs,
                eventName = iAttrs.ivxEvent;


            try {
                var args = $scope.$eval(value);

                return {
                    eventName: eventName,
                    args: args
                };
            } catch (e) {
                iVXjs.log.error({ message: 'Can\'t fire event due attribute not being a valid object. Please check your template definition for \'ivx-event-args\'.' });
            }
        }
    };
};

RaiseiVXjsEvent.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

exports.default = angular.module('ivx-js.directives.template.raise-ivx-event', []).directive('ivxEvent', (0, _createFactoryFunction2.default)(RaiseiVXjsEvent)).name;

/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

var RemoveClasses = function RemoveClasses(iVXjs, iVXjsActionTemplateService) {
    _classCallCheck(this, RemoveClasses);

    this.restrict = 'A';
    this.controller = ["iVXjs", function (iVXjs) {}];
    this.link = function ($scope, iElm, iAttrs, controller) {
        iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getRemoveClassesEventObj);

        function _getRemoveClassesEventObj() {
            var value = iAttrs.ivxRemoveClasses;


            try {
                var args = $scope.$eval(value);

                return {
                    eventName: "removeClasses",
                    args: args
                };
            } catch (e) {
                iVXjs.log.error({ message: 'Can\'t fire event due attribute not being a valid object. Please check your template definition for \'ivx-remove-classes\'.' });
            }
        };
    };
};

RemoveClasses.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

exports.default = angular.module('ivx-js.directives.template.remove-classes', []).directive('ivxRemoveClasses', (0, _createFactoryFunction2.default)(RemoveClasses)).name;

/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

var AddClasses = function AddClasses(iVXjs, iVXjsActionTemplateService) {
    _classCallCheck(this, AddClasses);

    this.restrict = 'A';
    this.controller = ["iVXjs", function (iVXjs) {}];
    this.link = function ($scope, iElm, iAttrs, controller) {
        iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getAddClassesEventObj);

        function _getAddClassesEventObj() {
            var value = iAttrs.ivxAddClasses;


            try {
                var args = $scope.$eval(value);

                return {
                    eventName: "addClasses",
                    args: args
                };
            } catch (e) {
                iVXjs.log.error({ message: 'Can\'t fire event due attribute not being a valid object. Please check your template definition for \'ivx-add-classes\'.' });
            }
        }
    };
};

AddClasses.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

exports.default = angular.module('ivx-js.directives.template.add-classes', []).directive('ivxAddClasses', (0, _createFactoryFunction2.default)(AddClasses)).name;

/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ivxjs = __webpack_require__(470);

var _ivxjs2 = _interopRequireDefault(_ivxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.providers', [_ivxjs2.default]).name;

/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stateGenerator = function () {
    function stateGenerator() {
        _classCallCheck(this, stateGenerator);
    }

    _createClass(stateGenerator, [{
        key: '$get',
        value: function $get() {
            var self = this;
            return {
                addViews: function addViews(embeddedViews, parentTemplate) {
                    embeddedViews.forEach(function (embeddedView, index) {
                        var appendTo = embeddedView.appendTo,
                            id = embeddedView.id,
                            type = embeddedView.type;

                        var domNode = document.querySelector(appendTo);

                        if (!domNode) {
                            self.iVXjs.log.warn('Can\'t find element with selector, "' + appendTo + '" to embedded this view. Check to make sure you have this element defined in either your header, footer or is an element in the existing state.');
                            return;
                        }

                        var uiContainer = angular.element(domNode);
                        var view = angular.element('<ivxjs-embedded-view-' + type + ' id="' + id + '" view-data="stateData.embeddedViews[' + index + ']"></ivxjs-embedded-view-' + type + '>');

                        uiContainer.append(view);
                    });
                }
            };
        }
    }, {
        key: 'create',
        value: function create($stateProvider, iVXjs) {
            var _iVXjs$config$states = iVXjs.config.states,
                states = _iVXjs$config$states === undefined ? [] : _iVXjs$config$states;


            Object.assign(this, {
                iVXjs: iVXjs,
                $stateProvider: $stateProvider,
                states: states
            });

            this._createParentStates();
        }
    }, {
        key: 'buildDefaultUrl',
        value: function buildDefaultUrl(iVXjs, defaultStateId) {
            var defaultStateIdParts = defaultStateId.split('.');
            var defaultUrl = defaultStateIdParts.reduce(function (url, stateIdPart, index) {
                var state = iVXjs.config.states.find(function (state) {
                    return state.id === stateIdPart;
                });

                if (!state) return url;
                if (index === 0) return state.url;

                return '' + url + state.url;
            }, '');

            return defaultUrl;
        }
    }, {
        key: 'setDefaultUrl',
        value: function setDefaultUrl($urlRouterProvider, defaultState, iVXjs) {
            var defaultStateID = iVXjs.rules(defaultState);

            var _iVXjs$config$states$ = iVXjs.config.states.find(function (state) {
                return state.id === defaultStateID;
            }),
                url = _iVXjs$config$states$.url;

            $urlRouterProvider.otherwise(url);
        }
    }, {
        key: '_generateStateData',
        value: function _generateStateData(state) {
            var self = this;
            var _state$embeddedViews = state.embeddedViews,
                embeddedViews = _state$embeddedViews === undefined ? [] : _state$embeddedViews;

            var embeddedStateData = embeddedViews.reduce(function (embeddedData, currentEmbeddedData, index) {
                var stateSpec = self._createiVXjsStateSpec(currentEmbeddedData);

                embeddedData[stateSpec.id] = stateSpec;

                return embeddedData;
            }, {});

            return {
                stateData: state,
                embeddedStateData: embeddedStateData
            };
        }
    }, {
        key: '_generateStateData',
        value: function _generateStateData(state) {
            var self = this;
            var _state$embeddedViews2 = state.embeddedViews,
                embeddedViews = _state$embeddedViews2 === undefined ? [] : _state$embeddedViews2;

            var embeddedStateData = embeddedViews.reduce(function (embeddedData, currentEmbeddedData, index) {
                var stateSpec = self._createiVXjsStateSpec(currentEmbeddedData);

                embeddedData[stateSpec.id] = stateSpec;

                return embeddedData;
            }, {});

            return {
                stateData: state,
                embeddedStateData: embeddedStateData
            };
        }
    }, {
        key: '_createEmbeddedState',
        value: function _createEmbeddedState(embeddedView, parentData) {
            var _this = this;

            var self = this;
            var _iVXjs$config$states2 = this.iVXjs.config.states,
                states = _iVXjs$config$states2 === undefined ? [] : _iVXjs$config$states2;
            var _embeddedView$states = embeddedView.states,
                embeddedViews = _embeddedView$states === undefined ? [] : _embeddedView$states;


            embeddedViews.forEach(function (embeddedState) {
                var embeddedStateData = states.find(function (state) {
                    return state.id === embeddedState.stateId;
                });

                _this._createRouterSpec(embeddedView, parentData, embeddedStateData, embeddedState);
            });
        }
    }, {
        key: '_createParentStates',
        value: function _createParentStates() {
            var self = this;
            var iVXjs = this.iVXjs,
                $stateProvider = this.$stateProvider,
                states = this.states;
            var videoEventNames = iVXjs.constants.VIDEO.EVENTS;


            states.forEach(function (state, index) {
                var type = state.type,
                    id = state.id,
                    url = state.url,
                    _state$onEnter = state.onEnter,
                    onEnter = _state$onEnter === undefined ? [] : _state$onEnter,
                    _state$onExit = state.onExit,
                    onExit = _state$onExit === undefined ? [] : _state$onExit,
                    _state$embeddedViews3 = state.embeddedViews,
                    embeddedViews = _state$embeddedViews3 === undefined ? [] : _state$embeddedViews3;


                embeddedViews.forEach(function (embeddedView) {
                    self._createEmbeddedState(embeddedView, state);
                });

                $stateProvider.state(id, {
                    url: url,
                    data: state,
                    template: '<ivxjs-' + type + '-state state-data="stateData" class="hide"></ivxjs-' + type + '-state>',
                    controller: ['$scope', function ($scope) {
                        $scope.stateData = state;
                    }],
                    onEnter: ['$rootScope', '$state', 'iVXjs', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.audio.experience', 'ivxjs.modules.audio', function ($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudioExperience, iVXjsAudio) {
                        if (!iVXjsAudioExperience.eventsAdded) {
                            iVXjsAudioExperience.addEventListeners(iVXjsBus);
                            iVXjsAudio.addEventListeners(iVXjsBus);
                            iVXjs.experience.Bus = iVXjsBus;
                            iVXjsAudioExperience.eventsAdded = true;
                            iVXjsAudio.eventsAdded = true;
                            iVXjs.experience.audio = iVXjsAudioExperience;
                            iVXjs.experience.actions = iVXjsActions;
                        }

                        iVXjs.log.debug('On Enter Actions Start', {}, { source: 'onEnter', status: 'started', actions: onEnter, timestamp: Date.now() });

                        $rootScope.stateID = id;

                        iVXjsActions.resolveActions(onEnter, function () {
                            iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp: Date.now() });
                        });
                    }],
                    onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', function ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) {
                        iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                        iVXjsActions.resolveActions(onExit, function () {
                            iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
                        });
                    }]
                });
            });
        }
    }, {
        key: '_createRouterSpec',
        value: function _createRouterSpec(embeddedView, parentData, embeddedStateData, embeddedStateOverrides) {
            var $stateProvider = this.$stateProvider;
            var parentId = parentData.id;
            var _iVXjs$constants$VIDE = this.iVXjs.constants.VIDEO.EVENTS,
                videoEventNames = _iVXjs$constants$VIDE === undefined ? {} : _iVXjs$constants$VIDE;
            var viewName = embeddedView.id,
                viewType = embeddedView.type;
            var embeddedStateId = embeddedStateData.id,
                _embeddedStateData$on = embeddedStateData.onEnter,
                onEnter = _embeddedStateData$on === undefined ? [] : _embeddedStateData$on,
                _embeddedStateData$on2 = embeddedStateData.onExit,
                onExit = _embeddedStateData$on2 === undefined ? [] : _embeddedStateData$on2,
                embeddedStateType = embeddedStateData.type,
                embeddedStateUrl = embeddedStateData.url;
            var _embeddedStateOverrid = embeddedStateOverrides.next,
                next = _embeddedStateOverrid === undefined ? [] : _embeddedStateOverrid;


            var views = {};

            views[viewName + '@' + parentId] = {
                template: '<ivxjs-' + embeddedStateType + '-state state-data="embeddedStateData" class="hide"></ivxjs-' + embeddedStateType + '-state>',
                controller: ['$scope', function ($scope) {
                    var modifiedState = Object.assign(embeddedStateData, {
                        next: next
                    });

                    $scope.embeddedStateData = modifiedState;
                }]
            };

            $stateProvider.state(parentId + '.' + embeddedStateId, {
                url: embeddedStateUrl,
                data: embeddedStateData,
                views: views,
                onEnter: ['$rootScope', '$state', 'iVXjs', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.audio.experience', 'ivxjs.modules.audio', function ($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudioExperience, iVXjsAudio) {
                    iVXjsActions.resolveActions(onEnter, function () {
                        iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp: Date.now() });
                    });
                }],
                onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', function ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) {
                    iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                    iVXjsActions.resolveActions(onExit, function () {
                        iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp: Date.now() });
                    });
                }]
            });
        }
    }]);

    return stateGenerator;
}();

stateGenerator.$inject = [];

exports.default = angular.module('ivx-js.providers.set-up', []).provider('iVXjsStateCreator', (0, _createFactoryFunction2.default)(stateGenerator)).name;

/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bus = __webpack_require__(472);

var _bus2 = _interopRequireDefault(_bus);

var _actions = __webpack_require__(473);

var _actions2 = _interopRequireDefault(_actions);

var _iosInlineVideo = __webpack_require__(474);

var _iosInlineVideo2 = _interopRequireDefault(_iosInlineVideo);

var _templateRenderer = __webpack_require__(475);

var _templateRenderer2 = _interopRequireDefault(_templateRenderer);

var _experienceScope = __webpack_require__(476);

var _experienceScope2 = _interopRequireDefault(_experienceScope);

var _video = __webpack_require__(477);

var _video2 = _interopRequireDefault(_video);

var _actionTemplates = __webpack_require__(478);

var _actionTemplates2 = _interopRequireDefault(_actionTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.services', [_bus2.default, _actions2.default, _iosInlineVideo2.default, _templateRenderer2.default, _experienceScope2.default, _video2.default, _actionTemplates2.default]).name;

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bus = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

var Bus = exports.Bus = function () {
    Bus.$inject = ["$rootScope", "iVXjs"];
    function Bus($rootScope, iVXjs) {
        "ngInject";

        _classCallCheck(this, Bus);

        this.$rootScope = $rootScope;
        this.iVXjs = iVXjs;
    }

    _createClass(Bus, [{
        key: 'eventNames',
        value: function eventNames() {
            return this.iVXjs.Bus;
        }
    }, {
        key: 'once',
        value: function once(eventName, callback) {
            var _this = this,
                _arguments = arguments;

            var self = this;

            this.iVXjs.Bus.once(eventName, function (args) {
                if (Array.isArray(args)) {
                    callback.apply(_this, args);
                } else {
                    var customArgs = Array.prototype.slice.call(_arguments);
                    callback.apply(_this, customArgs);
                }

                if (!self.$rootScope.$$phase) {
                    self.$rootScope.$apply();
                }
            });
        }
    }, {
        key: 'on',
        value: function on(eventName, callback) {
            var self = this;
            var fnName = Math.random().toString(26).substring(2, 15).replace(/[0-9]/g, '');
            var enhancedCallbackString = '\n            return function ' + fnName + '(args){\n\n                if(Array.isArray(args)){\n                    callback.apply(this, args);\n                } else {\n                    var customArgs = Array.prototype.slice.call(arguments);\n                    callback.apply(this, customArgs);\n                }\n               \n                if(!$rootScope.$$phase){\n                    $rootScope.$apply();\n                }\n            }\n        ';
            var enhancedCallback = new Function('callback', '$rootScope', enhancedCallbackString)(callback, this.$rootScope);

            this.iVXjs.Bus.on(eventName, enhancedCallback);

            return enhancedCallback;
        }
    }, {
        key: 'emit',
        value: function emit(eventName) {
            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            this.iVXjs.Bus.emit(eventName, rest);
        }
    }, {
        key: 'removeListener',
        value: function removeListener(eventName, callback) {
            this.iVXjs.Bus.removeListener(eventName, callback);
        }
    }]);

    return Bus;
}();

exports.default = angular.module('ivx-js.services.bus', []).service('ivxjs.bus', Bus).service('iVXjsBus', Bus).name;

/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Actions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

var _processor = __webpack_require__(117);

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var typeValidator = new _typeParsers.TypeValidator();

var Actions = exports.Actions = function (_ActionProcessor) {
    Actions.$inject = ["$rootScope", "$state", "$window", "iVXjs", "iVXjsBus"];
    _inherits(Actions, _ActionProcessor);

    function Actions($rootScope, $state, $window, iVXjs, iVXjsBus) {
        "ngInject";

        _classCallCheck(this, Actions);

        var _this = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this, iVXjs));

        _this.$rootScope = $rootScope;
        _this.$state = $state;
        _this.$window = $window;
        _this.iVXjsBus = iVXjsBus;
        _this.iVXjs = iVXjs;
        return _this;
    }

    _createClass(Actions, [{
        key: 'navigateToNextState',
        value: function navigateToNextState(nextArray) {
            if (typeValidator.isEmpty(nextArray)) return;

            var route = this.iVXjs.rules(nextArray);

            if (!typeValidator.isEmpty(route)) {
                this.$state.go(route);
            }
        }
    }, {
        key: 'resolveThenNavigate',
        value: function resolveThenNavigate(actionArray, nextArray) {
            var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var self = this;

            this.resolveActions(actionArray, function () {
                self.navigateToNextState(nextArray);
            }, source);
        }
    }]);

    return Actions;
}(_processor.ActionProcessor);

exports.default = angular.module('ivx-js.services.action', []).service('ivxjs.actions', Actions).service('iVXjsActions', Actions).name;

/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _videoEvents = __webpack_require__(12);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var videoEventNames = new _videoEvents2.default();

var CreateInlineVideo = function () {
    function CreateInlineVideo($window, $timeout, iVXjsBus) {
        _classCallCheck(this, CreateInlineVideo);

        this.$window = $window;
        this.$timeout = $timeout;
        this.iVXjsBus = iVXjsBus;
    }

    _createClass(CreateInlineVideo, [{
        key: 'emitCanPlay',
        value: function emitCanPlay(video) {
            var self = this;

            self.video = video;

            if (navigator.userAgent.match('CriOS')) {

                var playOnce = self.iVXjsBus.on(videoEventNames.PLAY, function () {
                    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var playerId = args.playerId;


                    if (playerId === video.id) {
                        self.iVXjsBus.emit(videoEventNames.READY_PLAYER, video);
                        self.iVXjsBus.removeListener(videoEventNames.PLAY, playOnce);
                    }
                });

                self.iVXjsBus.emit(videoEventNames.CAN_PLAY, video);
                return;
            }

            this.$timeout(function () {
                if (video.readyState < 1) {
                    self.emitCanPlay(video);
                    return;
                }
                self.iVXjsBus.emit(videoEventNames.CAN_PLAY, video);
            }, 100);
        }
    }, {
        key: 'makeInlineVideo',
        value: function makeInlineVideo(video, container, $scope) {
            if (typeof makeVideoPlayableInline === 'undefined') return;

            var self = this;
            var play = false;

            video.setAttribute('webkit-playsinline', '');
            makeVideoPlayableInline(video);

            this.iVXjsBus.on(videoEventNames.ADD_PLAYING_CLASS, function (args) {
                var playerId = args.playerId;


                if (video.id === playerId) {
                    container.className = video.className + ' is-playing';
                    play = !play;
                }
            });

            video.addEventListener('touchstart', function () {
                if (!play) {
                    video.play();
                    container.className = video.className + ' is-playing';
                } else {
                    video.pause();
                    $scope.isPlaying = false;
                    container.className = video.className.replace('is-playing', '');
                }

                play = !play;
                $scope.$apply();
            });

            this.iVXjsBus.once(videoEventNames.DISPOSE, function () {
                video.pause();
            });
        }
    }, {
        key: 'isiOS',
        value: function isiOS() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return userAgent.match(/iPhone/i) || userAgent.match(/iPad/i);
        }
    }, {
        key: 'isMobile',
        value: function isMobile() {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }
    }]);

    return CreateInlineVideo;
}();

CreateInlineVideo.$inject = ['$window', '$timeout', 'ivxjs.bus'];

exports.default = angular.module('ivx-js.services.create-inline-video', []).service('createInlineVideo', (0, _createFactoryFunction2.default)(CreateInlineVideo)).name;

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PullInTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PullInTemplate = exports.PullInTemplate = function () {
    function PullInTemplate($sce) {
        _classCallCheck(this, PullInTemplate);

        this.$sce = $sce;
    }

    _createClass(PullInTemplate, [{
        key: 'convertTemplateUrlToHtml',
        value: function convertTemplateUrlToHtml() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var $scope = arguments[1];

            if (data.templateUrl) {
                var templateUrl = data.templateUrl;
                var safeTemplateUrl = this.$sce.getTrustedResourceUrl(templateUrl);
                var templateKey = 'template' + Math.random().toString(36).substring(7);

                $scope[templateKey] = safeTemplateUrl;
                data.html = '<div ng-include="' + templateKey + '"></div>';
            }

            return data;
        }
    }, {
        key: 'convertHeaderFooter',
        value: function convertHeaderFooter(header, footer, data, controller) {
            var headerTemplateUrl = header.templateUrl,
                html = header.html;
            var footerTemplateUrl = footer.templateUrl;


            if (headerTemplateUrl) {
                var safeHeaderTemplateUrl = this.$sce.getTrustedResourceUrl(headerTemplateUrl);

                controller.safeHeaderTemplateUrl = safeHeaderTemplateUrl;
                header.html = '<div ng-include="vm.safeHeaderTemplateUrl"></div>';
                data.header = header;
            }

            if (footerTemplateUrl) {
                var safeFooterTemplateUrl = this.$sce.getTrustedResourceUrl(footerTemplateUrl);

                controller.safeFooterTemplateUrl = safeFooterTemplateUrl;
                footer.html = '<div ng-include="vm.safeFooterTemplateUrl"></div>';
                data.footer = footer;
            }

            return data;
        }
    }, {
        key: 'getTemplateKey',
        value: function getTemplateKey(labelTemplateUrl) {
            var newTemplateUrl = labelTemplateUrl.replace('/', '-').replace('.', '-').split('-');
            var newKey = newTemplateUrl.reduce(function (key, word, index) {
                if (index === 0) return word;

                var capitalizeWord = word[0].toUpperCase();
                capitalizeWord = capitalizeWord + word.substring(1);

                return '' + key + capitalizeWord;
            }, '');

            return '' + newKey;
        }
    }, {
        key: 'convertLabel',
        value: function convertLabel() {
            var defaultLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var $scope = arguments[2];
            var labelHTML = data.labelHTML,
                _data$label = data.label,
                label = _data$label === undefined ? defaultLabel : _data$label,
                labelTemplateUrl = data.labelTemplateUrl,
                id = data.id,
                _data$classes = data.classes,
                classes = _data$classes === undefined ? "" : _data$classes;


            if (labelTemplateUrl) {
                var safeLabelTemplateUrl = this.$sce.getTrustedResourceUrl(labelTemplateUrl);
                var templateKey = 'label' + Math.random().toString(36).substring(2, 7).toUpperCase();

                $scope[templateKey] = safeLabelTemplateUrl;
                data.labelHTML = '<div ng-include="' + templateKey + '"></div>';
            }

            return data;
        }
    }]);

    return PullInTemplate;
}();

PullInTemplate.$inject = ['$sce'];

exports.default = angular.module('ivx-js.services.template-renderer', []).service('pullInTemplate', (0, _createFactoryFunction2.default)(PullInTemplate)).name;

/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = __webpack_require__(1);

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = exports.Service = function () {
    function Service(iVXjs) {
        _classCallCheck(this, Service);

        Object.assign(this, {
            iVXjs: iVXjs
        });
    }

    _createClass(Service, [{
        key: 'setScopeExperience',
        value: function setScopeExperience(experience) {
            if (!this.iVXjs) return;

            var _iVXjs$experience$dat = this.iVXjs.experience.data,
                data = _iVXjs$experience$dat === undefined ? {} : _iVXjs$experience$dat;


            return {
                data: data
            };
        }
    }]);

    return Service;
}();

Service.$inject = ['iVXjs'];

exports.default = angular.module('ivx-js.services.scope-experience', []).service('ivxExperienceScope', (0, _createFactoryFunction2.default)(Service)).name;

/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

var VideoService = function () {
    VideoService.$inject = ["iVXjs", "iVXjsBus", "iVXjsActions"];
    function VideoService(iVXjs, iVXjsBus, iVXjsActions) {
        "ngInject";

        _classCallCheck(this, VideoService);

        Object.assign(this, {
            iVXjs: iVXjs,
            iVXjsBus: iVXjsBus,
            iVXjsActions: iVXjsActions,
            videoEventNames: iVXjs.constants.VIDEO.EVENTS
        });
    }

    _createClass(VideoService, [{
        key: "shouldFire",
        value: function shouldFire(cuePoint, player) {
            var currentTime = player.currentTime,
                paused = player.paused;
            var _cuePoint$timeAt = cuePoint.timeAt,
                timeAt = _cuePoint$timeAt === undefined ? 0 : _cuePoint$timeAt,
                endAt = cuePoint.endAt,
                _cuePoint$fired = cuePoint.fired,
                fired = _cuePoint$fired === undefined ? false : _cuePoint$fired,
                _cuePoint$always = cuePoint.always,
                always = _cuePoint$always === undefined ? false : _cuePoint$always;

            var canFire = (!fired || always) && !paused;

            if (typeValidator.isUndefined(endAt)) {
                var timeUntil = Math.abs(timeAt - currentTime);

                return timeUntil <= 0.2 && canFire;
            }

            return timeAt <= currentTime && endAt >= currentTime && canFire;
        }
    }, {
        key: "removeCuePointListener",
        value: function removeCuePointListener(cuePointFunction) {
            var iVXjsBus = this.iVXjsBus;


            iVXjsBus.removeListener(this.videoEventNames.TIME_UPDATE, cuePointFunction);
        }
    }, {
        key: "getControlHTML",
        value: function getControlHTML(playerId, controls) {
            var controlType = controls;
            var controlsHTML = '';
            var isControlObject = typeValidator.isObject(controls);
            var hasStandardControl = typeValidator.isString(controls);

            if (isControlObject) {
                var type = controls.type;


                controlType = type;
            }

            if (typeValidator.isString(controlType)) {
                controlsHTML = "<ivxjs-" + controlType + "-video-controls class=\"ivx-video-controls\" control-settings=\"vm.controls\" player-id='" + playerId + "'></ivxjs-" + controlType + "-video-controls>";
            }

            return controlsHTML;
        }
    }, {
        key: "createCuePointListener",
        value: function createCuePointListener(playerId) {
            var cuePoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var iVXjs = this.iVXjs,
                iVXjsBus = this.iVXjsBus,
                iVXjsActions = this.iVXjsActions;

            var self = this;

            return iVXjsBus.on(self.videoEventNames.TIME_UPDATE, function cuePointsOnUpdate(player, stateData) {
                if (player.id === playerId) {
                    var currentTime = player.currentTime;


                    if (cuePoints.length <= 0) return;

                    cuePoints.forEach(function (cuePoint, index) {
                        if (self.shouldFire(cuePoint, player)) {
                            cuePoint.fired = true;

                            iVXjs.log.debug("Cuepoint " + index + " Started", {}, { cuePoint: cuePoint, index: index, source: 'cuePoint', status: 'started', timestamp: Date.now() });
                            iVXjsActions.resolveActions([cuePoint], function () {
                                iVXjs.log.debug("Cuepoint " + index + " Completed", {}, { cuePoint: cuePoint, index: index, source: 'cuePoint', status: 'completed', timestamp: Date.now() });
                            });
                        }
                    });
                }
            });
        }
    }]);

    return VideoService;
}();

exports.default = angular.module('ivx-js.services.video', []).service('iVXjsVideoService', VideoService).service('ivxjs.video.service', VideoService).name;

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActionTemplateService = function () {
    ActionTemplateService.$inject = ["$window", "iVXjs", "iVXjsBus", "iVXjsActions"];
    function ActionTemplateService($window, iVXjs, iVXjsBus, iVXjsActions) {
        "ngInject";

        _classCallCheck(this, ActionTemplateService);

        Object.assign(this, {
            iVXjs: iVXjs,
            iVXjsBus: iVXjsBus,
            iVXjsActions: iVXjsActions,
            $window: $window
        });
    }

    _createClass(ActionTemplateService, [{
        key: 'setup',
        value: function setup($scope, element, attributes, runFunction) {
            var self = this;

            if (runFunction) {
                if (!element.actions) element.actions = [runFunction];else element.actions = [].concat(_toConsumableArray(element.actions), [runFunction]);
            }

            if (element.attr('ivx-action-template-set')) return;

            element.attr('ivx-action-template-set', true);
            element[0].addEventListener('click', function (event) {
                var target = attributes.target;


                if (target !== '_blank') {
                    event.preventDefault();
                }

                self._runActionTemplates($scope, element, attributes, event);
            }, false);
        }
    }, {
        key: '_runActionTemplates',
        value: function _runActionTemplates($scope, element, attributes, event) {
            var iVXjsActions = this.iVXjsActions,
                iVXjs = this.iVXjs,
                $window = this.$window;

            var attributeKeys = Object.keys(attributes);
            var self = this;
            var eventArray = element.actions.map(function (action) {
                return action();
            });
            var nonNavigationEvents = eventArray.filter(function (event) {
                return event.eventName !== iVXjs.constants.STATE.EVENTS.GO;
            });
            var navigationEvents = eventArray.filter(function (event) {
                return event.eventName === iVXjs.constants.STATE.EVENTS.GO;
            });

            iVXjsActions.resolveActions(nonNavigationEvents, function () {
                var href = attributes.href,
                    target = attributes.target;


                if (target === '_blank' || navigationEvents.length > 0) {
                    iVXjsActions.resolveActions(navigationEvents, function () {});

                    return;
                }

                if (href && target !== '_blank') {
                    $window.location = href;
                }
            }, iVXjsActions.createSourceFromEvent(event, null, eventArray));
        }
    }]);

    return ActionTemplateService;
}();

exports.default = angular.module('ivx-js.services.action-template', []).service('iVXjsActionTemplateService', ActionTemplateService).service('ivxjs.action-template.service', ActionTemplateService).name;

/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringParsers = __webpack_require__(480);

var _stringParsers2 = _interopRequireDefault(_stringParsers);

var _capitalize = __webpack_require__(481);

var _capitalize2 = _interopRequireDefault(_capitalize);

var _truncate = __webpack_require__(483);

var _truncate2 = _interopRequireDefault(_truncate);

var _urlEncode = __webpack_require__(485);

var _urlEncode2 = _interopRequireDefault(_urlEncode);

var _urlDecode = __webpack_require__(487);

var _urlDecode2 = _interopRequireDefault(_urlDecode);

var _escape = __webpack_require__(489);

var _escape2 = _interopRequireDefault(_escape);

var _unescape = __webpack_require__(491);

var _unescape2 = _interopRequireDefault(_unescape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters', [_capitalize2.default, _truncate2.default, _stringParsers2.default, _urlEncode2.default, _urlDecode2.default, _escape2.default, _unescape2.default]).name;

/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringParsers = exports.StringParsers = function () {
    function StringParsers(id) {
        _classCallCheck(this, StringParsers);
    }

    _createClass(StringParsers, [{
        key: 'camelCase',
        value: function camelCase(id) {
            var inputParts = id.split('-');
            var self = this;
            var inputName = inputParts && inputParts.length > 0 ? inputParts.reduce(function (inputName, inputPart) {
                return '' + inputName + self.capitalize(inputPart);
            }) : '' + inputParts[0];

            return inputName;
        }
    }, {
        key: 'startCase',
        value: function startCase(id) {
            var inputParts = id.split('-');
            var self = this;
            var inputName = inputParts && inputParts.length > 0 ? inputParts.reduce(function (inputName, inputPart) {
                return '' + inputName + self.capitalize(inputPart) + ' ';
            }, '') : '' + inputParts[0];

            return inputName;
        }
    }, {
        key: 'capitalize',
        value: function capitalize(tempString) {
            return tempString[0].toUpperCase() + tempString.substring(1);
        }
    }]);

    return StringParsers;
}();

var stringParser = new StringParsers();

exports.default = angular.module('ivx-js.filters.string-parsers', []).filter('stringParsers', ['$rootScope', function ($rootScope) {
    return function (name, text) {
        return stringParser[name](text);
    };
}]).name;

/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _capitalize = __webpack_require__(482);

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters.capitalize', []).filter('capitalize', _capitalize2.default).name;

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    "ngInject";

    return function (text) {
        if (!text) return;
        var capitalizeText = text.toLowerCase();

        return capitalizeText[0].toUpperCase() + capitalizeText.substring(1);
    };
};

/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _truncate = __webpack_require__(484);

var _truncate2 = _interopRequireDefault(_truncate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters.truncate', []).filter('truncate', _truncate2.default).name;

/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    "ngInject";

    return function (text) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
        var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";

        if (!text || !text.substring) return;

        return "" + text.substring(0, length) + (text.length >= length ? suffix : '');
    };
};

/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _urlEncode = __webpack_require__(486);

var _urlEncode2 = _interopRequireDefault(_urlEncode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters.url-encode', []).filter('url_encode', _urlEncode2.default).name;

/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    "ngInject";

    return function (text) {
        if (!text) return;

        return "" + encodeURIComponent(text);
    };
};

/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _urlDecode = __webpack_require__(488);

var _urlDecode2 = _interopRequireDefault(_urlDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters.url-decode', []).filter('url_decode', _urlDecode2.default).name;

/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["iVXjs", function (iVXjs) {
    "ngInject";

    return function (text) {
        var regex = /\%[a-zA-z0-9]{2}/gm;

        if (!text || !regex.test(text)) return;

        var decodedString = text.replace(regex, function (encodedBlock, position) {
            try {
                return "" + decodeURIComponent(encodedBlock);
            } catch (err) {
                var message = err.message;


                if (message === 'URI malformed') {
                    iVXjs.log.warn("Decode filter failed to decode value \"" + encodedBlock + "\" at position " + position + ". Please check that it is a valid encoded value.");

                    return encodedBlock;
                }
            }
        });

        return decodedString;
    };
}];

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _escape = __webpack_require__(490);

var _escape2 = _interopRequireDefault(_escape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters.escape', []).filter('escape', _escape2.default).name;

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["iVXjs", function (iVXjs) {
    "ngInject";

    return function (text) {
        //Inspired by lodashes escape: https://github.com/lodash/lodash/blob/3.0.0-npm-packages/lodash.escape/index.js
        var reUnescapedHtml = /[&<>"'`]/g;
        var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#96;'
        };

        if (!reHasUnescapedHtml.test(text)) return text;

        return text.replace(reUnescapedHtml, runEscape);

        function runEscape(char) {
            return htmlEscapes[char];
        }
    };
}];

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _unescape = __webpack_require__(492);

var _unescape2 = _interopRequireDefault(_unescape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ivx-js.filters.unescape', []).filter('unescape', _unescape2.default).name;

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["iVXjs", function (iVXjs) {
    "ngInject";

    return function (text) {
        //Inspired by lodashes escape: https://github.com/lodash/lodash/blob/3.0.0-npm-packages/lodash.unescape/index.js
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g;
        var reHasEscapedHtml = RegExp(reEscapedHtml.source);
        var htmlUnescapes = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&#96;': '`'
        };

        if (!reHasEscapedHtml.test(text)) return text;

        return text.replace(reEscapedHtml, runUnescape);

        function runUnescape(char) {
            return htmlUnescapes[char];
        }
    };
}];

/***/ })
/******/ ]);