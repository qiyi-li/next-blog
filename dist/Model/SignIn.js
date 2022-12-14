"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _dataSource = require("../data-source");
var _md = _interopRequireDefault(require("md5"));
var SignIn = /*#__PURE__*/function () {
  function SignIn() {
    (0, _classCallCheck2["default"])(this, SignIn);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: []
    });
    (0, _defineProperty2["default"])(this, "user", void 0);
  }
  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this$username;
        var userRepository, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (((_this$username = this.username) === null || _this$username === void 0 ? void 0 : _this$username.trim()) === "") {
                  this.errors.username.push("请填写用户名");
                }
                if (_dataSource.AppDataSource.isInitialized) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return _dataSource.AppDataSource.initialize();
              case 4:
                userRepository = _dataSource.AppDataSource.getRepository("User");
                _context.next = 7;
                return userRepository.findOne({
                  where: {
                    username: this.username
                  }
                });
              case 7:
                user = _context.sent;
                this.user = user;
                if (!this.password) {
                  this.errors.password.push("请填写密码");
                } else if (!user) {
                  this.errors.username.push("用户名不存在");
                } else if (user.passwordDigest !== (0, _md["default"])(this.password)) {
                  this.errors.password.push("密码错误");
                }
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function validate() {
        return _validate.apply(this, arguments);
      }
      return validate;
    }()
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      return !!Object.values(this.errors).find(function (v) {
        return v.length > 0;
      });
    }
  }]);
  return SignIn;
}();
exports.SignIn = SignIn;