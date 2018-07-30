import ctrl from '../../controllers/role';
import * as Router from 'koa-router';

const router = new Router();

export default router
    .get('/roles', ctrl.getRoleList)

    .post('/roles', ctrl.addRole);
