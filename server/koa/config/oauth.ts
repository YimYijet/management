// import * as OAuth2Server from 'oauth2-server'
// import * as koa from 'koa'

// export declare class KoaOAuthServer {
//     server: OAuth2Server
//     constructor(options: OAuth2Server.ServerOptions)

//     authenticate(options?: OAuth2Server.AuthenticateOptions): (
//         request: koa.Request,
//         response: koa.Response,
//         callback: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>,
//     ) => Promise<OAuth2Server.Token>

//     authorize(options?: OAuth2Server.AuthorizeOptions): (
//         request: koa.Request,
//         response: koa.Response,
//         callback: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>,
//     ) => Promise<OAuth2Server.AuthorizationCode>

//     token(options?: OAuth2Server.TokenOptions): (
//         request: koa.Request,
//         response: koa.Response,
//         callback: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>,
//     ) => Promise<OAuth2Server.Token>
// }

// export const oAuth2Model: OAuth2Server.AuthorizationCodeModel = {
//     getClient: async (clientId: string, clientSecret: string): Promise<OAuth2Server.Client | OAuth2Server.Falsey> => {
//         return undefined
//     },
//     saveToken: async (token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User): Promise<OAuth2Server.Token> => {
//         return token
//     },
//     getAccessToken: async (accessToken: string): Promise<OAuth2Server.Token> => {
//         return {
//             accessToken,
//             client: { id: "testClient", grants: ["access_token"] },
//             user: { id: "testUser" }
//         }
//     },
//     verifyScope: async (token: OAuth2Server.Token, scope: string): Promise<boolean> => {
//         return true
//     },
//     getAuthorizationCode: async (authorizationCode: string): Promise<OAuth2Server.AuthorizationCode> => {
//         return {
//             authorizationCode,
//             expiresAt: new Date(),
//             redirectUri: "localhost",
//             client: { id: "testClient", grants: ["access_token"] },
//             user: { id: "testUser" }
//         }
//     },
//     saveAuthorizationCode: async (code: OAuth2Server.AuthorizationCode, client: OAuth2Server.Client, user: OAuth2Server.User): Promise<OAuth2Server.AuthorizationCode> => {
//         return code
//     },
//     revokeAuthorizationCode: async (code: OAuth2Server.AuthorizationCode): Promise<boolean> => {
//         return true
//     }
// }
