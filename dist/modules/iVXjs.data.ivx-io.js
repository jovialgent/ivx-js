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
            LOG: "",
            DEBUG: "debug"
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
            var _this = this;

            if ((typeof eventArgs === "undefined" ? "undefined" : _typeof(eventArgs)) === 'object') {
                var _ret = function () {
                    var key = eventArgs.key,
                        value = eventArgs.value;

                    var self = _this;
                    var _experience$debugHost = _this.experience.debugHost,
                        debugHost = _experience$debugHost === undefined ? false : _experience$debugHost;

                    var inputNotFound = typeof _this.experience.data[key] === 'undefined' || _this.experience.data[key] === null;

                    if (!debugHost && inputNotFound) {
                        _this.experience.Bus.emit('iVXjs:iVXio:error:event-not-fired', eventArgs, { message: "iVXjs Error Message: Input not found" });
                        _this.iVXjsLog.error({ message: 'iVXjs Error Message: Input not found' }, "IVX_IO");
                        return {
                            v: void 0
                        };
                    }

                    if (value instanceof Date) {
                        value = _this.formatDateForPlatform(key, value);

                        return {
                            v: _this.experience.setData(key, value)
                        };
                    }

                    try {
                        return {
                            v: _this.experience.setData(key, value).then(function (test) {
                                var data = self.experience.data;


                                if (debugHost) {
                                    self.experience.data[key] = value;
                                }

                                self.experience.Log.debug("Current Experience Data", {
                                    group: true,
                                    messages: Object.keys(data).map(function (dataKey, index) {
                                        return {
                                            message: dataKey + ":" + data[dataKey],
                                            data: data[dataKey]
                                        };
                                    })
                                }, data);
                            })
                        };
                    } catch (e) {
                        _this.experience.Bus.emit(iVXioErrors.EVENT_NOT_FIRED, eventArgs, e);
                        _this.iVXjsLog.error(e);
                    }
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/logging.js":43}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _directive = require("./ivx-record-event/directive");

var _directive2 = _interopRequireDefault(_directive);

var _directive3 = require("./ivx-set-completed/directive");

var _directive4 = _interopRequireDefault(_directive3);

var _directive5 = require("./ivx-set-converted/directive");

var _directive6 = _interopRequireDefault(_directive5);

var _directive7 = require("./ivx-set-milestone/directive");

var _directive8 = _interopRequireDefault(_directive7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    new _directive2.default(app, opts);
    new _directive4.default(app, opts);
    new _directive6.default(app, opts);
    new _directive8.default(app, opts);
};

exports.default = _class;

},{"./ivx-record-event/directive":14,"./ivx-set-completed/directive":15,"./ivx-set-converted/directive":16,"./ivx-set-milestone/directive":17}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directive = exports.Directive = function Directive(iVXjs) {
    _classCallCheck(this, Directive);

    this.link = function ($scope, iElm, iAttrs, controller) {
        iElm[0].addEventListener('click', function (event) {
            event.preventDefault();

            var value = iAttrs.ivxRecordEvent;


            iVXjs.experience.recordEvent(value);
        }, false);
    };
};

Directive.$inject = ["iVXjs"];

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    var factoryFunctionCreator = opts.factoryFunctionCreator;


    app.directive('ivxRecordEvent', factoryFunctionCreator(Directive));
};

exports.default = _class;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directive = exports.Directive = function Directive(iVXjs) {
    _classCallCheck(this, Directive);

    this.link = function ($scope, iElm, iAttrs, controller) {
        iElm[0].addEventListener('click', function (event) {
            event.preventDefault();

            iVXjs.experience.setComplete();
        }, false);
    };
};

Directive.$inject = ["iVXjs"];

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    var factoryFunctionCreator = opts.factoryFunctionCreator;


    app.directive('ivxSetCompleted', factoryFunctionCreator(Directive));
};

exports.default = _class;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directive = exports.Directive = function Directive(iVXjs) {
    _classCallCheck(this, Directive);

    this.link = function ($scope, iElm, iAttrs, controller) {
        iElm[0].addEventListener('click', function (event) {
            event.preventDefault();

            var value = iAttrs.ivxSetConverted;


            iVXjs.experience.setConverted(value);
        }, false);
    };
};

Directive.$inject = ["iVXjs"];

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    var factoryFunctionCreator = opts.factoryFunctionCreator;


    app.directive('ivxSetConverted', factoryFunctionCreator(Directive));
};

exports.default = _class;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directive = exports.Directive = function Directive(iVXjs) {
    _classCallCheck(this, Directive);

    this.link = function ($scope, iElm, iAttrs, controller) {
        iElm[0].addEventListener('click', function (event) {
            event.preventDefault();

            var value = iAttrs.ivxSetMilestone;


            iVXjs.experience.setMilestone(value);
        }, false);
    };
};

Directive.$inject = ["iVXjs"];

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    var factoryFunctionCreator = opts.factoryFunctionCreator;


    app.directive('ivxSetMilestone', factoryFunctionCreator(Directive));
};

exports.default = _class;

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require("./action-templates/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    new _index2.default(app, opts);
};

exports.default = _class;

},{"./action-templates/index":13}],20:[function(require,module,exports){
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

},{"../ivx-js/evaluator.js":40}],21:[function(require,module,exports){
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

var _factoryFunctionCreator = require('./components/factory-function-creator');

var _factoryFunctionCreator2 = _interopRequireDefault(_factoryFunctionCreator);

var _index3 = require('./components/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./services/index');

var _index6 = _interopRequireDefault(_index5);

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
          var states = new _index2.default(iVX.experience.story.data.states, iVX.experience.story.inputs, self, reject, experienceHostSettings.debug).states;

          experience.debugHost = experienceHostSettings.debug;

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

if (angular) {
  var app = angular.module('ivx-input-validator', []);

  app.constant('validator', _index2.default);

  try {
    var _app = angular.module('ivx-js');

    _app.constant('iVXjs.data.iVXio', initializeiVXIO);
    _app.constant('validator', _index2.default);

    new _index4.default(_app, { factoryFunctionCreator: _factoryFunctionCreator2.default });
    new _index6.default(_app, { factoryFunctionCreator: _factoryFunctionCreator2.default });
  } catch (e) {
    console.warn('The iVXio Data Module is not attached to the iVXjs module. If this is correct, ignore this warning.');
    console.warn(e);
  }
}

function initializeiVXIO() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  settings.module = iVXio;

  return settings;
};

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/asserts.js":42,"../../../utilities/type-parsers.js":44,"../ivx-js/actions.js":39,"./actions.js":12,"./components/factory-function-creator":18,"./components/index":19,"./input-validators/index.js":26,"./rules.js":36,"./services/index":38}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./checkbox.buttons.js":23}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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
        var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var debugCallBack = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

        _classCallCheck(this, _class);

        this.rawStates = [].concat(states);
        this.storyInputs = Object.assign({}, storyInputs);
        this.experience = experience;
        this.reject = reject;
        this.debug = debug;
        this.debugCallBack = debugCallBack;
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
        key: "createRecommendedSettings",
        value: function createRecommendedSettings(input) {
            var recommendedObject = this.createRecommendObject(input);
            var types = input.types,
                options = input.options,
                attributes = input.attributes;

            var message = "To support this input, it is recommend to create an input on the platform using these settings: \n" + this.createRecommendedReadout(recommendedObject) + "\n        ";

            return {
                message: message,
                settings: recommendedObject
            };
        }
    }, {
        key: "createRecommendedReadout",
        value: function createRecommendedReadout(recommendedObject) {
            var key = recommendedObject.key,
                options = recommendedObject.options,
                types = recommendedObject.types,
                attributes = recommendedObject.attributes;

            var self = this;
            var readout = "Input Key: " + key;
            var typesReadout = "\nRecommended Input Type" + (types.length > 1 ? "s" : "") + ": " + types.join(', ');
            var optionReadout = options.reduce(function (currentOptionReadout, option) {
                return currentOptionReadout + "\n" + self.createObjectReadOut(option, [], '\n');
            }, '');
            var attributeReadout = this.createObjectReadOut(attributes, ["width", "placeholder"], '\n');

            return "" + readout + typesReadout + (options.length > 0 ? "\nOptions:" + optionReadout : "") + (attributeReadout.length > 0 ? "\nAttributes:\n" + attributeReadout : "");
        }
    }, {
        key: "createObjectReadOut",
        value: function createObjectReadOut() {
            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var seperator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

            var keys = Object.keys(obj);

            return keys.reduce(function (readout, key, index) {
                if (ignore.indexOf(key) >= 0) return readout;

                return "" + readout + key + " : " + obj[key] + (index < keys.length - 1 ? seperator : "");
            }, '');
        }
    }, {
        key: "createRecommendObject",
        value: function createRecommendObject(input) {
            var attributes = input.attributes;

            var types = this.getRecommendedInputTypes(input.type);
            var options = this.getOptions(input);

            return {
                key: input.name,
                types: types,
                options: options,
                attributes: attributes
            };
        }
    }, {
        key: "getOptions",
        value: function getOptions(input) {
            var type = input.type;


            switch (type) {
                case "options":
                    {
                        return input.options;
                    }
                case "buttons":
                    {
                        return input.buttons.map(function (button) {
                            return {
                                value: button.value,
                                display: "No Display Recommended"
                            };
                        });
                    }
                case "radio":
                    {
                        return input.radioButtons.map(function (radioButton) {
                            return {
                                value: radioButton.value,
                                display: "No Display Recommended"
                            };
                        });
                    }
            }

            return [];
        }
    }, {
        key: "getRecommendedInputTypes",
        value: function getRecommendedInputTypes(type) {
            return {
                text: ["TextShort", "TextMedium", "TextLarge"],
                textarea: ["TextArea"],
                email: ["Email"],
                checkbox: ["Checkbox"],
                buttons: ["Options"],
                options: ["Options"],
                radio: ["Options"],
                number: ["Number"],
                url: ["Url"],
                date: ["TextShort", "TextMedium", "TextLarge", "Date"]
            }[type];
        }
    }, {
        key: "validateInputs",
        value: function validateInputs() {
            var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var _this = this;

            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var stateIndex = arguments[2];
            var inputValidators = this.inputValidators,
                _storyInputs = this.storyInputs,
                storyInputs = _storyInputs === undefined ? {} : _storyInputs,
                experience = this.experience,
                debug = this.debug,
                debugCallBack = this.debugCallBack;

            var self = this;

            return inputs.map(function (input, index) {
                var name = input.name;

                var storyInput = storyInputs[name];

                if (!storyInput) {
                    var stateName = state.name,
                        id = state.id;

                    var errorMessage = "\niVX.io Story input with key " + name + " can not be found:\nState Id : " + state.id + "\nState Name : " + stateName + "\nState Index : " + stateIndex + "\nInput Name: " + name + "\nInput Index: " + index + "\n                ";

                    var recommend = _this.createRecommendedSettings(input);

                    if (experience.Bus && !debug) {
                        experience.Bus.emit(errorNames.EXPERIENCE, { message: errorMessage });
                    }

                    if (experience.iVXjsLog && !debug) {
                        experience.iVXjsLog.error({
                            message: errorMessage
                        }, "EXPERIENCE");
                    }

                    if (experience.iVXjsLog && debug) {
                        experience.iVXjsLog.warn(errorMessage);
                    }

                    if (!debug) {
                        _this.reject({
                            message: errorMessage,
                            info: {
                                inputName: name,
                                stateId: id,
                                stateName: stateName,
                                stateIndex: stateIndex,
                                inputIndex: index
                            },
                            state: state
                        });
                    }

                    if (debug && debugCallBack) {
                        debugCallBack({
                            message: errorMessage,
                            info: {
                                inputName: name,
                                stateId: id,
                                stateName: stateName,
                                stateIndex: stateIndex,
                                inputIndex: index
                            },
                            state: state,
                            recommend: recommend
                        });
                    }
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

},{"../../../../constants/iVXio.errors.js":5,"./cascading-options.js":22,"./checkbox.js":24,"./email.js":25,"./number.js":27,"./options.js":29,"./text-large.js":31,"./text-medium.js":32,"./text-short.js":33,"./textarea.js":34,"./url.js":35}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./options.buttons.js":28,"./options.radio.js":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"../ivx-js/rules.js":41,"./evaluator.js":20}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = exports.Service = function () {
    function Service(iVXjs) {
        _classCallCheck(this, Service);
    }

    _createClass(Service, [{
        key: 'setScopeExperience',
        value: function setScopeExperience(experience) {
            console.log("GOT TO IVXIO SERVICE");
        }
    }]);

    return Service;
}();

Service.$inject = ['iVXjs'];

var _class = function _class(app, opts) {
    _classCallCheck(this, _class);

    var factoryFunctionCreator = opts.factoryFunctionCreator;


    app.directive('ivxExperienceScope', factoryFunctionCreator(Service));
};

exports.default = _class;

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _experienceScope = require("./experience-scope");

var _experienceScope2 = _interopRequireDefault(_experienceScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(app, opts) {
    // new ExperienceScope(app, opts);

    _classCallCheck(this, _class);
};

exports.default = _class;

},{"./experience-scope":37}],39:[function(require,module,exports){
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

                self.Log.debug("Current Experience Data", {
                    group: true,
                    messages: Object.keys(self.data).map(function (dataKey, index) {
                        return {
                            message: dataKey + ":" + self.data[dataKey],
                            data: self.data[dataKey]
                        };
                    })
                }, self.data);
                resolve(self);
            });

            return setDataPromise;
        }
    }]);

    return Actions;
}();

