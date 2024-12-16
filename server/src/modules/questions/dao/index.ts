import quizDb from '../../quiz/models';
import userDb from '../../user/models';
import {
    IQuestionCreate,
    IQuestionGetAll,
    IQuestionUpdate,
} from '../types';

class QuestionDao {
    questionDb: any;
    quizDb: any;
    userDb: any;

    constructor({
        questionDb,
        quizDb,
        userDb,
    }: any) {
        this.questionDb = questionDb;
        this.quizDb = quizDb;
        this.userDb = userDb;

        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(params: IQuestionGetAll) {
        return await this.questionDb.findAll({
            where: {
                quiz_id: params.quiz_id,
            }
        });
    }

    async create(params: IQuestionCreate) {
        return await this.questionDb.create({
            quiz_id: params.quiz_id,
            question_name: params.question_name,
        });
    }

    async update(params: IQuestionUpdate) {
        return await this.questionDb.update(
            { question_name: params.question_name },
            { where: { question_id: params.question_id } },
        );
    }

    async delete(params: string | number) {
        return await this.questionDb.destroy(
            { where: { question_id: params } },
        );
    }
}

export default QuestionDao;