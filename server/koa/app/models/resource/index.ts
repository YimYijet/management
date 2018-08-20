import mongoose from '../../../config/db'
import { Schema } from '../../../config/db'

export interface IResource extends mongoose.Document {
    name: string
    pId: string
}

export const ResourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pId: {
        type: String
    }
})

export default mongoose.model<IResource>('resource', ResourceSchema, 'acl_resource')