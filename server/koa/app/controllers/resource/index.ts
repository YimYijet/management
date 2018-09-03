import { Context } from 'koa'
import { IResource } from '../../models/resource'
import service from '../../services/resource'

class ResourceController {
    // 获取全部资源列表
    public static async getResourceList(ctx: Context): Promise<void> {
        try {
            const resourceList: IResource[] = await service.find()
            ctx.body = {
                code: 200,
                content: resourceList,
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
    // 添加资源
    public static async addResource(ctx: Context): Promise<void> {
        try {
            const item: IResource = ctx.request.body as IResource,
                resource: IResource = await service.findOne({ name: item.name })
            if (!resource) {
                const newResource = await service.create(item)
                ctx.body = {
                    code: 200,
                    content: newResource,
                    message: '请求成功',
                }
            } else {
                ctx.body = {
                    code: 400,
                    content: {},
                    message: '资源已存在',
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
    // 删除资源
    public static async deleteResource(ctx: Context): Promise<void> {
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
    // 更新资源
    public static async updateResource(ctx: Context): Promise<void> {
        try {
            const resourceId: string = ctx.params.id as string,
                item: any = ctx.request.body,
                resource: IResource = await service.update({ _id: resourceId }, item)
            if (resource) {
                ctx.body = {
                    code: 200,
                    content: resource,
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
    // 查询资源
    public static async getResourceById(ctx: Context): Promise<void> {
        try {
            const resourceId: string = ctx.params.id as string,
                resource: IResource = await service.findById(resourceId)
            ctx.body = {
                code: 200,
                content: resource || {},
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
export default ResourceController
