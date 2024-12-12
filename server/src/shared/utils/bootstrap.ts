import sequelize from '../../orm';

const initSequelizeConnection = async () => {}

const initMysqlConnection = async () => {
    try {
        sequelize.authenticate().then(e => {
            console.log('Connection has been established successfully.')
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const initConnection = async () => {
  await initMysqlConnection();
  await initSequelizeConnection();
}