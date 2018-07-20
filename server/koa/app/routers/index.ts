import * as Router from 'koa-router';
const router = new Router();

// 测试模块路由
import test from '../modules/test/controllers';
test(router);

export default router;