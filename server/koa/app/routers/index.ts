import * as Router from 'koa-router';
import * as mount from 'koa-mount';
const router = new Router();

// 测试模块路由
import test from './test';
router.use(mount('/', test.routes()));

export default router;