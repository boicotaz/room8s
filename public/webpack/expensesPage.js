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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExpensesPage", function() { return getExpensesPage; });
/* harmony import */ var _components_expensesPage_ExpensesPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _components_expensesPage_ExpensesFormComponent_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var getExpensesPage = function getExpensesPage() {
  $("#content").remove();
  $("#content-container").append("<div id = 'content'></div>");
  Promise.all([_ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].getGroupInfoAjax(), _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].getExpenseDataAjax(), _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].getExpenseTotalsDataAjax()]).then(function (res) {
    var _res = _slicedToArray(res, 3),
        userNames = _res[0],
        expenseData = _res[1],
        expensesTotals = _res[2]; // console.log("Promise.all for expenses are_____________", userNames, expenseData, expensesTotals);


    var processedData = _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_2__["expensesAjax"].processData(expenseData, userNames);
    ReactDOM.render(React.createElement(_components_expensesPage_ExpensesPageComponent_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
      view: "eachExpense",
      expenses: processedData,
      totals: expensesTotals,
      userNamesInGroup: userNames
    }, "  "), document.getElementById('content'));
    var processedUserNames = processUserNames(userNames);
    ReactDOM.render(React.createElement(_components_expensesPage_ExpensesFormComponent_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      usersInGroup: processedUserNames
    }), document.getElementById('CreateFormContent'));
  })["catch"](function (error) {
    return console.log(error);
  });
};
/**
 * @typedef proccessedUserNames
 * @type {object}
 * @property {object} userId 
 * @property {string} userId.firstName
 * @property {string} userId.lastName
 * @example - {'1':{firstName:"Tolis",lastName:"Gerodimos"}}
 * 
 */

/**
 * 
 * @param {import("../ajax/expensesAjax.js").userNames} userNames
 * @returns {proccessedUserNames} 
 */


var processUserNames = function processUserNames(userNames) {
  var proccessedUserNames = {};
  userNames.forEach(function (userNameTuple) {
    var _userNameTuple = _slicedToArray(userNameTuple, 3),
        firstName = _userNameTuple[0],
        lastName = _userNameTuple[1],
        userId = _userNameTuple[2];

    proccessedUserNames[userId] = {};
    proccessedUserNames[userId].firstName = firstName;
    proccessedUserNames[userId].lastName = lastName;
  });
  return proccessedUserNames;
};



/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExpensesPage; });
/* harmony import */ var _ajax_expensesAjax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ExpensesPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExpensesPage, _React$Component);

  function ExpensesPage(props) {
    var _this;

    _classCallCheck(this, ExpensesPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExpensesPage).call(this, props));

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
    _this.state.view = props.view;
    _this.state.expenses = props.expenses;
    _this.state.totals = props.totals;
    _this.state.userNamesInGroup = props.userNamesInGroup;
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

      var expensePage = React.createElement("div", {
        id: "expenses-content",
        className: "container",
        style: {
          marginTop: '250px'
        }
      }, React.createElement("div", {
        className: "row",
        id: "buttons-row"
      }, React.createElement("div", {
        className: "col-12"
      }, React.createElement("div", {
        className: "btn-group btn-group-md",
        role: "group",
        "aria-label": "Basic example"
      }, React.createElement("button", {
        type: "button",
        className: "btn btn-secondary",
        "data-toggle": "modal",
        "data-target": "#darkModalForm"
      }, "Create Expense"), React.createElement("button", {
        type: "button",
        onClick: this.toggleView,
        className: "btn btn-secondary"
      }, buttonText)))), React.createElement("div", {
        id: "expense-table-id",
        className: "row"
      }, React.createElement("div", {
        className: "col-12 pr-0"
      }, React.createElement("table", {
        id: "expenses-table",
        className: "table table-hover table-dark "
      }, React.createElement(ExpensesTable, {
        expenses: this.state.expenses,
        totals: this.state.totals,
        userNamesInGroup: this.state.userNamesInGroup,
        view: this.state.view
      })))), React.createElement("div", {
        id: "modals-container"
      }));
      return React.createElement(React.Fragment, null, "  ", expensePage, " ");
    }
  }]);

  return ExpensesPage;
}(React.Component); //React componenent that dynamically creates the expense table




