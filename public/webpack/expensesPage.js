var expensesPageExport =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(5);
var v4 = __webpack_require__(8);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(6);
var bytesToUuid = __webpack_require__(7);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(6);
var bytesToUuid = __webpack_require__(7);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grouDetailsAjax", function() { return grouDetailsAjax; });
function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var evt = new CustomEvent('buttons-created', {
  state: "done"
});

var getGroupDetails = function getGroupDetails() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get-group-details',
      type: 'GET',
      success: function success(groupDetails) {
        resolve(groupDetails);
      },
      error: function error(_error) {
        reject(_error);
      }
    });
  });
};
/**
 * @typedef userDetails 
 * @type {Object}
 * @param {String} userDetails.firstName 
 * @param {String} userDetails.lastName
 * @param {Boolean} userDetails.profImgExists 
 * @param {Integer} userDetails.userId
 */

/**
 * @typedef groupUsersDetails
 * @type {Map<Integer:userDetails>}
 * Key is userId
 */

/**
 * @return {Promise<groupUsersDetails>}
 */


var getUsersInGroupDetails = function getUsersInGroupDetails() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get-users-in-group',
      type: 'POST',
      success: function success(usersInGroupData) {
        window.dispatchEvent(evt);
        usersInGroupData = JSON.parse(usersInGroupData);
        var groupUsersDetails = new Map();

        var _iterator = _createForOfIteratorHelper(usersInGroupData),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var userData = _step.value;
            groupUsersDetails.set(userData[0], userData[1]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        resolve(groupUsersDetails);
      },
      error: function error(_error2) {
        reject(_error2);
      }
    });
  });
};

var grouDetailsAjax = {};
grouDetailsAjax.getGroupDetails = getGroupDetails;
grouDetailsAjax.getUsersInGroupDetails = getUsersInGroupDetails;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExpensesPage", function() { return getExpensesPage; });
/* harmony import */ var _components_expensesPage_ExpensesPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _components_expensesPage_ExpensesFormComponent_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var getExpensesPage = function getExpensesPage() {
  $("#content").remove();
  $("#content-container").append("<div id = 'content'></div>");
  Promise.all([_ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_3__["grouDetailsAjax"].getUsersInGroupDetails(), _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].getExpenseDataAjax(), _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].getExpenseTotalsDataAjax()]).then(function (res) {
    var _res = _slicedToArray(res, 3),
        usersInGroupDetails = _res[0],
        expenseData = _res[1],
        expensesTotals = _res[2]; // console.log("Promise.all for expenses are_____________", userNames, expenseData, expensesTotals);


    var processedData = _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].processData(expenseData, usersInGroupDetails);
    ReactDOM.render( /*#__PURE__*/React.createElement(_components_expensesPage_ExpensesPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
      view: "eachExpense",
      expenses: processedData,
      totals: expensesTotals,
      usersInGroupDetails: usersInGroupDetails
    }, "  "), document.getElementById('content')); // let processedUserNames = processUserNames(userNames);

    ReactDOM.render( /*#__PURE__*/React.createElement(_components_expensesPage_ExpensesFormComponent_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      usersInGroup: usersInGroupDetails
    }), document.getElementById('CreateFormContent'));
  })["catch"](function (error) {
    return console.log(error);
  });
};



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExpensesPage; });
/* harmony import */ var _ajax_expensesAjax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ExpensesPage = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpensesPage, _React$Component);

  var _super = _createSuper(ExpensesPage);

  function ExpensesPage(props) {
    var _this;

    _classCallCheck(this, ExpensesPage);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "toggleView", function () {
      // console.log(this.state.view, this.state.totals);
      var view;

      if (_this.state.view == "eachExpense") {
        view = "allExpenses";
      } else if (_this.state.view == "allExpenses") {
        view = "eachExpense";
      }

      _this.setState({
        view: view
      }); // ReactDOM.render(<ExpensesTable view={view} origin="toggle" />, document.getElementById('expenses-table'))

    });

    _this.state = {
      expenses: [],
      totals: {},
      view: ""
    };
    _this.state.view = _this.props.view;
    _this.state.expenses = _this.props.expenses;
    _this.state.totals = _this.props.totals;
    _this.state.usersInGroupDetails = _this.props.usersInGroupDetails;
    console.log('current expense is ___', _this.state.expenses);
    return _this;
  }

  _createClass(ExpensesPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $("#content-container").fadeIn('slow');
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      $("#content-container").css("display", "none");
    }
  }, {
    key: "render",
    value: function render() {
      var buttonText;

      if (this.state.view == "eachExpense") {
        buttonText = "View Totals";
      } else if (this.state.view == "allExpenses") {
        buttonText = "View All Expenses";
      }

      var expensePage = /*#__PURE__*/React.createElement("div", {
        id: "expenses-content",
        className: "container",
        style: {
          marginTop: '250px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "row",
        id: "buttons-row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn-group btn-group-md",
        role: "group",
        "aria-label": "Basic example"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary",
        "data-toggle": "modal",
        "data-target": "#darkModalForm"
      }, "Create Expense"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.toggleView,
        className: "btn btn-secondary"
      }, buttonText)))), /*#__PURE__*/React.createElement("div", {
        id: "expense-table-id",
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-12 pr-0"
      }, /*#__PURE__*/React.createElement("table", {
        id: "expenses-table",
        className: "table table-hover table-dark "
      }, /*#__PURE__*/React.createElement(ExpensesTable, {
        expenses: this.state.expenses,
        totals: this.state.totals,
        userNamesInGroup: this.state.userNamesInGroup,
        usersInGroupDetails: this.state.usersInGroupDetails,
        view: this.state.view
      })))), /*#__PURE__*/React.createElement("div", {
        id: "modals-container"
      }));
      return /*#__PURE__*/React.createElement(React.Fragment, null, "  ", expensePage, " ");
    }
  }]);

  return ExpensesPage;
}(React.Component); //React componenent that dynamically creates the expense table




