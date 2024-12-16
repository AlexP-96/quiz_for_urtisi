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

import QuestionController from '../modules/questions/controllers';
import QuestionService from '../modules/questions/service';
import QuestionDao from '../modules/questions/dao';
import questionDb from '../modules/questions/models';

import AnswerController from '../modules/answers/controllers';
import AnswerService from '../modules/answers/service';
import AnswerDao from '../modules/answers/dao';
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
        questionDao: asClass(QuestionDao),
        questionService: asClass(QuestionService),
        questionController: asClass(QuestionController),
    });

    container.register({
        answerDb: asValue(answerDb),
        answerDao: asClass(AnswerDao),
        answerService: asClass(AnswerService),
        answerController: asClass(AnswerController),
    });

    console.log('Dependency registered ...');
};

registerDependency();

if(process.env.SYNC_DB === 'true') registrationAssociations();

export { container };