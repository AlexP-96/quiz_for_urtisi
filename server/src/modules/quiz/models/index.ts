import {
    DataTypes,
    Model,
} from 'sequelize';
import sequelize from '../../../orm';
import dotenv from 'dotenv';

dotenv.config();

const quizDb = sequelize.define<Model>('quiz', {
        quiz_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    quiz_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
);

export default quizDb;