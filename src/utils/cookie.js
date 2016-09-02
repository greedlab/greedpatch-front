/**
 * Created by Bell on 16/9/1.
 */

const token_key = 'token';
const role_key = 'role';

export function setToken(ctx, token) {
    ctx.cookies.set(token_key, token, {
        signed: true,
        httpOnly: false,
        maxAge: maxAge()
    });
}

export function getToken(ctx) {
    return ctx.cookies.get(token_key, {
        signed: true
    });
}

export function clearToken(ctx) {
    ctx.cookies.set(token_key, null, {
        signed: true
    });
}

export function setRole(ctx, token) {
    ctx.cookies.set(role_key, token, {
        signed: true,
        httpOnly: false,
        maxAge: maxAge()
    });
}

export function getRole(ctx) {
    return ctx.cookies.get(role_key, {
        signed: true
    });
}

export function clearRole(ctx) {
    ctx.cookies.set(role_key, null, {
        signed: true
    });
}

export function clear(ctx) {
    clearToken(ctx);
    clearRole(ctx);
}

function maxAge() {
    return 7 * 24 * 60 * 60 * 1000;
}
