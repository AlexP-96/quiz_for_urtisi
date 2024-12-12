import app from './app';
import config from './config/index';
import router from './router'
import { initConnection } from './shared/utils';

initConnection()
    .then(async () => {
        app.use('/', [router]);
        console.log(router);
        app.listen(config.port, () => console.log(`Server has started at port ${config.port}....`));
    });
