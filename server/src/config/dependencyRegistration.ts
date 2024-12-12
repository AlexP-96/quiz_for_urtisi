import {
    InjectionMode,
    asClass,
    asValue,
    createContainer,
} from 'awilix';

import UserController from '../modules/user/controllers';
import UserService from '../modules/user/services';
import UserDao from '../modules/user/dao';
import userDb from '../modules/user/models';

import QuizController from '../modules/quiz/controllers';
import QuizService from '../modules/quiz/services';
import QuizDao from '../modules/quiz/dao';
import quizDb from '../modules/quiz/models';

import questionDb from '../modules/questions/models';

import answerDb from '../modules/answers/models';

import registrationAssociations from '../orm/all_models';

const container = createContainer({ injectionMode: InjectionMode.PROXY });

const registerDependency = () => {
    container.register({
        userDb: asValue(userDb),
        userDao: asClass(UserDao),
        userService: asClass(UserService),
        userController: asClass(UserController),
    });

    container.register({
        quizDb: asValue(quizDb),
        quizDao: asClass(QuizDao),
        quizService: asClass(QuizService),
        quizController: asClass(QuizController),
    });

    container.register({
        questionDb: asValue(questionDb),
    });

    container.register({
        answerDb: asValue(answerDb),
    });

    console.log('Dependency registered ...');
};

registerDependency();

if(process.env.SYNC_DB === 'true') registrationAssociations();

export { container };