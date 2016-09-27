/**
 * Created by Bell on 16/9/23.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';

import config from '../config';
import * as token from '../tools/token';

import * as render_data from '../tools/data';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const request = bluebird.promisifyAll(Request);

export async function listUsers(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);
    const options = {
        url: url.resolve(config.api_address, '/users'),
        headers: {
            Authorization: bearerToken,
            Accept: config.accept
        }
    };
    let response = null;
    try {
        response = await request.getAsync(options);
    } catch (err) {
        data.error = 'List users failed';
        listUsersWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200) {
        data.users = JSON.parse(body);
        listUsersWithData(ctx, data);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else if (statusCode == 403) {
        data.error = 'No permission';
        listUsersWithData(ctx, data);
    } else {
        data.error = 'List users failed';
        listUsersWithData(ctx, data);
    }
}

export async function modifyPassword(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);
    const id = ctx.params.id;
    const options = {
        url: url.resolve(config.api_address, '/users/' + id + '/profile'),
        headers: {
            Authorization: bearerToken,
            Accept: config.accept
        }
    };
    let response = null;
    try {
        response = await request.getAsync(options);
    } catch (err) {
        data.error = 'Get user\'s profile failed';
        modifyPasswordWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200) {
        data.user = JSON.parse(body);
        modifyPasswordWithData(ctx, data);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else if (statusCode == 403) {
        data.error = 'No permission';
        modifyPasswordWithData(ctx, data);
    } else if (statusCode == 422) {
        data.error = body.message;
        modifyPasswordWithData(ctx, data);
    } else {
        data.error = 'Get user\'s profile failed';
        modifyPasswordWithData(ctx, data);
    }
}

export async function modifyPasswordRequest(ctx, next) {
    let data = {};
    const id = ctx.params.id;
    let user = {};
    data.user = user;
    user._id = id;

    const request_body = ctx.request.body;
    if (!request_body) {
        data.error = 'Update user\'s password failed';
        modifyPasswordWithData(ctx, data);
        return;
    }

    const email = request_body.email;
    if (!email) {
        data.error = 'Email is empty';
        modifyPasswordWithData(ctx, data);
        return;
    }
    user.email = email;

    const password = request_body.password;
    if (!password) {
        data.error = 'Password is empty';
        modifyPasswordWithData(ctx, data);
        return;
    }
    user.password = password;

    const bearerToken = token.bearerToken(ctx);

    const options = {
        url: url.resolve(config.api_address, '/users/' + id + '/password'),
        headers: {
            Authorization: bearerToken,
            Accept: config.accept
        }
    };
    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Update user\'s password failed';
        modifyPasswordWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode >= 200 || statusCode < 300) {
        ctx.redirect('/admin/user');
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else if (statusCode == 403) {
        data.error = 'No permission';
        modifyPasswordWithData(ctx, data);
    } else if (statusCode == 422) {
        data.error = body.message;
        modifyPasswordWithData(ctx, data);
    } else {
        data.error = 'Update user\'s password failed';
        modifyPasswordWithData(ctx, data);
    }
}

export async function permission(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);
    const options = {
        url: url.resolve(config.api_address, '/permissions/0'),
        headers: {
            Authorization: bearerToken,
            Accept: config.accept
        }
    };
    let response = null;
    try {
        response = await request.getAsync(options);
    } catch (err) {
        data.error = 'Get permission failed';
        permissionWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200) {
        data.permission = JSON.parse(body) || {};
        permissionWithData(ctx, data);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else if (statusCode == 403) {
        data.error = 'No permission';
        permissionWithData(ctx, data);
    } else {
        data.error = 'Get permission failed';
        permissionWithData(ctx, data);
    }
}

export async function permissionRequest(ctx, next) {
    const request_body = ctx.request.body;
    debug(request_body);
    let data = {};
    data.permission = request_body;
    const bearerToken = token.bearerToken(ctx);
    const options = {
        url: url.resolve(config.api_address, '/permissions/0'),
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
        response = await request.putAsync(options);
    } catch (err) {
        data.error = 'Update permission failed';
        permissionWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode >= 200 && statusCode < 300) {
        ctx.redirect('/admin/permission');
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else if (statusCode == 403) {
        data.error = 'No permission';
        permissionWithData(ctx, data);
    } else {
        data.error = 'Update permission failed';
        permissionWithData(ctx, data);
    }
}

export async function listProjects(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);
    const options = {
        url: url.resolve(config.api_address, '/projects'),
        headers: {
            Authorization: bearerToken,
            Accept: config.accept
        }
    };
    let response = null;
    try {
        response = await request.getAsync(options);
    } catch (err) {
        data.error = 'List projects failed';
        listProjectsWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200) {
        data.projects = JSON.parse(body);
        listProjectsWithData(ctx, data);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else if (statusCode == 403) {
        data.error = 'No permission';
        listProjectsWithData(ctx, data);
    } else {
        data.error = 'List projects failed';
        listProjectsWithData(ctx, data);
    }
}

// private render

function listUsersWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    // config js
    data.node_env = process.env.NODE_ENV || 'default';

    debug(data);

    let html = template(path.join(__dirname, '../views/admin/user'), data);
    ctx.body = html;
}

function permissionWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);
    debug(data);
    let html = template(path.join(__dirname, '../views/admin/permission'), data);
    ctx.body = html;
}

function listProjectsWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    // config js
    data.node_env = process.env.NODE_ENV || 'default';

    debug(data);
    let html = template(path.join(__dirname, '../views/admin/project'), data);
    ctx.body = html;
}

function modifyPasswordWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    debug(data);
    let html = template(path.join(__dirname, '../views/admin/modify-password'), data);
    ctx.body = html;
}

