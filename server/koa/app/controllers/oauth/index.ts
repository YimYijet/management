import { Context } from 'koa'
import * as OAuth2Server from 'oauth2-server'
import aclInstance from '../../../lib/acl'
import { passwordGrant } from '../../../lib/oauth'
import * as util from '../../../lib/util'
import { IUser } from '../../models/user'
import userService from '../../services/user'

class OAuthController {
    // 登录
    public static async token(ctx: Context): Promise<void> {
        try {
            const request = new OAuth2Server.Request(ctx.request), response = new OAuth2Server.Response(ctx.response)
            passwordGrant.token(request, response).then((token: OAuth2Server.Token) => {
                console.log(token)
            })
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 500,
                content: {},
                message: '错误请求',
            }
        }
    }
    // // 登出
    // public static async authorise(ctx: Context): Promise<void> {
    //     try {
    //         delete ctx.session.curUser
    //         delete ctx.session.curUserId
    //         delete ctx.session.roles
    //         ctx.body = {
    //             code: 200,
    //             content: {},
    //             message: '请求成功',
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         ctx.body = {
    //             code: 500,
    //             content: {},
    //             message: '服务器错误',
    //         }
    //     }
    // }
}

export default OAuthController
