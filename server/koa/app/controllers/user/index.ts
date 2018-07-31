import { Context } from 'koa';
import AclInstance from '../../../config/acl';
import { IUser } from '../../models/user';
import service from '../../services/user';
import { IRole } from '../../models/role';
import roleService from '../../services/role';

type strings = string | string[];
type Value = string | number;
type Values = Value | Value[];

class UserController {
    // 获取全部用户列表
    async getUserList(ctx: Context): Promise<void> {
        try {
            const userList = await service.find();
            ctx.body = {
                code: 200,
                message: '请求成功',
                content: userList
            };
        } catch (e) {
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: []
            };
        }
    }
    // 添加用户
    async addUser(ctx: Context): Promise<void> {
        try {
            const item: IUser = <IUser>ctx.request.body;
            const user = await service.findOne({ account: item.account });
            if (!user) {
                item.password = AclInstance.encrypt(item.password);
                const user = await service.create(item);
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: user
                };
            } else {
                ctx.body = {
                    code: 400,
                    message: '用户已存在',
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
    // 绑定角色
    async bindRole(ctx: Context): Promise<void> {
        const userId: Value = <Value>ctx.params.id,
            roles: strings = <strings>ctx.request.body,
            user = await service.findById(userId);
        if (user) {
            await AclInstance.getAcl().addUserRoles(userId, roles);
        }
    }
}
export default new UserController();