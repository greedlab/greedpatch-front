/**
 * Created by Bell on 16/9/7.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';

import config from '../config';
import * as cookie from '../tools/cookie';
import * as token from '../tools/token';

import * as render_data from '../tools/data';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const request = bluebird.promisifyAll(Request);

export async function profile(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);

    // user profile
    {
        const options = {
            url: url.resolve(config.api_address, '/users/me/profile'),
            headers: {
                Authorization: bearerToken,
                Accept: config.accept
            }
        };
        let response = null;
        try {
            response = await request.getAsync(options);
        } catch (err) {
            data.error = 'Get my profile failed';
            settingProfileWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode === 200) {
            data.content = JSON.parse(body);
        } else if (statusCode === 401) {
            ctx.redirect('/login');
            return;
        } else if (statusCode === 422) {
            data.error = body.message;
            settingProfileWithData(ctx, data);
            return;
        } else {
            data.error = 'Get my profile failed';
            settingProfileWithData(ctx, data);
            return;
        }
    }
    settingProfileWithData(ctx, data);
}

export async function account(ctx, next) {
    let data = {
        password_autofocus: 'autofocus'
    };
    settingAccountWithData(ctx, data);
}

export async function modifyPassword(ctx, next) {
    const bearerToken = token.bearerToken(ctx);
    const request_body = ctx.request.body;
    let data = request_body;

    if (request_body.new_password !== request_body.confirm_password) {
        data.confirm_password_error = 'Confirm new password failed';
        data.confirm_password_autofocus = 'autofocus';
        settingAccountWithData(ctx, data);
        return;
    }

    // modify my password
    {
        const options = {
            url: url.resolve(config.api_address, '/users/me/modify-password'),
            headers: {
                Authorization: bearerToken,
                contentType: config.content_type,
                Accept: config.accept
            },
            json: true,
            body: request_body
        };
        let response = null;
        try {
            response = await request.postAsync(options);
        } catch (err) {
            data.error = 'Modify password failed';
            settingAccountWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        debug(body);
        if (statusCode === 200) {
            cookie.setToken(ctx, body.token);
            cookie.setUserRole(ctx, body.user.role);
            cookie.setUserEmail(ctx, body.user.email);
            ctx.redirect('/');
        } else if (statusCode === 401) {
            ctx.redirect('/login');
            return;
        } else if (statusCode === 422) {
            if (body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'password') {
                    data.password_error = body.message;
                    data.password_autofocus = 'autofocus';
                } else if (error.field == 'new_password') {
                    data.new_password_error = body.message;
                    data.new_password_autofocus = 'autofocus';
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
            settingAccountWithData(ctx, data);
            return;
        } else {
            data.error = 'Modify password failed';
            settingAccountWithData(ctx, data);
            return;
        }
    }
    settingAccountWithData(ctx, data);
}

export async function tokens(ctx, next) {
    const bearerToken = token.bearerToken(ctx);
    let data = {};

    // get tokens
    {
        const options = {
            url: url.resolve(config.api_address, '/tokens'),
            headers: {
                Authorization: bearerToken,
                Accept: config.accept
            }
        };
        let response = null;
        try {
            response = await request.getAsync(options);
        } catch (err) {
            data.error = 'Get tokens failed';
            renderTokensWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        debug(body);
        if (statusCode === 200) {
            data.tokens = JSON.parse(body);
        } else if (statusCode === 401) {
            ctx.redirect('/login');
            return;
        } else if (statusCode === 422) {
            data.error = body.message;
            renderTokensWithData(ctx, data);
            return;
        } else {
            data.error = 'Get tokens failed';
            renderTokensWithData(ctx, data);
            return;
        }
    }
    renderTokensWithData(ctx, data);
}

export async function generateToken(ctx, next) {
    let data = {
        password_autofocus: 'autofocus'
    };
    renderGenerateTokenWithData(ctx, data)
}

export async function generateTokenRequest(ctx, next) {
    const bearerToken = token.bearerToken(ctx);
    const request_body = ctx.request.body;
    let data = request_body;

    // generate token
    {
        const options = {
            url: url.resolve(config.api_address, '/tokens'),
            headers: {
                Authorization: bearerToken,
                contentType: config.content_type,
                Accept: config.accept
            },
            json: true,
            body: request_body
        };
        let response = null;
        try {
            response = await request.postAsync(options);
        } catch (err) {
            data.error = 'Generate new token failed';
            renderGeneratedTokenWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        debug(body);
        if (statusCode >= 200 && statusCode < 300) {
            renderGeneratedTokenWithData(ctx, body);
        } else if (statusCode === 401) {
            ctx.redirect('/login');
        } else if (statusCode === 422) {
            if (body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'password') {
                    data.password_error = body.message;
                    data.password_autofocus = 'autofocus';
                } else if (error.field == 'name') {
                    data.name_error = body.message;
                    data.name_autofocus = 'autofocus';
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
            renderGenerateTokenWithData(ctx, data);
        } else {
            data.error = 'Modify password failed';
            renderGenerateTokenWithData(ctx, data);
        }
    }
}

export async function tokenDetail(ctx, next) {
    let data = {
        id: ctx.params.id,
        password_autofocus: 'autofocus'
    };
    renderTokenDetailWithData(ctx, data);
}

export async function tokenDetailRequest(ctx, next) {
    const bearerToken = token.bearerToken(ctx);
    const request_body = ctx.request.body;
    debug(request_body);
    const token_id = ctx.params.id;
    let data = request_body;
    data.id = token_id;

    // get token detail
    {
        const options = {
            url: url.resolve(config.api_address, '/tokens/' + token_id),
            headers: {
                Authorization: bearerToken,
                contentType: config.content_type,
                Accept: config.accept
            },
            json: true,
            body: request_body
        };
        let response = null;
        try {
            response = await request.postAsync(options);
        } catch (err) {
            data.error = 'Get token detail failed';
            renderTokenDetailWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        debug(body);
        if (statusCode >= 200 && statusCode < 300) {
            data.token = body;
            renderTokenDetailWithData(ctx, data);
        } else if (statusCode === 401) {
            ctx.redirect('/login');
        } else if (statusCode === 422) {
            if (body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'password') {
                    data.password_error = body.message;
                    data.password_autofocus = 'autofocus';
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
            renderTokenDetailWithData(ctx, data);
        } else {
            data.error = 'Get token detail failed';
            renderTokenDetailWithData(ctx, data);
        }
    }
}

// render

async function settingProfileWithData(ctx, data) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    debug(data);
    let html = template(path.join(__dirname, '../views/setting/profile'), data);
    ctx.body = html;
}

async function settingAccountWithData(ctx, data) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    debug(data);
    let html = template(path.join(__dirname, '../views/setting/account'), data);
    ctx.body = html;
}

async function renderTokensWithData(ctx, data) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    // config js
    data.node_env = process.env.NODE_ENV || 'default';

    debug(data);
    let html = template(path.join(__dirname, '../views/setting/tokens'), data);
    ctx.body = html;
}

async function renderGenerateTokenWithData(ctx, data) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    debug(data);
    let html = template(path.join(__dirname, '../views/setting/token-generate'), data);
    ctx.body = html;
}

async function renderGeneratedTokenWithData(ctx, data) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    // config js
    data.node_env = process.env.NODE_ENV || 'default';

    debug(data);
    let html = template(path.join(__dirname, '../views/setting/token-generated'), data);
    ctx.body = html;
}

async function renderTokenDetailWithData(ctx, data) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    debug(data);
    let html = template(path.join(__dirname, '../views/setting/token-detail'), data);
    ctx.body = html;
}
