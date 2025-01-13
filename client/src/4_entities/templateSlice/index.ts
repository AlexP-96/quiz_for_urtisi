import
{
    userReducer,
    userId,
    emailUser,
    quizUserName,
    answersUser,
    questionUserText,
    arrQuizDb,
    isLoading
} from './slice/userSlice';
import {
    modalReducer,
    openModal,
    closeModal,
} from './slice/modalSlice';

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
    arrQuizDb,
    isLoading
};
