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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvdmlkZW8uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2RhdGV0aW1lLWxvY2FsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9lbWFpbC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZm9ybS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvbWVzc2FnZXMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L251bWJlci5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvcmFkaW8uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdHlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdGV4dC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3VybC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdmlkZW8uY29udHJvbHMuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmNob3IuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2NvbnRyb2xsZXJzL2VsZW1lbnQuY2FyZC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQuZHJvcGRvd24uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2RpcmVjdGl2ZXMvZWxlbWVudC5jYXJkLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmRyb3Bkb3duLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2NhcmQuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2Ryb3Bkb3duLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9mb3JtLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvaW5kZXguanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL251bWJlci5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvZXZlbnRzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy92aWRlby9zZXR0aW5ncy5qcyIsInNyYy91dGlsaXRpZXMvYXNzZXJ0cy5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLHFCO0FBQVQsU0FBUyxxQkFBVCxDQUErQixXQUEvQixFQUE0QztBQUMxRCxLQUFJLGdCQUFnQixXQUFwQjtBQUNBLEtBQUksT0FBTyxjQUFjLE9BQXpCO0FBQ0EsS0FBSSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBYTtBQUFBLG9DQUFULElBQVM7QUFBVCxPQUFTO0FBQUE7O0FBQy9CLDRDQUFXLGFBQVgsZ0JBQTRCLElBQTVCO0FBQ0gsRUFGRDs7QUFJQSxNQUFLLElBQUwsQ0FBVSxlQUFWOztBQUVBLFFBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7O0FDVkQ7Ozs7QUFDQSxJQUFJLGtCQUFrQixnQ0FBdEI7O0lBRWEscUIsV0FBQSxxQixHQUNULCtCQUFZLE1BQVosRUFBb0IsS0FBcEIsRUFBMkIsWUFBM0IsRUFBeUM7QUFBQTs7QUFBQSxRQUNw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Ozs7O21DQU1xQztBQUFBLGdCQUE1QixVQUE0Qix1RUFBZixFQUFlO0FBQUEsZ0JBQVgsSUFBVyx1RUFBSixFQUFJOztBQUNqQyxnQkFBSSxZQUFZO0FBQ1osMEJBQVUsSUFERTtBQUVaLHdCQUFRO0FBRkksYUFBaEI7QUFJQSxnQkFBSSxrQkFBa0IsRUFBdEI7QUFDQSxnQkFBSSxPQUFPLElBQVg7O0FBRUEsaUJBQUssT0FBTCxDQUFhLFVBQUMsR0FBRCxFQUFTO0FBQ2xCLGdDQUFnQixHQUFoQixJQUF1QixFQUF2QjtBQUNBLDJCQUFXLE9BQVgsQ0FBbUIsVUFBQyxPQUFELEVBQVUsS0FBVixFQUFvQjtBQUNuQyx3QkFBSSxZQUFZLEtBQUssR0FBTCxDQUFTLGdCQUFnQixHQUFoQixDQUFULEVBQStCLFFBQVEsR0FBUixDQUEvQixDQUFoQjs7QUFFQSx3QkFBSSxTQUFKLEVBQWU7QUFDWCxrQ0FBVSxNQUFWLENBQWlCLElBQWpCLENBQXNCO0FBQ2xCLGlDQUFLLEdBRGE7QUFFbEIsbUNBQU8sS0FGVztBQUdsQixtQ0FBTyxRQUFRLEdBQVI7QUFIVyx5QkFBdEI7QUFLQSxrQ0FBVSxRQUFWLEdBQXFCLEtBQXJCO0FBQ0gscUJBUEQsTUFPTztBQUNILHdDQUFnQixHQUFoQixFQUFxQixJQUFyQixDQUEwQixRQUFRLEdBQVIsQ0FBMUI7QUFDSDtBQUNKLGlCQWJEO0FBY0gsYUFoQkQ7O0FBa0JBLG1CQUFPLFNBQVA7QUFDSDs7Ozs7O0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XHJcblx0bGV0IGNvbnN0cnVjdG9yRm4gPSBjb25zdHJ1Y3RvcjtcclxuXHRsZXQgYXJncyA9IGNvbnN0cnVjdG9yRm4uJGluamVjdDtcclxuXHRsZXQgZmFjdG9yeUZ1bmN0aW9uID0gKC4uLmFyZ3MpID0+IHtcclxuICAgIFx0cmV0dXJuIG5ldyBjb25zdHJ1Y3RvckZuKC4uLmFyZ3MpO1xyXG5cdH1cclxuXHRcclxuXHRhcmdzLnB1c2goZmFjdG9yeUZ1bmN0aW9uKTtcclxuXHJcblx0cmV0dXJuIGFyZ3M7XHJcbn0iLCJpbXBvcnQgeyBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmxldCBteVR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dENvbnRyb2xsZXJIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHsgaW5wdXREYXRhOiBpbnB1dCB9ID0gJHNjb3BlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RXhwZXJpZW5jZVZhbHVlID0gaVZYanMuZXhwZXJpZW5jZS5kYXRhW2lucHV0Lm5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXRWYWx1ZSA9IGN1cnJlbnRFeHBlcmllbmNlVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RXhwZXJpZW5jZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pbnB1dFZhbHVlID0gY3VycmVudEV4cGVyaWVuY2VWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJ2NoYW5nZWQnLCBmdW5jdGlvbiAoaW5wdXQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghbXlUeXBlVmFsaWRhdG9yLmlzRW1wdHkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB7IG5hbWUsIG9uQ2hhbmdlID0gW10gfSA9IGlucHV0O1xyXG5cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ3NldERhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpVlhqcy5sb2cuZGVidWcoYElucHV0ICR7aW5wdXQubmFtZX0gT24gQ2hhbmdlIFN0YXJ0ZWRgLCB7fSwgeyBpbnB1dCwgc291cmNlOiAnb25DaGFuZ2UnLCBzdGF0dXM6ICdzdGFydGVkJywgYWN0aW9uczogb25DaGFuZ2UsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpVlhqcy5sb2cuZGVidWcoYElucHV0ICR7aW5wdXQubmFtZX0gT24gQ2hhbmdlIEVuZGVkYCwge30sIHsgaW5wdXQsIHNvdXJjZTogJ29uQ2hhbmdlJywgc3RhdHVzOiAnY29tcGxldGVkJywgYWN0aW9uczogb25DaGFuZ2UsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtPYmplY3RQYXJzZXJzfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcbmxldCB0aGlzT2JqZWN0UGFyc2VyID0gbmV3IE9iamVjdFBhcnNlcnMoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBlcnJvcnMsIGF0dHJpYnV0ZXMgPSB7fSkge1xyXG4gICAgICAgIGxldCB7bmFtZTogaW5wdXROYW1lLCB0eXBlOiBpbnB1dFR5cGV9ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dE5hbWUgPSBpbnB1dE5hbWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGFncygpIHtcclxuICAgICAgICBsZXQge2F0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgYW5ndWxhckVycm9yTWFwID0gdGhpcy5hbmd1bGFyRXJyb3JNYXA7XHJcbiAgICAgICAgbGV0IG5vbkFuZ3VsYXIgPSB0aGlzLm5vbkFuZ3VsYXI7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlID0gdGhpcy5ub25WYWxpZGF0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNPYmplY3RQYXJzZXIucmVkdWNlKGF0dHJpYnV0ZXMsICh0YWdzLCBhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlS2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChub25WYWxpZGF0ZS5pbmRleE9mKGF0dHJpYnV0ZUtleSkgPj0gMCkgcmV0dXJuIHRhZ3M7XHJcbiAgICAgICAgICAgIGxldCB0YWcgPSBub25Bbmd1bGFyLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+PSAwID9cclxuICAgICAgICAgICAgICAgIGAke2F0dHJpYnV0ZUtleX09XCIke2F0dHJpYnV0ZVZhbHVlfVwiYCA6XHJcbiAgICAgICAgICAgICAgICBgbmctJHthbmd1bGFyRXJyb3JNYXBbYXR0cmlidXRlS2V5XX0gPSBcIiR7YXR0cmlidXRlVmFsdWV9XCIgYDtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RhZ3N9ICR7dGFnfWA7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlcygpIHtcclxuICAgICAgICBsZXQge2lucHV0TmFtZSwgaW5wdXRUeXBlLCBlcnJvcnMsIGF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgYW5ndWxhckVycm9yTWFwID0gdGhpcy5hbmd1bGFyRXJyb3JNYXA7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRNZXNzYWdlcyA9IHRoaXMuZGVmYXVsdEVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGF0dHJpYnV0ZUtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBlcnJvcnMgJiYgZXJyb3JzW2F0dHJpYnV0ZUtleV0gPyBlcnJvcnNbYXR0cmlidXRlS2V5XSA6IGRlZmF1bHRNZXNzYWdlc1thdHRyaWJ1dGVLZXldO1xyXG4gICAgICAgICAgICBsZXQgYXR0ckhUTUwgPSBgbmctc2hvdz1cIigkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGRpcnR5IHx8ICRwYXJlbnQuZm9ybUlucHV0LiRzdWJtaXR0ZWQpICYmICRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZXJyb3IuJHthbmd1bGFyRXJyb3JNYXBbYXR0cmlidXRlS2V5XX1cImA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGF0dHJIVE1MOiBhdHRySFRNTFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlucHV0VHlwZSAmJiBpbnB1dFR5cGUgIT09ICd0ZXh0JyAmJiBpbnB1dFR5cGUgIT0gXCJvcHRpb25zXCIpIHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlcy5wdXNoKHRoaXMuaW5wdXRUeXBlRXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0VHlwZUVycm9yKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXROYW1lLCBpbnB1dFR5cGUsIGVycm9yc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBlcnJvcnNbaW5wdXRUeXBlXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlID8gZXJyb3JNZXNzYWdlIDogXCJJbnZhbGlkIFwiICsgaW5wdXRUeXBlLFxyXG4gICAgICAgICAgICBhdHRySFRNTDogYG5nLXNob3c9XCIoJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRkaXJ0eSB8fCAkcGFyZW50LmZvcm1JbnB1dC4kc3VibWl0dGVkKSAmJiAkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGVycm9yLiR7aW5wdXRUeXBlfVwiYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbm9uQW5ndWxhcigpIHtcclxuICAgICAgICByZXR1cm4gWydtaW4nLCAnbWF4JywgJ3JlYWRvbmx5JywgJ3BsYWNlaG9sZGVyJywgJ3N0ZXAnLCAncmVhZG9ubHknLCAnc3R5bGUnXVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBub25WYWxpZGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gWydzdGVwJywgJ3BsYWNlaG9sZGVyJywgJ3JlYWRvbmx5J107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuZ3VsYXJFcnJvck1hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6ICdtaW5sZW5ndGgnLFxyXG4gICAgICAgICAgICBtaW46IFwibWluXCIsXHJcbiAgICAgICAgICAgIG1heDogXCJtYXhcIixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogJ21heGxlbmd0aCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0RXJyb3JNZXNzYWdlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6ICdUb28gU2hvcnQnLFxyXG4gICAgICAgICAgICBtaW46IFwiVG9vIExvd1wiLFxyXG4gICAgICAgICAgICBtYXg6IFwiVG9vIEhpZ2hcIixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdSZXF1aXJlZCcsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogJ1RvbyBMb25nJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5MSUJSQVJZID0gXCJpVlhqc1wiO1xuICAgICAgICB0aGlzLkRFTElNRVRFUiA9IFwiOlwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuTElCUkFSWTtcbiAgICB9XG5cbiAgICBhZGROYW1lcyhuYW1lQ29sbGVjdGlvbil7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IG5hbWVzID0gT2JqZWN0LmtleXMobmFtZUNvbGxlY3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSwgaW5kZXgpID0+e1xuICAgICAgICAgICAgc2VsZltuYW1lXSA9IHNlbGYuY29udmVudGlvbihuYW1lQ29sbGVjdGlvbltuYW1lXSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImltcG9ydCBWaWRlb0NvbnN0YW50cyBmcm9tIFwiLi92aWRlby5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZGVvQ29uc3RhbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIEFERF9QTEFZSU5HX0NMQVNTOiAnYWRkLXBsYXlpbmctY2xhc3MnLFxuICAgICAgICAgICAgQlVGRkVSSU5HIDogXCJidWZmZXJpbmdcIixcbiAgICAgICAgICAgIENBTl9QTEFZOiBcImNhbi1wbGF5XCIsXG4gICAgICAgICAgICBESVNQT1NFIDogXCJkaXNwb3NlXCIsXG4gICAgICAgICAgICBFTkRFRCA6IFwiZW5kZWRcIixcbiAgICAgICAgICAgIEdFVF9EVVJBVElPTjogXCJnZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIE1VVEU6IFwibXV0ZVwiLFxuICAgICAgICAgICAgUEFVU0U6IFwicGF1c2VcIixcbiAgICAgICAgICAgIFBBVVNFRDogXCJwYXVzZWRcIixcbiAgICAgICAgICAgIFBMQVk6IFwicGxheVwiLFxuICAgICAgICAgICAgUExBWUlORzogXCJwbGF5aW5nXCIsXG4gICAgICAgICAgICBSRUFEWV9QTEFZRVIgOiBcInJlYWR5LXBsYXllclwiLFxuICAgICAgICAgICAgU0VFSzogXCJzZWVrXCIsXG4gICAgICAgICAgICBTRVRfRFVSQVRJT046IFwic2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBTRVRfVk9MVU1FOiBcInNldC12b2x1bWVcIixcbiAgICAgICAgICAgIFRJTUVfVVBEQVRFOiBcInRpbWUtdXBkYXRlXCIsXG4gICAgICAgICAgICBVTk1VVEU6IFwidW5tdXRlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLlZJREVPID0gXCJ2aWRlb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIFZJREVPfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtWSURFT31gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XG5cbmxldCB0eXBlQ2hlY2sgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIHtcbiAgICBjb25zdHJ1Y3RvcihhbmNob3JJbmZvKSB7ICAgXG4gICAgICAgdGhpcy5hbmNob3JJbmZvID0gYW5jaG9ySW5mbztcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGdldCBhbmNob3JDbGFzc2VzKCl7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7YW5jaG9yQ2xhc3Nlc30gPSB0aGlzO1xuICAgICAgICBsZXQge2hyZWYgPSAnJywgY2xhc3NlcyA9ICcnLCBhdHRyaWJ1dGVzID0ge30sIGxhYmVsID0gbGFiZWxIVE1MLCBsYWJlbEhUTUwsIGlkPScnfSA9IHRoaXMuYW5jaG9ySW5mbzsgXG4gICAgICAgIGxldCBhdHRyaWJ1dGVIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoYXR0cmlidXRlcywgT2JqZWN0LmtleXMoYXR0cmlidXRlcykpLmh0bWw7XG5cbiAgICAgICAgaWYoIWxhYmVsSFRNTCAmJiAhbGFiZWwpe1xuICAgICAgICAgICAgbGFiZWwgPSBocmVmO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgPGEgaWQ9JyR7aWR9JyBjbGFzcz1cIiR7Y2xhc3Nlc30gJHthbmNob3JDbGFzc2VzfVwiICBocmVmPVwiJHtocmVmfVwiICR7YXR0cmlidXRlSFRNTH0gPiR7bGFiZWxIVE1MID8gbGFiZWxIVE1MIDogbGFiZWx9PC9hPiAgICAgICAgICAgXG4gICAgICAgIGBcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL2Fzc2VydHMuanMnO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcbmxldCB0eXBlQ2hlY2sgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcnMgYSBjb2xsZWN0aW9uIG9mIGJ1dHRvbnMgZm9yIG9uZSBjbGljayByZWNvcmRpbmcgb2YgXHJcbiAqIGFuIGlucHV0IHRoYXQgaGFzIG11bHRpcGxlIG9wdGlvbnMgZm9yIGRhdGEgcmVjb3JkaW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbnMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZXMgdGhlIHNldHRpbmdzIGZvciB0aGUgYnV0dG9ucywgYSBjbGFzcyB0aGF0IHJlbmRlcnMgdGhlIFxyXG4gICAgICogZXJyb3IgbWVzc2FnZXMgYW5kIGEgY2xhc3MgdGhhdCByZW5kZXJzIGF0dHJpYnV0ZXMuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9uc0luZm8gLSBJbmZvcm1hdGlvbiB0byBjcmVhdGUgdGhpcyBidXR0b24gaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBidXR0b25zSW5mby5idXR0b25zIC0gZWFjaCBpbmRpdmlkdWFsIGJ1dHRvbiBkYXRhIGFuZCBzZXR0aW5ncy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mby5zZXR0aW5ncyAtIHNldHRpbmdzIGZvciBhbGwgYnV0dG9ucyBcclxuICAgICAqIEBwYXJhbSB7Q2xhc3N9IGJ1dHRvbnNJbmZvLmVycm9ycyAtIGFuIGVycm9yIGNsYXNzIHRoYXQgd2FzIGNyZWF0ZWQgYnkgdGhlIFxyXG4gICAgICogcmVuZGVyaW5nIGxpYnJhcnkgc28gdGhlIGVycm9ycyBvcGVuIGFuZCBkaXNwbGF5IGFsb25nc2lkZSB0aGUgbGlicmFyeS4gXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbnMgPSBbXSwgaW5wdXQsIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJ1dHRvbnMgdG8gYmUgcmVuZGVyZWRcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIGluIHRoaXMgZ3JvdXAgXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVycm9yIG1lc3NhZ2UgY2xhc3MgdGhhdCB3aWxsIHRha2UgdGhlIGVycm9ycyBmcm9tIFxyXG4gICAgICAgICAqIHRoZSByZW5kZXJpbmcgbGlicmFyeSBhbmQgYWRkcyB0aGVtIHRvIHRoaXMgaW5wdXQgXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYXR0cmlidXRlIHRhZ3MgaHRtbCB0byBiZSBhZGRlZCB0byB0aGlzIGJ1dHRvbiBcclxuICAgICAgICAgKiBpbnB1dHMuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZXRzIHVzZXJzIGFkZCB0aGUgc2FtZSBjbGFzc2VzIHRvIGFsbCBidXR0b25zIGp1c3QgaW4gXHJcbiAgICAgKiBjYXNlIGJ1dHRvbnMgc2hhcmUgYSBzcGVjaWZpYyBjbGFzcy5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGJ1dHRvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgSFRNTCBmb3IgZXZlcnkgYnV0dG9ucyBkZWZpbmVkIGluIHRoZSBidXR0b25zIGFycmF5IGFuZCBcclxuICAgICAqIGF0dGFjaGVzIHRoZSBlcnJvciBtZXNzYWdlcyBhdHRhY2hlZCB0byB0aGlzIGlucHV0LiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGJ1dHRvbkNsYXNzZXMgPSAnYnV0dG9uLWNsYXNzJztcclxuICAgICAqIGJ1dHRvbnMgPSBbe1xyXG4gICAgICogICAgbGFiZWwgOiBcIkJ1dHRvbiAxXCIsXHJcbiAgICAgKiAgICBhdHRySFRNTCA6IFwiZGlzYWJsZWRcIixcclxuICAgICAqICAgIGNsYXNzZXMgOiBcImNsYXNzLTFcIlxyXG4gICAgICogfSx7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiPGgxPkJ1dHRvbiAyPC9oMT5cIixcclxuICAgICAqICAgIGNsYXNzZXMgXCIgY2xhc3MtMlwiXHJcbiAgICAgKiB9XTtcclxuICAgICAqIFxyXG4gICAgICogLy8gV2lsbCByZW5kZXI6XHJcbiAgICAgKiBcclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24tY2xhc3MgY2xhc3MtMVwiIGRpc2FibGVkPkJ1dHRvbiAxPC9idXR0b24+XHJcbiAgICAgKiA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGNsYXNzIGNsYXNzLTJcIj48aDE+QnV0dG9uIDI8L2gxPjwvYnV0dG9uPlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yczogZXJyb3JDbGFzcyA9IHt9LCBidXR0b25zID0gW10sIGlucHV0ID0ge30sIGJ1dHRvbkNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgeyBhdHRyaWJ1dGVzID0ge30sIGVycm9ycyA9IHt9LCBtZXNzYWdlcyA9IHt9IH0gPSBlcnJvckNsYXNzO1xyXG4gICAgICAgIGxldCBidXR0b25FcnJvck1lc3NhZ2VzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtlcnJvcnNba2V5XX1gLFxyXG4gICAgICAgICAgICAgICAgYXR0ckhUTUw6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcyA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoYnV0dG9uRXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCA9ICcnLCBzaG93TGFiZWwgPSBmYWxzZSwgaWR9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IGJ1dHRvbnNIVE1MID0gYnV0dG9ucy5yZWR1Y2UoKGh0bWwsIGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHsgbGFiZWwsIGF0dHJIVE1MID0gJycsIGNsYXNzZXMgPSBcIlwiIH0gPSBidXR0b247XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aHRtbH0gXHJcbiAgICAgICAgICAgICAgICAgICA8YnV0dG9uICR7YXR0ckhUTUx9IGNsYXNzPVwiJHtjbGFzc2VzfSAke2J1dHRvbkNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgfSwgJycpO1xyXG5cclxuICAgICAgICBpZiAoKGxhYmVsSFRNTC5sZW5ndGggPiAwIHx8IGxhYmVsLmxlbmd0aCA+IDApICYmIHNob3dMYWJlbCkge1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbDtcclxuICAgICAgICAgICAgbGFiZWxIVE1MID0gYDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWxIVE1MfTwvbGFiZWw+YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICR7bGFiZWxIVE1MfVxyXG4gICAgICAgICAgICAgJHtidXR0b25zSFRNTH1cclxuICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlc30gICAgICAgICAgICAgXHJcbiAgICAgICAgYDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBQcm9kdWNlcyBodG1sIHRvIGJ1aWxkIGEgY2hlY2tib3ggaW5wdXQgZm9yIHRoZSAgXHJcbiAqIHZhcmlvdXMgcmVuZGVyaW5nIGxpYnJhcmllcy4gXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3gge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgY2hlY2tib3gncyBzZXR0aW5ncyBmcm9tIGEgc3RhbmRhcmQgaW5wdXQgZGF0YSBcclxuICAgICAqIG9iamVjdCBhbmQgc2V0cyB0aGUgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyB0aGlzIGNsYXNzIFxyXG4gICAgICogd2lsbCByZW5kZXIgaWYgdGhlIGNoZWNrYm94IGlzbid0IHZhbGlkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRPYmogLSBjb250YWlucyBhbGwgdGhlIGNvbmZpZ3VyYXRpb25zIFxyXG4gICAgICogdG8gcmVuZGVyIHRoaXMgaW5wdXQuXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBlcnJvck1lc3NhZ2VzIC0gYSBjbGFzcyB0aGF0IHdpbGwgcmVuZGVyIHRoZSBcclxuICAgICAqIHNwZWNpZmljIHR5cGUgb2YgZXJyb3IgbWVzc2FnZXMgYmFzZWQgb24gdGhpcyBVSSdzIHNldHRpbmdzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHRhZ3MgPSAnJywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgY2hlY2tib3gncyBpbnB1dCBjb25maWd1cmF0aW9uIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbnkgY3VzdG9tIHRhZ3MgcGFzc2VkIGRvd24gZnJvbSB0aGUgcmVuZGVyaW5nIGxpYnJhcnkuIFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgd2hvbGUgaW5wdXQgaW5jbHVkaW5nIHRoZSBjb250YWluZXJcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBjbGFzcyBvZiBlcnJvcnMgY3JlYXRlZCBieSB0aGUgcmVuZGVyaW5nIGxpYnJhcnkgdG8gXHJcbiAgICAgICAgICogaGlkZSBhbmQgc2hvdyB2YXJpb3VzIGVycm9ycy5cclxuICAgICAgICAgKiBAdHlwZSB7Y2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgVUkncyByZW5kZXJpbmcgb2YgdGhpcyBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7Y2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkZWZhdWx0IGNsYXNzIHRvIHRoaXMgY2hlY2tib3ggaW5wdXQgXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW55IFVJIHNwZWNpZmljIGF0dHJpYnV0ZXNcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRyaWJ1dGVzIHRoYXQgcmVxdWlyZWQgZm9yIHRoaXMgY2hlY2tib3ggaW5wdXQgXHJcbiAgICAgKiB0byBiZSB1c2VkIGFuZCByZW5kZXJlZCBwcm9wZXJseS5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBBIHN0cmluZyBvZiBhbGwgYXR0cmlidXRlcyB0byBsb2FkIFxyXG4gICAgICogdGhpcyBpbnB1dCBpbmNsdWRpbmcgaXRzIGlkLCBuYW1lIGFuZCB0eXBlLlxyXG4gICAgICovXHJcbiAgICBnZXQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXR9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lfSA9IGlucHV0O1xyXG5cclxuICAgICAgICByZXR1cm4gYGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiIHR5cGU9XCJjaGVja2JveFwiYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgZm9yIHRoaXMgY2hlY2tib3ggZnJvbSB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBcclxuICAgICAqIGFuZCBjbGFzc2VzLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHVpQ2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogaW5wdXQuY2xhc3NlcyA9IFwiY2xhc3MtMlwiO1xyXG4gICAgICogcmVxdWlyZWRBdHRyaWJ1dGVzID0gXCJpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnXCJcclxuICAgICAqIC8vIFJlbmRlcnMgVG86XHJcbiAgICAgKiA8bGFiZWwgY2xhc3M9XCJjbGFzcy0xIGNsYXNzLTJcIj5cclxuICAgICAqICAgICA8aW5wdXQgaWQ9J2lkLTEnIG5hbWU9J2NoZWNrYm94LW5hbWUnIHR5cGU9J2NoZWNrYm94Jz5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IC0gaHRtbCBvZiB0aGUgZnVsbHkgY3JlYXRlZCBjaGVja2JveFxyXG4gICAgICovXHJcbiAgICByZW5kZXJDaGVja2JveENvbnRhaW5lcihjbGFzc2VzLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3N9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7c2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiIGNsYXNzPVwiJHtjbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICA8aW5wdXQgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCBhbmQgcmVuZGVycyBhbGwgdGhlIEhUTUwgZm9yIHRoaXMgY2hlY2tib3ggYmFzZWQgb24gdGhlIHNldHRpbmdzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIHNldHRpbmdzID0ge30sIGVycm9ycywgaW5wdXQsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzLCByZXF1aXJlZEF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQgeyBpZCwgbmFtZSwgbGFiZWwgPSAnJyB9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgbWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlcyA9IHt9LCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSB0aGlzLmVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JBdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhtZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgYWxsQ2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgbGV0IGFsbEF0dHJpYnV0ZXMgPSBgJHtyZXF1aXJlZEF0dHJpYnV0ZXN9ICR7dWlBdHRyaWJ1dGVzfSAke3RhZ3N9ICR7ZXJyb3JUYWdzfWBcclxuICAgICAgICBsZXQgY2hlY2tib3hIVE1MID0gdGhpcy5yZW5kZXJDaGVja2JveENvbnRhaW5lcihhbGxDbGFzc2VzLCBhbGxBdHRyaWJ1dGVzKTtcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgJHtjaGVja2JveEhUTUx9XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTdHlsZX0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQge0F0dHJpYnV0ZVRhZ3N9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGRhdGUgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBkYXRlIHNwZWNpZmljIGRhdGEgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBkYXRlIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWwgaW5wdXQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIGRhdGUgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBkYXRlIGlucHV0cyBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhIGRhdGUgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIC8vRGF0YSBcclxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgICogRGF0ZS51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZGF0ZVwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7ICAgICAgICBcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwiZGF0ZVwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZXRpbWUgbG9jYWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBkYXRlIHdpdGggdGltZXN0YW1wIHNwZWNpZmljIGRhdGEgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRldGltZUxvY2FsIHtcclxuXHJcbiAgICAvKipcclxuICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICogbWVzc2FnZXNcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBib3hcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlc1xyXG4gICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBkYXRldGltZS1sb2NhbCBpbnB1dHMgXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gYGBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gYGBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAqIFxyXG4gICAgKiBAZXhhbXBsZSBcclxuICAgICogLy9EYXRhIFxyXG4gICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAqIERhdGV0aW1lTG9jYWwudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAqIDxsYWJlbD5cclxuICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgKiA8L2xhYmVsPlxyXG4gICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCwgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVtYWlsIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgZW1haWxzICBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVtYWlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBlbWFpbCBpbnB1dCBib3hcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGVtYWlsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYW4gZW1haWwgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIC8vRGF0YSBcclxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgICogRW1haWwudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImVtYWlsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwiZW1haWxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTdHlsZX0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGZvcm0gd3JhcHBlciBhcm91bmQgdGhlc2UgaW5wdXRzIGFuZCBhIFxyXG4gKiBzdWJtaXQgYnV0dG9uIHRvIHN1Ym1pdCB0aGUgZm9ybS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgdGhlIHZhcmlvdXMgZGF0YSB0byByZW5kZXIgdGhpcyBmb3JtLlxyXG4gICAgICogQHBhcmFtIHthcnJheX0gaW5wdXRIVE1MIC0gQWxsIGlucHV0IGRhdGEgdG8gYmUgYWRkZWQgdG8gdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoaXMgZm9ybSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsQXR0ckhUTUwgLSBBdHRyaWJ1dGVzIHRoYXQgbmVlZCB0byBiZSBcclxuICAgICAqIGFkZGVkIHRvIHRoZSBmb3JtIHByaW1hcmlseSB1c2VkIGZvciB2YWxpZGF0aW9uIGFuZCBzdWJtaXQgZnVuY3Rpb25zLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNldHRpbmdzIC0gR2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGZvcm0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncywgc3R5bGUgPSBTdHlsZSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgaW5wdXQgaHRtbCBpbmZvcm1hdGlvbiBmb3IgdGhpcyBcclxuICAgICAgICAgKiBmb3JtXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0SFRNTCA9IGlucHV0SFRNTDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFtZSBmb3IgdGhpcyBmb3JtIFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkaXRpb25hbCB0YWdzIHRvIGFkZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFkZGl0aW9uYWxBdHRySFRNTCA9IGFkZGl0aW9uYWxBdHRySFRNTDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgZW50aXJlIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciB0aGlzIHN1Ym1pdCBidXR0b24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN1Ym1pdCA9IHNldHRpbmdzLnN1Ym1pdDtcclxuICAgICAgICB0aGlzLnN0eWxlID0gbmV3IHN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgZGVmYXVsdCBVSSBjbGFzc2VzIHRvIGFkZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgZm9ybUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdyb3cnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIHRvIHJlbmRlciB0aGUgXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogRm9ybS5zZXR0aW5ncyA9IHtcclxuICAgICAqICAgICBzdWJtaXQgOiB7XHJcbiAgICAgKiAgICAgICAgIGxhYmVsIDogXCJNeSBuZXcgc3VibWl0IGxhYmVsXCIsXHJcbiAgICAgKiAgICAgICAgIGlucHV0IDoge1xyXG4gICAgICogICAgICAgICAgICBjbGFzc2VzIDogXCJteS1zdWJtaXQtaW5wdXRcIlxyXG4gICAgICogICAgICAgICB9LFxyXG4gICAgICogICAgICAgICBjb250YWluZXIgOiB7XHJcbiAgICAgKiAgICAgICAgICAgICBjbGFzc2VzIDogXCJteS1zdWJtaXQtY29udGFpbmVyXCJcclxuICAgICAqICAgICAgICAgfVxyXG4gICAgICogICAgIH1cclxuICAgICAqIH07XHJcbiAgICAgKiBcclxuICAgICAqIC8vV2lsbCBSZW5kZXIgXHJcbiAgICAgKiBcclxuICAgICAqIDxkaXYgY2xhc3M9XCJpdnhqcy1ncmlkLTEtMSBteS1zdWJtaXQtY29udGFpbmVyXCI+XHJcbiAgICAgKiAgICAgPGJ1dHRvbiBjbGFzcz1cIm15LXN1Ym1pdC1pbnB1dFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAqICAgICAgICAgIE15IG5ldyBzdWJtaXQgbGFiZWwgXHJcbiAgICAgKiAgICAgPC9idXR0b24+XHJcbiAgICAgKiA8L2Rpdj5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHN1Ym1pdEJ1dHRvbkhUTUwoKSB7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IHN1Ym1pdExhYmVsID0gXCJTdWJtaXRcIiwgbGFiZWxIVE1MOiBzdWJtaXRMYWJlbEhUTUwsIGlucHV0OiBzdWJtaXRJbnB1dCA9IHt9LCBjb250YWluZXI6IHN1Ym1pdENvbnRhaW5lciA9IHt9LCBhdHRyaWJ1dGVzID0gJyd9ID0gc3VibWl0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0SW5wdXRDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRJbnB1dDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdENvbnRhaW5lckNsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdENvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgc3VibWl0TGFiZWwgPSBzdWJtaXRMYWJlbEhUTUwgPyBzdWJtaXRMYWJlbEhUTUwgOiBzdWJtaXRMYWJlbDtcclxuXHJcbiAgICAgICAgbGV0IHN1Ym1pdEhUTUwgPSBzdWJtaXRMYWJlbC5sZW5ndGggPj0gMCA/XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIiR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCcgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgICAgICAgICAke3N1Ym1pdExhYmVsfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBzIGVhY2ggaW5wdXQncyBodG1sIGludG8gYSBjb250YWluZXIgc28gdGhleSBjYW4gYmUgZm9ybWF0dGVkIGNvcnJlY3RseVxyXG4gICAgICogdXRpbGl6aW5nIHRoZSBpdnhqcy5jc3MncyBncmlkIHN5c3RlbS5cclxuICAgICAqIEB0eXBle1N0cmluZ30gXHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBmb3JtQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge30sIGNsYXNzZXM6IGNvbmZpZ0Zvcm1DbGFzc2VzID0gJycsIGlkIDogZm9ybUlkLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGlmKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoIXNldHRpbmdzLmhpZGVTdWJtaXQpIHtcclxuICAgICAgICAgICAgaW5wdXRIVE1MLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHN1Ym1pdCxcclxuICAgICAgICAgICAgICAgIGh0bWw6IHRoaXMuc3VibWl0QnV0dG9uSFRNTFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IHRoaXMuc3R5bGUuYWRkV2lkdGhDbGFzc2VzKGlucHV0SFRNTCk7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgIDxmb3JtIGlkPVwiJHtmb3JtSWR9LWZvcm1cIiBjbGFzcz1cIiR7Zm9ybUNsYXNzZXN9ICR7Y29uZmlnRm9ybUNsYXNzZXN9XCIgbm92YWxpZGF0ZSBuYW1lPVwiJHtuYW1lfVwiICR7YWRkaXRpb25hbEF0dHJIVE1MfT4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAke2NvbnRlbnRzfVxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBJbmRpY2F0ZXMgZXJyb3JzIGZvciBlYWNoIGlucHV0IGJhc2VkIG9uIHRoZSBcclxuICogYXR0cmlidXRlcyBjcmVhdGVkIGZyb20gdGhlIHZhcmlvdXMgcmVuZGVyaW5nIGxpYnJhcmllc1xyXG4gKiBpVlhqcyB1c2VzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyaW5ncyBpbiBhbGwgdGhlIHBvc3NpYmxlIGVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICogdGhpcyBpbnB1dCBjYW4gcHJvZHVjZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXJyb3JNZXNzYWdlcyAtIGxpc3Qgb2YgYWxsIHBvc3NpYmxlIFxyXG4gICAgICogZXJyb3IgbWVzc2FnZXMgd2l0aCBhdHRyaWJ1dGVzIGluZGljYXRpbmcgdGhlIG1lc3NhZ2UgXHJcbiAgICAgKiBhbmQgdGhlIGNvbmRpdGlvbnMgaW4gd2hpY2ggdG8gc2hvdyB0aGVtLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvck1lc3NhZ2VzID0gW10pIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlzdCBvZiBhbGwgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2xhc3NlcyBmb3IgdGhlIGVycm9yIG1lc3NhZ2UgZGl2LlxyXG4gICAgICogQHR5cGUge1N0cmluZ30gXHJcbiAgICAgKi9cclxuICAgIGdldCBtZXNzYWdlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Vycm9yLW1lc3NhZ2UnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBjbGFzc2VzIGZvciB0aGUgY29udGFpbmVyIG9mIGFsbCBlcnJvciBtZXNzYWdlcy5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb250YWluZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZXMnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgYWxsIGVycm9yIG1lc3NhZ2VzIGFuZCB0aGUgY29udGFpbmVyIHdpdGggXHJcbiAgICAgKiB0aGVtLiBSZXN1bHRzOlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlc1wiPlxyXG4gICAgICogICAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+TUVTU0FHRTwvc3Bhbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvck1lc3NhZ2VzLCBtZXNzYWdlQ2xhc3NlcywgY29udGFpbmVyQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VIVE1MID0gZXJyb3JNZXNzYWdlcy5yZWR1Y2UoKGVycm9yTWVzc2FnZUhUTUwsIGVycm9yTWVzc2FnZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2Vycm9yTWVzc2FnZUhUTUx9PHNwYW4gY2xhc3M9XCIke21lc3NhZ2VDbGFzc2VzfVwiICR7ZXJyb3JNZXNzYWdlLmF0dHJIVE1MfT5cclxuICAgICAgICAgICAgICAgICAgICAke2Vycm9yTWVzc2FnZS5tZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPmBcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChlcnJvck1lc3NhZ2VIVE1MLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPScke2NvbnRhaW5lckNsYXNzZXN9Jz5cclxuICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlSFRNTH1cclxuICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQge0F0dHJpYnV0ZVRhZ3N9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBudW1iZXIgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBudW1iZXJzICBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE51bWJlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgICogbWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIHRoaXMgbnVtYmVyIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBudW1iZXIgaW5wdXRcclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgbnVtYmVyIGlucHV0cyBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhIG51bWJlciBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBOdW1iZXIudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAgKiBpbnB1dC5hdHRyaWJ1dGVzID0ge1xyXG4gICAgICogICAgIFwic3RlcFwiIDogXCIwLjFcIlxyXG4gICAgICogfVxyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgc3RlcD1cIjAuMVwiIGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwibnVtYmVyXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbmFtZSA9ICcnLCBpZCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJudW1iZXJcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBkZWZhdWx0RGlzcGxheSA9ICcnLCBzZXR0aW5ncyA9IHt9LCB0YWdzID0gJycsIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmRlZmF1bHREaXNwbGF5ID0gZGVmYXVsdERpc3BsYXk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHt0YWdzLCBpbnB1dCwgZGVmYXVsdERpc3BsYXksIGVycm9ycywgc2V0dGluZ3MsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZCwgbmFtZSwgb3B0aW9ucywgbGFiZWwgPSAnJywgbGFiZWxIVE1MfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uVGFnID0gYDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYW4gb3B0aW9uLi4uPC9vcHRpb24+YDtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yQXR0cmlidXRlcy5yZXF1aXJlZCB8fCAoZGVmYXVsdERpc3BsYXkgJiYgZGVmYXVsdERpc3BsYXkubGVuZ3RoID49IDApKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWcgPSBkZWZhdWx0RGlzcGxheSA/XHJcbiAgICAgICAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7ZGVmYXVsdERpc3BsYXl9PC9vcHRpb24+YCA6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zSFRNTCA9IG9wdGlvbnMucmVkdWNlKChvcHRpb25IVE1MLCBvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke29wdGlvbkhUTUx9XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIke29wdGlvbi52YWx1ZX1cIj4ke29wdGlvbi5kaXNwbGF5fTwvb3B0aW9uPmBcclxuICAgICAgICB9LCAnJylcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4ke2xhYmVsfTwvbGFiZWw+ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgICAgJHtvcHRpb25zSFRNTH1cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFkaW8ge1xyXG4gICAgY29uc3RydWN0b3IocmFkaW9JbnB1dE9iaiwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHJhZGlvcyA9IFtdLCBlcnJvcnMgPSB7fSwgc2V0dGluZ3MgPSB7fX0gPSByYWRpb0lucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLnJhZGlvcyA9IHJhZGlvcztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICB1aVJhZGlvR3JvdXAocmFkaW9zSFRNTCkge1xyXG4gICAgICAgIHJldHVybiByYWRpb3NIVE1MO1xyXG4gICAgfTtcclxuXHJcbiAgICB1aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgdWlDbGFzc2VzLCB2YWx1ZSA9IFwiXCIpIHtcclxuICAgICAgICBsZXQge2lkfSA9IHRoaXMuaW5wdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyt2YWx1ZTogJyd9XCIgY2xhc3M9XCIke3VpQ2xhc3Nlc31cIj5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L2xhYmVsPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCkge1xyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgJHthdHRySFRNTH0+XHJcbiAgICAgICAgICAgICR7bGFiZWx9YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcywgdGFnczogZXJyb3JUYWdzID0gXCJcIn0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IGlucHV0TGFiZWwsIGxhYmVsSFRNTDogaW5wdXRMYWJsZUhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGlucHV0TGFibGVIVE1MKSBpbnB1dExhYmVsID0gaW5wdXRMYWJsZUhUTUw7XHJcblxyXG4gICAgICAgIGxldCByYWRpb3NIVE1MID0gcmFkaW9zLnJlZHVjZSgoaHRtbCwgcmFkaW8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7bGFiZWwsIGF0dHJIVE1MID0gJycsIGNsYXNzZXMgPSAnJywgdmFsdWV9ID0gcmFkaW87XHJcblxyXG4gICAgICAgICAgICBhdHRySFRNTCA9IGAke2F0dHJIVE1MfSAke2Vycm9yVGFnc31gO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhZGlvSFRNTCA9IHNlbGYucmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCwgaW5wdXQucmFkaW9CdXR0b25zW2luZGV4XS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aHRtbH1cclxuICAgICAgICAgICAgJHtzZWxmLnVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCBgJHt1aUNsYXNzZXN9ICR7Y2xhc3Nlc31gLCBpbnB1dC5yYWRpb0J1dHRvbnNbaW5kZXhdLnZhbHVlKX1gO1xyXG4gICAgICAgIH0sIGlucHV0TGFiZWwpO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IGFsbFJhZGlvQnV0dG9uc0hUTUwgPSBgXHJcbiAgICAgICAgICAgICAke3JhZGlvc0hUTUx9XHJcbiAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy51aVJhZGlvR3JvdXAoYWxsUmFkaW9CdXR0b25zSFRNTCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU2VjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZm9ybVNlY3Rpb24gPSBmb3JtU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVmYXVsdEZvb3RlckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtmb3JtU2VjdGlvbiwgZGF0YSwgZGVmYXVsdEZvb3RlckNsYXNzZXMsIGRlZmF1bHRIZWFkZXJDbGFzc2VzLCBkZWZhdWx0U2VjdGlvbkNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9fSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgPGgxPiR7ZGF0YS5uYW1lfTwvaDE+YH0gPSBoZWFkZXI7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlczogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIiR7c2VjdGlvbkNsYXNzZXN9ICR7ZGVmYXVsdFNlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7ZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgJHtmb3JtU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9ICR7ZGVmYXVsdEZvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tICcuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxpbmtTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGlua1NlY3Rpb24gPSBsaW5rU2VjdGlvblxuICAgIH1cblxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7ZGF0YSwgbGlua1NlY3Rpb24sIGRlZmF1bHRGb290ZXJDbGFzc2VzLCBkZWZhdWx0SGVhZGVyQ2xhc3NlcywgZGVmYXVsdFNlY3Rpb25DbGFzc2VzLCBkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fSwgbGlua0NvbnRhaW5lciA9IHt9fSA9IGRhdGE7XG4gICAgICAgIGxldCB7Y2xhc3NlczogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYGB9ID0gaGVhZGVyO1xuICAgICAgICBsZXQge2NsYXNzZXM6IHNlY3Rpb25DbGFzc2VzID0gJyd9ID0gc2VjdGlvbjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWw6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XG4gICAgICAgIGxldCB7Y2xhc3NlczogbGlua0NvbnRhaW5lckNsYXNzZXMgPSAnJywgYXR0cmlidXRlczogbGlua0NvbnRhaW5lckF0dHJpYnV0ZXMgPSB7fX0gPSBsaW5rQ29udGFpbmVyO1xuICAgICAgICBsZXQgbGlua0NvbnRhaW5lckF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhsaW5rQ29udGFpbmVyQXR0cmlidXRlcywgT2JqZWN0LmtleXMobGlua0NvbnRhaW5lckF0dHJpYnV0ZXMpKS5odG1sO1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIiR7c2VjdGlvbkNsYXNzZXN9ICR7ZGVmYXVsdFNlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxuICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke2RlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nJHtkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXN9ICR7bGlua0NvbnRhaW5lckNsYXNzZXN9JyAke2xpbmtDb250YWluZXJBdHRyaWJ1dGVIVE1MfT5cbiAgICAgICAgICAgICAgICAgICAgJHtsaW5rU2VjdGlvbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfSAke2RlZmF1bHRGb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgU3R5bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIGdldFdpZHRoKHdpZHRoKSB7XHJcbiAgICAgICAgaWYgKHdpZHRoID09PSAnMScpIHJldHVybiAnaXZ4anMtZ3JpZC0xLTEnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBncmlkU3RyaW5nID0gd2lkdGgucmVwbGFjZSgnLycsICctJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBgaXZ4anMtZ3JpZC0ke2dyaWRTdHJpbmd9YDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2lucHV0LWNvbnRhaW5lcic7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2lkdGhDbGFzc2VzKGlucHV0c0hUTUwpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjb250YWluZXJDbGFzc2VzID0gJyd9ID0gdGhpcztcclxuICAgICAgICBsZXQgY29udGVudHMgPSBpbnB1dHNIVE1MLnJlZHVjZSgoY3VycmVudEhUTUwsIGlucHV0SFRNTCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2h0bWwsIHNldHRpbmdzID0ge319ID0gaW5wdXRIVE1MO1xyXG4gICAgICAgICAgICBsZXQge3dpZHRoID0gJzEnLCBjb250YWluZXI9e319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCB7Y2xhc3Nlcz0nJ30gPSBjb250YWluZXI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHtjb250YWluZXJDbGFzc2VzfWBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0aGlzV2lkdGggPSBzZWxmLmdldFdpZHRoKHdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoXCJpdnhqcy1ncmlkLTEtMVwiLCBgJHt0aGlzV2lkdGh9ICR7Y2xhc3Nlc31gKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50SFRNTH0gJHtodG1sfWA7XHJcbiAgICAgICAgfSwgJycpXHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInRleHRcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dGFyZWEge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxhYmVsID0gc2hvd0xhYmVsID8gbGFiZWwgOiAnJztcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCIke2NsYXNzZXN9ICR7dWlDbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAke3VpQXR0cmlidXRlc30gICAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgIDwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LHNldHRpbmdzID0ge30sdGFncyA9IHt9LGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKXtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDppbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQge21lc3NhZ2VzIDogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzIDogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3MgOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBpZihsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31cIiAke3VpQXR0cmlidXRlc30gIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidXJsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29udHJvbHN9IGZyb20gJy4uLy4uL3ZpZGVvL2NvbnRyb2xzL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbHMge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihjb250YWluZXIuaHRtbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKXtcclxuICAgICAgICAgICAgY29udGFpbmVyLmh0bWwodGhpcy5odG1sKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gdGhpcy5odG1sO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHRvdGFsVGltZUluZm9DbGFzc2VzLFxyXG4gICAgICAgICAgICBjdXJyZW50VGltZUluZm9DbGFzc2VzLFxyXG4gICAgICAgICAgICBzY3J1YkJhckNsYXNzZXMsXHJcbiAgICAgICAgICAgIG11dGVDb250cm9sc0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHZvbHVtZUJhckNsYXNzZXMgICAgICAgICAgICBcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnBsYXlQYXVzZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIpO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5mbyA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLWN1cnJlbnQtdGltZVwiKTtcclxuICAgICAgICB0aGlzLnNjcnViQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIik7XHJcbiAgICAgICAgdGhpcy5tdXRlQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIik7XHJcbiAgICAgICAgdGhpcy52b2x1bWVCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3BsYXktcGF1c2UnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2R1cmF0aW9uJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGN1cnJlbnRUaW1lSW5mb0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2N1cnJlbnQtdGltZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBzY3J1YkJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3NjcnViLWJhcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdtdXRlJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndm9sdW1lLWJhcidcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS1wbGF5JztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBhdXNlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtcGF1c2UnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtdm9sdW1lLXVwJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS12b2x1bWUtb2ZmJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiBgdGltZS1sYXBzZWRgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnY3VycmVudC12b2x1bWUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheVBhdXNlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7cGxheUNsYXNzZXMgOiBwbGF5fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMgOiBwbGF5UGF1c2VDb250cm9sc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIiBjbGFzcz1cIiR7cGxheVBhdXNlQ29udHJvbHN9XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPScke3BsYXl9Jz48L2k+XHJcbiAgICAgICAgPC9idXR0b24+YFxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICBnZXQgc2NydWJCYXJIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdGltZXN0YW1wSFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIiBjbGFzcz1cIiR7dGhpcy5jdXJyZW50VGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLXRvdGFsLXRpbWVcIiBjbGFzcz1cIiR7dGhpcy50b3RhbFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG11dGVCdXR0b25IVE1MKCl7XHJcbiAgICAgICAgbGV0IHt1bm11dGVDbGFzc2VzIDogdW5tdXRlLCBtdXRlQ29udHJvbHNDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIiBjbGFzcz1cIiR7bXV0ZUNvbnRyb2xzQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiJHt1bm11dGV9XCI+PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiAgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgcGxheVBhdXNlQnV0dG9uSFRNTCxcclxuICAgICAgICAgICAgc2NydWJCYXJIVE1MLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXBIVE1MLFxyXG4gICAgICAgICAgICBtdXRlQnV0dG9uSFRNTCxcclxuICAgICAgICAgICAgdm9sdW1lQmFySFRNTFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgJHtwbGF5UGF1c2VCdXR0b25IVE1MfVxyXG4gICAgICAgICAgICR7c2NydWJCYXJIVE1MfVxyXG4gICAgICAgICAgICR7dGltZXN0YW1wSFRNTH1cclxuICAgICAgICAgICAke211dGVCdXR0b25IVE1MfVxyXG4gICAgICAgICAgICR7dm9sdW1lQmFySFRNTH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQW5jaG9yIGFzIERlZmF1bHRBbmNob3IgfSBmcm9tICcuLi9kZWZhdWx0L2FuY2hvci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBBbmNob3IgZXh0ZW5kcyBEZWZhdWx0QW5jaG9ye1xuXHRjb25zdHJ1Y3RvcihhbmNob3JJbmZvKXtcblx0XHRzdXBlcihhbmNob3JJbmZvKTtcblx0fVxufSIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xyXG5cclxuY2xhc3MgQ2FyZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGlWWGpzQWN0aW9ucykge1xyXG4gICAgICAgIGxldCB7c2V0dGluZ3MgPSB7fX0gPSAkc2NvcGU7XHJcbiAgICAgICAgbGV0IHtpbWcgPSAnJyx0aXRsZSA9ICcnLGZpcnN0TmFtZSA9ICcnLGRlc2NyaXB0aW9uID0gJycsZXZlbnRzID0gW119ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmJ1dHRvblByZXNzZWQgPSAgKCkgPT57XHJcbiAgICAgICAgICAgIGlWWGpzQWN0aW9ucy5yZXNvbHZlQWN0aW9ucyhldmVudHMsICgpID0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5DYXJkLiRpbmplY3QgPSBbJyRzY29wZScsJ2l2eGpzLmFjdGlvbnMnXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihDYXJkKSIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgeyBJbnB1dENvbnRyb2xsZXJIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9pbnB1dC1jb250cm9sbGVyLmpzJztcclxuXHJcbmNsYXNzIERyb3Bkb3duSW5wdXRDb250cm9sbGVyIGV4dGVuZHMgSW5wdXRDb250cm9sbGVySGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGVsZW1lbnQsIGlWWGpzLCBpVlhqc0FjdGlvbnMpIHtcclxuICAgICAgICBzdXBlcigkc2NvcGUsIGlWWGpzLCBpVlhqc0FjdGlvbnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7ZGVmYXVsdFZhbHVlLCBvcHRpb25zLCBuYW1lLCBzZXR0aW5ncyA9IHt9fSA9ICRzY29wZS5pbnB1dERhdGE7XHJcbiAgICAgICAgbGV0IHtkcm9wZG93biA9IHt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bXVsdGlwbGUgPSBmYWxzZX0gPSBkcm9wZG93bjtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhbXVsdGlwbGUgPyB7XHJcbiAgICAgICAgICAgIHZhbHVlIDogaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdID8gaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdIDogJydcclxuICAgICAgICB9IDogW3tcclxuICAgICAgICAgICAgdmFsdWU6IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtuYW1lXSA/IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtuYW1lXSA6ICcnXHJcbiAgICAgICAgfV07XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9ICh2YWx1ZSkgPT4geyBcclxuICAgICAgICAgICAgbGV0IHtuYW1lLCBvbkNoYW5nZSA9IFtdfSA9ICRzY29wZS5pbnB1dERhdGE7XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gc2VsZWN0ZWQucmVkdWNlKChzZWxlY3RlZFZhbHMsIGN1cnJlbnRWYWwpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0ZWRWYWxzLmxlbmd0aCA8PSAwKSByZXR1cm4gYCR7Y3VycmVudFZhbC52YWx1ZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtzZWxlY3RlZFZhbHN9LCAke2N1cnJlbnRWYWwudmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgfSwgJycpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb25DaGFuZ2UudW5zaGlmdCh7IGV2ZW50TmFtZTogJ3NldERhdGEnLCBhcmdzOiB7IGtleTogbmFtZSwgdmFsdWU6IHZhbHVlLnZhbHVlIH0gfSk7XHJcbiAgICAgICAgICAgIGlWWGpzQWN0aW9ucy5yZXNvbHZlQWN0aW9ucyhvbkNoYW5nZSwgKCkgPT4ge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuRHJvcGRvd25JbnB1dENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJ2lWWGpzJywgJ2l2eGpzLmFjdGlvbnMnXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihEcm9wZG93bklucHV0Q29udHJvbGxlcik7IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBDYXJkRWxlbWVudENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvZWxlbWVudC5jYXJkLmpzJztcclxuaW1wb3J0IHtDYXJkVGVtcGxhdGVzfSBmcm9tICcuLi8uLi9jYXJkLmpzJztcclxuXHJcbmNsYXNzIENhcmQge1xyXG4gICAgY29uc3RydWN0b3IoJGNvbXBpbGUsICR0aW1lb3V0KSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVIVE1MO1xyXG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0aGlzLnJlcXVpcmUgPSBcIl5pdnhqc0Zvcm1JbnB1dFwiO1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzOiAnPXNldHRpbmdzJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDYXJkRWxlbWVudENvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IHNldHRpbmdzID0ge30gfSA9ICRzY29wZTsgXHJcbiAgICAgICAgICAgIGxldCB7Y2FyZFR5cGUsY2xhc3NlcyA9IFwiXCJ9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gbmV3IENhcmRUZW1wbGF0ZXMoJHNjb3BlLnNldHRpbmdzKVtjYXJkVHlwZSArIFwiQ2FyZEhUTUxcIl07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICBpRWxtLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgICAgICRjb21waWxlKGlFbG0uY29udGVudHMoKSkoJHNjb3BlKTtcclxuICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJCgnLnNwZWNpYWwuY2FyZHMgLmltYWdlJykuZGltbWVyKHtcclxuICAgICAgICAgICAgICAgICAgICBvbjogJ2hvdmVyJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0ZW1wbGF0ZUhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwie3tjbGFzc2VzfX1cIj48L2Rpdj5gO1xyXG4gICAgfTtcclxufVxyXG5cclxuQ2FyZC4kaW5qZWN0ID0gWyckY29tcGlsZScsICckdGltZW91dCddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKENhcmQpOyIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgRHJvcGRvd25JbnB1dENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvaW5wdXQuZHJvcGRvd24uanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvbWVzc2FnZXMuZXJyb3IuanMnO1xyXG5cclxuY2xhc3MgRHJvcGRvd25JbnB1dCB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkcm9vdFNjb3BlLCAkY29tcGlsZSwgJGZpbHRlciwgJHRpbWVvdXQsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBpVlhqc0J1cykge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlSFRNTDtcclxuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeaXZ4anNGb3JtSW5wdXRcIjtcclxuICAgICAgICB0aGlzLnNjb3BlID0ge1xyXG4gICAgICAgICAgICBpbnB1dERhdGE6ICc9aW5wdXREYXRhJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRHJvcGRvd25JbnB1dENvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7aW5wdXREYXRhOiBpbnB1dH0gPSAkc2NvcGU7XHJcbiAgICAgICAgICAgIGxldCB7aWQsIGVycm9ycyA9IHt9LCBuYW1lLCBsYWJlbEhUTUwsIGxhYmVsID0gJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGF0dHJpYnV0ZXMgPSB7fSwgb3B0aW9ucywgZGVmYXVsdERpc3BsYXksIGRlZmF1bHRWYWx1ZSwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dDtcclxuICAgICAgICAgICAgbGV0IHtkaXJlY3RpdmVzID0gJyd9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMobmFtZSwgZXJyb3JzLCBhdHRyaWJ1dGVzKTtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGAke2RpcmVjdGl2ZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNoYW5nZT0ndm0ub25DaGFuZ2Uodm0uc2VsZWN0ZWQpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1vcHRpb25zPVwib3B0aW9uLmRpc3BsYXkgZm9yIG9wdGlvbiBpbiBpbnB1dERhdGEub3B0aW9ucyB0cmFjayBieSBvcHRpb24udmFsdWVcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9J3ZtLnNlbGVjdGVkJ2A7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMucmVxdWlyZWQgfHwgZGVmYXVsdERpc3BsYXkpIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWcgPSBkZWZhdWx0RGlzcGxheSA/XHJcbiAgICAgICAgICAgICAgICAgICAgYDxvcHRpb24gdmFsdWU9XCJcIj4ke2RlZmF1bHREaXNwbGF5fTwvb3B0aW9uPmAgOlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zQ2xhc3MgPSBuZXcgaVZYanNVSU1vZHVsZS5kcm9wZG93bihpZCwgbmFtZSwgbGFiZWwgPSBsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbCwgZGVmYXVsdERpc3BsYXksIHNldHRpbmdzLCB0YWdIVE1MLCBlcnJvck1lc3NhZ2VzKTtcclxuXHJcbiAgICAgICAgICAgIGlFbG0uaHRtbChvcHRpb25zQ2xhc3MuaHRtbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodHlwZW9mICQgIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY29tcGlsZShpRWxtLmNvbnRlbnRzKCkpKCRzY29wZSk7XHJcbiAgICAgICAgICAgICQoaUVsbS5maW5kKCdzZWxlY3QnKSkuZHJvcGRvd24oKTtcclxuICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4cGVyaWVuY2VWYWx1ZSA9IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtuYW1lXTtcclxuICAgICAgICAgICAgICAgICQoaUVsbS5maW5kKCdzZWxlY3QnKSkuZHJvcGRvd24oJ3NldCBzZWxlY3RlZCcsIGV4cGVyaWVuY2VWYWx1ZSA/IGV4cGVyaWVuY2VWYWx1ZSAgOicnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRlbXBsYXRlSFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXY+PC9kaXY+YFxyXG4gICAgfTtcclxufVxyXG5cclxuRHJvcGRvd25JbnB1dC4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRjb21waWxlJywgJyRmaWx0ZXInLCAnJHRpbWVvdXQnLCAnaVZYanMnLCAnaXZ4anMubW9kdWxlcy51aScsICdpdnhqcy5idXMnXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihEcm9wZG93bklucHV0KTsiLCJpbXBvcnQgeyBCdXR0b25zIGFzIERlZmF1bHRCdXR0b25zIH0gZnJvbSAnLi4vZGVmYXVsdC9idXR0b25zLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyBleHRlbmRzIERlZmF1bHRCdXR0b25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbnMsIGlucHV0RGF0YSkge1xyXG4gICAgICAgIHN1cGVyKGJ1dHRvbnMsIGlucHV0RGF0YSwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBidXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndWkgYnV0dG9uJztcclxuICAgIH1cclxuXHJcbn07IiwiZXhwb3J0IGNsYXNzIENhcmRUZW1wbGF0ZXMge1xyXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbmlDYXJkSFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBjYXJkc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJyaWdodCBmbG9hdGVkIG1pbmkgdWkgaW1hZ2VcIiBzcmM9XCJ7e3ZtLmltZ319XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3t2bS5maXJzdE5hbWV9fSB7e3ZtLmxhc3ROYW1lfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1ldGFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3t2bS50aXRsZX19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7dm0uZGVzY3JpcHRpb259fVxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4dHJhIGNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBvbmUgYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgbmctY2xpY2s9XCJ2bS5idXR0b25QcmVzc2VkKClcIiBjbGFzcz1cInVpIGJ1dHRvblwiPkJ1eSBpdDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkaW1tZXJDYXJkSFRNTCgpIHtcclxuICAgICAgICBsZXQge2NsYXNzZXN9ID0gdGhpcy5zZXR0aW5ncztcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidWkgc3BlY2lhbCBjYXJkc1wiPiAgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmx1cnJpbmcgZGltbWFibGUgaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBkaW1tZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPVwidm0uYnV0dG9uUHJlc3NlZCgpXCIgY2xhc3M9XCJ1aSBpbnZlcnRlZCBidXR0b25cIj5CdXkgdGhpcyE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbWcgbmctc3JjPVwie3t2bS5pbWd9fVwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiaGVhZGVyXCI+e3t2bS5maXJzdE5hbWV9fSB7e3ZtLmxhc3ROYW1lfX08L2E+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWV0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhPnt7dm0udGl0bGV9fTwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3t2bS5kZXNjcmlwdGlvbn19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7IENoZWNrYm94IGFzIERlZmF1bHRDaGVja2JveCB9IGZyb20gJy4uL2RlZmF1bHQvY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveCBleHRlbmRzIERlZmF1bHRDaGVja2JveCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndWkgY2hlY2tib3gnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJDaGVja2JveENvbnRhaW5lcihjbGFzc2VzLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MfSA9IGlucHV0O1xyXG4gICAgICAgIGlmKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgPGlucHV0ICR7YXR0cmlidXRlc30gPlxyXG4gICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aW5wdXQuaWR9XCI+ICAgIFxyXG4gICAgICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgPC9kaXY+YFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGF0ZSBhcyBEZWZhdWx0RGF0ZSB9IGZyb20gJy4uL2RlZmF1bHQvZGF0ZS5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGUgZXh0ZW5kcyBEZWZhdWx0RGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59IiwiaW1wb3J0IHsgRGF0ZXRpbWVMb2NhbCBhcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbCB9IGZyb20gJy4uL2RlZmF1bHQvZGF0ZXRpbWUtbG9jYWwuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRldGltZUxvY2FsIGV4dGVuZHMgRGVmYXVsdERhdGV0aW1lTG9jYWx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEcm9wZG93biB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgbmFtZSwgbGFiZWwsIGRlZmF1bHREaXNwbGF5LCBzZXR0aW5ncyA9IHt9LCB0YWdIVE1MLCBlcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmRlZmF1bHREaXNwbGF5ID0gZGVmYXVsdERpc3BsYXk7XHJcbiAgICAgICAgdGhpcy50YWdIVE1MID0gdGFnSFRNTDtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBkcm9wZG93bidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBsYWJlbCwgZGVmYXVsdERpc3BsYXksIHNldHRpbmdzLCB1aUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2Ryb3Bkb3duID0gXCJcIn0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge211bHRpcGxlID0gZmFsc2V9ID0gZHJvcGRvd247XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSB0aGlzLmVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgRXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yQXR0cmlidXRlcy5yZXF1aXJlZCB8fCAoZGVmYXVsdERpc3BsYXkgJiYgZGVmYXVsdERpc3BsYXkubGVuZ3RoID49IDApKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWcgPSBkZWZhdWx0RGlzcGxheSA/XHJcbiAgICAgICAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7ZGVmYXVsdERpc3BsYXl9PC9vcHRpb24+YCA6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSBtdWx0aXBsZT1cIlwiYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAgPGxhYmVsPiR7bGFiZWx9PC9sYWJlbD4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHtlcnJvclRhZ3N9ICR7dGhpcy50YWdIVE1MfT5cclxuICAgICAgICAgICAgICAgICAgICAke2RlZmF1bHRPcHRpb25UYWd9XHJcbiAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgRW1haWwgYXMgRGVmYXVsdEVtYWlsIH0gZnJvbSAnLi4vZGVmYXVsdC9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsIGV4dGVuZHMgRGVmYXVsdEVtYWlse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuL3N0eWxlLmpzJztcclxuaW1wb3J0IHsgRm9ybSBhcyBEZWZhdWx0Rm9ybSB9IGZyb20gJy4uL2RlZmF1bHQvZm9ybS5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybSBleHRlbmRzIERlZmF1bHRGb3JtIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncykge1xyXG4gICAgICAgc3VwZXIoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBTdHlsZSk7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGZvcm1DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBmb3JtIGVycm9yJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJzaXh0ZWVuIGZpZWxkIHdpZGUgJHtzdWJtaXRDb250YWluZXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ1aSBidXR0b24gJHtzdWJtaXRJbnB1dENsYXNzZXN9XCIgdHlwZT0nc3VibWl0Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtzdWJtaXRMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcbn07IiwiLy8gRm9ybS9JbnB1dCBIVE1MXHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0uanMnO1xyXG5pbXBvcnQgeyBBbmNob3IgfSBmcm9tICcuL2FuY2hvci5qcyc7XHJcbmltcG9ydCB7IEJ1dHRvbnMgfSBmcm9tICcuL2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBEYXRlIH0gZnJvbSAnLi9kYXRlLmpzJztcclxuaW1wb3J0IHsgRGF0ZXRpbWVMb2NhbCB9IGZyb20gJy4vZGF0ZXRpbWUtbG9jYWwuanMnO1xyXG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJy4vZHJvcGRvd24uanMnO1xyXG5pbXBvcnQgeyBFbWFpbCB9IGZyb20gJy4vZW1haWwuanMnO1xyXG5pbXBvcnQgeyBOdW1iZXIgfSBmcm9tICcuL251bWJlci5qcyc7XHJcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tIFwiLi9vcHRpb25zLmpzXCI7XHJcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSBcIi4vcmFkaW8uanNcIjtcclxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xyXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi90ZXh0LmpzJztcclxuaW1wb3J0IHsgVGV4dGFyZWEgfSBmcm9tICcuL3RleHRhcmVhLmpzJztcclxuaW1wb3J0IHsgVXJsIH0gZnJvbSAnLi91cmwuanMnO1xyXG5cclxuLy9Bbmd1bGFyXHJcbmltcG9ydCBpdnhqc1NlbWFudGljVWlEcm9wZG93bklucHV0IGZyb20gJy4vYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmRyb3Bkb3duLmpzJztcclxuaW1wb3J0IGl2eGpzU2VtYW50aWNVaUNhcmQgZnJvbSAnLi9hbmd1bGFyL2RpcmVjdGl2ZXMvZWxlbWVudC5jYXJkLmpzJztcclxuXHJcbi8vU3RhdGVzXHJcbmltcG9ydCB7IElucHV0U3RhdGUgfSBmcm9tICcuL3N0YXRlLmlucHV0LmpzJztcclxuaW1wb3J0IHsgVmlkZW9TdGF0ZSB9IGZyb20gJy4vc3RhdGUudmlkZW8uanMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU3RhdGUgfSBmcm9tICcuL3N0YXRlLm5hdmlnYXRpb24uanMnO1xyXG5cclxuLy9Db250cm9scyBcclxuaW1wb3J0IFZpZGVvQ29udHJvbHMgZnJvbSAnLi92aWRlby5jb250cm9scy5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VtYW50aWNVSSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZvcm0gPSBGb3JtO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yID0gQW5jaG9yO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IEJ1dHRvbnM7XHJcbiAgICAgICAgdGhpcy5jaGVja2JveCA9IENoZWNrYm94O1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IERhdGU7XHJcbiAgICAgICAgdGhpcy5kYXRldGltZUxvY2FsID0gRGF0ZXRpbWVMb2NhbDtcclxuICAgICAgICB0aGlzLmVtYWlsID0gRW1haWw7XHJcbiAgICAgICAgdGhpcy5udW1iZXIgPSBOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT3B0aW9ucztcclxuICAgICAgICB0aGlzLnJhZGlvID0gUmFkaW87ICAgIFxyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuICAgICAgICB0aGlzLnRleHQgPSBUZXh0O1xyXG4gICAgICAgIHRoaXMudGV4dGFyZWEgPSBUZXh0YXJlYTtcclxuICAgICAgICB0aGlzLnVybCA9IFVybDtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duID0gRHJvcGRvd247XHJcbiAgICAgICAgdGhpcy52aWRlb0NvbnRyb2xzID0gVmlkZW9Db250cm9scztcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcclxuICAgICAgICAgICAgaW5wdXQgOiBJbnB1dFN0YXRlLFxyXG4gICAgICAgICAgICB2aWRlbyA6IFZpZGVvU3RhdGUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb24gOiBOYXZpZ2F0aW9uU3RhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmd1bGFyID0ge1xyXG4gICAgICAgICAgICBpdnhqc1NlbWFudGljVWlEcm9wZG93bklucHV0IDogaXZ4anNTZW1hbnRpY1VpRHJvcGRvd25JbnB1dCxcclxuICAgICAgICAgICAgaXZ4anNTZW1hbnRpY1VpQ2FyZCA6IGl2eGpzU2VtYW50aWNVaUNhcmRcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydCA9IGluaXRpYWxpemVTZW1hbnRpY1VJO1xyXG5cclxuaWYgKGFuZ3VsYXIgJiYgYW5ndWxhci5tb2R1bGUoJ2l2eC1qcycpKSB7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaXZ4LWpzJylcclxuICAgICAgICAuY29uc3RhbnQoJ2lWWGpzLnVpLnNlbWFudGljLXVpJywgaW5pdGlhbGl6ZVNlbWFudGljVUkpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZVNlbWFudGljVUkoKXtcclxuICAgIHJldHVybiBTZW1hbnRpY1VJXHJcbn0iLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VzIGFzIERlZmF1bHRFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4uL2RlZmF1bHQvbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIGV4dGVuZHMgRGVmYXVsdEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JNZXNzYWdlcyA9IFtdKXsgICAgICAgXHJcbiAgICAgICBzdXBlcihlcnJvck1lc3NhZ2VzKTsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtZXNzYWdlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgZXJyb3IgbWVzc2FnZSc7XHJcbiAgICB9XHJcbiAgICBcclxufTsiLCJpbXBvcnQgeyBOdW1iZXIgYXMgRGVmYXVsdE51bWJlciB9IGZyb20gJy4uL2RlZmF1bHQvbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgRGVmYXVsdE51bWJlcntcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59O1xyXG4iLCJpbXBvcnQgeyBPcHRpb25zIGFzIERlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi4vZGVmYXVsdC9vcHRpb25zLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9ucyBleHRlbmRzIERlZmF1bHRPcHRpb25ze1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGRyb3Bkb3duJztcclxuICAgIH1cclxufTsiLCJpbXBvcnQge1JhZGlvIGFzIERlZmF1bHRSYWRpb30gZnJvbSAnLi4vZGVmYXVsdC9yYWRpby5qcyc7XHJcbmltcG9ydCB7RXJyb3JNZXNzYWdlc30gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIERlZmF1bHRSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFzQ29ycmVjdFJhZGlvQ2xhc3MoY2xhc3Nlcyl7XHJcbiAgICAgICAgbGV0IHZhbGlkUmFkaW9DbGFzc2VzID0gW1xyXG4gICAgICAgICAgICBcInJhZGlvXCIsIFwidG9nZ2xlXCIsIFwic2xpZGVyXCJcclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCBoYXNWYWxpZENsYXNzID0gZmFsc2U7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIHZhbGlkUmFkaW9DbGFzc2VzLmZvckVhY2goKHZhbGlkQ2xhc3MpID0+e1xyXG4gICAgICAgICAgICBpZihoYXNWYWxpZENsYXNzKSByZXR1cm47ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhhc1ZhbGlkQ2xhc3MgPSAoY2xhc3Nlcy5pbmRleE9mKHZhbGlkQ2xhc3MpID49IDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBoYXNWYWxpZENsYXNzOyAgICBcclxuICAgIH1cclxuXHJcbiAgICB1aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgdWlDbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGlzVmFsaWRSYWRpb0NsYXNzID0gdGhpcy5oYXNDb3JyZWN0UmFkaW9DbGFzcyh1aUNsYXNzZXMpO1xyXG4gICAgXHJcbiAgICAgICAgaWYoIWlzVmFsaWRSYWRpb0NsYXNzKSB1aUNsYXNzZXMgPSBgJHt1aUNsYXNzZXN9IHJhZGlvYDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpICR7dWlDbGFzc2VzfSBjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgJHtyYWRpb0hUTUx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCwgdmFsdWUpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZH0gPSBpbnB1dDtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiICR7YXR0ckhUTUx9PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH0ke3ZhbHVlLmxlbmd0aCA+IDAgPyAnLScrdmFsdWU6ICcnfVwiPiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIGA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0lucHV0U3RhdGUgYXMgRGVmYXVsdElucHV0U3RhdGV9IGZyb20gJy4uL2RlZmF1bHQvc3RhdGUuaW5wdXQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0U3RhdGUgZXh0ZW5kcyBEZWZhdWx0SW5wdXRTdGF0ZSB7IFxyXG4gICAgY29uc3RydWN0b3IoaGVhZGVyLCBmb3JtU2VjdGlvbiwgZm9vdGVyLCBkYXRhKXtcclxuICAgICAgICBzdXBlcihoZWFkZXIsIGZvcm1TZWN0aW9uLCBmb290ZXIsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBjb250YWluZXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGhlYWRlcic7XHJcbiAgICB9ICBcclxufTsiLCJpbXBvcnQge05hdmlnYXRpb25TdGF0ZSBhcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIGV4dGVuZHMgRGVmYXVsdE5hdmlnYXRpb25TdGF0ZSB7ICAgICBcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbil7XG4gICAgICAgIHN1cGVyKGRhdGEsIGxpbmtTZWN0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJ3VpIGNvbnRhaW5lcic7XG4gICAgfVxuICAgIFxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJ3VpIGhlYWRlcic7XG4gICAgfVxufTsiLCJleHBvcnQgY2xhc3MgVmlkZW9TdGF0ZSB7IFxyXG4gICAgY29uc3RydWN0b3IocGxheWVyU2VjdGlvbiwgZGF0YSl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJTZWN0aW9uID0gcGxheWVyU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpUGhvbmVJbmxpbmVDbGFzc2VzKCl7XHJcbiAgICAgICAgbGV0IHtpc0lwaG9uZSA9IGZhbHNlfSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzSXBob25lID8gJ2lwaG9uZS1pbmxpbmUnIDogJyc7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgaGVhZGVyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGh0bWwoKSB7ICAgXHJcbiAgICAgICAgbGV0IHtwbGF5ZXJTZWN0aW9uLCBkYXRhLCBpUGhvbmVJbmxpbmVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGA8aDE+JHtkYXRhLm5hbWV9PC9oMT5gfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbCA6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1aSBjb250YWluZXIgJHtzZWN0aW9uQ2xhc3Nlc30gJHtpUGhvbmVJbmxpbmVDbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHt0aGlzLmRlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7cGxheWVyU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufTsiLCJleHBvcnQgY2xhc3MgU3R5bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldElucHV0Q29udGFpbmVyQ2xhc3NOYW1lcyhzZXR0aW5ncykge1xyXG4gICAgICAgIGlmICghc2V0dGluZ3MpIHNldHRpbmdzID0ge307XHJcblxyXG4gICAgICAgIGxldCB7Y29udGFpbmVyQ2xhc3MgPSAnZmllbGQnLCBjbGFzc2VzID0gJyd9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtjb250YWluZXJDbGFzc30gJHtjbGFzc2VzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2lkdGhDbGFzc2VzKGlucHV0SFRNTCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50V2lkdGhUb3RhbCA9IDAuMDtcclxuICAgICAgICBsZXQgY29sdW1ucyA9IHtzdHJpbmc6IFwidHdlbHZlXCIsIG51bWJlcjogMTJ9O1xyXG4gICAgICAgIGxldCBjb2x1bW5OYW1lcyA9IFtcIm9uZVwiLCBcInR3b1wiLCBcInRocmVlXCIsIFwiZm91clwiLCBcImZpdmVcIiwgXCJzaXhcIiwgXCJzZXZlblwiLCBcImVpZ2h0XCIsIFwibmluZVwiICxcInRlblwiLCBcImVsZXZlblwiLCBcInR3ZWx2ZVwiLCBcInRoaXJ0ZWVuXCIsIFwiZm91cnRlZW5cIiwgXCJmaWZ0ZWVuXCIsIFwic2l4dGVlblwiXVxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0SFRNTC5yZWR1Y2UoKGNvbnRlbnRIVE1MLCB0aGlzSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5nc30gPSB0aGlzSW5wdXQ7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSBcIjFcIiwgY29udGFpbmVyID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnIH0gPSBjb250YWluZXI7XHJcbiAgICAgICAgICAgIGxldCBudW1lcmljV2lkdGggPSBnZXROdW1lcmljV2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PGRpdiBjbGFzcz1cInN0YWNrYWJsZSBmaWVsZHNcIj4gYFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50V2lkdGhUb3RhbCArPSBudW1lcmljV2lkdGg7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VtYW50aWNVSXdpZHRoID0gY29sdW1uTmFtZXNbTWF0aC5yb3VuZChudW1lcmljV2lkdGggKiBjb2x1bW5OYW1lcy5sZW5ndGgpIC0gMV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCdpdnhqcy1ncmlkLTEtMScsIGAke3NlbWFudGljVUl3aWR0aH0gd2lkZSBmaWVsZCAke2NsYXNzZXN9YCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9JHtodG1sfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudEhUTUw7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNvbnRlbnRzLnN1YnN0cmluZyhjb250ZW50cy5sZW5ndGggLSA3KSAhPT0gXCI8L2Rpdj5cIil7XHJcbiAgICAgICAgICAgIGNvbnRlbnRzID0gYCR7Y29udGVudHN9PC9kaXY+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXROdW1lcmljV2lkdGgod2lkdGhTdHJpbmcpe1xyXG4gICAgICAgICAgICBpZih3aWR0aFN0cmluZyA9PT0gJzEnKSByZXR1cm4gMTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJzZWRXaWR0aEZvcm11bGEgPSB3aWR0aFN0cmluZy5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzBdKSAvIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzFdKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBUZXh0IGFzIERlZmF1bHRUZXh0IH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIERlZmF1bHRUZXh0e1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07IiwiaW1wb3J0IHsgVGV4dGFyZWEgYXMgRGVmYXVsdFRleHRhcmVhIH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0YXJlYS5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgRGVmYXVsdFRleHRhcmVhe1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07IiwiaW1wb3J0IHsgVXJsIGFzIERlZmF1bHRVcmwgfSBmcm9tICcuLi9kZWZhdWx0L3VybC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVybCBleHRlbmRzIERlZmF1bHRVcmx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgRGVmYXVsdFZpZGVvQ29udHJvbHMgZnJvbSAnLi4vZGVmYXVsdC92aWRlby5jb250cm9scy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIERlZmF1bHRWaWRlb0NvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaVZYanNCdXMpIHtcclxuICAgICAgICBzdXBlcihjb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3RhbFRpbWVJbmZvQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2R1cmF0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdwbGF5IGljb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdwYXVzZSBpY29uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VubXV0ZSBpY29uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdtdXRlIGljb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBpY29uIGJ1dHRvbiBwbGF5LXBhdXNlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VpIGljb24gYnV0dG9uIG11dGUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBzbWFsbCBwcm9ncmVzcyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyVGltZUxhcHNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gYGJhcmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYHVpIHNtYWxsIHByb2dyZXNzYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYGJhcmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYCAgICAgIFxyXG4gICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiIGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtaW4td2lkdGg6MFwiIGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nbGFiZWwnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMudGltZXN0YW1wSFRNTH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2b2x1bWVCYXJIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIiBjbGFzcz1cInByb2dyZXNzICR7dGhpcy52b2x1bWVCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1pbi13aWR0aDowXCIgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQnV0dG9uSFRNTCwgc2NydWJCYXJIVE1MLCB0aW1lc3RhbXBIVE1MLCBtdXRlQnV0dG9uSFRNTCwgdm9sdW1lQmFySFRNTH0gPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICR7c2NydWJCYXJIVE1MfVxyXG4gICAgICAgICR7cGxheVBhdXNlQnV0dG9uSFRNTH1cclxuICAgICAgICAke211dGVCdXR0b25IVE1MfVxyXG4gICAgICAgICR7dm9sdW1lQmFySFRNTH1gO1xyXG4gICAgfVxyXG59OyIsIi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3Qgd2l0aCBhdHRyaWJ1dGVzIGFuZCBrZXlzIGludG8gSFRNTFxyXG4gKiB0aGF0IGlucHV0cyBjYW4gYmUgdXNlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVUYWdzIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBQdWxscyBhbGwgdGhlIGF0dHJpYnV0ZSBzZXR0aW5ncyBhbmQgdGhlIGF0dHJpYnV0ZXMgXHJcbiAgICAgKiB0byBiZSByZW5kZXJlZC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVEYXRhIC0gc2V0dGluZ3MgZm9yIGFsbCB0aGUgYXR0cmlidXRlcy5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGF0dHJpYnV0ZUtleXMgLSBhdHRyaWJ1dGUgbmFtZXMgdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVEYXRhID0ge30sIGF0dHJpYnV0ZUtleXMgPSBbXSl7XHJcbiAgICAgICBcclxuICAgICAgIC8qKlxyXG4gICAgICAgICogQWxsIGF0dHJpYnV0ZXMgdG8gYmUgbWFkZS5cclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKi9cclxuICAgICAgIHRoaXMuYXR0cmlidXRlRGF0YSA9IGF0dHJpYnV0ZURhdGE7XHJcbiAgICAgICBcclxuICAgICAgIC8qKlxyXG4gICAgICAgICogQXR0cmlidXRlIG5hbWVzIHRvIGJlIHNldC5cclxuICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5hdHRyaWJ1dGVLZXlzID0gYXR0cmlidXRlS2V5cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgYXR0cmlidXRlcyBiYXNlZCBvbiB0aGUga2V5cyBhbmQgYXR0cmlidXRlIGRhdGEuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYXR0cmlidXRlRGF0YSA9IHsgcmVxdWlyZWQgPSBcInRydWVcIn07XHJcbiAgICAgKiBhdHRyaWJ1dGVLZXlzID0gW1wicmVxdWlyZWRcIl07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEJlY29tZXM6IFxyXG4gICAgICogaHRtbCA9ICdyZXF1aXJlZCA9IFwidHJ1ZVwiJ1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGxldCB7YXR0cmlidXRlS2V5cywgYXR0cmlidXRlRGF0YX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVIVE1MID0gYXR0cmlidXRlS2V5cy5yZWR1Y2UoIChjdXJyZW50QXR0cmlidXRlSFRNTCwgY3VycmVudEtleSkgPT57XHJcblxyXG4gICAgICAgICAgICBpZihhdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldKXtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVUYWdIVE1MID0gYXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XSA9PT0gJ3RhZy1vbmx5JyA/IFxyXG4gICAgICAgICAgICAgICAgY3VycmVudEtleSA6XHJcbiAgICAgICAgICAgICAgICBgJHtjdXJyZW50S2V5fT1cIiR7YXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XX1cImBcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y3VycmVudEF0dHJpYnV0ZUhUTUx9ICR7YXR0cmlidXRlVGFnSFRNTH0gYDtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBdHRyaWJ1dGVIVE1MO1xyXG4gICAgICAgIH0sICcnKTsgICBcclxuICAgICAgICByZXR1cm4gYXR0cmlidXRlSFRNTDtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgVmlkZW9TZXR0aW5ncyBmcm9tICcuLi9zZXR0aW5ncy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb250cnVjdG9yKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudHRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUEFVU0UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldER1cmF0aW9uKGNiKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5vbmNlKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VUX0RVUkFUSU9OLCAoZHVyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgY2IoZHVyYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkdFVF9EVVJBVElPTik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Vm9sdW1lKHZvbHVtZSkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFVF9WT0xVTUUsIHZvbHVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VlayhzZWNvbmRzKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VFSywgc2Vjb25kcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29udHJvbEV2ZW50cyBmcm9tICcuL2V2ZW50cy5qcyc7XHJcbmltcG9ydCBWaWRlb0V2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy92aWRlby5ldmVudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9scyBleHRlbmRzIENvbnRyb2xFdmVudHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5jb250cm9sRXZlbnROYW1lcyA9IG5ldyBWaWRlb0V2ZW50TmFtZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdGhpcy51cGRhdGVUaW1lKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHRoaXMud2hpbGVQbGF5aW5nKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkNBTl9QTEFZLCB0aGlzLmNhblBsYXlDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHJlbGF0aXZlUG9zaXRpb24gPSB7IHg6IGVsZW1lbnQub2Zmc2V0TGVmdCwgeTogZWxlbWVudC5vZmZzZXRUb3AgfTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudC5vZmZzZXRQYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgcmVsYXRpdmVQb3NpdGlvbi54ICs9IHRlbXBQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICByZWxhdGl2ZVBvc2l0aW9uLnkgKz0gdGVtcFBvc2l0aW9uLnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVsYXRpdmVQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBhZGp1c3RWb2x1bWUoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3ZvbHVtZUJhciwgbXV0ZUNvbnRyb2xzLCBjdXJyZW50Vm9sdW1lLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3NlcywgdW5tdXRlQ2xhc3NlcywgbXV0ZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge29mZnNldFdpZHRoOiB3aWR0aCB9ID0gdm9sdW1lQmFyO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG4gICAgICAgIGxldCBhYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKHZvbHVtZUJhcik7XHJcbiAgICAgICAgbGV0IHt4OiBhYnNvbHV0ZVh9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHZvbHVtZUxldmVsID0gKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3ZvbHVtZUxldmVsICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSB2b2x1bWVMZXZlbDtcclxuICAgICAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NydWIoZXZlbnQpIHtcclxuICAgICAgICBsZXQge2N1cnJlbnRUaW1lSW5mbywgc2NydWJCYXIsIHNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7b2Zmc2V0V2lkdGg6IHdpZHRofSA9IHNjcnViQmFyO1xyXG4gICAgICAgIGxldCBhYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKHNjcnViQmFyKTtcclxuICAgICAgICBsZXQge3g6IGFic29sdXRlWH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgc2NydWJUb1RpbWUgPSB0aGlzLmR1cmF0aW9uICogKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZU9iamVjdCA9IHRoaXMuY29udmVydFNlY29uZHNUb1BhcnRzKHNjcnViVG9UaW1lKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHRpbWVsYXBzZWQgPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoc2NydWJCYXIuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG4gICAgICAgIHRpbWVsYXBzZWQuc3R5bGUud2lkdGggPSBgJHsodHJ1ZVggLyB3aWR0aCkgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuc2VlayhzY3J1YlRvVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheVBhdXNlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2ggKHBsYXlQYXVzZUljb24uY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgcGxheUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHBhdXNlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE11dGUoZXZlbnQpIHtcclxuICAgICAgICBsZXQge211dGVDb250cm9scywgbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIHZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgbXV0ZUNvbnRyb2xzQ2xhc3Nlcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobXV0ZUljb24uY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgdW5tdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IG11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgMCVgO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5VG9QbGF5KHBsYXllciwgc3RhdGVEYXRhKSB7XHJcbiAgICAgICAgbGV0IHt2b2x1bWVCYXIsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7c2VsZi5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKHNlbGYuY3VycmVudFZvbHVtZSk7XHJcbiAgICAgICAgdGhpcy5nZXREdXJhdGlvbigoZHVyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgbGV0IHt0b3RhbFRpbWVJbmZvLCBjdXJyZW50VGltZUluZm8sIHNjcnViQmFyfSA9IHNlbGY7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvblRpbWVPYmplY3QgPSBzZWxmLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvblRpbWVTdGFtcCA9IHNlbGYuY3JlYXRlVGltZVN0YW1wKGR1cmF0aW9uVGltZU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmR1cmF0aW9uID0gZHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxUaW1lSW5mbykgdG90YWxUaW1lSW5mby5pbm5lckhUTUwgPSBgLyR7ZHVyYXRpb25UaW1lU3RhbXB9YDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lSW5mbykgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAwMDowMGA7XHJcbiAgICAgICAgICAgIGlmIChzY3J1YkJhcikgc2NydWJCYXIuY2hpbGRyZW5bMF0uc3R5bGUud2lkdGggPSBgMCVgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZVVwZGF0ZShwbGF5ZXIpIHtcclxuICAgICAgICBsZXQge2N1cnJlbnRUaW1lSW5mbywgc2NydWJCYXIsIHNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWU6IHNlY29uZHN9ID0gcGxheWVyO1xyXG5cclxuICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyA+IHRoaXMuZHVyYXRpb24gPyAwIDogc2Vjb25kcztcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lT2JqZWN0ID0gdGhpcy5jb252ZXJ0U2Vjb25kc1RvUGFydHMoc2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lU3RhbXAgPSB0aGlzLmNyZWF0ZVRpbWVTdGFtcChjdXJyZW50VGltZU9iamVjdCk7XHJcbiAgICAgICAgbGV0IHRpbWVMYXBzZWQgPSBzZWNvbmRzIC8gdGhpcy5kdXJhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lSW5mbykgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAke2N1cnJlbnRUaW1lU3RhbXB9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXNdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzY3J1YkJhcikge1xyXG4gICAgICAgICAgICBsZXQgdGltZWxhcHNlZEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoc2NydWJCYXIuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRpbWVsYXBzZWRFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7dGltZUxhcHNlZCAqIDEwMH0lYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5aW5nKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgc2VhcmNoQ2xhc3Nlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhdXNlZCgpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIHNlYXJjaENsYXNzZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBsYXlDbGFzc2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhpVlhqc0J1cykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge3NjcnViQmFyLCB2b2x1bWVCYXIsIHBsYXlQYXVzZUNvbnRyb2xzLCBtdXRlQ29udHJvbHN9ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cyA9IGlWWGpzQnVzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuVElNRV9VUERBVEUsIHVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIHRoaXMud2hpbGVQYXVzZWQgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBBVVNFRCwgd2hpbGVQYXVzZWQpO1xyXG4gICAgICAgIHRoaXMud2hpbGVQbGF5aW5nID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZSU5HLCB3aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIHRoaXMuY2FuUGxheUNhbGxiYWNrID0gIGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIGNhblBsYXlDYWxsQmFjayk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gdGhpcy51cGRhdGVUaW1lID8gdGhpcy51cGRhdGVUaW1lIDogdXBkYXRlVGltZTtcclxuICAgICAgICBcclxuICAgICAgICB2b2x1bWVCYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuYWRqdXN0Vm9sdW1lKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzY3J1YkJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNjcnViKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5UGF1c2VDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0UGxheVBhdXNlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtdXRlQ29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRNdXRlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBjYW5QbGF5Q2FsbEJhY2socGxheWVyLCBfc3RhdGVEYXRhKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25SZWFkeVRvUGxheShwbGF5ZXIsIF9zdGF0ZURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWUocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25UaW1lVXBkYXRlKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3aGlsZVBhdXNlZChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5vblBhdXNlZChwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hpbGVQbGF5aW5nKCkge1xyXG4gICAgICAgICAgICBzZWxmLm9uUGxheWluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtZW50QnlDbGFzc2VzKGVsZW1lbnRzLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRBcnJheSA9IGVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkgP1xyXG4gICAgICAgICAgICBlbGVtZW50cyA6XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZWxlbWVudHMpO1xyXG4gICAgICAgIGxldCB0aGlzRWxlbWVudDtcclxuXHJcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKChjbGFzc05hbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2xhc3NOYW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpc0VsZW1lbnQgPSBlbGVtZW50QXJyYXkuZmluZCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgPj0gMDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRpbWVTdGFtcCh0aW1lT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHtob3VycywgcmVtYWluaW5nTWludXRlczogbWludXRlcywgcmVtYWluaW5nU2Vjb25kczogc2Vjb25kc30gPSB0aW1lT2JqZWN0O1xyXG4gICAgICAgIGxldCBob3VyU3RyaW5nID0gJyc7XHJcbiAgICAgICAgbGV0IG1pbnV0ZVN0cmluZyA9IG1pbnV0ZXMgPCAxMCA/XHJcbiAgICAgICAgICAgIGAwJHttaW51dGVzfTpgIDpcclxuICAgICAgICAgICAgYCR7bWludXRlc306YDtcclxuICAgICAgICBsZXQgc2Vjb25kU3RyaW5nID0gc2Vjb25kcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke3NlY29uZHN9YCA6XHJcbiAgICAgICAgICAgIGAke3NlY29uZHN9YDtcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgICAgICBob3VyU3RyaW5nID0gaG91cnMgPCAxMCA/XHJcbiAgICAgICAgICAgICAgICBgMCR7aG91cnN9OmAgOlxyXG4gICAgICAgICAgICAgICAgYCR7aG91cnN9OmA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2hvdXJTdHJpbmd9JHttaW51dGVTdHJpbmd9JHtzZWNvbmRTdHJpbmd9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0U2Vjb25kc1RvUGFydHMoc2Vjb25kcykge1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGxldCB0aW1lSW5mb3JtYXRpb24gPSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXHJcbiAgICAgICAgICAgIGhvdXJzOiBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCksXHJcbiAgICAgICAgICAgIHJlbWFpbmluZ1NlY29uZHM6IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nTWludXRlczogTWF0aC5mbG9vcihtaW51dGVzICUgNjApLFxyXG4gICAgICAgICAgICBzZWNvbmRzOiBzZWNvbmRzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGltZUluZm9ybWF0aW9uO1xyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNze1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBQbGF5ZXJDb250cm9sRXZlbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwicGxheVwiIDogJ2lWWDp2aWRlbzpwbGF5JyxcclxuICAgICAgICAgICAgXCJwYXVzZVwiIDogJ2lWWDp2aWRlbzpwYXVzZScsXHJcbiAgICAgICAgICAgIFwic2Vla1wiIDogJ2lWWDp2aWRlbzpzZWVrZWQnLFxyXG4gICAgICAgICAgICBcInBsYXlpbmdcIiA6IFwiaVZYOnZpZGVvOnBsYXlpbmdcIixcclxuICAgICAgICAgICAgXCJlbmRlZFwiIDogXCJpVlg6dmlkZW86ZW5kZWRcIixcclxuICAgICAgICAgICAgXCJwYXVzZWRcIiA6IFwiaVZYOnZpZGVvOnBhdXNlZFwiLFxyXG4gICAgICAgICAgICBcInNldFZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnLFxyXG4gICAgICAgICAgICBcImR1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpyZXF1ZXN0RHVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJnZXREdXJhdGlvblwiIDogXCJpVlg6dmlkZW86Z2V0RHVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJjYW5QbGF5XCIgOiBcImlWWDp2aWRlbzpjYW5wbGF5XCIsXHJcbiAgICAgICAgICAgIFwidGltZVVwZGF0ZVwiIDogXCJpVlg6dmlkZW86dGltZXVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBcImRpc3Bvc2VcIiA6IFwiaVZYOnZpZGVvOmRpc3Bvc2VcIixcclxuICAgICAgICAgICAgXCJ2b2x1bWVcIiA6ICdpVlg6dmlkZW86c2V0Vm9sdW1lJyAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGxvZykge1xuXHRcdHRoaXMubG9nID0gbG9nXG5cdH1cblxuXHRhc3NlcnQodGVzdCwgbmFtZSwgbWVzc2FnZSkge1xuXHRcdGxldCB7bG9nfSA9IHRoaXM7XG5cdFx0bGV0IHtzaG93OiBkZWJ1Z30gPSBsb2c7XG5cblx0XHRpZiAoIXRlc3QpIHtcblx0XHRcdGxldCBlcnJvck9iaiA9IHsgXG5cdFx0XHRcdG1lc3NhZ2UgOiBgJHtuYW1lfSBpcyBpbnZhbGlkOiAke21lc3NhZ2V9LmBcblx0XHRcdH07XG5cblx0XHRcdGlmKGRlYnVnKXtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoZXJyb3JPYmosIFwiQVNTRVJUXCIpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3JPYmoubWVzc2FnZSk7XG5cdFx0XHR9IFxuXHRcdH1cblxuXHRcdHJldHVybiB0ZXN0O1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFR5cGVWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3RyaW5nKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGdW5jdGlvbihvYmope1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNOdW1iZXIob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQm9vbGVhbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8ICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnZhbHVlT2YoKSA9PT0gJ2Jvb2xlYW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KG9iaikge1xyXG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbiAgICAgICAgbGV0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG9iaik7XHJcbiAgICAgICAgbGV0IGlzU3RyaW5nID0gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XHJcbiAgICAgICAgbGV0IGNoZWNrTGVuZ3RoID0gaXNBcnJheSB8fCBpc1N0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNOYU4ob2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBhcnNlcnMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHlvdSB0byBtYXAgYW4gb2JqZWN0IGJ5IHRoZSBrZXlzIG9mIGEgZ2l2ZW4gb2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIG9iamVjdCB0byBtYXA7XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIHJ1biBieSBlYWNoIHZhbHVlIGFuZCBrZXkgIFxyXG4gICAgICovXHJcbiAgICBtYXBLZXlzKG9iamVjdCwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuICAgICAgICBsZXQgbWFwcGVkQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWR1Y2VNYXApIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIG1hcHBlZEFycmF5LnB1c2goY2FsbGJhY2sodmFsLCBrZXkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKGJhc2UsIG1lcmdlZCwgaWdub3JlKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEtleXMgPSBPYmplY3Qua2V5cyhtZXJnZWQpO1xyXG4gICAgICAgIGxldCB1bmlvbmVkT2JqZWN0ID0gbmV3IE9iamVjdChiYXNlKTtcclxuXHJcbiAgICAgICAgbWVyZ2VkS2V5cy5mb3JFYWNoKChtZXJnZWRLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpZ25vcmUgJiYgaWdub3JlLmluZGV4T2YobWVyZ2VkS2V5KSA+PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHVuaW9uZWRPYmplY3RbbWVyZ2VkS2V5XSA9IG1lcmdlZFttZXJnZWRLZXldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5pb25lZE9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZWR1Y2Uob2JqZWN0LCBjYWxsYmFjaywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gY2FsbGJhY2soZGVmYXVsdFZhbHVlLCB2YWwsIGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVyYXRlcyB0aHJvdWdoIGEgY29sbGVjdGlvbiB0byBmaW5kIGlmIGFueSBvZiB0aGUgdmFsdWVzIFxyXG4gICAgICogd2l0aCB0aGUga2V5cyBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgYW55RW1wdHkoY29sbGVjdGlvbiwga2V5cykge1xyXG4gICAgICAgIGxldCBoYXNFbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGVsZW1lbnRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5pc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5pbmRleE9mKGVsZW1lbnQpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrRWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0VsZW1lbnRLZXlzID0gT2JqZWN0LmtleXMoY2hlY2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudEtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gY2hlY2tFbGVtZW50W2tleV0gPT09IGVsZW1lbnRba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hlY2tFbGVtZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudC5mb3JFYWNoKCh0ZXN0RWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSB0ZXN0RWxlbWVudCA9PT0gYXJyYXlFbGVtZW50W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZShvYmplY3QsIHBhdGgsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGEgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIG8gPSBvYmplY3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbiA9IGFbaV07XHJcbiAgICAgICAgICAgIGlmIChuIGluIG8pIHtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb1tuXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb1thW2EubGVuZ3RoIC0gMV1dID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWVGcm9tUGF0aChwYXRoLCBvYmplY3QpIHtcclxuICAgICAgICBsZXQgcGF0aFBhcnRzID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBvYmplY3Q7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICBwYXRoUGFydHMuZm9yRWFjaCgocGF0aFBhcnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkocGF0aFBhcnQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gb2xkRGF0YVtwYXRoUGFydF07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGN1cnJlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgb2xkRGF0YSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpbiBhbiBhcnJheSBvZiBvYmplY3RzIHRvIHNlZSBpZiB0aGUgdmFsdWVzIFxyXG4gICAgICogYXQgdGhlIGtleXMgaXMgdW5pcXVlIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRpY2F0aW5nIFxyXG4gICAgICogaWYgdGhleSBhcmUgdW5pcXVlIGFuZCBhbnkgZXJyb3JzIHRoYXQgZG9uJ3QgbWF0Y2ggZm9yIFxyXG4gICAgICogY29ycmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgaXNVbmlxdWUoY29sbGVjdGlvbiA9IFtdLCBrZXlzID0gW10pIHtcclxuICAgICAgICBsZXQgaGFzVW5pcXVlID0ge1xyXG4gICAgICAgICAgICBpc1VuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFsbFVuaXF1ZVZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0gPSBbXTtcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdFVuaXF1ZSA9IHNlbGYuaGFzKGFsbFVuaXF1ZVZhbHVlc1trZXldLCBlbGVtZW50W2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3RVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmlzVW5pcXVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldLnB1c2goZWxlbWVudFtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc1VuaXF1ZTtcclxuICAgIH1cclxufTsiXX0=
