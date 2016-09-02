/**
 * Created by Bell on 16/8/29.
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

export async function list(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);
    const options = {
        url: url.resolve(config.api_address, '/projects/my'),
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
        listWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200) {
        data.projects = JSON.parse(body);
        listWithData(ctx, data);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else {
        data.error = 'List projects failed';
        listWithData(ctx, data);
    }
}

export async function detail(ctx, next) {
    const project_id = ctx.params.id;
    let data = {};
    const bearerToken = token.bearerToken(ctx);

    // project menu
    data.project_menu = {
        id: project_id
    };

    // project detail
    {
        const options = {
            url: url.resolve(config.api_address, '/projects/' + project_id),
            headers: {
                Authorization: bearerToken,
                Accept: config.accept
            }
        };
        let response = null;
        try {
            response = await request.getAsync(options);
        } catch (err) {
            data.error = 'Get project detail failed';
            detailWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode == 200) {
            data.detail = JSON.parse(body);
        } else if (statusCode == 401) {
            ctx.redirect('/login');
            return;
        } else {
            data.error = 'Get project detail failed';
            detailWithData(ctx, data);
            return;
        }
    }

    // patches list
    {
        const options = {
            url: url.resolve(config.api_address, '/projects/' + project_id + '/patches'),
            headers: {
                Authorization: bearerToken,
                Accept: config.accept
            }
        };
        let response = null;
        try {
            response = await request.getAsync(options);
        } catch (err) {
            data.error = 'Get patches failed';
            detailWithData(ctx, data);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode == 200) {
            data.patches = JSON.parse(body);
        } else if (statusCode == 401) {
            ctx.redirect('/login');
            return;
        } else {
            data.error = 'Get patches failed';
            detailWithData(ctx, data);
            return;
        }
    }

    detailWithData(ctx, data);
}

export async function create(ctx, next) {
    const data = {
        name_autofocus: 'autofocus'
    };
    createWithData(ctx, data);
}

export async function createRequest(ctx, next) {
    const bearerToken = token.bearerToken(ctx);

    let data = ctx.request.body;
    debug(data);
    const options = {
        url: url.resolve(config.api_address, '/projects'),
        json: true,
        headers: {
            contentType: 'application/json',
            Authorization: bearerToken,
            Accept: config.accept
        },
        body: data
    };
    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Create project failed';
        createWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200 || statusCode == 201) {
        ctx.redirect('/projects/' + body._id);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else {
        if (statusCode == 422) {
            if (body && body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'name') {
                    data.name_autofocus = 'autofocus';
                    data.name_error = body.message;
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
        } else {
            data.error = 'Create project failed';
        }
        createWithData(ctx, data);
    }
}

export async function createPatch(ctx, next) {
    const project_id = ctx.params.id;
    let data = {};

    // project menu
    data.project_menu = {
        id: project_id
    };

    // project versions
    let project_versions = ['1.0', '1.1'];
    data.project_versions = project_versions;
    data.project_versions_size = Math.min(5, project_versions.length);

    data.id = project_id;
    createPatchWithData(ctx, data);
}

export async function createPatchRequest(ctx, next) {
    const project_id = ctx.params.id;
    const bearerToken = token.bearerToken(ctx);
    let data = ctx.request.body;
    debug(data);
    const options = {
        url: url.resolve(config.api_address, '/projects/' + project_id + '/patches'),
        json: true,
        headers: {
            contentType: config.content_type,
            Authorization: bearerToken,
            Accept: config.accept
        },
        body: data
    };
    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Create patch failed';
        createPatchWithData(ctx, data);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode == 200 || statusCode == 201) {
        ctx.redirect('/projects/' + project_id);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else {
        if (statusCode == 422) {
            if (body && body.errors && body.errors.length > 0) {
                const error = body.errors[0];
                if (error.field == 'project_version') {
                    data.project_version_autofocus = 'autofocus';
                    data.project_version_error = body.message;
                } else if (error.field == 'patch_version') {
                    data.patch_version_autofocus = 'autofocus';
                    data.patch_version_error = body.message;
                } else if (error.field == 'hash') {
                    data.hash_autofocus = 'autofocus';
                    data.hash_error = body.message;
                } else if (error.field == 'patch_url') {
                    data.patch_url_autofocus = 'autofocus';
                    data.patch_url_error = body.message;
                } else {
                    data.error = body.message;
                }
            } else {
                data.error = body.message;
            }
        } else {
            data.error = 'Create patch failed';
        }
        createWithData(ctx, data);
    }

    // project menu
    data.project_menu = {
        id: project_id
    };

    data.id = project_id;
    createPatchWithData(ctx, data);
}

export async function setInfo(ctx, next) {

}

export async function setInfoRequest(ctx, next) {

}

export async function setMembers(ctx, next) {

}

export async function addMemberRequest(ctx, next) {

}

function listWithData(ctx, data) {
    const role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    let html = template(path.join(__dirname, '../views/project/list'), data);
    ctx.body = html;
}

function createWithData(ctx, data) {
    const role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    let html = template(path.join(__dirname, '../views/project/new'), data);
    ctx.body = html;
}

/**
 * render project detail
 *
 * @param ctx
 * @param detail {object}
 * @param projects {array}
 * @param error {string}
 */
function detailWithData(ctx, data) {
    debug(data);
    const role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    let html = template(path.join(__dirname, '../views/project/detail'), data);
    ctx.body = html;
}

function createPatchWithData(ctx, data) {
    const role = cookie.getRole(ctx);
    if (role === 1) {
        data.main_menu = {
            admin: 1
        };
    }
    let html = template(path.join(__dirname, '../views/project/new-patch'), data);
    ctx.body = html;
}
