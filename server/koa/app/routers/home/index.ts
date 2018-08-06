import ctrl from '../../controllers/home'
import * as Router from 'koa-router'

const router = new Router()

router.all('/', ctrl.home)

export default router