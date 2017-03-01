(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./iVXjs.config.js":2}],2:[function(require,module,exports){
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

},{"./index.js":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./state.js":5}],5:[function(require,module,exports){
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

},{"./index.js":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../constants/index.js");

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

        _this.ANALYTICS = "analytics";
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention() {
            var DELIMETER = this.DELIMETER,
                ANALYTICS = this.ANALYTICS;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + ANALYTICS;
        }
    }]);

    return _class;
}(_index2.default);

exports.default = _class;

},{"../../constants/index.js":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = require("../constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_AnalyticsConstants) {
    _inherits(_class, _AnalyticsConstants);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.GOOGLE = "google";
        var eventNames = {
            SEND: "send"
        };

        _this.addNames(eventNames);
        return _this;
    }

    _createClass(_class, [{
        key: "convention",
        value: function convention(eventName) {
            var DELIMETER = this.DELIMETER,
                GOOGLE = this.GOOGLE;


            return "" + _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "convention", this).call(this) + DELIMETER + GOOGLE + DELIMETER + eventName;
        }
    }]);

    return _class;
}(_constants2.default);

exports.default = _class;

},{"../constants.js":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Google = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iVXjsConfigEvents = require('../../../constants/iVXjs.config.events.js');

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _stateEvents = require('../../../constants/state.events.js');

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _constants = require('./constants.js');

var _constants2 = _interopRequireDefault(_constants);

var _asserts = require('../../../utilities/asserts.js');

var _asserts2 = _interopRequireDefault(_asserts);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iVXjsConfigEvents = new _iVXjsConfigEvents2.default();
var stateEventNames = new _stateEvents2.default();
var googleAnalyticsEvents = new _constants2.default();

var Google = exports.Google = function (_DefaultAnalytics) {
    _inherits(Google, _DefaultAnalytics);

    function Google(settings, iVXjs) {
        _classCallCheck(this, Google);

        return _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).call(this, settings, iVXjs));
    }

    _createClass(Google, [{
        key: 'init',
        value: function init(experienceData) {
            var iVXjs = this.iVXjs,
                settings = this.settings;

            this.experienceData = experienceData;
            this.assertModule = new _asserts2.default(iVXjs.log);
            this.log = iVXjs.log;

            var _experienceData$confi = experienceData.config,
                config = _experienceData$confi === undefined ? {} : _experienceData$confi;
            var _config$metadata = config.metadata,
                metadata = _config$metadata === undefined ? {} : _config$metadata;
            var trackingId = metadata.trackingId;
            var _settings$plugins = settings.plugins,
                plugins = _settings$plugins === undefined ? [] : _settings$plugins;


            settings.trackingId = trackingId ? trackingId : settings.trackingId;

            this.assertModule.assert(settings.trackingId, "Tracking Id", "make sure to add a tracking id");

            ga('create', settings);
            plugins.forEach(function (plugin, index) {
                ga('require', plugin);
            });
            ga('send', 'pageview');

            iVXjs.Bus.on(stateEventNames.CHANGE, function (state) {
                var url = state.url;


                ga('send', {
                    hitType: 'pageview',
                    page: url
                });
            });
        }
    }, {
        key: 'sendEvent',
        value: function sendEvent(args) {
            var _settings = this.settings,
                settings = _settings === undefined ? {} : _settings,
                log = this.log;
            var tracker = settings.tracker;

            var sendEventPromise = new Promise(function (resolve, reject) {
                args.hitCallback = function () {
                    resolve();
                };

                tracker = tracker ? tracker + '.' : "";
                ga(tracker + 'send', args);
            });

            return sendEventPromise;
        }
    }, {
        key: 'experience',
        get: function get() {
            var experienceData = this.experienceData;


            experienceData.experience.sendEvent = this.sendEvent;

            return experienceData;
        }
    }]);

    return Google;
}(_index2.default);

module.export = initializeGoogle;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.analytics.google', initializeGoogle);
}

