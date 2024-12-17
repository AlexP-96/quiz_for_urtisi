import {
    Request,
    Response,
} from 'express';
import {
    IUserLoginParams,
    IUserLoginRegister,
    None,
} from '../types';

class UserController {
    userService: any;

    constructor({ userService }: any) {
        this.userService = userService;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.getAllData = this.getAllData.bind(this);
    }

    async register(req: Request, res: Response) {
        try {
            const payload: IUserLoginRegister = req?.body;
            const {
                data,
                error,
            } = await this.userService.register(payload);

            if (error) {
                return res.status(400)
                    .send({
                        data,
                        error,
                    });
            }

            res.status(200)
                .send({
                    data,
                    error,
                });
        } catch (error) {
            res.send(500)
                .send({
                    data: null,
                    error: error,
                });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const params: None<IUserLoginParams> = req?.body;
            const {
                data,
                error,
            } = await this.userService.login(params);

            if (error) {
                return res.status(400)
                    .send({
                        data,
                        error,
                    });
            }

            res.status(200)
                .send({
                    data,
                    error,
                });
        } catch (error) {
            res.send(500)
                .send({
                    data: null,
                    error: error,
                });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { email } = req?.body;

            const {
                data,
                error,
            } = await this.userService.logout(email);

            if (error) {
                return res.status(400)
                    .send({
                        data,
                        error,
                    });
            }

            res.status(200)
                .send({
                    data,
                    error,
                });
        } catch (error) {
            res.send(500)
                .send({
                    data: null,
                    error: error,
                });
        }
    }

    async getAllData(req: Request, res: Response) {
        try {
            const { user_id } = req.params;

            const {
                data,
                error,
            } = await this.userService.getAllData(user_id);

            if (error) {
                return res.status(400)
                    .send({
                        data: null,
                        error,
                    });
            }

            return res.status(200).send({
                data,
                error: null,
            });

        } catch (error) {
            res.send(500)
                .send({
                    data: null,
                    error: error,
                });
        }
    }
}

export default UserController;
