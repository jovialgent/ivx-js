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

},{"../../utilities/type-parsers.js":56}],3:[function(require,module,exports){
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

},{"../../utilities/type-parsers.js":56}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./video.js":6}],6:[function(require,module,exports){
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

},{"./index.js":4}],7:[function(require,module,exports){
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

},{"../../../utilities/asserts.js":55,"../../../utilities/type-parsers.js":56,"../utilities/attributes.js":51}],8:[function(require,module,exports){
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

},{"../../../utilities/asserts.js":55,"../../../utilities/type-parsers.js":56,"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],9:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],10:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],11:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],12:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],13:[function(require,module,exports){
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

},{"./style":20}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14}],16:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],17:[function(require,module,exports){
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


            return " \n        <label for=\"" + id + (value.length > 0 ? '-' + value : '') + "\" class=\"" + uiClasses + "\">\n        " + radioHTML + "\n        </label>";
        }
    }, {
        key: "renderRadioHTML",
        value: function renderRadioHTML(attrHTML, label) {
            return " \n            <input type=\"radio\" " + attrHTML + ">\n            " + label;
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

},{"../utilities/attributes.js":51,"./messages.js":14}],18:[function(require,module,exports){
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
                headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
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

},{}],19:[function(require,module,exports){
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

},{"../utilities/attributes.js":51}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],22:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],23:[function(require,module,exports){
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

},{"../utilities/attributes.js":51,"./messages.js":14,"./style":20}],24:[function(require,module,exports){
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

},{"../../video/controls/index.js":53}],25:[function(require,module,exports){
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

},{"../default/anchor.js":7}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function Card($scope, iVXjsActions) {
    _classCallCheck(this, Card);

    var _$scope$settings = $scope.settings,
        settings = _$scope$settings === undefined ? {} : _$scope$settings;
    var _settings$img = settings.img,
        img = _settings$img === undefined ? '' : _settings$img,
        _settings$title = settings.title,
        title = _settings$title === undefined ? '' : _settings$title,
        _settings$firstName = settings.firstName,
        firstName = _settings$firstName === undefined ? '' : _settings$firstName,
        _settings$description = settings.description,
        description = _settings$description === undefined ? '' : _settings$description,
        _settings$events = settings.events,
        events = _settings$events === undefined ? [] : _settings$events;


    this.img = img;
    this.title = title;
    this.firstName = firstName;
    this.description = description;
    this.buttonPressed = function () {
        iVXjsActions.resolveActions(events, function () {});
    };
};

Card.$inject = ['$scope', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(Card);

},{"../../../../../angular/utilities/create-factory-function.js":1}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputController = require('../../../../../angular/utilities/input-controller.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownInputController = function (_InputControllerHelpe) {
    _inherits(DropdownInputController, _InputControllerHelpe);

    function DropdownInputController($scope, $element, iVXjs, iVXjsActions) {
        _classCallCheck(this, DropdownInputController);

        var _this = _possibleConstructorReturn(this, (DropdownInputController.__proto__ || Object.getPrototypeOf(DropdownInputController)).call(this, $scope, iVXjs, iVXjsActions));

        var _$scope$inputData = $scope.inputData,
            defaultValue = _$scope$inputData.defaultValue,
            options = _$scope$inputData.options,
            name = _$scope$inputData.name,
            _$scope$inputData$set = _$scope$inputData.settings,
            settings = _$scope$inputData$set === undefined ? {} : _$scope$inputData$set;
        var _settings$dropdown = settings.dropdown,
            dropdown = _settings$dropdown === undefined ? {} : _settings$dropdown;
        var _dropdown$multiple = dropdown.multiple,
            multiple = _dropdown$multiple === undefined ? false : _dropdown$multiple;

        var self = _this;

        _this.selected = !multiple ? {
            value: iVXjs.experience.data[name] ? iVXjs.experience.data[name] : ''
        } : [{
            value: iVXjs.experience.data[name] ? iVXjs.experience.data[name] : ''
        }];
        _this.onChange = function (value) {
            var _$scope$inputData2 = $scope.inputData,
                name = _$scope$inputData2.name,
                _$scope$inputData2$on = _$scope$inputData2.onChange,
                onChange = _$scope$inputData2$on === undefined ? [] : _$scope$inputData2$on;


            if (Array.isArray(value)) {
                value = selected.reduce(function (selectedVals, currentVal) {
                    if (selectedVals.length <= 0) return '' + currentVal.value;
                    return selectedVals + ', ' + currentVal.value;
                }, '');
            }

            onChange.unshift({ eventName: 'setData', args: { key: name, value: value.value } });
            iVXjsActions.resolveActions(onChange, function () {});
        };
        return _this;
    }

    return DropdownInputController;
}(_inputController.InputControllerHelper);

DropdownInputController.$inject = ['$scope', '$element', 'iVXjs', 'ivxjs.actions'];

exports.default = (0, _createFactoryFunction2.default)(DropdownInputController);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/input-controller.js":2}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _elementCard = require('../controllers/element.card.js');

var _elementCard2 = _interopRequireDefault(_elementCard);

var _card = require('../../card.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
    function Card($compile, $timeout) {
        _classCallCheck(this, Card);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.scope = {
            settings: '=settings'
        };
        this.controller = _elementCard2.default;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = function ($scope, iElm, iAttrs, controller) {
            var _$scope$settings = $scope.settings,
                settings = _$scope$settings === undefined ? {} : _$scope$settings;
            var cardType = settings.cardType,
                _settings$classes = settings.classes,
                classes = _settings$classes === undefined ? "" : _settings$classes;

            var html = new _card.CardTemplates($scope.settings)[cardType + "CardHTML"];

            $scope.classes = classes;

            iElm.html(html);
            $compile(iElm.contents())($scope);
            $timeout(function () {
                $('.special.cards .image').dimmer({
                    on: 'hover'
                });
            }, 0);
        };
    }

    _createClass(Card, [{
        key: 'templateHTML',
        get: function get() {
            return '<div class="{{classes}}"></div>';
        }
    }]);

    return Card;
}();

Card.$inject = ['$compile', '$timeout'];

exports.default = (0, _createFactoryFunction2.default)(Card);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../card.js":31,"../controllers/element.card.js":26}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createFactoryFunction = require('../../../../../angular/utilities/create-factory-function.js');

var _createFactoryFunction2 = _interopRequireDefault(_createFactoryFunction);

var _inputDropdown = require('../controllers/input.dropdown.js');

var _inputDropdown2 = _interopRequireDefault(_inputDropdown);

var _messagesError = require('../../../../../angular/utilities/messages.error.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropdownInput = function () {
    function DropdownInput($rootScope, $compile, $filter, $timeout, iVXjs, iVXjsUIModule, iVXjsBus) {
        _classCallCheck(this, DropdownInput);

        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = _inputDropdown2.default;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = function ($scope, iElm, iAttrs, controller) {
            var input = $scope.inputData;
            var id = input.id,
                _input$errors = input.errors,
                errors = _input$errors === undefined ? {} : _input$errors,
                name = input.name,
                labelHTML = input.labelHTML,
                _input$label = input.label,
                label = _input$label === undefined ? $filter('stringParsers')('startCase', id) : _input$label,
                _input$attributes = input.attributes,
                attributes = _input$attributes === undefined ? {} : _input$attributes,
                options = input.options,
                defaultDisplay = input.defaultDisplay,
                defaultValue = input.defaultValue,
                _input$settings = input.settings,
                settings = _input$settings === undefined ? {} : _input$settings;
            var _settings$directives = settings.directives,
                directives = _settings$directives === undefined ? '' : _settings$directives;

            var errorMessages = new _messagesError.ErrorMessages(name, errors, attributes);
            var defaultOptionTag = '<option value="">Select an option...</option>';
            var tagHTML = directives + '\n                           ng-change=\'vm.onChange(vm.selected)\'\n                           ng-options="option.display for option in inputData.options track by option.value" \n                           ng-model=\'vm.selected\'';

            if (attributes.required || defaultDisplay) {
                defaultOptionTag = defaultDisplay ? '<option value="">' + defaultDisplay + '</option>' : defaultOptionTag;
            }

            var optionsClass = new iVXjsUIModule.dropdown(id, name, label = labelHTML ? labelHTML : label, defaultDisplay, settings, tagHTML, errorMessages);

            iElm.html(optionsClass.html);

            if (typeof $ !== 'undefined') {}

            $compile(iElm.contents())($scope);
            $(iElm.find('select')).dropdown();
            $timeout(function () {
                var experienceValue = iVXjs.experience.data[name];
                $(iElm.find('select')).dropdown('set selected', experienceValue ? experienceValue : '');
            }, 0);
        };
    }

    _createClass(DropdownInput, [{
        key: 'templateHTML',
        get: function get() {
            return '<div></div>';
        }
    }]);

    return DropdownInput;
}();

DropdownInput.$inject = ['$rootScope', '$compile', '$filter', '$timeout', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus'];

exports.default = (0, _createFactoryFunction2.default)(DropdownInput);

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/messages.error.js":3,"../controllers/input.dropdown.js":27}],30:[function(require,module,exports){
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

    function Buttons(buttons, inputData) {
        _classCallCheck(this, Buttons);

        return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, buttons, inputData, _messages.ErrorMessages));
    }

    _createClass(Buttons, [{
        key: 'buttonClasses',
        get: function get() {
            return 'ui button';
        }
    }]);

    return Buttons;
}(_buttons.Buttons);

;

},{"../default/buttons.js":8,"./messages.js":39}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardTemplates = exports.CardTemplates = function () {
    function CardTemplates(settings) {
        _classCallCheck(this, CardTemplates);

        this.settings = settings;
    }

    _createClass(CardTemplates, [{
        key: "miniCardHTML",
        get: function get() {
            return "\n        <div class=\"ui cards\">\n          <div class=\"card\">\n            <div class=\"content\">\n                <img class=\"right floated mini ui image\" src=\"{{vm.img}}\">\n                <div class=\"header\">\n                    {{vm.firstName}} {{vm.lastName}}\n                </div>\n                <div class=\"meta\">\n                        {{vm.title}}\n                </div>\n                <div class=\"description\">\n                    {{vm.description}}\n                 </div>\n            </div>\n            <div class=\"extra content\">\n                <div class=\"ui one buttons\">\n                    <div ng-click=\"vm.buttonPressed()\" class=\"ui button\">Buy it</div>\n                </div>\n            </div>\n          </div>\n          </div>";
        }
    }, {
        key: "dimmerCardHTML",
        get: function get() {
            var classes = this.settings.classes;

            return " \n        <div class=\"ui special cards\">  \n          <div class=\"card\">\n            <div class=\"blurring dimmable image\">\n                <div class=\"ui dimmer\">\n                    <div class=\"content\">\n                        <div class=\"center\">\n                            <button ng-click=\"vm.buttonPressed()\" class=\"ui inverted button\">Buy this!</button>\n                        </div>\n                    </div>\n                </div>\n                <img ng-src=\"{{vm.img}}\">\n            </div>\n            <div class=\"content\">\n                <a class=\"header\">{{vm.firstName}} {{vm.lastName}}</a>\n                <div class=\"meta\">\n                    <a>{{vm.title}}</a>\n                </div>\n                <div class=\"description\">\n                    {{vm.description}}\n                </div>\n            </div>\n            </div>\n            \n        </div>";
        }
    }]);

    return CardTemplates;
}();

;

},{}],32:[function(require,module,exports){
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
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML;

            if (labelHTML) label = labelHTML;
            return '\n         <div class="' + classes + '">\n            <input ' + attributes + ' >\n             <label for="' + input.id + '">    \n                ' + label + '\n            </label>\n         </div>';
        }
    }, {
        key: 'uiClasses',
        get: function get() {
            return 'ui checkbox';
        }
    }, {
        key: 'uiAttributes',
        get: function get() {
            return '';
        }
    }]);

    return Checkbox;
}(_checkbox.Checkbox);

},{"../default/checkbox.js":9,"./messages.js":39}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Date = undefined;

var _date = require("../default/date.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Date = exports.Date = function (_DefaultDate) {
    _inherits(Date, _DefaultDate);

    function Date(inputObj) {
        _classCallCheck(this, Date);

        return _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, inputObj, _messages.ErrorMessages));
    }

    return Date;
}(_date.Date);

},{"../default/date.js":10,"./messages.js":39}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatetimeLocal = undefined;

var _datetimeLocal = require("../default/datetime-local.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatetimeLocal = exports.DatetimeLocal = function (_DefaultDatetimeLocal) {
    _inherits(DatetimeLocal, _DefaultDatetimeLocal);

    function DatetimeLocal(inputObj) {
        _classCallCheck(this, DatetimeLocal);

        return _possibleConstructorReturn(this, (DatetimeLocal.__proto__ || Object.getPrototypeOf(DatetimeLocal)).call(this, inputObj, _messages.ErrorMessages));
    }

    return DatetimeLocal;
}(_datetimeLocal.DatetimeLocal);

