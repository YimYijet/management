import * as mongoose from 'mongoose';
import AclInstance from './acl';

export const dbUrl = {
    uri: 'mongodb://localhost:27017',
    db: 'test'
};

mongoose.connect(`${dbUrl.uri}/${dbUrl.db}`, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        AclInstance.setAcl(mongoose.connection.db);
    }
});

export class Schema extends mongoose.Schema {
    constructor(definition: mongoose.SchemaDefinition) {
        super(definition, {
            toObject: {
                transform(doc: any, ret: any) {
                    ret.id = doc.id;
                    delete ret._id;
                    return ret;
                }
            },
            versionKey: false
        });
    }
}

export default mongoose;