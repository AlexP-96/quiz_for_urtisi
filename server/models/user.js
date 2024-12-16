'use strict';
const {
    Model,
    DataTypes,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            user.hasMany(models.quiz, {
                foreignKey: 'user_id',
                as: 'quiz',
            });
        }
    }

    user.init({
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
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};
