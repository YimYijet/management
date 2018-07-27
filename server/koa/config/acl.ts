import * as Acl from 'acl';
import * as Mongodb from 'mongodb';
import { dbUrl } from './db';

const client: Mongodb.MongoClient = new Mongodb.MongoClient(dbUrl);

export default new Acl(new Acl.mongodbBackend(client.db(), 'acl_'));