import * as OAuth2Server from 'oauth2-server'
import * as util from '../lib/util'
import { IUser } from '../app/models/user'
import userService from '../app/services/user'
import { IClient } from '../app/models/client'
import clientService from '../app/services/client'
import { IToken } from '../app/models/token'
import tokenService from '../app/services/token'

const passwordModel: OAuth2Server.PasswordModel = {

    /* Base **/
    getClient: async (clientId: string, clientSecret: string): Promise<OAuth2Server.Client | OAuth2Server.Falsey> => {
        return clientService.findById(clientId)
    },
    saveToken: async (token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User): Promise<OAuth2Server.Token> => {
        return tokenService.update({ accessToken: token.accessToken }, <IToken>token)
    },
    // // optional
    // generateAccessToken: async (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string): Promise<string> => {
    //     return
    // },
    /* Request Authentication(请求认证) **/
    getAccessToken: async (accessToken: string): Promise<OAuth2Server.Token> => {
        return tokenService.findOne({ accessToken: accessToken })
    },
    verifyScope: async (token: OAuth2Server.Token, scope: string): Promise<boolean> => {
        return true
    },
    /* Password Grant(密码模式) **/
    getUser: async (username: string, password: string): Promise<OAuth2Server.User | OAuth2Server.Falsey> => {
        return userService.findOne({
            account : username,
            password: util.encrypt(password)
        })
    },
    // // optional
    // validateScope: async (user: OAuth2Server.User, client: OAuth2Server.Client, scope: string): Promise<string | OAuth2Server.Falsey> => {
    //     return
    // },
    // // optional
    // generateRefreshToken: async (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string): Promise<string> => {
    //     return
    // }
}

export const passwordGrant = new OAuth2Server({
    model: passwordModel,
    accessTokenLifetime: 12 * 60 * 60,
    allowBearerTokensInQueryString: true,
})