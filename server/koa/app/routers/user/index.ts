import test from '../../controllers/user';
import * as Router from 'koa-router';

const router = new Router();

export default router
    .get('/users', test.getUserList)

    .post('/users', test.addUser);
