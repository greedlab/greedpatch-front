/**
 * Created by Bell on 16/8/16.
 */

import * as cookie from './cookie';

export function bearerTokenFromToken(token) {
    return 'Bearer ' + token;
}

export function bearerToken(ctx) {
    const token = cookie.getToken(ctx);
    if (token) {
        return bearerTokenFromToken(token);
    }
    return null;
}

export function ensureToken(ctx, next) {
    const token = cookie.getToken(ctx);
    if (!token) {
        ctx.redirect('/login');
    }
    if (next) {
        return next();
    }
}
