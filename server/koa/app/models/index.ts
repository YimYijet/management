const Waterline = require('waterline');

const orm = new Waterline();

import { model } from './user';
orm.registerModel(model);

export default orm;