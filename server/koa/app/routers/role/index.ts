import ctrl from '../../controllers/role';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', ctrl.getRoleList);

router.post('/', ctrl.addRole);

export default router;