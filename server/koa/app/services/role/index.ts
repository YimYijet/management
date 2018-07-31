import Role, { IRole } from '../../models/role';

class RoleService {
    async find(): Promise<Array<IRole>> {
        return Role.find({}).exec();
    }
    async create(item: IRole): Promise<IRole> {
        const role = new Role(item);
        return role.save();
    }
    async findOne(item: any): Promise<IRole> {
        return Role.findOne(item).exec();
    }
}

export default new RoleService();