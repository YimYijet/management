import { Context } from 'koa'
import aclInstance from '../../../lib/acl'
import * as util from '../../../lib/util'
import { IResource } from '../../models/resource'
import { IUser } from '../../models/user'
import ResourceService from '../../services/resource'
import service from '../../services/user'

type strings = string | string[]
type Value = string | number
type Values = Value | Value[]
type resources = object | any

class UserController {
    // 获取全部用户列表
    public static async getUserList(ctx: Context): Promise<void> {
        try {
            const userList: IUser[] = await service.find()
            ctx.body = {
                code: 200,
                content: userList,
                message: '请求成功',
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 500,
                content: [],
                message: '服务器错误',
            }
        }
    }
    // 添加用户
    public static async addUser(ctx: Context): Promise<void> {
        try {
            const item: IUser = ctx.request.body as IUser,
                user: IUser = await service.findOne({ account: item.account })
            if (!user) {
                item.password = util.encrypt(item.password)
                const newUser = await service.create(item)
                ctx.body = {
                    code: 200,
                    content: newUser,
                    message: '请求成功',
                }
            } else {
                ctx.body = {
                    code: 400,
                    content: {},
                    message: '用户已存在',
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
    // 删除用户
    public static async deleteUser(ctx: Context): Promise<void> {
        try {
            const result: any = await service.remove({ _id: ctx.params.id })
            if (result.ok) {
                ctx.body = {
                    code: 200,
                    content: {},
                    message: '请求成功',
                }
            } else {
                ctx.body = {
                    code: 400,
                    content: {},
                    message: '错误请求',
                }
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
    // 更新用户
    public static async updateUser(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id as string,
                item: any = ctx.request.body
            delete item.account
            if (item.password) {
                item.password = util.encrypt(item.password)
            }
            const user = await service.update({ _id: userId }, item)
            if (user) {
                ctx.body = {
                    code: 200,
                    content: user,
                    message: '请求成功',
                }
            } else {
                ctx.body = {
                    code: 400,
                    content: {},
                    message: '错误请求',
                }
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
    // 查询用户
    public static async getUserById(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id as string,
                user: IUser = await service.findById(userId)
            ctx.body = {
                code: 200,
                content: user || {},
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
    // 绑定角色
    public static async bindRoles(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id as string,
                roles: strings = ctx.request.body as strings,
                userRoles: strings = await aclInstance.getAcl().userRoles(userId)
            if (userRoles.length) {
                await aclInstance.getAcl().removeUserRoles(userId, userRoles)
            }
            await aclInstance.getAcl().addUserRoles(userId, roles)
            ctx.body = {
                code: 200,
                content: roles,
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
    // 查询角色
    public static async getRoles(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id as string,
                roles: strings = await aclInstance.getAcl().userRoles(userId)
            ctx.body = {
                code: 200,
                content: roles,
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
    // 查询资源
    public static async getResources(ctx: Context): Promise<void> {
        try {
            const userId: string = ctx.params.id as string,
                resourceList: IResource[] = await ResourceService.find(),
                allResources: strings = []
            resourceList.forEach((item) => {
                allResources.push(item.name)
            })
            const resouces: resources = await aclInstance.getAcl().allowedPermissions(userId, allResources)
            ctx.body = {
                code: 200,
                content: resouces,
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
export default UserController
