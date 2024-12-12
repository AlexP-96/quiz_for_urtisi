import {
    Sequelize,
} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATA_BASE_NAME || 'database',
    process.env.USER_NAME_DB || 'username',
    process.env.PASSWORD_DB || 'password', {
        host: '127.0.0.1',
        port: 3307,
        dialect: 'mysql',
    },
);

if(process.env.SYNC_DB === 'true') {
    (async () => {
        await sequelize.sync({ force: true });
    })();
}

export default sequelize;