var ExpensesTable =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ExpensesTable, _React$Component2);

  function ExpensesTable(props) {
    var _this2;

    _classCallCheck(this, ExpensesTable);

    console.log("i");
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ExpensesTable).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      expenses: [],
      totals: {}
    });

    _this2.state.expenses = props.expenses;
    _this2.state.totals = props.totals;
    _this2.state.view = props.view;
    _this2.state.userNamesInGroup = props.userNamesInGroup; // console.log("is the constructor called each time tho?");

    document.addEventListener('new-expense', function (e) {
      console.log("THE DATA ARE!!!", e.detail);
      _ajax_expensesAjax__WEBPACK_IMPORTED_MODULE_0__["expensesAjax"].getExpenseTotalsDataAjax().then(function (totalDebtsForEachUser) {
        var newExpense = _ajax_expensesAjax__WEBPACK_IMPORTED_MODULE_0__["expensesAjax"].processData(e.detail, _this2.state.userNamesInGroup);
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
        return React.createElement("tr", null, React.createElement("td", null, expense[0].creditorFullName), React.createElement("td", null, expense[0].when), React.createElement("td", null, expense[0].description), React.createElement("td", null, expense[0].credit, " $"), React.createElement("td", null, React.createElement("a", {
          href: "#",
          "data-toggle": "tooltip",
          "data-placement": "right",
          sanitize: "false",
          "data-html": "true",
          title: tranactionsData
        }, React.createElement("img", {
          src: "/public/info.png",
          alt: "Info IMG",
          height: "42",
          width: "42"
        }))));
      });
      return React.createElement(React.Fragment, null, " ", React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        scope: "col"
      }, "Creditor"), React.createElement("th", {
        scope: "col"
      }, "When"), React.createElement("th", {
        scope: "col"
      }, "Description"), React.createElement("th", {
        scope: "col"
      }, "Credit"), React.createElement("th", {
        scope: "col"
      }, "Info")), _toConsumableArray(data)), React.createElement("tbody", null), " ");
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

        var row = React.createElement(React.Fragment, null, " ", React.createElement("tr", null, React.createElement("td", null, totals[key].fullname), React.createElement("td", {
          style: {
            color: color
          }
        }, debtsSumInfo), React.createElement("td", null, React.createElement("a", {
          href: "#",
          "data-toggle": "tooltip",
          "data-placement": "right",
          sanitize: "false",
          "data-html": "true",
          title: debtsInfo
        }, React.createElement("img", {
          src: "/public/info.png",
          alt: "Info IMG",
          height: "42",
          width: "42"
        })))));
        data.push(row);
      });
      return React.createElement(React.Fragment, null, " ", React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        scope: "col"
      }, "Member"), React.createElement("th", {
        scope: "col"
      }, "Sum"), React.createElement("th", {
        scope: "col"
      }, "Info"))), React.createElement("tbody", null, [].concat(data)), "  ");
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

/***/ 19:
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
};
/**
 * @typedef userNameTuple
 * @type {array}
 * @property {string} 0 - firstName
 * @property {string} 1 - lastName
 * @property {number} 2 - userId
 */

/**
 * @typedef userNames
 * @type {array<userNameTuple>}
 */

/**
 * @return {Promise<userNames>}
 */


