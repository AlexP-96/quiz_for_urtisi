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

    //todo сделать получение данных чтобы исключить из каждого вложенные массивы
    async findAll(params: string) {
        const data = await this.quizDb.findAll({
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

        const allQuestions: any[] = [];

        data.map((quiz: any) => {
            quiz.questions.map((question: any) => {
                allQuestions.push(question);
            });
        });

        const allAnswers: any[] = [];

        data.map((quiz: any) => {
            quiz.questions.map((question: any) => {
                question.answers.map((answer: any) => {
                    allAnswers.push(answer);
                });
            });
        });

        return {
            data,
            allQuestions,
            allAnswers,
        };
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
}

export default QuizDao;