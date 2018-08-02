import Role, { IRole } from '../../models/role';

class RoleService {
    async find(): Promise<Array<IRole>> {
        return Role.find({}).exec();
    }
    async findOne(query: any): Promise<IRole> {
        return Role.findOne(query).exec();
    }
    async findById(roleId: any): Promise<IRole> {
        return Role.findById(roleId).exec();
    }
    async create(item: IRole): Promise<IRole> {
        const role = new Role(item);
        return role.save();
    }
    async remove(query: any): Promise<any> {
        return Role.remove(query).exec();
    }
    async update(query: any, item: any): Promise<IRole> {
        return Role.findOneAndUpdate(query, item, { new: true });
    }
}

export default new RoleService();