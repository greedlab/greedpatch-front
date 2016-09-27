'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listProjects = exports.permissionRequest = exports.permission = exports.modifyPasswordRequest = exports.modifyPassword = exports.listUsers = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var listUsers = exports.listUsers = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var data, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = {};
                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/users'),
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

                        data.error = 'List users failed';
                        listUsersWithData(ctx, data);
                        return _context.abrupt('return');

                    case 15:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200) {
                            data.users = JSON.parse(body);
                            listUsersWithData(ctx, data);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else if (statusCode == 403) {
                            data.error = 'No permission';
                            listUsersWithData(ctx, data);
                        } else {
                            data.error = 'List users failed';
                            listUsersWithData(ctx, data);
                        }

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10]]);
    }));

    return function listUsers(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var modifyPassword = exports.modifyPassword = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var data, bearerToken, id, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = {};
                        bearerToken = token.bearerToken(ctx);
                        id = ctx.params.id;
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/users/' + id + '/profile'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context2.prev = 5;
                        _context2.next = 8;
                        return request.getAsync(options);

                    case 8:
                        response = _context2.sent;
                        _context2.next = 16;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](5);

                        data.error = 'Get user\'s profile failed';
                        modifyPasswordWithData(ctx, data);
                        return _context2.abrupt('return');

                    case 16:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200) {
                            data.user = JSON.parse(body);
                            modifyPasswordWithData(ctx, data);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else if (statusCode == 403) {
                            data.error = 'No permission';
                            modifyPasswordWithData(ctx, data);
                        } else if (statusCode == 422) {
                            data.error = body.message;
                            modifyPasswordWithData(ctx, data);
                        } else {
                            data.error = 'Get user\'s profile failed';
                            modifyPasswordWithData(ctx, data);
                        }

                    case 19:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[5, 11]]);
    }));

    return function modifyPassword(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var modifyPasswordRequest = exports.modifyPasswordRequest = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var data, id, user, request_body, email, password, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = {};
                        id = ctx.params.id;
                        user = {};

                        data.user = user;
                        user._id = id;

                        request_body = ctx.request.body;

                        if (request_body) {
                            _context3.next = 10;
                            break;
                        }

                        data.error = 'Update user\'s password failed';
                        modifyPasswordWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 10:
                        email = request_body.email;

                        if (email) {
                            _context3.next = 15;
                            break;
                        }

                        data.error = 'Email is empty';
                        modifyPasswordWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 15:
                        user.email = email;

                        password = request_body.password;

                        if (password) {
                            _context3.next = 21;
                            break;
                        }

                        data.error = 'Password is empty';
                        modifyPasswordWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 21:
                        user.password = password;

                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/users/' + id + '/password'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context3.prev = 25;
                        _context3.next = 28;
                        return request.postAsync(options);

                    case 28:
                        response = _context3.sent;
                        _context3.next = 36;
                        break;

                    case 31:
                        _context3.prev = 31;
                        _context3.t0 = _context3['catch'](25);

                        data.error = 'Update user\'s password failed';
                        modifyPasswordWithData(ctx, data);
                        return _context3.abrupt('return');

                    case 36:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode >= 200 || statusCode < 300) {
                            ctx.redirect('/admin/user');
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else if (statusCode == 403) {
                            data.error = 'No permission';
                            modifyPasswordWithData(ctx, data);
                        } else if (statusCode == 422) {
                            data.error = body.message;
                            modifyPasswordWithData(ctx, data);
                        } else {
                            data.error = 'Update user\'s password failed';
                            modifyPasswordWithData(ctx, data);
                        }

                    case 39:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[25, 31]]);
    }));

    return function modifyPasswordRequest(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var permission = exports.permission = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var data, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = {};
                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/permissions/0'),
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

                        data.error = 'Get permission failed';
                        permissionWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 15:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200) {
                            data.permission = JSON.parse(body) || {};
                            permissionWithData(ctx, data);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else if (statusCode == 403) {
                            data.error = 'No permission';
                            permissionWithData(ctx, data);
                        } else {
                            data.error = 'Get permission failed';
                            permissionWithData(ctx, data);
                        }

                    case 18:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[4, 10]]);
    }));

    return function permission(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var permissionRequest = exports.permissionRequest = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var request_body, data, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        request_body = ctx.request.body;

                        debug(request_body);
                        data = {};

                        data.permission = request_body;
                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/permissions/0'),
                            headers: {
                                Authorization: bearerToken,
                                contentType: _config2.default.content_type,
                                Accept: _config2.default.accept
                            },
                            json: true,
                            body: request_body
                        };
                        response = null;
                        _context5.prev = 7;
                        _context5.next = 10;
                        return request.putAsync(options);

                    case 10:
                        response = _context5.sent;
                        _context5.next = 18;
                        break;

                    case 13:
                        _context5.prev = 13;
                        _context5.t0 = _context5['catch'](7);

                        data.error = 'Update permission failed';
                        permissionWithData(ctx, data);
                        return _context5.abrupt('return');

                    case 18:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode >= 200 && statusCode < 300) {
                            ctx.redirect('/admin/permission');
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else if (statusCode == 403) {
                            data.error = 'No permission';
                            permissionWithData(ctx, data);
                        } else {
                            data.error = 'Update permission failed';
                            permissionWithData(ctx, data);
                        }

                    case 21:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[7, 13]]);
    }));

    return function permissionRequest(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var listProjects = exports.listProjects = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var data, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        data = {};
                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context6.prev = 4;
                        _context6.next = 7;
                        return request.getAsync(options);

                    case 7:
                        response = _context6.sent;
                        _context6.next = 15;
                        break;

                    case 10:
                        _context6.prev = 10;
                        _context6.t0 = _context6['catch'](4);

                        data.error = 'List projects failed';
                        listProjectsWithData(ctx, data);
                        return _context6.abrupt('return');

                    case 15:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200) {
                            data.projects = JSON.parse(body);
                            listProjectsWithData(ctx, data);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else if (statusCode == 403) {
                            data.error = 'No permission';
                            listProjectsWithData(ctx, data);
                        } else {
                            data.error = 'List projects failed';
                            listProjectsWithData(ctx, data);
                        }

                    case 18:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[4, 10]]);
    }));

    return function listProjects(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

// private render

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

var _data = require('../tools/data');

var render_data = _interopRequireWildcard(_data);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/9/23.
 */

var debug = new _debug2.default(_package2.default.name);

var request = _bluebird2.default.promisifyAll(_request2.default);

function listUsersWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    // config js
    data.node_env = process.env.NODE_ENV || 'default';

    debug(data);

    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/admin/user'), data);
    ctx.body = html;
}

function permissionWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);
    debug(data);
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/admin/permission'), data);
    ctx.body = html;
}

function listProjectsWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    // config js
    data.node_env = process.env.NODE_ENV || 'default';

    debug(data);
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/admin/project'), data);
    ctx.body = html;
}

function modifyPasswordWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    debug(data);
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/admin/modify-password'), data);
    ctx.body = html;
}
//# sourceMappingURL=admin.js.map
