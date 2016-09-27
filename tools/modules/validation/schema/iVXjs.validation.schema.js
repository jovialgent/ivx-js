(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = require('./validation.js');

var _configStates = require('./config.states.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigValidation = exports.ConfigValidation = function (_Validation) {
    _inherits(ConfigValidation, _Validation);

    function ConfigValidation() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, ConfigValidation);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigValidation).call(this));

        _this.config = config;
        return _this;
    }

    _createClass(ConfigValidation, [{
        key: 'validationArray',
        get: function get() {
            return [this.hasStatesObj, this.hasDefaultStateObj, this.validDefaultStateObj, this.validStateConfig];
        }
    }, {
        key: 'validStateConfig',
        get: function get() {
            var _ref = new _configStates.ConfigStatesValidation(this.config.states);

            var valid = _ref.valid;
            var errors = _ref.errors;


            if (!valid) {
                this.addErrors(errors);
            }

            return {
                valid: valid,
                error: {
                    type: 'invalid',
                    path: 'config.states',
                    message: "Experience requires that all states are valid"
                }
            };
        }
    }, {
        key: 'validDefaultStateObj',
        get: function get() {
            var valid = this.hasDefaultStateObj.valid;


            if (!valid) return;

            var defaultState = this.config.defaultState;

            var finalIndex = defaultState.length - 1;
            var lastState = defaultState[finalIndex];

            return {
                valid: lastState.stateId && lastState.stateId.length >= 0,
                error: {
                    "type": "missing",
                    "path": 'config.defaultState[' + finalIndex + '].stateId'
                }
            };
        }
    }, {
        key: 'hasDefaultStateObj',
        get: function get() {
            var _config$defaultState = this.config.defaultState;
            var defaultState = _config$defaultState === undefined ? [] : _config$defaultState;

            var defaultStateExists = typeof defaultState !== 'undefined' && defaultState.length >= 1;

            return {
                valid: defaultStateExists,
                error: {
                    "type": "missing",
                    "path": "config.defaultState"
                },
                data: defaultState
            };
        }
    }, {
        key: 'hasStatesObj',
        get: function get() {
            var states = this.config.states;


            return {
                valid: typeof states !== 'undefined' && states.length >= 1,
                error: {
                    "type": "missing",
                    "path": "config.states"
                },
                data: states
            };
        }
    }]);

    return ConfigValidation;
}(_validation.Validation);

;

},{"./config.states.js":2,"./validation.js":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigStatesValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = require('../../../utilities/type-parsers.js');

var _validation = require('./validation.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objectParsers = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();

var ConfigStatesValidation = exports.ConfigStatesValidation = function (_Validation) {
    _inherits(ConfigStatesValidation, _Validation);

    function ConfigStatesValidation() {
        var states = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, ConfigStatesValidation);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigStatesValidation).call(this));

        _this.states = states;
        return _this;
    }

    _createClass(ConfigStatesValidation, [{
        key: 'convertToConfigErrorObjs',
        value: function convertToConfigErrorObjs(errors, errorType) {
            return errors.map(function (error) {
                var key = error.key;
                var value = error.value;
                var index = error.index;

                var errorObject = {
                    type: errorType,
                    path: 'config.states[' + index + '].' + key
                };

                if (errorType === 'duplicate') errorObject.message = 'Duplicate value: ' + value;

                return {
                    valid: false,
                    error: errorObject
                };
            });
        }
    }, {
        key: 'validationArray',
        get: function get() {
            return [this.uniqueValidStateData, this.filledValidStateData];
        }
    }, {
        key: 'filledValidStateData',
        get: function get() {
            var _objectParsers$anyEmp = objectParsers.anyEmpty(this.states, ['id', 'url', 'type']);

            var _objectParsers$anyEmp2 = _objectParsers$anyEmp.errors;
            var errors = _objectParsers$anyEmp2 === undefined ? [] : _objectParsers$anyEmp2;
            var isEmpty = _objectParsers$anyEmp.isEmpty;


            if (isEmpty) {

                this.addErrors(this.convertToConfigErrorObjs(errors, 'missing'));
            }

            return {
                valid: !isEmpty,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s have an id, url, and/or type',
                    type: 'invalid'

                },
                data: this.states

            };
        }
    }, {
        key: 'uniqueValidStateData',
        get: function get() {
            var _objectParsers$isUniq = objectParsers.isUnique(this.states, ['id', 'url']);

            var _objectParsers$isUniq2 = _objectParsers$isUniq.errors;
            var errors = _objectParsers$isUniq2 === undefined ? [] : _objectParsers$isUniq2;
            var valid = _objectParsers$isUniq.isUnique;


            if (!valid) {

                this.addErrors(this.convertToConfigErrorObjs(errors, 'duplicate'));
            }

            return {
                valid: valid,
                error: {
                    path: 'config.states',
                    message: 'Not all state\'s ids and urls are unique',
                    type: 'invalid'

                },
                data: this.states

            };
        }
    }]);

    return ConfigStatesValidation;
}(_validation.Validation);

