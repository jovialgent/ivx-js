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
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ConfigValidation);

        var _this = _possibleConstructorReturn(this, (ConfigValidation.__proto__ || Object.getPrototypeOf(ConfigValidation)).call(this));

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
            var _ref = new _configStates.ConfigStatesValidation(this.config.states),
                valid = _ref.valid,
                errors = _ref.errors;

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
            var _config$defaultState = this.config.defaultState,
                defaultState = _config$defaultState === undefined ? [] : _config$defaultState;

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
        var states = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ConfigStatesValidation);

        var _this = _possibleConstructorReturn(this, (ConfigStatesValidation.__proto__ || Object.getPrototypeOf(ConfigStatesValidation)).call(this));

        _this.states = states;
        return _this;
    }

    _createClass(ConfigStatesValidation, [{
        key: 'convertToConfigErrorObjs',
        value: function convertToConfigErrorObjs(errors, errorType) {
            return errors.map(function (error) {
                var key = error.key,
                    value = error.value,
                    index = error.index;

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
            var _objectParsers$anyEmp = objectParsers.anyEmpty(this.states, ['id', 'url', 'type']),
                _objectParsers$anyEmp2 = _objectParsers$anyEmp.errors,
                errors = _objectParsers$anyEmp2 === undefined ? [] : _objectParsers$anyEmp2,
                isEmpty = _objectParsers$anyEmp.isEmpty;

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
            var _objectParsers$isUniq = objectParsers.isUnique(this.states, ['id', 'url']),
                _objectParsers$isUniq2 = _objectParsers$isUniq.errors,
                errors = _objectParsers$isUniq2 === undefined ? [] : _objectParsers$isUniq2,
                valid = _objectParsers$isUniq.isUnique;

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

},{"../../../utilities/type-parsers.js":18,"./validation.js":6}],3:[function(require,module,exports){
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
        var experience = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ExperienceValidation);

        var _this = _possibleConstructorReturn(this, (ExperienceValidation.__proto__ || Object.getPrototypeOf(ExperienceValidation)).call(this));

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

var _validation = require('./validation.js');

var _experience = require('./experience.js');

var _modules = require('./modules.js');

var _config = require('./config.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objectParsers = new _typeParsers.ObjectParsers();
var typeValidator = new _typeParsers.TypeValidator();

var iVXjsValidation = exports.iVXjsValidation = function (_Validation) {
  _inherits(iVXjsValidation, _Validation);

  function iVXjsValidation(data) {
    _classCallCheck(this, iVXjsValidation);

    var _this = _possibleConstructorReturn(this, (iVXjsValidation.__proto__ || Object.getPrototypeOf(iVXjsValidation)).call(this));

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

      var _ref = new _config.ConfigValidation(config),
          valid = _ref.valid,
          errors = _ref.errors;

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

      var _ref2 = new _experience.ExperienceValidation(experience),
          valid = _ref2.valid,
          errors = _ref2.errors;

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

},{"../../../utilities/type-parsers.js":18,"./config.js":1,"./experience.js":3,"./modules.js":5,"./validation.js":6}],5:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (ModuleValidation.__proto__ || Object.getPrototypeOf(ModuleValidation)).call(this));

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

},{"../../../utilities/type-parsers.js":18,"./validation.js":6}],6:[function(require,module,exports){
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
            var baseValidate = this.baseValidate,
                stateTypesValidation = this.stateTypesValidation,
                data = this.data;
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
            var inputs = this.inputs,
                inputSchemas = this.inputSchemas;

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
            var _config$states = this.config.states,
                states = _config$states === undefined ? [] : _config$states;


            var stateIds = states.map(function (state, index) {
                return state.id;
            });

            return stateIds;
        }
    }, {
        key: "rulesRequired",
        get: function get() {
            // return ["key", "is", "value"];
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
                    "rules": {
                        "type": "array"
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
            var _state$inputs = this.state.inputs,
                inputs = _state$inputs === undefined ? [] : _state$inputs;

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
                                            "type": "string"
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
            var states = this.states,
                typesSchemas = this.typesSchemas;


            var errorCollection = states.reduce(function (errors, state, index) {
                var type = state.type;


                if (type && typesSchemas[type]) {
                    var _validate = new typesSchemas[type](state, index).validate(),
                        typeErrors = _validate.errors;

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
                                        "id": {
                                            "type": "string"
                                        },
                                        "src": {
                                            "type": "string"
                                        },
                                        "kind": {
                                            "type": "string"
                                        },
                                        "default": {
                                            "type": "boolean"
                                        },
                                        "cues": {
                                            "type": "array",
                                            "items": [{
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "string"
                                                    },
                                                    "start": {
                                                        "type": "number"
                                                    },
                                                    "end": {
                                                        "type": "number"
                                                    },
                                                    "payload": {
                                                        "type": "string"
                                                    },
                                                    "align": {
                                                        "type": "string"
                                                    },
                                                    "position": {
                                                        "type": "string"
                                                    },
                                                    "size": {
                                                        "type": "string"
                                                    },
                                                    "vertical": {
                                                        "type": "string"
                                                    }
                                                },
                                                "required": ["id", "start", "end", "payload"]
                                            }]
                                        },
                                        "required": ["id", "kind"]

                                    }
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

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL2l2eC1qcy12YWxpZGF0aW9uL2NvbmZpZy5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vaXZ4LWpzLXZhbGlkYXRpb24vY29uZmlnLnN0YXRlcy5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vaXZ4LWpzLXZhbGlkYXRpb24vZXhwZXJpZW5jZS5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vaXZ4LWpzLXZhbGlkYXRpb24vaW5kZXguanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL2l2eC1qcy12YWxpZGF0aW9uL21vZHVsZXMuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL2l2eC1qcy12YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vc2NoZW1hL3NjaGVtYXMvYmFzZS1zdHJ1Y3R1cmUuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL2h0bWwtb2JqZWN0LmpzIiwic3JjL21vZHVsZXMvdmFsaWRhdGlvbi9zY2hlbWEvc2NoZW1hcy9pbnB1dHMuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3J1bGVzLmpzIiwic3JjL21vZHVsZXMvdmFsaWRhdGlvbi9zY2hlbWEvc2NoZW1hcy9zdGF0ZXMuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3N0YXRlcy50eXBlcy5odG1sLmpzIiwic3JjL21vZHVsZXMvdmFsaWRhdGlvbi9zY2hlbWEvc2NoZW1hcy9zdGF0ZXMudHlwZXMuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3N0YXRlcy50eXBlcy5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vc2NoZW1hL3NjaGVtYXMvc3RhdGVzLnR5cGVzLm5hdmlnYXRpb24uanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3N0YXRlcy50eXBlcy52aWRlby5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7Ozs7O0lBRWEsZ0IsV0FBQSxnQjs7O0FBRVQsZ0NBQXdCO0FBQUEsWUFBWixNQUFZLHVFQUFILEVBQUc7O0FBQUE7O0FBQUE7O0FBRXBCLGNBQUssTUFBTCxHQUFjLE1BQWQ7QUFGb0I7QUFHdkI7Ozs7NEJBRXFCO0FBQ2xCLG1CQUFPLENBQ0gsS0FBSyxZQURGLEVBRUgsS0FBSyxrQkFGRixFQUdILEtBQUssb0JBSEYsRUFJSCxLQUFLLGdCQUpGLENBQVA7QUFNSDs7OzRCQUVxQjtBQUFBLHVCQUNJLHlDQUEyQixLQUFLLE1BQUwsQ0FBWSxNQUF2QyxDQURKO0FBQUEsZ0JBQ2IsS0FEYSxRQUNiLEtBRGE7QUFBQSxnQkFDTixNQURNLFFBQ04sTUFETTs7QUFHbEIsZ0JBQUcsQ0FBQyxLQUFKLEVBQVU7QUFDTixxQkFBSyxTQUFMLENBQWUsTUFBZjtBQUNIOztBQUVELG1CQUFPO0FBQ0gsdUJBQVEsS0FETDtBQUVILHVCQUFPO0FBQ0gsMEJBQU8sU0FESjtBQUVILDBCQUFPLGVBRko7QUFHSCw2QkFBVTtBQUhQO0FBRkosYUFBUDtBQVNIOzs7NEJBRXlCO0FBQUEsZ0JBQ2hCLEtBRGdCLEdBQ1AsS0FBSyxrQkFERSxDQUNoQixLQURnQjs7O0FBR3JCLGdCQUFHLENBQUMsS0FBSixFQUFXOztBQUhVLGdCQUtoQixZQUxnQixHQUtBLEtBQUssTUFMTCxDQUtoQixZQUxnQjs7QUFNckIsZ0JBQUksYUFBYSxhQUFhLE1BQWIsR0FBc0IsQ0FBdkM7QUFDQSxnQkFBSSxZQUFZLGFBQWEsVUFBYixDQUFoQjs7QUFFQSxtQkFBTztBQUNILHVCQUFRLFVBQVUsT0FBVixJ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YyxRQUFRLFFBQVIsQ0FBZDs7QUFFQSxvQkFBSSxjQUFjLE9BQWQsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUNwQyxrQ0FBYyxXQUFkO0FBQ0E7QUFDSDs7QUFFRCw4QkFBYyxXQUFkO0FBQ0EsMEJBQVUsV0FBVjtBQUNILGFBWEQ7O0FBYUEsbUJBQU8sV0FBUDtBQUNIOztBQUlEOzs7Ozs7Ozs7bUNBTXFDO0FBQUEsZ0JBQTVCLFVBQTRCLHVFQUFmLEVBQWU7QUFBQSxnQkFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2pDLGdCQUFJLFlBQVk7QUFDWiwwQkFBVSxJQURFO0FBRVosd0JBQVE7QUFGSSxhQUFoQjtBQUlBLGdCQUFJLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVM7QUFDbEIsZ0NBQWdCLEdBQWhCLElBQXVCLEVBQXZCO0FBQ0EsMkJBQVcsT0FBWCxDQUFtQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLHdCQUFJLFlBQVksS0FBSyxHQUFMLENBQVMsZ0JBQWdCLEdBQWhCLENBQVQsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBQWhCOztBQUVBLHdCQUFJLFNBQUosRUFBZTtBQUNYLGtDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0I7QUFDbEIsaUNBQUssR0FEYTtBQUVsQixtQ0FBTyxLQUZXO0FBR2xCLG1DQUFPLFFBQVEsR0FBUjtBQUhXLHlCQUF0QjtBQUtBLGtDQUFVLFFBQVYsR0FBcUIsS0FBckI7QUFDSCxxQkFQRCxNQU9PO0FBQ0gsd0NBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTBCLFFBQVEsR0FBUixDQUExQjtBQUNIO0FBQ0osaUJBYkQ7QUFjSCxhQWhCRDs7QUFrQkEsbUJBQU8sU0FBUDtBQUNIOzs7Ozs7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge1ZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbi5qcyc7XHJcbmltcG9ydCB7Q29uZmlnU3RhdGVzVmFsaWRhdGlvbn0gZnJvbSAnLi9jb25maWcuc3RhdGVzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maWdWYWxpZGF0aW9uIGV4dGVuZHMgVmFsaWRhdGlvbntcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnID0ge30pe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7ICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbGlkYXRpb25BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB0aGlzLmhhc1N0YXRlc09iaixcclxuICAgICAgICAgICAgdGhpcy5oYXNEZWZhdWx0U3RhdGVPYmosXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWREZWZhdWx0U3RhdGVPYmosXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRTdGF0ZUNvbmZpZ1xyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2YWxpZFN0YXRlQ29uZmlnKCl7XHJcbiAgICAgICAgbGV0IHt2YWxpZCwgZXJyb3JzfSA9IG5ldyBDb25maWdTdGF0ZXNWYWxpZGF0aW9uKHRoaXMuY29uZmlnLnN0YXRlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXZhbGlkKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsaWQgOiB2YWxpZCxcclxuICAgICAgICAgICAgZXJyb3I6IHtcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnaW52YWxpZCcsXHJcbiAgICAgICAgICAgICAgICBwYXRoIDogJ2NvbmZpZy5zdGF0ZXMnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA6IFwiRXhwZXJpZW5jZSByZXF1aXJlcyB0aGF0IGFsbCBzdGF0ZXMgYXJlIHZhbGlkXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbGlkRGVmYXVsdFN0YXRlT2JqKCl7XHJcbiAgICAgICAgIGxldCB7dmFsaWR9ID0gdGhpcy5oYXNEZWZhdWx0U3RhdGVPYmo7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBpZighdmFsaWQpIHJldHVybjtcclxuICAgICAgICAgXHJcbiAgICAgICAgIGxldCB7ZGVmYXVsdFN0YXRlfSA9IHRoaXMuY29uZmlnO1xyXG4gICAgICAgICBsZXQgZmluYWxJbmRleCA9IGRlZmF1bHRTdGF0ZS5sZW5ndGggLSAxO1xyXG4gICAgICAgICBsZXQgbGFzdFN0YXRlID0gZGVmYXVsdFN0YXRlW2ZpbmFsSW5kZXhdO1xyXG4gICAgICAgICBcclxuICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgIHZhbGlkIDogbGFzdFN0YXRlLnN0YXRlSWQgJiYgbGFzdFN0YXRlLnN0YXRlSWQubGVuZ3RoID49IDAsXHJcbiAgICAgICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwibWlzc2luZ1wiLFxyXG4gICAgICAgICAgICAgICAgIFwicGF0aFwiIDogYGNvbmZpZy5kZWZhdWx0U3RhdGVbJHtmaW5hbEluZGV4fV0uc3RhdGVJZGBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGhhc0RlZmF1bHRTdGF0ZU9iaigpe1xyXG4gICAgICAgIGxldCB7ZGVmYXVsdFN0YXRlID0gW119ID0gdGhpcy5jb25maWc7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRTdGF0ZUV4aXN0cyA9IHR5cGVvZiBkZWZhdWx0U3RhdGUgIT09J3VuZGVmaW5lZCcgJiYgZGVmYXVsdFN0YXRlLmxlbmd0aCA+PSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbGlkIDogZGVmYXVsdFN0YXRlRXhpc3RzLFxyXG4gICAgICAgICAgICBlcnJvcjp7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwibWlzc2luZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXRoXCIgOiBcImNvbmZpZy5kZWZhdWx0U3RhdGVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBkZWZhdWx0U3RhdGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBoYXNTdGF0ZXNPYmooKXtcclxuICAgICAgICBsZXQge3N0YXRlc30gPSB0aGlzLmNvbmZpZztcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWxpZCA6IHR5cGVvZiBzdGF0ZXMgIT09ICd1bmRlZmluZWQnICYmIHN0YXRlcy5sZW5ndGggPj0gMSxcclxuICAgICAgICAgICAgZXJyb3IgOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwibWlzc2luZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXRoXCIgOiBcImNvbmZpZy5zdGF0ZXNcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhIDogc3RhdGVzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn07IiwiaW1wb3J0IHsgT2JqZWN0UGFyc2VycywgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQge1ZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbi5qcyc7XHJcblxyXG5sZXQgb2JqZWN0UGFyc2VycyA9IG5ldyBPYmplY3RQYXJzZXJzKClcclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpXHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU3RhdGVzVmFsaWRhdGlvbiBleHRlbmRzIFZhbGlkYXRpb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlcyA9IFtdKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsaWRhdGlvbkFycmF5KCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHRoaXMudW5pcXVlVmFsaWRTdGF0ZURhdGEsXHJcbiAgICAgICAgICAgIHRoaXMuZmlsbGVkVmFsaWRTdGF0ZURhdGFcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydFRvQ29uZmlnRXJyb3JPYmpzKGVycm9ycywgZXJyb3JUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9ycy5tYXAoKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7a2V5LCB2YWx1ZSwgaW5kZXh9ID0gZXJyb3I7XHJcbiAgICAgICAgICAgIGxldCBlcnJvck9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBlcnJvclR5cGUsXHJcbiAgICAgICAgICAgICAgICBwYXRoIDogYGNvbmZpZy5zdGF0ZXNbJHtpbmRleH1dLiR7a2V5fWBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGVycm9yVHlwZSA9PT0gJ2R1cGxpY2F0ZScpIGVycm9yT2JqZWN0Lm1lc3NhZ2UgPSAgYER1cGxpY2F0ZSB2YWx1ZTogJHt2YWx1ZX1gO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvck9iamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBmaWxsZWRWYWxpZFN0YXRlRGF0YSgpe1xyXG4gICAgICAgIGxldCB7ZXJyb3JzID0gW10sIGlzRW1wdHl9ID0gb2JqZWN0UGFyc2Vycy5hbnlFbXB0eSh0aGlzLnN0YXRlcywgWydpZCcsICd1cmwnLCAndHlwZSddKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcnModGhpcy5jb252ZXJ0VG9Db25maWdFcnJvck9ianMoZXJyb3JzLCAnbWlzc2luZycpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWxpZDogIWlzRW1wdHksXHJcbiAgICAgICAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnY29uZmlnLnN0YXRlcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnTm90IGFsbCBzdGF0ZVxcJ3MgaGF2ZSBhbiBpZCwgdXJsLCBhbmQvb3IgdHlwZScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW52YWxpZCdcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGVzXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5pcXVlVmFsaWRTdGF0ZURhdGEoKSB7XHJcblxyXG4gICAgICAgIGxldCB7ZXJyb3JzID0gW10sIGlzVW5pcXVlOiB2YWxpZCB9ID0gb2JqZWN0UGFyc2Vycy5pc1VuaXF1ZSh0aGlzLnN0YXRlcywgWydpZCcsICd1cmwnXSk7XHJcblxyXG4gICAgICAgIGlmICghdmFsaWQpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JzKHRoaXMuY29udmVydFRvQ29uZmlnRXJyb3JPYmpzKGVycm9ycywgJ2R1cGxpY2F0ZScpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWxpZDogdmFsaWQsXHJcbiAgICAgICAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnY29uZmlnLnN0YXRlcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnTm90IGFsbCBzdGF0ZVxcJ3MgaWRzIGFuZCB1cmxzIGFyZSB1bmlxdWUnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludmFsaWQnXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnN0YXRlc1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufTsiLCJpbXBvcnQge1ZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbi5qcyc7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHBlcmllbmNlVmFsaWRhdGlvbiBleHRlbmRzIFZhbGlkYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlID0ge30pe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbGlkYXRpb25BcnJheSgpe1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRBbmltYXRlRWxlbWVudE9iaixcclxuICAgICAgICAgICAgdGhpcy52YWxpZFNldERhdGFPYmpcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdmFsaWRBbmltYXRlRWxlbWVudE9iaigpe1xyXG4gICAgICAgIGxldCB7YW5pbWF0ZUVsZW1lbnR9ID0gdGhpcy5leHBlcmllbmNlO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbGlkIDogdHlwZW9mIGFuaW1hdGVFbGVtZW50ICE9PSAndW5kZWZpbmVkJyxcclxuICAgICAgICAgICAgZXJyb3IgOiB7XHJcbiAgICAgICAgICAgICAgICBwYXRoIDogJ2V4cGVyaWVuY2UuYW5pbWF0ZUVsZW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6IFwibWlzc2luZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGEgOiBhbmltYXRlRWxlbWVudCAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbGlkU2V0RGF0YU9iaigpe1xyXG4gICAgICAgIGxldCB7c2V0RGF0YX0gPSB0aGlzLmV4cGVyaWVuY2U7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsaWQgOiB0eXBlb2Ygc2V0RGF0YSAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgICAgIGVycm9yIDoge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA6ICdleHBlcmllbmNlLnNldERhdGEnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJtaXNzaW5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YSA6IHNldERhdGEgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59OyIsImltcG9ydCB7IE9iamVjdFBhcnNlcnMsIFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gJy4vdmFsaWRhdGlvbi5qcyc7XHJcbmltcG9ydCB7IEV4cGVyaWVuY2VWYWxpZGF0aW9uIH0gZnJvbSAnLi9leHBlcmllbmNlLmpzJztcclxuaW1wb3J0IHsgTW9kdWxlVmFsaWRhdGlvbiB9IGZyb20gJy4vbW9kdWxlcy5qcyc7XHJcbmltcG9ydCB7IENvbmZpZ1ZhbGlkYXRpb24gfSBmcm9tICcuL2NvbmZpZy5qcyc7XHJcblxyXG5sZXQgb2JqZWN0UGFyc2VycyA9IG5ldyBPYmplY3RQYXJzZXJzKClcclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpXHJcblxyXG5leHBvcnQgY2xhc3MgaVZYanNWYWxpZGF0aW9uIGV4dGVuZHMgVmFsaWRhdGlvbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuXHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHtcclxuICAgICAgdGhpcy5lcnJvciA9IHtcclxuICAgICAgICBtZXNzYWdlOiB0aGlzLmNvbGxlY3RFcnJvck1lc3NhZ2VzKCksXHJcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgIGVycm9yczogdGhpcy5lcnJvcnNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGVjdEVycm9yTWVzc2FnZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lcnJvcnMucmV2ZXJzZSgpLnJlZHVjZSgoZXJyb3JNZXNzYWdlcywgZXJyb3JPYmopID0+IHtcclxuICAgICAgbGV0IHtlcnJvcn0gPSBlcnJvck9ialxyXG4gICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlc31cclxuVFlQRTogJHtlcnJvci50eXBlID8gZXJyb3IudHlwZSA6ICdFUlJPUid9ICBQQVRIOiAke2Vycm9yLnBhdGh9ICR7ZXJyb3IubWVzc2FnZSAmJiBlcnJvci5tZXNzYWdlLmxlbmd0aCA+IDAgPyAnTUVTU0FHRTogJyArIGVycm9yLm1lc3NhZ2UgKyAnJyA6ICcnfWBcclxuICAgIH0sICcnKTtcclxuICB9XHJcblxyXG4gIGdldCB2YWxpZGF0aW9uQXJyYXkoKSB7XHJcbiAgICBsZXQgY3VycmVudFZhbGlkYXRpb25BcnJheSA9IFtcclxuICAgICAgdGhpcy5ydWxlVmFsaWRhdGlvbk9iaixcclxuICAgICAgdGhpcy5leHBlcmllbmNlVmFsaWRhdGlvbk9iaixcclxuICAgICAgdGhpcy5jb25maWdWYWxpZGF0aW9uT2JqXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRWYWxpZGF0aW9uQXJyYXlcclxuICB9XHJcblxyXG4gIGdldCBjb25maWdWYWxpZGF0aW9uT2JqKCkge1xyXG4gICAgbGV0IHtjb25maWd9ID0gdGhpcy5kYXRhO1xyXG4gICAgbGV0IHt2YWxpZCwgZXJyb3JzfSA9IG5ldyBDb25maWdWYWxpZGF0aW9uKGNvbmZpZyk7XHJcblxyXG4gICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB2YWxpZCxcclxuICAgICAgZXJyb3I6IHtcclxuICAgICAgICBcInBhdGhcIjogXCJjb25maWdcIixcclxuICAgICAgICBcIm1lc3NhZ2VcIjogXCJBbiBleHBlcmllbmNlIG11c3QgaGF2ZSBhIHZhbGlkIGNvbmZpZ1wiLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImludmFsaWRcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0IGV4cGVyaWVuY2VWYWxpZGF0aW9uT2JqKCkge1xyXG4gICAgbGV0IHtleHBlcmllbmNlfSA9IHRoaXMuZGF0YVxyXG4gICAgbGV0IHt2YWxpZCwgZXJyb3JzfSA9IG5ldyBFeHBlcmllbmNlVmFsaWRhdGlvbihleHBlcmllbmNlKVxyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmICghdmFsaWQpIHtcclxuICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdmFsaWQsXHJcbiAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgcGF0aDogJ2V4cGVyaWVuY2UnLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdBbiBleHBlcmllbmNlIG11c3Qgbm90IGhhdmUgYW55IGVycm9ycycsXHJcbiAgICAgICAgdHlwZTogJ2ludmFsaWQnXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBleHBlcmllbmNlXHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHJ1bGVWYWxpZGF0aW9uT2JqKCkge1xyXG4gICAgbGV0IHtydWxlc30gPSB0aGlzLmRhdGFcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHlwZW9mIHJ1bGVzICE9PSAndW5kZWZpbmVkJyxcclxuICAgICAgZXJyb3I6IHtcclxuICAgICAgICBuYW1lOiAnTWlzc2luZyBSdWxlczonLFxyXG4gICAgICAgIG1lc3NhZ2U6IGBUaGUgZnVuY3Rpb24gcnVsZXMgbmVlZHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgZXhwZXJpZW5jZS5gXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGE6IHJ1bGVzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuIiwiaW1wb3J0IHtWYWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xyXG5pbXBvcnQge1R5cGVWYWxpZGF0b3J9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5cclxubGV0IGRlYnVnID0gdHJ1ZTtcclxuZXhwb3J0IGNsYXNzIE1vZHVsZVZhbGlkYXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGV4cGVyaWVuY2Upe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlID0gZXhwZXJpZW5jZTtcclxuICAgICAgICB0aGlzLnR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdmFsaWRhdGlvbkFycmF5KCl7XHJcbiAgICAgICAgbGV0IG1vZHVsZVZhbGlkYXRpb25BcnJheSA9IFtcclxuICAgICAgICAgICAgdGhpcy52YWxpZFVJTW9kdWxlT2JqICAgICAgXHJcbiAgICAgICAgXSAgICBcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbW9kdWxlVmFsaWRhdGlvbkFycmF5O1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgZ2V0IHZhbGlkVUlNb2R1bGVPYmooKXtcclxuICAgICAgICBsZXQge3VpfSA9IHRoaXMuZXhwZXJpZW5jZTtcclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbGlkIDogdHlwZW9mIHVpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnR5cGVWYWxpZGF0b3IuaXNTdHJpbmcodWkpICYmICB1aS5sZW5ndGggPiAwLFxyXG4gICAgICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgICAgIFwicGF0aFwiIDogXCJ1aVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm1pc3NpbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhIDogdWlcclxuICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgIH1cclxuICAgICAgXHJcbn07IiwiZXhwb3J0IGNsYXNzIFZhbGlkYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsaWRhdGlvbkFycmF5KCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsaWQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25BcnJheS5yZWR1Y2UoKGlzVmFsaWQsIGlzUGFydFZhbGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCFpc1BhcnRWYWxpZCkgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXNQYXJ0VmFsaWQudmFsaWQgPT09ICdib29sZWFuJyAmJiAhaXNQYXJ0VmFsaWQudmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JzLnB1c2goaXNQYXJ0VmFsaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkICYmIGlzUGFydFZhbGlkLnZhbGlkO1xyXG4gICAgICAgIH0sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhuZXdFcnJvcnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbmV3RXJyb3JzLmZvckVhY2goKGVycm9yT2JqKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3JzLnB1c2goZXJyb3JPYmopXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn07IiwiaW1wb3J0IHtpVlhqc1ZhbGlkYXRpb259IGZyb20gJy4uL2l2eC1qcy12YWxpZGF0aW9uL2luZGV4LmpzJztcclxuaW1wb3J0IHtCYXNlU3RydWN0dXJlfSBmcm9tICcuL3NjaGVtYXMvYmFzZS1zdHJ1Y3R1cmUuanMnO1xyXG5pbXBvcnQge1N0YXRlc1R5cGVzfSBmcm9tICcuL3NjaGVtYXMvc3RhdGVzLnR5cGVzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTY2hlbWFWYWxpZGF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0ge307XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFzVmFsaWRhdGlvbkxpYnJhcnkudmFsaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5oYXNWYWxpZGF0aW9uTGlicmFyeS5lcnJvci5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JzIDogW3RoaXMuaGFzVmFsaWRhdGlvbkxpYnJhcnldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnZhbGlkKSB7XHJcbiAgICAgICAgICAgICB0aGlzLmVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5jb2xsZWN0RXJyb3JNZXNzYWdlcygpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JzIDogdGhpcy5lcnJvcnNcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLmxlbmd0aCA8PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBlcnJvcnMoKSB7XHJcbiAgICAgICAgbGV0IHtiYXNlVmFsaWRhdGUsIHN0YXRlVHlwZXNWYWxpZGF0aW9uLCBkYXRhfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjb25maWd9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yQXJyYXkgPSBbXTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgYmFzZVZhbGlkYXRlLmVycm9ycy5mb3JFYWNoKChlcnJvck9iaiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgZXJyb3JBcnJheS5wdXNoKGVycm9yT2JqKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhdGVUeXBlc1ZhbGlkYXRpb24uZm9yRWFjaCgoZXJyb3JPYmosIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9yQXJyYXkucHVzaChlcnJvck9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IG1vZGlmaWVkRXJyb3JBcnJheSA9IGVycm9yQXJyYXkubWFwKChlcnJvciwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA6IHNlbGYuY3JlYXRlRXJyb3JNZXNzYWdlKGVycm9yKSxcclxuICAgICAgICAgICAgICAgIHBhdGggOiBzZWxmLmNyZWF0ZVBhdGgoYCR7ZXJyb3IuZGF0YVBhdGh9YCksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzZWxmLmdldEVycm9yQ29kZShlcnJvci5jb2RlKVxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5jb2xsZWN0RXJyb3JNZXNzYWdlcyhiYXNlVmFsaWRhdGUuZXJyb3JzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVkRXJyb3JBcnJheTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRXJyb3JNZXNzYWdlKGVycm9yKXtcclxuICAgICAgICBsZXQge2NvZGV9ID0gZXJyb3I7XHJcbiAgICAgICAgc3dpdGNoKGNvZGUpe1xyXG4gICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlT25lT2ZFcnJvck1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVPbmVPZkVycm9yTWVzc2FnZShlcnJvcil7XHJcbiAgICAgICAgICAgIGxldCB7c3ViRXJyb3JzfSA9IGVycm9yO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViRXJyb3JzLnJlZHVjZSgoZXJyb3JNZXNzYWdlLCBzdWJFcnJvciwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgJHtzdWJFcnJvci5tZXNzYWdlfTxicj5gXHJcbiAgICAgICAgICAgIH0sIGA8c3Ryb25nPlRoZSBkYXRhIHZpb2xhdGVzIE9ORSBvZiB0aGUgZm9sbG93aW5nIHJlcXVpcmVtZW50czo8L3N0cm9uZz48YnI+YCkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQYXRoKGRhdGFQYXRoKXtcclxuICAgICAgICBsZXQge2NvbmZpZ30gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IGRhdGFQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gY29uZmlnO1xyXG4gICAgICAgIGxldCBwYXRoID0gcGF0aFBhcnRzLnJlZHVjZSgoZnVsbFBhdGgsIGN1cnJlbnRQYXRoUGFydCwgaW5kZXgpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFBhdGhQYXJ0Lmxlbmd0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdWxsUGF0aDtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGlmKGZ1bGxQYXRoLmxlbmd0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uW2N1cnJlbnRQYXRoUGFydF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y3VycmVudFBhdGhQYXJ0fWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFpc05hTihjdXJyZW50UGF0aFBhcnQpKXtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbkluZGV4ID0gcGFyc2VJbnQoY3VycmVudFBhdGhQYXJ0KTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb25bbG9jYXRpb25JbmRleF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZnVsbFBhdGh9WyR7Y3VycmVudFBhdGhQYXJ0fV1gO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbltjdXJyZW50UGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2Z1bGxQYXRofS4ke2N1cnJlbnRQYXRoUGFydH1gO1xyXG5cclxuICAgICAgICB9LCAnJylcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwicGF0aFN0cmluZ1wiIDogcGF0aCxcclxuICAgICAgICAgICAgXCJkYXRhXCIgOiBsb2NhdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbGxlY3RFcnJvck1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ycy5yZWR1Y2UoKGVycm9yTWVzc2FnZXMsIGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIHJldHVybiBgJHtlcnJvck1lc3NhZ2VzfVxyXG4gICAgICAgIFRZUEU6ICR7c2VsZi5nZXRFcnJvckNvZGUoZXJyb3IuY29kZSl9ICBQQVRIOiAke2Vycm9yLnBhdGgucGF0aFN0cmluZ30gTUVTU0FHRSA6ICR7ZXJyb3IubWVzc2FnZX1gXHJcbiAgICAgICAgICAgIH0sICcnKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVycm9yQ29kZShlcnJvckNvZGUpe1xyXG4gICAgICAgIGxldCBlcnJvckNvZGVzID0gT2JqZWN0LnZhbHVlcyh0djQuZXJyb3JDb2Rlcyk7XHJcbiAgICAgICAgbGV0IGVycm9yS2V5cyA9IE9iamVjdC5rZXlzKHR2NC5lcnJvckNvZGVzKTtcclxuICAgICAgICBsZXQgZXJyb3JDb2RlS2V5ID0gXCJcIjtcclxuICAgICAgXHJcbiAgICAgICAgZXJyb3JDb2Rlcy5mb3JFYWNoKCh0aGlzRXJyb3JDb2RlLCBpbmRleCkgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXNFcnJvckNvZGUgPT09IGVycm9yQ29kZSl7XHJcbiAgICAgICAgICAgICAgICBlcnJvckNvZGVLZXkgPSBlcnJvcktleXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yQ29kZUtleVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgYmFzZVZhbGlkYXRlKCkge1xyXG4gICAgICAgIGxldCB7Y29uZmlnfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICByZXR1cm4gbmV3IEJhc2VTdHJ1Y3R1cmUoY29uZmlnKS52YWxpZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdGF0ZVR5cGVzVmFsaWRhdGlvbigpe1xyXG4gICAgICAgIGxldCB7c3RhdGVzfSA9IHRoaXMuZGF0YS5jb25maWc7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgU3RhdGVzVHlwZXMoc3RhdGVzKS52YWxpZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoYXNWYWxpZGF0aW9uTGlicmFyeSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcInZhbGlkXCI6IHR5cGVvZiB0djQgIT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgICAgICBlcnJvcjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwiaW5pdCgpXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJTY2hlbWEgdmFsaWRhdGlvbiByZXF1aXJlZCB0aGUgJ3R2NCcgbGlicmFyeSAoaHR0cHM6Ly9naXRodWIuY29tL2dlcmFpbnRsdWZmL3R2NClcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm1pc3NpbmdcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnQgPSBpbml0aWFsaXplU2NoZW1hVmFsaWRhdGlvbjtcclxuXHJcbmlmIChhbmd1bGFyICYmIGFuZ3VsYXIubW9kdWxlKCdpdngtanMnKSkge1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2l2eC1qcycpXHJcbiAgICAgICAgLmNvbnN0YW50KCdpVlhqcy52YWxpZGF0aW9uLnNjaGVtYScsIGluaXRpYWxpemVTY2hlbWFWYWxpZGF0aW9uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZVNjaGVtYVZhbGlkYXRpb24oc2V0dGluZ3MpIHtcclxuICAgIHJldHVybiBTY2hlbWFWYWxpZGF0aW9uO1xyXG59OyIsImltcG9ydCB7UnVsZXN9IGZyb20gJy4vcnVsZXMuanMnOyBcbmltcG9ydCB7U3RhdGVzfSBmcm9tICcuL3N0YXRlcy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCYXNlU3RydWN0dXJlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpe1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5ydWxlc1NjaGVtYSA9IG5ldyBSdWxlcyhjb25maWcpLnNjaGVtYTtcbiAgICAgICAgdGhpcy5zdGF0ZVNjaGVtYSA9IG5ldyBTdGF0ZXMoY29uZmlnKS5zY2hlbWE7XG5cbiAgICAgICBcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpe1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHR2NC52YWxpZGF0ZU11bHRpcGxlKHRoaXMuY29uZmlnLCB0aGlzLnNjaGVtYSk7XG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlU3RydWN0dXJlXG4gICAgfVxuXG4gICAgZ2V0IGJhc2VTdHJ1Y3R1cmUoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgcmVxdWlyZWQgOiB0aGlzLnJlcXVpcmVkS2V5c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHByb3BlcnRpZXMoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFN0YXRlXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiIDogdGhpcy5ydWxlc1NjaGVtYVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic3RhdGVzXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiIDogdGhpcy5zdGF0ZVNjaGVtYSxcbiAgICAgICAgICAgICAgICBcIm1pbkl0ZW1zXCIgOiBcIjFcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHJlcXVpcmVkS2V5cygpe1xuICAgICAgICByZXR1cm4gW1wiZGVmYXVsdFN0YXRlXCIsIFwic3RhdGVzXCJdXG4gICAgfVxuXG5cbn0iLCJleHBvcnQgY2xhc3MgSFRNTE9iamVjdHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnZXQgZ2VuZXJhbEhUTUxTY2hlbWEoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiIDoge1xuICAgICAgICAgICAgICAgIFwiaHRtbFwiIDp7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJjbGFzc2VzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZVVybFwiIDp7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBsYWJlbEhUTUxTY2hlbWEoKXtcblxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgSW5wdXRFcnJvcnMge1xuICAgIGNvbnN0cnVjdG9yKGlucHV0cywgY3VycmVudFN0YXRlKSB7XG4gICAgICAgIHRoaXMuaW5wdXRzID0gaW5wdXRzO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRTdGF0ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgbGV0IHtpbnB1dHMsIGlucHV0U2NoZW1hc30gPSB0aGlzO1xuICAgICAgICBsZXQgYWxsSW5wdXRFcnJvcnMgPSBpbnB1dHMucmVkdWNlKChpbnB1dEVycm9ycywgaW5wdXQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQge3R5cGV9ID0gaW5wdXQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlICYmIGlucHV0U2NoZW1hc1t0eXBlXSkge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvcnMgPSB0djQudmFsaWRhdGVNdWx0aXBsZShpbnB1dCwgaW5wdXRTY2hlbWFzW3R5cGVdKS5lcnJvcnM7XG4gICAgICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goKHRoaXNJbnB1dEVycm9yLCBlcnJvckluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNJbnB1dEVycm9yLmRhdGFQYXRoID0gYC9pbnB1dHMvJHtpbmRleH0ke3RoaXNJbnB1dEVycm9yLmRhdGFQYXRoLmxlbmd0aCA+IDAgPyB0aGlzSW5wdXRFcnJvci5kYXRhUGF0aCA6ICcnfWA7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0RXJyb3JzLnB1c2godGhpc0lucHV0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5wdXRFcnJvcnM7XG5cbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiBhbGxJbnB1dEVycm9ycztcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRTY2hlbWFzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnV0dG9uczogdGhpcy5idXR0b25zU2NoZW1hLFxuICAgICAgICAgICAgY2hlY2tib3g6IHRoaXMuY2hlY2tib3hTY2hlbWEsXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVTY2hlbWEsXG4gICAgICAgICAgICBcImRhdGV0aW1lLWxvY2FsXCI6IHRoaXMuZGF0ZXRpbWVMb2NhbFNjaGVtYSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLnRleHRTY2hlbWEsXG4gICAgICAgICAgICBudW1iZXI6IHRoaXMubnVtYmVyU2NoZW1hLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zU2NoZW1hLFxuICAgICAgICAgICAgcmFkaW86IHRoaXMucmFkaW9TY2hlbWEsXG4gICAgICAgICAgICB0ZXh0OiB0aGlzLnRleHRTY2hlbWEsXG4gICAgICAgICAgICB0ZXh0YXJlYTogdGhpcy50ZXh0U2NoZW1hLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnRleHRTY2hlbWFcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGJ1dHRvbnNTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiOiBbXCJidXR0b25zXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNob3dMYWJlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbGVhblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsSFRNTFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsVGVtcGxhdGVVcmxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc2VzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnROYW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJ2YWx1ZVwiXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIm1pbkl0ZW1zXCI6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY2hlY2tib3hTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiOiBbXCJjaGVja2JveFwiXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkYXRlU2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1wiZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1pblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXR0ZXJuXCI6IFwiL15bMC05XXsyfVxcL1swLTldezJ9XFwvWzAtOV17NH0kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0dGVyblwiOiBcIi9eWzAtOV17Mn1cXC9bMC05XXsyfVxcL1swLTldezR9JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGRhdGV0aW1lTG9jYWxTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiOiBbXCJkYXRldGltZS1sb2NhbFwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1pblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXR0ZXJuXCI6IFwiL15bMC05XXsyfVxcL1swLTldezJ9XFwvWzAtOV17NH0kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0dGVyblwiOiBcIi9eWzAtOV17Mn1cXC9bMC05XXsyfVxcL1swLTldezR9JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG51bWJlclNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbnVtXCI6IFtcIm51bWJlclwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWluXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5pbXVtXCI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJleGNsdXNpdmVNaW5pbXVtXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBvcHRpb25zU2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1wib3B0aW9uc1wiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0RGlzcGxheVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1pbkl0ZW1zXCI6IDIsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJ2YWx1ZVwiLCBcImRpc3BsYXlcIl1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCByYWRpb1NjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbnVtXCI6IFtcInJhZGlvXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJhZGlvQnV0dG9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbEhUTUxcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxUZW1wbGF0ZVVybFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc2VzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCIgOiBbXCJ2YWx1ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib25lT2ZcIiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1wibGFiZWxcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImxhYmVsSFRNTFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1wibGFiZWxUZW1wbGF0ZVVybFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJtaW5JdGVtc1wiOiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRleHRTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiOiBbXCJ0ZXh0XCIsIFwiZW1haWxcIiwgXCJ1cmxcIiwgXCJ0ZXh0YXJlYVwiXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxuIiwiZXhwb3J0IGNsYXNzIFJ1bGVzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpe1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZzsgICAgICBcbiAgICB9XG5cbiAgICBnZXQgc3RhdGVJZEVudW1zKCl7XG4gICAgICAgIGxldCB7c3RhdGVzID0gW119ID0gdGhpcy5jb25maWc7XG5cbiAgICAgICAgbGV0IHN0YXRlSWRzID0gc3RhdGVzLm1hcCgoc3RhdGUsIGluZGV4KSA9PntcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5pZDtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc3RhdGVJZHM7XG5cbiAgICB9XG5cbiAgICBnZXQgcnVsZXNSZXF1aXJlZCgpe1xuICAgICAgICAvLyByZXR1cm4gW1wia2V5XCIsIFwiaXNcIiwgXCJ2YWx1ZVwiXTtcbiAgICB9XG5cbiAgICBnZXQgc2NoZW1hKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcIm5hbWVcIiA6IFwiUnVsZSBTY2hlbWFcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJzdGF0ZUlkXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbnVtXCIgOiB0aGlzLnN0YXRlSWRFbnVtc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJydWxlXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIiAgOjFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW51bVwiIDogW1wibHRcIiwgXCJsdGVcIiwgXCJndFwiLCBcImd0ZVwiLCBcImVxdWFsc1wiLCBcIm5vdEVxdWFsc1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIiA6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogW1wic3RyaW5nXCIsIFwibnVtYmVyXCIsIFwiYm9vbGVhblwiLCBcIm9iamVjdFwiLCBcImFycmF5XCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IHRoaXMucnVsZXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1wic3RhdGVJZFwiXVxuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQge1J1bGVzfSBmcm9tICcuL3J1bGVzLmpzJzsgXG5pbXBvcnQge0hUTUxPYmplY3R9IGZyb20gJy4vaHRtbC1vYmplY3QnO1xuXG5leHBvcnQgY2xhc3MgU3RhdGVzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpe1xuICAgICAgICB0aGlzLnJ1bGVzU2NoZW1hID0gbmV3IFJ1bGVzKGNvbmZpZykuc2NoZW1hO1xuICAgICAgICB0aGlzLmdlbmVyYWxIVE1MU2NoZW1hID0gbmV3IEhUTUxPYmplY3QoKS5nZW5lcmFsSFRNTFNjaGVtYTtcblxuICAgIH1cblxuICAgIGdldCBzdGF0ZVJlcXVpcmVkKCl7XG4gICAgICAgIHJldHVybiBbJ2lkJywgJ25hbWUnLCd1cmwnLCd0eXBlJ11cbiAgICB9XG5cbiAgICBnZXQgdHlwZUVudW0oKXtcbiAgICAgICAgcmV0dXJuIFtcIm5hdmlnYXRpb25cIiwgXCJ2aWRlb1wiLCBcImlucHV0XCIsIFwiaHRtbFwiXTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGVQcm9wZXJ0aWVzKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImlkXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCIgIDoxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJuYW1lXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCIgIDoxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ1cmxcIiA6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJwYXR0ZXJuXCIgOiBcIlxcL14oXFwvW0EtWmEtejAtOS1dKikkXFwvXCIsXG4gICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIiA6MVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYXVkaW9cIiA6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1pbkxlbmd0aFwiIDogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcImxvb3BcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJib29sZWFuXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJjdWVQb2ludHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJzcmNcIl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInR5cGVcIiA6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJlbnVtXCIgOiB0aGlzLnR5cGVFbnVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJuZXh0XCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiIDogdGhpcy5ydWxlc1NjaGVtYVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwib25FbnRlclwiIDoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJhcnJheVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJvbkV4aXRcIiA6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaGVhZGVyXCIgOnRoaXMuZ2VuZXJhbEhUTUxTY2hlbWEsXG4gICAgICAgICAgICBcImZvb3RlclwiIDogdGhpcy5nZW5lcmFsSFRNTFNjaGVtYVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBcInN0YXRlXCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIiA6IHRoaXMuc3RhdGVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogdGhpcy5zdGF0ZVJlcXVpcmVkXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEhUTUxTdGF0ZVNjaGVtYSB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHY0LnZhbGlkYXRlTXVsdGlwbGUodGhpcy5zdGF0ZSwgdGhpcy5zY2hlbWEpO1xuICAgIH1cblxuICAgIGdldCByZXF1aXJlZFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiBbXCJodG1sXCJdXG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcImh0bWxcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZVVybFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInRpbWVvdXRJbk1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJvbmVPZlwiOiBbe1xuICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1wiaHRtbFwiXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1widGVtcGxhdGVVcmxcIl1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQge0lucHV0RXJyb3JzfSBmcm9tICcuL2lucHV0cy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlU2NoZW1hIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgbGV0IGFsbEVycm9ycyA9IFt0djQudmFsaWRhdGVNdWx0aXBsZSh0aGlzLnN0YXRlLCB0aGlzLnNjaGVtYSksIHRoaXMuaW5wdXRFcnJvcnNdXG4gICAgICAgICAgICAucmVkdWNlKChjdXJyZW50RXJyb3JzLCBlcnJvck9iaiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQge2Vycm9yc30gPSBlcnJvck9iajtcbiAgICAgICAgICAgICAgICBlcnJvcnMuZm9yRWFjaCgoZXJyb3IsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRFcnJvcnM7XG4gICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9yczogYWxsRXJyb3JzXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldCBpbnB1dEVycm9ycygpIHtcbiAgICAgICAgbGV0IHtpbmRleH0gPSB0aGlzO1xuICAgICAgICBsZXQge2lucHV0cyA9IFtdfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCBjdXJyZW50SW5wdXRFcnJvcnMgPSBuZXcgSW5wdXRFcnJvcnMoaW5wdXRzLCBpbmRleCkudmFsaWRhdGUoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3JzOiBjdXJyZW50SW5wdXRFcnJvcnNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmb3JtXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsSFRNTFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsVGVtcGxhdGVVcmxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJtaXRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3Nlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxIVE1MXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxUZW1wbGF0ZVVybFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIm9uU3VibWl0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImlucHV0c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWluSXRlbXNcIjogMSxcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pbkxlbmd0aFwiOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3JzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbEhUTUxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFRlbXBsYXRlVXJsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3Nlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGFpbmVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJpYnV0ZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5sZW5ndGhcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DaGFuZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJ0eXBlXCJdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJpbnB1dHNcIl1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn0iLCJpbXBvcnQge0hUTUxTdGF0ZVNjaGVtYX0gZnJvbSAnLi9zdGF0ZXMudHlwZXMuaHRtbC5qcyc7XG5pbXBvcnQge1ZpZGVvU3RhdGVTY2hlbWF9IGZyb20gXCIuL3N0YXRlcy50eXBlcy52aWRlby5qc1wiO1xuaW1wb3J0IHtJbnB1dFN0YXRlU2NoZW1hfSBmcm9tIFwiLi9zdGF0ZXMudHlwZXMuaW5wdXQuanNcIjtcbmltcG9ydCB7TmF2aWdhdGlvblN0YXRlU2NoZW1hfSBmcm9tIFwiLi9zdGF0ZXMudHlwZXMubmF2aWdhdGlvbi5qc1wiO1xuXG5cblxuZXhwb3J0IGNsYXNzIFN0YXRlc1R5cGVze1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlcyl7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gc3RhdGVzO1xuICAgIH1cblxuXG4gICAgdmFsaWRhdGUoKXtcbiAgICAgICAgbGV0IHtzdGF0ZXMsIHR5cGVzU2NoZW1hc30gPSB0aGlzO1xuXG4gICAgICAgIGxldCBlcnJvckNvbGxlY3Rpb24gPSBzdGF0ZXMucmVkdWNlKChlcnJvcnMsIHN0YXRlLCBpbmRleCkgPT57XG4gICAgICAgICAgICBsZXQge3R5cGV9ID0gc3RhdGU7XG4gICAgICAgICAgXG4gICAgICAgICAgICBpZih0eXBlICYmIHR5cGVzU2NoZW1hc1t0eXBlXSl7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQge2Vycm9ycyA6IHR5cGVFcnJvcnN9ID0gbmV3IHR5cGVzU2NoZW1hc1t0eXBlXShzdGF0ZSwgaW5kZXgpLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdHlwZUVycm9ycy5mb3JFYWNoKCh0eXBlRXJyb3IsIGVycm9ySW5kZXgpID0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9kVHlwZUVycm9yID0gdHlwZUVycm9yO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbW9kVHlwZUVycm9yLmRhdGFQYXRoID0gYHN0YXRlcy8ke2luZGV4fSR7bW9kVHlwZUVycm9yLmRhdGFQYXRoLmxlbmd0aCA+IDAgPyBtb2RUeXBlRXJyb3IuZGF0YVBhdGggOiAnJ31gO1xuXG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKHR5cGVFcnJvcik7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIGVycm9yQ29sbGVjdGlvbjtcblxuICAgIH1cblxuICAgIGdldCB0eXBlc1NjaGVtYXMoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwiaHRtbFwiIDogSFRNTFN0YXRlU2NoZW1hLFxuICAgICAgICAgICAgXCJ2aWRlb1wiIDogVmlkZW9TdGF0ZVNjaGVtYSxcbiAgICAgICAgICAgIFwiaW5wdXRcIiA6IElucHV0U3RhdGVTY2hlbWEsXG4gICAgICAgICAgICBcIm5hdmlnYXRpb25cIiA6IE5hdmlnYXRpb25TdGF0ZVNjaGVtYVxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGVTY2hlbWF7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUsIGluZGV4KXtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0djQudmFsaWRhdGVNdWx0aXBsZSh0aGlzLnN0YXRlLCB0aGlzLnNjaGVtYSk7XG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJsaW5rc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtaW5JdGVtc1wiIDogMSxcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxIVE1MXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFRlbXBsYXRlVXJsXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhcmdldFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudW1cIiA6IFtcIl9ibGFua1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1wiaHJlZlwiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImxpbmtzXCJdXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFZpZGVvU3RhdGVTY2hlbWEge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHR2NC52YWxpZGF0ZU11bHRpcGxlKHRoaXMuc3RhdGUsIHRoaXMuc2NoZW1hKTtcbiAgICB9XG5cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwicGxheWVyU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0b3BsYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJvbHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBbXCJib29sZWFuXCIsIFwic3RyaW5nXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1widmlkZW8vbXA0XCIsIFwidmlkZW8vd2VibVwiLCBcInZpZGVvL29nZ1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFtcInNyY1wiLCBcInR5cGVcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pbkl0ZW1zXCI6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFja3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtpbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJib29sZWFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1ZXNcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCIgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnRcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF5bG9hZFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxpZ25cIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFtcImlkXCIsIFwic3RhcnRcIiwgXCJlbmRcIiwgXCJwYXlsb2FkXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCIgOiBbXCJpZFwiLCBcImtpbmRcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJvbmVPZlwiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1wic3JjXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJzb3VyY2VzXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJ2aW1lb0lkXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJ5b3V0dWJlSWRcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInBlcnNvbmFsaXphdGlvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlVXJsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1wiaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9uZU9mXCIgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImh0bWxcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcInRlbXBsYXRlVXJsXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImN1ZVBvaW50c1wiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lQXRcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pbmltdW1cIiA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1widGltZUF0XCJdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJwbGF5ZXJTZXR0aW5nc1wiXVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFR5cGVWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdCh2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKVxyXG4gICAgfVxyXG5cclxuICAgIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdHJpbmcob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcclxuICAgIH1cclxuXHJcbiAgICBpc0Z1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNOdW1iZXIob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQm9vbGVhbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8ICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnZhbHVlT2YoKSA9PT0gJ2Jvb2xlYW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KG9iaikge1xyXG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbiAgICAgICAgbGV0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG9iaik7XHJcbiAgICAgICAgbGV0IGlzU3RyaW5nID0gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XHJcbiAgICAgICAgbGV0IGNoZWNrTGVuZ3RoID0gaXNBcnJheSB8fCBpc1N0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNOYU4ob2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHR5cGVWYWxpZGF0b3IgPSBuZXcgVHlwZVZhbGlkYXRvcigpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBhcnNlcnMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHlvdSB0byBtYXAgYW4gb2JqZWN0IGJ5IHRoZSBrZXlzIG9mIGEgZ2l2ZW4gb2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIG9iamVjdCB0byBtYXA7XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIHJ1biBieSBlYWNoIHZhbHVlIGFuZCBrZXkgIFxyXG4gICAgICovXHJcbiAgICBtYXBLZXlzKG9iamVjdCwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuICAgICAgICBsZXQgbWFwcGVkQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWR1Y2VNYXApIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIG1hcHBlZEFycmF5LnB1c2goY2FsbGJhY2sodmFsLCBrZXkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKGJhc2UsIG1lcmdlZCwgaWdub3JlKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEtleXMgPSBPYmplY3Qua2V5cyhtZXJnZWQpO1xyXG4gICAgICAgIGxldCB1bmlvbmVkT2JqZWN0ID0gbmV3IE9iamVjdChiYXNlKTtcclxuXHJcbiAgICAgICAgbWVyZ2VkS2V5cy5mb3JFYWNoKChtZXJnZWRLZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpZ25vcmUgJiYgaWdub3JlLmluZGV4T2YobWVyZ2VkS2V5KSA+PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHVuaW9uZWRPYmplY3RbbWVyZ2VkS2V5XSA9IG1lcmdlZFttZXJnZWRLZXldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5pb25lZE9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZWR1Y2Uob2JqZWN0LCBjYWxsYmFjaywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG4gICAgICAgICAgICBjdXJyZW50QXJyYXkucHVzaChlbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gY2FsbGJhY2soZGVmYXVsdFZhbHVlLCB2YWwsIGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVyYXRlcyB0aHJvdWdoIGEgY29sbGVjdGlvbiB0byBmaW5kIGlmIGFueSBvZiB0aGUgdmFsdWVzIFxyXG4gICAgICogd2l0aCB0aGUga2V5cyBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgYW55RW1wdHkoY29sbGVjdGlvbiwga2V5cykge1xyXG4gICAgICAgIGxldCBoYXNFbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGVsZW1lbnRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5pc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50cy5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5pbmRleE9mKGVsZW1lbnQpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrRWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0VsZW1lbnRLZXlzID0gT2JqZWN0LmtleXMoY2hlY2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudEtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gY2hlY2tFbGVtZW50W2tleV0gPT09IGVsZW1lbnRba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hlY2tFbGVtZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrRWxlbWVudC5mb3JFYWNoKCh0ZXN0RWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSB0ZXN0RWxlbWVudCA9PT0gYXJyYXlFbGVtZW50W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZShvYmplY3QsIHBhdGgsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGEgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIG8gPSBvYmplY3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbiA9IGFbaV07XHJcbiAgICAgICAgICAgIGlmIChuIGluIG8pIHtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb1tuXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb1thW2EubGVuZ3RoIC0gMV1dID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWVGcm9tUGF0aChwYXRoLCBvYmplY3QpIHtcclxuICAgICAgICBsZXQgcGF0aFBhcnRzID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBvYmplY3Q7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICBwYXRoUGFydHMuZm9yRWFjaCgocGF0aFBhcnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkocGF0aFBhcnQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gb2xkRGF0YVtwYXRoUGFydF07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KGN1cnJlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICAgICAgb2xkRGF0YSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpbiBhbiBhcnJheSBvZiBvYmplY3RzIHRvIHNlZSBpZiB0aGUgdmFsdWVzIFxyXG4gICAgICogYXQgdGhlIGtleXMgaXMgdW5pcXVlIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRpY2F0aW5nIFxyXG4gICAgICogaWYgdGhleSBhcmUgdW5pcXVlIGFuZCBhbnkgZXJyb3JzIHRoYXQgZG9uJ3QgbWF0Y2ggZm9yIFxyXG4gICAgICogY29ycmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgaXNVbmlxdWUoY29sbGVjdGlvbiA9IFtdLCBrZXlzID0gW10pIHtcclxuICAgICAgICBsZXQgaGFzVW5pcXVlID0ge1xyXG4gICAgICAgICAgICBpc1VuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFsbFVuaXF1ZVZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0gPSBbXTtcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdFVuaXF1ZSA9IHNlbGYuaGFzKGFsbFVuaXF1ZVZhbHVlc1trZXldLCBlbGVtZW50W2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3RVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmlzVW5pcXVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldLnB1c2goZWxlbWVudFtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc1VuaXF1ZTtcclxuICAgIH1cclxufTsiXX0=
