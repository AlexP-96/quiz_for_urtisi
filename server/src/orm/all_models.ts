import answerDb from '../modules/answers/models';
import questionDb from '../modules/questions/models';
import quizDb from '../modules/quiz/models';
import userDb from '../modules/user/models';

const registrationAssociations = () => {
    userDb.hasMany(quizDb, {
        foreignKey: 'user_id',
        as: 'quiz',
    });

    quizDb.belongsTo(userDb, {
        foreignKey: 'user_id',
        as: 'user',
    });

    quizDb.hasMany(questionDb, {
        foreignKey: 'quiz_id',
        as: 'question',
    });

    questionDb.belongsTo(quizDb, {
        foreignKey: 'quiz_id',
        as: 'quiz',
    });

    questionDb.hasMany(answerDb, {
        foreignKey: 'question_id',
        as: 'answers',
    });

    answerDb.belongsTo(questionDb, {
        foreignKey: 'question_id',
        as: 'question',
    });
};

export default registrationAssociations;