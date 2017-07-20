(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputControllerHelper = undefined;

var _typeParsers = require('../../utilities/type-parsers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myTypeValidator = new _typeParsers.TypeValidator();

var InputControllerHelper = exports.InputControllerHelper = function InputControllerHelper($scope, iVXjs, iVXjsActions) {
    _classCallCheck(this, InputControllerHelper);

    var input = $scope.inputData;

    var currentExperienceValue = iVXjs.experience.data[input.name];

    if (input.type === 'checkbox') {
        $scope.inputValue = currentExperienceValue;
    } else if (currentExperienceValue) {
        $scope.inputValue = currentExperienceValue;
    }

    $scope.$on('changed', function (input, value) {
        $scope.$apply();
    });

    this.onChange = function (value) {
        if (input.type === 'checkbox') {
            value = value ? 'true' : 'false';
        }

        if (!myTypeValidator.isEmpty(value) || value instanceof Date) {
            (function () {

                if (value === 'true' || value === 'false') {
                    value = value === 'true';
                }

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
                });
            })();
        }
    };
};

},{"../../utilities/type-parsers.js":59}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorMessages = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = require('../../utilities/type-parsers.js');

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

},{"../../utilities/type-parsers.js":59}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _firebase = require("./firebase.js");

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

},{"./firebase.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("./index.js");

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

},{"./index.js":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require("./video.js");

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

},{"./video.js":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("./index.js");

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

},{"./index.js":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Anchor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = require('../utilities/attributes.js');

var _typeParsers = require('../../../utilities/type-parsers.js');

var _asserts = require('../../../utilities/asserts.js');

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

            return '\n             <a id=\'' + id + '\' class="' + classes + ' ' + anchorClasses + '"  href="' + href + '" ' + attributeHTML + ' >' + (labelHTML ? labelHTML : label) + '</a>           \n        ';
        }
    }]);

    return Anchor;
}();

},{"../../../utilities/asserts.js":58,"../../../utilities/type-parsers.js":59,"../utilities/attributes.js":54}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Buttons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

var _typeParsers = require("../../../utilities/type-parsers.js");

var _asserts = require("../../../utilities/asserts.js");

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
            return '';
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
                buttonClasses = this.buttonClasses;
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
                id = input.id;

            var buttonsHTML = buttons.reduce(function (html, button, index) {
                var label = button.label,
                    _button$attrHTML = button.attrHTML,
                    attrHTML = _button$attrHTML === undefined ? '' : _button$attrHTML,
                    _button$classes = button.classes,
                    classes = _button$classes === undefined ? "" : _button$classes;


                return html + " \n                   <button " + attrHTML + " class=\"" + classes + " " + buttonClasses + "\">\n                       " + label + "\n                   </button>";
            }, '');

            if ((labelHTML.length > 0 || label.length > 0) && showLabel) {
                labelHTML = labelHTML ? labelHTML : label;
                labelHTML = "<label for=\"" + id + "\">" + labelHTML + "</label>";
            }

            return "\n             " + labelHTML + "\n             " + buttonsHTML + "\n             " + errorMessages + "             \n        ";
        }
    }]);

    return Buttons;
}();

},{"../../../utilities/asserts.js":58,"../../../utilities/type-parsers.js":59,"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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

            return "\n            <label for=\"" + id + "\" class=\"" + classes + "\">\n               <input " + attributes + ">\n               " + label + "\n            </label>\n        ";
        }

        /**
         * Sets up and renders all the HTML for this checkbox based on the settings.
         * 
         * @type {String}
         */

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
        key: "html",
        get: function get() {
            var tags = this.tags,
                _settings = this.settings,
                settings = _settings === undefined ? {} : _settings,
                errors = this.errors,
                input = this.input,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                requiredAttributes = this.requiredAttributes;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var id = input.id,
                name = input.name,
                _input$label2 = input.label,
                label = _input$label2 === undefined ? '' : _input$label2;
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
            var inputHTML = " \n            " + checkboxHTML + "\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Checkbox;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Date = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
          uiAttributes = this.uiAttributes;
      var label = input.label,
          labelHTML = input.labelHTML,
          _input$name = input.name,
          name = _input$name === undefined ? '' : _input$name,
          _input$id = input.id,
          id = _input$id === undefined ? '' : _input$id;
      var _settings$input = settings.input,
          inputSettings = _settings$input === undefined ? {} : _settings$input,
          _settings$showLabel = settings.showLabel,
          showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
      var _inputSettings$classe = inputSettings.classes,
          classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

      var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"date\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

      if (labelHTML) label = labelHTML;

      return "" + inputHTML;
    }
  }]);

  return Date;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.DatetimeLocal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
                            uiAttributes = this.uiAttributes;
                        var label = input.label,
                            labelHTML = input.labelHTML,
                            _input$name = input.name,
                            name = _input$name === undefined ? '' : _input$name,
                            _input$id = input.id,
                            id = _input$id === undefined ? '' : _input$id;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

                        var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"datetime-local\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

                        return "" + inputHTML;
                }
        }]);

        return DatetimeLocal;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
                            uiAttributes = this.uiAttributes;
                        var _input$label = input.label,
                            label = _input$label === undefined ? '' : _input$label,
                            labelHTML = input.labelHTML,
                            _input$name = input.name,
                            name = _input$name === undefined ? '' : _input$name,
                            _input$id = input.id,
                            id = _input$id === undefined ? '' : _input$id;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

                        var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"email\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

                        return "" + inputHTML;
                }
        }]);

        return Email;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style');

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
            return 'row';
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
                submit = _submit === undefined ? {} : _submit;
            var _submit$label = submit.label,
                submitLabel = _submit$label === undefined ? "Submit" : _submit$label,
                submitLabelHTML = submit.labelHTML,
                _submit$input = submit.input,
                submitInput = _submit$input === undefined ? {} : _submit$input,
                _submit$container = submit.container,
                submitContainer = _submit$container === undefined ? {} : _submit$container,
                _submit$attributes = submit.attributes,
                attributes = _submit$attributes === undefined ? '' : _submit$attributes;
            var _submitInput$classes = submitInput.classes,
                submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes,
                submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;


            submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

            var submitHTML = submitLabel.length >= 0 ? '\n            <div class="ivxjs-grid-1-1 ' + submitContainerClasses + '">\n            <button class="' + submitInputClasses + '" type=\'submit\' ' + attributes + '>\n                    ' + submitLabel + '\n                </button>\n                </div>\n                ' : '';

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
                    html: this.submitButtonHTML
                });
            }

            var contents = this.style.addWidthClasses(inputHTML);

            return '\n            ' + label + '\n            <form id="' + formId + '-form" class="' + formClasses + ' ' + configFormClasses + '" novalidate name="' + name + '" ' + additionalAttrHTML + '>                \n                ' + contents + '\n            </form>\n        ';
        }
    }]);

    return Form;
}();

},{"./style":22}],16:[function(require,module,exports){
'use strict';

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
                return errorMessageHTML + '<span class="' + messageClasses + '" ' + errorMessage.attrHTML + '>\n                    ' + errorMessage.message + '\n                </span>';
            }, '');

            if (errorMessageHTML.length > 0) {
                return '<div class=\'' + containerClasses + '\'>\n                ' + errorMessageHTML + '\n            </div>';
            }

            return '';
        }
    }]);

    return ErrorMessages;
}();

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Number = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
                            uiAttributes = this.uiAttributes;
                        var _input$label = input.label,
                            label = _input$label === undefined ? '' : _input$label,
                            _input$name = input.name,
                            name = _input$name === undefined ? '' : _input$name,
                            _input$id = input.id,
                            id = _input$id === undefined ? '' : _input$id,
                            labelHTML = input.labelHTML;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

                        var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  name=\"" + name + "\"  type=\"number\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

                        return "" + inputHTML;
                }
        }]);

        return Number;
}();

},{"../utilities/attributes.js":54,"./messages.js":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
        key: "html",
        get: function get() {
            var tags = this.tags,
                input = this.input,
                defaultDisplay = this.defaultDisplay,
                errors = this.errors,
                settings = this.settings,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var id = input.id,
                name = input.name,
                options = input.options,
                _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

            var inputHTML = " \n             <label for=\"" + id + "\">" + label + "</label>             \n               <select class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"" + nonValidateAttributesHTML + " " + errorTags + " " + tags + ">\n                  " + defaultOptionTag + "\n                  " + optionsHTML + "\n               </select>\n               " + errorHTML;

            return "" + inputHTML;
        }
    }]);

    return Options;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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

            return " \n        <label for=\"" + currentId + "\" class=\"" + uiClasses + "\">\n        " + radioHTML + "\n        </label>";
        }
    }, {
        key: "renderRadioHTML",
        value: function renderRadioHTML(attrHTML, label, value) {
            var id = this.input.id;

            var currentId = "" + id + (value.length > 0 ? '-' + value : '');

            return " \n            <input type=\"radio\" id=\"" + currentId + "\" " + attrHTML + ">\n            " + label;
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
        key: "html",
        get: function get() {
            var errors = this.errors,
                radios = this.radios,
                settings = this.settings,
                input = this.input,
                uiClasses = this.uiClasses;
            var errorMessages = errors.messages,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? "" : _errors$tags;

            var self = this;
            var inputLabel = input.label,
                inputLableHTML = input.labelHTML;
            var _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;


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
            var allRadioButtonsHTML = "\n             " + radiosHTML + "\n             " + errorHTML;

            return this.uiRadioGroup(allRadioButtonsHTML);
        }
    }]);

    return Radio;
}();

},{"../utilities/attributes.js":54,"./messages.js":16}],20:[function(require,module,exports){
'use strict';

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


            return '\n            <section class="' + sectionClasses + ' ' + defaultSectionClasses + '" id="' + data.id + '">\n                 <header class="' + headerClasses + ' ' + defaultHeaderClasses + '">' + headerHTML + '</header>\n                ' + formSection + '\n                <footer class="' + footerClasses + ' ' + defaultFooterClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return InputState;
}();

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = require('../utilities/attributes.js');

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

            return '\n            <section class="' + sectionClasses + ' ' + defaultSectionClasses + '" id="' + data.id + '">\n                 <header class="' + headerClasses + ' ' + defaultHeaderClasses + '">' + headerHTML + '</header>\n                 <div class=\'' + defaultLinkContainerClasses + ' ' + linkContainerClasses + '\' ' + linkContainerAttributeHTML + '>\n                    ' + linkSection + '\n                </div>\n                <footer class="' + footerClasses + ' ' + defaultFooterClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return NavigationState;
}();

},{"../utilities/attributes.js":54}],22:[function(require,module,exports){
'use strict';

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
            if (width === '1') return 'ivxjs-grid-1-1';

            var gridString = width.replace('/', '-');

            return 'ivxjs-grid-' + gridString;
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
                    settings = _inputHTML$settings === undefined ? {} : _inputHTML$settings;
                var _settings$width = settings.width,
                    width = _settings$width === undefined ? '1' : _settings$width,
                    _settings$container = settings.container,
                    container = _settings$container === undefined ? {} : _settings$container;
                var _container$classes = container.classes,
                    classes = _container$classes === undefined ? '' : _container$classes;


                classes = classes + ' ' + containerClasses;

                var thisWidth = self.getWidth(width);

                html = html.replace("ivxjs-grid-1-1", thisWidth + ' ' + classes);

                return currentHTML + ' ' + html;
            }, '');

            return contents;
        }
    }, {
        key: 'containerClasses',
        get: function get() {
            return 'input-container';
        }
    }]);

    return Style;
}();

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

            var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"text\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Text;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
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

            if (labelHTML) label = labelHTML;

            label = showLabel ? label : '';

            var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <textarea class=\"" + classes + " " + uiClasses + "\"  id=\"" + id + "\" name=\"" + name + "\" " + uiAttributes + "   " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            </textarea>\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Textarea;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

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
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
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

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + " " + uiClasses + "\" " + uiAttributes + "  id=\"" + id + "\" name=\"" + name + "\"  type=\"url\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Url;
}();

},{"../utilities/attributes.js":54,"./messages.js":16,"./style":22}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../video/controls/index.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Controls) {
    _inherits(_class, _Controls);

    function _class(container) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        if (container.html instanceof Function) {
            container.html(_this.html);
        } else {
            var div = document.createElement('div');
            div.innerHTML = _this.html;

            container.appendChild(div);
        }

        var playPauseControlsClasses = _this.playPauseControlsClasses,
            totalTimeInfoClasses = _this.totalTimeInfoClasses,
            currentTimeInfoClasses = _this.currentTimeInfoClasses,
            scrubBarClasses = _this.scrubBarClasses,
            muteControlsClasses = _this.muteControlsClasses,
            volumeBarClasses = _this.volumeBarClasses;


        _this.container = container;
        _this.playPauseControls = document.getElementById("video-controls-play-pause");
        _this.totalTimeInfo = document.getElementById("video-controls-total-time");
        _this.currentTimeInfo = document.getElementById("video-controls-current-time");
        _this.scrubBar = document.getElementById("video-controls-scrub-bar");
        _this.muteControls = document.getElementById("video-controls-mute-controls");
        _this.volumeBar = document.getElementById("video-controls-volume-bar");

        return _this;
    }

    _createClass(_class, [{
        key: 'playPauseControlsClasses',
        get: function get() {
            return 'play-pause';
        }
    }, {
        key: 'totalTimeInfoClasses',
        get: function get() {
            return 'duration';
        }
    }, {
        key: 'currentTimeInfoClasses',
        get: function get() {
            return 'current-time';
        }
    }, {
        key: 'scrubBarClasses',
        get: function get() {
            return 'scrub-bar';
        }
    }, {
        key: 'muteControlsClasses',
        get: function get() {
            return 'mute';
        }
    }, {
        key: 'volumeBarClasses',
        get: function get() {
            return 'volume-bar';
        }
    }, {
        key: 'playClasses',
        get: function get() {
            return 'fa fa-play';
        }
    }, {
        key: 'pauseClasses',
        get: function get() {
            return 'fa fa-pause';
        }
    }, {
        key: 'unmuteClasses',
        get: function get() {
            return 'fa fa-volume-up';
        }
    }, {
        key: 'muteClasses',
        get: function get() {
            return 'fa fa-volume-off';
        }
    }, {
        key: 'scrubBarTimeLapseClasses',
        get: function get() {
            return 'time-lapsed';
        }
    }, {
        key: 'volumeBarCurrentVolumeClasses',
        get: function get() {
            return 'current-volume';
        }
    }, {
        key: 'playPauseButtonHTML',
        get: function get() {
            var play = this.playClasses;
            var playPauseControls = this.playPauseControlsClasses;

            return '\n        <button id="video-controls-play-pause" class="' + playPauseControls + '">\n            <i class=\'' + play + '\'></i>\n        </button>';
        }
    }, {
        key: 'scrubBarHTML',
        get: function get() {
            return '\n             <div id="video-controls-scrub-bar" class="' + this.scrubBarClasses + '">\n                <div class="' + this.scrubBarTimeLapseClasses + '"></div>\n            </div>\n        ';
        }
    }, {
        key: 'timestampHTML',
        get: function get() {
            return '\n        <span id="video-controls-current-time" class="' + this.currentTimeInfoClasses + '"></span>\n        <span id="video-controls-total-time" class="' + this.totalTimeInfoClasses + '"></span>\n        ';
        }
    }, {
        key: 'muteButtonHTML',
        get: function get() {
            var unmute = this.unmuteClasses,
                muteControlsClasses = this.muteControlsClasses;

            return '\n            <button id="video-controls-mute-controls" class="' + muteControlsClasses + '">\n                <i class="' + unmute + '"></i>\n            </button>\n        ';
        }
    }, {
        key: 'volumeBarHTML',
        get: function get() {
            return '\n            <div  id="video-controls-volume-bar" class="' + this.volumeBarClasses + '">\n                <div class="' + this.volumeBarCurrentVolumeClasses + '"></div>\n            </div> \n        ';
        }
    }, {
        key: 'html',
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML,
                scrubBarHTML = this.scrubBarHTML,
                timestampHTML = this.timestampHTML,
                muteButtonHTML = this.muteButtonHTML,
                volumeBarHTML = this.volumeBarHTML;

            return '\n           ' + playPauseButtonHTML + '\n           ' + scrubBarHTML + '\n           ' + timestampHTML + '\n           ' + muteButtonHTML + '\n           ' + volumeBarHTML + '                        \n        ';
        }
    }]);

    return _class;
}(_index.Controls);

exports.default = _class;

},{"../../video/controls/index.js":56}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Anchor = undefined;

var _anchor = require('../default/anchor.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Anchor = exports.Anchor = function (_DefaultAnchor) {
	_inherits(Anchor, _DefaultAnchor);

	function Anchor(anchorInfo) {
		_classCallCheck(this, Anchor);

		return _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, anchorInfo));
	}

	return Anchor;
}(_anchor.Anchor);

},{"../default/anchor.js":9}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _firebaseAuthentication = require('../../../../../constants/firebase.authentication.js');

var _firebaseAuthentication2 = _interopRequireDefault(_firebaseAuthentication);