;

},{"../../../constants/audio.events.js":1,"../../../constants/state.events.js":9}],40:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":44}],41:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":44,"./evaluator.js":40}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var show = this.show,
                LoggingMessages = this.LoggingMessages,
                Bus = this.Bus;

            var logMessage = LoggingMessages.DEBUG;
            var self = this;
            var _options$group = options.group,
                group = _options$group === undefined ? false : _options$group;


            if (group && show) {
                var messages = options.messages;


                console.groupCollapsed(logMessage + ': ' + message);

                messages.forEach(function (message) {
                    var title = message.title,
                        logMesage = message.message;


                    if (title) {
                        console.log(title);
                        self.createMessage(logMesage);
                    } else {
                        self.createMessage(logMesage);
                    }
                });
                console.groupEnd();

                Bus.emit(logMessage, message, options, data);

                return;
            }

            if (show) {
                console.log(logMessage + ':' + message);
                Bus.emit(logMessage, message, {}, data);
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
        key: 'createMessage',
        value: function createMessage(message) {
            if (message !== null && (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object' || Array.isArray(message)) {
                console.dir(message);
            } else {
                console.log(message);
            }
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

},{"../constants/errors.js":3,"../constants/logging.js":8}],44:[function(require,module,exports){
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

},{}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2Vycm9ycy5qcyIsInNyYy9jb25zdGFudHMvaHR0cC5qcyIsInNyYy9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzIiwic3JjL2NvbnN0YW50cy9pVlhpby5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL2xvZ2dpbmcuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvc3RhdGUuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vYWN0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtcmVjb3JkLWV2ZW50L2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtc2V0LWNvbXBsZXRlZC9kaXJlY3RpdmUuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9jb21wb25lbnRzL2FjdGlvbi10ZW1wbGF0ZXMvaXZ4LXNldC1jb252ZXJ0ZWQvZGlyZWN0aXZlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9hY3Rpb24tdGVtcGxhdGVzL2l2eC1zZXQtbWlsZXN0b25lL2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvZmFjdG9yeS1mdW5jdGlvbi1jcmVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2V2YWx1YXRvci5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2luZGV4LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9jYXNjYWRpbmctb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9vcHRpb25zLmJ1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMucmFkaW8uanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbGFyZ2UuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbWVkaXVtLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0LXNob3J0LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvdXJsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vcnVsZXMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9zZXJ2aWNlcy9leHBlcmllbmNlLXNjb3BlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vc2VydmljZXMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvZXZhbHVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvcnVsZXMuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL2xvZ2dpbmcuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsa0JBQU0sTUFaTztBQWFiLG9CQUFTLFFBYkk7QUFjYiwwQkFBYyxjQWREO0FBZWIsd0JBQVksWUFmQztBQWdCYix5QkFBYSxhQWhCQTtBQWlCYixvQkFBUTtBQWpCSyxTQUFqQjs7QUFvQkEsY0FBSyxRQUFMLENBQWMsVUFBZDtBQXZCVTtBQXdCYjs7OzttQ0FFVSxTLEVBQVc7QUFBQSxnQkFDYixTQURhLEdBQ0EsSUFEQSxDQUNiLFNBRGE7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsU0FBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLEtBQUwsR0FBYSxP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OztBQUlEOzs7Ozs7Ozs7bUNBTXFDO0FBQUEsZ0JBQTVCLFVBQTRCLHVFQUFmLEVBQWU7QUFBQSxnQkFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2pDLGdCQUFJLFlBQVk7QUFDWiwwQkFBVSxJQURFO0FBRVosd0JBQVE7QUFGSSxhQUFoQjtBQUlBLGdCQUFJLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsZ0NBQWdCLEdBQWhCLElBQXVCLEVBQXZCO0FBQ0EsMkJBQVcsT0FBWCxDQUFtQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLHdCQUFJLFlBQVksS0FBSyxHQUFMLENBQVMsZ0JBQWdCLEdBQWhCLENBQVQsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBQWhCOztBQUVBLHdCQUFJLFNBQUosRUFBZTtBQUNYLGtDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0I7QUFDbEIsaUNBQUssR0FEYTtBQUVsQixtQ0FBTyxLQUZXO0FBR2xCLG1DQUFPLFFBQVEsR0FBUjtBQUhXLHlCQUF0QjtBQUtBLGtDQUFVLFFBQVYsR0FBcUIsS0FBckI7QUFDSCxxQkFQRCxNQU9PO0FBQ0gsd0NBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTBCLFFBQVEsR0FBUixDQUExQjtBQUNIO0FBQ0osaUJBYkQ7QUFjSCxhQWhCRDs7QUFrQkEsbUJBQU8sU0FBUDtBQUNIOzs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXVkaW9Db25zdGFudHMgZnJvbSBcIi4vYXVkaW8uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBdWRpb0NvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBBRERfUExBWUlOR19DTEFTUzogJ2FkZC1wbGF5aW5nLWNsYXNzJyxcbiAgICAgICAgICAgIEJVRkZFUklORyA6IFwiYnVmZmVyaW5nXCIsXG4gICAgICAgICAgICBDQU5fUExBWTogXCJjYW4tcGxheVwiLFxuICAgICAgICAgICAgRElTUE9TRSA6IFwiZGlzcG9zZVwiLFxuICAgICAgICAgICAgRU5ERUQgOiBcImVuZGVkXCIsXG4gICAgICAgICAgICBHRVRfRFVSQVRJT046IFwiZ2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBNVVRFOiBcIm11dGVcIixcbiAgICAgICAgICAgIFBBVVNFOiBcInBhdXNlXCIsXG4gICAgICAgICAgICBQQVVTRUQ6IFwicGF1c2VkXCIsXG4gICAgICAgICAgICBQTEFZOiBcInBsYXlcIixcbiAgICAgICAgICAgIFBMQVlJTkc6IFwicGxheWluZ1wiLFxuICAgICAgICAgICAgU0VFSzogXCJzZWVrXCIsXG4gICAgICAgICAgICBTRVRfVVAgOiBcInNldC11cFwiLFxuICAgICAgICAgICAgU0VUX0RVUkFUSU9OOiBcInNldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1ZPTFVNRTogXCJzZXQtdm9sdW1lXCIsXG4gICAgICAgICAgICBUSU1FX1VQREFURTogXCJ0aW1lLXVwZGF0ZVwiLFxuICAgICAgICAgICAgVU5NVVRFOiBcInVubXV0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkFVRElPID0gXCJhdWRpb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgIGxldCB7REVMSU1FVEVSLCBBVURJT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7QVVESU99YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgVmlkZW9Db25zdGFudHMgZnJvbSBcIi4vdmlkZW8uanNcIjtcbmltcG9ydCBIdHRwQ29uc3RhbnRzIGZyb20gXCIuL2h0dHAuanNcIjtcbmltcG9ydCBpVlhpb0NvbnN0YW50cyBmcm9tIFwiLi9pVlhpby5qc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHMge1xuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuRVJST1IgPSBcImVycm9yXCI7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBWSURFTzogbmV3IFZpZGVvQ29uc3RhbnRzKCkuVklERU8sXG4gICAgICAgICAgICBIVFRQIDogbmV3IEh0dHBDb25zdGFudHMoKS5IVFRQLFxuICAgICAgICAgICAgVkFMSURBVElPTiA6IFwidmFsaWRhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1VQIDogXCJzZXQtdXBcIixcbiAgICAgICAgICAgIElWWF9JTyA6IG5ldyBpVlhpb0NvbnN0YW50cygpLklWWF9JTyxcbiAgICAgICAgICAgIERFRkFVTFQgOiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgIEFTU0VSVCA6IFwiYXNzZXJ0XCIsXG4gICAgICAgICAgICBFWFBFUklFTkNFOiBcImV4cGVyaWVuY2VcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtFUlJPUiwgREVMSU1FVEVSfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtFUlJPUn0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cblxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5IVFRQID0gXCJodHRwXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgSFRUUH0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7SFRUUH1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9Db25zdGFudHMgZnJvbSBcIi4vaVZYaW8uanNcIjtcbmltcG9ydCBFcnJvckNvbnN0YW50cyBmcm9tIFwiLi9lcnJvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhpb0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuRVJST1IgPSBuZXcgRXJyb3JDb25zdGFudHMoKS5FUlJPUjtcblxuICAgICAgICBsZXQgZXJyb3JUeXBlcyA9IHtcbiAgICAgICAgICAgIEVYUEVSSUVOQ0UgOiBcImV4cGVyaWVuY2VcIixcbiAgICAgICAgICAgIFBMQVRGT1JNX1VOQVZBSUxBQkxFIDogXCJwbGF0Zm9ybS11bmF2YWlsYWJsZVwiLFxuICAgICAgICAgICAgRVZFTlRfTk9UX0ZJUkVEIDogXCJldmVudC1ub3QtZmlyZWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhlcnJvclR5cGVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGVycm9yTmFtZSl7XG4gICAgICAgIGxldCB7RVJST1IsIERFTElNRVRFUn0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0VSUk9SfSR7REVMSU1FVEVSfSR7ZXJyb3JOYW1lfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuSVZYX0lPID0gXCJpVlhpb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIElWWF9JT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7SVZYX0lPfWA7ICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5MT0dHSU5HID0gXCJsb2dcIjtcblxuICAgICAgICBsZXQgbG9nVHlwZXMgPSB7XG4gICAgICAgICAgICBFUlJPUiA6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIFdBUk4gOiBcIndhcm5cIixcbiAgICAgICAgICAgIFRSQUNFIDogXCJ0cmFjZVwiLFxuICAgICAgICAgICAgTE9HIDpcIlwiLFxuICAgICAgICAgICAgREVCVUcgOiBcImRlYnVnXCJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMobG9nVHlwZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24obGV2ZWwpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgTE9HR0lOR30gPSB0aGlzO1xuICAgICAgICBpZihsZXZlbC5sZW5ndGggPD0gMCl7XG4gICAgICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7TE9HR0lOR31gXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7TE9HR0lOR30ke0RFTElNRVRFUn0ke2xldmVsfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc1N0YXRlQ29uc3RhbnRzIGZyb20gXCIuL3N0YXRlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzU3RhdGVDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIENIQU5HRSA6IFwiY2hhbmdlXCIsXG4gICAgICAgICAgICBTVUNDRVNTIDogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBFUlJPUiA6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIEdPIDogXCJnb1wiLFxuICAgICAgICAgICAgTk9UX0ZPVU5EIDogXCJub3QtZm91bmRcIixcbiAgICAgICAgICAgIEdFVF9TVEFURSA6IFwiZ2V0LXN0YXRlXCIsXG4gICAgICAgICAgICBSRVFVRVNUX1NUQVRFIDogXCJyZXF1ZXN0LXN0YXRlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLlNUQVRFID0gXCJzdGF0ZVwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIFNUQVRFfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtTVEFURX1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLlZJREVPID0gXCJ2aWRlb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIFZJREVPfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtWSURFT31gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9FcnJvck5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzXCI7XHJcbmltcG9ydCBMb2dnaW5nIGZyb20gXCIuLi8uLi8uLi91dGlsaXRpZXMvbG9nZ2luZy5qc1wiO1xyXG5cclxubGV0IGlWWGlvRXJyb3JzID0gbmV3IGlWWGlvRXJyb3JOYW1lcygpO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSBsYXllciBvZiB0cmFuc2Zvcm1hdGlvbiB0byBpVlhpbydzIGhvc3QgZnVuY3Rpb25hbGl0eVxyXG4gKiB0byB3b3JrIHdpdGggdGhlIEFjdGlvbiBzeXN0ZW0gaW4gaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgaVZYaW9BY3Rpb25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1bGxzIHRoZSBpVlhpbydzIGV4cGVyaWVuY2UgaG9zdCB0aGF0IHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHVzZSB0byBzZXQgdmFyaW91cyBleHBlcmllbmNlIGRhdGEuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RXhwZXJpZW5jZUhvc3R9IGV4cGVyaWVuY2UgLSBjdXJyZW50IGluc3RhbmNlIG9mIGlWWGlvJ3NcclxuICAgICAqIGV4cGVyaWVuY2UgaG9zdC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgaVZYanNMb2cgPSBuZXcgTG9nZ2luZyhmYWxzZSwgZXhwZXJpZW5jZS5CdXMpKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBleHBlcmllbmNlIGhvc3QgdGhhdCB3aWxsIHBlcmZvcm0gdGhlIFxyXG4gICAgICAgICAqIGFjdGlvbnMgdG8gdGhlIHBsYXRmb3JtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHR5cGUge0V4cGVyaWVuY2VIb3N0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgdGhpcy5pVlhqc0xvZyA9IGlWWGpzTG9nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlcyB0aGUgXCJhbmltYXRlUGFnZUVsZW1lbnRcIiBmcm9tIHRoZSBwbGF0Zm9ybSB0b1xyXG4gICAgICogaVZYanMncyBhY3Rpb24gXCJhbmltYXRlRWxlbWVudC5cIlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYW5pbWF0ZSBwYWdlIGVsZW1lbnQncyBldmVudCBvYmplY3QgXHJcbiAgICAgKiB3aXRoIGEgdGFyZ2V0IGlkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGluZGljYXRlcyB0aGUgYW5pbWF0aW9uIHRvIGFuIGVsZW1lbnQgaXMgZmluaXNoZWQuXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVQYWdlRWxlbWVudChldmVudEFyZ3MpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnRBcmdzLnRhcmdldElEKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSAnIycgKyBldmVudEFyZ3MudGFyZ2V0SURcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZXZlbnRBcmdzLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLmFuaW1hdGVFbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ2xhc3M6IGV2ZW50QXJncy5hbmltYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwbGF0Zm9ybSB1dGlsaXplcyAuTkVUJ3MgdGltZSBmb3JtYXQgYW5kIHJlcXVpcmVzIHRoZSBkYXRlIFxyXG4gICAgICogdmFsdWUgdG8gYmUgaW4gYSBzcGVjaWZpYyBmb3JtYXQgZm9yIERhdGUvRGF0ZXRpbWUgaW5wdXRzLiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGV4cGVyaWVuY2Uga2V5IHRvIHB1bGwgdGhlIGlucHV0IGRpc3BsYXkuXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSB0aGUgZGF0ZSB0byB0cmFuc2Zvcm0gaW50byAuTkVUIHNhZmUgc3RyaW5nLlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAtIGNvcnJlY3RseSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgZm9yIC5ORVQuXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZm9ybWF0RGF0ZUZvclBsYXRmb3JtKGtleSwgZGF0ZSkge1xyXG4gICAgICAgIGxldCB7IGlucHV0cyB9ID0gdGhpcy5leHBlcmllbmNlLnN0b3J5O1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGlucHV0c1trZXldO1xyXG4gICAgICAgIGxldCB7IGRpc3BsYXkgfSA9IGlucHV0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkRhdGVcIjpcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlU3RyaW5nID0gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke2dldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSl9LSR7Z2V0RGF0ZShkYXRlLmdldERhdGUoKSl9YDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1vbnRoKG1vbnRoTnVtKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3JyZWN0ZWRNb250aE51bSA9IChtb250aE51bSArIDEpICUgMTM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkTW9udGhOdW0gPj0gMTAgPyBjb3JyZWN0ZWRNb250aE51bSA6IGAwJHtjb3JyZWN0ZWRNb250aE51bX1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRlKGRhdGVOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGVOdW0gPj0gMTAgPyBkYXRlTnVtIDogYDAke2RhdGVOdW19YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgY3VzdG9tIGV2ZW50IGluIHRoZSBldmVudCBhcmdzIGZvciB0aGUgXHJcbiAgICAgKiBwbGF0Zm9ybSB0byByZWNvcmQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLmN1c3RvbUV2ZW50IC0gZXZlbnQgbmFtZSB0byBiZSByZWNvcmRlZFxyXG4gICAgICogYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgZXZlbnQgd2FzIHN1Y2Nlc3NmdWxseSByZWNvcmRlZCBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHJlY29yZEV2ZW50KGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQgeyBjdXN0b21FdmVudCB9ID0gZXZlbnRBcmdzO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2UucmVjb3JkRXZlbnQoY3VzdG9tRXZlbnQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlLCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXRDb252ZXJ0ZWQgZXZlbnQgd2l0aCBhIGxhYmVsIGlmIG9uZSBpcyBwcm92aWRlZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3MubGFiZWwgLSBjb252ZXJ0ZWQgbGFiZWwgdGhhdCB3aWxsIGJlIHJlY29yZGVkXHJcbiAgICAgKiBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBzZXRDb252ZXJ0ZWQgd2FzIHN1Y2Nlc3NmdWwgYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICBzZXRDb252ZXJ0ZWQoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGxhYmVsIH0gPSBldmVudEFyZ3M7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXRDb252ZXJ0ZWQobGFiZWwpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlLCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXRDb21wbGV0ZWQgZXZlbnQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBzZXRDb21wbGV0ZSB3YXMgc3VjY2Vzc2Z1bCBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldENvbXBsZXRlKGV2ZW50QXJncyA9IHt9KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldENvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUsIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIHNldERhdGEgZXZlbnQgdG8gdGhlIHBsYXRmb3JtIHdpdGggdGhlIGtleSBhbmQgIFxyXG4gICAgICogdmFsdWUgaW4gdGhlIGV2ZW50QXJncy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3Mua2V5IC0gZXhwZXJpZW5jZSBkYXRhIGtleSB0byBiZSBzZXQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLnZhbHVlIC0gZXhwZXJpZW5jZSBkYXRhIHZhbHVlIHRvIGJlIHNldCB0by4gIFxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgZGF0YSB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgdG8gdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICBzZXREYXRhKGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQgeyBrZXksIHZhbHVlIH0gPSBldmVudEFyZ3M7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHsgZGVidWdIb3N0ID0gZmFsc2UgfSA9IHRoaXMuZXhwZXJpZW5jZTtcclxuICAgICAgICAgICAgbGV0IGlucHV0Tm90Rm91bmQgPSB0eXBlb2YgdGhpcy5leHBlcmllbmNlLmRhdGFba2V5XSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5leHBlcmllbmNlLmRhdGFba2V5XSA9PT0gbnVsbFxyXG5cclxuICAgICAgICAgICAgaWYgKCFkZWJ1Z0hvc3QgJiYgaW5wdXROb3RGb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KCdpVlhqczppVlhpbzplcnJvcjpldmVudC1ub3QtZmlyZWQnLCBldmVudEFyZ3MsIHsgbWVzc2FnZTogXCJpVlhqcyBFcnJvciBNZXNzYWdlOiBJbnB1dCBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoeyBtZXNzYWdlOiAnaVZYanMgRXJyb3IgTWVzc2FnZTogSW5wdXQgbm90IGZvdW5kJyB9LCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdERhdGVGb3JQbGF0Zm9ybShrZXksIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldERhdGEoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldERhdGEoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigodGVzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeyBkYXRhIH0gPSBzZWxmLmV4cGVyaWVuY2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVidWdIb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV4cGVyaWVuY2UuZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhwZXJpZW5jZS5Mb2cuZGVidWcoYEN1cnJlbnQgRXhwZXJpZW5jZSBEYXRhYCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogT2JqZWN0LmtleXMoZGF0YSkubWFwKChkYXRhS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2RhdGFLZXl9OiR7ZGF0YVtkYXRhS2V5XX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhW2RhdGFLZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIHNldE1pbGVzdG9uZSB3aXRoIHRoZSBtaWxlc3RvbmUgZGVmaW5lZCBpbiB0aGUgXHJcbiAgICAgKiBldmVudEFyZ3Mgb2JqZWN0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gaG9sZHMgdGhlIG1pbGVzdG9uZSB0byBiZSBzZW5kIHRvIHRoZSBwbGF0Zm9ybS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3MubWlsZXN0b25lIC0gbWlsZXN0b25lIHRvIGJlIHNldC5cclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gaW5kaWNhdGVzIGlmIHRoaXMgbWlsZXN0b25lIHdhcyBzZXQgb24gdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICBzZXRNaWxlc3RvbmUoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IG1pbGVzdG9uZSB9ID0gZXZlbnRBcmdzO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0TWlsZXN0b25lKG1pbGVzdG9uZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUsIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IGlWWFJlY29yZEV2ZW50IGZyb20gXCIuL2l2eC1yZWNvcmQtZXZlbnQvZGlyZWN0aXZlXCI7XG5pbXBvcnQgaVZYU2V0Q29tcGxldGVkIGZyb20gXCIuL2l2eC1zZXQtY29tcGxldGVkL2RpcmVjdGl2ZVwiO1xuaW1wb3J0IGlWWFNldENvbnZlcnRlZCBmcm9tIFwiLi9pdngtc2V0LWNvbnZlcnRlZC9kaXJlY3RpdmVcIjtcbmltcG9ydCBpVlhTZXRNaWxlc3RvbmUgZnJvbSBcIi4vaXZ4LXNldC1taWxlc3RvbmUvZGlyZWN0aXZlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbmV3IGlWWFJlY29yZEV2ZW50KGFwcCwgb3B0cyk7XG4gICAgICAgIG5ldyBpVlhTZXRDb21wbGV0ZWQoYXBwLG9wdHMpO1xuICAgICAgICBuZXcgaVZYU2V0Q29udmVydGVkKGFwcCxvcHRzKTtcbiAgICAgICAgbmV3IGlWWFNldE1pbGVzdG9uZShhcHAsIG9wdHMpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihpVlhqcykge1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGlFbG1bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHsgaXZ4UmVjb3JkRXZlbnQ6IHZhbHVlIH0gPSBpQXR0cnM7XG5cbiAgICAgICAgICAgICAgICBpVlhqcy5leHBlcmllbmNlLnJlY29yZEV2ZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4UmVjb3JkRXZlbnQnLCBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yKERpcmVjdGl2ZSkpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihpVlhqcykge1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGlFbG1bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgaVZYanMuZXhwZXJpZW5jZS5zZXRDb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkRpcmVjdGl2ZS4kaW5qZWN0ID0gW1wiaVZYanNcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbGV0IHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9ID0gb3B0cztcblxuICAgICAgICBhcHBcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2l2eFNldENvbXBsZXRlZCcsIGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IoRGlyZWN0aXZlKSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgaUVsbVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgeyBpdnhTZXRDb252ZXJ0ZWQ6IHZhbHVlIH0gPSBpQXR0cnM7XG5cbiAgICAgICAgICAgICAgICBpVlhqcy5leHBlcmllbmNlLnNldENvbnZlcnRlZCh2YWx1ZSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkRpcmVjdGl2ZS4kaW5qZWN0ID0gW1wiaVZYanNcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbGV0IHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9ID0gb3B0cztcblxuICAgICAgICBhcHBcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2l2eFNldENvbnZlcnRlZCcsIGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IoRGlyZWN0aXZlKSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgaUVsbVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgeyBpdnhTZXRNaWxlc3RvbmU6IHZhbHVlIH0gPSBpQXR0cnM7XG5cbiAgICAgICAgICAgICAgICBpVlhqcy5leHBlcmllbmNlLnNldE1pbGVzdG9uZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkRpcmVjdGl2ZS4kaW5qZWN0ID0gW1wiaVZYanNcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbGV0IHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9ID0gb3B0cztcblxuICAgICAgICBhcHBcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2l2eFNldE1pbGVzdG9uZScsIGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IoRGlyZWN0aXZlKSk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnlGdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xuXHRsZXQgY29uc3RydWN0b3JGbiA9IGNvbnN0cnVjdG9yO1xuXHRsZXQgYXJncyA9IGNvbnN0cnVjdG9yRm4uJGluamVjdDtcblx0bGV0IGZhY3RvcnlGdW5jdGlvbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgXHRyZXR1cm4gbmV3IGNvbnN0cnVjdG9yRm4oLi4uYXJncyk7XG5cdH1cblx0XG5cdGFyZ3MucHVzaChmYWN0b3J5RnVuY3Rpb24pO1xuXG5cdHJldHVybiBhcmdzO1xufSIsImltcG9ydCBBY3Rpb25UZW1wbGF0ZXMgZnJvbSBcIi4vYWN0aW9uLXRlbXBsYXRlcy9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIG5ldyBBY3Rpb25UZW1wbGF0ZXMoYXBwLCBvcHRzKTtcbiAgICB9XG59IiwiaW1wb3J0IEV2YWx1YXRvciBmcm9tIFwiLi4vaXZ4LWpzL2V2YWx1YXRvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2YWx1YXRvciB7XG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKSB7XG4gICAgICAgIHN1cGVyKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcik7XG4gICAgfVxuXG4gICAgc3RvcnlFdmVudHMobGhzLCBpcywgc3RvcnlFdmVudCkge1xuICAgICAgICBsZXQge2V4cGVyaWVuY2V9ID0gdGhpcztcbiAgICAgICAgbGV0IHtldmVudHN9ID0gZXhwZXJpZW5jZTtcblxuICAgICAgICBpZiAoc3RvcnlFdmVudCA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9FdmVudEZpcmVkKGlzLCBldmVudHMsIGV4cGVyaWVuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNbaXNdKHN0b3J5RXZlbnQsIGV2ZW50cyk7XG5cbiAgICAgICAgZnVuY3Rpb24gbm9FdmVudEZpcmVkKGlzLCBldmVudHMsIGV4cGVyaWVuY2UpIHtcbiAgICAgICAgICAgIGxldCBpc0ZpcmVkID0gaXMgPT09ICdmaXJlZCc7XG5cbiAgICAgICAgICAgIHJldHVybiBldmVudHMubGVuZ3RoIDw9IDAgJiYgaXNGaXJlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpcmVkKGV2ZW50LCBldmVudHMpIHtcbiAgICAgICAgbGV0IGZpcmVkRXZlbnQgPSBldmVudHMuZmluZCgoZXZlbnRGaXJlZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudEZpcmVkID09PSBldmVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmaXJlZEV2ZW50ICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICBub3RGaXJlZChldmVudCwgZXZlbnRzKSB7XG4gICAgICAgIGxldCBmaXJlZEV2ZW50ID0gZXZlbnRzLmZpbmQoKGV2ZW50RmlyZWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRGaXJlZCA9PT0gZXZlbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eXBlb2YgZmlyZWRFdmVudCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgcHJvZ3Jlc3MobGhzLCBpcywgcHJvZ3Jlc3MpIHtcbiAgICAgICAgbGV0IHtleHBlcmllbmNlfSA9IHRoaXM7XG4gICAgICAgIGxldCB7cHJvZ3Jlc3M6IGN1cnJlbnRTdG9yeVByb2dyZXNzLCBtaWxlc3RvbmU6IGN1cnJlbnRNaWxlc3RvbmUsIHN0b3J5fSA9IGV4cGVyaWVuY2U7XG4gICAgICAgIGxldCB7cHJvZ3Jlc3NNYXB9ID0gc3Rvcnk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NWYWx1ZSA9IC0xO1xuICAgICAgICBsZXQgY3VycmVudE1pbGVzdG9uZVZhbHVlID0gLTE7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRNaWxlc3RvbmUgJiYgY3VycmVudE1pbGVzdG9uZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE1pbGVzdG9uZVN0cmluZyA9IGN1cnJlbnRNaWxlc3RvbmVbMF0udG9Mb3dlckNhc2UoKSArIGN1cnJlbnRNaWxlc3RvbmUuc3Vic3RyaW5nKDEpO1xuXG4gICAgICAgICAgICBjdXJyZW50TWlsZXN0b25lVmFsdWUgPSBwcm9ncmVzc01hcFtjdXJyZW50TWlsZXN0b25lU3RyaW5nXSA/IHByb2dyZXNzTWFwW2N1cnJlbnRNaWxlc3RvbmVTdHJpbmddIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNTdG9yeVByb2dyZXNzKGN1cnJlbnRTdG9yeVByb2dyZXNzKSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc1N0cmluZyA9IGN1cnJlbnRTdG9yeVByb2dyZXNzWzBdLnRvTG93ZXJDYXNlKCkgKyBjdXJyZW50U3RvcnlQcm9ncmVzcy5zdWJzdHJpbmcoMSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRQcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NNYXBbY3VycmVudFByb2dyZXNzU3RyaW5nXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2dyZXNzID0gcHJvZ3Jlc3NbMF0udG9Mb3dlckNhc2UoKSArIHByb2dyZXNzLnN1YnN0cmluZygxKTtcblxuICAgICAgICBsZXQgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzTWFwW3Byb2dyZXNzXTtcbiAgICAgICAgbGV0IGV2YWx1YXRlUHJvZ3Jlc3MgPSBjdXJyZW50UHJvZ3Jlc3NWYWx1ZSA+IGN1cnJlbnRNaWxlc3RvbmVWYWx1ZSA/IGN1cnJlbnRQcm9ncmVzc1ZhbHVlIDogY3VycmVudE1pbGVzdG9uZVZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzW2lzXShldmFsdWF0ZVByb2dyZXNzLCBwcm9ncmVzc1ZhbHVlKTtcblxuICAgICAgICBmdW5jdGlvbiBpc1N0b3J5UHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcyA9PT0gJ1N0YXJ0ZWQnIHx8IHByb2dyZXNzID09PSAnQ29tcGxldGVkJyB8fCBwcm9ncmVzcyA9PT0gJ0NvbnZlcnRlZCc7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgaVZYaW9BY3Rpb25zIH0gZnJvbSAnLi9hY3Rpb25zLmpzJ1xyXG5pbXBvcnQgeyBpVlhpb1J1bGVzIH0gZnJvbSAnLi9ydWxlcy5qcydcclxuaW1wb3J0IHsgQWN0aW9ucyBhcyBpVlhqc0FjdGlvbnMgfSBmcm9tICcuLi9pdngtanMvYWN0aW9ucy5qcydcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XHJcbmltcG9ydCBJbnB1dFZhbGlkYXRvciBmcm9tIFwiLi9pbnB1dC12YWxpZGF0b3JzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpVlhpb0Vycm9yTmFtZXMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2lWWGlvLmVycm9ycy5qcyc7XHJcbmltcG9ydCBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIGZyb20gXCIuL2NvbXBvbmVudHMvZmFjdG9yeS1mdW5jdGlvbi1jcmVhdG9yXCI7XHJcbmltcG9ydCBpVlhpb0NvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleFwiO1xyXG5pbXBvcnQgaVZYaW9TZXJ2aWNlcyBmcm9tIFwiLi9zZXJ2aWNlcy9pbmRleFwiO1xyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpXHJcbmxldCBvYmplY3RQYXJzZXIgPSBuZXcgT2JqZWN0UGFyc2VycygpXHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGFuIGlWWGlvIGRhdGEgbW9kdWxlIHRoYXQgaVZYanMgY2FuIHVzZSBmb3IgXHJcbiAqIG5hdmlnYXRpb24sIGRhdGEgc2V0dGluZyBhbmQgcHJvZ3Jlc3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgaVZYaW8ge1xyXG5cclxuICAvKipcclxuICAgKiBQdWxscyBpbiBhbnkgbW9kdWxlIHNldHRpbmdzIGFuZCB0aGUgZ2xvYmFsIHNldHRpbmdzXHJcbiAgICogZm9yIHRoaXMgaVZYanMgZXhwZXJpZW5jZSB0byBzZXQgdXAgdGhpcyBpVlhpbyBcclxuICAgKiBlbmhhbmNlIGRhdGEgb2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBtb2R1bGVTZXR0aW5ncyAtIHNldHRpbmdzIHRvIGJlIHBhc3NlZCBpbiB0byB0aGUgXHJcbiAgICogaVZYaW8gRXhwZXJlaW5jZSBob3N0LlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpVlhqc1NldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGlWWGpzIGV4cGVyaWVuY2UuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZXhwZXJpZW5jZUhvc3RTZXR0aW5ncywgaVZYanNTZXR0aW5ncyA9IHt9LCBCdXMsIGlWWGpzTG9nKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb2R1bGUgc2V0dGluZ3MgZm9yIGlWWGlvIHdoaWNoIHdpbGwgYmUgYWxsIHRoZSBzZXR0aW5nc1xyXG4gICAgICogdXNlZCB3aXRoIHRoZSBpVlhpbydzIGV4cGVyaWVuY2UgaG9zdCBzdWNoIGFzIHN0b3J5IGtleXMgYW5kXHJcbiAgICAgKiBmdW5uZWxzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmV4cGVyaWVuY2VIb3N0U2V0dGluZ3MgPSBleHBlcmllbmNlSG9zdFNldHRpbmdzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgaVZYanMgZXhwZXJpZW5jZSBcclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pVlhqc1NldHRpbmdzID0gaVZYanNTZXR0aW5ncztcclxuICAgIHRoaXMuQnVzID0gQnVzO1xyXG4gICAgdGhpcy5pVlhqc0xvZyA9IGlWWGpzTG9nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgdGhlIGN1cnJlbnQgc2V0dGluZ3MgYW5kIHRoZW4gZW5oYW5jZXMgdGhlIHN0b3J5IGRhdGEgXHJcbiAgICogcHVsbGVkIGZyb20gdGhlIGlWWGlvIGV4cGVyaWVuY2UgaG9zdCBhbmQgZW5oYW5jZXMgdGhlbSB0byBcclxuICAgKiB3b3JrIHdpdGggaVZYanMuXHJcbiAgICogXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBhIHByb21pc2UgdGhhdCBldmFsdWF0ZXMgd2hldGhlciB0aGlzIGV4cGVyaWVuY2UgXHJcbiAgICogd2FzIHN1Y2Nlc3NmdWxseSBlbmhhbmNlZC5cclxuICAgKi9cclxuICBlbmhhbmNlKCkge1xyXG4gICAgbGV0IHsgZXhwZXJpZW5jZUhvc3RTZXR0aW5ncyA9IHt9LCBpVlhqc1NldHRpbmdzID0ge30gfSA9IHRoaXM7XHJcbiAgICBsZXQgaVZYaW9FcnJvcnMgPSBuZXcgaVZYaW9FcnJvck5hbWVzKCk7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgIGxldCBlbmhhbmNlbWVudFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgaVZYID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHNlbGYuQnVzLmVtaXQoaVZYaW9FcnJvcnMuUExBVEZPUk1fVU5BVkFJTEFCTEUsIHt9KTtcclxuICAgICAgICB9LCAxMDApXHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLkJ1cy5vbmNlKGlWWGlvRXJyb3JzLkVYUEVSSUVOQ0UsIChlcnJvcikgPT4ge1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpVlgoZXhwZXJpZW5jZUhvc3RTZXR0aW5ncylcclxuICAgICAgICAudGhlbihcclxuICAgICAgICAoaVZYKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWlWWCB8fCAhaVZYLmV4cGVyaWVuY2UgfHwgIWlWWC5leHBlcmllbmNlLnN0b3J5IHx8ICFpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLlBMQVRGT1JNX1VOQVZBSUxBQkxFLCB7fSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsZXQgeyBleHBlcmllbmNlOiBleHBlcmllbmNlU2V0dGluZ3MgPSB7fSwgcnVsZXM6IGN1c3RvbVJ1bGVzIH0gPSBpVlhqc1NldHRpbmdzO1xyXG4gICAgICAgICAgbGV0IGRlZmF1bHRBY3Rpb25zID0gb2JqZWN0UGFyc2VyLm1lcmdlKG5ldyBpVlhqc0FjdGlvbnMoKSwgZXhwZXJpZW5jZVNldHRpbmdzKTtcclxuICAgICAgICAgIGxldCBleHBlcmllbmNlID0gb2JqZWN0UGFyc2VyLm1lcmdlKGRlZmF1bHRBY3Rpb25zLCBpVlguZXhwZXJpZW5jZSk7XHJcbiAgICAgICAgICBsZXQgbW9kaWZpZWRBY3Rpb25zID0gbmV3IGlWWGlvQWN0aW9ucyhleHBlcmllbmNlLCB0aGlzLmlWWGpzTG9nKTtcclxuICAgICAgICAgIGxldCB7IHVpOiBzdG9yeVVJLCB2YWxpZGF0aW9uOiBzdG9yeVZhbGlkYXRpb24gfSA9IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGE7XHJcblxyXG4gICAgICAgICAgaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YSA9IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEgPyBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhIDoge307XHJcblxyXG4gICAgICAgICAgbGV0IHJ1bGVzID0gbmV3IGlWWGlvUnVsZXMoZXhwZXJpZW5jZSwgY3VzdG9tUnVsZXMpLnJ1bGVzO1xyXG4gICAgICAgICAgbGV0IHN0YXRlcyA9IG5ldyBJbnB1dFZhbGlkYXRvcihpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLnN0YXRlcywgaVZYLmV4cGVyaWVuY2Uuc3RvcnkuaW5wdXRzLCBzZWxmLCByZWplY3QsIGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MuZGVidWcpLnN0YXRlcztcclxuXHJcbiAgICAgICAgICBleHBlcmllbmNlLmRlYnVnSG9zdCA9IGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MuZGVidWc7XHJcblxyXG4gICAgICAgICAgZXhwZXJpZW5jZS53aGl0ZUxpc3QgPSBbXHJcbiAgICAgICAgICAgICdzZWxmJyxcclxuICAgICAgICAgICAgJ2h0dHA6Ly9pdngteGFwaS4qLmluZi1lbnYuY29tLyoqJyxcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaXZ4LXhhcGkuKi5pbmYtZW52LmNvbS8qKicsXHJcbiAgICAgICAgICAgICdodHRwczovL3hhcGkuaXZ4LmlvLyoqJ1xyXG4gICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLnN0YXRlcyA9IHN0YXRlcztcclxuICAgICAgICAgIGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEudGl0bGUgPSBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhLnRpdGxlID8gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YS50aXRsZSA6IFwiaVZYIFN0b3J5IFBsYXllclwiO1xyXG5cclxuICAgICAgICAgIGxldCBlbmhhbmNlZGlWWGpzU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIHVpOiBpVlhqc1NldHRpbmdzLnVpLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiBpVlhqc1NldHRpbmdzLnZhbGlkYXRpb24sXHJcbiAgICAgICAgICAgIGNvbmZpZzogaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YSxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZTogZXhwZXJpZW5jZSxcclxuICAgICAgICAgICAgcnVsZXM6IHJ1bGVzLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBtb2RpZmllZEFjdGlvbnNcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmVzb2x2ZShlbmhhbmNlZGlWWGpzU2V0dGluZ3MpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVYUEVSSUVOQ0UsIGVycm9yKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGVuaGFuY2VtZW50UHJvbWlzZVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydCA9IGluaXRpYWxpemVpVlhJTztcclxuXHJcbmlmIChhbmd1bGFyKSB7XHJcbiAgbGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdpdngtaW5wdXQtdmFsaWRhdG9yJywgW10pO1xyXG5cclxuICBhcHAuY29uc3RhbnQoJ3ZhbGlkYXRvcicsIElucHV0VmFsaWRhdG9yKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJyk7XHJcblxyXG4gICAgYXBwLmNvbnN0YW50KCdpVlhqcy5kYXRhLmlWWGlvJywgaW5pdGlhbGl6ZWlWWElPKTtcclxuICAgIGFwcC5jb25zdGFudCgndmFsaWRhdG9yJywgSW5wdXRWYWxpZGF0b3IpO1xyXG5cclxuXHJcbiAgICBuZXcgaVZYaW9Db21wb25lbnRzKGFwcCwgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0pO1xyXG4gICAgbmV3IGlWWGlvU2VydmljZXMoYXBwLCB7ZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9KTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1RoZSBpVlhpbyBEYXRhIE1vZHVsZSBpcyBub3QgYXR0YWNoZWQgdG8gdGhlIGlWWGpzIG1vZHVsZS4gSWYgdGhpcyBpcyBjb3JyZWN0LCBpZ25vcmUgdGhpcyB3YXJuaW5nLicpXHJcbiAgICBjb25zb2xlLndhcm4oZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplaVZYSU8oc2V0dGluZ3MgPSB7fSkge1xyXG4gIHNldHRpbmdzLm1vZHVsZSA9IGlWWGlvO1xyXG5cclxuICByZXR1cm4gc2V0dGluZ3M7XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSl7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBzdG9yeUlucHV0RGF0YTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtzdG9yeUlucHV0RGF0YSA9IHt9LCBqc29uSW5wdXREYXRhID17fX0gPSB0aGlzO1xuICAgICAgICBsZXQgcmF3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIGxldCBuZXdTdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICAgICAgXG4gICAgICAgIHJhd0lucHV0RGF0YS50eXBlID0gXCJjYXNjYWRpbmctb3B0aW9uc1wiO1xuICAgICAgICByYXdJbnB1dERhdGEuZGF0YVRyZWUgPSBuZXdTdG9yeUlucHV0RGF0YS5kYXRhVHJlZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByYXdJbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge2J1dHRvbnMgPSBbXX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQgaGFzRmFsc2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IGhhc1RydWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5ld0J1dHRvbnMgPSBidXR0b25zLnJlZHVjZSgoYnV0dG9uQXJyYXksIGJ1dHRvbkRhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQge3ZhbHVlfSA9IGJ1dHRvbkRhdGE7XG4gICAgICAgICAgICBsZXQgaXNGYWxzZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgJiYgIXZhbHVlO1xuICAgICAgICAgICAgbGV0IGlzVHJ1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgJiYgdmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChpc1RydWUgJiYgIWhhc1RydWUpIHtcbiAgICAgICAgICAgICAgICBidXR0b25BcnJheVswXSA9IGJ1dHRvbkRhdGE7XG4gICAgICAgICAgICAgICAgaGFzVHJ1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0ZhbHNlICYmICFoYXNGYWxzZSkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbkFycmF5WzFdID0gYnV0dG9uRGF0YTtcbiAgICAgICAgICAgICAgICBoYXNGYWxzZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBidXR0b25BcnJheTtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIGlmICghaGFzVHJ1ZSkge1xuICAgICAgICAgICAgbmV3QnV0dG9uc1swXSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJUcnVlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0ZhbHNlKSB7XG4gICAgICAgICAgICBuZXdCdXR0b25zWzFdID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJGYWxzZVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAganNvbklucHV0RGF0YS5idXR0b25zID0gbmV3QnV0dG9ucztcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQnV0dG9ucyBmcm9tIFwiLi9jaGVja2JveC5idXR0b25zLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge3R5cGV9ID0ganNvbklucHV0RGF0YTtcblxuICAgICAgICAgaWYodHlwZSA9PT0gXCJidXR0b25zXCIpe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25zKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhKS5pbnB1dDtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwiY2hlY2tib3hcIjtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCl7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwiZW1haWxcIjtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzJztcblxuLy9WYWxpZGF0b3JzIFxuaW1wb3J0IENhc2NhZGluZ09wdGlvbnMgZnJvbSBcIi4vY2FzY2FkaW5nLW9wdGlvbnMuanNcIlxuaW1wb3J0IENoZWNrYm94IGZyb20gXCIuL2NoZWNrYm94LmpzXCI7XG5pbXBvcnQgRW1haWwgZnJvbSBcIi4vZW1haWwuanNcIjtcbmltcG9ydCBOdW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9vcHRpb25zLmpzXCI7XG5pbXBvcnQgVGV4dEFyZWEgZnJvbSBcIi4vdGV4dGFyZWEuanNcIjtcbmltcG9ydCBUZXh0TGFyZ2UgZnJvbSBcIi4vdGV4dC1sYXJnZS5qc1wiO1xuaW1wb3J0IFRleHRNZWRpdW0gZnJvbSBcIi4vdGV4dC1tZWRpdW0uanNcIjtcbmltcG9ydCBUZXh0U2hvcnQgZnJvbSBcIi4vdGV4dC1zaG9ydC5qc1wiO1xuaW1wb3J0IFVybCBmcm9tIFwiLi91cmwuanNcIjtcblxuY29uc3QgZXJyb3JOYW1lcyA9IG5ldyBpVlhpb0Vycm9yTmFtZXMoKTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGVzLCBzdG9yeUlucHV0cywgZXhwZXJpZW5jZSwgcmVqZWN0LCBkZWJ1ZyA9IGZhbHNlLCBkZWJ1Z0NhbGxCYWNrID0gKCk9Pnt9KSB7XG4gICAgICAgIHRoaXMucmF3U3RhdGVzID0gW10uY29uY2F0KHN0YXRlcyk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dHMgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0cyk7XG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XG4gICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB0aGlzLmRlYnVnID0gZGVidWc7XG4gICAgICAgIHRoaXMuZGVidWdDYWxsQmFjayA9IGRlYnVnQ2FsbEJhY2s7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVJbnB1dFN0YXRlcyh0aGlzLnJhd1N0YXRlcyk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0VmFsaWRhdG9ycygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIENhc2NhZGluZ09wdGlvbnMsXG4gICAgICAgICAgICBDaGVja2JveCxcbiAgICAgICAgICAgIEVtYWlsLFxuICAgICAgICAgICAgTnVtYmVyLFxuICAgICAgICAgICAgT3B0aW9ucyxcbiAgICAgICAgICAgIFRleHRBcmVhLFxuICAgICAgICAgICAgVGV4dExhcmdlLFxuICAgICAgICAgICAgVGV4dE1lZGl1bSxcbiAgICAgICAgICAgIFRleHRTaG9ydCxcbiAgICAgICAgICAgIFVybFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVJbnB1dFN0YXRlcyhzdGF0ZXMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc3RhdGVzLm1hcCgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgaW5wdXRzID0gW10gfSA9IHN0YXRlO1xuXG4gICAgICAgICAgICAgICAgc3RhdGUuaW5wdXRzID0gc2VsZi52YWxpZGF0ZUlucHV0cyhpbnB1dHMsIHN0YXRlLCBpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVjb21tZW5kZWRTZXR0aW5ncyhpbnB1dCkge1xuICAgICAgICBsZXQgcmVjb21tZW5kZWRPYmplY3QgPSB0aGlzLmNyZWF0ZVJlY29tbWVuZE9iamVjdChpbnB1dCk7XG4gICAgICAgIGxldCB7IHR5cGVzLCBvcHRpb25zLCBhdHRyaWJ1dGVzIH0gPSBpbnB1dDtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgVG8gc3VwcG9ydCB0aGlzIGlucHV0LCBpdCBpcyByZWNvbW1lbmQgdG8gY3JlYXRlIGFuIGlucHV0IG9uIHRoZSBwbGF0Zm9ybSB1c2luZyB0aGVzZSBzZXR0aW5nczogXG4ke3RoaXMuY3JlYXRlUmVjb21tZW5kZWRSZWFkb3V0KHJlY29tbWVuZGVkT2JqZWN0KX1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHNldHRpbmdzOiByZWNvbW1lbmRlZE9iamVjdFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVjb21tZW5kZWRSZWFkb3V0KHJlY29tbWVuZGVkT2JqZWN0KSB7XG4gICAgICAgIGxldCB7IGtleSwgb3B0aW9ucywgdHlwZXMsIGF0dHJpYnV0ZXMgfSA9IHJlY29tbWVuZGVkT2JqZWN0O1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZWFkb3V0ID0gYElucHV0IEtleTogJHtrZXl9YDtcbiAgICAgICAgbGV0IHR5cGVzUmVhZG91dCA9IGBcXG5SZWNvbW1lbmRlZCBJbnB1dCBUeXBlJHt0eXBlcy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwifTogJHt0eXBlcy5qb2luKCcsICcpfWA7XG4gICAgICAgIGxldCBvcHRpb25SZWFkb3V0ID0gb3B0aW9ucy5yZWR1Y2UoKGN1cnJlbnRPcHRpb25SZWFkb3V0LCBvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50T3B0aW9uUmVhZG91dH1cXG4ke3NlbGYuY3JlYXRlT2JqZWN0UmVhZE91dChvcHRpb24sIFtdLCAnXFxuJyl9YFxuICAgICAgICB9LCAnJyk7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVSZWFkb3V0ID0gdGhpcy5jcmVhdGVPYmplY3RSZWFkT3V0KGF0dHJpYnV0ZXMsIFtcIndpZHRoXCIsIFwicGxhY2Vob2xkZXJcIl0sICdcXG4nKTtcblxuICAgICAgICByZXR1cm4gYCR7cmVhZG91dH0ke3R5cGVzUmVhZG91dH0ke29wdGlvbnMubGVuZ3RoID4gMCA/IFwiXFxuT3B0aW9uczpcIiArIG9wdGlvblJlYWRvdXQgOiBcIlwifSR7YXR0cmlidXRlUmVhZG91dC5sZW5ndGggPiAwID8gXCJcXG5BdHRyaWJ1dGVzOlxcblwiICsgYXR0cmlidXRlUmVhZG91dCA6IFwiXCJ9YDtcbiAgICB9XG5cbiAgICBjcmVhdGVPYmplY3RSZWFkT3V0KG9iaiA9IHt9LCBpZ25vcmUgPSBbXSwgc2VwZXJhdG9yID0gXCJcIikge1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKChyZWFkb3V0LCBrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaWdub3JlLmluZGV4T2Yoa2V5KSA+PSAwKSByZXR1cm4gcmVhZG91dDtcblxuICAgICAgICAgICAgcmV0dXJuIGAke3JlYWRvdXR9JHtrZXl9IDogJHtvYmpba2V5XX0ke2luZGV4IDwga2V5cy5sZW5ndGggLSAxID8gc2VwZXJhdG9yIDogXCJcIn1gXG4gICAgICAgIH0sICcnKVxuICAgIH1cblxuICAgIGNyZWF0ZVJlY29tbWVuZE9iamVjdChpbnB1dCkge1xuICAgICAgICBsZXQgeyBhdHRyaWJ1dGVzIH0gPSBpbnB1dDtcbiAgICAgICAgbGV0IHR5cGVzID0gdGhpcy5nZXRSZWNvbW1lbmRlZElucHV0VHlwZXMoaW5wdXQudHlwZSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKGlucHV0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBpbnB1dC5uYW1lLFxuICAgICAgICAgICAgdHlwZXMsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgYXR0cmlidXRlc1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRPcHRpb25zKGlucHV0KSB7XG4gICAgICAgIGxldCB7IHR5cGUgfSA9IGlucHV0O1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9wdGlvbnNcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5vcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcImJ1dHRvbnNcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5idXR0b25zLm1hcChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGJ1dHRvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiTm8gRGlzcGxheSBSZWNvbW1lbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyYWRpb1wiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJhZGlvQnV0dG9ucy5tYXAocmFkaW9CdXR0b24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJhZGlvQnV0dG9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJObyBEaXNwbGF5IFJlY29tbWVuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgZ2V0UmVjb21tZW5kZWRJbnB1dFR5cGVzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRleHQ6IFtcIlRleHRTaG9ydFwiLCBcIlRleHRNZWRpdW1cIiwgXCJUZXh0TGFyZ2VcIl0sXG4gICAgICAgICAgICB0ZXh0YXJlYTogW1wiVGV4dEFyZWFcIl0sXG4gICAgICAgICAgICBlbWFpbDogW1wiRW1haWxcIl0sXG4gICAgICAgICAgICBjaGVja2JveDogW1wiQ2hlY2tib3hcIl0sXG4gICAgICAgICAgICBidXR0b25zOiBbXCJPcHRpb25zXCJdLFxuICAgICAgICAgICAgb3B0aW9uczogW1wiT3B0aW9uc1wiXSxcbiAgICAgICAgICAgIHJhZGlvOiBbXCJPcHRpb25zXCJdLFxuICAgICAgICAgICAgbnVtYmVyOiBbXCJOdW1iZXJcIl0sXG4gICAgICAgICAgICB1cmw6IFtcIlVybFwiXSxcbiAgICAgICAgICAgIGRhdGU6IFtcIlRleHRTaG9ydFwiLCBcIlRleHRNZWRpdW1cIiwgXCJUZXh0TGFyZ2VcIiwgXCJEYXRlXCJdXG4gICAgICAgIH1bdHlwZV07XG4gICAgfVxuXG4gICAgdmFsaWRhdGVJbnB1dHMoaW5wdXRzID0gW10sIHN0YXRlID0ge30sIHN0YXRlSW5kZXgpIHtcbiAgICAgICAgbGV0IHsgaW5wdXRWYWxpZGF0b3JzLCBzdG9yeUlucHV0cyA9IHt9LCBleHBlcmllbmNlLCBkZWJ1ZywgZGVidWdDYWxsQmFjayB9ID0gdGhpcztcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBpbnB1dHMubWFwKChpbnB1dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCB7IG5hbWUgfSA9IGlucHV0O1xuICAgICAgICAgICAgbGV0IHN0b3J5SW5wdXQgPSBzdG9yeUlucHV0c1tuYW1lXTtcblxuICAgICAgICAgICAgaWYgKCFzdG9yeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgbmFtZTogc3RhdGVOYW1lLCBpZCB9ID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBcbmlWWC5pbyBTdG9yeSBpbnB1dCB3aXRoIGtleSAke25hbWV9IGNhbiBub3QgYmUgZm91bmQ6XG5TdGF0ZSBJZCA6ICR7c3RhdGUuaWR9XG5TdGF0ZSBOYW1lIDogJHtzdGF0ZU5hbWV9XG5TdGF0ZSBJbmRleCA6ICR7c3RhdGVJbmRleH1cbklucHV0IE5hbWU6ICR7bmFtZX1cbklucHV0IEluZGV4OiAke2luZGV4fVxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVjb21tZW5kID0gdGhpcy5jcmVhdGVSZWNvbW1lbmRlZFNldHRpbmdzKGlucHV0KTtcblxuICAgICAgICAgICAgICAgIGlmIChleHBlcmllbmNlLkJ1cyAmJiAhZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZS5CdXMuZW1pdChlcnJvck5hbWVzLkVYUEVSSUVOQ0UsIHsgbWVzc2FnZTogZXJyb3JNZXNzYWdlIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChleHBlcmllbmNlLmlWWGpzTG9nICYmICFkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBleHBlcmllbmNlLmlWWGpzTG9nLmVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB9LCBcIkVYUEVSSUVOQ0VcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV4cGVyaWVuY2UuaVZYanNMb2cgJiYgZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZS5pVlhqc0xvZy53YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoIWRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dE5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBzdGF0ZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJbmRleDogc3RhdGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEluZGV4OiBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGRlYnVnICYmIGRlYnVnQ2FsbEJhY2spe1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Z0NhbGxCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dE5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBzdGF0ZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJbmRleDogc3RhdGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEluZGV4OiBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb21tZW5kXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgZGlzcGxheSB9ID0gc3RvcnlJbnB1dDtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gaW5wdXRWYWxpZGF0b3JzW2Rpc3BsYXldO1xuICAgICAgICAgICAgICAgIGxldCBuZXdJbnB1dCA9IHNlbGYuZ2xvYmFsQXR0cmlidXRlc1NldChzdG9yeUlucHV0LCBpbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmFsaWRhdG9yKG5ld0lucHV0LCBzdG9yeUlucHV0KS5pbnB1dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnbG9iYWxBdHRyaWJ1dGVzU2V0KHN0b3J5SW5wdXREYXRhLCBqc29uSW5wdXREYXRhKSB7XG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXM6IHN0b3J5QXR0cmlidXRlcyA9IHt9IH0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHsgcmVxdWlyZWQ6IHN0b3J5UmVxdWlyZWQgPSBcImZhbHNlXCIgfSA9IHN0b3J5QXR0cmlidXRlcztcbiAgICAgICAgbGV0IG5ld0lucHV0ID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXM6IGlucHV0QXR0cmlidXRlcyA9IHt9IH0gPSBuZXdJbnB1dDtcbiAgICAgICAgbGV0IHsgcmVxdWlyZWQ6IGlucHV0UmVxdWlyZWQgPSBmYWxzZSB9ID0gaW5wdXRBdHRyaWJ1dGVzO1xuXG4gICAgICAgIG5ld0lucHV0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBpbnB1dEF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiBzdG9yeVJlcXVpcmVkID09PSBcInRydWVcIiA/IHRydWUgOiBpbnB1dFJlcXVpcmVkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dDtcbiAgICB9XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgbGV0IHttYXg6IHN0b3J5TWF4QXR0cmlidXRlID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIG1pbjogc3RvcnlNaW5BdHRyaWJ1dGUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiwgc3RlcDogc3RvcnlTdGVwQXR0cmlidXRlID0gMX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXg6IGpzb25NYXhBdHRyaWJ1dGUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiwgbWluOiBqc29uTWluQXR0cmlidXRlID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIHN0ZXA6IGpzb25TdGVwQXR0cmlidXRlID0gMX0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQgdXNlU3RvcnlNaW4gPSBqc29uTWluQXR0cmlidXRlID4gc3RvcnlNaW5BdHRyaWJ1dGU7XG4gICAgICAgIGxldCB1c2VTdG9yeU1heCA9IGpzb25NYXhBdHRyaWJ1dGUgPCBzdG9yeU1heEF0dHJpYnV0ZTtcbiAgICAgICAgbGV0IHVzZVN0b3J5U3RlcCA9IHR5cGVvZiBzdG9yeVN0ZXBBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICBtaW4gOiBuZXcgTnVtYmVyKHVzZVN0b3J5TWluPyBzdG9yeU1pbkF0dHJpYnV0ZSA6IGpzb25NaW5BdHRyaWJ1dGUpLnZhbHVlT2YoKSwgXG4gICAgICAgICAgIG1heCA6IG5ldyBOdW1iZXIodXNlU3RvcnlNYXggPyBzdG9yeU1heEF0dHJpYnV0ZSA6IGpzb25NYXhBdHRyaWJ1dGUpLnZhbHVlT2YoKSwgXG4gICAgICAgICAgIHN0ZXAgOiBuZXcgTnVtYmVyKHVzZVN0b3J5U3RlcCA/IHN0b3J5U3RlcEF0dHJpYnV0ZSA6IGpzb25TdGVwQXR0cmlidXRlKS52YWx1ZU9mKCksIFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fX0gPSB0aGlzO1xuICAgICAgICBsZXQge2J1dHRvbnMgPSBbXX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQge29wdGlvbnMgPSBbXX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IG5ld0J1dHRvbnMgPSBvcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGhhc0J1dHRvbihvcHRpb24sIGJ1dHRvbnMpO1xuXG4gICAgICAgICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQge2Rpc3BsYXksIHZhbHVlfSA9IG9wdGlvbjtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGlzcGxheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG5ld0lucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIFxuICAgICAgICAgICAganNvbklucHV0RGF0YSwge1xuICAgICAgICAgICAgYnV0dG9uczogbmV3QnV0dG9ucyxcbiAgICAgICAgICAgIHR5cGUgOiBcImJ1dHRvbnNcIlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3SW5wdXREYXRhO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhc0J1dHRvbihvcHRpb24sIGJ1dHRvbnMgPSBbXSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbnMuZmluZChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b24udmFsdWUgPT09IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJpbXBvcnQgQnV0dG9ucyBmcm9tIFwiLi9vcHRpb25zLmJ1dHRvbnMuanNcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9vcHRpb25zLnJhZGlvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge3R5cGV9ID0ganNvbklucHV0RGF0YTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJidXR0b25zXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9ucyhqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSkuaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhZGlvKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhKS5pbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB7b3B0aW9uc30gPSBzdG9yeUlucHV0RGF0YTtcblxuICAgICAgICBsZXQgbmV3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9wdGlvbnNcIlxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge319ID0gdGhpcztcbiAgICAgICAgbGV0IHtyYWRpb0J1dHRvbnMgPSBbXX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQge29wdGlvbnMgPSBbXX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IG5ld1JhZGlvQnV0dG9ucyA9IG9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBsZXQge2Rpc3BsYXksIHZhbHVlfSA9IG9wdGlvbjtcbiAgICAgICAgICAgIGxldCByYWRpbyA9IGhhc1JhZGlvKG9wdGlvbiwgcmFkaW9CdXR0b25zKTtcblxuICAgICAgICAgICAgaWYgKHJhZGlvKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JhZGlvID0gT2JqZWN0LmFzc2lnbih7fSwgcmFkaW8pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JhZGlvO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGlzcGxheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG5ld0lucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLCB7XG4gICAgICAgICAgICAgICAgcmFkaW9CdXR0b25zOiBuZXdSYWRpb0J1dHRvbnMsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJyYWRpb1wiXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dERhdGE7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFzUmFkaW8ob3B0aW9uLCByYWRpb0J1dHRvbnMgPSBbXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJhZGlvQnV0dG9ucy5maW5kKHJhZGlvQnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFkaW9CdXR0b24udmFsdWUgPT09IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSAyNTY7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gMTI4O1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7ICBcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUgPSAwfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IG5ldyBOdW1iZXIoc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPCBtYXhDaGFyYWN0ZXJzID8gc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgOiAganNvbk1heExlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpLFxuICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogbmV3IE51bWJlcih0eXBlb2Ygc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQgbWF4Q2hhcmFjdGVycyA9IDY0XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gMTAyNDtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCl7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidXJsXCI7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImltcG9ydCBFdmFsdWF0b3IgZnJvbSAnLi9ldmFsdWF0b3IuanMnO1xyXG5pbXBvcnQge1J1bGVzfSBmcm9tIFwiLi4vaXZ4LWpzL3J1bGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGFuIGlWWGlvIFJ1bGVzIGZ1bmN0aW9uIHRoYXQgYWxsb3dzIG5hdmlnYXRpb24gYW5kIFxyXG4gKiBydWxlIGV2YWx1YXRpb24gYmFzZWQgb24gYm90aCBleHBlcmllbmNlIGRhdGEgYW5kIHByb2dyZXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGlWWGlvUnVsZXMgZXh0ZW5kcyBSdWxlcyB7XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjdXJyZW50IGV4cGVyaWVuY2UgdG8gdGhpcyBjbGFzcyB0byBoZWxwXHJcbiAgICAgKiBwcm9jZXNzIGJvdGggZGF0YSBhbmQgcHJvZ3Jlc3MgaW5mb3JtYWl0b24uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7aVZYaW9FeHBlcmllY2V9IGV4cGVyaWVuY2UgLSBpVlhpbyBFeHBlcmllbmNlIG9iamVjdFxyXG4gICAgICogY29udGFpbmluZyBhbGwgdGhlIGluZm9ybWF0aW9uIGZvciB0aGVzZSBydWxlcyB0byBldmFsdWF0ZSBvbi5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRvciA9IG5ldyBFdmFsdWF0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihpVlhqcykge1xuXG5cbiAgICB9XG5cbiAgICBzZXRTY29wZUV4cGVyaWVuY2UoZXhwZXJpZW5jZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdPVCBUTyBJVlhJTyBTRVJWSUNFXCIpXG4gICAgfVxufVxuXG5TZXJ2aWNlLiRpbmplY3QgPSBbJ2lWWGpzJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbGV0IHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9ID0gb3B0cztcblxuICAgICAgICBhcHBcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2l2eEV4cGVyaWVuY2VTY29wZScsIGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IoU2VydmljZSkpO1xuICAgIH1cbn0iLCJpbXBvcnQgRXhwZXJpZW5jZVNjb3BlIGZyb20gXCIuL2V4cGVyaWVuY2Utc2NvcGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICAvLyBuZXcgRXhwZXJpZW5jZVNjb3BlKGFwcCwgb3B0cyk7XG4gICAgfVxufSIsImltcG9ydCBBdWRpb0V2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy9hdWRpby5ldmVudHMuanNcIjtcclxuaW1wb3J0IFN0YXRlRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qc1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuZCBydW5zIGFsbCBhY3Rpb25zIGZvciB0aGlzIGV4cGVyaWVuY2UuIEFuIGFjdGlvblxyXG4gKiBpcyBhbnkgcHJvY2VzcyB0aGF0IG5lZWRzIHRvIHJldHVybiBhIHByb21pc2UgaW5kaWNhdGluZyB0aGF0IFxyXG4gKiBpdCBmaW5pc2hlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBkZWZhdWx0IGRhdGEgb2JqZWN0IHRvIGJlIHVzZWQgYnkgdmFyaW91c1xyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbiBlbXB0eSBkYXRhIG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBzZXQgYW5kIFxyXG4gICAgICAgICAqIHJlY29yZCBkYXRhIHVzaW5nIHRoaXMgc2V0RGF0YSBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FdmVudE5hbWVzID0gbmV3IEF1ZGlvRXZlbnROYW1lcygpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVFdmVudE5hbWVzID0gbmV3IFN0YXRlRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBjbGFzc2VzIG9uIGFuIGVsZW1lbnQgdGhhdCB3aWxsIGNhdXNlIHRoZSBlbGVtZW50IHRvIGFuaW1hdGUuXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxOb2RlfSBlbGVtZW50IC0gZWxlbWVudCBmb3IgdGhlIGNsYXNzIHRvIGJlIHNldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50T2JqIC0gYW5pbWF0aW9uIGV2ZW50IGRhdGEuXHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MTm9kZX0gdGhlIGVsZW1lbnQgd2l0aCB0aGUgY2xhc3NlcyByZXBsYWNlZC4gIFxyXG4gICAgICovXHJcbiAgICBzZXRFbGVtZW50Q2xhc3NlcyhlbGVtZW50LCBldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IGFuaW1hdGlvbkNsYXNzZXMgPSBcIlwiIH0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgeyBhbmltYXRpb25DbGFzczogb2xkQW5pbWF0aW9uQ2xhc3MgfSA9IGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGFuaW1hdGlvbkNsYXNzZXMpID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoJ2hpZGUnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnaGlkZScsIGFuaW1hdGlvbkNsYXNzZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2xkQW5pbWF0aW9uQ2xhc3MpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG9sZEFuaW1hdGlvbkNsYXNzLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LmFuaW1hdGlvbkNsYXNzID0gYW5pbWF0aW9uQ2xhc3NlcztcclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGAke2VsZW1lbnQuY2xhc3NOYW1lfSAke2FuaW1hdGlvbkNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub05leHRTdGF0ZShldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IG5leHQ6IG5hdkFycmF5IH0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMucnVsZXMobmF2QXJyYXkpO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChzZWxmLnN0YXRlRXZlbnROYW1lcy5HTywgeyBzdGF0ZUlkOiBuZXh0U3RhdGUgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVFbGVtZW50KGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHsgZWxlbWVudCB9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25FbGVtZW50cyB8fCBhbmltYXRpb25FbGVtZW50cy5sZW5ndGggPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20oYW5pbWF0aW9uRWxlbWVudHMpO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBhbmltYXRpb25FbGVtZW50ID0gdGhpcy5zZXRFbGVtZW50Q2xhc3NlcyhhbmltYXRpb25FbGVtZW50LCBldmVudE9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGVFbGVtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkVuZHMgPSBbXHJcbiAgICAgICAgICAgICAgICAnd2Via2l0QW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdtb3pBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgJ01TQW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdvc2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICAgICAnYW5pbWF0aW9uZW5kJ1xyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0aW9uRW5kcy5mb3JFYWNoKChhbmltYXRpb25FbmROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmROYW1lLCBlbmRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZW5kQW5pbWF0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZHMuZm9yRWFjaCgoYW5pbWF0aW9uRW5kTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LmFuaW1hdGlvbkNsYXNzID0gZXZlbnRPYmouYW5pbWF0aW9uQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZE5hbWUsIGVuZEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5pbWF0ZUVsZW1lbnRQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TdGF0ZShldmVudE9iaiwgaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQgeyBzdGF0ZSB9ID0gZXZlbnRPYmo7XHJcblxyXG4gICAgICAgIGlmIChpVlhqc0J1cykge1xyXG4gICAgICAgICAgICBpVlhqc0J1cy5lbWl0KHRoaXMuc3RhdGVFdmVudE5hbWVzLkdPLCBldmVudE9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBdWRpb0NsaXAoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQgeyBhdWRpb0V2ZW50TmFtZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnRPYmopIHtcclxuICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChhdWRpb0V2ZW50TmFtZXMuU0VUX1VQLCBldmVudE9iaik7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzLmVtaXQoYXVkaW9FdmVudE5hbWVzLlBMQVkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5CdXMub24oYXVkaW9FdmVudE5hbWVzLlRJTUVfVVBEQVRFLCAoY3VycmVudEF1ZGlvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QXVkaW8uaWQgPT09IGV2ZW50T2JqLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50QXVkaW8ucnVuQ3VlUG9pbnRzKHNlbGYucHJvY2Vzc29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYXVkaW9DbGlwUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5CdXMub25jZShhdWRpb0V2ZW50TmFtZXMuRU5ERUQsIChjdXJyZW50QXVkaW8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QXVkaW8uaWQgPT09IGV2ZW50T2JqLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wcm9jZXNzb3IucmVzb2x2ZUFjdGlvbnMoZXZlbnRPYmoub25FbmQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvQ2xpcFByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YShldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IGtleSwgdmFsdWUgfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2V0RGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YVtrZXldID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxvZy5kZWJ1ZyhgQ3VycmVudCBFeHBlcmllbmNlIERhdGFgLCB7XHJcbiAgICAgICAgICAgICAgICBncm91cDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBPYmplY3Qua2V5cyhzZWxmLmRhdGEpLm1hcCgoZGF0YUtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtkYXRhS2V5fToke3NlbGYuZGF0YVtkYXRhS2V5XX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZWxmLmRhdGFbZGF0YUtleV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCBzZWxmLmRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHNlbGYpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBzZXREYXRhUHJvbWlzZTtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3Ipe1xyXG4gICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgICB0aGlzLmN1c3RvbUV2YWx1YXRvciA9IGN1c3RvbUV2YWx1YXRvcjtcclxuICAgIH1cclxuXHJcbiAgICBldmFsdWF0ZShydWxlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjb25kaXRpb25PcGVyYXRvciA9IFwiYW5kXCIsIGNvbmRpdGlvbnN9ID0gcnVsZTtcclxuICAgICAgICBsZXQgZXZhbHVhdGVDb25kaXRpb25zID0gY29uZGl0aW9ucy5tYXAoKGNvbmRpdGlvbiwgaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBsZXQge2tleSA6IGxocywgaXMsIHZhbHVlIDogcmhzLCB0eXBlID0gXCJpbnB1dFwifSA9IGNvbmRpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuY3VzdG9tRXZhbHVhdG9yICYmIHR5cGVWYWxpZGF0b3IuaXNGdW5jdGlvbihzZWxmLmN1c3RvbUV2YWx1YXRvcikgJiYgc2VsZi5jdXN0b21FdmFsdWF0b3IoY29uZGl0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jdXN0b21FdmFsdWF0b3IoY29uZGl0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2luY2Ugb2xkZXIgdmVyc2lvbnMgb2YgdGhlIGlWWGpzIEpTT04gdXNlZCBcclxuICAgICAgICAgICAgLy8gdGhlIGtleSBmb3IgXCJrZXl3b3JkXCIgdGhpcyB3aWxsIG1ha2UgaXQgYmFja3dhcmRzXHJcbiAgICAgICAgICAgIC8vIGNvbXBhdGFibGVcclxuICAgICAgICAgICAgaWYoc2VsZltsaHNdKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmW2xoc10obGhzLCBpcywgcmhzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNlbGZbdHlwZV0obGhzLCBpcywgcmhzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbY29uZGl0aW9uT3BlcmF0b3JdKGV2YWx1YXRlQ29uZGl0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQobGhzLCBpcywgcmhzKXtcclxuICAgICAgICBsZXQge2V4cGVyaWVuY2V9ID0gdGhpcztcclxuICAgICAgICBsZXQgbGhzVmFsdWUgPSBleHBlcmllbmNlLmRhdGFbbGhzXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbaXNdKGxoc1ZhbHVlLCByaHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuZChwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSAmJiBwcmVkaWNhdGU7XHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBvcihwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSB8fCBwcmVkaWNhdGU7XHJcbiAgICAgICAgfSxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90KHByZWRpY2F0ZXMgPSBbXSl7XHJcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXMucmVkdWNlKChldmFsdWF0ZSwgcHJlZGljYXRlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRlICYmICFwcmVkaWNhdGU7XHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbHRlKGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpIDw9IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbHQobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPCBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgZ3RlKGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpID49IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ3QobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPiBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGVxdWFscyhsaHMsIHJocyl7XHJcbiAgICAgICAgcmV0dXJuIGxocyA9PT0gcmhzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBub3RFcXVhbHMobGhzLHJocyl7XHJcbiAgICAgICAgcmV0dXJuIGxocyAhPT0gcmhzO1xyXG4gICAgfVxyXG5cclxuICAgIGluKGxocyxyaHMpe1xyXG4gICAgICAgIHJldHVybiByaHMuaW5kZXhPZihsaHMpID49IDA7XHJcbiAgICB9ICAgICAgICBcclxufSIsImltcG9ydCBFdmFsdWF0b3IgZnJvbSAnLi9ldmFsdWF0b3IuanMnO1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcblxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuLyoqXHJcbiAqIEEgZGVmYXVsdCBydWxlIHN5c3RlbSBpbiB3aGljaCBpVlhqcyBjaG9vc2VzIHdoaWNoIHN0YXRlIFxyXG4gKiB0byBnbyB0byBiYXNlZCBvZiB0aGUgY3VycmVudCBpVlhqcyBFeHBlcmllbmNlIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUnVsZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZXhwZXJpZW5jZSBpbiB3aGljaCB0aGlzIGRhdGEgXHJcbiAgICAgKiB3aWxsIGJlIGV2YWx1YXRlZCB0by5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV4cGVyaWVuY2UgLSBpVlhqc0V4cGVyaWVuY2UgXHJcbiAgICAgKiBvYmplY3QgaW4gd2hpY2ggZGF0YSB3aWxsIGJlIHVzZWQgdG8gZXZhbHVhdGUgdmFyaW91cyBydWxlcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSA9IHsgZGF0YToge30gfSwgY3VzdG9tRXZhbHVhdG9yKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEN1cnJlbnQgaVZYanMgRXhwZXJlaW5jZSBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0b3IgPSBuZXcgRXZhbHVhdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBydWxlcyBmdW5jdGlvbiB0aGF0IHdpbGwgcHJvY2VzcyBhbiBcclxuICAgICAqIGFycmF5IG9mIG5hdmlnYXRpb24gb2JqZWN0cyBhbmQgZXZhbHVhdGUgdGhlbSB1c2luZyBcclxuICAgICAqIHRoZSBwcm9jZXNzUnVsZXMgZnVuY3Rpb24uXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZ2V0IHJ1bGVzKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIChuYXZBcnJheSA9IFtdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnByb2Nlc3NSdWxlcyhuYXZBcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRocm91Z2ggYW5kIHJldHVybnMgdGhlIGZpcnN0IG5hdiBvYmplY3Qgd2hvc2UgXHJcbiAgICAgKiBydWxlIGlzIGV2YWx1YXRlZCB0byB0cnVlIG9yIHJ1bGVzIGFyZSBlbXB0eS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthcnJheX0gbmF2QXJyYXkgLSBBbiBhcnJheSBvZiBuYXZpZ2F0aW9uIG9iamVjdHMgXHJcbiAgICAgKiB3aXRoIHJ1bGVzIGFuZCBzdGF0ZXMgdG8gYmUgZXZhbHVhdGVkLlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBzdGF0ZUlkIG9mIHRoZSBydWxlIHRoYXQgd2FzIGV2YWx1YXRlZCBcclxuICAgICAqIHRydWUgZmlyc3QuIElmIG5vIHN0YXRlIGlzIHJldHVybiwgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIHByb2Nlc3NSdWxlcyhuYXZBcnJheSA9IFtdKSB7XHJcblxyXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KG5hdkFycmF5KSl7XHJcbiAgICAgICAgICAgIG5hdkFycmF5ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc3RhdGVTZWxlY3QgPSBuYXZBcnJheS5maW5kKChuYXZPYmopID0+IHtcclxuICAgICAgICAgICAgbGV0IHtydWxlfSA9IG5hdk9iajtcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShydWxlKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQge2NvbmRpdGlvbnMsIGNvbmRpdGlvbk9wZXJhdG9yID0gXCJhbmRcIn0gPSBydWxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25kaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBydWxlLmNvbmRpdGlvbk9wZXJhdG9yID0gY29uZGl0aW9uT3BlcmF0b3I7XHJcbiAgICAgICAgICAgICAgICBydWxlLmNvbmRpdGlvbnMgPSBbcnVsZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmV2YWx1YXRvci5ldmFsdWF0ZShydWxlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlU2VsZWN0ID8gc3RhdGVTZWxlY3Quc3RhdGVJZCA6ICcnO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihsb2cpIHtcblx0XHR0aGlzLmxvZyA9IGxvZ1xuXHR9XG5cblx0YXNzZXJ0KHRlc3QsIG5hbWUsIG1lc3NhZ2UpIHtcblx0XHRsZXQge2xvZ30gPSB0aGlzO1xuXHRcdGxldCB7c2hvdzogZGVidWd9ID0gbG9nO1xuXG5cdFx0aWYgKCF0ZXN0KSB7XG5cdFx0XHRsZXQgZXJyb3JPYmogPSB7IFxuXHRcdFx0XHRtZXNzYWdlIDogYCR7bmFtZX0gaXMgaW52YWxpZDogJHttZXNzYWdlfS5gXG5cdFx0XHR9O1xuXG5cdFx0XHRpZihkZWJ1Zyl7XG5cdFx0XHRcdHRoaXMubG9nLmVycm9yKGVycm9yT2JqLCBcIkFTU0VSVFwiKTtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yT2JqLm1lc3NhZ2UpO1xuXHRcdFx0fSBcblx0XHR9XG5cblx0XHRyZXR1cm4gdGVzdDtcblx0fVxufSIsImltcG9ydCBMb2dnaW5nTWVzc2FnZXMgZnJvbSAgJy4uL2NvbnN0YW50cy9sb2dnaW5nLmpzJztcbmltcG9ydCBFcnJvck1lc3NhZ2VzIGZyb20gJy4uL2NvbnN0YW50cy9lcnJvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2hvdywgQnVzKSB7XG4gICAgICAgIHRoaXMuc2hvdyA9IHNob3c7XG4gICAgICAgIHRoaXMuTG9nZ2luZ01lc3NhZ2VzID0gbmV3IExvZ2dpbmdNZXNzYWdlcygpO1xuICAgICAgICB0aGlzLkVycm9yTWVzc2FnZXMgPSBuZXcgRXJyb3JNZXNzYWdlcygpO1xuICAgICAgICB0aGlzLkJ1cyA9IEJ1cztcbiAgICB9XG5cbiAgICB3YXJuKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHtzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgd2Fybk1lc3NhZ2UgPSBMb2dnaW5nTWVzc2FnZXMuV0FSTjtcbiAgICAgICAgbGV0IHdhcm5QYXlsb2FkID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHt3YXJuTWVzc2FnZX06ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJ1cy5lbWl0KHdhcm5NZXNzYWdlLCB3YXJuUGF5bG9hZCk7XG4gICAgfVxuXG4gICAgZXJyb3IoZXJyb3IsIHR5cGUgPSBcIkRFRkFVTFRcIikge1xuICAgICAgICBsZXQge3Nob3csIEVycm9yTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgZXJyb3JUeXBlTWVzc2FnZSA9IEVycm9yTWVzc2FnZXNbdHlwZV07XG4gICAgICAgIGxldCB7bWVzc2FnZX0gPSBlcnJvcjtcbiAgICAgICAgbGV0IGVycm9yUGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0eXBlIDogZXJyb3JUeXBlTWVzc2FnZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihgJHtlcnJvclR5cGVNZXNzYWdlfTogJHttZXNzYWdlfWApO1xuICAgICAgICBCdXMuZW1pdChlcnJvclR5cGVNZXNzYWdlLCBlcnJvcik7XG4gICAgICAgIEJ1cy5lbWl0KExvZ2dpbmdNZXNzYWdlcy5FUlJPUiwgZXJyb3JQYXlsb2FkKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyhtZXNzYWdlLCBvcHRpb25zID0ge30sIGRhdGE9e30pIHtcbiAgICAgICAgbGV0IHsgc2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXMgfSA9IHRoaXM7XG4gICAgICAgIGxldCBsb2dNZXNzYWdlID0gTG9nZ2luZ01lc3NhZ2VzLkRFQlVHO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCB7IGdyb3VwID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICAgICAgaWYgKGdyb3VwICYmIHNob3cpIHtcbiAgICAgICAgICAgIGxldCB7IG1lc3NhZ2VzIH0gPSBvcHRpb25zO1xuXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGAke2xvZ01lc3NhZ2V9OiAke21lc3NhZ2V9YClcblxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgeyB0aXRsZSwgbWVzc2FnZSA6IGxvZ01lc2FnZSB9ID0gbWVzc2FnZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlTWVzc2FnZShsb2dNZXNhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlTWVzc2FnZShsb2dNZXNhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG5cbiAgICAgICAgICAgIEJ1cy5lbWl0KGxvZ01lc3NhZ2UsIG1lc3NhZ2UsIG9wdGlvbnMsIGRhdGEpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nTWVzc2FnZX06JHttZXNzYWdlfWApO1xuICAgICAgICAgICAgQnVzLmVtaXQobG9nTWVzc2FnZSwgbWVzc2FnZSwge30sIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9nKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHtzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgbG9nTWVzc2FnZSA9IExvZ2dpbmdNZXNzYWdlcy5MT0c7XG4gICAgICAgIGxldCBsb2dQYXlsb2FkID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ01lc3NhZ2V9OiAke21lc3NhZ2V9YCk7XG4gICAgICAgIEJ1cy5lbWl0KGxvZ01lc3NhZ2UsIGxvZ1BheWxvYWQpO1xuICAgIH1cblxuICAgICBjcmVhdGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKChtZXNzYWdlICE9PSBudWxsICYmIHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JykgfHwgQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdHJhY2Uoc3RhY2spIHtcbiAgICAgICAgbGV0IHtzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgc3RhY2tQYXlMb2FkID0ge1xuICAgICAgICAgICAgc3RhY2s6IHN0YWNrLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudHJhY2Uoc3RhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgQnVzLmVtaXQoTG9nZ2luZ01lc3NhZ2VzLlRSQUNFLCBzdGFja1BheUxvYWQpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpXHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
