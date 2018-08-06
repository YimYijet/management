import ctrl from '../../controllers/user'
import * as Router from 'koa-router'

const router = new Router()

router.get('/', ctrl.getUserList)

router.post('/', ctrl.addUser)

router.get('/:id', ctrl.getUserById)

router.delete('/:id', ctrl.deleteUser)

router.put('/:id', ctrl.updateUser)

router.post('/:id/roles', ctrl.bindRole)

export default router
