import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    IUserGetAll,
    IUserLoginParams,
    IUserLoginRegister,
} from '../types';
import dotenv from 'dotenv';

dotenv.config();

class UserService {
    userDao: any;

    constructor({ userDao }: any) {
        this.userDao = userDao;

        this.getAllData = this.getAllData.bind(this);
        this.logout = this.logout.bind(this);
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
                const token = jwt.sign({
                        email,
                        user_id,
                    }, String(process.env.JWT_SECRET),
                    { expiresIn: process.env.JWT_EXPIRES_IN },
                );
                await this.userDao.createTokenForUser({
                    email: params.email,
                    password: params.password,
                    token,
                });

                return {
                    data: {
                        user_id,
                        email,
                        token: `Bearer ${token}`,
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
                data: null,
                error: 'Такой пользователь уже зарегестрирован',
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

    async logout(email: string) {
        try {
            await this.userDao.deleteTokenForUser(email);
            return {
                data: {
                    token: null,
                    message: 'Вы успешно вышли из системы',
                },
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