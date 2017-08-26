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

},{"../../utilities/type-parsers.js":64}],3:[function(require,module,exports){
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

},{"../../utilities/type-parsers.js":64}],4:[function(require,module,exports){
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

var _tracksCues = require("./tracks.cues.js");

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
            ON_CHAPTER_END: "on-chpater-end"
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

},{"./tracks.cues.js":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracks = require("./tracks.js");

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

},{"./tracks.js":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tracks = require("./tracks.js");

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

},{"./tracks.js":10}],10:[function(require,module,exports){
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

},{"./index.js":6}],11:[function(require,module,exports){
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

},{"./video.js":12}],12:[function(require,module,exports){
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

},{"./index.js":6}],13:[function(require,module,exports){
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

},{"../../../utilities/asserts.js":63,"../../../utilities/type-parsers.js":64,"../utilities/attributes.js":58}],14:[function(require,module,exports){
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

},{"../../../utilities/asserts.js":63,"../../../utilities/type-parsers.js":64,"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],15:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],16:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],17:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],18:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],19:[function(require,module,exports){
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

},{"./style":26}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20}],22:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],23:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"../utilities/attributes.js":58}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],28:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],29:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":20,"./style":26}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../video/controls/index.js');

var _element = require('../utilities/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        key: 'createPlayerSpecificControls',
        value: function createPlayerSpecificControls(opts) {
            var player = opts.player;
            var _player$textTracks = player.textTracks,
                textTracks = _player$textTracks === undefined ? [] : _player$textTracks;

            var html = '';
            var container = this.container,
                chapterButtonClasses = this.chapterButtonClasses,
                chapterListClasses = this.chapterListClasses;


            if (textTracks.length > 0) {
                var chapterElement = this.createChapterContainer(textTracks);
                var trackSelectElement = this.createTrackSelect(textTracks);

                if (chapterElement) {
                    container.append(chapterElement);
                }

                if (trackSelectElement) {
                    container.append(trackSelectElement);
                }
            }
        }
    }, {
        key: 'createTrackSelect',
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
                var _ret = function () {
                    var trackListContainer = document.createElement('div');
                    var trackListSelect = document.createElement('select');
                    var languageSelected = false;
                    var ccToggle = document.createElement('button');
                    var ccToggleIcon = document.createElement('i');

                    _element2.default.addClassesToElement(ccToggle, closeCaptionButtonClasses);
                    _element2.default.addClassesToElement(ccToggleIcon, closeCaptionButtonIconClasses);

                    ccToggleIcon.innerHTML = closeCaptionButtonIconContent;

                    ccToggle.append(ccToggleIcon);

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
                        var trackId = trackListSelect.value;

                        var isInactive = _element2.default.hasClass(ccToggle, closeCaptionButtonInactiveClasses);

                        if (isInactive) {
                            _element2.default.removeClassesFromElement(trackListSelect, trackListSelectInactiveClasses);
                            _element2.default.removeClassesFromElement(ccToggle, closeCaptionButtonInactiveClasses);
                            _element2.default.addClassesToElement(trackListSelect, trackListSelectActiveClasses);
                            _element2.default.addClassesToElement(ccToggle, closeCaptionButtonActiveClasses);
                            self.changeCurrentTrack(trackId);
                        } else {
                            _element2.default.removeClassesFromElement(trackListSelect, trackListSelectActiveClasses);
                            _element2.default.removeClassesFromElement(ccToggle, closeCaptionButtonActiveClasses);
                            _element2.default.addClassesToElement(trackListSelect, trackListSelectInactiveClasses);
                            _element2.default.addClassesToElement(ccToggle, closeCaptionButtonInactiveClasses);
                            self.changeCurrentTrack("");
                        }
                    });

                    _element2.default.addClassesToElement(trackListSelect, trackListSelectClasses);
                    _element2.default.addClassesToElement(trackListSelect, languageSelected ? trackListSelectActiveClasses : trackListSelectInactiveClasses);
                    _element2.default.addClassesToElement(trackListContainer, trackListSelectContainerClasses);
                    _element2.default.addClassesToElement(ccToggle, languageSelected ? closeCaptionButtonActiveClasses : closeCaptionButtonInactiveClasses);
                    trackListContainer.appendChild(ccToggle);

                    if (languageTracks.length > 1) {
                        trackListContainer.appendChild(trackListSelect);
                    }

                    return {
                        v: trackListContainer
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }

            return false;
        }
    }, {
        key: 'createChapterContainer',
        value: function createChapterContainer(textTracks) {
            var chapterButtonClasses = this.chapterButtonClasses,
                chapterListClasses = this.chapterListClasses,
                chapterActiveClasses = this.chapterActiveClasses,
                chapterInActiveClasses = this.chapterInActiveClasses,
                chapterListItemClasses = this.chapterListItemClasses;

            var chapterTrack = Array.from(textTracks).find(function (textTrack) {
                return textTrack.kind === 'chapters';
            });
            var self = this;

            if (chapterTrack) {
                var _ret2 = function () {
                    var chapterListEl = document.createElement('ol');
                    var _chapterTrack$cues = chapterTrack.cues,
                        cues = _chapterTrack$cues === undefined ? [] : _chapterTrack$cues;


                    Array.from(cues).forEach(function (cue, index) {
                        var id = cue.id,
                            text = cue.text,
                            startTime = cue.startTime;

                        var chapterContainerEl = document.createElement('li');
                        var chapterButtonEl = document.createElement('button');

                        chapterButtonEl.id = id + '-select';
                        chapterButtonEl.className = chapterButtonClasses;
                        chapterButtonEl.innerHTML = text;

                        chapterContainerEl.appendChild(chapterButtonEl);

                        chapterContainerEl.id = id;
                        chapterContainerEl.className = chapterListItemClasses + ' ' + (index === 0 ? chapterActiveClasses : chapterInActiveClasses);

                        chapterListEl.appendChild(chapterContainerEl);
                        chapterButtonEl.addEventListener('click', function () {
                            self.seek(startTime);
                            self.play();
                        });
                    });

                    chapterListEl.className = chapterListClasses;

                    return {
                        v: chapterListEl
                    };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }

            return false;
        }
    }, {
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
        key: 'chapterButtonClasses',
        get: function get() {
            return 'chapter-button';
        }
    }, {
        key: 'chapterListClasses',
        get: function get() {
            return "chapter-list";
        }
    }, {
        key: 'chapterListItemClasses',
        get: function get() {
            return "chapter-list-item";
        }
    }, {
        key: 'chapterActiveClasses',
        get: function get() {
            return "active";
        }
    }, {
        key: 'chapterInActiveClasses',
        get: function get() {
            return "inactive";
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
        key: 'trackListSelectContainerClasses',
        get: function get() {
            return 'track-list-select-container';
        }
    }, {
        key: 'trackListSelectClasses',
        get: function get() {
            return 'track-list-select';
        }
    }, {
        key: 'trackListSelectActiveClasses',
        get: function get() {
            return 'active';
        }
    }, {
        key: 'trackListSelectInactiveClasses',
        get: function get() {
            return 'inactive';
        }
    }, {
        key: 'closeCaptionButtonClasses',
        get: function get() {
            return 'close-caption-button';
        }
    }, {
        key: 'closeCaptionButtonActiveClasses',
        get: function get() {
            return 'active';
        }
    }, {
        key: 'closeCaptionButtonInactiveClasses',
        get: function get() {
            return 'inactive';
        }
    }, {
        key: 'closeCaptionButtonIconClasses',
        get: function get() {
            return 'close-caption-button-icon fa fa-cc';
        }
    }, {
        key: 'closeCaptionButtonIconContent',
        get: function get() {
            return "";
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

},{"../../video/controls/index.js":61,"../utilities/element":59}],31:[function(require,module,exports){
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

},{"../default/anchor.js":13}],32:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/input-controller.js":2,"../../../../../constants/firebase.authentication.js":4}],33:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/input-controller.js":2,"../../../../../constants/firebase.authentication.js":4}],34:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../controllers/input.file.js":32}],35:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/messages.error.js":3,"../controllers/input.password.js":33}],36:[function(require,module,exports){
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

},{"../default/buttons.js":14,"./messages.js":44}],37:[function(require,module,exports){
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

},{"../default/checkbox.js":15,"./messages.js":44}],38:[function(require,module,exports){
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

},{"../default/date.js":16,"./messages.js":44}],39:[function(require,module,exports){
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

},{"../default/datetime-local.js":17,"./messages.js":44}],40:[function(require,module,exports){
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

},{"../default/email.js":18,"./messages.js":44}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"../default/form.js":19,"./style.js":53}],43:[function(require,module,exports){
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

},{"./anchor.js":31,"./angular/directives/input.file.js":34,"./angular/directives/input.password.js":35,"./buttons.js":36,"./checkbox.js":37,"./date.js":38,"./datetime-local.js":39,"./email.js":40,"./file.js":41,"./form.js":42,"./number.js":45,"./options.js":46,"./password.js":47,"./radio.js":48,"./range.js":49,"./state.input.js":50,"./state.navigation.js":51,"./state.video.js":52,"./style.js":53,"./text.js":54,"./textarea.js":55,"./url.js":56,"./video.controls.js":57}],44:[function(require,module,exports){
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

},{"../default/messages.js":20}],45:[function(require,module,exports){
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

},{"../default/number.js":21,"./messages.js":44}],46:[function(require,module,exports){
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

},{"../default/options.js":22,"./messages.js":44}],47:[function(require,module,exports){
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

},{"../default/text.js":27,"./messages.js":44}],48:[function(require,module,exports){
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

},{"../default/radio.js":23,"./messages.js":44}],49:[function(require,module,exports){
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

},{"../utilities/attributes.js":58,"./messages.js":44}],50:[function(require,module,exports){
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

},{"../default/state.input.js":24}],51:[function(require,module,exports){
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

},{"../default/state.navigation.js":25}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"../default/text.js":27,"./messages.js":44}],55:[function(require,module,exports){
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

},{"../default/textarea.js":28,"./messages.js":44}],56:[function(require,module,exports){
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

},{"../default/url.js":29,"./messages.js":44}],57:[function(require,module,exports){
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
        key: 'chapterButtonClasses',
        get: function get() {
            return 'chapter-button btn waves-effect waves-light';
        }
    }, {
        key: 'chapterActiveClasses',
        get: function get() {
            return "active";
        }
    }, {
        key: 'chapterInActiveClasses',
        get: function get() {
            return "inactive";
        }
    }, {
        key: 'trackListSelectContainerClasses',
        get: function get() {
            return 'track-list-select-container input-field';
        }
    }, {
        key: 'trackListSelectClasses',
        get: function get() {
            return 'track-list-select browser-default';
        }
    }, {
        key: 'trackListSelectActiveClasses',
        get: function get() {
            return 'active';
        }
    }, {
        key: 'trackListSelectInactiveClasses',
        get: function get() {
            return 'inactive';
        }
    }, {
        key: 'closeCaptionButtonClasses',
        get: function get() {
            return 'close-caption-button btn-floating waves-effect waves-light';
        }
    }, {
        key: 'closeCaptionButtonActiveClasses',
        get: function get() {
            return 'active';
        }
    }, {
        key: 'closeCaptionButtonInactiveClasses',
        get: function get() {
            return 'inactive';
        }
    }, {
        key: 'closeCaptionButtonIconClasses',
        get: function get() {
            return 'close-caption-button-icon closed material-icons';
        }
    }, {
        key: 'closeCaptionButtonIconContent',
        get: function get() {
            return "closed_caption";
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

},{"../default/video.controls.js":30}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    addClassesToElement: function addClassesToElement(element, classes) {
        var classList = classes.split(' ');

        classList.forEach(function (currentClass) {
            element.classList.add(currentClass);
        });
    },
    removeClassesFromElement: function removeClassesFromElement(element, classes) {
        var classList = classes.split(' ');

        classList.forEach(function (currentClass) {
            element.classList.remove(currentClass);
        });
    },
    hasClass: function hasClass(element, classes) {
        return element.className.indexOf(classes) >= 0;
    }
};

},{}],60:[function(require,module,exports){
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
    }, {
        key: 'changeCurrentTrack',
        value: function changeCurrentTrack(trackId) {
            this.iVXjsBus.emit(this.trackEventNames.CHANGE_CURRENT_TRACK, trackId);
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../settings.js":62}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("./events.js");

var _events2 = _interopRequireDefault(_events);

var _videoEvents = require("../../../constants/video.events.js");

var _videoEvents2 = _interopRequireDefault(_videoEvents);

var _tracksEvents = require("../../../constants/tracks.events.js");

var _tracksEvents2 = _interopRequireDefault(_tracksEvents);

var _tracksCuesEvents = require("../../../constants/tracks.cues.events.js");

var _tracksCuesEvents2 = _interopRequireDefault(_tracksCuesEvents);

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
        _this.trackEventNames = new _tracksEvents2.default();
        _this.trackCuesEventName = new _tracksCuesEvents2.default();
        return _this;
    }

    _createClass(Controls, [{
        key: "dispose",
        value: function dispose(iVXjsBus) {
            iVXjsBus.removeListener(this.controlEventNames.TIME_UPDATE, this.updateTime);
            iVXjsBus.removeListener(this.controlEventNames.PLAYING, this.whilePlaying);
            iVXjsBus.removeListener(this.controlEventNames.CAN_PLAY, this.canPlayCallback);
            iVXjsBus.removeListener(this.trackCuesEventName.ON_CHAPTER_START, this.chapterChange);
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
            this.setVolume(volumeLevel);
        }
    }, {
        key: "scrub",
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

            currentTimeInfo.innerHTML = "" + currentTimeStamp;
            timelapsed.style.width = trueX / width * 100 + "%";

            this.seek(scrubToTime);
        }
    }, {
        key: "setPlayPause",
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
        key: "setMute",
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
                    currentVolumeSpan.style.width = "0%";

                    this.setVolume(0);
                    break;
                case muteClasses:
                    muteIcon.className = unmuteClasses;
                    currentVolumeSpan.style.width = this.currentVolume * 100 + "%";

                    this.setVolume(this.currentVolume);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "onReadyToPlay",
        value: function onReadyToPlay(player, stateData) {
            var volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var self = this;
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            currentVolumeSpan.style.width = self.currentVolume * 100 + "%";

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
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = pauseClasses;

            this.play();
        }
    }, {
        key: "onPaused",
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
        key: "addEventListeners",
        value: function addEventListeners(iVXjsBus) {
            var self = this;
            var scrubBar = this.scrubBar,
                volumeBar = this.volumeBar,
                playPauseControls = this.playPauseControls,
                muteControls = this.muteControls,
                trackCuesEventName = this.trackCuesEventName;


            this.iVXjsBus = iVXjsBus;
            this.updateTime = iVXjsBus.on(this.controlEventNames.TIME_UPDATE, updateTime);
            this.whilePaused = iVXjsBus.on(this.controlEventNames.PAUSED, whilePaused);
            this.whilePlaying = iVXjsBus.on(this.controlEventNames.PLAYING, whilePlaying);
            this.canPlayCallback = iVXjsBus.on(this.controlEventNames.CAN_PLAY, canPlayCallBack);
            this.chapterChange = iVXjsBus.on(this.trackCuesEventName.ON_CHAPTER_START, chapterChange);
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

            this.iVXjsBus.once(this.controlEventNames.CAN_PLAY, function (player) {
                self.createPlayerSpecificControls({ player: player });
            });

            function chapterChange(cue) {
                var chapterActiveClasses = self.chapterActiveClasses,
                    chapterListItemClasses = self.chapterListItemClasses,
                    chapterInActiveClasses = self.chapterInActiveClasses;

                var chapterList = Array.from(document.getElementsByClassName(chapterListItemClasses));
                var currentChapterId = cue.id;


                chapterList.forEach(function (chapterListItem) {
                    var chapterId = chapterListItem.id;


                    if (chapterId === currentChapterId) {
                        chapterListItem.classList.remove(chapterInActiveClasses);
                        chapterListItem.classList.add(chapterActiveClasses);
                        return;
                    }

                    chapterListItem.classList.remove(chapterActiveClasses);
                    chapterListItem.classList.add(chapterInActiveClasses);
                });
            };

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

},{"../../../constants/tracks.cues.events.js":7,"../../../constants/tracks.events.js":9,"../../../constants/video.events.js":11,"./events.js":60}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}]},{},[43])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvZmlyZWJhc2UuYXV0aGVudGljYXRpb24uanMiLCJzcmMvY29uc3RhbnRzL2ZpcmViYXNlLmpzIiwic3JjL2NvbnN0YW50cy9pbmRleC5qcyIsInNyYy9jb25zdGFudHMvdHJhY2tzLmN1ZXMuZXZlbnRzLmpzIiwic3JjL2NvbnN0YW50cy90cmFja3MuY3Vlcy5qcyIsInNyYy9jb25zdGFudHMvdHJhY2tzLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvdHJhY2tzLmpzIiwic3JjL2NvbnN0YW50cy92aWRlby5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9hbmNob3IuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2J1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9kYXRlLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2Zvcm0uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L21lc3NhZ2VzLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9udW1iZXIuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3JhZGlvLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3RleHRhcmVhLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvYW5jaG9yLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvYW5ndWxhci9jb250cm9sbGVycy9pbnB1dC5maWxlLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvYW5ndWxhci9jb250cm9sbGVycy9pbnB1dC5wYXNzd29yZC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2FuZ3VsYXIvZGlyZWN0aXZlcy9pbnB1dC5maWxlLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LnBhc3N3b3JkLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvZGF0ZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2RhdGV0aW1lLWxvY2FsLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9maWxlLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvZm9ybS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL2luZGV4LmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvbWVzc2FnZXMuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9udW1iZXIuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9vcHRpb25zLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvcGFzc3dvcmQuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3JhbmdlLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvc3RhdGUuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvbWF0ZXJpYWxpemUvc3RhdGUudmlkZW8uanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS9zdHlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9tYXRlcmlhbGl6ZS90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3VybC5qcyIsInNyYy9tb2R1bGVzL3VpL21hdGVyaWFsaXplL3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMiLCJzcmMvbW9kdWxlcy91aS91dGlsaXRpZXMvZWxlbWVudC5qcyIsInNyYy9tb2R1bGVzL3ZpZGVvL2NvbnRyb2xzL2V2ZW50cy5qcyIsInNyYy9tb2R1bGVzL3ZpZGVvL2NvbnRyb2xzL2luZGV4LmpzIiwic3JjL21vZHVsZXMvdmlkZW8vc2V0dGluZ3MuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ0F3QixxQjtBQUFULFNBQVMscUJBQVQsQ0FBK0IsV0FBL0IsRUFBNEM7QUFDMUQsS0FBSSxnQkFBZ0IsV0FBcEI7QUFDQSxLQUFJLE9BQU8sY0FBYyxPQUF6QjtB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Ozs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oY29uc3RydWN0b3IpIHtcclxuXHRsZXQgY29uc3RydWN0b3JGbiA9IGNvbnN0cnVjdG9yO1xyXG5cdGxldCBhcmdzID0gY29uc3RydWN0b3JGbi4kaW5qZWN0O1xyXG5cdGxldCBmYWN0b3J5RnVuY3Rpb24gPSAoLi4uYXJncykgPT4ge1xyXG4gICAgXHRyZXR1cm4gbmV3IGNvbnN0cnVjdG9yRm4oLi4uYXJncyk7XHJcblx0fVxyXG5cdFxyXG5cdGFyZ3MucHVzaChmYWN0b3J5RnVuY3Rpb24pO1xyXG5cclxuXHRyZXR1cm4gYXJncztcclxufSIsImltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxubGV0IG15VHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0Q29udHJvbGxlckhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGlWWGpzLCBpVlhqc0FjdGlvbnMpIHtcclxuICAgICAgICBsZXQgeyBpbnB1dERhdGE6IGlucHV0IH0gPSAkc2NvcGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRFeHBlcmllbmNlVmFsdWUgPSBpVlhqcy5leHBlcmllbmNlLmRhdGFbaW5wdXQubmFtZV07XHJcblxyXG4gICAgICAgIGlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pbnB1dFZhbHVlID0gY3VycmVudEV4cGVyaWVuY2VWYWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFeHBlcmllbmNlVmFsdWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlucHV0VmFsdWUgPSBjdXJyZW50RXhwZXJpZW5jZVZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignY2hhbmdlZCcsIGZ1bmN0aW9uIChpbnB1dCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFteVR5cGVWYWxpZGF0b3IuaXNFbXB0eSh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAndHJ1ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHsgbmFtZSwgb25DaGFuZ2UgPSBbXSB9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2UudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnc2V0RGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJnczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlWWGpzLmxvZy5kZWJ1ZyhgSW5wdXQgJHtpbnB1dC5uYW1lfSBPbiBDaGFuZ2UgU3RhcnRlZGAsIHt9LCB7IGlucHV0LCBzb3VyY2U6ICdvbkNoYW5nZScsIHN0YXR1czogJ3N0YXJ0ZWQnLCBhY3Rpb25zOiBvbkNoYW5nZSwgdGltZXN0YW1wOiBEYXRlLm5vdygpIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlWWGpzQWN0aW9ucy5yZXNvbHZlQWN0aW9ucyhvbkNoYW5nZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlWWGpzLmxvZy5kZWJ1ZyhgSW5wdXQgJHtpbnB1dC5uYW1lfSBPbiBDaGFuZ2UgRW5kZWRgLCB7fSwgeyBpbnB1dCwgc291cmNlOiAnb25DaGFuZ2UnLCBzdGF0dXM6ICdjb21wbGV0ZWQnLCBhY3Rpb25zOiBvbkNoYW5nZSwgdGltZXN0YW1wOiBEYXRlLm5vdygpIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09iamVjdFBhcnNlcnN9IGZyb20gJy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IHRoaXNPYmplY3RQYXJzZXIgPSBuZXcgT2JqZWN0UGFyc2VycygpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXQsIGVycm9ycywgYXR0cmlidXRlcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHtuYW1lOiBpbnB1dE5hbWUsIHR5cGU6IGlucHV0VHlwZX0gPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmlucHV0TmFtZSA9IGlucHV0TmFtZTtcclxuICAgICAgICB0aGlzLmlucHV0VHlwZSA9IGlucHV0VHlwZTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGxldCB7YXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBhbmd1bGFyRXJyb3JNYXAgPSB0aGlzLmFuZ3VsYXJFcnJvck1hcDtcclxuICAgICAgICBsZXQgbm9uQW5ndWxhciA9IHRoaXMubm9uQW5ndWxhcjtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGUgPSB0aGlzLm5vblZhbGlkYXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc09iamVjdFBhcnNlci5yZWR1Y2UoYXR0cmlidXRlcywgKHRhZ3MsIGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVLZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vblZhbGlkYXRlLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+PSAwKSByZXR1cm4gdGFncztcclxuICAgICAgICAgICAgbGV0IHRhZyA9IG5vbkFuZ3VsYXIuaW5kZXhPZihhdHRyaWJ1dGVLZXkpID49IDAgP1xyXG4gICAgICAgICAgICAgICAgYCR7YXR0cmlidXRlS2V5fT1cIiR7YXR0cmlidXRlVmFsdWV9XCJgIDpcclxuICAgICAgICAgICAgICAgIGBuZy0ke2FuZ3VsYXJFcnJvck1hcFthdHRyaWJ1dGVLZXldfSA9IFwiJHthdHRyaWJ1dGVWYWx1ZX1cIiBgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0YWdzfSAke3RhZ31gO1xyXG4gICAgICAgIH0sICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dE5hbWUsIGlucHV0VHlwZSwgZXJyb3JzLCBhdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFuZ3VsYXJFcnJvck1hcCA9IHRoaXMuYW5ndWxhckVycm9yTWFwO1xyXG4gICAgICAgIGxldCBkZWZhdWx0TWVzc2FnZXMgPSB0aGlzLmRlZmF1bHRFcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChhdHRyaWJ1dGVLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXJyb3JzICYmIGVycm9yc1thdHRyaWJ1dGVLZXldID8gZXJyb3JzW2F0dHJpYnV0ZUtleV0gOiBkZWZhdWx0TWVzc2FnZXNbYXR0cmlidXRlS2V5XTtcclxuICAgICAgICAgICAgbGV0IGF0dHJIVE1MID0gYG5nLXNob3c9XCIoJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRkaXJ0eSB8fCAkcGFyZW50LmZvcm1JbnB1dC4kc3VibWl0dGVkKSAmJiAkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGVycm9yLiR7YW5ndWxhckVycm9yTWFwW2F0dHJpYnV0ZUtleV19XCJgO1xyXG5cclxuICAgICAgICAgICAgaWYoaW5wdXRUeXBlID09PSAncmFkaW8nKXtcclxuICAgICAgICAgICAgICAgYXR0ckhUTUwgPSBgbmctc2hvdz1cIigkcGFyZW50LmZvcm1JbnB1dC4kc3VibWl0dGVkKSAmJiAhcmFkaW9TZWxlY3RlZFwiYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogYXR0ckhUTUxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbnB1dFR5cGUgJiYgaW5wdXRUeXBlICE9PSAndGV4dCcgJiYgaW5wdXRUeXBlICE9IFwib3B0aW9uc1wiKSB7XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZXMucHVzaCh0aGlzLmlucHV0VHlwZUVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dFR5cGVFcnJvcigpIHtcclxuICAgICAgICBsZXQge2lucHV0TmFtZSwgaW5wdXRUeXBlLCBlcnJvcnN9ID0gdGhpcztcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gZXJyb3JzW2lucHV0VHlwZV07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSA/IGVycm9yTWVzc2FnZSA6IFwiSW52YWxpZCBcIiArIGlucHV0VHlwZSxcclxuICAgICAgICAgICAgYXR0ckhUTUw6IGBuZy1zaG93PVwiKCRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZGlydHkgfHwgJHBhcmVudC5mb3JtSW5wdXQuJHN1Ym1pdHRlZCkgJiYgJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRlcnJvci4ke2lucHV0VHlwZX1cImBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5vbkFuZ3VsYXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnbWluJywgJ21heCcsICdyZWFkb25seScsICdwbGFjZWhvbGRlcicsICdzdGVwJywgJ3JlYWRvbmx5JywgJ3N0eWxlJ11cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbm9uVmFsaWRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnc3RlcCcsICdwbGFjZWhvbGRlcicsICdyZWFkb25seSddO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhbmd1bGFyRXJyb3JNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlubGVuZ3RoOiAnbWlubGVuZ3RoJyxcclxuICAgICAgICAgICAgbWluOiBcIm1pblwiLFxyXG4gICAgICAgICAgICBtYXg6IFwibWF4XCIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICdtYXhsZW5ndGgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdEVycm9yTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlubGVuZ3RoOiAnVG9vIFNob3J0JyxcclxuICAgICAgICAgICAgbWluOiBcIlRvbyBMb3dcIixcclxuICAgICAgICAgICAgbWF4OiBcIlRvbyBIaWdoXCIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiAnUmVxdWlyZWQnLFxyXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICdUb28gTG9uZydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEZpcmViYXNlIGZyb20gXCIuL2ZpcmViYXNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIEZpcmViYXNle1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5BVVRIRU5USUNBVElPTiA9IFwiYXV0aFwiXG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBSRVFVRVNUX1BBU1NXT1JEIDogXCJyZXF1ZXN0LXBhc3N3b3JkXCIsXG4gICAgICAgICAgICBHRVRfUEFTU1dPUkQgOiBcImdldC1wYXNzd29yZFwiLFxuICAgICAgICAgICAgQUNDT1VOVF9FWElTVFMgOiBcImFjY291bnQtZXhpc3RzLXdpdGgtZGlmZmVyZW50LWNyZWRlbnRpYWxcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIEFVVEhFTlRJQ0FUSU9OfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0FVVEhFTlRJQ0FUSU9OfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuRklSRUJBU0UgPSBcImZpcmViYXNlXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgRklSRUJBU0V9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0ZJUkVCQVNFfWA7ICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IFRyYWNrQ3Vlc0NvbnN0YW50cyBmcm9tIFwiLi90cmFja3MuY3Vlcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFRyYWNrQ3Vlc0NvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgIE9OX0VOVEVSOiBcIm9uLWVudGVyXCIsXG4gICAgICAgICAgIE9OX0VYSVQ6IFwib24tZXhpdFwiLFxuICAgICAgICAgICBPTl9DSEFQVEVSX1NUQVJUIDogXCJvbi1jaGFwdGVyLXN0YXJ0XCIsXG4gICAgICAgICAgIE9OX0NIQVBURVJfRU5EIDogXCJvbi1jaHBhdGVyLWVuZFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IFRyYWNrc0NvbnN0YW50cyBmcm9tIFwiLi90cmFja3MuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBUcmFja3NDb25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuQ1VFUyA9IFwiY3Vlc1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKSB7XG4gICAgICAgIGxldCB7IERFTElNRVRFUiwgQ1VFUyB9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7Q1VFU31gO1xuICAgIH1cbn0iLCJpbXBvcnQgVHJhY2tDb25zdGFudHMgZnJvbSBcIi4vdHJhY2tzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVHJhY2tDb25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgIE9OX1RSQUNLX0NIQU5HRSA6IFwib24tdHJhY2stY2hhbmdlXCIsXG4gICAgICAgICAgQ0hBTkdFX0NVUlJFTlRfVFJBQ0sgOiBcImNoYW5nZS1jdXJyZW50LXRyYWNrXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhqc0NvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5UUkFDS1MgPSBcInRyYWNrc1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKSB7XG4gICAgICAgIGxldCB7IERFTElNRVRFUiwgVFJBQ0tTIH0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtUUkFDS1N9YDtcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlkZW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFJFQURZX1BMQVlFUiA6IFwicmVhZHktcGxheWVyXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcblxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XG5cbmV4cG9ydCBjbGFzcyBBbmNob3Ige1xuICAgIGNvbnN0cnVjdG9yKGFuY2hvckluZm8pIHsgICBcbiAgICAgICB0aGlzLmFuY2hvckluZm8gPSBhbmNob3JJbmZvO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuY2hvckNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHthbmNob3JDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aHJlZiA9ICcnLCBjbGFzc2VzID0gJycsIGF0dHJpYnV0ZXMgPSB7fSwgbGFiZWwgPSBsYWJlbEhUTUwsIGxhYmVsSFRNTCwgaWQ9Jyd9ID0gdGhpcy5hbmNob3JJbmZvOyBcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhhdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICBpZighbGFiZWxIVE1MICYmICFsYWJlbCl7XG4gICAgICAgICAgICBsYWJlbCA9IGhyZWY7XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICA8YSBpZD0nJHtpZH0nIGNsYXNzPVwiJHtjbGFzc2VzfSAke2FuY2hvckNsYXNzZXN9XCIgIGhyZWY9XCIke2hyZWZ9XCIgJHthdHRyaWJ1dGVIVE1MfSA+JHtsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbH08L2E+ICAgICAgICAgICBcbiAgICAgICAgYFxuICAgIH1cbn1cbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIGNvbGxlY3Rpb24gb2YgYnV0dG9ucyBmb3Igb25lIGNsaWNrIHJlY29yZGluZyBvZiBcclxuICogYW4gaW5wdXQgdGhhdCBoYXMgbXVsdGlwbGUgb3B0aW9ucyBmb3IgZGF0YSByZWNvcmRpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUYWtlcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSBidXR0b25zLCBhIGNsYXNzIHRoYXQgcmVuZGVycyB0aGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyBhbmQgYSBjbGFzcyB0aGF0IHJlbmRlcnMgYXR0cmlidXRlcy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mbyAtIEluZm9ybWF0aW9uIHRvIGNyZWF0ZSB0aGlzIGJ1dHRvbiBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1dHRvbnNJbmZvLmJ1dHRvbnMgLSBlYWNoIGluZGl2aWR1YWwgYnV0dG9uIGRhdGEgYW5kIHNldHRpbmdzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvLnNldHRpbmdzIC0gc2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIFxyXG4gICAgICogQHBhcmFtIHtDbGFzc30gYnV0dG9uc0luZm8uZXJyb3JzIC0gYW4gZXJyb3IgY2xhc3MgdGhhdCB3YXMgY3JlYXRlZCBieSB0aGUgXHJcbiAgICAgKiByZW5kZXJpbmcgbGlicmFyeSBzbyB0aGUgZXJyb3JzIG9wZW4gYW5kIGRpc3BsYXkgYWxvbmdzaWRlIHRoZSBsaWJyYXJ5LiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucyA9IFtdLCBpbnB1dCwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnV0dG9ucyB0byBiZSByZW5kZXJlZFxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgaW4gdGhpcyBncm91cCBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXJyb3IgbWVzc2FnZSBjbGFzcyB0aGF0IHdpbGwgdGFrZSB0aGUgZXJyb3JzIGZyb20gXHJcbiAgICAgICAgICogdGhlIHJlbmRlcmluZyBsaWJyYXJ5IGFuZCBhZGRzIHRoZW0gdG8gdGhpcyBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhdHRyaWJ1dGUgdGFncyBodG1sIHRvIGJlIGFkZGVkIHRvIHRoaXMgYnV0dG9uIFxyXG4gICAgICAgICAqIGlucHV0cy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExldHMgdXNlcnMgYWRkIHRoZSBzYW1lIGNsYXNzZXMgdG8gYWxsIGJ1dHRvbnMganVzdCBpbiBcclxuICAgICAqIGNhc2UgYnV0dG9ucyBzaGFyZSBhIHNwZWNpZmljIGNsYXNzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBIVE1MIGZvciBldmVyeSBidXR0b25zIGRlZmluZWQgaW4gdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIFxyXG4gICAgICogYXR0YWNoZXMgdGhlIGVycm9yIG1lc3NhZ2VzIGF0dGFjaGVkIHRvIHRoaXMgaW5wdXQuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYnV0dG9uQ2xhc3NlcyA9ICdidXR0b24tY2xhc3MnO1xyXG4gICAgICogYnV0dG9ucyA9IFt7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiQnV0dG9uIDFcIixcclxuICAgICAqICAgIGF0dHJIVE1MIDogXCJkaXNhYmxlZFwiLFxyXG4gICAgICogICAgY2xhc3NlcyA6IFwiY2xhc3MtMVwiXHJcbiAgICAgKiB9LHtcclxuICAgICAqICAgIGxhYmVsIDogXCI8aDE+QnV0dG9uIDI8L2gxPlwiLFxyXG4gICAgICogICAgY2xhc3NlcyBcIiBjbGFzcy0yXCJcclxuICAgICAqIH1dO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBXaWxsIHJlbmRlcjpcclxuICAgICAqIFxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1jbGFzcyBjbGFzcy0xXCIgZGlzYWJsZWQ+QnV0dG9uIDE8L2J1dHRvbj5cclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24gY2xhc3MgY2xhc3MtMlwiPjxoMT5CdXR0b24gMjwvaDE+PC9idXR0b24+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzOiBlcnJvckNsYXNzID0ge30sIGJ1dHRvbnMgPSBbXSwgaW5wdXQgPSB7fSwgYnV0dG9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMgPSB7fSwgZXJyb3JzID0ge30sIG1lc3NhZ2VzID0ge30gfSA9IGVycm9yQ2xhc3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2Vycm9yc1trZXldfWAsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhidXR0b25FcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MID0gJycsIHNob3dMYWJlbCA9IGZhbHNlLCBpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgYnV0dG9uc0hUTUwgPSBidXR0b25zLnJlZHVjZSgoaHRtbCwgYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9IFwiXCIgfSA9IGJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfSBcclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gJHthdHRySFRNTH0gY2xhc3M9XCIke2NsYXNzZXN9ICR7YnV0dG9uQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmICgobGFiZWxIVE1MLmxlbmd0aCA+IDAgfHwgbGFiZWwubGVuZ3RoID4gMCkgJiYgc2hvd0xhYmVsKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbEhUTUx9PC9sYWJlbD5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgJHtsYWJlbEhUTUx9XHJcbiAgICAgICAgICAgICAke2J1dHRvbnNIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VzfSAgICAgICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y2VzIGh0bWwgdG8gYnVpbGQgYSBjaGVja2JveCBpbnB1dCBmb3IgdGhlICBcclxuICogdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSBjaGVja2JveCdzIHNldHRpbmdzIGZyb20gYSBzdGFuZGFyZCBpbnB1dCBkYXRhIFxyXG4gICAgICogb2JqZWN0IGFuZCBzZXRzIHRoZSB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHJlbmRlciBpZiB0aGUgY2hlY2tib3ggaXNuJ3QgdmFsaWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9iaiAtIGNvbnRhaW5zIGFsbCB0aGUgY29uZmlndXJhdGlvbnMgXHJcbiAgICAgKiB0byByZW5kZXIgdGhpcyBpbnB1dC5cclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGVycm9yTWVzc2FnZXMgLSBhIGNsYXNzIHRoYXQgd2lsbCByZW5kZXIgdGhlIFxyXG4gICAgICogc3BlY2lmaWMgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyBiYXNlZCBvbiB0aGlzIFVJJ3Mgc2V0dGluZ3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgdGFncyA9ICcnLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBjaGVja2JveCdzIGlucHV0IGNvbmZpZ3VyYXRpb24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFueSBjdXN0b20gdGFncyBwYXNzZWQgZG93biBmcm9tIHRoZSByZW5kZXJpbmcgbGlicmFyeS4gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyB3aG9sZSBpbnB1dCBpbmNsdWRpbmcgdGhlIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGNsYXNzIG9mIGVycm9ycyBjcmVhdGVkIGJ5IHRoZSByZW5kZXJpbmcgbGlicmFyeSB0byBcclxuICAgICAgICAgKiBoaWRlIGFuZCBzaG93IHZhcmlvdXMgZXJyb3JzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBVSSdzIHJlbmRlcmluZyBvZiB0aGlzIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlZmF1bHQgY2xhc3MgdG8gdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgVUkgc3BlY2lmaWMgYXR0cmlidXRlc1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlZCBmb3IgdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIHRvIGJlIHVzZWQgYW5kIHJlbmRlcmVkIHByb3Blcmx5LlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgc3RyaW5nIG9mIGFsbCBhdHRyaWJ1dGVzIHRvIGxvYWQgXHJcbiAgICAgKiB0aGlzIGlucHV0IGluY2x1ZGluZyBpdHMgaWQsIG5hbWUgYW5kIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGdldCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCJgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBmcm9tIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIFxyXG4gICAgICogYW5kIGNsYXNzZXMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdWlDbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBpbnB1dC5jbGFzc2VzID0gXCJjbGFzcy0yXCI7XHJcbiAgICAgKiByZXF1aXJlZEF0dHJpYnV0ZXMgPSBcImlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCdcIlxyXG4gICAgICogLy8gUmVuZGVycyBUbzpcclxuICAgICAqIDxsYWJlbCBjbGFzcz1cImNsYXNzLTEgY2xhc3MtMlwiPlxyXG4gICAgICogICAgIDxpbnB1dCBpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBodG1sIG9mIHRoZSBmdWxseSBjcmVhdGVkIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5nc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCIgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgIDxpbnB1dCAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIGFuZCByZW5kZXJzIGFsbCB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzLCBpbnB1dCwgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBsYWJlbCA9ICcnIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBtZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKG1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxDbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBsZXQgYWxsQXR0cmlidXRlcyA9IGAke3JlcXVpcmVkQXR0cmlidXRlc30gJHt1aUF0dHJpYnV0ZXN9ICR7dGFnc30gJHtlcnJvclRhZ3N9YFxyXG4gICAgICAgIGxldCBjaGVja2JveEhUTUwgPSB0aGlzLnJlbmRlckNoZWNrYm94Q29udGFpbmVyKGFsbENsYXNzZXMsIGFsbEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAke2NoZWNrYm94SFRNTH1cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZSBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGRhdGUgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGUgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZSBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBEYXRlLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5nczsgICAgICAgIFxyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRlXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRldGltZSBsb2NhbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgd2l0aCB0aW1lc3RhbXAgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgKiBtZXNzYWdlc1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJveFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGV0aW1lLWxvY2FsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICogXHJcbiAgICAqIEBleGFtcGxlIFxyXG4gICAgKiAvL0RhdGEgXHJcbiAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICogRGF0ZXRpbWVMb2NhbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICogLy8gUmVuZGVycyBcclxuICAgICogPGxhYmVsPlxyXG4gICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAqIDwvbGFiZWw+XHJcbiAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZW1haWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBlbWFpbHMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGVtYWlsIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZW1haWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhbiBlbWFpbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBFbWFpbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJlbWFpbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZm9ybSB3cmFwcGVyIGFyb3VuZCB0aGVzZSBpbnB1dHMgYW5kIGEgXHJcbiAqIHN1Ym1pdCBidXR0b24gdG8gc3VibWl0IHRoZSBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgdmFyaW91cyBkYXRhIHRvIHJlbmRlciB0aGlzIGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBpbnB1dEhUTUwgLSBBbGwgaW5wdXQgZGF0YSB0byBiZSBhZGRlZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxBdHRySFRNTCAtIEF0dHJpYnV0ZXMgdGhhdCBuZWVkIHRvIGJlIFxyXG4gICAgICogYWRkZWQgdG8gdGhlIGZvcm0gcHJpbWFyaWx5IHVzZWQgZm9yIHZhbGlkYXRpb24gYW5kIHN1Ym1pdCBmdW5jdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2V0dGluZ3MgLSBHbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZm9ybS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBzdHlsZSA9IFN0eWxlKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBpbnB1dCBodG1sIGluZm9ybWF0aW9uIGZvciB0aGlzIFxyXG4gICAgICAgICAqIGZvcm1cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXRIVE1MID0gaW5wdXRIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYW1lIGZvciB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRpdGlvbmFsIHRhZ3MgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbEF0dHJIVE1MID0gYWRkaXRpb25hbEF0dHJIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBlbnRpcmUgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgc3VibWl0IGJ1dHRvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3VibWl0ID0gc2V0dGluZ3Muc3VibWl0O1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgc3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBkZWZhdWx0IFVJIGNsYXNzZXMgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBmb3JtQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3JvdydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgdG8gcmVuZGVyIHRoZSBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBGb3JtLnNldHRpbmdzID0ge1xyXG4gICAgICogICAgIHN1Ym1pdCA6IHtcclxuICAgICAqICAgICAgICAgbGFiZWwgOiBcIk15IG5ldyBzdWJtaXQgbGFiZWxcIixcclxuICAgICAqICAgICAgICAgaW5wdXQgOiB7XHJcbiAgICAgKiAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1pbnB1dFwiXHJcbiAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgKiAgICAgICAgIGNvbnRhaW5lciA6IHtcclxuICAgICAqICAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1jb250YWluZXJcIlxyXG4gICAgICogICAgICAgICB9XHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfTtcclxuICAgICAqIFxyXG4gICAgICogLy9XaWxsIFJlbmRlciBcclxuICAgICAqIFxyXG4gICAgICogPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xIG15LXN1Ym1pdC1jb250YWluZXJcIj5cclxuICAgICAqICAgICA8YnV0dG9uIGNsYXNzPVwibXktc3VibWl0LWlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICogICAgICAgICAgTXkgbmV3IHN1Ym1pdCBsYWJlbCBcclxuICAgICAqICAgICA8L2J1dHRvbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgJHtzdWJtaXRDb250YWluZXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiJHtzdWJtaXRJbnB1dENsYXNzZXN9XCIgdHlwZT0nc3VibWl0JyAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgZWFjaCBpbnB1dCdzIGh0bWwgaW50byBhIGNvbnRhaW5lciBzbyB0aGV5IGNhbiBiZSBmb3JtYXR0ZWQgY29ycmVjdGx5XHJcbiAgICAgKiB1dGlsaXppbmcgdGhlIGl2eGpzLmNzcydzIGdyaWQgc3lzdGVtLlxyXG4gICAgICogQHR5cGV7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIGZvcm1DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fSwgY2xhc3NlczogY29uZmlnRm9ybUNsYXNzZXMgPSAnJywgaWQgOiBmb3JtSWQsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmICghc2V0dGluZ3MuaGlkZVN1Ym1pdCkge1xyXG4gICAgICAgICAgICBpbnB1dEhUTUwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc3VibWl0LFxyXG4gICAgICAgICAgICAgICAgaHRtbDogdGhpcy5zdWJtaXRCdXR0b25IVE1MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gdGhpcy5zdHlsZS5hZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCIke2Zvcm1JZH0tZm9ybVwiIGNsYXNzPVwiJHtmb3JtQ2xhc3Nlc30gJHtjb25maWdGb3JtQ2xhc3Nlc31cIiBub3ZhbGlkYXRlIG5hbWU9XCIke25hbWV9XCIgJHthZGRpdGlvbmFsQXR0ckhUTUx9PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR7Y29udGVudHN9XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEluZGljYXRlcyBlcnJvcnMgZm9yIGVhY2ggaW5wdXQgYmFzZWQgb24gdGhlIFxyXG4gKiBhdHRyaWJ1dGVzIGNyZWF0ZWQgZnJvbSB0aGUgdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzXHJcbiAqIGlWWGpzIHVzZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJpbmdzIGluIGFsbCB0aGUgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKiB0aGlzIGlucHV0IGNhbiBwcm9kdWNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBlcnJvck1lc3NhZ2VzIC0gbGlzdCBvZiBhbGwgcG9zc2libGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyB3aXRoIGF0dHJpYnV0ZXMgaW5kaWNhdGluZyB0aGUgbWVzc2FnZSBcclxuICAgICAqIGFuZCB0aGUgY29uZGl0aW9ucyBpbiB3aGljaCB0byBzaG93IHRoZW0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaXN0IG9mIGFsbCBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjbGFzc2VzIGZvciB0aGUgZXJyb3IgbWVzc2FnZSBkaXYuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGNsYXNzZXMgZm9yIHRoZSBjb250YWluZXIgb2YgYWxsIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciBhbGwgZXJyb3IgbWVzc2FnZXMgYW5kIHRoZSBjb250YWluZXIgd2l0aCBcclxuICAgICAqIHRoZW0uIFJlc3VsdHM6XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VzXCI+XHJcbiAgICAgKiAgICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5NRVNTQUdFPC9zcGFuPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yTWVzc2FnZXMsIG1lc3NhZ2VDbGFzc2VzLCBjb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZUhUTUwgPSBlcnJvck1lc3NhZ2VzLnJlZHVjZSgoZXJyb3JNZXNzYWdlSFRNTCwgZXJyb3JNZXNzYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlSFRNTH08c3BhbiBjbGFzcz1cIiR7bWVzc2FnZUNsYXNzZXN9XCIgJHtlcnJvck1lc3NhZ2UuYXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+YFxyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZUhUTUwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9JyR7Y29udGFpbmVyQ2xhc3Nlc30nPlxyXG4gICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VIVE1MfVxyXG4gICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG51bWJlciBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIG51bWJlcnMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTnVtYmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBudW1iZXIgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIE51bWJlci51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgKiAgICAgXCJzdGVwXCIgOiBcIjAuMVwiXHJcbiAgICAgKiB9XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBzdGVwPVwiMC4xXCIgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJudW1iZXJcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cIm51bWJlclwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIGRlZmF1bHREaXNwbGF5ID0gJycsIHNldHRpbmdzID0ge30sIHRhZ3MgPSAnJywgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgICAgICAgJHtkZWZhdWx0T3B0aW9uVGFnfVxyXG4gICAgICAgICAgICAgICAgICAke29wdGlvbnNIVE1MfVxyXG4gICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpb0lucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7IGlucHV0ID0ge30sIHJhZGlvcyA9IFtdLCBlcnJvcnMgPSB7fSwgc2V0dGluZ3MgPSB7fSB9ID0gcmFkaW9JbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5yYWRpb3MgPSByYWRpb3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgdWlSYWRpb0dyb3VwKHJhZGlvc0hUTUwpIHtcclxuICAgICAgICByZXR1cm4gcmFkaW9zSFRNTDtcclxuICAgIH07XHJcblxyXG4gICAgdWlSYWRpb0J1dHRvbkNvbnRhaW5lcihyYWRpb0hUTUwsIHVpQ2xhc3NlcywgdmFsdWUgPSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHRoaXMuaW5wdXQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IGAke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyArIHZhbHVlIDogJyd9YDsgXHJcblxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCIke2N1cnJlbnRJZH1cIiBjbGFzcz1cIiR7dWlDbGFzc2VzfVwiPlxyXG4gICAgICAgICR7cmFkaW9IVE1MfVxyXG4gICAgICAgIDwvbGFiZWw+YDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCB7IGlkIH0gPSB0aGlzLmlucHV0O1xyXG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtpZH0ke3ZhbHVlLmxlbmd0aCA+IDAgPyAnLScgKyB2YWx1ZSA6ICcnfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCIke2N1cnJlbnRJZH1cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgJHtsYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHsgZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IG1lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzLCB0YWdzOiBlcnJvclRhZ3MgPSBcIlwiIH0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGxhYmVsOiBpbnB1dExhYmVsLCBsYWJlbEhUTUw6IGlucHV0TGFibGVIVE1MIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBzaG93TGFiZWwgPSB0cnVlIH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGlucHV0TGFibGVIVE1MKSBpbnB1dExhYmVsID0gaW5wdXRMYWJsZUhUTUw7XHJcblxyXG4gICAgICAgIGxldCByYWRpb3NIVE1MID0gcmFkaW9zLnJlZHVjZSgoaHRtbCwgcmFkaW8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IGxhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gJycsIHZhbHVlIH0gPSByYWRpbztcclxuXHJcbiAgICAgICAgICAgIGF0dHJIVE1MID0gYCR7YXR0ckhUTUx9ICR7ZXJyb3JUYWdzfWA7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmFkaW9IVE1MID0gc2VsZi5yZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCBpbnB1dC5yYWRpb0J1dHRvbnNbaW5kZXhdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfVxyXG4gICAgICAgICAgICAke3NlbGYudWlSYWRpb0J1dHRvbkNvbnRhaW5lcihyYWRpb0hUTUwsIGAke3VpQ2xhc3Nlc30gJHtjbGFzc2VzfWAsIGlucHV0LnJhZGlvQnV0dG9uc1tpbmRleF0udmFsdWUpfWA7XHJcbiAgICAgICAgfSwgaW5wdXRMYWJlbCk7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgYWxsUmFkaW9CdXR0b25zSFRNTCA9IGBcclxuICAgICAgICAgICAgICR7cmFkaW9zSFRNTH1cclxuICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVpUmFkaW9Hcm91cChhbGxSYWRpb0J1dHRvbnNIVE1MKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGZvcm1TZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtU2VjdGlvbiA9IGZvcm1TZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Zvcm1TZWN0aW9uLCBkYXRhLCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcywgZGVmYXVsdEhlYWRlckNsYXNzZXMsIGRlZmF1bHRTZWN0aW9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge319ID0gZGF0YTtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHNlY3Rpb25DbGFzc2VzID0gJycgfSA9IHNlY3Rpb247XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWw6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiJHtzZWN0aW9uQ2xhc3Nlc30gJHtkZWZhdWx0U2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHtkZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAke2Zvcm1TZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc30gJHtkZWZhdWx0Rm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gJy4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzJztcblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgbGlua1NlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5saW5rU2VjdGlvbiA9IGxpbmtTZWN0aW9uXG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRGb290ZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHtkYXRhLCBsaW5rU2VjdGlvbiwgZGVmYXVsdEZvb3RlckNsYXNzZXMsIGRlZmF1bHRIZWFkZXJDbGFzc2VzLCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMsIGRlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3Nlc30gPSB0aGlzO1xuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9LCBsaW5rQ29udGFpbmVyID0ge319ID0gZGF0YTtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgYH0gPSBoZWFkZXI7XG4gICAgICAgIGxldCB7Y2xhc3Nlczogc2VjdGlvbkNsYXNzZXMgPSAnJ30gPSBzZWN0aW9uO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBsaW5rQ29udGFpbmVyQ2xhc3NlcyA9ICcnLCBhdHRyaWJ1dGVzOiBsaW5rQ29udGFpbmVyQXR0cmlidXRlcyA9IHt9fSA9IGxpbmtDb250YWluZXI7XG4gICAgICAgIGxldCBsaW5rQ29udGFpbmVyQXR0cmlidXRlSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGxpbmtDb250YWluZXJBdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhsaW5rQ29udGFpbmVyQXR0cmlidXRlcykpLmh0bWw7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiJHtzZWN0aW9uQ2xhc3Nlc30gJHtkZWZhdWx0U2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XG4gICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7ZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPScke2RlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3Nlc30gJHtsaW5rQ29udGFpbmVyQ2xhc3Nlc30nICR7bGlua0NvbnRhaW5lckF0dHJpYnV0ZUhUTUx9PlxuICAgICAgICAgICAgICAgICAgICAke2xpbmtTZWN0aW9ufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9ICR7ZGVmYXVsdEZvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgZ2V0V2lkdGgod2lkdGgpIHtcclxuICAgICAgICBpZiAod2lkdGggPT09ICcxJykgcmV0dXJuICdpdnhqcy1ncmlkLTEtMSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGdyaWRTdHJpbmcgPSB3aWR0aC5yZXBsYWNlKCcvJywgJy0nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBpdnhqcy1ncmlkLSR7Z3JpZFN0cmluZ31gO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnaW5wdXQtY29udGFpbmVyJztcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRzSFRNTCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge2NvbnRhaW5lckNsYXNzZXMgPSAnJ30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0c0hUTUwucmVkdWNlKChjdXJyZW50SFRNTCwgaW5wdXRIVE1MKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7aHRtbCwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dEhUTUw7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSAnMScsIGNvbnRhaW5lcj17fX0gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IHtjbGFzc2VzPScnfSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke2NvbnRhaW5lckNsYXNzZXN9YFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoaXNXaWR0aCA9IHNlbGYuZ2V0V2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcIml2eGpzLWdyaWQtMS0xXCIsIGAke3RoaXNXaWR0aH0gJHtjbGFzc2VzfWApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRIVE1MfSAke2h0bWx9YDtcclxuICAgICAgICB9LCAnJylcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidGV4dFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGFiZWwgPSBzaG93TGFiZWwgPyBsYWJlbCA6ICcnO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICR7dWlBdHRyaWJ1dGVzfSAgICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sc2V0dGluZ3MgPSB7fSx0YWdzID0ge30sZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpe1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OmlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bWVzc2FnZXMgOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXMgOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFncyA6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9ICR7dWlDbGFzc2VzfVwiICR7dWlBdHRyaWJ1dGVzfSAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJ1cmxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ29udHJvbHMgfSBmcm9tICcuLi8uLi92aWRlby9jb250cm9scy9pbmRleC5qcyc7XHJcbmltcG9ydCBFbGVtZW50VXRpbGl0aWVzIGZyb20gXCIuLi91dGlsaXRpZXMvZWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9scyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyLmh0bWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaHRtbCh0aGlzLmh0bWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMuaHRtbDtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB0b3RhbFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgY3VycmVudFRpbWVJbmZvQ2xhc3NlcyxcclxuICAgICAgICAgICAgc2NydWJCYXJDbGFzc2VzLFxyXG4gICAgICAgICAgICBtdXRlQ29udHJvbHNDbGFzc2VzLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJDbGFzc2VzXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMucGxheVBhdXNlQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIik7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5zY3J1YkJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIpO1xyXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1tdXRlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdwbGF5LXBhdXNlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1cnJlbnRUaW1lSW5mb0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXRpbWUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdzY3J1Yi1iYXInO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnbXV0ZSdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZS1iYXInXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtcGxheSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhdXNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBhdXNlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS11cCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtdm9sdW1lLW9mZic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyVGltZUxhcHNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gYHRpbWUtbGFwc2VkYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2N1cnJlbnQtdm9sdW1lJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hhcHRlckJ1dHRvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjaGFwdGVyLWJ1dHRvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJMaXN0Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gXCJjaGFwdGVyLWxpc3RcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hhcHRlckxpc3RJdGVtQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gXCJjaGFwdGVyLWxpc3QtaXRlbVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjaGFwdGVyQWN0aXZlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gXCJhY3RpdmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hhcHRlckluQWN0aXZlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gXCJpbmFjdGl2ZVwiXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUJ1dHRvbkhUTUwoKSB7XHJcbiAgICAgICAgbGV0IHsgcGxheUNsYXNzZXM6IHBsYXkgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzOiBwbGF5UGF1c2VDb250cm9scyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIgY2xhc3M9XCIke3BsYXlQYXVzZUNvbnRyb2xzfVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz0nJHtwbGF5fSc+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGltZXN0YW1wSFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIgY2xhc3M9XCIke3RoaXMuY3VycmVudFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIgY2xhc3M9XCIke3RoaXMudG90YWxUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7IHVubXV0ZUNsYXNzZXM6IHVubXV0ZSwgbXV0ZUNvbnRyb2xzQ2xhc3NlcyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiIGNsYXNzPVwiJHttdXRlQ29udHJvbHNDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIke3VubXV0ZX1cIj48L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2ICBpZD1cInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhY2tMaXN0U2VsZWN0Q29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3RyYWNrLWxpc3Qtc2VsZWN0LWNvbnRhaW5lcidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhY2tMaXN0U2VsZWN0Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3RyYWNrLWxpc3Qtc2VsZWN0JztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhY2tMaXN0U2VsZWN0QWN0aXZlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2FjdGl2ZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYWNrTGlzdFNlbGVjdEluYWN0aXZlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2luYWN0aXZlJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY2xvc2UtY2FwdGlvbi1idXR0b24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25BY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYWN0aXZlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uSW5hY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnaW5hY3RpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Nsb3NlLWNhcHRpb24tYnV0dG9uLWljb24gZmEgZmEtY2MnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNsb3NlQ2FwdGlvbkJ1dHRvbkljb25Db250ZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUGxheWVyU3BlY2lmaWNDb250cm9scyhvcHRzKSB7XHJcbiAgICAgICAgbGV0IHsgcGxheWVyIH0gPSBvcHRzO1xyXG4gICAgICAgIGxldCB7IHRleHRUcmFja3MgPSBbXSB9ID0gcGxheWVyO1xyXG4gICAgICAgIGxldCBodG1sID0gYGA7XHJcbiAgICAgICAgbGV0IHsgY29udGFpbmVyLCBjaGFwdGVyQnV0dG9uQ2xhc3NlcywgY2hhcHRlckxpc3RDbGFzc2VzIH0gPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodGV4dFRyYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFwdGVyRWxlbWVudCA9IHRoaXMuY3JlYXRlQ2hhcHRlckNvbnRhaW5lcih0ZXh0VHJhY2tzKTtcclxuICAgICAgICAgICAgbGV0IHRyYWNrU2VsZWN0RWxlbWVudCA9IHRoaXMuY3JlYXRlVHJhY2tTZWxlY3QodGV4dFRyYWNrcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcHRlckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY2hhcHRlckVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHJhY2tTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKHRyYWNrU2VsZWN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRyYWNrU2VsZWN0KHRleHRUcmFja3MpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgdHJhY2tMaXN0U2VsZWN0Q29udGFpbmVyQ2xhc3NlcywgdHJhY2tMaXN0U2VsZWN0Q2xhc3NlcyxcclxuICAgICAgICAgICAgdHJhY2tMaXN0U2VsZWN0QWN0aXZlQ2xhc3NlcywgdHJhY2tMaXN0U2VsZWN0SW5hY3RpdmVDbGFzc2VzLCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ29udGVudCxcclxuICAgICAgICAgICAgY2xvc2VDYXB0aW9uQnV0dG9uQ2xhc3NlcywgY2xvc2VDYXB0aW9uQnV0dG9uQWN0aXZlQ2xhc3NlcywgY2xvc2VDYXB0aW9uQnV0dG9uSW5hY3RpdmVDbGFzc2VzLCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ2xhc3Nlc1xyXG4gICAgICAgIH0gPSBzZWxmO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZVRyYWNrcyA9IEFycmF5LmZyb20odGV4dFRyYWNrcykucmVkdWNlKChjdXJyZW50TGFuZ3VhZ2VUcmFja3MsIHRleHRUcmFjaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGV4dFRyYWNrLmtpbmQgPT09ICdjYXB0aW9ucycgfHwgdGV4dFRyYWNrLmtpbmQgPT09ICdzdWJ0aXRsZXMnKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGFuZ3VhZ2VUcmFja3MgPSBjdXJyZW50TGFuZ3VhZ2VUcmFja3MuY29uY2F0KFt0ZXh0VHJhY2tdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZVRyYWNrcztcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGlmIChsYW5ndWFnZVRyYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFja0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IHRyYWNrTGlzdFNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICBsZXQgbGFuZ3VhZ2VTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgY2NUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgbGV0IGNjVG9nZ2xlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudChjY1RvZ2dsZSwgY2xvc2VDYXB0aW9uQnV0dG9uQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudChjY1RvZ2dsZUljb24sIGNsb3NlQ2FwdGlvbkJ1dHRvbkljb25DbGFzc2VzKTtcclxuXHJcbiAgICAgICAgICAgIGNjVG9nZ2xlSWNvbi5pbm5lckhUTUwgPSBjbG9zZUNhcHRpb25CdXR0b25JY29uQ29udGVudFxyXG5cclxuICAgICAgICAgICAgY2NUb2dnbGUuYXBwZW5kKGNjVG9nZ2xlSWNvbik7XHJcblxyXG4gICAgICAgICAgICBsYW5ndWFnZVRyYWNrcy5mb3JFYWNoKGxhbmd1YWdlVHJhY2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgc3JjbGFuZywgbGFiZWwsIHRyYWNrSWQsIG1vZGUgfSA9IGxhbmd1YWdlVHJhY2s7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFuZ3VhZ2VUcmFja09wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obGFuZ3VhZ2VUcmFja09wdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0cmFja0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogbGFiZWwgJiYgbGFiZWwubGVuZ3RoID4gMCA/IGxhYmVsIDogc3JjbGFuZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhY2tMaXN0U2VsZWN0LmFwcGVuZENoaWxkKGxhbmd1YWdlVHJhY2tPcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtb2RlID09PSAnc2hvd2luZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRyYWNrTGlzdFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHJhY2tJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRyYWNrTGlzdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRhcmdldCA9IHt9IH0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlOiB0cmFja0lkID0gXCJcIiB9ID0gdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQ3VycmVudFRyYWNrKHRyYWNrSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNjVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZTogdHJhY2tJZCB9ID0gdHJhY2tMaXN0U2VsZWN0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNJbmFjdGl2ZSA9IEVsZW1lbnRVdGlsaXRpZXMuaGFzQ2xhc3MoY2NUb2dnbGUsIGNsb3NlQ2FwdGlvbkJ1dHRvbkluYWN0aXZlQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50VXRpbGl0aWVzLnJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudCh0cmFja0xpc3RTZWxlY3QsIHRyYWNrTGlzdFNlbGVjdEluYWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5yZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQoY2NUb2dnbGUsIGNsb3NlQ2FwdGlvbkJ1dHRvbkluYWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5hZGRDbGFzc2VzVG9FbGVtZW50KHRyYWNrTGlzdFNlbGVjdCwgdHJhY2tMaXN0U2VsZWN0QWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5hZGRDbGFzc2VzVG9FbGVtZW50KGNjVG9nZ2xlLCBjbG9zZUNhcHRpb25CdXR0b25BY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUN1cnJlbnRUcmFjayh0cmFja0lkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5yZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQodHJhY2tMaXN0U2VsZWN0LCB0cmFja0xpc3RTZWxlY3RBY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50VXRpbGl0aWVzLnJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudChjY1RvZ2dsZSwgY2xvc2VDYXB0aW9uQnV0dG9uQWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5hZGRDbGFzc2VzVG9FbGVtZW50KHRyYWNrTGlzdFNlbGVjdCwgdHJhY2tMaXN0U2VsZWN0SW5hY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50VXRpbGl0aWVzLmFkZENsYXNzZXNUb0VsZW1lbnQoY2NUb2dnbGUsIGNsb3NlQ2FwdGlvbkJ1dHRvbkluYWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VDdXJyZW50VHJhY2soXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5hZGRDbGFzc2VzVG9FbGVtZW50KHRyYWNrTGlzdFNlbGVjdCwgdHJhY2tMaXN0U2VsZWN0Q2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudCh0cmFja0xpc3RTZWxlY3QsIGxhbmd1YWdlU2VsZWN0ZWQgPyB0cmFja0xpc3RTZWxlY3RBY3RpdmVDbGFzc2VzIDogdHJhY2tMaXN0U2VsZWN0SW5hY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5hZGRDbGFzc2VzVG9FbGVtZW50KHRyYWNrTGlzdENvbnRhaW5lciwgdHJhY2tMaXN0U2VsZWN0Q29udGFpbmVyQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudChjY1RvZ2dsZSwgbGFuZ3VhZ2VTZWxlY3RlZCA/IGNsb3NlQ2FwdGlvbkJ1dHRvbkFjdGl2ZUNsYXNzZXMgOiBjbG9zZUNhcHRpb25CdXR0b25JbmFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICB0cmFja0xpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY2NUb2dnbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxhbmd1YWdlVHJhY2tzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0cmFja0xpc3RTZWxlY3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tMaXN0Q29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBjcmVhdGVDaGFwdGVyQ29udGFpbmVyKHRleHRUcmFja3MpIHtcclxuICAgICAgICBsZXQgeyBjaGFwdGVyQnV0dG9uQ2xhc3NlcywgY2hhcHRlckxpc3RDbGFzc2VzLCBjaGFwdGVyQWN0aXZlQ2xhc3NlcywgY2hhcHRlckluQWN0aXZlQ2xhc3NlcywgY2hhcHRlckxpc3RJdGVtQ2xhc3NlcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgY2hhcHRlclRyYWNrID0gQXJyYXkuZnJvbSh0ZXh0VHJhY2tzKS5maW5kKHRleHRUcmFjayA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0VHJhY2sua2luZCA9PT0gJ2NoYXB0ZXJzJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChjaGFwdGVyVHJhY2spIHtcclxuICAgICAgICAgICAgbGV0IGNoYXB0ZXJMaXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xyXG4gICAgICAgICAgICBsZXQgeyBjdWVzID0gW10gfSA9IGNoYXB0ZXJUcmFjaztcclxuXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oY3VlcykuZm9yRWFjaCgoY3VlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgaWQsIHRleHQsIHN0YXJ0VGltZSB9ID0gY3VlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXB0ZXJDb250YWluZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcHRlckJ1dHRvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhcHRlckJ1dHRvbkVsLmlkID0gYCR7aWR9LXNlbGVjdGA7XHJcbiAgICAgICAgICAgICAgICBjaGFwdGVyQnV0dG9uRWwuY2xhc3NOYW1lID0gY2hhcHRlckJ1dHRvbkNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjaGFwdGVyQnV0dG9uRWwuaW5uZXJIVE1MID0gdGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFwdGVyQ29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoY2hhcHRlckJ1dHRvbkVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFwdGVyQ29udGFpbmVyRWwuaWQgPSBpZDtcclxuICAgICAgICAgICAgICAgIGNoYXB0ZXJDb250YWluZXJFbC5jbGFzc05hbWUgPSBgJHtjaGFwdGVyTGlzdEl0ZW1DbGFzc2VzfSAke2luZGV4ID09PSAwID8gY2hhcHRlckFjdGl2ZUNsYXNzZXMgOiBjaGFwdGVySW5BY3RpdmVDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhcHRlckxpc3RFbC5hcHBlbmRDaGlsZChjaGFwdGVyQ29udGFpbmVyRWwpO1xyXG4gICAgICAgICAgICAgICAgY2hhcHRlckJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VlayhzdGFydFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY2hhcHRlckxpc3RFbC5jbGFzc05hbWUgPSBjaGFwdGVyTGlzdENsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY2hhcHRlckxpc3RFbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcblxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHNjcnViQmFySFRNTCxcclxuICAgICAgICAgICAgdGltZXN0YW1wSFRNTCxcclxuICAgICAgICAgICAgbXV0ZUJ1dHRvbkhUTUwsXHJcbiAgICAgICAgICAgIHZvbHVtZUJhckhUTUxcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICR7cGxheVBhdXNlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAgICAke3RpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgICAgJHttdXRlQnV0dG9uSFRNTH1cclxuICAgICAgICAgICAke3ZvbHVtZUJhckhUTUx9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFuY2hvciBhcyBEZWZhdWx0QW5jaG9yIH0gZnJvbSAnLi4vZGVmYXVsdC9hbmNob3IuanMnO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRGVmYXVsdEFuY2hvcntcblx0Y29uc3RydWN0b3IoYW5jaG9ySW5mbyl7XG5cdFx0c3VwZXIoYW5jaG9ySW5mbyk7XG5cdH1cbn0iLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcbmltcG9ydCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb25zdGFudHMvZmlyZWJhc2UuYXV0aGVudGljYXRpb24uanNcIjtcbmltcG9ydCB7IElucHV0Q29udHJvbGxlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2lucHV0LWNvbnRyb2xsZXIuanMnO1xuXG5sZXQgRmlyZWJhc2VBdXRoZW50aWNhdGlvbkNvbnN0YW50cyA9IG5ldyBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uKCk7XG5cbmNsYXNzIEZpbGVJbnB1dENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xuICAgICAgIFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICB9XG5cbiAgIFxufVxuXG5GaWxlSW5wdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdpVlhqcycsICdpdnhqcy5hY3Rpb25zJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihGaWxlSW5wdXRDb250cm9sbGVyKSIsImltcG9ydCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMnO1xuaW1wb3J0IEZpcmViYXNlQXV0aGVudGljYXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50cy9maXJlYmFzZS5hdXRoZW50aWNhdGlvbi5qc1wiO1xuaW1wb3J0IHsgSW5wdXRDb250cm9sbGVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyc7XG5cbmxldCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uQ29uc3RhbnRzID0gbmV3IEZpcmViYXNlQXV0aGVudGljYXRpb24oKTtcbmNsYXNzIFBhc3N3b3JkSW5wdXRDb250cm9sbGVyIGV4dGVuZHMgSW5wdXRDb250cm9sbGVySGVscGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGlWWGpzLCBpVlhqc0FjdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBpVlhqcywgaVZYanNBY3Rpb25zKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2V0UGFzc3dvcmQgPSAoaW5wdXRWYWx1ZSkgPT57XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaVZYanMuQnVzLm9uY2UoRmlyZWJhc2VBdXRoZW50aWNhdGlvbkNvbnN0YW50cy5SRVFVRVNUX1BBU1NXT1JELCAoKSA9PntcbiAgICAgICAgICAgIGlWWGpzLkJ1cy5lbWl0KEZpcmViYXNlQXV0aGVudGljYXRpb25Db25zdGFudHMuR0VUX1BBU1NXT1JELCBzZWxmLnBhc3N3b3JkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5QYXNzd29yZElucHV0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnaVZYanMnLCAnaXZ4anMuYWN0aW9ucyddO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oUGFzc3dvcmRJbnB1dENvbnRyb2xsZXIpIiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XG5pbXBvcnQgRmlsZUlucHV0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9pbnB1dC5maWxlLmpzJztcblxuY2xhc3MgRmlsZUlucHV0IHtcbiAgICBjb25zdHJ1Y3RvcigkY29tcGlsZSwgJGZpbHRlciwgJGh0dHAsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBpVlhqc0FjdGlvbnMsIHB1bGxJblRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlSFRNTDtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeaXZ4anNGb3JtSW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlucHV0RGF0YTogJz1pbnB1dERhdGEnXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRmlsZUlucHV0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndm0nO1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGxldCB7aW5wdXREYXRhOiBpbnB1dH0gPSAkc2NvcGU7XG4gICAgICAgICAgICBsZXQge2lkLCBuYW1lLCBlcnJvcnMgPSB7fSwgbGFiZWxIVE1MLCBsYWJlbCA9ICRmaWx0ZXIoJ3N0cmluZ1BhcnNlcnMnKSgnc3RhcnRDYXNlJywgaWQpLCBhdHRyaWJ1dGVzID0ge30sIHR5cGUsIHNldHRpbmdzID0ge319ID0gaW5wdXQ7XG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGBvbmNoYW5nZT1cImFuZ3VsYXIuZWxlbWVudCh0aGlzKS5zY29wZSgpLmZpbGVOYW1lQ2hhbmdlZCh0aGlzKVwiIG5nLW1vZGVsPVwiaW5wdXRWYWx1ZVwiYFxuXG4gICAgICAgICAgICBpbnB1dC5sYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xuICAgICAgICAgICAgaW5wdXQgPSBwdWxsSW5UZW1wbGF0ZS5jb252ZXJ0TGFiZWwoJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGlucHV0LCAkc2NvcGUpO1xuXG4gICAgICAgICAgICBsZXQgdWlGaWxlT2JqID0ge1xuICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgdGFnczogdGFnSFRNTFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBmaWxlID0gbmV3IGlWWGpzVUlNb2R1bGUuZmlsZSh1aUZpbGVPYmopO1xuXG4gICAgICAgICAgICBpRWxtLmh0bWwoZmlsZS5odG1sKTtcblxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZmlsZU5hbWVDaGFuZ2VkID0gKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlWWGpzLmV4cGVyaWVuY2UudXBsb2FkRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXMgPSBlbC5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bU9mRmlsZXMgPSBmaWxlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZkZpbGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZVByb21pc2UgPSBpVlhqcy5leHBlcmllbmNlLnVwbG9hZEZpbGUoZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtmaWxlUHJvbWlzZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge29uQ2hhbmdlID0gW10sIG5hbWU6aW5wdXROYW1lfSA9IGlucHV0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudE5hbWVcIjogXCJzZXREYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyZ3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IGlucHV0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZpbGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpVlhqc0FjdGlvbnMucmVzb2x2ZUFjdGlvbnMob25DaGFuZ2UsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIVE1MKCkge1xuICAgICAgICByZXR1cm4gYDxkaXY+PC9kaXY+YDtcbiAgICB9O1xufVxuXG5GaWxlSW5wdXQuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJGZpbHRlcicsICckaHR0cCcsICdpVlhqcycsICdpdnhqcy5tb2R1bGVzLnVpJywgJ2l2eGpzLmFjdGlvbnMnLCAncHVsbEluVGVtcGxhdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKEZpbGVJbnB1dCk7IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XG5pbXBvcnQgUGFzc3dvcmRJbnB1dENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvaW5wdXQucGFzc3dvcmQuanMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL21lc3NhZ2VzLmVycm9yLmpzJztcblxuY2xhc3MgUGFzc3dvcmRJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoJGNvbXBpbGUsICRmaWx0ZXIsIGlWWGpzLCBpVlhqc1VJTW9kdWxlLCBwdWxsSW5UZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZUhUTUw7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXml2eGpzRm9ybUlucHV0XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpbnB1dERhdGE6ICc9aW5wdXREYXRhJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBhc3N3b3JkSW5wdXRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHtpbnB1dERhdGE6IGlucHV0fSA9ICRzY29wZTtcbiAgICAgICAgICAgIGxldCB7aWQsIG5hbWUsIGVycm9ycyA9IHt9LCBsYWJlbEhUTUwsIGxhYmVsID0gJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGF0dHJpYnV0ZXMgPSB7fSwgdHlwZSwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dDtcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMoaW5wdXQsIGVycm9ycywgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBsZXQgdGFnSFRNTCA9IGBuZy1jaGFuZ2U9XCJ2bS5zZXRQYXNzd29yZChpbnB1dFZhbHVlKVwiIG5nLW1vZGVsPVwiaW5wdXRWYWx1ZVwiYFxuXG4gICAgICAgICAgICBpbnB1dC5sYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xuICAgICAgICAgICAgaW5wdXQgPSBwdWxsSW5UZW1wbGF0ZS5jb252ZXJ0TGFiZWwoJGZpbHRlcignc3RyaW5nUGFyc2VycycpKCdzdGFydENhc2UnLCBpZCksIGlucHV0LCAkc2NvcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdWlQYXNzd29yZE9iaiA9IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHNldHRpbmdzLFxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ0hUTUwsXG4gICAgICAgICAgICAgICAgZXJyb3JzOiBlcnJvck1lc3NhZ2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gbmV3IGlWWGpzVUlNb2R1bGUucGFzc3dvcmQodWlQYXNzd29yZE9iaik7XG5cbiAgICAgICAgICAgIGlFbG0uaHRtbChwYXNzd29yZC5odG1sKTtcblxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2PjwvZGl2PmA7XG4gICAgfTtcbn1cblxuUGFzc3dvcmRJbnB1dC4kaW5qZWN0ID0gWyckY29tcGlsZScsICckZmlsdGVyJywgJ2lWWGpzJywgJ2l2eGpzLm1vZHVsZXMudWknLCAncHVsbEluVGVtcGxhdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKFBhc3N3b3JkSW5wdXQpOyIsImltcG9ydCB7IEJ1dHRvbnMgYXMgRGVmYXVsdEJ1dHRvbnMgfSBmcm9tICcuLi9kZWZhdWx0L2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIGV4dGVuZHMgRGVmYXVsdEJ1dHRvbnMge1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucywgaW5wdXQpIHtcclxuICAgICAgICBzdXBlcihidXR0b25zLCBpbnB1dCwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBidXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuJztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDaGVja2JveCBhcyBEZWZhdWx0Q2hlY2tib3ggfSBmcm9tICcuLi9kZWZhdWx0L2NoZWNrYm94LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBEZWZhdWx0Q2hlY2tib3gge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2NoZWNrYm94IGZvcm0tY29udHJvbCdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbH0gPSBpbnB1dDtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyBsZWZ0OjA7IHotaW5kZXg6OTk5OTsgbWFyZ2luOjE3cHggMjZweDsgY3Vyc29yOnBvaW50ZXI7XCIgdHlwZT1cImNoZWNrYm94XCIgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aW5wdXQuaWR9XCI+ICR7bGFiZWx9PC9sYWJlbD4gICBcclxuICAgICAgICBgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRlIGFzIERlZmF1bHREYXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRlLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZSBleHRlbmRzIERlZmF1bHREYXRle1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkYXRlcGlja2VyJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYWJlbENsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2FjdGl2ZSc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRldGltZUxvY2FsIGFzIERlZmF1bHREYXRldGltZUxvY2FsIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwgZXh0ZW5kcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZGF0ZXBpY2tlcidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGFiZWxDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW1haWwgYXMgRGVmYXVsdEVtYWlsIH0gZnJvbSAnLi4vZGVmYXVsdC9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsIGV4dGVuZHMgRGVmYXVsdEVtYWlse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJcbmV4cG9ydCBjbGFzcyBGaWxle1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9fSA9IGlucHV0T2JqO1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgIH0gXG5cbiAgIFxuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAndmFsaWRhdGUnXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlcyA9XCJcIn0gPSB0aGlzO1xuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XG5cbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XG5cbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XG5cbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLWZpZWxkIGlucHV0LWZpZWxkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XG4gICAgICAgIDxzcGFuPkZpbGU8L3NwYW4+XG4gICAgICAgIDxpbnB1dCBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiB0eXBlPVwiZmlsZVwiICR7dGFnc30+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiID5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIGFzIERlZmF1bHRGb3JtIH0gZnJvbSAnLi4vZGVmYXVsdC9mb3JtLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgRGVmYXVsdEZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBTdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcm1DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY29sIHMxMidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcbn0iLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi9hbmNob3IuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtLmpzJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5qcyc7XHJcbmltcG9ydCB7IEJ1dHRvbnMgfSBmcm9tICcuL2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9ucy5qc1wiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBQYXNzd29yZCB9IGZyb20gJy4vcGFzc3dvcmQuanMnO1xyXG5pbXBvcnQgeyBGaWxlIH0gZnJvbSBcIi4vZmlsZS5qc1wiO1xyXG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gXCIuL3JhbmdlLmpzXCI7XHJcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnLi9yYWRpby5qcyc7XHJcbmltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGUuanNcIjtcclxuaW1wb3J0IHsgTnVtYmVyIH0gZnJvbSAnLi9udW1iZXIuanMnO1xyXG5pbXBvcnQgeyBFbWFpbCB9IGZyb20gJy4vZW1haWwuanMnO1xyXG5pbXBvcnQgeyBEYXRlIH0gZnJvbSAnLi9kYXRlLmpzJztcclxuaW1wb3J0IHsgVXJsIH0gZnJvbSAnLi91cmwuanMnO1xyXG5pbXBvcnQgeyBEYXRldGltZUxvY2FsIH0gZnJvbSAnLi9kYXRldGltZS1sb2NhbC5qcyc7XHJcblxyXG5pbXBvcnQgaXZ4anNQYXNzd29yZElucHV0IGZyb20gXCIuL2FuZ3VsYXIvZGlyZWN0aXZlcy9pbnB1dC5wYXNzd29yZC5qc1wiO1xyXG5pbXBvcnQgaXZ4anNGaWxlSW5wdXQgZnJvbSBcIi4vYW5ndWxhci9kaXJlY3RpdmVzL2lucHV0LmZpbGUuanNcIjtcclxuXHJcblxyXG4vL1N0YXRlc1xyXG5pbXBvcnQgeyBJbnB1dFN0YXRlIH0gZnJvbSAnLi9zdGF0ZS5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IFZpZGVvU3RhdGUgfSBmcm9tICcuL3N0YXRlLnZpZGVvLmpzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblN0YXRlIH0gZnJvbSAnLi9zdGF0ZS5uYXZpZ2F0aW9uLmpzJztcclxuXHJcbi8vQ29udHJvbHMgXHJcbmltcG9ydCBWaWRlb0NvbnRyb2xzIGZyb20gJy4vdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsaXplVUkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hbmNob3IgPSBBbmNob3I7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gRm9ybTtcclxuICAgICAgICB0aGlzLnRleHQgPSBUZXh0O1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IEJ1dHRvbnM7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gRGF0ZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gUGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5maWxlID0gRmlsZVxyXG4gICAgICAgIHRoaXMuZGF0ZXRpbWVMb2NhbCA9IERhdGV0aW1lTG9jYWw7XHJcbiAgICAgICAgdGhpcy5jaGVja2JveCA9IENoZWNrYm94O1xyXG4gICAgICAgIHRoaXMudmlkZW9Db250cm9scyA9IFZpZGVvQ29udHJvbHM7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT3B0aW9ucztcclxuICAgICAgICB0aGlzLmVtYWlsID0gRW1haWw7XHJcbiAgICAgICAgdGhpcy51cmwgPSBVcmw7XHJcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IFRleHRhcmVhO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSBSYW5nZTtcclxuICAgICAgICB0aGlzLnJhZGlvID0gUmFkaW87XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMubnVtYmVyID0gTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBpbnB1dDogSW5wdXRTdGF0ZSxcclxuICAgICAgICAgICAgdmlkZW86IFZpZGVvU3RhdGUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IE5hdmlnYXRpb25TdGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFyID0ge1xyXG4gICAgICAgICAgICBpdnhqc1Bhc3N3b3JkSW5wdXQ6IGl2eGpzUGFzc3dvcmRJbnB1dCxcclxuICAgICAgICAgICAgaXZ4anNGaWxlSW5wdXQ6IGl2eGpzRmlsZUlucHV0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVJbnB1dCgpIHtcclxuICAgICAgICAkKCdzZWxlY3QnKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgICAgICAgJCgnLmRhdGVwaWNrZXInKS5waWNrYWRhdGUoe1xyXG4gICAgc2VsZWN0TW9udGhzOiB0cnVlLCAvLyBDcmVhdGVzIGEgZHJvcGRvd24gdG8gY29udHJvbCBtb250aFxyXG4gICAgc2VsZWN0WWVhcnM6IDE1IC8vIENyZWF0ZXMgYSBkcm9wZG93biBvZiAxNSB5ZWFycyB0byBjb250cm9sIHllYXJcclxuICB9KTtcclxuICAgICBcclxuICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaW5pdGlhbGl6ZU1hdGVyaWFsaXplVUk7XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudWkubWF0ZXJpYWxpemUnLCBpbml0aWFsaXplTWF0ZXJpYWxpemVVSSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVNYXRlcmlhbGl6ZVVJKHNldHRpbmdzKSB7XHJcbiAgICByZXR1cm4gTWF0ZXJpYWxpemVVSTtcclxufTsiLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VzIGFzIERlZmF1bHRFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4uL2RlZmF1bHQvbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIGV4dGVuZHMgRGVmYXVsdEVycm9yTWVzc2FnZXMge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JNZXNzYWdlcyA9IFtdKXsgICAgICAgXHJcbiAgICAgICBzdXBlcihlcnJvck1lc3NhZ2VzKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2hhcy1lcnJvcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtZXNzYWdlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnaGVscC1ibG9jayc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBOdW1iZXIgYXMgRGVmYXVsdE51bWJlciB9IGZyb20gJy4uL2RlZmF1bHQvbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgRGVmYXVsdE51bWJlcntcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgT3B0aW9ucyBhcyBEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4uL2RlZmF1bHQvb3B0aW9ucy5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnMgZXh0ZW5kcyBEZWZhdWx0T3B0aW9uc3tcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG5cclxuICAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgICAgJHtvcHRpb25zSFRNTH1cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gXHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHQgYXMgRGVmYXVsdFRleHQgfSBmcm9tICcuLi9kZWZhdWx0L3RleHQuanMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZCBleHRlbmRzIERlZmF1bHRUZXh0e1xuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxuICAgIH0gXG5cbiAgIFxuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAndmFsaWRhdGUnXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcblxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcblxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xuXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xuXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xuXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aW5wdXQgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJwYXNzd29yZFwiICAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxuICAgICAgICAgICBcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke25hbWV9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XG4gICAgICAgYDtcblxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XG4gICAgfVxufSIsImltcG9ydCB7IFJhZGlvIGFzIERlZmF1bHRSYWRpbyB9IGZyb20gJy4uL2RlZmF1bHQvcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIERlZmF1bHRSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFkaW8gZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG5cclxuICAgICB1aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgdWlDbGFzc2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICA8cD5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L3A+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIHZhbHVlKXsgICAgIFxyXG4gICAgICAgIGxldCB7aWR9ID0gdGhpcy5pbnB1dDsgICBcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICAgICAgPGlucHV0IG5hbWU9XCIke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyt2YWx1ZTogJyd9XCJcIiB0eXBlPVwicmFkaW9cIiBpZD1cIiR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nK3ZhbHVlOiAnJ31cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nK3ZhbHVlOiAnJ31cIj4ke2xhYmVsfTwvbGFiZWw+XHJcbiAgICAgICAgYDsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcywgdGFnczogZXJyb3JUYWdzID0gXCJcIn0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IGlucHV0TGFiZWwsIGxhYmVsSFRNTDogaW5wdXRMYWJsZUhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge25hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dExhYmxlSFRNTCkgaW5wdXRMYWJlbCA9IGlucHV0TGFibGVIVE1MO1xyXG5cclxuICAgICAgICBsZXQgcmFkaW9zSFRNTCA9IHJhZGlvcy5yZWR1Y2UoKGh0bWwsIHJhZGlvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2xhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gJycsIHZhbHVlfSA9IHJhZGlvO1xyXG5cclxuICAgICAgICAgICAgYXR0ckhUTUwgPSBgJHthdHRySFRNTH0gJHtlcnJvclRhZ3N9YDtcclxuXHJcbiAgICAgICAgICAgIGxldCByYWRpb0hUTUwgPSBzZWxmLnJlbmRlclJhZGlvSFRNTChhdHRySFRNTCwgbGFiZWwsIGlucHV0LnJhZGlvQnV0dG9uc1tpbmRleF0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9XHJcbiAgICAgICAgICAgICR7c2VsZi51aVJhZGlvQnV0dG9uQ29udGFpbmVyKHJhZGlvSFRNTCwgYCR7dWlDbGFzc2VzfSAke2NsYXNzZXN9YCl9YDtcclxuICAgICAgICB9LCBpbnB1dExhYmVsKTtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxSYWRpb0J1dHRvbnNIVE1MID0gYFxyXG4gICAgICAgICAgICAgJHtyYWRpb3NIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudWlSYWRpb0dyb3VwKGFsbFJhZGlvQnV0dG9uc0hUTUwpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xuaW1wb3J0IHtBdHRyaWJ1dGVUYWdzfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbnVtYmVyIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgbnVtYmVycyAgXG4gKiBmb3IgaVZYanMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYW5nZSB7XG5cbiAgICAvKipcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxuICAgICAqIG1lc3NhZ2VzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XG4gICAgICAgICogQHR5cGUge29iamVjdH0gIFxuICAgICAgICAqL1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcbiAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXG4gICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XG4gICAgICAgICovXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgbnVtYmVyIGlucHV0cyBcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldCB1aUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICovXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXG4gICAgICogXG4gICAgICogQGV4YW1wbGUgXG4gICAgICogLy9EYXRhIFxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XG4gICAgICogTnVtYmVyLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XG4gICAgICogICAgIFwic3RlcFwiIDogXCIwLjFcIlxuICAgICAqIH1cbiAgICAgKiAvLyBSZW5kZXJzIFxuICAgICAqIDxsYWJlbD5cbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XG4gICAgICogPC9sYWJlbD5cbiAgICAgKiA8aW5wdXQgc3RlcD1cIjAuMVwiIGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwibnVtYmVyXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xuXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xuICAgICAgICBcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcblxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcblxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcbiAgICAgICAgXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgPHAgY2xhc3M9XCJyYW5nZS1maWVsZFwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwicmFuZ2VcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XG4gICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7bmFtZX1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxuICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBJbnB1dFN0YXRlIGFzIERlZmF1bHRJbnB1dFN0YXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSBleHRlbmRzIERlZmF1bHRJbnB1dFN0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihoZWFkZXIsIGZvcm1TZWN0aW9uLCBmb290ZXIsIGRhdGEpe1xyXG4gICAgICAgIHN1cGVyKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05hdmlnYXRpb25TdGF0ZSBhcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIGV4dGVuZHMgRGVmYXVsdE5hdmlnYXRpb25TdGF0ZSB7ICAgICBcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbil7XG4gICAgICAgIHN1cGVyKGRhdGEsIGxpbmtTZWN0aW9uKTtcbiAgICB9XG59OyIsImV4cG9ydCBjbGFzcyBWaWRlb1N0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJTZWN0aW9uLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnBsYXllclNlY3Rpb24gPSBwbGF5ZXJTZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBpUGhvbmVJbmxpbmVDbGFzc2VzKCl7XHJcbiAgICAgICAgbGV0IHtpc0lwaG9uZSA9IGZhbHNlfSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzSXBob25lID8gJ2lwaG9uZS1pbmxpbmUnIDogJyc7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgaGVhZGVyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGh0bWwoKSB7ICAgXHJcbiAgICAgICAgbGV0IHtwbGF5ZXJTZWN0aW9uLCBkYXRhLCBpUGhvbmVJbmxpbmVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbCA6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb250YWluZXIgJHtzZWN0aW9uQ2xhc3Nlc30gJHtpUGhvbmVJbmxpbmVDbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHt0aGlzLmRlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7cGxheWVyU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aFRvdGFsID0gMC4wO1xyXG4gICAgICAgIGxldCBjb2x1bW5OYW1lcyA9IFtcImNvbCBzMVwiLCBcImNvbCBzMlwiLCBcImNvbCBzM1wiLCBcImNvbCBzNFwiLCBcImNvbCBzNVwiLCBcImNvbCBzNlwiLCBcImNvbCBzN1wiLCBcImNvbCBzOFwiLCBcImNvbCBzOVwiICxcImNvbCBzMTBcIiwgXCJjb2wgczExXCIsIFwiY29sIHMxMlwiXVxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0SFRNTC5yZWR1Y2UoKGNvbnRlbnRIVE1MLCB0aGlzSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5nc30gPSB0aGlzSW5wdXQ7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSBcIjFcIiwgY2xhc3Nlcz0gJyd9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCBudW1lcmljV2lkdGggPSBnZXROdW1lcmljV2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PGRpdiBjbGFzcz1cInJvd1wiPiBgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRXaWR0aFRvdGFsICs9IG51bWVyaWNXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBib290c3RyYXBXaWR0aFN0eWxlTmFtZSA9IGNvbHVtbk5hbWVzW01hdGgucm91bmQobnVtZXJpY1dpZHRoICogY29sdW1uTmFtZXMubGVuZ3RoKSAtIDFdO1xyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCdpdnhqcy1ncmlkLTEtMScsIGBpbnB1dC1maWVsZCAke2Jvb3RzdHJhcFdpZHRoU3R5bGVOYW1lfSAke2NsYXNzZXN9YCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9JHtodG1sfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudEhUTUw7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNvbnRlbnRzLnN1YnN0cmluZyhjb250ZW50cy5sZW5ndGggLSA3KSAhPT0gXCI8L2Rpdj5cIil7XHJcbiAgICAgICAgICAgIGNvbnRlbnRzID0gYCR7Y29udGVudHN9PC9kaXY+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXROdW1lcmljV2lkdGgod2lkdGhTdHJpbmcpe1xyXG4gICAgICAgICAgICBpZih3aWR0aFN0cmluZyA9PT0gJzEnKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwYXJzZWRXaWR0aEZvcm11bGEgPSB3aWR0aFN0cmluZy5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzBdKSAvIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBUZXh0IGFzIERlZmF1bHRUZXh0IH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIERlZmF1bHRUZXh0e1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcblxyXG4gICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd2YWxpZGF0ZSdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxpbnB1dCAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInRleHRcIiAgICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHRhcmVhIGFzIERlZmF1bHRUZXh0YXJlYSB9IGZyb20gJy4uL2RlZmF1bHQvdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIERlZmF1bHRUZXh0YXJlYXtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdtYXRlcmlhbGl6ZS10ZXh0YXJlYSdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFVybCBhcyBEZWZhdWx0VXJsIH0gZnJvbSAnLi4vZGVmYXVsdC91cmwuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwgZXh0ZW5kcyBEZWZhdWx0VXJse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRGVmYXVsdFZpZGVvQ29udHJvbHMgZnJvbSAnLi4vZGVmYXVsdC92aWRlby5jb250cm9scy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIERlZmF1bHRWaWRlb0NvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaVZYanNCdXMpIHtcclxuICAgICAgICBzdXBlcihjb250YWluZXIsIGlWWGpzQnVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncGxheV9hcnJvdyc7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgZ2V0IHBhdXNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3BhdXNlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3ZvbHVtZV91cCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndm9sdW1lX29mZic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2J0bi1mbG9hdGluZyB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgZ3JlZW4nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuLWZsb2F0aW5nIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBncmV5JztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFuZ2UtZmllbGQnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBiYXJgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCJwcm9ncmVzcyAke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGVybWluYXRlIGJhclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgJHt0aGlzLnRpbWVzdGFtcEhUTUx9XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuICBcclxuICAgIGdldCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZGV0ZXJtaW5hdGUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCJwcm9ncmVzcyAke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJCdXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY2hhcHRlci1idXR0b24gYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJBY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBcImFjdGl2ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjaGFwdGVySW5BY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBcImluYWN0aXZlXCJcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhY2tMaXN0U2VsZWN0Q29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3RyYWNrLWxpc3Qtc2VsZWN0LWNvbnRhaW5lciBpbnB1dC1maWVsZCdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhY2tMaXN0U2VsZWN0Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3RyYWNrLWxpc3Qtc2VsZWN0IGJyb3dzZXItZGVmYXVsdCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYWNrTGlzdFNlbGVjdEFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0xpc3RTZWxlY3RJbmFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdpbmFjdGl2ZSdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Nsb3NlLWNhcHRpb24tYnV0dG9uIGJ0bi1mbG9hdGluZyB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25BY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYWN0aXZlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uSW5hY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnaW5hY3RpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Nsb3NlLWNhcHRpb24tYnV0dG9uLWljb24gY2xvc2VkIG1hdGVyaWFsLWljb25zJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ29udGVudCgpe1xyXG4gICAgICAgIHJldHVybiBcImNsb3NlZF9jYXB0aW9uXCJcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRqdXN0Vm9sdW1lKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHt2b2x1bWVCYXIsIG11dGVDb250cm9scywgY3VycmVudFZvbHVtZSwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIG11dGVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtvZmZzZXRXaWR0aDogd2lkdGggfSA9IHZvbHVtZUJhcjtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbih2b2x1bWVCYXIpO1xyXG4gICAgICAgIGxldCB7eDogYWJzb2x1dGVYfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCB2b2x1bWVMZXZlbCA9ICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgW1wibWF0ZXJpYWwtaWNvbnNcIl0pO1xyXG5cclxuICAgICAgICBtdXRlSWNvbi5pbm5lckhUTUwgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dm9sdW1lTGV2ZWwgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IHZvbHVtZUxldmVsO1xyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKHZvbHVtZUxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheVBhdXNlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7cGxheUNsYXNzZXMgOiBwbGF5LCBwYXVzZUNsYXNzZXMgOiBwYXVzZX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHNDbGFzc2VzIDogcGxheVBhdXNlQ29udHJvbHN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJwbGF5LWJ1dHRvbi1jb250YWluZXJcIiAgY2xhc3M9XCJsZWZ0LWFsaWduXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIgY2xhc3M9XCIke3BsYXlQYXVzZUNvbnRyb2xzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9J21hdGVyaWFsLWljb25zJz4ke3BsYXl9PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWVzdGFtcEhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXItYWxpZ25cIj5cclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLWN1cnJlbnQtdGltZVwiIGNsYXNzPVwiJHt0aGlzLmN1cnJlbnRUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiIGNsYXNzPVwiJHt0aGlzLnRvdGFsVGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXlQYXVzZShldmVudCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXTtcclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbiwgW1wibWF0ZXJpYWwtaWNvbnNcIl0pO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHBsYXlQYXVzZUljb24uaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgICAgIGNhc2UgcGxheUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmlubmVySFRNTCA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHBhdXNlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uaW5uZXJIVE1MID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE11dGUoZXZlbnQpIHtcclxuICAgICAgICBsZXQge211dGVDb250cm9scywgbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIHZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgW1wibWF0ZXJpYWwtaWNvbnNcIl0pO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG11dGVJY29uLmlubmVySFRNTCkge1xyXG4gICAgICAgICAgICBjYXNlIHVubXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5pbm5lckhUTUwgPSBtdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYDAlYDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBtdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmlubmVySFRNTCA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3RoaXMuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5aW5nKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgW1wibWF0ZXJpYWwtaWNvbnNcIl1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmlubmVySFRNTCA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QYXVzZWQoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBbXCJtYXRlcmlhbC1pY29uc1wiXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uaW5uZXJIVE1MID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7dW5tdXRlQ2xhc3NlcyA6IHVubXV0ZSwgbXV0ZUNvbnRyb2xzQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cIm11dGUtYnV0dG9uLWNvbnRhaW5lclwiIGNsYXNzPVwibGVmdC1hbGlnblwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiIGNsYXNzPVwiJHttdXRlQ29udHJvbHNDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICA8aSBjbGFzcz0nbWF0ZXJpYWwtaWNvbnMnPiR7dW5tdXRlfTwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQnV0dG9uSFRNTCwgc2NydWJCYXJIVE1MLCB0aW1lc3RhbXBIVE1MLCBtdXRlQnV0dG9uSFRNTCwgdm9sdW1lQmFySFRNTH0gPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICR7c2NydWJCYXJIVE1MfVxyXG4gICAgICAgICR7cGxheVBhdXNlQnV0dG9uSFRNTH1cclxuICAgICAgICAke3ZvbHVtZUJhckhUTUx9ICBcclxuICAgICAgICAke211dGVCdXR0b25IVE1MfSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBgXHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IHdpdGggYXR0cmlidXRlcyBhbmQga2V5cyBpbnRvIEhUTUxcclxuICogdGhhdCBpbnB1dHMgY2FuIGJlIHVzZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlVGFncyB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUHVsbHMgYWxsIHRoZSBhdHRyaWJ1dGUgc2V0dGluZ3MgYW5kIHRoZSBhdHRyaWJ1dGVzIFxyXG4gICAgICogdG8gYmUgcmVuZGVyZWQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlRGF0YSAtIHNldHRpbmdzIGZvciBhbGwgdGhlIGF0dHJpYnV0ZXMuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhdHRyaWJ1dGVLZXlzIC0gYXR0cmlidXRlIG5hbWVzIHRvIGJlIHNldC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXR0cmlidXRlRGF0YSA9IHt9LCBhdHRyaWJ1dGVLZXlzID0gW10pe1xyXG4gICAgICAgXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIEFsbCBhdHRyaWJ1dGVzIHRvIGJlIG1hZGUuXHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZURhdGEgPSBhdHRyaWJ1dGVEYXRhO1xyXG4gICAgICAgXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIEF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgKi9cclxuICAgICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IGF0dHJpYnV0ZUtleXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGF0dHJpYnV0ZXMgYmFzZWQgb24gdGhlIGtleXMgYW5kIGF0dHJpYnV0ZSBkYXRhLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGF0dHJpYnV0ZURhdGEgPSB7IHJlcXVpcmVkID0gXCJ0cnVlXCJ9O1xyXG4gICAgICogYXR0cmlidXRlS2V5cyA9IFtcInJlcXVpcmVkXCJdO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBCZWNvbWVzOiBcclxuICAgICAqIGh0bWwgPSAncmVxdWlyZWQgPSBcInRydWVcIidcclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBsZXQge2F0dHJpYnV0ZUtleXMsIGF0dHJpYnV0ZURhdGF9ID0gdGhpcztcclxuICAgICAgICBsZXQgYXR0cmlidXRlSFRNTCA9IGF0dHJpYnV0ZUtleXMucmVkdWNlKCAoY3VycmVudEF0dHJpYnV0ZUhUTUwsIGN1cnJlbnRLZXkpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYoYXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlVGFnSFRNTCA9IGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0gPT09ICd0YWctb25seScgPyBcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgOlxyXG4gICAgICAgICAgICAgICAgYCR7Y3VycmVudEtleX09XCIke2F0dHJpYnV0ZURhdGFbY3VycmVudEtleV19XCJgXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRBdHRyaWJ1dGVIVE1MfSAke2F0dHJpYnV0ZVRhZ0hUTUx9IGA7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXR0cmlidXRlSFRNTDtcclxuICAgICAgICB9LCAnJyk7ICAgXHJcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZUhUTUw7XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZWxlbWVudCwgY2xhc3Nlcykge1xuICAgICAgICBsZXQgY2xhc3NMaXN0ID0gY2xhc3Nlcy5zcGxpdCgnICcpO1xuXG4gICAgICAgIGNsYXNzTGlzdC5mb3JFYWNoKGN1cnJlbnRDbGFzcyA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3VycmVudENsYXNzKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KGVsZW1lbnQsIGNsYXNzZXMpIHtcbiAgICAgICAgbGV0IGNsYXNzTGlzdCA9IGNsYXNzZXMuc3BsaXQoJyAnKTtcblxuICAgICAgICBjbGFzc0xpc3QuZm9yRWFjaChjdXJyZW50Q2xhc3MgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRDbGFzcyk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NlcykgPj0gMDtcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvU2V0dGluZ3MgZnJvbSAnLi4vc2V0dGluZ3MuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29udHJ1Y3RvcigpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnR0aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBBVVNFKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihjYikge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMub25jZSh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFVF9EVVJBVElPTiwgKGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNiKGR1cmF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5HRVRfRFVSQVRJT04pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZvbHVtZSh2b2x1bWUpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfVk9MVU1FLCB2b2x1bWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlZWsoc2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFRUssIHNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUN1cnJlbnRUcmFjayh0cmFja0lkKXtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy50cmFja0V2ZW50TmFtZXMuQ0hBTkdFX0NVUlJFTlRfVFJBQ0ssIHRyYWNrSWQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IENvbnRyb2xFdmVudHMgZnJvbSAnLi9ldmVudHMuanMnO1xyXG5pbXBvcnQgVmlkZW9FdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvdmlkZW8uZXZlbnRzLmpzXCI7XHJcbmltcG9ydCBUcmFja0V2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy90cmFja3MuZXZlbnRzLmpzXCI7XHJcbmltcG9ydCBUcmFja0N1ZXNFdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvdHJhY2tzLmN1ZXMuZXZlbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbHMgZXh0ZW5kcyBDb250cm9sRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gMC41O1xyXG4gICAgICAgIHRoaXMuY29udHJvbEV2ZW50TmFtZXMgPSBuZXcgVmlkZW9FdmVudE5hbWVzKCk7XHJcbiAgICAgICAgdGhpcy50cmFja0V2ZW50TmFtZXMgPSBuZXcgVHJhY2tFdmVudE5hbWVzKCk7XHJcbiAgICAgICAgdGhpcy50cmFja0N1ZXNFdmVudE5hbWUgPSBuZXcgVHJhY2tDdWVzRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoaVZYanNCdXMpIHtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlRJTUVfVVBEQVRFLCB0aGlzLnVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWUlORywgdGhpcy53aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIHRoaXMuY2FuUGxheUNhbGxiYWNrKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLnRyYWNrQ3Vlc0V2ZW50TmFtZS5PTl9DSEFQVEVSX1NUQVJULCB0aGlzLmNoYXB0ZXJDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVBvc2l0aW9uID0geyB4OiBlbGVtZW50Lm9mZnNldExlZnQsIHk6IGVsZW1lbnQub2Zmc2V0VG9wIH07XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcFBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQub2Zmc2V0UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueCArPSB0ZW1wUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgcmVsYXRpdmVQb3NpdGlvbi55ICs9IHRlbXBQb3NpdGlvbi55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgYWRqdXN0Vm9sdW1lKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHsgdm9sdW1lQmFyLCBtdXRlQ29udHJvbHMsIGN1cnJlbnRWb2x1bWUsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCBtdXRlQ2xhc3NlcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgeyBvZmZzZXRXaWR0aDogd2lkdGggfSA9IHZvbHVtZUJhcjtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbih2b2x1bWVCYXIpO1xyXG4gICAgICAgIGxldCB7IHg6IGFic29sdXRlWCB9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHZvbHVtZUxldmVsID0gKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3ZvbHVtZUxldmVsICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSB2b2x1bWVMZXZlbDtcclxuICAgICAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NydWIoZXZlbnQpIHtcclxuICAgICAgICBsZXQgeyBjdXJyZW50VGltZUluZm8sIHNjcnViQmFyLCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgb2Zmc2V0V2lkdGg6IHdpZHRoIH0gPSBzY3J1YkJhcjtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihzY3J1YkJhcik7XHJcbiAgICAgICAgbGV0IHsgeDogYWJzb2x1dGVYIH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgc2NydWJUb1RpbWUgPSB0aGlzLmR1cmF0aW9uICogKHRydWVYIC8gd2lkdGgpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZU9iamVjdCA9IHRoaXMuY29udmVydFNlY29uZHNUb1BhcnRzKHNjcnViVG9UaW1lKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHRpbWVsYXBzZWQgPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoc2NydWJCYXIuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG4gICAgICAgIHRpbWVsYXBzZWQuc3R5bGUud2lkdGggPSBgJHsodHJ1ZVggLyB3aWR0aCkgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuc2VlayhzY3J1YlRvVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheVBhdXNlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHsgcGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMocGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHBsYXlQYXVzZUljb24uY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgcGxheUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHBhdXNlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGxheUNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXV0ZShldmVudCkge1xyXG4gICAgICAgIGxldCB7IG11dGVDb250cm9scywgbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIHZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIG11dGVDb250cm9sc0NsYXNzZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG11dGVJY29uLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHVubXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSBtdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYDAlYDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gdW5tdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5VG9QbGF5KHBsYXllciwgc3RhdGVEYXRhKSB7XHJcbiAgICAgICAgbGV0IHsgdm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3NlcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7c2VsZi5jdXJyZW50Vm9sdW1lICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLnNldFZvbHVtZShzZWxmLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgIHRoaXMuZ2V0RHVyYXRpb24oKGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IHRvdGFsVGltZUluZm8sIGN1cnJlbnRUaW1lSW5mbywgc2NydWJCYXIgfSA9IHNlbGY7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvblRpbWVPYmplY3QgPSBzZWxmLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvblRpbWVTdGFtcCA9IHNlbGYuY3JlYXRlVGltZVN0YW1wKGR1cmF0aW9uVGltZU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmR1cmF0aW9uID0gZHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxUaW1lSW5mbykgdG90YWxUaW1lSW5mby5pbm5lckhUTUwgPSBgLyR7ZHVyYXRpb25UaW1lU3RhbXB9YDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lSW5mbykgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAwMDowMGA7XHJcbiAgICAgICAgICAgIGlmIChzY3J1YkJhcikgc2NydWJCYXIuY2hpbGRyZW5bMF0uc3R5bGUud2lkdGggPSBgMCVgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZVVwZGF0ZShwbGF5ZXIpIHtcclxuICAgICAgICBsZXQgeyBjdXJyZW50VGltZUluZm8sIHNjcnViQmFyLCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgY3VycmVudFRpbWU6IHNlY29uZHMgfSA9IHBsYXllcjtcclxuXHJcbiAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgPiB0aGlzLmR1cmF0aW9uID8gMCA6IHNlY29uZHM7XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50VGltZU9iamVjdCA9IHRoaXMuY29udmVydFNlY29uZHNUb1BhcnRzKHNlY29uZHMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gdGhpcy5jcmVhdGVUaW1lU3RhbXAoY3VycmVudFRpbWVPYmplY3QpO1xyXG4gICAgICAgIGxldCB0aW1lTGFwc2VkID0gc2Vjb25kcyAvIHRoaXMuZHVyYXRpb247XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50VGltZUluZm8pIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGltZVN0YW1wfWA7XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc107XHJcblxyXG4gICAgICAgIGlmIChzY3J1YkJhcikge1xyXG4gICAgICAgICAgICBsZXQgdGltZWxhcHNlZEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoc2NydWJCYXIuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG5cclxuICAgICAgICAgICAgdGltZWxhcHNlZEVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt0aW1lTGFwc2VkICogMTAwfSVgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBsYXlpbmcoKSB7XHJcbiAgICAgICAgbGV0IHsgcGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIHNlYXJjaENsYXNzZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QYXVzZWQoKSB7XHJcbiAgICAgICAgbGV0IHsgcGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIHNlYXJjaENsYXNzZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBsYXlDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgc2NydWJCYXIsIHZvbHVtZUJhciwgcGxheVBhdXNlQ29udHJvbHMsIG11dGVDb250cm9scywgdHJhY2tDdWVzRXZlbnROYW1lIH0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlWWGpzQnVzID0gaVZYanNCdXM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdXBkYXRlVGltZSk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBhdXNlZCA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUEFVU0VELCB3aGlsZVBhdXNlZCk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBsYXlpbmcgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHdoaWxlUGxheWluZyk7XHJcbiAgICAgICAgdGhpcy5jYW5QbGF5Q2FsbGJhY2sgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkNBTl9QTEFZLCBjYW5QbGF5Q2FsbEJhY2spO1xyXG4gICAgICAgIHRoaXMuY2hhcHRlckNoYW5nZSA9IGlWWGpzQnVzLm9uKHRoaXMudHJhY2tDdWVzRXZlbnROYW1lLk9OX0NIQVBURVJfU1RBUlQsIGNoYXB0ZXJDaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IHRoaXMudXBkYXRlVGltZSA/IHRoaXMudXBkYXRlVGltZSA6IHVwZGF0ZVRpbWU7XHJcblxyXG4gICAgICAgIHZvbHVtZUJhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5hZGp1c3RWb2x1bWUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjcnViQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2NydWIoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRQbGF5UGF1c2UoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG11dGVDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldE11dGUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmlWWGpzQnVzLm9uY2UodGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgKHBsYXllcikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllclNwZWNpZmljQ29udHJvbHMoeyBwbGF5ZXIgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhcHRlckNoYW5nZShjdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBjaGFwdGVyQWN0aXZlQ2xhc3NlcywgY2hhcHRlckxpc3RJdGVtQ2xhc3NlcywgY2hhcHRlckluQWN0aXZlQ2xhc3NlcyB9ID0gc2VsZjtcclxuICAgICAgICAgICAgY29uc3QgY2hhcHRlckxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2hhcHRlckxpc3RJdGVtQ2xhc3NlcykpO1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkOiBjdXJyZW50Q2hhcHRlcklkIH0gPSBjdWU7XHJcblxyXG4gICAgICAgICAgICBjaGFwdGVyTGlzdC5mb3JFYWNoKGNoYXB0ZXJMaXN0SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeyBpZDogY2hhcHRlcklkIH0gPSBjaGFwdGVyTGlzdEl0ZW07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXB0ZXJJZCA9PT0gY3VycmVudENoYXB0ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXB0ZXJMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKGNoYXB0ZXJJbkFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXB0ZXJMaXN0SXRlbS5jbGFzc0xpc3QuYWRkKGNoYXB0ZXJBY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjaGFwdGVyTGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShjaGFwdGVyQWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcHRlckxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoY2hhcHRlckluQWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FuUGxheUNhbGxCYWNrKHBsYXllciwgX3N0YXRlRGF0YSkge1xyXG4gICAgICAgICAgICBzZWxmLm9uUmVhZHlUb1BsYXkocGxheWVyLCBfc3RhdGVEYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWUocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25UaW1lVXBkYXRlKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3aGlsZVBhdXNlZChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5vblBhdXNlZChwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hpbGVQbGF5aW5nKCkge1xyXG4gICAgICAgICAgICBzZWxmLm9uUGxheWluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtZW50QnlDbGFzc2VzKGVsZW1lbnRzLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRBcnJheSA9IGVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkgP1xyXG4gICAgICAgICAgICBlbGVtZW50cyA6XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZWxlbWVudHMpO1xyXG4gICAgICAgIGxldCB0aGlzRWxlbWVudDtcclxuXHJcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKChjbGFzc05hbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2xhc3NOYW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpc0VsZW1lbnQgPSBlbGVtZW50QXJyYXkuZmluZCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgPj0gMDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRpbWVTdGFtcCh0aW1lT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHsgaG91cnMsIHJlbWFpbmluZ01pbnV0ZXM6IG1pbnV0ZXMsIHJlbWFpbmluZ1NlY29uZHM6IHNlY29uZHMgfSA9IHRpbWVPYmplY3Q7XHJcbiAgICAgICAgbGV0IGhvdXJTdHJpbmcgPSAnJztcclxuICAgICAgICBsZXQgbWludXRlU3RyaW5nID0gbWludXRlcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke21pbnV0ZXN9OmAgOlxyXG4gICAgICAgICAgICBgJHttaW51dGVzfTpgO1xyXG4gICAgICAgIGxldCBzZWNvbmRTdHJpbmcgPSBzZWNvbmRzIDwgMTAgP1xyXG4gICAgICAgICAgICBgMCR7c2Vjb25kc31gIDpcclxuICAgICAgICAgICAgYCR7c2Vjb25kc31gO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGhvdXJTdHJpbmcgPSBob3VycyA8IDEwID9cclxuICAgICAgICAgICAgICAgIGAwJHtob3Vyc306YCA6XHJcbiAgICAgICAgICAgICAgICBgJHtob3Vyc306YDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aG91clN0cmluZ30ke21pbnV0ZVN0cmluZ30ke3NlY29uZFN0cmluZ31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgbGV0IHRpbWVJbmZvcm1hdGlvbiA9IHtcclxuICAgICAgICAgICAgbWludXRlczogbWludXRlcyxcclxuICAgICAgICAgICAgaG91cnM6IE1hdGguZmxvb3IobWludXRlcyAvIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nU2Vjb25kczogTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxyXG4gICAgICAgICAgICByZW1haW5pbmdNaW51dGVzOiBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MCksXHJcbiAgICAgICAgICAgIHNlY29uZHM6IHNlY29uZHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1lSW5mb3JtYXRpb247XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckNvbnRyb2xFdmVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGF5XCIgOiAnaVZYOnZpZGVvOnBsYXknLFxyXG4gICAgICAgICAgICBcInBhdXNlXCIgOiAnaVZYOnZpZGVvOnBhdXNlJyxcclxuICAgICAgICAgICAgXCJzZWVrXCIgOiAnaVZYOnZpZGVvOnNlZWtlZCcsXHJcbiAgICAgICAgICAgIFwicGxheWluZ1wiIDogXCJpVlg6dmlkZW86cGxheWluZ1wiLFxyXG4gICAgICAgICAgICBcImVuZGVkXCIgOiBcImlWWDp2aWRlbzplbmRlZFwiLFxyXG4gICAgICAgICAgICBcInBhdXNlZFwiIDogXCJpVlg6dmlkZW86cGF1c2VkXCIsXHJcbiAgICAgICAgICAgIFwic2V0Vm9sdW1lXCIgOiAnaVZYOnZpZGVvOnNldFZvbHVtZScsXHJcbiAgICAgICAgICAgIFwiZHVyYXRpb25cIiA6IFwiaVZYOnZpZGVvOnJlcXVlc3REdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImdldER1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpnZXREdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImNhblBsYXlcIiA6IFwiaVZYOnZpZGVvOmNhbnBsYXlcIixcclxuICAgICAgICAgICAgXCJ0aW1lVXBkYXRlXCIgOiBcImlWWDp2aWRlbzp0aW1ldXBkYXRlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcG9zZVwiIDogXCJpVlg6dmlkZW86ZGlzcG9zZVwiLFxyXG4gICAgICAgICAgICBcInZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpXHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
