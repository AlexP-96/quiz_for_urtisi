import {
    Request,
    Response,
} from 'express';
import {
    IQuizCreate,
    IQuizDelete,
    IQuizService,
    IQuizUpdate,
} from '../types';

class QuizController {
    quizService: IQuizService;

    constructor({ quizService }: any) {
        this.quizService = quizService;

        this.getAllQuiz = this.getAllQuiz.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
        this.updateQuiz = this.updateQuiz.bind(this);
        this.deleteQuiz = this.deleteQuiz.bind(this);
        this.getOneQuiz = this.getOneQuiz.bind(this);
    }

    async getAllQuiz(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const {
                data,
                error,
            } = await this.quizService.findAll(id);

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

    async getOneQuiz(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const {
                data,
                error,
            } = await this.quizService.findOne(id);

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
                    error,
                });
        }
    }

    async createQuiz(req: Request, res: Response) {
        try {
            const payload: IQuizCreate = req?.body;

            const {
                data,
                error,
            } = await this.quizService.create(payload);

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
                    error,
                });
        }
    }

    async updateQuiz(req: Request, res: Response) {
        try {
            const payload: IQuizUpdate = req?.body;

            const {
                data,
                error,
            } = await this.quizService.update(payload);

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
                    error,
                });
        }
    }

    async deleteQuiz(req: Request, res: Response) {
        try {
            const { quiz_id } = req?.body;

            const {
                data,
                error,
            } = await this.quizService.delete(quiz_id);

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
                    error,
                });
        }
    }
}

export default QuizController;