/**
 * Created by Bell on 16/8/16.
 */

import Router from 'koa-router';

import * as controller from '../controllers/book';
import { ensureToken } from '../utils/token';

const base_url = '/book';
const router = new Router({ prefix: base_url });

router
    .get('/list', controller.list)
    .get('/detail', controller.detail)
    .get('/add', ensureToken, controller.add)
    .post('/add', ensureToken, controller.addRequest);

export default {
    baseUrl: base_url,
    router: router
};
