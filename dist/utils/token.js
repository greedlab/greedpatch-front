'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveToken = saveToken;
exports.getToken = getToken;
exports.bearerToken = bearerToken;
exports.clearToken = clearToken;
exports.ensureToken = ensureToken;
/**
 * Created by Bell on 16/8/16.
 */

function saveToken(ctx, token) {
    var maxAge = 7 * 24 * 60 * 60 * 1000;
    ctx.cookies.set('token', token, {
        signed: true,
        httpOnly: true,
        maxAge: maxAge
    });
}

function getToken(ctx) {
    return ctx.cookies.get('token', {
        signed: true
    });
}

function bearerToken(token) {
    return 'Bearer ' + token;
}

function clearToken(ctx) {
    ctx.cookies.set('token', null, {
        signed: true,
        httpOnly: true
    });
}

function ensureToken(ctx, next) {
    var token = getToken(ctx);
    if (!token) {
        ctx.redirect('/login');
        return;
    }
    return next();
}
//# sourceMappingURL=token.js.map
