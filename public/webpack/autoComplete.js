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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
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

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajax_userAjax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _ajax_groupDetailsAjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  Promise.all([userAjax.getAllUsers(), groupAjax.getUsersInGroup()]).then(function (usersInfo) {
    var _usersInfo = _slicedToArray(usersInfo, 2),
        allUsers = _usersInfo[0],
        groupUsers = _usersInfo[1];

    var idsInGroup = groupUsers.map(function (elem) {
      return elem[1];
    }); // suggest users that are not already in the group

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

/***/ 21:
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