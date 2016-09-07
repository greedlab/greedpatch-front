/**
 * Created by Bell on 16/9/7.
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

export async function profile(ctx, next) {
    let data = {};
    const bearerToken = token.bearerToken(ctx);

    // user profile
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
            data.error = 'Get project detail failed';
            settingProfileWithData(ctx, data);
            return;
        }
    }
    settingProfileWithData(ctx, data);
}

export async function profileRequest(ctx, next) {

}

export async function account(ctx, next) {

}

export async function modifyPassword(ctx, next) {

}

export async function tokens(ctx, next) {

}

export async function createToken(ctx, next) {

}

export async function createTokenRequest(ctx, next) {

}

export async function tokenDetail(ctx, next) {

}

// render

async function settingProfileWithData(ctx, data) {

}