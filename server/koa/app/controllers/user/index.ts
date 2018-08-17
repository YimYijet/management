import { Context } from 'koa'
import * as util from '../../../lib/util'
import aclInstance from '../../../lib/acl'
import { IUser } from '../../models/user'
import service from '../../services/user'
import { IRole } from '../../models/role'
import roleService from '../../services/role'

type strings = string | string[]
type Value = string | number
type Values = Value | Value[]

class UserController {
    // 获取全部用户列表
    static async getUserList(ctx: Context): Promise<void> {
        try {
            const userList: Array<IUser> = await service.find()
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: userList
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: []
            }
        }
    }
    // 添加用户
    static async addUser(ctx: Context): Promise<void> {
        try {
            const item: IUser = <IUser>ctx.request.body,
                user: IUser = await service.findOne({ account: item.account })
            if (!user) {
                item.password = util.encrypt(item.password)
                const user = await service.create(item)
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: user
                }
            } else {
                ctx.body = {
                    code: 400,
                    message: '用户已存在',
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
    // 删除用户
    static async deleteUser(ctx: Context): Promise<void> {
        try {
            const result: any = await service.remove({ id: ctx.params.id })
            if (result.ok) {
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: {}
                }
            } else {
                ctx.body = {
                    code: 400,
                    message: '错误请求',
                    content: {}
                }
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
    // 更新用户
    static async updateUser(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id,
                item: any = ctx.request.body
            delete item.account
            if (item.password) {
                item.password = util.encrypt(item.password)
            }
            const user = await service.update({ _id: userId }, item)
            if (user) {
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: user
                }
            } else {
                ctx.body = {
                    code: 400,
                    message: '错误请求',
                    content: {}
                }
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
    // 查询用户
    static async getUserById(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id,
                user: IUser = await service.findById(userId)
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: user || {}
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
    // 绑定角色
    static async bindRole(ctx: Context): Promise<void> {
        const userId: Value = <Value>ctx.params.id,
            roles: strings = <strings>ctx.request.body,
            user: IUser = await service.findById(userId)
        if (user) {
            await aclInstance.getAcl().addUserRoles(userId, roles)
        }
    }
}
export default UserController