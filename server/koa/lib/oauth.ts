import * as OAuth2Server from 'oauth2-server'
import { IClient } from '../app/models/client'
import { IToken } from '../app/models/token'
import { IUser } from '../app/models/user'
import clientService from '../app/services/client'
import tokenService from '../app/services/token'
import userService from '../app/services/user'
import * as util from '../lib/util'

const passwordModel: OAuth2Server.PasswordModel = {

    /* Request Authentication(请求认证) **/
    getAccessToken: async (accessToken: string): Promise<OAuth2Server.Token> => {
        return tokenService.findOne({ accessToken })
    },
    /* Base **/
    getClient: async (clientId: string, clientSecret: string): Promise<OAuth2Server.Client | OAuth2Server.Falsey> => {
        return clientService.findById(clientId)
    },
    /* Password Grant(密码模式) **/
    getUser: async (username: string, password: string): Promise<OAuth2Server.User | OAuth2Server.Falsey> => {
        return userService.findOne({
            account : username,
            password: util.encrypt(password),
        })
    },
    /* Base **/
    saveToken: async (
        token: OAuth2Server.Token,
        client: OAuth2Server.Client,
        user: OAuth2Server.User): Promise<OAuth2Server.Token> => {
        return tokenService.update({ accessToken: token.accessToken }, token as IToken)
    },
    /* Request Authentication(请求认证) **/
    verifyScope: async (token: OAuth2Server.Token, scope: string): Promise<boolean> => {
        return true
    },
}

export const passwordGrant = new OAuth2Server({
    accessTokenLifetime: 12 * 60 * 60,
    allowBearerTokensInQueryString: true,
    model: passwordModel,
})