var getGroupInfoAjax = function getGroupInfoAjax() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get-current-user',
      type: "GET",
      success: function success(user) {
        $.ajax({
          url: '/api/get-users-in-group',
          type: "POST",
          data: user,
          dataType: "json",
          success: function success(userNames) {
            resolve(userNames);
          },
          error: function error(err) {
            console.log(err);
            reject(err);
          }
        });
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
      $("#alert-success").show(function () {
        new Promise(function (resolve, reject) {
          setTimeout(function () {
            $('#alert-success').hide(800);
            resolve({
              msg: 'ok'
            });
          }, 5000);
        });
      });
      document.getElementById('expense-form').reset();
      clientSocket.emit('new-expense', newExpense);
    },
    error: function error(_error3) {
      console.log(_error3);
    }
  });
}; // Creates the expense table by using the ExpensesTable Component


var processData = function processData(data, userNames) {
  // console.log("in processData__________________", data, userNames)
  var userNamesMap = new Map();
  userNames.forEach(function (user) {
    userNamesMap.set(parseInt(user[2], 10), "".concat(user[0], " ").concat(user[1]));
  });

  if (Array.isArray(data)) {
    data.forEach(function (expense) {
      if (Array.isArray(expense)) {
        expense.forEach(function (transaction) {
          transaction.creditorFullName = userNamesMap.get(parseInt(transaction.creditor, 10));
          transaction.debtorFullName = userNamesMap.get(parseInt(transaction.debtor, 10));
        });
      } else {
        expense.creditorFullName = userNamesMap.get(parseInt(expense.creditor, 10));
        expense.debtorFullName = userNamesMap.get(parseInt(expense.debtor, 10));
      }
    });
  } else {
    data.creditorFullName = userNamesMap.get(parseInt(data.creditor, 10));
    data.debtorFullName = userNamesMap.get(parseInt(data.debtor, 10));
  }

  return data;
};

var expensesAjax = {};
expensesAjax.storeNewExpense = storeNewExpense;
expensesAjax.getExpenseTotalsDataAjax = getExpenseTotalsDataAjax;
expensesAjax.getGroupInfoAjax = getGroupInfoAjax;
expensesAjax.getExpenseDataAjax = getExpenseDataAjax;
expensesAjax.processData = processData;


/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExpensesForm; });
/* harmony import */ var _ajax_expensesAjax_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // import { clientSocket } from "../../js/socketClient";
// React Component to create the debtors row in the create expense form 
// depends on User_drop_down_list and User_drop_down_item

