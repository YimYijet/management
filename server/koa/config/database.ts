const mongoAdapter = require('sails-mongo');
const Waterline = require('waterline');

const config = {
    adapters: {
        'mongo': mongoAdapter,
    },
    connections: {
        management: {
            adapter: 'mongo',
            url: 'mongodb://localhost:27017/test'
        }
    }
};

const waterline = new Waterline();

export default {
    config,
    waterline
};