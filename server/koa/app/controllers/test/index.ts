import { Context } from 'koa';
import { IUser } from '../../models/user';
import service from '../../services/user';

class UserController {
    async getUserList(ctx: Context): Promise<void> {
        const userList = await service.find();
        ctx.body = {
            code: 200,
            content: userList
        };
    }
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
}
export default new UserController();