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
        key: "clearData",
        value: function clearData(eventObj) {
            var keys = eventObj.keys;

            var self = this;
            keys.forEach(function (key) {
                self.data[key] = undefined;
            });
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

},{"../../../constants/audio.events.js":1,"../../../constants/state.events.js":4}],7:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":12}],8:[function(require,module,exports){
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

},{"../../../utilities/type-parsers.js":12,"./evaluator.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require('../ivx-js/actions.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Actions) {
    _inherits(_class, _Actions);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
    }

    _createClass(_class, [{
        key: 'setBaseUrl',
        value: function setBaseUrl(baseUrl) {
            this.baseUrl = baseUrl;

            return this;
        }
    }, {
        key: 'raiseEvent',
        value: function raiseEvent(eventObj) {
            var customEvent = eventObj.customEvent,
                _eventObj$customArgs = eventObj.customArgs,
                customArgs = _eventObj$customArgs === undefined ? {} : _eventObj$customArgs;
            var experienceData = customArgs.experienceData;

            var customEventPromise = void 0;
            var eventArgs = customArgs;
            var self = this;

            if (Array.isArray(experienceData)) {
                eventArgs.experienceData = {};

                experienceData.forEach(function (key) {
                    eventArgs.experienceData[key] = self.data[key];
                });
            } else if (!Array.isArray(experienceData) && experienceData) {
                eventArgs.experienceData = self.data;
            }

            if (customEvent) {
                customEventPromise = this.postAction(customEvent, customArgs);
            }

            return customEventPromise;
        }
    }, {
        key: 'setData',
        value: function setData(eventObj) {
            var key = eventObj.key,
                value = eventObj.value;

            var self = this;
            var setDataPromise = this.postAction('set-data', eventObj).then(function (response) {
                var key = response.key,
                    value = response.value;

                var newData = {};

                newData[key] = value;
                self.data = Object.assign({}, self.data, newData);

                return self;
            }, function (err) {
                console.log(err);
            });

            return setDataPromise;
        }
    }, {
        key: 'postAction',
        value: function postAction(actionName, args) {
            var _this2 = this;

            var self = this;
            var pathName = this.baseUrl.replace('[PATH]', '/' + actionName);
            var postActionPromise = new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                var self = _this2;
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var reponseText = xhr.reponseText;

                        if (xhr.status === 200) {
                            try {
                                var responseJSON = JSON.parse(xhr.responseText);

                                resolve(responseJSON);
                            } catch (e) {
                                resolve(xhr.responseText);
                            }
                        } else {
                            reject({ error: 'Config JSON Not Obtained' });
                        }
                    }
                };
                xhr.open('POST', pathName);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(args));
            });

            return postActionPromise;
        }
    }]);

    return _class;
}(_actions.Actions);