var ExpensesTable = /*#__PURE__*/function (_React$Component2) {
  _inherits(ExpensesTable, _React$Component2);

  var _super2 = _createSuper(ExpensesTable);

  function ExpensesTable(props) {
    var _this2;

    _classCallCheck(this, ExpensesTable);

    console.log("i");
    _this2 = _super2.call(this, props);

    _defineProperty(_assertThisInitialized(_this2), "state", {
      expenses: [],
      totals: {}
    });

    _this2.state.expenses = _this2.props.expenses;
    _this2.state.totals = _this2.props.totals;
    _this2.state.view = _this2.props.view;
    _this2.state.userNamesInGroup = _this2.props.userNamesInGroup;
    _this2.state.usersInGroupDetails = _this2.props.usersInGroupDetails; // console.log("is the constructor called each time tho?");

    document.addEventListener('new-expense', function (e) {
      console.log("THE DATA ARE!!!", e.detail);
      _ajax_expensesAjax__WEBPACK_IMPORTED_MODULE_0__["expensesAjax"].getExpenseTotalsDataAjax().then(function (totalDebtsForEachUser) {
        var newExpense = _ajax_expensesAjax__WEBPACK_IMPORTED_MODULE_0__["expensesAjax"].processData(e.detail, _this2.state.usersInGroupDetails);
        console.log("the processsed new Expense is_______________________________", newExpense);

        _this2.setState({
          expenses: [].concat(_toConsumableArray(_this2.state.expenses), [newExpense]),
          totals: totalDebtsForEachUser
        });
      });
    });
    return _this2;
  }

  _createClass(ExpensesTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('[data-toggle="tooltip"]').tooltip();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      $('[data-toggle="tooltip"]').tooltip();
    }
    /**
     * @todo create typedef for expenses object
     * @param {*} expenses 
     */

  }, {
    key: "renderEachExpense",
    value: function renderEachExpense(expenses) {
      // console.log("current expenses are:", expenses);
      var data = expenses.map(function (expense) {
        var tranactionsData = expense.reduce(function (sum, entry) {
          var text = "";
          entry.debt <= 0 ? text = " <b>gets</b> " : text = " <b>owes</b> ";
          sum += entry.debtorFullName + text + Math.abs(entry.debt) + "$" + "<br>";
          return sum;
        }, "");
        return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, expense[0].creditorFullName), /*#__PURE__*/React.createElement("td", null, expense[0].when), /*#__PURE__*/React.createElement("td", null, expense[0].description), /*#__PURE__*/React.createElement("td", null, expense[0].credit, " $"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
          href: "#",
          "data-toggle": "tooltip",
          "data-placement": "right",
          sanitize: "false",
          "data-html": "true",
          title: tranactionsData
        }, /*#__PURE__*/React.createElement("img", {
          src: "/public/info.png",
          alt: "Info IMG",
          height: "42",
          width: "42"
        }))));
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Creditor"), /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "When"), /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Description"), /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Credit"), /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Info")), _toConsumableArray(data)), /*#__PURE__*/React.createElement("tbody", null), " ");
    }
    /**
     * @typedef TotalDebts
     * @type {object}
     * @property {object} userId 
     * @property {string} userId.fullname
     * @property {number} userId.debtSum
     * @property {Object} userId.debts
     * @property {number} userId.debts.userId
     */
    //E.g.  '1': { fullname: apostolis gerodimos, debtSum: 0, debts : {'8' : 15 } } 

    /**
     * Creates for each user the debts that he owes or how much he gets back
     * @param {TotalDebts} totals 
     * @returns {ReactFragment}
     */

  }, {
    key: "renderTotals",
    value: function renderTotals(totals) {
      var data = []; // console.log("totals in render Totals is: ", totals);

      Object.keys(totals).forEach(function (key) {
        var debtsInfo = '';
        var color = "";
        var debtsSumInfo = "";
        debtsInfo = '<u><b>' + totals[key].fullname + "</b></u><br>";
        Object.keys(totals[key].debts).forEach(function (innerKey) {
          var text;
          totals[key].debts[innerKey] <= 0 ? text = " <b>gets</b> " : text = " <b>owes</b> ";
          debtsInfo += "<br>" + totals[innerKey].fullname + text + Math.abs(totals[key].debts[innerKey]) + "$ ";
        });

        if (totals[key].debtSum <= 0) {
          color = "green";
          debtsSumInfo = "Gets " + Math.abs(totals[key].debtSum) + "$";
        } else {
          color = "red";
          debtsSumInfo = "Owes " + Math.abs(totals[key].debtSum) + "$";
        }

        var row = /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, totals[key].fullname), /*#__PURE__*/React.createElement("td", {
          style: {
            color: color
          }
        }, debtsSumInfo), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
          href: "#",
          "data-toggle": "tooltip",
          "data-placement": "right",
          sanitize: "false",
          "data-html": "true",
          title: debtsInfo
        }, /*#__PURE__*/React.createElement("img", {
          src: "/public/info.png",
          alt: "Info IMG",
          height: "42",
          width: "42"
        })))));
        data.push(row);
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Member"), /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Sum"), /*#__PURE__*/React.createElement("th", {
        scope: "col"
      }, "Info"))), /*#__PURE__*/React.createElement("tbody", null, [].concat(data)), "  ");
    }
  }, {
    key: "render",
    value: function render() {
      console.log("Expense page render called_____________________________________________");

      if (this.props.view == "eachExpense") {
        return this.renderEachExpense(this.state.expenses);
      } else if (this.props.view == "allExpenses") {
        // renderInfoTotalsModal(this.state.totals);
        return this.renderTotals(this.state.totals);
      }
    }
  }]);

  return ExpensesTable;
}(React.Component);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expensesAjax", function() { return expensesAjax; });
// Ajax request to retrieve the data needed to create the expense table
var getExpenseDataAjax = function getExpenseDataAjax(userNames, skip) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/home/expenses/get-expense-table',
      method: 'GET',
      dataType: "json",
      success: function success(data) {
        resolve(data);
      },
      error: function error(_error) {
        reject(_error);
      }
    });
  });
}; // Ajax request to retrieve the TOTALS data needed to create the expense TOTALS table


