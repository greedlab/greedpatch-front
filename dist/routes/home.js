'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _project = require('../controllers/project');

var project = _interopRequireWildcard(_project);

var _user = require('../controllers/user');

var user = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = '/'; /**
                     * Created by Bell on 16/8/16.
                     */

var router = new _koaRouter2.default();

router.get('/', project.list).get('/login', user.login).post('/login', user.loginRequest).get('/register', user.register).post('/register', user.registerRequest).get('/reset-password', user.resetPassword).post('/reset-password', user.resetPasswordRequest).get('/set-my-password', user.setMyPassword).post('/set-my-password', user.setMyPasswordRequest).post('/logout', user.logoutRequest);

// router
//     .get('/login', user.login);


exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=home.js.map
