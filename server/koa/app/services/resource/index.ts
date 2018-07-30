import Resource, { IResource } from '../../models/resource';

class ResourceService {
    async find(): Promise<Array<IResource>> {
        return Resource.find({}).exec();
    }
    async create(item: IResource): Promise<IResource> {
        const user = new Resource(item);
        return user.save();
    }
}

export default new ResourceService();