var getExpenseTotalsDataAjax = function getExpenseTotalsDataAjax() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/home/expenses/get-expense-totals-table',
      method: 'GET',
      dataType: "json",
      success: function success(data) {
        resolve(data);
        console.log('this should the totals table state: ', data);
      },
      error: function error(_error2) {
        reject(_error2);
      }
    });
  });
}; //Pass the data to backend so it will store them in our db


var storeNewExpense = function storeNewExpense(postData, newExpense, clientSocket) {
  $.ajax({
    url: '/home/expenses/create-expense',
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify(postData),
    contentType: "application/json",
    // contentType: "application/json",
    success: function success(result) {
      $("#created-expense-success").show(function () {
        new Promise(function (resolve, reject) {
          setTimeout(function () {
            $('#created-expense-success').hide(800);
            $('#darkModalForm').modal('toggle');
            var clearExpenseFormEvent = new CustomEvent('clear-expense-form');
            document.dispatchEvent(clearExpenseFormEvent);
            resolve({
              msg: 'ok'
            });
          }, 3000);
        });
      }); // $("#alert-success").;

      clientSocket.emit('new-expense', newExpense);
    },
    error: function error(_error3) {
      console.log(_error3);
    }
  });
}; // Creates the expense table by using the ExpensesTable Component


