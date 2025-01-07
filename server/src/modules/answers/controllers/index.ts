import {
    Request,
    Response,
} from 'express';
import {
    IAnswerService,
} from '../types';

class AnswerController {
    answerService: IAnswerService;

    constructor({ answerService }: any) {
        this.answerService = answerService;

        this.getAllAnswer = this.getAllAnswer.bind(this);
        this.createAnswer = this.createAnswer.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
    }

    async getAllAnswer(req: Request, res: Response) {
        try {
            const {
                quiz_id,
                question_id,
            } = req?.params;

            const {
                data,
                error,
            } = await this.answerService.findAll({
                quiz_id,
                question_id,
            });

            if (error) {
                return res.status(404)
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

    async createAnswer(req: Request, res: Response) {
        try {
            const { answer_name } = req?.body;
            const { question_id } = req?.params;

            const {
                data,
                error,
            } = await this.answerService.create({
                answer_name,
                question_id,
            });

            if (error) {
                return res.status(404)
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
                    error,
                });
        }
    }

    async updateAnswer(req: Request, res: Response) {
        try {
            const { answer_name } = req?.body;
            const { answer_id } = req?.params;
            const {
                data,
                error,
            } = await this.answerService.update({
                answer_name,
                answer_id,
            });

            if (error) {
                return res.status(404)
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
                    error,
                });
        }
    }

    async deleteAnswer(req: Request, res: Response) {
        try {
            const { answer_id } = req?.params;

            const {
                data,
                error,
            } = await this.answerService.delete(answer_id);

            if (error) {
                return res.status(404)
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
                    error,
                });
        }
    }
}

export default AnswerController;