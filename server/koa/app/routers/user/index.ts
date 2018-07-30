import ctrl from '../../controllers/user';
import * as Router from 'koa-router';

const router = new Router();

router.get('/users', ctrl.getUserList);

router.post('/users', ctrl.addUser);

router.post('/users/:id/roles', ctrl.bindRole);

export default router;