var _inputController = require('../../../../../angular/utilities/input-controller.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FirebaseAuthenticationConstants = new _firebaseAuthentication2.default();

var FileInputController = function FileInputController($scope, iVXjs, iVXjsActions) {
  _classCallCheck(this, FileInputController);

  var self = this;
};

FileInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(FileInputController);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/input-controller.js":2,"../../../../../constants/firebase.authentication.js":4}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _firebaseAuthentication = require('../../../../../constants/firebase.authentication.js');

var _firebaseAuthentication2 = _interopRequireDefault(_firebaseAuthentication);

var _inputController = require('../../../../../angular/utilities/input-controller.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirebaseAuthenticationConstants = new _firebaseAuthentication2.default();

var PasswordInputController = function (_InputControllerHelpe) {
    _inherits(PasswordInputController, _InputControllerHelpe);

    function PasswordInputController($scope, iVXjs, iVXjsActions) {
        _classCallCheck(this, PasswordInputController);

        var _this = _possibleConstructorReturn(this, (PasswordInputController.__proto__ || Object.getPrototypeOf(PasswordInputController)).call(this, $scope, iVXjs, iVXjsActions));

        var self = _this;

        _this.setPassword = function (inputValue) {
            _this.password = inputValue;
        };

        iVXjs.Bus.once(FirebaseAuthenticationConstants.REQUEST_PASSWORD, function () {
            iVXjs.Bus.emit(FirebaseAuthenticationConstants.GET_PASSWORD, self.password);
        });
        return _this;
    }

    return PasswordInputController;
}(_inputController.InputControllerHelper);

PasswordInputController.$inject = ['$scope', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(PasswordInputController);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/input-controller.js":2,"../../../../../constants/firebase.authentication.js":4}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputFile = require('../controllers/input.file.js');

var _inputFile2 = _interopRequireDefault(_inputFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileInput = function () {
    function FileInput($compile, $filter, $http, iVXjs, iVXjsUIModule, iVXjsActions, pullInTemplate) {
        _classCallCheck(this, FileInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputFile2.default;
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

            var tagHTML = 'onchange="angular.element(this).scope().fileNameChanged(this)" ng-model="inputValue"';

            input.label = labelHTML ? labelHTML : label;
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);

            var uiFileObj = {
                input: input,
                settings: settings,
                tags: tagHTML
            };
            var file = new iVXjsUIModule.file(uiFileObj);

            iElm.html(file.html);

            $compile(iElm.contents())($scope);

            $scope.fileNameChanged = function (el) {
                if (iVXjs.experience.uploadFile) {
                    var files = el.files;
                    var numOfFiles = files.length;

                    var _loop = function _loop(i) {
                        var file = files[i];
                        var filePromise = iVXjs.experience.uploadFile(file);

                        Promise.all([filePromise]).then(function () {
                            var _input2 = input,
                                _input2$onChange = _input2.onChange,
                                onChange = _input2$onChange === undefined ? [] : _input2$onChange,
                                inputName = _input2.name;


                            onChange.unshift({
                                "eventName": "setData",
                                "args": {
                                    "key": inputName,
                                    "value": file.name
                                }
                            });

                            iVXjsActions.resolveActions(onChange, function () {});
                        }, function () {});
                    };

                    for (var i = 0; i < numOfFiles; i++) {
                        _loop(i);
                    }
                }
            };
        };
    }

    _createClass(FileInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return FileInput;
}();

FileInput.$inject = ['$compile', '$filter', '$http', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.actions', 'pullInTemplate'];

exports.default = (0, _createFactoryFunction2.default)(FileInput);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../controllers/input.file.js":28}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputPassword = require('../controllers/input.password.js');

var _inputPassword2 = _interopRequireDefault(_inputPassword);

var _messagesError = require('../../../../../angular/utilities/messages.error.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PasswordInput = function () {
    function PasswordInput($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate) {
        _classCallCheck(this, PasswordInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputPassword2.default;
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
            var tagHTML = 'ng-change="vm.setPassword(inputValue)" ng-model="inputValue"';

            input.label = labelHTML ? labelHTML : label;
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);

            var uiPasswordObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            var password = new iVXjsUIModule.password(uiPasswordObj);

            iElm.html(password.html);

            $compile(iElm.contents())($scope);
        };
    }

    _createClass(PasswordInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return PasswordInput;
}();

PasswordInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate'];

exports.default = (0, _createFactoryFunction2.default)(PasswordInput);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/messages.error.js":3,"../controllers/input.password.js":29}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Buttons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buttons = require('../default/buttons.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Buttons = exports.Buttons = function (_DefaultButtons) {
    _inherits(Buttons, _DefaultButtons);

    function Buttons(buttons, input) {
        _classCallCheck(this, Buttons);

        return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, buttons, input, _messages.ErrorMessages));
    }

    _createClass(Buttons, [{
        key: 'buttonClasses',
        get: function get() {
            return 'btn';
        }
    }]);

    return Buttons;
}(_buttons.Buttons);

},{"../default/buttons.js":10,"./messages.js":40}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkbox = require('../default/checkbox.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = exports.Checkbox = function (_DefaultCheckbox) {
    _inherits(Checkbox, _DefaultCheckbox);

    function Checkbox(inputObj) {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Checkbox, [{
        key: 'renderCheckboxContainer',
        value: function renderCheckboxContainer(classes, attributes) {
            var input = this.input;
            var label = input.label;

            return '\n       \n            <input style="position:absolute; left:0; z-index:9999; margin:17px 26px; cursor:pointer;" type="checkbox" ' + attributes + '>\n            <label for="' + input.id + '"> ' + label + '</label>   \n        ';
        }
    }, {
        key: 'uiClasses',
        get: function get() {
            return 'checkbox form-control';
        }
    }, {
        key: 'uiAttributes',
        get: function get() {
            return '';
        }
    }]);

    return Checkbox;
}(_checkbox.Checkbox);

},{"../default/checkbox.js":11,"./messages.js":40}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Date = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _date = require('../default/date.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Date = exports.Date = function (_DefaultDate) {
    _inherits(Date, _DefaultDate);

    function Date(inputObj) {
        _classCallCheck(this, Date);

        return _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Date, [{
        key: 'uiClasses',
        get: function get() {
            return 'datepicker';
        }
    }, {
        key: 'labelClasses',
        get: function get() {
            return 'active';
        }
    }]);

    return Date;
}(_date.Date);

},{"../default/date.js":12,"./messages.js":40}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatetimeLocal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _datetimeLocal = require('../default/datetime-local.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatetimeLocal = exports.DatetimeLocal = function (_DefaultDatetimeLocal) {
    _inherits(DatetimeLocal, _DefaultDatetimeLocal);

    function DatetimeLocal(inputObj) {
        _classCallCheck(this, DatetimeLocal);

        return _possibleConstructorReturn(this, (DatetimeLocal.__proto__ || Object.getPrototypeOf(DatetimeLocal)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(DatetimeLocal, [{
        key: 'uiClasses',
        get: function get() {
            return 'datepicker';
        }
    }, {
        key: 'labelClasses',
        get: function get() {
            return 'active';
        }
    }]);

    return DatetimeLocal;
}(_datetimeLocal.DatetimeLocal);

},{"../default/datetime-local.js":13,"./messages.js":40}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _email = require('../default/email.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Email = exports.Email = function (_DefaultEmail) {
    _inherits(Email, _DefaultEmail);

    function Email(inputObj) {
        _classCallCheck(this, Email);

        return _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Email, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Email;
}(_email.Email);

},{"../default/email.js":14,"./messages.js":40}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = exports.File = function () {
    function File(inputObj) {
        _classCallCheck(this, File);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
    }

    _createClass(File, [{
        key: 'uiClasses',
        get: function get() {
            return 'validate';
        }
    }, {
        key: 'html',
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                uiClasses = this.uiClasses,
                _uiAttributes = this.uiAttributes,
                uiAttributes = _uiAttributes === undefined ? "" : _uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + ' ' + uiClasses;

            if (labelHTML) label = labelHTML;

            var inputHTML = ' \n            \n            <div class="file-field input-field">\n      <div class="btn">\n        <span>File</span>\n        <input id="' + id + '" name="' + name + '" type="file" ' + tags + '>\n      </div>\n      <div class="file-path-wrapper">\n        <input class="file-path validate" type="text" >\n      </div>\n    </div>\n       ';

            return '' + inputHTML;
        }
    }]);

    return File;
}();

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.js');

var _form = require('../default/form.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = exports.Form = function (_DefaultForm) {
    _inherits(Form, _DefaultForm);

    function Form(inputHTML, name, additionalAttrHTML, settings) {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, inputHTML, name, additionalAttrHTML, settings, _style.Style));
    }

    _createClass(Form, [{
        key: 'formClasses',
        get: function get() {
            return 'col s12';
        }
    }, {
        key: 'submitButtonHTML',
        get: function get() {
            var _submit = this.submit,
                submit = _submit === undefined ? {} : _submit;
            var _submit$label = submit.label,
                submitLabel = _submit$label === undefined ? "Submit" : _submit$label,
                submitLabelHTML = submit.labelHTML,
                _submit$input = submit.input,
                submitInput = _submit$input === undefined ? {} : _submit$input,
                _submit$container = submit.container,
                submitContainer = _submit$container === undefined ? {} : _submit$container,
                _submit$attributes = submit.attributes,
                attributes = _submit$attributes === undefined ? '' : _submit$attributes;
            var _submitInput$classes = submitInput.classes,
                submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes,
                submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;


            submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

            var submitHTML = submitLabel.length >= 0 ? '\n            \n                <div class="col s12 ' + submitContainerClasses + '">\n                    <button class="btn ' + submitInputClasses + '" type=\'submit\'>\n                        ' + submitLabel + '\n                    </button>\n                </div>\n         \n            ' : '';

            return submitHTML;
        }
    }]);

    return Form;
}(_form.Form);

},{"../default/form.js":15,"./style.js":49}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MaterializeUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Form/Input HTML


//States


//Controls 


var _anchor = require('./anchor.js');

var _form = require('./form.js');

var _text = require('./text.js');

var _buttons = require('./buttons.js');

var _checkbox = require('./checkbox.js');

var _options = require('./options.js');

var _textarea = require('./textarea.js');

var _password = require('./password.js');

var _file = require('./file.js');

var _range = require('./range.js');

var _radio = require('./radio.js');

var _style = require('./style.js');

var _number = require('./number.js');

var _email = require('./email.js');

var _date = require('./date.js');

var _url = require('./url.js');

var _datetimeLocal = require('./datetime-local.js');

var _inputPassword = require('./angular/directives/input.password.js');

var _inputPassword2 = _interopRequireDefault(_inputPassword);

var _inputFile = require('./angular/directives/input.file.js');

var _inputFile2 = _interopRequireDefault(_inputFile);

var _stateInput = require('./state.input.js');

var _stateVideo = require('./state.video.js');

var _stateNavigation = require('./state.navigation.js');

var _videoControls = require('./video.controls.js');

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterializeUI = exports.MaterializeUI = function () {
    function MaterializeUI() {
        _classCallCheck(this, MaterializeUI);

        this.anchor = _anchor.Anchor;
        this.form = _form.Form;
        this.text = _text.Text;
        this.buttons = _buttons.Buttons;
        this.date = _date.Date;
        this.password = _password.Password;
        this.file = _file.File;
        this.datetimeLocal = _datetimeLocal.DatetimeLocal;
        this.checkbox = _checkbox.Checkbox;
        this.videoControls = _videoControls2.default;
        this.options = _options.Options;
        this.email = _email.Email;
        this.url = _url.Url;
        this.textarea = _textarea.Textarea;
        this.range = _range.Range;
        this.radio = _radio.Radio;
        this.style = new _style.Style();
        this.number = _number.Number;
        this.states = {
            input: _stateInput.InputState,
            video: _stateVideo.VideoState,
            navigation: _stateNavigation.NavigationState
        };

        this.angular = {
            ivxjsPasswordInput: _inputPassword2.default,
            ivxjsFileInput: _inputFile2.default
        };
    }

    _createClass(MaterializeUI, [{
        key: 'initializeInput',
        value: function initializeInput() {
            $('select').material_select();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });

            Materialize.updateTextFields();
        }
    }]);

    return MaterializeUI;
}();

module.exports = initializeMaterializeUI;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.ui.materialize', initializeMaterializeUI);
}

function initializeMaterializeUI(settings) {
    return MaterializeUI;
};

},{"./anchor.js":27,"./angular/directives/input.file.js":30,"./angular/directives/input.password.js":31,"./buttons.js":32,"./checkbox.js":33,"./date.js":34,"./datetime-local.js":35,"./email.js":36,"./file.js":37,"./form.js":38,"./number.js":41,"./options.js":42,"./password.js":43,"./radio.js":44,"./range.js":45,"./state.input.js":46,"./state.navigation.js":47,"./state.video.js":48,"./style.js":49,"./text.js":50,"./textarea.js":51,"./url.js":52,"./video.controls.js":53}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorMessages = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require('../default/messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorMessages = exports.ErrorMessages = function (_DefaultErrorMessages) {
    _inherits(ErrorMessages, _DefaultErrorMessages);

    function ErrorMessages() {
        var errorMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ErrorMessages);

        return _possibleConstructorReturn(this, (ErrorMessages.__proto__ || Object.getPrototypeOf(ErrorMessages)).call(this, errorMessages));
    }

    _createClass(ErrorMessages, [{
        key: 'containerClasses',
        get: function get() {
            return 'has-error';
        }
    }, {
        key: 'messageClasses',
        get: function get() {
            return 'help-block';
        }
    }]);

    return ErrorMessages;
}(_messages.ErrorMessages);

},{"../default/messages.js":16}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Number = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _number = require('../default/number.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Number = exports.Number = function (_DefaultNumber) {
    _inherits(Number, _DefaultNumber);

    function Number(inputObj) {
        _classCallCheck(this, Number);

        return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Number, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Number;
}(_number.Number);

},{"../default/number.js":17,"./messages.js":40}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _options = require('../default/options.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Options = exports.Options = function (_DefaultOptions) {
        _inherits(Options, _DefaultOptions);

        function Options(inputObj) {
                _classCallCheck(this, Options);

                return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, inputObj, _messages.ErrorMessages));
        }

        _createClass(Options, [{
                key: 'html',
                get: function get() {
                        var tags = this.tags,
                            input = this.input,
                            defaultDisplay = this.defaultDisplay,
                            errors = this.errors,
                            settings = this.settings,
                            uiClasses = this.uiClasses,
                            uiAttributes = this.uiAttributes;
                        var id = input.id,
                            name = input.name,
                            options = input.options,
                            _input$label = input.label,
                            label = _input$label === undefined ? '' : _input$label,
                            labelHTML = input.labelHTML;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + ' ' + uiClasses;

                        var _errors$messages = errors.messages,
                            errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                            _errors$attributes = errors.attributes,
                            errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                            _errors$nonValidate = errors.nonValidate,
                            nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                            _errors$tags = errors.tags,
                            errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var defaultOptionTag = '<option value="">Select an option...</option>';
                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + ' ' + uiAttributes;

                        if (errorAttributes.required || defaultDisplay && defaultDisplay.length >= 0) {
                                defaultOptionTag = defaultDisplay ? '<option value="">' + defaultDisplay + '</option>' : defaultOptionTag;
                        }

                        if (labelHTML) label = labelHTML;

                        var optionsHTML = options.reduce(function (optionHTML, option) {
                                return optionHTML + '\n            <option value="' + option.value + '">' + option.display + '</option>';
                        }, '');

                        var inputHTML = ' \n                         \n               <select class="' + classes + '"  id="' + id + '" name="' + name + '"' + nonValidateAttributesHTML + ' ' + errorTags + ' ' + tags + '>\n                  ' + defaultOptionTag + '\n                  ' + optionsHTML + '\n               </select>\n               <label for="' + id + '">' + label + '</label> \n               ' + errorHTML;

                        return '' + inputHTML;
                }
        }]);

        return Options;
}(_options.Options);

},{"../default/options.js":18,"./messages.js":40}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Password = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _text = require('../default/text.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Password = exports.Password = function (_DefaultText) {
    _inherits(Password, _DefaultText);

    function Password(inputObj) {
        _classCallCheck(this, Password);

        return _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Password, [{
        key: 'uiClasses',
        get: function get() {
            return 'validate';
        }
    }, {
        key: 'html',
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + ' ' + uiClasses;

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

            nonValidateAttributesHTML = nonValidateAttributesHTML + ' ' + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = ' \n            \n            <input ' + nonValidateAttributesHTML + ' class="' + classes + '"  id="' + id + '" name="' + name + '"  type="password"    ' + errorTags + ' ' + tags + '>\n           \n            ' + errorHTML + '\n             <label for="' + name + '"> ' + label + ' </label>\n       ';

            return '' + inputHTML;
        }
    }]);

    return Password;
}(_text.Text);

},{"../default/text.js":23,"./messages.js":40}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _radio = require('../default/radio.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = exports.Radio = function (_DefaultRadio) {
    _inherits(Radio, _DefaultRadio);

    function Radio(inputObj) {
        _classCallCheck(this, Radio);

        return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Radio, [{
        key: 'uiRadioButtonContainer',
        value: function uiRadioButtonContainer(radioHTML, uiClasses) {
            return ' \n       <p>\n        ' + radioHTML + '\n        </p>';
        }
    }, {
        key: 'renderRadioHTML',
        value: function renderRadioHTML(attrHTML, label, value) {
            var id = this.input.id;

            return ' \n            <input name="' + id + (value.length > 0 ? '-' + value : '') + '"" type="radio" id="' + id + (value.length > 0 ? '-' + value : '') + '" ' + attrHTML + '>\n            <label for="' + id + (value.length > 0 ? '-' + value : '') + '">' + label + '</label>\n        ';
        }
    }, {
        key: 'uiClasses',
        get: function get() {
            return 'radio form-control';
        }
    }, {
        key: 'uiAttributes',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var errors = this.errors,
                radios = this.radios,
                settings = this.settings,
                input = this.input,
                uiClasses = this.uiClasses;
            var errorMessages = errors.messages,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? "" : _errors$tags;

            var self = this;
            var inputLabel = input.label,
                inputLableHTML = input.labelHTML;
            var _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var name = input.name;


            if (inputLableHTML) inputLabel = inputLableHTML;

            var radiosHTML = radios.reduce(function (html, radio, index) {
                var label = radio.label,
                    _radio$attrHTML = radio.attrHTML,
                    attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML,
                    _radio$classes = radio.classes,
                    classes = _radio$classes === undefined ? '' : _radio$classes,
                    value = radio.value;


                attrHTML = attrHTML + ' ' + errorTags;

                var radioHTML = self.renderRadioHTML(attrHTML, label, input.radioButtons[index].value);

                return html + '\n            ' + self.uiRadioButtonContainer(radioHTML, uiClasses + ' ' + classes);
            }, inputLabel);
            var errorHTML = new this.errorMessages(errorMessages).html;
            var allRadioButtonsHTML = '\n             ' + radiosHTML + '\n             ' + errorHTML;

            return this.uiRadioGroup(allRadioButtonsHTML);
        }
    }]);

    return Radio;
}(_radio.Radio);

},{"../default/radio.js":19,"./messages.js":40}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a number input that will record numbers  
 * for iVXjs.
 */