var Debtor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Debtor, _React$Component);

  function Debtor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Debtor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Debtor)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        var userNamesInGroup = this.props.usersInGroup;

        for (var _i = 0, _Object$keys = Object.keys(userNamesInGroup); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];

          if (key == this.props.debtorSelected) {
            debtorName = userNamesInGroup[key].firstName;
            isDebtorSelected = true;
          }
        }
      }

      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "md-form mb-4"
      }, React.createElement("div", {
        className: "input-group form-group"
      }, React.createElement("div", {
        className: "input-group-prepend"
      }, React.createElement("div", {
        className: "input-group-prepend"
      }, React.createElement("button", {
        className: "btn btn-dark dropdown-toggle btn-block",
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, "Debtor"), React.createElement("div", {
        className: "dropdown-menu"
      }, React.createElement(User_drop_down_list, {
        users: this.props.usersInGroup,
        selectDebtor: this.selectDebtor,
        selectMethod: "Debtor"
      })))), React.createElement("input", {
        readOnly: true,
        name: "debtor",
        type: "text",
        className: "form-control",
        placeholder: "Bitch",
        value: this.props.isDebtorSelected === undefined ? debtorName : "Bitch"
      }), React.createElement("input", {
        type: "number",
        className: "form-control",
        name: "debt",
        onChange: this.onChange,
        readOnly: this.props.evenly,
        value: this.props.evenly == true ? this.props.debt.toFixed(2) : console.log('hey'),
        placeholder: "Debt"
      }), React.createElement("input", {
        type: "hidden",
        name: "debtorId",
        value: this.props.debtorSelected === undefined ? null : this.props.debtorSelected
      }), React.createElement("div", null, React.createElement("a", {
        href: "#"
      }, "  ", React.createElement("i", {
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

var ExpensesForm =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ExpensesForm, _React$Component2);

  function ExpensesForm(props) {
    var _this2;

    _classCallCheck(this, ExpensesForm);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ExpensesForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "counter", 0);

    _defineProperty(_assertThisInitialized(_this2), "state", {});

    _defineProperty(_assertThisInitialized(_this2), "submitForm", function (e) {
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

    _defineProperty(_assertThisInitialized(_this2), "selectCreditor", function (dropDownId) {
      var creditorName, creditorId;
      var userNamesInGroup = _this2.props.usersInGroup;

      for (var _i2 = 0, _Object$keys2 = Object.keys(userNamesInGroup); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];

        if (key == dropDownId) {
          creditorName = userNamesInGroup[key].firstName;
          creditorId = key;
        }
      }

      _this2.setState({
        creditor: {
          creditorName: creditorName,
          creditorId: creditorId
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "selectDebtor", function (dropDownId, debtorId) {
      var debtors = _this2.state.debtors.map(function (elem, index) {
        if (elem.id == debtorId) {
          return _objectSpread({}, elem, {
            debtorSelected: dropDownId
          });
        } else {
          return elem;
        }
      });

      _this2.setState({
        debtors: debtors
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "updateCreditField", function () {
      if (_this2.state.evenly) _this2.updateDebtorFields();
    });

    _defineProperty(_assertThisInitialized(_this2), "updateDebtorFields", function () {
      if (!_this2.state.evenly) {
        _this2.setState({
          debtors: _this2.state.debtors,
          evenly: _this2.state.evenly,
          credit: _this2.state.credit
        });

        return;
      }

      var credit = document.getElementById('credit').value;

      _this2.setState({
        debtors: _this2.state.debtors,
        evenly: _this2.state.evenly,
        credit: parseFloat(credit)
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "addDropdown", function (e) {
      counter++;

      _this2.setState({
        debtors: [].concat(_toConsumableArray(_this2.state.debtors), [{
          usersInGroup: _this2.props.usersInGroup,
          id: counter
        }]),
        evenly: _this2.state.evenly,
        credit: _this2.state.credit
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "changeSplitMethod", function (e) {
      if (e.target.innerText == "Evenly") {
        _this2.state.evenly = true;
      } else _this2.state.evenly = false;

      _this2.updateDebtorFields();
    });

    _defineProperty(_assertThisInitialized(_this2), "removeDeptor", function (id) {
      _this2.setState({
        credit: _this2.state.credit,
        evenly: _this2.state.evenly,
        debtors: _this2.state.debtors.filter(function (debtor) {
          if (debtor.id != id) return debtor;
        })
      });
    });

    _this2.state.debtors = [{
      usersInGroup: props.usersInGroup,
      id: 0
    }];
    _this2.state.evenly = true;
    _this2.state.credit = 0;
    return _this2;
  }

  _createClass(ExpensesForm, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return (// <!-- Modal -->
        React.createElement("div", {
          className: "modal fade",
          id: "darkModalForm",
          tabIndex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }, React.createElement("div", {
          className: "modal-dialog form-dark",
          role: "document"
        }, React.createElement("div", {
          className: "modal-content card card-image",
          style: {
            backgroundColor: 'burlywood'
          }
        }, React.createElement("div", {
          className: "text-white rgba-stylish-strong py-5 px-5 z-depth-4"
        }, React.createElement("div", {
          className: "modal-header text-center pb-4"
        }, React.createElement("h3", {
          className: "modal-title w-100 white-text font-weight-bold",
          id: "myModalLabel"
        }, React.createElement("strong", null, "Create Expense")), React.createElement("button", {
          type: "button",
          className: "close white-text",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }, React.createElement("span", {
          "aria-hidden": "true"
        }, "\xD7"))), React.createElement("div", {
          className: "modal-body"
        }, React.createElement("form", {
          id: "expense-form",
          method: "POST",
          onSubmit: this.submitForm
        }, React.createElement("div", {
          className: "md-form mb-4"
        }, React.createElement("div", {
          className: "input-group form-group"
        }, React.createElement("div", {
          className: "input-group-prepend"
        }, React.createElement("button", {
          className: "btn btn-dark dropdown-toggle btn-block",
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }, "Creditor"), React.createElement("div", {
          className: "dropdown-menu"
        }, React.createElement(User_drop_down_list, {
          users: this.props.usersInGroup,
          selectCreditor: this.selectCreditor,
          selectMethod: "Creditor"
        }))), React.createElement("input", {
          readOnly: true,
          name: "creditor",
          id: "creditor-field",
          type: "text",
          className: "form-control",
          "aria-label": "Text input with dropdown button",
          value: this.state.creditor !== undefined ? this.state.creditor.creditorName : console.log('no creditor selected'),
          placeholder: "Creditor"
        }), React.createElement("input", {
          type: "hidden",
          id: "creditor-id",
          name: "creditorId",
          value: this.state.creditor === undefined ? "Creditor" : this.state.creditor.creditorId
        }))), React.createElement("div", {
          className: "md-form mb-4"
        }, React.createElement("div", {
          className: "input-group form-group"
        }, React.createElement("div", {
          className: "input-group-prepend"
        }, React.createElement("button", {
          className: "btn btn-dark btn-block",
          type: "button"
        }, "Credit")), React.createElement("input", {
          id: "credit",
          autoComplete: "off",
          name: "credit",
          onChange: this.updateCreditField,
          type: "number",
          step: "0.01",
          className: "form-control",
          placeholder: "$$$"
        }))), React.createElement("div", {
          className: "md-form mb-4"
        }, React.createElement("div", {
          className: "input-group form-group"
        }, React.createElement("div", {
          className: "input-group-prepend"
        }, React.createElement("button", {
          className: "btn btn-dark dropdown-toggle btn-block",
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }, "Method"), React.createElement("div", {
          id: "method-payment-dropdown",
          className: "dropdown-menu"
        }, React.createElement("a", {
          id: "split-evenly",
          onClick: this.changeSplitMethod,
          className: "dropdown-item"
        }, "Evenly"), React.createElement("a", {
          id: "split-manual",
          onClick: this.changeSplitMethod,
          className: "dropdown-item"
        }, "Manual"))), React.createElement("input", {
          readOnly: true,
          value: this.state.evenly == true ? "Evenly" : "Manual",
          id: "method-payment-field",
          type: "text",
          className: "form-control",
          "aria-label": "Text input with dropdown button"
        }), React.createElement("div", {
          id: "link-div"
        }, React.createElement("a", {
          id: "add-debtor-link",
          href: "#"
        }, " ", React.createElement("i", {
          className: "fa fa-user-plus ml-2 mt-2 ",
          onClick: this.addDropdown,
          style: {
            color: 'black'
          }
        }), " ")))), React.createElement("div", {
          id: "debtors-group"
        }, this.state.debtors.map(function (elem, index) {
          return React.createElement(Debtor, {
            selectDebtor: _this3.selectDebtor,
            evenly: _this3.state.evenly,
            usersInGroup: elem.usersInGroup,
            debtorSelected: elem.debtorSelected,
            id: elem.id,
            key: elem.id,
            debt: _this3.state.credit / _this3.state.debtors.length,
            removeDeptor: _this3.removeDeptor
          }, " ");
        })), React.createElement("div", {
          className: "mb-4"
        }, React.createElement("div", {
          className: "input-group form-group"
        }, React.createElement("div", {
          className: "input-group-prepend"
        }, React.createElement("button", {
          className: "btn btn-dark btn-block",
          type: "button"
        }, "Date")), React.createElement("input", {
          name: "date",
          type: "date",
          className: "form-control",
          onFocus: "(this.type='date')",
          placeholder: "When"
        }))), React.createElement("div", {
          className: "mb-5"
        }, React.createElement("div", {
          className: "input-group form-group"
        }, React.createElement("div", {
          className: "input-group-prepend"
        }, React.createElement("button", {
          className: "btn btn-dark btn-block",
          type: "button"
        }, "Info")), React.createElement("input", {
          name: "desc",
          type: "text",
          className: "form-control",
          autoComplete: "off",
          placeholder: "Description"
        }))), React.createElement("div", {
          className: "row d-flex align-items-center mb-4"
        }, React.createElement("div", {
          className: "text-center mb-3 col-md-12"
        }, React.createElement("button", {
          type: "submit",
          className: "btn btn-success btn-block btn-rounded z-depth-1"
        }, "Confirm")))))), React.createElement("div", {
          id: "alert-warning",
          style: {
            display: 'none'
          },
          className: "modal-footer"
        }, React.createElement("div", {
          className: "alert alert-warning col-12",
          role: "alert",
          style: {
            paddingBottom: 0
          }
        }, React.createElement("p", {
          className: "text-center "
        }, React.createElement("strong", null, "Warning!"), " you dont need any more debtors, trust me! ;)"))), React.createElement("div", {
          id: "alert-success",
          style: {
            display: 'none'
          },
          className: "modal-footer"
        }, React.createElement("div", {
          className: "alert alert-success col-12",
          role: "alert",
          style: {
            paddingBottom: 0
          }
        }, React.createElement("p", {
          className: "text-center "
        }, React.createElement("strong", null, "Success"), " Expense created! Hooray!"))))))
      ); // {/* <!-- Modal -->) */}
    }
  }]);

  return ExpensesForm;
}(React.Component);



var User_drop_down_item =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(User_drop_down_item, _React$Component3);

  function User_drop_down_item() {
    var _getPrototypeOf3;

    var _this4;

    _classCallCheck(this, User_drop_down_item);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(User_drop_down_item)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this4), "selectDebtor", function () {
      _this4.props.selectDebtor(_this4.props.itemId);
    });

    _defineProperty(_assertThisInitialized(_this4), "selectCreditor", function () {
      _this4.props.selectCreditor(_this4.props.itemId);
    });

    return _this4;
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


      return React.createElement("a", {
        className: "dropdown-item",
        onClick: onClickFunc,
        href: "#"
      }, this.props.userFirstName);
    }
  }]);

  return User_drop_down_item;
}(React.Component);

var User_drop_down_list =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(User_drop_down_list, _React$Component4);

  function User_drop_down_list() {
    var _getPrototypeOf4;

    var _this5;

    _classCallCheck(this, User_drop_down_list);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(User_drop_down_list)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this5), "selectDebtor", function (dropDownId) {
      _this5.props.selectDebtor(dropDownId);
    });

    _defineProperty(_assertThisInitialized(_this5), "selectCreditor", function (dropDownId) {
      _this5.props.selectCreditor(dropDownId);
    });

    return _this5;
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

      var userNamesInGroup = this.props.users;
      var dropDownList = [];

      for (var _i3 = 0, _Object$keys3 = Object.keys(userNamesInGroup); _i3 < _Object$keys3.length; _i3++) {
        var key = _Object$keys3[_i3];
        // mapping={index} 
        var dropDownItem = React.createElement(User_drop_down_item, {
          selectDebtor: select == "selectDebtor" ? onClickFunc : null,
          selectCreditor: select == "selectCreditor" ? onClickFunc : null,
          userFirstName: userNamesInGroup[key].firstName,
          key: key,
          itemId: key,
          inputFieldId: this.props.inputFieldId,
          hiddenId: this.props.hiddenId
        });
        dropDownList.push(dropDownItem);
      }

      return React.createElement(React.Fragment, null, " ", dropDownList, " ");
    }
  }]);

  return User_drop_down_list;
}(React.Component);

/***/ })

/******/ });