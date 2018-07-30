import * as Router from 'koa-router';
import * as mount from 'koa-mount';
const router = new Router();

// 用户模块路由
import user from './user';
router.use(mount('/', user.routes()));

// 角色模块路由
import role from './role';
router.use(mount('/', role.routes()));

// 资源模块路由
import resource from './resource';
router.use(mount('/', resource.routes()));

export default router;