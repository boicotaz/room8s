var mainPageExport =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMainPage", function() { return getMainPage; });
/* harmony import */ var _components_mainPage_MainPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _ajax_groupMessagesAjax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// var user;
// var usernames;
// var usernamesInGroup;


 // import {getAllUsers} from "../ajax/userAjax";

var getMainPage = function getMainPage(user) {
  if ($("#group-dashboard").length) return;
  $("#content").remove();
  $("#content-container").append("<div id = 'content'></div>");
  console.log("i was called__________________________________________________________________________");
  Promise.all([_ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__["grouDetailsAjax"].getUsersInGroupDetails(), _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__["grouDetailsAjax"].getGroupDetails(), _ajax_groupMessagesAjax__WEBPACK_IMPORTED_MODULE_2__["groupMessagesAjax"].getGroupMessages()]).then(function (res) {
    console.log('Results are from Promise.all: ', res);

    var _res = _slicedToArray(res, 3),
        usersInGroup = _res[0],
        groupDetails = _res[1],
        groupMessages = _res[2];

    ReactDOM.render( /*#__PURE__*/React.createElement(_components_mainPage_MainPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
      usersInGroup: usersInGroup,
      groupDetails: groupDetails,
      currentUser: user,
      groupMessages: groupMessages
    }, " "), document.getElementById('content'));
  })["catch"](function (error) {
    return console.log(error);
  });
};

getMainPage(loggedInUser);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainPage; });
/* harmony import */ var _GroupComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _GroupChatComponent_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
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



/**
 * @typedef groupMessages
 * @type {object}
 * @property {number} groupMessages.id 
 * @property {number} groupMessages.groupId - the group that the chat belongs
 * @property {string} groupMessages.messageText 
 * @property {number} groupMessages.userId 
 * @property {date} groupMessages.timeSent
 */

var MainPage = /*#__PURE__*/function (_React$Component) {
  _inherits(MainPage, _React$Component);

  var _super = _createSuper(MainPage);

  // state = {}
  function MainPage(props) {
    var _this;

    _classCallCheck(this, MainPage);

    _this = _super.call(this, props);
    _this.state = {};
    _this.state.usersInGroup = _this.props.usersInGroup;
    _this.state.groupDetails = _this.props.groupDetails;
    _this.state.currentUser = _this.props.currentUser;
    _this.state.groupMessages = _this.props.groupMessages;
    var usersInGroupMap = new Map(); // props.usersInGroup.forEach(user => {
    //     usersInGroupMap.set(user[2], `${user[0]} ${user[1]}`);
    // });
    // for (let key of usersInGroupMap.keys()) {
    //     console.log(usersInGroupMap.get(key));
    // }

    return _this;
  }

  _createClass(MainPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $("#content-container").fadeIn('slow');
      var groupChatBody = document.getElementById("groupChatBody");
      groupChatBody.scrollTop = groupChatBody.scrollHeight;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      // console.log("I AM UNMOUNTED!!!!");
      $("#content-container").css("display", "none");
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "row mt-5"
      }, /*#__PURE__*/React.createElement(_GroupComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
        usersInGroup: this.state.usersInGroup,
        groupDetails: this.state.groupDetails,
        currentUser: this.state.currentUser
      }, " "), /*#__PURE__*/React.createElement(_GroupChatComponent_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        usersInGroup: this.state.usersInGroup,
        currentUser: this.state.currentUser,
        groupMessages: this.state.groupMessages,
        groupDetails: this.state.groupDetails
      })));
    }
  }]);

  return MainPage;
}(React.Component);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Group; });
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

