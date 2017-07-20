(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require("./video.js");

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_VideoConstants) {
    _inherits(_class, _VideoConstants);

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
            READY_PLAYER: "ready-player",
            SEEK: "seek",
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
}(_video2.default);

exports.default = _class;

},{"./video.js":3}],3:[function(require,module,exports){
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

},{"./index.js":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Anchor = undefined;

var _anchor = require('../default/anchor.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Anchor = exports.Anchor = function (_DefaultAnchor) {
	_inherits(Anchor, _DefaultAnchor);

	function Anchor(anchorInfo) {
		_classCallCheck(this, Anchor);

		return _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, anchorInfo));
	}

	return Anchor;
}(_anchor.Anchor);

},{"../default/anchor.js":24}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Buttons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buttons = require('../default/buttons.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Buttons = exports.Buttons = function (_DefaultButtons) {
    _inherits(Buttons, _DefaultButtons);

    function Buttons(buttons, input) {
        _classCallCheck(this, Buttons);

        return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, buttons, input, _messages.ErrorMessages));
    }

    _createClass(Buttons, [{
        key: 'buttonClasses',
        get: function get() {
            return 'btn';
        }
    }]);

    return Buttons;
}(_buttons.Buttons);

},{"../default/buttons.js":25,"./messages.js":12}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkbox = require('../default/checkbox.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = exports.Checkbox = function (_DefaultCheckbox) {
    _inherits(Checkbox, _DefaultCheckbox);

    function Checkbox(inputObj) {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Checkbox, [{
        key: 'renderCheckboxContainer',
        value: function renderCheckboxContainer(classes, attributes) {
            var _input = this.input,
                input = _input === undefined ? {} : _input;
            var id = input.id;
            var label = input.label;

            return '\n         <div class="' + classes + '">\n             <label for="' + id + '">    \n                <input ' + attributes + ' type="checkbox">\n                ' + label + '\n            </label>\n         </div>';
        }
    }, {
        key: 'uiClasses',
        get: function get() {
            return 'checkbox form-control';
        }
    }, {
        key: 'uiAttributes',
        get: function get() {
            return '';
        }
    }]);

    return Checkbox;
}(_checkbox.Checkbox);

},{"../default/checkbox.js":26,"./messages.js":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Date = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _date = require('../default/date.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Date = exports.Date = function (_DefaultDate) {
    _inherits(Date, _DefaultDate);

    function Date(inputObj) {
        _classCallCheck(this, Date);

        return _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Date, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Date;
}(_date.Date);

},{"../default/date.js":27,"./messages.js":12}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatetimeLocal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _datetimeLocal = require('../default/datetime-local.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatetimeLocal = exports.DatetimeLocal = function (_DefaultDatetimeLocal) {
    _inherits(DatetimeLocal, _DefaultDatetimeLocal);

    function DatetimeLocal(inputObj) {
        _classCallCheck(this, DatetimeLocal);

        return _possibleConstructorReturn(this, (DatetimeLocal.__proto__ || Object.getPrototypeOf(DatetimeLocal)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(DatetimeLocal, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return DatetimeLocal;
}(_datetimeLocal.DatetimeLocal);

},{"../default/datetime-local.js":28,"./messages.js":12}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _email = require('../default/email.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Email = exports.Email = function (_DefaultEmail) {
    _inherits(Email, _DefaultEmail);

    function Email(inputObj) {
        _classCallCheck(this, Email);

        return _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Email, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Email;
}(_email.Email);

},{"../default/email.js":29,"./messages.js":12}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.js');

var _form = require('../default/form.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = exports.Form = function (_DefaultForm) {
    _inherits(Form, _DefaultForm);

    function Form(inputHTML, name, additionalAttrHTML, settings) {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, inputHTML, name, additionalAttrHTML, settings, _style.Style));
    }

    _createClass(Form, [{
        key: 'submitButtonHTML',
        get: function get() {
            var _submit = this.submit,
                submit = _submit === undefined ? {} : _submit;
            var _submit$label = submit.label,
                submitLabel = _submit$label === undefined ? "Submit" : _submit$label,
                submitLabelHTML = submit.labelHTML,
                _submit$input = submit.input,
                submitInput = _submit$input === undefined ? {} : _submit$input,
                _submit$container = submit.container,
                submitContainer = _submit$container === undefined ? {} : _submit$container,
                _submit$attributes = submit.attributes,
                attributes = _submit$attributes === undefined ? '' : _submit$attributes;
            var _submitInput$classes = submitInput.classes,
                submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes,
                submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;


            submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

            var submitHTML = submitLabel.length >= 0 ? '\n            <div class="row">\n                <div class="col-md-12 ' + submitContainerClasses + '">\n                    <button class="btn ' + submitInputClasses + '" type=\'submit\'>\n                        ' + submitLabel + '\n                    </button>\n                </div>\n            </div>\n            ' : '';

            return submitHTML;
        }
    }]);

    return Form;
}(_form.Form);

},{"../default/form.js":30,"./style.js":19}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BootstrapUI = undefined;

var _anchor = require('./anchor.js');

var _form = require('./form.js');

var _text = require('./text.js');

var _buttons = require('./buttons.js');

var _checkbox = require('./checkbox.js');

var _options = require('./options.js');

var _textarea = require('./textarea.js');

var _radio = require('./radio.js');

var _number = require('./number.js');

var _email = require('./email.js');

var _date = require('./date.js');

var _url = require('./url.js');

var _datetimeLocal = require('./datetime-local.js');

var _style = require('./style.js');

var _stateInput = require('./state.input.js');

var _stateVideo = require('./state.video.js');

var _stateNavigation = require('./state.navigation.js');

var _videoControls = require('./video.controls.js');

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Form/Input HTML


//States


//Controls 


var BootstrapUI = exports.BootstrapUI = function BootstrapUI() {
    _classCallCheck(this, BootstrapUI);

    this.anchor = _anchor.Anchor;
    this.form = _form.Form;
    this.text = _text.Text;
    this.buttons = _buttons.Buttons;
    this.date = _date.Date;
    this.datetimeLocal = _datetimeLocal.DatetimeLocal;
    this.checkbox = _checkbox.Checkbox;
    this.videoControls = _videoControls2.default;
    this.options = _options.Options;
    this.email = _email.Email;
    this.url = _url.Url;
    this.textarea = _textarea.Textarea;
    this.radio = _radio.Radio;
    this.number = _number.Number;
    this.style = new _style.Style();
    this.states = {
        input: _stateInput.InputState,
        video: _stateVideo.VideoState,
        navigation: _stateNavigation.NavigationState
    };
};

module.export = initializeBootstrapUI;

if (angular && angular.module('ivx-js')) {
    angular.module('ivx-js').constant('iVXjs.ui.bootstrap', initializeBootstrapUI);
}

function initializeBootstrapUI() {
    return BootstrapUI;
}

},{"./anchor.js":4,"./buttons.js":5,"./checkbox.js":6,"./date.js":7,"./datetime-local.js":8,"./email.js":9,"./form.js":10,"./number.js":13,"./options.js":14,"./radio.js":15,"./state.input.js":16,"./state.navigation.js":17,"./state.video.js":18,"./style.js":19,"./text.js":20,"./textarea.js":21,"./url.js":22,"./video.controls.js":23}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorMessages = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require('../default/messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorMessages = exports.ErrorMessages = function (_DefaultErrorMessages) {
    _inherits(ErrorMessages, _DefaultErrorMessages);

    function ErrorMessages() {
        var errorMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ErrorMessages);

        return _possibleConstructorReturn(this, (ErrorMessages.__proto__ || Object.getPrototypeOf(ErrorMessages)).call(this, errorMessages));
    }

    _createClass(ErrorMessages, [{
        key: 'containerClasses',
        get: function get() {
            return 'has-error';
        }
    }, {
        key: 'messageClasses',
        get: function get() {
            return 'help-block';
        }
    }]);

    return ErrorMessages;
}(_messages.ErrorMessages);

},{"../default/messages.js":31}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Number = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _number = require('../default/number.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Number = exports.Number = function (_DefaultNumber) {
    _inherits(Number, _DefaultNumber);

    function Number(inputObj) {
        _classCallCheck(this, Number);

        return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Number, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Number;
}(_number.Number);

},{"../default/number.js":32,"./messages.js":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _options = require('../default/options.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Options = exports.Options = function (_DefaultOptions) {
    _inherits(Options, _DefaultOptions);

    function Options(inputObj) {
        _classCallCheck(this, Options);

        return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Options, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Options;
}(_options.Options);

},{"../default/options.js":33,"./messages.js":12}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _radio = require('../default/radio.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = exports.Radio = function (_DefaultRadio) {
    _inherits(Radio, _DefaultRadio);

    function Radio(inputObj) {
        _classCallCheck(this, Radio);

        return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Radio, [{
        key: 'renderRadioHTML',
        value: function renderRadioHTML(attrHTML, label, value) {
            var _input = this.input,
                input = _input === undefined ? {} : _input;
            var id = input.id;

            var currentId = '' + id + (value.length > 0 ? '-' + value : '');

            return ' \n        <label for="' + currentId + '">\n            <input type="radio" id="' + currentId + '" ' + attrHTML + '>\n            ' + label + '\n        </label>\n        ';
        }
    }, {
        key: 'uiClasses',
        get: function get() {
            return 'radio form-control';
        }
    }, {
        key: 'uiAttributes',
        get: function get() {
            return '';
        }
    }]);

    return Radio;
}(_radio.Radio);

},{"../default/radio.js":34,"./messages.js":12}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stateInput = require('../default/state.input.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputState = exports.InputState = function (_DefaultInputState) {
    _inherits(InputState, _DefaultInputState);

    function InputState(header, formSection, footer, data) {
        _classCallCheck(this, InputState);

        return _possibleConstructorReturn(this, (InputState.__proto__ || Object.getPrototypeOf(InputState)).call(this, header, formSection, footer, data));
    }

    _createClass(InputState, [{
        key: 'defaultSectionClasses',
        get: function get() {
            return 'container-fluid';
        }
    }]);

    return InputState;
}(_stateInput.InputState);

},{"../default/state.input.js":35}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stateNavigation = require('../default/state.navigation.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationState = exports.NavigationState = function (_DefaultNavigationSta) {
    _inherits(NavigationState, _DefaultNavigationSta);

    function NavigationState(data, linkSection) {
        _classCallCheck(this, NavigationState);

        return _possibleConstructorReturn(this, (NavigationState.__proto__ || Object.getPrototypeOf(NavigationState)).call(this, data, linkSection));
    }

    _createClass(NavigationState, [{
        key: 'defaultSectionClasses',
        get: function get() {
            return 'container-fluid';
        }
    }]);

    return NavigationState;
}(_stateNavigation.NavigationState);

},{"../default/state.navigation.js":36}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoState = exports.VideoState = function () {
    function VideoState(playerSection, data) {
        _classCallCheck(this, VideoState);

        this.playerSection = playerSection;
        this.data = data;
    }

    _createClass(VideoState, [{
        key: 'html',
        get: function get() {
            var playerSection = this.playerSection,
                data = this.data;
            var _data$header = data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                _data$section = data.section,
                section = _data$section === undefined ? {} : _data$section;
            var _header$classes = header.classes,
                headerClasses = _header$classes === undefined ? '' : _header$classes,
                _header$html = header.html,
                headerHTML = _header$html === undefined ? '' : _header$html;
            var _section$classes = section.classes,
                sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes,
                footerClasses = _footer$classes === undefined ? '' : _footer$classes,
                _footer$html = footer.html,
                footerHTML = _footer$html === undefined ? '' : _footer$html;


            return '\n            <section class="ui container ' + sectionClasses + '" id="' + data.id + '">\n                <header class="' + headerClasses + '">' + headerHTML + '</header>\n                ' + playerSection + '\n                <footer class="' + footerClasses + '">' + footerHTML + '</footer>\n            </section>\n        ';
        }
    }]);

    return VideoState;
}();

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = exports.Style = function () {
    function Style() {
        _classCallCheck(this, Style);
    }

    _createClass(Style, [{
        key: "addWidthClasses",
        value: function addWidthClasses(inputHTML) {
            var currentWidthTotal = 0.0;
            var columnNames = ["col-md-1", "col-md-2", "col-md-3", "col-md-4", "col-md-5", "col-md-6", "col-md-7", "col-md-8", "col-md-9", "col-md-10", "col-md-11", "col-md-12"];
            var contents = inputHTML.reduce(function (contentHTML, thisInput) {
                var html = thisInput.html,
                    settings = thisInput.settings;
                var _settings$width = settings.width,
                    width = _settings$width === undefined ? "1" : _settings$width,
                    _settings$classes = settings.classes,
                    classes = _settings$classes === undefined ? '' : _settings$classes;

                var numericWidth = getNumericWidth(width);

                if (currentWidthTotal <= 0) {
                    contentHTML = contentHTML + "<div class=\"row\"> ";
                }

                currentWidthTotal += numericWidth;

                var bootstrapWidthStyleName = columnNames[Math.round(numericWidth * columnNames.length) - 1];

                html = html.replace('ivxjs-grid-1-1', "form-group " + bootstrapWidthStyleName + " " + classes);
                contentHTML = "" + contentHTML + html;

                if (currentWidthTotal >= 1) {
                    contentHTML = contentHTML + "</div>";
                    currentWidthTotal = 0;
                }

                return contentHTML;
            }, '');

            if (contents.substring(contents.length - 7) !== "</div>") {
                contents = contents + "</div>";
            }

            return contents;

            function getNumericWidth(widthString) {
                if (widthString === '1') return 1;

                var parsedWidthFormula = widthString.split('/');

                return parseFloat(parsedWidthFormula[0]) / parseFloat(parsedWidthFormula[1]);
            }
        }
    }]);

    return Style;
}();

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _text = require('../default/text.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_DefaultText) {
    _inherits(Text, _DefaultText);

    function Text(inputObj) {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Text, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Text;
}(_text.Text);

},{"../default/text.js":38,"./messages.js":12}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textarea = require('../default/textarea.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Textarea = exports.Textarea = function (_DefaultTextarea) {
    _inherits(Textarea, _DefaultTextarea);

    function Textarea(inputObj) {
        _classCallCheck(this, Textarea);

        return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Textarea, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Textarea;
}(_textarea.Textarea);

},{"../default/textarea.js":39,"./messages.js":12}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('../default/url.js');

var _messages = require('./messages.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url = exports.Url = function (_DefaultUrl) {
    _inherits(Url, _DefaultUrl);

    function Url(inputObj) {
        _classCallCheck(this, Url);

        return _possibleConstructorReturn(this, (Url.__proto__ || Object.getPrototypeOf(Url)).call(this, inputObj, _messages.ErrorMessages));
    }

    _createClass(Url, [{
        key: 'uiClasses',
        get: function get() {
            return 'form-control';
        }
    }]);

    return Url;
}(_url.Url);

},{"../default/url.js":40,"./messages.js":12}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoControls = require('../default/video.controls.js');

var _videoControls2 = _interopRequireDefault(_videoControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_DefaultVideoControls) {
    _inherits(_class, _DefaultVideoControls);

    function _class(container, iVXjsBus) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, container, iVXjsBus));
    }

    _createClass(_class, [{
        key: 'totalTimeInfoClasses',
        get: function get() {
            return 'duration';
        }
    }, {
        key: 'playClasses',
        get: function get() {
            return 'glyphicon glyphicon-play';
        }
    }, {
        key: 'pauseClasses',
        get: function get() {
            return 'glyphicon glyphicon-pause';
        }
    }, {
        key: 'unmuteClasses',
        get: function get() {
            return 'glyphicon glyphicon-volume-up';
        }
    }, {
        key: 'muteClasses',
        get: function get() {
            return 'glyphicon glyphicon-volume-off';
        }
    }, {
        key: 'playPauseControlsClasses',
        get: function get() {
            return 'btn btn-default btn-xs';
        }
    }, {
        key: 'muteControlsClasses',
        get: function get() {
            return 'btn btn-default btn-xs';
        }
    }, {
        key: 'scrubBarClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'scrubBarTimeLapseClasses',
        get: function get() {
            return 'bar';
        }
    }, {
        key: 'scrubBarHTML',
        get: function get() {
            return '\n            <div id="video-controls-scrub-bar" class="progress ' + this.scrubBarClasses + '">\n                <div id="scrub-bar-progress-container" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 0;">\n                    <div id="scrub-bar-timestamp-label" class="label">' + this.timestampHTML + '</div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'volumeBarClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'volumeBarCurrentVolumeClasses',
        get: function get() {
            return 'progress-bar';
        }
    }, {
        key: 'volumeBarHTML',
        get: function get() {
            return '\n            <div id="video-controls-volume-bar" class="progress ' + this.volumeBarClasses + '">\n                <div class="' + this.volumeBarCurrentVolumeClasses + '"></div>\n            </div> \n        ';
        }
    }, {
        key: 'playPauseButtonHTML',
        get: function get() {
            var play = this.playClasses;
            var playPauseControls = this.playPauseControlsClasses;

            return '\n        <div id="play-button-container">\n            <button id="video-controls-play-pause" class="' + playPauseControls + '">\n                <i class=\'' + play + '\'></i>\n            </button>\n        <div>';
        }
    }, {
        key: 'muteButtonHTML',
        get: function get() {
            var unmute = this.unmuteClasses,
                muteControlsClasses = this.muteControlsClasses;

            return '\n        <div id="mute-button-container">\n            <button id="video-controls-mute-controls" class="' + muteControlsClasses + '">\n                <i class="' + unmute + '"></i>\n            </button>\n        </div>\n        ';
        }
    }, {
        key: 'html',
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML,
                scrubBarHTML = this.scrubBarHTML,
                timestampHTML = this.timestampHTML,
                muteButtonHTML = this.muteButtonHTML,
                volumeBarHTML = this.volumeBarHTML;


            return '\n        ' + scrubBarHTML + '\n        ' + playPauseButtonHTML + '\n        ' + muteButtonHTML + '\n        ' + volumeBarHTML + '                           \n        ';
        }
    }]);

    return _class;
}(_videoControls2.default);

exports.default = _class;

},{"../default/video.controls.js":41}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Anchor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = require('../utilities/attributes.js');

var _typeParsers = require('../../../utilities/type-parsers.js');

var _asserts = require('../../../utilities/asserts.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeCheck = new _typeParsers.TypeValidator();

var Anchor = exports.Anchor = function () {
    function Anchor(anchorInfo) {
        _classCallCheck(this, Anchor);

        this.anchorInfo = anchorInfo;
    }

    _createClass(Anchor, [{
        key: 'anchorClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var anchorClasses = this.anchorClasses;
            var _anchorInfo = this.anchorInfo,
                _anchorInfo$href = _anchorInfo.href,
                href = _anchorInfo$href === undefined ? '' : _anchorInfo$href,
                _anchorInfo$classes = _anchorInfo.classes,
                classes = _anchorInfo$classes === undefined ? '' : _anchorInfo$classes,
                _anchorInfo$attribute = _anchorInfo.attributes,
                attributes = _anchorInfo$attribute === undefined ? {} : _anchorInfo$attribute,
                _anchorInfo$label = _anchorInfo.label,
                label = _anchorInfo$label === undefined ? labelHTML : _anchorInfo$label,
                labelHTML = _anchorInfo.labelHTML,
                _anchorInfo$id = _anchorInfo.id,
                id = _anchorInfo$id === undefined ? '' : _anchorInfo$id;

            var attributeHTML = new _attributes.AttributeTags(attributes, Object.keys(attributes)).html;

            if (!labelHTML && !label) {
                label = href;
            }

            return '\n             <a id=\'' + id + '\' class="' + classes + ' ' + anchorClasses + '"  href="' + href + '" ' + attributeHTML + ' >' + (labelHTML ? labelHTML : label) + '</a>           \n        ';
        }
    }]);

    return Anchor;
}();

},{"../../../utilities/asserts.js":46,"../../../utilities/type-parsers.js":47,"../utilities/attributes.js":42}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Buttons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

