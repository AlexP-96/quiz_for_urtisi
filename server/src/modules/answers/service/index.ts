import {
    IAnswerCreate,
    IAnswerDao,
    IAnswerGetOne,
    IAnswerUpdate,
} from '../types';

class AnswerService {
    answerDao: IAnswerDao;

    constructor({ answerDao }: any) {
        this.answerDao = answerDao;

        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(params: string) {
        try {
            const data: string = await this.answerDao.findAll(params);

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

    async create(params: IAnswerCreate) {
        try {
            const data = await this.answerDao.create({
                quiz_id: params.quiz_id,
                answer_name: params.answer_name,
            });

            return {
                data: {
                    title: data,
                    name: params.answer_name,
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

    async update(params: IAnswerUpdate) {
        try {
            await this.answerDao.update(params);

            return {
                data: {
                    update: params.answer_name,
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
            const data = await this.answerDao.delete(params);

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

export default AnswerService;