;

},{"../default/datetime-local.js":11,"./messages.js":39}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Dropdown = exports.Dropdown = function () {
    function Dropdown(id, name, label, defaultDisplay) {
        var settings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        var tagHTML = arguments[5];
        var errorMessages = arguments[6];

        _classCallCheck(this, Dropdown);

        this.errorMessages = errorMessages;
        this.name = name;
        this.label = label;
        this.defaultDisplay = defaultDisplay;
        this.tagHTML = tagHTML;
        this.id = id;
        this.settings = settings;
    }

    _createClass(Dropdown, [{
        key: "uiClasses",
        get: function get() {
            return 'ui dropdown';
        }
    }, {
        key: "html",
        get: function get() {
            var id = this.id,
                name = this.name,
                label = this.label,
                defaultDisplay = this.defaultDisplay,
                settings = this.settings,
                uiClasses = this.uiClasses;
            var _settings$dropdown = settings.dropdown,
                dropdown = _settings$dropdown === undefined ? "" : _settings$dropdown;
            var _dropdown$multiple = dropdown.multiple,
                multiple = _dropdown$multiple === undefined ? false : _dropdown$multiple;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + " " + uiClasses;

            var _errorMessages = this.errorMessages,
                _errorMessages$messag = _errorMessages.messages,
                errorMessages = _errorMessages$messag === undefined ? [] : _errorMessages$messag,
                _errorMessages$attrib = _errorMessages.attributes,
                errorAttributes = _errorMessages$attrib === undefined ? '' : _errorMessages$attrib,
                _errorMessages$nonVal = _errorMessages.nonValidate,
                nonValidate = _errorMessages$nonVal === undefined ? [] : _errorMessages$nonVal,
                _errorMessages$tags = _errorMessages.tags,
                errorTags = _errorMessages$tags === undefined ? '' : _errorMessages$tags;

            var defaultOptionTag = "<option value=\"\">Select an option...</option>";
            var errorHTML = new _messages.ErrorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new _attributes.AttributeTags(errorAttributes, nonValidate).html;

            if (errorAttributes.required || defaultDisplay && defaultDisplay.length >= 0) {
                defaultOptionTag = defaultDisplay ? "<option value=\"\">" + defaultDisplay + "</option>" : defaultOptionTag;
            }

            if (multiple) {
                nonValidateAttributesHTML = nonValidateAttributesHTML + " multiple=\"\"";
            }

            var inputHTML = " \n             <label>" + label + "</label>           \n               <select class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"" + nonValidateAttributesHTML + " " + errorTags + " " + this.tagHTML + ">\n                    " + defaultOptionTag + "\n               </select>\n               " + errorHTML;

            return "" + inputHTML;
        }
    }]);

    return Dropdown;
}();

;

},{"../utilities/attributes.js":51,"./messages.js":39,"./style":46}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Email = undefined;

var _email = require("../default/email.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Email = exports.Email = function (_DefaultEmail) {
    _inherits(Email, _DefaultEmail);

    function Email(inputObj) {
        _classCallCheck(this, Email);

        return _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, inputObj, _messages.ErrorMessages));
    }

    return Email;
}(_email.Email);

;

},{"../default/email.js":12,"./messages.js":39}],37:[function(require,module,exports){
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
            return 'ui form error';
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

            var submitHTML = submitLabel.length >= 0 ? '<div class="sixteen field wide ' + submitContainerClasses + '">\n                    <button class="ui button ' + submitInputClasses + '" type=\'submit\'>\n                        ' + submitLabel + '\n                    </button>\n                </div>' : '';

            return submitHTML;
        }
    }]);

    return Form;
}(_form.Form);

;

},{"../default/form.js":13,"./style.js":46}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SemanticUI = undefined;

var _form = require('./form.js');

var _anchor = require('./anchor.js');

var _buttons = require('./buttons.js');

var _checkbox = require('./checkbox.js');

var _date = require('./date.js');

var _datetimeLocal = require('./datetime-local.js');

var _dropdown = require('./dropdown.js');

var _email = require('./email.js');

var _number = require('./number.js');

var _options = require('./options.js');

var _radio = require('./radio.js');

var _style = require('./style.js');

var _text = require('./text.js');

var _textarea = require('./textarea.js');

var _url = require('./url.js');

var _inputDropdown = require('./angular/directives/input.dropdown.js');

var _inputDropdown2 = _interopRequireDefault(_inputDropdown);

var _elementCard = require('./angular/directives/element.card.js');

var _elementCard2 = _interopRequireDefault(_elementCard);

var _stateInput = require('./state.input.js');

var _stateVideo = require('./state.video.js');

var _stateNavigation = require('./state.navigation.js');

var _videoControls = require('./video.controls.js');

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Form/Input HTML


//Angular


//States


//Controls 


var SemanticUI = exports.SemanticUI = function SemanticUI() {
    _classCallCheck(this, SemanticUI);

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
    this.dropdown = _dropdown.Dropdown;
    this.videoControls = _videoControls2.default;
    this.states = {
        input: _stateInput.InputState,
        video: _stateVideo.VideoState,
        navigation: _stateNavigation.NavigationState
    };
    this.angular = {
        ivxjsSemanticUiDropdownInput: _inputDropdown2.default,
        ivxjsSemanticUiCard: _elementCard2.default

    };
};

;

module.export = initializeSemanticUI;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.ui.semantic-ui', initializeSemanticUI);
}

function initializeSemanticUI() {
    return SemanticUI;
}

},{"./anchor.js":25,"./angular/directives/element.card.js":28,"./angular/directives/input.dropdown.js":29,"./buttons.js":30,"./checkbox.js":32,"./date.js":33,"./datetime-local.js":34,"./dropdown.js":35,"./email.js":36,"./form.js":37,"./number.js":40,"./options.js":41,"./radio.js":42,"./state.input.js":43,"./state.navigation.js":44,"./state.video.js":45,"./style.js":46,"./text.js":47,"./textarea.js":48,"./url.js":49,"./video.controls.js":50}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorMessages = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require("../default/messages.js");

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
        key: "messageClasses",
        get: function get() {
            return 'ui error message';
        }
    }]);

    return ErrorMessages;
}(_messages.ErrorMessages);

;

},{"../default/messages.js":14}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Number = undefined;

var _number = require("../default/number.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Number = exports.Number = function (_DefaultNumber) {
    _inherits(Number, _DefaultNumber);

    function Number(inputObj) {
        _classCallCheck(this, Number);

        return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, inputObj, _messages.ErrorMessages));
    }

    return Number;
}(_number.Number);

;

},{"../default/number.js":15,"./messages.js":39}],41:[function(require,module,exports){
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
        key: 'uiClasses',
        get: function get() {
            return 'ui dropdown';
        }
    }]);

    return Options;
}(_options.Options);

;

},{"../default/options.js":16,"./messages.js":39}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _radio = require("../default/radio.js");

var _messages = require("./messages.js");

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
        key: "hasCorrectRadioClass",
        value: function hasCorrectRadioClass(classes) {
            var validRadioClasses = ["radio", "toggle", "slider"];
            var hasValidClass = false;

            validRadioClasses.forEach(function (validClass) {
                if (hasValidClass) return;
                hasValidClass = classes.indexOf(validClass) >= 0;
            });

            return hasValidClass;
        }
    }, {
        key: "uiRadioButtonContainer",
        value: function uiRadioButtonContainer(radioHTML, uiClasses) {
            var isValidRadioClass = this.hasCorrectRadioClass(uiClasses);

            if (!isValidRadioClass) uiClasses = uiClasses + " radio";

            return " \n        <div class=\"field\">\n            <div class=\"ui " + uiClasses + " checkbox\">\n                " + radioHTML + "\n            </div>\n        </div>";
        }
    }, {
        key: "renderRadioHTML",
        value: function renderRadioHTML(attrHTML, label, value) {
            var input = this.input;
            var id = input.id;

            return "\n          <input type=\"radio\" " + attrHTML + ">\n            <label for=\"" + id + (value.length > 0 ? '-' + value : '') + "\">   \n                     " + label + "\n          </label>\n          ";
        }
    }, {
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }]);

    return Radio;
}(_radio.Radio);

},{"../default/radio.js":17,"./messages.js":39}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(InputState, [{
        key: 'defaultSectionClasses',
        get: function get() {
            return 'ui container';
        }
    }, {
        key: 'defaultHeaderClasses',
        get: function get() {
            return 'ui header';
        }
    }]);

    return InputState;
}(_stateInput.InputState);

;

},{"../default/state.input.js":18}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(NavigationState, [{
        key: 'defaultSectionClasses',
        get: function get() {
            return 'ui container';
        }
    }, {
        key: 'defaultHeaderClasses',
        get: function get() {
            return 'ui header';
        }
    }]);

    return NavigationState;
}(_stateNavigation.NavigationState);

;

},{"../default/state.navigation.js":19}],45:[function(require,module,exports){
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
                headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
            var _section$classes = section.classes,
                sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes,
                footerClasses = _footer$classes === undefined ? '' : _footer$classes,
                _footer$html = footer.html,
                footerHTML = _footer$html === undefined ? '' : _footer$html;


            return '\n            <section class="ui container ' + sectionClasses + ' ' + iPhoneInlineClasses + '" id="' + data.id + '">\n                <header class="' + headerClasses + ' ' + this.defaultHeaderClasses + '">' + headerHTML + '</header>\n                ' + playerSection + '\n                <footer class="' + footerClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return VideoState;
}();

;

},{}],46:[function(require,module,exports){
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
        key: 'getInputContainerClassNames',
        value: function getInputContainerClassNames(settings) {
            if (!settings) settings = {};

            var _settings = settings,
                _settings$containerCl = _settings.containerClass,
                containerClass = _settings$containerCl === undefined ? 'field' : _settings$containerCl,
                _settings$classes = _settings.classes,
                classes = _settings$classes === undefined ? '' : _settings$classes;


            return containerClass + ' ' + classes;
        }
    }, {
        key: 'addWidthClasses',
        value: function addWidthClasses(inputHTML) {
            var currentWidthTotal = 0.0;
            var columns = { string: "twelve", number: 12 };
            var columnNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"];
            var contents = inputHTML.reduce(function (contentHTML, thisInput) {
                var html = thisInput.html,
                    settings = thisInput.settings;
                var _settings$width = settings.width,
                    width = _settings$width === undefined ? "1" : _settings$width,
                    _settings$container = settings.container,
                    container = _settings$container === undefined ? {} : _settings$container;
                var _container$classes = container.classes,
                    classes = _container$classes === undefined ? '' : _container$classes;

                var numericWidth = getNumericWidth(width);

                if (currentWidthTotal <= 0) {
                    contentHTML = contentHTML + '<div class="stackable fields"> ';
                }

                currentWidthTotal += numericWidth;

                var semanticUIwidth = columnNames[Math.round(numericWidth * columnNames.length) - 1];

                html = html.replace('ivxjs-grid-1-1', semanticUIwidth + ' wide field ' + classes);
                contentHTML = '' + contentHTML + html;

                if (currentWidthTotal >= 1) {
                    contentHTML = contentHTML + '</div>';
                    currentWidthTotal = 0;
                }

                return contentHTML;
            }, '');

            if (contents.substring(contents.length - 7) !== "</div>") {
                contents = contents + '</div>';
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

;

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _text = require("../default/text.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_DefaultText) {
    _inherits(Text, _DefaultText);

    function Text(inputObj) {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, inputObj, _messages.ErrorMessages));
    }

    return Text;
}(_text.Text);

;

},{"../default/text.js":21,"./messages.js":39}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _textarea = require("../default/textarea.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Textarea = exports.Textarea = function (_DefaultTextarea) {
    _inherits(Textarea, _DefaultTextarea);

    function Textarea(inputObj) {
        _classCallCheck(this, Textarea);

        return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, inputObj, _messages.ErrorMessages));
    }

    return Textarea;
}(_textarea.Textarea);

;

},{"../default/textarea.js":22,"./messages.js":39}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _url = require("../default/url.js");

var _messages = require("./messages.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url = exports.Url = function (_DefaultUrl) {
    _inherits(Url, _DefaultUrl);

    function Url(inputObj) {
        _classCallCheck(this, Url);

        return _possibleConstructorReturn(this, (Url.__proto__ || Object.getPrototypeOf(Url)).call(this, inputObj, _messages.ErrorMessages));
    }

    return Url;
}(_url.Url);

;

},{"../default/url.js":23,"./messages.js":39}],50:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, container));
    }

    _createClass(_class, [{
        key: 'totalTimeInfoClasses',
        get: function get() {
            return 'duration';
        }
    }, {
        key: 'playClasses',
        get: function get() {
            return 'play icon';
        }
    }, {
        key: 'pauseClasses',
        get: function get() {
            return 'pause icon';
        }
    }, {
        key: 'unmuteClasses',
        get: function get() {
            return 'unmute icon';
        }
    }, {
        key: 'muteClasses',
        get: function get() {
            return 'mute icon';
        }
    }, {
        key: 'playPauseControlsClasses',
        get: function get() {
            return 'ui icon button play-pause';
        }
    }, {
        key: 'muteControlsClasses',
        get: function get() {
            return 'ui icon button mute';
        }
    }, {
        key: 'scrubBarClasses',
        get: function get() {
            return 'ui small progress';
        }
    }, {
        key: 'scrubBarTimeLapseClasses',
        get: function get() {
            return 'bar';
        }
    }, {
        key: 'volumeBarClasses',
        get: function get() {
            return 'ui small progress';
        }
    }, {
        key: 'volumeBarCurrentVolumeClasses',
        get: function get() {
            return 'bar';
        }
    }, {
        key: 'scrubBarHTML',
        get: function get() {
            return '      \n          <div id="video-controls-scrub-bar" class="' + this.scrubBarClasses + '">\n                <div style="min-width:0" class="' + this.scrubBarTimeLapseClasses + '">\n                     \n                </div>\n                  <div class=\'label\'>\n                        ' + this.timestampHTML + '\n                </div>\n           \n            </div>';
        }
    }, {
        key: 'volumeBarHTML',
        get: function get() {
            return '\n            <div id="video-controls-volume-bar" class="progress ' + this.volumeBarClasses + '">\n                <div style="min-width:0" class="' + this.volumeBarCurrentVolumeClasses + '"></div>\n            </div>';
        }
    }, {
        key: 'html',
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML,
                scrubBarHTML = this.scrubBarHTML,
                timestampHTML = this.timestampHTML,
                muteButtonHTML = this.muteButtonHTML,
                volumeBarHTML = this.volumeBarHTML;


            return '\n        ' + scrubBarHTML + '\n        ' + playPauseButtonHTML + '\n        ' + muteButtonHTML + '\n        ' + volumeBarHTML;
        }
    }]);

    return _class;
}(_videoControls2.default);

