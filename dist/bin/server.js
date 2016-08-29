'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

app.keys = _config2.default.cookieKeys;

// logger

app.use((0, _koaLogger2.default)());

// bodyParser

app.use((0, _koaBodyparser2.default)());

// router

app.use(_home2.default.router.routes()).use(_home2.default.router.allowedMethods()).use(_book2.default.router.routes()).use(_book2.default.router.allowedMethods());

// favicon

app.use((0, _koaFavicon2.default)(_path2.default.join(__dirname, '../assets/favicon.ico')));

// static

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../assets')));

// listen

app.listen(_config2.default.port);
//# sourceMappingURL=server.js.map
