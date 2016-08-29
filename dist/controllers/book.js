'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addRequest = exports.add = exports.detail = exports.list = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var list = exports.list = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var token, logined, requestUrl, response, data, html;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = (0, _token.getToken)(ctx);

                        debug('token: ', token);
                        logined = token && token.length > 0;
                        requestUrl = _url2.default.resolve(_config2.default.apiDomain, '/book/list');

                        debug(requestUrl);
                        _context.next = 7;
                        return request.getAsync(requestUrl);

                    case 7:
                        response = _context.sent;

                        debug(response.body);

                        data = JSON.parse(response.body);

                        data.title = 'Books';
                        data.logined = logined;

                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/book/list'), data);

                        ctx.body = html;

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function list(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var detail = exports.detail = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var options, response, data, html;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.querystring);
                        options = {
                            url: _url2.default.resolve(_config2.default.apiDomain, '/book/detail?' + ctx.querystring)
                        };
                        _context2.next = 4;
                        return request.getAsync(options);

                    case 4:
                        response = _context2.sent;

                        debug(response.body);
                        data = JSON.parse(response.body);

                        data.title = 'Book Detail';
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/book/detail'), data);

                        ctx.body = html;

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function detail(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var add = exports.add = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        addWithMessage(ctx, next, null);

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function add(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var addRequest = exports.addRequest = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var token, name, price, theBearerToken, options, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        debug(ctx.request.body);
                        token = (0, _token.getToken)(ctx);
                        name = ctx.request.body.name;

                        if (!(!name || name.length == 0)) {
                            _context4.next = 6;
                            break;
                        }

                        addWithMessage(ctx, next, 'name is empty');
                        return _context4.abrupt('return');

                    case 6:
                        price = ctx.request.body.price;
                        theBearerToken = (0, _token.bearerToken)(token);
                        options = {
                            url: _url2.default.resolve(_config2.default.apiDomain, '/book/add/'),
                            json: true,
                            headers: {
                                contentType: 'application/json',
                                Authorization: theBearerToken
                            },
                            body: {
                                name: name,
                                price: price
                            }
                        };
                        _context4.next = 11;
                        return request.postAsync(options);

                    case 11:
                        response = _context4.sent;

                        if (response.statusCode == 200) {
                            ctx.redirect('/book/list');
                        } else {
                            addWithMessage(ctx, next, response.message || "Add book failed");
                        }

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function addRequest(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var addWithMessage = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next, message) {
        var data, html;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = {
                            title: 'Add Book',
                            error: message
                        };
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/book/add'), data);

                        ctx.body = html;

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function addWithMessage(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

var _artTemplate = require('art-template');

var _artTemplate2 = _interopRequireDefault(_artTemplate);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _token = require('../utils/token');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/8/16.
                                                          */

var request = _bluebird2.default.promisifyAll(_request2.default);
//# sourceMappingURL=book.js.map
