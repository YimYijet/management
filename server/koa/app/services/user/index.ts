import waterline from '../../models';
import { User } from '../../models/User';

const find = async (): Promise<Array<User>> => {
    return waterline.models.user.find();
};

const create = async (item: User): Promise<User> => {
    return waterline.models.user.create(item).fetch();
};

export {
    find,
    create
};