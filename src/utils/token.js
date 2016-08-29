/**
 * Created by Bell on 16/8/16.
 */

export function saveToken(ctx, token) {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    ctx.cookies.set('token',token, {
        signed: true,
        httpOnly: true,
        maxAge: maxAge
    });
}

export function getToken(ctx) {
    return ctx.cookies.get('token', {
        signed: true
    });
}

export function bearerToken(token) {
    return 'Bearer ' + token;
}

export function clearToken(ctx) {
    ctx.cookies.set('token',null, {
        signed: true,
        httpOnly: true
    });
}

export function ensureToken(ctx, next) {
    const token = getToken(ctx);
    if (!token) {
        ctx.redirect('/login');
        return;
    }
    return next();
}
