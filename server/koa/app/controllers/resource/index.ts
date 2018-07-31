import { Context } from 'koa';
import { IResource } from '../../models/resource';
import service from '../../services/resource';

class ResourceController {
    // 获取全部资源列表
    async getResourceList(ctx: Context): Promise<void> {
        try {
            const resourceList = await service.find();
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: resourceList
            };
        } catch (e) {
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: []
            };
        }
    }
    // 添加资源
    async addResource(ctx: Context): Promise<void> {
        try {
            const item: IResource = <IResource>ctx.request.body;
            const resource = await service.findOne({ name: item.name });
            if (!resource) {
                const resource = await service.create(item);
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: resource
                };
            } else {
                ctx.body = {
                    code: 400,
                    message: '资源已存在',
                    content: {}
                };
            }
        } catch (e) {
            ctx.body = {
                code: 400,
                message: '错误请求',
                content: {}
            };
        }
    }
}
export default new ResourceController();