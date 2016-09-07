'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tokenDetail = exports.createTokenRequest = exports.createToken = exports.tokens = exports.modifyPassword = exports.account = exports.profileRequest = exports.profile = undefined;

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
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id),
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

                        data.error = 'Get project detail failed';
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
                        data.error = 'Get project detail failed';
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

var profileRequest = exports.profileRequest = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function profileRequest(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var account = exports.account = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function account(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var modifyPassword = exports.modifyPassword = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function modifyPassword(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var tokens = exports.tokens = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function tokens(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var createToken = exports.createToken = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function createToken(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var createTokenRequest = exports.createTokenRequest = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function createTokenRequest(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

var tokenDetail = exports.tokenDetail = function () {
    var _ref8 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(ctx, next) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function tokenDetail(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

// render

var settingProfileWithData = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, data) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
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

/**
 * Created by Bell on 16/9/7.
 */

var debug = new _debug2.default(_package2.default.name);

var request = _bluebird2.default.promisifyAll(_request2.default);
//# sourceMappingURL=setting.js.map