var processData = function processData(expenses, usersInGroupDetails) {
  console.log("in  process data", expenses, usersInGroupDetails);

  if (Array.isArray(expenses)) {
    expenses.forEach(function (expense) {
      if (Array.isArray(expense)) {
        expense.forEach(function (transaction) {
          transaction.creditorFullName = usersInGroupDetails.get(parseInt(transaction.creditor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(transaction.creditor, 10)).lastName;
          transaction.debtorFullName = usersInGroupDetails.get(parseInt(transaction.debtor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(transaction.debtor, 10)).lastName;
        });
      } else {
        expense.creditorFullName = usersInGroupDetails.get(parseInt(expense.creditor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expense.creditor, 10)).lastName;
        expense.debtorFullName = usersInGroupDetails.get(parseInt(expense.debtor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expense.debtor, 10)).lastName;
      }
    });
  } else {
    expenses.creditorFullName = usersInGroupDetails.get(parseInt(expenses.creditor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expenses.creditor, 10)).lastName;
    expenses.debtorFullName = usersInGroupDetails.get(parseInt(expenses.debtor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expenses.debtor, 10)).lastName;
  }

  return expenses;
};

var expensesAjax = {};
expensesAjax.storeNewExpense = storeNewExpense;
expensesAjax.getExpenseTotalsDataAjax = getExpenseTotalsDataAjax;
expensesAjax.getExpenseDataAjax = getExpenseDataAjax;
expensesAjax.processData = processData;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExpensesForm; });
/* harmony import */ var _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _User_drop_down_listComponent_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _DebtorComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // import { clientSocket } from "../../js/socketClient";





