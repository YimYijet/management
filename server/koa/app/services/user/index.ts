import User, { IUser } from '../../models/user';

class UserService {
    async find(): Promise<Array<IUser>> {
        return User.find({}).exec();
    }
    async create(item: IUser): Promise<IUser> {
        const user = new User(item);
        return user.save();
    }
    async findById(userId: any): Promise<IUser> {
        return User.findById(userId).exec();
    }
    async findOne(item: any): Promise<IUser> {
        return User.findOne(item).exec();
    }
}

export default new UserService();