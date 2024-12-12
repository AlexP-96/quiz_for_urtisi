import app from './app';
import config from './config/index';
import routerUser, {
    createQuestionsRoute,
    createQuizRoute,
    // deleteQuestionsRoute,
    deleteQuizRoute,
    getAllQuestionsRoute,
    getAllQuizRoute,
    getOneQuizRoute,
    // updateQuestionsRoute,
    updateQuizRoute,
} from './router';
import { initConnection } from './shared/utils';

initConnection()
    .then(async () => {
        app.use('/', [routerUser]);
        app.use('/user/:user_id', [
            createQuizRoute,
            getOneQuizRoute,
            getAllQuizRoute,
            updateQuizRoute,
            deleteQuizRoute,
        ],
        );
        app.use('/user/:user_id/questions/:quiz_id', [
            getAllQuestionsRoute,
            createQuestionsRoute,
            // deleteQuestionsRoute,
            // updateQuestionsRoute,
        ]);

        app.listen(config.port, () => console.log(`Server has started at port ${config.port}....`));
    });
