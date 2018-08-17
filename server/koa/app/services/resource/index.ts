import Resource, { IResource } from '../../models/resource'

class ResourceService {
    static async find(): Promise<Array<IResource>> {
        return Resource.find({}).exec()
    }
    static async findOne(query: any): Promise<IResource> {
        return Resource.findOne(query).exec()
    }
    static async findById(resourceId: any): Promise<IResource> {
        return Resource.findById(resourceId).exec()
    }
    static async create(item: IResource): Promise<IResource> {
        const resource = new Resource(item)
        return resource.save()
    }
    static async remove(query: any): Promise<any> {
        return Resource.remove(query).exec()
    }
    static async update(query: any, item: any): Promise<IResource> {
        return Resource.findOneAndUpdate(query, item, { new: true })
    }
}

export default ResourceService