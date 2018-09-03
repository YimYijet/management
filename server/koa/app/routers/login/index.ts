import * as Router from 'koa-router'
import ctrl from '../../controllers/login'

const router = new Router()

router.post('/login', ctrl.login)

router.post('/logout', ctrl.logout)

export default router