function initializeGoogle() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var iVXjs = arguments[1];

    if (!ga) {
        console.error("No google analytics");
        return;
    }

    new Google(settings, iVXjs);

    return settings;
}

},{"../../../constants/iVXjs.config.events.js":1,"../../../constants/state.events.js":4,"../../../utilities/asserts.js":10,"../index.js":9,"./constants.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iVXjsConfigEvents = require('../../constants/iVXjs.config.events.js');

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var iVXjsConfigEvents = new _iVXjsConfigEvents2.default();

var _class = function _class(settings, iVXjs) {
    _classCallCheck(this, _class);

    this.settings = settings;
    this.iVXjs = iVXjs;

    var self = this;

    iVXjs.Bus.once(iVXjsConfigEvents.ANALYTICS_SET, function (experienceData) {
        self.init(experienceData);

        var analyticExperience = self.experience;

        analyticExperience.analytics = self;

        iVXjs.Bus.emit(iVXjsConfigEvents.ANALYTICS_FINISHED, analyticExperience);
    });
};

exports.default = _class;

},{"../../constants/iVXjs.config.events.js":1}],10:[function(require,module,exports){
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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2lWWGpzLmNvbmZpZy5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL2lWWGpzLmNvbmZpZy5qcyIsInNyYy9jb25zdGFudHMvaW5kZXguanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvc3RhdGUuanMiLCJzcmMvbW9kdWxlcy9hbmFseXRpY3MvY29uc3RhbnRzLmpzIiwic3JjL21vZHVsZXMvYW5hbHl0aWNzL2dvb2dsZS9jb25zdGFudHMuanMiLCJzcmMvbW9kdWxlcy9hbmFseXRpY3MvZ29vZ2xlL2luZGV4LmpzIiwic3JjL21vZHVsZXMvYW5hbHl0aWNzL2luZGV4LmpzIiwic3JjL3V0aWxpdGllcy9hc3NlcnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7QUFHSSxzQkFBYTtBQUFBOztBQUFBOztBQUdULFlBQUksYUFBYTtBQUNiLHVCQUFZLFdBREM7QUFFYix1QkFBWSxXQUZDO0FBR2IsMkJBQWdCLGVBSEg7QUFJYixnQ0FBcUI7QUFKUixTQUFqQjs7QUFPQSxjQUFLLFFBQUwsQ0FBYyxVQUFkO0FBVlM7QUFXWjs7OzttQ0FFVSxTLEVBQVc7QUFBQSxnQkFDYixTQURhLEdBQ0EsSUFEQSxDQUNiLFNBRGE7OztBQUdsQixxSUFBK0IsU0FBL0IsR0FBMkMsU0FBM0M7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCTDs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLE1BQUwsR0FBYyxRQUFkO0FBSFM7QUFJWjs7OztxQ0FFVztBQUFBLGdCQUNILFNBREcsR0FDa0IsSUFEbEIsQ0FDSCxTQURHO0FBQUEsZ0JBQ1EsTUFEUixHQUNrQixJQURsQixDQUNRLE1BRFI7OztBQUdSLHFJQUFnQyxTQUFoQyxHQUE0QyxN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SUFBVixDQUFlLGtCQUFrQixrQkFBakMsRUFBcUQsa0JBQXJEO0FBQ0gsS0FSRDtBQVNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkosaUJBQVksR0FBWixFQUFpQjtBQUFBOztBQUNoQixPQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0E7Ozs7eUJBRU0sSSxFQUFNLEksRUFBTSxPLEVBQVM7QUFBQSxPQUN0QixHQURzQixHQUNmLElBRGUsQ0FDdEIsR0FEc0I7QUFBQSxPQUVoQixLQUZnQixHQUVQLEdBRk8sQ0FFdEIsSUFGc0I7OztBQUkzQixPQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1YsUUFBSSxXQUFXO0FBQ2QsY0FBYSxJQUFiLHFCQUFpQyxPQUFqQztBQURjLEtBQWY7O0FBSUEsUUFBRyxLQUFILEVBQVM7QUFDUixVQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsUUFBZixFQUF5QixRQUF6QjtBQUNBLFdBQU0sSUFBSSxLQUFKLENBQVUsU0FBUyxPQUFuQixDQUFOO0FBQ0E7QUFDRDs7QUFFRCxVQUFPLElBQVA7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgaVZYanNDb25maWdDb25zdGFudHMgZnJvbSBcIi4vaVZYanMuY29uZmlnLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uZmlnQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBWQUxJREFURUQgOiBcInZhbGlkYXRlZFwiLFxuICAgICAgICAgICAgTk9UX1ZBTElEIDogXCJub3QtdmFsaWRcIixcbiAgICAgICAgICAgIEFOQUxZVElDU19TRVQgOiBcImFuYWx5dGljcy1zZXRcIixcbiAgICAgICAgICAgIEFOQUxZVElDU19GSU5JU0hFRCA6IFwiYW5hbHl0aWNzLWZpbmlzaGVkXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZE5hbWVzKGV2ZW50TmFtZXMpO1xuICAgIH1cblxuICAgIGNvbnZlbnRpb24oZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCB7REVMSU1FVEVSfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25zdGFudHMgZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkNPTkZJRyA9IFwiY29uZmlnXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgQ09ORklHfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtDT05GSUd9YDsgICBcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuTElCUkFSWSA9IFwiaVZYanNcIjtcbiAgICAgICAgdGhpcy5ERUxJTUVURVIgPSBcIjpcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLkxJQlJBUlk7XG4gICAgfVxuXG4gICAgYWRkTmFtZXMobmFtZUNvbGxlY3Rpb24pe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBuYW1lcyA9IE9iamVjdC5rZXlzKG5hbWVDb2xsZWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUsIGluZGV4KSA9PntcbiAgICAgICAgICAgIHNlbGZbbmFtZV0gPSBzZWxmLmNvbnZlbnRpb24obmFtZUNvbGxlY3Rpb25bbmFtZV0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNTdGF0ZUNvbnN0YW50cyBmcm9tIFwiLi9zdGF0ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc1N0YXRlQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbGV0IGV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBDSEFOR0UgOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgU1VDQ0VTUyA6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgRVJST1IgOiBcImVycm9yXCIsXG4gICAgICAgICAgICBHTyA6IFwiZ29cIixcbiAgICAgICAgICAgIE5PVF9GT1VORCA6IFwibm90LWZvdW5kXCIsXG4gICAgICAgICAgICBHRVRfU1RBVEUgOiBcImdldC1zdGF0ZVwiLFxuICAgICAgICAgICAgUkVRVUVTVF9TVEFURSA6IFwicmVxdWVzdC1zdGF0ZVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQge0RFTElNRVRFUn0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtldmVudE5hbWV9YDtcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5TVEFURSA9IFwic3RhdGVcIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgIGxldCB7REVMSU1FVEVSLCBTVEFURX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAgYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7U1RBVEV9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzQ29uc3RhbnRzIGZyb20gXCIuLi8uLi9jb25zdGFudHMvaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNDb25zdGFudHN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLkFOQUxZVElDUyA9IFwiYW5hbHl0aWNzXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgQU5BTFlUSUNTfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICBgJHtzdXBlci5jb252ZW50aW9uKCl9JHtERUxJTUVURVJ9JHtBTkFMWVRJQ1N9YDsgICBcbiAgICB9XG59IiwiaW1wb3J0IEFuYWx5dGljc0NvbnN0YW50cyBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQW5hbHl0aWNzQ29uc3RhbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5HT09HTEUgPSBcImdvb2dsZVwiO1xuICAgICAgICBsZXQgZXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgU0VORCA6IFwic2VuZFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGROYW1lcyhldmVudE5hbWVzKTtcbiAgICB9XG5cbiAgICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVIsR09PR0xFfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0dPT0dMRX0ke0RFTElNRVRFUn0ke2V2ZW50TmFtZX1gO1xuICAgIH1cbn0iLCJpbXBvcnQgaVZYanNDb25maWdFdmVudE5hbWVzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9pVlhqcy5jb25maWcuZXZlbnRzLmpzJztcbmltcG9ydCBTdGF0ZUV2ZW50TmFtZXMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qcyc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzRXZlbnRzIGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IEFzc2VydCBmcm9tIFwiLi4vLi4vLi4vdXRpbGl0aWVzL2Fzc2VydHMuanNcIjtcbmltcG9ydCBEZWZhdWx0QW5hbHl0aWNzIGZyb20gXCIuLi9pbmRleC5qc1wiO1xuXG5sZXQgaVZYanNDb25maWdFdmVudHMgPSBuZXcgaVZYanNDb25maWdFdmVudE5hbWVzKCk7XG5sZXQgc3RhdGVFdmVudE5hbWVzID0gbmV3IFN0YXRlRXZlbnROYW1lcygpO1xubGV0IGdvb2dsZUFuYWx5dGljc0V2ZW50cyA9IG5ldyBHb29nbGVBbmFseXRpY3NFdmVudHMoKTtcblxuZXhwb3J0IGNsYXNzIEdvb2dsZSBleHRlbmRzIERlZmF1bHRBbmFseXRpY3Mge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBpVlhqcykge1xuICAgICAgICBzdXBlcihzZXR0aW5ncywgaVZYanMpO1xuICAgIH1cblxuICAgIGluaXQoZXhwZXJpZW5jZURhdGEpIHtcbiAgICAgICAgbGV0IHtpVlhqcywgc2V0dGluZ3N9ID0gdGhpcztcbiAgICAgICAgdGhpcy5leHBlcmllbmNlRGF0YSA9IGV4cGVyaWVuY2VEYXRhO1xuICAgICAgICB0aGlzLmFzc2VydE1vZHVsZSA9IG5ldyBBc3NlcnQoaVZYanMubG9nKTtcbiAgICAgICAgdGhpcy5sb2cgPSBpVlhqcy5sb2c7XG5cbiAgICAgICAgbGV0IHtjb25maWcgPSB7fX0gPSBleHBlcmllbmNlRGF0YTtcbiAgICAgICAgbGV0IHttZXRhZGF0YSA9IHt9fSA9IGNvbmZpZztcbiAgICAgICAgbGV0IHt0cmFja2luZ0lkfSA9IG1ldGFkYXRhO1xuICAgICAgICBsZXQge3BsdWdpbnMgPSBbXX0gPSBzZXR0aW5ncztcblxuICAgICAgICBzZXR0aW5ncy50cmFja2luZ0lkID0gdHJhY2tpbmdJZCA/IHRyYWNraW5nSWQgOiBzZXR0aW5ncy50cmFja2luZ0lkO1xuXG4gICAgICAgIHRoaXMuYXNzZXJ0TW9kdWxlLmFzc2VydChzZXR0aW5ncy50cmFja2luZ0lkLCBcIlRyYWNraW5nIElkXCIsIFwibWFrZSBzdXJlIHRvIGFkZCBhIHRyYWNraW5nIGlkXCIpO1xuXG4gICAgICAgIGdhKCdjcmVhdGUnLCBzZXR0aW5ncyk7XG4gICAgICAgIHBsdWdpbnMuZm9yRWFjaCgocGx1Z2luLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZ2EoJ3JlcXVpcmUnLCBwbHVnaW4pO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcblxuICAgICAgICBpVlhqcy5CdXMub24oc3RhdGVFdmVudE5hbWVzLkNIQU5HRSwgKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBsZXQge3VybH0gPSBzdGF0ZTtcblxuICAgICAgICAgICAgZ2EoJ3NlbmQnLCB7XG4gICAgICAgICAgICAgICAgaGl0VHlwZTogJ3BhZ2V2aWV3JyxcbiAgICAgICAgICAgICAgICBwYWdlOiB1cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldCBleHBlcmllbmNlKCkge1xuICAgICAgICBsZXQge2V4cGVyaWVuY2VEYXRhfSA9IHRoaXM7XG5cbiAgICAgICAgZXhwZXJpZW5jZURhdGEuZXhwZXJpZW5jZS5zZW5kRXZlbnQgPSB0aGlzLnNlbmRFdmVudDtcblxuICAgICAgICByZXR1cm4gZXhwZXJpZW5jZURhdGE7XG4gICAgfVxuXG4gICAgc2VuZEV2ZW50KGFyZ3MpIHtcbiAgICAgICAgbGV0IHtzZXR0aW5ncyA9IHt9LCBsb2d9ID0gdGhpcztcbiAgICAgICAgbGV0IHt0cmFja2VyfSA9IHNldHRpbmdzO1xuICAgICAgICBsZXQgc2VuZEV2ZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGFyZ3MuaGl0Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cmFja2VyID0gdHJhY2tlciA/IGAke3RyYWNrZXJ9LmAgOiBcIlwiO1xuICAgICAgICAgICAgZ2EoYCR7dHJhY2tlcn1zZW5kYCwgYXJncyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZW5kRXZlbnRQcm9taXNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydCA9IGluaXRpYWxpemVHb29nbGU7XG5cbmlmIChhbmd1bGFyICYmIGFuZ3VsYXIubW9kdWxlKCdpdngtanMnKSkge1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnaXZ4LWpzJylcbiAgICAgICAgLmNvbnN0YW50KCdpVlhqcy5hbmFseXRpY3MuZ29vZ2xlJywgaW5pdGlhbGl6ZUdvb2dsZSk7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHb29nbGUoc2V0dGluZ3MgPSB7fSwgaVZYanMpIHtcbiAgICBpZiAoIWdhKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBnb29nbGUgYW5hbHl0aWNzXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV3IEdvb2dsZShzZXR0aW5ncywgaVZYanMpO1xuXG4gICAgcmV0dXJuIHNldHRpbmdzO1xufSIsImltcG9ydCBpVlhqc0NvbmZpZ0V2ZW50TmFtZXMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2lWWGpzLmNvbmZpZy5ldmVudHMuanMnO1xuXG5sZXQgaVZYanNDb25maWdFdmVudHMgPSBuZXcgaVZYanNDb25maWdFdmVudE5hbWVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgaVZYanMpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLmlWWGpzID0gaVZYanM7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlWWGpzLkJ1cy5vbmNlKGlWWGpzQ29uZmlnRXZlbnRzLkFOQUxZVElDU19TRVQsIChleHBlcmllbmNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgc2VsZi5pbml0KGV4cGVyaWVuY2VEYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGFuYWx5dGljRXhwZXJpZW5jZSA9IHNlbGYuZXhwZXJpZW5jZTtcblxuICAgICAgICAgICAgYW5hbHl0aWNFeHBlcmllbmNlLmFuYWx5dGljcyA9IHNlbGY7XG5cbiAgICAgICAgICAgIGlWWGpzLkJ1cy5lbWl0KGlWWGpzQ29uZmlnRXZlbnRzLkFOQUxZVElDU19GSU5JU0hFRCwgYW5hbHl0aWNFeHBlcmllbmNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iXX0=
