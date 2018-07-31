import { Context } from 'koa';
import { IRole } from '../../models/role';
import service from '../../services/role';

class RoleController {
    // 获取全部角色列表
    async getRoleList(ctx: Context): Promise<void> {
        try {
            const roleList = await service.find();
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: roleList
            };
        } catch (e) {
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: []
            };
        }
    }
    // 添加角色
    async addRole(ctx: Context): Promise<void> {
        try {
            const item: IRole = <IRole>ctx.request.body;
            const role = await service.findOne({ name: item.name });
            if (!role) {
                const role = await service.create(item);
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: role
                };
            } else {
                ctx.body = {
                    code: 400,
                    message: '角色已存在',
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
export default new RoleController();