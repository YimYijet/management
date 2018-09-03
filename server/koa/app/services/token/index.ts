import Token, { IToken } from '../../models/token'

class TokenService {
    public static async find(): Promise<IToken[]> {
        return Token.find({}).exec()
    }
    public static async findOne(query: any): Promise<IToken> {
        return Token.findOne(query).exec()
    }
    public static async findById(roleId: any): Promise<IToken> {
        return Token.findById(roleId).exec()
    }
    public static async create(item: IToken): Promise<IToken> {
        const role = new Token(item)
        return role.save()
    }
    public static async remove(query: any): Promise<any> {
        return Token.remove(query).exec()
    }
    public static async update(query: any, item: any): Promise<IToken> {
        return Token.findOneAndUpdate(query, item, { new: true })
    }
}

export default TokenService
