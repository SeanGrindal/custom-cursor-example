(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const CustomCursor = require('custom-cursor.js').default 
const customCursor = new CustomCursor('.cursor').initialize()

},{"custom-cursor.js":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.destroy = destroy;
function destroy(cursor) {
    if (cursor.initialized) {
        cursor.element.classList.remove('cursor--initialized');
        cursor.element.classList.remove('cursor--disabled');
        cursor.element.classList.remove('cursor--off-screen');

        if (cursor.styleTag) document.head.removeChild(cursor.styleTag);

        document.removeEventListener('mousemove', cursor.track);

        document.removeEventListener('mouseleave', cursor.leave);

        document.removeEventListener('mouseenter', cursor.enter);

        cursor.focusObj = cursor.focusObj.destroy();
        cursor.initialized = false;
    }
}
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enter = enter;
function enter(cursor) {
  cursor.element.classList.remove('cursor--off-screen');
}
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leave = leave;
function leave(cursor) {
  cursor.element.classList.add('cursor--off-screen');
}
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = track;
function track(e, cursor) {
  cursor.position.X = e.clientX;
  cursor.position.Y = e.clientY;
}
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Focus = function () {
  function Focus(cursor) {
    var _this = this;

    _classCallCheck(this, Focus);

    this.cursor = cursor;

    this.initializedElements = [];

    this.elementEnter = function () {
      _this.cursor.element.classList.add(_this.cursor.options.focusClass);
    };

    this.elementLeave = function () {
      _this.cursor.element.classList.remove(_this.cursor.options.focusClass);
    };
  }

  _createClass(Focus, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.cursor.options.focusElements.forEach(function (element) {
        if (typeof element === 'string') element = document.querySelector(element);
        if (!element || !element.nodeName) return;

        element.addEventListener('mouseenter', _this2.elementEnter);
        element.addEventListener('mouseleave', _this2.elementLeave);

        _this2.initializedElements.push(element);
      });

      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      this.initializedElements.forEach(function (initializedElement) {
        initializedElement.removeEventListener('mouseenter', _this3.elementEnter);
        initializedElement.removeEventListener('mouseleave', _this3.elementLeave);
      });

      this.cursor.element.classList.remove(this.cursor.options.focusClass);

      return null;
    }
  }]);

  return Focus;
}();

exports.default = Focus;
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;

var _isMobileUserAgent = require('../util/isMobileUserAgent');

var _focus = require('./focus');

var _focus2 = _interopRequireDefault(_focus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialize(cursor) {
  if (!(0, _isMobileUserAgent.isMobileUserAgent)()) {
    cursor.element.classList.add('cursor--initialized');

    if (cursor.options.hideTrueCursor) {
      cursor.styleTag = document.createElement('style');
      cursor.styleTag.innerHTML = '\n        * {\n          cursor: none;\n        }\n      ';

      document.head.appendChild(cursor.styleTag);
    }

    document.addEventListener('mousemove', cursor.track);

    document.addEventListener('mouseleave', cursor.leave);

    document.addEventListener('mouseenter', cursor.enter);

    var render = function render() {
      if (!cursor.disabled) {
        var top = cursor.position.Y - cursor.element.clientHeight / 2;
        var left = cursor.position.X - cursor.element.clientWidth / 2;

        cursor.element.style.transform = 'matrix(1, 0, 0, 1, ' + left + ', ' + top + ')';
      }

      requestAnimationFrame(render);
    };

    render();

    cursor.focusObj = new _focus2.default(cursor).initialize();
    cursor.initialized = true;
  }
}
},{"../util/isMobileUserAgent":10,"./focus":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  // Wether or not the true cursor should be visible
  hideTrueCursor: false,

  // Elements that apply the focus class on hover
  focusElements: ['a', 'button'],

  // Class applied when the true cursor is hovering over a focusElement
  focusClass: 'cursor--focused'

};
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // DEFAULT SETTINGS


// UTILITY FUNCTIONS


// CORE FUNCTIONS


// EVENTS


var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _log = require('./util/log');

var _object = require('./util/object');

var _destroy2 = require('./core/destroy');

var _initialize2 = require('./core/initialize');

var _enter = require('./core/events/enter');

var _leave = require('./core/events/leave');

var _track = require('./core/events/track');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomCursor = function () {
  function CustomCursor(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CustomCursor);

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('No element is specified to initialize customCursor');
    }

    this.element = element;

    this.focusObj = null;

    this.styleTag = null;

    this.initialized = false;

    this.disabled = false;

    this.position = {
      X: null,
      Y: null
    };

    this.options = {
      hideTrueCursor: options.hideTrueCursor || _defaults2.default.hideTrueCursor,

      focusElements: options.focusElements || _defaults2.default.focusElements,

      focusClass: options.focusClass || _defaults2.default.focusClass
    };

    this.enter = function () {
      (0, _enter.enter)(_this);
    };

    this.leave = function () {
      (0, _leave.leave)(_this);
    };

    this.track = function (e) {
      (0, _track.track)(e, _this);
    };
  }

  _createClass(CustomCursor, [{
    key: 'initialize',
    value: function initialize() {
      (0, _initialize2.initialize)(this);

      return this;
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (this.initialized) {
        this.disabled = true;

        this.element.classList.add('cursor--disabled');
      } else (0, _log.warn)('CustomCursor needs to be initialized before it can be disabled');

      return this;
    }
  }, {
    key: 'enable',
    value: function enable() {
      if (this.initialized) {
        this.disabled = false;

        this.element.classList.remove('cursor--disabled');
      } else (0, _log.warn)('CustomCursor needs to be initialized before it can be enabled');

      return this;
    }
  }, {
    key: 'update',
    value: function update(newOptions) {
      if (!newOptions) {
        (0, _log.warn)('No new options are specified in update call');
        return;
      }

      if (!(0, _object.areOptionsEqual)(newOptions, this.options)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(newOptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            this.options[key] = value;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else (0, _log.warn)('New options in update call are the same as the old options');

      this.destroy().initialize();

      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      (0, _destroy2.destroy)(this);

      return this;
    }
  }]);

  return CustomCursor;
}();

exports.default = CustomCursor;
},{"./core/destroy":2,"./core/events/enter":3,"./core/events/leave":4,"./core/events/track":5,"./core/initialize":7,"./defaults":8,"./util/log":11,"./util/object":12}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobileUserAgent = isMobileUserAgent;
function isMobileUserAgent() {
  var isMobile = false;
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }
  return isMobile;
}
},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
function warn(msg) {
  console.error("[CustomCursor]: " + msg);
}
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areOptionsEqual = areOptionsEqual;
function areOptionsEqual(object1, object2) {
  for (var key in object1) {
    if (object1.hasOwnProperty(key)) {
      if (object1[key] !== object2[key]) return false;
    }
  }

  return true;
}
},{}]},{},[1]);
