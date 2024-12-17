import answerDb from '../modules/answers/models';
import questionDb from '../modules/questions/models';
import quizDb from '../modules/quiz/models';
import userDb from '../modules/user/models';

const registrationAssociations = () => {
    userDb.hasMany(quizDb, {
        foreignKey: 'user_id',
        as: 'quizzes',
    });

    quizDb.belongsTo(userDb, {
        foreignKey: 'user_id',
        as: 'users',
    });

    quizDb.hasMany(questionDb, {
        foreignKey: 'quiz_id',
        as: 'questions',
    });

    questionDb.belongsTo(quizDb, {
        foreignKey: 'quiz_id',
        as: 'quizzes',
    });

    questionDb.hasMany(answerDb, {
        foreignKey: 'question_id',
        as: 'answers',
    });

    answerDb.belongsTo(questionDb, {
        foreignKey: 'question_id',
        as: 'questions',
    });
};

export default registrationAssociations;