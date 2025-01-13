import { Router } from 'express';
import { container } from '../config/dependencyRegistration';

const router = Router();

const userController = container.resolve('userController');
const quizController = container.resolve('quizController');
const questionController = container.resolve('questionController');
const answerController = container.resolve('answerController');

//user
router.post('/login', userController.login);
router.post('/user/logout', userController.logout);
router.post('/register', userController.register);
router.get('/:user_id/get_all_data', userController.getAllData);

//quiz
export const getOneQuizRoute = router.get('/:user_id/quiz/:quiz_id', quizController.getOneQuiz);
export const getAllQuizRoute = router.get('/:user_id/quiz_all', quizController.getAllQuiz);
export const createQuizRoute = router.post('/:user_id/create_quiz', quizController.createQuiz);
export const updateQuizRoute = router.patch('/:user_id/update_quiz/:quiz_id', quizController.updateQuiz);
export const deleteQuizRoute = router.delete('/:user_id/delete_quiz/:quiz_id', quizController.deleteQuiz);

//question
export const getAllQuestionsRoute = router.get(
    '/:user_id/questions/:quiz_id/question_all',
    questionController.getAllQuestion,
);
export const createQuestionsRoute = router.post(
    '/:user_id/questions/:quiz_id/question_create',
    questionController.createQuestion,
);
export const updateQuestionsRoute = router.patch(
    '/:user_id/questions/:quiz_id/question_update/:question_id',
    questionController.updateQuestion,
);
export const deleteQuestionsRoute = router.delete(
    '/:user_id/questions/:quiz_id/question_delete/:question_id',
    questionController.deleteQuestion,
);

//answer
export const getAllAnswerRoute = router.get(
    '/:user_id/quiz/:quiz_id/question/:question_id/answer_all',
    answerController.getAllAnswer,
);
export const createAnswerRoute = router.post(
    '/:user_id/quiz/:quiz_id/questions/:question_id/answer_create',
    answerController.createAnswer,
);
export const updateAnswerRoute = router.patch(
    '/:user_id/quiz/:quiz_id/question/:question_id/answer_update/:answer_id',
    answerController.updateAnswer,
);
export const deleteAnswerRoute = router.delete(
    '/:answer_id/answer_delete',
    answerController.deleteAnswer,
);

export default router;