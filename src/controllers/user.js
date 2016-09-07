/**
 * Created by Bell on 16/8/16.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';

import config from '../config';
import * as token from '../utils/token';
import * as cookie from '../utils/cookie';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const request = bluebird.promisifyAll(Request);

export async function login(ctx, next) {
    const data = {
        email_autofocus: 'autofocus'
    };
    loginWithData(ctx, data);
}

export async function loginRequest(ctx, next) {
    let data = ctx.request.body;
    const options = {
        url: url.resolve(config.api_address, '/login'),
        json: true,
        body: data
    };
    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Login failed';
        loginWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200) {
        cookie.setToken(ctx, body.token);
        cookie.setUserRole(ctx, body.user.role);
        cookie.setUserEmail(ctx, body.user.email);
        ctx.redirect('/');
    } else {
        if (statusCode == 401) {
            data.error = body.message;
        } else if (statusCode == 422) {
            if (body && body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'email') {
                    data.email_autofocus = 'autofocus';
                    data.email_error = body.message;
                } else if (error.field == 'password') {
                    data.password_autofocus = 'autofocus';
                    data.password_error = body.message;
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
        } else {
            data.error = 'Login failed';
        }
        loginWithData(ctx, data);
    }
}

export async function register(ctx, next) {
    const data = {
        email_autofocus: 'autofocus'
    };
    registerWithData(ctx, data);
}

export async function registerRequest(ctx, next) {
    let data = ctx.request.body;
    if (data.password && data.password != data.confirm_password) {
        data.confirm_password_error = 'Please input same password';
        data.confirm_password_autofocus = 'autofocus';
        registerWithData(ctx, data);
        return;
    }

    const options = {
        url: url.resolve(config.api_address, '/register'),
        json: true,
        body: data
    };

    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Register failed';
        registerWithData(ctx, data);
        return;
    }
    const body = response.body;
    if (response.statusCode == 200) {
        cookie.setToken(ctx, response.body.token);
        cookie.setUserRole(ctx, body.user.role);
        cookie.setUserEmail(ctx, body.user.email);
        ctx.redirect('/');
    } else {
        if (response.statusCode == 422) {
            if (body && body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'email') {
                    data.email_autofocus = 'autofocus';
                    data.email_error = body.message;
                } else if (error.field == 'password') {
                    data.password_autofocus = 'autofocus';
                    data.password_error = body.message;
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
        } else {
            data.error = 'Register failed';
        }
        registerWithData(ctx, data);
    }
}

export async function resetPassword(ctx, next) {
    const data = {
        email_autofocus: 'autofocus'
    };
    resetPasswordWithData(ctx, data);
}

export async function resetPasswordRequest(ctx, next) {
    let data = ctx.request.body;
    const options = {
        url: url.resolve(config.api_address, '/reset-password'),
        json: true,
        body: data
    };

    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Reset password failed';
        resetPasswordWithData(ctx, data);
        return;
    }
    const body = response.body;
    if (response.statusCode == 200) {
        data.success = body.message;
        resetPasswordWithData(ctx, data);
    } else {
        if (response.statusCode == 422) {
            if (body && body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'email') {
                    data.email_autofocus = 'autofocus';
                    data.email_error = body.message;
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
        } else {
            data.error = 'Reset password failed';
        }
        registerWithData(ctx, data);
    }
}

export async function setPassword(ctx, next) {
    const data = {
        token: ctx.params.token,
        password_autofocus: 'autofocus'
    };
    setPasswordWithData(ctx, data);
}

export async function setPasswordRequest(ctx, next) {
    let data = ctx.request.body;
    if (data.password && data.password != data.confirm_password) {
        data.confirm_password_error = 'Please input same password';
        data.confirm_password_autofocus = 'autofocus';
        setPasswordWithData(ctx, data);
        return;
    }

    data.token = ctx.params.token;
    const options = {
        url: url.resolve(config.api_address, '/set-password/'),
        json: true,
        body: data
    };

    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Set password failed';
        setPasswordWithData(ctx, data);
        return;
    }
    const body = response.body;
    if (response.statusCode == 200) {
        ctx.redirect('/login');
    } else {
        if (response.statusCode == 422) {
            if (body && body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'password') {
                    data.password_autofocus = 'autofocus';
                    data.password_error = body.message;
                } else if (error.field == 'confirm_password') {
                    data.confirm_password_autofocus = 'autofocus';
                    data.confirm_password_error = body.message;
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
        } else {
            data.error = 'Set password failed';
        }
        setPasswordWithData(ctx, data);
    }
}

export async function logoutRequest(ctx, next) {
    const theToken = cookie.getToken(ctx);
    if (theToken && theToken.length > 0) {
        const bearerToken = token.bearerTokenFromToken(theToken);
        const options = {
            url: url.resolve(config.api_address, '/logout'),
            headers: {
                Authorization: bearerToken
            }
        };
        const response = await request.postAsync(options);
        cookie.clear(ctx);
    }
    ctx.redirect('/');
}

function loginWithData(ctx, data) {
    var html = template(path.join(__dirname, '../views/user/login'), data);
    ctx.body = html;
}

function registerWithData(ctx, data) {
    var html = template(path.join(__dirname, '../views/user/register'), data);
    ctx.body = html;
}

function resetPasswordWithData(ctx, data) {
    var html = template(path.join(__dirname, '../views/user/reset-password'), data);
    ctx.body = html;
}

function setPasswordWithData(ctx, data) {
    var html = template(path.join(__dirname, '../views/user/set-password'), data);
    ctx.body = html;
}
