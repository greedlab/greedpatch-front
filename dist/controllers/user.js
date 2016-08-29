'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerRequest = exports.register = exports.logout = exports.loginRequest = exports.login = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var login = exports.login = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        loginWithMessage(ctx, next, null);

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function login(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var loginRequest = exports.loginRequest = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var username, password, options, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debug(ctx.request.body);
                        username = ctx.request.body.username;

                        if (!(!username || username.length == 0)) {
                            _context2.next = 5;
                            break;
                        }

                        loginWithMessage(ctx, next, 'username is empty');
                        return _context2.abrupt('return');

                    case 5:
                        password = ctx.request.body.password;

                        if (!(!password || password.length == 0)) {
                            _context2.next = 9;
                            break;
                        }

                        loginWithMessage(ctx, next, 'password is empty');
                        return _context2.abrupt('return');

                    case 9:
                        options = {
                            url: _url2.default.resolve(_config2.default.apiDomain, '/user/login'),
                            json: true,
                            body: {
                                username: username,
                                password: password
                            }
                        };
                        _context2.next = 12;
                        return request.postAsync(options);

                    case 12:
                        response = _context2.sent;

                        debug(response.statusCode);
                        debug(response.body);
                        if (response.statusCode == 200) {
                            token.saveToken(ctx, response.body.token);
                            ctx.redirect('/');
                        } else {
                            loginWithMessage(ctx, next, response.body || 'unvalid username or password');
                        }

                    case 16:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function loginRequest(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var logout = exports.logout = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var theToken, bearerToken, options, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        theToken = token.getToken(ctx);

                        if (!(theToken && theToken.length > 0)) {
                            _context3.next = 9;
                            break;
                        }

                        bearerToken = token.bearerToken(theToken);
                        options = {
                            url: _url2.default.resolve(_config2.default.apiDomain, '/user/logout'),
                            headers: {
                                Authorization: bearerToken
                            }
                        };
                        _context3.next = 6;
                        return request.postAsync(options);

                    case 6:
                        response = _context3.sent;

                        debug(response.statusCode);
                        debug(response.body);

                    case 9:
                        ctx.redirect('/');
                        token.clearToken(ctx);

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function logout(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var register = exports.register = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        registerWithMessage(ctx, next, null);

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function register(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var registerRequest = exports.registerRequest = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var username, password, confirmPassword, options, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        debug(ctx.request.body);
                        username = ctx.request.body.username;

                        if (string.validUsername(username)) {
                            _context5.next = 5;
                            break;
                        }

                        registerWithMessage(ctx, next, 'unvalid username');
                        return _context5.abrupt('return');

                    case 5:
                        password = ctx.request.body.password;

                        if (string.validPassword(password)) {
                            _context5.next = 9;
                            break;
                        }

                        registerWithMessage(ctx, next, 'unvalid password');
                        return _context5.abrupt('return');

                    case 9:
                        confirmPassword = ctx.request.body.confirmPassword;

                        if (!(password != confirmPassword)) {
                            _context5.next = 13;
                            break;
                        }

                        registerWithMessage(ctx, next, 'unvalid password');
                        return _context5.abrupt('return');

                    case 13:
                        options = {
                            url: _url2.default.resolve(_config2.default.apiDomain, '/user/register'),
                            json: true,
                            body: {
                                username: username,
                                password: password
                            }
                        };
                        _context5.next = 16;
                        return request.postAsync(options);

                    case 16:
                        response = _context5.sent;

                        debug(response.statusCode);
                        debug(response.body);
                        if (response.statusCode == 200) {
                            token.saveToken(ctx, response.body.token);
                            ctx.redirect('/');
                        } else {
                            registerWithMessage(ctx, next, response.body || 'register failed');
                        }

                    case 20:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function registerRequest(_x9, _x10) {
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

var token = _interopRequireWildcard(_token);

var _string = require('../utils/string');

var string = _interopRequireWildcard(_string);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/16.
 */

var debug = new _debug2.default(_package2.default.name);

var request = _bluebird2.default.promisifyAll(_request2.default);

function loginWithMessage(ctx, next, message) {
    var data = {
        title: 'Login',
        error: message
    };
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/user/login'), data);
    ctx.body = html;
}

function registerWithMessage(ctx, next, message) {
    var data = {
        title: 'Register',
        error: message
    };
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/user/register'), data);
    ctx.body = html;
}
//# sourceMappingURL=user.js.map
