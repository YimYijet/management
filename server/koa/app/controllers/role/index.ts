import { Context } from 'koa'
import aclInstance from '../../../lib/acl'
import { IResource } from '../../models/resource'
import { IRole } from '../../models/role'
import ResourceService from '../../services/resource'
import service from '../../services/role'

type strings = string | string[]
type Value = string | number
type Values = Value | Value[]

class RoleController {
    // 获取全部角色列表
    public static async getRoleList(ctx: Context): Promise<void> {
        try {
            const roleList: IRole[] = await service.find()
            ctx.body = {
                code: 200,
                content: roleList,
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
    // 添加角色
    public static async addRole(ctx: Context): Promise<void> {
        try {
            const item: IRole = ctx.request.body as IRole,
                role: IRole = await service.findOne({ name: item.name })
            if (!role) {
                const newRole = await service.create(item)
                ctx.body = {
                    code: 200,
                    content: newRole,
                    message: '请求成功',
                }
            } else {
                ctx.body = {
                    code: 400,
                    content: {},
                    message: '角色已存在',
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
    // 删除角色
    public static async deleteRole(ctx: Context): Promise<void> {
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
    // 更新角色
    public static async updateRole(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id as string,
                item: any = ctx.request.body,
                role: IRole = await service.update({ _id: roleId }, item)
            if (role) {
                ctx.body = {
                    code: 200,
                    content: role,
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
    // 查询角色
    public static async getRoleById(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id as string,
                role: IRole = await service.findById(roleId)
            ctx.body = {
                code: 200,
                content: role || {},
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
    // 绑定资源
    public static async bindResources(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id as string,
                resources: strings = ctx.request.body as strings,
                resourceList: IResource[] = await ResourceService.find(),
                allResources: strings = []
            resourceList.forEach((item) => {
                allResources.push(item.name)
            })
            await aclInstance.getAcl().removeAllow(roleId, allResources, '*')
            await aclInstance.getAcl().allow(roleId, resources, '*')
            ctx.body = {
                code: 200,
                content: resources,
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
            const roleId: string = ctx.params.id as string,
                resources: strings = await aclInstance.getAcl().whatResources(roleId)
            ctx.body = {
                code: 200,
                content: resources,
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
export default RoleController