var _typeParsers = require("../../../utilities/type-parsers.js");

var _asserts = require("../../../utilities/asserts.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();
var typeCheck = new _typeParsers.TypeValidator();

/**
 * Renders a collection of buttons for one click recording of 
 * an input that has multiple options for data recording.
 */

var Buttons = exports.Buttons = function () {

    /**
     * Takes the settings for the buttons, a class that renders the 
     * error messages and a class that renders attributes. 
     * 
     * @param {Object} buttonsInfo - Information to create this button input 
     * @param {Array} buttonsInfo.buttons - each individual button data and settings.
     * @param {Object} buttonsInfo.settings - settings for all buttons 
     * @param {Class} buttonsInfo.errors - an error class that was created by the 
     * rendering library so the errors open and display alongside the library. 
     */
    function Buttons() {
        var buttons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var input = arguments[1];
        var errorMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _messages.ErrorMessages;

        _classCallCheck(this, Buttons);

        /**
         * Buttons to be rendered
         * @type {Array}
         */
        this.buttons = buttons;

        /**
         * Settings for all buttons in this group 
         * @type {Object}
         */
        this.input = input;

        /**
         * Error message class that will take the errors from 
         * the rendering library and adds them to this input 
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Creates attribute tags html to be added to this button 
         * inputs.
         * @type {Class}
         */
        this.attributeTags = _attributes.AttributeTags;
    }

    /**
     * Lets users add the same classes to all buttons just in 
     * case buttons share a specific class.
     * 
     * @type {String}
     */


    _createClass(Buttons, [{
        key: "buttonClasses",
        get: function get() {
            return '';
        }

        /**
         * Creates the HTML for every buttons defined in the buttons array and 
         * attaches the error messages attached to this input. 
         * 
         * @example
         * buttonClasses = 'button-class';
         * buttons = [{
         *    label : "Button 1",
         *    attrHTML : "disabled",
         *    classes : "class-1"
         * },{
         *    label : "<h1>Button 2</h1>",
         *    classes " class-2"
         * }];
         * 
         * // Will render:
         * 
         * <button class="button-class class-1" disabled>Button 1</button>
         * <button class="button class class-2"><h1>Button 2</h1></button>
         * 
         * @type {String}
         */

    }, {
        key: "html",
        get: function get() {
            var _errors = this.errors,
                errorClass = _errors === undefined ? {} : _errors,
                _buttons = this.buttons,
                buttons = _buttons === undefined ? [] : _buttons,
                _input = this.input,
                input = _input === undefined ? {} : _input,
                buttonClasses = this.buttonClasses;
            var _errorClass$attribute = errorClass.attributes,
                attributes = _errorClass$attribute === undefined ? {} : _errorClass$attribute,
                _errorClass$errors = errorClass.errors,
                errors = _errorClass$errors === undefined ? {} : _errorClass$errors,
                _errorClass$messages = errorClass.messages,
                messages = _errorClass$messages === undefined ? {} : _errorClass$messages;

            var buttonErrorMessages = Object.keys(attributes).map(function (key, index) {
                return {
                    message: "" + errors[key],
                    attrHTML: ''
                };
            });
            var errorMessages = new this.errorMessages(buttonErrorMessages).html;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                _input$labelHTML = input.labelHTML,
                labelHTML = _input$labelHTML === undefined ? '' : _input$labelHTML,
                _input$showLabel = input.showLabel,
                showLabel = _input$showLabel === undefined ? false : _input$showLabel,
                id = input.id;

            var buttonsHTML = buttons.reduce(function (html, button, index) {
                var label = button.label,
                    _button$attrHTML = button.attrHTML,
                    attrHTML = _button$attrHTML === undefined ? '' : _button$attrHTML,
                    _button$classes = button.classes,
                    classes = _button$classes === undefined ? "" : _button$classes;


                return html + " \n                   <button " + attrHTML + " class=\"" + classes + " " + buttonClasses + "\">\n                       " + label + "\n                   </button>";
            }, '');

            if ((labelHTML.length > 0 || label.length > 0) && showLabel) {
                labelHTML = labelHTML ? labelHTML : label;
                labelHTML = "<label for=\"" + id + "\">" + labelHTML + "</label>";
            }

            return "\n             " + labelHTML + "\n             " + buttonsHTML + "\n             " + errorMessages + "             \n        ";
        }
    }]);

    return Buttons;
}();

},{"../../../utilities/asserts.js":46,"../../../utilities/type-parsers.js":47,"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Produces html to build a checkbox input for the  
 * various rendering libraries. 
 */

var Checkbox = exports.Checkbox = function () {

    /**
     * Sets up the checkbox's settings from a standard input data 
     * object and sets the type of error messages this class 
     * will render if the checkbox isn't valid.
     * 
     * @param {Object} inputObj - contains all the configurations 
     * to render this input.
     * @param {class} errorMessages - a class that will render the 
     * specific type of error messages based on this UI's settings.
     */
    function Checkbox() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Checkbox);

        var input = inputObj.input,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? '' : _inputObj$tags,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

        /**
         * This checkbox's input configuration 
         * @type {Object}
         */

        this.input = input;

        /**
         * Any custom tags passed down from the rendering library. 
         * @type {String}
         */
        this.tags = tags;

        /**
         * Settings for this whole input including the container
         * @type {Object}
         */
        this.settings = settings;

        /**
         * A class of errors created by the rendering library to 
         * hide and show various errors.
         * @type {class}
         */
        this.errors = errors;

        /**
         * This UI's rendering of this error messages.
         * @type {class}
         */
        this.errorMessages = errorMessages;
    }

    /**
     * Adds a default class to this checkbox input 
     * @type {String}
     */


    _createClass(Checkbox, [{
        key: "renderCheckboxContainer",


        /**
         * Renders the HTML for this checkbox from the given attributes 
         * and classes.
         * @example
         * uiClasses = "class-1";
         * input.classes = "class-2";
         * requiredAttributes = "id='id-1' name='checkbox-name' type='checkbox'"
         * // Renders To:
         * <label class="class-1 class-2">
         *     <input id='id-1' name='checkbox-name' type='checkbox'>
         * </label>
         * @return {String} - html of the fully created checkbox
         */
        value: function renderCheckboxContainer(classes, attributes) {
            var input = this.input,
                settings = this.settings;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;


            if (labelHTML) label = labelHTML;

            return "\n            <label for=\"" + id + "\" class=\"" + classes + "\">\n               <input " + attributes + ">\n               " + label + "\n            </label>\n        ";
        }

        /**
         * Sets up and renders all the HTML for this checkbox based on the settings.
         * 
         * @type {String}
         */

    }, {
        key: "uiClasses",
        get: function get() {
            return '';
        }

        /**
         * Any UI specific attributes
         * @type {String}
         */

    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }

        /**
         * Attributes that required for this checkbox input 
         * to be used and rendered properly.
         * @return {String} - A string of all attributes to load 
         * this input including its id, name and type.
         */

    }, {
        key: "requiredAttributes",
        get: function get() {
            var input = this.input;
            var id = input.id,
                name = input.name;


            return "id=\"" + id + "\" name=\"" + name + "\" type=\"checkbox\"";
        }
    }, {
        key: "html",
        get: function get() {
            var tags = this.tags,
                _settings = this.settings,
                settings = _settings === undefined ? {} : _settings,
                errors = this.errors,
                input = this.input,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes,
                requiredAttributes = this.requiredAttributes;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var id = input.id,
                name = input.name,
                _input$label2 = input.label,
                label = _input$label2 === undefined ? '' : _input$label2;
            var _errors = this.errors,
                _errors$messages = _errors.messages,
                messages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = _errors.attributes,
                attributes = _errors$attributes === undefined ? {} : _errors$attributes,
                _errors$tags = _errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorAttributes = attributes;
            var errorHTML = new this.errorMessages(messages).html;
            var allClasses = classes + " " + uiClasses;
            var allAttributes = requiredAttributes + " " + uiAttributes + " " + tags + " " + errorTags;
            var checkboxHTML = this.renderCheckboxContainer(allClasses, allAttributes);
            var inputHTML = " \n            " + checkboxHTML + "\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Checkbox;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Date = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Creates a date input that will record date specific data 
 * for iVXjs.
 */

var Date = exports.Date = function () {

  /**
   * Accepts an input object with various input settings and UI specific error 
   * messages
   * @param {object} inputObj - various input settings to render this date input box
   * @param {object} inputObj.input - input specific settings for this date input 
   * @param {object} inputObj.settings - global settings for this date input 
   * @param {string} inputObj.tags - input specific attribute tags 
   * @param {class} inputObj.errors - errors from a rendering for validation and 
   * error messaging appearance.
   * @param {object} errorMessages - UI specific Error messages 
   */
  function Date() {
    var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

    _classCallCheck(this, Date);

    var _inputObj$input = inputObj.input,
        input = _inputObj$input === undefined ? {} : _inputObj$input,
        _inputObj$settings = inputObj.settings,
        settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
        _inputObj$tags = inputObj.tags,
        tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
        _inputObj$errors = inputObj.errors,
        errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

    /**
     * Input specific settings for this date input
     * @type {object}  
     */

    this.input = input;

    /**
     * Global input settings for this date input 
     * @type {object}
     */
    this.settings = settings;

    /**
     * Tags to be added to this date input
     * @type {String}
     */
    this.tags = tags;

    /**
     * Holds all validation error correcting.
     * @type {Class}
     */
    this.errors = errors;

    /**
     * Renders UI specific error messages by utilizing the 
     * error class passed down to keep it consistent with the 
     * current UI framework.
     * @type {Class}
     */
    this.errorMessages = errorMessages;

    /**
     * Converts attribute data into attribute HTML for 
     * attributes not covered by the errors class.
     * @type {Class}
     */
    this.attributeTags = _attributes.AttributeTags;
  }

  /**
   * Default ui classes to add to all date inputs 
   * @type {String}
   */


  _createClass(Date, [{
    key: "uiClasses",
    get: function get() {
      return '';
    }

    /**
     * Default ui attributes to add to this date input 
     * that aren't covered by the tags or errors above.
     * @type {String}
     */

  }, {
    key: "uiAttributes",
    get: function get() {
      return '';
    }

    /**
     * The HTML to render a date input based on the settings from the 
     * constructor. 
     * 
     * @example 
     * //Data 
     * input.label = "<h1>Label</h1>";
     * settings.classes = "class-1";
     * errors.tags = "required='true'";
     * Date.uiClasses = 'ui-classes-1';
     * // Renders 
     * <label>
     *      <h1>Label</h1>
     * </label>
     * <input class="class-1 ui-classes-1" type="date" required="true">
     * @type {String}
     */

  }, {
    key: "html",
    get: function get() {
      var input = this.input,
          settings = this.settings,
          tags = this.tags,
          errors = this.errors,
          uiClasses = this.uiClasses,
          uiAttributes = this.uiAttributes;
      var label = input.label,
          labelHTML = input.labelHTML,
          _input$name = input.name,
          name = _input$name === undefined ? '' : _input$name,
          _input$id = input.id,
          id = _input$id === undefined ? '' : _input$id;
      var _settings$input = settings.input,
          inputSettings = _settings$input === undefined ? {} : _settings$input,
          _settings$showLabel = settings.showLabel,
          showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
      var _inputSettings$classe = inputSettings.classes,
          classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


      classes = classes + " " + uiClasses;

      var _errors$messages = errors.messages,
          errorMessages = _errors$messages === undefined ? [] : _errors$messages,
          _errors$attributes = errors.attributes,
          errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
          _errors$nonValidate = errors.nonValidate,
          nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
          _errors$tags = errors.tags,
          errorTags = _errors$tags === undefined ? '' : _errors$tags;

      var errorHTML = new this.errorMessages(errorMessages).html;
      var nonValidateAttributesHTML = new _attributes.AttributeTags(errorAttributes, nonValidate).html;

      nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

      var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"date\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

      if (labelHTML) label = labelHTML;

      return "" + inputHTML;
    }
  }]);

  return Date;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.DatetimeLocal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Creates a datetime local input that will record date with timestamp specific data 
 * for iVXjs.
 */

var DatetimeLocal = exports.DatetimeLocal = function () {

        /**
        * Accepts an input object with various input settings and UI specific error 
        * messages
        * @param {object} inputObj - various input settings to render a datetime-local input box
        * @param {object} inputObj.input - input specific settings for this datetime-local input 
        * @param {object} inputObj.settings - global settings for this datetime-local input 
        * @param {string} inputObj.tags - input specific attribute tags 
        * @param {class} inputObj.errors - errors from a rendering for validation and 
        * error messaging appearance.
        * @param {object} errorMessages - UI specific Error messages
        */
        function DatetimeLocal() {
                var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

                _classCallCheck(this, DatetimeLocal);

                var _inputObj$input = inputObj.input,
                    input = _inputObj$input === undefined ? {} : _inputObj$input,
                    _inputObj$settings = inputObj.settings,
                    settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
                    _inputObj$tags = inputObj.tags,
                    tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
                    _inputObj$errors = inputObj.errors,
                    errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

                /**
                 * Input specific settings for this datetime-local input
                 * @type {object}  
                 */

                this.input = input;

                /**
                 * Global input settings for this datetime-local input 
                 * @type {object}
                 */
                this.settings = settings;

                /**
                 * Tags to be added to this datetime-local input
                 * @type {String}
                 */
                this.tags = tags;

                /**
                * Holds all validation error correcting.
                * @type {Class}
                */
                this.errors = errors;

                /**
                 * Renders UI specific error messages by utilizing the 
                 * error class passed down to keep it consistent with the 
                 * current UI framework.
                 * @type {Class}
                 */
                this.errorMessages = errorMessages;

                /**
                 * Converts attribute data into attribute HTML for 
                 * attributes not covered by the errors class.
                 * @type {Class}
                 */
                this.attributeTags = _attributes.AttributeTags;
        }

        /**
        * Default ui classes to add to all datetime-local inputs 
        * @type {String}
        */


        _createClass(DatetimeLocal, [{
                key: "uiClasses",
                get: function get() {
                        return "";
                }

                /**
                 * Default ui attributes to add to this datetime-local input 
                 * that aren't covered by the tags or errors above.
                 * @type {String}
                 */

        }, {
                key: "uiAttributes",
                get: function get() {
                        return "";
                }

                /**
                * The HTML to render a datetime-local input based on the settings from the 
                * constructor. 
                * 
                * @example 
                * //Data 
                * input.label = "<h1>Label</h1>";
                * settings.classes = "class-1";
                * errors.tags = "required='true'";
                * DatetimeLocal.uiClasses = 'ui-classes-1';
                * // Renders 
                * <label>
                *      <h1>Label</h1>
                * </label>
                * <input class="class-1 ui-classes-1" type="datetime-local" required="true">
                * @type {String}
                */

        }, {
                key: "html",
                get: function get() {
                        var input = this.input,
                            settings = this.settings,
                            tags = this.tags,
                            errors = this.errors,
                            uiClasses = this.uiClasses,
                            uiAttributes = this.uiAttributes;
                        var label = input.label,
                            labelHTML = input.labelHTML,
                            _input$name = input.name,
                            name = _input$name === undefined ? '' : _input$name,
                            _input$id = input.id,
                            id = _input$id === undefined ? '' : _input$id;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + " " + uiClasses;

                        var _errors$messages = errors.messages,
                            errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                            _errors$attributes = errors.attributes,
                            errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                            _errors$nonValidate = errors.nonValidate,
                            nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                            _errors$tags = errors.tags,
                            errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

                        if (labelHTML) label = labelHTML;

                        var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"datetime-local\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

                        return "" + inputHTML;
                }
        }]);

        return DatetimeLocal;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

/**
 * Creates an email input that will record emails  
 * for iVXjs.
 */

var Email = exports.Email = function () {

        /**
         * Accepts an input object with various input settings and UI specific error 
         * messages
         * @param {object} inputObj - various input settings to render this email input box
         * @param {object} inputObj.input - input specific settings for this email input 
         * @param {object} inputObj.settings - global settings for this email input 
         * @param {string} inputObj.tags - input specific attribute tags 
         * @param {class} inputObj.errors - errors from a rendering for validation and 
         * error messaging appearance.
         * @param {object} errorMessages - UI specific Error messages 
         */
        function Email() {
                var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

                _classCallCheck(this, Email);

                var _inputObj$input = inputObj.input,
                    input = _inputObj$input === undefined ? {} : _inputObj$input,
                    _inputObj$settings = inputObj.settings,
                    settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
                    _inputObj$tags = inputObj.tags,
                    tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
                    _inputObj$errors = inputObj.errors,
                    errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

                /**
                 * Input specific settings for this email input
                 * @type {object}  
                 */

                this.input = input;

                /**
                * Input specific settings for this email input
                * @type {object}  
                */
                this.settings = settings;

                /**
                 * Tags to be added to this email input
                 * @type {String}
                 */
                this.tags = tags;

                /**
                 * Holds all validation error correcting.
                 * @type {Class}
                 */
                this.errors = errors;

                /**
                 * Renders UI specific error messages by utilizing the 
                 * error class passed down to keep it consistent with the 
                 * current UI framework.
                 * @type {Class}
                 */
                this.errorMessages = errorMessages;

                /**
                 * Converts attribute data into attribute HTML for 
                 * attributes not covered by the errors class.
                 * @type {Class}
                 */
                this.attributeTags = _attributes.AttributeTags;
        }

        /**
        * Default ui classes to add to all email inputs 
        * @type {String}
        */


        _createClass(Email, [{
                key: "uiClasses",
                get: function get() {
                        return '';
                }

                /**
                * Default ui attributes to add to this email input 
                * that aren't covered by the tags or errors above.
                * @type {String}
                */

        }, {
                key: "uiAttributes",
                get: function get() {
                        return '';
                }

                /**
                 * The HTML to render an email input based on the settings from the 
                 * constructor. 
                 * 
                 * @example 
                 * //Data 
                 * input.label = "<h1>Label</h1>";
                 * settings.classes = "class-1";
                 * errors.tags = "required='true'";
                 * Email.uiClasses = 'ui-classes-1';
                 * // Renders 
                 * <label>
                 *      <h1>Label</h1>
                 * </label>
                 * <input class="class-1 ui-classes-1" type="email" required="true">
                 * @type {String}
                 */

        }, {
                key: "html",
                get: function get() {
                        var input = this.input,
                            settings = this.settings,
                            tags = this.tags,
                            errors = this.errors,
                            uiClasses = this.uiClasses,
                            uiAttributes = this.uiAttributes;
                        var _input$label = input.label,
                            label = _input$label === undefined ? '' : _input$label,
                            labelHTML = input.labelHTML,
                            _input$name = input.name,
                            name = _input$name === undefined ? '' : _input$name,
                            _input$id = input.id,
                            id = _input$id === undefined ? '' : _input$id;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + " " + uiClasses;

                        var _errors$messages = errors.messages,
                            errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                            _errors$attributes = errors.attributes,
                            errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                            _errors$nonValidate = errors.nonValidate,
                            nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                            _errors$tags = errors.tags,
                            errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

                        if (labelHTML) label = labelHTML;

                        var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"email\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

                        return "" + inputHTML;
                }
        }]);

        return Email;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a form wrapper around these inputs and a 
 * submit button to submit the form.
 */
var Form = exports.Form = function () {

    /**
     * Sets up the various data to render this form.
     * @param {array} inputHTML - All input data to be added to this form 
     * @param {string} name - name of this form 
     * @param {string} additionalAttrHTML - Attributes that need to be 
     * added to the form primarily used for validation and submit functions.
     * @param {object} settings - Global settings for this form.
     */
    function Form(inputHTML, name, additionalAttrHTML, settings) {
        var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _style.Style;

        _classCallCheck(this, Form);

        /**
         * All input html information for this 
         * form
         * @type {String}
         */
        this.inputHTML = inputHTML;

        /**
         * Name for this form 
         * @type {String}
         */
        this.name = name;

        /**
         * Additional tags to add to this form 
         * @type {String}
         */
        this.additionalAttrHTML = additionalAttrHTML;

        /**
         * Settings for this entire form 
         * @type {Object}
         */
        this.settings = settings;

        /**
         * Settings for this submit button 
         * @type {Object}
         */
        this.submit = settings.submit;
        this.style = new style();
    }

    /**
     * Any default UI classes to add to this form 
     * @type {String}
     */


    _createClass(Form, [{
        key: 'formClasses',
        get: function get() {
            return 'row';
        }

        /**
         * Renders the HTML to render the 
         * @example
         * Form.settings = {
         *     submit : {
         *         label : "My new submit label",
         *         input : {
         *            classes : "my-submit-input"
         *         },
         *         container : {
         *             classes : "my-submit-container"
         *         }
         *     }
         * };
         * 
         * //Will Render 
         * 
         * <div class="ivxjs-grid-1-1 my-submit-container">
         *     <button class="my-submit-input" type="submit">
         *          My new submit label 
         *     </button>
         * </div>
         * 
         * @type {string}
         */

    }, {
        key: 'submitButtonHTML',
        get: function get() {
            var _submit = this.submit,
                submit = _submit === undefined ? {} : _submit;
            var _submit$label = submit.label,
                submitLabel = _submit$label === undefined ? "Submit" : _submit$label,
                submitLabelHTML = submit.labelHTML,
                _submit$input = submit.input,
                submitInput = _submit$input === undefined ? {} : _submit$input,
                _submit$container = submit.container,
                submitContainer = _submit$container === undefined ? {} : _submit$container,
                _submit$attributes = submit.attributes,
                attributes = _submit$attributes === undefined ? '' : _submit$attributes;
            var _submitInput$classes = submitInput.classes,
                submitInputClasses = _submitInput$classes === undefined ? "" : _submitInput$classes;
            var _submitContainer$clas = submitContainer.classes,
                submitContainerClasses = _submitContainer$clas === undefined ? "" : _submitContainer$clas;


            submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

            var submitHTML = submitLabel.length >= 0 ? '\n            <div class="ivxjs-grid-1-1 ' + submitContainerClasses + '">\n            <button class="' + submitInputClasses + '" type=\'submit\' ' + attributes + '>\n                    ' + submitLabel + '\n                </button>\n                </div>\n                ' : '';

            return submitHTML;
        }

        /**
         * Wraps each input's html into a container so they can be formatted correctly
         * utilizing the ivxjs.css's grid system.
         * @type{String} 
         */

    }, {
        key: 'html',
        get: function get() {
            var inputHTML = this.inputHTML,
                name = this.name,
                additionalAttrHTML = this.additionalAttrHTML,
                settings = this.settings,
                formClasses = this.formClasses;
            var _settings$submit = settings.submit,
                submit = _settings$submit === undefined ? {} : _settings$submit,
                _settings$classes = settings.classes,
                configFormClasses = _settings$classes === undefined ? '' : _settings$classes,
                formId = settings.id,
                _settings$label = settings.label,
                label = _settings$label === undefined ? '' : _settings$label,
                labelHTML = settings.labelHTML;


            if (labelHTML) label = labelHTML;

            if (!settings.hideSubmit) {
                inputHTML.push({
                    settings: submit,
                    html: this.submitButtonHTML
                });
            }

            var contents = this.style.addWidthClasses(inputHTML);

            return '\n            ' + label + '\n            <form id="' + formId + '-form" class="' + formClasses + ' ' + configFormClasses + '" novalidate name="' + name + '" ' + additionalAttrHTML + '>                \n                ' + contents + '\n            </form>\n        ';
        }
    }]);

    return Form;
}();

},{"./style":37}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Indicates errors for each input based on the 
 * attributes created from the various rendering libraries
 * iVXjs uses. 
 */
var ErrorMessages = exports.ErrorMessages = function () {

    /**
     * Brings in all the possible error messages 
     * this input can produce.
     * 
     * @param {Array} errorMessages - list of all possible 
     * error messages with attributes indicating the message 
     * and the conditions in which to show them.
     */
    function ErrorMessages() {
        var errorMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ErrorMessages);

        /**
         * List of all possible error messages.
         * @type {Array}
         */
        this.errorMessages = errorMessages;
    }

    /**
     * Sets the classes for the error message div.
     * @type {String} 
     */


    _createClass(ErrorMessages, [{
        key: 'messageClasses',
        get: function get() {
            return 'error-message';
        }

        /**
         * Set the classes for the container of all error messages.
         * @type {String}
         */

    }, {
        key: 'containerClasses',
        get: function get() {
            return 'error-messages';
        }

        /**
         * Renders the HTML for all error messages and the container with 
         * them. Results:
         * @example
         * <div class="error-messages">
         *    <span class="error-message">MESSAGE</span>
         * </div>
         * @type {String}
         */

    }, {
        key: 'html',
        get: function get() {
            var errorMessages = this.errorMessages,
                messageClasses = this.messageClasses,
                containerClasses = this.containerClasses;

            var errorMessageHTML = errorMessages.reduce(function (errorMessageHTML, errorMessage, index) {
                return errorMessageHTML + '<span class="' + messageClasses + '" ' + errorMessage.attrHTML + '>\n                    ' + errorMessage.message + '\n                </span>';
            }, '');

            if (errorMessageHTML.length > 0) {
                return '<div class=\'' + containerClasses + '\'>\n                ' + errorMessageHTML + '\n            </div>';
            }

            return '';
        }
    }]);

    return ErrorMessages;
}();

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Number = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a number input that will record numbers  
 * for iVXjs.
 */
var Number = exports.Number = function () {

        /**
         * Accepts an input object with various input settings and UI specific error 
         * messages
         * @param {object} inputObj - various input settings to render this number input box
         * @param {object} inputObj.input - input specific settings for this number input 
         * @param {object} inputObj.settings - global settings for this number input 
         * @param {string} inputObj.tags - input specific attribute tags 
         * @param {class} inputObj.errors - errors from a rendering for validation and 
         * error messaging appearance.
         * @param {object} errorMessages - UI specific Error messages 
         */
        function Number() {
                var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

                _classCallCheck(this, Number);

                var _inputObj$input = inputObj.input,
                    input = _inputObj$input === undefined ? {} : _inputObj$input,
                    _inputObj$settings = inputObj.settings,
                    settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
                    _inputObj$tags = inputObj.tags,
                    tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
                    _inputObj$errors = inputObj.errors,
                    errors = _inputObj$errors === undefined ? {} : _inputObj$errors;

                /**
                 * Input specific settings for this number input
                 * @type {object}  
                 */

                this.input = input;

                /**
                * Input specific settings for this number input
                * @type {object}  
                */
                this.settings = settings;

                /**
                * Tags to be added to this number input
                * @type {String}
                */
                this.tags = tags;

                /**
                * Holds all validation error correcting.
                * @type {Class}
                */
                this.errors = errors;

                /**
                * Renders UI specific error messages by utilizing the 
                * error class passed down to keep it consistent with the 
                * current UI framework.
                * @type {Class}
                */
                this.errorMessages = errorMessages;

                /**
                * Converts attribute data into attribute HTML for 
                * attributes not covered by the errors class.
                * @type {Class}
                */
                this.attributeTags = _attributes.AttributeTags;
        }

        /**
         * Default ui classes to add to all number inputs 
         * @type {String}
         */


        _createClass(Number, [{
                key: "uiClasses",
                get: function get() {
                        return '';
                }

                /**
                * Default ui attributes to add to this email input 
                * that aren't covered by the tags or errors above.
                * @type {String}
                */

        }, {
                key: "uiAttributes",
                get: function get() {
                        return '';
                }

                /**
                 * The HTML to render a number input based on the settings from the 
                 * constructor. 
                 * 
                 * @example 
                 * //Data 
                 * input.label = "<h1>Label</h1>";
                 * settings.classes = "class-1";
                 * errors.tags = "required='true'";
                 * Number.uiClasses = 'ui-classes-1';
                 * input.attributes = {
                 *     "step" : "0.1"
                 * }
                 * // Renders 
                 * <label>
                 *      <h1>Label</h1>
                 * </label>
                 * <input step="0.1" class="class-1 ui-classes-1" type="number" required="true">
                 * @type {String}
                 */

        }, {
                key: "html",
                get: function get() {
                        var input = this.input,
                            settings = this.settings,
                            tags = this.tags,
                            errors = this.errors,
                            uiClasses = this.uiClasses,
                            uiAttributes = this.uiAttributes;
                        var _input$label = input.label,
                            label = _input$label === undefined ? '' : _input$label,
                            _input$name = input.name,
                            name = _input$name === undefined ? '' : _input$name,
                            _input$id = input.id,
                            id = _input$id === undefined ? '' : _input$id,
                            labelHTML = input.labelHTML;
                        var _settings$input = settings.input,
                            inputSettings = _settings$input === undefined ? {} : _settings$input,
                            _settings$showLabel = settings.showLabel,
                            showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
                        var _inputSettings$classe = inputSettings.classes,
                            classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


                        classes = classes + " " + uiClasses;

                        var _errors$messages = errors.messages,
                            errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                            _errors$attributes = errors.attributes,
                            errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                            _errors$nonValidate = errors.nonValidate,
                            nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                            _errors$tags = errors.tags,
                            errorTags = _errors$tags === undefined ? '' : _errors$tags;

                        var errorHTML = new this.errorMessages(errorMessages).html;
                        var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

                        nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

                        if (labelHTML) label = labelHTML;

                        var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  name=\"" + name + "\"  type=\"number\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

                        return "" + inputHTML;
                }
        }]);

        return Number;
}();

},{"../utilities/attributes.js":42,"./messages.js":31}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Options = exports.Options = function () {
    function Options(inputObj) {
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Options);

        var input = inputObj.input,
            _inputObj$defaultDisp = inputObj.defaultDisplay,
            defaultDisplay = _inputObj$defaultDisp === undefined ? '' : _inputObj$defaultDisp,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? '' : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.tags = tags;
        this.input = input;
        this.defaultDisplay = defaultDisplay;
        this.errors = errors;
        this.settings = settings;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Options, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "html",
        get: function get() {
            var tags = this.tags,
                input = this.input,
                defaultDisplay = this.defaultDisplay,
                errors = this.errors,
                settings = this.settings,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var id = input.id,
                name = input.name,
                options = input.options,
                _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var defaultOptionTag = "<option value=\"\">Select an option...</option>";
            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (errorAttributes.required || defaultDisplay && defaultDisplay.length >= 0) {
                defaultOptionTag = defaultDisplay ? "<option value=\"\">" + defaultDisplay + "</option>" : defaultOptionTag;
            }

            if (labelHTML) label = labelHTML;

            var optionsHTML = options.reduce(function (optionHTML, option) {
                return optionHTML + "\n            <option value=\"" + option.value + "\">" + option.display + "</option>";
            }, '');

            var inputHTML = " \n             <label for=\"" + id + "\">" + label + "</label>             \n               <select class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"" + nonValidateAttributesHTML + " " + errorTags + " " + tags + ">\n                  " + defaultOptionTag + "\n                  " + optionsHTML + "\n               </select>\n               " + errorHTML;

            return "" + inputHTML;
        }
    }]);

    return Options;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Radio = exports.Radio = function () {
    function Radio(radioInputObj) {
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Radio);

        var _radioInputObj$input = radioInputObj.input,
            input = _radioInputObj$input === undefined ? {} : _radioInputObj$input,
            _radioInputObj$radios = radioInputObj.radios,
            radios = _radioInputObj$radios === undefined ? [] : _radioInputObj$radios,
            _radioInputObj$errors = radioInputObj.errors,
            errors = _radioInputObj$errors === undefined ? {} : _radioInputObj$errors,
            _radioInputObj$settin = radioInputObj.settings,
            settings = _radioInputObj$settin === undefined ? {} : _radioInputObj$settin;


        this.radios = radios;
        this.errors = errors;
        this.settings = settings;
        this.input = input;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Radio, [{
        key: "uiRadioGroup",
        value: function uiRadioGroup(radiosHTML) {
            return radiosHTML;
        }
    }, {
        key: "uiRadioButtonContainer",
        value: function uiRadioButtonContainer(radioHTML, uiClasses) {
            var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var id = this.input.id;

            var currentId = "" + id + (value.length > 0 ? '-' + value : '');

            return " \n        <label for=\"" + currentId + "\" class=\"" + uiClasses + "\">\n        " + radioHTML + "\n        </label>";
        }
    }, {
        key: "renderRadioHTML",
        value: function renderRadioHTML(attrHTML, label, value) {
            var id = this.input.id;

            var currentId = "" + id + (value.length > 0 ? '-' + value : '');

            return " \n            <input type=\"radio\" id=\"" + currentId + "\" " + attrHTML + ">\n            " + label;
        }
    }, {
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "html",
        get: function get() {
            var errors = this.errors,
                radios = this.radios,
                settings = this.settings,
                input = this.input,
                uiClasses = this.uiClasses;
            var errorMessages = errors.messages,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? "" : _errors$tags;

            var self = this;
            var inputLabel = input.label,
                inputLableHTML = input.labelHTML;
            var _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;


            if (inputLableHTML) inputLabel = inputLableHTML;

            var radiosHTML = radios.reduce(function (html, radio, index) {
                var label = radio.label,
                    _radio$attrHTML = radio.attrHTML,
                    attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML,
                    _radio$classes = radio.classes,
                    classes = _radio$classes === undefined ? '' : _radio$classes,
                    value = radio.value;


                attrHTML = attrHTML + " " + errorTags;

                var radioHTML = self.renderRadioHTML(attrHTML, label, input.radioButtons[index].value);

                return html + "\n            " + self.uiRadioButtonContainer(radioHTML, uiClasses + " " + classes, input.radioButtons[index].value);
            }, inputLabel);
            var errorHTML = new this.errorMessages(errorMessages).html;
            var allRadioButtonsHTML = "\n             " + radiosHTML + "\n             " + errorHTML;

            return this.uiRadioGroup(allRadioButtonsHTML);
        }
    }]);

    return Radio;
}();

},{"../utilities/attributes.js":42,"./messages.js":31}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputState = exports.InputState = function () {
    function InputState(formSection, data) {
        _classCallCheck(this, InputState);

        this.formSection = formSection;
        this.data = data;
    }

    _createClass(InputState, [{
        key: 'defaultHeaderClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultFooterClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultSectionClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var formSection = this.formSection,
                data = this.data,
                defaultFooterClasses = this.defaultFooterClasses,
                defaultHeaderClasses = this.defaultHeaderClasses,
                defaultSectionClasses = this.defaultSectionClasses;
            var _data$header = data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                _data$section = data.section,
                section = _data$section === undefined ? {} : _data$section;
            var _header$classes = header.classes,
                headerClasses = _header$classes === undefined ? '' : _header$classes,
                _header$html = header.html,
                headerHTML = _header$html === undefined ? '' : _header$html;
            var _section$classes = section.classes,
                sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes,
                footerClasses = _footer$classes === undefined ? '' : _footer$classes,
                _footer$html = footer.html,
                footerHTML = _footer$html === undefined ? '' : _footer$html;


            return '\n            <section class="' + sectionClasses + ' ' + defaultSectionClasses + '" id="' + data.id + '">\n                 <header class="' + headerClasses + ' ' + defaultHeaderClasses + '">' + headerHTML + '</header>\n                ' + formSection + '\n                <footer class="' + footerClasses + ' ' + defaultFooterClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return InputState;
}();

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attributes = require('../utilities/attributes.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationState = exports.NavigationState = function () {
    function NavigationState(data, linkSection) {
        _classCallCheck(this, NavigationState);

        this.data = data;
        this.linkSection = linkSection;
    }

    _createClass(NavigationState, [{
        key: 'defaultHeaderClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultFooterClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultSectionClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'defaultLinkContainerClasses',
        get: function get() {
            return '';
        }
    }, {
        key: 'html',
        get: function get() {
            var data = this.data,
                linkSection = this.linkSection,
                defaultFooterClasses = this.defaultFooterClasses,
                defaultHeaderClasses = this.defaultHeaderClasses,
                defaultSectionClasses = this.defaultSectionClasses,
                defaultLinkContainerClasses = this.defaultLinkContainerClasses;
            var _data$header = data.header,
                header = _data$header === undefined ? {} : _data$header,
                _data$footer = data.footer,
                footer = _data$footer === undefined ? {} : _data$footer,
                _data$section = data.section,
                section = _data$section === undefined ? {} : _data$section,
                _data$linkContainer = data.linkContainer,
                linkContainer = _data$linkContainer === undefined ? {} : _data$linkContainer;
            var _header$classes = header.classes,
                headerClasses = _header$classes === undefined ? '' : _header$classes,
                _header$html = header.html,
                headerHTML = _header$html === undefined ? '' : _header$html;
            var _section$classes = section.classes,
                sectionClasses = _section$classes === undefined ? '' : _section$classes;
            var _footer$classes = footer.classes,
                footerClasses = _footer$classes === undefined ? '' : _footer$classes,
                _footer$html = footer.html,
                footerHTML = _footer$html === undefined ? '' : _footer$html;
            var _linkContainer$classe = linkContainer.classes,
                linkContainerClasses = _linkContainer$classe === undefined ? '' : _linkContainer$classe,
                _linkContainer$attrib = linkContainer.attributes,
                linkContainerAttributes = _linkContainer$attrib === undefined ? {} : _linkContainer$attrib;

            var linkContainerAttributeHTML = new _attributes.AttributeTags(linkContainerAttributes, Object.keys(linkContainerAttributes)).html;

            return '\n            <section class="' + sectionClasses + ' ' + defaultSectionClasses + '" id="' + data.id + '">\n                 <header class="' + headerClasses + ' ' + defaultHeaderClasses + '">' + headerHTML + '</header>\n                 <div class=\'' + defaultLinkContainerClasses + ' ' + linkContainerClasses + '\' ' + linkContainerAttributeHTML + '>\n                    ' + linkSection + '\n                </div>\n                <footer class="' + footerClasses + ' ' + defaultFooterClasses + '">' + footerHTML + '</footer>\n            </section>';
        }
    }]);

    return NavigationState;
}();

},{"../utilities/attributes.js":42}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = exports.Style = function () {
    function Style() {
        _classCallCheck(this, Style);
    }

    _createClass(Style, [{
        key: 'getWidth',
        value: function getWidth(width) {
            if (width === '1') return 'ivxjs-grid-1-1';

            var gridString = width.replace('/', '-');

            return 'ivxjs-grid-' + gridString;
        }
    }, {
        key: 'addWidthClasses',
        value: function addWidthClasses(inputsHTML) {
            var self = this;
            var _containerClasses = this.containerClasses,
                containerClasses = _containerClasses === undefined ? '' : _containerClasses;

            var contents = inputsHTML.reduce(function (currentHTML, inputHTML) {
                var html = inputHTML.html,
                    _inputHTML$settings = inputHTML.settings,
                    settings = _inputHTML$settings === undefined ? {} : _inputHTML$settings;
                var _settings$width = settings.width,
                    width = _settings$width === undefined ? '1' : _settings$width,
                    _settings$container = settings.container,
                    container = _settings$container === undefined ? {} : _settings$container;
                var _container$classes = container.classes,
                    classes = _container$classes === undefined ? '' : _container$classes;


                classes = classes + ' ' + containerClasses;

                var thisWidth = self.getWidth(width);

                html = html.replace("ivxjs-grid-1-1", thisWidth + ' ' + classes);

                return currentHTML + ' ' + html;
            }, '');

            return contents;
        }
    }, {
        key: 'containerClasses',
        get: function get() {
            return 'input-container';
        }
    }]);

    return Style;
}();

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Text = exports.Text = function () {
    function Text() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Text);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Text, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;


            classes = classes + " " + uiClasses;

            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            nonValidateAttributesHTML = nonValidateAttributesHTML + " " + uiAttributes;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + "\"  id=\"" + id + "\" name=\"" + name + "\"  type=\"text\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Text;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Textarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Textarea = exports.Textarea = function () {
    function Textarea() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Textarea);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Textarea, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            if (labelHTML) label = labelHTML;

            label = showLabel ? label : '';

            var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <textarea class=\"" + classes + " " + uiClasses + "\"  id=\"" + id + "\" name=\"" + name + "\" " + uiAttributes + "   " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            </textarea>\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Textarea;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Url = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style");

var _messages = require("./messages.js");

var _attributes = require("../utilities/attributes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = new _style.Style();

var Url = exports.Url = function () {
    function Url() {
        var inputObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _messages.ErrorMessages;

        _classCallCheck(this, Url);

        var _inputObj$input = inputObj.input,
            input = _inputObj$input === undefined ? {} : _inputObj$input,
            _inputObj$settings = inputObj.settings,
            settings = _inputObj$settings === undefined ? {} : _inputObj$settings,
            _inputObj$tags = inputObj.tags,
            tags = _inputObj$tags === undefined ? {} : _inputObj$tags,
            _inputObj$errors = inputObj.errors,
            errors = _inputObj$errors === undefined ? {} : _inputObj$errors;


        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = _attributes.AttributeTags;
    }

    _createClass(Url, [{
        key: "uiClasses",
        get: function get() {
            return '';
        }
    }, {
        key: "uiAttributes",
        get: function get() {
            return '';
        }
    }, {
        key: "html",
        get: function get() {
            var input = this.input,
                settings = this.settings,
                tags = this.tags,
                errors = this.errors,
                uiClasses = this.uiClasses,
                uiAttributes = this.uiAttributes;
            var _input$label = input.label,
                label = _input$label === undefined ? '' : _input$label,
                labelHTML = input.labelHTML,
                _input$name = input.name,
                name = _input$name === undefined ? '' : _input$name,
                _input$id = input.id,
                id = _input$id === undefined ? '' : _input$id;
            var _settings$input = settings.input,
                inputSettings = _settings$input === undefined ? {} : _settings$input,
                _settings$showLabel = settings.showLabel,
                showLabel = _settings$showLabel === undefined ? true : _settings$showLabel;
            var _inputSettings$classe = inputSettings.classes,
                classes = _inputSettings$classe === undefined ? '' : _inputSettings$classe;
            var _errors$messages = errors.messages,
                errorMessages = _errors$messages === undefined ? [] : _errors$messages,
                _errors$attributes = errors.attributes,
                errorAttributes = _errors$attributes === undefined ? '' : _errors$attributes,
                _errors$nonValidate = errors.nonValidate,
                nonValidate = _errors$nonValidate === undefined ? [] : _errors$nonValidate,
                _errors$tags = errors.tags,
                errorTags = _errors$tags === undefined ? '' : _errors$tags;

            var errorHTML = new this.errorMessages(errorMessages).html;
            var nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

            if (labelHTML) label = labelHTML;

            var inputHTML = " \n            <label for=\"" + id + "\"> " + label + " </label>\n            <input class=\"" + classes + " " + uiClasses + "\" " + uiAttributes + "  id=\"" + id + "\" name=\"" + name + "\"  type=\"url\" " + nonValidateAttributesHTML + "   " + errorTags + " " + tags + ">\n            " + errorHTML + "\n       ";

            return "" + inputHTML;
        }
    }]);

    return Url;
}();

},{"../utilities/attributes.js":42,"./messages.js":31,"./style":37}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../video/controls/index.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Controls) {
    _inherits(_class, _Controls);

    function _class(container) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        if (container.html instanceof Function) {
            container.html(_this.html);
        } else {
            var div = document.createElement('div');
            div.innerHTML = _this.html;

            container.appendChild(div);
        }

        var playPauseControlsClasses = _this.playPauseControlsClasses,
            totalTimeInfoClasses = _this.totalTimeInfoClasses,
            currentTimeInfoClasses = _this.currentTimeInfoClasses,
            scrubBarClasses = _this.scrubBarClasses,
            muteControlsClasses = _this.muteControlsClasses,
            volumeBarClasses = _this.volumeBarClasses;


        _this.container = container;
        _this.playPauseControls = document.getElementById("video-controls-play-pause");
        _this.totalTimeInfo = document.getElementById("video-controls-total-time");
        _this.currentTimeInfo = document.getElementById("video-controls-current-time");
        _this.scrubBar = document.getElementById("video-controls-scrub-bar");
        _this.muteControls = document.getElementById("video-controls-mute-controls");
        _this.volumeBar = document.getElementById("video-controls-volume-bar");

        return _this;
    }

    _createClass(_class, [{
        key: 'playPauseControlsClasses',
        get: function get() {
            return 'play-pause';
        }
    }, {
        key: 'totalTimeInfoClasses',
        get: function get() {
            return 'duration';
        }
    }, {
        key: 'currentTimeInfoClasses',
        get: function get() {
            return 'current-time';
        }
    }, {
        key: 'scrubBarClasses',
        get: function get() {
            return 'scrub-bar';
        }
    }, {
        key: 'muteControlsClasses',
        get: function get() {
            return 'mute';
        }
    }, {
        key: 'volumeBarClasses',
        get: function get() {
            return 'volume-bar';
        }
    }, {
        key: 'playClasses',
        get: function get() {
            return 'fa fa-play';
        }
    }, {
        key: 'pauseClasses',
        get: function get() {
            return 'fa fa-pause';
        }
    }, {
        key: 'unmuteClasses',
        get: function get() {
            return 'fa fa-volume-up';
        }
    }, {
        key: 'muteClasses',
        get: function get() {
            return 'fa fa-volume-off';
        }
    }, {
        key: 'scrubBarTimeLapseClasses',
        get: function get() {
            return 'time-lapsed';
        }
    }, {
        key: 'volumeBarCurrentVolumeClasses',
        get: function get() {
            return 'current-volume';
        }
    }, {
        key: 'playPauseButtonHTML',
        get: function get() {
            var play = this.playClasses;
            var playPauseControls = this.playPauseControlsClasses;

            return '\n        <button id="video-controls-play-pause" class="' + playPauseControls + '">\n            <i class=\'' + play + '\'></i>\n        </button>';
        }
    }, {
        key: 'scrubBarHTML',
        get: function get() {
            return '\n             <div id="video-controls-scrub-bar" class="' + this.scrubBarClasses + '">\n                <div class="' + this.scrubBarTimeLapseClasses + '"></div>\n            </div>\n        ';
        }
    }, {
        key: 'timestampHTML',
        get: function get() {
            return '\n        <span id="video-controls-current-time" class="' + this.currentTimeInfoClasses + '"></span>\n        <span id="video-controls-total-time" class="' + this.totalTimeInfoClasses + '"></span>\n        ';
        }
    }, {
        key: 'muteButtonHTML',
        get: function get() {
            var unmute = this.unmuteClasses,
                muteControlsClasses = this.muteControlsClasses;

            return '\n            <button id="video-controls-mute-controls" class="' + muteControlsClasses + '">\n                <i class="' + unmute + '"></i>\n            </button>\n        ';
        }
    }, {
        key: 'volumeBarHTML',
        get: function get() {
            return '\n            <div  id="video-controls-volume-bar" class="' + this.volumeBarClasses + '">\n                <div class="' + this.volumeBarCurrentVolumeClasses + '"></div>\n            </div> \n        ';
        }
    }, {
        key: 'html',
        get: function get() {
            var playPauseButtonHTML = this.playPauseButtonHTML,
                scrubBarHTML = this.scrubBarHTML,
                timestampHTML = this.timestampHTML,
                muteButtonHTML = this.muteButtonHTML,
                volumeBarHTML = this.volumeBarHTML;

            return '\n           ' + playPauseButtonHTML + '\n           ' + scrubBarHTML + '\n           ' + timestampHTML + '\n           ' + muteButtonHTML + '\n           ' + volumeBarHTML + '                        \n        ';
        }
    }]);

    return _class;
}(_index.Controls);

