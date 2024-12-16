import bcrypt from 'bcrypt';
import {
    IUserGetAll,
    IUserLoginParams,
    IUserLoginRegister,
} from '../types';

class UserService {
    userDao: any;

    constructor({ userDao }: any) {
        this.userDao = userDao;

        this.getAllData = this.getAllData.bind(this);
    }

    async login(params: IUserLoginParams) {
        try {
            const {
                password,
                email,
                user_id,
            } = await this.userDao.findOne(params);

            const match = await bcrypt.compare(String(params.password), password);

            if (match) {
                return {
                    data: {
                        user_id,
                        email,
                    },
                    error: null,
                };
            }
            return {
                data: 'Неверный пароль',
                error: null,
            };

        } catch (error) {
            return {
                data: null,
                error: error,
            };
        }
    }

    async register(params: IUserLoginRegister) {
        try {
            if (params.password.length < 6) {
                return {
                    data: null,
                    error: 'Пароль должен содержать не менее чем 6 символов',
                };
            }

            const matchEmail = await this.userDao.findOne(params);

            if (!matchEmail) {
                await bcrypt.hash(String(params.password), 10)
                    .then(async (hash) => {
                        await this.userDao.create({
                            email: params.email,
                            password: hash,
                        });
                    })
                    .catch(err => console.log(err));
                return {
                    data: 'Пользователь зарегестрирован',
                    error: null,
                };
            }

            return {
                data: 'Такой пользователь уже зарегестрирован',
                error: null,
            };

        } catch (error) {
            return {
                data: null,
                error: error,
            };
        }
    }

    async getAllData(params: IUserGetAll) {
        try {
            const data = await this.userDao.findAll(params);
            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error: error,
            };
        }
    }
}

export default UserService;