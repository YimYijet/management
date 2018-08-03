import { Context } from 'koa';
import * as util from '../../../lib/util';
import { IUser } from '../../models/user';
import userService from '../../services/user';

class InterceptController {
    // 拦截
    async intercept(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.session.curUserId);
            ctx.body = {
                code: 200
            };
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                message: '服务器错误',
                content: {}
            };
        }
        next();
    }
}

export default new InterceptController();