import Resource, { IResource } from '../../models/resource'

class ResourceService {
    public static async find(): Promise<IResource[]> {
        return Resource.find({}).exec()
    }
    public static async findOne(query: any): Promise<IResource> {
        return Resource.findOne(query).exec()
    }
    public static async findById(resourceId: any): Promise<IResource> {
        return Resource.findById(resourceId).exec()
    }
    public static async create(item: IResource): Promise<IResource> {
        const resource = new Resource(item)
        return resource.save()
    }
    public static async remove(query: any): Promise<any> {
        return Resource.remove(query).exec()
    }
    public static async update(query: any, item: any): Promise<IResource> {
        return Resource.findOneAndUpdate(query, item, { new: true })
    }
}

export default ResourceService
