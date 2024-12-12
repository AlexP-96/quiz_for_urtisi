import {
    IQuestionCreate,
    IQuestionDao,
    IQuestionGetOne,
    IQuestionUpdate,
} from '../types';

class QuestionService {
    questionDao: IQuestionDao;

    constructor({ questionDao }: any) {
        this.questionDao = questionDao;

        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(params: string) {
        try {
            const data: string = await this.questionDao.findAll(params);

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

    async create(params: IQuestionCreate) {
        try {
            const data = await this.questionDao.create({
                quiz_id: params.quiz_id,
                question_name: params.question_name,
            });

            return {
                data: {
                    title: data,
                    name: params.question_name,
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

    async update(params: IQuestionUpdate) {
        try {
            await this.questionDao.update(params);

            return {
                data: {
                    update: params.question_name,
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

    async delete(params: number | string) {
        try {
            const data = await this.questionDao.delete(params);

            return {
                data: {
                    delete: data,
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

export default QuestionService;