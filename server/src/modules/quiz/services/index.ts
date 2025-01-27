import {
    IQuizCreate,
    IQuizDao,
    IQuizGetOne,
    IQuizUpdate,
} from '../types';

class QuizService {
    quizDao: IQuizDao;

    constructor({ quizDao }: any) {
        this.quizDao = quizDao;

        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.findOne = this.findOne.bind(this);
    }

    async findAll(params: string) {
        try {
            const {
                data,
                allQuestions,
                allAnswers,
            } = await this.quizDao.findAll(params);
            const allQuizzes: any[] = [];

            data.map((quiz: any) => {
                const newObj: any = {};
                for (const key in quiz.dataValues) {
                    if (key !== 'questions') {
                        newObj[key] = quiz.dataValues[key];
                    }
                }
                allQuizzes.push(newObj);
            });

            return {
                data,
                allQuizzes,
                allQuestions,
                allAnswers,
                error: null,
            };

        } catch (error) {
            return {
                data: null,
                error: error,
            };
        }
    }

    async findOne(params: string) {
        try {
            const data = await this.quizDao.findOne(params);

            return {
                data: data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error: error,
            };
        }
    }

    async create(params: IQuizCreate) {
        try {
            const data = await this.quizDao.create({
                user_id: params.user_id,
                quiz_name: params.quiz_name,
            });

            return {
                data: {
                    title: data,
                    name: params.quiz_name,
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

    async update(params: IQuizUpdate) {
        try {
            await this.quizDao.update(params);

            return {
                data: {
                    update: params.quiz_name,
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
            const data = await this.quizDao.delete(params);

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

export default QuizService;