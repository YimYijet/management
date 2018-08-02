import * as Router from 'koa-router';
const router = new Router();

// 登录模块
import login from './login';
router.use('', login.routes());

// 用户模块路由
import user from './user';
router.use('/users', user.routes());

// 角色模块路由
import role from './role';
router.use('/roles', role.routes());

// 资源模块路由
import resource from './resource';
router.use('/resources', resource.routes());

export default router;