;

},{"../../../utilities/type-parsers.js":19,"./validation.js":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExperienceValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = require('./validation.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExperienceValidation = exports.ExperienceValidation = function (_Validation) {
    _inherits(ExperienceValidation, _Validation);

    function ExperienceValidation() {
        var experience = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, ExperienceValidation);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExperienceValidation).call(this));

        _this.experience = experience;
        return _this;
    }

    _createClass(ExperienceValidation, [{
        key: 'validationArray',
        get: function get() {
            return [this.validAnimateElementObj, this.validSetDataObj];
        }
    }, {
        key: 'validAnimateElementObj',
        get: function get() {
            var animateElement = this.experience.animateElement;

            return {
                valid: typeof animateElement !== 'undefined',
                error: {
                    path: 'experience.animateElement',
                    type: "missing"
                },
                data: animateElement
            };
        }
    }, {
        key: 'validSetDataObj',
        get: function get() {
            var setData = this.experience.setData;

            return {
                valid: typeof setData !== 'undefined',
                error: {
                    path: 'experience.setData',
                    type: "missing"
                },
                data: setData
            };
        }
    }]);

    return ExperienceValidation;
}(_validation.Validation);

;

},{"./validation.js":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iVXjsValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeParsers = require('../../../utilities/type-parsers.js');

var _comparator = require('../../../utilities/comparator.js');

var _validation = require('./validation.js');

var _experience = require('./experience.js');

var _modules = require('./modules.js');

var _config = require('./config.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objectParsers = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();
var comparator = new _comparator.Comparator();

var iVXjsValidation = exports.iVXjsValidation = function (_Validation) {
  _inherits(iVXjsValidation, _Validation);

  function iVXjsValidation(data) {
    _classCallCheck(this, iVXjsValidation);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(iVXjsValidation).call(this));

    _this.data = data;

    if (!_this.valid) {
      _this.error = {
        message: _this.collectErrorMessages(),
        data: _this.data,
        errors: _this.errors
      };
    }
    return _this;
  }

  _createClass(iVXjsValidation, [{
    key: 'collectErrorMessages',
    value: function collectErrorMessages() {
      return this.errors.reverse().reduce(function (errorMessages, errorObj) {
        var error = errorObj.error;

        return errorMessages + '\nTYPE: ' + (error.type ? error.type : 'ERROR') + '  PATH: ' + error.path + ' ' + (error.message && error.message.length > 0 ? 'MESSAGE: ' + error.message + '' : '');
      }, '');
    }
  }, {
    key: 'validationArray',
    get: function get() {
      var currentValidationArray = [this.ruleValidationObj, this.experienceValidationObj, this.configValidationObj];
      return currentValidationArray;
    }
  }, {
    key: 'configValidationObj',
    get: function get() {
      var config = this.data.config;

      var _ref = new _config.ConfigValidation(config);

      var valid = _ref.valid;
      var errors = _ref.errors;


      if (!valid) {
        this.addErrors(errors);
      }

      return {
        valid: valid,
        error: {
          "path": "config",
          "message": "An experience must have a valid config",
          "type": "invalid"
        }
      };
    }
  }, {
    key: 'experienceValidationObj',
    get: function get() {
      var experience = this.data.experience;

      var _ref2 = new _experience.ExperienceValidation(experience);

      var valid = _ref2.valid;
      var errors = _ref2.errors;

      var self = this;

      if (!valid) {
        this.addErrors(errors);
      }

      return {
        valid: valid,
        error: {
          path: 'experience',
          message: 'An experience must not have any errors',
          type: 'invalid'

        },
        data: experience

      };
    }
  }, {
    key: 'ruleValidationObj',
    get: function get() {
      var rules = this.data.rules;


      return {
        valid: typeof rules !== 'undefined',
        error: {
          name: 'Missing Rules:',
          message: 'The function rules needs to be defined in the experience.'
        },
        data: rules
      };
    }
  }]);

  return iVXjsValidation;
}(_validation.Validation);

;

},{"../../../utilities/comparator.js":18,"../../../utilities/type-parsers.js":19,"./config.js":1,"./experience.js":3,"./modules.js":5,"./validation.js":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModuleValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = require('./validation.js');

var _typeParsers = require('../../../utilities/type-parsers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = true;

var ModuleValidation = exports.ModuleValidation = function (_Validation) {
    _inherits(ModuleValidation, _Validation);

    function ModuleValidation(experience) {
        _classCallCheck(this, ModuleValidation);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModuleValidation).call(this));

        _this.experience = experience;
        _this.typeValidator = new _typeParsers.TypeValidator();

        return _this;
    }

    _createClass(ModuleValidation, [{
        key: 'validationArray',
        get: function get() {
            var moduleValidationArray = [this.validUIModuleObj];

            return moduleValidationArray;
        }
    }, {
        key: 'validUIModuleObj',
        get: function get() {
            var ui = this.experience.ui;


            return {
                valid: typeof ui !== 'undefined' && this.typeValidator.isString(ui) && ui.length > 0,
                error: {
                    "path": "ui",
                    "type": "missing"
                },
                data: ui
            };
        }
    }]);

    return ModuleValidation;
}(_validation.Validation);