exports.default = _class;

},{"../../video/controls/index.js":44}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts an object with attributes and keys into HTML
 * that inputs can be used.
 */
var AttributeTags = exports.AttributeTags = function () {

  /**
   * Pulls all the attribute settings and the attributes 
   * to be rendered.
   * @param {Object} attributeData - settings for all the attributes.
   * @param {Array} attributeKeys - attribute names to be set.
   */
  function AttributeTags() {
    var attributeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attributeKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, AttributeTags);

    /**
     * All attributes to be made.
     * @type {Object}
     */
    this.attributeData = attributeData;

    /**
     * Attribute names to be set.
     * @type {Array}
     */
    this.attributeKeys = attributeKeys;
  }

  /**
   * Renders attributes based on the keys and attribute data.
   * @example
   * attributeData = { required = "true"};
   * attributeKeys = ["required"];
   * 
   * // Becomes: 
   * html = 'required = "true"'
   * 
   * @type {String}
   */


  _createClass(AttributeTags, [{
    key: 'html',
    get: function get() {
      var attributeKeys = this.attributeKeys,
          attributeData = this.attributeData;

      var attributeHTML = attributeKeys.reduce(function (currentAttributeHTML, currentKey) {

        if (attributeData[currentKey]) {
          var attributeTagHTML = attributeData[currentKey] === 'tag-only' ? currentKey : currentKey + '="' + attributeData[currentKey] + '"';

          return currentAttributeHTML + ' ' + attributeTagHTML + ' ';
        }
        return currentAttributeHTML;
      }, '');
      return attributeHTML;
    }
  }]);

  return AttributeTags;
}();

