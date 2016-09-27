'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _admin = require('../controllers/admin');

var controller = _interopRequireWildcard(_admin);

var _token = require('../tools/token');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = '/admin'; /**
                          * Created by Bell on 16/9/23.
                          */

var router = new _koaRouter2.default({ prefix: base_url });

router.get('/', _token.ensureToken, controller.listUsers).get('/user', _token.ensureToken, controller.listUsers).get('/users/:id/modify-password', _token.ensureToken, controller.modifyPassword).post('/users/:id/modify-password', _token.ensureToken, controller.modifyPasswordRequest).get('/permission', _token.ensureToken, controller.permission).post('/permission', _token.ensureToken, controller.permissionRequest).get('/project', _token.ensureToken, controller.listProjects);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=admin.js.map
