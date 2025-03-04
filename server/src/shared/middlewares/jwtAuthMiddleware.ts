import jwt from 'jsonwebtoken';
import { STATUS_CODES } from 'http';
import { ResponseDTO } from '../dtos/response.dto';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtToken: string | undefined = req.headers['authorization']?.split(' ')[1];

        if (jwtToken === undefined) return res.status(403).send(new ResponseDTO(403, STATUS_CODES['403'], 'Нужно пройти заново авторизацию'));
        //todo сделать типизацию или найти готовые типы!
        jwt.verify(jwtToken, String(process.env.JWT_SECRET),
            (err: any, decoded: any) => {
                if (decoded) {
                    console.log('valid token');
                    next();
                }
                if (err) {
                    console.log('no valid token');
                    return res.status(403)
                        .send({data: null, message: 'Нужно пройти заново авторизацию' });
                }
            },
        );
    } catch (err) {
        res.status(500)
            .send(new ResponseDTO(500, STATUS_CODES['500'], null));
    }
};

export default jwtAuthMiddleware;