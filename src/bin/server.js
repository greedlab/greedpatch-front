
import koa from 'koa';
// import logger from 'koa-logger';
import favicon from 'koa-favicon';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import koaBunyanLogger from 'koa-bunyan-logger';

import config from '../config';

import home from '../routes/home';
import project from '../routes/project';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const app = new koa();

app.keys = config.cookie_keys;

// bodyParser

app.use(bodyParser());

// logger

// app.use(logger());

// favicon

app.use(favicon(path.join(__dirname,'../assets/favicon.ico')));

// static

app.use(serve(path.join(__dirname,'../assets')));

// koa-bunyan-logger

app.use(koaBunyanLogger({
    name: pkg.name,
    level: 'debug'
}));
app.use(koaBunyanLogger.requestIdContext());
app.use(koaBunyanLogger.requestLogger({
    updateRequestLogFields: function (fields, err) {
        fields.body = this.request.body;
    }
}));

// router

app
    .use(home.router.routes())
    .use(home.router.allowedMethods())
    .use(project.router.routes())
    .use(project.router.allowedMethods());

// listen

app.listen(config.port);
