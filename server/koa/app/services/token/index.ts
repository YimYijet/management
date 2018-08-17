import Token, { IToken } from '../../models/token'

class TokenService {
    static async find(): Promise<Array<IToken>> {
        return Token.find({}).exec()
    }
    static async findOne(query: any): Promise<IToken> {
        return Token.findOne(query).exec()
    }
    static async findById(roleId: any): Promise<IToken> {
        return Token.findById(roleId).exec()
    }
    static async create(item: IToken): Promise<IToken> {
        const role = new Token(item)
        return role.save()
    }
    static async remove(query: any): Promise<any> {
        return Token.remove(query).exec()
    }
    static async update(query: any, item: any): Promise<IToken> {
        return Token.findOneAndUpdate(query, item, { new: true })
    }
}

export default TokenService