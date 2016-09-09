/**
 * Created by Bell on 16/9/7.
 */

import Router from 'koa-router';

import { ensureToken } from '../utils/token';

import * as controller from '../controllers/setting';

const base_url = '/settings';
const router = new Router({ prefix: base_url });

router
    .get('/', ensureToken, controller.profile)
    .get('/my/profile', ensureToken, controller.profile)
    .get('/my/account', ensureToken, controller.account)
    .post('/my/account', ensureToken, controller.modifyPassword)
    .get('/my/tokens', ensureToken, controller.tokens)
    .get('/my/tokens/new', ensureToken, controller.generateToken)
    .post('/my/tokens/new', ensureToken, controller.generateTokenRequest)
    .get('/my/tokens/:id', ensureToken, controller.tokenDetail)
    .post('/my/tokens/:id', ensureToken, controller.tokenDetailRequest);

export default {
    baseUrl: base_url,
    router: router
};
