(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _audio = require("./audio.js");

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

},{"./audio.js":2}],2:[function(require,module,exports){
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

},{"./index.js":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("./index.js");

var _index2 = _interopRequireDefault(_index);

var _video = require("./video.js");

var _video2 = _interopRequireDefault(_video);

var _http = require("./http.js");

var _http2 = _interopRequireDefault(_http);

var _iVXio = require("./iVXio.js");

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

},{"./http.js":4,"./iVXio.js":6,"./index.js":7,"./video.js":11}],4:[function(require,module,exports){
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

},{"./index.js":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXio = require("./iVXio.js");

var _iVXio2 = _interopRequireDefault(_iVXio);

var _errors = require("./errors.js");

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

},{"./errors.js":3,"./iVXio.js":6}],6:[function(require,module,exports){
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

},{"./index.js":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

        _this.LOGGING = "log";

        var logTypes = {
            ERROR: "error",
            WARN: "warn",
            TRACE: "trace",
            LOG: ""
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

},{"./index.js":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _state = require("./state.js");

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

},{"./state.js":10}],10:[function(require,module,exports){
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

},{"./index.js":7}],11:[function(require,module,exports){
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

},{"./index.js":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iVXioActions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iVXioErrors = require("../../../constants/iVXio.errors.js");

var _iVXioErrors2 = _interopRequireDefault(_iVXioErrors);

var _logging = require("../../../utilities/logging.js");

var _logging2 = _interopRequireDefault(_logging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var iVXioErrors = new _iVXioErrors2.default();

/**
 * Adds a layer of transformation to iVXio's host functionality
 * to work with the Action system in iVXjs.
 */

var iVXioActions = exports.iVXioActions = function () {

    /**
     * Pulls the iVXio's experience host that this class 
     * will use to set various experience data.
     * 
     * @param {ExperienceHost} experience - current instance of iVXio's
     * experience host.
     */
    function iVXioActions(experience) {
        var iVXjsLog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _logging2.default(false, experience.Bus);

        _classCallCheck(this, iVXioActions);

        /**
         * The experience host that will perform the 
         * actions to the platform
         * 
         * @type {ExperienceHost}
         */
        this.experience = experience;
        this.iVXjsLog = iVXjsLog;
    }

    /**
     * Translates the "animatePageElement" from the platform to
     * iVXjs's action "animateElement."
     * 
     * @param {object} eventArgs - animate page element's event object 
     * with a target id.
     * 
     * @return {Promise} - indicates the animation to an element is finished.
     */


    _createClass(iVXioActions, [{
        key: "animatePageElement",
        value: function animatePageElement(eventArgs) {
            var element = '';

            if (eventArgs.targetID) {
                element = '#' + eventArgs.targetID;
            } else {
                element = eventArgs.element;
            }

            return this.experience.animateElement({
                element: element,
                animationClass: eventArgs.animation
            });
        }

        /**
         * The platform utilizes .NET's time format and requires the date 
         * value to be in a specific format for Date/Datetime inputs. 
         * 
         * @param {string} key - experience key to pull the input display.
         * @param {Date} date - the date to transform into .NET safe string.
         * @return {string} - correctly formatted date string for .NET.
         * 
         */

    }, {
        key: "formatDateForPlatform",
        value: function formatDateForPlatform(key, date) {
            var inputs = this.experience.story.inputs;

            var input = inputs[key];
            var display = input.display;


            switch (display) {
                case "Date":
                    var dateString = date.getFullYear() + "-" + getMonth(date.getMonth()) + "-" + getDate(date.getDate());

                    return dateString;
            }

            function getMonth(monthNum) {
                var correctedMonthNum = (monthNum + 1) % 13;

                return correctedMonthNum >= 10 ? correctedMonthNum : "0" + correctedMonthNum;
            }

            function getDate(dateNum) {
                return dateNum >= 10 ? dateNum : "0" + dateNum;
            }
        }

        /**
         * Sends the custom event in the event args for the 
         * platform to record.
         * 
         * @param {object} eventArgs - all event arguments
         * @param {string} eventArgs.customEvent - event name to be recorded
         * by the platform.
         * @return {Promise} - will indicate if this event was successfully recorded by the platform.
         */

    }, {
        key: "recordEvent",
        value: function recordEvent(eventArgs) {
            if ((typeof eventArgs === "undefined" ? "undefined" : _typeof(eventArgs)) === 'object') {
                var customEvent = eventArgs.customEvent;


                try {
                    return this.experience.recordEvent(customEvent);
                } catch (e) {
                    this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                    this.iVXjsLog.error(e, "IVX_IO");
                }
            }
        }

        /**
         * Sends the setConverted event with a label if one is provided.
         * 
         * @param {object} eventArgs - all event arguments
         * @param {string} eventArgs.label - converted label that will be recorded
         * by the platform.
         * @return {Promise} - will indicate if this setConverted was successful by the platform.
         */

    }, {
        key: "setConverted",
        value: function setConverted(eventArgs) {
            if ((typeof eventArgs === "undefined" ? "undefined" : _typeof(eventArgs)) === 'object') {
                var label = eventArgs.label;


                try {
                    return this.experience.setConverted(label);
                } catch (e) {
                    this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                    this.iVXjsLog.error(e, "IVX_IO");
                }
            }
        }

        /**
         * Sends the setCompleted event.
         * 
         * @param {object} eventArgs - all event arguments
         * @return {Promise} - will indicate if this setComplete was successful by the platform.
         */

    }, {
        key: "setComplete",
        value: function setComplete() {
            var eventArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if ((typeof eventArgs === "undefined" ? "undefined" : _typeof(eventArgs)) === 'object') {
                try {
                    return this.experience.setComplete();
                } catch (e) {
                    this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                    this.iVXjsLog.error(e, "IVX_IO");
                }
            }
        }

        /**
         * Sends the setData event to the platform with the key and  
         * value in the eventArgs.
         * 
         * @param {object} eventArgs - all event arguments
         * @param {string} eventArgs.key - experience data key to be set.
         * @param {string} eventArgs.value - experience data value to be set to.  
         * @return {Promise} - will indicate if this data was successfully updated to the platform.
         */

    }, {
        key: "setData",
        value: function setData(eventArgs) {
            if ((typeof eventArgs === "undefined" ? "undefined" : _typeof(eventArgs)) === 'object') {
                var key = eventArgs.key,
                    value = eventArgs.value;

                var self = this;

                if (typeof this.experience.data[key] === 'undefined' || this.experience.data[key] === null) {
                    this.experience.Bus.emit('iVXjs:iVXio:error:event-not-fired', eventArgs, { message: "iVXjs Error Message: Input not found" });
                    this.iVXjsLog.error({ message: 'iVXjs Error Message: Input not found' }, "IVX_IO");
                    return;
                }

                if (value instanceof Date) {
                    value = this.formatDateForPlatform(key, value);

                    return this.experience.setData(key, value);
                }

                try {
                    return this.experience.setData(key, value);
                } catch (e) {
                    this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                    this.iVXjsLog.error(e);
                }
            }
        }

        /**
         * Sends the setMilestone with the milestone defined in the 
         * eventArgs object.
         * 
         * @param {object} eventArgs - holds the milestone to be send to the platform.
         * @param {string} eventArgs.milestone - milestone to be set.
         * @return {Promise} - indicates if this milestone was set on the platform.
         */

    }, {
        key: "setMilestone",
        value: function setMilestone(eventArgs) {
            if ((typeof eventArgs === "undefined" ? "undefined" : _typeof(eventArgs)) === 'object') {
                var milestone = eventArgs.milestone;


                try {
                    return this.experience.setMilestone(milestone);
                } catch (e) {
                    this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                    this.iVXjsLog.error(e, "IVX_IO");
                }
            }
        }
    }]);

    return iVXioActions;
}();

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/logging.js":34}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evaluator = require('../ivx-js/evaluator.js');

var _evaluator2 = _interopRequireDefault(_evaluator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Evaluator) {
    _inherits(_class, _Evaluator);

    function _class(experience, customEvaluator) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, experience, customEvaluator));
    }

    _createClass(_class, [{
        key: 'storyEvents',
        value: function storyEvents(lhs, is, storyEvent) {
            var experience = this.experience;
            var events = experience.events;


            if (storyEvent === 'none') {
                return noEventFired(is, events, experience);
            }

            return this[is](storyEvent, events);

            function noEventFired(is, events, experience) {
                var isFired = is === 'fired';

                return events.length <= 0 && isFired;
            }
        }
    }, {
        key: 'fired',
        value: function fired(event, events) {
            var firedEvent = events.find(function (eventFired, index) {
                return eventFired === event;
            });

            return typeof firedEvent !== 'undefined';
        }
    }, {
        key: 'notFired',
        value: function notFired(event, events) {
            var firedEvent = events.find(function (eventFired, index) {
                return eventFired === event;
            });

            return typeof firedEvent === 'undefined';
        }
    }, {
        key: 'progress',
        value: function progress(lhs, is, _progress) {
            var experience = this.experience;
            var currentStoryProgress = experience.progress,
                currentMilestone = experience.milestone,
                story = experience.story;
            var progressMap = story.progressMap;

            var currentProgress = void 0;
            var currentProgressValue = -1;
            var currentMilestoneValue = -1;

            if (currentMilestone && currentMilestone.length > 0) {
                var currentMilestoneString = currentMilestone[0].toLowerCase() + currentMilestone.substring(1);

                currentMilestoneValue = progressMap[currentMilestoneString] ? progressMap[currentMilestoneString] : -1;
            }

            if (isStoryProgress(currentStoryProgress)) {
                var currentProgressString = currentStoryProgress[0].toLowerCase() + currentStoryProgress.substring(1);

                currentProgressValue = progressMap[currentProgressString];
            }

            _progress = _progress[0].toLowerCase() + _progress.substring(1);

            var progressValue = progressMap[_progress];
            var evaluateProgress = currentProgressValue > currentMilestoneValue ? currentProgressValue : currentMilestoneValue;

            return this[is](evaluateProgress, progressValue);

            function isStoryProgress(progress) {
                return progress === 'Started' || progress === 'Completed' || progress === 'Converted';
            }
        }
    }]);

    return _class;
}(_evaluator2.default);

exports.default = _class;

},{"../ivx-js/evaluator.js":31}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iVXio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require('./actions.js');

var _rules = require('./rules.js');

var _actions2 = require('../ivx-js/actions.js');

var _typeParsers = require('../../../utilities/type-parsers.js');

var _asserts = require('../../../utilities/asserts.js');

var _index = require('./input-validators/index.js');

var _index2 = _interopRequireDefault(_index);

var _iVXioErrors = require('../../../constants/iVXio.errors.js');

