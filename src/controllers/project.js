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

import * as render_data from '../tools/data';

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
        headers: {
            contentType: 'application/json',
            Authorization: bearerToken,
            Accept: config.accept
        },
        json: true,
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
    let data = {};
    const project_id = ctx.params.id;
    data.id = project_id;

    // project versions
    const version_object = await getProjectVewsions(ctx);
    if (version_object) {
        data.project_versions = version_object.versions;
    }

    // project menu
    data.project_menu = {
        id: project_id
    };

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
    const project_id = ctx.params.id;
    let data = {};
    const bearerToken = token.bearerToken(ctx);

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
            setInfoWithData(ctx, data, project_id);
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
            setInfoWithData(ctx, data, project_id);
            return;
        } else {
            data.error = 'Get project detail failed';
            setInfoWithData(ctx, data, project_id);
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
            setInfoWithData(ctx, data, project_id);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode === 200) {
            data.patches = JSON.parse(body);
        } else if (statusCode === 401) {
            ctx.redirect('/login');
            return;
        } else if (statusCode === 422) {
            data.error = body.message;
            setInfoWithData(ctx, data, project_id);
            return;
        } else {
            data.error = 'Get patches failed';
            setInfoWithData(ctx, data, project_id);
            return;
        }
    }

    setInfoWithData(ctx, data, project_id);
}

export async function setInfoRequest(ctx, next) {
    const project_id = ctx.params.id;
    const bearerToken = token.bearerToken(ctx);
    const request_body = ctx.request.body;
    let data = {
        content: request_body
    };
    debug(data);

    const options = {
        url: url.resolve(config.api_address, '/projects/' + project_id),
        headers: {
            contentType: 'application/json',
            Authorization: bearerToken,
            Accept: config.accept
        },
        json: true,
        body: request_body
    };
    let response = null;
    try {
        response = await request.postAsync(options);
    } catch (err) {
        data.error = 'Update project info failed';
        setInfoWithData(ctx, data, project_id);
        return;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode >= 200 && statusCode < 300) {
        ctx.redirect('/projects/' + project_id);
    } else if (statusCode === 401) {
        ctx.redirect('/login');
        return;
    } else if (statusCode === 422) {
        if (body.field = 'name') {
            data.name_error = body.message;
            data.name_autofocus = 'autofocus';
            setInfoWithData(ctx, data, project_id);
            return;
        } else {
            data.error = body.message;
            setInfoWithData(ctx, data, project_id);
            return;
        }
    } else {
        data.error = 'Update project info failed';
        setInfoWithData(ctx, data, project_id);
        return;
    }
}

export async function setMembers(ctx, next) {
    const project_id = ctx.params.id;
    return renderSettingMembers(ctx, null, project_id);
}

export async function addMemberRequest(ctx, next) {
    const project_id = ctx.params.id;
    const bearerToken = token.bearerToken(ctx);

    const request_body = ctx.request.body;
    debug(request_body);

    let data = {};

    // add member
    data.add_member = request_body;
    {
        const options = {
            url: url.resolve(config.api_address, '/projects/' + project_id + '/members'),
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
            data.add_error = 'Add member failed';
            data.add_email_autofocus = 'autofocus';
            return renderSettingMembers(ctx, data, project_id);
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode >= 200 && statusCode < 300) {
            return renderSettingMembers(ctx, data, project_id);
        } else if (statusCode == 401) {
            ctx.redirect('/login');
            return;
        } else if (statusCode == 422) {
            data.add_error = body.message
            data.add_email_autofocus = 'autofocus';
            return renderSettingMembers(ctx, data, project_id);
        } else {
            data.add_error = 'Add member failed';
            data.add_email_autofocus = 'autofocus';
            return renderSettingMembers(ctx, data, project_id);
        }
    }
}

export async function deleteMemberRequest(ctx, next) {
    const project_id = ctx.params.id;
    const member_id = ctx.params.member_id;
    const bearerToken = token.bearerToken(ctx);

    let data = {};

    // delete member
    {
        const options = {
            url: url.resolve(config.api_address, '/projects/' + project_id + '/members/' + member_id),
            headers: {
                Authorization: bearerToken,
                Accept: config.accept
            }
        };
        let response = null;
        try {
            response = await request.deleteAsync(options);
        } catch (err) {
            data.error = 'Delete member failed';
            return renderSettingMembers(ctx, data, project_id);
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode >= 200 && statusCode < 300) {
            return renderSettingMembers(ctx, data, project_id);
        } else if (statusCode == 401) {
            ctx.redirect('/login');
            return;
        } else {
            data.error = 'Delete member failed';
            return renderSettingMembers(ctx, data, project_id);
        }
    }
}


// private request

async function renderSettingMembers(ctx, data, project_id) {
    data = data || {};
    // const project_id = ctx.params.id;
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
            setMembersWithData(ctx, data, project_id);
            return;
        }

        const statusCode = response.statusCode;
        const body = response.body;
        if (statusCode >= 200 && statusCode < 300) {
            data.detail = JSON.parse(body);
        } else if (statusCode == 401) {
            ctx.redirect('/login');
            return;
        } else {
            data.error = 'Get project detail failed';
            setMembersWithData(ctx, data, project_id);
            return;
        }
    }
    setMembersWithData(ctx, data, project_id);
}

async function getProjectVewsions(ctx) {
    const project_id = ctx.params.id;

    const bearerToken = token.bearerToken(ctx);
    const options = {
        url: url.resolve(config.api_address, '/projects/' + project_id + '/versions'),
        headers: {
            contentType: 'application/json',
            Authorization: bearerToken,
            Accept: config.accept
        }
    };
    let response = null;
    try {
        response = await request.getAsync(options);
    } catch (err) {
        return null;
    }

    const statusCode = response.statusCode;
    const body = response.body;
    if (statusCode >= 200 && statusCode < 300) {
        return JSON.parse(body);
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    }
    return null;
}

// private render

function listWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);

    let html = template(path.join(__dirname, '../views/project/list'), data);
    ctx.body = html;
}

function createWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);
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
    data.main_menu = render_data.mainMenuData(ctx);
    let html = template(path.join(__dirname, '../views/project/detail'), data);
    ctx.body = html;
}

function createPatchWithData(ctx, data) {
    data.main_menu = render_data.mainMenuData(ctx);
    data.config_env = process.env.NODE_ENV || 'default';
    debug(data);
    let html = template(path.join(__dirname, '../views/project/new-patch'), data);
    ctx.body = html;
}

function setInfoWithData(ctx, data, project_id) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    // project menu
    data.project_menu = {
        id: project_id
    };

    // project set menu
    data.project_set_menu = {
        id: project_id
    };

    debug(data);
    let html = template(path.join(__dirname, '../views/project/set-info'), data);
    ctx.body = html;
}

function setMembersWithData(ctx, data, project_id) {
    // main menu
    data.main_menu = render_data.mainMenuData(ctx);

    // project menu
    data.project_menu = {
        id: project_id
    };

    // project set menu
    data.project_set_menu = {
        id: project_id
    };

    // web config env
    data.config_env = process.env.NODE_ENV || 'default';

    debug(data);
    let html = template(path.join(__dirname, '../views/project/set-members'), data);
    ctx.body = html;
}


