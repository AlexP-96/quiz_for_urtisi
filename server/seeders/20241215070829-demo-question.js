'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('questions', [
            {
                question_id: 1,
                question_name: 'question 1 1',
                quiz_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                question_id: 2,
                question_name: 'question 1 2',
                quiz_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                question_id: 3,
                question_name: 'question 2 1',
                quiz_id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('questions', null, {});
    },
};
