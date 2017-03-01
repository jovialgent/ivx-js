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

            iVXjsActions.resolveActions(onChange, function () {});
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
            return ['min', 'max', 'readonly', 'placeholder', 'step', 'readonly'];
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
            return " \n        <label class=\"" + uiClasses + "\">\n        " + radioHTML + "\n        </label>";
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

            var radiosHTML = radios.reduce(function (html, radio) {
                var label = radio.label,
                    _radio$attrHTML = radio.attrHTML,
                    attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML,
                    _radio$classes = radio.classes,
                    classes = _radio$classes === undefined ? '' : _radio$classes;


                attrHTML = attrHTML + " " + errorTags;

                var radioHTML = self.renderRadioHTML(attrHTML, label);

                return html + "\n            " + self.uiRadioButtonContainer(radioHTML, uiClasses + " " + classes);
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
            return '\n         <div class="' + classes + '">\n            <input ' + attributes + ' >\n             <label>    \n                ' + label + '\n            </label>\n         </div>';
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
        value: function renderRadioHTML(attrHTML, label) {
            return "\n          <input type=\"radio\" " + attrHTML + ">\n                   <label>   \n                     " + label + "\n          </label>\n          ";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvdmlkZW8uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2RhdGV0aW1lLWxvY2FsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9lbWFpbC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZm9ybS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvbWVzc2FnZXMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L251bWJlci5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvcmFkaW8uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdHlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdGV4dC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3VybC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdmlkZW8uY29udHJvbHMuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmNob3IuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2NvbnRyb2xsZXJzL2VsZW1lbnQuY2FyZC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQuZHJvcGRvd24uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2RpcmVjdGl2ZXMvZWxlbWVudC5jYXJkLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmRyb3Bkb3duLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2NhcmQuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2Ryb3Bkb3duLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9mb3JtLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvaW5kZXguanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL251bWJlci5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvZXZlbnRzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy92aWRlby9zZXR0aW5ncy5qcyIsInNyYy91dGlsaXRpZXMvYXNzZXJ0cy5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLHFCO0FBQVQsU0FBUyxxQkFBVCxDQUErQixXQUEvQixFQUE0QztBQUMxRCxLQUFJLGdCQUFnQixXQUFwQjtBQUNBLEtBQUksT0FBTyxjQUFjLE9BQXpCO0FBQ0EsS0FBSSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBYTtBQUFBLG9DQUFULElBQVM7QUFBVCxPQUFTO0FBQUE7O0FBQy9CLDRDQUFXLGFBQVgsZ0JBQTRCLElBQTVCO0FBQ0gsRUFGRDs7QUFJQSxNQUFLLElBQUwsQ0FBVSxlQUFWOztBQUVBLFFBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7O0FDVkQ7Ozs7QUFDQSxJQUFJLGtCQUFrQixnQ0FBdEI7O0lBRWEscUIsV0FBQSxxQixHQUNULCtCQUFZLE1BQVosRUFBb0IsS0FBcEIsRUFBMkIsWUFBM0IsRUFBeUM7QUFBQTs7QUFBQSxRQUNy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LENBQUosRUFBd0M7QUFDcEMsa0NBQWMsV0FBZDtBQUNBO0FBQ0g7O0FBRUQsOEJBQWMsV0FBZDtBQUNBLDBCQUFVLFdBQVY7QUFDSCxhQVhEOztBQWFBLG1CQUFPLFdBQVA7QUFDSDs7QUFJRDs7Ozs7Ozs7O21DQU1xQztBQUFBLGdCQUE1QixVQUE0Qix1RUFBZixFQUFlO0FBQUEsZ0JBQVgsSUFBVyx1RUFBSixFQUFJOztBQUNqQyxnQkFBSSxZQUFZO0FBQ1osMEJBQVUsSUFERTtBQUVaLHdCQUFRO0FBRkksYUFBaEI7QUFJQSxnQkFBSSxrQkFBa0IsRUFBdEI7QUFDQSxnQkFBSSxPQUFPLElBQVg7O0FBRUEsaUJBQUssT0FBTCxDQUFhLFVBQUMsR0FBRCxFQUFTO0FBQ2xCLGdDQUFnQixHQUFoQixJQUF1QixFQUF2QjtBQUNBLDJCQUFXLE9BQVgsQ0FBbUIsVUFBQyxPQUFELEVBQVUsS0FBVixFQUFvQjtBQUNuQyx3QkFBSSxZQUFZLEtBQUssR0FBTCxDQUFTLGdCQUFnQixHQUFoQixDQUFULEVBQStCLFFBQVEsR0FBUixDQUEvQixDQUFoQjs7QUFFQSx3QkFBSSxTQUFKLEVBQWU7QUFDWCxrQ0FBVSxNQUFWLENBQWlCLElBQWpCLENBQXNCO0FBQ2xCLGlDQUFLLEdBRGE7QUFFbEIsbUNBQU8sS0FGVztBQUdsQixtQ0FBTyxRQUFRLEdBQVI7QUFIVyx5QkFBdEI7QUFLQSxrQ0FBVSxRQUFWLEdBQXFCLEtBQXJCO0FBQ0gscUJBUEQsTUFPTztBQUNILHdDQUFnQixHQUFoQixFQUFxQixJQUFyQixDQUEwQixRQUFRLEdBQVIsQ0FBMUI7QUFDSDtBQUNKLGlCQWJEO0FBY0gsYUFoQkQ7O0FBa0JBLG1CQUFPLFNBQVA7QUFDSDs7Ozs7O0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XHJcblx0bGV0IGNvbnN0cnVjdG9yRm4gPSBjb25zdHJ1Y3RvcjtcclxuXHRsZXQgYXJncyA9IGNvbnN0cnVjdG9yRm4uJGluamVjdDtcclxuXHRsZXQgZmFjdG9yeUZ1bmN0aW9uID0gKC4uLmFyZ3MpID0+IHtcclxuICAgIFx0cmV0dXJuIG5ldyBjb25zdHJ1Y3RvckZuKC4uLmFyZ3MpO1xyXG5cdH1cclxuXHRcclxuXHRhcmdzLnB1c2goZmFjdG9yeUZ1bmN0aW9uKTtcclxuXHJcblx0cmV0dXJuIGFyZ3M7XHJcbn0iLCJpbXBvcnQge1R5cGVWYWxpZGF0b3J9IGZyb20gJy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5sZXQgbXlUeXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3I7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRDb250cm9sbGVySGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xyXG4gICAgICAgIGxldCB7aW5wdXREYXRhOiBpbnB1dH0gPSAkc2NvcGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRFeHBlcmllbmNlVmFsdWUgPSBpVlhqcy5leHBlcmllbmNlLmRhdGFbaW5wdXQubmFtZV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlucHV0VmFsdWUgPSBjdXJyZW50RXhwZXJpZW5jZVZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50RXhwZXJpZW5jZVZhbHVlKXtcclxuICAgICAgICAgICAgJHNjb3BlLmlucHV0VmFsdWUgPSBjdXJyZW50RXhwZXJpZW5jZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkJywgZnVuY3Rpb24oaW5wdXQsIHZhbHVlKXtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIW15VHlwZVZhbGlkYXRvci5pc0VtcHR5KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQge25hbWUsIG9uQ2hhbmdlID0gW119ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2UudW5zaGlmdCh7IFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ3NldERhdGEnLCBcclxuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09iamVjdFBhcnNlcnN9IGZyb20gJy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IHRoaXNPYmplY3RQYXJzZXIgPSBuZXcgT2JqZWN0UGFyc2VycygpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXQsIGVycm9ycywgYXR0cmlidXRlcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHtuYW1lOiBpbnB1dE5hbWUsIHR5cGU6IGlucHV0VHlwZX0gPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmlucHV0TmFtZSA9IGlucHV0TmFtZTtcclxuICAgICAgICB0aGlzLmlucHV0VHlwZSA9IGlucHV0VHlwZTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGxldCB7YXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhbmd1bGFyRXJyb3JNYXAgPSB0aGlzLmFuZ3VsYXJFcnJvck1hcDtcclxuICAgICAgICBsZXQgbm9uQW5ndWxhciA9IHRoaXMubm9uQW5ndWxhcjtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGUgPSB0aGlzLm5vblZhbGlkYXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc09iamVjdFBhcnNlci5yZWR1Y2UoYXR0cmlidXRlcywgKHRhZ3MsIGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVLZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vblZhbGlkYXRlLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+PSAwKSByZXR1cm4gdGFncztcclxuICAgICAgICAgICAgbGV0IHRhZyA9IG5vbkFuZ3VsYXIuaW5kZXhPZihhdHRyaWJ1dGVLZXkpID49IDAgP1xyXG4gICAgICAgICAgICAgICAgYCR7YXR0cmlidXRlS2V5fT1cIiR7YXR0cmlidXRlVmFsdWV9XCJgIDpcclxuICAgICAgICAgICAgICAgIGBuZy0ke2FuZ3VsYXJFcnJvck1hcFthdHRyaWJ1dGVLZXldfSA9IFwiJHthdHRyaWJ1dGVWYWx1ZX1cIiBgO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGFnc30gJHt0YWd9YDtcclxuICAgICAgICB9LCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXROYW1lLCBpbnB1dFR5cGUsIGVycm9ycywgYXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhbmd1bGFyRXJyb3JNYXAgPSB0aGlzLmFuZ3VsYXJFcnJvck1hcDtcclxuICAgICAgICBsZXQgZGVmYXVsdE1lc3NhZ2VzID0gdGhpcy5kZWZhdWx0RXJyb3JNZXNzYWdlcztcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcCgoYXR0cmlidXRlS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGVycm9ycyAmJiBlcnJvcnNbYXR0cmlidXRlS2V5XSA/IGVycm9yc1thdHRyaWJ1dGVLZXldIDogZGVmYXVsdE1lc3NhZ2VzW2F0dHJpYnV0ZUtleV07XHJcbiAgICAgICAgICAgIGxldCBhdHRySFRNTCA9IGBuZy1zaG93PVwiKCRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZGlydHkgfHwgJHBhcmVudC5mb3JtSW5wdXQuJHN1Ym1pdHRlZCkgJiYgJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRlcnJvci4ke2FuZ3VsYXJFcnJvck1hcFthdHRyaWJ1dGVLZXldfVwiYDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgYXR0ckhUTUw6IGF0dHJIVE1MXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5wdXRUeXBlICYmIGlucHV0VHlwZSAhPT0gJ3RleHQnICYmIGlucHV0VHlwZSAhPSBcIm9wdGlvbnNcIikge1xyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2godGhpcy5pbnB1dFR5cGVFcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW5wdXRUeXBlRXJyb3IoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dE5hbWUsIGlucHV0VHlwZSwgZXJyb3JzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGVycm9yc1tpbnB1dFR5cGVdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UgPyBlcnJvck1lc3NhZ2UgOiBcIkludmFsaWQgXCIgKyBpbnB1dFR5cGUsXHJcbiAgICAgICAgICAgIGF0dHJIVE1MOiBgbmctc2hvdz1cIigkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGRpcnR5IHx8ICRwYXJlbnQuZm9ybUlucHV0LiRzdWJtaXR0ZWQpICYmICRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZXJyb3IuJHtpbnB1dFR5cGV9XCJgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBub25Bbmd1bGFyKCkge1xyXG4gICAgICAgIHJldHVybiBbJ21pbicsICdtYXgnLCAncmVhZG9ubHknLCAncGxhY2Vob2xkZXInLCAnc3RlcCcsICdyZWFkb25seSddXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5vblZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBbJ3N0ZXAnLCAncGxhY2Vob2xkZXInLCAncmVhZG9ubHknXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYW5ndWxhckVycm9yTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbmxlbmd0aDogJ21pbmxlbmd0aCcsXHJcbiAgICAgICAgICAgIG1pbjogXCJtaW5cIixcclxuICAgICAgICAgICAgbWF4OiBcIm1heFwiLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcclxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnbWF4bGVuZ3RoJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRFcnJvck1lc3NhZ2VzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbmxlbmd0aDogJ1RvbyBTaG9ydCcsXHJcbiAgICAgICAgICAgIG1pbjogXCJUb28gTG93XCIsXHJcbiAgICAgICAgICAgIG1heDogXCJUb28gSGlnaFwiLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogJ1JlcXVpcmVkJyxcclxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnVG9vIExvbmcnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlkZW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFJFQURZX1BMQVlFUiA6IFwicmVhZHktcGxheWVyXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcblxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XG5cbmV4cG9ydCBjbGFzcyBBbmNob3Ige1xuICAgIGNvbnN0cnVjdG9yKGFuY2hvckluZm8pIHsgICBcbiAgICAgICB0aGlzLmFuY2hvckluZm8gPSBhbmNob3JJbmZvO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuY2hvckNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHthbmNob3JDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aHJlZiA9ICcnLCBjbGFzc2VzID0gJycsIGF0dHJpYnV0ZXMgPSB7fSwgbGFiZWwgPSBsYWJlbEhUTUwsIGxhYmVsSFRNTCwgaWQ9Jyd9ID0gdGhpcy5hbmNob3JJbmZvOyBcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhhdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICBpZighbGFiZWxIVE1MICYmICFsYWJlbCl7XG4gICAgICAgICAgICBsYWJlbCA9IGhyZWY7XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICA8YSBpZD0nJHtpZH0nIGNsYXNzPVwiJHtjbGFzc2VzfSAke2FuY2hvckNsYXNzZXN9XCIgIGhyZWY9XCIke2hyZWZ9XCIgJHthdHRyaWJ1dGVIVE1MfSA+JHtsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbH08L2E+ICAgICAgICAgICBcbiAgICAgICAgYFxuICAgIH1cbn1cbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIGNvbGxlY3Rpb24gb2YgYnV0dG9ucyBmb3Igb25lIGNsaWNrIHJlY29yZGluZyBvZiBcclxuICogYW4gaW5wdXQgdGhhdCBoYXMgbXVsdGlwbGUgb3B0aW9ucyBmb3IgZGF0YSByZWNvcmRpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUYWtlcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSBidXR0b25zLCBhIGNsYXNzIHRoYXQgcmVuZGVycyB0aGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyBhbmQgYSBjbGFzcyB0aGF0IHJlbmRlcnMgYXR0cmlidXRlcy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mbyAtIEluZm9ybWF0aW9uIHRvIGNyZWF0ZSB0aGlzIGJ1dHRvbiBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1dHRvbnNJbmZvLmJ1dHRvbnMgLSBlYWNoIGluZGl2aWR1YWwgYnV0dG9uIGRhdGEgYW5kIHNldHRpbmdzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvLnNldHRpbmdzIC0gc2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIFxyXG4gICAgICogQHBhcmFtIHtDbGFzc30gYnV0dG9uc0luZm8uZXJyb3JzIC0gYW4gZXJyb3IgY2xhc3MgdGhhdCB3YXMgY3JlYXRlZCBieSB0aGUgXHJcbiAgICAgKiByZW5kZXJpbmcgbGlicmFyeSBzbyB0aGUgZXJyb3JzIG9wZW4gYW5kIGRpc3BsYXkgYWxvbmdzaWRlIHRoZSBsaWJyYXJ5LiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucyA9IFtdLCBpbnB1dCwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnV0dG9ucyB0byBiZSByZW5kZXJlZFxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgaW4gdGhpcyBncm91cCBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXJyb3IgbWVzc2FnZSBjbGFzcyB0aGF0IHdpbGwgdGFrZSB0aGUgZXJyb3JzIGZyb20gXHJcbiAgICAgICAgICogdGhlIHJlbmRlcmluZyBsaWJyYXJ5IGFuZCBhZGRzIHRoZW0gdG8gdGhpcyBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhdHRyaWJ1dGUgdGFncyBodG1sIHRvIGJlIGFkZGVkIHRvIHRoaXMgYnV0dG9uIFxyXG4gICAgICAgICAqIGlucHV0cy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExldHMgdXNlcnMgYWRkIHRoZSBzYW1lIGNsYXNzZXMgdG8gYWxsIGJ1dHRvbnMganVzdCBpbiBcclxuICAgICAqIGNhc2UgYnV0dG9ucyBzaGFyZSBhIHNwZWNpZmljIGNsYXNzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBIVE1MIGZvciBldmVyeSBidXR0b25zIGRlZmluZWQgaW4gdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIFxyXG4gICAgICogYXR0YWNoZXMgdGhlIGVycm9yIG1lc3NhZ2VzIGF0dGFjaGVkIHRvIHRoaXMgaW5wdXQuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYnV0dG9uQ2xhc3NlcyA9ICdidXR0b24tY2xhc3MnO1xyXG4gICAgICogYnV0dG9ucyA9IFt7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiQnV0dG9uIDFcIixcclxuICAgICAqICAgIGF0dHJIVE1MIDogXCJkaXNhYmxlZFwiLFxyXG4gICAgICogICAgY2xhc3NlcyA6IFwiY2xhc3MtMVwiXHJcbiAgICAgKiB9LHtcclxuICAgICAqICAgIGxhYmVsIDogXCI8aDE+QnV0dG9uIDI8L2gxPlwiLFxyXG4gICAgICogICAgY2xhc3NlcyBcIiBjbGFzcy0yXCJcclxuICAgICAqIH1dO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBXaWxsIHJlbmRlcjpcclxuICAgICAqIFxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1jbGFzcyBjbGFzcy0xXCIgZGlzYWJsZWQ+QnV0dG9uIDE8L2J1dHRvbj5cclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24gY2xhc3MgY2xhc3MtMlwiPjxoMT5CdXR0b24gMjwvaDE+PC9idXR0b24+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzOiBlcnJvckNsYXNzID0ge30sIGJ1dHRvbnMgPSBbXSwgaW5wdXQgPSB7fSwgYnV0dG9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMgPSB7fSwgZXJyb3JzID0ge30sIG1lc3NhZ2VzID0ge30gfSA9IGVycm9yQ2xhc3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2Vycm9yc1trZXldfWAsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhidXR0b25FcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MID0gJycsIHNob3dMYWJlbCA9IGZhbHNlLCBpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgYnV0dG9uc0hUTUwgPSBidXR0b25zLnJlZHVjZSgoaHRtbCwgYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9IFwiXCIgfSA9IGJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfSBcclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gJHthdHRySFRNTH0gY2xhc3M9XCIke2NsYXNzZXN9ICR7YnV0dG9uQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmICgobGFiZWxIVE1MLmxlbmd0aCA+IDAgfHwgbGFiZWwubGVuZ3RoID4gMCkgJiYgc2hvd0xhYmVsKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbEhUTUx9PC9sYWJlbD5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgJHtsYWJlbEhUTUx9XHJcbiAgICAgICAgICAgICAke2J1dHRvbnNIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VzfSAgICAgICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y2VzIGh0bWwgdG8gYnVpbGQgYSBjaGVja2JveCBpbnB1dCBmb3IgdGhlICBcclxuICogdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSBjaGVja2JveCdzIHNldHRpbmdzIGZyb20gYSBzdGFuZGFyZCBpbnB1dCBkYXRhIFxyXG4gICAgICogb2JqZWN0IGFuZCBzZXRzIHRoZSB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHJlbmRlciBpZiB0aGUgY2hlY2tib3ggaXNuJ3QgdmFsaWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9iaiAtIGNvbnRhaW5zIGFsbCB0aGUgY29uZmlndXJhdGlvbnMgXHJcbiAgICAgKiB0byByZW5kZXIgdGhpcyBpbnB1dC5cclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGVycm9yTWVzc2FnZXMgLSBhIGNsYXNzIHRoYXQgd2lsbCByZW5kZXIgdGhlIFxyXG4gICAgICogc3BlY2lmaWMgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyBiYXNlZCBvbiB0aGlzIFVJJ3Mgc2V0dGluZ3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgdGFncyA9ICcnLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBjaGVja2JveCdzIGlucHV0IGNvbmZpZ3VyYXRpb24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFueSBjdXN0b20gdGFncyBwYXNzZWQgZG93biBmcm9tIHRoZSByZW5kZXJpbmcgbGlicmFyeS4gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyB3aG9sZSBpbnB1dCBpbmNsdWRpbmcgdGhlIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGNsYXNzIG9mIGVycm9ycyBjcmVhdGVkIGJ5IHRoZSByZW5kZXJpbmcgbGlicmFyeSB0byBcclxuICAgICAgICAgKiBoaWRlIGFuZCBzaG93IHZhcmlvdXMgZXJyb3JzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBVSSdzIHJlbmRlcmluZyBvZiB0aGlzIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlZmF1bHQgY2xhc3MgdG8gdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgVUkgc3BlY2lmaWMgYXR0cmlidXRlc1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlZCBmb3IgdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIHRvIGJlIHVzZWQgYW5kIHJlbmRlcmVkIHByb3Blcmx5LlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgc3RyaW5nIG9mIGFsbCBhdHRyaWJ1dGVzIHRvIGxvYWQgXHJcbiAgICAgKiB0aGlzIGlucHV0IGluY2x1ZGluZyBpdHMgaWQsIG5hbWUgYW5kIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGdldCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCJgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBmcm9tIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIFxyXG4gICAgICogYW5kIGNsYXNzZXMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdWlDbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBpbnB1dC5jbGFzc2VzID0gXCJjbGFzcy0yXCI7XHJcbiAgICAgKiByZXF1aXJlZEF0dHJpYnV0ZXMgPSBcImlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCdcIlxyXG4gICAgICogLy8gUmVuZGVycyBUbzpcclxuICAgICAqIDxsYWJlbCBjbGFzcz1cImNsYXNzLTEgY2xhc3MtMlwiPlxyXG4gICAgICogICAgIDxpbnB1dCBpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBodG1sIG9mIHRoZSBmdWxseSBjcmVhdGVkIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5nc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCIgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgIDxpbnB1dCAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIGFuZCByZW5kZXJzIGFsbCB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzLCBpbnB1dCwgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBsYWJlbCA9ICcnIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBtZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKG1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxDbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBsZXQgYWxsQXR0cmlidXRlcyA9IGAke3JlcXVpcmVkQXR0cmlidXRlc30gJHt1aUF0dHJpYnV0ZXN9ICR7dGFnc30gJHtlcnJvclRhZ3N9YFxyXG4gICAgICAgIGxldCBjaGVja2JveEhUTUwgPSB0aGlzLnJlbmRlckNoZWNrYm94Q29udGFpbmVyKGFsbENsYXNzZXMsIGFsbEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAke2NoZWNrYm94SFRNTH1cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZSBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGRhdGUgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGUgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZSBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBEYXRlLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5nczsgICAgICAgIFxyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRlXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRldGltZSBsb2NhbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgd2l0aCB0aW1lc3RhbXAgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgKiBtZXNzYWdlc1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJveFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGV0aW1lLWxvY2FsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICogXHJcbiAgICAqIEBleGFtcGxlIFxyXG4gICAgKiAvL0RhdGEgXHJcbiAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICogRGF0ZXRpbWVMb2NhbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICogLy8gUmVuZGVycyBcclxuICAgICogPGxhYmVsPlxyXG4gICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAqIDwvbGFiZWw+XHJcbiAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZW1haWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBlbWFpbHMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGVtYWlsIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZW1haWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhbiBlbWFpbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBFbWFpbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJlbWFpbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZm9ybSB3cmFwcGVyIGFyb3VuZCB0aGVzZSBpbnB1dHMgYW5kIGEgXHJcbiAqIHN1Ym1pdCBidXR0b24gdG8gc3VibWl0IHRoZSBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgdmFyaW91cyBkYXRhIHRvIHJlbmRlciB0aGlzIGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBpbnB1dEhUTUwgLSBBbGwgaW5wdXQgZGF0YSB0byBiZSBhZGRlZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxBdHRySFRNTCAtIEF0dHJpYnV0ZXMgdGhhdCBuZWVkIHRvIGJlIFxyXG4gICAgICogYWRkZWQgdG8gdGhlIGZvcm0gcHJpbWFyaWx5IHVzZWQgZm9yIHZhbGlkYXRpb24gYW5kIHN1Ym1pdCBmdW5jdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2V0dGluZ3MgLSBHbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZm9ybS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBzdHlsZSA9IFN0eWxlKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBpbnB1dCBodG1sIGluZm9ybWF0aW9uIGZvciB0aGlzIFxyXG4gICAgICAgICAqIGZvcm1cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXRIVE1MID0gaW5wdXRIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYW1lIGZvciB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRpdGlvbmFsIHRhZ3MgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbEF0dHJIVE1MID0gYWRkaXRpb25hbEF0dHJIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBlbnRpcmUgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgc3VibWl0IGJ1dHRvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3VibWl0ID0gc2V0dGluZ3Muc3VibWl0O1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgc3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBkZWZhdWx0IFVJIGNsYXNzZXMgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBmb3JtQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3JvdydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgdG8gcmVuZGVyIHRoZSBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBGb3JtLnNldHRpbmdzID0ge1xyXG4gICAgICogICAgIHN1Ym1pdCA6IHtcclxuICAgICAqICAgICAgICAgbGFiZWwgOiBcIk15IG5ldyBzdWJtaXQgbGFiZWxcIixcclxuICAgICAqICAgICAgICAgaW5wdXQgOiB7XHJcbiAgICAgKiAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1pbnB1dFwiXHJcbiAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgKiAgICAgICAgIGNvbnRhaW5lciA6IHtcclxuICAgICAqICAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1jb250YWluZXJcIlxyXG4gICAgICogICAgICAgICB9XHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfTtcclxuICAgICAqIFxyXG4gICAgICogLy9XaWxsIFJlbmRlciBcclxuICAgICAqIFxyXG4gICAgICogPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xIG15LXN1Ym1pdC1jb250YWluZXJcIj5cclxuICAgICAqICAgICA8YnV0dG9uIGNsYXNzPVwibXktc3VibWl0LWlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICogICAgICAgICAgTXkgbmV3IHN1Ym1pdCBsYWJlbCBcclxuICAgICAqICAgICA8L2J1dHRvbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgJHtzdWJtaXRDb250YWluZXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiJHtzdWJtaXRJbnB1dENsYXNzZXN9XCIgdHlwZT0nc3VibWl0JyAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgZWFjaCBpbnB1dCdzIGh0bWwgaW50byBhIGNvbnRhaW5lciBzbyB0aGV5IGNhbiBiZSBmb3JtYXR0ZWQgY29ycmVjdGx5XHJcbiAgICAgKiB1dGlsaXppbmcgdGhlIGl2eGpzLmNzcydzIGdyaWQgc3lzdGVtLlxyXG4gICAgICogQHR5cGV7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIGZvcm1DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fSwgY2xhc3NlczogY29uZmlnRm9ybUNsYXNzZXMgPSAnJywgaWQgOiBmb3JtSWQsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmICghc2V0dGluZ3MuaGlkZVN1Ym1pdCkge1xyXG4gICAgICAgICAgICBpbnB1dEhUTUwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc3VibWl0LFxyXG4gICAgICAgICAgICAgICAgaHRtbDogdGhpcy5zdWJtaXRCdXR0b25IVE1MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gdGhpcy5zdHlsZS5hZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCIke2Zvcm1JZH0tZm9ybVwiIGNsYXNzPVwiJHtmb3JtQ2xhc3Nlc30gJHtjb25maWdGb3JtQ2xhc3Nlc31cIiBub3ZhbGlkYXRlIG5hbWU9XCIke25hbWV9XCIgJHthZGRpdGlvbmFsQXR0ckhUTUx9PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR7Y29udGVudHN9XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEluZGljYXRlcyBlcnJvcnMgZm9yIGVhY2ggaW5wdXQgYmFzZWQgb24gdGhlIFxyXG4gKiBhdHRyaWJ1dGVzIGNyZWF0ZWQgZnJvbSB0aGUgdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzXHJcbiAqIGlWWGpzIHVzZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJpbmdzIGluIGFsbCB0aGUgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKiB0aGlzIGlucHV0IGNhbiBwcm9kdWNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBlcnJvck1lc3NhZ2VzIC0gbGlzdCBvZiBhbGwgcG9zc2libGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyB3aXRoIGF0dHJpYnV0ZXMgaW5kaWNhdGluZyB0aGUgbWVzc2FnZSBcclxuICAgICAqIGFuZCB0aGUgY29uZGl0aW9ucyBpbiB3aGljaCB0byBzaG93IHRoZW0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaXN0IG9mIGFsbCBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjbGFzc2VzIGZvciB0aGUgZXJyb3IgbWVzc2FnZSBkaXYuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGNsYXNzZXMgZm9yIHRoZSBjb250YWluZXIgb2YgYWxsIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciBhbGwgZXJyb3IgbWVzc2FnZXMgYW5kIHRoZSBjb250YWluZXIgd2l0aCBcclxuICAgICAqIHRoZW0uIFJlc3VsdHM6XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VzXCI+XHJcbiAgICAgKiAgICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5NRVNTQUdFPC9zcGFuPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yTWVzc2FnZXMsIG1lc3NhZ2VDbGFzc2VzLCBjb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZUhUTUwgPSBlcnJvck1lc3NhZ2VzLnJlZHVjZSgoZXJyb3JNZXNzYWdlSFRNTCwgZXJyb3JNZXNzYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlSFRNTH08c3BhbiBjbGFzcz1cIiR7bWVzc2FnZUNsYXNzZXN9XCIgJHtlcnJvck1lc3NhZ2UuYXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+YFxyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZUhUTUwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9JyR7Y29udGFpbmVyQ2xhc3Nlc30nPlxyXG4gICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VIVE1MfVxyXG4gICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG51bWJlciBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIG51bWJlcnMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTnVtYmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBudW1iZXIgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIE51bWJlci51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgKiAgICAgXCJzdGVwXCIgOiBcIjAuMVwiXHJcbiAgICAgKiB9XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBzdGVwPVwiMC4xXCIgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJudW1iZXJcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cIm51bWJlclwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIGRlZmF1bHREaXNwbGF5ID0gJycsIHNldHRpbmdzID0ge30sIHRhZ3MgPSAnJywgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgICAgICAgJHtkZWZhdWx0T3B0aW9uVGFnfVxyXG4gICAgICAgICAgICAgICAgICAke29wdGlvbnNIVE1MfVxyXG4gICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpb0lucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgcmFkaW9zID0gW10sIGVycm9ycyA9IHt9LCBzZXR0aW5ncyA9IHt9fSA9IHJhZGlvSW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaW9zID0gcmFkaW9zO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9Hcm91cChyYWRpb3NIVE1MKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlvc0hUTUw7XHJcbiAgICB9O1xyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMpIHtcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCIke3VpQ2xhc3Nlc31cIj5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L2xhYmVsPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCkge1xyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgJHthdHRySFRNTH0+XHJcbiAgICAgICAgICAgICR7bGFiZWx9YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcywgdGFnczogZXJyb3JUYWdzID0gXCJcIn0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IGlucHV0TGFiZWwsIGxhYmVsSFRNTDogaW5wdXRMYWJsZUhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGlucHV0TGFibGVIVE1MKSBpbnB1dExhYmVsID0gaW5wdXRMYWJsZUhUTUw7XHJcblxyXG4gICAgICAgIGxldCByYWRpb3NIVE1MID0gcmFkaW9zLnJlZHVjZSgoaHRtbCwgcmFkaW8pID0+IHtcclxuICAgICAgICAgICAgbGV0IHtsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9ICcnfSA9IHJhZGlvO1xyXG5cclxuICAgICAgICAgICAgYXR0ckhUTUwgPSBgJHthdHRySFRNTH0gJHtlcnJvclRhZ3N9YDtcclxuXHJcbiAgICAgICAgICAgIGxldCByYWRpb0hUTUwgPSBzZWxmLnJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9XHJcbiAgICAgICAgICAgICR7c2VsZi51aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgYCR7dWlDbGFzc2VzfSAke2NsYXNzZXN9YCl9YDtcclxuICAgICAgICB9LCBpbnB1dExhYmVsKTtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxSYWRpb0J1dHRvbnNIVE1MID0gYFxyXG4gICAgICAgICAgICAgJHtyYWRpb3NIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudWlSYWRpb0dyb3VwKGFsbFJhZGlvQnV0dG9uc0hUTUwpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIElucHV0U3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoZm9ybVNlY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmZvcm1TZWN0aW9uID0gZm9ybVNlY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRlZmF1bHRGb290ZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7Zm9ybVNlY3Rpb24sIGRhdGEsIGRlZmF1bHRGb290ZXJDbGFzc2VzLCBkZWZhdWx0SGVhZGVyQ2xhc3NlcywgZGVmYXVsdFNlY3Rpb25DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlczogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYDxoMT4ke2RhdGEubmFtZX08L2gxPmB9ID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc2VjdGlvbkNsYXNzZXMgPSAnJyB9ID0gc2VjdGlvbjtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCIke3NlY3Rpb25DbGFzc2VzfSAke2RlZmF1bHRTZWN0aW9uQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cclxuICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke2RlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7Zm9ybVNlY3Rpb259XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfSAke2RlZmF1bHRGb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbikge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxpbmtTZWN0aW9uID0gbGlua1NlY3Rpb25cbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdEZvb3RlckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBodG1sKCkge1xuICAgICAgICBsZXQge2RhdGEsIGxpbmtTZWN0aW9uLCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcywgZGVmYXVsdEhlYWRlckNsYXNzZXMsIGRlZmF1bHRTZWN0aW9uQ2xhc3NlcywgZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge30sIGxpbmtDb250YWluZXIgPSB7fX0gPSBkYXRhO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzZWN0aW9uQ2xhc3NlcyA9ICcnfSA9IHNlY3Rpb247XG4gICAgICAgIGxldCB7Y2xhc3NlczogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGxpbmtDb250YWluZXJDbGFzc2VzID0gJycsIGF0dHJpYnV0ZXM6IGxpbmtDb250YWluZXJBdHRyaWJ1dGVzID0ge319ID0gbGlua0NvbnRhaW5lcjtcbiAgICAgICAgbGV0IGxpbmtDb250YWluZXJBdHRyaWJ1dGVIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MobGlua0NvbnRhaW5lckF0dHJpYnV0ZXMsIE9iamVjdC5rZXlzKGxpbmtDb250YWluZXJBdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCIke3NlY3Rpb25DbGFzc2VzfSAke2RlZmF1bHRTZWN0aW9uQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cbiAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHtkZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JyR7ZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzfSAke2xpbmtDb250YWluZXJDbGFzc2VzfScgJHtsaW5rQ29udGFpbmVyQXR0cmlidXRlSFRNTH0+XG4gICAgICAgICAgICAgICAgICAgICR7bGlua1NlY3Rpb259XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc30gJHtkZWZhdWx0Rm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBnZXRXaWR0aCh3aWR0aCkge1xyXG4gICAgICAgIGlmICh3aWR0aCA9PT0gJzEnKSByZXR1cm4gJ2l2eGpzLWdyaWQtMS0xJztcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZ3JpZFN0cmluZyA9IHdpZHRoLnJlcGxhY2UoJy8nLCAnLScpO1xyXG5cclxuICAgICAgICByZXR1cm4gYGl2eGpzLWdyaWQtJHtncmlkU3RyaW5nfWA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjb250YWluZXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdpbnB1dC1jb250YWluZXInO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdpZHRoQ2xhc3NlcyhpbnB1dHNIVE1MKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29udGFpbmVyQ2xhc3NlcyA9ICcnfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gaW5wdXRzSFRNTC5yZWR1Y2UoKGN1cnJlbnRIVE1MLCBpbnB1dEhUTUwpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5ncyA9IHt9fSA9IGlucHV0SFRNTDtcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCA9ICcxJywgY29udGFpbmVyPXt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBsZXQge2NsYXNzZXM9Jyd9ID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7Y29udGFpbmVyQ2xhc3Nlc31gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhpc1dpZHRoID0gc2VsZi5nZXRXaWR0aCh3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKFwiaXZ4anMtZ3JpZC0xLTFcIiwgYCR7dGhpc1dpZHRofSAke2NsYXNzZXN9YCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7Y3VycmVudEhUTUx9ICR7aHRtbH1gO1xyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudHM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJ0ZXh0XCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsYWJlbCA9IHNob3dMYWJlbCA/IGxhYmVsIDogJyc7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgJHt1aUF0dHJpYnV0ZXN9ICAgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICA8L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVybCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSxzZXR0aW5ncyA9IHt9LHRhZ3MgPSB7fSxlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCl7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6aW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlcyA6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlcyA6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzIDogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9XCIgJHt1aUF0dHJpYnV0ZXN9ICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInVybFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbnRyb2xzfSBmcm9tICcuLi8uLi92aWRlby9jb250cm9scy9pbmRleC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY29udGFpbmVyLmh0bWwgaW5zdGFuY2VvZiBGdW5jdGlvbil7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKHRoaXMuaHRtbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMuaHRtbDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB0b3RhbFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgY3VycmVudFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgc2NydWJCYXJDbGFzc2VzLFxyXG4gICAgICAgICAgICBtdXRlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJDbGFzc2VzICAgICAgICAgICAgXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5wbGF5UGF1c2VDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiKTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXRvdGFsLXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluZm8gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5zY3J1YkJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIpO1xyXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIpO1xyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdwbGF5LXBhdXNlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJyZW50VGltZUluZm9DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXRpbWUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdzY3J1Yi1iYXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnbXV0ZSdcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZS1iYXInXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5Q2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtcGxheSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBhdXNlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS11cCc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtdm9sdW1lLW9mZic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYHRpbWUtbGFwc2VkYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2N1cnJlbnQtdm9sdW1lJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlQYXVzZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3BsYXlDbGFzc2VzIDogcGxheX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHNDbGFzc2VzIDogcGxheVBhdXNlQ29udHJvbHN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIgY2xhc3M9XCIke3BsYXlQYXVzZUNvbnRyb2xzfVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz0nJHtwbGF5fSc+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPmBcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHRpbWVzdGFtcEhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIgY2xhc3M9XCIke3RoaXMuY3VycmVudFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIgY2xhc3M9XCIke3RoaXMudG90YWxUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7dW5tdXRlQ2xhc3NlcyA6IHVubXV0ZSwgbXV0ZUNvbnRyb2xzQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIgY2xhc3M9XCIke211dGVDb250cm9sc0NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7dW5tdXRlfVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgIGlkPVwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiIGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHNjcnViQmFySFRNTCxcclxuICAgICAgICAgICAgdGltZXN0YW1wSFRNTCxcclxuICAgICAgICAgICAgbXV0ZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHZvbHVtZUJhckhUTUxcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICR7cGxheVBhdXNlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAgICAke3RpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgICAgJHttdXRlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3ZvbHVtZUJhckhUTUx9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFuY2hvciBhcyBEZWZhdWx0QW5jaG9yIH0gZnJvbSAnLi4vZGVmYXVsdC9hbmNob3IuanMnO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRGVmYXVsdEFuY2hvcntcblx0Y29uc3RydWN0b3IoYW5jaG9ySW5mbyl7XG5cdFx0c3VwZXIoYW5jaG9ySW5mbyk7XG5cdH1cbn0iLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcclxuXHJcbmNsYXNzIENhcmQge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBpVlhqc0FjdGlvbnMpIHtcclxuICAgICAgICBsZXQge3NldHRpbmdzID0ge319ID0gJHNjb3BlO1xyXG4gICAgICAgIGxldCB7aW1nID0gJycsdGl0bGUgPSAnJyxmaXJzdE5hbWUgPSAnJyxkZXNjcmlwdGlvbiA9ICcnLGV2ZW50cyA9IFtdfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW1nID0gaW1nO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5idXR0b25QcmVzc2VkID0gICgpID0+e1xyXG4gICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMoZXZlbnRzLCAoKSA9PntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQ2FyZC4kaW5qZWN0ID0gWyckc2NvcGUnLCdpdnhqcy5hY3Rpb25zJ107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oQ2FyZCkiLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcclxuaW1wb3J0IHsgSW5wdXRDb250cm9sbGVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyc7XHJcblxyXG5jbGFzcyBEcm9wZG93bklucHV0Q29udHJvbGxlciBleHRlbmRzIElucHV0Q29udHJvbGxlckhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50LCBpVlhqcywgaVZYanNBY3Rpb25zKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQge2RlZmF1bHRWYWx1ZSwgb3B0aW9ucywgbmFtZSwgc2V0dGluZ3MgPSB7fX0gPSAkc2NvcGUuaW5wdXREYXRhO1xyXG4gICAgICAgIGxldCB7ZHJvcGRvd24gPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge211bHRpcGxlID0gZmFsc2V9ID0gZHJvcGRvd247XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIW11bHRpcGxlID8ge1xyXG4gICAgICAgICAgICB2YWx1ZSA6IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtuYW1lXSA/IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtuYW1lXSA6ICcnXHJcbiAgICAgICAgfSA6IFt7XHJcbiAgICAgICAgICAgIHZhbHVlOiBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV0gPyBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV0gOiAnJ1xyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSAodmFsdWUpID0+IHsgXHJcbiAgICAgICAgICAgIGxldCB7bmFtZSwgb25DaGFuZ2UgPSBbXX0gPSAkc2NvcGUuaW5wdXREYXRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHNlbGVjdGVkLnJlZHVjZSgoc2VsZWN0ZWRWYWxzLCBjdXJyZW50VmFsKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGVjdGVkVmFscy5sZW5ndGggPD0gMCkgcmV0dXJuIGAke2N1cnJlbnRWYWwudmFsdWV9YDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7c2VsZWN0ZWRWYWxzfSwgJHtjdXJyZW50VmFsLnZhbHVlfWBcclxuICAgICAgICAgICAgICAgIH0sICcnKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlLnVuc2hpZnQoeyBldmVudE5hbWU6ICdzZXREYXRhJywgYXJnczogeyBrZXk6IG5hbWUsIHZhbHVlOiB2YWx1ZS52YWx1ZSB9IH0pO1xyXG4gICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkRyb3Bkb3duSW5wdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICdpVlhqcycsICdpdnhqcy5hY3Rpb25zJ107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oRHJvcGRvd25JbnB1dENvbnRyb2xsZXIpOyIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgQ2FyZEVsZW1lbnRDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2VsZW1lbnQuY2FyZC5qcyc7XHJcbmltcG9ydCB7Q2FyZFRlbXBsYXRlc30gZnJvbSAnLi4vLi4vY2FyZC5qcyc7XHJcblxyXG5jbGFzcyBDYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRjb21waWxlLCAkdGltZW91dCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlSFRNTDtcclxuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeaXZ4anNGb3JtSW5wdXRcIjtcclxuICAgICAgICB0aGlzLnNjb3BlID0ge1xyXG4gICAgICAgICAgICBzZXR0aW5nczogJz1zZXR0aW5ncydcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ2FyZEVsZW1lbnRDb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBzZXR0aW5ncyA9IHt9IH0gPSAkc2NvcGU7IFxyXG4gICAgICAgICAgICBsZXQge2NhcmRUeXBlLGNsYXNzZXMgPSBcIlwifSA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBsZXQgaHRtbCA9IG5ldyBDYXJkVGVtcGxhdGVzKCRzY29wZS5zZXR0aW5ncylbY2FyZFR5cGUgKyBcIkNhcmRIVE1MXCJdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXMgPSBjbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgaUVsbS5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAkY29tcGlsZShpRWxtLmNvbnRlbnRzKCkpKCRzY29wZSk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICQoJy5zcGVjaWFsLmNhcmRzIC5pbWFnZScpLmRpbW1lcih7XHJcbiAgICAgICAgICAgICAgICAgICAgb246ICdob3ZlcidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGVtcGxhdGVIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInt7Y2xhc3Nlc319XCI+PC9kaXY+YDtcclxuICAgIH07XHJcbn1cclxuXHJcbkNhcmQuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJHRpbWVvdXQnXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihDYXJkKTsiLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcclxuaW1wb3J0IERyb3Bkb3duSW5wdXRDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2lucHV0LmRyb3Bkb3duLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL21lc3NhZ2VzLmVycm9yLmpzJztcclxuXHJcbmNsYXNzIERyb3Bkb3duSW5wdXQge1xyXG4gICAgY29uc3RydWN0b3IoJHJvb3RTY29wZSwgJGNvbXBpbGUsICRmaWx0ZXIsICR0aW1lb3V0LCBpVlhqcywgaVZYanNVSU1vZHVsZSwgaVZYanNCdXMpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZUhUTUw7XHJcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXml2eGpzRm9ybUlucHV0XCI7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcclxuICAgICAgICAgICAgaW5wdXREYXRhOiAnPWlucHV0RGF0YSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERyb3Bkb3duSW5wdXRDb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2lucHV0RGF0YTogaW5wdXR9ID0gJHNjb3BlO1xyXG4gICAgICAgICAgICBsZXQge2lkLCBlcnJvcnMgPSB7fSwgbmFtZSwgbGFiZWxIVE1MLCBsYWJlbCA9ICRmaWx0ZXIoJ3N0cmluZ1BhcnNlcnMnKSgnc3RhcnRDYXNlJywgaWQpLCBhdHRyaWJ1dGVzID0ge30sIG9wdGlvbnMsIGRlZmF1bHREaXNwbGF5LCBkZWZhdWx0VmFsdWUsIHNldHRpbmdzID0ge319ID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIGxldCB7ZGlyZWN0aXZlcyA9ICcnfSA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcyA9IG5ldyBFcnJvck1lc3NhZ2VzKG5hbWUsIGVycm9ycywgYXR0cmlidXRlcyk7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3B0aW9uVGFnID0gYDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYW4gb3B0aW9uLi4uPC9vcHRpb24+YDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRhZ0hUTUwgPSBgJHtkaXJlY3RpdmVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jaGFuZ2U9J3ZtLm9uQ2hhbmdlKHZtLnNlbGVjdGVkKSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctb3B0aW9ucz1cIm9wdGlvbi5kaXNwbGF5IGZvciBvcHRpb24gaW4gaW5wdXREYXRhLm9wdGlvbnMgdHJhY2sgYnkgb3B0aW9uLnZhbHVlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vZGVsPSd2bS5zZWxlY3RlZCdgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IGRlZmF1bHREaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnID0gZGVmYXVsdERpc3BsYXkgP1xyXG4gICAgICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgb3B0aW9uc0NsYXNzID0gbmV3IGlWWGpzVUlNb2R1bGUuZHJvcGRvd24oaWQsIG5hbWUsIGxhYmVsID0gbGFiZWxIVE1MID8gbGFiZWxIVE1MIDogbGFiZWwsIGRlZmF1bHREaXNwbGF5LCBzZXR0aW5ncywgdGFnSFRNTCwgZXJyb3JNZXNzYWdlcyk7XHJcblxyXG4gICAgICAgICAgICBpRWxtLmh0bWwob3B0aW9uc0NsYXNzLmh0bWwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAkICE9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkKGlFbG0uZmluZCgnc2VsZWN0JykpLmRyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBleHBlcmllbmNlVmFsdWUgPSBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAkKGlFbG0uZmluZCgnc2VsZWN0JykpLmRyb3Bkb3duKCdzZXQgc2VsZWN0ZWQnLCBleHBlcmllbmNlVmFsdWUgPyBleHBlcmllbmNlVmFsdWUgIDonJyk7XHJcblxyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0ZW1wbGF0ZUhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2PjwvZGl2PmBcclxuICAgIH07XHJcbn1cclxuXHJcbkRyb3Bkb3duSW5wdXQuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckY29tcGlsZScsICckZmlsdGVyJywgJyR0aW1lb3V0JywgJ2lWWGpzJywgJ2l2eGpzLm1vZHVsZXMudWknLCAnaXZ4anMuYnVzJ107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oRHJvcGRvd25JbnB1dCk7IiwiaW1wb3J0IHsgQnV0dG9ucyBhcyBEZWZhdWx0QnV0dG9ucyB9IGZyb20gJy4uL2RlZmF1bHQvYnV0dG9ucy5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBEZWZhdWx0QnV0dG9ucyB7XHJcbiAgICBjb25zdHJ1Y3RvcihidXR0b25zLCBpbnB1dERhdGEpIHtcclxuICAgICAgICBzdXBlcihidXR0b25zLCBpbnB1dERhdGEsIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VpIGJ1dHRvbic7XHJcbiAgICB9XHJcblxyXG59OyIsImV4cG9ydCBjbGFzcyBDYXJkVGVtcGxhdGVzIHtcclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5pQ2FyZEhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidWkgY2FyZHNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicmlnaHQgZmxvYXRlZCBtaW5pIHVpIGltYWdlXCIgc3JjPVwie3t2bS5pbWd9fVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7dm0uZmlyc3ROYW1lfX0ge3t2bS5sYXN0TmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dm0udGl0bGV9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3ZtLmRlc2NyaXB0aW9ufX1cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleHRyYSBjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWkgb25lIGJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLWNsaWNrPVwidm0uYnV0dG9uUHJlc3NlZCgpXCIgY2xhc3M9XCJ1aSBidXR0b25cIj5CdXkgaXQ8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGltbWVyQ2FyZEhUTUwoKSB7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzfSA9IHRoaXMuc2V0dGluZ3M7XHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpIHNwZWNpYWwgY2FyZHNcIj4gIFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJsdXJyaW5nIGRpbW1hYmxlIGltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWkgZGltbWVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cInZtLmJ1dHRvblByZXNzZWQoKVwiIGNsYXNzPVwidWkgaW52ZXJ0ZWQgYnV0dG9uXCI+QnV5IHRoaXMhPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW1nIG5nLXNyYz1cInt7dm0uaW1nfX1cIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImhlYWRlclwiPnt7dm0uZmlyc3ROYW1lfX0ge3t2bS5sYXN0TmFtZX19PC9hPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1ldGFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YT57e3ZtLnRpdGxlfX08L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7dm0uZGVzY3JpcHRpb259fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBDaGVja2JveCBhcyBEZWZhdWx0Q2hlY2tib3ggfSBmcm9tICcuLi9kZWZhdWx0L2NoZWNrYm94LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBEZWZhdWx0Q2hlY2tib3gge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VpIGNoZWNrYm94J1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ2hlY2tib3hDb250YWluZXIoY2xhc3NlcywgYXR0cmlidXRlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXR9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBpZihsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCAke2F0dHJpYnV0ZXN9ID5cclxuICAgICAgICAgICAgIDxsYWJlbD4gICAgXHJcbiAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICA8L2Rpdj5gXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRlIGFzIERlZmF1bHREYXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRlLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZSBleHRlbmRzIERlZmF1bHREYXRle1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBEYXRldGltZUxvY2FsIGFzIERlZmF1bHREYXRldGltZUxvY2FsIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwgZXh0ZW5kcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59OyIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyb3Bkb3duIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBsYWJlbCwgZGVmYXVsdERpc3BsYXksIHNldHRpbmdzID0ge30sIHRhZ0hUTUwsIGVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLnRhZ0hUTUwgPSB0YWdIVE1MO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGRyb3Bkb3duJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWUsIGxhYmVsLCBkZWZhdWx0RGlzcGxheSwgc2V0dGluZ3MsIHVpQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7ZHJvcGRvd24gPSBcIlwifSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bXVsdGlwbGUgPSBmYWxzZX0gPSBkcm9wZG93bjtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JNZXNzYWdlcztcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyBFcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9IG11bHRpcGxlPVwiXCJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbH08L2xhYmVsPiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0aGlzLnRhZ0hUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBFbWFpbCBhcyBEZWZhdWx0RW1haWwgfSBmcm9tICcuLi9kZWZhdWx0L2VtYWlsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWwgZXh0ZW5kcyBEZWZhdWx0RW1haWx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIGFzIERlZmF1bHRGb3JtIH0gZnJvbSAnLi4vZGVmYXVsdC9mb3JtLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgRGVmYXVsdEZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzKSB7XHJcbiAgICAgICBzdXBlcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIFN0eWxlKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZm9ybUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGZvcm0gZXJyb3InO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdWJtaXRCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge319ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsOiBzdWJtaXRMYWJlbCA9IFwiU3VibWl0XCIsIGxhYmVsSFRNTDogc3VibWl0TGFiZWxIVE1MLCBpbnB1dDogc3VibWl0SW5wdXQgPSB7fSwgY29udGFpbmVyOiBzdWJtaXRDb250YWluZXIgPSB7fSwgYXR0cmlidXRlcyA9ICcnfSA9IHN1Ym1pdDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdElucHV0Q2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0SW5wdXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRDb250YWluZXJDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRDb250YWluZXI7XHJcblxyXG4gICAgICAgIHN1Ym1pdExhYmVsID0gc3VibWl0TGFiZWxIVE1MID8gc3VibWl0TGFiZWxIVE1MIDogc3VibWl0TGFiZWw7XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXRIVE1MID0gc3VibWl0TGFiZWwubGVuZ3RoID49IDAgP1xyXG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInNpeHRlZW4gZmllbGQgd2lkZSAke3N1Ym1pdENvbnRhaW5lckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInVpIGJ1dHRvbiAke3N1Ym1pdElucHV0Q2xhc3Nlc31cIiB0eXBlPSdzdWJtaXQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3N1Ym1pdExhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxufTsiLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybS5qcyc7XHJcbmltcG9ydCB7IEFuY2hvciB9IGZyb20gJy4vYW5jaG9yLmpzJztcclxuaW1wb3J0IHsgQnV0dG9ucyB9IGZyb20gJy4vYnV0dG9ucy5qcyc7XHJcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAnLi9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IERhdGUgfSBmcm9tICcuL2RhdGUuanMnO1xyXG5pbXBvcnQgeyBEYXRldGltZUxvY2FsIH0gZnJvbSAnLi9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5qcyc7XHJcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IE51bWJlciB9IGZyb20gJy4vbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gXCIuL29wdGlvbnMuanNcIjtcclxuaW1wb3J0IHsgUmFkaW8gfSBmcm9tIFwiLi9yYWRpby5qc1wiO1xyXG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlLmpzXCI7XHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuL3RleHQuanMnO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBVcmwgfSBmcm9tICcuL3VybC5qcyc7XHJcblxyXG4vL0FuZ3VsYXJcclxuaW1wb3J0IGl2eGpzU2VtYW50aWNVaURyb3Bkb3duSW5wdXQgZnJvbSAnLi9hbmd1bGFyL2RpcmVjdGl2ZXMvaW5wdXQuZHJvcGRvd24uanMnO1xyXG5pbXBvcnQgaXZ4anNTZW1hbnRpY1VpQ2FyZCBmcm9tICcuL2FuZ3VsYXIvZGlyZWN0aXZlcy9lbGVtZW50LmNhcmQuanMnO1xyXG5cclxuLy9TdGF0ZXNcclxuaW1wb3J0IHsgSW5wdXRTdGF0ZSB9IGZyb20gJy4vc3RhdGUuaW5wdXQuanMnO1xyXG5pbXBvcnQgeyBWaWRlb1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS52aWRlby5qcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSB9IGZyb20gJy4vc3RhdGUubmF2aWdhdGlvbi5qcyc7XHJcblxyXG4vL0NvbnRyb2xzIFxyXG5pbXBvcnQgVmlkZW9Db250cm9scyBmcm9tICcuL3ZpZGVvLmNvbnRyb2xzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZW1hbnRpY1VJIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IEZvcm07XHJcbiAgICAgICAgdGhpcy5hbmNob3IgPSBBbmNob3I7XHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gQnV0dG9ucztcclxuICAgICAgICB0aGlzLmNoZWNrYm94ID0gQ2hlY2tib3g7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gRGF0ZTtcclxuICAgICAgICB0aGlzLmRhdGV0aW1lTG9jYWwgPSBEYXRldGltZUxvY2FsO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBFbWFpbDtcclxuICAgICAgICB0aGlzLm51bWJlciA9IE51bWJlcjtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPcHRpb25zO1xyXG4gICAgICAgIHRoaXMucmFkaW8gPSBSYWRpbzsgICAgXHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IFRleHQ7XHJcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IFRleHRhcmVhO1xyXG4gICAgICAgIHRoaXMudXJsID0gVXJsO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24gPSBEcm9wZG93bjtcclxuICAgICAgICB0aGlzLnZpZGVvQ29udHJvbHMgPSBWaWRlb0NvbnRyb2xzO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBpbnB1dCA6IElucHV0U3RhdGUsXHJcbiAgICAgICAgICAgIHZpZGVvIDogVmlkZW9TdGF0ZSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbiA6IE5hdmlnYXRpb25TdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuZ3VsYXIgPSB7XHJcbiAgICAgICAgICAgIGl2eGpzU2VtYW50aWNVaURyb3Bkb3duSW5wdXQgOiBpdnhqc1NlbWFudGljVWlEcm9wZG93bklucHV0LFxyXG4gICAgICAgICAgICBpdnhqc1NlbWFudGljVWlDYXJkIDogaXZ4anNTZW1hbnRpY1VpQ2FyZFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZVNlbWFudGljVUk7XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudWkuc2VtYW50aWMtdWknLCBpbml0aWFsaXplU2VtYW50aWNVSSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplU2VtYW50aWNVSSgpe1xyXG4gICAgcmV0dXJuIFNlbWFudGljVUlcclxufSIsImltcG9ydCB7IEVycm9yTWVzc2FnZXMgYXMgRGVmYXVsdEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi4vZGVmYXVsdC9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMgZXh0ZW5kcyBEZWZhdWx0RXJyb3JNZXNzYWdlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvck1lc3NhZ2VzID0gW10peyAgICAgICBcclxuICAgICAgIHN1cGVyKGVycm9yTWVzc2FnZXMpOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBlcnJvciBtZXNzYWdlJztcclxuICAgIH1cclxuICAgIFxyXG59OyIsImltcG9ydCB7IE51bWJlciBhcyBEZWZhdWx0TnVtYmVyIH0gZnJvbSAnLi4vZGVmYXVsdC9udW1iZXIuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBEZWZhdWx0TnVtYmVye1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07XHJcbiIsImltcG9ydCB7IE9wdGlvbnMgYXMgRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuLi9kZWZhdWx0L29wdGlvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIGV4dGVuZHMgRGVmYXVsdE9wdGlvbnN7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgZHJvcGRvd24nO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7UmFkaW8gYXMgRGVmYXVsdFJhZGlvfSBmcm9tICcuLi9kZWZhdWx0L3JhZGlvLmpzJztcclxuaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhZGlvIGV4dGVuZHMgRGVmYXVsdFJhZGlvIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoYXNDb3JyZWN0UmFkaW9DbGFzcyhjbGFzc2VzKXtcclxuICAgICAgICBsZXQgdmFsaWRSYWRpb0NsYXNzZXMgPSBbXHJcbiAgICAgICAgICAgIFwicmFkaW9cIiwgXCJ0b2dnbGVcIiwgXCJzbGlkZXJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGhhc1ZhbGlkQ2xhc3MgPSBmYWxzZTtcclxuICAgICAgICAgXHJcbiAgICAgICAgdmFsaWRSYWRpb0NsYXNzZXMuZm9yRWFjaCgodmFsaWRDbGFzcykgPT57XHJcbiAgICAgICAgICAgIGlmKGhhc1ZhbGlkQ2xhc3MpIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaGFzVmFsaWRDbGFzcyA9IChjbGFzc2VzLmluZGV4T2YodmFsaWRDbGFzcykgPj0gMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhhc1ZhbGlkQ2xhc3M7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgaXNWYWxpZFJhZGlvQ2xhc3MgPSB0aGlzLmhhc0NvcnJlY3RSYWRpb0NsYXNzKHVpQ2xhc3Nlcyk7XHJcbiAgICBcclxuICAgICAgICBpZighaXNWYWxpZFJhZGlvQ2xhc3MpIHVpQ2xhc3NlcyA9IGAke3VpQ2xhc3Nlc30gcmFkaW9gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWkgJHt1aUNsYXNzZXN9IGNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgICAgICAgIDxsYWJlbD4gICBcclxuICAgICAgICAgICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICBgO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJbnB1dFN0YXRlIGFzIERlZmF1bHRJbnB1dFN0YXRlfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLmlucHV0LmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlIGV4dGVuZHMgRGVmYXVsdElucHV0U3RhdGUgeyBcclxuICAgIGNvbnN0cnVjdG9yKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSl7XHJcbiAgICAgICAgc3VwZXIoaGVhZGVyLCBmb3JtU2VjdGlvbiwgZm9vdGVyLCBkYXRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgY29udGFpbmVyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBoZWFkZXInO1xyXG4gICAgfSAgXHJcbn07IiwiaW1wb3J0IHtOYXZpZ2F0aW9uU3RhdGUgYXMgRGVmYXVsdE5hdmlnYXRpb25TdGF0ZX0gZnJvbSAnLi4vZGVmYXVsdC9zdGF0ZS5uYXZpZ2F0aW9uLmpzJztcblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TdGF0ZSBleHRlbmRzIERlZmF1bHROYXZpZ2F0aW9uU3RhdGUgeyAgICAgXG4gICAgY29uc3RydWN0b3IoZGF0YSwgbGlua1NlY3Rpb24pe1xuICAgICAgICBzdXBlcihkYXRhLCBsaW5rU2VjdGlvbik7XG4gICAgfVxuICAgIFxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICd1aSBjb250YWluZXInO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICd1aSBoZWFkZXInO1xuICAgIH1cbn07IiwiZXhwb3J0IGNsYXNzIFZpZGVvU3RhdGUgeyBcclxuICAgIGNvbnN0cnVjdG9yKHBsYXllclNlY3Rpb24sIGRhdGEpe1xyXG4gICAgICAgIHRoaXMucGxheWVyU2VjdGlvbiA9IHBsYXllclNlY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaVBob25lSW5saW5lQ2xhc3Nlcygpe1xyXG4gICAgICAgIGxldCB7aXNJcGhvbmUgPSBmYWxzZX0gPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0lwaG9uZSA/ICdpcGhvbmUtaW5saW5lJyA6ICcnOyBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGhlYWRlcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBodG1sKCkgeyAgIFxyXG4gICAgICAgIGxldCB7cGxheWVyU2VjdGlvbiwgZGF0YSwgaVBob25lSW5saW5lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge319ID0gZGF0YTtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgPGgxPiR7ZGF0YS5uYW1lfTwvaDE+YH0gPSBoZWFkZXI7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogc2VjdGlvbkNsYXNzZXMgPSAnJyB9ID0gc2VjdGlvbjtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWwgOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwidWkgY29udGFpbmVyICR7c2VjdGlvbkNsYXNzZXN9ICR7aVBob25lSW5saW5lQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cclxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7dGhpcy5kZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAke3BsYXllclNlY3Rpb259XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnB1dENvbnRhaW5lckNsYXNzTmFtZXMoc2V0dGluZ3MpIHtcclxuICAgICAgICBpZiAoIXNldHRpbmdzKSBzZXR0aW5ncyA9IHt9O1xyXG5cclxuICAgICAgICBsZXQge2NvbnRhaW5lckNsYXNzID0gJ2ZpZWxkJywgY2xhc3NlcyA9ICcnfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7Y29udGFpbmVyQ2xhc3N9ICR7Y2xhc3Nlc31gO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdpZHRoQ2xhc3NlcyhpbnB1dEhUTUwpIHtcclxuICAgICAgICBsZXQgY3VycmVudFdpZHRoVG90YWwgPSAwLjA7XHJcbiAgICAgICAgbGV0IGNvbHVtbnMgPSB7c3RyaW5nOiBcInR3ZWx2ZVwiLCBudW1iZXI6IDEyfTtcclxuICAgICAgICBsZXQgY29sdW1uTmFtZXMgPSBbXCJvbmVcIiwgXCJ0d29cIiwgXCJ0aHJlZVwiLCBcImZvdXJcIiwgXCJmaXZlXCIsIFwic2l4XCIsIFwic2V2ZW5cIiwgXCJlaWdodFwiLCBcIm5pbmVcIiAsXCJ0ZW5cIiwgXCJlbGV2ZW5cIiwgXCJ0d2VsdmVcIiwgXCJ0aGlydGVlblwiLCBcImZvdXJ0ZWVuXCIsIFwiZmlmdGVlblwiLCBcInNpeHRlZW5cIl1cclxuICAgICAgICBsZXQgY29udGVudHMgPSBpbnB1dEhUTUwucmVkdWNlKChjb250ZW50SFRNTCwgdGhpc0lucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7aHRtbCwgc2V0dGluZ3N9ID0gdGhpc0lucHV0O1xyXG4gICAgICAgICAgICBsZXQge3dpZHRoID0gXCIxXCIsIGNvbnRhaW5lciA9IHt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBsZXQge2NsYXNzZXMgPSAnJyB9ID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICBsZXQgbnVtZXJpY1dpZHRoID0gZ2V0TnVtZXJpY1dpZHRoKHdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGhUb3RhbCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SFRNTCA9IGAke2NvbnRlbnRIVE1MfTxkaXYgY2xhc3M9XCJzdGFja2FibGUgZmllbGRzXCI+IGBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgKz0gbnVtZXJpY1dpZHRoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlbWFudGljVUl3aWR0aCA9IGNvbHVtbk5hbWVzW01hdGgucm91bmQobnVtZXJpY1dpZHRoICogY29sdW1uTmFtZXMubGVuZ3RoKSAtIDFdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnaXZ4anMtZ3JpZC0xLTEnLCBgJHtzZW1hbnRpY1VJd2lkdGh9IHdpZGUgZmllbGQgJHtjbGFzc2VzfWApO1xyXG4gICAgICAgICAgICBjb250ZW50SFRNTCA9IGAke2NvbnRlbnRIVE1MfSR7aHRtbH1gO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aFRvdGFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRIVE1MO1xyXG4gICAgICAgIH0sICcnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihjb250ZW50cy5zdWJzdHJpbmcoY29udGVudHMubGVuZ3RoIC0gNykgIT09IFwiPC9kaXY+XCIpe1xyXG4gICAgICAgICAgICBjb250ZW50cyA9IGAke2NvbnRlbnRzfTwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TnVtZXJpY1dpZHRoKHdpZHRoU3RyaW5nKXtcclxuICAgICAgICAgICAgaWYod2lkdGhTdHJpbmcgPT09ICcxJykgcmV0dXJuIDE7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyc2VkV2lkdGhGb3JtdWxhID0gd2lkdGhTdHJpbmcuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHBhcnNlZFdpZHRoRm9ybXVsYVswXSkgLyBwYXJzZUZsb2F0KHBhcnNlZFdpZHRoRm9ybXVsYVsxXSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgVGV4dCBhcyBEZWZhdWx0VGV4dCB9IGZyb20gJy4uL2RlZmF1bHQvdGV4dC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBEZWZhdWx0VGV4dHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59OyIsImltcG9ydCB7IFRleHRhcmVhIGFzIERlZmF1bHRUZXh0YXJlYSB9IGZyb20gJy4uL2RlZmF1bHQvdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIERlZmF1bHRUZXh0YXJlYXtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59OyIsImltcG9ydCB7IFVybCBhcyBEZWZhdWx0VXJsIH0gZnJvbSAnLi4vZGVmYXVsdC91cmwuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwgZXh0ZW5kcyBEZWZhdWx0VXJse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07IiwiaW1wb3J0IERlZmF1bHRWaWRlb0NvbnRyb2xzIGZyb20gJy4uL2RlZmF1bHQvdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBEZWZhdWx0VmlkZW9Db250cm9scyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgc3VwZXIoY29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncGxheSBpY29uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGF1c2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncGF1c2UgaWNvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1bm11dGUgaWNvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnbXV0ZSBpY29uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndWkgaWNvbiBidXR0b24gcGxheS1wYXVzZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDb250cm9sc0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBpY29uIGJ1dHRvbiBtdXRlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndWkgc21hbGwgcHJvZ3Jlc3MnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBiYXJgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2b2x1bWVCYXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIGB1aSBzbWFsbCBwcm9ncmVzc2A7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIGBiYXJgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhckhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAgICAgICBcclxuICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWluLXdpZHRoOjBcIiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2xhYmVsJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLnRpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCJwcm9ncmVzcyAke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtaW4td2lkdGg6MFwiIGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUJ1dHRvbkhUTUwsIHNjcnViQmFySFRNTCwgdGltZXN0YW1wSFRNTCwgbXV0ZUJ1dHRvbkhUTUwsIHZvbHVtZUJhckhUTUx9ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAke3BsYXlQYXVzZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgJHttdXRlQnV0dG9uSFRNTH1cclxuICAgICAgICAke3ZvbHVtZUJhckhUTUx9YDtcclxuICAgIH1cclxufTsiLCIvKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IHdpdGggYXR0cmlidXRlcyBhbmQga2V5cyBpbnRvIEhUTUxcclxuICogdGhhdCBpbnB1dHMgY2FuIGJlIHVzZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlVGFncyB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUHVsbHMgYWxsIHRoZSBhdHRyaWJ1dGUgc2V0dGluZ3MgYW5kIHRoZSBhdHRyaWJ1dGVzIFxyXG4gICAgICogdG8gYmUgcmVuZGVyZWQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlRGF0YSAtIHNldHRpbmdzIGZvciBhbGwgdGhlIGF0dHJpYnV0ZXMuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhdHRyaWJ1dGVLZXlzIC0gYXR0cmlidXRlIG5hbWVzIHRvIGJlIHNldC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXR0cmlidXRlRGF0YSA9IHt9LCBhdHRyaWJ1dGVLZXlzID0gW10pe1xyXG4gICAgICAgXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIEFsbCBhdHRyaWJ1dGVzIHRvIGJlIG1hZGUuXHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZURhdGEgPSBhdHRyaWJ1dGVEYXRhO1xyXG4gICAgICAgXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIEF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgKi9cclxuICAgICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IGF0dHJpYnV0ZUtleXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGF0dHJpYnV0ZXMgYmFzZWQgb24gdGhlIGtleXMgYW5kIGF0dHJpYnV0ZSBkYXRhLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGF0dHJpYnV0ZURhdGEgPSB7IHJlcXVpcmVkID0gXCJ0cnVlXCJ9O1xyXG4gICAgICogYXR0cmlidXRlS2V5cyA9IFtcInJlcXVpcmVkXCJdO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBCZWNvbWVzOiBcclxuICAgICAqIGh0bWwgPSAncmVxdWlyZWQgPSBcInRydWVcIidcclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBsZXQge2F0dHJpYnV0ZUtleXMsIGF0dHJpYnV0ZURhdGF9ID0gdGhpcztcclxuICAgICAgICBsZXQgYXR0cmlidXRlSFRNTCA9IGF0dHJpYnV0ZUtleXMucmVkdWNlKCAoY3VycmVudEF0dHJpYnV0ZUhUTUwsIGN1cnJlbnRLZXkpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYoYXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlVGFnSFRNTCA9IGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0gPT09ICd0YWctb25seScgPyBcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgOlxyXG4gICAgICAgICAgICAgICAgYCR7Y3VycmVudEtleX09XCIke2F0dHJpYnV0ZURhdGFbY3VycmVudEtleV19XCJgXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRBdHRyaWJ1dGVIVE1MfSAke2F0dHJpYnV0ZVRhZ0hUTUx9IGA7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXR0cmlidXRlSFRNTDtcclxuICAgICAgICB9LCAnJyk7ICAgXHJcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZUhUTUw7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IFZpZGVvU2V0dGluZ3MgZnJvbSAnLi4vc2V0dGluZ3MuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29udHJ1Y3RvcigpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnR0aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBBVVNFKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihjYikge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMub25jZSh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFVF9EVVJBVElPTiwgKGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNiKGR1cmF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5HRVRfRFVSQVRJT04pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZvbHVtZSh2b2x1bWUpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfVk9MVU1FLCB2b2x1bWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlZWsoc2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFRUssIHNlY29uZHMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IENvbnRyb2xFdmVudHMgZnJvbSAnLi9ldmVudHMuanMnO1xyXG5pbXBvcnQgVmlkZW9FdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvdmlkZW8uZXZlbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbHMgZXh0ZW5kcyBDb250cm9sRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gMC41O1xyXG4gICAgICAgIHRoaXMuY29udHJvbEV2ZW50TmFtZXMgPSBuZXcgVmlkZW9FdmVudE5hbWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZShpVlhqc0J1cykge1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuVElNRV9VUERBVEUsIHRoaXMudXBkYXRlVGltZSk7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZSU5HLCB0aGlzLndoaWxlUGxheWluZyk7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgdGhpcy5jYW5QbGF5Q2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVBvc2l0aW9uID0geyB4OiBlbGVtZW50Lm9mZnNldExlZnQsIHk6IGVsZW1lbnQub2Zmc2V0VG9wIH07XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcFBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQub2Zmc2V0UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueCArPSB0ZW1wUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgcmVsYXRpdmVQb3NpdGlvbi55ICs9IHRlbXBQb3NpdGlvbi55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgYWRqdXN0Vm9sdW1lKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHt2b2x1bWVCYXIsIG11dGVDb250cm9scywgY3VycmVudFZvbHVtZSwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIG11dGVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtvZmZzZXRXaWR0aDogd2lkdGggfSA9IHZvbHVtZUJhcjtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbih2b2x1bWVCYXIpO1xyXG4gICAgICAgIGxldCB7eDogYWJzb2x1dGVYfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCB2b2x1bWVMZXZlbCA9ICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgbXV0ZUNvbnRyb2xzQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt2b2x1bWVMZXZlbCAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gdm9sdW1lTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lTGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjcnViKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZUluZm8sIHNjcnViQmFyLCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge29mZnNldFdpZHRoOiB3aWR0aH0gPSBzY3J1YkJhcjtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihzY3J1YkJhcik7XHJcbiAgICAgICAgbGV0IHt4OiBhYnNvbHV0ZVh9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHNjcnViVG9UaW1lID0gdGhpcy5kdXJhdGlvbiAqICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzY3J1YlRvVGltZSk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lU3RhbXAgPSB0aGlzLmNyZWF0ZVRpbWVTdGFtcChjdXJyZW50VGltZU9iamVjdCk7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCB0aW1lbGFwc2VkID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHNjcnViQmFyLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAke2N1cnJlbnRUaW1lU3RhbXB9YDtcclxuICAgICAgICB0aW1lbGFwc2VkLnN0eWxlLndpZHRoID0gYCR7KHRydWVYIC8gd2lkdGgpICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLnNlZWsoc2NydWJUb1RpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXlQYXVzZShldmVudCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXTtcclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoIChwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHBsYXlDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBwYXVzZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBsYXlDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRNdXRlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHttdXRlQ29udHJvbHMsIG11dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCB2b2x1bWVCYXIsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIG11dGVDb250cm9sc0NsYXNzZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG11dGVJY29uLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHVubXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSBtdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYDAlYDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBtdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3RoaXMuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeVRvUGxheShwbGF5ZXIsIHN0YXRlRGF0YSkge1xyXG4gICAgICAgIGxldCB7dm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuICAgICAgICBcclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3NlbGYuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldFZvbHVtZShzZWxmLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgIHRoaXMuZ2V0RHVyYXRpb24oKGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7dG90YWxUaW1lSW5mbywgY3VycmVudFRpbWVJbmZvLCBzY3J1YkJhcn0gPSBzZWxmO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25UaW1lT2JqZWN0ID0gc2VsZi5jb252ZXJ0U2Vjb25kc1RvUGFydHMoZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25UaW1lU3RhbXAgPSBzZWxmLmNyZWF0ZVRpbWVTdGFtcChkdXJhdGlvblRpbWVPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsVGltZUluZm8pIHRvdGFsVGltZUluZm8uaW5uZXJIVE1MID0gYC8ke2R1cmF0aW9uVGltZVN0YW1wfWA7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZUluZm8pIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgMDA6MDBgO1xyXG4gICAgICAgICAgICBpZiAoc2NydWJCYXIpIHNjcnViQmFyLmNoaWxkcmVuWzBdLnN0eWxlLndpZHRoID0gYDAlYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRpbWVVcGRhdGUocGxheWVyKSB7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZUluZm8sIHNjcnViQmFyLCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2N1cnJlbnRUaW1lOiBzZWNvbmRzfSA9IHBsYXllcjtcclxuXHJcbiAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgPiB0aGlzLmR1cmF0aW9uID8gMCA6IHNlY29uZHM7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGxldCBjdXJyZW50VGltZU9iamVjdCA9IHRoaXMuY29udmVydFNlY29uZHNUb1BhcnRzKHNlY29uZHMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gdGhpcy5jcmVhdGVUaW1lU3RhbXAoY3VycmVudFRpbWVPYmplY3QpO1xyXG4gICAgICAgIGxldCB0aW1lTGFwc2VkID0gc2Vjb25kcyAvIHRoaXMuZHVyYXRpb247XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50VGltZUluZm8pIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGltZVN0YW1wfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoc2NydWJCYXIpIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVsYXBzZWRFbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHNjcnViQmFyLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aW1lbGFwc2VkRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3RpbWVMYXBzZWQgKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGxheWluZygpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIHNlYXJjaENsYXNzZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QYXVzZWQoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzY3J1YkJhciwgdm9sdW1lQmFyLCBwbGF5UGF1c2VDb250cm9scywgbXV0ZUNvbnRyb2xzfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuaVZYanNCdXMgPSBpVlhqc0J1cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlRJTUVfVVBEQVRFLCB1cGRhdGVUaW1lKTtcclxuICAgICAgICB0aGlzLndoaWxlUGF1c2VkID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5QQVVTRUQsIHdoaWxlUGF1c2VkKTtcclxuICAgICAgICB0aGlzLndoaWxlUGxheWluZyA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWUlORywgd2hpbGVQbGF5aW5nKTtcclxuICAgICAgICB0aGlzLmNhblBsYXlDYWxsYmFjayA9ICBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkNBTl9QTEFZLCBjYW5QbGF5Q2FsbEJhY2spO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IHRoaXMudXBkYXRlVGltZSA/IHRoaXMudXBkYXRlVGltZSA6IHVwZGF0ZVRpbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdm9sdW1lQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmFkanVzdFZvbHVtZShldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NydWJCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zY3J1YihldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldFBsYXlQYXVzZShldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbXV0ZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0TXV0ZShldmVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY2FuUGxheUNhbGxCYWNrKHBsYXllciwgX3N0YXRlRGF0YSkge1xyXG4gICAgICAgICAgICBzZWxmLm9uUmVhZHlUb1BsYXkocGxheWVyLCBfc3RhdGVEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKHBsYXllcikge1xyXG4gICAgICAgICAgICBzZWxmLm9uVGltZVVwZGF0ZShwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hpbGVQYXVzZWQocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25QYXVzZWQocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdoaWxlUGxheWluZygpIHtcclxuICAgICAgICAgICAgc2VsZi5vblBsYXlpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudEJ5Q2xhc3NlcyhlbGVtZW50cywgY2xhc3Nlcykge1xyXG4gICAgICAgIGxldCBlbGVtZW50QXJyYXkgPSBlbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5ID9cclxuICAgICAgICAgICAgZWxlbWVudHMgOlxyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGVsZW1lbnRzKTtcclxuICAgICAgICBsZXQgdGhpc0VsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpc0VsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXNFbGVtZW50ID0gZWxlbWVudEFycmF5LmZpbmQoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpID49IDA7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUaW1lU3RhbXAodGltZU9iamVjdCkge1xyXG4gICAgICAgIGxldCB7aG91cnMsIHJlbWFpbmluZ01pbnV0ZXM6IG1pbnV0ZXMsIHJlbWFpbmluZ1NlY29uZHM6IHNlY29uZHN9ID0gdGltZU9iamVjdDtcclxuICAgICAgICBsZXQgaG91clN0cmluZyA9ICcnO1xyXG4gICAgICAgIGxldCBtaW51dGVTdHJpbmcgPSBtaW51dGVzIDwgMTAgP1xyXG4gICAgICAgICAgICBgMCR7bWludXRlc306YCA6XHJcbiAgICAgICAgICAgIGAke21pbnV0ZXN9OmA7XHJcbiAgICAgICAgbGV0IHNlY29uZFN0cmluZyA9IHNlY29uZHMgPCAxMCA/XHJcbiAgICAgICAgICAgIGAwJHtzZWNvbmRzfWAgOlxyXG4gICAgICAgICAgICBgJHtzZWNvbmRzfWA7XHJcblxyXG4gICAgICAgIGlmIChob3VycyA+IDApIHtcclxuICAgICAgICAgICAgaG91clN0cmluZyA9IGhvdXJzIDwgMTAgP1xyXG4gICAgICAgICAgICAgICAgYDAke2hvdXJzfTpgIDpcclxuICAgICAgICAgICAgICAgIGAke2hvdXJzfTpgO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtob3VyU3RyaW5nfSR7bWludXRlU3RyaW5nfSR7c2Vjb25kU3RyaW5nfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydFNlY29uZHNUb1BhcnRzKHNlY29uZHMpIHtcclxuICAgICAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBsZXQgdGltZUluZm9ybWF0aW9uID0ge1xyXG4gICAgICAgICAgICBtaW51dGVzOiBtaW51dGVzLFxyXG4gICAgICAgICAgICBob3VyczogTWF0aC5mbG9vcihtaW51dGVzIC8gNjApLFxyXG4gICAgICAgICAgICByZW1haW5pbmdTZWNvbmRzOiBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCksXHJcbiAgICAgICAgICAgIHJlbWFpbmluZ01pbnV0ZXM6IE1hdGguZmxvb3IobWludXRlcyAlIDYwKSxcclxuICAgICAgICAgICAgc2Vjb25kczogc2Vjb25kc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWVJbmZvcm1hdGlvbjtcclxuICAgIH1cclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyQ29udHJvbEV2ZW50cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcInBsYXlcIiA6ICdpVlg6dmlkZW86cGxheScsXHJcbiAgICAgICAgICAgIFwicGF1c2VcIiA6ICdpVlg6dmlkZW86cGF1c2UnLFxyXG4gICAgICAgICAgICBcInNlZWtcIiA6ICdpVlg6dmlkZW86c2Vla2VkJyxcclxuICAgICAgICAgICAgXCJwbGF5aW5nXCIgOiBcImlWWDp2aWRlbzpwbGF5aW5nXCIsXHJcbiAgICAgICAgICAgIFwiZW5kZWRcIiA6IFwiaVZYOnZpZGVvOmVuZGVkXCIsXHJcbiAgICAgICAgICAgIFwicGF1c2VkXCIgOiBcImlWWDp2aWRlbzpwYXVzZWRcIixcclxuICAgICAgICAgICAgXCJzZXRWb2x1bWVcIiA6ICdpVlg6dmlkZW86c2V0Vm9sdW1lJyxcclxuICAgICAgICAgICAgXCJkdXJhdGlvblwiIDogXCJpVlg6dmlkZW86cmVxdWVzdER1cmF0aW9uXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RHVyYXRpb25cIiA6IFwiaVZYOnZpZGVvOmdldER1cmF0aW9uXCIsXHJcbiAgICAgICAgICAgIFwiY2FuUGxheVwiIDogXCJpVlg6dmlkZW86Y2FucGxheVwiLFxyXG4gICAgICAgICAgICBcInRpbWVVcGRhdGVcIiA6IFwiaVZYOnZpZGVvOnRpbWV1cGRhdGVcIixcclxuICAgICAgICAgICAgXCJkaXNwb3NlXCIgOiBcImlWWDp2aWRlbzpkaXNwb3NlXCIsXHJcbiAgICAgICAgICAgIFwidm9sdW1lXCIgOiAnaVZYOnZpZGVvOnNldFZvbHVtZScgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihsb2cpIHtcblx0XHR0aGlzLmxvZyA9IGxvZ1xuXHR9XG5cblx0YXNzZXJ0KHRlc3QsIG5hbWUsIG1lc3NhZ2UpIHtcblx0XHRsZXQge2xvZ30gPSB0aGlzO1xuXHRcdGxldCB7c2hvdzogZGVidWd9ID0gbG9nO1xuXG5cdFx0aWYgKCF0ZXN0KSB7XG5cdFx0XHRsZXQgZXJyb3JPYmogPSB7IFxuXHRcdFx0XHRtZXNzYWdlIDogYCR7bmFtZX0gaXMgaW52YWxpZDogJHttZXNzYWdlfS5gXG5cdFx0XHR9O1xuXG5cdFx0XHRpZihkZWJ1Zyl7XG5cdFx0XHRcdHRoaXMubG9nLmVycm9yKGVycm9yT2JqLCBcIkFTU0VSVFwiKTtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yT2JqLm1lc3NhZ2UpO1xuXHRcdFx0fSBcblx0XHR9XG5cblx0XHRyZXR1cm4gdGVzdDtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBUeXBlVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqICYmIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTnVtYmVyKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai52YWx1ZU9mKCkgPT09ICdib29sZWFuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eShvYmopIHtcclxuICAgICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIGxldCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmopO1xyXG4gICAgICAgIGxldCBpc1N0cmluZyA9IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG4gICAgICAgIGxldCBjaGVja0xlbmd0aCA9IGlzQXJyYXkgfHwgaXNTdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzTmFOKG9iaikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQYXJzZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB5b3UgdG8gbWFwIGFuIG9iamVjdCBieSB0aGUga2V5cyBvZiBhIGdpdmVuIG9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBvYmplY3QgdG8gbWFwO1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBydW4gYnkgZWFjaCB2YWx1ZSBhbmQga2V5ICBcclxuICAgICAqL1xyXG4gICAgbWFwS2V5cyhvYmplY3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcbiAgICAgICAgbGV0IG1hcHBlZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICghcmVkdWNlTWFwKSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBtYXBwZWRBcnJheS5wdXNoKGNhbGxiYWNrKHZhbCwga2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWRBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShiYXNlLCBtZXJnZWQsIGlnbm9yZSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRLZXlzID0gT2JqZWN0LmtleXMobWVyZ2VkKTtcclxuICAgICAgICBsZXQgdW5pb25lZE9iamVjdCA9IG5ldyBPYmplY3QoYmFzZSk7XHJcblxyXG4gICAgICAgIG1lcmdlZEtleXMuZm9yRWFjaCgobWVyZ2VkS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKG1lcmdlZEtleSkgPj0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB1bmlvbmVkT2JqZWN0W21lcmdlZEtleV0gPSBtZXJnZWRbbWVyZ2VkS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaW9uZWRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkdWNlKG9iamVjdCwgY2FsbGJhY2ssIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGNhbGxiYWNrKGRlZmF1bHRWYWx1ZSwgdmFsLCBrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhIGNvbGxlY3Rpb24gdG8gZmluZCBpZiBhbnkgb2YgdGhlIHZhbHVlcyBcclxuICAgICAqIHdpdGggdGhlIGtleXMgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIGFueUVtcHR5KGNvbGxlY3Rpb24sIGtleXMpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShlbGVtZW50W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uaW5kZXhPZihlbGVtZW50KSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja0VsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbGVtZW50S2V5cyA9IE9iamVjdC5rZXlzKGNoZWNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRLZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IGNoZWNrRWxlbWVudFtrZXldID09PSBlbGVtZW50W2tleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnQuZm9yRWFjaCgodGVzdEVsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gdGVzdEVsZW1lbnQgPT09IGFycmF5RWxlbWVudFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBvID0gb2JqZWN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBhW2ldO1xyXG4gICAgICAgICAgICBpZiAobiBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9bbl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9bYVthLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBhdGgocGF0aCwgb2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gb2JqZWN0O1xyXG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgcGF0aFBhcnRzLmZvckVhY2goKHBhdGhQYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KHBhdGhQYXJ0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IG9sZERhdGFbcGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShjdXJyZW50RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBzZWUgaWYgdGhlIHZhbHVlcyBcclxuICAgICAqIGF0IHRoZSBrZXlzIGlzIHVuaXF1ZSBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kaWNhdGluZyBcclxuICAgICAqIGlmIHRoZXkgYXJlIHVuaXF1ZSBhbmQgYW55IGVycm9ycyB0aGF0IGRvbid0IG1hdGNoIGZvciBcclxuICAgICAqIGNvcnJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGlzVW5pcXVlKGNvbGxlY3Rpb24gPSBbXSwga2V5cyA9IFtdKSB7XHJcbiAgICAgICAgbGV0IGhhc1VuaXF1ZSA9IHtcclxuICAgICAgICAgICAgaXNVbmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhbGxVbmlxdWVWYWx1ZXMgPSB7fTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldID0gW107XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RVbmlxdWUgPSBzZWxmLmhhcyhhbGxVbmlxdWVWYWx1ZXNba2V5XSwgZWxlbWVudFtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90VW5pcXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5pc1VuaXF1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XS5wdXNoKGVsZW1lbnRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNVbmlxdWU7XHJcbiAgICB9XHJcbn07Il19
