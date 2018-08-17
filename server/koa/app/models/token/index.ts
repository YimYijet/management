import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'
import { IUser } from '../user'
import { IClient } from '../client'

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
        type: String,
        required: true
    },
    client: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    accessTokenExpiresAt: {
        type: Date,
    },
    refreshToken: {
        type: String,
    },
    refreshTokenExpiresAt: {
        type: Date,
    },
    scope: {
        type: String,
    }
})

export default mongoose.model<IToken>('token', TokenSchema, 'oauth_token')