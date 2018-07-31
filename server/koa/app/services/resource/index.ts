import Resource, { IResource } from '../../models/resource';

class ResourceService {
    async find(): Promise<Array<IResource>> {
        return Resource.find({}).exec();
    }
    async create(item: IResource): Promise<IResource> {
        const resource = new Resource(item);
        return resource.save();
    }
    async findOne(item: any): Promise<IResource> {
        return Resource.findOne(item).exec();
    }
}

export default new ResourceService();