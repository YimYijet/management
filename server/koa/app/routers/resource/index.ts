import ctrl from '../../controllers/resource';
import * as Router from 'koa-router';

const router = new Router();

export default router
    .get('/resources', ctrl.getResourceList)

    .post('/resources', ctrl.addResource);
