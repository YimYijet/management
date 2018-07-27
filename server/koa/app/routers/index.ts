import * as Router from 'koa-router';
import * as mount from 'koa-mount';
const router = new Router();

// 测试模块路由
import user from './user';
router.use(mount('/', user.routes()));

export default router;