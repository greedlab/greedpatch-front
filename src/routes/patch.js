/**
 * Created by Bell on 16/8/31.
 */

import Router from 'koa-router';

import * as controller from '../controllers/patch';
import { ensureToken } from '../tools/token';

const base_url = '/patches';
const router = new Router({ prefix: base_url });

router
    .get('/', controller.list)
    .get('/:id', controller.detail)
    .get('/new', ensureToken, controller.newProject)
    .post('/new', ensureToken, controller.newProjectRequest);

export default {
    baseUrl: base_url,
    router: router
};
