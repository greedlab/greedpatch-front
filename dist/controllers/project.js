'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addMemberRequest = exports.setMembers = exports.setInfoRequest = exports.setInfo = exports.createPatchRequest = exports.createPatch = exports.createRequest = exports.create = exports.detail = exports.list = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var list = exports.list = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var data, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = {};
                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/my'),
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

                        data.error = 'List projects failed';
                        listWithData(ctx, data);
                        return _context.abrupt('return');

                    case 15:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200) {
                            data.projects = JSON.parse(body);
                            listWithData(ctx, data);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else {
                            data.error = 'List projects failed';
                            listWithData(ctx, data);
                        }

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10]]);
    }));

    return function list(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var detail = exports.detail = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var project_id, data, bearerToken, options, response, statusCode, body, _options, _response, _statusCode, _body;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        project_id = ctx.params.id;
                        data = {};
                        bearerToken = token.bearerToken(ctx);

                        // project menu

                        data.project_menu = {
                            id: project_id
                        };

                        // project detail
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context2.prev = 6;
                        _context2.next = 9;
                        return request.getAsync(options);

                    case 9:
                        response = _context2.sent;
                        _context2.next = 17;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2['catch'](6);

                        data.error = 'Get project detail failed';
                        detailWithData(ctx, data);
                        return _context2.abrupt('return');

                    case 17:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (!(statusCode == 200)) {
                            _context2.next = 23;
                            break;
                        }

                        data.detail = JSON.parse(body);
                        _context2.next = 31;
                        break;

                    case 23:
                        if (!(statusCode == 401)) {
                            _context2.next = 28;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context2.abrupt('return');

                    case 28:
                        data.error = 'Get project detail failed';
                        detailWithData(ctx, data);
                        return _context2.abrupt('return');

                    case 31:
                        _options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id + '/patches'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        _response = null;
                        _context2.prev = 33;
                        _context2.next = 36;
                        return request.getAsync(_options);

                    case 36:
                        _response = _context2.sent;
                        _context2.next = 44;
                        break;

                    case 39:
                        _context2.prev = 39;
                        _context2.t1 = _context2['catch'](33);

                        data.error = 'Get patches failed';
                        detailWithData(ctx, data);
                        return _context2.abrupt('return');

                    case 44:
                        _statusCode = _response.statusCode;
                        _body = _response.body;

                        if (!(_statusCode == 200)) {
                            _context2.next = 50;
                            break;
                        }

                        data.patches = JSON.parse(_body);
                        _context2.next = 58;
                        break;

                    case 50:
                        if (!(_statusCode == 401)) {
                            _context2.next = 55;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context2.abrupt('return');

                    case 55:
                        data.error = 'Get patches failed';
                        detailWithData(ctx, data);
                        return _context2.abrupt('return');

                    case 58:

                        detailWithData(ctx, data);

                    case 59:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[6, 12], [33, 39]]);
    }));

    return function detail(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var create = exports.create = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = {
                            name_autofocus: 'autofocus'
                        };

                        createWithData(ctx, data);

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function create(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var createRequest = exports.createRequest = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var bearerToken, data, options, response, statusCode, body, error;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        bearerToken = token.bearerToken(ctx);
                        data = ctx.request.body;

                        debug(data);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects'),
                            json: true,
                            headers: {
                                contentType: 'application/json',
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            },
                            body: data
                        };
                        response = null;
                        _context4.prev = 5;
                        _context4.next = 8;
                        return request.postAsync(options);

                    case 8:
                        response = _context4.sent;
                        _context4.next = 16;
                        break;

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4['catch'](5);

                        data.error = 'Create project failed';
                        createWithData(ctx, data);
                        return _context4.abrupt('return');

                    case 16:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200 || statusCode == 201) {
                            ctx.redirect('/projects/' + body._id);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else {
                            if (statusCode == 422) {
                                if (body && body.errors && body.errors.length > 0) {
                                    error = body.errors[0];

                                    if (error.field == 'name') {
                                        data.name_autofocus = 'autofocus';
                                        data.name_error = body.message;
                                    } else {
                                        data.error = body.message;
                                    }
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = 'Create project failed';
                            }
                            createWithData(ctx, data);
                        }

                    case 19:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[5, 11]]);
    }));

    return function createRequest(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var createPatch = exports.createPatch = function () {
    var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(ctx, next) {
        var data, project_id, version_object;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = {};
                        project_id = ctx.params.id;

                        data.id = project_id;

                        // project versions
                        _context5.next = 5;
                        return getProjectVewsions(ctx);

                    case 5:
                        version_object = _context5.sent;

                        if (version_object) {
                            data.project_versions = version_object.versions;
                        }

                        // project menu
                        data.project_menu = {
                            id: project_id
                        };

                        createPatchWithData(ctx, data);

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function createPatch(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var createPatchRequest = exports.createPatchRequest = function () {
    var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(ctx, next) {
        var project_id, bearerToken, data, options, response, statusCode, body, error;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        project_id = ctx.params.id;
                        bearerToken = token.bearerToken(ctx);
                        data = ctx.request.body;

                        debug(data);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id + '/patches'),
                            json: true,
                            headers: {
                                contentType: _config2.default.content_type,
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            },
                            body: data
                        };
                        response = null;
                        _context6.prev = 6;
                        _context6.next = 9;
                        return request.postAsync(options);

                    case 9:
                        response = _context6.sent;
                        _context6.next = 17;
                        break;

                    case 12:
                        _context6.prev = 12;
                        _context6.t0 = _context6['catch'](6);

                        data.error = 'Create patch failed';
                        createPatchWithData(ctx, data);
                        return _context6.abrupt('return');

                    case 17:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (statusCode == 200 || statusCode == 201) {
                            ctx.redirect('/projects/' + project_id);
                        } else if (statusCode == 401) {
                            ctx.redirect('/login');
                        } else {
                            if (statusCode == 422) {
                                if (body && body.errors && body.errors.length > 0) {
                                    error = body.errors[0];

                                    if (error.field == 'project_version') {
                                        data.project_version_autofocus = 'autofocus';
                                        data.project_version_error = body.message;
                                    } else if (error.field == 'patch_version') {
                                        data.patch_version_autofocus = 'autofocus';
                                        data.patch_version_error = body.message;
                                    } else if (error.field == 'hash') {
                                        data.hash_autofocus = 'autofocus';
                                        data.hash_error = body.message;
                                    } else if (error.field == 'patch_url') {
                                        data.patch_url_autofocus = 'autofocus';
                                        data.patch_url_error = body.message;
                                    } else {
                                        data.error = body.message;
                                    }
                                } else {
                                    data.error = body.message;
                                }
                            } else {
                                data.error = 'Create patch failed';
                            }
                            createWithData(ctx, data);
                        }

                        // project menu
                        data.project_menu = {
                            id: project_id
                        };

                        data.id = project_id;
                        createPatchWithData(ctx, data);

                    case 23:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[6, 12]]);
    }));

    return function createPatchRequest(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var setInfo = exports.setInfo = function () {
    var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(ctx, next) {
        var project_id, data, bearerToken, options, response, statusCode, body, _options2, _response2, _statusCode2, _body2;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        project_id = ctx.params.id;
                        data = {};
                        bearerToken = token.bearerToken(ctx);

                        // project menu

                        data.project_menu = {
                            id: project_id
                        };

                        // project detail
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context7.prev = 6;
                        _context7.next = 9;
                        return request.getAsync(options);

                    case 9:
                        response = _context7.sent;
                        _context7.next = 17;
                        break;

                    case 12:
                        _context7.prev = 12;
                        _context7.t0 = _context7['catch'](6);

                        data.error = 'Get project detail failed';
                        setInfoWithData(ctx, data);
                        return _context7.abrupt('return');

                    case 17:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (!(statusCode == 200)) {
                            _context7.next = 23;
                            break;
                        }

                        data.detail = JSON.parse(body);
                        _context7.next = 31;
                        break;

                    case 23:
                        if (!(statusCode == 401)) {
                            _context7.next = 28;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context7.abrupt('return');

                    case 28:
                        data.error = 'Get project detail failed';
                        setInfoWithData(ctx, data);
                        return _context7.abrupt('return');

                    case 31:
                        _options2 = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id + '/patches'),
                            headers: {
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        _response2 = null;
                        _context7.prev = 33;
                        _context7.next = 36;
                        return request.getAsync(_options2);

                    case 36:
                        _response2 = _context7.sent;
                        _context7.next = 44;
                        break;

                    case 39:
                        _context7.prev = 39;
                        _context7.t1 = _context7['catch'](33);

                        data.error = 'Get patches failed';
                        setInfoWithData(ctx, data);
                        return _context7.abrupt('return');

                    case 44:
                        _statusCode2 = _response2.statusCode;
                        _body2 = _response2.body;

                        if (!(_statusCode2 == 200)) {
                            _context7.next = 50;
                            break;
                        }

                        data.patches = JSON.parse(_body2);
                        _context7.next = 58;
                        break;

                    case 50:
                        if (!(_statusCode2 == 401)) {
                            _context7.next = 55;
                            break;
                        }

                        ctx.redirect('/login');
                        return _context7.abrupt('return');

                    case 55:
                        data.error = 'Get patches failed';
                        setInfoWithData(ctx, data);
                        return _context7.abrupt('return');

                    case 58:

                        setInfoWithData(ctx, data);

                    case 59:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[6, 12], [33, 39]]);
    }));

    return function setInfo(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

var setInfoRequest = exports.setInfoRequest = function () {
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

    return function setInfoRequest(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

var setMembers = exports.setMembers = function () {
    var _ref9 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(ctx, next) {
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

    return function setMembers(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();

var addMemberRequest = exports.addMemberRequest = function () {
    var _ref10 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10(ctx, next) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function addMemberRequest(_x19, _x20) {
        return _ref10.apply(this, arguments);
    };
}();

var getProjectVewsions = function () {
    var _ref11 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee11(ctx) {
        var project_id, bearerToken, options, response, statusCode, body;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        project_id = ctx.params.id;
                        bearerToken = token.bearerToken(ctx);
                        options = {
                            url: _url2.default.resolve(_config2.default.api_address, '/projects/' + project_id + '/versions'),
                            headers: {
                                contentType: 'application/json',
                                Authorization: bearerToken,
                                Accept: _config2.default.accept
                            }
                        };
                        response = null;
                        _context11.prev = 4;
                        _context11.next = 7;
                        return request.getAsync(options);

                    case 7:
                        response = _context11.sent;
                        _context11.next = 13;
                        break;

                    case 10:
                        _context11.prev = 10;
                        _context11.t0 = _context11['catch'](4);
                        return _context11.abrupt('return', null);

                    case 13:
                        statusCode = response.statusCode;
                        body = response.body;

                        if (!(statusCode >= 200 && statusCode < 300)) {
                            _context11.next = 19;
                            break;
                        }

                        return _context11.abrupt('return', JSON.parse(body));

                    case 19:
                        if (statusCode == 401) {
                            ctx.redirect('/login');
                        }

                    case 20:
                        return _context11.abrupt('return', null);

                    case 21:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[4, 10]]);
    }));

    return function getProjectVewsions(_x21) {
        return _ref11.apply(this, arguments);
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

var _cookie = require('../utils/cookie');

var cookie = _interopRequireWildcard(_cookie);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/8/29.
 */

var debug = new _debug2.default(_package2.default.name);

var request = _bluebird2.default.promisifyAll(_request2.default);

function listWithData(ctx, data) {
    var role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/project/list'), data);
    ctx.body = html;
}

function createWithData(ctx, data) {
    var role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/project/new'), data);
    ctx.body = html;
}

/**
 * render project detail
 *
 * @param ctx
 * @param detail {object}
 * @param projects {array}
 * @param error {string}
 */
function detailWithData(ctx, data) {
    debug(data);
    var role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/project/detail'), data);
    ctx.body = html;
}

function createPatchWithData(ctx, data) {
    var role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    debug(data);
    var html = (0, _artTemplate2.default)(_path2.default.join(__dirname, '../views/project/new-patch'), data);
    ctx.body = html;
}
//# sourceMappingURL=project.js.map
