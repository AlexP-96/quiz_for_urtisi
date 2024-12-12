import {
    DataTypes,
    Model,
} from 'sequelize';
import sequelize from '../../../orm';
import dotenv from 'dotenv';

dotenv.config();

const userDb = sequelize.define<Model>('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    success: {
        type: DataTypes.TINYINT,
        defaultValue: false,
    },
    token: {
        type: DataTypes.STRING,
    },
});

export default userDb;