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
    id: {
        type: String,
        required: true
    },
    grants: {
        type: Array,
        required: true
    },
    redirectUris: {
        type: Array,
    },
    accessTokenLifetime: {
        type: Number
    },
    refreshTokenLifetime: {
        type: Number
    }
})

export default mongoose.model<IClient>('client', ClientSchema, 'oauth_client')