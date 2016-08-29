/**
 * Created by Bell on 16/8/16.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';

import * as token from '../utils/token';
import * as string from '../utils/string';
import config from '../config';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const request = bluebird.promisifyAll(Request);

export async function login(ctx, next) {
    const data = {
        title: 'Login'
    };
    loginWithData(data);
}

export async function loginRequest(ctx, next) {
    debug(ctx.request.body);
    const username = ctx.request.body.username;
    if (!username || username.length == 0) {
        loginWithMessage(ctx,next,'username is empty');
        return;
    }
    const password = ctx.request.body.password;
    if (!password || password.length == 0) {
        loginWithMessage(ctx,next,'password is empty');
        return;
    }
    const options = {
        url: url.resolve(config.api_address, '/user/login'),
        json: true,
        body: {
            username: username,
            password: password
        }
    };
    const response = await request.postAsync(options);
    debug(response.statusCode);
    debug(response.body);
    if (response.statusCode == 200) {
        token.saveToken(ctx,response.body.token);
        ctx.redirect('/');
    } else {
        const data = {
            title: 'Login',
            error: response.body || 'unvalid username or password'
        };
        loginWithData(data);
    }
}

export async function register(ctx, next) {
    const data = {
        title: 'Register'
    };
    registerWithData(data);
}

export async function registerRequest(ctx, next) {
    debug(ctx.request.body);
    const username = ctx.request.body.username;
    if (!string.validUsername(username)) {
        registerWithMessage(ctx,next,'unvalid username');
        return;
    }
    const password = ctx.request.body.password;
    if (!string.validPassword(password)) {
        registerWithMessage(ctx,next,'unvalid password');
        return;
    }
    const confirmPassword = ctx.request.body.confirmPassword;
    if (password != confirmPassword) {
        registerWithMessage(ctx,next,'unvalid password');
        return;
    }
    const options = {
        url: url.resolve(config.api_address, '/user/register'),
        json: true,
        body: {
            username: username,
            password: password
        }
    };
    const response = await request.postAsync(options);
    debug(response.statusCode);
    debug(response.body);
    if (response.statusCode == 200) {
        token.saveToken(ctx,response.body.token);
        ctx.redirect('/');
    } else {
        const data = {
            title: 'Register',
            error: response.body || 'register failed'
        };
        registerWithData(data);
    }
}

export async function resetPassword(ctx, next) {
    loginWithMessage(ctx,next,null);
}

export async function resetPasswordRequest(ctx, next) {
    loginWithMessage(ctx,next,null);
}

export async function setMyPassword(ctx, next) {
    loginWithMessage(ctx,next,null);
}

export async function setMyPasswordRequest(ctx, next) {
    loginWithMessage(ctx,next,null);
}

export async function logoutRequest(ctx, next) {
    const theToken = token.getToken(ctx);
    if (theToken && theToken.length > 0) {
        const bearerToken = token.bearerToken(theToken);
        const options = {
            url: url.resolve(config.api_address, '/user/logout'),
            headers: {
                Authorization: bearerToken
            }
        };
        const response = await request.postAsync(options);
        debug(response.statusCode);
        debug(response.body);
    }
    ctx.redirect('/');
    token.clearToken(ctx);
}

function loginWithData(data) {
    var html = template(path.join(__dirname,'../views/user/login'), data);
    ctx.body = html;
}

function registerWithData(data) {
    var html = template(path.join(__dirname,'../views/user/register'), data);
    ctx.body = html;
}

function resetPasswordWithData(data) {
    var html = template(path.join(__dirname,'../views/user/reset-password'), data);
    ctx.body = html;
}

function setMyPasswordWithData(ctx, next, message) {
    var html = template(path.join(__dirname,'../views/user/set-password'), data);
    ctx.body = html;
}
