import * as jwt from 'jsonwebtoken'
import { Context } from 'koa'
import aclInstance from '../../../lib/acl'
import * as util from '../../../lib/util'
import { IUser } from '../../models/user'
import roleService from '../../services/role'
import userService from '../../services/user'

class LoginController {
    // 登录
    public static async login(ctx: Context): Promise<void> {
        try {
            const query: any = ctx.request.body
            query.password = util.encrypt(query.password)
            const user: IUser = await userService.findOne(query)
            if (user) {
                const roleId: string = await aclInstance.getAcl().userRoles(user.id)
                const [roles, resources] = await Promise.all([
                        roleService.findById(roleId),
                        aclInstance.getAcl().whatResources(roleId),
                    ]),
                    token = jwt.sign({
                        resources,
                        roles,
                        user,
                    }, util.getSecret())
                ctx.session.token = token
                ctx.body = {
                    code: 200,
                    content: {
                        token,
                        userId: user.id,
                    },
                    message: '请求成功',
                }
            } else {
                ctx.body = {
                    code: 401,
                    content: {},
                    message: '没有权限',
                }
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 400,
                content: {},
                message: '错误请求',
            }
        }
    }
    // 登出
    public static async logout(ctx: Context): Promise<void> {
        try {
            delete ctx.session.token
            ctx.body = {
                code: 200,
                content: {},
                message: '请求成功',
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 500,
                content: {},
                message: '服务器错误',
            }
        }
    }
}

export default LoginController
