/**
 * Created by Bell on 16/9/23.
 */

import Router from 'koa-router';

import * as controller from '../controllers/admin';
import { ensureToken } from '../tools/token';

const base_url = '/admin';
const router = new Router({ prefix: base_url });

router
    .get('/', ensureToken, controller.listUsers)
    .get('/user', ensureToken, controller.listUsers)
    .get('/users/:id/modify-password', ensureToken, controller.modifyPassword)
    .post('/users/:id/modify-password', ensureToken, controller.modifyPasswordRequest)
    .get('/permission', ensureToken, controller.permission)
    .post('/permission', ensureToken, controller.permissionRequest)
    .get('/project', ensureToken, controller.listProjects);

export default {
    baseUrl: base_url,
    router: router
};