exports.default = _class;

},{"../ivx-js/actions.js":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Webtasks = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _services = require('./services.js');

var _services2 = _interopRequireDefault(_services);

var _actions = require('./actions.js');

var _actions2 = _interopRequireDefault(_actions);

var _typeParsers = require('../../../utilities/type-parsers.js');

var _rules = require('../ivx-js/rules.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultActions = new _actions2.default();
var services = new _services2.default();
var myObjectParser = new _typeParsers.ObjectParsers();

var Webtasks = exports.Webtasks = function () {
    function Webtasks(moduleData) {
        var iVXjsSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var Bus = arguments[2];
        var iVXjsLog = arguments[3];

        _classCallCheck(this, Webtasks);

        var _iVXjsSettings$config = iVXjsSettings.config,
            configPath = _iVXjsSettings$config === undefined ? "" : _iVXjsSettings$config;
        var baseUrl = iVXjsSettings.data.baseUrl;


        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog;
        this.iVXjsSettings = iVXjsSettings;

        this.baseUrl = baseUrl;
        this.configPath = configPath;
    }

    _createClass(Webtasks, [{
        key: 'setUpExperience',
        value: function setUpExperience(configData, enhanceResolve) {
            var _iVXjsSettings = this.iVXjsSettings,
                config = _iVXjsSettings.config,
                _iVXjsSettings$data = _iVXjsSettings.data,
                data = _iVXjsSettings$data === undefined ? {} : _iVXjsSettings$data,
                modifiedExperience = _iVXjsSettings.experience,
                customRules = _iVXjsSettings.rules,
                _iVXjsSettings$ui = _iVXjsSettings.ui,
                ui = _iVXjsSettings$ui === undefined ? 'default' : _iVXjsSettings$ui,
                _iVXjsSettings$valida = _iVXjsSettings.validation,
                validation = _iVXjsSettings$valida === undefined ? 'iVXjsValidation' : _iVXjsSettings$valida;

            var experience = defaultActions;
            var _configData$modules = configData.modules,
                configModules = _configData$modules === undefined ? {} : _configData$modules;
            var _configModules$ui = configModules.ui,
                configUI = _configModules$ui === undefined ? ui : _configModules$ui,
                _configModules$valida = configModules.validation,
                configValidation = _configModules$valida === undefined ? validation : _configModules$valida;


            if (modifiedExperience) {
                experience = myObjectParser.merge(experience, modifiedExperience);
            }

            var enhanced = {
                experience: experience,
                rules: new _rules.Rules(experience, customRules).rules,
                config: configData
            };

            enhanceResolve(enhanced);
        }
    }, {
        key: 'enhance',
        value: function enhance() {
            var self = this;
            var baseUrl = this.baseUrl,
                configPath = this.configPath;


            var configUrl = baseUrl.replace('[PATH]', configPath);
            var webtaskPromise = new Promise(function (resolve, reject) {
                services.getConfigJSON(configUrl).then(function (configData) {
                    // console.dir(configData);
                    defaultActions = defaultActions.setBaseUrl(baseUrl);

                    self.setUpExperience(configData, resolve);
                });
            });

            return webtaskPromise;
        }
    }]);

    return Webtasks;
}();

module.export = initializeWebTasks;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.data.webtasks', initializeWebTasks);
}

function initializeWebTasks(settings) {
    settings.module = Webtasks;

    return settings;
};

},{"../../../utilities/type-parsers.js":12,"../ivx-js/rules.js":8,"./actions.js":9,"./services.js":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'getConfigJSON',
        value: function getConfigJSON(url) {
            var xhr = new XMLHttpRequest();
            var self = this;
            var deferred = new Promise(function (resolve, reject) {
                xhr.onreadystatechange = function () {
                    self.isValidJSONRequest(resolve, reject, xhr);
                };
                xhr.open('GET', url);
                xhr.send();
            });

            return deferred;
        }
    }, {
        key: 'isValidJSONRequest',
        value: function isValidJSONRequest(resolve, reject, xhr) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var responseJSON = JSON.parse(xhr.responseText);
                        resolve(responseJSON);
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    reject({ error: 'Config JSON Not Obtained' });
                }
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],12:[function(require,module,exports){
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

},{}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2F1ZGlvLmV2ZW50cy5qcyIsInNyYy9jb25zdGFudHMvYXVkaW8uanMiLCJzcmMvY29uc3RhbnRzL2luZGV4LmpzIiwic3JjL2NvbnN0YW50cy9zdGF0ZS5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL3N0YXRlLmpzIiwic3JjL21vZHVsZXMvZGF0YS9pdngtanMvYWN0aW9ucy5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWpzL2V2YWx1YXRvci5qcyIsInNyYy9tb2R1bGVzL2RhdGEvaXZ4LWpzL3J1bGVzLmpzIiwic3JjL21vZHVsZXMvZGF0YS93ZWJ0YXNrcy9hY3Rpb25zLmpzIiwic3JjL21vZHVsZXMvZGF0YS93ZWJ0YXNrcy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL2RhdGEvd2VidGFza3Mvc2VydmljZXMuanMiLCJzcmMvdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0ksc0JBQWM7QUFBQTs7QUFBQTs7QUFHVixZQUFJLGFBQWE7QUFDYiwrQkFBbUIsbUJBRE47QUFFYix1QkFBWSxXQUZDO0FBR2Isc0JBQVUsVUFIRztBQUliLHFCQUFVLFNBSkc7QUFLYixtQkFBUSxPQUxLO0FBTWIsMEJBQWMsY0FORDtBQU9iLGtCQUFNLE1BUE87QUFRYixtQkFBTyxPQVJNO0FBU2Isb0JBQVEsUUFUSztBQVViLGtCQUFNLE1BVk87QUFXYixxQkFBUyxTQVhJO0FBWWIsa0JBQU0sTUFaTztBQWFiLG9CQUFTLFFBYkk7QUFjYiwwQkFBYyxjQWREO0FBZWIsd0JBQVksWUFmQztBQWdCYix5QkFBYSxhQWhCQTtBQWlCYixvQkFBUTtBQWpCSyxTQUFqQjs7QUFvQkEsY0FBSyxRQUFMLENBQWMsVUFBZDtBQXZCVTtBQXdCYjs7OzttQ0FFVSxTLEVBQVc7QUFB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QUFLQSxrQ0FBVSxRQUFWLEdBQXFCLEtBQXJCO0FBQ0gscUJBUEQsTUFPTztBQUNILHdDQUFnQixHQUFoQixFQUFxQixJQUFyQixDQUEwQixRQUFRLEdBQVIsQ0FBMUI7QUFDSDtBQUNKLGlCQWJEO0FBY0gsYUFoQkQ7O0FBa0JBLG1CQUFPLFNBQVA7QUFDSDs7Ozs7O0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEF1ZGlvQ29uc3RhbnRzIGZyb20gXCIuL2F1ZGlvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQXVkaW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFNFRUs6IFwic2Vla1wiLFxuICAgICAgICAgICAgU0VUX1VQIDogXCJzZXQtdXBcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGlWWGpzQ29uc3RhbnRze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5BVURJTyA9IFwiYXVkaW9cIjtcbiAgICB9XG5cbiAgICBjb252ZW50aW9uKCl7XG4gICAgICAgICBsZXQge0RFTElNRVRFUiwgQVVESU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke0FVRElPfWA7ICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IGlWWGpzU3RhdGVDb25zdGFudHMgZnJvbSBcIi4vc3RhdGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyAgaVZYanNTdGF0ZUNvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQ0hBTkdFIDogXCJjaGFuZ2VcIixcbiAgICAgICAgICAgIFNVQ0NFU1MgOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIEVSUk9SIDogXCJlcnJvclwiLFxuICAgICAgICAgICAgR08gOiBcImdvXCIsXG4gICAgICAgICAgICBOT1RfRk9VTkQgOiBcIm5vdC1mb3VuZFwiLFxuICAgICAgICAgICAgR0VUX1NUQVRFIDogXCJnZXQtc3RhdGVcIixcbiAgICAgICAgICAgIFJFUVVFU1RfU1RBVEUgOiBcInJlcXVlc3Qtc3RhdGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuU1RBVEUgPSBcInN0YXRlXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgU1RBVEV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1NUQVRFfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCBBdWRpb0V2ZW50TmFtZXMgZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50cy9hdWRpby5ldmVudHMuanNcIjtcclxuaW1wb3J0IFN0YXRlRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3N0YXRlLmV2ZW50cy5qc1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuZCBydW5zIGFsbCBhY3Rpb25zIGZvciB0aGlzIGV4cGVyaWVuY2UuIEFuIGFjdGlvblxyXG4gKiBpcyBhbnkgcHJvY2VzcyB0aGF0IG5lZWRzIHRvIHJldHVybiBhIHByb21pc2UgaW5kaWNhdGluZyB0aGF0IFxyXG4gKiBpdCBmaW5pc2hlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBkZWZhdWx0IGRhdGEgb2JqZWN0IHRvIGJlIHVzZWQgYnkgdmFyaW91c1xyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbiBlbXB0eSBkYXRhIG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBzZXQgYW5kIFxyXG4gICAgICAgICAqIHJlY29yZCBkYXRhIHVzaW5nIHRoaXMgc2V0RGF0YSBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuYXVkaW9FdmVudE5hbWVzID0gbmV3IEF1ZGlvRXZlbnROYW1lcygpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVFdmVudE5hbWVzID0gbmV3IFN0YXRlRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBjbGFzc2VzIG9uIGFuIGVsZW1lbnQgdGhhdCB3aWxsIGNhdXNlIHRoZSBlbGVtZW50IHRvIGFuaW1hdGUuXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxOb2RlfSBlbGVtZW50IC0gZWxlbWVudCBmb3IgdGhlIGNsYXNzIHRvIGJlIHNldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50T2JqIC0gYW5pbWF0aW9uIGV2ZW50IGRhdGEuXHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MTm9kZX0gdGhlIGVsZW1lbnQgd2l0aCB0aGUgY2xhc3NlcyByZXBsYWNlZC4gIFxyXG4gICAgICovXHJcbiAgICBzZXRFbGVtZW50Q2xhc3NlcyhlbGVtZW50LCBldmVudE9iaikge1xyXG4gICAgICAgIGxldCB7YW5pbWF0aW9uQ2xhc3NlcyA9IFwiXCJ9ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgbGV0IHthbmltYXRpb25DbGFzczogb2xkQW5pbWF0aW9uQ2xhc3N9ID0gZWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoYW5pbWF0aW9uQ2xhc3NlcykgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignaGlkZScpID49IDApIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKCdoaWRlJywgYW5pbWF0aW9uQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbGRBbmltYXRpb25DbGFzcykge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2Uob2xkQW5pbWF0aW9uQ2xhc3MsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYW5pbWF0aW9uQ2xhc3MgPSBhbmltYXRpb25DbGFzc2VzO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gYCR7ZWxlbWVudC5jbGFzc05hbWV9ICR7YW5pbWF0aW9uQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBnb1RvTmV4dFN0YXRlKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHtuZXh0OiBuYXZBcnJheX0gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMucnVsZXMobmF2QXJyYXkpO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChzZWxmLnN0YXRlRXZlbnROYW1lcy5HTywgeyBzdGF0ZUlkOiBuZXh0U3RhdGUgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVFbGVtZW50KGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHtlbGVtZW50fSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGlmICghYW5pbWF0aW9uRWxlbWVudHMgfHwgYW5pbWF0aW9uRWxlbWVudHMubGVuZ3RoIDw9IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKGFuaW1hdGlvbkVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMuZm9yRWFjaCgoYW5pbWF0aW9uRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudCA9IHRoaXMuc2V0RWxlbWVudENsYXNzZXMoYW5pbWF0aW9uRWxlbWVudCwgZXZlbnRPYmopO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBhbmltYXRlRWxlbWVudFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb25FbmRzID0gW1xyXG4gICAgICAgICAgICAgICAgJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAnbW96QW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICdNU0FuaW1hdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAnb3NhbmltYXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ2FuaW1hdGlvbmVuZCdcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZHMuZm9yRWFjaCgoYW5pbWF0aW9uRW5kTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMuZm9yRWFjaCgoYW5pbWF0aW9uRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uRW5kTmFtZSwgZW5kQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuZEFuaW1hdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMuZm9yRWFjaCgoYW5pbWF0aW9uRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25FbmRzLmZvckVhY2goKGFuaW1hdGlvbkVuZE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWxlbWVudC5hbmltYXRpb25DbGFzcyA9IGV2ZW50T2JqLmFuaW1hdGlvbkNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmROYW1lLCBlbmRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuaW1hdGVFbGVtZW50UHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBnb1RvU3RhdGUoZXZlbnRPYmosIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgbGV0IHtzdGF0ZX0gPSBldmVudE9iajtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaVZYanNCdXMpIHtcclxuICAgICAgICAgICAgaVZYanNCdXMuZW1pdCh0aGlzLnN0YXRlRXZlbnROYW1lcy5HTywgZXZlbnRPYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QXVkaW9DbGlwKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHthdWRpb0V2ZW50TmFtZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChldmVudE9iaikge1xyXG4gICAgICAgICAgICB0aGlzLkJ1cy5lbWl0KGF1ZGlvRXZlbnROYW1lcy5TRVRfVVAsIGV2ZW50T2JqKTtcclxuICAgICAgICAgICAgdGhpcy5CdXMuZW1pdChhdWRpb0V2ZW50TmFtZXMuUExBWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkJ1cy5vbihhdWRpb0V2ZW50TmFtZXMuVElNRV9VUERBVEUsIChjdXJyZW50QXVkaW8pID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBdWRpby5pZCA9PT0gZXZlbnRPYmouaWQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRBdWRpby5ydW5DdWVQb2ludHMoc2VsZi5wcm9jZXNzb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhdWRpb0NsaXBQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLkJ1cy5vbmNlKGF1ZGlvRXZlbnROYW1lcy5FTkRFRCwgKGN1cnJlbnRBdWRpbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBdWRpby5pZCA9PT0gZXZlbnRPYmouaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnByb2Nlc3Nvci5yZXNvbHZlQWN0aW9ucyhldmVudE9iai5vbkVuZCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYXVkaW9DbGlwUHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRhdGEoZXZlbnRPYmope1xyXG4gICAgICAgIGxldCB7a2V5c30gPSBldmVudE9iajtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PntcclxuICAgICAgICAgICAgc2VsZi5kYXRhW2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKGV2ZW50T2JqKSB7XHJcbiAgICAgICAgbGV0IHtrZXksIHZhbHVlfSA9IGV2ZW50T2JqO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2V0RGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc2VsZik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHNldERhdGFQcm9taXNlO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7IFR5cGVWYWxpZGF0b3IsIE9iamVjdFBhcnNlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2UsIGN1c3RvbUV2YWx1YXRvcil7XHJcbiAgICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgIHRoaXMuY3VzdG9tRXZhbHVhdG9yID0gY3VzdG9tRXZhbHVhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGV2YWx1YXRlKHJ1bGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge2NvbmRpdGlvbk9wZXJhdG9yID0gXCJhbmRcIiwgY29uZGl0aW9uc30gPSBydWxlO1xyXG4gICAgICAgIGxldCBldmFsdWF0ZUNvbmRpdGlvbnMgPSBjb25kaXRpb25zLm1hcCgoY29uZGl0aW9uLCBpbmRleCkgPT57XHJcbiAgICAgICAgICAgIGxldCB7a2V5IDogbGhzLCBpcywgdmFsdWUgOiByaHMsIHR5cGUgPSBcImlucHV0XCJ9ID0gY29uZGl0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5jdXN0b21FdmFsdWF0b3IgJiYgdHlwZVZhbGlkYXRvci5pc0Z1bmN0aW9uKHNlbGYuY3VzdG9tRXZhbHVhdG9yKSAmJiBzZWxmLmN1c3RvbUV2YWx1YXRvcihjb25kaXRpb24pKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmN1c3RvbUV2YWx1YXRvcihjb25kaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTaW5jZSBvbGRlciB2ZXJzaW9ucyBvZiB0aGUgaVZYanMgSlNPTiB1c2VkIFxyXG4gICAgICAgICAgICAvLyB0aGUga2V5IGZvciBcImtleXdvcmRcIiB0aGlzIHdpbGwgbWFrZSBpdCBiYWNrd2FyZHNcclxuICAgICAgICAgICAgLy8gY29tcGF0YWJsZVxyXG4gICAgICAgICAgICBpZihzZWxmW2xoc10pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbbGhzXShsaHMsIGlzLCByaHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZlt0eXBlXShsaHMsIGlzLCByaHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1tjb25kaXRpb25PcGVyYXRvcl0oZXZhbHVhdGVDb25kaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dChsaHMsIGlzLCByaHMpe1xyXG4gICAgICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBsaHNWYWx1ZSA9IGV4cGVyaWVuY2UuZGF0YVtsaHNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1tpc10obGhzVmFsdWUsIHJocyk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5kKHByZWRpY2F0ZXMgPSBbXSl7XHJcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXMucmVkdWNlKChldmFsdWF0ZSwgcHJlZGljYXRlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRlICYmIHByZWRpY2F0ZTtcclxuICAgICAgICB9LHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9yKHByZWRpY2F0ZXMgPSBbXSl7XHJcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXMucmVkdWNlKChldmFsdWF0ZSwgcHJlZGljYXRlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRlIHx8IHByZWRpY2F0ZTtcclxuICAgICAgICB9LGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBub3QocHJlZGljYXRlcyA9IFtdKXtcclxuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5yZWR1Y2UoKGV2YWx1YXRlLCBwcmVkaWNhdGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGUgJiYgIXByZWRpY2F0ZTtcclxuICAgICAgICB9LHRydWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsdGUobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPD0gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsdChsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA8IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBndGUobGhzLCByaHMpe1xyXG4gICAgICAgIGlmKGlzTmFOKGxocykgfHwgaXNOYU4ocmhzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyKGxocykgPj0gbmV3IE51bWJlcihyaHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBndChsaHMsIHJocyl7XHJcbiAgICAgICAgaWYoaXNOYU4obGhzKSB8fCBpc05hTihyaHMpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXIobGhzKSA+IG5ldyBOdW1iZXIocmhzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXF1YWxzKGxocywgcmhzKXtcclxuICAgICAgICByZXR1cm4gbGhzID09PSByaHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5vdEVxdWFscyhsaHMscmhzKXtcclxuICAgICAgICByZXR1cm4gbGhzICE9PSByaHM7XHJcbiAgICB9XHJcblxyXG4gICAgaW4obGhzLHJocyl7XHJcbiAgICAgICAgcmV0dXJuIHJocy5pbmRleE9mKGxocykgPj0gMDtcclxuICAgIH0gICAgICAgIFxyXG59IiwiaW1wb3J0IEV2YWx1YXRvciBmcm9tICcuL2V2YWx1YXRvci5qcyc7XHJcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IsIE9iamVjdFBhcnNlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogQSBkZWZhdWx0IHJ1bGUgc3lzdGVtIGluIHdoaWNoIGlWWGpzIGNob29zZXMgd2hpY2ggc3RhdGUgXHJcbiAqIHRvIGdvIHRvIGJhc2VkIG9mIHRoZSBjdXJyZW50IGlWWGpzIEV4cGVyaWVuY2UgZGF0YS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlcyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBleHBlcmllbmNlIGluIHdoaWNoIHRoaXMgZGF0YSBcclxuICAgICAqIHdpbGwgYmUgZXZhbHVhdGVkIHRvLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXhwZXJpZW5jZSAtIGlWWGpzRXhwZXJpZW5jZSBcclxuICAgICAqIG9iamVjdCBpbiB3aGljaCBkYXRhIHdpbGwgYmUgdXNlZCB0byBldmFsdWF0ZSB2YXJpb3VzIHJ1bGVzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlID0geyBkYXRhOiB7fSB9LCBjdXN0b21FdmFsdWF0b3IpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3VycmVudCBpVlhqcyBFeHBlcmVpbmNlIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRvciA9IG5ldyBFdmFsdWF0b3IoZXhwZXJpZW5jZSwgY3VzdG9tRXZhbHVhdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkZWZhdWx0IHJ1bGVzIGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGFuIFxyXG4gICAgICogYXJyYXkgb2YgbmF2aWdhdGlvbiBvYmplY3RzIGFuZCBldmFsdWF0ZSB0aGVtIHVzaW5nIFxyXG4gICAgICogdGhlIHByb2Nlc3NSdWxlcyBmdW5jdGlvbi5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBnZXQgcnVsZXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gKG5hdkFycmF5ID0gW10pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYucHJvY2Vzc1J1bGVzKG5hdkFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhyb3VnaCBhbmQgcmV0dXJucyB0aGUgZmlyc3QgbmF2IG9iamVjdCB3aG9zZSBcclxuICAgICAqIHJ1bGUgaXMgZXZhbHVhdGVkIHRvIHRydWUgb3IgcnVsZXMgYXJlIGVtcHR5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBuYXZBcnJheSAtIEFuIGFycmF5IG9mIG5hdmlnYXRpb24gb2JqZWN0cyBcclxuICAgICAqIHdpdGggcnVsZXMgYW5kIHN0YXRlcyB0byBiZSBldmFsdWF0ZWQuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHN0YXRlSWQgb2YgdGhlIHJ1bGUgdGhhdCB3YXMgZXZhbHVhdGVkIFxyXG4gICAgICogdHJ1ZSBmaXJzdC4gSWYgbm8gc3RhdGUgaXMgcmV0dXJuLCByZXR1cm5zIGFuIGVtcHR5IHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgcHJvY2Vzc1J1bGVzKG5hdkFycmF5ID0gW10pIHtcclxuXHJcbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkobmF2QXJyYXkpKXtcclxuICAgICAgICAgICAgbmF2QXJyYXkgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzdGF0ZVNlbGVjdCA9IG5hdkFycmF5LmZpbmQoKG5hdk9iaikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3J1bGV9ID0gbmF2T2JqO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZVZhbGlkYXRvci5pc0VtcHR5KHJ1bGUpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB7Y29uZGl0aW9ucywgY29uZGl0aW9uT3BlcmF0b3IgPSBcImFuZFwifSA9IHJ1bGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbmRpdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHJ1bGUuY29uZGl0aW9uT3BlcmF0b3IgPSBjb25kaXRpb25PcGVyYXRvcjtcclxuICAgICAgICAgICAgICAgIHJ1bGUuY29uZGl0aW9ucyA9IFtydWxlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZXZhbHVhdG9yLmV2YWx1YXRlKHJ1bGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGVTZWxlY3QgPyBzdGF0ZVNlbGVjdC5zdGF0ZUlkIDogJyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBY3Rpb25zIH0gZnJvbSAnLi4vaXZ4LWpzL2FjdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFjdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNldEJhc2VVcmwoYmFzZVVybCkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJhaXNlRXZlbnQoZXZlbnRPYmopIHtcbiAgICAgICAgbGV0IHsgY3VzdG9tRXZlbnQsIGN1c3RvbUFyZ3MgPSB7fSB9ID0gZXZlbnRPYmo7XG4gICAgICAgIGxldCB7IGV4cGVyaWVuY2VEYXRhIH0gPSBjdXN0b21BcmdzO1xuICAgICAgICBsZXQgY3VzdG9tRXZlbnRQcm9taXNlO1xuICAgICAgICBsZXQgZXZlbnRBcmdzID0gY3VzdG9tQXJncztcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgXG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZXJpZW5jZURhdGEpKSB7XG4gICAgICAgICAgICBldmVudEFyZ3MuZXhwZXJpZW5jZURhdGEgPSB7fTtcblxuICAgICAgICAgICAgZXhwZXJpZW5jZURhdGEuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50QXJncy5leHBlcmllbmNlRGF0YVtrZXldID0gc2VsZi5kYXRhW2tleV07XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVyaWVuY2VEYXRhKSAmJiBleHBlcmllbmNlRGF0YSkge1xuICAgICAgICAgICAgZXZlbnRBcmdzLmV4cGVyaWVuY2VEYXRhID0gc2VsZi5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1c3RvbUV2ZW50KSB7XG4gICAgICAgICAgICBjdXN0b21FdmVudFByb21pc2UgPSB0aGlzLnBvc3RBY3Rpb24oY3VzdG9tRXZlbnQsIGN1c3RvbUFyZ3MpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3VzdG9tRXZlbnRQcm9taXNlO1xuICAgIH1cblxuICAgIHNldERhdGEoZXZlbnRPYmopIHtcbiAgICAgICAgbGV0IHsga2V5LCB2YWx1ZSB9ID0gZXZlbnRPYmo7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHNldERhdGFQcm9taXNlID0gdGhpcy5wb3N0QWN0aW9uKCdzZXQtZGF0YScsIGV2ZW50T2JqKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsga2V5LCB2YWx1ZSB9ID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSB7fTtcblxuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHNlbGYuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHNlbGYuZGF0YSwgbmV3RGF0YSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZXREYXRhUHJvbWlzZTtcbiAgICB9XG5cbiAgICBwb3N0QWN0aW9uKGFjdGlvbk5hbWUsIGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcGF0aE5hbWUgPSB0aGlzLmJhc2VVcmwucmVwbGFjZSgnW1BBVEhdJywgYC8ke2FjdGlvbk5hbWV9YCk7XG4gICAgICAgIGxldCBwb3N0QWN0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB7IHJlcG9uc2VUZXh0IH0gPSB4aHI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlSlNPTiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlSlNPTilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHsgZXJyb3I6ICdDb25maWcgSlNPTiBOb3QgT2J0YWluZWQnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgcGF0aE5hbWUpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwb3N0QWN0aW9uUHJvbWlzZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgV2ViVGFza3NTZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzLmpzJztcbmltcG9ydCBXZWJUYXNrQWN0aW9ucyBmcm9tIFwiLi9hY3Rpb25zLmpzXCI7XG5pbXBvcnQgeyBPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XG5pbXBvcnQgeyBSdWxlcyB9IGZyb20gJy4uL2l2eC1qcy9ydWxlcy5qcyc7XG5cbmxldCBkZWZhdWx0QWN0aW9ucyA9IG5ldyBXZWJUYXNrQWN0aW9ucygpO1xubGV0IHNlcnZpY2VzID0gbmV3IFdlYlRhc2tzU2VydmljZXMoKTtcbmxldCBteU9iamVjdFBhcnNlciA9IG5ldyBPYmplY3RQYXJzZXJzKCk7XG5cbmV4cG9ydCBjbGFzcyBXZWJ0YXNrcyB7XG4gICAgY29uc3RydWN0b3IobW9kdWxlRGF0YSwgaVZYanNTZXR0aW5ncyA9IHt9LCBCdXMsIGlWWGpzTG9nKSB7XG4gICAgICAgIGxldCB7IGNvbmZpZzogY29uZmlnUGF0aCA9IFwiXCIgfSA9IGlWWGpzU2V0dGluZ3M7XG4gICAgICAgIGxldCB7IGJhc2VVcmwgfSA9IGlWWGpzU2V0dGluZ3MuZGF0YTtcblxuICAgICAgICB0aGlzLkJ1cyA9IEJ1cztcbiAgICAgICAgdGhpcy5pVlhqc0xvZyA9IGlWWGpzTG9nO1xuICAgICAgICB0aGlzLmlWWGpzU2V0dGluZ3MgPSBpVlhqc1NldHRpbmdzO1xuXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgICAgIHRoaXMuY29uZmlnUGF0aCA9IGNvbmZpZ1BhdGhcbiAgICB9XG5cbiAgICBzZXRVcEV4cGVyaWVuY2UoY29uZmlnRGF0YSwgZW5oYW5jZVJlc29sdmUpIHtcbiAgICAgICAgbGV0IHsgY29uZmlnLCBkYXRhID0ge30sIGV4cGVyaWVuY2U6IG1vZGlmaWVkRXhwZXJpZW5jZSwgcnVsZXM6IGN1c3RvbVJ1bGVzLCB1aSA9ICdkZWZhdWx0JywgdmFsaWRhdGlvbiA9ICdpVlhqc1ZhbGlkYXRpb24nIH0gPSB0aGlzLmlWWGpzU2V0dGluZ3M7XG4gICAgICAgIGxldCBleHBlcmllbmNlID0gZGVmYXVsdEFjdGlvbnM7XG4gICAgICAgIGxldCB7IG1vZHVsZXM6IGNvbmZpZ01vZHVsZXMgPSB7fSB9ID0gY29uZmlnRGF0YTtcbiAgICAgICAgbGV0IHsgdWk6IGNvbmZpZ1VJID0gdWksIHZhbGlkYXRpb246IGNvbmZpZ1ZhbGlkYXRpb24gPSB2YWxpZGF0aW9uIH0gPSBjb25maWdNb2R1bGVzO1xuXG4gICAgICAgIGlmIChtb2RpZmllZEV4cGVyaWVuY2UpIHtcbiAgICAgICAgICAgIGV4cGVyaWVuY2UgPSBteU9iamVjdFBhcnNlci5tZXJnZShleHBlcmllbmNlLCBtb2RpZmllZEV4cGVyaWVuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVuaGFuY2VkID0ge1xuICAgICAgICAgICAgZXhwZXJpZW5jZTogZXhwZXJpZW5jZSxcbiAgICAgICAgICAgIHJ1bGVzOiBuZXcgUnVsZXMoZXhwZXJpZW5jZSwgY3VzdG9tUnVsZXMpLnJ1bGVzLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWdEYXRhXG4gICAgICAgIH07XG5cbiAgICAgICAgZW5oYW5jZVJlc29sdmUoZW5oYW5jZWQpO1xuICAgIH1cblxuICAgIGVuaGFuY2UoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHsgYmFzZVVybCwgY29uZmlnUGF0aCB9ID0gdGhpcztcblxuICAgICAgICBsZXQgY29uZmlnVXJsID0gYmFzZVVybC5yZXBsYWNlKCdbUEFUSF0nLCBjb25maWdQYXRoKTtcbiAgICAgICAgbGV0IHdlYnRhc2tQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2VydmljZXMuZ2V0Q29uZmlnSlNPTihjb25maWdVcmwpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGNvbmZpZ0RhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoY29uZmlnRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb25zID0gZGVmYXVsdEFjdGlvbnMuc2V0QmFzZVVybChiYXNlVXJsKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFVwRXhwZXJpZW5jZShjb25maWdEYXRhLCByZXNvbHZlKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3ZWJ0YXNrUHJvbWlzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnQgPSBpbml0aWFsaXplV2ViVGFza3M7XG5cbmlmIChhbmd1bGFyICYmIGFuZ3VsYXIubW9kdWxlKCdpdngtanMnKSkge1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnaXZ4LWpzJylcbiAgICAgICAgLmNvbnN0YW50KCdpVlhqcy5kYXRhLndlYnRhc2tzJywgaW5pdGlhbGl6ZVdlYlRhc2tzKTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVdlYlRhc2tzKHNldHRpbmdzKSB7XG4gICAgc2V0dGluZ3MubW9kdWxlID0gV2VidGFza3M7XG5cbiAgICByZXR1cm4gc2V0dGluZ3M7XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIGdldENvbmZpZ0pTT04odXJsKSB7XG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuaXNWYWxpZEpTT05SZXF1ZXN0KHJlc29sdmUsIHJlamVjdCwgeGhyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZDtcbiAgICB9XG5cbiAgICBpc1ZhbGlkSlNPTlJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0LCB4aHIpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlSlNPTiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VKU09OKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7IGVycm9yOiAnQ29uZmlnIEpTT04gTm90IE9idGFpbmVkJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdHJpbmcob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcclxuICAgIH1cclxuXHJcbiAgICBpc0Z1bmN0aW9uKG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
