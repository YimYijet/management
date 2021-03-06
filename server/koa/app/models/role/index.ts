import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'

export interface IRole extends mongoose.Document {
    name: string,
}

export const RoleSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
})

export default mongoose.model<IRole>('role', RoleSchema, 'acl_role')
