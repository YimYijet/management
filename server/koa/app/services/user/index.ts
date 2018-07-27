import User, { IUser } from '../../models/user';

class UserService {
    async find(): Promise<Array<IUser>> {
        return User.find({}).exec();
    }
    async create(item: IUser): Promise<IUser> {
        const user = new User(item);
        return user.save();
    }
}

export default new UserService();