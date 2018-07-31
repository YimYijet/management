import ctrl from '../../controllers/resource';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', ctrl.getResourceList);

router.post('/', ctrl.addResource);

export default router;