import ctrl from '../../controllers/role';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', ctrl.getRoleList);

router.post('/', ctrl.addRole);

router.get('/:id', ctrl.getRoleById);

router.delete('/:id', ctrl.deleteRole);

router.put('/:id', ctrl.updateRole);

export default router;