var Range = exports.Range = function () {

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
  function Range() {
    var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

    _classCallCheck(this, Range);

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


  _createClass(Range, [{
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
          uiAttributes = this.uiAttributes;
      var _input$label = input.label,
          label = _input$label === undefined ? '' : _input$label,
          _input$name = input.name,
          name = _input$name === undefined ? '' : _input$name,
          _input$id = input.id,
          id = _input$id === undefined ? '' : _input$id,
          labelHTML = input.labelHTML;
      var _settings$input = settings.input,
          inputSettings = _settings$input === undefined ? {} : _settings$input,
          _settings$showLabel = settings.showLabel,
          showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
      var _inputSettings$classe = inputSettings.classes,
          classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

      var inputHTML = " \n             \n            <p class=\"range-field\">\n            <input class=\"" + classes + "\"  name=\"" + name + "\"  type=\"range\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n           </p>\n           <label for=\"" + name + "\"> " + label + " </label>\n            " + errorHTML + "\n       ";

      return "" + inputHTML;
    }
  }]);

  return Range;
}();

},{"../utilities/attributes.js":54,"./messages.js":40}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputState = undefined;

var _stateInput = require('../default/state.input.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputState = exports.InputState = function (_DefaultInputState) {
    _inherits(InputState, _DefaultInputState);

    function InputState(header, formSection, footer, data) {
        _classCallCheck(this, InputState);

        return _possibleConstructorReturn(this, (InputState.__proto__ || Object.getPrototypeOf(InputState)).call(this, header, formSection, footer, data));
    }

    return InputState;
}(_stateInput.InputState);

},{"../default/state.input.js":20}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _stateNavigation = require('../default/state.navigation.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationState = exports.NavigationState = function (_DefaultNavigationSta) {
    _inherits(NavigationState, _DefaultNavigationSta);

    function NavigationState(data, linkSection) {
        _classCallCheck(this, NavigationState);

        return _possibleConstructorReturn(this, (NavigationState.__proto__ || Object.getPrototypeOf(NavigationState)).call(this, data, linkSection));
    }

    return NavigationState;
}(_stateNavigation.NavigationState);

;

},{"../default/state.navigation.js":21}],48:[function(require,module,exports){
'use strict';

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
        key: 'defaultHeaderClasses',
        get: function get() {
            return 'ui header';
        }
    }, {
        key: 'html',
        get: function get() {
            var playerSection = this.playerSection,
                data = this.data,
                iPhoneInlineClasses = this.iPhoneInlineClasses;
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


            return '\n            <section class="container ' + sectionClasses + ' ' + iPhoneInlineClasses + '" id="' + data.id + '">\n                <header class="' + headerClasses + ' ' + this.defaultHeaderClasses + '">' + headerHTML + '</header>\n                ' + playerSection + '\n                <footer class="' + footerClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return VideoState;
}();

},{}],49:[function(require,module,exports){
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
        key: "addWidthClasses",
        value: function addWidthClasses(inputHTML) {
            var currentWidthTotal = 0.0;
            var columnNames = ["col s1", "col s2", "col s3", "col s4", "col s5", "col s6", "col s7", "col s8", "col s9", "col s10", "col s11", "col s12"];
            var contents = inputHTML.reduce(function (contentHTML, thisInput) {
                var html = thisInput.html,
                    settings = thisInput.settings;
                var _settings$width = settings.width,
                    width = _settings$width === undefined ? "1" : _settings$width,
                    _settings$classes = settings.classes,
                    classes = _settings$classes === undefined ? '' : _settings$classes;

                var numericWidth = getNumericWidth(width);

                if (currentWidthTotal <= 0) {
                    contentHTML = contentHTML + "<div class=\"row\"> ";
                }

                currentWidthTotal += numericWidth;

                var bootstrapWidthStyleName = columnNames[Math.round(numericWidth * columnNames.length) - 1];

                html = html.replace('ivxjs-grid-1-1', "input-field " + bootstrapWidthStyleName + " " + classes);
                contentHTML = "" + contentHTML + html;

                if (currentWidthTotal >= 1) {
                    contentHTML = contentHTML + "</div>";
                    currentWidthTotal = 0;
                }

                return contentHTML;
            }, '');

            if (contents.substring(contents.length - 7) !== "</div>") {
                contents = contents + "</div>";
            }

            return contents;

            function getNumericWidth(widthString) {
                if (widthString === '1') return 1;

                var parsedWidthFormula = widthString.split('/');

                return parseFloat(parsedWidthFormula[0]) / parseFloat(parsedWidthFormula[1]);
            }
        }
    }]);

    return Style;
}();

},{}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _text = require('../default/text.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_DefaultText) {
    _inherits(Text, _DefaultText);

    function Text(inputObj) {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Text, [{
        key: 'uiClasses',
        get: function get() {
            return 'validate';
        }
    }, {
        key: 'html',
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + ' ' + uiClasses;

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

            nonValidateAttributesHTML = nonValidateAttributesHTML + ' ' + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = ' \n            \n            <input ' + nonValidateAttributesHTML + ' class="' + classes + '"  id="' + id + '" name="' + name + '"  type="text"    ' + errorTags + ' ' + tags + '>\n           \n            ' + errorHTML + '\n             <label for="' + id + '"> ' + label + ' </label>\n       ';

            return '' + inputHTML;
        }
    }]);

    return Text;
}(_text.Text);

},{"../default/text.js":23,"./messages.js":40}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textarea = require('../default/textarea.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Textarea = exports.Textarea = function (_DefaultTextarea) {
    _inherits(Textarea, _DefaultTextarea);

    function Textarea(inputObj) {
        _classCallCheck(this, Textarea);

        return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Textarea, [{
        key: 'uiClasses',
        get: function get() {
            return 'materialize-textarea';
        }
    }]);

    return Textarea;
}(_textarea.Textarea);

},{"../default/textarea.js":24,"./messages.js":40}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('../default/url.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url = exports.Url = function (_DefaultUrl) {
    _inherits(Url, _DefaultUrl);

    function Url(inputObj) {
        _classCallCheck(this, Url);

        return _possibleConstructorReturn(this, (Url.__proto__ || Object.getPrototypeOf(Url)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Url, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Url;
}(_url.Url);

},{"../default/url.js":25,"./messages.js":40}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoControls = require('../default/video.controls.js');

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_DefaultVideoControls) {
    _inherits(_class, _DefaultVideoControls);

    function _class(container, iVXjsBus) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, container, iVXjsBus));
    }

    _createClass(_class, [{
        key: 'adjustVolume',
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
            var muteIcon = this.getElementByClasses(muteControls.children, ["material-icons"]);

            muteIcon.innerHTML = unmuteClasses;
            currentVolumeSpan.style.width = volumeLevel * 100 + '%';

            this.currentVolume = volumeLevel;
            this.setVolume(volumeLevel);
        }
    }, {
        key: 'setPlayPause',
        value: function setPlayPause(event) {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, ["material-icons"]);

            switch (playPauseIcon.innerHTML) {
                case playClasses:
                    playPauseIcon.innerHTML = pauseClasses;

                    this.play();
                    break;
                case pauseClasses:
                    playPauseIcon.innerHTML = playClasses;

                    this.pause();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'setMute',
        value: function setMute(event) {
            var muteControls = this.muteControls,
                muteClasses = this.muteClasses,
                unmuteClasses = this.unmuteClasses,
                volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, ["material-icons"]);
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            switch (muteIcon.innerHTML) {
                case unmuteClasses:
                    muteIcon.innerHTML = muteClasses;
                    currentVolumeSpan.style.width = '0%';

                    this.setVolume(0);
                    break;
                case muteClasses:
                    muteIcon.innerHTML = unmuteClasses;
                    currentVolumeSpan.style.width = this.currentVolume * 100 + '%';

                    this.setVolume(this.currentVolume);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'onPlaying',
        value: function onPlaying() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, ["material-icons"]);

            playPauseIcon.innerHTML = pauseClasses;

            this.play();
        }
    }, {
        key: 'onPaused',
        value: function onPaused() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, ["material-icons"]);

            playPauseIcon.innerHTML = playClasses;

            this.pause();
        }
    }, {
        key: 'totalTimeInfoClasses',
        get: function get() {
            return 'duration';
        }
    }, {
        key: 'playClasses',
        get: function get() {
            return 'play_arrow';
        }
    }, {
        key: 'pauseClasses',
        get: function get() {
            return 'pause';
        }
    }, {
        key: 'unmuteClasses',
        get: function get() {
            return 'volume_up';
        }
    }, {
        key: 'muteClasses',
        get: function get() {
            return 'volume_off';
        }
    }, {
        key: 'playPauseControlsClasses',
        get: function get() {
            return 'btn-floating waves-effect waves-light green';
        }
    }, {
        key: 'muteControlsClasses',
        get: function get() {
            return 'btn-floating waves-effect waves-light grey';
        }
    }, {
        key: 'scrubBarClasses',
        get: function get() {
            return 'range-field';
        }
    }, {
        key: 'scrubBarTimeLapseClasses',
        get: function get() {
            return 'bar';
        }
    }, {
        key: 'scrubBarHTML',
        get: function get() {
            return '\n            <div id="video-controls-scrub-bar" class="progress ' + this.scrubBarClasses + '">\n                <div class="determinate bar"></div>\n            </div>\n            ' + this.timestampHTML + '\n        ';
        }
    }, {
        key: 'volumeBarCurrentVolumeClasses',
        get: function get() {
            return 'determinate';
        }
    }, {
        key: 'volumeBarHTML',
        get: function get() {
            return '\n            <div id="video-controls-volume-bar" class="progress ' + this.volumeBarClasses + '">\n                <div id="video-controls-scrub-bar" class="' + this.volumeBarCurrentVolumeClasses + '"></div>\n            </div>\n            \n        ';
        }
    }, {
        key: 'playPauseButtonHTML',
        get: function get() {
            var play = this.playClasses,
                pause = this.pauseClasses;
            var playPauseControls = this.playPauseControlsClasses;

            return '\n        <div id="play-button-container"  class="left-align">\n            <button id="video-controls-play-pause" class="' + playPauseControls + '">\n                <i class=\'material-icons\'>' + play + '</i>\n            </button>\n        </div>';
        }
    }, {
        key: 'timestampHTML',
        get: function get() {
            return '\n        <div class="center-align">\n        <span id="video-controls-current-time" class="' + this.currentTimeInfoClasses + '"></span>\n        <span id="video-controls-total-time" class="' + this.totalTimeInfoClasses + '"></span>\n        </div>\n        ';
        }
    }, {
        key: 'muteButtonHTML',
        get: function get() {
            var unmute = this.unmuteClasses,
                muteControlsClasses = this.muteControlsClasses;

            return '\n        <div id="mute-button-container" class="left-align">\n            <button id="video-controls-mute-controls" class="' + muteControlsClasses + '">\n               <i class=\'material-icons\'>' + unmute + '</i>\n            </button>\n        </div>\n        ';
        }
    }, {
        key: 'html',
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML,
                scrubBarHTML = this.scrubBarHTML,
                timestampHTML = this.timestampHTML,
                muteButtonHTML = this.muteButtonHTML,
                volumeBarHTML = this.volumeBarHTML;


            return '\n        ' + scrubBarHTML + '\n        ' + playPauseButtonHTML + '\n        ' + volumeBarHTML + '  \n        ' + muteButtonHTML + '                         \n        ';
        }
    }]);

    return _class;
}(_videoControls2.default);

