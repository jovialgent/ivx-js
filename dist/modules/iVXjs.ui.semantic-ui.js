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

},{"../../utilities/type-parsers.js":61}],3:[function(require,module,exports){
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

},{"../../utilities/type-parsers.js":61}],4:[function(require,module,exports){
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

},{"./tracks.cues.js":6}],6:[function(require,module,exports){
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

},{"./tracks.js":8}],7:[function(require,module,exports){
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

},{"./tracks.js":8}],8:[function(require,module,exports){
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

},{"./index.js":4}],9:[function(require,module,exports){
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

},{"./video.js":10}],10:[function(require,module,exports){
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

},{"./index.js":4}],11:[function(require,module,exports){
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

},{"../../../utilities/asserts.js":60,"../../../utilities/type-parsers.js":61,"../utilities/attributes.js":55}],12:[function(require,module,exports){
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

},{"../../../utilities/asserts.js":60,"../../../utilities/type-parsers.js":61,"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],13:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],14:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],15:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],16:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],17:[function(require,module,exports){
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

},{"./style":24}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18}],20:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],21:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"../utilities/attributes.js":55}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],26:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],27:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":18,"./style":24}],28:[function(require,module,exports){
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

},{"../../video/controls/index.js":58,"../utilities/element":56}],29:[function(require,module,exports){
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

},{"../default/anchor.js":11}],30:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1}],31:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/input-controller.js":2}],32:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../card.js":35,"../controllers/element.card.js":30}],33:[function(require,module,exports){
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

},{"../../../../../angular/utilities/create-factory-function.js":1,"../../../../../angular/utilities/messages.error.js":3,"../controllers/input.dropdown.js":31}],34:[function(require,module,exports){
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

},{"../default/buttons.js":12,"./messages.js":43}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"../default/checkbox.js":13,"./messages.js":43}],37:[function(require,module,exports){
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

},{"../default/date.js":14,"./messages.js":43}],38:[function(require,module,exports){
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

},{"../default/datetime-local.js":15,"./messages.js":43}],39:[function(require,module,exports){
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

},{"../utilities/attributes.js":55,"./messages.js":43,"./style":50}],40:[function(require,module,exports){
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

},{"../default/email.js":16,"./messages.js":43}],41:[function(require,module,exports){
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

},{"../default/form.js":17,"./style.js":50}],42:[function(require,module,exports){
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

},{"./anchor.js":29,"./angular/directives/element.card.js":32,"./angular/directives/input.dropdown.js":33,"./buttons.js":34,"./checkbox.js":36,"./date.js":37,"./datetime-local.js":38,"./dropdown.js":39,"./email.js":40,"./form.js":41,"./number.js":44,"./options.js":45,"./radio.js":46,"./state.input.js":47,"./state.navigation.js":48,"./state.video.js":49,"./style.js":50,"./text.js":51,"./textarea.js":52,"./url.js":53,"./video.controls.js":54}],43:[function(require,module,exports){
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

},{"../default/messages.js":18}],44:[function(require,module,exports){
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

},{"../default/number.js":19,"./messages.js":43}],45:[function(require,module,exports){
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

},{"../default/options.js":20,"./messages.js":43}],46:[function(require,module,exports){
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

            var currentId = "" + id + (value.length > 0 ? '-' + value : '');

            return "\n          <input type=\"radio\" id=\"" + currentId + "\" " + attrHTML + ">\n            <label for=\"" + currentId + "\">   \n                     " + label + "\n          </label>\n          ";
        }
    }, {
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }]);

    return Radio;
}(_radio.Radio);

},{"../default/radio.js":21,"./messages.js":43}],47:[function(require,module,exports){
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

},{"../default/state.input.js":22}],48:[function(require,module,exports){
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

},{"../default/state.navigation.js":23}],49:[function(require,module,exports){
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


            return '\n            <section class="ui container ' + sectionClasses + ' ' + iPhoneInlineClasses + '" id="' + data.id + '">\n                <header class="' + headerClasses + ' ' + this.defaultHeaderClasses + '">' + headerHTML + '</header>\n                ' + playerSection + '\n                <footer class="' + footerClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return VideoState;
}();

;

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"../default/text.js":25,"./messages.js":43}],52:[function(require,module,exports){
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

},{"../default/textarea.js":26,"./messages.js":43}],53:[function(require,module,exports){
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

},{"../default/url.js":27,"./messages.js":43}],54:[function(require,module,exports){
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
        key: 'chapterButtonClasses',
        get: function get() {
            return 'ui button chapter-button';
        }
    }, {
        key: 'chapterListClasses',
        get: function get() {
            return "ui ordered list";
        }
    }, {
        key: 'chapterListItemClasses',
        get: function get() {
            return "item";
        }
    }, {
        key: 'trackListSelectContainerClasses',
        get: function get() {
            return 'track-list-select-container';
        }
    }, {
        key: 'trackListSelectClasses',
        get: function get() {
            return 'track-list-select ui dropdown';
        }
    }, {
        key: 'trackListSelectActiveClasses',
        get: function get() {
            return 'active show';
        }
    }, {
        key: 'trackListSelectInactiveClasses',
        get: function get() {
            return 'inactive hide';
        }
    }, {
        key: 'closeCaptionButtonClasses',
        get: function get() {
            return 'close-caption-button ui icon button';
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
            return 'close-caption-button-icon closed captioning icon';
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

},{"../default/video.controls.js":28}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"../settings.js":59}],58:[function(require,module,exports){
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

},{"../../../constants/tracks.cues.events.js":5,"../../../constants/tracks.events.js":7,"../../../constants/video.events.js":9,"./events.js":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}]},{},[42])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvY3JlYXRlLWZhY3RvcnktZnVuY3Rpb24uanMiLCJzcmMvYW5ndWxhci91dGlsaXRpZXMvaW5wdXQtY29udHJvbGxlci5qcyIsInNyYy9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL3RyYWNrcy5jdWVzLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvdHJhY2tzLmN1ZXMuanMiLCJzcmMvY29uc3RhbnRzL3RyYWNrcy5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL3RyYWNrcy5qcyIsInNyYy9jb25zdGFudHMvdmlkZW8uZXZlbnRzLmpzIiwic3JjL2NvbnN0YW50cy92aWRlby5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvYW5jaG9yLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9idXR0b25zLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9jaGVja2JveC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZGF0ZS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZGF0ZXRpbWUtbG9jYWwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2VtYWlsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9vcHRpb25zLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3RhdGUuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3N0eWxlLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC90ZXh0LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvdXJsLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC92aWRlby5jb250cm9scy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2FuZ3VsYXIvY29udHJvbGxlcnMvZWxlbWVudC5jYXJkLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvYW5ndWxhci9jb250cm9sbGVycy9pbnB1dC5kcm9wZG93bi5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2FuZ3VsYXIvZGlyZWN0aXZlcy9lbGVtZW50LmNhcmQuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9hbmd1bGFyL2RpcmVjdGl2ZXMvaW5wdXQuZHJvcGRvd24uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9idXR0b25zLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvY2FyZC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvZGF0ZS5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2RhdGV0aW1lLWxvY2FsLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvZHJvcGRvd24uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9lbWFpbC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL2Zvcm0uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL21lc3NhZ2VzLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3JhZGlvLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3RhdGUuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvc2VtYW50aWMtdWkvc3RhdGUudmlkZW8uanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS9zdHlsZS5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9zZW1hbnRpYy11aS90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3VybC5qcyIsInNyYy9tb2R1bGVzL3VpL3NlbWFudGljLXVpL3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMiLCJzcmMvbW9kdWxlcy91aS91dGlsaXRpZXMvZWxlbWVudC5qcyIsInNyYy9tb2R1bGVzL3ZpZGVvL2NvbnRyb2xzL2V2ZW50cy5qcyIsInNyYy9tb2R1bGVzL3ZpZGVvL2NvbnRyb2xzL2luZGV4LmpzIiwic3JjL21vZHVsZXMvdmlkZW8vc2V0dGluZ3MuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ0F3QixxQjtBQUFULFNBQVMscUJBQVQsQ0FBK0IsV0FBL0IsRUFBNEM7QUFDMUQsS0FBSSxnQkFBZ0IsV0FBcEI7QUFDQSxLQUFJLE9BQU8sY0FBYyxPQUF6QjtBQUNBLEtBQUksa0JBQWtCLFNBQWxCLGVBQWtCLEdBQWE7QUFBQSxvQ0FBVCxJQUFTO0FBQVQsT0FBUztBQUFBOztBQUMvQiw0Q0FBVyxhQUFYLGdCQUE0QixJQUE1QjtBQUNILEVBRkQ7O0FBSUEsTUFBSyxJQUFMLENBQVUsZUFBVjs7QUFFQSxRQUFPLElBQVA7QUFDQTs7Ozs7Ozs7OztBQ1ZEOzs7O0FBQ0EsSUFBSSxrQkFBa0IsZ0NBQXRCOztJQUVhLHFCLFdBQUEscUIsR0FDVCwrQkFBWSxNQUFaLEVBQW9CLEtBQXBCLEVBQTJCLFlBQTNCLEVBQXlDO0FBQUE7O0FBQUEsUUFDcEIsS0FEb0IsR0FDVixNQURVLENBQy9CLFNBRCtCOztBQUVyQyxRQUFJLHlCQUF5QixNQUFNLFVBQU4sQ0FBaUIsSUFBakIsQ0FBc0IsTUFBTSxJQUE1QixDQUE3Qjs7QUFFQSxRQUFJLE1BQU0sSUFBTixLQUFlLFVBQW5CLEVBQStCO0FBQzNCLGVBQU8sVUFBUCxHQUFvQixzQkFBcEI7QUFDSCxLQUZELE1BRU8sSUFBSSxzQkFBSixFQUE0QjtBQUMvQixlQUFPLFVBQVAsR0FBb0Isc0JBQXBCO0FBQ0g7O0FBRUQsV0FBTyxHQUFQLENBQVcsU0FBWCxFQUFzQixVQUFVLEtBQVYsRUFBaUIsS0FBakIsRUFBd0I7QUFDMUMsZUFBTyxNQUFQO0FBQ0gsS0FGRDs7QUFJQSxTQUFLLFFBQUwsR0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDdkIsWUFBSSxNQUFNLElBQU4sS0FBZSxVQUFuQixFQUErQjtBQUMzQixvQkFBUSxRQUFRLE1BQVIsR0FBaUIsT0FBekI7QUFDSDs7QUFFRCxZQUFJLENBQUMsZ0JBQWdCLE9BQWhCLENBQXdCLEtBQXhCLENBQUQsSUFBbUMsaUJBQWlCLElBQXhELEVBQThEO0FBQUE7O0FBRTFELG9CQUFJLFVBQVUsTUFBVixJQUFvQixVQUFVLE9BQWxDLEVBQTJDO0FBQ3ZDLDRCQUFRLFVBQVUsTUFBbEI7QUFDSDs7QUFKeUQsb0JBTXBELElBTm9ELEdBTTVCLEtBTjRCLENBTXBELElBTm9EO0FBQUEsc0NBTTVCLEtBTjRCLENBTTlDLFFBTjhDO0FBQUEsb0JBTTlDLFFBTjhDLG1DQU1uQyxFQU5tQzs7O0FBUTFELHlCQUFTLE9BQVQsQ0FBaUI7QUFDYiwrQkFBVyxTQURFO0FBRWIsMEJBQU07QUFDRiw2QkFBSyxJQURIO0FBRUYsK0JBQU87QUFGTDtBQUZPLGlCQUFqQjs7QUFRQSxzQkFBTSxHQUFOLENBQVUsS0FBVixZQUF5QixNQUFNLElBQS9CLHlCQUF5RCxFQUF6RCxFQUE2RCxFQUFFLFlBQUYsRUFBUyxRQUFRLFVBQWpCLEVBQTZCLFFBQVEsU0FBckMsRUFBZ0QsU0FBUyxRQUF6RCxFQUFtRSxXQUFXLEtBQUssR0FBTCxFQUE5RSxFQUE3RDs7QUFFQSw2QkFBYSxjQUFiLENBQTRCLFFBQTVCLEVBQXNDLFlBQU07QUFDeEMsMEJBQU0sR0FBTixDQUFVLEtBQVYsWUFBeUIsTUFBTSxJQUEvQix1QkFBdUQsRUFBdkQsRUFBMkQsRUFBRSxZQUFGLEVBQVMsUUFBUSxVQUFqQixFQUE2QixRQUFRLFdBQXJDLEVBQWtELFNBQVMsUUFBM0QsRUFBcUUsV0FBVyxLQUFLLEdBQUwsRUFBaEYsRUFBM0Q7QUFDSCxpQkFGRDtBQWxCMEQ7QUFxQjdEO0FBQ0osS0EzQkQ7QUE0QkgsQzs7Ozs7Ozs7Ozs7O0FDOUNMOzs7O0FBRUEsSUFBSSxtQkFBbUIsZ0NBQXZCOztJQUVhLGEsV0FBQSxhO0FBQ1QsMkJBQVksS0FBWixFQUFtQixNQUFuQixFQUE0QztBQUFBLFlBQWpCLFVBQWlCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsWUFDN0IsU0FENkIsR0FDQyxLQURELENBQ25DLElBRG1DO0FBQUEsWUFDWixTQURZLEdBQ0MsS0FERCxDQUNsQixJQURrQjs7QUFFeEMsYUFBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNIOzs7OzRCQUVVO0FBQUEsZ0JBQ0YsVUFERSxHQUNZLElBRFosQ0FDRixVQURFOztBQUVQLGdCQUFJLGtCQUFrQixLQUFLLGVBQTNCO0FBQ0EsZ0JBQUksYUFBYSxLQUFLLFVBQXRCO0FBQ0EsZ0JBQUksY0FBYyxLQUFLLFdBQXZCOztBQUVBLG1CQUFPLGlCQUFpQixNQUFqQixDQUF3QixVQUF4QixFQUFvQyxVQUFDLElBQUQsRUFBTyxjQUFQLEVBQXVCLFlBQXZCLEVBQXdDO0FBQy9FLG9CQUFJLFlBQVksT0FBWixDQUFvQixZQUFwQixLQUFxQyxDQUF6QyxFQUE0QyxPQUFPLElBQVA7QUFDNUMsb0JBQUksTUFBTSxXQUFXLE9BQVgsQ0FBbUIsWUFBbkIsS0FBb0MsQ0FBcEMsR0FDSCxZQURHLFVBQ2MsY0FEZCxpQkFFQSxnQkFBZ0IsWUFBaEIsQ0FGQSxZQUVvQyxjQUZwQyxPQUFWOztBQUtBLHVCQUFVLElBQVYsU0FBa0IsR0FBbEI7QUFDSCxhQVJNLEVBUUosRUFSSSxDQUFQO0FBU0g7Ozs0QkFFYztBQUFBLGdCQUNOLFNBRE0sR0FDc0MsSUFEdEMsQ0FDTixTQURNO0FBQUEsZ0JBQ0ssU0FETCxHQUNzQyxJQUR0QyxDQUNLLFNBREw7QUFBQSxnQkFDZ0IsTUFEaEIsR0FDc0MsSUFEdEMsQ0FDZ0IsTUFEaEI7QUFBQSxnQkFDd0IsVUFEeEIsR0FDc0MsSUFEdEMsQ0FDd0IsVUFEeEI7O0FBRVgsZ0JBQUksa0JBQWtCLEtBQUssZUFBM0I7QUFDQSxnQkFBSSxrQkFBa0IsS0FBSyxvQkFBM0I7QUFDQSxnQkFBSSxnQkFBZ0IsT0FBTyxJQUFQLENBQVksVUFBWixFQUF3QixHQUF4QixDQUE0QixVQUFDLFlBQUQsRUFBZSxLQUFmLEVBQXlCO0FBQ3JFLG9CQUFJLFVBQVUsVUFBVSxPQUFPLFlBQVAsQ0FBVixHQUFpQyxPQUFPLFlBQVAsQ0FBakMsR0FBd0QsZ0JBQWdCLFlBQWhCLENBQXRFO0FBQ0Esb0JBQUksOENBQTJDLFNBQTNDLDJFQUF3SCxTQUF4SCxtQkFBOEksZ0JBQWdCLFlBQWhCLENBQTlJLE1BQUo7O0FBRUEsb0JBQUcsY0FBYyxPQUFqQixFQUF5QjtBQUN0QjtBQUNGOztBQUVELHVCQUFPO0FBQ0gsNkJBQVMsT0FETjtBQUVILDhCQUFVO0FBRlAsaUJBQVA7QUFJSCxhQVptQixDQUFwQjs7QUFlQSxnQkFBSSxhQUFhLGNBQWMsTUFBM0IsSUFBcUMsYUFBYSxTQUF0RCxFQUFpRTtBQUM3RCw4QkFBYyxJQUFkLENBQW1CLEtBQUssY0FBeEI7QUFDSDs7QUFFRCxtQkFBTyxhQUFQO0FBQ0g7Ozs0QkFFb0I7QUFBQSxnQkFDWixTQURZLEdBQ29CLElBRHBCLENBQ1osU0FEWTtBQUFBLGdCQUNELFNBREMsR0FDb0IsSUFEcEIsQ0FDRCxTQURDO0FBQUEsZ0JBQ1UsTUFEVixHQUNvQixJQURwQixDQUNVLE1BRFY7O0FBRWpCLGdCQUFJLGVBQWUsT0FBTyxTQUFQLENBQW5COztBQUVBLG1CQUFPO0FBQ0gseUJBQVMsZUFBZSxZQUFmLEdBQThCLGFBQWEsU0FEakQ7QUFFSCw2REFBMEMsU0FBMUMsMkVBQXVILFNBQXZILG1CQUE2SSxTQUE3STtBQUZHLGFBQVA7QUFJSDs7OzRCQUVnQjtBQUNiLG1CQUFPLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxVQUFmLEVBQTJCLGFBQTNCLEVBQTBDLE1BQTFDLEVBQWtELFVBQWxELEVBQThELE9BQTlELENBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLENBQUMsTUFBRCxFQUFTLGFBQVQsRUFBd0IsVUFBeEIsQ0FBUDtBQUNIOzs7NEJBRXFCO0FBQ2xCLG1CQUFPO0FBQ0gsMkJBQVcsV0FEUjtBQUVILHFCQUFLLEtBRkY7QUFHSCxxQkFBSyxLQUhGO0FBSUgsMEJBQVUsVUFKUDtBQUtILDJCQUFXO0FBTFIsYUFBUDtBQU9IOzs7NEJBRTBCO0FBQ3ZCLG1CQUFPO0FBQ0gsMkJBQVcsV0FEUjtBQUVILHFCQUFLLFNBRkY7QUFHSCxxQkFBSyxVQUhGO0FBSUgsMEJBQVUsVUFKUDtBQUtILDJCQUFXO0FBTFIsYUFBUDtBQU9IOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRkQsc0JBQWE7QUFBQTs7QUFDVCxhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0g7Ozs7cUNBRVc7QUFDUixtQkFBTyxLQUFLLE9BQVo7QUFDSDs7O2lDQUVRLGMsRUFBZTtBQUNwQixnQkFBSSxPQUFPLElBQVg7QUFDQSxnQkFBSSxRQUFRLE9BQU8sSUFBUCxDQUFZLGNBQVosQ0FBWjs7QUFFQSxrQkFBTSxPQUFOLENBQWMsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFnQjtBQUMxQixxQkFBSyxJQUFMLElBQWEsS0FBSyxVQUFMLENBQWdCLGVBQWUsSUFBZixDQUFoQixDQUFiO0FBQ0gsYUFGRDtBQUdIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJMOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUdWLFlBQUksYUFBYTtBQUNkLHNCQUFVLFVBREk7QUFFZCxxQkFBUyxTQUZLO0FBR2QsOEJBQW1CLGtCQUhMO0FBSWQsNEJBQWlCO0FBSkgsU0FBakI7O0FBT0EsY0FBSyxRQUFMLENBQWMsVUFBZDtBQVZVO0FBV2I7Ozs7bUNBRVUsUyxFQUFXO0FBQUEsZ0JBQ2IsU0FEYSxHQUNBLElBREEsQ0FDYixTQURhOzs7QUFHbEIscUlBQStCLFNBQS9CLEdBQTJDLFNBQTNDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkw7Ozs7Ozs7Ozs7Ozs7OztBQUdJLHNCQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxJQUFMLEdBQVksTUFBWjtBQUhVO0FBSWI7Ozs7cUNBRVk7QUFBQSxnQkFDSCxTQURHLEdBQ2lCLElBRGpCLENBQ0gsU0FERztBQUFBLGdCQUNRLElBRFIsR0FDaUIsSUFEakIsQ0FDUSxJQURSOzs7QUFHVCxxSUFBK0IsU0FBL0IsR0FBMkMsSUFBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JMOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUdWLFlBQUksYUFBYTtBQUNmLDZCQUFrQixpQkFESDtBQUVmLGtDQUF1QjtBQUZSLFNBQWpCOztBQUtBLGNBQUssUUFBTCxDQUFjLFVBQWQ7QUFSVTtBQVNiOzs7O21DQUVVLFMsRUFBVztBQUFBLGdCQUNiLFNBRGEsR0FDQSxJQURBLENBQ2IsU0FEYTs7O0FBR2xCLHFJQUErQixTQUEvQixHQUEyQyxTQUEzQztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJMOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUdWLGNBQUssTUFBTCxHQUFjLFFBQWQ7QUFIVTtBQUliOzs7O3FDQUVZO0FBQUEsZ0JBQ0gsU0FERyxHQUNtQixJQURuQixDQUNILFNBREc7QUFBQSxnQkFDUSxNQURSLEdBQ21CLElBRG5CLENBQ1EsTUFEUjs7O0FBR1QscUlBQStCLFNBQS9CLEdBQTJDLE1BQTNDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsMEJBQWUsY0FaRjtBQWFiLGtCQUFNLE1BYk87QUFjYiwwQkFBYyxjQWREO0FBZWIsd0JBQVksWUFmQztBQWdCYix5QkFBYSxhQWhCQTtBQWlCYixvQkFBUTtBQWpCSyxTQUFqQjs7QUFvQkEsY0FBSyxRQUFMLENBQWMsVUFBZDtBQXZCVTtBQXdCYjs7OzttQ0FFVSxTLEVBQVc7QUFBQSxnQkFDYixTQURhLEdBQ0EsSUFEQSxDQUNiLFNBRGE7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsU0FBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLEtBQUwsR0FBYSxPQUFiO0FBSFM7QUFJWjs7OztxQ0FFVztBQUFBLGdCQUNILFNBREcsR0FDaUIsSUFEakIsQ0FDSCxTQURHO0FBQUEsZ0JBQ1EsS0FEUixHQUNpQixJQURqQixDQUNRLEtBRFI7OztBQUdSLHFJQUFnQyxTQUFoQyxHQUE0QyxLQUE1QztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiTDs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksWUFBWSxnQ0FBaEI7O0lBRWEsTSxXQUFBLE07QUFDVCxvQkFBWSxVQUFaLEVBQXdCO0FBQUE7O0FBQ3JCLGFBQUssVUFBTCxHQUFrQixVQUFsQjtBQUVGOzs7OzRCQUVrQjtBQUNmLG1CQUFPLEVBQVA7QUFDSDs7OzRCQUVVO0FBQUEsZ0JBQ0YsYUFERSxHQUNlLElBRGYsQ0FDRixhQURFO0FBQUEsOEJBRStFLEtBQUssVUFGcEY7QUFBQSwrQ0FFRixJQUZFO0FBQUEsZ0JBRUYsSUFGRSxvQ0FFSyxFQUZMO0FBQUEsa0RBRVMsT0FGVDtBQUFBLGdCQUVTLE9BRlQsdUNBRW1CLEVBRm5CO0FBQUEsb0RBRXVCLFVBRnZCO0FBQUEsZ0JBRXVCLFVBRnZCLHlDQUVvQyxFQUZwQztBQUFBLGdEQUV3QyxLQUZ4QztBQUFBLGdCQUV3QyxLQUZ4QyxxQ0FFZ0QsU0FGaEQ7QUFBQSxnQkFFMkQsU0FGM0QsZUFFMkQsU0FGM0Q7QUFBQSw2Q0FFc0UsRUFGdEU7QUFBQSxnQkFFc0UsRUFGdEUsa0NBRXlFLEVBRnpFOztBQUdQLGdCQUFJLGdCQUFnQiw4QkFBa0IsVUFBbEIsRUFBOEIsT0FBTyxJQUFQLENBQVksVUFBWixDQUE5QixFQUF1RCxJQUEzRTs7QUFFQSxnQkFBRyxDQUFDLFNBQUQsSUFBYyxDQUFDLEtBQWxCLEVBQXdCO0FBQ3BCLHdCQUFRLElBQVI7QUFDSDs7QUFFRCwrQ0FDYyxFQURkLGtCQUM0QixPQUQ1QixTQUN1QyxhQUR2QyxpQkFDZ0UsSUFEaEUsVUFDeUUsYUFEekUsV0FDMkYsWUFBWSxTQUFaLEdBQXdCLEtBRG5IO0FBR0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Qkw7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7QUFDQSxJQUFJLFlBQVksZ0NBQWhCOztBQUVBOzs7OztJQUlhLE8sV0FBQSxPOztBQUVUOzs7Ozs7Ozs7O0FBVUEsdUJBQWdFO0FBQUEsWUFBcEQsT0FBb0QsdUVBQTFDLEVBQTBDO0FBQUEsWUFBdEMsS0FBc0M7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFFNUQ7Ozs7QUFJQSxhQUFLLE9BQUwsR0FBZSxPQUFmOztBQUVBOzs7O0FBSUEsYUFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTs7Ozs7QUFLQSxhQUFLLGFBQUwsR0FBcUIsYUFBckI7O0FBRUE7Ozs7O0FBS0EsYUFBSyxhQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7NEJBTW9CO0FBQ2hCLG1CQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFzQlc7QUFBQSwwQkFDa0UsSUFEbEUsQ0FDRixNQURFO0FBQUEsZ0JBQ00sVUFETiwyQkFDbUIsRUFEbkI7QUFBQSwyQkFDa0UsSUFEbEUsQ0FDdUIsT0FEdkI7QUFBQSxnQkFDdUIsT0FEdkIsNEJBQ2lDLEVBRGpDO0FBQUEseUJBQ2tFLElBRGxFLENBQ3FDLEtBRHJDO0FBQUEsZ0JBQ3FDLEtBRHJDLDBCQUM2QyxFQUQ3QztBQUFBLGdCQUNpRCxhQURqRCxHQUNrRSxJQURsRSxDQUNpRCxhQURqRDtBQUFBLHdDQUUrQyxVQUYvQyxDQUVELFVBRkM7QUFBQSxnQkFFRCxVQUZDLHlDQUVZLEVBRlo7QUFBQSxxQ0FFK0MsVUFGL0MsQ0FFZ0IsTUFGaEI7QUFBQSxnQkFFZ0IsTUFGaEIsc0NBRXlCLEVBRnpCO0FBQUEsdUNBRStDLFVBRi9DLENBRTZCLFFBRjdCO0FBQUEsZ0JBRTZCLFFBRjdCLHdDQUV3QyxFQUZ4Qzs7QUFHUCxnQkFBSSxzQkFBc0IsT0FBTyxJQUFQLENBQVksVUFBWixFQUF3QixHQUF4QixDQUE0QixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQ2xFLHVCQUFPO0FBQ0gsa0NBQVksT0FBTyxHQUFQLENBRFQ7QUFFSCw4QkFBVTtBQUZQLGlCQUFQO0FBSUgsYUFMeUIsQ0FBMUI7QUFNQSxnQkFBSSxnQkFBZ0IsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLElBQWhFO0FBVE8sK0JBVW1ELEtBVm5ELENBVUYsS0FWRTtBQUFBLGdCQVVGLEtBVkUsZ0NBVU0sRUFWTjtBQUFBLG1DQVVtRCxLQVZuRCxDQVVVLFNBVlY7QUFBQSxnQkFVVSxTQVZWLG9DQVVzQixFQVZ0QjtBQUFBLG1DQVVtRCxLQVZuRCxDQVUwQixTQVYxQjtBQUFBLGdCQVUwQixTQVYxQixvQ0FVc0MsS0FWdEM7QUFBQSxnQkFVNkMsRUFWN0MsR0FVbUQsS0FWbkQsQ0FVNkMsRUFWN0M7O0FBV1AsZ0JBQUksY0FBYyxRQUFRLE1BQVIsQ0FBZSxVQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsS0FBZixFQUF5QjtBQUFBLG9CQUNoRCxLQURnRCxHQUNULE1BRFMsQ0FDaEQsS0FEZ0Q7QUFBQSx1Q0FDVCxNQURTLENBQ3pDLFFBRHlDO0FBQUEsb0JBQ3pDLFFBRHlDLG9DQUM5QixFQUQ4QjtBQUFBLHNDQUNULE1BRFMsQ0FDMUIsT0FEMEI7QUFBQSxvQkFDMUIsT0FEMEIsbUNBQ2hCLEVBRGdCOzs7QUFHdEQsdUJBQVUsSUFBVixzQ0FDaUIsUUFEakIsaUJBQ29DLE9BRHBDLFNBQytDLGFBRC9DLG9DQUVhLEtBRmI7QUFJSCxhQVBpQixFQU9mLEVBUGUsQ0FBbEI7O0FBU0EsZ0JBQUksQ0FBQyxVQUFVLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0IsTUFBTSxNQUFOLEdBQWUsQ0FBeEMsS0FBOEMsU0FBbEQsRUFBNkQ7QUFDekQsNEJBQVksWUFBWSxTQUFaLEdBQXdCLEtBQXBDO0FBQ0EsOENBQTJCLEVBQTNCLFdBQWtDLFNBQWxDO0FBQ0g7O0FBRUQsdUNBQ08sU0FEUCx1QkFFTyxXQUZQLHVCQUdPLGFBSFA7QUFLSDs7Ozs7Ozs7Ozs7Ozs7OztBQ3BITDs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksUUFBUSxrQkFBWjs7QUFFQTs7Ozs7SUFJYSxRLFdBQUEsUTs7QUFFVDs7Ozs7Ozs7OztBQVVBLHdCQUEwRDtBQUFBLFlBQTlDLFFBQThDLHVFQUFuQyxFQUFtQztBQUFBLFlBQS9CLGFBQStCOztBQUFBOztBQUFBLFlBQ2pELEtBRGlELEdBQ0QsUUFEQyxDQUNqRCxLQURpRDtBQUFBLDZCQUNELFFBREMsQ0FDMUMsSUFEMEM7QUFBQSxZQUMxQyxJQUQwQyxrQ0FDbkMsRUFEbUM7QUFBQSxpQ0FDRCxRQURDLENBQy9CLFFBRCtCO0FBQUEsWUFDL0IsUUFEK0Isc0NBQ3BCLEVBRG9CO0FBQUEsK0JBQ0QsUUFEQyxDQUNoQixNQURnQjtBQUFBLFlBQ2hCLE1BRGdCLG9DQUNQLEVBRE87O0FBR3REOzs7OztBQUlBLGFBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUE7Ozs7QUFJQSxhQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7O0FBSUEsYUFBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBOzs7OztBQUtBLGFBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUE7Ozs7QUFJQSxhQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDSDs7QUFFRDs7Ozs7Ozs7OztBQTZCQTs7Ozs7Ozs7Ozs7OztnREFhd0IsTyxFQUFTLFUsRUFBWTtBQUFBLGdCQUNwQyxLQURvQyxHQUNqQixJQURpQixDQUNwQyxLQURvQztBQUFBLGdCQUM3QixRQUQ2QixHQUNqQixJQURpQixDQUM3QixRQUQ2QjtBQUFBLCtCQUVTLEtBRlQsQ0FFcEMsS0FGb0M7QUFBQSxnQkFFcEMsS0FGb0MsZ0NBRTVCLEVBRjRCO0FBQUEsZ0JBRXhCLFNBRndCLEdBRVMsS0FGVCxDQUV4QixTQUZ3QjtBQUFBLDhCQUVTLEtBRlQsQ0FFYixJQUZhO0FBQUEsZ0JBRWIsSUFGYSwrQkFFTixFQUZNO0FBQUEsNEJBRVMsS0FGVCxDQUVGLEVBRkU7QUFBQSxnQkFFRixFQUZFLDZCQUVHLEVBRkg7QUFBQSxzQ0FHaEIsUUFIZ0IsQ0FHcEMsU0FIb0M7QUFBQSxnQkFHcEMsU0FIb0MsdUNBR3hCLElBSHdCOzs7QUFLekMsZ0JBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZixtREFDa0IsRUFEbEIsbUJBQ2dDLE9BRGhDLG1DQUVnQixVQUZoQiwwQkFHUyxLQUhUO0FBTUg7O0FBRUQ7Ozs7Ozs7OzRCQXJEZ0I7QUFDWixtQkFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSW1CO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7NEJBTXlCO0FBQUEsZ0JBQ2hCLEtBRGdCLEdBQ1AsSUFETyxDQUNoQixLQURnQjtBQUFBLGdCQUVoQixFQUZnQixHQUVKLEtBRkksQ0FFaEIsRUFGZ0I7QUFBQSxnQkFFWixJQUZZLEdBRUosS0FGSSxDQUVaLElBRlk7OztBQUlyQiw2QkFBYyxFQUFkLGtCQUEyQixJQUEzQjtBQUNIOzs7NEJBbUNVO0FBQUEsZ0JBQ0YsSUFERSxHQUNpRixJQURqRixDQUNGLElBREU7QUFBQSw0QkFDaUYsSUFEakYsQ0FDSSxRQURKO0FBQUEsZ0JBQ0ksUUFESiw2QkFDZSxFQURmO0FBQUEsZ0JBQ21CLE1BRG5CLEdBQ2lGLElBRGpGLENBQ21CLE1BRG5CO0FBQUEsZ0JBQzJCLEtBRDNCLEdBQ2lGLElBRGpGLENBQzJCLEtBRDNCO0FBQUEsZ0JBQ2tDLFNBRGxDLEdBQ2lGLElBRGpGLENBQ2tDLFNBRGxDO0FBQUEsZ0JBQzZDLFlBRDdDLEdBQ2lGLElBRGpGLENBQzZDLFlBRDdDO0FBQUEsZ0JBQzJELGtCQUQzRCxHQUNpRixJQURqRixDQUMyRCxrQkFEM0Q7QUFBQSxrQ0FFMkIsUUFGM0IsQ0FFRixLQUZFO0FBQUEsZ0JBRUssYUFGTCxtQ0FFcUIsRUFGckI7QUFBQSx3Q0FHYyxhQUhkLENBR0YsT0FIRTtBQUFBLGdCQUdGLE9BSEUseUNBR1EsRUFIUjtBQUFBLGdCQUlELEVBSkMsR0FJd0IsS0FKeEIsQ0FJRCxFQUpDO0FBQUEsZ0JBSUcsSUFKSCxHQUl3QixLQUp4QixDQUlHLElBSkg7QUFBQSxnQ0FJd0IsS0FKeEIsQ0FJUyxLQUpUO0FBQUEsZ0JBSVMsS0FKVCxpQ0FJaUIsRUFKakI7QUFBQSwwQkFLdUQsS0FBSyxNQUw1RDtBQUFBLDJDQUtELFFBTEM7QUFBQSxnQkFLRCxRQUxDLG9DQUtVLEVBTFY7QUFBQSw2Q0FLYyxVQUxkO0FBQUEsZ0JBS2MsVUFMZCxzQ0FLMkIsRUFMM0I7QUFBQSx1Q0FLK0IsSUFML0I7QUFBQSxnQkFLcUMsU0FMckMsZ0NBS2lELEVBTGpEOztBQU1QLGdCQUFJLGtCQUFrQixVQUF0QjtBQUNBLGdCQUFJLFlBQVksSUFBSSxLQUFLLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsSUFBakQ7QUFDQSxnQkFBSSxhQUFnQixPQUFoQixTQUEyQixTQUEvQjtBQUNBLGdCQUFJLGdCQUFtQixrQkFBbkIsU0FBeUMsWUFBekMsU0FBeUQsSUFBekQsU0FBaUUsU0FBckU7QUFDQSxnQkFBSSxlQUFlLEtBQUssdUJBQUwsQ0FBNkIsVUFBN0IsRUFBeUMsYUFBekMsQ0FBbkI7QUFDQSxnQkFBSSxnQ0FDRSxZQURGLHNCQUVFLFNBRkYsY0FBSjs7QUFLQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SUw7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0FBRUE7Ozs7O0lBSWEsSSxXQUFBLEk7O0FBRVQ7Ozs7Ozs7Ozs7O0FBV0Esa0JBQTBEO0FBQUEsUUFBOUMsUUFBOEMsdUVBQW5DLEVBQW1DO0FBQUEsUUFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsMEJBQ0ksUUFESixDQUNqRCxLQURpRDtBQUFBLFFBQ2pELEtBRGlELG1DQUN6QyxFQUR5QztBQUFBLDZCQUNJLFFBREosQ0FDckMsUUFEcUM7QUFBQSxRQUNyQyxRQURxQyxzQ0FDMUIsRUFEMEI7QUFBQSx5QkFDSSxRQURKLENBQ3RCLElBRHNCO0FBQUEsUUFDdEIsSUFEc0Isa0NBQ2YsRUFEZTtBQUFBLDJCQUNJLFFBREosQ0FDWCxNQURXO0FBQUEsUUFDWCxNQURXLG9DQUNGLEVBREU7O0FBR3REOzs7OztBQUlBLFNBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUE7Ozs7QUFJQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxTQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7O0FBSUEsU0FBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBOzs7OztBQUtBLFNBQUssYUFBTDtBQUNIOztBQUVEOzs7Ozs7Ozt3QkFJZ0I7QUFDWixhQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7d0JBS21CO0FBQ2YsYUFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQWlCVztBQUFBLFVBQ0YsS0FERSxHQUN3RCxJQUR4RCxDQUNGLEtBREU7QUFBQSxVQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsVUFDZSxJQURmLEdBQ3dELElBRHhELENBQ2UsSUFEZjtBQUFBLFVBQ3FCLE1BRHJCLEdBQ3dELElBRHhELENBQ3FCLE1BRHJCO0FBQUEsVUFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxVQUN3QyxZQUR4QyxHQUN3RCxJQUR4RCxDQUN3QyxZQUR4QztBQUFBLFVBRUYsS0FGRSxHQUVzQyxLQUZ0QyxDQUVGLEtBRkU7QUFBQSxVQUVLLFNBRkwsR0FFc0MsS0FGdEMsQ0FFSyxTQUZMO0FBQUEsd0JBRXNDLEtBRnRDLENBRWdCLElBRmhCO0FBQUEsVUFFZ0IsSUFGaEIsK0JBRXVCLEVBRnZCO0FBQUEsc0JBRXNDLEtBRnRDLENBRTJCLEVBRjNCO0FBQUEsVUFFMkIsRUFGM0IsNkJBRWdDLEVBRmhDO0FBQUEsNEJBRzZDLFFBSDdDLENBR0YsS0FIRTtBQUFBLFVBR0ssYUFITCxtQ0FHcUIsRUFIckI7QUFBQSxnQ0FHNkMsUUFIN0MsQ0FHeUIsU0FIekI7QUFBQSxVQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSxrQ0FJYyxhQUpkLENBSUYsT0FKRTtBQUFBLFVBSUYsT0FKRSx5Q0FJUSxFQUpSOzs7QUFNUCxnQkFBYSxPQUFiLFNBQXdCLFNBQXhCOztBQU5PLDZCQVF3RyxNQVJ4RyxDQVFGLFFBUkU7QUFBQSxVQVFRLGFBUlIsb0NBUXdCLEVBUnhCO0FBQUEsK0JBUXdHLE1BUnhHLENBUTRCLFVBUjVCO0FBQUEsVUFRd0MsZUFSeEMsc0NBUTBELEVBUjFEO0FBQUEsZ0NBUXdHLE1BUnhHLENBUThELFdBUjlEO0FBQUEsVUFROEQsV0FSOUQsdUNBUTRFLEVBUjVFO0FBQUEseUJBUXdHLE1BUnhHLENBUWdGLElBUmhGO0FBQUEsVUFRc0YsU0FSdEYsZ0NBUWtHLEVBUmxHOztBQVNQLFVBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLFVBQUksNEJBQTRCLDhCQUFrQixlQUFsQixFQUFtQyxXQUFuQyxFQUFnRCxJQUFoRjs7QUFFQSxrQ0FBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLFVBQUksNkNBQ2MsRUFEZCxZQUNzQixLQUR0Qiw4Q0FFZ0IsT0FGaEIsaUJBRWlDLEVBRmpDLGtCQUU4QyxJQUY5QywwQkFFb0UseUJBRnBFLFdBRW1HLFNBRm5HLFNBRWdILElBRmhILHVCQUdFLFNBSEYsY0FBSjs7QUFNQSxVQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsa0JBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0hMOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxRQUFRLGtCQUFaOztBQUVBOzs7OztJQUlhLGEsV0FBQSxhOztBQUVUOzs7Ozs7Ozs7OztBQVdBLGlDQUEwRDtBQUFBLG9CQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxvQkFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsc0NBQ0ksUUFESixDQUNqRCxLQURpRDtBQUFBLG9CQUNqRCxLQURpRCxtQ0FDekMsRUFEeUM7QUFBQSx5Q0FDSSxRQURKLENBQ3JDLFFBRHFDO0FBQUEsb0JBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLHFDQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxvQkFDdEIsSUFEc0Isa0NBQ2YsRUFEZTtBQUFBLHVDQUNJLFFBREosQ0FDWCxNQURXO0FBQUEsb0JBQ1gsTUFEVyxvQ0FDRixFQURFOztBQUd0RDs7Ozs7QUFJQSxxQkFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTs7OztBQUlBLHFCQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxxQkFBSyxJQUFMLEdBQVksSUFBWjs7QUFFQTs7OztBQUlBLHFCQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7Ozs7QUFNQSxxQkFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBOzs7OztBQUtBLHFCQUFLLGFBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBSWdCO0FBQ1o7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBS21CO0FBQ2Y7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBaUJXO0FBQUEsNEJBQ0YsS0FERSxHQUN3RCxJQUR4RCxDQUNGLEtBREU7QUFBQSw0QkFDSyxRQURMLEdBQ3dELElBRHhELENBQ0ssUUFETDtBQUFBLDRCQUNlLElBRGYsR0FDd0QsSUFEeEQsQ0FDZSxJQURmO0FBQUEsNEJBQ3FCLE1BRHJCLEdBQ3dELElBRHhELENBQ3FCLE1BRHJCO0FBQUEsNEJBQzZCLFNBRDdCLEdBQ3dELElBRHhELENBQzZCLFNBRDdCO0FBQUEsNEJBQ3dDLFlBRHhDLEdBQ3dELElBRHhELENBQ3dDLFlBRHhDO0FBQUEsNEJBRUYsS0FGRSxHQUVzQyxLQUZ0QyxDQUVGLEtBRkU7QUFBQSw0QkFFSyxTQUZMLEdBRXNDLEtBRnRDLENBRUssU0FGTDtBQUFBLDBDQUVzQyxLQUZ0QyxDQUVnQixJQUZoQjtBQUFBLDRCQUVnQixJQUZoQiwrQkFFdUIsRUFGdkI7QUFBQSx3Q0FFc0MsS0FGdEMsQ0FFMkIsRUFGM0I7QUFBQSw0QkFFMkIsRUFGM0IsNkJBRWdDLEVBRmhDO0FBQUEsOENBRzZDLFFBSDdDLENBR0YsS0FIRTtBQUFBLDRCQUdLLGFBSEwsbUNBR3FCLEVBSHJCO0FBQUEsa0RBRzZDLFFBSDdDLENBR3lCLFNBSHpCO0FBQUEsNEJBR3lCLFNBSHpCLHVDQUdxQyxJQUhyQztBQUFBLG9EQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsNEJBSUYsT0FKRSx5Q0FJUSxFQUpSOzs7QUFNUCxrQ0FBYSxPQUFiLFNBQXdCLFNBQXhCOztBQU5PLCtDQVF3RyxNQVJ4RyxDQVFGLFFBUkU7QUFBQSw0QkFRUSxhQVJSLG9DQVF3QixFQVJ4QjtBQUFBLGlEQVF3RyxNQVJ4RyxDQVE0QixVQVI1QjtBQUFBLDRCQVF3QyxlQVJ4QyxzQ0FRMEQsRUFSMUQ7QUFBQSxrREFRd0csTUFSeEcsQ0FROEQsV0FSOUQ7QUFBQSw0QkFROEQsV0FSOUQsdUNBUTRFLEVBUjVFO0FBQUEsMkNBUXdHLE1BUnhHLENBUWdGLElBUmhGO0FBQUEsNEJBUXNGLFNBUnRGLGdDQVFrRyxFQVJsRzs7QUFTUCw0QkFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsNEJBQUksNEJBQTRCLElBQUksS0FBSyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFdBQXhDLEVBQXFELElBQXJGOztBQUVBLG9EQUErQix5QkFBL0IsU0FBNEQsWUFBNUQ7O0FBRUEsNEJBQUksU0FBSixFQUFlLFFBQVEsU0FBUjs7QUFFZiw0QkFBSSw2Q0FDYyxFQURkLFlBQ3NCLEtBRHRCLDhDQUVnQixPQUZoQixpQkFFaUMsRUFGakMsa0JBRThDLElBRjlDLG9DQUU4RSx5QkFGOUUsV0FFNkcsU0FGN0csU0FFMEgsSUFGMUgsdUJBR0UsU0FIRixjQUFKOztBQU1BLG9DQUFVLFNBQVY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQzNITDs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksUUFBUSxrQkFBWjs7QUFFQTs7Ozs7SUFJYSxLLFdBQUEsSzs7QUFFVDs7Ozs7Ozs7Ozs7QUFXQSx5QkFBMEQ7QUFBQSxvQkFBOUMsUUFBOEMsdUVBQW5DLEVBQW1DO0FBQUEsb0JBQS9CLGFBQStCOztBQUFBOztBQUFBLHNDQUNJLFFBREosQ0FDakQsS0FEaUQ7QUFBQSxvQkFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEseUNBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLG9CQUNyQyxRQURxQyxzQ0FDMUIsRUFEMEI7QUFBQSxxQ0FDSSxRQURKLENBQ3RCLElBRHNCO0FBQUEsb0JBQ3RCLElBRHNCLGtDQUNmLEVBRGU7QUFBQSx1Q0FDSSxRQURKLENBQ1gsTUFEVztBQUFBLG9CQUNYLE1BRFcsb0NBQ0YsRUFERTs7QUFHdEQ7Ozs7O0FBSUEscUJBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUE7Ozs7QUFJQSxxQkFBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBOzs7O0FBSUEscUJBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7Ozs7QUFJQSxxQkFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7Ozs7O0FBTUEscUJBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQTs7Ozs7QUFLQSxxQkFBSyxhQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7O29DQUlnQjtBQUNaLCtCQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBS21CO0FBQ2YsK0JBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FpQlc7QUFBQSw0QkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLDRCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsNEJBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSw0QkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSw0QkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSw0QkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwyQ0FFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsNEJBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsNEJBRVUsU0FGVixHQUUyQyxLQUYzQyxDQUVVLFNBRlY7QUFBQSwwQ0FFMkMsS0FGM0MsQ0FFcUIsSUFGckI7QUFBQSw0QkFFcUIsSUFGckIsK0JBRTRCLEVBRjVCO0FBQUEsd0NBRTJDLEtBRjNDLENBRWdDLEVBRmhDO0FBQUEsNEJBRWdDLEVBRmhDLDZCQUVxQyxFQUZyQztBQUFBLDhDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSw0QkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLGtEQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLDRCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSxvREFJYyxhQUpkLENBSUYsT0FKRTtBQUFBLDRCQUlGLE9BSkUseUNBSVEsRUFKUjs7O0FBTVAsa0NBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFOTywrQ0FRd0csTUFSeEcsQ0FRRixRQVJFO0FBQUEsNEJBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSxpREFRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSw0QkFRd0MsZUFSeEMsc0NBUTBELEVBUjFEO0FBQUEsa0RBUXdHLE1BUnhHLENBUThELFdBUjlEO0FBQUEsNEJBUThELFdBUjlELHVDQVE0RSxFQVI1RTtBQUFBLDJDQVF3RyxNQVJ4RyxDQVFnRixJQVJoRjtBQUFBLDRCQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsNEJBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLDRCQUFJLDRCQUE0QixJQUFJLEtBQUssYUFBVCxDQUF1QixlQUF2QixFQUF3QyxXQUF4QyxFQUFxRCxJQUFyRjs7QUFFQSxvREFBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLDRCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsNEJBQUksNkNBQ2MsRUFEZCxZQUNzQixLQUR0Qiw4Q0FFZ0IsT0FGaEIsaUJBRWlDLEVBRmpDLGtCQUU4QyxJQUY5QywyQkFFcUUseUJBRnJFLFdBRW9HLFNBRnBHLFNBRWlILElBRmpILHVCQUdFLFNBSEYsY0FBSjs7QUFNQSxvQ0FBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSEw7Ozs7QUFFQTs7OztJQUlhLEksV0FBQSxJOztBQUVUOzs7Ozs7OztBQVFBLGtCQUFZLFNBQVosRUFBdUIsSUFBdkIsRUFBNkIsa0JBQTdCLEVBQWlELFFBQWpELEVBQTBFO0FBQUEsWUFBZixLQUFlOztBQUFBOztBQUV0RTs7Ozs7QUFLQSxhQUFLLFNBQUwsR0FBaUIsU0FBakI7O0FBRUE7Ozs7QUFJQSxhQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7O0FBSUEsYUFBSyxrQkFBTCxHQUEwQixrQkFBMUI7O0FBRUE7Ozs7QUFJQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxhQUFLLE1BQUwsR0FBYyxTQUFTLE1BQXZCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDSDs7QUFFRDs7Ozs7Ozs7NEJBSWtCO0FBQ2QsbUJBQU8sS0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXlCdUI7QUFBQSwwQkFDQyxJQURELENBQ2QsTUFEYztBQUFBLGdCQUNkLE1BRGMsMkJBQ0wsRUFESztBQUFBLGdDQUUwSCxNQUYxSCxDQUVkLEtBRmM7QUFBQSxnQkFFUCxXQUZPLGlDQUVPLFFBRlA7QUFBQSxnQkFFNEIsZUFGNUIsR0FFMEgsTUFGMUgsQ0FFaUIsU0FGakI7QUFBQSxnQ0FFMEgsTUFGMUgsQ0FFNkMsS0FGN0M7QUFBQSxnQkFFb0QsV0FGcEQsaUNBRWtFLEVBRmxFO0FBQUEsb0NBRTBILE1BRjFILENBRXNFLFNBRnRFO0FBQUEsZ0JBRWlGLGVBRmpGLHFDQUVtRyxFQUZuRztBQUFBLHFDQUUwSCxNQUYxSCxDQUV1RyxVQUZ2RztBQUFBLGdCQUV1RyxVQUZ2RyxzQ0FFb0gsRUFGcEg7QUFBQSx1Q0FHc0IsV0FIdEIsQ0FHZCxPQUhjO0FBQUEsZ0JBR0wsa0JBSEssd0NBR2dCLEVBSGhCO0FBQUEsd0NBSTBCLGVBSjFCLENBSWQsT0FKYztBQUFBLGdCQUlMLHNCQUpLLHlDQUlvQixFQUpwQjs7O0FBTW5CLDBCQUFjLGtCQUFrQixlQUFsQixHQUFvQyxXQUFsRDs7QUFFQSxnQkFBSSxhQUFhLFlBQVksTUFBWixJQUFzQixDQUF0QixpREFFZ0Isc0JBRmhCLHVDQUdJLGtCQUhKLDBCQUd5QyxVQUh6QywrQkFJSCxXQUpHLDZFQU9MLEVBUFo7O0FBU0EsbUJBQU8sVUFBUDtBQUNIOztBQUlEOzs7Ozs7Ozs0QkFLVztBQUFBLGdCQUNGLFNBREUsR0FDNEQsSUFENUQsQ0FDRixTQURFO0FBQUEsZ0JBQ1MsSUFEVCxHQUM0RCxJQUQ1RCxDQUNTLElBRFQ7QUFBQSxnQkFDZSxrQkFEZixHQUM0RCxJQUQ1RCxDQUNlLGtCQURmO0FBQUEsZ0JBQ21DLFFBRG5DLEdBQzRELElBRDVELENBQ21DLFFBRG5DO0FBQUEsZ0JBQzZDLFdBRDdDLEdBQzRELElBRDVELENBQzZDLFdBRDdDO0FBQUEsbUNBRWtGLFFBRmxGLENBRUYsTUFGRTtBQUFBLGdCQUVGLE1BRkUsb0NBRU8sRUFGUDtBQUFBLG9DQUVrRixRQUZsRixDQUVXLE9BRlg7QUFBQSxnQkFFb0IsaUJBRnBCLHFDQUV3QyxFQUZ4QztBQUFBLGdCQUVpRCxNQUZqRCxHQUVrRixRQUZsRixDQUU0QyxFQUY1QztBQUFBLGtDQUVrRixRQUZsRixDQUV5RCxLQUZ6RDtBQUFBLGdCQUV5RCxLQUZ6RCxtQ0FFaUUsRUFGakU7QUFBQSxnQkFFcUUsU0FGckUsR0FFa0YsUUFGbEYsQ0FFcUUsU0FGckU7OztBQUlQLGdCQUFHLFNBQUgsRUFBYyxRQUFRLFNBQVI7O0FBRWQsZ0JBQUksQ0FBQyxTQUFTLFVBQWQsRUFBMEI7QUFDdEIsMEJBQVUsSUFBVixDQUFlO0FBQ1gsOEJBQVUsTUFEQztBQUVYLDBCQUFNLEtBQUs7QUFGQSxpQkFBZjtBQUlIOztBQUVELGdCQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixTQUEzQixDQUFmOztBQUVBLHNDQUNNLEtBRE4sZ0NBRWdCLE1BRmhCLHNCQUV1QyxXQUZ2QyxTQUVzRCxpQkFGdEQsMkJBRTZGLElBRjdGLFVBRXNHLGtCQUZ0RywyQ0FHVSxRQUhWO0FBTUg7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcElMOzs7OztJQUthLGEsV0FBQSxhOztBQUVUOzs7Ozs7OztBQVFBLDZCQUFnQztBQUFBLFlBQXBCLGFBQW9CLHVFQUFKLEVBQUk7O0FBQUE7O0FBRTVCOzs7O0FBSUEsYUFBSyxhQUFMLEdBQXFCLGFBQXJCO0FBRUg7O0FBRUQ7Ozs7Ozs7OzRCQUlxQjtBQUNqQixtQkFBTyxlQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSXVCO0FBQ25CLG1CQUFPLGdCQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs0QkFTVztBQUFBLGdCQUNGLGFBREUsR0FDaUQsSUFEakQsQ0FDRixhQURFO0FBQUEsZ0JBQ2EsY0FEYixHQUNpRCxJQURqRCxDQUNhLGNBRGI7QUFBQSxnQkFDNkIsZ0JBRDdCLEdBQ2lELElBRGpELENBQzZCLGdCQUQ3Qjs7QUFFUCxnQkFBSSxtQkFBbUIsY0FBYyxNQUFkLENBQXFCLFVBQUMsZ0JBQUQsRUFBbUIsWUFBbkIsRUFBaUMsS0FBakMsRUFBMkM7QUFDbkYsdUJBQVUsZ0JBQVYscUJBQTBDLGNBQTFDLFVBQTZELGFBQWEsUUFBMUUsK0JBQ1UsYUFBYSxPQUR2QjtBQUdILGFBSnNCLEVBSXBCLEVBSm9CLENBQXZCOztBQU1BLGdCQUFJLGlCQUFpQixNQUFqQixHQUEwQixDQUE5QixFQUFpQztBQUM3Qix5Q0FBc0IsZ0JBQXRCLDZCQUNNLGdCQUROO0FBR0g7O0FBRUQsbUJBQU8sRUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDakVMOztBQUNBOzs7O0FBRUE7Ozs7SUFJYSxNLFdBQUEsTTs7QUFFVDs7Ozs7Ozs7Ozs7QUFXQSwwQkFBMEQ7QUFBQSxvQkFBOUMsUUFBOEMsdUVBQW5DLEVBQW1DO0FBQUEsb0JBQS9CLGFBQStCOztBQUFBOztBQUFBLHNDQUNJLFFBREosQ0FDakQsS0FEaUQ7QUFBQSxvQkFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEseUNBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLG9CQUNyQyxRQURxQyxzQ0FDMUIsRUFEMEI7QUFBQSxxQ0FDSSxRQURKLENBQ3RCLElBRHNCO0FBQUEsb0JBQ3RCLElBRHNCLGtDQUNmLEVBRGU7QUFBQSx1Q0FDSSxRQURKLENBQ1gsTUFEVztBQUFBLG9CQUNYLE1BRFcsb0NBQ0YsRUFERTs7QUFHdEQ7Ozs7O0FBSUEscUJBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUE7Ozs7QUFJQSxxQkFBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBOzs7O0FBSUEscUJBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7Ozs7QUFJQSxxQkFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7Ozs7O0FBTUEscUJBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQTs7Ozs7QUFLQSxxQkFBSyxhQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7O29DQUlnQjtBQUNaLCtCQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBS21CO0FBQ2YsK0JBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FvQlc7QUFBQSw0QkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLDRCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsNEJBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSw0QkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSw0QkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSw0QkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwyQ0FFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsNEJBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsMENBRTJDLEtBRjNDLENBRVUsSUFGVjtBQUFBLDRCQUVVLElBRlYsK0JBRWlCLEVBRmpCO0FBQUEsd0NBRTJDLEtBRjNDLENBRXFCLEVBRnJCO0FBQUEsNEJBRXFCLEVBRnJCLDZCQUUwQixFQUYxQjtBQUFBLDRCQUU4QixTQUY5QixHQUUyQyxLQUYzQyxDQUU4QixTQUY5QjtBQUFBLDhDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSw0QkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLGtEQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLDRCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSxvREFJYyxhQUpkLENBSUYsT0FKRTtBQUFBLDRCQUlGLE9BSkUseUNBSVEsRUFKUjs7O0FBTVAsa0NBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFOTywrQ0FRd0csTUFSeEcsQ0FRRixRQVJFO0FBQUEsNEJBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSxpREFRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSw0QkFRd0MsZUFSeEMsc0NBUTBELEVBUjFEO0FBQUEsa0RBUXdHLE1BUnhHLENBUThELFdBUjlEO0FBQUEsNEJBUThELFdBUjlELHVDQVE0RSxFQVI1RTtBQUFBLDJDQVF3RyxNQVJ4RyxDQVFnRixJQVJoRjtBQUFBLDRCQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsNEJBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLDRCQUFJLDRCQUE0QixJQUFJLEtBQUssYUFBVCxDQUF1QixlQUF2QixFQUF3QyxXQUF4QyxFQUFxRCxJQUFyRjs7QUFFQSxvREFBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLDRCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsNEJBQUksNkNBQ2MsRUFEZCxZQUNzQixLQUR0Qiw4Q0FFZ0IsT0FGaEIsbUJBRW1DLElBRm5DLDRCQUUyRCx5QkFGM0QsV0FFMEYsU0FGMUYsU0FFdUcsSUFGdkcsdUJBR0UsU0FIRixjQUFKOztBQU1BLG9DQUFVLFNBQVY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQzNITDs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksUUFBUSxrQkFBWjs7SUFFYSxPLFdBQUEsTztBQUNULHFCQUFZLFFBQVosRUFBcUQ7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSxZQUM1QyxLQUQ0QyxHQUN5QixRQUR6QixDQUM1QyxLQUQ0QztBQUFBLG9DQUN5QixRQUR6QixDQUNyQyxjQURxQztBQUFBLFlBQ3JDLGNBRHFDLHlDQUNwQixFQURvQjtBQUFBLGlDQUN5QixRQUR6QixDQUNoQixRQURnQjtBQUFBLFlBQ2hCLFFBRGdCLHNDQUNMLEVBREs7QUFBQSw2QkFDeUIsUUFEekIsQ0FDRCxJQURDO0FBQUEsWUFDRCxJQURDLGtDQUNNLEVBRE47QUFBQSwrQkFDeUIsUUFEekIsQ0FDVSxNQURWO0FBQUEsWUFDVSxNQURWLG9DQUNtQixFQURuQjs7O0FBR2pELGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTDtBQUNIOzs7OzRCQUVlO0FBQ1osbUJBQU8sRUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixJQURFLEdBQ3dFLElBRHhFLENBQ0YsSUFERTtBQUFBLGdCQUNJLEtBREosR0FDd0UsSUFEeEUsQ0FDSSxLQURKO0FBQUEsZ0JBQ1csY0FEWCxHQUN3RSxJQUR4RSxDQUNXLGNBRFg7QUFBQSxnQkFDMkIsTUFEM0IsR0FDd0UsSUFEeEUsQ0FDMkIsTUFEM0I7QUFBQSxnQkFDbUMsUUFEbkMsR0FDd0UsSUFEeEUsQ0FDbUMsUUFEbkM7QUFBQSxnQkFDNkMsU0FEN0MsR0FDd0UsSUFEeEUsQ0FDNkMsU0FEN0M7QUFBQSxnQkFDd0QsWUFEeEQsR0FDd0UsSUFEeEUsQ0FDd0QsWUFEeEQ7QUFBQSxnQkFFRixFQUZFLEdBRTBDLEtBRjFDLENBRUYsRUFGRTtBQUFBLGdCQUVFLElBRkYsR0FFMEMsS0FGMUMsQ0FFRSxJQUZGO0FBQUEsZ0JBRVEsT0FGUixHQUUwQyxLQUYxQyxDQUVRLE9BRlI7QUFBQSwrQkFFMEMsS0FGMUMsQ0FFaUIsS0FGakI7QUFBQSxnQkFFaUIsS0FGakIsZ0NBRXlCLEVBRnpCO0FBQUEsZ0JBRTZCLFNBRjdCLEdBRTBDLEtBRjFDLENBRTZCLFNBRjdCO0FBQUEsa0NBRzZDLFFBSDdDLENBR0YsS0FIRTtBQUFBLGdCQUdLLGFBSEwsbUNBR3FCLEVBSHJCO0FBQUEsc0NBRzZDLFFBSDdDLENBR3lCLFNBSHpCO0FBQUEsZ0JBR3lCLFNBSHpCLHVDQUdxQyxJQUhyQztBQUFBLHdDQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsZ0JBSUYsT0FKRSx5Q0FJUSxFQUpSOzs7QUFNUCxzQkFBYSxPQUFiLFNBQXdCLFNBQXhCOztBQU5PLG1DQVF3RyxNQVJ4RyxDQVFGLFFBUkU7QUFBQSxnQkFRUSxhQVJSLG9DQVF3QixFQVJ4QjtBQUFBLHFDQVF3RyxNQVJ4RyxDQVE0QixVQVI1QjtBQUFBLGdCQVF3QyxlQVJ4QyxzQ0FRMEQsRUFSMUQ7QUFBQSxzQ0FRd0csTUFSeEcsQ0FROEQsV0FSOUQ7QUFBQSxnQkFROEQsV0FSOUQsdUNBUTRFLEVBUjVFO0FBQUEsK0JBUXdHLE1BUnhHLENBUWdGLElBUmhGO0FBQUEsZ0JBUXNGLFNBUnRGLGdDQVFrRyxFQVJsRzs7QUFTUCxnQkFBSSxvRUFBSjtBQUNBLGdCQUFJLFlBQVksSUFBSSxLQUFLLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBdEQ7QUFDQSxnQkFBSSw0QkFBNEIsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsV0FBeEMsRUFBcUQsSUFBckY7O0FBRUEsd0NBQStCLHlCQUEvQixTQUE0RCxZQUE1RDs7QUFFQSxnQkFBSSxnQkFBZ0IsUUFBaEIsSUFBNkIsa0JBQWtCLGVBQWUsTUFBZixJQUF5QixDQUE1RSxFQUFnRjtBQUM1RSxtQ0FBbUIseUNBQ0ssY0FETCxpQkFFZixnQkFGSjtBQUdIOztBQUVELGdCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsZ0JBQUksY0FBYyxRQUFRLE1BQVIsQ0FBZSxVQUFDLFVBQUQsRUFBYSxNQUFiLEVBQXdCO0FBQ3JELHVCQUFVLFVBQVYsc0NBQ2lCLE9BQU8sS0FEeEIsV0FDa0MsT0FBTyxPQUR6QztBQUVILGFBSGlCLEVBR2YsRUFIZSxDQUFsQjs7QUFLQSxnQkFBSSw4Q0FDZSxFQURmLFdBQ3NCLEtBRHRCLDhEQUVvQixPQUZwQixpQkFFcUMsRUFGckMsa0JBRWtELElBRmxELFVBRTBELHlCQUYxRCxTQUV1RixTQUZ2RixTQUVvRyxJQUZwRyw2QkFHUSxnQkFIUiw0QkFJUSxXQUpSLG1EQU1LLFNBTlQ7O0FBUUEsd0JBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVMOztBQUNBOzs7O0lBRWEsSyxXQUFBLEs7QUFDVCxtQkFBWSxhQUFaLEVBQTBEO0FBQUEsWUFBL0IsYUFBK0I7O0FBQUE7O0FBQUEsbUNBQ1EsYUFEUixDQUNoRCxLQURnRDtBQUFBLFlBQ2hELEtBRGdELHdDQUN4QyxFQUR3QztBQUFBLG9DQUNRLGFBRFIsQ0FDcEMsTUFEb0M7QUFBQSxZQUNwQyxNQURvQyx5Q0FDM0IsRUFEMkI7QUFBQSxvQ0FDUSxhQURSLENBQ3ZCLE1BRHVCO0FBQUEsWUFDdkIsTUFEdUIseUNBQ2QsRUFEYztBQUFBLG9DQUNRLGFBRFIsQ0FDVixRQURVO0FBQUEsWUFDVixRQURVLHlDQUNDLEVBREQ7OztBQUd0RCxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDQSxhQUFLLGFBQUw7QUFDSDs7OztxQ0FFWSxVLEVBQVk7QUFDckIsbUJBQU8sVUFBUDtBQUNIOzs7K0NBRXNCLFMsRUFBVyxTLEVBQXVCO0FBQUEsZ0JBQVosS0FBWSx1RUFBSixFQUFJO0FBQUEsZ0JBQy9DLEVBRCtDLEdBQ3hDLEtBQUssS0FEbUMsQ0FDL0MsRUFEK0M7O0FBRXJELGdCQUFJLGlCQUFlLEVBQWYsSUFBb0IsTUFBTSxNQUFOLEdBQWUsQ0FBZixHQUFtQixNQUFNLEtBQXpCLEdBQWlDLEVBQXJELENBQUo7O0FBRUEsZ0RBQ2MsU0FEZCxtQkFDbUMsU0FEbkMscUJBRUUsU0FGRjtBQUlIOzs7d0NBRWUsUSxFQUFVLEssRUFBTyxLLEVBQU87QUFBQSxnQkFDOUIsRUFEOEIsR0FDdkIsS0FBSyxLQURrQixDQUM5QixFQUQ4Qjs7QUFFcEMsZ0JBQUksaUJBQWUsRUFBZixJQUFvQixNQUFNLE1BQU4sR0FBZSxDQUFmLEdBQW1CLE1BQU0sS0FBekIsR0FBaUMsRUFBckQsQ0FBSjs7QUFFQSxrRUFDOEIsU0FEOUIsV0FDNEMsUUFENUMsdUJBRU0sS0FGTjtBQUdIOzs7NEJBRWU7QUFDWixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFa0I7QUFDZixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNELE1BREMsR0FDOEMsSUFEOUMsQ0FDRCxNQURDO0FBQUEsZ0JBQ08sTUFEUCxHQUM4QyxJQUQ5QyxDQUNPLE1BRFA7QUFBQSxnQkFDZSxRQURmLEdBQzhDLElBRDlDLENBQ2UsUUFEZjtBQUFBLGdCQUN5QixLQUR6QixHQUM4QyxJQUQ5QyxDQUN5QixLQUR6QjtBQUFBLGdCQUNnQyxTQURoQyxHQUM4QyxJQUQ5QyxDQUNnQyxTQURoQztBQUFBLGdCQUVTLGFBRlQsR0FFaUQsTUFGakQsQ0FFRCxRQUZDO0FBQUEsK0JBRWlELE1BRmpELENBRXdCLElBRnhCO0FBQUEsZ0JBRThCLFNBRjlCLGdDQUUwQyxFQUYxQzs7QUFHUCxnQkFBSSxPQUFPLElBQVg7QUFITyxnQkFJTSxVQUpOLEdBSWdELEtBSmhELENBSUQsS0FKQztBQUFBLGdCQUk2QixjQUo3QixHQUlnRCxLQUpoRCxDQUlrQixTQUpsQjtBQUFBLHNDQUtvQixRQUxwQixDQUtELFNBTEM7QUFBQSxnQkFLRCxTQUxDLHVDQUtXLElBTFg7OztBQU9QLGdCQUFJLGNBQUosRUFBb0IsYUFBYSxjQUFiOztBQUVwQixnQkFBSSxhQUFhLE9BQU8sTUFBUCxDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXdCO0FBQUEsb0JBQzdDLEtBRDZDLEdBQ0MsS0FERCxDQUM3QyxLQUQ2QztBQUFBLHNDQUNDLEtBREQsQ0FDdEMsUUFEc0M7QUFBQSxvQkFDdEMsUUFEc0MsbUNBQzNCLEVBRDJCO0FBQUEscUNBQ0MsS0FERCxDQUN2QixPQUR1QjtBQUFBLG9CQUN2QixPQUR1QixrQ0FDYixFQURhO0FBQUEsb0JBQ1QsS0FEUyxHQUNDLEtBREQsQ0FDVCxLQURTOzs7QUFHbkQsMkJBQWMsUUFBZCxTQUEwQixTQUExQjs7QUFFQSxvQkFBSSxZQUFZLEtBQUssZUFBTCxDQUFxQixRQUFyQixFQUErQixLQUEvQixFQUFzQyxNQUFNLFlBQU4sQ0FBbUIsS0FBbkIsRUFBMEIsS0FBaEUsQ0FBaEI7O0FBRUEsdUJBQVUsSUFBVixzQkFDRSxLQUFLLHNCQUFMLENBQTRCLFNBQTVCLEVBQTBDLFNBQTFDLFNBQXVELE9BQXZELEVBQWtFLE1BQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixLQUE1RixDQURGO0FBRUgsYUFUZ0IsRUFTZCxVQVRjLENBQWpCO0FBVUEsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDBDQUNHLFVBREgsdUJBRUcsU0FGUDs7QUFJQSxtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2RVEsVSxXQUFBLFU7QUFDVCx3QkFBWSxXQUFaLEVBQXlCLElBQXpCLEVBQStCO0FBQUE7O0FBQzNCLGFBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sRUFBUDtBQUNIOzs7NEJBQzBCO0FBQ3ZCLG1CQUFPLEVBQVA7QUFDSDs7OzRCQUMyQjtBQUN4QixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNGLFdBREUsR0FDc0YsSUFEdEYsQ0FDRixXQURFO0FBQUEsZ0JBQ1csSUFEWCxHQUNzRixJQUR0RixDQUNXLElBRFg7QUFBQSxnQkFDaUIsb0JBRGpCLEdBQ3NGLElBRHRGLENBQ2lCLG9CQURqQjtBQUFBLGdCQUN1QyxvQkFEdkMsR0FDc0YsSUFEdEYsQ0FDdUMsb0JBRHZDO0FBQUEsZ0JBQzZELHFCQUQ3RCxHQUNzRixJQUR0RixDQUM2RCxxQkFEN0Q7QUFBQSwrQkFFd0MsSUFGeEMsQ0FFRixNQUZFO0FBQUEsZ0JBRUYsTUFGRSxnQ0FFTyxFQUZQO0FBQUEsK0JBRXdDLElBRnhDLENBRVcsTUFGWDtBQUFBLGdCQUVXLE1BRlgsZ0NBRW9CLEVBRnBCO0FBQUEsZ0NBRXdDLElBRnhDLENBRXdCLE9BRnhCO0FBQUEsZ0JBRXdCLE9BRnhCLGlDQUVrQyxFQUZsQztBQUFBLGtDQUdvRCxNQUhwRCxDQUdGLE9BSEU7QUFBQSxnQkFHTyxhQUhQLG1DQUd1QixFQUh2QjtBQUFBLCtCQUdvRCxNQUhwRCxDQUcyQixJQUgzQjtBQUFBLGdCQUdpQyxVQUhqQztBQUFBLG1DQUkrQixPQUovQixDQUlGLE9BSkU7QUFBQSxnQkFJTyxjQUpQLG9DQUl3QixFQUp4QjtBQUFBLGtDQUtvRCxNQUxwRCxDQUtGLE9BTEU7QUFBQSxnQkFLTyxhQUxQLG1DQUt1QixFQUx2QjtBQUFBLCtCQUtvRCxNQUxwRCxDQUsyQixJQUwzQjtBQUFBLGdCQUtpQyxVQUxqQyxnQ0FLOEMsRUFMOUM7OztBQU9QLHNEQUNzQixjQUR0QixTQUN3QyxxQkFEeEMsY0FDc0UsS0FBSyxFQUQzRSw0Q0FFMEIsYUFGMUIsU0FFMkMsb0JBRjNDLFVBRW9FLFVBRnBFLG1DQUdVLFdBSFYseUNBSXlCLGFBSnpCLFNBSTBDLG9CQUoxQyxVQUltRSxVQUpuRTtBQU1IOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JMOzs7O0lBRWEsZSxXQUFBLGU7QUFDVCw2QkFBWSxJQUFaLEVBQWtCLFdBQWxCLEVBQStCO0FBQUE7O0FBQzNCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLFdBQUwsR0FBbUIsV0FBbkI7QUFDSDs7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRTBCO0FBQ3ZCLG1CQUFPLEVBQVA7QUFDSDs7OzRCQUUyQjtBQUN4QixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFaUM7QUFDOUIsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixJQURFLEdBQ21ILElBRG5ILENBQ0YsSUFERTtBQUFBLGdCQUNJLFdBREosR0FDbUgsSUFEbkgsQ0FDSSxXQURKO0FBQUEsZ0JBQ2lCLG9CQURqQixHQUNtSCxJQURuSCxDQUNpQixvQkFEakI7QUFBQSxnQkFDdUMsb0JBRHZDLEdBQ21ILElBRG5ILENBQ3VDLG9CQUR2QztBQUFBLGdCQUM2RCxxQkFEN0QsR0FDbUgsSUFEbkgsQ0FDNkQscUJBRDdEO0FBQUEsZ0JBQ29GLDJCQURwRixHQUNtSCxJQURuSCxDQUNvRiwyQkFEcEY7QUFBQSwrQkFFNEQsSUFGNUQsQ0FFRixNQUZFO0FBQUEsZ0JBRUYsTUFGRSxnQ0FFTyxFQUZQO0FBQUEsK0JBRTRELElBRjVELENBRVcsTUFGWDtBQUFBLGdCQUVXLE1BRlgsZ0NBRW9CLEVBRnBCO0FBQUEsZ0NBRTRELElBRjVELENBRXdCLE9BRnhCO0FBQUEsZ0JBRXdCLE9BRnhCLGlDQUVrQyxFQUZsQztBQUFBLHNDQUU0RCxJQUY1RCxDQUVzQyxhQUZ0QztBQUFBLGdCQUVzQyxhQUZ0Qyx1Q0FFc0QsRUFGdEQ7QUFBQSxrQ0FHb0QsTUFIcEQsQ0FHRixPQUhFO0FBQUEsZ0JBR08sYUFIUCxtQ0FHdUIsRUFIdkI7QUFBQSwrQkFHb0QsTUFIcEQsQ0FHMkIsSUFIM0I7QUFBQSxnQkFHaUMsVUFIakM7QUFBQSxtQ0FJOEIsT0FKOUIsQ0FJRixPQUpFO0FBQUEsZ0JBSU8sY0FKUCxvQ0FJd0IsRUFKeEI7QUFBQSxrQ0FLb0QsTUFMcEQsQ0FLRixPQUxFO0FBQUEsZ0JBS08sYUFMUCxtQ0FLdUIsRUFMdkI7QUFBQSwrQkFLb0QsTUFMcEQsQ0FLMkIsSUFMM0I7QUFBQSxnQkFLaUMsVUFMakMsZ0NBSzhDLEVBTDlDO0FBQUEsd0NBTThFLGFBTjlFLENBTUYsT0FORTtBQUFBLGdCQU1PLG9CQU5QLHlDQU04QixFQU45QjtBQUFBLHdDQU04RSxhQU45RSxDQU1rQyxVQU5sQztBQUFBLGdCQU04Qyx1QkFOOUMseUNBTXdFLEVBTnhFOztBQU9QLGdCQUFJLDZCQUE2Qiw4QkFBa0IsdUJBQWxCLEVBQTJDLE9BQU8sSUFBUCxDQUFZLHVCQUFaLENBQTNDLEVBQWlGLElBQWxIOztBQUVBLHNEQUNzQixjQUR0QixTQUN3QyxxQkFEeEMsY0FDc0UsS0FBSyxFQUQzRSw0Q0FFMEIsYUFGMUIsU0FFMkMsb0JBRjNDLFVBRW9FLFVBRnBFLGlEQUd1QiwyQkFIdkIsU0FHc0Qsb0JBSHRELFdBRytFLDBCQUgvRSwrQkFJYyxXQUpkLGlFQU15QixhQU56QixTQU0wQyxvQkFOMUMsVUFNbUUsVUFObkU7QUFRSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN6Q1EsSyxXQUFBLEs7QUFDVCxxQkFBYztBQUFBO0FBQUU7Ozs7aUNBRVAsSyxFQUFPO0FBQ1osZ0JBQUksVUFBVSxHQUFkLEVBQW1CLE9BQU8sZ0JBQVA7O0FBRW5CLGdCQUFJLGFBQWEsTUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixHQUFuQixDQUFqQjs7QUFFQSxtQ0FBcUIsVUFBckI7QUFDSDs7O3dDQU1lLFUsRUFBWTtBQUN4QixnQkFBSSxPQUFPLElBQVg7QUFEd0Isb0NBRU0sSUFGTixDQUVuQixnQkFGbUI7QUFBQSxnQkFFbkIsZ0JBRm1CLHFDQUVBLEVBRkE7O0FBR3hCLGdCQUFJLFdBQVcsV0FBVyxNQUFYLENBQWtCLFVBQUMsV0FBRCxFQUFjLFNBQWQsRUFBNEI7QUFBQSxvQkFDcEQsSUFEb0QsR0FDN0IsU0FENkIsQ0FDcEQsSUFEb0Q7QUFBQSwwQ0FDN0IsU0FENkIsQ0FDOUMsUUFEOEM7QUFBQSxvQkFDOUMsUUFEOEMsdUNBQ25DLEVBRG1DO0FBQUEsc0NBRXZCLFFBRnVCLENBRXBELEtBRm9EO0FBQUEsb0JBRXBELEtBRm9ELG1DQUU1QyxHQUY0QztBQUFBLDBDQUV2QixRQUZ1QixDQUV2QyxTQUZ1QztBQUFBLG9CQUV2QyxTQUZ1Qyx1Q0FFN0IsRUFGNkI7QUFBQSx5Q0FHdEMsU0FIc0MsQ0FHcEQsT0FIb0Q7QUFBQSxvQkFHcEQsT0FIb0Qsc0NBRzVDLEVBSDRDOzs7QUFLekQsMEJBQWEsT0FBYixTQUF3QixnQkFBeEI7O0FBRUEsb0JBQUksWUFBWSxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQWhCOztBQUVBLHVCQUFPLEtBQUssT0FBTCxDQUFhLGdCQUFiLEVBQWtDLFNBQWxDLFNBQStDLE9BQS9DLENBQVA7O0FBRUEsdUJBQVUsV0FBVixTQUF5QixJQUF6QjtBQUNILGFBWmMsRUFZWixFQVpZLENBQWY7O0FBY0EsbUJBQU8sUUFBUDtBQUNIOzs7NEJBdEJxQjtBQUNsQixtQkFBTyxpQkFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDYkw7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsSSxXQUFBLEk7QUFDVCxvQkFBMEQ7QUFBQSxZQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSw4QkFDSSxRQURKLENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsaUNBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLFlBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLDZCQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxZQUN0QixJQURzQixrQ0FDZixFQURlO0FBQUEsK0JBQ0ksUUFESixDQUNYLE1BRFc7QUFBQSxZQUNYLE1BRFcsb0NBQ0YsRUFERTs7O0FBR3RELGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTDtBQUNIOzs7OzRCQUVlO0FBQ1osbUJBQU8sRUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLGdCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsZ0JBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSxnQkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSxnQkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxnQkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwrQkFFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsZ0JBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsZ0JBRVUsU0FGVixHQUUyQyxLQUYzQyxDQUVVLFNBRlY7QUFBQSw4QkFFMkMsS0FGM0MsQ0FFcUIsSUFGckI7QUFBQSxnQkFFcUIsSUFGckIsK0JBRTRCLEVBRjVCO0FBQUEsNEJBRTJDLEtBRjNDLENBRWdDLEVBRmhDO0FBQUEsZ0JBRWdDLEVBRmhDLDZCQUVxQyxFQUZyQztBQUFBLGtDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSxnQkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLHNDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLGdCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSx3Q0FJYyxhQUpkLENBSUYsT0FKRTtBQUFBLGdCQUlGLE9BSkUseUNBSVEsRUFKUjs7O0FBTVAsc0JBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFOTyxtQ0FRd0csTUFSeEcsQ0FRRixRQVJFO0FBQUEsZ0JBUVEsYUFSUixvQ0FRd0IsRUFSeEI7QUFBQSxxQ0FRd0csTUFSeEcsQ0FRNEIsVUFSNUI7QUFBQSxnQkFRd0MsZUFSeEMsc0NBUTBELEVBUjFEO0FBQUEsc0NBUXdHLE1BUnhHLENBUThELFdBUjlEO0FBQUEsZ0JBUThELFdBUjlELHVDQVE0RSxFQVI1RTtBQUFBLCtCQVF3RyxNQVJ4RyxDQVFnRixJQVJoRjtBQUFBLGdCQVFzRixTQVJ0RixnQ0FRa0csRUFSbEc7O0FBU1AsZ0JBQUksWUFBWSxJQUFJLEtBQUssYUFBVCxDQUF1QixhQUF2QixFQUFzQyxJQUF0RDtBQUNBLGdCQUFJLDRCQUE0QixJQUFJLEtBQUssYUFBVCxDQUF1QixlQUF2QixFQUF3QyxXQUF4QyxFQUFxRCxJQUFyRjs7QUFFQSx3Q0FBK0IseUJBQS9CLFNBQTRELFlBQTVEOztBQUVBLGdCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsZ0JBQUksNkNBQ2MsRUFEZCxZQUNzQixLQUR0Qiw4Q0FFZ0IsT0FGaEIsaUJBRWlDLEVBRmpDLGtCQUU4QyxJQUY5QywwQkFFb0UseUJBRnBFLFdBRW1HLFNBRm5HLFNBRWdILElBRmhILHVCQUdFLFNBSEYsY0FBSjs7QUFNQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREw7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsUSxXQUFBLFE7QUFDVCx3QkFBMEQ7QUFBQSxZQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSw4QkFDSSxRQURKLENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsaUNBQ0ksUUFESixDQUNyQyxRQURxQztBQUFBLFlBQ3JDLFFBRHFDLHNDQUMxQixFQUQwQjtBQUFBLDZCQUNJLFFBREosQ0FDdEIsSUFEc0I7QUFBQSxZQUN0QixJQURzQixrQ0FDZixFQURlO0FBQUEsK0JBQ0ksUUFESixDQUNYLE1BRFc7QUFBQSxZQUNYLE1BRFcsb0NBQ0YsRUFERTs7O0FBR3RELGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTDtBQUNIOzs7OzRCQUVlO0FBQ1osbUJBQU8sRUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixLQURFLEdBQ3dELElBRHhELENBQ0YsS0FERTtBQUFBLGdCQUNLLFFBREwsR0FDd0QsSUFEeEQsQ0FDSyxRQURMO0FBQUEsZ0JBQ2UsSUFEZixHQUN3RCxJQUR4RCxDQUNlLElBRGY7QUFBQSxnQkFDcUIsTUFEckIsR0FDd0QsSUFEeEQsQ0FDcUIsTUFEckI7QUFBQSxnQkFDNkIsU0FEN0IsR0FDd0QsSUFEeEQsQ0FDNkIsU0FEN0I7QUFBQSxnQkFDd0MsWUFEeEMsR0FDd0QsSUFEeEQsQ0FDd0MsWUFEeEM7QUFBQSwrQkFFMkMsS0FGM0MsQ0FFRixLQUZFO0FBQUEsZ0JBRUYsS0FGRSxnQ0FFTSxFQUZOO0FBQUEsZ0JBRVUsU0FGVixHQUUyQyxLQUYzQyxDQUVVLFNBRlY7QUFBQSw4QkFFMkMsS0FGM0MsQ0FFcUIsSUFGckI7QUFBQSxnQkFFcUIsSUFGckIsK0JBRTRCLEVBRjVCO0FBQUEsNEJBRTJDLEtBRjNDLENBRWdDLEVBRmhDO0FBQUEsZ0JBRWdDLEVBRmhDLDZCQUVxQyxFQUZyQztBQUFBLGtDQUc2QyxRQUg3QyxDQUdGLEtBSEU7QUFBQSxnQkFHSyxhQUhMLG1DQUdxQixFQUhyQjtBQUFBLHNDQUc2QyxRQUg3QyxDQUd5QixTQUh6QjtBQUFBLGdCQUd5QixTQUh6Qix1Q0FHcUMsSUFIckM7QUFBQSx3Q0FJYyxhQUpkLENBSUYsT0FKRTtBQUFBLGdCQUlGLE9BSkUseUNBSVEsRUFKUjtBQUFBLG1DQUt3RyxNQUx4RyxDQUtGLFFBTEU7QUFBQSxnQkFLUSxhQUxSLG9DQUt3QixFQUx4QjtBQUFBLHFDQUt3RyxNQUx4RyxDQUs0QixVQUw1QjtBQUFBLGdCQUt3QyxlQUx4QyxzQ0FLMEQsRUFMMUQ7QUFBQSxzQ0FLd0csTUFMeEcsQ0FLOEQsV0FMOUQ7QUFBQSxnQkFLOEQsV0FMOUQsdUNBSzRFLEVBTDVFO0FBQUEsK0JBS3dHLE1BTHhHLENBS2dGLElBTGhGO0FBQUEsZ0JBS3NGLFNBTHRGLGdDQUtrRyxFQUxsRzs7QUFNUCxnQkFBSSxZQUFZLElBQUksS0FBSyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLElBQXREO0FBQ0EsZ0JBQUksNEJBQTRCLElBQUksS0FBSyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFdBQXhDLEVBQXFELElBQXJGOztBQUVBLGdCQUFJLFNBQUosRUFBZSxRQUFRLFNBQVI7O0FBRWYsb0JBQVEsWUFBWSxLQUFaLEdBQW9CLEVBQTVCOztBQUVBLGdCQUFJLDZDQUNjLEVBRGQsWUFDc0IsS0FEdEIsaURBRW1CLE9BRm5CLFNBRThCLFNBRjlCLGlCQUVpRCxFQUZqRCxrQkFFOEQsSUFGOUQsV0FFdUUsWUFGdkUsV0FFeUYseUJBRnpGLFdBRXdILFNBRnhILFNBRXFJLElBRnJJLGdEQUlFLFNBSkYsY0FBSjs7QUFPQSx3QkFBVSxTQUFWO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0w7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsRyxXQUFBLEc7QUFDVCxtQkFBMEQ7QUFBQSxZQUE5QyxRQUE4Qyx1RUFBbkMsRUFBbUM7QUFBQSxZQUEvQixhQUErQjs7QUFBQTs7QUFBQSw4QkFDQyxRQURELENBQ2pELEtBRGlEO0FBQUEsWUFDakQsS0FEaUQsbUNBQ3pDLEVBRHlDO0FBQUEsaUNBQ0MsUUFERCxDQUN0QyxRQURzQztBQUFBLFlBQ3RDLFFBRHNDLHNDQUMzQixFQUQyQjtBQUFBLDZCQUNDLFFBREQsQ0FDeEIsSUFEd0I7QUFBQSxZQUN4QixJQUR3QixrQ0FDakIsRUFEaUI7QUFBQSwrQkFDQyxRQURELENBQ2QsTUFEYztBQUFBLFlBQ2QsTUFEYyxvQ0FDTCxFQURLOzs7QUFHdEQsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLGFBQXJCO0FBQ0EsYUFBSyxhQUFMO0FBQ0g7Ozs7NEJBRWU7QUFDWixtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs0QkFFVTtBQUFBLGdCQUNGLEtBREUsR0FDd0QsSUFEeEQsQ0FDRixLQURFO0FBQUEsZ0JBQ0ssUUFETCxHQUN3RCxJQUR4RCxDQUNLLFFBREw7QUFBQSxnQkFDZSxJQURmLEdBQ3dELElBRHhELENBQ2UsSUFEZjtBQUFBLGdCQUNxQixNQURyQixHQUN3RCxJQUR4RCxDQUNxQixNQURyQjtBQUFBLGdCQUM2QixTQUQ3QixHQUN3RCxJQUR4RCxDQUM2QixTQUQ3QjtBQUFBLGdCQUN3QyxZQUR4QyxHQUN3RCxJQUR4RCxDQUN3QyxZQUR4QztBQUFBLCtCQUUyQyxLQUYzQyxDQUVGLEtBRkU7QUFBQSxnQkFFRixLQUZFLGdDQUVNLEVBRk47QUFBQSxnQkFFVSxTQUZWLEdBRTJDLEtBRjNDLENBRVUsU0FGVjtBQUFBLDhCQUUyQyxLQUYzQyxDQUVxQixJQUZyQjtBQUFBLGdCQUVxQixJQUZyQiwrQkFFNEIsRUFGNUI7QUFBQSw0QkFFMkMsS0FGM0MsQ0FFZ0MsRUFGaEM7QUFBQSxnQkFFZ0MsRUFGaEMsNkJBRXFDLEVBRnJDO0FBQUEsa0NBRzRDLFFBSDVDLENBR0YsS0FIRTtBQUFBLGdCQUdJLGFBSEosbUNBR29CLEVBSHBCO0FBQUEsc0NBRzRDLFFBSDVDLENBR3dCLFNBSHhCO0FBQUEsZ0JBR3dCLFNBSHhCLHVDQUdvQyxJQUhwQztBQUFBLHdDQUljLGFBSmQsQ0FJRixPQUpFO0FBQUEsZ0JBSUYsT0FKRSx5Q0FJUSxFQUpSO0FBQUEsbUNBSzJHLE1BTDNHLENBS0YsUUFMRTtBQUFBLGdCQUtTLGFBTFQsb0NBS3lCLEVBTHpCO0FBQUEscUNBSzJHLE1BTDNHLENBSzZCLFVBTDdCO0FBQUEsZ0JBSzBDLGVBTDFDLHNDQUs0RCxFQUw1RDtBQUFBLHNDQUsyRyxNQUwzRyxDQUtnRSxXQUxoRTtBQUFBLGdCQUtnRSxXQUxoRSx1Q0FLOEUsRUFMOUU7QUFBQSwrQkFLMkcsTUFMM0csQ0FLa0YsSUFMbEY7QUFBQSxnQkFLeUYsU0FMekYsZ0NBS3FHLEVBTHJHOztBQU1QLGdCQUFJLFlBQVksSUFBSSxLQUFLLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBdEQ7QUFDQSxnQkFBSSw0QkFBNEIsSUFBSSxLQUFLLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsV0FBeEMsRUFBcUQsSUFBckY7O0FBRUEsZ0JBQUcsU0FBSCxFQUFjLFFBQVEsU0FBUjs7QUFFZCxnQkFBSSw2Q0FDYyxFQURkLFlBQ3NCLEtBRHRCLDhDQUVnQixPQUZoQixTQUUyQixTQUYzQixXQUV5QyxZQUZ6QyxlQUU4RCxFQUY5RCxrQkFFMkUsSUFGM0UseUJBRWdHLHlCQUZoRyxXQUUrSCxTQUYvSCxTQUU0SSxJQUY1SSx1QkFHRSxTQUhGLGNBQUo7O0FBTUEsd0JBQVUsU0FBVjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVDTDs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksb0JBQVksU0FBWixFQUF1QjtBQUFBOztBQUFBOztBQUduQixZQUFJLFVBQVUsSUFBVixZQUEwQixRQUE5QixFQUF3QztBQUNwQyxzQkFBVSxJQUFWLENBQWUsTUFBSyxJQUFwQjtBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxnQkFBSSxTQUFKLEdBQWdCLE1BQUssSUFBckI7O0FBRUEsc0JBQVUsV0FBVixDQUFzQixHQUF0QjtBQUNIOztBQVZrQixZQWFmLHdCQWJlLFNBYWYsd0JBYmU7QUFBQSxZQWNmLG9CQWRlLFNBY2Ysb0JBZGU7QUFBQSxZQWVmLHNCQWZlLFNBZWYsc0JBZmU7QUFBQSxZQWdCZixlQWhCZSxTQWdCZixlQWhCZTtBQUFBLFlBaUJmLG1CQWpCZSxTQWlCZixtQkFqQmU7QUFBQSxZQWtCZixnQkFsQmUsU0FrQmYsZ0JBbEJlOzs7QUFxQm5CLGNBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGNBQUssaUJBQUwsR0FBeUIsU0FBUyxjQUFULENBQXdCLDJCQUF4QixDQUF6QjtBQUNBLGNBQUssYUFBTCxHQUFxQixTQUFTLGNBQVQsQ0FBd0IsMkJBQXhCLENBQXJCO0FBQ0EsY0FBSyxlQUFMLEdBQXVCLFNBQVMsY0FBVCxDQUF3Qiw2QkFBeEIsQ0FBdkI7QUFDQSxjQUFLLFFBQUwsR0FBZ0IsU0FBUyxjQUFULENBQXdCLDBCQUF4QixDQUFoQjtBQUNBLGNBQUssWUFBTCxHQUFvQixTQUFTLGNBQVQsQ0FBd0IsOEJBQXhCLENBQXBCO0FBQ0EsY0FBSyxTQUFMLEdBQWlCLFNBQVMsY0FBVCxDQUF3QiwyQkFBeEIsQ0FBakI7QUEzQm1CO0FBNEJ0Qjs7OztxREErSTRCLEksRUFBTTtBQUFBLGdCQUN6QixNQUR5QixHQUNkLElBRGMsQ0FDekIsTUFEeUI7QUFBQSxxQ0FFTCxNQUZLLENBRXpCLFVBRnlCO0FBQUEsZ0JBRXpCLFVBRnlCLHNDQUVaLEVBRlk7O0FBRy9CLGdCQUFJLFNBQUo7QUFIK0IsZ0JBSXpCLFNBSnlCLEdBSStCLElBSi9CLENBSXpCLFNBSnlCO0FBQUEsZ0JBSWQsb0JBSmMsR0FJK0IsSUFKL0IsQ0FJZCxvQkFKYztBQUFBLGdCQUlRLGtCQUpSLEdBSStCLElBSi9CLENBSVEsa0JBSlI7OztBQU0vQixnQkFBSSxXQUFXLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkIsb0JBQUksaUJBQWlCLEtBQUssc0JBQUwsQ0FBNEIsVUFBNUIsQ0FBckI7QUFDQSxvQkFBSSxxQkFBcUIsS0FBSyxpQkFBTCxDQUF1QixVQUF2QixDQUF6Qjs7QUFFQSxvQkFBSSxjQUFKLEVBQW9CO0FBQ2hCLDhCQUFVLE1BQVYsQ0FBaUIsY0FBakI7QUFDSDs7QUFFRCxvQkFBSSxrQkFBSixFQUF3QjtBQUNwQiw4QkFBVSxNQUFWLENBQWlCLGtCQUFqQjtBQUNIO0FBRUo7QUFDSjs7OzBDQUVpQixVLEVBQVk7QUFDMUIsZ0JBQUksT0FBTyxJQUFYO0FBRDBCLGdCQUd0QiwrQkFIc0IsR0FNdEIsSUFOc0IsQ0FHdEIsK0JBSHNCO0FBQUEsZ0JBR1csc0JBSFgsR0FNdEIsSUFOc0IsQ0FHVyxzQkFIWDtBQUFBLGdCQUl0Qiw0QkFKc0IsR0FNdEIsSUFOc0IsQ0FJdEIsNEJBSnNCO0FBQUEsZ0JBSVEsOEJBSlIsR0FNdEIsSUFOc0IsQ0FJUSw4QkFKUjtBQUFBLGdCQUt0Qix5QkFMc0IsR0FNdEIsSUFOc0IsQ0FLdEIseUJBTHNCO0FBQUEsZ0JBS0ssK0JBTEwsR0FNdEIsSUFOc0IsQ0FLSywrQkFMTDtBQUFBLGdCQUtzQyxpQ0FMdEMsR0FNdEIsSUFOc0IsQ0FLc0MsaUNBTHRDO0FBQUEsZ0JBS3lFLDZCQUx6RSxHQU10QixJQU5zQixDQUt5RSw2QkFMekU7O0FBTzFCLGdCQUFJLGlCQUFpQixNQUFNLElBQU4sQ0FBVyxVQUFYLEVBQXVCLE1BQXZCLENBQThCLFVBQUMscUJBQUQsRUFBd0IsU0FBeEIsRUFBc0M7QUFDckYsb0JBQUksVUFBVSxJQUFWLEtBQW1CLFVBQW5CLElBQWlDLFVBQVUsSUFBVixLQUFtQixXQUF4RCxFQUFxRTtBQUNqRSw0Q0FBd0Isc0JBQXNCLE1BQXRCLENBQTZCLENBQUMsU0FBRCxDQUE3QixDQUF4QjtBQUNIOztBQUVELHVCQUFPLHFCQUFQO0FBQ0gsYUFOb0IsRUFNbEIsRUFOa0IsQ0FBckI7O0FBUUEsZ0JBQUksZUFBZSxNQUFmLEdBQXdCLENBQTVCLEVBQStCO0FBQUE7QUFDM0Isd0JBQUkscUJBQXFCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF6QjtBQUNBLHdCQUFJLGtCQUFrQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQSx3QkFBSSxtQkFBbUIsS0FBdkI7QUFDQSx3QkFBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0Esd0JBQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbkI7O0FBRUEsc0NBQWlCLG1CQUFqQixDQUFxQyxRQUFyQyxFQUErQyx5QkFBL0M7QUFDQSxzQ0FBaUIsbUJBQWpCLENBQXFDLFlBQXJDLEVBQW1ELDZCQUFuRDs7QUFFQSw2QkFBUyxNQUFULENBQWdCLFlBQWhCOztBQUVBLG1DQUFlLE9BQWYsQ0FBdUIseUJBQWlCO0FBQUEsNEJBQzlCLE9BRDhCLEdBQ0ksYUFESixDQUM5QixPQUQ4QjtBQUFBLDRCQUNyQixLQURxQixHQUNJLGFBREosQ0FDckIsS0FEcUI7QUFBQSw0QkFDZCxPQURjLEdBQ0ksYUFESixDQUNkLE9BRGM7QUFBQSw0QkFDTCxJQURLLEdBQ0ksYUFESixDQUNMLElBREs7O0FBRXBDLDRCQUFJLHNCQUFzQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBMUI7O0FBRUEsK0JBQU8sTUFBUCxDQUFjLG1CQUFkLEVBQW1DO0FBQy9CLG1DQUFPLE9BRHdCO0FBRS9CLHVDQUFXLFNBQVMsTUFBTSxNQUFOLEdBQWUsQ0FBeEIsR0FBNEIsS0FBNUIsR0FBb0M7QUFGaEIseUJBQW5DOztBQUtBLHdDQUFnQixXQUFoQixDQUE0QixtQkFBNUI7O0FBRUEsNEJBQUksU0FBUyxTQUFiLEVBQXdCO0FBQ3BCLG1DQUFPLE1BQVAsQ0FBYyxlQUFkLEVBQStCO0FBQzNCLHVDQUFPO0FBRG9CLDZCQUEvQjtBQUdBLCtDQUFtQixJQUFuQjtBQUNIO0FBQ0oscUJBakJEOztBQW1CQSxvQ0FBZ0IsZ0JBQWhCLENBQWlDLFFBQWpDLEVBQTJDLFVBQUMsR0FBRCxFQUFTO0FBQUEsMENBQ3hCLEdBRHdCLENBQ3hDLE1BRHdDO0FBQUEsNEJBQ3hDLE1BRHdDLCtCQUMvQixFQUQrQjtBQUFBLDRDQUVoQixNQUZnQixDQUV4QyxLQUZ3QztBQUFBLDRCQUVqQyxPQUZpQyxpQ0FFdkIsRUFGdUI7OztBQUloRCw2QkFBSyxrQkFBTCxDQUF3QixPQUF4QjtBQUNILHFCQUxEOztBQU9BLDZCQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQUMsR0FBRCxFQUFTO0FBQUEsNEJBQ3pCLE9BRHlCLEdBQ2IsZUFEYSxDQUNoQyxLQURnQzs7QUFFeEMsNEJBQU0sYUFBYSxrQkFBaUIsUUFBakIsQ0FBMEIsUUFBMUIsRUFBb0MsaUNBQXBDLENBQW5COztBQUVBLDRCQUFJLFVBQUosRUFBZ0I7QUFDWiw4Q0FBaUIsd0JBQWpCLENBQTBDLGVBQTFDLEVBQTJELDhCQUEzRDtBQUNBLDhDQUFpQix3QkFBakIsQ0FBMEMsUUFBMUMsRUFBb0QsaUNBQXBEO0FBQ0EsOENBQWlCLG1CQUFqQixDQUFxQyxlQUFyQyxFQUFzRCw0QkFBdEQ7QUFDQSw4Q0FBaUIsbUJBQWpCLENBQXFDLFFBQXJDLEVBQStDLCtCQUEvQztBQUNBLGlDQUFLLGtCQUFMLENBQXdCLE9BQXhCO0FBQ0gseUJBTkQsTUFNTztBQUNILDhDQUFpQix3QkFBakIsQ0FBMEMsZUFBMUMsRUFBMkQsNEJBQTNEO0FBQ0EsOENBQWlCLHdCQUFqQixDQUEwQyxRQUExQyxFQUFvRCwrQkFBcEQ7QUFDQSw4Q0FBaUIsbUJBQWpCLENBQXFDLGVBQXJDLEVBQXNELDhCQUF0RDtBQUNBLDhDQUFpQixtQkFBakIsQ0FBcUMsUUFBckMsRUFBK0MsaUNBQS9DO0FBQ0EsaUNBQUssa0JBQUwsQ0FBd0IsRUFBeEI7QUFDSDtBQUNKLHFCQWpCRDs7QUFtQkEsc0NBQWlCLG1CQUFqQixDQUFxQyxlQUFyQyxFQUFzRCxzQkFBdEQ7QUFDQSxzQ0FBaUIsbUJBQWpCLENBQXFDLGVBQXJDLEVBQXNELG1CQUFtQiw0QkFBbkIsR0FBa0QsOEJBQXhHO0FBQ0Esc0NBQWlCLG1CQUFqQixDQUFxQyxrQkFBckMsRUFBeUQsK0JBQXpEO0FBQ0Esc0NBQWlCLG1CQUFqQixDQUFxQyxRQUFyQyxFQUErQyxtQkFBbUIsK0JBQW5CLEdBQXFELGlDQUFwRztBQUNBLHVDQUFtQixXQUFuQixDQUErQixRQUEvQjs7QUFFQSx3QkFBSSxlQUFlLE1BQWYsR0FBd0IsQ0FBNUIsRUFBK0I7QUFDM0IsMkNBQW1CLFdBQW5CLENBQStCLGVBQS9CO0FBQ0g7O0FBRUQ7QUFBQSwyQkFBTztBQUFQO0FBbkUyQjs7QUFBQTtBQW9FOUI7O0FBSUQsbUJBQU8sS0FBUDtBQUNIOzs7K0NBSXNCLFUsRUFBWTtBQUFBLGdCQUN6QixvQkFEeUIsR0FDMEYsSUFEMUYsQ0FDekIsb0JBRHlCO0FBQUEsZ0JBQ0gsa0JBREcsR0FDMEYsSUFEMUYsQ0FDSCxrQkFERztBQUFBLGdCQUNpQixvQkFEakIsR0FDMEYsSUFEMUYsQ0FDaUIsb0JBRGpCO0FBQUEsZ0JBQ3VDLHNCQUR2QyxHQUMwRixJQUQxRixDQUN1QyxzQkFEdkM7QUFBQSxnQkFDK0Qsc0JBRC9ELEdBQzBGLElBRDFGLENBQytELHNCQUQvRDs7QUFFL0IsZ0JBQUksZUFBZSxNQUFNLElBQU4sQ0FBVyxVQUFYLEVBQXVCLElBQXZCLENBQTRCLHFCQUFhO0FBQ3hELHVCQUFPLFVBQVUsSUFBVixLQUFtQixVQUExQjtBQUNILGFBRmtCLENBQW5CO0FBR0EsZ0JBQUksT0FBTyxJQUFYOztBQUVBLGdCQUFJLFlBQUosRUFBa0I7QUFBQTtBQUNkLHdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBcEI7QUFEYyw2Q0FFTSxZQUZOLENBRVIsSUFGUTtBQUFBLHdCQUVSLElBRlEsc0NBRUQsRUFGQzs7O0FBSWQsMEJBQU0sSUFBTixDQUFXLElBQVgsRUFBaUIsT0FBakIsQ0FBeUIsVUFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUFBLDRCQUMvQixFQUQrQixHQUNQLEdBRE8sQ0FDL0IsRUFEK0I7QUFBQSw0QkFDM0IsSUFEMkIsR0FDUCxHQURPLENBQzNCLElBRDJCO0FBQUEsNEJBQ3JCLFNBRHFCLEdBQ1AsR0FETyxDQUNyQixTQURxQjs7QUFFckMsNEJBQUkscUJBQXFCLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUF6QjtBQUNBLDRCQUFJLGtCQUFrQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7O0FBRUEsd0NBQWdCLEVBQWhCLEdBQXdCLEVBQXhCO0FBQ0Esd0NBQWdCLFNBQWhCLEdBQTRCLG9CQUE1QjtBQUNBLHdDQUFnQixTQUFoQixHQUE0QixJQUE1Qjs7QUFFQSwyQ0FBbUIsV0FBbkIsQ0FBK0IsZUFBL0I7O0FBRUEsMkNBQW1CLEVBQW5CLEdBQXdCLEVBQXhCO0FBQ0EsMkNBQW1CLFNBQW5CLEdBQWtDLHNCQUFsQyxVQUE0RCxVQUFVLENBQVYsR0FBYyxvQkFBZCxHQUFxQyxzQkFBakc7O0FBRUEsc0NBQWMsV0FBZCxDQUEwQixrQkFBMUI7QUFDQSx3Q0FBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDNUMsaUNBQUssSUFBTCxDQUFVLFNBQVY7QUFDQSxpQ0FBSyxJQUFMO0FBQ0gseUJBSEQ7QUFJSCxxQkFuQkQ7O0FBcUJBLGtDQUFjLFNBQWQsR0FBMEIsa0JBQTFCOztBQUVBO0FBQUEsMkJBQU87QUFBUDtBQTNCYzs7QUFBQTtBQTRCakI7O0FBRUQsbUJBQU8sS0FBUDtBQUVIOzs7NEJBclM4QjtBQUMzQixtQkFBTyxZQUFQO0FBQ0g7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sVUFBUDtBQUNIOzs7NEJBRTRCO0FBQ3pCLG1CQUFPLGNBQVA7QUFDSDs7OzRCQUVxQjtBQUNsQixtQkFBTyxXQUFQO0FBQ0g7Ozs0QkFFeUI7QUFDdEIsbUJBQU8sTUFBUDtBQUNIOzs7NEJBRXNCO0FBQ25CLG1CQUFPLFlBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLFlBQVA7QUFDSDs7OzRCQUVrQjtBQUNmLG1CQUFPLGFBQVA7QUFDSDs7OzRCQUVtQjtBQUNoQixtQkFBTyxpQkFBUDtBQUNIOzs7NEJBRWlCO0FBQ2QsbUJBQU8sa0JBQVA7QUFDSDs7OzRCQUU4QjtBQUMzQjtBQUNIOzs7NEJBRW1DO0FBQ2hDLG1CQUFPLGdCQUFQO0FBQ0g7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sZ0JBQVA7QUFDSDs7OzRCQUV3QjtBQUNyQixtQkFBTyxjQUFQO0FBQ0g7Ozs0QkFFNEI7QUFDekIsbUJBQU8sbUJBQVA7QUFDSDs7OzRCQUUwQjtBQUN2QixtQkFBTyxRQUFQO0FBQ0g7Ozs0QkFFNEI7QUFDekIsbUJBQU8sVUFBUDtBQUNIOzs7NEJBRXlCO0FBQUEsZ0JBQ0gsSUFERyxHQUNNLElBRE4sQ0FDaEIsV0FEZ0I7QUFBQSxnQkFFVSxpQkFGVixHQUVnQyxJQUZoQyxDQUVoQix3QkFGZ0I7O0FBR3RCLGdGQUNnRCxpQkFEaEQsbUNBRWdCLElBRmhCO0FBSUg7Ozs0QkFFa0I7QUFDZixpRkFDaUQsS0FBSyxlQUR0RCx3Q0FFc0IsS0FBSyx3QkFGM0I7QUFLSDs7OzRCQUVtQjtBQUNoQixnRkFDZ0QsS0FBSyxzQkFEckQsdUVBRThDLEtBQUssb0JBRm5EO0FBSUg7Ozs0QkFFb0I7QUFBQSxnQkFDSSxNQURKLEdBQ29DLElBRHBDLENBQ1gsYUFEVztBQUFBLGdCQUNZLG1CQURaLEdBQ29DLElBRHBDLENBQ1ksbUJBRFo7O0FBRWpCLHVGQUN1RCxtQkFEdkQsc0NBRW9CLE1BRnBCO0FBS0g7Ozs0QkFFbUI7QUFDaEIsa0ZBQ2tELEtBQUssZ0JBRHZELHdDQUVzQixLQUFLLDZCQUYzQjtBQUtIOzs7NEJBRXFDO0FBQ2xDLG1CQUFPLDZCQUFQO0FBQ0g7Ozs0QkFFNEI7QUFDekIsbUJBQU8sbUJBQVA7QUFDSDs7OzRCQUVrQztBQUMvQixtQkFBTyxRQUFQO0FBQ0g7Ozs0QkFFb0M7QUFDakMsbUJBQU8sVUFBUDtBQUNIOzs7NEJBRStCO0FBQzVCLG1CQUFPLHNCQUFQO0FBQ0g7Ozs0QkFFcUM7QUFDbEMsbUJBQU8sUUFBUDtBQUNIOzs7NEJBRXVDO0FBQ3BDLG1CQUFPLFVBQVA7QUFDSDs7OzRCQUVtQztBQUNoQyxtQkFBTyxvQ0FBUDtBQUNIOzs7NEJBNEpVO0FBQUEsZ0JBR0gsbUJBSEcsR0FRSCxJQVJHLENBR0gsbUJBSEc7QUFBQSxnQkFJSCxZQUpHLEdBUUgsSUFSRyxDQUlILFlBSkc7QUFBQSxnQkFLSCxhQUxHLEdBUUgsSUFSRyxDQUtILGFBTEc7QUFBQSxnQkFNSCxjQU5HLEdBUUgsSUFSRyxDQU1ILGNBTkc7QUFBQSxnQkFPSCxhQVBHLEdBUUgsSUFSRyxDQU9ILGFBUEc7O0FBU1AscUNBQ0ssbUJBREwscUJBRUssWUFGTCxxQkFHSyxhQUhMLHFCQUlLLGNBSkwscUJBS0ssYUFMTDtBQU9IOzs7Ozs7Ozs7Ozs7Ozs7O0FDelZMOzs7Ozs7OztJQUVhLE0sV0FBQSxNOzs7QUFDWixpQkFBWSxVQUFaLEVBQXVCO0FBQUE7O0FBQUEseUdBQ2hCLFVBRGdCO0FBRXRCOzs7Ozs7Ozs7Ozs7QUNMRjs7Ozs7Ozs7SUFFTSxJLEdBQ0YsY0FBWSxNQUFaLEVBQW9CLFlBQXBCLEVBQWtDO0FBQUE7O0FBQUEsMkJBQ1IsTUFEUSxDQUN6QixRQUR5QjtBQUFBLFFBQ3pCLFFBRHlCLG9DQUNkLEVBRGM7QUFBQSx3QkFFMEMsUUFGMUMsQ0FFekIsR0FGeUI7QUFBQSxRQUV6QixHQUZ5QixpQ0FFbkIsRUFGbUI7QUFBQSwwQkFFMEMsUUFGMUMsQ0FFaEIsS0FGZ0I7QUFBQSxRQUVoQixLQUZnQixtQ0FFUixFQUZRO0FBQUEsOEJBRTBDLFFBRjFDLENBRUwsU0FGSztBQUFBLFFBRUwsU0FGSyx1Q0FFTyxFQUZQO0FBQUEsZ0NBRTBDLFFBRjFDLENBRVUsV0FGVjtBQUFBLFFBRVUsV0FGVix5Q0FFd0IsRUFGeEI7QUFBQSwyQkFFMEMsUUFGMUMsQ0FFMkIsTUFGM0I7QUFBQSxRQUUyQixNQUYzQixvQ0FFb0MsRUFGcEM7OztBQUk5QixTQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLFNBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLFNBQUssYUFBTCxHQUFzQixZQUFLO0FBQ3ZCLHFCQUFhLGNBQWIsQ0FBNEIsTUFBNUIsRUFBb0MsWUFBSyxDQUV4QyxDQUZEO0FBR0gsS0FKRDtBQUtILEM7O0FBR0wsS0FBSyxPQUFMLEdBQWUsQ0FBQyxRQUFELEVBQVUsZUFBVixDQUFmOztrQkFFZSxxQ0FBc0IsSUFBdEIsQzs7Ozs7Ozs7O0FDckJmOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTSx1Qjs7O0FBQ0YscUNBQVksTUFBWixFQUFvQixRQUFwQixFQUE4QixLQUE5QixFQUFxQyxZQUFyQyxFQUFtRDtBQUFBOztBQUFBLHNKQUN6QyxNQUR5QyxFQUNqQyxLQURpQyxFQUMxQixZQUQwQjs7QUFBQSxnQ0FHSSxPQUFPLFNBSFg7QUFBQSxZQUcxQyxZQUgwQyxxQkFHMUMsWUFIMEM7QUFBQSxZQUc1QixPQUg0QixxQkFHNUIsT0FINEI7QUFBQSxZQUduQixJQUhtQixxQkFHbkIsSUFIbUI7QUFBQSxzREFHYixRQUhhO0FBQUEsWUFHYixRQUhhLHlDQUdGLEVBSEU7QUFBQSxpQ0FJekIsUUFKeUIsQ0FJMUMsUUFKMEM7QUFBQSxZQUkxQyxRQUowQyxzQ0FJL0IsRUFKK0I7QUFBQSxpQ0FLdEIsUUFMc0IsQ0FLMUMsUUFMMEM7QUFBQSxZQUsxQyxRQUwwQyxzQ0FLL0IsS0FMK0I7O0FBTS9DLFlBQUksWUFBSjs7QUFFQSxjQUFLLFFBQUwsR0FBZ0IsQ0FBQyxRQUFELEdBQVk7QUFDeEIsbUJBQVEsTUFBTSxVQUFOLENBQWlCLElBQWpCLENBQXNCLElBQXRCLElBQThCLE1BQU0sVUFBTixDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUE5QixHQUE0RDtBQUQ1QyxTQUFaLEdBRVosQ0FBQztBQUNELG1CQUFPLE1BQU0sVUFBTixDQUFpQixJQUFqQixDQUFzQixJQUF0QixJQUE4QixNQUFNLFVBQU4sQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBOUIsR0FBNEQ7QUFEbEUsU0FBRCxDQUZKO0FBS0EsY0FBSyxRQUFMLEdBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQUEscUNBQ0ssT0FBTyxTQURaO0FBQUEsZ0JBQ2xCLElBRGtCLHNCQUNsQixJQURrQjtBQUFBLDJEQUNaLFFBRFk7QUFBQSxnQkFDWixRQURZLHlDQUNELEVBREM7OztBQUd2QixnQkFBSSxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBQUosRUFBMEI7QUFDdEIsd0JBQVEsU0FBUyxNQUFULENBQWdCLFVBQUMsWUFBRCxFQUFlLFVBQWYsRUFBNEI7QUFDaEQsd0JBQUcsYUFBYSxNQUFiLElBQXVCLENBQTFCLEVBQTZCLFlBQVUsV0FBVyxLQUFyQjtBQUM3QiwyQkFBVSxZQUFWLFVBQTJCLFdBQVcsS0FBdEM7QUFDSCxpQkFITyxFQUdMLEVBSEssQ0FBUjtBQUlIOztBQUVELHFCQUFTLE9BQVQsQ0FBaUIsRUFBRSxXQUFXLFNBQWIsRUFBd0IsTUFBTSxFQUFFLEtBQUssSUFBUCxFQUFhLE9BQU8sTUFBTSxLQUExQixFQUE5QixFQUFqQjtBQUNBLHlCQUFhLGNBQWIsQ0FBNEIsUUFBNUIsRUFBc0MsWUFBTSxDQUFFLENBQTlDO0FBQ0gsU0FaRDtBQWIrQztBQTBCbEQ7Ozs7O0FBR0wsd0JBQXdCLE9BQXhCLEdBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsT0FBdkIsRUFBZ0MsZUFBaEMsQ0FBbEM7O2tCQUVlLHFDQUFzQix1QkFBdEIsQzs7Ozs7Ozs7Ozs7QUNuQ2Y7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTSxJO0FBQ0Ysa0JBQVksUUFBWixFQUFzQixRQUF0QixFQUFnQztBQUFBOztBQUM1QixhQUFLLFFBQUwsR0FBZ0IsS0FBSyxZQUFyQjtBQUNBLGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUssUUFBTCxHQUFnQixHQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLGlCQUFmO0FBQ0EsYUFBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVTtBQURELFNBQWI7QUFHQSxhQUFLLFVBQUw7QUFDQSxhQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBSyxJQUFMLEdBQVksVUFBQyxNQUFELEVBQVMsSUFBVCxFQUFlLE1BQWYsRUFBdUIsVUFBdkIsRUFBc0M7QUFBQSxtQ0FDdEIsTUFEc0IsQ0FDeEMsUUFEd0M7QUFBQSxnQkFDeEMsUUFEd0Msb0NBQzdCLEVBRDZCO0FBQUEsZ0JBRXpDLFFBRnlDLEdBRWhCLFFBRmdCLENBRXpDLFFBRnlDO0FBQUEsb0NBRWhCLFFBRmdCLENBRWhDLE9BRmdDO0FBQUEsZ0JBRWhDLE9BRmdDLHFDQUV0QixFQUZzQjs7QUFHOUMsZ0JBQUksT0FBTyx3QkFBa0IsT0FBTyxRQUF6QixFQUFtQyxXQUFXLFVBQTlDLENBQVg7O0FBRUEsbUJBQU8sT0FBUCxHQUFpQixPQUFqQjs7QUFFQSxpQkFBSyxJQUFMLENBQVUsSUFBVjtBQUNBLHFCQUFTLEtBQUssUUFBTCxFQUFULEVBQTBCLE1BQTFCO0FBQ0EscUJBQVMsWUFBTTtBQUNYLGtCQUFFLHVCQUFGLEVBQTJCLE1BQTNCLENBQWtDO0FBQzlCLHdCQUFJO0FBRDBCLGlCQUFsQztBQUdILGFBSkQsRUFJRyxDQUpIO0FBS0gsU0FkRDtBQWVIOzs7OzRCQUVrQjtBQUNmO0FBQ0g7Ozs7OztBQUdMLEtBQUssT0FBTCxHQUFlLENBQUMsVUFBRCxFQUFhLFVBQWIsQ0FBZjs7a0JBRWUscUNBQXNCLElBQXRCLEM7Ozs7Ozs7Ozs7O0FDeENmOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU0sYTtBQUNGLDJCQUFZLFVBQVosRUFBd0IsUUFBeEIsRUFBa0MsT0FBbEMsRUFBMkMsUUFBM0MsRUFBcUQsS0FBckQsRUFBNEQsYUFBNUQsRUFBMkUsUUFBM0UsRUFBcUY7QUFBQTs7QUFDakYsYUFBSyxRQUFMLEdBQWdCLEtBQUssWUFBckI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsR0FBaEI7QUFDQSxhQUFLLE9BQUwsR0FBZSxpQkFBZjtBQUNBLGFBQUssS0FBTCxHQUFhO0FBQ1QsdUJBQVc7QUFERixTQUFiO0FBR0EsYUFBSyxVQUFMO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssSUFBTCxHQUFZLFVBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxNQUFmLEVBQXVCLFVBQXZCLEVBQXNDO0FBQUEsZ0JBQzlCLEtBRDhCLEdBQ3JCLE1BRHFCLENBQ3pDLFNBRHlDO0FBQUEsZ0JBRXpDLEVBRnlDLEdBRXFILEtBRnJILENBRXpDLEVBRnlDO0FBQUEsZ0NBRXFILEtBRnJILENBRXJDLE1BRnFDO0FBQUEsZ0JBRXJDLE1BRnFDLGlDQUU1QixFQUY0QjtBQUFBLGdCQUV4QixJQUZ3QixHQUVxSCxLQUZySCxDQUV4QixJQUZ3QjtBQUFBLGdCQUVsQixTQUZrQixHQUVxSCxLQUZySCxDQUVsQixTQUZrQjtBQUFBLCtCQUVxSCxLQUZySCxDQUVQLEtBRk87QUFBQSxnQkFFUCxLQUZPLGdDQUVDLFFBQVEsZUFBUixFQUF5QixXQUF6QixFQUFzQyxFQUF0QyxDQUZEO0FBQUEsb0NBRXFILEtBRnJILENBRTRDLFVBRjVDO0FBQUEsZ0JBRTRDLFVBRjVDLHFDQUV5RCxFQUZ6RDtBQUFBLGdCQUU2RCxPQUY3RCxHQUVxSCxLQUZySCxDQUU2RCxPQUY3RDtBQUFBLGdCQUVzRSxjQUZ0RSxHQUVxSCxLQUZySCxDQUVzRSxjQUZ0RTtBQUFBLGdCQUVzRixZQUZ0RixHQUVxSCxLQUZySCxDQUVzRixZQUZ0RjtBQUFBLGtDQUVxSCxLQUZySCxDQUVvRyxRQUZwRztBQUFBLGdCQUVvRyxRQUZwRyxtQ0FFK0csRUFGL0c7QUFBQSx1Q0FHdEIsUUFIc0IsQ0FHekMsVUFIeUM7QUFBQSxnQkFHekMsVUFIeUMsd0NBRzVCLEVBSDRCOztBQUk5QyxnQkFBSSxnQkFBZ0IsaUNBQWtCLElBQWxCLEVBQXdCLE1BQXhCLEVBQWdDLFVBQWhDLENBQXBCO0FBQ0EsZ0JBQUksa0VBQUo7QUFDQSxnQkFBSSxVQUFhLFVBQWIsNE9BQUo7O0FBTUEsZ0JBQUksV0FBVyxRQUFYLElBQXVCLGNBQTNCLEVBQTJDO0FBQ3ZDLG1DQUFtQix1Q0FDSyxjQURMLGlCQUVmLGdCQUZKO0FBR0g7O0FBRUQsZ0JBQUksZUFBZSxJQUFJLGNBQWMsUUFBbEIsQ0FBMkIsRUFBM0IsRUFBK0IsSUFBL0IsRUFBcUMsUUFBUSxZQUFZLFNBQVosR0FBd0IsS0FBckUsRUFBNEUsY0FBNUUsRUFBNEYsUUFBNUYsRUFBc0csT0FBdEcsRUFBK0csYUFBL0csQ0FBbkI7O0FBRUEsaUJBQUssSUFBTCxDQUFVLGFBQWEsSUFBdkI7O0FBRUEsZ0JBQUksT0FBTyxDQUFQLEtBQWEsV0FBakIsRUFBOEIsQ0FFN0I7O0FBRUQscUJBQVMsS0FBSyxRQUFMLEVBQVQsRUFBMEIsTUFBMUI7QUFDQSxjQUFFLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBRixFQUF1QixRQUF2QjtBQUNBLHFCQUFTLFlBQU07QUFDWCxvQkFBSSxrQkFBa0IsTUFBTSxVQUFOLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQXRCO0FBQ0Esa0JBQUUsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFGLEVBQXVCLFFBQXZCLENBQWdDLGNBQWhDLEVBQWdELGtCQUFrQixlQUFsQixHQUFvQyxFQUFwRjtBQUVILGFBSkQsRUFJRyxDQUpIO0FBS0gsU0FqQ0Q7QUFrQ0g7Ozs7NEJBRWtCO0FBQ2Y7QUFDSDs7Ozs7O0FBR0wsY0FBYyxPQUFkLEdBQXdCLENBQUMsWUFBRCxFQUFlLFVBQWYsRUFBMkIsU0FBM0IsRUFBc0MsVUFBdEMsRUFBa0QsT0FBbEQsRUFBMkQsa0JBQTNELEVBQStFLFdBQS9FLENBQXhCOztrQkFFZSxxQ0FBc0IsYUFBdEIsQzs7Ozs7Ozs7Ozs7O0FDM0RmOztBQUNBOzs7Ozs7OztJQUVhLE8sV0FBQSxPOzs7QUFDVCxxQkFBWSxPQUFaLEVBQXFCLFNBQXJCLEVBQWdDO0FBQUE7O0FBQUEsaUhBQ3RCLE9BRHNCLEVBQ2IsU0FEYTtBQUUvQjs7Ozs0QkFFbUI7QUFDaEIsbUJBQU8sV0FBUDtBQUNIOzs7Ozs7QUFFSjs7Ozs7Ozs7Ozs7OztJQ1pZLGEsV0FBQSxhO0FBQ1QsMkJBQVksUUFBWixFQUFzQjtBQUFBOztBQUNsQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDSDs7Ozs0QkFFa0I7QUFDZjtBQXNCSDs7OzRCQUVvQjtBQUFBLGdCQUNaLE9BRFksR0FDRCxLQUFLLFFBREosQ0FDWixPQURZOztBQUVqQjtBQXlCSDs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7OztBQzFERDs7QUFDQTs7Ozs7Ozs7SUFFYSxRLFdBQUEsUTs7O0FBQ1Qsc0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG1IQUNaLFFBRFk7QUFFckI7Ozs7Z0RBVXVCLE8sRUFBUyxVLEVBQVk7QUFBQSxnQkFDcEMsS0FEb0MsR0FDM0IsSUFEMkIsQ0FDcEMsS0FEb0M7QUFBQSwrQkFFWCxLQUZXLENBRXBDLEtBRm9DO0FBQUEsZ0JBRXBDLEtBRm9DLGdDQUU1QixFQUY0QjtBQUFBLGdCQUV4QixTQUZ3QixHQUVYLEtBRlcsQ0FFeEIsU0FGd0I7O0FBR3pDLGdCQUFHLFNBQUgsRUFBYyxRQUFRLFNBQVI7QUFDZCwrQ0FDZSxPQURmLCtCQUVhLFVBRmIscUNBR21CLE1BQU0sRUFIekIsZ0NBSVUsS0FKVjtBQU9IOzs7NEJBbkJlO0FBQ1osbUJBQU8sYUFBUDtBQUNIOzs7NEJBRWtCO0FBQ2YsbUJBQU8sRUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7OztBQ2RMOztBQUNBOzs7Ozs7OztJQUVhLEksV0FBQSxJOzs7QUFDVCxrQkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsMkdBQ1osUUFEWTtBQUVyQjs7Ozs7Ozs7Ozs7OztBQ05MOztBQUNBOzs7Ozs7OztJQUVhLGEsV0FBQSxhOzs7QUFDVCwyQkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsNkhBQ1osUUFEWTtBQUVyQjs7Ozs7QUFDSjs7Ozs7Ozs7Ozs7O0FDUEQ7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLFFBQVEsa0JBQVo7O0lBRWEsUSxXQUFBLFE7QUFDVCxzQkFBWSxFQUFaLEVBQWdCLElBQWhCLEVBQXNCLEtBQXRCLEVBQTZCLGNBQTdCLEVBQW9GO0FBQUEsWUFBdkMsUUFBdUMsdUVBQTVCLEVBQTRCO0FBQUEsWUFBeEIsT0FBd0I7QUFBQSxZQUFmLGFBQWU7O0FBQUE7O0FBQ2hGLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGFBQUssRUFBTCxHQUFVLEVBQVY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDSDs7Ozs0QkFFYztBQUNYLG1CQUFPLGFBQVA7QUFDSDs7OzRCQUVVO0FBQUEsZ0JBQ0YsRUFERSxHQUNzRCxJQUR0RCxDQUNGLEVBREU7QUFBQSxnQkFDRSxJQURGLEdBQ3NELElBRHRELENBQ0UsSUFERjtBQUFBLGdCQUNRLEtBRFIsR0FDc0QsSUFEdEQsQ0FDUSxLQURSO0FBQUEsZ0JBQ2UsY0FEZixHQUNzRCxJQUR0RCxDQUNlLGNBRGY7QUFBQSxnQkFDK0IsUUFEL0IsR0FDc0QsSUFEdEQsQ0FDK0IsUUFEL0I7QUFBQSxnQkFDeUMsU0FEekMsR0FDc0QsSUFEdEQsQ0FDeUMsU0FEekM7QUFBQSxxQ0FFZSxRQUZmLENBRUYsUUFGRTtBQUFBLGdCQUVGLFFBRkUsc0NBRVMsRUFGVDtBQUFBLHFDQUdrQixRQUhsQixDQUdGLFFBSEU7QUFBQSxnQkFHRixRQUhFLHNDQUdTLEtBSFQ7QUFBQSxrQ0FJMkIsUUFKM0IsQ0FJRixLQUpFO0FBQUEsZ0JBSUssYUFKTCxtQ0FJcUIsRUFKckI7QUFBQSx3Q0FLYyxhQUxkLENBS0YsT0FMRTtBQUFBLGdCQUtGLE9BTEUseUNBS1EsRUFMUjs7O0FBT1Asc0JBQWEsT0FBYixTQUF3QixTQUF4Qjs7QUFQTyxpQ0FTd0csS0FBSyxhQVQ3RztBQUFBLHVEQVNGLFFBVEU7QUFBQSxnQkFTUSxhQVRSLHlDQVN3QixFQVR4QjtBQUFBLHVEQVM0QixVQVQ1QjtBQUFBLGdCQVN3QyxlQVR4Qyx5Q0FTMEQsRUFUMUQ7QUFBQSx1REFTOEQsV0FUOUQ7QUFBQSxnQkFTOEQsV0FUOUQseUNBUzRFLEVBVDVFO0FBQUEscURBU2dGLElBVGhGO0FBQUEsZ0JBU3NGLFNBVHRGLHVDQVNrRyxFQVRsRzs7QUFVUCxnQkFBSSxvRUFBSjtBQUNBLGdCQUFJLFlBQVksNEJBQWtCLGFBQWxCLEVBQWlDLElBQWpEO0FBQ0EsZ0JBQUksNEJBQTRCLDhCQUFrQixlQUFsQixFQUFtQyxXQUFuQyxFQUFnRCxJQUFoRjs7QUFFQSxnQkFBSSxnQkFBZ0IsUUFBaEIsSUFBNkIsa0JBQWtCLGVBQWUsTUFBZixJQUF5QixDQUE1RSxFQUFnRjtBQUM1RSxtQ0FBbUIseUNBQ0ssY0FETCxpQkFFZixnQkFGSjtBQUdIOztBQUVELGdCQUFJLFFBQUosRUFBYztBQUNWLDRDQUErQix5QkFBL0I7QUFDSDs7QUFFRCxnQkFBSSx3Q0FDVSxLQURWLDREQUVvQixPQUZwQixpQkFFcUMsRUFGckMsa0JBRWtELElBRmxELFVBRTBELHlCQUYxRCxTQUV1RixTQUZ2RixTQUVvRyxLQUFLLE9BRnpHLCtCQUdVLGdCQUhWLG1EQUtLLFNBTFQ7O0FBT0Esd0JBQVUsU0FBVjtBQUNIOzs7Ozs7QUFDSjs7Ozs7Ozs7OztBQ3RERDs7QUFDQTs7Ozs7Ozs7SUFFYSxLLFdBQUEsSzs7O0FBQ1QsbUJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLDZHQUNaLFFBRFk7QUFFckI7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7OztBQ1BEOztBQUNBOzs7Ozs7OztJQUVhLEksV0FBQSxJOzs7QUFDVCxrQkFBWSxTQUFaLEVBQXVCLElBQXZCLEVBQTZCLGtCQUE3QixFQUFpRCxRQUFqRCxFQUEyRDtBQUFBOztBQUFBLDJHQUNsRCxTQURrRCxFQUN2QyxJQUR1QyxFQUNqQyxrQkFEaUMsRUFDYixRQURhO0FBRzFEOzs7OzRCQUVnQjtBQUNiLG1CQUFPLGVBQVA7QUFDSDs7OzRCQUVzQjtBQUFBLDBCQUNDLElBREQsQ0FDZCxNQURjO0FBQUEsZ0JBQ2QsTUFEYywyQkFDTCxFQURLO0FBQUEsZ0NBRTBILE1BRjFILENBRWQsS0FGYztBQUFBLGdCQUVQLFdBRk8saUNBRU8sUUFGUDtBQUFBLGdCQUU0QixlQUY1QixHQUUwSCxNQUYxSCxDQUVpQixTQUZqQjtBQUFBLGdDQUUwSCxNQUYxSCxDQUU2QyxLQUY3QztBQUFBLGdCQUVvRCxXQUZwRCxpQ0FFa0UsRUFGbEU7QUFBQSxvQ0FFMEgsTUFGMUgsQ0FFc0UsU0FGdEU7QUFBQSxnQkFFaUYsZUFGakYscUNBRW1HLEVBRm5HO0FBQUEscUNBRTBILE1BRjFILENBRXVHLFVBRnZHO0FBQUEsZ0JBRXVHLFVBRnZHLHNDQUVvSCxFQUZwSDtBQUFBLHVDQUdzQixXQUh0QixDQUdkLE9BSGM7QUFBQSxnQkFHTCxrQkFISyx3Q0FHZ0IsRUFIaEI7QUFBQSx3Q0FJMEIsZUFKMUIsQ0FJZCxPQUpjO0FBQUEsZ0JBSUwsc0JBSksseUNBSW9CLEVBSnBCOzs7QUFNbkIsMEJBQWMsa0JBQWtCLGVBQWxCLEdBQW9DLFdBQWxEOztBQUVBLGdCQUFJLGFBQWEsWUFBWSxNQUFaLElBQXNCLENBQXRCLHVDQUNxQixzQkFEckIseURBRXNCLGtCQUZ0QixvREFHQyxXQUhELCtEQUtDLEVBTGxCOztBQU9BLG1CQUFPLFVBQVA7QUFDSDs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7QUM3QkQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7OztBQUdBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7MEpBM0JBOzs7QUFpQkE7OztBQUlBOzs7QUFLQTs7O0lBR2EsVSxXQUFBLFUsR0FDVCxzQkFBYztBQUFBOztBQUNWLFNBQUssSUFBTDtBQUNBLFNBQUssTUFBTDtBQUNBLFNBQUssT0FBTDtBQUNBLFNBQUssUUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssTUFBTDtBQUNBLFNBQUssT0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTCxHQUFhLGtCQUFiO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxRQUFMO0FBQ0EsU0FBSyxHQUFMO0FBQ0EsU0FBSyxRQUFMO0FBQ0EsU0FBSyxhQUFMO0FBQ0EsU0FBSyxNQUFMLEdBQWM7QUFDVixxQ0FEVTtBQUVWLHFDQUZVO0FBR1Y7QUFIVSxLQUFkO0FBS0EsU0FBSyxPQUFMLEdBQWU7QUFDWCw2REFEVztBQUVYOztBQUZXLEtBQWY7QUFLSCxDOztBQUNKOztBQUdELE9BQU8sTUFBUCxHQUFnQixvQkFBaEI7O0FBRUEsSUFBSSxXQUFXLFFBQVEsTUFBUixDQUFlLFFBQWYsQ0FBZixFQUF5QztBQUNyQyxZQUNLLE1BREwsQ0FDWSxRQURaLEVBRUssUUFGTCxDQUVjLHNCQUZkLEVBRXNDLG9CQUZ0QztBQUdIOztBQUdELFNBQVMsb0JBQVQsR0FBK0I7QUFDM0IsV0FBTyxVQUFQO0FBQ0g7Ozs7Ozs7Ozs7OztBQ3hFRDs7Ozs7Ozs7SUFFYSxhLFdBQUEsYTs7O0FBQ1QsNkJBQStCO0FBQUEsWUFBbkIsYUFBbUIsdUVBQUgsRUFBRzs7QUFBQTs7QUFBQSw2SEFDdEIsYUFEc0I7QUFFOUI7Ozs7NEJBRW1CO0FBQ2hCLG1CQUFPLGtCQUFQO0FBQ0g7Ozs7OztBQUVKOzs7Ozs7Ozs7O0FDWEQ7O0FBQ0E7Ozs7Ozs7O0lBRWEsTSxXQUFBLE07OztBQUNULG9CQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSwrR0FDWixRQURZO0FBRXJCOzs7OztBQUNKOzs7Ozs7Ozs7Ozs7QUNQRDs7QUFDQTs7Ozs7Ozs7SUFFYSxPLFdBQUEsTzs7O0FBQ1QscUJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLGlIQUNaLFFBRFk7QUFFckI7Ozs7NEJBRWM7QUFDWCxtQkFBTyxhQUFQO0FBQ0g7Ozs7OztBQUNKOzs7Ozs7Ozs7Ozs7QUNYRDs7QUFDQTs7Ozs7Ozs7SUFFYSxLLFdBQUEsSzs7O0FBQ1QsbUJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLDZHQUNaLFFBRFk7QUFFckI7Ozs7NkNBRW9CLE8sRUFBUTtBQUN6QixnQkFBSSxvQkFBb0IsQ0FDcEIsT0FEb0IsRUFDWCxRQURXLEVBQ0QsUUFEQyxDQUF4QjtBQUdBLGdCQUFJLGdCQUFnQixLQUFwQjs7QUFFQSw4QkFBa0IsT0FBbEIsQ0FBMEIsVUFBQyxVQUFELEVBQWU7QUFDckMsb0JBQUcsYUFBSCxFQUFrQjtBQUNsQixnQ0FBaUIsUUFBUSxPQUFSLENBQWdCLFVBQWhCLEtBQStCLENBQWhEO0FBQ0gsYUFIRDs7QUFLQSxtQkFBTyxhQUFQO0FBQ0g7OzsrQ0FFc0IsUyxFQUFXLFMsRUFBVztBQUN6QyxnQkFBSSxvQkFBb0IsS0FBSyxvQkFBTCxDQUEwQixTQUExQixDQUF4Qjs7QUFFQSxnQkFBRyxDQUFDLGlCQUFKLEVBQXVCLFlBQWUsU0FBZjs7QUFFdkIsc0ZBRXFCLFNBRnJCLHNDQUdVLFNBSFY7QUFNSDs7O3dDQU1lLFEsRUFBVSxLLEVBQU8sSyxFQUFPO0FBQUEsZ0JBQy9CLEtBRCtCLEdBQ3RCLElBRHNCLENBQy9CLEtBRCtCO0FBQUEsZ0JBRS9CLEVBRitCLEdBRXpCLEtBRnlCLENBRS9CLEVBRitCOztBQUdwQyxnQkFBSSxpQkFBZSxFQUFmLElBQW9CLE1BQU0sTUFBTixHQUFlLENBQWYsR0FBbUIsTUFBTSxLQUF6QixHQUFpQyxFQUFyRCxDQUFKOztBQUVBLCtEQUM0QixTQUQ1QixXQUMwQyxRQUQxQyxvQ0FFa0IsU0FGbEIscUNBR2UsS0FIZjtBQU1IOzs7NEJBZmU7QUFDWixtQkFBTyxFQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0w7Ozs7Ozs7O0lBRWEsVSxXQUFBLFU7OztBQUNULHdCQUFZLE1BQVosRUFBb0IsV0FBcEIsRUFBaUMsTUFBakMsRUFBeUMsSUFBekMsRUFBOEM7QUFBQTs7QUFBQSx1SEFDcEMsTUFEb0MsRUFDNUIsV0FENEIsRUFDZixNQURlLEVBQ1AsSUFETztBQUU3Qzs7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sY0FBUDtBQUNIOzs7NEJBRXlCO0FBQ3RCLG1CQUFPLFdBQVA7QUFDSDs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7OztBQ2REOzs7Ozs7OztJQUVhLGUsV0FBQSxlOzs7QUFDVCw2QkFBWSxJQUFaLEVBQWtCLFdBQWxCLEVBQThCO0FBQUE7O0FBQUEsaUlBQ3BCLElBRG9CLEVBQ2QsV0FEYztBQUU3Qjs7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sY0FBUDtBQUNIOzs7NEJBRXlCO0FBQ3RCLG1CQUFPLFdBQVA7QUFDSDs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7Ozs7SUNkWSxVLFdBQUEsVTtBQUNULHdCQUFZLGFBQVosRUFBMkIsSUFBM0IsRUFBZ0M7QUFBQTs7QUFDNUIsYUFBSyxhQUFMLEdBQXFCLGFBQXJCO0FBQ0EsYUFBSyxJQUFMLEdBQVksSUFBWjtBQUNIOzs7OzRCQUV3QjtBQUFBLGlDQUNJLEtBQUssSUFEVCxDQUNoQixRQURnQjtBQUFBLGdCQUNoQixRQURnQixrQ0FDTCxLQURLOzs7QUFHckIsbUJBQU8sV0FBVyxlQUFYLEdBQTZCLEVBQXBDO0FBQ0g7Ozs0QkFFeUI7QUFDdEIsbUJBQU8sV0FBUDtBQUNIOzs7NEJBRVU7QUFBQSxnQkFDRixhQURFLEdBQzBDLElBRDFDLENBQ0YsYUFERTtBQUFBLGdCQUNhLElBRGIsR0FDMEMsSUFEMUMsQ0FDYSxJQURiO0FBQUEsZ0JBQ21CLG1CQURuQixHQUMwQyxJQUQxQyxDQUNtQixtQkFEbkI7QUFBQSwrQkFFd0MsSUFGeEMsQ0FFRixNQUZFO0FBQUEsZ0JBRUYsTUFGRSxnQ0FFTyxFQUZQO0FBQUEsK0JBRXdDLElBRnhDLENBRVcsTUFGWDtBQUFBLGdCQUVXLE1BRlgsZ0NBRW9CLEVBRnBCO0FBQUEsZ0NBRXdDLElBRnhDLENBRXdCLE9BRnhCO0FBQUEsZ0JBRXdCLE9BRnhCLGlDQUVrQyxFQUZsQztBQUFBLGtDQUdxRCxNQUhyRCxDQUdGLE9BSEU7QUFBQSxnQkFHUSxhQUhSLG1DQUd3QixFQUh4QjtBQUFBLCtCQUdxRCxNQUhyRCxDQUc0QixJQUg1QjtBQUFBLGdCQUdrQyxVQUhsQztBQUFBLG1DQUlnQyxPQUpoQyxDQUlGLE9BSkU7QUFBQSxnQkFJUSxjQUpSLG9DQUl5QixFQUp6QjtBQUFBLGtDQUtzRCxNQUx0RCxDQUtGLE9BTEU7QUFBQSxnQkFLUSxhQUxSLG1DQUt3QixFQUx4QjtBQUFBLCtCQUtzRCxNQUx0RCxDQUs0QixJQUw1QjtBQUFBLGdCQUttQyxVQUxuQyxnQ0FLZ0QsRUFMaEQ7OztBQU9QLG1FQUNtQyxjQURuQyxTQUNxRCxtQkFEckQsY0FDaUYsS0FBSyxFQUR0RiwyQ0FFeUIsYUFGekIsU0FFMEMsS0FBSyxvQkFGL0MsVUFFd0UsVUFGeEUsbUNBR1UsYUFIVix5Q0FJeUIsYUFKekIsVUFJMkMsVUFKM0M7QUFNSDs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7Ozs7SUM5QlksSyxXQUFBLEs7QUFDVCxxQkFBYztBQUFBO0FBRWI7Ozs7b0RBRTJCLFEsRUFBVTtBQUNsQyxnQkFBSSxDQUFDLFFBQUwsRUFBZSxXQUFXLEVBQVg7O0FBRG1CLDRCQUdhLFFBSGI7QUFBQSxrREFHN0IsY0FINkI7QUFBQSxnQkFHN0IsY0FINkIseUNBR1osT0FIWTtBQUFBLDhDQUdILE9BSEc7QUFBQSxnQkFHSCxPQUhHLHFDQUdPLEVBSFA7OztBQUtsQyxtQkFBVSxjQUFWLFNBQTRCLE9BQTVCO0FBQ0g7Ozt3Q0FFZSxTLEVBQVc7QUFDdkIsZ0JBQUksb0JBQW9CLEdBQXhCO0FBQ0EsZ0JBQUksVUFBVSxFQUFDLFFBQVEsUUFBVCxFQUFtQixRQUFRLEVBQTNCLEVBQWQ7QUFDQSxnQkFBSSxjQUFjLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxPQUFmLEVBQXdCLE1BQXhCLEVBQWdDLE1BQWhDLEVBQXdDLEtBQXhDLEVBQStDLE9BQS9DLEVBQXdELE9BQXhELEVBQWlFLE1BQWpFLEVBQXlFLEtBQXpFLEVBQWdGLFFBQWhGLEVBQTBGLFFBQTFGLEVBQW9HLFVBQXBHLEVBQWdILFVBQWhILEVBQTRILFNBQTVILEVBQXVJLFNBQXZJLENBQWxCO0FBQ0EsZ0JBQUksV0FBVyxVQUFVLE1BQVYsQ0FBaUIsVUFBQyxXQUFELEVBQWMsU0FBZCxFQUE0QjtBQUFBLG9CQUNuRCxJQURtRCxHQUNqQyxTQURpQyxDQUNuRCxJQURtRDtBQUFBLG9CQUM3QyxRQUQ2QyxHQUNqQyxTQURpQyxDQUM3QyxRQUQ2QztBQUFBLHNDQUVwQixRQUZvQixDQUVuRCxLQUZtRDtBQUFBLG9CQUVuRCxLQUZtRCxtQ0FFM0MsR0FGMkM7QUFBQSwwQ0FFcEIsUUFGb0IsQ0FFdEMsU0FGc0M7QUFBQSxvQkFFdEMsU0FGc0MsdUNBRTFCLEVBRjBCO0FBQUEseUNBR2xDLFNBSGtDLENBR25ELE9BSG1EO0FBQUEsb0JBR25ELE9BSG1ELHNDQUd6QyxFQUh5Qzs7QUFJeEQsb0JBQUksZUFBZSxnQkFBZ0IsS0FBaEIsQ0FBbkI7O0FBRUEsb0JBQUkscUJBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGtDQUFpQixXQUFqQjtBQUNIOztBQUVELHFDQUFxQixZQUFyQjs7QUFFQSxvQkFBSSxrQkFBa0IsWUFBWSxLQUFLLEtBQUwsQ0FBVyxlQUFlLFlBQVksTUFBdEMsSUFBZ0QsQ0FBNUQsQ0FBdEI7O0FBRUEsdUJBQU8sS0FBSyxPQUFMLENBQWEsZ0JBQWIsRUFBa0MsZUFBbEMsb0JBQWdFLE9BQWhFLENBQVA7QUFDQSxtQ0FBaUIsV0FBakIsR0FBK0IsSUFBL0I7O0FBRUEsb0JBQUkscUJBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGtDQUFpQixXQUFqQjtBQUNBLHdDQUFvQixDQUFwQjtBQUNIOztBQUVELHVCQUFPLFdBQVA7QUFDSCxhQXZCYyxFQXVCWixFQXZCWSxDQUFmOztBQXlCQSxnQkFBRyxTQUFTLFNBQVQsQ0FBbUIsU0FBUyxNQUFULEdBQWtCLENBQXJDLE1BQTRDLFFBQS9DLEVBQXdEO0FBQ3BELDJCQUFjLFFBQWQ7QUFDSDs7QUFFRCxtQkFBTyxRQUFQOztBQUVBLHFCQUFTLGVBQVQsQ0FBeUIsV0FBekIsRUFBcUM7QUFDakMsb0JBQUcsZ0JBQWdCLEdBQW5CLEVBQXdCLE9BQU8sQ0FBUDs7QUFFeEIsb0JBQUkscUJBQXFCLFlBQVksS0FBWixDQUFrQixHQUFsQixDQUF6Qjs7QUFFQSx1QkFBTyxXQUFXLG1CQUFtQixDQUFuQixDQUFYLElBQW9DLFdBQVcsbUJBQW1CLENBQW5CLENBQVgsQ0FBM0M7QUFDSDtBQUNKOzs7Ozs7QUFDSjs7Ozs7Ozs7OztBQ3hERDs7QUFDQTs7Ozs7Ozs7SUFFYSxJLFdBQUEsSTs7O0FBQ1Qsa0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLDJHQUNaLFFBRFk7QUFFckI7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7QUNQRDs7QUFDQTs7Ozs7Ozs7SUFFYSxRLFdBQUEsUTs7O0FBQ1Qsc0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG1IQUNaLFFBRFk7QUFFckI7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7QUNQRDs7QUFDQTs7Ozs7Ozs7SUFFYSxHLFdBQUEsRzs7O0FBQ1QsaUJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLHlHQUNaLFFBRFk7QUFFckI7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7O0FDUEQ7Ozs7Ozs7Ozs7Ozs7OztBQUdJLG9CQUFZLFNBQVosRUFBdUIsUUFBdkIsRUFBaUM7QUFBQTs7QUFBQSwrR0FDdkIsU0FEdUI7QUFFaEM7Ozs7NEJBRTBCO0FBQ3ZCLG1CQUFPLFVBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLFdBQVA7QUFDSDs7OzRCQUVrQjtBQUNmLG1CQUFPLFlBQVA7QUFDSDs7OzRCQUVtQjtBQUNoQixtQkFBTyxhQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxXQUFQO0FBQ0g7Ozs0QkFFOEI7QUFDM0IsbUJBQU8sMkJBQVA7QUFDSDs7OzRCQUV5QjtBQUN0QixtQkFBTyxxQkFBUDtBQUNIOzs7NEJBRXFCO0FBQ2xCLG1CQUFPLG1CQUFQO0FBQ0g7Ozs0QkFFOEI7QUFDM0I7QUFDSDs7OzRCQUVxQjtBQUNsQjtBQUNIOzs7NEJBRWtDO0FBQy9CO0FBQ0g7Ozs0QkFFMEI7QUFDdkIsbUJBQU8sMEJBQVA7QUFDSDs7OzRCQUV3QjtBQUNyQixtQkFBTyxpQkFBUDtBQUNIOzs7NEJBRTJCO0FBQ3hCLG1CQUFPLE1BQVA7QUFDSDs7OzRCQUVxQztBQUNsQyxtQkFBTyw2QkFBUDtBQUNIOzs7NEJBRTRCO0FBQ3pCLG1CQUFPLCtCQUFQO0FBQ0g7Ozs0QkFFa0M7QUFDL0IsbUJBQU8sYUFBUDtBQUNIOzs7NEJBRW9DO0FBQ2pDLG1CQUFPLGVBQVA7QUFDSDs7OzRCQUUrQjtBQUM1QixtQkFBTyxxQ0FBUDtBQUNIOzs7NEJBRXFDO0FBQ2xDLG1CQUFPLFFBQVA7QUFDSDs7OzRCQUV1QztBQUNwQyxtQkFBTyxVQUFQO0FBQ0g7Ozs0QkFFbUM7QUFDaEMsbUJBQU8sa0RBQVA7QUFDSDs7OzRCQUVrQjtBQUNmLG9GQUM4QyxLQUFLLGVBRG5ELDREQUUwQyxLQUFLLHdCQUYvQyw0SEFNa0IsS0FBSyxhQU52QjtBQVVIOzs7NEJBRWtCO0FBQ2YsMEZBQzBELEtBQUssZ0JBRC9ELDREQUUwQyxLQUFLLDZCQUYvQztBQUlIOzs7NEJBR1U7QUFBQSxnQkFDRixtQkFERSxHQUNpRixJQURqRixDQUNGLG1CQURFO0FBQUEsZ0JBQ21CLFlBRG5CLEdBQ2lGLElBRGpGLENBQ21CLFlBRG5CO0FBQUEsZ0JBQ2lDLGFBRGpDLEdBQ2lGLElBRGpGLENBQ2lDLGFBRGpDO0FBQUEsZ0JBQ2dELGNBRGhELEdBQ2lGLElBRGpGLENBQ2dELGNBRGhEO0FBQUEsZ0JBQ2dFLGFBRGhFLEdBQ2lGLElBRGpGLENBQ2dFLGFBRGhFOzs7QUFHUCxrQ0FDRSxZQURGLGtCQUVFLG1CQUZGLGtCQUdFLGNBSEYsa0JBSUUsYUFKRjtBQUtIOzs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7Ozs7QUM3SEQ7Ozs7SUFJYSxhLFdBQUEsYTs7QUFFVDs7Ozs7O0FBTUEsMkJBQW1EO0FBQUEsUUFBdkMsYUFBdUMsdUVBQXZCLEVBQXVCO0FBQUEsUUFBbkIsYUFBbUIsdUVBQUgsRUFBRzs7QUFBQTs7QUFFaEQ7Ozs7QUFJQSxTQUFLLGFBQUwsR0FBcUIsYUFBckI7O0FBRUE7Ozs7QUFJQSxTQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDRjs7QUFHRDs7Ozs7Ozs7Ozs7Ozs7O3dCQVdVO0FBQUEsVUFDRCxhQURDLEdBQytCLElBRC9CLENBQ0QsYUFEQztBQUFBLFVBQ2MsYUFEZCxHQUMrQixJQUQvQixDQUNjLGFBRGQ7O0FBRU4sVUFBSSxnQkFBZ0IsY0FBYyxNQUFkLENBQXNCLFVBQUMsb0JBQUQsRUFBdUIsVUFBdkIsRUFBcUM7O0FBRTNFLFlBQUcsY0FBYyxVQUFkLENBQUgsRUFBNkI7QUFDekIsY0FBSSxtQkFBbUIsY0FBYyxVQUFkLE1BQThCLFVBQTlCLEdBQ3ZCLFVBRHVCLEdBRXBCLFVBRm9CLFVBRUwsY0FBYyxVQUFkLENBRkssTUFBdkI7O0FBSUEsaUJBQVUsb0JBQVYsU0FBa0MsZ0JBQWxDO0FBQ0g7QUFDRCxlQUFPLG9CQUFQO0FBQ0gsT0FWbUIsRUFVakIsRUFWaUIsQ0FBcEI7QUFXQSxhQUFPLGFBQVA7QUFDSDs7Ozs7O0FBQ0o7Ozs7Ozs7O2tCQ3REYztBQUNYLHVCQURXLCtCQUNTLE9BRFQsRUFDa0IsT0FEbEIsRUFDMkI7QUFDbEMsWUFBSSxZQUFZLFFBQVEsS0FBUixDQUFjLEdBQWQsQ0FBaEI7O0FBRUEsa0JBQVUsT0FBVixDQUFrQix3QkFBZ0I7QUFDOUIsb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixZQUF0QjtBQUNILFNBRkQ7QUFHSCxLQVBVO0FBU1gsNEJBVFcsb0NBU2MsT0FUZCxFQVN1QixPQVR2QixFQVNnQztBQUN2QyxZQUFJLFlBQVksUUFBUSxLQUFSLENBQWMsR0FBZCxDQUFoQjs7QUFFQSxrQkFBVSxPQUFWLENBQWtCLHdCQUFnQjtBQUM5QixvQkFBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLFlBQXpCO0FBQ0gsU0FGRDtBQUdILEtBZlU7QUFpQlgsWUFqQlcsb0JBaUJGLE9BakJFLEVBaUJPLE9BakJQLEVBaUJnQjtBQUN2QixlQUFPLFFBQVEsU0FBUixDQUFrQixPQUFsQixDQUEwQixPQUExQixLQUFzQyxDQUE3QztBQUNIO0FBbkJVLEM7Ozs7Ozs7Ozs7O0FDQWY7Ozs7Ozs7Ozs7Ozs7OztxQ0FHaUI7QUFDVCxpQkFBSyxNQUFMLEdBQWMsQ0FBZDtBQUNBLGlCQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDs7OytCQUVNO0FBQ0gsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUExQztBQUNIOzs7Z0NBRU87QUFDSixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGlCQUFMLENBQXVCLEtBQTFDO0FBQ0g7OztvQ0FFVyxFLEVBQUk7QUFDWixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGlCQUFMLENBQXVCLFlBQTFDLEVBQXdELFVBQUMsUUFBRCxFQUFjO0FBQ2xFLG1CQUFHLFFBQUg7QUFDSCxhQUZEO0FBR0EsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixZQUExQztBQUNIOzs7a0NBRVMsTSxFQUFRO0FBQ2QsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixVQUExQyxFQUFzRCxNQUF0RDtBQUNIOzs7NkJBRUksTyxFQUFTO0FBQ1YsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUExQyxFQUFnRCxPQUFoRDtBQUNIOzs7MkNBRWtCLE8sRUFBUTtBQUN2QixpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGVBQUwsQ0FBcUIsb0JBQXhDLEVBQThELE9BQTlEO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWEsUSxXQUFBLFE7OztBQUNULHdCQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBSyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsY0FBSyxpQkFBTCxHQUF5QiwyQkFBekI7QUFDQSxjQUFLLGVBQUwsR0FBdUIsNEJBQXZCO0FBQ0EsY0FBSyxrQkFBTCxHQUEwQixnQ0FBMUI7QUFMVTtBQU1iOzs7O2dDQUVPLFEsRUFBVTtBQUNkLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxpQkFBTCxDQUF1QixXQUEvQyxFQUE0RCxLQUFLLFVBQWpFO0FBQ0EscUJBQVMsY0FBVCxDQUF3QixLQUFLLGlCQUFMLENBQXVCLE9BQS9DLEVBQXdELEtBQUssWUFBN0Q7QUFDQSxxQkFBUyxjQUFULENBQXdCLEtBQUssaUJBQUwsQ0FBdUIsUUFBL0MsRUFBeUQsS0FBSyxlQUE5RDtBQUNBLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxrQkFBTCxDQUF3QixnQkFBaEQsRUFBa0UsS0FBSyxhQUF2RTtBQUNIOzs7NENBRW1CLE8sRUFBUztBQUN6QixnQkFBSSxtQkFBbUIsRUFBRSxHQUFHLFFBQVEsVUFBYixFQUF5QixHQUFHLFFBQVEsU0FBcEMsRUFBdkI7O0FBRUEsZ0JBQUksUUFBUSxZQUFaLEVBQTBCO0FBQ3RCLG9CQUFJLGVBQWUsS0FBSyxtQkFBTCxDQUF5QixRQUFRLFlBQWpDLENBQW5COztBQUVBLGlDQUFpQixDQUFqQixJQUFzQixhQUFhLENBQW5DO0FBQ0EsaUNBQWlCLENBQWpCLElBQXNCLGFBQWEsQ0FBbkM7QUFDSDs7QUFFRCxtQkFBTyxnQkFBUDtBQUNIOzs7cUNBRVksSyxFQUFPO0FBQUEsZ0JBQ1YsU0FEVSxHQUM0RixJQUQ1RixDQUNWLFNBRFU7QUFBQSxnQkFDQyxZQURELEdBQzRGLElBRDVGLENBQ0MsWUFERDtBQUFBLGdCQUNlLGFBRGYsR0FDNEYsSUFENUYsQ0FDZSxhQURmO0FBQUEsZ0JBQzhCLDZCQUQ5QixHQUM0RixJQUQ1RixDQUM4Qiw2QkFEOUI7QUFBQSxnQkFDNkQsYUFEN0QsR0FDNEYsSUFENUYsQ0FDNkQsYUFEN0Q7QUFBQSxnQkFDNEUsV0FENUUsR0FDNEYsSUFENUYsQ0FDNEUsV0FENUU7QUFBQSxnQkFFRyxLQUZILEdBRWEsU0FGYixDQUVWLFdBRlU7O0FBR2hCLGdCQUFJLG9CQUFvQixLQUFLLG1CQUFMLENBQXlCLFVBQVUsUUFBbkMsRUFBNkMsQ0FBQyw2QkFBRCxDQUE3QyxDQUF4QjtBQUNBLGdCQUFJLG1CQUFtQixLQUFLLG1CQUFMLENBQXlCLFNBQXpCLENBQXZCO0FBSmdCLGdCQUtQLFNBTE8sR0FLTyxnQkFMUCxDQUtWLENBTFU7QUFBQSxnQkFNSCxDQU5HLEdBTUcsS0FOSCxDQU1WLEtBTlU7O0FBT2hCLGdCQUFJLFFBQVMsSUFBSyxTQUFsQjtBQUNBLGdCQUFJLGNBQWUsUUFBUSxLQUEzQjtBQUNBLGdCQUFJLHNCQUFzQixDQUFDLFdBQUQsRUFBYyxhQUFkLENBQTFCO0FBQ0EsZ0JBQUksV0FBVyxLQUFLLG1CQUFMLENBQXlCLGFBQWEsUUFBdEMsRUFBZ0QsbUJBQWhELENBQWY7O0FBRUEscUJBQVMsU0FBVCxHQUFxQixhQUFyQjtBQUNBLDhCQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFtQyxjQUFjLEdBQWpEOztBQUVBLGlCQUFLLGFBQUwsR0FBcUIsV0FBckI7QUFDQSxpQkFBSyxTQUFMLENBQWUsV0FBZjtBQUNIOzs7OEJBRUssSyxFQUFPO0FBQUEsZ0JBQ0gsZUFERyxHQUNxRCxJQURyRCxDQUNILGVBREc7QUFBQSxnQkFDYyxRQURkLEdBQ3FELElBRHJELENBQ2MsUUFEZDtBQUFBLGdCQUN3Qix3QkFEeEIsR0FDcUQsSUFEckQsQ0FDd0Isd0JBRHhCO0FBQUEsZ0JBRVUsS0FGVixHQUVvQixRQUZwQixDQUVILFdBRkc7O0FBR1QsZ0JBQUksbUJBQW1CLEtBQUssbUJBQUwsQ0FBeUIsUUFBekIsQ0FBdkI7QUFIUyxnQkFJQSxTQUpBLEdBSWMsZ0JBSmQsQ0FJSCxDQUpHO0FBQUEsZ0JBS0ksQ0FMSixHQUtVLEtBTFYsQ0FLSCxLQUxHOztBQU1ULGdCQUFJLFFBQVMsSUFBSyxTQUFsQjtBQUNBLGdCQUFJLGNBQWMsS0FBSyxRQUFMLElBQWlCLFFBQVEsS0FBekIsQ0FBbEI7QUFDQSxnQkFBSSxvQkFBb0IsS0FBSyxxQkFBTCxDQUEyQixXQUEzQixDQUF4QjtBQUNBLGdCQUFJLG1CQUFtQixLQUFLLGVBQUwsQ0FBcUIsaUJBQXJCLENBQXZCO0FBQ0EsZ0JBQUksZ0JBQWdCLENBQUMsd0JBQUQsQ0FBcEI7QUFDQSxnQkFBSSxhQUFhLEtBQUssbUJBQUwsQ0FBeUIsU0FBUyxRQUFsQyxFQUE0QyxhQUE1QyxDQUFqQjs7QUFFQSw0QkFBZ0IsU0FBaEIsUUFBK0IsZ0JBQS9CO0FBQ0EsdUJBQVcsS0FBWCxDQUFpQixLQUFqQixHQUE2QixRQUFRLEtBQVQsR0FBa0IsR0FBOUM7O0FBRUEsaUJBQUssSUFBTCxDQUFVLFdBQVY7QUFDSDs7O3FDQUVZLEssRUFBTztBQUFBLGdCQUNWLGlCQURVLEdBQ3VDLElBRHZDLENBQ1YsaUJBRFU7QUFBQSxnQkFDUyxXQURULEdBQ3VDLElBRHZDLENBQ1MsV0FEVDtBQUFBLGdCQUNzQixZQUR0QixHQUN1QyxJQUR2QyxDQUNzQixZQUR0Qjs7QUFFaEIsZ0JBQUksZ0JBQWdCLENBQUMsV0FBRCxFQUFjLFlBQWQsQ0FBcEI7QUFDQSxnQkFBSSxnQkFBZ0IsS0FBSyxtQkFBTCxDQUF5QixrQkFBa0IsUUFBM0MsRUFBcUQsYUFBckQsQ0FBcEI7O0FBRUEsb0JBQVEsY0FBYyxTQUF0QjtBQUNJLHFCQUFLLFdBQUw7QUFDSSxrQ0FBYyxTQUFkLEdBQTBCLFlBQTFCOztBQUVBLHlCQUFLLElBQUw7QUFDQTtBQUNKLHFCQUFLLFlBQUw7QUFDSSxrQ0FBYyxTQUFkLEdBQTBCLFdBQTFCOztBQUVBLHlCQUFLLEtBQUw7QUFDQTtBQUNKO0FBQ0k7QUFaUjtBQWNIOzs7Z0NBRU8sSyxFQUFPO0FBQUEsZ0JBQ0wsWUFESyxHQUNrRixJQURsRixDQUNMLFlBREs7QUFBQSxnQkFDUyxXQURULEdBQ2tGLElBRGxGLENBQ1MsV0FEVDtBQUFBLGdCQUNzQixhQUR0QixHQUNrRixJQURsRixDQUNzQixhQUR0QjtBQUFBLGdCQUNxQyxTQURyQyxHQUNrRixJQURsRixDQUNxQyxTQURyQztBQUFBLGdCQUNnRCw2QkFEaEQsR0FDa0YsSUFEbEYsQ0FDZ0QsNkJBRGhEOztBQUVYLGdCQUFJLHNCQUFzQixDQUFDLFdBQUQsRUFBYyxhQUFkLENBQTFCO0FBQ0EsZ0JBQUksV0FBVyxLQUFLLG1CQUFMLENBQXlCLGFBQWEsUUFBdEMsRUFBZ0QsbUJBQWhELENBQWY7QUFDQSxnQkFBSSxvQkFBb0IsS0FBSyxtQkFBTCxDQUF5QixVQUFVLFFBQW5DLEVBQTZDLENBQUMsNkJBQUQsQ0FBN0MsQ0FBeEI7O0FBRUEsb0JBQVEsU0FBUyxTQUFqQjtBQUNJLHFCQUFLLGFBQUw7QUFDSSw2QkFBUyxTQUFULEdBQXFCLFdBQXJCO0FBQ0Esc0NBQWtCLEtBQWxCLENBQXdCLEtBQXhCOztBQUVBLHlCQUFLLFNBQUwsQ0FBZSxDQUFmO0FBQ0E7QUFDSixxQkFBSyxXQUFMO0FBQ0ksNkJBQVMsU0FBVCxHQUFxQixhQUFyQjtBQUNBLHNDQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFtQyxLQUFLLGFBQUwsR0FBcUIsR0FBeEQ7O0FBRUEseUJBQUssU0FBTCxDQUFlLEtBQUssYUFBcEI7QUFDQTtBQUNKO0FBQ0k7QUFkUjtBQWdCSDs7O3NDQUVhLE0sRUFBUSxTLEVBQVc7QUFBQSxnQkFDdkIsU0FEdUIsR0FDc0IsSUFEdEIsQ0FDdkIsU0FEdUI7QUFBQSxnQkFDWiw2QkFEWSxHQUNzQixJQUR0QixDQUNaLDZCQURZOztBQUU3QixnQkFBSSxPQUFPLElBQVg7QUFDQSxnQkFBSSxvQkFBb0IsS0FBSyxtQkFBTCxDQUF5QixVQUFVLFFBQW5DLEVBQTZDLENBQUMsNkJBQUQsQ0FBN0MsQ0FBeEI7O0FBRUEsOEJBQWtCLEtBQWxCLENBQXdCLEtBQXhCLEdBQW1DLEtBQUssYUFBTCxHQUFxQixHQUF4RDs7QUFFQSxpQkFBSyxTQUFMLENBQWUsS0FBSyxhQUFwQjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsVUFBQyxRQUFELEVBQWM7QUFBQSxvQkFDckIsYUFEcUIsR0FDd0IsSUFEeEIsQ0FDckIsYUFEcUI7QUFBQSxvQkFDTixlQURNLEdBQ3dCLElBRHhCLENBQ04sZUFETTtBQUFBLG9CQUNXLFFBRFgsR0FDd0IsSUFEeEIsQ0FDVyxRQURYOztBQUUzQixvQkFBSSxxQkFBcUIsS0FBSyxxQkFBTCxDQUEyQixRQUEzQixDQUF6QjtBQUNBLG9CQUFJLG9CQUFvQixLQUFLLGVBQUwsQ0FBcUIsa0JBQXJCLENBQXhCOztBQUVBLHFCQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUEsb0JBQUksYUFBSixFQUFtQixjQUFjLFNBQWQsU0FBOEIsaUJBQTlCO0FBQ25CLG9CQUFJLGVBQUosRUFBcUIsZ0JBQWdCLFNBQWhCO0FBQ3JCLG9CQUFJLFFBQUosRUFBYyxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBckIsQ0FBMkIsS0FBM0I7QUFDakIsYUFWRDtBQVdIOzs7cUNBRVksTSxFQUFRO0FBQUEsZ0JBQ1gsZUFEVyxHQUM2QyxJQUQ3QyxDQUNYLGVBRFc7QUFBQSxnQkFDTSxRQUROLEdBQzZDLElBRDdDLENBQ00sUUFETjtBQUFBLGdCQUNnQix3QkFEaEIsR0FDNkMsSUFEN0MsQ0FDZ0Isd0JBRGhCO0FBQUEsZ0JBRUUsT0FGRixHQUVjLE1BRmQsQ0FFWCxXQUZXOzs7QUFJakIsc0JBQVUsVUFBVSxLQUFLLFFBQWYsR0FBMEIsQ0FBMUIsR0FBOEIsT0FBeEM7O0FBRUEsZ0JBQUksb0JBQW9CLEtBQUsscUJBQUwsQ0FBMkIsT0FBM0IsQ0FBeEI7QUFDQSxnQkFBSSxtQkFBbUIsS0FBSyxlQUFMLENBQXFCLGlCQUFyQixDQUF2QjtBQUNBLGdCQUFJLGFBQWEsVUFBVSxLQUFLLFFBQWhDOztBQUVBLGdCQUFJLGVBQUosRUFBcUIsZ0JBQWdCLFNBQWhCLFFBQStCLGdCQUEvQjs7QUFFckIsZ0JBQUksZ0JBQWdCLENBQUMsd0JBQUQsQ0FBcEI7O0FBRUEsZ0JBQUksUUFBSixFQUFjO0FBQ1Ysb0JBQUksb0JBQW9CLEtBQUssbUJBQUwsQ0FBeUIsU0FBUyxRQUFsQyxFQUE0QyxhQUE1QyxDQUF4Qjs7QUFFQSxrQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBeEIsR0FBbUMsYUFBYSxHQUFoRDtBQUNIO0FBQ0o7OztvQ0FFVztBQUFBLGdCQUNGLGlCQURFLEdBQytDLElBRC9DLENBQ0YsaUJBREU7QUFBQSxnQkFDaUIsV0FEakIsR0FDK0MsSUFEL0MsQ0FDaUIsV0FEakI7QUFBQSxnQkFDOEIsWUFEOUIsR0FDK0MsSUFEL0MsQ0FDOEIsWUFEOUI7O0FBRVIsZ0JBQUksZ0JBQWdCLENBQUMsV0FBRCxFQUFjLFlBQWQsQ0FBcEI7QUFDQSxnQkFBSSxnQkFBZ0IsS0FBSyxtQkFBTCxDQUNoQixrQkFBa0IsUUFERixFQUVoQixhQUZnQixDQUFwQjs7QUFLQSwwQkFBYyxTQUFkLEdBQTBCLFlBQTFCOztBQUVBLGlCQUFLLElBQUw7QUFDSDs7O21DQUVVO0FBQUEsZ0JBQ0QsaUJBREMsR0FDZ0QsSUFEaEQsQ0FDRCxpQkFEQztBQUFBLGdCQUNrQixXQURsQixHQUNnRCxJQURoRCxDQUNrQixXQURsQjtBQUFBLGdCQUMrQixZQUQvQixHQUNnRCxJQURoRCxDQUMrQixZQUQvQjs7QUFFUCxnQkFBSSxnQkFBZ0IsQ0FBQyxXQUFELEVBQWMsWUFBZCxDQUFwQjtBQUNBLGdCQUFJLGdCQUFnQixLQUFLLG1CQUFMLENBQ2hCLGtCQUFrQixRQURGLEVBRWhCLGFBRmdCLENBQXBCOztBQUtBLDBCQUFjLFNBQWQsR0FBMEIsV0FBMUI7O0FBRUEsaUJBQUssS0FBTDtBQUNIOzs7MENBRWlCLFEsRUFBVTtBQUN4QixnQkFBSSxPQUFPLElBQVg7QUFEd0IsZ0JBRWxCLFFBRmtCLEdBRTJELElBRjNELENBRWxCLFFBRmtCO0FBQUEsZ0JBRVIsU0FGUSxHQUUyRCxJQUYzRCxDQUVSLFNBRlE7QUFBQSxnQkFFRyxpQkFGSCxHQUUyRCxJQUYzRCxDQUVHLGlCQUZIO0FBQUEsZ0JBRXNCLFlBRnRCLEdBRTJELElBRjNELENBRXNCLFlBRnRCO0FBQUEsZ0JBRW9DLGtCQUZwQyxHQUUyRCxJQUYzRCxDQUVvQyxrQkFGcEM7OztBQUl4QixpQkFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsaUJBQUssVUFBTCxHQUFrQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLFdBQW5DLEVBQWdELFVBQWhELENBQWxCO0FBQ0EsaUJBQUssV0FBTCxHQUFtQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLE1BQW5DLEVBQTJDLFdBQTNDLENBQW5CO0FBQ0EsaUJBQUssWUFBTCxHQUFvQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLE9BQW5DLEVBQTRDLFlBQTVDLENBQXBCO0FBQ0EsaUJBQUssZUFBTCxHQUF1QixTQUFTLEVBQVQsQ0FBWSxLQUFLLGlCQUFMLENBQXVCLFFBQW5DLEVBQTZDLGVBQTdDLENBQXZCO0FBQ0EsaUJBQUssYUFBTCxHQUFxQixTQUFTLEVBQVQsQ0FBWSxLQUFLLGtCQUFMLENBQXdCLGdCQUFwQyxFQUFzRCxhQUF0RCxDQUFyQjtBQUNBLGlCQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLEdBQWtCLEtBQUssVUFBdkIsR0FBb0MsVUFBdEQ7O0FBRUEsc0JBQVUsZ0JBQVYsQ0FBMkIsV0FBM0IsRUFBd0MsVUFBQyxLQUFELEVBQVc7QUFDL0MscUJBQUssWUFBTCxDQUFrQixLQUFsQjtBQUNILGFBRkQ7QUFHQSxxQkFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFDLEtBQUQsRUFBVztBQUMxQyxxQkFBSyxLQUFMLENBQVcsS0FBWDtBQUNILGFBRkQ7QUFHQSw4QkFBa0IsZ0JBQWxCLENBQW1DLFNBQW5DLEVBQThDLFVBQUMsS0FBRCxFQUFXO0FBQ3JELHFCQUFLLFlBQUwsQ0FBa0IsS0FBbEI7QUFDSCxhQUZEO0FBR0EseUJBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBQyxLQUFELEVBQVc7QUFDOUMscUJBQUssT0FBTCxDQUFhLEtBQWI7QUFDSCxhQUZEOztBQUlBLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssaUJBQUwsQ0FBdUIsUUFBMUMsRUFBb0QsVUFBQyxNQUFELEVBQVk7QUFDNUQscUJBQUssNEJBQUwsQ0FBa0MsRUFBRSxjQUFGLEVBQWxDO0FBQ0gsYUFGRDs7QUFJQSxxQkFBUyxhQUFULENBQXVCLEdBQXZCLEVBQTRCO0FBQUEsb0JBQ2hCLG9CQURnQixHQUN5RCxJQUR6RCxDQUNoQixvQkFEZ0I7QUFBQSxvQkFDTSxzQkFETixHQUN5RCxJQUR6RCxDQUNNLHNCQUROO0FBQUEsb0JBQzhCLHNCQUQ5QixHQUN5RCxJQUR6RCxDQUM4QixzQkFEOUI7O0FBRXhCLG9CQUFNLGNBQWMsTUFBTSxJQUFOLENBQVcsU0FBUyxzQkFBVCxDQUFnQyxzQkFBaEMsQ0FBWCxDQUFwQjtBQUZ3QixvQkFHWixnQkFIWSxHQUdTLEdBSFQsQ0FHaEIsRUFIZ0I7OztBQUt4Qiw0QkFBWSxPQUFaLENBQW9CLDJCQUFtQjtBQUFBLHdCQUN6QixTQUR5QixHQUNYLGVBRFcsQ0FDN0IsRUFENkI7OztBQUduQyx3QkFBSSxjQUFjLGdCQUFsQixFQUFvQztBQUNoQyx3Q0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsc0JBQWpDO0FBQ0Esd0NBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLG9CQUE5QjtBQUNBO0FBQ0g7O0FBR0csb0NBQWdCLFNBQWhCLENBQTBCLE1BQTFCLENBQWlDLG9CQUFqQztBQUNBLG9DQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixzQkFBOUI7QUFFUCxpQkFiRDtBQWNIOztBQUVELHFCQUFTLGVBQVQsQ0FBeUIsTUFBekIsRUFBaUMsVUFBakMsRUFBNkM7QUFDekMscUJBQUssYUFBTCxDQUFtQixNQUFuQixFQUEyQixVQUEzQjtBQUNIOztBQUVELHFCQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEI7QUFDeEIscUJBQUssWUFBTCxDQUFrQixNQUFsQjtBQUNIOztBQUVELHFCQUFTLFdBQVQsQ0FBcUIsTUFBckIsRUFBNkI7QUFDekIscUJBQUssUUFBTCxDQUFjLE1BQWQ7QUFDSDs7QUFFRCxxQkFBUyxZQUFULEdBQXdCO0FBQ3BCLHFCQUFLLFNBQUw7QUFDSDtBQUNKOzs7NENBRW1CLFEsRUFBVSxPLEVBQVM7QUFDbkMsZ0JBQUksZUFBZSxvQkFBb0IsS0FBcEIsR0FDZixRQURlLEdBRWYsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUZKO0FBR0EsZ0JBQUksb0JBQUo7O0FBRUEsb0JBQVEsT0FBUixDQUFnQixVQUFDLFNBQUQsRUFBWSxLQUFaLEVBQXNCO0FBQ2xDLG9CQUFJLENBQUMsU0FBTCxFQUFnQjtBQUNoQixvQkFBSSxXQUFKLEVBQWlCOztBQUVqQiw4QkFBYyxhQUFhLElBQWIsQ0FBa0IsVUFBQyxPQUFELEVBQVUsS0FBVixFQUFvQjtBQUNoRCwyQkFBTyxRQUFRLFNBQVIsQ0FBa0IsT0FBbEIsQ0FBMEIsU0FBMUIsS0FBd0MsQ0FBL0M7QUFDSCxpQkFGYSxDQUFkO0FBR0gsYUFQRDs7QUFTQSxtQkFBTyxXQUFQO0FBQ0g7Ozt3Q0FFZSxVLEVBQVk7QUFBQSxnQkFDbEIsS0FEa0IsR0FDOEMsVUFEOUMsQ0FDbEIsS0FEa0I7QUFBQSxnQkFDTyxPQURQLEdBQzhDLFVBRDlDLENBQ1gsZ0JBRFc7QUFBQSxnQkFDa0MsT0FEbEMsR0FDOEMsVUFEOUMsQ0FDZ0IsZ0JBRGhCOztBQUV4QixnQkFBSSxhQUFhLEVBQWpCO0FBQ0EsZ0JBQUksZUFBZSxVQUFVLEVBQVYsU0FDWCxPQURXLFNBRVosT0FGWSxNQUFuQjtBQUdBLGdCQUFJLGVBQWUsVUFBVSxFQUFWLFNBQ1gsT0FEVyxRQUVaLE9BRlA7O0FBSUEsZ0JBQUksUUFBUSxDQUFaLEVBQWU7QUFDWCw2QkFBYSxRQUFRLEVBQVIsU0FDTCxLQURLLFNBRU4sS0FGTSxNQUFiO0FBR0g7O0FBRUQsd0JBQVUsVUFBVixHQUF1QixZQUF2QixHQUFzQyxZQUF0QztBQUNIOzs7OENBRXFCLE8sRUFBUztBQUMzQixnQkFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQVUsRUFBckIsQ0FBZDtBQUNBLGdCQUFJLGtCQUFrQjtBQUNsQix5QkFBUyxPQURTO0FBRWxCLHVCQUFPLEtBQUssS0FBTCxDQUFXLFVBQVUsRUFBckIsQ0FGVztBQUdsQixrQ0FBa0IsS0FBSyxLQUFMLENBQVcsVUFBVSxFQUFyQixDQUhBO0FBSWxCLGtDQUFrQixLQUFLLEtBQUwsQ0FBVyxVQUFVLEVBQXJCLENBSkE7QUFLbEIseUJBQVM7QUFMUyxhQUF0Qjs7QUFRQSxtQkFBTyxlQUFQO0FBQ0g7Ozs7OztBQUNKOzs7Ozs7Ozs7Ozs7OztBQzNTRyxzQkFBYTtBQUFBO0FBRVo7Ozs7NEJBRXlCO0FBQ3RCLG1CQUFPO0FBQ0gsd0JBQVMsZ0JBRE47QUFFSCx5QkFBVSxpQkFGUDtBQUdILHdCQUFTLGtCQUhOO0FBSUgsMkJBQVksbUJBSlQ7QUFLSCx5QkFBVSxpQkFMUDtBQU1ILDBCQUFXLGtCQU5SO0FBT0gsNkJBQWMscUJBUFg7QUFRSCw0QkFBYSwyQkFSVjtBQVNILCtCQUFnQix1QkFUYjtBQVVILDJCQUFZLG1CQVZUO0FBV0gsOEJBQWUsc0JBWFo7QUFZSCwyQkFBWSxtQkFaVDtBQWFILDBCQUFXO0FBYlIsYUFBUDtBQWVIOzs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7Ozs7O0FDdEJBLGlCQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFDaEIsT0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNBOzs7O3lCQUVNLEksRUFBTSxJLEVBQU0sTyxFQUFTO0FBQUEsT0FDdEIsR0FEc0IsR0FDZixJQURlLENBQ3RCLEdBRHNCO0FBQUEsT0FFaEIsS0FGZ0IsR0FFUCxHQUZPLENBRXRCLElBRnNCOzs7QUFJM0IsT0FBSSxDQUFDLElBQUwsRUFBVztBQUNWLFFBQUksV0FBVztBQUNkLGNBQWEsSUFBYixxQkFBaUMsT0FBakM7QUFEYyxLQUFmOztBQUlBLFFBQUcsS0FBSCxFQUFTO0FBQ1IsVUFBSyxHQUFMLENBQVMsS0FBVCxDQUFlLFFBQWYsRUFBeUIsUUFBekI7QUFDQSxXQUFNLElBQUksS0FBSixDQUFVLFNBQVMsT0FBbkIsQ0FBTjtBQUNBO0FBQ0Q7O0FBRUQsVUFBTyxJQUFQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3JCVyxhLFdBQUEsYTtBQUNULDZCQUFjO0FBQUE7QUFFYjs7OztpQ0FNUSxLLEVBQU87QUFDWixnQkFBTSxjQUFjLEtBQWQseUNBQWMsS0FBZCxDQUFOO0FBQ0EsbUJBQU8sU0FBUyxJQUFULEtBQWtCLFFBQVEsUUFBUixJQUFvQixRQUFRLFVBQTlDLENBQVA7QUFDSDs7O29DQUVXLEcsRUFBSztBQUNiLG1CQUFPLFFBQVEsU0FBUixJQUFxQixRQUFRLElBQXBDO0FBQ0g7OztpQ0FFUSxHLEVBQUs7QUFDVixtQkFBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEdBQW5CLE1BQTRCLGlCQUFuQztBQUNIOzs7bUNBRVUsRyxFQUFLO0FBQ1osbUJBQU8sT0FBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEdBQW5CLE1BQTRCLG1CQUExQztBQUNIOzs7aUNBRVEsRyxFQUFLO0FBQ1YsbUJBQU8sQ0FBQyxNQUFNLEdBQU4sQ0FBUjtBQUNIOzs7a0NBRVMsRyxFQUFLO0FBQ1gsbUJBQU8sT0FBTyxHQUFQLEtBQWUsU0FBZixJQUE2QixRQUFPLEdBQVAseUNBQU8sR0FBUCxPQUFlLFFBQWYsSUFBMkIsT0FBTyxJQUFJLE9BQUosRUFBUCxLQUF5QixTQUF4RjtBQUNIOzs7Z0NBRU8sRyxFQUFLO0FBQ1QsZ0JBQUksaUJBQWlCLE9BQU8sU0FBUCxDQUFpQixjQUF0QztBQUNBLGdCQUFJLFVBQVUsTUFBTSxPQUFOLENBQWMsR0FBZCxDQUFkO0FBQ0EsZ0JBQUksV0FBVyxPQUFPLEdBQVAsS0FBZSxRQUE5QjtBQUNBLGdCQUFJLGNBQWMsV0FBVyxRQUE3Qjs7QUFFQSxnQkFBSSxlQUFlLElBQUksTUFBSixLQUFlLENBQWxDLEVBQXFDLE9BQU8sSUFBUDtBQUNyQyxnQkFBSSxlQUFlLElBQUksTUFBSixHQUFhLENBQWhDLEVBQW1DLE9BQU8sS0FBUDtBQUNuQyxnQkFBSSxDQUFDLE1BQU0sR0FBTixDQUFMLEVBQWlCLE9BQU8sS0FBUDtBQUNqQixnQkFBSSxRQUFRLFNBQVosRUFBdUIsT0FBTyxJQUFQO0FBQ3ZCLGdCQUFJLFFBQVEsSUFBWixFQUFrQixPQUFPLElBQVA7O0FBRWxCLGlCQUFLLElBQUksR0FBVCxJQUFnQixHQUFoQixFQUFxQjtBQUNqQixvQkFBSSxlQUFlLElBQWYsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsQ0FBSixFQUFtQyxPQUFPLEtBQVA7QUFDdEM7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7NEJBOUNjO0FBQ1gsbUJBQU8sT0FBTyxTQUFQLENBQWlCLFFBQXhCO0FBQ0g7Ozs7OztBQStDTCxJQUFJLGdCQUFnQixJQUFJLGFBQUosRUFBcEI7O0lBRWEsYSxXQUFBLGE7QUFDVCw2QkFBYztBQUFBO0FBRWI7O0FBRUQ7Ozs7Ozs7OztnQ0FLUSxNLEVBQVEsUSxFQUFVO0FBQ3RCLGdCQUFJLENBQUMsTUFBRCxJQUFXLFdBQVcsRUFBMUIsRUFBOEIsT0FBTyxFQUFQOztBQUU5QixnQkFBSSxPQUFPLE9BQU8sSUFBUCxDQUFZLE1BQVosQ0FBWDtBQUNBLGdCQUFJLFVBQVUsS0FBSyxNQUFMLENBQVksVUFBQyxZQUFELEVBQWUsR0FBZixFQUF1QjtBQUM3QyxvQkFBSSxRQUFRLENBQUMsR0FBRCxFQUFNLE9BQU8sR0FBUCxDQUFOLENBQVo7O0FBRUEsNkJBQWEsSUFBYixDQUFrQixLQUFsQjs7QUFFQSx1QkFBTyxZQUFQO0FBQ0gsYUFOYSxFQU1YLEVBTlcsQ0FBZDtBQU9BLGdCQUFJLFlBQVksSUFBSSxHQUFKLENBQVEsT0FBUixDQUFoQjtBQUNBLGdCQUFJLGNBQWMsRUFBbEI7O0FBRUEsZ0JBQUksQ0FBQyxTQUFMLEVBQWdCLE9BQU8sRUFBUDs7QUFFaEIsc0JBQVUsT0FBVixDQUFrQixVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQ2xDLDRCQUFZLElBQVosQ0FBaUIsU0FBUyxHQUFULEVBQWMsR0FBZCxDQUFqQjtBQUNILGFBRkQ7O0FBSUEsbUJBQU8sV0FBUDtBQUNIOzs7OEJBRUssSSxFQUFNLE0sRUFBUSxNLEVBQVE7QUFDeEIsZ0JBQUksYUFBYSxPQUFPLElBQVAsQ0FBWSxNQUFaLENBQWpCO0FBQ0EsZ0JBQUksZ0JBQWdCLElBQUksTUFBSixDQUFXLElBQVgsQ0FBcEI7O0FBRUEsdUJBQVcsT0FBWCxDQUFtQixVQUFDLFNBQUQsRUFBWSxLQUFaLEVBQXNCO0FBQ3JDLG9CQUFJLFVBQVUsT0FBTyxPQUFQLENBQWUsU0FBZixLQUE2QixDQUEzQyxFQUE4QztBQUM5Qyw4QkFBYyxTQUFkLElBQTJCLE9BQU8sU0FBUCxDQUEzQjtBQUNILGFBSEQ7O0FBS0EsbUJBQU8sYUFBUDtBQUNIOzs7K0JBRU0sTSxFQUFRLFEsRUFBVSxZLEVBQWM7QUFDbkMsZ0JBQUksQ0FBQyxNQUFELElBQVcsV0FBVyxFQUExQixFQUE4Qjs7QUFFOUIsZ0JBQUksT0FBTyxPQUFPLElBQVAsQ0FBWSxNQUFaLENBQVg7QUFDQSxnQkFBSSxVQUFVLEtBQUssTUFBTCxDQUFZLFVBQUMsWUFBRCxFQUFlLEdBQWYsRUFBdUI7QUFDN0Msb0JBQUksUUFBUSxDQUFDLEdBQUQsRUFBTSxPQUFPLEdBQVAsQ0FBTixDQUFaO0FBQ0EsNkJBQWEsSUFBYixDQUFrQixLQUFsQjtBQUNBLHVCQUFPLFlBQVA7QUFDSCxhQUphLEVBSVgsRUFKVyxDQUFkO0FBS0EsZ0JBQUksWUFBWSxJQUFJLEdBQUosQ0FBUSxPQUFSLENBQWhCOztBQUVBLHNCQUFVLE9BQVYsQ0FBa0IsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUNsQywrQkFBZSxTQUFTLFlBQVQsRUFBdUIsR0FBdkIsRUFBNEIsR0FBNUIsQ0FBZjtBQUNILGFBRkQ7O0FBSUEsbUJBQU8sWUFBUDtBQUNIOztBQUVEOzs7Ozs7O2lDQUlTLFUsRUFBWSxJLEVBQU07QUFDdkIsZ0JBQUksY0FBYztBQUNkLHlCQUFTLEtBREs7QUFFZCx3QkFBUTtBQUZNLGFBQWxCOztBQUtBLHVCQUFXLE9BQVgsQ0FBbUIsVUFBQyxPQUFELEVBQVUsS0FBVixFQUFvQjtBQUNuQyxxQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsd0JBQUksY0FBYyxPQUFkLENBQXNCLFFBQVEsR0FBUixDQUF0QixDQUFKLEVBQXlDO0FBQ3JDLG9DQUFZLE9BQVosR0FBc0IsSUFBdEI7QUFDQSxvQ0FBWSxNQUFaLENBQW1CLElBQW5CLENBQXdCO0FBQ3BCLGlDQUFLLEdBRGU7QUFFcEIsbUNBQU8sS0FGYTtBQUdwQixtQ0FBTyxRQUFRLEdBQVI7QUFIYSx5QkFBeEI7QUFLSDtBQUNKLGlCQVREO0FBVUgsYUFYRDs7QUFhQSxtQkFBTyxXQUFQO0FBQ0g7Ozs0QkFFRyxVLEVBQVksTyxFQUFTOztBQUVyQixnQkFBSSxNQUFNLE9BQU4sQ0FBYyxPQUFkLENBQUosRUFBNEI7QUFDeEIsdUJBQU8sS0FBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLE9BQTlCLENBQVA7QUFDSDs7QUFFRCxnQkFBSSxRQUFPLE9BQVAseUNBQU8sT0FBUCxPQUFtQixRQUF2QixFQUFpQztBQUM3Qix1QkFBTyxLQUFLLGFBQUwsQ0FBbUIsVUFBbkIsRUFBK0IsT0FBL0IsQ0FBUDtBQUNIOztBQUVELG1CQUFPLFdBQVcsT0FBWCxDQUFtQixPQUFuQixLQUErQixDQUF0QztBQUNIOzs7c0NBRWEsVSxFQUFZLE8sRUFBUztBQUMvQixnQkFBSSxRQUFRLEtBQVo7O0FBRUEsdUJBQVcsT0FBWCxDQUFtQixVQUFDLFlBQUQsRUFBZSxLQUFmLEVBQXlCO0FBQ3hDLG9CQUFJLFFBQU8sWUFBUCx5Q0FBTyxZQUFQLE9BQXdCLFFBQTVCLEVBQXNDO0FBQ2xDLHdCQUFJLG1CQUFtQixPQUFPLElBQVAsQ0FBWSxZQUFaLENBQXZCO0FBQ0EscUNBQWlCLE9BQWpCLENBQXlCLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDckMsZ0NBQVEsYUFBYSxHQUFiLE1BQXNCLFFBQVEsR0FBUixDQUE5QjtBQUNILHFCQUZEO0FBR0g7QUFDSixhQVBEOztBQVNBLG1CQUFPLEtBQVA7QUFDSDs7O3FDQUVZLFUsRUFBWSxZLEVBQWM7QUFDbkMsZ0JBQUksUUFBUSxLQUFaOztBQUVBLHVCQUFXLE9BQVgsQ0FBbUIsVUFBQyxZQUFELEVBQWUsS0FBZixFQUF5Qjs7QUFHeEMsb0JBQUksTUFBTSxPQUFOLENBQWMsWUFBZCxDQUFKLEVBQWlDOztBQUU3QixpQ0FBYSxPQUFiLENBQXFCLFVBQUMsV0FBRCxFQUFjLEtBQWQsRUFBd0I7O0FBRXpDLGdDQUFRLGdCQUFnQixhQUFhLEtBQWIsQ0FBeEI7QUFDSCxxQkFIRDtBQUlIO0FBRUosYUFYRDs7QUFhQSxtQkFBTyxLQUFQO0FBQ0g7OztpQ0FFUSxNLEVBQVEsSSxFQUFNLEssRUFBTztBQUMxQixnQkFBSSxJQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBUjtBQUNBLGdCQUFJLElBQUksTUFBUjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBRSxNQUFGLEdBQVcsQ0FBL0IsRUFBa0MsR0FBbEMsRUFBdUM7QUFDbkMsb0JBQUksSUFBSSxFQUFFLENBQUYsQ0FBUjtBQUNBLG9CQUFJLEtBQUssQ0FBVCxFQUFZO0FBQ1Isd0JBQUksRUFBRSxDQUFGLENBQUo7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsc0JBQUUsQ0FBRixJQUFPLEVBQVA7QUFDQSx3QkFBSSxFQUFFLENBQUYsQ0FBSjtBQUNIO0FBQ0o7QUFDRCxjQUFFLEVBQUUsRUFBRSxNQUFGLEdBQVcsQ0FBYixDQUFGLElBQXFCLEtBQXJCO0FBQ0g7Ozt5Q0FFZ0IsSSxFQUFNLE0sRUFBUTtBQUMzQixnQkFBSSxZQUFZLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBaEI7QUFDQSxnQkFBSSxVQUFVLE1BQWQ7QUFDQSxnQkFBSSxjQUFjLEVBQWxCO0FBQ0EsZ0JBQUksb0JBQUo7O0FBRUEsc0JBQVUsT0FBVixDQUFrQixVQUFDLFFBQUQsRUFBVyxLQUFYLEVBQXFCO0FBQ25DLG9CQUFJLGNBQWMsT0FBZCxDQUFzQixRQUF0QixDQUFKLEVBQXFDO0FBQ3JDLDhCQUFjLFFBQVEsUUFBUixDQUFkOztBQUVBLG9CQUFJLGNBQWMsT0FBZCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3BDLGtDQUFjLFdBQWQ7QUFDQTtBQUNIOztBQUVELDhCQUFjLFdBQWQ7QUFDQSwwQkFBVSxXQUFWO0FBQ0gsYUFYRDs7QUFhQSxtQkFBTyxXQUFQO0FBQ0g7O0FBSUQ7Ozs7Ozs7OzttQ0FNcUM7QUFBQSxnQkFBNUIsVUFBNEIsdUVBQWYsRUFBZTtBQUFBLGdCQUFYLElBQVcsdUVBQUosRUFBSTs7QUFDakMsZ0JBQUksWUFBWTtBQUNaLDBCQUFVLElBREU7QUFFWix3QkFBUTtBQUZJLGFBQWhCO0FBSUEsZ0JBQUksa0JBQWtCLEVBQXRCO0FBQ0EsZ0JBQUksT0FBTyxJQUFYOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxVQUFDLEdBQUQsRUFBUztBQUNsQixnQ0FBZ0IsR0FBaEIsSUFBdUIsRUFBdkI7QUFDQSwyQkFBVyxPQUFYLENBQW1CLFVBQUMsT0FBRCxFQUFVLEtBQVYsRUFBb0I7QUFDbkMsd0JBQUksWUFBWSxLQUFLLEdBQUwsQ0FBUyxnQkFBZ0IsR0FBaEIsQ0FBVCxFQUErQixRQUFRLEdBQVIsQ0FBL0IsQ0FBaEI7O0FBRUEsd0JBQUksU0FBSixFQUFlO0FBQ1gsa0NBQVUsTUFBVixDQUFpQixJQUFqQixDQUFzQjtBQUNsQixpQ0FBSyxHQURhO0FBRWxCLG1DQUFPLEtBRlc7QUFHbEIsbUNBQU8sUUFBUSxHQUFSO0FBSFcseUJBQXRCO0FBS0Esa0NBQVUsUUFBVixHQUFxQixLQUFyQjtBQUNILHFCQVBELE1BT087QUFDSCx3Q0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FBMEIsUUFBUSxHQUFSLENBQTFCO0FBQ0g7QUFDSixpQkFiRDtBQWNILGFBaEJEOztBQWtCQSxtQkFBTyxTQUFQO0FBQ0g7Ozs7OztBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xyXG5cdGxldCBjb25zdHJ1Y3RvckZuID0gY29uc3RydWN0b3I7XHJcblx0bGV0IGFyZ3MgPSBjb25zdHJ1Y3RvckZuLiRpbmplY3Q7XHJcblx0bGV0IGZhY3RvcnlGdW5jdGlvbiA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBcdHJldHVybiBuZXcgY29uc3RydWN0b3JGbiguLi5hcmdzKTtcclxuXHR9XHJcblx0XHJcblx0YXJncy5wdXNoKGZhY3RvcnlGdW5jdGlvbik7XHJcblxyXG5cdHJldHVybiBhcmdzO1xyXG59IiwiaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5sZXQgbXlUeXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3I7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRDb250cm9sbGVySGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xyXG4gICAgICAgIGxldCB7IGlucHV0RGF0YTogaW5wdXQgfSA9ICRzY29wZTtcclxuICAgICAgICBsZXQgY3VycmVudEV4cGVyaWVuY2VWYWx1ZSA9IGlWWGpzLmV4cGVyaWVuY2UuZGF0YVtpbnB1dC5uYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlucHV0VmFsdWUgPSBjdXJyZW50RXhwZXJpZW5jZVZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEV4cGVyaWVuY2VWYWx1ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXRWYWx1ZSA9IGN1cnJlbnRFeHBlcmllbmNlVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkJywgZnVuY3Rpb24gKGlucHV0LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIW15VHlwZVZhbGlkYXRvci5pc0VtcHR5KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09ICd0cnVlJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgeyBuYW1lLCBvbkNoYW5nZSA9IFtdIH0gPSBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZS51bnNoaWZ0KHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdzZXREYXRhJyxcclxuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaVZYanMubG9nLmRlYnVnKGBJbnB1dCAke2lucHV0Lm5hbWV9IE9uIENoYW5nZSBTdGFydGVkYCwge30sIHsgaW5wdXQsIHNvdXJjZTogJ29uQ2hhbmdlJywgc3RhdHVzOiAnc3RhcnRlZCcsIGFjdGlvbnM6IG9uQ2hhbmdlLCB0aW1lc3RhbXA6IERhdGUubm93KCkgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaVZYanNBY3Rpb25zLnJlc29sdmVBY3Rpb25zKG9uQ2hhbmdlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaVZYanMubG9nLmRlYnVnKGBJbnB1dCAke2lucHV0Lm5hbWV9IE9uIENoYW5nZSBFbmRlZGAsIHt9LCB7IGlucHV0LCBzb3VyY2U6ICdvbkNoYW5nZScsIHN0YXR1czogJ2NvbXBsZXRlZCcsIGFjdGlvbnM6IG9uQ2hhbmdlLCB0aW1lc3RhbXA6IERhdGUubm93KCkgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7T2JqZWN0UGFyc2Vyc30gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcblxyXG5sZXQgdGhpc09iamVjdFBhcnNlciA9IG5ldyBPYmplY3RQYXJzZXJzKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCwgZXJyb3JzLCBhdHRyaWJ1dGVzID0ge30pIHtcclxuICAgICAgICBsZXQge25hbWU6IGlucHV0TmFtZSwgdHlwZTogaW5wdXRUeXBlfSA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuaW5wdXROYW1lID0gaW5wdXROYW1lO1xyXG4gICAgICAgIHRoaXMuaW5wdXRUeXBlID0gaW5wdXRUeXBlO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRhZ3MoKSB7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFuZ3VsYXJFcnJvck1hcCA9IHRoaXMuYW5ndWxhckVycm9yTWFwO1xyXG4gICAgICAgIGxldCBub25Bbmd1bGFyID0gdGhpcy5ub25Bbmd1bGFyO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZSA9IHRoaXMubm9uVmFsaWRhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzT2JqZWN0UGFyc2VyLnJlZHVjZShhdHRyaWJ1dGVzLCAodGFncywgYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZUtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobm9uVmFsaWRhdGUuaW5kZXhPZihhdHRyaWJ1dGVLZXkpID49IDApIHJldHVybiB0YWdzO1xyXG4gICAgICAgICAgICBsZXQgdGFnID0gbm9uQW5ndWxhci5pbmRleE9mKGF0dHJpYnV0ZUtleSkgPj0gMCA/XHJcbiAgICAgICAgICAgICAgICBgJHthdHRyaWJ1dGVLZXl9PVwiJHthdHRyaWJ1dGVWYWx1ZX1cImAgOlxyXG4gICAgICAgICAgICAgICAgYG5nLSR7YW5ndWxhckVycm9yTWFwW2F0dHJpYnV0ZUtleV19ID0gXCIke2F0dHJpYnV0ZVZhbHVlfVwiIGA7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke3RhZ3N9ICR7dGFnfWA7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlcygpIHtcclxuICAgICAgICBsZXQge2lucHV0TmFtZSwgaW5wdXRUeXBlLCBlcnJvcnMsIGF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgYW5ndWxhckVycm9yTWFwID0gdGhpcy5hbmd1bGFyRXJyb3JNYXA7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRNZXNzYWdlcyA9IHRoaXMuZGVmYXVsdEVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGF0dHJpYnV0ZUtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBlcnJvcnMgJiYgZXJyb3JzW2F0dHJpYnV0ZUtleV0gPyBlcnJvcnNbYXR0cmlidXRlS2V5XSA6IGRlZmF1bHRNZXNzYWdlc1thdHRyaWJ1dGVLZXldO1xyXG4gICAgICAgICAgICBsZXQgYXR0ckhUTUwgPSBgbmctc2hvdz1cIigkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGRpcnR5IHx8ICRwYXJlbnQuZm9ybUlucHV0LiRzdWJtaXR0ZWQpICYmICRwYXJlbnQuZm9ybUlucHV0Wycke2lucHV0TmFtZX0nXS4kZXJyb3IuJHthbmd1bGFyRXJyb3JNYXBbYXR0cmlidXRlS2V5XX1cImA7XHJcblxyXG4gICAgICAgICAgICBpZihpbnB1dFR5cGUgPT09ICdyYWRpbycpe1xyXG4gICAgICAgICAgICAgICBhdHRySFRNTCA9IGBuZy1zaG93PVwiKCRwYXJlbnQuZm9ybUlucHV0LiRzdWJtaXR0ZWQpICYmICFyYWRpb1NlbGVjdGVkXCJgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGF0dHJIVE1MOiBhdHRySFRNTFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlucHV0VHlwZSAmJiBpbnB1dFR5cGUgIT09ICd0ZXh0JyAmJiBpbnB1dFR5cGUgIT0gXCJvcHRpb25zXCIpIHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlcy5wdXNoKHRoaXMuaW5wdXRUeXBlRXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0VHlwZUVycm9yKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXROYW1lLCBpbnB1dFR5cGUsIGVycm9yc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBlcnJvcnNbaW5wdXRUeXBlXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlID8gZXJyb3JNZXNzYWdlIDogXCJJbnZhbGlkIFwiICsgaW5wdXRUeXBlLFxyXG4gICAgICAgICAgICBhdHRySFRNTDogYG5nLXNob3c9XCIoJHBhcmVudC5mb3JtSW5wdXRbJyR7aW5wdXROYW1lfSddLiRkaXJ0eSB8fCAkcGFyZW50LmZvcm1JbnB1dC4kc3VibWl0dGVkKSAmJiAkcGFyZW50LmZvcm1JbnB1dFsnJHtpbnB1dE5hbWV9J10uJGVycm9yLiR7aW5wdXRUeXBlfVwiYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbm9uQW5ndWxhcigpIHtcclxuICAgICAgICByZXR1cm4gWydtaW4nLCAnbWF4JywgJ3JlYWRvbmx5JywgJ3BsYWNlaG9sZGVyJywgJ3N0ZXAnLCAncmVhZG9ubHknLCAnc3R5bGUnXVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBub25WYWxpZGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gWydzdGVwJywgJ3BsYWNlaG9sZGVyJywgJ3JlYWRvbmx5J107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuZ3VsYXJFcnJvck1hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6ICdtaW5sZW5ndGgnLFxyXG4gICAgICAgICAgICBtaW46IFwibWluXCIsXHJcbiAgICAgICAgICAgIG1heDogXCJtYXhcIixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogJ21heGxlbmd0aCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0RXJyb3JNZXNzYWdlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6ICdUb28gU2hvcnQnLFxyXG4gICAgICAgICAgICBtaW46IFwiVG9vIExvd1wiLFxyXG4gICAgICAgICAgICBtYXg6IFwiVG9vIEhpZ2hcIixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdSZXF1aXJlZCcsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogJ1RvbyBMb25nJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5MSUJSQVJZID0gXCJpVlhqc1wiO1xuICAgICAgICB0aGlzLkRFTElNRVRFUiA9IFwiOlwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuTElCUkFSWTtcbiAgICB9XG5cbiAgICBhZGROYW1lcyhuYW1lQ29sbGVjdGlvbil7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IG5hbWVzID0gT2JqZWN0LmtleXMobmFtZUNvbGxlY3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSwgaW5kZXgpID0+e1xuICAgICAgICAgICAgc2VsZltuYW1lXSA9IHNlbGYuY29udmVudGlvbihuYW1lQ29sbGVjdGlvbltuYW1lXSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImltcG9ydCBUcmFja0N1ZXNDb25zdGFudHMgZnJvbSBcIi4vdHJhY2tzLmN1ZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBUcmFja0N1ZXNDb25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICBPTl9FTlRFUjogXCJvbi1lbnRlclwiLFxuICAgICAgICAgICBPTl9FWElUOiBcIm9uLWV4aXRcIixcbiAgICAgICAgICAgT05fQ0hBUFRFUl9TVEFSVCA6IFwib24tY2hhcHRlci1zdGFydFwiLFxuICAgICAgICAgICBPTl9DSEFQVEVSX0VORCA6IFwib24tY2hwYXRlci1lbmRcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBUcmFja3NDb25zdGFudHMgZnJvbSBcIi4vdHJhY2tzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVHJhY2tzQ29uc3RhbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkNVRVMgPSBcImN1ZXNcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCkge1xuICAgICAgICBsZXQgeyBERUxJTUVURVIsIENVRVMgfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0NVRVN9YDtcbiAgICB9XG59IiwiaW1wb3J0IFRyYWNrQ29uc3RhbnRzIGZyb20gXCIuL3RyYWNrcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFRyYWNrQ29uc3RhbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICBPTl9UUkFDS19DSEFOR0UgOiBcIm9uLXRyYWNrLWNoYW5nZVwiLFxuICAgICAgICAgIENIQU5HRV9DVVJSRU5UX1RSQUNLIDogXCJjaGFuZ2UtY3VycmVudC10cmFja1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVFJBQ0tTID0gXCJ0cmFja3NcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCkge1xuICAgICAgICBsZXQgeyBERUxJTUVURVIsIFRSQUNLUyB9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7VFJBQ0tTfWA7XG4gICAgfVxufSIsImltcG9ydCBWaWRlb0NvbnN0YW50cyBmcm9tIFwiLi92aWRlby5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZGVvQ29uc3RhbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIEFERF9QTEFZSU5HX0NMQVNTOiAnYWRkLXBsYXlpbmctY2xhc3MnLFxuICAgICAgICAgICAgQlVGRkVSSU5HIDogXCJidWZmZXJpbmdcIixcbiAgICAgICAgICAgIENBTl9QTEFZOiBcImNhbi1wbGF5XCIsXG4gICAgICAgICAgICBESVNQT1NFIDogXCJkaXNwb3NlXCIsXG4gICAgICAgICAgICBFTkRFRCA6IFwiZW5kZWRcIixcbiAgICAgICAgICAgIEdFVF9EVVJBVElPTjogXCJnZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIE1VVEU6IFwibXV0ZVwiLFxuICAgICAgICAgICAgUEFVU0U6IFwicGF1c2VcIixcbiAgICAgICAgICAgIFBBVVNFRDogXCJwYXVzZWRcIixcbiAgICAgICAgICAgIFBMQVk6IFwicGxheVwiLFxuICAgICAgICAgICAgUExBWUlORzogXCJwbGF5aW5nXCIsXG4gICAgICAgICAgICBSRUFEWV9QTEFZRVIgOiBcInJlYWR5LXBsYXllclwiLFxuICAgICAgICAgICAgU0VFSzogXCJzZWVrXCIsXG4gICAgICAgICAgICBTRVRfRFVSQVRJT046IFwic2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBTRVRfVk9MVU1FOiBcInNldC12b2x1bWVcIixcbiAgICAgICAgICAgIFRJTUVfVVBEQVRFOiBcInRpbWUtdXBkYXRlXCIsXG4gICAgICAgICAgICBVTk1VVEU6IFwidW5tdXRlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLlZJREVPID0gXCJ2aWRlb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIFZJREVPfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtWSURFT31gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XG5cbmxldCB0eXBlQ2hlY2sgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIHtcbiAgICBjb25zdHJ1Y3RvcihhbmNob3JJbmZvKSB7ICAgXG4gICAgICAgdGhpcy5hbmNob3JJbmZvID0gYW5jaG9ySW5mbztcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGdldCBhbmNob3JDbGFzc2VzKCl7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7YW5jaG9yQ2xhc3Nlc30gPSB0aGlzO1xuICAgICAgICBsZXQge2hyZWYgPSAnJywgY2xhc3NlcyA9ICcnLCBhdHRyaWJ1dGVzID0ge30sIGxhYmVsID0gbGFiZWxIVE1MLCBsYWJlbEhUTUwsIGlkPScnfSA9IHRoaXMuYW5jaG9ySW5mbzsgXG4gICAgICAgIGxldCBhdHRyaWJ1dGVIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoYXR0cmlidXRlcywgT2JqZWN0LmtleXMoYXR0cmlidXRlcykpLmh0bWw7XG5cbiAgICAgICAgaWYoIWxhYmVsSFRNTCAmJiAhbGFiZWwpe1xuICAgICAgICAgICAgbGFiZWwgPSBocmVmO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgPGEgaWQ9JyR7aWR9JyBjbGFzcz1cIiR7Y2xhc3Nlc30gJHthbmNob3JDbGFzc2VzfVwiICBocmVmPVwiJHtocmVmfVwiICR7YXR0cmlidXRlSFRNTH0gPiR7bGFiZWxIVE1MID8gbGFiZWxIVE1MIDogbGFiZWx9PC9hPiAgICAgICAgICAgXG4gICAgICAgIGBcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL2Fzc2VydHMuanMnO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcbmxldCB0eXBlQ2hlY2sgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcnMgYSBjb2xsZWN0aW9uIG9mIGJ1dHRvbnMgZm9yIG9uZSBjbGljayByZWNvcmRpbmcgb2YgXHJcbiAqIGFuIGlucHV0IHRoYXQgaGFzIG11bHRpcGxlIG9wdGlvbnMgZm9yIGRhdGEgcmVjb3JkaW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbnMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZXMgdGhlIHNldHRpbmdzIGZvciB0aGUgYnV0dG9ucywgYSBjbGFzcyB0aGF0IHJlbmRlcnMgdGhlIFxyXG4gICAgICogZXJyb3IgbWVzc2FnZXMgYW5kIGEgY2xhc3MgdGhhdCByZW5kZXJzIGF0dHJpYnV0ZXMuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9uc0luZm8gLSBJbmZvcm1hdGlvbiB0byBjcmVhdGUgdGhpcyBidXR0b24gaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBidXR0b25zSW5mby5idXR0b25zIC0gZWFjaCBpbmRpdmlkdWFsIGJ1dHRvbiBkYXRhIGFuZCBzZXR0aW5ncy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mby5zZXR0aW5ncyAtIHNldHRpbmdzIGZvciBhbGwgYnV0dG9ucyBcclxuICAgICAqIEBwYXJhbSB7Q2xhc3N9IGJ1dHRvbnNJbmZvLmVycm9ycyAtIGFuIGVycm9yIGNsYXNzIHRoYXQgd2FzIGNyZWF0ZWQgYnkgdGhlIFxyXG4gICAgICogcmVuZGVyaW5nIGxpYnJhcnkgc28gdGhlIGVycm9ycyBvcGVuIGFuZCBkaXNwbGF5IGFsb25nc2lkZSB0aGUgbGlicmFyeS4gXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbnMgPSBbXSwgaW5wdXQsIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJ1dHRvbnMgdG8gYmUgcmVuZGVyZWRcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIGluIHRoaXMgZ3JvdXAgXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVycm9yIG1lc3NhZ2UgY2xhc3MgdGhhdCB3aWxsIHRha2UgdGhlIGVycm9ycyBmcm9tIFxyXG4gICAgICAgICAqIHRoZSByZW5kZXJpbmcgbGlicmFyeSBhbmQgYWRkcyB0aGVtIHRvIHRoaXMgaW5wdXQgXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYXR0cmlidXRlIHRhZ3MgaHRtbCB0byBiZSBhZGRlZCB0byB0aGlzIGJ1dHRvbiBcclxuICAgICAgICAgKiBpbnB1dHMuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZXRzIHVzZXJzIGFkZCB0aGUgc2FtZSBjbGFzc2VzIHRvIGFsbCBidXR0b25zIGp1c3QgaW4gXHJcbiAgICAgKiBjYXNlIGJ1dHRvbnMgc2hhcmUgYSBzcGVjaWZpYyBjbGFzcy5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGJ1dHRvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgSFRNTCBmb3IgZXZlcnkgYnV0dG9ucyBkZWZpbmVkIGluIHRoZSBidXR0b25zIGFycmF5IGFuZCBcclxuICAgICAqIGF0dGFjaGVzIHRoZSBlcnJvciBtZXNzYWdlcyBhdHRhY2hlZCB0byB0aGlzIGlucHV0LiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGJ1dHRvbkNsYXNzZXMgPSAnYnV0dG9uLWNsYXNzJztcclxuICAgICAqIGJ1dHRvbnMgPSBbe1xyXG4gICAgICogICAgbGFiZWwgOiBcIkJ1dHRvbiAxXCIsXHJcbiAgICAgKiAgICBhdHRySFRNTCA6IFwiZGlzYWJsZWRcIixcclxuICAgICAqICAgIGNsYXNzZXMgOiBcImNsYXNzLTFcIlxyXG4gICAgICogfSx7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiPGgxPkJ1dHRvbiAyPC9oMT5cIixcclxuICAgICAqICAgIGNsYXNzZXMgXCIgY2xhc3MtMlwiXHJcbiAgICAgKiB9XTtcclxuICAgICAqIFxyXG4gICAgICogLy8gV2lsbCByZW5kZXI6XHJcbiAgICAgKiBcclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24tY2xhc3MgY2xhc3MtMVwiIGRpc2FibGVkPkJ1dHRvbiAxPC9idXR0b24+XHJcbiAgICAgKiA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGNsYXNzIGNsYXNzLTJcIj48aDE+QnV0dG9uIDI8L2gxPjwvYnV0dG9uPlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yczogZXJyb3JDbGFzcyA9IHt9LCBidXR0b25zID0gW10sIGlucHV0ID0ge30sIGJ1dHRvbkNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgeyBhdHRyaWJ1dGVzID0ge30sIGVycm9ycyA9IHt9LCBtZXNzYWdlcyA9IHt9IH0gPSBlcnJvckNsYXNzO1xyXG4gICAgICAgIGxldCBidXR0b25FcnJvck1lc3NhZ2VzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtlcnJvcnNba2V5XX1gLFxyXG4gICAgICAgICAgICAgICAgYXR0ckhUTUw6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcyA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoYnV0dG9uRXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCA9ICcnLCBzaG93TGFiZWwgPSBmYWxzZSwgaWR9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IGJ1dHRvbnNIVE1MID0gYnV0dG9ucy5yZWR1Y2UoKGh0bWwsIGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHsgbGFiZWwsIGF0dHJIVE1MID0gJycsIGNsYXNzZXMgPSBcIlwiIH0gPSBidXR0b247XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aHRtbH0gXHJcbiAgICAgICAgICAgICAgICAgICA8YnV0dG9uICR7YXR0ckhUTUx9IGNsYXNzPVwiJHtjbGFzc2VzfSAke2J1dHRvbkNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgfSwgJycpO1xyXG5cclxuICAgICAgICBpZiAoKGxhYmVsSFRNTC5sZW5ndGggPiAwIHx8IGxhYmVsLmxlbmd0aCA+IDApICYmIHNob3dMYWJlbCkge1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbDtcclxuICAgICAgICAgICAgbGFiZWxIVE1MID0gYDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWxIVE1MfTwvbGFiZWw+YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICR7bGFiZWxIVE1MfVxyXG4gICAgICAgICAgICAgJHtidXR0b25zSFRNTH1cclxuICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlc30gICAgICAgICAgICAgXHJcbiAgICAgICAgYDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBQcm9kdWNlcyBodG1sIHRvIGJ1aWxkIGEgY2hlY2tib3ggaW5wdXQgZm9yIHRoZSAgXHJcbiAqIHZhcmlvdXMgcmVuZGVyaW5nIGxpYnJhcmllcy4gXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3gge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgY2hlY2tib3gncyBzZXR0aW5ncyBmcm9tIGEgc3RhbmRhcmQgaW5wdXQgZGF0YSBcclxuICAgICAqIG9iamVjdCBhbmQgc2V0cyB0aGUgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyB0aGlzIGNsYXNzIFxyXG4gICAgICogd2lsbCByZW5kZXIgaWYgdGhlIGNoZWNrYm94IGlzbid0IHZhbGlkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRPYmogLSBjb250YWlucyBhbGwgdGhlIGNvbmZpZ3VyYXRpb25zIFxyXG4gICAgICogdG8gcmVuZGVyIHRoaXMgaW5wdXQuXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBlcnJvck1lc3NhZ2VzIC0gYSBjbGFzcyB0aGF0IHdpbGwgcmVuZGVyIHRoZSBcclxuICAgICAqIHNwZWNpZmljIHR5cGUgb2YgZXJyb3IgbWVzc2FnZXMgYmFzZWQgb24gdGhpcyBVSSdzIHNldHRpbmdzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHRhZ3MgPSAnJywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgY2hlY2tib3gncyBpbnB1dCBjb25maWd1cmF0aW9uIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbnkgY3VzdG9tIHRhZ3MgcGFzc2VkIGRvd24gZnJvbSB0aGUgcmVuZGVyaW5nIGxpYnJhcnkuIFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgd2hvbGUgaW5wdXQgaW5jbHVkaW5nIHRoZSBjb250YWluZXJcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBjbGFzcyBvZiBlcnJvcnMgY3JlYXRlZCBieSB0aGUgcmVuZGVyaW5nIGxpYnJhcnkgdG8gXHJcbiAgICAgICAgICogaGlkZSBhbmQgc2hvdyB2YXJpb3VzIGVycm9ycy5cclxuICAgICAgICAgKiBAdHlwZSB7Y2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgVUkncyByZW5kZXJpbmcgb2YgdGhpcyBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7Y2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkZWZhdWx0IGNsYXNzIHRvIHRoaXMgY2hlY2tib3ggaW5wdXQgXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW55IFVJIHNwZWNpZmljIGF0dHJpYnV0ZXNcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRyaWJ1dGVzIHRoYXQgcmVxdWlyZWQgZm9yIHRoaXMgY2hlY2tib3ggaW5wdXQgXHJcbiAgICAgKiB0byBiZSB1c2VkIGFuZCByZW5kZXJlZCBwcm9wZXJseS5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBBIHN0cmluZyBvZiBhbGwgYXR0cmlidXRlcyB0byBsb2FkIFxyXG4gICAgICogdGhpcyBpbnB1dCBpbmNsdWRpbmcgaXRzIGlkLCBuYW1lIGFuZCB0eXBlLlxyXG4gICAgICovXHJcbiAgICBnZXQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXR9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lfSA9IGlucHV0O1xyXG5cclxuICAgICAgICByZXR1cm4gYGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiIHR5cGU9XCJjaGVja2JveFwiYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgZm9yIHRoaXMgY2hlY2tib3ggZnJvbSB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBcclxuICAgICAqIGFuZCBjbGFzc2VzLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHVpQ2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogaW5wdXQuY2xhc3NlcyA9IFwiY2xhc3MtMlwiO1xyXG4gICAgICogcmVxdWlyZWRBdHRyaWJ1dGVzID0gXCJpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnXCJcclxuICAgICAqIC8vIFJlbmRlcnMgVG86XHJcbiAgICAgKiA8bGFiZWwgY2xhc3M9XCJjbGFzcy0xIGNsYXNzLTJcIj5cclxuICAgICAqICAgICA8aW5wdXQgaWQ9J2lkLTEnIG5hbWU9J2NoZWNrYm94LW5hbWUnIHR5cGU9J2NoZWNrYm94Jz5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IC0gaHRtbCBvZiB0aGUgZnVsbHkgY3JlYXRlZCBjaGVja2JveFxyXG4gICAgICovXHJcbiAgICByZW5kZXJDaGVja2JveENvbnRhaW5lcihjbGFzc2VzLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3N9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7c2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiIGNsYXNzPVwiJHtjbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICA8aW5wdXQgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCBhbmQgcmVuZGVycyBhbGwgdGhlIEhUTUwgZm9yIHRoaXMgY2hlY2tib3ggYmFzZWQgb24gdGhlIHNldHRpbmdzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIHNldHRpbmdzID0ge30sIGVycm9ycywgaW5wdXQsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzLCByZXF1aXJlZEF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQgeyBpZCwgbmFtZSwgbGFiZWwgPSAnJyB9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgbWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlcyA9IHt9LCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSB0aGlzLmVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JBdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhtZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgYWxsQ2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgbGV0IGFsbEF0dHJpYnV0ZXMgPSBgJHtyZXF1aXJlZEF0dHJpYnV0ZXN9ICR7dWlBdHRyaWJ1dGVzfSAke3RhZ3N9ICR7ZXJyb3JUYWdzfWBcclxuICAgICAgICBsZXQgY2hlY2tib3hIVE1MID0gdGhpcy5yZW5kZXJDaGVja2JveENvbnRhaW5lcihhbGxDbGFzc2VzLCBhbGxBdHRyaWJ1dGVzKTtcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgJHtjaGVja2JveEhUTUx9XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTdHlsZX0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQge0F0dHJpYnV0ZVRhZ3N9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGRhdGUgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBkYXRlIHNwZWNpZmljIGRhdGEgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBkYXRlIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWwgaW5wdXQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIGRhdGUgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBkYXRlIGlucHV0cyBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhIGRhdGUgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIC8vRGF0YSBcclxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgICogRGF0ZS51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZGF0ZVwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7ICAgICAgICBcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwiZGF0ZVwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZXRpbWUgbG9jYWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBkYXRlIHdpdGggdGltZXN0YW1wIHNwZWNpZmljIGRhdGEgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRldGltZUxvY2FsIHtcclxuXHJcbiAgICAvKipcclxuICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICogbWVzc2FnZXNcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBib3hcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlc1xyXG4gICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBkYXRldGltZS1sb2NhbCBpbnB1dHMgXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gYGBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gYGBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAqIFxyXG4gICAgKiBAZXhhbXBsZSBcclxuICAgICogLy9EYXRhIFxyXG4gICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAqIERhdGV0aW1lTG9jYWwudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAqIDxsYWJlbD5cclxuICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgKiA8L2xhYmVsPlxyXG4gICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCwgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVtYWlsIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgZW1haWxzICBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVtYWlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBlbWFpbCBpbnB1dCBib3hcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGVtYWlsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYW4gZW1haWwgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIC8vRGF0YSBcclxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgICogRW1haWwudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImVtYWlsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwiZW1haWxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTdHlsZX0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGZvcm0gd3JhcHBlciBhcm91bmQgdGhlc2UgaW5wdXRzIGFuZCBhIFxyXG4gKiBzdWJtaXQgYnV0dG9uIHRvIHN1Ym1pdCB0aGUgZm9ybS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgdGhlIHZhcmlvdXMgZGF0YSB0byByZW5kZXIgdGhpcyBmb3JtLlxyXG4gICAgICogQHBhcmFtIHthcnJheX0gaW5wdXRIVE1MIC0gQWxsIGlucHV0IGRhdGEgdG8gYmUgYWRkZWQgdG8gdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoaXMgZm9ybSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsQXR0ckhUTUwgLSBBdHRyaWJ1dGVzIHRoYXQgbmVlZCB0byBiZSBcclxuICAgICAqIGFkZGVkIHRvIHRoZSBmb3JtIHByaW1hcmlseSB1c2VkIGZvciB2YWxpZGF0aW9uIGFuZCBzdWJtaXQgZnVuY3Rpb25zLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNldHRpbmdzIC0gR2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGZvcm0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncywgc3R5bGUgPSBTdHlsZSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgaW5wdXQgaHRtbCBpbmZvcm1hdGlvbiBmb3IgdGhpcyBcclxuICAgICAgICAgKiBmb3JtXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0SFRNTCA9IGlucHV0SFRNTDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFtZSBmb3IgdGhpcyBmb3JtIFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkaXRpb25hbCB0YWdzIHRvIGFkZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFkZGl0aW9uYWxBdHRySFRNTCA9IGFkZGl0aW9uYWxBdHRySFRNTDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgZW50aXJlIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciB0aGlzIHN1Ym1pdCBidXR0b24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN1Ym1pdCA9IHNldHRpbmdzLnN1Ym1pdDtcclxuICAgICAgICB0aGlzLnN0eWxlID0gbmV3IHN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgZGVmYXVsdCBVSSBjbGFzc2VzIHRvIGFkZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgZm9ybUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdyb3cnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIHRvIHJlbmRlciB0aGUgXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogRm9ybS5zZXR0aW5ncyA9IHtcclxuICAgICAqICAgICBzdWJtaXQgOiB7XHJcbiAgICAgKiAgICAgICAgIGxhYmVsIDogXCJNeSBuZXcgc3VibWl0IGxhYmVsXCIsXHJcbiAgICAgKiAgICAgICAgIGlucHV0IDoge1xyXG4gICAgICogICAgICAgICAgICBjbGFzc2VzIDogXCJteS1zdWJtaXQtaW5wdXRcIlxyXG4gICAgICogICAgICAgICB9LFxyXG4gICAgICogICAgICAgICBjb250YWluZXIgOiB7XHJcbiAgICAgKiAgICAgICAgICAgICBjbGFzc2VzIDogXCJteS1zdWJtaXQtY29udGFpbmVyXCJcclxuICAgICAqICAgICAgICAgfVxyXG4gICAgICogICAgIH1cclxuICAgICAqIH07XHJcbiAgICAgKiBcclxuICAgICAqIC8vV2lsbCBSZW5kZXIgXHJcbiAgICAgKiBcclxuICAgICAqIDxkaXYgY2xhc3M9XCJpdnhqcy1ncmlkLTEtMSBteS1zdWJtaXQtY29udGFpbmVyXCI+XHJcbiAgICAgKiAgICAgPGJ1dHRvbiBjbGFzcz1cIm15LXN1Ym1pdC1pbnB1dFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAqICAgICAgICAgIE15IG5ldyBzdWJtaXQgbGFiZWwgXHJcbiAgICAgKiAgICAgPC9idXR0b24+XHJcbiAgICAgKiA8L2Rpdj5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHN1Ym1pdEJ1dHRvbkhUTUwoKSB7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWw6IHN1Ym1pdExhYmVsID0gXCJTdWJtaXRcIiwgbGFiZWxIVE1MOiBzdWJtaXRMYWJlbEhUTUwsIGlucHV0OiBzdWJtaXRJbnB1dCA9IHt9LCBjb250YWluZXI6IHN1Ym1pdENvbnRhaW5lciA9IHt9LCBhdHRyaWJ1dGVzID0gJyd9ID0gc3VibWl0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0SW5wdXRDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRJbnB1dDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdENvbnRhaW5lckNsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdENvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgc3VibWl0TGFiZWwgPSBzdWJtaXRMYWJlbEhUTUwgPyBzdWJtaXRMYWJlbEhUTUwgOiBzdWJtaXRMYWJlbDtcclxuXHJcbiAgICAgICAgbGV0IHN1Ym1pdEhUTUwgPSBzdWJtaXRMYWJlbC5sZW5ndGggPj0gMCA/XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIiR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCcgJHthdHRyaWJ1dGVzfT5cclxuICAgICAgICAgICAgICAgICAgICAke3N1Ym1pdExhYmVsfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBzIGVhY2ggaW5wdXQncyBodG1sIGludG8gYSBjb250YWluZXIgc28gdGhleSBjYW4gYmUgZm9ybWF0dGVkIGNvcnJlY3RseVxyXG4gICAgICogdXRpbGl6aW5nIHRoZSBpdnhqcy5jc3MncyBncmlkIHN5c3RlbS5cclxuICAgICAqIEB0eXBle1N0cmluZ30gXHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBmb3JtQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge30sIGNsYXNzZXM6IGNvbmZpZ0Zvcm1DbGFzc2VzID0gJycsIGlkIDogZm9ybUlkLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGlmKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoIXNldHRpbmdzLmhpZGVTdWJtaXQpIHtcclxuICAgICAgICAgICAgaW5wdXRIVE1MLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHN1Ym1pdCxcclxuICAgICAgICAgICAgICAgIGh0bWw6IHRoaXMuc3VibWl0QnV0dG9uSFRNTFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IHRoaXMuc3R5bGUuYWRkV2lkdGhDbGFzc2VzKGlucHV0SFRNTCk7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgIDxmb3JtIGlkPVwiJHtmb3JtSWR9LWZvcm1cIiBjbGFzcz1cIiR7Zm9ybUNsYXNzZXN9ICR7Y29uZmlnRm9ybUNsYXNzZXN9XCIgbm92YWxpZGF0ZSBuYW1lPVwiJHtuYW1lfVwiICR7YWRkaXRpb25hbEF0dHJIVE1MfT4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAke2NvbnRlbnRzfVxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBJbmRpY2F0ZXMgZXJyb3JzIGZvciBlYWNoIGlucHV0IGJhc2VkIG9uIHRoZSBcclxuICogYXR0cmlidXRlcyBjcmVhdGVkIGZyb20gdGhlIHZhcmlvdXMgcmVuZGVyaW5nIGxpYnJhcmllc1xyXG4gKiBpVlhqcyB1c2VzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyaW5ncyBpbiBhbGwgdGhlIHBvc3NpYmxlIGVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICogdGhpcyBpbnB1dCBjYW4gcHJvZHVjZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXJyb3JNZXNzYWdlcyAtIGxpc3Qgb2YgYWxsIHBvc3NpYmxlIFxyXG4gICAgICogZXJyb3IgbWVzc2FnZXMgd2l0aCBhdHRyaWJ1dGVzIGluZGljYXRpbmcgdGhlIG1lc3NhZ2UgXHJcbiAgICAgKiBhbmQgdGhlIGNvbmRpdGlvbnMgaW4gd2hpY2ggdG8gc2hvdyB0aGVtLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvck1lc3NhZ2VzID0gW10pIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlzdCBvZiBhbGwgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2xhc3NlcyBmb3IgdGhlIGVycm9yIG1lc3NhZ2UgZGl2LlxyXG4gICAgICogQHR5cGUge1N0cmluZ30gXHJcbiAgICAgKi9cclxuICAgIGdldCBtZXNzYWdlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Vycm9yLW1lc3NhZ2UnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBjbGFzc2VzIGZvciB0aGUgY29udGFpbmVyIG9mIGFsbCBlcnJvciBtZXNzYWdlcy5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb250YWluZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZXMnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgYWxsIGVycm9yIG1lc3NhZ2VzIGFuZCB0aGUgY29udGFpbmVyIHdpdGggXHJcbiAgICAgKiB0aGVtLiBSZXN1bHRzOlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlc1wiPlxyXG4gICAgICogICAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+TUVTU0FHRTwvc3Bhbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvck1lc3NhZ2VzLCBtZXNzYWdlQ2xhc3NlcywgY29udGFpbmVyQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VIVE1MID0gZXJyb3JNZXNzYWdlcy5yZWR1Y2UoKGVycm9yTWVzc2FnZUhUTUwsIGVycm9yTWVzc2FnZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2Vycm9yTWVzc2FnZUhUTUx9PHNwYW4gY2xhc3M9XCIke21lc3NhZ2VDbGFzc2VzfVwiICR7ZXJyb3JNZXNzYWdlLmF0dHJIVE1MfT5cclxuICAgICAgICAgICAgICAgICAgICAke2Vycm9yTWVzc2FnZS5tZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPmBcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChlcnJvck1lc3NhZ2VIVE1MLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPScke2NvbnRhaW5lckNsYXNzZXN9Jz5cclxuICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlSFRNTH1cclxuICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQge0F0dHJpYnV0ZVRhZ3N9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBudW1iZXIgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBudW1iZXJzICBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE51bWJlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgICogbWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIHRoaXMgbnVtYmVyIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBudW1iZXIgaW5wdXRcclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEhvbGRzIGFsbCB2YWxpZGF0aW9uIGVycm9yIGNvcnJlY3RpbmcuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgbnVtYmVyIGlucHV0cyBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhIG51bWJlciBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBOdW1iZXIudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAgKiBpbnB1dC5hdHRyaWJ1dGVzID0ge1xyXG4gICAgICogICAgIFwic3RlcFwiIDogXCIwLjFcIlxyXG4gICAgICogfVxyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgc3RlcD1cIjAuMVwiIGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwibnVtYmVyXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbmFtZSA9ICcnLCBpZCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJudW1iZXJcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBkZWZhdWx0RGlzcGxheSA9ICcnLCBzZXR0aW5ncyA9IHt9LCB0YWdzID0gJycsIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmRlZmF1bHREaXNwbGF5ID0gZGVmYXVsdERpc3BsYXk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHt0YWdzLCBpbnB1dCwgZGVmYXVsdERpc3BsYXksIGVycm9ycywgc2V0dGluZ3MsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZCwgbmFtZSwgb3B0aW9ucywgbGFiZWwgPSAnJywgbGFiZWxIVE1MfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uVGFnID0gYDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYW4gb3B0aW9uLi4uPC9vcHRpb24+YDtcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yQXR0cmlidXRlcy5yZXF1aXJlZCB8fCAoZGVmYXVsdERpc3BsYXkgJiYgZGVmYXVsdERpc3BsYXkubGVuZ3RoID49IDApKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWcgPSBkZWZhdWx0RGlzcGxheSA/XHJcbiAgICAgICAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7ZGVmYXVsdERpc3BsYXl9PC9vcHRpb24+YCA6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zSFRNTCA9IG9wdGlvbnMucmVkdWNlKChvcHRpb25IVE1MLCBvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke29wdGlvbkhUTUx9XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIke29wdGlvbi52YWx1ZX1cIj4ke29wdGlvbi5kaXNwbGF5fTwvb3B0aW9uPmBcclxuICAgICAgICB9LCAnJylcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4ke2xhYmVsfTwvbGFiZWw+ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgICAgJHtvcHRpb25zSFRNTH1cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFkaW8ge1xyXG4gICAgY29uc3RydWN0b3IocmFkaW9JbnB1dE9iaiwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQgeyBpbnB1dCA9IHt9LCByYWRpb3MgPSBbXSwgZXJyb3JzID0ge30sIHNldHRpbmdzID0ge30gfSA9IHJhZGlvSW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaW9zID0gcmFkaW9zO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9Hcm91cChyYWRpb3NIVE1MKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlvc0hUTUw7XHJcbiAgICB9O1xyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMsIHZhbHVlID0gXCJcIikge1xyXG4gICAgICAgIGxldCB7IGlkIH0gPSB0aGlzLmlucHV0O1xyXG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtpZH0ke3ZhbHVlLmxlbmd0aCA+IDAgPyAnLScgKyB2YWx1ZSA6ICcnfWA7IFxyXG5cclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtjdXJyZW50SWR9XCIgY2xhc3M9XCIke3VpQ2xhc3Nlc31cIj5cclxuICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICA8L2xhYmVsPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgeyBpZCB9ID0gdGhpcy5pbnB1dDtcclxuICAgICAgICBsZXQgY3VycmVudElkID0gYCR7aWR9JHt2YWx1ZS5sZW5ndGggPiAwID8gJy0nICsgdmFsdWUgOiAnJ31gO1xyXG5cclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiJHtjdXJyZW50SWR9XCIgJHthdHRySFRNTH0+XHJcbiAgICAgICAgICAgICR7bGFiZWx9YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7IGVycm9ycywgcmFkaW9zLCBzZXR0aW5ncywgaW5wdXQsIHVpQ2xhc3NlcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgeyBtZXNzYWdlczogZXJyb3JNZXNzYWdlcywgdGFnczogZXJyb3JUYWdzID0gXCJcIiB9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgeyBsYWJlbDogaW5wdXRMYWJlbCwgbGFiZWxIVE1MOiBpbnB1dExhYmxlSFRNTCB9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHsgc2hvd0xhYmVsID0gdHJ1ZSB9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dExhYmxlSFRNTCkgaW5wdXRMYWJlbCA9IGlucHV0TGFibGVIVE1MO1xyXG5cclxuICAgICAgICBsZXQgcmFkaW9zSFRNTCA9IHJhZGlvcy5yZWR1Y2UoKGh0bWwsIHJhZGlvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9ICcnLCB2YWx1ZSB9ID0gcmFkaW87XHJcblxyXG4gICAgICAgICAgICBhdHRySFRNTCA9IGAke2F0dHJIVE1MfSAke2Vycm9yVGFnc31gO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhZGlvSFRNTCA9IHNlbGYucmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCwgaW5wdXQucmFkaW9CdXR0b25zW2luZGV4XS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aHRtbH1cclxuICAgICAgICAgICAgJHtzZWxmLnVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCBgJHt1aUNsYXNzZXN9ICR7Y2xhc3Nlc31gLCBpbnB1dC5yYWRpb0J1dHRvbnNbaW5kZXhdLnZhbHVlKX1gO1xyXG4gICAgICAgIH0sIGlucHV0TGFiZWwpO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IGFsbFJhZGlvQnV0dG9uc0hUTUwgPSBgXHJcbiAgICAgICAgICAgICAke3JhZGlvc0hUTUx9XHJcbiAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy51aVJhZGlvR3JvdXAoYWxsUmFkaW9CdXR0b25zSFRNTCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU2VjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZm9ybVNlY3Rpb24gPSBmb3JtU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVmYXVsdEZvb3RlckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtmb3JtU2VjdGlvbiwgZGF0YSwgZGVmYXVsdEZvb3RlckNsYXNzZXMsIGRlZmF1bHRIZWFkZXJDbGFzc2VzLCBkZWZhdWx0U2VjdGlvbkNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9fSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgYH0gPSBoZWFkZXI7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlczogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIiR7c2VjdGlvbkNsYXNzZXN9ICR7ZGVmYXVsdFNlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7ZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgJHtmb3JtU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9ICR7ZGVmYXVsdEZvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tICcuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxpbmtTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGlua1NlY3Rpb24gPSBsaW5rU2VjdGlvblxuICAgIH1cblxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7ZGF0YSwgbGlua1NlY3Rpb24sIGRlZmF1bHRGb290ZXJDbGFzc2VzLCBkZWZhdWx0SGVhZGVyQ2xhc3NlcywgZGVmYXVsdFNlY3Rpb25DbGFzc2VzLCBkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fSwgbGlua0NvbnRhaW5lciA9IHt9fSA9IGRhdGE7XG4gICAgICAgIGxldCB7Y2xhc3NlczogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYGB9ID0gaGVhZGVyO1xuICAgICAgICBsZXQge2NsYXNzZXM6IHNlY3Rpb25DbGFzc2VzID0gJyd9ID0gc2VjdGlvbjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWw6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XG4gICAgICAgIGxldCB7Y2xhc3NlczogbGlua0NvbnRhaW5lckNsYXNzZXMgPSAnJywgYXR0cmlidXRlczogbGlua0NvbnRhaW5lckF0dHJpYnV0ZXMgPSB7fX0gPSBsaW5rQ29udGFpbmVyO1xuICAgICAgICBsZXQgbGlua0NvbnRhaW5lckF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhsaW5rQ29udGFpbmVyQXR0cmlidXRlcywgT2JqZWN0LmtleXMobGlua0NvbnRhaW5lckF0dHJpYnV0ZXMpKS5odG1sO1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIiR7c2VjdGlvbkNsYXNzZXN9ICR7ZGVmYXVsdFNlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxuICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke2RlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nJHtkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXN9ICR7bGlua0NvbnRhaW5lckNsYXNzZXN9JyAke2xpbmtDb250YWluZXJBdHRyaWJ1dGVIVE1MfT5cbiAgICAgICAgICAgICAgICAgICAgJHtsaW5rU2VjdGlvbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfSAke2RlZmF1bHRGb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgU3R5bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIGdldFdpZHRoKHdpZHRoKSB7XHJcbiAgICAgICAgaWYgKHdpZHRoID09PSAnMScpIHJldHVybiAnaXZ4anMtZ3JpZC0xLTEnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBncmlkU3RyaW5nID0gd2lkdGgucmVwbGFjZSgnLycsICctJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBgaXZ4anMtZ3JpZC0ke2dyaWRTdHJpbmd9YDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2lucHV0LWNvbnRhaW5lcic7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2lkdGhDbGFzc2VzKGlucHV0c0hUTUwpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjb250YWluZXJDbGFzc2VzID0gJyd9ID0gdGhpcztcclxuICAgICAgICBsZXQgY29udGVudHMgPSBpbnB1dHNIVE1MLnJlZHVjZSgoY3VycmVudEhUTUwsIGlucHV0SFRNTCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2h0bWwsIHNldHRpbmdzID0ge319ID0gaW5wdXRIVE1MO1xyXG4gICAgICAgICAgICBsZXQge3dpZHRoID0gJzEnLCBjb250YWluZXI9e319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCB7Y2xhc3Nlcz0nJ30gPSBjb250YWluZXI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHtjb250YWluZXJDbGFzc2VzfWBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0aGlzV2lkdGggPSBzZWxmLmdldFdpZHRoKHdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoXCJpdnhqcy1ncmlkLTEtMVwiLCBgJHt0aGlzV2lkdGh9ICR7Y2xhc3Nlc31gKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50SFRNTH0gJHtodG1sfWA7XHJcbiAgICAgICAgfSwgJycpXHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInRleHRcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dGFyZWEge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxhYmVsID0gc2hvd0xhYmVsID8gbGFiZWwgOiAnJztcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCIke2NsYXNzZXN9ICR7dWlDbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAke3VpQXR0cmlidXRlc30gICAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgIDwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LHNldHRpbmdzID0ge30sdGFncyA9IHt9LGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKXtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDppbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQge21lc3NhZ2VzIDogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzIDogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3MgOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBpZihsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31cIiAke3VpQXR0cmlidXRlc30gIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidXJsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbnRyb2xzIH0gZnJvbSAnLi4vLi4vdmlkZW8vY29udHJvbHMvaW5kZXguanMnO1xyXG5pbXBvcnQgRWxlbWVudFV0aWxpdGllcyBmcm9tIFwiLi4vdXRpbGl0aWVzL2VsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbHMge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lci5odG1sIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmh0bWwodGhpcy5odG1sKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLmh0bWw7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcyxcclxuICAgICAgICAgICAgdG90YWxUaW1lSW5mb0NsYXNzZXMsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lSW5mb0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHNjcnViQmFyQ2xhc3NlcyxcclxuICAgICAgICAgICAgbXV0ZUNvbnRyb2xzQ2xhc3NlcyxcclxuICAgICAgICAgICAgdm9sdW1lQmFyQ2xhc3Nlc1xyXG4gICAgICAgIH0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnBsYXlQYXVzZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIpO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIpO1xyXG4gICAgICAgIHRoaXMuc2NydWJCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiKTtcclxuICAgICAgICB0aGlzLm11dGVDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiKTtcclxuICAgICAgICB0aGlzLnZvbHVtZUJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncGxheS1wYXVzZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZHVyYXRpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjdXJyZW50VGltZUluZm9DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY3VycmVudC10aW1lJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnc2NydWItYmFyJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ211dGUnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd2b2x1bWUtYmFyJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBsYXknO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS1wYXVzZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS12b2x1bWUtdXAnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS1vZmYnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGB0aW1lLWxhcHNlZGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXZvbHVtZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJCdXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY2hhcHRlci1idXR0b24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjaGFwdGVyTGlzdENsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiY2hhcHRlci1saXN0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJMaXN0SXRlbUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiY2hhcHRlci1saXN0LWl0ZW1cIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hhcHRlckFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiYWN0aXZlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJJbkFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiaW5hY3RpdmVcIlxyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5UGF1c2VCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7IHBsYXlDbGFzc2VzOiBwbGF5IH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlczogcGxheVBhdXNlQ29udHJvbHMgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiIGNsYXNzPVwiJHtwbGF5UGF1c2VDb250cm9sc31cIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9JyR7cGxheX0nPjwvaT5cclxuICAgICAgICA8L2J1dHRvbj5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFySFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiIGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWVzdGFtcEhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLWN1cnJlbnQtdGltZVwiIGNsYXNzPVwiJHt0aGlzLmN1cnJlbnRUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiIGNsYXNzPVwiJHt0aGlzLnRvdGFsVGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQgeyB1bm11dGVDbGFzc2VzOiB1bm11dGUsIG11dGVDb250cm9sc0NsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIiBjbGFzcz1cIiR7bXV0ZUNvbnRyb2xzQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiJHt1bm11dGV9XCI+PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiAgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYWNrTGlzdFNlbGVjdENvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd0cmFjay1saXN0LXNlbGVjdC1jb250YWluZXInXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYWNrTGlzdFNlbGVjdENsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd0cmFjay1saXN0LXNlbGVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYWNrTGlzdFNlbGVjdEFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0xpc3RTZWxlY3RJbmFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdpbmFjdGl2ZSdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Nsb3NlLWNhcHRpb24tYnV0dG9uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uQWN0aXZlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2FjdGl2ZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNsb3NlQ2FwdGlvbkJ1dHRvbkluYWN0aXZlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2luYWN0aXZlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uSWNvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjbG9zZS1jYXB0aW9uLWJ1dHRvbi1pY29uIGZhIGZhLWNjJ1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBsYXllclNwZWNpZmljQ29udHJvbHMob3B0cykge1xyXG4gICAgICAgIGxldCB7IHBsYXllciB9ID0gb3B0cztcclxuICAgICAgICBsZXQgeyB0ZXh0VHJhY2tzID0gW10gfSA9IHBsYXllcjtcclxuICAgICAgICBsZXQgaHRtbCA9IGBgO1xyXG4gICAgICAgIGxldCB7IGNvbnRhaW5lciwgY2hhcHRlckJ1dHRvbkNsYXNzZXMsIGNoYXB0ZXJMaXN0Q2xhc3NlcyB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHRleHRUcmFja3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgY2hhcHRlckVsZW1lbnQgPSB0aGlzLmNyZWF0ZUNoYXB0ZXJDb250YWluZXIodGV4dFRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCB0cmFja1NlbGVjdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVRyYWNrU2VsZWN0KHRleHRUcmFja3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXB0ZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGNoYXB0ZXJFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRyYWNrU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZCh0cmFja1NlbGVjdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUcmFja1NlbGVjdCh0ZXh0VHJhY2tzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHRyYWNrTGlzdFNlbGVjdENvbnRhaW5lckNsYXNzZXMsIHRyYWNrTGlzdFNlbGVjdENsYXNzZXMsXHJcbiAgICAgICAgICAgIHRyYWNrTGlzdFNlbGVjdEFjdGl2ZUNsYXNzZXMsIHRyYWNrTGlzdFNlbGVjdEluYWN0aXZlQ2xhc3NlcyxcclxuICAgICAgICAgICAgY2xvc2VDYXB0aW9uQnV0dG9uQ2xhc3NlcywgY2xvc2VDYXB0aW9uQnV0dG9uQWN0aXZlQ2xhc3NlcywgY2xvc2VDYXB0aW9uQnV0dG9uSW5hY3RpdmVDbGFzc2VzLCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ2xhc3Nlc1xyXG4gICAgICAgIH0gPSBzZWxmO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZVRyYWNrcyA9IEFycmF5LmZyb20odGV4dFRyYWNrcykucmVkdWNlKChjdXJyZW50TGFuZ3VhZ2VUcmFja3MsIHRleHRUcmFjaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGV4dFRyYWNrLmtpbmQgPT09ICdjYXB0aW9ucycgfHwgdGV4dFRyYWNrLmtpbmQgPT09ICdzdWJ0aXRsZXMnKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGFuZ3VhZ2VUcmFja3MgPSBjdXJyZW50TGFuZ3VhZ2VUcmFja3MuY29uY2F0KFt0ZXh0VHJhY2tdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZVRyYWNrcztcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGlmIChsYW5ndWFnZVRyYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFja0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IHRyYWNrTGlzdFNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICBsZXQgbGFuZ3VhZ2VTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgY2NUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgbGV0IGNjVG9nZ2xlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudChjY1RvZ2dsZSwgY2xvc2VDYXB0aW9uQnV0dG9uQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudChjY1RvZ2dsZUljb24sIGNsb3NlQ2FwdGlvbkJ1dHRvbkljb25DbGFzc2VzKTtcclxuXHJcbiAgICAgICAgICAgIGNjVG9nZ2xlLmFwcGVuZChjY1RvZ2dsZUljb24pO1xyXG5cclxuICAgICAgICAgICAgbGFuZ3VhZ2VUcmFja3MuZm9yRWFjaChsYW5ndWFnZVRyYWNrID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB7IHNyY2xhbmcsIGxhYmVsLCB0cmFja0lkLCBtb2RlIH0gPSBsYW5ndWFnZVRyYWNrO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhbmd1YWdlVHJhY2tPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGxhbmd1YWdlVHJhY2tPcHRpb24sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHJhY2tJZCxcclxuICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IGxhYmVsICYmIGxhYmVsLmxlbmd0aCA+IDAgPyBsYWJlbCA6IHNyY2xhbmdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyYWNrTGlzdFNlbGVjdC5hcHBlbmRDaGlsZChsYW5ndWFnZVRyYWNrT3B0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJ3Nob3dpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0cmFja0xpc3RTZWxlY3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRyYWNrSWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZVNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0cmFja0xpc3RTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB0YXJnZXQgPSB7fSB9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZTogdHJhY2tJZCA9IFwiXCIgfSA9IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUN1cnJlbnRUcmFjayh0cmFja0lkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjY1RvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsdWU6IHRyYWNrSWQgfSA9IHRyYWNrTGlzdFNlbGVjdDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSW5hY3RpdmUgPSBFbGVtZW50VXRpbGl0aWVzLmhhc0NsYXNzKGNjVG9nZ2xlLCBjbG9zZUNhcHRpb25CdXR0b25JbmFjdGl2ZUNsYXNzZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0luYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5yZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQodHJhY2tMaXN0U2VsZWN0LCB0cmFja0xpc3RTZWxlY3RJbmFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMucmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KGNjVG9nZ2xlLCBjbG9zZUNhcHRpb25CdXR0b25JbmFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudCh0cmFja0xpc3RTZWxlY3QsIHRyYWNrTGlzdFNlbGVjdEFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudChjY1RvZ2dsZSwgY2xvc2VDYXB0aW9uQnV0dG9uQWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VDdXJyZW50VHJhY2sodHJhY2tJZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMucmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KHRyYWNrTGlzdFNlbGVjdCwgdHJhY2tMaXN0U2VsZWN0QWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5yZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQoY2NUb2dnbGUsIGNsb3NlQ2FwdGlvbkJ1dHRvbkFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudCh0cmFja0xpc3RTZWxlY3QsIHRyYWNrTGlzdFNlbGVjdEluYWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudFV0aWxpdGllcy5hZGRDbGFzc2VzVG9FbGVtZW50KGNjVG9nZ2xlLCBjbG9zZUNhcHRpb25CdXR0b25JbmFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQ3VycmVudFRyYWNrKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudCh0cmFja0xpc3RTZWxlY3QsIHRyYWNrTGlzdFNlbGVjdENsYXNzZXMpO1xyXG4gICAgICAgICAgICBFbGVtZW50VXRpbGl0aWVzLmFkZENsYXNzZXNUb0VsZW1lbnQodHJhY2tMaXN0U2VsZWN0LCBsYW5ndWFnZVNlbGVjdGVkID8gdHJhY2tMaXN0U2VsZWN0QWN0aXZlQ2xhc3NlcyA6IHRyYWNrTGlzdFNlbGVjdEluYWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIEVsZW1lbnRVdGlsaXRpZXMuYWRkQ2xhc3Nlc1RvRWxlbWVudCh0cmFja0xpc3RDb250YWluZXIsIHRyYWNrTGlzdFNlbGVjdENvbnRhaW5lckNsYXNzZXMpO1xyXG4gICAgICAgICAgICBFbGVtZW50VXRpbGl0aWVzLmFkZENsYXNzZXNUb0VsZW1lbnQoY2NUb2dnbGUsIGxhbmd1YWdlU2VsZWN0ZWQgPyBjbG9zZUNhcHRpb25CdXR0b25BY3RpdmVDbGFzc2VzIDogY2xvc2VDYXB0aW9uQnV0dG9uSW5hY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgdHJhY2tMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNjVG9nZ2xlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZVRyYWNrcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0xpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQodHJhY2tMaXN0U2VsZWN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrTGlzdENvbnRhaW5lcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgY3JlYXRlQ2hhcHRlckNvbnRhaW5lcih0ZXh0VHJhY2tzKSB7XHJcbiAgICAgICAgbGV0IHsgY2hhcHRlckJ1dHRvbkNsYXNzZXMsIGNoYXB0ZXJMaXN0Q2xhc3NlcywgY2hhcHRlckFjdGl2ZUNsYXNzZXMsIGNoYXB0ZXJJbkFjdGl2ZUNsYXNzZXMsIGNoYXB0ZXJMaXN0SXRlbUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNoYXB0ZXJUcmFjayA9IEFycmF5LmZyb20odGV4dFRyYWNrcykuZmluZCh0ZXh0VHJhY2sgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFRyYWNrLmtpbmQgPT09ICdjaGFwdGVycyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY2hhcHRlclRyYWNrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFwdGVyTGlzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcclxuICAgICAgICAgICAgbGV0IHsgY3VlcyA9IFtdIH0gPSBjaGFwdGVyVHJhY2s7XHJcblxyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGN1ZXMpLmZvckVhY2goKGN1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB7IGlkLCB0ZXh0LCBzdGFydFRpbWUgfSA9IGN1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFwdGVyQ29udGFpbmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXB0ZXJCdXR0b25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXB0ZXJCdXR0b25FbC5pZCA9IGAke2lkfS1zZWxlY3RgO1xyXG4gICAgICAgICAgICAgICAgY2hhcHRlckJ1dHRvbkVsLmNsYXNzTmFtZSA9IGNoYXB0ZXJCdXR0b25DbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY2hhcHRlckJ1dHRvbkVsLmlubmVySFRNTCA9IHRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhcHRlckNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGNoYXB0ZXJCdXR0b25FbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhcHRlckNvbnRhaW5lckVsLmlkID0gaWQ7XHJcbiAgICAgICAgICAgICAgICBjaGFwdGVyQ29udGFpbmVyRWwuY2xhc3NOYW1lID0gYCR7Y2hhcHRlckxpc3RJdGVtQ2xhc3Nlc30gJHtpbmRleCA9PT0gMCA/IGNoYXB0ZXJBY3RpdmVDbGFzc2VzIDogY2hhcHRlckluQWN0aXZlQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXB0ZXJMaXN0RWwuYXBwZW5kQ2hpbGQoY2hhcHRlckNvbnRhaW5lckVsKTtcclxuICAgICAgICAgICAgICAgIGNoYXB0ZXJCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlZWsoc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNoYXB0ZXJMaXN0RWwuY2xhc3NOYW1lID0gY2hhcHRlckxpc3RDbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXB0ZXJMaXN0RWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG5cclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBwbGF5UGF1c2VCdXR0b25IVE1MLFxyXG4gICAgICAgICAgICBzY3J1YkJhckhUTUwsXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcEhUTUwsXHJcbiAgICAgICAgICAgIG11dGVCdXR0b25IVE1MLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJIVE1MXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAke3BsYXlQYXVzZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgICAgJHt0aW1lc3RhbXBIVE1MfVxyXG4gICAgICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgICAgJHt2b2x1bWVCYXJIVE1MfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBbmNob3IgYXMgRGVmYXVsdEFuY2hvciB9IGZyb20gJy4uL2RlZmF1bHQvYW5jaG9yLmpzJztcblxuZXhwb3J0IGNsYXNzIEFuY2hvciBleHRlbmRzIERlZmF1bHRBbmNob3J7XG5cdGNvbnN0cnVjdG9yKGFuY2hvckluZm8pe1xuXHRcdHN1cGVyKGFuY2hvckluZm8pO1xuXHR9XG59IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcblxyXG5jbGFzcyBDYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgaVZYanNBY3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHtzZXR0aW5ncyA9IHt9fSA9ICRzY29wZTtcclxuICAgICAgICBsZXQge2ltZyA9ICcnLHRpdGxlID0gJycsZmlyc3ROYW1lID0gJycsZGVzY3JpcHRpb24gPSAnJyxldmVudHMgPSBbXX0gPSBzZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmltZyA9IGltZztcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uUHJlc3NlZCA9ICAoKSA9PntcclxuICAgICAgICAgICAgaVZYanNBY3Rpb25zLnJlc29sdmVBY3Rpb25zKGV2ZW50cywgKCkgPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkNhcmQuJGluamVjdCA9IFsnJHNjb3BlJywnaXZ4anMuYWN0aW9ucyddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKENhcmQpIiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcbmltcG9ydCB7IElucHV0Q29udHJvbGxlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2lucHV0LWNvbnRyb2xsZXIuanMnO1xyXG5cclxuY2xhc3MgRHJvcGRvd25JbnB1dENvbnRyb2xsZXIgZXh0ZW5kcyBJbnB1dENvbnRyb2xsZXJIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkZWxlbWVudCwgaVZYanMsIGlWWGpzQWN0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgaVZYanMsIGlWWGpzQWN0aW9ucyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtkZWZhdWx0VmFsdWUsIG9wdGlvbnMsIG5hbWUsIHNldHRpbmdzID0ge319ID0gJHNjb3BlLmlucHV0RGF0YTtcclxuICAgICAgICBsZXQge2Ryb3Bkb3duID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHttdWx0aXBsZSA9IGZhbHNlfSA9IGRyb3Bkb3duO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICFtdWx0aXBsZSA/IHtcclxuICAgICAgICAgICAgdmFsdWUgOiBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV0gPyBpVlhqcy5leHBlcmllbmNlLmRhdGFbbmFtZV0gOiAnJ1xyXG4gICAgICAgIH0gOiBbe1xyXG4gICAgICAgICAgICB2YWx1ZTogaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdID8gaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdIDogJydcclxuICAgICAgICB9XTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKHZhbHVlKSA9PiB7IFxyXG4gICAgICAgICAgICBsZXQge25hbWUsIG9uQ2hhbmdlID0gW119ID0gJHNjb3BlLmlucHV0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWxlY3RlZC5yZWR1Y2UoKHNlbGVjdGVkVmFscywgY3VycmVudFZhbCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RlZFZhbHMubGVuZ3RoIDw9IDApIHJldHVybiBgJHtjdXJyZW50VmFsLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3NlbGVjdGVkVmFsc30sICR7Y3VycmVudFZhbC52YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICB9LCAnJyk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvbkNoYW5nZS51bnNoaWZ0KHsgZXZlbnROYW1lOiAnc2V0RGF0YScsIGFyZ3M6IHsga2V5OiBuYW1lLCB2YWx1ZTogdmFsdWUudmFsdWUgfSB9KTtcclxuICAgICAgICAgICAgaVZYanNBY3Rpb25zLnJlc29sdmVBY3Rpb25zKG9uQ2hhbmdlLCAoKSA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5Ecm9wZG93bklucHV0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnaVZYanMnLCAnaXZ4anMuYWN0aW9ucyddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKERyb3Bkb3duSW5wdXRDb250cm9sbGVyKTsiLCJpbXBvcnQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uLy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NyZWF0ZS1mYWN0b3J5LWZ1bmN0aW9uLmpzJztcclxuaW1wb3J0IENhcmRFbGVtZW50Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9lbGVtZW50LmNhcmQuanMnO1xyXG5pbXBvcnQge0NhcmRUZW1wbGF0ZXN9IGZyb20gJy4uLy4uL2NhcmQuanMnO1xyXG5cclxuY2xhc3MgQ2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigkY29tcGlsZSwgJHRpbWVvdXQpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZUhUTUw7XHJcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXml2eGpzRm9ybUlucHV0XCI7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcclxuICAgICAgICAgICAgc2V0dGluZ3M6ICc9c2V0dGluZ3MnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENhcmRFbGVtZW50Q29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IHsgc2V0dGluZ3MgPSB7fSB9ID0gJHNjb3BlOyBcclxuICAgICAgICAgICAgbGV0IHtjYXJkVHlwZSxjbGFzc2VzID0gXCJcIn0gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBuZXcgQ2FyZFRlbXBsYXRlcygkc2NvcGUuc2V0dGluZ3MpW2NhcmRUeXBlICsgXCJDYXJkSFRNTFwiXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgIGlFbG0uaHRtbChodG1sKTtcclxuICAgICAgICAgICAgJGNvbXBpbGUoaUVsbS5jb250ZW50cygpKSgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3BlY2lhbC5jYXJkcyAuaW1hZ2UnKS5kaW1tZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uOiAnaG92ZXInXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRlbXBsYXRlSFRNTCgpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ7e2NsYXNzZXN9fVwiPjwvZGl2PmA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5DYXJkLiRpbmplY3QgPSBbJyRjb21waWxlJywgJyR0aW1lb3V0J107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oQ2FyZCk7IiwiaW1wb3J0IGNyZWF0ZUZhY3RvcnlGdW5jdGlvbiBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9jcmVhdGUtZmFjdG9yeS1mdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBEcm9wZG93bklucHV0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9pbnB1dC5kcm9wZG93bi5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hbmd1bGFyL3V0aWxpdGllcy9tZXNzYWdlcy5lcnJvci5qcyc7XHJcblxyXG5jbGFzcyBEcm9wZG93bklucHV0IHtcclxuICAgIGNvbnN0cnVjdG9yKCRyb290U2NvcGUsICRjb21waWxlLCAkZmlsdGVyLCAkdGltZW91dCwgaVZYanMsIGlWWGpzVUlNb2R1bGUsIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVIVE1MO1xyXG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0aGlzLnJlcXVpcmUgPSBcIl5pdnhqc0Zvcm1JbnB1dFwiO1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGlucHV0RGF0YTogJz1pbnB1dERhdGEnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEcm9wZG93bklucHV0Q29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtpbnB1dERhdGE6IGlucHV0fSA9ICRzY29wZTtcclxuICAgICAgICAgICAgbGV0IHtpZCwgZXJyb3JzID0ge30sIG5hbWUsIGxhYmVsSFRNTCwgbGFiZWwgPSAkZmlsdGVyKCdzdHJpbmdQYXJzZXJzJykoJ3N0YXJ0Q2FzZScsIGlkKSwgYXR0cmlidXRlcyA9IHt9LCBvcHRpb25zLCBkZWZhdWx0RGlzcGxheSwgZGVmYXVsdFZhbHVlLCBzZXR0aW5ncyA9IHt9fSA9IGlucHV0O1xyXG4gICAgICAgICAgICBsZXQge2RpcmVjdGl2ZXMgPSAnJ30gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBuZXcgRXJyb3JNZXNzYWdlcyhuYW1lLCBlcnJvcnMsIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0YWdIVE1MID0gYCR7ZGlyZWN0aXZlc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2hhbmdlPSd2bS5vbkNoYW5nZSh2bS5zZWxlY3RlZCknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW9wdGlvbnM9XCJvcHRpb24uZGlzcGxheSBmb3Igb3B0aW9uIGluIGlucHV0RGF0YS5vcHRpb25zIHRyYWNrIGJ5IG9wdGlvbi52YWx1ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD0ndm0uc2VsZWN0ZWQnYDtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5yZXF1aXJlZCB8fCBkZWZhdWx0RGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7ZGVmYXVsdERpc3BsYXl9PC9vcHRpb24+YCA6XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnNDbGFzcyA9IG5ldyBpVlhqc1VJTW9kdWxlLmRyb3Bkb3duKGlkLCBuYW1lLCBsYWJlbCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsLCBkZWZhdWx0RGlzcGxheSwgc2V0dGluZ3MsIHRhZ0hUTUwsIGVycm9yTWVzc2FnZXMpO1xyXG5cclxuICAgICAgICAgICAgaUVsbS5odG1sKG9wdGlvbnNDbGFzcy5odG1sKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjb21waWxlKGlFbG0uY29udGVudHMoKSkoJHNjb3BlKTtcclxuICAgICAgICAgICAgJChpRWxtLmZpbmQoJ3NlbGVjdCcpKS5kcm9wZG93bigpO1xyXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhwZXJpZW5jZVZhbHVlID0gaVZYanMuZXhwZXJpZW5jZS5kYXRhW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgJChpRWxtLmZpbmQoJ3NlbGVjdCcpKS5kcm9wZG93bignc2V0IHNlbGVjdGVkJywgZXhwZXJpZW5jZVZhbHVlID8gZXhwZXJpZW5jZVZhbHVlICA6JycpO1xyXG5cclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGVtcGxhdGVIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdj48L2Rpdj5gXHJcbiAgICB9O1xyXG59XHJcblxyXG5Ecm9wZG93bklucHV0LiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnLCAnJGZpbHRlcicsICckdGltZW91dCcsICdpVlhqcycsICdpdnhqcy5tb2R1bGVzLnVpJywgJ2l2eGpzLmJ1cyddO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKERyb3Bkb3duSW5wdXQpOyIsImltcG9ydCB7IEJ1dHRvbnMgYXMgRGVmYXVsdEJ1dHRvbnMgfSBmcm9tICcuLi9kZWZhdWx0L2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIGV4dGVuZHMgRGVmYXVsdEJ1dHRvbnMge1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucywgaW5wdXREYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoYnV0dG9ucywgaW5wdXREYXRhLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGJ1dHRvbkNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBidXR0b24nO1xyXG4gICAgfVxyXG5cclxufTsiLCJleHBvcnQgY2xhc3MgQ2FyZFRlbXBsYXRlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluaUNhcmRIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpIGNhcmRzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInJpZ2h0IGZsb2F0ZWQgbWluaSB1aSBpbWFnZVwiIHNyYz1cInt7dm0uaW1nfX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3ZtLmZpcnN0TmFtZX19IHt7dm0ubGFzdE5hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWV0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3ZtLnRpdGxlfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3t2bS5kZXNjcmlwdGlvbn19XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXh0cmEgY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpIG9uZSBidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1jbGljaz1cInZtLmJ1dHRvblByZXNzZWQoKVwiIGNsYXNzPVwidWkgYnV0dG9uXCI+QnV5IGl0PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpbW1lckNhcmRIVE1MKCkge1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlc30gPSB0aGlzLnNldHRpbmdzO1xyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBzcGVjaWFsIGNhcmRzXCI+ICBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJibHVycmluZyBkaW1tYWJsZSBpbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpIGRpbW1lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XCJ2bS5idXR0b25QcmVzc2VkKClcIiBjbGFzcz1cInVpIGludmVydGVkIGJ1dHRvblwiPkJ1eSB0aGlzITwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGltZyBuZy1zcmM9XCJ7e3ZtLmltZ319XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJoZWFkZXJcIj57e3ZtLmZpcnN0TmFtZX19IHt7dm0ubGFzdE5hbWV9fTwvYT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGE+e3t2bS50aXRsZX19PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3ZtLmRlc2NyaXB0aW9ufX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgQ2hlY2tib3ggYXMgRGVmYXVsdENoZWNrYm94IH0gZnJvbSAnLi4vZGVmYXVsdC9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgRGVmYXVsdENoZWNrYm94IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBjaGVja2JveCdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwiJHtjbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgJHthdHRyaWJ1dGVzfSA+XHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpbnB1dC5pZH1cIj4gICAgXHJcbiAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICA8L2Rpdj5gXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRlIGFzIERlZmF1bHREYXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRlLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZSBleHRlbmRzIERlZmF1bHREYXRle1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBEYXRldGltZUxvY2FsIGFzIERlZmF1bHREYXRldGltZUxvY2FsIH0gZnJvbSAnLi4vZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwgZXh0ZW5kcyBEZWZhdWx0RGF0ZXRpbWVMb2NhbHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG59OyIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyb3Bkb3duIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBsYWJlbCwgZGVmYXVsdERpc3BsYXksIHNldHRpbmdzID0ge30sIHRhZ0hUTUwsIGVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLnRhZ0hUTUwgPSB0YWdIVE1MO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGRyb3Bkb3duJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWUsIGxhYmVsLCBkZWZhdWx0RGlzcGxheSwgc2V0dGluZ3MsIHVpQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7ZHJvcGRvd24gPSBcIlwifSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bXVsdGlwbGUgPSBmYWxzZX0gPSBkcm9wZG93bjtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JNZXNzYWdlcztcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyBFcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9IG11bHRpcGxlPVwiXCJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbH08L2xhYmVsPiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0aGlzLnRhZ0hUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGVmYXVsdE9wdGlvblRhZ31cclxuICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBFbWFpbCBhcyBEZWZhdWx0RW1haWwgfSBmcm9tICcuLi9kZWZhdWx0L2VtYWlsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWwgZXh0ZW5kcyBEZWZhdWx0RW1haWx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIGFzIERlZmF1bHRGb3JtIH0gZnJvbSAnLi4vZGVmYXVsdC9mb3JtLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgRGVmYXVsdEZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzKSB7XHJcbiAgICAgICBzdXBlcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIFN0eWxlKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZm9ybUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGZvcm0gZXJyb3InO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdWJtaXRCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge319ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsOiBzdWJtaXRMYWJlbCA9IFwiU3VibWl0XCIsIGxhYmVsSFRNTDogc3VibWl0TGFiZWxIVE1MLCBpbnB1dDogc3VibWl0SW5wdXQgPSB7fSwgY29udGFpbmVyOiBzdWJtaXRDb250YWluZXIgPSB7fSwgYXR0cmlidXRlcyA9ICcnfSA9IHN1Ym1pdDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdElucHV0Q2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0SW5wdXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRDb250YWluZXJDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRDb250YWluZXI7XHJcblxyXG4gICAgICAgIHN1Ym1pdExhYmVsID0gc3VibWl0TGFiZWxIVE1MID8gc3VibWl0TGFiZWxIVE1MIDogc3VibWl0TGFiZWw7XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXRIVE1MID0gc3VibWl0TGFiZWwubGVuZ3RoID49IDAgP1xyXG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInNpeHRlZW4gZmllbGQgd2lkZSAke3N1Ym1pdENvbnRhaW5lckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInVpIGJ1dHRvbiAke3N1Ym1pdElucHV0Q2xhc3Nlc31cIiB0eXBlPSdzdWJtaXQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3N1Ym1pdExhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxufTsiLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybS5qcyc7XHJcbmltcG9ydCB7IEFuY2hvciB9IGZyb20gJy4vYW5jaG9yLmpzJztcclxuaW1wb3J0IHsgQnV0dG9ucyB9IGZyb20gJy4vYnV0dG9ucy5qcyc7XHJcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAnLi9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IERhdGUgfSBmcm9tICcuL2RhdGUuanMnO1xyXG5pbXBvcnQgeyBEYXRldGltZUxvY2FsIH0gZnJvbSAnLi9kYXRldGltZS1sb2NhbC5qcyc7XHJcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5qcyc7XHJcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IE51bWJlciB9IGZyb20gJy4vbnVtYmVyLmpzJztcclxuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gXCIuL29wdGlvbnMuanNcIjtcclxuaW1wb3J0IHsgUmFkaW8gfSBmcm9tIFwiLi9yYWRpby5qc1wiO1xyXG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlLmpzXCI7XHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuL3RleHQuanMnO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBVcmwgfSBmcm9tICcuL3VybC5qcyc7XHJcblxyXG4vL0FuZ3VsYXJcclxuaW1wb3J0IGl2eGpzU2VtYW50aWNVaURyb3Bkb3duSW5wdXQgZnJvbSAnLi9hbmd1bGFyL2RpcmVjdGl2ZXMvaW5wdXQuZHJvcGRvd24uanMnO1xyXG5pbXBvcnQgaXZ4anNTZW1hbnRpY1VpQ2FyZCBmcm9tICcuL2FuZ3VsYXIvZGlyZWN0aXZlcy9lbGVtZW50LmNhcmQuanMnO1xyXG5cclxuLy9TdGF0ZXNcclxuaW1wb3J0IHsgSW5wdXRTdGF0ZSB9IGZyb20gJy4vc3RhdGUuaW5wdXQuanMnO1xyXG5pbXBvcnQgeyBWaWRlb1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS52aWRlby5qcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSB9IGZyb20gJy4vc3RhdGUubmF2aWdhdGlvbi5qcyc7XHJcblxyXG4vL0NvbnRyb2xzIFxyXG5pbXBvcnQgVmlkZW9Db250cm9scyBmcm9tICcuL3ZpZGVvLmNvbnRyb2xzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZW1hbnRpY1VJIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IEZvcm07XHJcbiAgICAgICAgdGhpcy5hbmNob3IgPSBBbmNob3I7XHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gQnV0dG9ucztcclxuICAgICAgICB0aGlzLmNoZWNrYm94ID0gQ2hlY2tib3g7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gRGF0ZTtcclxuICAgICAgICB0aGlzLmRhdGV0aW1lTG9jYWwgPSBEYXRldGltZUxvY2FsO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBFbWFpbDtcclxuICAgICAgICB0aGlzLm51bWJlciA9IE51bWJlcjtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPcHRpb25zO1xyXG4gICAgICAgIHRoaXMucmFkaW8gPSBSYWRpbzsgICAgXHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IFRleHQ7XHJcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IFRleHRhcmVhO1xyXG4gICAgICAgIHRoaXMudXJsID0gVXJsO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24gPSBEcm9wZG93bjtcclxuICAgICAgICB0aGlzLnZpZGVvQ29udHJvbHMgPSBWaWRlb0NvbnRyb2xzO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBpbnB1dCA6IElucHV0U3RhdGUsXHJcbiAgICAgICAgICAgIHZpZGVvIDogVmlkZW9TdGF0ZSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbiA6IE5hdmlnYXRpb25TdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuZ3VsYXIgPSB7XHJcbiAgICAgICAgICAgIGl2eGpzU2VtYW50aWNVaURyb3Bkb3duSW5wdXQgOiBpdnhqc1NlbWFudGljVWlEcm9wZG93bklucHV0LFxyXG4gICAgICAgICAgICBpdnhqc1NlbWFudGljVWlDYXJkIDogaXZ4anNTZW1hbnRpY1VpQ2FyZFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZVNlbWFudGljVUk7XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudWkuc2VtYW50aWMtdWknLCBpbml0aWFsaXplU2VtYW50aWNVSSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplU2VtYW50aWNVSSgpe1xyXG4gICAgcmV0dXJuIFNlbWFudGljVUlcclxufSIsImltcG9ydCB7IEVycm9yTWVzc2FnZXMgYXMgRGVmYXVsdEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi4vZGVmYXVsdC9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMgZXh0ZW5kcyBEZWZhdWx0RXJyb3JNZXNzYWdlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvck1lc3NhZ2VzID0gW10peyAgICAgICBcclxuICAgICAgIHN1cGVyKGVycm9yTWVzc2FnZXMpOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBlcnJvciBtZXNzYWdlJztcclxuICAgIH1cclxuICAgIFxyXG59OyIsImltcG9ydCB7IE51bWJlciBhcyBEZWZhdWx0TnVtYmVyIH0gZnJvbSAnLi4vZGVmYXVsdC9udW1iZXIuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBEZWZhdWx0TnVtYmVye1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07XHJcbiIsImltcG9ydCB7IE9wdGlvbnMgYXMgRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuLi9kZWZhdWx0L29wdGlvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIGV4dGVuZHMgRGVmYXVsdE9wdGlvbnN7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgZHJvcGRvd24nO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7UmFkaW8gYXMgRGVmYXVsdFJhZGlvfSBmcm9tICcuLi9kZWZhdWx0L3JhZGlvLmpzJztcclxuaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhZGlvIGV4dGVuZHMgRGVmYXVsdFJhZGlvIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoYXNDb3JyZWN0UmFkaW9DbGFzcyhjbGFzc2VzKXtcclxuICAgICAgICBsZXQgdmFsaWRSYWRpb0NsYXNzZXMgPSBbXHJcbiAgICAgICAgICAgIFwicmFkaW9cIiwgXCJ0b2dnbGVcIiwgXCJzbGlkZXJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGhhc1ZhbGlkQ2xhc3MgPSBmYWxzZTtcclxuICAgICAgICAgXHJcbiAgICAgICAgdmFsaWRSYWRpb0NsYXNzZXMuZm9yRWFjaCgodmFsaWRDbGFzcykgPT57XHJcbiAgICAgICAgICAgIGlmKGhhc1ZhbGlkQ2xhc3MpIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaGFzVmFsaWRDbGFzcyA9IChjbGFzc2VzLmluZGV4T2YodmFsaWRDbGFzcykgPj0gMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhhc1ZhbGlkQ2xhc3M7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCB1aUNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgaXNWYWxpZFJhZGlvQ2xhc3MgPSB0aGlzLmhhc0NvcnJlY3RSYWRpb0NsYXNzKHVpQ2xhc3Nlcyk7XHJcbiAgICBcclxuICAgICAgICBpZighaXNWYWxpZFJhZGlvQ2xhc3MpIHVpQ2xhc3NlcyA9IGAke3VpQ2xhc3Nlc30gcmFkaW9gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWkgJHt1aUNsYXNzZXN9IGNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAke3JhZGlvSFRNTH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCB7aW5wdXR9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtpZH0ke3ZhbHVlLmxlbmd0aCA+IDAgPyAnLScgKyB2YWx1ZSA6ICcnfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCIke2N1cnJlbnRJZH1cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7Y3VycmVudElkfVwiPiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIGA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0lucHV0U3RhdGUgYXMgRGVmYXVsdElucHV0U3RhdGV9IGZyb20gJy4uL2RlZmF1bHQvc3RhdGUuaW5wdXQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0U3RhdGUgZXh0ZW5kcyBEZWZhdWx0SW5wdXRTdGF0ZSB7IFxyXG4gICAgY29uc3RydWN0b3IoaGVhZGVyLCBmb3JtU2VjdGlvbiwgZm9vdGVyLCBkYXRhKXtcclxuICAgICAgICBzdXBlcihoZWFkZXIsIGZvcm1TZWN0aW9uLCBmb290ZXIsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd1aSBjb250YWluZXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVmYXVsdEhlYWRlckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3VpIGhlYWRlcic7XHJcbiAgICB9ICBcclxufTsiLCJpbXBvcnQge05hdmlnYXRpb25TdGF0ZSBhcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIGV4dGVuZHMgRGVmYXVsdE5hdmlnYXRpb25TdGF0ZSB7ICAgICBcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbil7XG4gICAgICAgIHN1cGVyKGRhdGEsIGxpbmtTZWN0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJ3VpIGNvbnRhaW5lcic7XG4gICAgfVxuICAgIFxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJ3VpIGhlYWRlcic7XG4gICAgfVxufTsiLCJleHBvcnQgY2xhc3MgVmlkZW9TdGF0ZSB7IFxyXG4gICAgY29uc3RydWN0b3IocGxheWVyU2VjdGlvbiwgZGF0YSl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJTZWN0aW9uID0gcGxheWVyU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpUGhvbmVJbmxpbmVDbGFzc2VzKCl7XHJcbiAgICAgICAgbGV0IHtpc0lwaG9uZSA9IGZhbHNlfSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzSXBob25lID8gJ2lwaG9uZS1pbmxpbmUnIDogJyc7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndWkgaGVhZGVyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGh0bWwoKSB7ICAgXHJcbiAgICAgICAgbGV0IHtwbGF5ZXJTZWN0aW9uLCBkYXRhLCBpUGhvbmVJbmxpbmVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fX0gPSBkYXRhO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbCA6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1aSBjb250YWluZXIgJHtzZWN0aW9uQ2xhc3Nlc30gJHtpUGhvbmVJbmxpbmVDbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHt0aGlzLmRlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7cGxheWVyU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufTsiLCJleHBvcnQgY2xhc3MgU3R5bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldElucHV0Q29udGFpbmVyQ2xhc3NOYW1lcyhzZXR0aW5ncykge1xyXG4gICAgICAgIGlmICghc2V0dGluZ3MpIHNldHRpbmdzID0ge307XHJcblxyXG4gICAgICAgIGxldCB7Y29udGFpbmVyQ2xhc3MgPSAnZmllbGQnLCBjbGFzc2VzID0gJyd9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtjb250YWluZXJDbGFzc30gJHtjbGFzc2VzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2lkdGhDbGFzc2VzKGlucHV0SFRNTCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50V2lkdGhUb3RhbCA9IDAuMDtcclxuICAgICAgICBsZXQgY29sdW1ucyA9IHtzdHJpbmc6IFwidHdlbHZlXCIsIG51bWJlcjogMTJ9O1xyXG4gICAgICAgIGxldCBjb2x1bW5OYW1lcyA9IFtcIm9uZVwiLCBcInR3b1wiLCBcInRocmVlXCIsIFwiZm91clwiLCBcImZpdmVcIiwgXCJzaXhcIiwgXCJzZXZlblwiLCBcImVpZ2h0XCIsIFwibmluZVwiICxcInRlblwiLCBcImVsZXZlblwiLCBcInR3ZWx2ZVwiLCBcInRoaXJ0ZWVuXCIsIFwiZm91cnRlZW5cIiwgXCJmaWZ0ZWVuXCIsIFwic2l4dGVlblwiXVxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0SFRNTC5yZWR1Y2UoKGNvbnRlbnRIVE1MLCB0aGlzSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5nc30gPSB0aGlzSW5wdXQ7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSBcIjFcIiwgY29udGFpbmVyID0ge319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnIH0gPSBjb250YWluZXI7XHJcbiAgICAgICAgICAgIGxldCBudW1lcmljV2lkdGggPSBnZXROdW1lcmljV2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PGRpdiBjbGFzcz1cInN0YWNrYWJsZSBmaWVsZHNcIj4gYFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50V2lkdGhUb3RhbCArPSBudW1lcmljV2lkdGg7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VtYW50aWNVSXdpZHRoID0gY29sdW1uTmFtZXNbTWF0aC5yb3VuZChudW1lcmljV2lkdGggKiBjb2x1bW5OYW1lcy5sZW5ndGgpIC0gMV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCdpdnhqcy1ncmlkLTEtMScsIGAke3NlbWFudGljVUl3aWR0aH0gd2lkZSBmaWVsZCAke2NsYXNzZXN9YCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9JHtodG1sfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudEhUTUw7XHJcbiAgICAgICAgfSwgJycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNvbnRlbnRzLnN1YnN0cmluZyhjb250ZW50cy5sZW5ndGggLSA3KSAhPT0gXCI8L2Rpdj5cIil7XHJcbiAgICAgICAgICAgIGNvbnRlbnRzID0gYCR7Y29udGVudHN9PC9kaXY+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXROdW1lcmljV2lkdGgod2lkdGhTdHJpbmcpe1xyXG4gICAgICAgICAgICBpZih3aWR0aFN0cmluZyA9PT0gJzEnKSByZXR1cm4gMTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJzZWRXaWR0aEZvcm11bGEgPSB3aWR0aFN0cmluZy5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzBdKSAvIHBhcnNlRmxvYXQocGFyc2VkV2lkdGhGb3JtdWxhWzFdKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBUZXh0IGFzIERlZmF1bHRUZXh0IH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0LmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIERlZmF1bHRUZXh0e1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07IiwiaW1wb3J0IHsgVGV4dGFyZWEgYXMgRGVmYXVsdFRleHRhcmVhIH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0YXJlYS5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgRGVmYXVsdFRleHRhcmVhe1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbn07IiwiaW1wb3J0IHsgVXJsIGFzIERlZmF1bHRVcmwgfSBmcm9tICcuLi9kZWZhdWx0L3VybC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVybCBleHRlbmRzIERlZmF1bHRVcmx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxufTsiLCJpbXBvcnQgRGVmYXVsdFZpZGVvQ29udHJvbHMgZnJvbSAnLi4vZGVmYXVsdC92aWRlby5jb250cm9scy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIERlZmF1bHRWaWRlb0NvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaVZYanNCdXMpIHtcclxuICAgICAgICBzdXBlcihjb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3RhbFRpbWVJbmZvQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2R1cmF0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdwbGF5IGljb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXVzZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdwYXVzZSBpY29uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VubXV0ZSBpY29uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdtdXRlIGljb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBpY29uIGJ1dHRvbiBwbGF5LXBhdXNlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3VpIGljb24gYnV0dG9uIG11dGUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICd1aSBzbWFsbCBwcm9ncmVzcyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyVGltZUxhcHNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gYGJhcmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYHVpIHNtYWxsIHByb2dyZXNzYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gYGJhcmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYXB0ZXJCdXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndWkgYnV0dG9uIGNoYXB0ZXItYnV0dG9uJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hhcHRlckxpc3RDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBcInVpIG9yZGVyZWQgbGlzdFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjaGFwdGVyTGlzdEl0ZW1DbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIFwiaXRlbVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0xpc3RTZWxlY3RDb250YWluZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndHJhY2stbGlzdC1zZWxlY3QtY29udGFpbmVyJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0xpc3RTZWxlY3RDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAndHJhY2stbGlzdC1zZWxlY3QgdWkgZHJvcGRvd24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0xpc3RTZWxlY3RBY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYWN0aXZlIHNob3cnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0xpc3RTZWxlY3RJbmFjdGl2ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdpbmFjdGl2ZSBoaWRlJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnY2xvc2UtY2FwdGlvbi1idXR0b24gdWkgaWNvbiBidXR0b24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25BY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYWN0aXZlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2xvc2VDYXB0aW9uQnV0dG9uSW5hY3RpdmVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnaW5hY3RpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjbG9zZUNhcHRpb25CdXR0b25JY29uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Nsb3NlLWNhcHRpb24tYnV0dG9uLWljb24gY2xvc2VkIGNhcHRpb25pbmcgaWNvbidcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtc2NydWItYmFyXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1pbi13aWR0aDowXCIgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdsYWJlbCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy50aW1lc3RhbXBIVE1MfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiIGNsYXNzPVwicHJvZ3Jlc3MgJHt0aGlzLnZvbHVtZUJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWluLXdpZHRoOjBcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VCdXR0b25IVE1MLCBzY3J1YkJhckhUTUwsIHRpbWVzdGFtcEhUTUwsIG11dGVCdXR0b25IVE1MLCB2b2x1bWVCYXJIVE1MfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgJHtwbGF5UGF1c2VCdXR0b25IVE1MfVxyXG4gICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgJHt2b2x1bWVCYXJIVE1MfWA7XHJcbiAgICB9XHJcbn07IiwiLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCB3aXRoIGF0dHJpYnV0ZXMgYW5kIGtleXMgaW50byBIVE1MXHJcbiAqIHRoYXQgaW5wdXRzIGNhbiBiZSB1c2VkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZVRhZ3Mge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFB1bGxzIGFsbCB0aGUgYXR0cmlidXRlIHNldHRpbmdzIGFuZCB0aGUgYXR0cmlidXRlcyBcclxuICAgICAqIHRvIGJlIHJlbmRlcmVkLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZURhdGEgLSBzZXR0aW5ncyBmb3IgYWxsIHRoZSBhdHRyaWJ1dGVzLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXR0cmlidXRlS2V5cyAtIGF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZURhdGEgPSB7fSwgYXR0cmlidXRlS2V5cyA9IFtdKXtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBbGwgYXR0cmlidXRlcyB0byBiZSBtYWRlLlxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5hdHRyaWJ1dGVEYXRhID0gYXR0cmlidXRlRGF0YTtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBdHRyaWJ1dGUgbmFtZXMgdG8gYmUgc2V0LlxyXG4gICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVLZXlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBhdHRyaWJ1dGVzIGJhc2VkIG9uIHRoZSBrZXlzIGFuZCBhdHRyaWJ1dGUgZGF0YS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhdHRyaWJ1dGVEYXRhID0geyByZXF1aXJlZCA9IFwidHJ1ZVwifTtcclxuICAgICAqIGF0dHJpYnV0ZUtleXMgPSBbXCJyZXF1aXJlZFwiXTtcclxuICAgICAqIFxyXG4gICAgICogLy8gQmVjb21lczogXHJcbiAgICAgKiBodG1sID0gJ3JlcXVpcmVkID0gXCJ0cnVlXCInXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVLZXlzLCBhdHRyaWJ1dGVEYXRhfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBhdHRyaWJ1dGVLZXlzLnJlZHVjZSggKGN1cnJlbnRBdHRyaWJ1dGVIVE1MLCBjdXJyZW50S2V5KSA9PntcclxuXHJcbiAgICAgICAgICAgIGlmKGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZVRhZ0hUTUwgPSBhdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldID09PSAndGFnLW9ubHknID8gXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50S2V5IDpcclxuICAgICAgICAgICAgICAgIGAke2N1cnJlbnRLZXl9PVwiJHthdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldfVwiYFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50QXR0cmlidXRlSFRNTH0gJHthdHRyaWJ1dGVUYWdIVE1MfSBgO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEF0dHJpYnV0ZUhUTUw7XHJcbiAgICAgICAgfSwgJycpOyAgIFxyXG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVIVE1MO1xyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGVsZW1lbnQsIGNsYXNzZXMpIHtcbiAgICAgICAgbGV0IGNsYXNzTGlzdCA9IGNsYXNzZXMuc3BsaXQoJyAnKTtcblxuICAgICAgICBjbGFzc0xpc3QuZm9yRWFjaChjdXJyZW50Q2xhc3MgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGN1cnJlbnRDbGFzcyk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudChlbGVtZW50LCBjbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc0xpc3QgPSBjbGFzc2VzLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgY2xhc3NMaXN0LmZvckVhY2goY3VycmVudENsYXNzID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50Q2xhc3MpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzZXMpID49IDA7XG4gICAgfVxufSIsImltcG9ydCBWaWRlb1NldHRpbmdzIGZyb20gJy4uL3NldHRpbmdzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnRydWN0b3IoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50dGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QQVVTRSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHVyYXRpb24oY2IpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLm9uY2UodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfRFVSQVRJT04sIChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjYihkdXJhdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuR0VUX0RVUkFUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWb2x1bWUodm9sdW1lKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VUX1ZPTFVNRSwgdm9sdW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWVrKHNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRUVLLCBzZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VDdXJyZW50VHJhY2sodHJhY2tJZCl7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMudHJhY2tFdmVudE5hbWVzLkNIQU5HRV9DVVJSRU5UX1RSQUNLLCB0cmFja0lkKTtcclxuICAgIH1cclxufSIsImltcG9ydCBDb250cm9sRXZlbnRzIGZyb20gJy4vZXZlbnRzLmpzJztcclxuaW1wb3J0IFZpZGVvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qc1wiO1xyXG5pbXBvcnQgVHJhY2tFdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvdHJhY2tzLmV2ZW50cy5qc1wiO1xyXG5pbXBvcnQgVHJhY2tDdWVzRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3RyYWNrcy5jdWVzLmV2ZW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xzIGV4dGVuZHMgQ29udHJvbEV2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IDAuNTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xFdmVudE5hbWVzID0gbmV3IFZpZGVvRXZlbnROYW1lcygpO1xyXG4gICAgICAgIHRoaXMudHJhY2tFdmVudE5hbWVzID0gbmV3IFRyYWNrRXZlbnROYW1lcygpO1xyXG4gICAgICAgIHRoaXMudHJhY2tDdWVzRXZlbnROYW1lID0gbmV3IFRyYWNrQ3Vlc0V2ZW50TmFtZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdGhpcy51cGRhdGVUaW1lKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHRoaXMud2hpbGVQbGF5aW5nKTtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkNBTl9QTEFZLCB0aGlzLmNhblBsYXlDYWxsYmFjayk7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy50cmFja0N1ZXNFdmVudE5hbWUuT05fQ0hBUFRFUl9TVEFSVCwgdGhpcy5jaGFwdGVyQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcmVsYXRpdmVQb3NpdGlvbiA9IHsgeDogZWxlbWVudC5vZmZzZXRMZWZ0LCB5OiBlbGVtZW50Lm9mZnNldFRvcCB9O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICByZWxhdGl2ZVBvc2l0aW9uLnggKz0gdGVtcFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueSArPSB0ZW1wUG9zaXRpb24ueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFkanVzdFZvbHVtZShldmVudCkge1xyXG4gICAgICAgIGxldCB7IHZvbHVtZUJhciwgbXV0ZUNvbnRyb2xzLCBjdXJyZW50Vm9sdW1lLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3NlcywgdW5tdXRlQ2xhc3NlcywgbXV0ZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgb2Zmc2V0V2lkdGg6IHdpZHRoIH0gPSB2b2x1bWVCYXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24odm9sdW1lQmFyKTtcclxuICAgICAgICBsZXQgeyB4OiBhYnNvbHV0ZVggfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCB2b2x1bWVMZXZlbCA9ICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgbXV0ZUNvbnRyb2xzQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt2b2x1bWVMZXZlbCAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gdm9sdW1lTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lTGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjcnViKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHsgY3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IG9mZnNldFdpZHRoOiB3aWR0aCB9ID0gc2NydWJCYXI7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oc2NydWJCYXIpO1xyXG4gICAgICAgIGxldCB7IHg6IGFic29sdXRlWCB9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHNjcnViVG9UaW1lID0gdGhpcy5kdXJhdGlvbiAqICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzY3J1YlRvVGltZSk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lU3RhbXAgPSB0aGlzLmNyZWF0ZVRpbWVTdGFtcChjdXJyZW50VGltZU9iamVjdCk7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCB0aW1lbGFwc2VkID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHNjcnViQmFyLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAke2N1cnJlbnRUaW1lU3RhbXB9YDtcclxuICAgICAgICB0aW1lbGFwc2VkLnN0eWxlLndpZHRoID0gYCR7KHRydWVYIC8gd2lkdGgpICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLnNlZWsoc2NydWJUb1RpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXlQYXVzZShldmVudCkge1xyXG4gICAgICAgIGxldCB7IHBsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHBsYXlDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBwYXVzZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBsYXlDbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE11dGUoZXZlbnQpIHtcclxuICAgICAgICBsZXQgeyBtdXRlQ29udHJvbHMsIG11dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCB2b2x1bWVCYXIsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChtdXRlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSB1bm11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gbXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAwJWA7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBtdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3RoaXMuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeVRvUGxheShwbGF5ZXIsIHN0YXRlRGF0YSkge1xyXG4gICAgICAgIGxldCB7IHZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG5cclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3NlbGYuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUoc2VsZi5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICB0aGlzLmdldER1cmF0aW9uKChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyB0b3RhbFRpbWVJbmZvLCBjdXJyZW50VGltZUluZm8sIHNjcnViQmFyIH0gPSBzZWxmO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25UaW1lT2JqZWN0ID0gc2VsZi5jb252ZXJ0U2Vjb25kc1RvUGFydHMoZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25UaW1lU3RhbXAgPSBzZWxmLmNyZWF0ZVRpbWVTdGFtcChkdXJhdGlvblRpbWVPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsVGltZUluZm8pIHRvdGFsVGltZUluZm8uaW5uZXJIVE1MID0gYC8ke2R1cmF0aW9uVGltZVN0YW1wfWA7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZUluZm8pIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgMDA6MDBgO1xyXG4gICAgICAgICAgICBpZiAoc2NydWJCYXIpIHNjcnViQmFyLmNoaWxkcmVuWzBdLnN0eWxlLndpZHRoID0gYDAlYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRpbWVVcGRhdGUocGxheWVyKSB7XHJcbiAgICAgICAgbGV0IHsgY3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGN1cnJlbnRUaW1lOiBzZWNvbmRzIH0gPSBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHNlY29uZHMgPSBzZWNvbmRzID4gdGhpcy5kdXJhdGlvbiA/IDAgOiBzZWNvbmRzO1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgdGltZUxhcHNlZCA9IHNlY29uZHMgLyB0aGlzLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG5cclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXNdO1xyXG5cclxuICAgICAgICBpZiAoc2NydWJCYXIpIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVsYXBzZWRFbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHNjcnViQmFyLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVsYXBzZWRFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7dGltZUxhcHNlZCAqIDEwMH0lYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5aW5nKCkge1xyXG4gICAgICAgIGxldCB7IHBsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGF1c2VkKCkge1xyXG4gICAgICAgIGxldCB7IHBsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwbGF5Q2xhc3NlcztcclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IHNjcnViQmFyLCB2b2x1bWVCYXIsIHBsYXlQYXVzZUNvbnRyb2xzLCBtdXRlQ29udHJvbHMsIHRyYWNrQ3Vlc0V2ZW50TmFtZSB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cyA9IGlWWGpzQnVzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuVElNRV9VUERBVEUsIHVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIHRoaXMud2hpbGVQYXVzZWQgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBBVVNFRCwgd2hpbGVQYXVzZWQpO1xyXG4gICAgICAgIHRoaXMud2hpbGVQbGF5aW5nID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZSU5HLCB3aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIHRoaXMuY2FuUGxheUNhbGxiYWNrID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgY2FuUGxheUNhbGxCYWNrKTtcclxuICAgICAgICB0aGlzLmNoYXB0ZXJDaGFuZ2UgPSBpVlhqc0J1cy5vbih0aGlzLnRyYWNrQ3Vlc0V2ZW50TmFtZS5PTl9DSEFQVEVSX1NUQVJULCBjaGFwdGVyQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSB0aGlzLnVwZGF0ZVRpbWUgPyB0aGlzLnVwZGF0ZVRpbWUgOiB1cGRhdGVUaW1lO1xyXG5cclxuICAgICAgICB2b2x1bWVCYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuYWRqdXN0Vm9sdW1lKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzY3J1YkJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNjcnViKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5UGF1c2VDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0UGxheVBhdXNlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtdXRlQ29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRNdXRlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5vbmNlKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIChwbGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXJTcGVjaWZpY0NvbnRyb2xzKHsgcGxheWVyIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYXB0ZXJDaGFuZ2UoY3VlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2hhcHRlckFjdGl2ZUNsYXNzZXMsIGNoYXB0ZXJMaXN0SXRlbUNsYXNzZXMsIGNoYXB0ZXJJbkFjdGl2ZUNsYXNzZXMgfSA9IHNlbGY7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXB0ZXJMaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNoYXB0ZXJMaXN0SXRlbUNsYXNzZXMpKTtcclxuICAgICAgICAgICAgY29uc3QgeyBpZDogY3VycmVudENoYXB0ZXJJZCB9ID0gY3VlO1xyXG5cclxuICAgICAgICAgICAgY2hhcHRlckxpc3QuZm9yRWFjaChjaGFwdGVyTGlzdEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgaWQ6IGNoYXB0ZXJJZCB9ID0gY2hhcHRlckxpc3RJdGVtO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFwdGVySWQgPT09IGN1cnJlbnRDaGFwdGVySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFwdGVyTGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShjaGFwdGVySW5BY3RpdmVDbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFwdGVyTGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChjaGFwdGVyQWN0aXZlQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcHRlckxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoY2hhcHRlckFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXB0ZXJMaXN0SXRlbS5jbGFzc0xpc3QuYWRkKGNoYXB0ZXJJbkFjdGl2ZUNsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNhblBsYXlDYWxsQmFjayhwbGF5ZXIsIF9zdGF0ZURhdGEpIHtcclxuICAgICAgICAgICAgc2VsZi5vblJlYWR5VG9QbGF5KHBsYXllciwgX3N0YXRlRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKHBsYXllcikge1xyXG4gICAgICAgICAgICBzZWxmLm9uVGltZVVwZGF0ZShwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hpbGVQYXVzZWQocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25QYXVzZWQocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdoaWxlUGxheWluZygpIHtcclxuICAgICAgICAgICAgc2VsZi5vblBsYXlpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudEJ5Q2xhc3NlcyhlbGVtZW50cywgY2xhc3Nlcykge1xyXG4gICAgICAgIGxldCBlbGVtZW50QXJyYXkgPSBlbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5ID9cclxuICAgICAgICAgICAgZWxlbWVudHMgOlxyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGVsZW1lbnRzKTtcclxuICAgICAgICBsZXQgdGhpc0VsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpc0VsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXNFbGVtZW50ID0gZWxlbWVudEFycmF5LmZpbmQoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpID49IDA7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUaW1lU3RhbXAodGltZU9iamVjdCkge1xyXG4gICAgICAgIGxldCB7IGhvdXJzLCByZW1haW5pbmdNaW51dGVzOiBtaW51dGVzLCByZW1haW5pbmdTZWNvbmRzOiBzZWNvbmRzIH0gPSB0aW1lT2JqZWN0O1xyXG4gICAgICAgIGxldCBob3VyU3RyaW5nID0gJyc7XHJcbiAgICAgICAgbGV0IG1pbnV0ZVN0cmluZyA9IG1pbnV0ZXMgPCAxMCA/XHJcbiAgICAgICAgICAgIGAwJHttaW51dGVzfTpgIDpcclxuICAgICAgICAgICAgYCR7bWludXRlc306YDtcclxuICAgICAgICBsZXQgc2Vjb25kU3RyaW5nID0gc2Vjb25kcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke3NlY29uZHN9YCA6XHJcbiAgICAgICAgICAgIGAke3NlY29uZHN9YDtcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgICAgICBob3VyU3RyaW5nID0gaG91cnMgPCAxMCA/XHJcbiAgICAgICAgICAgICAgICBgMCR7aG91cnN9OmAgOlxyXG4gICAgICAgICAgICAgICAgYCR7aG91cnN9OmA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2hvdXJTdHJpbmd9JHttaW51dGVTdHJpbmd9JHtzZWNvbmRTdHJpbmd9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0U2Vjb25kc1RvUGFydHMoc2Vjb25kcykge1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGxldCB0aW1lSW5mb3JtYXRpb24gPSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXHJcbiAgICAgICAgICAgIGhvdXJzOiBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCksXHJcbiAgICAgICAgICAgIHJlbWFpbmluZ1NlY29uZHM6IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nTWludXRlczogTWF0aC5mbG9vcihtaW51dGVzICUgNjApLFxyXG4gICAgICAgICAgICBzZWNvbmRzOiBzZWNvbmRzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGltZUluZm9ybWF0aW9uO1xyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNze1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBQbGF5ZXJDb250cm9sRXZlbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwicGxheVwiIDogJ2lWWDp2aWRlbzpwbGF5JyxcclxuICAgICAgICAgICAgXCJwYXVzZVwiIDogJ2lWWDp2aWRlbzpwYXVzZScsXHJcbiAgICAgICAgICAgIFwic2Vla1wiIDogJ2lWWDp2aWRlbzpzZWVrZWQnLFxyXG4gICAgICAgICAgICBcInBsYXlpbmdcIiA6IFwiaVZYOnZpZGVvOnBsYXlpbmdcIixcclxuICAgICAgICAgICAgXCJlbmRlZFwiIDogXCJpVlg6dmlkZW86ZW5kZWRcIixcclxuICAgICAgICAgICAgXCJwYXVzZWRcIiA6IFwiaVZYOnZpZGVvOnBhdXNlZFwiLFxyXG4gICAgICAgICAgICBcInNldFZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnLFxyXG4gICAgICAgICAgICBcImR1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpyZXF1ZXN0RHVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJnZXREdXJhdGlvblwiIDogXCJpVlg6dmlkZW86Z2V0RHVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJjYW5QbGF5XCIgOiBcImlWWDp2aWRlbzpjYW5wbGF5XCIsXHJcbiAgICAgICAgICAgIFwidGltZVVwZGF0ZVwiIDogXCJpVlg6dmlkZW86dGltZXVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBcImRpc3Bvc2VcIiA6IFwiaVZYOnZpZGVvOmRpc3Bvc2VcIixcclxuICAgICAgICAgICAgXCJ2b2x1bWVcIiA6ICdpVlg6dmlkZW86c2V0Vm9sdW1lJyAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGxvZykge1xuXHRcdHRoaXMubG9nID0gbG9nXG5cdH1cblxuXHRhc3NlcnQodGVzdCwgbmFtZSwgbWVzc2FnZSkge1xuXHRcdGxldCB7bG9nfSA9IHRoaXM7XG5cdFx0bGV0IHtzaG93OiBkZWJ1Z30gPSBsb2c7XG5cblx0XHRpZiAoIXRlc3QpIHtcblx0XHRcdGxldCBlcnJvck9iaiA9IHsgXG5cdFx0XHRcdG1lc3NhZ2UgOiBgJHtuYW1lfSBpcyBpbnZhbGlkOiAke21lc3NhZ2V9LmBcblx0XHRcdH07XG5cblx0XHRcdGlmKGRlYnVnKXtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoZXJyb3JPYmosIFwiQVNTRVJUXCIpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3JPYmoubWVzc2FnZSk7XG5cdFx0XHR9IFxuXHRcdH1cblxuXHRcdHJldHVybiB0ZXN0O1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFR5cGVWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdCh2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKVxyXG4gICAgfVxyXG5cclxuICAgIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdHJpbmcob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcclxuICAgIH1cclxuXHJcbiAgICBpc0Z1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNOdW1iZXIob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQm9vbGVhbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8ICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnZhbHVlT2YoKSA9PT0gJ2Jvb2xlYW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KG9iaikge1xyXG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbiAgICAgICAgbGV0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG9iaik7XHJcbiAgICAgICAgbGV0IGlzU3RyaW5nID0gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XHJcbiAgICAgICAgbGV0IGNoZWNrTGVuZ3RoID0gaXNBcnJheSB8fCBpc1N0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNOYU4ob2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBhcnNlcnMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHlvdSB0byBtYXAgYW4gb2JqZWN0IGJ5IHRoZSBrZXlzIG9mIGEgZ2l2ZW4gb2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIG9iamVjdCB0byBtYXA7XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIHJ1biBieSBlYWNoIHZhbHVlIGFuZCBrZXkgIFxyXG4gICAgICovXHJcbiAgICBtYXBLZXlzKG9iamVjdCwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuICAgICAgICBsZXQgbWFwcGVkQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWR1Y2VNYXApIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIG1hcHBlZEFycmF5LnB1c2goY2FsbGJhY2sodmFsLCBrZXkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKGJhc2UsIG1lcmdlZCwgaWdub3JlKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEtleXMgPSBPYmplY3Qua2V5cyhtZXJnZWQpO1xyXG4gICAgICAgIGxldCB1bmlvbmVkT2JqZWN0ID0gbmV3IE9iamVjdChiYXNlKTtcclxuXHJcbiAgICAgICAgbWVyZ2VkS2V5cy5mb3JFYWNoKChtZXJnZWRLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpZ25vcmUgJiYgaWdub3JlLmluZGV4T2YobWVyZ2VkS2V5KSA+PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHVuaW9uZWRPYmplY3RbbWVyZ2VkS2V5XSA9IG1lcmdlZFttZXJnZWRLZXldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5pb25lZE9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZWR1Y2Uob2JqZWN0LCBjYWxsYmFjaywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gY2FsbGJhY2soZGVmYXVsdFZhbHVlLCB2YWwsIGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVyYXRlcyB0aHJvdWdoIGEgY29sbGVjdGlvbiB0byBmaW5kIGlmIGFueSBvZiB0aGUgdmFsdWVzIFxyXG4gICAgICogd2l0aCB0aGUga2V5cyBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgYW55RW1wdHkoY29sbGVjdGlvbiwga2V5cykge1xyXG4gICAgICAgIGxldCBoYXNFbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGVsZW1lbnRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5pc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5pbmRleE9mKGVsZW1lbnQpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrRWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0VsZW1lbnRLZXlzID0gT2JqZWN0LmtleXMoY2hlY2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudEtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gY2hlY2tFbGVtZW50W2tleV0gPT09IGVsZW1lbnRba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hlY2tFbGVtZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudC5mb3JFYWNoKCh0ZXN0RWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSB0ZXN0RWxlbWVudCA9PT0gYXJyYXlFbGVtZW50W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZShvYmplY3QsIHBhdGgsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGEgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIG8gPSBvYmplY3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbiA9IGFbaV07XHJcbiAgICAgICAgICAgIGlmIChuIGluIG8pIHtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb1tuXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb1thW2EubGVuZ3RoIC0gMV1dID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWVGcm9tUGF0aChwYXRoLCBvYmplY3QpIHtcclxuICAgICAgICBsZXQgcGF0aFBhcnRzID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBvYmplY3Q7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICBwYXRoUGFydHMuZm9yRWFjaCgocGF0aFBhcnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkocGF0aFBhcnQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gb2xkRGF0YVtwYXRoUGFydF07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGN1cnJlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgb2xkRGF0YSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpbiBhbiBhcnJheSBvZiBvYmplY3RzIHRvIHNlZSBpZiB0aGUgdmFsdWVzIFxyXG4gICAgICogYXQgdGhlIGtleXMgaXMgdW5pcXVlIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRpY2F0aW5nIFxyXG4gICAgICogaWYgdGhleSBhcmUgdW5pcXVlIGFuZCBhbnkgZXJyb3JzIHRoYXQgZG9uJ3QgbWF0Y2ggZm9yIFxyXG4gICAgICogY29ycmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgaXNVbmlxdWUoY29sbGVjdGlvbiA9IFtdLCBrZXlzID0gW10pIHtcclxuICAgICAgICBsZXQgaGFzVW5pcXVlID0ge1xyXG4gICAgICAgICAgICBpc1VuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFsbFVuaXF1ZVZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0gPSBbXTtcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdFVuaXF1ZSA9IHNlbGYuaGFzKGFsbFVuaXF1ZVZhbHVlc1trZXldLCBlbGVtZW50W2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3RVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmlzVW5pcXVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldLnB1c2goZWxlbWVudFtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc1VuaXF1ZTtcclxuICAgIH1cclxufTsiXX0=
