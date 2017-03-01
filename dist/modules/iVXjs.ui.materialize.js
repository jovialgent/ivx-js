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
        value: function renderRadioHTML(attrHTML, label, name, value) {
            return ' \n            <input name="' + name + '"" type="radio" id="' + (value + name) + '" ' + attrHTML + '>\n            <label for="' + (value + name) + '">' + label + '</label>\n        ';
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

            var radiosHTML = radios.reduce(function (html, radio) {
                var label = radio.label,
                    _radio$attrHTML = radio.attrHTML,
                    attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML,
                    _radio$classes = radio.classes,
                    classes = _radio$classes === undefined ? '' : _radio$classes,
                    value = radio.value;


                attrHTML = attrHTML + ' ' + errorTags;

                var radioHTML = self.renderRadioHTML(attrHTML, label, name, value);

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
                headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
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

            var inputHTML = ' \n            \n            <input ' + nonValidateAttributesHTML + ' class="' + classes + '"  id="' + id + '" name="' + name + '"  type="text"    ' + errorTags + ' ' + tags + '>\n           \n            ' + errorHTML + '\n             <label for="' + name + '"> ' + label + ' </label>\n       ';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvZmlyZWJhc2UuYXV0aGVudGljYXRpb24uanMiLCJzcmMvY29uc3RhbnRzL2ZpcmViYXNlLmpzIiwic3JjL2NvbnN0YW50cy9pbmRleC5qcyIsInNyYy9jb25zdGFudHMvdmlkZW8uZXZlbnRzLmpzIiwic3JjL2NvbnN0YW50cy92aWRlby5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvYW5jaG9yLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9idXR0b25zLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZGF0ZS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZGF0ZXRpbWUtbG9jYWwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2VtYWlsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9vcHRpb25zLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3RhdGUuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0eWxlLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdXJsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQuZmlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvY29udHJvbGxlcnMvaW5wdXQucGFzc3dvcmQuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9hbmd1bGFyL2RpcmVjdGl2ZXMvaW5wdXQuZmlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvZGlyZWN0aXZlcy9pbnB1dC5wYXNzd29yZC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2J1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvZmlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2Zvcm0uanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL21lc3NhZ2VzLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3Bhc3N3b3JkLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvcmFkaW8uanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9yYW5nZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3N0YXRlLmlucHV0LmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvZXZlbnRzLmpzIiwic3JjL21vZHVsZXMvdmlkZW8vY29udHJvbHMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy92aWRlby9zZXR0aW5ncy5qcyIsInNyYy91dGlsaXRpZXMvYXNzZXJ0cy5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLHFCO0FBQVQsU0FBUyxxQkFBVCxDQUErQixXQUEvQixFQUE0QztBQUMxRCxLQUFJLGdCQUFnQixXQUFwQjtBQUNBLEtBQUksT0FBTyxjQUFjLE9BQXpCO0FBQ0EsS0FBSSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBYTtBQUFBLG9DQUFULElBQVM7QUFBVCxPQUFTO0FBQUE7O0FBQy9CLDRDQUFXLGFBQVgsZ0JBQTRCLElBQTVCO0FBQ0gsRUFGRDs7QUFJQSxNQUFLLElBQUwsQ0FBVSxlQUFWOztBQUVBLFFBQU8sSUFBUDtBQUNBOzs7Ozs7Ozs7O0FDVkQ7Ozs7QUFDQSxJQUFJLGtCQUFrQixnQ0FBdEI7O0lBRWEscUIsV0FBQSxxQixHQUNULCtCQUFZLE1BQVosRUFBb0IsS0FBcEIsRUFBMkIsWUFBM0IsRUFBeUM7QUFBQTs7QUFBQSxRQUNyQixLQURxQixHQUNaLE1BRFksQ0FDaEMsU0FEZ0M7O0FBRXJDLFFBQUkseUJBQXlCLE1BQU0sVUFBTixDQUFpQixJQUFqQixDQUFzQixNQUFNLElBQTVCLENBQTdCOztBQUVBLFFBQUksTUFBTSxJQUFOLEtBQWUsVUFBbkIsRUFBK0I7QUFDM0IsZUFBTyxVQUFQLEdBQW9CLHNCQUFwQjtBQUNILEtBRkQsTUFFTyxJQUFHLHNCQUFILEVBQTBCO0FBQzdCLGVBQU8sVUFBUCxHQUFvQixzQkFBcEI7QUFDSDs7QUFFRCxXQUFPLEdBQVAsQ0FBVyxTQUFYLEVBQXNCLFVBQVMsS0FBVCxFQUFnQixLQUFoQixFQUFzQjtBQUN4QyxlQUFPLE1BQVA7QUFDSCxLQUZEOztBQUlBLFNBQUssUUFBTCxHQUFnQixVQUFDLEtBQUQsRUFBVztBQUN2QixZQUFJLE1BQU0sSUFBTixLQUFlLFVBQW5CLEVBQStCO0FBQzNCLG9CQUFRLFFBQVEsTUFBUixHQUFpQixPQUF6QjtBQUNIOztBQUVELFlBQUksQ0FBQyxnQkFBZ0IsT0FBaEIsQ0FBd0IsS0FBeEIsQ0FBRCxJQUFtQyxpQkFBaUIsSUFBeEQsRUFBOEQ7O0FBRTFELGdCQUFJLFVBQVUsTUFBVixJQUFvQixVQUFVLE9BQWxDLEVBQTJDO0FBQ3ZDLHdCQUFRLFVBQVUsTUFBbEI7QUFDSDs7QUFKeUQsZ0JBTXJELElBTnFELEdBTTlCLEtBTjhCLENBTXJELElBTnFEO0FBQUEsa0NBTTlCLEtBTjhCLENBTS9DLFFBTitDO0FBQUEsZ0JBTS9DLFFBTitDLG1DQU1wQyxFQU5vQzs7O0FBUTFELHFCQUFTLE9BQVQsQ0FBaUI7QUFDYiwyQkFBVyxTQURFO0FBRWIsc0JBQU07QUFDRix5QkFBSyxJQURIO0FBRUYsMkJBQU87QUFGTDtBQUZPLGFBQWpCOztBQVFBLHlCQUFhLGNBQWIsQ0FBNEIsUUFBNUIsRUFBc0MsWUFBTSxDQUUzQyxDQUZEO0FBR0g7QUFDSixLQXpCRDtBQTBCSCxDOzs7Ozs7Ozs7Ozs7QUM1Q0w7Ozs7QUFFQSxJQUFJLG1CQUFtQixnQ0FBdkI7O0lBRWEsYSxXQUFBLGE7QUFDVCwyQkFBWSxLQUFaLEVBQW1CLE1BQW5CLEVBQTRDO0FBQUEsWUFBakIsVUFBaUIsdUVBQUosRUFBSTs7QUFBQTs7QUFBQSxZQUM3QixTQUQ2QixHQUNDLEtBREQsQ0FDbkMsSUFEbUM7QUFBQSxZQUNaLFNBRFksR0FDQyxLQURELENBQ2xCLElBRGtCOztBQUV4QyxhQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0g7Ozs7NEJBRVU7QUFBQSxnQkFDRixVQURFLEdBQ1ksSUFEWixDQUNGLFVBREU7O0FBRVAsZ0JBQUksa0JBQWtCLEtBQUssZUFBM0I7QUFDQSxnQkFBSSxhQUFhLEtBQUssVUFBdEI7QUFDQSxnQkFBSSxjQUFjLEtBQUssV0FBdkI7O0FBRUEsbUJBQU8saUJBQWlCLE1BQWpCLENBQXdCLFVBQXhCLEVBQW9DLFVBQUMsSUFBRCxFQUFPLGNBQVAsRUFBdUIsWUFBdkIsRUFBd0M7QUFDL0Usb0JBQUksWUFBWSxPQUFaLENBQW9CLFlBQXBCLEtBQXFDLENBQXpDLEVBQTRDLE9BQU8sSUFBUDtBQUM1QyxvQkFBSSxNQUFNLFdBQVcsT0FBWCxDQUFtQixZQUFuQixLQUFvQyxDQUFwQyxHQUNILFlBREcsVUFDYyxjQURkLGlCQUVBLGdCQUFnQixZQUFoQixDQUZBLFlBRW9DLGNBRnBDLE9BQVY7QUFHQSx1QkFBVSxJQUFWLFNBQWtCLEdBQWxCO0FBQ0gsYUFOTSxFQU1KLEVBTkksQ0FBUDtBQU9IOzs7NEJBRWM7QUFBQSxnQkFDTixTQURNLEdBQ3NDLElBRHRDLENBQ04sU0FETTtBQUFBLGdCQUNLLFNBREwsR0FDc0MsSUFEdEMsQ0FDSyxTQURMO0FBQUEsZ0JBQ2dCLE1BRGhCLEdBQ3NDLElBRHRDLENBQ2dCLE1BRGhCO0FBQUEsZ0JBQ3dCLFVBRHhCLEdBQ3NDLElBRHRDLENBQ3dCLFVBRHhCOztBQUVYLGdCQUFJLGtCQUFrQixLQUFLLGVBQTNCO0FBQ0EsZ0JBQUksa0JBQWtCLEtBQUssb0JBQTNCO0FBQ0EsZ0JBQUksZ0JBQWdCLE9BQU8sSUFBUCxDQUFZLFVBQVosRUFBd0IsR0FBeEIsQ0FBNEIsVUFBQyxZQUFELEVBQWUsS0FBZixFQUF5QjtBQUNyRSxvQkFBSSxVQUFVLFVBQVUsT0FBTyxZQUFQLENBQVYsR0FBaUMsT0FBTyxZQUFQLENBQWpDLEdBQXdELGdCQUFnQixZQUFoQixDQUF0RTtBQUNBLG9CQUFJLDhDQUEyQyxTQUEzQywyRUFBd0gsU0FBeEgsbUJBQThJLGdCQUFnQixZQUFoQixDQUE5SSxNQUFKOztBQUVBLHVCQUFPO0FBQ0gsNkJBQVMsT0FETjtBQUVILDhCQUFVO0FBRlAsaUJBQVA7QUFJSCxhQVJtQixDQUFwQjs7QUFXQSxnQkFBSSxhQUFhLGNBQWMsTUFBM0IsSUFBcUMsYUFBYSxTQUF0RCxFQUFpRTtBQUM3RCw4QkFBYyxJQUFkLENBQW1CLEtBQUssY0FBeEI7QUFDSDs7QUFFRCxtQkFBTyxhQUFQO0FBQ0g7Ozs0QkFFb0I7QUFBQSxnQkFDWixTQURZLEdBQ29CLElBRHBCLENBQ1osU0FEWTtBQUFBLGdCQUNELFNBREMsR0FDb0IsSUFEcEIsQ0FDRCxTQURDO0FBQUEsZ0JBQ1UsTUFEVixHQUNvQixJQURwQixDQUNVLE1BRFY7O0FBRWpCLGdCQUFJLGVBQWUsT0FBTyxTQUFQLENBQW5COztBQUVBLG1CQUFPO0FBQ0gseUJBQVMsZUFBZSxZQUFmLEdBQThCLGFBQWEsU0FEakQ7QUFFSCw2REFBMEMsU0FBMUMsMkVBQXVILFNBQXZILG1CQUE2SSxTQUE3STtBQUZHLGFBQVA7QUFJSDs7OzRCQUVnQjtBQUNiLG1CQUFPLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxVQUFmLEVBQTJCLGFBQTNCLEVBQTBDLE1BQTFDLEVBQWtELFVBQWxELENBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLENBQUMsTUFBRCxFQUFTLGFBQVQsRUFBd0IsVUFBeEIsQ0FBUDtBQUNIOzs7NEJBRXFCO0FBQ2xCLG1CQUFPO0FBQ0gsMkJBQVcsV0FEUjtBQUVILHFCQUFLLEtBRkY7QUFHSCxxQkFBSyxLQUhGO0FBSUgsMEJBQVUsVUFKUDtBQUtILDJCQUFXO0FBTFIsYUFBUDtBQU9IOzs7NEJBRTBCO0FBQ3ZCLG1CQUFPO0FBQ0gsMkJBQVcsV0FEUjtBQUVILHFCQUFLLFNBRkY7QUFHSCxxQkFBSyxVQUhGO0FBSUgsMEJBQVUsVUFKUDtBQUtILDJCQUFXO0FBTFIsYUFBUDtBQU9IOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLGNBQUwsR0FBc0IsTUFBdEI7O0FBRUEsWUFBSSxhQUFhO0FBQ2IsOEJBQW1CLGtCQUROO0FBRWIsMEJBQWUsY0FGRjtBQUdiLDRCQUFpQjtBQUhKLFNBQWpCOztBQU1BLGNBQUssUUFBTCxDQUFjLFVBQWQ7QUFYUztBQVlaOzs7O21DQUVVLFMsRUFBVztBQUFBLGdCQUNiLFNBRGEsR0FDZ0IsSUFEaEIsQ0FDYixTQURhO0FBQUEsZ0JBQ0YsY0FERSxHQUNnQixJQURoQixDQUNGLGNBREU7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsY0FBM0MsR0FBNEQsU0FBNUQsR0FBd0UsU0FBeEU7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLFFBQUwsR0FBZ0IsVUFBaEI7QUFIUztBQUlaOzs7O3FDQUVXO0FBQUEsZ0JBQ0gsU0FERyxHQUNvQixJQURwQixDQUNILFNBREc7QUFBQSxnQkFDUSxRQURSLEdBQ29CLElBRHBCLENBQ1EsUUFEUjs7O0FBR1IscUlBQWdDLFNBQWhDLEdBQTRDLFFBQTVDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkQsc0JBQWE7QUFBQTs7QUFDVCxhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0g7Ozs7cUNBRVc7QUFDUixtQkFBTyxLQUFLLE9BQVo7QUFDSDs7O2lDQUVRLGMsRUFBZTtBQUNwQixnQkFBSSxPQUFPLElBQVg7QUFDQSxnQkFBSSxRQUFRLE9BQU8sSUFBUCxDQUFZLGNBQVosQ0FBWjs7QUFFQSxrQkFBTSxPQUFOLENBQWMsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFnQjtBQUMxQixxQkFBSyxJQUFMLElBQWEsS0FBSyxVQUFMLENBQWdCLGVBQWUsSUFBZixDQUFoQixDQUFiO0FBQ0gsYUFGRDtBQUdIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJMOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUdWLFlBQUksYUFBYTtBQUNiLCtCQUFtQixtQkFETjtBQUViLHVCQUFZLFdBRkM7QUFHYixzQkFBVSxVQUhHO0FBSWIscUJBQVUsU0FKRztBQUtiLG1CQUFRLE9BTEs7QUFNYiwwQkFBYyxjQU5EO0FBT2Isa0JBQU0sTUFQTztBQVFiLG1CQUFPLE9BUk07QUFTYixvQkFBUSxRQVRLO0FBVWIsa0JBQU0sTUFWTztBQVdiLHFCQUFTLFNBWEk7QUFZYiwwQkFBZSxjQVpGO0FBYWIsa0JBQU0sTUFiTztBQWNiLDBCQUFjLGNBZEQ7QUFlYix3QkFBWSxZQWZDO0FBZ0JiLHlCQUFhLGFBaEJBO0FBaUJiLG9CQUFRO0FBakJLLFNBQWpCOztBQW9CQSxjQUFLLFFBQUwsQ0FBYyxVQUFkO0FBdkJVO0FBd0JiOzs7O21DQUVVLFMsRUFBVztBQUFBLGdCQUNiLFNBRGEsR0FDQSxJQURBLENBQ2IsU0FEYTs7O0FBR2xCLHFJQUErQixTQUEvQixHQUEyQyxTQUEzQztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNMOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYTtBQUFBOztBQUFBOztBQUdULGNBQUssS0FBTCxHQUFhLE9BQWI7QUFIUztBQUlaOzs7O3FDQUVXO0FBQUEsZ0JBQ0gsU0FERyxHQUNpQixJQURqQixDQUNILFNBREc7QUFBQSxnQkFDUSxLQURSLEdBQ2lCLElBRGpCLENBQ1EsS0FEUjs7O0FBR1IscUlBQWdDLFNBQWhDLEdBQTRDLEtBQTVDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JMOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxZQUFZLGdDQUFoQjs7SUFFYSxNLFdBQUEsTTtBQUNULG9CQUFZLFVBQVosRUFBd0I7QUFBQTs7QUFDckIsYUFBSyxVQUFMLEdBQWtCLFVBQWxCO0FBRUY7Ozs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixhQURFLEdBQ2UsSUFEZixDQUNGLGFBREU7QUFBQSw4QkFFK0UsS0FBSyxVQUZwRjtBQUFBLCtDQUVGLElBRkU7QUFBQSxnQkFFRixJQUZFLG9DQUVLLEVBRkw7QUFBQSxrREFFUyxPQUZUO0FBQUEsZ0JBRVMsT0FGVCx1Q0FFbUIsRUFGbkI7QUFBQSxvREFFdUIsVUFGdkI7QUFBQSxnQkFFdUIsVUFGdkIseUNBRW9DLEVBRnBDO0FBQUEsZ0RBRXdDLEtBRnhDO0FBQUEsZ0JBRXdDLEtBRnhDLHFDQUVnRCxTQUZoRDtBQUFBLGdCQUUyRCxTQUYzRCxlQUUyRCxTQUYzRDtBQUFBLDZDQUVzRSxFQUZ0RTtBQUFBLGdCQUVzRSxFQUZ0RSxrQ0FFeUUsRUFGekU7O0FBR1AsZ0JBQUksZ0JBQWdCLDhCQUFrQixVQUFsQixFQUE4QixPQUFPLElBQVAsQ0FBWSxVQUFaLENBQTlCLEVBQXVELElBQTNFOztBQUVBLGdCQUFHLENBQUMsU0FBRCxJQUFjLENBQUMsS0FBbEIsRUFBd0I7QUFDcEIsd0JBQVEsSUFBUjtBQUNIOztBQUVELCtDQUNjLEVBRGQsa0JBQzRCLE9BRDVCLFNBQ3VDLGFBRHZDLGlCQUNnRSxJQURoRSxVQUN5RSxhQUR6RSxXQUMyRixZQUFZLFNBQVosR0FBd0IsS0FEbkg7QUFHSDs7Ozs7Ozs7Ozs7Ozs7OztBQzVCTDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksUUFBUSxrQkFBWjtBQUNBLElBQUksWUFBWSxnQ0FBaEI7O0FBRUE7Ozs7O0lBSWEsTyxXQUFBLE87O0FBRVQ7Ozs7Ozs7Ozs7QUFVQSx1QkFBZ0U7QUFBQSxZQUFwRCxPQUFvRCx1RUFBMUMsRUFBMEM7QUFBQSxZQUF0QyxLQUFzQztBQUFBLFlBQS9CLGFBQStCOztBQUFBOztBQUU1RDs7OztBQUlBLGFBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUE7Ozs7QUFJQSxhQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBOzs7OztBQUtBLGFBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQTs7Ozs7QUFLQSxhQUFLLGFBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs0QkFNb0I7QUFDaEIsbUJBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXNCVztBQUFBLDBCQUNrRSxJQURsRSxDQUNGLE1BREU7QUFBQSxnQkFDTSxVQUROLDJCQUNtQixFQURuQjtBQUFBLDJCQUNrRSxJQURsRSxDQUN1QixPQUR2QjtBQUFBLGdCQUN1QixPQUR2Qiw0QkFDaUMsRUFEakM7QUFBQSx5QkFDa0UsSUFEbEUsQ0FDcUMsS0FEckM7QUFBQSxnQkFDcUMsS0FEckMsMEJBQzZDLEVBRDdDO0FBQUEsZ0JBQ2lELGFBRGpELEdBQ2tFLElBRGxFLENBQ2lELGFBRGpEO0FBQUEsd0NBRStDLFVBRi9DLENBRUQsVUFGQztBQUFBLGdCQUVELFVBRkMseUNBRVksRUFGWjtBQUFBLHFDQUUrQyxVQUYvQyxDQUVnQixNQUZoQjtBQUFBLGdCQUVnQixNQUZoQixzQ0FFeUIsRUFGekI7QUFBQSx1Q0FFK0MsVUFGL0MsQ0FFNkIsUUFGN0I7QUFBQSxnQkFFNkIsUUFGN0Isd0NBRXdDLEVBRnhDOztBQUdQLGdCQUFJLHNCQUFzQixPQUFPLElBQVAsQ0FBWSxVQUFaLEVBQXdCLEdBQXhCLENBQTRCLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDbEUsdUJBQU87QUFDSCxrQ0FBWSxPQUFPLEdBQVAsQ0FEVDtBQUVILDhCQUFVO0FBRlAsaUJBQVA7QUFJSCxhQUx5QixDQUExQjtBQU1BLGdCQUFJLGdCQUFnQixJQUFJLEtBQUssYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsSUFBaEU7QUFUTywrQkFVbUQsS0FWbkQsQ0FVRixLQVZFO0FBQUEsZ0JBVUYsS0FWRSxnQ0FVTSxFQVZOO0FBQUEsbUNBVW1ELEtBVm5ELENBVVUsU0FWVjtBQUFBLGdCQVVVLFNBVlYsb0NBVXNCLEVBVnRCO0FBQUEsbUNBVW1ELEtBVm5ELENBVTBCLFNBVjFCO0FBQUEsZ0JBVTBCLFNBVjFCLG9DQVVzQyxLQVZ0QztBQUFBLGdCQVU2QyxFQVY3QyxHQVVtRCxLQVZuRCxDQVU2QyxFQVY3Qzs7QUFXUCxnQkFBSSxjQUFjLFFBQVEsTUFBUixDQUFlLFVBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxLQUFmLEVBQXlCO0FBQUEsb0JBQ2hELEtBRGdELEdBQ1QsTUFEUyxDQUNoRCxLQURnRDtBQUFBLHVDQUNULE1BRFMsQ0FDekMsUUFEeUM7QUFBQSxvQkFDekMsUUFEeUMsb0NBQzlCLEVBRDhCO0FBQUEsc0NBQ1QsTUFEUyxDQUMxQixPQUQwQjtBQUFBLG9CQUMxQixPQUQwQixtQ0FDaEIsRUFEZ0I7OztBQUd0RCx1QkFBVSxJQUFWLHNDQUNpQixRQURqQixpQkFDb0MsT0FEcEMsU0FDK0MsYUFEL0Msb0NBRWEsS0FGYjtBQUlILGFBUGlCLEVBT2YsRUFQZSxDQUFsQjs7QUFTQSxnQkFBSSxDQUFDLFVBQVUsTUFBVixHQUFtQixDQUFuQixJQUF3QixNQUFNLE1BQU4sR0FBZSxDQUF4QyxLQUE4QyxTQUFsRCxFQUE2RDtBQUN6RCw0QkFBWSxZQUFZLFNBQVosR0FBd0IsS0FBcEM7QUFDQSw4Q0FBMkIsRUFBM0IsV0FBa0MsU0FBbEM7QUFDSDs7QUFFRCx1Q0FDTyxTQURQLHVCQUVPLFdBRlAsdUJBR08sYUFIUDtBQUtIOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEhMOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxRQUFRLGtCQUFaOztBQUVBOzs7OztJQUlhLFEsV0FBQSxROztBQUVUOzs7Ozs7Ozs7O0FBVUEsd0JBQTBEO0FBQUEsWUFBOUMsUUFBOEMsdUVBQW5DLEVBQW1DO0FBQUEsWUFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsWUFDakQsS0FEaUQsR0FDRCxRQURDLENBQ2pELEtBRGlEO0FBQUEsNkJBQ0QsUUFEQyxDQUMxQyxJQUQwQztBQUFBLFlBQzFDLElBRDBDLGtDQUNuQyxFQURtQztBQUFBLGlDQUNELFFBREMsQ0FDL0IsUUFEK0I7QUFBQSxZQUMvQixRQUQrQixzQ0FDcEIsRUFEb0I7QUFBQSwrQkFDRCxRQURDLENBQ2hCLE1BRGdCO0FBQUEsWUFDaEIsTUFEZ0Isb0NBQ1AsRUFETzs7QUFHdEQ7Ozs7O0FBSUEsYUFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTs7OztBQUlBLGFBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7Ozs7QUFJQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7O0FBS0EsYUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7OztBQUlBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBNkJBOzs7Ozs7Ozs7Ozs7O2dEQWF3QixPLEVBQVMsVSxFQUFZO0FBQUEsZ0JBQ3BDLEtBRG9DLEdBQ2pCLElBRGlCLENBQ3BDLEtBRG9DO0FBQUEsZ0JBQzdCLFFBRDZCLEdBQ2pCLElBRGlCLENBQzdCLFFBRDZCO0FBQUEsK0JBRVMsS0FGVCxDQUVwQyxLQUZvQztBQUFBLGdCQUVwQyxLQUZvQyxnQ0FFNUIsRUFGNEI7QUFBQSxnQkFFeEIsU0FGd0IsR0FFUyxLQUZULENBRXhCLFNBRndCO0FBQUEsOEJBRVMsS0FGVCxDQUViLElBRmE7QUFBQSxnQkFFYixJQUZhLCtCQUVOLEVBRk07QUFBQSw0QkFFUyxLQUZULENBRUYsRUFGRTtBQUFBLGdCQUVGLEVBRkUsNkJBRUcsRUFGSDtBQUFBLHNDQUdoQixRQUhnQixDQUdwQyxTQUhvQztBQUFBLGdCQUdwQyxTQUhvQyx1Q0FHeEIsSUFId0I7OztBQUt6QyxnQkFBSSxTQUFKLEVBQWUsUUFBUSxTQUFSOztBQUVmLG1EQUNrQixFQURsQixtQkFDZ0MsT0FEaEMsbUNBRWdCLFVBRmhCLDBCQUdTLEtBSFQ7QUFNSDs7QUFFRDs7Ozs7Ozs7NEJBckRnQjtBQUNaLG1CQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs0QkFNeUI7QUFBQSxnQkFDaEIsS0FEZ0IsR0FDUCxJQURPLENBQ2hCLEtBRGdCO0FBQUEsZ0JBRWhCLEVBRmdCLEdBRUosS0FGSSxDQUVoQixFQUZnQjtBQUFBLGdCQUVaLElBRlksR0FFSixLQUZJLENBRVosSUFGWTs7O0FBSXJCLDZCQUFjLEVBQWQsa0JBQTJCLElBQTNCO0FBQ0g7Ozs0QkFtQ1U7QUFBQSxnQkFDRixJQURFLEdBQ2lGLElBRGpGLENBQ0YsSUFERTtBQUFBLDRCQUNpRixJQURqRixDQUNJLFFBREo7QUFBQSxnQkFDSSxRQURKLDZCQUNlLEVBRGY7QUFBQSxnQkFDbUIsTUFEbkIsR0FDaUYsSUFEakYsQ0FDbUIsTUFEbkI7QUFBQSxnQkFDMkIsS0FEM0IsR0FDaUYsSUFEakYsQ0FDMkIsS0FEM0I7QUFBQSxnQkFDa0MsU0FEbEMsR0FDaUYsSUFEakYsQ0FDa0MsU0FEbEM7QUFBQSxnQkFDNkMsWUFEN0MsR0FDaUYsSUFEakYsQ0FDNkMsWUFEN0M7QUFBQSxnQkFDMkQsa0JBRDNELEdBQ2lGLElBRGpGLENBQzJELGtCQUQzRDtBQUFBLGtDQUUyQixRQUYzQixDQUVGLEtBRkU7QUFBQSxnQkFFSyxhQUZMLG1DQUVxQixFQUZyQjtBQUFBLHdDQUdjLGFBSGQsQ0FHRixPQUhFO0FBQUEsZ0JBR0YsT0FIRSx5Q0FHUSxFQUhSO0FBQUEsZ0JBSUQsRUFKQyxHQUl3QixLQUp4QixDQUlELEVBSkM7QUFBQSxnQkFJRyxJQUpILEdBSXdCLEtBSnhCLENBSUcsSUFKSDtBQUFBLGdDQUl3QixLQUp4QixDQUlTLEtBSlQ7QUFBQSxnQkFJUyxLQUpULGlDQUlpQixFQUpqQjtBQUFBLDBCQUt1RCxLQUFLLE1BTDVEO0FBQUEsMkNBS0QsUUFMQztBQUFBLGdCQUtELFFBTEMsb0NBS1UsRUFMVjtBQUFBLDZDQUtjLFVBTGQ7QUFBQSxnQkFLYyxVQUxkLHNDQUsyQixFQUwzQjtBQUFBLHVDQUsrQixJQUwvQjtBQUFBLGdCQUtxQyxTQUxyQyxnQ0FLaUQsRUFMakQ7O0FBTVAsZ0JBQUksa0JBQWtCLFVBQXRCO0FBQ0EsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixRQUF2QixFQUFpQyxJQUFqRDtBQUNBLGdCQUFJLGFBQWdCLE9BQWhCLFNBQTJCLFNBQS9CO0FBQ0EsZ0JBQUksZ0JBQW1CLGtCQUFuQixTQUF5QyxZQUF6QyxTQUF5RCxJQUF6RCxTQUFpRSxTQUFyRTtBQUNBLGdCQUFJLGVBQWUsS0FBSyx1QkFBTCxDQUE2QixVQUE3QixFQUF5QyxhQUF6QyxDQUFuQjtBQUNBLGdCQUFJLGdDQUNFLFlBREYsc0JBRUUsU0FGRixjQUFKOztBQUtBLHdCQUFVLFNBQVY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ3hJTDs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksUUFBUSxrQkFBWjs7QUFFQTs7Ozs7SUFJYSxJLFdBQUEsSTs7QUFFVDs7Ozs7Ozs7Ozs7QUFXQSxrQkFBMEQ7QUFBQSxRQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxRQUEvQixhQUErQjs7QUFBQTs7QUFBQSwwQkFDSSxRQURKLENBQ2pELEtBRGlEO0FBQUEsUUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsNkJBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLFFBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLHlCQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxRQUN0QixJQURzQixrQ0FDZixFQURlO0FBQUEsMkJBQ0ksUUFESixDQUNYLE1BRFc7QUFBQSxRQUNYLE1BRFcsb0NBQ0YsRUFERTs7QUFHdEQ7Ozs7O0FBSUEsU0FBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTs7OztBQUlBLFNBQUssUUFBTCxHQUFnQixRQUFoQjs7QUFFQTs7OztBQUlBLFNBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7Ozs7QUFJQSxTQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7Ozs7QUFNQSxTQUFLLGFBQUwsR0FBcUIsYUFBckI7O0FBRUE7Ozs7O0FBS0EsU0FBSyxhQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3dCQUlnQjtBQUNaLGFBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozt3QkFLbUI7QUFDZixhQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBaUJXO0FBQUEsVUFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLFVBQ0ssUUFETCxHQUN3RCxJQUR4RCxDQUNLLFFBREw7QUFBQSxVQUNlLElBRGYsR0FDd0QsSUFEeEQsQ0FDZSxJQURmO0FBQUEsVUFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSxVQUM2QixTQUQ3QixHQUN3RCxJQUR4RCxDQUM2QixTQUQ3QjtBQUFBLFVBQ3dDLFlBRHhDLEdBQ3dELElBRHhELENBQ3dDLFlBRHhDO0FBQUEsVUFFRixLQUZFLEdBRXNDLEtBRnRDLENBRUYsS0FGRTtBQUFBLFVBRUssU0FGTCxHQUVzQyxLQUZ0QyxDQUVLLFNBRkw7QUFBQSx3QkFFc0MsS0FGdEMsQ0FFZ0IsSUFGaEI7QUFBQSxVQUVnQixJQUZoQiwrQkFFdUIsRUFGdkI7QUFBQSxzQkFFc0MsS0FGdEMsQ0FFMkIsRUFGM0I7QUFBQSxVQUUyQixFQUYzQiw2QkFFZ0MsRUFGaEM7QUFBQSw0QkFHNkMsUUFIN0MsQ0FHRixLQUhFO0FBQUEsVUFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLGdDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLFVBR3lCLFNBSHpCLHVDQUdxQyxJQUhyQztBQUFBLGtDQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsVUFJRixPQUpFLHlDQUlRLEVBSlI7OztBQU1QLGdCQUFhLE9BQWIsU0FBd0IsU0FBeEI7O0FBTk8sNkJBUXdHLE1BUnhHLENBUUYsUUFSRTtBQUFBLFVBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSwrQkFRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSxVQVF3QyxlQVJ4QyxzQ0FRMEQsRUFSMUQ7QUFBQSxnQ0FRd0csTUFSeEcsQ0FROEQsV0FSOUQ7QUFBQSxVQVE4RCxXQVI5RCx1Q0FRNEUsRUFSNUU7QUFBQSx5QkFRd0csTUFSeEcsQ0FRZ0YsSUFSaEY7QUFBQSxVQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsVUFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsVUFBSSw0QkFBNEIsOEJBQWtCLGVBQWxCLEVBQW1DLFdBQW5DLEVBQWdELElBQWhGOztBQUVBLGtDQUErQix5QkFBL0IsU0FBNEQsWUFBNUQ7O0FBRUEsVUFBSSw2Q0FDYyxFQURkLFlBQ3NCLEtBRHRCLDhDQUVnQixPQUZoQixpQkFFaUMsRUFGakMsa0JBRThDLElBRjlDLDBCQUVvRSx5QkFGcEUsV0FFbUcsU0FGbkcsU0FFZ0gsSUFGaEgsdUJBR0UsU0FIRixjQUFKOztBQU1BLFVBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZixrQkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSEw7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0FBRUE7Ozs7O0lBSWEsYSxXQUFBLGE7O0FBRVQ7Ozs7Ozs7Ozs7O0FBV0EsaUNBQTBEO0FBQUEsb0JBQTlDLFFBQThDLHVFQUFuQyxFQUFtQztBQUFBLG9CQUEvQixhQUErQjs7QUFBQTs7QUFBQSxzQ0FDSSxRQURKLENBQ2pELEtBRGlEO0FBQUEsb0JBQ2pELEtBRGlELG1DQUN6QyxFQUR5QztBQUFBLHlDQUNJLFFBREosQ0FDckMsUUFEcUM7QUFBQSxvQkFDckMsUUFEcUMsc0NBQzFCLEVBRDBCO0FBQUEscUNBQ0ksUUFESixDQUN0QixJQURzQjtBQUFBLG9CQUN0QixJQURzQixrQ0FDZixFQURlO0FBQUEsdUNBQ0ksUUFESixDQUNYLE1BRFc7QUFBQSxvQkFDWCxNQURXLG9DQUNGLEVBREU7O0FBR3REOzs7OztBQUlBLHFCQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBOzs7O0FBSUEscUJBQUssUUFBTCxHQUFnQixRQUFoQjs7QUFFQTs7OztBQUlBLHFCQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7O0FBSUEscUJBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUE7Ozs7OztBQU1BLHFCQUFLLGFBQUwsR0FBcUIsYUFBckI7O0FBRUE7Ozs7O0FBS0EscUJBQUssYUFBTDtBQUNIOztBQUVEOzs7Ozs7OztvQ0FJZ0I7QUFDWjtBQUNIOztBQUVEOzs7Ozs7OztvQ0FLbUI7QUFDZjtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FpQlc7QUFBQSw0QkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLDRCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsNEJBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSw0QkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSw0QkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSw0QkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSw0QkFFRixLQUZFLEdBRXNDLEtBRnRDLENBRUYsS0FGRTtBQUFBLDRCQUVLLFNBRkwsR0FFc0MsS0FGdEMsQ0FFSyxTQUZMO0FBQUEsMENBRXNDLEtBRnRDLENBRWdCLElBRmhCO0FBQUEsNEJBRWdCLElBRmhCLCtCQUV1QixFQUZ2QjtBQUFBLHdDQUVzQyxLQUZ0QyxDQUUyQixFQUYzQjtBQUFBLDRCQUUyQixFQUYzQiw2QkFFZ0MsRUFGaEM7QUFBQSw4Q0FHNkMsUUFIN0MsQ0FHRixLQUhFO0FBQUEsNEJBR0ssYUFITCxtQ0FHcUIsRUFIckI7QUFBQSxrREFHNkMsUUFIN0MsQ0FHeUIsU0FIekI7QUFBQSw0QkFHeUIsU0FIekIsdUNBR3FDLElBSHJDO0FBQUEsb0RBSWMsYUFKZCxDQUlGLE9BSkU7QUFBQSw0QkFJRixPQUpFLHlDQUlRLEVBSlI7OztBQU1QLGtDQUFhLE9BQWIsU0FBd0IsU0FBeEI7O0FBTk8sK0NBUXdHLE1BUnhHLENBUUYsUUFSRTtBQUFBLDRCQVFRLGFBUlIsb0NBUXdCLEVBUnhCO0FBQUEsaURBUXdHLE1BUnhHLENBUTRCLFVBUjVCO0FBQUEsNEJBUXdDLGVBUnhDLHNDQVEwRCxFQVIxRDtBQUFBLGtEQVF3RyxNQVJ4RyxDQVE4RCxXQVI5RDtBQUFBLDRCQVE4RCxXQVI5RCx1Q0FRNEUsRUFSNUU7QUFBQSwyQ0FRd0csTUFSeEcsQ0FRZ0YsSUFSaEY7QUFBQSw0QkFRc0YsU0FSdEYsZ0NBUWtHLEVBUmxHOztBQVNQLDRCQUFJLFlBQVksSUFBSSxLQUFLLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBdEQ7QUFDQSw0QkFBSSw0QkFBNEIsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsV0FBeEMsRUFBcUQsSUFBckY7O0FBRUEsb0RBQStCLHlCQUEvQixTQUE0RCxZQUE1RDs7QUFFQSw0QkFBSSxTQUFKLEVBQWUsUUFBUSxTQUFSOztBQUVmLDRCQUFJLDZDQUNjLEVBRGQsWUFDc0IsS0FEdEIsOENBRWdCLE9BRmhCLGlCQUVpQyxFQUZqQyxrQkFFOEMsSUFGOUMsb0NBRThFLHlCQUY5RSxXQUU2RyxTQUY3RyxTQUUwSCxJQUYxSCx1QkFHRSxTQUhGLGNBQUo7O0FBTUEsb0NBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0hMOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxRQUFRLGtCQUFaOztBQUVBOzs7OztJQUlhLEssV0FBQSxLOztBQUVUOzs7Ozs7Ozs7OztBQVdBLHlCQUEwRDtBQUFBLG9CQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxvQkFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsc0NBQ0ksUUFESixDQUNqRCxLQURpRDtBQUFBLG9CQUNqRCxLQURpRCxtQ0FDekMsRUFEeUM7QUFBQSx5Q0FDSSxRQURKLENBQ3JDLFFBRHFDO0FBQUEsb0JBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLHFDQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxvQkFDdEIsSUFEc0Isa0NBQ2YsRUFEZTtBQUFBLHVDQUNJLFFBREosQ0FDWCxNQURXO0FBQUEsb0JBQ1gsTUFEVyxvQ0FDRixFQURFOztBQUd0RDs7Ozs7QUFJQSxxQkFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTs7OztBQUlBLHFCQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxxQkFBSyxJQUFMLEdBQVksSUFBWjs7QUFFQTs7OztBQUlBLHFCQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7Ozs7QUFNQSxxQkFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBOzs7OztBQUtBLHFCQUFLLGFBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBSWdCO0FBQ1osK0JBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7OztvQ0FLbUI7QUFDZiwrQkFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQWlCVztBQUFBLDRCQUNGLEtBREUsR0FDd0QsSUFEeEQsQ0FDRixLQURFO0FBQUEsNEJBQ0ssUUFETCxHQUN3RCxJQUR4RCxDQUNLLFFBREw7QUFBQSw0QkFDZSxJQURmLEdBQ3dELElBRHhELENBQ2UsSUFEZjtBQUFBLDRCQUNxQixNQURyQixHQUN3RCxJQUR4RCxDQUNxQixNQURyQjtBQUFBLDRCQUM2QixTQUQ3QixHQUN3RCxJQUR4RCxDQUM2QixTQUQ3QjtBQUFBLDRCQUN3QyxZQUR4QyxHQUN3RCxJQUR4RCxDQUN3QyxZQUR4QztBQUFBLDJDQUUyQyxLQUYzQyxDQUVGLEtBRkU7QUFBQSw0QkFFRixLQUZFLGdDQUVNLEVBRk47QUFBQSw0QkFFVSxTQUZWLEdBRTJDLEtBRjNDLENBRVUsU0FGVjtBQUFBLDBDQUUyQyxLQUYzQyxDQUVxQixJQUZyQjtBQUFBLDRCQUVxQixJQUZyQiwrQkFFNEIsRUFGNUI7QUFBQSx3Q0FFMkMsS0FGM0MsQ0FFZ0MsRUFGaEM7QUFBQSw0QkFFZ0MsRUFGaEMsNkJBRXFDLEVBRnJDO0FBQUEsOENBRzZDLFFBSDdDLENBR0YsS0FIRTtBQUFBLDRCQUdLLGFBSEwsbUNBR3FCLEVBSHJCO0FBQUEsa0RBRzZDLFFBSDdDLENBR3lCLFNBSHpCO0FBQUEsNEJBR3lCLFNBSHpCLHVDQUdxQyxJQUhyQztBQUFBLG9EQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsNEJBSUYsT0FKRSx5Q0FJUSxFQUpSOzs7QUFNUCxrQ0FBYSxPQUFiLFNBQXdCLFNBQXhCOztBQU5PLCtDQVF3RyxNQVJ4RyxDQVFGLFFBUkU7QUFBQSw0QkFRUSxhQVJSLG9DQVF3QixFQVJ4QjtBQUFBLGlEQVF3RyxNQVJ4RyxDQVE0QixVQVI1QjtBQUFBLDRCQVF3QyxlQVJ4QyxzQ0FRMEQsRUFSMUQ7QUFBQSxrREFRd0csTUFSeEcsQ0FROEQsV0FSOUQ7QUFBQSw0QkFROEQsV0FSOUQsdUNBUTRFLEVBUjVFO0FBQUEsMkNBUXdHLE1BUnhHLENBUWdGLElBUmhGO0FBQUEsNEJBUXNGLFNBUnRGLGdDQVFrRyxFQVJsRzs7QUFTUCw0QkFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsNEJBQUksNEJBQTRCLElBQUksS0FBSyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFdBQXhDLEVBQXFELElBQXJGOztBQUVBLG9EQUErQix5QkFBL0IsU0FBNEQsWUFBNUQ7O0FBRUEsNEJBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZiw0QkFBSSw2Q0FDYyxFQURkLFlBQ3NCLEtBRHRCLDhDQUVnQixPQUZoQixpQkFFaUMsRUFGakMsa0JBRThDLElBRjlDLDJCQUVxRSx5QkFGckUsV0FFb0csU0FGcEcsU0FFaUgsSUFGakgsdUJBR0UsU0FIRixjQUFKOztBQU1BLG9DQUFVLFNBQVY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQzNITDs7OztBQUVBOzs7O0lBSWEsSSxXQUFBLEk7O0FBRVQ7Ozs7Ozs7O0FBUUEsa0JBQVksU0FBWixFQUF1QixJQUF2QixFQUE2QixrQkFBN0IsRUFBaUQsUUFBakQsRUFBMEU7QUFBQSxZQUFmLEtBQWU7O0FBQUE7O0FBRXRFOzs7OztBQUtBLGFBQUssU0FBTCxHQUFpQixTQUFqQjs7QUFFQTs7OztBQUlBLGFBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7Ozs7QUFJQSxhQUFLLGtCQUFMLEdBQTBCLGtCQUExQjs7QUFFQTs7OztBQUlBLGFBQUssUUFBTCxHQUFnQixRQUFoQjs7QUFFQTs7OztBQUlBLGFBQUssTUFBTCxHQUFjLFNBQVMsTUFBdkI7QUFDQSxhQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNIOztBQUVEOzs7Ozs7Ozs0QkFJa0I7QUFDZCxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBeUJ1QjtBQUFBLDBCQUNDLElBREQsQ0FDZCxNQURjO0FBQUEsZ0JBQ2QsTUFEYywyQkFDTCxFQURLO0FBQUEsZ0NBRTBILE1BRjFILENBRWQsS0FGYztBQUFBLGdCQUVQLFdBRk8saUNBRU8sUUFGUDtBQUFBLGdCQUU0QixlQUY1QixHQUUwSCxNQUYxSCxDQUVpQixTQUZqQjtBQUFBLGdDQUUwSCxNQUYxSCxDQUU2QyxLQUY3QztBQUFBLGdCQUVvRCxXQUZwRCxpQ0FFa0UsRUFGbEU7QUFBQSxvQ0FFMEgsTUFGMUgsQ0FFc0UsU0FGdEU7QUFBQSxnQkFFaUYsZUFGakYscUNBRW1HLEVBRm5HO0FBQUEscUNBRTBILE1BRjFILENBRXVHLFVBRnZHO0FBQUEsZ0JBRXVHLFVBRnZHLHNDQUVvSCxFQUZwSDtBQUFBLHVDQUdzQixXQUh0QixDQUdkLE9BSGM7QUFBQSxnQkFHTCxrQkFISyx3Q0FHZ0IsRUFIaEI7QUFBQSx3Q0FJMEIsZUFKMUIsQ0FJZCxPQUpjO0FBQUEsZ0JBSUwsc0JBSksseUNBSW9CLEVBSnBCOzs7QUFNbkIsMEJBQWMsa0JBQWtCLGVBQWxCLEdBQW9DLFdBQWxEOztBQUVBLGdCQUFJLGFBQWEsWUFBWSxNQUFaLElBQXNCLENBQXRCLGlEQUVnQixzQkFGaEIsdUNBR0ksa0JBSEosMEJBR3lDLFVBSHpDLCtCQUlILFdBSkcsNkVBT0wsRUFQWjs7QUFTQSxtQkFBTyxVQUFQO0FBQ0g7O0FBSUQ7Ozs7Ozs7OzRCQUtXO0FBQUEsZ0JBQ0YsU0FERSxHQUM0RCxJQUQ1RCxDQUNGLFNBREU7QUFBQSxnQkFDUyxJQURULEdBQzRELElBRDVELENBQ1MsSUFEVDtBQUFBLGdCQUNlLGtCQURmLEdBQzRELElBRDVELENBQ2Usa0JBRGY7QUFBQSxnQkFDbUMsUUFEbkMsR0FDNEQsSUFENUQsQ0FDbUMsUUFEbkM7QUFBQSxnQkFDNkMsV0FEN0MsR0FDNEQsSUFENUQsQ0FDNkMsV0FEN0M7QUFBQSxtQ0FFa0YsUUFGbEYsQ0FFRixNQUZFO0FBQUEsZ0JBRUYsTUFGRSxvQ0FFTyxFQUZQO0FBQUEsb0NBRWtGLFFBRmxGLENBRVcsT0FGWDtBQUFBLGdCQUVvQixpQkFGcEIscUNBRXdDLEVBRnhDO0FBQUEsZ0JBRWlELE1BRmpELEdBRWtGLFFBRmxGLENBRTRDLEVBRjVDO0FBQUEsa0NBRWtGLFFBRmxGLENBRXlELEtBRnpEO0FBQUEsZ0JBRXlELEtBRnpELG1DQUVpRSxFQUZqRTtBQUFBLGdCQUVxRSxTQUZyRSxHQUVrRixRQUZsRixDQUVxRSxTQUZyRTs7O0FBSVAsZ0JBQUcsU0FBSCxFQUFjLFFBQVEsU0FBUjs7QUFFZCxnQkFBSSxDQUFDLFNBQVMsVUFBZCxFQUEwQjtBQUN0QiwwQkFBVSxJQUFWLENBQWU7QUFDWCw4QkFBVSxNQURDO0FBRVgsMEJBQU0sS0FBSztBQUZBLGlCQUFmO0FBSUg7O0FBRUQsZ0JBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLFNBQTNCLENBQWY7O0FBRUEsc0NBQ00sS0FETixnQ0FFZ0IsTUFGaEIsc0JBRXVDLFdBRnZDLFNBRXNELGlCQUZ0RCwyQkFFNkYsSUFGN0YsVUFFc0csa0JBRnRHLDJDQUdVLFFBSFY7QUFNSDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSUw7Ozs7O0lBS2EsYSxXQUFBLGE7O0FBRVQ7Ozs7Ozs7O0FBUUEsNkJBQWdDO0FBQUEsWUFBcEIsYUFBb0IsdUVBQUosRUFBSTs7QUFBQTs7QUFFNUI7Ozs7QUFJQSxhQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFFSDs7QUFFRDs7Ozs7Ozs7NEJBSXFCO0FBQ2pCLG1CQUFPLGVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJdUI7QUFDbkIsbUJBQU8sZ0JBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7OzRCQVNXO0FBQUEsZ0JBQ0YsYUFERSxHQUNpRCxJQURqRCxDQUNGLGFBREU7QUFBQSxnQkFDYSxjQURiLEdBQ2lELElBRGpELENBQ2EsY0FEYjtBQUFBLGdCQUM2QixnQkFEN0IsR0FDaUQsSUFEakQsQ0FDNkIsZ0JBRDdCOztBQUVQLGdCQUFJLG1CQUFtQixjQUFjLE1BQWQsQ0FBcUIsVUFBQyxnQkFBRCxFQUFtQixZQUFuQixFQUFpQyxLQUFqQyxFQUEyQztBQUNuRix1QkFBVSxnQkFBVixxQkFBMEMsY0FBMUMsVUFBNkQsYUFBYSxRQUExRSwrQkFDVSxhQUFhLE9BRHZCO0FBR0gsYUFKc0IsRUFJcEIsRUFKb0IsQ0FBdkI7O0FBTUEsZ0JBQUksaUJBQWlCLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQzdCLHlDQUFzQixnQkFBdEIsNkJBQ00sZ0JBRE47QUFHSDs7QUFFRCxtQkFBTyxFQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUw7O0FBQ0E7Ozs7QUFFQTs7OztJQUlhLE0sV0FBQSxNOztBQUVUOzs7Ozs7Ozs7OztBQVdBLDBCQUEwRDtBQUFBLG9CQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxvQkFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsc0NBQ0ksUUFESixDQUNqRCxLQURpRDtBQUFBLG9CQUNqRCxLQURpRCxtQ0FDekMsRUFEeUM7QUFBQSx5Q0FDSSxRQURKLENBQ3JDLFFBRHFDO0FBQUEsb0JBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLHFDQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxvQkFDdEIsSUFEc0Isa0NBQ2YsRUFEZTtBQUFBLHVDQUNJLFFBREosQ0FDWCxNQURXO0FBQUEsb0JBQ1gsTUFEVyxvQ0FDRixFQURFOztBQUd0RDs7Ozs7QUFJQSxxQkFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTs7OztBQUlBLHFCQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxxQkFBSyxJQUFMLEdBQVksSUFBWjs7QUFFQTs7OztBQUlBLHFCQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7Ozs7QUFNQSxxQkFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBOzs7OztBQUtBLHFCQUFLLGFBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBSWdCO0FBQ1osK0JBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7OztvQ0FLbUI7QUFDZiwrQkFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQW9CVztBQUFBLDRCQUNGLEtBREUsR0FDd0QsSUFEeEQsQ0FDRixLQURFO0FBQUEsNEJBQ0ssUUFETCxHQUN3RCxJQUR4RCxDQUNLLFFBREw7QUFBQSw0QkFDZSxJQURmLEdBQ3dELElBRHhELENBQ2UsSUFEZjtBQUFBLDRCQUNxQixNQURyQixHQUN3RCxJQUR4RCxDQUNxQixNQURyQjtBQUFBLDRCQUM2QixTQUQ3QixHQUN3RCxJQUR4RCxDQUM2QixTQUQ3QjtBQUFBLDRCQUN3QyxZQUR4QyxHQUN3RCxJQUR4RCxDQUN3QyxZQUR4QztBQUFBLDJDQUUyQyxLQUYzQyxDQUVGLEtBRkU7QUFBQSw0QkFFRixLQUZFLGdDQUVNLEVBRk47QUFBQSwwQ0FFMkMsS0FGM0MsQ0FFVSxJQUZWO0FBQUEsNEJBRVUsSUFGViwrQkFFaUIsRUFGakI7QUFBQSx3Q0FFMkMsS0FGM0MsQ0FFcUIsRUFGckI7QUFBQSw0QkFFcUIsRUFGckIsNkJBRTBCLEVBRjFCO0FBQUEsNEJBRThCLFNBRjlCLEdBRTJDLEtBRjNDLENBRThCLFNBRjlCO0FBQUEsOENBRzZDLFFBSDdDLENBR0YsS0FIRTtBQUFBLDRCQUdLLGFBSEwsbUNBR3FCLEVBSHJCO0FBQUEsa0RBRzZDLFFBSDdDLENBR3lCLFNBSHpCO0FBQUEsNEJBR3lCLFNBSHpCLHVDQUdxQyxJQUhyQztBQUFBLG9EQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsNEJBSUYsT0FKRSx5Q0FJUSxFQUpSOzs7QUFNUCxrQ0FBYSxPQUFiLFNBQXdCLFNBQXhCOztBQU5PLCtDQVF3RyxNQVJ4RyxDQVFGLFFBUkU7QUFBQSw0QkFRUSxhQVJSLG9DQVF3QixFQVJ4QjtBQUFBLGlEQVF3RyxNQVJ4RyxDQVE0QixVQVI1QjtBQUFBLDRCQVF3QyxlQVJ4QyxzQ0FRMEQsRUFSMUQ7QUFBQSxrREFRd0csTUFSeEcsQ0FROEQsV0FSOUQ7QUFBQSw0QkFROEQsV0FSOUQsdUNBUTRFLEVBUjVFO0FBQUEsMkNBUXdHLE1BUnhHLENBUWdGLElBUmhGO0FBQUEsNEJBUXNGLFNBUnRGLGdDQVFrRyxFQVJsRzs7QUFTUCw0QkFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsNEJBQUksNEJBQTRCLElBQUksS0FBSyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFdBQXhDLEVBQXFELElBQXJGOztBQUVBLG9EQUErQix5QkFBL0IsU0FBNEQsWUFBNUQ7O0FBRUEsNEJBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZiw0QkFBSSw2Q0FDYyxFQURkLFlBQ3NCLEtBRHRCLDhDQUVnQixPQUZoQixtQkFFbUMsSUFGbkMsNEJBRTJELHlCQUYzRCxXQUUwRixTQUYxRixTQUV1RyxJQUZ2Ryx1QkFHRSxTQUhGLGNBQUo7O0FBTUEsb0NBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0hMOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxRQUFRLGtCQUFaOztJQUVhLE8sV0FBQSxPO0FBQ1QscUJBQVksUUFBWixFQUFxRDtBQUFBLFlBQS9CLGFBQStCOztBQUFBOztBQUFBLFlBQzVDLEtBRDRDLEdBQ3lCLFFBRHpCLENBQzVDLEtBRDRDO0FBQUEsb0NBQ3lCLFFBRHpCLENBQ3JDLGNBRHFDO0FBQUEsWUFDckMsY0FEcUMseUNBQ3BCLEVBRG9CO0FBQUEsaUNBQ3lCLFFBRHpCLENBQ2hCLFFBRGdCO0FBQUEsWUFDaEIsUUFEZ0Isc0NBQ0wsRUFESztBQUFBLDZCQUN5QixRQUR6QixDQUNELElBREM7QUFBQSxZQUNELElBREMsa0NBQ00sRUFETjtBQUFBLCtCQUN5QixRQUR6QixDQUNVLE1BRFY7QUFBQSxZQUNVLE1BRFYsb0NBQ21CLEVBRG5COzs7QUFHakQsYUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLGFBQXJCO0FBQ0EsYUFBSyxhQUFMO0FBQ0g7Ozs7NEJBRWU7QUFDWixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFa0I7QUFDZixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNGLElBREUsR0FDd0UsSUFEeEUsQ0FDRixJQURFO0FBQUEsZ0JBQ0ksS0FESixHQUN3RSxJQUR4RSxDQUNJLEtBREo7QUFBQSxnQkFDVyxjQURYLEdBQ3dFLElBRHhFLENBQ1csY0FEWDtBQUFBLGdCQUMyQixNQUQzQixHQUN3RSxJQUR4RSxDQUMyQixNQUQzQjtBQUFBLGdCQUNtQyxRQURuQyxHQUN3RSxJQUR4RSxDQUNtQyxRQURuQztBQUFBLGdCQUM2QyxTQUQ3QyxHQUN3RSxJQUR4RSxDQUM2QyxTQUQ3QztBQUFBLGdCQUN3RCxZQUR4RCxHQUN3RSxJQUR4RSxDQUN3RCxZQUR4RDtBQUFBLGdCQUVGLEVBRkUsR0FFMEMsS0FGMUMsQ0FFRixFQUZFO0FBQUEsZ0JBRUUsSUFGRixHQUUwQyxLQUYxQyxDQUVFLElBRkY7QUFBQSxnQkFFUSxPQUZSLEdBRTBDLEtBRjFDLENBRVEsT0FGUjtBQUFBLCtCQUUwQyxLQUYxQyxDQUVpQixLQUZqQjtBQUFBLGdCQUVpQixLQUZqQixnQ0FFeUIsRUFGekI7QUFBQSxnQkFFNkIsU0FGN0IsR0FFMEMsS0FGMUMsQ0FFNkIsU0FGN0I7QUFBQSxrQ0FHNkMsUUFIN0MsQ0FHRixLQUhFO0FBQUEsZ0JBR0ssYUFITCxtQ0FHcUIsRUFIckI7QUFBQSxzQ0FHNkMsUUFIN0MsQ0FHeUIsU0FIekI7QUFBQSxnQkFHeUIsU0FIekIsdUNBR3FDLElBSHJDO0FBQUEsd0NBSWMsYUFKZCxDQUlGLE9BSkU7QUFBQSxnQkFJRixPQUpFLHlDQUlRLEVBSlI7OztBQU1QLHNCQUFhLE9BQWIsU0FBd0IsU0FBeEI7O0FBTk8sbUNBUXdHLE1BUnhHLENBUUYsUUFSRTtBQUFBLGdCQVFRLGFBUlIsb0NBUXdCLEVBUnhCO0FBQUEscUNBUXdHLE1BUnhHLENBUTRCLFVBUjVCO0FBQUEsZ0JBUXdDLGVBUnhDLHNDQVEwRCxFQVIxRDtBQUFBLHNDQVF3RyxNQVJ4RyxDQVE4RCxXQVI5RDtBQUFBLGdCQVE4RCxXQVI5RCx1Q0FRNEUsRUFSNUU7QUFBQSwrQkFRd0csTUFSeEcsQ0FRZ0YsSUFSaEY7QUFBQSxnQkFRc0YsU0FSdEYsZ0NBUWtHLEVBUmxHOztBQVNQLGdCQUFJLG9FQUFKO0FBQ0EsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDRCQUE0QixJQUFJLEtBQUssYUFBVCxDQUF1QixlQUF2QixFQUF3QyxXQUF4QyxFQUFxRCxJQUFyRjs7QUFFQSx3Q0FBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLGdCQUFJLGdCQUFnQixRQUFoQixJQUE2QixrQkFBa0IsZUFBZSxNQUFmLElBQXlCLENBQTVFLEVBQWdGO0FBQzVFLG1DQUFtQix5Q0FDSyxjQURMLGlCQUVmLGdCQUZKO0FBR0g7O0FBRUQsZ0JBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZixnQkFBSSxjQUFjLFFBQVEsTUFBUixDQUFlLFVBQUMsVUFBRCxFQUFhLE1BQWIsRUFBd0I7QUFDckQsdUJBQVUsVUFBVixzQ0FDaUIsT0FBTyxLQUR4QixXQUNrQyxPQUFPLE9BRHpDO0FBRUgsYUFIaUIsRUFHZixFQUhlLENBQWxCOztBQUtBLGdCQUFJLDhDQUNlLEVBRGYsV0FDc0IsS0FEdEIsOERBRW9CLE9BRnBCLGlCQUVxQyxFQUZyQyxrQkFFa0QsSUFGbEQsVUFFMEQseUJBRjFELFNBRXVGLFNBRnZGLFNBRW9HLElBRnBHLDZCQUdRLGdCQUhSLDRCQUlRLFdBSlIsbURBTUssU0FOVDs7QUFRQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUw7O0FBQ0E7Ozs7SUFFYSxLLFdBQUEsSztBQUNULG1CQUFZLGFBQVosRUFBMEQ7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSxtQ0FDTSxhQUROLENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsd0NBQ3pDLEVBRHlDO0FBQUEsb0NBQ00sYUFETixDQUNyQyxNQURxQztBQUFBLFlBQ3JDLE1BRHFDLHlDQUM1QixFQUQ0QjtBQUFBLG9DQUNNLGFBRE4sQ0FDeEIsTUFEd0I7QUFBQSxZQUN4QixNQUR3Qix5Q0FDZixFQURlO0FBQUEsb0NBQ00sYUFETixDQUNYLFFBRFc7QUFBQSxZQUNYLFFBRFcseUNBQ0EsRUFEQTs7O0FBR3RELGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTDtBQUNIOzs7O3FDQUVZLFUsRUFBWTtBQUNyQixtQkFBTyxVQUFQO0FBQ0g7OzsrQ0FFc0IsUyxFQUFXLFMsRUFBVztBQUN6QyxrREFDZ0IsU0FEaEIscUJBRUUsU0FGRjtBQUlIOzs7d0NBRWUsUSxFQUFVLEssRUFBTztBQUM3Qiw2REFDMEIsUUFEMUIsdUJBRU0sS0FGTjtBQUdIOzs7NEJBRWU7QUFDWixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFa0I7QUFDZixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNGLE1BREUsR0FDNEMsSUFENUMsQ0FDRixNQURFO0FBQUEsZ0JBQ00sTUFETixHQUM0QyxJQUQ1QyxDQUNNLE1BRE47QUFBQSxnQkFDYyxRQURkLEdBQzRDLElBRDVDLENBQ2MsUUFEZDtBQUFBLGdCQUN3QixLQUR4QixHQUM0QyxJQUQ1QyxDQUN3QixLQUR4QjtBQUFBLGdCQUMrQixTQUQvQixHQUM0QyxJQUQ1QyxDQUMrQixTQUQvQjtBQUFBLGdCQUVRLGFBRlIsR0FFK0MsTUFGL0MsQ0FFRixRQUZFO0FBQUEsK0JBRStDLE1BRi9DLENBRXVCLElBRnZCO0FBQUEsZ0JBRTZCLFNBRjdCLGdDQUV5QyxFQUZ6Qzs7QUFHUCxnQkFBSSxPQUFPLElBQVg7QUFITyxnQkFJSyxVQUpMLEdBSThDLEtBSjlDLENBSUYsS0FKRTtBQUFBLGdCQUk0QixjQUo1QixHQUk4QyxLQUo5QyxDQUlpQixTQUpqQjtBQUFBLHNDQUttQixRQUxuQixDQUtELFNBTEM7QUFBQSxnQkFLRCxTQUxDLHVDQUtXLElBTFg7OztBQU9QLGdCQUFJLGNBQUosRUFBb0IsYUFBYSxjQUFiOztBQUVwQixnQkFBSSxhQUFhLE9BQU8sTUFBUCxDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFBQSxvQkFDdkMsS0FEdUMsR0FDRCxLQURDLENBQ3ZDLEtBRHVDO0FBQUEsc0NBQ0QsS0FEQyxDQUNoQyxRQURnQztBQUFBLG9CQUNoQyxRQURnQyxtQ0FDckIsRUFEcUI7QUFBQSxxQ0FDRCxLQURDLENBQ2pCLE9BRGlCO0FBQUEsb0JBQ2pCLE9BRGlCLGtDQUNQLEVBRE87OztBQUc1QywyQkFBYyxRQUFkLFNBQTBCLFNBQTFCOztBQUVBLG9CQUFJLFlBQVksS0FBSyxlQUFMLENBQXFCLFFBQXJCLEVBQStCLEtBQS9CLENBQWhCOztBQUVBLHVCQUFVLElBQVYsc0JBQ0UsS0FBSyxzQkFBTCxDQUE0QixTQUE1QixFQUEwQyxTQUExQyxTQUF1RCxPQUF2RCxDQURGO0FBRUgsYUFUZ0IsRUFTZCxVQVRjLENBQWpCO0FBVUEsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDBDQUNHLFVBREgsdUJBRUcsU0FGUDs7QUFJQSxtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNqRVEsVSxXQUFBLFU7QUFDVCx3QkFBWSxXQUFaLEVBQXlCLElBQXpCLEVBQStCO0FBQUE7O0FBQzNCLGFBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sRUFBUDtBQUNIOzs7NEJBQzBCO0FBQ3ZCLG1CQUFPLEVBQVA7QUFDSDs7OzRCQUMyQjtBQUN4QixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNGLFdBREUsR0FDc0YsSUFEdEYsQ0FDRixXQURFO0FBQUEsZ0JBQ1csSUFEWCxHQUNzRixJQUR0RixDQUNXLElBRFg7QUFBQSxnQkFDaUIsb0JBRGpCLEdBQ3NGLElBRHRGLENBQ2lCLG9CQURqQjtBQUFBLGdCQUN1QyxvQkFEdkMsR0FDc0YsSUFEdEYsQ0FDdUMsb0JBRHZDO0FBQUEsZ0JBQzZELHFCQUQ3RCxHQUNzRixJQUR0RixDQUM2RCxxQkFEN0Q7QUFBQSwrQkFFd0MsSUFGeEMsQ0FFRixNQUZFO0FBQUEsZ0JBRUYsTUFGRSxnQ0FFTyxFQUZQO0FBQUEsK0JBRXdDLElBRnhDLENBRVcsTUFGWDtBQUFBLGdCQUVXLE1BRlgsZ0NBRW9CLEVBRnBCO0FBQUEsZ0NBRXdDLElBRnhDLENBRXdCLE9BRnhCO0FBQUEsZ0JBRXdCLE9BRnhCLGlDQUVrQyxFQUZsQztBQUFBLGtDQUd5RSxNQUh6RSxDQUdGLE9BSEU7QUFBQSxnQkFHTyxhQUhQLG1DQUd1QixFQUh2QjtBQUFBLCtCQUd5RSxNQUh6RSxDQUcyQixJQUgzQjtBQUFBLGdCQUdpQyxVQUhqQyx5Q0FHcUQsS0FBSyxJQUgxRDtBQUFBLG1DQUkrQixPQUovQixDQUlGLE9BSkU7QUFBQSxnQkFJTyxjQUpQLG9DQUl3QixFQUp4QjtBQUFBLGtDQUtvRCxNQUxwRCxDQUtGLE9BTEU7QUFBQSxnQkFLTyxhQUxQLG1DQUt1QixFQUx2QjtBQUFBLCtCQUtvRCxNQUxwRCxDQUsyQixJQUwzQjtBQUFBLGdCQUtpQyxVQUxqQyxnQ0FLOEMsRUFMOUM7OztBQU9QLHNEQUNzQixjQUR0QixTQUN3QyxxQkFEeEMsY0FDc0UsS0FBSyxFQUQzRSw0Q0FFMEIsYUFGMUIsU0FFMkMsb0JBRjNDLFVBRW9FLFVBRnBFLG1DQUdVLFdBSFYseUNBSXlCLGFBSnpCLFNBSTBDLG9CQUoxQyxVQUltRSxVQUpuRTtBQU1IOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JMOzs7O0lBRWEsZSxXQUFBLGU7QUFDVCw2QkFBWSxJQUFaLEVBQWtCLFdBQWxCLEVBQStCO0FBQUE7O0FBQzNCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLFdBQUwsR0FBbUIsV0FBbkI7QUFDSDs7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRTBCO0FBQ3ZCLG1CQUFPLEVBQVA7QUFDSDs7OzRCQUUyQjtBQUN4QixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFaUM7QUFDOUIsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixJQURFLEdBQ21ILElBRG5ILENBQ0YsSUFERTtBQUFBLGdCQUNJLFdBREosR0FDbUgsSUFEbkgsQ0FDSSxXQURKO0FBQUEsZ0JBQ2lCLG9CQURqQixHQUNtSCxJQURuSCxDQUNpQixvQkFEakI7QUFBQSxnQkFDdUMsb0JBRHZDLEdBQ21ILElBRG5ILENBQ3VDLG9CQUR2QztBQUFBLGdCQUM2RCxxQkFEN0QsR0FDbUgsSUFEbkgsQ0FDNkQscUJBRDdEO0FBQUEsZ0JBQ29GLDJCQURwRixHQUNtSCxJQURuSCxDQUNvRiwyQkFEcEY7QUFBQSwrQkFFNEQsSUFGNUQsQ0FFRixNQUZFO0FBQUEsZ0JBRUYsTUFGRSxnQ0FFTyxFQUZQO0FBQUEsK0JBRTRELElBRjVELENBRVcsTUFGWDtBQUFBLGdCQUVXLE1BRlgsZ0NBRW9CLEVBRnBCO0FBQUEsZ0NBRTRELElBRjVELENBRXdCLE9BRnhCO0FBQUEsZ0JBRXdCLE9BRnhCLGlDQUVrQyxFQUZsQztBQUFBLHNDQUU0RCxJQUY1RCxDQUVzQyxhQUZ0QztBQUFBLGdCQUVzQyxhQUZ0Qyx1Q0FFc0QsRUFGdEQ7QUFBQSxrQ0FHb0QsTUFIcEQsQ0FHRixPQUhFO0FBQUEsZ0JBR08sYUFIUCxtQ0FHdUIsRUFIdkI7QUFBQSwrQkFHb0QsTUFIcEQsQ0FHMkIsSUFIM0I7QUFBQSxnQkFHaUMsVUFIakM7QUFBQSxtQ0FJOEIsT0FKOUIsQ0FJRixPQUpFO0FBQUEsZ0JBSU8sY0FKUCxvQ0FJd0IsRUFKeEI7QUFBQSxrQ0FLb0QsTUFMcEQsQ0FLRixPQUxFO0FBQUEsZ0JBS08sYUFMUCxtQ0FLdUIsRUFMdkI7QUFBQSwrQkFLb0QsTUFMcEQsQ0FLMkIsSUFMM0I7QUFBQSxnQkFLaUMsVUFMakMsZ0NBSzhDLEVBTDlDO0FBQUEsd0NBTThFLGFBTjlFLENBTUYsT0FORTtBQUFBLGdCQU1PLG9CQU5QLHlDQU04QixFQU45QjtBQUFBLHdDQU04RSxhQU45RSxDQU1rQyxVQU5sQztBQUFBLGdCQU04Qyx1QkFOOUMseUNBTXdFLEVBTnhFOztBQU9QLGdCQUFJLDZCQUE2Qiw4QkFBa0IsdUJBQWxCLEVBQTJDLE9BQU8sSUFBUCxDQUFZLHVCQUFaLENBQTNDLEVBQWlGLElBQWxIOztBQUVBLHNEQUNzQixjQUR0QixTQUN3QyxxQkFEeEMsY0FDc0UsS0FBSyxFQUQzRSw0Q0FFMEIsYUFGMUIsU0FFMkMsb0JBRjNDLFVBRW9FLFVBRnBFLGlEQUd1QiwyQkFIdkIsU0FHc0Qsb0JBSHRELFdBRytFLDBCQUgvRSwrQkFJYyxXQUpkLGlFQU15QixhQU56QixTQU0wQyxvQkFOMUMsVUFNbUUsVUFObkU7QUFRSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN6Q1EsSyxXQUFBLEs7QUFDVCxxQkFBYztBQUFBO0FBQUU7Ozs7aUNBRVAsSyxFQUFPO0FBQ1osZ0JBQUksVUFBVSxHQUFkLEVBQW1CLE9BQU8sZ0JBQVA7O0FBRW5CLGdCQUFJLGFBQWEsTUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixHQUFuQixDQUFqQjs7QUFFQSxtQ0FBcUIsVUFBckI7QUFDSDs7O3dDQU1lLFUsRUFBWTtBQUN4QixnQkFBSSxPQUFPLElBQVg7QUFEd0Isb0NBRU0sSUFGTixDQUVuQixnQkFGbUI7QUFBQSxnQkFFbkIsZ0JBRm1CLHFDQUVBLEVBRkE7O0FBR3hCLGdCQUFJLFdBQVcsV0FBVyxNQUFYLENBQWtCLFVBQUMsV0FBRCxFQUFjLFNBQWQsRUFBNEI7QUFBQSxvQkFDcEQsSUFEb0QsR0FDN0IsU0FENkIsQ0FDcEQsSUFEb0Q7QUFBQSwwQ0FDN0IsU0FENkIsQ0FDOUMsUUFEOEM7QUFBQSxvQkFDOUMsUUFEOEMsdUNBQ25DLEVBRG1DO0FBQUEsc0NBRXZCLFFBRnVCLENBRXBELEtBRm9EO0FBQUEsb0JBRXBELEtBRm9ELG1DQUU1QyxHQUY0QztBQUFBLDBDQUV2QixRQUZ1QixDQUV2QyxTQUZ1QztBQUFBLG9CQUV2QyxTQUZ1Qyx1Q0FFN0IsRUFGNkI7QUFBQSx5Q0FHdEMsU0FIc0MsQ0FHcEQsT0FIb0Q7QUFBQSxvQkFHcEQsT0FIb0Qsc0NBRzVDLEVBSDRDOzs7QUFLekQsMEJBQWEsT0FBYixTQUF3QixnQkFBeEI7O0FBRUEsb0JBQUksWUFBWSxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQWhCOztBQUVBLHVCQUFPLEtBQUssT0FBTCxDQUFhLGdCQUFiLEVBQWtDLFNBQWxDLFNBQStDLE9BQS9DLENBQVA7O0FBRUEsdUJBQVUsV0FBVixTQUF5QixJQUF6QjtBQUNILGFBWmMsRUFZWixFQVpZLENBQWY7O0FBY0EsbUJBQU8sUUFBUDtBQUNIOzs7NEJBdEJxQjtBQUNsQixtQkFBTyxpQkFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDYkw7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsSSxXQUFBLEk7QUFDVCxvQkFBMEQ7QUFBQSxZQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSw4QkFDSSxRQURKLENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsaUNBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLFlBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLDZCQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxZQUN0QixJQURzQixrQ0FDZixFQURlO0FBQUEsK0JBQ0ksUUFESixDQUNYLE1BRFc7QUFBQSxZQUNYLE1BRFcsb0NBQ0YsRUFERTs7O0FBR3RELGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTDtBQUNIOzs7OzRCQUVlO0FBQ1osbUJBQU8sRUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLGdCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsZ0JBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSxnQkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSxnQkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxnQkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwrQkFFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsZ0JBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsZ0JBRVUsU0FGVixHQUUyQyxLQUYzQyxDQUVVLFNBRlY7QUFBQSw4QkFFMkMsS0FGM0MsQ0FFcUIsSUFGckI7QUFBQSxnQkFFcUIsSUFGckIsK0JBRTRCLEVBRjVCO0FBQUEsNEJBRTJDLEtBRjNDLENBRWdDLEVBRmhDO0FBQUEsZ0JBRWdDLEVBRmhDLDZCQUVxQyxFQUZyQztBQUFBLGtDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSxnQkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLHNDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLGdCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSx3Q0FJYyxhQUpkLENBSUYsT0FKRTtBQUFBLGdCQUlGLE9BSkUseUNBSVEsRUFKUjs7O0FBTVAsc0JBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFOTyxtQ0FRd0csTUFSeEcsQ0FRRixRQVJFO0FBQUEsZ0JBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSxxQ0FRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSxnQkFRd0MsZUFSeEMsc0NBUTBELEVBUjFEO0FBQUEsc0NBUXdHLE1BUnhHLENBUThELFdBUjlEO0FBQUEsZ0JBUThELFdBUjlELHVDQVE0RSxFQVI1RTtBQUFBLCtCQVF3RyxNQVJ4RyxDQVFnRixJQVJoRjtBQUFBLGdCQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDRCQUE0QixJQUFJLEtBQUssYUFBVCxDQUF1QixlQUF2QixFQUF3QyxXQUF4QyxFQUFxRCxJQUFyRjs7QUFFQSx3Q0FBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLGdCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsZ0JBQUksNkNBQ2MsRUFEZCxZQUNzQixLQUR0Qiw4Q0FFZ0IsT0FGaEIsaUJBRWlDLEVBRmpDLGtCQUU4QyxJQUY5QywwQkFFb0UseUJBRnBFLFdBRW1HLFNBRm5HLFNBRWdILElBRmhILHVCQUdFLFNBSEYsY0FBSjs7QUFNQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREw7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsUSxXQUFBLFE7QUFDVCx3QkFBMEQ7QUFBQSxZQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSw4QkFDSSxRQURKLENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsaUNBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLFlBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLDZCQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxZQUN0QixJQURzQixrQ0FDZixFQURlO0FBQUEsK0JBQ0ksUUFESixDQUNYLE1BRFc7QUFBQSxZQUNYLE1BRFcsb0NBQ0YsRUFERTs7O0FBR3RELGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTDtBQUNIOzs7OzRCQUVlO0FBQ1osbUJBQU8sRUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLGdCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsZ0JBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSxnQkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSxnQkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxnQkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwrQkFFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsZ0JBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsZ0JBRVUsU0FGVixHQUUyQyxLQUYzQyxDQUVVLFNBRlY7QUFBQSw4QkFFMkMsS0FGM0MsQ0FFcUIsSUFGckI7QUFBQSxnQkFFcUIsSUFGckIsK0JBRTRCLEVBRjVCO0FBQUEsNEJBRTJDLEtBRjNDLENBRWdDLEVBRmhDO0FBQUEsZ0JBRWdDLEVBRmhDLDZCQUVxQyxFQUZyQztBQUFBLGtDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSxnQkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLHNDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLGdCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSx3Q0FJYyxhQUpkLENBSUYsT0FKRTtBQUFBLGdCQUlGLE9BSkUseUNBSVEsRUFKUjtBQUFBLG1DQUt3RyxNQUx4RyxDQUtGLFFBTEU7QUFBQSxnQkFLUSxhQUxSLG9DQUt3QixFQUx4QjtBQUFBLHFDQUt3RyxNQUx4RyxDQUs0QixVQUw1QjtBQUFBLGdCQUt3QyxlQUx4QyxzQ0FLMEQsRUFMMUQ7QUFBQSxzQ0FLd0csTUFMeEcsQ0FLOEQsV0FMOUQ7QUFBQSxnQkFLOEQsV0FMOUQsdUNBSzRFLEVBTDVFO0FBQUEsK0JBS3dHLE1BTHhHLENBS2dGLElBTGhGO0FBQUEsZ0JBS3NGLFNBTHRGLGdDQUtrRyxFQUxsRzs7QUFNUCxnQkFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsZ0JBQUksNEJBQTRCLElBQUksS0FBSyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFdBQXhDLEVBQXFELElBQXJGOztBQUVBLGdCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsb0JBQVEsWUFBWSxLQUFaLEdBQW9CLEVBQTVCOztBQUVBLGdCQUFJLDZDQUNjLEVBRGQsWUFDc0IsS0FEdEIsaURBRW1CLE9BRm5CLFNBRThCLFNBRjlCLGlCQUVpRCxFQUZqRCxrQkFFOEQsSUFGOUQsV0FFdUUsWUFGdkUsV0FFeUYseUJBRnpGLFdBRXdILFNBRnhILFNBRXFJLElBRnJJLGdEQUlFLFNBSkYsY0FBSjs7QUFPQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0w7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsRyxXQUFBLEc7QUFDVCxtQkFBMEQ7QUFBQSxZQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSw4QkFDQyxRQURELENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsaUNBQ0MsUUFERCxDQUN0QyxRQURzQztBQUFBLFlBQ3RDLFFBRHNDLHNDQUMzQixFQUQyQjtBQUFBLDZCQUNDLFFBREQsQ0FDeEIsSUFEd0I7QUFBQSxZQUN4QixJQUR3QixrQ0FDakIsRUFEaUI7QUFBQSwrQkFDQyxRQURELENBQ2QsTUFEYztBQUFBLFlBQ2QsTUFEYyxvQ0FDTCxFQURLOzs7QUFHdEQsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLGFBQXJCO0FBQ0EsYUFBSyxhQUFMO0FBQ0g7Ozs7NEJBRWU7QUFDWixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNGLEtBREUsR0FDd0QsSUFEeEQsQ0FDRixLQURFO0FBQUEsZ0JBQ0ssUUFETCxHQUN3RCxJQUR4RCxDQUNLLFFBREw7QUFBQSxnQkFDZSxJQURmLEdBQ3dELElBRHhELENBQ2UsSUFEZjtBQUFBLGdCQUNxQixNQURyQixHQUN3RCxJQUR4RCxDQUNxQixNQURyQjtBQUFBLGdCQUM2QixTQUQ3QixHQUN3RCxJQUR4RCxDQUM2QixTQUQ3QjtBQUFBLGdCQUN3QyxZQUR4QyxHQUN3RCxJQUR4RCxDQUN3QyxZQUR4QztBQUFBLCtCQUUyQyxLQUYzQyxDQUVGLEtBRkU7QUFBQSxnQkFFRixLQUZFLGdDQUVNLEVBRk47QUFBQSxnQkFFVSxTQUZWLEdBRTJDLEtBRjNDLENBRVUsU0FGVjtBQUFBLDhCQUUyQyxLQUYzQyxDQUVxQixJQUZyQjtBQUFBLGdCQUVxQixJQUZyQiwrQkFFNEIsRUFGNUI7QUFBQSw0QkFFMkMsS0FGM0MsQ0FFZ0MsRUFGaEM7QUFBQSxnQkFFZ0MsRUFGaEMsNkJBRXFDLEVBRnJDO0FBQUEsa0NBRzRDLFFBSDVDLENBR0YsS0FIRTtBQUFBLGdCQUdJLGFBSEosbUNBR29CLEVBSHBCO0FBQUEsc0NBRzRDLFFBSDVDLENBR3dCLFNBSHhCO0FBQUEsZ0JBR3dCLFNBSHhCLHVDQUdvQyxJQUhwQztBQUFBLHdDQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsZ0JBSUYsT0FKRSx5Q0FJUSxFQUpSO0FBQUEsbUNBSzJHLE1BTDNHLENBS0YsUUFMRTtBQUFBLGdCQUtTLGFBTFQsb0NBS3lCLEVBTHpCO0FBQUEscUNBSzJHLE1BTDNHLENBSzZCLFVBTDdCO0FBQUEsZ0JBSzBDLGVBTDFDLHNDQUs0RCxFQUw1RDtBQUFBLHNDQUsyRyxNQUwzRyxDQUtnRSxXQUxoRTtBQUFBLGdCQUtnRSxXQUxoRSx1Q0FLOEUsRUFMOUU7QUFBQSwrQkFLMkcsTUFMM0csQ0FLa0YsSUFMbEY7QUFBQSxnQkFLeUYsU0FMekYsZ0NBS3FHLEVBTHJHOztBQU1QLGdCQUFJLFlBQVksSUFBSSxLQUFLLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBdEQ7QUFDQSxnQkFBSSw0QkFBNEIsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsV0FBeEMsRUFBcUQsSUFBckY7O0FBRUEsZ0JBQUcsU0FBSCxFQUFjLFFBQVEsU0FBUjs7QUFFZCxnQkFBSSw2Q0FDYyxFQURkLFlBQ3NCLEtBRHRCLDhDQUVnQixPQUZoQixTQUUyQixTQUYzQixXQUV5QyxZQUZ6QyxlQUU4RCxFQUY5RCxrQkFFMkUsSUFGM0UseUJBRWdHLHlCQUZoRyxXQUUrSCxTQUYvSCxTQUU0SSxJQUY1SSx1QkFHRSxTQUhGLGNBQUo7O0FBTUEsd0JBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q0w7Ozs7Ozs7Ozs7O0FBR0ksb0JBQVksU0FBWixFQUF1QjtBQUFBOztBQUFBOztBQUduQixZQUFHLFVBQVUsSUFBVixZQUEwQixRQUE3QixFQUFzQztBQUNsQyxzQkFBVSxJQUFWLENBQWUsTUFBSyxJQUFwQjtBQUVILFNBSEQsTUFHTztBQUNILGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxnQkFBSSxTQUFKLEdBQWdCLE1BQUssSUFBckI7O0FBRUEsc0JBQVUsV0FBVixDQUFzQixHQUF0QjtBQUNIOztBQVhrQixZQWNmLHdCQWRlLFNBY2Ysd0JBZGU7QUFBQSxZQWVmLG9CQWZlLFNBZWYsb0JBZmU7QUFBQSxZQWdCZixzQkFoQmUsU0FnQmYsc0JBaEJlO0FBQUEsWUFpQmYsZUFqQmUsU0FpQmYsZUFqQmU7QUFBQSxZQWtCZixtQkFsQmUsU0FrQmYsbUJBbEJlO0FBQUEsWUFtQmYsZ0JBbkJlLFNBbUJmLGdCQW5CZTs7O0FBc0JuQixjQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxjQUFLLGlCQUFMLEdBQXlCLFNBQVMsY0FBVCxDQUF3QiwyQkFBeEIsQ0FBekI7QUFDQSxjQUFLLGFBQUwsR0FBcUIsU0FBUyxjQUFULENBQXdCLDJCQUF4QixDQUFyQjtBQUNBLGNBQUssZUFBTCxHQUF3QixTQUFTLGNBQVQsQ0FBd0IsNkJBQXhCLENBQXhCO0FBQ0EsY0FBSyxRQUFMLEdBQWdCLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBaEI7QUFDQSxjQUFLLFlBQUwsR0FBb0IsU0FBUyxjQUFULENBQXdCLDhCQUF4QixDQUFwQjtBQUNBLGNBQUssU0FBTCxHQUFpQixTQUFTLGNBQVQsQ0FBd0IsMkJBQXhCLENBQWpCOztBQTVCbUI7QUE4QnRCOzs7OzRCQUU2QjtBQUMxQixtQkFBTyxZQUFQO0FBQ0g7Ozs0QkFFeUI7QUFDdEIsbUJBQU8sVUFBUDtBQUNIOzs7NEJBRTJCO0FBQ3hCLG1CQUFPLGNBQVA7QUFDSDs7OzRCQUVvQjtBQUNqQixtQkFBTyxXQUFQO0FBQ0g7Ozs0QkFFd0I7QUFDckIsbUJBQU8sTUFBUDtBQUNIOzs7NEJBRXFCO0FBQ2xCLG1CQUFPLFlBQVA7QUFDSDs7OzRCQUVnQjtBQUNiLG1CQUFPLFlBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLGFBQVA7QUFDSDs7OzRCQUVrQjtBQUNmLG1CQUFPLGlCQUFQO0FBQ0g7Ozs0QkFFZ0I7QUFDYixtQkFBTyxrQkFBUDtBQUNIOzs7NEJBRTZCO0FBQzFCO0FBQ0g7Ozs0QkFFa0M7QUFDL0IsbUJBQU8sZ0JBQVA7QUFDSDs7OzRCQUV3QjtBQUFBLGdCQUNGLElBREUsR0FDTSxJQUROLENBQ2hCLFdBRGdCO0FBQUEsZ0JBRVcsaUJBRlgsR0FFZ0MsSUFGaEMsQ0FFaEIsd0JBRmdCOztBQUdyQixnRkFDZ0QsaUJBRGhELG1DQUVnQixJQUZoQjtBQUlIOzs7NEJBRWlCO0FBQ2QsaUZBQ2lELEtBQUssZUFEdEQsd0NBRXNCLEtBQUssd0JBRjNCO0FBS0g7Ozs0QkFFa0I7QUFDZixnRkFDZ0QsS0FBSyxzQkFEckQsdUVBRThDLEtBQUssb0JBRm5EO0FBSUg7Ozs0QkFFbUI7QUFBQSxnQkFDSyxNQURMLEdBQ29DLElBRHBDLENBQ1gsYUFEVztBQUFBLGdCQUNhLG1CQURiLEdBQ29DLElBRHBDLENBQ2EsbUJBRGI7O0FBRWhCLHVGQUN1RCxtQkFEdkQsc0NBRW9CLE1BRnBCO0FBS0g7Ozs0QkFFa0I7QUFDZixrRkFDa0QsS0FBSyxnQkFEdkQsd0NBRXNCLEtBQUssNkJBRjNCO0FBS0g7Ozs0QkFFVTtBQUFBLGdCQUdILG1CQUhHLEdBUUgsSUFSRyxDQUdILG1CQUhHO0FBQUEsZ0JBSUgsWUFKRyxHQVFILElBUkcsQ0FJSCxZQUpHO0FBQUEsZ0JBS0gsYUFMRyxHQVFILElBUkcsQ0FLSCxhQUxHO0FBQUEsZ0JBTUgsY0FORyxHQVFILElBUkcsQ0FNSCxjQU5HO0FBQUEsZ0JBT0gsYUFQRyxHQVFILElBUkcsQ0FPSCxhQVBHOztBQVNQLHFDQUNLLG1CQURMLHFCQUVLLFlBRkwscUJBR0ssYUFITCxxQkFJSyxjQUpMLHFCQUtLLGFBTEw7QUFPSDs7Ozs7Ozs7Ozs7Ozs7OztBQzVJTDs7Ozs7Ozs7SUFFYSxNLFdBQUEsTTs7O0FBQ1osaUJBQVksVUFBWixFQUF1QjtBQUFBOztBQUFBLHlHQUNoQixVQURnQjtBQUV0Qjs7Ozs7Ozs7Ozs7O0FDTEY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGtDQUFrQyxzQ0FBdEM7O0lBRU0sbUIsR0FDRiw2QkFBWSxNQUFaLEVBQW9CLEtBQXBCLEVBQTJCLFlBQTNCLEVBQXlDO0FBQUE7O0FBRXJDLE1BQUksT0FBTyxJQUFYO0FBRUgsQzs7QUFLTCxvQkFBb0IsT0FBcEIsR0FBOEIsQ0FBQyxRQUFELEVBQVcsT0FBWCxFQUFvQixlQUFwQixDQUE5Qjs7a0JBRWUscUNBQXNCLG1CQUF0QixDOzs7Ozs7Ozs7QUNsQmY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxrQ0FBa0Msc0NBQXRDOztJQUNNLHVCOzs7QUFDRixxQ0FBWSxNQUFaLEVBQW9CLEtBQXBCLEVBQTJCLFlBQTNCLEVBQXlDO0FBQUE7O0FBQUEsc0pBQy9CLE1BRCtCLEVBQ3ZCLEtBRHVCLEVBQ2hCLFlBRGdCOztBQUVyQyxZQUFJLFlBQUo7O0FBRUEsY0FBSyxXQUFMLEdBQW1CLFVBQUMsVUFBRCxFQUFlO0FBQzlCLGtCQUFLLFFBQUwsR0FBZ0IsVUFBaEI7QUFDSCxTQUZEOztBQUlBLGNBQU0sR0FBTixDQUFVLElBQVYsQ0FBZSxnQ0FBZ0MsZ0JBQS9DLEVBQWlFLFlBQUs7QUFDbEUsa0JBQU0sR0FBTixDQUFVLElBQVYsQ0FBZSxnQ0FBZ0MsWUFBL0MsRUFBNkQsS0FBSyxRQUFsRTtBQUNILFNBRkQ7QUFScUM7QUFXeEM7Ozs7O0FBR0wsd0JBQXdCLE9BQXhCLEdBQWtDLENBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsZUFBcEIsQ0FBbEM7O2tCQUVlLHFDQUFzQix1QkFBdEIsQzs7Ozs7Ozs7Ozs7QUN0QmY7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxTO0FBQ0YsdUJBQVksUUFBWixFQUFzQixPQUF0QixFQUErQixLQUEvQixFQUFzQyxLQUF0QyxFQUE2QyxhQUE3QyxFQUE0RCxZQUE1RCxFQUEwRSxjQUExRSxFQUEwRjtBQUFBOztBQUN0RixhQUFLLFFBQUwsR0FBZ0IsS0FBSyxZQUFyQjtBQUNBLGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUssUUFBTCxHQUFnQixHQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLGlCQUFmO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssS0FBTCxHQUFhO0FBQ1QsdUJBQVc7QUFERixTQUFiO0FBR0EsYUFBSyxVQUFMO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsYUFBSyxJQUFMLEdBQVksVUFBQyxNQUFELEVBQVMsSUFBVCxFQUFlLE1BQWYsRUFBdUIsVUFBdkIsRUFBc0M7QUFBQSxnQkFDOUIsS0FEOEIsR0FDckIsTUFEcUIsQ0FDekMsU0FEeUM7QUFBQSx5QkFFb0YsS0FGcEY7QUFBQSxnQkFFekMsRUFGeUMsVUFFekMsRUFGeUM7QUFBQSxnQkFFckMsSUFGcUMsVUFFckMsSUFGcUM7QUFBQSx1Q0FFL0IsTUFGK0I7QUFBQSxnQkFFL0IsTUFGK0IsaUNBRXRCLEVBRnNCO0FBQUEsZ0JBRWxCLFNBRmtCLFVBRWxCLFNBRmtCO0FBQUEsc0NBRVAsS0FGTztBQUFBLGdCQUVQLEtBRk8sZ0NBRUMsUUFBUSxlQUFSLEVBQXlCLFdBQXpCLEVBQXNDLEVBQXRDLENBRkQ7QUFBQSwyQ0FFNEMsVUFGNUM7QUFBQSxnQkFFNEMsVUFGNUMscUNBRXlELEVBRnpEO0FBQUEsZ0JBRTZELElBRjdELFVBRTZELElBRjdEO0FBQUEseUNBRW1FLFFBRm5FO0FBQUEsZ0JBRW1FLFFBRm5FLG1DQUU4RSxFQUY5RTs7QUFHOUMsZ0JBQUksZ0dBQUo7O0FBRUEsa0JBQU0sS0FBTixHQUFjLFlBQVksU0FBWixHQUF3QixLQUF0QztBQUNBLG9CQUFRLGVBQWUsWUFBZixDQUE0QixRQUFRLGVBQVIsRUFBeUIsV0FBekIsRUFBc0MsRUFBdEMsQ0FBNUIsRUFBdUUsS0FBdkUsRUFBOEUsTUFBOUUsQ0FBUjs7QUFFQSxnQkFBSSxZQUFZO0FBQ1osdUJBQU8sS0FESztBQUVaLDBCQUFVLFFBRkU7QUFHWixzQkFBTTtBQUhNLGFBQWhCO0FBS0EsZ0JBQUksT0FBTyxJQUFJLGNBQWMsSUFBbEIsQ0FBdUIsU0FBdkIsQ0FBWDs7QUFFQSxpQkFBSyxJQUFMLENBQVUsS0FBSyxJQUFmOztBQUVBLHFCQUFTLEtBQUssUUFBTCxFQUFULEVBQTBCLE1BQTFCOztBQUVBLG1CQUFPLGVBQVAsR0FBeUIsVUFBQyxFQUFELEVBQVE7QUFDN0Isb0JBQUksTUFBTSxVQUFOLENBQWlCLFVBQXJCLEVBQWlDO0FBQzdCLHdCQUFJLFFBQVEsR0FBRyxLQUFmO0FBQ0Esd0JBQUksYUFBYSxNQUFNLE1BQXZCOztBQUY2QiwrQ0FJcEIsQ0FKb0I7QUFLekIsNEJBQUksT0FBTyxNQUFNLENBQU4sQ0FBWDtBQUNBLDRCQUFJLGNBQWMsTUFBTSxVQUFOLENBQWlCLFVBQWpCLENBQTRCLElBQTVCLENBQWxCOztBQUVBLGdDQUFRLEdBQVIsQ0FBWSxDQUFDLFdBQUQsQ0FBWixFQUNLLElBREwsQ0FDVSxZQUFNO0FBQUEsMENBQzhCLEtBRDlCO0FBQUEsMkRBQ0gsUUFERztBQUFBLGdDQUNILFFBREcsb0NBQ1EsRUFEUjtBQUFBLGdDQUNpQixTQURqQixXQUNZLElBRFo7OztBQUdSLHFDQUFTLE9BQVQsQ0FBaUI7QUFDYiw2Q0FBYSxTQURBO0FBRWIsd0NBQVE7QUFDSiwyQ0FBTyxTQURIO0FBRUosNkNBQVMsS0FBSztBQUZWO0FBRkssNkJBQWpCOztBQVFBLHlDQUFhLGNBQWIsQ0FBNEIsUUFBNUIsRUFBc0MsWUFBTSxDQUUzQyxDQUZEO0FBR0gseUJBZkwsRUFlTyxZQUFNLENBRVIsQ0FqQkw7QUFSeUI7O0FBSTdCLHlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBcEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFBQSw4QkFBNUIsQ0FBNEI7QUFzQnBDO0FBRUo7QUFDSixhQTlCRDtBQStCSCxTQWxERDtBQW1ESDs7Ozs0QkFFa0I7QUFDZjtBQUNIOzs7Ozs7QUFHTCxVQUFVLE9BQVYsR0FBb0IsQ0FBQyxVQUFELEVBQWEsU0FBYixFQUF3QixPQUF4QixFQUFpQyxPQUFqQyxFQUEwQyxrQkFBMUMsRUFBOEQsZUFBOUQsRUFBK0UsZ0JBQS9FLENBQXBCOztrQkFFZSxxQ0FBc0IsU0FBdEIsQzs7Ozs7Ozs7Ozs7QUMzRWY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTSxhO0FBQ0YsMkJBQVksUUFBWixFQUFzQixPQUF0QixFQUErQixLQUEvQixFQUFzQyxhQUF0QyxFQUFxRCxjQUFyRCxFQUFxRTtBQUFBOztBQUNqRSxhQUFLLFFBQUwsR0FBZ0IsS0FBSyxZQUFyQjtBQUNBLGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUssUUFBTCxHQUFnQixHQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLGlCQUFmO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssS0FBTCxHQUFhO0FBQ1QsdUJBQVc7QUFERixTQUFiO0FBR0EsYUFBSyxVQUFMO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsYUFBSyxJQUFMLEdBQVksVUFBQyxNQUFELEVBQVMsSUFBVCxFQUFlLE1BQWYsRUFBdUIsVUFBdkIsRUFBc0M7QUFBQSxnQkFDOUIsS0FEOEIsR0FDckIsTUFEcUIsQ0FDekMsU0FEeUM7QUFBQSx5QkFFb0YsS0FGcEY7QUFBQSxnQkFFekMsRUFGeUMsVUFFekMsRUFGeUM7QUFBQSxnQkFFckMsSUFGcUMsVUFFckMsSUFGcUM7QUFBQSx1Q0FFL0IsTUFGK0I7QUFBQSxnQkFFL0IsTUFGK0IsaUNBRXRCLEVBRnNCO0FBQUEsZ0JBRWxCLFNBRmtCLFVBRWxCLFNBRmtCO0FBQUEsc0NBRVAsS0FGTztBQUFBLGdCQUVQLEtBRk8sZ0NBRUMsUUFBUSxlQUFSLEVBQXlCLFdBQXpCLEVBQXNDLEVBQXRDLENBRkQ7QUFBQSwyQ0FFNEMsVUFGNUM7QUFBQSxnQkFFNEMsVUFGNUMscUNBRXlELEVBRnpEO0FBQUEsZ0JBRTZELElBRjdELFVBRTZELElBRjdEO0FBQUEseUNBRW1FLFFBRm5FO0FBQUEsZ0JBRW1FLFFBRm5FLG1DQUU4RSxFQUY5RTs7QUFHOUMsZ0JBQUksZ0JBQWdCLGlDQUFrQixLQUFsQixFQUF5QixNQUF6QixFQUFpQyxVQUFqQyxDQUFwQjtBQUNBLGdCQUFJLHdFQUFKOztBQUVBLGtCQUFNLEtBQU4sR0FBYyxZQUFZLFNBQVosR0FBd0IsS0FBdEM7QUFDQSxvQkFBUSxlQUFlLFlBQWYsQ0FBNEIsUUFBUSxlQUFSLEVBQXlCLFdBQXpCLEVBQXNDLEVBQXRDLENBQTVCLEVBQXVFLEtBQXZFLEVBQThFLE1BQTlFLENBQVI7O0FBRUEsZ0JBQUksZ0JBQWdCO0FBQ2hCLHVCQUFPLEtBRFM7QUFFaEIsMEJBQVUsUUFGTTtBQUdoQixzQkFBTSxPQUhVO0FBSWhCLHdCQUFRO0FBSlEsYUFBcEI7QUFNQSxnQkFBSSxXQUFXLElBQUksY0FBYyxRQUFsQixDQUEyQixhQUEzQixDQUFmOztBQUVBLGlCQUFLLElBQUwsQ0FBVSxTQUFTLElBQW5COztBQUVBLHFCQUFTLEtBQUssUUFBTCxFQUFULEVBQTBCLE1BQTFCO0FBQ0gsU0FwQkQ7QUFxQkg7Ozs7NEJBRWtCO0FBQ2Y7QUFDSDs7Ozs7O0FBR0wsY0FBYyxPQUFkLEdBQXdCLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsT0FBeEIsRUFBaUMsa0JBQWpDLEVBQXFELGdCQUFyRCxDQUF4Qjs7a0JBRWUscUNBQXNCLGFBQXRCLEM7Ozs7Ozs7Ozs7OztBQzlDZjs7QUFDQTs7Ozs7Ozs7SUFFYSxPLFdBQUEsTzs7O0FBQ1QscUJBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUFBLGlIQUNsQixPQURrQixFQUNULEtBRFM7QUFFM0I7Ozs7NEJBRW1CO0FBQ2hCLG1CQUFPLEtBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZMOztBQUNBOzs7Ozs7OztJQUVhLFEsV0FBQSxROzs7QUFDVCxzQkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsbUhBQ1osUUFEWTtBQUVyQjs7OztnREFVdUIsTyxFQUFTLFUsRUFBWTtBQUFBLGdCQUNwQyxLQURvQyxHQUMzQixJQUQyQixDQUNwQyxLQURvQztBQUFBLGdCQUVwQyxLQUZvQyxHQUUzQixLQUYyQixDQUVwQyxLQUZvQzs7QUFHekMseUpBRWdILFVBRmhILG1DQUdrQixNQUFNLEVBSHhCLFdBR2dDLEtBSGhDO0FBS0g7Ozs0QkFoQmU7QUFDWixtQkFBTyx1QkFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDZEw7O0FBQ0E7Ozs7Ozs7O0lBRWEsSSxXQUFBLEk7OztBQUNULGtCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSwyR0FDWixRQURZO0FBRXJCOzs7OzRCQUVlO0FBQ1osbUJBQU8sWUFBUDtBQUNIOzs7NEJBRWlCO0FBQ2QsbUJBQU8sUUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDZEw7O0FBQ0E7Ozs7Ozs7O0lBRWEsYSxXQUFBLGE7OztBQUNULDJCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSw2SEFDWixRQURZO0FBRXJCOzs7OzRCQUVlO0FBQ1osbUJBQU8sWUFBUDtBQUNIOzs7NEJBRWlCO0FBQ2QsbUJBQU8sUUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDZEw7O0FBQ0E7Ozs7Ozs7O0lBRWEsSyxXQUFBLEs7OztBQUNULG1CQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSw2R0FDWixRQURZO0FBRXJCOzs7OzRCQUVlO0FBQ1osbUJBQU8sY0FBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztJQ1RRLEksV0FBQSxJO0FBQ1Qsa0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLDhCQUMyQixRQUQzQixDQUNiLEtBRGE7QUFBQSxZQUNiLEtBRGEsbUNBQ0wsRUFESztBQUFBLGlDQUMyQixRQUQzQixDQUNELFFBREM7QUFBQSxZQUNELFFBREMsc0NBQ1UsRUFEVjtBQUFBLDZCQUMyQixRQUQzQixDQUNjLElBRGQ7QUFBQSxZQUNjLElBRGQsa0NBQ3FCLEVBRHJCOzs7QUFHbEIsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7Ozs0QkFHZTtBQUNaLG1CQUFPLFVBQVA7QUFDSDs7OzRCQUVVO0FBQUEsZ0JBQ0YsS0FERSxHQUNvRCxJQURwRCxDQUNGLEtBREU7QUFBQSxnQkFDSyxRQURMLEdBQ29ELElBRHBELENBQ0ssUUFETDtBQUFBLGdCQUNlLElBRGYsR0FDb0QsSUFEcEQsQ0FDZSxJQURmO0FBQUEsZ0JBQ3FCLFNBRHJCLEdBQ29ELElBRHBELENBQ3FCLFNBRHJCO0FBQUEsZ0NBQ29ELElBRHBELENBQ2dDLFlBRGhDO0FBQUEsZ0JBQ2dDLFlBRGhDLGlDQUM4QyxFQUQ5QztBQUFBLCtCQUUyQyxLQUYzQyxDQUVGLEtBRkU7QUFBQSxnQkFFRixLQUZFLGdDQUVNLEVBRk47QUFBQSxnQkFFVSxTQUZWLEdBRTJDLEtBRjNDLENBRVUsU0FGVjtBQUFBLDhCQUUyQyxLQUYzQyxDQUVxQixJQUZyQjtBQUFBLGdCQUVxQixJQUZyQiwrQkFFNEIsRUFGNUI7QUFBQSw0QkFFMkMsS0FGM0MsQ0FFZ0MsRUFGaEM7QUFBQSxnQkFFZ0MsRUFGaEMsNkJBRXFDLEVBRnJDO0FBQUEsa0NBRzJCLFFBSDNCLENBR0YsS0FIRTtBQUFBLGdCQUdLLGFBSEwsbUNBR3FCLEVBSHJCO0FBQUEsd0NBSWMsYUFKZCxDQUlGLE9BSkU7QUFBQSxnQkFJRixPQUpFLHlDQUlRLEVBSlI7OztBQU1QLHNCQUFhLE9BQWIsU0FBd0IsU0FBeEI7O0FBRUEsZ0JBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZixnQkFBSSwySkFLUyxFQUxULGdCQUtzQixJQUx0QixzQkFLMkMsSUFMM0MsdUpBQUo7O0FBYUEsd0JBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkNMOztBQUNBOzs7Ozs7OztJQUVhLEksV0FBQSxJOzs7QUFDVCxrQkFBWSxTQUFaLEVBQXVCLElBQXZCLEVBQTZCLGtCQUE3QixFQUFpRCxRQUFqRCxFQUEyRDtBQUFBOztBQUFBLDJHQUNqRCxTQURpRCxFQUN0QyxJQURzQyxFQUNoQyxrQkFEZ0MsRUFDWixRQURZO0FBRTFEOzs7OzRCQUVpQjtBQUNkLG1CQUFPLFNBQVA7QUFDSDs7OzRCQUVzQjtBQUFBLDBCQUNDLElBREQsQ0FDZCxNQURjO0FBQUEsZ0JBQ2QsTUFEYywyQkFDTCxFQURLO0FBQUEsZ0NBRTBILE1BRjFILENBRWQsS0FGYztBQUFBLGdCQUVQLFdBRk8saUNBRU8sUUFGUDtBQUFBLGdCQUU0QixlQUY1QixHQUUwSCxNQUYxSCxDQUVpQixTQUZqQjtBQUFBLGdDQUUwSCxNQUYxSCxDQUU2QyxLQUY3QztBQUFBLGdCQUVvRCxXQUZwRCxpQ0FFa0UsRUFGbEU7QUFBQSxvQ0FFMEgsTUFGMUgsQ0FFc0UsU0FGdEU7QUFBQSxnQkFFaUYsZUFGakYscUNBRW1HLEVBRm5HO0FBQUEscUNBRTBILE1BRjFILENBRXVHLFVBRnZHO0FBQUEsZ0JBRXVHLFVBRnZHLHNDQUVvSCxFQUZwSDtBQUFBLHVDQUdzQixXQUh0QixDQUdkLE9BSGM7QUFBQSxnQkFHTCxrQkFISyx3Q0FHZ0IsRUFIaEI7QUFBQSx3Q0FJMEIsZUFKMUIsQ0FJZCxPQUpjO0FBQUEsZ0JBSUwsc0JBSksseUNBSW9CLEVBSnBCOzs7QUFNbkIsMEJBQWMsa0JBQWtCLGVBQWxCLEdBQW9DLFdBQWxEOztBQUVBLGdCQUFJLGFBQWEsWUFBWSxNQUFaLElBQXNCLENBQXRCLDREQUdhLHNCQUhiLG1EQUlnQixrQkFKaEIsb0RBS0MsV0FMRCx3RkFTVCxFQVRSOztBQVdBLG1CQUFPLFVBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7cWpCQ2hDTDs7O0FBdUJBOzs7QUFLQTs7O0FBM0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7SUFFYSxhLFdBQUEsYTtBQUNULDZCQUFjO0FBQUE7O0FBQ1YsYUFBSyxNQUFMO0FBQ0EsYUFBSyxJQUFMO0FBQ0EsYUFBSyxJQUFMO0FBQ0EsYUFBSyxPQUFMO0FBQ0EsYUFBSyxJQUFMO0FBQ0EsYUFBSyxRQUFMO0FBQ0EsYUFBSyxJQUFMO0FBQ0EsYUFBSyxhQUFMO0FBQ0EsYUFBSyxRQUFMO0FBQ0EsYUFBSyxhQUFMO0FBQ0EsYUFBSyxPQUFMO0FBQ0EsYUFBSyxLQUFMO0FBQ0EsYUFBSyxHQUFMO0FBQ0EsYUFBSyxRQUFMO0FBQ0EsYUFBSyxLQUFMO0FBQ0EsYUFBSyxLQUFMO0FBQ0EsYUFBSyxLQUFMLEdBQWEsa0JBQWI7QUFDQSxhQUFLLE1BQUw7QUFDQSxhQUFLLE1BQUwsR0FBYztBQUNWLHlDQURVO0FBRVYseUNBRlU7QUFHVjtBQUhVLFNBQWQ7O0FBTUEsYUFBSyxPQUFMLEdBQWU7QUFDWCx1REFEVztBQUVYO0FBRlcsU0FBZjtBQUlIOzs7OzBDQUVpQjtBQUNkLGNBQUUsUUFBRixFQUFZLGVBQVo7QUFDQSx3QkFBWSxnQkFBWjtBQUNIOzs7Ozs7QUFHTCxPQUFPLE9BQVAsR0FBaUIsdUJBQWpCOztBQUVBLElBQUksV0FBVyxRQUFRLE1BQVIsQ0FBZSxRQUFmLENBQWYsRUFBeUM7QUFDckMsWUFDSyxNQURMLENBQ1ksUUFEWixFQUVLLFFBRkwsQ0FFYyxzQkFGZCxFQUVzQyx1QkFGdEM7QUFHSDs7QUFFRCxTQUFTLHVCQUFULENBQWlDLFFBQWpDLEVBQTJDO0FBQ3ZDLFdBQU8sYUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7QUMvRUQ7Ozs7Ozs7O0lBRWEsYSxXQUFBLGE7OztBQUNULDZCQUErQjtBQUFBLFlBQW5CLGFBQW1CLHVFQUFILEVBQUc7O0FBQUE7O0FBQUEsNkhBQ3RCLGFBRHNCO0FBRTlCOzs7OzRCQUVzQjtBQUNuQixtQkFBTyxXQUFQO0FBQ0g7Ozs0QkFFbUI7QUFDaEIsbUJBQU8sWUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDYkw7O0FBQ0E7Ozs7Ozs7O0lBRWEsTSxXQUFBLE07OztBQUNULG9CQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSwrR0FDWixRQURZO0FBRXJCOzs7OzRCQUVlO0FBQ1osbUJBQU8sY0FBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkw7O0FBQ0E7Ozs7Ozs7O0lBRWEsTyxXQUFBLE87OztBQUNULHlCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSx5SEFDWixRQURZO0FBRXJCOzs7O29DQUVXO0FBQUEsNEJBQ0gsSUFERyxHQUN1RSxJQUR2RSxDQUNILElBREc7QUFBQSw0QkFDRyxLQURILEdBQ3VFLElBRHZFLENBQ0csS0FESDtBQUFBLDRCQUNVLGNBRFYsR0FDdUUsSUFEdkUsQ0FDVSxjQURWO0FBQUEsNEJBQzBCLE1BRDFCLEdBQ3VFLElBRHZFLENBQzBCLE1BRDFCO0FBQUEsNEJBQ2tDLFFBRGxDLEdBQ3VFLElBRHZFLENBQ2tDLFFBRGxDO0FBQUEsNEJBQzRDLFNBRDVDLEdBQ3VFLElBRHZFLENBQzRDLFNBRDVDO0FBQUEsNEJBQ3VELFlBRHZELEdBQ3VFLElBRHZFLENBQ3VELFlBRHZEO0FBQUEsNEJBRUgsRUFGRyxHQUV5QyxLQUZ6QyxDQUVILEVBRkc7QUFBQSw0QkFFQyxJQUZELEdBRXlDLEtBRnpDLENBRUMsSUFGRDtBQUFBLDRCQUVPLE9BRlAsR0FFeUMsS0FGekMsQ0FFTyxPQUZQO0FBQUEsMkNBRXlDLEtBRnpDLENBRWdCLEtBRmhCO0FBQUEsNEJBRWdCLEtBRmhCLGdDQUV3QixFQUZ4QjtBQUFBLDRCQUU0QixTQUY1QixHQUV5QyxLQUZ6QyxDQUU0QixTQUY1QjtBQUFBLDhDQUc0QyxRQUg1QyxDQUdILEtBSEc7QUFBQSw0QkFHSSxhQUhKLG1DQUdvQixFQUhwQjtBQUFBLGtEQUc0QyxRQUg1QyxDQUd3QixTQUh4QjtBQUFBLDRCQUd3QixTQUh4Qix1Q0FHb0MsSUFIcEM7QUFBQSxvREFJYSxhQUpiLENBSUgsT0FKRztBQUFBLDRCQUlILE9BSkcseUNBSU8sRUFKUDs7O0FBTVIsa0NBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFOUSwrQ0FRdUcsTUFSdkcsQ0FRSCxRQVJHO0FBQUEsNEJBUU8sYUFSUCxvQ0FRdUIsRUFSdkI7QUFBQSxpREFRdUcsTUFSdkcsQ0FRMkIsVUFSM0I7QUFBQSw0QkFRdUMsZUFSdkMsc0NBUXlELEVBUnpEO0FBQUEsa0RBUXVHLE1BUnZHLENBUTZELFdBUjdEO0FBQUEsNEJBUTZELFdBUjdELHVDQVEyRSxFQVIzRTtBQUFBLDJDQVF1RyxNQVJ2RyxDQVErRSxJQVIvRTtBQUFBLDRCQVFxRixTQVJyRixnQ0FRaUcsRUFSakc7O0FBU1IsNEJBQUksa0VBQUo7QUFDQSw0QkFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsNEJBQUksNEJBQTRCLElBQUksS0FBSyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFdBQXhDLEVBQXFELElBQXJGOztBQUVBLG9EQUErQix5QkFBL0IsU0FBNEQsWUFBNUQ7O0FBRUEsNEJBQUksZ0JBQWdCLFFBQWhCLElBQTZCLGtCQUFrQixlQUFlLE1BQWYsSUFBeUIsQ0FBNUUsRUFBZ0Y7QUFDNUUsbURBQW1CLHVDQUNLLGNBREwsaUJBRWYsZ0JBRko7QUFHSDs7QUFFRCw0QkFBSSxTQUFKLEVBQWUsUUFBUSxTQUFSOztBQUVmLDRCQUFJLGNBQWMsUUFBUSxNQUFSLENBQWUsVUFBQyxVQUFELEVBQWEsTUFBYixFQUF3QjtBQUNyRCx1Q0FBVSxVQUFWLHFDQUNpQixPQUFPLEtBRHhCLFVBQ2tDLE9BQU8sT0FEekM7QUFFSCx5QkFIaUIsRUFHZixFQUhlLENBQWxCOztBQUtBLDRCQUFJLDZFQUVvQixPQUZwQixlQUVxQyxFQUZyQyxnQkFFa0QsSUFGbEQsU0FFMEQseUJBRjFELFNBRXVGLFNBRnZGLFNBRW9HLElBRnBHLDZCQUdRLGdCQUhSLDRCQUlRLFdBSlIsK0RBTWlCLEVBTmpCLFVBTXdCLEtBTnhCLGtDQU9LLFNBUFQ7O0FBU0Esb0NBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUNMOztBQUNBOzs7Ozs7OztJQUVhLFEsV0FBQSxROzs7QUFDVCxzQkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsbUhBQ1osUUFEWTtBQUVyQjs7Ozs0QkFHZTtBQUNaLG1CQUFPLFVBQVA7QUFDSDs7OzRCQUVVO0FBQUEsZ0JBQ0YsS0FERSxHQUN3RCxJQUR4RCxDQUNGLEtBREU7QUFBQSxnQkFDSyxRQURMLEdBQ3dELElBRHhELENBQ0ssUUFETDtBQUFBLGdCQUNlLElBRGYsR0FDd0QsSUFEeEQsQ0FDZSxJQURmO0FBQUEsZ0JBQ3FCLE1BRHJCLEdBQ3dELElBRHhELENBQ3FCLE1BRHJCO0FBQUEsZ0JBQzZCLFNBRDdCLEdBQ3dELElBRHhELENBQzZCLFNBRDdCO0FBQUEsZ0JBQ3dDLFlBRHhDLEdBQ3dELElBRHhELENBQ3dDLFlBRHhDO0FBQUEsK0JBRTJDLEtBRjNDLENBRUYsS0FGRTtBQUFBLGdCQUVGLEtBRkUsZ0NBRU0sRUFGTjtBQUFBLGdCQUVVLFNBRlYsR0FFMkMsS0FGM0MsQ0FFVSxTQUZWO0FBQUEsOEJBRTJDLEtBRjNDLENBRXFCLElBRnJCO0FBQUEsZ0JBRXFCLElBRnJCLCtCQUU0QixFQUY1QjtBQUFBLDRCQUUyQyxLQUYzQyxDQUVnQyxFQUZoQztBQUFBLGdCQUVnQyxFQUZoQyw2QkFFcUMsRUFGckM7QUFBQSxrQ0FHNkMsUUFIN0MsQ0FHRixLQUhFO0FBQUEsZ0JBR0ssYUFITCxtQ0FHcUIsRUFIckI7QUFBQSxzQ0FHNkMsUUFIN0MsQ0FHeUIsU0FIekI7QUFBQSxnQkFHeUIsU0FIekIsdUNBR3FDLElBSHJDO0FBQUEsd0NBSWMsYUFKZCxDQUlGLE9BSkU7QUFBQSxnQkFJRixPQUpFLHlDQUlRLEVBSlI7OztBQU1QLHNCQUFhLE9BQWIsU0FBd0IsU0FBeEI7O0FBTk8sbUNBUXdHLE1BUnhHLENBUUYsUUFSRTtBQUFBLGdCQVFRLGFBUlIsb0NBUXdCLEVBUnhCO0FBQUEscUNBUXdHLE1BUnhHLENBUTRCLFVBUjVCO0FBQUEsZ0JBUXdDLGVBUnhDLHNDQVEwRCxFQVIxRDtBQUFBLHNDQVF3RyxNQVJ4RyxDQVE4RCxXQVI5RDtBQUFBLGdCQVE4RCxXQVI5RCx1Q0FRNEUsRUFSNUU7QUFBQSwrQkFRd0csTUFSeEcsQ0FRZ0YsSUFSaEY7QUFBQSxnQkFRc0YsU0FSdEYsZ0NBUWtHLEVBUmxHOztBQVNQLGdCQUFJLFlBQVksSUFBSSxLQUFLLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBdEQ7QUFDQSxnQkFBSSw0QkFBNEIsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsV0FBeEMsRUFBcUQsSUFBckY7O0FBRUEsd0NBQStCLHlCQUEvQixTQUE0RCxZQUE1RDs7QUFFQSxnQkFBSSxTQUFKLEVBQWUsUUFBUSxTQUFSOztBQUVmLGdCQUFJLHFEQUVTLHlCQUZULGdCQUU2QyxPQUY3QyxlQUU4RCxFQUY5RCxnQkFFMkUsSUFGM0UsOEJBRXdHLFNBRnhHLFNBRXFILElBRnJILG9DQUlFLFNBSkYsbUNBS2UsSUFMZixXQUt5QixLQUx6Qix1QkFBSjs7QUFRQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0w7O0FBQ0E7Ozs7Ozs7O0lBRWEsSyxXQUFBLEs7OztBQUNULG1CQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSw2R0FDWixRQURZO0FBRXJCOzs7OytDQU11QixTLEVBQVcsUyxFQUFXO0FBQzFDLCtDQUVFLFNBRkY7QUFJSDs7O3dDQU1lLFEsRUFBVSxLLEVBQU8sSSxFQUFNLEssRUFBTTtBQUN6QyxvREFDbUIsSUFEbkIsNkJBQzhDLFFBQU0sSUFEcEQsV0FDNkQsUUFEN0Qsb0NBRWtCLFFBQU0sSUFGeEIsV0FFaUMsS0FGakM7QUFJSDs7OzRCQXBCZTtBQUNaLG1CQUFPLG9CQUFQO0FBQ0g7Ozs0QkFTa0I7QUFDZixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFTVTtBQUFBLGdCQUNGLE1BREUsR0FDNEMsSUFENUMsQ0FDRixNQURFO0FBQUEsZ0JBQ00sTUFETixHQUM0QyxJQUQ1QyxDQUNNLE1BRE47QUFBQSxnQkFDYyxRQURkLEdBQzRDLElBRDVDLENBQ2MsUUFEZDtBQUFBLGdCQUN3QixLQUR4QixHQUM0QyxJQUQ1QyxDQUN3QixLQUR4QjtBQUFBLGdCQUMrQixTQUQvQixHQUM0QyxJQUQ1QyxDQUMrQixTQUQvQjtBQUFBLGdCQUVRLGFBRlIsR0FFK0MsTUFGL0MsQ0FFRixRQUZFO0FBQUEsK0JBRStDLE1BRi9DLENBRXVCLElBRnZCO0FBQUEsZ0JBRTZCLFNBRjdCLGdDQUV5QyxFQUZ6Qzs7QUFHUCxnQkFBSSxPQUFPLElBQVg7QUFITyxnQkFJSyxVQUpMLEdBSThDLEtBSjlDLENBSUYsS0FKRTtBQUFBLGdCQUk0QixjQUo1QixHQUk4QyxLQUo5QyxDQUlpQixTQUpqQjtBQUFBLHNDQUttQixRQUxuQixDQUtELFNBTEM7QUFBQSxnQkFLRCxTQUxDLHVDQUtXLElBTFg7QUFBQSxnQkFNRixJQU5FLEdBTU0sS0FOTixDQU1GLElBTkU7OztBQVFQLGdCQUFJLGNBQUosRUFBb0IsYUFBYSxjQUFiOztBQUVwQixnQkFBSSxhQUFhLE9BQU8sTUFBUCxDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFBQSxvQkFDdkMsS0FEdUMsR0FDTSxLQUROLENBQ3ZDLEtBRHVDO0FBQUEsc0NBQ00sS0FETixDQUNoQyxRQURnQztBQUFBLG9CQUNoQyxRQURnQyxtQ0FDckIsRUFEcUI7QUFBQSxxQ0FDTSxLQUROLENBQ2pCLE9BRGlCO0FBQUEsb0JBQ2pCLE9BRGlCLGtDQUNQLEVBRE87QUFBQSxvQkFDSCxLQURHLEdBQ00sS0FETixDQUNILEtBREc7OztBQUc1QywyQkFBYyxRQUFkLFNBQTBCLFNBQTFCOztBQUVBLG9CQUFJLFlBQVksS0FBSyxlQUFMLENBQXFCLFFBQXJCLEVBQStCLEtBQS9CLEVBQXNDLElBQXRDLEVBQTRDLEtBQTVDLENBQWhCOztBQUVBLHVCQUFVLElBQVYsc0JBQ0UsS0FBSyxzQkFBTCxDQUE0QixTQUE1QixFQUEwQyxTQUExQyxTQUF1RCxPQUF2RCxDQURGO0FBRUgsYUFUZ0IsRUFTZCxVQVRjLENBQWpCO0FBVUEsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDBDQUNHLFVBREgsdUJBRUcsU0FGUDs7QUFJQSxtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ3hETDs7QUFDQTs7OztBQUVBOzs7O0lBSWEsSyxXQUFBLEs7O0FBRVQ7Ozs7Ozs7Ozs7O0FBV0EsbUJBQTBEO0FBQUEsUUFBOUMsUUFBOEMsdUVBQW5DLEVBQW1DO0FBQUEsUUFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsMEJBQ0ksUUFESixDQUNqRCxLQURpRDtBQUFBLFFBQ2pELEtBRGlELG1DQUN6QyxFQUR5QztBQUFBLDZCQUNJLFFBREosQ0FDckMsUUFEcUM7QUFBQSxRQUNyQyxRQURxQyxzQ0FDMUIsRUFEMEI7QUFBQSx5QkFDSSxRQURKLENBQ3RCLElBRHNCO0FBQUEsUUFDdEIsSUFEc0Isa0NBQ2YsRUFEZTtBQUFBLDJCQUNJLFFBREosQ0FDWCxNQURXO0FBQUEsUUFDWCxNQURXLG9DQUNGLEVBREU7O0FBR3REOzs7OztBQUlBLFNBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUE7Ozs7QUFJQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxTQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7O0FBSUEsU0FBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBOzs7OztBQUtBLFNBQUssYUFBTDtBQUNIOztBQUVEOzs7Ozs7Ozt3QkFJZ0I7QUFDWixhQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7d0JBS21CO0FBQ2YsYUFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQW9CVztBQUFBLFVBQ0YsS0FERSxHQUN3RCxJQUR4RCxDQUNGLEtBREU7QUFBQSxVQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsVUFDZSxJQURmLEdBQ3dELElBRHhELENBQ2UsSUFEZjtBQUFBLFVBQ3FCLE1BRHJCLEdBQ3dELElBRHhELENBQ3FCLE1BRHJCO0FBQUEsVUFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxVQUN3QyxZQUR4QyxHQUN3RCxJQUR4RCxDQUN3QyxZQUR4QztBQUFBLHlCQUUyQyxLQUYzQyxDQUVGLEtBRkU7QUFBQSxVQUVGLEtBRkUsZ0NBRU0sRUFGTjtBQUFBLHdCQUUyQyxLQUYzQyxDQUVVLElBRlY7QUFBQSxVQUVVLElBRlYsK0JBRWlCLEVBRmpCO0FBQUEsc0JBRTJDLEtBRjNDLENBRXFCLEVBRnJCO0FBQUEsVUFFcUIsRUFGckIsNkJBRTBCLEVBRjFCO0FBQUEsVUFFOEIsU0FGOUIsR0FFMkMsS0FGM0MsQ0FFOEIsU0FGOUI7QUFBQSw0QkFHNkMsUUFIN0MsQ0FHRixLQUhFO0FBQUEsVUFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLGdDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLFVBR3lCLFNBSHpCLHVDQUdxQyxJQUhyQztBQUFBLGtDQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsVUFJRixPQUpFLHlDQUlRLEVBSlI7OztBQU1QLGdCQUFhLE9BQWIsU0FBd0IsU0FBeEI7O0FBTk8sNkJBUXdHLE1BUnhHLENBUUYsUUFSRTtBQUFBLFVBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSwrQkFRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSxVQVF3QyxlQVJ4QyxzQ0FRMEQsRUFSMUQ7QUFBQSxnQ0FRd0csTUFSeEcsQ0FROEQsV0FSOUQ7QUFBQSxVQVE4RCxXQVI5RCx1Q0FRNEUsRUFSNUU7QUFBQSx5QkFRd0csTUFSeEcsQ0FRZ0YsSUFSaEY7QUFBQSxVQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsVUFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsVUFBSSw0QkFBNEIsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsV0FBeEMsRUFBcUQsSUFBckY7O0FBRUEsa0NBQStCLHlCQUEvQixTQUE0RCxZQUE1RDs7QUFFQSxVQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsVUFBSSxxR0FHZ0IsT0FIaEIsbUJBR21DLElBSG5DLDJCQUcwRCx5QkFIMUQsV0FHeUYsU0FIekYsU0FHc0csSUFIdEcsb0RBS2EsSUFMYixZQUt1QixLQUx2QiwrQkFNRSxTQU5GLGNBQUo7O0FBU0Esa0JBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7OztBQzlITDs7Ozs7Ozs7SUFFYSxVLFdBQUEsVTs7O0FBQ1Qsd0JBQVksTUFBWixFQUFvQixXQUFwQixFQUFpQyxNQUFqQyxFQUF5QyxJQUF6QyxFQUE4QztBQUFBOztBQUFBLHVIQUNwQyxNQURvQyxFQUM1QixXQUQ0QixFQUNmLE1BRGUsRUFDUCxJQURPO0FBRTdDOzs7Ozs7Ozs7Ozs7O0FDTEw7Ozs7Ozs7O0lBRWEsZSxXQUFBLGU7OztBQUNULDZCQUFZLElBQVosRUFBa0IsV0FBbEIsRUFBOEI7QUFBQTs7QUFBQSxpSUFDcEIsSUFEb0IsRUFDZCxXQURjO0FBRTdCOzs7OztBQUNKOzs7Ozs7Ozs7Ozs7O0lDTlksVSxXQUFBLFU7QUFDVCx3QkFBWSxhQUFaLEVBQTJCLElBQTNCLEVBQWdDO0FBQUE7O0FBQzVCLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7Ozs0QkFFd0I7QUFBQSxpQ0FDSSxLQUFLLElBRFQsQ0FDaEIsUUFEZ0I7QUFBQSxnQkFDaEIsUUFEZ0Isa0NBQ0wsS0FESzs7O0FBR3JCLG1CQUFPLFdBQVcsZUFBWCxHQUE2QixFQUFwQztBQUNIOzs7NEJBRXlCO0FBQ3RCLG1CQUFPLFdBQVA7QUFDSDs7OzRCQUVVO0FBQUEsZ0JBQ0YsYUFERSxHQUMwQyxJQUQxQyxDQUNGLGFBREU7QUFBQSxnQkFDYSxJQURiLEdBQzBDLElBRDFDLENBQ2EsSUFEYjtBQUFBLGdCQUNtQixtQkFEbkIsR0FDMEMsSUFEMUMsQ0FDbUIsbUJBRG5CO0FBQUEsK0JBRXdDLElBRnhDLENBRUYsTUFGRTtBQUFBLGdCQUVGLE1BRkUsZ0NBRU8sRUFGUDtBQUFBLCtCQUV3QyxJQUZ4QyxDQUVXLE1BRlg7QUFBQSxnQkFFVyxNQUZYLGdDQUVvQixFQUZwQjtBQUFBLGdDQUV3QyxJQUZ4QyxDQUV3QixPQUZ4QjtBQUFBLGdCQUV3QixPQUZ4QixpQ0FFa0MsRUFGbEM7QUFBQSxrQ0FHMEUsTUFIMUUsQ0FHRixPQUhFO0FBQUEsZ0JBR1EsYUFIUixtQ0FHd0IsRUFIeEI7QUFBQSwrQkFHMEUsTUFIMUUsQ0FHNEIsSUFINUI7QUFBQSxnQkFHa0MsVUFIbEMseUNBR3NELEtBQUssSUFIM0Q7QUFBQSxtQ0FJZ0MsT0FKaEMsQ0FJRixPQUpFO0FBQUEsZ0JBSVEsY0FKUixvQ0FJeUIsRUFKekI7QUFBQSxrQ0FLc0QsTUFMdEQsQ0FLRixPQUxFO0FBQUEsZ0JBS1EsYUFMUixtQ0FLd0IsRUFMeEI7QUFBQSwrQkFLc0QsTUFMdEQsQ0FLNEIsSUFMNUI7QUFBQSxnQkFLbUMsVUFMbkMsZ0NBS2dELEVBTGhEOzs7QUFPUCxnRUFDZ0MsY0FEaEMsU0FDa0QsbUJBRGxELGNBQzhFLEtBQUssRUFEbkYsMkNBRXlCLGFBRnpCLFNBRTBDLEtBQUssb0JBRi9DLFVBRXdFLFVBRnhFLG1DQUdVLGFBSFYseUNBSXlCLGFBSnpCLFVBSTJDLFVBSjNDO0FBTUg7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDN0JRLEssV0FBQSxLO0FBQ1QscUJBQWM7QUFBQTtBQUNiOzs7O3dDQUVlLFMsRUFBVztBQUN2QixnQkFBSSxvQkFBb0IsR0FBeEI7QUFDQSxnQkFBSSxjQUFjLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsRUFBK0IsUUFBL0IsRUFBeUMsUUFBekMsRUFBbUQsUUFBbkQsRUFBNkQsUUFBN0QsRUFBdUUsUUFBdkUsRUFBaUYsUUFBakYsRUFBMkYsU0FBM0YsRUFBc0csU0FBdEcsRUFBaUgsU0FBakgsQ0FBbEI7QUFDQSxnQkFBSSxXQUFXLFVBQVUsTUFBVixDQUFpQixVQUFDLFdBQUQsRUFBYyxTQUFkLEVBQTRCO0FBQUEsb0JBQ25ELElBRG1ELEdBQ2pDLFNBRGlDLENBQ25ELElBRG1EO0FBQUEsb0JBQzdDLFFBRDZDLEdBQ2pDLFNBRGlDLENBQzdDLFFBRDZDO0FBQUEsc0NBRXZCLFFBRnVCLENBRW5ELEtBRm1EO0FBQUEsb0JBRW5ELEtBRm1ELG1DQUUzQyxHQUYyQztBQUFBLHdDQUV2QixRQUZ1QixDQUV0QyxPQUZzQztBQUFBLG9CQUV0QyxPQUZzQyxxQ0FFN0IsRUFGNkI7O0FBR3hELG9CQUFJLGVBQWUsZ0JBQWdCLEtBQWhCLENBQW5COztBQUVBLG9CQUFJLHFCQUFxQixDQUF6QixFQUE0QjtBQUN4QixrQ0FBaUIsV0FBakI7QUFDSDs7QUFFRCxxQ0FBcUIsWUFBckI7O0FBRUEsb0JBQUksMEJBQTBCLFlBQVksS0FBSyxLQUFMLENBQVcsZUFBZSxZQUFZLE1BQXRDLElBQWdELENBQTVELENBQTlCOztBQUdBLHVCQUFPLEtBQUssT0FBTCxDQUFhLGdCQUFiLG1CQUE4Qyx1QkFBOUMsU0FBeUUsT0FBekUsQ0FBUDtBQUNBLG1DQUFpQixXQUFqQixHQUErQixJQUEvQjs7QUFFQSxvQkFBSSxxQkFBcUIsQ0FBekIsRUFBNEI7QUFDeEIsa0NBQWlCLFdBQWpCO0FBQ0Esd0NBQW9CLENBQXBCO0FBQ0g7O0FBRUQsdUJBQU8sV0FBUDtBQUNILGFBdkJjLEVBdUJaLEVBdkJZLENBQWY7O0FBeUJBLGdCQUFHLFNBQVMsU0FBVCxDQUFtQixTQUFTLE1BQVQsR0FBa0IsQ0FBckMsTUFBNEMsUUFBL0MsRUFBd0Q7QUFDcEQsMkJBQWMsUUFBZDtBQUNIOztBQUVELG1CQUFPLFFBQVA7O0FBRUEscUJBQVMsZUFBVCxDQUF5QixXQUF6QixFQUFxQztBQUNqQyxvQkFBRyxnQkFBZ0IsR0FBbkIsRUFBd0IsT0FBTyxDQUFQOztBQUV4QixvQkFBSSxxQkFBcUIsWUFBWSxLQUFaLENBQWtCLEdBQWxCLENBQXpCOztBQUVBLHVCQUFPLFdBQVcsbUJBQW1CLENBQW5CLENBQVgsSUFBb0MsV0FBVyxtQkFBbUIsQ0FBbkIsQ0FBWCxDQUEzQztBQUNIO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0w7O0FBQ0E7Ozs7Ozs7O0lBRWEsSSxXQUFBLEk7OztBQUNULGtCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSwyR0FDWixRQURZO0FBRXJCOzs7OzRCQUdlO0FBQ1osbUJBQU8sVUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLGdCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsZ0JBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSxnQkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSxnQkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxnQkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwrQkFFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsZ0JBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsZ0JBRVUsU0FGVixHQUUyQyxLQUYzQyxDQUVVLFNBRlY7QUFBQSw4QkFFMkMsS0FGM0MsQ0FFcUIsSUFGckI7QUFBQSxnQkFFcUIsSUFGckIsK0JBRTRCLEVBRjVCO0FBQUEsNEJBRTJDLEtBRjNDLENBRWdDLEVBRmhDO0FBQUEsZ0JBRWdDLEVBRmhDLDZCQUVxQyxFQUZyQztBQUFBLGtDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSxnQkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLHNDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLGdCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSx3Q0FJYyxhQUpkLENBSUYsT0FKRTtBQUFBLGdCQUlGLE9BSkUseUNBSVEsRUFKUjs7O0FBTVAsc0JBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFOTyxtQ0FRd0csTUFSeEcsQ0FRRixRQVJFO0FBQUEsZ0JBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSxxQ0FRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSxnQkFRd0MsZUFSeEMsc0NBUTBELEVBUjFEO0FBQUEsc0NBUXdHLE1BUnhHLENBUThELFdBUjlEO0FBQUEsZ0JBUThELFdBUjlELHVDQVE0RSxFQVI1RTtBQUFBLCtCQVF3RyxNQVJ4RyxDQVFnRixJQVJoRjtBQUFBLGdCQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDRCQUE0QixJQUFJLEtBQUssYUFBVCxDQUF1QixlQUF2QixFQUF3QyxXQUF4QyxFQUFxRCxJQUFyRjs7QUFFQSx3Q0FBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLGdCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsZ0JBQUkscURBRVMseUJBRlQsZ0JBRTZDLE9BRjdDLGVBRThELEVBRjlELGdCQUUyRSxJQUYzRSwwQkFFb0csU0FGcEcsU0FFaUgsSUFGakgsb0NBSUUsU0FKRixtQ0FLZSxJQUxmLFdBS3lCLEtBTHpCLHVCQUFKOztBQVFBLHdCQUFVLFNBQVY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDTDs7QUFDQTs7Ozs7Ozs7SUFFYSxRLFdBQUEsUTs7O0FBQ1Qsc0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG1IQUNaLFFBRFk7QUFFckI7Ozs7NEJBRWU7QUFDWixtQkFBTyxzQkFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkw7O0FBQ0E7Ozs7Ozs7O0lBRWEsRyxXQUFBLEc7OztBQUNULGlCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSx5R0FDWixRQURZO0FBRXJCOzs7OzRCQUVlO0FBQ1osbUJBQU8sY0FBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNWTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksb0JBQVksU0FBWixFQUF1QixRQUF2QixFQUFpQztBQUFBOztBQUFBLCtHQUN2QixTQUR1QixFQUNaLFFBRFk7QUFFaEM7Ozs7cUNBZ0VZLEssRUFBTztBQUFBLGdCQUNYLFNBRFcsR0FDMEYsSUFEMUYsQ0FDWCxTQURXO0FBQUEsZ0JBQ0EsWUFEQSxHQUMwRixJQUQxRixDQUNBLFlBREE7QUFBQSxnQkFDYyxhQURkLEdBQzBGLElBRDFGLENBQ2MsYUFEZDtBQUFBLGdCQUM2Qiw2QkFEN0IsR0FDMEYsSUFEMUYsQ0FDNkIsNkJBRDdCO0FBQUEsZ0JBQzRELGFBRDVELEdBQzBGLElBRDFGLENBQzRELGFBRDVEO0FBQUEsZ0JBQzJFLFdBRDNFLEdBQzBGLElBRDFGLENBQzJFLFdBRDNFO0FBQUEsZ0JBRUUsS0FGRixHQUVZLFNBRlosQ0FFWCxXQUZXOztBQUdoQixnQkFBSSxvQkFBb0IsS0FBSyxtQkFBTCxDQUF5QixVQUFVLFFBQW5DLEVBQTZDLENBQUMsNkJBQUQsQ0FBN0MsQ0FBeEI7QUFDQSxnQkFBSSxtQkFBbUIsS0FBSyxtQkFBTCxDQUF5QixTQUF6QixDQUF2QjtBQUpnQixnQkFLUixTQUxRLEdBS0ssZ0JBTEwsQ0FLWCxDQUxXO0FBQUEsZ0JBTUgsQ0FORyxHQU1HLEtBTkgsQ0FNVixLQU5VOztBQU9oQixnQkFBSSxRQUFTLElBQUssU0FBbEI7QUFDQSxnQkFBSSxjQUFlLFFBQVEsS0FBM0I7QUFDQSxnQkFBSSxzQkFBc0IsQ0FBQyxXQUFELEVBQWMsYUFBZCxDQUExQjtBQUNBLGdCQUFJLFdBQVcsS0FBSyxtQkFBTCxDQUF5QixhQUFhLFFBQXRDLEVBQWdELENBQUMsZ0JBQUQsQ0FBaEQsQ0FBZjs7QUFFQSxxQkFBUyxTQUFULEdBQXFCLGFBQXJCO0FBQ0EsOEJBQWtCLEtBQWxCLENBQXdCLEtBQXhCLEdBQW1DLGNBQWMsR0FBakQ7O0FBRUEsaUJBQUssYUFBTCxHQUFxQixXQUFyQjtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxXQUFmO0FBQ0g7OztxQ0FzQlksSyxFQUFPO0FBQUEsZ0JBQ1gsaUJBRFcsR0FDcUMsSUFEckMsQ0FDWCxpQkFEVztBQUFBLGdCQUNRLFdBRFIsR0FDcUMsSUFEckMsQ0FDUSxXQURSO0FBQUEsZ0JBQ3FCLFlBRHJCLEdBQ3FDLElBRHJDLENBQ3FCLFlBRHJCOztBQUVoQixnQkFBSSxnQkFBZ0IsQ0FBQyxXQUFELEVBQWMsWUFBZCxDQUFwQjtBQUNBLGdCQUFJLGdCQUFnQixLQUFLLG1CQUFMLENBQXlCLGtCQUFrQixRQUEzQyxFQUFxRCxDQUFDLGdCQUFELENBQXJELENBQXBCOztBQUVBLG9CQUFRLGNBQWMsU0FBdEI7QUFDSSxxQkFBSyxXQUFMO0FBQ0ksa0NBQWMsU0FBZCxHQUEwQixZQUExQjs7QUFFQSx5QkFBSyxJQUFMO0FBQ0E7QUFDSixxQkFBSyxZQUFMO0FBQ0ksa0NBQWMsU0FBZCxHQUEwQixXQUExQjs7QUFFQSx5QkFBSyxLQUFMO0FBQ0E7QUFDSjtBQUNJO0FBWlI7QUFjSDs7O2dDQUVPLEssRUFBTztBQUFBLGdCQUNOLFlBRE0sR0FDZ0YsSUFEaEYsQ0FDTixZQURNO0FBQUEsZ0JBQ1EsV0FEUixHQUNnRixJQURoRixDQUNRLFdBRFI7QUFBQSxnQkFDcUIsYUFEckIsR0FDZ0YsSUFEaEYsQ0FDcUIsYUFEckI7QUFBQSxnQkFDb0MsU0FEcEMsR0FDZ0YsSUFEaEYsQ0FDb0MsU0FEcEM7QUFBQSxnQkFDK0MsNkJBRC9DLEdBQ2dGLElBRGhGLENBQytDLDZCQUQvQzs7QUFFWCxnQkFBSSxzQkFBc0IsQ0FBQyxXQUFELEVBQWMsYUFBZCxDQUExQjtBQUNBLGdCQUFJLFdBQVcsS0FBSyxtQkFBTCxDQUF5QixhQUFhLFFBQXRDLEVBQWdELENBQUMsZ0JBQUQsQ0FBaEQsQ0FBZjtBQUNBLGdCQUFJLG9CQUFvQixLQUFLLG1CQUFMLENBQXlCLFVBQVUsUUFBbkMsRUFBNkMsQ0FBQyw2QkFBRCxDQUE3QyxDQUF4Qjs7QUFFQSxvQkFBUSxTQUFTLFNBQWpCO0FBQ0kscUJBQUssYUFBTDtBQUNJLDZCQUFTLFNBQVQsR0FBcUIsV0FBckI7QUFDQSxzQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBeEI7O0FBRUEseUJBQUssU0FBTCxDQUFlLENBQWY7QUFDQTtBQUNKLHFCQUFLLFdBQUw7QUFDSSw2QkFBUyxTQUFULEdBQXFCLGFBQXJCO0FBQ0Esc0NBQWtCLEtBQWxCLENBQXdCLEtBQXhCLEdBQW1DLEtBQUssYUFBTCxHQUFxQixHQUF4RDs7QUFFQSx5QkFBSyxTQUFMLENBQWUsS0FBSyxhQUFwQjtBQUNBO0FBQ0o7QUFDSTtBQWRSO0FBZ0JIOzs7b0NBRVc7QUFBQSxnQkFDSCxpQkFERyxHQUM2QyxJQUQ3QyxDQUNILGlCQURHO0FBQUEsZ0JBQ2dCLFdBRGhCLEdBQzZDLElBRDdDLENBQ2dCLFdBRGhCO0FBQUEsZ0JBQzZCLFlBRDdCLEdBQzZDLElBRDdDLENBQzZCLFlBRDdCOztBQUVSLGdCQUFJLGdCQUFnQixDQUFDLFdBQUQsRUFBYyxZQUFkLENBQXBCO0FBQ0EsZ0JBQUksZ0JBQWdCLEtBQUssbUJBQUwsQ0FDaEIsa0JBQWtCLFFBREYsRUFFaEIsQ0FBQyxnQkFBRCxDQUZnQixDQUFwQjs7QUFLQSwwQkFBYyxTQUFkLEdBQTBCLFlBQTFCOztBQUVBLGlCQUFLLElBQUw7QUFDSDs7O21DQUVVO0FBQUEsZ0JBQ0YsaUJBREUsR0FDOEMsSUFEOUMsQ0FDRixpQkFERTtBQUFBLGdCQUNpQixXQURqQixHQUM4QyxJQUQ5QyxDQUNpQixXQURqQjtBQUFBLGdCQUM4QixZQUQ5QixHQUM4QyxJQUQ5QyxDQUM4QixZQUQ5Qjs7QUFFUCxnQkFBSSxnQkFBZ0IsQ0FBQyxXQUFELEVBQWMsWUFBZCxDQUFwQjtBQUNBLGdCQUFJLGdCQUFnQixLQUFLLG1CQUFMLENBQ2hCLGtCQUFrQixRQURGLEVBRWhCLENBQUMsZ0JBQUQsQ0FGZ0IsQ0FBcEI7O0FBS0EsMEJBQWMsU0FBZCxHQUEwQixXQUExQjs7QUFFQSxpQkFBSyxLQUFMO0FBQ0g7Ozs0QkExSzBCO0FBQ3ZCLG1CQUFPLFVBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLFlBQVA7QUFDSDs7OzRCQUlrQjtBQUNmLG1CQUFPLE9BQVA7QUFDSDs7OzRCQUVtQjtBQUNoQixtQkFBTyxXQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxZQUFQO0FBQ0g7Ozs0QkFFOEI7QUFDM0IsbUJBQU8sNkNBQVA7QUFDSDs7OzRCQUV5QjtBQUN0QixtQkFBTyw0Q0FBUDtBQUNIOzs7NEJBRXFCO0FBQ2xCLG1CQUFPLGFBQVA7QUFDSDs7OzRCQUU4QjtBQUMzQjtBQUNIOzs7NEJBRWtCO0FBQ2YseUZBQ3lELEtBQUssZUFEOUQsaUdBSU0sS0FBSyxhQUpYO0FBTUg7Ozs0QkFHa0M7QUFDL0IsbUJBQU8sYUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsMEZBQzBELEtBQUssZ0JBRC9ELHNFQUVvRCxLQUFLLDZCQUZ6RDtBQU1IOzs7NEJBc0J3QjtBQUFBLGdCQUNGLElBREUsR0FDNEIsSUFENUIsQ0FDaEIsV0FEZ0I7QUFBQSxnQkFDbUIsS0FEbkIsR0FDNEIsSUFENUIsQ0FDSSxZQURKO0FBQUEsZ0JBRVcsaUJBRlgsR0FFZ0MsSUFGaEMsQ0FFaEIsd0JBRmdCOztBQUdyQixrSkFFb0QsaUJBRnBELHdEQUdvQyxJQUhwQztBQU1IOzs7NEJBRWtCO0FBQ2Ysb0hBRWdELEtBQUssc0JBRnJELHVFQUc4QyxLQUFLLG9CQUhuRDtBQU1IOzs7NEJBeUVtQjtBQUFBLGdCQUNLLE1BREwsR0FDb0MsSUFEcEMsQ0FDWCxhQURXO0FBQUEsZ0JBQ2EsbUJBRGIsR0FDb0MsSUFEcEMsQ0FDYSxtQkFEYjs7QUFFaEIsb0pBRXVELG1CQUZ2RCx1REFHbUMsTUFIbkM7QUFPSDs7OzRCQUVVO0FBQUEsZ0JBQ0YsbUJBREUsR0FDaUYsSUFEakYsQ0FDRixtQkFERTtBQUFBLGdCQUNtQixZQURuQixHQUNpRixJQURqRixDQUNtQixZQURuQjtBQUFBLGdCQUNpQyxhQURqQyxHQUNpRixJQURqRixDQUNpQyxhQURqQztBQUFBLGdCQUNnRCxjQURoRCxHQUNpRixJQURqRixDQUNnRCxjQURoRDtBQUFBLGdCQUNnRSxhQURoRSxHQUNpRixJQURqRixDQUNnRSxhQURoRTs7O0FBR1Asa0NBQ0UsWUFERixrQkFFRSxtQkFGRixrQkFHRSxhQUhGLG9CQUlFLGNBSkY7QUFNSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZNTDs7OztJQUlhLGEsV0FBQSxhOztBQUVUOzs7Ozs7QUFNQSwyQkFBbUQ7QUFBQSxRQUF2QyxhQUF1Qyx1RUFBdkIsRUFBdUI7QUFBQSxRQUFuQixhQUFtQix1RUFBSCxFQUFHOztBQUFBOztBQUVoRDs7OztBQUlBLFNBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQTs7OztBQUlBLFNBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNGOztBQUdEOzs7Ozs7Ozs7Ozs7Ozs7d0JBV1U7QUFBQSxVQUNELGFBREMsR0FDK0IsSUFEL0IsQ0FDRCxhQURDO0FBQUEsVUFDYyxhQURkLEdBQytCLElBRC9CLENBQ2MsYUFEZDs7QUFFTixVQUFJLGdCQUFnQixjQUFjLE1BQWQsQ0FBc0IsVUFBQyxvQkFBRCxFQUF1QixVQUF2QixFQUFxQzs7QUFFM0UsWUFBRyxjQUFjLFVBQWQsQ0FBSCxFQUE2QjtBQUN6QixjQUFJLG1CQUFtQixjQUFjLFVBQWQsTUFBOEIsVUFBOUIsR0FDdkIsVUFEdUIsR0FFcEIsVUFGb0IsVUFFTCxjQUFjLFVBQWQsQ0FGSyxNQUF2Qjs7QUFJQSxpQkFBVSxvQkFBVixTQUFrQyxnQkFBbEM7QUFDSDtBQUNELGVBQU8sb0JBQVA7QUFDSCxPQVZtQixFQVVqQixFQVZpQixDQUFwQjtBQVdBLGFBQU8sYUFBUDtBQUNIOzs7Ozs7QUFDSjs7Ozs7Ozs7Ozs7QUN0REQ7Ozs7Ozs7Ozs7Ozs7OztxQ0FHaUI7QUFDVCxpQkFBSyxNQUFMLEdBQWMsQ0FBZDtBQUNBLGlCQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDs7OytCQUVNO0FBQ0gsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUExQztBQUNIOzs7Z0NBRU87QUFDSixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGlCQUFMLENBQXVCLEtBQTFDO0FBQ0g7OztvQ0FFVyxFLEVBQUk7QUFDWixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGlCQUFMLENBQXVCLFlBQTFDLEVBQXdELFVBQUMsUUFBRCxFQUFjO0FBQ2xFLG1CQUFHLFFBQUg7QUFDSCxhQUZEO0FBR0EsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixZQUExQztBQUNIOzs7a0NBRVMsTSxFQUFRO0FBQ2QsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixVQUExQyxFQUFzRCxNQUF0RDtBQUNIOzs7NkJBRUksTyxFQUFTO0FBQ1YsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUExQyxFQUFnRCxPQUFoRDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Qkw7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWEsUSxXQUFBLFE7OztBQUNULHdCQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBSyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsY0FBSyxpQkFBTCxHQUF5QiwyQkFBekI7QUFIVTtBQUliOzs7O2dDQUVPLFEsRUFBVTtBQUNkLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxpQkFBTCxDQUF1QixXQUEvQyxFQUE0RCxLQUFLLFVBQWpFO0FBQ0EscUJBQVMsY0FBVCxDQUF3QixLQUFLLGlCQUFMLENBQXVCLE9BQS9DLEVBQXdELEtBQUssWUFBN0Q7QUFDQSxxQkFBUyxjQUFULENBQXdCLEtBQUssaUJBQUwsQ0FBdUIsUUFBL0MsRUFBeUQsS0FBSyxlQUE5RDtBQUNIOzs7NENBRW1CLE8sRUFBUztBQUN6QixnQkFBSSxtQkFBbUIsRUFBRSxHQUFHLFFBQVEsVUFBYixFQUF5QixHQUFHLFFBQVEsU0FBcEMsRUFBdkI7O0FBRUEsZ0JBQUksUUFBUSxZQUFaLEVBQTBCO0FBQ3RCLG9CQUFJLGVBQWUsS0FBSyxtQkFBTCxDQUF5QixRQUFRLFlBQWpDLENBQW5COztBQUVBLGlDQUFpQixDQUFqQixJQUFzQixhQUFhLENBQW5DO0FBQ0EsaUNBQWlCLENBQWpCLElBQXNCLGFBQWEsQ0FBbkM7QUFDSDs7QUFFRCxtQkFBTyxnQkFBUDtBQUNIOzs7cUNBRVksSyxFQUFPO0FBQUEsZ0JBQ1gsU0FEVyxHQUMwRixJQUQxRixDQUNYLFNBRFc7QUFBQSxnQkFDQSxZQURBLEdBQzBGLElBRDFGLENBQ0EsWUFEQTtBQUFBLGdCQUNjLGFBRGQsR0FDMEYsSUFEMUYsQ0FDYyxhQURkO0FBQUEsZ0JBQzZCLDZCQUQ3QixHQUMwRixJQUQxRixDQUM2Qiw2QkFEN0I7QUFBQSxnQkFDNEQsYUFENUQsR0FDMEYsSUFEMUYsQ0FDNEQsYUFENUQ7QUFBQSxnQkFDMkUsV0FEM0UsR0FDMEYsSUFEMUYsQ0FDMkUsV0FEM0U7QUFBQSxnQkFFRSxLQUZGLEdBRVksU0FGWixDQUVYLFdBRlc7O0FBR2hCLGdCQUFJLG9CQUFvQixLQUFLLG1CQUFMLENBQXlCLFVBQVUsUUFBbkMsRUFBNkMsQ0FBQyw2QkFBRCxDQUE3QyxDQUF4QjtBQUNBLGdCQUFJLG1CQUFtQixLQUFLLG1CQUFMLENBQXlCLFNBQXpCLENBQXZCO0FBSmdCLGdCQUtSLFNBTFEsR0FLSyxnQkFMTCxDQUtYLENBTFc7QUFBQSxnQkFNSCxDQU5HLEdBTUcsS0FOSCxDQU1WLEtBTlU7O0FBT2hCLGdCQUFJLFFBQVMsSUFBSyxTQUFsQjtBQUNBLGdCQUFJLGNBQWUsUUFBUSxLQUEzQjtBQUNBLGdCQUFJLHNCQUFzQixDQUFDLFdBQUQsRUFBYyxhQUFkLENBQTFCO0FBQ0EsZ0JBQUksV0FBVyxLQUFLLG1CQUFMLENBQXlCLGFBQWEsUUFBdEMsRUFBZ0QsbUJBQWhELENBQWY7O0FBRUEscUJBQVMsU0FBVCxHQUFxQixhQUFyQjtBQUNBLDhCQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFtQyxjQUFjLEdBQWpEOztBQUVBLGlCQUFLLGFBQUwsR0FBcUIsV0FBckI7QUFDQSxpQkFBSyxTQUFMLENBQWUsV0FBZjtBQUNIOzs7OEJBRUssSyxFQUFPO0FBQUEsZ0JBQ0osZUFESSxHQUNtRCxJQURuRCxDQUNKLGVBREk7QUFBQSxnQkFDYSxRQURiLEdBQ21ELElBRG5ELENBQ2EsUUFEYjtBQUFBLGdCQUN1Qix3QkFEdkIsR0FDbUQsSUFEbkQsQ0FDdUIsd0JBRHZCO0FBQUEsZ0JBRVMsS0FGVCxHQUVrQixRQUZsQixDQUVKLFdBRkk7O0FBR1QsZ0JBQUksbUJBQW1CLEtBQUssbUJBQUwsQ0FBeUIsUUFBekIsQ0FBdkI7QUFIUyxnQkFJRCxTQUpDLEdBSVksZ0JBSlosQ0FJSixDQUpJO0FBQUEsZ0JBS0ksQ0FMSixHQUtVLEtBTFYsQ0FLSCxLQUxHOztBQU1ULGdCQUFJLFFBQVMsSUFBSyxTQUFsQjtBQUNBLGdCQUFJLGNBQWMsS0FBSyxRQUFMLElBQWlCLFFBQVEsS0FBekIsQ0FBbEI7QUFDQSxnQkFBSSxvQkFBb0IsS0FBSyxxQkFBTCxDQUEyQixXQUEzQixDQUF4QjtBQUNBLGdCQUFJLG1CQUFtQixLQUFLLGVBQUwsQ0FBcUIsaUJBQXJCLENBQXZCO0FBQ0EsZ0JBQUksZ0JBQWdCLENBQUMsd0JBQUQsQ0FBcEI7QUFDQSxnQkFBSSxhQUFhLEtBQUssbUJBQUwsQ0FBeUIsU0FBUyxRQUFsQyxFQUE0QyxhQUE1QyxDQUFqQjs7QUFFQSw0QkFBZ0IsU0FBaEIsUUFBK0IsZ0JBQS9CO0FBQ0EsdUJBQVcsS0FBWCxDQUFpQixLQUFqQixHQUE2QixRQUFRLEtBQVQsR0FBa0IsR0FBOUM7O0FBRUEsaUJBQUssSUFBTCxDQUFVLFdBQVY7QUFDSDs7O3FDQUVZLEssRUFBTztBQUFBLGdCQUNYLGlCQURXLEdBQ3FDLElBRHJDLENBQ1gsaUJBRFc7QUFBQSxnQkFDUSxXQURSLEdBQ3FDLElBRHJDLENBQ1EsV0FEUjtBQUFBLGdCQUNxQixZQURyQixHQUNxQyxJQURyQyxDQUNxQixZQURyQjs7QUFFaEIsZ0JBQUksZ0JBQWdCLENBQUMsV0FBRCxFQUFjLFlBQWQsQ0FBcEI7QUFDQSxnQkFBSSxnQkFBZ0IsS0FBSyxtQkFBTCxDQUF5QixrQkFBa0IsUUFBM0MsRUFBcUQsYUFBckQsQ0FBcEI7O0FBRUEsb0JBQVEsY0FBYyxTQUF0QjtBQUNJLHFCQUFLLFdBQUw7QUFDSSxrQ0FBYyxTQUFkLEdBQTBCLFlBQTFCOztBQUVBLHlCQUFLLElBQUw7QUFDQTtBQUNKLHFCQUFLLFlBQUw7QUFDSSxrQ0FBYyxTQUFkLEdBQTBCLFdBQTFCOztBQUVBLHlCQUFLLEtBQUw7QUFDQTtBQUNKO0FBQ0k7QUFaUjtBQWNIOzs7Z0NBRU8sSyxFQUFPO0FBQUEsZ0JBQ04sWUFETSxHQUNnRixJQURoRixDQUNOLFlBRE07QUFBQSxnQkFDUSxXQURSLEdBQ2dGLElBRGhGLENBQ1EsV0FEUjtBQUFBLGdCQUNxQixhQURyQixHQUNnRixJQURoRixDQUNxQixhQURyQjtBQUFBLGdCQUNvQyxTQURwQyxHQUNnRixJQURoRixDQUNvQyxTQURwQztBQUFBLGdCQUMrQyw2QkFEL0MsR0FDZ0YsSUFEaEYsQ0FDK0MsNkJBRC9DOztBQUVYLGdCQUFJLHNCQUFzQixDQUFDLFdBQUQsRUFBYyxhQUFkLENBQTFCO0FBQ0EsZ0JBQUksV0FBVyxLQUFLLG1CQUFMLENBQXlCLGFBQWEsUUFBdEMsRUFBZ0QsbUJBQWhELENBQWY7QUFDQSxnQkFBSSxvQkFBb0IsS0FBSyxtQkFBTCxDQUF5QixVQUFVLFFBQW5DLEVBQTZDLENBQUMsNkJBQUQsQ0FBN0MsQ0FBeEI7O0FBRUEsb0JBQVEsU0FBUyxTQUFqQjtBQUNJLHFCQUFLLGFBQUw7QUFDSSw2QkFBUyxTQUFULEdBQXFCLFdBQXJCO0FBQ0Esc0NBQWtCLEtBQWxCLENBQXdCLEtBQXhCOztBQUVBLHlCQUFLLFNBQUwsQ0FBZSxDQUFmO0FBQ0E7QUFDSixxQkFBSyxXQUFMO0FBQ0ksNkJBQVMsU0FBVCxHQUFxQixhQUFyQjtBQUNBLHNDQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFtQyxLQUFLLGFBQUwsR0FBcUIsR0FBeEQ7O0FBRUEseUJBQUssU0FBTCxDQUFlLEtBQUssYUFBcEI7QUFDQTtBQUNKO0FBQ0k7QUFkUjtBQWdCSDs7O3NDQUVhLE0sRUFBUSxTLEVBQVc7QUFBQSxnQkFDeEIsU0FEd0IsR0FDb0IsSUFEcEIsQ0FDeEIsU0FEd0I7QUFBQSxnQkFDYiw2QkFEYSxHQUNvQixJQURwQixDQUNiLDZCQURhOztBQUU3QixnQkFBSSxPQUFPLElBQVg7QUFDQSxnQkFBSSxvQkFBb0IsS0FBSyxtQkFBTCxDQUF5QixVQUFVLFFBQW5DLEVBQTZDLENBQUMsNkJBQUQsQ0FBN0MsQ0FBeEI7O0FBRUEsOEJBQWtCLEtBQWxCLENBQXdCLEtBQXhCLEdBQW1DLEtBQUssYUFBTCxHQUFxQixHQUF4RDs7QUFFQSxpQkFBSyxTQUFMLENBQWUsS0FBSyxhQUFwQjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsVUFBQyxRQUFELEVBQWM7QUFBQSxvQkFDdEIsYUFEc0IsR0FDc0IsSUFEdEIsQ0FDdEIsYUFEc0I7QUFBQSxvQkFDUCxlQURPLEdBQ3NCLElBRHRCLENBQ1AsZUFETztBQUFBLG9CQUNVLFFBRFYsR0FDc0IsSUFEdEIsQ0FDVSxRQURWOztBQUUzQixvQkFBSSxxQkFBcUIsS0FBSyxxQkFBTCxDQUEyQixRQUEzQixDQUF6QjtBQUNBLG9CQUFJLG9CQUFvQixLQUFLLGVBQUwsQ0FBcUIsa0JBQXJCLENBQXhCOztBQUVBLHFCQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUEsb0JBQUksYUFBSixFQUFtQixjQUFjLFNBQWQsU0FBOEIsaUJBQTlCO0FBQ25CLG9CQUFJLGVBQUosRUFBcUIsZ0JBQWdCLFNBQWhCO0FBQ3JCLG9CQUFJLFFBQUosRUFBYyxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBckIsQ0FBMkIsS0FBM0I7QUFDakIsYUFWRDtBQVdIOzs7cUNBRVksTSxFQUFRO0FBQUEsZ0JBQ1osZUFEWSxHQUMyQyxJQUQzQyxDQUNaLGVBRFk7QUFBQSxnQkFDSyxRQURMLEdBQzJDLElBRDNDLENBQ0ssUUFETDtBQUFBLGdCQUNlLHdCQURmLEdBQzJDLElBRDNDLENBQ2Usd0JBRGY7QUFBQSxnQkFFQyxPQUZELEdBRVksTUFGWixDQUVaLFdBRlk7OztBQUlqQixzQkFBVSxVQUFVLEtBQUssUUFBZixHQUEwQixDQUExQixHQUE4QixPQUF4Qzs7QUFFQSxnQkFBSSxvQkFBb0IsS0FBSyxxQkFBTCxDQUEyQixPQUEzQixDQUF4QjtBQUNBLGdCQUFJLG1CQUFtQixLQUFLLGVBQUwsQ0FBcUIsaUJBQXJCLENBQXZCO0FBQ0EsZ0JBQUksYUFBYSxVQUFVLEtBQUssUUFBaEM7O0FBRUEsZ0JBQUksZUFBSixFQUFxQixnQkFBZ0IsU0FBaEIsUUFBK0IsZ0JBQS9COztBQUVyQixnQkFBSSxnQkFBZ0IsQ0FBQyx3QkFBRCxDQUFwQjs7QUFFQSxnQkFBSSxRQUFKLEVBQWM7QUFDVixvQkFBSSxvQkFBb0IsS0FBSyxtQkFBTCxDQUF5QixTQUFTLFFBQWxDLEVBQTRDLGFBQTVDLENBQXhCOztBQUVBLGtDQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFtQyxhQUFhLEdBQWhEO0FBQ0g7QUFDSjs7O29DQUVXO0FBQUEsZ0JBQ0gsaUJBREcsR0FDNkMsSUFEN0MsQ0FDSCxpQkFERztBQUFBLGdCQUNnQixXQURoQixHQUM2QyxJQUQ3QyxDQUNnQixXQURoQjtBQUFBLGdCQUM2QixZQUQ3QixHQUM2QyxJQUQ3QyxDQUM2QixZQUQ3Qjs7QUFFUixnQkFBSSxnQkFBZ0IsQ0FBQyxXQUFELEVBQWMsWUFBZCxDQUFwQjtBQUNBLGdCQUFJLGdCQUFnQixLQUFLLG1CQUFMLENBQ2hCLGtCQUFrQixRQURGLEVBRWhCLGFBRmdCLENBQXBCOztBQUtBLDBCQUFjLFNBQWQsR0FBMEIsWUFBMUI7O0FBRUEsaUJBQUssSUFBTDtBQUNIOzs7bUNBRVU7QUFBQSxnQkFDRixpQkFERSxHQUM4QyxJQUQ5QyxDQUNGLGlCQURFO0FBQUEsZ0JBQ2lCLFdBRGpCLEdBQzhDLElBRDlDLENBQ2lCLFdBRGpCO0FBQUEsZ0JBQzhCLFlBRDlCLEdBQzhDLElBRDlDLENBQzhCLFlBRDlCOztBQUVQLGdCQUFJLGdCQUFnQixDQUFDLFdBQUQsRUFBYyxZQUFkLENBQXBCO0FBQ0EsZ0JBQUksZ0JBQWdCLEtBQUssbUJBQUwsQ0FDaEIsa0JBQWtCLFFBREYsRUFFaEIsYUFGZ0IsQ0FBcEI7O0FBS0EsMEJBQWMsU0FBZCxHQUEwQixXQUExQjs7QUFFQSxpQkFBSyxLQUFMO0FBQ0g7OzswQ0FFaUIsUSxFQUFVO0FBQ3hCLGdCQUFJLE9BQU8sSUFBWDtBQUR3QixnQkFFbkIsUUFGbUIsR0FFcUMsSUFGckMsQ0FFbkIsUUFGbUI7QUFBQSxnQkFFVCxTQUZTLEdBRXFDLElBRnJDLENBRVQsU0FGUztBQUFBLGdCQUVFLGlCQUZGLEdBRXFDLElBRnJDLENBRUUsaUJBRkY7QUFBQSxnQkFFcUIsWUFGckIsR0FFcUMsSUFGckMsQ0FFcUIsWUFGckI7OztBQUl4QixpQkFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsaUJBQUssVUFBTCxHQUFrQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLFdBQW5DLEVBQWdELFVBQWhELENBQWxCO0FBQ0EsaUJBQUssV0FBTCxHQUFtQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLE1BQW5DLEVBQTJDLFdBQTNDLENBQW5CO0FBQ0EsaUJBQUssWUFBTCxHQUFvQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLE9BQW5DLEVBQTRDLFlBQTVDLENBQXBCO0FBQ0EsaUJBQUssZUFBTCxHQUF3QixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLFFBQW5DLEVBQTZDLGVBQTdDLENBQXhCO0FBQ0EsaUJBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUF2QixHQUFvQyxVQUF0RDs7QUFFQSxzQkFBVSxnQkFBVixDQUEyQixXQUEzQixFQUF3QyxVQUFDLEtBQUQsRUFBVztBQUMvQyxxQkFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0gsYUFGRDtBQUdBLHFCQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQUMsS0FBRCxFQUFXO0FBQzFDLHFCQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ0gsYUFGRDtBQUdBLDhCQUFrQixnQkFBbEIsQ0FBbUMsU0FBbkMsRUFBOEMsVUFBQyxLQUFELEVBQVc7QUFDckQscUJBQUssWUFBTCxDQUFrQixLQUFsQjtBQUNILGFBRkQ7QUFHQSx5QkFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxVQUFDLEtBQUQsRUFBVztBQUM5QyxxQkFBSyxPQUFMLENBQWEsS0FBYjtBQUNILGFBRkQ7O0FBS0EscUJBQVMsZUFBVCxDQUF5QixNQUF6QixFQUFpQyxVQUFqQyxFQUE2QztBQUN6QyxxQkFBSyxhQUFMLENBQW1CLE1BQW5CLEVBQTJCLFVBQTNCO0FBQ0g7O0FBRUQscUJBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QjtBQUN4QixxQkFBSyxZQUFMLENBQWtCLE1BQWxCO0FBQ0g7O0FBRUQscUJBQVMsV0FBVCxDQUFxQixNQUFyQixFQUE2QjtBQUN6QixxQkFBSyxRQUFMLENBQWMsTUFBZDtBQUNIOztBQUVELHFCQUFTLFlBQVQsR0FBd0I7QUFDcEIscUJBQUssU0FBTDtBQUNIO0FBQ0o7Ozs0Q0FFbUIsUSxFQUFVLE8sRUFBUztBQUNuQyxnQkFBSSxlQUFlLG9CQUFvQixLQUFwQixHQUNmLFFBRGUsR0FFZixNQUFNLElBQU4sQ0FBVyxRQUFYLENBRko7QUFHQSxnQkFBSSxvQkFBSjs7QUFFQSxvQkFBUSxPQUFSLENBQWdCLFVBQUMsU0FBRCxFQUFZLEtBQVosRUFBc0I7QUFDbEMsb0JBQUksQ0FBQyxTQUFMLEVBQWdCO0FBQ2hCLG9CQUFJLFdBQUosRUFBaUI7O0FBRWpCLDhCQUFjLGFBQWEsSUFBYixDQUFrQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ2hELDJCQUFPLFFBQVEsU0FBUixDQUFrQixPQUFsQixDQUEwQixTQUExQixLQUF3QyxDQUEvQztBQUNILGlCQUZhLENBQWQ7QUFHSCxhQVBEOztBQVNBLG1CQUFPLFdBQVA7QUFDSDs7O3dDQUVlLFUsRUFBWTtBQUFBLGdCQUNuQixLQURtQixHQUM0QyxVQUQ1QyxDQUNuQixLQURtQjtBQUFBLGdCQUNNLE9BRE4sR0FDNEMsVUFENUMsQ0FDWixnQkFEWTtBQUFBLGdCQUNpQyxPQURqQyxHQUM0QyxVQUQ1QyxDQUNlLGdCQURmOztBQUV4QixnQkFBSSxhQUFhLEVBQWpCO0FBQ0EsZ0JBQUksZUFBZSxVQUFVLEVBQVYsU0FDWCxPQURXLFNBRVosT0FGWSxNQUFuQjtBQUdBLGdCQUFJLGVBQWUsVUFBVSxFQUFWLFNBQ1gsT0FEVyxRQUVaLE9BRlA7O0FBSUEsZ0JBQUksUUFBUSxDQUFaLEVBQWU7QUFDWCw2QkFBYSxRQUFRLEVBQVIsU0FDTCxLQURLLFNBRU4sS0FGTSxNQUFiO0FBR0g7O0FBRUQsd0JBQVUsVUFBVixHQUF1QixZQUF2QixHQUFzQyxZQUF0QztBQUNIOzs7OENBRXFCLE8sRUFBUztBQUMzQixnQkFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQVUsRUFBckIsQ0FBZDtBQUNBLGdCQUFJLGtCQUFrQjtBQUNsQix5QkFBUyxPQURTO0FBRWxCLHVCQUFPLEtBQUssS0FBTCxDQUFXLFVBQVUsRUFBckIsQ0FGVztBQUdsQixrQ0FBa0IsS0FBSyxLQUFMLENBQVcsVUFBVSxFQUFyQixDQUhBO0FBSWxCLGtDQUFrQixLQUFLLEtBQUwsQ0FBVyxVQUFVLEVBQXJCLENBSkE7QUFLbEIseUJBQVM7QUFMUyxhQUF0Qjs7QUFRQSxtQkFBTyxlQUFQO0FBQ0g7Ozs7OztBQUNKOzs7Ozs7Ozs7Ozs7OztBQzdRRyxzQkFBYTtBQUFBO0FBRVo7Ozs7NEJBRXlCO0FBQ3RCLG1CQUFPO0FBQ0gsd0JBQVMsZ0JBRE47QUFFSCx5QkFBVSxpQkFGUDtBQUdILHdCQUFTLGtCQUhOO0FBSUgsMkJBQVksbUJBSlQ7QUFLSCx5QkFBVSxpQkFMUDtBQU1ILDBCQUFXLGtCQU5SO0FBT0gsNkJBQWMscUJBUFg7QUFRSCw0QkFBYSwyQkFSVjtBQVNILCtCQUFnQix1QkFUYjtBQVVILDJCQUFZLG1CQVZUO0FBV0gsOEJBQWUsc0JBWFo7QUFZSCwyQkFBWSxtQkFaVDtBQWFILDBCQUFXO0FBYlIsYUFBUDtBQWVIOzs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7Ozs7O0FDdEJBLGlCQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFDaEIsT0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNBOzs7O3lCQUVNLEksRUFBTSxJLEVBQU0sTyxFQUFTO0FBQUEsT0FDdEIsR0FEc0IsR0FDZixJQURlLENBQ3RCLEdBRHNCO0FBQUEsT0FFaEIsS0FGZ0IsR0FFUCxHQUZPLENBRXRCLElBRnNCOzs7QUFJM0IsT0FBSSxDQUFDLElBQUwsRUFBVztBQUNWLFFBQUksV0FBVztBQUNkLGNBQWEsSUFBYixxQkFBaUMsT0FBakM7QUFEYyxLQUFmOztBQUlBLFFBQUcsS0FBSCxFQUFTO0FBQ1IsVUFBSyxHQUFMLENBQVMsS0FBVCxDQUFlLFFBQWYsRUFBeUIsUUFBekI7QUFDQSxXQUFNLElBQUksS0FBSixDQUFVLFNBQVMsT0FBbkIsQ0FBTjtBQUNBO0FBQ0Q7O0FBRUQsVUFBTyxJQUFQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3JCVyxhLFdBQUEsYTtBQUNULDZCQUFjO0FBQUE7QUFFYjs7OztvQ0FNVyxHLEVBQUs7QUFDYixtQkFBTyxRQUFRLFNBQVIsSUFBcUIsUUFBUSxJQUFwQztBQUNIOzs7aUNBRVEsRyxFQUFLO0FBQ1YsbUJBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixHQUFuQixNQUE0QixpQkFBbkM7QUFDSDs7O21DQUVVLEcsRUFBSTtBQUNYLG1CQUFPLE9BQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixHQUFuQixNQUE0QixtQkFBMUM7QUFDSDs7O2lDQUVRLEcsRUFBSztBQUNWLG1CQUFPLENBQUMsTUFBTSxHQUFOLENBQVI7QUFDSDs7O2tDQUVTLEcsRUFBSztBQUNYLG1CQUFPLE9BQU8sR0FBUCxLQUFlLFNBQWYsSUFBNkIsUUFBTyxHQUFQLHlDQUFPLEdBQVAsT0FBZSxRQUFmLElBQTJCLE9BQU8sSUFBSSxPQUFKLEVBQVAsS0FBeUIsU0FBeEY7QUFDSDs7O2dDQUVPLEcsRUFBSztBQUNULGdCQUFJLGlCQUFpQixPQUFPLFNBQVAsQ0FBaUIsY0FBdEM7QUFDQSxnQkFBSSxVQUFVLE1BQU0sT0FBTixDQUFjLEdBQWQsQ0FBZDtBQUNBLGdCQUFJLFdBQVcsT0FBTyxHQUFQLEtBQWUsUUFBOUI7QUFDQSxnQkFBSSxjQUFjLFdBQVcsUUFBN0I7O0FBRUEsZ0JBQUksZUFBZSxJQUFJLE1BQUosS0FBZSxDQUFsQyxFQUFxQyxPQUFPLElBQVA7QUFDckMsZ0JBQUksZUFBZSxJQUFJLE1BQUosR0FBYSxDQUFoQyxFQUFtQyxPQUFPLEtBQVA7QUFDbkMsZ0JBQUksQ0FBQyxNQUFNLEdBQU4sQ0FBTCxFQUFpQixPQUFPLEtBQVA7QUFDakIsZ0JBQUksUUFBUSxTQUFaLEVBQXVCLE9BQU8sSUFBUDtBQUN2QixnQkFBSSxRQUFRLElBQVosRUFBa0IsT0FBTyxJQUFQOztBQUVsQixpQkFBSyxJQUFJLEdBQVQsSUFBZ0IsR0FBaEIsRUFBcUI7QUFDakIsb0JBQUksZUFBZSxJQUFmLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLENBQUosRUFBbUMsT0FBTyxLQUFQO0FBQ3RDOztBQUVELG1CQUFPLElBQVA7QUFDSDs7OzRCQXpDYztBQUNYLG1CQUFPLE9BQU8sU0FBUCxDQUFpQixRQUF4QjtBQUNIOzs7Ozs7QUEwQ0wsSUFBSSxnQkFBZ0IsSUFBSSxhQUFKLEVBQXBCOztJQUVhLGEsV0FBQSxhO0FBQ1QsNkJBQWM7QUFBQTtBQUViOztBQUVEOzs7Ozs7Ozs7Z0NBS1EsTSxFQUFRLFEsRUFBVTtBQUN0QixnQkFBSSxDQUFDLE1BQUQsSUFBVyxXQUFXLEVBQTFCLEVBQThCLE9BQU8sRUFBUDs7QUFFOUIsZ0JBQUksT0FBTyxPQUFPLElBQVAsQ0FBWSxNQUFaLENBQVg7QUFDQSxnQkFBSSxVQUFVLEtBQUssTUFBTCxDQUFZLFVBQUMsWUFBRCxFQUFlLEdBQWYsRUFBdUI7QUFDN0Msb0JBQUksUUFBUSxDQUFDLEdBQUQsRUFBTSxPQUFPLEdBQVAsQ0FBTixDQUFaOztBQUVBLDZCQUFhLElBQWIsQ0FBa0IsS0FBbEI7O0FBRUEsdUJBQU8sWUFBUDtBQUNILGFBTmEsRUFNWCxFQU5XLENBQWQ7QUFPQSxnQkFBSSxZQUFZLElBQUksR0FBSixDQUFRLE9BQVIsQ0FBaEI7QUFDQSxnQkFBSSxjQUFjLEVBQWxCOztBQUVBLGdCQUFJLENBQUMsU0FBTCxFQUFnQixPQUFPLEVBQVA7O0FBRWhCLHNCQUFVLE9BQVYsQ0FBa0IsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUNsQyw0QkFBWSxJQUFaLENBQWlCLFNBQVMsR0FBVCxFQUFjLEdBQWQsQ0FBakI7QUFDSCxhQUZEOztBQUlBLG1CQUFPLFdBQVA7QUFDSDs7OzhCQUVLLEksRUFBTSxNLEVBQVEsTSxFQUFRO0FBQ3hCLGdCQUFJLGFBQWEsT0FBTyxJQUFQLENBQVksTUFBWixDQUFqQjtBQUNBLGdCQUFJLGdCQUFnQixJQUFJLE1BQUosQ0FBVyxJQUFYLENBQXBCOztBQUVBLHVCQUFXLE9BQVgsQ0FBbUIsVUFBQyxTQUFELEVBQVksS0FBWixFQUFzQjtBQUNyQyxvQkFBSSxVQUFVLE9BQU8sT0FBUCxDQUFlLFNBQWYsS0FBNkIsQ0FBM0MsRUFBOEM7QUFDOUMsOEJBQWMsU0FBZCxJQUEyQixPQUFPLFNBQVAsQ0FBM0I7QUFDSCxhQUhEOztBQUtBLG1CQUFPLGFBQVA7QUFDSDs7OytCQUVNLE0sRUFBUSxRLEVBQVUsWSxFQUFjO0FBQ25DLGdCQUFJLENBQUMsTUFBRCxJQUFXLFdBQVcsRUFBMUIsRUFBOEI7O0FBRTlCLGdCQUFJLE9BQU8sT0FBTyxJQUFQLENBQVksTUFBWixDQUFYO0FBQ0EsZ0JBQUksVUFBVSxLQUFLLE1BQUwsQ0FBWSxVQUFDLFlBQUQsRUFBZSxHQUFmLEVBQXVCO0FBQzdDLG9CQUFJLFFBQVEsQ0FBQyxHQUFELEVBQU0sT0FBTyxHQUFQLENBQU4sQ0FBWjtBQUNBLDZCQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDQSx1QkFBTyxZQUFQO0FBQ0gsYUFKYSxFQUlYLEVBSlcsQ0FBZDtBQUtBLGdCQUFJLFlBQVksSUFBSSxHQUFKLENBQVEsT0FBUixDQUFoQjs7QUFFQSxzQkFBVSxPQUFWLENBQWtCLFVBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0I7QUFDbEMsK0JBQWUsU0FBUyxZQUFULEVBQXVCLEdBQXZCLEVBQTRCLEdBQTVCLENBQWY7QUFDSCxhQUZEOztBQUlBLG1CQUFPLFlBQVA7QUFDSDs7QUFFRDs7Ozs7OztpQ0FJUyxVLEVBQVksSSxFQUFNO0FBQ3ZCLGdCQUFJLGNBQWM7QUFDZCx5QkFBUyxLQURLO0FBRWQsd0JBQVE7QUFGTSxhQUFsQjs7QUFLQSx1QkFBVyxPQUFYLENBQW1CLFVBQUMsT0FBRCxFQUFVLEtBQVYsRUFBb0I7QUFDbkMscUJBQUssT0FBTCxDQUFhLFVBQUMsR0FBRCxFQUFTO0FBQ2xCLHdCQUFJLGNBQWMsT0FBZCxDQUFzQixRQUFRLEdBQVIsQ0FBdEIsQ0FBSixFQUF5QztBQUNyQyxvQ0FBWSxPQUFaLEdBQXNCLElBQXRCO0FBQ0Esb0NBQVksTUFBWixDQUFtQixJQUFuQixDQUF3QjtBQUNwQixpQ0FBSyxHQURlO0FBRXBCLG1DQUFPLEtBRmE7QUFHcEIsbUNBQU8sUUFBUSxHQUFSO0FBSGEseUJBQXhCO0FBS0g7QUFDSixpQkFURDtBQVVILGFBWEQ7O0FBYUEsbUJBQU8sV0FBUDtBQUNIOzs7NEJBRUcsVSxFQUFZLE8sRUFBUzs7QUFFckIsZ0JBQUksTUFBTSxPQUFOLENBQWMsT0FBZCxDQUFKLEVBQTRCO0FBQ3hCLHVCQUFPLEtBQUssWUFBTCxDQUFrQixVQUFsQixFQUE4QixPQUE5QixDQUFQO0FBQ0g7O0FBRUQsZ0JBQUksUUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7QUFDN0IsdUJBQU8sS0FBSyxhQUFMLENBQW1CLFVBQW5CLEVBQStCLE9BQS9CLENBQVA7QUFDSDs7QUFFRCxtQkFBTyxXQUFXLE9BQVgsQ0FBbUIsT0FBbkIsS0FBK0IsQ0FBdEM7QUFDSDs7O3NDQUVhLFUsRUFBWSxPLEVBQVM7QUFDL0IsZ0JBQUksUUFBUSxLQUFaOztBQUVBLHVCQUFXLE9BQVgsQ0FBbUIsVUFBQyxZQUFELEVBQWUsS0FBZixFQUF5QjtBQUN4QyxvQkFBSSxRQUFPLFlBQVAseUNBQU8sWUFBUCxPQUF3QixRQUE1QixFQUFzQztBQUNsQyx3QkFBSSxtQkFBbUIsT0FBTyxJQUFQLENBQVksWUFBWixDQUF2QjtBQUNBLHFDQUFpQixPQUFqQixDQUF5QixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQ3JDLGdDQUFRLGFBQWEsR0FBYixNQUFzQixRQUFRLEdBQVIsQ0FBOUI7QUFDSCxxQkFGRDtBQUdIO0FBQ0osYUFQRDs7QUFTQSxtQkFBTyxLQUFQO0FBQ0g7OztxQ0FFWSxVLEVBQVksWSxFQUFjO0FBQ25DLGdCQUFJLFFBQVEsS0FBWjs7QUFFQSx1QkFBVyxPQUFYLENBQW1CLFVBQUMsWUFBRCxFQUFlLEtBQWYsRUFBeUI7O0FBR3hDLG9CQUFJLE1BQU0sT0FBTixDQUFjLFlBQWQsQ0FBSixFQUFpQzs7QUFFN0IsaUNBQWEsT0FBYixDQUFxQixVQUFDLFdBQUQsRUFBYyxLQUFkLEVBQXdCOztBQUV6QyxnQ0FBUSxnQkFBZ0IsYUFBYSxLQUFiLENBQXhCO0FBQ0gscUJBSEQ7QUFJSDtBQUVKLGFBWEQ7O0FBYUEsbUJBQU8sS0FBUDtBQUNIOzs7aUNBRVEsTSxFQUFRLEksRUFBTSxLLEVBQU87QUFDMUIsZ0JBQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQVI7QUFDQSxnQkFBSSxJQUFJLE1BQVI7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEVBQUUsTUFBRixHQUFXLENBQS9CLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ25DLG9CQUFJLElBQUksRUFBRSxDQUFGLENBQVI7QUFDQSxvQkFBSSxLQUFLLENBQVQsRUFBWTtBQUNSLHdCQUFJLEVBQUUsQ0FBRixDQUFKO0FBQ0gsaUJBRkQsTUFFTztBQUNILHNCQUFFLENBQUYsSUFBTyxFQUFQO0FBQ0Esd0JBQUksRUFBRSxDQUFGLENBQUo7QUFDSDtBQUNKO0FBQ0QsY0FBRSxFQUFFLEVBQUUsTUFBRixHQUFXLENBQWIsQ0FBRixJQUFxQixLQUFyQjtBQUNIOzs7eUNBRWdCLEksRUFBTSxNLEVBQVE7QUFDM0IsZ0JBQUksWUFBWSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWhCO0FBQ0EsZ0JBQUksVUFBVSxNQUFkO0FBQ0EsZ0JBQUksY0FBYyxFQUFsQjtBQUNBLGdCQUFJLG9CQUFKOztBQUVBLHNCQUFVLE9BQVYsQ0FBa0IsVUFBQyxRQUFELEVBQVcsS0FBWCxFQUFxQjtBQUNuQyxvQkFBSSxjQUFjLE9BQWQsQ0FBc0IsUUFBdEIsQ0FBSixFQUFxQztBQUNyQyw4QkFBYyxRQUFRLFFBQVIsQ0FBZDs7QUFFQSxvQkFBSSxjQUFjLE9BQWQsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUNwQyxrQ0FBYyxXQUFkO0FBQ0E7QUFDSDs7QUFFRCw4QkFBYyxXQUFkO0FBQ0EsMEJBQVUsV0FBVjtBQUNILGFBWEQ7O0FBYUEsbUJBQU8sV0FBUDtBQUNIOztBQUlEOzs7Ozs7Ozs7bUNBTXFDO0FBQUEsZ0JBQTVCLFVBQTRCLHVFQUFmLEVBQWU7QUFBQSxnQkFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2pDLGdCQUFJLFlBQVk7QUFDWiwwQkFBVSxJQURFO0FBRVosd0JBQVE7QUFGSSxhQUFoQjtBQUlBLGdCQUFJLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsZ0NBQWdCLEdBQWhCLElBQXVCLEVBQXZCO0FBQ0EsMkJBQVcsT0FBWCxDQUFtQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLHdCQUFJLFlBQVksS0FBSyxHQUFMLENBQVMsZ0JBQWdCLEdBQWhCLENBQVQsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBQWhCOztBQUVBLHdCQUFJLFNBQUosRUFBZTtBQUNYLGtDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0I7QUFDbEIsaUNBQUssR0FEYTtBQUVsQixtQ0FBTyxLQUZXO0FBR2xCLG1DQUFPLFFBQVEsR0FBUjtBQUhXLHlCQUF0QjtBQUtBLGtDQUFVLFFBQVYsR0FBcUIsS0FBckI7QUFDSCxxQkFQRCxNQU9PO0FBQ0gsd0NBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTBCLFFBQVEsR0FBUixDQUExQjtBQUNIO0FBQ0osaUJBYkQ7QUFjSCxhQWhCRDs7QUFrQkEsbUJBQU8sU0FBUDtBQUNIOzs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oY29uc3RydWN0b3IpIHtcclxuXHRsZXQgY29uc3RydWN0b3JGbiA9IGNvbnN0cnVjdG9yO1xyXG5cdGxldCBhcmdzID0gY29uc3RydWN0b3JGbi4kaW5qZWN0O1xyXG5cdGxldCBmYWN0b3J5RnVuY3Rpb24gPSAoLi4uYXJncykgPT4ge1xyXG4gICAgXHRyZXR1cm4gbmV3IGNvbnN0cnVjdG9yRm4oLi4uYXJncyk7XHJcblx0fVxyXG5cdFxyXG5cdGFyZ3MucHVzaChmYWN0b3J5RnVuY3Rpb24pO1xyXG5cclxuXHRyZXR1cm4gYXJncztcclxufSIsImltcG9ydCB7VHlwZVZhbGlkYXRvcn0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmxldCBteVR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dENvbnRyb2xsZXJIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dERhdGE6IGlucHV0fSA9ICRzY29wZTtcclxuICAgICAgICBsZXQgY3VycmVudEV4cGVyaWVuY2VWYWx1ZSA9IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtpbnB1dC5uYW1lXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXRWYWx1ZSA9IGN1cnJlbnRFeHBlcmllbmNlVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmKGN1cnJlbnRFeHBlcmllbmNlVmFsdWUpe1xyXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXRWYWx1ZSA9IGN1cnJlbnRFeHBlcmllbmNlVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS4kb24oJ2NoYW5nZWQnLCBmdW5jdGlvbihpbnB1dCwgdmFsdWUpe1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghbXlUeXBlVmFsaWRhdG9yLmlzRW1wdHkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAndHJ1ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB7bmFtZSwgb25DaGFuZ2UgPSBbXX0gPSBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZS51bnNoaWZ0KHsgXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnc2V0RGF0YScsIFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogbmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSBcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlWWGpzQWN0aW9ucy5yZXNvbHZlQWN0aW9ucyhvbkNoYW5nZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7T2JqZWN0UGFyc2Vyc30gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcblxyXG5sZXQgdGhpc09iamVjdFBhcnNlciA9IG5ldyBPYmplY3RQYXJzZXJzKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCwgZXJyb3JzLCBhdHRyaWJ1dGVzID0ge30pIHtcclxuICAgICAgICBsZXQge25hbWU6IGlucHV0TmFtZSwgdHlwZTogaW5wdXRUeXBlfSA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuaW5wdXROYW1lID0gaW5wdXROYW1lO1xyXG4gICAgICAgIHRoaXMuaW5wdXRUeXBlID0gaW5wdXRUeXBlO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRhZ3MoKSB7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFuZ3VsYXJFcnJvck1hcCA9IHRoaXMuYW5ndWxhckVycm9yTWFwO1xyXG4gICAgICAgIGxldCBub25Bbmd1bGFyID0gdGhpcy5ub25Bbmd1bGFyO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZSA9IHRoaXMubm9uVmFsaWRhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzT2JqZWN0UGFyc2VyLnJlZHVjZShhdHRyaWJ1dGVzLCAodGFncywgYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZUtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobm9uVmFsaWRhdGUuaW5kZXhPZihhdHRyaWJ1dGVLZXkpID49IDApIHJldHVybiB0YWdzO1xyXG4gICAgICAgICAgICBsZXQgdGFnID0gbm9uQW5ndWxhci5pbmRleE9mKGF0dHJpYnV0ZUtleSkgPj0gMCA/XHJcbiAgICAgICAgICAgICAgICBgJHthdHRyaWJ1dGVLZXl9PVwiJHthdHRyaWJ1dGVWYWx1ZX1cImAgOlxyXG4gICAgICAgICAgICAgICAgYG5nLSR7YW5ndWxhckVycm9yTWFwW2F0dHJpYnV0ZUtleV19ID0gXCIke2F0dHJpYnV0ZVZhbHVlfVwiIGA7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0YWdzfSAke3RhZ31gO1xyXG4gICAgICAgIH0sICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dE5hbWUsIGlucHV0VHlwZSwgZXJyb3JzLCBhdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFuZ3VsYXJFcnJvck1hcCA9IHRoaXMuYW5ndWxhckVycm9yTWFwO1xyXG4gICAgICAgIGxldCBkZWZhdWx0TWVzc2FnZXMgPSB0aGlzLmRlZmF1bHRFcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChhdHRyaWJ1dGVLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXJyb3JzICYmIGVycm9yc1thdHRyaWJ1dGVLZXldID8gZXJyb3JzW2F0dHJpYnV0ZUtleV0gOiBkZWZhdWx0TWVzc2FnZXNbYXR0cmlidXRlS2V5XTtcclxuICAgICAgICAgICAgbGV0IGF0dHJIVE1MID0gYG5nLXNob3c9XCIoJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRkaXJ0eSB8fCAkcGFyZW50LmZvcm1JbnB1dC4kc3VibWl0dGVkKSAmJiAkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGVycm9yLiR7YW5ndWxhckVycm9yTWFwW2F0dHJpYnV0ZUtleV19XCJgO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogYXR0ckhUTUxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbnB1dFR5cGUgJiYgaW5wdXRUeXBlICE9PSAndGV4dCcgJiYgaW5wdXRUeXBlICE9IFwib3B0aW9uc1wiKSB7XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZXMucHVzaCh0aGlzLmlucHV0VHlwZUVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dFR5cGVFcnJvcigpIHtcclxuICAgICAgICBsZXQge2lucHV0TmFtZSwgaW5wdXRUeXBlLCBlcnJvcnN9ID0gdGhpcztcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gZXJyb3JzW2lucHV0VHlwZV07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSA/IGVycm9yTWVzc2FnZSA6IFwiSW52YWxpZCBcIiArIGlucHV0VHlwZSxcclxuICAgICAgICAgICAgYXR0ckhUTUw6IGBuZy1zaG93PVwiKCRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZGlydHkgfHwgJHBhcmVudC5mb3JtSW5wdXQuJHN1Ym1pdHRlZCkgJiYgJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRlcnJvci4ke2lucHV0VHlwZX1cImBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5vbkFuZ3VsYXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnbWluJywgJ21heCcsICdyZWFkb25seScsICdwbGFjZWhvbGRlcicsICdzdGVwJywgJ3JlYWRvbmx5J11cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbm9uVmFsaWRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnc3RlcCcsICdwbGFjZWhvbGRlcicsICdyZWFkb25seSddO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhbmd1bGFyRXJyb3JNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlubGVuZ3RoOiAnbWlubGVuZ3RoJyxcclxuICAgICAgICAgICAgbWluOiBcIm1pblwiLFxyXG4gICAgICAgICAgICBtYXg6IFwibWF4XCIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICdtYXhsZW5ndGgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdEVycm9yTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlubGVuZ3RoOiAnVG9vIFNob3J0JyxcclxuICAgICAgICAgICAgbWluOiBcIlRvbyBMb3dcIixcclxuICAgICAgICAgICAgbWF4OiBcIlRvbyBIaWdoXCIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiAnUmVxdWlyZWQnLFxyXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICdUb28gTG9uZydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEZpcmViYXNlIGZyb20gXCIuL2ZpcmViYXNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIEZpcmViYXNle1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5BVVRIRU5USUNBVElPTiA9IFwiYXV0aFwiXG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBSRVFVRVNUX1BBU1NXT1JEIDogXCJyZXF1ZXN0LXBhc3N3b3JkXCIsXG4gICAgICAgICAgICBHRVRfUEFTU1dPUkQgOiBcImdldC1wYXNzd29yZFwiLFxuICAgICAgICAgICAgQUNDT1VOVF9FWElTVFMgOiBcImFjY291bnQtZXhpc3RzLXdpdGgtZGlmZmVyZW50LWNyZWRlbnRpYWxcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIEFVVEhFTlRJQ0FUSU9OfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0FVVEhFTlRJQ0FUSU9OfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuRklSRUJBU0UgPSBcImZpcmViYXNlXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgRklSRUJBU0V9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0ZJUkVCQVNFfWA7ICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlkZW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFJFQURZX1BMQVlFUiA6IFwicmVhZHktcGxheWVyXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcblxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XG5cbmV4cG9ydCBjbGFzcyBBbmNob3Ige1xuICAgIGNvbnN0cnVjdG9yKGFuY2hvckluZm8pIHsgICBcbiAgICAgICB0aGlzLmFuY2hvckluZm8gPSBhbmNob3JJbmZvO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuY2hvckNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHthbmNob3JDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aHJlZiA9ICcnLCBjbGFzc2VzID0gJycsIGF0dHJpYnV0ZXMgPSB7fSwgbGFiZWwgPSBsYWJlbEhUTUwsIGxhYmVsSFRNTCwgaWQ9Jyd9ID0gdGhpcy5hbmNob3JJbmZvOyBcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhhdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICBpZighbGFiZWxIVE1MICYmICFsYWJlbCl7XG4gICAgICAgICAgICBsYWJlbCA9IGhyZWY7XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICA8YSBpZD0nJHtpZH0nIGNsYXNzPVwiJHtjbGFzc2VzfSAke2FuY2hvckNsYXNzZXN9XCIgIGhyZWY9XCIke2hyZWZ9XCIgJHthdHRyaWJ1dGVIVE1MfSA+JHtsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbH08L2E+ICAgICAgICAgICBcbiAgICAgICAgYFxuICAgIH1cbn1cbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIGNvbGxlY3Rpb24gb2YgYnV0dG9ucyBmb3Igb25lIGNsaWNrIHJlY29yZGluZyBvZiBcclxuICogYW4gaW5wdXQgdGhhdCBoYXMgbXVsdGlwbGUgb3B0aW9ucyBmb3IgZGF0YSByZWNvcmRpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUYWtlcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSBidXR0b25zLCBhIGNsYXNzIHRoYXQgcmVuZGVycyB0aGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyBhbmQgYSBjbGFzcyB0aGF0IHJlbmRlcnMgYXR0cmlidXRlcy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mbyAtIEluZm9ybWF0aW9uIHRvIGNyZWF0ZSB0aGlzIGJ1dHRvbiBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1dHRvbnNJbmZvLmJ1dHRvbnMgLSBlYWNoIGluZGl2aWR1YWwgYnV0dG9uIGRhdGEgYW5kIHNldHRpbmdzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvLnNldHRpbmdzIC0gc2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIFxyXG4gICAgICogQHBhcmFtIHtDbGFzc30gYnV0dG9uc0luZm8uZXJyb3JzIC0gYW4gZXJyb3IgY2xhc3MgdGhhdCB3YXMgY3JlYXRlZCBieSB0aGUgXHJcbiAgICAgKiByZW5kZXJpbmcgbGlicmFyeSBzbyB0aGUgZXJyb3JzIG9wZW4gYW5kIGRpc3BsYXkgYWxvbmdzaWRlIHRoZSBsaWJyYXJ5LiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucyA9IFtdLCBpbnB1dCwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnV0dG9ucyB0byBiZSByZW5kZXJlZFxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgaW4gdGhpcyBncm91cCBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXJyb3IgbWVzc2FnZSBjbGFzcyB0aGF0IHdpbGwgdGFrZSB0aGUgZXJyb3JzIGZyb20gXHJcbiAgICAgICAgICogdGhlIHJlbmRlcmluZyBsaWJyYXJ5IGFuZCBhZGRzIHRoZW0gdG8gdGhpcyBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhdHRyaWJ1dGUgdGFncyBodG1sIHRvIGJlIGFkZGVkIHRvIHRoaXMgYnV0dG9uIFxyXG4gICAgICAgICAqIGlucHV0cy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExldHMgdXNlcnMgYWRkIHRoZSBzYW1lIGNsYXNzZXMgdG8gYWxsIGJ1dHRvbnMganVzdCBpbiBcclxuICAgICAqIGNhc2UgYnV0dG9ucyBzaGFyZSBhIHNwZWNpZmljIGNsYXNzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBIVE1MIGZvciBldmVyeSBidXR0b25zIGRlZmluZWQgaW4gdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIFxyXG4gICAgICogYXR0YWNoZXMgdGhlIGVycm9yIG1lc3NhZ2VzIGF0dGFjaGVkIHRvIHRoaXMgaW5wdXQuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYnV0dG9uQ2xhc3NlcyA9ICdidXR0b24tY2xhc3MnO1xyXG4gICAgICogYnV0dG9ucyA9IFt7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiQnV0dG9uIDFcIixcclxuICAgICAqICAgIGF0dHJIVE1MIDogXCJkaXNhYmxlZFwiLFxyXG4gICAgICogICAgY2xhc3NlcyA6IFwiY2xhc3MtMVwiXHJcbiAgICAgKiB9LHtcclxuICAgICAqICAgIGxhYmVsIDogXCI8aDE+QnV0dG9uIDI8L2gxPlwiLFxyXG4gICAgICogICAgY2xhc3NlcyBcIiBjbGFzcy0yXCJcclxuICAgICAqIH1dO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBXaWxsIHJlbmRlcjpcclxuICAgICAqIFxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1jbGFzcyBjbGFzcy0xXCIgZGlzYWJsZWQ+QnV0dG9uIDE8L2J1dHRvbj5cclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24gY2xhc3MgY2xhc3MtMlwiPjxoMT5CdXR0b24gMjwvaDE+PC9idXR0b24+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzOiBlcnJvckNsYXNzID0ge30sIGJ1dHRvbnMgPSBbXSwgaW5wdXQgPSB7fSwgYnV0dG9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMgPSB7fSwgZXJyb3JzID0ge30sIG1lc3NhZ2VzID0ge30gfSA9IGVycm9yQ2xhc3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2Vycm9yc1trZXldfWAsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhidXR0b25FcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MID0gJycsIHNob3dMYWJlbCA9IGZhbHNlLCBpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgYnV0dG9uc0hUTUwgPSBidXR0b25zLnJlZHVjZSgoaHRtbCwgYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9IFwiXCIgfSA9IGJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfSBcclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gJHthdHRySFRNTH0gY2xhc3M9XCIke2NsYXNzZXN9ICR7YnV0dG9uQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmICgobGFiZWxIVE1MLmxlbmd0aCA+IDAgfHwgbGFiZWwubGVuZ3RoID4gMCkgJiYgc2hvd0xhYmVsKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbEhUTUx9PC9sYWJlbD5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgJHtsYWJlbEhUTUx9XHJcbiAgICAgICAgICAgICAke2J1dHRvbnNIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VzfSAgICAgICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y2VzIGh0bWwgdG8gYnVpbGQgYSBjaGVja2JveCBpbnB1dCBmb3IgdGhlICBcclxuICogdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSBjaGVja2JveCdzIHNldHRpbmdzIGZyb20gYSBzdGFuZGFyZCBpbnB1dCBkYXRhIFxyXG4gICAgICogb2JqZWN0IGFuZCBzZXRzIHRoZSB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHJlbmRlciBpZiB0aGUgY2hlY2tib3ggaXNuJ3QgdmFsaWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9iaiAtIGNvbnRhaW5zIGFsbCB0aGUgY29uZmlndXJhdGlvbnMgXHJcbiAgICAgKiB0byByZW5kZXIgdGhpcyBpbnB1dC5cclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGVycm9yTWVzc2FnZXMgLSBhIGNsYXNzIHRoYXQgd2lsbCByZW5kZXIgdGhlIFxyXG4gICAgICogc3BlY2lmaWMgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyBiYXNlZCBvbiB0aGlzIFVJJ3Mgc2V0dGluZ3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgdGFncyA9ICcnLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBjaGVja2JveCdzIGlucHV0IGNvbmZpZ3VyYXRpb24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFueSBjdXN0b20gdGFncyBwYXNzZWQgZG93biBmcm9tIHRoZSByZW5kZXJpbmcgbGlicmFyeS4gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyB3aG9sZSBpbnB1dCBpbmNsdWRpbmcgdGhlIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGNsYXNzIG9mIGVycm9ycyBjcmVhdGVkIGJ5IHRoZSByZW5kZXJpbmcgbGlicmFyeSB0byBcclxuICAgICAgICAgKiBoaWRlIGFuZCBzaG93IHZhcmlvdXMgZXJyb3JzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBVSSdzIHJlbmRlcmluZyBvZiB0aGlzIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlZmF1bHQgY2xhc3MgdG8gdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgVUkgc3BlY2lmaWMgYXR0cmlidXRlc1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlZCBmb3IgdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIHRvIGJlIHVzZWQgYW5kIHJlbmRlcmVkIHByb3Blcmx5LlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgc3RyaW5nIG9mIGFsbCBhdHRyaWJ1dGVzIHRvIGxvYWQgXHJcbiAgICAgKiB0aGlzIGlucHV0IGluY2x1ZGluZyBpdHMgaWQsIG5hbWUgYW5kIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGdldCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCJgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBmcm9tIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIFxyXG4gICAgICogYW5kIGNsYXNzZXMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdWlDbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBpbnB1dC5jbGFzc2VzID0gXCJjbGFzcy0yXCI7XHJcbiAgICAgKiByZXF1aXJlZEF0dHJpYnV0ZXMgPSBcImlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCdcIlxyXG4gICAgICogLy8gUmVuZGVycyBUbzpcclxuICAgICAqIDxsYWJlbCBjbGFzcz1cImNsYXNzLTEgY2xhc3MtMlwiPlxyXG4gICAgICogICAgIDxpbnB1dCBpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBodG1sIG9mIHRoZSBmdWxseSBjcmVhdGVkIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5nc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCIgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgIDxpbnB1dCAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIGFuZCByZW5kZXJzIGFsbCB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzLCBpbnB1dCwgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBsYWJlbCA9ICcnIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBtZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKG1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxDbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBsZXQgYWxsQXR0cmlidXRlcyA9IGAke3JlcXVpcmVkQXR0cmlidXRlc30gJHt1aUF0dHJpYnV0ZXN9ICR7dGFnc30gJHtlcnJvclRhZ3N9YFxyXG4gICAgICAgIGxldCBjaGVja2JveEhUTUwgPSB0aGlzLnJlbmRlckNoZWNrYm94Q29udGFpbmVyKGFsbENsYXNzZXMsIGFsbEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAke2NoZWNrYm94SFRNTH1cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZSBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGRhdGUgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGUgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZSBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBEYXRlLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5nczsgICAgICAgIFxyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRlXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRldGltZSBsb2NhbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgd2l0aCB0aW1lc3RhbXAgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgKiBtZXNzYWdlc1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJveFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGV0aW1lLWxvY2FsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICogXHJcbiAgICAqIEBleGFtcGxlIFxyXG4gICAgKiAvL0RhdGEgXHJcbiAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICogRGF0ZXRpbWVMb2NhbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICogLy8gUmVuZGVycyBcclxuICAgICogPGxhYmVsPlxyXG4gICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAqIDwvbGFiZWw+XHJcbiAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZW1haWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBlbWFpbHMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGVtYWlsIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZW1haWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhbiBlbWFpbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBFbWFpbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJlbWFpbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZm9ybSB3cmFwcGVyIGFyb3VuZCB0aGVzZSBpbnB1dHMgYW5kIGEgXHJcbiAqIHN1Ym1pdCBidXR0b24gdG8gc3VibWl0IHRoZSBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgdmFyaW91cyBkYXRhIHRvIHJlbmRlciB0aGlzIGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBpbnB1dEhUTUwgLSBBbGwgaW5wdXQgZGF0YSB0byBiZSBhZGRlZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxBdHRySFRNTCAtIEF0dHJpYnV0ZXMgdGhhdCBuZWVkIHRvIGJlIFxyXG4gICAgICogYWRkZWQgdG8gdGhlIGZvcm0gcHJpbWFyaWx5IHVzZWQgZm9yIHZhbGlkYXRpb24gYW5kIHN1Ym1pdCBmdW5jdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2V0dGluZ3MgLSBHbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZm9ybS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBzdHlsZSA9IFN0eWxlKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBpbnB1dCBodG1sIGluZm9ybWF0aW9uIGZvciB0aGlzIFxyXG4gICAgICAgICAqIGZvcm1cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXRIVE1MID0gaW5wdXRIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYW1lIGZvciB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRpdGlvbmFsIHRhZ3MgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbEF0dHJIVE1MID0gYWRkaXRpb25hbEF0dHJIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBlbnRpcmUgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgc3VibWl0IGJ1dHRvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3VibWl0ID0gc2V0dGluZ3Muc3VibWl0O1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgc3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBkZWZhdWx0IFVJIGNsYXNzZXMgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBmb3JtQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3JvdydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgdG8gcmVuZGVyIHRoZSBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBGb3JtLnNldHRpbmdzID0ge1xyXG4gICAgICogICAgIHN1Ym1pdCA6IHtcclxuICAgICAqICAgICAgICAgbGFiZWwgOiBcIk15IG5ldyBzdWJtaXQgbGFiZWxcIixcclxuICAgICAqICAgICAgICAgaW5wdXQgOiB7XHJcbiAgICAgKiAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1pbnB1dFwiXHJcbiAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgKiAgICAgICAgIGNvbnRhaW5lciA6IHtcclxuICAgICAqICAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1jb250YWluZXJcIlxyXG4gICAgICogICAgICAgICB9XHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfTtcclxuICAgICAqIFxyXG4gICAgICogLy9XaWxsIFJlbmRlciBcclxuICAgICAqIFxyXG4gICAgICogPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xIG15LXN1Ym1pdC1jb250YWluZXJcIj5cclxuICAgICAqICAgICA8YnV0dG9uIGNsYXNzPVwibXktc3VibWl0LWlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICogICAgICAgICAgTXkgbmV3IHN1Ym1pdCBsYWJlbCBcclxuICAgICAqICAgICA8L2J1dHRvbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgJHtzdWJtaXRDb250YWluZXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiJHtzdWJtaXRJbnB1dENsYXNzZXN9XCIgdHlwZT0nc3VibWl0JyAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgZWFjaCBpbnB1dCdzIGh0bWwgaW50byBhIGNvbnRhaW5lciBzbyB0aGV5IGNhbiBiZSBmb3JtYXR0ZWQgY29ycmVjdGx5XHJcbiAgICAgKiB1dGlsaXppbmcgdGhlIGl2eGpzLmNzcydzIGdyaWQgc3lzdGVtLlxyXG4gICAgICogQHR5cGV7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIGZvcm1DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fSwgY2xhc3NlczogY29uZmlnRm9ybUNsYXNzZXMgPSAnJywgaWQgOiBmb3JtSWQsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmICghc2V0dGluZ3MuaGlkZVN1Ym1pdCkge1xyXG4gICAgICAgICAgICBpbnB1dEhUTUwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc3VibWl0LFxyXG4gICAgICAgICAgICAgICAgaHRtbDogdGhpcy5zdWJtaXRCdXR0b25IVE1MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gdGhpcy5zdHlsZS5hZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCIke2Zvcm1JZH0tZm9ybVwiIGNsYXNzPVwiJHtmb3JtQ2xhc3Nlc30gJHtjb25maWdGb3JtQ2xhc3Nlc31cIiBub3ZhbGlkYXRlIG5hbWU9XCIke25hbWV9XCIgJHthZGRpdGlvbmFsQXR0ckhUTUx9PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR7Y29udGVudHN9XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEluZGljYXRlcyBlcnJvcnMgZm9yIGVhY2ggaW5wdXQgYmFzZWQgb24gdGhlIFxyXG4gKiBhdHRyaWJ1dGVzIGNyZWF0ZWQgZnJvbSB0aGUgdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzXHJcbiAqIGlWWGpzIHVzZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJpbmdzIGluIGFsbCB0aGUgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKiB0aGlzIGlucHV0IGNhbiBwcm9kdWNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBlcnJvck1lc3NhZ2VzIC0gbGlzdCBvZiBhbGwgcG9zc2libGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyB3aXRoIGF0dHJpYnV0ZXMgaW5kaWNhdGluZyB0aGUgbWVzc2FnZSBcclxuICAgICAqIGFuZCB0aGUgY29uZGl0aW9ucyBpbiB3aGljaCB0byBzaG93IHRoZW0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaXN0IG9mIGFsbCBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjbGFzc2VzIGZvciB0aGUgZXJyb3IgbWVzc2FnZSBkaXYuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGNsYXNzZXMgZm9yIHRoZSBjb250YWluZXIgb2YgYWxsIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciBhbGwgZXJyb3IgbWVzc2FnZXMgYW5kIHRoZSBjb250YWluZXIgd2l0aCBcclxuICAgICAqIHRoZW0uIFJlc3VsdHM6XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VzXCI+XHJcbiAgICAgKiAgICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5NRVNTQUdFPC9zcGFuPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yTWVzc2FnZXMsIG1lc3NhZ2VDbGFzc2VzLCBjb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZUhUTUwgPSBlcnJvck1lc3NhZ2VzLnJlZHVjZSgoZXJyb3JNZXNzYWdlSFRNTCwgZXJyb3JNZXNzYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlSFRNTH08c3BhbiBjbGFzcz1cIiR7bWVzc2FnZUNsYXNzZXN9XCIgJHtlcnJvck1lc3NhZ2UuYXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+YFxyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZUhUTUwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9JyR7Y29udGFpbmVyQ2xhc3Nlc30nPlxyXG4gICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VIVE1MfVxyXG4gICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG51bWJlciBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIG51bWJlcnMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTnVtYmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBudW1iZXIgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIE51bWJlci51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgKiAgICAgXCJzdGVwXCIgOiBcIjAuMVwiXHJcbiAgICAgKiB9XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBzdGVwPVwiMC4xXCIgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJudW1iZXJcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cIm51bWJlclwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIGRlZmF1bHREaXNwbGF5ID0gJycsIHNldHRpbmdzID0ge30sIHRhZ3MgPSAnJywgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgICAgICAgJHtkZWZhdWx0T3B0aW9uVGFnfVxyXG4gICAgICAgICAgICAgICAgICAke29wdGlvbnNIVE1MfVxyXG4gICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpb0lucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgcmFkaW9zID0gW10sIGVycm9ycyA9IHt9LCBzZXR0aW5ncyA9IHt9fSA9IHJhZGlvSW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaW9zID0gcmFkaW9zO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9Hcm91cChyYWRpb3NIVE1MKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlvc0hUTUw7XHJcbiAgICB9O1xyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMpIHtcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCIke3VpQ2xhc3Nlc31cIj5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L2xhYmVsPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCkge1xyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgJHthdHRySFRNTH0+XHJcbiAgICAgICAgICAgICR7bGFiZWx9YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcywgdGFnczogZXJyb3JUYWdzID0gXCJcIn0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IGlucHV0TGFiZWwsIGxhYmVsSFRNTDogaW5wdXRMYWJsZUhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGlucHV0TGFibGVIVE1MKSBpbnB1dExhYmVsID0gaW5wdXRMYWJsZUhUTUw7XHJcblxyXG4gICAgICAgIGxldCByYWRpb3NIVE1MID0gcmFkaW9zLnJlZHVjZSgoaHRtbCwgcmFkaW8pID0+IHtcclxuICAgICAgICAgICAgbGV0IHtsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9ICcnfSA9IHJhZGlvO1xyXG5cclxuICAgICAgICAgICAgYXR0ckhUTUwgPSBgJHthdHRySFRNTH0gJHtlcnJvclRhZ3N9YDtcclxuXHJcbiAgICAgICAgICAgIGxldCByYWRpb0hUTUwgPSBzZWxmLnJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9XHJcbiAgICAgICAgICAgICR7c2VsZi51aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgYCR7dWlDbGFzc2VzfSAke2NsYXNzZXN9YCl9YDtcclxuICAgICAgICB9LCBpbnB1dExhYmVsKTtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxSYWRpb0J1dHRvbnNIVE1MID0gYFxyXG4gICAgICAgICAgICAgJHtyYWRpb3NIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudWlSYWRpb0dyb3VwKGFsbFJhZGlvQnV0dG9uc0hUTUwpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIElucHV0U3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoZm9ybVNlY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmZvcm1TZWN0aW9uID0gZm9ybVNlY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRlZmF1bHRGb290ZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7Zm9ybVNlY3Rpb24sIGRhdGEsIGRlZmF1bHRGb290ZXJDbGFzc2VzLCBkZWZhdWx0SGVhZGVyQ2xhc3NlcywgZGVmYXVsdFNlY3Rpb25DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlczogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYDxoMT4ke2RhdGEubmFtZX08L2gxPmB9ID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc2VjdGlvbkNsYXNzZXMgPSAnJyB9ID0gc2VjdGlvbjtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCIke3NlY3Rpb25DbGFzc2VzfSAke2RlZmF1bHRTZWN0aW9uQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cclxuICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke2RlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7Zm9ybVNlY3Rpb259XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfSAke2RlZmF1bHRGb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbikge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxpbmtTZWN0aW9uID0gbGlua1NlY3Rpb25cbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdEZvb3RlckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBodG1sKCkge1xuICAgICAgICBsZXQge2RhdGEsIGxpbmtTZWN0aW9uLCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcywgZGVmYXVsdEhlYWRlckNsYXNzZXMsIGRlZmF1bHRTZWN0aW9uQ2xhc3NlcywgZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge30sIGxpbmtDb250YWluZXIgPSB7fX0gPSBkYXRhO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzZWN0aW9uQ2xhc3NlcyA9ICcnfSA9IHNlY3Rpb247XG4gICAgICAgIGxldCB7Y2xhc3NlczogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGxpbmtDb250YWluZXJDbGFzc2VzID0gJycsIGF0dHJpYnV0ZXM6IGxpbmtDb250YWluZXJBdHRyaWJ1dGVzID0ge319ID0gbGlua0NvbnRhaW5lcjtcbiAgICAgICAgbGV0IGxpbmtDb250YWluZXJBdHRyaWJ1dGVIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MobGlua0NvbnRhaW5lckF0dHJpYnV0ZXMsIE9iamVjdC5rZXlzKGxpbmtDb250YWluZXJBdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCIke3NlY3Rpb25DbGFzc2VzfSAke2RlZmF1bHRTZWN0aW9uQ2xhc3Nlc31cIiBpZD1cIiR7ZGF0YS5pZH1cIj5cbiAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHtkZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JyR7ZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzfSAke2xpbmtDb250YWluZXJDbGFzc2VzfScgJHtsaW5rQ29udGFpbmVyQXR0cmlidXRlSFRNTH0+XG4gICAgICAgICAgICAgICAgICAgICR7bGlua1NlY3Rpb259XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc30gJHtkZWZhdWx0Rm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBnZXRXaWR0aCh3aWR0aCkge1xyXG4gICAgICAgIGlmICh3aWR0aCA9PT0gJzEnKSByZXR1cm4gJ2l2eGpzLWdyaWQtMS0xJztcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZ3JpZFN0cmluZyA9IHdpZHRoLnJlcGxhY2UoJy8nLCAnLScpO1xyXG5cclxuICAgICAgICByZXR1cm4gYGl2eGpzLWdyaWQtJHtncmlkU3RyaW5nfWA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjb250YWluZXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdpbnB1dC1jb250YWluZXInO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdpZHRoQ2xhc3NlcyhpbnB1dHNIVE1MKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29udGFpbmVyQ2xhc3NlcyA9ICcnfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gaW5wdXRzSFRNTC5yZWR1Y2UoKGN1cnJlbnRIVE1MLCBpbnB1dEhUTUwpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5ncyA9IHt9fSA9IGlucHV0SFRNTDtcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCA9ICcxJywgY29udGFpbmVyPXt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBsZXQge2NsYXNzZXM9Jyd9ID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7Y29udGFpbmVyQ2xhc3Nlc31gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhpc1dpZHRoID0gc2VsZi5nZXRXaWR0aCh3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKFwiaXZ4anMtZ3JpZC0xLTFcIiwgYCR7dGhpc1dpZHRofSAke2NsYXNzZXN9YCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7Y3VycmVudEhUTUx9ICR7aHRtbH1gO1xyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudHM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJ0ZXh0XCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsYWJlbCA9IHNob3dMYWJlbCA/IGxhYmVsIDogJyc7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgJHt1aUF0dHJpYnV0ZXN9ICAgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICA8L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVybCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSxzZXR0aW5ncyA9IHt9LHRhZ3MgPSB7fSxlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCl7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6aW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlcyA6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlcyA6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzIDogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9XCIgJHt1aUF0dHJpYnV0ZXN9ICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInVybFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbnRyb2xzfSBmcm9tICcuLi8uLi92aWRlby9jb250cm9scy9pbmRleC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY29udGFpbmVyLmh0bWwgaW5zdGFuY2VvZiBGdW5jdGlvbil7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKHRoaXMuaHRtbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMuaHRtbDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB0b3RhbFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgY3VycmVudFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgc2NydWJCYXJDbGFzc2VzLFxyXG4gICAgICAgICAgICBtdXRlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJDbGFzc2VzICAgICAgICAgICAgXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5wbGF5UGF1c2VDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiKTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXRvdGFsLXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluZm8gPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5zY3J1YkJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIpO1xyXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIpO1xyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdwbGF5LXBhdXNlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJyZW50VGltZUluZm9DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXRpbWUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdzY3J1Yi1iYXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnbXV0ZSdcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZS1iYXInXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5Q2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtcGxheSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBhdXNlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS11cCc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtdm9sdW1lLW9mZic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYHRpbWUtbGFwc2VkYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2N1cnJlbnQtdm9sdW1lJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlQYXVzZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3BsYXlDbGFzc2VzIDogcGxheX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHNDbGFzc2VzIDogcGxheVBhdXNlQ29udHJvbHN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIgY2xhc3M9XCIke3BsYXlQYXVzZUNvbnRyb2xzfVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz0nJHtwbGF5fSc+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPmBcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHRpbWVzdGFtcEhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIgY2xhc3M9XCIke3RoaXMuY3VycmVudFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIgY2xhc3M9XCIke3RoaXMudG90YWxUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7dW5tdXRlQ2xhc3NlcyA6IHVubXV0ZSwgbXV0ZUNvbnRyb2xzQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIgY2xhc3M9XCIke211dGVDb250cm9sc0NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7dW5tdXRlfVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgIGlkPVwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiIGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0aGlzLnZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHNjcnViQmFySFRNTCxcclxuICAgICAgICAgICAgdGltZXN0YW1wSFRNTCxcclxuICAgICAgICAgICAgbXV0ZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHZvbHVtZUJhckhUTUxcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICR7cGxheVBhdXNlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAgICAke3RpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgICAgJHttdXRlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3ZvbHVtZUJhckhUTUx9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFuY2hvciBhcyBEZWZhdWx0QW5jaG9yIH0gZnJvbSAnLi4vZGVmYXVsdC9hbmNob3IuanMnO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRGVmYXVsdEFuY2hvcntcblx0Y29uc3RydWN0b3IoYW5jaG9ySW5mbyl7XG5cdFx0c3VwZXIoYW5jaG9ySW5mbyk7XG5cdH1cbn0iLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcbmltcG9ydCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb25zdGFudHMvZmlyZWJhc2UuYXV0aGVudGljYXRpb24uanNcIjtcbmltcG9ydCB7IElucHV0Q29udHJvbGxlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2lucHV0LWNvbnRyb2xsZXIuanMnO1xuXG5sZXQgRmlyZWJhc2VBdXRoZW50aWNhdGlvbkNvbnN0YW50cyA9IG5ldyBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uKCk7XG5cbmNsYXNzIEZpbGVJbnB1dENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xuICAgICAgIFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICB9XG5cbiAgIFxufVxuXG5GaWxlSW5wdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdpVlhqcycsICdpdnhqcy5hY3Rpb25zJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihGaWxlSW5wdXRDb250cm9sbGVyKSIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xuaW1wb3J0IEZpcmViYXNlQXV0aGVudGljYXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50cy9maXJlYmFzZS5hdXRoZW50aWNhdGlvbi5qc1wiO1xuaW1wb3J0IHsgSW5wdXRDb250cm9sbGVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyc7XG5cbmxldCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uQ29uc3RhbnRzID0gbmV3IEZpcmViYXNlQXV0aGVudGljYXRpb24oKTtcbmNsYXNzIFBhc3N3b3JkSW5wdXRDb250cm9sbGVyIGV4dGVuZHMgSW5wdXRDb250cm9sbGVySGVscGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGlWWGpzLCBpVlhqc0FjdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2V0UGFzc3dvcmQgPSAoaW5wdXRWYWx1ZSkgPT57XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaVZYanMuQnVzLm9uY2UoRmlyZWJhc2VBdXRoZW50aWNhdGlvbkNvbnN0YW50cy5SRVFVRVNUX1BBU1NXT1JELCAoKSA9PntcbiAgICAgICAgICAgIGlWWGpzLkJ1cy5lbWl0KEZpcmViYXNlQXV0aGVudGljYXRpb25Db25zdGFudHMuR0VUX1BBU1NXT1JELCBzZWxmLnBhc3N3b3JkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5QYXNzd29yZElucHV0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnaVZYanMnLCAnaXZ4anMuYWN0aW9ucyddO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oUGFzc3dvcmRJbnB1dENvbnRyb2xsZXIpIiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XG5pbXBvcnQgRmlsZUlucHV0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9pbnB1dC5maWxlLmpzJztcblxuY2xhc3MgRmlsZUlucHV0IHtcbiAgICBjb25zdHJ1Y3RvcigkY29tcGlsZSwgJGZpbHRlciwgJGh0dHAsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBpVlhqc0FjdGlvbnMsIHB1bGxJblRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlSFRNTDtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeaXZ4anNGb3JtSW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlucHV0RGF0YTogJz1pbnB1dERhdGEnXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRmlsZUlucHV0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndm0nO1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGxldCB7aW5wdXREYXRhOiBpbnB1dH0gPSAkc2NvcGU7XG4gICAgICAgICAgICBsZXQge2lkLCBuYW1lLCBlcnJvcnMgPSB7fSwgbGFiZWxIVE1MLCBsYWJlbCA9ICRmaWx0ZXIoJ3N0cmluZ1BhcnNlcnMnKSgnc3RhcnRDYXNlJywgaWQpLCBhdHRyaWJ1dGVzID0ge30sIHR5cGUsIHNldHRpbmdzID0ge319ID0gaW5wdXQ7XG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGBvbmNoYW5nZT1cImFuZ3VsYXIuZWxlbWVudCh0aGlzKS5zY29wZSgpLmZpbGVOYW1lQ2hhbmdlZCh0aGlzKVwiIG5nLW1vZGVsPVwiaW5wdXRWYWx1ZVwiYFxuXG4gICAgICAgICAgICBpbnB1dC5sYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xuICAgICAgICAgICAgaW5wdXQgPSBwdWxsSW5UZW1wbGF0ZS5jb252ZXJ0TGFiZWwoJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGlucHV0LCAkc2NvcGUpO1xuXG4gICAgICAgICAgICBsZXQgdWlGaWxlT2JqID0ge1xuICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgdGFnczogdGFnSFRNTFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBmaWxlID0gbmV3IGlWWGpzVUlNb2R1bGUuZmlsZSh1aUZpbGVPYmopO1xuXG4gICAgICAgICAgICBpRWxtLmh0bWwoZmlsZS5odG1sKTtcblxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZmlsZU5hbWVDaGFuZ2VkID0gKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlWWGpzLmV4cGVyaWVuY2UudXBsb2FkRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXMgPSBlbC5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bU9mRmlsZXMgPSBmaWxlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZkZpbGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZVByb21pc2UgPSBpVlhqcy5leHBlcmllbmNlLnVwbG9hZEZpbGUoZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtmaWxlUHJvbWlzZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge29uQ2hhbmdlID0gW10sIG5hbWU6aW5wdXROYW1lfSA9IGlucHV0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudE5hbWVcIjogXCJzZXREYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyZ3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IGlucHV0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZpbGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIVE1MKCkge1xuICAgICAgICByZXR1cm4gYDxkaXY+PC9kaXY+YDtcbiAgICB9O1xufVxuXG5GaWxlSW5wdXQuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJGZpbHRlcicsICckaHR0cCcsICdpVlhqcycsICdpdnhqcy5tb2R1bGVzLnVpJywgJ2l2eGpzLmFjdGlvbnMnLCAncHVsbEluVGVtcGxhdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKEZpbGVJbnB1dCk7IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XG5pbXBvcnQgUGFzc3dvcmRJbnB1dENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvaW5wdXQucGFzc3dvcmQuanMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL21lc3NhZ2VzLmVycm9yLmpzJztcblxuY2xhc3MgUGFzc3dvcmRJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoJGNvbXBpbGUsICRmaWx0ZXIsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBwdWxsSW5UZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZUhUTUw7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXml2eGpzRm9ybUlucHV0XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpbnB1dERhdGE6ICc9aW5wdXREYXRhJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBhc3N3b3JkSW5wdXRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHtpbnB1dERhdGE6IGlucHV0fSA9ICRzY29wZTtcbiAgICAgICAgICAgIGxldCB7aWQsIG5hbWUsIGVycm9ycyA9IHt9LCBsYWJlbEhUTUwsIGxhYmVsID0gJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGF0dHJpYnV0ZXMgPSB7fSwgdHlwZSwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dDtcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMoaW5wdXQsIGVycm9ycywgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGBuZy1jaGFuZ2U9XCJ2bS5zZXRQYXNzd29yZChpbnB1dFZhbHVlKVwiIG5nLW1vZGVsPVwiaW5wdXRWYWx1ZVwiYFxuXG4gICAgICAgICAgICBpbnB1dC5sYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xuICAgICAgICAgICAgaW5wdXQgPSBwdWxsSW5UZW1wbGF0ZS5jb252ZXJ0TGFiZWwoJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGlucHV0LCAkc2NvcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdWlQYXNzd29yZE9iaiA9IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHNldHRpbmdzLFxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ0hUTUwsXG4gICAgICAgICAgICAgICAgZXJyb3JzOiBlcnJvck1lc3NhZ2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gbmV3IGlWWGpzVUlNb2R1bGUucGFzc3dvcmQodWlQYXNzd29yZE9iaik7XG5cbiAgICAgICAgICAgIGlFbG0uaHRtbChwYXNzd29yZC5odG1sKTtcblxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2PjwvZGl2PmA7XG4gICAgfTtcbn1cblxuUGFzc3dvcmRJbnB1dC4kaW5qZWN0ID0gWyckY29tcGlsZScsICckZmlsdGVyJywgJ2lWWGpzJywgJ2l2eGpzLm1vZHVsZXMudWknLCAncHVsbEluVGVtcGxhdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKFBhc3N3b3JkSW5wdXQpOyIsImltcG9ydCB7IEJ1dHRvbnMgYXMgRGVmYXVsdEJ1dHRvbnMgfSBmcm9tICcuLi9kZWZhdWx0L2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIGV4dGVuZHMgRGVmYXVsdEJ1dHRvbnMge1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucywgaW5wdXQpIHtcclxuICAgICAgICBzdXBlcihidXR0b25zLCBpbnB1dCwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBidXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuJztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDaGVja2JveCBhcyBEZWZhdWx0Q2hlY2tib3ggfSBmcm9tICcuLi9kZWZhdWx0L2NoZWNrYm94LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBEZWZhdWx0Q2hlY2tib3gge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2NoZWNrYm94IGZvcm0tY29udHJvbCdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbH0gPSBpbnB1dDtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyBsZWZ0OjA7IHotaW5kZXg6OTk5OTsgbWFyZ2luOjE3cHggMjZweDsgY3Vyc29yOnBvaW50ZXI7XCIgdHlwZT1cImNoZWNrYm94XCIgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aW5wdXQuaWR9XCI+ICR7bGFiZWx9PC9sYWJlbD4gICBcclxuICAgICAgICBgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRlIGFzIERlZmF1bHREYXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRlLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZSBleHRlbmRzIERlZmF1bHREYXRle1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkYXRlcGlja2VyJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYWJlbENsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2FjdGl2ZSc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRldGltZUxvY2FsIGFzIERlZmF1bHREYXRldGltZUxvY2FsIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwgZXh0ZW5kcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZGF0ZXBpY2tlcidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGFiZWxDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW1haWwgYXMgRGVmYXVsdEVtYWlsIH0gZnJvbSAnLi4vZGVmYXVsdC9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsIGV4dGVuZHMgRGVmYXVsdEVtYWlse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJcbmV4cG9ydCBjbGFzcyBGaWxle1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9fSA9IGlucHV0T2JqO1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgIH0gXG5cbiAgIFxuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAndmFsaWRhdGUnXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlcyA9XCJcIn0gPSB0aGlzO1xuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XG5cbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XG5cbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XG5cbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLWZpZWxkIGlucHV0LWZpZWxkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XG4gICAgICAgIDxzcGFuPkZpbGU8L3NwYW4+XG4gICAgICAgIDxpbnB1dCBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiB0eXBlPVwiZmlsZVwiICR7dGFnc30+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiID5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIGFzIERlZmF1bHRGb3JtIH0gZnJvbSAnLi4vZGVmYXVsdC9mb3JtLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgRGVmYXVsdEZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBTdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcm1DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY29sIHMxMidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcbn0iLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi9hbmNob3IuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtLmpzJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5qcyc7XHJcbmltcG9ydCB7IEJ1dHRvbnMgfSBmcm9tICcuL2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9ucy5qc1wiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBQYXNzd29yZCB9IGZyb20gJy4vcGFzc3dvcmQuanMnO1xyXG5pbXBvcnQgeyBGaWxlIH0gZnJvbSBcIi4vZmlsZS5qc1wiO1xyXG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gXCIuL3JhbmdlLmpzXCI7XHJcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnLi9yYWRpby5qcyc7XHJcbmltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGUuanNcIjtcclxuaW1wb3J0IHsgTnVtYmVyIH0gZnJvbSAnLi9udW1iZXIuanMnO1xyXG5pbXBvcnQgeyBFbWFpbCB9IGZyb20gJy4vZW1haWwuanMnO1xyXG5pbXBvcnQgeyBEYXRlIH0gZnJvbSAnLi9kYXRlLmpzJztcclxuaW1wb3J0IHsgVXJsIH0gZnJvbSAnLi91cmwuanMnO1xyXG5pbXBvcnQgeyBEYXRldGltZUxvY2FsIH0gZnJvbSAnLi9kYXRldGltZS1sb2NhbC5qcyc7XHJcblxyXG5pbXBvcnQgaXZ4anNQYXNzd29yZElucHV0IGZyb20gXCIuL2FuZ3VsYXIvZGlyZWN0aXZlcy9pbnB1dC5wYXNzd29yZC5qc1wiO1xyXG5pbXBvcnQgaXZ4anNGaWxlSW5wdXQgZnJvbSBcIi4vYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmZpbGUuanNcIjtcclxuXHJcblxyXG4vL1N0YXRlc1xyXG5pbXBvcnQgeyBJbnB1dFN0YXRlIH0gZnJvbSAnLi9zdGF0ZS5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IFZpZGVvU3RhdGUgfSBmcm9tICcuL3N0YXRlLnZpZGVvLmpzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblN0YXRlIH0gZnJvbSAnLi9zdGF0ZS5uYXZpZ2F0aW9uLmpzJztcclxuXHJcbi8vQ29udHJvbHMgXHJcbmltcG9ydCBWaWRlb0NvbnRyb2xzIGZyb20gJy4vdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsaXplVUkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hbmNob3IgPSBBbmNob3I7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gRm9ybTtcclxuICAgICAgICB0aGlzLnRleHQgPSBUZXh0O1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IEJ1dHRvbnM7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gRGF0ZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gUGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5maWxlID0gRmlsZVxyXG4gICAgICAgIHRoaXMuZGF0ZXRpbWVMb2NhbCA9IERhdGV0aW1lTG9jYWw7XHJcbiAgICAgICAgdGhpcy5jaGVja2JveCA9IENoZWNrYm94O1xyXG4gICAgICAgIHRoaXMudmlkZW9Db250cm9scyA9IFZpZGVvQ29udHJvbHM7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT3B0aW9ucztcclxuICAgICAgICB0aGlzLmVtYWlsID0gRW1haWw7XHJcbiAgICAgICAgdGhpcy51cmwgPSBVcmw7XHJcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IFRleHRhcmVhO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSBSYW5nZTtcclxuICAgICAgICB0aGlzLnJhZGlvID0gUmFkaW87XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMubnVtYmVyID0gTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBpbnB1dDogSW5wdXRTdGF0ZSxcclxuICAgICAgICAgICAgdmlkZW86IFZpZGVvU3RhdGUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IE5hdmlnYXRpb25TdGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFyID0ge1xyXG4gICAgICAgICAgICBpdnhqc1Bhc3N3b3JkSW5wdXQ6IGl2eGpzUGFzc3dvcmRJbnB1dCxcclxuICAgICAgICAgICAgaXZ4anNGaWxlSW5wdXQ6IGl2eGpzRmlsZUlucHV0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVJbnB1dCgpIHtcclxuICAgICAgICAkKCdzZWxlY3QnKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaW5pdGlhbGl6ZU1hdGVyaWFsaXplVUk7XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudWkubWF0ZXJpYWxpemUnLCBpbml0aWFsaXplTWF0ZXJpYWxpemVVSSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVNYXRlcmlhbGl6ZVVJKHNldHRpbmdzKSB7XHJcbiAgICByZXR1cm4gTWF0ZXJpYWxpemVVSTtcclxufTsiLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VzIGFzIERlZmF1bHRFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4uL2RlZmF1bHQvbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIGV4dGVuZHMgRGVmYXVsdEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JNZXNzYWdlcyA9IFtdKXsgICAgICAgXHJcbiAgICAgICBzdXBlcihlcnJvck1lc3NhZ2VzKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2hhcy1lcnJvcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtZXNzYWdlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnaGVscC1ibG9jayc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBOdW1iZXIgYXMgRGVmYXVsdE51bWJlciB9IGZyb20gJy4uL2RlZmF1bHQvbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgRGVmYXVsdE51bWJlcntcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgT3B0aW9ucyBhcyBEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4uL2RlZmF1bHQvb3B0aW9ucy5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnMgZXh0ZW5kcyBEZWZhdWx0T3B0aW9uc3tcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG5cclxuICAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgICAgJHtvcHRpb25zSFRNTH1cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gXHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHQgYXMgRGVmYXVsdFRleHQgfSBmcm9tICcuLi9kZWZhdWx0L3RleHQuanMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZCBleHRlbmRzIERlZmF1bHRUZXh0e1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxuICAgIH0gXG5cbiAgIFxuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAndmFsaWRhdGUnXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcblxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcblxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xuXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xuXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xuXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aW5wdXQgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJwYXNzd29yZFwiICAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxuICAgICAgICAgICBcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke25hbWV9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XG4gICAgICAgYDtcblxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XG4gICAgfVxufSIsImltcG9ydCB7IFJhZGlvIGFzIERlZmF1bHRSYWRpbyB9IGZyb20gJy4uL2RlZmF1bHQvcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIERlZmF1bHRSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFkaW8gZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG5cclxuICAgICB1aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgdWlDbGFzc2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICA8cD5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L3A+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIG5hbWUsIHZhbHVlKXsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8aW5wdXQgbmFtZT1cIiR7bmFtZX1cIlwiIHR5cGU9XCJyYWRpb1wiIGlkPVwiJHt2YWx1ZStuYW1lfVwiICR7YXR0ckhUTUx9PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHt2YWx1ZStuYW1lfVwiPiR7bGFiZWx9PC9sYWJlbD5cclxuICAgICAgICBgOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcnMsIHJhZGlvcywgc2V0dGluZ3MsIGlucHV0LCB1aUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzLCB0YWdzOiBlcnJvclRhZ3MgPSBcIlwifSA9IGVycm9ycztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogaW5wdXRMYWJlbCwgbGFiZWxIVE1MOiBpbnB1dExhYmxlSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bmFtZX0gPSBpbnB1dDtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0TGFibGVIVE1MKSBpbnB1dExhYmVsID0gaW5wdXRMYWJsZUhUTUw7XHJcblxyXG4gICAgICAgIGxldCByYWRpb3NIVE1MID0gcmFkaW9zLnJlZHVjZSgoaHRtbCwgcmFkaW8pID0+IHtcclxuICAgICAgICAgICAgbGV0IHtsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9ICcnLCB2YWx1ZX0gPSByYWRpbztcclxuXHJcbiAgICAgICAgICAgIGF0dHJIVE1MID0gYCR7YXR0ckhUTUx9ICR7ZXJyb3JUYWdzfWA7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmFkaW9IVE1MID0gc2VsZi5yZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCBuYW1lLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aHRtbH1cclxuICAgICAgICAgICAgJHtzZWxmLnVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCBgJHt1aUNsYXNzZXN9ICR7Y2xhc3Nlc31gKX1gO1xyXG4gICAgICAgIH0sIGlucHV0TGFiZWwpO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IGFsbFJhZGlvQnV0dG9uc0hUTUwgPSBgXHJcbiAgICAgICAgICAgICAke3JhZGlvc0hUTUx9XHJcbiAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy51aVJhZGlvR3JvdXAoYWxsUmFkaW9CdXR0b25zSFRNTCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XG5pbXBvcnQge0F0dHJpYnV0ZVRhZ3N9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBudW1iZXIgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBudW1iZXJzICBcbiAqIGZvciBpVlhqcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJhbmdlIHtcblxuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXG4gICAgICogbWVzc2FnZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIG51bWJlciBpbnB1dCBib3hcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dCBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAvKipcbiAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXRcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblxuICAgICAgICAvKipcbiAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgbnVtYmVyIGlucHV0XG4gICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcblxuICAgICAgICAvKipcbiAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxuICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcbiAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXG4gICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBudW1iZXIgaW5wdXRzIFxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZW1haWwgaW5wdXQgXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cbiAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgKi9cbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBudW1iZXIgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxuICAgICAqIGNvbnN0cnVjdG9yLiBcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZSBcbiAgICAgKiAvL0RhdGEgXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcbiAgICAgKiBOdW1iZXIudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XG4gICAgICogaW5wdXQuYXR0cmlidXRlcyA9IHtcbiAgICAgKiAgICAgXCJzdGVwXCIgOiBcIjAuMVwiXG4gICAgICogfVxuICAgICAqIC8vIFJlbmRlcnMgXG4gICAgICogPGxhYmVsPlxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cbiAgICAgKiA8L2xhYmVsPlxuICAgICAqIDxpbnB1dCBzdGVwPVwiMC4xXCIgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJudW1iZXJcIiByZXF1aXJlZD1cInRydWVcIj5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldCBodG1sKCkge1xuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xuICAgICAgICBsZXQge2xhYmVsID0gJycsIG5hbWUgPSAnJywgaWQgPSAnJywgbGFiZWxIVE1MfSA9IGlucHV0O1xuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XG5cbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XG4gICAgICAgIFxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xuXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xuXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xuICAgICAgICBcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICA8cCBjbGFzcz1cInJhbmdlLWZpZWxkXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJyYW5nZVwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cbiAgICAgICAgICAgPC9wPlxuICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtuYW1lfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XG4gICAgICAgYDtcblxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XG4gICAgfVxufSIsImltcG9ydCB7IElucHV0U3RhdGUgYXMgRGVmYXVsdElucHV0U3RhdGUgfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLmlucHV0LmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlIGV4dGVuZHMgRGVmYXVsdElucHV0U3RhdGUgeyBcclxuICAgIGNvbnN0cnVjdG9yKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSl7XHJcbiAgICAgICAgc3VwZXIoaGVhZGVyLCBmb3JtU2VjdGlvbiwgZm9vdGVyLCBkYXRhKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TmF2aWdhdGlvblN0YXRlIGFzIERlZmF1bHROYXZpZ2F0aW9uU3RhdGV9IGZyb20gJy4uL2RlZmF1bHQvc3RhdGUubmF2aWdhdGlvbi5qcyc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGUgZXh0ZW5kcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlIHsgICAgIFxuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxpbmtTZWN0aW9uKXtcbiAgICAgICAgc3VwZXIoZGF0YSwgbGlua1NlY3Rpb24pO1xuICAgIH1cbn07IiwiZXhwb3J0IGNsYXNzIFZpZGVvU3RhdGUgeyBcclxuICAgIGNvbnN0cnVjdG9yKHBsYXllclNlY3Rpb24sIGRhdGEpe1xyXG4gICAgICAgIHRoaXMucGxheWVyU2VjdGlvbiA9IHBsYXllclNlY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGlQaG9uZUlubGluZUNsYXNzZXMoKXtcclxuICAgICAgICBsZXQge2lzSXBob25lID0gZmFsc2V9ID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNJcGhvbmUgPyAnaXBob25lLWlubGluZScgOiAnJzsgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBoZWFkZXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgaHRtbCgpIHsgICBcclxuICAgICAgICBsZXQge3BsYXllclNlY3Rpb24sIGRhdGEsIGlQaG9uZUlubGluZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9fSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYDxoMT4ke2RhdGEubmFtZX08L2gxPmB9ID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IHNlY3Rpb25DbGFzc2VzID0gJycgfSA9IHNlY3Rpb247XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sIDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lciAke3NlY3Rpb25DbGFzc2VzfSAke2lQaG9uZUlubGluZUNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke3RoaXMuZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgJHtwbGF5ZXJTZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdpZHRoQ2xhc3NlcyhpbnB1dEhUTUwpIHtcclxuICAgICAgICBsZXQgY3VycmVudFdpZHRoVG90YWwgPSAwLjA7XHJcbiAgICAgICAgbGV0IGNvbHVtbk5hbWVzID0gW1wiY29sIHMxXCIsIFwiY29sIHMyXCIsIFwiY29sIHMzXCIsIFwiY29sIHM0XCIsIFwiY29sIHM1XCIsIFwiY29sIHM2XCIsIFwiY29sIHM3XCIsIFwiY29sIHM4XCIsIFwiY29sIHM5XCIgLFwiY29sIHMxMFwiLCBcImNvbCBzMTFcIiwgXCJjb2wgczEyXCJdXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gaW5wdXRIVE1MLnJlZHVjZSgoY29udGVudEhUTUwsIHRoaXNJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2h0bWwsIHNldHRpbmdzfSA9IHRoaXNJbnB1dDtcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCA9IFwiMVwiLCBjbGFzc2VzPSAnJ30gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IG51bWVyaWNXaWR0aCA9IGdldE51bWVyaWNXaWR0aCh3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08ZGl2IGNsYXNzPVwicm93XCI+IGBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgKz0gbnVtZXJpY1dpZHRoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGJvb3RzdHJhcFdpZHRoU3R5bGVOYW1lID0gY29sdW1uTmFtZXNbTWF0aC5yb3VuZChudW1lcmljV2lkdGggKiBjb2x1bW5OYW1lcy5sZW5ndGgpIC0gMV07XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJ2l2eGpzLWdyaWQtMS0xJywgYGlucHV0LWZpZWxkICR7Ym9vdHN0cmFwV2lkdGhTdHlsZU5hbWV9ICR7Y2xhc3Nlc31gKTtcclxuICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH0ke2h0bWx9YDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGhUb3RhbCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SFRNTCA9IGAke2NvbnRlbnRIVE1MfTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50V2lkdGhUb3RhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50SFRNTDtcclxuICAgICAgICB9LCAnJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY29udGVudHMuc3Vic3RyaW5nKGNvbnRlbnRzLmxlbmd0aCAtIDcpICE9PSBcIjwvZGl2PlwiKXtcclxuICAgICAgICAgICAgY29udGVudHMgPSBgJHtjb250ZW50c308L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE51bWVyaWNXaWR0aCh3aWR0aFN0cmluZyl7XHJcbiAgICAgICAgICAgIGlmKHdpZHRoU3RyaW5nID09PSAnMScpIHJldHVybiAxO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBhcnNlZFdpZHRoRm9ybXVsYSA9IHdpZHRoU3RyaW5nLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChwYXJzZWRXaWR0aEZvcm11bGFbMF0pIC8gcGFyc2VGbG9hdChwYXJzZWRXaWR0aEZvcm11bGFbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHQgYXMgRGVmYXVsdFRleHQgfSBmcm9tICcuLi9kZWZhdWx0L3RleHQuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgRGVmYXVsdFRleHR7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuXHJcbiAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3ZhbGlkYXRlJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPGlucHV0ICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidGV4dFwiICAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke25hbWV9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBUZXh0YXJlYSBhcyBEZWZhdWx0VGV4dGFyZWEgfSBmcm9tICcuLi9kZWZhdWx0L3RleHRhcmVhLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBEZWZhdWx0VGV4dGFyZWF7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnbWF0ZXJpYWxpemUtdGV4dGFyZWEnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBVcmwgYXMgRGVmYXVsdFVybCB9IGZyb20gJy4uL2RlZmF1bHQvdXJsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsIGV4dGVuZHMgRGVmYXVsdFVybHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERlZmF1bHRWaWRlb0NvbnRyb2xzIGZyb20gJy4uL2RlZmF1bHQvdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBEZWZhdWx0VmlkZW9Db250cm9scyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgc3VwZXIoY29udGFpbmVyLCBpVlhqc0J1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZHVyYXRpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3BsYXlfYXJyb3cnO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdwYXVzZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd2b2x1bWVfdXAnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZV9vZmYnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdidG4tZmxvYXRpbmcgd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGdyZWVuJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2J0bi1mbG9hdGluZyB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgZ3JleSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3JhbmdlLWZpZWxkJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYmFyYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhckhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiIGNsYXNzPVwicHJvZ3Jlc3MgJHt0aGlzLnNjcnViQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRlcm1pbmF0ZSBiYXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICR7dGhpcy50aW1lc3RhbXBIVE1MfVxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2RldGVybWluYXRlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiIGNsYXNzPVwicHJvZ3Jlc3MgJHt0aGlzLnZvbHVtZUJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhZGp1c3RWb2x1bWUoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3ZvbHVtZUJhciwgbXV0ZUNvbnRyb2xzLCBjdXJyZW50Vm9sdW1lLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3NlcywgdW5tdXRlQ2xhc3NlcywgbXV0ZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge29mZnNldFdpZHRoOiB3aWR0aCB9ID0gdm9sdW1lQmFyO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG4gICAgICAgIGxldCBhYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKHZvbHVtZUJhcik7XHJcbiAgICAgICAgbGV0IHt4OiBhYnNvbHV0ZVh9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHZvbHVtZUxldmVsID0gKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBbXCJtYXRlcmlhbC1pY29uc1wiXSk7XHJcblxyXG4gICAgICAgIG11dGVJY29uLmlubmVySFRNTCA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt2b2x1bWVMZXZlbCAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gdm9sdW1lTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lTGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5UGF1c2VCdXR0b25IVE1MKCl7XHJcbiAgICAgICAgbGV0IHtwbGF5Q2xhc3NlcyA6IHBsYXksIHBhdXNlQ2xhc3NlcyA6IHBhdXNlfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMgOiBwbGF5UGF1c2VDb250cm9sc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cInBsYXktYnV0dG9uLWNvbnRhaW5lclwiICBjbGFzcz1cImxlZnQtYWxpZ25cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIiBjbGFzcz1cIiR7cGxheVBhdXNlQ29udHJvbHN9XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz0nbWF0ZXJpYWwtaWNvbnMnPiR7cGxheX08L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGltZXN0YW1wSFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbnRlci1hbGlnblwiPlxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIgY2xhc3M9XCIke3RoaXMuY3VycmVudFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIgY2xhc3M9XCIke3RoaXMudG90YWxUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheVBhdXNlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLCBbXCJtYXRlcmlhbC1pY29uc1wiXSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAocGxheVBhdXNlSWNvbi5pbm5lckhUTUwpIHtcclxuICAgICAgICAgICAgY2FzZSBwbGF5Q2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uaW5uZXJIVE1MID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgcGF1c2VDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5pbm5lckhUTUwgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXV0ZShldmVudCkge1xyXG4gICAgICAgIGxldCB7bXV0ZUNvbnRyb2xzLCBtdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlcywgdm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBbXCJtYXRlcmlhbC1pY29uc1wiXSk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobXV0ZUljb24uaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgICAgIGNhc2UgdW5tdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmlubmVySFRNTCA9IG11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgMCVgO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uaW5uZXJIVE1MID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBsYXlpbmcoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBbXCJtYXRlcmlhbC1pY29uc1wiXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uaW5uZXJIVE1MID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhdXNlZCgpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIFtcIm1hdGVyaWFsLWljb25zXCJdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5pbm5lckhUTUwgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVCdXR0b25IVE1MKCl7XHJcbiAgICAgICAgbGV0IHt1bm11dGVDbGFzc2VzIDogdW5tdXRlLCBtdXRlQ29udHJvbHNDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwibXV0ZS1idXR0b24tY29udGFpbmVyXCIgY2xhc3M9XCJsZWZ0LWFsaWduXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIgY2xhc3M9XCIke211dGVDb250cm9sc0NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgIDxpIGNsYXNzPSdtYXRlcmlhbC1pY29ucyc+JHt1bm11dGV9PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VCdXR0b25IVE1MLCBzY3J1YkJhckhUTUwsIHRpbWVzdGFtcEhUTUwsIG11dGVCdXR0b25IVE1MLCB2b2x1bWVCYXJIVE1MfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgJHtwbGF5UGF1c2VCdXR0b25IVE1MfVxyXG4gICAgICAgICR7dm9sdW1lQmFySFRNTH0gIFxyXG4gICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9ICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3Qgd2l0aCBhdHRyaWJ1dGVzIGFuZCBrZXlzIGludG8gSFRNTFxyXG4gKiB0aGF0IGlucHV0cyBjYW4gYmUgdXNlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVUYWdzIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBQdWxscyBhbGwgdGhlIGF0dHJpYnV0ZSBzZXR0aW5ncyBhbmQgdGhlIGF0dHJpYnV0ZXMgXHJcbiAgICAgKiB0byBiZSByZW5kZXJlZC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVEYXRhIC0gc2V0dGluZ3MgZm9yIGFsbCB0aGUgYXR0cmlidXRlcy5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGF0dHJpYnV0ZUtleXMgLSBhdHRyaWJ1dGUgbmFtZXMgdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVEYXRhID0ge30sIGF0dHJpYnV0ZUtleXMgPSBbXSl7XHJcbiAgICAgICBcclxuICAgICAgIC8qKlxyXG4gICAgICAgICogQWxsIGF0dHJpYnV0ZXMgdG8gYmUgbWFkZS5cclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKi9cclxuICAgICAgIHRoaXMuYXR0cmlidXRlRGF0YSA9IGF0dHJpYnV0ZURhdGE7XHJcbiAgICAgICBcclxuICAgICAgIC8qKlxyXG4gICAgICAgICogQXR0cmlidXRlIG5hbWVzIHRvIGJlIHNldC5cclxuICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5hdHRyaWJ1dGVLZXlzID0gYXR0cmlidXRlS2V5cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgYXR0cmlidXRlcyBiYXNlZCBvbiB0aGUga2V5cyBhbmQgYXR0cmlidXRlIGRhdGEuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYXR0cmlidXRlRGF0YSA9IHsgcmVxdWlyZWQgPSBcInRydWVcIn07XHJcbiAgICAgKiBhdHRyaWJ1dGVLZXlzID0gW1wicmVxdWlyZWRcIl07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEJlY29tZXM6IFxyXG4gICAgICogaHRtbCA9ICdyZXF1aXJlZCA9IFwidHJ1ZVwiJ1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGxldCB7YXR0cmlidXRlS2V5cywgYXR0cmlidXRlRGF0YX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVIVE1MID0gYXR0cmlidXRlS2V5cy5yZWR1Y2UoIChjdXJyZW50QXR0cmlidXRlSFRNTCwgY3VycmVudEtleSkgPT57XHJcblxyXG4gICAgICAgICAgICBpZihhdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldKXtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVUYWdIVE1MID0gYXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XSA9PT0gJ3RhZy1vbmx5JyA/IFxyXG4gICAgICAgICAgICAgICAgY3VycmVudEtleSA6XHJcbiAgICAgICAgICAgICAgICBgJHtjdXJyZW50S2V5fT1cIiR7YXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XX1cImBcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y3VycmVudEF0dHJpYnV0ZUhUTUx9ICR7YXR0cmlidXRlVGFnSFRNTH0gYDtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBdHRyaWJ1dGVIVE1MO1xyXG4gICAgICAgIH0sICcnKTsgICBcclxuICAgICAgICByZXR1cm4gYXR0cmlidXRlSFRNTDtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgVmlkZW9TZXR0aW5ncyBmcm9tICcuLi9zZXR0aW5ncy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb250cnVjdG9yKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudHRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUEFVU0UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldER1cmF0aW9uKGNiKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5vbmNlKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VUX0RVUkFUSU9OLCAoZHVyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgY2IoZHVyYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkdFVF9EVVJBVElPTik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Vm9sdW1lKHZvbHVtZSkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFVF9WT0xVTUUsIHZvbHVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VlayhzZWNvbmRzKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VFSywgc2Vjb25kcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29udHJvbEV2ZW50cyBmcm9tICcuL2V2ZW50cy5qcyc7XHJcbmltcG9ydCBWaWRlb0V2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy92aWRlby5ldmVudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9scyBleHRlbmRzIENvbnRyb2xFdmVudHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5jb250cm9sRXZlbnROYW1lcyA9IG5ldyBWaWRlb0V2ZW50TmFtZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdGhpcy51cGRhdGVUaW1lKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHRoaXMud2hpbGVQbGF5aW5nKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkNBTl9QTEFZLCB0aGlzLmNhblBsYXlDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHJlbGF0aXZlUG9zaXRpb24gPSB7IHg6IGVsZW1lbnQub2Zmc2V0TGVmdCwgeTogZWxlbWVudC5vZmZzZXRUb3AgfTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudC5vZmZzZXRQYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgcmVsYXRpdmVQb3NpdGlvbi54ICs9IHRlbXBQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICByZWxhdGl2ZVBvc2l0aW9uLnkgKz0gdGVtcFBvc2l0aW9uLnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVsYXRpdmVQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBhZGp1c3RWb2x1bWUoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3ZvbHVtZUJhciwgbXV0ZUNvbnRyb2xzLCBjdXJyZW50Vm9sdW1lLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3NlcywgdW5tdXRlQ2xhc3NlcywgbXV0ZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge29mZnNldFdpZHRoOiB3aWR0aCB9ID0gdm9sdW1lQmFyO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG4gICAgICAgIGxldCBhYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKHZvbHVtZUJhcik7XHJcbiAgICAgICAgbGV0IHt4OiBhYnNvbHV0ZVh9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHZvbHVtZUxldmVsID0gKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3ZvbHVtZUxldmVsICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSB2b2x1bWVMZXZlbDtcclxuICAgICAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NydWIoZXZlbnQpIHtcclxuICAgICAgICBsZXQge2N1cnJlbnRUaW1lSW5mbywgc2NydWJCYXIsIHNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7b2Zmc2V0V2lkdGg6IHdpZHRofSA9IHNjcnViQmFyO1xyXG4gICAgICAgIGxldCBhYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKHNjcnViQmFyKTtcclxuICAgICAgICBsZXQge3g6IGFic29sdXRlWH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgc2NydWJUb1RpbWUgPSB0aGlzLmR1cmF0aW9uICogKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZU9iamVjdCA9IHRoaXMuY29udmVydFNlY29uZHNUb1BhcnRzKHNjcnViVG9UaW1lKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHRpbWVsYXBzZWQgPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoc2NydWJCYXIuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG4gICAgICAgIHRpbWVsYXBzZWQuc3R5bGUud2lkdGggPSBgJHsodHJ1ZVggLyB3aWR0aCkgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuc2VlayhzY3J1YlRvVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheVBhdXNlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2ggKHBsYXlQYXVzZUljb24uY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgcGxheUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHBhdXNlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE11dGUoZXZlbnQpIHtcclxuICAgICAgICBsZXQge211dGVDb250cm9scywgbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIHZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgbXV0ZUNvbnRyb2xzQ2xhc3Nlcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobXV0ZUljb24uY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgdW5tdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IG11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgMCVgO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5VG9QbGF5KHBsYXllciwgc3RhdGVEYXRhKSB7XHJcbiAgICAgICAgbGV0IHt2b2x1bWVCYXIsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7c2VsZi5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKHNlbGYuY3VycmVudFZvbHVtZSk7XHJcbiAgICAgICAgdGhpcy5nZXREdXJhdGlvbigoZHVyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgbGV0IHt0b3RhbFRpbWVJbmZvLCBjdXJyZW50VGltZUluZm8sIHNjcnViQmFyfSA9IHNlbGY7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvblRpbWVPYmplY3QgPSBzZWxmLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvblRpbWVTdGFtcCA9IHNlbGYuY3JlYXRlVGltZVN0YW1wKGR1cmF0aW9uVGltZU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmR1cmF0aW9uID0gZHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxUaW1lSW5mbykgdG90YWxUaW1lSW5mby5pbm5lckhUTUwgPSBgLyR7ZHVyYXRpb25UaW1lU3RhbXB9YDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lSW5mbykgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAwMDowMGA7XHJcbiAgICAgICAgICAgIGlmIChzY3J1YkJhcikgc2NydWJCYXIuY2hpbGRyZW5bMF0uc3R5bGUud2lkdGggPSBgMCVgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZVVwZGF0ZShwbGF5ZXIpIHtcclxuICAgICAgICBsZXQge2N1cnJlbnRUaW1lSW5mbywgc2NydWJCYXIsIHNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWU6IHNlY29uZHN9ID0gcGxheWVyO1xyXG5cclxuICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyA+IHRoaXMuZHVyYXRpb24gPyAwIDogc2Vjb25kcztcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lT2JqZWN0ID0gdGhpcy5jb252ZXJ0U2Vjb25kc1RvUGFydHMoc2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lU3RhbXAgPSB0aGlzLmNyZWF0ZVRpbWVTdGFtcChjdXJyZW50VGltZU9iamVjdCk7XHJcbiAgICAgICAgbGV0IHRpbWVMYXBzZWQgPSBzZWNvbmRzIC8gdGhpcy5kdXJhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lSW5mbykgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAke2N1cnJlbnRUaW1lU3RhbXB9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXNdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzY3J1YkJhcikge1xyXG4gICAgICAgICAgICBsZXQgdGltZWxhcHNlZEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoc2NydWJCYXIuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRpbWVsYXBzZWRFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7dGltZUxhcHNlZCAqIDEwMH0lYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5aW5nKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgc2VhcmNoQ2xhc3Nlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhdXNlZCgpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIHNlYXJjaENsYXNzZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBsYXlDbGFzc2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhpVlhqc0J1cykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge3NjcnViQmFyLCB2b2x1bWVCYXIsIHBsYXlQYXVzZUNvbnRyb2xzLCBtdXRlQ29udHJvbHN9ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cyA9IGlWWGpzQnVzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuVElNRV9VUERBVEUsIHVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIHRoaXMud2hpbGVQYXVzZWQgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBBVVNFRCwgd2hpbGVQYXVzZWQpO1xyXG4gICAgICAgIHRoaXMud2hpbGVQbGF5aW5nID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZSU5HLCB3aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIHRoaXMuY2FuUGxheUNhbGxiYWNrID0gIGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIGNhblBsYXlDYWxsQmFjayk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gdGhpcy51cGRhdGVUaW1lID8gdGhpcy51cGRhdGVUaW1lIDogdXBkYXRlVGltZTtcclxuICAgICAgICBcclxuICAgICAgICB2b2x1bWVCYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuYWRqdXN0Vm9sdW1lKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzY3J1YkJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNjcnViKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5UGF1c2VDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0UGxheVBhdXNlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtdXRlQ29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRNdXRlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBjYW5QbGF5Q2FsbEJhY2socGxheWVyLCBfc3RhdGVEYXRhKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25SZWFkeVRvUGxheShwbGF5ZXIsIF9zdGF0ZURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWUocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25UaW1lVXBkYXRlKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3aGlsZVBhdXNlZChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5vblBhdXNlZChwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hpbGVQbGF5aW5nKCkge1xyXG4gICAgICAgICAgICBzZWxmLm9uUGxheWluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtZW50QnlDbGFzc2VzKGVsZW1lbnRzLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRBcnJheSA9IGVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkgP1xyXG4gICAgICAgICAgICBlbGVtZW50cyA6XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZWxlbWVudHMpO1xyXG4gICAgICAgIGxldCB0aGlzRWxlbWVudDtcclxuXHJcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKChjbGFzc05hbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2xhc3NOYW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpc0VsZW1lbnQgPSBlbGVtZW50QXJyYXkuZmluZCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgPj0gMDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRpbWVTdGFtcCh0aW1lT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHtob3VycywgcmVtYWluaW5nTWludXRlczogbWludXRlcywgcmVtYWluaW5nU2Vjb25kczogc2Vjb25kc30gPSB0aW1lT2JqZWN0O1xyXG4gICAgICAgIGxldCBob3VyU3RyaW5nID0gJyc7XHJcbiAgICAgICAgbGV0IG1pbnV0ZVN0cmluZyA9IG1pbnV0ZXMgPCAxMCA/XHJcbiAgICAgICAgICAgIGAwJHttaW51dGVzfTpgIDpcclxuICAgICAgICAgICAgYCR7bWludXRlc306YDtcclxuICAgICAgICBsZXQgc2Vjb25kU3RyaW5nID0gc2Vjb25kcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke3NlY29uZHN9YCA6XHJcbiAgICAgICAgICAgIGAke3NlY29uZHN9YDtcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgICAgICBob3VyU3RyaW5nID0gaG91cnMgPCAxMCA/XHJcbiAgICAgICAgICAgICAgICBgMCR7aG91cnN9OmAgOlxyXG4gICAgICAgICAgICAgICAgYCR7aG91cnN9OmA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2hvdXJTdHJpbmd9JHttaW51dGVTdHJpbmd9JHtzZWNvbmRTdHJpbmd9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0U2Vjb25kc1RvUGFydHMoc2Vjb25kcykge1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGxldCB0aW1lSW5mb3JtYXRpb24gPSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXHJcbiAgICAgICAgICAgIGhvdXJzOiBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCksXHJcbiAgICAgICAgICAgIHJlbWFpbmluZ1NlY29uZHM6IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nTWludXRlczogTWF0aC5mbG9vcihtaW51dGVzICUgNjApLFxyXG4gICAgICAgICAgICBzZWNvbmRzOiBzZWNvbmRzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGltZUluZm9ybWF0aW9uO1xyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNze1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBQbGF5ZXJDb250cm9sRXZlbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwicGxheVwiIDogJ2lWWDp2aWRlbzpwbGF5JyxcclxuICAgICAgICAgICAgXCJwYXVzZVwiIDogJ2lWWDp2aWRlbzpwYXVzZScsXHJcbiAgICAgICAgICAgIFwic2Vla1wiIDogJ2lWWDp2aWRlbzpzZWVrZWQnLFxyXG4gICAgICAgICAgICBcInBsYXlpbmdcIiA6IFwiaVZYOnZpZGVvOnBsYXlpbmdcIixcclxuICAgICAgICAgICAgXCJlbmRlZFwiIDogXCJpVlg6dmlkZW86ZW5kZWRcIixcclxuICAgICAgICAgICAgXCJwYXVzZWRcIiA6IFwiaVZYOnZpZGVvOnBhdXNlZFwiLFxyXG4gICAgICAgICAgICBcInNldFZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnLFxyXG4gICAgICAgICAgICBcImR1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpyZXF1ZXN0RHVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJnZXREdXJhdGlvblwiIDogXCJpVlg6dmlkZW86Z2V0RHVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJjYW5QbGF5XCIgOiBcImlWWDp2aWRlbzpjYW5wbGF5XCIsXHJcbiAgICAgICAgICAgIFwidGltZVVwZGF0ZVwiIDogXCJpVlg6dmlkZW86dGltZXVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBcImRpc3Bvc2VcIiA6IFwiaVZYOnZpZGVvOmRpc3Bvc2VcIixcclxuICAgICAgICAgICAgXCJ2b2x1bWVcIiA6ICdpVlg6dmlkZW86c2V0Vm9sdW1lJyAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGxvZykge1xuXHRcdHRoaXMubG9nID0gbG9nXG5cdH1cblxuXHRhc3NlcnQodGVzdCwgbmFtZSwgbWVzc2FnZSkge1xuXHRcdGxldCB7bG9nfSA9IHRoaXM7XG5cdFx0bGV0IHtzaG93OiBkZWJ1Z30gPSBsb2c7XG5cblx0XHRpZiAoIXRlc3QpIHtcblx0XHRcdGxldCBlcnJvck9iaiA9IHsgXG5cdFx0XHRcdG1lc3NhZ2UgOiBgJHtuYW1lfSBpcyBpbnZhbGlkOiAke21lc3NhZ2V9LmBcblx0XHRcdH07XG5cblx0XHRcdGlmKGRlYnVnKXtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoZXJyb3JPYmosIFwiQVNTRVJUXCIpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3JPYmoubWVzc2FnZSk7XG5cdFx0XHR9IFxuXHRcdH1cblxuXHRcdHJldHVybiB0ZXN0O1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFR5cGVWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3RyaW5nKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGdW5jdGlvbihvYmope1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNOdW1iZXIob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQm9vbGVhbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8ICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnZhbHVlT2YoKSA9PT0gJ2Jvb2xlYW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KG9iaikge1xyXG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbiAgICAgICAgbGV0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG9iaik7XHJcbiAgICAgICAgbGV0IGlzU3RyaW5nID0gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XHJcbiAgICAgICAgbGV0IGNoZWNrTGVuZ3RoID0gaXNBcnJheSB8fCBpc1N0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNOYU4ob2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBhcnNlcnMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHlvdSB0byBtYXAgYW4gb2JqZWN0IGJ5IHRoZSBrZXlzIG9mIGEgZ2l2ZW4gb2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIG9iamVjdCB0byBtYXA7XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIHJ1biBieSBlYWNoIHZhbHVlIGFuZCBrZXkgIFxyXG4gICAgICovXHJcbiAgICBtYXBLZXlzKG9iamVjdCwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuICAgICAgICBsZXQgbWFwcGVkQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWR1Y2VNYXApIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIG1hcHBlZEFycmF5LnB1c2goY2FsbGJhY2sodmFsLCBrZXkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKGJhc2UsIG1lcmdlZCwgaWdub3JlKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEtleXMgPSBPYmplY3Qua2V5cyhtZXJnZWQpO1xyXG4gICAgICAgIGxldCB1bmlvbmVkT2JqZWN0ID0gbmV3IE9iamVjdChiYXNlKTtcclxuXHJcbiAgICAgICAgbWVyZ2VkS2V5cy5mb3JFYWNoKChtZXJnZWRLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpZ25vcmUgJiYgaWdub3JlLmluZGV4T2YobWVyZ2VkS2V5KSA+PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHVuaW9uZWRPYmplY3RbbWVyZ2VkS2V5XSA9IG1lcmdlZFttZXJnZWRLZXldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5pb25lZE9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZWR1Y2Uob2JqZWN0LCBjYWxsYmFjaywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gY2FsbGJhY2soZGVmYXVsdFZhbHVlLCB2YWwsIGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVyYXRlcyB0aHJvdWdoIGEgY29sbGVjdGlvbiB0byBmaW5kIGlmIGFueSBvZiB0aGUgdmFsdWVzIFxyXG4gICAgICogd2l0aCB0aGUga2V5cyBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgYW55RW1wdHkoY29sbGVjdGlvbiwga2V5cykge1xyXG4gICAgICAgIGxldCBoYXNFbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGVsZW1lbnRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5pc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5pbmRleE9mKGVsZW1lbnQpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrRWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0VsZW1lbnRLZXlzID0gT2JqZWN0LmtleXMoY2hlY2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudEtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gY2hlY2tFbGVtZW50W2tleV0gPT09IGVsZW1lbnRba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hlY2tFbGVtZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudC5mb3JFYWNoKCh0ZXN0RWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSB0ZXN0RWxlbWVudCA9PT0gYXJyYXlFbGVtZW50W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZShvYmplY3QsIHBhdGgsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGEgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIG8gPSBvYmplY3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbiA9IGFbaV07XHJcbiAgICAgICAgICAgIGlmIChuIGluIG8pIHtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb1tuXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb1thW2EubGVuZ3RoIC0gMV1dID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWVGcm9tUGF0aChwYXRoLCBvYmplY3QpIHtcclxuICAgICAgICBsZXQgcGF0aFBhcnRzID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBvYmplY3Q7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICBwYXRoUGFydHMuZm9yRWFjaCgocGF0aFBhcnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkocGF0aFBhcnQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gb2xkRGF0YVtwYXRoUGFydF07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGN1cnJlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgb2xkRGF0YSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpbiBhbiBhcnJheSBvZiBvYmplY3RzIHRvIHNlZSBpZiB0aGUgdmFsdWVzIFxyXG4gICAgICogYXQgdGhlIGtleXMgaXMgdW5pcXVlIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRpY2F0aW5nIFxyXG4gICAgICogaWYgdGhleSBhcmUgdW5pcXVlIGFuZCBhbnkgZXJyb3JzIHRoYXQgZG9uJ3QgbWF0Y2ggZm9yIFxyXG4gICAgICogY29ycmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgaXNVbmlxdWUoY29sbGVjdGlvbiA9IFtdLCBrZXlzID0gW10pIHtcclxuICAgICAgICBsZXQgaGFzVW5pcXVlID0ge1xyXG4gICAgICAgICAgICBpc1VuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFsbFVuaXF1ZVZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0gPSBbXTtcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdFVuaXF1ZSA9IHNlbGYuaGFzKGFsbFVuaXF1ZVZhbHVlc1trZXldLCBlbGVtZW50W2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3RVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmlzVW5pcXVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldLnB1c2goZWxlbWVudFtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc1VuaXF1ZTtcclxuICAgIH1cclxufTsiXX0=
