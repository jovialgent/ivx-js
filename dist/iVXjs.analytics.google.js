/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _iVXjsConfig = __webpack_require__(4);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Google = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iVXjsConfigEvents = __webpack_require__(1);

var _iVXjsConfigEvents2 = _interopRequireDefault(_iVXjsConfigEvents);

var _stateEvents = __webpack_require__(5);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _constants = __webpack_require__(7);

var _constants2 = _interopRequireDefault(_constants);

var _asserts = __webpack_require__(9);

var _asserts2 = _interopRequireDefault(_asserts);

var _index = __webpack_require__(10);

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

        var _this = _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).call(this, settings, iVXjs));

        _this.TYPE_NAME = "google-analytics";
        return _this;
    }

    _createClass(Google, [{
        key: 'init',
        value: function init(experienceData) {
            var self = this;
            var iVXjs = this.iVXjs,
                settings = this.settings;

            this.experienceData = experienceData;
            this.assertModule = new _asserts2.default(iVXjs.log);
            this.log = iVXjs.log;

            var _experienceData$confi = experienceData.config,
                config = _experienceData$confi === undefined ? {} : _experienceData$confi;
            var _config$metadata = config.metadata,
                metadata = _config$metadata === undefined ? {} : _config$metadata;
            var trackingId = metadata.trackingId,
                _metadata$trackers = metadata.trackers,
                trackers = _metadata$trackers === undefined ? [] : _metadata$trackers;
            var _settings$plugins = settings.plugins,
                plugins = _settings$plugins === undefined ? [] : _settings$plugins,
                _settings$name = settings.name,
                name = _settings$name === undefined ? 'ivxjsTracker' : _settings$name,
                settingTrackers = settings.trackers;

            var googleTrackers = this._getAllGoogleTrackers(trackers);

            settings.trackingId = trackingId ? trackingId : settings.trackingId;
            settings.name = name;

            if (settings.trackingId) {
                googleTrackers = [{
                    type: this.TYPE_NAME,
                    trackingId: settings.trackingId,
                    id: name
                }];
            }

            if (settingTrackers) {
                googleTrackers = settingTrackers;
            }

            if (googleTrackers.length <= 0) {
                iVXjs.log.warn('The Google Analytics Module needs at least one Google Analytics Type tracker to work. Make sure you define one in the JSON\'s metadata\'s collection.');

                return;
            }

            var analytics = {
                trackers: googleTrackers,
                _getTrackersToProcess: this._getTrackersToProcess
            };

            if (!this.experienceData.experience.analytics) {
                this.experienceData.experience.analytics = analytics;
            } else {
                this.experienceData.experience.analytics = Object.assign(this.experienceData.experience.analytics, analytics);
            }

            this.analytics = analytics;

            googleTrackers.forEach(function (googleTracker) {
                var trackerName = googleTracker.id,
                    trackingId = googleTracker.trackingId;


                ga('create', {
                    trackingId: trackingId,
                    name: trackerName
                });
                ga(trackerName + '.send', 'pageview');
            });
            plugins.forEach(function (plugin, index) {
                ga('require', plugin);
            });

            this._setUpElementListeners();
        }
    }, {
        key: 'sendEvent',
        value: function sendEvent(args) {
            var self = this;
            var _settings = this.settings,
                settings = _settings === undefined ? {} : _settings,
                log = this.log,
                _analytics = this.analytics,
                analytics = _analytics === undefined ? {} : _analytics;
            var tracker = args.tracker;

            var promises = [];
            var _analytics$trackers = analytics.trackers,
                allTrackers = _analytics$trackers === undefined ? [] : _analytics$trackers;

            var trackersToProcess = analytics._getTrackersToProcess(allTrackers, tracker);

            delete args.tracker;

            var trackerPromises = trackersToProcess.map(function (trackerToProcess) {
                return new Promise(function (resolve, reject) {
                    var currentArgs = Object.assign({}, args);
                    var trackerName = trackerToProcess.id;


                    currentArgs.hitCallback = function () {
                        resolve();
                    };

                    ga(trackerName + '.send', currentArgs);
                });
            });

            return Promise.all(trackerPromises);
        }
    }, {
        key: 'sendAnalyticsEvent',
        value: function sendAnalyticsEvent(args) {
            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var _iVXjs = this.iVXjs,
                iVXjs = _iVXjs === undefined ? {} : _iVXjs;
            var _iVXjs$experience = iVXjs.experience,
                experience = _iVXjs$experience === undefined ? {} : _iVXjs$experience;
            var _experience$processor = experience.processor,
                processor = _experience$processor === undefined ? {} : _experience$processor;
            var tracker = args.tracker,
                _args$rules = args.rules,
                rules = _args$rules === undefined ? [] : _args$rules;


            var analyticEventSettings = args;

            if (Array.isArray(rules) && rules.length > 0 && processor.processRules) {
                analyticEventSettings = processor.processRules(rules);
            }

            this._processAnalyticEvents(analyticEventSettings);
        }
    }, {
        key: '_processAnalyticEvents',
        value: function _processAnalyticEvents(analyticEventSettings) {
            if (!analyticEventSettings) return;

            var analytics = this.analytics,
                iVXjs = this.iVXjs;
            var _analytics$trackers2 = analytics.trackers,
                allTrackers = _analytics$trackers2 === undefined ? [] : _analytics$trackers2;
            var event = analyticEventSettings.event,
                _analyticEventSetting = analyticEventSettings.eventLabel,
                eventLabel = _analyticEventSetting === undefined ? event : _analyticEventSetting,
                _analyticEventSetting2 = analyticEventSettings.eventCategory,
                eventCategory = _analyticEventSetting2 === undefined ? 'ivx' : _analyticEventSetting2,
                _analyticEventSetting3 = analyticEventSettings.eventAction,
                eventAction = _analyticEventSetting3 === undefined ? 'triggered-events' : _analyticEventSetting3,
                trackerId = analyticEventSettings.tracker;

            var trackers = analytics._getTrackersToProcess(allTrackers, trackerId);

            if (trackers.length <= 0) return;

            trackers.forEach(function (tracker) {
                var trackerName = tracker.id,
                    name = tracker.name,
                    trackingId = tracker.trackingId;


                if (!eventLabel) {
                    iVXjs.log.warn('Google Analytics Send Event Failed: Event failed to send to the Google Analytics Tracker, ' + name + ' (id: ' + trackerName + ', trackingId ' + trackingId + '), because no event or event label was found. Make sure your "sendAnalyticsEvent" args collection has either an "eventLabel" or "event" property.');
                    return;
                }

                ga(trackerName + '.send', {
                    hitType: "event",
                    eventLabel: eventLabel,
                    eventCategory: eventCategory,
                    eventAction: eventAction
                });
            });
        }
    }, {
        key: 'setAnalyticsData',
        value: function setAnalyticsData(args) {
            var _settings2 = this.settings,
                settings = _settings2 === undefined ? {} : _settings2,
                log = this.log,
                _analytics2 = this.analytics,
                analytics = _analytics2 === undefined ? {} : _analytics2;
            var _analytics$trackers3 = analytics.trackers,
                allTrackers = _analytics$trackers3 === undefined ? [] : _analytics$trackers3;
            var tracker = args.tracker,
                key = args.key,
                value = args.value;

            var trackersToProcess = analytics._getTrackersToProcess(allTrackers, tracker);

            trackersToProcess.forEach(function (tracker) {
                var name = tracker.id;


                ga(name + '.set', key, value);
            });
        }
    }, {
        key: 'gaElementTransformer',
        value: function gaElementTransformer() {
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _source$element = source.element,
                element = _source$element === undefined ? {} : _source$element,
                type = source.type;
            var _element$id = element.id,
                id = _element$id === undefined ? "" : _element$id;


            var event = type;

            if (id && id.length && id.length > 0) {
                event = id + ':' + event;
            }

            return {
                event: event
            };
        }
    }, {
        key: 'gaElementEventListener',
        value: function gaElementEventListener() {
            var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var hasSendAnalyticsEvent = actions.find(function (action) {
                return action.eventName === 'sendAnalyticsEvent';
            });

            if (!hasSendAnalyticsEvent) {
                var customArgs = this.gaElementTransformer(source);

                this.sendAnalyticsEvent(customArgs, source);
            }
        }
    }, {
        key: 'gaPageViewEventListener',
        value: function gaPageViewEventListener(state) {
            var _analytics3 = this.analytics,
                analytics = _analytics3 === undefined ? {} : _analytics3;
            var _analytics$trackers4 = analytics.trackers,
                allTrackers = _analytics$trackers4 === undefined ? [] : _analytics$trackers4;

            var trackersToProcess = analytics._getTrackersToProcess(allTrackers);
            var url = state.url;


            trackersToProcess.forEach(function (googleTracker) {
                var trackerName = googleTracker.id;


                ga(trackerName + '.send', {
                    hitType: 'pageview',
                    page: url
                });
            });
        }
    }, {
        key: '_setUpElementListeners',
        value: function _setUpElementListeners() {
            var self = this;
            var iVXjsBus = this.iVXjsBus,
                iVXjs = this.iVXjs;
            var _iVXjs$constants = iVXjs.constants,
                constants = _iVXjs$constants === undefined ? {} : _iVXjs$constants;
            var _constants$GLOBAL = constants.GLOBAL,
                GlobalConstants = _constants$GLOBAL === undefined ? {} : _constants$GLOBAL,
                StateConstants = constants.STATE;
            var _GlobalConstants$EVEN = GlobalConstants.EVENTS,
                GlobalEventsConstants = _GlobalConstants$EVEN === undefined ? {} : _GlobalConstants$EVEN;
            var StateEventNames = StateConstants.EVENTS;


            if (GlobalEventsConstants.ELEMENT_EVENT) {
                iVXjs.Bus.on(GlobalEventsConstants.ELEMENT_EVENT, function () {
                    var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    self.gaElementEventListener(actions, source);
                });
            }

            iVXjs.Bus.on(StateEventNames.CHANGE, function (state) {
                self.gaPageViewEventListener(state);
            });

            iVXjs.Bus.on('sendAnalyticsEvent', function (args) {
                self.sendAnalyticsEvent(args);
            });
        }
    }, {
        key: '_getTrackersToProcess',
        value: function _getTrackersToProcess(allTrackers, tracker) {
            var trackersToProcess = [];

            if (tracker) {
                trackersToProcess = allTrackers.filter(function (thisTracker) {
                    return thisTracker.id === tracker;
                });
            } else {
                trackersToProcess = allTrackers;
            }

            return trackersToProcess;
        }
    }, {
        key: '_getAllGoogleTrackers',
        value: function _getAllGoogleTrackers() {
            var trackers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var self = this;

            return trackers.filter(function (tracker) {
                return tracker.type === self.TYPE_NAME;
            });
        }
    }, {
        key: 'experience',
        get: function get() {
            var experienceData = this.experienceData;


            experienceData.experience.sendEvent = this.sendEvent;
            experienceData.experience.setAnalyticsData = this.setAnalyticsData;

            return experienceData;
        }
    }]);

    return Google;
}(_index2.default);

module.export = initializeGoogle;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.analytics.google', initializeGoogle).constant('iVXjsAnalyticsGoogle', initializeGoogle);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(0);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _state = __webpack_require__(6);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(0);

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(8);

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(0);

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iVXjsConfigEvents = __webpack_require__(1);

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

/***/ })
/******/ ]);