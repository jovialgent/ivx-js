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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2Vycm9ycy5qcyIsInNyYy9jb25zdGFudHMvaHR0cC5qcyIsInNyYy9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzIiwic3JjL2NvbnN0YW50cy9pVlhpby5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL2xvZ2dpbmcuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvc3RhdGUuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vYWN0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtcmVjb3JkLWV2ZW50L2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtc2V0LWNvbXBsZXRlZC9kaXJlY3RpdmUuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9jb21wb25lbnRzL2FjdGlvbi10ZW1wbGF0ZXMvaXZ4LXNldC1jb252ZXJ0ZWQvZGlyZWN0aXZlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9hY3Rpb24tdGVtcGxhdGVzL2l2eC1zZXQtbWlsZXN0b25lL2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvZmFjdG9yeS1mdW5jdGlvbi1jcmVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2V2YWx1YXRvci5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2luZGV4LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9jYXNjYWRpbmctb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9vcHRpb25zLmJ1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMucmFkaW8uanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbGFyZ2UuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbWVkaXVtLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0LXNob3J0LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvdXJsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vcnVsZXMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9zZXJ2aWNlcy9leHBlcmllbmNlLXNjb3BlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vc2VydmljZXMvaW5kZXguanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvZXZhbHVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvcnVsZXMuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL2xvZ2dpbmcuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsa0JBQU0sTUFaTztBQWFiLG9CQUFTLFFBYkk7QUFjYiwwQkFBYyxjQWREO0FBZWIsd0JBQVksWUFmQztBQWdCYix5QkFBYSxhQWhCQTtBQWlCYixvQkFBUTtBQWpCSyxTQUFqQjs7QUFvQkEsY0FBSyxRQUFMLENBQWMsVUFBZDtBQXZCVTtBQXdCYjs7OzttQ0FFVSxTLEVBQVc7QUFBQSxnQkFDYixTQURhLEdBQ0EsSUFEQSxDQUNiLFNBRGE7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsU0FBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLEtBQUwsR0FBYSxP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OztBQUlEOzs7Ozs7Ozs7bUNBTXFDO0FBQUEsZ0JBQTVCLFVBQTRCLHVFQUFmLEVBQWU7QUFBQSxnQkFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2pDLGdCQUFJLFlBQVk7QUFDWiwwQkFBVSxJQURFO0FBRVosd0JBQVE7QUFGSSxhQUFoQjtBQUlBLGdCQUFJLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsZ0NBQWdCLEdBQWhCLElBQXVCLEVBQXZCO0FBQ0EsMkJBQVcsT0FBWCxDQUFtQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLHdCQUFJLFlBQVksS0FBSyxHQUFMLENBQVMsZ0JBQWdCLEdBQWhCLENBQVQsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBQWhCOztBQUVBLHdCQUFJLFNBQUosRUFBZTtBQUNYLGtDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0I7QUFDbEIsaUNBQUssR0FEYTtBQUVsQixtQ0FBTyxLQUZXO0FBR2xCLG1DQUFPLFFBQVEsR0FBUjtBQUhXLHlCQUF0QjtBQUtBLGtDQUFVLFFBQVYsR0FBcUIsS0FBckI7QUFDSCxxQkFQRCxNQU9PO0FBQ0gsd0NBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTBCLFFBQVEsR0FBUixDQUExQjtBQUNIO0FBQ0osaUJBYkQ7QUFjSCxhQWhCRDs7QUFrQkEsbUJBQU8sU0FBUDtBQUNIOzs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXVkaW9Db25zdGFudHMgZnJvbSBcIi4vYXVkaW8uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBdWRpb0NvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBBRERfUExBWUlOR19DTEFTUzogJ2FkZC1wbGF5aW5nLWNsYXNzJyxcbiAgICAgICAgICAgIEJVRkZFUklORyA6IFwiYnVmZmVyaW5nXCIsXG4gICAgICAgICAgICBDQU5fUExBWTogXCJjYW4tcGxheVwiLFxuICAgICAgICAgICAgRElTUE9TRSA6IFwiZGlzcG9zZVwiLFxuICAgICAgICAgICAgRU5ERUQgOiBcImVuZGVkXCIsXG4gICAgICAgICAgICBHRVRfRFVSQVRJT046IFwiZ2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBNVVRFOiBcIm11dGVcIixcbiAgICAgICAgICAgIFBBVVNFOiBcInBhdXNlXCIsXG4gICAgICAgICAgICBQQVVTRUQ6IFwicGF1c2VkXCIsXG4gICAgICAgICAgICBQTEFZOiBcInBsYXlcIixcbiAgICAgICAgICAgIFBMQVlJTkc6IFwicGxheWluZ1wiLFxuICAgICAgICAgICAgU0VFSzogXCJzZWVrXCIsXG4gICAgICAgICAgICBTRVRfVVAgOiBcInNldC11cFwiLFxuICAgICAgICAgICAgU0VUX0RVUkFUSU9OOiBcInNldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1ZPTFVNRTogXCJzZXQtdm9sdW1lXCIsXG4gICAgICAgICAgICBUSU1FX1VQREFURTogXCJ0aW1lLXVwZGF0ZVwiLFxuICAgICAgICAgICAgVU5NVVRFOiBcInVubXV0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkFVRElPID0gXCJhdWRpb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgIGxldCB7REVMSU1FVEVSLCBBVURJT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7QVVESU99YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgVmlkZW9Db25zdGFudHMgZnJvbSBcIi4vdmlkZW8uanNcIjtcbmltcG9ydCBIdHRwQ29uc3RhbnRzIGZyb20gXCIuL2h0dHAuanNcIjtcbmltcG9ydCBpVlhpb0NvbnN0YW50cyBmcm9tIFwiLi9pVlhpby5qc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHMge1xuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuRVJST1IgPSBcImVycm9yXCI7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBWSURFTzogbmV3IFZpZGVvQ29uc3RhbnRzKCkuVklERU8sXG4gICAgICAgICAgICBIVFRQIDogbmV3IEh0dHBDb25zdGFudHMoKS5IVFRQLFxuICAgICAgICAgICAgVkFMSURBVElPTiA6IFwidmFsaWRhdGlvblwiLFxuICAgICAgICAgICAgU0VUX1VQIDogXCJzZXQtdXBcIixcbiAgICAgICAgICAgIElWWF9JTyA6IG5ldyBpVlhpb0NvbnN0YW50cygpLklWWF9JTyxcbiAgICAgICAgICAgIERFRkFVTFQgOiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgIEFTU0VSVCA6IFwiYXNzZXJ0XCIsXG4gICAgICAgICAgICBFWFBFUklFTkNFOiBcImV4cGVyaWVuY2VcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtFUlJPUiwgREVMSU1FVEVSfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtFUlJPUn0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cblxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5IVFRQID0gXCJodHRwXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgSFRUUH0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7SFRUUH1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9Db25zdGFudHMgZnJvbSBcIi4vaVZYaW8uanNcIjtcbmltcG9ydCBFcnJvckNvbnN0YW50cyBmcm9tIFwiLi9lcnJvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhpb0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuRVJST1IgPSBuZXcgRXJyb3JDb25zdGFudHMoKS5FUlJPUjtcblxuICAgICAgICBsZXQgZXJyb3JUeXBlcyA9IHtcbiAgICAgICAgICAgIEVYUEVSSUVOQ0UgOiBcImV4cGVyaWVuY2VcIixcbiAgICAgICAgICAgIFBMQVRGT1JNX1VOQVZBSUxBQkxFIDogXCJwbGF0Zm9ybS11bmF2YWlsYWJsZVwiLFxuICAgICAgICAgICAgRVZFTlRfTk9UX0ZJUkVEIDogXCJldmVudC1ub3QtZmlyZWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhlcnJvclR5cGVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGVycm9yTmFtZSl7XG4gICAgICAgIGxldCB7RVJST1IsIERFTElNRVRFUn0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0VSUk9SfSR7REVMSU1FVEVSfSR7ZXJyb3JOYW1lfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuSVZYX0lPID0gXCJpVlhpb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIElWWF9JT30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7SVZYX0lPfWA7ICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5MT0dHSU5HID0gXCJsb2dcIjtcblxuICAgICAgICBsZXQgbG9nVHlwZXMgPSB7XG4gICAgICAgICAgICBFUlJPUiA6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIFdBUk4gOiBcIndhcm5cIixcbiAgICAgICAgICAgIFRSQUNFIDogXCJ0cmFjZVwiLFxuICAgICAgICAgICAgTE9HIDpcIlwiLFxuICAgICAgICAgICAgREVCVUcgOiBcImRlYnVnXCJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMobG9nVHlwZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24obGV2ZWwpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgTE9HR0lOR30gPSB0aGlzO1xuICAgICAgICBpZihsZXZlbC5sZW5ndGggPD0gMCl7XG4gICAgICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7TE9HR0lOR31gXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7TE9HR0lOR30ke0RFTElNRVRFUn0ke2xldmVsfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc1N0YXRlQ29uc3RhbnRzIGZyb20gXCIuL3N0YXRlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzU3RhdGVDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIENIQU5HRSA6IFwiY2hhbmdlXCIsXG4gICAgICAgICAgICBTVUNDRVNTIDogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBFUlJPUiA6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIEdPIDogXCJnb1wiLFxuICAgICAgICAgICAgTk9UX0ZPVU5EIDogXCJub3QtZm91bmRcIixcbiAgICAgICAgICAgIEdFVF9TVEFURSA6IFwiZ2V0LXN0YXRlXCIsXG4gICAgICAgICAgICBSRVFVRVNUX1NUQVRFIDogXCJyZXF1ZXN0LXN0YXRlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLlNUQVRFID0gXCJzdGF0ZVwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIFNUQVRFfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtTVEFURX1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLlZJREVPID0gXCJ2aWRlb1wiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIFZJREVPfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtWSURFT31gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9FcnJvck5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzXCI7XHJcbmltcG9ydCBMb2dnaW5nIGZyb20gXCIuLi8uLi8uLi91dGlsaXRpZXMvbG9nZ2luZy5qc1wiO1xyXG5cclxubGV0IGlWWGlvRXJyb3JzID0gbmV3IGlWWGlvRXJyb3JOYW1lcygpO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSBsYXllciBvZiB0cmFuc2Zvcm1hdGlvbiB0byBpVlhpbydzIGhvc3QgZnVuY3Rpb25hbGl0eVxyXG4gKiB0byB3b3JrIHdpdGggdGhlIEFjdGlvbiBzeXN0ZW0gaW4gaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgaVZYaW9BY3Rpb25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1bGxzIHRoZSBpVlhpbydzIGV4cGVyaWVuY2UgaG9zdCB0aGF0IHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHVzZSB0byBzZXQgdmFyaW91cyBleHBlcmllbmNlIGRhdGEuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RXhwZXJpZW5jZUhvc3R9IGV4cGVyaWVuY2UgLSBjdXJyZW50IGluc3RhbmNlIG9mIGlWWGlvJ3NcclxuICAgICAqIGV4cGVyaWVuY2UgaG9zdC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgaVZYanNMb2cgPSBuZXcgTG9nZ2luZyhmYWxzZSwgZXhwZXJpZW5jZS5CdXMpKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBleHBlcmllbmNlIGhvc3QgdGhhdCB3aWxsIHBlcmZvcm0gdGhlIFxyXG4gICAgICAgICAqIGFjdGlvbnMgdG8gdGhlIHBsYXRmb3JtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHR5cGUge0V4cGVyaWVuY2VIb3N0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgdGhpcy5pVlhqc0xvZyA9IGlWWGpzTG9nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlcyB0aGUgXCJhbmltYXRlUGFnZUVsZW1lbnRcIiBmcm9tIHRoZSBwbGF0Zm9ybSB0b1xyXG4gICAgICogaVZYanMncyBhY3Rpb24gXCJhbmltYXRlRWxlbWVudC5cIlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYW5pbWF0ZSBwYWdlIGVsZW1lbnQncyBldmVudCBvYmplY3QgXHJcbiAgICAgKiB3aXRoIGEgdGFyZ2V0IGlkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGluZGljYXRlcyB0aGUgYW5pbWF0aW9uIHRvIGFuIGVsZW1lbnQgaXMgZmluaXNoZWQuXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVQYWdlRWxlbWVudChldmVudEFyZ3MpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnRBcmdzLnRhcmdldElEKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSAnIycgKyBldmVudEFyZ3MudGFyZ2V0SURcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZXZlbnRBcmdzLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLmFuaW1hdGVFbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ2xhc3M6IGV2ZW50QXJncy5hbmltYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwbGF0Zm9ybSB1dGlsaXplcyAuTkVUJ3MgdGltZSBmb3JtYXQgYW5kIHJlcXVpcmVzIHRoZSBkYXRlIFxyXG4gICAgICogdmFsdWUgdG8gYmUgaW4gYSBzcGVjaWZpYyBmb3JtYXQgZm9yIERhdGUvRGF0ZXRpbWUgaW5wdXRzLiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGV4cGVyaWVuY2Uga2V5IHRvIHB1bGwgdGhlIGlucHV0IGRpc3BsYXkuXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSB0aGUgZGF0ZSB0byB0cmFuc2Zvcm0gaW50byAuTkVUIHNhZmUgc3RyaW5nLlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAtIGNvcnJlY3RseSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgZm9yIC5ORVQuXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZm9ybWF0RGF0ZUZvclBsYXRmb3JtKGtleSwgZGF0ZSkge1xyXG4gICAgICAgIGxldCB7IGlucHV0cyB9ID0gdGhpcy5leHBlcmllbmNlLnN0b3J5O1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGlucHV0c1trZXldO1xyXG4gICAgICAgIGxldCB7IGRpc3BsYXkgfSA9IGlucHV0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkRhdGVcIjpcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlU3RyaW5nID0gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke2dldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSl9LSR7Z2V0RGF0ZShkYXRlLmdldERhdGUoKSl9YDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1vbnRoKG1vbnRoTnVtKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3JyZWN0ZWRNb250aE51bSA9IChtb250aE51bSArIDEpICUgMTM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkTW9udGhOdW0gPj0gMTAgPyBjb3JyZWN0ZWRNb250aE51bSA6IGAwJHtjb3JyZWN0ZWRNb250aE51bX1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRlKGRhdGVOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGVOdW0gPj0gMTAgPyBkYXRlTnVtIDogYDAke2RhdGVOdW19YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgY3VzdG9tIGV2ZW50IGluIHRoZSBldmVudCBhcmdzIGZvciB0aGUgXHJcbiAgICAgKiBwbGF0Zm9ybSB0byByZWNvcmQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLmN1c3RvbUV2ZW50IC0gZXZlbnQgbmFtZSB0byBiZSByZWNvcmRlZFxyXG4gICAgICogYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgZXZlbnQgd2FzIHN1Y2Nlc3NmdWxseSByZWNvcmRlZCBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHJlY29yZEV2ZW50KGV2ZW50QXJncykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRBcmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQgeyBjdXN0b21FdmVudCB9ID0gZXZlbnRBcmdzO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2UucmVjb3JkRXZlbnQoY3VzdG9tRXZlbnQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlLCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXRDb252ZXJ0ZWQgZXZlbnQgd2l0aCBhIGxhYmVsIGlmIG9uZSBpcyBwcm92aWRlZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3MubGFiZWwgLSBjb252ZXJ0ZWQgbGFiZWwgdGhhdCB3aWxsIGJlIHJlY29yZGVkXHJcbiAgICAgKiBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBzZXRDb252ZXJ0ZWQgd2FzIHN1Y2Nlc3NmdWwgYnkgdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICBzZXRDb252ZXJ0ZWQoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGxhYmVsIH0gPSBldmVudEFyZ3M7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXRDb252ZXJ0ZWQobGFiZWwpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVZFTlRfTk9UX0ZJUkVELCBldmVudEFyZ3MsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcihlLCBcIklWWF9JT1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBzZXRDb21wbGV0ZWQgZXZlbnQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbGwgZXZlbnQgYXJndW1lbnRzXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBzZXRDb21wbGV0ZSB3YXMgc3VjY2Vzc2Z1bCBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldENvbXBsZXRlKGV2ZW50QXJncyA9IHt9KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldENvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUsIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIHNldERhdGEgZXZlbnQgdG8gdGhlIHBsYXRmb3JtIHdpdGggdGhlIGtleSBhbmQgIFxyXG4gICAgICogdmFsdWUgaW4gdGhlIGV2ZW50QXJncy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3Mua2V5IC0gZXhwZXJpZW5jZSBkYXRhIGtleSB0byBiZSBzZXQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRBcmdzLnZhbHVlIC0gZXhwZXJpZW5jZSBkYXRhIHZhbHVlIHRvIGJlIHNldCB0by4gIFxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB3aWxsIGluZGljYXRlIGlmIHRoaXMgZGF0YSB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgdG8gdGhlIHBsYXRmb3JtLlxyXG4gICAgICovXHJcbiAgICBzZXREYXRhKGV2ZW50QXJncykgeyAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGtleSwgdmFsdWUgfSA9IGV2ZW50QXJncztcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgeyBkZWJ1Z0hvc3QgPSBmYWxzZSB9ID0gdGhpcy5leHBlcmllbmNlO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXROb3RGb3VuZCA9IHR5cGVvZiB0aGlzLmV4cGVyaWVuY2UuZGF0YVtrZXldID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmV4cGVyaWVuY2UuZGF0YVtrZXldID09PSBudWxsXHJcblxyXG4gICAgICAgICAgICBpZiAoIWRlYnVnSG9zdCAmJiBpbnB1dE5vdEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoJ2lWWGpzOmlWWGlvOmVycm9yOmV2ZW50LW5vdC1maXJlZCcsIGV2ZW50QXJncywgeyBtZXNzYWdlOiBcImlWWGpzIEVycm9yIE1lc3NhZ2U6IElucHV0IG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcih7IG1lc3NhZ2U6ICdpVlhqcyBFcnJvciBNZXNzYWdlOiBJbnB1dCBub3QgZm91bmQnIH0sIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZUZvclBsYXRmb3JtKGtleSwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0RGF0YShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0RGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh0ZXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7IGRhdGEgfSA9IHNlbGYuZXhwZXJpZW5jZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Z0hvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhwZXJpZW5jZS5kYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5leHBlcmllbmNlLkxvZy5kZWJ1ZyhgQ3VycmVudCBFeHBlcmllbmNlIERhdGFgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGRhdGFLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7ZGF0YUtleX06JHtkYXRhW2RhdGFLZXldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFbZGF0YUtleV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0TWlsZXN0b25lIHdpdGggdGhlIG1pbGVzdG9uZSBkZWZpbmVkIGluIHRoZSBcclxuICAgICAqIGV2ZW50QXJncyBvYmplY3QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBob2xkcyB0aGUgbWlsZXN0b25lIHRvIGJlIHNlbmQgdG8gdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy5taWxlc3RvbmUgLSBtaWxlc3RvbmUgdG8gYmUgc2V0LlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBpbmRpY2F0ZXMgaWYgdGhpcyBtaWxlc3RvbmUgd2FzIHNldCBvbiB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldE1pbGVzdG9uZShldmVudEFyZ3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHsgbWlsZXN0b25lIH0gPSBldmVudEFyZ3M7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXRNaWxlc3RvbmUobWlsZXN0b25lKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgaVZYUmVjb3JkRXZlbnQgZnJvbSBcIi4vaXZ4LXJlY29yZC1ldmVudC9kaXJlY3RpdmVcIjtcbmltcG9ydCBpVlhTZXRDb21wbGV0ZWQgZnJvbSBcIi4vaXZ4LXNldC1jb21wbGV0ZWQvZGlyZWN0aXZlXCI7XG5pbXBvcnQgaVZYU2V0Q29udmVydGVkIGZyb20gXCIuL2l2eC1zZXQtY29udmVydGVkL2RpcmVjdGl2ZVwiO1xuaW1wb3J0IGlWWFNldE1pbGVzdG9uZSBmcm9tIFwiLi9pdngtc2V0LW1pbGVzdG9uZS9kaXJlY3RpdmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBuZXcgaVZYUmVjb3JkRXZlbnQoYXBwLCBvcHRzKTtcbiAgICAgICAgbmV3IGlWWFNldENvbXBsZXRlZChhcHAsb3B0cyk7XG4gICAgICAgIG5ldyBpVlhTZXRDb252ZXJ0ZWQoYXBwLG9wdHMpO1xuICAgICAgICBuZXcgaVZYU2V0TWlsZXN0b25lKGFwcCwgb3B0cyk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgaUVsbVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgeyBpdnhSZWNvcmRFdmVudDogdmFsdWUgfSA9IGlBdHRycztcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2UucmVjb3JkRXZlbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5EaXJlY3RpdmUuJGluamVjdCA9IFtcImlWWGpzXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIGxldCB7IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgfSA9IG9wdHM7XG5cbiAgICAgICAgYXBwXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdpdnhSZWNvcmRFdmVudCcsIGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IoRGlyZWN0aXZlKSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgaUVsbVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpVlhqcy5leHBlcmllbmNlLnNldENvbXBsZXRlKCk7XG5cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4U2V0Q29tcGxldGVkJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaVZYanMpIHtcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBpRWxtWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCB7IGl2eFNldENvbnZlcnRlZDogdmFsdWUgfSA9IGlBdHRycztcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2Uuc2V0Q29udmVydGVkKHZhbHVlKTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4U2V0Q29udmVydGVkJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaVZYanMpIHtcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBpRWxtWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCB7IGl2eFNldE1pbGVzdG9uZTogdmFsdWUgfSA9IGlBdHRycztcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2Uuc2V0TWlsZXN0b25lKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4U2V0TWlsZXN0b25lJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG5cdGxldCBjb25zdHJ1Y3RvckZuID0gY29uc3RydWN0b3I7XG5cdGxldCBhcmdzID0gY29uc3RydWN0b3JGbi4kaW5qZWN0O1xuXHRsZXQgZmFjdG9yeUZ1bmN0aW9uID0gKC4uLmFyZ3MpID0+IHtcbiAgICBcdHJldHVybiBuZXcgY29uc3RydWN0b3JGbiguLi5hcmdzKTtcblx0fVxuXHRcblx0YXJncy5wdXNoKGZhY3RvcnlGdW5jdGlvbik7XG5cblx0cmV0dXJuIGFyZ3M7XG59IiwiaW1wb3J0IEFjdGlvblRlbXBsYXRlcyBmcm9tIFwiLi9hY3Rpb24tdGVtcGxhdGVzL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbmV3IEFjdGlvblRlbXBsYXRlcyhhcHAsIG9wdHMpO1xuICAgIH1cbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gXCIuLi9pdngtanMvZXZhbHVhdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZhbHVhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpIHtcbiAgICAgICAgc3VwZXIoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcbiAgICB9XG5cbiAgICBzdG9yeUV2ZW50cyhsaHMsIGlzLCBzdG9yeUV2ZW50KSB7XG4gICAgICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzO1xuICAgICAgICBsZXQge2V2ZW50c30gPSBleHBlcmllbmNlO1xuXG4gICAgICAgIGlmIChzdG9yeUV2ZW50ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybiBub0V2ZW50RmlyZWQoaXMsIGV2ZW50cywgZXhwZXJpZW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1tpc10oc3RvcnlFdmVudCwgZXZlbnRzKTtcblxuICAgICAgICBmdW5jdGlvbiBub0V2ZW50RmlyZWQoaXMsIGV2ZW50cywgZXhwZXJpZW5jZSkge1xuICAgICAgICAgICAgbGV0IGlzRmlyZWQgPSBpcyA9PT0gJ2ZpcmVkJztcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5sZW5ndGggPD0gMCAmJiBpc0ZpcmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyZWQoZXZlbnQsIGV2ZW50cykge1xuICAgICAgICBsZXQgZmlyZWRFdmVudCA9IGV2ZW50cy5maW5kKChldmVudEZpcmVkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50RmlyZWQgPT09IGV2ZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHlwZW9mIGZpcmVkRXZlbnQgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5vdEZpcmVkKGV2ZW50LCBldmVudHMpIHtcbiAgICAgICAgbGV0IGZpcmVkRXZlbnQgPSBldmVudHMuZmluZCgoZXZlbnRGaXJlZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudEZpcmVkID09PSBldmVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmaXJlZEV2ZW50ID09PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICBwcm9ncmVzcyhsaHMsIGlzLCBwcm9ncmVzcykge1xuICAgICAgICBsZXQge2V4cGVyaWVuY2V9ID0gdGhpcztcbiAgICAgICAgbGV0IHtwcm9ncmVzczogY3VycmVudFN0b3J5UHJvZ3Jlc3MsIG1pbGVzdG9uZTogY3VycmVudE1pbGVzdG9uZSwgc3Rvcnl9ID0gZXhwZXJpZW5jZTtcbiAgICAgICAgbGV0IHtwcm9ncmVzc01hcH0gPSBzdG9yeTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzcztcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc1ZhbHVlID0gLTE7XG4gICAgICAgIGxldCBjdXJyZW50TWlsZXN0b25lVmFsdWUgPSAtMTtcblxuICAgICAgICBpZiAoY3VycmVudE1pbGVzdG9uZSAmJiBjdXJyZW50TWlsZXN0b25lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TWlsZXN0b25lU3RyaW5nID0gY3VycmVudE1pbGVzdG9uZVswXS50b0xvd2VyQ2FzZSgpICsgY3VycmVudE1pbGVzdG9uZS5zdWJzdHJpbmcoMSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRNaWxlc3RvbmVWYWx1ZSA9IHByb2dyZXNzTWFwW2N1cnJlbnRNaWxlc3RvbmVTdHJpbmddID8gcHJvZ3Jlc3NNYXBbY3VycmVudE1pbGVzdG9uZVN0cmluZ10gOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1N0b3J5UHJvZ3Jlc3MoY3VycmVudFN0b3J5UHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzU3RyaW5nID0gY3VycmVudFN0b3J5UHJvZ3Jlc3NbMF0udG9Mb3dlckNhc2UoKSArIGN1cnJlbnRTdG9yeVByb2dyZXNzLnN1YnN0cmluZygxKTtcblxuICAgICAgICAgICAgY3VycmVudFByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc01hcFtjdXJyZW50UHJvZ3Jlc3NTdHJpbmddO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzc1swXS50b0xvd2VyQ2FzZSgpICsgcHJvZ3Jlc3Muc3Vic3RyaW5nKDEpO1xuXG4gICAgICAgIGxldCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NNYXBbcHJvZ3Jlc3NdO1xuICAgICAgICBsZXQgZXZhbHVhdGVQcm9ncmVzcyA9IGN1cnJlbnRQcm9ncmVzc1ZhbHVlID4gY3VycmVudE1pbGVzdG9uZVZhbHVlID8gY3VycmVudFByb2dyZXNzVmFsdWUgOiBjdXJyZW50TWlsZXN0b25lVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXNbaXNdKGV2YWx1YXRlUHJvZ3Jlc3MsIHByb2dyZXNzVmFsdWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGlzU3RvcnlQcm9ncmVzcyhwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzID09PSAnU3RhcnRlZCcgfHwgcHJvZ3Jlc3MgPT09ICdDb21wbGV0ZWQnIHx8IHByb2dyZXNzID09PSAnQ29udmVydGVkJztcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBpVlhpb0FjdGlvbnMgfSBmcm9tICcuL2FjdGlvbnMuanMnXHJcbmltcG9ydCB7IGlWWGlvUnVsZXMgfSBmcm9tICcuL3J1bGVzLmpzJ1xyXG5pbXBvcnQgeyBBY3Rpb25zIGFzIGlWWGpzQWN0aW9ucyB9IGZyb20gJy4uL2l2eC1qcy9hY3Rpb25zLmpzJ1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcclxuaW1wb3J0IElucHV0VmFsaWRhdG9yIGZyb20gXCIuL2lucHV0LXZhbGlkYXRvcnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzJztcclxuaW1wb3J0IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgZnJvbSBcIi4vY29tcG9uZW50cy9mYWN0b3J5LWZ1bmN0aW9uLWNyZWF0b3JcIjtcclxuaW1wb3J0IGlWWGlvQ29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4XCI7XHJcbmltcG9ydCBpVlhpb1NlcnZpY2VzIGZyb20gXCIuL3NlcnZpY2VzL2luZGV4XCI7XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKClcclxubGV0IG9iamVjdFBhcnNlciA9IG5ldyBPYmplY3RQYXJzZXJzKClcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYW4gaVZYaW8gZGF0YSBtb2R1bGUgdGhhdCBpVlhqcyBjYW4gdXNlIGZvciBcclxuICogbmF2aWdhdGlvbiwgZGF0YSBzZXR0aW5nIGFuZCBwcm9ncmVzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBpVlhpbyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1bGxzIGluIGFueSBtb2R1bGUgc2V0dGluZ3MgYW5kIHRoZSBnbG9iYWwgc2V0dGluZ3NcclxuICAgKiBmb3IgdGhpcyBpVlhqcyBleHBlcmllbmNlIHRvIHNldCB1cCB0aGlzIGlWWGlvIFxyXG4gICAqIGVuaGFuY2UgZGF0YSBvYmplY3QuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1vZHVsZVNldHRpbmdzIC0gc2V0dGluZ3MgdG8gYmUgcGFzc2VkIGluIHRvIHRoZSBcclxuICAgKiBpVlhpbyBFeHBlcmVpbmNlIGhvc3QuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGlWWGpzU2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgaVZYanMgZXhwZXJpZW5jZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihleHBlcmllbmNlSG9zdFNldHRpbmdzLCBpVlhqc1NldHRpbmdzID0ge30sIEJ1cywgaVZYanNMb2cpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vZHVsZSBzZXR0aW5ncyBmb3IgaVZYaW8gd2hpY2ggd2lsbCBiZSBhbGwgdGhlIHNldHRpbmdzXHJcbiAgICAgKiB1c2VkIHdpdGggdGhlIGlWWGlvJ3MgZXhwZXJpZW5jZSBob3N0IHN1Y2ggYXMgc3Rvcnkga2V5cyBhbmRcclxuICAgICAqIGZ1bm5lbHMuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXhwZXJpZW5jZUhvc3RTZXR0aW5ncyA9IGV4cGVyaWVuY2VIb3N0U2V0dGluZ3NcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBpVlhqcyBleHBlcmllbmNlIFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmlWWGpzU2V0dGluZ3MgPSBpVlhqc1NldHRpbmdzO1xyXG4gICAgdGhpcy5CdXMgPSBCdXM7XHJcbiAgICB0aGlzLmlWWGpzTG9nID0gaVZYanNMb2c7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyB0aGUgY3VycmVudCBzZXR0aW5ncyBhbmQgdGhlbiBlbmhhbmNlcyB0aGUgc3RvcnkgZGF0YSBcclxuICAgKiBwdWxsZWQgZnJvbSB0aGUgaVZYaW8gZXhwZXJpZW5jZSBob3N0IGFuZCBlbmhhbmNlcyB0aGVtIHRvIFxyXG4gICAqIHdvcmsgd2l0aCBpVlhqcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGEgcHJvbWlzZSB0aGF0IGV2YWx1YXRlcyB3aGV0aGVyIHRoaXMgZXhwZXJpZW5jZSBcclxuICAgKiB3YXMgc3VjY2Vzc2Z1bGx5IGVuaGFuY2VkLlxyXG4gICAqL1xyXG4gIGVuaGFuY2UoKSB7XHJcbiAgICBsZXQgeyBleHBlcmllbmNlSG9zdFNldHRpbmdzID0ge30sIGlWWGpzU2V0dGluZ3MgPSB7fSB9ID0gdGhpcztcclxuICAgIGxldCBpVlhpb0Vycm9ycyA9IG5ldyBpVlhpb0Vycm9yTmFtZXMoKTtcclxuICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgbGV0IGVuaGFuY2VtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBpVlggPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgc2VsZi5CdXMuZW1pdChpVlhpb0Vycm9ycy5QTEFURk9STV9VTkFWQUlMQUJMRSwge30pO1xyXG4gICAgICAgIH0sIDEwMClcclxuICAgICAgICByZWplY3QoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuQnVzLm9uY2UoaVZYaW9FcnJvcnMuRVhQRVJJRU5DRSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlWWChleHBlcmllbmNlSG9zdFNldHRpbmdzKVxyXG4gICAgICAgIC50aGVuKFxyXG4gICAgICAgIChpVlgpID0+IHtcclxuICAgICAgICAgIGlmICghaVZYIHx8ICFpVlguZXhwZXJpZW5jZSB8fCAhaVZYLmV4cGVyaWVuY2Uuc3RvcnkgfHwgIWlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNlbGYuQnVzLmVtaXQoaVZYaW9FcnJvcnMuUExBVEZPUk1fVU5BVkFJTEFCTEUsIHt9KTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGxldCB7IGV4cGVyaWVuY2U6IGV4cGVyaWVuY2VTZXR0aW5ncyA9IHt9LCBydWxlczogY3VzdG9tUnVsZXMgfSA9IGlWWGpzU2V0dGluZ3M7XHJcbiAgICAgICAgICBsZXQgZGVmYXVsdEFjdGlvbnMgPSBvYmplY3RQYXJzZXIubWVyZ2UobmV3IGlWWGpzQWN0aW9ucygpLCBleHBlcmllbmNlU2V0dGluZ3MpO1xyXG4gICAgICAgICAgbGV0IGV4cGVyaWVuY2UgPSBvYmplY3RQYXJzZXIubWVyZ2UoZGVmYXVsdEFjdGlvbnMsIGlWWC5leHBlcmllbmNlKTtcclxuICAgICAgICAgIGxldCBtb2RpZmllZEFjdGlvbnMgPSBuZXcgaVZYaW9BY3Rpb25zKGV4cGVyaWVuY2UsIHRoaXMuaVZYanNMb2cpO1xyXG4gICAgICAgICAgbGV0IHsgdWk6IHN0b3J5VUksIHZhbGlkYXRpb246IHN0b3J5VmFsaWRhdGlvbiB9ID0gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YTtcclxuXHJcbiAgICAgICAgICBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhID0gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YSA/IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEgOiB7fTtcclxuXHJcbiAgICAgICAgICBsZXQgcnVsZXMgPSBuZXcgaVZYaW9SdWxlcyhleHBlcmllbmNlLCBjdXN0b21SdWxlcykucnVsZXM7XHJcbiAgICAgICAgICBsZXQgc3RhdGVzID0gbmV3IElucHV0VmFsaWRhdG9yKGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEuc3RhdGVzLCBpVlguZXhwZXJpZW5jZS5zdG9yeS5pbnB1dHMsIHNlbGYsIHJlamVjdCwgZXhwZXJpZW5jZUhvc3RTZXR0aW5ncy5kZWJ1Zykuc3RhdGVzO1xyXG5cclxuICAgICAgICAgIGV4cGVyaWVuY2UuZGVidWdIb3N0ID0gZXhwZXJpZW5jZUhvc3RTZXR0aW5ncy5kZWJ1ZztcclxuXHJcbiAgICAgICAgICBleHBlcmllbmNlLndoaXRlTGlzdCA9IFtcclxuICAgICAgICAgICAgJ3NlbGYnLFxyXG4gICAgICAgICAgICAnaHR0cDovL2l2eC14YXBpLiouaW5mLWVudi5jb20vKionLFxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pdngteGFwaS4qLmluZi1lbnYuY29tLyoqJyxcclxuICAgICAgICAgICAgJ2h0dHBzOi8veGFwaS5pdnguaW8vKionXHJcbiAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgIGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEuc3RhdGVzID0gc3RhdGVzO1xyXG4gICAgICAgICAgaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YS50aXRsZSA9IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEudGl0bGUgPyBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhLnRpdGxlIDogXCJpVlggU3RvcnkgUGxheWVyXCI7XHJcblxyXG4gICAgICAgICAgbGV0IGVuaGFuY2VkaVZYanNTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgdWk6IGlWWGpzU2V0dGluZ3MudWksXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb246IGlWWGpzU2V0dGluZ3MudmFsaWRhdGlvbixcclxuICAgICAgICAgICAgY29uZmlnOiBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlOiBleHBlcmllbmNlLFxyXG4gICAgICAgICAgICBydWxlczogcnVsZXMsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IG1vZGlmaWVkQWN0aW9uc1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGVuaGFuY2VkaVZYanNTZXR0aW5ncyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHNlbGYuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVhQRVJJRU5DRSwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gZW5oYW5jZW1lbnRQcm9taXNlXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZWlWWElPO1xyXG5cclxuaWYgKGFuZ3VsYXIpIHtcclxuICBsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2l2eC1pbnB1dC12YWxpZGF0b3InLCBbXSk7XHJcblxyXG4gIGFwcC5jb25zdGFudCgndmFsaWRhdG9yJywgSW5wdXRWYWxpZGF0b3IpO1xyXG5cclxuICB0cnkge1xyXG4gICAgbGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdpdngtanMnKTtcclxuXHJcbiAgICBhcHAuY29uc3RhbnQoJ2lWWGpzLmRhdGEuaVZYaW8nLCBpbml0aWFsaXplaVZYSU8pO1xyXG4gICAgYXBwLmNvbnN0YW50KCd2YWxpZGF0b3InLCBJbnB1dFZhbGlkYXRvcik7XHJcblxyXG5cclxuICAgIG5ldyBpVlhpb0NvbXBvbmVudHMoYXBwLCB7IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgfSk7XHJcbiAgICBuZXcgaVZYaW9TZXJ2aWNlcyhhcHAsIHtmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUud2FybignVGhlIGlWWGlvIERhdGEgTW9kdWxlIGlzIG5vdCBhdHRhY2hlZCB0byB0aGUgaVZYanMgbW9kdWxlLiBJZiB0aGlzIGlzIGNvcnJlY3QsIGlnbm9yZSB0aGlzIHdhcm5pbmcuJylcclxuICAgIGNvbnNvbGUud2FybihlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVpVlhJTyhzZXR0aW5ncyA9IHt9KSB7XHJcbiAgc2V0dGluZ3MubW9kdWxlID0gaVZYaW87XHJcblxyXG4gIHJldHVybiBzZXR0aW5ncztcclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpe1xuICAgICAgICBsZXQge3N0b3J5SW5wdXREYXRhID0ge30sIGpzb25JbnB1dERhdGEgPXt9fSA9IHRoaXM7XG4gICAgICAgIGxldCByYXdJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgbGV0IG5ld1N0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgICAgICBcbiAgICAgICAgcmF3SW5wdXREYXRhLnR5cGUgPSBcImNhc2NhZGluZy1vcHRpb25zXCI7XG4gICAgICAgIHJhd0lucHV0RGF0YS5kYXRhVHJlZSA9IG5ld1N0b3J5SW5wdXREYXRhLmRhdGFUcmVlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJhd0lucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7YnV0dG9ucyA9IFtdfSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCBoYXNGYWxzZSA9IGZhbHNlO1xuICAgICAgICBsZXQgaGFzVHJ1ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbmV3QnV0dG9ucyA9IGJ1dHRvbnMucmVkdWNlKChidXR0b25BcnJheSwgYnV0dG9uRGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCB7dmFsdWV9ID0gYnV0dG9uRGF0YTtcbiAgICAgICAgICAgIGxldCBpc0ZhbHNlID0gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiAmJiAhdmFsdWU7XG4gICAgICAgICAgICBsZXQgaXNUcnVlID0gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiAmJiB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGlzVHJ1ZSAmJiAhaGFzVHJ1ZSkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbkFycmF5WzBdID0gYnV0dG9uRGF0YTtcbiAgICAgICAgICAgICAgICBoYXNUcnVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRmFsc2UgJiYgIWhhc0ZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQXJyYXlbMV0gPSBidXR0b25EYXRhO1xuICAgICAgICAgICAgICAgIGhhc0ZhbHNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbkFycmF5O1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgaWYgKCFoYXNUcnVlKSB7XG4gICAgICAgICAgICBuZXdCdXR0b25zWzBdID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRydWVcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzRmFsc2UpIHtcbiAgICAgICAgICAgIG5ld0J1dHRvbnNbMV0gPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZhbHNlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBqc29uSW5wdXREYXRhLmJ1dHRvbnMgPSBuZXdCdXR0b25zO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn1cbiIsImltcG9ydCBCdXR0b25zIGZyb20gXCIuL2NoZWNrYm94LmJ1dHRvbnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSl7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpe1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7dHlwZX0gPSBqc29uSW5wdXREYXRhO1xuXG4gICAgICAgICBpZih0eXBlID09PSBcImJ1dHRvbnNcIil7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbnMoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEpLmlucHV0O1xuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJjaGVja2JveFwiO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJlbWFpbFwiO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYaW9FcnJvck5hbWVzIGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy9pVlhpby5lcnJvcnMuanMnO1xuXG4vL1ZhbGlkYXRvcnMgXG5pbXBvcnQgQ2FzY2FkaW5nT3B0aW9ucyBmcm9tIFwiLi9jYXNjYWRpbmctb3B0aW9ucy5qc1wiXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vY2hlY2tib3guanNcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9lbWFpbC5qc1wiO1xuaW1wb3J0IE51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL29wdGlvbnMuanNcIjtcbmltcG9ydCBUZXh0QXJlYSBmcm9tIFwiLi90ZXh0YXJlYS5qc1wiO1xuaW1wb3J0IFRleHRMYXJnZSBmcm9tIFwiLi90ZXh0LWxhcmdlLmpzXCI7XG5pbXBvcnQgVGV4dE1lZGl1bSBmcm9tIFwiLi90ZXh0LW1lZGl1bS5qc1wiO1xuaW1wb3J0IFRleHRTaG9ydCBmcm9tIFwiLi90ZXh0LXNob3J0LmpzXCI7XG5pbXBvcnQgVXJsIGZyb20gXCIuL3VybC5qc1wiO1xuXG5jb25zdCBlcnJvck5hbWVzID0gbmV3IGlWWGlvRXJyb3JOYW1lcygpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZXMsIHN0b3J5SW5wdXRzLCBleHBlcmllbmNlLCByZWplY3QsIGRlYnVnID0gZmFsc2UsIGRlYnVnQ2FsbEJhY2sgPSAoKT0+e30pIHtcbiAgICAgICAgdGhpcy5yYXdTdGF0ZXMgPSBbXS5jb25jYXQoc3RhdGVzKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0cyA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXRzKTtcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcbiAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgICAgICAgdGhpcy5kZWJ1Z0NhbGxCYWNrID0gZGVidWdDYWxsQmFjaztcbiAgICB9XG5cbiAgICBnZXQgc3RhdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUlucHV0U3RhdGVzKHRoaXMucmF3U3RhdGVzKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRWYWxpZGF0b3JzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgQ2FzY2FkaW5nT3B0aW9ucyxcbiAgICAgICAgICAgIENoZWNrYm94LFxuICAgICAgICAgICAgRW1haWwsXG4gICAgICAgICAgICBOdW1iZXIsXG4gICAgICAgICAgICBPcHRpb25zLFxuICAgICAgICAgICAgVGV4dEFyZWEsXG4gICAgICAgICAgICBUZXh0TGFyZ2UsXG4gICAgICAgICAgICBUZXh0TWVkaXVtLFxuICAgICAgICAgICAgVGV4dFNob3J0LFxuICAgICAgICAgICAgVXJsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUlucHV0U3RhdGVzKHN0YXRlcykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzdGF0ZXMubWFwKChzdGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgeyBpbnB1dHMgPSBbXSB9ID0gc3RhdGU7XG5cbiAgICAgICAgICAgICAgICBzdGF0ZS5pbnB1dHMgPSBzZWxmLnZhbGlkYXRlSW5wdXRzKGlucHV0cywgc3RhdGUsIGluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZWNvbW1lbmRlZFNldHRpbmdzKGlucHV0KSB7XG4gICAgICAgIGxldCByZWNvbW1lbmRlZE9iamVjdCA9IHRoaXMuY3JlYXRlUmVjb21tZW5kT2JqZWN0KGlucHV0KTtcbiAgICAgICAgbGV0IHsgdHlwZXMsIG9wdGlvbnMsIGF0dHJpYnV0ZXMgfSA9IGlucHV0O1xuICAgICAgICBsZXQgbWVzc2FnZSA9IGBUbyBzdXBwb3J0IHRoaXMgaW5wdXQsIGl0IGlzIHJlY29tbWVuZCB0byBjcmVhdGUgYW4gaW5wdXQgb24gdGhlIHBsYXRmb3JtIHVzaW5nIHRoZXNlIHNldHRpbmdzOiBcbiR7dGhpcy5jcmVhdGVSZWNvbW1lbmRlZFJlYWRvdXQocmVjb21tZW5kZWRPYmplY3QpfVxuICAgICAgICBgO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgc2V0dGluZ3M6IHJlY29tbWVuZGVkT2JqZWN0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVSZWNvbW1lbmRlZFJlYWRvdXQocmVjb21tZW5kZWRPYmplY3QpIHtcbiAgICAgICAgbGV0IHsga2V5LCBvcHRpb25zLCB0eXBlcywgYXR0cmlidXRlcyB9ID0gcmVjb21tZW5kZWRPYmplY3Q7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlYWRvdXQgPSBgSW5wdXQgS2V5OiAke2tleX1gO1xuICAgICAgICBsZXQgdHlwZXNSZWFkb3V0ID0gYFxcblJlY29tbWVuZGVkIElucHV0IFR5cGUke3R5cGVzLmxlbmd0aCA+IDEgPyBcInNcIiA6IFwiXCJ9OiAke3R5cGVzLmpvaW4oJywgJyl9YDtcbiAgICAgICAgbGV0IG9wdGlvblJlYWRvdXQgPSBvcHRpb25zLnJlZHVjZSgoY3VycmVudE9wdGlvblJlYWRvdXQsIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRPcHRpb25SZWFkb3V0fVxcbiR7c2VsZi5jcmVhdGVPYmplY3RSZWFkT3V0KG9wdGlvbiwgW10sICdcXG4nKX1gXG4gICAgICAgIH0sICcnKTtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZVJlYWRvdXQgPSB0aGlzLmNyZWF0ZU9iamVjdFJlYWRPdXQoYXR0cmlidXRlcywgW1wid2lkdGhcIiwgXCJwbGFjZWhvbGRlclwiXSwgJ1xcbicpO1xuXG4gICAgICAgIHJldHVybiBgJHtyZWFkb3V0fSR7dHlwZXNSZWFkb3V0fSR7b3B0aW9ucy5sZW5ndGggPiAwID8gXCJcXG5PcHRpb25zOlwiICsgb3B0aW9uUmVhZG91dCA6IFwiXCJ9JHthdHRyaWJ1dGVSZWFkb3V0Lmxlbmd0aCA+IDAgPyBcIlxcbkF0dHJpYnV0ZXM6XFxuXCIgKyBhdHRyaWJ1dGVSZWFkb3V0IDogXCJcIn1gO1xuICAgIH1cblxuICAgIGNyZWF0ZU9iamVjdFJlYWRPdXQob2JqID0ge30sIGlnbm9yZSA9IFtdLCBzZXBlcmF0b3IgPSBcIlwiKSB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKHJlYWRvdXQsIGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpZ25vcmUuaW5kZXhPZihrZXkpID49IDApIHJldHVybiByZWFkb3V0O1xuXG4gICAgICAgICAgICByZXR1cm4gYCR7cmVhZG91dH0ke2tleX0gOiAke29ialtrZXldfSR7aW5kZXggPCBrZXlzLmxlbmd0aCAtIDEgPyBzZXBlcmF0b3IgOiBcIlwifWBcbiAgICAgICAgfSwgJycpXG4gICAgfVxuXG4gICAgY3JlYXRlUmVjb21tZW5kT2JqZWN0KGlucHV0KSB7XG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMgfSA9IGlucHV0O1xuICAgICAgICBsZXQgdHlwZXMgPSB0aGlzLmdldFJlY29tbWVuZGVkSW5wdXRUeXBlcyhpbnB1dC50eXBlKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoaW5wdXQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGlucHV0Lm5hbWUsXG4gICAgICAgICAgICB0eXBlcyxcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldE9wdGlvbnMoaW5wdXQpIHtcbiAgICAgICAgbGV0IHsgdHlwZSB9ID0gaW5wdXQ7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3B0aW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0Lm9wdGlvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LmJ1dHRvbnMubWFwKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYnV0dG9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJObyBEaXNwbGF5IFJlY29tbWVuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInJhZGlvXCI6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQucmFkaW9CdXR0b25zLm1hcChyYWRpb0J1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmFkaW9CdXR0b24udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIk5vIERpc3BsYXkgUmVjb21tZW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBnZXRSZWNvbW1lbmRlZElucHV0VHlwZXModHlwZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGV4dDogW1wiVGV4dFNob3J0XCIsIFwiVGV4dE1lZGl1bVwiLCBcIlRleHRMYXJnZVwiXSxcbiAgICAgICAgICAgIHRleHRhcmVhOiBbXCJUZXh0QXJlYVwiXSxcbiAgICAgICAgICAgIGVtYWlsOiBbXCJFbWFpbFwiXSxcbiAgICAgICAgICAgIGNoZWNrYm94OiBbXCJDaGVja2JveFwiXSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcIk9wdGlvbnNcIl0sXG4gICAgICAgICAgICBvcHRpb25zOiBbXCJPcHRpb25zXCJdLFxuICAgICAgICAgICAgcmFkaW86IFtcIk9wdGlvbnNcIl0sXG4gICAgICAgICAgICBudW1iZXI6IFtcIk51bWJlclwiXSxcbiAgICAgICAgICAgIHVybDogW1wiVXJsXCJdLFxuICAgICAgICAgICAgZGF0ZTogW1wiVGV4dFNob3J0XCIsIFwiVGV4dE1lZGl1bVwiLCBcIlRleHRMYXJnZVwiLCBcIkRhdGVcIl1cbiAgICAgICAgfVt0eXBlXTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUlucHV0cyhpbnB1dHMgPSBbXSwgc3RhdGUgPSB7fSwgc3RhdGVJbmRleCkge1xuICAgICAgICBsZXQgeyBpbnB1dFZhbGlkYXRvcnMsIHN0b3J5SW5wdXRzID0ge30sIGV4cGVyaWVuY2UsIGRlYnVnLCBkZWJ1Z0NhbGxCYWNrIH0gPSB0aGlzO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGlucHV0cy5tYXAoKGlucHV0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgbmFtZSB9ID0gaW5wdXQ7XG4gICAgICAgICAgICBsZXQgc3RvcnlJbnB1dCA9IHN0b3J5SW5wdXRzW25hbWVdO1xuXG4gICAgICAgICAgICBpZiAoIXN0b3J5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgeyBuYW1lOiBzdGF0ZU5hbWUsIGlkIH0gPSBzdGF0ZTtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gYFxuaVZYLmlvIFN0b3J5IGlucHV0IHdpdGgga2V5ICR7bmFtZX0gY2FuIG5vdCBiZSBmb3VuZDpcblN0YXRlIElkIDogJHtzdGF0ZS5pZH1cblN0YXRlIE5hbWUgOiAke3N0YXRlTmFtZX1cblN0YXRlIEluZGV4IDogJHtzdGF0ZUluZGV4fVxuSW5wdXQgTmFtZTogJHtuYW1lfVxuSW5wdXQgSW5kZXg6ICR7aW5kZXh9XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIGxldCByZWNvbW1lbmQgPSB0aGlzLmNyZWF0ZVJlY29tbWVuZGVkU2V0dGluZ3MoaW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4cGVyaWVuY2UuQnVzICYmICFkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBleHBlcmllbmNlLkJ1cy5lbWl0KGVycm9yTmFtZXMuRVhQRVJJRU5DRSwgeyBtZXNzYWdlOiBlcnJvck1lc3NhZ2UgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV4cGVyaWVuY2UuaVZYanNMb2cgJiYgIWRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVyaWVuY2UuaVZYanNMb2cuZXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIH0sIFwiRVhQRVJJRU5DRVwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZXhwZXJpZW5jZS5pVlhqc0xvZyAmJiBkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBleHBlcmllbmNlLmlWWGpzTG9nLndhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmICghZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0TmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IHN0YXRlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUluZGV4OiBzdGF0ZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0SW5kZXg6IGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZGVidWcgJiYgZGVidWdDYWxsQmFjayl7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnQ2FsbEJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0TmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IHN0YXRlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUluZGV4OiBzdGF0ZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0SW5kZXg6IGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvbW1lbmRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgeyBkaXNwbGF5IH0gPSBzdG9yeUlucHV0O1xuICAgICAgICAgICAgICAgIGxldCB2YWxpZGF0b3IgPSBpbnB1dFZhbGlkYXRvcnNbZGlzcGxheV07XG4gICAgICAgICAgICAgICAgbGV0IG5ld0lucHV0ID0gc2VsZi5nbG9iYWxBdHRyaWJ1dGVzU2V0KHN0b3J5SW5wdXQsIGlucHV0KTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2YWxpZGF0b3IobmV3SW5wdXQsIHN0b3J5SW5wdXQpLmlucHV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdsb2JhbEF0dHJpYnV0ZXNTZXQoc3RvcnlJbnB1dERhdGEsIGpzb25JbnB1dERhdGEpIHtcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlczogc3RvcnlBdHRyaWJ1dGVzID0ge30gfSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQgeyByZXF1aXJlZDogc3RvcnlSZXF1aXJlZCA9IFwiZmFsc2VcIiB9ID0gc3RvcnlBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQgbmV3SW5wdXQgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlczogaW5wdXRBdHRyaWJ1dGVzID0ge30gfSA9IG5ld0lucHV0O1xuICAgICAgICBsZXQgeyByZXF1aXJlZDogaW5wdXRSZXF1aXJlZCA9IGZhbHNlIH0gPSBpbnB1dEF0dHJpYnV0ZXM7XG5cbiAgICAgICAgbmV3SW5wdXQuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIGlucHV0QXR0cmlidXRlcywge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHN0b3J5UmVxdWlyZWQgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGlucHV0UmVxdWlyZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0O1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhO1xuICAgICAgICBsZXQge21heDogc3RvcnlNYXhBdHRyaWJ1dGUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgbWluOiBzdG9yeU1pbkF0dHJpYnV0ZSA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCBzdGVwOiBzdG9yeVN0ZXBBdHRyaWJ1dGUgPSAxfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heDoganNvbk1heEF0dHJpYnV0ZSA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCBtaW46IGpzb25NaW5BdHRyaWJ1dGUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgc3RlcDoganNvblN0ZXBBdHRyaWJ1dGUgPSAxfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB1c2VTdG9yeU1pbiA9IGpzb25NaW5BdHRyaWJ1dGUgPiBzdG9yeU1pbkF0dHJpYnV0ZTtcbiAgICAgICAgbGV0IHVzZVN0b3J5TWF4ID0ganNvbk1heEF0dHJpYnV0ZSA8IHN0b3J5TWF4QXR0cmlidXRlO1xuICAgICAgICBsZXQgdXNlU3RvcnlTdGVwID0gdHlwZW9mIHN0b3J5U3RlcEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJudW1iZXJcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgIG1pbiA6IG5ldyBOdW1iZXIodXNlU3RvcnlNaW4/IHN0b3J5TWluQXR0cmlidXRlIDoganNvbk1pbkF0dHJpYnV0ZSkudmFsdWVPZigpLCBcbiAgICAgICAgICAgbWF4IDogbmV3IE51bWJlcih1c2VTdG9yeU1heCA/IHN0b3J5TWF4QXR0cmlidXRlIDoganNvbk1heEF0dHJpYnV0ZSkudmFsdWVPZigpLCBcbiAgICAgICAgICAgc3RlcCA6IG5ldyBOdW1iZXIodXNlU3RvcnlTdGVwID8gc3RvcnlTdGVwQXR0cmlidXRlIDoganNvblN0ZXBBdHRyaWJ1dGUpLnZhbHVlT2YoKSwgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBzdG9yeUlucHV0RGF0YTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9fSA9IHRoaXM7XG4gICAgICAgIGxldCB7YnV0dG9ucyA9IFtdfSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCB7b3B0aW9ucyA9IFtdfSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQgbmV3QnV0dG9ucyA9IG9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gaGFzQnV0dG9uKG9wdGlvbiwgYnV0dG9ucyk7XG5cbiAgICAgICAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnV0dG9uXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB7ZGlzcGxheSwgdmFsdWV9ID0gb3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkaXNwbGF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbmV3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLCB7XG4gICAgICAgICAgICBidXR0b25zOiBuZXdCdXR0b25zLFxuICAgICAgICAgICAgdHlwZSA6IFwiYnV0dG9uc1wiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdJbnB1dERhdGE7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFzQnV0dG9uKG9wdGlvbiwgYnV0dG9ucyA9IFtdKSB7XG4gICAgICAgICAgICByZXR1cm4gYnV0dG9ucy5maW5kKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbi52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxufSIsImltcG9ydCBCdXR0b25zIGZyb20gXCIuL29wdGlvbnMuYnV0dG9ucy5qc1wiO1xuaW1wb3J0IFJhZGlvIGZyb20gXCIuL29wdGlvbnMucmFkaW8uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCB7dHlwZX0gPSBqc29uSW5wdXREYXRhO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImJ1dHRvbnNcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25zKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhKS5pbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFkaW8oanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEpLmlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHtvcHRpb25zfSA9IHN0b3J5SW5wdXREYXRhO1xuXG4gICAgICAgIGxldCBuZXdJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwib3B0aW9uc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEgPSB7fSwgc3RvcnlJbnB1dERhdGEgPSB7fX0gPSB0aGlzO1xuICAgICAgICBsZXQge3JhZGlvQnV0dG9ucyA9IFtdfSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCB7b3B0aW9ucyA9IFtdfSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQgbmV3UmFkaW9CdXR0b25zID0gb3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGxldCB7ZGlzcGxheSwgdmFsdWV9ID0gb3B0aW9uO1xuICAgICAgICAgICAgbGV0IHJhZGlvID0gaGFzUmFkaW8ob3B0aW9uLCByYWRpb0J1dHRvbnMpO1xuXG4gICAgICAgICAgICBpZiAocmFkaW8pIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UmFkaW8gPSBPYmplY3QuYXNzaWduKHt9LCByYWRpbyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UmFkaW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkaXNwbGF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbmV3SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEsIHtcbiAgICAgICAgICAgICAgICByYWRpb0J1dHRvbnM6IG5ld1JhZGlvQnV0dG9ucyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJhZGlvXCJcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0RGF0YTtcblxuICAgICAgICBmdW5jdGlvbiBoYXNSYWRpbyhvcHRpb24sIHJhZGlvQnV0dG9ucyA9IFtdKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFkaW9CdXR0b25zLmZpbmQocmFkaW9CdXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYWRpb0J1dHRvbi52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQgbWF4Q2hhcmFjdGVycyA9IDI1NjtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSAxMjg7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gNjRcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSAxMDI0O1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7ICBcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUgPSAwfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IG5ldyBOdW1iZXIoc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPCBtYXhDaGFyYWN0ZXJzID8gc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgOiAganNvbk1heExlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpLFxuICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogbmV3IE51bWJlcih0eXBlb2Ygc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKXtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ1cmxcIjtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiaW1wb3J0IEV2YWx1YXRvciBmcm9tICcuL2V2YWx1YXRvci5qcyc7XHJcbmltcG9ydCB7UnVsZXN9IGZyb20gXCIuLi9pdngtanMvcnVsZXMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYW4gaVZYaW8gUnVsZXMgZnVuY3Rpb24gdGhhdCBhbGxvd3MgbmF2aWdhdGlvbiBhbmQgXHJcbiAqIHJ1bGUgZXZhbHVhdGlvbiBiYXNlZCBvbiBib3RoIGV4cGVyaWVuY2UgZGF0YSBhbmQgcHJvZ3Jlc3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgaVZYaW9SdWxlcyBleHRlbmRzIFJ1bGVzIHtcclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgdGhlIGN1cnJlbnQgZXhwZXJpZW5jZSB0byB0aGlzIGNsYXNzIHRvIGhlbHBcclxuICAgICAqIHByb2Nlc3MgYm90aCBkYXRhIGFuZCBwcm9ncmVzcyBpbmZvcm1haXRvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtpVlhpb0V4cGVyaWVjZX0gZXhwZXJpZW5jZSAtIGlWWGlvIEV4cGVyaWVuY2Ugb2JqZWN0XHJcbiAgICAgKiBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb24gZm9yIHRoZXNlIHJ1bGVzIHRvIGV2YWx1YXRlIG9uLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpIHtcclxuICAgICAgICBzdXBlcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdG9yID0gbmV3IEV2YWx1YXRvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG5cblxuICAgIH1cblxuICAgIHNldFNjb3BlRXhwZXJpZW5jZShleHBlcmllbmNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR09UIFRPIElWWElPIFNFUlZJQ0VcIilcbiAgICB9XG59XG5cblNlcnZpY2UuJGluamVjdCA9IFsnaVZYanMnXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4RXhwZXJpZW5jZVNjb3BlJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihTZXJ2aWNlKSk7XG4gICAgfVxufSIsImltcG9ydCBFeHBlcmllbmNlU2NvcGUgZnJvbSBcIi4vZXhwZXJpZW5jZS1zY29wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIC8vIG5ldyBFeHBlcmllbmNlU2NvcGUoYXBwLCBvcHRzKTtcbiAgICB9XG59IiwiaW1wb3J0IEF1ZGlvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qc1wiO1xyXG5pbXBvcnQgU3RhdGVFdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvc3RhdGUuZXZlbnRzLmpzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW5kIHJ1bnMgYWxsIGFjdGlvbnMgZm9yIHRoaXMgZXhwZXJpZW5jZS4gQW4gYWN0aW9uXHJcbiAqIGlzIGFueSBwcm9jZXNzIHRoYXQgbmVlZHMgdG8gcmV0dXJuIGEgcHJvbWlzZSBpbmRpY2F0aW5nIHRoYXQgXHJcbiAqIGl0IGZpbmlzaGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdGlvbnMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGRlZmF1bHQgZGF0YSBvYmplY3QgdG8gYmUgdXNlZCBieSB2YXJpb3VzXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIGVtcHR5IGRhdGEgb2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHNldCBhbmQgXHJcbiAgICAgICAgICogcmVjb3JkIGRhdGEgdXNpbmcgdGhpcyBzZXREYXRhIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5hdWRpb0V2ZW50TmFtZXMgPSBuZXcgQXVkaW9FdmVudE5hbWVzKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUV2ZW50TmFtZXMgPSBuZXcgU3RhdGVFdmVudE5hbWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGNsYXNzZXMgb24gYW4gZWxlbWVudCB0aGF0IHdpbGwgY2F1c2UgdGhlIGVsZW1lbnQgdG8gYW5pbWF0ZS5cclxuICAgICAqIEBwYXJhbSB7SFRNTE5vZGV9IGVsZW1lbnQgLSBlbGVtZW50IGZvciB0aGUgY2xhc3MgdG8gYmUgc2V0XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRPYmogLSBhbmltYXRpb24gZXZlbnQgZGF0YS5cclxuICAgICAqIEByZXR1cm4ge0hUTUxOb2RlfSB0aGUgZWxlbWVudCB3aXRoIHRoZSBjbGFzc2VzIHJlcGxhY2VkLiAgXHJcbiAgICAgKi9cclxuICAgIHNldEVsZW1lbnRDbGFzc2VzKGVsZW1lbnQsIGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHsgYW5pbWF0aW9uQ2xhc3NlcyA9IFwiXCIgfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCB7IGFuaW1hdGlvbkNsYXNzOiBvbGRBbmltYXRpb25DbGFzcyB9ID0gZWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoYW5pbWF0aW9uQ2xhc3NlcykgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignaGlkZScpID49IDApIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKCdoaWRlJywgYW5pbWF0aW9uQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbGRBbmltYXRpb25DbGFzcykge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2Uob2xkQW5pbWF0aW9uQ2xhc3MsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYW5pbWF0aW9uQ2xhc3MgPSBhbmltYXRpb25DbGFzc2VzO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gYCR7ZWxlbWVudC5jbGFzc05hbWV9ICR7YW5pbWF0aW9uQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBnb1RvTmV4dFN0YXRlKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHsgbmV4dDogbmF2QXJyYXkgfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0gdGhpcy5ydWxlcyhuYXZBcnJheSk7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KHNlbGYuc3RhdGVFdmVudE5hbWVzLkdPLCB7IHN0YXRlSWQ6IG5leHRTdGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgYW5pbWF0ZUVsZW1lbnQoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQgeyBlbGVtZW50IH0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoIWFuaW1hdGlvbkVsZW1lbnRzIHx8IGFuaW1hdGlvbkVsZW1lbnRzLmxlbmd0aCA8PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbShhbmltYXRpb25FbGVtZW50cyk7XHJcblxyXG4gICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLmZvckVhY2goKGFuaW1hdGlvbkVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQgPSB0aGlzLnNldEVsZW1lbnRDbGFzc2VzKGFuaW1hdGlvbkVsZW1lbnQsIGV2ZW50T2JqKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgYW5pbWF0ZUVsZW1lbnRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uRW5kcyA9IFtcclxuICAgICAgICAgICAgICAgICd3ZWJraXRBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgJ21vekFuaW1hdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAnTVNBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgJ29zYW5pbWF0aW9uZW5kJyxcclxuICAgICAgICAgICAgICAgICdhbmltYXRpb25lbmQnXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBhbmltYXRpb25FbmRzLmZvckVhY2goKGFuaW1hdGlvbkVuZE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLmZvckVhY2goKGFuaW1hdGlvbkVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZE5hbWUsIGVuZEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmRBbmltYXRpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLmZvckVhY2goKGFuaW1hdGlvbkVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kcy5mb3JFYWNoKChhbmltYXRpb25FbmROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQuYW5pbWF0aW9uQ2xhc3MgPSBldmVudE9iai5hbmltYXRpb25DbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uRW5kTmFtZSwgZW5kQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhbmltYXRlRWxlbWVudFByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub1N0YXRlKGV2ZW50T2JqLCBpVlhqc0J1cykge1xyXG4gICAgICAgIGxldCB7IHN0YXRlIH0gPSBldmVudE9iajtcclxuXHJcbiAgICAgICAgaWYgKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgICAgIGlWWGpzQnVzLmVtaXQodGhpcy5zdGF0ZUV2ZW50TmFtZXMuR08sIGV2ZW50T2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUF1ZGlvQ2xpcChldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IGF1ZGlvRXZlbnROYW1lcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChldmVudE9iaikge1xyXG4gICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KGF1ZGlvRXZlbnROYW1lcy5TRVRfVVAsIGV2ZW50T2JqKTtcclxuICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChhdWRpb0V2ZW50TmFtZXMuUExBWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkJ1cy5vbihhdWRpb0V2ZW50TmFtZXMuVElNRV9VUERBVEUsIChjdXJyZW50QXVkaW8pID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBdWRpby5pZCA9PT0gZXZlbnRPYmouaWQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRBdWRpby5ydW5DdWVQb2ludHMoc2VsZi5wcm9jZXNzb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhdWRpb0NsaXBQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLkJ1cy5vbmNlKGF1ZGlvRXZlbnROYW1lcy5FTkRFRCwgKGN1cnJlbnRBdWRpbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBdWRpby5pZCA9PT0gZXZlbnRPYmouaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnByb2Nlc3Nvci5yZXNvbHZlQWN0aW9ucyhldmVudE9iai5vbkVuZCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYXVkaW9DbGlwUHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHsga2V5LCB2YWx1ZSB9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZXREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhW2tleV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTG9nLmRlYnVnKGBDdXJyZW50IEV4cGVyaWVuY2UgRGF0YWAsIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IE9iamVjdC5rZXlzKHNlbGYuZGF0YSkubWFwKChkYXRhS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2RhdGFLZXl9OiR7c2VsZi5kYXRhW2RhdGFLZXldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHNlbGYuZGF0YVtkYXRhS2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sIHNlbGYuZGF0YSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc2VsZik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHNldERhdGFQcm9taXNlO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7IFR5cGVWYWxpZGF0b3IsIE9iamVjdFBhcnNlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcil7XHJcbiAgICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgIHRoaXMuY3VzdG9tRXZhbHVhdG9yID0gY3VzdG9tRXZhbHVhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGV2YWx1YXRlKHJ1bGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge2NvbmRpdGlvbk9wZXJhdG9yID0gXCJhbmRcIiwgY29uZGl0aW9uc30gPSBydWxlO1xyXG4gICAgICAgIGxldCBldmFsdWF0ZUNvbmRpdGlvbnMgPSBjb25kaXRpb25zLm1hcCgoY29uZGl0aW9uLCBpbmRleCkgPT57XHJcbiAgICAgICAgICAgIGxldCB7a2V5IDogbGhzLCBpcywgdmFsdWUgOiByaHMsIHR5cGUgPSBcImlucHV0XCJ9ID0gY29uZGl0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5jdXN0b21FdmFsdWF0b3IgJiYgdHlwZVZhbGlkYXRvci5pc0Z1bmN0aW9uKHNlbGYuY3VzdG9tRXZhbHVhdG9yKSAmJiBzZWxmLmN1c3RvbUV2YWx1YXRvcihjb25kaXRpb24pKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmN1c3RvbUV2YWx1YXRvcihjb25kaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTaW5jZSBvbGRlciB2ZXJzaW9ucyBvZiB0aGUgaVZYanMgSlNPTiB1c2VkIFxyXG4gICAgICAgICAgICAvLyB0aGUga2V5IGZvciBcImtleXdvcmRcIiB0aGlzIHdpbGwgbWFrZSBpdCBiYWNrd2FyZHNcclxuICAgICAgICAgICAgLy8gY29tcGF0YWJsZVxyXG4gICAgICAgICAgICBpZihzZWxmW2xoc10pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbbGhzXShsaHMsIGlzLCByaHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZlt0eXBlXShsaHMsIGlzLCByaHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1tjb25kaXRpb25PcGVyYXRvcl0oZXZhbHVhdGVDb25kaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dChsaHMsIGlzLCByaHMpe1xyXG4gICAgICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBsaHNWYWx1ZSA9IGV4cGVyaWVuY2UuZGF0YVtsaHNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1tpc10obGhzVmFsdWUsIHJocyk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5kKHByZWRpY2F0ZXMgPSBbXSl7XHJcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXMucmVkdWNlKChldmFsdWF0ZSwgcHJlZGljYXRlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRlICYmIHByZWRpY2F0ZTtcclxuICAgICAgICB9LHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9yKHByZWRpY2F0ZXMgPSBbXSl7XHJcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXMucmVkdWNlKChldmFsdWF0ZSwgcHJlZGljYXRlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRlIHx8IHByZWRpY2F0ZTtcclxuICAgICAgICB9LGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBub3QocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgJiYgIXByZWRpY2F0ZTtcclxuICAgICAgICB9LHRydWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsdGUobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPD0gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsdChsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA8IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBndGUobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPj0gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBndChsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA+IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXF1YWxzKGxocywgcmhzKXtcclxuICAgICAgICByZXR1cm4gbGhzID09PSByaHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5vdEVxdWFscyhsaHMscmhzKXtcclxuICAgICAgICByZXR1cm4gbGhzICE9PSByaHM7XHJcbiAgICB9XHJcblxyXG4gICAgaW4obGhzLHJocyl7XHJcbiAgICAgICAgcmV0dXJuIHJocy5pbmRleE9mKGxocykgPj0gMDtcclxuICAgIH0gICAgICAgIFxyXG59IiwiaW1wb3J0IEV2YWx1YXRvciBmcm9tICcuL2V2YWx1YXRvci5qcyc7XHJcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IsIE9iamVjdFBhcnNlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogQSBkZWZhdWx0IHJ1bGUgc3lzdGVtIGluIHdoaWNoIGlWWGpzIGNob29zZXMgd2hpY2ggc3RhdGUgXHJcbiAqIHRvIGdvIHRvIGJhc2VkIG9mIHRoZSBjdXJyZW50IGlWWGpzIEV4cGVyaWVuY2UgZGF0YS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlcyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBleHBlcmllbmNlIGluIHdoaWNoIHRoaXMgZGF0YSBcclxuICAgICAqIHdpbGwgYmUgZXZhbHVhdGVkIHRvLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXhwZXJpZW5jZSAtIGlWWGpzRXhwZXJpZW5jZSBcclxuICAgICAqIG9iamVjdCBpbiB3aGljaCBkYXRhIHdpbGwgYmUgdXNlZCB0byBldmFsdWF0ZSB2YXJpb3VzIHJ1bGVzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlID0geyBkYXRhOiB7fSB9LCBjdXN0b21FdmFsdWF0b3IpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3VycmVudCBpVlhqcyBFeHBlcmVpbmNlIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRvciA9IG5ldyBFdmFsdWF0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkZWZhdWx0IHJ1bGVzIGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGFuIFxyXG4gICAgICogYXJyYXkgb2YgbmF2aWdhdGlvbiBvYmplY3RzIGFuZCBldmFsdWF0ZSB0aGVtIHVzaW5nIFxyXG4gICAgICogdGhlIHByb2Nlc3NSdWxlcyBmdW5jdGlvbi5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBnZXQgcnVsZXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gKG5hdkFycmF5ID0gW10pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYucHJvY2Vzc1J1bGVzKG5hdkFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhyb3VnaCBhbmQgcmV0dXJucyB0aGUgZmlyc3QgbmF2IG9iamVjdCB3aG9zZSBcclxuICAgICAqIHJ1bGUgaXMgZXZhbHVhdGVkIHRvIHRydWUgb3IgcnVsZXMgYXJlIGVtcHR5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBuYXZBcnJheSAtIEFuIGFycmF5IG9mIG5hdmlnYXRpb24gb2JqZWN0cyBcclxuICAgICAqIHdpdGggcnVsZXMgYW5kIHN0YXRlcyB0byBiZSBldmFsdWF0ZWQuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHN0YXRlSWQgb2YgdGhlIHJ1bGUgdGhhdCB3YXMgZXZhbHVhdGVkIFxyXG4gICAgICogdHJ1ZSBmaXJzdC4gSWYgbm8gc3RhdGUgaXMgcmV0dXJuLCByZXR1cm5zIGFuIGVtcHR5IHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgcHJvY2Vzc1J1bGVzKG5hdkFycmF5ID0gW10pIHtcclxuXHJcbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkobmF2QXJyYXkpKXtcclxuICAgICAgICAgICAgbmF2QXJyYXkgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzdGF0ZVNlbGVjdCA9IG5hdkFycmF5LmZpbmQoKG5hdk9iaikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3J1bGV9ID0gbmF2T2JqO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZVZhbGlkYXRvci5pc0VtcHR5KHJ1bGUpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB7Y29uZGl0aW9ucywgY29uZGl0aW9uT3BlcmF0b3IgPSBcImFuZFwifSA9IHJ1bGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbmRpdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHJ1bGUuY29uZGl0aW9uT3BlcmF0b3IgPSBjb25kaXRpb25PcGVyYXRvcjtcclxuICAgICAgICAgICAgICAgIHJ1bGUuY29uZGl0aW9ucyA9IFtydWxlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZXZhbHVhdG9yLmV2YWx1YXRlKHJ1bGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGVTZWxlY3QgPyBzdGF0ZVNlbGVjdC5zdGF0ZUlkIDogJyc7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGxvZykge1xuXHRcdHRoaXMubG9nID0gbG9nXG5cdH1cblxuXHRhc3NlcnQodGVzdCwgbmFtZSwgbWVzc2FnZSkge1xuXHRcdGxldCB7bG9nfSA9IHRoaXM7XG5cdFx0bGV0IHtzaG93OiBkZWJ1Z30gPSBsb2c7XG5cblx0XHRpZiAoIXRlc3QpIHtcblx0XHRcdGxldCBlcnJvck9iaiA9IHsgXG5cdFx0XHRcdG1lc3NhZ2UgOiBgJHtuYW1lfSBpcyBpbnZhbGlkOiAke21lc3NhZ2V9LmBcblx0XHRcdH07XG5cblx0XHRcdGlmKGRlYnVnKXtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoZXJyb3JPYmosIFwiQVNTRVJUXCIpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3JPYmoubWVzc2FnZSk7XG5cdFx0XHR9IFxuXHRcdH1cblxuXHRcdHJldHVybiB0ZXN0O1xuXHR9XG59IiwiaW1wb3J0IExvZ2dpbmdNZXNzYWdlcyBmcm9tICAnLi4vY29uc3RhbnRzL2xvZ2dpbmcuanMnO1xuaW1wb3J0IEVycm9yTWVzc2FnZXMgZnJvbSAnLi4vY29uc3RhbnRzL2Vycm9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzaG93LCBCdXMpIHtcbiAgICAgICAgdGhpcy5zaG93ID0gc2hvdztcbiAgICAgICAgdGhpcy5Mb2dnaW5nTWVzc2FnZXMgPSBuZXcgTG9nZ2luZ01lc3NhZ2VzKCk7XG4gICAgICAgIHRoaXMuRXJyb3JNZXNzYWdlcyA9IG5ldyBFcnJvck1lc3NhZ2VzKCk7XG4gICAgICAgIHRoaXMuQnVzID0gQnVzO1xuICAgIH1cblxuICAgIHdhcm4obWVzc2FnZSkge1xuICAgICAgICBsZXQge3Nob3csIExvZ2dpbmdNZXNzYWdlcywgQnVzfSA9IHRoaXM7XG4gICAgICAgIGxldCB3YXJuTWVzc2FnZSA9IExvZ2dpbmdNZXNzYWdlcy5XQVJOO1xuICAgICAgICBsZXQgd2FyblBheWxvYWQgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke3dhcm5NZXNzYWdlfTogJHttZXNzYWdlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgQnVzLmVtaXQod2Fybk1lc3NhZ2UsIHdhcm5QYXlsb2FkKTtcbiAgICB9XG5cbiAgICBlcnJvcihlcnJvciwgdHlwZSA9IFwiREVGQVVMVFwiKSB7XG4gICAgICAgIGxldCB7c2hvdywgRXJyb3JNZXNzYWdlcywgQnVzfSA9IHRoaXM7XG4gICAgICAgIGxldCBlcnJvclR5cGVNZXNzYWdlID0gRXJyb3JNZXNzYWdlc1t0eXBlXTtcbiAgICAgICAgbGV0IHttZXNzYWdlfSA9IGVycm9yO1xuICAgICAgICBsZXQgZXJyb3JQYXlsb2FkID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHR5cGUgOiBlcnJvclR5cGVNZXNzYWdlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2Vycm9yVHlwZU1lc3NhZ2V9OiAke21lc3NhZ2V9YCk7XG4gICAgICAgIEJ1cy5lbWl0KGVycm9yVHlwZU1lc3NhZ2UsIGVycm9yKTtcbiAgICAgICAgQnVzLmVtaXQoTG9nZ2luZ01lc3NhZ2VzLkVSUk9SLCBlcnJvclBheWxvYWQpO1xuICAgIH1cblxuICAgIGRlYnVnKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSwgZGF0YT17fSkge1xuICAgICAgICBsZXQgeyBzaG93LCBMb2dnaW5nTWVzc2FnZXMsIEJ1cyB9ID0gdGhpcztcbiAgICAgICAgbGV0IGxvZ01lc3NhZ2UgPSBMb2dnaW5nTWVzc2FnZXMuREVCVUc7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHsgZ3JvdXAgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgICAgICBpZiAoZ3JvdXAgJiYgc2hvdykge1xuICAgICAgICAgICAgbGV0IHsgbWVzc2FnZXMgfSA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYCR7bG9nTWVzc2FnZX06ICR7bWVzc2FnZX1gKVxuXG4gICAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB7IHRpdGxlLCBtZXNzYWdlIDogbG9nTWVzYWdlIH0gPSBtZXNzYWdlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpdGxlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVNZXNzYWdlKGxvZ01lc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVNZXNzYWdlKGxvZ01lc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcblxuICAgICAgICAgICAgQnVzLmVtaXQobG9nTWVzc2FnZSwgbWVzc2FnZSwgb3B0aW9ucywgZGF0YSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dNZXNzYWdlfToke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICBCdXMuZW1pdChsb2dNZXNzYWdlLCBtZXNzYWdlLCB7fSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2cobWVzc2FnZSkge1xuICAgICAgICBsZXQge3Nob3csIExvZ2dpbmdNZXNzYWdlcywgQnVzfSA9IHRoaXM7XG4gICAgICAgIGxldCBsb2dNZXNzYWdlID0gTG9nZ2luZ01lc3NhZ2VzLkxPRztcbiAgICAgICAgbGV0IGxvZ1BheWxvYWQgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coYCR7bG9nTWVzc2FnZX06ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgQnVzLmVtaXQobG9nTWVzc2FnZSwgbG9nUGF5bG9hZCk7XG4gICAgfVxuXG4gICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBpZiAoKG1lc3NhZ2UgIT09IG51bGwgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdvYmplY3QnKSB8fCBBcnJheS5pc0FycmF5KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB0cmFjZShzdGFjaykge1xuICAgICAgICBsZXQge3Nob3csIExvZ2dpbmdNZXNzYWdlcywgQnVzfSA9IHRoaXM7XG4gICAgICAgIGxldCBzdGFja1BheUxvYWQgPSB7XG4gICAgICAgICAgICBzdGFjazogc3RhY2ssXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS50cmFjZShzdGFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBCdXMuZW1pdChMb2dnaW5nTWVzc2FnZXMuVFJBQ0UsIHN0YWNrUGF5TG9hZCk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBUeXBlVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJylcclxuICAgIH1cclxuXHJcbiAgICBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3RyaW5nKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqICYmIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTnVtYmVyKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai52YWx1ZU9mKCkgPT09ICdib29sZWFuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eShvYmopIHtcclxuICAgICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIGxldCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmopO1xyXG4gICAgICAgIGxldCBpc1N0cmluZyA9IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG4gICAgICAgIGxldCBjaGVja0xlbmd0aCA9IGlzQXJyYXkgfHwgaXNTdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzTmFOKG9iaikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQYXJzZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB5b3UgdG8gbWFwIGFuIG9iamVjdCBieSB0aGUga2V5cyBvZiBhIGdpdmVuIG9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBvYmplY3QgdG8gbWFwO1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBydW4gYnkgZWFjaCB2YWx1ZSBhbmQga2V5ICBcclxuICAgICAqL1xyXG4gICAgbWFwS2V5cyhvYmplY3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcbiAgICAgICAgbGV0IG1hcHBlZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICghcmVkdWNlTWFwKSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBtYXBwZWRBcnJheS5wdXNoKGNhbGxiYWNrKHZhbCwga2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWRBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShiYXNlLCBtZXJnZWQsIGlnbm9yZSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRLZXlzID0gT2JqZWN0LmtleXMobWVyZ2VkKTtcclxuICAgICAgICBsZXQgdW5pb25lZE9iamVjdCA9IG5ldyBPYmplY3QoYmFzZSk7XHJcblxyXG4gICAgICAgIG1lcmdlZEtleXMuZm9yRWFjaCgobWVyZ2VkS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKG1lcmdlZEtleSkgPj0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB1bmlvbmVkT2JqZWN0W21lcmdlZEtleV0gPSBtZXJnZWRbbWVyZ2VkS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaW9uZWRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkdWNlKG9iamVjdCwgY2FsbGJhY2ssIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGNhbGxiYWNrKGRlZmF1bHRWYWx1ZSwgdmFsLCBrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhIGNvbGxlY3Rpb24gdG8gZmluZCBpZiBhbnkgb2YgdGhlIHZhbHVlcyBcclxuICAgICAqIHdpdGggdGhlIGtleXMgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIGFueUVtcHR5KGNvbGxlY3Rpb24sIGtleXMpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShlbGVtZW50W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uaW5kZXhPZihlbGVtZW50KSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja0VsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbGVtZW50S2V5cyA9IE9iamVjdC5rZXlzKGNoZWNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRLZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IGNoZWNrRWxlbWVudFtrZXldID09PSBlbGVtZW50W2tleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnQuZm9yRWFjaCgodGVzdEVsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gdGVzdEVsZW1lbnQgPT09IGFycmF5RWxlbWVudFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBvID0gb2JqZWN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBhW2ldO1xyXG4gICAgICAgICAgICBpZiAobiBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9bbl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9bYVthLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBhdGgocGF0aCwgb2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gb2JqZWN0O1xyXG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgcGF0aFBhcnRzLmZvckVhY2goKHBhdGhQYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KHBhdGhQYXJ0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IG9sZERhdGFbcGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShjdXJyZW50RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBzZWUgaWYgdGhlIHZhbHVlcyBcclxuICAgICAqIGF0IHRoZSBrZXlzIGlzIHVuaXF1ZSBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kaWNhdGluZyBcclxuICAgICAqIGlmIHRoZXkgYXJlIHVuaXF1ZSBhbmQgYW55IGVycm9ycyB0aGF0IGRvbid0IG1hdGNoIGZvciBcclxuICAgICAqIGNvcnJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGlzVW5pcXVlKGNvbGxlY3Rpb24gPSBbXSwga2V5cyA9IFtdKSB7XHJcbiAgICAgICAgbGV0IGhhc1VuaXF1ZSA9IHtcclxuICAgICAgICAgICAgaXNVbmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhbGxVbmlxdWVWYWx1ZXMgPSB7fTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldID0gW107XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RVbmlxdWUgPSBzZWxmLmhhcyhhbGxVbmlxdWVWYWx1ZXNba2V5XSwgZWxlbWVudFtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90VW5pcXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5pc1VuaXF1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XS5wdXNoKGVsZW1lbnRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNVbmlxdWU7XHJcbiAgICB9XHJcbn07Il19
