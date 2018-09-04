import * as session from 'koa-session'
import * as mongodb from 'mongodb'
import { dbPath, IOpts } from './db'

// 参考：https://github.com/mcdyzg/koa-session-mongo2
// session 持久化
export class MongoStore {
    private client: mongodb.MongoClient
    private db: mongodb.Db
    private coll: mongodb.Collection

    constructor(opts: IOpts) {
        this.init(opts)
    }

    public async init({ url, db, collection, maxAge, options }: IOpts = {
        collection: 'sessions',
        maxAge: 86400,   // 1 day
        url: dbPath.url,
    }): Promise<void> {
        try {
            this.client = await mongodb.MongoClient.connect(url, options)
            this.db = await this.client.db(db)
            this.coll = await this.db.collection(collection)
            // 创建ttl索引，MongoDB提供自动删除过期数据
            try {
                await this.coll.indexExists(['access_idx'])
            } catch (e) {
                await this.coll.createIndex({ lastAccess: 1 }, { name: 'access_idx', expireAfterSeconds: maxAge })
            }
        } catch (e) {
            console.log(e)
        }
    }

    public async get(key: string): Promise<void> {
        try {
            const doc = await this.coll.findOne({ sid: key })
            return doc ? doc.session : undefined
        } catch (e) {
            console.log(e)
        }
    }

    public async set(key: string, sess: session.Session): Promise<string> {
        try {
            await this.coll.updateOne({ sid: key }, {
                $set: {
                    lastAccess: new Date(),
                    session: sess,
                    sid: key,
                },
            }, { upsert: true })
        } catch (e) {
            console.log(e)
        }
        return key
    }

    public async destroy(key: string): Promise<void> {
        try {
            await this.coll.deleteOne({ sid: key })
        } catch (e) {
            console.log(e)
        }
    }
}
