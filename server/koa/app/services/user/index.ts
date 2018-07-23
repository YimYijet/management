import waterline from '../../models';
import { User } from '../../models/User';

const getUser = async (): Promise<Array<User>> => {
    return waterline.models.user.find();
};

const addUser = async (item: User): Promise<User> => {
    return waterline.models.user.create(item).fetch();
};

export {
    getUser,
    addUser
};