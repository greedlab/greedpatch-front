
import koa from 'koa';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';

import config from '../config';

import home from '../routes/home';
import book from '../routes/book';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const app = new koa();

app.keys = config.cookie_keys;

// logger

app.use(logger());

// bodyParser

app.use(bodyParser());

// favicon

app.use(favicon(path.join(__dirname,'../assets/favicon.ico')));

// static

app.use(serve(path.join(__dirname,'../assets')));

// router

app
    .use(home.router.routes())
    .use(home.router.allowedMethods());

app.use(async (ctx, next) => {
    debug(ctx.request);
    return next();
});

// listen

app.listen(config.port);
