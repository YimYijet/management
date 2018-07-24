import mongoose from '../../../config/database';

export interface IUser extends mongoose.Document {
    name: String;
}

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IUser>('user', UserSchema);