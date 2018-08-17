import Role, { IRole } from '../../models/role'

class RoleService {
    static async find(): Promise<Array<IRole>> {
        return Role.find({}).exec()
    }
    static async findOne(query: any): Promise<IRole> {
        return Role.findOne(query).exec()
    }
    static async findById(roleId: any): Promise<IRole> {
        return Role.findById(roleId).exec()
    }
    static async create(item: IRole): Promise<IRole> {
        const role = new Role(item)
        return role.save()
    }
    static async remove(query: any): Promise<any> {
        return Role.remove(query).exec()
    }
    static async update(query: any, item: any): Promise<IRole> {
        return Role.findOneAndUpdate(query, item, { new: true })
    }
}

export default RoleService