var _iVXioErrors2 = _interopRequireDefault(_iVXioErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();
var objectParser = new _typeParsers.ObjectParsers();

/**
 * Generates an iVXio data module that iVXjs can use for 
 * navigation, data setting and progress.
 */

var iVXio = exports.iVXio = function () {

  /**
   * Pulls in any module settings and the global settings
   * for this iVXjs experience to set up this iVXio 
   * enhance data object.
   * 
   * @param {object} moduleSettings - settings to be passed in to the 
   * iVXio Expereince host.
   * @param {object} iVXjsSettings - global settings for this iVXjs experience.
   */
  function iVXio(experienceHostSettings) {
    var iVXjsSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var Bus = arguments[2];
    var iVXjsLog = arguments[3];

    _classCallCheck(this, iVXio);

    /**
     * Module settings for iVXio which will be all the settings
     * used with the iVXio's experience host such as story keys and
     * funnels.
     * 
     * @type {object}
     */
    this.experienceHostSettings = experienceHostSettings;

    /**
     * Global settings for this iVXjs experience 
     * 
     * @type {object}
     */
    this.iVXjsSettings = iVXjsSettings;
    this.Bus = Bus;
    this.iVXjsLog = iVXjsLog;
  }

  /**
   * Takes the current settings and then enhances the story data 
   * pulled from the iVXio experience host and enhances them to 
   * work with iVXjs.
   * 
   * @return {Promise} - a promise that evaluates whether this experience 
   * was successfully enhanced.
   */


  _createClass(iVXio, [{
    key: 'enhance',
    value: function enhance() {
      var _this = this;

      var _experienceHostSettin = this.experienceHostSettings,
          experienceHostSettings = _experienceHostSettin === undefined ? {} : _experienceHostSettin,
          _iVXjsSettings = this.iVXjsSettings,
          iVXjsSettings = _iVXjsSettings === undefined ? {} : _iVXjsSettings;

      var iVXioErrors = new _iVXioErrors2.default();
      var self = this;
      var enhancementPromise = new Promise(function (resolve, reject) {
        if (typeof iVX === 'undefined') {
          window.setTimeout(function () {
            self.Bus.emit(iVXioErrors.PLATFORM_UNAVAILABLE, {});
          }, 100);
          reject();
          return;
        }

        self.Bus.once(iVXioErrors.EXPERIENCE, function (error) {
          reject(error);
        });

        iVX(experienceHostSettings).then(function (iVX) {
          if (!iVX || !iVX.experience || !iVX.experience.story || !iVX.experience.story.data) {
            window.setTimeout(function () {
              self.Bus.emit(iVXioErrors.PLATFORM_UNAVAILABLE, {});
            }, 100);
            return;
          }
          var _iVXjsSettings$experi = iVXjsSettings.experience,
              experienceSettings = _iVXjsSettings$experi === undefined ? {} : _iVXjsSettings$experi,
              customRules = iVXjsSettings.rules;

          var defaultActions = objectParser.merge(new _actions2.Actions(), experienceSettings);
          var experience = objectParser.merge(defaultActions, iVX.experience);
          var modifiedActions = new _actions.iVXioActions(experience, _this.iVXjsLog);
          var _iVX$experience$story = iVX.experience.story.data,
              storyUI = _iVX$experience$story.ui,
              storyValidation = _iVX$experience$story.validation;


          iVX.experience.story.data.metadata = iVX.experience.story.data.metadata ? iVX.experience.story.data.metadata : {};

          var rules = new _rules.iVXioRules(experience, customRules).rules;
          var states = new _index2.default(iVX.experience.story.data.states, iVX.experience.story.inputs, self, reject).states;

          experience.whiteList = ['self', 'http://ivx-xapi.*.inf-env.com/**', 'https://ivx-xapi.*.inf-env.com/**', 'https://xapi.ivx.io/**'];

          iVX.experience.story.data.states = states;
          iVX.experience.story.data.metadata.title = iVX.experience.story.data.metadata.title ? iVX.experience.story.data.metadata.title : "iVX Story Player";

          var enhancediVXjsSettings = {
            ui: iVXjsSettings.ui,
            validation: iVXjsSettings.validation,
            config: iVX.experience.story.data,
            experience: experience,
            rules: rules,
            actions: modifiedActions
          };

          resolve(enhancediVXjsSettings);
        }, function (error) {
          self.Bus.emit(iVXioErrors.EXPERIENCE, error);
          reject(error);
        });
      });

      return enhancementPromise;
    }
  }]);

  return iVXio;
}();

module.export = initializeiVXIO;

if (angular && angular.module('ivx-js')) {
  angular.module('ivx-js').constant('iVXjs.data.iVXio', initializeiVXIO);
}

function initializeiVXIO() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  settings.module = iVXio;

  return settings;
};

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/asserts.js":33,"../../../utilities/type-parsers.js":35,"../ivx-js/actions.js":30,"./actions.js":12,"./input-validators/index.js":19,"./rules.js":29}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var _storyInputData = this.storyInputData,
                storyInputData = _storyInputData === undefined ? {} : _storyInputData,
                _jsonInputData = this.jsonInputData,
                jsonInputData = _jsonInputData === undefined ? {} : _jsonInputData;

            var rawInputData = Object.assign({}, jsonInputData);
            var newStoryInputData = Object.assign({}, storyInputData);

            rawInputData.type = "cascading-options";
            rawInputData.dataTree = newStoryInputData.dataTree;

            return rawInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;
            var _jsonInputData$button = jsonInputData.buttons,
                buttons = _jsonInputData$button === undefined ? [] : _jsonInputData$button;

            var hasFalse = false;
            var hasTrue = false;
            var newButtons = buttons.reduce(function (buttonArray, buttonData, index) {
                var value = buttonData.value;

                var isFalse = typeof value === "boolean" && !value;
                var isTrue = typeof value === "boolean" && value;

                if (isTrue && !hasTrue) {
                    buttonArray[0] = buttonData;
                    hasTrue = true;
                }

                if (isFalse && !hasFalse) {
                    buttonArray[1] = buttonData;
                    hasFalse = true;
                }

                return buttonArray;
            }, []);

            if (!hasTrue) {
                newButtons[0] = {
                    value: true,
                    label: "True"
                };
            }

            if (!hasFalse) {
                newButtons[1] = {
                    value: false,
                    label: "False"
                };
            }

            jsonInputData.buttons = newButtons;

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkboxButtons = require("./checkbox.buttons.js");

