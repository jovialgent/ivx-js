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
        value: function renderRadioHTML(attrHTML, label) {
            var _input = this.input,
                input = _input === undefined ? {} : _input;
            var id = input.id;

            return ' \n        <label for="' + id + '">\n            <input type="radio" ' + attrHTML + '>\n            ' + label + '\n        </label>\n        ';
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
                headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
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
            return " \n        <label class=\"" + uiClasses + "\">\n        " + radioHTML + "\n        </label>";
        }
    }, {
        key: "renderRadioHTML",
        value: function renderRadioHTML(attrHTML, label) {
            return " \n            <input type=\"radio\" " + attrHTML + ">\n            " + label;
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

            var radiosHTML = radios.reduce(function (html, radio) {
                var label = radio.label,
                    _radio$attrHTML = radio.attrHTML,
                    attrHTML = _radio$attrHTML === undefined ? '' : _radio$attrHTML,
                    _radio$classes = radio.classes,
                    classes = _radio$classes === undefined ? '' : _radio$classes;


                attrHTML = attrHTML + " " + errorTags;

                var radioHTML = self.renderRadioHTML(attrHTML, label);

                return html + "\n            " + self.uiRadioButtonContainer(radioHTML, uiClasses + " " + classes);
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
                headerHTML = _header$html === undefined ? '<h1>' + data.name + '</h1>' : _header$html;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uc3RhbnRzL2luZGV4LmpzIiwic3JjL2NvbnN0YW50cy92aWRlby5ldmVudHMuanMiLCJzcmMvY29uc3RhbnRzL3ZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL2FuY2hvci5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9idXR0b25zLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL2RhdGUuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvZGF0ZXRpbWUtbG9jYWwuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvZm9ybS5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9tZXNzYWdlcy5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9udW1iZXIuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvb3B0aW9ucy5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9yYWRpby5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9zdGF0ZS5pbnB1dC5qcyIsInNyYy9tb2R1bGVzL3VpL2Jvb3RzdHJhcC9zdGF0ZS5uYXZpZ2F0aW9uLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3N0YXRlLnZpZGVvLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3N0eWxlLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvdGV4dGFyZWEuanMiLCJzcmMvbW9kdWxlcy91aS9ib290c3RyYXAvdXJsLmpzIiwic3JjL21vZHVsZXMvdWkvYm9vdHN0cmFwL3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9hbmNob3IuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2J1dHRvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2NoZWNrYm94LmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9kYXRlLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9kYXRldGltZS1sb2NhbC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvZW1haWwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L2Zvcm0uanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L21lc3NhZ2VzLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9udW1iZXIuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L29wdGlvbnMuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3JhZGlvLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC9zdGF0ZS5pbnB1dC5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3RhdGUubmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3VpL2RlZmF1bHQvc3R5bGUuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3RleHQuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3RleHRhcmVhLmpzIiwic3JjL21vZHVsZXMvdWkvZGVmYXVsdC91cmwuanMiLCJzcmMvbW9kdWxlcy91aS9kZWZhdWx0L3ZpZGVvLmNvbnRyb2xzLmpzIiwic3JjL21vZHVsZXMvdWkvdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanMiLCJzcmMvbW9kdWxlcy92aWRlby9jb250cm9scy9ldmVudHMuanMiLCJzcmMvbW9kdWxlcy92aWRlby9jb250cm9scy9pbmRleC5qcyIsInNyYy9tb2R1bGVzL3ZpZGVvL3NldHRpbmdzLmpzIiwic3JjL3V0aWxpdGllcy9hc3NlcnRzLmpzIiwic3JjL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMiXSwibmFtZXMiOltdLCJtYXBw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O0FBSUQ7Ozs7Ozs7OzttQ0FNcUM7QUFBQSxnQkFBNUIsVUFBNEIsdUVBQWYsRUFBZTtBQUFBLGdCQUFYLElBQVcsdUVBQUosRUFBSTs7QUFDakMsZ0JBQUksWUFBWTtBQUNaLDBCQUFVLElBREU7QUFFWix3QkFBUTtBQUZJLGFBQWhCO0FBSUEsZ0JBQUksa0JBQWtCLEVBQXRCO0FBQ0EsZ0JBQUksT0FBTyxJQUFYOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxVQUFDLEdBQUQsRUFBUztBQUNsQixnQ0FBZ0IsR0FBaEIsSUFBdUIsRUFBdkI7QUFDQSwyQkFBVyxPQUFYLENBQW1CLFVBQUMsT0FBRCxFQUFVLEtBQVYsRUFBb0I7QUFDbkMsd0JBQUksWUFBWSxLQUFLLEdBQUwsQ0FBUyxnQkFBZ0IsR0FBaEIsQ0FBVCxFQUErQixRQUFRLEdBQVIsQ0FBL0IsQ0FBaEI7O0FBRUEsd0JBQUksU0FBSixFQUFlO0FBQ1gsa0NBQVUsTUFBVixDQUFpQixJQUFqQixDQUFzQjtBQUNsQixpQ0FBSyxHQURhO0FBRWxCLG1DQUFPLEtBRlc7QUFHbEIsbUNBQU8sUUFBUSxHQUFSO0FBSFcseUJBQXRCO0FBS0Esa0NBQVUsUUFBVixHQUFxQixLQUFyQjtBQUNILHFCQVBELE1BT087QUFDSCx3Q0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FBMEIsUUFBUSxHQUFSLENBQTFCO0FBQ0g7QUFDSixpQkFiRDtBQWNILGFBaEJEOztBQWtCQSxtQkFBTyxTQUFQO0FBQ0g7Ozs7OztBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkxJQlJBUlkgPSBcImlWWGpzXCI7XG4gICAgICAgIHRoaXMuREVMSU1FVEVSID0gXCI6XCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5MSUJSQVJZO1xuICAgIH1cblxuICAgIGFkZE5hbWVzKG5hbWVDb2xsZWN0aW9uKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbmFtZXMgPSBPYmplY3Qua2V5cyhuYW1lQ29sbGVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT57XG4gICAgICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5jb252ZW50aW9uKG5hbWVDb2xsZWN0aW9uW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IFZpZGVvQ29uc3RhbnRzIGZyb20gXCIuL3ZpZGVvLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlkZW9Db25zdGFudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBldmVudE5hbWVzID0ge1xuICAgICAgICAgICAgQUREX1BMQVlJTkdfQ0xBU1M6ICdhZGQtcGxheWluZy1jbGFzcycsXG4gICAgICAgICAgICBCVUZGRVJJTkcgOiBcImJ1ZmZlcmluZ1wiLFxuICAgICAgICAgICAgQ0FOX1BMQVk6IFwiY2FuLXBsYXlcIixcbiAgICAgICAgICAgIERJU1BPU0UgOiBcImRpc3Bvc2VcIixcbiAgICAgICAgICAgIEVOREVEIDogXCJlbmRlZFwiLFxuICAgICAgICAgICAgR0VUX0RVUkFUSU9OOiBcImdldC1kdXJhdGlvblwiLFxuICAgICAgICAgICAgTVVURTogXCJtdXRlXCIsXG4gICAgICAgICAgICBQQVVTRTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgUEFVU0VEOiBcInBhdXNlZFwiLFxuICAgICAgICAgICAgUExBWTogXCJwbGF5XCIsXG4gICAgICAgICAgICBQTEFZSU5HOiBcInBsYXlpbmdcIixcbiAgICAgICAgICAgIFJFQURZX1BMQVlFUiA6IFwicmVhZHktcGxheWVyXCIsXG4gICAgICAgICAgICBTRUVLOiBcInNlZWtcIixcbiAgICAgICAgICAgIFNFVF9EVVJBVElPTjogXCJzZXQtZHVyYXRpb25cIixcbiAgICAgICAgICAgIFNFVF9WT0xVTUU6IFwic2V0LXZvbHVtZVwiLFxuICAgICAgICAgICAgVElNRV9VUERBVEU6IFwidGltZS11cGRhdGVcIixcbiAgICAgICAgICAgIFVOTVVURTogXCJ1bm11dGVcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkTmFtZXMoZXZlbnROYW1lcyk7XG4gICAgfVxuXG4gICAgY29udmVudGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IHtERUxJTUVURVJ9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gYCR7c3VwZXIuY29udmVudGlvbigpfSR7REVMSU1FVEVSfSR7ZXZlbnROYW1lfWA7XG4gICAgfVxufSIsImltcG9ydCBpVlhqc0NvbnN0YW50cyBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzICBpVlhqc0NvbnN0YW50c3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuVklERU8gPSBcInZpZGVvXCI7XG4gICAgfVxuXG4gICAgY29udmVudGlvbigpe1xuICAgICAgICBsZXQge0RFTElNRVRFUiwgVklERU99ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gIGAke3N1cGVyLmNvbnZlbnRpb24oKX0ke0RFTElNRVRFUn0ke1ZJREVPfWA7ICAgXG4gICAgfVxufSIsImltcG9ydCB7IEFuY2hvciBhcyBEZWZhdWx0QW5jaG9yIH0gZnJvbSAnLi4vZGVmYXVsdC9hbmNob3IuanMnO1xuXG5leHBvcnQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRGVmYXVsdEFuY2hvcntcblx0Y29uc3RydWN0b3IoYW5jaG9ySW5mbyl7XG5cdFx0c3VwZXIoYW5jaG9ySW5mbyk7XG5cdH1cbn0iLCJpbXBvcnQgeyBCdXR0b25zIGFzIERlZmF1bHRCdXR0b25zIH0gZnJvbSAnLi4vZGVmYXVsdC9idXR0b25zLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ucyBleHRlbmRzIERlZmF1bHRCdXR0b25zIHtcclxuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbnMsIGlucHV0KSB7XHJcbiAgICAgICAgc3VwZXIoYnV0dG9ucywgaW5wdXQsIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgYnV0dG9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2J0bic7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ2hlY2tib3ggYXMgRGVmYXVsdENoZWNrYm94IH0gZnJvbSAnLi4vZGVmYXVsdC9jaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgRGVmYXVsdENoZWNrYm94IHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjaGVja2JveCBmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJDaGVja2JveENvbnRhaW5lcihjbGFzc2VzLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2xhYmVsfSA9IGlucHV0O1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCIke2NsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gICAgXHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgJHthdHRyaWJ1dGVzfSB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgIDwvZGl2PmBcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGUgYXMgRGVmYXVsdERhdGUgfSBmcm9tICcuLi9kZWZhdWx0L2RhdGUuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlIGV4dGVuZHMgRGVmYXVsdERhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGV0aW1lTG9jYWwgYXMgRGVmYXVsdERhdGV0aW1lTG9jYWwgfSBmcm9tICcuLi9kZWZhdWx0L2RhdGV0aW1lLWxvY2FsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZXRpbWVMb2NhbCBleHRlbmRzIERlZmF1bHREYXRldGltZUxvY2Fse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFbWFpbCBhcyBEZWZhdWx0RW1haWwgfSBmcm9tICcuLi9kZWZhdWx0L2VtYWlsLmpzJztcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWwgZXh0ZW5kcyBEZWZhdWx0RW1haWx7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi9zdHlsZS5qcyc7XHJcbmltcG9ydCB7IEZvcm0gYXMgRGVmYXVsdEZvcm0gfSBmcm9tICcuLi9kZWZhdWx0L2Zvcm0uanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm0gZXh0ZW5kcyBEZWZhdWx0Rm9ybSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MpIHtcclxuICAgICAgIHN1cGVyKGlucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncywgU3R5bGUpOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHN1Ym1pdEJ1dHRvbkhUTUwoKSB7ICAgICAgICBcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogc3VibWl0TGFiZWwgPSBcIlN1Ym1pdFwiLCBsYWJlbEhUTUw6IHN1Ym1pdExhYmVsSFRNTCwgaW5wdXQ6IHN1Ym1pdElucHV0ID0ge30sIGNvbnRhaW5lcjogc3VibWl0Q29udGFpbmVyID0ge30sIGF0dHJpYnV0ZXMgPSAnJ30gPSBzdWJtaXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRJbnB1dENsYXNzZXMgPSBcIlwifSA9IHN1Ym1pdElucHV0O1xyXG4gICAgICAgIGxldCB7Y2xhc3Nlczogc3VibWl0Q29udGFpbmVyQ2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBzdWJtaXRMYWJlbCA9IHN1Ym1pdExhYmVsSFRNTCA/IHN1Ym1pdExhYmVsSFRNTCA6IHN1Ym1pdExhYmVsO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0SFRNTCA9IHN1Ym1pdExhYmVsLmxlbmd0aCA+PSAwID9cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyICR7c3VibWl0Q29udGFpbmVyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICR7c3VibWl0SW5wdXRDbGFzc2VzfVwiIHR5cGU9J3N1Ym1pdCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7c3VibWl0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdEhUTUw7XHJcbiAgICB9XHJcbn0iLCIvLyBGb3JtL0lucHV0IEhUTUxcclxuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi9hbmNob3IuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtLmpzJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5qcyc7XHJcbmltcG9ydCB7IEJ1dHRvbnMgfSBmcm9tICcuL2J1dHRvbnMuanMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vY2hlY2tib3guanMnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9ucy5qc1wiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuanMnO1xyXG5pbXBvcnQgeyBSYWRpbyB9IGZyb20gJy4vcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBOdW1iZXIgfSBmcm9tICcuL251bWJlci5qcyc7XHJcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi9lbWFpbC5qcyc7XHJcbmltcG9ydCB7IERhdGUgfSBmcm9tICcuL2RhdGUuanMnO1xyXG5pbXBvcnQgeyBVcmwgfSBmcm9tICcuL3VybC5qcyc7XHJcbmltcG9ydCB7IERhdGV0aW1lTG9jYWwgfSBmcm9tICcuL2RhdGV0aW1lLWxvY2FsLmpzJztcclxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xyXG5cclxuLy9TdGF0ZXNcclxuaW1wb3J0IHsgSW5wdXRTdGF0ZSB9IGZyb20gJy4vc3RhdGUuaW5wdXQuanMnO1xyXG5pbXBvcnQgeyBWaWRlb1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS52aWRlby5qcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSB9IGZyb20gXCIuL3N0YXRlLm5hdmlnYXRpb24uanNcIjtcclxuXHJcbi8vQ29udHJvbHMgXHJcbmltcG9ydCBWaWRlb0NvbnRyb2xzIGZyb20gJy4vdmlkZW8uY29udHJvbHMuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcFVJIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYW5jaG9yID0gQW5jaG9yO1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IEZvcm07XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gVGV4dDtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBCdXR0b25zO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IERhdGU7XHJcbiAgICAgICAgdGhpcy5kYXRldGltZUxvY2FsID0gRGF0ZXRpbWVMb2NhbDtcclxuICAgICAgICB0aGlzLmNoZWNrYm94ID0gQ2hlY2tib3g7XHJcbiAgICAgICAgdGhpcy52aWRlb0NvbnRyb2xzID0gVmlkZW9Db250cm9scztcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPcHRpb25zO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBFbWFpbDtcclxuICAgICAgICB0aGlzLnVybCA9IFVybDtcclxuICAgICAgICB0aGlzLnRleHRhcmVhID0gVGV4dGFyZWE7XHJcbiAgICAgICAgdGhpcy5yYWRpbyA9IFJhZGlvO1xyXG4gICAgICAgIHRoaXMubnVtYmVyID0gTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBuZXcgU3R5bGUoKTtcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcclxuICAgICAgICAgICAgaW5wdXQ6IElucHV0U3RhdGUsXHJcbiAgICAgICAgICAgIHZpZGVvOiBWaWRlb1N0YXRlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uIDogTmF2aWdhdGlvblN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0ID0gaW5pdGlhbGl6ZUJvb3RzdHJhcFVJO1xyXG5cclxuaWYgKGFuZ3VsYXIgJiYgYW5ndWxhci5tb2R1bGUoJ2l2eC1qcycpKSB7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaXZ4LWpzJylcclxuICAgICAgICAuY29uc3RhbnQoJ2lWWGpzLnVpLmJvb3RzdHJhcCcsIGluaXRpYWxpemVCb290c3RyYXBVSSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVCb290c3RyYXBVSSgpe1xyXG4gICAgcmV0dXJuIEJvb3RzdHJhcFVJO1xyXG59IiwiaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyBhcyBEZWZhdWx0RXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuLi9kZWZhdWx0L21lc3NhZ2VzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlcyBleHRlbmRzIERlZmF1bHRFcnJvck1lc3NhZ2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yTWVzc2FnZXMgPSBbXSl7ICAgICAgIFxyXG4gICAgICAgc3VwZXIoZXJyb3JNZXNzYWdlcyk7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdoYXMtZXJyb3InO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgbWVzc2FnZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2hlbHAtYmxvY2snO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTnVtYmVyIGFzIERlZmF1bHROdW1iZXIgfSBmcm9tICcuLi9kZWZhdWx0L251bWJlci5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlciBleHRlbmRzIERlZmF1bHROdW1iZXJ7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IE9wdGlvbnMgYXMgRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuLi9kZWZhdWx0L29wdGlvbnMuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zIGV4dGVuZHMgRGVmYXVsdE9wdGlvbnN7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTsgIFxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IHVpQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJztcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJhZGlvIGFzIERlZmF1bHRSYWRpbyB9IGZyb20gJy4uL2RlZmF1bHQvcmFkaW8uanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIERlZmF1bHRSYWRpbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaikge1xyXG4gICAgICAgIHN1cGVyKGlucHV0T2JqLCBFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncmFkaW8gZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCl7IFxyXG4gICAgICAgIGxldCB7aW5wdXQgPXt9fSA9dGhpcztcclxuICAgICAgICBsZXQge2lkfSA9IGlucHV0OyAgICAgICBcclxuICAgICAgICByZXR1cm4gYCBcclxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiICR7YXR0ckhUTUx9PlxyXG4gICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgYCAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7IElucHV0U3RhdGUgYXMgRGVmYXVsdElucHV0U3RhdGUgfSBmcm9tICcuLi9kZWZhdWx0L3N0YXRlLmlucHV0LmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0YXRlIGV4dGVuZHMgRGVmYXVsdElucHV0U3RhdGUgeyBcclxuICAgIGNvbnN0cnVjdG9yKGhlYWRlciwgZm9ybVNlY3Rpb24sIGZvb3RlciwgZGF0YSl7XHJcbiAgICAgICAgc3VwZXIoaGVhZGVyLCBmb3JtU2VjdGlvbiwgZm9vdGVyLCBkYXRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnY29udGFpbmVyLWZsdWlkJztcclxuICAgIH1cclxufSIsImltcG9ydCB7TmF2aWdhdGlvblN0YXRlIGFzIERlZmF1bHROYXZpZ2F0aW9uU3RhdGV9IGZyb20gJy4uL2RlZmF1bHQvc3RhdGUubmF2aWdhdGlvbi5qcyc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGUgZXh0ZW5kcyBEZWZhdWx0TmF2aWdhdGlvblN0YXRlIHsgICAgIFxuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxpbmtTZWN0aW9uKXtcbiAgICAgICAgc3VwZXIoZGF0YSwgbGlua1NlY3Rpb24pO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGVmYXVsdFNlY3Rpb25DbGFzc2VzKCl7XG4gICAgICAgIHJldHVybiAnY29udGFpbmVyLWZsdWlkJztcbiAgICB9IFxufSIsImV4cG9ydCBjbGFzcyBWaWRlb1N0YXRlIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJTZWN0aW9uLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnBsYXllclNlY3Rpb24gPSBwbGF5ZXJTZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7cGxheWVyU2VjdGlvbiwgZGF0YX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aGVhZGVyID0ge30sIGZvb3RlciA9IHt9LCBzZWN0aW9uID0ge319ID0gZGF0YTtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgPGgxPiR7ZGF0YS5uYW1lfTwvaDE+YH0gPSBoZWFkZXI7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzIDogc2VjdGlvbkNsYXNzZXMgPSAnJyB9ID0gc2VjdGlvbjtcclxuICAgICAgICBsZXQge2NsYXNzZXMgOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWwgOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwidWkgY29udGFpbmVyICR7c2VjdGlvbkNsYXNzZXN9XCIgaWQ9XCIke2RhdGEuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgICR7cGxheWVyU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdpZHRoQ2xhc3NlcyhpbnB1dEhUTUwpIHtcclxuICAgICAgICBsZXQgY3VycmVudFdpZHRoVG90YWwgPSAwLjA7XHJcbiAgICAgICAgbGV0IGNvbHVtbk5hbWVzID0gW1wiY29sLW1kLTFcIiwgXCJjb2wtbWQtMlwiLCBcImNvbC1tZC0zXCIsIFwiY29sLW1kLTRcIiwgXCJjb2wtbWQtNVwiLCBcImNvbC1tZC02XCIsIFwiY29sLW1kLTdcIiwgXCJjb2wtbWQtOFwiLCBcImNvbC1tZC05XCIgLFwiY29sLW1kLTEwXCIsIFwiY29sLW1kLTExXCIsIFwiY29sLW1kLTEyXCJdXHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gaW5wdXRIVE1MLnJlZHVjZSgoY29udGVudEhUTUwsIHRoaXNJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2h0bWwsIHNldHRpbmdzfSA9IHRoaXNJbnB1dDtcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCA9IFwiMVwiLCBjbGFzc2VzPSAnJ30gPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgbGV0IG51bWVyaWNXaWR0aCA9IGdldE51bWVyaWNXaWR0aCh3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZHRoVG90YWwgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudEhUTUwgPSBgJHtjb250ZW50SFRNTH08ZGl2IGNsYXNzPVwicm93XCI+IGBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFdpZHRoVG90YWwgKz0gbnVtZXJpY1dpZHRoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGJvb3RzdHJhcFdpZHRoU3R5bGVOYW1lID0gY29sdW1uTmFtZXNbTWF0aC5yb3VuZChudW1lcmljV2lkdGggKiBjb2x1bW5OYW1lcy5sZW5ndGgpIC0gMV07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJ2l2eGpzLWdyaWQtMS0xJywgYGZvcm0tZ3JvdXAgJHtib290c3RyYXBXaWR0aFN0eWxlTmFtZX0gJHtjbGFzc2VzfWApO1xyXG4gICAgICAgICAgICBjb250ZW50SFRNTCA9IGAke2NvbnRlbnRIVE1MfSR7aHRtbH1gO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aFRvdGFsID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIVE1MID0gYCR7Y29udGVudEhUTUx9PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aFRvdGFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRIVE1MO1xyXG4gICAgICAgIH0sICcnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihjb250ZW50cy5zdWJzdHJpbmcoY29udGVudHMubGVuZ3RoIC0gNykgIT09IFwiPC9kaXY+XCIpe1xyXG4gICAgICAgICAgICBjb250ZW50cyA9IGAke2NvbnRlbnRzfTwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TnVtZXJpY1dpZHRoKHdpZHRoU3RyaW5nKXtcclxuICAgICAgICAgICAgaWYod2lkdGhTdHJpbmcgPT09ICcxJykgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcGFyc2VkV2lkdGhGb3JtdWxhID0gd2lkdGhTdHJpbmcuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHBhcnNlZFdpZHRoRm9ybXVsYVswXSkgLyBwYXJzZUZsb2F0KHBhcnNlZFdpZHRoRm9ybXVsYVsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVGV4dCBhcyBEZWZhdWx0VGV4dCB9IGZyb20gJy4uL2RlZmF1bHQvdGV4dC5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBEZWZhdWx0VGV4dHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqKSB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXRPYmosIEVycm9yTWVzc2FnZXMpOyAgXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9ybS1jb250cm9sJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVGV4dGFyZWEgYXMgRGVmYXVsdFRleHRhcmVhIH0gZnJvbSAnLi4vZGVmYXVsdC90ZXh0YXJlYS5qcyc7XHJcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9tZXNzYWdlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgRGVmYXVsdFRleHRhcmVhe1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0tY29udHJvbCdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFVybCBhcyBEZWZhdWx0VXJsIH0gZnJvbSAnLi4vZGVmYXVsdC91cmwuanMnO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmwgZXh0ZW5kcyBEZWZhdWx0VXJse1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmopIHtcclxuICAgICAgICBzdXBlcihpbnB1dE9iaiwgRXJyb3JNZXNzYWdlcyk7ICBcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdmb3JtLWNvbnRyb2wnXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRGVmYXVsdFZpZGVvQ29udHJvbHMgZnJvbSAnLi4vZGVmYXVsdC92aWRlby5jb250cm9scy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIERlZmF1bHRWaWRlb0NvbnRyb2xzIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaVZYanNCdXMpIHtcclxuICAgICAgICBzdXBlcihjb250YWluZXIsIGlWWGpzQnVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdkdXJhdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi1wbGF5JztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGF1c2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi1wYXVzZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVubXV0ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdnbHlwaGljb24gZ2x5cGhpY29uLXZvbHVtZS11cCc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi12b2x1bWUtb2ZmJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheVBhdXNlQ29udHJvbHNDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG11dGVDb250cm9sc0NsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdidG4gYnRuLWRlZmF1bHQgYnRuLXhzJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiBgYmFyYFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY3J1YkJhckhUTUwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXNjcnViLWJhclwiIGNsYXNzPVwicHJvZ3Jlc3MgJHt0aGlzLnNjcnViQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzY3J1Yi1iYXItcHJvZ3Jlc3MtY29udGFpbmVyXCIgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiMFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwibWluLXdpZHRoOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzY3J1Yi1iYXItdGltZXN0YW1wLWxhYmVsXCIgY2xhc3M9XCJsYWJlbFwiPiR7dGhpcy50aW1lc3RhbXBIVE1MfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdm9sdW1lQmFyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3Byb2dyZXNzLWJhcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBpZD1cInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIiBjbGFzcz1cInByb2dyZXNzICR7dGhpcy52b2x1bWVCYXJDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy52b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheVBhdXNlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7cGxheUNsYXNzZXMgOiBwbGF5fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMgOiBwbGF5UGF1c2VDb250cm9sc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cInBsYXktYnV0dG9uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtcGxheS1wYXVzZVwiIGNsYXNzPVwiJHtwbGF5UGF1c2VDb250cm9sc31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPScke3BsYXl9Jz48L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXY+YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7dW5tdXRlQ2xhc3NlcyA6IHVubXV0ZSwgbXV0ZUNvbnRyb2xzQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cIm11dGUtYnV0dG9uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW8tY29udHJvbHMtbXV0ZS1jb250cm9sc1wiIGNsYXNzPVwiJHttdXRlQ29udHJvbHNDbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIke3VubXV0ZX1cIj48L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUJ1dHRvbkhUTUwsIHNjcnViQmFySFRNTCwgdGltZXN0YW1wSFRNTCwgbXV0ZUJ1dHRvbkhUTUwsIHZvbHVtZUJhckhUTUx9ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAke3NjcnViQmFySFRNTH1cclxuICAgICAgICAke3BsYXlQYXVzZUJ1dHRvbkhUTUx9XHJcbiAgICAgICAgJHttdXRlQnV0dG9uSFRNTH1cclxuICAgICAgICAke3ZvbHVtZUJhckhUTUx9ICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xuaW1wb3J0IHsgVHlwZVZhbGlkYXRvciB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy90eXBlLXBhcnNlcnMuanMnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL2Fzc2VydHMuanMnO1xuXG5sZXQgdHlwZUNoZWNrID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcblxuZXhwb3J0IGNsYXNzIEFuY2hvciB7XG4gICAgY29uc3RydWN0b3IoYW5jaG9ySW5mbykgeyAgIFxuICAgICAgIHRoaXMuYW5jaG9ySW5mbyA9IGFuY2hvckluZm87XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBnZXQgYW5jaG9yQ2xhc3Nlcygpe1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIFxuICAgIGdldCBodG1sKCkge1xuICAgICAgICBsZXQge2FuY2hvckNsYXNzZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtocmVmID0gJycsIGNsYXNzZXMgPSAnJywgYXR0cmlidXRlcyA9IHt9LCBsYWJlbCA9IGxhYmVsSFRNTCwgbGFiZWxIVE1MLCBpZD0nJ30gPSB0aGlzLmFuY2hvckluZm87IFxuICAgICAgICBsZXQgYXR0cmlidXRlSFRNTCA9IG5ldyBBdHRyaWJ1dGVUYWdzKGF0dHJpYnV0ZXMsIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpKS5odG1sO1xuXG4gICAgICAgIGlmKCFsYWJlbEhUTUwgJiYgIWxhYmVsKXtcbiAgICAgICAgICAgIGxhYmVsID0gaHJlZjtcbiAgICAgICAgfSBcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgIDxhIGlkPScke2lkfScgY2xhc3M9XCIke2NsYXNzZXN9ICR7YW5jaG9yQ2xhc3Nlc31cIiAgaHJlZj1cIiR7aHJlZn1cIiAke2F0dHJpYnV0ZUhUTUx9ID4ke2xhYmVsSFRNTCA/IGxhYmVsSFRNTCA6IGxhYmVsfTwvYT4gICAgICAgICAgIFxuICAgICAgICBgXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5pbXBvcnQgeyBUeXBlVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL3R5cGUtcGFyc2Vycy5qcyc7XHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdGllcy9hc3NlcnRzLmpzJztcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5sZXQgdHlwZUNoZWNrID0gbmV3IFR5cGVWYWxpZGF0b3IoKTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGEgY29sbGVjdGlvbiBvZiBidXR0b25zIGZvciBvbmUgY2xpY2sgcmVjb3JkaW5nIG9mIFxyXG4gKiBhbiBpbnB1dCB0aGF0IGhhcyBtdWx0aXBsZSBvcHRpb25zIGZvciBkYXRhIHJlY29yZGluZy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25zIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRha2VzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIGJ1dHRvbnMsIGEgY2xhc3MgdGhhdCByZW5kZXJzIHRoZSBcclxuICAgICAqIGVycm9yIG1lc3NhZ2VzIGFuZCBhIGNsYXNzIHRoYXQgcmVuZGVycyBhdHRyaWJ1dGVzLiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnNJbmZvIC0gSW5mb3JtYXRpb24gdG8gY3JlYXRlIHRoaXMgYnV0dG9uIGlucHV0IFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYnV0dG9uc0luZm8uYnV0dG9ucyAtIGVhY2ggaW5kaXZpZHVhbCBidXR0b24gZGF0YSBhbmQgc2V0dGluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9uc0luZm8uc2V0dGluZ3MgLSBzZXR0aW5ncyBmb3IgYWxsIGJ1dHRvbnMgXHJcbiAgICAgKiBAcGFyYW0ge0NsYXNzfSBidXR0b25zSW5mby5lcnJvcnMgLSBhbiBlcnJvciBjbGFzcyB0aGF0IHdhcyBjcmVhdGVkIGJ5IHRoZSBcclxuICAgICAqIHJlbmRlcmluZyBsaWJyYXJ5IHNvIHRoZSBlcnJvcnMgb3BlbiBhbmQgZGlzcGxheSBhbG9uZ3NpZGUgdGhlIGxpYnJhcnkuIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihidXR0b25zID0gW10sIGlucHV0LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCdXR0b25zIHRvIGJlIHJlbmRlcmVkXHJcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciBhbGwgYnV0dG9ucyBpbiB0aGlzIGdyb3VwIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFcnJvciBtZXNzYWdlIGNsYXNzIHRoYXQgd2lsbCB0YWtlIHRoZSBlcnJvcnMgZnJvbSBcclxuICAgICAgICAgKiB0aGUgcmVuZGVyaW5nIGxpYnJhcnkgYW5kIGFkZHMgdGhlbSB0byB0aGlzIGlucHV0IFxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGF0dHJpYnV0ZSB0YWdzIGh0bWwgdG8gYmUgYWRkZWQgdG8gdGhpcyBidXR0b24gXHJcbiAgICAgICAgICogaW5wdXRzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGV0cyB1c2VycyBhZGQgdGhlIHNhbWUgY2xhc3NlcyB0byBhbGwgYnV0dG9ucyBqdXN0IGluIFxyXG4gICAgICogY2FzZSBidXR0b25zIHNoYXJlIGEgc3BlY2lmaWMgY2xhc3MuXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBidXR0b25DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIEhUTUwgZm9yIGV2ZXJ5IGJ1dHRvbnMgZGVmaW5lZCBpbiB0aGUgYnV0dG9ucyBhcnJheSBhbmQgXHJcbiAgICAgKiBhdHRhY2hlcyB0aGUgZXJyb3IgbWVzc2FnZXMgYXR0YWNoZWQgdG8gdGhpcyBpbnB1dC4gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBidXR0b25DbGFzc2VzID0gJ2J1dHRvbi1jbGFzcyc7XHJcbiAgICAgKiBidXR0b25zID0gW3tcclxuICAgICAqICAgIGxhYmVsIDogXCJCdXR0b24gMVwiLFxyXG4gICAgICogICAgYXR0ckhUTUwgOiBcImRpc2FibGVkXCIsXHJcbiAgICAgKiAgICBjbGFzc2VzIDogXCJjbGFzcy0xXCJcclxuICAgICAqIH0se1xyXG4gICAgICogICAgbGFiZWwgOiBcIjxoMT5CdXR0b24gMjwvaDE+XCIsXHJcbiAgICAgKiAgICBjbGFzc2VzIFwiIGNsYXNzLTJcIlxyXG4gICAgICogfV07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIFdpbGwgcmVuZGVyOlxyXG4gICAgICogXHJcbiAgICAgKiA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWNsYXNzIGNsYXNzLTFcIiBkaXNhYmxlZD5CdXR0b24gMTwvYnV0dG9uPlxyXG4gICAgICogPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBjbGFzcyBjbGFzcy0yXCI+PGgxPkJ1dHRvbiAyPC9oMT48L2J1dHRvbj5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcnM6IGVycm9yQ2xhc3MgPSB7fSwgYnV0dG9ucyA9IFtdLCBpbnB1dCA9IHt9LCBidXR0b25DbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlcyA9IHt9LCBlcnJvcnMgPSB7fSwgbWVzc2FnZXMgPSB7fSB9ID0gZXJyb3JDbGFzcztcclxuICAgICAgICBsZXQgYnV0dG9uRXJyb3JNZXNzYWdlcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7ZXJyb3JzW2tleV19YCxcclxuICAgICAgICAgICAgICAgIGF0dHJIVE1MOiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGJ1dHRvbkVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwgPSAnJywgc2hvd0xhYmVsID0gZmFsc2UsIGlkfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCBidXR0b25zSFRNTCA9IGJ1dHRvbnMucmVkdWNlKChodG1sLCBidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IGxhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gXCJcIiB9ID0gYnV0dG9uO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke2h0bWx9IFxyXG4gICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAke2F0dHJIVE1MfSBjbGFzcz1cIiR7Y2xhc3Nlc30gJHtidXR0b25DbGFzc2VzfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgIH0sICcnKTtcclxuXHJcbiAgICAgICAgaWYgKChsYWJlbEhUTUwubGVuZ3RoID4gMCB8fCBsYWJlbC5sZW5ndGggPiAwKSAmJiBzaG93TGFiZWwpIHtcclxuICAgICAgICAgICAgbGFiZWxIVE1MID0gbGFiZWxIVE1MID8gbGFiZWxIVE1MIDogbGFiZWw7XHJcbiAgICAgICAgICAgIGxhYmVsSFRNTCA9IGA8bGFiZWwgZm9yPVwiJHtpZH1cIj4ke2xhYmVsSFRNTH08L2xhYmVsPmBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAke2xhYmVsSFRNTH1cclxuICAgICAgICAgICAgICR7YnV0dG9uc0hUTUx9XHJcbiAgICAgICAgICAgICAke2Vycm9yTWVzc2FnZXN9ICAgICAgICAgICAgIFxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogUHJvZHVjZXMgaHRtbCB0byBidWlsZCBhIGNoZWNrYm94IGlucHV0IGZvciB0aGUgIFxyXG4gKiB2YXJpb3VzIHJlbmRlcmluZyBsaWJyYXJpZXMuIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgdGhlIGNoZWNrYm94J3Mgc2V0dGluZ3MgZnJvbSBhIHN0YW5kYXJkIGlucHV0IGRhdGEgXHJcbiAgICAgKiBvYmplY3QgYW5kIHNldHMgdGhlIHR5cGUgb2YgZXJyb3IgbWVzc2FnZXMgdGhpcyBjbGFzcyBcclxuICAgICAqIHdpbGwgcmVuZGVyIGlmIHRoZSBjaGVja2JveCBpc24ndCB2YWxpZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0T2JqIC0gY29udGFpbnMgYWxsIHRoZSBjb25maWd1cmF0aW9ucyBcclxuICAgICAqIHRvIHJlbmRlciB0aGlzIGlucHV0LlxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gZXJyb3JNZXNzYWdlcyAtIGEgY2xhc3MgdGhhdCB3aWxsIHJlbmRlciB0aGUgXHJcbiAgICAgKiBzcGVjaWZpYyB0eXBlIG9mIGVycm9yIG1lc3NhZ2VzIGJhc2VkIG9uIHRoaXMgVUkncyBzZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0LCB0YWdzID0gJycsIHNldHRpbmdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIGNoZWNrYm94J3MgaW5wdXQgY29uZmlndXJhdGlvbiBcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQW55IGN1c3RvbSB0YWdzIHBhc3NlZCBkb3duIGZyb20gdGhlIHJlbmRlcmluZyBsaWJyYXJ5LiBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciB0aGlzIHdob2xlIGlucHV0IGluY2x1ZGluZyB0aGUgY29udGFpbmVyXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgY2xhc3Mgb2YgZXJyb3JzIGNyZWF0ZWQgYnkgdGhlIHJlbmRlcmluZyBsaWJyYXJ5IHRvIFxyXG4gICAgICAgICAqIGhpZGUgYW5kIHNob3cgdmFyaW91cyBlcnJvcnMuXHJcbiAgICAgICAgICogQHR5cGUge2NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIFVJJ3MgcmVuZGVyaW5nIG9mIHRoaXMgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICAgICAgICogQHR5cGUge2NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVmYXVsdCBjbGFzcyB0byB0aGlzIGNoZWNrYm94IGlucHV0IFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFueSBVSSBzcGVjaWZpYyBhdHRyaWJ1dGVzXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0cmlidXRlcyB0aGF0IHJlcXVpcmVkIGZvciB0aGlzIGNoZWNrYm94IGlucHV0IFxyXG4gICAgICogdG8gYmUgdXNlZCBhbmQgcmVuZGVyZWQgcHJvcGVybHkuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBzdHJpbmcgb2YgYWxsIGF0dHJpYnV0ZXMgdG8gbG9hZCBcclxuICAgICAqIHRoaXMgaW5wdXQgaW5jbHVkaW5nIGl0cyBpZCwgbmFtZSBhbmQgdHlwZS5cclxuICAgICAqL1xyXG4gICAgZ2V0IHJlcXVpcmVkQXR0cmlidXRlcygpIHtcclxuICAgICAgICBsZXQge2lucHV0fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpZCwgbmFtZX0gPSBpbnB1dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcImA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIVE1MIGZvciB0aGlzIGNoZWNrYm94IGZyb20gdGhlIGdpdmVuIGF0dHJpYnV0ZXMgXHJcbiAgICAgKiBhbmQgY2xhc3Nlcy5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB1aUNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGlucHV0LmNsYXNzZXMgPSBcImNsYXNzLTJcIjtcclxuICAgICAqIHJlcXVpcmVkQXR0cmlidXRlcyA9IFwiaWQ9J2lkLTEnIG5hbWU9J2NoZWNrYm94LW5hbWUnIHR5cGU9J2NoZWNrYm94J1wiXHJcbiAgICAgKiAvLyBSZW5kZXJzIFRvOlxyXG4gICAgICogPGxhYmVsIGNsYXNzPVwiY2xhc3MtMSBjbGFzcy0yXCI+XHJcbiAgICAgKiAgICAgPGlucHV0IGlkPSdpZC0xJyBuYW1lPSdjaGVja2JveC1uYW1lJyB0eXBlPSdjaGVja2JveCc+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIGh0bWwgb2YgdGhlIGZ1bGx5IGNyZWF0ZWQgY2hlY2tib3hcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQ2hlY2tib3hDb250YWluZXIoY2xhc3NlcywgYXR0cmlidXRlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge3Nob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIiBjbGFzcz1cIiR7Y2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgPGlucHV0ICR7YXR0cmlidXRlc30+XHJcbiAgICAgICAgICAgICAgICR7bGFiZWx9XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYW5kIHJlbmRlcnMgYWxsIHRoZSBIVE1MIGZvciB0aGlzIGNoZWNrYm94IGJhc2VkIG9uIHRoZSBzZXR0aW5ncy5cclxuICAgICAqIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHt0YWdzLCBzZXR0aW5ncyA9IHt9LCBlcnJvcnMsIGlucHV0LCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9fSA9IHNldHRpbmdzO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlcyA9ICcnfSA9IGlucHV0U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHsgaWQsIG5hbWUsIGxhYmVsID0gJycgfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7IG1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXMgPSB7fSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gdGhpcy5lcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9yQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMobWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IGFsbENsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG4gICAgICAgIGxldCBhbGxBdHRyaWJ1dGVzID0gYCR7cmVxdWlyZWRBdHRyaWJ1dGVzfSAke3VpQXR0cmlidXRlc30gJHt0YWdzfSAke2Vycm9yVGFnc31gXHJcbiAgICAgICAgbGV0IGNoZWNrYm94SFRNTCA9IHRoaXMucmVuZGVyQ2hlY2tib3hDb250YWluZXIoYWxsQ2xhc3NlcywgYWxsQXR0cmlidXRlcyk7XHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgICR7Y2hlY2tib3hIVE1MfVxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7U3R5bGV9IGZyb20gXCIuL3N0eWxlXCI7XHJcbmltcG9ydCB7RXJyb3JNZXNzYWdlc30gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHtBdHRyaWJ1dGVUYWdzfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkYXRlIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgZGF0ZSBzcGVjaWZpYyBkYXRhIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgICogbWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIHRoaXMgZGF0ZSBpbnB1dCBib3hcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZSBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBkYXRlIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsIGlucHV0IHNldHRpbmdzIGZvciB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBkYXRlIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZGF0ZSBpbnB1dHMgXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGRhdGUgaW5wdXQgXHJcbiAgICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBkYXRlIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIERhdGUudWlDbGFzc2VzID0gJ3VpLWNsYXNzZXMtMSc7XHJcbiAgICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgICogPGxhYmVsPlxyXG4gICAgICogICAgICA8aDE+TGFiZWw8L2gxPlxyXG4gICAgICogPC9sYWJlbD5cclxuICAgICAqIDxpbnB1dCBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCwgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDogaW5wdXRTZXR0aW5ncyA9IHt9LCBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBcclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImRhdGVcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGRhdGV0aW1lIGxvY2FsIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgZGF0ZSB3aXRoIHRpbWVzdGFtcCBzcGVjaWZpYyBkYXRhIFxyXG4gKiBmb3IgaVZYanMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZXRpbWVMb2NhbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEFjY2VwdHMgYW4gaW5wdXQgb2JqZWN0IHdpdGggdmFyaW91cyBpbnB1dCBzZXR0aW5ncyBhbmQgVUkgc3BlY2lmaWMgZXJyb3IgXHJcbiAgICAqIG1lc3NhZ2VzXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIGEgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgYm94XHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIGRhdGV0aW1lLWxvY2FsIGlucHV0IFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouc2V0dGluZ3MgLSBnbG9iYWwgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAqIEBwYXJhbSB7Y2xhc3N9IGlucHV0T2JqLmVycm9ycyAtIGVycm9ycyBmcm9tIGEgcmVuZGVyaW5nIGZvciB2YWxpZGF0aW9uIGFuZCBcclxuICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXNcclxuICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXRcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWwgaW5wdXQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhZ3MgdG8gYmUgYWRkZWQgdG8gdGhpcyBkYXRldGltZS1sb2NhbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlcnMgVUkgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXMgYnkgdXRpbGl6aW5nIHRoZSBcclxuICAgICAgICAgKiBlcnJvciBjbGFzcyBwYXNzZWQgZG93biB0byBrZWVwIGl0IGNvbnNpc3RlbnQgd2l0aCB0aGUgXHJcbiAgICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICAqIGF0dHJpYnV0ZXMgbm90IGNvdmVyZWQgYnkgdGhlIGVycm9ycyBjbGFzcy5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBjbGFzc2VzIHRvIGFkZCB0byBhbGwgZGF0ZXRpbWUtbG9jYWwgaW5wdXRzIFxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZGF0ZXRpbWUtbG9jYWwgaW5wdXQgXHJcbiAgICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRoZSBIVE1MIHRvIHJlbmRlciBhIGRhdGV0aW1lLWxvY2FsIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgKiBcclxuICAgICogQGV4YW1wbGUgXHJcbiAgICAqIC8vRGF0YSBcclxuICAgICogaW5wdXQubGFiZWwgPSBcIjxoMT5MYWJlbDwvaDE+XCI7XHJcbiAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgKiBEYXRldGltZUxvY2FsLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgKiAvLyBSZW5kZXJzIFxyXG4gICAgKiA8bGFiZWw+XHJcbiAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICogPC9sYWJlbD5cclxuICAgICogPGlucHV0IGNsYXNzPVwiY2xhc3MtMSB1aS1jbGFzc2VzLTFcIiB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiByZXF1aXJlZD1cInRydWVcIj5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuXHJcbiAgICAgICAgbGV0IHttZXNzYWdlczogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzOiBlcnJvckF0dHJpYnV0ZXMgPSAnJywgbm9uVmFsaWRhdGUgPSBbXSwgdGFnczogZXJyb3JUYWdzID0gJyd9ID0gZXJyb3JzO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBuZXcgdGhpcy5hdHRyaWJ1dGVUYWdzKGVycm9yQXR0cmlidXRlcywgbm9uVmFsaWRhdGUpLmh0bWw7XHJcblxyXG4gICAgICAgIG5vblZhbGlkYXRlQXR0cmlidXRlc0hUTUwgPSBgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAke3VpQXR0cmlidXRlc31gO1xyXG5cclxuICAgICAgICBpZiAobGFiZWxIVE1MKSBsYWJlbCA9IGxhYmVsSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCIke2NsYXNzZXN9XCIgIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBlbWFpbCBpbnB1dCB0aGF0IHdpbGwgcmVjb3JkIGVtYWlscyAgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbWFpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIGFuIGlucHV0IG9iamVjdCB3aXRoIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgYW5kIFVJIHNwZWNpZmljIGVycm9yIFxyXG4gICAgICogbWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iaiAtIHZhcmlvdXMgaW5wdXQgc2V0dGluZ3MgdG8gcmVuZGVyIHRoaXMgZW1haWwgaW5wdXQgYm94XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmouaW5wdXQgLSBpbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dE9iai50YWdzIC0gaW5wdXQgc3BlY2lmaWMgYXR0cmlidXRlIHRhZ3MgXHJcbiAgICAgKiBAcGFyYW0ge2NsYXNzfSBpbnB1dE9iai5lcnJvcnMgLSBlcnJvcnMgZnJvbSBhIHJlbmRlcmluZyBmb3IgdmFsaWRhdGlvbiBhbmQgXHJcbiAgICAgKiBlcnJvciBtZXNzYWdpbmcgYXBwZWFyYW5jZS5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1lc3NhZ2VzIC0gVUkgc3BlY2lmaWMgRXJyb3IgbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCBzZXR0aW5ncyA9IHt9LCB0YWdzID0ge30sIGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBlbWFpbCBpbnB1dFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgZW1haWwgaW5wdXRcclxuICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFncyB0byBiZSBhZGRlZCB0byB0aGlzIGVtYWlsIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICAqIGVycm9yIGNsYXNzIHBhc3NlZCBkb3duIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHRoZSBcclxuICAgICAgICAgKiBjdXJyZW50IFVJIGZyYW1ld29yay5cclxuICAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgYXR0cmlidXRlIGRhdGEgaW50byBhdHRyaWJ1dGUgSFRNTCBmb3IgXHJcbiAgICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICAqIEB0eXBlIHtDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVRhZ3MgPSBBdHRyaWJ1dGVUYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGNsYXNzZXMgdG8gYWRkIHRvIGFsbCBlbWFpbCBpbnB1dHMgXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCB1aSBhdHRyaWJ1dGVzIHRvIGFkZCB0byB0aGlzIGVtYWlsIGlucHV0IFxyXG4gICAgKiB0aGF0IGFyZW4ndCBjb3ZlcmVkIGJ5IHRoZSB0YWdzIG9yIGVycm9ycyBhYm92ZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEhUTUwgdG8gcmVuZGVyIGFuIGVtYWlsIGlucHV0IGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBmcm9tIHRoZSBcclxuICAgICAqIGNvbnN0cnVjdG9yLiBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvL0RhdGEgXHJcbiAgICAgKiBpbnB1dC5sYWJlbCA9IFwiPGgxPkxhYmVsPC9oMT5cIjtcclxuICAgICAqIHNldHRpbmdzLmNsYXNzZXMgPSBcImNsYXNzLTFcIjtcclxuICAgICAqIGVycm9ycy50YWdzID0gXCJyZXF1aXJlZD0ndHJ1ZSdcIjtcclxuICAgICAqIEVtYWlsLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogLy8gUmVuZGVycyBcclxuICAgICAqIDxsYWJlbD5cclxuICAgICAqICAgICAgPGgxPkxhYmVsPC9oMT5cclxuICAgICAqIDwvbGFiZWw+XHJcbiAgICAgKiA8aW5wdXQgY2xhc3M9XCJjbGFzcy0xIHVpLWNsYXNzZXMtMVwiIHR5cGU9XCJlbWFpbFwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIGxhYmVsSFRNTCwgbmFtZSA9ICcnLCBpZCA9ICcnfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNsYXNzZXMgPSBgJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31gO1xyXG5cclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cImVtYWlsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7U3R5bGV9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBmb3JtIHdyYXBwZXIgYXJvdW5kIHRoZXNlIGlucHV0cyBhbmQgYSBcclxuICogc3VibWl0IGJ1dHRvbiB0byBzdWJtaXQgdGhlIGZvcm0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSB2YXJpb3VzIGRhdGEgdG8gcmVuZGVyIHRoaXMgZm9ybS5cclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGlucHV0SFRNTCAtIEFsbCBpbnB1dCBkYXRhIHRvIGJlIGFkZGVkIHRvIHRoaXMgZm9ybSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gbmFtZSBvZiB0aGlzIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkaXRpb25hbEF0dHJIVE1MIC0gQXR0cmlidXRlcyB0aGF0IG5lZWQgdG8gYmUgXHJcbiAgICAgKiBhZGRlZCB0byB0aGUgZm9ybSBwcmltYXJpbHkgdXNlZCBmb3IgdmFsaWRhdGlvbiBhbmQgc3VibWl0IGZ1bmN0aW9ucy5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZXR0aW5ncyAtIEdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBmb3JtLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dEhUTUwsIG5hbWUsIGFkZGl0aW9uYWxBdHRySFRNTCwgc2V0dGluZ3MsIHN0eWxlID0gU3R5bGUpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWxsIGlucHV0IGh0bWwgaW5mb3JtYXRpb24gZm9yIHRoaXMgXHJcbiAgICAgICAgICogZm9ybVxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbnB1dEhUTUwgPSBpbnB1dEhUTUw7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hbWUgZm9yIHRoaXMgZm9ybSBcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZGl0aW9uYWwgdGFncyB0byBhZGQgdG8gdGhpcyBmb3JtIFxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsQXR0ckhUTUwgPSBhZGRpdGlvbmFsQXR0ckhUTUw7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHRpbmdzIGZvciB0aGlzIGVudGlyZSBmb3JtIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR0aW5ncyBmb3IgdGhpcyBzdWJtaXQgYnV0dG9uIFxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdWJtaXQgPSBzZXR0aW5ncy5zdWJtaXQ7XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IG5ldyBzdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW55IGRlZmF1bHQgVUkgY2xhc3NlcyB0byBhZGQgdG8gdGhpcyBmb3JtIFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGZvcm1DbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAncm93J1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgSFRNTCB0byByZW5kZXIgdGhlIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIEZvcm0uc2V0dGluZ3MgPSB7XHJcbiAgICAgKiAgICAgc3VibWl0IDoge1xyXG4gICAgICogICAgICAgICBsYWJlbCA6IFwiTXkgbmV3IHN1Ym1pdCBsYWJlbFwiLFxyXG4gICAgICogICAgICAgICBpbnB1dCA6IHtcclxuICAgICAqICAgICAgICAgICAgY2xhc3NlcyA6IFwibXktc3VibWl0LWlucHV0XCJcclxuICAgICAqICAgICAgICAgfSxcclxuICAgICAqICAgICAgICAgY29udGFpbmVyIDoge1xyXG4gICAgICogICAgICAgICAgICAgY2xhc3NlcyA6IFwibXktc3VibWl0LWNvbnRhaW5lclwiXHJcbiAgICAgKiAgICAgICAgIH1cclxuICAgICAqICAgICB9XHJcbiAgICAgKiB9O1xyXG4gICAgICogXHJcbiAgICAgKiAvL1dpbGwgUmVuZGVyIFxyXG4gICAgICogXHJcbiAgICAgKiA8ZGl2IGNsYXNzPVwiaXZ4anMtZ3JpZC0xLTEgbXktc3VibWl0LWNvbnRhaW5lclwiPlxyXG4gICAgICogICAgIDxidXR0b24gY2xhc3M9XCJteS1zdWJtaXQtaW5wdXRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgKiAgICAgICAgICBNeSBuZXcgc3VibWl0IGxhYmVsIFxyXG4gICAgICogICAgIDwvYnV0dG9uPlxyXG4gICAgICogPC9kaXY+XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBzdWJtaXRCdXR0b25IVE1MKCkge1xyXG4gICAgICAgIGxldCB7c3VibWl0ID0ge319ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsOiBzdWJtaXRMYWJlbCA9IFwiU3VibWl0XCIsIGxhYmVsSFRNTDogc3VibWl0TGFiZWxIVE1MLCBpbnB1dDogc3VibWl0SW5wdXQgPSB7fSwgY29udGFpbmVyOiBzdWJtaXRDb250YWluZXIgPSB7fSwgYXR0cmlidXRlcyA9ICcnfSA9IHN1Ym1pdDtcclxuICAgICAgICBsZXQge2NsYXNzZXM6IHN1Ym1pdElucHV0Q2xhc3NlcyA9IFwiXCJ9ID0gc3VibWl0SW5wdXQ7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzdWJtaXRDb250YWluZXJDbGFzc2VzID0gXCJcIn0gPSBzdWJtaXRDb250YWluZXI7XHJcblxyXG4gICAgICAgIHN1Ym1pdExhYmVsID0gc3VibWl0TGFiZWxIVE1MID8gc3VibWl0TGFiZWxIVE1MIDogc3VibWl0TGFiZWw7XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXRIVE1MID0gc3VibWl0TGFiZWwubGVuZ3RoID49IDAgP1xyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdnhqcy1ncmlkLTEtMSAke3N1Ym1pdENvbnRhaW5lckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCIke3N1Ym1pdElucHV0Q2xhc3Nlc31cIiB0eXBlPSdzdWJtaXQnICR7YXR0cmlidXRlc30+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtzdWJtaXRMYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgIDogJyc7XHJcblxyXG4gICAgICAgIHJldHVybiBzdWJtaXRIVE1MO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBlYWNoIGlucHV0J3MgaHRtbCBpbnRvIGEgY29udGFpbmVyIHNvIHRoZXkgY2FuIGJlIGZvcm1hdHRlZCBjb3JyZWN0bHlcclxuICAgICAqIHV0aWxpemluZyB0aGUgaXZ4anMuY3NzJ3MgZ3JpZCBzeXN0ZW0uXHJcbiAgICAgKiBAdHlwZXtTdHJpbmd9IFxyXG4gICAgICovXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0SFRNTCwgbmFtZSwgYWRkaXRpb25hbEF0dHJIVE1MLCBzZXR0aW5ncywgZm9ybUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge3N1Ym1pdCA9IHt9LCBjbGFzc2VzOiBjb25maWdGb3JtQ2xhc3NlcyA9ICcnLCBpZCA6IGZvcm1JZCwgbGFiZWwgPSAnJywgbGFiZWxIVE1MfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZihsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5oaWRlU3VibWl0KSB7XHJcbiAgICAgICAgICAgIGlucHV0SFRNTC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiBzdWJtaXQsXHJcbiAgICAgICAgICAgICAgICBodG1sOiB0aGlzLnN1Ym1pdEJ1dHRvbkhUTUxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29udGVudHMgPSB0aGlzLnN0eWxlLmFkZFdpZHRoQ2xhc3NlcyhpbnB1dEhUTUwpO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAke2xhYmVsfVxyXG4gICAgICAgICAgICA8Zm9ybSBpZD1cIiR7Zm9ybUlkfS1mb3JtXCIgY2xhc3M9XCIke2Zvcm1DbGFzc2VzfSAke2NvbmZpZ0Zvcm1DbGFzc2VzfVwiIG5vdmFsaWRhdGUgbmFtZT1cIiR7bmFtZX1cIiAke2FkZGl0aW9uYWxBdHRySFRNTH0+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHtjb250ZW50c31cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogSW5kaWNhdGVzIGVycm9ycyBmb3IgZWFjaCBpbnB1dCBiYXNlZCBvbiB0aGUgXHJcbiAqIGF0dHJpYnV0ZXMgY3JlYXRlZCBmcm9tIHRoZSB2YXJpb3VzIHJlbmRlcmluZyBsaWJyYXJpZXNcclxuICogaVZYanMgdXNlcy4gXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlcyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcmluZ3MgaW4gYWxsIHRoZSBwb3NzaWJsZSBlcnJvciBtZXNzYWdlcyBcclxuICAgICAqIHRoaXMgaW5wdXQgY2FuIHByb2R1Y2UuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGVycm9yTWVzc2FnZXMgLSBsaXN0IG9mIGFsbCBwb3NzaWJsZSBcclxuICAgICAqIGVycm9yIG1lc3NhZ2VzIHdpdGggYXR0cmlidXRlcyBpbmRpY2F0aW5nIHRoZSBtZXNzYWdlIFxyXG4gICAgICogYW5kIHRoZSBjb25kaXRpb25zIGluIHdoaWNoIHRvIHNob3cgdGhlbS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JNZXNzYWdlcyA9IFtdKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExpc3Qgb2YgYWxsIHBvc3NpYmxlIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNsYXNzZXMgZm9yIHRoZSBlcnJvciBtZXNzYWdlIGRpdi5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9IFxyXG4gICAgICovXHJcbiAgICBnZXQgbWVzc2FnZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICdlcnJvci1tZXNzYWdlJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgY2xhc3NlcyBmb3IgdGhlIGNvbnRhaW5lciBvZiBhbGwgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgY29udGFpbmVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJ2Vycm9yLW1lc3NhZ2VzJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIEhUTUwgZm9yIGFsbCBlcnJvciBtZXNzYWdlcyBhbmQgdGhlIGNvbnRhaW5lciB3aXRoIFxyXG4gICAgICogdGhlbS4gUmVzdWx0czpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZXNcIj5cclxuICAgICAqICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPk1FU1NBR0U8L3NwYW4+XHJcbiAgICAgKiA8L2Rpdj5cclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3JNZXNzYWdlcywgbWVzc2FnZUNsYXNzZXMsIGNvbnRhaW5lckNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlSFRNTCA9IGVycm9yTWVzc2FnZXMucmVkdWNlKChlcnJvck1lc3NhZ2VIVE1MLCBlcnJvck1lc3NhZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtlcnJvck1lc3NhZ2VIVE1MfTxzcGFuIGNsYXNzPVwiJHttZXNzYWdlQ2xhc3Nlc31cIiAke2Vycm9yTWVzc2FnZS5hdHRySFRNTH0+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtlcnJvck1lc3NhZ2UubWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5gXHJcbiAgICAgICAgfSwgJycpO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlSFRNTC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nJHtjb250YWluZXJDbGFzc2VzfSc+XHJcbiAgICAgICAgICAgICAgICAke2Vycm9yTWVzc2FnZUhUTUx9XHJcbiAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufSIsImltcG9ydCB7RXJyb3JNZXNzYWdlc30gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHtBdHRyaWJ1dGVUYWdzfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbnVtYmVyIGlucHV0IHRoYXQgd2lsbCByZWNvcmQgbnVtYmVycyAgXHJcbiAqIGZvciBpVlhqcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbiBpbnB1dCBvYmplY3Qgd2l0aCB2YXJpb3VzIGlucHV0IHNldHRpbmdzIGFuZCBVSSBzcGVjaWZpYyBlcnJvciBcclxuICAgICAqIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRPYmogLSB2YXJpb3VzIGlucHV0IHNldHRpbmdzIHRvIHJlbmRlciB0aGlzIG51bWJlciBpbnB1dCBib3hcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5pbnB1dCAtIGlucHV0IHNwZWNpZmljIHNldHRpbmdzIGZvciB0aGlzIG51bWJlciBpbnB1dCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dE9iai5zZXR0aW5ncyAtIGdsb2JhbCBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRPYmoudGFncyAtIGlucHV0IHNwZWNpZmljIGF0dHJpYnV0ZSB0YWdzIFxyXG4gICAgICogQHBhcmFtIHtjbGFzc30gaW5wdXRPYmouZXJyb3JzIC0gZXJyb3JzIGZyb20gYSByZW5kZXJpbmcgZm9yIHZhbGlkYXRpb24gYW5kIFxyXG4gICAgICogZXJyb3IgbWVzc2FnaW5nIGFwcGVhcmFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JNZXNzYWdlcyAtIFVJIHNwZWNpZmljIEVycm9yIG1lc3NhZ2VzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dE9iaiA9IHt9LCBlcnJvck1lc3NhZ2VzID0gRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIGxldCB7aW5wdXQgPSB7fSwgc2V0dGluZ3MgPSB7fSwgdGFncyA9IHt9LCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5wdXQgc3BlY2lmaWMgc2V0dGluZ3MgZm9yIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBJbnB1dCBzcGVjaWZpYyBzZXR0aW5ncyBmb3IgdGhpcyBudW1iZXIgaW5wdXRcclxuICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBUYWdzIHRvIGJlIGFkZGVkIHRvIHRoaXMgbnVtYmVyIGlucHV0XHJcbiAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIb2xkcyBhbGwgdmFsaWRhdGlvbiBlcnJvciBjb3JyZWN0aW5nLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogUmVuZGVycyBVSSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlcyBieSB1dGlsaXppbmcgdGhlIFxyXG4gICAgICAgICogZXJyb3IgY2xhc3MgcGFzc2VkIGRvd24gdG8ga2VlcCBpdCBjb25zaXN0ZW50IHdpdGggdGhlIFxyXG4gICAgICAgICogY3VycmVudCBVSSBmcmFtZXdvcmsuXHJcbiAgICAgICAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIENvbnZlcnRzIGF0dHJpYnV0ZSBkYXRhIGludG8gYXR0cmlidXRlIEhUTUwgZm9yIFxyXG4gICAgICAgICogYXR0cmlidXRlcyBub3QgY292ZXJlZCBieSB0aGUgZXJyb3JzIGNsYXNzLlxyXG4gICAgICAgICogQHR5cGUge0NsYXNzfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUYWdzID0gQXR0cmlidXRlVGFncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgdWkgY2xhc3NlcyB0byBhZGQgdG8gYWxsIG51bWJlciBpbnB1dHMgXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdWlDbGFzc2VzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHVpIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIHRoaXMgZW1haWwgaW5wdXQgXHJcbiAgICAqIHRoYXQgYXJlbid0IGNvdmVyZWQgYnkgdGhlIHRhZ3Mgb3IgZXJyb3JzIGFib3ZlLlxyXG4gICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgKi9cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCB0byByZW5kZXIgYSBudW1iZXIgaW5wdXQgYmFzZWQgb24gdGhlIHNldHRpbmdzIGZyb20gdGhlIFxyXG4gICAgICogY29uc3RydWN0b3IuIFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIC8vRGF0YSBcclxuICAgICAqIGlucHV0LmxhYmVsID0gXCI8aDE+TGFiZWw8L2gxPlwiO1xyXG4gICAgICogc2V0dGluZ3MuY2xhc3NlcyA9IFwiY2xhc3MtMVwiO1xyXG4gICAgICogZXJyb3JzLnRhZ3MgPSBcInJlcXVpcmVkPSd0cnVlJ1wiO1xyXG4gICAgICogTnVtYmVyLnVpQ2xhc3NlcyA9ICd1aS1jbGFzc2VzLTEnO1xyXG4gICAgICogaW5wdXQuYXR0cmlidXRlcyA9IHtcclxuICAgICAqICAgICBcInN0ZXBcIiA6IFwiMC4xXCJcclxuICAgICAqIH1cclxuICAgICAqIC8vIFJlbmRlcnMgXHJcbiAgICAgKiA8bGFiZWw+XHJcbiAgICAgKiAgICAgIDxoMT5MYWJlbDwvaDE+XHJcbiAgICAgKiA8L2xhYmVsPlxyXG4gICAgICogPGlucHV0IHN0ZXA9XCIwLjFcIiBjbGFzcz1cImNsYXNzLTEgdWktY2xhc3Nlcy0xXCIgdHlwZT1cIm51bWJlclwiIHJlcXVpcmVkPVwidHJ1ZVwiPlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgc2V0dGluZ3MsIHRhZ3MsIGVycm9ycywgdWlDbGFzc2VzLCB1aUF0dHJpYnV0ZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2xhYmVsID0gJycsIG5hbWUgPSAnJywgaWQgPSAnJywgbGFiZWxIVE1MfSA9IGlucHV0O1xyXG4gICAgICAgIGxldCB7aW5wdXQ6IGlucHV0U2V0dGluZ3MgPSB7fSwgc2hvd0xhYmVsID0gdHJ1ZX0gPSBzZXR0aW5ncztcclxuICAgICAgICBsZXQge2NsYXNzZXMgPSAnJ30gPSBpbnB1dFNldHRpbmdzO1xyXG5cclxuICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHt1aUNsYXNzZXN9YDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwibnVtYmVyXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnMge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmosIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCwgZGVmYXVsdERpc3BsYXkgPSAnJywgc2V0dGluZ3MgPSB7fSwgdGFncyA9ICcnLCBlcnJvcnMgPSB7fX0gPSBpbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0RGlzcGxheSA9IGRlZmF1bHREaXNwbGF5O1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7dGFncywgaW5wdXQsIGRlZmF1bHREaXNwbGF5LCBlcnJvcnMsIHNldHRpbmdzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7aWQsIG5hbWUsIG9wdGlvbnMsIGxhYmVsID0gJycsIGxhYmVsSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvblRhZyA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGFuIG9wdGlvbi4uLjwvb3B0aW9uPmA7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IGAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7dWlBdHRyaWJ1dGVzfWA7XHJcblxyXG4gICAgICAgIGlmIChlcnJvckF0dHJpYnV0ZXMucmVxdWlyZWQgfHwgKGRlZmF1bHREaXNwbGF5ICYmIGRlZmF1bHREaXNwbGF5Lmxlbmd0aCA+PSAwKSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9uVGFnID0gZGVmYXVsdERpc3BsYXkgP1xyXG4gICAgICAgICAgICAgICAgYDxvcHRpb24gdmFsdWU9XCJcIj4ke2RlZmF1bHREaXNwbGF5fTwvb3B0aW9uPmAgOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvblRhZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uc0hUTUwgPSBvcHRpb25zLnJlZHVjZSgob3B0aW9uSFRNTCwgb3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtvcHRpb25IVE1MfVxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24udmFsdWV9XCI+JHtvcHRpb24uZGlzcGxheX08L29wdGlvbj5gXHJcbiAgICAgICAgfSwgJycpXHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7aWR9XCI+JHtsYWJlbH08L2xhYmVsPiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cIiR7Y2xhc3Nlc31cIiAgaWQ9XCIke2lkfVwiIG5hbWU9XCIke25hbWV9XCIke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAgICAgICAke2RlZmF1bHRPcHRpb25UYWd9XHJcbiAgICAgICAgICAgICAgICAgICR7b3B0aW9uc0hUTUx9XHJcbiAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aW5wdXRIVE1MfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhZGlvIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGlvSW5wdXRPYmosIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LCByYWRpb3MgPSBbXSwgZXJyb3JzID0ge30sIHNldHRpbmdzID0ge319ID0gcmFkaW9JbnB1dE9iajtcclxuXHJcbiAgICAgICAgdGhpcy5yYWRpb3MgPSByYWRpb3M7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgdWlSYWRpb0dyb3VwKHJhZGlvc0hUTUwpIHtcclxuICAgICAgICByZXR1cm4gcmFkaW9zSFRNTDtcclxuICAgIH07XHJcblxyXG4gICAgdWlSYWRpb0J1dHRvbkNvbnRhaW5lcihyYWRpb0hUTUwsIHVpQ2xhc3Nlcykge1xyXG4gICAgICAgIHJldHVybiBgIFxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cIiR7dWlDbGFzc2VzfVwiPlxyXG4gICAgICAgICR7cmFkaW9IVE1MfVxyXG4gICAgICAgIDwvbGFiZWw+YDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYWRpb0hUTUwoYXR0ckhUTUwsIGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiAke2F0dHJIVE1MfT5cclxuICAgICAgICAgICAgJHtsYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcnMsIHJhZGlvcywgc2V0dGluZ3MsIGlucHV0LCB1aUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzLCB0YWdzOiBlcnJvclRhZ3MgPSBcIlwifSA9IGVycm9ycztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbDogaW5wdXRMYWJlbCwgbGFiZWxIVE1MOiBpbnB1dExhYmxlSFRNTH0gPSBpbnB1dDtcclxuICAgICAgICBsZXQgeyBzaG93TGFiZWwgPSB0cnVlfSA9IHNldHRpbmdzO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRMYWJsZUhUTUwpIGlucHV0TGFiZWwgPSBpbnB1dExhYmxlSFRNTDtcclxuXHJcbiAgICAgICAgbGV0IHJhZGlvc0hUTUwgPSByYWRpb3MucmVkdWNlKChodG1sLCByYWRpbykgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2xhYmVsLCBhdHRySFRNTCA9ICcnLCBjbGFzc2VzID0gJyd9ID0gcmFkaW87XHJcblxyXG4gICAgICAgICAgICBhdHRySFRNTCA9IGAke2F0dHJIVE1MfSAke2Vycm9yVGFnc31gO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhZGlvSFRNTCA9IHNlbGYucmVuZGVyUmFkaW9IVE1MKGF0dHJIVE1MLCBsYWJlbCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aHRtbH1cclxuICAgICAgICAgICAgJHtzZWxmLnVpUmFkaW9CdXR0b25Db250YWluZXIocmFkaW9IVE1MLCBgJHt1aUNsYXNzZXN9ICR7Y2xhc3Nlc31gKX1gO1xyXG4gICAgICAgIH0sIGlucHV0TGFiZWwpO1xyXG4gICAgICAgIGxldCBlcnJvckhUTUwgPSBuZXcgdGhpcy5lcnJvck1lc3NhZ2VzKGVycm9yTWVzc2FnZXMpLmh0bWw7XHJcbiAgICAgICAgbGV0IGFsbFJhZGlvQnV0dG9uc0hUTUwgPSBgXHJcbiAgICAgICAgICAgICAke3JhZGlvc0hUTUx9XHJcbiAgICAgICAgICAgICAke2Vycm9ySFRNTH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy51aVJhZGlvR3JvdXAoYWxsUmFkaW9CdXR0b25zSFRNTCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW5wdXRTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU2VjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZm9ybVNlY3Rpb24gPSBmb3JtU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVmYXVsdEZvb3RlckNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRlZmF1bHRTZWN0aW9uQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgbGV0IHtmb3JtU2VjdGlvbiwgZGF0YSwgZGVmYXVsdEZvb3RlckNsYXNzZXMsIGRlZmF1bHRIZWFkZXJDbGFzc2VzLCBkZWZhdWx0U2VjdGlvbkNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQge2hlYWRlciA9IHt9LCBmb290ZXIgPSB7fSwgc2VjdGlvbiA9IHt9fSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBoZWFkZXJDbGFzc2VzID0gJycsIGh0bWw6IGhlYWRlckhUTUwgPSBgPGgxPiR7ZGF0YS5uYW1lfTwvaDE+YH0gPSBoZWFkZXI7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBzZWN0aW9uQ2xhc3NlcyA9ICcnIH0gPSBzZWN0aW9uO1xyXG4gICAgICAgIGxldCB7Y2xhc3NlczogZm9vdGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBmb290ZXJIVE1MID0gJyd9ID0gZm9vdGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIiR7c2VjdGlvbkNsYXNzZXN9ICR7ZGVmYXVsdFNlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCIke2hlYWRlckNsYXNzZXN9ICR7ZGVmYXVsdEhlYWRlckNsYXNzZXN9XCI+JHtoZWFkZXJIVE1MfTwvaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgJHtmb3JtU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCIke2Zvb3RlckNsYXNzZXN9ICR7ZGVmYXVsdEZvb3RlckNsYXNzZXN9XCI+JHtmb290ZXJIVE1MfTwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tICcuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxpbmtTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGlua1NlY3Rpb24gPSBsaW5rU2VjdGlvblxuICAgIH1cblxuICAgIGdldCBkZWZhdWx0SGVhZGVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0Rm9vdGVyQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0U2VjdGlvbkNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdExpbmtDb250YWluZXJDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKSB7XG4gICAgICAgIGxldCB7ZGF0YSwgbGlua1NlY3Rpb24sIGRlZmF1bHRGb290ZXJDbGFzc2VzLCBkZWZhdWx0SGVhZGVyQ2xhc3NlcywgZGVmYXVsdFNlY3Rpb25DbGFzc2VzLCBkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXN9ID0gdGhpcztcbiAgICAgICAgbGV0IHtoZWFkZXIgPSB7fSwgZm9vdGVyID0ge30sIHNlY3Rpb24gPSB7fSwgbGlua0NvbnRhaW5lciA9IHt9fSA9IGRhdGE7XG4gICAgICAgIGxldCB7Y2xhc3NlczogaGVhZGVyQ2xhc3NlcyA9ICcnLCBodG1sOiBoZWFkZXJIVE1MID0gYGB9ID0gaGVhZGVyO1xuICAgICAgICBsZXQge2NsYXNzZXM6IHNlY3Rpb25DbGFzc2VzID0gJyd9ID0gc2VjdGlvbjtcbiAgICAgICAgbGV0IHtjbGFzc2VzOiBmb290ZXJDbGFzc2VzID0gJycsIGh0bWw6IGZvb3RlckhUTUwgPSAnJ30gPSBmb290ZXI7XG4gICAgICAgIGxldCB7Y2xhc3NlczogbGlua0NvbnRhaW5lckNsYXNzZXMgPSAnJywgYXR0cmlidXRlczogbGlua0NvbnRhaW5lckF0dHJpYnV0ZXMgPSB7fX0gPSBsaW5rQ29udGFpbmVyO1xuICAgICAgICBsZXQgbGlua0NvbnRhaW5lckF0dHJpYnV0ZUhUTUwgPSBuZXcgQXR0cmlidXRlVGFncyhsaW5rQ29udGFpbmVyQXR0cmlidXRlcywgT2JqZWN0LmtleXMobGlua0NvbnRhaW5lckF0dHJpYnV0ZXMpKS5odG1sO1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIiR7c2VjdGlvbkNsYXNzZXN9ICR7ZGVmYXVsdFNlY3Rpb25DbGFzc2VzfVwiIGlkPVwiJHtkYXRhLmlkfVwiPlxuICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiJHtoZWFkZXJDbGFzc2VzfSAke2RlZmF1bHRIZWFkZXJDbGFzc2VzfVwiPiR7aGVhZGVySFRNTH08L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nJHtkZWZhdWx0TGlua0NvbnRhaW5lckNsYXNzZXN9ICR7bGlua0NvbnRhaW5lckNsYXNzZXN9JyAke2xpbmtDb250YWluZXJBdHRyaWJ1dGVIVE1MfT5cbiAgICAgICAgICAgICAgICAgICAgJHtsaW5rU2VjdGlvbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiJHtmb290ZXJDbGFzc2VzfSAke2RlZmF1bHRGb290ZXJDbGFzc2VzfVwiPiR7Zm9vdGVySFRNTH08L2Zvb3Rlcj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgU3R5bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIGdldFdpZHRoKHdpZHRoKSB7XHJcbiAgICAgICAgaWYgKHdpZHRoID09PSAnMScpIHJldHVybiAnaXZ4anMtZ3JpZC0xLTEnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBncmlkU3RyaW5nID0gd2lkdGgucmVwbGFjZSgnLycsICctJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBgaXZ4anMtZ3JpZC0ke2dyaWRTdHJpbmd9YDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2lucHV0LWNvbnRhaW5lcic7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2lkdGhDbGFzc2VzKGlucHV0c0hUTUwpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjb250YWluZXJDbGFzc2VzID0gJyd9ID0gdGhpcztcclxuICAgICAgICBsZXQgY29udGVudHMgPSBpbnB1dHNIVE1MLnJlZHVjZSgoY3VycmVudEhUTUwsIGlucHV0SFRNTCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2h0bWwsIHNldHRpbmdzID0ge319ID0gaW5wdXRIVE1MO1xyXG4gICAgICAgICAgICBsZXQge3dpZHRoID0gJzEnLCBjb250YWluZXI9e319ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGxldCB7Y2xhc3Nlcz0nJ30gPSBjb250YWluZXI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjbGFzc2VzID0gYCR7Y2xhc3Nlc30gJHtjb250YWluZXJDbGFzc2VzfWBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0aGlzV2lkdGggPSBzZWxmLmdldFdpZHRoKHdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoXCJpdnhqcy1ncmlkLTEtMVwiLCBgJHt0aGlzV2lkdGh9ICR7Y2xhc3Nlc31gKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50SFRNTH0gJHtodG1sfWA7XHJcbiAgICAgICAgfSwgJycpXHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50cztcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0eWxlIH0gZnJvbSBcIi4vc3R5bGVcIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlcyB9IGZyb20gXCIuL21lc3NhZ2VzLmpzXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2F0dHJpYnV0ZXMuanNcIjtcclxuXHJcbmxldCBzdHlsZSA9IG5ldyBTdHlsZSgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuXHJcbiAgICAgICAgY2xhc3NlcyA9IGAke2NsYXNzZXN9ICR7dWlDbGFzc2VzfWA7XHJcblxyXG4gICAgICAgIGxldCB7bWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgPSBbXSwgYXR0cmlidXRlczogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3M6IGVycm9yVGFncyA9ICcnfSA9IGVycm9ycztcclxuICAgICAgICBsZXQgZXJyb3JIVE1MID0gbmV3IHRoaXMuZXJyb3JNZXNzYWdlcyhlcnJvck1lc3NhZ2VzKS5odG1sO1xyXG4gICAgICAgIGxldCBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gbmV3IHRoaXMuYXR0cmlidXRlVGFncyhlcnJvckF0dHJpYnV0ZXMsIG5vblZhbGlkYXRlKS5odG1sO1xyXG5cclxuICAgICAgICBub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MID0gYCR7bm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTH0gJHt1aUF0dHJpYnV0ZXN9YDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAgdHlwZT1cInRleHRcIiAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dGFyZWEge1xyXG4gICAgY29uc3RydWN0b3IoaW5wdXRPYmogPSB7fSwgZXJyb3JNZXNzYWdlcyA9IEVycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICBsZXQge2lucHV0ID0ge30sIHNldHRpbmdzID0ge30sIHRhZ3MgPSB7fSwgZXJyb3JzID0ge319ID0gaW5wdXRPYmo7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVpQ2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdWlBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCkge1xyXG4gICAgICAgIGxldCB7aW5wdXQsIHNldHRpbmdzLCB0YWdzLCBlcnJvcnMsIHVpQ2xhc3NlcywgdWlBdHRyaWJ1dGVzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtsYWJlbCA9ICcnLCBsYWJlbEhUTUwsIG5hbWUgPSAnJywgaWQgPSAnJ30gPSBpbnB1dDtcclxuICAgICAgICBsZXQge2lucHV0OiBpbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQge21lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzID0gW10sIGF0dHJpYnV0ZXM6IGVycm9yQXR0cmlidXRlcyA9ICcnLCBub25WYWxpZGF0ZSA9IFtdLCB0YWdzOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsSFRNTCkgbGFiZWwgPSBsYWJlbEhUTUw7XHJcblxyXG4gICAgICAgIGxhYmVsID0gc2hvd0xhYmVsID8gbGFiZWwgOiAnJztcclxuXHJcbiAgICAgICAgbGV0IGlucHV0SFRNTCA9IGAgXHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2lkfVwiPiAke2xhYmVsfSA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCIke2NsYXNzZXN9ICR7dWlDbGFzc2VzfVwiICBpZD1cIiR7aWR9XCIgbmFtZT1cIiR7bmFtZX1cIiAke3VpQXR0cmlidXRlc30gICAke25vblZhbGlkYXRlQXR0cmlidXRlc0hUTUx9ICAgJHtlcnJvclRhZ3N9ICR7dGFnc30+XHJcbiAgICAgICAgICAgIDwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICR7ZXJyb3JIVE1MfVxyXG4gICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2lucHV0SFRNTH1gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9zdHlsZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMuanNcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlVGFncyB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXR0cmlidXRlcy5qc1wiO1xyXG5cclxubGV0IHN0eWxlID0gbmV3IFN0eWxlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0T2JqID0ge30sIGVycm9yTWVzc2FnZXMgPSBFcnJvck1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IHtpbnB1dCA9IHt9LHNldHRpbmdzID0ge30sdGFncyA9IHt9LGVycm9ycyA9IHt9fSA9IGlucHV0T2JqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBlcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVGFncyA9IEF0dHJpYnV0ZVRhZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB1aUF0dHJpYnV0ZXMoKXtcclxuICAgICAgICByZXR1cm4gJydcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpIHtcclxuICAgICAgICBsZXQge2lucHV0LCBzZXR0aW5ncywgdGFncywgZXJyb3JzLCB1aUNsYXNzZXMsIHVpQXR0cmlidXRlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7bGFiZWwgPSAnJywgbGFiZWxIVE1MLCBuYW1lID0gJycsIGlkID0gJyd9ID0gaW5wdXQ7XHJcbiAgICAgICAgbGV0IHtpbnB1dDppbnB1dFNldHRpbmdzID0ge30sIHNob3dMYWJlbCA9IHRydWV9ID0gc2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHtjbGFzc2VzID0gJyd9ID0gaW5wdXRTZXR0aW5ncztcclxuICAgICAgICBsZXQge21lc3NhZ2VzIDogZXJyb3JNZXNzYWdlcyA9IFtdLCBhdHRyaWJ1dGVzIDogZXJyb3JBdHRyaWJ1dGVzID0gJycsIG5vblZhbGlkYXRlID0gW10sIHRhZ3MgOiBlcnJvclRhZ3MgPSAnJ30gPSBlcnJvcnM7XHJcbiAgICAgICAgbGV0IGVycm9ySFRNTCA9IG5ldyB0aGlzLmVycm9yTWVzc2FnZXMoZXJyb3JNZXNzYWdlcykuaHRtbDtcclxuICAgICAgICBsZXQgbm9uVmFsaWRhdGVBdHRyaWJ1dGVzSFRNTCA9IG5ldyB0aGlzLmF0dHJpYnV0ZVRhZ3MoZXJyb3JBdHRyaWJ1dGVzLCBub25WYWxpZGF0ZSkuaHRtbDtcclxuICAgICAgICBcclxuICAgICAgICBpZihsYWJlbEhUTUwpIGxhYmVsID0gbGFiZWxIVE1MO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dEhUTUwgPSBgIFxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtpZH1cIj4gJHtsYWJlbH0gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiJHtjbGFzc2VzfSAke3VpQ2xhc3Nlc31cIiAke3VpQXR0cmlidXRlc30gIGlkPVwiJHtpZH1cIiBuYW1lPVwiJHtuYW1lfVwiICB0eXBlPVwidXJsXCIgJHtub25WYWxpZGF0ZUF0dHJpYnV0ZXNIVE1MfSAgICR7ZXJyb3JUYWdzfSAke3RhZ3N9PlxyXG4gICAgICAgICAgICAke2Vycm9ySFRNTH1cclxuICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtpbnB1dEhUTUx9YDtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29udHJvbHN9IGZyb20gJy4uLy4uL3ZpZGVvL2NvbnRyb2xzL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbHMge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihjb250YWluZXIuaHRtbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKXtcclxuICAgICAgICAgICAgY29udGFpbmVyLmh0bWwodGhpcy5odG1sKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gdGhpcy5odG1sO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHRvdGFsVGltZUluZm9DbGFzc2VzLFxyXG4gICAgICAgICAgICBjdXJyZW50VGltZUluZm9DbGFzc2VzLFxyXG4gICAgICAgICAgICBzY3J1YkJhckNsYXNzZXMsXHJcbiAgICAgICAgICAgIG11dGVDb250cm9sc0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHZvbHVtZUJhckNsYXNzZXMgICAgICAgICAgICBcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnBsYXlQYXVzZUNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1wbGF5LXBhdXNlXCIpO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tY29udHJvbHMtdG90YWwtdGltZVwiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5mbyA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLWN1cnJlbnQtdGltZVwiKTtcclxuICAgICAgICB0aGlzLnNjcnViQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIik7XHJcbiAgICAgICAgdGhpcy5tdXRlQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIik7XHJcbiAgICAgICAgdGhpcy52b2x1bWVCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLWNvbnRyb2xzLXZvbHVtZS1iYXJcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3BsYXktcGF1c2UnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdG90YWxUaW1lSW5mb0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2R1cmF0aW9uJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGN1cnJlbnRUaW1lSW5mb0NsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ2N1cnJlbnQtdGltZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBzY3J1YkJhckNsYXNzZXMoKXtcclxuICAgICAgICByZXR1cm4gJ3NjcnViLWJhcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBtdXRlQ29udHJvbHNDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdtdXRlJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdm9sdW1lQmFyQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAndm9sdW1lLWJhcidcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBsYXlDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS1wbGF5JztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHBhdXNlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtcGF1c2UnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdW5tdXRlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnZmEgZmEtdm9sdW1lLXVwJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG11dGVDbGFzc2VzKCl7XHJcbiAgICAgICAgcmV0dXJuICdmYSBmYS12b2x1bWUtb2ZmJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiBgdGltZS1sYXBzZWRgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlcygpe1xyXG4gICAgICAgIHJldHVybiAnY3VycmVudC12b2x1bWUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcGxheVBhdXNlQnV0dG9uSFRNTCgpe1xyXG4gICAgICAgIGxldCB7cGxheUNsYXNzZXMgOiBwbGF5fSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9sc0NsYXNzZXMgOiBwbGF5UGF1c2VDb250cm9sc30gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLXBsYXktcGF1c2VcIiBjbGFzcz1cIiR7cGxheVBhdXNlQ29udHJvbHN9XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPScke3BsYXl9Jz48L2k+XHJcbiAgICAgICAgPC9idXR0b24+YFxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICBnZXQgc2NydWJCYXJIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWRlby1jb250cm9scy1zY3J1Yi1iYXJcIiBjbGFzcz1cIiR7dGhpcy5zY3J1YkJhckNsYXNzZXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0aGlzLnNjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc31cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdGltZXN0YW1wSFRNTCgpe1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ2aWRlby1jb250cm9scy1jdXJyZW50LXRpbWVcIiBjbGFzcz1cIiR7dGhpcy5jdXJyZW50VGltZUluZm9DbGFzc2VzfVwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBpZD1cInZpZGVvLWNvbnRyb2xzLXRvdGFsLXRpbWVcIiBjbGFzcz1cIiR7dGhpcy50b3RhbFRpbWVJbmZvQ2xhc3Nlc31cIj48L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IG11dGVCdXR0b25IVE1MKCl7XHJcbiAgICAgICAgbGV0IHt1bm11dGVDbGFzc2VzIDogdW5tdXRlLCBtdXRlQ29udHJvbHNDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInZpZGVvLWNvbnRyb2xzLW11dGUtY29udHJvbHNcIiBjbGFzcz1cIiR7bXV0ZUNvbnRyb2xzQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiJHt1bm11dGV9XCI+PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCB2b2x1bWVCYXJIVE1MKCl7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiAgaWQ9XCJ2aWRlby1jb250cm9scy12b2x1bWUtYmFyXCIgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ2xhc3Nlc31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMudm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgcGxheVBhdXNlQnV0dG9uSFRNTCxcclxuICAgICAgICAgICAgc2NydWJCYXJIVE1MLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXBIVE1MLFxyXG4gICAgICAgICAgICBtdXRlQnV0dG9uSFRNTCxcclxuICAgICAgICAgICAgdm9sdW1lQmFySFRNTFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgJHtwbGF5UGF1c2VCdXR0b25IVE1MfVxyXG4gICAgICAgICAgICR7c2NydWJCYXJIVE1MfVxyXG4gICAgICAgICAgICR7dGltZXN0YW1wSFRNTH1cclxuICAgICAgICAgICAke211dGVCdXR0b25IVE1MfVxyXG4gICAgICAgICAgICR7dm9sdW1lQmFySFRNTH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG59IiwiLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCB3aXRoIGF0dHJpYnV0ZXMgYW5kIGtleXMgaW50byBIVE1MXHJcbiAqIHRoYXQgaW5wdXRzIGNhbiBiZSB1c2VkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZVRhZ3Mge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFB1bGxzIGFsbCB0aGUgYXR0cmlidXRlIHNldHRpbmdzIGFuZCB0aGUgYXR0cmlidXRlcyBcclxuICAgICAqIHRvIGJlIHJlbmRlcmVkLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZURhdGEgLSBzZXR0aW5ncyBmb3IgYWxsIHRoZSBhdHRyaWJ1dGVzLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXR0cmlidXRlS2V5cyAtIGF0dHJpYnV0ZSBuYW1lcyB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZURhdGEgPSB7fSwgYXR0cmlidXRlS2V5cyA9IFtdKXtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBbGwgYXR0cmlidXRlcyB0byBiZSBtYWRlLlxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5hdHRyaWJ1dGVEYXRhID0gYXR0cmlidXRlRGF0YTtcclxuICAgICAgIFxyXG4gICAgICAgLyoqXHJcbiAgICAgICAgKiBBdHRyaWJ1dGUgbmFtZXMgdG8gYmUgc2V0LlxyXG4gICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLmF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVLZXlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBhdHRyaWJ1dGVzIGJhc2VkIG9uIHRoZSBrZXlzIGFuZCBhdHRyaWJ1dGUgZGF0YS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhdHRyaWJ1dGVEYXRhID0geyByZXF1aXJlZCA9IFwidHJ1ZVwifTtcclxuICAgICAqIGF0dHJpYnV0ZUtleXMgPSBbXCJyZXF1aXJlZFwiXTtcclxuICAgICAqIFxyXG4gICAgICogLy8gQmVjb21lczogXHJcbiAgICAgKiBodG1sID0gJ3JlcXVpcmVkID0gXCJ0cnVlXCInXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVLZXlzLCBhdHRyaWJ1dGVEYXRhfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUhUTUwgPSBhdHRyaWJ1dGVLZXlzLnJlZHVjZSggKGN1cnJlbnRBdHRyaWJ1dGVIVE1MLCBjdXJyZW50S2V5KSA9PntcclxuXHJcbiAgICAgICAgICAgIGlmKGF0dHJpYnV0ZURhdGFbY3VycmVudEtleV0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZVRhZ0hUTUwgPSBhdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldID09PSAndGFnLW9ubHknID8gXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50S2V5IDpcclxuICAgICAgICAgICAgICAgIGAke2N1cnJlbnRLZXl9PVwiJHthdHRyaWJ1dGVEYXRhW2N1cnJlbnRLZXldfVwiYFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjdXJyZW50QXR0cmlidXRlSFRNTH0gJHthdHRyaWJ1dGVUYWdIVE1MfSBgO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEF0dHJpYnV0ZUhUTUw7XHJcbiAgICAgICAgfSwgJycpOyAgIFxyXG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVIVE1MO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBWaWRlb1NldHRpbmdzIGZyb20gJy4uL3NldHRpbmdzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnRydWN0b3IoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50dGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QTEFZKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5QQVVTRSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHVyYXRpb24oY2IpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLm9uY2UodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRVRfRFVSQVRJT04sIChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjYihkdXJhdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuR0VUX0RVUkFUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWb2x1bWUodm9sdW1lKSB7XHJcbiAgICAgICAgdGhpcy5pVlhqc0J1cy5lbWl0KHRoaXMuY29udHJvbEV2ZW50TmFtZXMuU0VUX1ZPTFVNRSwgdm9sdW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWVrKHNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLmlWWGpzQnVzLmVtaXQodGhpcy5jb250cm9sRXZlbnROYW1lcy5TRUVLLCBzZWNvbmRzKTtcclxuICAgIH1cclxufSIsImltcG9ydCBDb250cm9sRXZlbnRzIGZyb20gJy4vZXZlbnRzLmpzJztcclxuaW1wb3J0IFZpZGVvRXZlbnROYW1lcyBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzL3ZpZGVvLmV2ZW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xzIGV4dGVuZHMgQ29udHJvbEV2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IDAuNTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xFdmVudE5hbWVzID0gbmV3IFZpZGVvRXZlbnROYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoaVZYanNCdXMpIHtcclxuICAgICAgICBpVlhqc0J1cy5yZW1vdmVMaXN0ZW5lcih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlRJTUVfVVBEQVRFLCB0aGlzLnVwZGF0ZVRpbWUpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUExBWUlORywgdGhpcy53aGlsZVBsYXlpbmcpO1xyXG4gICAgICAgIGlWWGpzQnVzLnJlbW92ZUxpc3RlbmVyKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuQ0FOX1BMQVksIHRoaXMuY2FuUGxheUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcmVsYXRpdmVQb3NpdGlvbiA9IHsgeDogZWxlbWVudC5vZmZzZXRMZWZ0LCB5OiBlbGVtZW50Lm9mZnNldFRvcCB9O1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBQb3NpdGlvbiA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICByZWxhdGl2ZVBvc2l0aW9uLnggKz0gdGVtcFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24ueSArPSB0ZW1wUG9zaXRpb24ueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFkanVzdFZvbHVtZShldmVudCkge1xyXG4gICAgICAgIGxldCB7dm9sdW1lQmFyLCBtdXRlQ29udHJvbHMsIGN1cnJlbnRWb2x1bWUsIHZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzLCB1bm11dGVDbGFzc2VzLCBtdXRlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7b2Zmc2V0V2lkdGg6IHdpZHRoIH0gPSB2b2x1bWVCYXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24odm9sdW1lQmFyKTtcclxuICAgICAgICBsZXQge3g6IGFic29sdXRlWH0gPSBhYnNvbHV0ZVBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB7IHBhZ2VYOiB4IH0gPSBldmVudDtcclxuICAgICAgICBsZXQgdHJ1ZVggPSAoeCAtIChhYnNvbHV0ZVgpKTtcclxuICAgICAgICBsZXQgdm9sdW1lTGV2ZWwgPSAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IG11dGVDb250cm9sc0NsYXNzZXMgPSBbbXV0ZUNsYXNzZXMsIHVubXV0ZUNsYXNzZXNdO1xyXG4gICAgICAgIGxldCBtdXRlSWNvbiA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhtdXRlQ29udHJvbHMuY2hpbGRyZW4sIG11dGVDb250cm9sc0NsYXNzZXMpO1xyXG5cclxuICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgIGN1cnJlbnRWb2x1bWVTcGFuLnN0eWxlLndpZHRoID0gYCR7dm9sdW1lTGV2ZWwgKiAxMDB9JWA7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IHZvbHVtZUxldmVsO1xyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKHZvbHVtZUxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBzY3J1YihldmVudCkge1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtvZmZzZXRXaWR0aDogd2lkdGh9ID0gc2NydWJCYXI7XHJcbiAgICAgICAgbGV0IGFic29sdXRlUG9zaXRpb24gPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oc2NydWJCYXIpO1xyXG4gICAgICAgIGxldCB7eDogYWJzb2x1dGVYfSA9IGFic29sdXRlUG9zaXRpb247XHJcbiAgICAgICAgbGV0IHsgcGFnZVg6IHggfSA9IGV2ZW50O1xyXG4gICAgICAgIGxldCB0cnVlWCA9ICh4IC0gKGFic29sdXRlWCkpO1xyXG4gICAgICAgIGxldCBzY3J1YlRvVGltZSA9IHRoaXMuZHVyYXRpb24gKiAodHJ1ZVggLyB3aWR0aCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lT2JqZWN0ID0gdGhpcy5jb252ZXJ0U2Vjb25kc1RvUGFydHMoc2NydWJUb1RpbWUpO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gdGhpcy5jcmVhdGVUaW1lU3RhbXAoY3VycmVudFRpbWVPYmplY3QpO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc11cclxuICAgICAgICBsZXQgdGltZWxhcHNlZCA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhzY3J1YkJhci5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lSW5mby5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGltZVN0YW1wfWA7XHJcbiAgICAgICAgdGltZWxhcHNlZC5zdHlsZS53aWR0aCA9IGAkeyh0cnVlWCAvIHdpZHRoKSAqIDEwMH0lYDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrKHNjcnViVG9UaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5UGF1c2UoZXZlbnQpIHtcclxuICAgICAgICBsZXQge3BsYXlQYXVzZUNvbnRyb2xzLCBwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaENsYXNzZXMgPSBbcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc107XHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMocGxheVBhdXNlQ29udHJvbHMuY2hpbGRyZW4sIHNlYXJjaENsYXNzZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAocGxheVBhdXNlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBwbGF5Q2xhc3NlczpcclxuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGF1c2VDbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgcGF1c2VDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwbGF5Q2xhc3NlcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXV0ZShldmVudCkge1xyXG4gICAgICAgIGxldCB7bXV0ZUNvbnRyb2xzLCBtdXRlQ2xhc3NlcywgdW5tdXRlQ2xhc3Nlcywgdm9sdW1lQmFyLCB2b2x1bWVCYXJDdXJyZW50Vm9sdW1lQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBtdXRlQ29udHJvbHNDbGFzc2VzID0gW211dGVDbGFzc2VzLCB1bm11dGVDbGFzc2VzXTtcclxuICAgICAgICBsZXQgbXV0ZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMobXV0ZUNvbnRyb2xzLmNoaWxkcmVuLCBtdXRlQ29udHJvbHNDbGFzc2VzKTtcclxuICAgICAgICBsZXQgY3VycmVudFZvbHVtZVNwYW4gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXModm9sdW1lQmFyLmNoaWxkcmVuLCBbdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXNdKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChtdXRlSWNvbi5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSB1bm11dGVDbGFzc2VzOlxyXG4gICAgICAgICAgICAgICAgbXV0ZUljb24uY2xhc3NOYW1lID0gbXV0ZUNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Vm9sdW1lU3Bhbi5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbXV0ZUNsYXNzZXM6XHJcbiAgICAgICAgICAgICAgICBtdXRlSWNvbi5jbGFzc05hbWUgPSB1bm11dGVDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHt0aGlzLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHlUb1BsYXkocGxheWVyLCBzdGF0ZURhdGEpIHtcclxuICAgICAgICBsZXQge3ZvbHVtZUJhciwgdm9sdW1lQmFyQ3VycmVudFZvbHVtZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWb2x1bWVTcGFuID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKHZvbHVtZUJhci5jaGlsZHJlbiwgW3ZvbHVtZUJhckN1cnJlbnRWb2x1bWVDbGFzc2VzXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY3VycmVudFZvbHVtZVNwYW4uc3R5bGUud2lkdGggPSBgJHtzZWxmLmN1cnJlbnRWb2x1bWUgKiAxMDB9JWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUoc2VsZi5jdXJyZW50Vm9sdW1lKTtcclxuICAgICAgICB0aGlzLmdldER1cmF0aW9uKChkdXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3RvdGFsVGltZUluZm8sIGN1cnJlbnRUaW1lSW5mbywgc2NydWJCYXJ9ID0gc2VsZjtcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uVGltZU9iamVjdCA9IHNlbGYuY29udmVydFNlY29uZHNUb1BhcnRzKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uVGltZVN0YW1wID0gc2VsZi5jcmVhdGVUaW1lU3RhbXAoZHVyYXRpb25UaW1lT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbFRpbWVJbmZvKSB0b3RhbFRpbWVJbmZvLmlubmVySFRNTCA9IGAvJHtkdXJhdGlvblRpbWVTdGFtcH1gO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYDAwOjAwYDtcclxuICAgICAgICAgICAgaWYgKHNjcnViQmFyKSBzY3J1YkJhci5jaGlsZHJlblswXS5zdHlsZS53aWR0aCA9IGAwJWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaW1lVXBkYXRlKHBsYXllcikge1xyXG4gICAgICAgIGxldCB7Y3VycmVudFRpbWVJbmZvLCBzY3J1YkJhciwgc2NydWJCYXJUaW1lTGFwc2VDbGFzc2VzfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHtjdXJyZW50VGltZTogc2Vjb25kc30gPSBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHNlY29uZHMgPSBzZWNvbmRzID4gdGhpcy5kdXJhdGlvbiA/IDAgOiBzZWNvbmRzO1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVPYmplY3QgPSB0aGlzLmNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IHRoaXMuY3JlYXRlVGltZVN0YW1wKGN1cnJlbnRUaW1lT2JqZWN0KTtcclxuICAgICAgICBsZXQgdGltZUxhcHNlZCA9IHNlY29uZHMgLyB0aGlzLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJbmZvKSBjdXJyZW50VGltZUluZm8uaW5uZXJIVE1MID0gYCR7Y3VycmVudFRpbWVTdGFtcH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3NjcnViQmFyVGltZUxhcHNlQ2xhc3Nlc107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHNjcnViQmFyKSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lbGFwc2VkRWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5Q2xhc3NlcyhzY3J1YkJhci5jaGlsZHJlbiwgc2VhcmNoQ2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGltZWxhcHNlZEVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt0aW1lTGFwc2VkICogMTAwfSVgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBsYXlpbmcoKSB7XHJcbiAgICAgICAgbGV0IHtwbGF5UGF1c2VDb250cm9scywgcGxheUNsYXNzZXMsIHBhdXNlQ2xhc3Nlc30gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hDbGFzc2VzID0gW3BsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXNdXHJcbiAgICAgICAgbGV0IHBsYXlQYXVzZUljb24gPSB0aGlzLmdldEVsZW1lbnRCeUNsYXNzZXMoXHJcbiAgICAgICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBzZWFyY2hDbGFzc2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGxheVBhdXNlSWNvbi5jbGFzc05hbWUgPSBwYXVzZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGF1c2VkKCkge1xyXG4gICAgICAgIGxldCB7cGxheVBhdXNlQ29udHJvbHMsIHBsYXlDbGFzc2VzLCBwYXVzZUNsYXNzZXN9ID0gdGhpcztcclxuICAgICAgICBsZXQgc2VhcmNoQ2xhc3NlcyA9IFtwbGF5Q2xhc3NlcywgcGF1c2VDbGFzc2VzXVxyXG4gICAgICAgIGxldCBwbGF5UGF1c2VJY29uID0gdGhpcy5nZXRFbGVtZW50QnlDbGFzc2VzKFxyXG4gICAgICAgICAgICBwbGF5UGF1c2VDb250cm9scy5jaGlsZHJlbixcclxuICAgICAgICAgICAgc2VhcmNoQ2xhc3Nlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHBsYXlQYXVzZUljb24uY2xhc3NOYW1lID0gcGxheUNsYXNzZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGlWWGpzQnVzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB7c2NydWJCYXIsIHZvbHVtZUJhciwgcGxheVBhdXNlQ29udHJvbHMsIG11dGVDb250cm9sc30gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlWWGpzQnVzID0gaVZYanNCdXM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5USU1FX1VQREFURSwgdXBkYXRlVGltZSk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBhdXNlZCA9IGlWWGpzQnVzLm9uKHRoaXMuY29udHJvbEV2ZW50TmFtZXMuUEFVU0VELCB3aGlsZVBhdXNlZCk7XHJcbiAgICAgICAgdGhpcy53aGlsZVBsYXlpbmcgPSBpVlhqc0J1cy5vbih0aGlzLmNvbnRyb2xFdmVudE5hbWVzLlBMQVlJTkcsIHdoaWxlUGxheWluZyk7XHJcbiAgICAgICAgdGhpcy5jYW5QbGF5Q2FsbGJhY2sgPSAgaVZYanNCdXMub24odGhpcy5jb250cm9sRXZlbnROYW1lcy5DQU5fUExBWSwgY2FuUGxheUNhbGxCYWNrKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSB0aGlzLnVwZGF0ZVRpbWUgPyB0aGlzLnVwZGF0ZVRpbWUgOiB1cGRhdGVUaW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvbHVtZUJhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5hZGp1c3RWb2x1bWUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjcnViQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2NydWIoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXlQYXVzZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRQbGF5UGF1c2UoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG11dGVDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldE11dGUoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNhblBsYXlDYWxsQmFjayhwbGF5ZXIsIF9zdGF0ZURhdGEpIHtcclxuICAgICAgICAgICAgc2VsZi5vblJlYWR5VG9QbGF5KHBsYXllciwgX3N0YXRlRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZShwbGF5ZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5vblRpbWVVcGRhdGUocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdoaWxlUGF1c2VkKHBsYXllcikge1xyXG4gICAgICAgICAgICBzZWxmLm9uUGF1c2VkKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3aGlsZVBsYXlpbmcoKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25QbGF5aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRCeUNsYXNzZXMoZWxlbWVudHMsIGNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgZWxlbWVudEFycmF5ID0gZWxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSA/XHJcbiAgICAgICAgICAgIGVsZW1lbnRzIDpcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShlbGVtZW50cyk7XHJcbiAgICAgICAgbGV0IHRoaXNFbGVtZW50O1xyXG5cclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goKGNsYXNzTmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXNFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzRWxlbWVudCA9IGVsZW1lbnRBcnJheS5maW5kKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc0VsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGltZVN0YW1wKHRpbWVPYmplY3QpIHtcclxuICAgICAgICBsZXQge2hvdXJzLCByZW1haW5pbmdNaW51dGVzOiBtaW51dGVzLCByZW1haW5pbmdTZWNvbmRzOiBzZWNvbmRzfSA9IHRpbWVPYmplY3Q7XHJcbiAgICAgICAgbGV0IGhvdXJTdHJpbmcgPSAnJztcclxuICAgICAgICBsZXQgbWludXRlU3RyaW5nID0gbWludXRlcyA8IDEwID9cclxuICAgICAgICAgICAgYDAke21pbnV0ZXN9OmAgOlxyXG4gICAgICAgICAgICBgJHttaW51dGVzfTpgO1xyXG4gICAgICAgIGxldCBzZWNvbmRTdHJpbmcgPSBzZWNvbmRzIDwgMTAgP1xyXG4gICAgICAgICAgICBgMCR7c2Vjb25kc31gIDpcclxuICAgICAgICAgICAgYCR7c2Vjb25kc31gO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGhvdXJTdHJpbmcgPSBob3VycyA8IDEwID9cclxuICAgICAgICAgICAgICAgIGAwJHtob3Vyc306YCA6XHJcbiAgICAgICAgICAgICAgICBgJHtob3Vyc306YDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7aG91clN0cmluZ30ke21pbnV0ZVN0cmluZ30ke3NlY29uZFN0cmluZ31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRTZWNvbmRzVG9QYXJ0cyhzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgbGV0IHRpbWVJbmZvcm1hdGlvbiA9IHtcclxuICAgICAgICAgICAgbWludXRlczogbWludXRlcyxcclxuICAgICAgICAgICAgaG91cnM6IE1hdGguZmxvb3IobWludXRlcyAvIDYwKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nU2Vjb25kczogTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxyXG4gICAgICAgICAgICByZW1haW5pbmdNaW51dGVzOiBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MCksXHJcbiAgICAgICAgICAgIHNlY29uZHM6IHNlY29uZHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1lSW5mb3JtYXRpb247XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckNvbnRyb2xFdmVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGF5XCIgOiAnaVZYOnZpZGVvOnBsYXknLFxyXG4gICAgICAgICAgICBcInBhdXNlXCIgOiAnaVZYOnZpZGVvOnBhdXNlJyxcclxuICAgICAgICAgICAgXCJzZWVrXCIgOiAnaVZYOnZpZGVvOnNlZWtlZCcsXHJcbiAgICAgICAgICAgIFwicGxheWluZ1wiIDogXCJpVlg6dmlkZW86cGxheWluZ1wiLFxyXG4gICAgICAgICAgICBcImVuZGVkXCIgOiBcImlWWDp2aWRlbzplbmRlZFwiLFxyXG4gICAgICAgICAgICBcInBhdXNlZFwiIDogXCJpVlg6dmlkZW86cGF1c2VkXCIsXHJcbiAgICAgICAgICAgIFwic2V0Vm9sdW1lXCIgOiAnaVZYOnZpZGVvOnNldFZvbHVtZScsXHJcbiAgICAgICAgICAgIFwiZHVyYXRpb25cIiA6IFwiaVZYOnZpZGVvOnJlcXVlc3REdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImdldER1cmF0aW9uXCIgOiBcImlWWDp2aWRlbzpnZXREdXJhdGlvblwiLFxyXG4gICAgICAgICAgICBcImNhblBsYXlcIiA6IFwiaVZYOnZpZGVvOmNhbnBsYXlcIixcclxuICAgICAgICAgICAgXCJ0aW1lVXBkYXRlXCIgOiBcImlWWDp2aWRlbzp0aW1ldXBkYXRlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcG9zZVwiIDogXCJpVlg6dmlkZW86ZGlzcG9zZVwiLFxyXG4gICAgICAgICAgICBcInZvbHVtZVwiIDogJ2lWWDp2aWRlbzpzZXRWb2x1bWUnICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblx0Y29uc3RydWN0b3IobG9nKSB7XG5cdFx0dGhpcy5sb2cgPSBsb2dcblx0fVxuXG5cdGFzc2VydCh0ZXN0LCBuYW1lLCBtZXNzYWdlKSB7XG5cdFx0bGV0IHtsb2d9ID0gdGhpcztcblx0XHRsZXQge3Nob3c6IGRlYnVnfSA9IGxvZztcblxuXHRcdGlmICghdGVzdCkge1xuXHRcdFx0bGV0IGVycm9yT2JqID0geyBcblx0XHRcdFx0bWVzc2FnZSA6IGAke25hbWV9IGlzIGludmFsaWQ6ICR7bWVzc2FnZX0uYFxuXHRcdFx0fTtcblxuXHRcdFx0aWYoZGVidWcpe1xuXHRcdFx0XHR0aGlzLmxvZy5lcnJvcihlcnJvck9iaiwgXCJBU1NFUlRcIik7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvck9iai5tZXNzYWdlKTtcblx0XHRcdH0gXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRlc3Q7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgVHlwZVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdHJpbmcob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcclxuICAgIH1cclxuXHJcbiAgICBpc0Z1bmN0aW9uKG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0aGlzLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBpc051bWJlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgaXNCb29sZWFuKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudmFsdWVPZigpID09PSAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICBsZXQgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKTtcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcclxuICAgICAgICBsZXQgY2hlY2tMZW5ndGggPSBpc0FycmF5IHx8IGlzU3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMZW5ndGggJiYgb2JqLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGNoZWNrTGVuZ3RoICYmIG9iai5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc05hTihvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHlwZVZhbGlkYXRvciA9IG5ldyBUeXBlVmFsaWRhdG9yKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFyc2VycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgeW91IHRvIG1hcCBhbiBvYmplY3QgYnkgdGhlIGtleXMgb2YgYSBnaXZlbiBvYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gb2JqZWN0IHRvIG1hcDtcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gcnVuIGJ5IGVhY2ggdmFsdWUgYW5kIGtleSAgXHJcbiAgICAgKi9cclxuICAgIG1hcEtleXMob2JqZWN0LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghb2JqZWN0IHx8IG9iamVjdCA9PT0ge30pIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0ga2V5cy5yZWR1Y2UoKGN1cnJlbnRBcnJheSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IFtrZXksIG9iamVjdFtrZXldXTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50QXJyYXk7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIGxldCByZWR1Y2VNYXAgPSBuZXcgTWFwKGVudHJpZXMpO1xyXG4gICAgICAgIGxldCBtYXBwZWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJlZHVjZU1hcCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZWR1Y2VNYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuICAgICAgICAgICAgbWFwcGVkQXJyYXkucHVzaChjYWxsYmFjayh2YWwsIGtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcGVkQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoYmFzZSwgbWVyZ2VkLCBpZ25vcmUpIHtcclxuICAgICAgICBsZXQgbWVyZ2VkS2V5cyA9IE9iamVjdC5rZXlzKG1lcmdlZCk7XHJcbiAgICAgICAgbGV0IHVuaW9uZWRPYmplY3QgPSBuZXcgT2JqZWN0KGJhc2UpO1xyXG5cclxuICAgICAgICBtZXJnZWRLZXlzLmZvckVhY2goKG1lcmdlZEtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihtZXJnZWRLZXkpID49IDApIHJldHVybjtcclxuICAgICAgICAgICAgdW5pb25lZE9iamVjdFttZXJnZWRLZXldID0gbWVyZ2VkW21lcmdlZEtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlvbmVkT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZShvYmplY3QsIGNhbGxiYWNrLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAoIW9iamVjdCB8fCBvYmplY3QgPT09IHt9KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcclxuICAgICAgICBsZXQgZW50cmllcyA9IGtleXMucmVkdWNlKChjdXJyZW50QXJyYXksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBba2V5LCBvYmplY3Rba2V5XV07XHJcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRBcnJheTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgbGV0IHJlZHVjZU1hcCA9IG5ldyBNYXAoZW50cmllcyk7XHJcblxyXG4gICAgICAgIHJlZHVjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBjYWxsYmFjayhkZWZhdWx0VmFsdWUsIHZhbCwga2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYSBjb2xsZWN0aW9uIHRvIGZpbmQgaWYgYW55IG9mIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiB3aXRoIHRoZSBrZXlzIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBhbnlFbXB0eShjb2xsZWN0aW9uLCBrZXlzKSB7XHJcbiAgICAgICAgbGV0IGhhc0VsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoZWxlbWVudFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRzLmVycm9ycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBoYXMoY29sbGVjdGlvbiwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNTYW1lQXJyYXkoY29sbGVjdGlvbiwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1NhbWVPYmplY3QoY29sbGVjdGlvbiwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTYW1lT2JqZWN0KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaXRIYXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChjaGVja0VsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tFbGVtZW50ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRWxlbWVudEtleXMgPSBPYmplY3Qua2V5cyhjaGVja0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50S2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRIYXMgPSBjaGVja0VsZW1lbnRba2V5XSA9PT0gZWxlbWVudFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaXRIYXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2FtZUFycmF5KGNvbGxlY3Rpb24sIGFycmF5RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpdEhhcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGNoZWNrRWxlbWVudCwgaW5kZXgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja0VsZW1lbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50LmZvckVhY2goKHRlc3RFbGVtZW50LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdEhhcyA9IHRlc3RFbGVtZW50ID09PSBhcnJheUVsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0SGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgYSA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgbyA9IG9iamVjdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gYVtpXTtcclxuICAgICAgICAgICAgaWYgKG4gaW4gbykge1xyXG4gICAgICAgICAgICAgICAgbyA9IG9bbl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvW25dID0ge307XHJcbiAgICAgICAgICAgICAgICBvID0gb1tuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvW2FbYS5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21QYXRoKHBhdGgsIG9iamVjdCkge1xyXG4gICAgICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IG9iamVjdDtcclxuICAgICAgICBsZXQgY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIHBhdGhQYXJ0cy5mb3JFYWNoKChwYXRoUGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVWYWxpZGF0b3IuaXNFbXB0eShwYXRoUGFydCkpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudERhdGEgPSBvbGREYXRhW3BhdGhQYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlVmFsaWRhdG9yLmlzRW1wdHkoY3VycmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGN1cnJlbnREYXRhO1xyXG4gICAgICAgICAgICBvbGREYXRhID0gY3VycmVudERhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGluIGFuIGFycmF5IG9mIG9iamVjdHMgdG8gc2VlIGlmIHRoZSB2YWx1ZXMgXHJcbiAgICAgKiBhdCB0aGUga2V5cyBpcyB1bmlxdWUgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGljYXRpbmcgXHJcbiAgICAgKiBpZiB0aGV5IGFyZSB1bmlxdWUgYW5kIGFueSBlcnJvcnMgdGhhdCBkb24ndCBtYXRjaCBmb3IgXHJcbiAgICAgKiBjb3JyZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBpc1VuaXF1ZShjb2xsZWN0aW9uID0gW10sIGtleXMgPSBbXSkge1xyXG4gICAgICAgIGxldCBoYXNVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGlzVW5pcXVlOiB0cnVlLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWxsVW5pcXVlVmFsdWVzID0ge307XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhbGxVbmlxdWVWYWx1ZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90VW5pcXVlID0gc2VsZi5oYXMoYWxsVW5pcXVlVmFsdWVzW2tleV0sIGVsZW1lbnRba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdFVuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZS5lcnJvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50W2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWUuaXNVbmlxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVW5pcXVlVmFsdWVzW2tleV0ucHVzaChlbGVtZW50W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFzVW5pcXVlO1xyXG4gICAgfVxyXG59OyJdfQ==