var ExpensesForm = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpensesForm, _React$Component);

  var _super = _createSuper(ExpensesForm);

  /**
   * @param {number}  dropDownId - it corresponds to userId
   * @param {number} debtorComponentId - it corresponds to debtor component id, which is a uuidv4
   */

  /**
   * @param {number} debtorComponentId - it corresponds to debtor component id, which is a uuidv4
   */
  function ExpensesForm(props) {
    var _this;

    _classCallCheck(this, ExpensesForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "submitForm", function (e) {
      e.preventDefault();
      var formData = $('#expense-form').serializeArray();
      console.log(formData);
      var creditor = {};
      var debtors = [];
      var info = {};
      var creditorName;
      var debtorNames = [];
      formData.forEach(function (elem, index, array) {
        if (elem.name == "creditorId") creditor.id = elem.value;
        if (elem.name == "credit") creditor.credit = elem.value;

        if (elem.name == "debt") {
          debtors.push({
            id: array[index + 1].value,
            debt: elem.value
          });
          debtorNames.push(array[index - 1].value);
        }

        if (elem.name == "creditor") creditorName = elem.value;
        if (elem.name == "date") info.date = elem.value;
        if (elem.name == "desc") info.desc = elem.value;
      });
      var postFormData = {
        creditor: creditor,
        debtors: debtors,
        info: info
      };
      var newExpense = [];
      debtors.forEach(function (elem, index) {
        newExpense.push({
          creditor: creditor.id,
          debtor: elem.id,
          when: info.date,
          description: info.desc,
          credit: creditor.credit,
          debt: elem.debt,
          creditorName: creditorName,
          debtorName: debtorNames[index]
        });
      });
      console.log("THE NEW EXPENSE IS:", newExpense);
      _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_0__["expensesAjax"].storeNewExpense(postFormData, newExpense, socket);
    });

    _defineProperty(_assertThisInitialized(_this), "selectCreditor", function (dropDownId) {
      var creditorName, creditorId;
      var usersInGroup = _this.state.usersInGroup;
      creditorName = usersInGroup.get(dropDownId).firstName;
      creditorId = dropDownId;

      _this.setState({
        creditor: {
          creditorName: creditorName,
          creditorId: creditorId
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectDebtor", function (dropDownId, debtorComponentId) {
      var debtors = _this.state.debtors;
      var debtorDetails = debtors.get(debtorComponentId);
      debtorDetails.debtorSelected = dropDownId;
      debtors.set(debtorComponentId, debtorDetails);

      _this.setState({
        debtors: debtors
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateCreditField", function () {
      if (_this.state.evenly) _this.updateDebtorFields();
    });

    _defineProperty(_assertThisInitialized(_this), "updateDebtorFields", function () {
      if (!_this.state.evenly) {
        _this.setState({
          debtors: _this.state.debtors,
          evenly: _this.state.evenly,
          credit: _this.state.credit
        });

        return;
      }

      var credit = document.getElementById('credit').value;

      _this.setState({
        debtors: _this.state.debtors,
        evenly: _this.state.evenly,
        credit: parseFloat(credit)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addDropdown", function (e) {
      var debtors = _this.state.debtors;
      debtors.set(Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])(), {});

      _this.setState({
        debtors: debtors
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSplitMethod", function (e) {
      if (e.target.innerText == "Evenly") {
        _this.state.evenly = true;
      } else _this.state.evenly = false;

      _this.updateDebtorFields();
    });

    _defineProperty(_assertThisInitialized(_this), "removeDeptor", function (debtorComponentId) {
      var debtors = _this.state.debtors;
      debtors["delete"](debtorComponentId);

      _this.setState(debtors);
    });

    _this.state.debtors = new Map();

    _this.state.debtors.set(Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])(), {});

    _this.state.usersInGroup = _this.props.usersInGroup;
    _this.state.evenly = true;
    _this.state.credit = 0;
    document.addEventListener('clear-expense-form', function (e) {
      // let state = {};
      $("#expense-form")[0].reset();
      var debtors = new Map();
      debtors.set(Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])(), {});
      var usersInGroup = _this.state.usersInGroup;
      var evenly = true;
      var credit = 0;
      console.log(" let clear the form");

      _this.setState({
        debtors: debtors,
        credit: credit,
        evenly: evenly,
        usersInGroup: usersInGroup,
        creditor: undefined
      });
    });
    return _this;
  }

  _createClass(ExpensesForm, [{
    key: "render",
    value: function render() {
      var debtorFields = [];

      var _iterator = _createForOfIteratorHelper(this.state.debtors.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          debtorFields.push( /*#__PURE__*/React.createElement(_DebtorComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            selectDebtor: this.selectDebtor,
            evenly: this.state.evenly,
            usersInGroup: this.state.usersInGroup,
            debtorSelected: this.state.debtors.get(key).debtorSelected,
            id: key,
            key: key,
            debt: this.state.credit / this.state.debtors.size,
            removeDeptor: this.removeDeptor
          }, " "));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return (
        /*#__PURE__*/
        // <!-- Modal -->
        React.createElement("div", {
          className: "modal fade",
          id: "darkModalForm",
          tabIndex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }, /*#__PURE__*/React.createElement("div", {
          className: "modal-dialog form-dark",
          role: "document"
        }, /*#__PURE__*/React.createElement("div", {
          className: "modal-content card card-image",
          style: {
            backgroundColor: 'burlywood'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "text-white rgba-stylish-strong py-5 px-5 z-depth-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "modal-header text-center pb-4"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "modal-title w-100 white-text font-weight-bold",
          id: "myModalLabel"
        }, /*#__PURE__*/React.createElement("strong", null, "Create Expense")), /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "close white-text",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }, /*#__PURE__*/React.createElement("span", {
          "aria-hidden": "true"
        }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
          className: "modal-body"
        }, /*#__PURE__*/React.createElement("form", {
          id: "expense-form",
          method: "POST",
          onSubmit: this.submitForm
        }, /*#__PURE__*/React.createElement("div", {
          className: "md-form mb-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group form-group"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group-prepend"
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-dark dropdown-toggle btn-block",
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }, "Creditor"), /*#__PURE__*/React.createElement("div", {
          className: "dropdown-menu"
        }, /*#__PURE__*/React.createElement(_User_drop_down_listComponent_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
          users: this.props.usersInGroup,
          selectCreditor: this.selectCreditor,
          selectMethod: "Creditor"
        }))), /*#__PURE__*/React.createElement("input", {
          readOnly: true,
          name: "creditor",
          id: "creditor-field",
          type: "text",
          className: "form-control",
          "aria-label": "Text input with dropdown button",
          value: this.state.creditor !== undefined ? this.state.creditor.creditorName : '',
          placeholder: "Creditor"
        }), /*#__PURE__*/React.createElement("input", {
          type: "hidden",
          id: "creditor-id",
          name: "creditorId",
          value: this.state.creditor === undefined ? "Creditor" : this.state.creditor.creditorId
        }))), /*#__PURE__*/React.createElement("div", {
          className: "md-form mb-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group form-group"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group-prepend"
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-dark btn-block",
          type: "button"
        }, "Credit")), /*#__PURE__*/React.createElement("input", {
          id: "credit",
          autoComplete: "off",
          name: "credit",
          onChange: this.updateCreditField,
          value: this.state.credit == 0 ? '' : this.state.credit,
          type: "number",
          step: "0.01",
          className: "form-control",
          placeholder: "$$$"
        }))), /*#__PURE__*/React.createElement("div", {
          className: "md-form mb-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group form-group"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group-prepend"
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-dark dropdown-toggle btn-block",
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }, "Method"), /*#__PURE__*/React.createElement("div", {
          id: "method-payment-dropdown",
          className: "dropdown-menu"
        }, /*#__PURE__*/React.createElement("a", {
          id: "split-evenly",
          onClick: this.changeSplitMethod,
          className: "dropdown-item"
        }, "Evenly"), /*#__PURE__*/React.createElement("a", {
          id: "split-manual",
          onClick: this.changeSplitMethod,
          className: "dropdown-item"
        }, "Manual"))), /*#__PURE__*/React.createElement("input", {
          readOnly: true,
          value: this.state.evenly == true ? "Evenly" : "Manual",
          id: "method-payment-field",
          type: "text",
          className: "form-control",
          "aria-label": "Text input with dropdown button"
        }), /*#__PURE__*/React.createElement("div", {
          id: "link-div"
        }, /*#__PURE__*/React.createElement("a", {
          id: "add-debtor-link",
          href: "#"
        }, " ", /*#__PURE__*/React.createElement("i", {
          className: "fa fa-user-plus ml-2 mt-2 ",
          onClick: this.addDropdown,
          style: {
            color: 'black'
          }
        }), " ")))), /*#__PURE__*/React.createElement("div", {
          id: "debtors-group"
        }, debtorFields), /*#__PURE__*/React.createElement("div", {
          className: "mb-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group form-group"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group-prepend"
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-dark btn-block",
          type: "button"
        }, "Date")), /*#__PURE__*/React.createElement("input", {
          name: "date",
          type: "date",
          className: "form-control",
          onFocus: "(this.type='date')",
          placeholder: "When"
        }))), /*#__PURE__*/React.createElement("div", {
          className: "mb-5"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group form-group"
        }, /*#__PURE__*/React.createElement("div", {
          className: "input-group-prepend"
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-dark btn-block",
          type: "button"
        }, "Info")), /*#__PURE__*/React.createElement("input", {
          name: "desc",
          type: "text",
          className: "form-control",
          autoComplete: "off",
          placeholder: "Description"
        }))), /*#__PURE__*/React.createElement("div", {
          className: "row d-flex align-items-center mb-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "text-center mb-3 col-md-12"
        }, /*#__PURE__*/React.createElement("button", {
          type: "submit",
          className: "btn btn-success btn-block btn-rounded z-depth-1"
        }, "Confirm")))))), /*#__PURE__*/React.createElement("div", {
          id: "alert-warning",
          style: {
            display: 'none'
          },
          className: "modal-footer"
        }, /*#__PURE__*/React.createElement("div", {
          className: "alert alert-warning col-12",
          role: "alert",
          style: {
            paddingBottom: 0
          }
        }, /*#__PURE__*/React.createElement("p", {
          className: "text-center "
        }, /*#__PURE__*/React.createElement("strong", null, "Warning!"), " you dont need any more debtors, trust me! ;)"))), /*#__PURE__*/React.createElement("div", {
          id: "created-expense-success",
          style: {
            display: 'none'
          },
          className: "modal-footer"
        }, /*#__PURE__*/React.createElement("div", {
          className: "alert alert-success col-12",
          role: "alert",
          style: {
            paddingBottom: 0
          }
        }, /*#__PURE__*/React.createElement("p", {
          className: "text-center "
        }, /*#__PURE__*/React.createElement("strong", null, "Success"), " Expense created! Hooray!"))))))
      ); // {/* <!-- Modal -->) */}
    }
  }]);

  return ExpensesForm;
}(React.Component);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User_drop_down_list; });
/* harmony import */ var _User_drop_down_itemComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var User_drop_down_list = /*#__PURE__*/function (_React$Component) {
  _inherits(User_drop_down_list, _React$Component);

  var _super = _createSuper(User_drop_down_list);

  function User_drop_down_list() {
    var _this;

    _classCallCheck(this, User_drop_down_list);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "selectDebtor", function (dropDownId) {
      _this.props.selectDebtor(dropDownId);
    });

    _defineProperty(_assertThisInitialized(_this), "selectCreditor", function (dropDownId) {
      _this.props.selectCreditor(dropDownId);
    });

    return _this;
  }

  _createClass(User_drop_down_list, [{
    key: "render",
    value: function render() {
      var onClickFunc;
      var select;

      if (this.props.selectMethod == "Creditor") {
        onClickFunc = this.selectCreditor;
        select = "selectDebtor";
      } else if (this.props.selectMethod == "Debtor") {
        onClickFunc = this.selectDebtor;
        select = "selectCreditor";
      }

      var usersInGroup = this.props.users;
      var dropDownList = []; // for (let key of Object.keys(userNamesInGroup)) {
      //     // mapping={index} 
      //     let dropDownItem = <User_drop_down_item selectDebtor={select == "selectDebtor" ? onClickFunc : null} selectCreditor={select == "selectCreditor" ? onClickFunc : null} userFirstName={userNamesInGroup[key].firstName} key={key} itemId={key} inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId} />
      //     dropDownList.push(dropDownItem);
      // }

      var _iterator = _createForOfIteratorHelper(usersInGroup.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          dropDownList.push( /*#__PURE__*/React.createElement(_User_drop_down_itemComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
            selectDebtor: select == "selectDebtor" ? onClickFunc : null,
            selectCreditor: select == "selectCreditor" ? onClickFunc : null,
            userFirstName: usersInGroup.get(key).firstName,
            key: key,
            itemId: key
          }));
        } // inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId}

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, " ", dropDownList, " ");
    }
  }]);

  return User_drop_down_list;
}(React.Component);



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User_drop_down_item; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User_drop_down_item = /*#__PURE__*/function (_React$Component) {
  _inherits(User_drop_down_item, _React$Component);

  var _super = _createSuper(User_drop_down_item);

  function User_drop_down_item() {
    var _this;

    _classCallCheck(this, User_drop_down_item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "selectDebtor", function () {
      _this.props.selectDebtor(_this.props.itemId);
    });

    _defineProperty(_assertThisInitialized(_this), "selectCreditor", function () {
      _this.props.selectCreditor(_this.props.itemId);
    });

    return _this;
  }

  _createClass(User_drop_down_item, [{
    key: "render",
    value: function render() {
      var onClickFunc;

      if (this.props.selectDebtor) {
        onClickFunc = this.selectDebtor;
      } else if (this.props.selectCreditor) {
        onClickFunc = this.selectCreditor;
      } // map={this.props.mapping}


      return /*#__PURE__*/React.createElement("a", {
        className: "dropdown-item",
        onClick: onClickFunc,
        href: "#"
      }, this.props.userFirstName);
    }
  }]);

  return User_drop_down_item;
}(React.Component);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Debtor; });
/* harmony import */ var _User_drop_down_listComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// React Component to create the debtors row in the create expense form 
// depends on User_drop_down_list and User_drop_down_item


