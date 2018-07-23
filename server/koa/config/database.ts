const mongoAdapter = require('sails-mongo');

export const config = {
    adapters: {
        'mongo': mongoAdapter,
    },
    datastores: {
        management: {
            adapter: 'mongo',
            url: 'mongodb://localhost:27017/test'
        }
    }
};