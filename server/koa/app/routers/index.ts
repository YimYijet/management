import * as Router from 'koa-router';
const router = new Router();

// 测试模块路由
import test from './test';
router.use('', test.routes());

export default router;