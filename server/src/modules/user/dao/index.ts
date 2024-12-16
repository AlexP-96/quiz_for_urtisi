import { IEmail } from './types';
import {
    IUserLoginRegister,
} from '../types';

class UserDao {
    userDb: any;

    constructor({ userDb }: any) {
        this.userDb = userDb;

        this.findOne = this.findOne.bind(this);
        this.create = this.create.bind(this);
    }

    async findOne(params: IEmail) {
        return await this.userDb.findOne({ where: { email: params.email } });
    }

    async create(params: IUserLoginRegister) {
        return await this.userDb.create(params);
    }
}


export default UserDao;