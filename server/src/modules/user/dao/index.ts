import {
    IUserGetAll,
    IUserLoginRegister,
} from '../types';
import { IEmail } from './types';

class UserDao {
    userDb: any;
    quizDb: any;
    questionDb: any;
    answerDb: any;

    constructor({
        userDb,
        quizDb,
        questionDb,
        answerDb,
    }: any) {
        this.userDb = userDb;
        this.quizDb = quizDb;
        this.questionDb = questionDb;
        this.answerDb = answerDb;

        this.findOne = this.findOne.bind(this);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async findOne(params: IEmail) {
        return await this.userDb.findOne({ where: { email: params.email } });
    }

    async create(params: IUserLoginRegister) {
        return await this.userDb.create(params);
    }

    async findAll(user_id: IUserGetAll) {
        return await this.userDb.findOne({
            where: { user_id: user_id },
            attributes: ['user_id', 'email'],
            include: [
                {
                    model: this.quizDb,
                    as: 'quizzes',
                    include: [
                        {
                            model: this.questionDb,
                            as: 'questions',
                            include: [
                                {
                                    model: this.answerDb,
                                    as: 'answers',
                                }
                            ]
                        }
                    ]
                },
            ],
        });
    }
}

export default UserDao;