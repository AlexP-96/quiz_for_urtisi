'use strict';
const {
    Model,
    DataTypes,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class questions extends Model {
        static associate(models) {
            questions.belongsTo(models.quiz, {
                foreignKey: 'quiz_id',
                as: 'quiz',
            });
            questions.hasMany(models.answer, {
                foreignKey: 'question_id',
                as: 'answer',
            });
        }
    }

    questions.init({
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'questions',
    });
    return questions;
};