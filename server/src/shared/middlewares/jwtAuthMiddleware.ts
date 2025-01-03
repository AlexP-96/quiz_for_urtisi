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

        if (jwtToken === undefined) return res.status(403).send(new ResponseDTO(403, STATUS_CODES['403'], null));

        jwt.verify(jwtToken, String(process.env.JWT_SECRET),
            (err: any, decoded: any) => {
                if (decoded) {
                    console.log('valid');
                    next();
                }
                if (err) {
                    console.log('no valid');
                    return res.status(403)
                        .send({message: err.message});
                }
            },
        );
    } catch (err) {
        res.status(500)
            .send(new ResponseDTO(500, STATUS_CODES['500'], null));
    }
};

export default jwtAuthMiddleware;