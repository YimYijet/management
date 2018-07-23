import test from '../../controllers/test';
import * as Router from 'koa-router';

const router = new Router();

export default router
    .get('/user', test.getUserList)

    .get('/addUser', test.addUser);
