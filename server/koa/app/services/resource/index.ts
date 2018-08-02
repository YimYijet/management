import Resource, { IResource } from '../../models/resource';

class ResourceService {
    async find(): Promise<Array<IResource>> {
        return Resource.find({}).exec();
    }
    async findOne(query: any): Promise<IResource> {
        return Resource.findOne(query).exec();
    }
    async findById(resourceId: any): Promise<IResource> {
        return Resource.findById(resourceId).exec();
    }
    async create(item: IResource): Promise<IResource> {
        const resource = new Resource(item);
        return resource.save();
    }
    async remove(query: any): Promise<any> {
        return Resource.remove(query).exec();
    }
    async update(query: any, item: any): Promise<IResource> {
        return Resource.findOneAndUpdate(query, item, { new: true });
    }
}

export default new ResourceService();