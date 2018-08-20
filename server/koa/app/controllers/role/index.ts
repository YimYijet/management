import { Context } from 'koa'
import aclInstance from '../../../lib/acl'
import { IRole } from '../../models/role'
import service from '../../services/role'
import { IResource } from '../../models/resource';
import ResourceService from '../../services/resource';

type strings = string | string[]
type Value = string | number
type Values = Value | Value[]

class RoleController {
    // 获取全部角色列表
    static async getRoleList(ctx: Context): Promise<void> {
        try {
            const roleList: Array<IRole> = await service.find()
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: roleList
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
    // 添加角色
    static async addRole(ctx: Context): Promise<void> {
        try {
            const item: IRole = <IRole>ctx.request.body,
                role: IRole = await service.findOne({ name: item.name })
            if (!role) {
                const role = await service.create(item)
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: role
                }
            } else {
                ctx.body = {
                    code: 400,
                    message: '角色已存在',
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
    // 删除角色
    static async deleteRole(ctx: Context): Promise<void> {
        try {
            const result: any = await service.remove({ _id: ctx.params.id })
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
    // 更新角色
    static async updateRole(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id,
                item: any = ctx.request.body,
                role: IRole = await service.update({ _id: roleId }, item)
            if (role) {
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: role
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
    // 查询角色
    static async getRoleById(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id,
                role: IRole = await service.findById(roleId)
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: role || {}
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
    // 绑定资源
    static async bindResources(ctx: Context): Promise<void> {
        try {
            const roleId: string = <string>ctx.params.id,
                resources: strings = <strings>ctx.request.body,
                resourceList: Array<IResource> = await ResourceService.find(),
                allResources: strings = []
            resourceList.forEach(item => {
                allResources.push(item.name)
            })
            await aclInstance.getAcl().removeAllow(roleId, allResources, '*')
            await aclInstance.getAcl().allow(roleId, resources, '*')
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: resources
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
    // 查询资源
    static async getResources(ctx: Context): Promise<void> {
        try {
            const roleId: string = <string>ctx.params.id,
                resources: strings = await aclInstance.getAcl().whatResources(roleId)
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: resources
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
export default RoleController