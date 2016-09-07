/**
 * Created by Bell on 16/8/31.
 */

import Router from 'koa-router';

import * as controller from '../controllers/project';
import { ensureToken } from '../utils/token';

const base_url = '/projects';
const router = new Router({ prefix: base_url });

router
    .get('/', ensureToken, controller.list)
    .post('/', ensureToken, controller.createRequest)
    .get('/new', ensureToken, controller.create)
    .get('/:id', ensureToken, controller.detail)
    .get('/:id/patches/new', ensureToken, controller.createPatch)
    .post('/:id/patches/new', ensureToken, controller.createPatchRequest)
    .get('/:id/info', ensureToken, controller.setInfo)
    .post('/:id/info', ensureToken, controller.setInfoRequest)
    .get('/:id/members', ensureToken, controller.setMembers)
    .post('/:id/members', ensureToken, controller.addMemberRequest)
    .delete('/:id/members/:member_id', ensureToken, controller.deleteMemberRequest);

export default {
    baseUrl: base_url,
    router: router
};
