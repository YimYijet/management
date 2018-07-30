import { Context } from 'koa';
import { IResource } from '../../models/resource';
import service from '../../services/resource';

class ResourceController {
    async getResourceList(ctx: Context): Promise<void> {
        const resourceList = await service.find();
        ctx.body = {
            code: 200,
            content: resourceList
        };
    }
    async addResource(ctx: Context): Promise<void> {
        const item: IResource = <IResource>ctx.request.body;
        if (item.hasOwnProperty('name')) {
            const resource = await service.create(item);
            ctx.body = {
                code: 200,
                content: resource
            };
        } else {
            ctx.body = {
                code: 400,
                content: {}
            };
        }
    }
}
export default new ResourceController();