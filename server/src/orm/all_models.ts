import answerDb from '../modules/answers/models';
import questionDb from '../modules/questions/models';
import quizDb from '../modules/quiz/models';
import userDb from '../modules/user/models';

const registrationAssociations = () => {
    userDb.hasMany(quizDb, {
        foreignKey: 'user_id',
    });

    quizDb.belongsTo(userDb, {
        foreignKey: 'user_id',
    });

    quizDb.hasMany(questionDb, {
        foreignKey: 'quiz_id',
    });

    questionDb.belongsTo(quizDb, {
        foreignKey: 'quiz_id',
    });

    questionDb.hasMany(answerDb, {
        foreignKey: 'question_id',
    });

    answerDb.belongsTo(questionDb, {
        foreignKey: 'question_id',
    });
};

export default registrationAssociations;