;

},{"../../../utilities/type-parsers.js":19,"./validation.js":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = exports.Validation = function () {
    function Validation() {
        _classCallCheck(this, Validation);

        this.errors = [];
    }

    _createClass(Validation, [{
        key: 'addErrors',
        value: function addErrors(newErrors) {
            var self = this;
            newErrors.forEach(function (errorObj) {
                self.errors.push(errorObj);
            });
        }
    }, {
        key: 'validationArray',
        get: function get() {
            return [];
        }
    }, {
        key: 'valid',
        get: function get() {
            var self = this;
            return this.validationArray.reduce(function (isValid, isPartValid) {
                if (!isPartValid) return isValid;
                if (typeof isPartValid.valid === 'boolean' && !isPartValid.valid) {
                    self.errors.push(isPartValid);
                }
                return isValid && isPartValid.valid;
            }, true);
        }
    }]);

    return Validation;
}();

;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SchemaValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../ivx-js-validation/index.js');

var _baseStructure = require('./schemas/base-structure.js');

var _statesTypes = require('./schemas/states.types.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaValidation = exports.SchemaValidation = function () {
    function SchemaValidation(data) {
        _classCallCheck(this, SchemaValidation);

        this.error = {};
        this.data = data;

        if (!this.hasValidationLibrary.valid) {
            this.error = {
                message: this.hasValidationLibrary.error.message,
                data: this.data,
                errors: [this.hasValidationLibrary]
            };
        } else if (!this.valid) {
            this.error = {
                message: this.collectErrorMessages(),
                data: this.data,
                errors: this.errors
            };
        }
    }

    _createClass(SchemaValidation, [{
        key: 'createErrorMessage',
        value: function createErrorMessage(error) {
            var code = error.code;

            switch (code) {
                case 11:
                    return createOneOfErrorMessage(error);
                default:
                    return error.message;
            }

            function createOneOfErrorMessage(error) {
                var subErrors = error.subErrors;

                return subErrors.reduce(function (errorMessage, subError, index) {
                    return errorMessage + '\n                ' + subError.message + '<br>';
                }, '<strong>The data violates ONE of the following requirements:</strong><br>');
            }
        }
    }, {
        key: 'createPath',
        value: function createPath(dataPath) {
            var config = this.data.config;

            var pathParts = dataPath.split('/');
            var location = config;
            var path = pathParts.reduce(function (fullPath, currentPathPart, index) {

                if (currentPathPart.length <= 0) {
                    return fullPath;
                }

                if (fullPath.length <= 0) {
                    location = location[currentPathPart];
                    return '' + currentPathPart;
                }

                if (!isNaN(currentPathPart)) {
                    var locationIndex = parseInt(currentPathPart);
                    location = location[locationIndex];
                    return fullPath + '[' + currentPathPart + ']';
                }

                location = location[currentPathPart];

                return fullPath + '.' + currentPathPart;
            }, '');

            return {
                "pathString": path,
                "data": location
            };
        }
    }, {
        key: 'collectErrorMessages',
        value: function collectErrorMessages() {
            var self = this;

            return this.errors.reduce(function (errorMessages, error) {

                return errorMessages + '\n        TYPE: ' + self.getErrorCode(error.code) + '  PATH: ' + error.path.pathString + ' MESSAGE : ' + error.message;
            }, '');
        }
    }, {
        key: 'getErrorCode',
        value: function getErrorCode(errorCode) {
            var errorCodes = Object.values(tv4.errorCodes);
            var errorKeys = Object.keys(tv4.errorCodes);
            var errorCodeKey = "";

            errorCodes.forEach(function (thisErrorCode, index) {
                if (thisErrorCode === errorCode) {
                    errorCodeKey = errorKeys[index];
                }
            });

            return errorCodeKey;
        }
    }, {
        key: 'valid',
        get: function get() {
            return this.errors.length <= 0;
        }
    }, {
        key: 'errors',
        get: function get() {
            var baseValidate = this.baseValidate;
            var stateTypesValidation = this.stateTypesValidation;
            var data = this.data;
            var config = this.config;

            var self = this;
            var errorArray = [];

            baseValidate.errors.forEach(function (errorObj, index) {
                errorArray.push(errorObj);
            });

            stateTypesValidation.forEach(function (errorObj, index) {
                errorArray.push(errorObj);
            });

            var modifiedErrorArray = errorArray.map(function (error, index) {

                return {
                    message: self.createErrorMessage(error),
                    path: self.createPath('' + error.dataPath),
                    type: self.getErrorCode(error.code)

                };
            });

            // this.collectErrorMessages(baseValidate.errors);

            return modifiedErrorArray;
        }
    }, {
        key: 'baseValidate',
        get: function get() {
            var config = this.data.config;

            return new _baseStructure.BaseStructure(config).validate();
        }
    }, {
        key: 'stateTypesValidation',
        get: function get() {
            var states = this.data.config.states;


            return new _statesTypes.StatesTypes(states).validate();
        }
    }, {
        key: 'hasValidationLibrary',
        get: function get() {
            return {
                "valid": typeof tv4 !== 'undefined',
                error: {
                    "path": "init()",
                    "message": "Schema validation required the 'tv4' library (https://github.com/geraintluff/tv4)",
                    "type": "missing"
                }
            };
        }
    }]);

    return SchemaValidation;
}();

;

module.export = initializeSchemaValidation;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.validation.schema', initializeSchemaValidation);
}

