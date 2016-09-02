'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bearerTokenFromToken = bearerTokenFromToken;
exports.bearerToken = bearerToken;
exports.ensureToken = ensureToken;

var _cookie = require('./cookie');

var cookie = _interopRequireWildcard(_cookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function bearerTokenFromToken(token) {
    return 'Bearer ' + token;
} /**
   * Created by Bell on 16/8/16.
   */

function bearerToken(ctx) {
    var token = cookie.getToken(ctx);
    if (token) {
        return bearerTokenFromToken(token);
    }
    return null;
}

function ensureToken(ctx, next) {
    var token = cookie.getToken(ctx);
    if (!token) {
        ctx.redirect('/login');
    }
    if (next) {
        return next();
    }
}
//# sourceMappingURL=token.js.map
