import * as Router from 'koa-router'
import ctrl from '../../controllers/oauth'

const router = new Router()

router.all('/token', ctrl.token)

export default router
