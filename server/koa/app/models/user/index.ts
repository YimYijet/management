const waterline = require('waterline');

export interface User {
    name: String;
}

export const model = waterline.Collection.extend({
    identity: 'user',
    tableName: 'user',
    datastore: 'management',
    schema: true,
    primaryKey: 'id',
    attributes: {
        id: {
            type: 'string',
            columnName: '_id',
        },
        name: {
            type: 'string',
        }
    }
});