function initializeSchemaValidation(settings) {
    return SchemaValidation;
};

},{"../ivx-js-validation/index.js":4,"./schemas/base-structure.js":8,"./schemas/states.types.js":15}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseStructure = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = require('./rules.js');

var _states = require('./states.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStructure = exports.BaseStructure = function () {
    function BaseStructure(config) {
        _classCallCheck(this, BaseStructure);

        this.config = config;
        this.rulesSchema = new _rules.Rules(config).schema;
        this.stateSchema = new _states.States(config).schema;
    }

    _createClass(BaseStructure, [{
        key: 'validate',
        value: function validate() {

            return tv4.validateMultiple(this.config, this.schema);
        }
    }, {
        key: 'schema',
        get: function get() {
            return this.baseStructure;
        }
    }, {
        key: 'baseStructure',
        get: function get() {
            return {
                type: "object",
                properties: this.properties,
                required: this.requiredKeys
            };
        }
    }, {
        key: 'properties',
        get: function get() {
            return {
                "defaultState": {
                    "type": "array",
                    "items": this.rulesSchema
                },
                "states": {
                    "type": "array",
                    "items": this.stateSchema,
                    "minItems": "1"
                }
            };
        }
    }, {
        key: 'requiredKeys',
        get: function get() {
            return ["defaultState", "states"];
        }
    }]);

    return BaseStructure;
}();

},{"./rules.js":11,"./states.js":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTMLObject = exports.HTMLObject = function () {
    function HTMLObject() {
        _classCallCheck(this, HTMLObject);
    }

    _createClass(HTMLObject, [{
        key: "generalHTMLSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "html": {
                        "type": "string"
                    },
                    "classes": {
                        "type": "string"
                    },
                    "templateUrl": {
                        "type": "string"
                    }
                }
            };
        }
    }, {
        key: "labelHTMLSchema",
        get: function get() {}
    }]);

    return HTMLObject;
}();

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputErrors = exports.InputErrors = function () {
    function InputErrors(inputs, currentState) {
        _classCallCheck(this, InputErrors);

        this.inputs = inputs;
        this.currentState = currentState;
    }

    _createClass(InputErrors, [{
        key: "validate",
        value: function validate() {
            var inputs = this.inputs;
            var inputSchemas = this.inputSchemas;

            var allInputErrors = inputs.reduce(function (inputErrors, input, index) {
                var type = input.type;


                if (type && inputSchemas[type]) {
                    var errors = tv4.validateMultiple(input, inputSchemas[type]).errors;
                    errors.forEach(function (thisInputError, errorIndex) {
                        thisInputError.dataPath = "/inputs/" + index + (thisInputError.dataPath.length > 0 ? thisInputError.dataPath : '');
                        inputErrors.push(thisInputError);
                    });
                }

                return inputErrors;
            }, []);

            return allInputErrors;
        }
    }, {
        key: "inputSchemas",
        get: function get() {
            return {
                buttons: this.buttonsSchema,
                checkbox: this.checkboxSchema,
                date: this.dateSchema,
                "datetime-local": this.datetimeLocalSchema,
                email: this.textSchema,
                number: this.numberSchema,
                options: this.optionsSchema,
                radio: this.radioSchema,
                text: this.textSchema,
                textarea: this.textSchema,
                url: this.textSchema

            };
        }
    }, {
        key: "buttonsSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["buttons"]
                    },
                    "settings": {
                        "type": "object",
                        "properties": {
                            "showLabel": {
                                "type": "boolean"
                            }
                        }
                    },
                    "buttons": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {

                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                },
                                "classes": {
                                    "type": "string"
                                },
                                "onClick": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "eventName": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            },
                            "required": ["value"]
                        },
                        "minItems": 1
                    }
                }
            };
        }
    }, {
        key: "checkboxSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["checkbox"]
                    }
                }
            };
        }
    }, {
        key: "dateSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["date"]
                    },
                    "attributes": {
                        "type": "object",
                        "properties": {
                            "min": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            },
                            "max": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: "datetimeLocalSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["datetime-local"]
                    },
                    "attributes": {
                        "type": "object",
                        "properties": {
                            "min": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            },
                            "max": {
                                "type": "string",
                                "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: "numberSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["number"]
                    },
                    "attributes": {
                        "type": "object",
                        "properties": {
                            "placeholder": {
                                "type": "string"
                            },
                            "min": {
                                "type": "number"
                            },
                            "max": {
                                "type": "number"
                            },
                            "step": {
                                "type": "number",
                                "minimum": 0,
                                "exclusiveMinimum": true
                            }
                        }
                    }
                }
            };
        }
    }, {
        key: "optionsSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["options"]
                    },
                    "defaultDisplay": {
                        "type": "string"
                    },
                    "options": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                            "type": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "display": {
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "required": ["value", "display"]
                        }
                    }
                }
            };
        }
    }, {
        key: "radioSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["radio"]
                    },
                    "radioButtons": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "label": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "labelHTML": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "labelTemplateUrl": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "classes": {
                                    "type": "string"
                                }
                            },
                            "required": ["value"],
                            "oneOf": [{
                                "required": ["label"]
                            }, {
                                "required": ["labelHTML"]
                            }, {
                                "required": ["labelTemplateUrl"]
                            }]
                        },
                        "minItems": 2
                    }
                }
            };
        }
    }, {
        key: "textSchema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["text", "email", "url", "textarea"]
                    }
                }

            };
        }
    }]);

    return InputErrors;
}();

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rules = exports.Rules = function () {
    function Rules(config) {
        _classCallCheck(this, Rules);

        this.config = config;
    }

    _createClass(Rules, [{
        key: "stateIdEnums",
        get: function get() {
            var _config$states = this.config.states;
            var states = _config$states === undefined ? [] : _config$states;


            var stateIds = states.map(function (state, index) {
                return state.id;
            });

            return stateIds;
        }
    }, {
        key: "rulesRequired",
        get: function get() {
            return ["key", "is", "value"];
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "name": "Rule Schema",
                "properties": {
                    "stateId": {
                        "type": "string",
                        "enum": this.stateIdEnums
                    },
                    "rule": {
                        "type": "object",
                        "properties": {
                            "key": {
                                "type": "string",
                                "minLength": 1
                            },
                            "is": {
                                "type": "string",
                                "enum": ["lt", "lte", "gt", "gte", "equals", "notEquals"]
                            },
                            "value": {
                                "type": ["string", "number", "boolean", "object", "array"]
                            }
                        },
                        "required": this.rulesRequired
                    }
                },
                "required": ["stateId"]
            };
        }
    }]);

    return Rules;
}();

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.States = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = require('./rules.js');