exports.default = _class;

},{"../default/video.controls.js":26}],54:[function(require,module,exports){
'use strict';

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

},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'contructor',
        value: function contructor() {
            this.volume = 0;
            this.currenttime = 0;
        }
    }, {
        key: 'play',
        value: function play() {
            this.iVXjsBus.emit(this.controlEventNames.PLAY);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.iVXjsBus.emit(this.controlEventNames.PAUSE);
        }
    }, {
        key: 'getDuration',
        value: function getDuration(cb) {
            this.iVXjsBus.once(this.controlEventNames.SET_DURATION, function (duration) {
                cb(duration);
            });
            this.iVXjsBus.emit(this.controlEventNames.GET_DURATION);
        }
    }, {
        key: 'setVolume',
        value: function setVolume(volume) {
            this.iVXjsBus.emit(this.controlEventNames.SET_VOLUME, volume);
        }
    }, {
        key: 'seek',
        value: function seek(seconds) {
            this.iVXjsBus.emit(this.controlEventNames.SEEK, seconds);
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../settings.js":57}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('./events.js');

var _events2 = _interopRequireDefault(_events);

var _videoEvents = require('../../../constants/video.events.js');

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = exports.Controls = function (_ControlEvents) {
    _inherits(Controls, _ControlEvents);

    function Controls() {
        _classCallCheck(this, Controls);

        var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this));

        _this.currentVolume = 0.5;
        _this.controlEventNames = new _videoEvents2.default();
        return _this;
    }

    _createClass(Controls, [{
        key: 'dispose',
        value: function dispose(iVXjsBus) {
            iVXjsBus.removeListener(this.controlEventNames.TIME_UPDATE, this.updateTime);
            iVXjsBus.removeListener(this.controlEventNames.PLAYING, this.whilePlaying);
            iVXjsBus.removeListener(this.controlEventNames.CAN_PLAY, this.canPlayCallback);
        }
    }, {
        key: 'getAbsolutePosition',
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
        key: 'adjustVolume',
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
            currentVolumeSpan.style.width = volumeLevel * 100 + '%';

            this.currentVolume = volumeLevel;
            this.setVolume(volumeLevel);
        }
    }, {
        key: 'scrub',
        value: function scrub(event) {
            var currentTimeInfo = this.currentTimeInfo,
                scrubBar = this.scrubBar,
                scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
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

            currentTimeInfo.innerHTML = '' + currentTimeStamp;
            timelapsed.style.width = trueX / width * 100 + '%';

            this.seek(scrubToTime);
        }
    }, {
        key: 'setPlayPause',
        value: function setPlayPause(event) {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            switch (playPauseIcon.className) {
                case playClasses:
                    playPauseIcon.className = pauseClasses;

                    this.play();
                    break;
                case pauseClasses:
                    playPauseIcon.className = playClasses;

                    this.pause();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'setMute',
        value: function setMute(event) {
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
                    muteIcon.className = muteClasses;
                    currentVolumeSpan.style.width = '0%';

                    this.setVolume(0);
                    break;
                case muteClasses:
                    muteIcon.className = unmuteClasses;
                    currentVolumeSpan.style.width = this.currentVolume * 100 + '%';

                    this.setVolume(this.currentVolume);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'onReadyToPlay',
        value: function onReadyToPlay(player, stateData) {
            var volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var self = this;
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            currentVolumeSpan.style.width = self.currentVolume * 100 + '%';

            this.setVolume(self.currentVolume);
            this.getDuration(function (duration) {
                var totalTimeInfo = self.totalTimeInfo,
                    currentTimeInfo = self.currentTimeInfo,
                    scrubBar = self.scrubBar;

                var durationTimeObject = self.convertSecondsToParts(duration);
                var durationTimeStamp = self.createTimeStamp(durationTimeObject);

                self.duration = duration;

                if (totalTimeInfo) totalTimeInfo.innerHTML = '/' + durationTimeStamp;
                if (currentTimeInfo) currentTimeInfo.innerHTML = '00:00';
                if (scrubBar) scrubBar.children[0].style.width = '0%';
            });
        }
    }, {
        key: 'onTimeUpdate',
        value: function onTimeUpdate(player) {
            var currentTimeInfo = this.currentTimeInfo,
                scrubBar = this.scrubBar,
                scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
            var seconds = player.currentTime;


            seconds = seconds > this.duration ? 0 : seconds;

            var currentTimeObject = this.convertSecondsToParts(seconds);
            var currentTimeStamp = this.createTimeStamp(currentTimeObject);
            var timeLapsed = seconds / this.duration;

            if (currentTimeInfo) currentTimeInfo.innerHTML = '' + currentTimeStamp;

            var searchClasses = [scrubBarTimeLapseClasses];

            if (scrubBar) {
                var timelapsedElement = this.getElementByClasses(scrubBar.children, searchClasses);

                timelapsedElement.style.width = timeLapsed * 100 + '%';
            }
        }
    }, {
        key: 'onPlaying',
        value: function onPlaying() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = pauseClasses;

            this.play();
        }
    }, {
        key: 'onPaused',
        value: function onPaused() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = playClasses;

            this.pause();
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners(iVXjsBus) {
            var self = this;
            var scrubBar = this.scrubBar,
                volumeBar = this.volumeBar,
                playPauseControls = this.playPauseControls,
                muteControls = this.muteControls;


            this.iVXjsBus = iVXjsBus;
            this.updateTime = iVXjsBus.on(this.controlEventNames.TIME_UPDATE, updateTime);
            this.whilePaused = iVXjsBus.on(this.controlEventNames.PAUSED, whilePaused);
            this.whilePlaying = iVXjsBus.on(this.controlEventNames.PLAYING, whilePlaying);
            this.canPlayCallback = iVXjsBus.on(this.controlEventNames.CAN_PLAY, canPlayCallBack);
            this.updateTime = this.updateTime ? this.updateTime : updateTime;

            volumeBar.addEventListener('mousedown', function (event) {
                self.adjustVolume(event);
            });
            scrubBar.addEventListener('click', function (event) {
                self.scrub(event);
            });
            playPauseControls.addEventListener('mouseup', function (event) {
                self.setPlayPause(event);
            });
            muteControls.addEventListener('click', function (event) {
                self.setMute(event);
            });

            function canPlayCallBack(player, _stateData) {
                self.onReadyToPlay(player, _stateData);
            }

            function updateTime(player) {
                self.onTimeUpdate(player);
            }

            function whilePaused(player) {
                self.onPaused(player);
            }

            function whilePlaying() {
                self.onPlaying();
            }
        }
    }, {
        key: 'getElementByClasses',
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
        key: 'createTimeStamp',
        value: function createTimeStamp(timeObject) {
            var hours = timeObject.hours,
                minutes = timeObject.remainingMinutes,
                seconds = timeObject.remainingSeconds;

            var hourString = '';
            var minuteString = minutes < 10 ? '0' + minutes + ':' : minutes + ':';
            var secondString = seconds < 10 ? '0' + seconds : '' + seconds;

            if (hours > 0) {
                hourString = hours < 10 ? '0' + hours + ':' : hours + ':';
            };

            return '' + hourString + minuteString + secondString;
        }
    }, {
        key: 'convertSecondsToParts',
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

},{"../../../constants/video.events.js":7,"./events.js":55}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
'use strict';

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

},{}]},{},[39])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvZmlyZWJhc2UuYXV0aGVudGljYXRpb24uanMiLCJzcmMvY29uc3RhbnRzL2ZpcmViYXNlLmpzIiwic3JjL2NvbnN0YW50cy9pbmRleC5qcyIsInNyYy9jb25zdGFudHMvdmlkZW8uZXZlbnRzLmpzIiwic3JjL2NvbnN0YW50cy92aWRlby5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvYW5jaG9yLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9idXR0b25zLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZGF0ZS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZGF0ZXRpbWUtbG9jYWwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2VtYWlsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9vcHRpb25zLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3RhdGUuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0eWxlLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdXJsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQuZmlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQucGFzc3dvcmQuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9hbmd1bGFyL2RpcmVjdGl2ZXMvaW5wdXQuZmlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvZGlyZWN0aXZlcy9pbnB1dC5wYXNzd29yZC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2J1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvZmlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2Zvcm0uanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL21lc3NhZ2VzLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3Bhc3N3b3JkLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvcmFkaW8uanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9yYW5nZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvZXZlbnRzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy92aWRlby9zZXR0aW5ncy5qcyIsInNyYy91dGlsaXRpZXMvYXNzZXJ0cy5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLHFCO0FBQVQsU0FBUyxxQkFBVCxDQUErQixXQUEvQixFQUE0QztBQUMxRCxLQUFJLGdCQUFnQixXQUFwQjtBQUNBLEtBQUksT0FBTyxjQUFjLE9BQXpCO0FBQ0EsS0FBSSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBYTtBQUFBLG9DQUFULElBQVM7QUFBVCxPQUFTO0FBQUE7O0FBQy9CLDRDQUFXLGFBQVgsZ0JBQTRCLElBQTVCO0FBQ0gsRUFGRDs7QUFJQSxNQUFLLElBQUwsQ0FBVSxlQUFWOztBQUVBLFFBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7O0FDVkQ7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LG1CQUFPLFNBQVA7QUFDSDs7Ozs7O0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XHJcblx0bGV0IGNvbnN0cnVjdG9yRm4gPSBjb25zdHJ1Y3RvcjtcclxuXHRsZXQgYXJncyA9IGNvbnN0cnVjdG9yRm4uJGluamVjdDtcclxuXHRsZXQgZmFjdG9yeUZ1bmN0aW9uID0gKC4uLmFyZ3MpID0+IHtcclxuICAgIFx0cmV0dXJuIG5ldyBjb25zdHJ1Y3RvckZuKC4uLmFyZ3MpO1xyXG5cdH1cclxuXHRcclxuXHRhcmdzLnB1c2goZmFjdG9yeUZ1bmN0aW9uKTtcclxuXHJcblx0cmV0dXJuIGFyZ3M7XHJcbn0iLCJpbXBvcnQgeyBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmxldCBteVR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dENvbnRyb2xsZXJIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHsgaW5wdXREYXRhOiBpbnB1dCB9ID0gJHNjb3BlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RXhwZXJpZW5jZVZhbHVlID0gaVZYanMuZXhwZXJpZW5jZS5kYXRhW2lucHV0Lm5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXRWYWx1ZSA9IGN1cnJlbnRFeHBlcmllbmNlVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RXhwZXJpZW5jZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pbnB1dFZhbHVlID0gY3VycmVudEV4cGVyaWVuY2VWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJ2NoYW5nZWQnLCBmdW5jdGlvbiAoaW5wdXQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghbXlUeXBlVmFsaWRhdG9yLmlzRW1wdHkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB7IG5hbWUsIG9uQ2hhbmdlID0gW10gfSA9IGlucHV0O1xyXG5cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ3NldERhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpVlhqcy5sb2cuZGVidWcoYElucHV0ICR7aW5wdXQubmFtZX0gT24gQ2hhbmdlIFN0YXJ0ZWRgLCB7fSwgeyBpbnB1dCwgc291cmNlOiAnb25DaGFuZ2UnLCBzdGF0dXM6ICdzdGFydGVkJywgYWN0aW9uczogb25DaGFuZ2UsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpVlhqcy5sb2cuZGVidWcoYElucHV0ICR7aW5wdXQubmFtZX0gT24gQ2hhbmdlIEVuZGVkYCwge30sIHsgaW5wdXQsIHNvdXJjZTogJ29uQ2hhbmdlJywgc3RhdHVzOiAnY29tcGxldGVkJywgYWN0aW9uczogb25DaGFuZ2UsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtPYmplY3RQYXJzZXJzfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcbmxldCB0aGlzT2JqZWN0UGFyc2VyID0gbmV3IE9iamVjdFBhcnNlcnMoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBlcnJvcnMsIGF0dHJpYnV0ZXMgPSB7fSkge1xyXG4gICAgICAgIGxldCB7bmFtZTogaW5wdXROYW1lLCB0eXBlOiBpbnB1dFR5cGV9ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dE5hbWUgPSBpbnB1dE5hbWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGFncygpIHtcclxuICAgICAgICBsZXQge2F0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgYW5ndWxhckVycm9yTWFwID0gdGhpcy5hbmd1bGFyRXJyb3JNYXA7XHJcbiAgICAgICAgbGV0IG5vbkFuZ3VsYXIgPSB0aGlzLm5vbkFuZ3VsYXI7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlID0gdGhpcy5ub25WYWxpZGF0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNPYmplY3RQYXJzZXIucmVkdWNlKGF0dHJpYnV0ZXMsICh0YWdzLCBhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlS2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChub25WYWxpZGF0ZS5pbmRleE9mKGF0dHJpYnV0ZUtleSkgPj0gMCkgcmV0dXJuIHRhZ3M7XHJcbiAgICAgICAgICAgIGxldCB0YWcgPSBub25Bbmd1bGFyLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+PSAwID9cclxuICAgICAgICAgICAgICAgIGAke2F0dHJpYnV0ZUtleX09XCIke2F0dHJpYnV0ZVZhbHVlfVwiYCA6XHJcbiAgICAgICAgICAgICAgICBgbmctJHthbmd1bGFyRXJyb3JNYXBbYXR0cmlidXRlS2V5XX0gPSBcIiR7YXR0cmlidXRlVmFsdWV9XCIgYDtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RhZ3N9ICR7dGFnfWA7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlcygpIHtcclxuICAgICAgICBsZXQge2lucHV0TmFtZSwgaW5wdXRUeXBlLCBlcnJvcnMsIGF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgYW5ndWxhckVycm9yTWFwID0gdGhpcy5hbmd1bGFyRXJyb3JNYXA7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRNZXNzYWdlcyA9IHRoaXMuZGVmYXVsdEVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGF0dHJpYnV0ZUtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBlcnJvcnMgJiYgZXJyb3JzW2F0dHJpYnV0ZUtleV0gPyBlcnJvcnNbYXR0cmlidXRlS2V5XSA6IGRlZmF1bHRNZXNzYWdlc1thdHRyaWJ1dGVLZXldO1xyXG4gICAgICAgICAgICBsZXQgYXR0ckhUTUwgPSBgbmctc2hvdz1cIigkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGRpcnR5IHx8ICRwYXJlbnQuZm9ybUlucHV0LiRzdWJtaXR0ZWQpICYmICRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZXJyb3IuJHthbmd1bGFyRXJyb3JNYXBbYXR0cmlidXRlS2V5XX1cImA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGF0dHJIVE1MOiBhdHRySFRNTFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlucHV0VHlwZSAmJiBpbnB1dFR5cGUgIT09ICd0ZXh0JyAmJiBpbnB1dFR5cGUgIT0gXCJvcHRpb25zXCIpIHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlcy5wdXNoKHRoaXMuaW5wdXRUeXBlRXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0VHlwZUVycm9yKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXROYW1lLCBpbnB1dFR5cGUsIGVycm9yc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBlcnJvcnNbaW5wdXRUeXBlXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlID8gZXJyb3JNZXNzYWdlIDogXCJJbnZhbGlkIFwiICsgaW5wdXRUeXBlLFxyXG4gICAgICAgICAgICBhdHRySFRNTDogYG5nLXNob3c9XCIoJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRkaXJ0eSB8fCAkcGFyZW50LmZvcm1JbnB1dC4kc3VibWl0dGVkKSAmJiAkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGVycm9yLiR7aW5wdXRUeXBlfVwiYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbm9uQW5ndWxhcigpIHtcclxuICAgICAgICByZXR1cm4gWydtaW4nLCAnbWF4JywgJ3JlYWRvbmx5JywgJ3BsYWNlaG9sZGVyJywgJ3N0ZXAnLCAncmVhZG9ubHknLCAnc3R5bGUnXVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBub25WYWxpZGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gWydzdGVwJywgJ3BsYWNlaG9sZGVyJywgJ3JlYWRvbmx5J107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuZ3VsYXJFcnJvck1hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6ICdtaW5sZW5ndGgnLFxyXG4gICAgICAgICAgICBtaW46IFwibWluXCIsXHJcbiAgICAgICAgICAgIG1heDogXCJtYXhcIixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogJ21heGxlbmd0aCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0RXJyb3JNZXNzYWdlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6ICdUb28gU2hvcnQnLFxyXG4gICAgICAgICAgICBtaW46IFwiVG9vIExvd1wiLFxyXG4gICAgICAgICAgICBtYXg6IFwiVG9vIEhpZ2hcIixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdSZXF1aXJlZCcsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogJ1RvbyBMb25nJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRmlyZWJhc2UgZnJvbSBcIi4vZmlyZWJhc2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgRmlyZWJhc2V7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkFVVEhFTlRJQ0FUSU9OID0gXCJhdXRoXCJcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIFJFUVVFU1RfUEFTU1dPUkQgOiBcInJlcXVlc3QtcGFzc3dvcmRcIixcbiAgICAgICAgICAgIEdFVF9QQVNTV09SRCA6IFwiZ2V0LXBhc3N3b3JkXCIsXG4gICAgICAgICAgICBBQ0NPVU5UX0VYSVNUUyA6IFwiYWNjb3VudC1leGlzdHMtd2l0aC1kaWZmZXJlbnQtY3JlZGVudGlhbFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgQVVUSEVOVElDQVRJT059ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7QVVUSEVOVElDQVRJT059JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5GSVJFQkFTRSA9IFwiZmlyZWJhc2VcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBGSVJFQkFTRX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7RklSRUJBU0V9YDsgICBcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuTElCUkFSWSA9IFwiaVZYanNcIjtcbiAgICAgICAgdGhpcy5ERUxJTUVURVIgPSBcIjpcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLkxJQlJBUlk7XG4gICAgfVxuXG4gICAgYWRkTmFtZXMobmFtZUNvbGxlY3Rpb24pe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBuYW1lcyA9IE9iamVjdC5rZXlzKG5hbWVDb2xsZWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUsIGluZGV4KSA9PntcbiAgICAgICAgICAgIHNlbGZbbmFtZV0gPSBzZWxmLmNvbnZlbnRpb24obmFtZUNvbGxlY3Rpb25bbmFtZV0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgVmlkZW9Db25zdGFudHMgZnJvbSBcIi4vdmlkZW8uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWRlb0NvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBBRERfUExBWUlOR19DTEFTUzogJ2FkZC1wbGF5aW5nLWNsYXNzJyxcbiAgICAgICAgICAgIEJVRkZFUklORyA6IFwiYnVmZmVyaW5nXCIsXG4gICAgICAgICAgICBDQU5fUExBWTogXCJjYW4tcGxheVwiLFxuICAgICAgICAgICAgRElTUE9TRSA6IFwiZGlzcG9zZVwiLFxuICAgICAgICAgICAgRU5ERUQgOiBcImVuZGVkXCIsXG4gICAgICAgICAgICBHRVRfRFVSQVRJT046IFwiZ2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBNVVRFOiBcIm11dGVcIixcbiAgICAgICAgICAgIFBBVVNFOiBcInBhdXNlXCIsXG4gICAgICAgICAgICBQQVVTRUQ6IFwicGF1c2VkXCIsXG4gICAgICAgICAgICBQTEFZOiBcInBsYXlcIixcbiAgICAgICAgICAgIFBMQVlJTkc6IFwicGxheWluZ1wiLFxuICAgICAgICAgICAgUkVBRFlfUExBWUVSIDogXCJyZWFkeS1wbGF5ZXJcIixcbiAgICAgICAgICAgIFNFRUs6IFwic2Vla1wiLFxuICAgICAgICAgICAgU0VUX0RVUkFUSU9OOiBcInNldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1ZPTFVNRTogXCJzZXQtdm9sdW1lXCIsXG4gICAgICAgICAgICBUSU1FX1VQREFURTogXCJ0aW1lLXVwZGF0ZVwiLFxuICAgICAgICAgICAgVU5NVVRFOiBcInVubXV0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5WSURFTyA9IFwidmlkZW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBWSURFT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7VklERU99YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL2Fzc2VydHMuanMnO1xuXG5sZXQgdHlwZUNoZWNrID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcblxuZXhwb3J0IGNsYXNzIEFuY2hvciB7XG4gICAgY29uc3RydWN0b3IoYW5jaG9ySW5mbykgeyAgIFxuICAgICAgIHRoaXMuYW5jaG9ySW5mbyA9IGFuY2hvckluZm87XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBnZXQgYW5jaG9yQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIFxuICAgIGdldCBodG1sKCkge1xuICAgICAgICBsZXQge2FuY2hvckNsYXNzZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtocmVmID0gJycsIGNsYXNzZXMgPSAnJywgYXR0cmlidXRlcyA9IHt9LCBsYWJlbCA9IGxhYmVsSFRNTCwgbGFiZWxIVE1MLCBpZD0nJ30gPSB0aGlzLmFuY2hvckluZm87IFxuICAgICAgICBsZXQgYXR0cmlidXRlSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGF0dHJpYnV0ZXMsIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpKS5odG1sO1xuXG4gICAgICAgIGlmKCFsYWJlbEhUTUwgJiYgIWxhYmVsKXtcbiAgICAgICAgICAgIGxhYmVsID0gaHJlZjtcbiAgICAgICAgfSBcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgIDxhIGlkPScke2lkfScgY2xhc3M9XCIke2NsYXNzZXN9ICR7YW5jaG9yQ2xhc3Nlc31cIiAgaHJlZj1cIiR7aHJlZn1cIiAke2F0dHJpYnV0ZUhUTUx9ID4ke2xhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsfTwvYT4gICAgICAgICAgIFxuICAgICAgICBgXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5sZXQgdHlwZUNoZWNrID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGEgY29sbGVjdGlvbiBvZiBidXR0b25zIGZvciBvbmUgY2xpY2sgcmVjb3JkaW5nIG9mIFxyXG4gKiBhbiBpbnB1dCB0aGF0IGhhcyBtdWx0aXBsZSBvcHRpb25zIGZvciBkYXRhIHJlY29yZGluZy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRha2VzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIGJ1dHRvbnMsIGEgY2xhc3MgdGhhdCByZW5kZXJzIHRoZSBcclxuICAgICAqIGVycm9yIG1lc3NhZ2VzIGFuZCBhIGNsYXNzIHRoYXQgcmVuZGVycyBhdHRyaWJ1dGVzLiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvIC0gSW5mb3JtYXRpb24gdG8gY3JlYXRlIHRoaXMgYnV0dG9uIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYnV0dG9uc0luZm8uYnV0dG9ucyAtIGVhY2ggaW5kaXZpZHVhbCBidXR0b24gZGF0YSBhbmQgc2V0dGluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9uc0luZm8uc2V0dGluZ3MgLSBzZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgXHJcbiAgICAgKiBAcGFyYW0ge0NsYXNzfSBidXR0b25zSW5mby5lcnJvcnMgLSBhbiBlcnJvciBjbGFzcyB0aGF0IHdhcyBjcmVhdGVkIGJ5IHRoZSBcclxuICAgICAqIHJlbmRlcmluZyBsaWJyYXJ5IHNvIHRoZSBlcnJvcnMgb3BlbiBhbmQgZGlzcGxheSBhbG9uZ3NpZGUgdGhlIGxpYnJhcnkuIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihidXR0b25zID0gW10sIGlucHV0LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCdXR0b25zIHRvIGJlIHJlbmRlcmVkXHJcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciBhbGwgYnV0dG9ucyBpbiB0aGlzIGdyb3VwIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFcnJvciBtZXNzYWdlIGNsYXNzIHRoYXQgd2lsbCB0YWtlIHRoZSBlcnJvcnMgZnJvbSBcclxuICAgICAgICAgKiB0aGUgcmVuZGVyaW5nIGxpYnJhcnkgYW5kIGFkZHMgdGhlbSB0byB0aGlzIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGF0dHJpYnV0ZSB0YWdzIGh0bWwgdG8gYmUgYWRkZWQgdG8gdGhpcyBidXR0b24gXHJcbiAgICAgICAgICogaW5wdXRzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGV0cyB1c2VycyBhZGQgdGhlIHNhbWUgY2xhc3NlcyB0byBhbGwgYnV0dG9ucyBqdXN0IGluIFxyXG4gICAgICogY2FzZSBidXR0b25zIHNoYXJlIGEgc3BlY2lmaWMgY2xhc3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBidXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIEhUTUwgZm9yIGV2ZXJ5IGJ1dHRvbnMgZGVmaW5lZCBpbiB0aGUgYnV0dG9ucyBhcnJheSBhbmQgXHJcbiAgICAgKiBhdHRhY2hlcyB0aGUgZXJyb3IgbWVzc2FnZXMgYXR0YWNoZWQgdG8gdGhpcyBpbnB1dC4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBidXR0b25DbGFzc2VzID0gJ2J1dHRvbi1jbGFzcyc7XHJcbiAgICAgKiBidXR0b25zID0gW3tcclxuICAgICAqICAgIGxhYmVsIDogXCJCdXR0b24gMVwiLFxyXG4gICAgICogICAgYXR0ckhUTUwgOiBcImRpc2FibGVkXCIsXHJcbiAgICAgKiAgICBjbGFzc2VzIDogXCJjbGFzcy0xXCJcclxuICAgICAqIH0se1xyXG4gICAgICogICAgbGFiZWwgOiBcIjxoMT5CdXR0b24gMjwvaDE+XCIsXHJcbiAgICAgKiAgICBjbGFzc2VzIFwiIGNsYXNzLTJcIlxyXG4gICAgICogfV07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIFdpbGwgcmVuZGVyOlxyXG4gICAgICogXHJcbiAgICAgKiA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWNsYXNzIGNsYXNzLTFcIiBkaXNhYmxlZD5CdXR0b24gMTwvYnV0dG9uPlxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBjbGFzcyBjbGFzcy0yXCI+PGgxPkJ1dHRvbiAyPC9oMT48L2J1dHRvbj5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcnM6IGVycm9yQ2xhc3MgPSB7fSwgYnV0dG9ucyA9IFtdLCBpbnB1dCA9IHt9LCBidXR0b25DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlcyA9IHt9LCBlcnJvcnMgPSB7fSwgbWVzc2FnZXMgPSB7fSB9ID0gZXJyb3JDbGFzcztcclxuICAgICAgICBsZXQgYnV0dG9uRXJyb3JNZXNzYWdlcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7ZXJyb3JzW2tleV19YCxcclxuICAgICAgICAgICAgICAgIGF0dHJIVE1MOiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGJ1dHRvbkVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwgPSAnJywgc2hvd0xhYmVsID0gZmFsc2UsIGlkfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCBidXR0b25zSFRNTCA9IGJ1dHRvbnMucmVkdWNlKChodG1sLCBidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IGxhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gXCJcIiB9ID0gYnV0dG9uO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9IFxyXG4gICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAke2F0dHJIVE1MfSBjbGFzcz1cIiR7Y2xhc3Nlc30gJHtidXR0b25DbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKChsYWJlbEhUTUwubGVuZ3RoID4gMCB8fCBsYWJlbC5sZW5ndGggPiAwKSAmJiBzaG93TGFiZWwpIHtcclxuICAgICAgICAgICAgbGFiZWxIVE1MID0gbGFiZWxIVE1MID8gbGFiZWxIVE1MIDogbGFiZWw7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGA8bGFiZWwgZm9yPVwiJHtpZH1cIj4ke2xhYmVsSFRNTH08L2xhYmVsPmBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAke2xhYmVsSFRNTH1cclxuICAgICAgICAgICAgICR7YnV0dG9uc0hUTUx9XHJcbiAgICAgICAgICAgICAke2Vycm9yTWVzc2FnZXN9ICAgICAgICAgICAgIFxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogUHJvZHVjZXMgaHRtbCB0byBidWlsZCBhIGNoZWNrYm94IGlucHV0IGZvciB0aGUgIFxyXG4gKiB2YXJpb3VzIHJlbmRlcmluZyBsaWJyYXJpZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgdGhlIGNoZWNrYm94J3Mgc2V0dGluZ3MgZnJvbSBhIHN0YW5kYXJkIGlucHV0IGRhdGEgXHJcbiAgICAgKiBvYmplY3QgYW5kIHNldHMgdGhlIHR5cGUgb2YgZXJyb3IgbWVzc2FnZXMgdGhpcyBjbGFzcyBcclxuICAgICAqIHdpbGwgcmVuZGVyIGlmIHRoZSBjaGVja2JveCBpc24ndCB2YWxpZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0T2JqIC0gY29udGFpbnMgYWxsIHRoZSBjb25maWd1cmF0aW9ucyBcclxuICAgICAqIHRvIHJlbmRlciB0aGlzIGlucHV0LlxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gZXJyb3JNZXNzYWdlcyAtIGEgY2xhc3MgdGhhdCB3aWxsIHJlbmRlciB0aGUgXHJcbiAgICAgKiBzcGVjaWZpYyB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIGJhc2VkIG9uIHRoaXMgVUkncyBzZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCB0YWdzID0gJycsIHNldHRpbmdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIGNoZWNrYm94J3MgaW5wdXQgY29uZmlndXJhdGlvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQW55IGN1c3RvbSB0YWdzIHBhc3NlZCBkb3duIGZyb20gdGhlIHJlbmRlcmluZyBsaWJyYXJ5LiBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciB0aGlzIHdob2xlIGlucHV0IGluY2x1ZGluZyB0aGUgY29udGFpbmVyXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgY2xhc3Mgb2YgZXJyb3JzIGNyZWF0ZWQgYnkgdGhlIHJlbmRlcmluZyBsaWJyYXJ5IHRvIFxyXG4gICAgICAgICAqIGhpZGUgYW5kIHNob3cgdmFyaW91cyBlcnJvcnMuXHJcbiAgICAgICAgICogQHR5cGUge2NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIFVJJ3MgcmVuZGVyaW5nIG9mIHRoaXMgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICAgICAgICogQHR5cGUge2NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVmYXVsdCBjbGFzcyB0byB0aGlzIGNoZWNrYm94IGlucHV0IFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBVSSBzcGVjaWZpYyBhdHRyaWJ1dGVzXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0cmlidXRlcyB0aGF0IHJlcXVpcmVkIGZvciB0aGlzIGNoZWNrYm94IGlucHV0IFxyXG4gICAgICogdG8gYmUgdXNlZCBhbmQgcmVuZGVyZWQgcHJvcGVybHkuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBzdHJpbmcgb2YgYWxsIGF0dHJpYnV0ZXMgdG8gbG9hZCBcclxuICAgICAqIHRoaXMgaW5wdXQgaW5jbHVkaW5nIGl0cyBpZCwgbmFtZSBhbmQgdHlwZS5cclxuICAgICAqL1xyXG4gICAgZ2V0IHJlcXVpcmVkQXR0cmlidXRlcygpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZCwgbmFtZX0gPSBpbnB1dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcImA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciB0aGlzIGNoZWNrYm94IGZyb20gdGhlIGdpdmVuIGF0dHJpYnV0ZXMgXHJcbiAgICAgKiBhbmQgY2xhc3Nlcy5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB1aUNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGlucHV0LmNsYXNzZXMgPSBcImNsYXNzLTJcIjtcclxuICAgICAqIHJlcXVpcmVkQXR0cmlidXRlcyA9IFwiaWQ9J2lkLTEnIG5hbWU9J2NoZWNrYm94LW5hbWUnIHR5cGU9J2NoZWNrYm94J1wiXHJcbiAgICAgKiAvLyBSZW5kZXJzIFRvOlxyXG4gICAgICogPGxhYmVsIGNsYXNzPVwiY2xhc3MtMSBjbGFzcy0yXCI+XHJcbiAgICAgKiAgICAgPGlucHV0IGlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCc+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIGh0bWwgb2YgdGhlIGZ1bGx5IGNyZWF0ZWQgY2hlY2tib3hcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQ2hlY2tib3hDb250YWluZXIoY2xhc3NlcywgYXR0cmlidXRlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge3Nob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIiBjbGFzcz1cIiR7Y2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgPGlucHV0ICR7YXR0cmlidXRlc30+XHJcbiAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYW5kIHJlbmRlcnMgYWxsIHRoZSBIVE1MIGZvciB0aGlzIGNoZWNrYm94IGJhc2VkIG9uIHRoZSBzZXR0aW5ncy5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHt0YWdzLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMsIGlucHV0LCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHsgaWQsIG5hbWUsIGxhYmVsID0gJycgfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7IG1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXMgPSB7fSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gdGhpcy5lcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9yQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMobWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IGFsbENsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG4gICAgICAgIGxldCBhbGxBdHRyaWJ1dGVzID0gYCR7cmVxdWlyZWRBdHRyaWJ1dGVzfSAke3VpQXR0cmlidXRlc30gJHt0YWdzfSAke2Vycm9yVGFnc31gXHJcbiAgICAgICAgbGV0IGNoZWNrYm94SFRNTCA9IHRoaXMucmVuZGVyQ2hlY2tib3hDb250YWluZXIoYWxsQ2xhc3NlcywgYWxsQXR0cmlidXRlcyk7XHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICR7Y2hlY2tib3hIVE1MfVxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7U3R5bGV9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7RXJyb3JNZXNzYWdlc30gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHtBdHRyaWJ1dGVUYWdzfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRlIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgZGF0ZSBzcGVjaWZpYyBkYXRhIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgICogbWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIHRoaXMgZGF0ZSBpbnB1dCBib3hcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBkYXRlIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZGF0ZSBpbnB1dHMgXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRlIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIERhdGUudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCwgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGVcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGRhdGV0aW1lIGxvY2FsIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgZGF0ZSB3aXRoIHRpbWVzdGFtcCBzcGVjaWZpYyBkYXRhIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZXRpbWVMb2NhbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAqIG1lc3NhZ2VzXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIGEgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgYm94XHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXNcclxuICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWwgaW5wdXQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZGF0ZXRpbWUtbG9jYWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgKiBcclxuICAgICogQGV4YW1wbGUgXHJcbiAgICAqIC8vRGF0YSBcclxuICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgKiBEYXRldGltZUxvY2FsLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgKiA8bGFiZWw+XHJcbiAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICogPC9sYWJlbD5cclxuICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBlbWFpbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGVtYWlscyAgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbWFpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgICogbWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIHRoaXMgZW1haWwgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBlbWFpbCBpbnB1dHMgXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGFuIGVtYWlsIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIEVtYWlsLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJlbWFpbFwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImVtYWlsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7U3R5bGV9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBmb3JtIHdyYXBwZXIgYXJvdW5kIHRoZXNlIGlucHV0cyBhbmQgYSBcclxuICogc3VibWl0IGJ1dHRvbiB0byBzdWJtaXQgdGhlIGZvcm0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSB2YXJpb3VzIGRhdGEgdG8gcmVuZGVyIHRoaXMgZm9ybS5cclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGlucHV0SFRNTCAtIEFsbCBpbnB1dCBkYXRhIHRvIGJlIGFkZGVkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gbmFtZSBvZiB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkaXRpb25hbEF0dHJIVE1MIC0gQXR0cmlidXRlcyB0aGF0IG5lZWQgdG8gYmUgXHJcbiAgICAgKiBhZGRlZCB0byB0aGUgZm9ybSBwcmltYXJpbHkgdXNlZCBmb3IgdmFsaWRhdGlvbiBhbmQgc3VibWl0IGZ1bmN0aW9ucy5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZXR0aW5ncyAtIEdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBmb3JtLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIHN0eWxlID0gU3R5bGUpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWxsIGlucHV0IGh0bWwgaW5mb3JtYXRpb24gZm9yIHRoaXMgXHJcbiAgICAgICAgICogZm9ybVxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dEhUTUwgPSBpbnB1dEhUTUw7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hbWUgZm9yIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZGl0aW9uYWwgdGFncyB0byBhZGQgdG8gdGhpcyBmb3JtIFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsQXR0ckhUTUwgPSBhZGRpdGlvbmFsQXR0ckhUTUw7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciB0aGlzIGVudGlyZSBmb3JtIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBzdWJtaXQgYnV0dG9uIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdWJtaXQgPSBzZXR0aW5ncy5zdWJtaXQ7XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBzdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW55IGRlZmF1bHQgVUkgY2xhc3NlcyB0byBhZGQgdG8gdGhpcyBmb3JtIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGZvcm1DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncm93J1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCB0byByZW5kZXIgdGhlIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIEZvcm0uc2V0dGluZ3MgPSB7XHJcbiAgICAgKiAgICAgc3VibWl0IDoge1xyXG4gICAgICogICAgICAgICBsYWJlbCA6IFwiTXkgbmV3IHN1Ym1pdCBsYWJlbFwiLFxyXG4gICAgICogICAgICAgICBpbnB1dCA6IHtcclxuICAgICAqICAgICAgICAgICAgY2xhc3NlcyA6IFwibXktc3VibWl0LWlucHV0XCJcclxuICAgICAqICAgICAgICAgfSxcclxuICAgICAqICAgICAgICAgY29udGFpbmVyIDoge1xyXG4gICAgICogICAgICAgICAgICAgY2xhc3NlcyA6IFwibXktc3VibWl0LWNvbnRhaW5lclwiXHJcbiAgICAgKiAgICAgICAgIH1cclxuICAgICAqICAgICB9XHJcbiAgICAgKiB9O1xyXG4gICAgICogXHJcbiAgICAgKiAvL1dpbGwgUmVuZGVyIFxyXG4gICAgICogXHJcbiAgICAgKiA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgbXktc3VibWl0LWNvbnRhaW5lclwiPlxyXG4gICAgICogICAgIDxidXR0b24gY2xhc3M9XCJteS1zdWJtaXQtaW5wdXRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgKiAgICAgICAgICBNeSBuZXcgc3VibWl0IGxhYmVsIFxyXG4gICAgICogICAgIDwvYnV0dG9uPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBzdWJtaXRCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge319ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsOiBzdWJtaXRMYWJlbCA9IFwiU3VibWl0XCIsIGxhYmVsSFRNTDogc3VibWl0TGFiZWxIVE1MLCBpbnB1dDogc3VibWl0SW5wdXQgPSB7fSwgY29udGFpbmVyOiBzdWJtaXRDb250YWluZXIgPSB7fSwgYXR0cmlidXRlcyA9ICcnfSA9IHN1Ym1pdDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdElucHV0Q2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0SW5wdXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRDb250YWluZXJDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRDb250YWluZXI7XHJcblxyXG4gICAgICAgIHN1Ym1pdExhYmVsID0gc3VibWl0TGFiZWxIVE1MID8gc3VibWl0TGFiZWxIVE1MIDogc3VibWl0TGFiZWw7XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXRIVE1MID0gc3VibWl0TGFiZWwubGVuZ3RoID49IDAgP1xyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdnhqcy1ncmlkLTEtMSAke3N1Ym1pdENvbnRhaW5lckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCIke3N1Ym1pdElucHV0Q2xhc3Nlc31cIiB0eXBlPSdzdWJtaXQnICR7YXR0cmlidXRlc30+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtzdWJtaXRMYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgIDogJyc7XHJcblxyXG4gICAgICAgIHJldHVybiBzdWJtaXRIVE1MO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBlYWNoIGlucHV0J3MgaHRtbCBpbnRvIGEgY29udGFpbmVyIHNvIHRoZXkgY2FuIGJlIGZvcm1hdHRlZCBjb3JyZWN0bHlcclxuICAgICAqIHV0aWxpemluZyB0aGUgaXZ4anMuY3NzJ3MgZ3JpZCBzeXN0ZW0uXHJcbiAgICAgKiBAdHlwZXtTdHJpbmd9IFxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncywgZm9ybUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9LCBjbGFzc2VzOiBjb25maWdGb3JtQ2xhc3NlcyA9ICcnLCBpZCA6IGZvcm1JZCwgbGFiZWwgPSAnJywgbGFiZWxIVE1MfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZihsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5oaWRlU3VibWl0KSB7XHJcbiAgICAgICAgICAgIGlucHV0SFRNTC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiBzdWJtaXQsXHJcbiAgICAgICAgICAgICAgICBodG1sOiB0aGlzLnN1Ym1pdEJ1dHRvbkhUTUxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29udGVudHMgPSB0aGlzLnN0eWxlLmFkZFdpZHRoQ2xhc3NlcyhpbnB1dEhUTUwpO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8Zm9ybSBpZD1cIiR7Zm9ybUlkfS1mb3JtXCIgY2xhc3M9XCIke2Zvcm1DbGFzc2VzfSAke2NvbmZpZ0Zvcm1DbGFzc2VzfVwiIG5vdmFsaWRhdGUgbmFtZT1cIiR7bmFtZX1cIiAke2FkZGl0aW9uYWxBdHRySFRNTH0+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHtjb250ZW50c31cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogSW5kaWNhdGVzIGVycm9ycyBmb3IgZWFjaCBpbnB1dCBiYXNlZCBvbiB0aGUgXHJcbiAqIGF0dHJpYnV0ZXMgY3JlYXRlZCBmcm9tIHRoZSB2YXJpb3VzIHJlbmRlcmluZyBsaWJyYXJpZXNcclxuICogaVZYanMgdXNlcy4gXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlcyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcmluZ3MgaW4gYWxsIHRoZSBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcyBcclxuICAgICAqIHRoaXMgaW5wdXQgY2FuIHByb2R1Y2UuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGVycm9yTWVzc2FnZXMgLSBsaXN0IG9mIGFsbCBwb3NzaWJsZSBcclxuICAgICAqIGVycm9yIG1lc3NhZ2VzIHdpdGggYXR0cmlidXRlcyBpbmRpY2F0aW5nIHRoZSBtZXNzYWdlIFxyXG4gICAgICogYW5kIHRoZSBjb25kaXRpb25zIGluIHdoaWNoIHRvIHNob3cgdGhlbS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JNZXNzYWdlcyA9IFtdKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExpc3Qgb2YgYWxsIHBvc3NpYmxlIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNsYXNzZXMgZm9yIHRoZSBlcnJvciBtZXNzYWdlIGRpdi5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9IFxyXG4gICAgICovXHJcbiAgICBnZXQgbWVzc2FnZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgY2xhc3NlcyBmb3IgdGhlIGNvbnRhaW5lciBvZiBhbGwgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Vycm9yLW1lc3NhZ2VzJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgZm9yIGFsbCBlcnJvciBtZXNzYWdlcyBhbmQgdGhlIGNvbnRhaW5lciB3aXRoIFxyXG4gICAgICogdGhlbS4gUmVzdWx0czpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZXNcIj5cclxuICAgICAqICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPk1FU1NBR0U8L3NwYW4+XHJcbiAgICAgKiA8L2Rpdj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JNZXNzYWdlcywgbWVzc2FnZUNsYXNzZXMsIGNvbnRhaW5lckNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlSFRNTCA9IGVycm9yTWVzc2FnZXMucmVkdWNlKChlcnJvck1lc3NhZ2VIVE1MLCBlcnJvck1lc3NhZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtlcnJvck1lc3NhZ2VIVE1MfTxzcGFuIGNsYXNzPVwiJHttZXNzYWdlQ2xhc3Nlc31cIiAke2Vycm9yTWVzc2FnZS5hdHRySFRNTH0+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2UubWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5gXHJcbiAgICAgICAgfSwgJycpO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlSFRNTC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nJHtjb250YWluZXJDbGFzc2VzfSc+XHJcbiAgICAgICAgICAgICAgICAke2Vycm9yTWVzc2FnZUhUTUx9XHJcbiAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufSIsImltcG9ydCB7RXJyb3JNZXNzYWdlc30gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHtBdHRyaWJ1dGVUYWdzfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbnVtYmVyIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgbnVtYmVycyAgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIG51bWJlciBpbnB1dCBib3hcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXRcclxuICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIG51bWJlciBpbnB1dHMgXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBudW1iZXIgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIC8vRGF0YSBcclxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgICogTnVtYmVyLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogaW5wdXQuYXR0cmlidXRlcyA9IHtcclxuICAgICAqICAgICBcInN0ZXBcIiA6IFwiMC4xXCJcclxuICAgICAqIH1cclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IHN0ZXA9XCIwLjFcIiBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cIm51bWJlclwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIG5hbWUgPSAnJywgaWQgPSAnJywgbGFiZWxIVE1MfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwibnVtYmVyXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnMge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmosIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgZGVmYXVsdERpc3BsYXkgPSAnJywgc2V0dGluZ3MgPSB7fSwgdGFncyA9ICcnLCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0RGlzcGxheSA9IGRlZmF1bHREaXNwbGF5O1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgaW5wdXQsIGRlZmF1bHREaXNwbGF5LCBlcnJvcnMsIHNldHRpbmdzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWUsIG9wdGlvbnMsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChlcnJvckF0dHJpYnV0ZXMucmVxdWlyZWQgfHwgKGRlZmF1bHREaXNwbGF5ICYmIGRlZmF1bHREaXNwbGF5Lmxlbmd0aCA+PSAwKSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnID0gZGVmYXVsdERpc3BsYXkgP1xyXG4gICAgICAgICAgICAgICAgYDxvcHRpb24gdmFsdWU9XCJcIj4ke2RlZmF1bHREaXNwbGF5fTwvb3B0aW9uPmAgOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uc0hUTUwgPSBvcHRpb25zLnJlZHVjZSgob3B0aW9uSFRNTCwgb3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtvcHRpb25IVE1MfVxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24udmFsdWV9XCI+JHtvcHRpb24uZGlzcGxheX08L29wdGlvbj5gXHJcbiAgICAgICAgfSwgJycpXHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbH08L2xhYmVsPiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAgICAgICAke2RlZmF1bHRPcHRpb25UYWd9XHJcbiAgICAgICAgICAgICAgICAgICR7b3B0aW9uc0hUTUx9XHJcbiAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhZGlvIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGlvSW5wdXRPYmosIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHsgaW5wdXQgPSB7fSwgcmFkaW9zID0gW10sIGVycm9ycyA9IHt9LCBzZXR0aW5ncyA9IHt9IH0gPSByYWRpb0lucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLnJhZGlvcyA9IHJhZGlvcztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICB1aVJhZGlvR3JvdXAocmFkaW9zSFRNTCkge1xyXG4gICAgICAgIHJldHVybiByYWRpb3NIVE1MO1xyXG4gICAgfTtcclxuXHJcbiAgICB1aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgdWlDbGFzc2VzLCB2YWx1ZSA9IFwiXCIpIHtcclxuICAgICAgICBsZXQgeyBpZCB9ID0gdGhpcy5pbnB1dDtcclxuICAgICAgICBsZXQgY3VycmVudElkID0gYCR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nICsgdmFsdWUgOiAnJ31gOyBcclxuXHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7Y3VycmVudElkfVwiIGNsYXNzPVwiJHt1aUNsYXNzZXN9XCI+XHJcbiAgICAgICAgJHtyYWRpb0hUTUx9XHJcbiAgICAgICAgPC9sYWJlbD5gO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHRoaXMuaW5wdXQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IGAke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyArIHZhbHVlIDogJyd9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIiR7Y3VycmVudElkfVwiICR7YXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAke2xhYmVsfWA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQgeyBlcnJvcnMsIHJhZGlvcywgc2V0dGluZ3MsIGlucHV0LCB1aUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXMsIHRhZ3M6IGVycm9yVGFncyA9IFwiXCIgfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgbGFiZWw6IGlucHV0TGFiZWwsIGxhYmVsSFRNTDogaW5wdXRMYWJsZUhUTUwgfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7IHNob3dMYWJlbCA9IHRydWUgfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRMYWJsZUhUTUwpIGlucHV0TGFiZWwgPSBpbnB1dExhYmxlSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IHJhZGlvc0hUTUwgPSByYWRpb3MucmVkdWNlKChodG1sLCByYWRpbywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHsgbGFiZWwsIGF0dHJIVE1MID0gJycsIGNsYXNzZXMgPSAnJywgdmFsdWUgfSA9IHJhZGlvO1xyXG5cclxuICAgICAgICAgICAgYXR0ckhUTUwgPSBgJHthdHRySFRNTH0gJHtlcnJvclRhZ3N9YDtcclxuXHJcbiAgICAgICAgICAgIGxldCByYWRpb0hUTUwgPSBzZWxmLnJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIGlucHV0LnJhZGlvQnV0dG9uc1tpbmRleF0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9XHJcbiAgICAgICAgICAgICR7c2VsZi51aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgYCR7dWlDbGFzc2VzfSAke2NsYXNzZXN9YCwgaW5wdXQucmFkaW9CdXR0b25zW2luZGV4XS52YWx1ZSl9YDtcclxuICAgICAgICB9LCBpbnB1dExhYmVsKTtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxSYWRpb0J1dHRvbnNIVE1MID0gYFxyXG4gICAgICAgICAgICAgJHtyYWRpb3NIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudWlSYWRpb0dyb3VwKGFsbFJhZGlvQnV0dG9uc0hUTUwpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIElucHV0U3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoZm9ybVNlY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmZvcm1TZWN0aW9uID0gZm9ybVNlY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRlZmF1bHRGb290ZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7Zm9ybVNlY3Rpb24sIGRhdGEsIGRlZmF1bHRGb290ZXJDbGFzc2VzLCBkZWZhdWx0SGVhZGVyQ2xhc3NlcywgZGVmYXVsdFNlY3Rpb25DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlczogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYGB9ID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc2VjdGlvbkNsYXNzZXMgPSAnJyB9ID0gc2VjdGlvbjtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCIke3NlY3Rpb25DbGFzc2VzfSAke2RlZmF1bHRTZWN0aW9uQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cclxuICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke2RlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7Zm9ybVNlY3Rpb259XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfSAke2RlZmF1bHRGb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbikge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxpbmtTZWN0aW9uID0gbGlua1NlY3Rpb25cbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdEZvb3RlckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBodG1sKCkge1xuICAgICAgICBsZXQge2RhdGEsIGxpbmtTZWN0aW9uLCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcywgZGVmYXVsdEhlYWRlckNsYXNzZXMsIGRlZmF1bHRTZWN0aW9uQ2xhc3NlcywgZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge30sIGxpbmtDb250YWluZXIgPSB7fX0gPSBkYXRhO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzZWN0aW9uQ2xhc3NlcyA9ICcnfSA9IHNlY3Rpb247XG4gICAgICAgIGxldCB7Y2xhc3NlczogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGxpbmtDb250YWluZXJDbGFzc2VzID0gJycsIGF0dHJpYnV0ZXM6IGxpbmtDb250YWluZXJBdHRyaWJ1dGVzID0ge319ID0gbGlua0NvbnRhaW5lcjtcbiAgICAgICAgbGV0IGxpbmtDb250YWluZXJBdHRyaWJ1dGVIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MobGlua0NvbnRhaW5lckF0dHJpYnV0ZXMsIE9iamVjdC5rZXlzKGxpbmtDb250YWluZXJBdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCIke3NlY3Rpb25DbGFzc2VzfSAke2RlZmF1bHRTZWN0aW9uQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cbiAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHtkZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JyR7ZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzfSAke2xpbmtDb250YWluZXJDbGFzc2VzfScgJHtsaW5rQ29udGFpbmVyQXR0cmlidXRlSFRNTH0+XG4gICAgICAgICAgICAgICAgICAgICR7bGlua1NlY3Rpb259XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc30gJHtkZWZhdWx0Rm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBnZXRXaWR0aCh3aWR0aCkge1xyXG4gICAgICAgIGlmICh3aWR0aCA9PT0gJzEnKSByZXR1cm4gJ2l2eGpzLWdyaWQtMS0xJztcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZ3JpZFN0cmluZyA9IHdpZHRoLnJlcGxhY2UoJy8nLCAnLScpO1xyXG5cclxuICAgICAgICByZXR1cm4gYGl2eGpzLWdyaWQtJHtncmlkU3RyaW5nfWA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjb250YWluZXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdpbnB1dC1jb250YWluZXInO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdpZHRoQ2xhc3NlcyhpbnB1dHNIVE1MKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29udGFpbmVyQ2xhc3NlcyA9ICcnfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gaW5wdXRzSFRNTC5yZWR1Y2UoKGN1cnJlbnRIVE1MLCBpbnB1dEhUTUwpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5ncyA9IHt9fSA9IGlucHV0SFRNTDtcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCA9ICcxJywgY29udGFpbmVyPXt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBsZXQge2NsYXNzZXM9Jyd9ID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7Y29udGFpbmVyQ2xhc3Nlc31gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhpc1dpZHRoID0gc2VsZi5nZXRXaWR0aCh3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKFwiaXZ4anMtZ3JpZC0xLTFcIiwgYCR7dGhpc1dpZHRofSAke2NsYXNzZXN9YCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7Y3VycmVudEhUTUx9ICR7aHRtbH1gO1xyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudHM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJ0ZXh0XCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsYWJlbCA9IHNob3dMYWJlbCA/IGxhYmVsIDogJyc7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgJHt1aUF0dHJpYnV0ZXN9ICAgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICA8L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVybCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSxzZXR0aW5ncyA9IHt9LHRhZ3MgPSB7fSxlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCl7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6aW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlcyA6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlcyA6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzIDogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9XCIgJHt1aUF0dHJpYnV0ZXN9ICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInVybFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbnRyb2xzfSBmcm9tICcuLi8uLi92aWRlby9jb250cm9scy9pbmRleC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY29udGFpbmVyLmh0bWwgaW5zdGFuY2VvZiBGdW5jdGlvbil7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKHRoaXMuaHRtbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMuaHRtbDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB0b3RhbFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgY3VycmVudFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgc2NydWJCYXJDbGFzc2VzLFxyXG4gICAgICAgICAgICBtdXRlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJDbGFzc2VzICAgICAgICAgICAgXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5wbGF5UGF1c2VDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiKTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXRvdGFsLXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluZm8gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5zY3J1YkJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIpO1xyXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIpO1xyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdwbGF5LXBhdXNlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJyZW50VGltZUluZm9DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXRpbWUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdzY3J1Yi1iYXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnbXV0ZSdcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZS1iYXInXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5Q2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtcGxheSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBhdXNlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS11cCc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtdm9sdW1lLW9mZic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYHRpbWUtbGFwc2VkYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2N1cnJlbnQtdm9sdW1lJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlQYXVzZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3BsYXlDbGFzc2VzIDogcGxheX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHNDbGFzc2VzIDogcGxheVBhdXNlQ29udHJvbHN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIgY2xhc3M9XCIke3BsYXlQYXVzZUNvbnRyb2xzfVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz0nJHtwbGF5fSc+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPmBcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHRpbWVzdGFtcEhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIgY2xhc3M9XCIke3RoaXMuY3VycmVudFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIgY2xhc3M9XCIke3RoaXMudG90YWxUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7dW5tdXRlQ2xhc3NlcyA6IHVubXV0ZSwgbXV0ZUNvbnRyb2xzQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIgY2xhc3M9XCIke211dGVDb250cm9sc0NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7dW5tdXRlfVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgIGlkPVwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiIGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHNjcnViQmFySFRNTCxcclxuICAgICAgICAgICAgdGltZXN0YW1wSFRNTCxcclxuICAgICAgICAgICAgbXV0ZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHZvbHVtZUJhckhUTUxcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICR7cGxheVBhdXNlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAgICAke3RpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgICAgJHttdXRlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3ZvbHVtZUJhckhUTUx9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFuY2hvciBhcyBEZWZhdWx0QW5jaG9yIH0gZnJvbSAnLi4vZGVmYXVsdC9hbmNob3IuanMnO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRGVmYXVsdEFuY2hvcntcblx0Y29uc3RydWN0b3IoYW5jaG9ySW5mbyl7XG5cdFx0c3VwZXIoYW5jaG9ySW5mbyk7XG5cdH1cbn0iLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcbmltcG9ydCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb25zdGFudHMvZmlyZWJhc2UuYXV0aGVudGljYXRpb24uanNcIjtcbmltcG9ydCB7IElucHV0Q29udHJvbGxlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2lucHV0LWNvbnRyb2xsZXIuanMnO1xuXG5sZXQgRmlyZWJhc2VBdXRoZW50aWNhdGlvbkNvbnN0YW50cyA9IG5ldyBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uKCk7XG5cbmNsYXNzIEZpbGVJbnB1dENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xuICAgICAgIFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICB9XG5cbiAgIFxufVxuXG5GaWxlSW5wdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdpVlhqcycsICdpdnhqcy5hY3Rpb25zJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihGaWxlSW5wdXRDb250cm9sbGVyKSIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xuaW1wb3J0IEZpcmViYXNlQXV0aGVudGljYXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50cy9maXJlYmFzZS5hdXRoZW50aWNhdGlvbi5qc1wiO1xuaW1wb3J0IHsgSW5wdXRDb250cm9sbGVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyc7XG5cbmxldCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uQ29uc3RhbnRzID0gbmV3IEZpcmViYXNlQXV0aGVudGljYXRpb24oKTtcbmNsYXNzIFBhc3N3b3JkSW5wdXRDb250cm9sbGVyIGV4dGVuZHMgSW5wdXRDb250cm9sbGVySGVscGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGlWWGpzLCBpVlhqc0FjdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2V0UGFzc3dvcmQgPSAoaW5wdXRWYWx1ZSkgPT57XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaVZYanMuQnVzLm9uY2UoRmlyZWJhc2VBdXRoZW50aWNhdGlvbkNvbnN0YW50cy5SRVFVRVNUX1BBU1NXT1JELCAoKSA9PntcbiAgICAgICAgICAgIGlWWGpzLkJ1cy5lbWl0KEZpcmViYXNlQXV0aGVudGljYXRpb25Db25zdGFudHMuR0VUX1BBU1NXT1JELCBzZWxmLnBhc3N3b3JkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5QYXNzd29yZElucHV0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnaVZYanMnLCAnaXZ4anMuYWN0aW9ucyddO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oUGFzc3dvcmRJbnB1dENvbnRyb2xsZXIpIiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XG5pbXBvcnQgRmlsZUlucHV0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9pbnB1dC5maWxlLmpzJztcblxuY2xhc3MgRmlsZUlucHV0IHtcbiAgICBjb25zdHJ1Y3RvcigkY29tcGlsZSwgJGZpbHRlciwgJGh0dHAsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBpVlhqc0FjdGlvbnMsIHB1bGxJblRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlSFRNTDtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeaXZ4anNGb3JtSW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlucHV0RGF0YTogJz1pbnB1dERhdGEnXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRmlsZUlucHV0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndm0nO1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGxldCB7aW5wdXREYXRhOiBpbnB1dH0gPSAkc2NvcGU7XG4gICAgICAgICAgICBsZXQge2lkLCBuYW1lLCBlcnJvcnMgPSB7fSwgbGFiZWxIVE1MLCBsYWJlbCA9ICRmaWx0ZXIoJ3N0cmluZ1BhcnNlcnMnKSgnc3RhcnRDYXNlJywgaWQpLCBhdHRyaWJ1dGVzID0ge30sIHR5cGUsIHNldHRpbmdzID0ge319ID0gaW5wdXQ7XG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGBvbmNoYW5nZT1cImFuZ3VsYXIuZWxlbWVudCh0aGlzKS5zY29wZSgpLmZpbGVOYW1lQ2hhbmdlZCh0aGlzKVwiIG5nLW1vZGVsPVwiaW5wdXRWYWx1ZVwiYFxuXG4gICAgICAgICAgICBpbnB1dC5sYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xuICAgICAgICAgICAgaW5wdXQgPSBwdWxsSW5UZW1wbGF0ZS5jb252ZXJ0TGFiZWwoJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGlucHV0LCAkc2NvcGUpO1xuXG4gICAgICAgICAgICBsZXQgdWlGaWxlT2JqID0ge1xuICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgdGFnczogdGFnSFRNTFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBmaWxlID0gbmV3IGlWWGpzVUlNb2R1bGUuZmlsZSh1aUZpbGVPYmopO1xuXG4gICAgICAgICAgICBpRWxtLmh0bWwoZmlsZS5odG1sKTtcblxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZmlsZU5hbWVDaGFuZ2VkID0gKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlWWGpzLmV4cGVyaWVuY2UudXBsb2FkRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXMgPSBlbC5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bU9mRmlsZXMgPSBmaWxlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZkZpbGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZVByb21pc2UgPSBpVlhqcy5leHBlcmllbmNlLnVwbG9hZEZpbGUoZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtmaWxlUHJvbWlzZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge29uQ2hhbmdlID0gW10sIG5hbWU6aW5wdXROYW1lfSA9IGlucHV0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudE5hbWVcIjogXCJzZXREYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyZ3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IGlucHV0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZpbGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIVE1MKCkge1xuICAgICAgICByZXR1cm4gYDxkaXY+PC9kaXY+YDtcbiAgICB9O1xufVxuXG5GaWxlSW5wdXQuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJGZpbHRlcicsICckaHR0cCcsICdpVlhqcycsICdpdnhqcy5tb2R1bGVzLnVpJywgJ2l2eGpzLmFjdGlvbnMnLCAncHVsbEluVGVtcGxhdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKEZpbGVJbnB1dCk7IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XG5pbXBvcnQgUGFzc3dvcmRJbnB1dENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvaW5wdXQucGFzc3dvcmQuanMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL21lc3NhZ2VzLmVycm9yLmpzJztcblxuY2xhc3MgUGFzc3dvcmRJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoJGNvbXBpbGUsICRmaWx0ZXIsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBwdWxsSW5UZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZUhUTUw7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXml2eGpzRm9ybUlucHV0XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpbnB1dERhdGE6ICc9aW5wdXREYXRhJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBhc3N3b3JkSW5wdXRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHtpbnB1dERhdGE6IGlucHV0fSA9ICRzY29wZTtcbiAgICAgICAgICAgIGxldCB7aWQsIG5hbWUsIGVycm9ycyA9IHt9LCBsYWJlbEhUTUwsIGxhYmVsID0gJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGF0dHJpYnV0ZXMgPSB7fSwgdHlwZSwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dDtcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMoaW5wdXQsIGVycm9ycywgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGBuZy1jaGFuZ2U9XCJ2bS5zZXRQYXNzd29yZChpbnB1dFZhbHVlKVwiIG5nLW1vZGVsPVwiaW5wdXRWYWx1ZVwiYFxuXG4gICAgICAgICAgICBpbnB1dC5sYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xuICAgICAgICAgICAgaW5wdXQgPSBwdWxsSW5UZW1wbGF0ZS5jb252ZXJ0TGFiZWwoJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGlucHV0LCAkc2NvcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdWlQYXNzd29yZE9iaiA9IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHNldHRpbmdzLFxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ0hUTUwsXG4gICAgICAgICAgICAgICAgZXJyb3JzOiBlcnJvck1lc3NhZ2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gbmV3IGlWWGpzVUlNb2R1bGUucGFzc3dvcmQodWlQYXNzd29yZE9iaik7XG5cbiAgICAgICAgICAgIGlFbG0uaHRtbChwYXNzd29yZC5odG1sKTtcblxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2PjwvZGl2PmA7XG4gICAgfTtcbn1cblxuUGFzc3dvcmRJbnB1dC4kaW5qZWN0ID0gWyckY29tcGlsZScsICckZmlsdGVyJywgJ2lWWGpzJywgJ2l2eGpzLm1vZHVsZXMudWknLCAncHVsbEluVGVtcGxhdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKFBhc3N3b3JkSW5wdXQpOyIsImltcG9ydCB7IEJ1dHRvbnMgYXMgRGVmYXVsdEJ1dHRvbnMgfSBmcm9tICcuLi9kZWZhdWx0L2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIGV4dGVuZHMgRGVmYXVsdEJ1dHRvbnMge1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucywgaW5wdXQpIHtcclxuICAgICAgICBzdXBlcihidXR0b25zLCBpbnB1dCwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBidXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuJztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDaGVja2JveCBhcyBEZWZhdWx0Q2hlY2tib3ggfSBmcm9tICcuLi9kZWZhdWx0L2NoZWNrYm94LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBEZWZhdWx0Q2hlY2tib3gge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2NoZWNrYm94IGZvcm0tY29udHJvbCdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbH0gPSBpbnB1dDtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyBsZWZ0OjA7IHotaW5kZXg6OTk5OTsgbWFyZ2luOjE3cHggMjZweDsgY3Vyc29yOnBvaW50ZXI7XCIgdHlwZT1cImNoZWNrYm94XCIgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aW5wdXQuaWR9XCI+ICR7bGFiZWx9PC9sYWJlbD4gICBcclxuICAgICAgICBgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRlIGFzIERlZmF1bHREYXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRlLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZSBleHRlbmRzIERlZmF1bHREYXRle1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkYXRlcGlja2VyJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYWJlbENsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2FjdGl2ZSc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRldGltZUxvY2FsIGFzIERlZmF1bHREYXRldGltZUxvY2FsIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwgZXh0ZW5kcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZGF0ZXBpY2tlcidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGFiZWxDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW1haWwgYXMgRGVmYXVsdEVtYWlsIH0gZnJvbSAnLi4vZGVmYXVsdC9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsIGV4dGVuZHMgRGVmYXVsdEVtYWlse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJcbmV4cG9ydCBjbGFzcyBGaWxle1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9fSA9IGlucHV0T2JqO1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgIH0gXG5cbiAgIFxuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAndmFsaWRhdGUnXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlcyA9XCJcIn0gPSB0aGlzO1xuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XG5cbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XG5cbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XG5cbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLWZpZWxkIGlucHV0LWZpZWxkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XG4gICAgICAgIDxzcGFuPkZpbGU8L3NwYW4+XG4gICAgICAgIDxpbnB1dCBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiB0eXBlPVwiZmlsZVwiICR7dGFnc30+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiID5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIGFzIERlZmF1bHRGb3JtIH0gZnJvbSAnLi4vZGVmYXVsdC9mb3JtLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgRGVmYXVsdEZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBTdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcm1DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY29sIHMxMidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcbn0iLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi9hbmNob3IuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtLmpzJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5qcyc7XHJcbmltcG9ydCB7IEJ1dHRvbnMgfSBmcm9tICcuL2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9ucy5qc1wiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBQYXNzd29yZCB9IGZyb20gJy4vcGFzc3dvcmQuanMnO1xyXG5pbXBvcnQgeyBGaWxlIH0gZnJvbSBcIi4vZmlsZS5qc1wiO1xyXG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gXCIuL3JhbmdlLmpzXCI7XHJcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnLi9yYWRpby5qcyc7XHJcbmltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGUuanNcIjtcclxuaW1wb3J0IHsgTnVtYmVyIH0gZnJvbSAnLi9udW1iZXIuanMnO1xyXG5pbXBvcnQgeyBFbWFpbCB9IGZyb20gJy4vZW1haWwuanMnO1xyXG5pbXBvcnQgeyBEYXRlIH0gZnJvbSAnLi9kYXRlLmpzJztcclxuaW1wb3J0IHsgVXJsIH0gZnJvbSAnLi91cmwuanMnO1xyXG5pbXBvcnQgeyBEYXRldGltZUxvY2FsIH0gZnJvbSAnLi9kYXRldGltZS1sb2NhbC5qcyc7XHJcblxyXG5pbXBvcnQgaXZ4anNQYXNzd29yZElucHV0IGZyb20gXCIuL2FuZ3VsYXIvZGlyZWN0aXZlcy9pbnB1dC5wYXNzd29yZC5qc1wiO1xyXG5pbXBvcnQgaXZ4anNGaWxlSW5wdXQgZnJvbSBcIi4vYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmZpbGUuanNcIjtcclxuXHJcblxyXG4vL1N0YXRlc1xyXG5pbXBvcnQgeyBJbnB1dFN0YXRlIH0gZnJvbSAnLi9zdGF0ZS5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IFZpZGVvU3RhdGUgfSBmcm9tICcuL3N0YXRlLnZpZGVvLmpzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblN0YXRlIH0gZnJvbSAnLi9zdGF0ZS5uYXZpZ2F0aW9uLmpzJztcclxuXHJcbi8vQ29udHJvbHMgXHJcbmltcG9ydCBWaWRlb0NvbnRyb2xzIGZyb20gJy4vdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsaXplVUkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hbmNob3IgPSBBbmNob3I7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gRm9ybTtcclxuICAgICAgICB0aGlzLnRleHQgPSBUZXh0O1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IEJ1dHRvbnM7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gRGF0ZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gUGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5maWxlID0gRmlsZVxyXG4gICAgICAgIHRoaXMuZGF0ZXRpbWVMb2NhbCA9IERhdGV0aW1lTG9jYWw7XHJcbiAgICAgICAgdGhpcy5jaGVja2JveCA9IENoZWNrYm94O1xyXG4gICAgICAgIHRoaXMudmlkZW9Db250cm9scyA9IFZpZGVvQ29udHJvbHM7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT3B0aW9ucztcclxuICAgICAgICB0aGlzLmVtYWlsID0gRW1haWw7XHJcbiAgICAgICAgdGhpcy51cmwgPSBVcmw7XHJcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IFRleHRhcmVhO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSBSYW5nZTtcclxuICAgICAgICB0aGlzLnJhZGlvID0gUmFkaW87XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMubnVtYmVyID0gTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBpbnB1dDogSW5wdXRTdGF0ZSxcclxuICAgICAgICAgICAgdmlkZW86IFZpZGVvU3RhdGUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IE5hdmlnYXRpb25TdGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFyID0ge1xyXG4gICAgICAgICAgICBpdnhqc1Bhc3N3b3JkSW5wdXQ6IGl2eGpzUGFzc3dvcmRJbnB1dCxcclxuICAgICAgICAgICAgaXZ4anNGaWxlSW5wdXQ6IGl2eGpzRmlsZUlucHV0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVJbnB1dCgpIHtcclxuICAgICAgICAkKCdzZWxlY3QnKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgICAgICAgJCgnLmRhdGVwaWNrZXInKS5waWNrYWRhdGUoe1xyXG4gICAgc2VsZWN0TW9udGhzOiB0cnVlLCAvLyBDcmVhdGVzIGEgZHJvcGRvd24gdG8gY29udHJvbCBtb250aFxyXG4gICAgc2VsZWN0WWVhcnM6IDE1IC8vIENyZWF0ZXMgYSBkcm9wZG93biBvZiAxNSB5ZWFycyB0byBjb250cm9sIHllYXJcclxuICB9KTtcclxuICAgICBcclxuICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaW5pdGlhbGl6ZU1hdGVyaWFsaXplVUk7XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudWkubWF0ZXJpYWxpemUnLCBpbml0aWFsaXplTWF0ZXJpYWxpemVVSSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVNYXRlcmlhbGl6ZVVJKHNldHRpbmdzKSB7XHJcbiAgICByZXR1cm4gTWF0ZXJpYWxpemVVSTtcclxufTsiLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VzIGFzIERlZmF1bHRFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4uL2RlZmF1bHQvbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIGV4dGVuZHMgRGVmYXVsdEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JNZXNzYWdlcyA9IFtdKXsgICAgICAgXHJcbiAgICAgICBzdXBlcihlcnJvck1lc3NhZ2VzKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2hhcy1lcnJvcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtZXNzYWdlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnaGVscC1ibG9jayc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBOdW1iZXIgYXMgRGVmYXVsdE51bWJlciB9IGZyb20gJy4uL2RlZmF1bHQvbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgRGVmYXVsdE51bWJlcntcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgT3B0aW9ucyBhcyBEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4uL2RlZmF1bHQvb3B0aW9ucy5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnMgZXh0ZW5kcyBEZWZhdWx0T3B0aW9uc3tcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG5cclxuICAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgICAgJHtvcHRpb25zSFRNTH1cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gXHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHQgYXMgRGVmYXVsdFRleHQgfSBmcm9tICcuLi9kZWZhdWx0L3RleHQuanMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZCBleHRlbmRzIERlZmF1bHRUZXh0e1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxuICAgIH0gXG5cbiAgIFxuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAndmFsaWRhdGUnXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcblxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcblxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xuXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xuXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xuXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aW5wdXQgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJwYXNzd29yZFwiICAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxuICAgICAgICAgICBcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke25hbWV9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XG4gICAgICAgYDtcblxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XG4gICAgfVxufSIsImltcG9ydCB7IFJhZGlvIGFzIERlZmF1bHRSYWRpbyB9IGZyb20gJy4uL2RlZmF1bHQvcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIERlZmF1bHRSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFkaW8gZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG5cclxuICAgICB1aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgdWlDbGFzc2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICA8cD5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L3A+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIHZhbHVlKXsgICAgIFxyXG4gICAgICAgIGxldCB7aWR9ID0gdGhpcy5pbnB1dDsgICBcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICAgICAgPGlucHV0IG5hbWU9XCIke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyt2YWx1ZTogJyd9XCJcIiB0eXBlPVwicmFkaW9cIiBpZD1cIiR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nK3ZhbHVlOiAnJ31cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nK3ZhbHVlOiAnJ31cIj4ke2xhYmVsfTwvbGFiZWw+XHJcbiAgICAgICAgYDsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcywgdGFnczogZXJyb3JUYWdzID0gXCJcIn0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IGlucHV0TGFiZWwsIGxhYmVsSFRNTDogaW5wdXRMYWJsZUhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge25hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dExhYmxlSFRNTCkgaW5wdXRMYWJlbCA9IGlucHV0TGFibGVIVE1MO1xyXG5cclxuICAgICAgICBsZXQgcmFkaW9zSFRNTCA9IHJhZGlvcy5yZWR1Y2UoKGh0bWwsIHJhZGlvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2xhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gJycsIHZhbHVlfSA9IHJhZGlvO1xyXG5cclxuICAgICAgICAgICAgYXR0ckhUTUwgPSBgJHthdHRySFRNTH0gJHtlcnJvclRhZ3N9YDtcclxuXHJcbiAgICAgICAgICAgIGxldCByYWRpb0hUTUwgPSBzZWxmLnJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIGlucHV0LnJhZGlvQnV0dG9uc1tpbmRleF0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9XHJcbiAgICAgICAgICAgICR7c2VsZi51aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgYCR7dWlDbGFzc2VzfSAke2NsYXNzZXN9YCl9YDtcclxuICAgICAgICB9LCBpbnB1dExhYmVsKTtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxSYWRpb0J1dHRvbnNIVE1MID0gYFxyXG4gICAgICAgICAgICAgJHtyYWRpb3NIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudWlSYWRpb0dyb3VwKGFsbFJhZGlvQnV0dG9uc0hUTUwpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xuaW1wb3J0IHtBdHRyaWJ1dGVUYWdzfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbnVtYmVyIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgbnVtYmVycyAgXG4gKiBmb3IgaVZYanMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYW5nZSB7XG5cbiAgICAvKipcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxuICAgICAqIG1lc3NhZ2VzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XG4gICAgICAgICogQHR5cGUge29iamVjdH0gIFxuICAgICAgICAqL1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcbiAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXG4gICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgbnVtYmVyIGlucHV0cyBcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICovXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXG4gICAgICogXG4gICAgICogQGV4YW1wbGUgXG4gICAgICogLy9EYXRhIFxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XG4gICAgICogTnVtYmVyLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XG4gICAgICogICAgIFwic3RlcFwiIDogXCIwLjFcIlxuICAgICAqIH1cbiAgICAgKiAvLyBSZW5kZXJzIFxuICAgICAqIDxsYWJlbD5cbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XG4gICAgICogPC9sYWJlbD5cbiAgICAgKiA8aW5wdXQgc3RlcD1cIjAuMVwiIGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwibnVtYmVyXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xuXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xuICAgICAgICBcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcblxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcblxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcbiAgICAgICAgXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgPHAgY2xhc3M9XCJyYW5nZS1maWVsZFwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwicmFuZ2VcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XG4gICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7bmFtZX1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxuICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBJbnB1dFN0YXRlIGFzIERlZmF1bHRJbnB1dFN0YXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSBleHRlbmRzIERlZmF1bHRJbnB1dFN0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihoZWFkZXIsIGZvcm1TZWN0aW9uLCBmb290ZXIsIGRhdGEpe1xyXG4gICAgICAgIHN1cGVyKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05hdmlnYXRpb25TdGF0ZSBhcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIGV4dGVuZHMgRGVmYXVsdE5hdmlnYXRpb25TdGF0ZSB7ICAgICBcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbil7XG4gICAgICAgIHN1cGVyKGRhdGEsIGxpbmtTZWN0aW9uKTtcbiAgICB9XG59OyIsImV4cG9ydCBjbGFzcyBWaWRlb1N0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJTZWN0aW9uLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnBsYXllclNlY3Rpb24gPSBwbGF5ZXJTZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBpUGhvbmVJbmxpbmVDbGFzc2VzKCl7XHJcbiAgICAgICAgbGV0IHtpc0lwaG9uZSA9IGZhbHNlfSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzSXBob25lID8gJ2lwaG9uZS1pbmxpbmUnIDogJyc7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgaGVhZGVyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGh0bWwoKSB7ICAgXHJcbiAgICAgICAgbGV0IHtwbGF5ZXJTZWN0aW9uLCBkYXRhLCBpUGhvbmVJbmxpbmVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbCA6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb250YWluZXIgJHtzZWN0aW9uQ2xhc3Nlc30gJHtpUGhvbmVJbmxpbmVDbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHt0aGlzLmRlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7cGxheWVyU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aFRvdGFsID0gMC4wO1xyXG4gICAgICAgIGxldCBjb2x1bW5OYW1lcyA9IFtcImNvbCBzMVwiLCBcImNvbCBzMlwiLCBcImNvbCBzM1wiLCBcImNvbCBzNFwiLCBcImNvbCBzNVwiLCBcImNvbCBzNlwiLCBcImNvbCBzN1wiLCBcImNvbCBzOFwiLCBcImNvbCBzOVwiICxcImNvbCBzMTBcIiwgXCJjb2wgczExXCIsIFwiY29sIHMxMlwiXVxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0SFRNTC5yZWR1Y2UoKGNvbnRlbnRIVE1MLCB0aGlzSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5nc30gPSB0aGlzSW5wdXQ7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSBcIjFcIiwgY2xhc3Nlcz0gJyd9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCBudW1lcmljV2lkdGggPSBnZXROdW1lcmljV2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PGRpdiBjbGFzcz1cInJvd1wiPiBgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRXaWR0aFRvdGFsICs9IG51bWVyaWNXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBib290c3RyYXBXaWR0aFN0eWxlTmFtZSA9IGNvbHVtbk5hbWVzW01hdGgucm91bmQobnVtZXJpY1dpZHRoICogY29sdW1uTmFtZXMubGVuZ3RoKSAtIDFdO1xyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCdpdnhqcy1ncmlkLTEtMScsIGBpbnB1dC1maWVsZCAke2Jvb3RzdHJhcFdpZHRoU3R5bGVOYW1lfSAke2NsYXNzZXN9YCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9JHtodG1sfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudEhUTUw7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNvbnRlbnRzLnN1YnN0cmluZyhjb250ZW50cy5sZW5ndGggLSA3KSAhPT0gXCI8L2Rpdj5cIil7XHJcbiAgICAgICAgICAgIGNvbnRlbnRzID0gYCR7Y29udGVudHN9PC9kaXY+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXROdW1lcmljV2lkdGgod2lkdGhTdHJpbmcpe1xyXG4gICAgICAgICAgICBpZih3aWR0aFN0cmluZyA9PT0gJzEnKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwYXJzZWRXaWR0aEZvcm11bGEgPSB3aWR0aFN0cmluZy5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzBdKSAvIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBUZXh0IGFzIERlZmF1bHRUZXh0IH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIERlZmF1bHRUZXh0e1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcblxyXG4gICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd2YWxpZGF0ZSdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxpbnB1dCAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInRleHRcIiAgICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHRhcmVhIGFzIERlZmF1bHRUZXh0YXJlYSB9IGZyb20gJy4uL2RlZmF1bHQvdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIERlZmF1bHRUZXh0YXJlYXtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdtYXRlcmlhbGl6ZS10ZXh0YXJlYSdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFVybCBhcyBEZWZhdWx0VXJsIH0gZnJvbSAnLi4vZGVmYXVsdC91cmwuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwgZXh0ZW5kcyBEZWZhdWx0VXJse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRGVmYXVsdFZpZGVvQ29udHJvbHMgZnJvbSAnLi4vZGVmYXVsdC92aWRlby5jb250cm9scy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIERlZmF1bHRWaWRlb0NvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaVZYanNCdXMpIHtcclxuICAgICAgICBzdXBlcihjb250YWluZXIsIGlWWGpzQnVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncGxheV9hcnJvdyc7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgZ2V0IHBhdXNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3BhdXNlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZV91cCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndm9sdW1lX29mZic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2J0bi1mbG9hdGluZyB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgZ3JlZW4nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuLWZsb2F0aW5nIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBncmV5JztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFuZ2UtZmllbGQnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBiYXJgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCJwcm9ncmVzcyAke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGVybWluYXRlIGJhclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgJHt0aGlzLnRpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuICBcclxuICAgIGdldCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZGV0ZXJtaW5hdGUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCJwcm9ncmVzcyAke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkanVzdFZvbHVtZShldmVudCkge1xyXG4gICAgICAgIGxldCB7dm9sdW1lQmFyLCBtdXRlQ29udHJvbHMsIGN1cnJlbnRWb2x1bWUsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCBtdXRlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7b2Zmc2V0V2lkdGg6IHdpZHRoIH0gPSB2b2x1bWVCYXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24odm9sdW1lQmFyKTtcclxuICAgICAgICBsZXQge3g6IGFic29sdXRlWH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgdm9sdW1lTGV2ZWwgPSAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIFtcIm1hdGVyaWFsLWljb25zXCJdKTtcclxuXHJcbiAgICAgICAgbXV0ZUljb24uaW5uZXJIVE1MID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3ZvbHVtZUxldmVsICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSB2b2x1bWVMZXZlbDtcclxuICAgICAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3BsYXlDbGFzc2VzIDogcGxheSwgcGF1c2VDbGFzc2VzIDogcGF1c2V9ID0gdGhpcztcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcyA6IHBsYXlQYXVzZUNvbnRyb2xzfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwicGxheS1idXR0b24tY29udGFpbmVyXCIgIGNsYXNzPVwibGVmdC1hbGlnblwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiIGNsYXNzPVwiJHtwbGF5UGF1c2VDb250cm9sc31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPSdtYXRlcmlhbC1pY29ucyc+JHtwbGF5fTwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aW1lc3RhbXBIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyLWFsaWduXCI+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIiBjbGFzcz1cIiR7dGhpcy5jdXJyZW50VGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLXRvdGFsLXRpbWVcIiBjbGFzcz1cIiR7dGhpcy50b3RhbFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5UGF1c2UoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMocGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sIFtcIm1hdGVyaWFsLWljb25zXCJdKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChwbGF5UGF1c2VJY29uLmlubmVySFRNTCkge1xyXG4gICAgICAgICAgICBjYXNlIHBsYXlDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5pbm5lckhUTUwgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBwYXVzZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmlubmVySFRNTCA9IHBsYXlDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRNdXRlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHttdXRlQ29udHJvbHMsIG11dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCB2b2x1bWVCYXIsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIFtcIm1hdGVyaWFsLWljb25zXCJdKTtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChtdXRlSWNvbi5pbm5lckhUTUwpIHtcclxuICAgICAgICAgICAgY2FzZSB1bm11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uaW5uZXJIVE1MID0gbXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5pbm5lckhUTUwgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt0aGlzLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGxheWluZygpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIFtcIm1hdGVyaWFsLWljb25zXCJdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5pbm5lckhUTUwgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGF1c2VkKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgW1wibWF0ZXJpYWwtaWNvbnNcIl1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmlubmVySFRNTCA9IHBsYXlDbGFzc2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3VubXV0ZUNsYXNzZXMgOiB1bm11dGUsIG11dGVDb250cm9sc0NsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJtdXRlLWJ1dHRvbi1jb250YWluZXJcIiBjbGFzcz1cImxlZnQtYWxpZ25cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIiBjbGFzcz1cIiR7bXV0ZUNvbnRyb2xzQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgPGkgY2xhc3M9J21hdGVyaWFsLWljb25zJz4ke3VubXV0ZX08L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUJ1dHRvbkhUTUwsIHNjcnViQmFySFRNTCwgdGltZXN0YW1wSFRNTCwgbXV0ZUJ1dHRvbkhUTUwsIHZvbHVtZUJhckhUTUx9ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAke3BsYXlQYXVzZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgJHt2b2x1bWVCYXJIVE1MfSAgXHJcbiAgICAgICAgJHttdXRlQnV0dG9uSFRNTH0gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCB3aXRoIGF0dHJpYnV0ZXMgYW5kIGtleXMgaW50byBIVE1MXHJcbiAqIHRoYXQgaW5wdXRzIGNhbiBiZSB1c2VkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZVRhZ3Mge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFB1bGxzIGFsbCB0aGUgYXR0cmlidXRlIHNldHRpbmdzIGFuZCB0aGUgYXR0cmlidXRlcyBcclxuICAgICAqIHRvIGJlIHJlbmRlcmVkLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZURhdGEgLSBzZXR0aW5ncyBmb3IgYWxsIHRoZSBhdHRyaWJ1dGVzLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXR0cmlidXRlS2V5cyAtIGF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZURhdGEgPSB7fSwgYXR0cmlidXRlS2V5cyA9IFtdKXtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBbGwgYXR0cmlidXRlcyB0byBiZSBtYWRlLlxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5hdHRyaWJ1dGVEYXRhID0gYXR0cmlidXRlRGF0YTtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBdHRyaWJ1dGUgbmFtZXMgdG8gYmUgc2V0LlxyXG4gICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVLZXlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBhdHRyaWJ1dGVzIGJhc2VkIG9uIHRoZSBrZXlzIGFuZCBhdHRyaWJ1dGUgZGF0YS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhdHRyaWJ1dGVEYXRhID0geyByZXF1aXJlZCA9IFwidHJ1ZVwifTtcclxuICAgICAqIGF0dHJpYnV0ZUtleXMgPSBbXCJyZXF1aXJlZFwiXTtcclxuICAgICAqIFxyXG4gICAgICogLy8gQmVjb21lczogXHJcbiAgICAgKiBodG1sID0gJ3JlcXVpcmVkID0gXCJ0cnVlXCInXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVLZXlzLCBhdHRyaWJ1dGVEYXRhfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBhdHRyaWJ1dGVLZXlzLnJlZHVjZSggKGN1cnJlbnRBdHRyaWJ1dGVIVE1MLCBjdXJyZW50S2V5KSA9PntcclxuXHJcbiAgICAgICAgICAgIGlmKGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZVRhZ0hUTUwgPSBhdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldID09PSAndGFnLW9ubHknID8gXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50S2V5IDpcclxuICAgICAgICAgICAgICAgIGAke2N1cnJlbnRLZXl9PVwiJHthdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldfVwiYFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50QXR0cmlidXRlSFRNTH0gJHthdHRyaWJ1dGVUYWdIVE1MfSBgO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEF0dHJpYnV0ZUhUTUw7XHJcbiAgICAgICAgfSwgJycpOyAgIFxyXG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVIVE1MO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBWaWRlb1NldHRpbmdzIGZyb20gJy4uL3NldHRpbmdzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnRydWN0b3IoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50dGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QQVVTRSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHVyYXRpb24oY2IpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLm9uY2UodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfRFVSQVRJT04sIChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjYihkdXJhdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuR0VUX0RVUkFUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWb2x1bWUodm9sdW1lKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VUX1ZPTFVNRSwgdm9sdW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWVrKHNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRUVLLCBzZWNvbmRzKTtcclxuICAgIH1cclxufSIsImltcG9ydCBDb250cm9sRXZlbnRzIGZyb20gJy4vZXZlbnRzLmpzJztcclxuaW1wb3J0IFZpZGVvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xzIGV4dGVuZHMgQ29udHJvbEV2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IDAuNTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xFdmVudE5hbWVzID0gbmV3IFZpZGVvRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoaVZYanNCdXMpIHtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlRJTUVfVVBEQVRFLCB0aGlzLnVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWUlORywgdGhpcy53aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIHRoaXMuY2FuUGxheUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcmVsYXRpdmVQb3NpdGlvbiA9IHsgeDogZWxlbWVudC5vZmZzZXRMZWZ0LCB5OiBlbGVtZW50Lm9mZnNldFRvcCB9O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICByZWxhdGl2ZVBvc2l0aW9uLnggKz0gdGVtcFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueSArPSB0ZW1wUG9zaXRpb24ueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFkanVzdFZvbHVtZShldmVudCkge1xyXG4gICAgICAgIGxldCB7dm9sdW1lQmFyLCBtdXRlQ29udHJvbHMsIGN1cnJlbnRWb2x1bWUsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCBtdXRlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7b2Zmc2V0V2lkdGg6IHdpZHRoIH0gPSB2b2x1bWVCYXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24odm9sdW1lQmFyKTtcclxuICAgICAgICBsZXQge3g6IGFic29sdXRlWH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgdm9sdW1lTGV2ZWwgPSAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIG11dGVDb250cm9sc0NsYXNzZXMpO1xyXG5cclxuICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dm9sdW1lTGV2ZWwgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IHZvbHVtZUxldmVsO1xyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKHZvbHVtZUxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBzY3J1YihldmVudCkge1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtvZmZzZXRXaWR0aDogd2lkdGh9ID0gc2NydWJCYXI7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oc2NydWJCYXIpO1xyXG4gICAgICAgIGxldCB7eDogYWJzb2x1dGVYfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCBzY3J1YlRvVGltZSA9IHRoaXMuZHVyYXRpb24gKiAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lT2JqZWN0ID0gdGhpcy5jb252ZXJ0U2Vjb25kc1RvUGFydHMoc2NydWJUb1RpbWUpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gdGhpcy5jcmVhdGVUaW1lU3RhbXAoY3VycmVudFRpbWVPYmplY3QpO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgdGltZWxhcHNlZCA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhzY3J1YkJhci5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGltZVN0YW1wfWA7XHJcbiAgICAgICAgdGltZWxhcHNlZC5zdHlsZS53aWR0aCA9IGAkeyh0cnVlWCAvIHdpZHRoKSAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrKHNjcnViVG9UaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5UGF1c2UoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMocGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAocGxheVBhdXNlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBwbGF5Q2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgcGF1c2VDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXV0ZShldmVudCkge1xyXG4gICAgICAgIGxldCB7bXV0ZUNvbnRyb2xzLCBtdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlcywgdm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChtdXRlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSB1bm11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gbXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt0aGlzLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHlUb1BsYXkocGxheWVyLCBzdGF0ZURhdGEpIHtcclxuICAgICAgICBsZXQge3ZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHtzZWxmLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUoc2VsZi5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICB0aGlzLmdldER1cmF0aW9uKChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3RvdGFsVGltZUluZm8sIGN1cnJlbnRUaW1lSW5mbywgc2NydWJCYXJ9ID0gc2VsZjtcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uVGltZU9iamVjdCA9IHNlbGYuY29udmVydFNlY29uZHNUb1BhcnRzKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uVGltZVN0YW1wID0gc2VsZi5jcmVhdGVUaW1lU3RhbXAoZHVyYXRpb25UaW1lT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbFRpbWVJbmZvKSB0b3RhbFRpbWVJbmZvLmlubmVySFRNTCA9IGAvJHtkdXJhdGlvblRpbWVTdGFtcH1gO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYDAwOjAwYDtcclxuICAgICAgICAgICAgaWYgKHNjcnViQmFyKSBzY3J1YkJhci5jaGlsZHJlblswXS5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaW1lVXBkYXRlKHBsYXllcikge1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZTogc2Vjb25kc30gPSBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHNlY29uZHMgPSBzZWNvbmRzID4gdGhpcy5kdXJhdGlvbiA/IDAgOiBzZWNvbmRzO1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgdGltZUxhcHNlZCA9IHNlY29uZHMgLyB0aGlzLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHNjcnViQmFyKSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lbGFwc2VkRWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhzY3J1YkJhci5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGltZWxhcHNlZEVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt0aW1lTGFwc2VkICogMTAwfSVgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBsYXlpbmcoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGF1c2VkKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgc2VhcmNoQ2xhc3Nlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7c2NydWJCYXIsIHZvbHVtZUJhciwgcGxheVBhdXNlQ29udHJvbHMsIG11dGVDb250cm9sc30gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlWWGpzQnVzID0gaVZYanNCdXM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdXBkYXRlVGltZSk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBhdXNlZCA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUEFVU0VELCB3aGlsZVBhdXNlZCk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBsYXlpbmcgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHdoaWxlUGxheWluZyk7XHJcbiAgICAgICAgdGhpcy5jYW5QbGF5Q2FsbGJhY2sgPSAgaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgY2FuUGxheUNhbGxCYWNrKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSB0aGlzLnVwZGF0ZVRpbWUgPyB0aGlzLnVwZGF0ZVRpbWUgOiB1cGRhdGVUaW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvbHVtZUJhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5hZGp1c3RWb2x1bWUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjcnViQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2NydWIoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRQbGF5UGF1c2UoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG11dGVDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldE11dGUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNhblBsYXlDYWxsQmFjayhwbGF5ZXIsIF9zdGF0ZURhdGEpIHtcclxuICAgICAgICAgICAgc2VsZi5vblJlYWR5VG9QbGF5KHBsYXllciwgX3N0YXRlRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZShwbGF5ZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5vblRpbWVVcGRhdGUocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdoaWxlUGF1c2VkKHBsYXllcikge1xyXG4gICAgICAgICAgICBzZWxmLm9uUGF1c2VkKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3aGlsZVBsYXlpbmcoKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25QbGF5aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRCeUNsYXNzZXMoZWxlbWVudHMsIGNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgZWxlbWVudEFycmF5ID0gZWxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSA/XHJcbiAgICAgICAgICAgIGVsZW1lbnRzIDpcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShlbGVtZW50cyk7XHJcbiAgICAgICAgbGV0IHRoaXNFbGVtZW50O1xyXG5cclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goKGNsYXNzTmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXNFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzRWxlbWVudCA9IGVsZW1lbnRBcnJheS5maW5kKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc0VsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGltZVN0YW1wKHRpbWVPYmplY3QpIHtcclxuICAgICAgICBsZXQge2hvdXJzLCByZW1haW5pbmdNaW51dGVzOiBtaW51dGVzLCByZW1haW5pbmdTZWNvbmRzOiBzZWNvbmRzfSA9IHRpbWVPYmplY3Q7XHJcbiAgICAgICAgbGV0IGhvdXJTdHJpbmcgPSAnJztcclxuICAgICAgICBsZXQgbWludXRlU3RyaW5nID0gbWludXRlcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke21pbnV0ZXN9OmAgOlxyXG4gICAgICAgICAgICBgJHttaW51dGVzfTpgO1xyXG4gICAgICAgIGxldCBzZWNvbmRTdHJpbmcgPSBzZWNvbmRzIDwgMTAgP1xyXG4gICAgICAgICAgICBgMCR7c2Vjb25kc31gIDpcclxuICAgICAgICAgICAgYCR7c2Vjb25kc31gO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGhvdXJTdHJpbmcgPSBob3VycyA8IDEwID9cclxuICAgICAgICAgICAgICAgIGAwJHtob3Vyc306YCA6XHJcbiAgICAgICAgICAgICAgICBgJHtob3Vyc306YDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aG91clN0cmluZ30ke21pbnV0ZVN0cmluZ30ke3NlY29uZFN0cmluZ31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgbGV0IHRpbWVJbmZvcm1hdGlvbiA9IHtcclxuICAgICAgICAgICAgbWludXRlczogbWludXRlcyxcclxuICAgICAgICAgICAgaG91cnM6IE1hdGguZmxvb3IobWludXRlcyAvIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nU2Vjb25kczogTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxyXG4gICAgICAgICAgICByZW1haW5pbmdNaW51dGVzOiBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MCksXHJcbiAgICAgICAgICAgIHNlY29uZHM6IHNlY29uZHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1lSW5mb3JtYXRpb247XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckNvbnRyb2xFdmVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGF5XCIgOiAnaVZYOnZpZGVvOnBsYXknLFxyXG4gICAgICAgICAgICBcInBhdXNlXCIgOiAnaVZYOnZpZGVvOnBhdXNlJyxcclxuICAgICAgICAgICAgXCJzZWVrXCIgOiAnaVZYOnZpZGVvOnNlZWtlZCcsXHJcbiAgICAgICAgICAgIFwicGxheWluZ1wiIDogXCJpVlg6dmlkZW86cGxheWluZ1wiLFxyXG4gICAgICAgICAgICBcImVuZGVkXCIgOiBcImlWWDp2aWRlbzplbmRlZFwiLFxyXG4gICAgICAgICAgICBcInBhdXNlZFwiIDogXCJpVlg6dmlkZW86cGF1c2VkXCIsXHJcbiAgICAgICAgICAgIFwic2V0Vm9sdW1lXCIgOiAnaVZYOnZpZGVvOnNldFZvbHVtZScsXHJcbiAgICAgICAgICAgIFwiZHVyYXRpb25cIiA6IFwiaVZYOnZpZGVvOnJlcXVlc3REdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImdldER1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpnZXREdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImNhblBsYXlcIiA6IFwiaVZYOnZpZGVvOmNhbnBsYXlcIixcclxuICAgICAgICAgICAgXCJ0aW1lVXBkYXRlXCIgOiBcImlWWDp2aWRlbzp0aW1ldXBkYXRlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcG9zZVwiIDogXCJpVlg6dmlkZW86ZGlzcG9zZVwiLFxyXG4gICAgICAgICAgICBcInZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpXHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
