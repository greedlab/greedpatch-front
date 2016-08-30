'use strict';

var _bluebird = require('bluebird');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaFavicon = require('koa-favicon');

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _home = require('../routes/home');

var _home2 = _interopRequireDefault(_home);

var _book = require('../routes/book');

var _book2 = _interopRequireDefault(_book);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default(_package2.default.name);

var app = new _koa2.default();

app.keys = _config2.default.cookie_keys;

// logger

app.use((0, _koaLogger2.default)());

// bodyParser

app.use((0, _koaBodyparser2.default)());

// favicon

app.use((0, _koaFavicon2.default)(_path2.default.join(__dirname, '../assets/favicon.ico')));

// static

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../assets')));

// router

app.use(_home2.default.router.routes()).use(_home2.default.router.allowedMethods());

app.use(function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debug(ctx.request);
                        return _context.abrupt('return', next());

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

// listen

app.listen(_config2.default.port);
//# sourceMappingURL=server.js.map
