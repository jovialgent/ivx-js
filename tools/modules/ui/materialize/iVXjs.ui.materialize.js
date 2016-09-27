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

            var name = input.name;
            var _input$onChange = input.onChange;
            var onChange = _input$onChange === undefined ? [] : _input$onChange;


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
        var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ErrorMessages);

        var inputName = input.name;
        var inputType = input.type;

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
            var inputName = this.inputName;
            var inputType = this.inputType;
            var errors = this.errors;
            var attributes = this.attributes;

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
            var inputName = this.inputName;
            var inputType = this.inputType;
            var errors = this.errors;

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

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
            var DELIMETER = this.DELIMETER;
            var AUTHENTICATION = this.AUTHENTICATION;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + AUTHENTICATION + DELIMETER + eventName;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.FIREBASE = "firebase";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER;
            var FIREBASE = this.FIREBASE;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + FIREBASE;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

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


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.VIDEO = "video";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER;
            var VIDEO = this.VIDEO;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + VIDEO;
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
            var _anchorInfo = this.anchorInfo;
            var _anchorInfo$href = _anchorInfo.href;
            var href = _anchorInfo$href === undefined ? '' : _anchorInfo$href;
            var _anchorInfo$classes = _anchorInfo.classes;
            var classes = _anchorInfo$classes === undefined ? '' : _anchorInfo$classes;
            var _anchorInfo$attribute = _anchorInfo.attributes;
            var attributes = _anchorInfo$attribute === undefined ? {} : _anchorInfo$attribute;
            var _anchorInfo$label = _anchorInfo.label;
            var label = _anchorInfo$label === undefined ? labelHTML : _anchorInfo$label;
            var labelHTML = _anchorInfo.labelHTML;
            var _anchorInfo$id = _anchorInfo.id;
            var id = _anchorInfo$id === undefined ? '' : _anchorInfo$id;

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
        var buttons = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var input = arguments[1];
        var errorMessages = arguments.length <= 2 || arguments[2] === undefined ? _messages.ErrorMessages : arguments[2];

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
            var _errors = this.errors;
            var errorClass = _errors === undefined ? {} : _errors;
            var _buttons = this.buttons;
            var buttons = _buttons === undefined ? [] : _buttons;
            var _input = this.input;
            var input = _input === undefined ? {} : _input;
            var buttonClasses = this.buttonClasses;

            console.dir(buttons);
            var _errorClass$attribute = errorClass.attributes;
            var attributes = _errorClass$attribute === undefined ? {} : _errorClass$attribute;
            var _errorClass$errors = errorClass.errors;
            var errors = _errorClass$errors === undefined ? {} : _errorClass$errors;
            var _errorClass$messages = errorClass.messages;
            var messages = _errorClass$messages === undefined ? {} : _errorClass$messages;

            var buttonErrorMessages = Object.keys(attributes).map(function (key, index) {
                return {
                    message: "" + errors[key],
                    attrHTML: ''
                };
            });
            var errorMessages = new this.errorMessages(buttonErrorMessages).html;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var _input$labelHTML = input.labelHTML;
            var labelHTML = _input$labelHTML === undefined ? '' : _input$labelHTML;
            var _input$showLabel = input.showLabel;
            var showLabel = _input$showLabel === undefined ? false : _input$showLabel;

            var buttonsHTML = buttons.reduce(function (html, button, index) {
                var label = button.label;
                var _button$attrHTML = button.attrHTML;
                var attrHTML = _button$attrHTML === undefined ? '' : _button$attrHTML;
                var _button$classes = button.classes;
                var classes = _button$classes === undefined ? "" : _button$classes;


                return html + " \n                   <button " + attrHTML + " class=\"" + classes + " " + buttonClasses + "\">\n                       " + label + "\n                   </button>";
            }, '');

            if ((labelHTML.length > 0 || label.length > 0) && showLabel) {
                labelHTML = labelHTML ? labelHTML : label;
                labelHTML = "<label>" + labelHTML + "</label>";
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
        var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

        _classCallCheck(this, Checkbox);

        var input = inputObj.input;
        var _inputObj$tags = inputObj.tags;
        var tags = _inputObj$tags === undefined ? '' : _inputObj$tags;
        var _inputObj$settings = inputObj.settings;
        var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
        var _inputObj$errors = inputObj.errors;
        var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

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
            var input = this.input;
            var settings = this.settings;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;


            if (labelHTML) label = labelHTML;

            return "\n            <label class=\"" + classes + "\">\n               <input " + attributes + ">\n               " + label + "\n            </label>\n        ";
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
            var id = input.id;
            var name = input.name;


            return "id=\"" + id + "\" name=\"" + name + "\" type=\"checkbox\"";
        }
    }, {
        key: "html",
        get: function get() {
            var tags = this.tags;
            var _settings = this.settings;
            var settings = _settings === undefined ? {} : _settings;
            var errors = this.errors;
            var input = this.input;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var requiredAttributes = this.requiredAttributes;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var id = input.id;
            var name = input.name;
            var _input$label2 = input.label;
            var label = _input$label2 === undefined ? '' : _input$label2;
            var _errors = this.errors;
            var _errors$messages = _errors.messages;
            var messages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = _errors.attributes;
            var attributes = _errors$attributes === undefined ? {} : _errors$attributes;
            var _errors$tags = _errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

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
    var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

    _classCallCheck(this, Date);

    var _inputObj$input = inputObj.input;
    var input = _inputObj$input === undefined ? {} : _inputObj$input;
    var _inputObj$settings = inputObj.settings;
    var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
    var _inputObj$tags = inputObj.tags;
    var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
    var _inputObj$errors = inputObj.errors;
    var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

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
      var input = this.input;
      var settings = this.settings;
      var tags = this.tags;
      var errors = this.errors;
      var uiClasses = this.uiClasses;
      var uiAttributes = this.uiAttributes;
      var label = input.label;
      var labelHTML = input.labelHTML;
      var _input$name = input.name;
      var name = _input$name === undefined ? '' : _input$name;
      var _input$id = input.id;
      var id = _input$id === undefined ? '' : _input$id;
      var _settings$input = settings.input;
      var inputSettings = _settings$input === undefined ? {} : _settings$input;
      var _settings$showLabel = settings.showLabel;
      var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
      var _inputSettings$classe = inputSettings.classes;
      var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


      classes = classes + " " + uiClasses;

      var _errors$messages = errors.messages;
      var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
      var _errors$attributes = errors.attributes;
      var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
      var _errors$nonValidate = errors.nonValidate;
      var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
      var _errors$tags = errors.tags;
      var errorTags = _errors$tags === undefined ? '' : _errors$tags;

      var errorHTML = new this.errorMessages(errorMessages).html;
      var nonValidateAttributesHTML = new _attributes.AttributeTags(errorAttributes, nonValidate).html;

      nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

      var inputHTML = " \n            <label> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"date\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

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
                var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

                _classCallCheck(this, DatetimeLocal);

                var _inputObj$input = inputObj.input;
                var input = _inputObj$input === undefined ? {} : _inputObj$input;
                var _inputObj$settings = inputObj.settings;
                var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
                var _inputObj$tags = inputObj.tags;
                var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
                var _inputObj$errors = inputObj.errors;
                var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

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
                        var input = this.input;
                        var settings = this.settings;
                        var tags = this.tags;
                        var errors = this.errors;
                        var uiClasses = this.uiClasses;
                        var uiAttributes = this.uiAttributes;
                        var label = input.label;
                        var labelHTML = input.labelHTML;
                        var _input$name = input.name;
                        var name = _input$name === undefined ? '' : _input$name;
                        var _input$id = input.id;
                        var id = _input$id === undefined ? '' : _input$id;
                        var _settings$input = settings.input;
                        var inputSettings = _settings$input === undefined ? {} : _settings$input;
                        var _settings$showLabel = settings.showLabel;
                        var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes;
                        var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + " " + uiClasses;

                        var _errors$messages = errors.messages;
                        var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
                        var _errors$attributes = errors.attributes;
                        var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
                        var _errors$nonValidate = errors.nonValidate;
                        var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
                        var _errors$tags = errors.tags;
                        var errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

                        if (labelHTML) label = labelHTML;

                        var inputHTML = " \n            <label> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"datetime-local\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

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
                var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

                _classCallCheck(this, Email);

                var _inputObj$input = inputObj.input;
                var input = _inputObj$input === undefined ? {} : _inputObj$input;
                var _inputObj$settings = inputObj.settings;
                var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
                var _inputObj$tags = inputObj.tags;
                var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
                var _inputObj$errors = inputObj.errors;
                var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

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
                        var input = this.input;
                        var settings = this.settings;
                        var tags = this.tags;
                        var errors = this.errors;
                        var uiClasses = this.uiClasses;
                        var uiAttributes = this.uiAttributes;
                        var _input$label = input.label;
                        var label = _input$label === undefined ? '' : _input$label;
                        var labelHTML = input.labelHTML;
                        var _input$name = input.name;
                        var name = _input$name === undefined ? '' : _input$name;
                        var _input$id = input.id;
                        var id = _input$id === undefined ? '' : _input$id;
                        var _settings$input = settings.input;
                        var inputSettings = _settings$input === undefined ? {} : _settings$input;
                        var _settings$showLabel = settings.showLabel;
                        var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes;
                        var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + " " + uiClasses;

                        var _errors$messages = errors.messages;
                        var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
                        var _errors$attributes = errors.attributes;
                        var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
                        var _errors$nonValidate = errors.nonValidate;
                        var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
                        var _errors$tags = errors.tags;
                        var errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

                        if (labelHTML) label = labelHTML;

                        var inputHTML = " \n            <label> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"email\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

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
        var style = arguments.length <= 4 || arguments[4] === undefined ? _style.Style : arguments[4];

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
            var _submit = this.submit;
            var submit = _submit === undefined ? {} : _submit;
            var _submit$label = submit.label;
            var submitLabel = _submit$label === undefined ? "Submit" : _submit$label;
            var submitLabelHTML = submit.labelHTML;
            var _submit$input = submit.input;
            var submitInput = _submit$input === undefined ? {} : _submit$input;
            var _submit$container = submit.container;
            var submitContainer = _submit$container === undefined ? {} : _submit$container;
            var _submit$attributes = submit.attributes;
            var attributes = _submit$attributes === undefined ? '' : _submit$attributes;
            var _submitInput$classes = submitInput.classes;
            var submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes;
            var submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;


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
            var inputHTML = this.inputHTML;
            var name = this.name;
            var additionalAttrHTML = this.additionalAttrHTML;
            var settings = this.settings;
            var formClasses = this.formClasses;
            var _settings$submit = settings.submit;
            var submit = _settings$submit === undefined ? {} : _settings$submit;
            var _settings$classes = settings.classes;
            var configFormClasses = _settings$classes === undefined ? '' : _settings$classes;
            var formId = settings.id;
            var _settings$label = settings.label;
            var label = _settings$label === undefined ? '' : _settings$label;
            var labelHTML = settings.labelHTML;


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
        var errorMessages = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

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
            var errorMessages = this.errorMessages;
            var messageClasses = this.messageClasses;
            var containerClasses = this.containerClasses;

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
                var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

                _classCallCheck(this, Number);

                var _inputObj$input = inputObj.input;
                var input = _inputObj$input === undefined ? {} : _inputObj$input;
                var _inputObj$settings = inputObj.settings;
                var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
                var _inputObj$tags = inputObj.tags;
                var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
                var _inputObj$errors = inputObj.errors;
                var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

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
                        var input = this.input;
                        var settings = this.settings;
                        var tags = this.tags;
                        var errors = this.errors;
                        var uiClasses = this.uiClasses;
                        var uiAttributes = this.uiAttributes;
                        var _input$label = input.label;
                        var label = _input$label === undefined ? '' : _input$label;
                        var _input$name = input.name;
                        var name = _input$name === undefined ? '' : _input$name;
                        var _input$id = input.id;
                        var id = _input$id === undefined ? '' : _input$id;
                        var labelHTML = input.labelHTML;
                        var _settings$input = settings.input;
                        var inputSettings = _settings$input === undefined ? {} : _settings$input;
                        var _settings$showLabel = settings.showLabel;
                        var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes;
                        var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + " " + uiClasses;

                        var _errors$messages = errors.messages;
                        var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
                        var _errors$attributes = errors.attributes;
                        var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
                        var _errors$nonValidate = errors.nonValidate;
                        var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
                        var _errors$tags = errors.tags;
                        var errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

                        if (labelHTML) label = labelHTML;

                        var inputHTML = " \n            <label> " + label + " </label>\n            <input class=\"" + classes + "\"  name=\"" + name + "\"  type=\"number\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

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
        var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

        _classCallCheck(this, Options);

        var input = inputObj.input;
        var _inputObj$defaultDisp = inputObj.defaultDisplay;
        var defaultDisplay = _inputObj$defaultDisp === undefined ? '' : _inputObj$defaultDisp;
        var _inputObj$settings = inputObj.settings;
        var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
        var _inputObj$tags = inputObj.tags;
        var tags = _inputObj$tags === undefined ? '' : _inputObj$tags;
        var _inputObj$errors = inputObj.errors;
        var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


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
            var tags = this.tags;
            var input = this.input;
            var defaultDisplay = this.defaultDisplay;
            var errors = this.errors;
            var settings = this.settings;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var id = input.id;
            var name = input.name;
            var options = input.options;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages;
            var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = errors.attributes;
            var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
            var _errors$nonValidate = errors.nonValidate;
            var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

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

            var inputHTML = " \n             <label>" + label + "</label>             \n               <select class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"" + nonValidateAttributesHTML + " " + errorTags + " " + tags + ">\n                  " + defaultOptionTag + "\n                  " + optionsHTML + "\n               </select>\n               " + errorHTML;

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
        var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

        _classCallCheck(this, Radio);

        var _radioInputObj$input = radioInputObj.input;
        var input = _radioInputObj$input === undefined ? {} : _radioInputObj$input;
        var _radioInputObj$radios = radioInputObj.radios;
        var radios = _radioInputObj$radios === undefined ? [] : _radioInputObj$radios;
        var _radioInputObj$errors = radioInputObj.errors;
        var errors = _radioInputObj$errors === undefined ? {} : _radioInputObj$errors;
        var _radioInputObj$settin = radioInputObj.settings;
        var settings = _radioInputObj$settin === undefined ? {} : _radioInputObj$settin;


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
            var errors = this.errors;
            var radios = this.radios;
            var settings = this.settings;
            var input = this.input;
            var uiClasses = this.uiClasses;
            var errorMessages = errors.messages;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? "" : _errors$tags;

            var self = this;
            var inputLabel = input.label;
            var inputLableHTML = input.labelHTML;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;


            if (inputLableHTML) inputLabel = inputLableHTML;

            var radiosHTML = radios.reduce(function (html, radio) {
                var label = radio.label;
                var _radio$attrHTML = radio.attrHTML;
                var attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML;
                var _radio$classes = radio.classes;
                var classes = _radio$classes === undefined ? '' : _radio$classes;


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
            var formSection = this.formSection;
            var data = this.data;
            var defaultFooterClasses = this.defaultFooterClasses;
            var defaultHeaderClasses = this.defaultHeaderClasses;
            var defaultSectionClasses = this.defaultSectionClasses;
            var _data$header = data.header;
            var header = _data$header === undefined ? {} : _data$header;
            var _data$footer = data.footer;
            var footer = _data$footer === undefined ? {} : _data$footer;
            var _data$section = data.section;
            var section = _data$section === undefined ? {} : _data$section;
            var _header$classes = header.classes;
            var headerClasses = _header$classes === undefined ? '' : _header$classes;
            var _header$html = header.html;
            var headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
            var _section$classes = section.classes;
            var sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes;
            var footerClasses = _footer$classes === undefined ? '' : _footer$classes;
            var _footer$html = footer.html;
            var footerHTML = _footer$html === undefined ? '' : _footer$html;


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
            var data = this.data;
            var linkSection = this.linkSection;
            var defaultFooterClasses = this.defaultFooterClasses;
            var defaultHeaderClasses = this.defaultHeaderClasses;
            var defaultSectionClasses = this.defaultSectionClasses;
            var defaultLinkContainerClasses = this.defaultLinkContainerClasses;
            var _data$header = data.header;
            var header = _data$header === undefined ? {} : _data$header;
            var _data$footer = data.footer;
            var footer = _data$footer === undefined ? {} : _data$footer;
            var _data$section = data.section;
            var section = _data$section === undefined ? {} : _data$section;
            var _data$linkContainer = data.linkContainer;
            var linkContainer = _data$linkContainer === undefined ? {} : _data$linkContainer;
            var _header$classes = header.classes;
            var headerClasses = _header$classes === undefined ? '' : _header$classes;
            var _header$html = header.html;
            var headerHTML = _header$html === undefined ? '' : _header$html;
            var _section$classes = section.classes;
            var sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes;
            var footerClasses = _footer$classes === undefined ? '' : _footer$classes;
            var _footer$html = footer.html;
            var footerHTML = _footer$html === undefined ? '' : _footer$html;
            var _linkContainer$classe = linkContainer.classes;
            var linkContainerClasses = _linkContainer$classe === undefined ? '' : _linkContainer$classe;
            var _linkContainer$attrib = linkContainer.attributes;
            var linkContainerAttributes = _linkContainer$attrib === undefined ? {} : _linkContainer$attrib;

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
            var _containerClasses = this.containerClasses;
            var containerClasses = _containerClasses === undefined ? '' : _containerClasses;

            var contents = inputsHTML.reduce(function (currentHTML, inputHTML) {
                var html = inputHTML.html;
                var _inputHTML$settings = inputHTML.settings;
                var settings = _inputHTML$settings === undefined ? {} : _inputHTML$settings;
                var _settings$width = settings.width;
                var width = _settings$width === undefined ? '1' : _settings$width;
                var _settings$container = settings.container;
                var container = _settings$container === undefined ? {} : _settings$container;
                var _container$classes = container.classes;
                var classes = _container$classes === undefined ? '' : _container$classes;


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
        var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

        _classCallCheck(this, Text);

        var _inputObj$input = inputObj.input;
        var input = _inputObj$input === undefined ? {} : _inputObj$input;
        var _inputObj$settings = inputObj.settings;
        var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
        var _inputObj$tags = inputObj.tags;
        var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
        var _inputObj$errors = inputObj.errors;
        var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


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
            var input = this.input;
            var settings = this.settings;
            var tags = this.tags;
            var errors = this.errors;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages;
            var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = errors.attributes;
            var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
            var _errors$nonValidate = errors.nonValidate;
            var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <label> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"text\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

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
        var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

        _classCallCheck(this, Textarea);

        var _inputObj$input = inputObj.input;
        var input = _inputObj$input === undefined ? {} : _inputObj$input;
        var _inputObj$settings = inputObj.settings;
        var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
        var _inputObj$tags = inputObj.tags;
        var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
        var _inputObj$errors = inputObj.errors;
        var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


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
            var input = this.input;
            var settings = this.settings;
            var tags = this.tags;
            var errors = this.errors;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _errors$messages = errors.messages;
            var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = errors.attributes;
            var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
            var _errors$nonValidate = errors.nonValidate;
            var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            if (labelHTML) label = labelHTML;

            label = showLabel ? label : '';

            var inputHTML = " \n            <label> " + label + " </label>\n            <textarea class=\"" + classes + " " + uiClasses + "\"  id=\"" + id + "\" name=\"" + name + "\" " + uiAttributes + "   " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            </textarea>\n            " + errorHTML + "\n       ";

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
        var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

        _classCallCheck(this, Url);

        var _inputObj$input = inputObj.input;
        var input = _inputObj$input === undefined ? {} : _inputObj$input;
        var _inputObj$settings = inputObj.settings;
        var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
        var _inputObj$tags = inputObj.tags;
        var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
        var _inputObj$errors = inputObj.errors;
        var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


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
            var input = this.input;
            var settings = this.settings;
            var tags = this.tags;
            var errors = this.errors;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _errors$messages = errors.messages;
            var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = errors.attributes;
            var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
            var _errors$nonValidate = errors.nonValidate;
            var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <label> " + label + " </label>\n            <input class=\"" + classes + " " + uiClasses + "\" " + uiAttributes + "  id=\"" + id + "\" name=\"" + name + "\"  type=\"url\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        if (container.html instanceof Function) {
            container.html(_this.html);
        } else {
            var div = document.createElement('div');
            div.innerHTML = _this.html;

            container.appendChild(div);
        }

        var playPauseControlsClasses = _this.playPauseControlsClasses;
        var totalTimeInfoClasses = _this.totalTimeInfoClasses;
        var currentTimeInfoClasses = _this.currentTimeInfoClasses;
        var scrubBarClasses = _this.scrubBarClasses;
        var muteControlsClasses = _this.muteControlsClasses;
        var volumeBarClasses = _this.volumeBarClasses;


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
            var unmute = this.unmuteClasses;
            var muteControlsClasses = this.muteControlsClasses;

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
            var playPauseButtonHTML = this.playPauseButtonHTML;
            var scrubBarHTML = this.scrubBarHTML;
            var timestampHTML = this.timestampHTML;
            var muteButtonHTML = this.muteButtonHTML;
            var volumeBarHTML = this.volumeBarHTML;

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Anchor).call(this, anchorInfo));
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PasswordInputController).call(this, $scope, iVXjs, iVXjsActions));

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
            var _input = input;
            var id = _input.id;
            var name = _input.name;
            var _input$errors = _input.errors;
            var errors = _input$errors === undefined ? {} : _input$errors;
            var labelHTML = _input.labelHTML;
            var _input$label = _input.label;
            var label = _input$label === undefined ? $filter('stringParsers')('startCase', id) : _input$label;
            var _input$attributes = _input.attributes;
            var attributes = _input$attributes === undefined ? {} : _input$attributes;
            var type = _input.type;
            var _input$settings = _input.settings;
            var settings = _input$settings === undefined ? {} : _input$settings;

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
                            var _input2 = input;
                            var _input2$onChange = _input2.onChange;
                            var onChange = _input2$onChange === undefined ? [] : _input2$onChange;
                            var inputName = _input2.name;


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
            var _input = input;
            var id = _input.id;
            var name = _input.name;
            var _input$errors = _input.errors;
            var errors = _input$errors === undefined ? {} : _input$errors;
            var labelHTML = _input.labelHTML;
            var _input$label = _input.label;
            var label = _input$label === undefined ? $filter('stringParsers')('startCase', id) : _input$label;
            var _input$attributes = _input.attributes;
            var attributes = _input$attributes === undefined ? {} : _input$attributes;
            var type = _input.type;
            var _input$settings = _input.settings;
            var settings = _input$settings === undefined ? {} : _input$settings;

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Buttons).call(this, buttons, input, _messages.ErrorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, inputObj, _messages.ErrorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Date).call(this, inputObj, _messages.ErrorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DatetimeLocal).call(this, inputObj, _messages.ErrorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Email).call(this, inputObj, _messages.ErrorMessages));
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

        var _inputObj$input = inputObj.input;
        var input = _inputObj$input === undefined ? {} : _inputObj$input;
        var _inputObj$settings = inputObj.settings;
        var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
        var _inputObj$tags = inputObj.tags;
        var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;


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
            var input = this.input;
            var settings = this.settings;
            var tags = this.tags;
            var uiClasses = this.uiClasses;
            var _uiAttributes = this.uiAttributes;
            var uiAttributes = _uiAttributes === undefined ? "" : _uiAttributes;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, inputHTML, name, additionalAttrHTML, settings, _style.Style));
    }

    _createClass(Form, [{
        key: 'formClasses',
        get: function get() {
            return 'col s12';
        }
    }, {
        key: 'submitButtonHTML',
        get: function get() {
            var _submit = this.submit;
            var submit = _submit === undefined ? {} : _submit;
            var _submit$label = submit.label;
            var submitLabel = _submit$label === undefined ? "Submit" : _submit$label;
            var submitLabelHTML = submit.labelHTML;
            var _submit$input = submit.input;
            var submitInput = _submit$input === undefined ? {} : _submit$input;
            var _submit$container = submit.container;
            var submitContainer = _submit$container === undefined ? {} : _submit$container;
            var _submit$attributes = submit.attributes;
            var attributes = _submit$attributes === undefined ? '' : _submit$attributes;
            var _submitInput$classes = submitInput.classes;
            var submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes;
            var submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;


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

},{"./anchor.js":27,"./angular/directives/input.file.js":30,"./angular/directives/input.password.js":31,"./buttons.js":32,"./checkbox.js":33,"./date.js":34,"./datetime-local.js":35,"./email.js":36,"./file.js":37,"./form.js":38,"./number.js":41,"./options.js":42,"./password.js":43,"./radio.js":44,"./range.js":45,"./state.input.js":46,"./state.navigation.js":47,"./state.video.js":48,"./text.js":50,"./textarea.js":51,"./url.js":52,"./video.controls.js":53}],40:[function(require,module,exports){
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
        var errorMessages = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, ErrorMessages);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorMessages).call(this, errorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Number).call(this, inputObj, _messages.ErrorMessages));
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

                return _possibleConstructorReturn(this, Object.getPrototypeOf(Options).call(this, inputObj, _messages.ErrorMessages));
        }

        _createClass(Options, [{
                key: 'html',
                get: function get() {
                        var tags = this.tags;
                        var input = this.input;
                        var defaultDisplay = this.defaultDisplay;
                        var errors = this.errors;
                        var settings = this.settings;
                        var uiClasses = this.uiClasses;
                        var uiAttributes = this.uiAttributes;
                        var id = input.id;
                        var name = input.name;
                        var options = input.options;
                        var _input$label = input.label;
                        var label = _input$label === undefined ? '' : _input$label;
                        var labelHTML = input.labelHTML;
                        var _settings$input = settings.input;
                        var inputSettings = _settings$input === undefined ? {} : _settings$input;
                        var _settings$showLabel = settings.showLabel;
                        var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes;
                        var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + ' ' + uiClasses;

                        var _errors$messages = errors.messages;
                        var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
                        var _errors$attributes = errors.attributes;
                        var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
                        var _errors$nonValidate = errors.nonValidate;
                        var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
                        var _errors$tags = errors.tags;
                        var errorTags = _errors$tags === undefined ? '' : _errors$tags;

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

                        var inputHTML = ' \n                         \n               <select class="' + classes + '"  id="' + id + '" name="' + name + '"' + nonValidateAttributesHTML + ' ' + errorTags + ' ' + tags + '>\n                  ' + defaultOptionTag + '\n                  ' + optionsHTML + '\n               </select>\n               <label>' + label + '</label> \n               ' + errorHTML;

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Password).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Password, [{
        key: 'uiClasses',
        get: function get() {
            return 'validate';
        }
    }, {
        key: 'html',
        get: function get() {
            var input = this.input;
            var settings = this.settings;
            var tags = this.tags;
            var errors = this.errors;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + ' ' + uiClasses;

            var _errors$messages = errors.messages;
            var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = errors.attributes;
            var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
            var _errors$nonValidate = errors.nonValidate;
            var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, inputObj, _messages.ErrorMessages));
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
            var errors = this.errors;
            var radios = this.radios;
            var settings = this.settings;
            var input = this.input;
            var uiClasses = this.uiClasses;
            var errorMessages = errors.messages;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? "" : _errors$tags;

            var self = this;
            var inputLabel = input.label;
            var inputLableHTML = input.labelHTML;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var name = input.name;


            if (inputLableHTML) inputLabel = inputLableHTML;

            var radiosHTML = radios.reduce(function (html, radio) {
                var label = radio.label;
                var _radio$attrHTML = radio.attrHTML;
                var attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML;
                var _radio$classes = radio.classes;
                var classes = _radio$classes === undefined ? '' : _radio$classes;
                var value = radio.value;


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
    var inputObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var errorMessages = arguments.length <= 1 || arguments[1] === undefined ? _messages.ErrorMessages : arguments[1];

    _classCallCheck(this, Range);

    var _inputObj$input = inputObj.input;
    var input = _inputObj$input === undefined ? {} : _inputObj$input;
    var _inputObj$settings = inputObj.settings;
    var settings = _inputObj$settings === undefined ? {} : _inputObj$settings;
    var _inputObj$tags = inputObj.tags;
    var tags = _inputObj$tags === undefined ? {} : _inputObj$tags;
    var _inputObj$errors = inputObj.errors;
    var errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

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
      var input = this.input;
      var settings = this.settings;
      var tags = this.tags;
      var errors = this.errors;
      var uiClasses = this.uiClasses;
      var uiAttributes = this.uiAttributes;
      var _input$label = input.label;
      var label = _input$label === undefined ? '' : _input$label;
      var _input$name = input.name;
      var name = _input$name === undefined ? '' : _input$name;
      var _input$id = input.id;
      var id = _input$id === undefined ? '' : _input$id;
      var labelHTML = input.labelHTML;
      var _settings$input = settings.input;
      var inputSettings = _settings$input === undefined ? {} : _settings$input;
      var _settings$showLabel = settings.showLabel;
      var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
      var _inputSettings$classe = inputSettings.classes;
      var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


      classes = classes + " " + uiClasses;

      var _errors$messages = errors.messages;
      var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
      var _errors$attributes = errors.attributes;
      var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
      var _errors$nonValidate = errors.nonValidate;
      var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
      var _errors$tags = errors.tags;
      var errorTags = _errors$tags === undefined ? '' : _errors$tags;

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(InputState).call(this, header, formSection, footer, data));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NavigationState).call(this, data, linkSection));
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
            var _data$isIphone = this.data.isIphone;
            var isIphone = _data$isIphone === undefined ? false : _data$isIphone;


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
            var playerSection = this.playerSection;
            var data = this.data;
            var iPhoneInlineClasses = this.iPhoneInlineClasses;
            var _data$header = data.header;
            var header = _data$header === undefined ? {} : _data$header;
            var _data$footer = data.footer;
            var footer = _data$footer === undefined ? {} : _data$footer;
            var _data$section = data.section;
            var section = _data$section === undefined ? {} : _data$section;
            var _header$classes = header.classes;
            var headerClasses = _header$classes === undefined ? '' : _header$classes;
            var _header$html = header.html;
            var headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
            var _section$classes = section.classes;
            var sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes;
            var footerClasses = _footer$classes === undefined ? '' : _footer$classes;
            var _footer$html = footer.html;
            var footerHTML = _footer$html === undefined ? '' : _footer$html;


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
                var html = thisInput.html;
                var settings = thisInput.settings;
                var _settings$width = settings.width;
                var width = _settings$width === undefined ? "1" : _settings$width;
                var _settings$classes = settings.classes;
                var classes = _settings$classes === undefined ? '' : _settings$classes;

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Text, [{
        key: 'uiClasses',
        get: function get() {
            return 'validate';
        }
    }, {
        key: 'html',
        get: function get() {
            var input = this.input;
            var settings = this.settings;
            var tags = this.tags;
            var errors = this.errors;
            var uiClasses = this.uiClasses;
            var uiAttributes = this.uiAttributes;
            var _input$label = input.label;
            var label = _input$label === undefined ? '' : _input$label;
            var labelHTML = input.labelHTML;
            var _input$name = input.name;
            var name = _input$name === undefined ? '' : _input$name;
            var _input$id = input.id;
            var id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input;
            var inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _settings$showLabel = settings.showLabel;
            var showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes;
            var classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + ' ' + uiClasses;

            var _errors$messages = errors.messages;
            var errorMessages = _errors$messages === undefined ? [] : _errors$messages;
            var _errors$attributes = errors.attributes;
            var errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes;
            var _errors$nonValidate = errors.nonValidate;
            var nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate;
            var _errors$tags = errors.tags;
            var errorTags = _errors$tags === undefined ? '' : _errors$tags;

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, inputObj, _messages.ErrorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Url).call(this, inputObj, _messages.ErrorMessages));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, container, iVXjsBus));
    }

    _createClass(_class, [{
        key: 'adjustVolume',
        value: function adjustVolume(event) {
            var volumeBar = this.volumeBar;
            var muteControls = this.muteControls;
            var currentVolume = this.currentVolume;
            var volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;
            var unmuteClasses = this.unmuteClasses;
            var muteClasses = this.muteClasses;
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
            var playPauseControls = this.playPauseControls;
            var playClasses = this.playClasses;
            var pauseClasses = this.pauseClasses;

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
            var muteControls = this.muteControls;
            var muteClasses = this.muteClasses;
            var unmuteClasses = this.unmuteClasses;
            var volumeBar = this.volumeBar;
            var volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

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
            var playPauseControls = this.playPauseControls;
            var playClasses = this.playClasses;
            var pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, ["material-icons"]);

            playPauseIcon.innerHTML = pauseClasses;

            this.play();
        }
    }, {
        key: 'onPaused',
        value: function onPaused() {
            var playPauseControls = this.playPauseControls;
            var playClasses = this.playClasses;
            var pauseClasses = this.pauseClasses;

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
            var play = this.playClasses;
            var pause = this.pauseClasses;
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
            var unmute = this.unmuteClasses;
            var muteControlsClasses = this.muteControlsClasses;

            return '\n        <div id="mute-button-container" class="left-align">\n            <button id="video-controls-mute-controls" class="' + muteControlsClasses + '">\n               <i class=\'material-icons\'>' + unmute + '</i>\n            </button>\n        </div>\n        ';
        }
    }, {
        key: 'html',
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML;
            var scrubBarHTML = this.scrubBarHTML;
            var timestampHTML = this.timestampHTML;
            var muteButtonHTML = this.muteButtonHTML;
            var volumeBarHTML = this.volumeBarHTML;


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
    var attributeData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var attributeKeys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

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
      var attributeKeys = this.attributeKeys;
      var attributeData = this.attributeData;

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Controls).call(this));

        _this.currentVolume = 0.5;
        _this.controlEventNames = new _videoEvents2.default();
        return _this;
    }

    _createClass(Controls, [{
        key: 'dispose',
        value: function dispose(iVXjsBus) {
            iVXjsBus.removeListener(this.controlEventNames.TIME_UPDATE, this.updateTime);
            iVXjsBus.removeListener(this.controlEventNames.PLAYING, this.whilePlaying);
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
            var volumeBar = this.volumeBar;
            var muteControls = this.muteControls;
            var currentVolume = this.currentVolume;
            var volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;
            var unmuteClasses = this.unmuteClasses;
            var muteClasses = this.muteClasses;
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
            var currentTimeInfo = this.currentTimeInfo;
            var scrubBar = this.scrubBar;
            var scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
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
            var playPauseControls = this.playPauseControls;
            var playClasses = this.playClasses;
            var pauseClasses = this.pauseClasses;

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
            var muteControls = this.muteControls;
            var muteClasses = this.muteClasses;
            var unmuteClasses = this.unmuteClasses;
            var volumeBar = this.volumeBar;
            var volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

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
            var volumeBar = this.volumeBar;
            var volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var self = this;
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            currentVolumeSpan.style.width = self.currentVolume * 100 + '%';

            this.setVolume(self.currentVolume);
            this.getDuration(function (duration) {
                var totalTimeInfo = self.totalTimeInfo;
                var currentTimeInfo = self.currentTimeInfo;
                var scrubBar = self.scrubBar;

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
            var currentTimeInfo = this.currentTimeInfo;
            var scrubBar = this.scrubBar;
            var scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
            var seconds = player.currentTime;


            seconds = seconds > this.duration ? 0 : seconds;

            var currentTimeObject = this.convertSecondsToParts(seconds);
            var currentTimeStamp = this.createTimeStamp(currentTimeObject);
            var timeLapsed = seconds / this.duration;

            if (currentTimeInfo) currentTimeInfo.innerHTML = '' + currentTimeStamp;

            var searchClasses = [scrubBarTimeLapseClasses];

            if (scrubBar) {
                var timelapsed = this.getElementByClasses(scrubBar.children, searchClasses);

                timelapsed.style.width = timeLapsed * 100 + '%';
            }
        }
    }, {
        key: 'onPlaying',
        value: function onPlaying() {
            var playPauseControls = this.playPauseControls;
            var playClasses = this.playClasses;
            var pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = pauseClasses;

            this.play();
        }
    }, {
        key: 'onPaused',
        value: function onPaused() {
            var playPauseControls = this.playPauseControls;
            var playClasses = this.playClasses;
            var pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = playClasses;

            this.pause();
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners(iVXjsBus) {
            var self = this;
            var scrubBar = this.scrubBar;
            var volumeBar = this.volumeBar;
            var playPauseControls = this.playPauseControls;
            var muteControls = this.muteControls;


            this.iVXjsBus = iVXjsBus;
            this.updateTime = iVXjsBus.on(this.controlEventNames.TIME_UPDATE, updateTime);
            this.whilePaused = iVXjsBus.on(this.controlEventNames.PAUSED, whilePaused);
            this.whilePlaying = iVXjsBus.on(this.controlEventNames.PLAYING, whilePlaying);
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

            iVXjsBus.once(this.controlEventNames.CAN_PLAY, canPlayCallBack);

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
            var hours = timeObject.hours;
            var minutes = timeObject.remainingMinutes;
            var seconds = timeObject.remainingSeconds;

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
exports.assert = assert;
function assert(test, name, message) {
	if (!test) throw new Error(name + " is invalid: " + message + ".");

	return test;
}

},{}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
            var collection = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

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

},{}]},{},[39]);