var _checkboxButtons2 = _interopRequireDefault(_checkboxButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;
            var type = jsonInputData.type;


            if (type === "buttons") {
                return new _checkboxButtons2.default(jsonInputData, storyInputData).input;
            }

            jsonInputData.type = "checkbox";

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"./checkbox.buttons.js":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;


            jsonInputData.type = "email";

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

//Validators 


var _iVXioErrors = require("../../../../constants/iVXio.errors.js");

var _iVXioErrors2 = _interopRequireDefault(_iVXioErrors);

var _cascadingOptions = require("./cascading-options.js");

var _cascadingOptions2 = _interopRequireDefault(_cascadingOptions);

var _checkbox = require("./checkbox.js");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _email = require("./email.js");

var _email2 = _interopRequireDefault(_email);

var _number = require("./number.js");

var _number2 = _interopRequireDefault(_number);

var _options = require("./options.js");

var _options2 = _interopRequireDefault(_options);

var _textarea = require("./textarea.js");

var _textarea2 = _interopRequireDefault(_textarea);

var _textLarge = require("./text-large.js");

var _textLarge2 = _interopRequireDefault(_textLarge);

var _textMedium = require("./text-medium.js");

var _textMedium2 = _interopRequireDefault(_textMedium);

var _textShort = require("./text-short.js");

var _textShort2 = _interopRequireDefault(_textShort);

var _url = require("./url.js");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorNames = new _iVXioErrors2.default();

var _class = function () {
    function _class(states, storyInputs, experience, reject) {
        _classCallCheck(this, _class);

        this.rawStates = [].concat(states);
        this.storyInputs = Object.assign({}, storyInputs);
        this.experience = experience;
        this.reject = reject;
    }

    _createClass(_class, [{
        key: "validateInputStates",
        value: function validateInputStates(states) {
            var self = this;
            return states.map(function (state, index) {
                if (state.type === "input") {
                    var _state$inputs = state.inputs,
                        inputs = _state$inputs === undefined ? [] : _state$inputs;


                    state.inputs = self.validateInputs(inputs, state, index);
                }

                return state;
            });
        }
    }, {
        key: "validateInputs",
        value: function validateInputs() {
            var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var stateIndex = arguments[2];
            var inputValidators = this.inputValidators,
                _storyInputs = this.storyInputs,
                storyInputs = _storyInputs === undefined ? {} : _storyInputs,
                experience = this.experience;

            var self = this;

            return inputs.map(function (input, index) {
                var name = input.name;

                var storyInput = storyInputs[name];

                if (!storyInput) {
                    var stateName = state.name,
                        id = state.id;

                    var errorMessage = "\niVX.io Story input with key " + name + " can not be found:\nState Id : " + state.id + "\nState Name : " + stateName + "\nState Index : " + stateIndex + "\nInput Name: " + name + "\nInput Index: " + index + "\n                ";
                    experience.Bus.emit(errorNames.EXPERIENCE, { message: errorMessage });
                    experience.iVXjsLog.error({
                        message: errorMessage
                    }, "EXPERIENCE");
                } else {
                    var display = storyInput.display;

                    var validator = inputValidators[display];
                    var newInput = self.globalAttributesSet(storyInput, input);

                    if (validator) {
                        return new validator(newInput, storyInput).input;
                    }
                }

                return input;
            });
        }
    }, {
        key: "globalAttributesSet",
        value: function globalAttributesSet(storyInputData, jsonInputData) {
            var _storyInputData$attri = storyInputData.attributes,
                storyAttributes = _storyInputData$attri === undefined ? {} : _storyInputData$attri;
            var _storyAttributes$requ = storyAttributes.required,
                storyRequired = _storyAttributes$requ === undefined ? "false" : _storyAttributes$requ;

            var newInput = Object.assign({}, jsonInputData);
            var _newInput$attributes = newInput.attributes,
                inputAttributes = _newInput$attributes === undefined ? {} : _newInput$attributes;
            var _inputAttributes$requ = inputAttributes.required,
                inputRequired = _inputAttributes$requ === undefined ? false : _inputAttributes$requ;


            newInput.attributes = Object.assign({}, inputAttributes, {
                required: storyRequired === "true" ? true : inputRequired
            });

            return newInput;
        }
    }, {
        key: "states",
        get: function get() {
            return this.validateInputStates(this.rawStates);
        }
    }, {
        key: "inputValidators",
        get: function get() {
            return {
                CascadingOptions: _cascadingOptions2.default,
                Checkbox: _checkbox2.default,
                Email: _email2.default,
                Number: _number2.default,
                Options: _options2.default,
                TextArea: _textarea2.default,
                TextLarge: _textLarge2.default,
                TextMedium: _textMedium2.default,
                TextShort: _textShort2.default,
                Url: _url2.default
            };
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../../../../constants/iVXio.errors.js":5,"./cascading-options.js":15,"./checkbox.js":17,"./email.js":18,"./number.js":20,"./options.js":22,"./text-large.js":24,"./text-medium.js":25,"./text-short.js":26,"./textarea.js":27,"./url.js":28}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;
            var _storyInputData$attri = storyInputData.attributes,
                storyInputAttributes = _storyInputData$attri === undefined ? {} : _storyInputData$attri;
            var _jsonInputData$attrib = jsonInputData.attributes,
                jsonInputAttributes = _jsonInputData$attrib === undefined ? {} : _jsonInputData$attrib;
            var _storyInputAttributes = storyInputAttributes.max,
                storyMaxAttribute = _storyInputAttributes === undefined ? Number.MAX_SAFE_INTEGER : _storyInputAttributes,
                _storyInputAttributes2 = storyInputAttributes.min,
                storyMinAttribute = _storyInputAttributes2 === undefined ? Number.MIN_SAFE_INTEGER : _storyInputAttributes2,
                _storyInputAttributes3 = storyInputAttributes.step,
                storyStepAttribute = _storyInputAttributes3 === undefined ? 1 : _storyInputAttributes3;
            var _jsonInputAttributes$ = jsonInputAttributes.max,
                jsonMaxAttribute = _jsonInputAttributes$ === undefined ? Number.MIN_SAFE_INTEGER : _jsonInputAttributes$,
                _jsonInputAttributes$2 = jsonInputAttributes.min,
                jsonMinAttribute = _jsonInputAttributes$2 === undefined ? Number.MAX_SAFE_INTEGER : _jsonInputAttributes$2,
                _jsonInputAttributes$3 = jsonInputAttributes.step,
                jsonStepAttribute = _jsonInputAttributes$3 === undefined ? 1 : _jsonInputAttributes$3;

            var useStoryMin = jsonMinAttribute > storyMinAttribute;
            var useStoryMax = jsonMaxAttribute < storyMaxAttribute;
            var useStoryStep = typeof storyStepAttribute !== 'undefined';

            jsonInputData.type = "number";
            jsonInputData.attributes = Object.assign({}, jsonInputData.attributes, {
                min: new Number(useStoryMin ? storyMinAttribute : jsonMinAttribute).valueOf(),
                max: new Number(useStoryMax ? storyMaxAttribute : jsonMaxAttribute).valueOf(),
                step: new Number(useStoryStep ? storyStepAttribute : jsonStepAttribute).valueOf()
            });

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        var jsonInputData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var _jsonInputData = this.jsonInputData,
                jsonInputData = _jsonInputData === undefined ? {} : _jsonInputData,
                _storyInputData = this.storyInputData,
                storyInputData = _storyInputData === undefined ? {} : _storyInputData;
            var _jsonInputData$button = jsonInputData.buttons,
                buttons = _jsonInputData$button === undefined ? [] : _jsonInputData$button;
            var _storyInputData$optio = storyInputData.options,
                options = _storyInputData$optio === undefined ? [] : _storyInputData$optio;

            var newButtons = options.map(function (option) {
                var button = hasButton(option, buttons);

                if (button) {
                    return button;
                } else {
                    var display = option.display,
                        value = option.value;


                    return {
                        value: value,
                        label: display
                    };
                }
            });

            var newInputData = Object.assign({}, jsonInputData, {
                buttons: newButtons,
                type: "buttons"
            });

            return newInputData;

            function hasButton(option) {
                var buttons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                return buttons.find(function (button) {
                    return button.value === option.value;
                });
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _optionsButtons = require("./options.buttons.js");

var _optionsButtons2 = _interopRequireDefault(_optionsButtons);

var _optionsRadio = require("./options.radio.js");

var _optionsRadio2 = _interopRequireDefault(_optionsRadio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        var jsonInputData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;
            var type = jsonInputData.type;


            if (type === "buttons") {
                return new _optionsButtons2.default(jsonInputData, storyInputData).input;
            }

            if (type === "radio") {
                return new _optionsRadio2.default(jsonInputData, storyInputData).input;
            }

            var options = storyInputData.options;


            var newInputData = Object.assign({}, jsonInputData, {
                options: options,
                type: "options"
            });

            return newInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"./options.buttons.js":21,"./options.radio.js":23}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        var jsonInputData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = jsonInputData;
        this.storyInputData = storyInputData;
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var _jsonInputData = this.jsonInputData,
                jsonInputData = _jsonInputData === undefined ? {} : _jsonInputData,
                _storyInputData = this.storyInputData,
                storyInputData = _storyInputData === undefined ? {} : _storyInputData;
            var _jsonInputData$radioB = jsonInputData.radioButtons,
                radioButtons = _jsonInputData$radioB === undefined ? [] : _jsonInputData$radioB;
            var _storyInputData$optio = storyInputData.options,
                options = _storyInputData$optio === undefined ? [] : _storyInputData$optio;

            var newRadioButtons = options.map(function (option) {
                var display = option.display,
                    value = option.value;

                var radio = hasRadio(option, radioButtons);

                if (radio) {
                    var newRadio = Object.assign({}, radio);

                    return newRadio;
                } else {

                    return {
                        value: value,
                        label: display
                    };
                }
            });

            var newInputData = Object.assign({}, jsonInputData, {
                radioButtons: newRadioButtons,
                type: "radio"
            });

            return newInputData;

            function hasRadio(option) {
                var radioButtons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                return radioButtons.find(function (radioButton) {
                    return radioButton.value === option.value;
                });
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;

            var maxCharacters = 256;
            var _storyInputData$attri = storyInputData.attributes,
                storyInputAttributes = _storyInputData$attri === undefined ? {} : _storyInputData$attri;
            var _jsonInputData$attrib = jsonInputData.attributes,
                jsonInputAttributes = _jsonInputData$attrib === undefined ? {} : _jsonInputData$attrib;
            var _storyInputAttributes = storyInputAttributes.maxlength,
                storyMaxLengthAttribute = _storyInputAttributes === undefined ? maxCharacters : _storyInputAttributes,
                storyMinLengthAttribute = storyInputAttributes.minlength;
            var _jsonInputAttributes$ = jsonInputAttributes.maxlength,
                jsonMaxLengthAttribute = _jsonInputAttributes$ === undefined ? maxCharacters : _jsonInputAttributes$,
                _jsonInputAttributes$2 = jsonInputAttributes.minlength,
                jsonMinLengthAttribute = _jsonInputAttributes$2 === undefined ? 0 : _jsonInputAttributes$2;


            jsonInputData.type = "text";
            jsonInputData.attributes = Object.assign({}, jsonInputData.attributes, {
                maxlength: new Number(storyMaxLengthAttribute < maxCharacters ? storyMaxLengthAttribute : jsonMaxLengthAttribute).valueOf(),
                minlength: new Number(typeof storyMinLengthAttribute !== 'undefined' ? storyMinLengthAttribute : jsonMinLengthAttribute).valueOf()
            });

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;

            var maxCharacters = 128;
            var _storyInputData$attri = storyInputData.attributes,
                storyInputAttributes = _storyInputData$attri === undefined ? {} : _storyInputData$attri;
            var _jsonInputData$attrib = jsonInputData.attributes,
                jsonInputAttributes = _jsonInputData$attrib === undefined ? {} : _jsonInputData$attrib;
            var _storyInputAttributes = storyInputAttributes.maxlength,
                storyMaxLengthAttribute = _storyInputAttributes === undefined ? maxCharacters : _storyInputAttributes,
                storyMinLengthAttribute = storyInputAttributes.minlength;
            var _jsonInputAttributes$ = jsonInputAttributes.maxlength,
                jsonMaxLengthAttribute = _jsonInputAttributes$ === undefined ? maxCharacters : _jsonInputAttributes$,
                _jsonInputAttributes$2 = jsonInputAttributes.minlength,
                jsonMinLengthAttribute = _jsonInputAttributes$2 === undefined ? 0 : _jsonInputAttributes$2;


            jsonInputData.type = "text";
            jsonInputData.attributes = Object.assign({}, jsonInputData.attributes, {
                maxlength: new Number(storyMaxLengthAttribute < maxCharacters ? storyMaxLengthAttribute : jsonMaxLengthAttribute).valueOf(),
                minlength: new Number(typeof storyMinLengthAttribute !== 'undefined' ? storyMinLengthAttribute : jsonMinLengthAttribute).valueOf()
            });

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;

            var maxCharacters = 64;
            var _storyInputData$attri = storyInputData.attributes,
                storyInputAttributes = _storyInputData$attri === undefined ? {} : _storyInputData$attri;
            var _jsonInputData$attrib = jsonInputData.attributes,
                jsonInputAttributes = _jsonInputData$attrib === undefined ? {} : _jsonInputData$attrib;
            var _storyInputAttributes = storyInputAttributes.maxlength,
                storyMaxLengthAttribute = _storyInputAttributes === undefined ? maxCharacters : _storyInputAttributes,
                storyMinLengthAttribute = storyInputAttributes.minlength;
            var _jsonInputAttributes$ = jsonInputAttributes.maxlength,
                jsonMaxLengthAttribute = _jsonInputAttributes$ === undefined ? maxCharacters : _jsonInputAttributes$,
                _jsonInputAttributes$2 = jsonInputAttributes.minlength,
                jsonMinLengthAttribute = _jsonInputAttributes$2 === undefined ? 0 : _jsonInputAttributes$2;


            jsonInputData.type = "text";
            jsonInputData.attributes = Object.assign({}, jsonInputData.attributes, {
                maxlength: new Number(storyMaxLengthAttribute < maxCharacters ? storyMaxLengthAttribute : jsonMaxLengthAttribute).valueOf(),
                minlength: new Number(typeof storyMinLengthAttribute !== 'undefined' ? storyMinLengthAttribute : jsonMinLengthAttribute).valueOf()
            });

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;

            var maxCharacters = 1024;
            var _storyInputData$attri = storyInputData.attributes,
                storyInputAttributes = _storyInputData$attri === undefined ? {} : _storyInputData$attri;
            var _jsonInputData$attrib = jsonInputData.attributes,
                jsonInputAttributes = _jsonInputData$attrib === undefined ? {} : _jsonInputData$attrib;
            var _storyInputAttributes = storyInputAttributes.maxlength,
                storyMaxLengthAttribute = _storyInputAttributes === undefined ? maxCharacters : _storyInputAttributes,
                storyMinLengthAttribute = storyInputAttributes.minlength;
            var _jsonInputAttributes$ = jsonInputAttributes.maxlength,
                jsonMaxLengthAttribute = _jsonInputAttributes$ === undefined ? maxCharacters : _jsonInputAttributes$,
                _jsonInputAttributes$2 = jsonInputAttributes.minlength,
                jsonMinLengthAttribute = _jsonInputAttributes$2 === undefined ? 0 : _jsonInputAttributes$2;


            jsonInputData.type = "text";
            jsonInputData.attributes = Object.assign({}, jsonInputData.attributes, {
                maxlength: new Number(storyMaxLengthAttribute < maxCharacters ? storyMaxLengthAttribute : jsonMaxLengthAttribute).valueOf(),
                minlength: new Number(typeof storyMinLengthAttribute !== 'undefined' ? storyMinLengthAttribute : jsonMinLengthAttribute).valueOf()
            });

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(jsonInputData) {
        var storyInputData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    _createClass(_class, [{
        key: "input",
        get: function get() {
            var jsonInputData = this.jsonInputData,
                storyInputData = this.storyInputData;


            jsonInputData.type = "url";

            return jsonInputData;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iVXioRules = undefined;

var _evaluator = require("./evaluator.js");

var _evaluator2 = _interopRequireDefault(_evaluator);

var _rules = require("../ivx-js/rules.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Generates an iVXio Rules function that allows navigation and 
 * rule evaluation based on both experience data and progress.
 */
var iVXioRules = exports.iVXioRules = function (_Rules) {
  _inherits(iVXioRules, _Rules);

  /**
   * Attaches the current experience to this class to help
   * process both data and progress informaiton.
   * 
   * @param {iVXioExperiece} experience - iVXio Experience object
   * containing all the information for these rules to evaluate on.
   */
  function iVXioRules(experience, customEvaluator) {
    _classCallCheck(this, iVXioRules);

    var _this = _possibleConstructorReturn(this, (iVXioRules.__proto__ || Object.getPrototypeOf(iVXioRules)).call(this, experience, customEvaluator));

    _this.evaluator = new _evaluator2.default(experience, customEvaluator);
    return _this;
  }

  return iVXioRules;
}(_rules.Rules);

},{"../ivx-js/rules.js":32,"./evaluator.js":13}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Actions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioEvents = require("../../../constants/audio.events.js");

var _audioEvents2 = _interopRequireDefault(_audioEvents);

var _stateEvents = require("../../../constants/state.events.js");

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
            var oldAnimationClass = element.animationClass;


            if (element.className.indexOf(animationClasses) >= 0) {
                return;
            }

            if (element.className.indexOf('hide') >= 0) {
                element.className = element.className.replace('hide', animationClasses);
                return;
            }

            if (oldAnimationClass) {
                element.className = element.className.replace(oldAnimationClass, '');
            }

            element.animationClass = animationClasses;
            element.className = element.className + " " + animationClasses;

            return element;
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
                            animationElement.animationClass = eventObj.animationClasses;
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
                resolve(self);
            });

            return setDataPromise;
        }
    }]);

    return Actions;
}();

;

},{"../../../constants/audio.events.js":1,"../../../constants/state.events.js":9}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = require("../../../utilities/type-parsers.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeValidator = new _typeParsers.TypeValidator();

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

                return self[type](lhs, is, rhs);
            });

            return this[conditionOperator](evaluateConditions);
        }
    }, {
        key: "input",
        value: function input(lhs, is, rhs) {
            var experience = this.experience;

            var lhsValue = experience.data[lhs];

            return this[is](lhsValue, rhs);
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
            return rhs.indexOf(lhs) >= 0;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../../../utilities/type-parsers.js":35}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evaluator = require('./evaluator.js');

var _evaluator2 = _interopRequireDefault(_evaluator);

var _typeParsers = require('../../../utilities/type-parsers.js');

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
            });

            return stateSelect ? stateSelect.stateId : '';
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

},{"../../../utilities/type-parsers.js":35,"./evaluator.js":31}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logging = require('../constants/logging.js');

var _logging2 = _interopRequireDefault(_logging);

var _errors = require('../constants/errors.js');

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
            var message = _error.message;

            var errorPayload = {
                message: message,
                type: errorTypeMessage,
                error: _error,
                timestamp: new Date()
            };

            console.error(errorTypeMessage + ': ' + message);
            Bus.emit(errorTypeMessage, _error);
            Bus.emit(_logging2.default.ERROR, errorPayload);
        }
    }, {
        key: 'debug',
        value: function debug(message) {
            var show = this.show;


            if (show) {
                this.log('DEBUG: ' + message);
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

},{"../constants/errors.js":3,"../constants/logging.js":8}],35:[function(require,module,exports){
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

},{}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2Vycm9ycy5qcyIsInNyYy9jb25zdGFudHMvaHR0cC5qcyIsInNyYy9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzIiwic3JjL2NvbnN0YW50cy9pVlhpby5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL2xvZ2dpbmcuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvc3RhdGUuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vYWN0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2V2YWx1YXRvci5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2luZGV4LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9jYXNjYWRpbmctb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9vcHRpb25zLmJ1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMucmFkaW8uanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbGFyZ2UuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbWVkaXVtLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0LXNob3J0LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvdXJsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vcnVsZXMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvZXZhbHVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvcnVsZXMuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL2xvZ2dpbmcuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsa0JBQU0sTUFaTztBQWFiLG9CQUFTLFFB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QUEsZ0JBQTVCLFVBQTRCLHVFQUFmLEVBQWU7QUFBQSxnQkFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2pDLGdCQUFJLFlBQVk7QUFDWiwwQkFBVSxJQURFO0FBRVosd0JBQVE7QUFGSSxhQUFoQjtBQUlBLGdCQUFJLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsZ0NBQWdCLEdBQWhCLElBQXVCLEVBQXZCO0FBQ0EsMkJBQVcsT0FBWCxDQUFtQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLHdCQUFJLFlBQVksS0FBSyxHQUFMLENBQVMsZ0JBQWdCLEdBQWhCLENBQVQsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBQWhCOztBQUVBLHdCQUFJLFNBQUosRUFBZTtBQUNYLGtDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0I7QUFDbEIsaUNBQUssR0FEYTtBQUVsQixtQ0FBTyxLQUZXO0FBR2xCLG1DQUFPLFFBQVEsR0FBUjtBQUhXLHlCQUF0QjtBQUtBLGtDQUFVLFFBQVYsR0FBcUIsS0FBckI7QUFDSCxxQkFQRCxNQU9PO0FBQ0gsd0NBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTBCLFFBQVEsR0FBUixDQUExQjtBQUNIO0FBQ0osaUJBYkQ7QUFjSCxhQWhCRDs7QUFrQkEsbUJBQU8sU0FBUDtBQUNIOzs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXVkaW9Db25zdGFudHMgZnJvbSBcIi4vYXVkaW8uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBdWRpb0NvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBBRERfUExBWUlOR19DTEFTUzogJ2FkZC1wbGF5aW5nLWNsYXNzJyxcbiAgICAgICAgICAgIEJVRkZFUklORyA6IFwiYnVmZmVyaW5nXCIsXG4gICAgICAgICAgICBDQU5fUExBWTogXCJjYW4tcGxheVwiLFxuICAgICAgICAgICAgRElTUE9TRSA6IFwiZGlzcG9zZVwiLFxuICAgICAgICAgICAgRU5ERUQgOiBcImVuZGVkXCIsXG4gICAgICAgICAgICBHRVRfRFVSQVRJT046IFwiZ2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBNVVRFOiBcIm11dGVcIixcbiAgICAgICAgICAgIFBBVVNFOiBcInBhdXNlXCIsXG4gICAgICAgICAgICBQQVVTRUQ6IFwicGF1c2VkXCIsXG4gICAgICAgICAgICBQTEFZOiBcInBsYXlcIixcbiAgICAgICAgICAgIFBMQVlJTkc6IFwicGxheWluZ1wiLFxuICAgICAgICAgICAgU0VFSzogXCJzZWVrXCIsXG4gICAgICAgICAgICBTRVRfVVAgOiBcInNldC11cFwiLFxuICAgICAgICAgICAgU0VUX0RVUkFUSU9OOiBcInNldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1ZPTFVNRTogXCJzZXQtdm9sdW1lXCIsXG4gICAgICAgICAgICBUSU1FX1VQREFURTogXCJ0aW1lLXVwZGF0ZVwiLFxuICAgICAgICAgICAgVU5NVVRFOiBcInVubXV0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkFVRElPID0gXCJhdWRpb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgIGxldCB7REVMSU1FVEVSLCBBVURJT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7QVVESU99YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgVmlkZW9Db25zdGFudHMgZnJvbSBcIi4vdmlkZW8uanNcIjtcbmltcG9ydCBIdHRwQ29uc3RhbnRzIGZyb20gXCIuL2h0dHAuanNcIjtcbmltcG9ydCBpVlhpb0NvbnN0YW50cyBmcm9tIFwiLi9pVlhpby5qc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHMge1xuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuRVJST1IgPSBcImVycm9yXCI7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBWSURFTzogbmV3IFZpZGVvQ29uc3RhbnRzKCkuVklERU8sXG4gICAgICAgICAgICBIVFRQIDogbmV3IEh0dHBDb25zdGFudHMoKS5IVFRQLFxuICAgICAgICAgICAgVkFMSURBVElPTiA6IFwidmFsaWRhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1VQIDogXCJzZXQtdXBcIixcbiAgICAgICAgICAgIElWWF9JTyA6IG5ldyBpVlhpb0NvbnN0YW50cygpLklWWF9JTyxcbiAgICAgICAgICAgIERFRkFVTFQgOiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgIEFTU0VSVCA6IFwiYXNzZXJ0XCIsXG4gICAgICAgICAgICBFWFBFUklFTkNFOiBcImV4cGVyaWVuY2VcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtFUlJPUiwgREVMSU1FVEVSfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtFUlJPUn0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cblxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5IVFRQID0gXCJodHRwXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgSFRUUH0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7SFRUUH1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9Db25zdGFudHMgZnJvbSBcIi4vaVZYaW8uanNcIjtcbmltcG9ydCBFcnJvckNvbnN0YW50cyBmcm9tIFwiLi9lcnJvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhpb0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuRVJST1IgPSBuZXcgRXJyb3JDb25zdGFudHMoKS5FUlJPUjtcblxuICAgICAgICBsZXQgZXJyb3JUeXBlcyA9IHtcbiAgICAgICAgICAgIEVYUEVSSUVOQ0UgOiBcImV4cGVyaWVuY2VcIixcbiAgICAgICAgICAgIFBMQVRGT1JNX1VOQVZBSUxBQkxFIDogXCJwbGF0Zm9ybS11bmF2YWlsYWJsZVwiLFxuICAgICAgICAgICAgRVZFTlRfTk9UX0ZJUkVEIDogXCJldmVudC1ub3QtZmlyZWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhlcnJvclR5cGVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGVycm9yTmFtZSl7XG4gICAgICAgIGxldCB7RVJST1IsIERFTElNRVRFUn0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0VSUk9SfSR7REVMSU1FVEVSfSR7ZXJyb3JOYW1lfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuSVZYX0lPID0gXCJpVlhpb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIElWWF9JT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7SVZYX0lPfWA7ICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5MT0dHSU5HID0gXCJsb2dcIjtcblxuICAgICAgICBsZXQgbG9nVHlwZXMgPSB7XG4gICAgICAgICAgICBFUlJPUiA6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIFdBUk4gOiBcIndhcm5cIixcbiAgICAgICAgICAgIFRSQUNFIDogXCJ0cmFjZVwiLFxuICAgICAgICAgICAgTE9HIDpcIlwiXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGxvZ1R5cGVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGxldmVsKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIExPR0dJTkd9ID0gdGhpcztcbiAgICAgICAgaWYobGV2ZWwubGVuZ3RoIDw9IDApe1xuICAgICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0xPR0dJTkd9YFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0xPR0dJTkd9JHtERUxJTUVURVJ9JHtsZXZlbH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNTdGF0ZUNvbnN0YW50cyBmcm9tIFwiLi9zdGF0ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc1N0YXRlQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBDSEFOR0UgOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgU1VDQ0VTUyA6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgRVJST1IgOiBcImVycm9yXCIsXG4gICAgICAgICAgICBHTyA6IFwiZ29cIixcbiAgICAgICAgICAgIE5PVF9GT1VORCA6IFwibm90LWZvdW5kXCIsXG4gICAgICAgICAgICBHRVRfU1RBVEUgOiBcImdldC1zdGF0ZVwiLFxuICAgICAgICAgICAgUkVRVUVTVF9TVEFURSA6IFwicmVxdWVzdC1zdGF0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5TVEFURSA9IFwic3RhdGVcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBTVEFURX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7U1RBVEV9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5WSURFTyA9IFwidmlkZW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBWSURFT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7VklERU99YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL2lWWGlvLmVycm9ycy5qc1wiO1xyXG5pbXBvcnQgTG9nZ2luZyBmcm9tIFwiLi4vLi4vLi4vdXRpbGl0aWVzL2xvZ2dpbmcuanNcIjtcclxuXHJcbmxldCBpVlhpb0Vycm9ycyA9IG5ldyBpVlhpb0Vycm9yTmFtZXMoKTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgbGF5ZXIgb2YgdHJhbnNmb3JtYXRpb24gdG8gaVZYaW8ncyBob3N0IGZ1bmN0aW9uYWxpdHlcclxuICogdG8gd29yayB3aXRoIHRoZSBBY3Rpb24gc3lzdGVtIGluIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGlWWGlvQWN0aW9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdWxscyB0aGUgaVZYaW8ncyBleHBlcmllbmNlIGhvc3QgdGhhdCB0aGlzIGNsYXNzIFxyXG4gICAgICogd2lsbCB1c2UgdG8gc2V0IHZhcmlvdXMgZXhwZXJpZW5jZSBkYXRhLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0V4cGVyaWVuY2VIb3N0fSBleHBlcmllbmNlIC0gY3VycmVudCBpbnN0YW5jZSBvZiBpVlhpbydzXHJcbiAgICAgKiBleHBlcmllbmNlIGhvc3QuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UsIGlWWGpzTG9nID0gbmV3IExvZ2dpbmcoZmFsc2UsIGV4cGVyaWVuY2UuQnVzKSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgZXhwZXJpZW5jZSBob3N0IHRoYXQgd2lsbCBwZXJmb3JtIHRoZSBcclxuICAgICAgICAgKiBhY3Rpb25zIHRvIHRoZSBwbGF0Zm9ybVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtFeHBlcmllbmNlSG9zdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgIHRoaXMuaVZYanNMb2cgPSBpVlhqc0xvZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgdGhlIFwiYW5pbWF0ZVBhZ2VFbGVtZW50XCIgZnJvbSB0aGUgcGxhdGZvcm0gdG9cclxuICAgICAqIGlWWGpzJ3MgYWN0aW9uIFwiYW5pbWF0ZUVsZW1lbnQuXCJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFuaW1hdGUgcGFnZSBlbGVtZW50J3MgZXZlbnQgb2JqZWN0IFxyXG4gICAgICogd2l0aCBhIHRhcmdldCBpZC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBpbmRpY2F0ZXMgdGhlIGFuaW1hdGlvbiB0byBhbiBlbGVtZW50IGlzIGZpbmlzaGVkLlxyXG4gICAgICovXHJcbiAgICBhbmltYXRlUGFnZUVsZW1lbnQoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy50YXJnZXRJRCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gJyMnICsgZXZlbnRBcmdzLnRhcmdldElEXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGV2ZW50QXJncy5lbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5hbmltYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkNsYXNzOiBldmVudEFyZ3MuYW5pbWF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcGxhdGZvcm0gdXRpbGl6ZXMgLk5FVCdzIHRpbWUgZm9ybWF0IGFuZCByZXF1aXJlcyB0aGUgZGF0ZSBcclxuICAgICAqIHZhbHVlIHRvIGJlIGluIGEgc3BlY2lmaWMgZm9ybWF0IGZvciBEYXRlL0RhdGV0aW1lIGlucHV0cy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBleHBlcmllbmNlIGtleSB0byBwdWxsIHRoZSBpbnB1dCBkaXNwbGF5LlxyXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gdGhlIGRhdGUgdG8gdHJhbnNmb3JtIGludG8gLk5FVCBzYWZlIHN0cmluZy5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBjb3JyZWN0bHkgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGZvciAuTkVULlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGZvcm1hdERhdGVGb3JQbGF0Zm9ybShrZXksIGRhdGUpIHtcclxuICAgICAgICBsZXQge2lucHV0c30gPSB0aGlzLmV4cGVyaWVuY2Uuc3Rvcnk7XHJcbiAgICAgICAgbGV0IGlucHV0ID0gaW5wdXRzW2tleV07XHJcbiAgICAgICAgbGV0IHtkaXNwbGF5fSA9IGlucHV0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkRhdGVcIjpcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlU3RyaW5nID0gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke2dldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSl9LSR7Z2V0RGF0ZShkYXRlLmdldERhdGUoKSl9YDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1vbnRoKG1vbnRoTnVtKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3JyZWN0ZWRNb250aE51bSA9IChtb250aE51bSArIDEpICUgMTM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkTW9udGhOdW0gPj0gMTAgPyBjb3JyZWN0ZWRNb250aE51bSA6IGAwJHtjb3JyZWN0ZWRNb250aE51bX1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRlKGRhdGVOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGVOdW0gPj0gMTAgPyBkYXRlTnVtIDogYDAke2RhdGVOdW19YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgY3VzdG9tIGV2ZW50IGluIHRoZSBldmVudCBhcmdzIGZvciB0aGUgXHJcbiAgICAgKiBwbGF0Zm9ybSB0byByZWNvcmQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLmN1c3RvbUV2ZW50IC0gZXZlbnQgbmFtZSB0byBiZSByZWNvcmRlZFxyXG4gICAgICogYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgZXZlbnQgd2FzIHN1Y2Nlc3NmdWxseSByZWNvcmRlZCBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHJlY29yZEV2ZW50KGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQge2N1c3RvbUV2ZW50fSA9IGV2ZW50QXJncztcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnJlY29yZEV2ZW50KGN1c3RvbUV2ZW50KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0Q29udmVydGVkIGV2ZW50IHdpdGggYSBsYWJlbCBpZiBvbmUgaXMgcHJvdmlkZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLmxhYmVsIC0gY29udmVydGVkIGxhYmVsIHRoYXQgd2lsbCBiZSByZWNvcmRlZFxyXG4gICAgICogYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgc2V0Q29udmVydGVkIHdhcyBzdWNjZXNzZnVsIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0Q29udmVydGVkKGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQge2xhYmVsfSA9IGV2ZW50QXJncztcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldENvbnZlcnRlZChsYWJlbCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUsIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIHNldENvbXBsZXRlZCBldmVudC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gd2lsbCBpbmRpY2F0ZSBpZiB0aGlzIHNldENvbXBsZXRlIHdhcyBzdWNjZXNzZnVsIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0Q29tcGxldGUoZXZlbnRBcmdzID0ge30pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0Q29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0RGF0YSBldmVudCB0byB0aGUgcGxhdGZvcm0gd2l0aCB0aGUga2V5IGFuZCAgXHJcbiAgICAgKiB2YWx1ZSBpbiB0aGUgZXZlbnRBcmdzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYWxsIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy5rZXkgLSBleHBlcmllbmNlIGRhdGEga2V5IHRvIGJlIHNldC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3MudmFsdWUgLSBleHBlcmllbmNlIGRhdGEgdmFsdWUgdG8gYmUgc2V0IHRvLiAgXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBkYXRhIHdhcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCB0byB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldERhdGEoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7a2V5LCB2YWx1ZX0gPSBldmVudEFyZ3M7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLmV4cGVyaWVuY2UuZGF0YVtrZXldID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmV4cGVyaWVuY2UuZGF0YVtrZXldID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdCgnaVZYanM6aVZYaW86ZXJyb3I6ZXZlbnQtbm90LWZpcmVkJywgZXZlbnRBcmdzLCB7bWVzc2FnZTpcImlWWGpzIEVycm9yIE1lc3NhZ2U6IElucHV0IG5vdCBmb3VuZFwifSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKHsgbWVzc2FnZSA6ICdpVlhqcyBFcnJvciBNZXNzYWdlOiBJbnB1dCBub3QgZm91bmQnfSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXREYXRlRm9yUGxhdGZvcm0oa2V5LCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXREYXRhKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXREYXRhKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXRNaWxlc3RvbmUgd2l0aCB0aGUgbWlsZXN0b25lIGRlZmluZWQgaW4gdGhlIFxyXG4gICAgICogZXZlbnRBcmdzIG9iamVjdC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGhvbGRzIHRoZSBtaWxlc3RvbmUgdG8gYmUgc2VuZCB0byB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLm1pbGVzdG9uZSAtIG1pbGVzdG9uZSB0byBiZSBzZXQuXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGluZGljYXRlcyBpZiB0aGlzIG1pbGVzdG9uZSB3YXMgc2V0IG9uIHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0TWlsZXN0b25lKGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQge21pbGVzdG9uZX0gPSBldmVudEFyZ3M7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXRNaWxlc3RvbmUobWlsZXN0b25lKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gXCIuLi9pdngtanMvZXZhbHVhdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZhbHVhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpIHtcbiAgICAgICAgc3VwZXIoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcbiAgICB9XG5cbiAgICBzdG9yeUV2ZW50cyhsaHMsIGlzLCBzdG9yeUV2ZW50KSB7XG4gICAgICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzO1xuICAgICAgICBsZXQge2V2ZW50c30gPSBleHBlcmllbmNlO1xuXG4gICAgICAgIGlmIChzdG9yeUV2ZW50ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybiBub0V2ZW50RmlyZWQoaXMsIGV2ZW50cywgZXhwZXJpZW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1tpc10oc3RvcnlFdmVudCwgZXZlbnRzKTtcblxuICAgICAgICBmdW5jdGlvbiBub0V2ZW50RmlyZWQoaXMsIGV2ZW50cywgZXhwZXJpZW5jZSkge1xuICAgICAgICAgICAgbGV0IGlzRmlyZWQgPSBpcyA9PT0gJ2ZpcmVkJztcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5sZW5ndGggPD0gMCAmJiBpc0ZpcmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyZWQoZXZlbnQsIGV2ZW50cykge1xuICAgICAgICBsZXQgZmlyZWRFdmVudCA9IGV2ZW50cy5maW5kKChldmVudEZpcmVkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50RmlyZWQgPT09IGV2ZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHlwZW9mIGZpcmVkRXZlbnQgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5vdEZpcmVkKGV2ZW50LCBldmVudHMpIHtcbiAgICAgICAgbGV0IGZpcmVkRXZlbnQgPSBldmVudHMuZmluZCgoZXZlbnRGaXJlZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudEZpcmVkID09PSBldmVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmaXJlZEV2ZW50ID09PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICBwcm9ncmVzcyhsaHMsIGlzLCBwcm9ncmVzcykge1xuICAgICAgICBsZXQge2V4cGVyaWVuY2V9ID0gdGhpcztcbiAgICAgICAgbGV0IHtwcm9ncmVzczogY3VycmVudFN0b3J5UHJvZ3Jlc3MsIG1pbGVzdG9uZTogY3VycmVudE1pbGVzdG9uZSwgc3Rvcnl9ID0gZXhwZXJpZW5jZTtcbiAgICAgICAgbGV0IHtwcm9ncmVzc01hcH0gPSBzdG9yeTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzcztcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc1ZhbHVlID0gLTE7XG4gICAgICAgIGxldCBjdXJyZW50TWlsZXN0b25lVmFsdWUgPSAtMTtcblxuICAgICAgICBpZiAoY3VycmVudE1pbGVzdG9uZSAmJiBjdXJyZW50TWlsZXN0b25lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TWlsZXN0b25lU3RyaW5nID0gY3VycmVudE1pbGVzdG9uZVswXS50b0xvd2VyQ2FzZSgpICsgY3VycmVudE1pbGVzdG9uZS5zdWJzdHJpbmcoMSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRNaWxlc3RvbmVWYWx1ZSA9IHByb2dyZXNzTWFwW2N1cnJlbnRNaWxlc3RvbmVTdHJpbmddID8gcHJvZ3Jlc3NNYXBbY3VycmVudE1pbGVzdG9uZVN0cmluZ10gOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1N0b3J5UHJvZ3Jlc3MoY3VycmVudFN0b3J5UHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzU3RyaW5nID0gY3VycmVudFN0b3J5UHJvZ3Jlc3NbMF0udG9Mb3dlckNhc2UoKSArIGN1cnJlbnRTdG9yeVByb2dyZXNzLnN1YnN0cmluZygxKTtcblxuICAgICAgICAgICAgY3VycmVudFByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc01hcFtjdXJyZW50UHJvZ3Jlc3NTdHJpbmddO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzc1swXS50b0xvd2VyQ2FzZSgpICsgcHJvZ3Jlc3Muc3Vic3RyaW5nKDEpO1xuXG4gICAgICAgIGxldCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NNYXBbcHJvZ3Jlc3NdO1xuICAgICAgICBsZXQgZXZhbHVhdGVQcm9ncmVzcyA9IGN1cnJlbnRQcm9ncmVzc1ZhbHVlID4gY3VycmVudE1pbGVzdG9uZVZhbHVlID8gY3VycmVudFByb2dyZXNzVmFsdWUgOiBjdXJyZW50TWlsZXN0b25lVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXNbaXNdKGV2YWx1YXRlUHJvZ3Jlc3MsIHByb2dyZXNzVmFsdWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGlzU3RvcnlQcm9ncmVzcyhwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzID09PSAnU3RhcnRlZCcgfHwgcHJvZ3Jlc3MgPT09ICdDb21wbGV0ZWQnIHx8IHByb2dyZXNzID09PSAnQ29udmVydGVkJztcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBpVlhpb0FjdGlvbnMgfSBmcm9tICcuL2FjdGlvbnMuanMnXHJcbmltcG9ydCB7IGlWWGlvUnVsZXMgfSBmcm9tICcuL3J1bGVzLmpzJ1xyXG5pbXBvcnQgeyBBY3Rpb25zIGFzIGlWWGpzQWN0aW9ucyB9IGZyb20gJy4uL2l2eC1qcy9hY3Rpb25zLmpzJ1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcclxuaW1wb3J0IElucHV0VmFsaWRhdG9yIGZyb20gXCIuL2lucHV0LXZhbGlkYXRvcnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzJztcclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKVxyXG5sZXQgb2JqZWN0UGFyc2VyID0gbmV3IE9iamVjdFBhcnNlcnMoKVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhbiBpVlhpbyBkYXRhIG1vZHVsZSB0aGF0IGlWWGpzIGNhbiB1c2UgZm9yIFxyXG4gKiBuYXZpZ2F0aW9uLCBkYXRhIHNldHRpbmcgYW5kIHByb2dyZXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGlWWGlvIHtcclxuXHJcbiAgLyoqXHJcbiAgICogUHVsbHMgaW4gYW55IG1vZHVsZSBzZXR0aW5ncyBhbmQgdGhlIGdsb2JhbCBzZXR0aW5nc1xyXG4gICAqIGZvciB0aGlzIGlWWGpzIGV4cGVyaWVuY2UgdG8gc2V0IHVwIHRoaXMgaVZYaW8gXHJcbiAgICogZW5oYW5jZSBkYXRhIG9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gbW9kdWxlU2V0dGluZ3MgLSBzZXR0aW5ncyB0byBiZSBwYXNzZWQgaW4gdG8gdGhlIFxyXG4gICAqIGlWWGlvIEV4cGVyZWluY2UgaG9zdC5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gaVZYanNTZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBpVlhqcyBleHBlcmllbmNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MsIGlWWGpzU2V0dGluZ3MgPSB7fSwgQnVzLCBpVlhqc0xvZykge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW9kdWxlIHNldHRpbmdzIGZvciBpVlhpbyB3aGljaCB3aWxsIGJlIGFsbCB0aGUgc2V0dGluZ3NcclxuICAgICAqIHVzZWQgd2l0aCB0aGUgaVZYaW8ncyBleHBlcmllbmNlIGhvc3Qgc3VjaCBhcyBzdG9yeSBrZXlzIGFuZFxyXG4gICAgICogZnVubmVscy5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5leHBlcmllbmNlSG9zdFNldHRpbmdzID0gZXhwZXJpZW5jZUhvc3RTZXR0aW5nc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGlWWGpzIGV4cGVyaWVuY2UgXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaVZYanNTZXR0aW5ncyA9IGlWWGpzU2V0dGluZ3M7XHJcbiAgICB0aGlzLkJ1cyA9IEJ1cztcclxuICAgIHRoaXMuaVZYanNMb2cgPSBpVlhqc0xvZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIHRoZSBjdXJyZW50IHNldHRpbmdzIGFuZCB0aGVuIGVuaGFuY2VzIHRoZSBzdG9yeSBkYXRhIFxyXG4gICAqIHB1bGxlZCBmcm9tIHRoZSBpVlhpbyBleHBlcmllbmNlIGhvc3QgYW5kIGVuaGFuY2VzIHRoZW0gdG8gXHJcbiAgICogd29yayB3aXRoIGlWWGpzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gYSBwcm9taXNlIHRoYXQgZXZhbHVhdGVzIHdoZXRoZXIgdGhpcyBleHBlcmllbmNlIFxyXG4gICAqIHdhcyBzdWNjZXNzZnVsbHkgZW5oYW5jZWQuXHJcbiAgICovXHJcbiAgZW5oYW5jZSgpIHtcclxuICAgIGxldCB7IGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MgPSB7fSwgaVZYanNTZXR0aW5ncyA9IHt9IH0gPSB0aGlzO1xyXG4gICAgbGV0IGlWWGlvRXJyb3JzID0gbmV3IGlWWGlvRXJyb3JOYW1lcygpO1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICBsZXQgZW5oYW5jZW1lbnRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIGlWWCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLlBMQVRGT1JNX1VOQVZBSUxBQkxFLCB7fSk7XHJcbiAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5CdXMub25jZShpVlhpb0Vycm9ycy5FWFBFUklFTkNFLCAoZXJyb3IpPT57XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSlcclxuIFxyXG4gICAgICBpVlgoZXhwZXJpZW5jZUhvc3RTZXR0aW5ncylcclxuICAgICAgICAudGhlbihcclxuICAgICAgICAoaVZYKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWlWWCB8fCAhaVZYLmV4cGVyaWVuY2UgfHwgIWlWWC5leHBlcmllbmNlLnN0b3J5IHx8ICFpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLlBMQVRGT1JNX1VOQVZBSUxBQkxFLCB7fSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCB7ZXhwZXJpZW5jZTogZXhwZXJpZW5jZVNldHRpbmdzID0ge30sIHJ1bGVzOiBjdXN0b21SdWxlc30gPSBpVlhqc1NldHRpbmdzO1xyXG4gICAgICAgICAgbGV0IGRlZmF1bHRBY3Rpb25zID0gb2JqZWN0UGFyc2VyLm1lcmdlKG5ldyBpVlhqc0FjdGlvbnMoKSwgZXhwZXJpZW5jZVNldHRpbmdzKTtcclxuICAgICAgICAgIGxldCBleHBlcmllbmNlID0gb2JqZWN0UGFyc2VyLm1lcmdlKGRlZmF1bHRBY3Rpb25zLCBpVlguZXhwZXJpZW5jZSk7XHJcbiAgICAgICAgICBsZXQgbW9kaWZpZWRBY3Rpb25zID0gbmV3IGlWWGlvQWN0aW9ucyhleHBlcmllbmNlLCB0aGlzLmlWWGpzTG9nKTtcclxuICAgICAgICAgIGxldCB7dWk6IHN0b3J5VUksIHZhbGlkYXRpb246IHN0b3J5VmFsaWRhdGlvbn0gPSBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhO1xyXG5cclxuICAgICAgICAgIGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEgPSBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhID8gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YSA6IHt9O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsZXQgcnVsZXMgPSBuZXcgaVZYaW9SdWxlcyhleHBlcmllbmNlLCBjdXN0b21SdWxlcykucnVsZXM7XHJcbiAgICAgICAgICBsZXQgc3RhdGVzID0gbmV3IElucHV0VmFsaWRhdG9yKGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEuc3RhdGVzLCBpVlguZXhwZXJpZW5jZS5zdG9yeS5pbnB1dHMsIHNlbGYsIHJlamVjdCkuc3RhdGVzO1xyXG5cclxuXHJcbiAgICAgICAgICBleHBlcmllbmNlLndoaXRlTGlzdCA9IFtcclxuICAgICAgICAgICAgJ3NlbGYnLFxyXG4gICAgICAgICAgICAnaHR0cDovL2l2eC14YXBpLiouaW5mLWVudi5jb20vKionLFxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pdngteGFwaS4qLmluZi1lbnYuY29tLyoqJyxcclxuICAgICAgICAgICAgJ2h0dHBzOi8veGFwaS5pdnguaW8vKionXHJcbiAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgIGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEuc3RhdGVzID0gc3RhdGVzO1xyXG4gICAgICAgICAgaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YS50aXRsZSA9IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEudGl0bGUgPyBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhLnRpdGxlIDogXCJpVlggU3RvcnkgUGxheWVyXCI7XHJcblxyXG4gICAgICAgICAgbGV0IGVuaGFuY2VkaVZYanNTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgdWk6IGlWWGpzU2V0dGluZ3MudWksXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb246IGlWWGpzU2V0dGluZ3MudmFsaWRhdGlvbixcclxuICAgICAgICAgICAgY29uZmlnOiBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlOiBleHBlcmllbmNlLFxyXG4gICAgICAgICAgICBydWxlczogcnVsZXMsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IG1vZGlmaWVkQWN0aW9uc1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGVuaGFuY2VkaVZYanNTZXR0aW5ncyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHNlbGYuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVhQRVJJRU5DRSwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gZW5oYW5jZW1lbnRQcm9taXNlXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZWlWWElPO1xyXG5cclxuaWYgKGFuZ3VsYXIgJiYgYW5ndWxhci5tb2R1bGUoJ2l2eC1qcycpKSB7XHJcbiAgYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnaXZ4LWpzJylcclxuICAgIC5jb25zdGFudCgnaVZYanMuZGF0YS5pVlhpbycsIGluaXRpYWxpemVpVlhJTyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVpVlhJTyhzZXR0aW5ncyA9IHt9KSB7XHJcbiAgc2V0dGluZ3MubW9kdWxlID0gaVZYaW87XHJcblxyXG4gIHJldHVybiBzZXR0aW5ncztcclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpe1xuICAgICAgICBsZXQge3N0b3J5SW5wdXREYXRhID0ge30sIGpzb25JbnB1dERhdGEgPXt9fSA9IHRoaXM7XG4gICAgICAgIGxldCByYXdJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgbGV0IG5ld1N0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgICAgICBcbiAgICAgICAgcmF3SW5wdXREYXRhLnR5cGUgPSBcImNhc2NhZGluZy1vcHRpb25zXCI7XG4gICAgICAgIHJhd0lucHV0RGF0YS5kYXRhVHJlZSA9IG5ld1N0b3J5SW5wdXREYXRhLmRhdGFUcmVlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJhd0lucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7YnV0dG9ucyA9IFtdfSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCBoYXNGYWxzZSA9IGZhbHNlO1xuICAgICAgICBsZXQgaGFzVHJ1ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbmV3QnV0dG9ucyA9IGJ1dHRvbnMucmVkdWNlKChidXR0b25BcnJheSwgYnV0dG9uRGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCB7dmFsdWV9ID0gYnV0dG9uRGF0YTtcbiAgICAgICAgICAgIGxldCBpc0ZhbHNlID0gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiAmJiAhdmFsdWU7XG4gICAgICAgICAgICBsZXQgaXNUcnVlID0gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiAmJiB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGlzVHJ1ZSAmJiAhaGFzVHJ1ZSkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbkFycmF5WzBdID0gYnV0dG9uRGF0YTtcbiAgICAgICAgICAgICAgICBoYXNUcnVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRmFsc2UgJiYgIWhhc0ZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQXJyYXlbMV0gPSBidXR0b25EYXRhO1xuICAgICAgICAgICAgICAgIGhhc0ZhbHNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbkFycmF5O1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgaWYgKCFoYXNUcnVlKSB7XG4gICAgICAgICAgICBuZXdCdXR0b25zWzBdID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRydWVcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzRmFsc2UpIHtcbiAgICAgICAgICAgIG5ld0J1dHRvbnNbMV0gPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZhbHNlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBqc29uSW5wdXREYXRhLmJ1dHRvbnMgPSBuZXdCdXR0b25zO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn1cbiIsImltcG9ydCBCdXR0b25zIGZyb20gXCIuL2NoZWNrYm94LmJ1dHRvbnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSl7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpe1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7dHlwZX0gPSBqc29uSW5wdXREYXRhO1xuXG4gICAgICAgICBpZih0eXBlID09PSBcImJ1dHRvbnNcIil7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbnMoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEpLmlucHV0O1xuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJjaGVja2JveFwiO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJlbWFpbFwiO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9FcnJvck5hbWVzIGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy9pVlhpby5lcnJvcnMuanMnO1xuXG4vL1ZhbGlkYXRvcnMgXG5pbXBvcnQgQ2FzY2FkaW5nT3B0aW9ucyBmcm9tIFwiLi9jYXNjYWRpbmctb3B0aW9ucy5qc1wiXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vY2hlY2tib3guanNcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9lbWFpbC5qc1wiO1xuaW1wb3J0IE51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL29wdGlvbnMuanNcIjtcbmltcG9ydCBUZXh0QXJlYSBmcm9tIFwiLi90ZXh0YXJlYS5qc1wiO1xuaW1wb3J0IFRleHRMYXJnZSBmcm9tIFwiLi90ZXh0LWxhcmdlLmpzXCI7XG5pbXBvcnQgVGV4dE1lZGl1bSBmcm9tIFwiLi90ZXh0LW1lZGl1bS5qc1wiO1xuaW1wb3J0IFRleHRTaG9ydCBmcm9tIFwiLi90ZXh0LXNob3J0LmpzXCI7XG5pbXBvcnQgVXJsIGZyb20gXCIuL3VybC5qc1wiO1xuXG5jb25zdCBlcnJvck5hbWVzID0gbmV3IGlWWGlvRXJyb3JOYW1lcygpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZXMsIHN0b3J5SW5wdXRzLCBleHBlcmllbmNlLCByZWplY3QpIHtcbiAgICAgICAgdGhpcy5yYXdTdGF0ZXMgPSBbXS5jb25jYXQoc3RhdGVzKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0cyA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXRzKTtcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcbiAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVJbnB1dFN0YXRlcyh0aGlzLnJhd1N0YXRlcyk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0VmFsaWRhdG9ycygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIENhc2NhZGluZ09wdGlvbnMsXG4gICAgICAgICAgICBDaGVja2JveCxcbiAgICAgICAgICAgIEVtYWlsLFxuICAgICAgICAgICAgTnVtYmVyLFxuICAgICAgICAgICAgT3B0aW9ucyxcbiAgICAgICAgICAgIFRleHRBcmVhLFxuICAgICAgICAgICAgVGV4dExhcmdlLFxuICAgICAgICAgICAgVGV4dE1lZGl1bSxcbiAgICAgICAgICAgIFRleHRTaG9ydCxcbiAgICAgICAgICAgIFVybFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVJbnB1dFN0YXRlcyhzdGF0ZXMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc3RhdGVzLm1hcCgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHtpbnB1dHMgPSBbXX0gPSBzdGF0ZTtcblxuICAgICAgICAgICAgICAgIHN0YXRlLmlucHV0cyA9IHNlbGYudmFsaWRhdGVJbnB1dHMoaW5wdXRzLCBzdGF0ZSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkYXRlSW5wdXRzKGlucHV0cyA9IFtdLCBzdGF0ZSA9IHt9LCBzdGF0ZUluZGV4KSB7XG4gICAgICAgIGxldCB7aW5wdXRWYWxpZGF0b3JzLCBzdG9yeUlucHV0cyA9IHt9LCBleHBlcmllbmNlfSA9IHRoaXM7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gaW5wdXRzLm1hcCgoaW5wdXQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQge25hbWV9ID0gaW5wdXQ7XG4gICAgICAgICAgICBsZXQgc3RvcnlJbnB1dCA9IHN0b3J5SW5wdXRzW25hbWVdO1xuXG4gICAgICAgICAgICBpZiAoIXN0b3J5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBsZXQge25hbWU6IHN0YXRlTmFtZSwgaWR9ID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBcbmlWWC5pbyBTdG9yeSBpbnB1dCB3aXRoIGtleSAke25hbWV9IGNhbiBub3QgYmUgZm91bmQ6XG5TdGF0ZSBJZCA6ICR7c3RhdGUuaWR9XG5TdGF0ZSBOYW1lIDogJHtzdGF0ZU5hbWV9XG5TdGF0ZSBJbmRleCA6ICR7c3RhdGVJbmRleH1cbklucHV0IE5hbWU6ICR7bmFtZX1cbklucHV0IEluZGV4OiAke2luZGV4fVxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgZXhwZXJpZW5jZS5CdXMuZW1pdChlcnJvck5hbWVzLkVYUEVSSUVOQ0UsIHsgbWVzc2FnZTogZXJyb3JNZXNzYWdlIH0pO1xuICAgICAgICAgICAgICAgIGV4cGVyaWVuY2UuaVZYanNMb2cuZXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9LCBcIkVYUEVSSUVOQ0VcIik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHtkaXNwbGF5fSA9IHN0b3J5SW5wdXQ7XG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkYXRvciA9IGlucHV0VmFsaWRhdG9yc1tkaXNwbGF5XTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3SW5wdXQgPSBzZWxmLmdsb2JhbEF0dHJpYnV0ZXNTZXQoc3RvcnlJbnB1dCwgaW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZhbGlkYXRvcihuZXdJbnB1dCwgc3RvcnlJbnB1dCkuaW5wdXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2xvYmFsQXR0cmlidXRlc1NldChzdG9yeUlucHV0RGF0YSwganNvbklucHV0RGF0YSkge1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXMgOiBzdG9yeUF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHtyZXF1aXJlZDogc3RvcnlSZXF1aXJlZCA9IFwiZmFsc2VcIn0gPSBzdG9yeUF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCBuZXdJbnB1dCA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGlucHV0QXR0cmlidXRlcyA9IHt9fSA9IG5ld0lucHV0O1xuICAgICAgICBsZXQge3JlcXVpcmVkOiBpbnB1dFJlcXVpcmVkID0gZmFsc2V9ID0gaW5wdXRBdHRyaWJ1dGVzO1xuXG4gICAgICAgIG5ld0lucHV0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBpbnB1dEF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiBzdG9yeVJlcXVpcmVkID09PSBcInRydWVcIiA/IHRydWUgOiBpbnB1dFJlcXVpcmVkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dDtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQge21heDogc3RvcnlNYXhBdHRyaWJ1dGUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgbWluOiBzdG9yeU1pbkF0dHJpYnV0ZSA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCBzdGVwOiBzdG9yeVN0ZXBBdHRyaWJ1dGUgPSAxfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heDoganNvbk1heEF0dHJpYnV0ZSA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCBtaW46IGpzb25NaW5BdHRyaWJ1dGUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgc3RlcDoganNvblN0ZXBBdHRyaWJ1dGUgPSAxfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB1c2VTdG9yeU1pbiA9IGpzb25NaW5BdHRyaWJ1dGUgPiBzdG9yeU1pbkF0dHJpYnV0ZTtcbiAgICAgICAgbGV0IHVzZVN0b3J5TWF4ID0ganNvbk1heEF0dHJpYnV0ZSA8IHN0b3J5TWF4QXR0cmlidXRlO1xuICAgICAgICBsZXQgdXNlU3RvcnlTdGVwID0gdHlwZW9mIHN0b3J5U3RlcEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJudW1iZXJcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgIG1pbiA6IG5ldyBOdW1iZXIodXNlU3RvcnlNaW4/IHN0b3J5TWluQXR0cmlidXRlIDoganNvbk1pbkF0dHJpYnV0ZSkudmFsdWVPZigpLCBcbiAgICAgICAgICAgbWF4IDogbmV3IE51bWJlcih1c2VTdG9yeU1heCA/IHN0b3J5TWF4QXR0cmlidXRlIDoganNvbk1heEF0dHJpYnV0ZSkudmFsdWVPZigpLCBcbiAgICAgICAgICAgc3RlcCA6IG5ldyBOdW1iZXIodXNlU3RvcnlTdGVwID8gc3RvcnlTdGVwQXR0cmlidXRlIDoganNvblN0ZXBBdHRyaWJ1dGUpLnZhbHVlT2YoKSwgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBzdG9yeUlucHV0RGF0YTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9fSA9IHRoaXM7XG4gICAgICAgIGxldCB7YnV0dG9ucyA9IFtdfSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCB7b3B0aW9ucyA9IFtdfSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQgbmV3QnV0dG9ucyA9IG9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gaGFzQnV0dG9uKG9wdGlvbiwgYnV0dG9ucyk7XG5cbiAgICAgICAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnV0dG9uXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB7ZGlzcGxheSwgdmFsdWV9ID0gb3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkaXNwbGF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbmV3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLCB7XG4gICAgICAgICAgICBidXR0b25zOiBuZXdCdXR0b25zLFxuICAgICAgICAgICAgdHlwZSA6IFwiYnV0dG9uc1wiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dERhdGE7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFzQnV0dG9uKG9wdGlvbiwgYnV0dG9ucyA9IFtdKSB7XG4gICAgICAgICAgICByZXR1cm4gYnV0dG9ucy5maW5kKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbi52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxufSIsImltcG9ydCBCdXR0b25zIGZyb20gXCIuL29wdGlvbnMuYnV0dG9ucy5qc1wiO1xuaW1wb3J0IFJhZGlvIGZyb20gXCIuL29wdGlvbnMucmFkaW8uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7dHlwZX0gPSBqc29uSW5wdXREYXRhO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImJ1dHRvbnNcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25zKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhKS5pbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFkaW8oanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEpLmlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHtvcHRpb25zfSA9IHN0b3J5SW5wdXREYXRhO1xuXG4gICAgICAgIGxldCBuZXdJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwib3B0aW9uc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fX0gPSB0aGlzO1xuICAgICAgICBsZXQge3JhZGlvQnV0dG9ucyA9IFtdfSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCB7b3B0aW9ucyA9IFtdfSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQgbmV3UmFkaW9CdXR0b25zID0gb3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGxldCB7ZGlzcGxheSwgdmFsdWV9ID0gb3B0aW9uO1xuICAgICAgICAgICAgbGV0IHJhZGlvID0gaGFzUmFkaW8ob3B0aW9uLCByYWRpb0J1dHRvbnMpO1xuXG4gICAgICAgICAgICBpZiAocmFkaW8pIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UmFkaW8gPSBPYmplY3QuYXNzaWduKHt9LCByYWRpbyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UmFkaW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkaXNwbGF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbmV3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEsIHtcbiAgICAgICAgICAgICAgICByYWRpb0J1dHRvbnM6IG5ld1JhZGlvQnV0dG9ucyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJhZGlvXCJcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0RGF0YTtcblxuICAgICAgICBmdW5jdGlvbiBoYXNSYWRpbyhvcHRpb24sIHJhZGlvQnV0dG9ucyA9IFtdKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFkaW9CdXR0b25zLmZpbmQocmFkaW9CdXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYWRpb0J1dHRvbi52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQgbWF4Q2hhcmFjdGVycyA9IDI1NjtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSAxMjg7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gNjRcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSAxMDI0O1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7ICBcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUgPSAwfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IG5ldyBOdW1iZXIoc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPCBtYXhDaGFyYWN0ZXJzID8gc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgOiAganNvbk1heExlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpLFxuICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogbmV3IE51bWJlcih0eXBlb2Ygc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ1cmxcIjtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiaW1wb3J0IEV2YWx1YXRvciBmcm9tICcuL2V2YWx1YXRvci5qcyc7XHJcbmltcG9ydCB7UnVsZXN9IGZyb20gXCIuLi9pdngtanMvcnVsZXMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYW4gaVZYaW8gUnVsZXMgZnVuY3Rpb24gdGhhdCBhbGxvd3MgbmF2aWdhdGlvbiBhbmQgXHJcbiAqIHJ1bGUgZXZhbHVhdGlvbiBiYXNlZCBvbiBib3RoIGV4cGVyaWVuY2UgZGF0YSBhbmQgcHJvZ3Jlc3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgaVZYaW9SdWxlcyBleHRlbmRzIFJ1bGVzIHtcclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgdGhlIGN1cnJlbnQgZXhwZXJpZW5jZSB0byB0aGlzIGNsYXNzIHRvIGhlbHBcclxuICAgICAqIHByb2Nlc3MgYm90aCBkYXRhIGFuZCBwcm9ncmVzcyBpbmZvcm1haXRvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtpVlhpb0V4cGVyaWVjZX0gZXhwZXJpZW5jZSAtIGlWWGlvIEV4cGVyaWVuY2Ugb2JqZWN0XHJcbiAgICAgKiBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb24gZm9yIHRoZXNlIHJ1bGVzIHRvIGV2YWx1YXRlIG9uLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpIHtcclxuICAgICAgICBzdXBlcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdG9yID0gbmV3IEV2YWx1YXRvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEF1ZGlvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qc1wiO1xyXG5pbXBvcnQgU3RhdGVFdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvc3RhdGUuZXZlbnRzLmpzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW5kIHJ1bnMgYWxsIGFjdGlvbnMgZm9yIHRoaXMgZXhwZXJpZW5jZS4gQW4gYWN0aW9uXHJcbiAqIGlzIGFueSBwcm9jZXNzIHRoYXQgbmVlZHMgdG8gcmV0dXJuIGEgcHJvbWlzZSBpbmRpY2F0aW5nIHRoYXQgXHJcbiAqIGl0IGZpbmlzaGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdGlvbnMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGRlZmF1bHQgZGF0YSBvYmplY3QgdG8gYmUgdXNlZCBieSB2YXJpb3VzXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIGVtcHR5IGRhdGEgb2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHNldCBhbmQgXHJcbiAgICAgICAgICogcmVjb3JkIGRhdGEgdXNpbmcgdGhpcyBzZXREYXRhIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5hdWRpb0V2ZW50TmFtZXMgPSBuZXcgQXVkaW9FdmVudE5hbWVzKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUV2ZW50TmFtZXMgPSBuZXcgU3RhdGVFdmVudE5hbWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGNsYXNzZXMgb24gYW4gZWxlbWVudCB0aGF0IHdpbGwgY2F1c2UgdGhlIGVsZW1lbnQgdG8gYW5pbWF0ZS5cclxuICAgICAqIEBwYXJhbSB7SFRNTE5vZGV9IGVsZW1lbnQgLSBlbGVtZW50IGZvciB0aGUgY2xhc3MgdG8gYmUgc2V0XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRPYmogLSBhbmltYXRpb24gZXZlbnQgZGF0YS5cclxuICAgICAqIEByZXR1cm4ge0hUTUxOb2RlfSB0aGUgZWxlbWVudCB3aXRoIHRoZSBjbGFzc2VzIHJlcGxhY2VkLiAgXHJcbiAgICAgKi9cclxuICAgIHNldEVsZW1lbnRDbGFzc2VzKGVsZW1lbnQsIGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHthbmltYXRpb25DbGFzc2VzID0gXCJcIn0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQge2FuaW1hdGlvbkNsYXNzOiBvbGRBbmltYXRpb25DbGFzc30gPSBlbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihhbmltYXRpb25DbGFzc2VzKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdoaWRlJykgPj0gMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ2hpZGUnLCBhbmltYXRpb25DbGFzc2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9sZEFuaW1hdGlvbkNsYXNzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShvbGRBbmltYXRpb25DbGFzcywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC5hbmltYXRpb25DbGFzcyA9IGFuaW1hdGlvbkNsYXNzZXM7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBgJHtlbGVtZW50LmNsYXNzTmFtZX0gJHthbmltYXRpb25DbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9OZXh0U3RhdGUoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge25leHQ6IG5hdkFycmF5fSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0gdGhpcy5ydWxlcyhuYXZBcnJheSk7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KHNlbGYuc3RhdGVFdmVudE5hbWVzLkdPLCB7IHN0YXRlSWQ6IG5leHRTdGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgYW5pbWF0ZUVsZW1lbnQoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge2VsZW1lbnR9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25FbGVtZW50cyB8fCBhbmltYXRpb25FbGVtZW50cy5sZW5ndGggPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20oYW5pbWF0aW9uRWxlbWVudHMpO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBhbmltYXRpb25FbGVtZW50ID0gdGhpcy5zZXRFbGVtZW50Q2xhc3NlcyhhbmltYXRpb25FbGVtZW50LCBldmVudE9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGVFbGVtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkVuZHMgPSBbXHJcbiAgICAgICAgICAgICAgICAnd2Via2l0QW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdtb3pBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgJ01TQW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdvc2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICAgICAnYW5pbWF0aW9uZW5kJ1xyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0aW9uRW5kcy5mb3JFYWNoKChhbmltYXRpb25FbmROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmROYW1lLCBlbmRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZW5kQW5pbWF0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZHMuZm9yRWFjaCgoYW5pbWF0aW9uRW5kTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LmFuaW1hdGlvbkNsYXNzID0gZXZlbnRPYmouYW5pbWF0aW9uQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZE5hbWUsIGVuZEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5pbWF0ZUVsZW1lbnRQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TdGF0ZShldmVudE9iaiwgaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQge3N0YXRlfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpVlhqc0J1cykge1xyXG4gICAgICAgICAgICBpVlhqc0J1cy5lbWl0KHRoaXMuc3RhdGVFdmVudE5hbWVzLkdPLCBldmVudE9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBdWRpb0NsaXAoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge2F1ZGlvRXZlbnROYW1lc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzLmVtaXQoYXVkaW9FdmVudE5hbWVzLlNFVF9VUCwgZXZlbnRPYmopO1xyXG4gICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KGF1ZGlvRXZlbnROYW1lcy5QTEFZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQnVzLm9uKGF1ZGlvRXZlbnROYW1lcy5USU1FX1VQREFURSwgKGN1cnJlbnRBdWRpbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEF1ZGlvLmlkID09PSBldmVudE9iai5pZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEF1ZGlvLnJ1bkN1ZVBvaW50cyhzZWxmLnByb2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGlvQ2xpcFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuQnVzLm9uY2UoYXVkaW9FdmVudE5hbWVzLkVOREVELCAoY3VycmVudEF1ZGlvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF1ZGlvLmlkID09PSBldmVudE9iai5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJvY2Vzc29yLnJlc29sdmVBY3Rpb25zKGV2ZW50T2JqLm9uRW5kLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhdWRpb0NsaXBQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGEoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge2tleSwgdmFsdWV9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZXREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShzZWxmKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0RGF0YVByb21pc2U7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKXtcclxuICAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICAgdGhpcy5jdXN0b21FdmFsdWF0b3IgPSBjdXN0b21FdmFsdWF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGUocnVsZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29uZGl0aW9uT3BlcmF0b3IgPSBcImFuZFwiLCBjb25kaXRpb25zfSA9IHJ1bGU7XHJcbiAgICAgICAgbGV0IGV2YWx1YXRlQ29uZGl0aW9ucyA9IGNvbmRpdGlvbnMubWFwKChjb25kaXRpb24sIGluZGV4KSA9PntcclxuICAgICAgICAgICAgbGV0IHtrZXkgOiBsaHMsIGlzLCB2YWx1ZSA6IHJocywgdHlwZSA9IFwiaW5wdXRcIn0gPSBjb25kaXRpb247XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmN1c3RvbUV2YWx1YXRvciAmJiB0eXBlVmFsaWRhdG9yLmlzRnVuY3Rpb24oc2VsZi5jdXN0b21FdmFsdWF0b3IpICYmIHNlbGYuY3VzdG9tRXZhbHVhdG9yKGNvbmRpdGlvbikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY3VzdG9tRXZhbHVhdG9yKGNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNpbmNlIG9sZGVyIHZlcnNpb25zIG9mIHRoZSBpVlhqcyBKU09OIHVzZWQgXHJcbiAgICAgICAgICAgIC8vIHRoZSBrZXkgZm9yIFwia2V5d29yZFwiIHRoaXMgd2lsbCBtYWtlIGl0IGJhY2t3YXJkc1xyXG4gICAgICAgICAgICAvLyBjb21wYXRhYmxlXHJcbiAgICAgICAgICAgIGlmKHNlbGZbbGhzXSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZltsaHNdKGxocywgaXMsIHJocyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmW3R5cGVdKGxocywgaXMsIHJocyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW2NvbmRpdGlvbk9wZXJhdG9yXShldmFsdWF0ZUNvbmRpdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0KGxocywgaXMsIHJocyl7XHJcbiAgICAgICAgbGV0IHtleHBlcmllbmNlfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGxoc1ZhbHVlID0gZXhwZXJpZW5jZS5kYXRhW2xoc107XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW2lzXShsaHNWYWx1ZSwgcmhzKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmQocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgJiYgcHJlZGljYXRlO1xyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3IocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgfHwgcHJlZGljYXRlO1xyXG4gICAgICAgIH0sZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdChwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSAmJiAhcHJlZGljYXRlO1xyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGx0ZShsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA8PSBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGx0KGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpIDwgbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGd0ZShsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA+PSBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGd0KGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpID4gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBlcXVhbHMobGhzLCByaHMpe1xyXG4gICAgICAgIHJldHVybiBsaHMgPT09IHJocztcclxuICAgIH1cclxuICAgIFxyXG4gICAgbm90RXF1YWxzKGxocyxyaHMpe1xyXG4gICAgICAgIHJldHVybiBsaHMgIT09IHJocztcclxuICAgIH1cclxuXHJcbiAgICBpbihsaHMscmhzKXtcclxuICAgICAgICByZXR1cm4gcmhzLmluZGV4T2YobGhzKSA+PSAwO1xyXG4gICAgfSAgICAgICAgXHJcbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gJy4vZXZhbHVhdG9yLmpzJztcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbi8qKlxyXG4gKiBBIGRlZmF1bHQgcnVsZSBzeXN0ZW0gaW4gd2hpY2ggaVZYanMgY2hvb3NlcyB3aGljaCBzdGF0ZSBcclxuICogdG8gZ28gdG8gYmFzZWQgb2YgdGhlIGN1cnJlbnQgaVZYanMgRXhwZXJpZW5jZSBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGV4cGVyaWVuY2UgaW4gd2hpY2ggdGhpcyBkYXRhIFxyXG4gICAgICogd2lsbCBiZSBldmFsdWF0ZWQgdG8uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHBlcmllbmNlIC0gaVZYanNFeHBlcmllbmNlIFxyXG4gICAgICogb2JqZWN0IGluIHdoaWNoIGRhdGEgd2lsbCBiZSB1c2VkIHRvIGV2YWx1YXRlIHZhcmlvdXMgcnVsZXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UgPSB7IGRhdGE6IHt9IH0sIGN1c3RvbUV2YWx1YXRvcikge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDdXJyZW50IGlWWGpzIEV4cGVyZWluY2UgXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdG9yID0gbmV3IEV2YWx1YXRvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlZmF1bHQgcnVsZXMgZnVuY3Rpb24gdGhhdCB3aWxsIHByb2Nlc3MgYW4gXHJcbiAgICAgKiBhcnJheSBvZiBuYXZpZ2F0aW9uIG9iamVjdHMgYW5kIGV2YWx1YXRlIHRoZW0gdXNpbmcgXHJcbiAgICAgKiB0aGUgcHJvY2Vzc1J1bGVzIGZ1bmN0aW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIGdldCBydWxlcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiAobmF2QXJyYXkgPSBbXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5wcm9jZXNzUnVsZXMobmF2QXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aHJvdWdoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBuYXYgb2JqZWN0IHdob3NlIFxyXG4gICAgICogcnVsZSBpcyBldmFsdWF0ZWQgdG8gdHJ1ZSBvciBydWxlcyBhcmUgZW1wdHkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG5hdkFycmF5IC0gQW4gYXJyYXkgb2YgbmF2aWdhdGlvbiBvYmplY3RzIFxyXG4gICAgICogd2l0aCBydWxlcyBhbmQgc3RhdGVzIHRvIGJlIGV2YWx1YXRlZC5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgc3RhdGVJZCBvZiB0aGUgcnVsZSB0aGF0IHdhcyBldmFsdWF0ZWQgXHJcbiAgICAgKiB0cnVlIGZpcnN0LiBJZiBubyBzdGF0ZSBpcyByZXR1cm4sIHJldHVybnMgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwcm9jZXNzUnVsZXMobmF2QXJyYXkgPSBbXSkge1xyXG5cclxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShuYXZBcnJheSkpe1xyXG4gICAgICAgICAgICBuYXZBcnJheSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN0YXRlU2VsZWN0ID0gbmF2QXJyYXkuZmluZCgobmF2T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7cnVsZX0gPSBuYXZPYmo7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlVmFsaWRhdG9yLmlzRW1wdHkocnVsZSkpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHtjb25kaXRpb25zLCBjb25kaXRpb25PcGVyYXRvciA9IFwiYW5kXCJ9ID0gcnVsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29uZGl0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgcnVsZS5jb25kaXRpb25PcGVyYXRvciA9IGNvbmRpdGlvbk9wZXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgcnVsZS5jb25kaXRpb25zID0gW3J1bGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0b3IuZXZhbHVhdGUocnVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZVNlbGVjdCA/IHN0YXRlU2VsZWN0LnN0YXRlSWQgOiAnJztcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iLCJpbXBvcnQgTG9nZ2luZ01lc3NhZ2VzIGZyb20gICcuLi9jb25zdGFudHMvbG9nZ2luZy5qcyc7XG5pbXBvcnQgRXJyb3JNZXNzYWdlcyBmcm9tICcuLi9jb25zdGFudHMvZXJyb3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHNob3csIEJ1cykge1xuICAgICAgICB0aGlzLnNob3cgPSBzaG93O1xuICAgICAgICB0aGlzLkxvZ2dpbmdNZXNzYWdlcyA9IG5ldyBMb2dnaW5nTWVzc2FnZXMoKTtcbiAgICAgICAgdGhpcy5FcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMoKTtcbiAgICAgICAgdGhpcy5CdXMgPSBCdXM7XG4gICAgfVxuXG4gICAgd2FybihtZXNzYWdlKSB7XG4gICAgICAgIGxldCB7c2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHdhcm5NZXNzYWdlID0gTG9nZ2luZ01lc3NhZ2VzLldBUk47XG4gICAgICAgIGxldCB3YXJuUGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7d2Fybk1lc3NhZ2V9OiAke21lc3NhZ2V9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBCdXMuZW1pdCh3YXJuTWVzc2FnZSwgd2FyblBheWxvYWQpO1xuICAgIH1cblxuICAgIGVycm9yKGVycm9yLCB0eXBlID0gXCJERUZBVUxUXCIpIHtcbiAgICAgICAgbGV0IHtzaG93LCBFcnJvck1lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IGVycm9yVHlwZU1lc3NhZ2UgPSBFcnJvck1lc3NhZ2VzW3R5cGVdO1xuICAgICAgICBsZXQge21lc3NhZ2V9ID0gZXJyb3I7XG4gICAgICAgIGxldCBlcnJvclBheWxvYWQgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgdHlwZSA6IGVycm9yVHlwZU1lc3NhZ2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZXJyb3JUeXBlTWVzc2FnZX06ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgQnVzLmVtaXQoZXJyb3JUeXBlTWVzc2FnZSwgZXJyb3IpO1xuICAgICAgICBCdXMuZW1pdChMb2dnaW5nTWVzc2FnZXMuRVJST1IsIGVycm9yUGF5bG9hZCk7XG4gICAgfVxuXG4gICAgZGVidWcobWVzc2FnZSl7XG4gICAgICAgIGxldCB7c2hvd30gPSB0aGlzO1xuXG4gICAgICAgIGlmKHNob3cpe1xuICAgICAgICAgICAgdGhpcy5sb2coYERFQlVHOiAke21lc3NhZ2V9YClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvZyhtZXNzYWdlKSB7XG4gICAgICAgIGxldCB7c2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IGxvZ01lc3NhZ2UgPSBMb2dnaW5nTWVzc2FnZXMuTE9HO1xuICAgICAgICBsZXQgbG9nUGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dNZXNzYWdlfTogJHttZXNzYWdlfWApO1xuICAgICAgICBCdXMuZW1pdChsb2dNZXNzYWdlLCBsb2dQYXlsb2FkKTtcbiAgICB9XG5cbiAgICB0cmFjZShzdGFjaykge1xuICAgICAgICBsZXQge3Nob3csIExvZ2dpbmdNZXNzYWdlcywgQnVzfSA9IHRoaXM7XG4gICAgICAgIGxldCBzdGFja1BheUxvYWQgPSB7XG4gICAgICAgICAgICBzdGFjazogc3RhY2ssXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS50cmFjZShzdGFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBCdXMuZW1pdChMb2dnaW5nTWVzc2FnZXMuVFJBQ0UsIHN0YWNrUGF5TG9hZCk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBUeXBlVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqICYmIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTnVtYmVyKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai52YWx1ZU9mKCkgPT09ICdib29sZWFuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eShvYmopIHtcclxuICAgICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIGxldCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmopO1xyXG4gICAgICAgIGxldCBpc1N0cmluZyA9IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG4gICAgICAgIGxldCBjaGVja0xlbmd0aCA9IGlzQXJyYXkgfHwgaXNTdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzTmFOKG9iaikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQYXJzZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB5b3UgdG8gbWFwIGFuIG9iamVjdCBieSB0aGUga2V5cyBvZiBhIGdpdmVuIG9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBvYmplY3QgdG8gbWFwO1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBydW4gYnkgZWFjaCB2YWx1ZSBhbmQga2V5ICBcclxuICAgICAqL1xyXG4gICAgbWFwS2V5cyhvYmplY3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcbiAgICAgICAgbGV0IG1hcHBlZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICghcmVkdWNlTWFwKSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBtYXBwZWRBcnJheS5wdXNoKGNhbGxiYWNrKHZhbCwga2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWRBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShiYXNlLCBtZXJnZWQsIGlnbm9yZSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRLZXlzID0gT2JqZWN0LmtleXMobWVyZ2VkKTtcclxuICAgICAgICBsZXQgdW5pb25lZE9iamVjdCA9IG5ldyBPYmplY3QoYmFzZSk7XHJcblxyXG4gICAgICAgIG1lcmdlZEtleXMuZm9yRWFjaCgobWVyZ2VkS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKG1lcmdlZEtleSkgPj0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB1bmlvbmVkT2JqZWN0W21lcmdlZEtleV0gPSBtZXJnZWRbbWVyZ2VkS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaW9uZWRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkdWNlKG9iamVjdCwgY2FsbGJhY2ssIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGNhbGxiYWNrKGRlZmF1bHRWYWx1ZSwgdmFsLCBrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhIGNvbGxlY3Rpb24gdG8gZmluZCBpZiBhbnkgb2YgdGhlIHZhbHVlcyBcclxuICAgICAqIHdpdGggdGhlIGtleXMgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIGFueUVtcHR5KGNvbGxlY3Rpb24sIGtleXMpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShlbGVtZW50W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uaW5kZXhPZihlbGVtZW50KSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja0VsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbGVtZW50S2V5cyA9IE9iamVjdC5rZXlzKGNoZWNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRLZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IGNoZWNrRWxlbWVudFtrZXldID09PSBlbGVtZW50W2tleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnQuZm9yRWFjaCgodGVzdEVsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gdGVzdEVsZW1lbnQgPT09IGFycmF5RWxlbWVudFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBvID0gb2JqZWN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBhW2ldO1xyXG4gICAgICAgICAgICBpZiAobiBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9bbl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9bYVthLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBhdGgocGF0aCwgb2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gb2JqZWN0O1xyXG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgcGF0aFBhcnRzLmZvckVhY2goKHBhdGhQYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KHBhdGhQYXJ0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IG9sZERhdGFbcGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShjdXJyZW50RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBzZWUgaWYgdGhlIHZhbHVlcyBcclxuICAgICAqIGF0IHRoZSBrZXlzIGlzIHVuaXF1ZSBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kaWNhdGluZyBcclxuICAgICAqIGlmIHRoZXkgYXJlIHVuaXF1ZSBhbmQgYW55IGVycm9ycyB0aGF0IGRvbid0IG1hdGNoIGZvciBcclxuICAgICAqIGNvcnJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGlzVW5pcXVlKGNvbGxlY3Rpb24gPSBbXSwga2V5cyA9IFtdKSB7XHJcbiAgICAgICAgbGV0IGhhc1VuaXF1ZSA9IHtcclxuICAgICAgICAgICAgaXNVbmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhbGxVbmlxdWVWYWx1ZXMgPSB7fTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldID0gW107XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RVbmlxdWUgPSBzZWxmLmhhcyhhbGxVbmlxdWVWYWx1ZXNba2V5XSwgZWxlbWVudFtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90VW5pcXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5pc1VuaXF1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XS5wdXNoKGVsZW1lbnRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNVbmlxdWU7XHJcbiAgICB9XHJcbn07Il19
