import { Context } from 'koa';
import { getUser, addUser } from '../../services/user';

export default {
    async getUserList(ctx: Context): Promise<void> {
        const userList = await getUser();
        ctx.response.body = userList;
    },

    async addUser(ctx: Context): Promise<void> {
        const user = await addUser({ name: 'jerry' });
        ctx.response.body = user;
    }
};