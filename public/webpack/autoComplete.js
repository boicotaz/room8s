var autoCompleteExport =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
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

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajax_userAjax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



$(document).ready(function () {
  groupUserAutocomplete(_ajax_userAjax__WEBPACK_IMPORTED_MODULE_0__["userAjax"], _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__["grouDetailsAjax"], substringMatcher);
  userAutocomplete(_ajax_userAjax__WEBPACK_IMPORTED_MODULE_0__["userAjax"], substringMatcher);
});

var substringMatcher = function substringMatcher(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    var stringsToMatch = strs.local.map(function (entry) {
      return entry[0];
    }); // an array that will be populated with substring matches

    matches = []; // regex used to determine if a string contains the substring `q`

    var substrRegex = new RegExp(q, 'i'); // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array

    $.each(stringsToMatch, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

var userAutocomplete = function userAutocomplete(userAjax, matcherFunction) {
  // create search bar
  userAjax.getAllUsers().then(function (values) {
    var allUsers = values;
    var users_suggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      // see its meaning above
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // see its meaning above
      local: allUsers
    });
    $('#search-bar').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'user_suggestions',
      source: matcherFunction(users_suggestions) // Bloodhound instance is passed as the source

    });
  });
};

var groupUserAutocomplete = function groupUserAutocomplete(userAjax, groupAjax, matcherFunction) {
  // create add user in group search bar
  Promise.all([userAjax.getAllUsers(), _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__["grouDetailsAjax"].getUsersInGroupDetails()]).then(function (usersInfo) {
    var _usersInfo = _slicedToArray(usersInfo, 2),
        allUsers = _usersInfo[0],
        groupUsersDetails = _usersInfo[1];

    console.log(groupUsersDetails);
    var idsInGroup = [];

    var _iterator = _createForOfIteratorHelper(groupUsersDetails.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        var userDetails = groupUsersDetails.get(key);
        idsInGroup.push(userDetails.userId);
      } // let idsInGroup = groupUsers.map(user => elem[1]);
      // suggest users that are not already in the group

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var correctUsers = allUsers.filter(function (elem) {
      if (!idsInGroup.includes(elem[1])) return elem;
    });
    var add_in_group_suggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      // see its meaning above
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // see its meaning above
      local: correctUsers
    });
    $('#add-user-in-group-field').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'add_in_group_suggestions',
      source: matcherFunction(add_in_group_suggestions) // Bloodhound instance is passed as the source

    });
  });
}; // $('#add-user-form').submit(function (event) {
//     event.preventDefault();
//     let data = $(this).serializeArray();
//     data[0].user = user;
//     var request = $.ajax({
//         url: '/add-user-in-group',
//         type: "POST",
//         data: data[0],
//         dataType: "json",
//         success: function (returnedData) {
//             $("#strong-added-success").text(data[0].value);
//             $("#user-added-success").show(function () {
//                 var myVar = setInterval(myTimer, 3000);
//                 function myTimer() {
//                     $('#addUserForm').modal('hide');
//                     window.clearInterval(myVar);
//                 }
//             });
//             renderGroup(returnedData.group);
//         }
//     });
// });

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userAjax", function() { return userAjax; });
var getAllUsers = function getAllUsers() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get-users',
      type: "GET",
      success: function success(returnedData) {
        resolve(returnedData);
      },
      error: function error(_error) {
        reject(_error);
      }
    });
  });
};

var getCurrentUser = function getCurrentUser() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get-current-user',
      type: 'GET',
      success: function success(currentUser) {
        resolve(currentUser);
      },
      error: function error(_error2) {
        reject(_error2);
      }
    });
  });
};

var userAjax = {};
userAjax.getAllUsers = getAllUsers;
userAjax.getCurrentUser = getCurrentUser;


/***/ })

/******/ });