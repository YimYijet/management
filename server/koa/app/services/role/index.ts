import Role, { IRole } from '../../models/role'

class RoleService {
    public static async find(): Promise<IRole[]> {
        return Role.find({}).exec()
    }
    public static async findOne(query: any): Promise<IRole> {
        return Role.findOne(query).exec()
    }
    public static async findById(roleId: any): Promise<IRole> {
        return Role.findById(roleId).exec()
    }
    public static async create(item: IRole): Promise<IRole> {
        const role = new Role(item)
        return role.save()
    }
    public static async remove(query: any): Promise<any> {
        return Role.remove(query).exec()
    }
    public static async update(query: any, item: any): Promise<IRole> {
        return Role.findOneAndUpdate(query, item, { new: true })
    }
}

export default RoleService
