import { Context } from 'koa';
import { IRole } from '../../models/role';
import service from '../../services/role';

class RoleController {
    async getRoleList(ctx: Context): Promise<void> {
        const roleList = await service.find();
        ctx.body = {
            code: 200,
            content: roleList
        };
    }
    async addRole(ctx: Context): Promise<void> {
        const item: IRole = <IRole>ctx.request.body;
        if (item.hasOwnProperty('name')) {
            const role = await service.create(item);
            ctx.body = {
                code: 200,
                content: role
            };
        } else {
            ctx.body = {
                code: 400,
                content: {}
            };
        }
    }
}
export default new RoleController();