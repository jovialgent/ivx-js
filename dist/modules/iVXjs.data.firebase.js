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

},{"./index.js":8}],3:[function(require,module,exports){
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

},{"./firebase.js":5}],4:[function(require,module,exports){
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

        var eventNames = {
            CREATE_EXPERIENCE: "create-experience"
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

},{"./index.js":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXjsConfig = require("./iVXjs.config.js");

var _iVXjsConfig2 = _interopRequireDefault(_iVXjsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_iVXjsConfigConstants) {
    _inherits(_class, _iVXjsConfigConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        var eventNames = {
            VALIDATED: "validated",
            NOT_VALID: "not-valid",
            ANALYTICS_SET: "analytics-set",
            ANALYTICS_FINISHED: "analytics-finished"
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
}(_iVXjsConfig2.default);

exports.default = _class;

},{"./iVXjs.config.js":7}],7:[function(require,module,exports){
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

        _this.CONFIG = "config";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                CONFIG = this.CONFIG;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + CONFIG;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

},{"./index.js":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./index.js":8}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseAuthentication = require("../../../constants/firebase.authentication.js");

var _firebaseAuthentication2 = _interopRequireDefault(_firebaseAuthentication);

var _firebaseEvents = require("../../../constants/firebase.events.js");

var _firebaseEvents2 = _interopRequireDefault(_firebaseEvents);

var _typeParsers = require("../../../utilities/type-parsers.js");

var _stateEvents = require("../../../constants/state.events.js");

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _utilities = require("./utilities.js");

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var objectParser = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();
var utilities = new _utilities2.default();

var _class = function () {
    function _class(iVXjsLog) {
        _classCallCheck(this, _class);

        this.iVXjsLog = iVXjsLog;
        this.authConstants = new _firebaseAuthentication2.default();
        this.stateEventNames = new _stateEvents2.default();
        this.eventConstants = new _firebaseEvents2.default();
    }

    _createClass(_class, [{
        key: "getExternalTemplates",
        value: function getExternalTemplates(templatePath) {
            if (this.localTemplates || !templatePath) return;

            var storage = firebase.storage();
            var pathReference = storage.ref(templatePath);

            return pathReference.getDownloadURL();
        }
    }, {
        key: "uploadFile",
        value: function uploadFile(file) {
            var currentUser = firebase.auth().currentUser;
            var fileName = file.name;


            if (currentUser) {
                var uid = currentUser.uid;

                var storageRef = firebase.storage().ref("/" + uid + "/" + fileName);
                var promise = storageRef.put(file);
                return promise;
            }
        }
    }, {
        key: "createExperience",
        value: function createExperience(eventObj) {
            var _eventObj$data = eventObj.data,
                defaultData = _eventObj$data === undefined ? {} : _eventObj$data;
            var experiencePath = this.experiencePath,
                data = this.data,
                src = this.src;

            var database = firebase.database();
            var self = this;
            var createExperiencePromise = new Promise(function (resolve, reject) {

                self.Bus.once(self.stateEventNames.GET_STATE, function (currentState) {
                    defaultData.src = src;
                    defaultData.stateSrc = currentState.data.id;

                    var stateData = currentState.data;
                    var detokenedPath = utilities.detokenize(experiencePath, self.user, self, self.iVXjsLog);

                    var _firebase$auth = firebase.auth(),
                        currentUser = _firebase$auth.currentUser;

                    if (currentUser) {
                        defaultData.user = {};
                        defaultData.user[currentUser.uid] = true;
                    }

                    var newExperienceKey = database.ref(utilities.detokenize(experiencePath, self.user, self, self.iVXjsLog)).push(defaultData).key;
                    var eventConstants = new _firebaseEvents2.default();

                    self.key = newExperienceKey;
                    self.data = defaultData;

                    if (currentUser) {
                        (function () {
                            var uid = currentUser.uid;


                            database.ref("users/" + uid).once('value').then(function (data) {
                                var _data$val = data.val(),
                                    experiences = _data$val.experiences;

                                if (!experiences) {
                                    var newExperience = {};

                                    newExperience[newExperienceKey] = true;
                                    database.ref("users/" + uid).update({
                                        experiences: newExperience
                                    });
                                } else {
                                    experiences[newExperienceKey] = true;
                                    database.ref("users/" + uid).update({
                                        experiences: experiences
                                    });
                                    self.Bus.emit(eventConstants.CREATE_EXPERIENCE, data, newExperienceKey, currentUser);
                                    resolve(newExperienceKey, currentUser);
                                }
                            });
                        })();
                    } else {
                        self.Bus.emit(eventConstants.CREATE_EXPERIENCE, data, newExperienceKey);
                        resolve(newExperienceKey);
                    }
                });

                self.Bus.emit(self.stateEventNames.REQUEST_STATE);
            });

            return createExperiencePromise;
        }
    }, {
        key: "isRestricted",
        value: function isRestricted() {
            return new Promise(function (resolve, reject) {
                firebase.auth().onAuthStateChanged(function (user) {

                    resolve(!user);
                });
            });
        }
    }, {
        key: "signOutUser",
        value: function signOutUser() {
            var firebaseAuth = firebase.auth();
            return firebaseAuth.signOut();
        }
    }, {
        key: "signInWithGithub",
        value: function signInWithGithub(args, resolve) {
            var self = this;
            var provider = new firebase.auth.GithubAuthProvider();
            var experienceKey = this.key;

            var firebaseAuth = firebase.auth();

            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "signInAnonymously",
        value: function signInAnonymously(args, resolve) {
            var experienceKey = this.key;

            var firebaseAuth = firebase.auth();

            firebaseAuth.signInAnonymously().catch(function (error) {});
        }
    }, {
        key: "handleRedirect",
        value: function handleRedirect(stateData, provider, args) {
            var _args$scope = args.scope,
                scope = _args$scope === undefined ? [] : _args$scope;


            scope.forEach(function (thisScope, index) {
                if (provider.addScope) {
                    provider.addScope(thisScope);
                }
            });
            stateData.key = this.key;

            if (localStorage) {
                localStorage.redirectOrigin = JSON.stringify(stateData);
            }

            firebase.auth().signInWithRedirect(provider);
        }
    }, {
        key: "signInWithGoogle",
        value: function signInWithGoogle(args, resolve) {
            var self = this;
            var experienceKey = this.key;

            var provider = new firebase.auth.GoogleAuthProvider();
            var newExperience = {};
            newExperience[experienceKey] = true;

            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider, args);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "signInWithTwitter",
        value: function signInWithTwitter(args, resolve) {
            var self = this;
            var provider = new firebase.auth.TwitterAuthProvider();
            var experienceKey = this.key;


            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "signInWithFacebook",
        value: function signInWithFacebook(args, resolve) {
            var self = this;
            var provider = new firebase.auth.FacebookAuthProvider();
            var experienceKey = this.key;


            this.Bus.once(this.stateEventNames.GET_STATE, function (currentState) {
                var stateData = currentState.data;
                self.handleRedirect(stateData, provider);
            });

            this.Bus.emit(this.stateEventNames.REQUEST_STATE);
        }
    }, {
        key: "setUpUsers",
        value: function setUpUsers(user, experienceKey, resolve) {
            firebase.database().ref('users/' + user.uid).update({
                email: user.email
            });
            firebase.database().ref('users/' + user.uid + '/experiences/' + experienceKey).set(true);

            resolve(user);
        }
    }, {
        key: "signInWithEmail",
        value: function signInWithEmail(args, resolve) {
            var self = this;
            var experienceKey = this.key;


            this.Bus.once(this.authConstants.GET_PASSWORD, getPassword);

            function getPassword(password) {
                var emailKey = args.emailKey;
                var data = self.data;

                var email = data[emailKey];

                firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                    self.setUpUsers(result, experienceKey, resolve);
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...

                    console.log(error.code);
                });
            }

            this.Bus.emit(this.authConstants.REQUEST_PASSWORD);
        }
    }, {
        key: "signInUser",
        value: function signInUser(signInType, args, resolve) {
            switch (signInType) {
                case "google":
                    this.signInWithGoogle(args, resolve);
                    return;
                case "email":
                    this.signInWithEmail(args, resolve);
                    return;
                case "facebook":
                    this.signInWithFacebook(args, resolve);
                    return;
                case "twitter":
                    this.signInWithTwitter(args, resolve);
                    return;
                case "github":
                    this.signInWithGithub(args, resolve);
                    return;
                case "anonymous":
                    this.signInAnonymously(args, resolve);
            }

            resolve();
        }
    }, {
        key: "authorizeUser",
        value: function authorizeUser(eventObj) {
            var authType = eventObj.authType;

            var self = this;
            var experienceKey = self.key;

            var authPromise = new Promise(function (resolve, reject) {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        var uid = user.uid,
                            _user$email = user.email,
                            email = _user$email === undefined ? "" : _user$email,
                            displayName = user.displayName;


                        firebase.database().ref('users/' + user.uid).update({
                            email: user.email
                        });

                        if (experienceKey) {
                            firebase.database().ref("users/" + user.uid + "/experiences/" + experienceKey).set(true);
                        }

                        self.data.user = { uid: uid, email: email, displayName: displayName };

                        resolve(user);
                    } else {
                        self.signInUser(authType, eventObj, resolve);
                    }
                });
            });

            return authPromise;
        }
    }, {
        key: "setData",
        value: function setData(eventObj) {
            var self = this;
            var database = firebase.database();
            var _self$data = self.data,
                data = _self$data === undefined ? {} : _self$data,
                experienceKey = self.key,
                auth = self.auth,
                iVXjsLog = self.iVXjsLog,
                experiencePath = self.experiencePath;
            var key = eventObj.key,
                value = eventObj.value,
                ref = eventObj.ref,
                _eventObj$user = eventObj.user,
                user = _eventObj$user === undefined ? false : _eventObj$user;

            var updateData = {};
            var currentUser = firebase.auth().currentUser;
            var refPath = utilities.detokenize(experiencePath + "/$x.key", self.user, self, iVXjsLog);

            if (!ref && !experienceKey && !user) {
                return;
            }

            if (!currentUser && user) {
                iVXjsLog.warn("Authorization Required. Key: " + key + " Value: " + value + " was not saved to the Firebase Database.");
                return;
            }

            updateData[key] = value;

            if (currentUser && user) {
                var uid = currentUser.uid;


                return database.ref("users/" + uid).update(updateData).then(function () {
                    self.user[key] = value;
                });
            }

            if (ref) {
                var detokenedRef = utilities.detokenize(ref, self.user, self, iVXjsLog);

                if (detokenedRef) {
                    return database.ref(detokenedRef).update(updateData).then(function () {});
                }
            }

            if (refPath) {
                return database.ref(refPath).update(updateData).then(function () {
                    self.data[key] = value;
                });
            }

            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    }, {
        key: "experienceActions",
        get: function get() {
            return {
                authorizeUser: this.authorizeUser,
                eventListeners: this.eventListeners,
                signInUser: this.signInUser,
                signOutUser: this.signOutUser,
                signInWithGoogle: this.signInWithGoogle,
                signInWithFacebook: this.signInWithFacebook,
                signInWithTwitter: this.signInWithTwitter,
                signInWithEmail: this.signInWithEmail,
                signInWithGithub: this.signInWithGithub,
                signInAnonymously: this.signInAnonymously,
                handleRedirect: this.handleRedirect,
                setUpUsers: this.setUpUsers,
                setData: this.setData,
                authConstants: this.authConstants,
                stateEventNames: this.stateEventNames,
                uploadFile: this.uploadFile,
                isRestricted: this.isRestricted,
                addEventListeners: this.addEventListners,
                createExperience: this.createExperience,
                getExternalTemplates: this.getExternalTemplates
            };
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../../../constants/firebase.authentication.js":3,"../../../constants/firebase.events.js":4,"../../../constants/state.events.js":9,"../../../utilities/type-parsers.js":18,"./utilities.js":14}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FirebaseData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = require('../../../utilities/type-parsers.js');

var _iVXjsConfigEvents = require('../../../constants/iVXjs.config.events.js');

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _stateEvents = require('../../../constants/state.events.js');

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _firebaseAuthentication = require('../../../constants/firebase.authentication.js');

var _firebaseAuthentication2 = _interopRequireDefault(_firebaseAuthentication);

var _actions = require('../ivx-js/actions.js');

var _rules = require('./rules.js');

var _utilities = require('./utilities.js');

var _utilities2 = _interopRequireDefault(_utilities);

var _actions2 = require('./actions.js');

var _actions3 = _interopRequireDefault(_actions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultActions = new _actions.Actions();
var myObjectParser = new _typeParsers.ObjectParsers();
var utilities = new _utilities2.default();

var FirebaseData = exports.FirebaseData = function () {
    function FirebaseData() {
        var moduleSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var iVXjsSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var Bus = arguments[2];
        var iVXjsLog = arguments[3];

        _classCallCheck(this, FirebaseData);

        var data = iVXjsSettings.data,
            defaultExperience = iVXjsSettings.experience;
        var _defaultExperience$da = defaultExperience.data,
            defaultExperienceData = _defaultExperience$da === undefined ? {} : _defaultExperience$da;
        var apiKey = data.apiKey,
            authDomain = data.authDomain,
            databaseURL = data.databaseURL,
            storageBucket = data.storageBucket,
            _data$auth = data.auth,
            auth = _data$auth === undefined ? false : _data$auth,
            _data$createExperienc = data.createExperienceOnLoad,
            createExperienceOnLoad = _data$createExperienc === undefined ? true : _data$createExperienc,
            _data$experiencePath = data.experiencePath,
            experiencePath = _data$experiencePath === undefined ? "experiences" : _data$experiencePath,
            _data$localTemplates = data.localTemplates,
            localTemplates = _data$localTemplates === undefined ? false : _data$localTemplates,
            templateRef = data.templateRef;


        this.iVXjsSettings = iVXjsSettings;
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;

        // Initialize Firebase
        var config = {
            apiKey: apiKey,
            authDomain: authDomain,
            databaseURL: databaseURL,
            storageBucket: storageBucket
        };

        firebase.initializeApp(config);

        this.auth = auth;
        this.databaseURL = databaseURL;
        this.firebaseConstants = new _firebaseAuthentication2.default();
        this.createExperienceOnLoad = createExperienceOnLoad;
        this.experiencePath = experiencePath;
        this.localTemplates = localTemplates;
        this.defaultExperience = defaultExperience;
        this.templateRef = templateRef;
    }

    _createClass(FirebaseData, [{
        key: 'setUpExperience',
        value: function setUpExperience(dataFromServer, src, resolve) {
            var auth = this.auth,
                createExperienceOnLoad = this.createExperienceOnLoad,
                defaultExperience = this.defaultExperience;
            var experiencePath = this.experiencePath,
                localTemplates = this.localTemplates,
                templateRef = this.templateRef;
            var firebaseConstants = this.firebaseConstants,
                iVXjsLog = this.iVXjsLog;

            var self = this;
            var database = firebase.database();
            var _iVXjsSettings = this.iVXjsSettings,
                _iVXjsSettings$experi = _iVXjsSettings.experience,
                modifiedExperience = _iVXjsSettings$experi === undefined ? {} : _iVXjsSettings$experi,
                customRules = _iVXjsSettings.rules,
                _iVXjsSettings$ui = _iVXjsSettings.ui,
                ui = _iVXjsSettings$ui === undefined ? 'default' : _iVXjsSettings$ui,
                _iVXjsSettings$valida = _iVXjsSettings.validation,
                validation = _iVXjsSettings$valida === undefined ? 'iVXjsValidation' : _iVXjsSettings$valida;

            var experience = myObjectParser.merge(new _actions.Actions(), modifiedExperience);
            var firebaseExperience = myObjectParser.merge(experience, new _actions3.default(this.iVXjsLog).experienceActions);
            experience.experiencePath = experiencePath;

            if (!localTemplates) {
                utilities.addRemoteTemplates(dataFromServer, templateRef).then(function (configData) {
                    initializeExperience(configData);
                });
            } else {
                initializeExperience(dataFromServer);
            }

            function initializeExperience(configData) {
                firebase.auth().getRedirectResult().then(function (data) {
                    var redirectUser = data.user;


                    if (!createExperienceOnLoad) {
                        sendConfigData(configData);
                        return;
                    }

                    if (!redirectUser || !localStorage) {
                        createExperience(configData);
                    } else {
                        var _localStorage = localStorage,
                            redirectOrigin = _localStorage.redirectOrigin;

                        var exisitingExperienceData = JSON.parse(redirectOrigin);
                        var user = data.user,
                            crediential = data.crediential;


                        setUpExistingExperience(user, exisitingExperienceData, configData);
                    }
                }).catch(function (error) {
                    self.Bus.emit(firebaseConstants.ACCOUNT_EXISTS, error);
                    console.dir(error);
                    var errorMessage = {
                        message: 'Firebase couldn\'t authenticate with email, ' + error.email + ', due to error code ' + error.code + '. \n            You can handle this error by listening for event: ' + firebaseConstants.ACCOUNT_EXISTS + '.',
                        type: "FIREBASE:AUTHENTICATION"
                    };
                    iVXjsLog.error(errorMessage, "Firebase");
                });
            }

            function sendConfigData(configData) {
                var user = firebase.auth().currentUser;

                experience.src = src;
                experience.user = user;
                experience.iVXjsLog = self.iVXjsLog;

                var enhanced = {
                    config: configData,
                    experience: firebaseExperience,
                    rules: new _rules.Rules(experience, customRules).rules
                };

                resolve(enhanced);
            }

            function setUpExistingExperience(user, exisitingExperienceData, configData) {
                var key = exisitingExperienceData.key,
                    next = exisitingExperienceData.next;

                experience.key = key;
                experience.user = user;
                experience.iVXjsLog = self.iVXjsLog;

                self.Bus.once(new _iVXjsConfigEvents2.default().VALIDATED, function (iVXjs) {
                    iVXjs.experience.goToNextState({ next: next });
                });

                var enhanced = {
                    config: configData,
                    experience: firebaseExperience,
                    rules: new _rules.Rules(experience, customRules).rules
                };

                database.ref('users/' + user.uid).once('value').then(function (data) {

                    if (data.val() === null) {
                        var newUsers = {};

                        newUsers[user.uid] = {
                            email: user.email
                        };

                        database.ref('users').set(newUsers).then(function (userData) {
                            addExperienceToUser(user, key, resolve, enhanced);
                        });
                    } else {
                        var currentUserData = data.val();

                        currentUserData.uid = user.uid;

                        addExperienceToUser(currentUserData, key, resolve, enhanced);
                    }
                });
            }

            function createExperience(configData) {
                var user = firebase.auth().currentUser;
                var newExperienceData = {
                    src: src
                };
                var detokenedExperiencePath = utilities.detokenize(experiencePath, user, defaultExperience);
                var newExperienceKey = void 0;

                if (user) {
                    newExperienceData.user = {};
                    newExperienceData.user[user.uid] = true;
                    experience.user = user;
                }

                if (detokenedExperiencePath) {
                    newExperienceKey = firebase.database().ref(detokenedExperiencePath).push(newExperienceData).key;
                }

                experience.key = newExperienceKey;
                experience.auth = auth;
                experience.src = src;
                experience.iVXjsLog = self.iVXjsLog;

                var enhanced = {
                    config: configData,
                    experience: firebaseExperience,
                    rules: new _rules.Rules(experience, customRules).rules
                };

                if (user && detokenedExperiencePath) {
                    experience.user = user;

                    database.ref('users/' + user.uid).once('value').then(function (data) {
                        if (data.val() === null) {
                            (function () {
                                var newUsers = {};
                                var newUserData = {
                                    email: user.email,
                                    name: user.displayName,
                                    photoURL: user.photoURL,
                                    uid: user.uid
                                };
                                newUsers[user.uid] = newUserData;

                                database.ref('users').set(newUsers).then(function (userData) {
                                    addExperienceToUser(newUserData, newExperienceKey, resolve, enhanced);
                                });
                            })();
                        } else {
                            var currentUserDataFromServer = data.val();
                            var _currentUserDataFromS = currentUserDataFromServer.uid,
                                uid = _currentUserDataFromS === undefined ? user.uid : _currentUserDataFromS,
                                _currentUserDataFromS2 = currentUserDataFromServer.email,
                                email = _currentUserDataFromS2 === undefined ? user.email : _currentUserDataFromS2,
                                _currentUserDataFromS3 = currentUserDataFromServer.name,
                                name = _currentUserDataFromS3 === undefined ? user.displayName : _currentUserDataFromS3,
                                _currentUserDataFromS4 = currentUserDataFromServer.avatar,
                                avatar = _currentUserDataFromS4 === undefined ? user.photoURL : _currentUserDataFromS4,
                                _currentUserDataFromS5 = currentUserDataFromServer.experiences,
                                experiences = _currentUserDataFromS5 === undefined ? {} : _currentUserDataFromS5;

                            var currentUserData = {
                                uid: uid,
                                email: email,
                                name: name,
                                avatar: avatar,
                                experiences: experiences
                            };

                            addExperienceToUser(currentUserData, newExperienceKey, resolve, enhanced);
                        }
                    });

                    return;
                }

                resolve(enhanced);
            }

            function addExperienceToUser(userData, experienceKey, resolve, enhanced) {
                var _userData$experiences = userData.experiences,
                    experiences = _userData$experiences === undefined ? {} : _userData$experiences,
                    uid = userData.uid;


                delete userData.uid;

                experiences[experienceKey] = true;
                userData.experiences = experiences;
                database.ref('users/' + uid).update(userData);

                resolve(enhanced);
            }
        }
    }, {
        key: 'enhance',
        value: function enhance() {
            var self = this;
            var auth = self.auth,
                iVXjsSettings = self.iVXjsSettings,
                databaseURL = self.databaseURL;
            var config = iVXjsSettings.config;

            var database = firebase.database();
            var enhancePromise = new Promise(function (resolve, reject) {
                database.ref(config).once('value').then(function (data) {
                    self.setUpExperience(data.val(), config, resolve);
                });
            });

            return enhancePromise;
        }
    }]);

    return FirebaseData;
}();

module.export = initializeFirebase;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.data.firebase', initializeFirebase).provider('iVXjsFirebaseUtilities', function iVXjsFirebaseUtilitiesProvider() {
        this.utilities = new _utilities2.default();
        this.$get = function () {};
    });
}

function initializeFirebase(settings) {
    settings.module = FirebaseData;

    return settings;
};

},{"../../../constants/firebase.authentication.js":3,"../../../constants/iVXjs.config.events.js":6,"../../../constants/state.events.js":9,"../../../utilities/type-parsers.js":18,"../ivx-js/actions.js":15,"./actions.js":11,"./rules.js":13,"./utilities.js":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rules = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = require('../ivx-js/rules.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rules = exports.Rules = function (_DefaultRules) {
    _inherits(Rules, _DefaultRules);

    function Rules() {
        var experience = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: {} };
        var customRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        _classCallCheck(this, Rules);

        var _this = _possibleConstructorReturn(this, (Rules.__proto__ || Object.getPrototypeOf(Rules)).call(this, experience, customRules));

        _this.experience = experience;
        _this.customRules = customRules;
        return _this;
    }

    _createClass(Rules, [{
        key: 'processRules',
        value: function processRules() {
            var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var self = this;
            var stateSelect = navArray.find(function (navObj) {
                var isAuthRule = navObj.rule && navObj.rule.key && navObj.rule.key === 'auth';

                if (isAuthRule) {
                    return firebase.auth().currentUser;
                }

                return self.evaluateRules(navObj);
            });

            return stateSelect ? stateSelect : '';
        }
    }, {
        key: 'rules',
        get: function get() {
            var self = this;

            return function () {
                var navArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


                var customRuleStateId = self.customRules(navArray);

                if (customRuleStateId) {
                    return customRuleStateId;
                }

                var nextStateId = self.processRules(navArray).stateId;
                var nextState = self.experience.config.states.find(function (state, index) {
                    return nextStateId === state.id;
                });

                return nextStateId;
            };
        }
    }]);

    return Rules;
}(_rules.Rules);

},{"../ivx-js/rules.js":17}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = require("../../../utilities/type-parsers.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var objectParser = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "addRemoteTemplates",
        value: function addRemoteTemplates(configData, templateRef) {
            var templateLocations = this.templateLocations;

            var newConfigData = JSON.parse(JSON.stringify(configData));
            var states = newConfigData.states;

            var storage = firebase.storage();
            var storageRef = storage.ref('/');

            var templateUrlPromise = new Promise(function (resolve, reject) {
                var urlGetPromises = [];
                var urlPaths = [];

                states.forEach(function (state, stateIndex) {
                    var type = state.type;

                    var templateLocation = templateLocations[type];

                    templateLocation.forEach(function (path, index) {
                        if (typeValidator.isString(path)) {
                            var templateFile = objectParser.getValueFromPath(path, state);

                            if (templateFile) {
                                urlGetPromises.push(storageRef.child(templateFile).getDownloadURL());
                                urlPaths.push("states." + stateIndex + "." + path);
                            }
                        } else {
                            (function () {
                                var templatePath = path.path,
                                    _path$keys = path.keys,
                                    keys = _path$keys === undefined ? [] : _path$keys;

                                var keyData = state[templatePath];

                                pullFromTemplatesFromArrays(path, state, urlGetPromises, urlPaths, "states." + stateIndex);

                                keys.forEach(function (key, keyIndex) {
                                    if (Array.isArray(keyData)) {
                                        keyData.forEach(function (thisKeyData, index) {
                                            pullFromTemplatesFromArrays(key, thisKeyData, urlGetPromises, urlPaths, "states." + stateIndex + "." + templatePath + "." + keyIndex);
                                        });
                                    }
                                });
                            })();
                        }
                    });
                });

                Promise.all(urlGetPromises).then(function (result) {
                    newConfigData.templates = result;

                    $.support.cors = true;
                    $.get(result[0]).then(function (html) {
                        console.log(html);
                    });

                    resolve(newConfigData);
                }, function (error) {
                    console.dir(error);
                    reject(error);
                });
            });

            function pullFromTemplatesFromArrays(path, data, urlGetPromises, urlPaths, pathHeader) {
                var templatePath = path.path,
                    templateKey = path.templateKey,
                    _path$keys2 = path.keys,
                    keys = _path$keys2 === undefined ? [] : _path$keys2;

                var templateDataArray = objectParser.getValueFromPath(templatePath, data);

                if (!typeValidator.isEmpty(templateDataArray)) {
                    var updatedArray = templateDataArray.map(function (templateData, index) {
                        var templateFile = objectParser.getValueFromPath(templateKey, templateData);

                        if (templateFile) {
                            urlGetPromises.push(storageRef.child(templateFile).getDownloadURL());
                            urlPaths.push(pathHeader + "." + templatePath + "." + index + "." + templateKey);
                        }
                    });
                }
            }

            return templateUrlPromise;
        }
    }, {
        key: "detokenize",
        value: function detokenize(ref) {
            var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var experience = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var iVXjsLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console;
            var data = experience.data,
                experienceKey = experience.key;

            var _ref = user == null ? {} : user,
                uid = _ref.uid;

            var newRef = ref.replace(/\$uid/g, function (uidValue) {
                return uid ? uid : uidValue;
            }).replace(/\$x.key/g, function ($xKey) {
                return experienceKey ? experienceKey : $xKey;
            }).replace(/\$x.data.[a-z,A-Z,0-9]*/g, function (searchValue) {
                var dataValue = objectParser.getValueFromPath(searchValue, experience);
                var validValue = typeValidator.isString(dataValue) || typeValidator.isBoolean(dataValue) || typeValidator.isNumber(dataValue);
                if (validValue) {
                    return dataValue;
                } else {
                    iVXjsLog.warn(searchValue + " is invalid. Make sure this value is a String, Boolean, or Number.");
                    return searchValue;
                }
            });

            var hasUID = newRef.indexOf("$uid") >= 0;
            var hasExperienceKey = newRef.indexOf("$x.key") >= 0;
            var hasData = newRef.indexOf("$x.data") >= 0;
            var notValidDetokened = hasUID || hasExperienceKey || hasData;

            if (hasUID) {
                iVXjsLog.warn("This link can't be detokenized because this path because there is no Authorized User.");
            }

            if (hasExperienceKey) {
                iVXjsLog.warn("This link can't be detokenized because this path because there is no active experience.");
            }

            return notValidDetokened ? !notValidDetokened : newRef;
        }
    }, {
        key: "templateLocations",
        get: function get() {
            return {
                input: ["header.templateUrl", "footer.templateUrl", "form.labelTemplateUrl", "form.submit.labelTemplateUrl", {
                    path: "inputs",
                    templateKey: "labelTemplateUrl",
                    keys: [{
                        path: "buttons",
                        templateKey: "labelTemplateUrl"
                    }, {
                        path: "radioButtons",
                        templateKey: "labelTemplateUrl"
                    }]
                }],
                navigation: ["header.templateUrl", "footer.templateUrl", {
                    path: "links",
                    templateKey: "labelTemplateUrl"
                }],
                html: ["templateUrl"],
                video: ["header.templateUrl", "footer.templateUrl", {
                    path: "personalizations",
                    templateKey: "templateUrl"
                }]
            };
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../../../utilities/type-parsers.js":18}],15:[function(require,module,exports){
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

},{"../../../constants/audio.events.js":1,"../../../constants/state.events.js":9}],16:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":18}],17:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":18,"./evaluator.js":16}],18:[function(require,module,exports){
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

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2ZpcmViYXNlLmF1dGhlbnRpY2F0aW9uLmpzIiwic3JjL2NvbnN0YW50cy9maXJlYmFzZS5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL2ZpcmViYXNlLmpzIiwic3JjL2NvbnN0YW50cy9pVlhqcy5jb25maWcuZXZlbnRzLmpzIiwic3JjL2NvbnN0YW50cy9pVlhqcy5jb25maWcuanMiLCJzcmMvY29uc3RhbnRzL2luZGV4LmpzIiwic3JjL2NvbnN0YW50cy9zdGF0ZS5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9maXJlYmFzZS9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS9maXJlYmFzZS9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvZmlyZWJhc2UvcnVsZXMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2ZpcmViYXNlL3V0aWxpdGllcy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWpzL2FjdGlvbnMuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9ldmFsdWF0b3IuanMiLCJzcmMvbW9kdWxlcy9kYXRhL2l2eC1qcy9ydWxlcy5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUdWLFlBQUksYUFBYTtBQUNiLCtCQUFtQixtQkFETjtBQUViLHVCQUFZLFdBRkM7QUFHYixzQkFBVSxVQUhHO0FBSWIscUJBQVUsU0FKRztBQUtiLG1CQUFRLE9BTEs7QUFNYiwwQkFBYyxjQU5EO0FBT2Isa0JBQU0sTUFQTztBQVFiLG1CQUFPLE9B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LGlCQWJEO0FBY0gsYUFoQkQ7O0FBa0JBLG1CQUFPLFNBQVA7QUFDSDs7Ozs7O0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEF1ZGlvQ29uc3RhbnRzIGZyb20gXCIuL2F1ZGlvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQXVkaW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFNFRUs6IFwic2Vla1wiLFxuICAgICAgICAgICAgU0VUX1VQIDogXCJzZXQtdXBcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5BVURJTyA9IFwiYXVkaW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgICBsZXQge0RFTElNRVRFUiwgQVVESU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0FVRElPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBGaXJlYmFzZSBmcm9tIFwiLi9maXJlYmFzZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBGaXJlYmFzZXtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuQVVUSEVOVElDQVRJT04gPSBcImF1dGhcIlxuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgUkVRVUVTVF9QQVNTV09SRCA6IFwicmVxdWVzdC1wYXNzd29yZFwiLFxuICAgICAgICAgICAgR0VUX1BBU1NXT1JEIDogXCJnZXQtcGFzc3dvcmRcIixcbiAgICAgICAgICAgIEFDQ09VTlRfRVhJU1RTIDogXCJhY2NvdW50LWV4aXN0cy13aXRoLWRpZmZlcmVudC1jcmVkZW50aWFsXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBBVVRIRU5USUNBVElPTn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtBVVRIRU5USUNBVElPTn0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgRmlyZWJhc2UgZnJvbSBcIi4vZmlyZWJhc2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgRmlyZWJhc2V7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQ1JFQVRFX0VYUEVSSUVOQ0UgOiBcImNyZWF0ZS1leHBlcmllbmNlXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkZJUkVCQVNFID0gXCJmaXJlYmFzZVwiO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oKXtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsIEZJUkVCQVNFfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtGSVJFQkFTRX1gOyAgIFxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25maWdDb25zdGFudHMgZnJvbSBcIi4vaVZYanMuY29uZmlnLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uZmlnQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBWQUxJREFURUQgOiBcInZhbGlkYXRlZFwiLFxuICAgICAgICAgICAgTk9UX1ZBTElEIDogXCJub3QtdmFsaWRcIixcbiAgICAgICAgICAgIEFOQUxZVElDU19TRVQgOiBcImFuYWx5dGljcy1zZXRcIixcbiAgICAgICAgICAgIEFOQUxZVElDU19GSU5JU0hFRCA6IFwiYW5hbHl0aWNzLWZpbmlzaGVkXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkNPTkZJRyA9IFwiY29uZmlnXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgQ09ORklHfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtDT05GSUd9YDsgICBcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuTElCUkFSWSA9IFwiaVZYanNcIjtcbiAgICAgICAgdGhpcy5ERUxJTUVURVIgPSBcIjpcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLkxJQlJBUlk7XG4gICAgfVxuXG4gICAgYWRkTmFtZXMobmFtZUNvbGxlY3Rpb24pe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBuYW1lcyA9IE9iamVjdC5rZXlzKG5hbWVDb2xsZWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUsIGluZGV4KSA9PntcbiAgICAgICAgICAgIHNlbGZbbmFtZV0gPSBzZWxmLmNvbnZlbnRpb24obmFtZUNvbGxlY3Rpb25bbmFtZV0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNTdGF0ZUNvbnN0YW50cyBmcm9tIFwiLi9zdGF0ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc1N0YXRlQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBDSEFOR0UgOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgU1VDQ0VTUyA6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgRVJST1IgOiBcImVycm9yXCIsXG4gICAgICAgICAgICBHTyA6IFwiZ29cIixcbiAgICAgICAgICAgIE5PVF9GT1VORCA6IFwibm90LWZvdW5kXCIsXG4gICAgICAgICAgICBHRVRfU1RBVEUgOiBcImdldC1zdGF0ZVwiLFxuICAgICAgICAgICAgUkVRVUVTVF9TVEFURSA6IFwicmVxdWVzdC1zdGF0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5TVEFURSA9IFwic3RhdGVcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBTVEFURX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7U1RBVEV9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IEZpcmViYXNlQXV0aGVudGljYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy9maXJlYmFzZS5hdXRoZW50aWNhdGlvbi5qc1wiO1xuaW1wb3J0IEZpcmViYXNlRXZlbnRzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvZmlyZWJhc2UuZXZlbnRzLmpzXCI7XG5pbXBvcnQge09iamVjdFBhcnNlcnMsIFR5cGVWYWxpZGF0b3J9IGZyb20gXCIuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzXCI7XG5pbXBvcnQgU3RhdGVFdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvc3RhdGUuZXZlbnRzLmpzXCI7XG5pbXBvcnQgRmlyZWJhc2VVdGlsaXRpZXMgZnJvbSBcIi4vdXRpbGl0aWVzLmpzXCI7XG5cbmxldCBvYmplY3RQYXJzZXIgPSBuZXcgT2JqZWN0UGFyc2VycygpO1xubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xubGV0IHV0aWxpdGllcyA9IG5ldyBGaXJlYmFzZVV0aWxpdGllcygpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoaVZYanNMb2cpIHtcbiAgICAgICAgdGhpcy5pVlhqc0xvZyA9IGlWWGpzTG9nO1xuICAgICAgICB0aGlzLmF1dGhDb25zdGFudHMgPSBuZXcgRmlyZWJhc2VBdXRoZW50aWNhdGlvbigpO1xuICAgICAgICB0aGlzLnN0YXRlRXZlbnROYW1lcyA9IG5ldyBTdGF0ZUV2ZW50TmFtZXMoKTtcbiAgICAgICAgdGhpcy5ldmVudENvbnN0YW50cyA9IG5ldyBGaXJlYmFzZUV2ZW50cygpO1xuICAgICAgIFxuICAgIH1cblxuICAgIGdldCBleHBlcmllbmNlQWN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGF1dGhvcml6ZVVzZXI6IHRoaXMuYXV0aG9yaXplVXNlcixcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzOiB0aGlzLmV2ZW50TGlzdGVuZXJzLFxuICAgICAgICAgICAgc2lnbkluVXNlcjogdGhpcy5zaWduSW5Vc2VyLFxuICAgICAgICAgICAgc2lnbk91dFVzZXI6IHRoaXMuc2lnbk91dFVzZXIsXG4gICAgICAgICAgICBzaWduSW5XaXRoR29vZ2xlOiB0aGlzLnNpZ25JbldpdGhHb29nbGUsXG4gICAgICAgICAgICBzaWduSW5XaXRoRmFjZWJvb2s6IHRoaXMuc2lnbkluV2l0aEZhY2Vib29rLFxuICAgICAgICAgICAgc2lnbkluV2l0aFR3aXR0ZXI6IHRoaXMuc2lnbkluV2l0aFR3aXR0ZXIsXG4gICAgICAgICAgICBzaWduSW5XaXRoRW1haWw6IHRoaXMuc2lnbkluV2l0aEVtYWlsLFxuICAgICAgICAgICAgc2lnbkluV2l0aEdpdGh1YjogdGhpcy5zaWduSW5XaXRoR2l0aHViLFxuICAgICAgICAgICAgc2lnbkluQW5vbnltb3VzbHk6IHRoaXMuc2lnbkluQW5vbnltb3VzbHksXG4gICAgICAgICAgICBoYW5kbGVSZWRpcmVjdDogdGhpcy5oYW5kbGVSZWRpcmVjdCxcbiAgICAgICAgICAgIHNldFVwVXNlcnM6IHRoaXMuc2V0VXBVc2VycyxcbiAgICAgICAgICAgIHNldERhdGE6IHRoaXMuc2V0RGF0YSxcbiAgICAgICAgICAgIGF1dGhDb25zdGFudHM6IHRoaXMuYXV0aENvbnN0YW50cyxcbiAgICAgICAgICAgIHN0YXRlRXZlbnROYW1lczogdGhpcy5zdGF0ZUV2ZW50TmFtZXMsXG4gICAgICAgICAgICB1cGxvYWRGaWxlOiB0aGlzLnVwbG9hZEZpbGUsXG4gICAgICAgICAgICBpc1Jlc3RyaWN0ZWQ6IHRoaXMuaXNSZXN0cmljdGVkLFxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnM6IHRoaXMuYWRkRXZlbnRMaXN0bmVycyxcbiAgICAgICAgICAgIGNyZWF0ZUV4cGVyaWVuY2U6IHRoaXMuY3JlYXRlRXhwZXJpZW5jZSxcbiAgICAgICAgICAgIGdldEV4dGVybmFsVGVtcGxhdGVzOiB0aGlzLmdldEV4dGVybmFsVGVtcGxhdGVzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRFeHRlcm5hbFRlbXBsYXRlcyh0ZW1wbGF0ZVBhdGgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxUZW1wbGF0ZXMgfHwgIXRlbXBsYXRlUGF0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdG9yYWdlID0gZmlyZWJhc2Uuc3RvcmFnZSgpO1xuICAgICAgICB2YXIgcGF0aFJlZmVyZW5jZSA9IHN0b3JhZ2UucmVmKHRlbXBsYXRlUGF0aCk7XG5cbiAgICAgICAgcmV0dXJuIHBhdGhSZWZlcmVuY2UuZ2V0RG93bmxvYWRVUkwoKTtcbiAgICB9XG5cbiAgICB1cGxvYWRGaWxlKGZpbGUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xuICAgICAgICBsZXQge25hbWU6IGZpbGVOYW1lfSA9IGZpbGU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBsZXQge3VpZH0gPSBjdXJyZW50VXNlcjtcbiAgICAgICAgICAgIHZhciBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZihgLyR7dWlkfS8ke2ZpbGVOYW1lfWApO1xuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBzdG9yYWdlUmVmLnB1dChmaWxlKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjcmVhdGVFeHBlcmllbmNlKGV2ZW50T2JqKSB7XG4gICAgICAgIGxldCB7ZGF0YTpkZWZhdWx0RGF0YSA9IHt9fSA9IGV2ZW50T2JqO1xuICAgICAgICBsZXQge2V4cGVyaWVuY2VQYXRoLCBkYXRhLCBzcmN9ID0gdGhpcztcbiAgICAgICAgbGV0IGRhdGFiYXNlID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgY3JlYXRlRXhwZXJpZW5jZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHNlbGYuQnVzLm9uY2Uoc2VsZi5zdGF0ZUV2ZW50TmFtZXMuR0VUX1NUQVRFLCAoY3VycmVudFN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdERhdGEuc3JjID0gc3JjO1xuICAgICAgICAgICAgICAgIGRlZmF1bHREYXRhLnN0YXRlU3JjID0gY3VycmVudFN0YXRlLmRhdGEuaWQ7ICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZURhdGEgPSBjdXJyZW50U3RhdGUuZGF0YTtcbiAgICAgICAgICAgICAgICBsZXQgZGV0b2tlbmVkUGF0aCA9IHV0aWxpdGllcy5kZXRva2VuaXplKGV4cGVyaWVuY2VQYXRoLCBzZWxmLnVzZXIsIHNlbGYsIHNlbGYuaVZYanNMb2cpO1xuICAgICAgICAgICAgICAgIGxldCB7Y3VycmVudFVzZXJ9ID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFVzZXIpeyBcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERhdGEudXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERhdGEudXNlcltjdXJyZW50VXNlci51aWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IG5ld0V4cGVyaWVuY2VLZXkgPSBkYXRhYmFzZS5yZWYodXRpbGl0aWVzLmRldG9rZW5pemUoZXhwZXJpZW5jZVBhdGgsIHNlbGYudXNlciwgc2VsZiwgc2VsZi5pVlhqc0xvZykpLnB1c2goZGVmYXVsdERhdGEpLmtleTtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRDb25zdGFudHMgPSBuZXcgRmlyZWJhc2VFdmVudHMoKTtcblxuICAgICAgICAgICAgICAgIHNlbGYua2V5ID0gbmV3RXhwZXJpZW5jZUtleTtcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEgPSBkZWZhdWx0RGF0YTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB7dWlkfSA9IGN1cnJlbnRVc2VyO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnJlZihgdXNlcnMvJHt1aWR9YCkub25jZSgndmFsdWUnKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQge2V4cGVyaWVuY2VzfSA9IGRhdGEudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV4cGVyaWVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0V4cGVyaWVuY2UgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0V4cGVyaWVuY2VbbmV3RXhwZXJpZW5jZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnJlZihgdXNlcnMvJHt1aWR9YCkudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZXM6IG5ld0V4cGVyaWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZXNbbmV3RXhwZXJpZW5jZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnJlZihgdXNlcnMvJHt1aWR9YCkudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJpZW5jZXM6IGV4cGVyaWVuY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5CdXMuZW1pdChldmVudENvbnN0YW50cy5DUkVBVEVfRVhQRVJJRU5DRSwgZGF0YSwgbmV3RXhwZXJpZW5jZUtleSwgY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3RXhwZXJpZW5jZUtleSwgY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGV2ZW50Q29uc3RhbnRzLkNSRUFURV9FWFBFUklFTkNFLCBkYXRhLCBuZXdFeHBlcmllbmNlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXdFeHBlcmllbmNlS2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLkJ1cy5lbWl0KHNlbGYuc3RhdGVFdmVudE5hbWVzLlJFUVVFU1RfU1RBVEUpO1xuXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUV4cGVyaWVuY2VQcm9taXNlO1xuXG4gICAgfVxuXG4gICAgaXNSZXN0cmljdGVkKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSghdXNlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzaWduT3V0VXNlcigpIHtcbiAgICAgICAgbGV0IGZpcmViYXNlQXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlQXV0aC5zaWduT3V0KCk7XG4gICAgfVxuXG4gICAgc2lnbkluV2l0aEdpdGh1YihhcmdzLCByZXNvbHZlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR2l0aHViQXV0aFByb3ZpZGVyKCk7XG4gICAgICAgIGxldCB7a2V5OiBleHBlcmllbmNlS2V5fSA9IHRoaXM7XG4gICAgICAgIGxldCBmaXJlYmFzZUF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICAgICAgdGhpcy5CdXMub25jZSh0aGlzLnN0YXRlRXZlbnROYW1lcy5HRVRfU1RBVEUsIChjdXJyZW50U3RhdGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0ZURhdGEgPSBjdXJyZW50U3RhdGUuZGF0YTtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlUmVkaXJlY3Qoc3RhdGVEYXRhLCBwcm92aWRlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuQnVzLmVtaXQodGhpcy5zdGF0ZUV2ZW50TmFtZXMuUkVRVUVTVF9TVEFURSk7XG4gICAgfVxuXG4gICAgc2lnbkluQW5vbnltb3VzbHkoYXJncywgcmVzb2x2ZSkge1xuICAgICAgICBsZXQge2tleTogZXhwZXJpZW5jZUtleX0gPSB0aGlzO1xuICAgICAgICBsZXQgZmlyZWJhc2VBdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgICAgIGZpcmViYXNlQXV0aC5zaWduSW5Bbm9ueW1vdXNseSgpLmNhdGNoKChlcnJvcikgPT4ge1xuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBoYW5kbGVSZWRpcmVjdChzdGF0ZURhdGEsIHByb3ZpZGVyLCBhcmdzKSB7XG4gICAgICAgIGxldCB7c2NvcGUgPSBbXX0gPSBhcmdzO1xuXG4gICAgICAgIHNjb3BlLmZvckVhY2goKHRoaXNTY29wZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm92aWRlci5hZGRTY29wZSkge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLmFkZFNjb3BlKHRoaXNTY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHN0YXRlRGF0YS5rZXkgPSB0aGlzLmtleTtcblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVkaXJlY3RPcmlnaW4gPSBKU09OLnN0cmluZ2lmeShzdGF0ZURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhSZWRpcmVjdChwcm92aWRlcik7XG4gICAgfVxuXG4gICAgc2lnbkluV2l0aEdvb2dsZShhcmdzLCByZXNvbHZlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHtrZXk6IGV4cGVyaWVuY2VLZXl9ID0gdGhpcztcbiAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XG4gICAgICAgIGxldCBuZXdFeHBlcmllbmNlID0ge307XG4gICAgICAgIG5ld0V4cGVyaWVuY2VbZXhwZXJpZW5jZUtleV0gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuQnVzLm9uY2UodGhpcy5zdGF0ZUV2ZW50TmFtZXMuR0VUX1NUQVRFLCAoY3VycmVudFN0YXRlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdGVEYXRhID0gY3VycmVudFN0YXRlLmRhdGE7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZVJlZGlyZWN0KHN0YXRlRGF0YSwgcHJvdmlkZXIsIGFyZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLkJ1cy5lbWl0KHRoaXMuc3RhdGVFdmVudE5hbWVzLlJFUVVFU1RfU1RBVEUpO1xuICAgIH1cblxuICAgIHNpZ25JbldpdGhUd2l0dGVyKGFyZ3MsIHJlc29sdmUpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Ud2l0dGVyQXV0aFByb3ZpZGVyKCk7XG4gICAgICAgIGxldCB7a2V5OiBleHBlcmllbmNlS2V5fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5CdXMub25jZSh0aGlzLnN0YXRlRXZlbnROYW1lcy5HRVRfU1RBVEUsIChjdXJyZW50U3RhdGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0ZURhdGEgPSBjdXJyZW50U3RhdGUuZGF0YTtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlUmVkaXJlY3Qoc3RhdGVEYXRhLCBwcm92aWRlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuQnVzLmVtaXQodGhpcy5zdGF0ZUV2ZW50TmFtZXMuUkVRVUVTVF9TVEFURSk7XG5cblxuICAgIH1cblxuICAgIHNpZ25JbldpdGhGYWNlYm9vayhhcmdzLCByZXNvbHZlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguRmFjZWJvb2tBdXRoUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IHtrZXk6IGV4cGVyaWVuY2VLZXl9ID0gdGhpcztcblxuICAgICAgICB0aGlzLkJ1cy5vbmNlKHRoaXMuc3RhdGVFdmVudE5hbWVzLkdFVF9TVEFURSwgKGN1cnJlbnRTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXRlRGF0YSA9IGN1cnJlbnRTdGF0ZS5kYXRhO1xuICAgICAgICAgICAgc2VsZi5oYW5kbGVSZWRpcmVjdChzdGF0ZURhdGEsIHByb3ZpZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5CdXMuZW1pdCh0aGlzLnN0YXRlRXZlbnROYW1lcy5SRVFVRVNUX1NUQVRFKTtcbiAgICB9XG5cbiAgICBzZXRVcFVzZXJzKHVzZXIsIGV4cGVyaWVuY2VLZXksIHJlc29sdmUpIHtcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1c2VyLnVpZCkudXBkYXRlKHtcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsXG4gICAgICAgIH0pO1xuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVzZXIudWlkICsgJy9leHBlcmllbmNlcy8nICsgZXhwZXJpZW5jZUtleSkuc2V0KHRydWUpO1xuXG4gICAgICAgIHJlc29sdmUodXNlcik7XG4gICAgfVxuXG4gICAgc2lnbkluV2l0aEVtYWlsKGFyZ3MsIHJlc29sdmUpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQge2tleTogZXhwZXJpZW5jZUtleX0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuQnVzLm9uY2UodGhpcy5hdXRoQ29uc3RhbnRzLkdFVF9QQVNTV09SRCwgZ2V0UGFzc3dvcmQpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBhc3N3b3JkKHBhc3N3b3JkKSB7XG4gICAgICAgICAgICBsZXQge2VtYWlsS2V5fSA9IGFyZ3M7XG4gICAgICAgICAgICBsZXQge2RhdGF9ID0gc2VsZjtcbiAgICAgICAgICAgIGxldCBlbWFpbCA9IGRhdGFbZW1haWxLZXldO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0VXBVc2VycyhyZXN1bHQsIGV4cGVyaWVuY2VLZXksIHJlc29sdmUpO1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAvLyAuLi5cblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5jb2RlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuQnVzLmVtaXQodGhpcy5hdXRoQ29uc3RhbnRzLlJFUVVFU1RfUEFTU1dPUkQpO1xuICAgIH1cblxuICAgIHNpZ25JblVzZXIoc2lnbkluVHlwZSwgYXJncywgcmVzb2x2ZSkge1xuICAgICAgICBzd2l0Y2ggKHNpZ25JblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJnb29nbGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25JbldpdGhHb29nbGUoYXJncywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImVtYWlsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduSW5XaXRoRW1haWwoYXJncywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImZhY2Vib29rXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduSW5XaXRoRmFjZWJvb2soYXJncywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcInR3aXR0ZXJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25JbldpdGhUd2l0dGVyKGFyZ3MsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJnaXRodWJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25JbldpdGhHaXRodWIoYXJncywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImFub255bW91c1wiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbkluQW5vbnltb3VzbHkoYXJncywgcmVzb2x2ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKCk7XG5cbiAgICB9XG5cblxuICAgIGF1dGhvcml6ZVVzZXIoZXZlbnRPYmopIHtcbiAgICAgICAgbGV0IHthdXRoVHlwZX0gPSBldmVudE9iajtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQge2tleTogZXhwZXJpZW5jZUtleX0gPSBzZWxmO1xuICAgICAgICBsZXQgYXV0aFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHt1aWQsIGVtYWlsID0gXCJcIiwgZGlzcGxheU5hbWV9ID0gdXNlcjtcblxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVzZXIudWlkKS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGVyaWVuY2VLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB1c2Vycy8ke3VzZXIudWlkfS9leHBlcmllbmNlcy8ke2V4cGVyaWVuY2VLZXl9YCkuc2V0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVzZXIgPSB7IHVpZCwgZW1haWwsIGRpc3BsYXlOYW1lIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNpZ25JblVzZXIoYXV0aFR5cGUsIGV2ZW50T2JqLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGF1dGhQcm9taXNlO1xuICAgIH1cblxuICAgIHNldERhdGEoZXZlbnRPYmopIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZGF0YWJhc2UgPSBmaXJlYmFzZS5kYXRhYmFzZSgpO1xuICAgICAgICBsZXQge2RhdGEgPSB7fSwga2V5OiBleHBlcmllbmNlS2V5LCBhdXRoLCBpVlhqc0xvZywgZXhwZXJpZW5jZVBhdGh9ID0gc2VsZjtcbiAgICAgICAgbGV0IHtrZXksIHZhbHVlLCByZWYsIHVzZXIgPSBmYWxzZX0gPSBldmVudE9iajtcbiAgICAgICAgbGV0IHVwZGF0ZURhdGEgPSB7fTtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xuICAgICAgICBsZXQgcmVmUGF0aCA9IHV0aWxpdGllcy5kZXRva2VuaXplKGAke2V4cGVyaWVuY2VQYXRofS8keC5rZXlgLCBzZWxmLnVzZXIsIHNlbGYsIGlWWGpzTG9nKTtcblxuXG4gICAgICAgIGlmICghcmVmICYmICFleHBlcmllbmNlS2V5ICYmICF1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWN1cnJlbnRVc2VyICYmIHVzZXIpIHtcbiAgICAgICAgICAgIGlWWGpzTG9nLndhcm4oYEF1dGhvcml6YXRpb24gUmVxdWlyZWQuIEtleTogJHtrZXl9IFZhbHVlOiAke3ZhbHVlfSB3YXMgbm90IHNhdmVkIHRvIHRoZSBGaXJlYmFzZSBEYXRhYmFzZS5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZURhdGFba2V5XSA9IHZhbHVlO1xuXG4gICAgICAgIGlmIChjdXJyZW50VXNlciAmJiB1c2VyKSB7XG4gICAgICAgICAgICBsZXQge3VpZH0gPSBjdXJyZW50VXNlcjtcblxuICAgICAgICAgICAgcmV0dXJuIGRhdGFiYXNlLnJlZihgdXNlcnMvJHt1aWR9YClcbiAgICAgICAgICAgICAgICAudXBkYXRlKHVwZGF0ZURhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgICAgbGV0IGRldG9rZW5lZFJlZiA9IHV0aWxpdGllcy5kZXRva2VuaXplKHJlZiwgc2VsZi51c2VyLCBzZWxmLCBpVlhqc0xvZyk7XG5cbiAgICAgICAgICAgIGlmIChkZXRva2VuZWRSZWYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YWJhc2UucmVmKGRldG9rZW5lZFJlZilcbiAgICAgICAgICAgICAgICAgICAgLnVwZGF0ZSh1cGRhdGVEYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWZQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YWJhc2UucmVmKHJlZlBhdGgpLnVwZGF0ZSh1cGRhdGVEYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IHJlc29sdmUoKSB9KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xuaW1wb3J0IENvbmZpZ0V2ZW50TmFtZXMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2lWWGpzLmNvbmZpZy5ldmVudHMuanMnO1xuaW1wb3J0IFN0YXRlRXZlbnROYW1lcyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RhdGUuZXZlbnRzLmpzJztcbmltcG9ydCBGaXJlYmFzZUF1dGhlbnRpY2F0aW9uIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maXJlYmFzZS5hdXRoZW50aWNhdGlvbi5qcyc7XG5pbXBvcnQgeyBBY3Rpb25zIGFzIGlWWGpzQWN0aW9ucyB9IGZyb20gJy4uL2l2eC1qcy9hY3Rpb25zLmpzJztcbmltcG9ydCB7IFJ1bGVzIGFzIEZpcmViYXNlUnVsZXMgfSBmcm9tICcuL3J1bGVzLmpzJztcbmltcG9ydCBGaXJlYmFzZVV0aWxpdGllcyBmcm9tIFwiLi91dGlsaXRpZXMuanNcIjtcbmltcG9ydCBBY3Rpb25zIGZyb20gXCIuL2FjdGlvbnMuanNcIjtcblxubGV0IGRlZmF1bHRBY3Rpb25zID0gbmV3IGlWWGpzQWN0aW9ucygpO1xubGV0IG15T2JqZWN0UGFyc2VyID0gbmV3IE9iamVjdFBhcnNlcnMoKTtcbmxldCB1dGlsaXRpZXMgPSBuZXcgRmlyZWJhc2VVdGlsaXRpZXMoKTtcblxuZXhwb3J0IGNsYXNzIEZpcmViYXNlRGF0YSB7XG4gICAgY29uc3RydWN0b3IobW9kdWxlU2V0dGluZ3MgPSB7fSwgaVZYanNTZXR0aW5ncyA9IHt9LCBCdXMsIGlWWGpzTG9nKSB7XG4gICAgICAgIGxldCB7ZGF0YSwgZXhwZXJpZW5jZTogZGVmYXVsdEV4cGVyaWVuY2V9ID0gaVZYanNTZXR0aW5ncztcbiAgICAgICAgbGV0IHtkYXRhOiBkZWZhdWx0RXhwZXJpZW5jZURhdGEgPSB7fX0gPSBkZWZhdWx0RXhwZXJpZW5jZTtcbiAgICAgICAgbGV0IHthcGlLZXksIGF1dGhEb21haW4sIGRhdGFiYXNlVVJMLCBzdG9yYWdlQnVja2V0LCBhdXRoID0gZmFsc2UsIGNyZWF0ZUV4cGVyaWVuY2VPbkxvYWQgPSB0cnVlLCBleHBlcmllbmNlUGF0aCA9IFwiZXhwZXJpZW5jZXNcIiwgbG9jYWxUZW1wbGF0ZXMgPSBmYWxzZSwgdGVtcGxhdGVSZWZ9ID0gZGF0YTtcblxuICAgICAgICB0aGlzLmlWWGpzU2V0dGluZ3MgPSBpVlhqc1NldHRpbmdzO1xuICAgICAgICB0aGlzLkJ1cyA9IEJ1cztcbiAgICAgICAgdGhpcy5pVlhqc0xvZyA9IGlWWGpzTG9nO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgRmlyZWJhc2VcbiAgICAgICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogYXBpS2V5LFxuICAgICAgICAgICAgYXV0aERvbWFpbjogYXV0aERvbWFpbixcbiAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBkYXRhYmFzZVVSTCxcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IHN0b3JhZ2VCdWNrZXRcbiAgICAgICAgfTtcblxuICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICAgICAgdGhpcy5kYXRhYmFzZVVSTCA9IGRhdGFiYXNlVVJMO1xuICAgICAgICB0aGlzLmZpcmViYXNlQ29uc3RhbnRzID0gbmV3IEZpcmViYXNlQXV0aGVudGljYXRpb24oKTtcbiAgICAgICAgdGhpcy5jcmVhdGVFeHBlcmllbmNlT25Mb2FkID0gY3JlYXRlRXhwZXJpZW5jZU9uTG9hZDtcbiAgICAgICAgdGhpcy5leHBlcmllbmNlUGF0aCA9IGV4cGVyaWVuY2VQYXRoO1xuICAgICAgICB0aGlzLmxvY2FsVGVtcGxhdGVzID0gbG9jYWxUZW1wbGF0ZXM7XG4gICAgICAgIHRoaXMuZGVmYXVsdEV4cGVyaWVuY2UgPSBkZWZhdWx0RXhwZXJpZW5jZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVJlZiA9IHRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIHNldFVwRXhwZXJpZW5jZShkYXRhRnJvbVNlcnZlciwgc3JjLCByZXNvbHZlKSB7XG4gICAgICAgIGxldCB7YXV0aCwgY3JlYXRlRXhwZXJpZW5jZU9uTG9hZCwgZGVmYXVsdEV4cGVyaWVuY2V9ID0gdGhpcztcbiAgICAgICAgbGV0IHtleHBlcmllbmNlUGF0aCwgbG9jYWxUZW1wbGF0ZXMsIHRlbXBsYXRlUmVmfSA9IHRoaXM7XG4gICAgICAgIGxldCB7ZmlyZWJhc2VDb25zdGFudHMsIGlWWGpzTG9nfSA9IHRoaXM7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGRhdGFiYXNlID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcbiAgICAgICAgbGV0IHtleHBlcmllbmNlOiBtb2RpZmllZEV4cGVyaWVuY2UgPSB7fSwgcnVsZXM6IGN1c3RvbVJ1bGVzLCB1aSA9ICdkZWZhdWx0JywgdmFsaWRhdGlvbiA9ICdpVlhqc1ZhbGlkYXRpb24nfSA9IHRoaXMuaVZYanNTZXR0aW5ncztcbiAgICAgICAgbGV0IGV4cGVyaWVuY2UgPSBteU9iamVjdFBhcnNlci5tZXJnZShuZXcgaVZYanNBY3Rpb25zKCksIG1vZGlmaWVkRXhwZXJpZW5jZSk7XG4gICAgICAgIGxldCBmaXJlYmFzZUV4cGVyaWVuY2UgPSBteU9iamVjdFBhcnNlci5tZXJnZShleHBlcmllbmNlLCBuZXcgQWN0aW9ucyh0aGlzLmlWWGpzTG9nKS5leHBlcmllbmNlQWN0aW9ucyk7XG4gICAgICAgIGV4cGVyaWVuY2UuZXhwZXJpZW5jZVBhdGggPSBleHBlcmllbmNlUGF0aDtcblxuICAgICAgICBpZiAoIWxvY2FsVGVtcGxhdGVzKSB7XG4gICAgICAgICAgICB1dGlsaXRpZXMuYWRkUmVtb3RlVGVtcGxhdGVzKGRhdGFGcm9tU2VydmVyLCB0ZW1wbGF0ZVJlZilcbiAgICAgICAgICAgIC50aGVuKChjb25maWdEYXRhKSA9PntcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplRXhwZXJpZW5jZShjb25maWdEYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgaW5pdGlhbGl6ZUV4cGVyaWVuY2UoZGF0YUZyb21TZXJ2ZXIpO1xuXG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUV4cGVyaWVuY2UoY29uZmlnRGF0YSkge1xuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLmdldFJlZGlyZWN0UmVzdWx0KCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB7dXNlcjogcmVkaXJlY3RVc2VyfSA9IGRhdGE7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZUV4cGVyaWVuY2VPbkxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZENvbmZpZ0RhdGEoY29uZmlnRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlZGlyZWN0VXNlciB8fCAhbG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGVyaWVuY2UoY29uZmlnRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtyZWRpcmVjdE9yaWdpbn0gPSBsb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBleGlzaXRpbmdFeHBlcmllbmNlRGF0YSA9IEpTT04ucGFyc2UocmVkaXJlY3RPcmlnaW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQge3VzZXIsIGNyZWRpZW50aWFsfSA9IGRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VXBFeGlzdGluZ0V4cGVyaWVuY2UodXNlciwgZXhpc2l0aW5nRXhwZXJpZW5jZURhdGEsIGNvbmZpZ0RhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkJ1cy5lbWl0KGZpcmViYXNlQ29uc3RhbnRzLkFDQ09VTlRfRVhJU1RTLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBGaXJlYmFzZSBjb3VsZG4ndCBhdXRoZW50aWNhdGUgd2l0aCBlbWFpbCwgJHtlcnJvci5lbWFpbH0sIGR1ZSB0byBlcnJvciBjb2RlICR7ZXJyb3IuY29kZX0uIFxuICAgICAgICAgICAgWW91IGNhbiBoYW5kbGUgdGhpcyBlcnJvciBieSBsaXN0ZW5pbmcgZm9yIGV2ZW50OiAke2ZpcmViYXNlQ29uc3RhbnRzLkFDQ09VTlRfRVhJU1RTfS5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJGSVJFQkFTRTpBVVRIRU5USUNBVElPTlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaVZYanNMb2cuZXJyb3IoZXJyb3JNZXNzYWdlLCBcIkZpcmViYXNlXCIpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNlbmRDb25maWdEYXRhKGNvbmZpZ0RhdGEpIHtcbiAgICAgICAgICAgIGxldCB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xuXG4gICAgICAgICAgICBleHBlcmllbmNlLnNyYyA9IHNyYztcbiAgICAgICAgICAgIGV4cGVyaWVuY2UudXNlciA9IHVzZXI7XG4gICAgICAgICAgICBleHBlcmllbmNlLmlWWGpzTG9nID0gc2VsZi5pVlhqc0xvZztcblxuICAgICAgICAgICAgbGV0IGVuaGFuY2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICAgICAgICAgICAgICBleHBlcmllbmNlOiBmaXJlYmFzZUV4cGVyaWVuY2UsXG4gICAgICAgICAgICAgICAgcnVsZXM6IG5ldyBGaXJlYmFzZVJ1bGVzKGV4cGVyaWVuY2UsIGN1c3RvbVJ1bGVzKS5ydWxlcyxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShlbmhhbmNlZClcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0VXBFeGlzdGluZ0V4cGVyaWVuY2UodXNlciwgZXhpc2l0aW5nRXhwZXJpZW5jZURhdGEsIGNvbmZpZ0RhdGEpIHtcbiAgICAgICAgICAgIGxldCB7a2V5LCBuZXh0fSA9IGV4aXNpdGluZ0V4cGVyaWVuY2VEYXRhO1xuICAgICAgICAgICAgZXhwZXJpZW5jZS5rZXkgPSBrZXk7XG4gICAgICAgICAgICBleHBlcmllbmNlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgZXhwZXJpZW5jZS5pVlhqc0xvZyA9IHNlbGYuaVZYanNMb2c7XG5cbiAgICAgICAgICAgIHNlbGYuQnVzLm9uY2UobmV3IENvbmZpZ0V2ZW50TmFtZXMoKS5WQUxJREFURUQsIChpVlhqcykgPT4ge1xuICAgICAgICAgICAgICAgIGlWWGpzLmV4cGVyaWVuY2UuZ29Ub05leHRTdGF0ZSh7IG5leHQgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGVuaGFuY2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICAgICAgICAgICAgICBleHBlcmllbmNlOiBmaXJlYmFzZUV4cGVyaWVuY2UsXG4gICAgICAgICAgICAgICAgcnVsZXM6IG5ldyBGaXJlYmFzZVJ1bGVzKGV4cGVyaWVuY2UsIGN1c3RvbVJ1bGVzKS5ydWxlcyxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YWJhc2UucmVmKGB1c2Vycy8ke3VzZXIudWlkfWApLm9uY2UoJ3ZhbHVlJykudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsKCkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1VzZXJzID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3VXNlcnNbdXNlci51aWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS5yZWYoYHVzZXJzYCkuc2V0KG5ld1VzZXJzKS50aGVuKCh1c2VyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkRXhwZXJpZW5jZVRvVXNlcih1c2VyLCBrZXksIHJlc29sdmUsIGVuaGFuY2VkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVc2VyRGF0YSA9IGRhdGEudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXJEYXRhLnVpZCA9IHVzZXIudWlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZEV4cGVyaWVuY2VUb1VzZXIoY3VycmVudFVzZXJEYXRhLCBrZXksIHJlc29sdmUsIGVuaGFuY2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXhwZXJpZW5jZShjb25maWdEYXRhKSB7XG4gICAgICAgICAgICBsZXQgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlcjtcbiAgICAgICAgICAgIGxldCBuZXdFeHBlcmllbmNlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBzcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgZGV0b2tlbmVkRXhwZXJpZW5jZVBhdGggPSB1dGlsaXRpZXMuZGV0b2tlbml6ZShleHBlcmllbmNlUGF0aCwgdXNlciwgZGVmYXVsdEV4cGVyaWVuY2UpO1xuICAgICAgICAgICAgbGV0IG5ld0V4cGVyaWVuY2VLZXk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgbmV3RXhwZXJpZW5jZURhdGEudXNlciA9IHt9O1xuICAgICAgICAgICAgICAgIG5ld0V4cGVyaWVuY2VEYXRhLnVzZXJbdXNlci51aWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBleHBlcmllbmNlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGV0b2tlbmVkRXhwZXJpZW5jZVBhdGgpIHtcbiAgICAgICAgICAgICAgICBuZXdFeHBlcmllbmNlS2V5ID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoZGV0b2tlbmVkRXhwZXJpZW5jZVBhdGgpLnB1c2gobmV3RXhwZXJpZW5jZURhdGEpLmtleTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhwZXJpZW5jZS5rZXkgPSBuZXdFeHBlcmllbmNlS2V5O1xuICAgICAgICAgICAgZXhwZXJpZW5jZS5hdXRoID0gYXV0aDtcbiAgICAgICAgICAgIGV4cGVyaWVuY2Uuc3JjID0gc3JjO1xuICAgICAgICAgICAgZXhwZXJpZW5jZS5pVlhqc0xvZyA9IHNlbGYuaVZYanNMb2c7XG5cbiAgICAgICAgICAgIGxldCBlbmhhbmNlZCA9IHtcbiAgICAgICAgICAgICAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgICAgICAgICAgICAgZXhwZXJpZW5jZTogZmlyZWJhc2VFeHBlcmllbmNlLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBuZXcgRmlyZWJhc2VSdWxlcyhleHBlcmllbmNlLCBjdXN0b21SdWxlcykucnVsZXMsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1c2VyICYmIGRldG9rZW5lZEV4cGVyaWVuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgZXhwZXJpZW5jZS51c2VyID0gdXNlcjtcblxuICAgICAgICAgICAgICAgIGRhdGFiYXNlLnJlZihgdXNlcnMvJHt1c2VyLnVpZH1gKS5vbmNlKCd2YWx1ZScpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsKCkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdVc2VycyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG9VUkw6IHVzZXIucGhvdG9VUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlkOiB1c2VyLnVpZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VXNlcnNbdXNlci51aWRdID0gbmV3VXNlckRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnJlZihgdXNlcnNgKS5zZXQobmV3VXNlcnMpLnRoZW4oKHVzZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkRXhwZXJpZW5jZVRvVXNlcihuZXdVc2VyRGF0YSwgbmV3RXhwZXJpZW5jZUtleSwgcmVzb2x2ZSwgZW5oYW5jZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFVzZXJEYXRhRnJvbVNlcnZlciA9IGRhdGEudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQge3VpZCA9IHVzZXIudWlkLCBlbWFpbCA9IHVzZXIuZW1haWwsIG5hbWUgPSB1c2VyLmRpc3BsYXlOYW1lLCBhdmF0YXIgPSB1c2VyLnBob3RvVVJMLCBleHBlcmllbmNlcyA9IHt9fSA9IGN1cnJlbnRVc2VyRGF0YUZyb21TZXJ2ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2YXRhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcmllbmNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkRXhwZXJpZW5jZVRvVXNlcihjdXJyZW50VXNlckRhdGEsIG5ld0V4cGVyaWVuY2VLZXksIHJlc29sdmUsIGVuaGFuY2VkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKGVuaGFuY2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV4cGVyaWVuY2VUb1VzZXIodXNlckRhdGEsIGV4cGVyaWVuY2VLZXksIHJlc29sdmUsIGVuaGFuY2VkKSB7XG4gICAgICAgICAgICBsZXQge2V4cGVyaWVuY2VzID0ge30sIHVpZH0gPSB1c2VyRGF0YTtcblxuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhLnVpZDtcblxuICAgICAgICAgICAgZXhwZXJpZW5jZXNbZXhwZXJpZW5jZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJpZW5jZXMgPSBleHBlcmllbmNlcztcbiAgICAgICAgICAgIGRhdGFiYXNlLnJlZihgdXNlcnMvJHt1aWR9YCkudXBkYXRlKHVzZXJEYXRhKTtcblxuICAgICAgICAgICAgcmVzb2x2ZShlbmhhbmNlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmhhbmNlKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCB7YXV0aCwgaVZYanNTZXR0aW5ncywgZGF0YWJhc2VVUkx9ID0gc2VsZjtcbiAgICAgICAgbGV0IHtjb25maWd9ID0gaVZYanNTZXR0aW5ncztcbiAgICAgICAgbGV0IGRhdGFiYXNlID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcbiAgICAgICAgbGV0IGVuaGFuY2VQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZGF0YWJhc2UucmVmKGNvbmZpZykub25jZSgndmFsdWUnKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRVcEV4cGVyaWVuY2UoZGF0YS52YWwoKSwgY29uZmlnLCByZXNvbHZlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBlbmhhbmNlUHJvbWlzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnQgPSBpbml0aWFsaXplRmlyZWJhc2U7XG5cbmlmIChhbmd1bGFyICYmIGFuZ3VsYXIubW9kdWxlKCdpdngtanMnKSkge1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnaXZ4LWpzJylcbiAgICAgICAgLmNvbnN0YW50KCdpVlhqcy5kYXRhLmZpcmViYXNlJywgaW5pdGlhbGl6ZUZpcmViYXNlKVxuICAgICAgICAucHJvdmlkZXIoJ2lWWGpzRmlyZWJhc2VVdGlsaXRpZXMnLCBmdW5jdGlvbiBpVlhqc0ZpcmViYXNlVXRpbGl0aWVzUHJvdmlkZXIoKSB7XG4gICAgICAgICAgICB0aGlzLnV0aWxpdGllcyA9IG5ldyBGaXJlYmFzZVV0aWxpdGllcygpO1xuICAgICAgICAgICAgdGhpcy4kZ2V0ID0gKCkgPT4geyB9O1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUZpcmViYXNlKHNldHRpbmdzKSB7XG4gICAgc2V0dGluZ3MubW9kdWxlID0gRmlyZWJhc2VEYXRhO1xuXG4gICAgcmV0dXJuIHNldHRpbmdzO1xufTsiLCJpbXBvcnQge1J1bGVzIGFzIERlZmF1bHRSdWxlc30gZnJvbSBcIi4uL2l2eC1qcy9ydWxlcy5qc1wiO1xuXG5leHBvcnQgY2xhc3MgUnVsZXMgZXh0ZW5kcyBEZWZhdWx0UnVsZXN7XG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSA9IHsgZGF0YToge30gfSwgY3VzdG9tUnVsZXMgPSAoKSA9PiB7IH0pIHtcbiAgICAgICAgc3VwZXIoZXhwZXJpZW5jZSwgY3VzdG9tUnVsZXMpO1xuICAgICAgIFxuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xuICAgICAgICB0aGlzLmN1c3RvbVJ1bGVzID0gY3VzdG9tUnVsZXM7XG4gICAgfVxuXG4gICAgZ2V0IHJ1bGVzKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChuYXZBcnJheSA9IFtdKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjdXN0b21SdWxlU3RhdGVJZCA9IHNlbGYuY3VzdG9tUnVsZXMobmF2QXJyYXkpO1xuXG4gICAgICAgICAgICBpZiAoY3VzdG9tUnVsZVN0YXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VzdG9tUnVsZVN0YXRlSWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBuZXh0U3RhdGVJZCA9IHNlbGYucHJvY2Vzc1J1bGVzKG5hdkFycmF5KS5zdGF0ZUlkO1xuICAgICAgICAgICAgbGV0IG5leHRTdGF0ZSA9ICBzZWxmLmV4cGVyaWVuY2UuY29uZmlnLnN0YXRlcy5maW5kKChzdGF0ZSwgaW5kZXgpPT57XG4gICAgICAgICAgICAgICByZXR1cm4gbmV4dFN0YXRlSWQgPT09IHN0YXRlLmlkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXh0U3RhdGVJZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NSdWxlcyhuYXZBcnJheSA9IFtdKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHN0YXRlU2VsZWN0ID0gbmF2QXJyYXkuZmluZCgobmF2T2JqKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNBdXRoUnVsZSA9IG5hdk9iai5ydWxlICYmIG5hdk9iai5ydWxlLmtleSAmJiBuYXZPYmoucnVsZS5rZXkgPT09ICdhdXRoJztcblxuICAgICAgICAgICAgaWYoaXNBdXRoUnVsZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZXZhbHVhdGVSdWxlcyhuYXZPYmopO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzdGF0ZVNlbGVjdCA/IHN0YXRlU2VsZWN0IDogJyc7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgT2JqZWN0UGFyc2VycywgVHlwZVZhbGlkYXRvciB9IGZyb20gXCIuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzXCI7XG5cbmxldCBvYmplY3RQYXJzZXIgPSBuZXcgT2JqZWN0UGFyc2VycygpO1xubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVMb2NhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dDogW1xuICAgICAgICAgICAgICAgIFwiaGVhZGVyLnRlbXBsYXRlVXJsXCIsXG4gICAgICAgICAgICAgICAgXCJmb290ZXIudGVtcGxhdGVVcmxcIixcbiAgICAgICAgICAgICAgICBcImZvcm0ubGFiZWxUZW1wbGF0ZVVybFwiLFxuICAgICAgICAgICAgICAgIFwiZm9ybS5zdWJtaXQubGFiZWxUZW1wbGF0ZVVybFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJpbnB1dHNcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVLZXk6IFwibGFiZWxUZW1wbGF0ZVVybFwiLFxuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJidXR0b25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUtleTogXCJsYWJlbFRlbXBsYXRlVXJsXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJyYWRpb0J1dHRvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlS2V5OiBcImxhYmVsVGVtcGxhdGVVcmxcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiBbXG4gICAgICAgICAgICAgICAgXCJoZWFkZXIudGVtcGxhdGVVcmxcIixcbiAgICAgICAgICAgICAgICBcImZvb3Rlci50ZW1wbGF0ZVVybFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJsaW5rc1wiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUtleTogXCJsYWJlbFRlbXBsYXRlVXJsXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaHRtbDogW1xuICAgICAgICAgICAgICAgIFwidGVtcGxhdGVVcmxcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHZpZGVvOiBbXG4gICAgICAgICAgICAgICAgXCJoZWFkZXIudGVtcGxhdGVVcmxcIixcbiAgICAgICAgICAgICAgICBcImZvb3Rlci50ZW1wbGF0ZVVybFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJwZXJzb25hbGl6YXRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlS2V5OiBcInRlbXBsYXRlVXJsXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRSZW1vdGVUZW1wbGF0ZXMoY29uZmlnRGF0YSwgdGVtcGxhdGVSZWYpIHtcbiAgICAgICAgbGV0IHt0ZW1wbGF0ZUxvY2F0aW9uc30gPSB0aGlzO1xuICAgICAgICBsZXQgbmV3Q29uZmlnRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnRGF0YSkpO1xuICAgICAgICBsZXQge3N0YXRlc30gPSBuZXdDb25maWdEYXRhO1xuICAgICAgICBsZXQgc3RvcmFnZSA9IGZpcmViYXNlLnN0b3JhZ2UoKTtcbiAgICAgICAgbGV0IHN0b3JhZ2VSZWYgPSBzdG9yYWdlLnJlZignLycpO1xuXG4gICAgICAgIGxldCB0ZW1wbGF0ZVVybFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsR2V0UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCB1cmxQYXRocyA9IFtdO1xuXG4gICAgICAgICAgICBzdGF0ZXMuZm9yRWFjaCgoc3RhdGUsIHN0YXRlSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQge3R5cGV9ID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBsYXRlTG9jYXRpb24gPSB0ZW1wbGF0ZUxvY2F0aW9uc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIHRlbXBsYXRlTG9jYXRpb24uZm9yRWFjaCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZUZpbGUgPSBvYmplY3RQYXJzZXIuZ2V0VmFsdWVGcm9tUGF0aChwYXRoLCBzdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxHZXRQcm9taXNlcy5wdXNoKHN0b3JhZ2VSZWYuY2hpbGQodGVtcGxhdGVGaWxlKS5nZXREb3dubG9hZFVSTCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxQYXRocy5wdXNoKGBzdGF0ZXMuJHtzdGF0ZUluZGV4fS4ke3BhdGh9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHtwYXRoOiB0ZW1wbGF0ZVBhdGgsIGtleXMgPSBbXX0gPSBwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleURhdGEgPSBzdGF0ZVt0ZW1wbGF0ZVBhdGhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwdWxsRnJvbVRlbXBsYXRlc0Zyb21BcnJheXMocGF0aCwgc3RhdGUsIHVybEdldFByb21pc2VzLCB1cmxQYXRocywgYHN0YXRlcy4ke3N0YXRlSW5kZXh9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5LCBrZXlJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGtleURhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleURhdGEuZm9yRWFjaCgodGhpc0tleURhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWxsRnJvbVRlbXBsYXRlc0Zyb21BcnJheXMoa2V5LCB0aGlzS2V5RGF0YSwgdXJsR2V0UHJvbWlzZXMsIHVybFBhdGhzLCBgc3RhdGVzLiR7c3RhdGVJbmRleH0uJHt0ZW1wbGF0ZVBhdGh9LiR7a2V5SW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBQcm9taXNlLmFsbCh1cmxHZXRQcm9taXNlcykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3Q29uZmlnRGF0YS50ZW1wbGF0ZXMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAkLnN1cHBvcnQuY29ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgJC5nZXQocmVzdWx0WzBdKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoaHRtbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5ld0NvbmZpZ0RhdGEpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHB1bGxGcm9tVGVtcGxhdGVzRnJvbUFycmF5cyhwYXRoLCBkYXRhLCB1cmxHZXRQcm9taXNlcywgdXJsUGF0aHMsIHBhdGhIZWFkZXIpIHtcbiAgICAgICAgICAgIGxldCB7cGF0aDogdGVtcGxhdGVQYXRoLCB0ZW1wbGF0ZUtleSwga2V5cyA9IFtdfSA9IHBhdGg7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVEYXRhQXJyYXkgPSBvYmplY3RQYXJzZXIuZ2V0VmFsdWVGcm9tUGF0aCh0ZW1wbGF0ZVBhdGgsIGRhdGEpO1xuXG4gICAgICAgICAgICBpZiAoIXR5cGVWYWxpZGF0b3IuaXNFbXB0eSh0ZW1wbGF0ZURhdGFBcnJheSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlZEFycmF5ID0gdGVtcGxhdGVEYXRhQXJyYXkubWFwKCh0ZW1wbGF0ZURhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZUZpbGUgPSBvYmplY3RQYXJzZXIuZ2V0VmFsdWVGcm9tUGF0aCh0ZW1wbGF0ZUtleSwgdGVtcGxhdGVEYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmxHZXRQcm9taXNlcy5wdXNoKHN0b3JhZ2VSZWYuY2hpbGQodGVtcGxhdGVGaWxlKS5nZXREb3dubG9hZFVSTCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybFBhdGhzLnB1c2goYCR7cGF0aEhlYWRlcn0uJHt0ZW1wbGF0ZVBhdGh9LiR7aW5kZXh9LiR7dGVtcGxhdGVLZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICByZXR1cm4gdGVtcGxhdGVVcmxQcm9taXNlO1xuICAgIH1cblxuICAgIGRldG9rZW5pemUocmVmLCB1c2VyID0ge30sIGV4cGVyaWVuY2UgPSB7fSwgaVZYanNMb2cgPSBjb25zb2xlKSB7XG4gICAgICAgIGxldCB7ZGF0YSwga2V5OiBleHBlcmllbmNlS2V5fSA9IGV4cGVyaWVuY2U7XG4gICAgICAgIGxldCB7dWlkfSA9IHVzZXIgPT0gbnVsbCA/IHt9IDogdXNlcjtcbiAgICAgICAgbGV0IG5ld1JlZiA9IHJlZlxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcJHVpZC9nLCAodWlkVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdWlkID8gdWlkIDogdWlkVmFsdWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcJHgua2V5L2csICgkeEtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHBlcmllbmNlS2V5ID8gZXhwZXJpZW5jZUtleSA6ICR4S2V5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCR4LmRhdGEuW2EteixBLVosMC05XSovZywgKHNlYXJjaFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFWYWx1ZSA9IG9iamVjdFBhcnNlci5nZXRWYWx1ZUZyb21QYXRoKHNlYXJjaFZhbHVlLCBleHBlcmllbmNlKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRWYWx1ZSA9IHR5cGVWYWxpZGF0b3IuaXNTdHJpbmcoZGF0YVZhbHVlKSB8fCB0eXBlVmFsaWRhdG9yLmlzQm9vbGVhbihkYXRhVmFsdWUpIHx8IHR5cGVWYWxpZGF0b3IuaXNOdW1iZXIoZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlWWGpzTG9nLndhcm4oYCR7c2VhcmNoVmFsdWV9IGlzIGludmFsaWQuIE1ha2Ugc3VyZSB0aGlzIHZhbHVlIGlzIGEgU3RyaW5nLCBCb29sZWFuLCBvciBOdW1iZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBoYXNVSUQgPSBuZXdSZWYuaW5kZXhPZihcIiR1aWRcIikgPj0gMDtcbiAgICAgICAgbGV0IGhhc0V4cGVyaWVuY2VLZXkgPSBuZXdSZWYuaW5kZXhPZihcIiR4LmtleVwiKSA+PSAwO1xuICAgICAgICBsZXQgaGFzRGF0YSA9IG5ld1JlZi5pbmRleE9mKFwiJHguZGF0YVwiKSA+PSAwO1xuICAgICAgICBsZXQgbm90VmFsaWREZXRva2VuZWQgPSBoYXNVSUQgfHwgaGFzRXhwZXJpZW5jZUtleSB8fCBoYXNEYXRhO1xuXG4gICAgICAgIGlmIChoYXNVSUQpIHtcbiAgICAgICAgICAgIGlWWGpzTG9nLndhcm4oYFRoaXMgbGluayBjYW4ndCBiZSBkZXRva2VuaXplZCBiZWNhdXNlIHRoaXMgcGF0aCBiZWNhdXNlIHRoZXJlIGlzIG5vIEF1dGhvcml6ZWQgVXNlci5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNFeHBlcmllbmNlS2V5KSB7XG4gICAgICAgICAgICBpVlhqc0xvZy53YXJuKGBUaGlzIGxpbmsgY2FuJ3QgYmUgZGV0b2tlbml6ZWQgYmVjYXVzZSB0aGlzIHBhdGggYmVjYXVzZSB0aGVyZSBpcyBubyBhY3RpdmUgZXhwZXJpZW5jZS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3RWYWxpZERldG9rZW5lZCA/ICFub3RWYWxpZERldG9rZW5lZCA6IG5ld1JlZjtcbiAgICB9XG59IiwiaW1wb3J0IEF1ZGlvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qc1wiO1xyXG5pbXBvcnQgU3RhdGVFdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvc3RhdGUuZXZlbnRzLmpzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW5kIHJ1bnMgYWxsIGFjdGlvbnMgZm9yIHRoaXMgZXhwZXJpZW5jZS4gQW4gYWN0aW9uXHJcbiAqIGlzIGFueSBwcm9jZXNzIHRoYXQgbmVlZHMgdG8gcmV0dXJuIGEgcHJvbWlzZSBpbmRpY2F0aW5nIHRoYXQgXHJcbiAqIGl0IGZpbmlzaGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdGlvbnMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGRlZmF1bHQgZGF0YSBvYmplY3QgdG8gYmUgdXNlZCBieSB2YXJpb3VzXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIGVtcHR5IGRhdGEgb2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHNldCBhbmQgXHJcbiAgICAgICAgICogcmVjb3JkIGRhdGEgdXNpbmcgdGhpcyBzZXREYXRhIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5hdWRpb0V2ZW50TmFtZXMgPSBuZXcgQXVkaW9FdmVudE5hbWVzKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUV2ZW50TmFtZXMgPSBuZXcgU3RhdGVFdmVudE5hbWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGNsYXNzZXMgb24gYW4gZWxlbWVudCB0aGF0IHdpbGwgY2F1c2UgdGhlIGVsZW1lbnQgdG8gYW5pbWF0ZS5cclxuICAgICAqIEBwYXJhbSB7SFRNTE5vZGV9IGVsZW1lbnQgLSBlbGVtZW50IGZvciB0aGUgY2xhc3MgdG8gYmUgc2V0XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRPYmogLSBhbmltYXRpb24gZXZlbnQgZGF0YS5cclxuICAgICAqIEByZXR1cm4ge0hUTUxOb2RlfSB0aGUgZWxlbWVudCB3aXRoIHRoZSBjbGFzc2VzIHJlcGxhY2VkLiAgXHJcbiAgICAgKi9cclxuICAgIHNldEVsZW1lbnRDbGFzc2VzKGVsZW1lbnQsIGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHthbmltYXRpb25DbGFzc2VzID0gXCJcIn0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQge2FuaW1hdGlvbkNsYXNzOiBvbGRBbmltYXRpb25DbGFzc30gPSBlbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihhbmltYXRpb25DbGFzc2VzKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdoaWRlJykgPj0gMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ2hpZGUnLCBhbmltYXRpb25DbGFzc2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9sZEFuaW1hdGlvbkNsYXNzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShvbGRBbmltYXRpb25DbGFzcywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC5hbmltYXRpb25DbGFzcyA9IGFuaW1hdGlvbkNsYXNzZXM7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBgJHtlbGVtZW50LmNsYXNzTmFtZX0gJHthbmltYXRpb25DbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9OZXh0U3RhdGUoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge25leHQ6IG5hdkFycmF5fSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbmV4dFN0YXRlID0gdGhpcy5ydWxlcyhuYXZBcnJheSk7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KHNlbGYuc3RhdGVFdmVudE5hbWVzLkdPLCB7IHN0YXRlSWQ6IG5leHRTdGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgYW5pbWF0ZUVsZW1lbnQoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge2VsZW1lbnR9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25FbGVtZW50cyB8fCBhbmltYXRpb25FbGVtZW50cy5sZW5ndGggPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20oYW5pbWF0aW9uRWxlbWVudHMpO1xyXG5cclxuICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBhbmltYXRpb25FbGVtZW50ID0gdGhpcy5zZXRFbGVtZW50Q2xhc3NlcyhhbmltYXRpb25FbGVtZW50LCBldmVudE9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGVFbGVtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkVuZHMgPSBbXHJcbiAgICAgICAgICAgICAgICAnd2Via2l0QW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdtb3pBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgJ01TQW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdvc2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICAgICAnYW5pbWF0aW9uZW5kJ1xyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0aW9uRW5kcy5mb3JFYWNoKChhbmltYXRpb25FbmROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmROYW1lLCBlbmRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZW5kQW5pbWF0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKChhbmltYXRpb25FbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZHMuZm9yRWFjaCgoYW5pbWF0aW9uRW5kTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LmFuaW1hdGlvbkNsYXNzID0gZXZlbnRPYmouYW5pbWF0aW9uQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZE5hbWUsIGVuZEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5pbWF0ZUVsZW1lbnRQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TdGF0ZShldmVudE9iaiwgaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQge3N0YXRlfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpVlhqc0J1cykge1xyXG4gICAgICAgICAgICBpVlhqc0J1cy5lbWl0KHRoaXMuc3RhdGVFdmVudE5hbWVzLkdPLCBldmVudE9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBdWRpb0NsaXAoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge2F1ZGlvRXZlbnROYW1lc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzLmVtaXQoYXVkaW9FdmVudE5hbWVzLlNFVF9VUCwgZXZlbnRPYmopO1xyXG4gICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KGF1ZGlvRXZlbnROYW1lcy5QTEFZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQnVzLm9uKGF1ZGlvRXZlbnROYW1lcy5USU1FX1VQREFURSwgKGN1cnJlbnRBdWRpbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEF1ZGlvLmlkID09PSBldmVudE9iai5pZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEF1ZGlvLnJ1bkN1ZVBvaW50cyhzZWxmLnByb2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGlvQ2xpcFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuQnVzLm9uY2UoYXVkaW9FdmVudE5hbWVzLkVOREVELCAoY3VycmVudEF1ZGlvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF1ZGlvLmlkID09PSBldmVudE9iai5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJvY2Vzc29yLnJlc29sdmVBY3Rpb25zKGV2ZW50T2JqLm9uRW5kLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhdWRpb0NsaXBQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGEoZXZlbnRPYmopIHtcclxuICAgICAgICBsZXQge2tleSwgdmFsdWV9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZXREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShzZWxmKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0RGF0YVByb21pc2U7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKXtcclxuICAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICAgdGhpcy5jdXN0b21FdmFsdWF0b3IgPSBjdXN0b21FdmFsdWF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGUocnVsZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29uZGl0aW9uT3BlcmF0b3IgPSBcImFuZFwiLCBjb25kaXRpb25zfSA9IHJ1bGU7XHJcbiAgICAgICAgbGV0IGV2YWx1YXRlQ29uZGl0aW9ucyA9IGNvbmRpdGlvbnMubWFwKChjb25kaXRpb24sIGluZGV4KSA9PntcclxuICAgICAgICAgICAgbGV0IHtrZXkgOiBsaHMsIGlzLCB2YWx1ZSA6IHJocywgdHlwZSA9IFwiaW5wdXRcIn0gPSBjb25kaXRpb247XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmN1c3RvbUV2YWx1YXRvciAmJiB0eXBlVmFsaWRhdG9yLmlzRnVuY3Rpb24oc2VsZi5jdXN0b21FdmFsdWF0b3IpICYmIHNlbGYuY3VzdG9tRXZhbHVhdG9yKGNvbmRpdGlvbikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY3VzdG9tRXZhbHVhdG9yKGNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNpbmNlIG9sZGVyIHZlcnNpb25zIG9mIHRoZSBpVlhqcyBKU09OIHVzZWQgXHJcbiAgICAgICAgICAgIC8vIHRoZSBrZXkgZm9yIFwia2V5d29yZFwiIHRoaXMgd2lsbCBtYWtlIGl0IGJhY2t3YXJkc1xyXG4gICAgICAgICAgICAvLyBjb21wYXRhYmxlXHJcbiAgICAgICAgICAgIGlmKHNlbGZbbGhzXSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZltsaHNdKGxocywgaXMsIHJocyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmW3R5cGVdKGxocywgaXMsIHJocyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW2NvbmRpdGlvbk9wZXJhdG9yXShldmFsdWF0ZUNvbmRpdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0KGxocywgaXMsIHJocyl7XHJcbiAgICAgICAgbGV0IHtleHBlcmllbmNlfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGxoc1ZhbHVlID0gZXhwZXJpZW5jZS5kYXRhW2xoc107XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW2lzXShsaHNWYWx1ZSwgcmhzKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmQocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgJiYgcHJlZGljYXRlO1xyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3IocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgfHwgcHJlZGljYXRlO1xyXG4gICAgICAgIH0sZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdChwcmVkaWNhdGVzID0gW10pe1xyXG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnJlZHVjZSgoZXZhbHVhdGUsIHByZWRpY2F0ZSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0ZSAmJiAhcHJlZGljYXRlO1xyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGx0ZShsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA8PSBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGx0KGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpIDwgbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGd0ZShsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA+PSBuZXcgTnVtYmVyKHJocyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGd0KGxocywgcmhzKXtcclxuICAgICAgICBpZihpc05hTihsaHMpIHx8IGlzTmFOKHJocykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihsaHMpID4gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBlcXVhbHMobGhzLCByaHMpe1xyXG4gICAgICAgIHJldHVybiBsaHMgPT09IHJocztcclxuICAgIH1cclxuICAgIFxyXG4gICAgbm90RXF1YWxzKGxocyxyaHMpe1xyXG4gICAgICAgIHJldHVybiBsaHMgIT09IHJocztcclxuICAgIH1cclxuXHJcbiAgICBpbihsaHMscmhzKXtcclxuICAgICAgICByZXR1cm4gcmhzLmluZGV4T2YobGhzKSA+PSAwO1xyXG4gICAgfSAgICAgICAgXHJcbn0iLCJpbXBvcnQgRXZhbHVhdG9yIGZyb20gJy4vZXZhbHVhdG9yLmpzJztcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciwgT2JqZWN0UGFyc2VycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbi8qKlxyXG4gKiBBIGRlZmF1bHQgcnVsZSBzeXN0ZW0gaW4gd2hpY2ggaVZYanMgY2hvb3NlcyB3aGljaCBzdGF0ZSBcclxuICogdG8gZ28gdG8gYmFzZWQgb2YgdGhlIGN1cnJlbnQgaVZYanMgRXhwZXJpZW5jZSBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGV4cGVyaWVuY2UgaW4gd2hpY2ggdGhpcyBkYXRhIFxyXG4gICAgICogd2lsbCBiZSBldmFsdWF0ZWQgdG8uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHBlcmllbmNlIC0gaVZYanNFeHBlcmllbmNlIFxyXG4gICAgICogb2JqZWN0IGluIHdoaWNoIGRhdGEgd2lsbCBiZSB1c2VkIHRvIGV2YWx1YXRlIHZhcmlvdXMgcnVsZXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UgPSB7IGRhdGE6IHt9IH0sIGN1c3RvbUV2YWx1YXRvcikge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDdXJyZW50IGlWWGpzIEV4cGVyZWluY2UgXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdG9yID0gbmV3IEV2YWx1YXRvcihleHBlcmllbmNlLCBjdXN0b21FdmFsdWF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlZmF1bHQgcnVsZXMgZnVuY3Rpb24gdGhhdCB3aWxsIHByb2Nlc3MgYW4gXHJcbiAgICAgKiBhcnJheSBvZiBuYXZpZ2F0aW9uIG9iamVjdHMgYW5kIGV2YWx1YXRlIHRoZW0gdXNpbmcgXHJcbiAgICAgKiB0aGUgcHJvY2Vzc1J1bGVzIGZ1bmN0aW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIGdldCBydWxlcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiAobmF2QXJyYXkgPSBbXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5wcm9jZXNzUnVsZXMobmF2QXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aHJvdWdoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBuYXYgb2JqZWN0IHdob3NlIFxyXG4gICAgICogcnVsZSBpcyBldmFsdWF0ZWQgdG8gdHJ1ZSBvciBydWxlcyBhcmUgZW1wdHkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG5hdkFycmF5IC0gQW4gYXJyYXkgb2YgbmF2aWdhdGlvbiBvYmplY3RzIFxyXG4gICAgICogd2l0aCBydWxlcyBhbmQgc3RhdGVzIHRvIGJlIGV2YWx1YXRlZC5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgc3RhdGVJZCBvZiB0aGUgcnVsZSB0aGF0IHdhcyBldmFsdWF0ZWQgXHJcbiAgICAgKiB0cnVlIGZpcnN0LiBJZiBubyBzdGF0ZSBpcyByZXR1cm4sIHJldHVybnMgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwcm9jZXNzUnVsZXMobmF2QXJyYXkgPSBbXSkge1xyXG5cclxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShuYXZBcnJheSkpe1xyXG4gICAgICAgICAgICBuYXZBcnJheSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN0YXRlU2VsZWN0ID0gbmF2QXJyYXkuZmluZCgobmF2T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7cnVsZX0gPSBuYXZPYmo7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlVmFsaWRhdG9yLmlzRW1wdHkocnVsZSkpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHtjb25kaXRpb25zLCBjb25kaXRpb25PcGVyYXRvciA9IFwiYW5kXCJ9ID0gcnVsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29uZGl0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgcnVsZS5jb25kaXRpb25PcGVyYXRvciA9IGNvbmRpdGlvbk9wZXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgcnVsZS5jb25kaXRpb25zID0gW3J1bGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0b3IuZXZhbHVhdGUocnVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZVNlbGVjdCA/IHN0YXRlU2VsZWN0LnN0YXRlSWQgOiAnJztcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBUeXBlVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqICYmIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTnVtYmVyKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai52YWx1ZU9mKCkgPT09ICdib29sZWFuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eShvYmopIHtcclxuICAgICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIGxldCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmopO1xyXG4gICAgICAgIGxldCBpc1N0cmluZyA9IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG4gICAgICAgIGxldCBjaGVja0xlbmd0aCA9IGlzQXJyYXkgfHwgaXNTdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzTmFOKG9iaikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQYXJzZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB5b3UgdG8gbWFwIGFuIG9iamVjdCBieSB0aGUga2V5cyBvZiBhIGdpdmVuIG9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBvYmplY3QgdG8gbWFwO1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBydW4gYnkgZWFjaCB2YWx1ZSBhbmQga2V5ICBcclxuICAgICAqL1xyXG4gICAgbWFwS2V5cyhvYmplY3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcbiAgICAgICAgbGV0IG1hcHBlZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICghcmVkdWNlTWFwKSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBtYXBwZWRBcnJheS5wdXNoKGNhbGxiYWNrKHZhbCwga2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWRBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShiYXNlLCBtZXJnZWQsIGlnbm9yZSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRLZXlzID0gT2JqZWN0LmtleXMobWVyZ2VkKTtcclxuICAgICAgICBsZXQgdW5pb25lZE9iamVjdCA9IG5ldyBPYmplY3QoYmFzZSk7XHJcblxyXG4gICAgICAgIG1lcmdlZEtleXMuZm9yRWFjaCgobWVyZ2VkS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKG1lcmdlZEtleSkgPj0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB1bmlvbmVkT2JqZWN0W21lcmdlZEtleV0gPSBtZXJnZWRbbWVyZ2VkS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaW9uZWRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkdWNlKG9iamVjdCwgY2FsbGJhY2ssIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGNhbGxiYWNrKGRlZmF1bHRWYWx1ZSwgdmFsLCBrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhIGNvbGxlY3Rpb24gdG8gZmluZCBpZiBhbnkgb2YgdGhlIHZhbHVlcyBcclxuICAgICAqIHdpdGggdGhlIGtleXMgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIGFueUVtcHR5KGNvbGxlY3Rpb24sIGtleXMpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShlbGVtZW50W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uaW5kZXhPZihlbGVtZW50KSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja0VsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbGVtZW50S2V5cyA9IE9iamVjdC5rZXlzKGNoZWNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRLZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IGNoZWNrRWxlbWVudFtrZXldID09PSBlbGVtZW50W2tleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnQuZm9yRWFjaCgodGVzdEVsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gdGVzdEVsZW1lbnQgPT09IGFycmF5RWxlbWVudFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBvID0gb2JqZWN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBhW2ldO1xyXG4gICAgICAgICAgICBpZiAobiBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9bbl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9bYVthLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBhdGgocGF0aCwgb2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gb2JqZWN0O1xyXG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgcGF0aFBhcnRzLmZvckVhY2goKHBhdGhQYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KHBhdGhQYXJ0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IG9sZERhdGFbcGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShjdXJyZW50RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBzZWUgaWYgdGhlIHZhbHVlcyBcclxuICAgICAqIGF0IHRoZSBrZXlzIGlzIHVuaXF1ZSBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kaWNhdGluZyBcclxuICAgICAqIGlmIHRoZXkgYXJlIHVuaXF1ZSBhbmQgYW55IGVycm9ycyB0aGF0IGRvbid0IG1hdGNoIGZvciBcclxuICAgICAqIGNvcnJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGlzVW5pcXVlKGNvbGxlY3Rpb24gPSBbXSwga2V5cyA9IFtdKSB7XHJcbiAgICAgICAgbGV0IGhhc1VuaXF1ZSA9IHtcclxuICAgICAgICAgICAgaXNVbmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhbGxVbmlxdWVWYWx1ZXMgPSB7fTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldID0gW107XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RVbmlxdWUgPSBzZWxmLmhhcyhhbGxVbmlxdWVWYWx1ZXNba2V5XSwgZWxlbWVudFtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90VW5pcXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5pc1VuaXF1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XS5wdXNoKGVsZW1lbnRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNVbmlxdWU7XHJcbiAgICB9XHJcbn07Il19
