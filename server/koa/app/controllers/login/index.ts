import { Context } from 'koa'
import * as jwt from 'jsonwebtoken'
import * as util from '../../../lib/util'
import { IUser } from '../../models/user'
import userService from '../../services/user'
import roleService from '../../services/role'
import aclInstance from '../../../lib/acl'

class LoginController {
    // 登录
    static async login(ctx: Context): Promise<void> {
        try {
            const query: any = ctx.request.body
            query.password = util.encrypt(query.password)
            const user: IUser = await userService.findOne(query)
            if (user) {
                const roleId: string = await aclInstance.getAcl().userRoles(user.id)
                const [role, resources] = await Promise.all([
                        roleService.findById(roleId),
                        aclInstance.getAcl().whatResources(roleId)
                    ]),
                    token = jwt.sign({
                        user: user,
                        roles: role,
                        resources: resources
                    }, util.getSecret())
                ctx.session.token = token
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: {
                        token: token,
                        userId: user.id
                    }
                }
            } else {
                ctx.body = {
                    code: 401,
                    message: '没有权限',
                    content: {}
                }
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 400,
                message: '错误请求',
                content: {}
            }
        }
    }
    // 登出
    static async logout(ctx: Context): Promise<void> {
        try {
            delete ctx.session.token
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: {}
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: {}
            }
        }
    }
}

export default LoginController