import {
    IAnswerCreate,
    IAnswerGetAll,
    IAnswerUpdate,
} from '../types';

class AnswerDao {
    answerDb: any;

    constructor({
        answerDb,
    }: any) {
        this.answerDb = answerDb;

        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(params: IAnswerGetAll) {
        return await this.answerDb.findAll({
            where: {
                question_id: params.question_id,
            },
        });
    }

    async create(params: IAnswerCreate) {
        return await this.answerDb.create({
            question_id: params.question_id,
            answer_name: params.answer_name,
        });
    }

    async update(params: IAnswerUpdate) {
        const data = await this.answerDb.update(
            { answer_name: params.answer_name },
            { where: { answer_id: params.answer_id } },
        );
        console.log('dataDaoUpadte', data);
        return params;
    }

    async delete(params: string | number) {
        const data = await this.answerDb.destroy(
            { where: { answer_id: params } },
        );
        return {
            data,
            delete: Number(params),
        };
    }
}

export default AnswerDao;