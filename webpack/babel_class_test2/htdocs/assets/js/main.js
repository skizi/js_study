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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperSub = __webpack_require__(1);

var _SuperSub2 = _interopRequireDefault(_SuperSub);

var _UtilTest = __webpack_require__(3);

var _UtilTest2 = _interopRequireDefault(_UtilTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(window).load(function () {

  var main = new Main();
  main.nowIndex = 10;
  console.log("get : " + main.nowIndex);
});

var Main = function () {
  function Main() {
    _classCallCheck(this, Main);

    this.index = 4;

    //インスタンス化    
    for (var i = 0; i < 100; i++) {
      var superSub = new _SuperSub2.default(100);
      $(document.body).append(superSub.ele);
    }

    superSub.subAlert();

    //モジュール テスト
    console.log('rad:' + _UtilTest2.default.deg2rad(40));
    console.log('deg:' + _UtilTest2.default.rad2deg(3.14));

    //各種イベント テスト
    window.onresize = this.resize;
    window.onkeydown = this.keyDown;

    var input = document.body.getElementsByTagName('input');
    input[0].onfocus = function () {
      console.log('focus');
    };

    input[0].onblur = function () {
      console.log('blur');
    };

    //setInterval( function(){ console.log( 'interval' ); }, 1000 );
  }

  _createClass(Main, [{
    key: 'alertNum',
    value: function alertNum() {

      alert(this.index);
    }
  }, {
    key: 'resize',
    value: function resize() {

      console.log('window resize');
    }
  }, {
    key: 'keyDown',
    value: function keyDown(e) {

      console.log(e.key);
    }
  }, {
    key: 'nowIndex',
    get: function get() {

      return this.index;
    },
    set: function set(_num) {

      this.index = _num;
    }
  }]);

  return Main;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sub2 = __webpack_require__(2);

var _Sub3 = _interopRequireDefault(_Sub2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SuperSub = function (_Sub) {
  _inherits(SuperSub, _Sub);

  function SuperSub(num) {
    _classCallCheck(this, SuperSub);

    return _possibleConstructorReturn(this, (SuperSub.__proto__ || Object.getPrototypeOf(SuperSub)).call(this, num));
  }

  _createClass(SuperSub, [{
    key: 'subAlert',
    value: function subAlert() {

      alert(this.num + 2);
    }
  }]);

  return SuperSub;
}(_Sub3.default);

exports.default = SuperSub;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sub = function () {
  function Sub(num) {
    _classCallCheck(this, Sub);

    this.num = num;

    this.ele = $('<div>Element<div>');
    this.ele.css({
      margin: '10px 0 0 10px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    this.ele.on('mouseover', this.mouseOverHandler.bind(this));
    this.ele.on('mouseout', this.mouseOutHandler.bind(this));
  }

  _createClass(Sub, [{
    key: 'mouseOverHandler',
    value: function mouseOverHandler() {

      this.ele.css({
        backgroundColor: '#ddd'
      });
    }
  }, {
    key: 'mouseOutHandler',
    value: function mouseOutHandler() {

      this.ele.css({
        backgroundColor: '#fff'
      });
    }
  }], [{
    key: 'subAlert',
    value: function subAlert() {

      alert(this.num);
    }
  }]);

  return Sub;
}();

exports.default = Sub;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilTest = function () {
	function UtilTest() {
		_classCallCheck(this, UtilTest);
	}

	_createClass(UtilTest, null, [{
		key: "deg2rad",
		value: function deg2rad(deg) {

			return deg * Math.PI / 180;
		}
	}, {
		key: "rad2deg",
		value: function rad2deg(deg) {

			return deg * 180 / Math.PI;
		}
	}]);

	return UtilTest;
}();

exports.default = UtilTest;

/***/ })
/******/ ]);