;

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'contructor',
        value: function contructor() {
            this.volume = 0;
            this.currenttime = 0;
        }
    }, {
        key: 'play',
        value: function play() {
            this.iVXjsBus.emit(this.controlEventNames.PLAY);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.iVXjsBus.emit(this.controlEventNames.PAUSE);
        }
    }, {
        key: 'getDuration',
        value: function getDuration(cb) {
            this.iVXjsBus.once(this.controlEventNames.SET_DURATION, function (duration) {
                cb(duration);
            });
            this.iVXjsBus.emit(this.controlEventNames.GET_DURATION);
        }
    }, {
        key: 'setVolume',
        value: function setVolume(volume) {
            this.iVXjsBus.emit(this.controlEventNames.SET_VOLUME, volume);
        }
    }, {
        key: 'seek',
        value: function seek(seconds) {
            this.iVXjsBus.emit(this.controlEventNames.SEEK, seconds);
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"../settings.js":45}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('./events.js');

var _events2 = _interopRequireDefault(_events);

var _videoEvents = require('../../../constants/video.events.js');

var _videoEvents2 = _interopRequireDefault(_videoEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = exports.Controls = function (_ControlEvents) {
    _inherits(Controls, _ControlEvents);

    function Controls() {
        _classCallCheck(this, Controls);

        var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this));

        _this.currentVolume = 0.5;
        _this.controlEventNames = new _videoEvents2.default();
        return _this;
    }

    _createClass(Controls, [{
        key: 'dispose',
        value: function dispose(iVXjsBus) {
            iVXjsBus.removeListener(this.controlEventNames.TIME_UPDATE, this.updateTime);
            iVXjsBus.removeListener(this.controlEventNames.PLAYING, this.whilePlaying);
            iVXjsBus.removeListener(this.controlEventNames.CAN_PLAY, this.canPlayCallback);
        }
    }, {
        key: 'getAbsolutePosition',
        value: function getAbsolutePosition(element) {
            var relativePosition = { x: element.offsetLeft, y: element.offsetTop };

            if (element.offsetParent) {
                var tempPosition = this.getAbsolutePosition(element.offsetParent);

                relativePosition.x += tempPosition.x;
                relativePosition.y += tempPosition.y;
            }

            return relativePosition;
        }
    }, {
        key: 'adjustVolume',
        value: function adjustVolume(event) {
            var volumeBar = this.volumeBar,
                muteControls = this.muteControls,
                currentVolume = this.currentVolume,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses,
                unmuteClasses = this.unmuteClasses,
                muteClasses = this.muteClasses;
            var width = volumeBar.offsetWidth;

            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);
            var absolutePosition = this.getAbsolutePosition(volumeBar);
            var absoluteX = absolutePosition.x;
            var x = event.pageX;

            var trueX = x - absoluteX;
            var volumeLevel = trueX / width;
            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);

            muteIcon.className = unmuteClasses;
            currentVolumeSpan.style.width = volumeLevel * 100 + '%';

            this.currentVolume = volumeLevel;
            this.setVolume(volumeLevel);
        }
    }, {
        key: 'scrub',
        value: function scrub(event) {
            var currentTimeInfo = this.currentTimeInfo,
                scrubBar = this.scrubBar,
                scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
            var width = scrubBar.offsetWidth;

            var absolutePosition = this.getAbsolutePosition(scrubBar);
            var absoluteX = absolutePosition.x;
            var x = event.pageX;

            var trueX = x - absoluteX;
            var scrubToTime = this.duration * (trueX / width);
            var currentTimeObject = this.convertSecondsToParts(scrubToTime);
            var currentTimeStamp = this.createTimeStamp(currentTimeObject);
            var searchClasses = [scrubBarTimeLapseClasses];
            var timelapsed = this.getElementByClasses(scrubBar.children, searchClasses);

            currentTimeInfo.innerHTML = '' + currentTimeStamp;
            timelapsed.style.width = trueX / width * 100 + '%';

            this.seek(scrubToTime);
        }
    }, {
        key: 'setPlayPause',
        value: function setPlayPause(event) {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            switch (playPauseIcon.className) {
                case playClasses:
                    playPauseIcon.className = pauseClasses;

                    this.play();
                    break;
                case pauseClasses:
                    playPauseIcon.className = playClasses;

                    this.pause();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'setMute',
        value: function setMute(event) {
            var muteControls = this.muteControls,
                muteClasses = this.muteClasses,
                unmuteClasses = this.unmuteClasses,
                volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var muteControlsClasses = [muteClasses, unmuteClasses];
            var muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            switch (muteIcon.className) {
                case unmuteClasses:
                    muteIcon.className = muteClasses;
                    currentVolumeSpan.style.width = '0%';

                    this.setVolume(0);
                    break;
                case muteClasses:
                    muteIcon.className = unmuteClasses;
                    currentVolumeSpan.style.width = this.currentVolume * 100 + '%';

                    this.setVolume(this.currentVolume);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'onReadyToPlay',
        value: function onReadyToPlay(player, stateData) {
            var volumeBar = this.volumeBar,
                volumeBarCurrentVolumeClasses = this.volumeBarCurrentVolumeClasses;

            var self = this;
            var currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

            currentVolumeSpan.style.width = self.currentVolume * 100 + '%';

            this.setVolume(self.currentVolume);
            this.getDuration(function (duration) {
                var totalTimeInfo = self.totalTimeInfo,
                    currentTimeInfo = self.currentTimeInfo,
                    scrubBar = self.scrubBar;

                var durationTimeObject = self.convertSecondsToParts(duration);
                var durationTimeStamp = self.createTimeStamp(durationTimeObject);

                self.duration = duration;

                if (totalTimeInfo) totalTimeInfo.innerHTML = '/' + durationTimeStamp;
                if (currentTimeInfo) currentTimeInfo.innerHTML = '00:00';
                if (scrubBar) scrubBar.children[0].style.width = '0%';
            });
        }
    }, {
        key: 'onTimeUpdate',
        value: function onTimeUpdate(player) {
            var currentTimeInfo = this.currentTimeInfo,
                scrubBar = this.scrubBar,
                scrubBarTimeLapseClasses = this.scrubBarTimeLapseClasses;
            var seconds = player.currentTime;


            seconds = seconds > this.duration ? 0 : seconds;

            var currentTimeObject = this.convertSecondsToParts(seconds);
            var currentTimeStamp = this.createTimeStamp(currentTimeObject);
            var timeLapsed = seconds / this.duration;

            if (currentTimeInfo) currentTimeInfo.innerHTML = '' + currentTimeStamp;

            var searchClasses = [scrubBarTimeLapseClasses];

            if (scrubBar) {
                var timelapsedElement = this.getElementByClasses(scrubBar.children, searchClasses);

                timelapsedElement.style.width = timeLapsed * 100 + '%';
            }
        }
    }, {
        key: 'onPlaying',
        value: function onPlaying() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = pauseClasses;

            this.play();
        }
    }, {
        key: 'onPaused',
        value: function onPaused() {
            var playPauseControls = this.playPauseControls,
                playClasses = this.playClasses,
                pauseClasses = this.pauseClasses;

            var searchClasses = [playClasses, pauseClasses];
            var playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

            playPauseIcon.className = playClasses;

            this.pause();
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners(iVXjsBus) {
            var self = this;
            var scrubBar = this.scrubBar,
                volumeBar = this.volumeBar,
                playPauseControls = this.playPauseControls,
                muteControls = this.muteControls;


            this.iVXjsBus = iVXjsBus;
            this.updateTime = iVXjsBus.on(this.controlEventNames.TIME_UPDATE, updateTime);
            this.whilePaused = iVXjsBus.on(this.controlEventNames.PAUSED, whilePaused);
            this.whilePlaying = iVXjsBus.on(this.controlEventNames.PLAYING, whilePlaying);
            this.canPlayCallback = iVXjsBus.on(this.controlEventNames.CAN_PLAY, canPlayCallBack);
            this.updateTime = this.updateTime ? this.updateTime : updateTime;

            volumeBar.addEventListener('mousedown', function (event) {
                self.adjustVolume(event);
            });
            scrubBar.addEventListener('click', function (event) {
                self.scrub(event);
            });
            playPauseControls.addEventListener('mouseup', function (event) {
                self.setPlayPause(event);
            });
            muteControls.addEventListener('click', function (event) {
                self.setMute(event);
            });

            function canPlayCallBack(player, _stateData) {
                self.onReadyToPlay(player, _stateData);
            }

            function updateTime(player) {
                self.onTimeUpdate(player);
            }

            function whilePaused(player) {
                self.onPaused(player);
            }

            function whilePlaying() {
                self.onPlaying();
            }
        }
    }, {
        key: 'getElementByClasses',
        value: function getElementByClasses(elements, classes) {
            var elementArray = elements instanceof Array ? elements : Array.from(elements);
            var thisElement = void 0;

            classes.forEach(function (className, index) {
                if (!className) return;
                if (thisElement) return;

                thisElement = elementArray.find(function (element, index) {
                    return element.className.indexOf(className) >= 0;
                });
            });

            return thisElement;
        }
    }, {
        key: 'createTimeStamp',
        value: function createTimeStamp(timeObject) {
            var hours = timeObject.hours,
                minutes = timeObject.remainingMinutes,
                seconds = timeObject.remainingSeconds;

            var hourString = '';
            var minuteString = minutes < 10 ? '0' + minutes + ':' : minutes + ':';
            var secondString = seconds < 10 ? '0' + seconds : '' + seconds;

            if (hours > 0) {
                hourString = hours < 10 ? '0' + hours + ':' : hours + ':';
            };

            return '' + hourString + minuteString + secondString;
        }
    }, {
        key: 'convertSecondsToParts',
        value: function convertSecondsToParts(seconds) {
            var minutes = Math.floor(seconds / 60);
            var timeInformation = {
                minutes: minutes,
                hours: Math.floor(minutes / 60),
                remainingSeconds: Math.floor(seconds % 60),
                remainingMinutes: Math.floor(minutes % 60),
                seconds: seconds
            };

            return timeInformation;
        }
    }]);

    return Controls;
}(_events2.default);

;

},{"../../../constants/video.events.js":2,"./events.js":43}],45:[function(require,module,exports){
"use strict";

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
        key: "PlayerControlEvents",
        get: function get() {
            return {
                "play": 'iVX:video:play',
                "pause": 'iVX:video:pause',
                "seek": 'iVX:video:seeked',
                "playing": "iVX:video:playing",
                "ended": "iVX:video:ended",
                "paused": "iVX:video:paused",
                "setVolume": 'iVX:video:setVolume',
                "duration": "iVX:video:requestDuration",
                "getDuration": "iVX:video:getDuration",
                "canPlay": "iVX:video:canplay",
                "timeUpdate": "iVX:video:timeupdate",
                "dispose": "iVX:video:dispose",
                "volume": 'iVX:video:setVolume'
            };
        }
    }]);

    return _class;
}();

