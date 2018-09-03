import * as Router from 'koa-router'
import ctrl from '../../controllers/home'

const router = new Router()

router.all('/', ctrl.home)

export default router
