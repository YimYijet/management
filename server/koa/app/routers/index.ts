import * as mount from 'koa-mount'
import * as Router from 'koa-router'

const router = new Router()

// 主页
import home from './home'
router.use(mount('/', home.middleware()))

// 登录模块
import login from './login'
router.use(mount('/', login.middleware()))

// oauth
import oauth from './oauth'
router.use('/oauth', oauth.middleware())

// 用户模块路由
import user from './user'
router.use('/users', user.middleware())

// 角色模块路由
import role from './role'
router.use('/roles', role.middleware())

// 资源模块路由
import resource from './resource'
router.use('/resources', resource.middleware())

export default router
