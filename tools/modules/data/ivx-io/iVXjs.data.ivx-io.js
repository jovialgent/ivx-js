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


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.AUDIO = "audio";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER;
            var AUDIO = this.AUDIO;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + AUDIO;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.ERROR = "error";

        var eventNames = {
            VIDEO: new _video2.default().VIDEO,
            HTTP: new _http2.default().HTTP,
            VALIDATION: "validation",
            SET_UP: "set-up",
            IVX_IO: new _iVXio2.default().IVX_IO
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var ERROR = this.ERROR;
            var DELIMETER = this.DELIMETER;

            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + ERROR + DELIMETER + eventName;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.HTTP = "http";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER;
            var HTTP = this.HTTP;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + HTTP;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

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
            var ERROR = this.ERROR;
            var DELIMETER = this.DELIMETER;

            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + ERROR + DELIMETER + errorName;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.IVX_IO = "iVXio";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER;
            var IVX_IO = this.IVX_IO;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + IVX_IO;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

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
            var DELIMETER = this.DELIMETER;
            var LOGGING = this.LOGGING;

            if (level.length <= 0) {
                return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + LOGGING;
            }

            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + LOGGING + DELIMETER + level;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

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


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + eventName;
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.STATE = "state";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER;
            var STATE = this.STATE;


            return "" + _get(Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + STATE;
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

},{"./index.js":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iVXioActions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
        var iVXjsLog = arguments.length <= 1 || arguments[1] === undefined ? new _logging2.default(false, experience.Bus) : arguments[1];

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
            var eventArgs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
                var key = eventArgs.key;
                var value = eventArgs.value;


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

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/logging.js":18}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iVXio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require('./actions.js');

var _rules = require('./rules.js');

var _actions2 = require('../ivx-js/actions.js');

var _comparator = require('../../../utilities/comparator.js');

var _typeParsers = require('../../../utilities/type-parsers.js');

var _asserts = require('../../../utilities/asserts.js');

var _iVXioErrors = require('../../../constants/iVXio.errors.js');

var _iVXioErrors2 = _interopRequireDefault(_iVXioErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var comparator = new _comparator.Comparator();
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
    var iVXjsSettings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
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

      var _experienceHostSettin = this.experienceHostSettings;
      var experienceHostSettings = _experienceHostSettin === undefined ? {} : _experienceHostSettin;
      var _iVXjsSettings = this.iVXjsSettings;
      var iVXjsSettings = _iVXjsSettings === undefined ? {} : _iVXjsSettings;

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

        iVX(experienceHostSettings).then(function (iVX) {
          var _iVXjsSettings$experi = iVXjsSettings.experience;
          var experienceSettings = _iVXjsSettings$experi === undefined ? {} : _iVXjsSettings$experi;
          var customRules = iVXjsSettings.rules;

          var defaultActions = objectParser.merge(new _actions2.Actions(), experienceSettings);
          var experience = objectParser.merge(defaultActions, iVX.experience);
          var modifiedActions = new _actions.iVXioActions(experience, _this.iVXjsLog);
          var _iVX$experience$story = iVX.experience.story.data;
          var storyUI = _iVX$experience$story.ui;
          var storyValidation = _iVX$experience$story.validation;

          var rules = new _rules.iVXioRules(experience, customRules).rules;
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

function initializeiVXIO(settings) {
  settings.module = iVXio;

  return settings;
};

},{"../../../constants/iVXio.errors.js":5,"../../../utilities/asserts.js":16,"../../../utilities/comparator.js":17,"../../../utilities/type-parsers.js":19,"../ivx-js/actions.js":15,"./actions.js":12,"./rules.js":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iVXioRules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _comparator = require('../../../utilities/comparator.js');

var _typeParsers = require('../../../utilities/type-parsers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var comparator = new _comparator.Comparator();
var typeValidator = new _typeParsers.TypeValidator();

/**
 * Generates an iVXio Rules function that allows navigation and 
 * rule evaluation based on both experience data and progress.
 */

var iVXioRules = exports.iVXioRules = function () {

    /**
     * Attaches the current experience to this class to help
     * process both data and progress informaiton.
     * 
     * @param {iVXioExperiece} experience - iVXio Experience object
     * containing all the information for these rules to evaluate on.
     */

    function iVXioRules(experience, customRules) {
        _classCallCheck(this, iVXioRules);

        /**
         * Puts the current exprience object into this class 
         * for rule evaluation.
         * 
         * @type {iVXioExperience}
         */
        this.experience = experience;
        this.customRules = customRules;
    }

    /**
     * A function that returns a stateId when an object in its
     * navArray evaluates to true.
     * 
     * @type {Function}
     */


    _createClass(iVXioRules, [{
        key: 'getProgressValue',


        /**
         * Converts the progress name to a numeric value using this 
         * expererience's progressMap so the processRules function 
         * can evaluate this navigation based on its value.
         * 
         * @param {string} progress - Key to a progress value in this experiences
         * progress map.
         * @return {number} - the value of the progress in the progress map.
         */
        value: function getProgressValue(progress) {
            var story = this.experience.story;
            var progressMap = story.progressMap;

            var firstLetter = progress[0].toLowerCase();

            progress = '' + firstLetter + progress.substring(1);

            return progressMap[progress];
        }

        /**
         * Iterates through an array of rules and stateIds and returns
         * the first stateId to navigate to next based on this evaluateRule
         * function. 
         * 
         * 
         * @param {array} - navArray - An array of expressions and states 
         * that will evaluate the correct navigation to go to next.
         * @return {string} - state id to navigate next to.
         * 
         */

    }, {
        key: 'processRules',
        value: function processRules(navArray) {
            var self = this;
            var stateSelect = navArray.find(function (navObj) {
                return self.evaluateRule(navObj);
            });
            var state = stateSelect.state;
            var stateId = stateSelect.stateId;


            stateId = state ? state : stateId;

            return stateId;
        }

        /**
         * Evaluates a rule to be true or false depending on 
         * the experience's current data and progress. Used to choose 
         * which state to navigate to next.
         * 
         * @param {Object} navObj - an object containing at least a state ID
         * and an optional rule to be evaluated.
         * @return {Boolean} - a true/false value determining if the rule evaluates to
         * true or false. If a rule doesn't exist, this will return true implying that the 
         * state is a default.
         */

    }, {
        key: 'evaluateRule',
        value: function evaluateRule(navObj) {
            var when = void 0;
            var rule = navObj.rule;


            if (!rule || typeValidator.isEmpty(rule)) return true;

            var key = rule.key;
            var is = rule.is;
            var value = rule.value;


            if (key === 'progress') {
                var _experience = this.experience;
                var progress = _experience.progress;
                var milestone = _experience.milestone;


                if (progress === 'Started' && milestone) {
                    progress = milestone;
                }

                when = this.getProgressValue(progress);
                value = this.getProgressValue(value);
            } else {
                when = this.experience.data[key];
            }

            return comparator.compare(when, is, value);
        }
    }, {
        key: 'rules',
        get: function get() {
            var self = this;

            return function (navArray) {
                if (typeof self.navArray !== 'undefined') {

                    if (self.customRules) {
                        var customRuleStateId = self.customRules(navArray);

                        if (customRuleStateId) {
                            return customRuleStateId;
                        }
                    }
                }
                return self.processRules(navArray);
            };
        }

        /**
         * iVXio's expressions use the symbols for evaluation, so this 
         * maps to the keywords for comparing.
         * 
         * @type {object}
         */

    }, {
        key: 'expressionMap',
        get: function get() {
            return {
                "<=": "lte",
                ">=": "gte",
                "<": "lt",
                ">": "gt",
                "==": "equals",
                "!=": "notEquals"
            };
        }
    }]);

    return iVXioRules;
}();

},{"../../../utilities/comparator.js":17,"../../../utilities/type-parsers.js":19}],15:[function(require,module,exports){
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
            var _eventObj$animationCl = eventObj.animationClasses;
            var animationClasses = _eventObj$animationCl === undefined ? "" : _eventObj$animationCl;
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
            var key = eventObj.key;
            var value = eventObj.value;

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

},{"../../../constants/audio.events.js":1,"../../../constants/state.events.js":9}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.assert = assert;
function assert(test, name, message) {
	if (!test) throw new Error(name + " is invalid: " + message + ".");

	return test;
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comparator = exports.Comparator = function () {
    function Comparator() {
        _classCallCheck(this, Comparator);
    }

    _createClass(Comparator, [{
        key: "compare",
        value: function compare(lhs, is, rhs) {
            return this[is](lhs, rhs);
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

    return Comparator;
}();

},{}],18:[function(require,module,exports){
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
            var show = this.show;
            var LoggingMessages = this.LoggingMessages;
            var Bus = this.Bus;

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
            var type = arguments.length <= 1 || arguments[1] === undefined ? "DEFAULT" : arguments[1];
            var show = this.show;
            var ErrorMessages = this.ErrorMessages;
            var Bus = this.Bus;

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
        key: 'log',
        value: function log(message) {
            var show = this.show;
            var LoggingMessages = this.LoggingMessages;
            var Bus = this.Bus;

            var logMessage = LoggingMessages.LOG;
            var logPayload = {
                message: message,
                timestamp: new Date()
            };

            if (show) {
                console.log(logMessage + ': ' + message);
            }

            Bus.emit(logMessage, logPayload);
        }
    }, {
        key: 'trace',
        value: function trace(stack) {
            var show = this.show;
            var LoggingMessages = this.LoggingMessages;
            var Bus = this.Bus;

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

},{"../constants/errors.js":3,"../constants/logging.js":8}],19:[function(require,module,exports){
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

},{}]},{},[13]);
