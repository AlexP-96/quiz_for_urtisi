import {
    Request,
    Response,
} from 'express';
import {
    IQuestionCreate,
    IQuestionDelete,
    IQuestionService,
    IQuestionUpdate,
} from '../types';

class QuestionController {
    questionService: IQuestionService;

    constructor({ questionService }: any) {
        this.questionService = questionService;

        this.getAllQuestion = this.getAllQuestion.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    async getAllQuestion(req: Request, res: Response) {
        try {
            const {
                user_id,
                quiz_id,
            } = req?.params;

            const {
                data,
                error,
            } = await this.questionService.findAll({
                user_id,
                quiz_id,
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

    async createQuestion(req: Request, res: Response) {
        try {
            const { question_name } = req?.body;
            const { quiz_id } = req?.params;

            const {
                data,
                error,
            } = await this.questionService.create({
                question_name,
                quiz_id,
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

    async updateQuestion(req: Request, res: Response) {
        try {
            const { question_name } = req?.body;
            const { question_id } = req?.params;
            const {
                data,
                error,
            } = await this.questionService.update({
                question_name,
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

    async deleteQuestion(req: Request, res: Response) {
        try {
            const { question_id } = req?.params;

            const {
                data,
                error,
            } = await this.questionService.delete(question_id);

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

export default QuestionController;