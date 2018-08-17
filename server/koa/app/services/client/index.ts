import Client, { IClient } from '../../models/client'

class ClientService {
    static async find(): Promise<Array<IClient>> {
        return Client.find({}).exec()
    }
    static async findOne(query: any): Promise<IClient> {
        return Client.findOne(query).exec()
    }
    static async findById(roleId: any): Promise<IClient> {
        return Client.findById(roleId).exec()
    }
    static async create(item: IClient): Promise<IClient> {
        const role = new Client(item)
        return role.save()
    }
    static async remove(query: any): Promise<any> {
        return Client.remove(query).exec()
    }
    static async update(query: any, item: any): Promise<IClient> {
        return Client.findOneAndUpdate(query, item, { new: true })
    }
}

export default ClientService