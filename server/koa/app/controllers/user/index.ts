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
        const userList = await service.find();
        ctx.body = {
            code: 200,
            content: userList
        };
    }
    // 添加用户
    async addUser(ctx: Context): Promise<void> {
        const item: IUser = <IUser>ctx.request.body;
        if (item.hasOwnProperty('name')) {
            const user = await service.create(item);
            ctx.body = {
                code: 200,
                content: user
            };
        } else {
            ctx.body = {
                code: 400,
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