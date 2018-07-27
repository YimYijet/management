import * as mongoose from 'mongoose';

export const dbUrl = 'mongodb://localhost:27017/test';

mongoose.connect(dbUrl, {
    useNewUrlParser: true
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