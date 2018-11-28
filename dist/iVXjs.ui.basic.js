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
/******/ 	return __webpack_require__(__webpack_require__.s = 113);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */,
/* 5 */
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
/* 6 */,
/* 7 */
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
/* 8 */,
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(5);

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
/* 11 */
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
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Anchor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = __webpack_require__(0);

var _typeParsers = __webpack_require__(3);

var _asserts = __webpack_require__(7);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Buttons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

var _typeParsers = __webpack_require__(3);

var _asserts = __webpack_require__(7);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Number = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Date = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatetimeLocal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(2);

var _messages = __webpack_require__(1);

var _attributes = __webpack_require__(0);

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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = __webpack_require__(0);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(29);

var _element = __webpack_require__(37);

var _element2 = _interopRequireDefault(_element);

var _element3 = __webpack_require__(11);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(30);

var _events2 = _interopRequireDefault(_events);

var _videoEvents = __webpack_require__(32);

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _videoClasses = __webpack_require__(9);

var _videoClasses2 = _interopRequireDefault(_videoClasses);

var _tracksEvents = __webpack_require__(34);

var _tracksEvents2 = _interopRequireDefault(_tracksEvents);

var _tracksCuesEvents = __webpack_require__(35);

var _tracksCuesEvents2 = _interopRequireDefault(_tracksCuesEvents);

var _element = __webpack_require__(11);

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
            var duration = player.duration;
            var volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var self = this;
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            if (currentVolumeSpan && !this.muted) {
                currentVolumeSpan.style.width = self.currentVolume * 100 + "%";
            }

            var totalTimeInfo = self.totalTimeInfo,
                currentTimeInfo = self.currentTimeInfo,
                scrubBar = self.scrubBar;

            var durationTimeObject = this.convertSecondsToParts(duration);
            var durationTimeStamp = this.createTimeStamp(durationTimeObject);

            self.duration = duration;

            if (totalTimeInfo) totalTimeInfo.innerHTML = "/" + durationTimeStamp;
            if (currentTimeInfo) currentTimeInfo.innerHTML = "00:00";
            if (scrubBar) scrubBar.children[0].style.width = "0%";

            this.setVolume(self.currentVolume);
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

            var canPlayListener = this.iVXjsBus.on(this.controlEventNames.READY, function (player) {
                if (player.id === self.playerId) {
                    canPlayCallBack(player);
                    self.createPlayerSpecificControls({ player: player });
                    self.player = player;
                    self.iVXjsBus.removeListener(_this2.controlEventNames.READY, canPlayListener);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(31);

var _settings2 = _interopRequireDefault(_settings);

var _videoClasses = __webpack_require__(9);

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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = __webpack_require__(33);

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
            READY: "ready",
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(5);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracks = __webpack_require__(10);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracksCues = __webpack_require__(36);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracks = __webpack_require__(10);

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
/* 37 */
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
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicUI = undefined;

var _form = __webpack_require__(15);

var _anchor = __webpack_require__(14);

var _buttons = __webpack_require__(16);

var _checkbox = __webpack_require__(17);

var _date = __webpack_require__(23);

var _datetimeLocal = __webpack_require__(25);

var _email = __webpack_require__(22);

var _number = __webpack_require__(21);

var _options = __webpack_require__(18);

var _radio = __webpack_require__(20);

var _style = __webpack_require__(2);

var _text = __webpack_require__(13);

var _textarea = __webpack_require__(19);

var _url = __webpack_require__(24);

var _stateInput = __webpack_require__(26);

var _stateVideo = __webpack_require__(114);

var _stateNavigation = __webpack_require__(27);

var _videoControls = __webpack_require__(28);

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Form/Input HTML


//States


//Controls 


/**
 * Registers all the various default UI classes to 
 * this class to be used by various renders.
 */
var BasicUI =

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
exports.BasicUI = function BasicUI() {
    _classCallCheck(this, BasicUI);

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

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('ivxjs.modules.ui', new BasicUI());
}

/***/ }),
/* 114 */
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

/***/ })
/******/ ]);