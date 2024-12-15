'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('answers', [
            {
                answer_id: 1,
                answer_name: 'answer 1',
                type: 'radio',
                question_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                answer_id: 2,
                answer_name: 'answer 2',
                type: 'radio',
                question_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                answer_id: 3,
                answer_name: 'answer 3',
                type: 'radio',
                question_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                answer_id: 4,
                answer_name: 'answer 4',
                type: 'radio',
                question_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                answer_id: 5,
                answer_name: 'answer 5',
                type: 'radio',
                question_id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('answers', null, {});
    },
};