var Debtor = /*#__PURE__*/function (_React$Component) {
  _inherits(Debtor, _React$Component);

  var _super = _createSuper(Debtor);

  function Debtor() {
    var _this;

    _classCallCheck(this, Debtor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "removeDeptor", function (e) {
      _this.props.removeDeptor(_this.props.id);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      console.log('event fired', e); // this.props.debt = 4444;
    });

    _defineProperty(_assertThisInitialized(_this), "selectDebtor", function (dropDownId) {
      _this.props.selectDebtor(dropDownId, _this.props.id);
    });

    return _this;
  }

  _createClass(Debtor, [{
    key: "render",
    value: function render() {
      var isDebtorSelected;
      var debtorName;

      if (this.props.debtorSelected === undefined) {
        isDebtorSelected = false;
      } else {
        var usersInGroup = this.props.usersInGroup;
        debtorName = usersInGroup.get(this.props.debtorSelected).firstName;

        if (debtorName != undefined) {
          isDebtorSelected = true;
        }
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "md-form mb-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-dark dropdown-toggle btn-block",
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, "Debtor"), /*#__PURE__*/React.createElement("div", {
        className: "dropdown-menu"
      }, /*#__PURE__*/React.createElement(_User_drop_down_listComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
        users: this.props.usersInGroup,
        selectDebtor: this.selectDebtor,
        selectMethod: "Debtor"
      })))), /*#__PURE__*/React.createElement("input", {
        readOnly: true,
        name: "debtor",
        type: "text",
        className: "form-control",
        placeholder: "Bitch",
        value: this.props.isDebtorSelected === undefined ? debtorName : "Bitch"
      }), /*#__PURE__*/React.createElement("input", {
        type: "number",
        className: "form-control",
        name: "debt",
        onChange: this.onChange,
        readOnly: this.props.evenly,
        value: this.props.evenly == true ? this.props.debt.toFixed(2) : console.log('hey'),
        placeholder: "Debt"
      }), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "debtorId",
        value: this.props.debtorSelected === undefined ? null : this.props.debtorSelected
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
        href: "#"
      }, "  ", /*#__PURE__*/React.createElement("i", {
        className: "fa fa-times ml-2 mt-2",
        onClick: this.removeDeptor,
        "aria-hidden": "true",
        style: {
          color: 'black'
        }
      }), " ")))), " ");
    }
  }]);

  return Debtor;
}(React.Component);



/***/ })
/******/ ]);