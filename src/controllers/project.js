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
        listWithData(ctx, JSON.parse(body));
    } else if (statusCode == 401) {
        ctx.redirect('/login');
    } else {
        data.error = 'List projects failed';
        listWithData(ctx, data);
    }
}

export async function detail(ctx, next) {

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

}

export async function createPatchRequest(ctx, next) {

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
    let html = template(path.join(__dirname, '../views/project/list'), data);
    ctx.body = html;
}

function createWithData(ctx, data) {
    let html = template(path.join(__dirname, '../views/project/new'), data);
    ctx.body = html;
}

function createWithData(ctx, data) {
    let html = template(path.join(__dirname, '../views/project/new'), data);
    ctx.body = html;
}
