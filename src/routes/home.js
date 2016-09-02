/**
 * Created by Bell on 16/8/16.
 */

import Router from 'koa-router';

import { ensureToken } from '../utils/token';
import * as project from '../controllers/project';
import * as user from '../controllers/user';

const base_url = '/';
let router = new Router();

router
    .get('/', ensureToken, project.list)
    .get('/login', user.login)
    .post('/login', user.loginRequest)
    .get('/register', user.register)
    .post('/register', user.registerRequest)
    .get('/reset-password', user.resetPassword)
    .post('/reset-password', user.resetPasswordRequest)
    .get('/set-password/:token', user.setPassword)
    .post('/set-password/:token', user.setPasswordRequest)
    .post('/logout', user.logoutRequest);

export default {
    baseUrl: base_url,
    router: router
};
