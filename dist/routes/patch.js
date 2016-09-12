'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _patch = require('../controllers/patch');

var controller = _interopRequireWildcard(_patch);

var _token = require('../tools/token');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = '/patches'; /**
                            * Created by Bell on 16/8/31.
                            */

var router = new _koaRouter2.default({ prefix: base_url });

router.get('/', controller.list).get('/:id', controller.detail).get('/new', _token.ensureToken, controller.newProject).post('/new', _token.ensureToken, controller.newProjectRequest);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=patch.js.map
