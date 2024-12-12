import { Request, Response } from "express";
import { IUserLoginParams, IUserLoginRegister} from "../types";

class UserController {
    userService: any;

    constructor({ userService }: any) {
        this.userService = userService;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this)
        this.logout = this.logout.bind(this)
        this.user = this.user.bind(this)
    }

    async register(req: Request, res: Response) {
        try {
            const payload: IUserLoginRegister = req?.body;
            const { data, error } = await this.userService.register(payload);

            if (error) return res.status(400).send({ data, error });

            res.status(200).send({ data, error });
        } catch (error) {
            res.send(500).send({ data: null, error: error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const params: IUserLoginParams = req?.body;
            const { data, error } = await this.userService.login(params);

            if (error) return res.status(400).send({ data, error });

            res.status(200).send({ data, error });
            // res.redirect('/user');
        } catch (error) {
            res.send(500).send({ data: null, error: error });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { data, error } = await this.userService.logout();

            if (error) return res.status(400).send({ data, error });

            res.status(200).send({ data, error });
        } catch (error) {
            res.send(500).send({ data: null, error: error });
        }
    }

    async user(req: Request, res: Response) {
        try {

        } catch (error) {
            res.send(500).send({ data: null, error: error })
        }
    }
}

export default UserController;
