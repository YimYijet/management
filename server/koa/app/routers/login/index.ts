import ctrl from '../../controllers/login';
import * as Router from 'koa-router';

const router = new Router();

router.post('/login', ctrl.login);

router.post('/logout', ctrl.logout);
export default router;