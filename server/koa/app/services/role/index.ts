import Role, { IRole } from '../../models/role';

class RoleService {
    async find(): Promise<Array<IRole>> {
        return Role.find({}).exec();
    }
    async create(item: IRole): Promise<IRole> {
        const user = new Role(item);
        return user.save();
    }
}

export default new RoleService();