var Group = /*#__PURE__*/function (_React$Component) {
  _inherits(Group, _React$Component);

  var _super = _createSuper(Group);

  function Group(props) {
    var _this;

    _classCallCheck(this, Group);

    _this = _super.call(this, props);
    _this.state = {};
    _this.state.usersInGroup = _this.props.usersInGroup;
    _this.state.groupDetails = _this.props.groupDetails;
    var usersInGroupId = [];

    var _iterator = _createForOfIteratorHelper(_this.state.usersInGroup.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        usersInGroupId.push(_this.state.usersInGroup.get(key).userId);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    console.log("The log status event is: ", getUserLoggedStatusEvent);
    document.addEventListener('LoggedOffStatus', function (e) {
      console.log("In group component the logged of userId is_____________________ ", e.detail);
      var loggedOffUserId = e.detail;

      if (_this.state.loggedInMembersId) {
        if (_this.state.loggedInMembersId.includes(loggedOffUserId)) {
          var loggedInMembersId = [];
          loggedInMembersId = _this.state.loggedInMembersId.filter(function (userId) {
            if (userId != loggedOffUserId) {
              return userId;
            }
          });

          _this.setState({
            loggedInMembersId: loggedInMembersId
          });
        }
      }
    });

    if (getUserLoggedStatusEvent == undefined) {
      var getUserLoggedStatusEvent = new CustomEvent('LoggedInStatus', {
        detail: {
          currentUserId: _this.props.currentUser.id,
          usersInGroupId: usersInGroupId
        }
      });
      document.addEventListener('LoggedInStatusReply', function (e) {
        console.log("i am in GROUP Compenent the user's ID online are", e.detail);

        _this.setState({
          loggedInMembersId: e.detail
        });
      });
    }

    document.dispatchEvent(getUserLoggedStatusEvent);
    return _this;
  }

  _createClass(Group, [{
    key: "render",
    value: function render() {
      console.log("I should be rerendered since a new user in group connected...");
      var groupComponents = [];
      var usersInGroupDetails = this.state.usersInGroup;

      var _iterator2 = _createForOfIteratorHelper(usersInGroupDetails.keys()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var key = _step2.value;
          groupComponents.push( /*#__PURE__*/React.createElement(GroupMember, {
            userDetails: usersInGroupDetails.get(key),
            key: key,
            groupMemberId: key,
            loggedInMembersId: this.state.loggedInMembersId
          }));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return /*#__PURE__*/React.createElement("div", {
        id: "group-dashboard",
        className: "jumbotron col-3 ml-5"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "display-6"
      }, " ", /*#__PURE__*/React.createElement("i", {
        className: "fa fa-home"
      }, " "), " ", this.state.groupDetails.groupName, " "), /*#__PURE__*/React.createElement("hr", {
        className: "my-4"
      }), /*#__PURE__*/React.createElement("p", {
        className: "lead"
      }, " Users in group "), /*#__PURE__*/React.createElement("div", {
        id: "usersInGroup",
        className: "lead"
      }, console.log("userInGroup var is_______________________________", this.state.usersInGroup), groupComponents), /*#__PURE__*/React.createElement("button", {
        id: "add-user",
        type: "button",
        "data-toggle": "modal",
        "data-target": "#addUserForm",
        className: "btn btn-secondary mt-5"
      }, " Add users in group "));
    }
  }]);

  return Group;
}(React.Component);



var GroupMember = /*#__PURE__*/function (_React$Component2) {
  _inherits(GroupMember, _React$Component2);

  var _super2 = _createSuper(GroupMember);

  function GroupMember() {
    _classCallCheck(this, GroupMember);

    return _super2.apply(this, arguments);
  }

  _createClass(GroupMember, [{
    key: "render",
    value: function render() {
      // let [userFirstName, userLastName, userId] = this.props.user;
      var loggedInStatus;

      if (this.props.loggedInMembersId === undefined) {
        loggedInStatus = "btn-danger";
      } else {
        if (this.props.loggedInMembersId.includes(this.props.groupMemberId)) {
          loggedInStatus = "btn-success";
        } else {
          loggedInStatus = "btn-danger";
        }
      } // btn-danger


      return /*#__PURE__*/React.createElement("a", {
        className: "btn btn-lg mr-1 mb-2 " + loggedInStatus,
        href: "#",
        role: "button"
      }, this.props.userDetails.firstName);
    }
  }]);

  return GroupMember;
}(React.Component);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GroupChat; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ajax_groupMessagesAjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _MessageComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

 // import regeneratorRuntime from "regenerator-runtime";




var GroupChat = /*#__PURE__*/function (_React$Component) {
  _inherits(GroupChat, _React$Component);

  var _super = _createSuper(GroupChat);

  function GroupChat(props) {
    var _this;

    _classCallCheck(this, GroupChat);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "submitMessageEnterKey", function (e) {
      if (e.keyCode === 13) {
        console.log("enter key pressed_______--");

        if ($('#searchText').val() != "") {
          var messageText = $('#searchText').val();
          console.log($('#searchText').val());
          $('#searchText').val("");

          _this.renderNewMessage(messageText);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "submitMessageClickKey", function (e) {
      if ($('#searchText').val() != "") {
        console.log("click pressed_______--");
        var messageText = $('#searchText').val();
        console.log($('#searchText').val());
        $('#searchText').val("");

        _this.renderNewMessage(messageText);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "storeNewMessage", function (newMsg) {
      console.log("in store newMsg:", newMsg);
      newMsg.groupId = _this.state.groupDetails.groupId;
      _ajax_groupMessagesAjax__WEBPACK_IMPORTED_MODULE_1__["groupMessagesAjax"].storeNewMessage(newMsg);
    });

    _defineProperty(_assertThisInitialized(_this), "renderNewMessage", function (msgText) {
      var date = new Date();
      var newMsg = {};
      newMsg.userId = _this.state.currentUser.id;
      newMsg.messageText = msgText;
      newMsg.timeSent = date.toLocaleString().replace(",", "").replace(/:.. /, " ");

      _this.broadcastMessage(newMsg);

      _this.setState({
        groupMessages: [].concat(_toConsumableArray(_this.state.groupMessages), [newMsg])
      });

      newMsg.timeSent = date.toMysqlFormat();

      _this.storeNewMessage(newMsg);
    });

    _defineProperty(_assertThisInitialized(_this), "processUsersInGroup", function (usersInGroup) {
      var _usersInGroup = _slicedToArray(usersInGroup, 3),
          firstName = _usersInGroup[0],
          lastName = _usersInGroup[1],
          userId = _usersInGroup[2];

      var userNames = new Map();
      usersInGroup.forEach(function (userName) {
        userNames.set(userName[2], userName[0] + " " + userName[1]);
      });
      return userNames;
    });

    _defineProperty(_assertThisInitialized(_this), "broadcastMessage", function (newMsg) {
      var newMsgDetails = {};
      newMsgDetails.message = newMsg;

      var groupUsers = _this.processUsersInGroup(_this.state.usersInGroup);

      groupUsers["delete"](_this.state.currentUser.id);
      var groupUsersIds = [];

      var _iterator = _createForOfIteratorHelper(groupUsers.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          groupUsersIds.push(key);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      newMsgDetails.groupUsersIds = groupUsersIds;
      var broadcastMessageEvent = new CustomEvent('newGroupMessageCreated', {
        detail: newMsgDetails
      });
      document.dispatchEvent(broadcastMessageEvent);
    });

    _this.state = {};
    _this.state.usersInGroup = _this.props.usersInGroup;
    _this.state.currentUser = _this.props.currentUser;
    _this.state.groupMessages = _this.props.groupMessages;
    _this.state.groupDetails = _this.props.groupDetails;
    document.addEventListener('newGroupMessageCreated', function (e) {
      socket.emit("broadcastNewGroupMessage", e.detail);
    });
    document.addEventListener('newGroupMessageReceived', function (e) {
      var newMsg = e.detail;

      _this.setState({
        groupMessages: [].concat(_toConsumableArray(_this.state.groupMessages), [newMsg])
      });
    });
    document.addEventListener('userChangedPhoto', function (e) {
      console.log("caught event change photo");

      var userDetail = _this.state.usersInGroup.get(e.detail.userId);

      if (userDetail != undefined) {
        _this.state.userImageChanged = e.detail.userId;

        _this.forceUpdate();
      }
    });
    return _this;
  }

  _createClass(GroupChat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("searchText").addEventListener("keydown", this.submitMessageEnterKey, false);
      console.log("I was mounted_________________", document.getElementById("groupChatBody"));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var groupChatBody = document.getElementById("groupChatBody");
      groupChatBody.scrollTop = groupChatBody.scrollHeight;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.getElementById("searchText").removeEventListener("keydown", this.submitMessageEnterKey, false);
      document.removeEventListener('newGroupMessageCreated');
      document.removeEventListener('newGroupMessageReceived');
      this.state.userImageChanged = undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log("Group messages are__________________________________________", this.state.groupMessages);
      // console.log("Group Details are__________________________________________", this.state.groupDetails);
      // console.log("Group Users are__________________________________________", this.state.usersInGroup);
      console.log('group chat forced to rerender');
      var groupChat = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "container col-4",
        id: "groupChat",
        style: {
          height: '516px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-12 bg-dark rounded-top rounded-right rounded-left border-bottom"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row justify-content-start"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/public/room8s_logo.png",
        className: "col-2"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-warning mb-0",
        style: {
          fontSize: "20px"
        }
      }, " ", this.state.groupDetails.groupName + " Chat", " ")))), /*#__PURE__*/React.createElement("div", {
        className: "row scrollbar scrollbar-primary",
        id: "groupChatBody",
        style: {
          height: '70%',
          overflowY: 'scroll'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-12 bg-light rounded"
      }, this.state.groupMessages.map(function (message) {
        return /*#__PURE__*/React.createElement(_MessageComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
          key: Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(),
          userImageChanged: _this2.state.userImageChanged,
          message: message,
          currentUser: _this2.state.currentUser,
          groupDetails: _this2.state.groupDetails,
          usersInGroup: _this2.state.usersInGroup
        });
      }))), /*#__PURE__*/React.createElement("div", {
        className: "row",
        style: {
          height: '15%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-12 p-0 bg-secondary rounded d-flex align-items-center"
      }, /*#__PURE__*/React.createElement("input", {
        autoComplete: "off",
        id: "searchText",
        placeholder: "Type le Message...",
        type: "text",
        className: "bg-light text-dark col-12 w-100 h-100"
      })))));
      return groupChat;
    }
  }]);

  return GroupChat;
}(React.Component);



