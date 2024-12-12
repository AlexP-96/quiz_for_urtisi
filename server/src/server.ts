import app from './app';
import config from './config/index';
import routerUser, {
    createQuizRoute,
    deleteQuizRoute,
    getAllQuizRoute,
    getOneQuizRoute,
    updateQuizRoute,
} from './router';
import { initConnection } from './shared/utils';

initConnection()
    .then(async () => {
        app.use('/', [routerUser]);
        app.use('/user/:user_id',
            [
                createQuizRoute,
                getOneQuizRoute,
                getAllQuizRoute,
                updateQuizRoute,
                deleteQuizRoute,
            ],
        );

        app.listen(config.port, () => console.log(`Server has started at port ${config.port}....`));
    });
