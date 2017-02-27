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

},{}]},{},[12]);
