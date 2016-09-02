'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setToken = setToken;
exports.getToken = getToken;
exports.clearToken = clearToken;
exports.setRole = setRole;
exports.getRole = getRole;
exports.clearRole = clearRole;
exports.clear = clear;
/**
 * Created by Bell on 16/9/1.
 */

var token_key = 'token';
var role_key = 'role';

function setToken(ctx, token) {
    ctx.cookies.set(token_key, token, {
        signed: true,
        httpOnly: false,
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

function setRole(ctx, token) {
    ctx.cookies.set(role_key, token, {
        signed: true,
        httpOnly: false,
        maxAge: maxAge()
    });
}

function getRole(ctx) {
    return ctx.cookies.get(role_key, {
        signed: true
    });
}

function clearRole(ctx) {
    ctx.cookies.set(role_key, null, {
        signed: true
    });
}

function clear(ctx) {
    clearToken(ctx);
    clearRole(ctx);
}

function maxAge() {
    return 7 * 24 * 60 * 60 * 1000;
}
//# sourceMappingURL=cookie.js.map
