'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _project = require('../controllers/project');

var controller = _interopRequireWildcard(_project);

var _token = require('../tools/token');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = '/projects'; /**
                             * Created by Bell on 16/8/31.
                             */

var router = new _koaRouter2.default({ prefix: base_url });

router.get('/', _token.ensureToken, controller.list).post('/', _token.ensureToken, controller.createRequest).get('/new', _token.ensureToken, controller.create).get('/:id', _token.ensureToken, controller.detail).get('/:id/patches/new', _token.ensureToken, controller.createPatch).post('/:id/patches/new', _token.ensureToken, controller.createPatchRequest).get('/:id/info', _token.ensureToken, controller.setInfo).post('/:id/info', _token.ensureToken, controller.setInfoRequest).get('/:id/members', _token.ensureToken, controller.setMembers).post('/:id/members', _token.ensureToken, controller.addMemberRequest).delete('/:id/members/:member_id', _token.ensureToken, controller.deleteMemberRequest);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=project.js.map
