import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'
import { IClient } from '../client'
import { IUser } from '../user'

export interface IToken extends mongoose.Document {
    accessToken: string
    client: IClient
    user: IUser
    accessTokenExpiresAt?: Date
    refreshToken?: string
    refreshTokenExpiresAt?: Date
    scope?: string
}

export const TokenSchema = new Schema({
    accessToken: {
        required: true,
        type: String,
    },
    accessTokenExpiresAt: {
        type: Date,
    },
    client: {
        required: true,
        type: Object,
    },
    refreshToken: {
        type: String,
    },
    refreshTokenExpiresAt: {
        type: Date,
    },
    scope: {
        type: String,
    },
    user: {
        required: true,
        type: Object,
    },
})

export default mongoose.model<IToken>('token', TokenSchema, 'oauth_token')
