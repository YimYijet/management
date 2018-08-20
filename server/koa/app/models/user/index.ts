import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'

export interface IUser extends mongoose.Document {
    account: string
    password: string
    name: string
}

export const UserSchema = new Schema({
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUser>('user', UserSchema, 'acl_user')