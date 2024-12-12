import { Router } from "express";
import { container } from "../config/dependencyRegistration";

const router = Router();

const userController = container.resolve("userController");
const quizController = container.resolve("quizController");

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.post('/user/:id', userController.user);

//TODO реализовать параметры для авторизованного пользователя
//todo расписать на листке порядок создания и получения данных от пользователя, прописать маршруты дляд пользователей
//todo

router.get('/user/quiz/:id', quizController.getOneQuiz);
router.get('/user/:id/quiz_all', quizController.getAllQuiz);
router.post('/create_quiz', quizController.createQuiz);
router.delete('/delete_quiz', quizController.deleteQuiz);
router.post('/update_quiz', quizController.updateQuiz);

//TODO реализовать параметры для квизов

export default router;