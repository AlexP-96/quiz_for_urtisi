import app from './app';
import config from './config';
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
import jwtAuthMiddleware from './shared/middlewares/jwtAuthMiddleware';
import { initConnection } from './shared/utils';

initConnection()
    .then(async () => {
        app.use('/', [routerUser]);
        app.use('/user', jwtAuthMiddleware);
        app.use('/user', [
                createQuizRoute,
                getOneQuizRoute,
                getAllQuizRoute,
                updateQuizRoute,
                deleteQuizRoute,

                getAllQuestionsRoute,
                createQuestionsRoute,
                deleteQuestionsRoute,
                updateQuestionsRoute,

                getAllAnswerRoute,
                createAnswerRoute,
                updateAnswerRoute,
                deleteAnswerRoute,
            ],
        );

        app.listen(config.port, () => console.log(`Server has started at port ${config.port}....`));
    });
