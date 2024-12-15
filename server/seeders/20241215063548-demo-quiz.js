'use strict';

/** @type {import('sequelize-cli').Migration} **/
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('quizzes', [
            {
                quiz_id: 1,
                quiz_name: 'quiz 1',
                user_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                quiz_id: 2,
                quiz_name: 'quiz 2',
                user_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                quiz_id: 3,
                quiz_name: 'quiz 3',
                user_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('quizzes', null, {});
    },
};
