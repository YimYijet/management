import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'

export interface IClient extends mongoose.Document {
    id: string
    grants: string[]
    redirectUris?: string[]
    accessTokenLifetime?: number
    refreshTokenLifetime?: number
}

export const ClientSchema = new Schema({
    accessTokenLifetime: {
        type: Number,
    },
    grants: {
        required: true,
        type: Array,
    },
    id: {
        required: true,
        type: String,
    },
    redirectUris: {
        type: Array,
    },
    refreshTokenLifetime: {
        type: Number,
    },
})

export default mongoose.model<IClient>('client', ClientSchema, 'oauth_client')
