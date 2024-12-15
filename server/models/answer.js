'use strict';
const {
    Model,
    DataTypes,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class answer extends Model {
        static associate(models) {
            answer.belongsTo(models.question, {
                foreignKey: 'question_id',
                as: 'question',
            })
        }
    }

    answer.init({
        answer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        answer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'radio',
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'answer',
    });
    return answer;
};