import User, { IUser } from '../../models/user'
import { Query } from 'mongoose'

class UserService {
    async find(): Promise<Array<IUser>> {
        return User.find({}).exec()
    }
    async findById(userId: any): Promise<IUser> {
        return User.findById(userId).exec()
    }
    async findOne(query: any): Promise<IUser> {
        return User.findOne(query).exec()
    }
    async create(item: IUser): Promise<IUser> {
        const user = new User(item)
        return user.save()
    }
    async remove(query: any): Promise<any> {
        return User.remove(query).exec()
    }
    async update(query: any, item: any): Promise<IUser> {
        return User.findOneAndUpdate(query, item, { new: true })
    }
}

export default new UserService()