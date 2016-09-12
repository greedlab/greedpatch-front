'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setToken = setToken;
exports.getToken = getToken;
exports.clearToken = clearToken;
exports.setUserRole = setUserRole;
exports.getUserRole = getUserRole;
exports.clearUserRole = clearUserRole;
exports.setUserEmail = setUserEmail;
exports.getUserEmail = getUserEmail;
exports.clearUserEmail = clearUserEmail;
exports.clear = clear;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token_key = 'token'; /**
                          * Created by Bell on 16/9/1.
                          */

var user_role_key = 'user_role';
var user_email_key = 'user_email';

function setToken(ctx, token) {
    ctx.cookies.set(token_key, token, {
        domain: _config2.default.cookie_domain,
        signed: true,
        httpOnly: true,
        maxAge: maxAge()
    });
}

function getToken(ctx) {
    return ctx.cookies.get(token_key, {
        signed: true
    });
}

function clearToken(ctx) {
    ctx.cookies.set(token_key, null, {
        signed: true
    });
}

function setUserRole(ctx, token) {
    ctx.cookies.set(user_role_key, token, {
        domain: _config2.default.cookie_domain,
        signed: true,
        httpOnly: true,
        maxAge: maxAge()
    });
}

function getUserRole(ctx) {
    return ctx.cookies.get(user_role_key, {
        signed: true
    });
}

function clearUserRole(ctx) {
    ctx.cookies.set(user_role_key, null, {
        signed: true
    });
}

function setUserEmail(ctx, token) {
    ctx.cookies.set(user_email_key, token, {
        domain: _config2.default.cookie_domain,
        httpOnly: true,
        maxAge: maxAge()
    });
}

function getUserEmail(ctx) {
    return ctx.cookies.get(user_email_key);
}

function clearUserEmail(ctx) {
    ctx.cookies.set(user_email_key, null);
}

function clear(ctx) {
    clearToken(ctx);
    clearUserRole(ctx);
    clearUserEmail(ctx);
}

function maxAge() {
    return 7 * 24 * 60 * 60 * 1000;
}
//# sourceMappingURL=cookie.js.map
