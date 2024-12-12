import {
    DataTypes,
    Model,
} from 'sequelize';
import sequelize from '../../../orm';
import dotenv from 'dotenv';

dotenv.config();

const questionDb = sequelize.define<Model>('question', {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question_name: {
            type: DataTypes.STRING,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
);

export default questionDb;