var twoDigits = function twoDigits(d) {
  if (0 <= d && d < 10) return "0" + d.toString();
  if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
  return d.toString();
};

Date.prototype.toMysqlFormat = function () {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

/***/ }),
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupMessagesAjax", function() { return groupMessagesAjax; });
var getGroupMessages = function getGroupMessages() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/home/get-group-messages',
      method: 'GET',
      dataType: "json",
      success: function success(groupMessages) {
        console.log('get group message data:', groupMessages);
        resolve(groupMessages);
      },
      error: function error(_error) {
        reject(_error);
      }
    });
  });
};

var storeNewMessage = function storeNewMessage(newMsg) {
  console.log(newMsg);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/home/store-group-message',
      method: 'POST',
      dataType: "json",
      data: newMsg,
      success: function success(status) {
        console.log('store new msg status', status);
        resolve(status);
      },
      error: function error(_error2) {
        reject(_error2);
      }
    });
  });
};

var groupMessagesAjax = {};
groupMessagesAjax.getGroupMessages = getGroupMessages;
groupMessagesAjax.storeNewMessage = storeNewMessage;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Message; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
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



var Message = /*#__PURE__*/function (_React$Component) {
  _inherits(Message, _React$Component);

  var _super = _createSuper(Message);

  function Message(props) {
    var _this;

    _classCallCheck(this, Message);

    _this = _super.call(this, props);
    _this.state = {};
    _this.state.message = _this.props.message;
    _this.state.currentUser = _this.props.currentUser;
    _this.state.groupDetails = _this.props.groupDetails;
    _this.state.usersInGroup = _this.props.usersInGroup;
    _this.state.userImageChanged = _this.props.userImageChanged;
    return _this;
  }

  _createClass(Message, [{
    key: "render",
    value: function render() {
      console.log('message forced to rerender');
      var message = this.state.message;
      var currentUser = this.state.currentUser;
      var usersDetails = this.state.usersInGroup;
      var renderedMessage;
      var date = formatDate(new Date(message.timeSent));
      var popUpText = usersDetails.get(message.userId).firstName + " " + usersDetails.get(message.userId).lastName + " - " + date;
      var imgPath;

      if (usersDetails.get(message.userId).profImgExists) {
        imgPath = "public/uploads/profImg_user" + message.userId + "_.png";

        if (this.state.userImageChanged == message.userId) {
          imgPath += "?v=" + Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
        }
      } else {
        imgPath = "public/info.png";
      }

      if (message.userId == currentUser.id) {
        renderedMessage = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "row mt-2 mb-2 justify-content-end"
        }, /*#__PURE__*/React.createElement("p", {
          "data-toggle": "tooltip",
          "data-placement": "right",
          "data-html": "false",
          title: popUpText,
          style: {
            display: "inline-block",
            maxWidth: "70%",
            overflow: "auto",
            wordWrap: "break-word"
          },
          className: "text-light bg-primary rounded p-2 mr-2"
        }, message.messageText)));
      } else {
        renderedMessage = /*#__PURE__*/React.createElement("div", {
          className: "row mt-2 mb-2"
        }, /*#__PURE__*/React.createElement("img", {
          src: imgPath,
          "data-toggle": "tooltip",
          "data-placement": "right",
          "data-html": "false",
          title: popUpText,
          className: "mr-2 ml-2 img-thumbnail rounded-circle",
          style: {
            width: '8%',
            height: '8%'
          },
          alt: "UserImg"
        }), /*#__PURE__*/React.createElement("p", {
          style: {
            display: "inline-block",
            maxWidth: "70%",
            overflow: "auto",
            wordWrap: "break-word"
          },
          className: "text-light bg-dark rounded  p-2"
        }, message.messageText));
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, " ", renderedMessage, " ");
    }
  }]);

  return Message;
}(React.Component);
/**
 * 
 * @param {Date} date 
 * @return {string} - the formatted date E.g. "6 March 2020 - 14:58"
 */




function formatDate(date) {
  var month = [];
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var hourSent = date.getHours();
  var minuteSent = date.getMinutes();

  if (hourSent < 10) {
    hourSent = '0' + hourSent;
  }

  if (minuteSent < 10) {
    minuteSent = '0' + minuteSent;
  }

  var customDateHoursMins = " - " + hourSent + ":" + minuteSent;
  var customDate = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear() + customDateHoursMins;
  return customDate;
}

/***/ }),
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


/***/ })
/******/ ]);