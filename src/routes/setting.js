/**
 * Created by Bell on 16/9/7.
 */

import Router from 'koa-router';

import * as controller from '../controllers/setting';
import { ensureToken } from '../utils/token';

const base_url = '/settings';
const router = new Router({ prefix: base_url });

router
    .get('/my/', ensureToken, controller.profile)
    .post('/my/', ensureToken, controller.profileRequest)
    .get('/my/account', ensureToken, controller.account)
    .post('/my/account', ensureToken, controller.modifyPassword)
    .get('/my/tokens', ensureToken, controller.tokens)
    .get('/my/tokens/new', ensureToken, controller.createToken)
    .post('/my/tokens/new', ensureToken, controller.createTokenRequest)
    .get('/my/tokens/:id', ensureToken, controller.tokenDetail);

export default {
    baseUrl: base_url,
    router: router
};
