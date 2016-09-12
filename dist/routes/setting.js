'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _token = require('../tools/token');

var _setting = require('../controllers/setting');

var controller = _interopRequireWildcard(_setting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = '/settings'; /**
                             * Created by Bell on 16/9/7.
                             */

var router = new _koaRouter2.default({ prefix: base_url });

router.get('/', _token.ensureToken, controller.profile).get('/my/profile', _token.ensureToken, controller.profile).get('/my/account', _token.ensureToken, controller.account).post('/my/account', _token.ensureToken, controller.modifyPassword).get('/my/tokens', _token.ensureToken, controller.tokens).get('/my/tokens/new', _token.ensureToken, controller.generateToken).post('/my/tokens/new', _token.ensureToken, controller.generateTokenRequest).get('/my/tokens/:id', _token.ensureToken, controller.tokenDetail).post('/my/tokens/:id', _token.ensureToken, controller.tokenDetailRequest);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=setting.js.map
