import User, { IUser } from '../../models/user'
import { Query } from 'mongoose'

class UserService {
    static async find(): Promise<Array<IUser>> {
        return User.find({}).exec()
    }
    static async findById(userId: any): Promise<IUser> {
        return User.findById(userId).exec()
    }
    static async findOne(query: any): Promise<IUser> {
        return User.findOne(query).exec()
    }
    static async create(item: IUser): Promise<IUser> {
        const user = new User(item)
        return user.save()
    }
    static async remove(query: any): Promise<any> {
        return User.remove(query).exec()
    }
    static async update(query: any, item: any): Promise<IUser> {
        return User.findOneAndUpdate(query, item, { new: true })
    }
}

export default UserService