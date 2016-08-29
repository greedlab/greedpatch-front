'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _book = require('../controllers/book');

var controller = _interopRequireWildcard(_book);

var _token = require('../utils/token');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = '/book'; /**
                         * Created by Bell on 16/8/16.
                         */

var router = new _koaRouter2.default({ prefix: base_url });

router.get('/list', controller.list).get('/detail', controller.detail).get('/add', _token.ensureToken, controller.add).post('/add', _token.ensureToken, controller.addRequest);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=book.js.map
