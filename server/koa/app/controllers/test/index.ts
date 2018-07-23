import { Context } from 'koa';
import * as service from '../../services/user';
import { User } from '../../models/user';

export default {
    async getUserList(ctx: Context): Promise<void> {
        const userList = await service.find();
        ctx.body = {
            code: 200,
            content: userList
        };
    },

    async addUser(ctx: Context): Promise<void> {
        const item: User = <User>ctx.request.body;
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
};