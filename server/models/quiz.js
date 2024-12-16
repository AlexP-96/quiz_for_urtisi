'use strict';
const {
    Model,
    DataTypes,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class quiz extends Model {
        static associate(models) {
            quiz.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            });
            quiz.hasMany(models.question, {
                foreignKey: 'quiz_id',
                as: 'quiz',
            });
        }
    }

    quiz.init({
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
    }, {
        sequelize,
        modelName: 'quiz',
    });
    return quiz;
};