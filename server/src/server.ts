import app from './app';
import config from './config/index';
import routerUser, {
    updateQuizRoute,
    getOneQuizRoute,
    getAllQuizRoute,
    createQuizRoute,
    deleteQuizRoute,

    createQuestionsRoute,
    updateQuestionsRoute,
    getAllQuestionsRoute,
    deleteQuestionsRoute,

    deleteAnswerRoute,
    getAllAnswerRoute,
    updateAnswerRoute,
    createAnswerRoute,
} from './router';
import { initConnection } from './shared/utils';

initConnection()
    .then(async () => {
        app.use('/', [routerUser]);
        app.use('/user', [
                createQuizRoute,
                getOneQuizRoute,
                getAllQuizRoute,
                updateQuizRoute,
                deleteQuizRoute,
            ],
        );
        app.use('/user', [
            getAllQuestionsRoute,
            createQuestionsRoute,
            deleteQuestionsRoute,
            updateQuestionsRoute,
        ]);
        app.use('/user', [
            getAllAnswerRoute,
            createAnswerRoute,
            updateAnswerRoute,
            deleteAnswerRoute,
        ]);

        app.listen(config.port, () => console.log(`Server has started at port ${config.port}....`));
    });
