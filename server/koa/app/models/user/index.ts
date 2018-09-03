import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'

export interface IUser extends mongoose.Document {
    account: string
    password: string
    name: string
}

export const UserSchema = new Schema({
    account: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
})

export default mongoose.model<IUser>('user', UserSchema, 'acl_user')
