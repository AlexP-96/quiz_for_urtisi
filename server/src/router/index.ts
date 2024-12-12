import { Router } from 'express';
import { container } from '../config/dependencyRegistration';

const router = Router();

const userController = container.resolve('userController');
const quizController = container.resolve('quizController');
const questionController = container.resolve('questionController');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.post('/user/:id', userController.user);

export const getOneQuizRoute = router.get('/quiz/:quiz_id', quizController.getOneQuiz);
export const getAllQuizRoute = router.get('/quiz_all', quizController.getAllQuiz);
export const createQuizRoute = router.post('/create_quiz', quizController.createQuiz);
export const updateQuizRoute = router.post('/update_quiz/:quiz_id', quizController.updateQuiz);
export const deleteQuizRoute = router.delete('/delete_quiz/:quiz_id', quizController.deleteQuiz);

export const getAllQuestionsRoute = router.get('/question_all', questionController.getAllQuestion);
export const createQuestionsRoute = router.post('/question_create', questionController.createQuestion);
// export const deleteQuestionsRoute = router.delete('/question_delete/:question_id', questionController);
// export const updateQuestionsRoute = router.post('/question_update/:question_id', questionController);

export default router;