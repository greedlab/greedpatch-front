/**
 * Created by Bell on 16/9/1.
 */

import config from '../config';

const token_key = 'token';
const user_role_key = 'user_role';
const user_email_key = 'user_email';

export function setToken(ctx, token) {
    ctx.cookies.set(token_key, token, {
        domain: config.cookie_domain,
        signed: true,
        httpOnly: true,
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

export function setUserRole(ctx, token) {
    ctx.cookies.set(user_role_key, token, {
        domain: config.cookie_domain,
        signed: true,
        httpOnly: true,
        maxAge: maxAge()
    });
}

export function getUserRole(ctx) {
    return ctx.cookies.get(user_role_key, {
        signed: true
    });
}

export function clearUserRole(ctx) {
    ctx.cookies.set(user_role_key, null, {
        signed: true
    });
}

export function setUserEmail(ctx, token) {
    ctx.cookies.set(user_email_key, token, {
        domain: config.cookie_domain,
        httpOnly: true,
        maxAge: maxAge()
    });
}

export function getUserEmail(ctx) {
    return ctx.cookies.get(user_email_key);
}

export function clearUserEmail(ctx) {
    ctx.cookies.set(user_email_key, null);
}

export function clear(ctx) {
    clearToken(ctx);
    clearUserRole(ctx);
    clearUserEmail(ctx);
}

function maxAge() {
    return 7 * 24 * 60 * 60 * 1000;
}
