import mongoose from '../../../config/db';
import { Schema } from '../../../config/db';

export interface IRole extends mongoose.Document {
    name: String;
}

export const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IRole>('acl_role', RoleSchema, 'acl_role');