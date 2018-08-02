import { Context } from 'koa';
import { IUser } from '../../models/user';
import userService from '../../services/user';
import util from '../../../lib/util';

class LoginController {
    async login(ctx: Context): Promise<void> {
        try {
            const item: any = ctx.request.body, password = util.encrypt(item.password), user: IUser = await userService.findOne({ account: item.account });
            if (user.password === password) {
                ctx.session.userId = user.id;
                ctx.body = {
                    code: 200,
                    message: '请求成功',
                    content: user
                };
            } else {
                ctx.body = {
                    code: 401,
                    message: '没有权限',
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
}

export default new LoginController();