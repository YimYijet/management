import ctrl from '../../controllers/user';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', ctrl.getUserList);

router.post('/', ctrl.addUser);

router.post('/:id/roles', ctrl.bindRole);

export default router;
