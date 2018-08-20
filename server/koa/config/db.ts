import * as mongoose from 'mongoose'
import * as mongodb from 'mongodb'
import * as session from 'koa-session'
import AclInstance from '../lib/acl'

interface Opts {
    url: string
    db?: string
    collection?: string
    maxAge?: number
    options?: mongodb.MongoClientOptions
}

export const dbPath: Opts = {
    url: 'mongodb://localhost:27017',
    db: 'test'
}

export function connectDB(): Promise<void> {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${dbPath.url}/${dbPath.db}`, {
            useNewUrlParser: true
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
                }
            },
            versionKey: false
        })
    }
}

// 参考：https://github.com/mcdyzg/koa-session-mongo2
// session 持久化
export class MongoStore {
    client: mongodb.MongoClient
    db: mongodb.Db
    coll: mongodb.Collection

    constructor(opts: Opts) {
        this.init(opts)
    }

    async init({ url, db, collection, maxAge, options }: Opts = {
        url: 'mongodb://localhost:27017',
        collection: 'sessions',
        maxAge: 86400   // 1 day
    }) {
        try {
            this.client = await mongodb.MongoClient.connect(url, options)
            this.db = await this.client.db(db)
            this.coll = await this.db.collection(collection)
            // 创建ttl索引，MongoDB提供自动删除过期数据
            try {
                await this.coll.indexExists(['access_idx'])
            } catch (e) {
                await this.coll.createIndex({ 'lastAccess': 1 }, { name: 'access_idx', expireAfterSeconds: maxAge })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async get(key: string) {
        try {
            const doc = await this.coll.findOne({ sid: key })
            return doc ? doc.session : undefined
        } catch (e) {
            console.log(e)
        }
    }

    async set(key: string, sess: session.Session) {
        try {
            await this.coll.updateOne({ 'sid': key }, {
                $set: {
                    'sid': key,
                    'session': sess,
                    'lastAccess': new Date()
                }
            }, { upsert: true })
        } catch (e) {
            console.log(e)
        }
        return key
    }

    async destroy(key: string) {
        try {
            await this.coll.deleteOne({ sid: key })
        } catch (e) {
            console.log(e)
        }
    }
}

export default mongoose