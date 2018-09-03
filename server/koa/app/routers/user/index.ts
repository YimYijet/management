import * as Router from 'koa-router'
import ctrl from '../../controllers/user'

const router = new Router()

router.get('/', ctrl.getUserList)

router.post('/', ctrl.addUser)

router.get('/:id', ctrl.getUserById)

router.delete('/:id', ctrl.deleteUser)

router.put('/:id', ctrl.updateUser)

router.post('/:id/roles', ctrl.bindRoles)

router.get('/:id/roles', ctrl.getRoles)

router.get('/:id/resources', ctrl.getResources)

export default router
