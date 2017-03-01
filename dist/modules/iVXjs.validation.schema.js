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

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL2l2eC1qcy12YWxpZGF0aW9uL2NvbmZpZy5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vaXZ4LWpzLXZhbGlkYXRpb24vY29uZmlnLnN0YXRlcy5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vaXZ4LWpzLXZhbGlkYXRpb24vZXhwZXJpZW5jZS5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vaXZ4LWpzLXZhbGlkYXRpb24vaW5kZXguanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL2l2eC1qcy12YWxpZGF0aW9uL21vZHVsZXMuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL2l2eC1qcy12YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vc2NoZW1hL3NjaGVtYXMvYmFzZS1zdHJ1Y3R1cmUuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL2h0bWwtb2JqZWN0LmpzIiwic3JjL21vZHVsZXMvdmFsaWRhdGlvbi9zY2hlbWEvc2NoZW1hcy9pbnB1dHMuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3J1bGVzLmpzIiwic3JjL21vZHVsZXMvdmFsaWRhdGlvbi9zY2hlbWEvc2NoZW1hcy9zdGF0ZXMuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3N0YXRlcy50eXBlcy5odG1sLmpzIiwic3JjL21vZHVsZXMvdmFsaWRhdGlvbi9zY2hlbWEvc2NoZW1hcy9zdGF0ZXMudHlwZXMuaW5wdXQuanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3N0YXRlcy50eXBlcy5qcyIsInNyYy9tb2R1bGVzL3ZhbGlkYXRpb24vc2NoZW1hL3NjaGVtYXMvc3RhdGVzLnR5cGVzLm5hdmlnYXRpb24uanMiLCJzcmMvbW9kdWxlcy92YWxpZGF0aW9uL3NjaGVtYS9zY2hlbWFzL3N0YXRlcy50eXBlcy52aWRlby5qcyIsInNyYy91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7Ozs7O0lBRWEsZ0IsV0FBQSxnQjs7O0FBRVQsZ0NBQXdCO0FBQUEsWUFBWixNQUFZLHVFQUFILEVBQUc7O0FBQUE7O0FBQUE7O0FBRXBCLGNBQUssTUFBTCxHQUFjLE1BQWQ7QUFGb0I7QUFHdkI7Ozs7NEJBRXFCO0FBQ2xCLG1CQUFPLENBQ0gsS0FBSyxZQURGLEVBRUgsS0FBSyxrQkFGRixFQUdILEtBQUssb0JBSEYsRUFJSCxLQUFLLGdCQUpGLENBQVA7QUFNSDs7OzRCQUVxQjtBQUFBLHVCQUNJLHlDQUEyQixLQUFLLE1BQUwsQ0FBWSxNQUF2QyxDQURKO0FBQUEsZ0JBQ2IsS0FEYSxRQUNiLEtBRGE7QUFBQSxnQkFDTixNQURNLFFBQ04sTUFETTs7QUFHbEIsZ0JBQUcsQ0FBQyxLQUFKLEVBQVU7QUFDTixxQkFBSyxTQUFMLENBQWUsTUFBZjtBQUNIOztBQUVELG1CQUFPO0FBQ0gsdUJBQVEsS0FETDtBQUVILHVCQUFPO0FBQ0gsMEJBQU8sU0FESjtBQUVILDBCQUFPLGVBRko7QUFHSCw2QkFBVTtBQUhQO0FBRkosYUFBUDtBQVNIOzs7NEJBRXlCO0FBQUEsZ0JBQ2hCLEtBRGdCLEdBQ1AsS0FBSyxrQkFERSxDQUNoQixLQURnQjs7O0FBR3JCLGdCQUFHLENBQUMsS0FBSixFQUFXOztBQUhVLGdCQUtoQixZQUxnQixHQUtBLEtBQUssTUFMTCxDQUtoQixZQUxnQjs7QUFNckIsZ0JBQUksYUFBYSxhQUFhLE1BQWIsR0FBc0IsQ0FBdkM7QUFDQSxnQkFBSSxZQUFZLGFBQWEsVUFBYixDQUFoQjs7QUFFQSxtQkFBTztBQUNILHVCQUFRLFVBQVUsT0FBVixJ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LElBQWpCLENBQXNCO0FBQ2xCLGlDQUFLLEdBRGE7QUFFbEIsbUNBQU8sS0FGVztBQUdsQixtQ0FBTyxRQUFRLEdBQVI7QUFIVyx5QkFBdEI7QUFLQSxrQ0FBVSxRQUFWLEdBQXFCLEtBQXJCO0FBQ0gscUJBUEQsTUFPTztBQUNILHdDQUFnQixHQUFoQixFQUFxQixJQUFyQixDQUEwQixRQUFRLEdBQVIsQ0FBMUI7QUFDSDtBQUNKLGlCQWJEO0FBY0gsYUFoQkQ7O0FBa0JBLG1CQUFPLFNBQVA7QUFDSDs7Ozs7O0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtWYWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xyXG5pbXBvcnQge0NvbmZpZ1N0YXRlc1ZhbGlkYXRpb259IGZyb20gJy4vY29uZmlnLnN0YXRlcy5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnVmFsaWRhdGlvbiBleHRlbmRzIFZhbGlkYXRpb257XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnOyAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2YWxpZGF0aW9uQXJyYXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgdGhpcy5oYXNTdGF0ZXNPYmosXHJcbiAgICAgICAgICAgIHRoaXMuaGFzRGVmYXVsdFN0YXRlT2JqLFxyXG4gICAgICAgICAgICB0aGlzLnZhbGlkRGVmYXVsdFN0YXRlT2JqLFxyXG4gICAgICAgICAgICB0aGlzLnZhbGlkU3RhdGVDb25maWdcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdmFsaWRTdGF0ZUNvbmZpZygpe1xyXG4gICAgICAgIGxldCB7dmFsaWQsIGVycm9yc30gPSBuZXcgQ29uZmlnU3RhdGVzVmFsaWRhdGlvbih0aGlzLmNvbmZpZy5zdGF0ZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF2YWxpZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JzKGVycm9ycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbGlkIDogdmFsaWQsXHJcbiAgICAgICAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlIDogJ2ludmFsaWQnLFxyXG4gICAgICAgICAgICAgICAgcGF0aCA6ICdjb25maWcuc3RhdGVzJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgOiBcIkV4cGVyaWVuY2UgcmVxdWlyZXMgdGhhdCBhbGwgc3RhdGVzIGFyZSB2YWxpZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2YWxpZERlZmF1bHRTdGF0ZU9iaigpe1xyXG4gICAgICAgICBsZXQge3ZhbGlkfSA9IHRoaXMuaGFzRGVmYXVsdFN0YXRlT2JqO1xyXG4gICAgICAgICBcclxuICAgICAgICAgaWYoIXZhbGlkKSByZXR1cm47XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBsZXQge2RlZmF1bHRTdGF0ZX0gPSB0aGlzLmNvbmZpZztcclxuICAgICAgICAgbGV0IGZpbmFsSW5kZXggPSBkZWZhdWx0U3RhdGUubGVuZ3RoIC0gMTtcclxuICAgICAgICAgbGV0IGxhc3RTdGF0ZSA9IGRlZmF1bHRTdGF0ZVtmaW5hbEluZGV4XTtcclxuICAgICAgICAgXHJcbiAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICB2YWxpZCA6IGxhc3RTdGF0ZS5zdGF0ZUlkICYmIGxhc3RTdGF0ZS5zdGF0ZUlkLmxlbmd0aCA+PSAwLFxyXG4gICAgICAgICAgICAgZXJyb3IgOiB7XHJcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm1pc3NpbmdcIixcclxuICAgICAgICAgICAgICAgICBcInBhdGhcIiA6IGBjb25maWcuZGVmYXVsdFN0YXRlWyR7ZmluYWxJbmRleH1dLnN0YXRlSWRgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBoYXNEZWZhdWx0U3RhdGVPYmooKXtcclxuICAgICAgICBsZXQge2RlZmF1bHRTdGF0ZSA9IFtdfSA9IHRoaXMuY29uZmlnO1xyXG4gICAgICAgIGxldCBkZWZhdWx0U3RhdGVFeGlzdHMgPSB0eXBlb2YgZGVmYXVsdFN0YXRlICE9PSd1bmRlZmluZWQnICYmIGRlZmF1bHRTdGF0ZS5sZW5ndGggPj0gMTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWxpZCA6IGRlZmF1bHRTdGF0ZUV4aXN0cyxcclxuICAgICAgICAgICAgZXJyb3I6e1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm1pc3NpbmdcIixcclxuICAgICAgICAgICAgICAgIFwicGF0aFwiIDogXCJjb25maWcuZGVmYXVsdFN0YXRlXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogZGVmYXVsdFN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgaGFzU3RhdGVzT2JqKCl7XHJcbiAgICAgICAgbGV0IHtzdGF0ZXN9ID0gdGhpcy5jb25maWc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsaWQgOiB0eXBlb2Ygc3RhdGVzICE9PSAndW5kZWZpbmVkJyAmJiBzdGF0ZXMubGVuZ3RoID49IDEsXHJcbiAgICAgICAgICAgIGVycm9yIDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm1pc3NpbmdcIixcclxuICAgICAgICAgICAgICAgIFwicGF0aFwiIDogXCJjb25maWcuc3RhdGVzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YSA6IHN0YXRlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59OyIsImltcG9ydCB7IE9iamVjdFBhcnNlcnMsIFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuaW1wb3J0IHtWYWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xyXG5cclxubGV0IG9iamVjdFBhcnNlcnMgPSBuZXcgT2JqZWN0UGFyc2VycygpXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1N0YXRlc1ZhbGlkYXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZXMgPSBbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBzdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbGlkYXRpb25BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB0aGlzLnVuaXF1ZVZhbGlkU3RhdGVEYXRhLFxyXG4gICAgICAgICAgICB0aGlzLmZpbGxlZFZhbGlkU3RhdGVEYXRhXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRUb0NvbmZpZ0Vycm9yT2JqcyhlcnJvcnMsIGVycm9yVHlwZSkge1xyXG4gICAgICAgIHJldHVybiBlcnJvcnMubWFwKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2tleSwgdmFsdWUsIGluZGV4fSA9IGVycm9yO1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlIDogZXJyb3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgcGF0aCA6IGBjb25maWcuc3RhdGVzWyR7aW5kZXh9XS4ke2tleX1gXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihlcnJvclR5cGUgPT09ICdkdXBsaWNhdGUnKSBlcnJvck9iamVjdC5tZXNzYWdlID0gIGBEdXBsaWNhdGUgdmFsdWU6ICR7dmFsdWV9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JPYmplY3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZmlsbGVkVmFsaWRTdGF0ZURhdGEoKXtcclxuICAgICAgICBsZXQge2Vycm9ycyA9IFtdLCBpc0VtcHR5fSA9IG9iamVjdFBhcnNlcnMuYW55RW1wdHkodGhpcy5zdGF0ZXMsIFsnaWQnLCAndXJsJywgJ3R5cGUnXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JzKHRoaXMuY29udmVydFRvQ29uZmlnRXJyb3JPYmpzKGVycm9ycywgJ21pc3NpbmcnKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsaWQ6ICFpc0VtcHR5LFxyXG4gICAgICAgICAgICBlcnJvcjoge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJ2NvbmZpZy5zdGF0ZXMnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ05vdCBhbGwgc3RhdGVcXCdzIGhhdmUgYW4gaWQsIHVybCwgYW5kL29yIHR5cGUnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludmFsaWQnXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnN0YXRlc1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVuaXF1ZVZhbGlkU3RhdGVEYXRhKCkge1xyXG5cclxuICAgICAgICBsZXQge2Vycm9ycyA9IFtdLCBpc1VuaXF1ZTogdmFsaWQgfSA9IG9iamVjdFBhcnNlcnMuaXNVbmlxdWUodGhpcy5zdGF0ZXMsIFsnaWQnLCAndXJsJ10pO1xyXG5cclxuICAgICAgICBpZiAoIXZhbGlkKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9ycyh0aGlzLmNvbnZlcnRUb0NvbmZpZ0Vycm9yT2JqcyhlcnJvcnMsICdkdXBsaWNhdGUnKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsaWQ6IHZhbGlkLFxyXG4gICAgICAgICAgICBlcnJvcjoge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJ2NvbmZpZy5zdGF0ZXMnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ05vdCBhbGwgc3RhdGVcXCdzIGlkcyBhbmQgdXJscyBhcmUgdW5pcXVlJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnZhbGlkJ1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZXNcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07IiwiaW1wb3J0IHtWYWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRXhwZXJpZW5jZVZhbGlkYXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9ue1xyXG4gICAgY29uc3RydWN0b3IoZXhwZXJpZW5jZSA9IHt9KXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2YWxpZGF0aW9uQXJyYXkoKXtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkQW5pbWF0ZUVsZW1lbnRPYmosXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRTZXREYXRhT2JqXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbGlkQW5pbWF0ZUVsZW1lbnRPYmooKXtcclxuICAgICAgICBsZXQge2FuaW1hdGVFbGVtZW50fSA9IHRoaXMuZXhwZXJpZW5jZTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWxpZCA6IHR5cGVvZiBhbmltYXRlRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgICAgIGVycm9yIDoge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA6ICdleHBlcmllbmNlLmFuaW1hdGVFbGVtZW50JyxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcIm1pc3NpbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhIDogYW5pbWF0ZUVsZW1lbnQgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2YWxpZFNldERhdGFPYmooKXtcclxuICAgICAgICBsZXQge3NldERhdGF9ID0gdGhpcy5leHBlcmllbmNlO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbGlkIDogdHlwZW9mIHNldERhdGEgIT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgICAgIHBhdGggOiAnZXhwZXJpZW5jZS5zZXREYXRhJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwibWlzc2luZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGEgOiBzZXREYXRhICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTsiLCJpbXBvcnQgeyBPYmplY3RQYXJzZXJzLCBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xyXG5pbXBvcnQgeyBFeHBlcmllbmNlVmFsaWRhdGlvbiB9IGZyb20gJy4vZXhwZXJpZW5jZS5qcyc7XHJcbmltcG9ydCB7IE1vZHVsZVZhbGlkYXRpb24gfSBmcm9tICcuL21vZHVsZXMuanMnO1xyXG5pbXBvcnQgeyBDb25maWdWYWxpZGF0aW9uIH0gZnJvbSAnLi9jb25maWcuanMnO1xyXG5cclxubGV0IG9iamVjdFBhcnNlcnMgPSBuZXcgT2JqZWN0UGFyc2VycygpXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKVxyXG5cclxuZXhwb3J0IGNsYXNzIGlWWGpzVmFsaWRhdGlvbiBleHRlbmRzIFZhbGlkYXRpb24ge1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhXHJcblxyXG4gICAgaWYgKCF0aGlzLnZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZXJyb3IgPSB7XHJcbiAgICAgICAgbWVzc2FnZTogdGhpcy5jb2xsZWN0RXJyb3JNZXNzYWdlcygpLFxyXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICBlcnJvcnM6IHRoaXMuZXJyb3JzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxlY3RFcnJvck1lc3NhZ2VzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXJyb3JzLnJldmVyc2UoKS5yZWR1Y2UoKGVycm9yTWVzc2FnZXMsIGVycm9yT2JqKSA9PiB7XHJcbiAgICAgIGxldCB7ZXJyb3J9ID0gZXJyb3JPYmpcclxuICAgICAgcmV0dXJuIGAke2Vycm9yTWVzc2FnZXN9XHJcblRZUEU6ICR7ZXJyb3IudHlwZSA/IGVycm9yLnR5cGUgOiAnRVJST1InfSAgUEFUSDogJHtlcnJvci5wYXRofSAke2Vycm9yLm1lc3NhZ2UgJiYgZXJyb3IubWVzc2FnZS5sZW5ndGggPiAwID8gJ01FU1NBR0U6ICcgKyBlcnJvci5tZXNzYWdlICsgJycgOiAnJ31gXHJcbiAgICB9LCAnJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgdmFsaWRhdGlvbkFycmF5KCkge1xyXG4gICAgbGV0IGN1cnJlbnRWYWxpZGF0aW9uQXJyYXkgPSBbXHJcbiAgICAgIHRoaXMucnVsZVZhbGlkYXRpb25PYmosXHJcbiAgICAgIHRoaXMuZXhwZXJpZW5jZVZhbGlkYXRpb25PYmosXHJcbiAgICAgIHRoaXMuY29uZmlnVmFsaWRhdGlvbk9ialxyXG4gICAgXTtcclxuICAgIHJldHVybiBjdXJyZW50VmFsaWRhdGlvbkFycmF5XHJcbiAgfVxyXG5cclxuICBnZXQgY29uZmlnVmFsaWRhdGlvbk9iaigpIHtcclxuICAgIGxldCB7Y29uZmlnfSA9IHRoaXMuZGF0YTtcclxuICAgIGxldCB7dmFsaWQsIGVycm9yc30gPSBuZXcgQ29uZmlnVmFsaWRhdGlvbihjb25maWcpO1xyXG5cclxuICAgIGlmICghdmFsaWQpIHtcclxuICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdmFsaWQsXHJcbiAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgXCJwYXRoXCI6IFwiY29uZmlnXCIsXHJcbiAgICAgICAgXCJtZXNzYWdlXCI6IFwiQW4gZXhwZXJpZW5jZSBtdXN0IGhhdmUgYSB2YWxpZCBjb25maWdcIixcclxuICAgICAgICBcInR5cGVcIjogXCJpbnZhbGlkXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldCBleHBlcmllbmNlVmFsaWRhdGlvbk9iaigpIHtcclxuICAgIGxldCB7ZXhwZXJpZW5jZX0gPSB0aGlzLmRhdGFcclxuICAgIGxldCB7dmFsaWQsIGVycm9yc30gPSBuZXcgRXhwZXJpZW5jZVZhbGlkYXRpb24oZXhwZXJpZW5jZSlcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgIHRoaXMuYWRkRXJyb3JzKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHZhbGlkLFxyXG4gICAgICBlcnJvcjoge1xyXG4gICAgICAgIHBhdGg6ICdleHBlcmllbmNlJyxcclxuICAgICAgICBtZXNzYWdlOiAnQW4gZXhwZXJpZW5jZSBtdXN0IG5vdCBoYXZlIGFueSBlcnJvcnMnLFxyXG4gICAgICAgIHR5cGU6ICdpbnZhbGlkJ1xyXG5cclxuICAgICAgfSxcclxuICAgICAgZGF0YTogZXhwZXJpZW5jZVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBydWxlVmFsaWRhdGlvbk9iaigpIHtcclxuICAgIGxldCB7cnVsZXN9ID0gdGhpcy5kYXRhXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHR5cGVvZiBydWxlcyAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgbmFtZTogJ01pc3NpbmcgUnVsZXM6JyxcclxuICAgICAgICBtZXNzYWdlOiBgVGhlIGZ1bmN0aW9uIHJ1bGVzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGV4cGVyaWVuY2UuYFxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBydWxlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcbiIsImltcG9ydCB7VmFsaWRhdGlvbn0gZnJvbSAnLi92YWxpZGF0aW9uLmpzJztcclxuaW1wb3J0IHtUeXBlVmFsaWRhdG9yfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcclxuXHJcbmxldCBkZWJ1ZyA9IHRydWU7XHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVWYWxpZGF0aW9uIGV4dGVuZHMgVmFsaWRhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihleHBlcmllbmNlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGV4cGVyaWVuY2U7XHJcbiAgICAgICAgdGhpcy50eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbGlkYXRpb25BcnJheSgpe1xyXG4gICAgICAgIGxldCBtb2R1bGVWYWxpZGF0aW9uQXJyYXkgPSBbXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRVSU1vZHVsZU9iaiAgICAgIFxyXG4gICAgICAgIF0gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1vZHVsZVZhbGlkYXRpb25BcnJheTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIGdldCB2YWxpZFVJTW9kdWxlT2JqKCl7XHJcbiAgICAgICAgbGV0IHt1aX0gPSB0aGlzLmV4cGVyaWVuY2U7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWxpZCA6IHR5cGVvZiB1aSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy50eXBlVmFsaWRhdG9yLmlzU3RyaW5nKHVpKSAmJiAgdWkubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgZXJyb3IgOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhdGhcIiA6IFwidWlcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJtaXNzaW5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YSA6IHVpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICB9XHJcbiAgICAgIFxyXG59OyIsImV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbGlkYXRpb25BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbGlkKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQXJyYXkucmVkdWNlKChpc1ZhbGlkLCBpc1BhcnRWYWxpZCkgPT4ge1xyXG4gICAgICAgICAgICBpZighaXNQYXJ0VmFsaWQpIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlzUGFydFZhbGlkLnZhbGlkID09PSAnYm9vbGVhbicgJiYgIWlzUGFydFZhbGlkLnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmVycm9ycy5wdXNoKGlzUGFydFZhbGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZCAmJiBpc1BhcnRWYWxpZC52YWxpZDtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcnJvcnMobmV3RXJyb3JzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5ld0Vycm9ycy5mb3JFYWNoKChlcnJvck9iaikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmVycm9ycy5wdXNoKGVycm9yT2JqKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59OyIsImltcG9ydCB7aVZYanNWYWxpZGF0aW9ufSBmcm9tICcuLi9pdngtanMtdmFsaWRhdGlvbi9pbmRleC5qcyc7XHJcbmltcG9ydCB7QmFzZVN0cnVjdHVyZX0gZnJvbSAnLi9zY2hlbWFzL2Jhc2Utc3RydWN0dXJlLmpzJztcclxuaW1wb3J0IHtTdGF0ZXNUeXBlc30gZnJvbSAnLi9zY2hlbWFzL3N0YXRlcy50eXBlcy5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NoZW1hVmFsaWRhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IHt9O1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmhhc1ZhbGlkYXRpb25MaWJyYXJ5LnZhbGlkKXtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuaGFzVmFsaWRhdGlvbkxpYnJhcnkuZXJyb3IubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGVycm9ycyA6IFt0aGlzLmhhc1ZhbGlkYXRpb25MaWJyYXJ5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy52YWxpZCkge1xyXG4gICAgICAgICAgICAgdGhpcy5lcnJvciA9IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuY29sbGVjdEVycm9yTWVzc2FnZXMoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGVycm9ycyA6IHRoaXMuZXJyb3JzXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycy5sZW5ndGggPD0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZXJyb3JzKCkge1xyXG4gICAgICAgIGxldCB7YmFzZVZhbGlkYXRlLCBzdGF0ZVR5cGVzVmFsaWRhdGlvbiwgZGF0YX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7Y29uZmlnfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBlcnJvckFycmF5ID0gW107XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGJhc2VWYWxpZGF0ZS5lcnJvcnMuZm9yRWFjaCgoZXJyb3JPYmosIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9yQXJyYXkucHVzaChlcnJvck9iaik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0YXRlVHlwZXNWYWxpZGF0aW9uLmZvckVhY2goKGVycm9yT2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBlcnJvckFycmF5LnB1c2goZXJyb3JPYmopO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBtb2RpZmllZEVycm9yQXJyYXkgPSBlcnJvckFycmF5Lm1hcCgoZXJyb3IsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgOiBzZWxmLmNyZWF0ZUVycm9yTWVzc2FnZShlcnJvciksXHJcbiAgICAgICAgICAgICAgICBwYXRoIDogc2VsZi5jcmVhdGVQYXRoKGAke2Vycm9yLmRhdGFQYXRofWApLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogc2VsZi5nZXRFcnJvckNvZGUoZXJyb3IuY29kZSlcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuY29sbGVjdEVycm9yTWVzc2FnZXMoYmFzZVZhbGlkYXRlLmVycm9ycyk7XHJcblxyXG4gICAgICAgIHJldHVybiBtb2RpZmllZEVycm9yQXJyYXk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUVycm9yTWVzc2FnZShlcnJvcil7XHJcbiAgICAgICAgbGV0IHtjb2RlfSA9IGVycm9yO1xyXG4gICAgICAgIHN3aXRjaChjb2RlKXtcclxuICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZU9uZU9mRXJyb3JNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlT25lT2ZFcnJvck1lc3NhZ2UoZXJyb3Ipe1xyXG4gICAgICAgICAgICBsZXQge3N1YkVycm9yc30gPSBlcnJvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YkVycm9ycy5yZWR1Y2UoKGVycm9yTWVzc2FnZSwgc3ViRXJyb3IsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2Vycm9yTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICR7c3ViRXJyb3IubWVzc2FnZX08YnI+YFxyXG4gICAgICAgICAgICB9LCBgPHN0cm9uZz5UaGUgZGF0YSB2aW9sYXRlcyBPTkUgb2YgdGhlIGZvbGxvd2luZyByZXF1aXJlbWVudHM6PC9zdHJvbmc+PGJyPmApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUGF0aChkYXRhUGF0aCl7XHJcbiAgICAgICAgbGV0IHtjb25maWd9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBkYXRhUGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIGxldCBsb2NhdGlvbiA9IGNvbmZpZztcclxuICAgICAgICBsZXQgcGF0aCA9IHBhdGhQYXJ0cy5yZWR1Y2UoKGZ1bGxQYXRoLCBjdXJyZW50UGF0aFBhcnQsIGluZGV4KSA9PntcclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQYXRoUGFydC5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVsbFBhdGg7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICBpZihmdWxsUGF0aC5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbltjdXJyZW50UGF0aFBhcnRdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRQYXRoUGFydH1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighaXNOYU4oY3VycmVudFBhdGhQYXJ0KSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYXRpb25JbmRleCA9IHBhcnNlSW50KGN1cnJlbnRQYXRoUGFydCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uW2xvY2F0aW9uSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2Z1bGxQYXRofVske2N1cnJlbnRQYXRoUGFydH1dYDtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb25bY3VycmVudFBhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtmdWxsUGF0aH0uJHtjdXJyZW50UGF0aFBhcnR9YDtcclxuXHJcbiAgICAgICAgfSwgJycpXHJcblxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcInBhdGhTdHJpbmdcIiA6IHBhdGgsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiIDogbG9jYXRpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb2xsZWN0RXJyb3JNZXNzYWdlcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnMucmVkdWNlKChlcnJvck1lc3NhZ2VzLCBlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlc31cclxuICAgICAgICBUWVBFOiAke3NlbGYuZ2V0RXJyb3JDb2RlKGVycm9yLmNvZGUpfSAgUEFUSDogJHtlcnJvci5wYXRoLnBhdGhTdHJpbmd9IE1FU1NBR0UgOiAke2Vycm9yLm1lc3NhZ2V9YFxyXG4gICAgICAgICAgICB9LCAnJylcclxuICAgIH1cclxuXHJcbiAgICBnZXRFcnJvckNvZGUoZXJyb3JDb2RlKXtcclxuICAgICAgICBsZXQgZXJyb3JDb2RlcyA9IE9iamVjdC52YWx1ZXModHY0LmVycm9yQ29kZXMpO1xyXG4gICAgICAgIGxldCBlcnJvcktleXMgPSBPYmplY3Qua2V5cyh0djQuZXJyb3JDb2Rlcyk7XHJcbiAgICAgICAgbGV0IGVycm9yQ29kZUtleSA9IFwiXCI7XHJcbiAgICAgIFxyXG4gICAgICAgIGVycm9yQ29kZXMuZm9yRWFjaCgodGhpc0Vycm9yQ29kZSwgaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBpZih0aGlzRXJyb3JDb2RlID09PSBlcnJvckNvZGUpe1xyXG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlS2V5ID0gZXJyb3JLZXlzW2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvckNvZGVLZXlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGJhc2VWYWxpZGF0ZSgpIHtcclxuICAgICAgICBsZXQge2NvbmZpZ30gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNlU3RydWN0dXJlKGNvbmZpZykudmFsaWRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhdGVUeXBlc1ZhbGlkYXRpb24oKXtcclxuICAgICAgICBsZXQge3N0YXRlc30gPSB0aGlzLmRhdGEuY29uZmlnO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFN0YXRlc1R5cGVzKHN0YXRlcykudmFsaWRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGFzVmFsaWRhdGlvbkxpYnJhcnkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJ2YWxpZFwiOiB0eXBlb2YgdHY0ICE9PSAndW5kZWZpbmVkJyxcclxuICAgICAgICAgICAgZXJyb3I6IHtcclxuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcImluaXQoKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiU2NoZW1hIHZhbGlkYXRpb24gcmVxdWlyZWQgdGhlICd0djQnIGxpYnJhcnkgKGh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi90djQpXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJtaXNzaW5nXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZVNjaGVtYVZhbGlkYXRpb247XHJcblxyXG5pZiAoYW5ndWxhciAmJiBhbmd1bGFyLm1vZHVsZSgnaXZ4LWpzJykpIHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpdngtanMnKVxyXG4gICAgICAgIC5jb25zdGFudCgnaVZYanMudmFsaWRhdGlvbi5zY2hlbWEnLCBpbml0aWFsaXplU2NoZW1hVmFsaWRhdGlvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVTY2hlbWFWYWxpZGF0aW9uKHNldHRpbmdzKSB7XHJcbiAgICByZXR1cm4gU2NoZW1hVmFsaWRhdGlvbjtcclxufTsiLCJpbXBvcnQge1J1bGVzfSBmcm9tICcuL3J1bGVzLmpzJzsgXG5pbXBvcnQge1N0YXRlc30gZnJvbSAnLi9zdGF0ZXMuanMnO1xuXG5leHBvcnQgY2xhc3MgQmFzZVN0cnVjdHVyZSB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMucnVsZXNTY2hlbWEgPSBuZXcgUnVsZXMoY29uZmlnKS5zY2hlbWE7XG4gICAgICAgIHRoaXMuc3RhdGVTY2hlbWEgPSBuZXcgU3RhdGVzKGNvbmZpZykuc2NoZW1hO1xuXG4gICAgICAgXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKXtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0djQudmFsaWRhdGVNdWx0aXBsZSh0aGlzLmNvbmZpZywgdGhpcy5zY2hlbWEpO1xuICAgIH1cblxuICAgIGdldCBzY2hlbWEoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZVN0cnVjdHVyZVxuICAgIH1cblxuICAgIGdldCBiYXNlU3RydWN0dXJlKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICAgIHJlcXVpcmVkIDogdGhpcy5yZXF1aXJlZEtleXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcm9wZXJ0aWVzKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImRlZmF1bHRTdGF0ZVwiIDoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIiA6IHRoaXMucnVsZXNTY2hlbWFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInN0YXRlc1wiIDoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIiA6IHRoaXMuc3RhdGVTY2hlbWEsXG4gICAgICAgICAgICAgICAgXCJtaW5JdGVtc1wiIDogXCIxXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCByZXF1aXJlZEtleXMoKXtcbiAgICAgICAgcmV0dXJuIFtcImRlZmF1bHRTdGF0ZVwiLCBcInN0YXRlc1wiXVxuICAgIH1cblxuXG59IiwiZXhwb3J0IGNsYXNzIEhUTUxPYmplY3R7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0IGdlbmVyYWxIVE1MU2NoZW1hKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIiA6IHtcbiAgICAgICAgICAgICAgICBcImh0bWxcIiA6e1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiY2xhc3Nlc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidGVtcGxhdGVVcmxcIiA6e1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbGFiZWxIVE1MU2NoZW1hKCl7XG5cbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIElucHV0RXJyb3JzIHtcbiAgICBjb25zdHJ1Y3RvcihpbnB1dHMsIGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBjdXJyZW50U3RhdGU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGxldCB7aW5wdXRzLCBpbnB1dFNjaGVtYXN9ID0gdGhpcztcbiAgICAgICAgbGV0IGFsbElucHV0RXJyb3JzID0gaW5wdXRzLnJlZHVjZSgoaW5wdXRFcnJvcnMsIGlucHV0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IHt0eXBlfSA9IGlucHV0O1xuXG4gICAgICAgICAgICBpZiAodHlwZSAmJiBpbnB1dFNjaGVtYXNbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JzID0gdHY0LnZhbGlkYXRlTXVsdGlwbGUoaW5wdXQsIGlucHV0U2NoZW1hc1t0eXBlXSkuZXJyb3JzO1xuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKCh0aGlzSW5wdXRFcnJvciwgZXJyb3JJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzSW5wdXRFcnJvci5kYXRhUGF0aCA9IGAvaW5wdXRzLyR7aW5kZXh9JHt0aGlzSW5wdXRFcnJvci5kYXRhUGF0aC5sZW5ndGggPiAwID8gdGhpc0lucHV0RXJyb3IuZGF0YVBhdGggOiAnJ31gO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEVycm9ycy5wdXNoKHRoaXNJbnB1dEVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGlucHV0RXJyb3JzO1xuXG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICByZXR1cm4gYWxsSW5wdXRFcnJvcnM7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0U2NoZW1hcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1dHRvbnM6IHRoaXMuYnV0dG9uc1NjaGVtYSxcbiAgICAgICAgICAgIGNoZWNrYm94OiB0aGlzLmNoZWNrYm94U2NoZW1hLFxuICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlU2NoZW1hLFxuICAgICAgICAgICAgXCJkYXRldGltZS1sb2NhbFwiOiB0aGlzLmRhdGV0aW1lTG9jYWxTY2hlbWEsXG4gICAgICAgICAgICBlbWFpbDogdGhpcy50ZXh0U2NoZW1hLFxuICAgICAgICAgICAgbnVtYmVyOiB0aGlzLm51bWJlclNjaGVtYSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9uc1NjaGVtYSxcbiAgICAgICAgICAgIHJhZGlvOiB0aGlzLnJhZGlvU2NoZW1hLFxuICAgICAgICAgICAgdGV4dDogdGhpcy50ZXh0U2NoZW1hLFxuICAgICAgICAgICAgdGV4dGFyZWE6IHRoaXMudGV4dFNjaGVtYSxcbiAgICAgICAgICAgIHVybDogdGhpcy50ZXh0U2NoZW1hXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBidXR0b25zU2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1wiYnV0dG9uc1wiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93TGFiZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbEhUTUxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFRlbXBsYXRlVXJsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3Nlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50TmFtZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1widmFsdWVcIl1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJtaW5JdGVtc1wiOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNoZWNrYm94U2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1wiY2hlY2tib3hcIl1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZGF0ZVNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbnVtXCI6IFtcImRhdGVcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiYXR0cmlidXRlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0dGVyblwiOiBcIi9eWzAtOV17Mn1cXC9bMC05XXsyfVxcL1swLTldezR9JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhdHRlcm5cIjogXCIvXlswLTldezJ9XFwvWzAtOV17Mn1cXC9bMC05XXs0fSQvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkYXRldGltZUxvY2FsU2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1wiZGF0ZXRpbWUtbG9jYWxcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiYXR0cmlidXRlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0dGVyblwiOiBcIi9eWzAtOV17Mn1cXC9bMC05XXsyfVxcL1swLTldezR9JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhdHRlcm5cIjogXCIvXlswLTldezJ9XFwvWzAtOV17Mn1cXC9bMC05XXs0fSQvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBudW1iZXJTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiOiBbXCJudW1iZXJcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiYXR0cmlidXRlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1pblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluaW11bVwiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXhjbHVzaXZlTWluaW11bVwiOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgb3B0aW9uc1NjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbnVtXCI6IFtcIm9wdGlvbnNcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdERpc3BsYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJvcHRpb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtaW5JdGVtc1wiOiAyLFxuICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pbkxlbmd0aFwiOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1widmFsdWVcIiwgXCJkaXNwbGF5XCJdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcmFkaW9TY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiOiBbXCJyYWRpb1wiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyYWRpb0J1dHRvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxIVE1MXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pbkxlbmd0aFwiOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsVGVtcGxhdGVVcmxcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3Nlc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1widmFsdWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9uZU9mXCIgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImxhYmVsXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCIgOiBbXCJsYWJlbEhUTUxcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImxhYmVsVGVtcGxhdGVVcmxcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwibWluSXRlbXNcIjogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0ZXh0U2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1widGV4dFwiLCBcImVtYWlsXCIsIFwidXJsXCIsIFwidGV4dGFyZWFcIl1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbiIsImV4cG9ydCBjbGFzcyBSdWxlcyB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7ICAgICAgXG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlSWRFbnVtcygpe1xuICAgICAgICBsZXQge3N0YXRlcyA9IFtdfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgICAgIGxldCBzdGF0ZUlkcyA9IHN0YXRlcy5tYXAoKHN0YXRlLCBpbmRleCkgPT57XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuaWQ7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHN0YXRlSWRzO1xuXG4gICAgfVxuXG4gICAgZ2V0IHJ1bGVzUmVxdWlyZWQoKXtcbiAgICAgICAgLy8gcmV0dXJuIFtcImtleVwiLCBcImlzXCIsIFwidmFsdWVcIl07XG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBcIlJ1bGUgU2NoZW1hXCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwic3RhdGVJZFwiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW51bVwiIDogdGhpcy5zdGF0ZUlkRW51bXNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicnVsZXNcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicnVsZVwiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCIgIDoxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudW1cIiA6IFtcImx0XCIsIFwibHRlXCIsIFwiZ3RcIiwgXCJndGVcIiwgXCJlcXVhbHNcIiwgXCJub3RFcXVhbHNcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCIgOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFtcInN0cmluZ1wiLCBcIm51bWJlclwiLCBcImJvb2xlYW5cIiwgXCJvYmplY3RcIiwgXCJhcnJheVwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCIgOiB0aGlzLnJ1bGVzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcInN0YXRlSWRcIl1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiaW1wb3J0IHtSdWxlc30gZnJvbSAnLi9ydWxlcy5qcyc7IFxuaW1wb3J0IHtIVE1MT2JqZWN0fSBmcm9tICcuL2h0bWwtb2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIFN0YXRlcyB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcbiAgICAgICAgdGhpcy5ydWxlc1NjaGVtYSA9IG5ldyBSdWxlcyhjb25maWcpLnNjaGVtYTtcbiAgICAgICAgdGhpcy5nZW5lcmFsSFRNTFNjaGVtYSA9IG5ldyBIVE1MT2JqZWN0KCkuZ2VuZXJhbEhUTUxTY2hlbWE7XG5cbiAgICB9XG5cbiAgICBnZXQgc3RhdGVSZXF1aXJlZCgpe1xuICAgICAgICByZXR1cm4gWydpZCcsICduYW1lJywndXJsJywndHlwZSddXG4gICAgfVxuXG4gICAgZ2V0IHR5cGVFbnVtKCl7XG4gICAgICAgIHJldHVybiBbXCJuYXZpZ2F0aW9uXCIsIFwidmlkZW9cIiwgXCJpbnB1dFwiLCBcImh0bWxcIl07XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlUHJvcGVydGllcygpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJpZFwiIDoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBcIm1pbkxlbmd0aFwiICA6MVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibmFtZVwiIDoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBcIm1pbkxlbmd0aFwiICA6MVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidXJsXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwicGF0dGVyblwiIDogXCJcXC9eKFxcL1tBLVphLXowLTktXSopJFxcL1wiLFxuICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCIgOjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImF1ZGlvXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIiA6IDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJsb29wXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYm9vbGVhblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiY3VlUG9pbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJhcnJheVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1wic3JjXCJdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0eXBlXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwiZW51bVwiIDogdGhpcy50eXBlRW51bVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibmV4dFwiIDoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIiA6IHRoaXMucnVsZXNTY2hlbWFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm9uRW50ZXJcIiA6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwib25FeGl0XCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImhlYWRlclwiIDp0aGlzLmdlbmVyYWxIVE1MU2NoZW1hLFxuICAgICAgICAgICAgXCJmb290ZXJcIiA6IHRoaXMuZ2VuZXJhbEhUTUxTY2hlbWFcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzY2hlbWEoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwibmFtZVwiIDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB0aGlzLnN0YXRlUHJvcGVydGllcyxcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IHRoaXMuc3RhdGVSZXF1aXJlZFxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBIVE1MU3RhdGVTY2hlbWF7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUpe1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKXtcbiAgICAgICAgcmV0dXJuIHR2NC52YWxpZGF0ZU11bHRpcGxlKHRoaXMuc3RhdGUsIHRoaXMuc2NoZW1hKTtcbiAgICB9XG5cbiAgICBnZXQgcmVxdWlyZWRQcm9wZXJ0aWVzKCl7XG4gICAgICAgIHJldHVybiBbXCJodG1sXCJdXG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJodG1sXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZVVybFwiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidGltZW91dEluTXNcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm9uZU9mXCIgOiBbe1xuICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImh0bWxcIl1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcInRlbXBsYXRlVXJsXCJdXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtJbnB1dEVycm9yc30gZnJvbSAnLi9pbnB1dHMuanMnO1xuXG5leHBvcnQgY2xhc3MgSW5wdXRTdGF0ZVNjaGVtYSB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUsIGluZGV4KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGxldCBhbGxFcnJvcnMgPSBbdHY0LnZhbGlkYXRlTXVsdGlwbGUodGhpcy5zdGF0ZSwgdGhpcy5zY2hlbWEpLCB0aGlzLmlucHV0RXJyb3JzXVxuICAgICAgICAgICAgLnJlZHVjZSgoY3VycmVudEVycm9ycywgZXJyb3JPYmosIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHtlcnJvcnN9ID0gZXJyb3JPYmo7XG4gICAgICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goKGVycm9yLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50RXJyb3JzO1xuICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcnM6IGFsbEVycm9yc1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXQgaW5wdXRFcnJvcnMoKSB7XG4gICAgICAgIGxldCB7aW5kZXh9ID0gdGhpcztcbiAgICAgICAgbGV0IHtpbnB1dHMgPSBbXX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBsZXQgY3VycmVudElucHV0RXJyb3JzID0gbmV3IElucHV0RXJyb3JzKGlucHV0cywgaW5kZXgpLnZhbGlkYXRlKCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9yczogY3VycmVudElucHV0RXJyb3JzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9ybVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc2VzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbEhUTUxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFRlbXBsYXRlVXJsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsSFRNTFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsVGVtcGxhdGVVcmxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJvblN1Ym1pdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJpbnB1dHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1pbkl0ZW1zXCI6IDEsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5MZW5ndGhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVycm9yc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxIVE1MXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxUZW1wbGF0ZVVybFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRhaW5lclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc2VzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXR0ZXJuXCI6IFwiL1sxLTldKlxcL1sxLTldKi9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJpYnV0ZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5sZW5ndGhcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DaGFuZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJ0eXBlXCJdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJpbnB1dHNcIl1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn0iLCJpbXBvcnQge0hUTUxTdGF0ZVNjaGVtYX0gZnJvbSAnLi9zdGF0ZXMudHlwZXMuaHRtbC5qcyc7XG5pbXBvcnQge1ZpZGVvU3RhdGVTY2hlbWF9IGZyb20gXCIuL3N0YXRlcy50eXBlcy52aWRlby5qc1wiO1xuaW1wb3J0IHtJbnB1dFN0YXRlU2NoZW1hfSBmcm9tIFwiLi9zdGF0ZXMudHlwZXMuaW5wdXQuanNcIjtcbmltcG9ydCB7TmF2aWdhdGlvblN0YXRlU2NoZW1hfSBmcm9tIFwiLi9zdGF0ZXMudHlwZXMubmF2aWdhdGlvbi5qc1wiO1xuXG5cblxuZXhwb3J0IGNsYXNzIFN0YXRlc1R5cGVze1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlcyl7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gc3RhdGVzO1xuICAgIH1cblxuXG4gICAgdmFsaWRhdGUoKXtcbiAgICAgICAgbGV0IHtzdGF0ZXMsIHR5cGVzU2NoZW1hc30gPSB0aGlzO1xuXG4gICAgICAgIGxldCBlcnJvckNvbGxlY3Rpb24gPSBzdGF0ZXMucmVkdWNlKChlcnJvcnMsIHN0YXRlLCBpbmRleCkgPT57XG4gICAgICAgICAgICBsZXQge3R5cGV9ID0gc3RhdGU7XG4gICAgICAgICAgXG4gICAgICAgICAgICBpZih0eXBlICYmIHR5cGVzU2NoZW1hc1t0eXBlXSl7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQge2Vycm9ycyA6IHR5cGVFcnJvcnN9ID0gbmV3IHR5cGVzU2NoZW1hc1t0eXBlXShzdGF0ZSwgaW5kZXgpLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdHlwZUVycm9ycy5mb3JFYWNoKCh0eXBlRXJyb3IsIGVycm9ySW5kZXgpID0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9kVHlwZUVycm9yID0gdHlwZUVycm9yO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbW9kVHlwZUVycm9yLmRhdGFQYXRoID0gYHN0YXRlcy8ke2luZGV4fSR7bW9kVHlwZUVycm9yLmRhdGFQYXRoLmxlbmd0aCA+IDAgPyBtb2RUeXBlRXJyb3IuZGF0YVBhdGggOiAnJ31gO1xuXG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKHR5cGVFcnJvcik7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIGVycm9yQ29sbGVjdGlvbjtcblxuICAgIH1cblxuICAgIGdldCB0eXBlc1NjaGVtYXMoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwiaHRtbFwiIDogSFRNTFN0YXRlU2NoZW1hLFxuICAgICAgICAgICAgXCJ2aWRlb1wiIDogVmlkZW9TdGF0ZVNjaGVtYSxcbiAgICAgICAgICAgIFwiaW5wdXRcIiA6IElucHV0U3RhdGVTY2hlbWEsXG4gICAgICAgICAgICBcIm5hdmlnYXRpb25cIiA6IE5hdmlnYXRpb25TdGF0ZVNjaGVtYVxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGVTY2hlbWF7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUsIGluZGV4KXtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0djQudmFsaWRhdGVNdWx0aXBsZSh0aGlzLnN0YXRlLCB0aGlzLnNjaGVtYSk7XG4gICAgfVxuXG4gICAgZ2V0IHNjaGVtYSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJsaW5rc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtaW5JdGVtc1wiIDogMSxcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxIVE1MXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFRlbXBsYXRlVXJsXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhcmdldFwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudW1cIiA6IFtcIl9ibGFua1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiIDogW1wiaHJlZlwiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImxpbmtzXCJdXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFZpZGVvU3RhdGVTY2hlbWEge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHR2NC52YWxpZGF0ZU11bHRpcGxlKHRoaXMuc3RhdGUsIHRoaXMuc2NoZW1hKTtcbiAgICB9XG5cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwicGxheWVyU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0b3BsYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJvbHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBbXCJib29sZWFuXCIsIFwic3RyaW5nXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudW1cIjogW1widmlkZW8vbXA0XCIsIFwidmlkZW8vd2VibVwiLCBcInZpZGVvL29nZ1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFtcInNyY1wiLCBcInR5cGVcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pbkl0ZW1zXCI6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFja3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2luZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFtcInNyY1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwib25lT2ZcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFtcInNyY1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1wic291cmNlc1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1widmltZW9JZFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1wieW91dHViZUlkXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJwZXJzb25hbGl6YXRpb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZVVybFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcImlkXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJvbmVPZlwiIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCIgOiBbXCJodG1sXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCIgOiBbXCJ0ZW1wbGF0ZVVybFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJjdWVQb2ludHNcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZUF0XCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaW5pbXVtXCIgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIiA6IFtcInRpbWVBdFwiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIjogW1wicGxheWVyU2V0dGluZ3NcIl1cbiAgICAgICAgfVxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBUeXBlVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc1N0cmluZyhvYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRnVuY3Rpb24ob2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqICYmIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTnVtYmVyKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai52YWx1ZU9mKCkgPT09ICdib29sZWFuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eShvYmopIHtcclxuICAgICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIGxldCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmopO1xyXG4gICAgICAgIGxldCBpc1N0cmluZyA9IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG4gICAgICAgIGxldCBjaGVja0xlbmd0aCA9IGlzQXJyYXkgfHwgaXNTdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzTmFOKG9iaikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQYXJzZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB5b3UgdG8gbWFwIGFuIG9iamVjdCBieSB0aGUga2V5cyBvZiBhIGdpdmVuIG9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBvYmplY3QgdG8gbWFwO1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBydW4gYnkgZWFjaCB2YWx1ZSBhbmQga2V5ICBcclxuICAgICAqL1xyXG4gICAgbWFwS2V5cyhvYmplY3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcbiAgICAgICAgbGV0IG1hcHBlZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICghcmVkdWNlTWFwKSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBtYXBwZWRBcnJheS5wdXNoKGNhbGxiYWNrKHZhbCwga2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWRBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShiYXNlLCBtZXJnZWQsIGlnbm9yZSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRLZXlzID0gT2JqZWN0LmtleXMobWVyZ2VkKTtcclxuICAgICAgICBsZXQgdW5pb25lZE9iamVjdCA9IG5ldyBPYmplY3QoYmFzZSk7XHJcblxyXG4gICAgICAgIG1lcmdlZEtleXMuZm9yRWFjaCgobWVyZ2VkS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKG1lcmdlZEtleSkgPj0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB1bmlvbmVkT2JqZWN0W21lcmdlZEtleV0gPSBtZXJnZWRbbWVyZ2VkS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaW9uZWRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkdWNlKG9iamVjdCwgY2FsbGJhY2ssIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGNhbGxiYWNrKGRlZmF1bHRWYWx1ZSwgdmFsLCBrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhIGNvbGxlY3Rpb24gdG8gZmluZCBpZiBhbnkgb2YgdGhlIHZhbHVlcyBcclxuICAgICAqIHdpdGggdGhlIGtleXMgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIGFueUVtcHR5KGNvbGxlY3Rpb24sIGtleXMpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShlbGVtZW50W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uaW5kZXhPZihlbGVtZW50KSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja0VsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbGVtZW50S2V5cyA9IE9iamVjdC5rZXlzKGNoZWNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRLZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IGNoZWNrRWxlbWVudFtrZXldID09PSBlbGVtZW50W2tleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnQuZm9yRWFjaCgodGVzdEVsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gdGVzdEVsZW1lbnQgPT09IGFycmF5RWxlbWVudFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBvID0gb2JqZWN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBhW2ldO1xyXG4gICAgICAgICAgICBpZiAobiBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9bbl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9bYVthLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBhdGgocGF0aCwgb2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gb2JqZWN0O1xyXG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgcGF0aFBhcnRzLmZvckVhY2goKHBhdGhQYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KHBhdGhQYXJ0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IG9sZERhdGFbcGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShjdXJyZW50RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBzZWUgaWYgdGhlIHZhbHVlcyBcclxuICAgICAqIGF0IHRoZSBrZXlzIGlzIHVuaXF1ZSBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kaWNhdGluZyBcclxuICAgICAqIGlmIHRoZXkgYXJlIHVuaXF1ZSBhbmQgYW55IGVycm9ycyB0aGF0IGRvbid0IG1hdGNoIGZvciBcclxuICAgICAqIGNvcnJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGlzVW5pcXVlKGNvbGxlY3Rpb24gPSBbXSwga2V5cyA9IFtdKSB7XHJcbiAgICAgICAgbGV0IGhhc1VuaXF1ZSA9IHtcclxuICAgICAgICAgICAgaXNVbmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhbGxVbmlxdWVWYWx1ZXMgPSB7fTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldID0gW107XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RVbmlxdWUgPSBzZWxmLmhhcyhhbGxVbmlxdWVWYWx1ZXNba2V5XSwgZWxlbWVudFtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90VW5pcXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5pc1VuaXF1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XS5wdXNoKGVsZW1lbnRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNVbmlxdWU7XHJcbiAgICB9XHJcbn07Il19