exports.default = _class;
;

},{"../default/video.controls.js":24}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"../settings.js":54}],53:[function(require,module,exports){
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

},{"../../../constants/video.events.js":5,"./events.js":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}]},{},[38])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvdmlkZW8uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2RhdGV0aW1lLWxvY2FsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9lbWFpbC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZm9ybS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvbWVzc2FnZXMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L251bWJlci5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvcmFkaW8uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdHlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdGV4dC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3VybC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdmlkZW8uY29udHJvbHMuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmNob3IuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2NvbnRyb2xsZXJzL2VsZW1lbnQuY2FyZC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQuZHJvcGRvd24uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2RpcmVjdGl2ZXMvZWxlbWVudC5jYXJkLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmRyb3Bkb3duLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2NhcmQuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2Ryb3Bkb3duLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9mb3JtLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvaW5kZXguanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL251bWJlci5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvZXZlbnRzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy92aWRlby9zZXR0aW5ncy5qcyIsInNyYy91dGlsaXRpZXMvYXNzZXJ0cy5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLHFCO0FBQVQsU0FBUyxxQkFBVCxDQUErQixXQUEvQixFQUE0QztBQUMxRCxLQUFJLGdCQUFnQixXQUFwQjtBQUNBLEtBQUksT0FBTyxjQUFjLE9BQXpCO0FBQ0EsS0FBSSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBYTtBQUFBLG9DQUFULElBQVM7QUFBVCxPQUFTO0FBQUE7O0FBQy9CLDRDQUFXLGFBQVgsZ0JBQTRCLElBQTVCO0FBQ0gsRUFGRDs7QUFJQSxNQUFLLElBQUwsQ0FBVSxlQUFWOztBQUVBLFFBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7O0FDVkQ7Ozs7QUFDQSxJQUFJLGtCQUFrQixnQ0FBdEI7O0lBRWEscUIsV0FBQSxxQixHQUNULCtCQUFZLE1BQVosRUFBb0IsS0FBcEIsRUFBMkIsWUFBM0IsRUFBeUM7QUFBQTs7QUFBQSxRQUNw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dEIsQ0FBSixFQUF3QztBQUNwQyxrQ0FBYyxXQUFkO0FBQ0E7QUFDSDs7QUFFRCw4QkFBYyxXQUFkO0FBQ0EsMEJBQVUsV0FBVjtBQUNILGFBWEQ7O0FBYUEsbUJBQU8sV0FBUDtBQUNIOztBQUlEOzs7Ozs7Ozs7bUNBTXFDO0FBQUEsZ0JBQTVCLFVBQTRCLHVFQUFmLEVBQWU7QUFBQSxnQkFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2pDLGdCQUFJLFlBQVk7QUFDWiwwQkFBVSxJQURFO0FBRVosd0JBQVE7QUFGSSxhQUFoQjtBQUlBLGdCQUFJLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsZ0NBQWdCLEdBQWhCLElBQXVCLEVBQXZCO0FBQ0EsMkJBQVcsT0FBWCxDQUFtQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLHdCQUFJLFlBQVksS0FBSyxHQUFMLENBQVMsZ0JBQWdCLEdBQWhCLENBQVQsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBQWhCOztBQUVBLHdCQUFJLFNBQUosRUFBZTtBQUNYLGtDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0I7QUFDbEIsaUNBQUssR0FEYTtBQUVsQixtQ0FBTyxLQUZXO0FBR2xCLG1DQUFPLFFBQVEsR0FBUjtBQUhXLHlCQUF0QjtBQUtBLGtDQUFVLFFBQVYsR0FBcUIsS0FBckI7QUFDSCxxQkFQRCxNQU9PO0FBQ0gsd0NBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTBCLFFBQVEsR0FBUixDQUExQjtBQUNIO0FBQ0osaUJBYkQ7QUFjSCxhQWhCRDs7QUFrQkEsbUJBQU8sU0FBUDtBQUNIOzs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oY29uc3RydWN0b3IpIHtcclxuXHRsZXQgY29uc3RydWN0b3JGbiA9IGNvbnN0cnVjdG9yO1xyXG5cdGxldCBhcmdzID0gY29uc3RydWN0b3JGbi4kaW5qZWN0O1xyXG5cdGxldCBmYWN0b3J5RnVuY3Rpb24gPSAoLi4uYXJncykgPT4ge1xyXG4gICAgXHRyZXR1cm4gbmV3IGNvbnN0cnVjdG9yRm4oLi4uYXJncyk7XHJcblx0fVxyXG5cdFxyXG5cdGFyZ3MucHVzaChmYWN0b3J5RnVuY3Rpb24pO1xyXG5cclxuXHRyZXR1cm4gYXJncztcclxufSIsImltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxubGV0IG15VHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0Q29udHJvbGxlckhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGlWWGpzLCBpVlhqc0FjdGlvbnMpIHtcclxuICAgICAgICBsZXQgeyBpbnB1dERhdGE6IGlucHV0IH0gPSAkc2NvcGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRFeHBlcmllbmNlVmFsdWUgPSBpVlhqcy5leHBlcmllbmNlLmRhdGFbaW5wdXQubmFtZV07XHJcblxyXG4gICAgICAgIGlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pbnB1dFZhbHVlID0gY3VycmVudEV4cGVyaWVuY2VWYWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFeHBlcmllbmNlVmFsdWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlucHV0VmFsdWUgPSBjdXJyZW50RXhwZXJpZW5jZVZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignY2hhbmdlZCcsIGZ1bmN0aW9uIChpbnB1dCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFteVR5cGVWYWxpZGF0b3IuaXNFbXB0eSh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAndHJ1ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHsgbmFtZSwgb25DaGFuZ2UgPSBbXSB9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2UudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnc2V0RGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJnczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlWWGpzLmxvZy5kZWJ1ZyhgSW5wdXQgJHtpbnB1dC5uYW1lfSBPbiBDaGFuZ2UgU3RhcnRlZGAsIHt9LCB7IGlucHV0LCBzb3VyY2U6ICdvbkNoYW5nZScsIHN0YXR1czogJ3N0YXJ0ZWQnLCBhY3Rpb25zOiBvbkNoYW5nZSwgdGltZXN0YW1wOiBEYXRlLm5vdygpIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlWWGpzQWN0aW9ucy5yZXNvbHZlQWN0aW9ucyhvbkNoYW5nZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlWWGpzLmxvZy5kZWJ1ZyhgSW5wdXQgJHtpbnB1dC5uYW1lfSBPbiBDaGFuZ2UgRW5kZWRgLCB7fSwgeyBpbnB1dCwgc291cmNlOiAnb25DaGFuZ2UnLCBzdGF0dXM6ICdjb21wbGV0ZWQnLCBhY3Rpb25zOiBvbkNoYW5nZSwgdGltZXN0YW1wOiBEYXRlLm5vdygpIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09iamVjdFBhcnNlcnN9IGZyb20gJy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IHRoaXNPYmplY3RQYXJzZXIgPSBuZXcgT2JqZWN0UGFyc2VycygpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXQsIGVycm9ycywgYXR0cmlidXRlcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHtuYW1lOiBpbnB1dE5hbWUsIHR5cGU6IGlucHV0VHlwZX0gPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmlucHV0TmFtZSA9IGlucHV0TmFtZTtcclxuICAgICAgICB0aGlzLmlucHV0VHlwZSA9IGlucHV0VHlwZTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGxldCB7YXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhbmd1bGFyRXJyb3JNYXAgPSB0aGlzLmFuZ3VsYXJFcnJvck1hcDtcclxuICAgICAgICBsZXQgbm9uQW5ndWxhciA9IHRoaXMubm9uQW5ndWxhcjtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGUgPSB0aGlzLm5vblZhbGlkYXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc09iamVjdFBhcnNlci5yZWR1Y2UoYXR0cmlidXRlcywgKHRhZ3MsIGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVLZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vblZhbGlkYXRlLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+PSAwKSByZXR1cm4gdGFncztcclxuICAgICAgICAgICAgbGV0IHRhZyA9IG5vbkFuZ3VsYXIuaW5kZXhPZihhdHRyaWJ1dGVLZXkpID49IDAgP1xyXG4gICAgICAgICAgICAgICAgYCR7YXR0cmlidXRlS2V5fT1cIiR7YXR0cmlidXRlVmFsdWV9XCJgIDpcclxuICAgICAgICAgICAgICAgIGBuZy0ke2FuZ3VsYXJFcnJvck1hcFthdHRyaWJ1dGVLZXldfSA9IFwiJHthdHRyaWJ1dGVWYWx1ZX1cIiBgO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGFnc30gJHt0YWd9YDtcclxuICAgICAgICB9LCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXROYW1lLCBpbnB1dFR5cGUsIGVycm9ycywgYXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhbmd1bGFyRXJyb3JNYXAgPSB0aGlzLmFuZ3VsYXJFcnJvck1hcDtcclxuICAgICAgICBsZXQgZGVmYXVsdE1lc3NhZ2VzID0gdGhpcy5kZWZhdWx0RXJyb3JNZXNzYWdlcztcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcCgoYXR0cmlidXRlS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGVycm9ycyAmJiBlcnJvcnNbYXR0cmlidXRlS2V5XSA/IGVycm9yc1thdHRyaWJ1dGVLZXldIDogZGVmYXVsdE1lc3NhZ2VzW2F0dHJpYnV0ZUtleV07XHJcbiAgICAgICAgICAgIGxldCBhdHRySFRNTCA9IGBuZy1zaG93PVwiKCRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZGlydHkgfHwgJHBhcmVudC5mb3JtSW5wdXQuJHN1Ym1pdHRlZCkgJiYgJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRlcnJvci4ke2FuZ3VsYXJFcnJvck1hcFthdHRyaWJ1dGVLZXldfVwiYDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgYXR0ckhUTUw6IGF0dHJIVE1MXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5wdXRUeXBlICYmIGlucHV0VHlwZSAhPT0gJ3RleHQnICYmIGlucHV0VHlwZSAhPSBcIm9wdGlvbnNcIikge1xyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2godGhpcy5pbnB1dFR5cGVFcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW5wdXRUeXBlRXJyb3IoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dE5hbWUsIGlucHV0VHlwZSwgZXJyb3JzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGVycm9yc1tpbnB1dFR5cGVdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UgPyBlcnJvck1lc3NhZ2UgOiBcIkludmFsaWQgXCIgKyBpbnB1dFR5cGUsXHJcbiAgICAgICAgICAgIGF0dHJIVE1MOiBgbmctc2hvdz1cIigkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGRpcnR5IHx8ICRwYXJlbnQuZm9ybUlucHV0LiRzdWJtaXR0ZWQpICYmICRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZXJyb3IuJHtpbnB1dFR5cGV9XCJgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBub25Bbmd1bGFyKCkge1xyXG4gICAgICAgIHJldHVybiBbJ21pbicsICdtYXgnLCAncmVhZG9ubHknLCAncGxhY2Vob2xkZXInLCAnc3RlcCcsICdyZWFkb25seScsICdzdHlsZSddXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5vblZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBbJ3N0ZXAnLCAncGxhY2Vob2xkZXInLCAncmVhZG9ubHknXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYW5ndWxhckVycm9yTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbmxlbmd0aDogJ21pbmxlbmd0aCcsXHJcbiAgICAgICAgICAgIG1pbjogXCJtaW5cIixcclxuICAgICAgICAgICAgbWF4OiBcIm1heFwiLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcclxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnbWF4bGVuZ3RoJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRFcnJvck1lc3NhZ2VzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbmxlbmd0aDogJ1RvbyBTaG9ydCcsXHJcbiAgICAgICAgICAgIG1pbjogXCJUb28gTG93XCIsXHJcbiAgICAgICAgICAgIG1heDogXCJUb28gSGlnaFwiLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogJ1JlcXVpcmVkJyxcclxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnVG9vIExvbmcnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlkZW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFJFQURZX1BMQVlFUiA6IFwicmVhZHktcGxheWVyXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcblxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XG5cbmV4cG9ydCBjbGFzcyBBbmNob3Ige1xuICAgIGNvbnN0cnVjdG9yKGFuY2hvckluZm8pIHsgICBcbiAgICAgICB0aGlzLmFuY2hvckluZm8gPSBhbmNob3JJbmZvO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuY2hvckNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHthbmNob3JDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aHJlZiA9ICcnLCBjbGFzc2VzID0gJycsIGF0dHJpYnV0ZXMgPSB7fSwgbGFiZWwgPSBsYWJlbEhUTUwsIGxhYmVsSFRNTCwgaWQ9Jyd9ID0gdGhpcy5hbmNob3JJbmZvOyBcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhhdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICBpZighbGFiZWxIVE1MICYmICFsYWJlbCl7XG4gICAgICAgICAgICBsYWJlbCA9IGhyZWY7XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICA8YSBpZD0nJHtpZH0nIGNsYXNzPVwiJHtjbGFzc2VzfSAke2FuY2hvckNsYXNzZXN9XCIgIGhyZWY9XCIke2hyZWZ9XCIgJHthdHRyaWJ1dGVIVE1MfSA+JHtsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbH08L2E+ICAgICAgICAgICBcbiAgICAgICAgYFxuICAgIH1cbn1cbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIGNvbGxlY3Rpb24gb2YgYnV0dG9ucyBmb3Igb25lIGNsaWNrIHJlY29yZGluZyBvZiBcclxuICogYW4gaW5wdXQgdGhhdCBoYXMgbXVsdGlwbGUgb3B0aW9ucyBmb3IgZGF0YSByZWNvcmRpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUYWtlcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSBidXR0b25zLCBhIGNsYXNzIHRoYXQgcmVuZGVycyB0aGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyBhbmQgYSBjbGFzcyB0aGF0IHJlbmRlcnMgYXR0cmlidXRlcy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mbyAtIEluZm9ybWF0aW9uIHRvIGNyZWF0ZSB0aGlzIGJ1dHRvbiBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1dHRvbnNJbmZvLmJ1dHRvbnMgLSBlYWNoIGluZGl2aWR1YWwgYnV0dG9uIGRhdGEgYW5kIHNldHRpbmdzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvLnNldHRpbmdzIC0gc2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIFxyXG4gICAgICogQHBhcmFtIHtDbGFzc30gYnV0dG9uc0luZm8uZXJyb3JzIC0gYW4gZXJyb3IgY2xhc3MgdGhhdCB3YXMgY3JlYXRlZCBieSB0aGUgXHJcbiAgICAgKiByZW5kZXJpbmcgbGlicmFyeSBzbyB0aGUgZXJyb3JzIG9wZW4gYW5kIGRpc3BsYXkgYWxvbmdzaWRlIHRoZSBsaWJyYXJ5LiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucyA9IFtdLCBpbnB1dCwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnV0dG9ucyB0byBiZSByZW5kZXJlZFxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgaW4gdGhpcyBncm91cCBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXJyb3IgbWVzc2FnZSBjbGFzcyB0aGF0IHdpbGwgdGFrZSB0aGUgZXJyb3JzIGZyb20gXHJcbiAgICAgICAgICogdGhlIHJlbmRlcmluZyBsaWJyYXJ5IGFuZCBhZGRzIHRoZW0gdG8gdGhpcyBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhdHRyaWJ1dGUgdGFncyBodG1sIHRvIGJlIGFkZGVkIHRvIHRoaXMgYnV0dG9uIFxyXG4gICAgICAgICAqIGlucHV0cy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExldHMgdXNlcnMgYWRkIHRoZSBzYW1lIGNsYXNzZXMgdG8gYWxsIGJ1dHRvbnMganVzdCBpbiBcclxuICAgICAqIGNhc2UgYnV0dG9ucyBzaGFyZSBhIHNwZWNpZmljIGNsYXNzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBIVE1MIGZvciBldmVyeSBidXR0b25zIGRlZmluZWQgaW4gdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIFxyXG4gICAgICogYXR0YWNoZXMgdGhlIGVycm9yIG1lc3NhZ2VzIGF0dGFjaGVkIHRvIHRoaXMgaW5wdXQuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYnV0dG9uQ2xhc3NlcyA9ICdidXR0b24tY2xhc3MnO1xyXG4gICAgICogYnV0dG9ucyA9IFt7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiQnV0dG9uIDFcIixcclxuICAgICAqICAgIGF0dHJIVE1MIDogXCJkaXNhYmxlZFwiLFxyXG4gICAgICogICAgY2xhc3NlcyA6IFwiY2xhc3MtMVwiXHJcbiAgICAgKiB9LHtcclxuICAgICAqICAgIGxhYmVsIDogXCI8aDE+QnV0dG9uIDI8L2gxPlwiLFxyXG4gICAgICogICAgY2xhc3NlcyBcIiBjbGFzcy0yXCJcclxuICAgICAqIH1dO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBXaWxsIHJlbmRlcjpcclxuICAgICAqIFxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1jbGFzcyBjbGFzcy0xXCIgZGlzYWJsZWQ+QnV0dG9uIDE8L2J1dHRvbj5cclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24gY2xhc3MgY2xhc3MtMlwiPjxoMT5CdXR0b24gMjwvaDE+PC9idXR0b24+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzOiBlcnJvckNsYXNzID0ge30sIGJ1dHRvbnMgPSBbXSwgaW5wdXQgPSB7fSwgYnV0dG9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMgPSB7fSwgZXJyb3JzID0ge30sIG1lc3NhZ2VzID0ge30gfSA9IGVycm9yQ2xhc3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2Vycm9yc1trZXldfWAsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhidXR0b25FcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MID0gJycsIHNob3dMYWJlbCA9IGZhbHNlLCBpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgYnV0dG9uc0hUTUwgPSBidXR0b25zLnJlZHVjZSgoaHRtbCwgYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9IFwiXCIgfSA9IGJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfSBcclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gJHthdHRySFRNTH0gY2xhc3M9XCIke2NsYXNzZXN9ICR7YnV0dG9uQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmICgobGFiZWxIVE1MLmxlbmd0aCA+IDAgfHwgbGFiZWwubGVuZ3RoID4gMCkgJiYgc2hvd0xhYmVsKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbEhUTUx9PC9sYWJlbD5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgJHtsYWJlbEhUTUx9XHJcbiAgICAgICAgICAgICAke2J1dHRvbnNIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VzfSAgICAgICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y2VzIGh0bWwgdG8gYnVpbGQgYSBjaGVja2JveCBpbnB1dCBmb3IgdGhlICBcclxuICogdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSBjaGVja2JveCdzIHNldHRpbmdzIGZyb20gYSBzdGFuZGFyZCBpbnB1dCBkYXRhIFxyXG4gICAgICogb2JqZWN0IGFuZCBzZXRzIHRoZSB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHJlbmRlciBpZiB0aGUgY2hlY2tib3ggaXNuJ3QgdmFsaWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9iaiAtIGNvbnRhaW5zIGFsbCB0aGUgY29uZmlndXJhdGlvbnMgXHJcbiAgICAgKiB0byByZW5kZXIgdGhpcyBpbnB1dC5cclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGVycm9yTWVzc2FnZXMgLSBhIGNsYXNzIHRoYXQgd2lsbCByZW5kZXIgdGhlIFxyXG4gICAgICogc3BlY2lmaWMgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyBiYXNlZCBvbiB0aGlzIFVJJ3Mgc2V0dGluZ3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgdGFncyA9ICcnLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBjaGVja2JveCdzIGlucHV0IGNvbmZpZ3VyYXRpb24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFueSBjdXN0b20gdGFncyBwYXNzZWQgZG93biBmcm9tIHRoZSByZW5kZXJpbmcgbGlicmFyeS4gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyB3aG9sZSBpbnB1dCBpbmNsdWRpbmcgdGhlIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGNsYXNzIG9mIGVycm9ycyBjcmVhdGVkIGJ5IHRoZSByZW5kZXJpbmcgbGlicmFyeSB0byBcclxuICAgICAgICAgKiBoaWRlIGFuZCBzaG93IHZhcmlvdXMgZXJyb3JzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBVSSdzIHJlbmRlcmluZyBvZiB0aGlzIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlZmF1bHQgY2xhc3MgdG8gdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgVUkgc3BlY2lmaWMgYXR0cmlidXRlc1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlZCBmb3IgdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIHRvIGJlIHVzZWQgYW5kIHJlbmRlcmVkIHByb3Blcmx5LlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgc3RyaW5nIG9mIGFsbCBhdHRyaWJ1dGVzIHRvIGxvYWQgXHJcbiAgICAgKiB0aGlzIGlucHV0IGluY2x1ZGluZyBpdHMgaWQsIG5hbWUgYW5kIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGdldCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCJgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBmcm9tIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIFxyXG4gICAgICogYW5kIGNsYXNzZXMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdWlDbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBpbnB1dC5jbGFzc2VzID0gXCJjbGFzcy0yXCI7XHJcbiAgICAgKiByZXF1aXJlZEF0dHJpYnV0ZXMgPSBcImlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCdcIlxyXG4gICAgICogLy8gUmVuZGVycyBUbzpcclxuICAgICAqIDxsYWJlbCBjbGFzcz1cImNsYXNzLTEgY2xhc3MtMlwiPlxyXG4gICAgICogICAgIDxpbnB1dCBpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBodG1sIG9mIHRoZSBmdWxseSBjcmVhdGVkIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5nc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCIgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgIDxpbnB1dCAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIGFuZCByZW5kZXJzIGFsbCB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzLCBpbnB1dCwgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBsYWJlbCA9ICcnIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBtZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKG1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxDbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBsZXQgYWxsQXR0cmlidXRlcyA9IGAke3JlcXVpcmVkQXR0cmlidXRlc30gJHt1aUF0dHJpYnV0ZXN9ICR7dGFnc30gJHtlcnJvclRhZ3N9YFxyXG4gICAgICAgIGxldCBjaGVja2JveEhUTUwgPSB0aGlzLnJlbmRlckNoZWNrYm94Q29udGFpbmVyKGFsbENsYXNzZXMsIGFsbEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAke2NoZWNrYm94SFRNTH1cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZSBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGRhdGUgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGUgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZSBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBEYXRlLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5nczsgICAgICAgIFxyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRlXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRldGltZSBsb2NhbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgd2l0aCB0aW1lc3RhbXAgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgKiBtZXNzYWdlc1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJveFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGV0aW1lLWxvY2FsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICogXHJcbiAgICAqIEBleGFtcGxlIFxyXG4gICAgKiAvL0RhdGEgXHJcbiAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICogRGF0ZXRpbWVMb2NhbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICogLy8gUmVuZGVycyBcclxuICAgICogPGxhYmVsPlxyXG4gICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAqIDwvbGFiZWw+XHJcbiAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZW1haWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBlbWFpbHMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGVtYWlsIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZW1haWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhbiBlbWFpbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBFbWFpbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJlbWFpbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZm9ybSB3cmFwcGVyIGFyb3VuZCB0aGVzZSBpbnB1dHMgYW5kIGEgXHJcbiAqIHN1Ym1pdCBidXR0b24gdG8gc3VibWl0IHRoZSBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgdmFyaW91cyBkYXRhIHRvIHJlbmRlciB0aGlzIGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBpbnB1dEhUTUwgLSBBbGwgaW5wdXQgZGF0YSB0byBiZSBhZGRlZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxBdHRySFRNTCAtIEF0dHJpYnV0ZXMgdGhhdCBuZWVkIHRvIGJlIFxyXG4gICAgICogYWRkZWQgdG8gdGhlIGZvcm0gcHJpbWFyaWx5IHVzZWQgZm9yIHZhbGlkYXRpb24gYW5kIHN1Ym1pdCBmdW5jdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2V0dGluZ3MgLSBHbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZm9ybS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBzdHlsZSA9IFN0eWxlKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBpbnB1dCBodG1sIGluZm9ybWF0aW9uIGZvciB0aGlzIFxyXG4gICAgICAgICAqIGZvcm1cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXRIVE1MID0gaW5wdXRIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYW1lIGZvciB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRpdGlvbmFsIHRhZ3MgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbEF0dHJIVE1MID0gYWRkaXRpb25hbEF0dHJIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBlbnRpcmUgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgc3VibWl0IGJ1dHRvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3VibWl0ID0gc2V0dGluZ3Muc3VibWl0O1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgc3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBkZWZhdWx0IFVJIGNsYXNzZXMgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBmb3JtQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3JvdydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgdG8gcmVuZGVyIHRoZSBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBGb3JtLnNldHRpbmdzID0ge1xyXG4gICAgICogICAgIHN1Ym1pdCA6IHtcclxuICAgICAqICAgICAgICAgbGFiZWwgOiBcIk15IG5ldyBzdWJtaXQgbGFiZWxcIixcclxuICAgICAqICAgICAgICAgaW5wdXQgOiB7XHJcbiAgICAgKiAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1pbnB1dFwiXHJcbiAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgKiAgICAgICAgIGNvbnRhaW5lciA6IHtcclxuICAgICAqICAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1jb250YWluZXJcIlxyXG4gICAgICogICAgICAgICB9XHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfTtcclxuICAgICAqIFxyXG4gICAgICogLy9XaWxsIFJlbmRlciBcclxuICAgICAqIFxyXG4gICAgICogPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xIG15LXN1Ym1pdC1jb250YWluZXJcIj5cclxuICAgICAqICAgICA8YnV0dG9uIGNsYXNzPVwibXktc3VibWl0LWlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICogICAgICAgICAgTXkgbmV3IHN1Ym1pdCBsYWJlbCBcclxuICAgICAqICAgICA8L2J1dHRvbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgJHtzdWJtaXRDb250YWluZXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiJHtzdWJtaXRJbnB1dENsYXNzZXN9XCIgdHlwZT0nc3VibWl0JyAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgZWFjaCBpbnB1dCdzIGh0bWwgaW50byBhIGNvbnRhaW5lciBzbyB0aGV5IGNhbiBiZSBmb3JtYXR0ZWQgY29ycmVjdGx5XHJcbiAgICAgKiB1dGlsaXppbmcgdGhlIGl2eGpzLmNzcydzIGdyaWQgc3lzdGVtLlxyXG4gICAgICogQHR5cGV7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIGZvcm1DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fSwgY2xhc3NlczogY29uZmlnRm9ybUNsYXNzZXMgPSAnJywgaWQgOiBmb3JtSWQsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmICghc2V0dGluZ3MuaGlkZVN1Ym1pdCkge1xyXG4gICAgICAgICAgICBpbnB1dEhUTUwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc3VibWl0LFxyXG4gICAgICAgICAgICAgICAgaHRtbDogdGhpcy5zdWJtaXRCdXR0b25IVE1MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gdGhpcy5zdHlsZS5hZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCIke2Zvcm1JZH0tZm9ybVwiIGNsYXNzPVwiJHtmb3JtQ2xhc3Nlc30gJHtjb25maWdGb3JtQ2xhc3Nlc31cIiBub3ZhbGlkYXRlIG5hbWU9XCIke25hbWV9XCIgJHthZGRpdGlvbmFsQXR0ckhUTUx9PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR7Y29udGVudHN9XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEluZGljYXRlcyBlcnJvcnMgZm9yIGVhY2ggaW5wdXQgYmFzZWQgb24gdGhlIFxyXG4gKiBhdHRyaWJ1dGVzIGNyZWF0ZWQgZnJvbSB0aGUgdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzXHJcbiAqIGlWWGpzIHVzZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJpbmdzIGluIGFsbCB0aGUgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKiB0aGlzIGlucHV0IGNhbiBwcm9kdWNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBlcnJvck1lc3NhZ2VzIC0gbGlzdCBvZiBhbGwgcG9zc2libGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyB3aXRoIGF0dHJpYnV0ZXMgaW5kaWNhdGluZyB0aGUgbWVzc2FnZSBcclxuICAgICAqIGFuZCB0aGUgY29uZGl0aW9ucyBpbiB3aGljaCB0byBzaG93IHRoZW0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaXN0IG9mIGFsbCBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjbGFzc2VzIGZvciB0aGUgZXJyb3IgbWVzc2FnZSBkaXYuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGNsYXNzZXMgZm9yIHRoZSBjb250YWluZXIgb2YgYWxsIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciBhbGwgZXJyb3IgbWVzc2FnZXMgYW5kIHRoZSBjb250YWluZXIgd2l0aCBcclxuICAgICAqIHRoZW0uIFJlc3VsdHM6XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VzXCI+XHJcbiAgICAgKiAgICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5NRVNTQUdFPC9zcGFuPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yTWVzc2FnZXMsIG1lc3NhZ2VDbGFzc2VzLCBjb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZUhUTUwgPSBlcnJvck1lc3NhZ2VzLnJlZHVjZSgoZXJyb3JNZXNzYWdlSFRNTCwgZXJyb3JNZXNzYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlSFRNTH08c3BhbiBjbGFzcz1cIiR7bWVzc2FnZUNsYXNzZXN9XCIgJHtlcnJvck1lc3NhZ2UuYXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+YFxyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZUhUTUwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9JyR7Y29udGFpbmVyQ2xhc3Nlc30nPlxyXG4gICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VIVE1MfVxyXG4gICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG51bWJlciBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIG51bWJlcnMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTnVtYmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBudW1iZXIgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIE51bWJlci51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgKiAgICAgXCJzdGVwXCIgOiBcIjAuMVwiXHJcbiAgICAgKiB9XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBzdGVwPVwiMC4xXCIgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJudW1iZXJcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cIm51bWJlclwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIGRlZmF1bHREaXNwbGF5ID0gJycsIHNldHRpbmdzID0ge30sIHRhZ3MgPSAnJywgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgICAgICAgJHtkZWZhdWx0T3B0aW9uVGFnfVxyXG4gICAgICAgICAgICAgICAgICAke29wdGlvbnNIVE1MfVxyXG4gICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpb0lucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgcmFkaW9zID0gW10sIGVycm9ycyA9IHt9LCBzZXR0aW5ncyA9IHt9fSA9IHJhZGlvSW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaW9zID0gcmFkaW9zO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9Hcm91cChyYWRpb3NIVE1MKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlvc0hUTUw7XHJcbiAgICB9O1xyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMsIHZhbHVlID0gXCJcIikge1xyXG4gICAgICAgIGxldCB7aWR9ID0gdGhpcy5pbnB1dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nK3ZhbHVlOiAnJ31cIiBjbGFzcz1cIiR7dWlDbGFzc2VzfVwiPlxyXG4gICAgICAgICR7cmFkaW9IVE1MfVxyXG4gICAgICAgIDwvbGFiZWw+YDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgJHtsYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcnMsIHJhZGlvcywgc2V0dGluZ3MsIGlucHV0LCB1aUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzLCB0YWdzOiBlcnJvclRhZ3MgPSBcIlwifSA9IGVycm9ycztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogaW5wdXRMYWJlbCwgbGFiZWxIVE1MOiBpbnB1dExhYmxlSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRMYWJsZUhUTUwpIGlucHV0TGFiZWwgPSBpbnB1dExhYmxlSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IHJhZGlvc0hUTUwgPSByYWRpb3MucmVkdWNlKChodG1sLCByYWRpbywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9ICcnLCB2YWx1ZX0gPSByYWRpbztcclxuXHJcbiAgICAgICAgICAgIGF0dHJIVE1MID0gYCR7YXR0ckhUTUx9ICR7ZXJyb3JUYWdzfWA7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmFkaW9IVE1MID0gc2VsZi5yZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCBpbnB1dC5yYWRpb0J1dHRvbnNbaW5kZXhdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfVxyXG4gICAgICAgICAgICAke3NlbGYudWlSYWRpb0J1dHRvbkNvbnRhaW5lcihyYWRpb0hUTUwsIGAke3VpQ2xhc3Nlc30gJHtjbGFzc2VzfWAsIGlucHV0LnJhZGlvQnV0dG9uc1tpbmRleF0udmFsdWUpfWA7XHJcbiAgICAgICAgfSwgaW5wdXRMYWJlbCk7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgYWxsUmFkaW9CdXR0b25zSFRNTCA9IGBcclxuICAgICAgICAgICAgICR7cmFkaW9zSFRNTH1cclxuICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVpUmFkaW9Hcm91cChhbGxSYWRpb0J1dHRvbnNIVE1MKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGZvcm1TZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtU2VjdGlvbiA9IGZvcm1TZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Zvcm1TZWN0aW9uLCBkYXRhLCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcywgZGVmYXVsdEhlYWRlckNsYXNzZXMsIGRlZmF1bHRTZWN0aW9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge319ID0gZGF0YTtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGA8aDE+JHtkYXRhLm5hbWV9PC9oMT5gfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHNlY3Rpb25DbGFzc2VzID0gJycgfSA9IHNlY3Rpb247XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWw6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiJHtzZWN0aW9uQ2xhc3Nlc30gJHtkZWZhdWx0U2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHtkZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAke2Zvcm1TZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc30gJHtkZWZhdWx0Rm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gJy4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzJztcblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgbGlua1NlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5saW5rU2VjdGlvbiA9IGxpbmtTZWN0aW9uXG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRGb290ZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHtkYXRhLCBsaW5rU2VjdGlvbiwgZGVmYXVsdEZvb3RlckNsYXNzZXMsIGRlZmF1bHRIZWFkZXJDbGFzc2VzLCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMsIGRlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3Nlc30gPSB0aGlzO1xuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9LCBsaW5rQ29udGFpbmVyID0ge319ID0gZGF0YTtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgYH0gPSBoZWFkZXI7XG4gICAgICAgIGxldCB7Y2xhc3Nlczogc2VjdGlvbkNsYXNzZXMgPSAnJ30gPSBzZWN0aW9uO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBsaW5rQ29udGFpbmVyQ2xhc3NlcyA9ICcnLCBhdHRyaWJ1dGVzOiBsaW5rQ29udGFpbmVyQXR0cmlidXRlcyA9IHt9fSA9IGxpbmtDb250YWluZXI7XG4gICAgICAgIGxldCBsaW5rQ29udGFpbmVyQXR0cmlidXRlSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGxpbmtDb250YWluZXJBdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhsaW5rQ29udGFpbmVyQXR0cmlidXRlcykpLmh0bWw7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiJHtzZWN0aW9uQ2xhc3Nlc30gJHtkZWZhdWx0U2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XG4gICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7ZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPScke2RlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3Nlc30gJHtsaW5rQ29udGFpbmVyQ2xhc3Nlc30nICR7bGlua0NvbnRhaW5lckF0dHJpYnV0ZUhUTUx9PlxuICAgICAgICAgICAgICAgICAgICAke2xpbmtTZWN0aW9ufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9ICR7ZGVmYXVsdEZvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgZ2V0V2lkdGgod2lkdGgpIHtcclxuICAgICAgICBpZiAod2lkdGggPT09ICcxJykgcmV0dXJuICdpdnhqcy1ncmlkLTEtMSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGdyaWRTdHJpbmcgPSB3aWR0aC5yZXBsYWNlKCcvJywgJy0nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBpdnhqcy1ncmlkLSR7Z3JpZFN0cmluZ31gO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnaW5wdXQtY29udGFpbmVyJztcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRzSFRNTCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge2NvbnRhaW5lckNsYXNzZXMgPSAnJ30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0c0hUTUwucmVkdWNlKChjdXJyZW50SFRNTCwgaW5wdXRIVE1MKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7aHRtbCwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dEhUTUw7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSAnMScsIGNvbnRhaW5lcj17fX0gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IHtjbGFzc2VzPScnfSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke2NvbnRhaW5lckNsYXNzZXN9YFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoaXNXaWR0aCA9IHNlbGYuZ2V0V2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcIml2eGpzLWdyaWQtMS0xXCIsIGAke3RoaXNXaWR0aH0gJHtjbGFzc2VzfWApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRIVE1MfSAke2h0bWx9YDtcclxuICAgICAgICB9LCAnJylcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidGV4dFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGFiZWwgPSBzaG93TGFiZWwgPyBsYWJlbCA6ICcnO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICR7dWlBdHRyaWJ1dGVzfSAgICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sc2V0dGluZ3MgPSB7fSx0YWdzID0ge30sZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpe1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OmlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bWVzc2FnZXMgOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXMgOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFncyA6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9ICR7dWlDbGFzc2VzfVwiICR7dWlBdHRyaWJ1dGVzfSAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJ1cmxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb250cm9sc30gZnJvbSAnLi4vLi4vdmlkZW8vY29udHJvbHMvaW5kZXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9scyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNvbnRhaW5lci5odG1sIGluc3RhbmNlb2YgRnVuY3Rpb24pe1xyXG4gICAgICAgICAgICBjb250YWluZXIuaHRtbCh0aGlzLmh0bWwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLmh0bWw7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcyxcclxuICAgICAgICAgICAgdG90YWxUaW1lSW5mb0NsYXNzZXMsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lSW5mb0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHNjcnViQmFyQ2xhc3NlcyxcclxuICAgICAgICAgICAgbXV0ZUNvbnRyb2xzQ2xhc3NlcyxcclxuICAgICAgICAgICAgdm9sdW1lQmFyQ2xhc3NlcyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMucGxheVBhdXNlQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIik7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJbmZvID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIpO1xyXG4gICAgICAgIHRoaXMuc2NydWJCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiKTtcclxuICAgICAgICB0aGlzLm11dGVDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiKTtcclxuICAgICAgICB0aGlzLnZvbHVtZUJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiKTtcclxuICAgICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAncGxheS1wYXVzZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB0b3RhbFRpbWVJbmZvQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZHVyYXRpb24nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY3VycmVudFRpbWVJbmZvQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnY3VycmVudC10aW1lJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHNjcnViQmFyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnc2NydWItYmFyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG11dGVDb250cm9sc0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ211dGUnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd2b2x1bWUtYmFyJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBsYXknO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGF1c2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS1wYXVzZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1bm11dGVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS12b2x1bWUtdXAnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS1vZmYnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIGB0aW1lLWxhcHNlZGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXZvbHVtZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5UGF1c2VCdXR0b25IVE1MKCl7XHJcbiAgICAgICAgbGV0IHtwbGF5Q2xhc3NlcyA6IHBsYXl9ID0gdGhpcztcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcyA6IHBsYXlQYXVzZUNvbnRyb2xzfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiIGNsYXNzPVwiJHtwbGF5UGF1c2VDb250cm9sc31cIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9JyR7cGxheX0nPjwvaT5cclxuICAgICAgICA8L2J1dHRvbj5gXHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIGdldCBzY3J1YkJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiIGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB0aW1lc3RhbXBIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLWN1cnJlbnQtdGltZVwiIGNsYXNzPVwiJHt0aGlzLmN1cnJlbnRUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiIGNsYXNzPVwiJHt0aGlzLnRvdGFsVGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3VubXV0ZUNsYXNzZXMgOiB1bm11dGUsIG11dGVDb250cm9sc0NsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiIGNsYXNzPVwiJHttdXRlQ29udHJvbHNDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIke3VubXV0ZX1cIj48L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2ICBpZD1cInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBwbGF5UGF1c2VCdXR0b25IVE1MLFxyXG4gICAgICAgICAgICBzY3J1YkJhckhUTUwsXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcEhUTUwsXHJcbiAgICAgICAgICAgIG11dGVCdXR0b25IVE1MLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJIVE1MXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAke3BsYXlQYXVzZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgICAgJHt0aW1lc3RhbXBIVE1MfVxyXG4gICAgICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgICAgJHt2b2x1bWVCYXJIVE1MfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBbmNob3IgYXMgRGVmYXVsdEFuY2hvciB9IGZyb20gJy4uL2RlZmF1bHQvYW5jaG9yLmpzJztcblxuZXhwb3J0IGNsYXNzIEFuY2hvciBleHRlbmRzIERlZmF1bHRBbmNob3J7XG5cdGNvbnN0cnVjdG9yKGFuY2hvckluZm8pe1xuXHRcdHN1cGVyKGFuY2hvckluZm8pO1xuXHR9XG59IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcblxyXG5jbGFzcyBDYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanNBY3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHtzZXR0aW5ncyA9IHt9fSA9ICRzY29wZTtcclxuICAgICAgICBsZXQge2ltZyA9ICcnLHRpdGxlID0gJycsZmlyc3ROYW1lID0gJycsZGVzY3JpcHRpb24gPSAnJyxldmVudHMgPSBbXX0gPSBzZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmltZyA9IGltZztcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uUHJlc3NlZCA9ICAoKSA9PntcclxuICAgICAgICAgICAgaVZYanNBY3Rpb25zLnJlc29sdmVBY3Rpb25zKGV2ZW50cywgKCkgPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkNhcmQuJGluamVjdCA9IFsnJHNjb3BlJywnaXZ4anMuYWN0aW9ucyddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKENhcmQpIiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcbmltcG9ydCB7IElucHV0Q29udHJvbGxlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2lucHV0LWNvbnRyb2xsZXIuanMnO1xyXG5cclxuY2xhc3MgRHJvcGRvd25JbnB1dENvbnRyb2xsZXIgZXh0ZW5kcyBJbnB1dENvbnRyb2xsZXJIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkZWxlbWVudCwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtkZWZhdWx0VmFsdWUsIG9wdGlvbnMsIG5hbWUsIHNldHRpbmdzID0ge319ID0gJHNjb3BlLmlucHV0RGF0YTtcclxuICAgICAgICBsZXQge2Ryb3Bkb3duID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttdWx0aXBsZSA9IGZhbHNlfSA9IGRyb3Bkb3duO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICFtdWx0aXBsZSA/IHtcclxuICAgICAgICAgICAgdmFsdWUgOiBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV0gPyBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV0gOiAnJ1xyXG4gICAgICAgIH0gOiBbe1xyXG4gICAgICAgICAgICB2YWx1ZTogaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdID8gaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdIDogJydcclxuICAgICAgICB9XTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7IFxyXG4gICAgICAgICAgICBsZXQge25hbWUsIG9uQ2hhbmdlID0gW119ID0gJHNjb3BlLmlucHV0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWxlY3RlZC5yZWR1Y2UoKHNlbGVjdGVkVmFscywgY3VycmVudFZhbCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RlZFZhbHMubGVuZ3RoIDw9IDApIHJldHVybiBgJHtjdXJyZW50VmFsLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3NlbGVjdGVkVmFsc30sICR7Y3VycmVudFZhbC52YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICB9LCAnJyk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvbkNoYW5nZS51bnNoaWZ0KHsgZXZlbnROYW1lOiAnc2V0RGF0YScsIGFyZ3M6IHsga2V5OiBuYW1lLCB2YWx1ZTogdmFsdWUudmFsdWUgfSB9KTtcclxuICAgICAgICAgICAgaVZYanNBY3Rpb25zLnJlc29sdmVBY3Rpb25zKG9uQ2hhbmdlLCAoKSA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5Ecm9wZG93bklucHV0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnaVZYanMnLCAnaXZ4anMuYWN0aW9ucyddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKERyb3Bkb3duSW5wdXRDb250cm9sbGVyKTsiLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcclxuaW1wb3J0IENhcmRFbGVtZW50Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9lbGVtZW50LmNhcmQuanMnO1xyXG5pbXBvcnQge0NhcmRUZW1wbGF0ZXN9IGZyb20gJy4uLy4uL2NhcmQuanMnO1xyXG5cclxuY2xhc3MgQ2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigkY29tcGlsZSwgJHRpbWVvdXQpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZUhUTUw7XHJcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXml2eGpzRm9ybUlucHV0XCI7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcclxuICAgICAgICAgICAgc2V0dGluZ3M6ICc9c2V0dGluZ3MnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENhcmRFbGVtZW50Q29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IHsgc2V0dGluZ3MgPSB7fSB9ID0gJHNjb3BlOyBcclxuICAgICAgICAgICAgbGV0IHtjYXJkVHlwZSxjbGFzc2VzID0gXCJcIn0gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBuZXcgQ2FyZFRlbXBsYXRlcygkc2NvcGUuc2V0dGluZ3MpW2NhcmRUeXBlICsgXCJDYXJkSFRNTFwiXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgIGlFbG0uaHRtbChodG1sKTtcclxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3BlY2lhbC5jYXJkcyAuaW1hZ2UnKS5kaW1tZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uOiAnaG92ZXInXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRlbXBsYXRlSFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ7e2NsYXNzZXN9fVwiPjwvZGl2PmA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5DYXJkLiRpbmplY3QgPSBbJyRjb21waWxlJywgJyR0aW1lb3V0J107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oQ2FyZCk7IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBEcm9wZG93bklucHV0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9pbnB1dC5kcm9wZG93bi5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyc7XHJcblxyXG5jbGFzcyBEcm9wZG93bklucHV0IHtcclxuICAgIGNvbnN0cnVjdG9yKCRyb290U2NvcGUsICRjb21waWxlLCAkZmlsdGVyLCAkdGltZW91dCwgaVZYanMsIGlWWGpzVUlNb2R1bGUsIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVIVE1MO1xyXG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0aGlzLnJlcXVpcmUgPSBcIl5pdnhqc0Zvcm1JbnB1dFwiO1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGlucHV0RGF0YTogJz1pbnB1dERhdGEnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEcm9wZG93bklucHV0Q29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtpbnB1dERhdGE6IGlucHV0fSA9ICRzY29wZTtcclxuICAgICAgICAgICAgbGV0IHtpZCwgZXJyb3JzID0ge30sIG5hbWUsIGxhYmVsSFRNTCwgbGFiZWwgPSAkZmlsdGVyKCdzdHJpbmdQYXJzZXJzJykoJ3N0YXJ0Q2FzZScsIGlkKSwgYXR0cmlidXRlcyA9IHt9LCBvcHRpb25zLCBkZWZhdWx0RGlzcGxheSwgZGVmYXVsdFZhbHVlLCBzZXR0aW5ncyA9IHt9fSA9IGlucHV0O1xyXG4gICAgICAgICAgICBsZXQge2RpcmVjdGl2ZXMgPSAnJ30gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBuZXcgRXJyb3JNZXNzYWdlcyhuYW1lLCBlcnJvcnMsIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0YWdIVE1MID0gYCR7ZGlyZWN0aXZlc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2hhbmdlPSd2bS5vbkNoYW5nZSh2bS5zZWxlY3RlZCknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW9wdGlvbnM9XCJvcHRpb24uZGlzcGxheSBmb3Igb3B0aW9uIGluIGlucHV0RGF0YS5vcHRpb25zIHRyYWNrIGJ5IG9wdGlvbi52YWx1ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD0ndm0uc2VsZWN0ZWQnYDtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5yZXF1aXJlZCB8fCBkZWZhdWx0RGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7ZGVmYXVsdERpc3BsYXl9PC9vcHRpb24+YCA6XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnNDbGFzcyA9IG5ldyBpVlhqc1VJTW9kdWxlLmRyb3Bkb3duKGlkLCBuYW1lLCBsYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsLCBkZWZhdWx0RGlzcGxheSwgc2V0dGluZ3MsIHRhZ0hUTUwsIGVycm9yTWVzc2FnZXMpO1xyXG5cclxuICAgICAgICAgICAgaUVsbS5odG1sKG9wdGlvbnNDbGFzcy5odG1sKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjb21waWxlKGlFbG0uY29udGVudHMoKSkoJHNjb3BlKTtcclxuICAgICAgICAgICAgJChpRWxtLmZpbmQoJ3NlbGVjdCcpKS5kcm9wZG93bigpO1xyXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhwZXJpZW5jZVZhbHVlID0gaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgJChpRWxtLmZpbmQoJ3NlbGVjdCcpKS5kcm9wZG93bignc2V0IHNlbGVjdGVkJywgZXhwZXJpZW5jZVZhbHVlID8gZXhwZXJpZW5jZVZhbHVlICA6JycpO1xyXG5cclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGVtcGxhdGVIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdj48L2Rpdj5gXHJcbiAgICB9O1xyXG59XHJcblxyXG5Ecm9wZG93bklucHV0LiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnLCAnJGZpbHRlcicsICckdGltZW91dCcsICdpVlhqcycsICdpdnhqcy5tb2R1bGVzLnVpJywgJ2l2eGpzLmJ1cyddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKERyb3Bkb3duSW5wdXQpOyIsImltcG9ydCB7IEJ1dHRvbnMgYXMgRGVmYXVsdEJ1dHRvbnMgfSBmcm9tICcuLi9kZWZhdWx0L2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIGV4dGVuZHMgRGVmYXVsdEJ1dHRvbnMge1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucywgaW5wdXREYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoYnV0dG9ucywgaW5wdXREYXRhLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGJ1dHRvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBidXR0b24nO1xyXG4gICAgfVxyXG5cclxufTsiLCJleHBvcnQgY2xhc3MgQ2FyZFRlbXBsYXRlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluaUNhcmRIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpIGNhcmRzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInJpZ2h0IGZsb2F0ZWQgbWluaSB1aSBpbWFnZVwiIHNyYz1cInt7dm0uaW1nfX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3ZtLmZpcnN0TmFtZX19IHt7dm0ubGFzdE5hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWV0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3ZtLnRpdGxlfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3t2bS5kZXNjcmlwdGlvbn19XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXh0cmEgY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpIG9uZSBidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1jbGljaz1cInZtLmJ1dHRvblByZXNzZWQoKVwiIGNsYXNzPVwidWkgYnV0dG9uXCI+QnV5IGl0PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpbW1lckNhcmRIVE1MKCkge1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlc30gPSB0aGlzLnNldHRpbmdzO1xyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBzcGVjaWFsIGNhcmRzXCI+ICBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJibHVycmluZyBkaW1tYWJsZSBpbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpIGRpbW1lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XCJ2bS5idXR0b25QcmVzc2VkKClcIiBjbGFzcz1cInVpIGludmVydGVkIGJ1dHRvblwiPkJ1eSB0aGlzITwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGltZyBuZy1zcmM9XCJ7e3ZtLmltZ319XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJoZWFkZXJcIj57e3ZtLmZpcnN0TmFtZX19IHt7dm0ubGFzdE5hbWV9fTwvYT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGE+e3t2bS50aXRsZX19PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3ZtLmRlc2NyaXB0aW9ufX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgQ2hlY2tib3ggYXMgRGVmYXVsdENoZWNrYm94IH0gZnJvbSAnLi4vZGVmYXVsdC9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgRGVmYXVsdENoZWNrYm94IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBjaGVja2JveCdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwiJHtjbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgJHthdHRyaWJ1dGVzfSA+XHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpbnB1dC5pZH1cIj4gICAgXHJcbiAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICA8L2Rpdj5gXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRlIGFzIERlZmF1bHREYXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRlLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZSBleHRlbmRzIERlZmF1bHREYXRle1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBEYXRldGltZUxvY2FsIGFzIERlZmF1bHREYXRldGltZUxvY2FsIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwgZXh0ZW5kcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59OyIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyb3Bkb3duIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBsYWJlbCwgZGVmYXVsdERpc3BsYXksIHNldHRpbmdzID0ge30sIHRhZ0hUTUwsIGVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLnRhZ0hUTUwgPSB0YWdIVE1MO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGRyb3Bkb3duJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWUsIGxhYmVsLCBkZWZhdWx0RGlzcGxheSwgc2V0dGluZ3MsIHVpQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7ZHJvcGRvd24gPSBcIlwifSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bXVsdGlwbGUgPSBmYWxzZX0gPSBkcm9wZG93bjtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JNZXNzYWdlcztcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyBFcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9IG11bHRpcGxlPVwiXCJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbH08L2xhYmVsPiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0aGlzLnRhZ0hUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBFbWFpbCBhcyBEZWZhdWx0RW1haWwgfSBmcm9tICcuLi9kZWZhdWx0L2VtYWlsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWwgZXh0ZW5kcyBEZWZhdWx0RW1haWx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIGFzIERlZmF1bHRGb3JtIH0gZnJvbSAnLi4vZGVmYXVsdC9mb3JtLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgRGVmYXVsdEZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzKSB7XHJcbiAgICAgICBzdXBlcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIFN0eWxlKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZm9ybUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGZvcm0gZXJyb3InO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdWJtaXRCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge319ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsOiBzdWJtaXRMYWJlbCA9IFwiU3VibWl0XCIsIGxhYmVsSFRNTDogc3VibWl0TGFiZWxIVE1MLCBpbnB1dDogc3VibWl0SW5wdXQgPSB7fSwgY29udGFpbmVyOiBzdWJtaXRDb250YWluZXIgPSB7fSwgYXR0cmlidXRlcyA9ICcnfSA9IHN1Ym1pdDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdElucHV0Q2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0SW5wdXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRDb250YWluZXJDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRDb250YWluZXI7XHJcblxyXG4gICAgICAgIHN1Ym1pdExhYmVsID0gc3VibWl0TGFiZWxIVE1MID8gc3VibWl0TGFiZWxIVE1MIDogc3VibWl0TGFiZWw7XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXRIVE1MID0gc3VibWl0TGFiZWwubGVuZ3RoID49IDAgP1xyXG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInNpeHRlZW4gZmllbGQgd2lkZSAke3N1Ym1pdENvbnRhaW5lckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInVpIGJ1dHRvbiAke3N1Ym1pdElucHV0Q2xhc3Nlc31cIiB0eXBlPSdzdWJtaXQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3N1Ym1pdExhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxufTsiLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybS5qcyc7XHJcbmltcG9ydCB7IEFuY2hvciB9IGZyb20gJy4vYW5jaG9yLmpzJztcclxuaW1wb3J0IHsgQnV0dG9ucyB9IGZyb20gJy4vYnV0dG9ucy5qcyc7XHJcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAnLi9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IERhdGUgfSBmcm9tICcuL2RhdGUuanMnO1xyXG5pbXBvcnQgeyBEYXRldGltZUxvY2FsIH0gZnJvbSAnLi9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5qcyc7XHJcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IE51bWJlciB9IGZyb20gJy4vbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gXCIuL29wdGlvbnMuanNcIjtcclxuaW1wb3J0IHsgUmFkaW8gfSBmcm9tIFwiLi9yYWRpby5qc1wiO1xyXG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlLmpzXCI7XHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuL3RleHQuanMnO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBVcmwgfSBmcm9tICcuL3VybC5qcyc7XHJcblxyXG4vL0FuZ3VsYXJcclxuaW1wb3J0IGl2eGpzU2VtYW50aWNVaURyb3Bkb3duSW5wdXQgZnJvbSAnLi9hbmd1bGFyL2RpcmVjdGl2ZXMvaW5wdXQuZHJvcGRvd24uanMnO1xyXG5pbXBvcnQgaXZ4anNTZW1hbnRpY1VpQ2FyZCBmcm9tICcuL2FuZ3VsYXIvZGlyZWN0aXZlcy9lbGVtZW50LmNhcmQuanMnO1xyXG5cclxuLy9TdGF0ZXNcclxuaW1wb3J0IHsgSW5wdXRTdGF0ZSB9IGZyb20gJy4vc3RhdGUuaW5wdXQuanMnO1xyXG5pbXBvcnQgeyBWaWRlb1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS52aWRlby5qcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSB9IGZyb20gJy4vc3RhdGUubmF2aWdhdGlvbi5qcyc7XHJcblxyXG4vL0NvbnRyb2xzIFxyXG5pbXBvcnQgVmlkZW9Db250cm9scyBmcm9tICcuL3ZpZGVvLmNvbnRyb2xzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZW1hbnRpY1VJIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IEZvcm07XHJcbiAgICAgICAgdGhpcy5hbmNob3IgPSBBbmNob3I7XHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gQnV0dG9ucztcclxuICAgICAgICB0aGlzLmNoZWNrYm94ID0gQ2hlY2tib3g7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gRGF0ZTtcclxuICAgICAgICB0aGlzLmRhdGV0aW1lTG9jYWwgPSBEYXRldGltZUxvY2FsO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBFbWFpbDtcclxuICAgICAgICB0aGlzLm51bWJlciA9IE51bWJlcjtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPcHRpb25zO1xyXG4gICAgICAgIHRoaXMucmFkaW8gPSBSYWRpbzsgICAgXHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IFRleHQ7XHJcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IFRleHRhcmVhO1xyXG4gICAgICAgIHRoaXMudXJsID0gVXJsO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24gPSBEcm9wZG93bjtcclxuICAgICAgICB0aGlzLnZpZGVvQ29udHJvbHMgPSBWaWRlb0NvbnRyb2xzO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBpbnB1dCA6IElucHV0U3RhdGUsXHJcbiAgICAgICAgICAgIHZpZGVvIDogVmlkZW9TdGF0ZSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbiA6IE5hdmlnYXRpb25TdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuZ3VsYXIgPSB7XHJcbiAgICAgICAgICAgIGl2eGpzU2VtYW50aWNVaURyb3Bkb3duSW5wdXQgOiBpdnhqc1NlbWFudGljVWlEcm9wZG93bklucHV0LFxyXG4gICAgICAgICAgICBpdnhqc1NlbWFudGljVWlDYXJkIDogaXZ4anNTZW1hbnRpY1VpQ2FyZFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZVNlbWFudGljVUk7XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudWkuc2VtYW50aWMtdWknLCBpbml0aWFsaXplU2VtYW50aWNVSSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplU2VtYW50aWNVSSgpe1xyXG4gICAgcmV0dXJuIFNlbWFudGljVUlcclxufSIsImltcG9ydCB7IEVycm9yTWVzc2FnZXMgYXMgRGVmYXVsdEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi4vZGVmYXVsdC9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMgZXh0ZW5kcyBEZWZhdWx0RXJyb3JNZXNzYWdlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvck1lc3NhZ2VzID0gW10peyAgICAgICBcclxuICAgICAgIHN1cGVyKGVycm9yTWVzc2FnZXMpOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBlcnJvciBtZXNzYWdlJztcclxuICAgIH1cclxuICAgIFxyXG59OyIsImltcG9ydCB7IE51bWJlciBhcyBEZWZhdWx0TnVtYmVyIH0gZnJvbSAnLi4vZGVmYXVsdC9udW1iZXIuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBEZWZhdWx0TnVtYmVye1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07XHJcbiIsImltcG9ydCB7IE9wdGlvbnMgYXMgRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuLi9kZWZhdWx0L29wdGlvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIGV4dGVuZHMgRGVmYXVsdE9wdGlvbnN7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgZHJvcGRvd24nO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7UmFkaW8gYXMgRGVmYXVsdFJhZGlvfSBmcm9tICcuLi9kZWZhdWx0L3JhZGlvLmpzJztcclxuaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhZGlvIGV4dGVuZHMgRGVmYXVsdFJhZGlvIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoYXNDb3JyZWN0UmFkaW9DbGFzcyhjbGFzc2VzKXtcclxuICAgICAgICBsZXQgdmFsaWRSYWRpb0NsYXNzZXMgPSBbXHJcbiAgICAgICAgICAgIFwicmFkaW9cIiwgXCJ0b2dnbGVcIiwgXCJzbGlkZXJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGhhc1ZhbGlkQ2xhc3MgPSBmYWxzZTtcclxuICAgICAgICAgXHJcbiAgICAgICAgdmFsaWRSYWRpb0NsYXNzZXMuZm9yRWFjaCgodmFsaWRDbGFzcykgPT57XHJcbiAgICAgICAgICAgIGlmKGhhc1ZhbGlkQ2xhc3MpIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaGFzVmFsaWRDbGFzcyA9IChjbGFzc2VzLmluZGV4T2YodmFsaWRDbGFzcykgPj0gMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhhc1ZhbGlkQ2xhc3M7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgaXNWYWxpZFJhZGlvQ2xhc3MgPSB0aGlzLmhhc0NvcnJlY3RSYWRpb0NsYXNzKHVpQ2xhc3Nlcyk7XHJcbiAgICBcclxuICAgICAgICBpZighaXNWYWxpZFJhZGlvQ2xhc3MpIHVpQ2xhc3NlcyA9IGAke3VpQ2xhc3Nlc30gcmFkaW9gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWkgJHt1aUNsYXNzZXN9IGNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCB7aW5wdXR9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkfSA9IGlucHV0O1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgJHthdHRySFRNTH0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyt2YWx1ZTogJyd9XCI+ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgYDtcclxuICAgIH1cclxufSIsImltcG9ydCB7SW5wdXRTdGF0ZSBhcyBEZWZhdWx0SW5wdXRTdGF0ZX0gZnJvbSAnLi4vZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSBleHRlbmRzIERlZmF1bHRJbnB1dFN0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihoZWFkZXIsIGZvcm1TZWN0aW9uLCBmb290ZXIsIGRhdGEpe1xyXG4gICAgICAgIHN1cGVyKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGNvbnRhaW5lcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgaGVhZGVyJztcclxuICAgIH0gIFxyXG59OyIsImltcG9ydCB7TmF2aWdhdGlvblN0YXRlIGFzIERlZmF1bHROYXZpZ2F0aW9uU3RhdGV9IGZyb20gJy4uL2RlZmF1bHQvc3RhdGUubmF2aWdhdGlvbi5qcyc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGUgZXh0ZW5kcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlIHsgICAgIFxuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxpbmtTZWN0aW9uKXtcbiAgICAgICAgc3VwZXIoZGF0YSwgbGlua1NlY3Rpb24pO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCl7XG4gICAgICAgIHJldHVybiAndWkgY29udGFpbmVyJztcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCl7XG4gICAgICAgIHJldHVybiAndWkgaGVhZGVyJztcbiAgICB9XG59OyIsImV4cG9ydCBjbGFzcyBWaWRlb1N0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJTZWN0aW9uLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnBsYXllclNlY3Rpb24gPSBwbGF5ZXJTZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlQaG9uZUlubGluZUNsYXNzZXMoKXtcclxuICAgICAgICBsZXQge2lzSXBob25lID0gZmFsc2V9ID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNJcGhvbmUgPyAnaXBob25lLWlubGluZScgOiAnJzsgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBoZWFkZXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgaHRtbCgpIHsgICBcclxuICAgICAgICBsZXQge3BsYXllclNlY3Rpb24sIGRhdGEsIGlQaG9uZUlubGluZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9fSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYDxoMT4ke2RhdGEubmFtZX08L2gxPmB9ID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IHNlY3Rpb25DbGFzc2VzID0gJycgfSA9IHNlY3Rpb247XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sIDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInVpIGNvbnRhaW5lciAke3NlY3Rpb25DbGFzc2VzfSAke2lQaG9uZUlubGluZUNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke3RoaXMuZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgJHtwbGF5ZXJTZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xyXG4gICAgfVxyXG59OyIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5wdXRDb250YWluZXJDbGFzc05hbWVzKHNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncykgc2V0dGluZ3MgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IHtjb250YWluZXJDbGFzcyA9ICdmaWVsZCcsIGNsYXNzZXMgPSAnJ30gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2NvbnRhaW5lckNsYXNzfSAke2NsYXNzZXN9YDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aFRvdGFsID0gMC4wO1xyXG4gICAgICAgIGxldCBjb2x1bW5zID0ge3N0cmluZzogXCJ0d2VsdmVcIiwgbnVtYmVyOiAxMn07XHJcbiAgICAgICAgbGV0IGNvbHVtbk5hbWVzID0gW1wib25lXCIsIFwidHdvXCIsIFwidGhyZWVcIiwgXCJmb3VyXCIsIFwiZml2ZVwiLCBcInNpeFwiLCBcInNldmVuXCIsIFwiZWlnaHRcIiwgXCJuaW5lXCIgLFwidGVuXCIsIFwiZWxldmVuXCIsIFwidHdlbHZlXCIsIFwidGhpcnRlZW5cIiwgXCJmb3VydGVlblwiLCBcImZpZnRlZW5cIiwgXCJzaXh0ZWVuXCJdXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gaW5wdXRIVE1MLnJlZHVjZSgoY29udGVudEhUTUwsIHRoaXNJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2h0bWwsIHNldHRpbmdzfSA9IHRoaXNJbnB1dDtcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCA9IFwiMVwiLCBjb250YWluZXIgPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IHtjbGFzc2VzID0gJycgfSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgbGV0IG51bWVyaWNXaWR0aCA9IGdldE51bWVyaWNXaWR0aCh3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08ZGl2IGNsYXNzPVwic3RhY2thYmxlIGZpZWxkc1wiPiBgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRXaWR0aFRvdGFsICs9IG51bWVyaWNXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZW1hbnRpY1VJd2lkdGggPSBjb2x1bW5OYW1lc1tNYXRoLnJvdW5kKG51bWVyaWNXaWR0aCAqIGNvbHVtbk5hbWVzLmxlbmd0aCkgLSAxXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJ2l2eGpzLWdyaWQtMS0xJywgYCR7c2VtYW50aWNVSXdpZHRofSB3aWRlIGZpZWxkICR7Y2xhc3Nlc31gKTtcclxuICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH0ke2h0bWx9YDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGhUb3RhbCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SFRNTCA9IGAke2NvbnRlbnRIVE1MfTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50V2lkdGhUb3RhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50SFRNTDtcclxuICAgICAgICB9LCAnJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY29udGVudHMuc3Vic3RyaW5nKGNvbnRlbnRzLmxlbmd0aCAtIDcpICE9PSBcIjwvZGl2PlwiKXtcclxuICAgICAgICAgICAgY29udGVudHMgPSBgJHtjb250ZW50c308L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE51bWVyaWNXaWR0aCh3aWR0aFN0cmluZyl7XHJcbiAgICAgICAgICAgIGlmKHdpZHRoU3RyaW5nID09PSAnMScpIHJldHVybiAxO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhcnNlZFdpZHRoRm9ybXVsYSA9IHdpZHRoU3RyaW5nLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChwYXJzZWRXaWR0aEZvcm11bGFbMF0pIC8gcGFyc2VGbG9hdChwYXJzZWRXaWR0aEZvcm11bGFbMV0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59OyIsImltcG9ydCB7IFRleHQgYXMgRGVmYXVsdFRleHQgfSBmcm9tICcuLi9kZWZhdWx0L3RleHQuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgRGVmYXVsdFRleHR7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgeyBUZXh0YXJlYSBhcyBEZWZhdWx0VGV4dGFyZWEgfSBmcm9tICcuLi9kZWZhdWx0L3RleHRhcmVhLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBEZWZhdWx0VGV4dGFyZWF7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgeyBVcmwgYXMgRGVmYXVsdFVybCB9IGZyb20gJy4uL2RlZmF1bHQvdXJsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsIGV4dGVuZHMgRGVmYXVsdFVybHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59OyIsImltcG9ydCBEZWZhdWx0VmlkZW9Db250cm9scyBmcm9tICcuLi9kZWZhdWx0L3ZpZGVvLmNvbnRyb2xzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRGVmYXVsdFZpZGVvQ29udHJvbHMge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBpVlhqc0J1cykge1xyXG4gICAgICAgIHN1cGVyKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZHVyYXRpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3BsYXkgaWNvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhdXNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3BhdXNlIGljb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1bm11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndW5tdXRlIGljb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ211dGUgaWNvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VpIGljb24gYnV0dG9uIHBsYXktcGF1c2UnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndWkgaWNvbiBidXR0b24gbXV0ZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VpIHNtYWxsIHByb2dyZXNzJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYmFyYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiBgdWkgc21hbGwgcHJvZ3Jlc3NgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiBgYmFyYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1pbi13aWR0aDowXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdsYWJlbCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy50aW1lc3RhbXBIVE1MfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiIGNsYXNzPVwicHJvZ3Jlc3MgJHt0aGlzLnZvbHVtZUJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWluLXdpZHRoOjBcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VCdXR0b25IVE1MLCBzY3J1YkJhckhUTUwsIHRpbWVzdGFtcEhUTUwsIG11dGVCdXR0b25IVE1MLCB2b2x1bWVCYXJIVE1MfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgJHtwbGF5UGF1c2VCdXR0b25IVE1MfVxyXG4gICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgJHt2b2x1bWVCYXJIVE1MfWA7XHJcbiAgICB9XHJcbn07IiwiLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCB3aXRoIGF0dHJpYnV0ZXMgYW5kIGtleXMgaW50byBIVE1MXHJcbiAqIHRoYXQgaW5wdXRzIGNhbiBiZSB1c2VkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZVRhZ3Mge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFB1bGxzIGFsbCB0aGUgYXR0cmlidXRlIHNldHRpbmdzIGFuZCB0aGUgYXR0cmlidXRlcyBcclxuICAgICAqIHRvIGJlIHJlbmRlcmVkLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZURhdGEgLSBzZXR0aW5ncyBmb3IgYWxsIHRoZSBhdHRyaWJ1dGVzLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXR0cmlidXRlS2V5cyAtIGF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZURhdGEgPSB7fSwgYXR0cmlidXRlS2V5cyA9IFtdKXtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBbGwgYXR0cmlidXRlcyB0byBiZSBtYWRlLlxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5hdHRyaWJ1dGVEYXRhID0gYXR0cmlidXRlRGF0YTtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBdHRyaWJ1dGUgbmFtZXMgdG8gYmUgc2V0LlxyXG4gICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVLZXlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBhdHRyaWJ1dGVzIGJhc2VkIG9uIHRoZSBrZXlzIGFuZCBhdHRyaWJ1dGUgZGF0YS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhdHRyaWJ1dGVEYXRhID0geyByZXF1aXJlZCA9IFwidHJ1ZVwifTtcclxuICAgICAqIGF0dHJpYnV0ZUtleXMgPSBbXCJyZXF1aXJlZFwiXTtcclxuICAgICAqIFxyXG4gICAgICogLy8gQmVjb21lczogXHJcbiAgICAgKiBodG1sID0gJ3JlcXVpcmVkID0gXCJ0cnVlXCInXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVLZXlzLCBhdHRyaWJ1dGVEYXRhfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBhdHRyaWJ1dGVLZXlzLnJlZHVjZSggKGN1cnJlbnRBdHRyaWJ1dGVIVE1MLCBjdXJyZW50S2V5KSA9PntcclxuXHJcbiAgICAgICAgICAgIGlmKGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZVRhZ0hUTUwgPSBhdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldID09PSAndGFnLW9ubHknID8gXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50S2V5IDpcclxuICAgICAgICAgICAgICAgIGAke2N1cnJlbnRLZXl9PVwiJHthdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldfVwiYFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50QXR0cmlidXRlSFRNTH0gJHthdHRyaWJ1dGVUYWdIVE1MfSBgO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEF0dHJpYnV0ZUhUTUw7XHJcbiAgICAgICAgfSwgJycpOyAgIFxyXG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVIVE1MO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBWaWRlb1NldHRpbmdzIGZyb20gJy4uL3NldHRpbmdzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnRydWN0b3IoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50dGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QQVVTRSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHVyYXRpb24oY2IpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLm9uY2UodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfRFVSQVRJT04sIChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjYihkdXJhdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuR0VUX0RVUkFUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWb2x1bWUodm9sdW1lKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VUX1ZPTFVNRSwgdm9sdW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWVrKHNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRUVLLCBzZWNvbmRzKTtcclxuICAgIH1cclxufSIsImltcG9ydCBDb250cm9sRXZlbnRzIGZyb20gJy4vZXZlbnRzLmpzJztcclxuaW1wb3J0IFZpZGVvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xzIGV4dGVuZHMgQ29udHJvbEV2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IDAuNTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xFdmVudE5hbWVzID0gbmV3IFZpZGVvRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoaVZYanNCdXMpIHtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlRJTUVfVVBEQVRFLCB0aGlzLnVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWUlORywgdGhpcy53aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIHRoaXMuY2FuUGxheUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcmVsYXRpdmVQb3NpdGlvbiA9IHsgeDogZWxlbWVudC5vZmZzZXRMZWZ0LCB5OiBlbGVtZW50Lm9mZnNldFRvcCB9O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICByZWxhdGl2ZVBvc2l0aW9uLnggKz0gdGVtcFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueSArPSB0ZW1wUG9zaXRpb24ueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFkanVzdFZvbHVtZShldmVudCkge1xyXG4gICAgICAgIGxldCB7dm9sdW1lQmFyLCBtdXRlQ29udHJvbHMsIGN1cnJlbnRWb2x1bWUsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCBtdXRlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7b2Zmc2V0V2lkdGg6IHdpZHRoIH0gPSB2b2x1bWVCYXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24odm9sdW1lQmFyKTtcclxuICAgICAgICBsZXQge3g6IGFic29sdXRlWH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgdm9sdW1lTGV2ZWwgPSAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIG11dGVDb250cm9sc0NsYXNzZXMpO1xyXG5cclxuICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dm9sdW1lTGV2ZWwgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IHZvbHVtZUxldmVsO1xyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKHZvbHVtZUxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBzY3J1YihldmVudCkge1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtvZmZzZXRXaWR0aDogd2lkdGh9ID0gc2NydWJCYXI7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oc2NydWJCYXIpO1xyXG4gICAgICAgIGxldCB7eDogYWJzb2x1dGVYfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCBzY3J1YlRvVGltZSA9IHRoaXMuZHVyYXRpb24gKiAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lT2JqZWN0ID0gdGhpcy5jb252ZXJ0U2Vjb25kc1RvUGFydHMoc2NydWJUb1RpbWUpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gdGhpcy5jcmVhdGVUaW1lU3RhbXAoY3VycmVudFRpbWVPYmplY3QpO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgdGltZWxhcHNlZCA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhzY3J1YkJhci5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGltZVN0YW1wfWA7XHJcbiAgICAgICAgdGltZWxhcHNlZC5zdHlsZS53aWR0aCA9IGAkeyh0cnVlWCAvIHdpZHRoKSAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrKHNjcnViVG9UaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5UGF1c2UoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMocGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAocGxheVBhdXNlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBwbGF5Q2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgcGF1c2VDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXV0ZShldmVudCkge1xyXG4gICAgICAgIGxldCB7bXV0ZUNvbnRyb2xzLCBtdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlcywgdm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChtdXRlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSB1bm11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gbXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt0aGlzLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHlUb1BsYXkocGxheWVyLCBzdGF0ZURhdGEpIHtcclxuICAgICAgICBsZXQge3ZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHtzZWxmLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUoc2VsZi5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICB0aGlzLmdldER1cmF0aW9uKChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3RvdGFsVGltZUluZm8sIGN1cnJlbnRUaW1lSW5mbywgc2NydWJCYXJ9ID0gc2VsZjtcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uVGltZU9iamVjdCA9IHNlbGYuY29udmVydFNlY29uZHNUb1BhcnRzKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uVGltZVN0YW1wID0gc2VsZi5jcmVhdGVUaW1lU3RhbXAoZHVyYXRpb25UaW1lT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbFRpbWVJbmZvKSB0b3RhbFRpbWVJbmZvLmlubmVySFRNTCA9IGAvJHtkdXJhdGlvblRpbWVTdGFtcH1gO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYDAwOjAwYDtcclxuICAgICAgICAgICAgaWYgKHNjcnViQmFyKSBzY3J1YkJhci5jaGlsZHJlblswXS5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaW1lVXBkYXRlKHBsYXllcikge1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZTogc2Vjb25kc30gPSBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHNlY29uZHMgPSBzZWNvbmRzID4gdGhpcy5kdXJhdGlvbiA/IDAgOiBzZWNvbmRzO1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgdGltZUxhcHNlZCA9IHNlY29uZHMgLyB0aGlzLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHNjcnViQmFyKSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lbGFwc2VkRWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhzY3J1YkJhci5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGltZWxhcHNlZEVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt0aW1lTGFwc2VkICogMTAwfSVgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBsYXlpbmcoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGF1c2VkKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgc2VhcmNoQ2xhc3Nlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7c2NydWJCYXIsIHZvbHVtZUJhciwgcGxheVBhdXNlQ29udHJvbHMsIG11dGVDb250cm9sc30gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlWWGpzQnVzID0gaVZYanNCdXM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdXBkYXRlVGltZSk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBhdXNlZCA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUEFVU0VELCB3aGlsZVBhdXNlZCk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBsYXlpbmcgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHdoaWxlUGxheWluZyk7XHJcbiAgICAgICAgdGhpcy5jYW5QbGF5Q2FsbGJhY2sgPSAgaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgY2FuUGxheUNhbGxCYWNrKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSB0aGlzLnVwZGF0ZVRpbWUgPyB0aGlzLnVwZGF0ZVRpbWUgOiB1cGRhdGVUaW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvbHVtZUJhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5hZGp1c3RWb2x1bWUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjcnViQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2NydWIoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRQbGF5UGF1c2UoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG11dGVDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldE11dGUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNhblBsYXlDYWxsQmFjayhwbGF5ZXIsIF9zdGF0ZURhdGEpIHtcclxuICAgICAgICAgICAgc2VsZi5vblJlYWR5VG9QbGF5KHBsYXllciwgX3N0YXRlRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZShwbGF5ZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5vblRpbWVVcGRhdGUocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdoaWxlUGF1c2VkKHBsYXllcikge1xyXG4gICAgICAgICAgICBzZWxmLm9uUGF1c2VkKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3aGlsZVBsYXlpbmcoKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25QbGF5aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRCeUNsYXNzZXMoZWxlbWVudHMsIGNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgZWxlbWVudEFycmF5ID0gZWxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSA/XHJcbiAgICAgICAgICAgIGVsZW1lbnRzIDpcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShlbGVtZW50cyk7XHJcbiAgICAgICAgbGV0IHRoaXNFbGVtZW50O1xyXG5cclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goKGNsYXNzTmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXNFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzRWxlbWVudCA9IGVsZW1lbnRBcnJheS5maW5kKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc0VsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGltZVN0YW1wKHRpbWVPYmplY3QpIHtcclxuICAgICAgICBsZXQge2hvdXJzLCByZW1haW5pbmdNaW51dGVzOiBtaW51dGVzLCByZW1haW5pbmdTZWNvbmRzOiBzZWNvbmRzfSA9IHRpbWVPYmplY3Q7XHJcbiAgICAgICAgbGV0IGhvdXJTdHJpbmcgPSAnJztcclxuICAgICAgICBsZXQgbWludXRlU3RyaW5nID0gbWludXRlcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke21pbnV0ZXN9OmAgOlxyXG4gICAgICAgICAgICBgJHttaW51dGVzfTpgO1xyXG4gICAgICAgIGxldCBzZWNvbmRTdHJpbmcgPSBzZWNvbmRzIDwgMTAgP1xyXG4gICAgICAgICAgICBgMCR7c2Vjb25kc31gIDpcclxuICAgICAgICAgICAgYCR7c2Vjb25kc31gO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGhvdXJTdHJpbmcgPSBob3VycyA8IDEwID9cclxuICAgICAgICAgICAgICAgIGAwJHtob3Vyc306YCA6XHJcbiAgICAgICAgICAgICAgICBgJHtob3Vyc306YDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aG91clN0cmluZ30ke21pbnV0ZVN0cmluZ30ke3NlY29uZFN0cmluZ31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgbGV0IHRpbWVJbmZvcm1hdGlvbiA9IHtcclxuICAgICAgICAgICAgbWludXRlczogbWludXRlcyxcclxuICAgICAgICAgICAgaG91cnM6IE1hdGguZmxvb3IobWludXRlcyAvIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nU2Vjb25kczogTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxyXG4gICAgICAgICAgICByZW1haW5pbmdNaW51dGVzOiBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MCksXHJcbiAgICAgICAgICAgIHNlY29uZHM6IHNlY29uZHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1lSW5mb3JtYXRpb247XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckNvbnRyb2xFdmVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGF5XCIgOiAnaVZYOnZpZGVvOnBsYXknLFxyXG4gICAgICAgICAgICBcInBhdXNlXCIgOiAnaVZYOnZpZGVvOnBhdXNlJyxcclxuICAgICAgICAgICAgXCJzZWVrXCIgOiAnaVZYOnZpZGVvOnNlZWtlZCcsXHJcbiAgICAgICAgICAgIFwicGxheWluZ1wiIDogXCJpVlg6dmlkZW86cGxheWluZ1wiLFxyXG4gICAgICAgICAgICBcImVuZGVkXCIgOiBcImlWWDp2aWRlbzplbmRlZFwiLFxyXG4gICAgICAgICAgICBcInBhdXNlZFwiIDogXCJpVlg6dmlkZW86cGF1c2VkXCIsXHJcbiAgICAgICAgICAgIFwic2V0Vm9sdW1lXCIgOiAnaVZYOnZpZGVvOnNldFZvbHVtZScsXHJcbiAgICAgICAgICAgIFwiZHVyYXRpb25cIiA6IFwiaVZYOnZpZGVvOnJlcXVlc3REdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImdldER1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpnZXREdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImNhblBsYXlcIiA6IFwiaVZYOnZpZGVvOmNhbnBsYXlcIixcclxuICAgICAgICAgICAgXCJ0aW1lVXBkYXRlXCIgOiBcImlWWDp2aWRlbzp0aW1ldXBkYXRlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcG9zZVwiIDogXCJpVlg6dmlkZW86ZGlzcG9zZVwiLFxyXG4gICAgICAgICAgICBcInZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpXHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
