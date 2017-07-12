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

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/logging.js":41}],13:[function(require,module,exports){
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

},{"../ivx-js/evaluator.js":38}],21:[function(require,module,exports){
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

    new _index4.default(_app, { factoryFunctionCreator: _factoryFunctionCreator2.default });
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

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/asserts.js":40,"../../../utilities/type-parsers.js":42,"../ivx-js/actions.js":37,"./actions.js":12,"./components/factory-function-creator":18,"./components/index":19,"./input-validators/index.js":26,"./rules.js":36}],22:[function(require,module,exports){
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

},{"../ivx-js/rules.js":39,"./evaluator.js":20}],37:[function(require,module,exports){
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

},{"../../../constants/audio.events.js":1,"../../../constants/state.events.js":9}],38:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":42}],39:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":42,"./evaluator.js":38}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"../constants/errors.js":3,"../constants/logging.js":8}],42:[function(require,module,exports){
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

},{}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2Vycm9ycy5qcyIsInNyYy9jb25zdGFudHMvaHR0cC5qcyIsInNyYy9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzIiwic3JjL2NvbnN0YW50cy9pVlhpby5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL2xvZ2dpbmcuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvc3RhdGUuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vYWN0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtcmVjb3JkLWV2ZW50L2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtc2V0LWNvbXBsZXRlZC9kaXJlY3RpdmUuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9jb21wb25lbnRzL2FjdGlvbi10ZW1wbGF0ZXMvaXZ4LXNldC1jb252ZXJ0ZWQvZGlyZWN0aXZlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9hY3Rpb24tdGVtcGxhdGVzL2l2eC1zZXQtbWlsZXN0b25lL2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvZmFjdG9yeS1mdW5jdGlvbi1jcmVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2V2YWx1YXRvci5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2luZGV4LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9jYXNjYWRpbmctb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9vcHRpb25zLmJ1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMucmFkaW8uanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbGFyZ2UuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbWVkaXVtLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0LXNob3J0LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvdXJsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vcnVsZXMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvZXZhbHVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvcnVsZXMuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL2xvZ2dpbmcuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsa0JBQU0sTUFaTztBQWFiLG9CQUFTLFFBYkk7QUFjYiwwQkFBYyxjQWREO0FBZWIsd0JBQVksWUFmQztBQWdCYix5QkFBYSxhQWhCQTtBQWlCYixvQkFBUTtBQWpCSyxTQUFqQjs7QUFvQkEsY0FBSyxRQUFMLENBQWMsVUFBZDtBQXZCVTtBQXdCYjs7OzttQ0FFVSxTLEVBQVc7QUFBQSxnQkFDYixTQURhLEdBQ0EsSUFEQSxDQUNiLFNBRGE7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsU0FBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLEtBQUwsR0FBYSxPQUFiO0FBSFM7QUFJWjs7OztxQ0FFVztBQUFBLGdCQUNGLFNBREUsR0FDa0IsSUFEbEIsQ0FDRixTQURFO0FBQUEsZ0JBQ1MsS0FEVCxHQUNrQixJQURsQixDQUNTLEtBRFQ7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IjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEF1ZGlvQ29uc3RhbnRzIGZyb20gXCIuL2F1ZGlvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQXVkaW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFNFRUs6IFwic2Vla1wiLFxuICAgICAgICAgICAgU0VUX1VQIDogXCJzZXQtdXBcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5BVURJTyA9IFwiYXVkaW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgICBsZXQge0RFTElNRVRFUiwgQVVESU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0FVRElPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5pbXBvcnQgSHR0cENvbnN0YW50cyBmcm9tIFwiLi9odHRwLmpzXCI7XG5pbXBvcnQgaVZYaW9Db25zdGFudHMgZnJvbSBcIi4vaVZYaW8uanNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRzIHtcbiAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLkVSUk9SID0gXCJlcnJvclwiO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgVklERU86IG5ldyBWaWRlb0NvbnN0YW50cygpLlZJREVPLFxuICAgICAgICAgICAgSFRUUCA6IG5ldyBIdHRwQ29uc3RhbnRzKCkuSFRUUCxcbiAgICAgICAgICAgIFZBTElEQVRJT04gOiBcInZhbGlkYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9VUCA6IFwic2V0LXVwXCIsXG4gICAgICAgICAgICBJVlhfSU8gOiBuZXcgaVZYaW9Db25zdGFudHMoKS5JVlhfSU8sXG4gICAgICAgICAgICBERUZBVUxUIDogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICBBU1NFUlQgOiBcImFzc2VydFwiLFxuICAgICAgICAgICAgRVhQRVJJRU5DRTogXCJleHBlcmllbmNlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7RVJST1IsIERFTElNRVRFUn0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7RVJST1J9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuSFRUUCA9IFwiaHR0cFwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIEhUVFB9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0hUVFB9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGlvQ29uc3RhbnRzIGZyb20gXCIuL2lWWGlvLmpzXCI7XG5pbXBvcnQgRXJyb3JDb25zdGFudHMgZnJvbSBcIi4vZXJyb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYaW9Db25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkVSUk9SID0gbmV3IEVycm9yQ29uc3RhbnRzKCkuRVJST1I7XG5cbiAgICAgICAgbGV0IGVycm9yVHlwZXMgPSB7XG4gICAgICAgICAgICBFWFBFUklFTkNFIDogXCJleHBlcmllbmNlXCIsXG4gICAgICAgICAgICBQTEFURk9STV9VTkFWQUlMQUJMRSA6IFwicGxhdGZvcm0tdW5hdmFpbGFibGVcIixcbiAgICAgICAgICAgIEVWRU5UX05PVF9GSVJFRCA6IFwiZXZlbnQtbm90LWZpcmVkXCJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXJyb3JUeXBlcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihlcnJvck5hbWUpe1xuICAgICAgICBsZXQge0VSUk9SLCBERUxJTUVURVJ9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtFUlJPUn0ke0RFTElNRVRFUn0ke2Vycm9yTmFtZX1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLklWWF9JTyA9IFwiaVZYaW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBJVlhfSU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0lWWF9JT31gOyAgIFxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5MSUJSQVJZID0gXCJpVlhqc1wiO1xuICAgICAgICB0aGlzLkRFTElNRVRFUiA9IFwiOlwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuTElCUkFSWTtcbiAgICB9XG5cbiAgICBhZGROYW1lcyhuYW1lQ29sbGVjdGlvbil7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IG5hbWVzID0gT2JqZWN0LmtleXMobmFtZUNvbGxlY3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSwgaW5kZXgpID0+e1xuICAgICAgICAgICAgc2VsZltuYW1lXSA9IHNlbGYuY29udmVudGlvbihuYW1lQ29sbGVjdGlvbltuYW1lXSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuTE9HR0lORyA9IFwibG9nXCI7XG5cbiAgICAgICAgbGV0IGxvZ1R5cGVzID0ge1xuICAgICAgICAgICAgRVJST1IgOiBcImVycm9yXCIsXG4gICAgICAgICAgICBXQVJOIDogXCJ3YXJuXCIsXG4gICAgICAgICAgICBUUkFDRSA6IFwidHJhY2VcIixcbiAgICAgICAgICAgIExPRyA6XCJcIixcbiAgICAgICAgICAgIERFQlVHIDogXCJkZWJ1Z1wiXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGxvZ1R5cGVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGxldmVsKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIExPR0dJTkd9ID0gdGhpcztcbiAgICAgICAgaWYobGV2ZWwubGVuZ3RoIDw9IDApe1xuICAgICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0xPR0dJTkd9YFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0xPR0dJTkd9JHtERUxJTUVURVJ9JHtsZXZlbH1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNTdGF0ZUNvbnN0YW50cyBmcm9tIFwiLi9zdGF0ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc1N0YXRlQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBDSEFOR0UgOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgU1VDQ0VTUyA6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgRVJST1IgOiBcImVycm9yXCIsXG4gICAgICAgICAgICBHTyA6IFwiZ29cIixcbiAgICAgICAgICAgIE5PVF9GT1VORCA6IFwibm90LWZvdW5kXCIsXG4gICAgICAgICAgICBHRVRfU1RBVEUgOiBcImdldC1zdGF0ZVwiLFxuICAgICAgICAgICAgUkVRVUVTVF9TVEFURSA6IFwicmVxdWVzdC1zdGF0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5TVEFURSA9IFwic3RhdGVcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBTVEFURX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7U1RBVEV9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5WSURFTyA9IFwidmlkZW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBWSURFT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7VklERU99YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL2lWWGlvLmVycm9ycy5qc1wiO1xyXG5pbXBvcnQgTG9nZ2luZyBmcm9tIFwiLi4vLi4vLi4vdXRpbGl0aWVzL2xvZ2dpbmcuanNcIjtcclxuXHJcbmxldCBpVlhpb0Vycm9ycyA9IG5ldyBpVlhpb0Vycm9yTmFtZXMoKTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgbGF5ZXIgb2YgdHJhbnNmb3JtYXRpb24gdG8gaVZYaW8ncyBob3N0IGZ1bmN0aW9uYWxpdHlcclxuICogdG8gd29yayB3aXRoIHRoZSBBY3Rpb24gc3lzdGVtIGluIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGlWWGlvQWN0aW9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdWxscyB0aGUgaVZYaW8ncyBleHBlcmllbmNlIGhvc3QgdGhhdCB0aGlzIGNsYXNzIFxyXG4gICAgICogd2lsbCB1c2UgdG8gc2V0IHZhcmlvdXMgZXhwZXJpZW5jZSBkYXRhLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0V4cGVyaWVuY2VIb3N0fSBleHBlcmllbmNlIC0gY3VycmVudCBpbnN0YW5jZSBvZiBpVlhpbydzXHJcbiAgICAgKiBleHBlcmllbmNlIGhvc3QuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UsIGlWWGpzTG9nID0gbmV3IExvZ2dpbmcoZmFsc2UsIGV4cGVyaWVuY2UuQnVzKSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgZXhwZXJpZW5jZSBob3N0IHRoYXQgd2lsbCBwZXJmb3JtIHRoZSBcclxuICAgICAgICAgKiBhY3Rpb25zIHRvIHRoZSBwbGF0Zm9ybVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtFeHBlcmllbmNlSG9zdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgIHRoaXMuaVZYanNMb2cgPSBpVlhqc0xvZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgdGhlIFwiYW5pbWF0ZVBhZ2VFbGVtZW50XCIgZnJvbSB0aGUgcGxhdGZvcm0gdG9cclxuICAgICAqIGlWWGpzJ3MgYWN0aW9uIFwiYW5pbWF0ZUVsZW1lbnQuXCJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFuaW1hdGUgcGFnZSBlbGVtZW50J3MgZXZlbnQgb2JqZWN0IFxyXG4gICAgICogd2l0aCBhIHRhcmdldCBpZC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBpbmRpY2F0ZXMgdGhlIGFuaW1hdGlvbiB0byBhbiBlbGVtZW50IGlzIGZpbmlzaGVkLlxyXG4gICAgICovXHJcbiAgICBhbmltYXRlUGFnZUVsZW1lbnQoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy50YXJnZXRJRCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gJyMnICsgZXZlbnRBcmdzLnRhcmdldElEXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGV2ZW50QXJncy5lbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5hbmltYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkNsYXNzOiBldmVudEFyZ3MuYW5pbWF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcGxhdGZvcm0gdXRpbGl6ZXMgLk5FVCdzIHRpbWUgZm9ybWF0IGFuZCByZXF1aXJlcyB0aGUgZGF0ZSBcclxuICAgICAqIHZhbHVlIHRvIGJlIGluIGEgc3BlY2lmaWMgZm9ybWF0IGZvciBEYXRlL0RhdGV0aW1lIGlucHV0cy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBleHBlcmllbmNlIGtleSB0byBwdWxsIHRoZSBpbnB1dCBkaXNwbGF5LlxyXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gdGhlIGRhdGUgdG8gdHJhbnNmb3JtIGludG8gLk5FVCBzYWZlIHN0cmluZy5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBjb3JyZWN0bHkgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGZvciAuTkVULlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGZvcm1hdERhdGVGb3JQbGF0Zm9ybShrZXksIGRhdGUpIHtcclxuICAgICAgICBsZXQgeyBpbnB1dHMgfSA9IHRoaXMuZXhwZXJpZW5jZS5zdG9yeTtcclxuICAgICAgICBsZXQgaW5wdXQgPSBpbnB1dHNba2V5XTtcclxuICAgICAgICBsZXQgeyBkaXNwbGF5IH0gPSBpbnB1dDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYXRlXCI6XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZVN0cmluZyA9IGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtnZXRNb250aChkYXRlLmdldE1vbnRoKCkpfS0ke2dldERhdGUoZGF0ZS5nZXREYXRlKCkpfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRNb250aChtb250aE51bSkge1xyXG4gICAgICAgICAgICBsZXQgY29ycmVjdGVkTW9udGhOdW0gPSAobW9udGhOdW0gKyAxKSAlIDEzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvcnJlY3RlZE1vbnRoTnVtID49IDEwID8gY29ycmVjdGVkTW9udGhOdW0gOiBgMCR7Y29ycmVjdGVkTW9udGhOdW19YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF0ZShkYXRlTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlTnVtID49IDEwID8gZGF0ZU51bSA6IGAwJHtkYXRlTnVtfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIGN1c3RvbSBldmVudCBpbiB0aGUgZXZlbnQgYXJncyBmb3IgdGhlIFxyXG4gICAgICogcGxhdGZvcm0gdG8gcmVjb3JkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYWxsIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy5jdXN0b21FdmVudCAtIGV2ZW50IG5hbWUgdG8gYmUgcmVjb3JkZWRcclxuICAgICAqIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gd2lsbCBpbmRpY2F0ZSBpZiB0aGlzIGV2ZW50IHdhcyBzdWNjZXNzZnVsbHkgcmVjb3JkZWQgYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICByZWNvcmRFdmVudChldmVudEFyZ3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHsgY3VzdG9tRXZlbnQgfSA9IGV2ZW50QXJncztcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnJlY29yZEV2ZW50KGN1c3RvbUV2ZW50KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0Q29udmVydGVkIGV2ZW50IHdpdGggYSBsYWJlbCBpZiBvbmUgaXMgcHJvdmlkZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLmxhYmVsIC0gY29udmVydGVkIGxhYmVsIHRoYXQgd2lsbCBiZSByZWNvcmRlZFxyXG4gICAgICogYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgc2V0Q29udmVydGVkIHdhcyBzdWNjZXNzZnVsIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0Q29udmVydGVkKGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCB9ID0gZXZlbnRBcmdzO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0Q29udmVydGVkKGxhYmVsKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0Q29tcGxldGVkIGV2ZW50LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYWxsIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgc2V0Q29tcGxldGUgd2FzIHN1Y2Nlc3NmdWwgYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICBzZXRDb21wbGV0ZShldmVudEFyZ3MgPSB7fSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXRDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlLCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXREYXRhIGV2ZW50IHRvIHRoZSBwbGF0Zm9ybSB3aXRoIHRoZSBrZXkgYW5kICBcclxuICAgICAqIHZhbHVlIGluIHRoZSBldmVudEFyZ3MuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLmtleSAtIGV4cGVyaWVuY2UgZGF0YSBrZXkgdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy52YWx1ZSAtIGV4cGVyaWVuY2UgZGF0YSB2YWx1ZSB0byBiZSBzZXQgdG8uICBcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gd2lsbCBpbmRpY2F0ZSBpZiB0aGlzIGRhdGEgd2FzIHN1Y2Nlc3NmdWxseSB1cGRhdGVkIHRvIHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShldmVudEFyZ3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHsga2V5LCB2YWx1ZSB9ID0gZXZlbnRBcmdzO1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB7IGRlYnVnSG9zdCA9IGZhbHNlIH0gPSB0aGlzLmV4cGVyaWVuY2U7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dE5vdEZvdW5kID0gdHlwZW9mIHRoaXMuZXhwZXJpZW5jZS5kYXRhW2tleV0gPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuZXhwZXJpZW5jZS5kYXRhW2tleV0gPT09IG51bGxcclxuXHJcbiAgICAgICAgICAgIGlmICghZGVidWdIb3N0ICYmIGlucHV0Tm90Rm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdCgnaVZYanM6aVZYaW86ZXJyb3I6ZXZlbnQtbm90LWZpcmVkJywgZXZlbnRBcmdzLCB7IG1lc3NhZ2U6IFwiaVZYanMgRXJyb3IgTWVzc2FnZTogSW5wdXQgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKHsgbWVzc2FnZTogJ2lWWGpzIEVycm9yIE1lc3NhZ2U6IElucHV0IG5vdCBmb3VuZCcgfSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXREYXRlRm9yUGxhdGZvcm0oa2V5LCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXREYXRhKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXREYXRhKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHRlc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHsgZGF0YSB9ID0gc2VsZi5leHBlcmllbmNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnSG9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5leHBlcmllbmNlLmRhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV4cGVyaWVuY2UuTG9nLmRlYnVnKGBDdXJyZW50IEV4cGVyaWVuY2UgRGF0YWAsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoZGF0YUtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtkYXRhS2V5fToke2RhdGFbZGF0YUtleV19YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVtkYXRhS2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXRNaWxlc3RvbmUgd2l0aCB0aGUgbWlsZXN0b25lIGRlZmluZWQgaW4gdGhlIFxyXG4gICAgICogZXZlbnRBcmdzIG9iamVjdC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGhvbGRzIHRoZSBtaWxlc3RvbmUgdG8gYmUgc2VuZCB0byB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLm1pbGVzdG9uZSAtIG1pbGVzdG9uZSB0byBiZSBzZXQuXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGluZGljYXRlcyBpZiB0aGlzIG1pbGVzdG9uZSB3YXMgc2V0IG9uIHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0TWlsZXN0b25lKGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQgeyBtaWxlc3RvbmUgfSA9IGV2ZW50QXJncztcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldE1pbGVzdG9uZShtaWxlc3RvbmUpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlLCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBpVlhSZWNvcmRFdmVudCBmcm9tIFwiLi9pdngtcmVjb3JkLWV2ZW50L2RpcmVjdGl2ZVwiO1xuaW1wb3J0IGlWWFNldENvbXBsZXRlZCBmcm9tIFwiLi9pdngtc2V0LWNvbXBsZXRlZC9kaXJlY3RpdmVcIjtcbmltcG9ydCBpVlhTZXRDb252ZXJ0ZWQgZnJvbSBcIi4vaXZ4LXNldC1jb252ZXJ0ZWQvZGlyZWN0aXZlXCI7XG5pbXBvcnQgaVZYU2V0TWlsZXN0b25lIGZyb20gXCIuL2l2eC1zZXQtbWlsZXN0b25lL2RpcmVjdGl2ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIG5ldyBpVlhSZWNvcmRFdmVudChhcHAsIG9wdHMpO1xuICAgICAgICBuZXcgaVZYU2V0Q29tcGxldGVkKGFwcCxvcHRzKTtcbiAgICAgICAgbmV3IGlWWFNldENvbnZlcnRlZChhcHAsb3B0cyk7XG4gICAgICAgIG5ldyBpVlhTZXRNaWxlc3RvbmUoYXBwLCBvcHRzKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaVZYanMpIHtcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBpRWxtWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCB7IGl2eFJlY29yZEV2ZW50OiB2YWx1ZSB9ID0gaUF0dHJzO1xuXG4gICAgICAgICAgICAgICAgaVZYanMuZXhwZXJpZW5jZS5yZWNvcmRFdmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkRpcmVjdGl2ZS4kaW5qZWN0ID0gW1wiaVZYanNcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbGV0IHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9ID0gb3B0cztcblxuICAgICAgICBhcHBcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2l2eFJlY29yZEV2ZW50JywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaVZYanMpIHtcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBpRWxtWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2Uuc2V0Q29tcGxldGUoKTtcblxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5EaXJlY3RpdmUuJGluamVjdCA9IFtcImlWWGpzXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIGxldCB7IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgfSA9IG9wdHM7XG5cbiAgICAgICAgYXBwXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdpdnhTZXRDb21wbGV0ZWQnLCBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yKERpcmVjdGl2ZSkpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihpVlhqcykge1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGlFbG1bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHsgaXZ4U2V0Q29udmVydGVkOiB2YWx1ZSB9ID0gaUF0dHJzO1xuXG4gICAgICAgICAgICAgICAgaVZYanMuZXhwZXJpZW5jZS5zZXRDb252ZXJ0ZWQodmFsdWUpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5EaXJlY3RpdmUuJGluamVjdCA9IFtcImlWWGpzXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIGxldCB7IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgfSA9IG9wdHM7XG5cbiAgICAgICAgYXBwXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdpdnhTZXRDb252ZXJ0ZWQnLCBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yKERpcmVjdGl2ZSkpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihpVlhqcykge1xuICAgICAgICB0aGlzLmxpbmsgPSAoJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGlFbG1bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHsgaXZ4U2V0TWlsZXN0b25lOiB2YWx1ZSB9ID0gaUF0dHJzO1xuXG4gICAgICAgICAgICAgICAgaVZYanMuZXhwZXJpZW5jZS5zZXRNaWxlc3RvbmUodmFsdWUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5EaXJlY3RpdmUuJGluamVjdCA9IFtcImlWWGpzXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIGxldCB7IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgfSA9IG9wdHM7XG5cbiAgICAgICAgYXBwXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdpdnhTZXRNaWxlc3RvbmUnLCBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yKERpcmVjdGl2ZSkpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVGYWN0b3J5RnVuY3Rpb24oY29uc3RydWN0b3IpIHtcblx0bGV0IGNvbnN0cnVjdG9yRm4gPSBjb25zdHJ1Y3Rvcjtcblx0bGV0IGFyZ3MgPSBjb25zdHJ1Y3RvckZuLiRpbmplY3Q7XG5cdGxldCBmYWN0b3J5RnVuY3Rpb24gPSAoLi4uYXJncykgPT4ge1xuICAgIFx0cmV0dXJuIG5ldyBjb25zdHJ1Y3RvckZuKC4uLmFyZ3MpO1xuXHR9XG5cdFxuXHRhcmdzLnB1c2goZmFjdG9yeUZ1bmN0aW9uKTtcblxuXHRyZXR1cm4gYXJncztcbn0iLCJpbXBvcnQgQWN0aW9uVGVtcGxhdGVzIGZyb20gXCIuL2FjdGlvbi10ZW1wbGF0ZXMvaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBuZXcgQWN0aW9uVGVtcGxhdGVzKGFwcCwgb3B0cyk7XG4gICAgfVxufSIsImltcG9ydCBFdmFsdWF0b3IgZnJvbSBcIi4uL2l2eC1qcy9ldmFsdWF0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmFsdWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcikge1xuICAgICAgICBzdXBlcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xuICAgIH1cblxuICAgIHN0b3J5RXZlbnRzKGxocywgaXMsIHN0b3J5RXZlbnQpIHtcbiAgICAgICAgbGV0IHtleHBlcmllbmNlfSA9IHRoaXM7XG4gICAgICAgIGxldCB7ZXZlbnRzfSA9IGV4cGVyaWVuY2U7XG5cbiAgICAgICAgaWYgKHN0b3J5RXZlbnQgPT09ICdub25lJykge1xuICAgICAgICAgICAgcmV0dXJuIG5vRXZlbnRGaXJlZChpcywgZXZlbnRzLCBleHBlcmllbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzW2lzXShzdG9yeUV2ZW50LCBldmVudHMpO1xuXG4gICAgICAgIGZ1bmN0aW9uIG5vRXZlbnRGaXJlZChpcywgZXZlbnRzLCBleHBlcmllbmNlKSB7XG4gICAgICAgICAgICBsZXQgaXNGaXJlZCA9IGlzID09PSAnZmlyZWQnO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzLmxlbmd0aCA8PSAwICYmIGlzRmlyZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlZChldmVudCwgZXZlbnRzKSB7XG4gICAgICAgIGxldCBmaXJlZEV2ZW50ID0gZXZlbnRzLmZpbmQoKGV2ZW50RmlyZWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRGaXJlZCA9PT0gZXZlbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eXBlb2YgZmlyZWRFdmVudCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgbm90RmlyZWQoZXZlbnQsIGV2ZW50cykge1xuICAgICAgICBsZXQgZmlyZWRFdmVudCA9IGV2ZW50cy5maW5kKChldmVudEZpcmVkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50RmlyZWQgPT09IGV2ZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHlwZW9mIGZpcmVkRXZlbnQgPT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIHByb2dyZXNzKGxocywgaXMsIHByb2dyZXNzKSB7XG4gICAgICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzO1xuICAgICAgICBsZXQge3Byb2dyZXNzOiBjdXJyZW50U3RvcnlQcm9ncmVzcywgbWlsZXN0b25lOiBjdXJyZW50TWlsZXN0b25lLCBzdG9yeX0gPSBleHBlcmllbmNlO1xuICAgICAgICBsZXQge3Byb2dyZXNzTWFwfSA9IHN0b3J5O1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzVmFsdWUgPSAtMTtcbiAgICAgICAgbGV0IGN1cnJlbnRNaWxlc3RvbmVWYWx1ZSA9IC0xO1xuXG4gICAgICAgIGlmIChjdXJyZW50TWlsZXN0b25lICYmIGN1cnJlbnRNaWxlc3RvbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRNaWxlc3RvbmVTdHJpbmcgPSBjdXJyZW50TWlsZXN0b25lWzBdLnRvTG93ZXJDYXNlKCkgKyBjdXJyZW50TWlsZXN0b25lLnN1YnN0cmluZygxKTtcblxuICAgICAgICAgICAgY3VycmVudE1pbGVzdG9uZVZhbHVlID0gcHJvZ3Jlc3NNYXBbY3VycmVudE1pbGVzdG9uZVN0cmluZ10gPyBwcm9ncmVzc01hcFtjdXJyZW50TWlsZXN0b25lU3RyaW5nXSA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzU3RvcnlQcm9ncmVzcyhjdXJyZW50U3RvcnlQcm9ncmVzcykpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NTdHJpbmcgPSBjdXJyZW50U3RvcnlQcm9ncmVzc1swXS50b0xvd2VyQ2FzZSgpICsgY3VycmVudFN0b3J5UHJvZ3Jlc3Muc3Vic3RyaW5nKDEpO1xuXG4gICAgICAgICAgICBjdXJyZW50UHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzTWFwW2N1cnJlbnRQcm9ncmVzc1N0cmluZ107XG4gICAgICAgIH1cblxuICAgICAgICBwcm9ncmVzcyA9IHByb2dyZXNzWzBdLnRvTG93ZXJDYXNlKCkgKyBwcm9ncmVzcy5zdWJzdHJpbmcoMSk7XG5cbiAgICAgICAgbGV0IHByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc01hcFtwcm9ncmVzc107XG4gICAgICAgIGxldCBldmFsdWF0ZVByb2dyZXNzID0gY3VycmVudFByb2dyZXNzVmFsdWUgPiBjdXJyZW50TWlsZXN0b25lVmFsdWUgPyBjdXJyZW50UHJvZ3Jlc3NWYWx1ZSA6IGN1cnJlbnRNaWxlc3RvbmVWYWx1ZTtcblxuICAgICAgICByZXR1cm4gdGhpc1tpc10oZXZhbHVhdGVQcm9ncmVzcywgcHJvZ3Jlc3NWYWx1ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaXNTdG9yeVByb2dyZXNzKHByb2dyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MgPT09ICdTdGFydGVkJyB8fCBwcm9ncmVzcyA9PT0gJ0NvbXBsZXRlZCcgfHwgcHJvZ3Jlc3MgPT09ICdDb252ZXJ0ZWQnO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IGlWWGlvQWN0aW9ucyB9IGZyb20gJy4vYWN0aW9ucy5qcydcclxuaW1wb3J0IHsgaVZYaW9SdWxlcyB9IGZyb20gJy4vcnVsZXMuanMnXHJcbmltcG9ydCB7IEFjdGlvbnMgYXMgaVZYanNBY3Rpb25zIH0gZnJvbSAnLi4vaXZ4LWpzL2FjdGlvbnMuanMnXHJcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IsIE9iamVjdFBhcnNlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL2Fzc2VydHMuanMnO1xyXG5pbXBvcnQgSW5wdXRWYWxpZGF0b3IgZnJvbSBcIi4vaW5wdXQtdmFsaWRhdG9ycy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaVZYaW9FcnJvck5hbWVzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9pVlhpby5lcnJvcnMuanMnO1xyXG5pbXBvcnQgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciBmcm9tIFwiLi9jb21wb25lbnRzL2ZhY3RvcnktZnVuY3Rpb24tY3JlYXRvclwiO1xyXG5pbXBvcnQgaVZYaW9Db21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMvaW5kZXhcIjtcclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKVxyXG5sZXQgb2JqZWN0UGFyc2VyID0gbmV3IE9iamVjdFBhcnNlcnMoKVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhbiBpVlhpbyBkYXRhIG1vZHVsZSB0aGF0IGlWWGpzIGNhbiB1c2UgZm9yIFxyXG4gKiBuYXZpZ2F0aW9uLCBkYXRhIHNldHRpbmcgYW5kIHByb2dyZXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGlWWGlvIHtcclxuXHJcbiAgLyoqXHJcbiAgICogUHVsbHMgaW4gYW55IG1vZHVsZSBzZXR0aW5ncyBhbmQgdGhlIGdsb2JhbCBzZXR0aW5nc1xyXG4gICAqIGZvciB0aGlzIGlWWGpzIGV4cGVyaWVuY2UgdG8gc2V0IHVwIHRoaXMgaVZYaW8gXHJcbiAgICogZW5oYW5jZSBkYXRhIG9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gbW9kdWxlU2V0dGluZ3MgLSBzZXR0aW5ncyB0byBiZSBwYXNzZWQgaW4gdG8gdGhlIFxyXG4gICAqIGlWWGlvIEV4cGVyZWluY2UgaG9zdC5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gaVZYanNTZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBpVlhqcyBleHBlcmllbmNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MsIGlWWGpzU2V0dGluZ3MgPSB7fSwgQnVzLCBpVlhqc0xvZykge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW9kdWxlIHNldHRpbmdzIGZvciBpVlhpbyB3aGljaCB3aWxsIGJlIGFsbCB0aGUgc2V0dGluZ3NcclxuICAgICAqIHVzZWQgd2l0aCB0aGUgaVZYaW8ncyBleHBlcmllbmNlIGhvc3Qgc3VjaCBhcyBzdG9yeSBrZXlzIGFuZFxyXG4gICAgICogZnVubmVscy5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5leHBlcmllbmNlSG9zdFNldHRpbmdzID0gZXhwZXJpZW5jZUhvc3RTZXR0aW5nc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGlWWGpzIGV4cGVyaWVuY2UgXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaVZYanNTZXR0aW5ncyA9IGlWWGpzU2V0dGluZ3M7XHJcbiAgICB0aGlzLkJ1cyA9IEJ1cztcclxuICAgIHRoaXMuaVZYanNMb2cgPSBpVlhqc0xvZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIHRoZSBjdXJyZW50IHNldHRpbmdzIGFuZCB0aGVuIGVuaGFuY2VzIHRoZSBzdG9yeSBkYXRhIFxyXG4gICAqIHB1bGxlZCBmcm9tIHRoZSBpVlhpbyBleHBlcmllbmNlIGhvc3QgYW5kIGVuaGFuY2VzIHRoZW0gdG8gXHJcbiAgICogd29yayB3aXRoIGlWWGpzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gYSBwcm9taXNlIHRoYXQgZXZhbHVhdGVzIHdoZXRoZXIgdGhpcyBleHBlcmllbmNlIFxyXG4gICAqIHdhcyBzdWNjZXNzZnVsbHkgZW5oYW5jZWQuXHJcbiAgICovXHJcbiAgZW5oYW5jZSgpIHtcclxuICAgIGxldCB7IGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MgPSB7fSwgaVZYanNTZXR0aW5ncyA9IHt9IH0gPSB0aGlzO1xyXG4gICAgbGV0IGlWWGlvRXJyb3JzID0gbmV3IGlWWGlvRXJyb3JOYW1lcygpO1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICBsZXQgZW5oYW5jZW1lbnRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIGlWWCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLlBMQVRGT1JNX1VOQVZBSUxBQkxFLCB7fSk7XHJcbiAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5CdXMub25jZShpVlhpb0Vycm9ycy5FWFBFUklFTkNFLCAoZXJyb3IpID0+IHtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgaVZYKGV4cGVyaWVuY2VIb3N0U2V0dGluZ3MpXHJcbiAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgKGlWWCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFpVlggfHwgIWlWWC5leHBlcmllbmNlIHx8ICFpVlguZXhwZXJpZW5jZS5zdG9yeSB8fCAhaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgc2VsZi5CdXMuZW1pdChpVlhpb0Vycm9ycy5QTEFURk9STV9VTkFWQUlMQUJMRSwge30pO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IHsgZXhwZXJpZW5jZTogZXhwZXJpZW5jZVNldHRpbmdzID0ge30sIHJ1bGVzOiBjdXN0b21SdWxlcyB9ID0gaVZYanNTZXR0aW5ncztcclxuICAgICAgICAgIGxldCBkZWZhdWx0QWN0aW9ucyA9IG9iamVjdFBhcnNlci5tZXJnZShuZXcgaVZYanNBY3Rpb25zKCksIGV4cGVyaWVuY2VTZXR0aW5ncyk7XHJcbiAgICAgICAgICBsZXQgZXhwZXJpZW5jZSA9IG9iamVjdFBhcnNlci5tZXJnZShkZWZhdWx0QWN0aW9ucywgaVZYLmV4cGVyaWVuY2UpO1xyXG4gICAgICAgICAgbGV0IG1vZGlmaWVkQWN0aW9ucyA9IG5ldyBpVlhpb0FjdGlvbnMoZXhwZXJpZW5jZSwgdGhpcy5pVlhqc0xvZyk7XHJcbiAgICAgICAgICBsZXQgeyB1aTogc3RvcnlVSSwgdmFsaWRhdGlvbjogc3RvcnlWYWxpZGF0aW9uIH0gPSBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhO1xyXG5cclxuICAgICAgICAgIGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEgPSBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhID8gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YSA6IHt9O1xyXG5cclxuICAgICAgICAgIGxldCBydWxlcyA9IG5ldyBpVlhpb1J1bGVzKGV4cGVyaWVuY2UsIGN1c3RvbVJ1bGVzKS5ydWxlcztcclxuICAgICAgICAgIGxldCBzdGF0ZXMgPSBuZXcgSW5wdXRWYWxpZGF0b3IoaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5zdGF0ZXMsIGlWWC5leHBlcmllbmNlLnN0b3J5LmlucHV0cywgc2VsZiwgcmVqZWN0LCBleHBlcmllbmNlSG9zdFNldHRpbmdzLmRlYnVnKS5zdGF0ZXM7XHJcblxyXG4gICAgICAgICAgZXhwZXJpZW5jZS5kZWJ1Z0hvc3QgPSBleHBlcmllbmNlSG9zdFNldHRpbmdzLmRlYnVnO1xyXG5cclxuICAgICAgICAgIGV4cGVyaWVuY2Uud2hpdGVMaXN0ID0gW1xyXG4gICAgICAgICAgICAnc2VsZicsXHJcbiAgICAgICAgICAgICdodHRwOi8vaXZ4LXhhcGkuKi5pbmYtZW52LmNvbS8qKicsXHJcbiAgICAgICAgICAgICdodHRwczovL2l2eC14YXBpLiouaW5mLWVudi5jb20vKionLFxyXG4gICAgICAgICAgICAnaHR0cHM6Ly94YXBpLml2eC5pby8qKidcclxuICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5zdGF0ZXMgPSBzdGF0ZXM7XHJcbiAgICAgICAgICBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhLnRpdGxlID0gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YS50aXRsZSA/IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEudGl0bGUgOiBcImlWWCBTdG9yeSBQbGF5ZXJcIjtcclxuXHJcbiAgICAgICAgICBsZXQgZW5oYW5jZWRpVlhqc1NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICB1aTogaVZYanNTZXR0aW5ncy51aSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbjogaVZYanNTZXR0aW5ncy52YWxpZGF0aW9uLFxyXG4gICAgICAgICAgICBjb25maWc6IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEsXHJcbiAgICAgICAgICAgIGV4cGVyaWVuY2U6IGV4cGVyaWVuY2UsXHJcbiAgICAgICAgICAgIHJ1bGVzOiBydWxlcyxcclxuICAgICAgICAgICAgYWN0aW9uczogbW9kaWZpZWRBY3Rpb25zXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHJlc29sdmUoZW5oYW5jZWRpVlhqc1NldHRpbmdzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgc2VsZi5CdXMuZW1pdChpVlhpb0Vycm9ycy5FWFBFUklFTkNFLCBlcnJvcik7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBlbmhhbmNlbWVudFByb21pc2VcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnQgPSBpbml0aWFsaXplaVZYSU87XHJcblxyXG5pZiAoYW5ndWxhcikge1xyXG4gIGxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnaXZ4LWlucHV0LXZhbGlkYXRvcicsIFtdKTtcclxuXHJcbiAgYXBwLmNvbnN0YW50KCd2YWxpZGF0b3InLCBJbnB1dFZhbGlkYXRvcik7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2l2eC1qcycpO1xyXG5cclxuICAgIGFwcC5jb25zdGFudCgnaVZYanMuZGF0YS5pVlhpbycsIGluaXRpYWxpemVpVlhJTyk7XHJcblxyXG4gICAgbmV3IGlWWGlvQ29tcG9uZW50cyhhcHAsIHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9KTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1RoZSBpVlhpbyBEYXRhIE1vZHVsZSBpcyBub3QgYXR0YWNoZWQgdG8gdGhlIGlWWGpzIG1vZHVsZS4gSWYgdGhpcyBpcyBjb3JyZWN0LCBpZ25vcmUgdGhpcyB3YXJuaW5nLicpXHJcbiAgICBjb25zb2xlLndhcm4oZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplaVZYSU8oc2V0dGluZ3MgPSB7fSkge1xyXG4gIHNldHRpbmdzLm1vZHVsZSA9IGlWWGlvO1xyXG5cclxuICByZXR1cm4gc2V0dGluZ3M7XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSl7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBzdG9yeUlucHV0RGF0YTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtzdG9yeUlucHV0RGF0YSA9IHt9LCBqc29uSW5wdXREYXRhID17fX0gPSB0aGlzO1xuICAgICAgICBsZXQgcmF3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIGxldCBuZXdTdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICAgICAgXG4gICAgICAgIHJhd0lucHV0RGF0YS50eXBlID0gXCJjYXNjYWRpbmctb3B0aW9uc1wiO1xuICAgICAgICByYXdJbnB1dERhdGEuZGF0YVRyZWUgPSBuZXdTdG9yeUlucHV0RGF0YS5kYXRhVHJlZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByYXdJbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge2J1dHRvbnMgPSBbXX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQgaGFzRmFsc2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IGhhc1RydWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5ld0J1dHRvbnMgPSBidXR0b25zLnJlZHVjZSgoYnV0dG9uQXJyYXksIGJ1dHRvbkRhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQge3ZhbHVlfSA9IGJ1dHRvbkRhdGE7XG4gICAgICAgICAgICBsZXQgaXNGYWxzZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgJiYgIXZhbHVlO1xuICAgICAgICAgICAgbGV0IGlzVHJ1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgJiYgdmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChpc1RydWUgJiYgIWhhc1RydWUpIHtcbiAgICAgICAgICAgICAgICBidXR0b25BcnJheVswXSA9IGJ1dHRvbkRhdGE7XG4gICAgICAgICAgICAgICAgaGFzVHJ1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0ZhbHNlICYmICFoYXNGYWxzZSkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbkFycmF5WzFdID0gYnV0dG9uRGF0YTtcbiAgICAgICAgICAgICAgICBoYXNGYWxzZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBidXR0b25BcnJheTtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIGlmICghaGFzVHJ1ZSkge1xuICAgICAgICAgICAgbmV3QnV0dG9uc1swXSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJUcnVlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0ZhbHNlKSB7XG4gICAgICAgICAgICBuZXdCdXR0b25zWzFdID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJGYWxzZVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAganNvbklucHV0RGF0YS5idXR0b25zID0gbmV3QnV0dG9ucztcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQnV0dG9ucyBmcm9tIFwiLi9jaGVja2JveC5idXR0b25zLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge3R5cGV9ID0ganNvbklucHV0RGF0YTtcblxuICAgICAgICAgaWYodHlwZSA9PT0gXCJidXR0b25zXCIpe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25zKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhKS5pbnB1dDtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwiY2hlY2tib3hcIjtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCl7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwiZW1haWxcIjtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzJztcblxuLy9WYWxpZGF0b3JzIFxuaW1wb3J0IENhc2NhZGluZ09wdGlvbnMgZnJvbSBcIi4vY2FzY2FkaW5nLW9wdGlvbnMuanNcIlxuaW1wb3J0IENoZWNrYm94IGZyb20gXCIuL2NoZWNrYm94LmpzXCI7XG5pbXBvcnQgRW1haWwgZnJvbSBcIi4vZW1haWwuanNcIjtcbmltcG9ydCBOdW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9vcHRpb25zLmpzXCI7XG5pbXBvcnQgVGV4dEFyZWEgZnJvbSBcIi4vdGV4dGFyZWEuanNcIjtcbmltcG9ydCBUZXh0TGFyZ2UgZnJvbSBcIi4vdGV4dC1sYXJnZS5qc1wiO1xuaW1wb3J0IFRleHRNZWRpdW0gZnJvbSBcIi4vdGV4dC1tZWRpdW0uanNcIjtcbmltcG9ydCBUZXh0U2hvcnQgZnJvbSBcIi4vdGV4dC1zaG9ydC5qc1wiO1xuaW1wb3J0IFVybCBmcm9tIFwiLi91cmwuanNcIjtcblxuY29uc3QgZXJyb3JOYW1lcyA9IG5ldyBpVlhpb0Vycm9yTmFtZXMoKTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGVzLCBzdG9yeUlucHV0cywgZXhwZXJpZW5jZSwgcmVqZWN0LCBkZWJ1ZyA9IGZhbHNlLCBkZWJ1Z0NhbGxCYWNrID0gKCk9Pnt9KSB7XG4gICAgICAgIHRoaXMucmF3U3RhdGVzID0gW10uY29uY2F0KHN0YXRlcyk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dHMgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0cyk7XG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XG4gICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB0aGlzLmRlYnVnID0gZGVidWc7XG4gICAgICAgIHRoaXMuZGVidWdDYWxsQmFjayA9IGRlYnVnQ2FsbEJhY2s7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVJbnB1dFN0YXRlcyh0aGlzLnJhd1N0YXRlcyk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0VmFsaWRhdG9ycygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIENhc2NhZGluZ09wdGlvbnMsXG4gICAgICAgICAgICBDaGVja2JveCxcbiAgICAgICAgICAgIEVtYWlsLFxuICAgICAgICAgICAgTnVtYmVyLFxuICAgICAgICAgICAgT3B0aW9ucyxcbiAgICAgICAgICAgIFRleHRBcmVhLFxuICAgICAgICAgICAgVGV4dExhcmdlLFxuICAgICAgICAgICAgVGV4dE1lZGl1bSxcbiAgICAgICAgICAgIFRleHRTaG9ydCxcbiAgICAgICAgICAgIFVybFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVJbnB1dFN0YXRlcyhzdGF0ZXMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc3RhdGVzLm1hcCgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgaW5wdXRzID0gW10gfSA9IHN0YXRlO1xuXG4gICAgICAgICAgICAgICAgc3RhdGUuaW5wdXRzID0gc2VsZi52YWxpZGF0ZUlucHV0cyhpbnB1dHMsIHN0YXRlLCBpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVjb21tZW5kZWRTZXR0aW5ncyhpbnB1dCkge1xuICAgICAgICBsZXQgcmVjb21tZW5kZWRPYmplY3QgPSB0aGlzLmNyZWF0ZVJlY29tbWVuZE9iamVjdChpbnB1dCk7XG4gICAgICAgIGxldCB7IHR5cGVzLCBvcHRpb25zLCBhdHRyaWJ1dGVzIH0gPSBpbnB1dDtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgVG8gc3VwcG9ydCB0aGlzIGlucHV0LCBpdCBpcyByZWNvbW1lbmQgdG8gY3JlYXRlIGFuIGlucHV0IG9uIHRoZSBwbGF0Zm9ybSB1c2luZyB0aGVzZSBzZXR0aW5nczogXG4ke3RoaXMuY3JlYXRlUmVjb21tZW5kZWRSZWFkb3V0KHJlY29tbWVuZGVkT2JqZWN0KX1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHNldHRpbmdzOiByZWNvbW1lbmRlZE9iamVjdFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVjb21tZW5kZWRSZWFkb3V0KHJlY29tbWVuZGVkT2JqZWN0KSB7XG4gICAgICAgIGxldCB7IGtleSwgb3B0aW9ucywgdHlwZXMsIGF0dHJpYnV0ZXMgfSA9IHJlY29tbWVuZGVkT2JqZWN0O1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZWFkb3V0ID0gYElucHV0IEtleTogJHtrZXl9YDtcbiAgICAgICAgbGV0IHR5cGVzUmVhZG91dCA9IGBcXG5SZWNvbW1lbmRlZCBJbnB1dCBUeXBlJHt0eXBlcy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwifTogJHt0eXBlcy5qb2luKCcsICcpfWA7XG4gICAgICAgIGxldCBvcHRpb25SZWFkb3V0ID0gb3B0aW9ucy5yZWR1Y2UoKGN1cnJlbnRPcHRpb25SZWFkb3V0LCBvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50T3B0aW9uUmVhZG91dH1cXG4ke3NlbGYuY3JlYXRlT2JqZWN0UmVhZE91dChvcHRpb24sIFtdLCAnXFxuJyl9YFxuICAgICAgICB9LCAnJyk7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVSZWFkb3V0ID0gdGhpcy5jcmVhdGVPYmplY3RSZWFkT3V0KGF0dHJpYnV0ZXMsIFtcIndpZHRoXCIsIFwicGxhY2Vob2xkZXJcIl0sICdcXG4nKTtcblxuICAgICAgICByZXR1cm4gYCR7cmVhZG91dH0ke3R5cGVzUmVhZG91dH0ke29wdGlvbnMubGVuZ3RoID4gMCA/IFwiXFxuT3B0aW9uczpcIiArIG9wdGlvblJlYWRvdXQgOiBcIlwifSR7YXR0cmlidXRlUmVhZG91dC5sZW5ndGggPiAwID8gXCJcXG5BdHRyaWJ1dGVzOlxcblwiICsgYXR0cmlidXRlUmVhZG91dCA6IFwiXCJ9YDtcbiAgICB9XG5cbiAgICBjcmVhdGVPYmplY3RSZWFkT3V0KG9iaiA9IHt9LCBpZ25vcmUgPSBbXSwgc2VwZXJhdG9yID0gXCJcIikge1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKChyZWFkb3V0LCBrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaWdub3JlLmluZGV4T2Yoa2V5KSA+PSAwKSByZXR1cm4gcmVhZG91dDtcblxuICAgICAgICAgICAgcmV0dXJuIGAke3JlYWRvdXR9JHtrZXl9IDogJHtvYmpba2V5XX0ke2luZGV4IDwga2V5cy5sZW5ndGggLSAxID8gc2VwZXJhdG9yIDogXCJcIn1gXG4gICAgICAgIH0sICcnKVxuICAgIH1cblxuICAgIGNyZWF0ZVJlY29tbWVuZE9iamVjdChpbnB1dCkge1xuICAgICAgICBsZXQgeyBhdHRyaWJ1dGVzIH0gPSBpbnB1dDtcbiAgICAgICAgbGV0IHR5cGVzID0gdGhpcy5nZXRSZWNvbW1lbmRlZElucHV0VHlwZXMoaW5wdXQudHlwZSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKGlucHV0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBpbnB1dC5uYW1lLFxuICAgICAgICAgICAgdHlwZXMsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgYXR0cmlidXRlc1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRPcHRpb25zKGlucHV0KSB7XG4gICAgICAgIGxldCB7IHR5cGUgfSA9IGlucHV0O1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9wdGlvbnNcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5vcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcImJ1dHRvbnNcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5idXR0b25zLm1hcChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGJ1dHRvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiTm8gRGlzcGxheSBSZWNvbW1lbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyYWRpb1wiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJhZGlvQnV0dG9ucy5tYXAocmFkaW9CdXR0b24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJhZGlvQnV0dG9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJObyBEaXNwbGF5IFJlY29tbWVuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgZ2V0UmVjb21tZW5kZWRJbnB1dFR5cGVzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRleHQ6IFtcIlRleHRTaG9ydFwiLCBcIlRleHRNZWRpdW1cIiwgXCJUZXh0TGFyZ2VcIl0sXG4gICAgICAgICAgICB0ZXh0YXJlYTogW1wiVGV4dEFyZWFcIl0sXG4gICAgICAgICAgICBlbWFpbDogW1wiRW1haWxcIl0sXG4gICAgICAgICAgICBjaGVja2JveDogW1wiQ2hlY2tib3hcIl0sXG4gICAgICAgICAgICBidXR0b25zOiBbXCJPcHRpb25zXCJdLFxuICAgICAgICAgICAgb3B0aW9uczogW1wiT3B0aW9uc1wiXSxcbiAgICAgICAgICAgIHJhZGlvOiBbXCJPcHRpb25zXCJdLFxuICAgICAgICAgICAgbnVtYmVyOiBbXCJOdW1iZXJcIl0sXG4gICAgICAgICAgICB1cmw6IFtcIlVybFwiXSxcbiAgICAgICAgICAgIGRhdGU6IFtcIlRleHRTaG9ydFwiLCBcIlRleHRNZWRpdW1cIiwgXCJUZXh0TGFyZ2VcIiwgXCJEYXRlXCJdXG4gICAgICAgIH1bdHlwZV07XG4gICAgfVxuXG4gICAgdmFsaWRhdGVJbnB1dHMoaW5wdXRzID0gW10sIHN0YXRlID0ge30sIHN0YXRlSW5kZXgpIHtcbiAgICAgICAgbGV0IHsgaW5wdXRWYWxpZGF0b3JzLCBzdG9yeUlucHV0cyA9IHt9LCBleHBlcmllbmNlLCBkZWJ1ZywgZGVidWdDYWxsQmFjayB9ID0gdGhpcztcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBpbnB1dHMubWFwKChpbnB1dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCB7IG5hbWUgfSA9IGlucHV0O1xuICAgICAgICAgICAgbGV0IHN0b3J5SW5wdXQgPSBzdG9yeUlucHV0c1tuYW1lXTtcblxuICAgICAgICAgICAgaWYgKCFzdG9yeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgbmFtZTogc3RhdGVOYW1lLCBpZCB9ID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBcbmlWWC5pbyBTdG9yeSBpbnB1dCB3aXRoIGtleSAke25hbWV9IGNhbiBub3QgYmUgZm91bmQ6XG5TdGF0ZSBJZCA6ICR7c3RhdGUuaWR9XG5TdGF0ZSBOYW1lIDogJHtzdGF0ZU5hbWV9XG5TdGF0ZSBJbmRleCA6ICR7c3RhdGVJbmRleH1cbklucHV0IE5hbWU6ICR7bmFtZX1cbklucHV0IEluZGV4OiAke2luZGV4fVxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVjb21tZW5kID0gdGhpcy5jcmVhdGVSZWNvbW1lbmRlZFNldHRpbmdzKGlucHV0KTtcblxuICAgICAgICAgICAgICAgIGlmIChleHBlcmllbmNlLkJ1cyAmJiAhZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZS5CdXMuZW1pdChlcnJvck5hbWVzLkVYUEVSSUVOQ0UsIHsgbWVzc2FnZTogZXJyb3JNZXNzYWdlIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChleHBlcmllbmNlLmlWWGpzTG9nICYmICFkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBleHBlcmllbmNlLmlWWGpzTG9nLmVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB9LCBcIkVYUEVSSUVOQ0VcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV4cGVyaWVuY2UuaVZYanNMb2cgJiYgZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZS5pVlhqc0xvZy53YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoIWRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dE5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBzdGF0ZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJbmRleDogc3RhdGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEluZGV4OiBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGRlYnVnICYmIGRlYnVnQ2FsbEJhY2spe1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Z0NhbGxCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dE5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBzdGF0ZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVJbmRleDogc3RhdGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEluZGV4OiBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb21tZW5kXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgZGlzcGxheSB9ID0gc3RvcnlJbnB1dDtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gaW5wdXRWYWxpZGF0b3JzW2Rpc3BsYXldO1xuICAgICAgICAgICAgICAgIGxldCBuZXdJbnB1dCA9IHNlbGYuZ2xvYmFsQXR0cmlidXRlc1NldChzdG9yeUlucHV0LCBpbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmFsaWRhdG9yKG5ld0lucHV0LCBzdG9yeUlucHV0KS5pbnB1dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnbG9iYWxBdHRyaWJ1dGVzU2V0KHN0b3J5SW5wdXREYXRhLCBqc29uSW5wdXREYXRhKSB7XG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXM6IHN0b3J5QXR0cmlidXRlcyA9IHt9IH0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHsgcmVxdWlyZWQ6IHN0b3J5UmVxdWlyZWQgPSBcImZhbHNlXCIgfSA9IHN0b3J5QXR0cmlidXRlcztcbiAgICAgICAgbGV0IG5ld0lucHV0ID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXM6IGlucHV0QXR0cmlidXRlcyA9IHt9IH0gPSBuZXdJbnB1dDtcbiAgICAgICAgbGV0IHsgcmVxdWlyZWQ6IGlucHV0UmVxdWlyZWQgPSBmYWxzZSB9ID0gaW5wdXRBdHRyaWJ1dGVzO1xuXG4gICAgICAgIG5ld0lucHV0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBpbnB1dEF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiBzdG9yeVJlcXVpcmVkID09PSBcInRydWVcIiA/IHRydWUgOiBpbnB1dFJlcXVpcmVkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dDtcbiAgICB9XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgbGV0IHttYXg6IHN0b3J5TWF4QXR0cmlidXRlID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIG1pbjogc3RvcnlNaW5BdHRyaWJ1dGUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiwgc3RlcDogc3RvcnlTdGVwQXR0cmlidXRlID0gMX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXg6IGpzb25NYXhBdHRyaWJ1dGUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiwgbWluOiBqc29uTWluQXR0cmlidXRlID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIHN0ZXA6IGpzb25TdGVwQXR0cmlidXRlID0gMX0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQgdXNlU3RvcnlNaW4gPSBqc29uTWluQXR0cmlidXRlID4gc3RvcnlNaW5BdHRyaWJ1dGU7XG4gICAgICAgIGxldCB1c2VTdG9yeU1heCA9IGpzb25NYXhBdHRyaWJ1dGUgPCBzdG9yeU1heEF0dHJpYnV0ZTtcbiAgICAgICAgbGV0IHVzZVN0b3J5U3RlcCA9IHR5cGVvZiBzdG9yeVN0ZXBBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICBtaW4gOiBuZXcgTnVtYmVyKHVzZVN0b3J5TWluPyBzdG9yeU1pbkF0dHJpYnV0ZSA6IGpzb25NaW5BdHRyaWJ1dGUpLnZhbHVlT2YoKSwgXG4gICAgICAgICAgIG1heCA6IG5ldyBOdW1iZXIodXNlU3RvcnlNYXggPyBzdG9yeU1heEF0dHJpYnV0ZSA6IGpzb25NYXhBdHRyaWJ1dGUpLnZhbHVlT2YoKSwgXG4gICAgICAgICAgIHN0ZXAgOiBuZXcgTnVtYmVyKHVzZVN0b3J5U3RlcCA/IHN0b3J5U3RlcEF0dHJpYnV0ZSA6IGpzb25TdGVwQXR0cmlidXRlKS52YWx1ZU9mKCksIFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fX0gPSB0aGlzO1xuICAgICAgICBsZXQge2J1dHRvbnMgPSBbXX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQge29wdGlvbnMgPSBbXX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IG5ld0J1dHRvbnMgPSBvcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGhhc0J1dHRvbihvcHRpb24sIGJ1dHRvbnMpO1xuXG4gICAgICAgICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQge2Rpc3BsYXksIHZhbHVlfSA9IG9wdGlvbjtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGlzcGxheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG5ld0lucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIFxuICAgICAgICAgICAganNvbklucHV0RGF0YSwge1xuICAgICAgICAgICAgYnV0dG9uczogbmV3QnV0dG9ucyxcbiAgICAgICAgICAgIHR5cGUgOiBcImJ1dHRvbnNcIlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3SW5wdXREYXRhO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhc0J1dHRvbihvcHRpb24sIGJ1dHRvbnMgPSBbXSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbnMuZmluZChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b24udmFsdWUgPT09IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJpbXBvcnQgQnV0dG9ucyBmcm9tIFwiLi9vcHRpb25zLmJ1dHRvbnMuanNcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9vcHRpb25zLnJhZGlvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge3R5cGV9ID0ganNvbklucHV0RGF0YTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJidXR0b25zXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9ucyhqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSkuaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhZGlvKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhKS5pbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB7b3B0aW9uc30gPSBzdG9yeUlucHV0RGF0YTtcblxuICAgICAgICBsZXQgbmV3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9wdGlvbnNcIlxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge319ID0gdGhpcztcbiAgICAgICAgbGV0IHtyYWRpb0J1dHRvbnMgPSBbXX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQge29wdGlvbnMgPSBbXX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IG5ld1JhZGlvQnV0dG9ucyA9IG9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBsZXQge2Rpc3BsYXksIHZhbHVlfSA9IG9wdGlvbjtcbiAgICAgICAgICAgIGxldCByYWRpbyA9IGhhc1JhZGlvKG9wdGlvbiwgcmFkaW9CdXR0b25zKTtcblxuICAgICAgICAgICAgaWYgKHJhZGlvKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JhZGlvID0gT2JqZWN0LmFzc2lnbih7fSwgcmFkaW8pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JhZGlvO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGlzcGxheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG5ld0lucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLCB7XG4gICAgICAgICAgICAgICAgcmFkaW9CdXR0b25zOiBuZXdSYWRpb0J1dHRvbnMsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJyYWRpb1wiXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dERhdGE7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFzUmFkaW8ob3B0aW9uLCByYWRpb0J1dHRvbnMgPSBbXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJhZGlvQnV0dG9ucy5maW5kKHJhZGlvQnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFkaW9CdXR0b24udmFsdWUgPT09IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSAyNTY7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gMTI4O1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7ICBcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUgPSAwfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IG5ldyBOdW1iZXIoc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPCBtYXhDaGFyYWN0ZXJzID8gc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgOiAganNvbk1heExlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpLFxuICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogbmV3IE51bWJlcih0eXBlb2Ygc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQgbWF4Q2hhcmFjdGVycyA9IDY0XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gMTAyNDtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCl7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidXJsXCI7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImltcG9ydCBFdmFsdWF0b3IgZnJvbSAnLi9ldmFsdWF0b3IuanMnO1xyXG5pbXBvcnQge1J1bGVzfSBmcm9tIFwiLi4vaXZ4LWpzL3J1bGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGFuIGlWWGlvIFJ1bGVzIGZ1bmN0aW9uIHRoYXQgYWxsb3dzIG5hdmlnYXRpb24gYW5kIFxyXG4gKiBydWxlIGV2YWx1YXRpb24gYmFzZWQgb24gYm90aCBleHBlcmllbmNlIGRhdGEgYW5kIHByb2dyZXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGlWWGlvUnVsZXMgZXh0ZW5kcyBSdWxlcyB7XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjdXJyZW50IGV4cGVyaWVuY2UgdG8gdGhpcyBjbGFzcyB0byBoZWxwXHJcbiAgICAgKiBwcm9jZXNzIGJvdGggZGF0YSBhbmQgcHJvZ3Jlc3MgaW5mb3JtYWl0b24uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7aVZYaW9FeHBlcmllY2V9IGV4cGVyaWVuY2UgLSBpVlhpbyBFeHBlcmllbmNlIG9iamVjdFxyXG4gICAgICogY29udGFpbmluZyBhbGwgdGhlIGluZm9ybWF0aW9uIGZvciB0aGVzZSBydWxlcyB0byBldmFsdWF0ZSBvbi5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRvciA9IG5ldyBFdmFsdWF0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcclxuICAgIH1cclxufSIsImltcG9ydCBBdWRpb0V2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy9hdWRpby5ldmVudHMuanNcIjtcclxuaW1wb3J0IFN0YXRlRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qc1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuZCBydW5zIGFsbCBhY3Rpb25zIGZvciB0aGlzIGV4cGVyaWVuY2UuIEFuIGFjdGlvblxyXG4gKiBpcyBhbnkgcHJvY2VzcyB0aGF0IG5lZWRzIHRvIHJldHVybiBhIHByb21pc2UgaW5kaWNhdGluZyB0aGF0IFxyXG4gKiBpdCBmaW5pc2hlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBkZWZhdWx0IGRhdGEgb2JqZWN0IHRvIGJlIHVzZWQgYnkgdmFyaW91c1xyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbiBlbXB0eSBkYXRhIG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBzZXQgYW5kIFxyXG4gICAgICAgICAqIHJlY29yZCBkYXRhIHVzaW5nIHRoaXMgc2V0RGF0YSBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FdmVudE5hbWVzID0gbmV3IEF1ZGlvRXZlbnROYW1lcygpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVFdmVudE5hbWVzID0gbmV3IFN0YXRlRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBjbGFzc2VzIG9uIGFuIGVsZW1lbnQgdGhhdCB3aWxsIGNhdXNlIHRoZSBlbGVtZW50IHRvIGFuaW1hdGUuXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxOb2RlfSBlbGVtZW50IC0gZWxlbWVudCBmb3IgdGhlIGNsYXNzIHRvIGJlIHNldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50T2JqIC0gYW5pbWF0aW9uIGV2ZW50IGRhdGEuXHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MTm9kZX0gdGhlIGVsZW1lbnQgd2l0aCB0aGUgY2xhc3NlcyByZXBsYWNlZC4gIFxyXG4gICAgICovXHJcbiAgICBzZXRFbGVtZW50Q2xhc3NlcyhlbGVtZW50LCBldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IGFuaW1hdGlvbkNsYXNzZXMgPSBcIlwiIH0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgeyBhbmltYXRpb25DbGFzczogb2xkQW5pbWF0aW9uQ2xhc3MgfSA9IGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGFuaW1hdGlvbkNsYXNzZXMpID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoJ2hpZGUnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnaGlkZScsIGFuaW1hdGlvbkNsYXNzZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2xkQW5pbWF0aW9uQ2xhc3MpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG9sZEFuaW1hdGlvbkNsYXNzLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LmFuaW1hdGlvbkNsYXNzID0gYW5pbWF0aW9uQ2xhc3NlcztcclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGAke2VsZW1lbnQuY2xhc3NOYW1lfSAke2FuaW1hdGlvbkNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub05leHRTdGF0ZShldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IG5leHQ6IG5hdkFycmF5IH0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMucnVsZXMobmF2QXJyYXkpO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChzZWxmLnN0YXRlRXZlbnROYW1lcy5HTywgeyBzdGF0ZUlkOiBuZXh0U3RhdGUgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVFbGVtZW50KGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHsgZWxlbWVudCB9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25FbGVtZW50cyB8fCBhbmltYXRpb25FbGVtZW50cy5sZW5ndGggPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20oYW5pbWF0aW9uRWxlbWVudHMpO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBhbmltYXRpb25FbGVtZW50ID0gdGhpcy5zZXRFbGVtZW50Q2xhc3NlcyhhbmltYXRpb25FbGVtZW50LCBldmVudE9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGVFbGVtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkVuZHMgPSBbXHJcbiAgICAgICAgICAgICAgICAnd2Via2l0QW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdtb3pBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgJ01TQW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdvc2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICAgICAnYW5pbWF0aW9uZW5kJ1xyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0aW9uRW5kcy5mb3JFYWNoKChhbmltYXRpb25FbmROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmROYW1lLCBlbmRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZW5kQW5pbWF0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZHMuZm9yRWFjaCgoYW5pbWF0aW9uRW5kTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LmFuaW1hdGlvbkNsYXNzID0gZXZlbnRPYmouYW5pbWF0aW9uQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZE5hbWUsIGVuZEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5pbWF0ZUVsZW1lbnRQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TdGF0ZShldmVudE9iaiwgaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQgeyBzdGF0ZSB9ID0gZXZlbnRPYmo7XHJcblxyXG4gICAgICAgIGlmIChpVlhqc0J1cykge1xyXG4gICAgICAgICAgICBpVlhqc0J1cy5lbWl0KHRoaXMuc3RhdGVFdmVudE5hbWVzLkdPLCBldmVudE9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBdWRpb0NsaXAoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQgeyBhdWRpb0V2ZW50TmFtZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnRPYmopIHtcclxuICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChhdWRpb0V2ZW50TmFtZXMuU0VUX1VQLCBldmVudE9iaik7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzLmVtaXQoYXVkaW9FdmVudE5hbWVzLlBMQVkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5CdXMub24oYXVkaW9FdmVudE5hbWVzLlRJTUVfVVBEQVRFLCAoY3VycmVudEF1ZGlvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QXVkaW8uaWQgPT09IGV2ZW50T2JqLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50QXVkaW8ucnVuQ3VlUG9pbnRzKHNlbGYucHJvY2Vzc29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYXVkaW9DbGlwUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5CdXMub25jZShhdWRpb0V2ZW50TmFtZXMuRU5ERUQsIChjdXJyZW50QXVkaW8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QXVkaW8uaWQgPT09IGV2ZW50T2JqLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wcm9jZXNzb3IucmVzb2x2ZUFjdGlvbnMoZXZlbnRPYmoub25FbmQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvQ2xpcFByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YShldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IGtleSwgdmFsdWUgfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2V0RGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YVtrZXldID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxvZy5kZWJ1ZyhgQ3VycmVudCBFeHBlcmllbmNlIERhdGFgLCB7XHJcbiAgICAgICAgICAgICAgICBncm91cDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBPYmplY3Qua2V5cyhzZWxmLmRhdGEpLm1hcCgoZGF0YUtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtkYXRhS2V5fToke3NlbGYuZGF0YVtkYXRhS2V5XX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZWxmLmRhdGFbZGF0YUtleV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCBzZWxmLmRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHNlbGYpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBzZXREYXRhUHJvbWlzZTtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3Ipe1xyXG4gICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgICB0aGlzLmN1c3RvbUV2YWx1YXRvciA9IGN1c3RvbUV2YWx1YXRvcjtcclxuICAgIH1cclxuXHJcbiAgICBldmFsdWF0ZShydWxlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjb25kaXRpb25PcGVyYXRvciA9IFwiYW5kXCIsIGNvbmRpdGlvbnN9ID0gcnVsZTtcclxuICAgICAgICBsZXQgZXZhbHVhdGVDb25kaXRpb25zID0gY29uZGl0aW9ucy5tYXAoKGNvbmRpdGlvbiwgaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBsZXQge2tleSA6IGxocywgaXMsIHZhbHVlIDogcmhzLCB0eXBlID0gXCJpbnB1dFwifSA9IGNvbmRpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuY3VzdG9tRXZhbHVhdG9yICYmIHR5cGVWYWxpZGF0b3IuaXNGdW5jdGlvbihzZWxmLmN1c3RvbUV2YWx1YXRvcikgJiYgc2VsZi5jdXN0b21FdmFsdWF0b3IoY29uZGl0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jdXN0b21FdmFsdWF0b3IoY29uZGl0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2luY2Ugb2xkZXIgdmVyc2lvbnMgb2YgdGhlIGlWWGpzIEpTT04gdXNlZCBcclxuICAgICAgICAgICAgLy8gdGhlIGtleSBmb3IgXCJrZXl3b3JkXCIgdGhpcyB3aWxsIG1ha2UgaXQgYmFja3dhcmRzXHJcbiAgICAgICAgICAgIC8vIGNvbXBhdGFibGVcclxuICAgICAgICAgICAgaWYoc2VsZltsaHNdKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmW2xoc10obGhzLCBpcywgcmhzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNlbGZbdHlwZV0obGhzLCBpcywgcmhzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbY29uZGl0aW9uT3BlcmF0b3JdKGV2YWx1YXRlQ29uZGl0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQobGhzLCBpcywgcmhzKXtcclxuICAgICAgICBsZXQge2V4cGVyaWVuY2V9ID0gdGhpcztcclxuICAgICAgICBsZXQgbGhzVmFsdWUgPSBleHBlcmllbmNlLmRhdGFbbGhzXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbaXNdKGxoc1ZhbHVlLCByaHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuZChwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSAmJiBwcmVkaWNhdGU7XHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBvcihwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSB8fCBwcmVkaWNhdGU7XHJcbiAgICAgICAgfSxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90KHByZWRpY2F0ZXMgPSBbXSl7XHJcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXMucmVkdWNlKChldmFsdWF0ZSwgcHJlZGljYXRlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRlICYmICFwcmVkaWNhdGU7XHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbHRlKGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpIDw9IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbHQobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPCBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgZ3RlKGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpID49IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ3QobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPiBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGVxdWFscyhsaHMsIHJocyl7XHJcbiAgICAgICAgcmV0dXJuIGxocyA9PT0gcmhzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBub3RFcXVhbHMobGhzLHJocyl7XHJcbiAgICAgICAgcmV0dXJuIGxocyAhPT0gcmhzO1xyXG4gICAgfVxyXG5cclxuICAgIGluKGxocyxyaHMpe1xyXG4gICAgICAgIHJldHVybiByaHMuaW5kZXhPZihsaHMpID49IDA7XHJcbiAgICB9ICAgICAgICBcclxufSIsImltcG9ydCBFdmFsdWF0b3IgZnJvbSAnLi9ldmFsdWF0b3IuanMnO1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcblxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuLyoqXHJcbiAqIEEgZGVmYXVsdCBydWxlIHN5c3RlbSBpbiB3aGljaCBpVlhqcyBjaG9vc2VzIHdoaWNoIHN0YXRlIFxyXG4gKiB0byBnbyB0byBiYXNlZCBvZiB0aGUgY3VycmVudCBpVlhqcyBFeHBlcmllbmNlIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUnVsZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZXhwZXJpZW5jZSBpbiB3aGljaCB0aGlzIGRhdGEgXHJcbiAgICAgKiB3aWxsIGJlIGV2YWx1YXRlZCB0by5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV4cGVyaWVuY2UgLSBpVlhqc0V4cGVyaWVuY2UgXHJcbiAgICAgKiBvYmplY3QgaW4gd2hpY2ggZGF0YSB3aWxsIGJlIHVzZWQgdG8gZXZhbHVhdGUgdmFyaW91cyBydWxlcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSA9IHsgZGF0YToge30gfSwgY3VzdG9tRXZhbHVhdG9yKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEN1cnJlbnQgaVZYanMgRXhwZXJlaW5jZSBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0b3IgPSBuZXcgRXZhbHVhdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBydWxlcyBmdW5jdGlvbiB0aGF0IHdpbGwgcHJvY2VzcyBhbiBcclxuICAgICAqIGFycmF5IG9mIG5hdmlnYXRpb24gb2JqZWN0cyBhbmQgZXZhbHVhdGUgdGhlbSB1c2luZyBcclxuICAgICAqIHRoZSBwcm9jZXNzUnVsZXMgZnVuY3Rpb24uXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZ2V0IHJ1bGVzKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIChuYXZBcnJheSA9IFtdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnByb2Nlc3NSdWxlcyhuYXZBcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRocm91Z2ggYW5kIHJldHVybnMgdGhlIGZpcnN0IG5hdiBvYmplY3Qgd2hvc2UgXHJcbiAgICAgKiBydWxlIGlzIGV2YWx1YXRlZCB0byB0cnVlIG9yIHJ1bGVzIGFyZSBlbXB0eS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthcnJheX0gbmF2QXJyYXkgLSBBbiBhcnJheSBvZiBuYXZpZ2F0aW9uIG9iamVjdHMgXHJcbiAgICAgKiB3aXRoIHJ1bGVzIGFuZCBzdGF0ZXMgdG8gYmUgZXZhbHVhdGVkLlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBzdGF0ZUlkIG9mIHRoZSBydWxlIHRoYXQgd2FzIGV2YWx1YXRlZCBcclxuICAgICAqIHRydWUgZmlyc3QuIElmIG5vIHN0YXRlIGlzIHJldHVybiwgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIHByb2Nlc3NSdWxlcyhuYXZBcnJheSA9IFtdKSB7XHJcblxyXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KG5hdkFycmF5KSl7XHJcbiAgICAgICAgICAgIG5hdkFycmF5ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc3RhdGVTZWxlY3QgPSBuYXZBcnJheS5maW5kKChuYXZPYmopID0+IHtcclxuICAgICAgICAgICAgbGV0IHtydWxlfSA9IG5hdk9iajtcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShydWxlKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQge2NvbmRpdGlvbnMsIGNvbmRpdGlvbk9wZXJhdG9yID0gXCJhbmRcIn0gPSBydWxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25kaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBydWxlLmNvbmRpdGlvbk9wZXJhdG9yID0gY29uZGl0aW9uT3BlcmF0b3I7XHJcbiAgICAgICAgICAgICAgICBydWxlLmNvbmRpdGlvbnMgPSBbcnVsZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmV2YWx1YXRvci5ldmFsdWF0ZShydWxlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlU2VsZWN0ID8gc3RhdGVTZWxlY3Quc3RhdGVJZCA6ICcnO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihsb2cpIHtcblx0XHR0aGlzLmxvZyA9IGxvZ1xuXHR9XG5cblx0YXNzZXJ0KHRlc3QsIG5hbWUsIG1lc3NhZ2UpIHtcblx0XHRsZXQge2xvZ30gPSB0aGlzO1xuXHRcdGxldCB7c2hvdzogZGVidWd9ID0gbG9nO1xuXG5cdFx0aWYgKCF0ZXN0KSB7XG5cdFx0XHRsZXQgZXJyb3JPYmogPSB7IFxuXHRcdFx0XHRtZXNzYWdlIDogYCR7bmFtZX0gaXMgaW52YWxpZDogJHttZXNzYWdlfS5gXG5cdFx0XHR9O1xuXG5cdFx0XHRpZihkZWJ1Zyl7XG5cdFx0XHRcdHRoaXMubG9nLmVycm9yKGVycm9yT2JqLCBcIkFTU0VSVFwiKTtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yT2JqLm1lc3NhZ2UpO1xuXHRcdFx0fSBcblx0XHR9XG5cblx0XHRyZXR1cm4gdGVzdDtcblx0fVxufSIsImltcG9ydCBMb2dnaW5nTWVzc2FnZXMgZnJvbSAgJy4uL2NvbnN0YW50cy9sb2dnaW5nLmpzJztcbmltcG9ydCBFcnJvck1lc3NhZ2VzIGZyb20gJy4uL2NvbnN0YW50cy9lcnJvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2hvdywgQnVzKSB7XG4gICAgICAgIHRoaXMuc2hvdyA9IHNob3c7XG4gICAgICAgIHRoaXMuTG9nZ2luZ01lc3NhZ2VzID0gbmV3IExvZ2dpbmdNZXNzYWdlcygpO1xuICAgICAgICB0aGlzLkVycm9yTWVzc2FnZXMgPSBuZXcgRXJyb3JNZXNzYWdlcygpO1xuICAgICAgICB0aGlzLkJ1cyA9IEJ1cztcbiAgICB9XG5cbiAgICB3YXJuKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHtzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgd2Fybk1lc3NhZ2UgPSBMb2dnaW5nTWVzc2FnZXMuV0FSTjtcbiAgICAgICAgbGV0IHdhcm5QYXlsb2FkID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHt3YXJuTWVzc2FnZX06ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJ1cy5lbWl0KHdhcm5NZXNzYWdlLCB3YXJuUGF5bG9hZCk7XG4gICAgfVxuXG4gICAgZXJyb3IoZXJyb3IsIHR5cGUgPSBcIkRFRkFVTFRcIikge1xuICAgICAgICBsZXQge3Nob3csIEVycm9yTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgZXJyb3JUeXBlTWVzc2FnZSA9IEVycm9yTWVzc2FnZXNbdHlwZV07XG4gICAgICAgIGxldCB7bWVzc2FnZX0gPSBlcnJvcjtcbiAgICAgICAgbGV0IGVycm9yUGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0eXBlIDogZXJyb3JUeXBlTWVzc2FnZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihgJHtlcnJvclR5cGVNZXNzYWdlfTogJHttZXNzYWdlfWApO1xuICAgICAgICBCdXMuZW1pdChlcnJvclR5cGVNZXNzYWdlLCBlcnJvcik7XG4gICAgICAgIEJ1cy5lbWl0KExvZ2dpbmdNZXNzYWdlcy5FUlJPUiwgZXJyb3JQYXlsb2FkKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyhtZXNzYWdlLCBvcHRpb25zID0ge30sIGRhdGE9e30pIHtcbiAgICAgICAgbGV0IHsgc2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXMgfSA9IHRoaXM7XG4gICAgICAgIGxldCBsb2dNZXNzYWdlID0gTG9nZ2luZ01lc3NhZ2VzLkRFQlVHO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCB7IGdyb3VwID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICAgICAgaWYgKGdyb3VwICYmIHNob3cpIHtcbiAgICAgICAgICAgIGxldCB7IG1lc3NhZ2VzIH0gPSBvcHRpb25zO1xuXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGAke2xvZ01lc3NhZ2V9OiAke21lc3NhZ2V9YClcblxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgeyB0aXRsZSwgbWVzc2FnZSA6IGxvZ01lc2FnZSB9ID0gbWVzc2FnZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlTWVzc2FnZShsb2dNZXNhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlTWVzc2FnZShsb2dNZXNhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG5cbiAgICAgICAgICAgIEJ1cy5lbWl0KGxvZ01lc3NhZ2UsIG1lc3NhZ2UsIG9wdGlvbnMsIGRhdGEpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nTWVzc2FnZX06JHttZXNzYWdlfWApO1xuICAgICAgICAgICAgQnVzLmVtaXQobG9nTWVzc2FnZSwgbWVzc2FnZSwge30sIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9nKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHtzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgbG9nTWVzc2FnZSA9IExvZ2dpbmdNZXNzYWdlcy5MT0c7XG4gICAgICAgIGxldCBsb2dQYXlsb2FkID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ01lc3NhZ2V9OiAke21lc3NhZ2V9YCk7XG4gICAgICAgIEJ1cy5lbWl0KGxvZ01lc3NhZ2UsIGxvZ1BheWxvYWQpO1xuICAgIH1cblxuICAgICBjcmVhdGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKChtZXNzYWdlICE9PSBudWxsICYmIHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JykgfHwgQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdHJhY2Uoc3RhY2spIHtcbiAgICAgICAgbGV0IHtzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1c30gPSB0aGlzO1xuICAgICAgICBsZXQgc3RhY2tQYXlMb2FkID0ge1xuICAgICAgICAgICAgc3RhY2s6IHN0YWNrLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudHJhY2Uoc3RhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgQnVzLmVtaXQoTG9nZ2luZ01lc3NhZ2VzLlRSQUNFLCBzdGFja1BheUxvYWQpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdHJpbmcob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcclxuICAgIH1cclxuXHJcbiAgICBpc0Z1bmN0aW9uKG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
