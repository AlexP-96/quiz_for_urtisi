import answerDb from '../../answers/models';
import questionDb from '../../questions/models';
import {
    IQuizCreate,
    IQuizUpdate,
} from '../types';

class QuizDao {
    quizDb: any;

    constructor({ quizDb }: any) {
        this.quizDb = quizDb;

        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(params: string) {
        return await this.quizDb.findAll({
            where: {
                user_id: params,
            },
            include: [
                {
                    model: questionDb,
                    as: 'questions',
                    include: [
                        {
                            model: answerDb,
                            as: 'answers',
                        },
                    ],
                },
            ],
        });
    }

    async findOne(params: string) {
        return await this.quizDb.findOne({
            where: {
                quiz_id: params,
            },
        });
    }

    async create(params: IQuizCreate) {
        return await this.quizDb.create({
            user_id: params.user_id,
            quiz_name: params.quiz_name,
        });
    }

    async update(params: IQuizUpdate) {
        return await this.quizDb.update(
            { quiz_name: params.quiz_name },
            { where: { quiz_id: params.quiz_id } },
        );
    }

    async delete(params: string | number) {
        return await this.quizDb.destroy(
            { where: { quiz_id: params } },
        );
    }

    // async findOne(params: IEmail) {
    //     return await this.userDb.findOne({ where: { email: params.email } });
    // }

}

export default QuizDao;