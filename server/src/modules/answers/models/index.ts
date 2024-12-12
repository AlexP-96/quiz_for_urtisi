import {
    DataTypes,
    Model,
} from 'sequelize';
import sequelize from '../../../orm';
import dotenv from 'dotenv';

dotenv.config();

const answerDb = sequelize.define<Model>('answer', {
        answer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
);

export default answerDb;