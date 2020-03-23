var notifcationsExport =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_navbar_NotificationsComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);


var renderNotifications = function renderNotifications() {
  ReactDOM.render( /*#__PURE__*/React.createElement(_components_navbar_NotificationsComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "  "), document.getElementById('notifications'));
};

renderNotifications();

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Notifications; });
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

var Notifications = /*#__PURE__*/function (_React$Component) {
  _inherits(Notifications, _React$Component);

  var _super = _createSuper(Notifications);

  function Notifications() {
    _classCallCheck(this, Notifications);

    return _super.apply(this, arguments);
  }

  _createClass(Notifications, [{
    key: "render",
    value: function render() {
      var notifications = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
        className: "nav-link dropdown-toggle dr",
        href: "#",
        id: "navbarDropdownMenuLink",
        role: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, "Notifications", /*#__PURE__*/React.createElement("span", {
        className: "badge badge-pill badge-light"
      }, "4")), /*#__PURE__*/React.createElement("div", {
        className: "dropdown-menu dropdown-menu-right",
        style: {
          backgroundColor: "#008b8b",
          width: "400px"
        },
        "aria-labelledby": "navbarDropdownMenuLink"
      }, /*#__PURE__*/React.createElement("div", {
        className: "dropdown-item pl-0 pr-0 border-top border-dark"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container h-100"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row mt-1 h-100"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-2 ml-0 pl-0"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/public/info.png",
        alt: "UserImg"
      })), /*#__PURE__*/React.createElement("div", {
        className: "col-10"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-light rounded",
        style: {
          width: '100%',
          overflowWrap: "break-word",
          whiteSpace: "pre-line"
        }
      }, "Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify"))))), /*#__PURE__*/React.createElement("div", {
        className: "dropdown-item pl-0 pr-0 border-top border-dark"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container h-100"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row mt-1 h-100"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-2 ml-0 pl-0"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/public/_MG_2496.jpg",
        alt: "UserImg",
        className: "rounded",
        style: {
          height: "50%",
          width: "50%"
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "col-10"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-light rounded",
        style: {
          width: '100%',
          overflowWrap: "break-word",
          whiteSpace: "pre-line"
        }
      }, "Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify")))))));
      return notifications;
    }
  }]);

  return Notifications;
}(React.Component);



/***/ })

/******/ });