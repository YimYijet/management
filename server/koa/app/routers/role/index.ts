import * as Router from 'koa-router'
import ctrl from '../../controllers/role'

const router = new Router()

router.get('/', ctrl.getRoleList)

router.post('/', ctrl.addRole)

router.get('/:id', ctrl.getRoleById)

router.delete('/:id', ctrl.deleteRole)

router.put('/:id', ctrl.updateRole)

router.post('/:id/resources', ctrl.bindResources)

router.get('/:id/resources', ctrl.getResources)

export default router
