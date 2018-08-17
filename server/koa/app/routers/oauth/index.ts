import ctrl from '../../controllers/oauth'
import * as Router from 'koa-router'

const router = new Router()

router.all('/token', ctrl.token)

export default router