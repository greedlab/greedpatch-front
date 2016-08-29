/**
 * Created by Bell on 16/8/16.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';
import { getToken, bearerToken } from '../utils/token';
import config from '../config';
import Debug from 'debug';
import pkg from '../../package.json';

const debug = new Debug(pkg.name);
const request = bluebird.promisifyAll(Request);

export async function list(ctx, next) {
    const token = getToken(ctx);
    debug('token: ', token);
    const logined = token && token.length > 0;

    const requestUrl = url.resolve(config.apiDomain, '/book/list');
    debug(requestUrl);
    const response = await request.getAsync(requestUrl);
    debug(response.body);

    let data = JSON.parse(response.body);
    data.title = 'Books';
    data.logined = logined;

    var html = template(path.join(__dirname, '../views/book/list'), data);
    ctx.body = html;
}

export async function detail(ctx, next) {
    debug(ctx.querystring);
    const options = {
        url: url.resolve(config.apiDomain, '/book/detail?' + ctx.querystring)
    };
    const response = await request.getAsync(options);
    debug(response.body);
    let data = JSON.parse(response.body);
    data.title = 'Book Detail';
    var html = template(path.join(__dirname, '../views/book/detail'), data);
    ctx.body = html;
}

export async function add(ctx, next) {
    addWithMessage(ctx,next,null);
}

export async function addRequest(ctx, next) {
    debug(ctx.request.body);
    const token = getToken(ctx);

    const name = ctx.request.body.name;
    if (!name || name.length == 0) {
        addWithMessage(ctx,next,'name is empty');
        return;
    }
    const price = ctx.request.body.price;
    const theBearerToken = bearerToken(token);
    const options = {
        url: url.resolve(config.apiDomain, '/book/add/'),
        json: true,
        headers: {
            contentType: 'application/json',
            Authorization: theBearerToken
        },
        body: {
            name: name,
            price: price
        }
    };
    const response = await request.postAsync(options);
    if (response.statusCode == 200) {
        ctx.redirect('/book/list');
    } else {
        addWithMessage(ctx,next,response.message || "Add book failed");
    }
}

async function addWithMessage(ctx, next,message) {
    let data = {
        title: 'Add Book',
        error: message
    };
    var html = template(path.join(__dirname, '../views/book/add'), data);
    ctx.body = html;
}
