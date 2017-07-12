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
          var states = new _index2.default(iVX.experience.story.data.states, iVX.experience.story.inputs, self, reject).states;

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

if (angular && angular.module('ivx-js')) {
  var app = angular.module('ivx-js');

  app.constant('iVXjs.data.iVXio', initializeiVXIO);

  new _index4.default(app, { factoryFunctionCreator: _factoryFunctionCreator2.default });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2Vycm9ycy5qcyIsInNyYy9jb25zdGFudHMvaHR0cC5qcyIsInNyYy9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzIiwic3JjL2NvbnN0YW50cy9pVlhpby5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL2xvZ2dpbmcuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvc3RhdGUuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vYWN0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtcmVjb3JkLWV2ZW50L2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvYWN0aW9uLXRlbXBsYXRlcy9pdngtc2V0LWNvbXBsZXRlZC9kaXJlY3RpdmUuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9jb21wb25lbnRzL2FjdGlvbi10ZW1wbGF0ZXMvaXZ4LXNldC1jb252ZXJ0ZWQvZGlyZWN0aXZlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9hY3Rpb24tdGVtcGxhdGVzL2l2eC1zZXQtbWlsZXN0b25lL2RpcmVjdGl2ZS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2NvbXBvbmVudHMvZmFjdG9yeS1mdW5jdGlvbi1jcmVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2V2YWx1YXRvci5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2luZGV4LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9jYXNjYWRpbmctb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guYnV0dG9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvY2hlY2tib3guanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL2VtYWlsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvbnVtYmVyLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy9vcHRpb25zLmJ1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL29wdGlvbnMucmFkaW8uanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbGFyZ2UuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1pby9pbnB1dC12YWxpZGF0b3JzL3RleHQtbWVkaXVtLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0LXNob3J0LmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vaW5wdXQtdmFsaWRhdG9ycy90ZXh0YXJlYS5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWlvL2lucHV0LXZhbGlkYXRvcnMvdXJsLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtaW8vcnVsZXMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvZXZhbHVhdG9yLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvcnVsZXMuanMiLCJzcmMvdXRpbGl0aWVzL2Fzc2VydHMuanMiLCJzcmMvdXRpbGl0aWVzL2xvZ2dpbmcuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsa0JBQU0sTUFaTztBQWFiLG9CQUFTLFFBYkk7QUFjYiwwQkFBYyxjQWREO0FBZWIsd0JBQVksWUFmQztBQWdCYix5QkFBYSxhQWhCQTtBQWlCYixvQkFBUTtBQWpCSyxTQUFqQjs7QUFvQkEsY0FBSyxRQUFMLENBQWMsVUFBZDtBQXZCVTtBQXdCYjs7OzttQ0FFVSxTLEVBQVc7QUFBQSxnQkFDYixTQURhLEdBQ0EsSUFEQSxDQUNiLFNBRGE7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsU0FBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLEtBQUwsR0FBYSxPQUFiO0FBSFM7QUFJWjs7OztxQ0FFVztBQUFBLGdCQUNGLFNBREUsR0FDa0IsSUFEbEIsQ0FDRixTQURFO0FBQUEsZ0JBQ1MsS0FEVCxHQUNrQixJQURsQixDQUNTLEtBRFQ7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USxHQUFSO0FBSFcseUJBQXRCO0FBS0Esa0NBQVUsUUFBVixHQUFxQixLQUFyQjtBQUNILHFCQVBELE1BT087QUFDSCx3Q0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FBMEIsUUFBUSxHQUFSLENBQTFCO0FBQ0g7QUFDSixpQkFiRDtBQWNILGFBaEJEOztBQWtCQSxtQkFBTyxTQUFQO0FBQ0g7Ozs7OztBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBdWRpb0NvbnN0YW50cyBmcm9tIFwiLi9hdWRpby5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEF1ZGlvQ29uc3RhbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIEFERF9QTEFZSU5HX0NMQVNTOiAnYWRkLXBsYXlpbmctY2xhc3MnLFxuICAgICAgICAgICAgQlVGRkVSSU5HIDogXCJidWZmZXJpbmdcIixcbiAgICAgICAgICAgIENBTl9QTEFZOiBcImNhbi1wbGF5XCIsXG4gICAgICAgICAgICBESVNQT1NFIDogXCJkaXNwb3NlXCIsXG4gICAgICAgICAgICBFTkRFRCA6IFwiZW5kZWRcIixcbiAgICAgICAgICAgIEdFVF9EVVJBVElPTjogXCJnZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIE1VVEU6IFwibXV0ZVwiLFxuICAgICAgICAgICAgUEFVU0U6IFwicGF1c2VcIixcbiAgICAgICAgICAgIFBBVVNFRDogXCJwYXVzZWRcIixcbiAgICAgICAgICAgIFBMQVk6IFwicGxheVwiLFxuICAgICAgICAgICAgUExBWUlORzogXCJwbGF5aW5nXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9VUCA6IFwic2V0LXVwXCIsXG4gICAgICAgICAgICBTRVRfRFVSQVRJT046IFwic2V0LWR1cmF0aW9uXCIsXG4gICAgICAgICAgICBTRVRfVk9MVU1FOiBcInNldC12b2x1bWVcIixcbiAgICAgICAgICAgIFRJTUVfVVBEQVRFOiBcInRpbWUtdXBkYXRlXCIsXG4gICAgICAgICAgICBVTk1VVEU6IFwidW5tdXRlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuQVVESU8gPSBcImF1ZGlvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICAgbGV0IHtERUxJTUVURVIsIEFVRElPfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtBVURJT31gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBWaWRlb0NvbnN0YW50cyBmcm9tIFwiLi92aWRlby5qc1wiO1xuaW1wb3J0IEh0dHBDb25zdGFudHMgZnJvbSBcIi4vaHR0cC5qc1wiO1xuaW1wb3J0IGlWWGlvQ29uc3RhbnRzIGZyb20gXCIuL2lWWGlvLmpzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhqc0NvbnN0YW50cyB7XG4gICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5FUlJPUiA9IFwiZXJyb3JcIjtcblxuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgIFZJREVPOiBuZXcgVmlkZW9Db25zdGFudHMoKS5WSURFTyxcbiAgICAgICAgICAgIEhUVFAgOiBuZXcgSHR0cENvbnN0YW50cygpLkhUVFAsXG4gICAgICAgICAgICBWQUxJREFUSU9OIDogXCJ2YWxpZGF0aW9uXCIsXG4gICAgICAgICAgICBTRVRfVVAgOiBcInNldC11cFwiLFxuICAgICAgICAgICAgSVZYX0lPIDogbmV3IGlWWGlvQ29uc3RhbnRzKCkuSVZYX0lPLFxuICAgICAgICAgICAgREVGQVVMVCA6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgQVNTRVJUIDogXCJhc3NlcnRcIixcbiAgICAgICAgICAgIEVYUEVSSUVOQ0U6IFwiZXhwZXJpZW5jZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0VSUk9SLCBERUxJTUVURVJ9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0VSUk9SfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxuXG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkhUVFAgPSBcImh0dHBcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBIVFRQfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtIVFRQfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhpb0NvbnN0YW50cyBmcm9tIFwiLi9pVlhpby5qc1wiO1xuaW1wb3J0IEVycm9yQ29uc3RhbnRzIGZyb20gXCIuL2Vycm9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGlvQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5FUlJPUiA9IG5ldyBFcnJvckNvbnN0YW50cygpLkVSUk9SO1xuXG4gICAgICAgIGxldCBlcnJvclR5cGVzID0ge1xuICAgICAgICAgICAgRVhQRVJJRU5DRSA6IFwiZXhwZXJpZW5jZVwiLFxuICAgICAgICAgICAgUExBVEZPUk1fVU5BVkFJTEFCTEUgOiBcInBsYXRmb3JtLXVuYXZhaWxhYmxlXCIsXG4gICAgICAgICAgICBFVkVOVF9OT1RfRklSRUQgOiBcImV2ZW50LW5vdC1maXJlZFwiXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGVycm9yVHlwZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXJyb3JOYW1lKXtcbiAgICAgICAgbGV0IHtFUlJPUiwgREVMSU1FVEVSfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7RVJST1J9JHtERUxJTUVURVJ9JHtlcnJvck5hbWV9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5JVlhfSU8gPSBcImlWWGlvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgSVZYX0lPfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtJVlhfSU99YDsgICBcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuTElCUkFSWSA9IFwiaVZYanNcIjtcbiAgICAgICAgdGhpcy5ERUxJTUVURVIgPSBcIjpcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLkxJQlJBUlk7XG4gICAgfVxuXG4gICAgYWRkTmFtZXMobmFtZUNvbGxlY3Rpb24pe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBuYW1lcyA9IE9iamVjdC5rZXlzKG5hbWVDb2xsZWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUsIGluZGV4KSA9PntcbiAgICAgICAgICAgIHNlbGZbbmFtZV0gPSBzZWxmLmNvbnZlbnRpb24obmFtZUNvbGxlY3Rpb25bbmFtZV0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLkxPR0dJTkcgPSBcImxvZ1wiO1xuXG4gICAgICAgIGxldCBsb2dUeXBlcyA9IHtcbiAgICAgICAgICAgIEVSUk9SIDogXCJlcnJvclwiLFxuICAgICAgICAgICAgV0FSTiA6IFwid2FyblwiLFxuICAgICAgICAgICAgVFJBQ0UgOiBcInRyYWNlXCIsXG4gICAgICAgICAgICBMT0cgOlwiXCIsXG4gICAgICAgICAgICBERUJVRyA6IFwiZGVidWdcIlxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhsb2dUeXBlcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihsZXZlbCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBMT0dHSU5HfSA9IHRoaXM7XG4gICAgICAgIGlmKGxldmVsLmxlbmd0aCA8PSAwKXtcbiAgICAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtMT0dHSU5HfWBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtMT0dHSU5HfSR7REVMSU1FVEVSfSR7bGV2ZWx9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzU3RhdGVDb25zdGFudHMgZnJvbSBcIi4vc3RhdGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNTdGF0ZUNvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQ0hBTkdFIDogXCJjaGFuZ2VcIixcbiAgICAgICAgICAgIFNVQ0NFU1MgOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIEVSUk9SIDogXCJlcnJvclwiLFxuICAgICAgICAgICAgR08gOiBcImdvXCIsXG4gICAgICAgICAgICBOT1RfRk9VTkQgOiBcIm5vdC1mb3VuZFwiLFxuICAgICAgICAgICAgR0VUX1NUQVRFIDogXCJnZXQtc3RhdGVcIixcbiAgICAgICAgICAgIFJFUVVFU1RfU1RBVEUgOiBcInJlcXVlc3Qtc3RhdGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuU1RBVEUgPSBcInN0YXRlXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgU1RBVEV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1NUQVRFfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBpVlhpb0Vycm9yTmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy9pVlhpby5lcnJvcnMuanNcIjtcclxuaW1wb3J0IExvZ2dpbmcgZnJvbSBcIi4uLy4uLy4uL3V0aWxpdGllcy9sb2dnaW5nLmpzXCI7XHJcblxyXG5sZXQgaVZYaW9FcnJvcnMgPSBuZXcgaVZYaW9FcnJvck5hbWVzKCk7XHJcblxyXG4vKipcclxuICogQWRkcyBhIGxheWVyIG9mIHRyYW5zZm9ybWF0aW9uIHRvIGlWWGlvJ3MgaG9zdCBmdW5jdGlvbmFsaXR5XHJcbiAqIHRvIHdvcmsgd2l0aCB0aGUgQWN0aW9uIHN5c3RlbSBpbiBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBpVlhpb0FjdGlvbnMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVsbHMgdGhlIGlWWGlvJ3MgZXhwZXJpZW5jZSBob3N0IHRoYXQgdGhpcyBjbGFzcyBcclxuICAgICAqIHdpbGwgdXNlIHRvIHNldCB2YXJpb3VzIGV4cGVyaWVuY2UgZGF0YS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtFeHBlcmllbmNlSG9zdH0gZXhwZXJpZW5jZSAtIGN1cnJlbnQgaW5zdGFuY2Ugb2YgaVZYaW8nc1xyXG4gICAgICogZXhwZXJpZW5jZSBob3N0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBpVlhqc0xvZyA9IG5ldyBMb2dnaW5nKGZhbHNlLCBleHBlcmllbmNlLkJ1cykpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGV4cGVyaWVuY2UgaG9zdCB0aGF0IHdpbGwgcGVyZm9ybSB0aGUgXHJcbiAgICAgICAgICogYWN0aW9ucyB0byB0aGUgcGxhdGZvcm1cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAdHlwZSB7RXhwZXJpZW5jZUhvc3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICB0aGlzLmlWWGpzTG9nID0gaVZYanNMb2c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGVzIHRoZSBcImFuaW1hdGVQYWdlRWxlbWVudFwiIGZyb20gdGhlIHBsYXRmb3JtIHRvXHJcbiAgICAgKiBpVlhqcydzIGFjdGlvbiBcImFuaW1hdGVFbGVtZW50LlwiXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBhbmltYXRlIHBhZ2UgZWxlbWVudCdzIGV2ZW50IG9iamVjdCBcclxuICAgICAqIHdpdGggYSB0YXJnZXQgaWQuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gaW5kaWNhdGVzIHRoZSBhbmltYXRpb24gdG8gYW4gZWxlbWVudCBpcyBmaW5pc2hlZC5cclxuICAgICAqL1xyXG4gICAgYW5pbWF0ZVBhZ2VFbGVtZW50KGV2ZW50QXJncykge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChldmVudEFyZ3MudGFyZ2V0SUQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9ICcjJyArIGV2ZW50QXJncy50YXJnZXRJRFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBldmVudEFyZ3MuZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2UuYW5pbWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBhbmltYXRpb25DbGFzczogZXZlbnRBcmdzLmFuaW1hdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHBsYXRmb3JtIHV0aWxpemVzIC5ORVQncyB0aW1lIGZvcm1hdCBhbmQgcmVxdWlyZXMgdGhlIGRhdGUgXHJcbiAgICAgKiB2YWx1ZSB0byBiZSBpbiBhIHNwZWNpZmljIGZvcm1hdCBmb3IgRGF0ZS9EYXRldGltZSBpbnB1dHMuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gZXhwZXJpZW5jZSBrZXkgdG8gcHVsbCB0aGUgaW5wdXQgZGlzcGxheS5cclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIHRoZSBkYXRlIHRvIHRyYW5zZm9ybSBpbnRvIC5ORVQgc2FmZSBzdHJpbmcuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gY29ycmVjdGx5IGZvcm1hdHRlZCBkYXRlIHN0cmluZyBmb3IgLk5FVC5cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBmb3JtYXREYXRlRm9yUGxhdGZvcm0oa2V5LCBkYXRlKSB7XHJcbiAgICAgICAgbGV0IHsgaW5wdXRzIH0gPSB0aGlzLmV4cGVyaWVuY2Uuc3Rvcnk7XHJcbiAgICAgICAgbGV0IGlucHV0ID0gaW5wdXRzW2tleV07XHJcbiAgICAgICAgbGV0IHsgZGlzcGxheSB9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZGlzcGxheSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiRGF0ZVwiOlxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7Z2V0TW9udGgoZGF0ZS5nZXRNb250aCgpKX0tJHtnZXREYXRlKGRhdGUuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TW9udGgobW9udGhOdW0pIHtcclxuICAgICAgICAgICAgbGV0IGNvcnJlY3RlZE1vbnRoTnVtID0gKG1vbnRoTnVtICsgMSkgJSAxMztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb3JyZWN0ZWRNb250aE51bSA+PSAxMCA/IGNvcnJlY3RlZE1vbnRoTnVtIDogYDAke2NvcnJlY3RlZE1vbnRoTnVtfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGUoZGF0ZU51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZU51bSA+PSAxMCA/IGRhdGVOdW0gOiBgMCR7ZGF0ZU51bX1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIHRoZSBjdXN0b20gZXZlbnQgaW4gdGhlIGV2ZW50IGFyZ3MgZm9yIHRoZSBcclxuICAgICAqIHBsYXRmb3JtIHRvIHJlY29yZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3MuY3VzdG9tRXZlbnQgLSBldmVudCBuYW1lIHRvIGJlIHJlY29yZGVkXHJcbiAgICAgKiBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBldmVudCB3YXMgc3VjY2Vzc2Z1bGx5IHJlY29yZGVkIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgcmVjb3JkRXZlbnQoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGN1c3RvbUV2ZW50IH0gPSBldmVudEFyZ3M7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5yZWNvcmRFdmVudChjdXN0b21FdmVudCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUsIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIHNldENvbnZlcnRlZCBldmVudCB3aXRoIGEgbGFiZWwgaWYgb25lIGlzIHByb3ZpZGVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYWxsIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy5sYWJlbCAtIGNvbnZlcnRlZCBsYWJlbCB0aGF0IHdpbGwgYmUgcmVjb3JkZWRcclxuICAgICAqIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gd2lsbCBpbmRpY2F0ZSBpZiB0aGlzIHNldENvbnZlcnRlZCB3YXMgc3VjY2Vzc2Z1bCBieSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldENvbnZlcnRlZChldmVudEFyZ3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHsgbGFiZWwgfSA9IGV2ZW50QXJncztcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBlcmllbmNlLnNldENvbnZlcnRlZChsYWJlbCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZS5CdXMuZW1pdChpVlhpb0Vycm9ycy5FVkVOVF9OT1RfRklSRUQsIGV2ZW50QXJncywgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlWWGpzTG9nLmVycm9yKGUsIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIHNldENvbXBsZXRlZCBldmVudC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJncyAtIGFsbCBldmVudCBhcmd1bWVudHNcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gd2lsbCBpbmRpY2F0ZSBpZiB0aGlzIHNldENvbXBsZXRlIHdhcyBzdWNjZXNzZnVsIGJ5IHRoZSBwbGF0Zm9ybS5cclxuICAgICAqL1xyXG4gICAgc2V0Q29tcGxldGUoZXZlbnRBcmdzID0ge30pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0Q29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0RGF0YSBldmVudCB0byB0aGUgcGxhdGZvcm0gd2l0aCB0aGUga2V5IGFuZCAgXHJcbiAgICAgKiB2YWx1ZSBpbiB0aGUgZXZlbnRBcmdzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzIC0gYWxsIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy5rZXkgLSBleHBlcmllbmNlIGRhdGEga2V5IHRvIGJlIHNldC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudEFyZ3MudmFsdWUgLSBleHBlcmllbmNlIGRhdGEgdmFsdWUgdG8gYmUgc2V0IHRvLiAgXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHdpbGwgaW5kaWNhdGUgaWYgdGhpcyBkYXRhIHdhcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCB0byB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldERhdGEoZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudEFyZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGtleSwgdmFsdWUgfSA9IGV2ZW50QXJncztcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgeyBkZWJ1Z0hvc3QgPSBmYWxzZSB9ID0gdGhpcy5leHBlcmllbmNlO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXROb3RGb3VuZCA9IHR5cGVvZiB0aGlzLmV4cGVyaWVuY2UuZGF0YVtrZXldID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmV4cGVyaWVuY2UuZGF0YVtrZXldID09PSBudWxsXHJcblxyXG4gICAgICAgICAgICBpZiAoIWRlYnVnSG9zdCAmJiBpbnB1dE5vdEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UuQnVzLmVtaXQoJ2lWWGpzOmlWWGlvOmVycm9yOmV2ZW50LW5vdC1maXJlZCcsIGV2ZW50QXJncywgeyBtZXNzYWdlOiBcImlWWGpzIEVycm9yIE1lc3NhZ2U6IElucHV0IG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pVlhqc0xvZy5lcnJvcih7IG1lc3NhZ2U6ICdpVlhqcyBFcnJvciBNZXNzYWdlOiBJbnB1dCBub3QgZm91bmQnIH0sIFwiSVZYX0lPXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZUZvclBsYXRmb3JtKGtleSwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0RGF0YShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaWVuY2Uuc2V0RGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh0ZXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7IGRhdGEgfSA9IHNlbGYuZXhwZXJpZW5jZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Z0hvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhwZXJpZW5jZS5kYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5leHBlcmllbmNlLkxvZy5kZWJ1ZyhgQ3VycmVudCBFeHBlcmllbmNlIERhdGFgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGRhdGFLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7ZGF0YUtleX06JHtkYXRhW2RhdGFLZXldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFbZGF0YUtleV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgc2V0TWlsZXN0b25lIHdpdGggdGhlIG1pbGVzdG9uZSBkZWZpbmVkIGluIHRoZSBcclxuICAgICAqIGV2ZW50QXJncyBvYmplY3QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudEFyZ3MgLSBob2xkcyB0aGUgbWlsZXN0b25lIHRvIGJlIHNlbmQgdG8gdGhlIHBsYXRmb3JtLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50QXJncy5taWxlc3RvbmUgLSBtaWxlc3RvbmUgdG8gYmUgc2V0LlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBpbmRpY2F0ZXMgaWYgdGhpcyBtaWxlc3RvbmUgd2FzIHNldCBvbiB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKi9cclxuICAgIHNldE1pbGVzdG9uZShldmVudEFyZ3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50QXJncyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHsgbWlsZXN0b25lIH0gPSBldmVudEFyZ3M7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpZW5jZS5zZXRNaWxlc3RvbmUobWlsZXN0b25lKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlLkJ1cy5lbWl0KGlWWGlvRXJyb3JzLkVWRU5UX05PVF9GSVJFRCwgZXZlbnRBcmdzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaVZYanNMb2cuZXJyb3IoZSwgXCJJVlhfSU9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgaVZYUmVjb3JkRXZlbnQgZnJvbSBcIi4vaXZ4LXJlY29yZC1ldmVudC9kaXJlY3RpdmVcIjtcbmltcG9ydCBpVlhTZXRDb21wbGV0ZWQgZnJvbSBcIi4vaXZ4LXNldC1jb21wbGV0ZWQvZGlyZWN0aXZlXCI7XG5pbXBvcnQgaVZYU2V0Q29udmVydGVkIGZyb20gXCIuL2l2eC1zZXQtY29udmVydGVkL2RpcmVjdGl2ZVwiO1xuaW1wb3J0IGlWWFNldE1pbGVzdG9uZSBmcm9tIFwiLi9pdngtc2V0LW1pbGVzdG9uZS9kaXJlY3RpdmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBuZXcgaVZYUmVjb3JkRXZlbnQoYXBwLCBvcHRzKTtcbiAgICAgICAgbmV3IGlWWFNldENvbXBsZXRlZChhcHAsb3B0cyk7XG4gICAgICAgIG5ldyBpVlhTZXRDb252ZXJ0ZWQoYXBwLG9wdHMpO1xuICAgICAgICBuZXcgaVZYU2V0TWlsZXN0b25lKGFwcCwgb3B0cyk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgaUVsbVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgeyBpdnhSZWNvcmRFdmVudDogdmFsdWUgfSA9IGlBdHRycztcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2UucmVjb3JkRXZlbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5EaXJlY3RpdmUuJGluamVjdCA9IFtcImlWWGpzXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBvcHRzKSB7XG4gICAgICAgIGxldCB7IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgfSA9IG9wdHM7XG5cbiAgICAgICAgYXBwXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdpdnhSZWNvcmRFdmVudCcsIGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IoRGlyZWN0aXZlKSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKGlWWGpzKSB7XG4gICAgICAgIHRoaXMubGluayA9ICgkc2NvcGUsIGlFbG0sIGlBdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgaUVsbVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpVlhqcy5leHBlcmllbmNlLnNldENvbXBsZXRlKCk7XG5cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4U2V0Q29tcGxldGVkJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaVZYanMpIHtcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBpRWxtWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCB7IGl2eFNldENvbnZlcnRlZDogdmFsdWUgfSA9IGlBdHRycztcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2Uuc2V0Q29udmVydGVkKHZhbHVlKTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4U2V0Q29udmVydGVkJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaVZYanMpIHtcbiAgICAgICAgdGhpcy5saW5rID0gKCRzY29wZSwgaUVsbSwgaUF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBpRWxtWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCB7IGl2eFNldE1pbGVzdG9uZTogdmFsdWUgfSA9IGlBdHRycztcblxuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2Uuc2V0TWlsZXN0b25lKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuRGlyZWN0aXZlLiRpbmplY3QgPSBbXCJpVlhqc1wiXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgb3B0cykge1xuICAgICAgICBsZXQgeyBmYWN0b3J5RnVuY3Rpb25DcmVhdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIGFwcFxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgnaXZ4U2V0TWlsZXN0b25lJywgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvcihEaXJlY3RpdmUpKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeUZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG5cdGxldCBjb25zdHJ1Y3RvckZuID0gY29uc3RydWN0b3I7XG5cdGxldCBhcmdzID0gY29uc3RydWN0b3JGbi4kaW5qZWN0O1xuXHRsZXQgZmFjdG9yeUZ1bmN0aW9uID0gKC4uLmFyZ3MpID0+IHtcbiAgICBcdHJldHVybiBuZXcgY29uc3RydWN0b3JGbiguLi5hcmdzKTtcblx0fVxuXHRcblx0YXJncy5wdXNoKGZhY3RvcnlGdW5jdGlvbik7XG5cblx0cmV0dXJuIGFyZ3M7XG59IiwiaW1wb3J0IEFjdGlvblRlbXBsYXRlcyBmcm9tIFwiLi9hY3Rpb24tdGVtcGxhdGVzL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG9wdHMpIHtcbiAgICAgICAgbmV3IEFjdGlvblRlbXBsYXRlcyhhcHAsIG9wdHMpO1xuICAgIH1cbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gXCIuLi9pdngtanMvZXZhbHVhdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZhbHVhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpIHtcbiAgICAgICAgc3VwZXIoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcbiAgICB9XG5cbiAgICBzdG9yeUV2ZW50cyhsaHMsIGlzLCBzdG9yeUV2ZW50KSB7XG4gICAgICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzO1xuICAgICAgICBsZXQge2V2ZW50c30gPSBleHBlcmllbmNlO1xuXG4gICAgICAgIGlmIChzdG9yeUV2ZW50ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybiBub0V2ZW50RmlyZWQoaXMsIGV2ZW50cywgZXhwZXJpZW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1tpc10oc3RvcnlFdmVudCwgZXZlbnRzKTtcblxuICAgICAgICBmdW5jdGlvbiBub0V2ZW50RmlyZWQoaXMsIGV2ZW50cywgZXhwZXJpZW5jZSkge1xuICAgICAgICAgICAgbGV0IGlzRmlyZWQgPSBpcyA9PT0gJ2ZpcmVkJztcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5sZW5ndGggPD0gMCAmJiBpc0ZpcmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyZWQoZXZlbnQsIGV2ZW50cykge1xuICAgICAgICBsZXQgZmlyZWRFdmVudCA9IGV2ZW50cy5maW5kKChldmVudEZpcmVkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50RmlyZWQgPT09IGV2ZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHlwZW9mIGZpcmVkRXZlbnQgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5vdEZpcmVkKGV2ZW50LCBldmVudHMpIHtcbiAgICAgICAgbGV0IGZpcmVkRXZlbnQgPSBldmVudHMuZmluZCgoZXZlbnRGaXJlZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudEZpcmVkID09PSBldmVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmaXJlZEV2ZW50ID09PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICBwcm9ncmVzcyhsaHMsIGlzLCBwcm9ncmVzcykge1xuICAgICAgICBsZXQge2V4cGVyaWVuY2V9ID0gdGhpcztcbiAgICAgICAgbGV0IHtwcm9ncmVzczogY3VycmVudFN0b3J5UHJvZ3Jlc3MsIG1pbGVzdG9uZTogY3VycmVudE1pbGVzdG9uZSwgc3Rvcnl9ID0gZXhwZXJpZW5jZTtcbiAgICAgICAgbGV0IHtwcm9ncmVzc01hcH0gPSBzdG9yeTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzcztcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc1ZhbHVlID0gLTE7XG4gICAgICAgIGxldCBjdXJyZW50TWlsZXN0b25lVmFsdWUgPSAtMTtcblxuICAgICAgICBpZiAoY3VycmVudE1pbGVzdG9uZSAmJiBjdXJyZW50TWlsZXN0b25lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TWlsZXN0b25lU3RyaW5nID0gY3VycmVudE1pbGVzdG9uZVswXS50b0xvd2VyQ2FzZSgpICsgY3VycmVudE1pbGVzdG9uZS5zdWJzdHJpbmcoMSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRNaWxlc3RvbmVWYWx1ZSA9IHByb2dyZXNzTWFwW2N1cnJlbnRNaWxlc3RvbmVTdHJpbmddID8gcHJvZ3Jlc3NNYXBbY3VycmVudE1pbGVzdG9uZVN0cmluZ10gOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1N0b3J5UHJvZ3Jlc3MoY3VycmVudFN0b3J5UHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzU3RyaW5nID0gY3VycmVudFN0b3J5UHJvZ3Jlc3NbMF0udG9Mb3dlckNhc2UoKSArIGN1cnJlbnRTdG9yeVByb2dyZXNzLnN1YnN0cmluZygxKTtcblxuICAgICAgICAgICAgY3VycmVudFByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc01hcFtjdXJyZW50UHJvZ3Jlc3NTdHJpbmddO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzc1swXS50b0xvd2VyQ2FzZSgpICsgcHJvZ3Jlc3Muc3Vic3RyaW5nKDEpO1xuXG4gICAgICAgIGxldCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NNYXBbcHJvZ3Jlc3NdO1xuICAgICAgICBsZXQgZXZhbHVhdGVQcm9ncmVzcyA9IGN1cnJlbnRQcm9ncmVzc1ZhbHVlID4gY3VycmVudE1pbGVzdG9uZVZhbHVlID8gY3VycmVudFByb2dyZXNzVmFsdWUgOiBjdXJyZW50TWlsZXN0b25lVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXNbaXNdKGV2YWx1YXRlUHJvZ3Jlc3MsIHByb2dyZXNzVmFsdWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGlzU3RvcnlQcm9ncmVzcyhwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzID09PSAnU3RhcnRlZCcgfHwgcHJvZ3Jlc3MgPT09ICdDb21wbGV0ZWQnIHx8IHByb2dyZXNzID09PSAnQ29udmVydGVkJztcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBpVlhpb0FjdGlvbnMgfSBmcm9tICcuL2FjdGlvbnMuanMnXHJcbmltcG9ydCB7IGlWWGlvUnVsZXMgfSBmcm9tICcuL3J1bGVzLmpzJ1xyXG5pbXBvcnQgeyBBY3Rpb25zIGFzIGlWWGpzQWN0aW9ucyB9IGZyb20gJy4uL2l2eC1qcy9hY3Rpb25zLmpzJ1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yLCBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcclxuaW1wb3J0IElucHV0VmFsaWRhdG9yIGZyb20gXCIuL2lucHV0LXZhbGlkYXRvcnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGlWWGlvRXJyb3JOYW1lcyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvaVZYaW8uZXJyb3JzLmpzJztcclxuaW1wb3J0IGZhY3RvcnlGdW5jdGlvbkNyZWF0b3IgZnJvbSBcIi4vY29tcG9uZW50cy9mYWN0b3J5LWZ1bmN0aW9uLWNyZWF0b3JcIjtcclxuaW1wb3J0IGlWWGlvQ29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4XCI7XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKClcclxubGV0IG9iamVjdFBhcnNlciA9IG5ldyBPYmplY3RQYXJzZXJzKClcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYW4gaVZYaW8gZGF0YSBtb2R1bGUgdGhhdCBpVlhqcyBjYW4gdXNlIGZvciBcclxuICogbmF2aWdhdGlvbiwgZGF0YSBzZXR0aW5nIGFuZCBwcm9ncmVzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBpVlhpbyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1bGxzIGluIGFueSBtb2R1bGUgc2V0dGluZ3MgYW5kIHRoZSBnbG9iYWwgc2V0dGluZ3NcclxuICAgKiBmb3IgdGhpcyBpVlhqcyBleHBlcmllbmNlIHRvIHNldCB1cCB0aGlzIGlWWGlvIFxyXG4gICAqIGVuaGFuY2UgZGF0YSBvYmplY3QuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1vZHVsZVNldHRpbmdzIC0gc2V0dGluZ3MgdG8gYmUgcGFzc2VkIGluIHRvIHRoZSBcclxuICAgKiBpVlhpbyBFeHBlcmVpbmNlIGhvc3QuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGlWWGpzU2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgaVZYanMgZXhwZXJpZW5jZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihleHBlcmllbmNlSG9zdFNldHRpbmdzLCBpVlhqc1NldHRpbmdzID0ge30sIEJ1cywgaVZYanNMb2cpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vZHVsZSBzZXR0aW5ncyBmb3IgaVZYaW8gd2hpY2ggd2lsbCBiZSBhbGwgdGhlIHNldHRpbmdzXHJcbiAgICAgKiB1c2VkIHdpdGggdGhlIGlWWGlvJ3MgZXhwZXJpZW5jZSBob3N0IHN1Y2ggYXMgc3Rvcnkga2V5cyBhbmRcclxuICAgICAqIGZ1bm5lbHMuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXhwZXJpZW5jZUhvc3RTZXR0aW5ncyA9IGV4cGVyaWVuY2VIb3N0U2V0dGluZ3NcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBpVlhqcyBleHBlcmllbmNlIFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmlWWGpzU2V0dGluZ3MgPSBpVlhqc1NldHRpbmdzO1xyXG4gICAgdGhpcy5CdXMgPSBCdXM7XHJcbiAgICB0aGlzLmlWWGpzTG9nID0gaVZYanNMb2c7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyB0aGUgY3VycmVudCBzZXR0aW5ncyBhbmQgdGhlbiBlbmhhbmNlcyB0aGUgc3RvcnkgZGF0YSBcclxuICAgKiBwdWxsZWQgZnJvbSB0aGUgaVZYaW8gZXhwZXJpZW5jZSBob3N0IGFuZCBlbmhhbmNlcyB0aGVtIHRvIFxyXG4gICAqIHdvcmsgd2l0aCBpVlhqcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGEgcHJvbWlzZSB0aGF0IGV2YWx1YXRlcyB3aGV0aGVyIHRoaXMgZXhwZXJpZW5jZSBcclxuICAgKiB3YXMgc3VjY2Vzc2Z1bGx5IGVuaGFuY2VkLlxyXG4gICAqL1xyXG4gIGVuaGFuY2UoKSB7XHJcbiAgICBsZXQgeyBleHBlcmllbmNlSG9zdFNldHRpbmdzID0ge30sIGlWWGpzU2V0dGluZ3MgPSB7fSB9ID0gdGhpcztcclxuICAgIGxldCBpVlhpb0Vycm9ycyA9IG5ldyBpVlhpb0Vycm9yTmFtZXMoKTtcclxuICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgbGV0IGVuaGFuY2VtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBpVlggPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgc2VsZi5CdXMuZW1pdChpVlhpb0Vycm9ycy5QTEFURk9STV9VTkFWQUlMQUJMRSwge30pO1xyXG4gICAgICAgIH0sIDEwMClcclxuICAgICAgICByZWplY3QoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuQnVzLm9uY2UoaVZYaW9FcnJvcnMuRVhQRVJJRU5DRSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlWWChleHBlcmllbmNlSG9zdFNldHRpbmdzKVxyXG4gICAgICAgIC50aGVuKFxyXG4gICAgICAgIChpVlgpID0+IHtcclxuICAgICAgICAgIGlmICghaVZYIHx8ICFpVlguZXhwZXJpZW5jZSB8fCAhaVZYLmV4cGVyaWVuY2Uuc3RvcnkgfHwgIWlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNlbGYuQnVzLmVtaXQoaVZYaW9FcnJvcnMuUExBVEZPUk1fVU5BVkFJTEFCTEUsIHt9KTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGxldCB7IGV4cGVyaWVuY2U6IGV4cGVyaWVuY2VTZXR0aW5ncyA9IHt9LCBydWxlczogY3VzdG9tUnVsZXMgfSA9IGlWWGpzU2V0dGluZ3M7XHJcbiAgICAgICAgICBsZXQgZGVmYXVsdEFjdGlvbnMgPSBvYmplY3RQYXJzZXIubWVyZ2UobmV3IGlWWGpzQWN0aW9ucygpLCBleHBlcmllbmNlU2V0dGluZ3MpO1xyXG4gICAgICAgICAgbGV0IGV4cGVyaWVuY2UgPSBvYmplY3RQYXJzZXIubWVyZ2UoZGVmYXVsdEFjdGlvbnMsIGlWWC5leHBlcmllbmNlKTtcclxuICAgICAgICAgIGxldCBtb2RpZmllZEFjdGlvbnMgPSBuZXcgaVZYaW9BY3Rpb25zKGV4cGVyaWVuY2UsIHRoaXMuaVZYanNMb2cpO1xyXG4gICAgICAgICAgbGV0IHsgdWk6IHN0b3J5VUksIHZhbGlkYXRpb246IHN0b3J5VmFsaWRhdGlvbiB9ID0gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YTtcclxuXHJcbiAgICAgICAgICBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhID0gaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YSA/IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEgOiB7fTtcclxuXHJcbiAgICAgICAgICBsZXQgcnVsZXMgPSBuZXcgaVZYaW9SdWxlcyhleHBlcmllbmNlLCBjdXN0b21SdWxlcykucnVsZXM7XHJcbiAgICAgICAgICBsZXQgc3RhdGVzID0gbmV3IElucHV0VmFsaWRhdG9yKGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEuc3RhdGVzLCBpVlguZXhwZXJpZW5jZS5zdG9yeS5pbnB1dHMsIHNlbGYsIHJlamVjdCkuc3RhdGVzO1xyXG5cclxuICAgICAgICAgIGV4cGVyaWVuY2UuZGVidWdIb3N0ID0gZXhwZXJpZW5jZUhvc3RTZXR0aW5ncy5kZWJ1ZztcclxuXHJcbiAgICAgICAgICBleHBlcmllbmNlLndoaXRlTGlzdCA9IFtcclxuICAgICAgICAgICAgJ3NlbGYnLFxyXG4gICAgICAgICAgICAnaHR0cDovL2l2eC14YXBpLiouaW5mLWVudi5jb20vKionLFxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pdngteGFwaS4qLmluZi1lbnYuY29tLyoqJyxcclxuICAgICAgICAgICAgJ2h0dHBzOi8veGFwaS5pdnguaW8vKionXHJcbiAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgIGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEuc3RhdGVzID0gc3RhdGVzO1xyXG4gICAgICAgICAgaVZYLmV4cGVyaWVuY2Uuc3RvcnkuZGF0YS5tZXRhZGF0YS50aXRsZSA9IGlWWC5leHBlcmllbmNlLnN0b3J5LmRhdGEubWV0YWRhdGEudGl0bGUgPyBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLm1ldGFkYXRhLnRpdGxlIDogXCJpVlggU3RvcnkgUGxheWVyXCI7XHJcblxyXG4gICAgICAgICAgbGV0IGVuaGFuY2VkaVZYanNTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgdWk6IGlWWGpzU2V0dGluZ3MudWksXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb246IGlWWGpzU2V0dGluZ3MudmFsaWRhdGlvbixcclxuICAgICAgICAgICAgY29uZmlnOiBpVlguZXhwZXJpZW5jZS5zdG9yeS5kYXRhLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlOiBleHBlcmllbmNlLFxyXG4gICAgICAgICAgICBydWxlczogcnVsZXMsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IG1vZGlmaWVkQWN0aW9uc1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGVuaGFuY2VkaVZYanNTZXR0aW5ncyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHNlbGYuQnVzLmVtaXQoaVZYaW9FcnJvcnMuRVhQRVJJRU5DRSwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gZW5oYW5jZW1lbnRQcm9taXNlXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZWlWWElPO1xyXG5cclxuaWYgKGFuZ3VsYXIgJiYgYW5ndWxhci5tb2R1bGUoJ2l2eC1qcycpKSB7XHJcbiAgbGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdpdngtanMnKTtcclxuXHJcbiAgYXBwLmNvbnN0YW50KCdpVlhqcy5kYXRhLmlWWGlvJywgaW5pdGlhbGl6ZWlWWElPKTtcclxuXHJcbiAgbmV3IGlWWGlvQ29tcG9uZW50cyhhcHAsIHsgZmFjdG9yeUZ1bmN0aW9uQ3JlYXRvciB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZWlWWElPKHNldHRpbmdzID0ge30pIHtcclxuICBzZXR0aW5ncy5tb2R1bGUgPSBpVlhpbztcclxuXHJcbiAgcmV0dXJuIHNldHRpbmdzO1xyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNze1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pe1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBqc29uSW5wdXREYXRhO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gc3RvcnlJbnB1dERhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCl7XG4gICAgICAgIGxldCB7c3RvcnlJbnB1dERhdGEgPSB7fSwganNvbklucHV0RGF0YSA9e319ID0gdGhpcztcbiAgICAgICAgbGV0IHJhd0lucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICBsZXQgbmV3U3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICByYXdJbnB1dERhdGEudHlwZSA9IFwiY2FzY2FkaW5nLW9wdGlvbnNcIjtcbiAgICAgICAgcmF3SW5wdXREYXRhLmRhdGFUcmVlID0gbmV3U3RvcnlJbnB1dERhdGEuZGF0YVRyZWU7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmF3SW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IHtidXR0b25zID0gW119ID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgbGV0IGhhc0ZhbHNlID0gZmFsc2U7XG4gICAgICAgIGxldCBoYXNUcnVlID0gZmFsc2U7XG4gICAgICAgIGxldCBuZXdCdXR0b25zID0gYnV0dG9ucy5yZWR1Y2UoKGJ1dHRvbkFycmF5LCBidXR0b25EYXRhLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IHt2YWx1ZX0gPSBidXR0b25EYXRhO1xuICAgICAgICAgICAgbGV0IGlzRmFsc2UgPSB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiICYmICF2YWx1ZTtcbiAgICAgICAgICAgIGxldCBpc1RydWUgPSB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiICYmIHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoaXNUcnVlICYmICFoYXNUcnVlKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQXJyYXlbMF0gPSBidXR0b25EYXRhO1xuICAgICAgICAgICAgICAgIGhhc1RydWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNGYWxzZSAmJiAhaGFzRmFsc2UpIHtcbiAgICAgICAgICAgICAgICBidXR0b25BcnJheVsxXSA9IGJ1dHRvbkRhdGE7XG4gICAgICAgICAgICAgICAgaGFzRmFsc2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYnV0dG9uQXJyYXk7XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICBpZiAoIWhhc1RydWUpIHtcbiAgICAgICAgICAgIG5ld0J1dHRvbnNbMF0gPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiVHJ1ZVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNGYWxzZSkge1xuICAgICAgICAgICAgbmV3QnV0dG9uc1sxXSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiRmFsc2VcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGpzb25JbnB1dERhdGEuYnV0dG9ucyA9IG5ld0J1dHRvbnM7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJ1dHRvbnMgZnJvbSBcIi4vY2hlY2tib3guYnV0dG9ucy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzc3tcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KXtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCl7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IHt0eXBlfSA9IGpzb25JbnB1dERhdGE7XG5cbiAgICAgICAgIGlmKHR5cGUgPT09IFwiYnV0dG9uc1wiKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9ucyhqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSkuaW5wdXQ7XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNze1xuICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSl7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpe1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcImVtYWlsXCI7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImltcG9ydCBpVlhpb0Vycm9yTmFtZXMgZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzL2lWWGlvLmVycm9ycy5qcyc7XG5cbi8vVmFsaWRhdG9ycyBcbmltcG9ydCBDYXNjYWRpbmdPcHRpb25zIGZyb20gXCIuL2Nhc2NhZGluZy1vcHRpb25zLmpzXCJcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi9jaGVja2JveC5qc1wiO1xuaW1wb3J0IEVtYWlsIGZyb20gXCIuL2VtYWlsLmpzXCI7XG5pbXBvcnQgTnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vb3B0aW9ucy5qc1wiO1xuaW1wb3J0IFRleHRBcmVhIGZyb20gXCIuL3RleHRhcmVhLmpzXCI7XG5pbXBvcnQgVGV4dExhcmdlIGZyb20gXCIuL3RleHQtbGFyZ2UuanNcIjtcbmltcG9ydCBUZXh0TWVkaXVtIGZyb20gXCIuL3RleHQtbWVkaXVtLmpzXCI7XG5pbXBvcnQgVGV4dFNob3J0IGZyb20gXCIuL3RleHQtc2hvcnQuanNcIjtcbmltcG9ydCBVcmwgZnJvbSBcIi4vdXJsLmpzXCI7XG5cbmNvbnN0IGVycm9yTmFtZXMgPSBuZXcgaVZYaW9FcnJvck5hbWVzKCk7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlcywgc3RvcnlJbnB1dHMsIGV4cGVyaWVuY2UsIHJlamVjdCkge1xuICAgICAgICB0aGlzLnJhd1N0YXRlcyA9IFtdLmNvbmNhdChzdGF0ZXMpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXRzID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dHMpO1xuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xuICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUlucHV0U3RhdGVzKHRoaXMucmF3U3RhdGVzKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRWYWxpZGF0b3JzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgQ2FzY2FkaW5nT3B0aW9ucyxcbiAgICAgICAgICAgIENoZWNrYm94LFxuICAgICAgICAgICAgRW1haWwsXG4gICAgICAgICAgICBOdW1iZXIsXG4gICAgICAgICAgICBPcHRpb25zLFxuICAgICAgICAgICAgVGV4dEFyZWEsXG4gICAgICAgICAgICBUZXh0TGFyZ2UsXG4gICAgICAgICAgICBUZXh0TWVkaXVtLFxuICAgICAgICAgICAgVGV4dFNob3J0LFxuICAgICAgICAgICAgVXJsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUlucHV0U3RhdGVzKHN0YXRlcykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzdGF0ZXMubWFwKChzdGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQge2lucHV0cyA9IFtdfSA9IHN0YXRlO1xuXG4gICAgICAgICAgICAgICAgc3RhdGUuaW5wdXRzID0gc2VsZi52YWxpZGF0ZUlucHV0cyhpbnB1dHMsIHN0YXRlLCBpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVJbnB1dHMoaW5wdXRzID0gW10sIHN0YXRlID0ge30sIHN0YXRlSW5kZXgpIHtcbiAgICAgICAgbGV0IHtpbnB1dFZhbGlkYXRvcnMsIHN0b3J5SW5wdXRzID0ge30sIGV4cGVyaWVuY2V9ID0gdGhpcztcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBpbnB1dHMubWFwKChpbnB1dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCB7bmFtZX0gPSBpbnB1dDtcbiAgICAgICAgICAgIGxldCBzdG9yeUlucHV0ID0gc3RvcnlJbnB1dHNbbmFtZV07XG5cbiAgICAgICAgICAgIGlmICghc3RvcnlJbnB1dCkge1xuICAgICAgICAgICAgICAgIGxldCB7bmFtZTogc3RhdGVOYW1lLCBpZH0gPSBzdGF0ZTtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gYFxuaVZYLmlvIFN0b3J5IGlucHV0IHdpdGgga2V5ICR7bmFtZX0gY2FuIG5vdCBiZSBmb3VuZDpcblN0YXRlIElkIDogJHtzdGF0ZS5pZH1cblN0YXRlIE5hbWUgOiAke3N0YXRlTmFtZX1cblN0YXRlIEluZGV4IDogJHtzdGF0ZUluZGV4fVxuSW5wdXQgTmFtZTogJHtuYW1lfVxuSW5wdXQgSW5kZXg6ICR7aW5kZXh9XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBleHBlcmllbmNlLkJ1cy5lbWl0KGVycm9yTmFtZXMuRVhQRVJJRU5DRSwgeyBtZXNzYWdlOiBlcnJvck1lc3NhZ2UgfSk7XG4gICAgICAgICAgICAgICAgZXhwZXJpZW5jZS5pVlhqc0xvZy5lcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgIH0sIFwiRVhQRVJJRU5DRVwiKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQge2Rpc3BsYXl9ID0gc3RvcnlJbnB1dDtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gaW5wdXRWYWxpZGF0b3JzW2Rpc3BsYXldO1xuICAgICAgICAgICAgICAgIGxldCBuZXdJbnB1dCA9IHNlbGYuZ2xvYmFsQXR0cmlidXRlc1NldChzdG9yeUlucHV0LCBpbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmFsaWRhdG9yKG5ld0lucHV0LCBzdG9yeUlucHV0KS5pbnB1dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnbG9iYWxBdHRyaWJ1dGVzU2V0KHN0b3J5SW5wdXREYXRhLCBqc29uSW5wdXREYXRhKSB7XG4gICAgICAgIGxldCB7YXR0cmlidXRlcyA6IHN0b3J5QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge3JlcXVpcmVkOiBzdG9yeVJlcXVpcmVkID0gXCJmYWxzZVwifSA9IHN0b3J5QXR0cmlidXRlcztcbiAgICAgICAgbGV0IG5ld0lucHV0ID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogaW5wdXRBdHRyaWJ1dGVzID0ge319ID0gbmV3SW5wdXQ7XG4gICAgICAgIGxldCB7cmVxdWlyZWQ6IGlucHV0UmVxdWlyZWQgPSBmYWxzZX0gPSBpbnB1dEF0dHJpYnV0ZXM7XG5cbiAgICAgICAgbmV3SW5wdXQuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIGlucHV0QXR0cmlidXRlcywge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHN0b3J5UmVxdWlyZWQgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGlucHV0UmVxdWlyZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0O1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIGxldCB7bWF4OiBzdG9yeU1heEF0dHJpYnV0ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBtaW46IHN0b3J5TWluQXR0cmlidXRlID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsIHN0ZXA6IHN0b3J5U3RlcEF0dHJpYnV0ZSA9IDF9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4OiBqc29uTWF4QXR0cmlidXRlID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsIG1pbjoganNvbk1pbkF0dHJpYnV0ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBzdGVwOiBqc29uU3RlcEF0dHJpYnV0ZSA9IDF9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHVzZVN0b3J5TWluID0ganNvbk1pbkF0dHJpYnV0ZSA+IHN0b3J5TWluQXR0cmlidXRlO1xuICAgICAgICBsZXQgdXNlU3RvcnlNYXggPSBqc29uTWF4QXR0cmlidXRlIDwgc3RvcnlNYXhBdHRyaWJ1dGU7XG4gICAgICAgIGxldCB1c2VTdG9yeVN0ZXAgPSB0eXBlb2Ygc3RvcnlTdGVwQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJztcblxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgbWluIDogbmV3IE51bWJlcih1c2VTdG9yeU1pbj8gc3RvcnlNaW5BdHRyaWJ1dGUgOiBqc29uTWluQXR0cmlidXRlKS52YWx1ZU9mKCksIFxuICAgICAgICAgICBtYXggOiBuZXcgTnVtYmVyKHVzZVN0b3J5TWF4ID8gc3RvcnlNYXhBdHRyaWJ1dGUgOiBqc29uTWF4QXR0cmlidXRlKS52YWx1ZU9mKCksIFxuICAgICAgICAgICBzdGVwIDogbmV3IE51bWJlcih1c2VTdG9yeVN0ZXAgPyBzdG9yeVN0ZXBBdHRyaWJ1dGUgOiBqc29uU3RlcEF0dHJpYnV0ZSkudmFsdWVPZigpLCBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IHN0b3J5SW5wdXREYXRhO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhID0ge30sIHN0b3J5SW5wdXREYXRhID0ge319ID0gdGhpcztcbiAgICAgICAgbGV0IHtidXR0b25zID0gW119ID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgbGV0IHtvcHRpb25zID0gW119ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCBuZXdCdXR0b25zID0gb3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBoYXNCdXR0b24ob3B0aW9uLCBidXR0b25zKTtcblxuICAgICAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b25cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHtkaXNwbGF5LCB2YWx1ZX0gPSBvcHRpb247XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGRpc3BsYXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBuZXdJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEsIHtcbiAgICAgICAgICAgIGJ1dHRvbnM6IG5ld0J1dHRvbnMsXG4gICAgICAgICAgICB0eXBlIDogXCJidXR0b25zXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0lucHV0RGF0YTtcblxuICAgICAgICBmdW5jdGlvbiBoYXNCdXR0b24ob3B0aW9uLCBidXR0b25zID0gW10pIHtcbiAgICAgICAgICAgIHJldHVybiBidXR0b25zLmZpbmQoYnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnV0dG9uLnZhbHVlID09PSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG59IiwiaW1wb3J0IEJ1dHRvbnMgZnJvbSBcIi4vb3B0aW9ucy5idXR0b25zLmpzXCI7XG5pbXBvcnQgUmFkaW8gZnJvbSBcIi4vb3B0aW9ucy5yYWRpby5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBzdG9yeUlucHV0RGF0YTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IHt0eXBlfSA9IGpzb25JbnB1dERhdGE7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiYnV0dG9uc1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbnMoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEpLmlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYWRpbyhqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSkuaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQge29wdGlvbnN9ID0gc3RvcnlJbnB1dERhdGE7XG5cbiAgICAgICAgbGV0IG5ld0lucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJvcHRpb25zXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3SW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IGpzb25JbnB1dERhdGE7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBzdG9yeUlucHV0RGF0YTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSA9IHt9LCBzdG9yeUlucHV0RGF0YSA9IHt9fSA9IHRoaXM7XG4gICAgICAgIGxldCB7cmFkaW9CdXR0b25zID0gW119ID0ganNvbklucHV0RGF0YTtcbiAgICAgICAgbGV0IHtvcHRpb25zID0gW119ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCBuZXdSYWRpb0J1dHRvbnMgPSBvcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgICAgbGV0IHtkaXNwbGF5LCB2YWx1ZX0gPSBvcHRpb247XG4gICAgICAgICAgICBsZXQgcmFkaW8gPSBoYXNSYWRpbyhvcHRpb24sIHJhZGlvQnV0dG9ucyk7XG5cbiAgICAgICAgICAgIGlmIChyYWRpbykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdSYWRpbyA9IE9iamVjdC5hc3NpZ24oe30sIHJhZGlvKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdSYWRpbztcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGRpc3BsYXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBuZXdJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YSwge1xuICAgICAgICAgICAgICAgIHJhZGlvQnV0dG9uczogbmV3UmFkaW9CdXR0b25zLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicmFkaW9cIlxuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gbmV3SW5wdXREYXRhO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhc1JhZGlvKG9wdGlvbiwgcmFkaW9CdXR0b25zID0gW10pIHtcbiAgICAgICAgICAgIHJldHVybiByYWRpb0J1dHRvbnMuZmluZChyYWRpb0J1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhZGlvQnV0dG9uLnZhbHVlID09PSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXhDaGFyYWN0ZXJzID0gMjU2O1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7ICBcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUgPSAwfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IG5ldyBOdW1iZXIoc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPCBtYXhDaGFyYWN0ZXJzID8gc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgOiAganNvbk1heExlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpLFxuICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogbmV3IE51bWJlcih0eXBlb2Ygc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQgbWF4Q2hhcmFjdGVycyA9IDEyODtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBzdG9yeUlucHV0QXR0cmlidXRlcyA9IHt9fSA9IHN0b3J5SW5wdXREYXRhO1xuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IGpzb25JbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBqc29uSW5wdXREYXRhOyAgXG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDogc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGV9ID0gc3RvcnlJbnB1dEF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCB7bWF4bGVuZ3RoOiBqc29uTWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlID0gMH0gPSBqc29uSW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgXG4gICAgICAgIGpzb25JbnB1dERhdGEudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBuZXcgTnVtYmVyKHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDwgbWF4Q2hhcmFjdGVycyA/IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlIDogIGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IG5ldyBOdW1iZXIodHlwZW9mIHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlICE9PSAndW5kZWZpbmVkJyA/IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlIDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganNvbklucHV0RGF0YTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGpzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5qc29uSW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwganNvbklucHV0RGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcnlJbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdG9yeUlucHV0RGF0YSk7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5wdXQoKSB7XG4gICAgICAgIGxldCB7anNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGF9ID0gdGhpcztcbiAgICAgICAgbGV0IG1heENoYXJhY3RlcnMgPSA2NFxuICAgICAgICBsZXQge2F0dHJpYnV0ZXM6IHN0b3J5SW5wdXRBdHRyaWJ1dGVzID0ge319ID0gc3RvcnlJbnB1dERhdGE7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczoganNvbklucHV0QXR0cmlidXRlcyA9IHt9fSA9IGpzb25JbnB1dERhdGE7ICBcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IHN0b3J5TWF4TGVuZ3RoQXR0cmlidXRlID0gbWF4Q2hhcmFjdGVycywgbWlubGVuZ3RoOiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZX0gPSBzdG9yeUlucHV0QXR0cmlidXRlcztcbiAgICAgICAgbGV0IHttYXhsZW5ndGg6IGpzb25NYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUgPSAwfSA9IGpzb25JbnB1dEF0dHJpYnV0ZXM7XG4gICAgICBcbiAgICAgICAganNvbklucHV0RGF0YS50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICAgICAgICBqc29uSW5wdXREYXRhLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IG5ldyBOdW1iZXIoc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPCBtYXhDaGFyYWN0ZXJzID8gc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgOiAganNvbk1heExlbmd0aEF0dHJpYnV0ZSkudmFsdWVPZigpLFxuICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogbmV3IE51bWJlcih0eXBlb2Ygc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gc3RvcnlNaW5MZW5ndGhBdHRyaWJ1dGUgOiBqc29uTWluTGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmpzb25JbnB1dERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uSW5wdXREYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yeUlucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0b3J5SW5wdXREYXRhKTtcblxuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgbGV0IHtqc29uSW5wdXREYXRhLCBzdG9yeUlucHV0RGF0YX0gPSB0aGlzO1xuICAgICAgICBsZXQgbWF4Q2hhcmFjdGVycyA9IDEwMjQ7XG4gICAgICAgIGxldCB7YXR0cmlidXRlczogc3RvcnlJbnB1dEF0dHJpYnV0ZXMgPSB7fX0gPSBzdG9yeUlucHV0RGF0YTtcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzOiBqc29uSW5wdXRBdHRyaWJ1dGVzID0ge319ID0ganNvbklucHV0RGF0YTsgIFxuICAgICAgICBsZXQge21heGxlbmd0aDogc3RvcnlNYXhMZW5ndGhBdHRyaWJ1dGUgPSBtYXhDaGFyYWN0ZXJzLCBtaW5sZW5ndGg6IHN0b3J5TWluTGVuZ3RoQXR0cmlidXRlfSA9IHN0b3J5SW5wdXRBdHRyaWJ1dGVzO1xuICAgICAgICBsZXQge21heGxlbmd0aDoganNvbk1heExlbmd0aEF0dHJpYnV0ZSA9IG1heENoYXJhY3RlcnMsIG1pbmxlbmd0aDoganNvbk1pbkxlbmd0aEF0dHJpYnV0ZSA9IDB9ID0ganNvbklucHV0QXR0cmlidXRlcztcbiAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAganNvbklucHV0RGF0YS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgIGpzb25JbnB1dERhdGEuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogbmV3IE51bWJlcihzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA8IG1heENoYXJhY3RlcnMgPyBzdG9yeU1heExlbmd0aEF0dHJpYnV0ZSA6ICBqc29uTWF4TGVuZ3RoQXR0cmlidXRlKS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBuZXcgTnVtYmVyKHR5cGVvZiBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBzdG9yeU1pbkxlbmd0aEF0dHJpYnV0ZSA6IGpzb25NaW5MZW5ndGhBdHRyaWJ1dGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpzb25JbnB1dERhdGE7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNze1xuICAgY29uc3RydWN0b3IoanNvbklucHV0RGF0YSwgc3RvcnlJbnB1dERhdGEgPSB7fSl7XG4gICAgICAgIHRoaXMuanNvbklucHV0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGpzb25JbnB1dERhdGEpO1xuICAgICAgICB0aGlzLnN0b3J5SW5wdXREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc3RvcnlJbnB1dERhdGEpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpe1xuICAgICAgICBsZXQge2pzb25JbnB1dERhdGEsIHN0b3J5SW5wdXREYXRhfSA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBqc29uSW5wdXREYXRhLnR5cGUgPSBcInVybFwiO1xuXG4gICAgICAgIHJldHVybiBqc29uSW5wdXREYXRhO1xuICAgIH1cbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gJy4vZXZhbHVhdG9yLmpzJztcclxuaW1wb3J0IHtSdWxlc30gZnJvbSBcIi4uL2l2eC1qcy9ydWxlcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhbiBpVlhpbyBSdWxlcyBmdW5jdGlvbiB0aGF0IGFsbG93cyBuYXZpZ2F0aW9uIGFuZCBcclxuICogcnVsZSBldmFsdWF0aW9uIGJhc2VkIG9uIGJvdGggZXhwZXJpZW5jZSBkYXRhIGFuZCBwcm9ncmVzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBpVlhpb1J1bGVzIGV4dGVuZHMgUnVsZXMge1xyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY3VycmVudCBleHBlcmllbmNlIHRvIHRoaXMgY2xhc3MgdG8gaGVscFxyXG4gICAgICogcHJvY2VzcyBib3RoIGRhdGEgYW5kIHByb2dyZXNzIGluZm9ybWFpdG9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2lWWGlvRXhwZXJpZWNlfSBleHBlcmllbmNlIC0gaVZYaW8gRXhwZXJpZW5jZSBvYmplY3RcclxuICAgICAqIGNvbnRhaW5pbmcgYWxsIHRoZSBpbmZvcm1hdGlvbiBmb3IgdGhlc2UgcnVsZXMgdG8gZXZhbHVhdGUgb24uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcikge1xyXG4gICAgICAgIHN1cGVyKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcik7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0b3IgPSBuZXcgRXZhbHVhdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQXVkaW9FdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvYXVkaW8uZXZlbnRzLmpzXCI7XHJcbmltcG9ydCBTdGF0ZUV2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy9zdGF0ZS5ldmVudHMuanNcIjtcclxuXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbmQgcnVucyBhbGwgYWN0aW9ucyBmb3IgdGhpcyBleHBlcmllbmNlLiBBbiBhY3Rpb25cclxuICogaXMgYW55IHByb2Nlc3MgdGhhdCBuZWVkcyB0byByZXR1cm4gYSBwcm9taXNlIGluZGljYXRpbmcgdGhhdCBcclxuICogaXQgZmluaXNoZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0aW9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZGVmYXVsdCBkYXRhIG9iamVjdCB0byBiZSB1c2VkIGJ5IHZhcmlvdXNcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQW4gZW1wdHkgZGF0YSBvYmplY3QgdGhhdCB3aWxsIGJlIHVzZWQgdG8gc2V0IGFuZCBcclxuICAgICAgICAgKiByZWNvcmQgZGF0YSB1c2luZyB0aGlzIHNldERhdGEgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLmF1ZGlvRXZlbnROYW1lcyA9IG5ldyBBdWRpb0V2ZW50TmFtZXMoKTtcclxuICAgICAgICB0aGlzLnN0YXRlRXZlbnROYW1lcyA9IG5ldyBTdGF0ZUV2ZW50TmFtZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgY2xhc3NlcyBvbiBhbiBlbGVtZW50IHRoYXQgd2lsbCBjYXVzZSB0aGUgZWxlbWVudCB0byBhbmltYXRlLlxyXG4gICAgICogQHBhcmFtIHtIVE1MTm9kZX0gZWxlbWVudCAtIGVsZW1lbnQgZm9yIHRoZSBjbGFzcyB0byBiZSBzZXRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudE9iaiAtIGFuaW1hdGlvbiBldmVudCBkYXRhLlxyXG4gICAgICogQHJldHVybiB7SFRNTE5vZGV9IHRoZSBlbGVtZW50IHdpdGggdGhlIGNsYXNzZXMgcmVwbGFjZWQuICBcclxuICAgICAqL1xyXG4gICAgc2V0RWxlbWVudENsYXNzZXMoZWxlbWVudCwgZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQgeyBhbmltYXRpb25DbGFzc2VzID0gXCJcIiB9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IHsgYW5pbWF0aW9uQ2xhc3M6IG9sZEFuaW1hdGlvbkNsYXNzIH0gPSBlbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihhbmltYXRpb25DbGFzc2VzKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdoaWRlJykgPj0gMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ2hpZGUnLCBhbmltYXRpb25DbGFzc2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9sZEFuaW1hdGlvbkNsYXNzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShvbGRBbmltYXRpb25DbGFzcywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC5hbmltYXRpb25DbGFzcyA9IGFuaW1hdGlvbkNsYXNzZXM7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBgJHtlbGVtZW50LmNsYXNzTmFtZX0gJHthbmltYXRpb25DbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9OZXh0U3RhdGUoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQgeyBuZXh0OiBuYXZBcnJheSB9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBuZXh0U3RhdGUgPSB0aGlzLnJ1bGVzKG5hdkFycmF5KTtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVzLmVtaXQoc2VsZi5zdGF0ZUV2ZW50TmFtZXMuR08sIHsgc3RhdGVJZDogbmV4dFN0YXRlIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBhbmltYXRlRWxlbWVudChldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7IGVsZW1lbnQgfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGlmICghYW5pbWF0aW9uRWxlbWVudHMgfHwgYW5pbWF0aW9uRWxlbWVudHMubGVuZ3RoIDw9IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKGFuaW1hdGlvbkVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMuZm9yRWFjaCgoYW5pbWF0aW9uRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudCA9IHRoaXMuc2V0RWxlbWVudENsYXNzZXMoYW5pbWF0aW9uRWxlbWVudCwgZXZlbnRPYmopO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBhbmltYXRlRWxlbWVudFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb25FbmRzID0gW1xyXG4gICAgICAgICAgICAgICAgJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAnbW96QW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdNU0FuaW1hdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAnb3NhbmltYXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ2FuaW1hdGlvbmVuZCdcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZHMuZm9yRWFjaCgoYW5pbWF0aW9uRW5kTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMuZm9yRWFjaCgoYW5pbWF0aW9uRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uRW5kTmFtZSwgZW5kQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuZEFuaW1hdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMuZm9yRWFjaCgoYW5pbWF0aW9uRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbmRzLmZvckVhY2goKGFuaW1hdGlvbkVuZE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5hbmltYXRpb25DbGFzcyA9IGV2ZW50T2JqLmFuaW1hdGlvbkNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmROYW1lLCBlbmRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuaW1hdGVFbGVtZW50UHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBnb1RvU3RhdGUoZXZlbnRPYmosIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgbGV0IHsgc3RhdGUgfSA9IGV2ZW50T2JqO1xyXG5cclxuICAgICAgICBpZiAoaVZYanNCdXMpIHtcclxuICAgICAgICAgICAgaVZYanNCdXMuZW1pdCh0aGlzLnN0YXRlRXZlbnROYW1lcy5HTywgZXZlbnRPYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QXVkaW9DbGlwKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHsgYXVkaW9FdmVudE5hbWVzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzLmVtaXQoYXVkaW9FdmVudE5hbWVzLlNFVF9VUCwgZXZlbnRPYmopO1xyXG4gICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KGF1ZGlvRXZlbnROYW1lcy5QTEFZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQnVzLm9uKGF1ZGlvRXZlbnROYW1lcy5USU1FX1VQREFURSwgKGN1cnJlbnRBdWRpbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEF1ZGlvLmlkID09PSBldmVudE9iai5pZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEF1ZGlvLnJ1bkN1ZVBvaW50cyhzZWxmLnByb2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGlvQ2xpcFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuQnVzLm9uY2UoYXVkaW9FdmVudE5hbWVzLkVOREVELCAoY3VycmVudEF1ZGlvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF1ZGlvLmlkID09PSBldmVudE9iai5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJvY2Vzc29yLnJlc29sdmVBY3Rpb25zKGV2ZW50T2JqLm9uRW5kLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhdWRpb0NsaXBQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGEoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQgeyBrZXksIHZhbHVlIH0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNldERhdGFQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFba2V5XSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5Mb2cuZGVidWcoYEN1cnJlbnQgRXhwZXJpZW5jZSBEYXRhYCwge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogT2JqZWN0LmtleXMoc2VsZi5kYXRhKS5tYXAoKGRhdGFLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7ZGF0YUtleX06JHtzZWxmLmRhdGFbZGF0YUtleV19YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogc2VsZi5kYXRhW2RhdGFLZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgc2VsZi5kYXRhKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShzZWxmKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0RGF0YVByb21pc2U7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKXtcclxuICAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICAgdGhpcy5jdXN0b21FdmFsdWF0b3IgPSBjdXN0b21FdmFsdWF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGUocnVsZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29uZGl0aW9uT3BlcmF0b3IgPSBcImFuZFwiLCBjb25kaXRpb25zfSA9IHJ1bGU7XHJcbiAgICAgICAgbGV0IGV2YWx1YXRlQ29uZGl0aW9ucyA9IGNvbmRpdGlvbnMubWFwKChjb25kaXRpb24sIGluZGV4KSA9PntcclxuICAgICAgICAgICAgbGV0IHtrZXkgOiBsaHMsIGlzLCB2YWx1ZSA6IHJocywgdHlwZSA9IFwiaW5wdXRcIn0gPSBjb25kaXRpb247XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmN1c3RvbUV2YWx1YXRvciAmJiB0eXBlVmFsaWRhdG9yLmlzRnVuY3Rpb24oc2VsZi5jdXN0b21FdmFsdWF0b3IpICYmIHNlbGYuY3VzdG9tRXZhbHVhdG9yKGNvbmRpdGlvbikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY3VzdG9tRXZhbHVhdG9yKGNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNpbmNlIG9sZGVyIHZlcnNpb25zIG9mIHRoZSBpVlhqcyBKU09OIHVzZWQgXHJcbiAgICAgICAgICAgIC8vIHRoZSBrZXkgZm9yIFwia2V5d29yZFwiIHRoaXMgd2lsbCBtYWtlIGl0IGJhY2t3YXJkc1xyXG4gICAgICAgICAgICAvLyBjb21wYXRhYmxlXHJcbiAgICAgICAgICAgIGlmKHNlbGZbbGhzXSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZltsaHNdKGxocywgaXMsIHJocyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmW3R5cGVdKGxocywgaXMsIHJocyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW2NvbmRpdGlvbk9wZXJhdG9yXShldmFsdWF0ZUNvbmRpdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0KGxocywgaXMsIHJocyl7XHJcbiAgICAgICAgbGV0IHtleHBlcmllbmNlfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGxoc1ZhbHVlID0gZXhwZXJpZW5jZS5kYXRhW2xoc107XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW2lzXShsaHNWYWx1ZSwgcmhzKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmQocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgJiYgcHJlZGljYXRlO1xyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3IocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgfHwgcHJlZGljYXRlO1xyXG4gICAgICAgIH0sZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdChwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSAmJiAhcHJlZGljYXRlO1xyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGx0ZShsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA8PSBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGx0KGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpIDwgbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGd0ZShsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA+PSBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGd0KGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpID4gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBlcXVhbHMobGhzLCByaHMpe1xyXG4gICAgICAgIHJldHVybiBsaHMgPT09IHJocztcclxuICAgIH1cclxuICAgIFxyXG4gICAgbm90RXF1YWxzKGxocyxyaHMpe1xyXG4gICAgICAgIHJldHVybiBsaHMgIT09IHJocztcclxuICAgIH1cclxuXHJcbiAgICBpbihsaHMscmhzKXtcclxuICAgICAgICByZXR1cm4gcmhzLmluZGV4T2YobGhzKSA+PSAwO1xyXG4gICAgfSAgICAgICAgXHJcbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gJy4vZXZhbHVhdG9yLmpzJztcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbi8qKlxyXG4gKiBBIGRlZmF1bHQgcnVsZSBzeXN0ZW0gaW4gd2hpY2ggaVZYanMgY2hvb3NlcyB3aGljaCBzdGF0ZSBcclxuICogdG8gZ28gdG8gYmFzZWQgb2YgdGhlIGN1cnJlbnQgaVZYanMgRXhwZXJpZW5jZSBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGV4cGVyaWVuY2UgaW4gd2hpY2ggdGhpcyBkYXRhIFxyXG4gICAgICogd2lsbCBiZSBldmFsdWF0ZWQgdG8uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHBlcmllbmNlIC0gaVZYanNFeHBlcmllbmNlIFxyXG4gICAgICogb2JqZWN0IGluIHdoaWNoIGRhdGEgd2lsbCBiZSB1c2VkIHRvIGV2YWx1YXRlIHZhcmlvdXMgcnVsZXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UgPSB7IGRhdGE6IHt9IH0sIGN1c3RvbUV2YWx1YXRvcikge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDdXJyZW50IGlWWGpzIEV4cGVyZWluY2UgXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdG9yID0gbmV3IEV2YWx1YXRvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlZmF1bHQgcnVsZXMgZnVuY3Rpb24gdGhhdCB3aWxsIHByb2Nlc3MgYW4gXHJcbiAgICAgKiBhcnJheSBvZiBuYXZpZ2F0aW9uIG9iamVjdHMgYW5kIGV2YWx1YXRlIHRoZW0gdXNpbmcgXHJcbiAgICAgKiB0aGUgcHJvY2Vzc1J1bGVzIGZ1bmN0aW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIGdldCBydWxlcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiAobmF2QXJyYXkgPSBbXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5wcm9jZXNzUnVsZXMobmF2QXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aHJvdWdoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBuYXYgb2JqZWN0IHdob3NlIFxyXG4gICAgICogcnVsZSBpcyBldmFsdWF0ZWQgdG8gdHJ1ZSBvciBydWxlcyBhcmUgZW1wdHkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG5hdkFycmF5IC0gQW4gYXJyYXkgb2YgbmF2aWdhdGlvbiBvYmplY3RzIFxyXG4gICAgICogd2l0aCBydWxlcyBhbmQgc3RhdGVzIHRvIGJlIGV2YWx1YXRlZC5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgc3RhdGVJZCBvZiB0aGUgcnVsZSB0aGF0IHdhcyBldmFsdWF0ZWQgXHJcbiAgICAgKiB0cnVlIGZpcnN0LiBJZiBubyBzdGF0ZSBpcyByZXR1cm4sIHJldHVybnMgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwcm9jZXNzUnVsZXMobmF2QXJyYXkgPSBbXSkge1xyXG5cclxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShuYXZBcnJheSkpe1xyXG4gICAgICAgICAgICBuYXZBcnJheSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN0YXRlU2VsZWN0ID0gbmF2QXJyYXkuZmluZCgobmF2T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7cnVsZX0gPSBuYXZPYmo7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlVmFsaWRhdG9yLmlzRW1wdHkocnVsZSkpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHtjb25kaXRpb25zLCBjb25kaXRpb25PcGVyYXRvciA9IFwiYW5kXCJ9ID0gcnVsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29uZGl0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgcnVsZS5jb25kaXRpb25PcGVyYXRvciA9IGNvbmRpdGlvbk9wZXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgcnVsZS5jb25kaXRpb25zID0gW3J1bGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0b3IuZXZhbHVhdGUocnVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZVNlbGVjdCA/IHN0YXRlU2VsZWN0LnN0YXRlSWQgOiAnJztcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iLCJpbXBvcnQgTG9nZ2luZ01lc3NhZ2VzIGZyb20gICcuLi9jb25zdGFudHMvbG9nZ2luZy5qcyc7XG5pbXBvcnQgRXJyb3JNZXNzYWdlcyBmcm9tICcuLi9jb25zdGFudHMvZXJyb3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHNob3csIEJ1cykge1xuICAgICAgICB0aGlzLnNob3cgPSBzaG93O1xuICAgICAgICB0aGlzLkxvZ2dpbmdNZXNzYWdlcyA9IG5ldyBMb2dnaW5nTWVzc2FnZXMoKTtcbiAgICAgICAgdGhpcy5FcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMoKTtcbiAgICAgICAgdGhpcy5CdXMgPSBCdXM7XG4gICAgfVxuXG4gICAgd2FybihtZXNzYWdlKSB7XG4gICAgICAgIGxldCB7c2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHdhcm5NZXNzYWdlID0gTG9nZ2luZ01lc3NhZ2VzLldBUk47XG4gICAgICAgIGxldCB3YXJuUGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7d2Fybk1lc3NhZ2V9OiAke21lc3NhZ2V9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBCdXMuZW1pdCh3YXJuTWVzc2FnZSwgd2FyblBheWxvYWQpO1xuICAgIH1cblxuICAgIGVycm9yKGVycm9yLCB0eXBlID0gXCJERUZBVUxUXCIpIHtcbiAgICAgICAgbGV0IHtzaG93LCBFcnJvck1lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IGVycm9yVHlwZU1lc3NhZ2UgPSBFcnJvck1lc3NhZ2VzW3R5cGVdO1xuICAgICAgICBsZXQge21lc3NhZ2V9ID0gZXJyb3I7XG4gICAgICAgIGxldCBlcnJvclBheWxvYWQgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgdHlwZSA6IGVycm9yVHlwZU1lc3NhZ2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZXJyb3JUeXBlTWVzc2FnZX06ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgQnVzLmVtaXQoZXJyb3JUeXBlTWVzc2FnZSwgZXJyb3IpO1xuICAgICAgICBCdXMuZW1pdChMb2dnaW5nTWVzc2FnZXMuRVJST1IsIGVycm9yUGF5bG9hZCk7XG4gICAgfVxuXG4gICAgZGVidWcobWVzc2FnZSwgb3B0aW9ucyA9IHt9LCBkYXRhPXt9KSB7XG4gICAgICAgIGxldCB7IHNob3csIExvZ2dpbmdNZXNzYWdlcywgQnVzIH0gPSB0aGlzO1xuICAgICAgICBsZXQgbG9nTWVzc2FnZSA9IExvZ2dpbmdNZXNzYWdlcy5ERUJVRztcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgeyBncm91cCA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIGlmIChncm91cCAmJiBzaG93KSB7XG4gICAgICAgICAgICBsZXQgeyBtZXNzYWdlcyB9ID0gb3B0aW9ucztcblxuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZChgJHtsb2dNZXNzYWdlfTogJHttZXNzYWdlfWApXG5cbiAgICAgICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsgdGl0bGUsIG1lc3NhZ2UgOiBsb2dNZXNhZ2UgfSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZU1lc3NhZ2UobG9nTWVzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZU1lc3NhZ2UobG9nTWVzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuXG4gICAgICAgICAgICBCdXMuZW1pdChsb2dNZXNzYWdlLCBtZXNzYWdlLCBvcHRpb25zLCBkYXRhKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ01lc3NhZ2V9OiR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIEJ1cy5lbWl0KGxvZ01lc3NhZ2UsIG1lc3NhZ2UsIHt9LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvZyhtZXNzYWdlKSB7XG4gICAgICAgIGxldCB7c2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IGxvZ01lc3NhZ2UgPSBMb2dnaW5nTWVzc2FnZXMuTE9HO1xuICAgICAgICBsZXQgbG9nUGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dNZXNzYWdlfTogJHttZXNzYWdlfWApO1xuICAgICAgICBCdXMuZW1pdChsb2dNZXNzYWdlLCBsb2dQYXlsb2FkKTtcbiAgICB9XG5cbiAgICAgY3JlYXRlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGlmICgobWVzc2FnZSAhPT0gbnVsbCAmJiB0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcpIHx8IEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHRyYWNlKHN0YWNrKSB7XG4gICAgICAgIGxldCB7c2hvdywgTG9nZ2luZ01lc3NhZ2VzLCBCdXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHN0YWNrUGF5TG9hZCA9IHtcbiAgICAgICAgICAgIHN0YWNrOiBzdGFjayxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKHN0YWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJ1cy5lbWl0KExvZ2dpbmdNZXNzYWdlcy5UUkFDRSwgc3RhY2tQYXlMb2FkKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFR5cGVWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3RyaW5nKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGdW5jdGlvbihvYmope1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNOdW1iZXIob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQm9vbGVhbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8ICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnZhbHVlT2YoKSA9PT0gJ2Jvb2xlYW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KG9iaikge1xyXG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbiAgICAgICAgbGV0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG9iaik7XHJcbiAgICAgICAgbGV0IGlzU3RyaW5nID0gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XHJcbiAgICAgICAgbGV0IGNoZWNrTGVuZ3RoID0gaXNBcnJheSB8fCBpc1N0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNOYU4ob2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBhcnNlcnMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHlvdSB0byBtYXAgYW4gb2JqZWN0IGJ5IHRoZSBrZXlzIG9mIGEgZ2l2ZW4gb2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIG9iamVjdCB0byBtYXA7XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIHJ1biBieSBlYWNoIHZhbHVlIGFuZCBrZXkgIFxyXG4gICAgICovXHJcbiAgICBtYXBLZXlzKG9iamVjdCwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuICAgICAgICBsZXQgbWFwcGVkQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWR1Y2VNYXApIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIG1hcHBlZEFycmF5LnB1c2goY2FsbGJhY2sodmFsLCBrZXkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKGJhc2UsIG1lcmdlZCwgaWdub3JlKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEtleXMgPSBPYmplY3Qua2V5cyhtZXJnZWQpO1xyXG4gICAgICAgIGxldCB1bmlvbmVkT2JqZWN0ID0gbmV3IE9iamVjdChiYXNlKTtcclxuXHJcbiAgICAgICAgbWVyZ2VkS2V5cy5mb3JFYWNoKChtZXJnZWRLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpZ25vcmUgJiYgaWdub3JlLmluZGV4T2YobWVyZ2VkS2V5KSA+PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHVuaW9uZWRPYmplY3RbbWVyZ2VkS2V5XSA9IG1lcmdlZFttZXJnZWRLZXldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5pb25lZE9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZWR1Y2Uob2JqZWN0LCBjYWxsYmFjaywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gY2FsbGJhY2soZGVmYXVsdFZhbHVlLCB2YWwsIGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVyYXRlcyB0aHJvdWdoIGEgY29sbGVjdGlvbiB0byBmaW5kIGlmIGFueSBvZiB0aGUgdmFsdWVzIFxyXG4gICAgICogd2l0aCB0aGUga2V5cyBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgYW55RW1wdHkoY29sbGVjdGlvbiwga2V5cykge1xyXG4gICAgICAgIGxldCBoYXNFbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGVsZW1lbnRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5pc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5pbmRleE9mKGVsZW1lbnQpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrRWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0VsZW1lbnRLZXlzID0gT2JqZWN0LmtleXMoY2hlY2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudEtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gY2hlY2tFbGVtZW50W2tleV0gPT09IGVsZW1lbnRba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hlY2tFbGVtZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudC5mb3JFYWNoKCh0ZXN0RWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSB0ZXN0RWxlbWVudCA9PT0gYXJyYXlFbGVtZW50W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZShvYmplY3QsIHBhdGgsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGEgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIG8gPSBvYmplY3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbiA9IGFbaV07XHJcbiAgICAgICAgICAgIGlmIChuIGluIG8pIHtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb1tuXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb1thW2EubGVuZ3RoIC0gMV1dID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWVGcm9tUGF0aChwYXRoLCBvYmplY3QpIHtcclxuICAgICAgICBsZXQgcGF0aFBhcnRzID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBvYmplY3Q7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICBwYXRoUGFydHMuZm9yRWFjaCgocGF0aFBhcnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkocGF0aFBhcnQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gb2xkRGF0YVtwYXRoUGFydF07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGN1cnJlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgb2xkRGF0YSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpbiBhbiBhcnJheSBvZiBvYmplY3RzIHRvIHNlZSBpZiB0aGUgdmFsdWVzIFxyXG4gICAgICogYXQgdGhlIGtleXMgaXMgdW5pcXVlIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRpY2F0aW5nIFxyXG4gICAgICogaWYgdGhleSBhcmUgdW5pcXVlIGFuZCBhbnkgZXJyb3JzIHRoYXQgZG9uJ3QgbWF0Y2ggZm9yIFxyXG4gICAgICogY29ycmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgaXNVbmlxdWUoY29sbGVjdGlvbiA9IFtdLCBrZXlzID0gW10pIHtcclxuICAgICAgICBsZXQgaGFzVW5pcXVlID0ge1xyXG4gICAgICAgICAgICBpc1VuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFsbFVuaXF1ZVZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0gPSBbXTtcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdFVuaXF1ZSA9IHNlbGYuaGFzKGFsbFVuaXF1ZVZhbHVlc1trZXldLCBlbGVtZW50W2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3RVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmlzVW5pcXVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldLnB1c2goZWxlbWVudFtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc1VuaXF1ZTtcclxuICAgIH1cclxufTsiXX0=
