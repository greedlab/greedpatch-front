'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tokenDetailRequest = exports.tokenDetail = exports.generateTokenRequest = exports.generateToken = exports.tokens = exports.modifyPassword = exports.account = exports.profile = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var profile = exports.profile = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var data, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = {};
                        bearerToken = token.bearerToken(ctx);

                        // user profile

                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/users/me/profile'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context.prev = 4;
                        _context.next = 7;
                        return request.getAsync(options);

                    case 7:
                        response = _context.sent;
                        _context.next = 15;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](4);

                        data.error = 'Get my profile failed';
                        settingProfileWithData(ctx, data);
                        return _context.abrupt('return');

                    case 15:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (!(statusCode === 200)) {
                            _context.next = 21;
                            break;
                        }

                        data.content = JSON.parse(body);
                        _context.next = 35;
                        break;

                    case 21:
                        if (!(statusCode === 401)) {
                            _context.next = 26;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context.abrupt('return');

                    case 26:
                        if (!(statusCode === 422)) {
                            _context.next = 32;
                            break;
                        }

                        data.error = body.message;
                        settingProfileWithData(ctx, data);
                        return _context.abrupt('return');

                    case 32:
                        data.error = 'Get my profile failed';
                        settingProfileWithData(ctx, data);
                        return _context.abrupt('return');

                    case 35:
                        settingProfileWithData(ctx, data);

                    case 36:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10]]);
    }));

    return function profile(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var account = exports.account = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = {
                            password_autofocus: 'autofocus'
                        };

                        settingAccountWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function account(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var modifyPassword = exports.modifyPassword = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var bearerToken, request_body, data, options, response, statusCode, body, error;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        bearerToken = token.bearerToken(ctx);
                        request_body = ctx.request.body;
                        data = request_body;

                        if (!(request_body.new_password !== request_body.confirm_password)) {
                            _context3.next = 8;
                            break;
                        }

                        data.confirm_password_error = 'Confirm new password failed';
                        data.confirm_password_autofocus = 'autofocus';
                        settingAccountWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 8:
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/users/me/modify-password'),
                            headers: {
                                Authorization: bearerToken,
                                contentType: _config2.default.content_type,
                                Accept: _config2.default.accept
                            },
                            json: true,
                            body: request_body
                        };
                        response = null;
                        _context3.prev = 10;
                        _context3.next = 13;
                        return request.postAsync(options);

                    case 13:
                        response = _context3.sent;
                        _context3.next = 21;
                        break;

                    case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3['catch'](10);

                        data.error = 'Modify password failed';
                        settingAccountWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 21:
                        statusCode = response.statusCode;
                        body = response.body;

                        debug(body);

                        if (!(statusCode === 200)) {
                            _context3.next = 31;
                            break;
                        }

                        cookie.setToken(ctx, body.token);
                        cookie.setUserRole(ctx, body.user.role);
                        cookie.setUserEmail(ctx, body.user.email);
                        ctx.redirect('/');
                        _context3.next = 45;
                        break;

                    case 31:
                        if (!(statusCode === 401)) {
                            _context3.next = 36;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context3.abrupt('return');

                    case 36:
                        if (!(statusCode === 422)) {
                            _context3.next = 42;
                            break;
                        }

                        if (body.errors && body.errors.length > 0) {
                            error = body.errors[0];

                            if (error.field == 'password') {
                                data.password_error = body.message;
                                data.password_autofocus = 'autofocus';
                            } else if (error.field == 'new_password') {
                                data.new_password_error = body.message;
                                data.new_password_autofocus = 'autofocus';
                            } else {
                                data.error = body.message;
                            }
                        } else {
                            data.error = body.message;
                        }
                        settingAccountWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 42:
                        data.error = 'Modify password failed';
                        settingAccountWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 45:
                        settingAccountWithData(ctx, data);

                    case 46:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[10, 16]]);
    }));

    return function modifyPassword(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var tokens = exports.tokens = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var bearerToken, data, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        bearerToken = token.bearerToken(ctx);
                        data = {};

                        // get tokens

                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/tokens'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context4.prev = 4;
                        _context4.next = 7;
                        return request.getAsync(options);

                    case 7:
                        response = _context4.sent;
                        _context4.next = 15;
                        break;

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4['catch'](4);

                        data.error = 'Get tokens failed';
                        renderTokensWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 15:
                        statusCode = response.statusCode;
                        body = response.body;

                        debug(body);

                        if (!(statusCode === 200)) {
                            _context4.next = 22;
                            break;
                        }

                        data.tokens = JSON.parse(body);
                        _context4.next = 36;
                        break;

                    case 22:
                        if (!(statusCode === 401)) {
                            _context4.next = 27;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context4.abrupt('return');

                    case 27:
                        if (!(statusCode === 422)) {
                            _context4.next = 33;
                            break;
                        }

                        data.error = body.message;
                        renderTokensWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 33:
                        data.error = 'Get tokens failed';
                        renderTokensWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 36:
                        renderTokensWithData(ctx, data);

                    case 37:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[4, 10]]);
    }));

    return function tokens(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var generateToken = exports.generateToken = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = {
                            password_autofocus: 'autofocus'
                        };

                        renderGenerateTokenWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function generateToken(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var generateTokenRequest = exports.generateTokenRequest = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var bearerToken, request_body, data, options, response, statusCode, body, error;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        bearerToken = token.bearerToken(ctx);
                        request_body = ctx.request.body;
                        data = request_body;

                        // generate token

                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/tokens'),
                            headers: {
                                Authorization: bearerToken,
                                contentType: _config2.default.content_type,
                                Accept: _config2.default.accept
                            },
                            json: true,
                            body: request_body
                        };
                        response = null;
                        _context6.prev = 5;
                        _context6.next = 8;
                        return request.postAsync(options);

                    case 8:
                        response = _context6.sent;
                        _context6.next = 16;
                        break;

                    case 11:
                        _context6.prev = 11;
                        _context6.t0 = _context6['catch'](5);

                        data.error = 'Generate new token failed';
                        renderGeneratedTokenWithData(ctx, data);
                        return _context6.abrupt('return');

                    case 16:
                        statusCode = response.statusCode;
                        body = response.body;

                        debug(body);
                        if (statusCode >= 200 && statusCode < 300) {
                            renderGeneratedTokenWithData(ctx, body);
                        } else if (statusCode === 401) {
                            ctx.redirect('/login');
                        } else if (statusCode === 422) {
                            if (body.errors && body.errors.length > 0) {
                                error = body.errors[0];

                                if (error.field == 'password') {
                                    data.password_error = body.message;
                                    data.password_autofocus = 'autofocus';
                                } else if (error.field == 'name') {
                                    data.name_error = body.message;
                                    data.name_autofocus = 'autofocus';
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = body.message;
                            }
                            renderGenerateTokenWithData(ctx, data);
                        } else {
                            data.error = 'Modify password failed';
                            renderGenerateTokenWithData(ctx, data);
                        }

                    case 20:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[5, 11]]);
    }));

    return function generateTokenRequest(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var tokenDetail = exports.tokenDetail = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        data = {
                            id: ctx.params.id,
                            password_autofocus: 'autofocus'
                        };

                        renderTokenDetailWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function tokenDetail(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

var tokenDetailRequest = exports.tokenDetailRequest = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        var bearerToken, request_body, token_id, data, options, response, statusCode, body, error;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        bearerToken = token.bearerToken(ctx);
                        request_body = ctx.request.body;

                        debug(request_body);
                        token_id = ctx.params.id;
                        data = request_body;

                        data.id = token_id;

                        // get token detail
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/tokens/' + token_id),
                            headers: {
                                Authorization: bearerToken,
                                contentType: _config2.default.content_type,
                                Accept: _config2.default.accept
                            },
                            json: true,
                            body: request_body
                        };
                        response = null;
                        _context8.prev = 8;
                        _context8.next = 11;
                        return request.postAsync(options);

                    case 11:
                        response = _context8.sent;
                        _context8.next = 19;
                        break;

                    case 14:
                        _context8.prev = 14;
                        _context8.t0 = _context8['catch'](8);

                        data.error = 'Get token detail failed';
                        renderTokenDetailWithData(ctx, data);
                        return _context8.abrupt('return');

                    case 19:
                        statusCode = response.statusCode;
                        body = response.body;

                        debug(body);
                        if (statusCode >= 200 && statusCode < 300) {
                            data.token = body;
                            renderTokenDetailWithData(ctx, data);
                        } else if (statusCode === 401) {
                            ctx.redirect('/login');
                        } else if (statusCode === 422) {
                            if (body.errors && body.errors.length > 0) {
                                error = body.errors[0];

                                if (error.field == 'password') {
                                    data.password_error = body.message;
                                    data.password_autofocus = 'autofocus';
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = body.message;
                            }
                            renderTokenDetailWithData(ctx, data);
                        } else {
                            data.error = 'Get token detail failed';
                            renderTokenDetailWithData(ctx, data);
                        }

                    case 23:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[8, 14]]);
    }));

    return function tokenDetailRequest(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

// render

var settingProfileWithData = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, data) {
        var html;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        // main menu
                        data.main_menu = render_data.mainMenuData(ctx);

                        debug(data);
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/setting/profile'), data);

                        ctx.body = html;

                    case 4:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function settingProfileWithData(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();

var settingAccountWithData = function () {
    var _ref10 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10(ctx, data) {
        var html;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        // main menu
                        data.main_menu = render_data.mainMenuData(ctx);

                        debug(data);
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/setting/account'), data);

                        ctx.body = html;

                    case 4:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function settingAccountWithData(_x19, _x20) {
        return _ref10.apply(this, arguments);
    };
}();

var renderTokensWithData = function () {
    var _ref11 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee11(ctx, data) {
        var html;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        // main menu
                        data.main_menu = render_data.mainMenuData(ctx);

                        // config js
                        data.node_env = process.env.NODE_ENV || 'default';

                        debug(data);
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/setting/tokens'), data);

                        ctx.body = html;

                    case 5:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));

    return function renderTokensWithData(_x21, _x22) {
        return _ref11.apply(this, arguments);
    };
}();

var renderGenerateTokenWithData = function () {
    var _ref12 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee12(ctx, data) {
        var html;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        // main menu
                        data.main_menu = render_data.mainMenuData(ctx);

                        debug(data);
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/setting/token-generate'), data);

                        ctx.body = html;

                    case 4:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));

    return function renderGenerateTokenWithData(_x23, _x24) {
        return _ref12.apply(this, arguments);
    };
}();

var renderGeneratedTokenWithData = function () {
    var _ref13 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee13(ctx, data) {
        var html;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        // main menu
                        data.main_menu = render_data.mainMenuData(ctx);

                        // config js
                        data.node_env = process.env.NODE_ENV || 'default';

                        debug(data);
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/setting/token-generated'), data);

                        ctx.body = html;

                    case 5:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));

    return function renderGeneratedTokenWithData(_x25, _x26) {
        return _ref13.apply(this, arguments);
    };
}();

var renderTokenDetailWithData = function () {
    var _ref14 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee14(ctx, data) {
        var html;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        // main menu
                        data.main_menu = render_data.mainMenuData(ctx);

                        debug(data);
                        html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/setting/token-detail'), data);

                        ctx.body = html;

                    case 4:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function renderTokenDetailWithData(_x27, _x28) {
        return _ref14.apply(this, arguments);
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

var _cookie = require('../utils/cookie');

var cookie = _interopRequireWildcard(_cookie);

var _token = require('../utils/token');

var token = _interopRequireWildcard(_token);

var _data = require('../tools/data');

var render_data = _interopRequireWildcard(_data);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name); /**
                                                          * Created by Bell on 16/9/7.
                                                          */

var request = _bluebird2.default.promisifyAll(_request2.default);
//# sourceMappingURL=setting.js.map
