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
/* harmony import */ var _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _ajax_groupMessagesAjax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  Promise.all([_ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__["grouDetailsAjax"].getUsersInGroup(), _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__["grouDetailsAjax"].getGroupDetails(), Object(_ajax_groupMessagesAjax__WEBPACK_IMPORTED_MODULE_2__["getGroupMessages"])()]).then(function (res) {
    console.log('Results are from Promise.all: ', res);

    var _res = _slicedToArray(res, 3),
        usersInGroup = _res[0],
        groupDetails = _res[1],
        groupMessages = _res[2];

    ReactDOM.render(React.createElement(_components_mainPage_MainPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
      usersInGroup: usersInGroup,
      groupDetails: groupDetails,
      currentUser: user
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var MainPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MainPage, _React$Component);

  // state = {}
  function MainPage(props) {
    var _this;

    _classCallCheck(this, MainPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainPage).call(this, props));
    _this.state = {};
    _this.state.usersInGroup = props.usersInGroup;
    _this.state.groupDetails = props.groupDetails;
    _this.state.currentUser = props.currentUser;
    var usersInGroupMap = new Map();
    props.usersInGroup.forEach(function (user) {
      usersInGroupMap.set(user[2], "".concat(user[0], " ").concat(user[1]));
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = usersInGroupMap.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        console.log(usersInGroupMap.get(key));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }

  _createClass(MainPage, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "row"
      }, React.createElement(_GroupComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
        usersInGroup: this.state.usersInGroup,
        groupDetails: this.state.groupDetails,
        currentUser: this.state.currentUser
      }, " "));
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Group =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Group, _React$Component);

  function Group(props) {
    var _this;

    _classCallCheck(this, Group);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Group).call(this, props));
    _this.state = {};
    _this.state.usersInGroup = props.usersInGroup;
    _this.state.groupDetails = props.groupDetails;
    var usersInGroupId = props.usersInGroup.map(function (elem) {
      return elem[2];
    });
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
          currentUserId: props.currentUser.id,
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
      var _this2 = this;

      console.log("I should be rerendered since a new user in group connected...");
      return React.createElement("div", {
        id: "group-dashboard",
        className: "jumbotron col-3 ml-5 mt-3"
      }, React.createElement("h1", {
        className: "display-6"
      }, " ", React.createElement("i", {
        className: "fa fa-home"
      }, " "), " ", this.state.groupDetails.groupName, " "), React.createElement("hr", {
        className: "my-4"
      }), React.createElement("p", {
        className: "lead"
      }, " Users in group "), React.createElement("div", {
        id: "usersInGroup",
        className: "lead"
      }, console.log("userInGroup var is_______________________________", this.state.usersInGroup), this.state.usersInGroup.map(function (user) {
        return React.createElement(GroupMember, {
          user: user,
          key: user[1],
          groupMemberId: user[1],
          loggedInMembersId: _this2.state.loggedInMembersId
        });
      })), React.createElement("button", {
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



var GroupMember =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(GroupMember, _React$Component2);

  function GroupMember() {
    _classCallCheck(this, GroupMember);

    return _possibleConstructorReturn(this, _getPrototypeOf(GroupMember).apply(this, arguments));
  }

  _createClass(GroupMember, [{
    key: "render",
    value: function render() {
      var _this$props$user = _slicedToArray(this.props.user, 3),
          userFirstName = _this$props$user[0],
          userLastName = _this$props$user[1],
          userId = _this$props$user[2];

      var loggedInStatus;

      if (this.props.loggedInMembersId === undefined) {
        loggedInStatus = "btn-danger";
      } else {
        if (this.props.loggedInMembersId.includes(userId)) {
          loggedInStatus = "btn-success";
        } else {
          loggedInStatus = "btn-danger";
        }
      } // btn-danger


      return React.createElement("a", {
        className: "btn btn-lg mr-1 mb-2 " + loggedInStatus,
        href: "#",
        role: "button"
      }, this.props.user[0]);
    }
  }]);

  return GroupMember;
}(React.Component);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grouDetailsAjax", function() { return grouDetailsAjax; });
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

var getUsersInGroup = function getUsersInGroup() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get-users-in-group',
      type: 'POST',
      success: function success(usersInGroup) {
        var usernamesInGroup = usersInGroup;
        window.dispatchEvent(evt);
        resolve(usersInGroup);
      },
      error: function error(_error2) {
        reject(_error2);
      }
    });
  });
};

var grouDetailsAjax = {};
grouDetailsAjax.getGroupDetails = getGroupDetails;
grouDetailsAjax.getUsersInGroup = getUsersInGroup;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroupMessages", function() { return getGroupMessages; });
function getGroupMessages() {
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
}



/***/ })
/******/ ]);