import * as mongodb from 'mongodb'
import * as mongoose from 'mongoose'
import AclInstance from '../lib/acl'

export interface IOpts {
    url: string
    db?: string
    collection?: string
    maxAge?: number
    options?: mongodb.MongoClientOptions
}

export const dbPath: IOpts = {
    db: 'test',
    url: 'mongodb://localhost:27017',
}

export function connectDB(): Promise<void> {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${dbPath.url}/${dbPath.db}`, {
            useNewUrlParser: true,
        }, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                AclInstance.setAcl(mongoose.connection.db)
                resolve()
            }
        })
    })
}

export class Schema extends mongoose.Schema {
    constructor(definition: mongoose.SchemaDefinition) {
        super(definition, {
            toObject: {
                transform(doc: any, ret: any) {
                    ret.id = doc.id
                    delete ret._id
                    return ret
                },
            },
            versionKey: false,
        })
    }
}

export default mongoose
