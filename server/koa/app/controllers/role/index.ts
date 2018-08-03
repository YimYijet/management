import { Context } from 'koa';
import { IRole } from '../../models/role';
import service from '../../services/role';

class RoleController {
    // 获取全部角色列表
    async getRoleList(ctx: Context): Promise<void> {
        try {
            const roleList: Array<IRole> = await service.find();
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: roleList
            };
        } catch (e) {
            console.log(e);
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
            const item: IRole = <IRole>ctx.request.body,
                role: IRole = await service.findOne({ name: item.name });
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
            console.log(e);
            ctx.body = {
                code: 400,
                message: '错误请求',
                content: {}
            };
        }
    }
    // 删除角色
    async deleteRole(ctx: Context): Promise<void> {
        try {
            const result: any = await service.remove({ id: ctx.params.id });
            if (result.ok) {
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: {}
                };
            } else {
                ctx.body = {
                    code: 400,
                    message: '错误请求',
                    content: {}
                };
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: {}
            };
        }
    }
    // 更新角色
    async updateRole(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id,
                item: any = ctx.request.body,
                role: IRole = await service.update({ _id: roleId }, item);
            if (role) {
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: role
                };
            } else {
                ctx.body = {
                    code: 400,
                    message: '错误请求',
                    content: {}
                };
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: {}
            };
        }
    }
    // 查询角色
    async getRoleById(ctx: Context): Promise<void> {
        try {
            const roleId: string = ctx.params.id,
                role: IRole = await service.findById(roleId);
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: role || {}
            };
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: {}
            };
        }
    }
}
export default new RoleController();