var _htmlObject = require('./html-object');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var States = exports.States = function () {
    function States(config) {
        _classCallCheck(this, States);

        this.rulesSchema = new _rules.Rules(config).schema;
        this.generalHTMLSchema = new _htmlObject.HTMLObject().generalHTMLSchema;
    }

    _createClass(States, [{
        key: 'stateRequired',
        get: function get() {
            return ['id', 'name', 'url', 'type'];
        }
    }, {
        key: 'typeEnum',
        get: function get() {
            return ["navigation", "video", "input", "html"];
        }
    }, {
        key: 'stateProperties',
        get: function get() {
            return {
                "id": {
                    "type": "string",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "url": {
                    "type": "string",
                    "pattern": "\/^(\/[A-Za-z0-9-]*)$\/",
                    "minLength": 1
                },
                "audio": {
                    "type": "object",
                    "properties": {
                        "src": {
                            "type": "string",
                            "minLength": 1
                        },
                        "loop": {
                            "type": "boolean"
                        },
                        "cuePoints": {
                            "type": "array"
                        }
                    },
                    "required": ["src"]
                },
                "type": {
                    "type": "string",
                    "enum": this.typeEnum
                },
                "next": {
                    "type": "array",
                    "items": this.rulesSchema
                },
                "onEnter": {
                    "type": "array"
                },
                "onExit": {
                    "type": "array"
                },
                "header": this.generalHTMLSchema,
                "footer": this.generalHTMLSchema
            };
        }
    }, {
        key: 'schema',
        get: function get() {
            return {
                "type": "object",
                "name": "state",
                "properties": this.stateProperties,
                "required": this.stateRequired
            };
        }
    }]);

    return States;
}();

},{"./html-object":9,"./rules.js":11}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTMLStateSchema = exports.HTMLStateSchema = function () {
    function HTMLStateSchema(state) {
        _classCallCheck(this, HTMLStateSchema);

        this.state = state;
    }

    _createClass(HTMLStateSchema, [{
        key: "validate",
        value: function validate() {
            return tv4.validateMultiple(this.state, this.schema);
        }
    }, {
        key: "requiredProperties",
        get: function get() {
            return ["html"];
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "html": {
                        "type": "string"
                    },
                    "templateUrl": {
                        "type": "string"
                    },
                    "timeoutInMs": {
                        "type": "number"
                    }
                },
                "oneOf": [{
                    "required": ["html"]
                }, {
                    "required": ["templateUrl"]
                }]
            };
        }
    }]);

    return HTMLStateSchema;
}();

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputStateSchema = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputs = require("./inputs.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputStateSchema = exports.InputStateSchema = function () {
    function InputStateSchema(state, index) {
        _classCallCheck(this, InputStateSchema);

        this.state = state;
        this.index = index;
    }

    _createClass(InputStateSchema, [{
        key: "validate",
        value: function validate() {
            var allErrors = [tv4.validateMultiple(this.state, this.schema), this.inputErrors].reduce(function (currentErrors, errorObj, index) {
                var errors = errorObj.errors;

                errors.forEach(function (error, index) {
                    currentErrors.push(error);
                });
                return currentErrors;
            }, []);

            return {
                errors: allErrors
            };
        }
    }, {
        key: "inputErrors",
        get: function get() {
            var index = this.index;
            var _state$inputs = this.state.inputs;
            var inputs = _state$inputs === undefined ? [] : _state$inputs;

            var currentInputErrors = new _inputs.InputErrors(inputs, index).validate();

            return {
                errors: currentInputErrors
            };
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "form": {
                        "type": "object",
                        "properties": {
                            "classes": {
                                "type": "string"
                            },
                            "label": {
                                "type": "string"
                            },
                            "labelHTML": {
                                "type": "string"
                            },
                            "labelTemplateUrl": {
                                "type": "string"
                            },
                            "submit": {
                                "type": "object",
                                "properties": {
                                    "classes": {
                                        "type": "string"
                                    },
                                    "label": {
                                        "type": "string"
                                    },
                                    "labelHTML": {
                                        "type": "string"
                                    },
                                    "labelTemplateUrl": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    },
                    "onSubmit": {
                        "type": "array",
                        "items": {
                            "type": "object"
                        }
                    },
                    "inputs": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "name": {
                                    "type": "string",
                                    "minLength": 1
                                },
                                "type": {
                                    "type": "string"
                                },
                                "errors": {
                                    "type": "object"
                                },
                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                },
                                "settings": {
                                    "type": "object",
                                    "properties": {
                                        "input": {
                                            "type": "object",
                                            "properties": {
                                                "classes": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "container": {
                                            "type": "object",
                                            "properties": {
                                                "classes": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "width": {
                                            "type": "string",
                                            "pattern": "/[1-9]*\/[1-9]*/"
                                        }
                                    }
                                },
                                "attributes": {
                                    "type": "object",
                                    "properties": {
                                        "required": {
                                            "type": "boolean"
                                        },
                                        "placeholder": {
                                            "type": "string"
                                        },
                                        "minlength": {
                                            "type": "number"
                                        },
                                        "maxlength": {
                                            "type": "number"
                                        }
                                    }
                                },
                                "onChange": {
                                    "type": "array",
                                    "items": {
                                        "type": "object"
                                    }
                                }
                            },
                            "required": ["id", "name", "type"]
                        }
                    }
                },
                "required": ["inputs"]
            };
        }
    }]);

    return InputStateSchema;
}();

},{"./inputs.js":10}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatesTypes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _statesTypesHtml = require("./states.types.html.js");

