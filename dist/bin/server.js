'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaFavicon = require('koa-favicon');

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaBunyanLogger = require('koa-bunyan-logger');

var _koaBunyanLogger2 = _interopRequireDefault(_koaBunyanLogger);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _home = require('../routes/home');

var _home2 = _interopRequireDefault(_home);

var _project = require('../routes/project');

var _project2 = _interopRequireDefault(_project);

var _setting = require('../routes/setting');

var _setting2 = _interopRequireDefault(_setting);

var _admin = require('../routes/admin');

var _admin2 = _interopRequireDefault(_admin);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import logger from 'koa-logger';
var debug = new _debug2.default(_package2.default.name);

var app = new _koa2.default();

app.keys = _config2.default.cookie_keys;

// bodyParser

app.use((0, _koaBodyparser2.default)());

// logger

// app.use(logger());

// favicon

app.use((0, _koaFavicon2.default)(_path2.default.join(__dirname, '../assets/favicon.ico')));

// static

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../assets')));

// koa-bunyan-logger

app.use((0, _koaBunyanLogger2.default)({
    name: _package2.default.name,
    level: 'debug'
}));
app.use(_koaBunyanLogger2.default.requestIdContext());
app.use(_koaBunyanLogger2.default.requestLogger({
    updateRequestLogFields: function updateRequestLogFields(fields, err) {
        fields.body = this.request.body;
    }
}));

// router

app.use(_home2.default.router.routes()).use(_home2.default.router.allowedMethods()).use(_project2.default.router.routes()).use(_project2.default.router.allowedMethods()).use(_setting2.default.router.routes()).use(_setting2.default.router.allowedMethods()).use(_admin2.default.router.routes()).use(_admin2.default.router.allowedMethods());

// listen

app.listen(_config2.default.port);
//# sourceMappingURL=server.js.map