exports.default = _class;
;

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2luZGV4LmpzIiwic3JjL2NvbnN0YW50cy92aWRlby5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9idXR0b25zLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvZGF0ZXRpbWUtbG9jYWwuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvZm9ybS5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9udW1iZXIuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9zdGF0ZS5pbnB1dC5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3N0eWxlLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvdXJsLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9hbmNob3IuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2J1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9kYXRlLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2Zvcm0uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L21lc3NhZ2VzLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9udW1iZXIuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3JhZGlvLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3RleHRhcmVhLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMiLCJzcmMvbW9kdWxlcy92aWRlby9jb250cm9scy9ldmVudHMuanMiLCJzcmMvbW9kdWxlcy92aWRlby9jb250cm9scy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3ZpZGVvL3NldHRpbmdzLmpzIiwic3JjL3V0aWxpdGllcy9hc3NlcnRzLmpzIiwic3JjL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMiXSwibmFtZXMiOltdLCJtYXBw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QUMsT0FBRCxFQUFVLEtBQVYsRUFBb0I7QUFDbkMsd0JBQUksWUFBWSxLQUFLLEdBQUwsQ0FBUyxnQkFBZ0IsR0FBaEIsQ0FBVCxFQUErQixRQUFRLEdBQVIsQ0FBL0IsQ0FBaEI7O0FBRUEsd0JBQUksU0FBSixFQUFlO0FBQ1gsa0NBQVUsTUFBVixDQUFpQixJQUFqQixDQUFzQjtBQUNsQixpQ0FBSyxHQURhO0FBRWxCLG1DQUFPLEtBRlc7QUFHbEIsbUNBQU8sUUFBUSxHQUFSO0FBSFcseUJBQXRCO0FBS0Esa0NBQVUsUUFBVixHQUFxQixLQUFyQjtBQUNILHFCQVBELE1BT087QUFDSCx3Q0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FBMEIsUUFBUSxHQUFSLENBQTFCO0FBQ0g7QUFDSixpQkFiRDtBQWNILGFBaEJEOztBQWtCQSxtQkFBTyxTQUFQO0FBQ0g7Ozs7OztBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlkZW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFJFQURZX1BMQVlFUiA6IFwicmVhZHktcGxheWVyXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCB7IEFuY2hvciBhcyBEZWZhdWx0QW5jaG9yIH0gZnJvbSAnLi4vZGVmYXVsdC9hbmNob3IuanMnO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRGVmYXVsdEFuY2hvcntcblx0Y29uc3RydWN0b3IoYW5jaG9ySW5mbyl7XG5cdFx0c3VwZXIoYW5jaG9ySW5mbyk7XG5cdH1cbn0iLCJpbXBvcnQgeyBCdXR0b25zIGFzIERlZmF1bHRCdXR0b25zIH0gZnJvbSAnLi4vZGVmYXVsdC9idXR0b25zLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyBleHRlbmRzIERlZmF1bHRCdXR0b25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbnMsIGlucHV0KSB7XHJcbiAgICAgICAgc3VwZXIoYnV0dG9ucywgaW5wdXQsIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2J0bic7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ2hlY2tib3ggYXMgRGVmYXVsdENoZWNrYm94IH0gZnJvbSAnLi4vZGVmYXVsdC9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgRGVmYXVsdENoZWNrYm94IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjaGVja2JveCBmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJDaGVja2JveENvbnRhaW5lcihjbGFzc2VzLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2xhYmVsfSA9IGlucHV0O1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gICAgXHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgJHthdHRyaWJ1dGVzfSB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgIDwvZGl2PmBcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGUgYXMgRGVmYXVsdERhdGUgfSBmcm9tICcuLi9kZWZhdWx0L2RhdGUuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlIGV4dGVuZHMgRGVmYXVsdERhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGV0aW1lTG9jYWwgYXMgRGVmYXVsdERhdGV0aW1lTG9jYWwgfSBmcm9tICcuLi9kZWZhdWx0L2RhdGV0aW1lLWxvY2FsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZXRpbWVMb2NhbCBleHRlbmRzIERlZmF1bHREYXRldGltZUxvY2Fse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFbWFpbCBhcyBEZWZhdWx0RW1haWwgfSBmcm9tICcuLi9kZWZhdWx0L2VtYWlsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWwgZXh0ZW5kcyBEZWZhdWx0RW1haWx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi9zdHlsZS5qcyc7XHJcbmltcG9ydCB7IEZvcm0gYXMgRGVmYXVsdEZvcm0gfSBmcm9tICcuLi9kZWZhdWx0L2Zvcm0uanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm0gZXh0ZW5kcyBEZWZhdWx0Rm9ybSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MpIHtcclxuICAgICAgIHN1cGVyKGlucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncywgU3R5bGUpOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHN1Ym1pdEJ1dHRvbkhUTUwoKSB7ICAgICAgICBcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcbn0iLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi9hbmNob3IuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtLmpzJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5qcyc7XHJcbmltcG9ydCB7IEJ1dHRvbnMgfSBmcm9tICcuL2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9ucy5qc1wiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBSYWRpbyB9IGZyb20gJy4vcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBOdW1iZXIgfSBmcm9tICcuL251bWJlci5qcyc7XHJcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IERhdGUgfSBmcm9tICcuL2RhdGUuanMnO1xyXG5pbXBvcnQgeyBVcmwgfSBmcm9tICcuL3VybC5qcyc7XHJcbmltcG9ydCB7IERhdGV0aW1lTG9jYWwgfSBmcm9tICcuL2RhdGV0aW1lLWxvY2FsLmpzJztcclxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xyXG5cclxuLy9TdGF0ZXNcclxuaW1wb3J0IHsgSW5wdXRTdGF0ZSB9IGZyb20gJy4vc3RhdGUuaW5wdXQuanMnO1xyXG5pbXBvcnQgeyBWaWRlb1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS52aWRlby5qcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSB9IGZyb20gXCIuL3N0YXRlLm5hdmlnYXRpb24uanNcIjtcclxuXHJcbi8vQ29udHJvbHMgXHJcbmltcG9ydCBWaWRlb0NvbnRyb2xzIGZyb20gJy4vdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcFVJIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYW5jaG9yID0gQW5jaG9yO1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IEZvcm07XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gVGV4dDtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBCdXR0b25zO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IERhdGU7XHJcbiAgICAgICAgdGhpcy5kYXRldGltZUxvY2FsID0gRGF0ZXRpbWVMb2NhbDtcclxuICAgICAgICB0aGlzLmNoZWNrYm94ID0gQ2hlY2tib3g7XHJcbiAgICAgICAgdGhpcy52aWRlb0NvbnRyb2xzID0gVmlkZW9Db250cm9scztcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPcHRpb25zO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBFbWFpbDtcclxuICAgICAgICB0aGlzLnVybCA9IFVybDtcclxuICAgICAgICB0aGlzLnRleHRhcmVhID0gVGV4dGFyZWE7XHJcbiAgICAgICAgdGhpcy5yYWRpbyA9IFJhZGlvO1xyXG4gICAgICAgIHRoaXMubnVtYmVyID0gTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcclxuICAgICAgICAgICAgaW5wdXQ6IElucHV0U3RhdGUsXHJcbiAgICAgICAgICAgIHZpZGVvOiBWaWRlb1N0YXRlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uIDogTmF2aWdhdGlvblN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZUJvb3RzdHJhcFVJO1xyXG5cclxuaWYgKGFuZ3VsYXIgJiYgYW5ndWxhci5tb2R1bGUoJ2l2eC1qcycpKSB7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaXZ4LWpzJylcclxuICAgICAgICAuY29uc3RhbnQoJ2lWWGpzLnVpLmJvb3RzdHJhcCcsIGluaXRpYWxpemVCb290c3RyYXBVSSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVCb290c3RyYXBVSSgpe1xyXG4gICAgcmV0dXJuIEJvb3RzdHJhcFVJO1xyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyBhcyBEZWZhdWx0RXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuLi9kZWZhdWx0L21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlcyBleHRlbmRzIERlZmF1bHRFcnJvck1lc3NhZ2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSl7ICAgICAgIFxyXG4gICAgICAgc3VwZXIoZXJyb3JNZXNzYWdlcyk7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdoYXMtZXJyb3InO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbWVzc2FnZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2hlbHAtYmxvY2snO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTnVtYmVyIGFzIERlZmF1bHROdW1iZXIgfSBmcm9tICcuLi9kZWZhdWx0L251bWJlci5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlciBleHRlbmRzIERlZmF1bHROdW1iZXJ7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IE9wdGlvbnMgYXMgRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuLi9kZWZhdWx0L29wdGlvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIGV4dGVuZHMgRGVmYXVsdE9wdGlvbnN7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJztcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJhZGlvIGFzIERlZmF1bHRSYWRpbyB9IGZyb20gJy4uL2RlZmF1bHQvcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIERlZmF1bHRSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFkaW8gZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCwgdmFsdWUpeyBcclxuICAgICAgICBsZXQge2lucHV0ID17fX0gPXRoaXM7XHJcbiAgICAgICAgbGV0IHtpZH0gPSBpbnB1dDsgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IGAke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyArIHZhbHVlIDogJyd9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7Y3VycmVudElkfVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCIke2N1cnJlbnRJZH1cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIGAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbnB1dFN0YXRlIGFzIERlZmF1bHRJbnB1dFN0YXRlIH0gZnJvbSAnLi4vZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSBleHRlbmRzIERlZmF1bHRJbnB1dFN0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihoZWFkZXIsIGZvcm1TZWN0aW9uLCBmb290ZXIsIGRhdGEpe1xyXG4gICAgICAgIHN1cGVyKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2NvbnRhaW5lci1mbHVpZCc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05hdmlnYXRpb25TdGF0ZSBhcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLm5hdmlnYXRpb24uanMnO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIGV4dGVuZHMgRGVmYXVsdE5hdmlnYXRpb25TdGF0ZSB7ICAgICBcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsaW5rU2VjdGlvbil7XG4gICAgICAgIHN1cGVyKGRhdGEsIGxpbmtTZWN0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJ2NvbnRhaW5lci1mbHVpZCc7XG4gICAgfSBcbn0iLCJleHBvcnQgY2xhc3MgVmlkZW9TdGF0ZSB7IFxyXG4gICAgY29uc3RydWN0b3IocGxheWVyU2VjdGlvbiwgZGF0YSl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJTZWN0aW9uID0gcGxheWVyU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3BsYXllclNlY3Rpb24sIGRhdGF9ID0gdGhpcztcclxuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9fSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYGB9ID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA6IHNlY3Rpb25DbGFzc2VzID0gJycgfSA9IHNlY3Rpb247XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sIDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInVpIGNvbnRhaW5lciAke3NlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAke3BsYXllclNlY3Rpb259XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aFRvdGFsID0gMC4wO1xyXG4gICAgICAgIGxldCBjb2x1bW5OYW1lcyA9IFtcImNvbC1tZC0xXCIsIFwiY29sLW1kLTJcIiwgXCJjb2wtbWQtM1wiLCBcImNvbC1tZC00XCIsIFwiY29sLW1kLTVcIiwgXCJjb2wtbWQtNlwiLCBcImNvbC1tZC03XCIsIFwiY29sLW1kLThcIiwgXCJjb2wtbWQtOVwiICxcImNvbC1tZC0xMFwiLCBcImNvbC1tZC0xMVwiLCBcImNvbC1tZC0xMlwiXVxyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0SFRNTC5yZWR1Y2UoKGNvbnRlbnRIVE1MLCB0aGlzSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtodG1sLCBzZXR0aW5nc30gPSB0aGlzSW5wdXQ7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSBcIjFcIiwgY2xhc3Nlcz0gJyd9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCBudW1lcmljV2lkdGggPSBnZXROdW1lcmljV2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PGRpdiBjbGFzcz1cInJvd1wiPiBgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRXaWR0aFRvdGFsICs9IG51bWVyaWNXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBib290c3RyYXBXaWR0aFN0eWxlTmFtZSA9IGNvbHVtbk5hbWVzW01hdGgucm91bmQobnVtZXJpY1dpZHRoICogY29sdW1uTmFtZXMubGVuZ3RoKSAtIDFdO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCdpdnhqcy1ncmlkLTEtMScsIGBmb3JtLWdyb3VwICR7Ym9vdHN0cmFwV2lkdGhTdHlsZU5hbWV9ICR7Y2xhc3Nlc31gKTtcclxuICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH0ke2h0bWx9YDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGhUb3RhbCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SFRNTCA9IGAke2NvbnRlbnRIVE1MfTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50V2lkdGhUb3RhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50SFRNTDtcclxuICAgICAgICB9LCAnJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY29udGVudHMuc3Vic3RyaW5nKGNvbnRlbnRzLmxlbmd0aCAtIDcpICE9PSBcIjwvZGl2PlwiKXtcclxuICAgICAgICAgICAgY29udGVudHMgPSBgJHtjb250ZW50c308L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE51bWVyaWNXaWR0aCh3aWR0aFN0cmluZyl7XHJcbiAgICAgICAgICAgIGlmKHdpZHRoU3RyaW5nID09PSAnMScpIHJldHVybiAxO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBhcnNlZFdpZHRoRm9ybXVsYSA9IHdpZHRoU3RyaW5nLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChwYXJzZWRXaWR0aEZvcm11bGFbMF0pIC8gcGFyc2VGbG9hdChwYXJzZWRXaWR0aEZvcm11bGFbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHQgYXMgRGVmYXVsdFRleHQgfSBmcm9tICcuLi9kZWZhdWx0L3RleHQuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgRGVmYXVsdFRleHR7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFRleHRhcmVhIGFzIERlZmF1bHRUZXh0YXJlYSB9IGZyb20gJy4uL2RlZmF1bHQvdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIERlZmF1bHRUZXh0YXJlYXtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBVcmwgYXMgRGVmYXVsdFVybCB9IGZyb20gJy4uL2RlZmF1bHQvdXJsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsIGV4dGVuZHMgRGVmYXVsdFVybHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERlZmF1bHRWaWRlb0NvbnRyb2xzIGZyb20gJy4uL2RlZmF1bHQvdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBEZWZhdWx0VmlkZW9Db250cm9scyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGlWWGpzQnVzKSB7XHJcbiAgICAgICAgc3VwZXIoY29udGFpbmVyLCBpVlhqc0J1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvdGFsVGltZUluZm9DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZHVyYXRpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5Q2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tcGxheSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhdXNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tcGF1c2UnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1bm11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi12b2x1bWUtdXAnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tdm9sdW1lLW9mZic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2J0biBidG4tZGVmYXVsdCBidG4teHMnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcnViQmFyVGltZUxhcHNlQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gYGJhcmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIiBjbGFzcz1cInByb2dyZXNzICR7dGhpcy5zY3J1YkJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2NydWItYmFyLXByb2dyZXNzLWNvbnRhaW5lclwiIGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIm1pbi13aWR0aDogMDtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2NydWItYmFyLXRpbWVzdGFtcC1sYWJlbFwiIGNsYXNzPVwibGFiZWxcIj4ke3RoaXMudGltZXN0YW1wSFRNTH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZUJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdwcm9ncmVzcy1iYXInO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFySFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCJwcm9ncmVzcyAke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlQYXVzZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3BsYXlDbGFzc2VzIDogcGxheX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHNDbGFzc2VzIDogcGxheVBhdXNlQ29udHJvbHN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJwbGF5LWJ1dHRvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIiBjbGFzcz1cIiR7cGxheVBhdXNlQ29udHJvbHN9XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz0nJHtwbGF5fSc+PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2PmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3VubXV0ZUNsYXNzZXMgOiB1bm11dGUsIG11dGVDb250cm9sc0NsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJtdXRlLWJ1dHRvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIiBjbGFzcz1cIiR7bXV0ZUNvbnRyb2xzQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiJHt1bm11dGV9XCI+PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VCdXR0b25IVE1MLCBzY3J1YkJhckhUTUwsIHRpbWVzdGFtcEhUTUwsIG11dGVCdXR0b25IVE1MLCB2b2x1bWVCYXJIVE1MfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgJHtwbGF5UGF1c2VCdXR0b25IVE1MfVxyXG4gICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgJHt2b2x1bWVCYXJIVE1MfSAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgIH1cclxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcbmltcG9ydCB7IFR5cGVWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvdHlwZS1wYXJzZXJzLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcblxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XG5cbmV4cG9ydCBjbGFzcyBBbmNob3Ige1xuICAgIGNvbnN0cnVjdG9yKGFuY2hvckluZm8pIHsgICBcbiAgICAgICB0aGlzLmFuY2hvckluZm8gPSBhbmNob3JJbmZvO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuY2hvckNsYXNzZXMoKXtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHthbmNob3JDbGFzc2VzfSA9IHRoaXM7XG4gICAgICAgIGxldCB7aHJlZiA9ICcnLCBjbGFzc2VzID0gJycsIGF0dHJpYnV0ZXMgPSB7fSwgbGFiZWwgPSBsYWJlbEhUTUwsIGxhYmVsSFRNTCwgaWQ9Jyd9ID0gdGhpcy5hbmNob3JJbmZvOyBcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhhdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkuaHRtbDtcblxuICAgICAgICBpZighbGFiZWxIVE1MICYmICFsYWJlbCl7XG4gICAgICAgICAgICBsYWJlbCA9IGhyZWY7XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICA8YSBpZD0nJHtpZH0nIGNsYXNzPVwiJHtjbGFzc2VzfSAke2FuY2hvckNsYXNzZXN9XCIgIGhyZWY9XCIke2hyZWZ9XCIgJHthdHRyaWJ1dGVIVE1MfSA+JHtsYWJlbEhUTUwgPyBsYWJlbEhUTUwgOiBsYWJlbH08L2E+ICAgICAgICAgICBcbiAgICAgICAgYFxuICAgIH1cbn1cbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvYXNzZXJ0cy5qcyc7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxubGV0IHR5cGVDaGVjayA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIGNvbGxlY3Rpb24gb2YgYnV0dG9ucyBmb3Igb25lIGNsaWNrIHJlY29yZGluZyBvZiBcclxuICogYW4gaW5wdXQgdGhhdCBoYXMgbXVsdGlwbGUgb3B0aW9ucyBmb3IgZGF0YSByZWNvcmRpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUYWtlcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSBidXR0b25zLCBhIGNsYXNzIHRoYXQgcmVuZGVycyB0aGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyBhbmQgYSBjbGFzcyB0aGF0IHJlbmRlcnMgYXR0cmlidXRlcy4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zSW5mbyAtIEluZm9ybWF0aW9uIHRvIGNyZWF0ZSB0aGlzIGJ1dHRvbiBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1dHRvbnNJbmZvLmJ1dHRvbnMgLSBlYWNoIGluZGl2aWR1YWwgYnV0dG9uIGRhdGEgYW5kIHNldHRpbmdzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvLnNldHRpbmdzIC0gc2V0dGluZ3MgZm9yIGFsbCBidXR0b25zIFxyXG4gICAgICogQHBhcmFtIHtDbGFzc30gYnV0dG9uc0luZm8uZXJyb3JzIC0gYW4gZXJyb3IgY2xhc3MgdGhhdCB3YXMgY3JlYXRlZCBieSB0aGUgXHJcbiAgICAgKiByZW5kZXJpbmcgbGlicmFyeSBzbyB0aGUgZXJyb3JzIG9wZW4gYW5kIGRpc3BsYXkgYWxvbmdzaWRlIHRoZSBsaWJyYXJ5LiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnV0dG9ucyA9IFtdLCBpbnB1dCwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnV0dG9ucyB0byBiZSByZW5kZXJlZFxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgaW4gdGhpcyBncm91cCBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXJyb3IgbWVzc2FnZSBjbGFzcyB0aGF0IHdpbGwgdGFrZSB0aGUgZXJyb3JzIGZyb20gXHJcbiAgICAgICAgICogdGhlIHJlbmRlcmluZyBsaWJyYXJ5IGFuZCBhZGRzIHRoZW0gdG8gdGhpcyBpbnB1dCBcclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhdHRyaWJ1dGUgdGFncyBodG1sIHRvIGJlIGFkZGVkIHRvIHRoaXMgYnV0dG9uIFxyXG4gICAgICAgICAqIGlucHV0cy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExldHMgdXNlcnMgYWRkIHRoZSBzYW1lIGNsYXNzZXMgdG8gYWxsIGJ1dHRvbnMganVzdCBpbiBcclxuICAgICAqIGNhc2UgYnV0dG9ucyBzaGFyZSBhIHNwZWNpZmljIGNsYXNzLlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBIVE1MIGZvciBldmVyeSBidXR0b25zIGRlZmluZWQgaW4gdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIFxyXG4gICAgICogYXR0YWNoZXMgdGhlIGVycm9yIG1lc3NhZ2VzIGF0dGFjaGVkIHRvIHRoaXMgaW5wdXQuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYnV0dG9uQ2xhc3NlcyA9ICdidXR0b24tY2xhc3MnO1xyXG4gICAgICogYnV0dG9ucyA9IFt7XHJcbiAgICAgKiAgICBsYWJlbCA6IFwiQnV0dG9uIDFcIixcclxuICAgICAqICAgIGF0dHJIVE1MIDogXCJkaXNhYmxlZFwiLFxyXG4gICAgICogICAgY2xhc3NlcyA6IFwiY2xhc3MtMVwiXHJcbiAgICAgKiB9LHtcclxuICAgICAqICAgIGxhYmVsIDogXCI8aDE+QnV0dG9uIDI8L2gxPlwiLFxyXG4gICAgICogICAgY2xhc3NlcyBcIiBjbGFzcy0yXCJcclxuICAgICAqIH1dO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBXaWxsIHJlbmRlcjpcclxuICAgICAqIFxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1jbGFzcyBjbGFzcy0xXCIgZGlzYWJsZWQ+QnV0dG9uIDE8L2J1dHRvbj5cclxuICAgICAqIDxidXR0b24gY2xhc3M9XCJidXR0b24gY2xhc3MgY2xhc3MtMlwiPjxoMT5CdXR0b24gMjwvaDE+PC9idXR0b24+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JzOiBlcnJvckNsYXNzID0ge30sIGJ1dHRvbnMgPSBbXSwgaW5wdXQgPSB7fSwgYnV0dG9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMgPSB7fSwgZXJyb3JzID0ge30sIG1lc3NhZ2VzID0ge30gfSA9IGVycm9yQ2xhc3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVycm9yTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2Vycm9yc1trZXldfWAsXHJcbiAgICAgICAgICAgICAgICBhdHRySFRNTDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhidXR0b25FcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MID0gJycsIHNob3dMYWJlbCA9IGZhbHNlLCBpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgYnV0dG9uc0hUTUwgPSBidXR0b25zLnJlZHVjZSgoaHRtbCwgYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBsYWJlbCwgYXR0ckhUTUwgPSAnJywgY2xhc3NlcyA9IFwiXCIgfSA9IGJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfSBcclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gJHthdHRySFRNTH0gY2xhc3M9XCIke2NsYXNzZXN9ICR7YnV0dG9uQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgIGlmICgobGFiZWxIVE1MLmxlbmd0aCA+IDAgfHwgbGFiZWwubGVuZ3RoID4gMCkgJiYgc2hvd0xhYmVsKSB7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGxhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsO1xyXG4gICAgICAgICAgICBsYWJlbEhUTUwgPSBgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbEhUTUx9PC9sYWJlbD5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgJHtsYWJlbEhUTUx9XHJcbiAgICAgICAgICAgICAke2J1dHRvbnNIVE1MfVxyXG4gICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VzfSAgICAgICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y2VzIGh0bWwgdG8gYnVpbGQgYSBjaGVja2JveCBpbnB1dCBmb3IgdGhlICBcclxuICogdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzLiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSBjaGVja2JveCdzIHNldHRpbmdzIGZyb20gYSBzdGFuZGFyZCBpbnB1dCBkYXRhIFxyXG4gICAgICogb2JqZWN0IGFuZCBzZXRzIHRoZSB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIHRoaXMgY2xhc3MgXHJcbiAgICAgKiB3aWxsIHJlbmRlciBpZiB0aGUgY2hlY2tib3ggaXNuJ3QgdmFsaWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9iaiAtIGNvbnRhaW5zIGFsbCB0aGUgY29uZmlndXJhdGlvbnMgXHJcbiAgICAgKiB0byByZW5kZXIgdGhpcyBpbnB1dC5cclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGVycm9yTWVzc2FnZXMgLSBhIGNsYXNzIHRoYXQgd2lsbCByZW5kZXIgdGhlIFxyXG4gICAgICogc3BlY2lmaWMgdHlwZSBvZiBlcnJvciBtZXNzYWdlcyBiYXNlZCBvbiB0aGlzIFVJJ3Mgc2V0dGluZ3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgdGFncyA9ICcnLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBjaGVja2JveCdzIGlucHV0IGNvbmZpZ3VyYXRpb24gXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFueSBjdXN0b20gdGFncyBwYXNzZWQgZG93biBmcm9tIHRoZSByZW5kZXJpbmcgbGlicmFyeS4gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyB3aG9sZSBpbnB1dCBpbmNsdWRpbmcgdGhlIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGNsYXNzIG9mIGVycm9ycyBjcmVhdGVkIGJ5IHRoZSByZW5kZXJpbmcgbGlicmFyeSB0byBcclxuICAgICAgICAgKiBoaWRlIGFuZCBzaG93IHZhcmlvdXMgZXJyb3JzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBVSSdzIHJlbmRlcmluZyBvZiB0aGlzIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtjbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRlZmF1bHQgY2xhc3MgdG8gdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgVUkgc3BlY2lmaWMgYXR0cmlidXRlc1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlZCBmb3IgdGhpcyBjaGVja2JveCBpbnB1dCBcclxuICAgICAqIHRvIGJlIHVzZWQgYW5kIHJlbmRlcmVkIHByb3Blcmx5LlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgc3RyaW5nIG9mIGFsbCBhdHRyaWJ1dGVzIHRvIGxvYWQgXHJcbiAgICAgKiB0aGlzIGlucHV0IGluY2x1ZGluZyBpdHMgaWQsIG5hbWUgYW5kIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGdldCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWV9ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCJgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBmcm9tIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIFxyXG4gICAgICogYW5kIGNsYXNzZXMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdWlDbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBpbnB1dC5jbGFzc2VzID0gXCJjbGFzcy0yXCI7XHJcbiAgICAgKiByZXF1aXJlZEF0dHJpYnV0ZXMgPSBcImlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCdcIlxyXG4gICAgICogLy8gUmVuZGVycyBUbzpcclxuICAgICAqIDxsYWJlbCBjbGFzcz1cImNsYXNzLTEgY2xhc3MtMlwiPlxyXG4gICAgICogICAgIDxpbnB1dCBpZD0naWQtMScgbmFtZT0nY2hlY2tib3gtbmFtZScgdHlwZT0nY2hlY2tib3gnPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBodG1sIG9mIHRoZSBmdWxseSBjcmVhdGVkIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94Q29udGFpbmVyKGNsYXNzZXMsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5nc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCIgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgIDxpbnB1dCAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIGFuZCByZW5kZXJzIGFsbCB0aGUgSFRNTCBmb3IgdGhpcyBjaGVja2JveCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgc2V0dGluZ3MgPSB7fSwgZXJyb3JzLCBpbnB1dCwgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBsYWJlbCA9ICcnIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBtZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IHRoaXMuZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKG1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBhbGxDbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBsZXQgYWxsQXR0cmlidXRlcyA9IGAke3JlcXVpcmVkQXR0cmlidXRlc30gJHt1aUF0dHJpYnV0ZXN9ICR7dGFnc30gJHtlcnJvclRhZ3N9YFxyXG4gICAgICAgIGxldCBjaGVja2JveEhUTUwgPSB0aGlzLnJlbmRlckNoZWNrYm94Q29udGFpbmVyKGFsbENsYXNzZXMsIGFsbEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAke2NoZWNrYm94SFRNTH1cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZGF0ZSBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGRhdGUgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbCBpbnB1dCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZSBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGUgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBkYXRlIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgZGF0ZSBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBEYXRlLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5nczsgICAgICAgIFxyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IEF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJkYXRlXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRldGltZSBsb2NhbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGRhdGUgd2l0aCB0aW1lc3RhbXAgc3BlY2lmaWMgZGF0YSBcclxuICogZm9yIGlWWGpzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGV0aW1lTG9jYWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgKiBtZXNzYWdlc1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJveFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dCBcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLnNldHRpbmdzIC0gZ2xvYmFsIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIFVJIHNwZWNpZmljIGVycm9yIG1lc3NhZ2VzIGJ5IHV0aWxpemluZyB0aGUgXHJcbiAgICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAgKiBhdHRyaWJ1dGVzIG5vdCBjb3ZlcmVkIGJ5IHRoZSBlcnJvcnMgY2xhc3MuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIGRhdGV0aW1lLWxvY2FsIGlucHV0cyBcclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBgYFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRldGltZS1sb2NhbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICogXHJcbiAgICAqIEBleGFtcGxlIFxyXG4gICAgKiAvL0RhdGEgXHJcbiAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICogRGF0ZXRpbWVMb2NhbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICogLy8gUmVuZGVycyBcclxuICAgICogPGxhYmVsPlxyXG4gICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAqIDwvbGFiZWw+XHJcbiAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgcmVxdWlyZWQ9XCJ0cnVlXCI+XHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZW1haWwgaW5wdXQgdGhhdCB3aWxsIHJlY29yZCBlbWFpbHMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIGVtYWlsIGlucHV0IGJveFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqLmlucHV0IC0gaW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZW1haWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERlZmF1bHQgdWkgYXR0cmlidXRlcyB0byBhZGQgdG8gdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICogdGhhdCBhcmVuJ3QgY292ZXJlZCBieSB0aGUgdGFncyBvciBlcnJvcnMgYWJvdmUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhbiBlbWFpbCBpbnB1dCBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgXHJcbiAgICAgKiBjb25zdHJ1Y3Rvci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogLy9EYXRhIFxyXG4gICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAgKiBzZXR0aW5ncy5jbGFzc2VzID0gXCJjbGFzcy0xXCI7XHJcbiAgICAgKiBlcnJvcnMudGFncyA9IFwicmVxdWlyZWQ9J3RydWUnXCI7XHJcbiAgICAgKiBFbWFpbC51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJlbWFpbFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0eWxlfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZm9ybSB3cmFwcGVyIGFyb3VuZCB0aGVzZSBpbnB1dHMgYW5kIGEgXHJcbiAqIHN1Ym1pdCBidXR0b24gdG8gc3VibWl0IHRoZSBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgdmFyaW91cyBkYXRhIHRvIHJlbmRlciB0aGlzIGZvcm0uXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBpbnB1dEhUTUwgLSBBbGwgaW5wdXQgZGF0YSB0byBiZSBhZGRlZCB0byB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhpcyBmb3JtIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxBdHRySFRNTCAtIEF0dHJpYnV0ZXMgdGhhdCBuZWVkIHRvIGJlIFxyXG4gICAgICogYWRkZWQgdG8gdGhlIGZvcm0gcHJpbWFyaWx5IHVzZWQgZm9yIHZhbGlkYXRpb24gYW5kIHN1Ym1pdCBmdW5jdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2V0dGluZ3MgLSBHbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZm9ybS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRIVE1MLCBuYW1lLCBhZGRpdGlvbmFsQXR0ckhUTUwsIHNldHRpbmdzLCBzdHlsZSA9IFN0eWxlKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBpbnB1dCBodG1sIGluZm9ybWF0aW9uIGZvciB0aGlzIFxyXG4gICAgICAgICAqIGZvcm1cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXRIVE1MID0gaW5wdXRIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYW1lIGZvciB0aGlzIGZvcm0gXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRpdGlvbmFsIHRhZ3MgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbEF0dHJIVE1MID0gYWRkaXRpb25hbEF0dHJIVE1MO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBlbnRpcmUgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dGluZ3MgZm9yIHRoaXMgc3VibWl0IGJ1dHRvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3VibWl0ID0gc2V0dGluZ3Muc3VibWl0O1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgc3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBkZWZhdWx0IFVJIGNsYXNzZXMgdG8gYWRkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBmb3JtQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ3JvdydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgdG8gcmVuZGVyIHRoZSBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBGb3JtLnNldHRpbmdzID0ge1xyXG4gICAgICogICAgIHN1Ym1pdCA6IHtcclxuICAgICAqICAgICAgICAgbGFiZWwgOiBcIk15IG5ldyBzdWJtaXQgbGFiZWxcIixcclxuICAgICAqICAgICAgICAgaW5wdXQgOiB7XHJcbiAgICAgKiAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1pbnB1dFwiXHJcbiAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgKiAgICAgICAgIGNvbnRhaW5lciA6IHtcclxuICAgICAqICAgICAgICAgICAgIGNsYXNzZXMgOiBcIm15LXN1Ym1pdC1jb250YWluZXJcIlxyXG4gICAgICogICAgICAgICB9XHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfTtcclxuICAgICAqIFxyXG4gICAgICogLy9XaWxsIFJlbmRlciBcclxuICAgICAqIFxyXG4gICAgICogPGRpdiBjbGFzcz1cIml2eGpzLWdyaWQtMS0xIG15LXN1Ym1pdC1jb250YWluZXJcIj5cclxuICAgICAqICAgICA8YnV0dG9uIGNsYXNzPVwibXktc3VibWl0LWlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICogICAgICAgICAgTXkgbmV3IHN1Ym1pdCBsYWJlbCBcclxuICAgICAqICAgICA8L2J1dHRvbj5cclxuICAgICAqIDwvZGl2PlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgc3VibWl0QnV0dG9uSFRNTCgpIHtcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgJHtzdWJtaXRDb250YWluZXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiJHtzdWJtaXRJbnB1dENsYXNzZXN9XCIgdHlwZT0nc3VibWl0JyAke2F0dHJpYnV0ZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3VibWl0SFRNTDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgZWFjaCBpbnB1dCdzIGh0bWwgaW50byBhIGNvbnRhaW5lciBzbyB0aGV5IGNhbiBiZSBmb3JtYXR0ZWQgY29ycmVjdGx5XHJcbiAgICAgKiB1dGlsaXppbmcgdGhlIGl2eGpzLmNzcydzIGdyaWQgc3lzdGVtLlxyXG4gICAgICogQHR5cGV7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIGZvcm1DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzdWJtaXQgPSB7fSwgY2xhc3NlczogY29uZmlnRm9ybUNsYXNzZXMgPSAnJywgaWQgOiBmb3JtSWQsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmICghc2V0dGluZ3MuaGlkZVN1Ym1pdCkge1xyXG4gICAgICAgICAgICBpbnB1dEhUTUwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc3VibWl0LFxyXG4gICAgICAgICAgICAgICAgaHRtbDogdGhpcy5zdWJtaXRCdXR0b25IVE1MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gdGhpcy5zdHlsZS5hZGRXaWR0aENsYXNzZXMoaW5wdXRIVE1MKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgJHtsYWJlbH1cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCIke2Zvcm1JZH0tZm9ybVwiIGNsYXNzPVwiJHtmb3JtQ2xhc3Nlc30gJHtjb25maWdGb3JtQ2xhc3Nlc31cIiBub3ZhbGlkYXRlIG5hbWU9XCIke25hbWV9XCIgJHthZGRpdGlvbmFsQXR0ckhUTUx9PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR7Y29udGVudHN9XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEluZGljYXRlcyBlcnJvcnMgZm9yIGVhY2ggaW5wdXQgYmFzZWQgb24gdGhlIFxyXG4gKiBhdHRyaWJ1dGVzIGNyZWF0ZWQgZnJvbSB0aGUgdmFyaW91cyByZW5kZXJpbmcgbGlicmFyaWVzXHJcbiAqIGlWWGpzIHVzZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJpbmdzIGluIGFsbCB0aGUgcG9zc2libGUgZXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKiB0aGlzIGlucHV0IGNhbiBwcm9kdWNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBlcnJvck1lc3NhZ2VzIC0gbGlzdCBvZiBhbGwgcG9zc2libGUgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlcyB3aXRoIGF0dHJpYnV0ZXMgaW5kaWNhdGluZyB0aGUgbWVzc2FnZSBcclxuICAgICAqIGFuZCB0aGUgY29uZGl0aW9ucyBpbiB3aGljaCB0byBzaG93IHRoZW0uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaXN0IG9mIGFsbCBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjbGFzc2VzIGZvciB0aGUgZXJyb3IgbWVzc2FnZSBkaXYuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfSBcclxuICAgICAqL1xyXG4gICAgZ2V0IG1lc3NhZ2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZXJyb3ItbWVzc2FnZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGNsYXNzZXMgZm9yIHRoZSBjb250YWluZXIgb2YgYWxsIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciBhbGwgZXJyb3IgbWVzc2FnZXMgYW5kIHRoZSBjb250YWluZXIgd2l0aCBcclxuICAgICAqIHRoZW0uIFJlc3VsdHM6XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VzXCI+XHJcbiAgICAgKiAgICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5NRVNTQUdFPC9zcGFuPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Vycm9yTWVzc2FnZXMsIG1lc3NhZ2VDbGFzc2VzLCBjb250YWluZXJDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZUhUTUwgPSBlcnJvck1lc3NhZ2VzLnJlZHVjZSgoZXJyb3JNZXNzYWdlSFRNTCwgZXJyb3JNZXNzYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3JNZXNzYWdlSFRNTH08c3BhbiBjbGFzcz1cIiR7bWVzc2FnZUNsYXNzZXN9XCIgJHtlcnJvck1lc3NhZ2UuYXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZXJyb3JNZXNzYWdlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+YFxyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZUhUTUwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9JyR7Y29udGFpbmVyQ2xhc3Nlc30nPlxyXG4gICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2VIVE1MfVxyXG4gICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7QXR0cmlidXRlVGFnc30gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG51bWJlciBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIG51bWJlcnMgIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTnVtYmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAgKiBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0T2JqIC0gdmFyaW91cyBpbnB1dCBzZXR0aW5ncyB0byByZW5kZXIgdGhpcyBudW1iZXIgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0T2JqLnRhZ3MgLSBpbnB1dCBzcGVjaWZpYyBhdHRyaWJ1dGUgdGFncyBcclxuICAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICAqIGVycm9yIG1lc3NhZ2luZyBhcHBlYXJhbmNlLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yTWVzc2FnZXMgLSBVSSBzcGVjaWZpYyBFcnJvciBtZXNzYWdlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIG51bWJlciBpbnB1dFxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSG9sZHMgYWxsIHZhbGlkYXRpb24gZXJyb3IgY29ycmVjdGluZy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAqIGN1cnJlbnQgVUkgZnJhbWV3b3JrLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBDb252ZXJ0cyBhdHRyaWJ1dGUgZGF0YSBpbnRvIGF0dHJpYnV0ZSBIVE1MIGZvciBcclxuICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBudW1iZXIgaW5wdXRzIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGEgbnVtYmVyIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIE51bWJlci51aUNsYXNzZXMgPSAndWktY2xhc3Nlcy0xJztcclxuICAgICAqIGlucHV0LmF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgKiAgICAgXCJzdGVwXCIgOiBcIjAuMVwiXHJcbiAgICAgKiB9XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBzdGVwPVwiMC4xXCIgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJudW1iZXJcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBuYW1lID0gJycsIGlkID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cIm51bWJlclwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIGRlZmF1bHREaXNwbGF5ID0gJycsIHNldHRpbmdzID0ge30sIHRhZ3MgPSAnJywgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3RhZ3MsIGlucHV0LCBkZWZhdWx0RGlzcGxheSwgZXJyb3JzLCBzZXR0aW5ncywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2lkLCBuYW1lLCBvcHRpb25zLCBsYWJlbCA9ICcnLCBsYWJlbEhUTUx9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25UYWcgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhbiBvcHRpb24uLi48L29wdGlvbj5gO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JBdHRyaWJ1dGVzLnJlcXVpcmVkIHx8IChkZWZhdWx0RGlzcGxheSAmJiBkZWZhdWx0RGlzcGxheS5sZW5ndGggPj0gMCkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZyA9IGRlZmF1bHREaXNwbGF5ID9cclxuICAgICAgICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtkZWZhdWx0RGlzcGxheX08L29wdGlvbj5gIDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25UYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5yZWR1Y2UoKG9wdGlvbkhUTUwsIG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uSFRNTH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLnZhbHVlfVwiPiR7b3B0aW9uLmRpc3BsYXl9PC9vcHRpb24+YFxyXG4gICAgICAgIH0sICcnKVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiR7bGFiZWx9PC9sYWJlbD4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgICAgICAgJHtkZWZhdWx0T3B0aW9uVGFnfVxyXG4gICAgICAgICAgICAgICAgICAke29wdGlvbnNIVE1MfVxyXG4gICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgJHtlcnJvckhUTUx9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpb0lucHV0T2JqLCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7IGlucHV0ID0ge30sIHJhZGlvcyA9IFtdLCBlcnJvcnMgPSB7fSwgc2V0dGluZ3MgPSB7fSB9ID0gcmFkaW9JbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5yYWRpb3MgPSByYWRpb3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgdWlSYWRpb0dyb3VwKHJhZGlvc0hUTUwpIHtcclxuICAgICAgICByZXR1cm4gcmFkaW9zSFRNTDtcclxuICAgIH07XHJcblxyXG4gICAgdWlSYWRpb0J1dHRvbkNvbnRhaW5lcihyYWRpb0hUTUwsIHVpQ2xhc3NlcywgdmFsdWUgPSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHRoaXMuaW5wdXQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IGAke2lkfSR7dmFsdWUubGVuZ3RoID4gMCA/ICctJyArIHZhbHVlIDogJyd9YDsgXHJcblxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCIke2N1cnJlbnRJZH1cIiBjbGFzcz1cIiR7dWlDbGFzc2VzfVwiPlxyXG4gICAgICAgICR7cmFkaW9IVE1MfVxyXG4gICAgICAgIDwvbGFiZWw+YDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCB7IGlkIH0gPSB0aGlzLmlucHV0O1xyXG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtpZH0ke3ZhbHVlLmxlbmd0aCA+IDAgPyAnLScgKyB2YWx1ZSA6ICcnfWA7XHJcblxyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCIke2N1cnJlbnRJZH1cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgJHtsYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHsgZXJyb3JzLCByYWRpb3MsIHNldHRpbmdzLCBpbnB1dCwgdWlDbGFzc2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IG1lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzLCB0YWdzOiBlcnJvclRhZ3MgPSBcIlwiIH0gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IGxhYmVsOiBpbnB1dExhYmVsLCBsYWJlbEhUTUw6IGlucHV0TGFibGVIVE1MIH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBzaG93TGFiZWwgPSB0cnVlIH0gPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgaWYgKGlucHV0TGFibGVIVE1MKSBpbnB1dExhYmVsID0gaW5wdXRMYWJsZUhUTUw7XHJcblxyXG4gICAgICAgIGxldCByYWRpb3NIVE1MID0gcmFkaW9zLnJlZHVjZSgoaHRtbCwgcmFkaW8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IGxhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gJycsIHZhbHVlIH0gPSByYWRpbztcclxuXHJcbiAgICAgICAgICAgIGF0dHJIVE1MID0gYCR7YXR0ckhUTUx9ICR7ZXJyb3JUYWdzfWA7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmFkaW9IVE1MID0gc2VsZi5yZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsLCBpbnB1dC5yYWRpb0J1dHRvbnNbaW5kZXhdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtodG1sfVxyXG4gICAgICAgICAgICAke3NlbGYudWlSYWRpb0J1dHRvbkNvbnRhaW5lcihyYWRpb0hUTUwsIGAke3VpQ2xhc3Nlc30gJHtjbGFzc2VzfWAsIGlucHV0LnJhZGlvQnV0dG9uc1tpbmRleF0udmFsdWUpfWA7XHJcbiAgICAgICAgfSwgaW5wdXRMYWJlbCk7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgYWxsUmFkaW9CdXR0b25zSFRNTCA9IGBcclxuICAgICAgICAgICAgICR7cmFkaW9zSFRNTH1cclxuICAgICAgICAgICAgICR7ZXJyb3JIVE1MfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVpUmFkaW9Hcm91cChhbGxSYWRpb0J1dHRvbnNIVE1MKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGZvcm1TZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtU2VjdGlvbiA9IGZvcm1TZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2Zvcm1TZWN0aW9uLCBkYXRhLCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcywgZGVmYXVsdEhlYWRlckNsYXNzZXMsIGRlZmF1bHRTZWN0aW9uQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge319ID0gZGF0YTtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IGhlYWRlckNsYXNzZXMgPSAnJywgaHRtbDogaGVhZGVySFRNTCA9IGBgfSA9IGhlYWRlcjtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHNlY3Rpb25DbGFzc2VzID0gJycgfSA9IHNlY3Rpb247XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWw6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiJHtzZWN0aW9uQ2xhc3Nlc30gJHtkZWZhdWx0U2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cIiR7aGVhZGVyQ2xhc3Nlc30gJHtkZWZhdWx0SGVhZGVyQ2xhc3Nlc31cIj4ke2hlYWRlckhUTUx9PC9oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAke2Zvcm1TZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cIiR7Zm9vdGVyQ2xhc3Nlc30gJHtkZWZhdWx0Rm9vdGVyQ2xhc3Nlc31cIj4ke2Zvb3RlckhUTUx9PC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gJy4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzJztcblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgbGlua1NlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5saW5rU2VjdGlvbiA9IGxpbmtTZWN0aW9uXG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRIZWFkZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRGb290ZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgaHRtbCgpIHtcbiAgICAgICAgbGV0IHtkYXRhLCBsaW5rU2VjdGlvbiwgZGVmYXVsdEZvb3RlckNsYXNzZXMsIGRlZmF1bHRIZWFkZXJDbGFzc2VzLCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMsIGRlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3Nlc30gPSB0aGlzO1xuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9LCBsaW5rQ29udGFpbmVyID0ge319ID0gZGF0YTtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgYH0gPSBoZWFkZXI7XG4gICAgICAgIGxldCB7Y2xhc3Nlczogc2VjdGlvbkNsYXNzZXMgPSAnJ30gPSBzZWN0aW9uO1xuICAgICAgICBsZXQge2NsYXNzZXM6IGZvb3RlckNsYXNzZXMgPSAnJywgaHRtbDogZm9vdGVySFRNTCA9ICcnfSA9IGZvb3RlcjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBsaW5rQ29udGFpbmVyQ2xhc3NlcyA9ICcnLCBhdHRyaWJ1dGVzOiBsaW5rQ29udGFpbmVyQXR0cmlidXRlcyA9IHt9fSA9IGxpbmtDb250YWluZXI7XG4gICAgICAgIGxldCBsaW5rQ29udGFpbmVyQXR0cmlidXRlSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGxpbmtDb250YWluZXJBdHRyaWJ1dGVzLCBPYmplY3Qua2V5cyhsaW5rQ29udGFpbmVyQXR0cmlidXRlcykpLmh0bWw7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiJHtzZWN0aW9uQ2xhc3Nlc30gJHtkZWZhdWx0U2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XG4gICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7ZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPScke2RlZmF1bHRMaW5rQ29udGFpbmVyQ2xhc3Nlc30gJHtsaW5rQ29udGFpbmVyQ2xhc3Nlc30nICR7bGlua0NvbnRhaW5lckF0dHJpYnV0ZUhUTUx9PlxuICAgICAgICAgICAgICAgICAgICAke2xpbmtTZWN0aW9ufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9ICR7ZGVmYXVsdEZvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxuICAgICAgICAgICAgPC9zZWN0aW9uPmA7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBTdHlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgZ2V0V2lkdGgod2lkdGgpIHtcclxuICAgICAgICBpZiAod2lkdGggPT09ICcxJykgcmV0dXJuICdpdnhqcy1ncmlkLTEtMSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGdyaWRTdHJpbmcgPSB3aWR0aC5yZXBsYWNlKCcvJywgJy0nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBpdnhqcy1ncmlkLSR7Z3JpZFN0cmluZ31gO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnaW5wdXQtY29udGFpbmVyJztcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWR0aENsYXNzZXMoaW5wdXRzSFRNTCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQge2NvbnRhaW5lckNsYXNzZXMgPSAnJ30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGlucHV0c0hUTUwucmVkdWNlKChjdXJyZW50SFRNTCwgaW5wdXRIVE1MKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7aHRtbCwgc2V0dGluZ3MgPSB7fX0gPSBpbnB1dEhUTUw7XHJcbiAgICAgICAgICAgIGxldCB7d2lkdGggPSAnMScsIGNvbnRhaW5lcj17fX0gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IHtjbGFzc2VzPScnfSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke2NvbnRhaW5lckNsYXNzZXN9YFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoaXNXaWR0aCA9IHNlbGYuZ2V0V2lkdGgod2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcIml2eGpzLWdyaWQtMS0xXCIsIGAke3RoaXNXaWR0aH0gJHtjbGFzc2VzfWApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRIVE1MfSAke2h0bWx9YDtcclxuICAgICAgICB9LCAnJylcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidGV4dFwiICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGFiZWwgPSBzaG93TGFiZWwgPyBsYWJlbCA6ICcnO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRIVE1MID0gYCBcclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+ICR7bGFiZWx9IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICR7dWlBdHRyaWJ1dGVzfSAgICR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gICAke2Vycm9yVGFnc30gJHt0YWdzfT5cclxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgJHtlcnJvckhUTUx9XHJcbiAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUYWdzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hdHRyaWJ1dGVzLmpzXCI7XHJcblxyXG5sZXQgc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sc2V0dGluZ3MgPSB7fSx0YWdzID0ge30sZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpe1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OmlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7bWVzc2FnZXMgOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXMgOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFncyA6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9ICR7dWlDbGFzc2VzfVwiICR7dWlBdHRyaWJ1dGVzfSAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIgIHR5cGU9XCJ1cmxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb250cm9sc30gZnJvbSAnLi4vLi4vdmlkZW8vY29udHJvbHMvaW5kZXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9scyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNvbnRhaW5lci5odG1sIGluc3RhbmNlb2YgRnVuY3Rpb24pe1xyXG4gICAgICAgICAgICBjb250YWluZXIuaHRtbCh0aGlzLmh0bWwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLmh0bWw7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcyxcclxuICAgICAgICAgICAgdG90YWxUaW1lSW5mb0NsYXNzZXMsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lSW5mb0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHNjcnViQmFyQ2xhc3NlcyxcclxuICAgICAgICAgICAgbXV0ZUNvbnRyb2xzQ2xhc3NlcyxcclxuICAgICAgICAgICAgdm9sdW1lQmFyQ2xhc3NlcyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMucGxheVBhdXNlQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIik7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy10b3RhbC10aW1lXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJbmZvID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtY3VycmVudC10aW1lXCIpO1xyXG4gICAgICAgIHRoaXMuc2NydWJCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiKTtcclxuICAgICAgICB0aGlzLm11dGVDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiKTtcclxuICAgICAgICB0aGlzLnZvbHVtZUJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtdm9sdW1lLWJhclwiKTtcclxuICAgICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlQYXVzZUNvbnRyb2xzQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAncGxheS1wYXVzZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB0b3RhbFRpbWVJbmZvQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZHVyYXRpb24nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY3VycmVudFRpbWVJbmZvQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnY3VycmVudC10aW1lJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHNjcnViQmFyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnc2NydWItYmFyJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG11dGVDb250cm9sc0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ211dGUnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICd2b2x1bWUtYmFyJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXBsYXknO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGF1c2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS1wYXVzZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1bm11dGVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS12b2x1bWUtdXAnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2ZhIGZhLXZvbHVtZS1vZmYnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIGB0aW1lLWxhcHNlZGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdjdXJyZW50LXZvbHVtZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5UGF1c2VCdXR0b25IVE1MKCl7XHJcbiAgICAgICAgbGV0IHtwbGF5Q2xhc3NlcyA6IHBsYXl9ID0gdGhpcztcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzQ2xhc3NlcyA6IHBsYXlQYXVzZUNvbnRyb2xzfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiIGNsYXNzPVwiJHtwbGF5UGF1c2VDb250cm9sc31cIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9JyR7cGxheX0nPjwvaT5cclxuICAgICAgICA8L2J1dHRvbj5gXHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIGdldCBzY3J1YkJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiIGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMuc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB0aW1lc3RhbXBIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLWN1cnJlbnQtdGltZVwiIGNsYXNzPVwiJHt0aGlzLmN1cnJlbnRUaW1lSW5mb0NsYXNzZXN9XCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlkPVwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiIGNsYXNzPVwiJHt0aGlzLnRvdGFsVGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbXV0ZUJ1dHRvbkhUTUwoKXtcclxuICAgICAgICBsZXQge3VubXV0ZUNsYXNzZXMgOiB1bm11dGUsIG11dGVDb250cm9sc0NsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiIGNsYXNzPVwiJHttdXRlQ29udHJvbHNDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIke3VubXV0ZX1cIj48L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZvbHVtZUJhckhUTUwoKXtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2ICBpZD1cInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBwbGF5UGF1c2VCdXR0b25IVE1MLFxyXG4gICAgICAgICAgICBzY3J1YkJhckhUTUwsXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcEhUTUwsXHJcbiAgICAgICAgICAgIG11dGVCdXR0b25IVE1MLFxyXG4gICAgICAgICAgICB2b2x1bWVCYXJIVE1MXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAke3BsYXlQYXVzZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgICAgJHtzY3J1YkJhckhUTUx9XHJcbiAgICAgICAgICAgJHt0aW1lc3RhbXBIVE1MfVxyXG4gICAgICAgICAgICR7bXV0ZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgICAgJHt2b2x1bWVCYXJIVE1MfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbn0iLCIvKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IHdpdGggYXR0cmlidXRlcyBhbmQga2V5cyBpbnRvIEhUTUxcclxuICogdGhhdCBpbnB1dHMgY2FuIGJlIHVzZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlVGFncyB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUHVsbHMgYWxsIHRoZSBhdHRyaWJ1dGUgc2V0dGluZ3MgYW5kIHRoZSBhdHRyaWJ1dGVzIFxyXG4gICAgICogdG8gYmUgcmVuZGVyZWQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlRGF0YSAtIHNldHRpbmdzIGZvciBhbGwgdGhlIGF0dHJpYnV0ZXMuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhdHRyaWJ1dGVLZXlzIC0gYXR0cmlidXRlIG5hbWVzIHRvIGJlIHNldC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXR0cmlidXRlRGF0YSA9IHt9LCBhdHRyaWJ1dGVLZXlzID0gW10pe1xyXG4gICAgICAgXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIEFsbCBhdHRyaWJ1dGVzIHRvIGJlIG1hZGUuXHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZURhdGEgPSBhdHRyaWJ1dGVEYXRhO1xyXG4gICAgICAgXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIEF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgKi9cclxuICAgICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IGF0dHJpYnV0ZUtleXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGF0dHJpYnV0ZXMgYmFzZWQgb24gdGhlIGtleXMgYW5kIGF0dHJpYnV0ZSBkYXRhLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGF0dHJpYnV0ZURhdGEgPSB7IHJlcXVpcmVkID0gXCJ0cnVlXCJ9O1xyXG4gICAgICogYXR0cmlidXRlS2V5cyA9IFtcInJlcXVpcmVkXCJdO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBCZWNvbWVzOiBcclxuICAgICAqIGh0bWwgPSAncmVxdWlyZWQgPSBcInRydWVcIidcclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBsZXQge2F0dHJpYnV0ZUtleXMsIGF0dHJpYnV0ZURhdGF9ID0gdGhpcztcclxuICAgICAgICBsZXQgYXR0cmlidXRlSFRNTCA9IGF0dHJpYnV0ZUtleXMucmVkdWNlKCAoY3VycmVudEF0dHJpYnV0ZUhUTUwsIGN1cnJlbnRLZXkpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYoYXR0cmlidXRlRGF0YVtjdXJyZW50S2V5XSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlVGFnSFRNTCA9IGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0gPT09ICd0YWctb25seScgPyBcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgOlxyXG4gICAgICAgICAgICAgICAgYCR7Y3VycmVudEtleX09XCIke2F0dHJpYnV0ZURhdGFbY3VycmVudEtleV19XCJgXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2N1cnJlbnRBdHRyaWJ1dGVIVE1MfSAke2F0dHJpYnV0ZVRhZ0hUTUx9IGA7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXR0cmlidXRlSFRNTDtcclxuICAgICAgICB9LCAnJyk7ICAgXHJcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZUhUTUw7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IFZpZGVvU2V0dGluZ3MgZnJvbSAnLi4vc2V0dGluZ3MuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29udHJ1Y3RvcigpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnR0aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBBVVNFKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihjYikge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMub25jZSh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFVF9EVVJBVElPTiwgKGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNiKGR1cmF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5HRVRfRFVSQVRJT04pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZvbHVtZSh2b2x1bWUpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfVk9MVU1FLCB2b2x1bWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlZWsoc2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMuaVZYanNCdXMuZW1pdCh0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlNFRUssIHNlY29uZHMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IENvbnRyb2xFdmVudHMgZnJvbSAnLi9ldmVudHMuanMnO1xyXG5pbXBvcnQgVmlkZW9FdmVudE5hbWVzIGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvdmlkZW8uZXZlbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbHMgZXh0ZW5kcyBDb250cm9sRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gMC41O1xyXG4gICAgICAgIHRoaXMuY29udHJvbEV2ZW50TmFtZXMgPSBuZXcgVmlkZW9FdmVudE5hbWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZShpVlhqc0J1cykge1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuVElNRV9VUERBVEUsIHRoaXMudXBkYXRlVGltZSk7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZSU5HLCB0aGlzLndoaWxlUGxheWluZyk7XHJcbiAgICAgICAgaVZYanNCdXMucmVtb3ZlTGlzdGVuZXIodGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgdGhpcy5jYW5QbGF5Q2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVBvc2l0aW9uID0geyB4OiBlbGVtZW50Lm9mZnNldExlZnQsIHk6IGVsZW1lbnQub2Zmc2V0VG9wIH07XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcFBvc2l0aW9uID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQub2Zmc2V0UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueCArPSB0ZW1wUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgcmVsYXRpdmVQb3NpdGlvbi55ICs9IHRlbXBQb3NpdGlvbi55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgYWRqdXN0Vm9sdW1lKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHt2b2x1bWVCYXIsIG11dGVDb250cm9scywgY3VycmVudFZvbHVtZSwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXMsIG11dGVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtvZmZzZXRXaWR0aDogd2lkdGggfSA9IHZvbHVtZUJhcjtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbih2b2x1bWVCYXIpO1xyXG4gICAgICAgIGxldCB7eDogYWJzb2x1dGVYfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCB2b2x1bWVMZXZlbCA9ICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgbXV0ZUNvbnRyb2xzQ2xhc3NlcyA9IFttdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IG11dGVJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKG11dGVDb250cm9scy5jaGlsZHJlbiwgbXV0ZUNvbnRyb2xzQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt2b2x1bWVMZXZlbCAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gdm9sdW1lTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lTGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjcnViKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZUluZm8sIHNjcnViQmFyLCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge29mZnNldFdpZHRoOiB3aWR0aH0gPSBzY3J1YkJhcjtcclxuICAgICAgICBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihzY3J1YkJhcik7XHJcbiAgICAgICAgbGV0IHt4OiBhYnNvbHV0ZVh9ID0gYWJzb2x1dGVQb3NpdGlvbjtcclxuICAgICAgICBsZXQgeyBwYWdlWDogeCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRydWVYID0gKHggLSAoYWJzb2x1dGVYKSk7XHJcbiAgICAgICAgbGV0IHNjcnViVG9UaW1lID0gdGhpcy5kdXJhdGlvbiAqICh0cnVlWCAvIHdpZHRoKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzY3J1YlRvVGltZSk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lU3RhbXAgPSB0aGlzLmNyZWF0ZVRpbWVTdGFtcChjdXJyZW50VGltZU9iamVjdCk7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCB0aW1lbGFwc2VkID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHNjcnViQmFyLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWVJbmZvLmlubmVySFRNTCA9IGAke2N1cnJlbnRUaW1lU3RhbXB9YDtcclxuICAgICAgICB0aW1lbGFwc2VkLnN0eWxlLndpZHRoID0gYCR7KHRydWVYIC8gd2lkdGgpICogMTAwfSVgO1xyXG5cclxuICAgICAgICB0aGlzLnNlZWsoc2NydWJUb1RpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXlQYXVzZShldmVudCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXTtcclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoIChwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHBsYXlDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBwYXVzZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBsYXlDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRNdXRlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHttdXRlQ29udHJvbHMsIG11dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCB2b2x1bWVCYXIsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIG11dGVDb250cm9sc0NsYXNzZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50Vm9sdW1lU3BhbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3Nlcyh2b2x1bWVCYXIuY2hpbGRyZW4sIFt2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc10pO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG11dGVJY29uLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHVubXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSBtdXRlQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYDAlYDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBtdXRlQ2xhc3NlczpcclxuICAgICAgICAgICAgICAgIG11dGVJY29uLmNsYXNzTmFtZSA9IHVubXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3RoaXMuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeVRvUGxheShwbGF5ZXIsIHN0YXRlRGF0YSkge1xyXG4gICAgICAgIGxldCB7dm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuICAgICAgICBcclxuICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAke3NlbGYuY3VycmVudFZvbHVtZSAqIDEwMH0lYDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldFZvbHVtZShzZWxmLmN1cnJlbnRWb2x1bWUpO1xyXG4gICAgICAgIHRoaXMuZ2V0RHVyYXRpb24oKGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7dG90YWxUaW1lSW5mbywgY3VycmVudFRpbWVJbmZvLCBzY3J1YkJhcn0gPSBzZWxmO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25UaW1lT2JqZWN0ID0gc2VsZi5jb252ZXJ0U2Vjb25kc1RvUGFydHMoZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25UaW1lU3RhbXAgPSBzZWxmLmNyZWF0ZVRpbWVTdGFtcChkdXJhdGlvblRpbWVPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsVGltZUluZm8pIHRvdGFsVGltZUluZm8uaW5uZXJIVE1MID0gYC8ke2R1cmF0aW9uVGltZVN0YW1wfWA7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZUluZm8pIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgMDA6MDBgO1xyXG4gICAgICAgICAgICBpZiAoc2NydWJCYXIpIHNjcnViQmFyLmNoaWxkcmVuWzBdLnN0eWxlLndpZHRoID0gYDAlYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRpbWVVcGRhdGUocGxheWVyKSB7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZUluZm8sIHNjcnViQmFyLCBzY3J1YkJhclRpbWVMYXBzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2N1cnJlbnRUaW1lOiBzZWNvbmRzfSA9IHBsYXllcjtcclxuXHJcbiAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgPiB0aGlzLmR1cmF0aW9uID8gMCA6IHNlY29uZHM7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGxldCBjdXJyZW50VGltZU9iamVjdCA9IHRoaXMuY29udmVydFNlY29uZHNUb1BhcnRzKHNlY29uZHMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gdGhpcy5jcmVhdGVUaW1lU3RhbXAoY3VycmVudFRpbWVPYmplY3QpO1xyXG4gICAgICAgIGxldCB0aW1lTGFwc2VkID0gc2Vjb25kcyAvIHRoaXMuZHVyYXRpb247XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50VGltZUluZm8pIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGltZVN0YW1wfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoc2NydWJCYXIpIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVsYXBzZWRFbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHNjcnViQmFyLmNoaWxkcmVuLCBzZWFyY2hDbGFzc2VzKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aW1lbGFwc2VkRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3RpbWVMYXBzZWQgKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGxheWluZygpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgcGxheVBhdXNlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhcclxuICAgICAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIHNlYXJjaENsYXNzZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwbGF5UGF1c2VJY29uLmNsYXNzTmFtZSA9IHBhdXNlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QYXVzZWQoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoaVZYanNCdXMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtzY3J1YkJhciwgdm9sdW1lQmFyLCBwbGF5UGF1c2VDb250cm9scywgbXV0ZUNvbnRyb2xzfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuaVZYanNCdXMgPSBpVlhqc0J1cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlRJTUVfVVBEQVRFLCB1cGRhdGVUaW1lKTtcclxuICAgICAgICB0aGlzLndoaWxlUGF1c2VkID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5QQVVTRUQsIHdoaWxlUGF1c2VkKTtcclxuICAgICAgICB0aGlzLndoaWxlUGxheWluZyA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWUlORywgd2hpbGVQbGF5aW5nKTtcclxuICAgICAgICB0aGlzLmNhblBsYXlDYWxsYmFjayA9ICBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLkNBTl9QTEFZLCBjYW5QbGF5Q2FsbEJhY2spO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IHRoaXMudXBkYXRlVGltZSA/IHRoaXMudXBkYXRlVGltZSA6IHVwZGF0ZVRpbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdm9sdW1lQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmFkanVzdFZvbHVtZShldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NydWJCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zY3J1YihldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheVBhdXNlQ29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldFBsYXlQYXVzZShldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbXV0ZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0TXV0ZShldmVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY2FuUGxheUNhbGxCYWNrKHBsYXllciwgX3N0YXRlRGF0YSkge1xyXG4gICAgICAgICAgICBzZWxmLm9uUmVhZHlUb1BsYXkocGxheWVyLCBfc3RhdGVEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKHBsYXllcikge1xyXG4gICAgICAgICAgICBzZWxmLm9uVGltZVVwZGF0ZShwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hpbGVQYXVzZWQocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25QYXVzZWQocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdoaWxlUGxheWluZygpIHtcclxuICAgICAgICAgICAgc2VsZi5vblBsYXlpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudEJ5Q2xhc3NlcyhlbGVtZW50cywgY2xhc3Nlcykge1xyXG4gICAgICAgIGxldCBlbGVtZW50QXJyYXkgPSBlbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5ID9cclxuICAgICAgICAgICAgZWxlbWVudHMgOlxyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGVsZW1lbnRzKTtcclxuICAgICAgICBsZXQgdGhpc0VsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpc0VsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXNFbGVtZW50ID0gZWxlbWVudEFycmF5LmZpbmQoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpID49IDA7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUaW1lU3RhbXAodGltZU9iamVjdCkge1xyXG4gICAgICAgIGxldCB7aG91cnMsIHJlbWFpbmluZ01pbnV0ZXM6IG1pbnV0ZXMsIHJlbWFpbmluZ1NlY29uZHM6IHNlY29uZHN9ID0gdGltZU9iamVjdDtcclxuICAgICAgICBsZXQgaG91clN0cmluZyA9ICcnO1xyXG4gICAgICAgIGxldCBtaW51dGVTdHJpbmcgPSBtaW51dGVzIDwgMTAgP1xyXG4gICAgICAgICAgICBgMCR7bWludXRlc306YCA6XHJcbiAgICAgICAgICAgIGAke21pbnV0ZXN9OmA7XHJcbiAgICAgICAgbGV0IHNlY29uZFN0cmluZyA9IHNlY29uZHMgPCAxMCA/XHJcbiAgICAgICAgICAgIGAwJHtzZWNvbmRzfWAgOlxyXG4gICAgICAgICAgICBgJHtzZWNvbmRzfWA7XHJcblxyXG4gICAgICAgIGlmIChob3VycyA+IDApIHtcclxuICAgICAgICAgICAgaG91clN0cmluZyA9IGhvdXJzIDwgMTAgP1xyXG4gICAgICAgICAgICAgICAgYDAke2hvdXJzfTpgIDpcclxuICAgICAgICAgICAgICAgIGAke2hvdXJzfTpgO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtob3VyU3RyaW5nfSR7bWludXRlU3RyaW5nfSR7c2Vjb25kU3RyaW5nfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydFNlY29uZHNUb1BhcnRzKHNlY29uZHMpIHtcclxuICAgICAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBsZXQgdGltZUluZm9ybWF0aW9uID0ge1xyXG4gICAgICAgICAgICBtaW51dGVzOiBtaW51dGVzLFxyXG4gICAgICAgICAgICBob3VyczogTWF0aC5mbG9vcihtaW51dGVzIC8gNjApLFxyXG4gICAgICAgICAgICByZW1haW5pbmdTZWNvbmRzOiBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCksXHJcbiAgICAgICAgICAgIHJlbWFpbmluZ01pbnV0ZXM6IE1hdGguZmxvb3IobWludXRlcyAlIDYwKSxcclxuICAgICAgICAgICAgc2Vjb25kczogc2Vjb25kc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWVJbmZvcm1hdGlvbjtcclxuICAgIH1cclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyQ29udHJvbEV2ZW50cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcInBsYXlcIiA6ICdpVlg6dmlkZW86cGxheScsXHJcbiAgICAgICAgICAgIFwicGF1c2VcIiA6ICdpVlg6dmlkZW86cGF1c2UnLFxyXG4gICAgICAgICAgICBcInNlZWtcIiA6ICdpVlg6dmlkZW86c2Vla2VkJyxcclxuICAgICAgICAgICAgXCJwbGF5aW5nXCIgOiBcImlWWDp2aWRlbzpwbGF5aW5nXCIsXHJcbiAgICAgICAgICAgIFwiZW5kZWRcIiA6IFwiaVZYOnZpZGVvOmVuZGVkXCIsXHJcbiAgICAgICAgICAgIFwicGF1c2VkXCIgOiBcImlWWDp2aWRlbzpwYXVzZWRcIixcclxuICAgICAgICAgICAgXCJzZXRWb2x1bWVcIiA6ICdpVlg6dmlkZW86c2V0Vm9sdW1lJyxcclxuICAgICAgICAgICAgXCJkdXJhdGlvblwiIDogXCJpVlg6dmlkZW86cmVxdWVzdER1cmF0aW9uXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RHVyYXRpb25cIiA6IFwiaVZYOnZpZGVvOmdldER1cmF0aW9uXCIsXHJcbiAgICAgICAgICAgIFwiY2FuUGxheVwiIDogXCJpVlg6dmlkZW86Y2FucGxheVwiLFxyXG4gICAgICAgICAgICBcInRpbWVVcGRhdGVcIiA6IFwiaVZYOnZpZGVvOnRpbWV1cGRhdGVcIixcclxuICAgICAgICAgICAgXCJkaXNwb3NlXCIgOiBcImlWWDp2aWRlbzpkaXNwb3NlXCIsXHJcbiAgICAgICAgICAgIFwidm9sdW1lXCIgOiAnaVZYOnZpZGVvOnNldFZvbHVtZScgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihsb2cpIHtcblx0XHR0aGlzLmxvZyA9IGxvZ1xuXHR9XG5cblx0YXNzZXJ0KHRlc3QsIG5hbWUsIG1lc3NhZ2UpIHtcblx0XHRsZXQge2xvZ30gPSB0aGlzO1xuXHRcdGxldCB7c2hvdzogZGVidWd9ID0gbG9nO1xuXG5cdFx0aWYgKCF0ZXN0KSB7XG5cdFx0XHRsZXQgZXJyb3JPYmogPSB7IFxuXHRcdFx0XHRtZXNzYWdlIDogYCR7bmFtZX0gaXMgaW52YWxpZDogJHttZXNzYWdlfS5gXG5cdFx0XHR9O1xuXG5cdFx0XHRpZihkZWJ1Zyl7XG5cdFx0XHRcdHRoaXMubG9nLmVycm9yKGVycm9yT2JqLCBcIkFTU0VSVFwiKTtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yT2JqLm1lc3NhZ2UpO1xuXHRcdFx0fSBcblx0XHR9XG5cblx0XHRyZXR1cm4gdGVzdDtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBUeXBlVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJylcclxuICAgIH1cclxuXHJcbiAgICBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3RyaW5nKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqICYmIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTnVtYmVyKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai52YWx1ZU9mKCkgPT09ICdib29sZWFuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eShvYmopIHtcclxuICAgICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIGxldCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmopO1xyXG4gICAgICAgIGxldCBpc1N0cmluZyA9IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG4gICAgICAgIGxldCBjaGVja0xlbmd0aCA9IGlzQXJyYXkgfHwgaXNTdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0xlbmd0aCAmJiBvYmoubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzTmFOKG9iaikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0eXBlVmFsaWRhdG9yID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQYXJzZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB5b3UgdG8gbWFwIGFuIG9iamVjdCBieSB0aGUga2V5cyBvZiBhIGdpdmVuIG9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBvYmplY3QgdG8gbWFwO1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBydW4gYnkgZWFjaCB2YWx1ZSBhbmQga2V5ICBcclxuICAgICAqL1xyXG4gICAgbWFwS2V5cyhvYmplY3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QgfHwgb2JqZWN0ID09PSB7fSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSBrZXlzLnJlZHVjZSgoY3VycmVudEFycmF5LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gW2tleSwgb2JqZWN0W2tleV1dO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcbiAgICAgICAgbGV0IG1hcHBlZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICghcmVkdWNlTWFwKSByZXR1cm4gW107XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBtYXBwZWRBcnJheS5wdXNoKGNhbGxiYWNrKHZhbCwga2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWRBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShiYXNlLCBtZXJnZWQsIGlnbm9yZSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRLZXlzID0gT2JqZWN0LmtleXMobWVyZ2VkKTtcclxuICAgICAgICBsZXQgdW5pb25lZE9iamVjdCA9IG5ldyBPYmplY3QoYmFzZSk7XHJcblxyXG4gICAgICAgIG1lcmdlZEtleXMuZm9yRWFjaCgobWVyZ2VkS2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKG1lcmdlZEtleSkgPj0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB1bmlvbmVkT2JqZWN0W21lcmdlZEtleV0gPSBtZXJnZWRbbWVyZ2VkS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaW9uZWRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkdWNlKG9iamVjdCwgY2FsbGJhY2ssIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuICAgICAgICAgICAgY3VycmVudEFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEFycmF5O1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgICAgICBsZXQgcmVkdWNlTWFwID0gbmV3IE1hcChlbnRyaWVzKTtcclxuXHJcbiAgICAgICAgcmVkdWNlTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGNhbGxiYWNrKGRlZmF1bHRWYWx1ZSwgdmFsLCBrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhIGNvbGxlY3Rpb24gdG8gZmluZCBpZiBhbnkgb2YgdGhlIHZhbHVlcyBcclxuICAgICAqIHdpdGggdGhlIGtleXMgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIGFueUVtcHR5KGNvbGxlY3Rpb24sIGtleXMpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShlbGVtZW50W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudHMuZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhjb2xsZWN0aW9uLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVBcnJheShjb2xsZWN0aW9uLCBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2FtZU9iamVjdChjb2xsZWN0aW9uLCBlbGVtZW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uaW5kZXhPZihlbGVtZW50KSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja0VsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbGVtZW50S2V5cyA9IE9iamVjdC5rZXlzKGNoZWNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRLZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IGNoZWNrRWxlbWVudFtrZXldID09PSBlbGVtZW50W2tleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBpdEhhcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGl0SGFzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoY2hlY2tFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnQuZm9yRWFjaCgodGVzdEVsZW1lbnQsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0SGFzID0gdGVzdEVsZW1lbnQgPT09IGFycmF5RWxlbWVudFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBvID0gb2JqZWN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBhW2ldO1xyXG4gICAgICAgICAgICBpZiAobiBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9bbl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIG8gPSBvW25dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9bYVthLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBhdGgocGF0aCwgb2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gb2JqZWN0O1xyXG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgcGF0aFBhcnRzLmZvckVhY2goKHBhdGhQYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZVZhbGlkYXRvci5pc0VtcHR5KHBhdGhQYXJ0KSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IG9sZERhdGFbcGF0aFBhcnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShjdXJyZW50RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBjdXJyZW50RGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBzZWUgaWYgdGhlIHZhbHVlcyBcclxuICAgICAqIGF0IHRoZSBrZXlzIGlzIHVuaXF1ZSBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kaWNhdGluZyBcclxuICAgICAqIGlmIHRoZXkgYXJlIHVuaXF1ZSBhbmQgYW55IGVycm9ycyB0aGF0IGRvbid0IG1hdGNoIGZvciBcclxuICAgICAqIGNvcnJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGlzVW5pcXVlKGNvbGxlY3Rpb24gPSBbXSwga2V5cyA9IFtdKSB7XHJcbiAgICAgICAgbGV0IGhhc1VuaXF1ZSA9IHtcclxuICAgICAgICAgICAgaXNVbmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhbGxVbmlxdWVWYWx1ZXMgPSB7fTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFVuaXF1ZVZhbHVlc1trZXldID0gW107XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RVbmlxdWUgPSBzZWxmLmhhcyhhbGxVbmlxdWVWYWx1ZXNba2V5XSwgZWxlbWVudFtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90VW5pcXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5pc1VuaXF1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XS5wdXNoKGVsZW1lbnRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNVbmlxdWU7XHJcbiAgICB9XHJcbn07Il19
