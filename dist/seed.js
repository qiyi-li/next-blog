"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataSource = require("./data-source");
var _Post = require("./entity/Post");
_dataSource.AppDataSource.initialize().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var posts, i, p;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);
          case 2:
            posts = _context.sent;
            console.log({
              posts: posts
            });
            if (!(posts.length === 0)) {
              _context.next = 13;
              break;
            }
            i = 0;
          case 6:
            if (!(i < 10)) {
              _context.next = 13;
              break;
            }
            p = new _Post.Post({
              title: "Post1" + i,
              content: "\u7B2C1".concat(i, "\u7BC7\u6587\u7AE0")
            });
            _context.next = 10;
            return connection.manager.save(p);
          case 10:
            i++;
            _context.next = 6;
            break;
          case 13:
            _context.t0 = console;
            _context.next = 16;
            return connection.manager.find(_Post.Post);
          case 16:
            _context.t1 = _context.sent;
            _context.t0.log.call(_context.t0, _context.t1);
            _context.next = 20;
            return connection.destroy();
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});