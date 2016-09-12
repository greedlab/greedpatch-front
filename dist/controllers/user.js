'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logoutRequest = exports.setPasswordRequest = exports.setPassword = exports.resetPasswordRequest = exports.resetPassword = exports.registerRequest = exports.register = exports.loginRequest = exports.login = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var login = exports.login = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = {
                            email_autofocus: 'autofocus'
                        };

                        loginWithData(ctx, data);

                    case 2:
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
        var data, options, response, statusCode, body, error;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = ctx.request.body;
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/login'),
                            json: true,
                            body: data
                        };
                        response = null;
                        _context2.prev = 3;
                        _context2.next = 6;
                        return request.postAsync(options);

                    case 6:
                        response = _context2.sent;
                        _context2.next = 14;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](3);

                        data.error = 'Login failed';
                        loginWithData(ctx, data);
                        return _context2.abrupt('return');

                    case 14:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200) {
                            cookie.setToken(ctx, body.token);
                            cookie.setUserRole(ctx, body.user.role);
                            cookie.setUserEmail(ctx, body.user.email);
                            ctx.redirect('/');
                        } else {
                            if (statusCode == 401) {
                                data.error = body.message;
                            } else if (statusCode == 422) {
                                if (body && body.errors && body.errors.length > 0) {
                                    error = body.errors[0];

                                    if (error.field == 'email') {
                                        data.email_autofocus = 'autofocus';
                                        data.email_error = body.message;
                                    } else if (error.field == 'password') {
                                        data.password_autofocus = 'autofocus';
                                        data.password_error = body.message;
                                    } else {
                                        data.error = body.message;
                                    }
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = 'Login failed';
                            }
                            loginWithData(ctx, data);
                        }

                    case 17:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[3, 9]]);
    }));

    return function loginRequest(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var register = exports.register = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = {
                            email_autofocus: 'autofocus'
                        };

                        registerWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function register(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var registerRequest = exports.registerRequest = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var data, options, response, body, error;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = ctx.request.body;

                        if (!(data.password && data.password != data.confirm_password)) {
                            _context4.next = 6;
                            break;
                        }

                        data.confirm_password_error = 'Please input same password';
                        data.confirm_password_autofocus = 'autofocus';
                        registerWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 6:
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/register'),
                            json: true,
                            body: data
                        };
                        response = null;
                        _context4.prev = 8;
                        _context4.next = 11;
                        return request.postAsync(options);

                    case 11:
                        response = _context4.sent;
                        _context4.next = 19;
                        break;

                    case 14:
                        _context4.prev = 14;
                        _context4.t0 = _context4['catch'](8);

                        data.error = 'Register failed';
                        registerWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 19:
                        body = response.body;

                        if (response.statusCode == 200) {
                            cookie.setToken(ctx, response.body.token);
                            cookie.setUserRole(ctx, body.user.role);
                            cookie.setUserEmail(ctx, body.user.email);
                            ctx.redirect('/');
                        } else {
                            if (response.statusCode == 422) {
                                if (body && body.errors && body.errors.length > 0) {
                                    error = body.errors[0];

                                    if (error.field == 'email') {
                                        data.email_autofocus = 'autofocus';
                                        data.email_error = body.message;
                                    } else if (error.field == 'password') {
                                        data.password_autofocus = 'autofocus';
                                        data.password_error = body.message;
                                    } else {
                                        data.error = body.message;
                                    }
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = 'Register failed';
                            }
                            registerWithData(ctx, data);
                        }

                    case 21:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[8, 14]]);
    }));

    return function registerRequest(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var resetPassword = exports.resetPassword = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = {
                            email_autofocus: 'autofocus'
                        };

                        resetPasswordWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function resetPassword(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var resetPasswordRequest = exports.resetPasswordRequest = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var data, options, response, body, error;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        data = ctx.request.body;
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/reset-password'),
                            json: true,
                            body: data
                        };
                        response = null;
                        _context6.prev = 3;
                        _context6.next = 6;
                        return request.postAsync(options);

                    case 6:
                        response = _context6.sent;
                        _context6.next = 14;
                        break;

                    case 9:
                        _context6.prev = 9;
                        _context6.t0 = _context6['catch'](3);

                        data.error = 'Reset password failed';
                        resetPasswordWithData(ctx, data);
                        return _context6.abrupt('return');

                    case 14:
                        body = response.body;

                        if (response.statusCode == 200) {
                            data.success = body.message;
                            resetPasswordWithData(ctx, data);
                        } else {
                            if (response.statusCode == 422) {
                                if (body && body.errors && body.errors.length > 0) {
                                    error = body.errors[0];

                                    if (error.field == 'email') {
                                        data.email_autofocus = 'autofocus';
                                        data.email_error = body.message;
                                    } else {
                                        data.error = body.message;
                                    }
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = 'Reset password failed';
                            }
                            registerWithData(ctx, data);
                        }

                    case 16:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[3, 9]]);
    }));

    return function resetPasswordRequest(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var setPassword = exports.setPassword = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        data = {
                            token: ctx.params.token,
                            password_autofocus: 'autofocus'
                        };

                        setPasswordWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function setPassword(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

var setPasswordRequest = exports.setPasswordRequest = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var data, options, response, body, error;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        data = ctx.request.body;

                        if (!(data.password && data.password != data.confirm_password)) {
                            _context8.next = 6;
                            break;
                        }

                        data.confirm_password_error = 'Please input same password';
                        data.confirm_password_autofocus = 'autofocus';
                        setPasswordWithData(ctx, data);
                        return _context8.abrupt('return');

                    case 6:

                        data.token = ctx.params.token;
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/set-password/'),
                            json: true,
                            body: data
                        };
                        response = null;
                        _context8.prev = 9;
                        _context8.next = 12;
                        return request.postAsync(options);

                    case 12:
                        response = _context8.sent;
                        _context8.next = 20;
                        break;

                    case 15:
                        _context8.prev = 15;
                        _context8.t0 = _context8['catch'](9);

                        data.error = 'Set password failed';
                        setPasswordWithData(ctx, data);
                        return _context8.abrupt('return');

                    case 20:
                        body = response.body;

                        if (response.statusCode == 200) {
                            ctx.redirect('/login');
                        } else {
                            if (response.statusCode == 422) {
                                if (body && body.errors && body.errors.length > 0) {
                                    error = body.errors[0];

                                    if (error.field == 'password') {
                                        data.password_autofocus = 'autofocus';
                                        data.password_error = body.message;
                                    } else if (error.field == 'confirm_password') {
                                        data.confirm_password_autofocus = 'autofocus';
                                        data.confirm_password_error = body.message;
                                    } else {
                                        data.error = body.message;
                                    }
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = 'Set password failed';
                            }
                            setPasswordWithData(ctx, data);
                        }

                    case 22:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[9, 15]]);
    }));

    return function setPasswordRequest(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

var logoutRequest = exports.logoutRequest = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, next) {
        var theToken, bearerToken, options, response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        theToken = cookie.getToken(ctx);

                        if (!(theToken && theToken.length > 0)) {
                            _context9.next = 8;
                            break;
                        }

                        bearerToken = token.bearerTokenFromToken(theToken);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/logout'),
                            headers: {
                                Authorization: bearerToken
                            }
                        };
                        _context9.next = 6;
                        return request.postAsync(options);

                    case 6:
                        response = _context9.sent;

                        cookie.clear(ctx);

                    case 8:
                        ctx.redirect('/');

                    case 9:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function logoutRequest(_x17, _x18) {
        return _ref9.apply(this, arguments);
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

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _token = require('../tools/token');

var token = _interopRequireWildcard(_token);

var _cookie = require('../tools/cookie');

var cookie = _interopRequireWildcard(_cookie);

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

function loginWithData(ctx, data) {
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/user/login'), data);
    ctx.body = html;
}

function registerWithData(ctx, data) {
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/user/register'), data);
    ctx.body = html;
}

function resetPasswordWithData(ctx, data) {
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/user/reset-password'), data);
    ctx.body = html;
}

function setPasswordWithData(ctx, data) {
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/user/set-password'), data);
    ctx.body = html;
}
//# sourceMappingURL=user.js.map
