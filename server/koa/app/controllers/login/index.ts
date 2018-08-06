import { Context } from 'koa'
import * as util from '../../../lib/util'
import { IUser } from '../../models/user'
import userService from '../../services/user'
import aclInstance from '../../../lib/acl'

class LoginController {
    // 登录
    async login(ctx: Context): Promise<void> {
        try {
            const query: any = ctx.request.body
            query.password = util.encrypt(query.password)
            const user: IUser = await userService.findOne(query)
            if (user) {
                ctx.session.roles = await aclInstance.getAcl().userRoles()
                ctx.session.curUserId = user.id
                ctx.session.curUser = user
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: user
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
    async logout(ctx: Context): Promise<void> {
        try {
            delete ctx.session.curUser
            delete ctx.session.curUserId
            delete ctx.session.roles
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

export default new LoginController()