var _statesTypesVideo = require("./states.types.video.js");

var _statesTypesInput = require("./states.types.input.js");

var _statesTypesNavigation = require("./states.types.navigation.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatesTypes = exports.StatesTypes = function () {
    function StatesTypes(states) {
        _classCallCheck(this, StatesTypes);

        this.states = states;
    }

    _createClass(StatesTypes, [{
        key: "validate",
        value: function validate() {
            var states = this.states;
            var typesSchemas = this.typesSchemas;


            var errorCollection = states.reduce(function (errors, state, index) {
                var type = state.type;


                if (type && typesSchemas[type]) {
                    var _validate = new typesSchemas[type](state, index).validate();

                    var typeErrors = _validate.errors;


                    typeErrors.forEach(function (typeError, errorIndex) {
                        var modTypeError = typeError;

                        modTypeError.dataPath = "states/" + index + (modTypeError.dataPath.length > 0 ? modTypeError.dataPath : '');

                        errors.push(typeError);
                    });
                }

                return errors;
            }, []);

            return errorCollection;
        }
    }, {
        key: "typesSchemas",
        get: function get() {
            return {
                "html": _statesTypesHtml.HTMLStateSchema,
                "video": _statesTypesVideo.VideoStateSchema,
                "input": _statesTypesInput.InputStateSchema,
                "navigation": _statesTypesNavigation.NavigationStateSchema
            };
        }
    }]);

    return StatesTypes;
}();

},{"./states.types.html.js":13,"./states.types.input.js":14,"./states.types.navigation.js":16,"./states.types.video.js":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationStateSchema = exports.NavigationStateSchema = function () {
    function NavigationStateSchema(state, index) {
        _classCallCheck(this, NavigationStateSchema);

        this.state = state;
        this.index = index;
    }

    _createClass(NavigationStateSchema, [{
        key: "validate",
        value: function validate() {
            return tv4.validateMultiple(this.state, this.schema);
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "links": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "properties": {
                                "href": {
                                    "type": "string"
                                },
                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                },
                                "attributes": {
                                    "type": "object",
                                    "properties": {
                                        "target": {
                                            "type": "string",
                                            "enum": ["_blank"]
                                        }
                                    }
                                },
                                "onClick": {
                                    "type": "array"
                                }
                            },
                            "required": ["href"]
                        }
                    }
                },
                "required": ["links"]
            };
        }
    }]);

    return NavigationStateSchema;
}();

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoStateSchema = exports.VideoStateSchema = function () {
    function VideoStateSchema(state) {
        _classCallCheck(this, VideoStateSchema);

        this.state = state;
    }

    _createClass(VideoStateSchema, [{
        key: "validate",
        value: function validate() {
            return tv4.validateMultiple(this.state, this.schema);
        }
    }, {
        key: "schema",
        get: function get() {
            return {
                "type": "object",
                "properties": {
                    "playerSettings": {
                        "type": "object",
                        "properties": {
                            "autoplay": {
                                "type": "boolean"
                            },
                            "controls": {
                                "type": ["boolean", "string"]
                            },
                            "attributes": {
                                "type": "object"
                            },
                            "src": {
                                "type": "string"
                            },
                            "sources": {
                                "type": "array",
                                "items": [{
                                    "type": "object",
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["video/mp4", "video/webm", "video/ogg"]
                                        },
                                        "src": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["src", "type"]
                                }],
                                "minItems": "1"
                            },
                            "tracks": {
                                "type": "array",
                                "items": [{
                                    "type": "object",
                                    "properties": {
                                        "src": {
                                            "type": "string"
                                        },
                                        "kind": {
                                            "type": "string"
                                        },
                                        "default": {
                                            "type": "boolean"
                                        }
                                    },
                                    "required": ["src"]
                                }]
                            }
                        },
                        "oneOf": [{
                            "required": ["src"]
                        }, {
                            "required": ["sources"]
                        }, {
                            "required": ["vimeoId"]
                        }, {
                            "required": ["youtubeId"]
                        }]
                    },
                    "personalizations": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "html": {
                                    "type": "string"
                                },
                                "templateUrl": {
                                    "type": "string"
                                }
                            },
                            "required": ["id"],
                            "oneOf": [{
                                "required": ["html"]
                            }, {
                                "required": ["templateUrl"]
                            }]
                        }
                    },
                    "cuePoints": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "timeAt": {
                                    "type": "number",
                                    "minimum": 0
                                }
                            },
                            "required": ["timeAt"]
                        }
                    }
                },
                "required": ["playerSettings"]
            };
        }
    }]);

    return VideoStateSchema;
}();

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}]},{},[7]);
