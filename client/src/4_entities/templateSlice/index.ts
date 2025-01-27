import
{
    userReducer,
    userId,
    emailUser,
    quizUserName,
    answersUser,
    questionUserText,
    allQuizzes,
    isLoading,
    allQuestions
} from './slice/userSlice';
import {
    modalReducer,
    openModal,
    closeModal,
} from './slice/modalSlice';

const HOST = 'http://localhost:4000'

import {SelectorUserId} from './model/selectors';

export {
    userReducer,
    SelectorUserId,
    userId,
    modalReducer,
    openModal,
    closeModal,
    emailUser,
    quizUserName,
    answersUser,
    questionUserText,
    allQuizzes,
    isLoading,
    allQuestions,
    HOST
};
