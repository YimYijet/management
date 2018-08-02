import ctrl from '../../controllers/resource';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', ctrl.getResourceList);

router.post('/', ctrl.addResource);

router.get('/:id', ctrl.getResourceById);

router.delete('/:id', ctrl.deleteResource);

router.put('/:id', ctrl.updateResource);

export default router;